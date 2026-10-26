/* ==========================================================================
   Żarłok — dziennik zmian widoczny w oknie „Co nowego”.
   KAŻDE nowe wydanie musi mieć tutaj własny wpis. app.js wyświetla wpis
   odpowiadający APP_VERSION; test mobilny sprawdza jego obecność.
   ========================================================================== */

export const CHANGELOG = Object.freeze({
  '2.1.34': Object.freeze({
    intro: 'Żarłok 2.1.34 — lekkie, przezroczyste SVG dla gnocchi al pomodoro, pizzy Margherita i Carbonary.',
    items: [
      'Zastąpiono ciężką ilustrację gnocchi o rozmiarze około 125 KB samodzielnym SVG około 6,3 KB.',
      'Odświeżono ilustrację pizzy Margherita: rumiany rant, sos pomidorowy, mozzarella i bazylia na przezroczystym tle (4,8 KB).',
      'Przebudowano Carbonarę w grafitowej misie z ciepłym ceramicznym rantem; rozmiar zmniejszono z 10,4 KB do 8,4 KB, zachowując przezroczyste tło.',
      'Zachowano istniejące mapowanie receptur i precache offline dla obu ilustracji.',
      'Audyt sprawdza rozmiar, dostępność, referencje i brak pełnoekranowego tła.'
    ]
  }),

  '2.1.33': Object.freeze({
    intro: 'Żarłok 2.1.33 — lekkie ilustracje SVG z przezroczystym tłem.',
    items: [
      'Zastąpiono ciężki plik Carbonary samodzielnym SVG 10,4 KB przy zachowaniu proporcji i mapowania receptury.',
      'Usunięto pełnoekranowe tła z siedmiu głównych ilustracji, aby naturalnie wtapiały się w ciemny interfejs.',
      'Dostosowano audyt dostępności do aria-label i aria-labelledby oraz dodano limit 25 KB dla Carbonary.',
      'Odświeżono wersję aplikacji, parametry cache-busting i cache Service Workera.'
    ]
  }),
  '2.1.32': Object.freeze({
    intro: 'Żarłok 2.1.32 — rozszerzono lokalną bibliotekę ilustracji SVG.',
    items: [
      'Dodano kolejne ilustracje potraw do zasobów aplikacji działających offline.'
    ]
  }),
  '2.1.31': Object.freeze({
    intro: 'Żarłok 2.1.31 — odświeżono identyfikator cache offline.',
    items: [
      'Zaktualizowano cache Service Workera dla lokalnych zasobów aplikacji.'
    ]
  }),
  '2.1.30': Object.freeze({
    intro: 'Żarłok 2.1.30 — szczegółowa ilustracja Carbonary działa z przezroczystym tłem.',
    items: [
      'Usunięto białą podkładkę i dodano przezroczysty margines, aby ilustracja dobrze wyglądała na ciemnym interfejsie.',
      'Zachowano 4434 ścieżki ilustracji, zoptymalizowane do około 1,43 MB bez obcięcia dania.',
      'Zaktualizowano cache offline i wizualne testy proporcji Carbonary.'
    ]
  }),
  '2.1.29': Object.freeze({
    intro: 'Żarłok 2.1.29 — ilustracja Carbonary lepiej wtapia się w ciemny interfejs.',
    items: [
      'Usunięto dodatkową ramkę i szare pole wokół ilustracji Carbonary.',
      'Dopasowano proporcje grafiki i połączono jej ciemne tło z tłem ekranu receptury.'
    ]
  }),
  '2.1.28': Object.freeze({
    intro: 'Żarłok 2.1.28 — ilustracja Carbonary została podmieniona na dostarczoną, szczegółową wersję SVG.',
    items: [
      'Zastąpiono produkcyjny obraz Carbonary nową ilustracją z zachowaniem jej oryginalnych proporcji 1427×1102.',
      'Zoptymalizowano ścieżki SVG do około 1,43 MB, usunięto metadane eksportu i dodano opis dostępności.',
      'Zmieniono wersję aplikacji i cache offline, aby odświeżyć zasób na urządzeniu.'
    ]
  }),
  '2.1.27': Object.freeze({
    intro: 'Żarłok 2.1.27 — przywrócono dotychczasowe zdjęcia dla dziesięciu dań, których nowe SVG nie spełniały standardu wizualnego.',
    items: [
      'Zdjęcia dla gnocchi z masłem szałwiowym, puttanesca, amatriciana, ragù alla bolognese, penne all’arrabbiata, fettuccine Alfredo, minestrone, panzanella, parmigiana di melanzane i pizzy pepperoni nie są już zastępowane nowymi ilustracjami.',
      'Ilustracje SVG pozostają w repozytorium do dopracowania; zostaną włączone ponownie dopiero po kontroli jakości.'
    ]
  }),
  '2.1.26': Object.freeze({
    intro: 'Żarłok 2.1.26 — kolejnych dziesięć ilustracji SVG działa bezpośrednio w recepturach.',
    items: [
      'Dodano produkcyjne ilustracje gnocchi z masłem szałwiowym, puttanesca, amatriciana, ragù alla bolognese, penne all’arrabbiata, fettuccine Alfredo, minestrone, panzanella, parmigiana di melanzane i pizzy pepperoni.',
      'Każda grafika ma precyzyjne mapowanie nazwy receptury i lokalny plik SVG.',
      'Zaktualizowano cache offline oraz wersję aplikacji.'
    ]
  }),
  '2.1.25': Object.freeze({
    intro: 'Żarłok 2.1.25 — dziesięć nowych ilustracji SVG trafia bezpośrednio do receptur.',
    items: [
      'Dodano produkcyjne ilustracje: krem pomidorowy, klasyczny burger, sałatka grecka, mojito, sushi maki, łosoś z cytryną i masłem, stek z masłem ziołowym, pierogi ruskie, sałatka cezar i krem grzybowy.',
      'Każda ilustracja ma lokalny plik SVG i przypisanie wyłącznie do pasujących nazw receptur.',
      'Zaktualizowano cache offline i wersję aplikacji.'
    ]
  }),
  '2.1.24': Object.freeze({
    intro: 'Żarłok 2.1.24 — risotto ai funghi przeniesione na lekkie, przezroczyste SVG.',
    items: [
      'Zastąpiono ciężką ilustrację risotto lokalnym SVG hybrydowym z przezroczystym tłem.',
      'Zachowano mapowanie receptury i dodano kontrolę rozmiaru oraz przezroczystości.',
      'Odświeżono wersję aplikacji i cache Service Workera, aby ilustracja działała również offline.'
    ]
  }),
  '2.1.23': Object.freeze({
    intro: 'Żarłok 2.1.23 — ravioli ricotta e spinaci przeniesione na lekkie, przezroczyste SVG.',
    items: [
      'Zastąpiono ciężką ilustrację ravioli lokalnym SVG hybrydowym z przezroczystym tłem.',
      'Zachowano dedykowane mapowanie receptury i dodano kontrolę rozmiaru oraz przezroczystości.',
      'Odświeżono wersję aplikacji i cache Service Workera, aby nowa ilustracja działała również offline.'
    ]
  }),
  '2.1.22': Object.freeze({
    intro: 'Żarłok 2.1.22 — panna cotta przeniesiona na lekkie, przezroczyste SVG.',
    items: [
      'Zastąpiono ciężką ilustrację panna cotty lokalnym SVG hybrydowym z przezroczystym tłem.',
      'Zachowano dedykowane mapowanie klasycznej receptury i dodano testy rozmiaru oraz przezroczystości.',
      'Odświeżono wersję aplikacji i cache Service Workera, aby nowa ilustracja działała również offline.'
    ]
  }),
  '2.1.21': Object.freeze({
    intro: 'Żarłok 2.1.21 — pizza Margherita przeniesiona na lekkie, przezroczyste SVG.',
    items: [
      'Zastąpiono ciężką ilustrację pizzy Margherita lokalnym SVG hybrydowym z przezroczystym tłem.',
      'Zachowano dedykowane mapowanie receptury i dodano regresyjne testy rozmiaru oraz przezroczystości.',
      'Odświeżono wersję aplikacji i cache Service Workera, aby nowa grafika działała również offline.'
    ]
  }),
  '2.1.20': Object.freeze({
    intro: 'Żarłok 2.1.20 — lasagne przeniesiona na lekkie, przezroczyste SVG.',
    items: [
      'Zastąpiono ciężką produkcyjną ilustrację lasagne lokalnym SVG z przezroczystym tłem.',
      'Zachowano dedykowane dopasowanie receptury oraz dodano testy rozmiaru, przezroczystości i cache offline.',
      'Odświeżono wersję aplikacji i Service Workera, aby urządzenia pobrały nową ilustrację.'
    ]
  }),
  '2.1.19': Object.freeze({
    intro: 'Żarłok 2.1.19 — carbonara przeniesiona na lekkie, przezroczyste SVG.',
    items: [
      'Zastąpiono ciężką ilustrację carbonary lekkim, lokalnym SVG z przezroczystym tłem.',
      'Zachowano ścisłe dopasowanie ilustracji do klasycznej carbonary oraz dodano testy rozmiaru, przezroczystości i cache offline.',
      'Odświeżono wersję aplikacji i Service Workera, aby urządzenia pobrały nową ilustrację.'
    ]
  }),
  '2.1.18': Object.freeze({
    intro: 'Żarłok 2.1.18 — druga produkcyjna ilustracja SVG przeniesiona na przezroczysty wzorzec hybrydowy.',
    items: [
      'Zastąpiono ciężką ilustrację tagliatelle al ragù lekkim, lokalnym SVG z przezroczystym tłem.',
      'Zachowano dedykowane dopasowanie receptury i dodano regresyjne testy przezroczystości oraz cache offline.',
      'Zaktualizowano wersję aplikacji, cache Service Workera i parametry zasobów.'
    ]
  }),
  '2.1.17': Object.freeze({
    intro: 'Żarłok 2.1.17 — pierwsza migracja produkcyjnej ilustracji SVG na przezroczysty wzorzec hybrydowy.',
    items: [
      'Zastąpiono ciężką ilustrację bruschetty lekkim, lokalnym SVG z przezroczystym tłem.',
      'Zachowano istniejące dopasowanie receptury i dodano regresyjny test przezroczystości produkcyjnej grafiki.',
      'Zaktualizowano cache Service Workera, wersję aplikacji i zasoby z parametrem cache-busting.'
    ]
  }),
  '2.1.16': Object.freeze({
    intro: 'Żarłok 2.1.16 — lżejsze, samodzielne ilustracje SVG.',
    items: [
      'Zmniejszono rozmiar 10 produkcyjnych ilustracji SVG o około 30% — łącznie o około 2,35 MB.',
      'Usunięto zbędne metadane Adobe, skrócono współrzędne do dokładności 0,1 jednostki i zoptymalizowano zapis kolorów.',
      'Dodano viewBox oraz opisy dostępności title/desc; testy sprawdzają referencje i renderowanie w widoku mobilnym oraz desktopowym.'
    ]
  }),
  '2.1.15': Object.freeze({
    intro: 'Żarłok 2.1.15 — precyzyjniejsze dopasowanie ilustracji SVG.',
    items: [
      'Warianty tiramisu z matchą, pistacją, truskawkami, malinami lub cytryną nie dostają ilustracji klasycznego tiramisu.',
      'Rozszerzono audyt dopasowania SVG o warianty z nazwami polskimi i włoskimi.',
      'Zachowano lokalne ilustracje i obsługę offline.'
    ]
  }),
  '2.1.14': Object.freeze({
    intro: 'Żarłok 2.1.14 — lokalne ilustracje SVG i pewniejsze aktualizacje offline.',
    items: [
      'Dodano do pamięci podręcznej 10 dedykowanych ilustracji SVG, aby były dostępne również offline.',
      'Wyrównano wersję zasobów interfejsu z wersją aplikacji i Service Workera.',
      'Dane receptur i stany magazynowe pozostają bez zmian.'
    ]
  }),
  '2.1.13': Object.freeze({
    intro: 'Żarłok 2.1.13 — osobne fotografie dla czterech dań azjatyckich.',
    items: [
      'Dodano lokalne zdjęcia tom yum z krewetkami, ramen tonkotsu, sushi maki z ogórkiem i łososiem oraz pho bo.',
      'Audyt zdjęć sprawdza dokładne dopasowanie tych dań.',
      'Test offline sprawdza teraz cache wszystkich dwunastu nowych fotografii.'
    ]
  }),
  '2.1.12': Object.freeze({
    intro: 'Żarłok 2.1.12 — cztery kolejne zdjęcia przypisane do konkretnych receptur.',
    items: [
      'Dodano lokalne zdjęcia pizzy Diavola, burgera z czarnej fasoli, risotto alla milanese i pesto genovese.',
      'Test offline sprawdza teraz obecność wszystkich ośmiu nowych zdjęć w cache Service Workera.',
      'Audyt dopasowania kontroluje również cztery nowe pary receptura–fotografia.'
    ]
  }),
  '2.1.11': Object.freeze({
    intro: 'Żarłok 2.1.11 — cztery nowe fotografie konkretnych dań.',
    items: [
      'Dodano autorskie, lokalne zdjęcia gołąbków, sernika, spaghetti aglio e olio oraz sałatki Cezar.',
      'Nowe fotografie są dostępne bez internetu i mają osobne reguły dopasowania do receptur.',
      'Pozostałe dania bez pewnego dopasowania zachowują właściwe ilustracje SVG.'
    ]
  }),
  '2.1.10': Object.freeze({
    intro: 'Żarłok 2.1.10 — dokładniejsze zdjęcia i wygodniejsze szczegóły receptur.',
    items: [
      'Pełne szczegóły receptury rozwijają się w bieżącym widoku i można je ponownie zamknąć.',
      'Przeliczanie porcji otwiera panel z podglądem wyniku; dodano test interakcji tego przepływu.',
      'Zdjęcie kategorii nie zastępuje już fotografii konkretnego dania — przy braku dopasowania zostaje ilustracja SVG.',
      'Poprawiono opisy aplikacji i testy mobilne dla nowego panelu receptury.'
    ]
  }),
  '2.1.9': Object.freeze({
    intro: 'Żarłok 2.1.9 — nowy, autorski zestaw fotografii dań przygotowany w Adobe Firefly.',
    items: [
      'Wymieniono 40 lokalnych fotografii na osobno wygenerowane zdjęcia dopasowane do konkretnych potraw.',
      'Zdjęcia są przechowywane lokalnie w aplikacji i mogą działać offline po zapisaniu w pamięci podręcznej.',
      'Zachowano ilustrację zastępczą, gdy brak pewnego dopasowania do konkretnej potrawy.',
      'Odświeżono wersję aplikacji i pamięci podręcznej, aby pobrać nowy zestaw zdjęć.'
    ]
  }),
  '2.1.8': Object.freeze({
    intro: 'Żarłok 2.1.8 — spójniejsze zdjęcia i bezpieczniejsze dopasowanie potraw.',
    items: [
      'Usunięto powtórzone reguły przypisywania zdjęć do receptur.',
      'Nieznana potrawa nie dostaje już automatycznie zdjęcia deseru — pozostaje jej ilustracja zastępcza.',
      'Ujednolicono kadrowanie, tła i obramowania zdjęć w kartach na iPhonie.',
      'Kategorie bez pasującej fotografii, takie jak sosy bazowe i prep, zachowują ilustrację zamiast pokazywać przypadkowe danie.',
      'Odświeżono wersję pamięci podręcznej dla aktualizacji aplikacji i pracy offline.'
    ]
  }),
  '2.1.6': Object.freeze({
    intro: 'Poprawiona fotografia na ekranie Start — bez widocznej ciemnej ramki i nakładki.',
    items: [
      'Zdjęcie wyróżnionego przepisu wypełnia cały zaokrąglony kafel.',
      'Usunięto dodatkowe tło spod tekstu i skorygowano kadr fotografii.',
      'Zaktualizowano pamięć podręczną dla Safari i trybu offline.'
    ]
  }),
  '2.1.5': Object.freeze({
    intro: 'Żarłok 2.1.5 — nowy kierunek graficzny inspirowany iOS i szkłem.',
    items: [
      'Dodano spójną warstwę graficzną: grafitowe powierzchnie, miedziane akcenty i subtelne szkło.',
      'Dopracowano stany aktywne, pola formularzy, kafelki, przyciski i dolną nawigację.',
      'Zachowano tryb offline, lokalne zasoby i obsługę ograniczenia animacji.',
      'Przygotowano autorskie materiały art direction w Adobe Firefly do dalszej integracji.'
    ]
  }),
  '2.1.4': Object.freeze({
    intro: 'Żarłok 2.1.4 — uporządkowany ekran receptur na iPhonie.',
    items: [
      'Zdjęcia receptur mają wspólne proporcje, stabilne kadrowanie i spokojniejszą obróbkę kolorów.',
      'Bagietka ma teraz osobną fotografię zamiast zdjęcia okrągłego bochenka na zakwasie.',
      'Wyłączono rozmycie animowane przy ładowaniu zdjęć.',
      'Dolna nawigacja jest niższa, ma bardziej czytelne zakładki i nie zasłania końca listy.',
      'Poprawiono wykrywanie klawiatury iOS, aby komunikaty aktualizacji nie pojawiały się nad wyszukiwarką.'
    ],
  }),
  '2.1.3': Object.freeze({
    intro: 'Żarłok 2.1.3 — spójniejsze ikony i dokładniejsze dopasowanie zdjęć.',
    items: [
      'Kafelki kategorii korzystają z jednego zestawu ikon SVG zamiast mieszaniny emoji.',
      'Cynamon, sól i pieprz mają odrębne symbole składników.',
      'Zdjęcie Moscow Mule nie jest już przypisywane do innych koktajli; Aperol Spritz zachowuje własną fotografię.',
      'Poprawki grafiki nie zmieniają receptur ani stanów magazynowych.'
    ],
  }),
  '2.1.2': Object.freeze({
    intro: 'Żarłok 2.1.2 — dopracowany interfejs mobilny.',
    items: [
      'Ujednolicono odstępy, pola wyszukiwania, filtry i siatkę receptur na iPhonie.',
      'Poprawiono czytelność aktywnych filtrów i głównego przycisku oraz zachowanie elementów dotykowych.',
      'Dopracowano kontrast w jasnym motywie i uwzględniono ustawienie ograniczenia animacji.',
      'Bez zmian w recepturach, magazynie, kalkulatorach i formacie danych.'
    ],
  }),
  '2.1.1': Object.freeze({
    intro: 'Żarłok 2.1.1 — pewniejsze przygotowanie aplikacji do pracy offline.',
    items: [
      'Brak pojedynczego zdjęcia, ikony lub fontu nie blokuje już instalacji całego Service Workera.',
      'Pliki niezbędne do uruchomienia aplikacji nadal są wymagane podczas aktualizacji — nie ukrywamy braków kodu.',
      'Nie zmieniono receptur, stanów magazynowych ani formatu kopii zapasowych.'
    ],
  }),
  '2.1.0': Object.freeze({
    intro: 'Żarłok 2.1 — przebudowany interfejs na iPhone, oparty na zdjęciach i wyraźnej hierarchii.',
    items: [
      'Ekran Start ma teraz duży fotograficzny panel dania, skróty w kaflach i czytelniejsze karty magazynu oraz zakupów.',
      'Receptury i kategorie korzystają z większych, uporządkowanych kafli zamiast drobnych, okrągłych elementów.',
      'Karta receptury, pola, okna i dolny dock otrzymały jeden spójny system powierzchni, odstępów i akcentów.',
      'Zachowano dotychczasową logikę, zapis danych, wyszukiwanie, magazyn i działanie offline.'
    ],
  }),
  '2.0.1': Object.freeze({
    intro: 'Żarłok 2.0.1 — fotograficzny interfejs i 38 zdjęć potraw dostępnych offline.',
    items: [
      'Dodano 38 lokalnych fotografii potraw: od pizzy, makaronów i zup po pierogi, pieczywo, desery, dania azjatyckie i koktajle.',
      'Ekran Start, karty receptur, szczegóły dań i widok Gotuję korzystają z większych zdjęć dopasowanych do potraw.',
      'Własne zdjęcia zapisane przy recepturze nadal mają pierwszeństwo, a lokalna ilustracja SVG pozostaje awaryjnym fallbackiem.',
      'Wszystkie fotografie są zapisane w aplikacji i buforowane przez Service Workera, także do pracy offline.',
      'Zachowano zapisane receptury, ustawienia i magazyn; zmiany dotyczą warstwy wizualnej i zdjęć.'
    ],
  }),
  '2.0.0': Object.freeze({
    intro: 'Żarłok 2.0 — prawdziwe zdjęcia potraw działające także offline.',
    items: [
      'Dodano cztery oryginalne zdjęcia potraw: pizzę Margherita, carbonarę, risotto ai funghi i łososia z masłem cytrynowym.',
      'Zdjęcia są przechowywane lokalnie w aplikacji zamiast na zewnętrznym serwerze, więc działają stabilniej i po utracie połączenia.',
      'Nowe zdjęcia są wstępnie buforowane przez Service Workera i mają lokalne ilustracje SVG jako awaryjny fallback.',
      'Poprawiono dopasowanie zdjęcia risotta i odświeżono cache aplikacji do wersji 2.0.0.'
    ],
  }),
  '1.9.31': Object.freeze({
    intro: 'Oryginalne zdjęcia potraw i bardziej dopracowane mikroanimacje.',
    items: [
      'Wygenerowane w Adobe Firefly zdjęcia pizzy, carbonary, risotta i łososia są przypisane do pasujących receptur.',
      'Jeśli zdjęcie nie załaduje się lub aplikacja działa offline, automatycznie wraca ilustracja SVG.',
      'Dodano subtelne wejście zdjęć, zoom kart, sprężyste serca ulubionych i lepsze stany fokusu.',
      'Ustawienie systemowe „Ogranicz ruch” wyłącza dodatkowe animacje.'
    ],
  }),
  '1.9.30': Object.freeze({
    intro: 'Dopracowane animacje i płynniejsze reakcje interfejsu.',
    items: [
      'Sekcje pojawiają się łagodnie, a aktywne zakładki i ulubione mają krótką animację sprężystą.',
      'Karty receptur, kategorie i okna dialogowe reagują subtelniej na dotyk.',
      'Animacje respektują systemowe ustawienie „Ogranicz ruch”.',
      'Dotychczasowe ilustracje SVG pozostają dostępne jako niezależny od sieci fallback.'
    ],
  }),

  '1.9.29': Object.freeze({
    intro: 'Nowa, spójna szata graficzna Żarłoka — dopracowana pod iPhone’a.',
    items: [
      'Ujednolicono szkło Liquid Glass, tła, karty i obramowania w całej aplikacji.',
      'Zdjęcia receptur otrzymały bardziej dopracowaną oprawę, a typografia wyraźniejszą hierarchię.',
      'Dolna nawigacja stała się pływającym, czytelnym dokiem; główne przyciski mają spójny miedziany akcent.',
      'Dopracowano pola, okna, magazyn i zachowanie na wąskich ekranach. Funkcje aplikacji pozostają bez zmian.'
    ],
  }),

  '1.9.28': Object.freeze({
    intro: 'Magazyn rozpoznaje osobne partie produktów i pilnuje kolejności zużycia.',
    items: [
      'Każda nowa dostawa może być zapisana jako osobna partia z własną ilością, datą przyjęcia, terminem i ceną.',
      'Podczas gotowania składniki są odliczane najpierw z partii z najbliższym terminem (FEFO), a przy remisie ze starszej dostawy (FIFO).',
      'Stary stan magazynowy jest automatycznie zachowywany jako partia legacy; dotychczasowe dane nie są zerowane.',
      'Kopie zapasowe, import, scalanie i czyszczenie obejmują również partie magazynowe.'
    ],
    footer: 'Stan widoczny na karcie produktu nadal jest sumą wszystkich partii. Stare pozycje bez terminu pozostają bez daty do czasu dodania partii z terminem.'
  }),
  '1.9.27': Object.freeze({
    intro: 'Pilnuj terminów przydatności bezpośrednio w magazynie.',
    items: [
      'Do produktu magazynowego można dodać termin przydatności.',
      'Magazyn pokazuje osobne liczniki produktów po terminie i z terminem w ciągu 3 dni.',
      'Pilne pozycje mają wyróżnione ostrzeżenia na kartach i w panelu „Terminy do sprawdzenia”.',
      'Panel i oznaczenia działają lokalnie, również bez połączenia z internetem.'
    ],
    footer: 'Termin jest przypisany do całego wpisu produktu, a nie do poszczególnych partii.'
  }),
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
