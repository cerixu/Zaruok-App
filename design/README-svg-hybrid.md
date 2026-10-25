# Żarłok — wzorcowy zestaw SVG: hybryda premium + flat

To jest **prototyp koncepcyjny**, niezmieniający głównej aplikacji. Zestaw jest zapisany na gałęzi `design/svg-style-audit`.

## Założenia
- hybryda premium i płaskiego stylu;
- przezroczyste tło SVG;
- średni poziom detali, z czytelnością na ekranie telefonu;
- wspólna paleta, kontrolowane cienie i rozpoznawalne składniki;
- brak zmian w `main` i brak usuwania zdjęć.

## Wzorcowe ilustracje — osobne pliki SVG
- [Carbonara](svg-hybrid/carbonara.svg)
- [Pizza Margherita](svg-hybrid/margherita.svg)
- [Krem pomidorowy](svg-hybrid/tomato-soup.svg)
- [Burger klasyczny](svg-hybrid/burger.svg)
- [Sałatka grecka](svg-hybrid/greek-salad.svg)
- [Mojito](svg-hybrid/mojito.svg)

Każdy plik ma własny kwadratowy `viewBox`, tytuł i opis dostępności, lokalne definicje kolorów oraz przezroczyste tło. Ilustracje nie pobierają zewnętrznych zasobów.
- `design/svg-hybrid-preview.svg` pozostaje ogólną planszą poglądową sprzed rozdzielenia assetów.

## Kontrola jakości
- `qa/svg-illustration-smoke.mjs` sprawdza strukturę plików, opisy, referencje SVG, przezroczyste tło, rozmiar i wyróżniki dania.
- Kontrola jest podłączona do workflow Visual QA i zostanie uruchomiona na pull requeście.

## Następny krok
Ocenić kształty i styl na iPhonie, zebrać uwagi, a następnie dopracować osobne, semantycznie poprawne motywy. Dopiero po akceptacji stylu należy integrować system z `art.js` i aktualizować testy.
