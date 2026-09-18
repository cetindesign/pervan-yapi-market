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

/* 2. ARCHITECTURAL SUBNAV & ZERO-SCROLL ENGINE */
(function() {
  var DEPARTMENTS_DATA = [
  {
    "id": "wasteWaterPanel",
    "short": "PVC Atık Su & Drenaj",
    "full": "PVC Atık Su & Gider Drenajı",
    "sub": "Sukar lineer duş kanalı, sessiz PVC borular, yer & evye sifonları",
    "pillsId": "wasteMenuPills",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"3\" y=\"5\" width=\"18\" height=\"14\" rx=\"2\"/><line x1=\"3\" y1=\"12\" x2=\"21\" y2=\"12\"/></svg>"
  },
  {
    "id": "faucetShowerPanel",
    "short": "Armatür & Duş",
    "full": "Armatür, Batarya & Duş Sistemleri",
    "sub": "GPD kuğu evye, İtimat mix banyo, sürgülü duş setleri, musluklar",
    "pillsId": "faucetMenuPills",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M12 2v6m0 0a4 4 0 0 1 4 4v2H8v-2a4 4 0 0 1 4-4z\"/><circle cx=\"12\" cy=\"18\" r=\"1\"/></svg>"
  },
  {
    "id": "vitrifiyePanel",
    "short": "Rezervuar & Vitrifiye",
    "full": "Rezervuar, Klozet & Vitrifiye",
    "sub": "Visam TEOS gömme rezervuar, asma polipropilen, Creavit & Bien seramik",
    "pillsId": "vitrifiyeMenuPills",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"4\" y=\"4\" width=\"16\" height=\"12\" rx=\"2\"/><path d=\"M8 20h8M12 16v4\"/></svg>"
  },
  {
    "id": "bathroomAccPanel",
    "short": "Banyo Aksesuarları",
    "full": "Banyo Aksesuarları & Ev Donanımı",
    "sub": "ALZ paslanmaz kağıtlık & havluluk, Rulopa şampuanlık, BAY-T kurutmalık, Hanex takoz",
    "pillsId": "bathroomAccMenuPills",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><path d=\"M3 9h18M9 21V9\"/></svg>"
  },
  {
    "id": "valvesChemicalsPanel",
    "short": "Vana, Fleks & Kimyasal",
    "full": "Pirinç Vana, Fleks & Kimyasallar",
    "sub": "Tam geçişli pirinç vanalar, çelik fleksler, Mr. Caustic kostik, GTS-35 derz açıcı",
    "pillsId": "valvesChemicalsMenuPills",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 7v5l3 3\"/></svg>"
  }
];

  var TESISAT_PRODUCTS_DATA = [
  {
    "id": "sukar-rain-shower-sb5200",
    "name": "Sukar Rain Shower Set (SB.5200-01 Deluxe Paslanmaz Duş Kanalı)",
    "badge": "304 Paslanmaz Çelik Izgara",
    "tag": "Sukar SB.5200-01 Deluxe",
    "deptId": "wasteWaterPanel",
    "category": "sukar-drenaj",
    "thumb": "assets/tesisat/sukar-sb5200-deluxe.jpg",
    "desc": "Modern duşakabinlerde hemzemin duş drenajı için sulu ve susuz koku önleyici çift bariyerli, 360 derece dönebilen S tipi çıkış gövdeli Sukar Deluxe duş kanalı.",
    "meta": [
      "SB.5200-01 Deluxe Seri",
      "Sulu & Susuz Koku Klapesi",
      "304 Kalite Paslanmaz Çelik"
    ],
    "coverage": "Komple Montaj Seti (Yalıtım Etekli)",
    "sizes": [
      "33 cm Lineer Izgara Seti",
      "40 cm Lineer Izgara Seti",
      "50 cm Lineer Izgara Seti",
      "60 cm Lineer Izgara Seti",
      "80 cm Lineer Izgara Seti"
    ],
    "specs": {
      "standard": "TS EN 1253 Duş Kanalları Standardı",
      "packaging": "Kutulu Tam Set (Izgara, Sifon, Yalıtım Yastığı)",
      "consumption": "Her duş alanı için 1 adet",
      "mixingRatio": "Sürme su yalıtımı ile entegre etekli montaj",
      "potLife": "Korozyona dayanıklı 304 çelik",
      "logistics": "Balçova Mağaza Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Çift Bariyerli Akıllı Koku Önleyici",
        "body": "Giderde su varken su perdesiyle, su bittiğinde veya kuruduğunda yerçekimli mekanik klapeyle banyoya pis koku ve haşere girişini %100 engeller."
      },
      {
        "title": "360° Döner Kolay Bağlantı Gövdesi",
        "body": "Alttaki S tipi tahliye gövdesi 360 derece dönebildiğinden pimaş gider borusuna her yönden hatasız ve kasmadan bağlanır."
      }
    ]
  },
  {
    "id": "sukar-yer-sifonu-kokusuz",
    "name": "Sukar Paslanmaz Izgaralı Koku Önleyici Çekvalfli Yer Sifonu",
    "badge": "Mekanik Çekvalfli Klape",
    "tag": "Sukar Paslanmaz Sifon",
    "deptId": "wasteWaterPanel",
    "category": "yer-sifonu",
    "thumb": "assets/tesisat/sukar-yer-sifonu.jpg",
    "desc": "Banyo, balkon, çamaşır odası ve teras zeminlerinde su taşkınlarını önleyen, koku ve böcek girişini kapatan paslanmaz çelik çerçeveli Sukar yer sifonu.",
    "meta": [
      "Paslanmaz 304 Izgara",
      "Çekvalfli Koku Kapanı",
      "Ø50 / Ø70 Çıkış"
    ],
    "coverage": "Komple Sifon Takımı",
    "sizes": [
      "10 × 10 cm Paslanmaz (Ø50 Yandan Çıkış)",
      "10 × 10 cm Paslanmaz (Ø50 Alttan Çıkış)",
      "15 × 15 cm Paslanmaz (Ø70 Yandan Çıkış)"
    ],
    "specs": {
      "standard": "TS EN 1253",
      "packaging": "Adet",
      "consumption": "Islak hacim zemin süzgeci",
      "mixingRatio": "Şap betonu içine gömme",
      "potLife": "Ömür boyu koku izolasyonu",
      "logistics": "Stoktan Anında Sevk"
    },
    "accordions": [
      {
        "title": "Yüksek Boşaltma Kapasitesi",
        "body": "Geniş iç haznesi sayesinde dakikada 35 litreye kadar su deşarj edebilir, banyo yıkamalarında zeminde göllenme yapmaz."
      }
    ]
  },
  {
    "id": "pvc-atik-su-sessiz-boru",
    "name": "PVC Sessiz Atık Su & Pis Su Gider Borusu",
    "badge": "TS 275-1 / DIN 4102 B1",
    "tag": "PVC Atık Su Borusu",
    "deptId": "wasteWaterPanel",
    "category": "pvc-boru",
    "thumb": "assets/tesisat/pvc-atik-su-borusu.jpg",
    "desc": "Tuvalet, banyo, mutfak ve lavabo atık sularının ana kanalizasyona sessizce iletilmesini sağlayan contalı PVC atık su boruları.",
    "meta": [
      "Elastomerik Conta Contalı",
      "Pürüzsüz Akış Kanalı",
      "Ø50 – Ø150 mm Çaplar"
    ],
    "coverage": "1 Metre - 2 Metre - 3 Metre Boylar",
    "sizes": [
      "Ø50 mm (1 Metre)",
      "Ø75 mm (1 Metre)",
      "Ø100 mm (1 Metre)",
      "Ø100 mm (2 Metre)",
      "Ø125 mm (2 Metre)",
      "Ø150 mm (2 Metre)"
    ],
    "specs": {
      "standard": "TS 275-1 / EN 1329-1",
      "packaging": "Metrajlı Çubuklar",
      "consumption": "Pis su kolon ve daire içi gider projeleri",
      "mixingRatio": "Kaydırıcı conta sabunu ile geçme montaj",
      "potLife": "Kimyasallara ve deterjanlara tam direnç",
      "logistics": "Balçova Mağaza & Urla Depo Sevkiyat"
    },
    "accordions": [
      {
        "title": "Sızdırmazlık Güvencesi",
        "body": "Fabrikasyon yerleştirilmiş çift dudaklı conta yapısı basınçsız atık su tahliyesinde beton içine kaçak riskini sıfırlar."
      }
    ]
  },
  {
    "id": "pvc-dirsek-catal-reduksiyon",
    "name": "PVC Atık Su Dirsek (45°/87°), Tek Çatal & Redüksiyon Grubu",
    "badge": "Contalı Geçme Sistem",
    "tag": "PVC Ek Parça Grubu",
    "deptId": "wasteWaterPanel",
    "category": "pvc-ek-parca",
    "thumb": "assets/tesisat/pvc-ek-parca-grubu.jpg",
    "desc": "Gider hatlarının dönüş, birleşme ve çap değişim noktalarında tıkanmaları önleyen hidrodinamik eğimli PVC ek parçaları.",
    "meta": [
      "45° & 87° Dirsekler",
      "Tek Çatal & Çift Çatal",
      "Geniş Redüksiyon Çeşitleri"
    ],
    "coverage": "Adet / Koli",
    "sizes": [
      "Ø50 mm 87° Dirsek",
      "Ø75 mm 87° Dirsek",
      "Ø100 mm 87° Dirsek",
      "Ø100 / 50 mm Tek Çatal",
      "Ø100 / 75 mm Redüksiyon"
    ],
    "specs": {
      "standard": "TS EN 1329-1",
      "packaging": "Koli / Adet",
      "consumption": "Atık su kolon tesisatı",
      "mixingRatio": "Contalı geçmeli bağlantı",
      "potLife": "Korozyonsuz plastik gövde",
      "logistics": "Stoktan Anında Sevk"
    },
    "accordions": [
      {
        "title": "Gider Tıkanıklığını Önleyen İdeal Açı",
        "body": "Ana kolon bağlantılarında 45 derece çatal ve açık dirsek kullanımı katı atıkların geri tepmesini ve tıkanmasını engeller."
      }
    ]
  },
  {
    "id": "koruklu-lavabo-sifonu",
    "name": "Universal Körüklü Esnek Lavabo & Evye Sifonu (Krom Taslı)",
    "badge": "Krom Taslı & Koku Klapeli",
    "tag": "Esnek Körüklü Sifon",
    "deptId": "wasteWaterPanel",
    "category": "koruklu-sifon",
    "thumb": "assets/tesisat/koruklu-lavabo-sifonu.jpg",
    "desc": "TSA Tekinler, Şimşek (AC-002), DMR, Damlasu ve Akyüz marka pirinç vidalı krom taslı, bükülebilir koku kıvrımlı universal lavabo tahliye sifonu.",
    "meta": [
      "Krom Paslanmaz Süzgeç",
      "Bükülebilir Körük Boru",
      "1 1/4\" - 1 1/2\" Adaptör"
    ],
    "coverage": "Paketli Set",
    "sizes": [
      "1 1/4\" Krom Taslı Lavabo Sifonu",
      "1 1/2\" Körüklü Mutfak Evye Sifonu"
    ],
    "specs": {
      "standard": "TS EN 274",
      "packaging": "Poşetli Set (Conta ve Vidalar Dahil)",
      "consumption": "Lavabo ve mutfak evyeleri",
      "mixingRatio": "El ile montaj (alet gerektirmez)",
      "potLife": "Sıcak suya dayanıklı takviyeli körük",
      "logistics": "Balçova Mağaza Stok"
    },
    "accordions": [
      {
        "title": "Kolay 'S' Kavisli Koku Kapanı",
        "body": "Körüğe kolayca verilen 'S' şekli boru içinde sürekli su bırakarak kanalizasyon kokusunun lavabo deliğinden çıkmasını engeller."
      }
    ]
  },
  {
    "id": "gpd-mtb120-kugu-evye",
    "name": "GPD MTB120 Kuğu Borulu Mutfak Evye Bataryası",
    "badge": "GPD Kalite Güvencesi · 4.500 ₺",
    "tag": "GPD MTB120 · 4.500 ₺",
    "deptId": "faucetShowerPanel",
    "category": "gpd-evye",
    "thumb": "assets/tesisat/gpd-mtb120-evye.jpg",
    "desc": "GPD armatür güvencesiyle 360 derece döner yüksek kuğu borulu, kireç kırıcılı özel perlatörlü, sessiz su tasarruflu 35 mm seramik kartuşlu lüks mutfak evye bataryası.",
    "meta": [
      "Raf Fiyatı: 4.500 ₺",
      "360° Döner Kuğu Gövde",
      "35 mm Seramik Kartuş"
    ],
    "coverage": "Kutulu Montaj Seti (Çift Fleks Hortum Dahil)",
    "sizes": [
      "MTB120 Parlak Krom (4.500 ₺)",
      "MTB120 Mat Siyah Özel Seri"
    ],
    "specs": {
      "standard": "TS EN 817 / ISO 9001",
      "packaging": "Orijinal GPD Kutu (Fleks ve Somun Seti)",
      "consumption": "Mutfak evyeleri için 1 adet",
      "mixingRatio": "Tezgah üstü standart delik montajı",
      "potLife": "5 Yıl Garanti",
      "logistics": "Balçova Showroom Rafından Doğrudan Teslim"
    },
    "accordions": [
      {
        "title": "Yüksek Tencere ve Kap Yıkama Konforu",
        "body": "Yüksek kuğu boru tasarımı sayesinde derin tencere, fırın tepsisi ve büyük mutfak gereçleri evyeye rahatça sığar ve kolayca yıkanır."
      },
      {
        "title": "Su Tasarruflu Neoperl Kireç Kırıcı Perlatör",
        "body": "Hava karışımlı özel perlatörü suyun sıçramasını önler, kireç birikimini engeller ve konfordan ödün vermeden %40'a varan su tasarrufu sağlar."
      }
    ]
  },
  {
    "id": "itimat-klasik-lavabo-bataryasi",
    "name": "İtimat Pirinç Gövde Mix Banyo & Lavabo Batarya Serisi",
    "badge": "TS EN 817 Masif Pirinç Döküm",
    "tag": "İtimat Mix Batarya",
    "deptId": "faucetShowerPanel",
    "category": "itimat-banyo",
    "thumb": "assets/tesisat/itimat-mix-batarya.jpg",
    "desc": "Yerli tesisatın köklü markası İtimat güvencesiyle masif pirinç döküm gövdeli, çizilmeye dayanıklı krom kaplamalı banyo ve lavabo mikser bataryaları.",
    "meta": [
      "Ağır Tip Pirinç Döküm",
      "40 mm Kartuş",
      "Krom Parlak Yüzey"
    ],
    "coverage": "Kutulu Tam Montaj Seti",
    "sizes": [
      "İtimat Mix Aç-Kapa Lavabo Bataryası",
      "İtimat Mix Çift Çıkışlı Banyo Bataryası"
    ],
    "specs": {
      "standard": "TS EN 817",
      "packaging": "Kutulu",
      "consumption": "Banyo ve lavabo mikserleri",
      "mixingRatio": "Eksantrik ve rozet takımı dahil",
      "potLife": "Uzun ömürlü seramik disk",
      "logistics": "Balçova Mağaza Stok"
    },
    "accordions": [
      {
        "title": "Ağır Gövde ve Korozyon Direnci",
        "body": "İtimat bataryalar kurşunsuz yüksek saflıkta pirinç hammaddeden dökülür; kireçli şebeke suyunda delinme ve kararma yapmaz."
      }
    ]
  },
  {
    "id": "arteca-luks-batarya-serisi",
    "name": "Arteca Krom Aç-Kapa Lavabo ve Eviye Bataryası",
    "badge": "Modern Minimal Çizgiler",
    "tag": "Arteca Lüks Mix",
    "deptId": "faucetShowerPanel",
    "category": "arteca-mix",
    "thumb": "assets/tesisat/arteca-mix-batarya.jpg",
    "desc": "Zarif tasarımı, ergonomik kumanda kolu ve yumuşak açma-kapama sağlayan seramik kartuşu ile Arteca lavabo ve mutfak armatürleri.",
    "meta": [
      "Ergonomik Kumanda Kolu",
      "Sessiz Akış",
      "35 mm Seramik Disk"
    ],
    "coverage": "Kutulu Montaj Kiti",
    "sizes": [
      "Arteca Aç-Kapa Lavabo Bataryası",
      "Arteca Aç-Kapa Kuğu Eviye Bataryası"
    ],
    "specs": {
      "standard": "TS EN 817",
      "packaging": "Kutulu",
      "consumption": "Banyo / Mutfak",
      "mixingRatio": "Standart tezgah montajı",
      "potLife": "Garantili seramik kartuş",
      "logistics": "Stoktan Sevk"
    },
    "accordions": [
      {
        "title": "Pürüzsüz Krom Parlaklığı",
        "body": "Elektrolitik çok katmanlı nikel-krom kaplaması deterjan ve sabun lekelerine karşı dayanıklıdır, mikrofiber bezle kolayca parlar."
      }
    ]
  },
  {
    "id": "dus-seti-surgulu-mafsalli",
    "name": "Aces & Hemera & Şahinler Krom Sürgülü Duş Başlığı Seti",
    "badge": "3 Fonksiyonlu Paslanmaz Sürgü",
    "tag": "Sürgülü Duş Seti",
    "deptId": "faucetShowerPanel",
    "category": "surgulu-dus",
    "thumb": "assets/tesisat/surgulu-dus-seti.jpg",
    "desc": "Paslanmaz çelik sürgü borusu, 150 cm çift kenetli patlamaz spiral hortumu, silikon kireç temizleme uçlu 3 fonksiyonlu duş elciği içeren komple duş takımı.",
    "meta": [
      "Paslanmaz Çelik Boru",
      "150 cm Çift Kenetli Hortum",
      "Kireç Temizlemeli Elcik"
    ],
    "coverage": "Komple Askı ve Hortum Takımı",
    "sizes": [
      "65 cm Paslanmaz Çelik Sürgülü Set",
      "Mafsallı Askılı El Duşu Seti",
      "150 cm Ekstra Çift Kenetli Spiral Hortum"
    ],
    "specs": {
      "standard": "TS EN 1112 / TS EN 1113",
      "packaging": "Blister / Kutu Set",
      "consumption": "Duşakabin ve küvet alanları",
      "mixingRatio": "Duvara 2 vida ile kolay montaj",
      "potLife": "Bükülmeyen çift kenetli spiral",
      "logistics": "Balçova Mağaza Stok"
    },
    "accordions": [
      {
        "title": "Parmakla Kireç Temizleme",
        "body": "Yumuşak silikon nozullar üzerinde kireç biriktiğinde parmağınızı sürtmeniz tıkanıklığı anında açar, suyun debisini korur."
      }
    ]
  },
  {
    "id": "seramik-kartuslu-taharet-muslugu",
    "name": "TSA Tekinler & Aces Filtreli Seramik Kartuşlu Taharet Musluğu",
    "badge": "1/4 Tur Aç-Kapa Seramik",
    "tag": "Krom Taharet Musluğu",
    "deptId": "faucetShowerPanel",
    "category": "taharet-musluk",
    "thumb": "assets/tesisat/taharet-muslugu-seramik.jpg",
    "desc": "Klozet ve lavabo altlarında kullanılan, geleneksel contalı musluklar gibi damlatma yapmayan, çeyrek tur çevirmeli paslanmaz pirinç taharet musluğu.",
    "meta": [
      "1/4 Tur Çeyrek Aç-Kapa",
      "Pirinç Rozetli",
      "Filtreli & Standart Seçenek"
    ],
    "coverage": "Kutulu / Adet Satış",
    "sizes": [
      "3/8\" Filtreli Seramik Taharet Musluğu",
      "1/2\" Çamaşır Makinesi Musluğu",
      "Aces Paslanmaz Çelik Aynalı Musluk"
    ],
    "specs": {
      "standard": "TS EN 200",
      "packaging": "Kutulu Adet (Ayna Rozeti Dahil)",
      "consumption": "Klozet, lavabo ve rezervuar girişleri",
      "mixingRatio": "Teflon bant ile duvara vidalama",
      "potLife": "Damlatmaz seramik salmastra",
      "logistics": "Stoktan Anında Sevk"
    },
    "accordions": [
      {
        "title": "Entegre Paslanmaz Filtre Koruması",
        "body": "İçindeki mikro filtre şebekeden gelen kum ve taş parçacıklarını tutarak rezervuar şamandırası ve batarya kartuşunun bozulmasını önler."
      }
    ]
  },
  {
    "id": "visam-teos-gomme-rezervuar",
    "name": "Visam TEOS 3/6L Çift Kademeli Gömme Rezervuar (Tuğla / Alçıpan)",
    "badge": "Visam Kalite Güvencesi · 8 cm Slim",
    "tag": "Visam TEOS · 3/6L",
    "deptId": "vitrifiyePanel",
    "category": "visam-gomme",
    "thumb": "assets/tesisat/visam-teos-rezervuar.jpg",
    "desc": "8 cm ultra ince gövdesiyle banyolarda yer kazandıran, strafor terleme izolasyonlu, sessiz doldurma mekanizmalı ve çift kademeli Visam TEOS gömme rezervuar.",
    "meta": [
      "Visam TEOS Serisi",
      "3/6 L Su Tasarrufu",
      "8 cm İnce Gövde"
    ],
    "coverage": "Komple Montaj Karkası ve İç Takımı",
    "sizes": [
      "Tuğla Duvar İçi (8 cm Slim Gövde)",
      "Alçıpan Çelik Ayaklı Karkas Tipi"
    ],
    "specs": {
      "standard": "TS EN 14055 / DIN 19542",
      "packaging": "Orijinal Karton Kutu",
      "consumption": "Asma klozetler için",
      "mixingRatio": "Duvar içi harçlı veya alçıpan profiline montaj",
      "potLife": "10 Yıl Gövde Garantisi",
      "logistics": "Balçova & Urla Depo Stoktan Sevk"
    },
    "accordions": [
      {
        "title": "Terlemeye Karşı Strafor Gövde",
        "body": "Gövdeyi saran yüksek yoğunluklu polistiren strafor banyo sıcakken kışın soğuk su dolumunda gövdede terleme ve duvar içine su sızmasını engeller."
      },
      {
        "title": "Aletsiz Kolay Bakım & Servis",
        "body": "Kumanda paneli arkasındaki geniş servis penceresinden boşaltma ve doldurma grubu hiçbir el aleti kullanmadan çıkarılıp temizlenebilir."
      }
    ]
  },
  {
    "id": "visam-assos-kumanda-paneli",
    "name": "Visam ASSOS Çift Butonlu Mekanik Kumanda Paneli",
    "badge": "Parmak İzi Bırakmayan Yüzey",
    "tag": "Visam ASSOS Panel",
    "deptId": "vitrifiyePanel",
    "category": "visam-kumanda",
    "thumb": "assets/tesisat/visam-assos-panel.jpg",
    "desc": "Visam TEOS gömme rezervuar sistemleriyle tam uyumlu, 3 litre küçük ve 6 litre tam yıkama butonlarına sahip modern minimalist kumanda paneli.",
    "meta": [
      "Mat Krom / Parlak Krom / Beyaz",
      "Hafif Mekanik Basma Hissi",
      "Kolay Geçmeli Montaj"
    ],
    "coverage": "Kutulu Montaj Kiti",
    "sizes": [
      "ASSOS Parlak Krom Panel",
      "ASSOS Mat Krom Panel",
      "ASSOS Beyaz Panel"
    ],
    "specs": {
      "standard": "TS EN 14055",
      "packaging": "Kutulu",
      "consumption": "Visam rezervuarlar için",
      "mixingRatio": "Tırnaklı mekanik şablon üzerine kilitlenir",
      "potLife": "Uzun ömürlü yay mekanizması",
      "logistics": "Balçova Mağaza Stok"
    },
    "accordions": [
      {
        "title": "İki Kademeli Su Tasarrufu",
        "body": "Gereksiz su tüketimini önleyerek 4 kişilik bir ailede yılda binlerce litre içme suyunun boşa akmasını engeller."
      }
    ]
  },
  {
    "id": "visam-asma-polipropilen-rezervuar",
    "name": "Visam Duvardan Asma Polipropilen Plastik Rezervuar",
    "badge": "Duvardan Çekmeli · 1.250 ₺",
    "tag": "Visam Asma · 1.250 ₺",
    "deptId": "vitrifiyePanel",
    "category": "visam-asma",
    "thumb": "assets/tesisat/visam-asma-rezervuar.jpg",
    "desc": "Alaturka tuvaletler ve klasik yer tipi klozetler için UV dayanımlı sararmayan beyaz polipropilen gövdeli, iç takımı ve borusu dahil Visam asma rezervuar.",
    "meta": [
      "Raf Fiyatı: 1.250 ₺",
      "Sararmaz Polipropilen",
      "Komple İç Takım & Boru Dahil"
    ],
    "coverage": "Komple Montaj Seti (1.250 ₺)",
    "sizes": [
      "Visam Asma Rezervuar Seti (1.250 ₺)"
    ],
    "specs": {
      "standard": "TS EN 14055",
      "packaging": "Karton Kutu (Boru, Zincir, Flotör Dahil)",
      "consumption": "Alaturka ve klasik tuvaletler",
      "mixingRatio": "Duvara dübel ile askı montajı",
      "potLife": "Kırılmaz polipropilen gövde",
      "logistics": "Balçova Mağaza Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Garantili ve Sararmayan Plastik Gövde",
        "body": "Yüksek kaliteli polipropilen hammaddesi sayesinde deterjan ve nemden etkilenmez, yıllarca ilk günkü parlak beyazlığını korur."
      }
    ]
  },
  {
    "id": "visam-ic-takim-leylak-iris",
    "name": "Visam LEYLAK, İRİS & MİMOZA Klozet İç Takımları & Flotörler",
    "badge": "Universal Seramik Uyumlu",
    "tag": "Visam İç Takım Grubu",
    "deptId": "vitrifiyePanel",
    "category": "visam-ic-takim",
    "thumb": "assets/tesisat/visam-ic-takim-leylak.jpg",
    "desc": "Tüm yerli ve ithal seramik klozet rezervuarlarıyla uyumlu, basmalı çift kademeli (Leylak), tek basmalı (İris) ve alttan/yandan sessiz şamandıralı (Mimoza) iç takımlar.",
    "meta": [
      "Visam Leylak & İris & Mimoza",
      "Sessiz Dolum Flotörü",
      "Yükseklik Ayarlı Taşma Borusu"
    ],
    "coverage": "Kutulu Komple Set",
    "sizes": [
      "Visam LEYLAK Çift Basmalı İç Takım",
      "Visam İRİS Tek Basmalı İç Takım",
      "Visam MİMOZA Sessiz Flotör (Yandan Giriş)",
      "Visam MİMOZA Sessiz Flotör (Alttan Giriş)"
    ],
    "specs": {
      "standard": "TS EN 14055 / TS 824",
      "packaging": "Kutulu Takım",
      "consumption": "Seramik rezervuarlar",
      "mixingRatio": "Universal rezervuar deliğine montaj",
      "potLife": "Kirece dayanıklı silikon conta",
      "logistics": "Balçova Mağaza Stok"
    },
    "accordions": [
      {
        "title": "Sessiz ve Şebeke Basıncından Etkilenmeyen Flotör",
        "body": "Özel diyaframlı yapısı sayesinde yüksek katlarda dahi su dolumu sırasında ses çıkarmaz ve koç darbesini keser."
      }
    ]
  },
  {
    "id": "creavit-vg1841-kanalsiz-klozet",
    "name": "Creavit BT VG1841 Rimless Kanalsız Asma Klozet",
    "badge": "Hijyenik Kanalsız Rimless",
    "tag": "Creavit BT VG1841",
    "deptId": "vitrifiyePanel",
    "category": "klozet-kapak",
    "thumb": "assets/tesisat/creavit-vg1841-klozet.jpg",
    "desc": "Kanal altı kir ve kireç birikimini sıfıra indiren yeni nesil Creavit Rimless kanalsız yıkama mimarisi, pürüzsüz antibakteriyel seramik sır kaplama.",
    "meta": [
      "Model: BT VG1841",
      "Kanalsız Hijyenik Yıkama",
      "Gizli Montaj Vidaları"
    ],
    "coverage": "Kutulu Seramik Gövde",
    "sizes": [
      "BT VG1841 Kanalsız Asma Klozet",
      "Uyumlu İnce Duroplast Yavaş Kapanan Kapak"
    ],
    "specs": {
      "standard": "TS EN 997 / CE",
      "packaging": "Karton Kutu Paletli",
      "consumption": "Banyo yenileme ve sıfır inşaat",
      "mixingRatio": "Gömme rezervuar askı cıvatalarına montaj",
      "potLife": "Ömür boyu seramik sır garantisi",
      "logistics": "Balçova Showroom & Urla Depo"
    },
    "accordions": [
      {
        "title": "Temizlikte %100 Hijyen Standardı",
        "body": "Geleneksel kanallı klozetlerde ulaşılamayan iç kıvrımlar bu modelde tamamen kaldırılmıştır; tek bir sünger darbesiyle tüm yüzey parlar."
      }
    ]
  },
  {
    "id": "bien-duroplast-yavas-kapak",
    "name": "Bien Antibakteriyel Duroplast Yavaş Kapanan (Soft-Close) Klozet Kapağı",
    "badge": "Soft-Close Yavaş Kapanan",
    "tag": "Bien Duroplast Kapak",
    "deptId": "vitrifiyePanel",
    "category": "klozet-kapak",
    "thumb": "assets/tesisat/bien-duroplast-kapak.jpg",
    "desc": "Paslanmaz çelik üstten sıkmalı menteşeleriyle kolayca sökülüp temizlenebilen (Take-Off), çarpmayı önleyen hidrolik mekanizmalı sert duroplast klozet kapağı.",
    "meta": [
      "Sert Çizilmez Duroplast",
      "Amortisörlü Yavaş Kapanma",
      "Üstten Kolay Montaj"
    ],
    "coverage": "Kutulu Montaj Kiti",
    "sizes": [
      "Universal Oval Soft-Close Kapak",
      "D-Code / Kare Model Soft-Close Kapak"
    ],
    "specs": {
      "standard": "DIN 19516",
      "packaging": "Kutulu Set",
      "consumption": "Tüm standart klozetler",
      "mixingRatio": "Paslanmaz üstten vidalama",
      "potLife": "100.000 açma-kapama dayanımı",
      "logistics": "Balçova Mağaza Stok"
    },
    "accordions": [
      {
        "title": "Sessiz ve Güvenli Kullanım",
        "body": "Kapağın düşerek seramiği çatlatmasını veya çocukların ellerini sıkıştırmasını önleyen akışkan hidrolik frenleme sistemi mevcuttur."
      }
    ]
  },
  {
    "id": "alz-paslanmaz-kagitlik",
    "name": "ALZ Banyo Paslanmaz Çelik Kapaklı Tuvalet Kağıtlığı",
    "badge": "Paslanmaz Krom · 200 ₺",
    "tag": "ALZ Kağıtlık · 200 ₺",
    "deptId": "bathroomAccPanel",
    "category": "alz-kagitlik-havluluk",
    "thumb": "assets/tesisat/alz-kagitlik.jpg",
    "desc": "Banyo nemine ve suya dayanıklı masif paslanmaz çelik gövdeli, su sıçramasını önleyen yaylı kapaklı ALZ Banyo krom tuvalet kağıtlığı.",
    "meta": [
      "Raf Fiyatı: 200 ₺",
      "Paslanmaz Çelik Gövde",
      "Gizli Vidalı Montaj"
    ],
    "coverage": "Kutulu Adet (200 ₺)",
    "sizes": [
      "Kapaklı Paslanmaz Kağıtlık (200 ₺)",
      "Kapaksız Modern Kağıtlık (180 ₺)"
    ],
    "specs": {
      "standard": "Korozyon Test Standartları",
      "packaging": "Kutulu (Dübel ve Vida Seti Dahil)",
      "consumption": "Her WC için 1 adet",
      "mixingRatio": "Matkapla duvara gizli montaj",
      "potLife": "Paslanmaz krom kaplama",
      "logistics": "Balçova Mağaza Rafından Teslim"
    },
    "accordions": [
      {
        "title": "Paslanmaz Çelik Kalitesi",
        "body": "Ucuz saç veya teneke aksesuarlar gibi banyo buharından kabarmaz, pas lekesi yapmaz ve yıllarca parlaklığını korur."
      }
    ]
  },
  {
    "id": "alz-paslanmaz-havluluk",
    "name": "ALZ Banyo Paslanmaz Çelik Düz & Halka Havluluk",
    "badge": "Paslanmaz Krom · 300 ₺",
    "tag": "ALZ Havluluk · 300 ₺",
    "deptId": "bathroomAccPanel",
    "category": "alz-kagitlik-havluluk",
    "thumb": "assets/tesisat/alz-havluluk.jpg",
    "desc": "El ve banyo havluları için korozyonsuz krom kaplama, gizli vidalı duvara montaj flanşlı sağlam boru gövdeli ALZ banyo havluluk serisi.",
    "meta": [
      "Raf Fiyatı: 300 ₺",
      "50 cm Düz Boru / Yuvarlak Halka",
      "Paslanmaz Krom Yüzey"
    ],
    "coverage": "Kutulu Montaj Kiti (300 ₺)",
    "sizes": [
      "50 cm Uzun Düz Boru Havluluk (300 ₺)",
      "Halka Yuvarlak Havluluk (250 ₺)"
    ],
    "specs": {
      "standard": "Banyo Aksesuarı Kalite Standartları",
      "packaging": "Kutulu",
      "consumption": "Lavabo ve duş yanı",
      "mixingRatio": "Duvara vidalama",
      "potLife": "Paslanmaz çelik ömür",
      "logistics": "Balçova Mağaza Stok"
    },
    "accordions": [
      {
        "title": "Sağlam Taşıma Kapasitesi",
        "body": "Ağır ve ıslak banyo havlularını sarkma veya duvardan oynama yapmadan güvenle taşır."
      }
    ]
  },
  {
    "id": "alz-cam-etajer-sabunluk",
    "name": "ALZ Banyo Temperli Cam Etajer Raf, Sabunluk & Fırçalık",
    "badge": "Temperli Füme / Buzlu Cam",
    "tag": "ALZ Cam Banyo Etajeri",
    "deptId": "bathroomAccPanel",
    "category": "cam-etajer-askilik",
    "thumb": "assets/tesisat/alz-cam-etajer.jpg",
    "desc": "Ayna altı kozmetik ve kişisel bakım ürünleri için pirinç krom korkuluklu temperli kırılmaz cam raf ve duvara monte sıvı sabunluk donanımları.",
    "meta": [
      "Kırılmaz Temperli Cam",
      "Pirinç Krom Korkuluk",
      "Paslanmaz Ayaklar"
    ],
    "coverage": "Kutulu Tam Set",
    "sizes": [
      "50 cm Cam Etajer Raf",
      "Duvara Monte Krom Sıvı Sabunluk",
      "Paslanmaz Krom WC Fırçalığı"
    ],
    "specs": {
      "standard": "Temperli Güvenlik Camı",
      "packaging": "Kutulu Koruyucu Ambalaj",
      "consumption": "Ayna altı ve lavabo çevresi",
      "mixingRatio": "Krom tutucularla duvara vidalama",
      "potLife": "Korozyonsuz metal alaşım",
      "logistics": "Balçova Mağaza Stok"
    },
    "accordions": [
      {
        "title": "Düşmeyi Önleyen Krom Bariyer",
        "body": "Cam etajer etrafındaki krom koruma teli parfüm ve cam kozmetik şişelerinin lavaboya düşüp kırılmasını engeller."
      }
    ]
  },
  {
    "id": "rulopa-krom-tel-sampuanlik",
    "name": "Rulopa Paslanmaz Krom Tel Köşe Banyo Şampuanlığı (2'li & 3'lü)",
    "badge": "Korozyona Dayanıklı Tel Raf",
    "tag": "Rulopa Tel Şampuanlık",
    "deptId": "bathroomAccPanel",
    "category": "rulopa-sampuanlik",
    "thumb": "assets/tesisat/rulopa-tel-sampuanlik.jpg",
    "desc": "Duşakabin iç köşelerine monte edilen, suyun üzerinde durmayıp kendiliğinden aktığı çift ve üç katlı paslanmaz tel sepetli şampuanlık.",
    "meta": [
      "Rulopa Kalite Tel Raf",
      "2 Katlı & 3 Katlı Seçenek",
      "Krom Paslanmaz Kaplama"
    ],
    "coverage": "Kutulu Adet",
    "sizes": [
      "2 Katlı Tel Köşe Şampuanlık",
      "3 Katlı Tel Köşe Şampuanlık",
      "Kapı Arkası Askılık Aparatı"
    ],
    "specs": {
      "standard": "Banyo Tel Donanım Standardı",
      "packaging": "Adet",
      "consumption": "Duşakabin köşe alanları",
      "mixingRatio": "Paslanmaz vida ve dubellerle montaj",
      "potLife": "Paslanmaya karşı koruyucu kromaj",
      "logistics": "Balçova Mağaza Stok"
    },
    "accordions": [
      {
        "title": "Derin Sepet Tasarımı",
        "body": "Yüksek kenar telleri sayesinde büyük şampuan ve duş jeli şişeleri duş esnasında devrilmez."
      }
    ]
  },
  {
    "id": "bay-t-mk1424-camasir-askiligi",
    "name": "BAY-T MK 1424 Paslanmaz Katlanır Kanatlı Çamaşır Kurutmalığı",
    "badge": "Elektrostatik Fırın Boyalı · 300 ₺",
    "tag": "BAY-T MK 1424 · 300 ₺",
    "deptId": "bathroomAccPanel",
    "category": "bayt-camasir",
    "thumb": "assets/tesisat/bay-t-mk1424-camasir.jpg",
    "desc": "Balkon ve banyolarda çamaşır kurutma için paslanmaz alüminyum borulu, elektrostatik fırın boyalı, katlandığında yer kaplamayan BAY-T MK 1424 kurutmalık.",
    "meta": [
      "Raf Fiyatı: 300 ₺",
      "Model: MK 1424",
      "Katlanabilir Kompakt Gövde"
    ],
    "coverage": "Paketli Kurutmalık (300 ₺)",
    "sizes": [
      "MK 1424 Kanatlı Çamaşır Kurutmalığı (300 ₺)"
    ],
    "specs": {
      "standard": "Ev Donanımları Standardı",
      "packaging": "Şeffaf Koruyucu Naylon Paket",
      "consumption": "Ev ve villa çamaşır alanları",
      "mixingRatio": "Kullanıma hazır katlanır mekanizma",
      "potLife": "Paslanmaz çelik/alüminyum borular",
      "logistics": "Balçova Mağaza Rafından Teslim"
    },
    "accordions": [
      {
        "title": "18 Metre Asma Kapasitesi",
        "body": "Kanatlı tasarımı 2 makine çamaşırı aynı anda asmaya yetecek tel uzunluğu sunar, çorap ve küçük eşyalar için ek asma alanları barındırır."
      }
    ]
  },
  {
    "id": "hanex-titresim-takozu",
    "name": "Hanex Titreşim Önleyici Çamaşır Makinesi Kauçuk Ayak Takozu (4'lü)",
    "badge": "4'lü Vakum Taban · 100 ₺",
    "tag": "Hanex Takoz · 100 ₺",
    "deptId": "bathroomAccPanel",
    "category": "hanex-takoz",
    "thumb": "assets/tesisat/hanex-titresim-takozu.jpg",
    "desc": "Çamaşır ve kurutma makinelerinin sıkma devrinde çıkardığı gürültüyü, sarsıntıyı ve zeminde yürümesini engelleyen yüksek dansite vakum tabanlı 4'lü kauçuk takoz seti.",
    "meta": [
      "Raf Fiyatı: 100 ₺ (4'lü Paket)",
      "Yüksek Dansite Kauçuk",
      "Zemin Çizilmesini Önler"
    ],
    "coverage": "4 Adetlik Vakumlu Set (100 ₺)",
    "sizes": [
      "4 Adet Vakumlu Titreşim Takozu (100 ₺)"
    ],
    "specs": {
      "standard": "Titreşim İzolasyon Malzemesi",
      "packaging": "Karton Blister Paket (4 Adet)",
      "consumption": "1 çamaşır veya bulaşık makinesi için 1 paket",
      "mixingRatio": "Makine ayaklarının altına yerleştirilir",
      "potLife": "Kalıcı deformasyonsuz kauçuk",
      "logistics": "Balçova Mağaza Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Makinenin 'Yürümesini' ve Sesi Sıfırlar",
        "body": "Vakumlu alt tabanı seramiğe sıkıca tutunur, yüksek devirde bile makinenin yerinden oynamasını ve alt komşuya giden gürültüyü keser."
      }
    ]
  },
  {
    "id": "elal-rulopa-bornozluk",
    "name": "Elal Masif Çiftli Krom Bornozluk & Askılık",
    "badge": "Masif Krom Döküm",
    "tag": "Elal Çiftli Bornozluk",
    "deptId": "bathroomAccPanel",
    "category": "cam-etajer-askilik",
    "thumb": "assets/tesisat/elal-bornozluk.jpg",
    "desc": "Banyo kapısı arkası veya duş yanı için masif döküm gövdeli, ağır bornoz ve havluları güvenle tutan çiftli krom askılık.",
    "meta": [
      "Masif Zamak / Pirinç Döküm",
      "Çift Kancalı Ergonomik Uç",
      "Gizli Vida Flanşı"
    ],
    "coverage": "Kutulu / Adet",
    "sizes": [
      "Çiftli Bornoz Askılığı",
      "4'lü Askılık Barı"
    ],
    "specs": {
      "standard": "Banyo Donanım Standardı",
      "packaging": "Adet",
      "consumption": "Banyo ve kapı arkası",
      "mixingRatio": "Duvara vidalama",
      "potLife": "Kırılmaz döküm kanca",
      "logistics": "Balçova Mağaza Stok"
    },
    "accordions": [
      {
        "title": "Kumaşı Delmeyen Yuvarlak Form",
        "body": "Kanca uçlarının yuvarlatılmış pürüzsüz yapısı bornoz ve havluların asılırken yırtılmasını veya iz kalmasını önler."
      }
    ]
  },
  {
    "id": "kas-eca-kuresel-vana-pirinc",
    "name": "Kas & E.C.A Tam Geçişli Ağır Tip Pirinç Küresel Vana (PN 25)",
    "badge": "TS EN 13828 Tam Geçişli",
    "tag": "Pirinç Küresel Vana",
    "deptId": "valvesChemicalsPanel",
    "category": "pirinc-kuresel",
    "thumb": "assets/tesisat/kas-eca-kuresel-vana.jpg",
    "desc": "Daire girişi, hidrofor, kollektör ve yangın hatlarında basınç kaybı yaratmayan teflon küre yataklı ağır tip pirinç küresel su vanası.",
    "meta": [
      "Tam Geçişli Küre",
      "PN 25 Yüksek Basınç",
      "1/2\" – 2\" Ölçüler"
    ],
    "coverage": "Adet Satışı",
    "sizes": [
      "1/2\" Tam Geçişli Küresel Vana",
      "3/4\" Tam Geçişli Küresel Vana",
      "1\" Tam Geçişli Küresel Vana",
      "1 1/4\" Tam Geçişli Küresel Vana",
      "1 1/2\" Tam Geçişli Küresel Vana",
      "2\" Tam Geçişli Küresel Vana"
    ],
    "specs": {
      "standard": "TS EN 13828 / CE",
      "packaging": "Kutulu / Adet",
      "consumption": "Ana su sayaç ve kolon kesme hatları",
      "mixingRatio": "Dişli boru bağlantısı",
      "potLife": "50.000 açma-kapama",
      "logistics": "Balçova Mağaza & Urla Depo"
    },
    "accordions": [
      {
        "title": "Ağır Tip Dövme Pirinç Gövde",
        "body": "Kış donmalarında veya koç darbelerinde çatlama yapmaz; teflon contaları yıllarca sızdırmazlığı garanti eder."
      }
    ]
  },
  {
    "id": "paslanmaz-orgulu-celik-fleks",
    "name": "Örgülü Paslanmaz Çelik EPDM Batarya & Klozet Fleks Hortumu",
    "badge": "AISI 304 Paslanmaz Örgü",
    "tag": "Paslanmaz Fleks Hortum",
    "deptId": "valvesChemicalsPanel",
    "category": "orgulu-fleks",
    "thumb": "assets/tesisat/paslanmaz-orgulu-fleks.jpg",
    "desc": "Musluk, batarya, şofben ve klozet rezervuarlarına su bağlantısı sağlayan, patlamaya dayanıklı AISI 304 paslanmaz örgülü esnek fleks hortumlar.",
    "meta": [
      "EPDM Hijyenik İç Hortum",
      "304 Kalite Çelik Örgü",
      "10 Bar Çalışma Basıncı"
    ],
    "coverage": "Adet Satışı",
    "sizes": [
      "3/8\" - 3/8\" Fleks (40 cm)",
      "3/8\" - 1/2\" Fleks (50 cm)",
      "1/2\" - 1/2\" Fleks (60 cm)",
      "1/2\" - 1/2\" Fleks (80 cm)"
    ],
    "specs": {
      "standard": "TS EN 13618",
      "packaging": "Poşetli Adet",
      "consumption": "Batarya ve rezervuar musluk bağlantısı",
      "mixingRatio": "İngiliz anahtarı ile aşırı sıkmadan montaj",
      "potLife": "90°C sıcak su dayanımı",
      "logistics": "Balçova Mağaza Stok"
    },
    "accordions": [
      {
        "title": "Patlama ve Şişmeye Karşı Çift Tel Örgü",
        "body": "Gece şebekede yükselen hidrofor basıncında şişip patlamayan, daireyi su basma riskinden koruyan endüstriyel standartta örgü kalitesi."
      }
    ]
  },
  {
    "id": "su-saati-rekoru-cekvalf",
    "name": "Yaylı Pirinç Çekvalf, Pislik Tutucu Filtre & Su Saati Rekor Takımı",
    "badge": "Geri Akış Emniyeti",
    "tag": "Tesisat Emniyet Grubu",
    "deptId": "valvesChemicalsPanel",
    "category": "cekvalf-filtre",
    "thumb": "assets/tesisat/su-saati-rekoru-cekvalf.jpg",
    "desc": "Sayacın ters dönmesini ve şebeke suyunun kirlenmesini önleyen yaylı pirinç çekvalf, sayaç rekor takımı ve pirinç y tipi pislik tutucu filtreler.",
    "meta": [
      "Yaylı Sessiz Çekvalf",
      "Paslanmaz Çelik Filtre Kartuşu",
      "Sayaç Rekor Takımı"
    ],
    "coverage": "Adet / Takım Satışı",
    "sizes": [
      "1/2\" Yaylı Çekvalf",
      "3/4\" Yaylı Çekvalf",
      "1\" Y Tipi Pislik Tutucu Filtre",
      "3/4\" Su Saati Rekor Takımı (Çift)"
    ],
    "specs": {
      "standard": "TS EN 1074-3 / TS 11494",
      "packaging": "Adet / Takım",
      "consumption": "Sayaç ve pompa çıkışları",
      "mixingRatio": "Dişli hat montajı",
      "potLife": "Korozyonsuz mekanik emniyet",
      "logistics": "Stoktan Sevk"
    },
    "accordions": [
      {
        "title": "Şebeke Basınç Kayıplarını Engeller",
        "body": "Hidrofor sistemlerinde suyun depoya geri kaçmasını önleyerek pompanın sık sık devreye girmesini ve elektrik israfını engeller."
      }
    ]
  },
  {
    "id": "mr-caustic-kostik-gider-acici",
    "name": "Mr. Caustic Kostik Lavabo ve Tıkalı Gider Açıcı Pul Kostik",
    "badge": "Yüksek Saflıkta NaOH · 100 ₺ / 200 ₺",
    "tag": "Mr. Caustic · 100 ₺ / 200 ₺",
    "deptId": "valvesChemicalsPanel",
    "category": "mr-caustic",
    "thumb": "assets/tesisat/mr-caustic-pul-kostik.jpg",
    "desc": "Tıkanmış lavabo, banyo ve tuvalet pimaş borularında biriken yağ, saç, kıl, yemek artığı ve sabun birikintilerini sıcak suyla temasında anında eriten saf pul kostik.",
    "meta": [
      "450 g: 100 ₺ / 1000 g: 200 ₺",
      "Sıcak Su Aktivasyonlu",
      "Plastik Borulara Zarar Vermez"
    ],
    "coverage": "450 g ve 1000 g Şişeler",
    "sizes": [
      "450 g Mr. Caustic Şişe (100 ₺)",
      "1000 g Mr. Caustic Şişe (200 ₺)"
    ],
    "specs": {
      "standard": "Endüstriyel Kimyasal Güvenlik Standardı",
      "packaging": "Emniyet Kilitli Kapaklı Plastik Şişe",
      "consumption": "1 tıkanıklık için ~100-150 g uygulama",
      "mixingRatio": "Gidere döküldükten sonra 1 litre kaynar su dökülür",
      "potLife": "Anında reaksiyon ve açılma",
      "logistics": "Balçova Mağaza Rafından Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama Talimatı ve Güvenlik",
        "body": "Tıkalı gidere bir miktar pul kostik dökün ve üzerine dikkatlice kaynar su boşaltın. Çıkan buharı solumayınız, eldiven kullanınız. PVC borulara zarar vermeden organikleri eritir."
      }
    ]
  },
  {
    "id": "gts-35-derz-temizleyici",
    "name": "GTS-35 Profesyonel Derz Dolgu, Kireç & Ağır Harç Temizleyici (1000 ml)",
    "badge": "Konsantre Derz Asidi",
    "tag": "GTS-35 Derz Temizleyici",
    "deptId": "valvesChemicalsPanel",
    "category": "derz-temizleyici",
    "thumb": "assets/tesisat/gts35-derz-temizleyici.jpg",
    "desc": "Banyo seramikleri, fayans araları ve duş zeminlerindeki kararmış derz dolgularını, inşaat sonrası çimento harç kalıntılarını ilk günkü rengine kavuşturan formül.",
    "meta": [
      "1000 ml Konsantre Şişe",
      "Harç & Pas Lekesi Çözücü",
      "Derz Kararmalarını Temizler"
    ],
    "coverage": "1000 ml Şişe (~20-30 m² Alan)",
    "sizes": [
      "1000 ml GTS-35 Şişe",
      "5 Litre Profesyonel Şantiye Bidonu"
    ],
    "specs": {
      "standard": "Yapı Kimyasalları Temizlik Standardı",
      "packaging": "Kilitli Kapak 1000 ml Şişe",
      "consumption": "~40-50 ml / m²",
      "mixingRatio": "Direkt derz üzerine dökülüp fırçalanır, durulanır",
      "potLife": "3-5 dakikada hızlı sonuç",
      "logistics": "Balçova Mağaza Stok"
    },
    "accordions": [
      {
        "title": "Seramiği Çizmeden Derinlemesine Temizlik",
        "body": "Fayans ve seramik yüzeyin parlak sır tabakasına zarar vermeden derz içine işlemiş kir, pas ve kireç tortularını köpürerek söker."
      }
    ]
  },
  {
    "id": "porcoz-kirec-pas-sokucu",
    "name": "Porçöz Ekstra Güçlü Kireç & Pas Sökücü Formül (1000 ml)",
    "badge": "Yoğun Kireç Çözücü",
    "tag": "Porçöz Kireç & Pas",
    "deptId": "valvesChemicalsPanel",
    "category": "derz-temizleyici",
    "thumb": "assets/tesisat/porcoz-kirec-pas.jpg",
    "desc": "Banyo bataryaları, duş başlıkları, klozet içi ve su tesisatındaki yoğun kireç taşlaşmalarını ve pas birikintilerini saniyeler içinde çözen konsantre formül.",
    "meta": [
      "1000 ml Orijinal Şişe",
      "Taşlaşmış Kireci Söker",
      "Lavabo ve Klozet Hijyeni"
    ],
    "coverage": "1000 ml Şişe",
    "sizes": [
      "1000 ml Porçöz Şişe"
    ],
    "specs": {
      "standard": "TS Güvenceli Temizlik Formülü",
      "packaging": "Kilitli Emniyet Kapaklı Şişe",
      "consumption": "Kireçli bölgeye yeterli miktar",
      "mixingRatio": "Uygulama sonrası bol soğuk suyla durulanır",
      "potLife": "Anında köpürme ve çözünme",
      "logistics": "Balçova Mağaza Stok"
    },
    "accordions": [
      {
        "title": "Klozet Taşlarında Kireç Çizgilerini Temizler",
        "body": "Klozetin su akma noktalarında oluşan sarı kireç ve pas izlerini fırçalamaya gerek kalmadan köpürerek anında temizler."
      }
    ]
  }
];

  /* DOM ELEMENT REFS */
  var subnav = document.getElementById("pvSubnav");
  var spacer = document.getElementById("pvSubnavSpacer");
  var header = document.getElementById("pvTransparentHeader") || document.querySelector("header");
  var subnavLinks = document.querySelectorAll(".pv-subnav-link");
  var deptDrawerBackdrop = document.getElementById("pvDeptDrawerBackdrop");
  var deptTrigger = document.getElementById("pvDeptTrigger");
  var deptTriggerLabel = document.getElementById("pvDeptTriggerLabel");
  var drawerCloseBtn = document.getElementById("pvDrawerCloseBtn");
  var deptList = document.getElementById("pvDeptList");
  var filterRail = document.getElementById("pvFilterRail");

  var panels = {
    wasteWaterPanel: document.getElementById("wasteWaterPanel"),
    faucetShowerPanel: document.getElementById("faucetShowerPanel"),
    vitrifiyePanel: document.getElementById("vitrifiyePanel"),
    bathroomAccPanel: document.getElementById("bathroomAccPanel"),
    valvesChemicalsPanel: document.getElementById("valvesChemicalsPanel")
  };

  var lists = {
    wasteWaterPanel: document.getElementById("listWasteWater"),
    faucetShowerPanel: document.getElementById("listFaucetShower"),
    vitrifiyePanel: document.getElementById("listVitrifiye"),
    bathroomAccPanel: document.getElementById("listBathroomAcc"),
    valvesChemicalsPanel: document.getElementById("listValvesChemicals")
  };

  var currentActiveTab = "wasteWaterPanel";
  var currentProduct = null;
  var selectedSize = "";

  /* HYDRATE PRODUCT ROWS */
  function renderProductsList() {
    Object.keys(lists).forEach(function(deptKey) {
      var container = lists[deptKey];
      if (!container) return;
      container.innerHTML = "";

      var prods = TESISAT_PRODUCTS_DATA.filter(function(p) { return p.deptId === deptKey; });
      prods.forEach(function(p) {
        var row = document.createElement("div");
        row.className = "pv-menu-row";
        row.setAttribute("data-category", p.category);
        row.setAttribute("data-product-id", p.id);
        row.setAttribute("role", "button");
        row.setAttribute("tabindex", "0");

        var metaChipsHtml = (p.meta || []).map(function(m, idx) {
          return '<span>' + m + '</span>' + (idx < p.meta.length - 1 ? '<span>&bull;</span>' : '');
        }).join('');

        row.innerHTML = 
          '<div class="pv-menu-thumb">' +
            '<img src="' + p.thumb + '" alt="' + p.name + '" loading="lazy" decoding="async" />' +
          '</div>' +
          '<div class="pv-menu-main">' +
            '<div class="pv-menu-title-row">' +
              '<span class="pv-menu-name">' + p.name + '</span>' +
              '<span class="pv-menu-dots">........................................</span>' +
              '<span class="pv-menu-tag tag-amber">' + p.tag + '</span>' +
            '</div>' +
            '<div class="pv-menu-desc-line">' + p.desc + '</div>' +
            '<div class="pv-menu-meta-chips">' + metaChipsHtml + '</div>' +
          '</div>' +
          '<div class="pv-menu-aside">' +
            '<span class="pv-menu-action-label">Teknik Detay</span>' +
            '<div class="pv-menu-arrow" aria-hidden="true">' +
              '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
                '<line x1="5" y1="12" x2="19" y2="12"></line>' +
                '<polyline points="12 5 19 12 12 19"></polyline>' +
              '</svg>' +
            '</div>' +
          '</div>';

        row.addEventListener("click", function() {
          openModal(p.id);
        });
        row.addEventListener("keydown", function(e) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openModal(p.id);
          }
        });

        container.appendChild(row);
      });
    });
  }

  renderProductsList();

  /* STICKY ARCHITECTURAL PINNING */
  var initialSubnavTop = 0;
  function getHeaderHeight() {
    return header ? header.offsetHeight : 0;
  }
  function getSubnavOrigin() {
    if (spacer && spacer.classList.contains("is-active")) {
      return spacer.getBoundingClientRect().top + window.pageYOffset;
    }
    return subnav ? (subnav.getBoundingClientRect().top + window.pageYOffset) : 0;
  }
  initialSubnavTop = getSubnavOrigin();

  function syncSubnavPin() {
    if (!subnav) return;
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
    var hHeight = getHeaderHeight();
    var headerVisible = header ? (header.classList.contains("header--solid") || scrollY <= 120) : true;

    if (scrollY >= initialSubnavTop - hHeight) {
      if (!subnav.classList.contains("is-pinned")) {
        subnav.classList.add("is-pinned");
        if (spacer) spacer.classList.add("is-active");
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

  /* Category filter click handler within page body */
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

  /* Specimen Detail Modal Logic */
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
  var modalWABtn = document.getElementById("modalWABtn");

  function openModal(productId) {
    var p = TESISAT_PRODUCTS_DATA.find(function(item) { return item.id === productId; });
    if (!p) return;
    currentProduct = p;

    if (modalProductTitle) modalProductTitle.textContent = p.name;
    if (modalProductEyebrow) modalProductEyebrow.textContent = p.badge ? ("PERVAN · " + p.badge) : "PERVAN · SIHHİ TESİSAT & ALTYAPI";
    if (modalProductDesc) modalProductDesc.textContent = p.desc;

    /* Badges */
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

    /* Size Chips */
    var modalPackagingSection = document.getElementById("modalPackagingSection");
    var modalSelectedSizeHint = document.getElementById("modalSelectedSizeHint");
    var modalSizeChips = document.getElementById("modalSizeChips");
    if (modalSizeChips) {
      modalSizeChips.innerHTML = "";
      var sizes = p.sizes || ["Standart Model"];
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
      var sizes = p.sizes || ["Standart Model"];
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

    /* Gauges */
    if (modalSpecStandard) modalSpecStandard.textContent = p.badge || "DIN 8077/8078 & TSE";
    if (modalSpecConsumption) modalSpecConsumption.textContent = p.coverage || "Standart Üretim";
    if (modalSpecPackaging) modalSpecPackaging.textContent = (p.sizes && p.sizes[0]) ? p.sizes[0] : "Orijinal Ambalaj";

    /* Specs Table */
    var sp = p.specs || {};
    if (modalSpecStandardRow) modalSpecStandardRow.textContent = sp.standard || p.badge || "-";
    if (modalSpecPackagingRow) modalSpecPackagingRow.textContent = sp.packaging || (p.sizes ? p.sizes.join(", ") : "-");
    if (modalSpecMixing) modalSpecMixing.textContent = sp.mixingRatio || "-";
    if (modalSpecPotLife) modalSpecPotLife.textContent = sp.potLife || "-";
    if (modalSpecLogistics) modalSpecLogistics.textContent = sp.logistics || "Balçova Mağaza & Urla Depo Stoktan Sevk";

    /* Accordions */
    if (modalAccordions) {
      modalAccordions.innerHTML = "";
      if (p.accordions && p.accordions.length) {
        p.accordions.forEach(function(acc, idx) {
          var accDiv = document.createElement("div");
          accDiv.className = "pv-accordion-item" + (idx === 0 ? " open" : "");
          accDiv.innerHTML = 
            '<button type="button" class="pv-accordion-header" aria-expanded="' + (idx === 0 ? "true" : "false") + '">' +
              '<span>' + acc.title + '</span>' +
              '<svg class="pv-accordion-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>' +
            '</button>' +
            '<div class="pv-accordion-body">' +
              '<p>' + acc.body + '</p>' +
            '</div>';

          var btn = accDiv.querySelector(".pv-accordion-header");
          btn.addEventListener("click", function() {
            var isOpen = accDiv.classList.contains("open");
            modalAccordions.querySelectorAll(".pv-accordion-item").forEach(function(item) {
              item.classList.remove("open");
              var h = item.querySelector(".pv-accordion-header");
              if (h) h.setAttribute("aria-expanded", "false");
            });
            if (!isOpen) {
              accDiv.classList.add("open");
              btn.setAttribute("aria-expanded", "true");
            }
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
  }

  function updateWhatsAppUrl() {
    var waTarget = document.getElementById("modalWaBtn") || document.getElementById("modalWABtn");
    if (!waTarget || !currentProduct) return;
    var rawText = "Merhaba, Sıhhi Tesisat & Altyapı kataloğunuzdan '" + currentProduct.name + "' (" + selectedSize + ") ürünü için Balçova/Urla stok durumu ve proje fiyatı öğrenmek istiyorum.";
    waTarget.href = "https://wa.me/905323844497?text=" + encodeURIComponent(rawText);
    return;
    var rawText = "Merhaba, Sıhhi Tesisat & Altyapı kataloğunuzdan '" + currentProduct.name + "' (" + selectedSize + ") ürünü için Balçova/Urla stok durumu ve proje fiyatı öğrenmek istiyorum.";
    modalWABtn.href = "https://wa.me/905323844497?text=" + encodeURIComponent(rawText);
  }

  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove("is-open");
    modalBackdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeModal);
  }
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", function(e) {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  // Mobile Bottom Sheet Drag to Dismiss
  var startY = 0;
  var currentY = 0;
  var isDragging = false;

  function resetSheetStyles() {
    if (!modalCard) return;
    modalCard.style.transform = "";
    modalCard.style.transition = "";
    if (modalBackdrop) modalBackdrop.style.opacity = "";
  }

  function onDragStart(e) {
    if (window.innerWidth > 768) return;
    if (modalScrollArea && modalScrollArea.scrollTop > 0) return;
    var touch = e.touches ? e.touches[0] : e;
    startY = touch.clientY;
    currentY = startY;
    isDragging = true;
    if (modalCard) modalCard.style.transition = "none";
  }

  function onDragMove(e) {
    if (!isDragging) return;
    var touch = e.touches ? e.touches[0] : e;
    currentY = touch.clientY;
    var diff = currentY - startY;

    if (diff > 0 && modalCard) {
      modalCard.style.transform = "translateY(" + diff + "px)";
      if (modalBackdrop) {
        var opacity = 1 - (diff / 400);
        modalBackdrop.style.opacity = Math.max(0.2, opacity).toString();
      }
      if (e.cancelable) e.preventDefault();
    }
  }

  function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    var diff = currentY - startY;

    if (diff > 120) {
      if (modalCard) {
        modalCard.style.transition = "transform 0.25s cubic-bezier(0.2, 0.9, 0.3, 1)";
        modalCard.style.transform = "translateY(100%)";
      }
      setTimeout(function() {
        closeModal();
        resetSheetStyles();
      }, 250);
    } else if (modalCard) {
      modalCard.style.transition = "transform 0.3s cubic-bezier(0.2, 0.9, 0.3, 1)";
      modalCard.style.transform = "translateY(0)";
      if (modalBackdrop) modalBackdrop.style.opacity = "1";
      setTimeout(resetSheetStyles, 300);
    }
  }

  [modalHandleZone, modalTopBar, modalScrollArea].filter(Boolean).forEach(function(target) {
    target.addEventListener("touchstart", onDragStart, { passive: true });
    target.addEventListener("touchmove", onDragMove, { passive: false });
    target.addEventListener("touchend", onDragEnd, { passive: true });
    target.addEventListener("touchcancel", onDragEnd, { passive: true });
  });

  // SPOTLIGHT COMMAND PALETTE ENGINE (⌘K / 35 Ürün Arama)
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
    return d ? d.short : "Sıhhi Tesisat";
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
    if (spotlightCount) spotlightCount.textContent = TESISAT_PRODUCTS_DATA.length + " Ürün Yayında";
    if (spotlightResults) {
      spotlightResults.innerHTML = '<div class="pv-spotlight-hint">' +
        '<span>İpucu: Sukar süzgeç, Visam rezervuar, GPD batarya, ALZ kağıtlık veya Mr. Caustic yazarak anında arayabilirsiniz.</span>' +
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

    TESISAT_PRODUCTS_DATA.forEach(function(prod) {
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
      var waText = encodeURIComponent("Merhaba, Sıhhi Tesisat kataloğunuzda '" + rawQuery + "' aradım ancak bulamadım. Bu ürün hakkında stok ve fiyat bilgisi alabilir miyim?");
      spotlightResults.innerHTML = '<div class="pv-spotlight-empty-box">' +
        '<div class="pv-spotlight-empty-title">Eşleşen ürün bulunamadı</div>' +
        '<p class="pv-spotlight-empty-desc">Aradığınız ürün standart katalog dışı veya özel tesisat siparişi olabilir. Balçova ve Urla uzmanlarımıza doğrudan sorabilirsiniz:</p>' +
        '<a href="https://wa.me/905323844497?text=' + waText + '" target="_blank" rel="noopener" class="pv-btn-primary" style="max-width: 320px; font-size: 12px; padding: 11px 18px; min-height: 42px;">' +
        'WhatsApp ile Tesisat Danış' +
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
        var p = TESISAT_PRODUCTS_DATA.find(function(it) { return it.id === pid; });
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
          items[spotlightSelectedIdx].click();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        closeSpotlight();
      }
    });
  }

  document.addEventListener("keydown", function(e) {
    if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
      e.preventDefault();
      if (spotlightBackdrop && spotlightBackdrop.classList.contains("open")) {
        closeSpotlight();
      } else {
        openSpotlight();
      }
    }
    if (e.key === "Escape") {
      if (spotlightBackdrop && spotlightBackdrop.classList.contains("open")) {
        closeSpotlight();
      } else if (modalBackdrop && modalBackdrop.classList.contains("is-open")) {
        closeModal();
      } else if (deptDrawerBackdrop && deptDrawerBackdrop.classList.contains("is-open")) {
        closeDeptDrawer();
      }
    }
  });

  // INITIAL SETUP
  renderDeptDrawer("wasteWaterPanel");
  syncMobileFilterRail("wasteWaterPanel");
})();
