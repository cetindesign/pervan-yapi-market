/* 1. HERO STAGE SLIDER & TRANSPARENT HEADER OBSERVER */
(function() {
  var stage = document.getElementById("pvStageHero");
  var header = document.getElementById("pvTransparentHeader") || document.querySelector("header");

  if (header) {
    function checkHeaderSolid() {
      var scrollY = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollY > 120) {
        header.classList.add("header--solid");
      } else {
        header.classList.remove("header--solid");
      }
    }
    window.addEventListener("scroll", checkHeaderSolid, { passive: true });
    checkHeaderSolid();
  }

  if (!stage) return;
  var track = document.getElementById("pvStageTrack");
  if (!track) return;

  var slides = stage.querySelectorAll(".pv-stage-slide");
  var prevBtn = document.getElementById("pvStagePrev");
  var nextBtn = document.getElementById("pvStageNext");
  var currentIndex = 0;
  var totalSlides = slides.length;
  var autoPlayTimer = null;

  function syncActiveState(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;
    currentIndex = index;

    slides.forEach(function(slide, idx) {
      slide.classList.toggle("active", idx === index);
    });

    var barWidth = 140 / totalSlides;
    var translateX = index * barWidth;
    stage.querySelectorAll(".pv-stage-progress-bar").forEach(function(bar) {
      bar.style.width = barWidth + "px";
      bar.style.transform = "translateX(" + translateX + "px)";
    });
  }

  function goToSlide(index, smooth) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentIndex = index;

    var slideWidth = track.clientWidth;
    var targetLeft = index * slideWidth;

    track.scrollTo({
      left: targetLeft,
      behavior: smooth !== false ? "smooth" : "auto"
    });

    syncActiveState(index);
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function() {
      stopAutoPlay();
      goToSlide(currentIndex - 1);
      startAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function() {
      stopAutoPlay();
      goToSlide(currentIndex + 1);
      startAutoPlay();
    });
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayTimer = setInterval(function() {
      goToSlide(currentIndex + 1);
    }, 6000);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
  }

  stage.addEventListener("mouseenter", stopAutoPlay);
  stage.addEventListener("mouseleave", startAutoPlay);
  stage.addEventListener("touchstart", stopAutoPlay, { passive: true });

  syncActiveState(0);
  startAutoPlay();
})();

/* 2. ARCHITECTURAL SUBNAV & 5-DEPARTMENT ZERO-SCROLL ENGINE */
(function() {
  var ISONEM_PRODUCTS_DATA = [{"id": "isonem-sb", "name": "ISONEM SB", "badge": "Teras & Çatı", "tag": "Hibrit Membran", "pill_tag": "tag-emerald", "deptId": "isonemWaterproofing", "category": "surme-membran", "thumb": "assets/isonem-official/isonem-sb.png", "desc": "Beton teras ve çatı yalıtımlarında, Islak hacim yalıtımlarında, Beton yol, park ve bahçelerde, Gizli dere, oluk ve saçaklarda.", "meta": ["Yüzeye bağlı sarfiyat", "Fabrika Ambalajı", "Orijinal Kartela"], "coverage": "Min 5 m² / kova, (iki kat uygulama) Min 10 m² / kova, (iki kat uygulama) Min 18 m² / kova, (iki kat uygulama)", "sizes": ["PP Kova", "Toptan Palet"], "specs": {"standard": "Teras & Çatı", "packaging": "Orijinal Ambalaj", "consumption": "Yüzeye bağlı", "coverage": "Min 5 m² / kova, (iki kat uygulama) Min 10 m² / kova, (iki kat uygulama) Min 18 m² / kova, (iki kat uygulama)", "color": "İstenilen tüm renklerde", "logistics": "Balçova Yapı Market & Urla Lojistik Depo Stok"}, "accordions": [{"title": "Teknik Uygulama Bilgisi", "body": "Yüzey temiz, tozsuz ve kuru olmalıdır. Detaylı teknik şartname ve uygulama desteği için Pervan Balçova veya Urla şubemize danışınız."}]}, {"id": "isonem-ms-polia", "name": "ISONEM MS POLIA", "badge": "UV Dayanımlı", "tag": "Saf Poliüretan", "pill_tag": "tag-amber", "deptId": "isonemWaterproofing", "category": "surme-membran", "thumb": "assets/isonem-official/isonem-ms-polia.png", "desc": "Teras ve çatıların su yalıtımında Dış cephelerde Çatılarda, ahşaplarda Eskiden yapılmış bitümlü sorunlu yalıtımların üzerinde Shingle yüzeylerde", "meta": ["Yüzeye bağlı sarfiyat", "Fabrika Ambalajı", "Orijinal Kartela"], "coverage": "5 kg: min. 5 m²/kova (İki kat uygulama) 10 kg: min. 10 m²/kova (İki kat uygulama) 18 kg: min. 18 m²/kova (İki kat uygulama)", "sizes": ["PP Kova", "Toptan Palet"], "specs": {"standard": "UV Dayanımlı", "packaging": "Orijinal Ambalaj", "consumption": "Yüzeye bağlı", "coverage": "5 kg: min. 5 m²/kova (İki kat uygulama) 10 kg: min. 10 m²/kova (İki kat uygulama) 18 kg: min. 18 m²/kova (İki kat uygulama)", "color": "İstenilen tüm renklerde", "logistics": "Balçova Yapı Market & Urla Lojistik Depo Stok"}, "accordions": [{"title": "Teknik Uygulama Bilgisi", "body": "Yüzey temiz, tozsuz ve kuru olmalıdır. Detaylı teknik şartname ve uygulama desteği için Pervan Balçova veya Urla şubemize danışınız."}]}, {"id": "isonem-ms-polymer", "name": "ISONEM MS POLYMER", "badge": "Elastik Kaplama", "tag": "Saf Akrilik Polimer", "pill_tag": "tag-cyan", "deptId": "isonemWaterproofing", "category": "surme-membran", "thumb": "assets/isonem-official/isonem-ms-polymer.png", "desc": "Teras, çatı ve balkonların yalıtımında, Dış cephelerde, Çatılarda, ahşaplarda, Eskiden yapılmış sürme esaslı bitümlü sorunlu yalıtımların üzerinde, Asfalt ve beton zeminlerde.", "meta": ["Yüzeye bağlı sarfiyat", "Fabrika Ambalajı", "Orijinal Kartela"], "coverage": "Detaylı sarfiyat tablosuna bakınız", "sizes": ["PP Kova", "Toptan Palet"], "specs": {"standard": "Elastik Kaplama", "packaging": "Orijinal Ambalaj", "consumption": "Yüzeye bağlı", "coverage": "Detaylı sarfiyat tablosuna bakınız", "color": "İstenilen tüm renklerde", "logistics": "Balçova Yapı Market & Urla Lojistik Depo Stok"}, "accordions": [{"title": "Teknik Uygulama Bilgisi", "body": "Yüzey temiz, tozsuz ve kuru olmalıdır. Detaylı teknik şartname ve uygulama desteği için Pervan Balçova veya Urla şubemize danışınız."}]}, {"id": "isonem-m-36", "name": "ISONEM M 36", "badge": "Anında Priz", "tag": "Şok Su Tıkacı", "pill_tag": "tag-red", "deptId": "isonemWaterproofing", "category": "cimentolu-harclar", "thumb": "assets/isonem-official/isonem-m-36.png", "desc": "​Basınçlı gelen suların durdurulmasında, Çimento esaslı yalıtımların sürülmesinden önce su sızıntılarının kesilmesinde, Yüzeyin kurutulmasında ve çatlaklardan gelen akıntıların önlenmesinde.", "meta": ["Yüzeye bağlı sarfiyat", "Fabrika Ambalajı", "Orijinal Kartela"], "coverage": "5 kg: Min. 2,5 L boşluk/5 kg PP kova, 10 kg: Min. 5 L boşluk/10 kg PP kova, 18 kg: Min. 9 L boşluk/18 kg PP kova", "sizes": ["PP Kova", "Toptan Palet"], "specs": {"standard": "Anında Priz", "packaging": "Orijinal Ambalaj", "consumption": "Yüzeye bağlı", "coverage": "5 kg: Min. 2,5 L boşluk/5 kg PP kova, 10 kg: Min. 5 L boşluk/10 kg PP kova, 18 kg: Min. 9 L boşluk/18 kg PP kova", "color": "İstenilen tüm renklerde", "logistics": "Balçova Yapı Market & Urla Lojistik Depo Stok"}, "accordions": [{"title": "Teknik Uygulama Bilgisi", "body": "Yüzey temiz, tozsuz ve kuru olmalıdır. Detaylı teknik şartname ve uygulama desteği için Pervan Balçova veya Urla şubemize danışınız."}]}, {"id": "isonem-a4", "name": "ISONEM A4", "badge": "Dilatasyon Uyumu", "tag": "Elastik Macun", "pill_tag": "tag-emerald", "deptId": "isonemWaterproofing", "category": "tamir-katki", "thumb": "assets/isonem-official/isonem-a4.png", "desc": "Su bazlı boya ve kaplama öncesi çatlakların doldurulmasında Dilatasyon ve genleşme derzlerinde Baca dibi süzgeç kenarlarında Fuga ve derzlerde Taş, seramik, mermer vs gibi kaplamaların ek yerlerinde, süpürgeliklerde Çatlaklarda veya deliklerin doldurulması ya da onarılmasında Pre...", "meta": ["Yüzeye bağlı sarfiyat", "Fabrika Ambalajı", "Orijinal Kartela"], "coverage": "10x10 mm için 120 m.tül / 18 kg", "sizes": ["PP Kova", "Toptan Palet"], "specs": {"standard": "Dilatasyon Uyumu", "packaging": "Orijinal Ambalaj", "consumption": "Yüzeye bağlı", "coverage": "10x10 mm için 120 m.tül / 18 kg", "color": "İstenilen tüm renklerde", "logistics": "Balçova Yapı Market & Urla Lojistik Depo Stok"}, "accordions": [{"title": "Teknik Uygulama Bilgisi", "body": "Yüzey temiz, tozsuz ve kuru olmalıdır. Detaylı teknik şartname ve uygulama desteği için Pervan Balçova veya Urla şubemize danışınız."}]}, {"id": "isonem-ms-80", "name": "ISONEM MS 80", "badge": "Görünmez Kalkan", "tag": "Siloksan Emprenye", "pill_tag": "tag-cyan", "deptId": "isonemWaterproofing", "category": "seffaf-emprenye", "thumb": "assets/isonem-official/isonem-ms-80.png", "desc": "Teras, çatı ve balkonların yalıtımında, Dış cephelerde, Çatılarda, ahşaplarda, Eskiden yapılmış sürme esaslı bitümlü sorunlu yalıtımların üzerinde, Asfalt ve beton zeminlerde.", "meta": ["Yüzeye bağlı sarfiyat", "Fabrika Ambalajı", "Orijinal Kartela"], "coverage": "17,5 - 35 m² / 3,5 L teneke kutu.", "sizes": ["PP Kova", "Toptan Palet"], "specs": {"standard": "Görünmez Kalkan", "packaging": "Orijinal Ambalaj", "consumption": "Yüzeye bağlı", "coverage": "17,5 - 35 m² / 3,5 L teneke kutu.", "color": "İstenilen tüm renklerde", "logistics": "Balçova Yapı Market & Urla Lojistik Depo Stok"}, "accordions": [{"title": "Teknik Uygulama Bilgisi", "body": "Yüzey temiz, tozsuz ve kuru olmalıdır. Detaylı teknik şartname ve uygulama desteği için Pervan Balçova veya Urla şubemize danışınız."}]}, {"id": "isonem-m-35", "name": "ISONEM M 35", "badge": "Negatif & Pozitif", "tag": "Kristalize Çimento", "pill_tag": "tag-dark", "deptId": "isonemWaterproofing", "category": "cimentolu-harclar", "thumb": "assets/isonem-official/isonem-m-35.png", "desc": "Yatay/düşey zemin ve duvarların içten ya da dıştan su yalıtımında Su deposu, atık su ve diğer su depolarında Deniz suyuna maruz kalan beton yüzeylerde Bodrum kat ve toprak altı temel yalıtımlarında Temel perde duvarlarının içten ya da dıştan yalıtımında Sulama kanalları ve tünel ...", "meta": ["Yüzeye bağlı sarfiyat", "Fabrika Ambalajı", "Orijinal Kartela"], "coverage": "6 - 10 m²/ k", "sizes": ["PP Kova", "Toptan Palet"], "specs": {"standard": "Negatif & Pozitif", "packaging": "Orijinal Ambalaj", "consumption": "Yüzeye bağlı", "coverage": "6 - 10 m²/ k", "color": "İstenilen tüm renklerde", "logistics": "Balçova Yapı Market & Urla Lojistik Depo Stok"}, "accordions": [{"title": "Teknik Uygulama Bilgisi", "body": "Yüzey temiz, tozsuz ve kuru olmalıdır. Detaylı teknik şartname ve uygulama desteği için Pervan Balçova veya Urla şubemize danışınız."}]}, {"id": "isonem-ms-20", "name": "ISONEM MS 20", "badge": "Tuz Kusma Önleyici", "tag": "Anti-Nem Sıvası", "pill_tag": "tag-amber", "deptId": "isonemWaterproofing", "category": "tamir-katki", "thumb": "assets/isonem-official/isonem-ms-20.png", "desc": "Banyo, mutfak, bodrum gibi rutubetli duvarlarda, Toprak ile temas halinde olan duvarlarda, Subasmanlarda ve her türlü boya kabarmalarında.", "meta": ["Yüzeye bağlı sarfiyat", "Fabrika Ambalajı", "Orijinal Kartela"], "coverage": "Min. 1 m² /1 K", "sizes": ["PP Kova", "Toptan Palet"], "specs": {"standard": "Tuz Kusma Önleyici", "packaging": "Orijinal Ambalaj", "consumption": "Yüzeye bağlı", "coverage": "Min. 1 m² /1 K", "color": "İstenilen tüm renklerde", "logistics": "Balçova Yapı Market & Urla Lojistik Depo Stok"}, "accordions": [{"title": "Teknik Uygulama Bilgisi", "body": "Yüzey temiz, tozsuz ve kuru olmalıdır. Detaylı teknik şartname ve uygulama desteği için Pervan Balçova veya Urla şubemize danışınız."}]}, {"id": "isonem-md-28", "name": "ISONEM MD 28", "badge": "Balkon & Havuz", "tag": "2K Tam Elastik", "pill_tag": "tag-emerald", "deptId": "isonemWaterproofing", "category": "cimentolu-harclar", "thumb": "assets/isonem-official/isonem-md-28.png", "desc": "Duvar ve zeminlerin pozitif yalıtımlarında, Beton, sıva ve şap üstü yalıtımlarda, Balkon, teras, yüzme havuzlarında, Islak hacim, duş ve hamam tarzı yerlerde, Dıştan perde duvar yalıtımlarında, Prekast ve prefabrik elemanlarda, çatılarda, İçme suyu depolarında.", "meta": ["Yüzeye bağlı sarfiyat", "Fabrika Ambalajı", "Orijinal Kartela"], "coverage": "10 - 15 m² /1 set", "sizes": ["PP Kova", "Toptan Palet"], "specs": {"standard": "Balkon & Havuz", "packaging": "Orijinal Ambalaj", "consumption": "Yüzeye bağlı", "coverage": "10 - 15 m² /1 set", "color": "İstenilen tüm renklerde", "logistics": "Balçova Yapı Market & Urla Lojistik Depo Stok"}, "accordions": [{"title": "Teknik Uygulama Bilgisi", "body": "Yüzey temiz, tozsuz ve kuru olmalıdır. Detaylı teknik şartname ve uygulama desteği için Pervan Balçova veya Urla şubemize danışınız."}]}, {"id": "isonem-bd", "name": "ISONEM BD", "badge": "Fayans Üstü", "tag": "Kırmadan Yalıtım", "pill_tag": "tag-cyan", "deptId": "isonemWaterproofing", "category": "seffaf-emprenye", "thumb": "assets/isonem-official/isonem-bd.png", "desc": "Her türlü sıva, beton, gaz beton, şap gibi emici yüzeylere uygulanır. Yalnızca mermer, granit, fayans, seramik, cam, metal, plastik gibi emici olmayan yüzeyler ile dik emici yüzeylerde uygulanmaz.", "meta": ["Yüzeye bağlı sarfiyat", "Fabrika Ambalajı", "Orijinal Kartela"], "coverage": "Min. 25 m² /1 bidon.", "sizes": ["PP Kova", "Toptan Palet"], "specs": {"standard": "Fayans Üstü", "packaging": "Orijinal Ambalaj", "consumption": "Yüzeye bağlı", "coverage": "Min. 25 m² /1 bidon.", "color": "İstenilen tüm renklerde", "logistics": "Balçova Yapı Market & Urla Lojistik Depo Stok"}, "accordions": [{"title": "Teknik Uygulama Bilgisi", "body": "Yüzey temiz, tozsuz ve kuru olmalıdır. Detaylı teknik şartname ve uygulama desteği için Pervan Balçova veya Urla şubemize danışınız."}]}, {"id": "isonem-m-03", "name": "ISONEM M 03", "badge": "R4 Mukavemet", "tag": "Pah & Tamir Harcı", "pill_tag": "tag-dark", "deptId": "isonemWaterproofing", "category": "tamir-katki", "thumb": "assets/isonem-official/isonem-m-03.png", "desc": "Su yalıtımı öncesi yüzey tamiratlarında, Beton, sıva ve şap tamiratlarında, Segregasyon ve tij deliklerinin doldurulmasında, Pah yapımında ve tamiratlarda kullanılır.", "meta": ["Yüzeye bağlı sarfiyat", "Fabrika Ambalajı", "Orijinal Kartela"], "coverage": "1 cm kalınlıkta sıva için min. 1 m² /K", "sizes": ["PP Kova", "Toptan Palet"], "specs": {"standard": "R4 Mukavemet", "packaging": "Orijinal Ambalaj", "consumption": "Yüzeye bağlı", "coverage": "1 cm kalınlıkta sıva için min. 1 m² /K", "color": "İstenilen tüm renklerde", "logistics": "Balçova Yapı Market & Urla Lojistik Depo Stok"}, "accordions": [{"title": "Teknik Uygulama Bilgisi", "body": "Yüzey temiz, tozsuz ve kuru olmalıdır. Detaylı teknik şartname ve uygulama desteği için Pervan Balçova veya Urla şubemize danışınız."}]}, {"id": "isonem-d-10-latex", "name": "ISONEM D 10 LATEX", "badge": "Aderans Artırıcı", "tag": "Lateks Harç Katkısı", "pill_tag": "tag-dark", "deptId": "isonemWaterproofing", "category": "tamir-katki", "thumb": "assets/isonem-official/isonem-d-10-latex.png", "desc": "Her türlü çimento harçlarında, Sıvalarda ve şaplarda, Fayans, seramik yapıştırıcılarının harcında, Tamir harçlarında, soğuk derzlerde, Beton tamiratlarında aderans istenen yerlerde, Sıva öncesi serpme uygulamalarında, Sürme yalıtım uygulamalarından önce astar olarak kullanılmasın...", "meta": ["Yüzeye bağlı sarfiyat", "Fabrika Ambalajı", "Orijinal Kartela"], "coverage": "Aderans için min. 25 m² /5 L, harç katkılarında min. 5 m³/5 L, Aderans için min. 50 m² /10 L, harç katkılarında min. 10 m³/10 L, Aderans için min. 100 m² /20 L, harç katkılarında min. 20 m³/20 L", "sizes": ["PP Kova", "Toptan Palet"], "specs": {"standard": "Aderans Artırıcı", "packaging": "Orijinal Ambalaj", "consumption": "Yüzeye bağlı", "coverage": "Aderans için min. 25 m² /5 L, harç katkılarında min. 5 m³/5 L, Aderans için min. 50 m² /10 L, harç katkılarında min. 10 m³/10 L, Aderans için min. 100 m² /20 L, harç katkılarında min. 20 m³/20 L", "color": "İstenilen tüm renklerde", "logistics": "Balçova Yapı Market & Urla Lojistik Depo Stok"}, "accordions": [{"title": "Teknik Uygulama Bilgisi", "body": "Yüzey temiz, tozsuz ve kuru olmalıdır. Detaylı teknik şartname ve uygulama desteği için Pervan Balçova veya Urla şubemize danışınız."}]}, {"id": "isonem-be-89", "name": "ISONEM BE 89", "badge": "Temel & Perde", "tag": "2K Bitüm Kauçuk", "pill_tag": "tag-dark", "deptId": "isonemWaterproofing", "category": "surme-membran", "thumb": "assets/isonem-official/isonem-be-89.png", "desc": "Temel, perde duvar, bodrum dış duvarlarında, Eski ya da yeni teras veya çatılarda üzeri kapatılarak, Eski bitüm yada zift yapılmış yüzeylerin yeniden yalıtımında, Membranların üzerinde veya tamiratlarında, Çatı oluklarında, Beton boru, tuğla, tahta, çinko, gaz beton vb yüzeylerin...", "meta": ["Yüzeye bağlı sarfiyat", "Fabrika Ambalajı", "Orijinal Kartela"], "coverage": "Detaylı sarfiyat tablosuna bakınız", "sizes": ["PP Kova", "Toptan Palet"], "specs": {"standard": "Temel & Perde", "packaging": "Orijinal Ambalaj", "consumption": "Yüzeye bağlı", "coverage": "Detaylı sarfiyat tablosuna bakınız", "color": "İstenilen tüm renklerde", "logistics": "Balçova Yapı Market & Urla Lojistik Depo Stok"}, "accordions": [{"title": "Teknik Uygulama Bilgisi", "body": "Yüzey temiz, tozsuz ve kuru olmalıdır. Detaylı teknik şartname ve uygulama desteği için Pervan Balçova veya Urla şubemize danışınız."}]}, {"id": "isonem-df-9", "name": "ISONEM DF 9", "badge": "Yüksek Elastik", "tag": "Çatlak Köprüleme", "pill_tag": "tag-emerald", "deptId": "isonemWaterproofing", "category": "surme-membran", "thumb": "assets/isonem-official/isonem-df-9.png", "desc": "Islak hacimlerde Banyo-duş-wc Teras ve balkonlarda Mutfak ve benzeri ıslak olan her mekanda içerde ve dışarıda kullanıma elverişlidir", "meta": ["Yüzeye bağlı sarfiyat", "Fabrika Ambalajı", "Orijinal Kartela"], "coverage": "Detaylı sarfiyat tablosuna bakınız", "sizes": ["PP Kova", "Toptan Palet"], "specs": {"standard": "Yüksek Elastik", "packaging": "Orijinal Ambalaj", "consumption": "Yüzeye bağlı", "coverage": "Detaylı sarfiyat tablosuna bakınız", "color": "İstenilen tüm renklerde", "logistics": "Balçova Yapı Market & Urla Lojistik Depo Stok"}, "accordions": [{"title": "Teknik Uygulama Bilgisi", "body": "Yüzey temiz, tozsuz ve kuru olmalıdır. Detaylı teknik şartname ve uygulama desteği için Pervan Balçova veya Urla şubemize danışınız."}]}, {"id": "isonem-l-seffaf-guc", "name": "ISONEM L ŞEFFAF GÜÇ", "badge": "Yüksek Nüfuz", "tag": "Likit Güç", "pill_tag": "tag-cyan", "deptId": "isonemWaterproofing", "category": "seffaf-emprenye", "thumb": "assets/isonem-official/isonem-l-seffaf-guc.png", "desc": "Banyo zeminlerinde, derzlerde, çatlaklarda, pencere kenarlarında, cam, boyalı duvar, sıva, taş duvarlarda, ahşaplarda, shingle ve kiremit çatılar dahil şeffaf su yalıtımı istenen her yüzeyde kullanıma uygundur.", "meta": ["Yüzeye bağlı sarfiyat", "Fabrika Ambalajı", "Orijinal Kartela"], "coverage": "1 L: 5 m² (iki kat uygulama)", "sizes": ["PP Kova", "Toptan Palet"], "specs": {"standard": "Yüksek Nüfuz", "packaging": "Orijinal Ambalaj", "consumption": "Yüzeye bağlı", "coverage": "1 L: 5 m² (iki kat uygulama)", "color": "İstenilen tüm renklerde", "logistics": "Balçova Yapı Market & Urla Lojistik Depo Stok"}, "accordions": [{"title": "Teknik Uygulama Bilgisi", "body": "Yüzey temiz, tozsuz ve kuru olmalıdır. Detaylı teknik şartname ve uygulama desteği için Pervan Balçova veya Urla şubemize danışınız."}]}, {"id": "isonem-liquid-glass", "name": "ISONEM LIQUID GLASS", "badge": "Cam Zırh Kaplama", "tag": "2K Sıvı Cam", "pill_tag": "tag-cyan", "deptId": "isonemFloor", "category": "sivi-cam", "thumb": "assets/isonem-official/isonem-liquid-glass.png", "desc": "Cam, cam tuğla, mozaik, karo mozaikte, Fayans, seramik, mermer, granit, doğal taş, porselen yüzeyler Pres tuğlalarda, Ahşap yüzeylerde, Balkon, teras, banyo, mutfak, taş kaplı dış cephelerde. Seramik, cam mozaik kaplı süs havuzlarında. Emici yüzeylerde tozumayı engellemeye yardım...", "meta": ["Yüzeye bağlı sarfiyat", "Fabrika Ambalajı", "Orijinal Kartela"], "coverage": "10 - 13 m²/2 kg set, 20 - 26 m²/4 kg set", "sizes": ["PP Kova", "Toptan Palet"], "specs": {"standard": "Cam Zırh Kaplama", "packaging": "Orijinal Ambalaj", "consumption": "Yüzeye bağlı", "coverage": "10 - 13 m²/2 kg set, 20 - 26 m²/4 kg set", "color": "İstenilen tüm renklerde", "logistics": "Balçova Yapı Market & Urla Lojistik Depo Stok"}, "accordions": [{"title": "Teknik Uygulama Bilgisi", "body": "Yüzey temiz, tozsuz ve kuru olmalıdır. Detaylı teknik şartname ve uygulama desteği için Pervan Balçova veya Urla şubemize danışınız."}]}, {"id": "isonem-floor-2k", "name": "ISONEM FLOOR 2K", "badge": "Ağır Yaya & Araç", "tag": "Solventsiz Epoksi", "pill_tag": "tag-emerald", "deptId": "isonemFloor", "category": "epoksi-kaplama", "thumb": "assets/isonem-official/isonem-floor-2k.png", "desc": "Endüstriyel tesislerde, fabrikalarda, rafinerilerde ilaç ve gıda üretimi yapılan alanlarda, hastanelerde, okullarda, mağazalarda, depolarda, Asit üretim tesislerinde, kimya fabrikalarında, laboratuvarlarda, otomotiv endüstrisi alanlarda, arıtma tesislerinde, su tanklarında, metal...", "meta": ["Yüzeye bağlı sarfiyat", "Fabrika Ambalajı", "Orijinal Kartela"], "coverage": "Min. 5 m² /5 kg set, Min. 2,5 m² /2,5 kg set", "sizes": ["PP Kova", "Toptan Palet"], "specs": {"standard": "Ağır Yaya & Araç", "packaging": "Orijinal Ambalaj", "consumption": "Yüzeye bağlı", "coverage": "Min. 5 m² /5 kg set, Min. 2,5 m² /2,5 kg set", "color": "İstenilen tüm renklerde", "logistics": "Balçova Yapı Market & Urla Lojistik Depo Stok"}, "accordions": [{"title": "Teknik Uygulama Bilgisi", "body": "Yüzey temiz, tozsuz ve kuru olmalıdır. Detaylı teknik şartname ve uygulama desteği için Pervan Balçova veya Urla şubemize danışınız."}]}, {"id": "isonem-shine-floor", "name": "ISONEM SHINE FLOOR", "badge": "Sedefli Parlak", "tag": "Işıltılı Epoksi", "pill_tag": "tag-purple", "deptId": "isonemFloor", "category": "epoksi-kaplama", "thumb": "assets/isonem-official/isonem-shine-floor.png", "desc": "Üretim ve depolama tesisleri, imalathaneler vb. yerlerde bulunan endüstriyel zeminlerde düzgün yüzeyli kaplama olarak, havuz kenarları, turistik tesisler, sahil şeridi, yürüme yolları, meydanlar, kaldırımlar, parklar ve bahçelerde, ıslak çalışma alanları (gıda ve içecek sanayi vb...", "meta": ["Yüzeye bağlı sarfiyat", "Fabrika Ambalajı", "Orijinal Kartela"], "coverage": "3,75 - 4,5 m²/2,25 kg set (iki kat uygulama) 7,5 - 9 m²/4,5 kg set (iki kat uygulama)", "sizes": ["PP Kova", "Toptan Palet"], "specs": {"standard": "Sedefli Parlak", "packaging": "Orijinal Ambalaj", "consumption": "Yüzeye bağlı", "coverage": "3,75 - 4,5 m²/2,25 kg set (iki kat uygulama) 7,5 - 9 m²/4,5 kg set (iki kat uygulama)", "color": "İstenilen tüm renklerde", "logistics": "Balçova Yapı Market & Urla Lojistik Depo Stok"}, "accordions": [{"title": "Teknik Uygulama Bilgisi", "body": "Yüzey temiz, tozsuz ve kuru olmalıdır. Detaylı teknik şartname ve uygulama desteği için Pervan Balçova veya Urla şubemize danışınız."}]}, {"id": "isonem-liquid-marble", "name": "ISONEM LIQUID MARBLE", "badge": "Dekoratif Epoksi", "tag": "3D Sıvı Mermer", "pill_tag": "tag-purple", "deptId": "isonemFloor", "category": "sivi-cam", "thumb": "assets/isonem-official/isonem-liquid-marble.png", "desc": "Showroomlarda, ofislerde, evlerde, avm ortak alanlarda, mağazalarda Her türlü seramik, beton, mermer, mozaik, çelik yüzeylere, Laboratuvarlar, gıda, kimya ve ilaç endüstrisinde SADECE İÇ MEKANLARDA KULLANIMA UYGUNDUR.", "meta": ["Yüzeye bağlı sarfiyat", "Fabrika Ambalajı", "Orijinal Kartela"], "coverage": "5 - 8 m² / 5 kg set 2,5 - 4 m² / 2,5 kg set 1,5 - 2 m² / 1 kg set 0,5 - 1 m² / 0,5 kg set", "sizes": ["PP Kova", "Toptan Palet"], "specs": {"standard": "Dekoratif Epoksi", "packaging": "Orijinal Ambalaj", "consumption": "Yüzeye bağlı", "coverage": "5 - 8 m² / 5 kg set 2,5 - 4 m² / 2,5 kg set 1,5 - 2 m² / 1 kg set 0,5 - 1 m² / 0,5 kg set", "color": "İstenilen tüm renklerde", "logistics": "Balçova Yapı Market & Urla Lojistik Depo Stok"}, "accordions": [{"title": "Teknik Uygulama Bilgisi", "body": "Yüzey temiz, tozsuz ve kuru olmalıdır. Detaylı teknik şartname ve uygulama desteği için Pervan Balçova veya Urla şubemize danışınız."}]}, {"id": "isonem-ss-soil-hardener", "name": "ISONEM SS SOIL HARDENER", "badge": "Beton Sertleştirici", "tag": "Tozumazlık Ajanı", "pill_tag": "tag-dark", "deptId": "isonemFloor", "category": "sertlestirici-yol", "thumb": "assets/isonem-official/isonem-ss-soil-hardener.png", "desc": "Üzerinde kaplama olmayan toprak yollar Arazi iyileştirme Şantiye alanları ve yolları, şantiye park alanları Ağır taşıt yolları Yol temeli ve alt temeller, otoyol banketleri Depo ve stok yığınları Enerji santralleri, ­ev ve banketler Helikopter test pistleri, orman yolları Havaala...", "meta": ["Yüzeye bağlı sarfiyat", "Fabrika Ambalajı", "Orijinal Kartela"], "coverage": "Detaylı sarfiyat tablosuna bakınız", "sizes": ["PP Kova", "Toptan Palet"], "specs": {"standard": "Beton Sertleştirici", "packaging": "Orijinal Ambalaj", "consumption": "Yüzeye bağlı", "coverage": "Detaylı sarfiyat tablosuna bakınız", "color": "İstenilen tüm renklerde", "logistics": "Balçova Yapı Market & Urla Lojistik Depo Stok"}, "accordions": [{"title": "Teknik Uygulama Bilgisi", "body": "Yüzey temiz, tozsuz ve kuru olmalıdır. Detaylı teknik şartname ve uygulama desteği için Pervan Balçova veya Urla şubemize danışınız."}]}, {"id": "isonem-street-paint", "name": "ISONEM STREET PAINT", "badge": "Aşınma Dirençli", "tag": "Yol Çizgi Boyası", "pill_tag": "tag-amber", "deptId": "isonemFloor", "category": "sertlestirici-yol", "thumb": "assets/isonem-official/isonem-street-paint.png", "desc": "Garajlar ve hafif trafiğe maruz park alanlarında, Yürüme yollarında, bahçe zeminlerinde, Beton veya asfalt yollarda, otopark zeminlerinde, Tenis kortları, basketbol, voleybol saha zeminlerinde, Oyun ve eğlence alanlarında.", "meta": ["Yüzeye bağlı sarfiyat", "Fabrika Ambalajı", "Orijinal Kartela"], "coverage": "5 kg: 5 m²/kova (2 kat uygulama), 10 kg: 10 m²/kova (2 kat uygulama), 18 kg: 18 m²/kova (2 kat uygulama)", "sizes": ["PP Kova", "Toptan Palet"], "specs": {"standard": "Aşınma Dirençli", "packaging": "Orijinal Ambalaj", "consumption": "Yüzeye bağlı", "coverage": "5 kg: 5 m²/kova (2 kat uygulama), 10 kg: 10 m²/kova (2 kat uygulama), 18 kg: 18 m²/kova (2 kat uygulama)", "color": "İstenilen tüm renklerde", "logistics": "Balçova Yapı Market & Urla Lojistik Depo Stok"}, "accordions": [{"title": "Teknik Uygulama Bilgisi", "body": "Yüzey temiz, tozsuz ve kuru olmalıdır. Detaylı teknik şartname ve uygulama desteği için Pervan Balçova veya Urla şubemize danışınız."}]}, {"id": "isonem-jelbeton", "name": "ISONEM JELBETON", "badge": "Mikro Zemin", "tag": "Jel Beton", "pill_tag": "tag-dark", "deptId": "isonemFloor", "category": "sertlestirici-yol", "thumb": "assets/isonem-official/isonem-jelbeton.jpg", "desc": "· Orta ve yoğun yaya trafiğine maruz zeminlerde kullanılır. · İç ve dış mekânların 1 ile 10 mm arası bozuk zeminlerinde kendiliğinden yayılmalı kaplama olarak kullanılır. · Beton, seramik, mermer ,eski ve yeni zemin yüzeylere uygulama yapılabilir .", "meta": ["Yüzeye bağlı sarfiyat", "Fabrika Ambalajı", "Orijinal Kartela"], "coverage": "Min 5-10 m²/1 k", "sizes": ["PP Kova", "Toptan Palet"], "specs": {"standard": "Mikro Zemin", "packaging": "Orijinal Ambalaj", "consumption": "Yüzeye bağlı", "coverage": "Min 5-10 m²/1 k", "color": "İstenilen tüm renklerde", "logistics": "Balçova Yapı Market & Urla Lojistik Depo Stok"}, "accordions": [{"title": "Teknik Uygulama Bilgisi", "body": "Yüzey temiz, tozsuz ve kuru olmalıdır. Detaylı teknik şartname ve uygulama desteği için Pervan Balçova veya Urla şubemize danışınız."}]}, {"id": "isonem-be-99", "name": "ISONEM BE 99", "badge": "Çatlak Köprüleyen", "tag": "Elastomerik Dış Cephe", "pill_tag": "tag-emerald", "deptId": "isonemSpecial", "category": "rutubet-discephe", "thumb": "assets/isonem-official/isonem-be-99.png", "desc": "Her türlü sıva ve boyalı dış yüzeylere, Mineral sıva, hazır sıva vb. eski kaplamaların üzerine, Dış cephelere, ahşap vb. yüzeylere, Mantolama yapılan binalarda, Brüt beton ya da prefabrik yapıların boyanmasında.", "meta": ["Yüzeye bağlı sarfiyat", "Fabrika Ambalajı", "Orijinal Kartela"], "coverage": "5 kg: 5 - 6 m²/kova 10 kg: 10 - 12 m²/kova 18 kg: 18 - 22 m²/kova", "sizes": ["PP Kova", "Toptan Palet"], "specs": {"standard": "Çatlak Köprüleyen", "packaging": "Orijinal Ambalaj", "consumption": "Yüzeye bağlı", "coverage": "5 kg: 5 - 6 m²/kova 10 kg: 10 - 12 m²/kova 18 kg: 18 - 22 m²/kova", "color": "İstenilen tüm renklerde", "logistics": "Balçova Yapı Market & Urla Lojistik Depo Stok"}, "accordions": [{"title": "Teknik Uygulama Bilgisi", "body": "Yüzey temiz, tozsuz ve kuru olmalıdır. Detaylı teknik şartname ve uygulama desteği için Pervan Balçova veya Urla şubemize danışınız."}]}, {"id": "isonem-anti-sound-paint", "name": "ISONEM ANTI SOUND PAINT", "badge": "Ses Yutucu", "tag": "Akustik Ses Boyası", "pill_tag": "tag-cyan", "deptId": "isonemThermal", "category": "ses-yangin", "thumb": "assets/isonem-official/isonem-anti-sound-paint.png", "desc": "Apartmanlarda, hastane ve otellerde, okullarda, kreşlerde, Motor ve Makine dairelerinde, Eğlence mekanlarında, sinema ve tiyatro salonlarında, Araç ve yatlarda, askeri tesislerde, atış poligonlarında.", "meta": ["Yüzeye bağlı sarfiyat", "Fabrika Ambalajı", "Orijinal Kartela"], "coverage": "5 L: 2,5 - 5 m²/kova, 10 L: 5 - 10 m²/kova, 18 L: 9 - 18 m²/kova", "sizes": ["PP Kova", "Toptan Palet"], "specs": {"standard": "Ses Yutucu", "packaging": "Orijinal Ambalaj", "consumption": "Yüzeye bağlı", "coverage": "5 L: 2,5 - 5 m²/kova, 10 L: 5 - 10 m²/kova, 18 L: 9 - 18 m²/kova", "color": "İstenilen tüm renklerde", "logistics": "Balçova Yapı Market & Urla Lojistik Depo Stok"}, "accordions": [{"title": "Teknik Uygulama Bilgisi", "body": "Yüzey temiz, tozsuz ve kuru olmalıdır. Detaylı teknik şartname ve uygulama desteği için Pervan Balçova veya Urla şubemize danışınız."}]}, {"id": "isonem-anti-rust-primer", "name": "ISONEM ANTI RUST PRIMER", "badge": "Antikorozif Zırh", "tag": "Pas Önleyici Astar", "pill_tag": "tag-dark", "deptId": "isonemSpecial", "category": "astarlar", "thumb": "assets/isonem-official/isonem-anti-rust-primer.png", "desc": "Korozyon direnci istenen tüm metal yüzeylerde antikorozif astar olarak kullanıma uygundur. Ayrıca beton yapıların korozyondan korunması için de kullanılır. Çelik Yapılar için ISONEM ANTI FIRE PAINT PLUS 120 dk Yangına Dayanıklı Boya öncesi astar olarak kullanılır.", "meta": ["Yüzeye bağlı sarfiyat", "Fabrika Ambalajı", "Orijinal Kartela"], "coverage": "15 - 20 m²/set", "sizes": ["PP Kova", "Toptan Palet"], "specs": {"standard": "Antikorozif Zırh", "packaging": "Orijinal Ambalaj", "consumption": "Yüzeye bağlı", "coverage": "15 - 20 m²/set", "color": "İstenilen tüm renklerde", "logistics": "Balçova Yapı Market & Urla Lojistik Depo Stok"}, "accordions": [{"title": "Teknik Uygulama Bilgisi", "body": "Yüzey temiz, tozsuz ve kuru olmalıdır. Detaylı teknik şartname ve uygulama desteği için Pervan Balçova veya Urla şubemize danışınız."}]}, {"id": "isonem-ep-primer", "name": "ISONEM EP PRIMER", "badge": "Yüksek Tutunma", "tag": "2K Epoksi Astar", "pill_tag": "tag-dark", "deptId": "isonemSpecial", "category": "astarlar", "thumb": "assets/isonem-official/isonem-ep-primer.png", "desc": "SARFİYAT: 0,25 - 0,4 kg/m² BOYANABİLEN (KAPLANABİLEN) ALAN: 5- 8 m² /2 kg set 12,5 - 20 m² /5 kg set RENK: A komponent şeffaf, B komponent kahverengi AMBALAJ ŞEKLİ: 2 kg set (A Komp.: 1,25 kg teneke k", "meta": ["Yüzeye bağlı sarfiyat", "Fabrika Ambalajı", "Orijinal Kartela"], "coverage": "5- 8 m² /2 kg set 12,5 - 20 m² /5 kg set", "sizes": ["PP Kova", "Toptan Palet"], "specs": {"standard": "Yüksek Tutunma", "packaging": "Orijinal Ambalaj", "consumption": "Yüzeye bağlı", "coverage": "5- 8 m² /2 kg set 12,5 - 20 m² /5 kg set", "color": "İstenilen tüm renklerde", "logistics": "Balçova Yapı Market & Urla Lojistik Depo Stok"}, "accordions": [{"title": "Teknik Uygulama Bilgisi", "body": "Yüzey temiz, tozsuz ve kuru olmalıdır. Detaylı teknik şartname ve uygulama desteği için Pervan Balçova veya Urla şubemize danışınız."}]}, {"id": "isonem-anti-fire-paint", "name": "ISONEM ANTI FIRE PAINT", "badge": "120 Dk Alev Direnci", "tag": "Yangın Bariyeri", "pill_tag": "tag-red", "deptId": "isonemThermal", "category": "ses-yangin", "thumb": "assets/isonem-official/isonem-anti-fire-paint.png", "desc": "Her türlü sıvalı, boyalı ve boyasız iç ve dış yüzeylerde, beton, ahşap ve çelik yapılarda, çatılarda, yangın merdivenlerinde, yanmazlık istenen tüm mekanlarda, okul, kreş, hastane, tiyatro ve sinema salonlarında, alçıpan duvar bölmeleri ve tavanlarda, bacalarda, termik santral ve...", "meta": ["Yüzeye bağlı sarfiyat", "Fabrika Ambalajı", "Orijinal Kartela"], "coverage": "5 kg: 5 - 8 m²/kova, 10 kg: 10 - 16 m²/kova, 18 kg: 18 - 30 m²/kova", "sizes": ["PP Kova", "Toptan Palet"], "specs": {"standard": "120 Dk Alev Direnci", "packaging": "Orijinal Ambalaj", "consumption": "Yüzeye bağlı", "coverage": "5 kg: 5 - 8 m²/kova, 10 kg: 10 - 16 m²/kova, 18 kg: 18 - 30 m²/kova", "color": "İstenilen tüm renklerde", "logistics": "Balçova Yapı Market & Urla Lojistik Depo Stok"}, "accordions": [{"title": "Teknik Uygulama Bilgisi", "body": "Yüzey temiz, tozsuz ve kuru olmalıdır. Detaylı teknik şartname ve uygulama desteği için Pervan Balçova veya Urla şubemize danışınız."}]}, {"id": "isonem-thermal-paint", "name": "ISONEM THERMAL PAINT", "badge": "%40 Isı Tasarrufu", "tag": "Termal Boya", "pill_tag": "tag-red", "deptId": "isonemThermal", "category": "isi-yalitimi", "thumb": "assets/isonem-official/isonem-thermal-paint.png", "desc": "SARFİYAT : Max. 300 mL/m² (iç cephe uygulamalarında) 1 L/m² (1 mm kalınlık için) 2 L/m² (2 mm kalınlık için) BOYANABİLEN (KAPLANABİLEN) ALAN 5 L: 2,5 - 5 m²/kova, 10 L: 5 - 10 m²/kova, 18 L: 9 - 18 m²", "meta": ["Yüzeye bağlı sarfiyat", "Fabrika Ambalajı", "Orijinal Kartela"], "coverage": "5 L: 2,5 - 5 m²/kova, 10 L: 5 - 10 m²/kova, 18 L: 9 - 18 m²/kova", "sizes": ["PP Kova", "Toptan Palet"], "specs": {"standard": "%40 Isı Tasarrufu", "packaging": "Orijinal Ambalaj", "consumption": "Yüzeye bağlı", "coverage": "5 L: 2,5 - 5 m²/kova, 10 L: 5 - 10 m²/kova, 18 L: 9 - 18 m²/kova", "color": "İstenilen tüm renklerde", "logistics": "Balçova Yapı Market & Urla Lojistik Depo Stok"}, "accordions": [{"title": "Teknik Uygulama Bilgisi", "body": "Yüzey temiz, tozsuz ve kuru olmalıdır. Detaylı teknik şartname ve uygulama desteği için Pervan Balçova veya Urla şubemize danışınız."}]}, {"id": "isonem-ms-82", "name": "ISONEM MS 82", "badge": "Küf & Rutubet Kesici", "tag": "Anti-Nem Boyası", "pill_tag": "tag-cyan", "deptId": "isonemSpecial", "category": "rutubet-discephe", "thumb": "assets/isonem-official/isonem-ms-82.png", "desc": "Nemli duvarlarda, boyalı ya da boyasız rutubetli duvarlarda, Subasmanlarda, iç ve dış duvarlarda, Bodrum kat duvarlarında, Sıva, alçı, beton, şap gibi yüzeylerde ve zeminlerde, Tünellerde, binaların kuzey cephelerinde, Rutubet ve nem sorunlarında", "meta": ["Yüzeye bağlı sarfiyat", "Fabrika Ambalajı", "Orijinal Kartela"], "coverage": "1 kg: 1,5 - 2 m² /teneke kutu 5 kg: 8 - 10 m² /teneke kutu", "sizes": ["PP Kova", "Toptan Palet"], "specs": {"standard": "Küf & Rutubet Kesici", "packaging": "Orijinal Ambalaj", "consumption": "Yüzeye bağlı", "coverage": "1 kg: 1,5 - 2 m² /teneke kutu 5 kg: 8 - 10 m² /teneke kutu", "color": "İstenilen tüm renklerde", "logistics": "Balçova Yapı Market & Urla Lojistik Depo Stok"}, "accordions": [{"title": "Teknik Uygulama Bilgisi", "body": "Yüzey temiz, tozsuz ve kuru olmalıdır. Detaylı teknik şartname ve uygulama desteği için Pervan Balçova veya Urla şubemize danışınız."}]}, {"id": "isonem-universal-astar", "name": "ISONEM UNIVERSAL ASTAR", "badge": "1:7 Konsantre İzolasyon", "tag": "Üniversal Astar", "pill_tag": "tag-dark", "deptId": "isonemIndustrial", "category": "genel-astar", "thumb": "assets/isonem-official/isonem-universal-astar.png", "desc": "Beton, temel beton, gaz beton, alçı, sıva ve benzeri ham duvarlarda, Eski kireç badanalı, emülsiyon esaslı eski iç ve dış boyalı yüzeylerde kullanılır.", "meta": ["Yüzeye bağlı sarfiyat", "Fabrika Ambalajı", "Orijinal Kartela"], "coverage": "40 - 80 m²/ 1 kg, 200 - 400 m²/ 5 kg, 400 - 800 m²/ 10 kg, 600 - 1200 m²/ 15 kg", "sizes": ["PP Kova", "Toptan Palet"], "specs": {"standard": "1:7 Konsantre İzolasyon", "packaging": "Orijinal Ambalaj", "consumption": "Yüzeye bağlı", "coverage": "40 - 80 m²/ 1 kg, 200 - 400 m²/ 5 kg, 400 - 800 m²/ 10 kg, 600 - 1200 m²/ 15 kg", "color": "İstenilen tüm renklerde", "logistics": "Balçova Yapı Market & Urla Lojistik Depo Stok"}, "accordions": [{"title": "Teknik Uygulama Bilgisi", "body": "Yüzey temiz, tozsuz ve kuru olmalıdır. Detaylı teknik şartname ve uygulama desteği için Pervan Balçova veya Urla şubemize danışınız."}]}, {"id": "isonem-pool", "name": "ISONEM POOL", "badge": "Yüzme Havuzu Boyası", "tag": "Klor Dirençli", "pill_tag": "tag-cyan", "deptId": "isonemSpecial", "category": "havuz-kaplama", "thumb": "assets/isonem-official/isonem-pool.png", "desc": "Havuzlarda, su tanklarında, su depolarında, arıtma ve denge depolarında, Metal tanklarda ve su sarnıçlarında, Süs havuzlarında, göletlerde, barajlarda, su kanallarında, Beton, sıva ve şap üzerinde.", "meta": ["Yüzeye bağlı sarfiyat", "Fabrika Ambalajı", "Orijinal Kartela"], "coverage": "Min. 4,5 m² /set (iki kat uygulama)", "sizes": ["PP Kova", "Toptan Palet"], "specs": {"standard": "Yüzme Havuzu Boyası", "packaging": "Orijinal Ambalaj", "consumption": "Yüzeye bağlı", "coverage": "Min. 4,5 m² /set (iki kat uygulama)", "color": "İstenilen tüm renklerde", "logistics": "Balçova Yapı Market & Urla Lojistik Depo Stok"}, "accordions": [{"title": "Teknik Uygulama Bilgisi", "body": "Yüzey temiz, tozsuz ve kuru olmalıdır. Detaylı teknik şartname ve uygulama desteği için Pervan Balçova veya Urla şubemize danışınız."}]}, {"id": "isonem-pool-transparent", "name": "ISONEM POOL TRANSPARENT", "badge": "Seramik Üstü Havuz", "tag": "Şeffaf Havuz Kaplama", "pill_tag": "tag-cyan", "deptId": "isonemSpecial", "category": "havuz-kaplama", "thumb": "assets/isonem-official/isonem-pool-transparent.png", "desc": "Seramik, karo, cam mozaik, fayans vb. kaplı yüzme havuzlarında, Süs havuzlarında, Hamam, sauna vb. yerlerde", "meta": ["Yüzeye bağlı sarfiyat", "Fabrika Ambalajı", "Orijinal Kartela"], "coverage": "22,5 - 45 m² /set", "sizes": ["PP Kova", "Toptan Palet"], "specs": {"standard": "Seramik Üstü Havuz", "packaging": "Orijinal Ambalaj", "consumption": "Yüzeye bağlı", "coverage": "22,5 - 45 m² /set", "color": "İstenilen tüm renklerde", "logistics": "Balçova Yapı Market & Urla Lojistik Depo Stok"}, "accordions": [{"title": "Teknik Uygulama Bilgisi", "body": "Yüzey temiz, tozsuz ve kuru olmalıdır. Detaylı teknik şartname ve uygulama desteği için Pervan Balçova veya Urla şubemize danışınız."}]}, {"id": "isonem-grass-paint", "name": "ISONEM GRASS PAINT", "badge": "Doğal Yeşil Görünüm", "tag": "Ekolojik Çim Boyası", "pill_tag": "tag-emerald", "deptId": "isonemIndustrial", "category": "tarim-peyzaj", "thumb": "assets/isonem-official/isonem-grass-paint.png", "desc": "Tamamen sararmış, kurumuş çim alanlar Kurumuş bitkiler Futbol sahaları Organizasyonlarda, davetlerde çok çeşitli, değişik desenli tasarımlar ve uygulamalar yapılmasına olanak verir", "meta": ["Yüzeye bağlı sarfiyat", "Fabrika Ambalajı", "Orijinal Kartela"], "coverage": "10 - 15 m²/plastik şişe", "sizes": ["PP Kova", "Toptan Palet"], "specs": {"standard": "Doğal Yeşil Görünüm", "packaging": "Orijinal Ambalaj", "consumption": "Yüzeye bağlı", "coverage": "10 - 15 m²/plastik şişe", "color": "İstenilen tüm renklerde", "logistics": "Balçova Yapı Market & Urla Lojistik Depo Stok"}, "accordions": [{"title": "Teknik Uygulama Bilgisi", "body": "Yüzey temiz, tozsuz ve kuru olmalıdır. Detaylı teknik şartname ve uygulama desteği için Pervan Balçova veya Urla şubemize danışınız."}]}, {"id": "isonem-soil-water-trap", "name": "ISONEM SOIL WATER TRAP", "badge": "Tarımsal Tasarruf", "tag": "Su Tutucu Kristal", "pill_tag": "tag-emerald", "deptId": "isonemIndustrial", "category": "tarim-peyzaj", "thumb": "assets/isonem-official/isonem-soil-water-trap.png", "desc": "Fidan dikimi ,fide üretimi Mevcut ağaçlarda uygulama Çilek üretimi, kavun, karpuz, kabak uygulaması Tarla tarımı (Hububat, haşhaş, pancar, mısır, pamuk, ayçiçeği, patates fasulye vs.) Çim ve peyzaj uygulamaları Kesme çiçekçilik Saksı çiçekçiliği,Yonca ve yem bitkileri uygulaması ...", "meta": ["Yüzeye bağlı sarfiyat", "Fabrika Ambalajı", "Orijinal Kartela"], "coverage": "Detaylı sarfiyat tablosuna bakınız", "sizes": ["PP Kova", "Toptan Palet"], "specs": {"standard": "Tarımsal Tasarruf", "packaging": "Orijinal Ambalaj", "consumption": "Yüzeye bağlı", "coverage": "Detaylı sarfiyat tablosuna bakınız", "color": "İstenilen tüm renklerde", "logistics": "Balçova Yapı Market & Urla Lojistik Depo Stok"}, "accordions": [{"title": "Teknik Uygulama Bilgisi", "body": "Yüzey temiz, tozsuz ve kuru olmalıdır. Detaylı teknik şartname ve uygulama desteği için Pervan Balçova veya Urla şubemize danışınız."}]}, {"id": "isonem-anti-fire-solution", "name": "ISONEM ANTI-FIRE SOLUTION", "badge": "Tutuşmazlık Ajanı", "tag": "Emprenye Solüsyon", "pill_tag": "tag-red", "deptId": "isonemThermal", "category": "ses-yangin", "thumb": "assets/isonem-official/isonem-anti-fire-solution.png", "desc": "Ahşap ürünlerde Boya sektöründe Sanayi sektöründe", "meta": ["Yüzeye bağlı sarfiyat", "Fabrika Ambalajı", "Orijinal Kartela"], "coverage": "Detaylı sarfiyat tablosuna bakınız", "sizes": ["PP Kova", "Toptan Palet"], "specs": {"standard": "Tutuşmazlık Ajanı", "packaging": "Orijinal Ambalaj", "consumption": "Yüzeye bağlı", "coverage": "Detaylı sarfiyat tablosuna bakınız", "color": "İstenilen tüm renklerde", "logistics": "Balçova Yapı Market & Urla Lojistik Depo Stok"}, "accordions": [{"title": "Teknik Uygulama Bilgisi", "body": "Yüzey temiz, tozsuz ve kuru olmalıdır. Detaylı teknik şartname ve uygulama desteği için Pervan Balçova veya Urla şubemize danışınız."}]}, {"id": "isonem-anti-molotof", "name": "ISONEM ANTI MOLOTOF", "badge": "Alev Savunma", "tag": "Özel Yanmaz Sıvı", "pill_tag": "tag-red", "deptId": "isonemThermal", "category": "ses-yangin", "thumb": "assets/isonem-official/isonem-anti-molotof.png", "desc": "İdeal kullanım alanları kapalı ve açık alanlardır. Her türlü başlangıç yangınları için kullanılabilir. Gemiler, evler, okullar, taşıtlar ve askeri tesisler, benzin istasyonları, fabrikalar kısacası her yer için oldukça elverişli bir yangın söndürücüdür. DİKKAT ! Yangın başlangıcı...", "meta": ["Yüzeye bağlı sarfiyat", "Fabrika Ambalajı", "Orijinal Kartela"], "coverage": "Detaylı sarfiyat tablosuna bakınız", "sizes": ["PP Kova", "Toptan Palet"], "specs": {"standard": "Alev Savunma", "packaging": "Orijinal Ambalaj", "consumption": "Yüzeye bağlı", "coverage": "Detaylı sarfiyat tablosuna bakınız", "color": "İstenilen tüm renklerde", "logistics": "Balçova Yapı Market & Urla Lojistik Depo Stok"}, "accordions": [{"title": "Teknik Uygulama Bilgisi", "body": "Yüzey temiz, tozsuz ve kuru olmalıdır. Detaylı teknik şartname ve uygulama desteği için Pervan Balçova veya Urla şubemize danışınız."}]}];

  var DEPARTMENTS_DATA = [
    {
      id: "isonemWaterproofing",
      short: "Su Yalıtımı",
      full: "Su Yalıtım Sistemleri & Membranlar",
      sub: "Sürme poliüretan, hibrit membran ve kristalize su yalıtımı",
      icon: "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z\"/></svg>",
      pillsId: "waterproofingMenuPills",
      listId: "waterproofingMenuList",
      pills: [["tum-su-yalitimi", "Tüm Su Yalıtımı"], ["surme-membran", "Sürme Membranlar"], ["cimentolu-harclar", "Kristalize & Çimento"], ["seffaf-emprenye", "Şeffaf İzolasyon"], ["tamir-katki", "Pah, Macun & Katkı"]]
    },
    {
      id: "isonemFloor",
      short: "Zemin & Sıvı Cam",
      full: "Zemin Kaplamaları & Sıvı Cam (Liquid Glass)",
      sub: "2K sıvı cam, solventsiz epoksi ve zemin kaplamaları",
      icon: "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><path d=\"M3 9h18M9 21V9\"/></svg>",
      pillsId: "floorMenuPills",
      listId: "floorMenuList",
      pills: [["tum-zemin", "Tüm Zeminler"], ["sivi-cam", "Sıvı Cam (Liquid Glass)"], ["epoksi-kaplama", "Epoksi Kaplamalar"], ["sertlestirici-yol", "Sertleştirici & Yol Boyası"]]
    },
    {
      id: "isonemThermal",
      short: "Isı & Ses Yalıtımı",
      full: "Isı & Ses Yalıtım Boyaları ve Yangın Bariyerleri",
      sub: "Termal seramik boya, ses yutucu ve yangın bariyerleri",
      icon: "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z\"/></svg>",
      pillsId: "thermalMenuPills",
      listId: "thermalMenuList",
      pills: [["tum-termal", "Tüm Termal Boyalar"], ["isi-yalitimi", "Isı Yalıtım Boyaları"], ["ses-yangin", "Ses & Yangın Koruma"]]
    },
    {
      id: "isonemSpecial",
      short: "Özel Boyalar & Havuz",
      full: "Özel Koruyucu Boyalar & Havuz Kaplama",
      sub: "Anti-nem küf boyaları ve klor dirençli havuz kaplamaları",
      icon: "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"m4.93 4.93 4.24 4.24\"/><path d=\"m14.83 9.17 4.24-4.24\"/><path d=\"m14.83 14.83 4.24 4.24\"/><path d=\"m9.17 14.83-4.24 4.24\"/></svg>",
      pillsId: "specialMenuPills",
      listId: "specialMenuList",
      pills: [["tum-ozel-boyalar", "Tüm Özel Boyalar"], ["rutubet-discephe", "Rutubet & Dış Cephe"], ["havuz-kaplama", "Havuz Boyaları"], ["astarlar", "Teknik Astarlar"]]
    },
    {
      id: "isonemIndustrial",
      short: "Endüstriyel & Tarım",
      full: "Endüstriyel, Tarımsal & Ekolojik Çözümler",
      sub: "Toprak su tutucular, ekolojik çim boyaları ve astarlar",
      icon: "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"/></svg>",
      pillsId: "industrialMenuPills",
      listId: "industrialMenuList",
      pills: [["tum-endustriyel", "Tüm Endüstriyel"], ["tarim-peyzaj", "Tarım & Peyzaj"], ["genel-astar", "Genel Astarlar"]]
    }
  ];

  var subnav = document.getElementById("pvSubnav");
  var spacer = document.getElementById("pvSubnavSpacer");
  var header = document.querySelector("header");
  var subnavLinks = document.querySelectorAll("#pvSubnavLinks .pv-subnav-link");
  var deptTrigger = document.getElementById("pvDeptTrigger");
  var deptTriggerLabel = document.getElementById("pvDeptTriggerLabel");
  var deptDrawerBackdrop = document.getElementById("pvDeptDrawerBackdrop");
  var deptDrawer = document.getElementById("pvDeptDrawer");
  var drawerCloseBtn = document.getElementById("pvDrawerCloseBtn");
  var deptList = document.getElementById("pvDeptList");
  var filterRail = document.getElementById("pvFilterRail");

  var currentActiveTab = "isonemWaterproofing";
  var currentProduct = null;
  var selectedSize = "";

  var panels = {
    "isonemWaterproofing": document.getElementById("isonemWaterproofing"),
    "isonemFloor": document.getElementById("isonemFloor"),
    "isonemThermal": document.getElementById("isonemThermal"),
    "isonemSpecial": document.getElementById("isonemSpecial"),
    "isonemIndustrial": document.getElementById("isonemIndustrial")
  };

  // Sticky subnav header clearance sync
  var initialSubnavTop = 0;
  function getSubnavOrigin() {
    if (spacer && spacer.classList.contains("is-active")) {
      return spacer.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop);
    }
    return subnav ? (subnav.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop)) : 0;
  }

  function getHeaderHeight() {
    if (!header) return 60;
    return header.offsetHeight || 60;
  }

  function syncSubnavPin() {
    if (!subnav) return;
    var scrollPos = window.pageYOffset || document.documentElement.scrollTop;
    if (!initialSubnavTop || initialSubnavTop < 100) {
      initialSubnavTop = getSubnavOrigin();
    }

    var headerVisible = header && !header.classList.contains("header--hidden");
    var hHeight = getHeaderHeight();
    var pinThreshold = initialSubnavTop - (headerVisible ? hHeight : 0);

    if (scrollPos >= pinThreshold) {
      if (!subnav.classList.contains("is-pinned")) {
        subnav.classList.add("is-pinned");
        if (spacer) {
          spacer.style.height = (subnav.offsetHeight || 46) + "px";
          spacer.classList.add("is-active");
        }
      }

      if (!headerVisible) {
        subnav.classList.add("header-hidden");
        subnav.style.top = "0px";
      } else {
        subnav.classList.remove("header-hidden");
        subnav.style.top = hHeight + "px";
        document.documentElement.style.setProperty("--header-actual-height", hHeight + "px");
      }
    } else {
      if (subnav.classList.contains("is-pinned")) {
        subnav.classList.remove("is-pinned");
        subnav.classList.remove("header-hidden");
        subnav.style.top = "";
        if (spacer) spacer.classList.remove("is-active");
      }
    }
  }

  window.addEventListener("scroll", syncSubnavPin, { passive: true });
  window.addEventListener("resize", function() {
    initialSubnavTop = 0;
    syncSubnavPin();
  }, { passive: true });
  syncSubnavPin();

  function switchTab(targetId) {
    if (!panels[targetId]) return;
    currentActiveTab = targetId;

    subnavLinks.forEach(function(btn) {
      var match = btn.getAttribute("data-target") === targetId;
      btn.classList.toggle("active", match);
      btn.setAttribute("aria-selected", match ? "true" : "false");
    });

    Object.keys(panels).forEach(function(key) {
      if (panels[key]) {
        var match = (key === targetId);
        panels[key].classList.toggle("active", match);
        panels[key].style.display = match ? "" : "none";
      }
    });

    var deptObj = DEPARTMENTS_DATA.find(function(d) { return d.id === targetId; });
    if (deptObj && deptTriggerLabel) {
      deptTriggerLabel.textContent = deptObj.short;
    }

    renderDrawerList(targetId);
    syncMobileFilterRail(targetId);
  }

  subnavLinks.forEach(function(btn) {
    btn.addEventListener("click", function() {
      var targetId = btn.getAttribute("data-target");
      switchTab(targetId);

      var origin = getSubnavOrigin();
      if ((window.pageYOffset || document.documentElement.scrollTop) > origin) {
        window.scrollTo({ top: origin - getHeaderHeight(), behavior: "smooth" });
      }
    });
  });

  function renderDrawerList(activeId) {
    if (!deptList) return;
    deptList.innerHTML = "";

    DEPARTMENTS_DATA.forEach(function(d) {
      var isActive = d.id === activeId;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "pv-drawer-item" + (isActive ? " active" : "");
      btn.innerHTML = 
        '<div class="pv-drawer-item-left">' +
          '<div class="pv-drawer-icon-box" aria-hidden="true">' + d.icon + '</div>' +
          '<div class="pv-drawer-text-stack">' +
            '<span class="pv-drawer-item-title">' + d.short + '</span>' +
            '<span class="pv-drawer-item-sub">' + d.sub + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="pv-drawer-item-right" aria-hidden="true">' +
          '<svg class="pv-drawer-item-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>' +
        '</div>';

      btn.addEventListener("click", function() {
        switchTab(d.id);
        closeDeptDrawer();
        var origin = getSubnavOrigin();
        if ((window.pageYOffset || document.documentElement.scrollTop) > origin) {
          window.scrollTo({ top: origin - getHeaderHeight(), behavior: "smooth" });
        }
      });
      deptList.appendChild(btn);
    });
  }

  function syncMobileFilterRail(activeId) {
    if (!filterRail) return;
    filterRail.innerHTML = "";

    var dept = DEPARTMENTS_DATA.find(function(d) { return d.id === activeId; }) || DEPARTMENTS_DATA[0];
    var origContainer = document.getElementById(dept.pillsId);
    if (!origContainer) return;

    var origPills = origContainer.querySelectorAll(".pv-menu-pill");
    origPills.forEach(function(origBtn) {
      var chip = document.createElement("button");
      chip.type = "button";
      chip.role = "tab";
      var isActive = origBtn.classList.contains("active");
      chip.className = "pv-filter-chip" + (isActive ? " active" : "");
      chip.setAttribute("aria-selected", isActive ? "true" : "false");
      chip.innerHTML = origBtn.innerHTML;

      chip.addEventListener("click", function(e) {
        e.preventDefault();
        origBtn.click();
        filterRail.querySelectorAll(".pv-filter-chip").forEach(function(c) {
          c.classList.remove("active");
          c.setAttribute("aria-selected", "false");
        });
        chip.classList.add("active");
        chip.setAttribute("aria-selected", "true");
        if (typeof chip.scrollIntoView === "function") {
          chip.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        }
      });

      filterRail.appendChild(chip);
    });
  }

  function openDeptDrawer() {
    if (!deptDrawerBackdrop || !deptTrigger) return;
    deptDrawerBackdrop.classList.add("is-open");
    deptDrawerBackdrop.setAttribute("aria-hidden", "false");
    deptTrigger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeDeptDrawer() {
    if (!deptDrawerBackdrop || !deptTrigger) return;
    deptDrawerBackdrop.classList.remove("is-open");
    deptDrawerBackdrop.setAttribute("aria-hidden", "true");
    deptTrigger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  if (deptTrigger) {
    deptTrigger.addEventListener("click", function(e) {
      e.stopPropagation();
      openDeptDrawer();
    });
  }
  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener("click", closeDeptDrawer);
  }
  if (deptDrawerBackdrop) {
    deptDrawerBackdrop.addEventListener("click", function(e) {
      if (e.target === deptDrawerBackdrop) closeDeptDrawer();
    });
  }

  function setupCategoryFiltering(pillsContainerId, listContainerId) {
    var container = document.getElementById(pillsContainerId);
    var list = document.getElementById(listContainerId);
    if (!container || !list) return;

    var pills = container.querySelectorAll(".pv-menu-pill");
    var rows = list.querySelectorAll(".pv-menu-row");

    pills.forEach(function(pill) {
      pill.addEventListener("click", function() {
        pills.forEach(function(p) {
          p.classList.remove("active");
          p.setAttribute("aria-selected", "false");
        });
        pill.classList.add("active");
        pill.setAttribute("aria-selected", "true");

        var filter = pill.getAttribute("data-filter");
        rows.forEach(function(row) {
          var rowCat = row.getAttribute("data-category");
          var match = (filter.indexOf("tum-") === 0) || (rowCat === filter);
          row.style.display = match ? "" : "none";
        });
      });
    });
  }

  DEPARTMENTS_DATA.forEach(function(d) {
    setupCategoryFiltering(d.pillsId, d.listId);
  });


  /* 3. INSTANT SEARCH MODAL (⌘K) */
  var searchBtn = document.getElementById("pvSubnavSearchBtn");
  var searchBackdrop = document.getElementById("pvSearchBackdrop");
  var searchInput = document.getElementById("pvGlobalSearchInput");
  var searchResults = document.getElementById("pvSearchResults");

  function openSearch() {
    if (!searchBackdrop) return;
    searchBackdrop.style.display = "flex";
    searchBackdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (searchInput) {
      searchInput.value = "";
      renderSearchResults("");
      setTimeout(function() { searchInput.focus(); }, 50);
    }
  }

  function closeSearch() {
    if (!searchBackdrop) return;
    searchBackdrop.style.display = "none";
    searchBackdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function renderSearchResults(query) {
    if (!searchResults) return;
    var q = query.toLowerCase().trim();
    var matches = ISONEM_PRODUCTS_DATA.filter(function(item) {
      if (!q) return true;
      var matchName = item.name.toLowerCase().indexOf(q) !== -1;
      var matchDesc = (item.desc || "").toLowerCase().indexOf(q) !== -1;
      var matchTag = (item.tag || "").toLowerCase().indexOf(q) !== -1;
      return matchName || matchDesc || matchTag;
    });

    if (matches.length === 0) {
      searchResults.innerHTML = '<div style="padding:24px; text-align:center; color:#888; font-size:14px;">Sonuç bulunamadı.</div>';
      return;
    }

    var html = "";
    matches.forEach(function(item) {
      html += '<div class="pv-search-result-row" data-id="' + item.id + '" style="display:flex; align-items:center; gap:14px; padding:10px 12px; border-radius:10px; cursor:pointer; transition:background 0.15s ease;">' +
        '<img src="' + item.thumb + '" alt="' + item.name + '" style="width:40px; height:40px; object-fit:contain; background:#F8FAFC; border-radius:6px; padding:2px;" />' +
        '<div style="flex:1;">' +
          '<div style="font-size:14px; font-weight:700; color:#111215;">' + item.name + ' <span style="font-size:11px; font-weight:600; color:#004895; background:rgba(0,72,149,0.08); padding:2px 6px; border-radius:4px; margin-left:6px;">' + item.tag + '</span></div>' +
          '<div style="font-size:12px; color:#6B7280; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:440px;">' + item.desc + '</div>' +
        '</div>' +
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:#9CA3AF;"><path d="M5 12h14M12 5l7 7-7 7"/></svg>' +
      '</div>';
    });

    searchResults.innerHTML = html;

    searchResults.querySelectorAll(".pv-search-result-row").forEach(function(row) {
      row.addEventListener("mouseenter", function() { row.style.background = "#F3F4F6"; });
      row.addEventListener("mouseleave", function() { row.style.background = "transparent"; });
      row.addEventListener("click", function() {
        var pid = row.getAttribute("data-id");
        var p = ISONEM_PRODUCTS_DATA.find(function(item) { return item.id === pid; });
        closeSearch();
        if (p) {
          if (p.deptId && p.deptId !== currentActiveTab) {
            switchTab(p.deptId);
          }
          openModal(pid);
        }
      });
    });
  }

  if (searchBtn) searchBtn.addEventListener("click", openSearch);
  if (searchInput) {
    searchInput.addEventListener("input", function() {
      renderSearchResults(searchInput.value);
    });
  }
  if (searchBackdrop) {
    searchBackdrop.addEventListener("click", function(e) {
      if (e.target === searchBackdrop) closeSearch();
    });
  }

  document.addEventListener("keydown", function(e) {
    if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
      e.preventDefault();
      openSearch();
    }
    if (e.key === "Escape" && searchBackdrop && searchBackdrop.style.display !== "none") {
      closeSearch();
    }
  });


  /* 4. PRODUCT DETAIL MODAL & CONFIGURATOR */
  var modalBackdrop = document.getElementById("pvModalBackdrop");
  var modalCard = document.getElementById("pvModalCard");
  var modalTopBar = document.getElementById("modalTopBar");
  var modalHandleZone = document.getElementById("modalHandleZone");
  var modalCloseBtn = document.getElementById("pvModalCloseBtn");
  var modalScrollArea = document.getElementById("modalScrollArea");

  var modalProductImg = document.getElementById("modalProductImg");
  var modalProductEyebrow = document.getElementById("modalProductEyebrow");
  var modalProductTitle = document.getElementById("modalProductTitle");
  var modalProductDesc = document.getElementById("modalProductDesc");
  var modalSizeTrack = document.getElementById("modalSizeTrack");
  var modalSpecStandard = document.getElementById("modalSpecStandard");
  var modalSpecPackaging = document.getElementById("modalSpecPackaging");
  var modalSpecConsumption = document.getElementById("modalSpecConsumption");
  var modalSpecCoverage = document.getElementById("modalSpecCoverage");
  var modalSpecColor = document.getElementById("modalSpecColor");
  var modalSpecLogistics = document.getElementById("modalSpecLogistics");
  var modalWABtn = document.getElementById("modalWABtn");
  var modalAccordions = document.getElementById("modalAccordions");

  var isSheetDragging = false;
  var dragStartY = 0;
  var dragCurrentY = 0;
  var dragStartTime = 0;
  var canDragFromScroll = false;

  function openModal(productId) {
    var p = ISONEM_PRODUCTS_DATA.find(function(item) { return item.id === productId; });
    if (!p) return;
    currentProduct = p;
    selectedSize = (p.sizes && p.sizes.length > 0) ? p.sizes[0] : "";

    modalProductImg.src = p.thumb;
    modalProductImg.alt = p.name;
    if (modalProductEyebrow) modalProductEyebrow.textContent = "İSONEM · YALITIM TEKNOLOJİLERİ";
    modalProductTitle.textContent = p.name;
    modalProductDesc.textContent = p.desc;

    if (modalSpecStandard) modalSpecStandard.textContent = p.specs.standard || p.badge || "-";
    if (modalSpecPackaging) modalSpecPackaging.textContent = p.specs.packaging || (p.sizes ? p.sizes[0] : "-");
    if (modalSpecConsumption) modalSpecConsumption.textContent = p.specs.consumption || "-";
    if (modalSpecCoverage) modalSpecCoverage.textContent = p.specs.coverage || "-";
    if (modalSpecColor) modalSpecColor.textContent = p.specs.color || "Orijinal Kartela";
    if (modalSpecLogistics) modalSpecLogistics.textContent = p.specs.logistics || "Balçova Yapı Market & Urla Depo";

    if (modalSizeTrack) {
      modalSizeTrack.innerHTML = "";
      if (p.sizes && p.sizes.length > 0) {
        p.sizes.forEach(function(size, idx) {
          var btn = document.createElement("button");
          btn.type = "button";
          btn.className = "pv-segmented-btn" + (idx === 0 ? " active" : "");
          btn.textContent = size;
          btn.addEventListener("click", function() {
            modalSizeTrack.querySelectorAll(".pv-segmented-btn").forEach(function(b) { b.classList.remove("active"); });
            btn.classList.add("active");
            selectedSize = size;
            updateWhatsAppUrl();
          });
          modalSizeTrack.appendChild(btn);
        });
      }
    }

    if (modalAccordions) {
      modalAccordions.innerHTML = "";
      if (p.accordions && p.accordions.length > 0) {
        p.accordions.forEach(function(acc, idx) {
          var item = document.createElement("div");
          item.className = "pv-acc-item" + (idx === 0 ? " active" : "");
          item.innerHTML = 
            '<button type="button" class="pv-acc-header">' +
            '  <span>' + acc.title + '</span>' +
            '  <span class="pv-acc-icon">+</span>' +
            '</button>' +
            '<div class="pv-acc-body">' + acc.body + '</div>';

          item.querySelector(".pv-acc-header").addEventListener("click", function() {
            item.classList.toggle("active");
          });
          modalAccordions.appendChild(item);
        });
      }
    }

    updateWhatsAppUrl();

    modalBackdrop.classList.add("open");
    modalBackdrop.classList.add("is-open");
    modalBackdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    try {
      history.replaceState(null, "", "#urun-" + p.id);
    } catch(e) {}
  }

  function resetSheetStyles() {
    if (modalCard) {
      modalCard.style.transform = "";
      modalCard.style.transition = "";
    }
    if (modalBackdrop) {
      modalBackdrop.style.opacity = "";
      modalBackdrop.style.transition = "";
    }
  }

  function closeModal() {
    modalBackdrop.classList.remove("open");
    modalBackdrop.classList.remove("is-open");
    modalBackdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    currentProduct = null;
    resetSheetStyles();
    try {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    } catch(e) {}
  }

  function updateWhatsAppUrl() {
    if (!currentProduct || !modalWABtn) return;
    var text = "Merhaba, İsonem " + currentProduct.name;
    if (selectedSize) {
      text += " (" + selectedSize + ")";
    }
    text += " için Urla / Balçova depo şantiye teslimat ve güncel fiyat bilgisi almak istiyorum.";
    modalWABtn.href = "https://wa.me/905323844497?text=" + encodeURIComponent(text);
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", function(e) {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && (modalBackdrop.classList.contains("is-open") || modalBackdrop.classList.contains("open"))) {
      closeModal();
    }
  });

  // Touch gesture physics for mobile bottom sheet dismissal
  function onDragStart(e) {
    if (!modalBackdrop.classList.contains("is-open") && !modalBackdrop.classList.contains("open")) return;
    var touch = e.touches ? e.touches[0] : e;
    dragStartY = touch.clientY;
    dragCurrentY = touch.clientY;
    dragStartTime = Date.now();
    isSheetDragging = false;
    canDragFromScroll = (modalScrollArea && modalScrollArea.scrollTop <= 0);
  }

  function onDragMove(e) {
    if ((!modalBackdrop.classList.contains("is-open") && !modalBackdrop.classList.contains("open")) || !dragStartY) return;
    var touch = e.touches ? e.touches[0] : e;
    var deltaY = touch.clientY - dragStartY;
    dragCurrentY = touch.clientY;

    if (deltaY > 6) {
      var isFromHeader = e.target.closest("#modalTopBar, #modalHandleZone");
      var isFromTopScroll = canDragFromScroll && modalScrollArea && modalScrollArea.scrollTop <= 0;

      if (isFromHeader || isFromTopScroll) {
        isSheetDragging = true;
        if (e.cancelable) e.preventDefault();
        modalCard.style.transition = "none";
        modalCard.style.transform = "translateY(" + deltaY + "px)";
        var progress = Math.min(1, deltaY / 360);
        modalBackdrop.style.opacity = (1 - progress * 0.6).toFixed(2);
      }
    }
  }

  function onDragEnd(e) {
    if (!isSheetDragging) {
      dragStartY = 0;
      return;
    }
    isSheetDragging = false;
    var deltaY = dragCurrentY - dragStartY;
    var elapsed = Math.max(1, Date.now() - dragStartTime);
    var velocity = deltaY / elapsed;
    dragStartY = 0;

    if (deltaY > 110 || (deltaY > 40 && velocity > 0.45)) {
      modalCard.style.transition = "transform 0.24s cubic-bezier(0.16, 1, 0.3, 1)";
      modalCard.style.transform = "translateY(100%)";
      modalBackdrop.style.transition = "opacity 0.24s ease";
      modalBackdrop.style.opacity = "0";
      setTimeout(function() {
        closeModal();
      }, 240);
    } else {
      modalCard.style.transition = "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)";
      modalCard.style.transform = "translateY(0)";
      modalBackdrop.style.transition = "opacity 0.25s ease";
      modalBackdrop.style.opacity = "1";
      setTimeout(resetSheetStyles, 300);
    }
  }

  [modalHandleZone, modalTopBar, modalScrollArea].filter(Boolean).forEach(function(target) {
    target.addEventListener("touchstart", onDragStart, { passive: true });
    target.addEventListener("touchmove", onDragMove, { passive: false });
    target.addEventListener("touchend", onDragEnd, { passive: true });
    target.addEventListener("touchcancel", onDragEnd, { passive: true });
  });

  document.querySelectorAll(".pv-menu-row").forEach(function(row) {
    row.addEventListener("click", function() {
      var pid = row.getAttribute("data-product-id");
      if (pid) openModal(pid);
    });
    row.addEventListener("keydown", function(e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        var pid = row.getAttribute("data-product-id");
        if (pid) openModal(pid);
      }
    });
  });

  function checkDeepLink() {
    var hash = window.location.hash;
    if (hash && hash.indexOf("#urun-") === 0) {
      var pid = hash.replace("#urun-", "");
      var p = ISONEM_PRODUCTS_DATA.find(function(item) { return item.id === pid; });
      if (p) {
        if (p.deptId && p.deptId !== currentActiveTab) {
          switchTab(p.deptId);
        }
        openModal(pid);
      }
    }
  }

  switchTab("isonemWaterproofing");
  checkDeepLink();
  window.addEventListener("popstate", checkDeepLink);

})();
