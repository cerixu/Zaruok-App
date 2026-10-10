# Żarłok — scalony plan produktu i QA

> Ten dokument scala wymagania z rozmów o Żarłoku oraz funkcje przenoszone z wcześniejszych prototypów. Statusy odnoszą się do kodu w repozytorium, nie do deklaracji ani samej obecności etykiety w interfejsie. Każda funkcja wymaga osobnego testu na iPhonie przed oznaczeniem jako gotowa.

## Zasady produktu

- Priorytet: iPhone 17 Pro Max, Safari i instalacja PWA z ekranu początkowego. Desktop nie jest celem pierwszoplanowym.
- Wygląd: ciemny, minimalistyczny, dopracowany system Liquid Glass inspirowany iOS 27; szkło ma poprawiać hierarchię i czytelność, a nie zasłaniać treści.
- Tryb profesjonalny dla kucharza. Nie przywracać osobnego „Trybu amator” ani konsumenckich ekranów.
- Offline-first, dane zachowywane po zamknięciu i ponownym uruchomieniu, bez płatnych API.
- Każda zmiana: kopia/bezpieczna gałąź, testy automatyczne, test na wąskim ekranie, zrzuty wizualne, kontrola błędów konsoli i potwierdzenie publikacji.
- Nie oznaczać etapu jako ukończonego tylko dlatego, że kod istnieje. Liczą się rzeczywiste testy i działająca wersja opublikowana.

## Aktualnie sprawdzony stan repozytorium

- Główne repozytorium: `cerixu/Zaruok-App`, główna gałąź `main`.
- Istnieje automatyczny pipeline QA oraz publikacja statycznej PWA przez GitHub Pages.
- Są testy wizualne, interakcji, trwałości danych, odzyskiwania IndexedDB, offline, audytu receptur, gramatyki jednostek i kalkulatora „Mam mąkę”.
- Istnieją już m.in. wyszukiwarka receptur, ulubione, szczegóły i modal pełnej receptury, własne uwagi, historia zmian, kalkulator Food Cost/procentów piekarskich, lista zakupów, import/eksport kopii, ustawienia wyglądu i obsługa offline. Każdy moduł nadal wymaga audytu zachowania na iPhonie.
- W repozytorium występują historyczne nazwy techniczne z wcześniejszych prototypów. Nie powinny być widoczne w UI ani w dokumentacji dla użytkownika.
- Cel bazy: ponad 1200 unikalnych, poprawnych receptur. Nie wolno osiągać liczby przez kopiowanie lub wielokrotne mnożenie tych samych dań.

## Etap 0 — bezpieczeństwo zmian i publikacja

- [x] Pracować na repozytorium `cerixu/Zaruok-App` i weryfikować rzeczywisty stan `main`.
- [x] Utrzymywać automatyczny pipeline QA oraz osobny workflow publikacji Pages.
- [ ] Potwierdzać po każdej zmianie: zielony workflow QA, zielone wdrożenie Pages i kod faktycznie serwowany przez publiczny adres.
- [ ] Dodać niezawodny komunikat o dostępnej aktualizacji PWA oraz ścieżkę wymuszenia odświeżenia bez utraty danych.
- [ ] Zweryfikować aktualizację service workera na zainstalowanej PWA w iOS Safari i trybie offline.
- [ ] Uporządkować branding: Żarłok w interfejsie, metadanych, README, manifeście, komunikatach i ekranie startowym.
- [ ] Ustalić kopię przed dużymi zmianami wizualnymi i procedurę przywracania poprzedniego wydania.

## Etap 1 — stabilność i podstawowe ścieżki

- [ ] Test uruchamiania bez utknięcia na splash screenie, na zimno i po powrocie z tła.
- [ ] Test każdej zakładki, nawigacji wstecz, modali, klawiatury i przewijania na iPhonie.
- [ ] Naprawić wszystkie błędy konsoli, wyjątki i niedziałające przyciski.
- [ ] Sprawdzić bezpieczne obszary ekranu, dolny pasek, dynamiczną wysokość viewportu i klawiaturę ekranową.
- [ ] Sprawdzić persystencję ustawień, ulubionych, receptur, zakupów, notatek i historii po restarcie.
- [ ] Zweryfikować kopię zapasową i przywracanie danych oraz odzyskiwanie po błędzie IndexedDB.
- [ ] Sprawdzić działanie offline i zachowanie po powrocie sieci.
- [ ] Utrzymywać regresyjne testy każdej naprawionej usterki.

## Etap 2 — system wizualny i doświadczenie iPhone

- [ ] Audyt całej aplikacji ekran po ekranie, tylko w pierwszej kolejności na iPhonie.
- [ ] Dopracować ciemny Liquid Glass: spójne warstwy, rozmycie, obramowania, kontrast, cienie i reakcje na tryb systemowy.
- [ ] Naprawić dolny pasek: ikony, pionowe wyrównanie, rozmiar i równowagę koloru względem symbolu.
- [ ] Naprawić górne rozmycie/zasłanianie treści po instalacji na ekranie początkowym.
- [ ] Ujednolicić ikony nawigacji, w tym przycisk wstecz w nagłówku receptury.
- [ ] Dopilnować, by obrazy były ostre, właściwe dla dania i nie wyglądały jak placeholdery.
- [ ] Zastosować prawdziwe, zgodne tematycznie ikony składników; sól, olej, pieprz i inne produkty nie mogą mieć mylących symboli.
- [ ] Dodać delikatne animacje przejść, rozwijania i zamykania, bez spowalniania pracy kucharza.
- [ ] Sprawdzić czytelność przy różnych rozmiarach tekstu i przy otwartej klawiaturze.
- [ ] Używać istniejących zasobów z biblioteki projektu po ich sprawdzeniu; nie nadpisywać ich bez kopii.

## Etap 3 — receptury i ekran pełnego przepisu

- [ ] Naprawić i zweryfikować wszystkie istniejące receptury, nie tylko próbkę.
- [ ] Pełna polszczyzna: brak mieszanek typu „szklanka almonds”, błędnej odmiany, nawiasów/fragmentów technicznych i błędnych nazw.
- [ ] Ujednolicić jednostki, ilości, przecinki dziesiętne, skróty, liczbę mnogą i gramatykę.
- [ ] Domyślnie pokazywać recepturę na 1 porcję, z poprawnym skalowaniem.
- [ ] Karty mają pokazywać tylko najważniejsze informacje; pełna zawartość dopiero po kliknięciu „więcej”.
- [ ] Usunąć zbędny przycisk/sekcję „Pokaż szczegóły”, jeśli „więcej” otwiera pełny przepis.
- [ ] Pełny przepis w osobnym, dopracowanym oknie/modalu z animacją, prawidłowym zamykaniem i przewijaniem.
- [ ] W sekcjach składników pokazywać odpowiednie ikony obok każdej pozycji.
- [ ] Własne uwagi, źródło, region, kraj pochodzenia, tradycyjność i kuchnia świata mają być widoczne w odpowiednich miejscach.
- [ ] Oznaczyć dania tradycyjne i przypisać region/kraj, gdy można to rzetelnie ustalić.
- [ ] Zdjęcia mają pasować do dania; nie używać jednego zdjęcia sosu do koktajlu ani ogólnych placeholderów.
- [ ] Historia zmian receptury i przywracanie poprzedniej wersji muszą działać.
- [ ] Zachować edycję własnych receptur i import, bez psucia istniejących rekordów.
- [ ] Rozbudować bazę do 1200+ **unikalnych** receptur, z deduplikacją, audytem jakości, kategoriami i pochodzeniem.
- [ ] Nie deklarować celu liczbowego jako osiągniętego, dopóki nie przejdzie raport unikalności, kompletności i polszczyzny.

## Etap 4 — taksonomia, wyszukiwanie i odkrywanie

- [ ] Kategorie i podkategorie muszą prowadzić do właściwych dań.
- [ ] „Tradycyjne” oraz „Kuchnie świata” jako spójne filtry/tagi, z regionami.
- [ ] Wyszukiwanie po nazwie, składnikach, tagach i kuchni.
- [ ] Naprawić fokus klawiatury i wyszukiwanie na żywo, tak by wpisywanie kolejnych znaków nie zamykało klawiatury.
- [ ] Ulubione mają pokazywać wyłącznie ulubione.
- [ ] Wyniki muszą być trafne, bez powielania tego samego przepisu pod wieloma nazwami.
- [ ] Dodać filtrowanie po składnikach dostępnych w magazynie i uwzględniać zamienniki.
- [ ] Sprawdzić pusty wynik, literówki, polskie znaki i wyszukiwanie offline.

## Etap 5 — kalkulatory profesjonalne

- [ ] Kalkulator pizzy „Mam mąkę”: ilość mąki jest punktem wyjścia; bez konieczności wpisywania liczby kulek.
- [ ] Tryb „Kulki” nadal działa i poprawnie przelicza docelową masę.
- [ ] Procenty piekarskie, hydracja, sól, oliwa, typ drożdży, temperatura i czas fermentacji.
- [ ] Pola temperatury i czasu nie mogą tracić fokusu ani zamykać klawiatury podczas wpisywania kolejnych cyfr.
- [ ] Sugestia drożdży ma odświeżać się bez przebudowy całego formularza.
- [ ] Zakwas aktywny ma być opisany i rozpisany jako proporcja wagowa 1:1:2: zakwas macierzysty + mąka + woda; przykład 10 g + 10 g + 20 g = 40 g.
- [ ] Masa mąki i wody dodawanej do ciasta ma uwzględniać mąkę/wodę w zakwasie, bez podwójnego liczenia hydracji ani masy.
- [ ] Receptura zapisana z kalkulatora ma zawierać osobną sekcję zakwasu, składniki, proporcje i instrukcję przygotowania.
- [ ] „Do zakupów” ma dodawać właściwe składniki zaczynu, a nie drożdże przy trybie zakwasu.
- [ ] Kalkulator Food Cost: koszt składników, ceny jednostkowe, koszt porcji, procent food cost i marża.
- [ ] Kalkulator skalowania receptur, uzysku/wydajności, procentów piekarskich i konwersji jednostek.
- [ ] Testy liczbowe dla małych i dużych partii oraz skrajnych/nieprawidłowych danych.

## Etap 6 — magazyn, zakupy i straty

- [ ] Rozbudować magazyn składników: ilość, jednostka, koszt zakupu, cena jednostkowa, kategoria i próg minimalny.
- [ ] Alerty niskiego stanu z możliwością włączenia/wyłączenia.
- [ ] Po ugotowaniu/pobraniu receptury zapytać o odjęcie składników lub odjąć je zgodnie z ustawieniem użytkownika.
- [ ] Przeliczać jednostki magazynowe i recepturowe poprawnie, bez cichego mieszania g/ml/szt.
- [ ] Lista zakupów: dodawanie, edycja, usuwanie, odhaczanie, grupowanie i trwały zapis.
- [ ] Naprawić błędy, w których „Zakupy” otwierają zły ekran, lista nie przewija się lub nie zapisuje pozycji.
- [ ] Generować zakupy z receptury i brakujących składników w magazynie.
- [ ] System strat: wpis produktu, ilość, powód, data i koszt wyrzuconego jedzenia, np. rukoli.
- [ ] Podsumowanie strat tygodniowych i kosztów, z filtrem po składniku/kategorii.
- [ ] Historia zmian stanu magazynu, aby było wiadomo, skąd wzięło się zużycie lub strata.

## Etap 7 — skaner EAN i praca z produktami

- [ ] Skaner kodów kreskowych EAN uruchamiany aparatem iPhone'a.
- [ ] Automatyczne wykrywanie bez konieczności ustawiania kodu w ramce.
- [ ] Linia skanująca, czytelny stan skanowania i szybka reakcja.
- [ ] Przełącznik latarki, jeśli urządzenie/przeglądarka udostępnia tę możliwość.
- [ ] Obsługa odmowy uprawnień, słabego światła, nieznanego kodu i ręcznego wpisania kodu.
- [ ] Kod może znaleźć lub utworzyć składnik w magazynie; nie dopisywać niezweryfikowanych nazw i wartości odżywczych.
- [ ] Sprawdzić realne zachowanie w Safari/PWA, nie tylko w emulatorze.

## Etap 8 — obrazy, ikony i zasoby

- [ ] Audyt wszystkich zdjęć receptur: zgodność dania, jakość, rozdzielczość i źródło.
- [ ] Własne zdjęcie receptury, z większym rozsądnym limitem rozmiaru i kompresją.
- [ ] Wykorzystać obrazy i ikony z biblioteki użytkownika po sprawdzeniu, bez nadpisywania oryginałów.
- [ ] Obrazy z internetu muszą mieć zgodne źródło/licencję i właściwe przypisanie.
- [ ] Wygenerowane obrazy mogą uzupełniać brakujące materiały, ale nie mogą udawać fotografii referencyjnej konkretnego produktu.
- [ ] Transparentne ikony składników, spójny styl i brak duplikatów emoji.
- [ ] Obrazy mają się ładować w trybie online i mieć sensowny fallback offline.

## Etap 9 — import, kopie i prywatność danych

- [ ] Import/eksport JSON z walidacją schematu i raportem błędów.
- [ ] Kopia obejmuje receptury, ustawienia, ulubione, notatki, historię, magazyn i zakupy.
- [ ] Przywracanie ma pokazywać, co zostanie dodane/zastąpione i nie może bez ostrzeżenia skasować danych.
- [ ] Obsłużyć stare formaty kopii i migracje danych.
- [ ] Duże importy nie mogą zawieszać UI; pokazywać postęp i błędy w konkretnych rekordach.
- [ ] Brak płatnych API i brak wysyłania prywatnych receptur na serwer bez świadomej zgody.

## Etap 10 — finalny audyt wydania

- [ ] Pełny test E2E głównych przepływów na viewportach iPhone.
- [ ] Regresja klawiatury: wyszukiwarka, ilości, temperatura, czas, magazyn, zakupy i edytor.
- [ ] Regresja trwałości: restart, odświeżenie, offline, aktualizacja service workera i przywracanie kopii.
- [ ] Regresja receptur: jednostki, polszczyzna, ikony, zdjęcia, skalowanie, zapis i edycja.
- [ ] Test dostępności: kontrast, focus, etykiety pól, sensowne komunikaty i obszary dotyku.
- [ ] Test na realnym iPhonie: Safari i instalacja na ekranie początkowym.
- [ ] Potwierdzić zielone workflow QA oraz Pages i porównać wersję serwowaną z SHA `main`.
- [ ] Sprawdzić wszystkie odnośniki, metadane, ikonę, ekran startowy, nazwę i wersję.
- [ ] Ostatni raport: co zrobiono, co przeszło testy, co nie przeszło i co zostaje.

## Reguły statusów

- **Gotowe** — implementacja jest w `main`, testy przechodzą, wdrożenie jest potwierdzone i zachowanie zostało sprawdzone.
- **W trakcie** — zmiana istnieje na gałęzi lub jest testowana, ale nie jest jeszcze potwierdzona w wydaniu.
- **Do zrobienia** — brakuje implementacji, audytu lub dowodu poprawnego działania.
- Nie zmieniać statusu na gotowe na podstawie samego kodu, screenshotu z mockupu ani zielonego pojedynczego testu.
