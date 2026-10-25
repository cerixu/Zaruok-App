# Żarłok — wzorcowy zestaw SVG: hybryda premium + flat

To jest **prototyp koncepcyjny**, niezmieniający głównej aplikacji. Zestaw prototypowy jest wersjonowany w repozytorium w `design/svg-hybrid/`.

## Założenia
- hybryda premium i płaskiego stylu;
- przezroczyste tło SVG;
- średni poziom detali, z czytelnością na ekranie telefonu;
- wspólna paleta, kontrolowane cienie i rozpoznawalne składniki;
- prototypy są wersjonowane w repozytorium, ale nie są podłączone do aktywnego interfejsu i nie zastępują zdjęć.

## Wzorcowe ilustracje — 18 osobnych plików SVG
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

Każdy plik ma własny kwadratowy `viewBox`, tytuł i opis dostępności, lokalne definicje kolorów oraz przezroczyste tło. Ilustracje nie pobierają zewnętrznych zasobów.
- Podgląd obu teł znajduje się w `design/svg-hybrid-preview.html`; to strona kontrolna, nie element aktywnego interfejsu.

## Kontrola jakości
- `qa/svg-illustration-smoke.mjs` sprawdza strukturę plików, opisy, referencje SVG, przezroczyste tło, rozmiar i wyróżniki dania.
- Kontrola jest podłączona do workflow Visual QA i zostanie uruchomiona na pull requeście.

## Następny krok
Ocenić kształty i styl na iPhonie, zebrać uwagi, a następnie dopracować osobne, semantycznie poprawne motywy. Dopiero po akceptacji stylu należy integrować system z `art.js` i aktualizować testy.
