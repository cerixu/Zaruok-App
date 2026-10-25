# Żarłok — styl ilustracji SVG premium

Ten katalog definiuje wzorzec ilustracji kulinarnych dla ciemnego interfejsu aplikacji. Pierwszy wzorzec: `carbonara.svg`.

## Kierunek artystyczny
- Szczegółowa ilustracja wektorowa w stylu premium/cel-shaded, a nie ikona piktogramowa.
- Zachować charakter przykładu: czytelne, szerokie pasma spaghetti, czyste kontury, jasne połyski, stopniowane cienie i składniki o rozpoznawalnym kształcie.
- Naczynia powinny pasować do ciemnego UI: grafit, antracyt, czarna ceramika, subtelne chłodne lub neutralne refleksy. Nie używać turkusowo-terakotowej miski jako domyślnego stylu.
- Składniki mają mieć własne barwy i mocno odcinać się od naczynia.
- Tło musi być w pełni przezroczyste. Nie dodawać białych kafelków, szachownicy jako zawartości obrazu ani napisów.
- Bez ziół/ozdobników, które nie należą do dania. Carbonara bez bazylii.
- Każde danie ma inne, poprawne składniki i kompozycję; wspólny język kreski, światła, kontrastu i poziomu detali.

## Zasady techniczne
- Format SVG z `viewBox`, semantycznym `title` i `desc`.
- Lokalne gradienty i proste filtry; bez zewnętrznych zależności, bitmap osadzonych w SVG ani skryptów.
- Ograniczać liczbę ścieżek i filtrów tak, by pliki były lekkie dla iPhone'a.
- Sprawdzać wizualnie na ciemnym tle aplikacji oraz na jasnym tle testowym.
- Techniczna poprawność SVG nie oznacza akceptacji: danie musi być rozpoznawalne w małej miniaturze i stylistycznie bliskie referencji.

## Iteracja
Pracować partiami po 10 dań, ale najpierw dopracować carbonarę jako wzorzec. Nie łączyć gałęzi z główną aplikacją ani nie podmieniać obecnych zdjęć bez osobnej akceptacji.
