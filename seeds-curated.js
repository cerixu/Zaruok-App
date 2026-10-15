/* ==========================================================================
   seeds-curated.js — dodatkowe receptury po audycie językowym i jakościowym.
   Zbiór wejściowy: wybrane receptury z audytu Groka; wpisy mają opis i kroki
   dopasowane do rodzaju dania. Odrzucono duplikaty i powtarzalne warianty.
   ========================================================================== */
export const SEED_CURATED = `# Pierogi z mięsem
@ cat=mieso origin=PL trad servings=1 prep=32 cook=48 art=food tags=tradycyjne,pierogi,mięso,kuchnia-polska
: Domowe pierogi z farszem z mięsa z rosołu.
90 g | mąka pszenna
0,3 szt. | jajko
40 ml | woda
100 g | mięso wołowo-wieprzowe
0,5 szt. | cebula
3 g | sól
1 g | pieprz czarny
10 g | masło
> Przygotuj składniki: warzywa oczyść i pokrój, mięso osusz i dopraw.
> Podsmaż składniki, które wymagają zrumienienia. W przypadku potraw duszonych dodaj płyn i zbierz z dna patelni przyrumienione soki.
> Duś lub gotuj łagodnie pod przykryciem, aż mięso i warzywa będą miękkie. Kontroluj ilość płynu i w razie potrzeby uzupełnij.
> Dopraw pod koniec, gdy smaki się skoncentrują. W razie potrzeby odtłuść sos lub wywar.
> Podawaj zgodnie z charakterem dania — gorące, z dodatkami przewidzianymi w recepturze.

# Uszka z grzybami
@ cat=inne origin=PL trad servings=1 prep=24 cook=36 art=food tags=tradycyjne,wigilijne,zupa,kuchnia-polska
: Małe pierożki do barszczu, nadziewane grzybami.
60 g | mąka pszenna
30 ml | woda
10 g | grzyby suszone
0,5 szt. | cebula
12 ml | oliwa z oliwek
3 g | sól
> Grzyby namocz i ugotuj do miękkości. Posiekaj bardzo drobno i połącz z zeszkloną cebulą. Farsz powinien być zwarty, nie wodnisty.
> Z mąki, wody i soli zagnieć gładkie ciasto. Przykryj i odstaw na 15 minut.
> Rozwałkuj bardzo cienko i pokrój na małe kwadraty. Na środek każdego nałóż odrobinę farszu.
> Złóż kwadrat w trójkąt, dokładnie zlep brzegi, a następnie połącz dwa końce wokół palca.
> Gotuj w osolonym wrzątku 2–3 minuty od wypłynięcia. Podawaj z barszczem.

# Żurek staropolski
@ cat=zupy origin=PL trad servings=1 prep=20 cook=30 art=soup tags=tradycyjne,zupa,wielkanoc,kuchnia-polska
: Zupa na zakwasie żytnim z kiełbasą, jajkiem i ziemniakami.
80 ml | zakwas żytni
60 g | kiełbasa biała
80 g | ziemniaki
1 szt. | jajko
1 szt. | czosnek
2 g | majeranek
20 ml | śmietana 18%
3 g | sól
> Ziemniaki pokrój w kostkę. Białą kiełbasę zalej wodą lub bulionem, dodaj czosnek i przyprawy, po czym gotuj łagodnie, aż kiełbasa będzie ugotowana.
> Wyjmij kiełbasę, pokrój ją w plastry, a do wywaru dodaj ziemniaki. Gotuj do miękkości.
> Zakwas wymieszaj i wlej stopniowo do zupy, próbując kwasowość. Gotuj kilka minut na małym ogniu.
> Śmietanę zahartuj kilkoma łyżkami gorącej zupy i wlej do garnka. Dodaj majeranek oraz kiełbasę.
> Podawaj gorący, z jajkiem na twardo, jeśli jest w składnikach.

# Sernik krakowski
@ cat=desery origin=PL trad servings=1 prep=36 cook=54 art=dessert tags=tradycyjne,ciasto,sernik,kuchnia-polska
: Sernik na kruchym spodzie z twarogu i skórką cytrynową.
180 g | twaróg
1 szt. | jajko
40 g | cukier
30 g | masło
40 g | mąka pszenna
2 g | skórka cytrynowa
> Przygotuj spód z podanych składników. Jeśli używasz kruchego ciasta, schłodź je przed wałkowaniem.
> Przygotuj nadzienie: owoce pokrój i dopraw, a masę serową wymieszaj tylko do połączenia składników.
> Wyłóż formę, dodaj nadzienie i wyrównaj powierzchnię. Nie przepełniaj formy.
> Piecz w temperaturze odpowiedniej dla rodzaju wypieku, aż środek się zetnie, a wierzch będzie złoty. Przy serniku środek może lekko drżeć.
> Ostudź przed krojeniem; wypieki z kremowym nadzieniem schłodź w lodówce.

# Pączki różane
@ cat=desery origin=PL trad servings=1 prep=60 cook=90 art=dessert tags=tradycyjne,tłusty-czwartek,drożdżowe,kuchnia-polska
: Puszyste pączki z nadzieniem różanym, w cukrze pudrze.
80 g | mąka pszenna
40 ml | mleko
4 g | drożdże świeże
0,4 szt. | jajko
12 g | masło
10 g | cukier
20 g | marmolada różana
80 ml | olej do smażenia
> Przygotuj wszystkie składniki i nagrzej piekarnik do temperatury odpowiedniej dla tego deseru.
> Wymieszaj składniki suche osobno, a mokre połącz w drugim naczyniu, jeśli receptura zawiera obie grupy.
> Połącz składniki delikatnie, tylko do uzyskania jednolitej masy. Przełóż do formy lub przygotuj porcje.
> Piecz, gotuj albo schładzaj zgodnie z metodą właściwą dla danego deseru; kontroluj konsystencję, nie tylko czas.
> Ostudź lub schłodź przed dekorowaniem. Podawaj w temperaturze odpowiedniej dla deseru.

# Spaghetti Carbonara
@ cat=pasta origin=IT trad servings=1 prep=18 cook=26 art=pasta tags=tradycyjne,włochy,makaron,kuchnia-włoska
: Klasyczna rzymska carbonara z guanciale i pecorino.
90 g | spaghetti
35 g | guanciale
1 szt. | żółtko
25 g | pecorino
1 g | pieprz czarny
> Guanciale pokrój w krótkie paski i wytapiaj na chłodnej patelni, stopniowo zwiększając ogień. Gdy będzie złote, zdejmij patelnię z palnika.
> W misce połącz żółtka z drobno startym pecorino i świeżo mielonym pieprzem. Masa powinna być gęsta i jednolita.
> Ugotuj spaghetti al dente. Zachowaj kubek wody z gotowania, a makaron przełóż do patelni z guanciale.
> Zdejmij patelnię z ognia. Dodaj masę jajeczno-serową i mieszaj energicznie, dolewając po trochu wody z makaronu, aż powstanie kremowy sos.
> Podawaj natychmiast, z dodatkowym pecorino i pieprzem.

# Spaghetti alle vongole
@ cat=pasta origin=IT trad servings=1 prep=17 cook=25 art=pasta tags=tradycyjne,włochy,makaron,kuchnia-włoska
: Spaghetti z małżami, czosnkiem i pietruszką.
90 g | spaghetti
150 g | małże
1 szt. | czosnek
40 ml | białe wino
4 g | natka pietruszki
12 ml | oliwa z oliwek
> Małże dokładnie oczyść. Odrzuć sztuki z pękniętą muszlą oraz te, które nie zamykają się po stuknięciu.
> Ugotuj spaghetti al dente w osolonej wodzie; zachowaj kubek wody z gotowania.
> Na dużej patelni delikatnie podgrzej oliwę z czosnkiem. Dodaj małże i białe wino, przykryj i gotuj, aż muszle się otworzą. Zamknięte po obróbce odrzuć.
> Przełóż makaron na patelnię, dodaj odrobinę wody z gotowania i potrząsaj patelnią, aż sos połączy się z makaronem.
> Posyp natką pietruszki i podawaj od razu.

# Tagliatelle al ragù
@ cat=pasta origin=IT trad servings=1 prep=14 cook=22 art=pasta tags=tradycyjne,włochy,makaron,kuchnia-włoska
: Wstążki z wolno duszonym ragù bolońskim.
90 g | tagliatelle
70 g | wołowina mielona
0,5 szt. | cebula
20 g | marchew
15 g | seler naciowy
60 ml | przecier pomidorowy
> Posiekaj cebulę, marchew i seler naciowy. Podsmaż powoli na tłuszczu przewidzianym w recepturze, aż zmiękną.
> Dodaj mieloną wołowinę i smaż, rozdrabniając ją łopatką, aż straci surowy kolor i zacznie się rumienić.
> Dodaj pomidory oraz płyn z listy składników. Duś na małym ogniu, aż sos zgęstnieje, a mięso będzie miękkie; w razie potrzeby dolej trochę wody.
> Ugotuj tagliatelle al dente i połącz z ragù. Jeśli sos jest zbyt gęsty, dolej odrobinę wody z gotowania.
> Podawaj od razu, z tartym serem, jeśli jest w składnikach.

# Linguine al pesto
@ cat=pasta origin=IT trad servings=1 prep=14 cook=21 art=pasta tags=tradycyjne,włochy,makaron,kuchnia-włoska
: Linguine z genueńskim pesto.
90 g | linguine
20 g | bazylia
8 g | piniole
20 g | parmezan
1 szt. | czosnek
12 ml | oliwa z oliwek
> Ugotuj linguine al dente i zachowaj część wody z gotowania.
> Utrzyj lub krótko zmiksuj bazylię, czosnek, orzeszki piniowe i ser. Wlewaj oliwę do uzyskania gęstego pesto.
> Przełóż pesto do miski lub na patelnię zdjętą z ognia. Nie gotuj go, aby bazylia zachowała świeży aromat.
> Dodaj linguine i odrobinę wody z gotowania. Mieszaj, aż pesto równomiernie oblepi makaron.
> Podawaj od razu, z dodatkowym serem, jeśli został.

# Bucatini all'amatriciana
@ cat=pasta origin=IT trad servings=1 prep=9 cook=14 art=pasta tags=tradycyjne,włochy,makaron,kuchnia-włoska
: Bucatini z guanciale i pecorino.
90 g | bucatini
35 g | guanciale
90 g | pomidory pelati
20 g | pecorino
> Ugotuj bucatini al dente. Zachowaj trochę wody z gotowania.
> Guanciale pokrój w paski i wytapiaj na patelni, aż będzie złote. Chili dodaj pod koniec, jeśli jest w składnikach.
> Dodaj pomidory pelati, rozgnieć je łopatką i gotuj 10–15 minut, aż sos zgęstnieje.
> Wrzuć makaron do sosu, dolej odrobinę wody z gotowania i dokładnie wymieszaj.
> Zdejmij patelnię z ognia, dodaj pecorino i podawaj natychmiast.

# Tonnarelli cacio e pepe
@ cat=pasta origin=IT trad servings=1 prep=14 cook=20 art=pasta tags=tradycyjne,włochy,makaron,kuchnia-włoska
: Rzymski makaron tonnarelli z pecorino i świeżo mielonym pieprzem.
90 g | tonnarelli
40 g | pecorino
1 g | pieprz czarny
> Ugotuj tonnarelli w wodzie z umiarkowaną ilością soli. Zachowaj co najmniej kubek wody z gotowania.
> Na suchej patelni krótko podgrzej świeżo mielony pieprz, aż zacznie pachnieć.
> Przełóż makaron na patelnię i dodaj kilka łyżek gorącej wody z gotowania.
> Zdejmij patelnię z ognia. Stopniowo wsypuj drobno starte pecorino, mieszając i dolewając wodę po trochu, aż powstanie kremowy sos.
> Podawaj natychmiast z dodatkowym pieprzem.

# Pasta alla Norma
@ cat=pasta origin=IT trad servings=1 prep=16 cook=24 art=pasta tags=tradycyjne,włochy,makaron,kuchnia-włoska
: Sycylijski makaron z bakłażanem, pomidorami i ricottą salata.
90 g | rigatoni
80 g | bakłażan
80 ml | przecier pomidorowy
20 g | ricotta salata
4 g | bazylia
> Bakłażana pokrój w kostkę, oprósz solą i po kilku minutach osusz. Usmaż lub upiecz do miękkości i lekkiego zrumienienia.
> Na oliwie krótko podsmaż czosnek, dodaj pomidory i duś sos 10–15 minut. Dopraw solą.
> Ugotuj makaron al dente i zachowaj trochę wody z gotowania.
> Połącz makaron z sosem i bakłażanem. Dolej odrobinę wody z gotowania, jeśli sos jest zbyt gęsty.
> Podawaj z ricottą salata i bazylią.

# Orecchiette z brokułem
@ cat=pasta origin=IT trad servings=1 prep=16 cook=23 art=pasta tags=tradycyjne,włochy,makaron,kuchnia-włoska
: Makaron orecchiette z brokułami, czosnkiem, anchois i oliwą.
90 g | orecchiette
100 g | brokuł
1 szt. | czosnek
8 g | anchois
12 ml | oliwa z oliwek
> Brokuł podziel na małe różyczki. Makaron ugotuj w osolonej wodzie; brokuł dodaj w ostatnich minutach, aby zmiękł, ale się nie rozpadł.
> Na patelni podgrzej oliwę z czosnkiem i anchois. Rozetrzyj anchois łopatką, aż połączą się z oliwą.
> Przełóż makaron i brokuł na patelnię. Dolej trochę wody z gotowania i rozgnieć część brokułów, aby zagęściły sos.
> Spróbuj i dopraw pieprzem; sól dodawaj ostrożnie, bo anchois jest słone.
> Podawaj na gorąco.

# Gnocchi al gorgonzola
@ cat=pasta origin=IT servings=1 prep=11 cook=17 art=pasta tags=włochy,makaron,kuchnia-włoska
: Kopytka w sosie z gorgonzolą.
150 g | gnocchi
35 g | gorgonzola
30 ml | śmietana 18%
8 g | orzechy włoskie
> Zagotuj osoloną wodę i ugotuj gnocchi zgodnie z instrukcją na opakowaniu. Odcedź, gdy wypłyną, zachowując odrobinę wody.
> Delikatnie podgrzej śmietankę w rondelku. Dodaj pokruszoną gorgonzolę i mieszaj, aż powstanie gładki sos.
> Połącz gnocchi z sosem. Jeśli jest zbyt gęsty, dolej trochę wody z gotowania.
> Posiekaj orzechy włoskie i rozsyp je na wierzchu.
> Podawaj natychmiast.

# Ravioli ricotta e spinaci
@ cat=pasta origin=IT trad servings=1 prep=12 cook=18 art=pasta tags=tradycyjne,włochy,makaron,kuchnia-włoska
: Ravioli ze szpinakiem i ricottą, masło szałwiowe.
140 g | ravioli
10 g | masło
4 g | szałwia
15 g | parmezan
> Zagotuj dużą ilość osolonej wody. Gotuj ravioli delikatnie według instrukcji na opakowaniu, aby nie uszkodzić pierożków.
> Na patelni rozpuść masło i dodaj szałwię. Podgrzewaj krótko, aż masło zacznie pachnieć orzechowo.
> Przełóż ravioli na patelnię, dodaj łyżkę wody z gotowania i delikatnie obtocz w maśle.
> Posyp parmezanem.
> Podawaj od razu.

# Risotto z grzybami
@ cat=warzywa origin=IT servings=1 prep=12 cook=17 art=food tags=włochy,makaron,kuchnia-włoska
: Kremowe risotto z grzybami leśnymi.
80 g | ryż arborio
70 g | grzyby mieszane
240 ml | bulion
18 g | parmezan
10 g | masło
> Posiekaj cebulę i zeszklij na maśle lub oliwie. Wsyp ryż i mieszaj 1–2 minuty, aż ziarenka staną się lekko przezroczyste na brzegach.
> Wlej wino, jeśli jest w składnikach, i odparuj. Dodaj szafran lub grzyby zgodnie z recepturą.
> Dolewaj gorący bulion chochlami, mieszając i czekając, aż poprzednia porcja zostanie wchłonięta.
> Gotuj do kremowej konsystencji z ryżem al dente. Zdejmij z ognia i wmieszaj masło oraz ser, jeśli są w składnikach.
> Odstaw na minutę i podawaj od razu.

# Penne alla vodka
@ cat=pasta origin=IT servings=1 prep=15 cook=22 art=pasta tags=włochy,makaron,kuchnia-włoska
: Penne w kremowym sosie pomidorowym z wódką.
90 g | penne
70 ml | przecier pomidorowy
30 ml | śmietana 18%
15 ml | wódka
1 szt. | czosnek
> Ugotuj penne al dente i zachowaj trochę wody z gotowania.
> Na oliwie krótko podsmaż czosnek. Dodaj przecier pomidorowy i duś kilka minut.
> Wlej wódkę i gotuj chwilę, by złagodzić ostry zapach alkoholu. Dodaj śmietankę i łagodnie podgrzej.
> Wrzuć penne do sosu, dolej odrobinę wody z gotowania i wymieszaj.
> Podawaj od razu, z serem lub ziołami, jeśli są w składnikach.

# Spaghetti puttanesca
@ cat=pasta origin=IT trad servings=1 prep=15 cook=23 art=pasta tags=tradycyjne,włochy,makaron,kuchnia-włoska
: Ostry makaron z kaparami, oliwkami i anchois.
90 g | spaghetti
20 g | oliwki
8 g | kapary
8 g | anchois
70 ml | przecier pomidorowy
> Ugotuj spaghetti al dente. Zachowaj trochę wody z gotowania.
> Na oliwie krótko podgrzej czosnek, dodaj anchois i rozetrzyj je łopatką.
> Dodaj pomidory, posiekane oliwki i kapary. Gotuj 8–12 minut, aż sos lekko zgęstnieje; spróbuj przed dosoleniem.
> Połącz spaghetti z sosem i odrobiną wody z gotowania.
> Podawaj od razu, z ziołami przewidzianymi w składnikach.

# Trofie al pesto
@ cat=pasta origin=IT trad servings=1 prep=9 cook=14 art=pasta tags=tradycyjne,włochy,makaron,kuchnia-włoska
: Trofie z pesto, ziemniakami i fasolką.
90 g | trofie
30 g | pesto
40 g | ziemniaki
30 g | fasolka szparagowa
> Ziemniaki pokrój w małą kostkę. Ugotuj je i fasolkę w osolonej wodzie; trofie dołóż zgodnie z czasem gotowania na opakowaniu.
> Odcedź, zachowując trochę wody z gotowania. Przełóż wszystkie składniki do dużej miski.
> Dodaj pesto i kilka łyżek ciepłej wody z gotowania. Wymieszaj delikatnie, aż sos oblepi makaron i warzywa.
> Spróbuj i w razie potrzeby dopraw.
> Podawaj od razu, zanim pesto straci świeży aromat.

# Cannelloni ricotta
@ cat=pasta origin=IT servings=1 prep=11 cook=16 art=pasta tags=włochy,makaron,kuchnia-włoska
: Cannelloni z ricottą i szpinakiem zapiekane w pomidorach.
80 g | cannelloni
70 g | ricotta
40 g | szpinak
80 ml | przecier pomidorowy
15 g | parmezan
> Krótko podduś szpinak, aż zwiędnie. Ostudź, odciśnij nadmiar płynu i wymieszaj z ricottą oraz przyprawami z listy.
> Napełnij cannelloni masą serowo-szpinakową. Jeśli makaron wymaga wcześniejszego gotowania, wykonaj ten krok zgodnie z instrukcją na opakowaniu.
> Na dnie naczynia rozprowadź część sosu pomidorowego. Ułóż cannelloni i przykryj resztą sosu, aby makaron nie pozostał suchy.
> Posyp parmezanem i piecz w 180°C przez około 30–35 minut, aż makaron zmięknie, a wierzch się zarumieni.
> Odczekaj 5 minut przed podaniem.

# Pizza Margherita
@ cat=pizza origin=IT trad servings=1 prep=10 cook=15 art=pizza tags=tradycyjne,pizza,pieczone,kuchnia-włoska
: Pizza na sosie pomidorowym z mozzarellą i świeżą bazylią.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
50 g | sos pomidorowy
70 g | mozzarella
4 g | świeża bazylia
> Rozgrzej piec i kamień lub stal do temperatury przewidzianej dla używanego ciasta. Przygotuj składniki i odsącz mozzarellę, jeśli jest wilgotna.
> Rozciągnij kulkę ciasta ręcznie, zostawiając nieco grubszy brzeg. Nie dociskaj rantu.
> Rozprowadź cienką warstwę pomidorów, dodaj mozzarellę i pozostałe dodatki z listy.
> Piecz na mocno rozgrzanym podłożu, aż spód będzie wypieczony, a rant wyrośnie i się zarumieni. Czas zależy od temperatury pieca.
> Po wypieku dodaj świeżą bazylię i oliwę, jeśli są w składnikach.

# Pizza Marinara
@ cat=pizza origin=IT trad servings=1 prep=10 cook=15 art=pizza tags=tradycyjne,pizza,pieczone,kuchnia-włoska
: Pizza neapolitańska z sosem pomidorowym, czosnkiem i oregano; bez sera.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
50 g | sos pomidorowy
4 g | czosnek
1 g | oregano
> Rozgrzej piec i kamień lub stal do maksymalnej temperatury odpowiedniej dla ciasta.
> Rozciągnij ciasto ręcznie, pozostawiając wyższy brzeg.
> Nałóż cienką warstwę pomidorów, dodaj czosnek, oregano i oliwę. Nie dodawaj sera — marinara jest tradycyjnie bez mozzarelli.
> Piecz, aż spód będzie wypieczony, a rant wyrośnie i się zarumieni.
> Po wyjęciu skrop oliwą i podawaj od razu.

# Pizza Diavola
@ cat=pizza origin=IT servings=1 prep=10 cook=15 art=pizza tags=pizza,pieczone,kuchnia-włoska
: Pizza z mozzarellą, pikantnym salami i chili.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
45 g | sos pomidorowy
60 g | mozzarella
35 g | salami pikantne
1 g | chili
> Rozgrzej piec oraz kamień lub stal do temperatury odpowiedniej dla używanego ciasta. Odsącz wilgotne dodatki.
> Rozciągnij kulkę ciasta ręcznie, pozostawiając nieco grubszy brzeg.
> Nałóż cienką warstwę sosu lub oliwy, a następnie dodatki z listy. Nie przeciążaj środka, by spód dobrze się wypiekł.
> Piecz na mocno rozgrzanym podłożu, aż spód będzie wypieczony, a rant wyrośnie i się zarumieni. Czas zależy od temperatury pieca.
> Po wypieku dodaj świeże zioła lub oliwę, jeśli są w składnikach, i podawaj od razu.

# Pizza Capricciosa
@ cat=pizza origin=IT servings=1 prep=10 cook=15 art=pizza tags=pizza,pieczone,kuchnia-włoska
: Pizza z szynką, pieczarkami, karczochami i oliwkami.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
45 g | sos pomidorowy
50 g | mozzarella
25 g | szynka gotowana
25 g | pieczarki
20 g | karczochy
10 g | oliwki
> Rozgrzej piec oraz kamień lub stal do temperatury odpowiedniej dla używanego ciasta. Odsącz wilgotne dodatki.
> Rozciągnij kulkę ciasta ręcznie, pozostawiając nieco grubszy brzeg.
> Nałóż cienką warstwę sosu lub oliwy, a następnie dodatki z listy. Nie przeciążaj środka, by spód dobrze się wypiekł.
> Piecz na mocno rozgrzanym podłożu, aż spód będzie wypieczony, a rant wyrośnie i się zarumieni. Czas zależy od temperatury pieca.
> Po wypieku dodaj świeże zioła lub oliwę, jeśli są w składnikach, i podawaj od razu.

# Pizza Prosciutto e rucola
@ cat=pizza origin=IT servings=1 prep=10 cook=15 art=pizza tags=pizza,pieczone,kuchnia-włoska
: Pizza z szynką parmeńską, rukolą i parmezanem.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
40 g | sos pomidorowy
50 g | mozzarella
25 g | szynka parmeńska
15 g | rukola
10 g | parmezan
> Rozgrzej piec oraz kamień lub stal do temperatury odpowiedniej dla używanego ciasta. Odsącz wilgotne dodatki.
> Rozciągnij kulkę ciasta ręcznie, pozostawiając nieco grubszy brzeg.
> Nałóż cienką warstwę sosu lub oliwy, a następnie dodatki z listy. Nie przeciążaj środka, by spód dobrze się wypiekł.
> Piecz na mocno rozgrzanym podłożu, aż spód będzie wypieczony, a rant wyrośnie i się zarumieni. Czas zależy od temperatury pieca.
> Po wypieku dodaj świeże zioła lub oliwę, jeśli są w składnikach, i podawaj od razu.

# Pizza Quattro stagioni
@ cat=pizza origin=IT trad servings=1 prep=10 cook=15 art=pizza tags=tradycyjne,pizza,pieczone,kuchnia-włoska
: Pizza z czterema dodatkami: szynką, pieczarkami, karczochami i oliwkami.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
45 g | sos pomidorowy
50 g | mozzarella
20 g | szynka gotowana
20 g | pieczarki
20 g | karczochy
10 g | oliwki
> Rozgrzej piec oraz kamień lub stal do temperatury odpowiedniej dla używanego ciasta. Odsącz wilgotne dodatki.
> Rozciągnij kulkę ciasta ręcznie, pozostawiając nieco grubszy brzeg.
> Nałóż cienką warstwę sosu lub oliwy, a następnie dodatki z listy. Nie przeciążaj środka, by spód dobrze się wypiekł.
> Piecz na mocno rozgrzanym podłożu, aż spód będzie wypieczony, a rant wyrośnie i się zarumieni. Czas zależy od temperatury pieca.
> Po wypieku dodaj świeże zioła lub oliwę, jeśli są w składnikach, i podawaj od razu.

# Pizza Ortolana
@ cat=pizza origin=IT servings=1 prep=10 cook=15 art=pizza tags=pizza,pieczone,kuchnia-włoska
: Wegetariańska pizza z cukinią, bakłażanem i papryką.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
45 g | sos pomidorowy
50 g | mozzarella
25 g | cukinia
25 g | bakłażan
25 g | papryka
> Rozgrzej piec oraz kamień lub stal do temperatury odpowiedniej dla używanego ciasta. Odsącz wilgotne dodatki.
> Rozciągnij kulkę ciasta ręcznie, pozostawiając nieco grubszy brzeg.
> Nałóż cienką warstwę sosu lub oliwy, a następnie dodatki z listy. Nie przeciążaj środka, by spód dobrze się wypiekł.
> Piecz na mocno rozgrzanym podłożu, aż spód będzie wypieczony, a rant wyrośnie i się zarumieni. Czas zależy od temperatury pieca.
> Po wypieku dodaj świeże zioła lub oliwę, jeśli są w składnikach, i podawaj od razu.

# Pizza Tonno e cipolla
@ cat=pizza origin=IT servings=1 prep=10 cook=15 art=pizza tags=pizza,pieczone,kuchnia-włoska
: Pizza z tuńczykiem, cebulą i kaparami.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
45 g | sos pomidorowy
45 g | mozzarella
40 g | tuńczyk odsączony
20 g | cebula
5 g | kapary
> Rozgrzej piec oraz kamień lub stal do temperatury odpowiedniej dla używanego ciasta. Odsącz wilgotne dodatki.
> Rozciągnij kulkę ciasta ręcznie, pozostawiając nieco grubszy brzeg.
> Nałóż cienką warstwę sosu lub oliwy, a następnie dodatki z listy. Nie przeciążaj środka, by spód dobrze się wypiekł.
> Piecz na mocno rozgrzanym podłożu, aż spód będzie wypieczony, a rant wyrośnie i się zarumieni. Czas zależy od temperatury pieca.
> Po wypieku dodaj świeże zioła lub oliwę, jeśli są w składnikach, i podawaj od razu.

# Pizza Boscaiola
@ cat=pizza origin=IT servings=1 prep=10 cook=15 art=pizza tags=pizza,pieczone,kuchnia-włoska
: Pizza z włoską kiełbasą salsiccia i pieczarkami.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
40 g | sos pomidorowy
55 g | mozzarella
35 g | włoska kiełbasa salsiccia
30 g | pieczarki
> Rozgrzej piec oraz kamień lub stal do temperatury odpowiedniej dla używanego ciasta. Odsącz wilgotne dodatki.
> Rozciągnij kulkę ciasta ręcznie, pozostawiając nieco grubszy brzeg.
> Nałóż cienką warstwę sosu lub oliwy, a następnie dodatki z listy. Nie przeciążaj środka, by spód dobrze się wypiekł.
> Piecz na mocno rozgrzanym podłożu, aż spód będzie wypieczony, a rant wyrośnie i się zarumieni. Czas zależy od temperatury pieca.
> Po wypieku dodaj świeże zioła lub oliwę, jeśli są w składnikach, i podawaj od razu.

# Pizza Frutti di mare
@ cat=pizza origin=IT servings=1 prep=10 cook=15 art=pizza tags=pizza,pieczone,kuchnia-włoska
: Pizza z owocami morza, czosnkiem i natką pietruszki.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
45 g | sos pomidorowy
60 g | owoce morza
3 g | czosnek
3 g | natka pietruszki
> Rozgrzej piec oraz kamień lub stal do temperatury odpowiedniej dla używanego ciasta. Odsącz wilgotne dodatki.
> Rozciągnij kulkę ciasta ręcznie, pozostawiając nieco grubszy brzeg.
> Nałóż cienką warstwę sosu lub oliwy, a następnie dodatki z listy. Nie przeciążaj środka, by spód dobrze się wypiekł.
> Piecz na mocno rozgrzanym podłożu, aż spód będzie wypieczony, a rant wyrośnie i się zarumieni. Czas zależy od temperatury pieca.
> Po wypieku dodaj świeże zioła lub oliwę, jeśli są w składnikach, i podawaj od razu.

# Pizza Calzone
@ cat=pizza origin=IT servings=1 prep=10 cook=15 art=pizza tags=pizza,pieczone,kuchnia-włoska
: Zamknięta pizza calzone z ricottą, mozzarellą i szynką.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
35 g | sos pomidorowy
50 g | mozzarella
30 g | ricotta
30 g | szynka gotowana
> Rozgrzej piec i przygotuj farsz, odcedzając składniki, które mogłyby puścić dużo wody.
> Rozciągnij ciasto w okrąg, ułóż farsz na jednej połowie i zostaw wolny brzeg.
> Złóż ciasto na pół i dokładnie sklej brzegi, aby farsz nie wypływał.
> Piecz na mocno rozgrzanym podłożu, aż ciasto wyrośnie i równomiernie się zarumieni.
> Odczekaj chwilę po wypieku, po czym przekrój i podawaj gorące.

# Pizza Bianca z ziemniakami
@ cat=pizza origin=IT servings=1 prep=10 cook=15 art=pizza tags=pizza,pieczone,kuchnia-włoska
: Biała pizza z cienko krojonymi ziemniakami, rozmarynem i pecorino.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
60 g | ziemniaki cienko pokrojone
35 g | mozzarella
20 g | pecorino
1 g | rozmaryn
> Rozgrzej piec oraz kamień lub stal do temperatury odpowiedniej dla używanego ciasta. Odsącz wilgotne dodatki.
> Rozciągnij kulkę ciasta ręcznie, pozostawiając nieco grubszy brzeg.
> Nałóż cienką warstwę sosu lub oliwy, a następnie dodatki z listy. Nie przeciążaj środka, by spód dobrze się wypiekł.
> Piecz na mocno rozgrzanym podłożu, aż spód będzie wypieczony, a rant wyrośnie i się zarumieni. Czas zależy od temperatury pieca.
> Po wypieku dodaj świeże zioła lub oliwę, jeśli są w składnikach, i podawaj od razu.

# Pizza Salsiccia e friarielli
@ cat=pizza origin=IT trad servings=1 prep=10 cook=15 art=pizza tags=tradycyjne,pizza,pieczone,kuchnia-włoska
: Pizza z kiełbasą salsiccia i brokułami friarielli.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
35 g | sos pomidorowy
45 g | mozzarella
40 g | kiełbasa salsiccia
40 g | brokuł włoski friarielli
> Rozgrzej piec oraz kamień lub stal do temperatury odpowiedniej dla używanego ciasta. Odsącz wilgotne dodatki.
> Rozciągnij kulkę ciasta ręcznie, pozostawiając nieco grubszy brzeg.
> Nałóż cienką warstwę sosu lub oliwy, a następnie dodatki z listy. Nie przeciążaj środka, by spód dobrze się wypiekł.
> Piecz na mocno rozgrzanym podłożu, aż spód będzie wypieczony, a rant wyrośnie i się zarumieni. Czas zależy od temperatury pieca.
> Po wypieku dodaj świeże zioła lub oliwę, jeśli są w składnikach, i podawaj od razu.

# Pizza ’Nduja z miodem
@ cat=pizza origin=IT servings=1 prep=10 cook=15 art=pizza tags=pizza,pieczone,kuchnia-włoska
: Pizza z pikantną ndują, mozzarellą i odrobiną miodu.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
35 g | sos pomidorowy
60 g | mozzarella
25 g | nduja
8 g | miód
> Rozgrzej piec oraz kamień lub stal do temperatury odpowiedniej dla używanego ciasta. Odsącz wilgotne dodatki.
> Rozciągnij kulkę ciasta ręcznie, pozostawiając nieco grubszy brzeg.
> Nałóż cienką warstwę sosu lub oliwy, a następnie dodatki z listy. Nie przeciążaj środka, by spód dobrze się wypiekł.
> Piecz na mocno rozgrzanym podłożu, aż spód będzie wypieczony, a rant wyrośnie i się zarumieni. Czas zależy od temperatury pieca.
> Po wypieku dodaj świeże zioła lub oliwę, jeśli są w składnikach, i podawaj od razu.

# Pizza z truflą i pieczarkami
@ cat=pizza origin=IT servings=1 prep=10 cook=15 art=pizza tags=pizza,pieczone,kuchnia-włoska
: Biała pizza z pieczarkami, pastą truflową i parmezanem.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
50 g | mozzarella
35 g | pieczarki
5 g | pasta truflowa
15 g | parmezan
> Rozgrzej piec oraz kamień lub stal do temperatury odpowiedniej dla używanego ciasta. Odsącz wilgotne dodatki.
> Rozciągnij kulkę ciasta ręcznie, pozostawiając nieco grubszy brzeg.
> Nałóż cienką warstwę sosu lub oliwy, a następnie dodatki z listy. Nie przeciążaj środka, by spód dobrze się wypiekł.
> Piecz na mocno rozgrzanym podłożu, aż spód będzie wypieczony, a rant wyrośnie i się zarumieni. Czas zależy od temperatury pieca.
> Po wypieku dodaj świeże zioła lub oliwę, jeśli są w składnikach, i podawaj od razu.

# Pizza Hawajska
@ cat=pizza origin=US servings=1 prep=10 cook=15 art=pizza tags=pizza,pieczone,kuchnia-amerykańska
: Pizza z szynką i ananasem.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
45 g | sos pomidorowy
60 g | mozzarella
30 g | szynka gotowana
30 g | ananas
> Rozgrzej piec oraz kamień lub stal do temperatury odpowiedniej dla używanego ciasta. Odsącz wilgotne dodatki.
> Rozciągnij kulkę ciasta ręcznie, pozostawiając nieco grubszy brzeg.
> Nałóż cienką warstwę sosu lub oliwy, a następnie dodatki z listy. Nie przeciążaj środka, by spód dobrze się wypiekł.
> Piecz na mocno rozgrzanym podłożu, aż spód będzie wypieczony, a rant wyrośnie i się zarumieni. Czas zależy od temperatury pieca.
> Po wypieku dodaj świeże zioła lub oliwę, jeśli są w składnikach, i podawaj od razu.

# Pizza BBQ kurczak
@ cat=pizza origin=US servings=1 prep=10 cook=15 art=pizza tags=pizza,pieczone,kuchnia-amerykańska
: Pizza z kurczakiem, sosem barbecue, mozzarellą i czerwoną cebulą.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
35 g | sos barbecue
50 g | mozzarella
40 g | kurczak pieczony
20 g | czerwona cebula
> Rozgrzej piec oraz kamień lub stal do temperatury odpowiedniej dla używanego ciasta. Odsącz wilgotne dodatki.
> Rozciągnij kulkę ciasta ręcznie, pozostawiając nieco grubszy brzeg.
> Nałóż cienką warstwę sosu lub oliwy, a następnie dodatki z listy. Nie przeciążaj środka, by spód dobrze się wypiekł.
> Piecz na mocno rozgrzanym podłożu, aż spód będzie wypieczony, a rant wyrośnie i się zarumieni. Czas zależy od temperatury pieca.
> Po wypieku dodaj świeże zioła lub oliwę, jeśli są w składnikach, i podawaj od razu.

# Pizza Spinaci e uovo
@ cat=pizza origin=IT servings=1 prep=10 cook=15 art=pizza tags=pizza,pieczone,kuchnia-włoska
: Biała pizza ze szpinakiem, jajkiem i pecorino.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
40 g | mozzarella
40 g | szpinak
1 szt. | jajko
15 g | pecorino
> Rozgrzej piec oraz kamień lub stal do temperatury odpowiedniej dla używanego ciasta. Odsącz wilgotne dodatki.
> Rozciągnij kulkę ciasta ręcznie, pozostawiając nieco grubszy brzeg.
> Nałóż cienką warstwę sosu lub oliwy, a następnie dodatki z listy. Nie przeciążaj środka, by spód dobrze się wypiekł.
> Piecz na mocno rozgrzanym podłożu, aż spód będzie wypieczony, a rant wyrośnie i się zarumieni. Czas zależy od temperatury pieca.
> Po wypieku dodaj świeże zioła lub oliwę, jeśli są w składnikach, i podawaj od razu.

# Pizza Gorgonzola e pere
@ cat=pizza origin=IT servings=1 prep=10 cook=15 art=pizza tags=pizza,pieczone,kuchnia-włoska
: Biała pizza z gorgonzolą, gruszką i orzechami włoskimi.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
30 g | mozzarella
25 g | gorgonzola
30 g | gruszka
8 g | orzechy włoskie
> Rozgrzej piec oraz kamień lub stal do temperatury odpowiedniej dla używanego ciasta. Odsącz wilgotne dodatki.
> Rozciągnij kulkę ciasta ręcznie, pozostawiając nieco grubszy brzeg.
> Nałóż cienką warstwę sosu lub oliwy, a następnie dodatki z listy. Nie przeciążaj środka, by spód dobrze się wypiekł.
> Piecz na mocno rozgrzanym podłożu, aż spód będzie wypieczony, a rant wyrośnie i się zarumieni. Czas zależy od temperatury pieca.
> Po wypieku dodaj świeże zioła lub oliwę, jeśli są w składnikach, i podawaj od razu.

# Pizza Pesto i pomidorki
@ cat=pizza origin=IT servings=1 prep=10 cook=15 art=pizza tags=pizza,pieczone,kuchnia-włoska
: Pizza z pesto, pomidorkami koktajlowymi i mozzarellą.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
20 g | pesto alla genovese
40 g | pomidorki koktajlowe
50 g | mozzarella
> Rozgrzej piec oraz kamień lub stal do temperatury odpowiedniej dla używanego ciasta. Odsącz wilgotne dodatki.
> Rozciągnij kulkę ciasta ręcznie, pozostawiając nieco grubszy brzeg.
> Nałóż cienką warstwę sosu lub oliwy, a następnie dodatki z listy. Nie przeciążaj środka, by spód dobrze się wypiekł.
> Piecz na mocno rozgrzanym podłożu, aż spód będzie wypieczony, a rant wyrośnie i się zarumieni. Czas zależy od temperatury pieca.
> Po wypieku dodaj świeże zioła lub oliwę, jeśli są w składnikach, i podawaj od razu.

# Pizza Cotto e funghi
@ cat=pizza origin=IT servings=1 prep=10 cook=15 art=pizza tags=pizza,pieczone,kuchnia-włoska
: Pizza z gotowaną szynką, pieczarkami i mozzarellą.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
45 g | sos pomidorowy
60 g | mozzarella
30 g | szynka gotowana
30 g | pieczarki
> Rozgrzej piec oraz kamień lub stal do temperatury odpowiedniej dla używanego ciasta. Odsącz wilgotne dodatki.
> Rozciągnij kulkę ciasta ręcznie, pozostawiając nieco grubszy brzeg.
> Nałóż cienką warstwę sosu lub oliwy, a następnie dodatki z listy. Nie przeciążaj środka, by spód dobrze się wypiekł.
> Piecz na mocno rozgrzanym podłożu, aż spód będzie wypieczony, a rant wyrośnie i się zarumieni. Czas zależy od temperatury pieca.
> Po wypieku dodaj świeże zioła lub oliwę, jeśli są w składnikach, i podawaj od razu.

# Pizza Zucca e salsiccia
@ cat=pizza origin=IT servings=1 prep=10 cook=15 art=pizza tags=pizza,pieczone,kuchnia-włoska
: Biała pizza z dynią, kiełbasą salsiccia i szałwią.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
50 g | dynia pieczona
45 g | mozzarella
35 g | kiełbasa salsiccia
1 g | szałwia
> Rozgrzej piec oraz kamień lub stal do temperatury odpowiedniej dla używanego ciasta. Odsącz wilgotne dodatki.
> Rozciągnij kulkę ciasta ręcznie, pozostawiając nieco grubszy brzeg.
> Nałóż cienką warstwę sosu lub oliwy, a następnie dodatki z listy. Nie przeciążaj środka, by spód dobrze się wypiekł.
> Piecz na mocno rozgrzanym podłożu, aż spód będzie wypieczony, a rant wyrośnie i się zarumieni. Czas zależy od temperatury pieca.
> Po wypieku dodaj świeże zioła lub oliwę, jeśli są w składnikach, i podawaj od razu.

# Bouillabaisse
@ cat=zupy origin=FR trad servings=1 prep=10 cook=16 art=soup tags=tradycyjne,zupa,kuchnia-francuska
: Prowansalska zupa rybna z szafranem.
140 g | ryba mieszana
40 g | małże
50 g | pomidor
0,1 g | szafran
1 szt. | czosnek
20 g | fenkuł
> Warzywa i pozostałe składniki oczyść oraz pokrój. Jeśli receptura zawiera mięso lub aromaty, obsmaż je krótko przed dodaniem płynu.
> Dodaj bulion lub wodę oraz twardsze składniki, które potrzebują najdłuższego gotowania.
> Gotuj na łagodnym ogniu, aż składniki będą miękkie. Delikatne warzywa, makaron lub owoce morza dodaj później, by ich nie rozgotować.
> Dopraw pod koniec. Śmietanę, cytrynę lub zioła dodaj stopniowo, próbując smak po każdym dodatku.
> Podawaj gorące, z dodatkami przewidzianymi w recepturze.

# Miso shiru
@ cat=zupy origin=JP trad servings=1 prep=14 cook=20 art=soup tags=tradycyjne,zupa,kuchnia-japońska
: Japońska zupa miso z tofu i wakame.
18 g | pasta miso
220 ml | dashi
40 g | tofu
3 g | wakame
8 g | cebula dymka
> Przygotuj dodatki i pokrój je na równe kawałki. Jeśli używasz makaronu, ugotuj go osobno.
> Podgrzej bulion, ale nie doprowadzaj go do gwałtownego wrzenia.
> Rozprowadź pastę miso w niewielkiej ilości gorącego bulionu i wlej z powrotem do garnka. Nie gotuj intensywnie po dodaniu miso.
> Dodaj tofu, glony, warzywa lub owoce morza z receptury i podgrzej do gotowości.
> Podawaj od razu; świeże zioła dodaj na sam koniec.

# Tom yum
@ cat=zupy servings=1 prep=24 cook=35 art=soup tags=tradycyjne,zupa,kuchnia-azjatycka
: Pikantno-kwaśna tajska zupa z krewetkami.
80 g | krewetki
8 g | trawa cytrynowa
5 g | galangal
0,4 szt. | limonka
12 g | pasta tom yum
30 g | pieczarki
> Przygotuj bulion. Dodaj trawę cytrynową, galangal lub imbir, liście limonki i chili, jeśli są w składnikach. Gotuj kilka minut, aby uwolnić aromaty.
> Dodaj grzyby i twardsze warzywa, a po chwili krewetki lub inne owoce morza.
> Gotuj tylko do momentu, gdy owoce morza będą gotowe — zbyt długie gotowanie sprawia, że stają się gumowate.
> Zdejmij garnek z ognia i dopraw sokiem z limonki oraz sosem rybnym z receptury. Spróbuj równowagi kwaśnego, słonego i ostrego smaku.
> Podawaj od razu, z ziołami przewidzianymi w składnikach.

# Tom kha gai
@ cat=zupy servings=1 prep=19 cook=29 art=soup tags=tradycyjne,zupa,kuchnia-azjatycka
: Tajska zupa kokosowa z kurczakiem.
80 g | filet z kurczaka
150 ml | mleko kokosowe
5 g | galangal
0,3 szt. | limonka
6 g | trawa cytrynowa
> Podgrzej bulion z mlekiem kokosowym. Dodaj trawę cytrynową, galangal lub imbir oraz liście limonki z receptury.
> Gotuj łagodnie kilka minut, aby płyn nabrał aromatu. Nie dopuszczaj do gwałtownego wrzenia mleka kokosowego.
> Dodaj pokrojonego kurczaka i grzyby. Gotuj delikatnie, aż mięso będzie całkowicie ugotowane.
> Zdejmij z ognia i dopraw sokiem z limonki oraz sosem rybnym. Sprawdź równowagę słoności i kwasowości.
> Podawaj gorącą, z kolendrą lub innymi ziołami z listy.

# Avgolemono
@ cat=zupy servings=1 prep=20 cook=30 art=soup tags=tradycyjne,zupa,kuchnia-śródziemnomorska
: Grecka zupa cytrynowo-jajeczna z ryżem.
240 ml | bulion z kury
25 g | ryż
0,8 szt. | jajko
0,3 szt. | cytryna
3 g | sól
> Warzywa i pozostałe składniki oczyść oraz pokrój. Jeśli receptura zawiera mięso lub aromaty, obsmaż je krótko przed dodaniem płynu.
> Dodaj bulion lub wodę oraz twardsze składniki, które potrzebują najdłuższego gotowania.
> Gotuj na łagodnym ogniu, aż składniki będą miękkie. Delikatne warzywa, makaron lub owoce morza dodaj później, by ich nie rozgotować.
> Dopraw pod koniec. Śmietanę, cytrynę lub zioła dodaj stopniowo, próbując smak po każdym dodatku.
> Podawaj gorące, z dodatkami przewidzianymi w recepturze.

# Zupa z soczewicy
@ cat=zupy servings=1 prep=20 cook=29 art=soup tags=tradycyjne,zupa,kuchnia-śródziemnomorska
: Zupa z czerwonej soczewicy z kuminem.
50 g | soczewica czerwona
0,5 szt. | cebula
2 g | kumin
0,3 szt. | cytryna
4 g | kolendra
> Soczewicę wypłucz na sicie. Cebulę, marchew i inne warzywa z receptury pokrój w drobną kostkę.
> Podsmaż cebulę i przyprawy na tłuszczu z receptury, aż zaczną pachnieć. Dodaj pozostałe warzywa.
> Wsyp soczewicę, wlej bulion lub wodę i gotuj łagodnie, aż soczewica będzie miękka.
> Jeśli chcesz uzyskać gęstszą konsystencję, rozgnieć część soczewicy lub krótko zblenduj zupę. Dopraw solą i kwasem z receptury.
> Podawaj gorącą, z ziołami lub jogurtem, jeśli są w składnikach.

# Clam chowder
@ cat=zupy origin=US trad servings=1 prep=20 cook=29 art=soup tags=tradycyjne,zupa,kuchnia-amerykańska
: Kremowa zupa z małżami i ziemniakami.
80 g | małże
70 g | ziemniaki
30 ml | śmietana 18%
20 g | seler naciowy
15 g | boczek
> Pokrój cebulę, seler i ziemniaki w niewielką kostkę. Podsmaż cebulę i seler na maśle, aż zmiękną.
> Jeśli receptura zawiera boczek, wytop go na początku i wykorzystaj tłuszcz do warzyw.
> Wsyp mąkę, jeśli jest w składnikach, i mieszaj minutę. Stopniowo wlej bulion oraz mleko lub śmietankę, mieszając, aby nie powstały grudki.
> Dodaj ziemniaki i gotuj, aż będą miękkie. Małże dodaj pod koniec i podgrzej krótko, aby nie stwardniały.
> Dopraw i podawaj gorącą.

# Pozole
@ cat=zupy origin=MX trad servings=1 prep=25 cook=38 art=soup tags=tradycyjne,zupa,kuchnia-meksykańska
: Meksykańska zupa z hominy i wieprzowiną.
90 g | wieprzowina
60 g | kukurydza hominy
2 g | oregano
20 g | rzodkiewka
0,3 szt. | limonka
> Warzywa i pozostałe składniki oczyść oraz pokrój. Jeśli receptura zawiera mięso lub aromaty, obsmaż je krótko przed dodaniem płynu.
> Dodaj bulion lub wodę oraz twardsze składniki, które potrzebują najdłuższego gotowania.
> Gotuj na łagodnym ogniu, aż składniki będą miękkie. Delikatne warzywa, makaron lub owoce morza dodaj później, by ich nie rozgotować.
> Dopraw pod koniec. Śmietanę, cytrynę lub zioła dodaj stopniowo, próbując smak po każdym dodatku.
> Podawaj gorące, z dodatkami przewidzianymi w recepturze.

# Mulligatawny
@ cat=zupy origin=IN trad servings=1 prep=14 cook=20 art=soup tags=tradycyjne,zupa,kuchnia-indyjska
: Indyjska zupa curry z soczewicą.
40 g | soczewica
50 g | kurczak
6 g | curry
40 ml | mleko kokosowe
20 g | jabłko
> Warzywa i pozostałe składniki oczyść oraz pokrój. Jeśli receptura zawiera mięso lub aromaty, obsmaż je krótko przed dodaniem płynu.
> Dodaj bulion lub wodę oraz twardsze składniki, które potrzebują najdłuższego gotowania.
> Gotuj na łagodnym ogniu, aż składniki będą miękkie. Delikatne warzywa, makaron lub owoce morza dodaj później, by ich nie rozgotować.
> Dopraw pod koniec. Śmietanę, cytrynę lub zioła dodaj stopniowo, próbując smak po każdym dodatku.
> Podawaj gorące, z dodatkami przewidzianymi w recepturze.

# Gulaszowa zupa
@ cat=zupy servings=1 prep=24 cook=37 art=soup tags=tradycyjne,zupa
: Węgierska zupa gulaszowa z papryką.
90 g | wołowina
0,5 szt. | cebula
8 g | papryka słodka
60 g | ziemniaki
1 g | kminek
> Warzywa i pozostałe składniki oczyść oraz pokrój. Jeśli receptura zawiera mięso lub aromaty, obsmaż je krótko przed dodaniem płynu.
> Dodaj bulion lub wodę oraz twardsze składniki, które potrzebują najdłuższego gotowania.
> Gotuj na łagodnym ogniu, aż składniki będą miękkie. Delikatne warzywa, makaron lub owoce morza dodaj później, by ich nie rozgotować.
> Dopraw pod koniec. Śmietanę, cytrynę lub zioła dodaj stopniowo, próbując smak po każdym dodatku.
> Podawaj gorące, z dodatkami przewidzianymi w recepturze.

# Caprese
@ cat=salatki origin=IT trad servings=1 prep=8 cook=12 art=food tags=tradycyjne,sałatka,świeże,kuchnia-włoska
: Pomidor, mozzarella, bazylia, oliwa.
100 g | pomidor
70 g | mozzarella
5 g | bazylia
12 ml | oliwa z oliwek
5 ml | ocet balsamiczny
> Pomidory i mozzarellę pokrój w plastry podobnej grubości.
> Ułóż na talerzu na przemian plastry pomidora i mozzarelli.
> Rozłóż świeże liście bazylii. Skrop oliwą z oliwek.
> Dopraw solą i świeżo mielonym pieprzem tuż przed podaniem.
> Podawaj w temperaturze pokojowej, aby pomidory zachowały pełnię smaku.

# Niçoise
@ cat=salatki origin=FR trad servings=1 prep=8 cook=12 art=food tags=tradycyjne,sałatka,świeże,kuchnia-francuska
: Tuńczyk, jajko, fasolka, oliwki, anchois.
60 g | tuńczyk
1 szt. | jajko
40 g | fasolka szparagowa
40 g | ziemniaki
15 g | oliwki
> Umyj i dokładnie osusz warzywa oraz zioła. Pokrój składniki na równe, wygodne do jedzenia kawałki.
> Przygotuj dressing, łącząc składniki płynne i przyprawy. Wymieszaj lub wstrząśnij do uzyskania emulsji.
> Jeśli receptura zawiera białko, ser lub pieczywo, przygotuj je osobno i ostudź przed połączeniem z delikatnymi liśćmi.
> Połącz składniki tuż przed podaniem, aby sałatka zachowała świeżość i chrupkość.
> Spróbuj, skoryguj sól i kwasowość, a następnie podawaj.

# Fattoush
@ cat=salatki servings=1 prep=8 cook=12 art=food tags=tradycyjne,sałatka,świeże,kuchnia-śródziemnomorska
: Chrupiący chleb pita, warzywa, sumak.
30 g | pita
40 g | ogórek
50 g | pomidor
2 g | sumak
20 g | rzodkiewka
12 ml | oliwa z oliwek
> Warzywa umyj i osusz. Pomidory, ogórek, rzodkiewkę i pozostałe składniki pokrój na kawałki podobnej wielkości.
> Pieczywo pokrój w kostkę i upiecz lub usmaż na złoto. Ostudź, aby pozostało chrupiące.
> Przygotuj dressing z oliwy, cytryny i przypraw z receptury.
> Połącz warzywa z ziołami i dressingiem tuż przed podaniem. Grzanki dodaj na sam koniec.
> Spróbuj i dopraw; podawaj, zanim pieczywo zmięknie.

# Sałatka z buraków i koziego sera
@ cat=salatki origin=FR trad servings=1 prep=8 cook=12 art=food tags=tradycyjne,sałatka,świeże,kuchnia-francuska
: Pieczone buraki, kozi ser, orzechy.
100 g | buraki
40 g | kozi ser
10 g | orzechy włoskie
20 g | rukola
12 ml | oliwa z oliwek
> Buraki upiecz w skórce lub ugotuj do miękkości, a następnie ostudź i obierz. Pokrój w cząstki.
> Przygotuj dressing z oliwy i składników kwaśnych z receptury. Spróbuj i zrównoważ słodycz buraków kwasowością.
> Ułóż buraki na talerzu, dodaj kozi ser i pozostałe składniki.
> Polej dressingiem tuż przed podaniem. Orzechy lub delikatne liście dodaj na końcu, aby zachowały teksturę.
> Podawaj od razu.

# Poke bowl z łososiem
@ cat=salatki origin=US trad servings=1 prep=8 cook=12 art=food tags=tradycyjne,sałatka,świeże,kuchnia-amerykańska
: Miska z ryżem, surowym łososiem, edamame i mango.
80 g | łosoś sashimi
70 g | ryż sushi
30 g | edamame
40 g | mango
10 ml | sos sojowy
> Ryż dokładnie wypłucz i ugotuj zgodnie z instrukcją. Ostudź do temperatury pokojowej.
> Łososia przygotuj zgodnie z przeznaczeniem dania i wymaganiami bezpieczeństwa. Do podania na surowo używaj wyłącznie ryby przeznaczonej do takiego spożycia; w innym przypadku usmaż ją lub upiecz.
> Pokrój warzywa i dodatki na równe kawałki. Przygotuj sos z produktów wymienionych w recepturze.
> Do miski włóż ryż, ułóż na nim łososia i dodatki osobnymi grupami, a następnie polej sosem.
> Podawaj od razu, aby ryż nie nasiąkł nadmiernie dressingiem.

# Buddha bowl
@ cat=salatki servings=1 prep=8 cook=12 art=food tags=tradycyjne,sałatka,świeże,kuchnia-śródziemnomorska
: Komosa, pieczone warzywa, hummus, tahini.
50 g | komosa ryżowa
40 g | ciecierzyca
60 g | batat
30 g | hummus
30 g | jarmuż
> Umyj i dokładnie osusz warzywa oraz zioła. Pokrój składniki na równe, wygodne do jedzenia kawałki.
> Przygotuj dressing, łącząc składniki płynne i przyprawy. Wymieszaj lub wstrząśnij do uzyskania emulsji.
> Jeśli receptura zawiera białko, ser lub pieczywo, przygotuj je osobno i ostudź przed połączeniem z delikatnymi liśćmi.
> Połącz składniki tuż przed podaniem, aby sałatka zachowała świeżość i chrupkość.
> Spróbuj, skoryguj sól i kwasowość, a następnie podawaj.

# Sałatka z komosą i granatem
@ cat=salatki servings=1 prep=8 cook=12 art=food tags=tradycyjne,sałatka,świeże,kuchnia-śródziemnomorska
: Komosa, granat, mięta, pistacje.
50 g | komosa ryżowa
40 g | granat
5 g | mięta
10 g | pistacje
0,3 szt. | cytryna
12 ml | oliwa z oliwek
> Umyj i dokładnie osusz warzywa oraz zioła. Pokrój składniki na równe, wygodne do jedzenia kawałki.
> Przygotuj dressing, łącząc składniki płynne i przyprawy. Wymieszaj lub wstrząśnij do uzyskania emulsji.
> Jeśli receptura zawiera białko, ser lub pieczywo, przygotuj je osobno i ostudź przed połączeniem z delikatnymi liśćmi.
> Połącz składniki tuż przed podaniem, aby sałatka zachowała świeżość i chrupkość.
> Spróbuj, skoryguj sól i kwasowość, a następnie podawaj.

# Fondant czekoladowy
@ cat=desery origin=FR trad servings=1 prep=18 cook=28 art=dessert tags=tradycyjne,deser,kuchnia-francuska
: Czekoladowe ciasto z płynnym środkiem.
50 g | czekolada gorzka
10 g | masło
1 szt. | jajko
20 g | cukier
12 g | mąka pszenna
> Rozpuść czekoladę z masłem nad parą lub w krótkich seriach w mikrofalówce. Odstaw, aby lekko przestygła.
> Jajko utrzyj z cukrem, wmieszaj czekoladę z masłem, a następnie przesianą mąkę. Nie mieszaj dłużej, niż to konieczne.
> Napełnij natłuszczone foremki do około ¾ wysokości.
> Piecz w 200°C przez 8–12 minut: brzegi powinny być ścięte, a środek pozostać płynny.
> Odczekaj minutę, wyjmij ostrożnie z foremek i podawaj od razu.

# Panna cotta
@ cat=desery origin=IT trad servings=1 prep=13 cook=20 art=dessert tags=tradycyjne,deser,kuchnia-włoska
: Delikatna panna cotta z coulis malinowym.
100 ml | śmietanka 30%
15 g | cukier
3 g | żelatyna
1 g | wanilia
40 g | maliny
> Żelatynę zalej niewielką ilością zimnej wody i odstaw do napęcznienia.
> Podgrzej śmietankę z cukrem i wanilią, nie doprowadzając do wrzenia. Zdejmij z ognia i rozpuść w niej żelatynę.
> Rozlej do foremek, ostudź i wstaw do lodówki na co najmniej 4 godziny.
> Maliny podgrzej krótko i przetrzyj przez sito, jeśli chcesz uzyskać gładki sos.
> Podawaj panna cottę z coulis malinowym.

# Profiteroles
@ cat=desery origin=FR trad servings=1 prep=22 cook=32 art=dessert tags=tradycyjne,deser,kuchnia-francuska
: Ptysie z bitą śmietaną i czekoladą.
30 g | mąka pszenna
20 g | masło
0,8 szt. | jajko
40 ml | śmietanka 30%
25 g | czekolada
> Przygotuj wszystkie składniki i nagrzej piekarnik do temperatury odpowiedniej dla tego deseru.
> Wymieszaj składniki suche osobno, a mokre połącz w drugim naczyniu, jeśli receptura zawiera obie grupy.
> Połącz składniki delikatnie, tylko do uzyskania jednolitej masy. Przełóż do formy lub przygotuj porcje.
> Piecz, gotuj albo schładzaj zgodnie z metodą właściwą dla danego deseru; kontroluj konsystencję, nie tylko czas.
> Ostudź lub schłodź przed dekorowaniem. Podawaj w temperaturze odpowiedniej dla deseru.

# Brownie
@ cat=desery origin=US trad servings=1 prep=33 cook=49 art=dessert tags=tradycyjne,deser,kuchnia-amerykańska
: Wilgotne ciasto czekoladowe z orzechami.
50 g | czekolada
30 g | masło
35 g | cukier
0,8 szt. | jajko
20 g | mąka pszenna
15 g | orzechy włoskie
> Rozpuść czekoladę z masłem i odstaw do lekkiego przestudzenia.
> Wymieszaj jajko z cukrem, dodaj czekoladę, mąkę i posiekane orzechy. Nie ubijaj masy na puszysto.
> Przełóż masę do niewielkiej formy wyłożonej papierem do pieczenia.
> Piecz w 170°C przez około 18–25 minut. Środek powinien pozostać wilgotny.
> Ostudź przed porcjowaniem, aby brownie nie kruszyło się.

# Amerykańska szarlotka
@ cat=desery origin=US trad servings=1 prep=22 cook=33 art=dessert tags=tradycyjne,deser,kuchnia-amerykańska
: Amerykańska szarlotka z cynamonem.
60 g | mąka pszenna
35 g | masło
150 g | jabłko
2 g | cynamon
25 g | cukier
> Przygotuj spód z podanych składników. Jeśli używasz kruchego ciasta, schłodź je przed wałkowaniem.
> Przygotuj nadzienie: owoce pokrój i dopraw, a masę serową wymieszaj tylko do połączenia składników.
> Wyłóż formę, dodaj nadzienie i wyrównaj powierzchnię. Nie przepełniaj formy.
> Piecz w temperaturze odpowiedniej dla rodzaju wypieku, aż środek się zetnie, a wierzch będzie złoty. Przy serniku środek może lekko drżeć.
> Ostudź przed krojeniem; wypieki z kremowym nadzieniem schłodź w lodówce.

# Bułeczki cynamonowe
@ cat=desery origin=US trad servings=1 prep=24 cook=36 art=dessert tags=tradycyjne,deser,kuchnia-amerykańska
: Drożdżowe bułeczki cynamonowe z lukrem.
80 g | mąka pszenna
45 ml | mleko
20 g | masło
4 g | cynamon
20 g | cukier
> Przygotuj wszystkie składniki i nagrzej piekarnik do temperatury odpowiedniej dla tego deseru.
> Wymieszaj składniki suche osobno, a mokre połącz w drugim naczyniu, jeśli receptura zawiera obie grupy.
> Połącz składniki delikatnie, tylko do uzyskania jednolitej masy. Przełóż do formy lub przygotuj porcje.
> Piecz, gotuj albo schładzaj zgodnie z metodą właściwą dla danego deseru; kontroluj konsystencję, nie tylko czas.
> Ostudź lub schłodź przed dekorowaniem. Podawaj w temperaturze odpowiedniej dla deseru.

# Mochi z matchą
@ cat=desery origin=JP trad servings=1 prep=19 cook=29 art=dessert tags=tradycyjne,deser,kuchnia-japońska
: Japońskie mochi z pastą herbaty matcha.
50 g | mąka ryżowa kleista
20 g | cukier
60 ml | woda
3 g | matcha
25 g | pasta czerwonej fasoli
> Wymieszaj kleistą mąkę ryżową, cukier, matchę i wodę do uzyskania jednolitej masy bez grudek.
> Podgrzewaj masę w krótkich seriach, za każdym razem dokładnie mieszając, albo ugotuj ją na parze, aż stanie się lepka i lekko przezroczysta.
> Oprósz blat skrobią, jeśli jest w składnikach, i podziel jeszcze ciepłą masę na porcje.
> Spłaszcz porcje, nałóż pastę z czerwonej fasoli i dokładnie zlep brzegi.
> Podawaj w dniu przygotowania — po dłuższym chłodzeniu mochi twardnieją.

# Dorayaki
@ cat=desery origin=JP trad servings=1 prep=20 cook=30 art=dessert tags=tradycyjne,deser,kuchnia-japońska
: Japońskie placki z pastą anko.
40 g | mąka pszenna
0,6 szt. | jajko
18 g | cukier
30 g | pasta anko
> Wymieszaj jajko z cukrem, dodaj mąkę i pozostałe składniki ciasta. Odstaw na kilka minut.
> Rozgrzej nieprzywierającą patelnię na średnio małym ogniu i nakładaj małe porcje ciasta.
> Smaż, aż na powierzchni pojawią się pęcherzyki, a spód się zarumieni. Odwróć i krótko dosmaż drugą stronę.
> Ostudź placuszki do temperatury pokojowej.
> Nałóż pastę anko pomiędzy dwa placuszki, lekko dociśnij brzegi i podawaj.

# Churros
@ cat=desery origin=MX trad servings=1 prep=26 cook=39 art=dessert tags=tradycyjne,deser,kuchnia-meksykańska
: Smażone ciastka z cynamonem i czekoladą.
50 g | mąka pszenna
60 ml | woda
15 g | masło
2 g | cynamon
25 g | czekolada
> Zagotuj wodę z masłem i składnikami przewidzianymi na ciasto. Wsyp mąkę i energicznie mieszaj, aż powstanie gładka masa.
> Lekko przestudź ciasto i przełóż do rękawa cukierniczego z gwiazdkową końcówką.
> Rozgrzej olej do 170–175°C. Wyciskaj krótkie paski ciasta i smaż partiami na złoto, nie przepełniając garnka.
> Odsącz churros na papierze i obtocz w cukrze z cynamonem, jeśli są w składnikach.
> Podawaj z rozpuszczoną czekoladą do maczania.

# Tres leches
@ cat=desery origin=MX trad servings=1 prep=20 cook=29 art=dessert tags=tradycyjne,deser,kuchnia-meksykańska
: Biszkopt nasączony trzema rodzajami mleka.
40 g | mąka pszenna
1 szt. | jajko
40 ml | mleko skondensowane
40 ml | mleko odtłuszczone
30 ml | śmietanka 30%
> Przygotuj wszystkie składniki i nagrzej piekarnik do temperatury odpowiedniej dla tego deseru.
> Wymieszaj składniki suche osobno, a mokre połącz w drugim naczyniu, jeśli receptura zawiera obie grupy.
> Połącz składniki delikatnie, tylko do uzyskania jednolitej masy. Przełóż do formy lub przygotuj porcje.
> Piecz, gotuj albo schładzaj zgodnie z metodą właściwą dla danego deseru; kontroluj konsystencję, nie tylko czas.
> Ostudź lub schłodź przed dekorowaniem. Podawaj w temperaturze odpowiedniej dla deseru.

# Baklava
@ cat=desery servings=1 prep=14 cook=20 art=dessert tags=tradycyjne,deser,kuchnia-śródziemnomorska
: Warstwowe ciasto filo z orzechami i syropem.
60 g | ciasto filo
30 g | orzechy włoskie
25 g | masło
25 g | miód
1 g | cynamon
> Przygotuj wszystkie składniki i nagrzej piekarnik do temperatury odpowiedniej dla tego deseru.
> Wymieszaj składniki suche osobno, a mokre połącz w drugim naczyniu, jeśli receptura zawiera obie grupy.
> Połącz składniki delikatnie, tylko do uzyskania jednolitej masy. Przełóż do formy lub przygotuj porcje.
> Piecz, gotuj albo schładzaj zgodnie z metodą właściwą dla danego deseru; kontroluj konsystencję, nie tylko czas.
> Ostudź lub schłodź przed dekorowaniem. Podawaj w temperaturze odpowiedniej dla deseru.

# Basbousa
@ cat=desery servings=1 prep=16 cook=23 art=dessert tags=tradycyjne,deser,kuchnia-śródziemnomorska
: Kasza manna z syropem różanym.
50 g | kasza manna
40 g | jogurt
25 g | cukier
5 ml | woda różana
10 g | migdały
> Przygotuj wszystkie składniki i nagrzej piekarnik do temperatury odpowiedniej dla tego deseru.
> Wymieszaj składniki suche osobno, a mokre połącz w drugim naczyniu, jeśli receptura zawiera obie grupy.
> Połącz składniki delikatnie, tylko do uzyskania jednolitej masy. Przełóż do formy lub przygotuj porcje.
> Piecz, gotuj albo schładzaj zgodnie z metodą właściwą dla danego deseru; kontroluj konsystencję, nie tylko czas.
> Ostudź lub schłodź przed dekorowaniem. Podawaj w temperaturze odpowiedniej dla deseru.

# Gulab jamun
@ cat=desery origin=IN trad servings=1 prep=20 cook=29 art=dessert tags=tradycyjne,deser,kuchnia-indyjska
: Smażone kuleczki serowe w syropie różanym.
40 g | mleko w proszku
10 g | mąka pszenna
40 g | cukier
4 ml | woda różana
1 g | kardamon
> Przygotuj ciasto lub masę, łącząc składniki tylko do uzyskania jednolitej konsystencji.
> Uformuj równe porcje. Przygotuj dodatki i cukier do obtoczenia przed rozpoczęciem smażenia.
> Rozgrzej olej do temperatury właściwej dla deseru (zwykle 170–175°C). Smaż małymi partiami, aby temperatura oleju nie spadła.
> Odsącz na papierze. Jeśli deser podaje się w syropie, przełóż go do ciepłego syropu, nie wrzącego.
> Podawaj z dodatkami przewidzianymi w recepturze.

# Kulfi pistacjowe
@ cat=desery origin=IN trad servings=1 prep=18 cook=26 art=dessert tags=tradycyjne,deser,kuchnia-indyjska
: Indyjskie lody pistacjowe.
150 ml | mleko pełne
20 g | pistacje
25 g | cukier
1 g | kardamon
> Podgrzej mleko lub śmietankę z cukrem i dodatkami aromatycznymi, mieszając do rozpuszczenia cukru.
> Jeśli receptura zawiera orzechy, czekoladę lub pastę smakową, wmieszaj je w tym momencie.
> Ostudź masę szybko, a następnie schłodź w lodówce, aż będzie zimna.
> Przelej do maszyny do lodów albo pojemnika. W przypadku mrożenia bez maszyny mieszaj masę co 30–45 minut, aby ograniczyć kryształki lodu.
> Zamrażaj do uzyskania odpowiedniej konsystencji i wyjmij kilka minut przed podaniem.

# Matcha tiramisu
@ cat=desery origin=JP trad servings=1 prep=28 cook=42 art=dessert tags=tradycyjne,deser,kuchnia-japońska
: Tiramisu z herbatą matcha zamiast kawy.
70 g | mascarpone
4 g | matcha
35 g | biszkopty
18 g | cukier
0,5 szt. | jajko
> Przygotuj wszystkie składniki i nagrzej piekarnik do temperatury odpowiedniej dla tego deseru.
> Wymieszaj składniki suche osobno, a mokre połącz w drugim naczyniu, jeśli receptura zawiera obie grupy.
> Połącz składniki delikatnie, tylko do uzyskania jednolitej masy. Przełóż do formy lub przygotuj porcje.
> Piecz, gotuj albo schładzaj zgodnie z metodą właściwą dla danego deseru; kontroluj konsystencję, nie tylko czas.
> Ostudź lub schłodź przed dekorowaniem. Podawaj w temperaturze odpowiedniej dla deseru.

# Pavlova
@ cat=desery servings=1 prep=14 cook=22 art=dessert tags=tradycyjne,deser
: Beza z bitą śmietaną i owocami.
2 szt. | białko
50 g | cukier
50 ml | śmietanka 30%
60 g | owoce sezonowe
> Białka ubij do miękkiej piany. Stopniowo dodawaj cukier i ubijaj, aż piana będzie gęsta, błyszcząca i bez wyczuwalnych kryształków.
> Uformuj na papierze do pieczenia blat z lekko podniesionymi brzegami.
> Susz w 110–120°C przez około 75–90 minut, następnie wyłącz piekarnik i pozostaw bezę do stopniowego ostygnięcia.
> Ubij śmietankę dopiero przed podaniem.
> Nałóż śmietankę i owoce tuż przed serwowaniem, aby beza pozostała chrupiąca.

# Shakshuka
@ cat=inne servings=1 prep=4 cook=6 art=food tags=tradycyjne,śniadanie,kuchnia-śródziemnomorska
: Jajka usmażone w pikantnym sosie pomidorowym.
1 szt. | jajko
120 g | pomidor
40 g | papryka
0,5 szt. | cebula
1 g | kumin
3 g | kolendra
> Przygotuj wszystkie składniki i odmierz płyny. Jeśli używasz kaszy, ryżu lub komosy, opłucz je przed gotowaniem.
> Ugotuj bazę w proporcji płynu do produktu odpowiedniej dla składnika, aż będzie miękka, ale nie rozgotowana.
> Przygotuj dodatki osobno: owoce pokrój, orzechy podpraż krótko, a składniki wymagające smażenia zrumień na patelni.
> Połącz składniki, dopraw i dostosuj konsystencję płynem z receptury.
> Podawaj od razu albo schłodź, jeśli danie serwuje się na zimno.

# Jajka po benedyktyńsku
@ cat=inne origin=US trad servings=1 prep=4 cook=6 art=food tags=tradycyjne,śniadanie,kuchnia-amerykańska
: Jajko w koszulce na pieczywie, podane z sosem holenderskim.
1 szt. | muffin angielski
1 szt. | jajko
30 g | szynka
0,5 szt. | żółtko
10 g | masło
0,3 szt. | cytryna
> Przygotuj składniki. Jajka roztrzep z solą i pieprzem; dodatki pokrój na małe kawałki.
> Rozgrzej patelnię na małym lub średnim ogniu i dodaj masło albo olej z receptury.
> Dodaj dodatki, które wymagają podsmażenia, i przygotuj je do miękkości. Wlej jajka lub masę jajeczną.
> Smaż łagodnie, mieszając albo składając masę zależnie od dania. Zdejmij z ognia, gdy jajka są ścięte, ale nadal wilgotne.
> Podawaj od razu, z pieczywem lub dodatkami przewidzianymi w recepturze.

# Gofry brukselskie
@ cat=inne servings=1 prep=6 cook=10 art=food tags=tradycyjne,śniadanie
: Chrupiące gofry z owocami i bitą śmietaną.
60 g | mąka pszenna
70 ml | mleko
0,7 szt. | jajko
15 g | masło
40 g | owoce
> Wymieszaj składniki suche. W osobnej misce połącz jajko, mleko i pozostałe składniki płynne, a następnie połącz obie mieszanki bez nadmiernego mieszania.
> Rozgrzej patelnię lub gofrownicę i lekko natłuść, jeśli wymaga tego urządzenie.
> Nakładaj porcje ciasta i smaż lub piecz do uzyskania złotej powierzchni. Nie dociskaj placków podczas smażenia.
> Obróć placki, gdy brzegi się zetną i pojawią się pęcherzyki, albo piecz gofry do uzyskania chrupkości.
> Podawaj od razu z dodatkami z listy.

# Owsianka z owocami
@ cat=inne servings=1 prep=10 cook=15 art=food tags=tradycyjne,śniadanie
: Owsianka na mleku z owocami sezonowymi.
50 g | płatki owsiane
150 ml | mleko
0,4 szt. | banan
8 g | miód
8 g | orzechy
> Przygotuj wszystkie składniki i odmierz płyny. Jeśli używasz kaszy, ryżu lub komosy, opłucz je przed gotowaniem.
> Ugotuj bazę w proporcji płynu do produktu odpowiedniej dla składnika, aż będzie miękka, ale nie rozgotowana.
> Przygotuj dodatki osobno: owoce pokrój, orzechy podpraż krótko, a składniki wymagające smażenia zrumień na patelni.
> Połącz składniki, dopraw i dostosuj konsystencję płynem z receptury.
> Podawaj od razu albo schłodź, jeśli danie serwuje się na zimno.

# Granola bowl
@ cat=inne origin=US trad servings=1 prep=8 cook=12 art=food tags=tradycyjne,śniadanie,kuchnia-amerykańska
: Jogurt, granola, owoce i nasiona.
120 g | jogurt naturalny
35 g | granola
50 g | owoce jagodowe
5 g | nasiona chia
> Przygotuj wszystkie składniki i odmierz płyny. Jeśli używasz kaszy, ryżu lub komosy, opłucz je przed gotowaniem.
> Ugotuj bazę w proporcji płynu do produktu odpowiedniej dla składnika, aż będzie miękka, ale nie rozgotowana.
> Przygotuj dodatki osobno: owoce pokrój, orzechy podpraż krótko, a składniki wymagające smażenia zrumień na patelni.
> Połącz składniki, dopraw i dostosuj konsystencję płynem z receptury.
> Podawaj od razu albo schłodź, jeśli danie serwuje się na zimno.

# Tost z awokado
@ cat=inne origin=US trad servings=1 prep=7 cook=10 art=food tags=tradycyjne,śniadanie,kuchnia-amerykańska
: Tost z awokado, jajkiem i chili.
50 g | chleb żytni
70 g | awokado
1 szt. | jajko
1 g | chilli płatki
0,3 szt. | cytryna
> Przygotuj składniki i pokrój warzywa oraz pieczywo. Jeśli mięso wymaga obróbki, usmaż je lub podgrzej osobno.
> Podpiecz pieczywo, jeśli pasuje do dania, tak aby było chrupiące z zewnątrz, ale nie wyschło.
> Rozprowadź sos lub smarowidło na pieczywie, a następnie ułóż składniki w kolejności, która utrzyma kanapkę stabilnie.
> Dodaj delikatne liście i świeże składniki na końcu, aby nie zwiędły od gorących elementów.
> Przekrój i podawaj od razu.

# Tamagoyaki
@ cat=inne origin=JP trad servings=1 prep=8 cook=13 art=food tags=tradycyjne,śniadanie,kuchnia-japońska
: Japoński omlet na słodko, zwijany.
2 szt. | jajko
5 ml | sos sojowy
8 ml | mirin
4 g | cukier
> Przygotuj składniki. Jajka roztrzep z solą i pieprzem; dodatki pokrój na małe kawałki.
> Rozgrzej patelnię na małym lub średnim ogniu i dodaj masło albo olej z receptury.
> Dodaj dodatki, które wymagają podsmażenia, i przygotuj je do miękkości. Wlej jajka lub masę jajeczną.
> Smaż łagodnie, mieszając albo składając masę zależnie od dania. Zdejmij z ognia, gdy jajka są ścięte, ale nadal wilgotne.
> Podawaj od razu, z pieczywem lub dodatkami przewidzianymi w recepturze.

# Onigiri z łososiem
@ cat=inne origin=JP trad servings=1 prep=6 cook=10 art=food tags=tradycyjne,śniadanie,kuchnia-japońska
: Kulki ryżowe z nadzieniem z łososia.
90 g | ryż sushi
30 g | łosoś
1 szt. | nori
1 g | sól
> Ugotuj ryż krótkoziarnisty zgodnie z instrukcją, aż będzie kleisty. Ostudź tylko na tyle, by dało się go formować.
> Przygotuj nadzienie z łososia i pozostałych składników z listy.
> Zwilż dłonie wodą, oprósz solą i uformuj porcję ryżu wokół nadzienia w trójkąt lub owal.
> Jeśli receptura zawiera nori, owiń nim onigiri tuż przed podaniem, aby nie straciło chrupkości.
> Podawaj w temperaturze pokojowej.

# Huevos rancheros
@ cat=inne origin=MX trad servings=1 prep=7 cook=10 art=food tags=tradycyjne,śniadanie,kuchnia-meksykańska
: Jajka sadzone na tortillas z salsą.
2 szt. | jajko
2 szt. | tortilla kukurydziana
40 g | salsa
30 g | fasola
30 g | awokado
> Przygotuj wszystkie składniki i odmierz płyny. Jeśli używasz kaszy, ryżu lub komosy, opłucz je przed gotowaniem.
> Ugotuj bazę w proporcji płynu do produktu odpowiedniej dla składnika, aż będzie miękka, ale nie rozgotowana.
> Przygotuj dodatki osobno: owoce pokrój, orzechy podpraż krótko, a składniki wymagające smażenia zrumień na patelni.
> Połącz składniki, dopraw i dostosuj konsystencję płynem z receptury.
> Podawaj od razu albo schłodź, jeśli danie serwuje się na zimno.

# Croissant z masłem
@ cat=inne origin=FR trad servings=1 prep=9 cook=13 art=food tags=tradycyjne,śniadanie,kuchnia-francuska
: Wypiekany croissant z dobrym masłem.
1 szt. | croissant
10 g | masło
15 g | dżem morelowy
> Przygotuj składniki i pokrój warzywa oraz pieczywo. Jeśli mięso wymaga obróbki, usmaż je lub podgrzej osobno.
> Podpiecz pieczywo, jeśli pasuje do dania, tak aby było chrupiące z zewnątrz, ale nie wyschło.
> Rozprowadź sos lub smarowidło na pieczywie, a następnie ułóż składniki w kolejności, która utrzyma kanapkę stabilnie.
> Dodaj delikatne liście i świeże składniki na końcu, aby nie zwiędły od gorących elementów.
> Przekrój i podawaj od razu.

# Jajecznica po francusku
@ cat=inne origin=FR trad servings=1 prep=9 cook=13 art=food tags=tradycyjne,śniadanie,kuchnia-francuska
: Kremowa jajecznica na wolnym ogniu.
2 szt. | jajko
10 g | masło
15 ml | śmietanka 30%
3 g | szczypiorek
> Przygotuj składniki. Jajka roztrzep z solą i pieprzem; dodatki pokrój na małe kawałki.
> Rozgrzej patelnię na małym lub średnim ogniu i dodaj masło albo olej z receptury.
> Dodaj dodatki, które wymagają podsmażenia, i przygotuj je do miękkości. Wlej jajka lub masę jajeczną.
> Smaż łagodnie, mieszając albo składając masę zależnie od dania. Zdejmij z ognia, gdy jajka są ścięte, ale nadal wilgotne.
> Podawaj od razu, z pieczywem lub dodatkami przewidzianymi w recepturze.

# Baguette
@ cat=pieczywo origin=FR trad servings=1 prep=72 cook=108 art=bread tags=tradycyjne,pieczywo,pieczone,kuchnia-francuska
: Francuska bagietka o chrupiącej skórce.
120 g | mąka pszenna
78 ml | woda
1 g | drożdże
2,4 g | sól
> Połącz mąkę, wodę, drożdże lub zakwas i sól. Wyrabiaj do uzyskania elastycznego ciasta, a następnie prowadź fermentację zgodnie z recepturą.
> Podziel ciasto na porcje i wstępnie zaokrąglij. Odstaw na 15–20 minut, aby gluten się rozluźnił.
> Uformuj podłużne bagietki, dokładnie zamykając łączenie. Przenieś na płótno lub perforowaną blachę do wyrastania.
> Po wyrośnięciu natnij żyletką pod kątem i piecz w mocno nagrzanym piekarniku z parą na początku wypieku.
> Studź na kratce, zanim pokroisz — skórka i miękisz ustabilizują się podczas stygnięcia.

# Ciabatta
@ cat=pieczywo origin=IT trad servings=1 prep=72 cook=108 art=bread tags=tradycyjne,pieczywo,pieczone,kuchnia-włoska
: Włoska ciabatta o dużej dziurawości.
120 g | mąka pszenna
90 ml | woda
1 g | drożdże
8 ml | oliwa z oliwek
2,4 g | sól
> Połącz składniki do uzyskania bardzo wilgotnego ciasta. Nie dosypuj mąki bez potrzeby — ciabatta powinna mieć luźną strukturę.
> Podczas fermentacji wykonaj kilka serii delikatnego składania, aby wzmocnić gluten i zatrzymać pęcherze gazu.
> Przełóż ciasto na mocno oprószony mąką blat, podziel skrobką i formuj prostokątne bochenki bez mocnego odgazowywania.
> Pozostaw do krótkiego wyrośnięcia i piecz w 230°C z parą na początku, aż skórka będzie złota.
> Studź na kratce; nie krój gorącego pieczywa.

# Precel bawarski
@ cat=pieczywo servings=1 prep=72 cook=108 art=bread tags=tradycyjne,pieczywo,pieczone
: Miękki precel z charakterystyczną, ciemnobrązową skórką.
110 g | mąka pszenna
65 ml | woda
3 g | drożdże
5 g | soda
3 g | sól gruba
> Przygotuj elastyczne ciasto drożdżowe i pozostaw do krótkiego wyrośnięcia, zgodnie z recepturą.
> Podziel ciasto na porcje, rozwałkuj na wałki grubsze na środku i cieńsze na końcach, a następnie uformuj precle.
> Schłodź uformowane precle, aby lepiej zachowały kształt. Zanurz je w odpowiednim roztworze do precli tylko zgodnie z instrukcją i zasadami bezpieczeństwa produktu.
> Posyp solą gruboziarnistą i piecz w 220°C, aż będą głęboko brązowe.
> Studź na kratce i podawaj świeże.

# Pita
@ cat=pieczywo servings=1 prep=72 cook=108 art=bread tags=tradycyjne,pieczywo,pieczone,kuchnia-śródziemnomorska
: Chleb pita z kieszonką.
100 g | mąka pszenna
65 ml | woda
2 g | drożdże
8 ml | oliwa z oliwek
2 g | sól
> Zagnieć mąkę, wodę, drożdże, sól i tłuszcz przewidziane w recepturze. Pozostaw do wyrośnięcia.
> Podziel na równe porcje, zaokrąglij i odstaw na 10 minut.
> Rozwałkuj na krążki o równej grubości. Przenieś na mocno nagrzaną blachę lub kamień.
> Piecz w 240–250°C przez kilka minut, aż placki napęcznieją i utworzą kieszeń.
> Przykryj czystą ściereczką po wypieku, aby skórka pozostała miękka.

# Naan
@ cat=pieczywo origin=IN trad servings=1 prep=72 cook=108 art=bread tags=tradycyjne,pieczywo,pieczone,kuchnia-indyjska
: Indyjski naan pieczony w piecu.
100 g | mąka pszenna
30 g | jogurt
2 g | drożdże
8 g | ghee
2 g | sól
> Połącz mąkę z jogurtem, wodą, środkiem spulchniającym lub drożdżami oraz solą z receptury. Wyrób miękkie ciasto.
> Pozostaw do odpoczynku lub wyrośnięcia zgodnie z użytym spulchniaczem.
> Podziel ciasto na porcje i rozwałkuj na owalne placki.
> Piecz na bardzo gorącej suchej patelni lub na rozgrzanej powierzchni, aż pojawią się pęcherze i przypieczone plamki. Obróć i dopiecz drugą stronę.
> Posmaruj masłem lub ghee, jeśli są w składnikach, i podawaj na gorąco.

# Brioche
@ cat=pieczywo origin=FR trad servings=1 prep=72 cook=108 art=bread tags=tradycyjne,pieczywo,pieczone,kuchnia-francuska
: Maślana brioche, puszysta i złota.
100 g | mąka pszenna
0,7 szt. | jajko
30 g | masło
30 ml | mleko
10 g | cukier
3 g | drożdże
> Połącz mąkę, drożdże, jajka i cukier. Wyrabiaj, aż ciasto zacznie być elastyczne, następnie stopniowo dodawaj miękkie masło.
> Kontynuuj wyrabianie, aż ciasto będzie gładkie i zacznie odchodzić od ścianek misy.
> Przykryj i pozostaw do wyrośnięcia, a następnie schłodź, aby łatwiej je formować.
> Uformuj bułki lub bochenek, przełóż do formy i pozostaw do ponownego wyrośnięcia. Posmaruj jajkiem, jeśli znajduje się w składnikach.
> Piecz w 175–185°C do głębokiego zrumienienia i dopieczenia środka.

# Bajgiel
@ cat=pieczywo origin=US trad servings=1 prep=72 cook=108 art=bread tags=tradycyjne,pieczywo,pieczone,kuchnia-amerykańska
: Okrągłe pieczywo z dziurką, gotowane przed pieczeniem.
110 g | mąka pszenna
65 ml | woda
2 g | drożdże
4 g | słód
4 g | sezam
2 g | sól
> Zagnieć zwarte ciasto drożdżowe i pozostaw do wyrośnięcia, aż wyraźnie zwiększy objętość.
> Podziel na porcje, uformuj wałki lub kulki z otworem i dokładnie sklej łączenie. Odstaw do krótkiego wyrastania.
> Gotuj bajgle krótko w wodzie, po około 30–60 sekund z każdej strony. Odcedź i posyp dodatkami, jeśli przewidziano je w recepturze.
> Piecz w 210–220°C, aż będą złote i sprężyste.
> Studź na kratce przed przekrojeniem.

# Challah
@ cat=pieczywo servings=1 prep=72 cook=108 art=bread tags=tradycyjne,pieczywo,pieczone
: Zaplatana chałka z jajkiem.
110 g | mąka pszenna
0,5 szt. | jajko
55 ml | woda
10 g | cukier
3 g | drożdże
10 ml | olej
> Połącz składniki i wyrób ciasto do uzyskania odpowiedniej elastyczności. Tłuszcz dodawaj stopniowo, jeśli przewidziano go w recepturze.
> Przykryj ciasto i pozostaw do fermentacji lub odpoczynku, aż wyraźnie zwiększy objętość.
> Podziel i uformuj pieczywo. Jeśli ciasto stawia opór, odstaw na kilka minut przed dalszym formowaniem.
> Pozostaw do końcowego wyrośnięcia, a następnie piecz w temperaturze odpowiedniej dla danego rodzaju pieczywa, aż skórka będzie dobrze zrumieniona.
> Studź na kratce przed krojeniem.

# Sos pomidorowy napolitano
@ cat=sosy origin=IT trad servings=1 prep=8 cook=12 art=food tags=tradycyjne,sos,kuchnia-włoska
: Sos pomidorowy napolitano — sos do dań głównych, makaronu lub warzyw, o konsystencji dopasowanej do sposobu podania.
150 g | pomidor pelati
1 szt. | czosnek
4 g | bazylia
12 ml | oliwa z oliwek
3 g | sól
> Przygotuj składniki: posiekaj aromaty, odmierz płyny i zetrzyj sery lub przyprawy, jeśli są w recepturze.
> Podgrzej bazę na małym lub średnim ogniu, mieszając, aby składniki równomiernie się połączyły.
> Jeśli sos wymaga redukcji, gotuj łagodnie do uzyskania właściwej konsystencji. Jeśli ma pozostać świeży, nie podgrzewaj go.
> Dopraw stopniowo i próbuj po każdym dodatku. W razie potrzeby przecedź lub zblenduj.
> Podawaj od razu albo ostudź szybko i przechowuj w lodówce.

# Pesto alla genovese
@ cat=sosy origin=IT trad servings=1 prep=8 cook=12 art=food tags=tradycyjne,sos,kuchnia-włoska
: Pesto alla genovese — sos do dań głównych, makaronu lub warzyw, o konsystencji dopasowanej do sposobu podania.
30 g | bazylia
10 g | piniole
20 g | parmezan
1 szt. | czosnek
12 ml | oliwa z oliwek
> Przygotuj składniki: posiekaj aromaty, odmierz płyny i zetrzyj sery lub przyprawy, jeśli są w recepturze.
> Podgrzej bazę na małym lub średnim ogniu, mieszając, aby składniki równomiernie się połączyły.
> Jeśli sos wymaga redukcji, gotuj łagodnie do uzyskania właściwej konsystencji. Jeśli ma pozostać świeży, nie podgrzewaj go.
> Dopraw stopniowo i próbuj po każdym dodatku. W razie potrzeby przecedź lub zblenduj.
> Podawaj od razu albo ostudź szybko i przechowuj w lodówce.

# Sos carbonara
@ cat=sosy origin=IT trad servings=1 prep=8 cook=12 art=food tags=tradycyjne,sos,kuchnia-włoska
: Sos carbonara — sos do dań głównych, makaronu lub warzyw, o konsystencji dopasowanej do sposobu podania.
1 szt. | żółtko
40 g | guanciale
25 g | pecorino
1 g | pieprz czarny
> Przygotuj składniki: posiekaj aromaty, odmierz płyny i zetrzyj sery lub przyprawy, jeśli są w recepturze.
> Podgrzej bazę na małym lub średnim ogniu, mieszając, aby składniki równomiernie się połączyły.
> Jeśli sos wymaga redukcji, gotuj łagodnie do uzyskania właściwej konsystencji. Jeśli ma pozostać świeży, nie podgrzewaj go.
> Dopraw stopniowo i próbuj po każdym dodatku. W razie potrzeby przecedź lub zblenduj.
> Podawaj od razu albo ostudź szybko i przechowuj w lodówce.

# Beszamel
@ cat=sosy origin=FR trad servings=1 prep=8 cook=12 art=food tags=tradycyjne,sos,kuchnia-francuska
: Beszamel — sos do dań głównych, makaronu lub warzyw, o konsystencji dopasowanej do sposobu podania.
150 ml | mleko
15 g | masło
15 g | mąka pszenna
0,3 g | gałka muszkatołowa
3 g | sól
> Przygotuj składniki: posiekaj aromaty, odmierz płyny i zetrzyj sery lub przyprawy, jeśli są w recepturze.
> Podgrzej bazę na małym lub średnim ogniu, mieszając, aby składniki równomiernie się połączyły.
> Jeśli sos wymaga redukcji, gotuj łagodnie do uzyskania właściwej konsystencji. Jeśli ma pozostać świeży, nie podgrzewaj go.
> Dopraw stopniowo i próbuj po każdym dodatku. W razie potrzeby przecedź lub zblenduj.
> Podawaj od razu albo ostudź szybko i przechowuj w lodówce.

# Sos pieczarkowy
@ cat=sosy origin=PL trad servings=1 prep=8 cook=12 art=food tags=tradycyjne,sos,kuchnia-polska
: Sos pieczarkowy — sos do dań głównych, makaronu lub warzyw, o konsystencji dopasowanej do sposobu podania.
80 g | pieczarki
0,5 szt. | cebula
30 ml | śmietana 18%
10 g | masło
4 g | natka pietruszki
> Przygotuj składniki: posiekaj aromaty, odmierz płyny i zetrzyj sery lub przyprawy, jeśli są w recepturze.
> Podgrzej bazę na małym lub średnim ogniu, mieszając, aby składniki równomiernie się połączyły.
> Jeśli sos wymaga redukcji, gotuj łagodnie do uzyskania właściwej konsystencji. Jeśli ma pozostać świeży, nie podgrzewaj go.
> Dopraw stopniowo i próbuj po każdym dodatku. W razie potrzeby przecedź lub zblenduj.
> Podawaj od razu albo ostudź szybko i przechowuj w lodówce.

# Salsa roja
@ cat=sosy origin=MX trad servings=1 prep=8 cook=12 art=food tags=tradycyjne,sos,kuchnia-meksykańska
: Salsa roja — sos do dań głównych, makaronu lub warzyw, o konsystencji dopasowanej do sposobu podania.
120 g | pomidor
0,5 szt. | jalapeño
1 szt. | czosnek
5 g | kolendra
0,3 szt. | limonka
> Przygotuj składniki: posiekaj aromaty, odmierz płyny i zetrzyj sery lub przyprawy, jeśli są w recepturze.
> Podgrzej bazę na małym lub średnim ogniu, mieszając, aby składniki równomiernie się połączyły.
> Jeśli sos wymaga redukcji, gotuj łagodnie do uzyskania właściwej konsystencji. Jeśli ma pozostać świeży, nie podgrzewaj go.
> Dopraw stopniowo i próbuj po każdym dodatku. W razie potrzeby przecedź lub zblenduj.
> Podawaj od razu albo ostudź szybko i przechowuj w lodówce.

# Satay orzechowy
@ cat=sosy servings=1 prep=8 cook=12 art=food tags=tradycyjne,sos,kuchnia-azjatycka
: Satay orzechowy — sos do dań głównych, makaronu lub warzyw, o konsystencji dopasowanej do sposobu podania.
40 g | masło orzechowe
40 ml | mleko kokosowe
10 ml | sos sojowy
0,2 szt. | limonka
> Przygotuj składniki: posiekaj aromaty, odmierz płyny i zetrzyj sery lub przyprawy, jeśli są w recepturze.
> Podgrzej bazę na małym lub średnim ogniu, mieszając, aby składniki równomiernie się połączyły.
> Jeśli sos wymaga redukcji, gotuj łagodnie do uzyskania właściwej konsystencji. Jeśli ma pozostać świeży, nie podgrzewaj go.
> Dopraw stopniowo i próbuj po każdym dodatku. W razie potrzeby przecedź lub zblenduj.
> Podawaj od razu albo ostudź szybko i przechowuj w lodówce.

# Sos teriyaki
@ cat=sosy origin=JP trad servings=1 prep=8 cook=12 art=food tags=tradycyjne,sos,kuchnia-japońska
: Sos teriyaki — sos do dań głównych, makaronu lub warzyw, o konsystencji dopasowanej do sposobu podania.
30 ml | sos sojowy
20 ml | mirin
10 g | cukier
3 g | imbir
> Wymieszaj sos sojowy, słodki składnik i pozostałe płyny z listy w małym rondlu.
> Podgrzewaj na średnim ogniu, mieszając, aż cukier się rozpuści.
> Gotuj łagodnie, aż sos lekko zgęstnieje i zacznie błyszczeć. Nie redukuj nadmiernie — po ostudzeniu zgęstnieje jeszcze bardziej.
> Spróbuj i w razie potrzeby zrównoważ smak składnikiem kwaśnym lub wodą, jeśli są przewidziane w recepturze.
> Ostudź lub użyj od razu jako glazury do potraw.

# Chimichurri
@ cat=sosy servings=1 prep=8 cook=12 art=food tags=tradycyjne,sos
: Chimichurri — sos do dań głównych, makaronu lub warzyw, o konsystencji dopasowanej do sposobu podania.
4 g | natka pietruszki
1 szt. | czosnek
2 g | oregano
10 ml | ocet winny
12 ml | oliwa z oliwek
1 g | chilli
> Przygotuj składniki: posiekaj aromaty, odmierz płyny i zetrzyj sery lub przyprawy, jeśli są w recepturze.
> Podgrzej bazę na małym lub średnim ogniu, mieszając, aby składniki równomiernie się połączyły.
> Jeśli sos wymaga redukcji, gotuj łagodnie do uzyskania właściwej konsystencji. Jeśli ma pozostać świeży, nie podgrzewaj go.
> Dopraw stopniowo i próbuj po każdym dodatku. W razie potrzeby przecedź lub zblenduj.
> Podawaj od razu albo ostudź szybko i przechowuj w lodówce.

# Aioli
@ cat=sosy servings=1 prep=8 cook=12 art=food tags=tradycyjne,sos,kuchnia-śródziemnomorska
: Aioli — sos do dań głównych, makaronu lub warzyw, o konsystencji dopasowanej do sposobu podania.
0,5 szt. | żółtko
1 szt. | czosnek
12 ml | oliwa z oliwek
0,3 szt. | cytryna
3 g | sól
> Przygotuj składniki: posiekaj aromaty, odmierz płyny i zetrzyj sery lub przyprawy, jeśli są w recepturze.
> Podgrzej bazę na małym lub średnim ogniu, mieszając, aby składniki równomiernie się połączyły.
> Jeśli sos wymaga redukcji, gotuj łagodnie do uzyskania właściwej konsystencji. Jeśli ma pozostać świeży, nie podgrzewaj go.
> Dopraw stopniowo i próbuj po każdym dodatku. W razie potrzeby przecedź lub zblenduj.
> Podawaj od razu albo ostudź szybko i przechowuj w lodówce.

# Sos serowy cheddar
@ cat=sosy origin=US trad servings=1 prep=8 cook=12 art=food tags=tradycyjne,sos,kuchnia-amerykańska
: Sos serowy cheddar — sos do dań głównych, makaronu lub warzyw, o konsystencji dopasowanej do sposobu podania.
50 g | cheddar
80 ml | mleko
10 g | masło
8 g | mąka pszenna
> Przygotuj składniki: posiekaj aromaty, odmierz płyny i zetrzyj sery lub przyprawy, jeśli są w recepturze.
> Podgrzej bazę na małym lub średnim ogniu, mieszając, aby składniki równomiernie się połączyły.
> Jeśli sos wymaga redukcji, gotuj łagodnie do uzyskania właściwej konsystencji. Jeśli ma pozostać świeży, nie podgrzewaj go.
> Dopraw stopniowo i próbuj po każdym dodatku. W razie potrzeby przecedź lub zblenduj.
> Podawaj od razu albo ostudź szybko i przechowuj w lodówce.

# Manhattan
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl,bar
: Klasyczny koktajl: rye, słodki wermut, bitters.
50 ml | whisky żytnia
25 ml | wermut słodki
2 ml | angostura
> Wymieszaj whiskey, słodki wermut i bitters z lodem w szklanicy barmańskiej. Przecedź do schłodzonego szkła.
> Spróbuj i skoryguj proporcje wyłącznie w granicach składników przewidzianych w recepturze.
> Użyj świeżego lodu i schłodzonego szkła, jeśli koktajl podaje się na zimno.
> Dodaj dekorację z owoców lub ziół wymienionych w składnikach.
> Podawaj natychmiast, zanim lód nadmiernie rozcieńczy napój.

# Mai Tai
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl,bar
: Klasyczny koktajl: rum, orgeat, limonka, orange curaçao.
40 ml | rum
15 ml | orgeat
20 ml | sok z limonki
15 ml | curaçao
> Wstrząśnij rumy, likier pomarańczowy, syrop migdałowy i sok z limonki z lodem. Przelej do szklanki z kruszonym lodem.
> Spróbuj i skoryguj proporcje wyłącznie w granicach składników przewidzianych w recepturze.
> Użyj świeżego lodu i schłodzonego szkła, jeśli koktajl podaje się na zimno.
> Dodaj dekorację z owoców lub ziół wymienionych w składnikach.
> Podawaj natychmiast, zanim lód nadmiernie rozcieńczy napój.

# Paloma
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl,bar
: Klasyczny koktajl: tequila, grejpfrut, soda.
45 ml | tequila
90 ml | sok grejpfrutowy
40 ml | woda gazowana
0,2 szt. | limonka
> Wlej tequilę i sok z limonki do szklanki z lodem, dopełnij sodą grejpfrutową i delikatnie wymieszaj.
> Spróbuj i skoryguj proporcje wyłącznie w granicach składników przewidzianych w recepturze.
> Użyj świeżego lodu i schłodzonego szkła, jeśli koktajl podaje się na zimno.
> Dodaj dekorację z owoców lub ziół wymienionych w składnikach.
> Podawaj natychmiast, zanim lód nadmiernie rozcieńczy napój.

# French 75
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl,bar
: Klasyczny koktajl: gin, cytryna, cukier, szampan.
30 ml | gin
15 ml | sok z cytryny
10 ml | syrop cukrowy
60 ml | szampan
> Wstrząśnij gin, sok cytrynowy i syrop z lodem, przecedź do kieliszka i dopełnij winem musującym.
> Spróbuj i skoryguj proporcje wyłącznie w granicach składników przewidzianych w recepturze.
> Użyj świeżego lodu i schłodzonego szkła, jeśli koktajl podaje się na zimno.
> Dodaj dekorację z owoców lub ziół wymienionych w składnikach.
> Podawaj natychmiast, zanim lód nadmiernie rozcieńczy napój.

# Sidecar
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl,bar
: Klasyczny koktajl: koniak, triple sec, cytryna.
50 ml | koniak
20 ml | triple sec
20 ml | sok z cytryny
> Wstrząśnij koniak, likier pomarańczowy i sok cytrynowy z lodem. Przecedź do schłodzonego kieliszka.
> Spróbuj i skoryguj proporcje wyłącznie w granicach składników przewidzianych w recepturze.
> Użyj świeżego lodu i schłodzonego szkła, jeśli koktajl podaje się na zimno.
> Dodaj dekorację z owoców lub ziół wymienionych w składnikach.
> Podawaj natychmiast, zanim lód nadmiernie rozcieńczy napój.

# Penicillin
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl,bar
: Klasyczny koktajl: whisky, imbir, miód, cytryna.
50 ml | whisky
8 g | imbir
10 g | miód
20 ml | sok z cytryny
> Odmierz wszystkie składniki przed rozpoczęciem przygotowania i schłodź szkło, jeśli napój podaje się na zimno.
> Połącz składniki w shakerze lub szklanicy barmańskiej, zgodnie z charakterem napoju: koktajle z sokiem zwykle wstrząsa się, a klarowne na bazie alkoholu miesza.
> Jeśli używasz shakera, napełnij go lodem i wstrząśnij do mocnego schłodzenia. Klarowne koktajle mieszaj z lodem, aby zachować przejrzystość.
> Przecedź do szkła z lodem lub do schłodzonego kieliszka, zgodnie ze sposobem podania.
> Udekoruj składnikiem z listy i podawaj od razu.

# Americano
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl,bar
: Klasyczny koktajl: campari, wermut, soda.
30 ml | campari
30 ml | wermut słodki
60 ml | woda gazowana
> Wlej Campari i czerwony wermut do szklanki z lodem, dopełnij wodą gazowaną i udekoruj pomarańczą.
> Spróbuj i skoryguj proporcje wyłącznie w granicach składników przewidzianych w recepturze.
> Użyj świeżego lodu i schłodzonego szkła, jeśli koktajl podaje się na zimno.
> Dodaj dekorację z owoców lub ziół wymienionych w składnikach.
> Podawaj natychmiast, zanim lód nadmiernie rozcieńczy napój.

# Lemoniada cytrynowa
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=napój
: Lemoniada cytrynowa — jedna szklanka.
1 szt. | cytryna
15 g | cukier
250 ml | woda
3 g | mięta
> Przygotuj sok lub owoce zgodnie z recepturą. Jeśli używasz cytrusów, wyciśnij sok i usuń pestki.
> Rozpuść cukier w niewielkiej ilości ciepłej wody albo przygotuj syrop, jeśli przewidziano go w składnikach.
> Połącz sok, wodę i pozostałe składniki. Spróbuj i dopasuj słodycz do kwasowości owoców.
> Schłodź napój w lodówce. Lód dodawaj bezpośrednio przed podaniem.
> Podawaj w schłodzonych szklankach, z owocami lub ziołami z listy.

# Lemoniada ogórkowa
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=napój
: Lemoniada ogórkowa — jedna szklanka.
60 g | ogórek
0,5 szt. | cytryna
250 ml | woda
10 g | miód
> Przygotuj sok lub owoce zgodnie z recepturą. Jeśli używasz cytrusów, wyciśnij sok i usuń pestki.
> Rozpuść cukier w niewielkiej ilości ciepłej wody albo przygotuj syrop, jeśli przewidziano go w składnikach.
> Połącz sok, wodę i pozostałe składniki. Spróbuj i dopasuj słodycz do kwasowości owoców.
> Schłodź napój w lodówce. Lód dodawaj bezpośrednio przed podaniem.
> Podawaj w schłodzonych szklankach, z owocami lub ziołami z listy.

# Smoothie jagodowe
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=napój
: Smoothie jagodowe — jedna szklanka.
80 g | jagody
0,4 szt. | banan
80 g | jogurt
8 g | miód
> Owoce umyj, obierz i pokrój na mniejsze kawałki. Jeśli używasz mrożonych owoców, nie musisz ich wcześniej rozmrażać.
> Włóż składniki do blendera, zaczynając od płynu.
> Miksuj do uzyskania gładkiej konsystencji. Jeśli napój jest zbyt gęsty, dodaj trochę płynu z receptury.
> Spróbuj i w razie potrzeby skoryguj słodycz lub kwasowość.
> Podawaj od razu, najlepiej dobrze schłodzony.

# Smoothie zielone
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=napój
: Smoothie zielone — jedna szklanka.
40 g | szpinak
0,5 szt. | banan
60 g | jabłko
80 ml | woda
> Owoce umyj, obierz i pokrój na mniejsze kawałki. Jeśli używasz mrożonych owoców, nie musisz ich wcześniej rozmrażać.
> Włóż składniki do blendera, zaczynając od płynu.
> Miksuj do uzyskania gładkiej konsystencji. Jeśli napój jest zbyt gęsty, dodaj trochę płynu z receptury.
> Spróbuj i w razie potrzeby skoryguj słodycz lub kwasowość.
> Podawaj od razu, najlepiej dobrze schłodzony.

# Smoothie mango-kokos
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=napój
: Smoothie mango-kokos — jedna szklanka.
90 g | mango
80 ml | mleko kokosowe
0,2 szt. | limonka
> Owoce umyj, obierz i pokrój na mniejsze kawałki. Jeśli używasz mrożonych owoców, nie musisz ich wcześniej rozmrażać.
> Włóż składniki do blendera, zaczynając od płynu.
> Miksuj do uzyskania gładkiej konsystencji. Jeśli napój jest zbyt gęsty, dodaj trochę płynu z receptury.
> Spróbuj i w razie potrzeby skoryguj słodycz lub kwasowość.
> Podawaj od razu, najlepiej dobrze schłodzony.

# Herbata matcha latte
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=napój
: Herbata matcha latte — jedna szklanka.
3 g | matcha
180 ml | mleko
40 ml | woda
> Przygotuj bazę napoju: zaparz kawę lub herbatę, albo podgrzej mleko zgodnie z recepturą.
> Rozpuść słodzik lub proszek w niewielkiej ilości gorącego płynu, aby uniknąć grudek.
> Połącz składniki i spień mleko, jeśli napój tego wymaga.
> Przelej do filiżanki lub szklanki. W wersji na zimno dodaj lód dopiero po ostudzeniu bazy.
> Podawaj od razu, z dekoracją przewidzianą w recepturze.

# Herbata imbirowa
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=napój
: Herbata imbirowa — jedna szklanka.
12 g | imbir
250 ml | woda
10 g | miód
0,2 szt. | cytryna
> Przygotuj bazę napoju: zaparz kawę lub herbatę, albo podgrzej mleko zgodnie z recepturą.
> Rozpuść słodzik lub proszek w niewielkiej ilości gorącego płynu, aby uniknąć grudek.
> Połącz składniki i spień mleko, jeśli napój tego wymaga.
> Przelej do filiżanki lub szklanki. W wersji na zimno dodaj lód dopiero po ostudzeniu bazy.
> Podawaj od razu, z dekoracją przewidzianą w recepturze.

# Kakao na mleku
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=napój
: Kakao na mleku — jedna szklanka.
10 g | kakao
200 ml | mleko
8 g | cukier
> Przygotuj bazę napoju: zaparz kawę lub herbatę, albo podgrzej mleko zgodnie z recepturą.
> Rozpuść słodzik lub proszek w niewielkiej ilości gorącego płynu, aby uniknąć grudek.
> Połącz składniki i spień mleko, jeśli napój tego wymaga.
> Przelej do filiżanki lub szklanki. W wersji na zimno dodaj lód dopiero po ostudzeniu bazy.
> Podawaj od razu, z dekoracją przewidzianą w recepturze.

# Mors
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=napój
: Mors — jedna szklanka.
50 g | żurawina
220 ml | woda
12 g | cukier
> Przygotuj sok lub owoce zgodnie z recepturą. Jeśli używasz cytrusów, wyciśnij sok i usuń pestki.
> Rozpuść cukier w niewielkiej ilości ciepłej wody albo przygotuj syrop, jeśli przewidziano go w składnikach.
> Połącz sok, wodę i pozostałe składniki. Spróbuj i dopasuj słodycz do kwasowości owoców.
> Schłodź napój w lodówce. Lód dodawaj bezpośrednio przed podaniem.
> Podawaj w schłodzonych szklankach, z owocami lub ziołami z listy.

# Orzeźwiająca woda z owocami
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=napój
: Orzeźwiająca woda z owocami — jedna szklanka.
300 ml | woda
0,3 szt. | cytryna
20 g | ogórek
4 g | mięta
> Przygotuj sok lub owoce zgodnie z recepturą. Jeśli używasz cytrusów, wyciśnij sok i usuń pestki.
> Rozpuść cukier w niewielkiej ilości ciepłej wody albo przygotuj syrop, jeśli przewidziano go w składnikach.
> Połącz sok, wodę i pozostałe składniki. Spróbuj i dopasuj słodycz do kwasowości owoców.
> Schłodź napój w lodówce. Lód dodawaj bezpośrednio przed podaniem.
> Podawaj w schłodzonych szklankach, z owocami lub ziołami z listy.

# Kurczak w sosie słodko-kwaśnym
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Kurczak w sosie słodko-kwaśnym — danie przygotowywane krótko na mocno rozgrzanym woku.
140 g | filet z kurczaka
15 g | ketchup
10 ml | ocet ryżowy
8 g | cukier
30 g | ananas
12 ml | olej rzepakowy
> Pokrój białko i warzywa na równe kawałki. Osusz składniki, a sos przygotuj wcześniej z produktów wymienionych w recepturze.
> Rozgrzej wok lub szeroką patelnię. Obsmaż białko partiami na mocnym ogniu i odłóż na bok.
> Dodaj aromaty oraz warzywa. Smaż krótko, aby zachowały jędrność i kolor.
> Włóż białko z powrotem, dodaj sos i podgrzewaj, aż składniki będą gotowe, a sos lekko zgęstnieje.
> Spróbuj, dopraw i podawaj od razu.

# Kurczak kung pao
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Pikantne danie z woka z orzeszkami, chili i wyrazistym sosem na bazie sosu sojowego.
140 g | filet z kurczaka
15 g | orzeszki ziemne
4 g | chilli
12 ml | sos sojowy
1 g | pieprz syczuański
12 ml | olej rzepakowy
> Pokrój białko w równe kawałki i osusz. Przygotuj sos z sosu sojowego oraz pozostałych składników płynnych.
> Rozgrzej wok lub dużą patelnię. Smaż białko partiami, aby się zrumieniło zamiast puścić wodę; odłóż na bok.
> Krótko podsmaż czosnek, chili i warzywa. Dodaj orzeszki, jeśli są w składnikach.
> Włóż białko z powrotem, wlej sos i energicznie mieszaj, aż oblepi składniki i lekko zgęstnieje.
> Podawaj od razu z ryżem lub makaronem, jeśli są przewidziane w recepturze.

# Kurczak z czarnym pieprzem
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Danie z woka z mocnym aromatem świeżo mielonego pieprzu i wytrawnym sosem.
140 g | filet z kurczaka
3 g | pieprz czarny
12 ml | sos ostrygowy
0,5 szt. | cebula
40 g | papryka
12 ml | olej rzepakowy
> Pokrój białko w cienkie paski i dokładnie osusz. Warzywa pokrój na podobną wielkość.
> Rozgrzej wok lub dużą patelnię. Obsmaż białko partiami na mocnym ogniu i odłóż na bok.
> Dodaj aromaty i warzywa, smaż krótko. Przygotuj sos z czarnego pieprzu i składników płynnych z listy.
> Włóż białko z powrotem, wlej sos i mieszaj, aż całość będzie gorąca, a sos oblepi składniki.
> Podawaj natychmiast z ryżem lub makaronem, jeśli przewidziano je w składnikach.

# Kurczak po syczuańsku
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Kurczak po syczuańsku — danie przygotowywane krótko na mocno rozgrzanym woku.
140 g | filet z kurczaka
12 g | pasta doubanjiang
1 szt. | czosnek
5 g | imbir
5 ml | sezamowy olej
12 ml | olej rzepakowy
> Pokrój białko i warzywa na równe kawałki. Osusz składniki, a sos przygotuj wcześniej z produktów wymienionych w recepturze.
> Rozgrzej wok lub szeroką patelnię. Obsmaż białko partiami na mocnym ogniu i odłóż na bok.
> Dodaj aromaty oraz warzywa. Smaż krótko, aby zachowały jędrność i kolor.
> Włóż białko z powrotem, dodaj sos i podgrzewaj, aż składniki będą gotowe, a sos lekko zgęstnieje.
> Spróbuj, dopraw i podawaj od razu.

# Kurczak z bazylią tajską
@ cat=ryby servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Szybkie danie z woka z tajską bazylią, czosnkiem i pikantno-słonym sosem.
140 g | filet z kurczaka
8 g | bazylia tajska
8 ml | sos rybny
3 g | chilli
1 szt. | czosnek
12 ml | olej rzepakowy
> Pokrój białko w cienkie kawałki i przygotuj wszystkie składniki przed rozgrzaniem patelni — smażenie będzie szybkie.
> Rozgrzej wok z olejem. Krótko podsmaż czosnek i chili, aż zaczną pachnieć.
> Dodaj białko i smaż na dużym ogniu, mieszając, aż będzie prawie gotowe.
> Dodaj sosy z receptury i odrobinę wody, jeśli potrzeba. Na sam koniec wmieszaj tajską bazylię, aby zachowała aromat.
> Podawaj natychmiast z ryżem, jeśli jest w składnikach.

# Kurczak pad see ew
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Tajski makaron ryżowy smażony na dużym ogniu z białkiem, warzywami i ciemnym sosem sojowym.
140 g | filet z kurczaka
80 g | makaron ryżowy
15 ml | sos sojowy ciemny
50 g | brokuł chiński
0,5 szt. | jajko
12 ml | olej rzepakowy
> Makaron ryżowy przygotuj zgodnie z instrukcją na opakowaniu. Warzywa pokrój, a białko osusz.
> Rozgrzej wok bardzo mocno. Smaż białko krótko, aż się zetnie i lekko zrumieni; odłóż na bok.
> Dodaj warzywa i smaż krótko, zachowując ich jędrność. Jeśli receptura zawiera jajko, wbij je na wolne miejsce i szybko zetnij.
> Dodaj makaron i sos sojowy. Włóż białko z powrotem i wymieszaj na dużym ogniu, aż makaron złapie kolor sosu.
> Podawaj natychmiast, prosto z woka.

# Kurczak w sosie orzechowym
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Kurczak w sosie orzechowym — danie przygotowywane krótko na mocno rozgrzanym woku.
140 g | filet z kurczaka
20 g | masło orzechowe
30 ml | mleko kokosowe
0,2 szt. | limonka
8 ml | sos sojowy
12 ml | olej rzepakowy
> Pokrój białko i warzywa na równe kawałki. Osusz składniki, a sos przygotuj wcześniej z produktów wymienionych w recepturze.
> Rozgrzej wok lub szeroką patelnię. Obsmaż białko partiami na mocnym ogniu i odłóż na bok.
> Dodaj aromaty oraz warzywa. Smaż krótko, aby zachowały jędrność i kolor.
> Włóż białko z powrotem, dodaj sos i podgrzewaj, aż składniki będą gotowe, a sos lekko zgęstnieje.
> Spróbuj, dopraw i podawaj od razu.

# Wołowina w sosie słodko-kwaśnym
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Wołowina w sosie słodko-kwaśnym — danie przygotowywane krótko na mocno rozgrzanym woku.
130 g | wołowina
15 g | ketchup
10 ml | ocet ryżowy
8 g | cukier
30 g | ananas
12 ml | olej rzepakowy
> Pokrój białko i warzywa na równe kawałki. Osusz składniki, a sos przygotuj wcześniej z produktów wymienionych w recepturze.
> Rozgrzej wok lub szeroką patelnię. Obsmaż białko partiami na mocnym ogniu i odłóż na bok.
> Dodaj aromaty oraz warzywa. Smaż krótko, aby zachowały jędrność i kolor.
> Włóż białko z powrotem, dodaj sos i podgrzewaj, aż składniki będą gotowe, a sos lekko zgęstnieje.
> Spróbuj, dopraw i podawaj od razu.

# Wołowina kung pao
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Pikantne danie z woka z orzeszkami, chili i wyrazistym sosem na bazie sosu sojowego.
130 g | wołowina
15 g | orzeszki ziemne
4 g | chilli
12 ml | sos sojowy
1 g | pieprz syczuański
12 ml | olej rzepakowy
> Pokrój białko w równe kawałki i osusz. Przygotuj sos z sosu sojowego oraz pozostałych składników płynnych.
> Rozgrzej wok lub dużą patelnię. Smaż białko partiami, aby się zrumieniło zamiast puścić wodę; odłóż na bok.
> Krótko podsmaż czosnek, chili i warzywa. Dodaj orzeszki, jeśli są w składnikach.
> Włóż białko z powrotem, wlej sos i energicznie mieszaj, aż oblepi składniki i lekko zgęstnieje.
> Podawaj od razu z ryżem lub makaronem, jeśli są przewidziane w recepturze.

# Wołowina z czarnym pieprzem
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Danie z woka z mocnym aromatem świeżo mielonego pieprzu i wytrawnym sosem.
130 g | wołowina
3 g | pieprz czarny
12 ml | sos ostrygowy
0,5 szt. | cebula
40 g | papryka
12 ml | olej rzepakowy
> Pokrój białko w cienkie paski i dokładnie osusz. Warzywa pokrój na podobną wielkość.
> Rozgrzej wok lub dużą patelnię. Obsmaż białko partiami na mocnym ogniu i odłóż na bok.
> Dodaj aromaty i warzywa, smaż krótko. Przygotuj sos z czarnego pieprzu i składników płynnych z listy.
> Włóż białko z powrotem, wlej sos i mieszaj, aż całość będzie gorąca, a sos oblepi składniki.
> Podawaj natychmiast z ryżem lub makaronem, jeśli przewidziano je w składnikach.

# Wołowina po syczuańsku
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Wołowina po syczuańsku — danie przygotowywane krótko na mocno rozgrzanym woku.
130 g | wołowina
12 g | pasta doubanjiang
1 szt. | czosnek
5 g | imbir
5 ml | sezamowy olej
12 ml | olej rzepakowy
> Pokrój białko i warzywa na równe kawałki. Osusz składniki, a sos przygotuj wcześniej z produktów wymienionych w recepturze.
> Rozgrzej wok lub szeroką patelnię. Obsmaż białko partiami na mocnym ogniu i odłóż na bok.
> Dodaj aromaty oraz warzywa. Smaż krótko, aby zachowały jędrność i kolor.
> Włóż białko z powrotem, dodaj sos i podgrzewaj, aż składniki będą gotowe, a sos lekko zgęstnieje.
> Spróbuj, dopraw i podawaj od razu.

# Wołowina z bazylią tajską
@ cat=ryby servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Szybkie danie z woka z tajską bazylią, czosnkiem i pikantno-słonym sosem.
130 g | wołowina
8 g | bazylia tajska
8 ml | sos rybny
3 g | chilli
1 szt. | czosnek
12 ml | olej rzepakowy
> Pokrój białko w cienkie kawałki i przygotuj wszystkie składniki przed rozgrzaniem patelni — smażenie będzie szybkie.
> Rozgrzej wok z olejem. Krótko podsmaż czosnek i chili, aż zaczną pachnieć.
> Dodaj białko i smaż na dużym ogniu, mieszając, aż będzie prawie gotowe.
> Dodaj sosy z receptury i odrobinę wody, jeśli potrzeba. Na sam koniec wmieszaj tajską bazylię, aby zachowała aromat.
> Podawaj natychmiast z ryżem, jeśli jest w składnikach.

# Wołowina pad see ew
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Tajski makaron ryżowy smażony na dużym ogniu z białkiem, warzywami i ciemnym sosem sojowym.
130 g | wołowina
80 g | makaron ryżowy
15 ml | sos sojowy ciemny
50 g | brokuł chiński
0,5 szt. | jajko
12 ml | olej rzepakowy
> Makaron ryżowy przygotuj zgodnie z instrukcją na opakowaniu. Warzywa pokrój, a białko osusz.
> Rozgrzej wok bardzo mocno. Smaż białko krótko, aż się zetnie i lekko zrumieni; odłóż na bok.
> Dodaj warzywa i smaż krótko, zachowując ich jędrność. Jeśli receptura zawiera jajko, wbij je na wolne miejsce i szybko zetnij.
> Dodaj makaron i sos sojowy. Włóż białko z powrotem i wymieszaj na dużym ogniu, aż makaron złapie kolor sosu.
> Podawaj natychmiast, prosto z woka.

# Wołowina w sosie orzechowym
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Wołowina w sosie orzechowym — danie przygotowywane krótko na mocno rozgrzanym woku.
130 g | wołowina
20 g | masło orzechowe
30 ml | mleko kokosowe
0,2 szt. | limonka
8 ml | sos sojowy
12 ml | olej rzepakowy
> Pokrój białko i warzywa na równe kawałki. Osusz składniki, a sos przygotuj wcześniej z produktów wymienionych w recepturze.
> Rozgrzej wok lub szeroką patelnię. Obsmaż białko partiami na mocnym ogniu i odłóż na bok.
> Dodaj aromaty oraz warzywa. Smaż krótko, aby zachowały jędrność i kolor.
> Włóż białko z powrotem, dodaj sos i podgrzewaj, aż składniki będą gotowe, a sos lekko zgęstnieje.
> Spróbuj, dopraw i podawaj od razu.

# Krewetki w sosie słodko-kwaśnym
@ cat=owoce-morza servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Krewetki w sosie słodko-kwaśnym — danie przygotowywane krótko na mocno rozgrzanym woku.
130 g | krewetki
15 g | ketchup
10 ml | ocet ryżowy
8 g | cukier
30 g | ananas
12 ml | olej rzepakowy
> Pokrój białko i warzywa na równe kawałki. Osusz składniki, a sos przygotuj wcześniej z produktów wymienionych w recepturze.
> Rozgrzej wok lub szeroką patelnię. Obsmaż białko partiami na mocnym ogniu i odłóż na bok.
> Dodaj aromaty oraz warzywa. Smaż krótko, aby zachowały jędrność i kolor.
> Włóż białko z powrotem, dodaj sos i podgrzewaj, aż składniki będą gotowe, a sos lekko zgęstnieje.
> Spróbuj, dopraw i podawaj od razu.

# Krewetki kung pao
@ cat=owoce-morza servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Pikantne danie z woka z orzeszkami, chili i wyrazistym sosem na bazie sosu sojowego.
130 g | krewetki
15 g | orzeszki ziemne
4 g | chilli
12 ml | sos sojowy
1 g | pieprz syczuański
12 ml | olej rzepakowy
> Pokrój białko w równe kawałki i osusz. Przygotuj sos z sosu sojowego oraz pozostałych składników płynnych.
> Rozgrzej wok lub dużą patelnię. Smaż białko partiami, aby się zrumieniło zamiast puścić wodę; odłóż na bok.
> Krótko podsmaż czosnek, chili i warzywa. Dodaj orzeszki, jeśli są w składnikach.
> Włóż białko z powrotem, wlej sos i energicznie mieszaj, aż oblepi składniki i lekko zgęstnieje.
> Podawaj od razu z ryżem lub makaronem, jeśli są przewidziane w recepturze.

# Krewetki z czarnym pieprzem
@ cat=owoce-morza servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Danie z woka z mocnym aromatem świeżo mielonego pieprzu i wytrawnym sosem.
130 g | krewetki
3 g | pieprz czarny
12 ml | sos ostrygowy
0,5 szt. | cebula
40 g | papryka
12 ml | olej rzepakowy
> Pokrój białko w cienkie paski i dokładnie osusz. Warzywa pokrój na podobną wielkość.
> Rozgrzej wok lub dużą patelnię. Obsmaż białko partiami na mocnym ogniu i odłóż na bok.
> Dodaj aromaty i warzywa, smaż krótko. Przygotuj sos z czarnego pieprzu i składników płynnych z listy.
> Włóż białko z powrotem, wlej sos i mieszaj, aż całość będzie gorąca, a sos oblepi składniki.
> Podawaj natychmiast z ryżem lub makaronem, jeśli przewidziano je w składnikach.

# Krewetki po syczuańsku
@ cat=owoce-morza servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Krewetki po syczuańsku — danie przygotowywane krótko na mocno rozgrzanym woku.
130 g | krewetki
12 g | pasta doubanjiang
1 szt. | czosnek
5 g | imbir
5 ml | sezamowy olej
12 ml | olej rzepakowy
> Pokrój białko i warzywa na równe kawałki. Osusz składniki, a sos przygotuj wcześniej z produktów wymienionych w recepturze.
> Rozgrzej wok lub szeroką patelnię. Obsmaż białko partiami na mocnym ogniu i odłóż na bok.
> Dodaj aromaty oraz warzywa. Smaż krótko, aby zachowały jędrność i kolor.
> Włóż białko z powrotem, dodaj sos i podgrzewaj, aż składniki będą gotowe, a sos lekko zgęstnieje.
> Spróbuj, dopraw i podawaj od razu.

# Krewetki z bazylią tajską
@ cat=owoce-morza servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Szybkie danie z woka z tajską bazylią, czosnkiem i pikantno-słonym sosem.
130 g | krewetki
8 g | bazylia tajska
8 ml | sos rybny
3 g | chilli
1 szt. | czosnek
12 ml | olej rzepakowy
> Pokrój białko w cienkie kawałki i przygotuj wszystkie składniki przed rozgrzaniem patelni — smażenie będzie szybkie.
> Rozgrzej wok z olejem. Krótko podsmaż czosnek i chili, aż zaczną pachnieć.
> Dodaj białko i smaż na dużym ogniu, mieszając, aż będzie prawie gotowe.
> Dodaj sosy z receptury i odrobinę wody, jeśli potrzeba. Na sam koniec wmieszaj tajską bazylię, aby zachowała aromat.
> Podawaj natychmiast z ryżem, jeśli jest w składnikach.

# Krewetki pad see ew
@ cat=owoce-morza servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Tajski makaron ryżowy smażony na dużym ogniu z białkiem, warzywami i ciemnym sosem sojowym.
130 g | krewetki
80 g | makaron ryżowy
15 ml | sos sojowy ciemny
50 g | brokuł chiński
0,5 szt. | jajko
12 ml | olej rzepakowy
> Makaron ryżowy przygotuj zgodnie z instrukcją na opakowaniu. Warzywa pokrój, a białko osusz.
> Rozgrzej wok bardzo mocno. Smaż białko krótko, aż się zetnie i lekko zrumieni; odłóż na bok.
> Dodaj warzywa i smaż krótko, zachowując ich jędrność. Jeśli receptura zawiera jajko, wbij je na wolne miejsce i szybko zetnij.
> Dodaj makaron i sos sojowy. Włóż białko z powrotem i wymieszaj na dużym ogniu, aż makaron złapie kolor sosu.
> Podawaj natychmiast, prosto z woka.

# Krewetki w sosie orzechowym
@ cat=owoce-morza servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Krewetki w sosie orzechowym — danie przygotowywane krótko na mocno rozgrzanym woku.
130 g | krewetki
20 g | masło orzechowe
30 ml | mleko kokosowe
0,2 szt. | limonka
8 ml | sos sojowy
12 ml | olej rzepakowy
> Pokrój białko i warzywa na równe kawałki. Osusz składniki, a sos przygotuj wcześniej z produktów wymienionych w recepturze.
> Rozgrzej wok lub szeroką patelnię. Obsmaż białko partiami na mocnym ogniu i odłóż na bok.
> Dodaj aromaty oraz warzywa. Smaż krótko, aby zachowały jędrność i kolor.
> Włóż białko z powrotem, dodaj sos i podgrzewaj, aż składniki będą gotowe, a sos lekko zgęstnieje.
> Spróbuj, dopraw i podawaj od razu.

# Tofu w sosie słodko-kwaśnym
@ cat=warzywa servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Tofu w sosie słodko-kwaśnym — danie przygotowywane krótko na mocno rozgrzanym woku.
140 g | tofu
15 g | ketchup
10 ml | ocet ryżowy
8 g | cukier
30 g | ananas
12 ml | olej rzepakowy
> Pokrój białko i warzywa na równe kawałki. Osusz składniki, a sos przygotuj wcześniej z produktów wymienionych w recepturze.
> Rozgrzej wok lub szeroką patelnię. Obsmaż białko partiami na mocnym ogniu i odłóż na bok.
> Dodaj aromaty oraz warzywa. Smaż krótko, aby zachowały jędrność i kolor.
> Włóż białko z powrotem, dodaj sos i podgrzewaj, aż składniki będą gotowe, a sos lekko zgęstnieje.
> Spróbuj, dopraw i podawaj od razu.

# Tofu kung pao
@ cat=warzywa servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Pikantne danie z woka z orzeszkami, chili i wyrazistym sosem na bazie sosu sojowego.
140 g | tofu
15 g | orzeszki ziemne
4 g | chilli
12 ml | sos sojowy
1 g | pieprz syczuański
12 ml | olej rzepakowy
> Pokrój białko w równe kawałki i osusz. Przygotuj sos z sosu sojowego oraz pozostałych składników płynnych.
> Rozgrzej wok lub dużą patelnię. Smaż białko partiami, aby się zrumieniło zamiast puścić wodę; odłóż na bok.
> Krótko podsmaż czosnek, chili i warzywa. Dodaj orzeszki, jeśli są w składnikach.
> Włóż białko z powrotem, wlej sos i energicznie mieszaj, aż oblepi składniki i lekko zgęstnieje.
> Podawaj od razu z ryżem lub makaronem, jeśli są przewidziane w recepturze.

# Tofu z czarnym pieprzem
@ cat=warzywa servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Danie z woka z mocnym aromatem świeżo mielonego pieprzu i wytrawnym sosem.
140 g | tofu
3 g | pieprz czarny
12 ml | sos ostrygowy
0,5 szt. | cebula
40 g | papryka
12 ml | olej rzepakowy
> Pokrój białko w cienkie paski i dokładnie osusz. Warzywa pokrój na podobną wielkość.
> Rozgrzej wok lub dużą patelnię. Obsmaż białko partiami na mocnym ogniu i odłóż na bok.
> Dodaj aromaty i warzywa, smaż krótko. Przygotuj sos z czarnego pieprzu i składników płynnych z listy.
> Włóż białko z powrotem, wlej sos i mieszaj, aż całość będzie gorąca, a sos oblepi składniki.
> Podawaj natychmiast z ryżem lub makaronem, jeśli przewidziano je w składnikach.

# Tofu po syczuańsku
@ cat=warzywa servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Tofu po syczuańsku — danie przygotowywane krótko na mocno rozgrzanym woku.
140 g | tofu
12 g | pasta doubanjiang
1 szt. | czosnek
5 g | imbir
5 ml | sezamowy olej
12 ml | olej rzepakowy
> Pokrój białko i warzywa na równe kawałki. Osusz składniki, a sos przygotuj wcześniej z produktów wymienionych w recepturze.
> Rozgrzej wok lub szeroką patelnię. Obsmaż białko partiami na mocnym ogniu i odłóż na bok.
> Dodaj aromaty oraz warzywa. Smaż krótko, aby zachowały jędrność i kolor.
> Włóż białko z powrotem, dodaj sos i podgrzewaj, aż składniki będą gotowe, a sos lekko zgęstnieje.
> Spróbuj, dopraw i podawaj od razu.

# Tofu z bazylią tajską
@ cat=ryby servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Szybkie danie z woka z tajską bazylią, czosnkiem i pikantno-słonym sosem.
140 g | tofu
8 g | bazylia tajska
8 ml | sos rybny
3 g | chilli
1 szt. | czosnek
12 ml | olej rzepakowy
> Pokrój białko w cienkie kawałki i przygotuj wszystkie składniki przed rozgrzaniem patelni — smażenie będzie szybkie.
> Rozgrzej wok z olejem. Krótko podsmaż czosnek i chili, aż zaczną pachnieć.
> Dodaj białko i smaż na dużym ogniu, mieszając, aż będzie prawie gotowe.
> Dodaj sosy z receptury i odrobinę wody, jeśli potrzeba. Na sam koniec wmieszaj tajską bazylię, aby zachowała aromat.
> Podawaj natychmiast z ryżem, jeśli jest w składnikach.

# Tofu pad see ew
@ cat=warzywa servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Tajski makaron ryżowy smażony na dużym ogniu z białkiem, warzywami i ciemnym sosem sojowym.
140 g | tofu
80 g | makaron ryżowy
15 ml | sos sojowy ciemny
50 g | brokuł chiński
0,5 szt. | jajko
12 ml | olej rzepakowy
> Makaron ryżowy przygotuj zgodnie z instrukcją na opakowaniu. Warzywa pokrój, a białko osusz.
> Rozgrzej wok bardzo mocno. Smaż białko krótko, aż się zetnie i lekko zrumieni; odłóż na bok.
> Dodaj warzywa i smaż krótko, zachowując ich jędrność. Jeśli receptura zawiera jajko, wbij je na wolne miejsce i szybko zetnij.
> Dodaj makaron i sos sojowy. Włóż białko z powrotem i wymieszaj na dużym ogniu, aż makaron złapie kolor sosu.
> Podawaj natychmiast, prosto z woka.

# Tofu w sosie orzechowym
@ cat=warzywa servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Tofu w sosie orzechowym — danie przygotowywane krótko na mocno rozgrzanym woku.
140 g | tofu
20 g | masło orzechowe
30 ml | mleko kokosowe
0,2 szt. | limonka
8 ml | sos sojowy
12 ml | olej rzepakowy
> Pokrój białko i warzywa na równe kawałki. Osusz składniki, a sos przygotuj wcześniej z produktów wymienionych w recepturze.
> Rozgrzej wok lub szeroką patelnię. Obsmaż białko partiami na mocnym ogniu i odłóż na bok.
> Dodaj aromaty oraz warzywa. Smaż krótko, aby zachowały jędrność i kolor.
> Włóż białko z powrotem, dodaj sos i podgrzewaj, aż składniki będą gotowe, a sos lekko zgęstnieje.
> Spróbuj, dopraw i podawaj od razu.

# Wieprzowina w sosie słodko-kwaśnym
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Wieprzowina w sosie słodko-kwaśnym — danie przygotowywane krótko na mocno rozgrzanym woku.
130 g | wieprzowina
15 g | ketchup
10 ml | ocet ryżowy
8 g | cukier
30 g | ananas
12 ml | olej rzepakowy
> Pokrój białko i warzywa na równe kawałki. Osusz składniki, a sos przygotuj wcześniej z produktów wymienionych w recepturze.
> Rozgrzej wok lub szeroką patelnię. Obsmaż białko partiami na mocnym ogniu i odłóż na bok.
> Dodaj aromaty oraz warzywa. Smaż krótko, aby zachowały jędrność i kolor.
> Włóż białko z powrotem, dodaj sos i podgrzewaj, aż składniki będą gotowe, a sos lekko zgęstnieje.
> Spróbuj, dopraw i podawaj od razu.

# Wieprzowina kung pao
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Pikantne danie z woka z orzeszkami, chili i wyrazistym sosem na bazie sosu sojowego.
130 g | wieprzowina
15 g | orzeszki ziemne
4 g | chilli
12 ml | sos sojowy
1 g | pieprz syczuański
12 ml | olej rzepakowy
> Pokrój białko w równe kawałki i osusz. Przygotuj sos z sosu sojowego oraz pozostałych składników płynnych.
> Rozgrzej wok lub dużą patelnię. Smaż białko partiami, aby się zrumieniło zamiast puścić wodę; odłóż na bok.
> Krótko podsmaż czosnek, chili i warzywa. Dodaj orzeszki, jeśli są w składnikach.
> Włóż białko z powrotem, wlej sos i energicznie mieszaj, aż oblepi składniki i lekko zgęstnieje.
> Podawaj od razu z ryżem lub makaronem, jeśli są przewidziane w recepturze.

# Wieprzowina z czarnym pieprzem
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Danie z woka z mocnym aromatem świeżo mielonego pieprzu i wytrawnym sosem.
130 g | wieprzowina
3 g | pieprz czarny
12 ml | sos ostrygowy
0,5 szt. | cebula
40 g | papryka
12 ml | olej rzepakowy
> Pokrój białko w cienkie paski i dokładnie osusz. Warzywa pokrój na podobną wielkość.
> Rozgrzej wok lub dużą patelnię. Obsmaż białko partiami na mocnym ogniu i odłóż na bok.
> Dodaj aromaty i warzywa, smaż krótko. Przygotuj sos z czarnego pieprzu i składników płynnych z listy.
> Włóż białko z powrotem, wlej sos i mieszaj, aż całość będzie gorąca, a sos oblepi składniki.
> Podawaj natychmiast z ryżem lub makaronem, jeśli przewidziano je w składnikach.

# Wieprzowina po syczuańsku
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Wieprzowina po syczuańsku — danie przygotowywane krótko na mocno rozgrzanym woku.
130 g | wieprzowina
12 g | pasta doubanjiang
1 szt. | czosnek
5 g | imbir
5 ml | sezamowy olej
12 ml | olej rzepakowy
> Pokrój białko i warzywa na równe kawałki. Osusz składniki, a sos przygotuj wcześniej z produktów wymienionych w recepturze.
> Rozgrzej wok lub szeroką patelnię. Obsmaż białko partiami na mocnym ogniu i odłóż na bok.
> Dodaj aromaty oraz warzywa. Smaż krótko, aby zachowały jędrność i kolor.
> Włóż białko z powrotem, dodaj sos i podgrzewaj, aż składniki będą gotowe, a sos lekko zgęstnieje.
> Spróbuj, dopraw i podawaj od razu.

# Wieprzowina z bazylią tajską
@ cat=ryby servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Szybkie danie z woka z tajską bazylią, czosnkiem i pikantno-słonym sosem.
130 g | wieprzowina
8 g | bazylia tajska
8 ml | sos rybny
3 g | chilli
1 szt. | czosnek
12 ml | olej rzepakowy
> Pokrój białko w cienkie kawałki i przygotuj wszystkie składniki przed rozgrzaniem patelni — smażenie będzie szybkie.
> Rozgrzej wok z olejem. Krótko podsmaż czosnek i chili, aż zaczną pachnieć.
> Dodaj białko i smaż na dużym ogniu, mieszając, aż będzie prawie gotowe.
> Dodaj sosy z receptury i odrobinę wody, jeśli potrzeba. Na sam koniec wmieszaj tajską bazylię, aby zachowała aromat.
> Podawaj natychmiast z ryżem, jeśli jest w składnikach.

# Wieprzowina pad see ew
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Tajski makaron ryżowy smażony na dużym ogniu z białkiem, warzywami i ciemnym sosem sojowym.
130 g | wieprzowina
80 g | makaron ryżowy
15 ml | sos sojowy ciemny
50 g | brokuł chiński
0,5 szt. | jajko
12 ml | olej rzepakowy
> Makaron ryżowy przygotuj zgodnie z instrukcją na opakowaniu. Warzywa pokrój, a białko osusz.
> Rozgrzej wok bardzo mocno. Smaż białko krótko, aż się zetnie i lekko zrumieni; odłóż na bok.
> Dodaj warzywa i smaż krótko, zachowując ich jędrność. Jeśli receptura zawiera jajko, wbij je na wolne miejsce i szybko zetnij.
> Dodaj makaron i sos sojowy. Włóż białko z powrotem i wymieszaj na dużym ogniu, aż makaron złapie kolor sosu.
> Podawaj natychmiast, prosto z woka.

# Wieprzowina w sosie orzechowym
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Wieprzowina w sosie orzechowym — danie przygotowywane krótko na mocno rozgrzanym woku.
130 g | wieprzowina
20 g | masło orzechowe
30 ml | mleko kokosowe
0,2 szt. | limonka
8 ml | sos sojowy
12 ml | olej rzepakowy
> Pokrój białko i warzywa na równe kawałki. Osusz składniki, a sos przygotuj wcześniej z produktów wymienionych w recepturze.
> Rozgrzej wok lub szeroką patelnię. Obsmaż białko partiami na mocnym ogniu i odłóż na bok.
> Dodaj aromaty oraz warzywa. Smaż krótko, aby zachowały jędrność i kolor.
> Włóż białko z powrotem, dodaj sos i podgrzewaj, aż składniki będą gotowe, a sos lekko zgęstnieje.
> Spróbuj, dopraw i podawaj od razu.

# Kaczka w sosie słodko-kwaśnym
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Kaczka w sosie słodko-kwaśnym — danie przygotowywane krótko na mocno rozgrzanym woku.
130 g | kaczka
15 g | ketchup
10 ml | ocet ryżowy
8 g | cukier
30 g | ananas
12 ml | olej rzepakowy
> Pokrój białko i warzywa na równe kawałki. Osusz składniki, a sos przygotuj wcześniej z produktów wymienionych w recepturze.
> Rozgrzej wok lub szeroką patelnię. Obsmaż białko partiami na mocnym ogniu i odłóż na bok.
> Dodaj aromaty oraz warzywa. Smaż krótko, aby zachowały jędrność i kolor.
> Włóż białko z powrotem, dodaj sos i podgrzewaj, aż składniki będą gotowe, a sos lekko zgęstnieje.
> Spróbuj, dopraw i podawaj od razu.

# Kaczka kung pao
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Pikantne danie z woka z orzeszkami, chili i wyrazistym sosem na bazie sosu sojowego.
130 g | kaczka
15 g | orzeszki ziemne
4 g | chilli
12 ml | sos sojowy
1 g | pieprz syczuański
12 ml | olej rzepakowy
> Pokrój białko w równe kawałki i osusz. Przygotuj sos z sosu sojowego oraz pozostałych składników płynnych.
> Rozgrzej wok lub dużą patelnię. Smaż białko partiami, aby się zrumieniło zamiast puścić wodę; odłóż na bok.
> Krótko podsmaż czosnek, chili i warzywa. Dodaj orzeszki, jeśli są w składnikach.
> Włóż białko z powrotem, wlej sos i energicznie mieszaj, aż oblepi składniki i lekko zgęstnieje.
> Podawaj od razu z ryżem lub makaronem, jeśli są przewidziane w recepturze.

# Kaczka z czarnym pieprzem
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Danie z woka z mocnym aromatem świeżo mielonego pieprzu i wytrawnym sosem.
130 g | kaczka
3 g | pieprz czarny
12 ml | sos ostrygowy
0,5 szt. | cebula
40 g | papryka
12 ml | olej rzepakowy
> Pokrój białko w cienkie paski i dokładnie osusz. Warzywa pokrój na podobną wielkość.
> Rozgrzej wok lub dużą patelnię. Obsmaż białko partiami na mocnym ogniu i odłóż na bok.
> Dodaj aromaty i warzywa, smaż krótko. Przygotuj sos z czarnego pieprzu i składników płynnych z listy.
> Włóż białko z powrotem, wlej sos i mieszaj, aż całość będzie gorąca, a sos oblepi składniki.
> Podawaj natychmiast z ryżem lub makaronem, jeśli przewidziano je w składnikach.

# Kaczka po syczuańsku
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Kaczka po syczuańsku — danie przygotowywane krótko na mocno rozgrzanym woku.
130 g | kaczka
12 g | pasta doubanjiang
1 szt. | czosnek
5 g | imbir
5 ml | sezamowy olej
12 ml | olej rzepakowy
> Pokrój białko i warzywa na równe kawałki. Osusz składniki, a sos przygotuj wcześniej z produktów wymienionych w recepturze.
> Rozgrzej wok lub szeroką patelnię. Obsmaż białko partiami na mocnym ogniu i odłóż na bok.
> Dodaj aromaty oraz warzywa. Smaż krótko, aby zachowały jędrność i kolor.
> Włóż białko z powrotem, dodaj sos i podgrzewaj, aż składniki będą gotowe, a sos lekko zgęstnieje.
> Spróbuj, dopraw i podawaj od razu.

# Kaczka z bazylią tajską
@ cat=ryby servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Szybkie danie z woka z tajską bazylią, czosnkiem i pikantno-słonym sosem.
130 g | kaczka
8 g | bazylia tajska
8 ml | sos rybny
3 g | chilli
1 szt. | czosnek
12 ml | olej rzepakowy
> Pokrój białko w cienkie kawałki i przygotuj wszystkie składniki przed rozgrzaniem patelni — smażenie będzie szybkie.
> Rozgrzej wok z olejem. Krótko podsmaż czosnek i chili, aż zaczną pachnieć.
> Dodaj białko i smaż na dużym ogniu, mieszając, aż będzie prawie gotowe.
> Dodaj sosy z receptury i odrobinę wody, jeśli potrzeba. Na sam koniec wmieszaj tajską bazylię, aby zachowała aromat.
> Podawaj natychmiast z ryżem, jeśli jest w składnikach.

# Kaczka pad see ew
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Tajski makaron ryżowy smażony na dużym ogniu z białkiem, warzywami i ciemnym sosem sojowym.
130 g | kaczka
80 g | makaron ryżowy
15 ml | sos sojowy ciemny
50 g | brokuł chiński
0,5 szt. | jajko
12 ml | olej rzepakowy
> Makaron ryżowy przygotuj zgodnie z instrukcją na opakowaniu. Warzywa pokrój, a białko osusz.
> Rozgrzej wok bardzo mocno. Smaż białko krótko, aż się zetnie i lekko zrumieni; odłóż na bok.
> Dodaj warzywa i smaż krótko, zachowując ich jędrność. Jeśli receptura zawiera jajko, wbij je na wolne miejsce i szybko zetnij.
> Dodaj makaron i sos sojowy. Włóż białko z powrotem i wymieszaj na dużym ogniu, aż makaron złapie kolor sosu.
> Podawaj natychmiast, prosto z woka.

# Kaczka w sosie orzechowym
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Kaczka w sosie orzechowym — danie przygotowywane krótko na mocno rozgrzanym woku.
130 g | kaczka
20 g | masło orzechowe
30 ml | mleko kokosowe
0,2 szt. | limonka
8 ml | sos sojowy
12 ml | olej rzepakowy
> Pokrój białko i warzywa na równe kawałki. Osusz składniki, a sos przygotuj wcześniej z produktów wymienionych w recepturze.
> Rozgrzej wok lub szeroką patelnię. Obsmaż białko partiami na mocnym ogniu i odłóż na bok.
> Dodaj aromaty oraz warzywa. Smaż krótko, aby zachowały jędrność i kolor.
> Włóż białko z powrotem, dodaj sos i podgrzewaj, aż składniki będą gotowe, a sos lekko zgęstnieje.
> Spróbuj, dopraw i podawaj od razu.

# Ziemniaki puree
@ cat=warzywa origin=PL trad servings=1 prep=10 cook=15 art=food tags=tradycyjne,dodatek,kuchnia-polska
: Ziemniaki puree — receptura z wyraźnym smakiem głównych składników, doprawiona i wykończona tuż przed podaniem.
180 g | ziemniaki
15 g | masło
30 ml | mleko
3 g | sól
> Umyj i przygotuj warzywa. Pokrój je równo, aby wszystkie kawałki zmiękły w podobnym czasie.
> Rozgrzej tłuszcz z receptury. Podsmaż cebulę lub czosnek, jeśli występują w składnikach, aż zmiękną i zaczną pachnieć.
> Dodaj warzywa i zastosuj metodę odpowiednią dla dania: smaż do zrumienienia, duś pod przykryciem albo piecz do miękkości.
> Dopraw stopniowo. Jeśli używasz sera, ziół lub orzechów, dodaj je pod koniec, aby zachowały aromat i teksturę.
> Podawaj od razu jako samodzielne danie lub dodatek.

# Ziemniaki pieczone
@ cat=warzywa origin=US trad servings=1 prep=10 cook=15 art=food tags=tradycyjne,dodatek,kuchnia-amerykańska
: Ziemniaki pieczone — receptura z wyraźnym smakiem głównych składników, doprawiona i wykończona tuż przed podaniem.
180 g | ziemniaki
12 ml | oliwa z oliwek
2 g | rozmaryn
3 g | sól
> Umyj i przygotuj warzywa. Pokrój je równo, aby wszystkie kawałki zmiękły w podobnym czasie.
> Rozgrzej tłuszcz z receptury. Podsmaż cebulę lub czosnek, jeśli występują w składnikach, aż zmiękną i zaczną pachnieć.
> Dodaj warzywa i zastosuj metodę odpowiednią dla dania: smaż do zrumienienia, duś pod przykryciem albo piecz do miękkości.
> Dopraw stopniowo. Jeśli używasz sera, ziół lub orzechów, dodaj je pod koniec, aby zachowały aromat i teksturę.
> Podawaj od razu jako samodzielne danie lub dodatek.

# Frytki
@ cat=warzywa origin=US trad servings=1 prep=10 cook=15 art=food tags=tradycyjne,dodatek,kuchnia-amerykańska
: Frytki — receptura z wyraźnym smakiem głównych składników, doprawiona i wykończona tuż przed podaniem.
180 g | ziemniaki
12 ml | olej rzepakowy
3 g | sól
> Umyj i przygotuj warzywa. Pokrój je równo, aby wszystkie kawałki zmiękły w podobnym czasie.
> Rozgrzej tłuszcz z receptury. Podsmaż cebulę lub czosnek, jeśli występują w składnikach, aż zmiękną i zaczną pachnieć.
> Dodaj warzywa i zastosuj metodę odpowiednią dla dania: smaż do zrumienienia, duś pod przykryciem albo piecz do miękkości.
> Dopraw stopniowo. Jeśli używasz sera, ziół lub orzechów, dodaj je pod koniec, aby zachowały aromat i teksturę.
> Podawaj od razu jako samodzielne danie lub dodatek.

# Ryż jaśminowy
@ cat=warzywa servings=1 prep=10 cook=15 art=food tags=tradycyjne,dodatek,kuchnia-azjatycka
: Ryż jaśminowy — receptura z wyraźnym smakiem głównych składników, doprawiona i wykończona tuż przed podaniem.
70 g | ryż jaśminowy
110 ml | woda
3 g | sól
> Umyj i przygotuj warzywa. Pokrój je równo, aby wszystkie kawałki zmiękły w podobnym czasie.
> Rozgrzej tłuszcz z receptury. Podsmaż cebulę lub czosnek, jeśli występują w składnikach, aż zmiękną i zaczną pachnieć.
> Dodaj warzywa i zastosuj metodę odpowiednią dla dania: smaż do zrumienienia, duś pod przykryciem albo piecz do miękkości.
> Dopraw stopniowo. Jeśli używasz sera, ziół lub orzechów, dodaj je pod koniec, aby zachowały aromat i teksturę.
> Podawaj od razu jako samodzielne danie lub dodatek.

# Kasza gryczana
@ cat=warzywa origin=PL trad servings=1 prep=10 cook=15 art=food tags=tradycyjne,dodatek,kuchnia-polska
: Kasza gryczana — receptura z wyraźnym smakiem głównych składników, doprawiona i wykończona tuż przed podaniem.
70 g | kasza gryczana
140 ml | woda
10 g | masło
3 g | sól
> Umyj i przygotuj warzywa. Pokrój je równo, aby wszystkie kawałki zmiękły w podobnym czasie.
> Rozgrzej tłuszcz z receptury. Podsmaż cebulę lub czosnek, jeśli występują w składnikach, aż zmiękną i zaczną pachnieć.
> Dodaj warzywa i zastosuj metodę odpowiednią dla dania: smaż do zrumienienia, duś pod przykryciem albo piecz do miękkości.
> Dopraw stopniowo. Jeśli używasz sera, ziół lub orzechów, dodaj je pod koniec, aby zachowały aromat i teksturę.
> Podawaj od razu jako samodzielne danie lub dodatek.

# Kasza jaglana
@ cat=warzywa origin=PL trad servings=1 prep=10 cook=15 art=food tags=tradycyjne,dodatek,kuchnia-polska
: Kasza jaglana — receptura z wyraźnym smakiem głównych składników, doprawiona i wykończona tuż przed podaniem.
70 g | kasza jaglana
150 ml | woda
3 g | sól
> Umyj i przygotuj warzywa. Pokrój je równo, aby wszystkie kawałki zmiękły w podobnym czasie.
> Rozgrzej tłuszcz z receptury. Podsmaż cebulę lub czosnek, jeśli występują w składnikach, aż zmiękną i zaczną pachnieć.
> Dodaj warzywa i zastosuj metodę odpowiednią dla dania: smaż do zrumienienia, duś pod przykryciem albo piecz do miękkości.
> Dopraw stopniowo. Jeśli używasz sera, ziół lub orzechów, dodaj je pod koniec, aby zachowały aromat i teksturę.
> Podawaj od razu jako samodzielne danie lub dodatek.

# Grillowane warzywa
@ cat=warzywa servings=1 prep=10 cook=15 art=food tags=tradycyjne,dodatek,kuchnia-śródziemnomorska
: Grillowane warzywa — receptura z wyraźnym smakiem głównych składników, doprawiona i wykończona tuż przed podaniem.
60 g | cukinia
60 g | bakłażan
50 g | papryka
12 ml | oliwa z oliwek
1 g | oregano
> Umyj i przygotuj warzywa. Pokrój je równo, aby wszystkie kawałki zmiękły w podobnym czasie.
> Rozgrzej tłuszcz z receptury. Podsmaż cebulę lub czosnek, jeśli występują w składnikach, aż zmiękną i zaczną pachnieć.
> Dodaj warzywa i zastosuj metodę odpowiednią dla dania: smaż do zrumienienia, duś pod przykryciem albo piecz do miękkości.
> Dopraw stopniowo. Jeśli używasz sera, ziół lub orzechów, dodaj je pod koniec, aby zachowały aromat i teksturę.
> Podawaj od razu jako samodzielne danie lub dodatek.

# Fasolka szparagowa z migdałami
@ cat=warzywa origin=FR trad servings=1 prep=10 cook=15 art=food tags=tradycyjne,dodatek,kuchnia-francuska
: Fasolka szparagowa z migdałami — receptura z wyraźnym smakiem głównych składników, doprawiona i wykończona tuż przed podaniem.
120 g | fasolka szparagowa
10 g | migdały
10 g | masło
3 g | sól
> Umyj i przygotuj warzywa. Pokrój je równo, aby wszystkie kawałki zmiękły w podobnym czasie.
> Rozgrzej tłuszcz z receptury. Podsmaż cebulę lub czosnek, jeśli występują w składnikach, aż zmiękną i zaczną pachnieć.
> Dodaj warzywa i zastosuj metodę odpowiednią dla dania: smaż do zrumienienia, duś pod przykryciem albo piecz do miękkości.
> Dopraw stopniowo. Jeśli używasz sera, ziół lub orzechów, dodaj je pod koniec, aby zachowały aromat i teksturę.
> Podawaj od razu jako samodzielne danie lub dodatek.

# Colesław
@ cat=warzywa origin=US trad servings=1 prep=10 cook=15 art=food tags=tradycyjne,dodatek,kuchnia-amerykańska
: Colesław — receptura z wyraźnym smakiem głównych składników, doprawiona i wykończona tuż przed podaniem.
80 g | kapusta
30 g | marchew
25 g | majonez
5 ml | ocet
> Umyj i przygotuj warzywa. Pokrój je równo, aby wszystkie kawałki zmiękły w podobnym czasie.
> Rozgrzej tłuszcz z receptury. Podsmaż cebulę lub czosnek, jeśli występują w składnikach, aż zmiękną i zaczną pachnieć.
> Dodaj warzywa i zastosuj metodę odpowiednią dla dania: smaż do zrumienienia, duś pod przykryciem albo piecz do miękkości.
> Dopraw stopniowo. Jeśli używasz sera, ziół lub orzechów, dodaj je pod koniec, aby zachowały aromat i teksturę.
> Podawaj od razu jako samodzielne danie lub dodatek.

# Kanapka klubowa
@ cat=inne origin=US servings=1 prep=6 cook=9 art=food tags=kanapka,śniadanie,kuchnia-amerykańska
: Kanapka klubowa — sycąca kanapka na jedną osobę.
70 g | chleb tostowy
50 g | kurczak
20 g | bekon
15 g | sałata
20 g | pomidor
> Przygotuj składniki i pokrój warzywa oraz pieczywo. Jeśli mięso wymaga obróbki, usmaż je lub podgrzej osobno.
> Podpiecz pieczywo, jeśli pasuje do dania, tak aby było chrupiące z zewnątrz, ale nie wyschło.
> Rozprowadź sos lub smarowidło na pieczywie, a następnie ułóż składniki w kolejności, która utrzyma kanapkę stabilnie.
> Dodaj delikatne liście i świeże składniki na końcu, aby nie zwiędły od gorących elementów.
> Przekrój i podawaj od razu.

# Reuben
@ cat=inne origin=US servings=1 prep=6 cook=9 art=food tags=kanapka,śniadanie,kuchnia-amerykańska
: Reuben — sycąca kanapka na jedną osobę.
70 g | chleb żytni
60 g | pastrami
30 g | kapusta kiszona
20 g | ser szwajcarski
15 g | sos tysiąca wysp
> Przygotuj składniki i pokrój warzywa oraz pieczywo. Jeśli mięso wymaga obróbki, usmaż je lub podgrzej osobno.
> Podpiecz pieczywo, jeśli pasuje do dania, tak aby było chrupiące z zewnątrz, ale nie wyschło.
> Rozprowadź sos lub smarowidło na pieczywie, a następnie ułóż składniki w kolejności, która utrzyma kanapkę stabilnie.
> Dodaj delikatne liście i świeże składniki na końcu, aby nie zwiędły od gorących elementów.
> Przekrój i podawaj od razu.

# Banh mi
@ cat=inne servings=1 prep=6 cook=9 art=food tags=kanapka,śniadanie,kuchnia-azjatycka
: Banh mi — sycąca kanapka na jedną osobę.
80 g | bagietka
60 g | wieprzowina
20 g | marchew
20 g | ogórek
4 g | kolendra
> Przygotuj składniki i pokrój warzywa oraz pieczywo. Jeśli mięso wymaga obróbki, usmaż je lub podgrzej osobno.
> Podpiecz pieczywo, jeśli pasuje do dania, tak aby było chrupiące z zewnątrz, ale nie wyschło.
> Rozprowadź sos lub smarowidło na pieczywie, a następnie ułóż składniki w kolejności, która utrzyma kanapkę stabilnie.
> Dodaj delikatne liście i świeże składniki na końcu, aby nie zwiędły od gorących elementów.
> Przekrój i podawaj od razu.

# Croissant z szynką i serem
@ cat=inne origin=FR servings=1 prep=6 cook=9 art=food tags=kanapka,śniadanie,kuchnia-francuska
: Croissant z szynką i serem — sycąca kanapka na jedną osobę.
1 szt. | croissant
25 g | szynka
20 g | ser
> Przygotuj składniki i pokrój warzywa oraz pieczywo. Jeśli mięso wymaga obróbki, usmaż je lub podgrzej osobno.
> Podpiecz pieczywo, jeśli pasuje do dania, tak aby było chrupiące z zewnątrz, ale nie wyschło.
> Rozprowadź sos lub smarowidło na pieczywie, a następnie ułóż składniki w kolejności, która utrzyma kanapkę stabilnie.
> Dodaj delikatne liście i świeże składniki na końcu, aby nie zwiędły od gorących elementów.
> Przekrój i podawaj od razu.

# Tost francuski
@ cat=inne origin=FR servings=1 prep=6 cook=9 art=food tags=kanapka,śniadanie,kuchnia-francuska
: Tost francuski — sycąca kanapka na jedną osobę.
60 g | chleb brioche
1 szt. | jajko
40 ml | mleko
1 g | cynamon
15 ml | syrop klonowy
> Wymieszaj składniki suche. W osobnej misce połącz jajko, mleko i pozostałe składniki płynne, a następnie połącz obie mieszanki bez nadmiernego mieszania.
> Rozgrzej patelnię lub gofrownicę i lekko natłuść, jeśli wymaga tego urządzenie.
> Nakładaj porcje ciasta i smaż lub piecz do uzyskania złotej powierzchni. Nie dociskaj placków podczas smażenia.
> Obróć placki, gdy brzegi się zetną i pojawią się pęcherzyki, albo piecz gofry do uzyskania chrupkości.
> Podawaj od razu z dodatkami z listy.

# Bagel z łososiem
@ cat=inne origin=US servings=1 prep=6 cook=9 art=food tags=kanapka,śniadanie,kuchnia-amerykańska
: Bagel z łososiem — sycąca kanapka na jedną osobę.
1 szt. | bagel
40 g | łosoś wędzony
25 g | ser śmietankowy
4 g | kapary
> Przygotuj składniki i pokrój warzywa oraz pieczywo. Jeśli mięso wymaga obróbki, usmaż je lub podgrzej osobno.
> Podpiecz pieczywo, jeśli pasuje do dania, tak aby było chrupiące z zewnątrz, ale nie wyschło.
> Rozprowadź sos lub smarowidło na pieczywie, a następnie ułóż składniki w kolejności, która utrzyma kanapkę stabilnie.
> Dodaj delikatne liście i świeże składniki na końcu, aby nie zwiędły od gorących elementów.
> Przekrój i podawaj od razu.

# Krem z pieczarek
@ cat=zupy origin=PL servings=1 prep=14 cook=21 art=soup tags=zupa,krem,kuchnia-polska
: Krem z pieczarek — jedna głęboka miska.
120 g | pieczarki
0,5 szt. | cebula
30 ml | śmietana 18%
10 g | masło
> Warzywa oczyść i pokrój na równe kawałki. Cebulę lub czosnek zeszklij w garnku na tłuszczu z receptury.
> Dodaj główny składnik zupy i krótko podsmaż, aby wydobyć aromat.
> Wlej bulion lub wodę z listy składników. Gotuj łagodnie, aż warzywa będą całkowicie miękkie.
> Zblenduj na gładki krem. Jeśli dodajesz śmietankę lub mleko, wmieszaj je na końcu i już mocno nie gotuj.
> Dopraw, sprawdź konsystencję i podawaj gorące.

# Krem z pomidorów pieczonych
@ cat=zupy origin=IT servings=1 prep=14 cook=21 art=soup tags=zupa,krem,kuchnia-włoska
: Krem z pomidorów pieczonych — jedna głęboka miska.
180 g | pomidor
1 szt. | czosnek
12 ml | oliwa z oliwek
4 g | bazylia
> Warzywa oczyść i pokrój na równe kawałki. Cebulę lub czosnek zeszklij w garnku na tłuszczu z receptury.
> Dodaj główny składnik zupy i krótko podsmaż, aby wydobyć aromat.
> Wlej bulion lub wodę z listy składników. Gotuj łagodnie, aż warzywa będą całkowicie miękkie.
> Zblenduj na gładki krem. Jeśli dodajesz śmietankę lub mleko, wmieszaj je na końcu i już mocno nie gotuj.
> Dopraw, sprawdź konsystencję i podawaj gorące.

# Krem z marchewki i imbiru
@ cat=zupy servings=1 prep=14 cook=21 art=soup tags=zupa,krem
: Krem z marchewki i imbiru — jedna głęboka miska.
160 g | marchew
8 g | imbir
30 ml | śmietana 18%
0,5 szt. | cebula
> Warzywa oczyść i pokrój na równe kawałki. Cebulę lub czosnek zeszklij w garnku na tłuszczu z receptury.
> Dodaj główny składnik zupy i krótko podsmaż, aby wydobyć aromat.
> Wlej bulion lub wodę z listy składników. Gotuj łagodnie, aż warzywa będą całkowicie miękkie.
> Zblenduj na gładki krem. Jeśli dodajesz śmietankę lub mleko, wmieszaj je na końcu i już mocno nie gotuj.
> Dopraw, sprawdź konsystencję i podawaj gorące.

# Zupa tajska z mlekiem kokosowym
@ cat=zupy servings=1 prep=14 cook=21 art=soup tags=zupa,krem,kuchnia-azjatycka
: Zupa tajska z mlekiem kokosowym — jedna głęboka miska.
150 ml | mleko kokosowe
60 g | kurczak
6 g | trawa cytrynowa
0,3 szt. | limonka
> Warzywa i pozostałe składniki oczyść oraz pokrój. Jeśli receptura zawiera mięso lub aromaty, obsmaż je krótko przed dodaniem płynu.
> Dodaj bulion lub wodę oraz twardsze składniki, które potrzebują najdłuższego gotowania.
> Gotuj na łagodnym ogniu, aż składniki będą miękkie. Delikatne warzywa, makaron lub owoce morza dodaj później, by ich nie rozgotować.
> Dopraw pod koniec. Śmietanę, cytrynę lub zioła dodaj stopniowo, próbując smak po każdym dodatku.
> Podawaj gorące, z dodatkami przewidzianymi w recepturze.

# Zupa miso z małżami
@ cat=zupy origin=JP servings=1 prep=14 cook=21 art=soup tags=zupa,krem,kuchnia-japońska
: Zupa miso z małżami — jedna głęboka miska.
18 g | pasta miso
60 g | małże
220 ml | dashi
> Przygotuj dodatki i pokrój je na równe kawałki. Jeśli używasz makaronu, ugotuj go osobno.
> Podgrzej bulion, ale nie doprowadzaj go do gwałtownego wrzenia.
> Rozprowadź pastę miso w niewielkiej ilości gorącego bulionu i wlej z powrotem do garnka. Nie gotuj intensywnie po dodaniu miso.
> Dodaj tofu, glony, warzywa lub owoce morza z receptury i podgrzej do gotowości.
> Podawaj od razu; świeże zioła dodaj na sam koniec.

# Zupa wonton
@ cat=zupy servings=1 prep=14 cook=21 art=soup tags=zupa,krem,kuchnia-azjatycka
: Zupa wonton — jedna głęboka miska.
80 g | wonton
220 ml | bulion
40 g | pak choi
8 ml | sos sojowy
> Warzywa i pozostałe składniki oczyść oraz pokrój. Jeśli receptura zawiera mięso lub aromaty, obsmaż je krótko przed dodaniem płynu.
> Dodaj bulion lub wodę oraz twardsze składniki, które potrzebują najdłuższego gotowania.
> Gotuj na łagodnym ogniu, aż składniki będą miękkie. Delikatne warzywa, makaron lub owoce morza dodaj później, by ich nie rozgotować.
> Dopraw pod koniec. Śmietanę, cytrynę lub zioła dodaj stopniowo, próbując smak po każdym dodatku.
> Podawaj gorące, z dodatkami przewidzianymi w recepturze.

# Zupa ramen miso
@ cat=zupy origin=JP servings=1 prep=14 cook=21 art=soup tags=zupa,krem,kuchnia-japońska
: Zupa ramen miso — jedna głęboka miska.
90 g | makaron ramen
18 g | pasta miso
240 ml | bulion
1 szt. | jajko
> Przygotuj dodatki i pokrój je na równe kawałki. Jeśli używasz makaronu, ugotuj go osobno.
> Podgrzej bulion, ale nie doprowadzaj go do gwałtownego wrzenia.
> Rozprowadź pastę miso w niewielkiej ilości gorącego bulionu i wlej z powrotem do garnka. Nie gotuj intensywnie po dodaniu miso.
> Dodaj tofu, glony, warzywa lub owoce morza z receptury i podgrzej do gotowości.
> Podawaj od razu; świeże zioła dodaj na sam koniec.

# Zupa ramen tonkotsu
@ cat=zupy origin=JP servings=1 prep=14 cook=21 art=soup tags=zupa,krem,kuchnia-japońska
: Zupa ramen tonkotsu — jedna głęboka miska.
90 g | makaron ramen
250 ml | bulion tonkotsu
40 g | chashu
1 szt. | nori
> Przygotuj bulion i dodatki. Mięso pokrój cienko, warzywa oczyść, a jajko lub inne dodatki przygotuj osobno, jeśli wymaga tego receptura.
> Podgrzewaj bulion z aromatami na małym ogniu, aby nabrał smaku. Nie pozwól mu gwałtownie odparować.
> Ugotuj makaron osobno zgodnie z instrukcją i odcedź.
> Ułóż makaron w misce, dodaj dodatki i zalej gorącym bulionem.
> Wykończ ziołami, olejem aromatyzowanym lub przyprawami z listy i podawaj natychmiast.

# Fusilli ze szpinakiem i ricottą
@ cat=pasta origin=IT servings=1 prep=10 cook=15 art=pasta tags=makaron,kuchnia-włoska
: Makaron Fusilli ze szpinakiem i ricottą.
90 g | fusilli
70 g | szpinak
50 g | ricotta
1 szt. | czosnek
0,3 g | gałka muszkatołowa
3 g | sól
> Ugotuj makaron al dente w osolonej wodzie. Zachowaj kubek wody z gotowania.
> Przygotuj składniki sosu: warzywa pokrój równo, a mięso lub owoce morza osusz przed smażeniem.
> Podsmaż składniki wymagające zrumienienia, następnie dodaj pozostałe składniki sosu i krótko podduś.
> Przełóż makaron do sosu i dolej po trochu wody z gotowania, aż całość będzie soczysta, ale nie wodnista.
> Spróbuj, dopraw i podawaj od razu.

# Farfalle ze szpinakiem i ricottą
@ cat=pasta origin=IT servings=1 prep=10 cook=15 art=pasta tags=makaron,kuchnia-włoska
: Makaron Farfalle ze szpinakiem i ricottą.
90 g | farfalle
70 g | szpinak
50 g | ricotta
1 szt. | czosnek
0,3 g | gałka muszkatołowa
3 g | sól
> Ugotuj makaron al dente w osolonej wodzie. Zachowaj kubek wody z gotowania.
> Przygotuj składniki sosu: warzywa pokrój równo, a mięso lub owoce morza osusz przed smażeniem.
> Podsmaż składniki wymagające zrumienienia, następnie dodaj pozostałe składniki sosu i krótko podduś.
> Przełóż makaron do sosu i dolej po trochu wody z gotowania, aż całość będzie soczysta, ale nie wodnista.
> Spróbuj, dopraw i podawaj od razu.

# Rigatoni ze szpinakiem i ricottą
@ cat=pasta origin=IT servings=1 prep=10 cook=15 art=pasta tags=makaron,kuchnia-włoska
: Makaron Rigatoni ze szpinakiem i ricottą.
90 g | rigatoni
70 g | szpinak
50 g | ricotta
1 szt. | czosnek
0,3 g | gałka muszkatołowa
3 g | sól
> Ugotuj makaron al dente w osolonej wodzie. Zachowaj kubek wody z gotowania.
> Przygotuj składniki sosu: warzywa pokrój równo, a mięso lub owoce morza osusz przed smażeniem.
> Podsmaż składniki wymagające zrumienienia, następnie dodaj pozostałe składniki sosu i krótko podduś.
> Przełóż makaron do sosu i dolej po trochu wody z gotowania, aż całość będzie soczysta, ale nie wodnista.
> Spróbuj, dopraw i podawaj od razu.

# Paccheri ze szpinakiem i ricottą
@ cat=pasta origin=IT servings=1 prep=10 cook=15 art=pasta tags=makaron,kuchnia-włoska
: Makaron Paccheri ze szpinakiem i ricottą.
90 g | paccheri
70 g | szpinak
50 g | ricotta
1 szt. | czosnek
0,3 g | gałka muszkatołowa
3 g | sól
> Ugotuj makaron al dente w osolonej wodzie. Zachowaj kubek wody z gotowania.
> Przygotuj składniki sosu: warzywa pokrój równo, a mięso lub owoce morza osusz przed smażeniem.
> Podsmaż składniki wymagające zrumienienia, następnie dodaj pozostałe składniki sosu i krótko podduś.
> Przełóż makaron do sosu i dolej po trochu wody z gotowania, aż całość będzie soczysta, ale nie wodnista.
> Spróbuj, dopraw i podawaj od razu.

# Conchiglie ze szpinakiem i ricottą
@ cat=pasta origin=IT servings=1 prep=10 cook=15 art=pasta tags=makaron,kuchnia-włoska
: Makaron Conchiglie ze szpinakiem i ricottą.
90 g | conchiglie
70 g | szpinak
50 g | ricotta
1 szt. | czosnek
0,3 g | gałka muszkatołowa
3 g | sól
> Ugotuj makaron al dente w osolonej wodzie. Zachowaj kubek wody z gotowania.
> Przygotuj składniki sosu: warzywa pokrój równo, a mięso lub owoce morza osusz przed smażeniem.
> Podsmaż składniki wymagające zrumienienia, następnie dodaj pozostałe składniki sosu i krótko podduś.
> Przełóż makaron do sosu i dolej po trochu wody z gotowania, aż całość będzie soczysta, ale nie wodnista.
> Spróbuj, dopraw i podawaj od razu.

# Gemelli ze szpinakiem i ricottą
@ cat=pasta origin=IT servings=1 prep=10 cook=15 art=pasta tags=makaron,kuchnia-włoska
: Makaron Gemelli ze szpinakiem i ricottą.
90 g | gemelli
70 g | szpinak
50 g | ricotta
1 szt. | czosnek
0,3 g | gałka muszkatołowa
3 g | sól
> Ugotuj makaron al dente w osolonej wodzie. Zachowaj kubek wody z gotowania.
> Przygotuj składniki sosu: warzywa pokrój równo, a mięso lub owoce morza osusz przed smażeniem.
> Podsmaż składniki wymagające zrumienienia, następnie dodaj pozostałe składniki sosu i krótko podduś.
> Przełóż makaron do sosu i dolej po trochu wody z gotowania, aż całość będzie soczysta, ale nie wodnista.
> Spróbuj, dopraw i podawaj od razu.

# Cavatappi ze szpinakiem i ricottą
@ cat=pasta origin=IT servings=1 prep=10 cook=15 art=pasta tags=makaron,kuchnia-włoska
: Makaron Cavatappi ze szpinakiem i ricottą.
90 g | cavatappi
70 g | szpinak
50 g | ricotta
1 szt. | czosnek
0,3 g | gałka muszkatołowa
3 g | sól
> Ugotuj makaron al dente w osolonej wodzie. Zachowaj kubek wody z gotowania.
> Przygotuj składniki sosu: warzywa pokrój równo, a mięso lub owoce morza osusz przed smażeniem.
> Podsmaż składniki wymagające zrumienienia, następnie dodaj pozostałe składniki sosu i krótko podduś.
> Przełóż makaron do sosu i dolej po trochu wody z gotowania, aż całość będzie soczysta, ale nie wodnista.
> Spróbuj, dopraw i podawaj od razu.

# Maccheroni ze szpinakiem i ricottą
@ cat=pasta origin=IT servings=1 prep=10 cook=15 art=pasta tags=makaron,kuchnia-włoska
: Makaron Maccheroni ze szpinakiem i ricottą.
90 g | maccheroni
70 g | szpinak
50 g | ricotta
1 szt. | czosnek
0,3 g | gałka muszkatołowa
3 g | sól
> Ugotuj makaron al dente w osolonej wodzie. Zachowaj kubek wody z gotowania.
> Przygotuj składniki sosu: warzywa pokrój równo, a mięso lub owoce morza osusz przed smażeniem.
> Podsmaż składniki wymagające zrumienienia, następnie dodaj pozostałe składniki sosu i krótko podduś.
> Przełóż makaron do sosu i dolej po trochu wody z gotowania, aż całość będzie soczysta, ale nie wodnista.
> Spróbuj, dopraw i podawaj od razu.

# White Russian
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl
: Koktajl White Russian.
40 ml | wódka
20 ml | likier kawowy
20 ml | śmietanka 30%
> Odmierz wszystkie składniki przed rozpoczęciem przygotowania i schłodź szkło, jeśli napój podaje się na zimno.
> Połącz składniki w shakerze lub szklanicy barmańskiej, zgodnie z charakterem napoju: koktajle z sokiem zwykle wstrząsa się, a klarowne na bazie alkoholu miesza.
> Jeśli używasz shakera, napełnij go lodem i wstrząśnij do mocnego schłodzenia. Klarowne koktajle mieszaj z lodem, aby zachować przejrzystość.
> Przecedź do szkła z lodem lub do schłodzonego kieliszka, zgodnie ze sposobem podania.
> Udekoruj składnikiem z listy i podawaj od razu.

# Tequila Sunrise
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl
: Koktajl Tequila Sunrise.
45 ml | tequila
90 ml | sok pomarańczowy
10 ml | grenadyna
> Odmierz wszystkie składniki przed rozpoczęciem przygotowania i schłodź szkło, jeśli napój podaje się na zimno.
> Połącz składniki w shakerze lub szklanicy barmańskiej, zgodnie z charakterem napoju: koktajle z sokiem zwykle wstrząsa się, a klarowne na bazie alkoholu miesza.
> Jeśli używasz shakera, napełnij go lodem i wstrząśnij do mocnego schłodzenia. Klarowne koktajle mieszaj z lodem, aby zachować przejrzystość.
> Przecedź do szkła z lodem lub do schłodzonego kieliszka, zgodnie ze sposobem podania.
> Udekoruj składnikiem z listy i podawaj od razu.

# Blue Lagoon
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl
: Koktajl Blue Lagoon.
40 ml | wódka
20 ml | blue curaçao
80 ml | lemoniada
> Odmierz wszystkie składniki przed rozpoczęciem przygotowania i schłodź szkło, jeśli napój podaje się na zimno.
> Połącz składniki w shakerze lub szklanicy barmańskiej, zgodnie z charakterem napoju: koktajle z sokiem zwykle wstrząsa się, a klarowne na bazie alkoholu miesza.
> Jeśli używasz shakera, napełnij go lodem i wstrząśnij do mocnego schłodzenia. Klarowne koktajle mieszaj z lodem, aby zachować przejrzystość.
> Przecedź do szkła z lodem lub do schłodzonego kieliszka, zgodnie ze sposobem podania.
> Udekoruj składnikiem z listy i podawaj od razu.

# Sex on the Beach
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl
: Koktajl Sex on the Beach.
40 ml | wódka
20 ml | likier brzoskwiniowy
40 ml | sok pomarańczowy
40 ml | sok żurawinowy
> Odmierz wszystkie składniki przed rozpoczęciem przygotowania i schłodź szkło, jeśli napój podaje się na zimno.
> Połącz składniki w shakerze lub szklanicy barmańskiej, zgodnie z charakterem napoju: koktajle z sokiem zwykle wstrząsa się, a klarowne na bazie alkoholu miesza.
> Jeśli używasz shakera, napełnij go lodem i wstrząśnij do mocnego schłodzenia. Klarowne koktajle mieszaj z lodem, aby zachować przejrzystość.
> Przecedź do szkła z lodem lub do schłodzonego kieliszka, zgodnie ze sposobem podania.
> Udekoruj składnikiem z listy i podawaj od razu.

# Long Island
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl
: Koktajl Long Island.
15 ml | wódka
15 ml | gin
15 ml | rum
15 ml | tequila
15 ml | triple sec
40 ml | cola
> Odmierz wszystkie składniki przed rozpoczęciem przygotowania i schłodź szkło, jeśli napój podaje się na zimno.
> Połącz składniki w shakerze lub szklanicy barmańskiej, zgodnie z charakterem napoju: koktajle z sokiem zwykle wstrząsa się, a klarowne na bazie alkoholu miesza.
> Jeśli używasz shakera, napełnij go lodem i wstrząśnij do mocnego schłodzenia. Klarowne koktajle mieszaj z lodem, aby zachować przejrzystość.
> Przecedź do szkła z lodem lub do schłodzonego kieliszka, zgodnie ze sposobem podania.
> Udekoruj składnikiem z listy i podawaj od razu.

# Cuba Libre
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl
: Koktajl Cuba Libre.
45 ml | rum
120 ml | cola
0,2 szt. | limonka
> Wlej rum i sok z limonki do szklanki z lodem, dopełnij colą i delikatnie zamieszaj.
> Spróbuj i skoryguj proporcje wyłącznie w granicach składników przewidzianych w recepturze.
> Użyj świeżego lodu i schłodzonego szkła, jeśli koktajl podaje się na zimno.
> Dodaj dekorację z owoców lub ziół wymienionych w składnikach.
> Podawaj natychmiast, zanim lód nadmiernie rozcieńczy napój.

# Dark and Stormy
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl
: Koktajl Dark and Stormy.
50 ml | rum ciemny
120 ml | piwo imbirowe
0,2 szt. | limonka
> Odmierz wszystkie składniki przed rozpoczęciem przygotowania i schłodź szkło, jeśli napój podaje się na zimno.
> Połącz składniki w shakerze lub szklanicy barmańskiej, zgodnie z charakterem napoju: koktajle z sokiem zwykle wstrząsa się, a klarowne na bazie alkoholu miesza.
> Jeśli używasz shakera, napełnij go lodem i wstrząśnij do mocnego schłodzenia. Klarowne koktajle mieszaj z lodem, aby zachować przejrzystość.
> Przecedź do szkła z lodem lub do schłodzonego kieliszka, zgodnie ze sposobem podania.
> Udekoruj składnikiem z listy i podawaj od razu.

# Irish Coffee
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl
: Koktajl Irish Coffee.
90 ml | kawa
30 ml | whisky irlandzka
8 g | cukier
20 ml | śmietanka 30%
> Odmierz wszystkie składniki przed rozpoczęciem przygotowania i schłodź szkło, jeśli napój podaje się na zimno.
> Połącz składniki w shakerze lub szklanicy barmańskiej, zgodnie z charakterem napoju: koktajle z sokiem zwykle wstrząsa się, a klarowne na bazie alkoholu miesza.
> Jeśli używasz shakera, napełnij go lodem i wstrząśnij do mocnego schłodzenia. Klarowne koktajle mieszaj z lodem, aby zachować przejrzystość.
> Przecedź do szkła z lodem lub do schłodzonego kieliszka, zgodnie ze sposobem podania.
> Udekoruj składnikiem z listy i podawaj od razu.

# Hot Toddy
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl
: Koktajl Hot Toddy.
40 ml | whisky
120 ml | woda
12 g | miód
0,2 szt. | cytryna
> Odmierz wszystkie składniki przed rozpoczęciem przygotowania i schłodź szkło, jeśli napój podaje się na zimno.
> Połącz składniki w shakerze lub szklanicy barmańskiej, zgodnie z charakterem napoju: koktajle z sokiem zwykle wstrząsa się, a klarowne na bazie alkoholu miesza.
> Jeśli używasz shakera, napełnij go lodem i wstrząśnij do mocnego schłodzenia. Klarowne koktajle mieszaj z lodem, aby zachować przejrzystość.
> Przecedź do szkła z lodem lub do schłodzonego kieliszka, zgodnie ze sposobem podania.
> Udekoruj składnikiem z listy i podawaj od razu.

# Sazerac
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl
: Koktajl Sazerac.
50 ml | whisky żytnia
3 ml | absynt
4 g | cukier
2 ml | bitters Peychaud’s
> Odmierz wszystkie składniki przed rozpoczęciem przygotowania i schłodź szkło, jeśli napój podaje się na zimno.
> Połącz składniki w shakerze lub szklanicy barmańskiej, zgodnie z charakterem napoju: koktajle z sokiem zwykle wstrząsa się, a klarowne na bazie alkoholu miesza.
> Jeśli używasz shakera, napełnij go lodem i wstrząśnij do mocnego schłodzenia. Klarowne koktajle mieszaj z lodem, aby zachować przejrzystość.
> Przecedź do szkła z lodem lub do schłodzonego kieliszka, zgodnie ze sposobem podania.
> Udekoruj składnikiem z listy i podawaj od razu.

# Winegret klasyczny
@ cat=sosy origin=FR servings=1 prep=3 cook=5 art=food tags=sos,dressing,kuchnia-francuska
: Winegret klasyczny — porcja sosu lub dressingu.
20 ml | oliwa z oliwek
8 ml | ocet winny
3 g | musztarda
3 g | sól
> Przygotuj składniki: posiekaj aromaty, odmierz płyny i zetrzyj sery lub przyprawy, jeśli są w recepturze.
> Podgrzej bazę na małym lub średnim ogniu, mieszając, aby składniki równomiernie się połączyły.
> Jeśli sos wymaga redukcji, gotuj łagodnie do uzyskania właściwej konsystencji. Jeśli ma pozostać świeży, nie podgrzewaj go.
> Dopraw stopniowo i próbuj po każdym dodatku. W razie potrzeby przecedź lub zblenduj.
> Podawaj od razu albo ostudź szybko i przechowuj w lodówce.

# Sos winegret malinowy
@ cat=sosy origin=FR servings=1 prep=3 cook=5 art=food tags=sos,dressing,kuchnia-francuska
: Sos winegret malinowy — porcja sosu lub dressingu.
18 ml | oliwa z oliwek
8 ml | ocet malinowy
4 g | miód
> Przygotuj składniki: posiekaj aromaty, odmierz płyny i zetrzyj sery lub przyprawy, jeśli są w recepturze.
> Podgrzej bazę na małym lub średnim ogniu, mieszając, aby składniki równomiernie się połączyły.
> Jeśli sos wymaga redukcji, gotuj łagodnie do uzyskania właściwej konsystencji. Jeśli ma pozostać świeży, nie podgrzewaj go.
> Dopraw stopniowo i próbuj po każdym dodatku. W razie potrzeby przecedź lub zblenduj.
> Podawaj od razu albo ostudź szybko i przechowuj w lodówce.

# Sos tahini
@ cat=sosy servings=1 prep=3 cook=5 art=food tags=sos,dressing,kuchnia-śródziemnomorska
: Sos tahini — porcja sosu lub dressingu.
25 g | tahini
10 ml | sok z cytryny
1 szt. | czosnek
15 ml | woda
> Przygotuj składniki: posiekaj aromaty, odmierz płyny i zetrzyj sery lub przyprawy, jeśli są w recepturze.
> Podgrzej bazę na małym lub średnim ogniu, mieszając, aby składniki równomiernie się połączyły.
> Jeśli sos wymaga redukcji, gotuj łagodnie do uzyskania właściwej konsystencji. Jeśli ma pozostać świeży, nie podgrzewaj go.
> Dopraw stopniowo i próbuj po każdym dodatku. W razie potrzeby przecedź lub zblenduj.
> Podawaj od razu albo ostudź szybko i przechowuj w lodówce.

# Sos czosnkowy jogurtowy
@ cat=sosy origin=PL servings=1 prep=3 cook=5 art=food tags=sos,dressing,kuchnia-polska
: Sos czosnkowy jogurtowy — porcja sosu lub dressingu.
60 g | jogurt
1 szt. | czosnek
3 g | koperek
3 g | sól
> Przygotuj składniki: posiekaj aromaty, odmierz płyny i zetrzyj sery lub przyprawy, jeśli są w recepturze.
> Podgrzej bazę na małym lub średnim ogniu, mieszając, aby składniki równomiernie się połączyły.
> Jeśli sos wymaga redukcji, gotuj łagodnie do uzyskania właściwej konsystencji. Jeśli ma pozostać świeży, nie podgrzewaj go.
> Dopraw stopniowo i próbuj po każdym dodatku. W razie potrzeby przecedź lub zblenduj.
> Podawaj od razu albo ostudź szybko i przechowuj w lodówce.

# Sos sriracha mayo
@ cat=sosy servings=1 prep=3 cook=5 art=food tags=sos,dressing,kuchnia-azjatycka
: Sos sriracha mayo — porcja sosu lub dressingu.
30 g | majonez
8 g | sriracha
4 ml | sok z limonki
> Przygotuj składniki: posiekaj aromaty, odmierz płyny i zetrzyj sery lub przyprawy, jeśli są w recepturze.
> Podgrzej bazę na małym lub średnim ogniu, mieszając, aby składniki równomiernie się połączyły.
> Jeśli sos wymaga redukcji, gotuj łagodnie do uzyskania właściwej konsystencji. Jeśli ma pozostać świeży, nie podgrzewaj go.
> Dopraw stopniowo i próbuj po każdym dodatku. W razie potrzeby przecedź lub zblenduj.
> Podawaj od razu albo ostudź szybko i przechowuj w lodówce.

# Sos sojowo-imbirowy
@ cat=sosy origin=JP servings=1 prep=3 cook=5 art=food tags=sos,dressing,kuchnia-japońska
: Sos na bazie sosu sojowego, imbiru, cukru i oleju sezamowego.
20 ml | sos sojowy
6 g | imbir
4 g | cukier
4 ml | sezamowy olej
> Przygotuj składniki: posiekaj aromaty, odmierz płyny i zetrzyj sery lub przyprawy, jeśli są w recepturze.
> Podgrzej bazę na małym lub średnim ogniu, mieszając, aby składniki równomiernie się połączyły.
> Jeśli sos wymaga redukcji, gotuj łagodnie do uzyskania właściwej konsystencji. Jeśli ma pozostać świeży, nie podgrzewaj go.
> Dopraw stopniowo i próbuj po każdym dodatku. W razie potrzeby przecedź lub zblenduj.
> Podawaj od razu albo ostudź szybko i przechowuj w lodówce.

# Gremolata
@ cat=sosy origin=IT servings=1 prep=3 cook=5 art=food tags=sos,dressing,kuchnia-włoska
: Gremolata — porcja sosu lub dressingu.
4 g | natka pietruszki
3 g | skórka cytrynowa
1 szt. | czosnek
12 ml | oliwa z oliwek
> Przygotuj składniki: posiekaj aromaty, odmierz płyny i zetrzyj sery lub przyprawy, jeśli są w recepturze.
> Podgrzej bazę na małym lub średnim ogniu, mieszając, aby składniki równomiernie się połączyły.
> Jeśli sos wymaga redukcji, gotuj łagodnie do uzyskania właściwej konsystencji. Jeśli ma pozostać świeży, nie podgrzewaj go.
> Dopraw stopniowo i próbuj po każdym dodatku. W razie potrzeby przecedź lub zblenduj.
> Podawaj od razu albo ostudź szybko i przechowuj w lodówce.

# Koktajl owocowy truskawka i banan
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl-owocowy,napój
: Blendowany napój: truskawka i banan.
80 g | truskawka
0,5 szt. | banan
80 g | jogurt
> Owoce umyj, obierz i pokrój na mniejsze kawałki. Jeśli używasz mrożonych owoców, nie musisz ich wcześniej rozmrażać.
> Włóż składniki do blendera, zaczynając od płynu.
> Miksuj do uzyskania gładkiej konsystencji. Jeśli napój jest zbyt gęsty, dodaj trochę płynu z receptury.
> Spróbuj i w razie potrzeby skoryguj słodycz lub kwasowość.
> Podawaj od razu, najlepiej dobrze schłodzony.

# Koktajl owocowy kiwi i szpinak
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl-owocowy,napój
: Blendowany napój: kiwi i szpinak.
60 g | kiwi
30 g | szpinak
0,4 szt. | banan
80 ml | woda
> Owoce umyj, obierz i pokrój na mniejsze kawałki. Jeśli używasz mrożonych owoców, nie musisz ich wcześniej rozmrażać.
> Włóż składniki do blendera, zaczynając od płynu.
> Miksuj do uzyskania gładkiej konsystencji. Jeśli napój jest zbyt gęsty, dodaj trochę płynu z receptury.
> Spróbuj i w razie potrzeby skoryguj słodycz lub kwasowość.
> Podawaj od razu, najlepiej dobrze schłodzony.

# Koktajl owocowy borówka i owies
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl-owocowy,napój
: Blendowany napój: borówka i owies.
70 g | borówki
20 g | płatki owsiane
120 ml | mleko
> Owoce umyj, obierz i pokrój na mniejsze kawałki. Jeśli używasz mrożonych owoców, nie musisz ich wcześniej rozmrażać.
> Włóż składniki do blendera, zaczynając od płynu.
> Miksuj do uzyskania gładkiej konsystencji. Jeśli napój jest zbyt gęsty, dodaj trochę płynu z receptury.
> Spróbuj i w razie potrzeby skoryguj słodycz lub kwasowość.
> Podawaj od razu, najlepiej dobrze schłodzony.

# Koktajl owocowy ananas i mięta
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl-owocowy,napój
: Blendowany napój: ananas i mięta.
90 g | ananas
4 g | mięta
80 ml | woda
> Owoce umyj, obierz i pokrój na mniejsze kawałki. Jeśli używasz mrożonych owoców, nie musisz ich wcześniej rozmrażać.
> Włóż składniki do blendera, zaczynając od płynu.
> Miksuj do uzyskania gładkiej konsystencji. Jeśli napój jest zbyt gęsty, dodaj trochę płynu z receptury.
> Spróbuj i w razie potrzeby skoryguj słodycz lub kwasowość.
> Podawaj od razu, najlepiej dobrze schłodzony.

# Koktajl owocowy kakao i banan
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl-owocowy,napój
: Blendowany napój: kakao i banan.
8 g | kakao
0,6 szt. | banan
140 ml | mleko
> Owoce umyj, obierz i pokrój na mniejsze kawałki. Jeśli używasz mrożonych owoców, nie musisz ich wcześniej rozmrażać.
> Włóż składniki do blendera, zaczynając od płynu.
> Miksuj do uzyskania gładkiej konsystencji. Jeśli napój jest zbyt gęsty, dodaj trochę płynu z receptury.
> Spróbuj i w razie potrzeby skoryguj słodycz lub kwasowość.
> Podawaj od razu, najlepiej dobrze schłodzony.

# Koktajl owocowy marchew i pomarańcza
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl-owocowy,napój
: Blendowany napój: marchew i pomarańcza.
80 g | marchew
1 szt. | pomarańcza
4 g | imbir
> Owoce umyj, obierz i pokrój na mniejsze kawałki. Jeśli używasz mrożonych owoców, nie musisz ich wcześniej rozmrażać.
> Włóż składniki do blendera, zaczynając od płynu.
> Miksuj do uzyskania gładkiej konsystencji. Jeśli napój jest zbyt gęsty, dodaj trochę płynu z receptury.
> Spróbuj i w razie potrzeby skoryguj słodycz lub kwasowość.
> Podawaj od razu, najlepiej dobrze schłodzony.

# Koktajl owocowy malina i jogurt
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl-owocowy,napój
: Blendowany napój: malina i jogurt.
80 g | maliny
100 g | jogurt
8 g | miód
> Owoce umyj, obierz i pokrój na mniejsze kawałki. Jeśli używasz mrożonych owoców, nie musisz ich wcześniej rozmrażać.
> Włóż składniki do blendera, zaczynając od płynu.
> Miksuj do uzyskania gładkiej konsystencji. Jeśli napój jest zbyt gęsty, dodaj trochę płynu z receptury.
> Spróbuj i w razie potrzeby skoryguj słodycz lub kwasowość.
> Podawaj od razu, najlepiej dobrze schłodzony.

# Koktajl owocowy gruszka i cynamon
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl-owocowy,napój
: Blendowany napój: gruszka i cynamon.
90 g | gruszka
1 g | cynamon
100 ml | mleko
> Owoce umyj, obierz i pokrój na mniejsze kawałki. Jeśli używasz mrożonych owoców, nie musisz ich wcześniej rozmrażać.
> Włóż składniki do blendera, zaczynając od płynu.
> Miksuj do uzyskania gładkiej konsystencji. Jeśli napój jest zbyt gęsty, dodaj trochę płynu z receptury.
> Spróbuj i w razie potrzeby skoryguj słodycz lub kwasowość.
> Podawaj od razu, najlepiej dobrze schłodzony.

# Omlet z ziołami
@ cat=inne servings=1 prep=5 cook=7 art=food tags=jajka,śniadanie
: Omlet z ziołami — szybkie śniadanie.
2 szt. | jajko
4 g | szczypiorek
10 g | masło
> Przygotuj składniki. Jajka roztrzep z solą i pieprzem; dodatki pokrój na małe kawałki.
> Rozgrzej patelnię na małym lub średnim ogniu i dodaj masło albo olej z receptury.
> Dodaj dodatki, które wymagają podsmażenia, i przygotuj je do miękkości. Wlej jajka lub masę jajeczną.
> Smaż łagodnie, mieszając albo składając masę zależnie od dania. Zdejmij z ognia, gdy jajka są ścięte, ale nadal wilgotne.
> Podawaj od razu, z pieczywem lub dodatkami przewidzianymi w recepturze.

# Omlet z pieczarkami
@ cat=inne servings=1 prep=5 cook=7 art=food tags=jajka,śniadanie
: Omlet z pieczarkami — szybkie śniadanie.
2 szt. | jajko
50 g | pieczarki
10 g | masło
> Przygotuj składniki. Jajka roztrzep z solą i pieprzem; dodatki pokrój na małe kawałki.
> Rozgrzej patelnię na małym lub średnim ogniu i dodaj masło albo olej z receptury.
> Dodaj dodatki, które wymagają podsmażenia, i przygotuj je do miękkości. Wlej jajka lub masę jajeczną.
> Smaż łagodnie, mieszając albo składając masę zależnie od dania. Zdejmij z ognia, gdy jajka są ścięte, ale nadal wilgotne.
> Podawaj od razu, z pieczywem lub dodatkami przewidzianymi w recepturze.

# Omlet ze szpinakiem
@ cat=inne servings=1 prep=5 cook=7 art=food tags=jajka,śniadanie
: Omlet ze szpinakiem — szybkie śniadanie.
2 szt. | jajko
40 g | szpinak
20 g | feta
> Przygotuj składniki. Jajka roztrzep z solą i pieprzem; dodatki pokrój na małe kawałki.
> Rozgrzej patelnię na małym lub średnim ogniu i dodaj masło albo olej z receptury.
> Dodaj dodatki, które wymagają podsmażenia, i przygotuj je do miękkości. Wlej jajka lub masę jajeczną.
> Smaż łagodnie, mieszając albo składając masę zależnie od dania. Zdejmij z ognia, gdy jajka są ścięte, ale nadal wilgotne.
> Podawaj od razu, z pieczywem lub dodatkami przewidzianymi w recepturze.

# Omlet z serem
@ cat=inne servings=1 prep=5 cook=7 art=food tags=jajka,śniadanie
: Omlet z serem — szybkie śniadanie.
2 szt. | jajko
25 g | ser żółty
10 g | masło
> Przygotuj składniki. Jajka roztrzep z solą i pieprzem; dodatki pokrój na małe kawałki.
> Rozgrzej patelnię na małym lub średnim ogniu i dodaj masło albo olej z receptury.
> Dodaj dodatki, które wymagają podsmażenia, i przygotuj je do miękkości. Wlej jajka lub masę jajeczną.
> Smaż łagodnie, mieszając albo składając masę zależnie od dania. Zdejmij z ognia, gdy jajka są ścięte, ale nadal wilgotne.
> Podawaj od razu, z pieczywem lub dodatkami przewidzianymi w recepturze.

# Jajka sadzone na maśle
@ cat=inne servings=1 prep=5 cook=7 art=food tags=jajka,śniadanie
: Jajka sadzone na maśle — szybkie śniadanie.
2 szt. | jajko
10 g | masło
3 g | sól
> Przygotuj składniki. Jajka roztrzep z solą i pieprzem; dodatki pokrój na małe kawałki.
> Rozgrzej patelnię na małym lub średnim ogniu i dodaj masło albo olej z receptury.
> Dodaj dodatki, które wymagają podsmażenia, i przygotuj je do miękkości. Wlej jajka lub masę jajeczną.
> Smaż łagodnie, mieszając albo składając masę zależnie od dania. Zdejmij z ognia, gdy jajka są ścięte, ale nadal wilgotne.
> Podawaj od razu, z pieczywem lub dodatkami przewidzianymi w recepturze.

# Jajka w koszulce
@ cat=inne servings=1 prep=5 cook=7 art=food tags=jajka,śniadanie
: Jajka w koszulce — szybkie śniadanie.
2 szt. | jajko
5 ml | ocet
3 g | sól
> Przygotuj składniki. Jajka roztrzep z solą i pieprzem; dodatki pokrój na małe kawałki.
> Rozgrzej patelnię na małym lub średnim ogniu i dodaj masło albo olej z receptury.
> Dodaj dodatki, które wymagają podsmażenia, i przygotuj je do miękkości. Wlej jajka lub masę jajeczną.
> Smaż łagodnie, mieszając albo składając masę zależnie od dania. Zdejmij z ognia, gdy jajka są ścięte, ale nadal wilgotne.
> Podawaj od razu, z pieczywem lub dodatkami przewidzianymi w recepturze.

# Frittata z cukinią
@ cat=inne servings=1 prep=5 cook=7 art=food tags=jajka,śniadanie
: Frittata z cukinią — szybkie śniadanie.
2 szt. | jajko
60 g | cukinia
15 g | parmezan
> Przygotuj składniki. Jajka roztrzep z solą i pieprzem; dodatki pokrój na małe kawałki.
> Rozgrzej patelnię na małym lub średnim ogniu i dodaj masło albo olej z receptury.
> Dodaj dodatki, które wymagają podsmażenia, i przygotuj je do miękkości. Wlej jajka lub masę jajeczną.
> Smaż łagodnie, mieszając albo składając masę zależnie od dania. Zdejmij z ognia, gdy jajka są ścięte, ale nadal wilgotne.
> Podawaj od razu, z pieczywem lub dodatkami przewidzianymi w recepturze.

# Frittata z ziemniakami
@ cat=inne servings=1 prep=5 cook=7 art=food tags=jajka,śniadanie
: Frittata z ziemniakami — szybkie śniadanie.
2 szt. | jajko
70 g | ziemniaki
0,5 szt. | cebula
> Przygotuj składniki. Jajka roztrzep z solą i pieprzem; dodatki pokrój na małe kawałki.
> Rozgrzej patelnię na małym lub średnim ogniu i dodaj masło albo olej z receptury.
> Dodaj dodatki, które wymagają podsmażenia, i przygotuj je do miękkości. Wlej jajka lub masę jajeczną.
> Smaż łagodnie, mieszając albo składając masę zależnie od dania. Zdejmij z ognia, gdy jajka są ścięte, ale nadal wilgotne.
> Podawaj od razu, z pieczywem lub dodatkami przewidzianymi w recepturze.
`;
