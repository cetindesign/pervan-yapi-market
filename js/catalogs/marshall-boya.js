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

    var activeHex = slides[index].getAttribute("data-code") || '#1E293B';

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
})();

/* 2. CANONICAL PERVAN HUB CATALOG ENGINE */
(function() {
  var MARSHALL_PRODUCTS_DATA = [
  {
    "id": "akrikor-anti-alkali-örtücü-astar",
    "name": "Marshall Akrikor Anti Alkali+Örtücü Astar",
    "badge": "Yüzey Astarı",
    "tag": "Dış Cephe Astarı",
    "deptId": "marshallPrimersPanel",
    "category": "astar-dis",
    "thumb": "assets/marshall-official/akrikor-anti-alkali-örtücü-astar.png",
    "desc": "Tuz kusması ve alkaliye karşı bariyer oluşturan, dış cephede son kat boyanın örtücülüğünü artıran astar.",
    "meta": [
      "Yüzey Astarı",
      "Ambalaj: 2,5 L / 12,5 L",
      "Resmi TDS Belgeli"
    ],
    "coverage": "15 m2/L",
    "sizes": [
      "2,5 L",
      "12,5 L"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrexp/documents/82/13/7f/e2/akrikor_anti_alkalrtc_astartds.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "2,5 L, 12,5 L",
      "consumption": "15 m2/L",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Tam kuruma süresi min 12 saattir. Son kat boya uygulaması için 12 saat beklenmesi gerekmektedir.",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "Tuz kusması ve alkaliye karşı bariyer oluşturan, dış cephede son kat boyanın örtücülüğünü artıran astar."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: 15 m2/L • Kat Sayısı: 1 kat uygulama önerilir. • Kuruma: Tam kuruma süresi min 12 saattir. Son kat boya uygulaması için 12 saat beklenmesi gerekmektedir."
      }
    ]
  },
  {
    "id": "akrikor-saf-akrilik",
    "name": "Marshall Akrikor Saf Akrilik",
    "badge": "Akrikor Dış Cephe",
    "tag": "Saf Akrilik Dış Cephe",
    "deptId": "marshallExteriorPanel",
    "category": "akrikor-akrilik",
    "thumb": "assets/marshall-official/akrikor-saf-akrilik.png",
    "desc": "%100 saf akrilik bağlayıcılı, sahil iklimi ve tuz serpintisine karşı maksimum direnç sağlayan dış cephe boyası.",
    "meta": [
      "Akrikor Dış Cephe",
      "Ambalaj: 2,5 L / 15 L",
      "Resmi TDS Belgeli"
    ],
    "coverage": "15 m2/L",
    "sizes": [
      "2,5 L",
      "15 L",
      "15 LT",
      "25 L"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrexp/documents/c0/55/33/6b/akrikor_saf_akrilik_tds.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "2,5 L, 15 L, 15 LT, 25 L",
      "consumption": "15 m2/L",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Katlar arası bekleme süresi min 4-8 saat arasıdır. Tam kuruma süresi ise min 24 saattir.",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "%100 saf akrilik bağlayıcılı, sahil iklimi ve tuz serpintisine karşı maksimum direnç sağlayan dış cephe boyası."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: 15 m2/L • Kat Sayısı: 2 kat uygulama önerilir. • Kuruma: Katlar arası bekleme süresi min 4-8 saat arasıdır. Tam kuruma süresi ise min 24 saattir."
      }
    ]
  },
  {
    "id": "akrikor-silikonlu-akrilik-grenli",
    "name": "Marshall Akrikor Silikonlu+Akrilik Grenli",
    "badge": "Akrikor Dış Cephe",
    "tag": "Akrikor Grenli",
    "deptId": "marshallExteriorPanel",
    "category": "akrikor-grenli",
    "thumb": "assets/marshall-official/akrikor-silikonlu-akrilik-grenli.png",
    "desc": "Güneş ışınlarına ve yağmura dayanıklı, yüzey hatalarını örten dekoratif grenli dış cephe kaplaması.",
    "meta": [
      "Akrikor Dış Cephe",
      "Ambalaj: 20 KG",
      "Resmi TDS Belgeli"
    ],
    "coverage": "1,5 m2/L",
    "sizes": [
      "20 KG"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrexp/documents/59/7c/24/6e/akrikor_silikonluakrilik_grenli_tds.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "20 KG",
      "consumption": "1,5 m2/L",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Katlar arası kuruma süresi min 4 ile 8 saat arasındadır. Tam kuruma süresi ise 24 saattir.",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "Güneş ışınlarına ve yağmura dayanıklı, yüzey hatalarını örten dekoratif grenli dış cephe kaplaması."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: 1,5 m2/L • Kat Sayısı: 1 kat uygulama önerilir. • Kuruma: Katlar arası kuruma süresi min 4 ile 8 saat arasındadır. Tam kuruma süresi ise 24 saattir."
      }
    ]
  },
  {
    "id": "akrikor-silikonlu-akrilik",
    "name": "Marshall Akrikor Silikonlu+Akrilik",
    "badge": "Akrikor Dış Cephe",
    "tag": "Saf Akrilik Dış Cephe",
    "deptId": "marshallExteriorPanel",
    "category": "akrikor-akrilik",
    "thumb": "assets/marshall-official/akrikor-silikonlu-akrilik.png",
    "desc": "Yüksek su iticilik ve buhar geçirgenliği sağlayan, solmaya dirençli silikonlu akrilik dış cephe boyası.",
    "meta": [
      "Akrikor Dış Cephe",
      "Ambalaj: 2,5 L / 7,5 L",
      "Resmi TDS Belgeli"
    ],
    "coverage": "15 m2/L",
    "sizes": [
      "2,5 L",
      "7,5 L",
      "15 L",
      "25 L"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrexp/documents/1c/c7/11/8a/akrikor_silikonluakrilik_tds.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "2,5 L, 7,5 L, 15 L, 25 L",
      "consumption": "15 m2/L",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Katlar arası bekleme süresi 4-8 saatir. Tam kuruma süresi ise 24 saattir.",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "Yüksek su iticilik ve buhar geçirgenliği sağlayan, solmaya dirençli silikonlu akrilik dış cephe boyası."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: 15 m2/L • Kat Sayısı: 2 kat uygulama önerilir. • Kuruma: Katlar arası bekleme süresi 4-8 saatir. Tam kuruma süresi ise 24 saattir."
      }
    ]
  },
  {
    "id": "akrikor-silikonlu-astar",
    "name": "Marshall Akrikor Silikonlu Astar",
    "badge": "Yüzey Astarı",
    "tag": "Dış Cephe Astarı",
    "deptId": "marshallPrimersPanel",
    "category": "astar-dis",
    "thumb": "assets/marshall-official/akrikor-silikonlu-astar.png",
    "desc": "Dış cephe yüzeylerinde su emiciliği dengeleyen, boya sarfiyatını azaltan silikonlu bağlayıcı astar.",
    "meta": [
      "Yüzey Astarı",
      "Ambalaj: 4 L / 12,5 L",
      "Resmi TDS Belgeli"
    ],
    "coverage": "15m2/L",
    "sizes": [
      "4 L",
      "12,5 L"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrexp/documents/4d/3d/e7/23/akrikor_silikonlu_astar_tds.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "4 L, 12,5 L",
      "consumption": "15m2/L",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "min 12 saat. Üzerine son kat boya uygulaması için 12 saat beklenmesi önerilmektedir.",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "Dış cephe yüzeylerinde su emiciliği dengeleyen, boya sarfiyatını azaltan silikonlu bağlayıcı astar."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: 15m2/L • Kat Sayısı: 1 kat uygulama önerilir. • Kuruma: min 12 saat. Üzerine son kat boya uygulaması için 12 saat beklenmesi önerilmektedir."
      }
    ]
  },
  {
    "id": "akrikor-silikonlu-örtücü-astar",
    "name": "Marshall Akrikor Silikonlu+Örtücü Astar",
    "badge": "Yüzey Astarı",
    "tag": "Dış Cephe Astarı",
    "deptId": "marshallPrimersPanel",
    "category": "astar-dis",
    "thumb": "assets/marshall-official/akrikor-silikonlu-örtücü-astar.png",
    "desc": "Eski boyalı veya renk değişimli dış cephelerde mükemmel zemin oluşturan pigmentli silikonlu astar.",
    "meta": [
      "Yüzey Astarı",
      "Ambalaj: 2,5 L / 10 KG",
      "Resmi TDS Belgeli"
    ],
    "coverage": "9,25 m²/kg",
    "sizes": [
      "2,5 L",
      "10 KG",
      "20 KG"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrexp/documents/8f/2b/5c/16/akrikor_silikonlurtc_astar_tds.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "2,5 L, 10 KG, 20 KG",
      "consumption": "9,25 m²/kg",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Tam kuruma süresi min. 12 saattir. Son kat boya uygulaması için 12 saat beklenmesi önerilir.",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "Eski boyalı veya renk değişimli dış cephelerde mükemmel zemin oluşturan pigmentli silikonlu astar."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: 9,25 m²/kg • Kat Sayısı: 1 kat uygulama önerilir. • Kuruma: Tam kuruma süresi min. 12 saattir. Son kat boya uygulaması için 12 saat beklenmesi önerilir."
      }
    ]
  },
  {
    "id": "akrikor-su-kalkanı-elyaflı",
    "name": "Marshall Akrikor Su Kalkanı Elyaflı",
    "badge": "Akrikor Dış Cephe",
    "tag": "Su Kalkanı Elyaflı",
    "deptId": "marshallExteriorPanel",
    "category": "akrikor-kalkan",
    "thumb": "assets/marshall-official/akrikor-su-kalkanı-elyaflı.png",
    "desc": "Mikro elyaf takviyeli esnek yapısıyla kılcal çatlakları köprüleyen, su geçirimsiz elastik dış cephe kalkanı.",
    "meta": [
      "Akrikor Dış Cephe",
      "Ambalaj: 3 KG / 10 KG",
      "Resmi TDS Belgeli"
    ],
    "coverage": "Yüzey emiciliğine göre değişken (13-16 m²/L)",
    "sizes": [
      "3 KG",
      "10 KG",
      "20 KG"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrmar/documents/3f/c7/a6/49/akrikor_su_kalkanielyafli_tds_turkce.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "3 KG, 10 KG, 20 KG",
      "consumption": "Yüzey emiciliğine göre değişken (13-16 m²/L)",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Katlar arası bekleme süres Min. 24 saat",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "Mikro elyaf takviyeli esnek yapısıyla kılcal çatlakları köprüleyen, su geçirimsiz elastik dış cephe kalkanı."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: Yüzey emiciliğine göre değişken (13-16 m²/L) • Kat Sayısı: 2 kat uygulama önerilir. • Kuruma: Katlar arası bekleme süres Min. 24 saat"
      }
    ]
  },
  {
    "id": "akrikor-su-kalkanı",
    "name": "Marshall Akrikor Su Kalkanı",
    "badge": "Akrikor Dış Cephe",
    "tag": "Su Kalkanı Elyaflı",
    "deptId": "marshallExteriorPanel",
    "category": "akrikor-kalkan",
    "thumb": "assets/marshall-official/akrikor-su-kalkanı.jpg",
    "desc": "Binaları şiddetli yağmur, nem ve su sızıntılarına karşı tam koruma altına alan elastik su kalkanı boyası.",
    "meta": [
      "Akrikor Dış Cephe",
      "Ambalaj: 3 KG / 10 KG",
      "Resmi TDS Belgeli"
    ],
    "coverage": "-",
    "sizes": [
      "3 KG",
      "10 KG",
      "20 KG"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrmar/documents/36/89/0e/c9/akrikor_su_kalkani_tds_turkce.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "3 KG, 10 KG, 20 KG",
      "consumption": "-",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Katlar arası bekleme süres Min. 24 saat",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "Binaları şiddetli yağmur, nem ve su sızıntılarına karşı tam koruma altına alan elastik su kalkanı boyası."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: - • Kat Sayısı: 2 kat uygulama önerilir. • Kuruma: Katlar arası bekleme süres Min. 24 saat"
      }
    ]
  },
  {
    "id": "antibakteriyel-hijyen",
    "name": "Marshall Antibakteriyel Hijyen",
    "badge": "İç Cephe Boyası",
    "tag": "Silikonlu İç Cephe",
    "deptId": "marshallInteriorPanel",
    "category": "silikonlu",
    "thumb": "assets/marshall-official/antibakteriyel-hijyen.png",
    "desc": "Gümüş iyon teknolojisiyle küf ve bakteri oluşumunu engelleyen, tam silinebilir hijyenik iç cephe boyası.",
    "meta": [
      "İç Cephe Boyası",
      "Ambalaj: 2,5 L / 15 L",
      "Resmi TDS Belgeli"
    ],
    "coverage": "14 m2/L",
    "sizes": [
      "2,5 L",
      "15 L"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrexp/documents/9d/b7/f0/73/antibakteriyel_tds.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "2,5 L, 15 L",
      "consumption": "14 m2/L",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Katlar arası bekleme süresi min 2 saattir.Tam kuruma süresi min.24 saattir. Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir.",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "Gümüş iyon teknolojisiyle küf ve bakteri oluşumunu engelleyen, tam silinebilir hijyenik iç cephe boyası."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: 14 m2/L • Kat Sayısı: 2 kat uygulama önerilir. • Kuruma: Katlar arası bekleme süresi min 2 saattir.Tam kuruma süresi min.24 saattir. Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir."
      }
    ]
  },
  {
    "id": "cuprinol-ultra-vernikli-ahşap-bakım",
    "name": "Marshall Cuprinol Ultra Vernikli Ahşap Bakım",
    "badge": "Ahşap & Metal Zırhı",
    "tag": "Ahşap Koruma & Vernik",
    "deptId": "marshallWoodMetalPanel",
    "category": "ahsap-cila",
    "thumb": "assets/marshall-official/cuprinol-ultra-vernikli-ahşap-bakım.png",
    "desc": "Dış mekan ahşap doğrama, pergola ve cephe kaplamalarında UV filtreli uzun ömürlü vernikli koruyucu.",
    "meta": [
      "Ahşap & Metal Zırhı",
      "Ambalaj: 0,75L",
      "Resmi TDS Belgeli"
    ],
    "coverage": "Tek katta 12-15 m2/L",
    "sizes": [
      "0,75L"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrmar/documents/18/8c/c0/f0/tds41woodart_ultra_vernikli_ahsap_bakim_urunu.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "0,75L",
      "consumption": "Tek katta 12-15 m2/L",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Tam kuruma 48 saat",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "Dış mekan ahşap doğrama, pergola ve cephe kaplamalarında UV filtreli uzun ömürlü vernikli koruyucu."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: Tek katta 12-15 m2/L • Kat Sayısı: 3 kat uygulama önerilir. • Kuruma: Tam kuruma 48 saat"
      }
    ]
  },
  {
    "id": "cw-krom-efektli-sprey",
    "name": "Marshall CW Krom Efektli Sprey",
    "badge": "Ahşap & Metal Zırhı",
    "tag": "Sentetik Parlak Boya",
    "deptId": "marshallWoodMetalPanel",
    "category": "sentetik-metal",
    "thumb": "assets/marshall-official/cw-krom-efektli-sprey.png",
    "desc": "Metal, ahşap ve sert plastik yüzeylerde parlak ayna/krom metalik efekt oluşturan hızlı kuruyan sprey boya.",
    "meta": [
      "Ahşap & Metal Zırhı",
      "Ambalaj: 400 ML",
      "Fabrika Stok Teslim"
    ],
    "coverage": "Yüzey emiciliğine göre değişken (13-16 m²/L)",
    "sizes": [
      "400 ML"
    ],
    "tdsUrl": "",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "400 ML",
      "consumption": "Yüzey emiciliğine göre değişken (13-16 m²/L)",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Katlar arasında 4-5 dk. bekleyiniz. Yüzey kuruması 30 dk., nihai kuruma ise yaklaşık 16 saatte gerçeklesir.",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "Metal, ahşap ve sert plastik yüzeylerde parlak ayna/krom metalik efekt oluşturan hızlı kuruyan sprey boya."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: Yüzey emiciliğine göre değişken (13-16 m²/L) • Kat Sayısı: 2 Kat kat uygulama önerilir. • Kuruma: Katlar arasında 4-5 dk. bekleyiniz. Yüzey kuruması 30 dk., nihai kuruma ise yaklaşık 16 saatte gerçeklesir."
      }
    ]
  },
  {
    "id": "cw-vernik-sprey-parlak",
    "name": "Marshall CW Vernik Sprey (Parlak)",
    "badge": "Ahşap & Metal Zırhı",
    "tag": "Ahşap Koruma & Vernik",
    "deptId": "marshallWoodMetalPanel",
    "category": "ahsap-cila",
    "thumb": "assets/marshall-official/cw-vernik-sprey-parlak.png",
    "desc": "Ahşap, metal ve hobi yüzeylerinde sararmayan, çizilmelere dayanıklı parlak koruyucu akrilik vernik sprey.",
    "meta": [
      "Ahşap & Metal Zırhı",
      "Ambalaj: 400 ML",
      "Fabrika Stok Teslim"
    ],
    "coverage": "Yüzey emiciliğine göre değişken (13-16 m²/L)",
    "sizes": [
      "400 ML"
    ],
    "tdsUrl": "",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "400 ML",
      "consumption": "Yüzey emiciliğine göre değişken (13-16 m²/L)",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Katlar arası bekleme süresi 3 ile 5 dakikadır. 30 dakikadan fazla bekleme yapılmamalıdır. Tam kuruma 24 saattir.",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "Ahşap, metal ve hobi yüzeylerinde sararmayan, çizilmelere dayanıklı parlak koruyucu akrilik vernik sprey."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: Yüzey emiciliğine göre değişken (13-16 m²/L) • Kat Sayısı: 2 Kat kat uygulama önerilir. • Kuruma: Katlar arası bekleme süresi 3 ile 5 dakikadır. 30 dakikadan fazla bekleme yapılmamalıdır. Tam kuruma 24 saattir."
      }
    ]
  },
  {
    "id": "enamel-antipas",
    "name": "Marshall Enamel Antipas",
    "badge": "Ahşap & Metal Zırhı",
    "tag": "Sentetik Parlak Boya",
    "deptId": "marshallWoodMetalPanel",
    "category": "sentetik-metal",
    "thumb": "assets/marshall-official/enamel-antipas.png",
    "desc": "Demir ve çelik yüzeylerde pas oluşumunu önleyen, mükemmel yapışma sağlayan sentetik antipas astar.",
    "meta": [
      "Ahşap & Metal Zırhı",
      "Ambalaj: 750 ML / 2,5 L",
      "Resmi TDS Belgeli"
    ],
    "coverage": "24 m2/L (28±5 mikron kuru film kalınlığında)",
    "sizes": [
      "750 ML",
      "2,5 L",
      "15 L"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrexp/documents/63/7f/9f/2d/tds_31enamel_antipas.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "750 ML, 2,5 L, 15 L",
      "consumption": "24 m2/L (28±5 mikron kuru film kalınlığında)",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Tam kuruma 48 saat",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "Demir ve çelik yüzeylerde pas oluşumunu önleyen, mükemmel yapışma sağlayan sentetik antipas astar."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: 24 m2/L (28±5 mikron kuru film kalınlığında) • Kat Sayısı: 1 kat uygulama önerilir. • Kuruma: Tam kuruma 48 saat"
      }
    ]
  },
  {
    "id": "enamel-sentetik-astar",
    "name": "Marshall Enamel Sentetik Astar",
    "badge": "Yüzey Astarı",
    "tag": "Dış Cephe Astarı",
    "deptId": "marshallPrimersPanel",
    "category": "astar-dis",
    "thumb": "assets/marshall-official/enamel-sentetik-astar.png",
    "desc": "Sentetik son kat boyalar altında homojen, düzgün ve yüksek örtücülükte zemin hazırlayan astar.",
    "meta": [
      "Yüzey Astarı",
      "Ambalaj: 750 ML / 2,5 L",
      "Resmi TDS Belgeli"
    ],
    "coverage": "24 m2/L",
    "sizes": [
      "750 ML",
      "2,5 L",
      "20 KG"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrexp/documents/92/42/f1/39/tds_30enamel_sentetik_astar.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "750 ML, 2,5 L, 20 KG",
      "consumption": "24 m2/L",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Tam kuruma 48 saat",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "Sentetik son kat boyalar altında homojen, düzgün ve yüksek örtücülükte zemin hazırlayan astar."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: 24 m2/L • Kat Sayısı: 1 kat uygulama önerilir. • Kuruma: Tam kuruma 48 saat"
      }
    ]
  },
  {
    "id": "fit-extra-tavan-boyası",
    "name": "Marshall Fit  Extra Tavan Boyası",
    "badge": "Tavan Grubu",
    "tag": "Fit Extra Tavan",
    "deptId": "marshallCeilingPanel",
    "category": "tavan-fit",
    "thumb": "assets/marshall-official/fit-extra-tavan-boyası.jpg",
    "desc": "Ekstra beyazlık ve yüksek örtücülük sağlayan, damlatma yapmayan nefes alabilen tavan boyası.",
    "meta": [
      "Tavan Grubu",
      "Ambalaj: 3.5 KG / 17.5 KG",
      "Resmi TDS Belgeli"
    ],
    "coverage": "14 m2/L",
    "sizes": [
      "3.5 KG",
      "17.5 KG"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrexp/documents/44/07/5f/3a/0007_fit_extra_tavan_boyasi_tds_revizyon.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "3.5 KG, 17.5 KG",
      "consumption": "14 m2/L",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Katlar arası bekleme süresi min 2 saattir.Tam kuruma süresi min.24 saattir. Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir.",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "Ekstra beyazlık ve yüksek örtücülük sağlayan, damlatma yapmayan nefes alabilen tavan boyası."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: 14 m2/L • Kat Sayısı: 2 kat uygulama önerilir. • Kuruma: Katlar arası bekleme süresi min 2 saattir.Tam kuruma süresi min.24 saattir. Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir."
      }
    ]
  },
  {
    "id": "fit-parlak",
    "name": "Marshall Fit Parlak",
    "badge": "Ahşap & Metal Zırhı",
    "tag": "Ahşap Koruma & Vernik",
    "deptId": "marshallWoodMetalPanel",
    "category": "ahsap-cila",
    "thumb": "assets/marshall-official/fit-parlak.jpg",
    "desc": "İç ve dış mekanda ahşap, demir ve metal yüzeylere uygulanan, parlaklığını uzun süre koruyan sentetik boya.",
    "meta": [
      "Ahşap & Metal Zırhı",
      "Ambalaj: 2,5 / 15L",
      "Resmi TDS Belgeli"
    ],
    "coverage": "20 m2/L",
    "sizes": [
      "2,5",
      "15L"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrmar/documents/db/0b/09/ca/fi_tr_tr_fit_parlak.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "2,5, 15L",
      "consumption": "20 m2/L",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Katlar arası bekleme süresi 24 saattir. Tam kuruma süresi 48 saattir.",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "İç ve dış mekanda ahşap, demir ve metal yüzeylere uygulanan, parlaklığını uzun süre koruyan sentetik boya."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: 20 m2/L • Kat Sayısı: 2 kat uygulama önerilir. • Kuruma: Katlar arası bekleme süresi 24 saattir. Tam kuruma süresi 48 saattir."
      }
    ]
  },
  {
    "id": "fit-plastik",
    "name": "Marshall Fit Plastik",
    "badge": "İç Cephe Boyası",
    "tag": "Fit İç Cephe",
    "deptId": "marshallInteriorPanel",
    "category": "fit-ic",
    "thumb": "assets/marshall-official/fit-plastik.jpg",
    "desc": "Ekonomik, mat bitişli, yüksek örtücülüğe sahip ve nefes alan mineral esaslı iç mekan duvar boyası.",
    "meta": [
      "İç Cephe Boyası",
      "Ambalaj: 3.5 KG / 10 KG",
      "Resmi TDS Belgeli"
    ],
    "coverage": "14 m2/L",
    "sizes": [
      "3.5 KG",
      "10 KG",
      "20 KG"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrexp/documents/0b/a4/9c/c3/ft_plastk_mat_tds.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "3.5 KG, 10 KG, 20 KG",
      "consumption": "14 m2/L",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Katlar arası bekleme süresi min 2 saattir.Tam kuruma süresi min.24 saattir. Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir.",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "Ekonomik, mat bitişli, yüksek örtücülüğe sahip ve nefes alan mineral esaslı iç mekan duvar boyası."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: 14 m2/L • Kat Sayısı: 2 kat uygulama önerilir. • Kuruma: Katlar arası bekleme süresi min 2 saattir.Tam kuruma süresi min.24 saattir. Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir."
      }
    ]
  },
  {
    "id": "fit-sentetik-astar",
    "name": "Marshall Fit Sentetik Astar",
    "badge": "Yüzey Astarı",
    "tag": "İç Cephe & Geçiş Astarı",
    "deptId": "marshallPrimersPanel",
    "category": "astar-ic",
    "thumb": "assets/marshall-official/fit-sentetik-astar.jpg",
    "desc": "Ahşap ve metal yüzeylerde boya tutuculuğunu artıran, fırça izi bırakmayan ekonomik sentetik astar.",
    "meta": [
      "Yüzey Astarı",
      "Ambalaj: 1 kg / 3 KG",
      "Resmi TDS Belgeli"
    ],
    "coverage": "24 m2/L",
    "sizes": [
      "1 kg",
      "3 KG",
      "18 kg"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrmar/documents/fd/6b/8a/62/tds_fit_sentetik_astar.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "1 kg, 3 KG, 18 kg",
      "consumption": "24 m2/L",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Tam kuruma 48 saat",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "Ahşap ve metal yüzeylerde boya tutuculuğunu artıran, fırça izi bırakmayan ekonomik sentetik astar."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: 24 m2/L • Kat Sayısı: 1 kat uygulama önerilir. • Kuruma: Tam kuruma 48 saat"
      }
    ]
  },
  {
    "id": "fit-silikonlu-flat",
    "name": "Marshall Fit Silikonlu Flat",
    "badge": "İç Cephe Boyası",
    "tag": "Fit İç Cephe",
    "deptId": "marshallInteriorPanel",
    "category": "fit-ic",
    "thumb": "assets/marshall-official/fit-silikonlu-flat.png",
    "desc": "Ekonomik dış cephe koruması sağlayan, mat dokulu ve hava koşullarına dayanıklı silikonlu boya.",
    "meta": [
      "İç Cephe Boyası",
      "Ambalaj: 2,5 L / 7,5 L",
      "Resmi TDS Belgeli"
    ],
    "coverage": "Tek katta 15 m2/L (28±5 mikron kuru film kalınlığında)",
    "sizes": [
      "2,5 L",
      "7,5 L",
      "15 L"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrexp/documents/dd/a2/72/9c/tds_38fit_silikonlu_flat.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "2,5 L, 7,5 L, 15 L",
      "consumption": "Tek katta 15 m2/L (28±5 mikron kuru film kalınlığında)",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Min. 4-8 saat (20°C, %50 RH) Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir  Tam kuruma Min. 24 saat (20°C, %50 RH) Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "Ekonomik dış cephe koruması sağlayan, mat dokulu ve hava koşullarına dayanıklı silikonlu boya."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: Tek katta 15 m2/L (28±5 mikron kuru film kalınlığında) • Kat Sayısı: 1 kat uygulama önerilir. • Kuruma: Min. 4-8 saat (20°C, %50 RH) Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir  Tam kuruma Min. 24 saat (20°C, %50 RH) Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir"
      }
    ]
  },
  {
    "id": "fit-silikonlu-i̇pek-mat",
    "name": "Marshall Fit Silikonlu İpek Mat",
    "badge": "İç Cephe Boyası",
    "tag": "Fit İç Cephe",
    "deptId": "marshallInteriorPanel",
    "category": "fit-ic",
    "thumb": "assets/marshall-official/fit-silikonlu-i̇pek-mat.jpg",
    "desc": "Silinebilir ipeksi mat dokusuyla iç mekanlarda dayanıklı ve ekonomik silikonlu duvar boyası.",
    "meta": [
      "İç Cephe Boyası",
      "Ambalaj: 3.5 KG / 10 KG",
      "Resmi TDS Belgeli"
    ],
    "coverage": "14 m2 / L",
    "sizes": [
      "3.5 KG",
      "10 KG"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrexp/documents/b3/36/c0/a2/ft_slkonlu_pek_mat_tds_v2.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "3.5 KG, 10 KG",
      "consumption": "14 m2 / L",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Katlar arası. Min. 2 saat (200C, %50 RH) Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir. Tam Kuruma: Min. 24 saat (200C, %50 RH) Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir.",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "Silinebilir ipeksi mat dokusuyla iç mekanlarda dayanıklı ve ekonomik silikonlu duvar boyası."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: 14 m2 / L • Kat Sayısı: 2 kat uygulama önerilir. • Kuruma: Katlar arası. Min. 2 saat (200C, %50 RH) Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir. Tam Kuruma: Min. 24 saat (200C, %50 RH) Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir."
      }
    ]
  },
  {
    "id": "fit-silikonlu",
    "name": "Marshall Fit Silikonlu",
    "badge": "İç Cephe Boyası",
    "tag": "Fit İç Cephe",
    "deptId": "marshallInteriorPanel",
    "category": "fit-ic",
    "thumb": "assets/marshall-official/fit-silikonlu.jpg",
    "desc": "Su itici silikon katkısıyla silinebilen, ekonomik ve yüksek kapatıcılıkta mat iç cephe boyası.",
    "meta": [
      "İç Cephe Boyası",
      "Ambalaj: 3.5 KG / 10 KG",
      "Resmi TDS Belgeli"
    ],
    "coverage": "14 m2 / L",
    "sizes": [
      "3.5 KG",
      "10 KG",
      "20 KG"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrmar/documents/94/33/a0/b7/fit_silikonlu_msds.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "3.5 KG, 10 KG, 20 KG",
      "consumption": "14 m2 / L",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Katlar arası bekleme süresi min 2 saattir.Tam kuruma süresi min.24 saattir. Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir..",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "Su itici silikon katkısıyla silinebilen, ekonomik ve yüksek kapatıcılıkta mat iç cephe boyası."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: 14 m2 / L • Kat Sayısı: 2 kat uygulama önerilir. • Kuruma: Katlar arası bekleme süresi min 2 saattir.Tam kuruma süresi min.24 saattir. Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir.."
      }
    ]
  },
  {
    "id": "fit-örtücü-i̇ç-cephe-astarı",
    "name": "Marshall Fit Örtücü İç Cephe Astarı",
    "badge": "Yüzey Astarı",
    "tag": "İç Cephe & Geçiş Astarı",
    "deptId": "marshallPrimersPanel",
    "category": "astar-ic",
    "thumb": "assets/marshall-official/fit-örtücü-i̇ç-cephe-astarı.png",
    "desc": "Renk geçişlerinde alttaki koyu tonu kapatan ve son kat boya tüketimini düşüren örtücü astar.",
    "meta": [
      "Yüzey Astarı",
      "Ambalaj: 3.5 KG / 20 KG",
      "Resmi TDS Belgeli"
    ],
    "coverage": "Yüzey emiciliğine göre değişken (13-16 m²/L)",
    "sizes": [
      "3.5 KG",
      "20 KG"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrmar/documents/3d/56/f7/8b/tds_37fit_ortucu_ic_cephe_astari.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "3.5 KG, 20 KG",
      "consumption": "Yüzey emiciliğine göre değişken (13-16 m²/L)",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Üzerine son kat boya uygulaması için 24 saat beklenmesi önerilir.",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "Renk geçişlerinde alttaki koyu tonu kapatan ve son kat boya tüketimini düşüren örtücü astar."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: Yüzey emiciliğine göre değişken (13-16 m²/L) • Kat Sayısı: 1 kat uygulama önerilir. • Kuruma: Üzerine son kat boya uygulaması için 24 saat beklenmesi önerilir."
      }
    ]
  },
  {
    "id": "geçiş-astarı",
    "name": "Marshall Geçiş Astarı",
    "badge": "Yüzey Astarı",
    "tag": "İç Cephe & Geçiş Astarı",
    "deptId": "marshallPrimersPanel",
    "category": "astar-ic",
    "thumb": "assets/marshall-official/geçiş-astarı.png",
    "desc": "Solvent bazlı boyadan su bazlı boyaya geçişlerde aderans sağlayan, zımpara gerektirmeyen köprü astarı.",
    "meta": [
      "Yüzey Astarı",
      "Ambalaj: 2,5 L / 7,5 L",
      "Resmi TDS Belgeli"
    ],
    "coverage": "15m2/L",
    "sizes": [
      "2,5 L",
      "7,5 L",
      "15 L"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrexp/documents/78/fa/3b/d8/mb_tr_tr_gecis_astari.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "2,5 L, 7,5 L, 15 L",
      "consumption": "15m2/L",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Üzerine son kat boya uygulanması için 24 saat beklenmesi önerilir.",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "Solvent bazlı boyadan su bazlı boyaya geçişlerde aderans sağlayan, zımpara gerektirmeyen köprü astarı."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: 15m2/L • Kat Sayısı: 1 kat uygulama önerilir. • Kuruma: Üzerine son kat boya uygulanması için 24 saat beklenmesi önerilir."
      }
    ]
  },
  {
    "id": "hammerite-düz-metal-boyası",
    "name": "Marshall Hammerite Düz Metal Boyası",
    "badge": "Ahşap & Metal Zırhı",
    "tag": "Pas Üstü Metal",
    "deptId": "marshallWoodMetalPanel",
    "category": "hammerite",
    "thumb": "assets/marshall-official/hammerite-düz-metal-boyası.png",
    "desc": "Paslı metallere zımpara ve antipas gerektirmeden direkt uygulanan, düz dokulu korozyon önleyici metal boyası.",
    "meta": [
      "Ahşap & Metal Zırhı",
      "Ambalaj: 250 ML / 750 ML",
      "Resmi TDS Belgeli"
    ],
    "coverage": "Tavsiye edilen kuru film kalınlığında fırça ile 2 kat için 5m2/L.",
    "sizes": [
      "250 ML",
      "750 ML",
      "25 L",
      "7,5 L"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrmar/documents/e6/bb/9a/3b/tds57duz_metal_boyasi.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "250 ML, 750 ML, 25 L, 7,5 L",
      "consumption": "Tavsiye edilen kuru film kalınlığında fırça ile 2 kat için 5m2/L.",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "4 saat Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir.",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "Paslı metallere zımpara ve antipas gerektirmeden direkt uygulanan, düz dokulu korozyon önleyici metal boyası."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: Tavsiye edilen kuru film kalınlığında fırça ile 2 kat için 5m2/L. • Kat Sayısı: 2 kat uygulama önerilir. • Kuruma: 4 saat Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir."
      }
    ]
  },
  {
    "id": "hammerite-çekiçlenmiş-metal-boyası",
    "name": "Marshall Hammerite Çekiçlenmiş Metal Boyası",
    "badge": "Ahşap & Metal Zırhı",
    "tag": "Pas Üstü Metal",
    "deptId": "marshallWoodMetalPanel",
    "category": "hammerite",
    "thumb": "assets/marshall-official/hammerite-çekiçlenmiş-metal-boyası.jpg",
    "desc": "Doğrudan pas üzerine uygulanan, yüzey kusurlarını gizleyen çekiçlenmiş dekoratif dokulu metal boyası.",
    "meta": [
      "Ahşap & Metal Zırhı",
      "Ambalaj: 250 ML / 750 ML",
      "Resmi TDS Belgeli"
    ],
    "coverage": "Tavsiye edilen kuru film kalınlığında fırça ile 2 kat için 5m2/L.",
    "sizes": [
      "250 ML",
      "750 ML",
      "2,5 L",
      "2.5 kg/bag"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrexp/documents/99/16/61/82/tds58cekiclenmis_metal_boyasi.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "250 ML, 750 ML, 2,5 L, 2.5 kg/bag",
      "consumption": "Tavsiye edilen kuru film kalınlığında fırça ile 2 kat için 5m2/L.",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "4 saat Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir.",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "Doğrudan pas üzerine uygulanan, yüzey kusurlarını gizleyen çekiçlenmiş dekoratif dokulu metal boyası."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: Tavsiye edilen kuru film kalınlığında fırça ile 2 kat için 5m2/L. • Kat Sayısı: 2 kat uygulama önerilir. • Kuruma: 4 saat Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir."
      }
    ]
  },
  {
    "id": "i̇zolasyon-astarı",
    "name": "Marshall İzolasyon Astarı",
    "badge": "Yüzey Astarı",
    "tag": "İç Cephe & Geçiş Astarı",
    "deptId": "marshallPrimersPanel",
    "category": "astar-ic",
    "thumb": "assets/marshall-official/i̇zolasyon-astarı.png",
    "desc": "Su ve nem sızıntılarına karşı kılcal gözenekleri tıkayan, aderans artırıcı şeffaf izolasyon astarı.",
    "meta": [
      "Yüzey Astarı",
      "Ambalaj: 750 ML / 2,5 L",
      "Resmi TDS Belgeli"
    ],
    "coverage": "20 m2/L",
    "sizes": [
      "750 ML",
      "2,5 L",
      "7,5 L",
      "15 L"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrexp/documents/a8/ee/fe/39/tds_27izolasyon_astari.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "750 ML, 2,5 L, 7,5 L, 15 L",
      "consumption": "20 m2/L",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Üzerine son kat boya uygulanması için 24 saat beklenmesi önerilir.",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "Su ve nem sızıntılarına karşı kılcal gözenekleri tıkayan, aderans artırıcı şeffaf izolasyon astarı."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: 20 m2/L • Kat Sayısı: 1 kat uygulama önerilir. • Kuruma: Üzerine son kat boya uygulanması için 24 saat beklenmesi önerilir."
      }
    ]
  },
  {
    "id": "konsantre-astar",
    "name": "Marshall Konsantre Astar",
    "badge": "Yüzey Astarı",
    "tag": "İç Cephe & Geçiş Astarı",
    "deptId": "marshallPrimersPanel",
    "category": "astar-ic",
    "thumb": "assets/marshall-official/konsantre-astar.png",
    "desc": "1'e 7 oranında su ile inceltilen, tozuyan yüzeyleri bağlayan yüksek penetrasyonlu konsantre astar.",
    "meta": [
      "Yüzey Astarı",
      "Ambalaj: 0,75 / 2,5 L",
      "Resmi TDS Belgeli"
    ],
    "coverage": "220 m2/L (1/10 su ile inceltildiğinde)",
    "sizes": [
      "0,75",
      "2,5 L",
      "7,5 L",
      "15 L"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrmar/documents/0f/ec/88/4c/marshall_boya_konsantre_astar_sds.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "0,75, 2,5 L, 7,5 L, 15 L",
      "consumption": "220 m2/L (1/10 su ile inceltildiğinde)",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Astar uygulamasından sonra min. 4-6 saat sonra üzerine son kat boya uygulanabilir. ( Yüksek bağıl nem ve düşük sıcaklık koşullarında kuruma süresi uzayabilir.)",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "1'e 7 oranında su ile inceltilen, tozuyan yüzeyleri bağlayan yüksek penetrasyonlu konsantre astar."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: 220 m2/L (1/10 su ile inceltildiğinde) • Kat Sayısı: 1 kat uygulama önerilir. • Kuruma: Astar uygulamasından sonra min. 4-6 saat sonra üzerine son kat boya uygulanabilir. ( Yüksek bağıl nem ve düşük sıcaklık koşullarında kuruma süresi uzayabilir.)"
      }
    ]
  },
  {
    "id": "luksima-silikonlu-özel-mat",
    "name": "Marshall Luksima Silikonlu Özel Mat",
    "badge": "İç Cephe Boyası",
    "tag": "Silikonlu İç Cephe",
    "deptId": "marshallInteriorPanel",
    "category": "silikonlu",
    "thumb": "assets/marshall-official/luksima-silikonlu-özel-mat.png",
    "desc": "Zarif kadife dokusu ve leke tutmayan silikon teknolojisiyle yüksek silinebilirlikte lüks iç cephe boyası.",
    "meta": [
      "İç Cephe Boyası",
      "Ambalaj: 1L / 2,5L",
      "Resmi TDS Belgeli"
    ],
    "coverage": "8-14 m2/L",
    "sizes": [
      "1L",
      "2,5L",
      "7,5L",
      "15L"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrmar/documents/b9/20/22/35/luksima_tds_.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "1L, 2,5L, 7,5L, 15L",
      "consumption": "8-14 m2/L",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Katlar arası bekleme süresi min. 2 saattir. Tam kuruma süresi min. 24 saattir. Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir.",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "Zarif kadife dokusu ve leke tutmayan silikon teknolojisiyle yüksek silinebilirlikte lüks iç cephe boyası."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: 8-14 m2/L • Kat Sayısı: 2 kat uygulama önerilir. • Kuruma: Katlar arası bekleme süresi min. 2 saattir. Tam kuruma süresi min. 24 saattir. Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir."
      }
    ]
  },
  {
    "id": "luxe-parlak",
    "name": "Marshall Luxe Parlak",
    "badge": "Ahşap & Metal Zırhı",
    "tag": "Sentetik Parlak Boya",
    "deptId": "marshallWoodMetalPanel",
    "category": "sentetik-metal",
    "thumb": "assets/marshall-official/luxe-parlak.png",
    "desc": "Yüksek parlaklık ve çizilme direnci sunan, ahşap ve metal yüzeyler için üstün kaliteli sentetik son kat boya.",
    "meta": [
      "Ahşap & Metal Zırhı",
      "Ambalaj: 2,5 L",
      "Resmi TDS Belgeli"
    ],
    "coverage": "20 m2/L",
    "sizes": [
      "2,5 L"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrexp/documents/ef/e8/00/91/tds_28luxe_parlak.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "2,5 L",
      "consumption": "20 m2/L",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Katlar arası bekleme süresi 24 saattir.Tam kuruma 48 saattir.",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "Yüksek parlaklık ve çizilme direnci sunan, ahşap ve metal yüzeyler için üstün kaliteli sentetik son kat boya."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: 20 m2/L • Kat Sayısı: 2 kat uygulama önerilir. • Kuruma: Katlar arası bekleme süresi 24 saattir.Tam kuruma 48 saattir."
      }
    ]
  },
  {
    "id": "macun-dış-cephe",
    "name": "Marshall Macun Dış Cephe",
    "badge": "İç Cephe Boyası",
    "tag": "Silikonlu İç Cephe",
    "deptId": "marshallInteriorPanel",
    "category": "silikonlu",
    "thumb": "assets/marshall-official/macun-dış-cephe.png",
    "desc": "Dış cephe çatlaklarını ve sıva kusurlarını dolduran, suya ve dış hava şartlarına dayanıklı macun.",
    "meta": [
      "İç Cephe Boyası",
      "Ambalaj: 4,5 KG / 25 KG",
      "Resmi TDS Belgeli"
    ],
    "coverage": "1m2/kg",
    "sizes": [
      "4,5 KG",
      "25 KG"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrexp/documents/6a/b4/3d/15/d_cephe_macunu.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "4,5 KG, 25 KG",
      "consumption": "1m2/kg",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Katlar arası bekleme süresi min Min. 12 saat (20°C, %50 RH), tam kuruma süresi Min. 36 saat (20°C, %50 RH)",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "Dış cephe çatlaklarını ve sıva kusurlarını dolduran, suya ve dış hava şartlarına dayanıklı macun."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: 1m2/kg • Kat Sayısı: 1 kat uygulama önerilir. • Kuruma: Katlar arası bekleme süresi min Min. 12 saat (20°C, %50 RH), tam kuruma süresi Min. 36 saat (20°C, %50 RH)"
      }
    ]
  },
  {
    "id": "macun-i̇ç-cephe",
    "name": "Marshall Macun İç Cephe",
    "badge": "İç Cephe Boyası",
    "tag": "Silikonlu İç Cephe",
    "deptId": "marshallInteriorPanel",
    "category": "silikonlu",
    "thumb": "assets/marshall-official/macun-i̇ç-cephe.png",
    "desc": "İç mekan sıva ve alçı yüzeylerde pürüzsüz son kat zemin hazırlayan, kolay zımparalanan dolgu macunu.",
    "meta": [
      "İç Cephe Boyası",
      "Ambalaj: 4,5 KG / 25 KG",
      "Resmi TDS Belgeli"
    ],
    "coverage": "1m2/kg",
    "sizes": [
      "4,5 KG",
      "25 KG"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrexp/documents/f1/e3/88/71/mb_tr_tr_macun_sn.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "4,5 KG, 25 KG",
      "consumption": "1m2/kg",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Min. 2 saat (20°C, %50 bağıl nem). Tam kuruma: 24 saat (20°C, %50 bağıl nem) *Daha düşük sıcaklık ve daha yüksek bağıl nem kuruma süresini uzatır.",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "İç mekan sıva ve alçı yüzeylerde pürüzsüz son kat zemin hazırlayan, kolay zımparalanan dolgu macunu."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: 1m2/kg • Kat Sayısı: 2 Kat kat uygulama önerilir. • Kuruma: Min. 2 saat (20°C, %50 bağıl nem). Tam kuruma: 24 saat (20°C, %50 bağıl nem) *Daha düşük sıcaklık ve daha yüksek bağıl nem kuruma süresini uzatır."
      }
    ]
  },
  {
    "id": "maximum-mat",
    "name": "Marshall Maximum Mat",
    "badge": "İç Cephe Boyası",
    "tag": "Sil-Pak Leke Tutmaz",
    "deptId": "marshallInteriorPanel",
    "category": "sil-pak",
    "thumb": "assets/marshall-official/maximum-mat.png",
    "desc": "Teflon katkılı leke tutmaz yapısıyla tam mat yüzey sunan, üstün örtücülüğe sahip leke kalkanı boyası.",
    "meta": [
      "İç Cephe Boyası",
      "Ambalaj: 2,5 L / 7,5 L",
      "Resmi TDS Belgeli"
    ],
    "coverage": "16 m2/L",
    "sizes": [
      "2,5 L",
      "7,5 L",
      "15 L"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrmar/documents/c5/42/51/47/0176_maximum_mat_tds_revizyon.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "2,5 L, 7,5 L, 15 L",
      "consumption": "16 m2/L",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Katlar arası bekleme süresi min 2 saattir.Tam kuruma süresi min.24 saattir. Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir.",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "Teflon katkılı leke tutmaz yapısıyla tam mat yüzey sunan, üstün örtücülüğe sahip leke kalkanı boyası."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: 16 m2/L • Kat Sayısı: 2 kat uygulama önerilir. • Kuruma: Katlar arası bekleme süresi min 2 saattir.Tam kuruma süresi min.24 saattir. Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir."
      }
    ]
  },
  {
    "id": "maximum",
    "name": "Marshall Maximum",
    "badge": "İç Cephe Boyası",
    "tag": "Sil-Pak Leke Tutmaz",
    "deptId": "marshallInteriorPanel",
    "category": "sil-pak",
    "thumb": "assets/marshall-official/maximum.jpg",
    "desc": "Maksimum silinebilirlik ve leke itici bariyer sağlayan, ipeksi parlaklıkta üst segment iç mekan boyası.",
    "meta": [
      "İç Cephe Boyası",
      "Ambalaj: 2,5 L / 7,5 L",
      "Resmi TDS Belgeli"
    ],
    "coverage": "16 m2/L",
    "sizes": [
      "2,5 L",
      "7,5 L",
      "15 L"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrexp/documents/2f/9c/c9/36/tds_4maximum_silikonlu_ipek_mat.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "2,5 L, 7,5 L, 15 L",
      "consumption": "16 m2/L",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Katlar arası bekleme süresi min 2 saattir.Tam kuruma süresi min.24 saattir. Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir.",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "Maksimum silinebilirlik ve leke itici bariyer sağlayan, ipeksi parlaklıkta üst segment iç mekan boyası."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: 16 m2/L • Kat Sayısı: 2 kat uygulama önerilir. • Kuruma: Katlar arası bekleme süresi min 2 saattir.Tam kuruma süresi min.24 saattir. Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir."
      }
    ]
  },
  {
    "id": "pastel-yarı-mat",
    "name": "Marshall Pastel Yarı Mat",
    "badge": "İç Cephe Boyası",
    "tag": "Silikonlu İç Cephe",
    "deptId": "marshallInteriorPanel",
    "category": "silikonlu",
    "thumb": "assets/marshall-official/pastel-yarı-mat.png",
    "desc": "Yarı mat dekoratif bitiş sunan, yoğun sirkülasyonlu alanlarda kolay temizlenen sentetik iç cephe boyası.",
    "meta": [
      "İç Cephe Boyası",
      "Ambalaj: 1 L / 2,5 L",
      "Resmi TDS Belgeli"
    ],
    "coverage": "20 m2/L",
    "sizes": [
      "1 L",
      "2,5 L",
      "7,5 L",
      "15 L"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrexp/documents/4f/dc/d9/70/tds_10pastel_yari_mat.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "1 L, 2,5 L, 7,5 L, 15 L",
      "consumption": "20 m2/L",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Katlar arası bekleme süresi 24 saattir.Tam kuruma 48 saattir.",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "Yarı mat dekoratif bitiş sunan, yoğun sirkülasyonlu alanlarda kolay temizlenen sentetik iç cephe boyası."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: 20 m2/L • Kat Sayısı: 2 kat uygulama önerilir. • Kuruma: Katlar arası bekleme süresi 24 saattir.Tam kuruma 48 saattir."
      }
    ]
  },
  {
    "id": "plastik-mat",
    "name": "Marshall Plastik Mat",
    "badge": "İç Cephe Boyası",
    "tag": "Silikonlu İç Cephe",
    "deptId": "marshallInteriorPanel",
    "category": "silikonlu",
    "thumb": "assets/marshall-official/plastik-mat.png",
    "desc": "Derin mat mineral dokulu, nefes alma kabiliyeti yüksek klasik iç cephe plastik duvar boyası.",
    "meta": [
      "İç Cephe Boyası",
      "Ambalaj: 2,5 L / 7,5 L",
      "Resmi TDS Belgeli"
    ],
    "coverage": "14 m2/L",
    "sizes": [
      "2,5 L",
      "7,5 L",
      "15 L"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrexp/documents/c8/f1/ec/b4/mb_tr_tr_marshall_plastik_mat.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "2,5 L, 7,5 L, 15 L",
      "consumption": "14 m2/L",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Katlar arası bekleme süresi min 2 saattir.Tam kuruma süresi min.24 saattir. Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir.",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "Derin mat mineral dokulu, nefes alma kabiliyeti yüksek klasik iç cephe plastik duvar boyası."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: 14 m2/L • Kat Sayısı: 2 kat uygulama önerilir. • Kuruma: Katlar arası bekleme süresi min 2 saattir.Tam kuruma süresi min.24 saattir. Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir."
      }
    ]
  },
  {
    "id": "protect-silikonlu-flat",
    "name": "Marshall Protect Silikonlu Flat",
    "badge": "İç Cephe Boyası",
    "tag": "Silikonlu İç Cephe",
    "deptId": "marshallInteriorPanel",
    "category": "silikonlu",
    "thumb": "assets/marshall-official/protect-silikonlu-flat.png",
    "desc": "Dış cephede atmosferik kirlilik ve güneş ışığına karşı uzun ömürlü koruma sağlayan mat silikonlu boya.",
    "meta": [
      "İç Cephe Boyası",
      "Ambalaj: 2,5 L / 7,5 L",
      "Resmi TDS Belgeli"
    ],
    "coverage": "15 m2/L",
    "sizes": [
      "2,5 L",
      "7,5 L",
      "15 L"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrexp/documents/b3/8b/f5/6b/tds_24protect_silikonlu_flat.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "2,5 L, 7,5 L, 15 L",
      "consumption": "15 m2/L",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Katlar arası kuruma süresi Min. 4-8 saat. Tam kuruma süresi min. 24 saattir. Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir.",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "Dış cephede atmosferik kirlilik ve güneş ışığına karşı uzun ömürlü koruma sağlayan mat silikonlu boya."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: 15 m2/L • Kat Sayısı: 2 kat uygulama önerilir. • Kuruma: Katlar arası kuruma süresi Min. 4-8 saat. Tam kuruma süresi min. 24 saattir. Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir."
      }
    ]
  },
  {
    "id": "saten-alçı-astarı",
    "name": "Marshall Saten Alçı Astarı",
    "badge": "Yüzey Astarı",
    "tag": "İç Cephe & Geçiş Astarı",
    "deptId": "marshallPrimersPanel",
    "category": "astar-ic",
    "thumb": "assets/marshall-official/saten-alçı-astarı.png",
    "desc": "Saten alçı, alçıpan ve emici yüzeylerde tozumayı önleyen, boyanın homojen kurumasını sağlayan şeffaf astar.",
    "meta": [
      "Yüzey Astarı",
      "Ambalaj: 750 ML / 4 L",
      "Resmi TDS Belgeli"
    ],
    "coverage": "25 m2/L",
    "sizes": [
      "750 ML",
      "4 L",
      "15 L"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrexp/documents/47/b1/03/f9/tds_13saten_alci_astari.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "750 ML, 4 L, 15 L",
      "consumption": "25 m2/L",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Saten Alçı Astarı uygulamasından 24 saat sonra üzerine Marshall su bazlı iç cephe boyaları ve kaplamaları kullanılabilir.",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "Saten alçı, alçıpan ve emici yüzeylerde tozumayı önleyen, boyanın homojen kurumasını sağlayan şeffaf astar."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: 25 m2/L • Kat Sayısı: 1 kat uygulama önerilir. • Kuruma: Saten Alçı Astarı uygulamasından 24 saat sonra üzerine Marshall su bazlı iç cephe boyaları ve kaplamaları kullanılabilir."
      }
    ]
  },
  {
    "id": "silikonlu-i̇pek-mat",
    "name": "Marshall Silikonlu İpek Mat",
    "badge": "İç Cephe Boyası",
    "tag": "Silikonlu İç Cephe",
    "deptId": "marshallInteriorPanel",
    "category": "silikonlu",
    "thumb": "assets/marshall-official/silikonlu-i̇pek-mat.png",
    "desc": "İpeksi dokusuyla ışığı zarif yansıtan, tam silinebilir ve sürtünmeye dayanıklı iç cephe boyası.",
    "meta": [
      "İç Cephe Boyası",
      "Ambalaj: 2,5 L / 7,5 L",
      "Resmi TDS Belgeli"
    ],
    "coverage": "14 m2/L",
    "sizes": [
      "2,5 L",
      "7,5 L",
      "15 L"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrexp/documents/0a/ab/89/02/tds_5silikonlu_ipek_mat.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "2,5 L, 7,5 L, 15 L",
      "consumption": "14 m2/L",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Katlar arası bekleme süresi min 2 saattir.Tam kuruma süresi min.24 saattir. Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir.",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "İpeksi dokusuyla ışığı zarif yansıtan, tam silinebilir ve sürtünmeye dayanıklı iç cephe boyası."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: 14 m2/L • Kat Sayısı: 2 kat uygulama önerilir. • Kuruma: Katlar arası bekleme süresi min 2 saattir.Tam kuruma süresi min.24 saattir. Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir."
      }
    ]
  },
  {
    "id": "silikonlu-mat",
    "name": "Marshall Silikonlu Mat",
    "badge": "İç Cephe Boyası",
    "tag": "Silikonlu İç Cephe",
    "deptId": "marshallInteriorPanel",
    "category": "silikonlu",
    "thumb": "assets/marshall-official/silikonlu-mat.png",
    "desc": "Işık parlamasını engelleyen mat bitişli, silikon katkısıyla kolay temizlenen iç cephe boyası.",
    "meta": [
      "İç Cephe Boyası",
      "Ambalaj: 2,5 L / 7,5 L",
      "Resmi TDS Belgeli"
    ],
    "coverage": "14 m2/L",
    "sizes": [
      "2,5 L",
      "7,5 L",
      "15 L"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrexp/documents/8e/c4/27/37/mb_tr_tr_silikonlu_mat.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "2,5 L, 7,5 L, 15 L",
      "consumption": "14 m2/L",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Katlar arası bekleme süresi min 2 saattir.Tam kuruma süresi min.24 saattir. Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir.",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "Işık parlamasını engelleyen mat bitişli, silikon katkısıyla kolay temizlenen iç cephe boyası."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: 14 m2/L • Kat Sayısı: 2 kat uygulama önerilir. • Kuruma: Katlar arası bekleme süresi min 2 saattir.Tam kuruma süresi min.24 saattir. Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir."
      }
    ]
  },
  {
    "id": "silikonlu-özel-mat",
    "name": "Marshall Silikonlu Özel Mat",
    "badge": "İç Cephe Boyası",
    "tag": "Silikonlu İç Cephe",
    "deptId": "marshallInteriorPanel",
    "category": "silikonlu",
    "thumb": "assets/marshall-official/silikonlu-özel-mat.png",
    "desc": "Özel mat kadifemsi yapısıyla fırça/rulo izi bırakmayan, silinebilir profesyonel iç mekan boyası.",
    "meta": [
      "İç Cephe Boyası",
      "Ambalaj: 750 ML / 1 L",
      "Resmi TDS Belgeli"
    ],
    "coverage": "14 m2/L",
    "sizes": [
      "750 ML",
      "1 L",
      "2,5 L",
      "7,5 L",
      "15 L"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrexp/documents/95/66/3b/62/tds_3silikonlu_ozel_mat.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "750 ML, 1 L, 2,5 L, 7,5 L, 15 L",
      "consumption": "14 m2/L",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Katlar arası bekleme süresi min 2 saattir.Tam kuruma süresi min.24 saattir. Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir.",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "Özel mat kadifemsi yapısıyla fırça/rulo izi bırakmayan, silinebilir profesyonel iç mekan boyası."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: 14 m2/L • Kat Sayısı: 2 kat uygulama önerilir. • Kuruma: Katlar arası bekleme süresi min 2 saattir.Tam kuruma süresi min.24 saattir. Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir."
      }
    ]
  },
  {
    "id": "si̇l-pak-plus",
    "name": "Marshall SİL-PAK Plus",
    "badge": "İç Cephe Boyası",
    "tag": "Silikonlu İç Cephe",
    "deptId": "marshallInteriorPanel",
    "category": "silikonlu",
    "thumb": "assets/marshall-official/si̇l-pak-plus.png",
    "desc": "Su ve yağ bazlı lekeleri yüzeyden iten hidrofobik teknolojiye sahip, tam silinebilir leke tutmaz boya.",
    "meta": [
      "İç Cephe Boyası",
      "Ambalaj: 2,5 L / 7.5 L",
      "Resmi TDS Belgeli"
    ],
    "coverage": "8-12 m2/L",
    "sizes": [
      "2,5 L",
      "7.5 L",
      "7,5 L",
      "15 L"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrmar/documents/4e/c3/85/26/silpak_plus_tds.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "2,5 L, 7.5 L, 7,5 L, 15 L",
      "consumption": "8-12 m2/L",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Min. 2 saat (20 ºC, %50 RH) Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir.",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "Su ve yağ bazlı lekeleri yüzeyden iten hidrofobik teknolojiye sahip, tam silinebilir leke tutmaz boya."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: 8-12 m2/L • Kat Sayısı: 2 kat uygulama önerilir. • Kuruma: Min. 2 saat (20 ºC, %50 RH) Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir."
      }
    ]
  },
  {
    "id": "si̇l-pak",
    "name": "Marshall SİL-PAK",
    "badge": "İç Cephe Boyası",
    "tag": "Silikonlu İç Cephe",
    "deptId": "marshallInteriorPanel",
    "category": "silikonlu",
    "thumb": "assets/marshall-official/si̇l-pak.png",
    "desc": "Leke tutmayan silikonlu formülüyle temizliği kolaylaştıran, dayanıklı ve silinebilir iç cephe boyası.",
    "meta": [
      "İç Cephe Boyası",
      "Ambalaj: 2,5 L / 7,5 L",
      "Resmi TDS Belgeli"
    ],
    "coverage": "Tek katta 14 m2/L (28±5 mikron kuru film kalınlığında)",
    "sizes": [
      "2,5 L",
      "7,5 L",
      "15 L"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrexp/documents/b5/e8/37/4a/tds_2silpak.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "2,5 L, 7,5 L, 15 L",
      "consumption": "Tek katta 14 m2/L (28±5 mikron kuru film kalınlığında)",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Katlar arası bekleme süresi min 2 saattir.Tam kuruma süresi min.24 saattir. Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir.",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "Leke tutmayan silikonlu formülüyle temizliği kolaylaştıran, dayanıklı ve silinebilir iç cephe boyası."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: Tek katta 14 m2/L (28±5 mikron kuru film kalınlığında) • Kat Sayısı: 2 kat uygulama önerilir. • Kuruma: Katlar arası bekleme süresi min 2 saattir.Tam kuruma süresi min.24 saattir. Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir."
      }
    ]
  },
  {
    "id": "tavan-boyası",
    "name": "Marshall Tavan Boyası",
    "badge": "Tavan Grubu",
    "tag": "Özel Tavan Boyası",
    "deptId": "marshallCeilingPanel",
    "category": "tavan-std",
    "thumb": "assets/marshall-official/tavan-boyası.png",
    "desc": "Yüksek beyazlık ve kapatıcılık sağlayan, sararmayan ve damlatmayan mat mineral tavan boyası.",
    "meta": [
      "Tavan Grubu",
      "Ambalaj: 3.5 KG / 10 KG",
      "Resmi TDS Belgeli"
    ],
    "coverage": "14 m2/L",
    "sizes": [
      "3.5 KG",
      "10 KG",
      "17.5 KG"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrexp/documents/ef/62/4b/33/mtse24_12_tavan_boyasi_11112023.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "3.5 KG, 10 KG, 17.5 KG",
      "consumption": "14 m2/L",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Katlar arası bekleme süresi min 2 saattir.Tam kuruma süresi min.24 saattir. Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir.",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "Yüksek beyazlık ve kapatıcılık sağlayan, sararmayan ve damlatmayan mat mineral tavan boyası."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: 14 m2/L • Kat Sayısı: 2 kat uygulama önerilir. • Kuruma: Katlar arası bekleme süresi min 2 saattir.Tam kuruma süresi min.24 saattir. Yüksek bağıl nem ve düşük sıcaklıkta kuruma süresi uzayabilir."
      }
    ]
  },
  {
    "id": "tiner-sentetik",
    "name": "Marshall Tiner Sentetik",
    "badge": "Solvent İnceltici",
    "tag": "Sentetik Tiner",
    "deptId": "marshallChemicalsPanel",
    "category": "tiner-sentetik",
    "thumb": "assets/marshall-official/tiner-sentetik.png",
    "desc": "Sentetik boya, vernik ve astarların kıvamını ayarlamak için özel formüle edilmiş saf sentetik tiner.",
    "meta": [
      "Solvent İnceltici",
      "Ambalaj: 500 ML / 1 L",
      "Resmi TDS Belgeli"
    ],
    "coverage": "Yüzey emiciliğine göre değişken (13-16 m²/L)",
    "sizes": [
      "500 ML",
      "1 L",
      "2,5 L",
      "15 L"
    ],
    "tdsUrl": "https://msp.images.akzonobel.com/prd/dh/etrexp/documents/3d/db/15/04/tds_33tiner_sentetik.pdf",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "500 ML, 1 L, 2,5 L, 15 L",
      "consumption": "Yüzey emiciliğine göre değişken (13-16 m²/L)",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Dokunma 1-2 saat, tam kuruma 24 saat",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "Sentetik boya, vernik ve astarların kıvamını ayarlamak için özel formüle edilmiş saf sentetik tiner."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: Yüzey emiciliğine göre değişken (13-16 m²/L) • Kat Sayısı: 2 Kat kat uygulama önerilir. • Kuruma: Dokunma 1-2 saat, tam kuruma 24 saat"
      }
    ]
  },
  {
    "id": "marshall-ozel-cam-cila",
    "name": "Marshall Özel Cam Cila (Sararmayan Parlak)",
    "badge": "Ahşap & Metal Zırhı",
    "tag": "Ahşap Koruma & Vernik",
    "deptId": "marshallWoodMetalPanel",
    "category": "ahsap-cila",
    "thumb": "assets/marshall-official/marshall-ozel-cam-cila.jpg",
    "desc": "Parke, ahşap merdiven ve mobilyalarda yüksek çizilme direnci sunan, neme ve deterjana dayanıklı parlak poliüretan cila.",
    "meta": [
      "Ahşap & Metal Zırhı",
      "Ambalaj: 0,75 L / 2,5 L",
      "Fabrika Stok Teslim"
    ],
    "coverage": "15-18 m²/L (Tek Kat)",
    "sizes": [
      "0,75 L",
      "2,5 L"
    ],
    "tdsUrl": "",
    "specs": {
      "standard": "AkzoNobel ISO 9001 / TSE",
      "packaging": "0,75 L, 2,5 L",
      "consumption": "15-18 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su veya Tiner ile",
      "potLife": "Dokunma: 2-3 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Ürün Tanımı ve Genel Performans",
        "body": "Parke, ahşap merdiven ve mobilyalarda yüksek çizilme direnci sunan, neme ve deterjana dayanıklı parlak poliüretan cila."
      },
      {
        "title": "Uygulama ve Kuruma Bilgileri",
        "body": "Kapsama Alanı: 15-18 m²/L (Tek Kat) • Kat Sayısı: 2-3 Kat kat uygulama önerilir. • Kuruma: Dokunma: 2-3 sa · Tam Kuruma: 24 sa"
      }
    ]
  }
];
  var DEPARTMENTS_DATA = [
  {
    "id": "marshallInteriorPanel",
    "short": "İç Cephe & SİL-PAK",
    "full": "İç Cephe Boyaları, SİL-PAK Plus & Maximum",
    "sub": "SİL-PAK Plus, Maximum, Luksima ve Fit",
    "pillsId": "marshallInteriorPills",
    "badge": "Leke Tutmaz İç Mekan",
    "summaryTitle": "AkzoNobel Marshall SİL-PAK Plus ve Yüksek Dayanımlı İç Cephe Serisi",
    "summaryDesc": "Su ve yağ bazlı lekeleri yüzeyde tutmayan hidrofobik SİL-PAK Plus, tam mat leke tutmayan Maximum serisi, ipek mat zarif dokusuyla Luksima ve ekonomik Fit iç cephe boyaları.",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"/><polyline points=\"9 22 9 12 15 12 15 22\"/></svg>",
    "pills": [
      [
        "SİL-PAK & Maximum",
        "sil-pak",
        true
      ],
      [
        "Silikonlu & Mat",
        "silikonlu",
        false
      ],
      [
        "Fit Serisi",
        "fit-ic",
        false
      ]
    ]
  },
  {
    "id": "marshallExteriorPanel",
    "short": "Dış Cephe & Akrikor",
    "full": "Akrikor Dış Cephe, Su Kalkanı & Grenli Kaplama",
    "sub": "Akrikor Saf Akrilik, Su Kalkanı, Grenli",
    "pillsId": "marshallExteriorPills",
    "badge": "Akrikor Dış Cephe Zırhı",
    "summaryTitle": "Marshall Akrikor Ağır Sahil ve Ege İklimine Dayanıklı Dış Cephe Sistemleri",
    "summaryDesc": "Çeşme, Urla ve Yarımada sahil şeridinde tuz serpintisine, şiddetli yağmura ve yoğun UV güneş ışığına karşı esnek kalkan oluşturan Akrikor Saf Akrilik, Elyaflı Su Kalkanı ve Grenli dış cephe boyaları.",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><path d=\"M3 9h18M9 21V9\"/></svg>",
    "pills": [
      [
        "Saf Akrilik & Silikonlu",
        "akrikor-akrilik",
        true
      ],
      [
        "Su Kalkanı Elyaflı",
        "akrikor-kalkan",
        false
      ],
      [
        "Grenli Kaplama",
        "akrikor-grenli",
        false
      ]
    ]
  },
  {
    "id": "marshallWoodMetalPanel",
    "short": "Ahşap & Hammerite Metal",
    "full": "Cuprinol Ahşap Koruma, Hammerite & Sentetik Metal",
    "sub": "Hammerite Pas Üstü, Cuprinol, Cam Cila",
    "pillsId": "marshallWoodMetalPills",
    "badge": "Ahşap, Marin & Pas Üstü Metal",
    "summaryTitle": "Cuprinol Ahşap Bakımı, Doğrudan Pas Üstüne Hammerite ve Sentetik Boyalar",
    "summaryDesc": "Paslı yüzeylere astar gerektirmeden uygulanan Hammerite korozyon koruma boyası, Ege güneşine dirençli Cuprinol Ultra ahşap koruyucular, marin tipi Özel Cam Cila ve parlak sentetikler.",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"m4.93 4.93 4.24 4.24M14.83 14.83l4.24 4.24M14.83 9.17l4.24-4.24M4.93 19.07l4.24-4.24\"/></svg>",
    "pills": [
      [
        "Hammerite Metal",
        "hammerite",
        true
      ],
      [
        "Ahşap Koruyucu & Cila",
        "ahsap-cila",
        false
      ],
      [
        "Sentetik Yağlı Boya",
        "sentetik-metal",
        false
      ]
    ]
  },
  {
    "id": "marshallCeilingPanel",
    "short": "Tavan Boyaları",
    "full": "Marshall Profesyonel & Fit Extra Tavan Boyaları",
    "sub": "Fit Extra Tavan, Standart Tavan Boyası",
    "pillsId": "marshallCeilingPills",
    "badge": "Ultra Beyaz Tavan Grubu",
    "summaryTitle": "Marshall Yüksek Örtücülü, Damlatmayan ve Nefes Alan Tavan Boyaları",
    "summaryDesc": "Fırça ve rulo izi bırakmayan, tam mat beyazlığı ile ışığı homojen dağıtan Marshall Standart ve Fit Extra profesyonel tavan boyaları.",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5\"/></svg>",
    "pills": [
      [
        "Marshall Standart Tavan",
        "tavan-std",
        true
      ],
      [
        "Fit Extra Tavan",
        "tavan-fit",
        false
      ]
    ]
  },
  {
    "id": "marshallPrimersPanel",
    "short": "Astarlar & Macunlar",
    "full": "Akrikor Astar, Geçiş Astarı, İzolasyon & Macun",
    "sub": "Anti Alkali, Geçiş Astarı, İzolasyon, Macun",
    "pillsId": "marshallPrimersPills",
    "badge": "Yüzey Bağlayıcı Astarlar",
    "summaryTitle": "Marshall Yüzey Sağlamlaştırıcı Astarlar, Dönüşüm ve Dolgu Macunları",
    "summaryDesc": "Alkali çiçeklenmesini durduran Akrikor Anti Alkali Astar, solventten su bazlıya geçişi sağlayan Geçiş Astarı, mikronize İzolasyon Astarı ve pürüzsüz yüzey macunları.",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z\"/></svg>",
    "pills": [
      [
        "Dış Cephe Astarları",
        "astar-dis",
        true
      ],
      [
        "İç Cephe & Geçiş Astarı",
        "astar-ic",
        false
      ]
    ]
  },
  {
    "id": "marshallChemicalsPanel",
    "short": "Tiner & Çözücüler",
    "full": "Sentetik & Selülozik Tinerler, Temizleyiciler",
    "sub": "Marshall Orijinal Sentetik Tiner (0.5 L / 1 L)",
    "pillsId": "marshallChemicalsPills",
    "badge": "Saf Solvent & İncelticiler",
    "summaryTitle": "Marshall Sentetik Tiner ve Profesyonel İnceltme Solventleri",
    "summaryDesc": "Sentetik son kat boyalar, antipaslar ve yat vernikleri için özel formüle edilmiş yüksek saflıkta kokusu hafifletilmiş Marshall sentetik tiner.",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\"/><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\"/></svg>",
    "pills": [
      [
        "Sentetik Tiner",
        "tiner-sentetik",
        true
      ]
    ]
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

  var currentActiveTab = "marshallInteriorPanel";
  var currentProduct = null;
  var selectedSize = "";

  var panels = {};
  DEPARTMENTS_DATA.forEach(function(d) {
    panels[d.id] = document.getElementById(d.id);
  });

  // Sticky subnav clearance sync
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
      btn.innerHTML = [
        '<div class="pv-drawer-item-left">',
        '  <div class="pv-drawer-icon-box" aria-hidden="true">' + (dept.icon || '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>') + '</div>',
        '  <div class="pv-drawer-text-stack">',
        '    <span class="pv-drawer-item-title">' + dept.short + '</span>',
        '    <span class="pv-drawer-item-sub">' + dept.sub + '</span>',
        '  </div>',
        '</div>',
        '<div class="pv-drawer-item-right" aria-hidden="true">',
          '<svg class="pv-drawer-item-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',
        '</div>'
      ].join("");

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
      var panel = pill.closest(".pv-menu-section") || pill.closest(".pv-tab-panel");
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

  // Specimen Detail Modal Logic (Canonical Dual-Gauge Pervan Standard)
  var modalBackdrop = document.getElementById("paintModalBackdrop");
  var modalCard = document.getElementById("paintModalCard");
  var modalCloseBtn = document.getElementById("modalCloseBtn");
  var modalHandleZone = document.getElementById("modalHandleZone");
  var modalTopBar = document.getElementById("modalTopBar");
  var modalScrollArea = document.getElementById("modalScrollArea");
  var modalProductEyebrow = document.getElementById("modalProductEyebrow");
  var modalProductTitle = document.getElementById("modalProductTitle");
  var modalProductImg = document.getElementById("modalProductImg");
  var modalProductSub = document.getElementById("modalProductSub");
  var modalProductTag = document.getElementById("modalProductTag");
  var modalChromaGlow = document.getElementById("modalChromaGlow");
  var modalSizesContainer = document.getElementById("modalSizesContainer");
  var modalAreaRow = document.getElementById("modalAreaRow");
  var modalGaugeNum = document.getElementById("modalGaugeNum");
  var modalGaugeUnit = document.getElementById("modalGaugeUnit");
  var modalGaugeSub = document.getElementById("modalGaugeSub");
  var modalSpecArea = document.getElementById("modalSpecArea");
  var modalSpecRightCard = document.getElementById("modalSpecRightCard");
  var modalGaugeSheen = document.getElementById("modalGaugeSheen");
  var modalGaugeDrying = document.getElementById("modalGaugeDrying");
  var modalGaugeDryingText = document.getElementById("modalGaugeDryingText");
  var modalTdsWrap = document.getElementById("modalTdsWrap");
  var modalTdsBtn = document.getElementById("modalTdsBtn");
  var modalWhatsAppBtn = document.getElementById("modalWhatsAppBtn");
  var modalCtaText = document.getElementById("modalCtaText");
  var modalShareBtn = document.getElementById("modalShareBtn");
  var modalShareText = document.getElementById("modalShareText");
  var modalServiceDesc = document.getElementById("modalServiceDesc");

  var categoryDisplayNames = {
    "sil-pak": "İç Cephe · SİL-PAK Plus & Maximum",
    "silikonlu": "İç Cephe · Silikonlu & Mat",
    "fit-ic": "İç Cephe · Fit Serisi",
    "akrikor-akrilik": "Dış Cephe · Akrikor Saf Akrilik",
    "akrikor-kalkan": "Dış Cephe · Su Kalkanı Elyaflı",
    "akrikor-grenli": "Dış Cephe · Grenli Kaplama",
    "hammerite": "Metal · Hammerite Pas Üstü",
    "ahsap-cila": "Ahşap · Cuprinol & Özel Cam Cila",
    "sentetik-metal": "Metal & Sentetik Yağlı Boya",
    "tavan-std": "Tavan · Marshall Standart Tavan",
    "tavan-fit": "Tavan · Fit Extra Tavan",
    "astar-dis": "Astar · Akrikor Dış Cephe Astarı",
    "astar-ic": "Astar · İç Cephe Geçiş & İzolasyon",
    "tiner-sentetik": "İnceltici · Sentetik Tiner"
  };

  function calculateCoverageEstimate(sizeStr, coverageStr) {
    if (!sizeStr) return null;
    var rawSize = (sizeStr + "").toLowerCase().replace(",", ".").trim();
    var numMatch = rawSize.match(/([0-9]+(?:\.[0-9]+)?)/);
    if (!numMatch) return null;
    var vol = parseFloat(numMatch[1]);
    if (!vol || isNaN(vol)) return null;

    var cov = 15;
    if (coverageStr) {
      var covMatch = (coverageStr + "").replace(",", ".").match(/([0-9]+(?:\.[0-9]+)?)/);
      if (covMatch) {
        cov = parseFloat(covMatch[1]) || 15;
      }
    }

    var avgArea = Math.round(vol * cov);
    var minArea = Math.round(avgArea * 0.75);
    var maxArea = Math.round(avgArea * 1.35);

    return {
      avgArea: avgArea,
      rangeLabel: minArea + " – " + maxArea + " m² Çift Kat Kaplama",
      summaryLabel: avgArea + " m² kaplama"
    };
  }

  function updateAreaCoverage(size, product) {
    if (!product) return;
    var est = calculateCoverageEstimate(size, product.coverage);
    if (est) {
      if (modalGaugeNum) modalGaugeNum.textContent = est.avgArea;
      if (modalGaugeUnit) modalGaugeUnit.style.display = "inline";
      if (modalGaugeSub) modalGaugeSub.textContent = est.rangeLabel;
      if (modalSpecArea) modalSpecArea.textContent = est.rangeLabel;
      if (modalAreaRow) modalAreaRow.style.display = "flex";
    } else {
      if (modalGaugeNum) modalGaugeNum.textContent = "—";
      if (modalGaugeUnit) modalGaugeUnit.style.display = "none";
      if (modalGaugeSub) modalGaugeSub.textContent = product.coverage || "Standart Sarfiyat";
      if (modalSpecArea) modalSpecArea.textContent = product.coverage || "—";
    }
  }

  function updateCanScale(size) {
    var modalShadow = document.getElementById("modalCanShadow");
    var s = (size || "").toLowerCase();
    var scale = 1;
    if (s.indexOf("15") !== -1 || s.indexOf("20") !== -1 || s.indexOf("25") !== -1) {
      scale = 1.04;
    } else if (s.indexOf("7.5") !== -1 || s.indexOf("7,5") !== -1 || s.indexOf("10") !== -1 || s.indexOf("12.5") !== -1 || s.indexOf("12,5") !== -1) {
      scale = 0.98;
    } else if (s.indexOf("2.5") !== -1 || s.indexOf("2,5") !== -1 || s.indexOf("3.5") !== -1 || s.indexOf("3,5") !== -1 || s.indexOf("4") !== -1) {
      scale = 0.92;
    } else if (s.indexOf("0.75") !== -1 || s.indexOf("0,75") !== -1 || s.indexOf("1") !== -1 || s.indexOf("500") !== -1) {
      scale = 0.86;
    }
    if (modalProductImg) {
      modalProductImg.style.transform = "scale(" + scale + ")";
      modalProductImg.style.transition = "transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)";
    }
    if (modalShadow) {
      modalShadow.style.transform = "scale(" + (scale * 0.96) + ")";
      modalShadow.style.transition = "transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)";
    }
  }

  function openModal(productId) {
    var p = MARSHALL_PRODUCTS_DATA.find(function(item) { return item.id === productId; });
    if (!p) return;
    currentProduct = p;

    if (modalProductTitle) modalProductTitle.textContent = p.name;
    if (modalProductEyebrow) {
      modalProductEyebrow.textContent = (categoryDisplayNames && categoryDisplayNames[p.category]) ? categoryDisplayNames[p.category] : "Marshall Boya & AkzoNobel";
    }
    if (modalProductSub) modalProductSub.textContent = p.desc;
    if (modalProductTag) modalProductTag.textContent = p.tag || p.badge || "";
    if (modalProductImg) {
      modalProductImg.src = p.thumb;
      modalProductImg.alt = p.name;
    }

    // Atmospheric Chroma Glow Sync
    if (modalChromaGlow) {
      var glowColor = (p.category === "sil-pak") ? "rgba(217, 119, 6, 0.26)" :
                      (p.category === "akrikor-akrilik" || p.category === "akrikor-kalkan" || p.category === "akrikor-grenli") ? "rgba(37, 99, 235, 0.24)" :
                      (p.category === "hammerite" || p.category === "ahsap-cila") ? "rgba(5, 150, 105, 0.24)" :
                      (p.category === "sentetik-metal") ? "rgba(124, 58, 237, 0.24)" :
                      (p.category === "tavan-std" || p.category === "tavan-fit") ? "rgba(71, 85, 105, 0.24)" :
                      (p.category === "astar-dis" || p.category === "astar-ic") ? "rgba(147, 51, 234, 0.24)" :
                      "rgba(225, 29, 72, 0.24)";
      modalChromaGlow.style.background = "radial-gradient(circle at 50% 50%, " + glowColor + " 0%, rgba(255, 255, 255, 0) 72%)";
    }

    // Right Gauge (Sheen & Drying)
    if (modalGaugeSheen) modalGaugeSheen.textContent = p.tag || p.badge || "İpeksi Mat";
    if (modalGaugeDryingText) {
      var pot = (p.specs && p.specs.potLife) ? p.specs.potLife : "2 – 4 Saat Kuruma";
      if (pot.indexOf("Tam kuruma süresi min 12") !== -1) pot = "12 Saat Kuruma";
      else if (pot.indexOf("4-8 saat") !== -1 || pot.indexOf("4 ile 8") !== -1) pot = "4 – 8 Saat Katlar Arası";
      else if (pot.indexOf("2-3 sa") !== -1) pot = "2 – 3 Saat Kuruma";
      else if (pot.indexOf("12 saat") !== -1) pot = "12 Saat Son Kat";
      else if (pot.length > 25) pot = "2 – 4 Saat Kuruma";
      modalGaugeDryingText.textContent = pot;
    }

    // Sizes Segmented Track
    if (modalSizesContainer) {
      modalSizesContainer.innerHTML = "";
      var sizes = p.sizes || ["Standart Ambalaj"];
      selectedSize = sizes[0];

      sizes.forEach(function(size, idx) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "pv-size-pill" + (idx === 0 ? " active" : "");
        btn.textContent = size;
        btn.setAttribute("role", "radio");
        btn.setAttribute("aria-checked", idx === 0 ? "true" : "false");
        btn.addEventListener("click", function() {
          modalSizesContainer.querySelectorAll(".pv-size-pill").forEach(function(b) {
            b.classList.remove("active");
            b.setAttribute("aria-checked", "false");
          });
          btn.classList.add("active");
          btn.setAttribute("aria-checked", "true");
          selectedSize = size;
          updateAreaCoverage(selectedSize, p);
          updateCanScale(selectedSize);
          updateWhatsAppUrl();
        });
        modalSizesContainer.appendChild(btn);
      });
    }

    // Initial Area calculation & can scale
    updateAreaCoverage(selectedSize, p);
    updateCanScale(selectedSize);

    // TDS link
    if (modalTdsWrap && modalTdsBtn) {
      if (p.tdsUrl) {
        modalTdsBtn.href = p.tdsUrl;
        modalTdsWrap.style.display = "block";
      } else {
        modalTdsWrap.style.display = "none";
      }
    }

    updateWhatsAppUrl();

    if (modalBackdrop) {
      modalBackdrop.classList.add("open");
      modalBackdrop.classList.add("is-open");
      modalBackdrop.setAttribute("aria-hidden", "false");
      if (modalCard) {
        modalCard.classList.add("open");
      }
      document.body.style.overflow = "hidden";
      resetSheetStyles();
    }
  }

  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove("open");
    modalBackdrop.classList.remove("is-open");
    modalBackdrop.setAttribute("aria-hidden", "true");
    if (modalCard) {
      modalCard.classList.remove("open");
    }
    document.body.style.overflow = "";
    resetSheetStyles();
  }

  function updateWhatsAppUrl() {
    if (!currentProduct || !modalWhatsAppBtn) return;
    var text = "Merhaba, Marshall " + currentProduct.name;
    if (selectedSize) {
      text += " (" + selectedSize + ")";
    }
    text += " hakkında güncel şantiye liste fiyatı ve stok bilgisi almak istiyorum.";
    modalWhatsAppBtn.href = "https://wa.me/905323844497?text=" + encodeURIComponent(text);
  }

  // Share button
  if (modalShareBtn) {
    modalShareBtn.addEventListener("click", function() {
      if (!currentProduct) return;
      var shareUrl = window.location.origin + window.location.pathname + "?product=" + currentProduct.id;
      var shareData = {
        title: "Marshall " + currentProduct.name + " | Pervan Yapı Market",
        text: currentProduct.name + " - " + (currentProduct.desc || ""),
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

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", function(e) {
      if (e.target === modalBackdrop) closeModal();
    });
  }
  window.addEventListener("keydown", function(e) {
    if (e.key === "Escape") closeModal();
  });

  // Row click listeners across all sections
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

  // Touch & Mouse gesture physics for mobile bottom sheet dismissal
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
    if (!modalBackdrop || (!modalBackdrop.classList.contains("open") && !modalBackdrop.classList.contains("is-open"))) return;
    if (e.target.closest("button, a, input, select, textarea, .pv-size-pill")) return;

    var touch = e.touches ? e.touches[0] : e;
    dragStartY = touch.clientY;
    dragCurrentY = touch.clientY;
    dragStartTime = Date.now();
    isSheetDragging = false;
    canDragFromScroll = (modalScrollArea && modalScrollArea.scrollTop <= 0);
  }

  function onDragMove(e) {
    if (!modalBackdrop || (!modalBackdrop.classList.contains("open") && !modalBackdrop.classList.contains("is-open")) || !dragStartY) return;
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
    } else if (deltaY < -4 && e.target.closest("#modalTopBar, #modalHandleZone")) {
      isSheetDragging = true;
      if (e.cancelable) e.preventDefault();
      var resisted = deltaY * 0.18;
      modalCard.style.transition = "none";
      modalCard.style.transform = "translateY(" + resisted + "px)";
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
        resetSheetStyles();
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

  if (modalTopBar) {
    modalTopBar.addEventListener("mousedown", onDragStart);
    window.addEventListener("mousemove", function(e) {
      if (dragStartY && isSheetDragging) onDragMove(e);
    });
    window.addEventListener("mouseup", function(e) {
      if (dragStartY && isSheetDragging) onDragEnd(e);
    });
  }

  // 3. SPOTLIGHT COMMAND PALETTE ENGINE (⌘K / 45 Ürün Arama)
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
    return d ? d.short : "Marshall Boya";
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

    var featured = MARSHALL_PRODUCTS_DATA.slice(0, 8);
    var heading = document.createElement("div");
    heading.className = "pv-spotlight-group-title";
    heading.textContent = "Öne Çıkan Marshall Boya Ürünleri";
    spotlightResults.appendChild(heading);

    featured.forEach(function(item) {
      spotlightResults.appendChild(createSpotlightItemEl(item));
    });

    if (spotlightCount) {
      spotlightCount.textContent = MARSHALL_PRODUCTS_DATA.length + " Ürün Kataloğu";
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
    var matches = MARSHALL_PRODUCTS_DATA.filter(function(item) {
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
        var p = MARSHALL_PRODUCTS_DATA.find(function(it) { return it.id === pid; });
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

  // Deep linking via URL hash: #urun-<built-in function id>
  window.addEventListener("load", function() {
    var hash = window.location.hash;
    if (hash && hash.indexOf("#urun-") === 0) {
      var targetId = hash.replace("#urun-", "");
      var p = MARSHALL_PRODUCTS_DATA.find(function(it) { return it.id === targetId; });
      if (p) {
        if (p.deptId && p.deptId !== currentActiveTab) {
          switchTab(p.deptId);
        }
        openModal(targetId);
      }
    }
  });

  // INITIAL SETUP
  renderDeptDrawer("marshallInteriorPanel");
  syncMobileFilterRail("marshallInteriorPanel");
})();
