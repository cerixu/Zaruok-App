/* ==========================================================================
   Żarłok 2.0 — prawdziwe zdjęcia dań.
   Fotografie są wersjonowane lokalnie w repozytorium jako base64/JPEG, dzięki
   czemu działają również offline. Własne zdjęcie użytkownika ma pierwszeństwo;
   gdy zdjęcie nie istnieje albo się nie załaduje, zostaje ilustracja SVG.
   ========================================================================== */

const PHOTO_FILES = Object.freeze({
  pizza: 'food-pizza.jpg.b64',
  carbonara: 'food-carbonara.jpg.b64',
  risotto: 'food-risotto.jpg.b64',
  salmon: 'food-salmon.jpg.b64',
  steak: 'food-steak.jpg.b64',
  dessert: 'food-dessert.jpg.b64',
  salad: 'food-salad.jpg.b64',
  sauce: 'food-sauce.jpg.b64',
  soup: 'food-soup.jpg.b64',
  seafood: 'food-seafood.jpg.b64',
  pierogi: 'food-pierogi.jpg.b64',
  burger: 'food-burger.jpg.b64',
  focaccia: 'food-focaccia.jpg.b64',
  'pasta-tomato': 'food-pasta-tomato.jpg.b64',
  lasagna: 'food-lasagna.jpg.b64',
  'chicken-curry': 'food-chicken-curry.jpg.b64',
  schnitzel: 'food-schnitzel.jpg.b64',
  'soup-tomato': 'food-soup-tomato.jpg.b64',
  'soup-clear': 'food-soup-clear.jpg.b64',
  'soup-pumpkin': 'food-soup-pumpkin.jpg.b64',
  sourdough: 'food-sourdough.jpg.b64',
  baguette: 'food-baguette.jpg.b64',
  cake: 'food-cake.jpg.b64',
  'babka-piaskowa': 'food-babka-piaskowa.jpg.b64',
  'baba-ganoush': 'food-baba-ganoush.jpg.b64',
  cocktail: 'food-cocktail.jpg.b64',
  'asian-noodles': 'food-asian-noodles.jpg.b64',
  'fried-rice': 'food-fried-rice.jpg.b64',
  barszcz: 'food-barszcz.jpg.b64',
  bigos: 'food-bigos.jpg.b64',
  'bbq-ribs': 'food-bbq-ribs.jpg.b64',
  'beef-stew': 'food-beef-stew.jpg.b64',
  brownie: 'food-brownie.jpg.b64',
  'creme-brulee': 'food-creme-brulee.jpg.b64',
  crepes: 'food-crepes.jpg.b64',
  bagel: 'food-bagel.jpg.b64',
  bibimbap: 'food-bibimbap.jpg.b64',
  'curry-chickpea': 'food-curry-chickpea.jpg.b64',
  bruschetta: 'food-bruschetta.jpg.b64',
  aperol: 'food-aperol.jpg.b64',
  'golabki': 'food-golabki.jpg.b64',
  'sernik': 'food-sernik.jpg.b64',
  'aglio-olio': 'food-aglio-olio.jpg.b64',
  'caesar-salad': 'food-caesar-salad.jpg.b64',
  'pizza-diavola': 'food-pizza-diavola.jpg.b64',
  'vegan-burger': 'food-vegan-burger.jpg.b64',
  'risotto-milanese': 'food-risotto-milanese.jpg.b64',
  'pesto-genovese': 'food-pesto-genovese.jpg.b64',
  'tom-yum': 'food-tom-yum.jpg.b64',
  'ramen-tonkotsu': 'food-ramen-tonkotsu.jpg.b64',
  'sushi-maki': 'food-sushi-maki.jpg.b64',
  'pho-bo': 'food-pho-bo.jpg.b64',
});

const CATEGORY_PHOTOS = Object.freeze({
  'cat-pizza': 'pizza',
  'cat-pasta': 'carbonara',
  'cat-mieso': 'steak',
  'cat-ryby': 'salmon',
  'cat-owoce-morza': 'seafood',
  'cat-warzywa': 'salad',
  'cat-desery': 'dessert',
  'cat-pieczywo': 'sourdough',
  'cat-zupy': 'soup-clear',
  'cat-salatki': 'salad',
  'cat-sosy': 'sauce',
});

const normalise = (value) => String(value || '')
  .toLocaleLowerCase('pl')
  .replace(/ł/g, 'l')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, ' ')
  .trim();

const RECIPE_RULES = [
  // Rozszerzone, konkretne dopasowania dla pozostałych przepisów z bazy.
  // Wybieraj zdjęcie po nazwie dania; nie używaj przypadkowego zdjęcia kategorii.
  ['barszcz', /\b(barszcz czerwony|barszcz ukrainski|barszcz wigilijny|uszka do barszczu)\b/],
  ['soup-clear', /\b(zupa ogorkowa|zupa grzybowa|kapusniak|krupnik|zupa koperkowa|flaki wolowe|chlodnik litewski|zupa szczawiowa|grochowka|zupa fasolowa|minestrone|rosol|zurek|zupa cebulowa|zupa miso)\b/],
  ['soup-pumpkin', /\b(krem z dyni|zupa dyniowa|zupa krem z dyni)\b/],
  ['soup-tomato', /\b(zupa pomidorowa|krem pomidorowy|pomidorowa)\b/],
  ['schnitzel', /\b(kotlet mielony|kotlet schabowy|schabowy|wiener schnitzel|schnitzel|kotlet de volaille)\b/],
  ['beef-stew', /\b(pieczen rzymska|zrazy zawijane|karkowka pieczona|pulpety w sosie koperkowym|schab pieczony|gulasz wolowy|boeuf bourguignon|leczo|currywurst|spatzle z serem)\b/],
  ['steak', /\b(tatar wolowy|tatar wolowy klasyczny|stek wolowy|stek z antrykotu|rostbef)\b/],
  ['salmon', /\b(pstrag z maslem i migdalami|losos pieczony|losos z pieca|losos teriyaki|ryba pieczona)\b/],
  ['seafood', /\b(ryba po grecku|karp smazony|moules mariniere|paella z owocami morza|paella|krewetki w czosnku)\b/],
  ['pierogi', /\b(pierogi z jagodami|pierogi leniwe|knedle ze sliwkami|pierogi z serem|pierogi ruskie|pierogi z kapusta i grzybami|pierogi z miesem)\b/],
  ['bigos', /\b(bigos|kapusta zasmazana|lazanki z kapusta)\b/],
  ['golabki', /\b(golabki|cabbage rolls)\b/],
  ['sourdough', /\b(chleb na zakwasie|chleb zytni|chleb wiejski)\b/],
  ['baguette', /\b(drozdzowka z serem|bagietka|bagietki|focaccia|flatbread)\b/],
  ['cake', /\b(makowiec|mazurek kajmakowy|placek drozdzowy ze sliwkami|szarlotka|ciasto marchewkowe|tarta tatin|tarte tatin|drozdzowka)\b/],
  ['babka-piaskowa', /\b(babka piaskowa|babka cytrynowa|babka marmurkowa)\b/],
  ['sernik', /\b(sernik|cheesecake)\b/],
  ['brownie', /\b(brownie|fondant czekoladowy|chocolate lava cake)\b/],
  ['creme-brulee', /\b(creme brulee|krem katalonski)\b/],
  ['dessert', /\b(tiramisu|panna cotta|kisiel zurawinowy|kutia|pierniczki|faworki|paczki|racuchy z jablkami|nalesniki z serem|crepes)\b/],
  ['crepes', /\b(nalesniki|racuchy z jablkami|pancakes|crepes)\b/],
  ['bruschetta', /\b(panzanella|bruschetta|pico de gallo|croque monsieur)\b/],
  ['salad', /\b(salatka grecka|salatka nicejska|salatka cobb|tabbouleh|caprese|burrata|coleslaw)\b/],
  ['caesar-salad', /\b(salatka cezar|caesar salad)\b/],
  ['pizza', /\b(pizza pepperoni|pizza quattro formaggi|calzone|pizza margherita|pizza napoletana)\b/],
  ['pizza-diavola', /\b(pizza diavola|pizza salami pikantne)\b/],
  ['lasagna', /\b(lasagne|lasagna bolognese|parmigiana di melanzane|moussaka|musaka|musaka)\b/],
  ['pasta-tomato', /\b(spaghetti alla puttanesca|spaghetti all amatriciana|ragu alla bolognese|penne all arrabbiata|fettuccine alfredo|makaron z serem po amerykansku)\b/],
  ['aglio-olio', /\b(spaghetti aglio e olio|aglio e olio)\b/],
  ['pesto-genovese', /\b(pesto genovese|pesto alla genovese|gnocchi z maslem szalwiowym|gnocchi)\b/],
  ['risotto-milanese', /\b(risotto alla milanese|risotto milanese)\b/],
  ['asian-noodles', /\b(pad thai|ramen shoyu|makaron azjatycki|makaron z woka)\b/],
  ['ramen-tonkotsu', /\b(ramen shoyu|zupa ramen|ramen tonkotsu)\b/],
  ['tom-yum', /\b(tom yum|zielone curry tajskie|kung pao z kurczakiem)\b/],
  ['sushi-maki', /\b(sushi maki|gyoza)\b/],
  ['pho-bo', /\b(pho bo)\b/],
  ['chicken-curry', /\b(kurczak teriyaki|kurczak tikka masala|butter chicken|shawarma z kurczaka|satay z kurczaka)\b/],
  ['curry-chickpea', /\b(dal z soczewicy|curry warzywne|curry z ciecierzycy|biryani z kurczakiem)\b/],
  ['bibimbap', /\b(bibimbap|burrito bowl)\b/],
  ['fried-rice', /\b(smazony ryz|nasi goreng|fried rice)\b/],
  ['burger', /\b(pulled pork|burger klasyczny|burger wolowy|hamburger wolowy)\b/],
  ['bbq-ribs', /\b(skrzydelka buffalo|zeberka|bbq ribs)\b/],
  ['bagel', /\b(bagel z lososiem|bajgiel z lososiem)\b/],
  ['aperol', /\b(aperol spritz)\b/],
    ['soup-clear', /\b(zupa ogorkowa|zupa grzybowa|kapusniak|krupnik|zupa koperkowa|flaki wolowe|chlodnik litewski|zupa szczawiowa|grochowka|zupa fasolowa|minestrone|rosol|zurek|zupa cebulowa|zupa miso)\b/],
  ['soup-tomato', /\b(zupa pomidorowa|krem pomidorowy|pomidorowa)\b/],
  ['soup-pumpkin', /\b(krem z dyni|zupa dyniowa)\b/],
  ['schnitzel', /\b(kotlet mielony|kotlet schabowy|schabowy|wiener schnitzel|schnitzel|kotlet de volaille)\b/],
  ['beef-stew', /\b(pieczen rzymska|zrazy zawijane|karkowka pieczona|pulpety w sosie koperkowym|schab pieczony|gulasz wolowy|boeuf bourguignon|leczo|currywurst)\b/],
  ['steak', /\b(tatar wolowy|stek wolowy|stek z antrykotu|rostbef|stek z polędwicy|stek z poledwicy)\b/],
  ['salmon', /\b(pstrag z maslem i migdalami|losos pieczony|losos z pieca|losos teriyaki|ryba pieczona)\b/],
  ['seafood', /\b(ryba po grecku|karp smazony|moules mariniere|paella z owocami morza|paella|krewetki w czosnku)\b/],
  ['pierogi', /\b(pierogi z jagodami|pierogi leniwe|knedle ze sliwkami|pierogi z serem|pierogi ruskie|pierogi z kapusta i grzybami|pierogi z miesem)\b/],
  ['bigos', /\b(bigos|kapusta zasmazana|lazanki z kapusta)\b/],
  ['cake', /\b(makowiec|mazurek kajmakowy|placek drozdzowy ze sliwkami|szarlotka|ciasto marchewkowe|tarte tatin|drozdzowka)\b/],
  ['sernik', /\b(sernik|cheesecake)\b/],
  ['brownie', /\b(brownie|fondant czekoladowy|chocolate lava cake)\b/],
  ['creme-brulee', /\b(creme brulee|krem katalonski)\b/],
  ['dessert', /\b(tiramisu|panna cotta|kisiel zurawinowy|kutia|pierniczki|faworki|paczki)\b/],
  ['crepes', /\b(nalesniki|racuchy z jablkami|pancakes|crepes)\b/],
  ['bruschetta', /\b(panzanella|bruschetta|croque monsieur)\b/],
  ['salad', /\b(salatka grecka|salatka nicejska|salatka cobb|tabbouleh|caprese|burrata|coleslaw)\b/],
  ['pizza', /\b(pizza pepperoni|pizza quattro formaggi|calzone|pizza margherita|pizza napoletana)\b/],
  ['lasagna', /\b(lasagne|lasagna bolognese|parmigiana di melanzane|moussaka|musaka)\b/],
  ['pasta-tomato', /\b(spaghetti alla puttanesca|spaghetti all amatriciana|ragu alla bolognese|penne all arrabbiata|fettuccine alfredo|makaron z serem po amerykansku)\b/],
  ['pesto-genovese', /\b(pesto genovese|pesto alla genovese|gnocchi z maslem szalwiowym|gnocchi)\b/],
  ['asian-noodles', /\b(pad thai|ramen shoyu|makaron azjatycki|makaron z woka)\b/],
  ['ramen-tonkotsu', /\b(ramen shoyu|zupa ramen|ramen tonkotsu)\b/],
  ['tom-yum', /\b(tom yum|zielone curry tajskie|kung pao z kurczakiem)\b/],
  ['chicken-curry', /\b(kurczak teriyaki|kurczak tikka masala|butter chicken|shawarma z kurczaka|satay z kurczaka)\b/],
  ['curry-chickpea', /\b(dal z soczewicy|curry warzywne|curry z ciecierzycy|biryani z kurczakiem)\b/],
  ['fried-rice', /\b(smazony ryz|nasi goreng|fried rice)\b/],
  ['burger', /\b(pulled pork|burger klasyczny|burger wolowy|hamburger wolowy|cheeseburger)\b/],
  ['bbq-ribs', /\b(skrzydelka buffalo|zeberka|bbq ribs)\b/],
  ['bagel', /\b(bagel z lososiem|bajgiel z lososiem)\b/],
  ['lasagna', /\b(ragu alla bolognese|lasagne alla bolognese|lasagna bolognese|parmigiana di melanzane|moussaka|musaka)\b/],
  ['pasta-tomato', /\b(spaghetti alla puttanesca|spaghetti all amatriciana|penne all arrabbiata|fettuccine alfredo|pasta alla norma|spaghetti bolognese)\b/],
  ['seafood', /\b(paella|moules mariniere|krewetki|mule w winie|risotto z owocami morza|owoce morza|calamari|kalmary|ceviche)\b/],
  ['chicken-curry', /\b(kurczak teriyaki|kurczak tikka masala|butter chicken|shawarma z kurczaka|satay z kurczaka|kurczak po koreansku|kurczak po koreansku)\b/],
  ['curry-chickpea', /\b(dal z soczewicy|curry warzywne|curry z ciecierzycy|biryani z kurczakiem|chana masala|palak paneer|aloo gobi)\b/],
  ['asian-noodles', /\b(pad thai|ramen shoyu|udon|soba|yakisoba|makaron azjatycki|makaron z woka|lo mein|chow mein)\b/],
  ['sushi-maki', /\b(sushi|maki|nigiri|uramaki|temaki)\b/],
  ['pho-bo', /\b(pho bo|pho ga|bun cha|bun bo hue)\b/],
  ['tom-yum', /\b(tom yum|tom kha|zielone curry tajskie|czerwone curry tajskie|kung pao z kurczakiem)\b/],
  ['bibimbap', /\b(bibimbap|burrito bowl|poke bowl)\b/],
  ['fried-rice', /\b(smazony ryz|nasi goreng|fried rice|ryz smazony)\b/],
  ['burger', /\b(pulled pork|burger klasyczny|burger wolowy|hamburger wolowy|cheeseburger|burger z kurczakiem)\b/],
  ['bbq-ribs', /\b(skrzydelka buffalo|zeberka|bbq ribs|pulled pork)\b/],
  ['salad', /\b(salatka grecka|salatka nicejska|salatka cobb|tabbouleh|caprese|burrata|coleslaw|salatka z kozim serem)\b/],
  ['soup-clear', /\b(zupa ogorkowa|zupa grzybowa|kapusniak|krupnik|zupa koperkowa|flaki wolowe|chlodnik litewski|zupa szczawiowa|grochowka|zupa fasolowa|minestrone|rosol|zurek|zupa cebulowa|zupa miso)\b/],
  ['soup-pumpkin', /\b(krem z dyni|zupa dyniowa|zupa krem z dyni)\b/],
  ['soup-tomato', /\b(zupa pomidorowa|krem pomidorowy|pomidorowa)\b/],
  ['pierogi', /\b(pierogi z jagodami|pierogi leniwe|knedle ze sliwkami|pierogi z serem|pierogi ruskie|pierogi z kapusta i grzybami|pierogi z miesem)\b/],
  ['cake', /\b(makowiec|mazurek kajmakowy|placek drozdzowy ze sliwkami|szarlotka|ciasto marchewkowe|tarte tatin|drozdzowka|paczki|faworki)\b/],
  ['bigos', /\b(bigos staropolski|bigos mysliwski|bigos)\b/],
  ['golabki', /\b(golabki|golabki z kasza|golabki wegetarianskie|cabbage rolls)\b/],
  ['barszcz', /\b(barszcz czerwony|barszcz ukrainski|barszcz wigilijny|barszcz z uszkami|uszka do barszczu)\b/],
  ['soup-clear', /\b(rosol drobiowy|rosol wolowy|krupnik z kasza jeczmienna|zupa ogorkowa|zupa grzybowa|kapusniak|zupa koperkowa|flaki wolowe|chlodnik litewski|zupa szczawiowa|grochowka|zupa fasolowa|zupa cebulowa|minestrone|zurek staropolski|zurek)\b/],
  ['soup-pumpkin', /\b(zupa krem z dyni|krem z dyni|zupa dyniowa)\b/],
  ['soup-tomato', /\b(zupa pomidorowa|zupa pomidorowa z ryzem|krem pomidorowy)\b/],
  ['schnitzel', /\b(kotlet schabowy|kotlet mielony|kotlet de volaille|schabowy|sznycel wiedenski|wiener schnitzel)\b/],
  ['beef-stew', /\b(zrazy zawijane|pieczen rzymska|karkowka pieczona|gulasz wolowy|boeuf bourguignon|pulpety w sosie koperkowym|schab pieczony w sosie wlasnym|leczo)\b/],
  ['steak', /\b(tatar wolowy|stek wolowy|stek z antrykotu|stek z polędwicy|stek z poledwicy|rostbef)\b/],
  ['salmon', /\b(losos pieczony|losos z warzywami|losos z pieca|losos teriyaki|pstrag z maslem i migdalami)\b/],
  ['seafood', /\b(paella z owocami morza|ryba po grecku|karp smazony|krewetki w czosnku|moules mariniere|owoce morza|risotto z owocami morza)\b/],
  ['pierogi', /\b(pierogi ruskie|pierogi z miesem|pierogi z jagodami|pierogi z kapusta i grzybami|pierogi leniwe|knedle ze sliwkami|pierogi z serem)\b/],
  ['baguette', /\b(bagietka|bagietki|chleb czosnkowy|bagietka czosnkowa)\b/],
  ['sourdough', /\b(chleb na zakwasie|chleb zytni|chleb wiejski|chleb razowy)\b/],
  ['cake', /\b(makowiec|mazurek kajmakowy|placek drozdzowy ze sliwkami|ciasto marchewkowe|szarlotka|paczki|faworki|piernik staropolski|drozdzowka z serem)\b/],
  ['sernik', /\b(sernik krakowski|sernik nowojorski|sernik na zimno|sernik z galaretka|sernik)\b/],
  ['brownie', /\b(brownie|fondant czekoladowy|czekoladowe lava cake|chocolate lava cake)\b/],
  ['creme-brulee', /\b(creme brulee|creme brulee|krem katalonski)\b/],
  ['crepes', /\b(nalesniki z serem|nalesniki|racuchy z jablkami|crêpes|crepes|pancakes)\b/],
  ['bruschetta', /\b(bruschetta z pomidorami|bruschetta|panzanella|croque monsieur)\b/],
  ['salad', /\b(salatka grecka|salatka nicejska|salatka cobb|tabbouleh|salatka z kozim serem|caprese)\b/],
  ['caesar-salad', /\b(salatka cezar|salatka cezar z kurczakiem|caesar salad)\b/],
  ['pizza', /\b(pizza quattro formaggi|pizza pepperoni|calzone|pizza margherita|pizza napoletana)\b/],
  ['pizza-diavola', /\b(pizza diavola|pizza salami pikantne)\b/],
  ['lasagna', /\b(lasagne alla bolognese|lasagne bolognese|lasagna bolognese|lasagne|parmigiana di melanzane|moussaka|musaka)\b/],
  ['pasta-tomato', /\b(spaghetti alla puttanesca|spaghetti all amatriciana|penne all arrabbiata|fettuccine alfredo|spaghetti bolognese|pasta alla norma)\b/],
  ['aglio-olio', /\b(spaghetti aglio e olio|aglio e olio)\b/],
  ['pesto-genovese', /\b(pesto genovese|pesto alla genovese|gnocchi z maslem szalwiowym|gnocchi z szalwia)\b/],
  ['risotto-milanese', /\b(risotto alla milanese|risotto milanese)\b/],
  ['asian-noodles', /\b(pad thai|ramen shoyu|udon|soba|yakisoba|lo mein|chow mein|makaron azjatycki)\b/],
  ['ramen-tonkotsu', /\b(ramen tonkotsu|zupa ramen|ramen shoyu)\b/],
  ['tom-yum', /\b(tom yum|tom kha|zielone curry tajskie|czerwone curry tajskie|kung pao z kurczakiem)\b/],
  ['sushi-maki', /\b(sushi maki|sushi z ogorkiem i lososiem|nigiri|uramaki|temaki|sushi)\b/],
  ['pho-bo', /\b(pho bo|pho ga|bun cha|bun bo hue)\b/],
  ['chicken-curry', /\b(kurczak teriyaki|kurczak tikka masala|butter chicken|shawarma z kurczaka|satay z kurczaka|kurczak curry)\b/],
  ['curry-chickpea', /\b(dal z soczewicy|curry warzywne|curry z ciecierzycy|biryani z kurczakiem|chana masala|palak paneer|aloo gobi)\b/],
  ['bibimbap', /\b(bibimbap|burrito bowl|poke bowl)\b/],
  ['fried-rice', /\b(smazony ryz|nasi goreng|fried rice|ryz smazony)\b/],
  ['burger', /\b(burger klasyczny|cheeseburger|burger wolowy|hamburger wolowy|burger z kurczakiem)\b/],
  ['bbq-ribs', /\b(bbq ribs|zeberka w miodzie|zeberka bbq|skrzydelka buffalo)\b/],
  ['bagel', /\b(bagel z lososiem|bajgiel z lososiem)\b/],
  ['cocktail', /\b(mojito|hugo|bloody mary|lemoniada domowa)\b/],
  ['aperol', /\b(aperol spritz)\b/],
  // Najpierw konkretne potrawy i składniki, dopiero później szerokie kategorie.
  ['pizza', /\b(pizza margherita|pizza napoletana|margherita classica|napoletana classica)\b/],
  ['carbonara', /\b(spaghetti carbonara|carbonara tradycyjna|carbonara klasyczna)\b/],
  ['risotto', /\b(risotto ai funghi|risotto z grzybami|risotto funghi)\b/],
  ['baba-ganoush', /\b(baba ganoush|baba ghanoush|mutabal|pasta z baklazana)\b/],
  ['bruschetta', /\b(bruschetta|grzanki z pomidorami)\b/],
  ['babka-piaskowa', /\b(babka piaskowa|babka cytrynowa)\b/],
  ['brownie', /\b(brownie)\b/],
  ['creme-brulee', /\b(creme brulee|krem katalonski)\b/],
  ['crepes', /\b(nalesniki|crepes|crepe)\b/],
  ['bagel', /\b(bagel z lososiem|bajgiel z lososiem)\b/],
  ['bibimbap', /\b(bibimbap)\b/],
  ['curry-chickpea', /\b(curry z ciecierzycy|ciecierzyca curry|chickpea curry)\b/],
  ['fried-rice', /\b(smazony ryz|fried rice|nasi goreng)\b/],
  ['asian-noodles', /\b(pad thai)\b/],
  ['barszcz', /\b(barszcz)\b/],
  ['bigos', /\b(bigos)\b/],
  ['bbq-ribs', /\b(zeberka|bbq ribs)\b/],
  ['beef-stew', /\b(gulasz wolowy|boeuf bourguignon|wolowina duszona)\b/],
  ['salmon', /\b(losos pieczony|salmon fillet|fillet of salmon)\b/],
  ['steak', /\b(stek|steak|antrykot|ribeye|rostbef|t bone)\b/],
  ['dessert', /\b(tiramisu|deser kawowy)\b/],
  ['salad', /\b(burrata|caprese)\b/],
  ['golabki', /\b(golabki|cabbage rolls)\b/],
  ['sernik', /\b(sernik|polish cheesecake)\b/],
  ['aglio-olio', /\b(spaghetti aglio e olio|aglio e olio)\b/],
  ['caesar-salad', /\b(salatka cezar|caesar salad)\b/],
  ['pizza-diavola', /\b(pizza diavola|diavola pizza)\b/],
  ['vegan-burger', /\b(burger weganski z czarnej fasoli|black bean vegan burger|vegan black bean burger)\b/],
  ['risotto-milanese', /\b(risotto alla milanese|risotto milanese)\b/],
  ['pesto-genovese', /\b(pesto genovese|pesto alla genovese|pesto ligure)\b/],
  ['tom-yum', /\b(tom yum z krewetkami|tom yum goong|tom yum)\b/],
  ['ramen-tonkotsu', /\b(zupa ramen tonkotsu|ramen tonkotsu|tonkotsu ramen)\b/],
  ['sushi-maki', /\b(sushi maki z ogorkiem i lososiem|salmon cucumber maki)\b/],
  ['pho-bo', /\b(pho bo)\b/],
  ['aperol', /\baperol spritz\b/],
  // Zdjęcie z miedzianym kubkiem przedstawia Moscow Mule — nie przypisuj go wszystkim drinkom.
  ['cocktail', /\bmoscow mule\b/],
  ['lasagna', /\b(lasagna|lasagne)\b/],
  ['chicken-curry', /\b(tikka masala|butter chicken)\b/],
  ['schnitzel', /\b(kotlet schabowy|schabowy|wiener schnitzel|schnitzel)\b/],
  ['soup-tomato', /\b(zupa pomidorowa|pomidorowa|tomato soup)\b/],
  ['soup-clear', /\b(rosol|bulion drobiowy|chicken broth|chicken stock)\b/],
  ['soup-pumpkin', /\b(krem z dyni|zupa dyniowa|pumpkin soup)\b/],
  ['pasta-tomato', /\b(spaghetti al pomodoro|spaghetti pomodoro|pasta pomodoro|pasta marinara)\b/],
  ['cake', /\b(szarlotka|apple pie)\b/],
  ['baguette', /\b(baguette|bagietka|bagietki)\b/],
  ['sourdough', /\b(chleb na zakwasie|sourdough|chleb zytni)\b/],
  ['soup', /\b(zurek)\b/],
  ['sauce', /\b(sos pomidorowy|passata pomidorowa|sugo al pomodoro|tomato sauce)\b/],
  ['seafood', /\b(spaghetti alle vongole|linguine ai frutti di mare|pasta frutti di mare)\b/],
  ['pierogi', /\b(pierogi ruskie|pierogi z kapusta i grzybami|pierogi z miesem)\b/],
  ['burger', /\b(burger domowy|burger wolowy|hamburger wolowy)\b/],
  ['focaccia', /\b(focaccia)\b/],
];

const photoPromises = new Map();

export function recipePhotoKey(recipe) {
  if (!recipe || recipe.thumb || recipe.photo) return null;
  const name = normalise(recipe.name);
  // Matcha tiramisu ma inny wygląd niż klasyczne tiramisu na zdjęciu.
  if (/\bmatcha tiramisu\b/.test(name)) return null;
  for (const [key, pattern] of RECIPE_RULES) {
    if (pattern.test(name)) return key;
  }
  // Zdjęcia kategorii są tylko dla kafli kategorii, nigdy jako substytut zdjęcia dania.
  // Jeśli nazwa nie pasuje do konkretnego zdjęcia, zachowaj ilustrację SVG receptury.
  return null;
}

function loadPhoto(key) {
  if (!PHOTO_FILES[key]) return Promise.resolve(null);
  if (!photoPromises.has(key)) {
    const url = new URL(PHOTO_FILES[key], import.meta.url);
    photoPromises.set(key, fetch(url.href, { cache: 'force-cache' })
      .then((response) => {
        if (!response.ok) throw new Error('Nie udało się odczytać zdjęcia ' + key);
        return response.text();
      })
      .then((base64) => {
        const data = base64.trim();
        if (!data.startsWith('/9j/') || data.length < 1000) throw new Error('Nieprawidłowe zdjęcie ' + key);
        return 'data:image/jpeg;base64,' + data;
      })
      .catch((error) => {
        photoPromises.delete(key);
        console.warn('[Żarłok 2.0] Zdjęcie niedostępne, używam ilustracji:', key, error);
        return null;
      }));
  }
  return photoPromises.get(key);
}

function attach(img, key) {
  if (!img || !key) return;
  img.dataset.photoRequested = key;
  loadPhoto(key).then((src) => {
    if (!src || !img.isConnected || img.dataset.photoRequested !== key) return;
    img.classList.remove('art');
    img.dataset.photoSource = key;
    img.src = src;
  }).catch(() => {});
}

/** Podmień ilustrację wyłącznie wtedy, gdy nazwa naprawdę pasuje do dania. */
export function attachRecipePhoto(img, recipe) {
  attach(img, recipePhotoKey(recipe));
}

/** Zdjęcie reprezentacyjne dla kafla kategorii (nie dla konkretnej receptury). */
export function attachCategoryPhoto(img, categoryId) {
  attach(img, CATEGORY_PHOTOS[categoryId] || null);
}

/** Przydatne przy wyborze wyróżnionej receptury na ekranie Start. */
export function hasFoodPhoto(recipe) {
  return !!(recipe && (recipe.thumb || recipe.photo || recipePhotoKey(recipe)));
}
