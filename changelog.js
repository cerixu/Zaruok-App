/* ==========================================================================
   Żarłok — dziennik zmian widoczny w oknie „Co nowego”.
   KAŻDE nowe wydanie musi mieć tutaj własny wpis. app.js wyświetla wpis
   odpowiadający APP_VERSION; test mobilny sprawdza jego obecność.
   ========================================================================== */

export const CHANGELOG = Object.freeze({
  '1.9.24': Object.freeze({
    intro: 'Naprawiono informacje o wydaniu i uzupełniono brakujące podsumowanie ostatnich poprawek.',
    items: [
      'Okno „Co nowego” opisuje teraz konkretne zmiany aktualnej wersji zamiast stale powtarzać nieaktualną listę starszych funkcji.',
      'Uzupełniono opis dziewięciu receptur wokowych: instrukcje smażenia są dopasowane do produktu, a kroki Pad See Ew mają czytelniejszą kolejność.',
      'W „Tofu z czarnym pieprzem” sos ostrygowy zastąpiono sosem sojowym; automatyczny audyt sprawdza, czy wegetariańska receptura nie zawiera sosu ostrygowego.',
      'Poprawiono semantyczne ikony składników: bazylia i świeże zioła mają ikonę liści, a świeża papryka jest odróżniona od papryki mielonej i wędzonej.'
    ],
    footer: 'Twoje zapisane receptury, ustawienia i magazyn pozostają na tym urządzeniu.'
  }),
  '1.9.23': Object.freeze({
    intro: 'Dopracowanie dań z woka.',
    items: [
      'Dopracowano dziewięć receptur wokowych — ogólne „obsmaż białko” zastąpiono instrukcjami dopasowanymi do kurczaka, wołowiny, krewetek, tofu, wieprzowiny i kaczki.',
      'Poprawiono kolejność i czytelność kroków w Pad See Ew.',
      'W wegetariańskim przepisie na tofu z czarnym pieprzem sos ostrygowy zastąpiono sosem sojowym; rozszerzono audyt receptur i odświeżono cache PWA.'
    ],
    footer: 'Aktualizacja odświeżała też pliki aplikacji zapisane do pracy offline.'
  }),
  '1.9.22': Object.freeze({
    intro: 'Poprawki językowe i jakości danych receptur.',
    items: [
      'Poprawiono polską odmianę i treść kroków w dwunastu recepturach z wołowiną, wieprzowiną, kaczką, bazylią tajską, Pad See Ew, sosem orzechowym i Kung Pao.',
      'Rozszerzono audyt danych, aby wychwytywał błędne formy nazw mięs w instrukcjach.'
    ],
    footer: 'Dane receptur zostały sprawdzone automatycznie przed publikacją.'
  })
});
