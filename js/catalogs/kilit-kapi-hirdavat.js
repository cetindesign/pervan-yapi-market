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
    "id": "kaleLocksPanel",
    "short": "Kale Kilit & Barel",
    "full": "Kale Kilit & Çelik Kapı Barel Sistemleri",
    "sub": "Tuzaklı bareller, tirajlı ve gömme kilit sistemleri",
    "pillsId": "kaleLocksMenuPills",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\" ry=\"2\"/><path d=\"M7 11V7a5 5 0 0 1 10 0v4\"/></svg>"
  },
  {
    "id": "volkanOtomatsanPanel",
    "short": "Volkan & Otomatsan",
    "full": "Volkan, Otomatsan & Barel Sistemleri",
    "sub": "Tirajlı kilitler, elektrikli otomatlar ve bareller",
    "pillsId": "volkanOtomatsanMenuPills",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"/></svg>"
  },
  {
    "id": "doorHandlesPanel",
    "short": "Nobel Kapı Kolları",
    "full": "Nobel & Lüks Kapı Kolları Koleksiyonu",
    "sub": "Aynalı, rozetli lüks kollar ve çekme kollar",
    "pillsId": "doorHandlesMenuPills",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"7\" cy=\"12\" r=\"3\"/><path d=\"M10 12h11\"/></svg>"
  },
  {
    "id": "keyDuplicationPanel",
    "short": "Anahtar Kopyalama",
    "full": "İzmir Anahtar Kopyalama Panosu & Ham Anahtar",
    "sub": "Lazer ve mekanik ham anahtar kopyalama",
    "pillsId": "keyDuplicationMenuPills",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M21 2l-2 2m-1.5 1.5L14 9l-1.5-1.5L11 9l1.5 1.5-5.5 5.5A4.5 4.5 0 1 1 3 12l5.5-5.5L7 5l1.5-1.5L10 5l1.5-1.5L13 5l1.5-1.5\"/></svg>"
  },
  {
    "id": "hingesHardwarePanel",
    "short": "Menteşe & Donanım",
    "full": "Menteşe, Kapı Yayı & Emniyet Aksesuarları",
    "sub": "Rulmanlı menteşeler, kapı yayları ve tamponlar",
    "pillsId": "hingesHardwareMenuPills",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><line x1=\"12\" y1=\"3\" x2=\"12\" y2=\"21\"/></svg>"
  },
  {
    "id": "furnitureFittingsPanel",
    "short": "Mobilya Hırdavatı",
    "full": "Mobilya Rayları, Piston & Tas Menteşeler",
    "sub": "Teleskopik raylar, gazlı pistonlar ve menteşeler",
    "pillsId": "furnitureFittingsMenuPills",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polyline points=\"21 8 21 21 3 21 3 8\"/><rect x=\"1\" y=\"3\" width=\"22\" height=\"5\"/><line x1=\"10\" y1=\"12\" x2=\"14\" y2=\"12\"/></svg>"
  }
];
  var KILIT_PRODUCTS_DATA = [
  {
    "id": "kale-164-gnc-tuzakli-barel",
    "name": "Kale 164 GNC Bilyalı Tuzaklı Çelik Kapı Bareli (Silindir)",
    "badge": "Kırılmaya Karşı Tuzaklı Gövde",
    "tag": "Kale 164 GNC Tuzaklı",
    "deptId": "kaleLocksPanel",
    "category": "kale-barel",
    "thumb": "assets/rf-card-locks.jpg",
    "desc": "Hırsızların bareli kırarak kapıyı açma girişimlerine karşı ön kısmı kırılarak gövdeyi kilitleyen, 5 bilyalı anahtarlı orijinal Kale 164 GNC tuzaklı güvenlik bareli.",
    "meta": [
      "Model: 164 GNC Tuzaklı",
      "Kırılma Korumalı Kanal",
      "5 Adet Bilyalı Güvenlik Anahtarı"
    ],
    "coverage": "Kutulu Barel + 5 Anahtar + Montaj Vidası",
    "sizes": [
      "68 mm (26+10+32 mm Standart Kapı)",
      "76 mm (30+10+36 mm Kalın Kapı)",
      "85 mm (35+10+40 mm Özel Profil)"
    ],
    "specs": {
      "standard": "TS EN 1303 Güvenlik Standardı / CE",
      "packaging": "Orijinal Kale Mühürlü Kutu",
      "consumption": "Çelik kapılar için 1 adet",
      "mixingRatio": "Kapı göbek yuvasına tek vidayla montaj",
      "potLife": "Paslanmaz çelik pim ve masif pirinç gövde",
      "logistics": "Balçova Mağaza & Urla Depo Stok"
    },
    "accordions": [
      {
        "title": "Tuzaklı Mekanizma Nasıl Çalışır?",
        "body": "Zorlama anında barelin sadece en dıştaki ucu kırılır; barel gövdesi kilit içinde sağlam kaldığından kilit mekanizmasına müdahale edilemez ve ev sahibi anahtarıyla kapısını açmaya devam edebilir."
      },
      {
        "title": "Delinmeye Dirençli Çelik Pimler",
        "body": "Gövde içine çakılmış sertleştirilmiş çelik pimler matkapla delerek bareli patlatma girişimlerini engeller."
      }
    ]
  },
  {
    "id": "kale-157-el-elektrikli-tirajli",
    "name": "Kale 157 EL Elektrikli Tirajlı Dış Kapı Kilidi",
    "badge": "12V Otomatik Apartman Kilidi",
    "tag": "Kale 157 EL Elektrikli",
    "deptId": "kaleLocksPanel",
    "category": "kale-tirajli",
    "thumb": "assets/rf-card-locks.jpg",
    "desc": "Apartman ana giriş kapıları, bina dış demir kapıları ve site girişlerinde diafon sisteminden gelen 12V tetikle otomatik açılan butonlu elektrikli tirajlı kilit.",
    "meta": [
      "Model: 157 EL Elektrikli",
      "12V AC/DC Çalışma Gerilimi",
      "Gömme Pirinç Silindirli"
    ],
    "coverage": "Komple Kilit Gövdesi + Karşılık + 3 Anahtar",
    "sizes": [
      "157 EL Sağ Yönlü Montaj",
      "157 EL Sol Yönlü Montaj"
    ],
    "specs": {
      "standard": "TS EN 12209 / CE",
      "packaging": "Karton Kutu",
      "consumption": "Bina ve apartman ana giriş kapıları",
      "mixingRatio": "Demir kapıya kaynak veya cıvata montajı",
      "potLife": "Ağır hizmet tipi çelik sürgü",
      "logistics": "Balçova Mağaza Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Hem Buton Hem Anahtarla Açılma",
        "body": "İçeriden kırmızı basma butonuyla, dışarıdan pirinç anahtarla veya daire içi diafondan 12V elektrik sinyaliyle açılabilir."
      }
    ]
  },
  {
    "id": "kale-157-a-eco-mekanik-tirajli",
    "name": "Kale 157 A ECO Mekanik Tirajlı Dış Demir Kapı Kilidi",
    "badge": "Mekanik Sağlam Gövde",
    "tag": "Kale 157 A ECO",
    "deptId": "kaleLocksPanel",
    "category": "kale-tirajli",
    "thumb": "assets/rf-card-locks.jpg",
    "desc": "Bahçe kapıları, depo, atölye ve apartman dış kapıları için mandallı ve pirinç dilli mekanik Kale tirajlı kilit.",
    "meta": [
      "Model: 157 A ECO",
      "Masif Pirinç Dil ve Sürgü",
      "Dıştan Makaralı Silindir"
    ],
    "coverage": "Kutulu Tam Kilit Takımı",
    "sizes": [
      "157 A ECO Standart Tirajlı Kilit"
    ],
    "specs": {
      "standard": "TS EN 12209",
      "packaging": "Kutulu",
      "consumption": "Dış demir ve ahşap kapılar",
      "mixingRatio": "Kapı yüzeyine vidalama",
      "potLife": "Paslanmaya dirençli fırın boyalı gövde",
      "logistics": "Balçova Mağaza Stok"
    },
    "accordions": [
      {
        "title": "Sert Hava Koşullarına Direnç",
        "body": "Dış cephede yağmur, rüzgar ve neme maruz kalan bahçe kapılarında tutukluk yapmadan çalışır."
      }
    ]
  },
  {
    "id": "kale-151r-152r-gomme-kilit",
    "name": "Kale 151R & 152R Rulmanlı İç Oda ve WC Gömme Kilitleri",
    "badge": "Sessiz Rulmanlı Mekanizma",
    "tag": "Kale 151R / 152R",
    "deptId": "kaleLocksPanel",
    "category": "kale-gomme",
    "thumb": "assets/rf-card-locks.jpg",
    "desc": "Ahşap panel iç oda kapıları ve banyo/WC kapıları için pirinç rulmanlı diliyle sessizce kapanan Kale gömme kilit serisi.",
    "meta": [
      "151R Oda / 152R WC Modelleri",
      "Rulmanlı Sessiz Karşılık Dili",
      "Oval / Köşeli Ön Yüz Seçenekleri"
    ],
    "coverage": "Kutulu Kilit + Karşılık Sacı",
    "sizes": [
      "Kale 151R Oda Kapı Kilidi (Anahtarlı)",
      "Kale 152R Banyo/WC Kilidi (Mandallı)"
    ],
    "specs": {
      "standard": "TS EN 12209",
      "packaging": "Kutulu",
      "consumption": "İç mekan ahşap ve Amerikan panel kapılar",
      "mixingRatio": "Kapı kanadına gömme montaj",
      "potLife": "200.000 açma-kapama dayanımı",
      "logistics": "Balçova Showroom & Urla Depo"
    },
    "accordions": [
      {
        "title": "Rulmanlı Dille Çarpmasız Kapanma",
        "body": "Kapı çarpıldığında dilin üzerindeki pirinç rulman karşılık sacına yumuşakça kayar; ses yapmaz ve kapı kasasını yıpratmaz."
      }
    ]
  },
  {
    "id": "kale-153u-153p-dar-profil-kilit",
    "name": "Kale 153U & 153P Dar Tip Alüminyum & Demir Profil Kilidi",
    "badge": "Dar Profil Uyumlu",
    "tag": "Kale 153U / 153P",
    "deptId": "kaleLocksPanel",
    "category": "kale-gomme",
    "thumb": "assets/rf-card-locks.jpg",
    "desc": "Balkon camlama sistemleri, alüminyum doğramalar ve dar demir kutu profiller içine gömülebilen 20-25-30-35 mm eksen mesafeli dar profil kilitleri.",
    "meta": [
      "153U Makaralı / 153P Dilli",
      "Dar Eksen: 20/25/30/35 mm",
      "Nikel Kaplama Ön Sac"
    ],
    "coverage": "Kutulu Adet",
    "sizes": [
      "Kale 153U (Makaralı Dar Profil)",
      "Kale 153P (Dilli Dar Profil)"
    ],
    "specs": {
      "standard": "TS EN 12209",
      "packaging": "Kutulu",
      "consumption": "Alüminyum ve demir doğrama profilleri",
      "mixingRatio": "Profil içine gömme montaj",
      "potLife": "Korozyona dayanıklı galvaniz gövde",
      "logistics": "Balçova Mağaza Stok"
    },
    "accordions": [
      {
        "title": "Dar Alanlarda Yüksek Emniyet",
        "body": "Standart kilitlerin sığmadığı 40x40 veya 30x40 kutu profillere tam oturarak alüminyum ve ferforje kapılarda yüksek güvenlik sağlar."
      }
    ]
  },
  {
    "id": "kale-141r-demir-kapi-kilidi",
    "name": "Kale 141R Ağır Tip Demir Kapı Gömme Kilidi",
    "badge": "Ağır Tip Masif Demir Kilit",
    "tag": "Kale 141R Demir Kilit",
    "deptId": "kaleLocksPanel",
    "category": "kale-gomme",
    "thumb": "assets/rf-card-locks.jpg",
    "desc": "Bahçe giriş demir kapıları, bina yangın kapıları ve ağır sac kapılar için kaynak ve cıvataya uygun takviyeli Kale 141R gömme kilit.",
    "meta": [
      "Model: 141R",
      "Pirinç Sürgü ve Karşılık",
      "Ağır Hizmet Kasa Tipi"
    ],
    "coverage": "Kutulu Kilit",
    "sizes": [
      "Kale 141R Standart Demir Kapı Kilidi"
    ],
    "specs": {
      "standard": "TS EN 12209",
      "packaging": "Kutulu",
      "consumption": "Sac ve ferforje dış kapılar",
      "mixingRatio": "Demir kasaya montaj",
      "potLife": "Uzun ömürlü mekanik gövde",
      "logistics": "Stoktan Sevk"
    },
    "accordions": [
      {
        "title": "Deformasyona Karşı Güçlendirilmiş Gövde",
        "body": "Ağır demir kapıların ağırlığından ve esnemesinden etkilenmez, sürgü dili kasaya rahatça kilitlenir."
      }
    ]
  },
  {
    "id": "volkan-501-tirajli-kilit",
    "name": "Volkan Kilit 140 mm Tirajlı Dış Demir Kapı Kilidi (Kod: 501 / No: 14)",
    "badge": "Volkan Kod: 501 · No: 14",
    "tag": "Volkan 501 / No: 14",
    "deptId": "volkanOtomatsanPanel",
    "category": "volkan-kilit",
    "thumb": "assets/rf-card-locks.jpg",
    "desc": "İzmir genelinde demirci ustalarının ve apartman yönetimlerinin bir numaralı tercihi, kırılmaz döküm mandallı masif 140 mm Volkan tirajlı kilit.",
    "meta": [
      "Ürün Kodu: 501 (No: 14)",
      "140 mm Geniş Gövde",
      "Ağır Sanayi Demir Kilidi"
    ],
    "coverage": "Komple Kilit Gövdesi + Karşılık Sacı + Anahtarlar",
    "sizes": [
      "Volkan 501 140 mm Tirajlı Kilit"
    ],
    "specs": {
      "standard": "Yerli Sanayi Standartları / TSE Uyumlu",
      "packaging": "Orijinal Volkan Kilit Kutusu",
      "consumption": "Ağır demir bina ve bahçe kapıları",
      "mixingRatio": "Kapı profiline kaynak veya cıvatalama",
      "potLife": "On yıllarca arızasız mekanik çalışma",
      "logistics": "Balçova Mağaza Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Masif Döküm Dayanımı",
        "body": "İnce saç kilitlerin aksine kalın döküm gövdeye sahiptir; tekmeyle veya manivelayla zorlamalarda esnemez ve kırılmaz."
      }
    ]
  },
  {
    "id": "otomatsan-kapi-otomatigi",
    "name": "Otomatsan 8-12V Akıllı Zincirli Dış Kapı Otomatiği",
    "badge": "Otomatsan 8-12V Orijinal",
    "tag": "Otomatsan 8-12V",
    "deptId": "volkanOtomatsanPanel",
    "category": "otomatsan-otomat",
    "thumb": "assets/rf-card-locks.jpg",
    "desc": "Apartman ve site giriş kapılarında elektrikli kilit mekanizmasını çeken, ayarlanabilir yay tansiyonlu dayanıklı Otomatsan kapı otomatiği.",
    "meta": [
      "8-12 Volt AC Çalışma",
      "Zincirli ve Butonlu Çekme",
      "Sertleştirilmiş Çelik Yay"
    ],
    "coverage": "Kutulu Cihaz + Çekme Zinciri + Montaj Parçaları",
    "sizes": [
      "Otomatsan 8-12V Standart Kapı Otomatiği"
    ],
    "specs": {
      "standard": "Elektromekanik Kilit Standardı",
      "packaging": "Kutulu",
      "consumption": "Apartman diafon sistemleri",
      "mixingRatio": "Kapı kasasına vidalama",
      "potLife": "Milyon kez çekme testi",
      "logistics": "Balçova Mağaza Stok"
    },
    "accordions": [
      {
        "title": "Düşük Voltajda Güvenilir Tetikleme",
        "body": "Hatta voltaj düşüşü olsa dahi güçlü elektromıknatısı sayesinde kapıyı takılma yapmadan ilk basışta açar."
      }
    ]
  },
  {
    "id": "ymk-mandalli-hybrid-barel",
    "name": "YMK 868HBM Mandallı & 868HBS Hybrid Çelik Kapı Barelleri",
    "badge": "YMK 868 Serisi · Mandallı",
    "tag": "YMK 868HBM / 868HBS",
    "deptId": "volkanOtomatsanPanel",
    "category": "barel-asma-kilit",
    "thumb": "assets/rf-card-locks.jpg",
    "desc": "İçeriden anahtar aramadan topuzlu mandalla kilitlenen, dışarıdan yüksek güvenlikli bilyalı anahtarla açılan YMK 868HBM ve 868HBS hybrid bareller.",
    "meta": [
      "Kod: 868HBM & 868HBS",
      "İçten Ergonomik Çevirme Mandalı",
      "Hybrid Pirinç Gövde"
    ],
    "coverage": "Kutulu Barel + Anahtarlar",
    "sizes": [
      "YMK 868HBM Mandallı Barel (68 mm)",
      "YMK 868HBS Hybrid Barel (68 mm)",
      "YMK 868HBM Mandallı Barel (76 mm)"
    ],
    "specs": {
      "standard": "TS EN 1303",
      "packaging": "Kutulu",
      "consumption": "Çelik daire kapıları",
      "mixingRatio": "Standart kilit göbeği montajı",
      "potLife": "Pirinç anahtar mekanizması",
      "logistics": "Balçova Mağaza Stok"
    },
    "accordions": [
      {
        "title": "Acil Çıkışlarda Hayati Mandal Kolaylığı",
        "body": "Deprem, yangın veya acil durumlarda kapıyı kilitlemek ya da açmak için anahtar arama paniğini ortadan kaldırır; tek çevirmeyle kapı açılır."
      }
    ]
  },
  {
    "id": "tursan-935r-tirajli-kilit",
    "name": "Tursan 935R Dış Kapı Makaralı Tirajlı Kilit",
    "badge": "Tursan 935R Makaralı",
    "tag": "Tursan 935R",
    "deptId": "volkanOtomatsanPanel",
    "category": "volkan-kilit",
    "thumb": "assets/rf-card-locks.jpg",
    "desc": "Demir ve ahşap bahçe kapıları için sessiz çarpmalı makara sistemine sahip, dayanıklı gövdeli Tursan 935R tirajlı kilit.",
    "meta": [
      "Model: 935R",
      "Makaralı Dil Mekanizması",
      "Ağır Tip Yay Sistemi"
    ],
    "coverage": "Kutulu Kilit Takımı",
    "sizes": [
      "Tursan 935R Tirajlı Kilit"
    ],
    "specs": {
      "standard": "TS EN 12209",
      "packaging": "Kutulu",
      "consumption": "Demir ve bahçe kapıları",
      "mixingRatio": "Yüzey montajı",
      "potLife": "Paslanmaz çelik dil",
      "logistics": "Stoktan Sevk"
    },
    "accordions": [
      {
        "title": "Yumuşak Kapı Kapanışı",
        "body": "Rulmanlı makara dili sayesinde kapı rüzgardan kapandığında sert darbe ve ses yapmaz."
      }
    ]
  },
  {
    "id": "besel-kapi-itme-yayi",
    "name": "Beşel No: 14 ve No: 16 Ağır Tip Kapı İtme Yayı",
    "badge": "Beşel No: 14 / No: 16",
    "tag": "Beşel İtme Yayı",
    "deptId": "volkanOtomatsanPanel",
    "category": "volkan-kilit",
    "thumb": "assets/rf-card-locks.jpg",
    "desc": "Apartman dış kapıları ve bahçe demir kapılarının açık kalmasını önleyen, ayarlanabilir kuvvetli ağır çelik kapı kapatıcı itme yayı.",
    "meta": [
      "No: 14 & No: 16 Boyutları",
      "Özel Tavlı Çelik Yay",
      "Garantili Geri İtme Gücü"
    ],
    "coverage": "Adet Satışı (Pimli Ayar Çubuğu Dahil)",
    "sizes": [
      "Beşel No: 14 Kapı İtme Yayı (Orta Boy)",
      "Beşel No: 16 Kapı İtme Yayı (Ağır Boy)"
    ],
    "specs": {
      "standard": "TSE Standartlarında Yay Çeliği",
      "packaging": "Poşetli",
      "consumption": "Apartman ve bahçe demir kapıları",
      "mixingRatio": "Menteşe tarafına vidalama",
      "potLife": "Yorulmayan fırınlanmış çelik",
      "logistics": "Balçova Mağaza Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Apartman Güvenliği İçin Sürekli Kapalı Kapı",
        "body": "Giriş-çıkış sonrasında kapının açık kalmasını engelleyerek yabancıların binaya girmesini önler."
      }
    ]
  },
  {
    "id": "gk-kale-asma-kilit-grubu",
    "name": "GK & Kale Masif Pirinç ve Gri Döküm Asma Kilitler",
    "badge": "Masif Pirinç / Döküm Çelik",
    "tag": "Asma Kilit Grubu",
    "deptId": "volkanOtomatsanPanel",
    "category": "barel-asma-kilit",
    "thumb": "assets/rf-card-locks.jpg",
    "desc": "Depo, kepenk, bahçe kapısı, dolap ve alet sandıkları için kesilmeye dayanıklı sertleştirilmiş çelik kancalı masif asma kilitler.",
    "meta": [
      "Masif Pirinç & Gri Döküm",
      "Hardened Kesilmez Çelik Halka",
      "3 Adet Pirinç Anahtar"
    ],
    "coverage": "Kutulu Asma Kilit + 3 Anahtar",
    "sizes": [
      "30 mm Masif Pirinç Asma Kilit",
      "40 mm Masif Pirinç Asma Kilit",
      "50 mm Masif Pirinç Asma Kilit",
      "60 mm Ağır Tip Döküm Asma Kilit"
    ],
    "specs": {
      "standard": "TS EN 12320 Güvenlik Asma Kilit Standardı",
      "packaging": "Kutulu",
      "consumption": "Kepenk, depo ve sayaç panoları",
      "mixingRatio": "Kilit deliğine takma",
      "potLife": "Korozyona dirençli masif gövde",
      "logistics": "Balçova Mağaza Stok"
    },
    "accordions": [
      {
        "title": "Demir Makasıyla Kesilmeye Karşı 'Hardened' Çelik",
        "body": "Özel ısıl işlem görmüş sertleştirilmiş çelik kanca demir testeresi veya makasla kesilmeye karşı yüksek direnç gösterir."
      }
    ]
  },
  {
    "id": "nobel-bravo-aynali-kapi-kolu",
    "name": "Nobel Bravo Aynalı Kapı Kolu Serisi (Oda / WC / Dış Kapı)",
    "badge": "Nobel Orijinal · Bravo Seri",
    "tag": "Nobel Bravo Aynalı",
    "deptId": "doorHandlesPanel",
    "category": "nobel-aynali",
    "thumb": "assets/rf-card-locks.jpg",
    "desc": "Masif döküm gövdeli, ergonomik kavisli tutuşlu, çizilmelere karşı dayanıklı nikel-saten ve antik sarı kaplamalı Nobel Bravo aynalı kapı kolları.",
    "meta": [
      "Model: Nobel Bravo",
      "Oda, WC ve Dış Kapı Seçenekleri",
      "Ağır Döküm Sağlam Kol"
    ],
    "coverage": "Çift Kol Takımı (Sağ + Sol) + Montaj Vidaları + Alyan",
    "sizes": [
      "Nobel Bravo Aynalı Oda Kapı Kolu",
      "Nobel Bravo Aynalı WC Kapı Kolu",
      "Nobel Bravo Aynalı Çelik Kapı Kolu"
    ],
    "specs": {
      "standard": "TS EN 1906 / CE",
      "packaging": "Orijinal Nobel Kutu Takımı",
      "consumption": "Ahşap ve panel kapılar",
      "mixingRatio": "Kapı gövdesine vidalama",
      "potLife": "200.000 açma-kapama testi",
      "logistics": "Balçova Mağaza Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Sarkma Yapmayan Güçlü Çift Yay",
        "body": "İçindeki takviyeli çelik yay mekanizması sayesinde yıllar geçse bile kol aşağı doğru sarkmaz, her zaman yatay eksenini korur."
      }
    ]
  },
  {
    "id": "nobel-rozetli-kapi-kolu",
    "name": "Nobel Rozetli Modern Kapı Kolu (Saten Nikel & Mat Siyah)",
    "badge": "Modern Rozetli Tasarım",
    "tag": "Nobel Rozetli Kol",
    "deptId": "doorHandlesPanel",
    "category": "nobel-rozetli",
    "thumb": "assets/rf-card-locks.jpg",
    "desc": "Minimalist iç mekan tasarımları için yuvarlak veya kare rozetli, gizli vidalı kapaklı lüks Nobel kapı kolu koleksiyonu.",
    "meta": [
      "Mat Siyah / Saten Nikel Kaplama",
      "Kare & Yuvarlak Rozet Seçenekleri",
      "Gizli Montaj Vidaları"
    ],
    "coverage": "Çift Kol + 2 Rozet + 2 Alt Rozet Kapağı",
    "sizes": [
      "Nobel Rozetli Saten Nikel Kol Takımı",
      "Nobel Rozetli Mat Siyah Kare Kol Takımı"
    ],
    "specs": {
      "standard": "TS EN 1906",
      "packaging": "Kutulu Takım",
      "consumption": "Lüks villa ve daire içi oda kapıları",
      "mixingRatio": "Karşılıklı alyan cıvata sabitlemeli",
      "potLife": "Elektrostatik çizilmez fırın boya",
      "logistics": "Balçova Mağaza Stok"
    },
    "accordions": [
      {
        "title": "Alyan Kilitli Masif Mil",
        "body": "Kare demir mil her iki koldan alyan vidalarla sıkıştırıldığından kapı çekildiğinde kolun elinizde kalma riski sıfırdır."
      }
    ]
  },
  {
    "id": "omega-rozetli-kapi-kolu",
    "name": "Omega Rozetli Alüminyum & Zamak Kapı Kolu",
    "badge": "Omega Lüks Seri",
    "tag": "Omega Rozetli Kol",
    "deptId": "doorHandlesPanel",
    "category": "nobel-rozetli",
    "thumb": "assets/rf-card-locks.jpg",
    "desc": "Modern düz hatları, parmak izi tutmayan pürüzsüz saten yüzeyiyle hem konut hem ofis projelerinde tercih edilen Omega rozetli kapı kolu.",
    "meta": [
      "Zamak / Alüminyum Gövde",
      "Saten Krom Yüzey",
      "Hafif ve Mukavim"
    ],
    "coverage": "Takım (Sağ/Sol)",
    "sizes": [
      "Omega Rozetli Saten Kol Takımı"
    ],
    "specs": {
      "standard": "TS EN 1906",
      "packaging": "Kutulu",
      "consumption": "Oda ve ofis kapıları",
      "mixingRatio": "Rozetli montaj",
      "potLife": "Uzun ömürlü yay mekanizması",
      "logistics": "Stoktan Sevk"
    },
    "accordions": [
      {
        "title": "Ergonomik ve Sessiz Çalışma",
        "body": "Elin anatomisine tam oturan tasarımı açma kapamada konfor sağlar, iç teflon burçları sürtünme sesini yok eder."
      }
    ]
  },
  {
    "id": "elif-maydanoz-hira-kollari",
    "name": "Elif (Maydanoz & Hira Modelleri) Aynalı Kapı Kolları",
    "badge": "Klasik Döküm Aynalı",
    "tag": "Elif Maydanoz / Hira",
    "deptId": "doorHandlesPanel",
    "category": "nobel-aynali",
    "thumb": "assets/rf-card-locks.jpg",
    "desc": "Geleneksel Türk mimarisinde ve klasik ahşap kapılarda nostaljik zarafet sunan Elif Maydanoz ve Hira modeli aynalı pirinç kapı kolları.",
    "meta": [
      "Maydanoz & Hira Desenleri",
      "Sarı Antik & Nikel Renkler",
      "Ağır Döküm Desenli Ayna"
    ],
    "coverage": "Çift Kol Takımı",
    "sizes": [
      "Elif Maydanoz Modeli Aynalı Kol",
      "Elif Hira Modeli Aynalı Kol"
    ],
    "specs": {
      "standard": "Geleneksel Hırdavat Standartları",
      "packaging": "Kutulu Takım",
      "consumption": "Masif ahşap ve klasik kapılar",
      "mixingRatio": "Aynadan ahşaba vidalama",
      "potLife": "Solmayan antik kaplama",
      "logistics": "Balçova Mağaza Stok"
    },
    "accordions": [
      {
        "title": "Tarihi ve Klasik Evlerin Tercihi",
        "body": "Özellikle tarihi İzmir evleri, taş villa ve klasik mobilyalı mekanlarda orijinal dokuya mükemmel uyum sağlar."
      }
    ]
  },
  {
    "id": "pole-vent-gris-tasarim-kollar",
    "name": "Pole, Vent & Gris Tasarım Rozetli Kapı Kolları",
    "badge": "Mimari Tasarım Koleksiyonu",
    "tag": "Pole / Vent / Gris",
    "deptId": "doorHandlesPanel",
    "category": "nobel-rozetli",
    "thumb": "assets/rf-card-locks.jpg",
    "desc": "İç mimarların modern projelerde tercih ettiği minimalist kavisli Pole, Vent ve Gris serisi rozetli kapı kolları.",
    "meta": [
      "Pole, Vent ve Gris Modelleri",
      "Füme / Antrasit / Siyah Seçenekler",
      "İnce Rozet Mimarisi"
    ],
    "coverage": "Kutulu Takım",
    "sizes": [
      "Pole Rozetli Tasarım Kol",
      "Vent Rozetli Tasarım Kol",
      "Gris Rozetli Tasarım Kol"
    ],
    "specs": {
      "standard": "TS EN 1906",
      "packaging": "Kutulu",
      "consumption": "Modern renovasyon ve villa projeleri",
      "mixingRatio": "Karşılıklı cıvata montajı",
      "potLife": "Aşınmaz PVD kaplama",
      "logistics": "Balçova Mağaza Stok"
    },
    "accordions": [
      {
        "title": "Ultra İnce Rozet Estetiği",
        "body": "Kapı yüzeyinde çıkıntı yapmayan ince rozet tabanıyla modern kapı kanatlarında kesintisiz bir çizgi sunar."
      }
    ]
  },
  {
    "id": "sahin-vet75-cekme-kapi-kolu",
    "name": "Şahin VET-75 224 mm Modern Çekme Kapı Kolu",
    "badge": "224 mm Masif Çekme Kol",
    "tag": "Şahin VET-75 · 224mm",
    "deptId": "doorHandlesPanel",
    "category": "nobel-rozetli",
    "thumb": "assets/rf-card-locks.jpg",
    "desc": "Çelik kapı dış yüzeyleri, bina ana girişleri ve ofis cam kapıları için masif alüminyum gövdeli 224 mm Şahin VET-75 çekme kapı kolu.",
    "meta": [
      "Model: VET-75 (224 mm Eksen)",
      "Masif Alüminyum Gövde",
      "Çelik Kapı Dış Çekme Kolu"
    ],
    "coverage": "Adet Satışı (Bağlantı Cıvataları Dahil)",
    "sizes": [
      "Şahin VET-75 224 mm Saten Krom",
      "Şahin VET-75 224 mm Mat Siyah"
    ],
    "specs": {
      "standard": "Ağır Hizmet Kapı Donanımı",
      "packaging": "Kutulu",
      "consumption": "Çelik ve demir giriş kapıları",
      "mixingRatio": "Arkadan gömme cıvata bağlantısı",
      "potLife": "Kırılmaz masif çekme gövde",
      "logistics": "Balçova Mağaza Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Sağlam Kavrama ve Yüksek Çekme Mukavemeti",
        "body": "Ağır çelik kapıların açılmasında eli acıtmayan yumuşak kenar pahlarına ve yüksek taşıma direncine sahiptir."
      }
    ]
  },
  {
    "id": "izmir-anahtar-kopyalama-servisi",
    "name": "İzmir Anahtar Kopyalama Servisi & Bilyalı Çelik Kapı Anahtar Çekimi",
    "badge": "Balçova Mağaza İçi Anında Çekim",
    "tag": "İzmir Anahtar Kopyalama",
    "deptId": "keyDuplicationPanel",
    "category": "anahtar-panosu",
    "thumb": "assets/rf-card-locks.jpg",
    "desc": "Balçova mağazamızdaki profesyonel lazer ve mekanik anahtar kesim makineleriyle çelik kapı, oda kapısı ve asma kilit anahtarlarının 1 dakikada kusursuz kopyalanması.",
    "meta": [
      "Balçova Mağazamızda Canlı Servis",
      "Mikron Hassasiyetinde Lazer Kesim",
      "Kopya Garantisi"
    ],
    "coverage": "Adet Başına Çekim Hizmeti",
    "sizes": [
      "Çelik Kapı Bilyalı / Delikli Anahtar Çekimi",
      "Oda Kapısı Standart Çentikli Anahtar Çekimi",
      "Kasa ve Çift Taraflı Anahtar Çekimi"
    ],
    "specs": {
      "standard": "Yüksek Hassasiyetli CNC Kesim",
      "packaging": "Hazır Kesilmiş Anahtar",
      "consumption": "Yedek anahtar ihtiyacı",
      "mixingRatio": "Orijinal anahtar üzerinden kopyalama",
      "potLife": "Aşınmaya dayanıklı pirinç ham uç",
      "logistics": "Balçova Mağazamızda 2 Dakikada Teslim"
    },
    "accordions": [
      {
        "title": "Birebir Mikronik Kesim Garantisi",
        "body": "Optik okuyuculu elektronik makinelerimiz orijinal anahtarın aşınmış dişlerini dahi düzelterek kilidi ilk günkü akıcılığında açan kusursuz kopyalar üretir."
      }
    ]
  },
  {
    "id": "kale-daf-ham-anahtarlar",
    "name": "KALE & DAF Profil Orijinal Ham Anahtar Serisi",
    "badge": "Orijinal Profil Pirinç",
    "tag": "KALE & DAF Ham Anahtar",
    "deptId": "keyDuplicationPanel",
    "category": "anahtar-panosu",
    "thumb": "assets/rf-card-locks.jpg",
    "desc": "Kale ve DAF bareller için fabrikasyon kanal ölçülerine sahip, yüksek saflıkta sarı pirinçten üretilmiş orijinal profil ham anahtarlar.",
    "meta": [
      "Kale & DAF Orijinal Kanalları",
      "Masif Pirinç Alaşım",
      "Kırılmaya Dirençli Boyun"
    ],
    "coverage": "Adet / Kutu",
    "sizes": [
      "Kale Standart Profil Ham Anahtar",
      "Kale Bilyalı GNC Ham Anahtar",
      "DAF Bilyalı Profil Ham Anahtar"
    ],
    "specs": {
      "standard": "Orijinal Kilit Üretici Standartları",
      "packaging": "50'li Kutu",
      "consumption": "Anahtar çoğaltma",
      "mixingRatio": "Anahtar makinesinde işleme",
      "potLife": "Yıllarca aşınmayan dişler",
      "logistics": "Balçova Mağaza Stok"
    },
    "accordions": [
      {
        "title": "Barel Pimlerini Koruyan Orijinal Kanal",
        "body": "Kanal toleransları barele milimetrik oturduğundan barel içindeki minik şifre pimlerini aşındırmaz ve kilidin ömrünü uzatır."
      }
    ]
  },
  {
    "id": "sebu-tps-ham-anahtarlar",
    "name": "SEBÜ & TPS Profil Ham Anahtar Çeşitleri",
    "badge": "Geniş Profil Çeşidi",
    "tag": "SEBÜ & TPS Ham Anahtar",
    "deptId": "keyDuplicationPanel",
    "category": "anahtar-panosu",
    "thumb": "assets/rf-card-locks.jpg",
    "desc": "Apartman dış kapı otomatikleri, tirajlı kilitler ve asma kilitler için SEBÜ ve TPS markalı universal ham anahtar profilleri.",
    "meta": [
      "SEBÜ & TPS Profil Kodları",
      "Geniş Kanal Yelpazesi",
      "Yüksek Kalite Pirinç / Çelik"
    ],
    "coverage": "Adet Satışı",
    "sizes": [
      "SEBÜ Tirajlı Kilit Ham Anahtarı",
      "TPS Asma Kilit Ham Anahtarı"
    ],
    "specs": {
      "standard": "İzmir Anahtar Panosu Standartları",
      "packaging": "Paketli",
      "consumption": "Yedek anahtar kopyalama",
      "mixingRatio": "Çarklı makinede diş açma",
      "potLife": "Dayanıklı kafa ve gövde",
      "logistics": "Balçova Mağaza Stok"
    },
    "accordions": [
      {
        "title": "Her Modele Uygun Profil Genişliği",
        "body": "Piyasada bulunan eski ve yeni tip tüm tirajlı kilit profillerini eksiksiz karşılar."
      }
    ]
  },
  {
    "id": "volkan-otomatsan-ham-anahtarlar",
    "name": "VOLKAN & OTOMATSAN Profil Ham Anahtarlar",
    "badge": "Apartman & Demir Kapı Profili",
    "tag": "VOLKAN & OTOMATSAN",
    "deptId": "keyDuplicationPanel",
    "category": "anahtar-panosu",
    "thumb": "assets/rf-card-locks.jpg",
    "desc": "Volkan 501 tirajlı kilitler ve Otomatsan kapı otomatikleri için kalın gövdeli, zorlamaya dayanıklı özel ham anahtar profilleri.",
    "meta": [
      "Volkan 501 Orijinal Kanalı",
      "Otomatsan Çekmece & Kapı Profili",
      "Kalın Gövde Direnci"
    ],
    "coverage": "Adet Satışı",
    "sizes": [
      "Volkan 501 Tirajlı Ham Anahtar",
      "Otomatsan Kapı Otomatiği Ham Anahtar"
    ],
    "specs": {
      "standard": "Tirajlı Kilit Standartları",
      "packaging": "Adet",
      "consumption": "Apartman sakinleri için toplu anahtar çekimi",
      "mixingRatio": "Hızlı kopyalama",
      "potLife": "Bükülmeyen kalın gövde",
      "logistics": "Balçova Mağaza Stok"
    },
    "accordions": [
      {
        "title": "Apartman Yöneticilerine Toplu Çekim Hizmeti",
        "body": "Bina sakinleri için istenen adette (20-50-100 adet) seri ve hatasız apartman anahtarı çekimi yapılır."
      }
    ]
  },
  {
    "id": "ito-klasik-oda-anahtarlari",
    "name": "İTO & Klasik Oda / Kasa Anahtarı Ham Profilleri",
    "badge": "Klasik Dilli & Kasa Tipi",
    "tag": "İTO & Kasa Anahtarları",
    "deptId": "keyDuplicationPanel",
    "category": "anahtar-panosu",
    "thumb": "assets/rf-card-locks.jpg",
    "desc": "İç oda kapıları, antika mobilyalar, çelik para kasaları ve asma kilitler için boru anahtarlar, çift taraflı kanatlı kasa anahtarları.",
    "meta": [
      "İTO Oda Kapısı Ham Anahtarı",
      "Çift Kanatlı Kasa Anahtarı",
      "Boru Delikli Uçlar"
    ],
    "coverage": "Adet Satışı",
    "sizes": [
      "İTO Klasik Oda Kapı Anahtarı",
      "Çelik Para Kasası Ham Anahtarı",
      "Antika Mobilya Boru Anahtarı"
    ],
    "specs": {
      "standard": "Özel Kasa ve Mobilya Standartları",
      "packaging": "Adet",
      "consumption": "Özel kilit kopyalama",
      "mixingRatio": "Lazer ve freze ile diş açma",
      "potLife": "Kırılmaz çelik / döküm",
      "logistics": "Balçova Mağaza Stok"
    },
    "accordions": [
      {
        "title": "Nadir Bulunan Antika ve Kasa Profilleri",
        "body": "Modern anahtarcılarda bulunmayan eski tip boru ve çift kanatlı kasa anahtarlarını geniş panomuzdan anında temin edebilirsiniz."
      }
    ]
  },
  {
    "id": "neks-ozsan-celik-mentese",
    "name": "Neks & Özsan Rulmanlı Çelik ve Ahşap Kapı Menteşeleri (10-12 cm)",
    "badge": "Rulmanlı Ağır Hizmet",
    "tag": "Neks & Özsan Menteşe",
    "deptId": "hingesHardwarePanel",
    "category": "mentese-donanim",
    "thumb": "assets/rf-card-locks.jpg",
    "desc": "Ağır ahşap panel ve çelik kapıların sürtünmeden sessizce açılıp kapanmasını sağlayan çift bilyalı rulmanlı Neks ve Özsan kapı menteşeleri.",
    "meta": [
      "10 cm ve 12 cm Boyutlar",
      "Çift Bilyalı Çelik Rulman",
      "Saten / Sarı / Antik Renkler"
    ],
    "coverage": "Çift Menteşe Takımı + Vidalar",
    "sizes": [
      "10 cm Rulmanlı Kapı Menteşesi (Saten)",
      "12 cm Rulmanlı Kapı Menteşesi (Ağır Kapılar)",
      "Cumba / Yaylı Kendiliğinden Kapanan Menteşe"
    ],
    "specs": {
      "standard": "TS EN 1935 / CE",
      "packaging": "Kutulu Takım",
      "consumption": "Her kapı kanadına 3 adet menteşe",
      "mixingRatio": "Kapı ve kasaya freze açılarak vidalama",
      "potLife": "Sarkma yapmayan 100 kg taşıma kapasitesi",
      "logistics": "Balçova Mağaza Stok"
    },
    "accordions": [
      {
        "title": "Kapının Zamanla Yere Sürtmesini Engeller",
        "body": "İçindeki sertleştirilmiş çelik bilyalı rulmanlar kapının zamanla sarkmasını ve laminat parkeye sürtmesini kalıcı olarak önler."
      }
    ]
  },
  {
    "id": "celik-kapi-emniyet-kelepcesi",
    "name": "Çelik Kapı Gizli Emniyet Kelepçesi ve Paslanmaz Güvenlik Zinciri",
    "badge": "Hırsızlığa Karşı Ek Emniyet",
    "tag": "Emniyet Kelepçesi",
    "deptId": "hingesHardwarePanel",
    "category": "mentese-donanim",
    "thumb": "assets/rf-card-locks.jpg",
    "desc": "Kapıyı aralık bırakarak dışarıdaki kişiyi görmeyi sağlayan, zorlamalara karşı kapının tamamen açılmasını engelleyen masif çelik emniyet kelepçesi.",
    "meta": [
      "Masif Pirinç / Çelik Döküm",
      "Gizli Emniyet Mandalı",
      "Yüksek Çekme Direnci"
    ],
    "coverage": "Kutulu Kelepçe + Montaj Cıvataları",
    "sizes": [
      "Çelik Kapı Emniyet Kelepçesi (Saten Krom)",
      "Ağır Hizmet Paslanmaz Çelik Kapı Zinciri"
    ],
    "specs": {
      "standard": "Kapı Güvenlik Aksesuar Standardı",
      "packaging": "Kutulu",
      "consumption": "Daire dış kapıları",
      "mixingRatio": "Kapı kanadı ve kasasına vidalama",
      "potLife": "Levye darbelerine dayanıklı",
      "logistics": "Balçova Mağaza Stok"
    },
    "accordions": [
      {
        "title": "Hane Halkı Güvenliği",
        "body": "Kapı çaldığında kapıyı tamamen açmadan 10 cm aralıkla dışarıdaki kişiyi güvenle kontrol etme imkanı verir."
      }
    ]
  },
  {
    "id": "agir-demir-kapi-surguleri",
    "name": "Ağır Tip Demir Kapı Sürgüleri (Döküm & Yaylı)",
    "badge": "Masif Döküm Demir Sürgü",
    "tag": "Demir Kapı Sürgüsü",
    "deptId": "hingesHardwarePanel",
    "category": "mentese-donanim",
    "thumb": "assets/rf-card-locks.jpg",
    "desc": "Bahçe kapıları, ferforje kanatlar ve depo girişleri için kaynaklı veya vidalı masif çelik pimli yaylı otomatik ve kollu sürgüler.",
    "meta": [
      "15 cm – 30 cm Boy Seçenekleri",
      "Yaylı Otomatik Kilit Dili",
      "Asma Kilit Takılabilir Delikli Halka"
    ],
    "coverage": "Adet Satışı",
    "sizes": [
      "15 cm Yaylı Demir Kapı Sürgüsü",
      "20 cm Ağır Tip Kollu Sürgü",
      "30 cm Zemin Sabitleme Sürgüsü"
    ],
    "specs": {
      "standard": "Ağır Demir Doğrama Donanımı",
      "packaging": "Adet",
      "consumption": "Çift kanatlı demir kapılar",
      "mixingRatio": "Kaynak veya cıvatalama",
      "potLife": "Paslanmaz fırın boya",
      "logistics": "Balçova Mağaza Stok"
    },
    "accordions": [
      {
        "title": "Çift Kanatlı Kapılarda Sabitleme",
        "body": "Kapı kanatlarından birini zemine ve üst lentoya kilitleyerek diğer kanadın kilitlenmesi için sabit bir dayanak oluşturur."
      }
    ]
  },
  {
    "id": "ba-4005t-kapi-tamponu",
    "name": "BA-4005T Vidalı & Yapışkanlı Kauçuk Kapı Tamponu (Stoper)",
    "badge": "Duvar & Kol Koruyucu Tampon",
    "tag": "BA-4005T Kapı Tamponu",
    "deptId": "hingesHardwarePanel",
    "category": "mentese-donanim",
    "thumb": "assets/rf-card-locks.jpg",
    "desc": "Kapı kolunun duvara çarpıp alçıyı patlatmasını veya kapı camının kırılmasını engelleyen masif pirinç gövdeli kalın kauçuk başlıklı BA-4005T stoper.",
    "meta": [
      "Model: BA-4005T",
      "Kalın Darbe Emici Kauçuk Başlık",
      "Zemine Vidalı veya 3M Yapışkanlı"
    ],
    "coverage": "Kutulu / Poşetli Adet",
    "sizes": [
      "BA-4005T Vidalı Zemin Tamponu (Saten)",
      "BA-4005T Yapışkanlı Zemin Tamponu (Delmesiz)",
      "Duvara Monte Uzun Kapı Tamponu"
    ],
    "specs": {
      "standard": "Kapı Koruma Donanım Standardı",
      "packaging": "Adet",
      "consumption": "Her kapı arkasına 1 adet",
      "mixingRatio": "Parke veya süpürgeliğe montaj",
      "potLife": "Yıpranmayan elastik kauçuk",
      "logistics": "Balçova Mağaza Rafından Teslim"
    },
    "accordions": [
      {
        "title": "Duvar Boyasını ve Kapı Kolunu Korur",
        "body": "Cereyanda çarpan kapıların kolunun duvarda delik açmasını engeller, darbe sesini kauçuğuyla emer."
      }
    ]
  },
  {
    "id": "samet-star-tas-mentese",
    "name": "Samet / Star Frenli Kapak Tas Menteşeleri (Düz, Deveboynu, Süper Deveboynu)",
    "badge": "Frenli Soft-Close Menteşe",
    "tag": "Frenli Tas Menteşe",
    "deptId": "furnitureFittingsPanel",
    "category": "mobilya-donanim",
    "thumb": "assets/rf-card-locks.jpg",
    "desc": "Mutfak, banyo ve giyinme odası dolap kapaklarının çarpmadan sessizce kapanmasını sağlayan entegre hidrolik frenli tas menteşe grubu.",
    "meta": [
      "Entegre Yağlı Piston Freni",
      "Düz, Deveboynu, Süper Deveboynu",
      "Eksantrik 3D Kapak Ayarı"
    ],
    "coverage": "Adet / Kutu (Alt Taban Sacı Dahil)",
    "sizes": [
      "Düz Frenli Tas Menteşe (Dıştan Kapak)",
      "Deveboynu Frenli Menteşe (Yarım Binili)",
      "Süper Deveboynu Frenli Menteşe (İçten Kapak)"
    ],
    "specs": {
      "standard": "TS EN 15570 Mobilya Menteşe Standardı",
      "packaging": "Kutulu",
      "consumption": "Dolap kapakları (Kapak başına 2-3 adet)",
      "mixingRatio": "35 mm tas deliğine montaj",
      "potLife": "80.000 açma-kapama testi",
      "logistics": "Balçova Mağaza Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Kapağın Çarpmasını Engelleyen Hidrolik Fren",
        "body": "Kapak son 15 derecede hidrolik piston tarafından yakalanır ve yavaşça, sıfır sesle kendiliğinden kapanır."
      }
    ]
  },
  {
    "id": "teleskopik-bilyali-cekmece-rayi",
    "name": "Teleskopik Bilyalı Çekmece Rayları (Frenli & Düz - 35-50 cm)",
    "badge": "45 kg Taşıma Kapasitesi",
    "tag": "Teleskopik Çekmece Rayı",
    "deptId": "furnitureFittingsPanel",
    "category": "mobilya-donanim",
    "thumb": "assets/rf-card-locks.jpg",
    "desc": "Mutfak ve ofis çekmecelerinde çekmecenin sonuna kadar açılmasını (tam açılım) sağlayan çelik bilyalı, ağır yük taşımaya uygun teleskopik raylar.",
    "meta": [
      "35 cm, 40 cm, 45 cm, 50 cm Boylar",
      "Tam Açılımlı Çift Bilyalı Yatak",
      "Frenli (Soft-Close) ve Standart"
    ],
    "coverage": "Çift Takım (Sağ + Sol Ray)",
    "sizes": [
      "35 cm Teleskopik Ray Takımı",
      "40 cm Teleskopik Ray Takımı",
      "45 cm Teleskopik Ray Takımı",
      "50 cm Teleskopik Ray Takımı",
      "45 cm Frenli (Soft-Close) Ray Takımı"
    ],
    "specs": {
      "standard": "TS EN 15338",
      "packaging": "Çiftli Paket",
      "consumption": "Her çekmece için 1 çift ray",
      "mixingRatio": "Çekmece yanına ve dolap içine vidalama",
      "potLife": "45 kg dinamik yük kapasitesi",
      "logistics": "Balçova Mağaza Stok"
    },
    "accordions": [
      {
        "title": "Çekmecenin Arkasındaki Eşyalara Kolay Ulaşım",
        "body": "Tam açılım özelliği sayesinde çekmece kasası %100 dışarı çıkar; çekmecenin en arkasındaki eşyalar bile rahatça alınır."
      }
    ]
  },
  {
    "id": "gazli-piston-kapak-amortsoru",
    "name": "Gazlı Piston Yukarı Açılır Kapak Amortisörü (80N / 100N / 120N)",
    "badge": "Gaz Basınçlı Kapak Tutucu",
    "tag": "Gazlı Kapak Pistonu",
    "deptId": "furnitureFittingsPanel",
    "category": "mobilya-donanim",
    "thumb": "assets/rf-card-locks.jpg",
    "desc": "Mutfak üst dolaplarında yukarı doğru açılan yatay kapakların havada sabit kalmasını ve yumuşakça açılmasını sağlayan nitrojen gazlı piston.",
    "meta": [
      "80 Newton, 100 Newton, 120 Newton",
      "Kapağı Havada Askıda Tutar",
      "Sessiz ve Akışkan Hareket"
    ],
    "coverage": "Adet Satışı (Bağlantı Ayakları Dahil)",
    "sizes": [
      "80N Gazlı Piston (Hafif Kapaklar)",
      "100N Gazlı Piston (Standart Mutfak Kapağı)",
      "120N Gazlı Piston (Geniş Ahşap/Cam Kapak)"
    ],
    "specs": {
      "standard": "Mobilya Mekanizma Standartları",
      "packaging": "Poşetli Set (Montaj Ayakları Dahil)",
      "consumption": "Yukarı açılır dolap kapakları (Kapak başına 1-2 adet)",
      "mixingRatio": "Gövde ve kapağa klipsli geçme ayak montajı",
      "potLife": "50.000 açma-kapama",
      "logistics": "Balçova Mağaza Stok"
    },
    "accordions": [
      {
        "title": "Kapağı Başınızın Üzerinde Sabit Tutar",
        "body": "Kapağı açtığınızda elinizle tutmak zorunda kalmazsınız; dolap içine iki elinizle tencere ve tabakları rahatça dizersiniz."
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
    kaleLocksPanel: document.getElementById("kaleLocksPanel"),
    volkanOtomatsanPanel: document.getElementById("volkanOtomatsanPanel"),
    doorHandlesPanel: document.getElementById("doorHandlesPanel"),
    keyDuplicationPanel: document.getElementById("keyDuplicationPanel"),
    hingesHardwarePanel: document.getElementById("hingesHardwarePanel"),
    furnitureFittingsPanel: document.getElementById("furnitureFittingsPanel")
  };

  var currentActiveTab = "kaleLocksPanel";
  var currentProduct = null;
  var selectedSize = "";

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
      var panel = pill.closest(".pv-tab-panel");
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

  /* Attach click listeners to static product rows */
  document.querySelectorAll(".pv-menu-row").forEach(function(row) {
    var pid = row.getAttribute("data-product-id");
    row.addEventListener("click", function() {
      openModal(pid);
    });
    row.addEventListener("keydown", function(e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(pid);
      }
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
    var p = KILIT_PRODUCTS_DATA.find(function(item) { return item.id === productId; });
    if (!p) return;
    currentProduct = p;

    if (modalProductTitle) modalProductTitle.textContent = p.name;
    if (modalProductEyebrow) modalProductEyebrow.textContent = p.badge ? ("PERVAN · " + p.badge) : "PERVAN · KİLİT & KAPI DONANIMI";
    if (modalProductDesc) modalProductDesc.textContent = p.desc;
    if (modalProductImg) {
      modalProductImg.src = p.thumb;
      modalProductImg.alt = p.name;
    }

    /* Sizes / Models */
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
    if (modalSpecStandard) modalSpecStandard.textContent = p.badge || "TS EN Standart";
    if (modalSpecConsumption) modalSpecConsumption.textContent = p.coverage || "Standart Üretim";
    if (modalSpecPackaging) modalSpecPackaging.textContent = (p.sizes && p.sizes[0]) ? p.sizes[0] : "Orijinal Ambalaj";

    /* Specs Table */
    var sp = p.specs || {};
    if (modalSpecStandardRow) modalSpecStandardRow.textContent = sp.standard || p.badge || "-";
    if (modalSpecPackagingRow) modalSpecPackagingRow.textContent = sp.packaging || (p.sizes ? p.sizes.join(", ") : "-");
    if (modalSpecMixing) modalSpecMixing.textContent = sp.mixingRatio || sp.consumption || "-";
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
    if (!modalWABtn || !currentProduct) return;
    var rawText = "Merhaba, Kilit & Kapı Donanımı kataloğunuzdan '" + currentProduct.name + "' (" + selectedSize + ") ürünü için Balçova/Urla stok durumu ve fiyat teklifi öğrenmek istiyorum.";
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

  // SPOTLIGHT COMMAND PALETTE ENGINE (⌘K / 30 Ürün Arama)
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
    return d ? d.short : "Kilit & Kapı";
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
    if (spotlightCount) spotlightCount.textContent = KILIT_PRODUCTS_DATA.length + " Ürün Yayında";
    if (spotlightResults) {
      spotlightResults.innerHTML = '<div class="pv-spotlight-hint">' +
        '<span>İpucu: Kale tuzaklı barel, Volkan 140mm tirajlı kilit, Otomatsan, Nobel Bravo kapı kolu veya anahtar çekimi yazarak arayabilirsiniz.</span>' +
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

    KILIT_PRODUCTS_DATA.forEach(function(prod) {
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
      var waText = encodeURIComponent("Merhaba, Kilit & Kapı kataloğunuzda '" + rawQuery + "' aradım ancak bulamadım. Bu ürün hakkında stok ve fiyat bilgisi alabilir miyim?");
      spotlightResults.innerHTML = '<div class="pv-spotlight-empty-box">' +
        '<div class="pv-spotlight-empty-title">Eşleşen ürün bulunamadı</div>' +
        '<p class="pv-spotlight-empty-desc">Aradığınız kilit veya barel özel sipariş olabilir. Balçova anahtar ve hırdavat uzmanlarımıza doğrudan sorabilirsiniz:</p>' +
        '<a href="https://wa.me/905323844497?text=' + waText + '" target="_blank" rel="noopener" class="pv-btn-primary" style="max-width: 320px; font-size: 12px; padding: 11px 18px; min-height: 42px;">' +
        'WhatsApp ile Kilit Danış' +
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
        var p = KILIT_PRODUCTS_DATA.find(function(it) { return it.id === pid; });
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
  renderDeptDrawer("kaleLocksPanel");
  syncMobileFilterRail("kaleLocksPanel");
})();
