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

  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
      hex = hex.split('').map(function(c) { return c + c; }).join('');
    }
    var num = parseInt(hex, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255].join(', ');
  }

  function syncActiveState(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;
    currentIndex = index;

    var activeHex = slides[index].getAttribute("data-code") || '#0284C7';

    slides.forEach(function(slide, idx) {
      slide.classList.toggle("active", idx === index);
    });

    stage.style.setProperty('--pv-chroma-hex', activeHex);
    stage.style.setProperty('--pv-chroma-rgb', hexToRgb(activeHex));

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

  // 1:1 Kinetic Native Scroll Event
  track.addEventListener("scroll", function() {
    var slideWidth = track.clientWidth;
    if (!slideWidth) return;

    var nearestIndex = Math.round(track.scrollLeft / slideWidth);
    if (nearestIndex !== currentIndex && nearestIndex >= 0 && nearestIndex < totalSlides) {
      syncActiveState(nearestIndex);
    }
  }, { passive: true });

  // 1:1 Pointer Drag Engine
  var isPointerDown = false;
  var pointerStartX = 0;
  var pointerScrollStart = 0;
  var pointerMoved = 0;

  track.addEventListener("pointerdown", function(e) {
    if (e.pointerType && e.pointerType !== "mouse") return;
    if (e.button !== 0) return;
    if (e.target.closest("a, button")) return;
    isPointerDown = true;
    pointerStartX = e.clientX;
    pointerScrollStart = track.scrollLeft;
    pointerMoved = 0;
    track.style.scrollBehavior = "auto";
    track.style.scrollSnapType = "none";
    stopAutoPlay();
  });

  window.addEventListener("pointermove", function(e) {
    if (!isPointerDown) return;
    var delta = e.clientX - pointerStartX;
    pointerMoved += Math.abs(delta);
    track.scrollLeft = pointerScrollStart - delta;
  });

  function handlePointerRelease() {
    if (!isPointerDown) return;
    isPointerDown = false;
    track.style.scrollBehavior = "smooth";
    track.style.scrollSnapType = "x mandatory";

    var slideWidth = track.clientWidth;
    var targetIdx = Math.round(track.scrollLeft / slideWidth);
    targetIdx = Math.max(0, Math.min(totalSlides - 1, targetIdx));
    goToSlide(targetIdx, true);
    startAutoPlay();
  }

  window.addEventListener("pointerup", handlePointerRelease);
  window.addEventListener("pointercancel", handlePointerRelease);

  track.addEventListener("click", function(e) {
    if (pointerMoved > 8) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

  // Large arrow buttons
  if (prevBtn) {
    prevBtn.addEventListener("click", function(e) {
      e.stopPropagation();
      goToSlide(currentIndex - 1, true);
      restartAutoPlay();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", function(e) {
      e.stopPropagation();
      goToSlide(currentIndex + 1, true);
      restartAutoPlay();
    });
  }

  // Keyboard navigation
  window.addEventListener("keydown", function(e) {
    var stageRect = stage.getBoundingClientRect();
    if (stageRect.bottom > 100 && stageRect.top < window.innerHeight) {
      if (e.key === "ArrowLeft") {
        goToSlide(currentIndex - 1, true);
        restartAutoPlay();
      } else if (e.key === "ArrowRight") {
        goToSlide(currentIndex + 1, true);
        restartAutoPlay();
      }
    }
  });

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayTimer = setInterval(function() {
      goToSlide((currentIndex + 1) % totalSlides);
    }, 7000);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
  }

  function restartAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  goToSlide(0, false);
  startAutoPlay();

  stage.addEventListener("mouseenter", stopAutoPlay);
  stage.addEventListener("mouseleave", startAutoPlay);
  stage.addEventListener("touchstart", stopAutoPlay, { passive: true });
  stage.addEventListener("touchend", startAutoPlay, { passive: true });

  // Global helper to switch to a dept from hero links
  window.pvSwitchDept = function(deptId) {
    if (typeof window.pvCatalogSwitchTab === "function") {
      window.pvCatalogSwitchTab(deptId);
    }
  };
})();

/* 2. DATASETS & INTERACTIVE CATALOG ENGINE */
var DEPARTMENTS_DATA = [
  {
    "id": "formulPprcPipePanel",
    "short": "PPRC Kompozit & Düz",
    "full": "PPRC Cam Elyaf Kompozit, Düz & Folyolu Borular",
    "sub": "Cam Elyaf Takviyeli (PN20/PN25), Düz Tesisat Borusu, Folyolu Borular",
    "pillsId": "formulPprcPipePills",
    "badge": "PPRC Boru Grubu",
    "summaryTitle": "Formül Tip-3 PPRC Cam Elyaf Kompozit & Yüksek Basınç Tesisat Boruları",
    "summaryDesc": "DIN 8077/8078 ve TS EN ISO 15874 standartlarında üretilen, orta katmanındaki cam elyaf takviyesi ile termal uzamayı %75 azaltan, sarkma yapmayan PN20 ve PN25 kompozit ve düz tesisat boruları.",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5\"/></svg>",
    "pills": [
      [
        "Cam Elyaf Kompozit",
        "cam-elyaf",
        true
      ],
      [
        "Düz PPRC Boru",
        "duz-pprc",
        false
      ],
      [
        "Alüminyum Folyolu",
        "folyolu",
        false
      ]
    ]
  },
  {
    "id": "formulFittingsPanel",
    "short": "Füzyon Ek Parçaları",
    "full": "PPRC Füzyon Kaynaklı Dirsek, Te, Manşon & Redüksiyonlar",
    "sub": "90° & 45° Dirsek, Eşit/İnegal Te, Manşon, Redüksiyon, Kavis, Köprü",
    "pillsId": "formulFittingsPills",
    "badge": "Füzyon Ek Parça Grubu",
    "summaryTitle": "Formül Yüksek Mukavemetli PPRC Füzyon Soket Kaynak Bağlantı Elemanları",
    "summaryDesc": "260°C termofüzyon kaynağıyla monolitik moleküler birleşme sağlayan, daralma ve çap kaybı yaratmayan 90°/45° dirsekler, te parçaları, kavis ve krosing köprü geçişleri.",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94\"/></svg>",
    "pills": [
      [
        "Dirsekler 90°/45°",
        "dirsek",
        true
      ],
      [
        "Te Grubu",
        "te",
        false
      ],
      [
        "Manşon & Redüksiyon",
        "manson-reduksiyon",
        false
      ],
      [
        "Kavis & Köprü",
        "kavis-kopru",
        false
      ]
    ]
  },
  {
    "id": "formulBrassPanel",
    "short": "Pirinç Metal Geçişler",
    "full": "MS 58 Pirinç Ek Parçalı Metal Geçiş Rakorları & Şablonlar",
    "sub": "İç/Dış Dişli Rakor & Dirsek, Oynar Başlı Rakor, 150 mm Batarya Şablonu",
    "pillsId": "formulBrassPills",
    "badge": "Pirinç Geçiş Grubu",
    "summaryTitle": "Avrupa Standartlarında MS 58 Pirinç Enjeksiyonlu PPRC Geçiş Elemanları",
    "summaryDesc": "Pirinç ve PPRC gövdenin yüksek basınç altında kilitlendiği sızdırmaz iç/dış dişli rakorlar, radyatör ve sayaç bağlantı rakorları ile sıva altı 150 mm çiftli batarya şablonları.",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"2\" y=\"2\" width=\"20\" height=\"20\" rx=\"3\"/><path d=\"M7 2v20M17 2v20M2 12h20\"/></svg>",
    "pills": [
      [
        "İç Dişli Rakor & Nipel",
        "ic-dis",
        true
      ],
      [
        "Dış Dişli Rakor & Nipel",
        "dis-dis",
        false
      ],
      [
        "Oynar Başlı Rakor",
        "oynar-basli",
        false
      ],
      [
        "Batarya Bağlantı Şablonu",
        "batarya-sablon",
        false
      ]
    ]
  },
  {
    "id": "formulValvesPanel",
    "short": "PPRC & Ankastre Vanalar",
    "full": "Tam Geçişli Küresel Vanalar, Krom Ankastre & Radyatör Grubu",
    "sub": "PPRC Küresel Vana, Krom Gizli Ankastre Vana, Termostatik Radyatör Vanası",
    "pillsId": "formulValvesPills",
    "badge": "Vana & Akış Kontrol Grubu",
    "summaryTitle": "DIN EN 13828 Standartlarında Formül PPRC ve Krom Ankastre Vana Serisi",
    "summaryDesc": "Kireç tutmayan teflon yataklı pirinç küre mekanizması, estetik volanlı gizli banyo ankastre vanaları, köşe/düz radyatör vanaları ve pislik tutucu filtreler.",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z\"/></svg>",
    "pills": [
      [
        "PPRC Küresel Vana",
        "kuresel-vana",
        true
      ],
      [
        "Gizli Krom Ankastre Vana",
        "ankastre-vana",
        false
      ],
      [
        "Radyatör & Termostatik",
        "radyator-vana",
        false
      ],
      [
        "Çekvalf & Filtre",
        "cekvalf",
        false
      ]
    ]
  },
  {
    "id": "formulPvcDrainPanel",
    "short": "PVC Atık Su & Gider",
    "full": "Contalı PVC Atık Su Boruları, Çatallar, Dirsekler & Sifonlar",
    "sub": "Tip 1 & Tip 2 PVC Boru, Tek/Çift Çatal, 87°/45° Dirsek, Temizleme Parçası",
    "pillsId": "formulPvcDrainPills",
    "badge": "PVC Atık Su Grubu",
    "summaryTitle": "TS EN 1329-1 Standartlarında Dudaklı Contalı PVC Atık Su Boru ve Ek Parçaları",
    "summaryDesc": "Bina içi ve bina dışı atık su drenajı için koku sızdırmayan özel elastomerik contalı, asit ve deterjanlara tam dirençli pürüzsüz iç yüzeyli PVC boru sistemleri.",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z\"/><polyline points=\"14 2 14 8 20 8\"/><line x1=\"16\" y1=\"13\" x2=\"8\" y2=\"13\"/><line x1=\"16\" y1=\"17\" x2=\"8\" y2=\"17\"/></svg>",
    "pills": [
      [
        "Contalı PVC Boru",
        "pvc-boru",
        true
      ],
      [
        "Çatallar & Dirsekler",
        "catal-dirsek",
        false
      ],
      [
        "Temizleme & Sifon Parçası",
        "temizleme-sifon",
        false
      ]
    ]
  },
  {
    "id": "formulUnderfloorPanel",
    "short": "Yerden Isıtma & PE-RT",
    "full": "5 Katmanlı EVOH Oksijen Bariyerli PE-RT Boru & Pirinç Kollektörler",
    "sub": "Oksijen Bariyerli PE-RT, Debili Pirinç Kollektör, EPS Strafor Modülü",
    "pillsId": "formulUnderfloorPills",
    "badge": "Yerden Isıtma Grubu",
    "summaryTitle": "Modern Zemin Isıtma İçin Yüksek Esneklikli PE-RT Boru ve Kollektör Sistemleri",
    "summaryDesc": "DIN 4726 oksijen bariyer standartlarına uygun korozyon ve çamurlaşma önleyici 5 katmanlı EVOH PE-RT borular, hassas debi ayarlı pirinç kollektör grupları ve modüler EPS izolasyon panelleri.",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"22 12 18 12 15 21 9 3 6 12 2 12\"/></svg>",
    "pills": [
      [
        "PE-RT Oksijen Bariyerli",
        "pe-rt-boru",
        true
      ],
      [
        "Pirinç Kollektör & Debi Ayarlı",
        "kollektor",
        false
      ],
      [
        "Kollektör Dolabı & Aksesuar",
        "kollektor-dolabi",
        false
      ],
      [
        "İzolasyon Modülü",
        "izolasyon-strafor",
        false
      ]
    ]
  }
];
var FORMUL_PRODUCTS_DATA = [
  {
    "id": "formul-pprc-cam-elyaf-pn20",
    "name": "Formül Cam Elyaf Takviyeli Kompozit Boru (PN20 / SDR 7.4)",
    "badge": "Cam Elyaf Kompozit Grubu",
    "tag": "Cam Elyaf Kompozit",
    "category": "cam-elyaf",
    "deptId": "formulPprcPipePanel",
    "desc": "Orta katmanındaki özel cam elyaf takviyeli PPRC kompozit yapısı sayesinde standart borulara göre %75 daha az termal genleşme gösterir. Sıcak su ve kalorifer hatlarında sarkma yapmaz, tıraşlama gerektirmeden direkt füzyon kaynağı yapılır.",
    "thumb": "assets/formul-official/formul-pprc-cam-elyaf-pn20.svg",
    "sizes": [
      "Ø20 mm (1/2\")",
      "Ø25 mm (3/4\")",
      "Ø32 mm (1\")",
      "Ø40 mm (1 1/4\")",
      "Ø50 mm (1 1/2\")",
      "Ø63 mm (2\")",
      "Ø75 mm (2 1/2\")",
      "Ø90 mm (3\")",
      "Ø110 mm (4\")"
    ],
    "coverage": "PN20 / SDR 7.4",
    "specs": {
      "standard": "DIN 8077 / 8078 · TS EN ISO 15874-2",
      "packaging": "Boy: 4 Metre (Bağ Paket)",
      "mixingRatio": "Füzyon Sıcaklığı: 260°C ± 5°C (Tıraşsız Direkt Kaynak)",
      "potLife": "20°C / 20 Bar · 70°C / 10 Bar (50 Yıl Ömür)",
      "logistics": "Balçova Showroom & Urla Ana Lojistik Depo Stoktan Aynı Gün Sevk"
    },
    "meta": [
      "Standart: DIN 8077/8078",
      "PN20 / SDR 7.4",
      "Ø20 - Ø110 mm",
      "4 Metre Boy"
    ],
    "accordions": [
      {
        "title": "1. Teknik Özellikler & 3 Katmanlı Termal Zırh",
        "body": "Formül Cam Elyaf Takviyeli Kompozit Boru, Tip-3 (PPRC) polipropilen rastgele kopolimer hammaddesinden üretilir. İç ve dış katman hijyenik PPRC, orta katman ise cam elyaf ile güçlendirilmiş kompozit yapıdadır. Genleşme katsayısı standart borularda 0.15 mm/mK iken, bu boruda 0.035 mm/mK seviyesine indirgenmiştir. Sıcak su hatlarında kelepçe aralıkları genişletilebilir ve şık tesisat görüntüsü korunur."
      },
      {
        "title": "2. Füzyon Kaynak, Tıraşsız Montaj & İşçilik Avantajı",
        "body": "Boru uçlarında folyo soyma / tıraşlama işlemi gerektirmez. 260°C soket füzyon kaynak paftası ile standart PPRC ek parçalarına direkt kaynatılır. Tıraşlama hatalarından kaynaklanan su kaçakları tamamen engellenir, montaj hızı 3 katına çıkar."
      },
      {
        "title": "3. Basınç, Sıcaklık ve 50 Yıl Ömür Dayanımı",
        "body": "DIN 8077/8078 ve DVGW normlarına göre test edilmiştir. 20°C soğuk su koşullarında 20 bar, 70°C merkezi ısıtma koşullarında 10 bar sürekli işletme basıncında 50 yıl kesintisiz ömre sahiptir. Kısa süreli tepe sıcaklığı 95°C'dir. Kireç ve tortu tutmaz, pH 2-12 aralığındaki agresif sulara tam dirençlidir."
      },
      {
        "title": "4. Şantiye Lojistiği & Urla Depo Sevkiyatı",
        "body": "Pervan Yapı Market Urla Lojistik Deposu ve Balçova Showroom stoklarımızda Ø20 mm'den Ø110 mm'ye kadar tam seri bağ ambalajında mevcuttur. Çeşme, Alaçatı, Urla, Güzelbahçe, Narlıdere ve İzmir şantiyelerine kendi vinçli ve kapalı kasa araçlarımızla aynı gün teslim edilir."
      }
    ]
  },
  {
    "id": "formul-pprc-cam-elyaf-pn25",
    "name": "Formül Cam Elyaf Takviyeli Kompozit Boru (PN25 / SDR 6)",
    "badge": "Yüksek Basınç Kompozit Grubu",
    "tag": "Cam Elyaf Kompozit",
    "category": "cam-elyaf",
    "deptId": "formulPprcPipePanel",
    "desc": "Ağır hizmet ve yüksek katlı binaların ana kolon ve kazan dairesi hatları için geliştirilmiş kalın etli (SDR 6) PN25 kompozit boru. Hidrofor darbelerine ve yüksek sıcaklık dalgalanmalarına maksimum direnç gösterir.",
    "thumb": "assets/formul-official/formul-pprc-cam-elyaf-pn25.svg",
    "sizes": [
      "Ø20 mm (1/2\")",
      "Ø25 mm (3/4\")",
      "Ø32 mm (1\")",
      "Ø40 mm (1 1/4\")",
      "Ø50 mm (1 1/2\")",
      "Ø63 mm (2\")",
      "Ø75 mm (2 1/2\")",
      "Ø90 mm (3\")",
      "Ø110 mm (4\")"
    ],
    "coverage": "PN25 / SDR 6",
    "specs": {
      "standard": "DIN 8077 / 8078 · TS EN ISO 15874-2",
      "packaging": "Boy: 4 Metre (Bağ Paket)",
      "mixingRatio": "Füzyon Sıcaklığı: 260°C ± 5°C",
      "potLife": "20°C / 25 Bar · 70°C / 12.5 Bar (50 Yıl Ömür)",
      "logistics": "Balçova Showroom & Urla Ana Lojistik Depo Stoktan Aynı Gün Sevk"
    },
    "meta": [
      "Standart: DIN 8077/8078",
      "PN25 / SDR 6",
      "Ø20 - Ø110 mm",
      "Yüksek Katlı Kolon Hatları"
    ],
    "accordions": [
      {
        "title": "1. Yüksek Basınç Mukavemeti & Et Kalınlığı",
        "body": "SDR 6 et kalınlığı sınıfında üretilen Formül PN25 Cam Elyaf Kompozit boru, 25 bar nominal işletme basıncına dayanıklıdır. Hidroforlu siteler, oteller, ticari binalar ve kazan dairelerinin ana besleme hatları için en güvenilir çözümdür."
      },
      {
        "title": "2. Füzyon Kaynak & Kolon Hattı Montajı",
        "body": "260°C füzyon kaynağı ile monolitik gövde oluşturur. Termal genleşme katsayısı 0.035 mm/mK olup kolon şaftlarında kelepçelerin gevşemesini ve borunun esnemesini engeller."
      },
      {
        "title": "3. Standartlar & Test Raporları",
        "body": "SKZ (Almanya) ve TSE onaylıdır. Ağır korozyon ortamlarında paslanmaz, metalik iyon salınımı yapmaz, içme suyu uygunluk belgesine sahiptir."
      },
      {
        "title": "4. Şantiye Dağıtım & Proje Fiyatlandırması",
        "body": "Toplu konut, otel ve villa projeleri için özel metrajlı bağ sevkiyatı sağlanır. Pervan teknik ekibi tarafından şantiye metraj kontrolü ve pafta desteği verilir."
      }
    ]
  },
  {
    "id": "formul-pprc-standart-duz-pn20",
    "name": "Formül Standart Düz PPRC Tesisat Borusu (PN20 / SDR 6)",
    "badge": "PPRC Tesisat Grubu",
    "tag": "Düz PPRC Boru",
    "category": "duz-pprc",
    "deptId": "formulPprcPipePanel",
    "desc": "Klasik sıcak ve soğuk sıhhi tesisat hatları için saf Tip-3 PPRC hammaddeden üretilmiş, yüksek et kalınlığına sahip PN20 tesisat borusu. Sıva altı banyo ve mutfak dağıtımlarında 50 yıl korozyonsuz kullanım sağlar.",
    "thumb": "assets/formul-official/formul-pprc-standart-duz-pn20.svg",
    "sizes": [
      "Ø20 mm (1/2\")",
      "Ø25 mm (3/4\")",
      "Ø32 mm (1\")",
      "Ø40 mm (1 1/4\")",
      "Ø50 mm (1 1/2\")",
      "Ø63 mm (2\")",
      "Ø75 mm",
      "Ø90 mm",
      "Ø110 mm"
    ],
    "coverage": "PN20 / SDR 6",
    "specs": {
      "standard": "DIN 8077 / 8078 · TS EN ISO 15874-2",
      "packaging": "Boy: 4 Metre (Bağ Paket)",
      "mixingRatio": "Füzyon Sıcaklığı: 260°C ± 5°C",
      "potLife": "20°C / 20 Bar (50 Yıl Ömür)",
      "logistics": "Balçova Showroom & Urla Ana Lojistik Depo Stoktan Aynı Gün Sevk"
    },
    "meta": [
      "Standart: DIN 8077/8078",
      "PN20 / SDR 6",
      "Ø20 - Ø110 mm",
      "Sıva Altı & Sıva Üstü"
    ],
    "accordions": [
      {
        "title": "1. Malzeme Kalitesi & İçme Suyu Hijyeni",
        "body": "Pervan güvencesiyle sunulan Formül PN20 Düz Borular, hiçbir geri dönüştürülmüş plastik içermeyen %100 orijinal Hyosung ve Borealis hammadde ile ekstrüde edilir. Suya koku, renk ve tat bırakmaz."
      },
      {
        "title": "2. Montaj & Kaynak Prosedürü",
        "body": "PPRC boru makası ile 90° dik açıyla kesilir. Pafta ısısı 260°C'ye ulaştığında ısıtılıp eksenel olarak birleştirilir. Soğuma süresi tamamlandıktan sonra monolitik basınca dayanır."
      },
      {
        "title": "3. Dayanım & Ömür",
        "body": "20°C'de 20 bar işletme basıncına ve 50 yıl nominal servis ömrüne sahiptir. Esnek polimer yapısı su koçu darbelerini sönümler."
      },
      {
        "title": "4. Sevkiyat & Stok Bilgisi",
        "body": "Urla Depo ve Balçova Yapı Market şubelerimizde tüm çaplar açık/kapalı bağlar halinde hazır tutulmaktadır."
      }
    ]
  },
  {
    "id": "formul-pprc-standart-duz-pn16",
    "name": "Formül Soğuk Su PPRC Tesisat Borusu (PN16 / SDR 7.4)",
    "badge": "Soğuk Su Grubu",
    "tag": "Düz PPRC Boru",
    "category": "duz-pprc",
    "deptId": "formulPprcPipePanel",
    "desc": "Bina içi soğuk su dağıtım hatları, bahçe sulama ve kuyu suyu tesisatları için optimize edilmiş, hafif ve ekonomik PN16 PPRC boru.",
    "thumb": "assets/formul-official/formul-pprc-standart-duz-pn16.svg",
    "sizes": [
      "Ø20 mm (1/2\")",
      "Ø25 mm (3/4\")",
      "Ø32 mm (1\")",
      "Ø40 mm (1 1/4\")",
      "Ø50 mm (1 1/2\")",
      "Ø63 mm (2\")"
    ],
    "coverage": "PN16 / SDR 7.4",
    "specs": {
      "standard": "DIN 8077 / 8078 · TS EN ISO 15874-2",
      "packaging": "Boy: 4 Metre (Bağ Paket)",
      "mixingRatio": "Füzyon Sıcaklığı: 260°C ± 5°C",
      "potLife": "20°C / 16 Bar (50 Yıl Ömür)",
      "logistics": "Balçova Showroom & Urla Ana Lojistik Depo Stok"
    },
    "meta": [
      "Standart: DIN 8077/8078",
      "PN16 / SDR 7.4",
      "Ø20 - Ø63 mm",
      "Soğuk Su Hatları"
    ],
    "accordions": [
      {
        "title": "1. Soğuk Su Hatlarına Özel Ekonomik Çözüm",
        "body": "PN16 sınıfı, 20°C'de 16 bar basınca kadar soğuk su dağıtım hatlarında yüksek hidrolik debi ve ekonomik maliyet sunar."
      },
      {
        "title": "2. Montaj Kolaylığı",
        "body": "Geniş iç çapı sayesinde sürtünme kayıplarını minimuma indirir, yüksek su debisi sağlar."
      },
      {
        "title": "3. Korozyon ve Paslanmazlık",
        "body": "Kireçli ve sert şebeke sularında iç cidarında tortu birikmez, daralma yapmaz."
      },
      {
        "title": "4. Sevkiyat Koşulları",
        "body": "Balçova ve Urla depomuzdan aynı gün şantiye teslimatı."
      }
    ]
  },
  {
    "id": "formul-pprc-folyolu-deliksiz-pn25",
    "name": "Formül Alüminyum Folyolu Düz Tesisat Borusu (PN25)",
    "badge": "Alüminyum Folyolu Grubu",
    "tag": "Alüminyum Folyolu",
    "category": "folyolu",
    "deptId": "formulPprcPipePanel",
    "desc": "Isıtma sistemlerinde oksijen difüzyonunu sıfıra indiren ve radyatör peteklerinin korozyonunu önleyen, alüminyum folyo kaplamalı yüksek sıcaklık PN25 borusu.",
    "thumb": "assets/formul-official/formul-pprc-folyolu-deliksiz-pn25.svg",
    "sizes": [
      "Ø20 mm",
      "Ø25 mm",
      "Ø32 mm",
      "Ø40 mm",
      "Ø50 mm",
      "Ø63 mm"
    ],
    "coverage": "PN25 / Oksijen Bariyeri",
    "specs": {
      "standard": "DIN 8077 / 8078 · DIN 4726",
      "packaging": "Boy: 4 Metre (Bağ Paket)",
      "mixingRatio": "Füzyon Öncesi Folyo Tıraşlama Aparatı Gerekir (260°C)",
      "potLife": "90°C Isıtma / 10 Bar (50 Yıl Ömür)",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "meta": [
      "Standart: DIN 8077/8078",
      "DIN 4726 O2 Bariyeri",
      "PN25",
      "Isıtma Hatları"
    ],
    "accordions": [
      {
        "title": "1. Oksijen Geçirimsizliği & Radyatör Koruması",
        "body": "DIN 4726 standardına uygun alüminyum folyo tabakası, havadaki oksijenin boru çeperinden suya geçmesini %100 engeller. Bu sayede kombi eşanjörü ve çelik panel radyatörler paslanmaz."
      },
      {
        "title": "2. Folyo Tıraşlama ve Kaynak",
        "body": "Kaynak işlemi öncesinde Formül özel kalibre tıraşlama aparatı ile boru ucundaki folyo tabakası soyulur ve 260°C'de füzyon kaynağı yapılır."
      },
      {
        "title": "3. Termal Genleşme Kontrolü",
        "body": "Alüminyum tabaka borunun sıcaklık etkisiyle boyuna uzamasını kontrol altında tutar."
      },
      {
        "title": "4. Lojistik ve Tedarik",
        "body": "Tüm çaplarda Urla depomuzdan derhal sevk edilir."
      }
    ]
  },
  {
    "id": "formul-pprc-folyolu-delikli-pn25",
    "name": "Formül Alüminyum Folyolu Delikli (Perfore) Boru (PN25)",
    "badge": "Perfore Folyolu Grubu",
    "tag": "Alüminyum Folyolu",
    "category": "folyolu",
    "deptId": "formulPprcPipePanel",
    "desc": "Mikro delikli (perfore) alüminyum folyo katmanı sayesinde katmanlar arasında gaz sıkışması ve kabarmayı önleyen, yüksek mukavemetli kalorifer ve sıcak su borusu.",
    "thumb": "assets/formul-official/formul-pprc-folyolu-delikli-pn25.svg",
    "sizes": [
      "Ø20 mm",
      "Ø25 mm",
      "Ø32 mm",
      "Ø40 mm",
      "Ø50 mm",
      "Ø63 mm"
    ],
    "coverage": "PN25 / Perfore Folyo",
    "specs": {
      "standard": "DIN 8077 / 8078 · TS EN ISO 15874",
      "packaging": "Boy: 4 Metre",
      "mixingRatio": "Folyo Tıraşlamalı Füzyon Kaynağı (260°C)",
      "potLife": "20°C / 25 Bar · 70°C / 10 Bar",
      "logistics": "Urla Ana Lojistik Depo Stok"
    },
    "meta": [
      "Standart: DIN 8077/8078",
      "Perfore Folyo",
      "PN25",
      "Kabarma Önleyici Zırh"
    ],
    "accordions": [
      {
        "title": "1. Perfore Folyo Avantajı",
        "body": "Mikro delikli alüminyum yapısı, polimer katmanlar arasındaki yapışma mukavemetini maksimum seviyeye çıkarır ve aşırı ısı değişimlerinde kabarcık oluşumunu engeller."
      },
      {
        "title": "2. Isıtma ve Kazan Bağlantıları",
        "body": "Kombi, boyler ve güneş enerjisi çıkışlarında yüksek güvenilirlikle kullanılır."
      },
      {
        "title": "3. Standart Uygunluk",
        "body": "TSE ve ISO 9001 kalite belgeleriyle sertifikalandırılmıştır."
      },
      {
        "title": "4. Sevkiyat",
        "body": "Urla ve Balçova depolarımızdan toptan koli/bağ teslimatı."
      }
    ]
  },
  {
    "id": "formul-pprc-dirsek-90",
    "name": "Formül PPRC 90° Füzyon Dirsek",
    "badge": "PPRC Dirsek Grubu",
    "tag": "Dirsekler 90°/45°",
    "category": "dirsek",
    "deptId": "formulFittingsPanel",
    "desc": "Tesisat dönüşlerinde sürtünme kaybını en aza indiren hidrolik iç kavise sahip, yüksek et kalınlıklı 90° soket kaynak dirseği.",
    "thumb": "assets/formul-official/formul-pprc-dirsek-90.svg",
    "sizes": [
      "Ø20 mm",
      "Ø25 mm",
      "Ø32 mm",
      "Ø40 mm",
      "Ø50 mm",
      "Ø63 mm",
      "Ø75 mm",
      "Ø90 mm",
      "Ø110 mm"
    ],
    "coverage": "PN25 Mukavemet",
    "specs": {
      "standard": "DIN 16962 · TS EN ISO 15874-3",
      "packaging": "Kutu / Koli Paket",
      "mixingRatio": "Füzyon Sıcaklığı: 260°C",
      "potLife": "25 Bar Basınç Dayanımı",
      "logistics": "Balçova & Urla Depo Stok"
    },
    "meta": [
      "Standart: DIN 16962",
      "PN25",
      "Ø20 - Ø110 mm",
      "Pürüzsüz İç Akış"
    ],
    "accordions": [
      {
        "title": "1. Hidrolik Akış Geometrisi",
        "body": "Formül 90° dirseklerin iç cidar yarıçapı hidrodinamik simülasyonlarla optimize edilmiştir. Akışta girdap ve debi düşüşü yapmaz."
      },
      {
        "title": "2. Füzyon Soket Toleransı",
        "body": "DIN 16962 standardında tam mikron toleranslı soket yuvaları, kaynağın tam derinlikte oturmasını ve iç çapa taşma yapmamasını garanti eder."
      },
      {
        "title": "3. Basınç Dayanımı",
        "body": "Boru hattından daha yüksek et kalınlığı ile PN25 çalışma sınıfında üretilmiştir."
      },
      {
        "title": "4. Şantiye Teslimatı",
        "body": "Koli ve adet bazında stoktan hemen teslim."
      }
    ]
  },
  {
    "id": "formul-pprc-dirsek-45",
    "name": "Formül PPRC 45° Füzyon Dirsek",
    "badge": "PPRC Dirsek Grubu",
    "tag": "Dirsekler 90°/45°",
    "category": "dirsek",
    "deptId": "formulFittingsPanel",
    "desc": "Tesisat şaftlarında ve tavan geçişlerinde yumuşak hat dönüşleri sağlayarak su koçu darbesini engelleyen 45° açılı füzyon dirsek.",
    "thumb": "assets/formul-official/formul-pprc-dirsek-45.svg",
    "sizes": [
      "Ø20 mm",
      "Ø25 mm",
      "Ø32 mm",
      "Ø40 mm",
      "Ø50 mm",
      "Ø63 mm",
      "Ø75 mm"
    ],
    "coverage": "PN25 Mukavemet",
    "specs": {
      "standard": "DIN 16962 · TS EN ISO 15874-3",
      "packaging": "Kutu / Koli Paket",
      "mixingRatio": "Füzyon Sıcaklığı: 260°C",
      "potLife": "25 Bar Basınç Dayanımı",
      "logistics": "Balçova & Urla Depo Stok"
    },
    "meta": [
      "Standart: DIN 16962",
      "PN25",
      "Ø20 - Ø75 mm",
      "Yumuşak Dönüş"
    ],
    "accordions": [
      {
        "title": "1. Düşük Sürtünmeli Hat Tasarımı",
        "body": "45 derecelik açılı dönüşler su hızını korur ve pompa yükünü hafifletir."
      },
      {
        "title": "2. Füzyon Kaynak",
        "body": "260°C'de saniyeler içinde kaynaklanarak monolitik birleşim sağlar."
      },
      {
        "title": "3. Standartlar",
        "body": "TSE ve EN ISO 15874-3 onaylıdır."
      },
      {
        "title": "4. Lojistik",
        "body": "Urla ve Balçova merkezlerimizden anında teslim."
      }
    ]
  },
  {
    "id": "formul-pprc-esit-te",
    "name": "Formül PPRC Eşit Te",
    "badge": "PPRC Te Grubu",
    "tag": "Te Grubu",
    "category": "te",
    "deptId": "formulFittingsPanel",
    "desc": "Ana boru hattından aynı çapta hat ayrımı yapmak için kullanılan, yüksek basınca dayanıklı monolitik üç kollu eşit te parçası.",
    "thumb": "assets/formul-official/formul-pprc-esit-te.svg",
    "sizes": [
      "Ø20 mm",
      "Ø25 mm",
      "Ø32 mm",
      "Ø40 mm",
      "Ø50 mm",
      "Ø63 mm",
      "Ø75 mm",
      "Ø90 mm",
      "Ø110 mm"
    ],
    "coverage": "PN25 Mukavemet",
    "specs": {
      "standard": "DIN 16962 · TS EN ISO 15874-3",
      "packaging": "Kutu / Koli Paket",
      "mixingRatio": "Füzyon Sıcaklığı: 260°C",
      "potLife": "25 Bar Basınç Dayanımı",
      "logistics": "Balçova & Urla Depo Stok"
    },
    "meta": [
      "Standart: DIN 16962",
      "PN25",
      "Ø20 - Ø110 mm",
      "Eşit Çap Ayrımı"
    ],
    "accordions": [
      {
        "title": "1. Mukavemetli Gövde Tasarımı",
        "body": "Üç yönden gelen gerilimleri homojen dağıtan et kalınlığı takviyesi bulunur."
      },
      {
        "title": "2. Füzyon Kolaylığı",
        "body": "Tüm ağızlar hassas kalibreli soket ölçüsündedir."
      },
      {
        "title": "3. Kimyasal Direnç",
        "body": "Asit, baz ve kireçli sulara karşı korozyonsuz yapı."
      },
      {
        "title": "4. Tedarik",
        "body": "Pervan stoklarından aynı gün şantiye teslim."
      }
    ]
  },
  {
    "id": "formul-pprc-inegal-te",
    "name": "Formül PPRC İnegal (Redüksiyonlu) Te",
    "badge": "PPRC Te Grubu",
    "tag": "Te Grubu",
    "category": "te",
    "deptId": "formulFittingsPanel",
    "desc": "Ana kolon hattından daha küçük çaptaki kat veya daire branşmanlarını redüksiyon parçası kullanmadan tek gövdede ayıran inegal te parçası.",
    "thumb": "assets/formul-official/formul-pprc-inegal-te.svg",
    "sizes": [
      "Ø25×20×25 mm",
      "Ø32×20×32 mm",
      "Ø32×25×32 mm",
      "Ø40×25×40 mm",
      "Ø40×32×40 mm",
      "Ø50×32×50 mm",
      "Ø63×32×63 mm"
    ],
    "coverage": "PN25 Mukavemet",
    "specs": {
      "standard": "DIN 16962 · TS EN ISO 15874-3",
      "packaging": "Kutu / Koli Paket",
      "mixingRatio": "Füzyon Sıcaklığı: 260°C",
      "potLife": "25 Bar Basınç Dayanımı",
      "logistics": "Balçova & Urla Depo Stok"
    },
    "meta": [
      "Standart: DIN 16962",
      "PN25",
      "Tek Parça Branşman",
      "İşçilik Tasarrufu"
    ],
    "accordions": [
      {
        "title": "1. Ek Parça ve İşçilik Tasarrufu",
        "body": "Ayrı bir redüksiyon manşonu ve ek kaynak ihtiyacını ortadan kaldırarak montaj süresini yarı yarıya azaltır."
      },
      {
        "title": "2. Branşman Akış Dinamiği",
        "body": "Daralan çıkış ağzında hidrolik türbülansı engelleyen konik geçiş geometrisi mevcuttur."
      },
      {
        "title": "3. Kalite Belgesi",
        "body": "TSE ve uluslararası DVGW standartlarına tam uyumludur."
      },
      {
        "title": "4. Sevkiyat",
        "body": "Urla ve Balçova depolarında tüm kombine ölçüler stoktadır."
      }
    ]
  },
  {
    "id": "formul-pprc-manson",
    "name": "Formül PPRC Düz Manşon",
    "badge": "PPRC Manşon Grubu",
    "tag": "Manşon & Redüksiyon",
    "category": "manson-reduksiyon",
    "deptId": "formulFittingsPanel",
    "desc": "İki PPRC boruyu düz hat doğrultusunda eksenel olarak birleştiren, iç dayama faturalı füzyon manşonu.",
    "thumb": "assets/formul-official/formul-pprc-manson.svg",
    "sizes": [
      "Ø20 mm",
      "Ø25 mm",
      "Ø32 mm",
      "Ø40 mm",
      "Ø50 mm",
      "Ø63 mm",
      "Ø75 mm",
      "Ø90 mm",
      "Ø110 mm"
    ],
    "coverage": "PN25 Mukavemet",
    "specs": {
      "standard": "DIN 16962 · TS EN ISO 15874-3",
      "packaging": "Kutu / Koli Paket",
      "mixingRatio": "Füzyon Sıcaklığı: 260°C",
      "potLife": "25 Bar Basınç Dayanımı",
      "logistics": "Balçova & Urla Depo Stok"
    },
    "meta": [
      "Standart: DIN 16962",
      "PN25",
      "Ø20 - Ø110 mm",
      "İç Faturalı"
    ],
    "accordions": [
      {
        "title": "1. İç Dayama Faturası",
        "body": "Boru uçlarının fazla itilmesini ve iç çapın daralmasını engelleyen hassas iç stoper fatura çizgisine sahiptir."
      },
      {
        "title": "2. Homojen Kaynak Birleşimi",
        "body": "Boru ile aynı polimer yoğunluğunda hammadde kullanıldığı için kaynak bölgesinde gerilme yığılması olmaz."
      },
      {
        "title": "3. Standartlar",
        "body": "TS EN ISO 15874-3 ve DIN 16962."
      },
      {
        "title": "4. Şantiye Dağıtımı",
        "body": "Urla ve Balçova depolarından toptan paket sevkiyatı."
      }
    ]
  },
  {
    "id": "formul-pprc-reduksiyon",
    "name": "Formül PPRC Redüksiyon",
    "badge": "PPRC Redüksiyon Grubu",
    "tag": "Manşon & Redüksiyon",
    "category": "manson-reduksiyon",
    "deptId": "formulFittingsPanel",
    "desc": "Farklı çaptaki iki PPRC borunun birbirine geçişini sağlayan iç/dış konik füzyon redüksiyon parçası.",
    "thumb": "assets/formul-official/formul-pprc-reduksiyon.svg",
    "sizes": [
      "Ø25/20 mm",
      "Ø32/20 mm",
      "Ø32/25 mm",
      "Ø40/25 mm",
      "Ø40/32 mm",
      "Ø50/32 mm",
      "Ø50/40 mm",
      "Ø63/50 mm",
      "Ø75/63 mm",
      "Ø110/90 mm"
    ],
    "coverage": "PN25 Mukavemet",
    "specs": {
      "standard": "DIN 16962 · TS EN ISO 15874-3",
      "packaging": "Kutu / Koli Paket",
      "mixingRatio": "Füzyon Sıcaklığı: 260°C",
      "potLife": "25 Bar Basınç Dayanımı",
      "logistics": "Balçova & Urla Depo Stok"
    },
    "meta": [
      "Standart: DIN 16962",
      "PN25",
      "Geniş Çap Aralığı",
      "Konik Geçiş"
    ],
    "accordions": [
      {
        "title": "1. Akıcı Çap Dönüşümü",
        "body": "İç yapısındaki yumuşak konik açı su akışında basınç kaybını ve türbülansı en aza indirir."
      },
      {
        "title": "2. Çoklu Çap Seçenekleri",
        "body": "Ø25/20 mm'den Ø110/90 mm'ye kadar tüm endüstriyel ve konut ölçüleri mevcuttur."
      },
      {
        "title": "3. Mukavemet",
        "body": "PN25 yüksek basınç standartlarında kalın cidarlıdır."
      },
      {
        "title": "4. Sevkiyat",
        "body": "Pervan lojistik depolarından anında temin."
      }
    ]
  },
  {
    "id": "formul-pprc-kavis",
    "name": "Formül PPRC Kavisli Boru / Geçme Parçası",
    "badge": "PPRC Kavis Grubu",
    "tag": "Kavis & Köprü",
    "category": "kavis-kopru",
    "deptId": "formulFittingsPanel",
    "desc": "Tesisat montajında kolon ve kiriş çıkıntılarını aşmak için kullanılan hazır kavisli PPRC boru parçası.",
    "thumb": "assets/formul-official/formul-pprc-kavis.svg",
    "sizes": [
      "Ø20 mm",
      "Ø25 mm",
      "Ø32 mm"
    ],
    "coverage": "PN25 Mukavemet",
    "specs": {
      "standard": "TS EN ISO 15874 · DIN 8077/8078",
      "packaging": "Adet / Koli Paket",
      "mixingRatio": "Füzyon Sıcaklığı: 260°C",
      "potLife": "20 Bar Basınç Dayanımı",
      "logistics": "Balçova & Urla Depo Stok"
    },
    "meta": [
      "Standart: TS EN ISO 15874",
      "PN25",
      "Ø20 - Ø32 mm",
      "Kiriş Aşma Kavisli"
    ],
    "accordions": [
      {
        "title": "1. Şantiyede Isıtarak Bükme Hatasına Son",
        "body": "Şantiyede borunun pürmüzle ısıtılıp bükülmesi boru cidarını zayıflatır ve çatlatır. Formül fabrikasyon kalıplı kavis parçası orijinal mukavemetini korur."
      },
      {
        "title": "2. Estetik Montaj",
        "body": "Duvar köşeleri ve kolon dönüşlerinde sıva altı derinliğini koruyarak pürüzsüz hat çeker."
      },
      {
        "title": "3. Standartlar",
        "body": "Orijinal hammadde ve hijyen sertifikalıdır."
      },
      {
        "title": "4. Teslimat",
        "body": "Balçova ve Urla stoklarımızdan temin edilebilir."
      }
    ]
  },
  {
    "id": "formul-pprc-kopru",
    "name": "Formül PPRC Köprü Geçiş Parçası (Manşonlu / Düz)",
    "badge": "PPRC Köprü Grubu",
    "tag": "Kavis & Köprü",
    "category": "kavis-kopru",
    "deptId": "formulFittingsPanel",
    "desc": "Sıcak ve soğuk su borularının aynı düzlemde birbiri üzerinden çakışmadan geçmesini sağlayan entegre kavisli köprü geçiş elemanı.",
    "thumb": "assets/formul-official/formul-pprc-kopru.svg",
    "sizes": [
      "Ø20 mm",
      "Ø25 mm",
      "Ø32 mm"
    ],
    "coverage": "PN25 Mukavemet",
    "specs": {
      "standard": "TS EN ISO 15874 · DIN 16962",
      "packaging": "Kutu Paket",
      "mixingRatio": "Füzyon Sıcaklığı: 260°C",
      "potLife": "25 Bar Basınç Dayanımı",
      "logistics": "Balçova & Urla Depo Stok"
    },
    "meta": [
      "Standart: DIN 16962",
      "PN25",
      "Ø20 - Ø32 mm",
      "Çapraz Hat Geçişi"
    ],
    "accordions": [
      {
        "title": "1. Çapraz Hat Geçişi",
        "body": "Tesisat güzergahında iki borunun birbirini kesmesi gereken durumlarda alttaki boruya temas etmeden üzerinden aşar."
      },
      {
        "title": "2. Kendinden Manşonlu Seçenek",
        "body": "Uçlarında entegre füzyon manşon yuvaları bulunduğu için ekstra manşon kaynağı gerektirmez."
      },
      {
        "title": "3. Basınç Dayanımı",
        "body": "Kavis bölgesinde et kalınlığı güçlendirilmiştir."
      },
      {
        "title": "4. Şantiye Dağıtımı",
        "body": "Urla ve Balçova şubelerimizden aynı gün sevk edilir."
      }
    ]
  },
  {
    "id": "formul-pprc-kapama-basligi",
    "name": "Formül PPRC Füzyon Kapama Başlığı (Kör Tapa)",
    "badge": "PPRC Tapa Grubu",
    "tag": "Manşon & Redüksiyon",
    "category": "manson-reduksiyon",
    "deptId": "formulFittingsPanel",
    "desc": "Tesisat hatlarının sonlandırılması veya test aşamasında hatların kapatılması için kullanılan monolitik füzyon kaynak kör tapası.",
    "thumb": "assets/formul-official/formul-pprc-kapama-basligi.svg",
    "sizes": [
      "Ø20 mm",
      "Ø25 mm",
      "Ø32 mm",
      "Ø40 mm",
      "Ø50 mm",
      "Ø63 mm",
      "Ø75 mm",
      "Ø110 mm"
    ],
    "coverage": "PN25 Mukavemet",
    "specs": {
      "standard": "DIN 16962 · TS EN ISO 15874-3",
      "packaging": "Kutu / Koli Paket",
      "mixingRatio": "Füzyon Sıcaklığı: 260°C",
      "potLife": "25 Bar Basınç Dayanımı",
      "logistics": "Balçova & Urla Depo Stok"
    },
    "meta": [
      "Standart: DIN 16962",
      "PN25",
      "Ø20 - Ø110 mm",
      "Monolitik Sonlandırma"
    ],
    "accordions": [
      {
        "title": "1. Güvenli Hat Kapatma",
        "body": "Kör tapa füzyon kaynağı ile boru ucunu kalıcı olarak kapatır, hiçbir sızıntı riski bırakmaz."
      },
      {
        "title": "2. Test Basıncı Dayanımı",
        "body": "Tesisat hidrostatik basınç testlerinde (15-20 Bar) yüksek güvenlik sağlar."
      },
      {
        "title": "3. Standartlar",
        "body": "Tüm DIN standartlarına tam uyumludur."
      },
      {
        "title": "4. Sevkiyat",
        "body": "Urla ve Balçova merkezlerimizden anında temin."
      }
    ]
  },
  {
    "id": "formul-pprc-flans-adaptoru",
    "name": "Formül PPRC Flanş Adaptörü (Yaka)",
    "badge": "PPRC Flanş Grubu",
    "tag": "Manşon & Redüksiyon",
    "category": "manson-reduksiyon",
    "deptId": "formulFittingsPanel",
    "desc": "Büyük çaplı PPRC boruların döküm veya çelik flanşlı vanalara, sayaçlara ve hidrofor kolektörlerine bağlanmasını sağlayan faturalı flanş adaptörü.",
    "thumb": "assets/formul-official/formul-pprc-flans-adaptoru.svg",
    "sizes": [
      "Ø40 mm (DN32)",
      "Ø50 mm (DN40)",
      "Ø63 mm (DN50)",
      "Ø75 mm (DN65)",
      "Ø90 mm (DN80)",
      "Ø110 mm (DN100)"
    ],
    "coverage": "PN25 Mukavemet",
    "specs": {
      "standard": "DIN 16962 · TS EN ISO 15874-3",
      "packaging": "Adet / Kutu Paket",
      "mixingRatio": "Füzyon Sıcaklığı: 260°C",
      "potLife": "25 Bar Basınç Dayanımı",
      "logistics": "Urla Ana Lojistik Depo Stok"
    },
    "meta": [
      "Standart: DIN 16962",
      "DN32 - DN100",
      "Flanşlı Vana Geçişi",
      "Kazan Dairesi & Hidrofor"
    ],
    "accordions": [
      {
        "title": "1. Ağır Hizmet Flanş Bağlantısı",
        "body": "Çelik flanş halkası ile birlikte kelebek vana, çekvalf veya sayaç bağlantılarında mükemmel sızdırmazlık sağlar."
      },
      {
        "title": "2. Conta Faturalı Yüzey",
        "body": "EPDM conta yatağı ile tam sızdırmaz yüzey teması kurar."
      },
      {
        "title": "3. Kalite Belgesi",
        "body": "Endüstriyel tesisler ve yüksek basınçlı mekanik hatlar için sertifikalıdır."
      },
      {
        "title": "4. Tedarik",
        "body": "Urla Depo stoğumuzdan aynı gün sevk edilir."
      }
    ]
  },
  {
    "id": "formul-metal-ic-disli-rakor",
    "name": "Formül PPRC İç Dişli Rakor (Pirinç)",
    "badge": "Pirinç Metal Geçiş Grubu",
    "tag": "İç Dişli Rakor & Nipel",
    "category": "ic-dis",
    "deptId": "formulBrassPanel",
    "desc": "PPRC boruyu dişli çelik borulara, vanalara veya metal armatürlere bağlayan, yüksek tork dirençli MS 58 pirinç gövdeli iç dişli geçiş rakoru.",
    "thumb": "assets/formul-official/formul-metal-ic-disli-rakor.svg",
    "sizes": [
      "Ø20×1/2\" İç Diş",
      "Ø20×3/4\" İç Diş",
      "Ø25×1/2\" İç Diş",
      "Ø25×3/4\" İç Diş",
      "Ø32×1\" İç Diş",
      "Ø40×1 1/4\" İç Diş",
      "Ø50×1 1/2\" İç Diş",
      "Ø63×2\" İç Diş"
    ],
    "coverage": "MS 58 Pirinç / PN25",
    "specs": {
      "standard": "TS EN ISO 15874-3 · DIN 2999 (Diş)",
      "packaging": "Kutu / Koli Paket",
      "mixingRatio": "Füzyon: 260°C · Diş: Teflon / Keten Uygulamalı",
      "potLife": "25 Bar Basınç Dayanımı",
      "logistics": "Balçova & Urla Depo Stok"
    },
    "meta": [
      "MS 58 Avrupa Pirinç",
      "Ø20×1/2\" - Ø63×2\"",
      "Kanal Kilitli Enjeksiyon",
      "Sıfır Dönme Riski"
    ],
    "accordions": [
      {
        "title": "1. Çift Kanallı Pirinç Kilit Sistemi",
        "body": "Pirinç parça PPRC gövdeye yüksek tonajlı enjeksiyonla gömülürken dışındaki özel tırtıl kanalları sayesinde anahtar torku altında dönme veya sıyrılma yapmaz."
      },
      {
        "title": "2. MS 58 Pirinç Saflığı & Korozyonsuzluk",
        "body": "Çinko aşınmasına (Dezincification) dirençli CW617N / MS 58 pirinç hammadde kullanılmıştır. Çatlama ve metal yorulması yapmaz."
      },
      {
        "title": "3. Diş Standardı",
        "body": "ISO 7-1 / DIN 2999 konik ve paralel diş standartlarında hassas CNC işlenmiştir."
      },
      {
        "title": "4. Sevkiyat",
        "body": "Balçova ve Urla şubelerimizden anında teslim."
      }
    ]
  },
  {
    "id": "formul-metal-dis-disli-rakor",
    "name": "Formül PPRC Dış Dişli Rakor (Pirinç)",
    "badge": "Pirinç Metal Geçiş Grubu",
    "tag": "Dış Dişli Rakor & Nipel",
    "category": "dis-dis",
    "deptId": "formulBrassPanel",
    "desc": "Metal armatürler, sayaçlar ve pirinç vanaların doğrudan bağlantısı için kullanılan, altıgen anahtar ağızlı dış dişli pirinç geçiş rakoru.",
    "thumb": "assets/formul-official/formul-metal-dis-disli-rakor.svg",
    "sizes": [
      "Ø20×1/2\" Dış Diş",
      "Ø20×3/4\" Dış Diş",
      "Ø25×1/2\" Dış Diş",
      "Ø25×3/4\" Dış Diş",
      "Ø32×1\" Dış Diş",
      "Ø40×1 1/4\" Dış Diş",
      "Ø50×1 1/2\" Dış Diş",
      "Ø63×2\" Dış Diş"
    ],
    "coverage": "MS 58 Pirinç / PN25",
    "specs": {
      "standard": "TS EN ISO 15874-3 · DIN 2999 (Diş)",
      "packaging": "Kutu / Koli Paket",
      "mixingRatio": "Füzyon: 260°C · Diş: Teflon / Keten",
      "potLife": "25 Bar Basınç Dayanımı",
      "logistics": "Balçova & Urla Depo Stok"
    },
    "meta": [
      "MS 58 Pirinç",
      "Ø20×1/2\" - Ø63×2\"",
      "Altıgen Anahtar Ağızlı",
      "PN25"
    ],
    "accordions": [
      {
        "title": "1. Altıgen Anahtar Kavrama Yüzeyi",
        "body": "Montaj sırasında boru anahtarı veya açık ağızlı anahtarın tam oturması için pirinç gövde üzerinde altıgen tutuş alanı tasarlanmıştır."
      },
      {
        "title": "2. Diş Kalitesi",
        "body": "CNC tezgahlarda hassas diş adımı ile çekilmiştir, teflon bant veya keten sarımında diş atlamaz."
      },
      {
        "title": "3. Standartlar",
        "body": "İçme suyu hijyen onayına ve TSE belgesine sahiptir."
      },
      {
        "title": "4. Tedarik",
        "body": "Urla Depo ve Balçova Showroom stoktan aynı gün sevk edilir."
      }
    ]
  },
  {
    "id": "formul-metal-ic-disli-dirsek",
    "name": "Formül PPRC İç Dişli Dirsek (Pirinç)",
    "badge": "Pirinç Metal Dirsek Grubu",
    "tag": "İç Dişli Rakor & Nipel",
    "category": "ic-dis",
    "deptId": "formulBrassPanel",
    "desc": "Musluk, lavabo bataryası ve duş ara musluklarının sıva altı köşe bağlantısında kullanılan 90° iç dişli pirinç dirsek.",
    "thumb": "assets/formul-official/formul-metal-ic-disli-dirsek.svg",
    "sizes": [
      "Ø20×1/2\" İç Diş",
      "Ø25×1/2\" İç Diş",
      "Ø25×3/4\" İç Diş",
      "Ø32×1\" İç Diş"
    ],
    "coverage": "MS 58 Pirinç / PN25",
    "specs": {
      "standard": "TS EN ISO 15874-3",
      "packaging": "Kutu / Koli Paket",
      "mixingRatio": "Füzyon: 260°C",
      "potLife": "25 Bar Basınç Dayanımı",
      "logistics": "Balçova & Urla Depo Stok"
    },
    "meta": [
      "MS 58 Pirinç",
      "Ø20×1/2\" & Ø25×1/2\"",
      "Sıva Altı Batarya Ucu",
      "PN25"
    ],
    "accordions": [
      {
        "title": "1. Sıva Altı Batarya Çıkışları İçin Standart",
        "body": "Musluk ve batarya montajında duvar içi rijit duruş sağlar, torklama sırasında çatlama yapmaz."
      },
      {
        "title": "2. Kalın Pirinç Et Payı",
        "body": "Pirinç kovan et kalınlığı yüksek tutularak uzatma nipellerinin aşırı sıkılmasında gövdenin yarılması önlenmiştir."
      },
      {
        "title": "3. Hijyen",
        "body": "Kurşun salınımı sınır değerlerin altındadır (RoHS ve REACH uyumlu)."
      },
      {
        "title": "4. Sevkiyat",
        "body": "Stoktan anında teslim."
      }
    ]
  },
  {
    "id": "formul-metal-dis-disli-dirsek",
    "name": "Formül PPRC Dış Dişli Dirsek (Pirinç)",
    "badge": "Pirinç Metal Dirsek Grubu",
    "tag": "Dış Dişli Rakor & Nipel",
    "category": "dis-dis",
    "deptId": "formulBrassPanel",
    "desc": "Kombi altı bağlantıları, radyatör girişleri ve vanaların 90° açılı dış dişli montajı için üretilmiş pirinç dirsek.",
    "thumb": "assets/formul-official/formul-metal-dis-disli-dirsek.svg",
    "sizes": [
      "Ø20×1/2\" Dış Diş",
      "Ø25×3/4\" Dış Diş",
      "Ø32×1\" Dış Diş"
    ],
    "coverage": "MS 58 Pirinç / PN25",
    "specs": {
      "standard": "TS EN ISO 15874-3",
      "packaging": "Kutu / Koli Paket",
      "mixingRatio": "Füzyon: 260°C",
      "potLife": "25 Bar Basınç Dayanımı",
      "logistics": "Balçova & Urla Depo Stok"
    },
    "meta": [
      "MS 58 Pirinç",
      "Ø20×1/2\" - Ø32×1\"",
      "Radyatör & Kombi Girişi",
      "PN25"
    ],
    "accordions": [
      {
        "title": "1. Kompakt Radyatör ve Kombi Köşe Geçişi",
        "body": "Dar alanlarda ekstra nipel kullanmadan doğrudan vana bağlantısı yapılmasını sağlar."
      },
      {
        "title": "2. Yüksek Basınç ve Sıcaklık",
        "body": "Kombi sıcak su ve kalorifer gidiş-dönüş hatlarında 95°C tepe sıcaklığına dayanır."
      },
      {
        "title": "3. Standartlar",
        "body": "DIN 2999 ve TSE uyumlu."
      },
      {
        "title": "4. Dağıtım",
        "body": "Pervan şubelerinden stok teslim."
      }
    ]
  },
  {
    "id": "formul-metal-ic-disli-te",
    "name": "Formül PPRC İç Dişli Te (Pirinç)",
    "badge": "Pirinç Metal Te Grubu",
    "tag": "İç Dişli Rakor & Nipel",
    "category": "ic-dis",
    "deptId": "formulBrassPanel",
    "desc": "PPRC hat üzerinden basınç göstergesi (manometre), sensör, tahliye musluğu veya ara bağlantı almak için kullanılan pirinç dişli te parçası.",
    "thumb": "assets/formul-official/formul-metal-ic-disli-te.svg",
    "sizes": [
      "Ø20×1/2\"×20 mm",
      "Ø25×1/2\"×25 mm",
      "Ø25×3/4\"×25 mm",
      "Ø32×1\"×32 mm"
    ],
    "coverage": "MS 58 Pirinç / PN25",
    "specs": {
      "standard": "TS EN ISO 15874-3",
      "packaging": "Kutu / Koli Paket",
      "mixingRatio": "Füzyon: 260°C",
      "potLife": "25 Bar Basınç Dayanımı",
      "logistics": "Balçova & Urla Depo Stok"
    },
    "meta": [
      "MS 58 Pirinç",
      "Ø20 - Ø32 mm Te",
      "Manometre & Branşman",
      "PN25"
    ],
    "accordions": [
      {
        "title": "1. Çok Fonksiyonlu Branşman",
        "body": "Tesisat hattını kesintiye uğratmadan orta koldan dişli metal vana veya sensör montajına olanak tanır."
      },
      {
        "title": "2. Dayanıklı Gövde",
        "body": "Yüksek enjeksiyon basıncıyla preslenmiş sızdırmaz pirinç kovan."
      },
      {
        "title": "3. Standartlar",
        "body": "TSE ve ISO kalite güvencesi."
      },
      {
        "title": "4. Sevkiyat",
        "body": "Urla ve Balçova'dan aynı gün sevk."
      }
    ]
  },
  {
    "id": "formul-metal-dis-disli-te",
    "name": "Formül PPRC Dış Dişli Te (Pirinç)",
    "badge": "Pirinç Metal Te Grubu",
    "tag": "Dış Dişli Rakor & Nipel",
    "category": "dis-dis",
    "deptId": "formulBrassPanel",
    "desc": "PPRC boru hattından dış dişli metal vana veya esnek fleks bağlantısı almak için tasarlanmış pirinç dişli te parçası.",
    "thumb": "assets/formul-official/formul-metal-dis-disli-te.svg",
    "sizes": [
      "Ø20×1/2\"×20 mm",
      "Ø25×3/4\"×25 mm"
    ],
    "coverage": "MS 58 Pirinç / PN25",
    "specs": {
      "standard": "TS EN ISO 15874-3",
      "packaging": "Kutu Paket",
      "mixingRatio": "Füzyon: 260°C",
      "potLife": "25 Bar Basınç Dayanımı",
      "logistics": "Balçova & Urla Depo Stok"
    },
    "meta": [
      "MS 58 Pirinç",
      "Ø20×1/2\" & Ø25×3/4\"",
      "Fleks & Vana Çıkışı",
      "PN25"
    ],
    "accordions": [
      {
        "title": "1. Dış Dişli Çıkış Kolaylığı",
        "body": "Kazan dairesi ve su saati girişlerinde doğrudan rekorlu bağlantı imkanı sağlar."
      },
      {
        "title": "2. Kaliteli Pirinç Diş",
        "body": "Pürüzsüz diş açımı sayesinde contalı bağlantılarda sıfır sızıntı."
      },
      {
        "title": "3. Uygunluk",
        "body": "İçme suyu sertifikalıdır."
      },
      {
        "title": "4. Dağıtım",
        "body": "Balçova ve Urla stoktan teslim."
      }
    ]
  },
  {
    "id": "formul-metal-oynar-basli-rakor-ic",
    "name": "Formül PPRC Oynar Başlıklı İç Dişli Rakor (Pirinç)",
    "badge": "Oynar Başlı Rakor Grubu",
    "tag": "Oynar Başlı Rakor",
    "category": "oynar-basli",
    "deptId": "formulBrassPanel",
    "desc": "Pompa, su sayacı ve boyler bağlantılarında boruyu döndürmeden kolay sökülüp takılmayı sağlayan contalı oynar başlı iç dişli rakor.",
    "thumb": "assets/formul-official/formul-metal-oynar-basli-rakor-ic.svg",
    "sizes": [
      "Ø20×1/2\"",
      "Ø25×3/4\"",
      "Ø32×1\"",
      "Ø40×1 1/4\"",
      "Ø50×1 1/2\"",
      "Ø63×2\""
    ],
    "coverage": "MS 58 Pirinç / EPDM Conta",
    "specs": {
      "standard": "TS EN ISO 15874-3 · DIN 2999",
      "packaging": "Kutu / Adet Paket",
      "mixingRatio": "Füzyon: 260°C · Somun EPDM Contalı",
      "potLife": "25 Bar Basınç Dayanımı",
      "logistics": "Balçova & Urla Depo Stok"
    },
    "meta": [
      "Oynar Başlı Somun",
      "EPDM Düz Conta",
      "Ø20×1/2\" - Ø63×2\"",
      "Kolay Demontaj"
    ],
    "accordions": [
      {
        "title": "1. Tesisatı Kesmeden Demontaj İmkanı",
        "body": "Pompa, filtre veya sayaç gibi periyodik bakım gerektiren cihazların tesisattan boruyu kesmeden sadece somun gevşetilerek sökülmesini sağlar."
      },
      {
        "title": "2. EPDM Düz Conta Sızdırmazlığı",
        "body": "Keten veya teflona ihtiyaç duymadan, faturalı EPDM conta baskısıyla %100 su sızdırmazlığı sunar."
      },
      {
        "title": "3. MS 58 Pirinç Somun",
        "body": "Ağır hizmet tipi pirinç somun yüksek torkta çatlamaz."
      },
      {
        "title": "4. Sevkiyat",
        "body": "Tüm çaplarda Urla ve Balçova depolarımızda mevcuttur."
      }
    ]
  },
  {
    "id": "formul-metal-oynar-basli-rakor-dis",
    "name": "Formül PPRC Oynar Başlıklı Dış Dişli Rakor (Pirinç)",
    "badge": "Oynar Başlı Rakor Grubu",
    "tag": "Oynar Başlı Rakor",
    "category": "oynar-basli",
    "deptId": "formulBrassPanel",
    "desc": "Kolektör girişleri ve hidrofor çıkışlarında boruyu çevirmeden pratik montaj sağlayan dış dişli oynar başlı pirinç rakor.",
    "thumb": "assets/formul-official/formul-metal-oynar-basli-rakor-dis.svg",
    "sizes": [
      "Ø20×1/2\"",
      "Ø25×3/4\"",
      "Ø32×1\"",
      "Ø40×1 1/4\"",
      "Ø50×1 1/2\""
    ],
    "coverage": "MS 58 Pirinç / EPDM Conta",
    "specs": {
      "standard": "TS EN ISO 15874-3",
      "packaging": "Kutu / Adet Paket",
      "mixingRatio": "Füzyon: 260°C",
      "potLife": "25 Bar Basınç Dayanımı",
      "logistics": "Balçova & Urla Depo Stok"
    },
    "meta": [
      "Dış Dişli Oynar Baş",
      "MS 58 Pirinç",
      "Ø20 - Ø50 mm",
      "Kollektör & Hidrofor"
    ],
    "accordions": [
      {
        "title": "1. Pratik Mekanik Bağlantı",
        "body": "Kollektör ve vana gruplarına boru eksenini bozmadan bağlanır."
      },
      {
        "title": "2. Sızdırmazlık Güvencesi",
        "body": "Yüksek kaliteli EPDM conta ve pirinç baskı faturası."
      },
      {
        "title": "3. Standartlar",
        "body": "DIN ve TSE onaylı."
      },
      {
        "title": "4. Tedarik",
        "body": "Pervan stoklarından aynı gün teslim."
      }
    ]
  },
  {
    "id": "formul-metal-ciftli-batarya-baglantisi",
    "name": "Formül PPRC Çiftli Batarya Bağlantı Şablonu (150 mm)",
    "badge": "Batarya Şablonu Grubu",
    "tag": "Batarya Bağlantı Şablonu",
    "category": "batarya-sablon",
    "deptId": "formulBrassPanel",
    "desc": "Banyo ve duş bataryalarının duvara montajında 150 mm standart aks mesafesini ve terazi eksenini milimetrik sabitleyen galvaniz sac gövdeli çiftli batarya şablonu.",
    "thumb": "assets/formul-official/formul-metal-ciftli-batarya-baglantisi.svg",
    "sizes": [
      "Ø20×1/2\" - 150 mm Aks Aralığı",
      "Ø25×1/2\" - 150 mm Aks Aralığı"
    ],
    "coverage": "150 mm Standart Aks / MS 58",
    "specs": {
      "standard": "TS EN ISO 15874-3 · DIN EN 817 (150 mm Aks)",
      "packaging": "Kutu Paket",
      "mixingRatio": "Füzyon: 260°C · Duvara Vidalı Sabitleme",
      "potLife": "25 Bar Basınç Dayanımı",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "meta": [
      "150 mm Sabit Aks",
      "Galvaniz Sac Şasi",
      "Terazi & Eksen Garantisi",
      "Sıva Altı Duş Bataryası"
    ],
    "accordions": [
      {
        "title": "1. Batarya Eksen Kayması ve Terazi Bozulmasını Önler",
        "body": "Ayrı dirseklerle yapılan montajlarda sıva ve seramik uygulamasında dirseklerin eğilmesi ve 150 mm aksın kaçması batarya montajını imkansız kılar. Formül rijit şablon sacı aksı ve teraziyi milimetrik olarak kilitler."
      },
      {
        "title": "2. Kolay Duvar Sabitleme Delikleri",
        "body": "Sac şasi üzerindeki çoklu vida kanalları sayesinde tuğla veya alçıpan duvara dübel ve vida ile rijit şekilde tutturulur."
      },
      {
        "title": "3. MS 58 Pirinç Dişler",
        "body": "1/2\" iç dişli pirinç kovanlar batarya eksantriklerine tam uyumludur."
      },
      {
        "title": "4. Dağıtım",
        "body": "Balçova ve Urla depolarımızdan anında sevk."
      }
    ]
  },
  {
    "id": "formul-metal-tekli-batarya-baglantisi",
    "name": "Formül PPRC Tekli Taharet & Batarya Bağlantısı (Kulaklı)",
    "badge": "Batarya Bağlantı Grubu",
    "tag": "Batarya Bağlantı Şablonu",
    "category": "batarya-sablon",
    "deptId": "formulBrassPanel",
    "desc": "Tekli musluk, taharet musluğu ve çamaşır makinesi musluk çıkışlarının duvara sağlam vidalanmasını sağlayan montaj kulaklı PPRC pirinç dirsek.",
    "thumb": "assets/formul-official/formul-metal-tekli-batarya-baglantisi.svg",
    "sizes": [
      "Ø20×1/2\" İç Diş (Kulaklı)",
      "Ø25×1/2\" İç Diş (Kulaklı)"
    ],
    "coverage": "MS 58 Pirinç / Vidalı Kulak",
    "specs": {
      "standard": "TS EN ISO 15874-3",
      "packaging": "Kutu Paket",
      "mixingRatio": "Füzyon: 260°C",
      "potLife": "25 Bar Basınç Dayanımı",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "meta": [
      "3 Vidalı Montaj Kulağı",
      "Ø20×1/2\"",
      "Taharet Musluğu",
      "Sıva Altı Rijit"
    ],
    "accordions": [
      {
        "title": "1. Duvara Sağlam Mekanik Ankraj",
        "body": "3 adet vida montaj kulağı sayesinde sıva altı tuğlaya vidalanarak musluğun açılıp kapanmasında esnemeyi sıfırlar."
      },
      {
        "title": "2. Pirinç Kovan Gücü",
        "body": "Derin 1/2\" iç diş yapısı uzatma nipelleri için idealdir."
      },
      {
        "title": "3. Kalite",
        "body": "TSE onaylı Formül orijinal üretimi."
      },
      {
        "title": "4. Sevkiyat",
        "body": "Stoktan hemen teslim."
      }
    ]
  },
  {
    "id": "formul-pprc-kuresel-vana",
    "name": "Formül PPRC Tam Geçişli Küresel Vana",
    "badge": "Küresel Vana Grubu",
    "tag": "PPRC Küresel Vana",
    "category": "kuresel-vana",
    "deptId": "formulValvesPanel",
    "desc": "Sıcak ve soğuk su hatlarında tam akış kesme sağlayan, teflon (PTFE) yataklı pirinç küreli, korozyon yapmayan PPRC gövdeli küresel vana.",
    "thumb": "assets/formul-official/formul-pprc-kuresel-vana.svg",
    "sizes": [
      "Ø20 mm (1/2\")",
      "Ø25 mm (3/4\")",
      "Ø32 mm (1\")",
      "Ø40 mm (1 1/4\")",
      "Ø50 mm (1 1/2\")",
      "Ø63 mm (2\")",
      "Ø75 mm (2 1/2\")"
    ],
    "coverage": "DIN EN 13828 / PN25",
    "specs": {
      "standard": "DIN EN 13828 · TS EN ISO 15874",
      "packaging": "Adet / Kutu Paket",
      "mixingRatio": "Füzyon: 260°C",
      "potLife": "25 Bar Basınç Dayanımı",
      "logistics": "Balçova Showroom & Urla Ana Lojistik Depo Stok"
    },
    "meta": [
      "Tam Geçişli Küre",
      "PTFE Teflon Yatak",
      "Ø20 - Ø75 mm",
      "DIN EN 13828"
    ],
    "accordions": [
      {
        "title": "1. Tam Geçişli Hidrolik Tasarım",
        "body": "Küre iç deliği boru iç çapıyla birebir aynıdır. Vana açık konumdayken hiçbir basınç düşüşü veya debi daralması oluşturmaz."
      },
      {
        "title": "2. Kireç Tutmayan PTFE Teflon Yataklama",
        "body": "Kireçli ve sert şebeke sularında pirinç küre teflon yuva üzerinde kayar. Yıllar geçse dahi sıkışma veya kilitlenme yapmaz."
      },
      {
        "title": "3. Yüksek Basınç ve Sızdırmazlık Testi",
        "body": "%100 fabrikasyon hidrostatik ve pnömatik sızdırmazlık testinden geçirilmiştir."
      },
      {
        "title": "4. Dağıtım & Stok",
        "body": "Balçova ve Urla şubelerimizde tüm çaplar raftan teslim."
      }
    ]
  },
  {
    "id": "formul-pprc-krom-gizli-ankastre-vana",
    "name": "Formül PPRC Gizli Krom Ankastre Banyo Vanası",
    "badge": "Ankastre Vana Grubu",
    "tag": "Gizli Krom Ankastre Vana",
    "category": "ankastre-vana",
    "deptId": "formulValvesPanel",
    "desc": "Banyo ve ıslak hacimlerde sıva altına gömülen, estetik krom kaplama metal açma-kapama volanı ve rozetine sahip şık ankastre vana.",
    "thumb": "assets/formul-official/formul-pprc-krom-gizli-ankastre-vana.svg",
    "sizes": [
      "Ø20 mm (1/2\")",
      "Ø25 mm (3/4\")",
      "Ø32 mm (1\")"
    ],
    "coverage": "Krom Kaplama Metal Volan / PN25",
    "specs": {
      "standard": "DIN EN 13828 · TS EN ISO 15874",
      "packaging": "Krom Volan & Rozet Dahil Kutu Paket",
      "mixingRatio": "Füzyon: 260°C · Sıva Altı Ayarlanabilir Boyun",
      "potLife": "25 Bar Basınç Dayanımı",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "meta": [
      "Krom Metal Volan",
      "Teleskopik Ayar Rozeti",
      "Ø20 - Ø32 mm",
      "Sıva Altı Lüks Seri"
    ],
    "accordions": [
      {
        "title": "1. Sıva ve Seramik Derinlik Ayar Rozeti",
        "body": "Teleskopik uzatma boynu sayesinde sıva ve fayans kalınlığı farklılıklarına tam uyum sağlar. Duvar yüzeyiyle kusursuz sıfır bitiş oluşturur."
      },
      {
        "title": "2. Salmastra Değişim Kolaylığı",
        "body": "Gerektiğinde iç salmastra mekanizması duvar seramiği kırılmadan volan sökülerek ön yüzden kolayca değiştirilebilir."
      },
      {
        "title": "3. Kararmayan Ayna Krom Kaplama",
        "body": "Tuzlu hava ve banyo nemine karşı korozyon yapmayan elektro-krom kaplama."
      },
      {
        "title": "4. Sevkiyat",
        "body": "Urla ve Balçova merkezlerimizden anında sevk."
      }
    ]
  },
  {
    "id": "formul-pprc-kelebek-sapli-kuresel-vana",
    "name": "Formül PPRC Kelebek Kollu Küresel Vana",
    "badge": "Küresel Vana Grubu",
    "tag": "PPRC Küresel Vana",
    "category": "kuresel-vana",
    "deptId": "formulValvesPanel",
    "desc": "Kollektör dolapları, lavabo altları ve dar montaj alanlarında açma-kapama kolaylığı sağlayan ergonomik kelebek kollu küresel vana.",
    "thumb": "assets/formul-official/formul-pprc-kelebek-sapli-kuresel-vana.svg",
    "sizes": [
      "Ø20 mm (1/2\")",
      "Ø25 mm (3/4\")",
      "Ø32 mm (1\")"
    ],
    "coverage": "Kelebek Saplı / PN25",
    "specs": {
      "standard": "DIN EN 13828",
      "packaging": "Kutu Paket",
      "mixingRatio": "Füzyon: 260°C",
      "potLife": "25 Bar Basınç Dayanımı",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "meta": [
      "Kelebek Kol",
      "Kollektör Dolabı Uyumlu",
      "Ø20 - Ø32 mm",
      "Kompakt"
    ],
    "accordions": [
      {
        "title": "1. Dar Alanlarda Kolay Kullanım",
        "body": "Uzun kolun duvara veya komşu boruya çarpabileceği dar alanlarda 90° kelebek dönüşü ile rahatça kontrol edilir."
      },
      {
        "title": "2. Pirinç Küre Mekanizması",
        "body": "Krom kaplı masif pirinç küre ve çift EPDM o-ring sızdırmazlık."
      },
      {
        "title": "3. Standartlar",
        "body": "TSE ve CE belgeli."
      },
      {
        "title": "4. Tedarik",
        "body": "Balçova ve Urla stoklarımızdan teslim."
      }
    ]
  },
  {
    "id": "formul-pprc-radyator-vanasi-kose",
    "name": "Formül PPRC Köşe Radyatör Vanası",
    "badge": "Radyatör Vanası Grubu",
    "tag": "Radyatör & Termostatik",
    "category": "radyator-vana",
    "deptId": "formulValvesPanel",
    "desc": "Radyatör peteklerinin alt/üst köşe bağlantısı için PPRC boruya doğrudan füzyon kaynağı yapılan, 1/2\" rakorlu pirinç mekanizmalı köşe vana.",
    "thumb": "assets/formul-official/formul-pprc-radyator-vanasi-kose.svg",
    "sizes": [
      "Ø20×1/2\" Köşe",
      "Ø25×1/2\" Köşe"
    ],
    "coverage": "Köşe Radyatör / PN16",
    "specs": {
      "standard": "TS 579 · DIN EN 215",
      "packaging": "Kutu Paket",
      "mixingRatio": "Füzyon: 260°C · Petek Bağlantısı: 1/2\" Rakor",
      "potLife": "120°C Sıcak Su / 16 Bar",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "meta": [
      "Köşe Tip",
      "1/2\" Pirinç Rakor",
      "Ø20×1/2\"",
      "Direkt Füzyon"
    ],
    "accordions": [
      {
        "title": "1. Ekstra Rakor ve Nipel Masrafına Son",
        "body": "PPRC boruya direkt füzyonla bağlandığı için duvardan çıkan boruda ekstra metal adaptör gerektirmez."
      },
      {
        "title": "2. O-Ringli Konik Rakor Bağlantısı",
        "body": "Radyatör bağlantısında keten sarımına gerek kalmadan o-ringli konik pirinç rekoru ile tam sızdırmazlık sağlar."
      },
      {
        "title": "3. Yüksek Sıcaklık Dayanımı",
        "body": "Kazan ve kombi sıcak sularında deforme olmaz."
      },
      {
        "title": "4. Dağıtım",
        "body": "Urla ve Balçova şubelerimizden anında sevk."
      }
    ]
  },
  {
    "id": "formul-pprc-radyator-vanasi-duz",
    "name": "Formül PPRC Düz Radyatör Vanası",
    "badge": "Radyatör Vanası Grubu",
    "tag": "Radyatör & Termostatik",
    "category": "radyator-vana",
    "deptId": "formulValvesPanel",
    "desc": "Zeminden veya süpürgelikten gelen kalorifer borularının radyatöre düz doğrultuda bağlanması için üretilmiş düz tip PPRC radyatör vanası.",
    "thumb": "assets/formul-official/formul-pprc-radyator-vanasi-duz.svg",
    "sizes": [
      "Ø20×1/2\" Düz",
      "Ø25×1/2\" Düz"
    ],
    "coverage": "Düz Radyatör / PN16",
    "specs": {
      "standard": "TS 579 · DIN EN 215",
      "packaging": "Kutu Paket",
      "mixingRatio": "Füzyon: 260°C",
      "potLife": "120°C Sıcak Su / 16 Bar",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "meta": [
      "Düz Tip",
      "1/2\" Pirinç Rakor",
      "Ø20×1/2\"",
      "Zemin Girişli"
    ],
    "accordions": [
      {
        "title": "1. Zeminden Gelen Tesisat Hatları",
        "body": "Süpürgelik veya şap içinden yükselen boruların peteğe düz eksende montajı için idealdir."
      },
      {
        "title": "2. Hassas Debi Ayarı",
        "body": "Volan mili üzerinden radyatör su debisi hassas olarak kısılarak oda ısısı dengelenir."
      },
      {
        "title": "3. Standartlar",
        "body": "TSE ve EN standartlarına tam uygundur."
      },
      {
        "title": "4. Sevkiyat",
        "body": "Balçova ve Urla stoktan teslim."
      }
    ]
  },
  {
    "id": "formul-pprc-cekvalf",
    "name": "Formül PPRC Yaylı Çekvalf",
    "badge": "Çekvalf Grubu",
    "tag": "Çekvalf & Filtre",
    "category": "cekvalf",
    "deptId": "formulValvesPanel",
    "desc": "Suyun sadece tek bir yönde akmasına izin veren, hidrofor geri basmalarını ve su sayacı geri dönüşlerini önleyen paslanmaz yaylı PPRC çekvalf.",
    "thumb": "assets/formul-official/formul-pprc-cekvalf.svg",
    "sizes": [
      "Ø20 mm (1/2\")",
      "Ø25 mm (3/4\")",
      "Ø32 mm (1\")",
      "Ø40 mm (1 1/4\")",
      "Ø50 mm (1 1/2\")",
      "Ø63 mm (2\")"
    ],
    "coverage": "Paslanmaz Çelik Yay / PN25",
    "specs": {
      "standard": "TS EN ISO 15874 · DIN EN 13828",
      "packaging": "Adet / Kutu Paket",
      "mixingRatio": "Füzyon: 260°C (Akış Yönü Oku Kontrol Edilmelidir)",
      "potLife": "25 Bar Basınç Dayanımı",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "meta": [
      "Paslanmaz Yay",
      "Geri Akış Önleyici",
      "Ø20 - Ø63 mm",
      "PN25"
    ],
    "accordions": [
      {
        "title": "1. Geri Akış ve Su Sayacı Güvenliği",
        "body": "Şebeke basıncı düştüğünde bina içindeki suyun şebekeye geri kaçmasını veya hidrofor hattının boşalmasını engeller."
      },
      {
        "title": "2. Paslanmaz Çelik Yay ve NBR Klape",
        "body": "İç mekanizmasında AISI 304 paslanmaz çelik yay ve sızdırmaz NBR elastomer conta kullanılmıştır."
      },
      {
        "title": "3. Montaj Uyarısı",
        "body": "Gövde üzerindeki akış yönü oku doğrultusunda füzyon kaynağı yapılmalıdır."
      },
      {
        "title": "4. Sevkiyat",
        "body": "Urla ve Balçova stoklarımızdan derhal teslim."
      }
    ]
  },
  {
    "id": "formul-pprc-pislik-tutucu",
    "name": "Formül PPRC Filtre & Pislik Tutucu (Y Tipi)",
    "badge": "Filtre Grubu",
    "tag": "Çekvalf & Filtre",
    "category": "cekvalf",
    "deptId": "formulValvesPanel",
    "desc": "Şebekeden gelen kum, pas ve tortuları tutarak sayaç, batarya ve kombi eşanjörünü koruyan, temizlenebilir paslanmaz çelik filtreli Y tipi PPRC pislik tutucu.",
    "thumb": "assets/formul-official/formul-pprc-pislik-tutucu.svg",
    "sizes": [
      "Ø20 mm (1/2\")",
      "Ø25 mm (3/4\")",
      "Ø32 mm (1\")",
      "Ø40 mm (1 1/4\")",
      "Ø50 mm (1 1/2\")"
    ],
    "coverage": "AISI 304 Paslanmaz Filtre / PN25",
    "specs": {
      "standard": "TS EN ISO 15874 · DIN EN 13828",
      "packaging": "Adet / Kutu Paket",
      "mixingRatio": "Füzyon: 260°C · Vidalı Pirinç Temizleme Kapağı",
      "potLife": "25 Bar Basınç Dayanımı",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "meta": [
      "Paslanmaz Çelik Filtre",
      "Vidalı Temizleme Kapağı",
      "Ø20 - Ø50 mm",
      "Kombi & Sayaç Koruması"
    ],
    "accordions": [
      {
        "title": "1. Cihaz ve Armatür Koruması",
        "body": "Kombi, termosifon, çamaşır/bulaşık makinesi ve termostatik bataryaların seramik kartuşlarını kum ve çapak aşınmasından korur."
      },
      {
        "title": "2. Pratik Temizleme Kapağı",
        "body": "Pirinç alt kapağı anahtarla açılarak paslanmaz çelik filtre kartuşu kolayca çıkarılıp yıkanabilir."
      },
      {
        "title": "3. Standartlar",
        "body": "Yüksek basınçlı PN25 kalın gövde yapısı."
      },
      {
        "title": "4. Sevkiyat",
        "body": "Balçova ve Urla stoktan aynı gün teslim."
      }
    ]
  },
  {
    "id": "formul-pvc-atik-su-borusu-tip2",
    "name": "Formül Contalı PVC Atık Su Borusu (Tip 2 / Ağır Seri 3.2 mm)",
    "badge": "PVC Ağır Seri Grubu",
    "tag": "Contalı PVC Boru",
    "category": "pvc-boru",
    "deptId": "formulPvcDrainPanel",
    "desc": "Bina içi ana düşey atık su kolonları ve zemin altı yatay hatlar için üretilmiş, 3.2 mm et kalınlığında, contalı sessiz ve mukavim PVC atık su borusu.",
    "thumb": "assets/formul-official/formul-pvc-atik-su-borusu-tip2.svg",
    "sizes": [
      "Ø50 mm (150-3000 mm)",
      "Ø75 mm (150-3000 mm)",
      "Ø110 mm (150-3000 mm)",
      "Ø125 mm (150-3000 mm)",
      "Ø160 mm (150-3000 mm)",
      "Ø200 mm (150-3000 mm)"
    ],
    "coverage": "Tip 2 / TS EN 1329-1 (Bina İçi & Dışı)",
    "specs": {
      "standard": "TS EN 1329-1 · DIN 19531",
      "packaging": "Boy: 15 cm - 300 cm (Muf & Contalı)",
      "mixingRatio": "Contalı Geçme (Kaydırıcı Silikon / Sabun ile Montaj)",
      "potLife": "60°C Sürekli · 95°C Tepe Sıcaklığı",
      "logistics": "Balçova Showroom & Urla Ana Lojistik Depo Stok"
    },
    "meta": [
      "Tip 2 / 3.2 mm Et",
      "TS EN 1329-1",
      "Ø50 - Ø200 mm",
      "Dudaklı Elastomer Conta"
    ],
    "accordions": [
      {
        "title": "1. Tip 2 Ağır Seri Mukavemet & Ses Yalıtımı",
        "body": "3.2 mm yüksek et kalınlığı sayesinde düşey kolon şaftlarında suyun iniş sesini sönümler ve bina içi akustik konfor sağlar. Zemin oturmalarına ve toprak yüküne dayanıklıdır."
      },
      {
        "title": "2. Özel Dudaklı Elastomer Conta ile Sıfır Koku & Sızıntı",
        "body": "Formül fabrikasyon muf yuvasına yerleştirilen özel dudaklı conta, boru eksenel hareket etse bile su ve atık koku gazlarının sızmasını %100 engeller."
      },
      {
        "title": "3. Kimyasal ve Deterjan Direnci",
        "body": "Sıcak çamaşır/bulaşık makinesi deterjanlı sularına, asidik ve bazik evsel atıklara karşı pürüzsüz iç yüzeyiyle tıkanma yapmaz."
      },
      {
        "title": "4. Şantiye Teslimatı & Metraj Dağıtımı",
        "body": "15 cm'den 3 metre boya kadar tüm uzunluklar Urla Lojistik Depomuzda stokludur. Şantiyenize paletli veya demet halinde sevk edilir."
      }
    ]
  },
  {
    "id": "formul-pvc-atik-su-borusu-tip1",
    "name": "Formül Contalı PVC Atık Su Borusu (Tip 1 / Hafif Seri)",
    "badge": "PVC Hafif Seri Grubu",
    "tag": "Contalı PVC Boru",
    "category": "pvc-boru",
    "deptId": "formulPvcDrainPanel",
    "desc": "Kat içi lavabo, süzgeç ve banyo yatay bağlantılarında kullanılan hafif ve ekonomik contalı PVC atık su borusu.",
    "thumb": "assets/formul-official/formul-pvc-atik-su-borusu-tip1.svg",
    "sizes": [
      "Ø50 mm (150-3000 mm)",
      "Ø75 mm (150-3000 mm)",
      "Ø110 mm (150-3000 mm)"
    ],
    "coverage": "Tip 1 / TS EN 1329-1",
    "specs": {
      "standard": "TS EN 1329-1",
      "packaging": "Boy: 15 cm - 300 cm (Contalı)",
      "mixingRatio": "Geçme Contalı Montaj",
      "potLife": "Evsel Atık Su Sıcaklığı",
      "logistics": "Balçova & Urla Depo Stok"
    },
    "meta": [
      "Tip 1 Hafif Seri",
      "TS EN 1329-1",
      "Ø50 - Ø110 mm",
      "Kat İçi Yatay Hat"
    ],
    "accordions": [
      {
        "title": "1. Kat İçi Tesisatta Pratik ve Ekonomik",
        "body": "Lavabo ve banyo giderlerinin kat içi ana şafta taşınmasında hafifliği ve kolay kesilebilirliği ile montaj hızını artırır."
      },
      {
        "title": "2. Pürüzsüz İç Yüzey",
        "body": "Yağ ve sabun artıklarının yüzeye tutunmasını önler."
      },
      {
        "title": "3. Standartlar",
        "body": "TSE onaylı güvenilir hammadde."
      },
      {
        "title": "4. Tedarik",
        "body": "Urla ve Balçova şubelerimizden derhal teslim."
      }
    ]
  },
  {
    "id": "formul-pvc-tek-catal-45",
    "name": "Formül PVC 45° Tek Çatal",
    "badge": "PVC Ek Parça Grubu",
    "tag": "Çatallar & Dirsekler",
    "category": "catal-dirsek",
    "deptId": "formulPvcDrainPanel",
    "desc": "Düşey veya yatay atık su hattına 45 derecelik açıyla yan branşman bağlamak için kullanılan sızdırmaz contalı PVC tek çatal.",
    "thumb": "assets/formul-official/formul-pvc-tek-catal-45.svg",
    "sizes": [
      "Ø50/50 mm 45°",
      "Ø75/50 mm 45°",
      "Ø75/75 mm 45°",
      "Ø110/50 mm 45°",
      "Ø110/75 mm 45°",
      "Ø110/110 mm 45°",
      "Ø160/110 mm 45°",
      "Ø160/160 mm 45°"
    ],
    "coverage": "TS EN 1329-1 Contalı",
    "specs": {
      "standard": "TS EN 1329-1 · DIN 19531",
      "packaging": "Koli Paket",
      "mixingRatio": "Contalı Geçme Montaj",
      "potLife": "Evsel Atık Su",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "meta": [
      "45° Yan Branşman",
      "TS EN 1329-1",
      "Ø50 - Ø160 mm",
      "Contalı"
    ],
    "accordions": [
      {
        "title": "1. Tıkanmayı Önleyen 45° Giriş Açısı",
        "body": "Düşey kolona kat bağlantısı yapılırken suyun karşı duvara çarpıp geri tepmesini engelleyen 45 derece akış geometrisi."
      },
      {
        "title": "2. Geniş Çap Kombinasyonları",
        "body": "Ø50 mm süzgeç bağlantısından Ø160 mm ana boru girişine kadar tüm ölçüler mevcuttur."
      },
      {
        "title": "3. Standartlar",
        "body": "TSE ve DIN 19531."
      },
      {
        "title": "4. Sevkiyat",
        "body": "Urla ve Balçova merkezlerimizden anında sevk."
      }
    ]
  },
  {
    "id": "formul-pvc-cift-catal-45",
    "name": "Formül PVC 45° Çift Çatal",
    "badge": "PVC Ek Parça Grubu",
    "tag": "Çatallar & Dirsekler",
    "category": "catal-dirsek",
    "deptId": "formulPvcDrainPanel",
    "desc": "Ana atık su kolonuna sağdan ve soldan iki ayrı daire veya banyo giderinin aynı seviyede bağlanmasını sağlayan 45° çift çatal.",
    "thumb": "assets/formul-official/formul-pvc-cift-catal-45.svg",
    "sizes": [
      "Ø110/50/50 mm 45°",
      "Ø110/75/75 mm 45°",
      "Ø110/110/110 mm 45°"
    ],
    "coverage": "TS EN 1329-1 Contalı",
    "specs": {
      "standard": "TS EN 1329-1",
      "packaging": "Koli Paket",
      "mixingRatio": "Contalı Geçme",
      "potLife": "Evsel Atık Su",
      "logistics": "Balçova & Urla Depo Stok"
    },
    "meta": [
      "Çift Branşman",
      "110 mm Ana Kolon",
      "Simetrik Daire Bağlantısı",
      "TS EN 1329-1"
    ],
    "accordions": [
      {
        "title": "1. Şaft Alanı ve Boru Tasarrufu",
        "body": "Tek katta iki dairenin simetrik banyo giderlerini tek bir ana şaft kolonuna bağlayarak yer tasarrufu sağlar."
      },
      {
        "title": "2. Eşzamanlı Akış Güvenliği",
        "body": "İç deflektör yapısı sayesinde her iki daireden aynı anda gelen atık suyun birbiri içine geri basması önlenir."
      },
      {
        "title": "3. Kalite Belgesi",
        "body": "TSE sertifikalı orijinal Formül üretimi."
      },
      {
        "title": "4. Tedarik",
        "body": "Pervan stoklarından aynı gün şantiye teslim."
      }
    ]
  },
  {
    "id": "formul-pvc-dirsek-87",
    "name": "Formül PVC 87.5° Kapalı Dirsek",
    "badge": "PVC Dirsek Grubu",
    "tag": "Çatallar & Dirsekler",
    "category": "catal-dirsek",
    "deptId": "formulPvcDrainPanel",
    "desc": "Klozet, tuvalet taşı ve dikey kolon inişlerinde 90 dereceye yakın dik açılı dönüş sağlayan sızdırmaz contalı PVC kapalı dirsek.",
    "thumb": "assets/formul-official/formul-pvc-dirsek-87.svg",
    "sizes": [
      "Ø50 mm 87.5°",
      "Ø75 mm 87.5°",
      "Ø110 mm 87.5°",
      "Ø125 mm 87.5°",
      "Ø160 mm 87.5°"
    ],
    "coverage": "TS EN 1329-1 Contalı",
    "specs": {
      "standard": "TS EN 1329-1 · DIN 19531",
      "packaging": "Koli Paket",
      "mixingRatio": "Contalı Geçme Montaj",
      "potLife": "Evsel Atık Su",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "meta": [
      "87.5° Eğimli Açılı",
      "Klozet & Kolon Tabanı",
      "Ø50 - Ø160 mm",
      "TS EN 1329-1"
    ],
    "accordions": [
      {
        "title": "1. 87.5 Derece Özel Eğim Geometrisi",
        "body": "Tam 90 derece yerine 87.5 derece olarak üretilmesi yatay hatta %2.5'lik kendiliğinden akış eğimini otomatik olarak verir."
      },
      {
        "title": "2. Geniş Radyüslü İç Cidar",
        "body": "Katı atıkların dirsek tabanına çarpıp tıkanma yapmasını önleyen yuvarlatılmış iç geçiş açısı."
      },
      {
        "title": "3. Standartlar",
        "body": "TSE ve ISO kalite standardı."
      },
      {
        "title": "4. Sevkiyat",
        "body": "Balçova ve Urla şubelerimizden anında teslim."
      }
    ]
  },
  {
    "id": "formul-pvc-dirsek-45",
    "name": "Formül PVC 45° Açık Dirsek",
    "badge": "PVC Dirsek Grubu",
    "tag": "Çatallar & Dirsekler",
    "category": "catal-dirsek",
    "deptId": "formulPvcDrainPanel",
    "desc": "Ana kolon şaftlarında kolon kaçıklıklarını geçmek ve yatay hatlarda akıcı dönüşler oluşturmak için kullanılan 45° contalı PVC dirsek.",
    "thumb": "assets/formul-official/formul-pvc-dirsek-45.svg",
    "sizes": [
      "Ø50 mm 45°",
      "Ø75 mm 45°",
      "Ø110 mm 45°",
      "Ø125 mm 45°",
      "Ø160 mm 45°",
      "Ø200 mm 45°"
    ],
    "coverage": "TS EN 1329-1 Contalı",
    "specs": {
      "standard": "TS EN 1329-1 · DIN 19531",
      "packaging": "Koli Paket",
      "mixingRatio": "Contalı Geçme Montaj",
      "potLife": "Evsel Atık Su",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "meta": [
      "45° Açık Dirsek",
      "Akıcı Dönüş",
      "Ø50 - Ø200 mm",
      "TS EN 1329-1"
    ],
    "accordions": [
      {
        "title": "1. Kolon Şaftı Kiriş Geçişleri",
        "body": "İki adet 45° dirsek kullanılarak oluşturulan S kıvrımları, suyun akış hızını kesmeden kiriş ve hat engellerini aşar."
      },
      {
        "title": "2. Sessiz Akış",
        "body": "Geniş açı su çarpma sesini minimize eder."
      },
      {
        "title": "3. Standartlar",
        "body": "TSE onaylıdır."
      },
      {
        "title": "4. Lojistik",
        "body": "Urla ve Balçova merkezlerimizden hemen teslim."
      }
    ]
  },
  {
    "id": "formul-pvc-reduksiyon",
    "name": "Formül PVC Atık Su Redüksiyonu (Eksantrik)",
    "badge": "PVC Redüksiyon Grubu",
    "tag": "Temizleme & Sifon Parçası",
    "category": "temizleme-sifon",
    "deptId": "formulPvcDrainPanel",
    "desc": "Büyük çaplı PVC boru veya çatal ağzına daha küçük çaplı borunun bağlanmasını sağlayan, alt tabanı düz eksantrik tip PVC redüksiyon.",
    "thumb": "assets/formul-official/formul-pvc-reduksiyon.svg",
    "sizes": [
      "Ø75/50 mm",
      "Ø110/50 mm",
      "Ø110/75 mm",
      "Ø125/110 mm",
      "Ø160/110 mm",
      "Ø200/160 mm"
    ],
    "coverage": "TS EN 1329-1 Contalı",
    "specs": {
      "standard": "TS EN 1329-1",
      "packaging": "Koli Paket",
      "mixingRatio": "Contalı Geçme",
      "potLife": "Evsel Atık Su",
      "logistics": "Balçova & Urla Depo Stok"
    },
    "meta": [
      "Eksantrik Düz Taban",
      "Tortu Birikmez",
      "Ø75/50 - Ø200/160 mm",
      "TS EN 1329-1"
    ],
    "accordions": [
      {
        "title": "1. Eksantrik Düz Taban Avantajı",
        "body": "Konsantrik redüksiyonların aksine tabanı düz olduğu için su akış seviyesinde basamak oluşturmaz, tortu ve pislik birikmesini engeller."
      },
      {
        "title": "2. Mükemmel Muf Uyumu",
        "body": "Contalı geniş muf yuvası ile üst boruya rijit sızdırmazlık sunar."
      },
      {
        "title": "3. Standartlar",
        "body": "TSE belgeli."
      },
      {
        "title": "4. Dağıtım",
        "body": "Pervan Yapı Market depolarından anında sevk."
      }
    ]
  },
  {
    "id": "formul-pvc-temizleme-parcasi",
    "name": "Formül PVC Vidalı Temizleme (Revizyon) Parçası",
    "badge": "PVC Revizyon Grubu",
    "tag": "Temizleme & Sifon Parçası",
    "category": "temizleme-sifon",
    "deptId": "formulPvcDrainPanel",
    "desc": "Atık su kolonlarının tabanında veya yatay ana hatlarda tıkanıklık anında tesisatı sökmeden kanal açma sustası sokulmasını sağlayan contalı vidalı temizleme parçası.",
    "thumb": "assets/formul-official/formul-pvc-temizleme-parcasi.svg",
    "sizes": [
      "Ø50 mm",
      "Ø75 mm",
      "Ø110 mm",
      "Ø125 mm",
      "Ø160 mm"
    ],
    "coverage": "TS EN 1329-1 / Vidalı Kapak",
    "specs": {
      "standard": "TS EN 1329-1 · DIN 19531",
      "packaging": "Adet / Koli Paket",
      "mixingRatio": "Contalı Gövde · Contalı Vidalı Kapak",
      "potLife": "Evsel Atık Su",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "meta": [
      "Vidalı Geniş Kapak",
      "Kanal Açma Girişi",
      "Ø50 - Ø160 mm",
      "Tıkanıklık Müdahale"
    ],
    "accordions": [
      {
        "title": "1. Tesisatı Kırmadan Kolay Tıkanıklık Müdahalesi",
        "body": "Bina ana gideri tıkandığında vidalı kapağı açılarak spiral temizleme sustası veya basınçlı yıkama nozulu doğrudan hatta sokulabilir."
      },
      {
        "title": "2. Sızdırmaz Kauçuk Kapak Contası",
        "body": "Kapak kapatıldığında koku ve basınçlı atık su sızıntısını tamamen engelleyen kauçuk conta halkası bulunur."
      },
      {
        "title": "3. Standartlar",
        "body": "TSE ve EN standartlarına tam uyumludur."
      },
      {
        "title": "4. Sevkiyat",
        "body": "Balçova ve Urla stoklarımızdan derhal teslim."
      }
    ]
  },
  {
    "id": "formul-pe-rt-oksijen-bariyerli-boru",
    "name": "Formül 5 Katmanlı EVOH Oksijen Bariyerli PE-RT Boru (16×2.0 mm)",
    "badge": "PE-RT Boru Grubu",
    "tag": "PE-RT Oksijen Bariyerli",
    "category": "pe-rt-boru",
    "deptId": "formulUnderfloorPanel",
    "desc": "Zeminden ısıtma sistemlerinde oksijen difüzyonunu sıfırlayan 5 katmanlı EVOH zırhlı, son derece esnek, çatlama ve kırılma yapmayan 16×2.0 mm PE-RT boru.",
    "thumb": "assets/formul-official/formul-pe-rt-oksijen-bariyerli-boru.svg",
    "sizes": [
      "16×2.0 mm (160 Metre Kangal)",
      "16×2.0 mm (240 Metre Kangal)",
      "16×2.0 mm (600 Metre Proje Kangalı)",
      "20×2.0 mm (160 Metre Kangal)"
    ],
    "coverage": "5 Katmanlı EVOH / DIN 4726 / Class 4-5",
    "specs": {
      "standard": "DIN 4726 · TS EN ISO 22391-2",
      "packaging": "160 m / 240 m / 600 m Rulo Kangal",
      "mixingRatio": "Soğuk Bükülebilir (Maksimum Esneklik)",
      "potLife": "70°C Sürekli · 95°C Tepe (50 Yıl Ömür / 10 Bar)",
      "logistics": "Balçova Showroom & Urla Ana Lojistik Depo Stok"
    },
    "meta": [
      "5 Katmanlı EVOH Zırh",
      "DIN 4726 O2 Geçirimsiz",
      "16×2.0 mm",
      "Yüksek Esneklik"
    ],
    "accordions": [
      {
        "title": "1. 5 Katmanlı Koruma & İçte Kalan EVOH Bariyeri",
        "body": "Dışarıdan gelen sürtünmelerin bariyeri yırtmasını önlemek için EVOH oksijen bariyeri orta katmana lamine edilmiştir. Havadaki oksijenin suya karışmasını sıfırlayarak kombi, boyler ve kollektörlerin paslanmasını ve çamurlaşmasını engeller."
      },
      {
        "title": "2. Şantiyede Zahmetsiz Büküm & Hafıza Özelliği",
        "body": "Gelişmiş PE-RT Type II moleküler yapısı sayesinde kış koşullarında bile ısıtma gerektirmeden mantar başlıklı strafora kolayca döşenir, geri yaylanma kuvveti düşüktür."
      },
      {
        "title": "3. 50 Yıl Sürekli Isıtma Dayanımı",
        "body": "DIN 4726 ve ISO 22391 normlarında 70°C işletme sıcaklığında 50 yıl kesintisiz ömür testlerinden başarıyla geçmiştir."
      },
      {
        "title": "4. Şantiye Proje Teslimatı & Metraj",
        "body": "160m, 240m ve 600m orijinal fabrikasyon kangallar halinde Urla Depomuzda stokludur. Villa ve konut projeleriniz için aynı gün araçla teslim edilir."
      }
    ]
  },
  {
    "id": "formul-pe-rt-oksijen-bariyersiz-boru",
    "name": "Formül Standart PE-RT Yerden Isıtma Borusu (16×2.0 mm)",
    "badge": "PE-RT Boru Grubu",
    "tag": "PE-RT Oksijen Bariyerli",
    "category": "pe-rt-boru",
    "deptId": "formulUnderfloorPanel",
    "desc": "Zemin ısıtma ve radyatör mobil dağıtım hatlarında yüksek esneklik ve ekonomik maliyet sunan saf PE-RT Type II tesisat borusu.",
    "thumb": "assets/formul-official/formul-pe-rt-oksijen-bariyersiz-boru.svg",
    "sizes": [
      "16×2.0 mm (160 Metre Kangal)",
      "16×2.0 mm (240 Metre Kangal)"
    ],
    "coverage": "TS EN ISO 22391-2",
    "specs": {
      "standard": "TS EN ISO 22391-2",
      "packaging": "160 m / 240 m Kangal",
      "mixingRatio": "Mobil Kılıflı veya Strafor Üstü Montaj",
      "potLife": "70°C / 10 Bar (50 Yıl Ömür)",
      "logistics": "Balçova & Urla Depo Stok"
    },
    "meta": [
      "PE-RT Type II",
      "16×2.0 mm",
      "Mobil Radyatör Dağıtımı",
      "Ekonomik"
    ],
    "accordions": [
      {
        "title": "1. Mobil Sistem ve Sıhhi Tesisat İçin İdeal",
        "body": "Kılıflı boru içinde radyatör ve musluklara giden korumalı dağıtım hatlarında yüksek esneklik sağlar."
      },
      {
        "title": "2. Donma ve Patlama Direnci",
        "body": "Elastik polimer yapısı suyun donması durumunda esneyerek borunun patlamasını engeller."
      },
      {
        "title": "3. Standartlar",
        "body": "TSE ve ISO kalite belgelerine sahiptir."
      },
      {
        "title": "4. Sevkiyat",
        "body": "Urla ve Balçova stoktan teslim."
      }
    ]
  },
  {
    "id": "formul-pirinc-debili-kollektor",
    "name": "Formül Pirinç Gövdeli Debi Ayarlı Kollektör (1\" - 2-12 Ağızlı)",
    "badge": "Kollektör Grubu",
    "tag": "Pirinç Kollektör & Debi Ayarlı",
    "category": "kollektor",
    "deptId": "formulUnderfloorPanel",
    "desc": "Yerden ısıtma sistemlerinde her odanın devresine giden su miktarını üzerindeki göstergeli debimetrelerle hassas olarak dengeleyen masif pirinç debili kollektör seti.",
    "thumb": "assets/formul-official/formul-pirinc-debili-kollektor.svg",
    "sizes": [
      "2 Ağızlı Set",
      "3 Ağızlı Set",
      "4 Ağızlı Set",
      "5 Ağızlı Set",
      "6 Ağızlı Set",
      "7 Ağızlı Set",
      "8 Ağızlı Set",
      "9 Ağızlı Set",
      "10 Ağızlı Set",
      "11 Ağızlı Set",
      "12 Ağızlı Set"
    ],
    "coverage": "1\" Masif Pirinç / Cam Tüp Debimetreli",
    "specs": {
      "standard": "TS EN 1264 · DIN EN 12828",
      "packaging": "Gidiş-Dönüş Çiftli Set + Duvar Askı Kelepçeleri",
      "mixingRatio": "Hassas Debi Ayarı (0.5 - 5.0 L/dk)",
      "potLife": "10 Bar İşletme Basıncı",
      "logistics": "Balçova Showroom & Urla Ana Lojistik Depo Stok"
    },
    "meta": [
      "Cam Tüplü Debimetre",
      "Masif MS 58 Pirinç Gövde",
      "2 - 12 Ağızlı",
      "Oda Isı Dengeleme"
    ],
    "accordions": [
      {
        "title": "1. Şeffaf Göstergeli Cam Debimetreler ile Oda Dengelemesi",
        "body": "Farklı boru metrajlarına sahip odaların (örn. salon 100m, banyo 30m) eşit ısınması için her devre üzerindeki debimetreden litre/dakika cinsinden su akışı görsel olarak ayarlanır."
      },
      {
        "title": "2. Termostatik Aktüatör Montajına Hazır Dönüş Vanaları",
        "body": "Dönüş hattındaki manuel vanalar sökülerek doğrudan 230V veya 24V oda termostatı aktüatör motorları takılabilir."
      },
      {
        "title": "3. Ağır Hizmet Tipi Pirinç Gövde",
        "body": "Korozyona dirençli pirinç gövde, paslanmaz askı kelepçeleri ve ses emici kauçuk yataklar."
      },
      {
        "title": "4. Dağıtım",
        "body": "2 ağızlıdan 12 ağızlıya kadar tüm modeller Urla ve Balçova stoklarımızdadır."
      }
    ]
  },
  {
    "id": "formul-kollektor-dolabi-ankastre",
    "name": "Formül Gömme Ankastre Kollektör Dolabı (Sac Elektrostatik)",
    "badge": "Kollektör Dolabı Grubu",
    "tag": "Kollektör Dolabı & Aksesuar",
    "category": "kollektor-dolabi",
    "deptId": "formulUnderfloorPanel",
    "desc": "Yerden ısıtma ve kalorifer kollektörlerini duvar içerisine gizleyen, derinlik ve yükseklik ayarlı, beyaz elektrostatik toz boyalı saç kollektör dolabı.",
    "thumb": "assets/formul-official/formul-kollektor-dolabi-ankastre.svg",
    "sizes": [
      "40 cm (2-3 Ağız)",
      "60 cm (4-6 Ağız)",
      "80 cm (7-9 Ağız)",
      "100 cm (10-12 Ağız)"
    ],
    "coverage": "Galvaniz Sac / Elektrostatik Beyaz",
    "specs": {
      "standard": "Elektrostatik Toz Fırın Boya (RAL 9016)",
      "packaging": "Kilitli Kapak & Çerçeve Dahil Koli",
      "mixingRatio": "Duvar İçi Ankastre Gömme Montaj",
      "potLife": "Paslanmaz Galvaniz Sac Gövde",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "meta": [
      "Elektrostatik Boya",
      "Kilitli Kapak",
      "40 / 60 / 80 / 100 cm",
      "Teleskopik Ayar"
    ],
    "accordions": [
      {
        "title": "1. Estetik Duvar İçi Gizleme",
        "body": "Kollektör, vana ve elektrik bağlantılarını kilitli şık kapağın arkasında güvenle muhafaza eder."
      },
      {
        "title": "2. Teleskopik Derinlik ve Yükseklik Ayar Ayakları",
        "body": "Sıva derinliği ve şap kotu farklılıklarına göre dolap çerçevesi ve ayak yüksekliği ayarlanabilir."
      },
      {
        "title": "3. Galvaniz Pas Direnci",
        "body": "Galvanizli saç üzerine fırınlanmış elektrostatik boya sayesinde rutubetten paslanmaz."
      },
      {
        "title": "4. Sevkiyat",
        "body": "Tüm ebatlarda Balçova ve Urla stoklarımızdan temin edilir."
      }
    ]
  },
  {
    "id": "formul-yerden-isitma-straforu",
    "name": "Formül Mantar Başlıklı Yerden Isıtma İzolasyon Modülü (EPS 30 Dansite)",
    "badge": "İzolasyon Straforu Grubu",
    "tag": "İzolasyon Modülü",
    "category": "izolasyon-strafor",
    "deptId": "formulUnderfloorPanel",
    "desc": "Alt kata ısı kaçışını engelleyen ve 16 mm PE-RT boruların 5 ve 10 cm katlarında kilitli döşenmesini sağlayan, film kaplamalı yüksek dansiteli EPS zemin straforu.",
    "thumb": "assets/formul-official/formul-yerden-isitma-straforu.svg",
    "sizes": [
      "72×120 cm Plaka (0.864 m² / Plaka - EPS 30 Dansite)"
    ],
    "coverage": "EPS 30 Dansite / HIPS Film Kaplı",
    "specs": {
      "standard": "TS EN 13163 · DIN 4108",
      "packaging": "Paket: 10 Plaka (8.64 m²)",
      "mixingRatio": "Zemine Geçmeli Kilitli Döşeme",
      "potLife": "Yüksek Basma Dayanımı (Şap Yükü)",
      "logistics": "Urla Ana Lojistik Depo Stok"
    },
    "meta": [
      "EPS 30 Dansite",
      "HIPS Film Kaplama",
      "Mantar Başlıklı Kilit",
      "Yüksek Isı Yalıtımı"
    ],
    "accordions": [
      {
        "title": "1. 30 Dansite Yüksek Basma Dayanımı",
        "body": "Ağır şap ve mobilya yükleri altında ezilme yapmaz, zemin elastikiyetini korur ve çatlamaları engeller."
      },
      {
        "title": "2. HIPS Sert Film Kaplaması ile Su Yalıtımı",
        "body": "Üzerindeki polistiren sert film tabakası şap suyunun strafor gözeneklerine sızmasını engeller ve mantarların kırılmasını önler."
      },
      {
        "title": "3. Geçmeli Zıvana Sistemi",
        "body": "Plakalar birbirine kilitlenerek ısı köprülerini sıfırlar ve döşeme sırasında kaymaz."
      },
      {
        "title": "4. Şantiye Kamyon Sevkiyatı",
        "body": "Yüksek hacimli strafor paketleri Urla Ana Depomuzdan kapalı kasa araçlarımızla şantiyenize doğrudan indirilir."
      }
    ]
  },
  {
    "id": "formul-pe-rt-baglanti-rakoru",
    "name": "Formül PE-RT Boru Bağlantı & Eurokonus Rakoru (16×2.0 mm - 3/4\")",
    "badge": "Eurokonus Rakor Grubu",
    "tag": "Pirinç Kollektör & Debi Ayarlı",
    "category": "kollektor",
    "deptId": "formulUnderfloorPanel",
    "desc": "16×2.0 mm PE-RT boruyu debili pirinç kollektör ağızlarına sızdırmaz şekilde kilitleyen pirinç yüksüklü Eurokonus bağlantı rakoru.",
    "thumb": "assets/formul-official/formul-pe-rt-baglanti-rakoru.svg",
    "sizes": [
      "16×2.0 mm - 3/4\" Eurokonus"
    ],
    "coverage": "MS 58 Pirinç / O-Ringli Yüksük",
    "specs": {
      "standard": "DIN EN 16313 (Eurokonus Standardı)",
      "packaging": "Poşet / Kutu Paket",
      "mixingRatio": "Somun Sıkmalı Mekanik Kilit",
      "potLife": "10 Bar Basınç Dayanımı",
      "logistics": "Balçova & Urla Depo Stok"
    },
    "meta": [
      "3/4\" Eurokonus",
      "16×2.0 mm Uyumlu",
      "Pirinç Sıkma Yüksüğü",
      "DIN EN 16313"
    ],
    "accordions": [
      {
        "title": "1. Eurokonus Standardı ile Sıfır Sızıntı",
        "body": "Kollektör konik ağzına tam oturan pirinç yüksük ve çift EPDM o-ringli iç nipel sayesinde yüksek basınç ve sıcaklıkta borudan ayrılmaz."
      },
      {
        "title": "2. Kolay Montaj",
        "body": "Boru ucu kalibre edildikten sonra somun sıkılarak mekanik kilitlenme sağlanır, kaynak gerektirmez."
      },
      {
        "title": "3. MS 58 Pirinç Kalitesi",
        "body": "Korozyonsuz ve uzun ömürlü mekanik yapı."
      },
      {
        "title": "4. Tedarik",
        "body": "Balçova ve Urla stoktan anında teslim."
      }
    ]
  }
];

(function() {
  var currentActiveTab = "formulPprcPipePanel";
  var currentProduct = null;
  var selectedSize = null;

  // Canonical Sticky Subnav Engine & Header Pin Observer
  var subnav = document.getElementById("pvSubnav");
  var spacer = document.getElementById("pvSubnavSpacer");
  var header = document.getElementById("pvTransparentHeader") || document.querySelector("header");
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

  // Tab switching logic
  var subnavLinks = document.querySelectorAll("#pvSubnavLinks .pv-subnav-link");
  var tabPanels = document.querySelectorAll(".pv-catalog-body .pv-tab-panel");
  var deptTriggerLabel = document.getElementById("pvDeptTriggerLabel");

  function switchTab(targetId) {
    currentActiveTab = targetId;

    subnavLinks.forEach(function(btn) {
      var isTarget = btn.getAttribute("data-target") === targetId;
      btn.classList.toggle("active", isTarget);
      btn.setAttribute("aria-selected", isTarget ? "true" : "false");
    });

    tabPanels.forEach(function(panel) {
      var match = (panel.id === targetId);
      panel.classList.toggle("active", match);
      panel.style.display = match ? "" : "none";
    });

    var dept = DEPARTMENTS_DATA.find(function(d) { return d.id === targetId; });
    if (dept && deptTriggerLabel) {
      deptTriggerLabel.textContent = dept.short;
    }

    renderDeptDrawer(targetId);
    syncMobileFilterRail(targetId);

    // Scroll to catalog top smoothly respecting header offset
    if (subnav && window.pageYOffset > (initialSubnavTop || 600) - 80) {
      var hHeight = getHeaderHeight();
      var targetScroll = (initialSubnavTop || subnav.offsetTop) - hHeight - 12;
      window.scrollTo({
        top: Math.max(0, targetScroll),
        behavior: "smooth"
      });
    }
  }

  window.pvCatalogSwitchTab = switchTab;

  subnavLinks.forEach(function(btn) {
    btn.addEventListener("click", function() {
      var target = btn.getAttribute("data-target");
      if (target) switchTab(target);
    });
  });

  // Mobile Filter Rail Sync
  var mobileFilterRail = document.getElementById("pvFilterRail");
  function syncMobileFilterRail(deptId) {
    if (!mobileFilterRail) return;
    mobileFilterRail.innerHTML = "";
    var dept = DEPARTMENTS_DATA.find(function(d) { return d.id === deptId; });
    if (!dept) return;

    dept.pills.forEach(function(p) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "pv-filter-chip" + (p[2] ? " active" : "");
      btn.setAttribute("data-filter", p[1]);
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", p[2] ? "true" : "false");
      btn.textContent = p[0];

      btn.addEventListener("click", function(e) {
        e.preventDefault();
        mobileFilterRail.querySelectorAll(".pv-filter-chip").forEach(function(b) {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
        if (typeof btn.scrollIntoView === "function") {
          btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        }
        applyCategoryFilter(deptId, p[1]);

        // Also sync desktop pills
        var desktopPills = document.getElementById(dept.pillsId);
        if (desktopPills) {
          desktopPills.querySelectorAll(".pv-menu-pill").forEach(function(dp) {
            var isMatch = dp.getAttribute("data-filter") === p[1];
            dp.classList.toggle("active", isMatch);
            dp.setAttribute("aria-selected", isMatch ? "true" : "false");
          });
        }
      });
      mobileFilterRail.appendChild(btn);
    });
  }

  // Desktop Pill Filtering
  document.querySelectorAll(".pv-menu-pills .pv-menu-pill").forEach(function(pill) {
    pill.addEventListener("click", function() {
      var parent = pill.closest(".pv-menu-pills");
      if (!parent) return;
      parent.querySelectorAll(".pv-menu-pill").forEach(function(p) {
        p.classList.remove("active");
        p.setAttribute("aria-selected", "false");
      });
      pill.classList.add("active");
      pill.setAttribute("aria-selected", "true");

      var filterVal = pill.getAttribute("data-filter");
      var panel = pill.closest(".pv-tab-panel");
      if (panel) {
        applyCategoryFilter(panel.id, filterVal);
      }

      // Sync mobile rail
      if (mobileFilterRail) {
        mobileFilterRail.querySelectorAll(".pv-filter-chip").forEach(function(mp) {
          var isMatch = mp.getAttribute("data-filter") === filterVal;
          mp.classList.toggle("active", isMatch);
          mp.setAttribute("aria-selected", isMatch ? "true" : "false");
          if (isMatch && typeof mp.scrollIntoView === "function") {
            mp.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
          }
        });
      }
    });
  });

  function applyCategoryFilter(panelId, filterVal) {
    var panel = document.getElementById(panelId);
    if (!panel) return;
    var rows = panel.querySelectorAll(".pv-menu-row");
    rows.forEach(function(row) {
      var cat = row.getAttribute("data-category");
      if (filterVal === "all" || cat === filterVal) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  }

  // Mobile Dept Drawer Logic
  var deptTrigger = document.getElementById("pvDeptTrigger");
  var deptDrawerBackdrop = document.getElementById("pvDeptDrawerBackdrop");
  var deptDrawerCloseBtn = document.getElementById("pvDrawerCloseBtn");
  var deptList = document.getElementById("pvDeptList");

  function openDeptDrawer() {
    if (!deptDrawerBackdrop) return;
    deptDrawerBackdrop.classList.add("is-open");
    deptDrawerBackdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeDeptDrawer() {
    if (!deptDrawerBackdrop) return;
    deptDrawerBackdrop.classList.remove("is-open");
    deptDrawerBackdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (deptTrigger) deptTrigger.addEventListener("click", openDeptDrawer);
  if (deptDrawerCloseBtn) deptDrawerCloseBtn.addEventListener("click", closeDeptDrawer);
  if (deptDrawerBackdrop) {
    deptDrawerBackdrop.addEventListener("click", function(e) {
      if (e.target === deptDrawerBackdrop) closeDeptDrawer();
    });
  }

  function renderDeptDrawer(activeId) {
    if (!deptList) return;
    deptList.innerHTML = "";
    DEPARTMENTS_DATA.forEach(function(d) {
      var item = document.createElement("button");
      item.type = "button";
      var isSelected = (d.id === activeId);
      item.className = "pv-drawer-item" + (isSelected ? " is-selected" : "");
      item.setAttribute("role", "button");
      item.innerHTML = [
        '<div class="pv-drawer-item-left">',
        '  <div class="pv-drawer-icon-box" aria-hidden="true">' + (d.icon || '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>') + '</div>',
        '  <div class="pv-drawer-text-stack">',
        '    <span class="pv-drawer-item-title">' + d.short + '</span>',
        '    <span class="pv-drawer-item-sub">' + d.sub + '</span>',
        '  </div>',
        '</div>',
        '<div class="pv-drawer-item-right" aria-hidden="true">',
        '  <svg class="pv-drawer-item-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',
        '</div>'
      ].join("");

      item.addEventListener("click", function() {
        closeDeptDrawer();
        switchTab(d.id);
      });
      deptList.appendChild(item);
    });
  }

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
    var p = FORMUL_PRODUCTS_DATA.find(function(item) { return item.id === productId; });
    if (!p) return;
    currentProduct = p;

    if (modalProductEyebrow) modalProductEyebrow.textContent = "PERVAN · " + (p.badge || "FORMÜL PLASTİK YETKİLİ BAYİ").toUpperCase();
    if (modalProductTitle) modalProductTitle.textContent = p.name;
    if (modalProductImg) {
      modalProductImg.src = p.thumb;
      modalProductImg.alt = p.name;
    }

    // Segmented Size / Diameter Track
    if (modalSizeTrack) {
      modalSizeTrack.innerHTML = "";
      if (p.sizes && p.sizes.length) {
        selectedSize = p.sizes[0];
        p.sizes.forEach(function(sz, idx) {
          var btn = document.createElement("button");
          btn.type = "button";
          btn.className = "pv-segmented-btn" + (idx === 0 ? " is-selected" : "");
          btn.setAttribute("role", "radio");
          btn.setAttribute("aria-checked", idx === 0 ? "true" : "false");
          btn.textContent = sz;
          btn.addEventListener("click", function() {
            modalSizeTrack.querySelectorAll(".pv-segmented-btn").forEach(function(b) {
              b.classList.remove("is-selected");
              b.setAttribute("aria-checked", "false");
            });
            btn.classList.add("is-selected");
            btn.setAttribute("aria-checked", "true");
            selectedSize = sz;
            updateWhatsAppUrl();
          });
          modalSizeTrack.appendChild(btn);
        });
      } else {
        selectedSize = "Standart";
      }
    }

    // Gauges & Specs Table
    if (modalSpecStandard) modalSpecStandard.textContent = p.specs.standard.split("·")[0].trim() || "DIN 8077/8078";
    if (modalSpecConsumption) modalSpecConsumption.textContent = p.coverage || "PN25 / SDR 6";
    if (modalSpecPackaging) modalSpecPackaging.textContent = p.specs.potLife.split("·")[0].trim() || "50 Yıl Ömür";
    if (modalSpecStandardRow) modalSpecStandardRow.textContent = p.specs.standard || "-";
    if (modalSpecPackagingRow) modalSpecPackagingRow.textContent = p.specs.packaging || "-";
    if (modalSpecMixing) modalSpecMixing.textContent = p.specs.mixingRatio || "Füzyon: 260°C ± 5°C";
    if (modalSpecPotLife) modalSpecPotLife.textContent = p.specs.potLife || "-";
    if (modalSpecLogistics) modalSpecLogistics.textContent = p.specs.logistics || "Balçova Showroom & Urla Ana Depo Stok";

    // Accordions
    if (modalAccordions) {
      modalAccordions.innerHTML = "";
      if (p.accordions && p.accordions.length) {
        p.accordions.forEach(function(acc, idx) {
          var item = document.createElement("div");
          item.className = "pv-acc-item" + (idx === 0 ? " active" : "");
          item.innerHTML =
            '<button type="button" class="pv-acc-header" aria-expanded="' + (idx === 0 ? "true" : "false") + '">' +
              '<span class="pv-acc-title">' + acc.title + '</span>' +
              '<span class="pv-acc-icon">+</span>' +
            '</button>' +
            '<div class="pv-acc-body">' + acc.body + '</div>';

          var btn = item.querySelector(".pv-acc-header");
          btn.addEventListener("click", function() {
            var isAct = item.classList.contains("active");
            item.classList.toggle("active");
            btn.setAttribute("aria-expanded", isAct ? "false" : "true");
          });

          modalAccordions.appendChild(item);
        });
      }
    }

    updateWhatsAppUrl();

    if (modalBackdrop) {
      modalBackdrop.classList.add("is-open");
      modalBackdrop.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      resetSheetStyles();
    }
  }

  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove("is-open");
    modalBackdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    resetSheetStyles();
  }

  function updateWhatsAppUrl() {
    if (!currentProduct || !modalWABtn) return;
    var text = "Merhaba, Pervan Formül Plastik Yetkili Bayi çıkışlı " + currentProduct.name;
    if (selectedSize) {
      text += " (" + selectedSize + ")";
    }
    text += " için güncel bayi liste fiyatı, şantiye iskonto oranı ve stok durumu hakkında bilgi almak istiyorum.";
    modalWABtn.href = "https://wa.me/905323844497?text=" + encodeURIComponent(text);
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", function(e) {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  // Row click listeners
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
      modalBackdrop.style.opacity = "";
    }
  }

  if (modalCard) {
    modalCard.addEventListener("touchstart", onDragStart, { passive: true });
    modalCard.addEventListener("touchmove", onDragMove, { passive: false });
    modalCard.addEventListener("touchend", onDragEnd, { passive: true });
  }

  // 3. SPOTLIGHT COMMAND PALETTE ENGINE (⌘K / / Hotkeys)
  var spotlightBackdrop = document.getElementById("pvSpotlightBackdrop");
  var spotlightTrigger = document.getElementById("pvSpotlightTrigger");
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
    return d ? d.short : "Formül Plastik";
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
  }

  function renderSpotlightInitial() {
    if (!spotlightResults) return;
    spotlightResults.innerHTML = "";
    spotlightSelectedIdx = -1;

    var featured = FORMUL_PRODUCTS_DATA.slice(0, 8);
    var heading = document.createElement("div");
    heading.className = "pv-spotlight-group-title";
    heading.textContent = "Öne Çıkan Formül Plastik Ürünleri";
    spotlightResults.appendChild(heading);

    featured.forEach(function(item) {
      spotlightResults.appendChild(createSpotlightItemEl(item));
    });

    if (spotlightCount) {
      spotlightCount.textContent = FORMUL_PRODUCTS_DATA.length + " Ürün Kataloğu";
    }
    attachSpotlightItemEvents();
  }

  function createSpotlightItemEl(item) {
    var div = document.createElement("div");
    div.className = "pv-spotlight-item";
    div.setAttribute("data-product-id", item.id);
    div.innerHTML = [
      '<div class="pv-spotlight-item-main">',
      '  <div class="pv-spotlight-item-badge">' + item.badge + '</div>',
      '  <div class="pv-spotlight-item-title">' + item.name + '</div>',
      '  <div class="pv-spotlight-item-desc">' + item.desc + '</div>',
      '</div>',
      '<div class="pv-spotlight-item-meta">',
      '  <span class="pv-spotlight-tag">' + getProductDomain(item.deptId) + '</span>',
      '  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
      '</div>'
    ].join("");
    return div;
  }

  function performSpotlightSearch(query) {
    if (!spotlightResults) return;
    var normQ = normalizeTr(query);
    spotlightResults.innerHTML = "";
    spotlightSelectedIdx = -1;

    if (!normQ) {
      renderSpotlightInitial();
      return;
    }

    var tokens = normQ.split(" ").filter(Boolean);
    var matches = FORMUL_PRODUCTS_DATA.filter(function(item) {
      var target = normalizeTr(item.name + " " + item.desc + " " + item.badge + " " + item.tag + " " + (item.meta ? item.meta.join(" ") : ""));
      return tokens.every(function(t) { return target.indexOf(t) !== -1; });
    });

    if (spotlightCount) {
      spotlightCount.textContent = matches.length + " Sonuç Bulundu";
    }

    if (!matches.length) {
      var empty = document.createElement("div");
      empty.className = "pv-spotlight-empty";
      empty.innerHTML = [
        '<div class="pv-spotlight-empty-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>',
        '<p class="pv-spotlight-empty-title">"' + query + '" için ürün bulunamadı</p>',
        '<p class="pv-spotlight-empty-sub">Farklı bir arama terimi deneyin veya WhatsApp hattımızdan direkt bilgi alın.</p>'
      ].join("");
      spotlightResults.appendChild(empty);
      return;
    }

    matches.forEach(function(item) {
      spotlightResults.appendChild(createSpotlightItemEl(item));
    });
    attachSpotlightItemEvents();
  }

  function highlightSpotlightItem(items, idx) {
    items.forEach(function(it) { it.classList.remove("selected"); });
    if (idx >= 0 && idx < items.length) {
      items[idx].classList.add("selected");
      items[idx].scrollIntoView({ block: "nearest" });
      spotlightSelectedIdx = idx;
    } else {
      spotlightSelectedIdx = -1;
    }
  }

  function attachSpotlightItemEvents() {
    if (!spotlightResults) return;
    var items = spotlightResults.querySelectorAll(".pv-spotlight-item");
    items.forEach(function(item, idx) {
      item.addEventListener("mouseenter", function() {
        highlightSpotlightItem(items, idx);
      });
      item.addEventListener("click", function() {
        var pid = item.getAttribute("data-product-id");
        closeSpotlight();
        var p = FORMUL_PRODUCTS_DATA.find(function(it) { return it.id === pid; });
        if (p && p.deptId && p.deptId !== currentActiveTab) {
          switchTab(p.deptId);
        }
        openModal(pid);
      });
    });
  }

  if (spotlightTrigger) spotlightTrigger.addEventListener("click", openSpotlight);
  if (spotlightCloseBtn) spotlightCloseBtn.addEventListener("click", closeSpotlight);
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
    var isTyping = e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.isContentEditable);
    if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
      e.preventDefault();
      if (spotlightBackdrop && spotlightBackdrop.classList.contains("open")) {
        closeSpotlight();
      } else {
        openSpotlight();
      }
    } else if (e.key === "/" && !isTyping && !e.metaKey && !e.ctrlKey) {
      e.preventDefault();
      openSpotlight();
    } else if (e.key === "Escape") {
      if (spotlightBackdrop && spotlightBackdrop.classList.contains("open")) {
        closeSpotlight();
      } else if (modalBackdrop && modalBackdrop.classList.contains("is-open")) {
        closeModal();
      } else if (deptDrawerBackdrop && deptDrawerBackdrop.classList.contains("is-open")) {
        closeDeptDrawer();
      }
    }
  });

  // Deep linking via URL hash: #urun-[productId]
  window.addEventListener("load", function() {
    var hash = window.location.hash;
    if (hash && hash.indexOf("#urun-") === 0) {
      var targetId = hash.replace("#urun-", "");
      var p = FORMUL_PRODUCTS_DATA.find(function(it) { return it.id === targetId; });
      if (p) {
        if (p.deptId && p.deptId !== currentActiveTab) {
          switchTab(p.deptId);
        }
        openModal(targetId);
      }
    }
  });

  // INITIAL SETUP
  renderDeptDrawer("formulPprcPipePanel");
  syncMobileFilterRail("formulPprcPipePanel");
})();
