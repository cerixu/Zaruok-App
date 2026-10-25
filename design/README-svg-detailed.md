# Żarłok — wzorzec ilustracji kulinarnych SVG

Wzorzec bazowy: `svg-detailed/carbonara.svg`.

## Styl docelowy
- Szczegółowa ilustracja wektorowa premium, z gładkim cieniowaniem, mocnymi ale czystymi konturami, refleksami i czytelnymi składnikami.
- Nie używać uproszczonych piktogramów złożonych z kilku kółek/kwadratów.
- Makaron ma mieć wyraźne pasma, warstwowanie i światło; dodatki muszą być rozpoznawalne już w miniaturze.
- Naczynia dopasowane do ciemnego interfejsu: grafitowa/czarna ceramika, subtelne neutralne refleksy, bez jaskrawego turkusu i terakoty.
- Przezroczyste tło: bez białego pola, szachownicy zapisanej w obrazie ani napisów.
- Nie dodawać składników, których nie ma w potrawie. Carbonara bez bazylii.
- Każde danie ma własną kompozycję i właściwe składniki, ale wspólną kreskę, oświetlenie, kontrast i poziom detalu.

## Workflow
1. Najpierw przygotować wzorcową ilustrację w docelowym stylu.
2. Przekształcić ją w SVG i sprawdzić faktyczny render, nie tylko poprawność składni.
3. Sprawdzić przezroczystość oraz wygląd na tle `#101214` i na jasnym tle testowym.
4. Ograniczać nadmiarowe ścieżki i filtry, aby asset był lekki na iPhonie.
5. Nie wdrażać serii, dopóki wzorzec dania nie zostanie zaakceptowany.

Pracować w paczkach po 10 potraw. Nie integrować prototypu z aplikacją bez osobnej akceptacji.
