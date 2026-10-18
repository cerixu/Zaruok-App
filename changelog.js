/* ==========================================================================
   Żarłok — dziennik zmian widoczny w oknie „Co nowego”.
   KAŻDE nowe wydanie musi mieć tutaj własny wpis. app.js wyświetla wpis
   odpowiadający APP_VERSION; test mobilny sprawdza jego obecność.
   ========================================================================== */

export const CHANGELOG = Object.freeze({
  '1.9.26': Object.freeze({
    intro: 'Bezpieczniejsze kopie i bardziej precyzyjny magazyn.',
    items: [
      'Kopie zapasowe obejmują teraz produkty magazynowe i pełną historię ruchów; import, scalanie i czyszczenie uwzględniają oba magazyny danych.',
      'Przy scalaniu kopii nowszy stan produktu wygrywa, a istniejące ruchy nie są duplikowane. Starsze kopie bez magazynu nadal można importować.',
      'Dopasowanie nazw rozpoznaje typowe odmiany polskie, a sztuki można przeliczyć na gramy tylko dla produktów z oszacowaną masą pojedynczej sztuki.',
      'Karty magazynu zyskały spójne piktogramy składników, również w jasnym motywie.'
    ],
    footer: 'Masa pojedynczej sztuki jest orientacyjna. Gdy nie ma wiarygodnego przelicznika, Żarłok nie zgaduje konwersji.'
  }),
  '1.9.25': Object.freeze({
    intro: 'Dokładniejsze ilustracje receptur i dodatków.',
    items: [
      'Poprawiono ilustracje 25 pozycji, które wcześniej dziedziczyły zbyt ogólny lub mylący obrazek kategorii.',
      'Wieprzowina, pierogi z mięsem, risotto, frytki, ziemniaki puree i pieczone, ryż jaśminowy oraz kasze otrzymały trafniejsze motywy.',
      'Dopracowano ilustracje wybranych sosów i dodatków — m.in. pesto, beszamelu, aioli, chimichurri, satayu orzechowego, winegretu, gremolaty i colesława.',
      'Rozszerzono automatyczny audyt przypisań ilustracji, aby wychwytywał te konkretne przypadki przy kolejnych zmianach.'
    ],
    footer: 'Ilustracje są wbudowane w aplikację i działają także bez połączenia z internetem.'
  }),
  '1.9.24': Object.freeze({
    intro: 'Naprawiono informacje o wydaniu i uzupełniono brakujące podsumowanie ostatnich poprawek.',
    items: [
      'Okno „Co nowego” opisuje teraz konkretne zmiany aktualnej wersji zamiast stale powtarzać nieaktualną listę starszych funkcji.',
      'Uzupełniono opis dziewięciu receptur wokowych: instrukcje smażenia są dopasowane do produktu, a kroki Pad See Ew mają czytelniejszą kolejność.',
      'W „Tofu z czarnym pieprzem” sos ostrygowy zastąpiono sosem sojowym; automatyczny audyt sprawdza, czy wegetariańska receptura nie zawiera sosu ostrygowego.',
      'Poprawiono semantyczne ikony składników: bazylia i świeże zioła mają ikonę liści, a świeża papryka jest odróżniona od papryki mielonej i wędzonej.',
      'Dopracowano dobór ilustracji receptur: tofu i kaczka mają własne motywy, dania Pad See Ew/Pad Thai używają ilustracji makaronu azjatyckiego, a smażony ryż — ilustracji ryżu.'
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
