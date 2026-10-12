/* Pure EAN-13 decoder used as a local fallback when BarcodeDetector is absent. */
const L = ['0001101','0011001','0010011','0111101','0100011','0110001','0101111','0111011','0110111','0001011'];
const G = ['0100111','0110011','0011011','0100001','0011101','0111001','0000101','0010001','0001001','0010111'];
const R = ['1110010','1100110','1101100','1000010','1011100','1001110','1010000','1000100','1001000','1110100'];
const PARITY = ['LLLLLL','LLGLGG','LLGGLG','LLGGGL','LGLLGG','LGGLLG','LGGGLL','LGLGLG','LGLGGL','LGGLGL'];

export function decodeEAN13Bits(bits) {
  if (typeof bits !== 'string' || bits.length !== 95 || !/^[01]+$/.test(bits)) return null;
  if (bits.slice(0, 3) !== '101' || bits.slice(45, 50) !== '01010' || bits.slice(92, 95) !== '101') return null;
  let left = '', parity = '';
  for (let i = 0; i < 6; i++) {
    const chunk = bits.slice(3 + i * 7, 10 + i * 7);
    let digit = L.indexOf(chunk);
    if (digit >= 0) { left += String(digit); parity += 'L'; continue; }
    digit = G.indexOf(chunk);
    if (digit >= 0) { left += String(digit); parity += 'G'; continue; }
    return null;
  }
  const first = PARITY.indexOf(parity);
  if (first < 0) return null;
  let right = '';
  for (let i = 0; i < 6; i++) {
    const digit = R.indexOf(bits.slice(50 + i * 7, 57 + i * 7));
    if (digit < 0) return null;
    right += String(digit);
  }
  const digits = String(first) + left + right;
  let sum = 0;
  for (let i = 0; i < 12; i++) sum += Number(digits[i]) * (i % 2 === 0 ? 1 : 3);
  return (10 - (sum % 10)) % 10 === Number(digits[12]) ? digits : null;
}

function otsuThreshold(values) {
  const hist = new Array(256).fill(0);
  let sum = 0;
  for (const v of values) { hist[v]++; sum += v; }
  let sumB = 0, weightB = 0, best = -1, threshold = 128;
  for (let t = 0; t < 256; t++) {
    weightB += hist[t];
    if (!weightB) continue;
    const weightF = values.length - weightB;
    if (!weightF) break;
    sumB += t * hist[t];
    const meanB = sumB / weightB, meanF = (sum - sumB) / weightF;
    const between = weightB * weightF * (meanB - meanF) * (meanB - meanF);
    if (between > best) { best = between; threshold = t; }
  }
  return threshold;
}

/** Reads a live frame at several rows/scales. Works without BarcodeDetector (Safari/iOS). */
export function decodeEAN13Frame(video, canvas) {
  if (!video || !canvas || video.readyState < 2 || !video.videoWidth || !video.videoHeight) return null;
  // Keep enough horizontal pixels for narrow EAN bars even when the camera feed is HD.
  const width = 960;
  const height = Math.max(320, Math.round(width * video.videoHeight / video.videoWidth));
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;
  ctx.drawImage(video, 0, 0, width, height);

  // A label's barcode may sit above/below the exact centre. Try several scanlines.
  const rows = [.28, .34, .40, .46, .50, .54, .60, .66, .72];
  const scaleAdjustments = [.92, .96, 1, 1.04, 1.08];
  const phaseAdjustments = [-.18, 0, .18];

  for (const fraction of rows) {
    const y = Math.max(0, Math.min(height - 1, Math.round(height * fraction)));
    const pixels = ctx.getImageData(0, y, width, 1).data;
    const values = new Uint8Array(width);
    let min = 255, max = 0;
    for (let x = 0; x < width; x++) {
      const p = x * 4;
      const value = Math.round(pixels[p] * .299 + pixels[p + 1] * .587 + pixels[p + 2] * .114);
      values[x] = value;
      if (value < min) min = value;
      if (value > max) max = value;
    }
    if (max - min < 28) continue;

    // Otsu can legitimately return 0 for a clean black/white frame. Use <= below,
    // otherwise perfectly black bars are classified as white and no scan can succeed.
    const thresholds = [...new Set([otsuThreshold(values), Math.round((min + max) / 2)])];
    for (const threshold of thresholds) {
      const bits = Array.from(values, (v) => v <= threshold ? 1 : 0);
      const runs = [];
      let color = bits[0], start = 0;
      for (let x = 1; x <= width; x++) {
        if (x === width || bits[x] !== color) {
          runs.push({ color, start, length: x - start });
          color = bits[x];
          start = x;
        }
      }

      // Start guard is 101. Slight blur/uneven exposure can distort the three run
      // widths, so fit a small range of module widths and sampling phases.
      for (let i = 0; i + 2 < runs.length; i++) {
        const a = runs[i], b = runs[i + 1], c = runs[i + 2];
        if (a.color !== 1 || b.color !== 0 || c.color !== 1) continue;
        const module = (a.length + b.length + c.length) / 3;
        const quiet = runs[i - 1];
        // EAN-13 has a clear white quiet zone before the start guard; it also
        // rejects most incidental 101 patterns in text, glare and label art.
        if (!quiet || quiet.color !== 0 || quiet.length < module * 5) continue;
        const smallest = Math.min(a.length, b.length, c.length);
        const largest = Math.max(a.length, b.length, c.length);
        if (module < 1.1 || largest / Math.max(1, smallest) > 1.9 || a.start + module * 95 > width) continue;

        for (const scale of scaleAdjustments) {
          const step = module * scale;
          if (a.start + step * 95 > width) continue;
          for (const phase of phaseAdjustments) {
            let sampled = '';
            const origin = a.start + module * phase;
            for (let m = 0; m < 95; m++) {
              const x = Math.max(0, Math.min(width - 1, Math.floor(origin + (m + .5) * step)));
              sampled += bits[x] ? '1' : '0';
            }
            const decoded = decodeEAN13Bits(sampled);
            if (decoded) return decoded;
          }
        }
      }
    }
  }
  return null;
}
