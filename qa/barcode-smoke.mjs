import { decodeEAN13Bits, decodeEAN13Frame } from '../barcode.js';

const L = ['0001101','0011001','0010011','0111101','0100011','0110001','0101111','0111011','0110111','0001011'];
const G = ['0100111','0110011','0011011','0100001','0011101','0111001','0000101','0010001','0001001','0010111'];
const R = ['1110010','1100110','1101100','1000010','1011100','1001110','1010000','1000100','1001000','1110100'];
const parity = 'LGGLLG';
const leftDigits = '901234';
const rightDigits = '123457';
let bits = '101';
for (let i = 0; i < 6; i++) bits += (parity[i] === 'L' ? L : G)[Number(leftDigits[i])];
bits += '01010';
for (const digit of rightDigits) bits += R[Number(digit)];
bits += '101';
if (bits.length !== 95) throw new Error('EAN-13 test fixture must have 95 modules');
if (decodeEAN13Bits(bits) !== '5901234123457') throw new Error('EAN-13 decoder failed the valid checksum fixture');
let invalidBits = '101';
for (let i = 0; i < 6; i++) invalidBits += (parity[i] === 'L' ? L : G)[Number(leftDigits[i])];
invalidBits += '01010';
for (const digit of '123456') invalidBits += R[Number(digit)];
invalidBits += '101';
if (decodeEAN13Bits(invalidBits) !== null) throw new Error('EAN-13 decoder accepted an invalid checksum');

 // Exercise the real camera-frame path with a clean, synthetic EAN image. This
 // catches thresholding regressions that bit-string-only tests cannot detect.
 const FRAME_WIDTH = 960;
 const MODULE_WIDTH = 6;
 const BARCODE_LEFT = 195;
 const fakeVideo = { readyState: 2, videoWidth: 640, videoHeight: 480 };
 const fakeContext = {
   drawImage() {},
   getImageData(_x, _y, width) {
     const data = new Uint8ClampedArray(width * 4);
     for (let x = 0; x < width; x++) {
       const relative = x - BARCODE_LEFT;
       const moduleIndex = Math.floor(relative / MODULE_WIDTH);
       const inBarcode = relative >= 0 && moduleIndex < bits.length;
       const gray = inBarcode && bits[moduleIndex] === '1' ? 0 : 255;
       const p = x * 4;
       data[p] = gray;
       data[p + 1] = gray;
       data[p + 2] = gray;
       data[p + 3] = 255;
     }
     return { data };
   },
 };
 const fakeCanvas = { width: 0, height: 0, getContext: () => fakeContext };
 const frameCode = decodeEAN13Frame(fakeVideo, fakeCanvas);
 if (frameCode !== '5901234123457') throw new Error('EAN-13 frame decoder failed on a clean synthetic camera frame: ' + frameCode);
 if (fakeCanvas.width !== FRAME_WIDTH) throw new Error('EAN-13 frame decoder did not use the expected 960px scan canvas');

console.log('PASS: EAN-13 bit/checksum and synthetic camera-frame decoding');
