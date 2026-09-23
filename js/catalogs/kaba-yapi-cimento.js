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

/* 2. ARCHITECTURAL SUBNAV & 9-DEPARTMENT ZERO-SCROLL ENGINE */
(function() {
  var KABA_PRODUCTS_DATA = [
  {
    "id": "cimento-cem-1-42-5",
    "name": "Portland Çimento CEM I 42.5 R",
    "badge": "TS EN 197-1 CEM I 42.5 R",
    "tag": "Saf Portland · 42.5R",
    "deptId": "kabaCementPanel",
    "category": "portland-cimento",
    "thumb": "assets/kaba-official/cimento-cem-1-42-5.jpg",
    "desc": "Taşıyıcı betonarme sistemler, helikopterli zemin şapı, kolon-kiriş güçlendirmesi ve prekast eleman dökümleri için yüksek erken ve nihai mukavemetli saf Portland çimentosu.",
    "meta": [
      "≥ 42.5 MPa Dayanım",
      "20 MPa Erken Priz",
      "50 kg Kraft Torba"
    ],
    "coverage": "~300 – 350 kg/m³ Beton Karışımı",
    "sizes": [
      "50 kg Kraft Torba",
      "1 Palet (30 Torba / 1.5 Ton)",
      "Kamyon Bazı (10–25 Ton Dökme)"
    ],
    "specs": {
      "standard": "TS EN 197-1 CEM I 42.5 R",
      "packaging": "50 kg Torba (Palet: 30 Adet / 1.5 Ton)",
      "consumption": "~300–350 kg/m³ (Beton sınıfına göre)",
      "mixingRatio": "Su/Çimento oranı ~0.45 – 0.50",
      "potLife": "Priz Başlangıcı: ≥ 60 dk",
      "logistics": "Urla Ana Depo Çıkışlı Sevk"
    },
    "accordions": [
      {
        "title": "CEM I 42.5 R Mukavemet Avantajı",
        "body": "Katkısız saf Portland klinkeri içeriği sayesinde 2 günde 20 MPa, 28 günde 42.5 MPa üzerine çıkar. Zemin şaplarında tozuma ve çatlama riskini sıfıra indirir."
      },
      {
        "title": "Şantiye Vinçli & Kat İndirme Teslimatı",
        "body": "Urla Ana Depomuzdan Çeşme, Alaçatı, Urla ve Güzelbahçe şantiyelerine paletli vinçli araçlarla veya doğrudan kat kotuna indirme yapılır."
      }
    ]
  },
  {
    "id": "cimento-cem-2-32-5",
    "name": "Katkılı Çimento CEM II / B-LL 32.5 R",
    "badge": "TS EN 197-1 CEM II 32.5 R",
    "tag": "Katkılı Çimento · 32.5R",
    "deptId": "kabaCementPanel",
    "category": "katkili-cimento",
    "thumb": "assets/kaba-official/cimento-cem-2-32-5.jpg",
    "desc": "Tuğla ve briket örme harçları, kaba sıva uygulamaları, çevre duvarları ve genel inşaat işleri için kalker katkılı ekonomik çimento.",
    "meta": [
      "≥ 32.5 MPa Dayanım",
      "Düşük Hidratasyon Isısı",
      "50 kg Kraft Torba"
    ],
    "coverage": "~250 – 300 kg/m³ Harç Karışımı",
    "sizes": [
      "50 kg Kraft Torba",
      "1 Palet (30 Torba / 1.5 Ton)",
      "Kamyon / Tır Bazı"
    ],
    "specs": {
      "standard": "TS EN 197-1 CEM II / B-LL 32.5 R",
      "packaging": "50 kg Torba (Palet: 30 Adet)",
      "consumption": "Harç tipine göre değişken",
      "mixingRatio": "1 torba çimentoya 3-4 çuval şap/sıva kumu",
      "potLife": "Priz Başlangıcı: ≥ 75 dk",
      "logistics": "Urla Depo Günlük Sevkiyat"
    },
    "accordions": [
      {
        "title": "Duvar ve Sıvada Çatlama Direnci",
        "body": "Düşük hidratasyon ısısı sayesinde sıcak havalarda sıva ve duvar harçlarında ani su kaybı ve rötre çatlaklarını engeller."
      }
    ]
  },
  {
    "id": "cimento-beyaz-cem-1-52-5",
    "name": "Süper Beyaz Çimento CEM I 52.5 R",
    "badge": "TS EN 197-1 CEM I 52.5 R",
    "tag": "Süper Beyaz · 52.5R",
    "deptId": "kabaCementPanel",
    "category": "beyaz-cimento",
    "thumb": "assets/kaba-official/cimento-beyaz-cem-1-52-5.jpg",
    "desc": "Mimari prekast cephe panelleri, dekoratif beyaz brüt beton, yüzme havuzu derzleri ve tarihi eser restorasyonları için ultra beyaz çimento.",
    "meta": [
      "≥ 52.5 MPa Dayanım",
      "≥ %85 Beyazlık İndeksi",
      "50 kg Kraft Torba"
    ],
    "coverage": "Proje döküm detayına göre",
    "sizes": [
      "25 kg Kraft Torba",
      "50 kg Kraft Torba",
      "1 Palet (40 Torba / 1 Ton)"
    ],
    "specs": {
      "standard": "TS EN 197-1 CEM I 52.5 R",
      "packaging": "25 kg ve 50 kg Torba",
      "consumption": "Mimari reçeteye göre",
      "mixingRatio": "Beyaz mermer tozu / silis kumu ile",
      "potLife": "Priz Başlangıcı: ≥ 55 dk",
      "logistics": "Balçova & Urla Depo Stok"
    },
    "accordions": [
      {
        "title": "Mükemmel Beyazlık ve Pürüzsüz Yüzey",
        "body": "Demir oksit oranı çok düşük saf kalker ve kilden üretildiği için sararma yapmaz, parlak kar beyazı yüzey sağlar."
      }
    ]
  },
  {
    "id": "cimento-duvar-harc",
    "name": "Hazır Harç Çimentosu (MC 12.5)",
    "badge": "TS EN 413-1 MC 12.5",
    "tag": "Harç Çimentosu · MC 12.5",
    "deptId": "kabaCementPanel",
    "category": "harc-cimento",
    "thumb": "assets/kaba-official/cimento-duvar-harc.jpg",
    "desc": "Şantiyede sönmüş kireç kullanımına gerek bırakmayan, hava sürükleyici polimer katkılı, yüksek yağlılığa ve mala kayganlığına sahip özel harç çimentosu.",
    "meta": [
      "MC 12.5 Standardı",
      "Kireç İlavesiz Formül",
      "40 kg Kraft Torba"
    ],
    "coverage": "1 torba / ~40 m² tuğla duvar",
    "sizes": [
      "40 kg Kraft Torba",
      "1 Palet (35 Torba / 1.4 Ton)"
    ],
    "specs": {
      "standard": "TS EN 413-1 MC 12.5",
      "packaging": "40 kg Torba",
      "consumption": "1 torba harç çimentosu + 3 çuval kum",
      "mixingRatio": "Yalnızca kum ve su ilavesi",
      "potLife": "İşlenebilirlik: 2 saat",
      "logistics": "Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Kireç Yanıklarına ve Kusmalara Son",
        "body": "Kirecin yol açtığı tuz kusmalarını ve boya kabarmalarını önler; harcın tuğlaya ve betona yapışma gücünü artırır."
      }
    ]
  },
  {
    "id": "kirec-sonmus-torba",
    "name": "Torbalı Sönmüş Yapı Kireci (CL 90-S)",
    "badge": "TS EN 459-1 CL 90-S",
    "tag": "Sönmüş Kireç · CL 90",
    "deptId": "kabaCementPanel",
    "category": "kirec-grubu",
    "thumb": "assets/kaba-official/kirec-sonmus-torba.jpg",
    "desc": "Kaba sıva harçlarına yüksek elastikiyet, nefes alma kabiliyeti ve mala kayganlığı kazandıran elenmiş saf sönmüş toz kireç.",
    "meta": [
      "CL 90-S Saf Kireç",
      "Yüksek Plastisite & Yağ",
      "25 kg Kraft Torba"
    ],
    "coverage": "Sıva reçetesine göre",
    "sizes": [
      "25 kg Kraft Torba",
      "1 Palet (40 Torba / 1 Ton)"
    ],
    "specs": {
      "standard": "TS EN 459-1 CL 90-S",
      "packaging": "25 kg Torba",
      "consumption": "1 torba çimentoya 0.5-1 torba kireç",
      "mixingRatio": "Kum, çimento ve su ile homojen karışım",
      "potLife": "Açık harç: 4 saat",
      "logistics": "Urla Ana Depo Şantiye Sevkiyatı"
    },
    "accordions": [
      {
        "title": "Sıvada Çatlama ve Boşluk Önleme",
        "body": "Kireç, harcın su tutma kapasitesini artırarak çimentonun ani kurumasını engeller ve sıva çatlaklarını önler."
      }
    ]
  },
  {
    "id": "alci-perlitli-siva",
    "name": "Perlitli Sıva Alçısı (El Sıvası)",
    "badge": "TS EN 13279-1 Tip B1",
    "tag": "Perlitli Kaba Sıva Alçısı",
    "deptId": "kabaPlasterPanel",
    "category": "siva-alcisi",
    "thumb": "assets/kaba-official/alci-perlitli-siva.jpg",
    "desc": "Tuğla, brüt beton ve gazbeton duvarlarda nefes alan, yangına dayanıklı (A1) ve yüksek ısı-ses yalıtımı sağlayan perlit katkılı iç mekan kaba sıva alçısı.",
    "meta": [
      "B1/20/2 Perlit Katkılı",
      "~9.0 kg/m² Sarfiyat",
      "35 kg Torba"
    ],
    "coverage": "~9.0 kg/m² (1 cm kalınlık)",
    "sizes": [
      "35 kg PP Torba",
      "1 Palet (40 Torba / 1.4 Ton)",
      "Şantiye Kamyon Sevk"
    ],
    "specs": {
      "standard": "TS EN 13279-1 Tip B1/20/2",
      "packaging": "35 kg Torba (Palet: 40 Torba)",
      "consumption": "9.0 – 9.5 kg/m² (1 cm)",
      "mixingRatio": "6.0 – 6.5 lt su / 10 kg alçı",
      "potLife": "Çalışma Süresi: 120 – 150 dk",
      "logistics": "Urla & Balçova Stok"
    },
    "accordions": [
      {
        "title": "Genleştirilmiş Perlit ile Isı ve Yangın Bariyeri",
        "body": "İçerdiği mikro genleştirilmiş perlit tanecikleri sayesinde duvara binen statik yükü %40 hafifletir ve odadaki nem dengesini doğal olarak regüle eder."
      }
    ]
  },
  {
    "id": "alci-saten-perdah",
    "name": "Saten Perdah Alçısı (Son Kat Pürüzsüzlük)",
    "badge": "TS EN 13279-1 Tip B4",
    "tag": "Saten Perdah Alçısı",
    "deptId": "kabaPlasterPanel",
    "category": "saten-alci",
    "thumb": "assets/kaba-official/alci-saten-perdah.jpg",
    "desc": "Sıva alçısı veya brüt beton yüzeylerde boya öncesi pürüzsüz, kılcal çatlaksız ve macun kıvamında yüzey oluşturan ekstra beyaz saten perdah alçısı.",
    "meta": [
      "B4/20/2 Ultra İnce",
      "~0.9 kg/m² Sarfiyat",
      "30 kg Torba"
    ],
    "coverage": "~0.9 kg/m² (1 mm)",
    "sizes": [
      "30 kg Kraft Torba",
      "1 Palet (40 Torba / 1.2 Ton)"
    ],
    "specs": {
      "standard": "TS EN 13279-1 Tip B4/20/2",
      "packaging": "30 kg Torba",
      "consumption": "0.8 – 1.0 kg/m² (1 mm)",
      "mixingRatio": "6.5 – 7.0 lt su / 10 kg alçı",
      "potLife": "Çalışma Süresi: 120 dk",
      "logistics": "Balçova & Urla Depo Stok"
    },
    "accordions": [
      {
        "title": "Kusursuz İpeksi Mat Boya Zemini",
        "body": "Filli Boya ve diğer su bazlı mimari boyalar altında boya emilimini dengeler ve homojen parlaklık sağlar."
      }
    ]
  },
  {
    "id": "alci-makine-sivasi",
    "name": "Makine Sıva Alçısı (Püskürtmeli Tip)",
    "badge": "TS EN 13279-1 Tip B3",
    "tag": "Makine Püskürtme Sıvası",
    "deptId": "kabaPlasterPanel",
    "category": "makine-alci",
    "thumb": "assets/kaba-official/alci-makine-sivasi.jpg",
    "desc": "Alçı sıva pompaları ve püskürtme makineleriyle geniş duvar ve tavan yüzeylerine tek katta hızlı uygulanan yüksek verimli iç mekan sıvası.",
    "meta": [
      "B3/50/2 Makine Tipi",
      "~8.5 kg/m² Sarfiyat",
      "35 kg Torba"
    ],
    "coverage": "~8.5 kg/m² (1 cm)",
    "sizes": [
      "35 kg Torba",
      "1 Palet (40 Torba / 1.4 Ton)",
      "Toplu Şantiye Sevk"
    ],
    "specs": {
      "standard": "TS EN 13279-1 Tip B3",
      "packaging": "35 kg Torba",
      "consumption": "8.5 – 9.0 kg/m² (1 cm)",
      "mixingRatio": "Otomatik makine karışımı",
      "potLife": "Priz Başlangıcı: ~180 dk",
      "logistics": "Şantiyeye Doğrudan Sevkiyat"
    },
    "accordions": [
      {
        "title": "Günde 150+ m² Duvar Sıvama Hızı",
        "body": "Uygulama ekiplerine zamandan ve işçilik maliyetinden %50'ye varan tasarruf sağlar."
      }
    ]
  },
  {
    "id": "alci-derz-dolgu-yapistirici",
    "name": "Alçıpan Derz Dolgu & Plaka Yapıştırma Alçısı",
    "badge": "TS EN 13963 Tip 3A",
    "tag": "Alçıpan Derz & Montaj",
    "deptId": "kabaPlasterPanel",
    "category": "kartonpiyer-derz",
    "thumb": "assets/kaba-official/alci-derz-dolgu-yapistirici.jpg",
    "desc": "Alçı plaka (alçıpan) ek yerlerinde derz filesi ile birlikte kullanılan çatlamaz dolgu alçısı ve alçı plaka yapıştırma harcı.",
    "meta": [
      "Tip 3A Yüksek Aderans",
      "Esnek Dolgu & Tamir",
      "25 kg Torba"
    ],
    "coverage": "~0.35 kg/m² Alçıpan Derz",
    "sizes": [
      "25 kg Kraft Torba",
      "1 Palet (48 Torba)"
    ],
    "specs": {
      "standard": "TS EN 13963",
      "packaging": "25 kg Torba",
      "consumption": "~350 gr/m² (Derz dolgu)",
      "mixingRatio": "5.5 – 6.0 lt su / 10 kg alçı",
      "potLife": "Donma Süresi: ~90 dk",
      "logistics": "Balçova & Urla Depo Stok"
    },
    "accordions": [
      {
        "title": "Mikro Lif Destekli Çatlak Önleme",
        "body": "Bina oturmalarında ve sıcaklık değişimlerinde levha ek yerlerinin kılcal çatlama yapmasını önler."
      }
    ]
  },
  {
    "id": "kum-sap-03-elenmis",
    "name": "0–3 mm Yıkanmış & Elenmiş Şap Kumu",
    "badge": "TS 706 EN 12620 Agrega",
    "tag": "0-3 mm Elenmiş Şap Kumu",
    "deptId": "kabaAggregatesPanel",
    "category": "sap-kumu",
    "thumb": "assets/kaba-official/kum-sap-03-elenmis.jpg",
    "desc": "Kil, mil ve organik atıklardan arındırılmış, 0–3 mm dane gradasyonuna sahip helikopterli zemin şapı ve sıva agregası.",
    "meta": [
      "0–3 mm Yıkanmış Kum",
      "Kil / Mil ≤ %1.5",
      "40 kg Çuval / Dökme"
    ],
    "coverage": "~1.58 ton / m³ Zemin Şapı",
    "sizes": [
      "40 kg Çuval",
      "1 Tonluk Big-Bag (Vinçli)",
      "Damperli Kamyon (10–20 Ton)"
    ],
    "specs": {
      "standard": "TS 706 EN 12620",
      "packaging": "40 kg Çuval / 1 Ton Big-Bag / Dökme",
      "consumption": "Metraja göre tonaj hesabı",
      "mixingRatio": "1 m³ şap için ~1.6 ton kum + 300 kg çimento",
      "potLife": "Doğal agrega",
      "logistics": "Urla Depo Çıkışlı Damperli & Vinçli Sevk"
    },
    "accordions": [
      {
        "title": "Homojen Dane Dağılımı ve Sıfır Kil",
        "body": "Helikopter tepsisinde ve perdah bıçağında çizik bırakmaz, pürüzsüz ayna gibi zemin şapı elde edilmesini sağlar."
      }
    ]
  },
  {
    "id": "kum-siva-05-yikanmis",
    "name": "0–5 mm İnce Sıva & Duvar Kumu",
    "badge": "TS EN 13139 Sıva Agregası",
    "tag": "0-5 mm İnce Sıva Kumu",
    "deptId": "kabaAggregatesPanel",
    "category": "siva-kumu",
    "thumb": "assets/kaba-official/kum-siva-05-yikanmis.jpg",
    "desc": "Kaba sıva, ince sıva ve tuğla duvar örme harçları için homojen elenmiş temiz doğal nehir/ocak kumu.",
    "meta": [
      "0–5 mm İnce Agrega",
      "Yıkanmış & Kurutulmuş",
      "40 kg Çuval / Dökme"
    ],
    "coverage": "Uygulama alanına göre",
    "sizes": [
      "40 kg Çuval",
      "1 Ton Big-Bag",
      "Damper Dökme"
    ],
    "specs": {
      "standard": "TS EN 13139",
      "packaging": "40 kg Çuval / Big-Bag",
      "consumption": "Harç oranına göre",
      "mixingRatio": "1 torba çimento / 3 çuval kum",
      "potLife": "Doğal agrega",
      "logistics": "Urla Depo Sevk"
    },
    "accordions": [
      {
        "title": "Dış Cephede Su Emme Direnci",
        "body": "Yıkanmış agrega yapısı sayesinde yağmur suyuna karşı yüksek aderanslı ve dökülme yapmayan sıva katmanı oluşturur."
      }
    ]
  },
  {
    "id": "micir-1-numara-cakil",
    "name": "7–15 mm 1 No Kırma Mıcır & Çakıl",
    "badge": "TS EN 12620 Agrega",
    "tag": "1 No Kırma Mıcır",
    "deptId": "kabaAggregatesPanel",
    "category": "micir-cakil",
    "thumb": "assets/kaba-official/micir-1-numara-cakil.jpg",
    "desc": "Saha betonu, otopark zemin takviyesi, istinat duvarı arkası su drenajı ve çevre düzenleme için kalker kırma mıcır.",
    "meta": [
      "7–15 mm Kalker Taş",
      "C25-C30 Beton Agregası",
      "40 kg Çuval / Dökme"
    ],
    "coverage": "~1.60 ton/m³ Drenaj / Beton",
    "sizes": [
      "40 kg Çuval",
      "1 Ton Big-Bag",
      "Damperli Kamyon (15 Ton)"
    ],
    "specs": {
      "standard": "TS EN 12620",
      "packaging": "40 kg Çuval / 1 Ton Big-Bag / Dökme",
      "consumption": "Hacimsel dolgu",
      "mixingRatio": "Beton/Drenaj reçetesi",
      "potLife": "Doğal agrega",
      "logistics": "Urla Ana Depo Damperli Sevk"
    },
    "accordions": [
      {
        "title": "Temel ve İstinat Arkasında Kusursuz Su Tahliyesi",
        "body": "Gözenekli drenaj yapısı ile temel çevresindeki suyun tahliye borularına hızla ulaşmasını sağlar."
      }
    ]
  },
  {
    "id": "agrega-beyaz-dolomit",
    "name": "Beyaz Dolomit Taşı (15–30 mm)",
    "badge": "Doğal Peyzaj Taşı",
    "tag": "Beyaz Dolomit · 15-30 mm",
    "deptId": "kabaAggregatesPanel",
    "category": "dekoratif-agrega",
    "thumb": "assets/kaba-official/agrega-beyaz-dolomit.jpg",
    "desc": "Villa bahçeleri, peyzaj düzenlemeleri, havuz çevreleri, ağaç dipleri ve mimari saksılarda doğal parlak kar beyazı tamburlanmış dolomit taşı.",
    "meta": [
      "15–30 mm Doğal Mermer",
      "Kar Beyazı Peyzaj Taşı",
      "25 kg Çuval"
    ],
    "coverage": "1 çuval / ~0.5 m² (3-4 cm katman)",
    "sizes": [
      "25 kg Çuval",
      "1 Ton Big-Bag"
    ],
    "specs": {
      "standard": "Doğal Dekoratif Taş",
      "packaging": "25 kg Çuval (Palet: 40 Çuval)",
      "consumption": "~40-50 kg/m²",
      "mixingRatio": "Kullanıma hazır doğrudan serim",
      "potLife": "Doğal taş",
      "logistics": "Balçova & Urla Depo Stok"
    },
    "accordions": [
      {
        "title": "Güneş ve Klora Karşı Sonsuz Beyazlık",
        "body": "Doğal kristalize mermer yapısı sayesinde Çeşme güneşi altında ve havuz klorlu suyunda rengini kaybetmez."
      }
    ]
  },
  {
    "id": "gazbeton-ytong-blok",
    "name": "Gazbeton (Ytong) Duvar Blokları",
    "badge": "TS EN 771-4 Gazbeton",
    "tag": "Ytong Gazbeton Bloğu",
    "deptId": "kabaMasonryPanel",
    "category": "gazbeton-harci",
    "thumb": "assets/kaba-official/gazbeton-ytong-blok.jpg",
    "desc": "Dış cephe ve iç bölme duvarlar için yüksek ısı yalıtımı, A1 sınıfı yangın dayanımı ve binaya minimum statik yük getiren hafif gazbeton blokları.",
    "meta": [
      "G2/0.4 & G4/0.6 Sınıfı",
      "A1 Yanmaz Yapı Bloğu",
      "10 / 15 / 20 cm"
    ],
    "coverage": "1 m² duvar = ~8.3 adet blok",
    "sizes": [
      "10 cm Blok (Palet: 60 Adet / 7.2 m²)",
      "15 cm Blok (Palet: 40 Adet / 4.8 m²)",
      "20 cm Blok (Palet: 30 Adet / 3.6 m²)",
      "Kamyon Bazı (Kademeli Sevk)"
    ],
    "specs": {
      "standard": "TS EN 771-4",
      "packaging": "Paletli Shrinkli",
      "consumption": "~8.33 adet / m²",
      "mixingRatio": "Gazbeton tutkalı ile 1-3 mm derz",
      "potLife": "Ömür boyu kalıcı",
      "logistics": "Urla Depo Çıkışlı Vinçli İndirme"
    },
    "accordions": [
      {
        "title": "Hafiflik ve Deprem Güvenliği",
        "body": "Tuğlaya göre 3 kat daha hafiftir; binanın deprem yükünü önemli ölçüde azaltır ve bina içi ses-ısı konforunu maksimize eder."
      }
    ]
  },
  {
    "id": "harc-gazbeton-ytong",
    "name": "Gazbeton (Ytong) Örgü Yapıştırıcı Harcı",
    "badge": "TS EN 998-2 Sınıf G-M10",
    "tag": "Gazbeton Tutkalı · M10",
    "deptId": "kabaMasonryPanel",
    "category": "gazbeton-harci",
    "thumb": "assets/kaba-official/harc-gazbeton-ytong.jpg",
    "desc": "Gazbeton ve Ytong duvar bloklarının 1–3 mm ince derz ile örülmesinde kullanılan, ısı köprüsü oluşturmayan polimer takviyeli hazır harç.",
    "meta": [
      "G-M10 İnce Derz Harcı",
      "≥ 10.0 N/mm² Dayanım",
      "25 kg Kraft Torba"
    ],
    "coverage": "~3.5 kg/m² (10 cm blok)",
    "sizes": [
      "25 kg Kraft Torba",
      "1 Palet (48 Torba / 1.2 Ton)"
    ],
    "specs": {
      "standard": "TS EN 998-2 Sınıf G-M10",
      "packaging": "25 kg Kraft Torba",
      "consumption": "~3.5 kg/m² (10 cm)",
      "mixingRatio": "6.0 – 6.5 lt su / 25 kg",
      "potLife": "Kap ömrü: 3 saat · Düzeltme: 15 dk",
      "logistics": "Urla & Balçova Stok"
    },
    "accordions": [
      {
        "title": "1-3 mm İnce Derz ile Sıfır Isı Köprüsü",
        "body": "Geleneksel harçlara göre 5 kat daha ince derz oluşturarak binanın dış cephe ısı kayıplarını minimuma indirir."
      }
    ]
  },
  {
    "id": "tugla-13-5-yatay-delikli",
    "name": "13.5'lik Yatay Delikli Duvar Tuğlası",
    "badge": "TS EN 771-1 Kategori II",
    "tag": "13.5 Duvar Tuğlası",
    "deptId": "kabaMasonryPanel",
    "category": "tugla-bims",
    "thumb": "assets/kaba-official/tugla-13-5-yatay-delikli.jpg",
    "desc": "Konut ve villa projelerinde iç ve dış duvar örme imalatlarında kullanılan, pişmiş kilden yüksek basınç dayanımlı 13.5'lik delikli tuğla.",
    "meta": [
      "190×190×135 mm Ebat",
      "Kat. II Delikli Tuğla",
      "Palet: 390 Adet"
    ],
    "coverage": "1 m² duvar = ~25 adet tuğla",
    "sizes": [
      "1 Palet (390 Adet / ~15.6 m²)",
      "Kamyon Bazı (~4.000 Adet)"
    ],
    "specs": {
      "standard": "TS EN 771-1",
      "packaging": "390 Adet Paletli",
      "consumption": "~25 adet / m²",
      "mixingRatio": "Çimento-kum harcı ile",
      "potLife": "Kalıcı yapı elemanı",
      "logistics": "Damperli / Vinçli Palet İndirme"
    },
    "accordions": [
      {
        "title": "Doğal Kil ile Yüksek Isı Depolama",
        "body": "Geleneksel pişmiş kil yapısı duvarların nefes almasını sağlar ve yaz-kış dengeli iç ortam sıcaklığı sunar."
      }
    ]
  },
  {
    "id": "harc-hazir-sap-c20",
    "name": "Hazır Kuru Zemin Şap Harcı C20-C25",
    "badge": "TS EN 13813 CT-C20-F4",
    "tag": "Hazır Kuru Şap · C20",
    "deptId": "kabaMasonryPanel",
    "category": "hazir-sap-harci",
    "thumb": "assets/kaba-official/harc-hazir-sap-c20.jpg",
    "desc": "Şantiyede kum yığma ve eleme alanı olmayan projelerde, mikserle su katılarak doğrudan dökülen helikopterli ve mastarlı hazır şap harcı.",
    "meta": [
      "CT-C20-F4 Sınıfı",
      "~18-20 kg/m² Sarfiyat",
      "25 kg Kraft Torba"
    ],
    "coverage": "~18.0 – 20.0 kg/m² (1 cm)",
    "sizes": [
      "25 kg Torba",
      "1 Palet (48 Torba / 1.2 Ton)"
    ],
    "specs": {
      "standard": "TS EN 13813",
      "packaging": "25 kg Torba",
      "consumption": "18 – 20 kg/m² (1 cm)",
      "mixingRatio": "3.5 – 4.0 lt su / 25 kg",
      "potLife": "Kap ömrü: 90 dk · Yaya trafiği: 24 saat",
      "logistics": "Balçova & Urla Depo Stok"
    },
    "accordions": [
      {
        "title": "Temiz Şantiye ve Garantili Mukavemet",
        "body": "Özellikle site içi villa ve kat tadilatlarında dışarıdan kum çekmeden temiz ve hızlı şap dökümü sağlar."
      }
    ]
  },
  {
    "id": "demir-nervurlu-b500c",
    "name": "Nervürlü İnşaat Demiri (B500C)",
    "badge": "TS 708 B500C",
    "tag": "B500C Nervürlü Demir",
    "deptId": "kabaSteelPanel",
    "category": "insaat-demiri",
    "thumb": "assets/kaba-official/demir-nervurlu-b500c.jpg",
    "desc": "Temel, kolon, kiriş ve perde betonarmede kullanılan, yüksek akma sınırına (≥500 MPa) ve deprem şartnamesine tam uyumlu B500C nervürlü inşaat demiri.",
    "meta": [
      "B500C Deprem Standardı",
      "Ø8 – Ø32 mm Çap",
      "12 Metre Bağ Sevk"
    ],
    "coverage": "Statik projeye göre tonaj hesabı",
    "sizes": [
      "Ø8 mm (Bağ: ~2 Ton / 1 Çubuk: 4.74 kg)",
      "Ø10 mm (Bağ: ~2 Ton / 1 Çubuk: 7.40 kg)",
      "Ø12 mm (Bağ: ~2 Ton / 1 Çubuk: 10.66 kg)",
      "Ø14 mm / Ø16 mm / Ø20 mm (12 Metre)"
    ],
    "specs": {
      "standard": "TS 708 / EN 10080 B500C",
      "packaging": "Standart 12 Metre Bağlar",
      "consumption": "Statik proje metrajına göre",
      "mixingRatio": "Betonarme donatısı",
      "potLife": "Kalıcı taşıyıcı donatı",
      "logistics": "Urla Depo Çıkışlı Vinçli Kamyon / Tır"
    },
    "accordions": [
      {
        "title": "Deprem Yönetmeliğine %100 Uyum",
        "body": "B500C sınıfı yüksek sünek çelik, deprem anında ani kopma yapmadan esneyerek can ve bina güvenliğini korur."
      }
    ]
  },
  {
    "id": "celik-hasir-q131-q188",
    "name": "Çelik Hasır Donatı Levhası (Q & R Tipi)",
    "badge": "TS 4559 B500A Hasır",
    "tag": "Çelik Hasır · Q & R",
    "deptId": "kabaSteelPanel",
    "category": "celik-hasir",
    "thumb": "assets/kaba-official/celik-hasir-q131-q188.jpg",
    "desc": "Zemin betonları, döşemeler, tünel kalıp sistemleri ve perde duvarlarda işçilikten %50 tasarruf sağlayan punto kaynaklı hazır çelik hasır levhalar.",
    "meta": [
      "Q131 & Q188 Donatı",
      "2.15 × 5.00 m Levha",
      "St-IVb Çelik"
    ],
    "coverage": "1 levha = 10.75 m² (Bindirmeler dahil ~9.5 m²)",
    "sizes": [
      "Q131 Hasır (2.15×5.00 m - 21.6 kg/adet)",
      "Q188 Hasır (2.15×5.00 m - 31.0 kg/adet)",
      "Q221 Hasır (2.15×5.00 m - 36.4 kg/adet)"
    ],
    "specs": {
      "standard": "TS 4559 / DIN 488",
      "packaging": "50'lik / 100'lük Paketler",
      "consumption": "Döşeme alanına göre",
      "mixingRatio": "5 cm bindirme payı ile serilir",
      "potLife": "Kalıcı donatı",
      "logistics": "Urla Depo Vinçli Açık Kasa Sevk"
    },
    "accordions": [
      {
        "title": "İşçilik ve Zamandan %50 Tasarruf",
        "body": "Tek tek demir bağlama yerine tek hamlede 10 m² döşeme donatısı serilerek inşaat süresi kısaltılır."
      }
    ]
  },
  {
    "id": "bag-teli-tavli-siyah",
    "name": "Tavlı Siyah Demir Bağ Teli",
    "badge": "TS 2498 Tavlı Tel",
    "tag": "Tavlı Demir Bağ Teli",
    "deptId": "kabaSteelPanel",
    "category": "bag-teli-aksesuar",
    "thumb": "assets/kaba-official/bag-teli-tavli-siyah.jpg",
    "desc": "Demircilerin kolay bükebildiği, fırında özel tavlanmış, kopma direnci yüksek siyah inşaat demir bağlama teli.",
    "meta": [
      "1.2 – 1.5 mm Tel Çapı",
      "Fırın Tavlı Yumuşak Tel",
      "25 kg Kangal"
    ],
    "coverage": "1 ton demir için ~10-15 kg tel",
    "sizes": [
      "25 kg Kangal Bağ",
      "1 Palet (40 Kangal / 1 Ton)"
    ],
    "specs": {
      "standard": "TS 2498",
      "packaging": "25 kg Kangal",
      "consumption": "~12 kg / ton demir",
      "mixingRatio": "Demirci kerpeteni ile",
      "potLife": "Şantiye sarf malzemesi",
      "logistics": "Günlük Stoktan Sevk"
    },
    "accordions": [
      {
        "title": "Kırılmayan Süper Yumuşak Doku",
        "body": "Özel tavlama teknolojisi sayesinde büküm sırasında kopmaz ve demir düğümlerinin sıkı kalmasını sağlar."
      }
    ]
  },
  {
    "id": "plywood-hus-film-kapli",
    "name": "18 mm Huş (Birch) Film Kaplı Kalıp Plywood",
    "badge": "EN 636-3 / EN 314-2",
    "tag": "Huş Plywood · 18 mm",
    "deptId": "kabaFormworkPanel",
    "category": "plywood-kalip",
    "thumb": "assets/kaba-official/plywood-hus-film-kapli.jpg",
    "desc": "Brüt beton yüzeyler, perde duvar ve döşeme kalıplarında 40+ kez tekrar kullanım ömrü sunan 120 gr/m² fenolik film kaplı saf Rus Huş kontraplak.",
    "meta": [
      "18 mm / 13 Katman Huş",
      "1250×2500 mm Plaka",
      "120 g/m² Fenolik Film"
    ],
    "coverage": "1 plaka = 3.125 m² kalıp yüzeyi",
    "sizes": [
      "18 mm Huş Plaka (1250×2500 mm - ~32 kg)",
      "21 mm Huş Plaka (1250×2500 mm - ~37 kg)",
      "1 Palet (50 Plaka / 156.25 m²)"
    ],
    "specs": {
      "standard": "EN 636-3 / EN 314-2 Sınıf 3",
      "packaging": "50 Adet Palet",
      "consumption": "Kalıp metrajına göre",
      "mixingRatio": "Kalıp yağı ile birlikte kullanılır",
      "potLife": "40+ kalıp devri",
      "logistics": "Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ayna Gibi Pürüzsüz Brüt Beton",
        "body": "Beton suyunu emmez, döküm sonrasında yüzeyde sıva gerektirmeyen ayna parlaklığında brüt beton netliği bırakır."
      }
    ]
  },
  {
    "id": "kereste-cam-insaat",
    "name": "5×10 & 10×10 Çam İnşaat Kalıp Kerestesi",
    "badge": "Yerli & İthal Sarıçam",
    "tag": "Çam Kereste · 5×10",
    "deptId": "kabaFormworkPanel",
    "category": "insaat-kerestesi",
    "thumb": "assets/kaba-official/kereste-cam-insaat.jpg",
    "desc": "Kalıp altı ızgarası, döşeme mahyası ve iskele kurumu için eğrilik ve budak kontrolü yapılmış dayanıklı çam inşaat kerestesi.",
    "meta": [
      "5×10 & 10×10 cm Kalas",
      "3 - 4 Metre Fırınlı Çam",
      "m³ / Bağ Sevk"
    ],
    "coverage": "Metreküp (m³) bazlı hesap",
    "sizes": [
      "5×10 cm (3 ve 4 Metre Boy)",
      "10×10 cm Kalas (3 ve 4 Metre Boy)",
      "1 Paket (~1.5 - 2 m³ Bağ)"
    ],
    "specs": {
      "standard": "TS 1265 İnşaat Kerestesi",
      "packaging": "Bağlı Paketler",
      "consumption": "Kalıp ızgara sıklığına göre",
      "mixingRatio": "İnşaat çivisi ile montaj",
      "potLife": "Çoklu kullanım",
      "logistics": "Urla Depo Kamyonet / Kamyon Sevk"
    },
    "accordions": [
      {
        "title": "Eğrilmeyen Düzgün Statik Taşıyıcı",
        "body": "Döşeme dökümlerinde bükülme ve sehim yapmaz, kalıp kotunun milimetrik kalmasını güvenceye alır."
      }
    ]
  },
  {
    "id": "levha-osb-3-suya-dayanikli",
    "name": "OSB-3 Suya Dayanıklı Ahşap Levha",
    "badge": "EN 300 OSB-3 Standart",
    "tag": "OSB-3 Neme Dayanıklı",
    "deptId": "kabaFormworkPanel",
    "category": "osb-levha",
    "thumb": "assets/kaba-official/levha-osb-3-suya-dayanikli.jpg",
    "desc": "Çatı altı kiremit ve şıngıl altı kaplamalarında, ahşap karkas yapılarda ve prefabrik bölmelerde neme dayanıklı yüksek mukavemetli yönlendirilmiş yonga levha.",
    "meta": [
      "11 / 15 / 18 mm OSB-3",
      "1220×2440 mm Ebat",
      "EN 300 Tip 3 Levha"
    ],
    "coverage": "1 plaka = 2.97 m²",
    "sizes": [
      "11 mm OSB-3 (Palet: 80 Plaka / 238 m²)",
      "15 mm OSB-3 (Palet: 60 Plaka / 178 m²)",
      "18 mm OSB-3 (Palet: 50 Plaka / 148 m²)"
    ],
    "specs": {
      "standard": "EN 300 Tip OSB-3",
      "packaging": "Paletli",
      "consumption": "Kaplama alanına göre",
      "mixingRatio": "Vidalı / Çivili montaj",
      "potLife": "Ömür boyu çatı altı koruma",
      "logistics": "Balçova & Urla Stok"
    },
    "accordions": [
      {
        "title": "Çatılarda Şıngıl ve Membran İçin Sağlam Taban",
        "body": "Yüksek yük taşıma kapasitesi ile çatı ustalarının üzerinde güvenle yürümesini ve çivi tutma mukavemetini sağlar."
      }
    ]
  },
  {
    "id": "membran-bitumlu-polyester-3mm",
    "name": "3 mm Polyester Keçeli Bitümlü Su İzolasyon Membranı",
    "badge": "TS EN 13707 -10°C / -20°C",
    "tag": "3 mm Bitümlü Membran",
    "deptId": "kabaMembranePanel",
    "category": "bitumlu-membran",
    "thumb": "assets/kaba-official/membran-bitumlu-polyester-3mm.jpg",
    "desc": "Polyester keçe taşıyıcılı, APP polimer modifiyeli, şaloma alevi ile uygulanan yüksek çekme ve yırtılma mukavemetli su yalıtım örtüsü.",
    "meta": [
      "Polyester Keçe Donatılı",
      "-10°C / -20°C Soğuk Büküm",
      "1×10 m Rulo (10 m²)"
    ],
    "coverage": "1 rulo = 10 m² (10 cm bindirme ile ~9 m²)",
    "sizes": [
      "1 Rulo (1×10 Metre / ~35 kg)",
      "1 Palet (30 Rulo / 300 m²)"
    ],
    "specs": {
      "standard": "TS EN 13707 / CE Belgeli",
      "packaging": "30 Rulo / Palet",
      "consumption": "~1.1 m² / m² (Bindirmeler dahil)",
      "mixingRatio": "Şaloma ateşi ve bitüm astar ile",
      "potLife": "Kalıcı su izolasyonu",
      "logistics": "Urla & Balçova Depo Stok"
    },
    "accordions": [
      {
        "title": "Temel Bohçalamada Basınçlı Su Bariyeri",
        "body": "Zeminden gelen yeraltı sularının temel betonuna ve demire ulaşmasını %100 engelleyerek korozyonu önler."
      }
    ]
  },
  {
    "id": "membran-arduvazli-cati",
    "name": "4 mm Arduvazlı Mineral Taşlı Çatı Membranı",
    "badge": "TS EN 13707 Son Kat",
    "tag": "4 mm Arduvazlı Membran",
    "deptId": "kabaMembranePanel",
    "category": "arduvazli-membran",
    "thumb": "assets/kaba-official/membran-arduvazli-cati.jpg",
    "desc": "Eğimli çatılar, teraslar ve sundurmalarda üzeri kapatılmadan son kat olarak kullanılan, UV ışınlarına ve dona dayanıklı renkli arduvaz taşlı membran.",
    "meta": [
      "4.0 mm Mineral Taşlı",
      "Kırmızı & Yeşil Renk",
      "1×10 m Rulo (10 m²)"
    ],
    "coverage": "1 rulo = 10 m²",
    "sizes": [
      "Kırmızı Arduvazlı Rulo (1×10 m)",
      "Yeşil Arduvazlı Rulo (1×10 m)",
      "1 Palet (23 Rulo / 230 m²)"
    ],
    "specs": {
      "standard": "TS EN 13707",
      "packaging": "23 Rulo Palet",
      "consumption": "~1.1 m² / m²",
      "mixingRatio": "Şaloma ateşi ile ergitme yapıştırma",
      "potLife": "20+ yıl çatı ömrü",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "accordions": [
      {
        "title": "Üzerine Şap Gerektirmeyen Estetik Çatı",
        "body": "Doğal arduvaz mineral kaplaması sayesinde güneşin zararlı UV ışınlarını yansıtır ve çatıya şık renkli görünüm katar."
      }
    ]
  },
  {
    "id": "levha-kabarcikli-drenaj",
    "name": "HDPE Kabarcıklı Temel Drenaj Levhası",
    "badge": "TS EN 13252 Drenaj",
    "tag": "HDPE Drenaj Levhası",
    "deptId": "kabaMembranePanel",
    "category": "drenaj-levhasi",
    "thumb": "assets/kaba-official/levha-kabarcikli-drenaj.jpg",
    "desc": "Temel perde duvarlarına uygulanan bitümlü membranın hafriyat dolgusu sırasında taş ve moloz darbesiyle yırtılmasını önleyen yüksek yoğunluklu polietilen drenaj koruyucu.",
    "meta": [
      "400 & 500 g/m² Ağırlık",
      "8 mm Kabarcık Yüksekliği",
      "2×20 m Rulo (40 m²)"
    ],
    "coverage": "1 rulo = 40 m² perde koruma",
    "sizes": [
      "400 gr/m² Rulo (2×20 m / 40 m²)",
      "500 gr/m² Ağır Hizmet Rulo (2×20 m)",
      "1 Palet (12 Rulo / 480 m²)"
    ],
    "specs": {
      "standard": "TS EN 13252",
      "packaging": "Rulo",
      "consumption": "Perde duvar alanına göre",
      "mixingRatio": "Drenaj çivisi ve profili ile montaj",
      "potLife": "Toprak altı ömür boyu",
      "logistics": "Urla Depo Hazır Sevk"
    },
    "accordions": [
      {
        "title": "Hafriyat Dolgusunda İzolasyon Güvencesi",
        "body": "Geri dolgu yapılırken sivri taşların su yalıtım membranını delmesini engeller; 8 mm hava boşluğu ile duvarın kuru kalmasını sağlar."
      }
    ]
  }
];
  var DEPARTMENTS_DATA = [
  {
    "id": "kabaCementPanel",
    "short": "Torbalı Çimento & Bağlayıcı",
    "full": "Torbalı Çimento & Bağlayıcılar",
    "sub": "Portland CEM I 42.5 R, CEM II 32.5, Beyaz Çimento",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"3\" width=\"7\" height=\"7\"/><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\"/><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\"/><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\"/></svg>",
    "pillsId": "cementMenuPills"
  },
  {
    "id": "kabaPlasterPanel",
    "short": "Yapı Alçısı & Sıva",
    "full": "Yapı Alçısı & Sıva Grubu",
    "sub": "Perlitli sıva, saten perdah, makine sıvası",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z\"/></svg>",
    "pillsId": "plasterMenuPills"
  },
  {
    "id": "kabaAggregatesPanel",
    "short": "Şap Kumu & Agrega",
    "full": "Şap Kumu, Çakıl & Agrega",
    "sub": "0-3 mm şap kumu, 0-5 mm sıva kumu, mıcır",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z\"/></svg>",
    "pillsId": "aggregatesMenuPills"
  },
  {
    "id": "kabaMasonryPanel",
    "short": "Gazbeton & Tuğla",
    "full": "Gazbeton, Tuğla & Duvar Blokları",
    "sub": "Ytong bloklar, gazbeton tutkalı, 13.5'lik tuğla",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M2 20h20\"/><path d=\"m5 16 3-3\"/><path d=\"M9 12l8-8 4 4-8 8\"/><path d=\"m14 7 3 3\"/></svg>",
    "pillsId": "masonryMenuPills"
  },
  {
    "id": "kabaSteelPanel",
    "short": "Demir & Hasır Çelik",
    "full": "İnşaat Demiri & Hasır Çelik Donatı",
    "sub": "Ø8-Ø32 Nervürlü demir B500C, Q131 çelik hasır",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"4\" y1=\"21\" x2=\"4\" y2=\"14\"/><line x1=\"4\" y1=\"10\" x2=\"4\" y2=\"3\"/><line x1=\"12\" y1=\"21\" x2=\"12\" y2=\"12\"/><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"3\"/><line x1=\"20\" y1=\"21\" x2=\"20\" y2=\"16\"/><line x1=\"20\" y1=\"12\" x2=\"20\" y2=\"3\"/><line x1=\"1\" y1=\"14\" x2=\"7\" y2=\"14\"/><line x1=\"9\" y1=\"8\" x2=\"15\" y2=\"8\"/><line x1=\"17\" y1=\"16\" x2=\"23\" y2=\"16\"/></svg>",
    "pillsId": "steelMenuPills"
  },
  {
    "id": "kabaFormworkPanel",
    "short": "Kalıp & Plywood",
    "full": "Kalıp, Kereste & Huş Plywood",
    "sub": "18/21mm Huş Plywood, 5x10 kereste, OSB-3",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"/><line x1=\"3\" y1=\"9\" x2=\"21\" y2=\"9\"/><line x1=\"9\" y1=\"21\" x2=\"9\" y2=\"9\"/></svg>",
    "pillsId": "formworkMenuPills"
  },
  {
    "id": "kabaMembranePanel",
    "short": "İzolasyon Membranı",
    "full": "Temel & Çatı İzolasyon Membranları",
    "sub": "3mm/4mm bitümlü membran, arduvazlı membran",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"/></svg>",
    "pillsId": "membraneMenuPills"
  },
  {
    "id": "kabaSimulatorPanel",
    "short": "Harç Simülatörü",
    "full": "Akıllı Şantiye Harç Simülatörü",
    "sub": "Şap, sıva ve duvar harcı torba hesaplayıcı",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M13 2L3 14h9l-1 8 10-12h-9l1-8z\"/></svg>",
    "pillsId": "simMenuPills"
  },
  {
    "id": "kabaLogisticsPanel",
    "short": "Şantiye Lojistiği",
    "full": "İzmir – Çeşme Şantiye Lojistiği",
    "sub": "Urla Depo damperli & vinçli filo ring seferi",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"1\" y=\"3\" width=\"15\" height=\"13\"/><polygon points=\"16 8 20 8 23 11 23 16 16 16 16 8\"/><circle cx=\"5.5\" cy=\"18.5\" r=\"2.5\"/><circle cx=\"18.5\" cy=\"18.5\" r=\"2.5\"/></svg>",
    "pillsId": "logisticsMenuPills"
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

  var currentActiveTab = "kabaCementPanel";
  var currentProduct = null;
  var selectedSize = "";

  var panels = {};
  DEPARTMENTS_DATA.forEach(function(d) {
    panels[d.id] = document.getElementById(d.id);
  });

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

  if (header && window.MutationObserver) {
    var headerObserver = new MutationObserver(function() {
      syncSubnavPin();
    });
    headerObserver.observe(header, { attributes: true, attributeFilter: ["class"] });
  }

  window.addEventListener("scroll", syncSubnavPin, { passive: true });
  window.addEventListener("resize", function() {
    initialSubnavTop = getSubnavOrigin();
    syncSubnavPin();
  }, { passive: true });

  window.addEventListener("load", function() {
    initialSubnavTop = getSubnavOrigin();
    syncSubnavPin();
  });

  function switchTab(tabId) {
    if (!panels[tabId]) return;
    currentActiveTab = tabId;

    subnavLinks.forEach(function(link) {
      var match = (link.getAttribute("data-target") === tabId);
      link.classList.toggle("active", match);
      link.setAttribute("aria-selected", match ? "true" : "false");
      if (match && typeof link.scrollIntoView === "function") {
        link.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    });

    Object.keys(panels).forEach(function(k) {
      if (panels[k]) {
        if (k === tabId) {
          panels[k].style.display = "";
          panels[k].classList.add("active");
        } else {
          panels[k].style.display = "none";
          panels[k].classList.remove("active");
        }
      }
    });

    var dept = DEPARTMENTS_DATA.find(function(d) { return d.id === tabId; });
    if (dept && deptTriggerLabel) {
      deptTriggerLabel.textContent = dept.short;
    }

    renderDeptDrawer(tabId);
    syncMobileFilterRail(tabId);
  }

  subnavLinks.forEach(function(link) {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      var target = link.getAttribute("data-target");
      if (target) {
        switchTab(target);
        var origin = getSubnavOrigin();
        if ((window.pageYOffset || document.documentElement.scrollTop) > origin) {
          window.scrollTo({ top: origin - getHeaderHeight(), behavior: "smooth" });
        }
      }
    });
  });

  function renderDeptDrawer(activeId) {
    if (!deptList) return;
    deptList.innerHTML = "";

    DEPARTMENTS_DATA.forEach(function(dept) {
      var btn = document.createElement("button");
      btn.type = "button";
      var isSelected = (dept.id === activeId);
      btn.className = "pv-drawer-item" + (isSelected ? " is-selected" : "");
      btn.setAttribute("role", "button");
      btn.innerHTML = 
        '<div class="pv-drawer-item-left">' +
          '<div class="pv-drawer-icon-box" aria-hidden="true">' + (dept.icon || '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>') + '</div>' +
          '<div class="pv-drawer-text-stack">' +
            '<span class="pv-drawer-item-title">' + dept.short + '</span>' +
            '<span class="pv-drawer-item-sub">' + dept.sub + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="pv-drawer-item-right" aria-hidden="true">' +
          '<svg class="pv-drawer-item-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>' +
        '</div>';

      btn.addEventListener("click", function() {
        switchTab(dept.id);
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
    if (!dept || !dept.pillsId) return;
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
    if (window.PervanSheet) {
      window.PervanSheet.open(deptDrawerBackdrop || "#pvDeptDrawerBackdrop");
    } else if (deptDrawerBackdrop) {
      deptDrawerBackdrop.classList.add("is-open");
      deptDrawerBackdrop.setAttribute("aria-hidden", "false");
    }
    if (deptTrigger) deptTrigger.setAttribute("aria-expanded", "true");
  }

  function closeDeptDrawer() {
    if (window.PervanSheet) {
      window.PervanSheet.close(deptDrawerBackdrop || "#pvDeptDrawerBackdrop");
    } else if (deptDrawerBackdrop) {
      deptDrawerBackdrop.classList.remove("is-open");
      deptDrawerBackdrop.setAttribute("aria-hidden", "true");
    }
    if (deptTrigger) deptTrigger.setAttribute("aria-expanded", "false");
  }

  if (deptDrawerBackdrop) {
    deptDrawerBackdrop.addEventListener("pv:sheet:close", function() {
      if (deptTrigger) deptTrigger.setAttribute("aria-expanded", "false");
    });
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

  // Category filter click handler within page body
  document.querySelectorAll(".pv-menu-pills .pv-menu-pill").forEach(function(pill) {
    pill.addEventListener("click", function() {
      var wrap = pill.closest(".pv-menu-pills");
      wrap.querySelectorAll(".pv-menu-pill").forEach(function(p) {
        p.classList.remove("active");
        p.setAttribute("aria-selected", "false");
      });
      pill.classList.add("active");
      pill.setAttribute("aria-selected", "true");
      if (typeof pill.scrollIntoView === "function") {
        pill.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }

      var filter = pill.getAttribute("data-filter");
      var panel = pill.closest(".pv-tab-panel") || pill.closest(".pv-dept-panel");
      if (!panel) return;

      panel.querySelectorAll(".pv-menu-row").forEach(function(row) {
        var cat = row.getAttribute("data-category");
        if (filter === "all" || cat === filter) {
          row.classList.remove("hidden");
        } else {
          row.classList.add("hidden");
        }
      });
    });
  });

  // Specimen Detail Modal Logic
  var modalBackdrop = document.getElementById("pvModalBackdrop");
  var modalCard = document.getElementById("pvModalCard");
  var modalCloseBtn = document.getElementById("pvModalCloseBtn");
  var modalHandleZone = document.getElementById("modalHandleZone");
  var modalTopBar = document.getElementById("modalTopBar");
  var modalScrollArea = document.getElementById("modalScrollArea");
  var modalProductEyebrow = document.getElementById("modalProductEyebrow");
  var modalProductTitle = document.getElementById("modalProductTitle");
  var modalProductImg = document.getElementById("modalProductImg");
  var modalProductDesc = document.getElementById("modalProductDesc");
  var modalSizeTrack = document.getElementById("modalSizeTrack");
  var modalSpecStandard = document.getElementById("modalSpecStandard");
  var modalSpecConsumption = document.getElementById("modalSpecConsumption");
  var modalSpecPackaging = document.getElementById("modalSpecPackaging");
  var modalSpecStandardRow = document.getElementById("modalSpecStandardRow");
  var modalSpecPackagingRow = document.getElementById("modalSpecPackagingRow");
  var modalSpecMixing = document.getElementById("modalSpecMixing");
  var modalSpecPotLife = document.getElementById("modalSpecPotLife");
  var modalSpecLogistics = document.getElementById("modalSpecLogistics");
  var modalAccordions = document.getElementById("modalAccordions");
  var modalWaBtn = document.getElementById("modalWaBtn") || document.getElementById("modalWABtn");

  function openModal(productId) {
    var p = KABA_PRODUCTS_DATA.find(function(item) { return item.id === productId; });
    if (!p) return;
    currentProduct = p;

    if (modalProductTitle) modalProductTitle.textContent = p.name;
    if (modalProductEyebrow) modalProductEyebrow.textContent = p.badge ? ("PERVAN · " + p.badge) : "PERVAN · KABA YAPI & DAĞITIM";
    if (modalProductDesc) modalProductDesc.textContent = p.desc;

    /* Product Badges */
    var modalProductBadges = document.getElementById("modalProductBadges");
    if (modalProductBadges) {
      modalProductBadges.innerHTML = "";
      if (p.badge) {
        var b = document.createElement("span");
        b.className = "pv-specimen-badge";
        b.textContent = p.badge;
        modalProductBadges.appendChild(b);
      }
      if (p.meta && p.meta.length) {
        p.meta.forEach(function(m) {
          var mb = document.createElement("span");
          mb.className = "pv-specimen-badge-sub";
          mb.textContent = m;
          modalProductBadges.appendChild(mb);
        });
      }
    }

    if (modalProductImg) {
      modalProductImg.src = p.thumb;
      modalProductImg.alt = p.name;
    }

    /* Size / Ambalaj Chips */
    var modalPackagingSection = document.getElementById("modalPackagingSection");
    var modalSelectedSizeHint = document.getElementById("modalSelectedSizeHint");
    var modalSizeChips = document.getElementById("modalSizeChips");
    if (modalSizeChips) {
      modalSizeChips.innerHTML = "";
      var sizes = p.sizes || ["Standart Şantiye Ambalajı"];
      selectedSize = sizes[0];
      if (modalPackagingSection) modalPackagingSection.style.display = "";

      sizes.forEach(function(size, idx) {
        var chip = document.createElement("button");
        chip.type = "button";
        chip.className = "pv-size-chip" + (idx === 0 ? " active" : "");
        chip.textContent = size;
        chip.setAttribute("role", "radio");
        chip.setAttribute("aria-checked", idx === 0 ? "true" : "false");
        chip.addEventListener("click", function() {
          modalSizeChips.querySelectorAll(".pv-size-chip").forEach(function(c) {
            c.classList.remove("active");
            c.setAttribute("aria-checked", "false");
          });
          chip.classList.add("active");
          chip.setAttribute("aria-checked", "true");
          selectedSize = size;
          updateWhatsAppUrl();
          if (modalSelectedSizeHint) modalSelectedSizeHint.textContent = size;
        });
        modalSizeChips.appendChild(chip);
      });
      if (modalSelectedSizeHint) modalSelectedSizeHint.textContent = sizes[0];
    }

    /* Fallback Segmented Track */
    if (modalSizeTrack) {
      modalSizeTrack.innerHTML = "";
      var sizes = p.sizes || ["Standart Şantiye Ambalajı"];
      selectedSize = sizes[0];

      sizes.forEach(function(size, idx) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "pv-segmented-btn" + (idx === 0 ? " active" : "");
        btn.textContent = size;
        btn.setAttribute("role", "radio");
        btn.setAttribute("aria-checked", idx === 0 ? "true" : "false");
        btn.addEventListener("click", function() {
          modalSizeTrack.querySelectorAll(".pv-segmented-btn").forEach(function(b) {
            b.classList.remove("active");
            b.setAttribute("aria-checked", "false");
          });
          btn.classList.add("active");
          btn.setAttribute("aria-checked", "true");
          selectedSize = size;
          updateWhatsAppUrl();
        });
        modalSizeTrack.appendChild(btn);
      });
    }

    // Gauges
    if (modalSpecStandard) modalSpecStandard.textContent = p.badge || "TS EN Standart";
    if (modalSpecConsumption) modalSpecConsumption.textContent = p.coverage || "Proje Bazlı";
    if (modalSpecPackaging) modalSpecPackaging.textContent = (p.sizes && p.sizes[0]) ? p.sizes[0] : "Orijinal Ambalaj";

    // Specs Table
    var sp = p.specs || {};
    if (modalSpecStandardRow) modalSpecStandardRow.textContent = sp.standard || p.badge || "-";
    if (modalSpecPackagingRow) modalSpecPackagingRow.textContent = sp.packaging || (p.sizes ? p.sizes.join(", ") : "-");
    if (modalSpecMixing) modalSpecMixing.textContent = sp.mixingRatio || "-";
    if (modalSpecPotLife) modalSpecPotLife.textContent = sp.potLife || "-";
    if (modalSpecLogistics) modalSpecLogistics.textContent = sp.logistics || "Urla Ana Depo Paletli / Damperli Sevk";

    // Accordions
    if (modalAccordions) {
      modalAccordions.innerHTML = "";
      if (p.accordions && p.accordions.length) {
        p.accordions.forEach(function(acc, idx) {
          var accDiv = document.createElement("div");
          accDiv.className = "pv-accordion-item" + (idx === 0 ? " open" : "");
          accDiv.innerHTML = 
            '<button type="button" class="pv-accordion-btn" aria-expanded="' + (idx === 0 ? "true" : "false") + '">' +
              '<span>' + acc.title + '</span>' +
              '<svg class="pv-acc-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>' +
            '</button>' +
            '<div class="pv-accordion-body" style="' + (idx === 0 ? "display: block;" : "display: none;") + '">' +
              '<p>' + acc.body + '</p>' +
            '</div>';

          var btn = accDiv.querySelector(".pv-accordion-btn");
          var body = accDiv.querySelector(".pv-accordion-body");
          btn.addEventListener("click", function() {
            var isOpen = accDiv.classList.contains("open");
            accDiv.classList.toggle("open", !isOpen);
            btn.setAttribute("aria-expanded", !isOpen ? "true" : "false");
            body.style.display = !isOpen ? "block" : "none";
          });
          modalAccordions.appendChild(accDiv);
        });
      }
    }

    updateWhatsAppUrl();

    if (modalBackdrop) {
      modalBackdrop.classList.add("is-open");
      modalBackdrop.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    if (window.history && window.history.replaceState) {
      window.history.replaceState({ modal: true, id: productId }, "", "/urun/" + productId + ".html");
    }
  }

  
  // Canonical Share Button Listener
  var modalShareBtn = document.getElementById("modalShareBtn");
  var modalShareText = document.getElementById("modalShareText");
  if (modalShareBtn) {
    modalShareBtn.addEventListener("click", function() {
      var prod = (typeof currentProduct !== "undefined" && currentProduct) ? currentProduct : ((typeof currentModalProduct !== "undefined" && currentModalProduct) ? currentModalProduct : null);
      if (!prod || !prod.id) return;
      var shareUrl = window.location.origin + "/urun/" + prod.id + ".html";
      var shareData = {
        title: (prod.name || "") + " | Pervan",
        text: (prod.name || "") + " - " + (prod.desc || prod.sub || ""),
        url: shareUrl
      };

      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        navigator.share(shareData).catch(function() {});
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareUrl).then(function() {
          var shareIcon = modalShareBtn.querySelector(".pv-share-icon");
          var checkIcon = modalShareBtn.querySelector(".pv-check-icon");
          if (shareIcon) shareIcon.style.display = "none";
          if (checkIcon) checkIcon.style.display = "inline-block";
          if (modalShareText) modalShareText.textContent = "✓ Bağlantı Kopyalandı";
          setTimeout(function() {
            if (shareIcon) shareIcon.style.display = "inline-block";
            if (checkIcon) checkIcon.style.display = "none";
            if (modalShareText) modalShareText.textContent = "Paylaş";
          }, 2500);
        }).catch(function() {});
      }
    });
  }

  function closeModal() {
    if (modalBackdrop) {
      modalBackdrop.classList.remove("is-open");
      modalBackdrop.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (modalCard) {
        modalCard.style.transform = "";
        modalBackdrop.style.opacity = "";
      }
    }

    if (window.history && window.history.replaceState) {
      window.history.replaceState({}, "", "/kaba-yapi-cimento.html");
    }
  }

  function updateWhatsAppUrl() {
    if (!currentProduct || !modalWaBtn) return;
    var text = "Merhaba, Pervan Urla Depo çıkışlı " + currentProduct.name;
    if (selectedSize) {
      text += " (" + selectedSize + ")";
    }
    text += " için güncel şantiye palet / kamyon fiyatı ve sevkiyat takvimi hakkında bilgi almak istiyorum.";
    text += "\n\nÜrün Detayı: https://pervanyapi.com/urun/" + currentProduct.id + ".html";
    modalWaBtn.href = "https://wa.me/905323844497?text=" + encodeURIComponent(text);
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", function(e) {
      if (e.target === modalBackdrop) closeModal();
    });
  }
  window.addEventListener("keydown", function(e) {
    if (e.key === "Escape") closeModal();
  });

  // Row click listeners for Specimen Modal
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

  // Touch gesture physics for mobile bottom sheet dismissal
  var dragStartY = 0;
  var dragCurrentY = 0;
  var dragStartTime = 0;
  var isSheetDragging = false;
  var canDragFromScroll = false;

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

  function onDragStart(e) {
    if (!modalBackdrop.classList.contains("is-open")) return;
    var touch = e.touches ? e.touches[0] : e;
    dragStartY = touch.clientY;
    dragCurrentY = touch.clientY;
    dragStartTime = Date.now();
    isSheetDragging = false;
    canDragFromScroll = (modalScrollArea && modalScrollArea.scrollTop <= 0);
  }

  function onDragMove(e) {
    if (!modalBackdrop.classList.contains("is-open") || !dragStartY) return;
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

  // ==========================================================================
  // SPOTLIGHT COMMAND PALETTE ENGINE (⌘K / 26 Ürün Arama)
  // ==========================================================================
  var spotlightBackdrop = document.getElementById("pvSpotlightBackdrop");
  var spotlightTrigger = document.getElementById("pvSubnavSearchBtn");
  var spotlightCloseBtn = document.getElementById("pvSpotlightCloseBtn");
  var spotlightInput = document.getElementById("pvSpotlightInput");
  var spotlightResults = document.getElementById("pvSpotlightResults");
  var spotlightCount = document.getElementById("pvSpotlightCount");
  var spotlightSelectedIdx = -1;

  function normalizeTr(str) {
    if (!str) return "";
    return str
      .toString()
      .toLowerCase()
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/i̇/g, "i")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/[^a-z0-9]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function getProductDomain(deptId) {
    var d = DEPARTMENTS_DATA.find(function(item) { return item.id === deptId; });
    return d ? d.short : "Kaba Yapı";
  }

  function openSpotlight() {
    if (!spotlightBackdrop) return;
    spotlightBackdrop.classList.add("open");
    spotlightBackdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (spotlightInput) {
      spotlightInput.value = "";
      renderSpotlightInitial();
      setTimeout(function() { spotlightInput.focus(); }, 60);
    }
  }

  function closeSpotlight() {
    if (!spotlightBackdrop) return;
    spotlightBackdrop.classList.remove("open");
    spotlightBackdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (spotlightInput) spotlightInput.blur();
  }

  function renderSpotlightInitial() {
    spotlightSelectedIdx = -1;
    if (spotlightCount) spotlightCount.textContent = KABA_PRODUCTS_DATA.length + " Ürün Yayında";
    if (spotlightResults) {
      spotlightResults.innerHTML = '<div class="pv-spotlight-hint">' +
        '<span>İpucu: Çimento CEM I, Perlitli Alçı, Şap Kumu, Ytong Gazbeton veya ambalaj boyutuna göre arayabilirsiniz.</span>' +
        '</div>';
    }
  }

  function highlightSpotlightItem(items, newIdx) {
    if (!items.length) return;
    items.forEach(function(el) { el.classList.remove("is-selected"); });
    if (newIdx < 0) newIdx = items.length - 1;
    if (newIdx >= items.length) newIdx = 0;
    spotlightSelectedIdx = newIdx;
    items[newIdx].classList.add("is-selected");
    items[newIdx].scrollIntoView({ block: "nearest" });
  }

  function performSpotlightSearch(rawQuery) {
    var q = normalizeTr(rawQuery);
    if (!q || q.length < 2) {
      renderSpotlightInitial();
      return;
    }

    var words = q.split(" ").filter(Boolean);
    var matches = [];

    KABA_PRODUCTS_DATA.forEach(function(prod) {
      var haystack = normalizeTr([
        prod.name || "",
        prod.tag || "",
        prod.desc || "",
        prod.category || "",
        (prod.meta || []).join(" "),
        (prod.sizes || []).join(" ")
      ].join(" "));

      var matched = words.every(function(w) {
        return haystack.indexOf(w) !== -1;
      });

      if (matched) {
        matches.push(prod);
      }
    });

    if (spotlightCount) {
      spotlightCount.textContent = matches.length + " Ürün Bulundu";
    }

    if (!spotlightResults) return;

    if (matches.length === 0) {
      spotlightSelectedIdx = -1;
      var waText = encodeURIComponent("Merhaba, Kaba Yapı kataloğunuzda '" + rawQuery + "' aradım ancak bulamadım. Bu malzeme hakkında Urla Ana Depo stok ve paletli/kamyon sevkiyat bilgisi alabilir miyim?");
      spotlightResults.innerHTML = '<div class="pv-spotlight-empty-box">' +
        '<div class="pv-spotlight-empty-title">Eşleşen ürün bulunamadı</div>' +
        '<p class="pv-spotlight-empty-desc">Aradığınız ürün standart katalog dışı veya özel şantiye siparişi olabilir. Urla lojistik merkezimize doğrudan danışabilirsiniz:</p>' +
        '<a href="https://wa.me/905323844497?text=' + waText + '" target="_blank" rel="noopener" class="pv-btn-primary" style="max-width: 320px; font-size: 12px; padding: 11px 18px; min-height: 42px;">' +
        'WhatsApp ile Malzeme Danış' +
        '</a>' +
        '</div>';
      return;
    }

    var html = "";
    matches.forEach(function(p, idx) {
      var domain = getProductDomain(p.deptId);
      var subText = (p.sizes && p.sizes.length) ? p.sizes.join(", ") : (p.tag || "");

      html += '<div class="pv-spotlight-item' + (idx === 0 ? ' is-selected' : '') + '" data-product-id="' + p.id + '" role="option" tabindex="-1">';
      html += '  <div class="pv-spotlight-item-left">';
      html += '    <div class="pv-spotlight-thumb">';
      html += '      <img src="' + p.thumb + '" alt="' + p.name + '" loading="lazy" decoding="async" />';
      html += '    </div>';
      html += '    <div class="pv-spotlight-item-info">';
      html += '      <div class="pv-spotlight-item-title-row">';
      html += '        <span class="pv-spotlight-item-name">' + p.name + '</span>';
      html += '        <span class="pv-spotlight-item-domain">' + domain + '</span>';
      html += '      </div>';
      html += '      <div class="pv-spotlight-item-sub">' + subText + '</div>';
      html += '    </div>';
      html += '  </div>';
      html += '  <div class="pv-spotlight-item-right">';
      html += '    <span class="pv-spotlight-item-action">İncele &rarr;</span>';
      html += '  </div>';
      html += '</div>';
    });

    spotlightResults.innerHTML = html;
    spotlightSelectedIdx = 0;

    var items = spotlightResults.querySelectorAll(".pv-spotlight-item");
    items.forEach(function(item, idx) {
      item.addEventListener("mouseenter", function() {
        highlightSpotlightItem(items, idx);
      });
      item.addEventListener("click", function() {
        var pid = item.getAttribute("data-product-id");
        closeSpotlight();
        var p = KABA_PRODUCTS_DATA.find(function(it) { return it.id === pid; });
        if (p && p.deptId && p.deptId !== currentActiveTab) {
          switchTab(p.deptId);
        }
        openModal(pid);
      });
    });
  }

  if (spotlightTrigger) {
    spotlightTrigger.addEventListener("click", openSpotlight);
  }
  if (spotlightCloseBtn) {
    spotlightCloseBtn.addEventListener("click", closeSpotlight);
  }
  if (spotlightBackdrop) {
    spotlightBackdrop.addEventListener("click", function(e) {
      if (e.target === spotlightBackdrop) closeSpotlight();
    });
  }

  if (spotlightInput) {
    var spotlightDebounce;
    spotlightInput.addEventListener("input", function() {
      clearTimeout(spotlightDebounce);
      spotlightDebounce = setTimeout(function() {
        performSpotlightSearch(spotlightInput.value);
      }, 90);
    });

    spotlightInput.addEventListener("keydown", function(e) {
      var items = spotlightResults ? spotlightResults.querySelectorAll(".pv-spotlight-item") : [];
      if (e.key === "ArrowDown") {
        e.preventDefault();
        highlightSpotlightItem(items, spotlightSelectedIdx + 1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        highlightSpotlightItem(items, spotlightSelectedIdx - 1);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (items.length && spotlightSelectedIdx >= 0 && items[spotlightSelectedIdx]) {
          var pid = items[spotlightSelectedIdx].getAttribute("data-product-id");
          closeSpotlight();
          var p = KABA_PRODUCTS_DATA.find(function(it) { return it.id === pid; });
          if (p && p.deptId && p.deptId !== currentActiveTab) {
            switchTab(p.deptId);
          }
          openModal(pid);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        closeSpotlight();
      }
    });
  }

  window.addEventListener("keydown", function(e) {
    var isTyping = e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.isContentEditable);
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      if (spotlightBackdrop && spotlightBackdrop.classList.contains("open")) {
        closeSpotlight();
      } else {
        openSpotlight();
      }
    } else if (e.key === "/" && !isTyping && !e.metaKey && !e.ctrlKey) {
      e.preventDefault();
      openSpotlight();
    } else if (e.key === "Escape" && spotlightBackdrop && spotlightBackdrop.classList.contains("open")) {
      closeSpotlight();
    }
  });

  // 3. Interactive Harç Simülatörü Engine (Panel 8)
  var simTypes = document.querySelectorAll(".pv-trade-sim-type-btn");
  var simAreaRange = document.getElementById("simAreaRange");
  var simThickRange = document.getElementById("simThickRange");
  var simAreaDisplay = document.getElementById("simAreaDisplay");
  var simThickDisplay = document.getElementById("simThickDisplay");
  var simOutCement = document.getElementById("simOutCement");
  var simOutSand = document.getElementById("simOutSand");
  var simOutWater = document.getElementById("simOutWater");
  var simOutTruck = document.getElementById("simOutTruck");
  var simWaCta = document.getElementById("simWaCta");

  var activeMix = {
    name: "Zemin Şapı",
    cRatio: 0.32,
    sRatio: 1.15,
    wRatio: 8
  };

  function updateSimCalc() {
    if (!simAreaRange || !simThickRange) return;
    var area = parseFloat(simAreaRange.value) || 50;
    var thick = parseFloat(simThickRange.value) || 5.0;

    if (simAreaDisplay) simAreaDisplay.textContent = area + " m²";
    if (simThickDisplay) simThickDisplay.textContent = thick.toFixed(1) + " cm";

    var volM3 = area * (thick / 100.0);

    var cementBags = Math.ceil(volM3 * activeMix.cRatio * 20);
    if (cementBags < 1) cementBags = 1;

    var sandBags = Math.ceil(volM3 * activeMix.sRatio * 25);
    if (sandBags < 1) sandBags = 1;

    var waterLiters = Math.round(cementBags * activeMix.wRatio);

    var totalWeightTons = ((cementBags * 50) + (sandBags * 40)) / 1000.0;
    var truckName = "Transit Kamyonet (1–3 Ton)";
    if (totalWeightTons > 12) {
      truckName = "Damperli Kamyon / Tır (15+ Ton)";
    } else if (totalWeightTons > 5) {
      truckName = "Vinçli Ağır Kamyon (8–10 Ton)";
    } else if (totalWeightTons > 2.5) {
      truckName = "Damperli Kamyon (4–6 Ton)";
    }

    if (simOutCement) simOutCement.innerHTML = cementBags + ' <small>Torba (50kg)</small>';
    if (simOutSand) simOutSand.innerHTML = sandBags + ' <small>Çuval (40kg)</small>';
    if (simOutWater) simOutWater.innerHTML = waterLiters + ' <small>Litre</small>';
    if (simOutTruck) simOutTruck.textContent = truckName;

    if (simWaCta) {
      var waMsg = "Merhaba, Urla Depo Harç Simülatörü ile hesapladığım " + activeMix.name + " (" + area + " m², " + thick.toFixed(1) + " cm kalınlık) için reçetem:\n- " + cementBags + " Torba Portland Çimento\n- " + sandBags + " Çuval 0-3 mm Şap Kumu\n- Lojistik Öneri: " + truckName + "\nŞantiye teslim palet fiyatı ve sevkiyat günü almak istiyorum.";
      simWaCta.href = "https://wa.me/905323844497?text=" + encodeURIComponent(waMsg);
    }
  }

  if (simTypes.length) {
    simTypes.forEach(function(btn) {
      btn.addEventListener("click", function() {
        simTypes.forEach(function(b) { b.classList.remove("active"); });
        btn.classList.add("active");
        activeMix.name = btn.getAttribute("data-mix-name") || "Zemin Şapı";
        activeMix.cRatio = parseFloat(btn.getAttribute("data-c-ratio")) || 0.32;
        activeMix.sRatio = parseFloat(btn.getAttribute("data-s-ratio")) || 1.15;
        activeMix.wRatio = parseFloat(btn.getAttribute("data-w-ratio")) || 8;
        updateSimCalc();
      });
    });
  }

  if (simAreaRange) simAreaRange.addEventListener("input", updateSimCalc);
  if (simThickRange) simThickRange.addEventListener("input", updateSimCalc);
  updateSimCalc();

  function checkDeepLink() {
    var params = new URLSearchParams(window.location.search);
    var pid = params.get("item") || params.get("product") || params.get("id");
    if (!pid && window.location.hash && window.location.hash.indexOf("#urun-") === 0) {
      pid = window.location.hash.replace("#urun-", "");
    }
    if (pid) {
      var p = KABA_PRODUCTS_DATA.find(function(item) { return item.id === pid; });
      if (p) {
        if (p.deptId && p.deptId !== currentActiveTab) {
          switchTab(p.deptId);
        }
        openModal(pid);
      }
    }
  }

  switchTab("kabaCementPanel");
  checkDeepLink();
  window.addEventListener("popstate", checkDeepLink);

})();
