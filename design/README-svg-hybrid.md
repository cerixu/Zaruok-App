# Żarłok — wzorcowy zestaw SVG: hybryda premium + flat

To jest **prototyp koncepcyjny**, niezmieniający głównej aplikacji. Zestaw prototypowy jest wersjonowany w repozytorium w `design/svg-hybrid/`.

## Założenia
- hybryda premium i płaskiego stylu;
- przezroczyste tło SVG;
- średni poziom detali, z czytelnością na ekranie telefonu;
- wspólna paleta, kontrolowane cienie i rozpoznawalne składniki;
- prototypy są wersjonowane w repozytorium, ale nie są podłączone do aktywnego interfejsu i nie zastępują zdjęć.

## Wzorcowe ilustracje — 20 osobnych plików SVG
- [Carbonara](svg-hybrid/carbonara.svg)
- [Pizza Margherita](svg-hybrid/margherita.svg)
- [Krem pomidorowy](svg-hybrid/tomato-soup.svg)
- [Burger klasyczny](svg-hybrid/burger.svg)
- [Sałatka grecka](svg-hybrid/greek-salad.svg)
- [Mojito](svg-hybrid/mojito.svg)
- [Tiramisù](svg-hybrid/tiramisu.svg)
- [Panna cotta](svg-hybrid/panna-cotta.svg)
- [Lasagne alla bolognese](svg-hybrid/lasagna.svg)
- [Ravioli ricotta e spinaci](svg-hybrid/ravioli.svg)
- [Risotto ai funghi](svg-hybrid/risotto-funghi.svg)
- [Gnocchi al pomodoro](svg-hybrid/gnocchi.svg)
- [Sushi maki z łososiem i ogórkiem](svg-hybrid/sushi-maki.svg)
- [Łosoś z cytryną i masłem](svg-hybrid/salmon-lemon-butter.svg)
- [Stek wołowy z masłem ziołowym](svg-hybrid/steak-herb-butter.svg)
- [Pierogi ruskie z cebulką](svg-hybrid/pierogi-ruskie.svg)
- [Sałatka Cezar](svg-hybrid/caesar-salad.svg)
- [Krem z grzybów](svg-hybrid/mushroom-soup.svg)
- [Bruschetta al pomodoro](svg-hybrid/bruschetta.svg)
- [Tagliatelle al ragù](svg-hybrid/tagliatelle-ragu.svg)

Każdy plik ma własny kwadratowy `viewBox`, tytuł i opis dostępności, lokalne definicje kolorów oraz przezroczyste tło. Ilustracje nie pobierają zewnętrznych zasobów.
- Podgląd obu teł znajduje się w `design/svg-hybrid-preview.html`; to strona kontrolna, nie element aktywnego interfejsu.
- `design/svg-production-compare.html` zestawia 10 produkcyjnych SVG i 20 prototypów na szachownicy przezroczystości oraz na jasnym i ciemnym tle; wszystkie źródła są lokalne.

## Kontrola jakości
- `qa/svg-illustration-smoke.mjs` sprawdza strukturę plików, opisy, referencje SVG, rozmiar, wyróżniki dania oraz typowe pełnoekranowe tła narysowane ścieżką.
- `qa/svg-illustration-visual.mjs` rasteruje każdy prototyp i sprawdza piksele przy krawędziach; wykrywa również tła złożone z niestandardowych ścieżek.
- Produkcyjne SVG są renderowane i sprawdzane diagnostycznie pod kątem nieprzezroczystych krawędzi. Wykryte stare tła są raportowane do osobnej migracji zamiast ukrywania problemu.
- Kontrola jest podłączona do workflow Visual QA.

## Stan migracji produkcyjnej
- `assets/food-svg/bruschetta.svg` jest pierwszą produkcyjną ilustracją przeniesioną na zatwierdzony wzorzec hybrydowy w wersji 2.1.17.
- `assets/food-svg/tagliatelle-ragu.svg` jest drugą produkcyjną ilustracją przeniesioną na ten wzorzec w wersji 2.1.18.
- `assets/food-svg/lasagna.svg` jest trzecią produkcyjną ilustracją przeniesioną na ten wzorzec w wersji 2.1.20.
- `assets/food-svg/pizza-margherita.svg` jest czwartą produkcyjną ilustracją przeniesioną na ten wzorzec w wersji 2.1.21.
- `assets/food-svg/panna-cotta.svg` jest piątą produkcyjną ilustracją przeniesioną na ten wzorzec w wersji 2.1.22.
- `assets/food-svg/ravioli-ricotta-spinaci.svg` jest szóstą produkcyjną ilustracją przeniesioną na ten wzorzec w wersji 2.1.23.
- Reguły dopasowania wszystkich sześciu receptur pozostają bez zmian; zastąpiono wyłącznie lokalne pliki SVG.
- Wszystkie sześć assetów jest uwzględnionych w precache Service Workera i kontrolowanych testami przezroczystości.

## Następny krok
Po zaliczeniu CI ocenić kolejną produkcyjną ilustrację na jasnym, ciemnym i szachownicowym tle. Migrować pojedynczo, bez masowej podmiany, z testem przezroczystości i mapowania receptury.
