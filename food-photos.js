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
  // Zdjęcie cocktail przedstawia Moscow Mule — nie przypisuj go innym drinkom.
  ['cocktail', /(?:\bmoscow mule\b)|\b(?:cosmopolitan|daiquiri|pina colada|whisky sour|gin tonic|caipirinha|grzaniec|manhattan|mai tai|paloma|french 75|sidecar|penicillin|lemoniada cytrynowa|lemoniada ogorkowa|smoothie jagodowe|smoothie zielone|smoothie mango kokos|herbata matcha latte|herbata imbirowa|kakao na mleku|mors|woda z owocami)\b/],
  // Rozszerzone, konkretne dopasowania dla pozostałych przepisów z bazy.
  // Wybieraj zdjęcie po nazwie dania; nie używaj przypadkowego zdjęcia kategorii.
  ['barszcz', /(?:\b(barszcz czerwony|barszcz ukrainski|barszcz wigilijny|uszka do barszczu)\b)|(?:\b(barszcz czerwony|barszcz ukrainski|barszcz wigilijny|barszcz z uszkami|uszka do barszczu)\b)|(?:\b(barszcz)\b)/],
  ['soup-clear', /(?:(?:\b(zupa ogorkowa|zupa grzybowa|kapusniak|krupnik|zupa koperkowa|flaki wolowe|chlodnik litewski|zupa szczawiowa|grochowka|zupa fasolowa|minestrone|rosol|zurek|zupa cebulowa|zupa miso)\b)|(?:\b(rosol drobiowy|rosol wolowy|krupnik z kasza jeczmienna|zupa ogorkowa|zupa grzybowa|kapusniak|zupa koperkowa|flaki wolowe|chlodnik litewski|zupa szczawiowa|grochowka|zupa fasolowa|zupa cebulowa|minestrone|zurek staropolski|zurek)\b)|(?:\b(bulion warzywny|krem z brokulow|zupa z soczewicy|bouillabaisse|miso shiru|avgolemono|clam chowder|pozole|mulligatawny)\b)|(?:\b(mulligatawny|clam chowder|avgolemono|miso shiru|zupa z soczewicy|gulaszowa zupa)\b)|(?:\b(rosol|bulion drobiowy|chicken broth|chicken stock)\b))|\b(?:bulion warzywny|krem z brokulow|zupa z soczewicy|bouillabaisse|miso shiru|avgolemono|clam chowder|pozole|mulligatawny|zupa gulaszowa)\b/],
  ['soup-pumpkin', /(?:(?:\b(krem z dyni|zupa dyniowa|zupa krem z dyni)\b)|(?:\b(krem z dyni|zupa dyniowa)\b)|(?:\b(zupa krem z dyni|krem z dyni|zupa dyniowa)\b)|(?:\b(krem z dyni|zupa dyniowa|pumpkin soup)\b))|\b(?:krem z brokulow|zupa z soczewicy)\b/],
  ['soup-tomato', /(?:\b(zupa pomidorowa|krem pomidorowy|pomidorowa)\b)|(?:\b(zupa pomidorowa|zupa pomidorowa z ryzem|krem pomidorowy)\b)|(?:\b(zupa pomidorowa|pomidorowa|tomato soup)\b)/],
  ['schnitzel', /(?:\b(kotlet mielony|kotlet schabowy|schabowy|wiener schnitzel|schnitzel|kotlet de volaille)\b)|(?:\b(kotlet schabowy|kotlet mielony|kotlet de volaille|schabowy|sznycel wiedenski|wiener schnitzel)\b)|(?:\b(kotlet schabowy|schabowy|wiener schnitzel|schnitzel)\b)/],
  ['beef-stew', /(?:(?:\b(pieczen rzymska|zrazy zawijane|karkowka pieczona|pulpety w sosie koperkowym|schab pieczony|gulasz wolowy|boeuf bourguignon|leczo|currywurst|spatzle z serem)\b)|(?:\b(pieczen rzymska|zrazy zawijane|karkowka pieczona|pulpety w sosie koperkowym|schab pieczony|gulasz wolowy|boeuf bourguignon|leczo|currywurst)\b)|(?:\b(zrazy zawijane|pieczen rzymska|karkowka pieczona|gulasz wolowy|boeuf bourguignon|pulpety w sosie koperkowym|schab pieczony w sosie wlasnym|leczo)\b)|(?:\b(boeuf stroganow|shepherd s pie|albóndigas|albondigas|mussaka|kofta z jagnięciny|kofta z jagnięciny|gulaszowa zupa)\b)|(?:\b(gulasz wolowy|boeuf bourguignon|wolowina duszona)\b))|\b(?:boeuf stroganow|albóndigas|albondigas|mussaka|kofta z jagnięciny|kofta z jagnieciny|shepherd s pie)\b/],
  ['steak', /(?:\b(tatar wolowy|tatar wolowy klasyczny|stek wolowy|stek z antrykotu|rostbef)\b)|(?:\b(tatar wolowy|stek wolowy|stek z antrykotu|rostbef|stek z polędwicy|stek z poledwicy)\b)|(?:\b(tatar wolowy|stek wolowy|stek z antrykotu|stek z polędwicy|stek z poledwicy|rostbef)\b)|(?:\b(stek|steak|antrykot|ribeye|rostbef|t bone)\b)/],
  ['salmon', /(?:(?:\b(pstrag z maslem i migdalami|losos pieczony|losos z pieca|losos teriyaki|ryba pieczona)\b)|(?:\b(losos pieczony|losos z warzywami|losos z pieca|losos teriyaki|pstrag z maslem i migdalami)\b)|(?:\b(kaczka pieczona z jablkami|kurczak pieczony|watrobka z cebula|saltimbocca alla romana|souvlaki z kurczaka|tagine z kurczakiem i morelami)\b)|(?:\b(losos pieczony|salmon fillet|fillet of salmon)\b))|\b(?:kaczka pieczona z jablkami|kurczak pieczony|watrobka z cebula|saltimbocca alla romana|souvlaki z kurczaka|tagine z kurczakiem i morelami)\b/],
  ['seafood', /(?:(?:\b(ryba po grecku|karp smazony|moules mariniere|paella z owocami morza|paella|krewetki w czosnku)\b)|(?:\b(paella|moules mariniere|krewetki|mule w winie|risotto z owocami morza|owoce morza|calamari|kalmary|ceviche)\b)|(?:\b(paella z owocami morza|ryba po grecku|karp smazony|krewetki w czosnku|moules mariniere|owoce morza|risotto z owocami morza)\b)|(?:\b(sledz w oleju z cebula|sledzie w smietanie|moules marinières|moules mariniere|bouillabaisse)\b)|(?:\b(spaghetti alle vongole|linguine ai frutti di mare|pasta frutti di mare)\b))|\b(?:sledz w oleju z cebula|sledzie w smietanie|moules mariniere|owoce morza|risotto z owocami morza|quiche lorraine)\b/],
  ['pierogi', /(?:(?:\b(pierogi z jagodami|pierogi leniwe|knedle ze sliwkami|pierogi z serem|pierogi ruskie|pierogi z kapusta i grzybami|pierogi z miesem)\b)|(?:\b(pierogi ruskie|pierogi z miesem|pierogi z jagodami|pierogi z kapusta i grzybami|pierogi leniwe|knedle ze sliwkami|pierogi z serem)\b)|(?:\b(kopytka|kluski slaskie|ravioli ricotta e spinaci|uszka z grzybami|ciasto na pierogi)\b)|(?:\b(pierogi ruskie|pierogi z kapusta i grzybami|pierogi z miesem)\b))|\b(?:kopytka|kluski slaskie|uszka z grzybami|ciasto na pierogi)\b/],
  ['bigos', /(?:\b(bigos|kapusta zasmazana|lazanki z kapusta)\b)|(?:\b(bigos staropolski|bigos mysliwski|bigos)\b)|(?:\b(bigos)\b)/],
  ['golabki', /(?:\b(golabki|cabbage rolls)\b)|(?:\b(golabki|golabki z kasza|golabki wegetarianskie|cabbage rolls)\b)/],
  ['sourdough', /(?:\b(chleb na zakwasie|chleb zytni|chleb wiejski)\b)|(?:\b(chleb na zakwasie|chleb zytni|chleb wiejski|chleb razowy)\b)|(?:\b(chleb na zakwasie|sourdough|chleb zytni)\b)/],
  ['baguette', /(?:\b(drozdzowka z serem|bagietka|bagietki|focaccia|flatbread)\b)|(?:\b(bagietka|bagietki|chleb czosnkowy|bagietka czosnkowa)\b)|(?:\b(baguette|bagietka|bagietki)\b)/],
  ['cake', /(?:(?:\b(makowiec|mazurek kajmakowy|placek drozdzowy ze sliwkami|szarlotka|ciasto marchewkowe|tarta tatin|tarte tatin|drozdzowka)\b)|(?:\b(makowiec|mazurek kajmakowy|placek drozdzowy ze sliwkami|szarlotka|ciasto marchewkowe|tarte tatin|drozdzowka)\b)|(?:\b(makowiec|mazurek kajmakowy|placek drozdzowy ze sliwkami|szarlotka|ciasto marchewkowe|tarte tatin|drozdzowka|paczki|faworki)\b)|(?:\b(makowiec|mazurek kajmakowy|placek drozdzowy ze sliwkami|ciasto marchewkowe|szarlotka|paczki|faworki|piernik staropolski|drozdzowka z serem)\b)|(?:\b(muffinki czekoladowe|ciastka owsiane z zurawina|tarta cytrynowa|biszkopt|profiteroles|buleczki cynamonowe|dorayaki|churros|tres leches|baklava|basbousa|gulab jamun|pavlova)\b)|(?:\b(szarlotka|apple pie)\b))|\b(?:muffinki czekoladowe|ciastka owsiane z zurawina|tarta cytrynowa|biszkopt|profiteroles|buleczki cynamonowe|dorayaki|churros|tres leches|baklava|basbousa|gulab jamun|pavlova)\b/],
  ['babka-piaskowa', /(?:\b(babka piaskowa|babka cytrynowa|babka marmurkowa)\b)|(?:\b(babka piaskowa|babka cytrynowa)\b)/],
  ['sernik', /(?:\b(sernik|cheesecake)\b)|(?:\b(sernik krakowski|sernik nowojorski|sernik na zimno|sernik z galaretka|sernik)\b)|(?:\b(sernik|polish cheesecake)\b)/],
  ['brownie', /(?:\b(brownie|fondant czekoladowy|chocolate lava cake)\b)|(?:\b(brownie|fondant czekoladowy|czekoladowe lava cake|chocolate lava cake)\b)|(?:\b(brownie)\b)/],
  ['creme-brulee', /(?:\b(creme brulee|krem katalonski)\b)|(?:\b(creme brulee|creme brulee|krem katalonski)\b)/],
  ['dessert', /(?:(?:\b(tiramisu|panna cotta|kisiel zurawinowy|kutia|pierniczki|faworki|paczki|racuchy z jablkami|nalesniki z serem|crepes)\b)|(?:\b(tiramisu|panna cotta|kisiel zurawinowy|kutia|pierniczki|faworki|paczki)\b)|(?:\b(lody waniliowe domowe|mus czekoladowy|mochi z matcha|kulfi pistacjowe|dorayaki|churros|tres leches|baklava|basbousa|gulab jamun|pavlova)\b)|(?:\b(tiramisu|deser kawowy)\b))|\b(?:lody waniliowe domowe|mus czekoladowy|mochi z matcha|kulfi pistacjowe|dorayaki|churros|tres leches|baklava|basbousa|gulab jamun|pavlova)\b/],
  ['crepes', /(?:(?:\b(nalesniki|racuchy z jablkami|pancakes|crepes)\b)|(?:\b(nalesniki z serem|nalesniki|racuchy z jablkami|crêpes|crepes|pancakes)\b)|(?:\b(nalesniki|racuchy z jablkami|pancakes|crepes|tosty francuskie|gofry brukselskie|placuszki bananowe)\b)|(?:\b(nalesniki|crepes|crepe)\b))|\b(?:owsianka z owocami i orzechami|jajecznica na masle|jajka w koszulkach|tosty francuskie|granola domowa|tost z awokado i jajkiem|smoothie bowl truskawkowy|placuszki bananowe|shakshuka|jajka po benedyktynsku|gofry brukselskie|granola bowl|tost z awokado|tamagoyaki|huevos rancheros|jajecznica po francusku)\b/],
  ['bruschetta', /(?:\b(panzanella|bruschetta|pico de gallo|croque monsieur)\b)|(?:\b(panzanella|bruschetta|croque monsieur)\b)|(?:\b(bruschetta z pomidorami|bruschetta|panzanella|croque monsieur)\b)|(?:\b(bruschetta|grzanki z pomidorami)\b)/],
  ['salad', /(?:(?:\b(salatka grecka|salatka nicejska|salatka cobb|tabbouleh|caprese|burrata|coleslaw)\b)|(?:\b(salatka grecka|salatka nicejska|salatka cobb|tabbouleh|caprese|burrata|coleslaw|salatka z kozim serem)\b)|(?:\b(salatka grecka|salatka nicejska|salatka cobb|tabbouleh|salatka z kozim serem|caprese)\b)|(?:\b(surowka z marchewki i jablka|buraczki zasmazane|ogorki kiszone|fasolka szparagowa z bulka tarta|fattoush|salatka z burakow i koziego sera|buddha bowl|salatka z komosa i granatem)\b)|(?:\b(burrata|caprese)\b))|\b(?:surowka z marchewki i jablka|buraczki zasmazane|ogorki kiszone|fasolka szparagowa z bulka tarta|fattoush|salatka z burakow i koziego sera|buddha bowl|salatka z komosa i granatem|niçoise|salatka nicoise)\b/],
  ['caesar-salad', /(?:\b(salatka cezar|caesar salad)\b)|(?:\b(salatka cezar|salatka cezar z kurczakiem|caesar salad)\b)/],
  ['pizza', /(?:(?:\b(pizza pepperoni|pizza quattro formaggi|calzone|pizza margherita|pizza napoletana)\b)|(?:\b(pizza quattro formaggi|pizza pepperoni|calzone|pizza margherita|pizza napoletana)\b)|(?:\b(pizza marinara|pizza capricciosa|pizza prosciutto e rucola|pizza quattro stagioni|pizza ortolana|pizza tonno e cipolla|pizza boscaiola|pizza frutti di mare|pizza bianca|pizza salsiccia e friarielli|pizza nduja|pizza z trufla|pizza hawajska|pizza bbq kurczak|pizza spinaci e uovo|pizza gorgonzola e pere|pizza pesto i pomidorki|pizza cotto e funghi|pizza zucca e salsiccia)\b)|(?:\b(pizza margherita|pizza napoletana|margherita classica|napoletana classica)\b))|\b(?:pizza marinara|pizza capricciosa|pizza prosciutto e rucola|pizza quattro stagioni|pizza ortolana|pizza tonno e cipolla|pizza boscaiola|pizza frutti di mare|pizza bianca|pizza salsiccia e friarielli|pizza nduja|pizza z trufla|pizza hawajska|pizza bbq kurczak|pizza spinaci e uovo|pizza gorgonzola e pere|pizza pesto i pomidorki|pizza cotto e funghi|pizza zucca e salsiccia)\b/],
  ['pizza-diavola', /(?:\b(pizza diavola|pizza salami pikantne)\b)|(?:\b(pizza diavola|diavola pizza)\b)/],
  ['lasagna', /(?:\b(lasagne|lasagna bolognese|parmigiana di melanzane|moussaka|musaka|musaka)\b)|(?:\b(lasagne|lasagna bolognese|parmigiana di melanzane|moussaka|musaka)\b)|(?:\b(ragu alla bolognese|lasagne alla bolognese|lasagna bolognese|parmigiana di melanzane|moussaka|musaka)\b)|(?:\b(lasagne alla bolognese|lasagne bolognese|lasagna bolognese|lasagne|parmigiana di melanzane|moussaka|musaka)\b)|(?:\b(zapiekanka makaronowa z warzywami|cannelloni ricotta|shepherd s pie)\b)|(?:\b(lasagna|lasagne)\b)/],
  ['pasta-tomato', /(?:(?:\b(spaghetti alla puttanesca|spaghetti all amatriciana|ragu alla bolognese|penne all arrabbiata|fettuccine alfredo|makaron z serem po amerykansku)\b)|(?:\b(spaghetti alla puttanesca|spaghetti all amatriciana|penne all arrabbiata|fettuccine alfredo|pasta alla norma|spaghetti bolognese)\b)|(?:\b(spaghetti alla puttanesca|spaghetti all amatriciana|penne all arrabbiata|fettuccine alfredo|spaghetti bolognese|pasta alla norma)\b)|(?:\b(spaghetti al pomodoro|spaghetti pomodoro|pasta pomodoro|pasta marinara)\b))|\b(?:penne alla vodka|spaghetti puttanesca|tagliatelle al ragu|cannelloni ricotta)\b/],
  ['aglio-olio', /(?:\b(spaghetti aglio e olio|aglio e olio)\b)/],
  ['pesto-genovese', /(?:\b(pesto genovese|pesto alla genovese|gnocchi z maslem szalwiowym|gnocchi)\b)|(?:\b(pesto genovese|pesto alla genovese|gnocchi z maslem szalwiowym|gnocchi z szalwia)\b)|(?:\b(linguine al pesto|trofie al pesto|orecchiette z brokulem)\b)|(?:\b(pesto genovese|pesto alla genovese|pesto ligure)\b)/],
  ['risotto-milanese', /(?:\b(risotto alla milanese|risotto milanese)\b)/],
  ['asian-noodles', /(?:(?:\b(pad thai|ramen shoyu|makaron azjatycki|makaron z woka)\b)|(?:\b(pad thai|ramen shoyu|udon|soba|yakisoba|makaron azjatycki|makaron z woka|lo mein|chow mein)\b)|(?:\b(pad thai|ramen shoyu|udon|soba|yakisoba|lo mein|chow mein|makaron azjatycki)\b)|(?:\b(tagliatelle al ragu|linguine al pesto|bucatini all amatriciana|tonnarelli cacio e pepe|orecchiette z brokulem|penne alla vodka|spaghetti puttanesca|trofie al pesto|cannelloni ricotta|penne all arrabbiata)\b)|(?:\b(kurczak w sosie slodko kwasnym|kurczak kung pao|kurczak z czarnym pieprzem|kurczak po syczuańsku|kurczak po syczuańsku|kurczak z bazylia tajska|kurczak pad see ew|kurczak w sosie orzechowym|wolowina w sosie slodko kwasnym|wolowina kung pao|wolowina z czarnym pieprzem|wolowina po syczuańsku|wolowina z bazylia tajska|wolowina pad see ew|wolowina w sosie orzechowym)\b)|(?:\b(pad thai)\b))|\b(?:tagliatelle al ragu|linguine al pesto|bucatini all amatriciana|tonnarelli cacio e pepe|orecchiette z brokulem|penne alla vodka|spaghetti puttanesca|trofie al pesto|cannelloni ricotta|kurczak pad see ew|wolowina pad see ew|kurczak po syczuańsku|wolowina po syczuańsku)\b/],
  ['ramen-tonkotsu', /(?:\b(ramen shoyu|zupa ramen|ramen tonkotsu)\b)|(?:\b(ramen tonkotsu|zupa ramen|ramen shoyu)\b)|(?:\b(zupa ramen tonkotsu|ramen tonkotsu|tonkotsu ramen)\b)/],
  ['tom-yum', /(?:\b(tom yum|zielone curry tajskie|kung pao z kurczakiem)\b)|(?:\b(tom yum|tom kha|zielone curry tajskie|czerwone curry tajskie|kung pao z kurczakiem)\b)|(?:\b(tom yum z krewetkami|tom yum goong|tom yum)\b)/],
  ['sushi-maki', /(?:\b(sushi maki|gyoza)\b)|(?:\b(sushi|maki|nigiri|uramaki|temaki)\b)|(?:\b(sushi maki|sushi z ogorkiem i lososiem|nigiri|uramaki|temaki|sushi)\b)|(?:\b(sushi maki z ogorkiem i lososiem|salmon cucumber maki)\b)/],
  ['pho-bo', /(?:\b(pho bo)\b)|(?:\b(pho bo|pho ga|bun cha|bun bo hue)\b)/],
  ['chicken-curry', /(?:\b(kurczak teriyaki|kurczak tikka masala|butter chicken|shawarma z kurczaka|satay z kurczaka)\b)|(?:\b(kurczak teriyaki|kurczak tikka masala|butter chicken|shawarma z kurczaka|satay z kurczaka|kurczak po koreansku|kurczak po koreansku)\b)|(?:\b(kurczak teriyaki|kurczak tikka masala|butter chicken|shawarma z kurczaka|satay z kurczaka|kurczak curry)\b)|(?:\b(tikka masala|butter chicken)\b)/],
  ['curry-chickpea', /(?:\b(dal z soczewicy|curry warzywne|curry z ciecierzycy|biryani z kurczakiem)\b)|(?:\b(dal z soczewicy|curry warzywne|curry z ciecierzycy|biryani z kurczakiem|chana masala|palak paneer|aloo gobi)\b)|(?:\b(curry z ciecierzycy|ciecierzyca curry|chickpea curry)\b)/],
  ['bibimbap', /(?:\b(bibimbap|burrito bowl)\b)|(?:\b(bibimbap|burrito bowl|poke bowl)\b)|(?:\b(bibimbap)\b)/],
  ['fried-rice', /(?:\b(smazony ryz|nasi goreng|fried rice)\b)|(?:\b(smazony ryz|nasi goreng|fried rice|ryz smazony)\b)|(?:\b(smazony ryz|fried rice|nasi goreng)\b)/],
  ['burger', /(?:(?:\b(pulled pork|burger klasyczny|burger wolowy|hamburger wolowy)\b)|(?:\b(pulled pork|burger klasyczny|burger wolowy|hamburger wolowy|cheeseburger)\b)|(?:\b(pulled pork|burger klasyczny|burger wolowy|hamburger wolowy|cheeseburger|burger z kurczakiem)\b)|(?:\b(burger klasyczny|cheeseburger|burger wolowy|hamburger wolowy|burger z kurczakiem)\b)|(?:\b(nachos z serem|kanapka club|quesadilla z serem i kurczakiem|tacos al pastor|enchiladas z kurczakiem|wrap z kurczakiem)\b)|(?:\b(burger domowy|burger wolowy|hamburger wolowy)\b))|\b(?:nachos z serem|kanapka club|quesadilla z serem i kurczakiem|tacos al pastor|enchiladas z kurczakiem)\b/],
  ['bbq-ribs', /(?:\b(skrzydelka buffalo|zeberka|bbq ribs)\b)|(?:\b(skrzydelka buffalo|zeberka|bbq ribs|pulled pork)\b)|(?:\b(bbq ribs|zeberka w miodzie|zeberka bbq|skrzydelka buffalo)\b)|(?:\b(zeberka|bbq ribs)\b)/],
  ['bagel', /(?:(?:\b(bagel z lososiem|bajgiel z lososiem)\b)|(?:\b(bajgiel|bagel|onigiri z lososiem)\b))|\b(?:croissant z maslem|ciabatta|precel bawarski|brioche|bajgiel|challah|naan)\b/],
  ['aperol', /(?:\b(aperol spritz)\b)|(?:\baperol spritz\b)/],
  ['sauce', /(?:(?:\b(sos bbq domowy|sos czosnkowy|sos teriyaki|chimichurri|aioli|sos serowy cheddar|beszamel|sos pieczarkowy|salsa roja|satay orzechowy|marynata do kurczaka)\b)|(?:\b(sos pomidorowy|passata pomidorowa|sugo al pomodoro|tomato sauce)\b))|\b(?:sos bbq domowy|sos czosnkowy|sos teriyaki|chimichurri|aioli|sos serowy cheddar|beszamel|sos pieczarkowy|salsa roja|satay orzechowy|marynata do kurczaka|sos carbonara)\b/],
  ['baba-ganoush', /(?:(?:\b(falafel|hummus|baba ganoush|tabbouleh|pita)\b)|(?:\b(baba ganoush|baba ghanoush|mutabal|pasta z baklazana)\b))|\b(?:falafel|hummus|pita|chaczapuri adjarskie|langosz|spanakopita)\b/],
  ['vegan-burger', /(?:(?:\b(kotlety z soczewicy|tofu z warzywami na woku|falafel burger)\b)|(?:\b(burger weganski z czarnej fasoli|black bean vegan burger|vegan black bean burger)\b))|\b(?:kotlety z soczewicy|tofu z warzywami na woku)\b/],
  // Najpierw konkretne potrawy i składniki, dopiero później szerokie kategorie.
  ['carbonara', /\b(spaghetti carbonara|carbonara tradycyjna|carbonara klasyczna)\b/],
  ['risotto', /\b(risotto ai funghi|risotto z grzybami|risotto funghi)\b/],
  // Zdjęcie z miedzianym kubkiem przedstawia Moscow Mule — nie przypisuj go wszystkim drinkom.
  ['soup', /\b(zurek)\b/],
  ['focaccia', /\b(focaccia)\b/],
];

const photoPromises = new Map();

export function recipePhotoKey(recipe) {
  if (!recipe || recipe.thumb || recipe.photo) return null;
  const name = normalise(recipe.name);
  // Te receptury nie mają jeszcze fotografii, która wiernie przedstawia konkretne danie.
  // Nie przypisuj im zdjęć ogólnych (np. owoców morza) tylko dlatego, że pasuje składnik.
  const illustrationOnly = [
    /\bkrewetki kung pao\b/,
    /\bmatcha tiramisu\b/,
    /\bsos carbonara\b/,
    /\bchleb pszenny na drozdzach\b/,
    // Brak zdjęcia wiernie pokazującego te dania — unikaj fotografii innej potrawy.
    /\bkrem z brokulow\b/,
    /\bzupa z soczewicy\b/,
    /\bkurczak teriyaki\b/,
    /\bfettuccine alfredo\b/,
    /\bshepherd s pie\b/,
    /\bcroissant z maslem\b/,
    /\bquiche lorraine\b/,
    /\bonigiri z lososiem\b/,
  ];
  if (illustrationOnly.some((pattern) => pattern.test(name))) return null;
  // Focaccia ma własne zdjęcie; wyprzedza szerszą regułę pieczywa.
  if (/\bfocaccia\b/.test(name)) return 'focaccia';
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
