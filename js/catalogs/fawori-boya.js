/* ==========================================================================
   PERVAN FAWORİ BOYA & ISI YALITIM ARCHITECTURAL CONTROLLER
   1:1 Architectural Standard with Filli Boya RenXMatik
   ========================================================================== */

/* 1. KINETIC HERO STAGE CONTROLLER */
(function() {
  var stage = document.getElementById("pvStageHero");
  if (!stage) return;

  var track = document.getElementById("pvStageTrack");
  if (!track) return;

  var header = document.querySelector("header");
  var slides = stage.querySelectorAll(".pv-stage-slide");
  var prevBtn = document.getElementById("pvStagePrev");
  var nextBtn = document.getElementById("pvStageNext");
  var themeColorTag = document.getElementById("themeColorTag");
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

    var activeHex = slides[index].getAttribute("data-code") || '#D97706';

    slides.forEach(function(slide, idx) {
      slide.classList.toggle("active", idx === index);
    });

    stage.style.setProperty('--pv-chroma-hex', activeHex);
    stage.style.setProperty('--pv-chroma-rgb', hexToRgb(activeHex));
    if (themeColorTag) {
      themeColorTag.setAttribute("content", activeHex);
    }

    // Sync progress lines
    var barWidth = 140 / totalSlides;
    var translateX = index * barWidth;
    stage.querySelectorAll('.pv-stage-progress-bar').forEach(function(bar) {
      bar.style.width = barWidth + 'px';
      bar.style.transform = 'translateX(' + translateX + 'px)';
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
      stopAutoPlay();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", function(e) {
      e.stopPropagation();
      goToSlide(currentIndex + 1, true);
      stopAutoPlay();
    });
  }

  // Keyboard navigation
  window.addEventListener("keydown", function(e) {
    var stageRect = stage.getBoundingClientRect();
    if (stageRect.bottom > 100 && stageRect.top < window.innerHeight) {
      if (e.key === "ArrowLeft") {
        goToSlide(currentIndex - 1, true);
        stopAutoPlay();
      } else if (e.key === "ArrowRight") {
        goToSlide(currentIndex + 1, true);
        stopAutoPlay();
      }
    }
  });

  // Header Transparency Scroll Spy
  function syncHeaderScroll() {
    if (!header) return;
    var scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
    if (scrollY > 380) {
      header.classList.add("header--solid");
    } else {
      header.classList.remove("header--solid");
    }
  }
  window.addEventListener("scroll", syncHeaderScroll, { passive: true });
  syncHeaderScroll();

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayTimer = setInterval(function() {
      goToSlide(currentIndex + 1, true);
    }, 8000);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  }

  stage.addEventListener("mouseenter", stopAutoPlay);
  stage.addEventListener("mouseleave", startAutoPlay);

  // Explore button on opening slide
  var exploreBtn = document.getElementById("pvStageExploreBtn");
  if (exploreBtn) {
    exploreBtn.addEventListener("click", function(e) {
      e.preventDefault();
      goToSlide(1, true);
    });
  }

  // Interactive progress line clicking
  stage.querySelectorAll('.pv-stage-progress-line').forEach(function(line) {
    line.addEventListener('click', function(e) {
      var rect = line.getBoundingClientRect();
      var clickX = e.clientX - rect.left;
      var fraction = Math.max(0, Math.min(1, clickX / rect.width));
      var targetIdx = Math.floor(fraction * totalSlides);
      goToSlide(targetIdx, true);
    });
  });

  goToSlide(0, false);
  startAutoPlay();
})();

/* 2. ARCHITECTURAL CATALOG & SPEC MODAL CONTROLLER */
(function() {
  var products = {
  "dis-cephe-rulosu": {
    "name": "Dış Cephe Rulosu",
    "category": "rulo",
    "tag": "Uygulama Rulosu",
    "sub": "İlk defa boyanacak veya pürüzlü dış cephe yüzeylerinde yüksek emiş gücü sağlayan %100 polyamid rulo.",
    "img": "assets/fawori/dis-cephe-rulosu.webp",
    "sizes": [
      "Standart Ambalaj"
    ],
    "coverage": "Profesyonel Uygulama",
    "sheen": "Tüy Bırakmayan Polyamid Dokuma",
    "drying": "Kullanıma Hazır",
    "surface": "İç/dış cephe, ahşap, metal ve şantiye zeminleri"
  },
  "fawori-premium-dis-cephe-astari": {
    "name": "Fawori Premium Dış Cephe Astarı",
    "category": "astar-dis",
    "tag": "Dış Cephe Astarı",
    "sub": "Silikonlu ve akrilik dış cephe boyaları öncesinde yüzey aderansını artıran ve boya sarfiyatını azaltan astar.",
    "img": "assets/fawori/fawori-premium-dis-cephe-astari.webp",
    "sizes": [
      "20 KG",
      "10 KG",
      "3,5 KG"
    ],
    "coverage": "4,5 – 7,7 m²/kg",
    "sheen": "Yüksek Aderanslı Dış Astar",
    "drying": "4 – 6 Saat (Boya öncesi)",
    "surface": "Brüt beton, mineral sıva, dış cephe yüzeyleri"
  },
  "fawori-premium-silikonlu--dis-cephe-boyasi": {
    "name": "Fawori Premium Silikonlu Dış Cephe Boyası",
    "category": "silikonlu-dis",
    "tag": "Silikonlu Dış Cephe",
    "sub": "Mat görünümlü, canlı renklere sahip, yüksek örtücülük ve su iticilik sağlayan son kat silikonlu dış cephe boyası.",
    "img": "assets/fawori/fawori-premium-silikonlu--dis-cephe-boyasi.webp",
    "sizes": [
      "15 L",
      "7,5 L",
      "2,5 L"
    ],
    "coverage": "7-11 m²/L",
    "sheen": "Silikonlu Mat Dış Cephe",
    "drying": "4 – 6 Saat (Son kat)",
    "surface": "Brüt beton, mineral sıva, dış cephe yüzeyleri"
  },
  "fawori-silikonlu-grenli-kaplama": {
    "name": "Fawori Silikonlu Grenli Kaplama",
    "category": "grenli-tekstur",
    "tag": "Grenli Dış Kaplama",
    "sub": "Silikon katkılı, mercan rulo ile desen verilebilen, cephe kusurlarını kamufle eden elastik grenli dış kaplama.",
    "img": "assets/fawori/fawori-silikonlu-grenli-kaplama.webp",
    "sizes": [
      "25 KG"
    ],
    "coverage": "0,75 – 1,1 m²/kg",
    "sheen": "Grenli / Tekstürlü Doku",
    "drying": "6 – 12 Saat (Tam kürlenme)",
    "surface": "Brüt beton, mineral sıva, dış cephe yüzeyleri"
  },
  "fenomen-saf-akrilik-dis-cephe-boyasi": {
    "name": "Fenomen Saf Akrilik Dış Cephe Boyası",
    "category": "akrilik-saf",
    "tag": "Saf Akrilik Zırh",
    "sub": "%100 saf akrilik bağlayıcılı, esnek elastomerik yapıda, sahil iklimi ve ağır hava koşullarına dayanıklı dış cephe boyası.",
    "img": "assets/fawori/fenomen-saf-akrilik-dis-cephe-boyasi.webp",
    "sizes": [
      "15 L"
    ],
    "coverage": "7-12 m²/L",
    "sheen": "Saf Akrilik Mat (Elastomerik)",
    "drying": "4 – 6 Saat (Son kat)",
    "surface": "Brüt beton, mineral sıva, dış cephe yüzeyleri"
  },
  "tempo-akrilik-dis-cephe-boyasi": {
    "name": "Tempo Akrilik Dış Cephe Boyası",
    "category": "silikonlu-dis",
    "tag": "Silikonlu Dış Cephe",
    "sub": "Akrilik kopolimer emülsiyon esaslı, mat görünümlü, UV ışınlarına ve iklim koşullarına dayanıklı son kat boya.",
    "img": "assets/fawori/tempo-akrilik-dis-cephe-boyasi.webp",
    "sizes": [
      "20 KG"
    ],
    "coverage": "6,5 m²/kg",
    "sheen": "Silikonlu Mat Dış Cephe",
    "drying": "4 – 6 Saat (Son kat)",
    "surface": "Brüt beton, mineral sıva, dış cephe yüzeyleri"
  },
  "tempo-brut-beton-astari": {
    "name": "Tempo Brüt Beton Astarı",
    "category": "astar-dis",
    "tag": "Dış Cephe Astarı",
    "sub": "Brüt beton yüzeylerde sıva ve alçı uygulamaları öncesi tutunmayı artıran polimer modifiye aderans astarı.",
    "img": "assets/fawori/tempo-brut-beton-astari.webp",
    "sizes": [
      "12 KG"
    ],
    "coverage": "4 – 4,5 m²/kg",
    "sheen": "Yüksek Aderanslı Dış Astar",
    "drying": "4 – 6 Saat (Boya öncesi)",
    "surface": "Brüt beton, mineral sıva, dış cephe yüzeyleri"
  },
  "tempo-ozel-teksturlu-dis-cephe-kaplamasi": {
    "name": "Tempo Özel Tekstürlü Dış Cephe Kaplaması",
    "category": "grenli-tekstur",
    "tag": "Grenli Dış Kaplama",
    "sub": "Elyaf katkılı ve silikonlu formülüyle kılcal çatlakları köprüleyen dekoratif tekstürlü dış cephe kaplaması.",
    "img": "assets/fawori/tempo-ozel-teksturlu-dis-cephe-kaplamasi.webp",
    "sizes": [
      "20 KG"
    ],
    "coverage": "0,7 – 1,1 m²/kg",
    "sheen": "Grenli / Tekstürlü Doku",
    "drying": "6 – 12 Saat (Tam kürlenme)",
    "surface": "Brüt beton, mineral sıva, dış cephe yüzeyleri"
  },
  "tempo-silikonlu-dis-cephe-astari": {
    "name": "Tempo Silikonlu Dış Cephe Astarı",
    "category": "astar-dis",
    "tag": "Dış Cephe Astarı",
    "sub": "Yüksek aderans gücüyle boya ile yüzey arasında bağlayıcı köprü kuran nefes alabilen silikonlu dış cephe astarı.",
    "img": "assets/fawori/tempo-silikonlu-dis-cephe-astari.webp",
    "sizes": [
      "20 KG"
    ],
    "coverage": "7,5 m²/kg",
    "sheen": "Yüksek Aderanslı Dış Astar",
    "drying": "4 – 6 Saat (Boya öncesi)",
    "surface": "Brüt beton, mineral sıva, dış cephe yüzeyleri"
  },
  "fawori-optimix-035-beyaz-eps-isi-yalitim-levhasi": {
    "name": "Fawori Optimix 035 Beyaz EPS Isı Yalıtım Levhası",
    "category": "levha",
    "tag": "Beyaz EPS",
    "sub": "20-22 kg/m³ yoğunluklu, TS EN 13163 standartlarında yüksek ısı yalıtım performansı sunan beyaz EPS levha.",
    "img": "assets/fawori/fawori-optimix-035-beyaz-eps-isi-yalitim-levhasi.webp",
    "sizes": [
      "Standart Ambalaj"
    ],
    "coverage": "1 Paket / Ambalaj",
    "sheen": "λ = 0.035 W/mK (Beyaz EPS)",
    "drying": "Montaja Hazır",
    "surface": "Bina dış cephesi, tuğla, gazbeton, betonarme"
  },
  "fawori-optimix-beton-dubeli-celik-civili": {
    "name": "Fawori Optimix Beton Dübeli - Çelik Çivili",
    "category": "dubel-profil",
    "tag": "Montaj Dübeli",
    "sub": "Betonarme yüzeylerde yüksek çekme ve rüzgar vakum yüklerine karşı maksimum tutunma sağlayan çelik çivili dübel.",
    "img": "assets/fawori/fawori-optimix-beton-dubeli-celik-civili.webp",
    "sizes": [
      "Standart Ambalaj"
    ],
    "coverage": "Metraj / Adet Bazlı",
    "sheen": "TS EN Standartlarında Donanım",
    "drying": "Montaja Hazır",
    "surface": "Bina dış cephesi, tuğla, gazbeton, betonarme"
  },
  "fawori-optimix-dekoratif-kaplama-cizgi-dokulu": {
    "name": "Fawori Optimix Dekoratif Mineral Kaplama - Çizgi",
    "category": "mineral",
    "tag": "Dekoratif Sıva",
    "sub": "Çimento esaslı, hafif, yüzeyde dekoratif çizgi dokusu oluşturan nefes alan son kat mineral sıva kaplaması.",
    "img": "assets/fawori/fawori-optimix-dekoratif-kaplama-cizgi-dokulu.webp",
    "sizes": [
      "25 KG Kraft Torba"
    ],
    "coverage": "2,0 – 2,5 kg/m²",
    "sheen": "Doğal Mineral Tane Doku",
    "drying": "24 Saat (Boya öncesi)",
    "surface": "Bina dış cephesi, tuğla, gazbeton, betonarme"
  },
  "fawori-optimix-dekoratif-kaplama-ince-tane-dokulu": {
    "name": "Fawori Optimix Dekoratif Mineral Kaplama - İnce Tane",
    "category": "mineral",
    "tag": "Dekoratif Sıva",
    "sub": "Çimento esaslı, su itici, ince tane dokulu cephe görünümü kazandıran dayanıklı dekoratif mineral kaplama.",
    "img": "assets/fawori/fawori-optimix-dekoratif-kaplama-ince-tane-dokulu.webp",
    "sizes": [
      "25 KG Kraft Torba"
    ],
    "coverage": "2,0 – 2,5 kg/m²",
    "sheen": "Doğal Mineral Tane Doku",
    "drying": "24 Saat (Boya öncesi)",
    "surface": "Bina dış cephesi, tuğla, gazbeton, betonarme"
  },
  "fawori-optimix-dekoratif-kaplama-tane-dokulu": {
    "name": "Fawori Optimix Dekoratif Mineral Kaplama - Tane",
    "category": "mineral",
    "tag": "Dekoratif Sıva",
    "sub": "Isı yalıtım sistemleri için özel formüle edilmiş, tane dokulu homojen son kat dekoratif mineral sıva.",
    "img": "assets/fawori/fawori-optimix-dekoratif-kaplama-tane-dokulu.webp",
    "sizes": [
      "25 KG Kraft Torba"
    ],
    "coverage": "2,0 – 2,5 kg/m²",
    "sheen": "Doğal Mineral Tane Doku",
    "drying": "24 Saat (Boya öncesi)",
    "surface": "Bina dış cephesi, tuğla, gazbeton, betonarme"
  },
  "dekoratif-mineral-kaplama-astari": {
    "name": "Fawori Optimix Dekoratif Mineral Kaplama Astarı",
    "category": "mineral",
    "tag": "Dekoratif Sıva",
    "sub": "Mineral kaplama öncesi yüzey emiciliğini dengeleyen ve aderansı artıran akrilik kopolimer pigmentli astar.",
    "img": "assets/fawori/dekoratif-mineral-kaplama-astari.webp",
    "sizes": [
      "25 KG PE Kova"
    ],
    "coverage": "0,25 – 0,40 kg / m²",
    "sheen": "Doğal Mineral Tane Doku",
    "drying": "24 Saat (Boya öncesi)",
    "surface": "Bina dış cephesi, tuğla, gazbeton, betonarme"
  },
  "fawori-optimix-dubel-plastik-civili": {
    "name": "Fawori Optimix Dübel - Plastik Çivili",
    "category": "dubel-profil",
    "tag": "Montaj Dübeli",
    "sub": "Tuğla ve gazbeton duvarlarda EPS ısı yalıtım levhalarının güvenli montajını sağlayan plastik çivili dübel.",
    "img": "assets/fawori/fawori-optimix-dubel-plastik-civili.webp",
    "sizes": [
      "Standart Ambalaj"
    ],
    "coverage": "Metraj / Adet Bazlı",
    "sheen": "TS EN Standartlarında Donanım",
    "drying": "Montaja Hazır",
    "surface": "Bina dış cephesi, tuğla, gazbeton, betonarme"
  },
  "fawori-optimix-eps-isi-yalitim-levhasi-beyaz": {
    "name": "Fawori Optimix EPS Isı Yalıtım Levhası (Beyaz)",
    "category": "levha",
    "tag": "Beyaz EPS",
    "sub": "TS EN 13163 standartlarına uygun, boyutsal kararlılığı ve buhar geçirgenliği yüksek beyaz EPS levha.",
    "img": "assets/fawori/fawori-optimix-eps-isi-yalitim-levhasi-beyaz.webp",
    "sizes": [
      "Standart Ambalaj"
    ],
    "coverage": "1 Paket / Ambalaj",
    "sheen": "λ = 0.035 W/mK (Beyaz EPS)",
    "drying": "Montaja Hazır",
    "surface": "Bina dış cephesi, tuğla, gazbeton, betonarme"
  },
  "fawori-optimix-eps-isi-yalitim-levhasi-karbonlu": {
    "name": "Fawori Optimix EPS Isı Yalıtım Levhası (Karbonlu)",
    "category": "levha",
    "tag": "Karbonlu EPS",
    "sub": "Grafit katkısıyla λ = 0,031-0,032 W/mK seviyesinde üstün enerji tasarrufu sağlayan karbonlu EPS levha.",
    "img": "assets/fawori/fawori-optimix-eps-isi-yalitim-levhasi-karbonlu.webp",
    "sizes": [
      "Standart Ambalaj"
    ],
    "coverage": "1 Paket / Ambalaj",
    "sheen": "λ = 0.031 W/mK (Karbonlu EPS)",
    "drying": "Montaja Hazır",
    "surface": "Bina dış cephesi, tuğla, gazbeton, betonarme"
  },
  "fawori-optimix-f160-donati-filesi": {
    "name": "Fawori Optimix F160 Donatı Filesi",
    "category": "dubel-profil",
    "tag": "Donatı Filesi",
    "sub": "Alkali ortamlara dirençli, 160 g/m² ağırlığında, çatlama önleyici yüksek mukavemetli cam iplik donatı filesi.",
    "img": "assets/fawori/fawori-optimix-f160-donati-filesi.webp",
    "sizes": [
      "50m2 (1m x 50m)"
    ],
    "coverage": "Metraj / Adet Bazlı",
    "sheen": "TS EN Standartlarında Donanım",
    "drying": "Montaja Hazır",
    "surface": "Bina dış cephesi, tuğla, gazbeton, betonarme"
  },
  "fawori-optimix-fileli-fuga-profili": {
    "name": "Fawori Optimix Fileli Fuga Profili",
    "category": "dubel-profil",
    "tag": "Donatı Filesi",
    "sub": "Dış cephe ısı yalıtım sistemlerinde dekoratif fuga hatları oluşturan su tahliye kanallı PVC profil.",
    "img": "assets/fawori/fawori-optimix-fileli-fuga-profili.webp",
    "sizes": [
      "10 adet",
      "30 m"
    ],
    "coverage": "Metraj / Adet Bazlı",
    "sheen": "TS EN Standartlarında Donanım",
    "drying": "Montaja Hazır",
    "surface": "Bina dış cephesi, tuğla, gazbeton, betonarme"
  },
  "fawori-optimix-isi-yalitim-siva-harci": {
    "name": "Fawori Optimix Isı Yalıtım Sıva Harcı",
    "category": "harc",
    "tag": "Yalıtım Sıvası",
    "sub": "EPS ve taşyünü levhalar üzerine fileyle birlikte uygulanan, çatlamaya dirençli esnek çimento esaslı sıva harcı.",
    "img": "assets/fawori/fawori-optimix-isi-yalitim-siva-harci.webp",
    "sizes": [
      "25 KG kraft torba"
    ],
    "coverage": "Polistren levha için : 4,0-4,5 kg/m² Taşyünü levha için : 5,5-6,5 kg/m² Belirtilen sarfiyat miktarlarının yüzey ve uygulama şartlarına göre farklılık gösterebileceği dikkate alınmalıdır. Kesin sarfiyat için kontrollü numune yapılmalıdır.",
    "sheen": "Polimer Katkılı Çimento Esaslı",
    "drying": "24 – 48 Saat (Kürlenme)",
    "surface": "Bina dış cephesi, tuğla, gazbeton, betonarme"
  },
  "fawori-optimix-isi-yalitim-yapistirma-harci": {
    "name": "Fawori Optimix Isı Yalıtım Yapıştırma Harcı",
    "category": "harc",
    "tag": "Yalıtım Yapıştırıcı",
    "sub": "Isı yalıtım levhalarını mineral yüzeylere güçlü bir şekilde tutturan, kayma dirençli çimento esaslı yapıştırıcı.",
    "img": "assets/fawori/fawori-optimix-isi-yalitim-yapistirma-harci.webp",
    "sizes": [
      "25 KG kraft torba"
    ],
    "coverage": "Polistren levha için : 4,0-4,5 kg/m² Taşyünü levha için : 5,5-6,5 kg/m² Belirtilen sarfiyat miktarlarının yüzey ve uygulama şartlarına göre farklılık gösterebileceği dikkate alınmalıdır. Kesin sarfiyat için kontrollü numune yapılmalıdır.",
    "sheen": "Polimer Katkılı Çimento Esaslı",
    "drying": "24 – 48 Saat (Kürlenme)",
    "surface": "Bina dış cephesi, tuğla, gazbeton, betonarme"
  },
  "fawori-optimix-PVC-denizlik-uzatma-profili": {
    "name": "Fawori Optimix PVC Denizlik Uzatma Profili",
    "category": "dubel-profil",
    "tag": "Köşe Profili",
    "sub": "Pencere denizliklerinin yetersiz kaldığı mantolama cephelerinde su tahliyesini uzatan kendinden fileli profil.",
    "img": "assets/fawori/fawori-optimix-PVC-denizlik-uzatma-profili.webp",
    "sizes": [
      "5 cm’lik : 25 adet",
      "75 m 8 cm’lik : 20 adet",
      "60 m"
    ],
    "coverage": "Metraj / Adet Bazlı",
    "sheen": "TS EN Standartlarında Donanım",
    "drying": "Montaja Hazır",
    "surface": "Bina dış cephesi, tuğla, gazbeton, betonarme"
  },
  "fawori-optimix-PVC-fileli-kose-profili": {
    "name": "Fawori Optimix PVC Fileli Köşe Profili",
    "category": "dubel-profil",
    "tag": "Donatı Filesi",
    "sub": "Bina köşe ve pencere kenarlarını darbelere karşı koruyan, düzgün hat sağlayan 2,5 m fileli PVC köşe profili.",
    "img": "assets/fawori/fawori-optimix-PVC-fileli-kose-profili.webp",
    "sizes": [
      "50 adet",
      "125 m"
    ],
    "coverage": "Metraj / Adet Bazlı",
    "sheen": "TS EN Standartlarında Donanım",
    "drying": "Montaja Hazır",
    "surface": "Bina dış cephesi, tuğla, gazbeton, betonarme"
  },
  "fawori-optimix-tasyunu-dubel-pulu": {
    "name": "Fawori Optimix Taşyünü Dübel Pulu",
    "category": "dubel-profil",
    "tag": "Montaj Dübeli",
    "sub": "Taşyünü levha mantolamasında basma alanını 9 cm çapa genişleterek liflerin ezilmesini önleyen dübel pulu.",
    "img": "assets/fawori/fawori-optimix-tasyunu-dubel-pulu.webp",
    "sizes": [
      "Standart Ambalaj"
    ],
    "coverage": "Metraj / Adet Bazlı",
    "sheen": "TS EN Standartlarında Donanım",
    "drying": "Montaja Hazır",
    "surface": "Bina dış cephesi, tuğla, gazbeton, betonarme"
  },
  "fawori-optimix-tasyunu-dubeli-celik-civili": {
    "name": "Fawori Optimix Taşyünü Dübeli - Çelik Çivili",
    "category": "dubel-profil",
    "tag": "Montaj Dübeli",
    "sub": "Taşyünü yalıtım sistemlerinde yangın güvenliği ve ağır yük dayanımı sağlayan çelik çivili montaj dübeli.",
    "img": "assets/fawori/fawori-optimix-tasyunu-dubeli-celik-civili.webp",
    "sizes": [
      "Standart Ambalaj"
    ],
    "coverage": "Metraj / Adet Bazlı",
    "sheen": "TS EN Standartlarında Donanım",
    "drying": "Montaja Hazır",
    "surface": "Bina dış cephesi, tuğla, gazbeton, betonarme"
  },
  "fawori-donusum-astari": {
    "name": "Fawori Dönüşüm Astarı",
    "category": "astar",
    "tag": "Aderans Astarı",
    "sub": "Sentetik boyalı yüzeylerden su bazlı boyalara geçişte tutunmayı sağlayan beyaz pigmentli dönüşüm astarı.",
    "img": "assets/fawori/fawori-donusum-astari.webp",
    "sizes": [
      "20 KG",
      "10 KG",
      "3,5 KG"
    ],
    "coverage": "1 kg ile tek katta 5-9,6 m²",
    "sheen": "Örtücü Beyaz Astar",
    "drying": "2 – 4 Saat (Boya öncesi)",
    "surface": "Eski boyalı veya yeni emici mineral yüzeyler"
  },
  "konsantre-astar": {
    "name": "Fawori Konsantre Astar",
    "category": "astar",
    "tag": "Aderans Astarı",
    "sub": "Alçı, kireç badana ve gazbeton gibi yüksek emici yüzeylerde boya sarfiyatını azaltan su bazlı konsantre astar.",
    "img": "assets/fawori/konsantre-astar.webp",
    "sizes": [
      "15 L",
      "7,5 L",
      "2,5 L",
      "0,75 L"
    ],
    "coverage": "95-160 m²/L 1/7 130-220 m²/L 1/10",
    "sheen": "Örtücü Beyaz Astar",
    "drying": "2 – 4 Saat (Boya öncesi)",
    "surface": "Eski boyalı veya yeni emici mineral yüzeyler"
  },
  "fawori-kozmik-ipek": {
    "name": "Fawori Kozmik İpek",
    "category": "kozmik-ultra",
    "tag": "İpeksi Mat",
    "sub": "Silikon esaslı, ipeksi mat dokuya sahip, leke tutmayan ve tam silinebilir birinci sınıf iç cephe boyası.",
    "img": "assets/fawori/fawori-kozmik-ipek.webp",
    "sizes": [
      "15 L",
      "7,5 L",
      "2,5 L"
    ],
    "coverage": "13-25,3 m²/L",
    "sheen": "İpeksi Mat (Silinebilir)",
    "drying": "2 – 4 Saat (Kat arası)",
    "surface": "İç mekan sıva, alçı, macun, alçıpan, betopan"
  },
  "fawori-macun": {
    "name": "Fawori Macun",
    "category": "astar",
    "tag": "Pürüzsüz Dolgu",
    "sub": "İç mekan duvar ve tavanlardaki pürüzleri gideren, kolay zımparalanan ve çatlamayan dolgu macunu.",
    "img": "assets/fawori/fawori-macun.webp",
    "sizes": [
      "1,1 KG"
    ],
    "coverage": "Uygulama yüzeyi ve kat sayısına bağlıdır",
    "sheen": "Pürüzsüz Dolgu & Yoklama",
    "drying": "2 – 4 Saat (Zımpara öncesi)",
    "surface": "İç mekan duvar ve tavan çatlak/pürüzleri"
  },
  "fawori-panel-kapi-boyasi": {
    "name": "Fawori Panel Kapı Boyası",
    "category": "tavan-kapi",
    "tag": "Su Bazlı Kapı",
    "sub": "Amerikan panel kapılar ve ahşap doğramalar için sararmayan, su bazlı ve silinebilir yarı mat kapı boyası.",
    "img": "assets/fawori/fawori-panel-kapi-boyasi.webp",
    "sizes": [
      "2,5 L",
      "0,75 L"
    ],
    "coverage": "13-23 m²/L",
    "sheen": "Yarı Mat Su Bazlı",
    "drying": "4 – 6 Saat (Kat arası)",
    "surface": "Amerikan panel kapı, masif ahşap"
  },
  "fawori-plastik": {
    "name": "Fawori Plastik",
    "category": "mat-silikonlu",
    "tag": "Plastik Mat",
    "sub": "Mat görünümlü, yüksek örtücülüğe sahip, kolay uygulanan ekonomik emülsiyon esaslı iç cephe plastik boyası.",
    "img": "assets/fawori/fawori-plastik.webp",
    "sizes": [
      "20 KG",
      "10 KG",
      "3,5 KG"
    ],
    "coverage": "Sarfiyat kısmını 1 kg ile tek katta 8-16 m²",
    "sheen": "Dekoratif Mat",
    "drying": "2 – 4 Saat (Kat arası)",
    "surface": "İç mekan sıva, alçı, macun, alçıpan, betopan"
  },
  "fawori-pro-astar": {
    "name": "Fawori Pro Astar",
    "category": "astar",
    "tag": "Aderans Astarı",
    "sub": "Yeni mineral yüzeylerde son kat boyanın örtücülüğünü artıran beyaz pigmentli ince dokulu iç cephe astarı.",
    "img": "assets/fawori/fawori-pro-astar.webp",
    "sizes": [
      "20 KG",
      "10 KG",
      "3,5 KG"
    ],
    "coverage": "1 kg ile tek katta 7,8-11 m²",
    "sheen": "Örtücü Beyaz Astar",
    "drying": "2 – 4 Saat (Boya öncesi)",
    "surface": "Eski boyalı veya yeni emici mineral yüzeyler"
  },
  "Fawori-seramik-ustu-astar": {
    "name": "Fawori Seramik Üstü Astar",
    "category": "astar",
    "tag": "Aderans Astarı",
    "sub": "Mevcut seramik ve fayans yüzeyler kırılmadan üzerine kaplama yapılmasını sağlayan yüksek aderanslı astar.",
    "img": "assets/fawori/Fawori-seramik-ustu-astar.webp",
    "sizes": [
      "3,5 KG"
    ],
    "coverage": "1 Kg ile tek katta 10-16 m²",
    "sheen": "Örtücü Beyaz Astar",
    "drying": "2 – 4 Saat (Boya öncesi)",
    "surface": "Eski boyalı veya yeni emici mineral yüzeyler"
  },
  "fawori-silikonlu-mat": {
    "name": "Fawori Silikonlu Mat",
    "category": "mat-silikonlu",
    "tag": "Silikonlu Mat",
    "sub": "Silikon katkısı sayesinde yüksek nefes alma ve silinme direnci sunan dekoratif mat iç cephe boyası.",
    "img": "assets/fawori/fawori-silikonlu-mat.webp",
    "sizes": [
      "20 KG",
      "10 KG",
      "3,5 KG"
    ],
    "coverage": "1 kg ile tek katta 8-11 m²",
    "sheen": "Dekoratif Mat",
    "drying": "2 – 4 Saat (Kat arası)",
    "surface": "İç mekan sıva, alçı, macun, alçıpan, betopan"
  },
  "seffaf-astar": {
    "name": "Fawori Şeffaf Astar",
    "category": "astar",
    "tag": "Aderans Astarı",
    "sub": "Alçılı ve tozuyan yüzeyleri bağlayarak boya sarfiyatını düşüren kullanıma hazır şeffaf iç cephe astarı.",
    "img": "assets/fawori/seffaf-astar.webp",
    "sizes": [
      "20 L",
      "5 L"
    ],
    "coverage": "1 L ile tek katta 8-12,5 m²",
    "sheen": "Şeffaf Aderans Astarı",
    "drying": "2 – 4 Saat (Boya öncesi)",
    "surface": "Eski boyalı veya yeni emici mineral yüzeyler"
  },
  "fawori-tavan-extra": {
    "name": "Fawori Tavan Extra",
    "category": "tavan-kapi",
    "tag": "Ekstra Beyaz Tavan",
    "sub": "Rulo ve fırça izi bırakmayan, ekstra beyaz ve mat dokulu, yüksek kapatıcılığa sahip tavan boyası.",
    "img": "assets/fawori/fawori-tavan-extra.webp",
    "sizes": [
      "17,5 KG",
      "10 KG",
      "3,5 KG"
    ],
    "coverage": "5,5 - 9,5 m²/kg",
    "sheen": "Tam Mat Beyaz (Işık Yansıtmaz)",
    "drying": "2 – 3 Saat (Tam kuruma)",
    "surface": "Tavan yüzeyleri, mineral sıvalar"
  },
  "fawori-ultra-soft-mat": {
    "name": "Fawori Ultra Soft Mat",
    "category": "kozmik-ultra",
    "tag": "Ultra Soft Mat",
    "sub": "Işığı mükemmel dağıtan soft mat dokulu, parlama yapmayan, tam silinebilir lüks su bazlı iç cephe boyası.",
    "img": "assets/fawori/fawori-ultra-soft-mat.webp",
    "sizes": [
      "15 L",
      "7,5 L",
      "2,5 L"
    ],
    "coverage": "13-24 m²/L",
    "sheen": "Ultra Soft Mat",
    "drying": "2 – 4 Saat (Kat arası)",
    "surface": "İç mekan sıva, alçı, macun, alçıpan, betopan"
  },
  "tempo-binder-konsantre-astar": {
    "name": "Tempo Binder (Konsantre Astar)",
    "category": "astar",
    "tag": "Aderans Astarı",
    "sub": "Gözenekli yüzeylerde boya emilimini dengeleyen, tozuma önleyici ekonomik konsantre astar.",
    "img": "assets/fawori/tempo-binder-konsantre-astar.webp",
    "sizes": [
      "15 L",
      "2,5 L"
    ],
    "coverage": "Uygulama yüzeyi ve kat sayısına bağlıdır",
    "sheen": "Örtücü Beyaz Astar",
    "drying": "2 – 4 Saat (Boya öncesi)",
    "surface": "Eski boyalı veya yeni emici mineral yüzeyler"
  },
  "tempo-ozel-ipek-silikonlu": {
    "name": "Tempo Özel İpek Silikonlu",
    "category": "mat-silikonlu",
    "tag": "Silikonlu Mat",
    "sub": "Silikonlu, silinebilme özelliği olan, ipek mat dokuda dekoratif son kat su bazlı iç cephe boyası.",
    "img": "assets/fawori/tempo-ozel-ipek-silikonlu.webp",
    "sizes": [
      "20 KG",
      "10 KG",
      "3,5 KG"
    ],
    "coverage": "1 L ile tek katta 13-20 m²",
    "sheen": "İpeksi Mat (Silinebilir)",
    "drying": "2 – 4 Saat (Kat arası)",
    "surface": "İç mekan sıva, alçı, macun, alçıpan, betopan"
  },
  "tempo-ozel-plastik": {
    "name": "Tempo Özel Plastik",
    "category": "mat-silikonlu",
    "tag": "Plastik Mat",
    "sub": "Dekoratif mat bitişli, kokusuz, kolay uygulanan ekonomik iç cephe plastik duvar boyası.",
    "img": "assets/fawori/tempo-ozel-plastik.webp",
    "sizes": [
      "20 KG",
      "10 KG",
      "3,5 KG"
    ],
    "coverage": "1 L ile tek katta 10,5 m²",
    "sheen": "Dekoratif Mat",
    "drying": "2 – 4 Saat (Kat arası)",
    "surface": "İç mekan sıva, alçı, macun, alçıpan, betopan"
  },
  "tempo-ozel-tavan": {
    "name": "Tempo Özel Tavan",
    "category": "tavan-kapi",
    "tag": "Ekstra Beyaz Tavan",
    "sub": "Ekstra örtücü, mat beyaz dokulu, nefes alma kabiliyeti yüksek ekonomik tavan boyası.",
    "img": "assets/fawori/tempo-ozel-tavan.webp",
    "sizes": [
      "17,5 KG",
      "10 KG",
      "3,5 KG"
    ],
    "coverage": "1 L ile tek katta 5-9 m²",
    "sheen": "Tam Mat Beyaz (Işık Yansıtmaz)",
    "drying": "2 – 3 Saat (Tam kuruma)",
    "surface": "Tavan yüzeyleri, mineral sıvalar"
  },
  "tempo-silikonlu-mat": {
    "name": "Tempo Silikonlu Mat",
    "category": "mat-silikonlu",
    "tag": "Silikonlu Mat",
    "sub": "Silikonlu yapısıyla nem direnci sağlayan, fırça izi bırakmayan mat dekoratif iç cephe boyası.",
    "img": "assets/fawori/tempo-silikonlu-mat.webp",
    "sizes": [
      "20 KG",
      "10 KG",
      "3,5 KG"
    ],
    "coverage": "1 L ile tek katta 13-20 m²",
    "sheen": "Dekoratif Mat",
    "drying": "2 – 4 Saat (Kat arası)",
    "surface": "İç mekan sıva, alçı, macun, alçıpan, betopan"
  },
  "tempo-universal-astar": {
    "name": "Tempo Universal Astar",
    "category": "astar",
    "tag": "Aderans Astarı",
    "sub": "İç cephede son kat boyanın yüzeye homojen tutunmasını sağlayan örtücü beyaz astar.",
    "img": "assets/fawori/tempo-universal-astar.webp",
    "sizes": [
      "15 L",
      "7,5 L",
      "2,5 L"
    ],
    "coverage": "14-20 m²/L",
    "sheen": "Örtücü Beyaz Astar",
    "drying": "2 – 4 Saat (Boya öncesi)",
    "surface": "Eski boyalı veya yeni emici mineral yüzeyler"
  },
  "akrilik-sprey-boya": {
    "name": "Akrilik Sprey Boya",
    "category": "sprey",
    "tag": "Akrilik Sprey",
    "sub": "Ahşap, metal, cam ve sert plastik yüzeylerde hızlı kuruyan parlak ve mat renkli akrilik sprey boya.",
    "img": "assets/fawori/akrilik-sprey-boya.webp",
    "sizes": [
      "Standart Ambalaj"
    ],
    "coverage": "2.0 – 2.5 m² / Kutu",
    "sheen": "Hızlı Kuruyan Akrilik Parlak",
    "drying": "15 – 20 Dakika (Dokunma)",
    "surface": "İç/dış cephe, ahşap, metal ve şantiye zeminleri"
  },
  "akrilik-sprey-vernik": {
    "name": "Akrilik Sprey Vernik",
    "category": "sprey",
    "tag": "Akrilik Sprey",
    "sub": "Hobi ve dekorasyon projelerinde yüzeyi sararmadan koruyan, çizilmeye dayanıklı akrilik sprey vernik.",
    "img": "assets/fawori/akrilik-sprey-vernik.webp",
    "sizes": [
      "Standart Ambalaj"
    ],
    "coverage": "2.0 – 2.5 m² / Kutu",
    "sheen": "Hızlı Kuruyan Akrilik Parlak",
    "drying": "15 – 20 Dakika (Dokunma)",
    "surface": "İç/dış cephe, ahşap, metal ve şantiye zeminleri"
  },
  "ekstra-plastik-rulo": {
    "name": "Ekstra Plastik Rulo",
    "category": "rulo",
    "tag": "Uygulama Rulosu",
    "sub": "İç cephe plastik ve akrilik boyalarında damlatma yapmayan, homojen dağılım sağlayan polyamid rulo.",
    "img": "assets/fawori/ekstra-plastik-rulo.webp",
    "sizes": [
      "Standart Ambalaj"
    ],
    "coverage": "Profesyonel Uygulama",
    "sheen": "Tüy Bırakmayan Polyamid Dokuma",
    "drying": "Kullanıma Hazır",
    "surface": "İç/dış cephe, ahşap, metal ve şantiye zeminleri"
  },
  "floresan-sprey-boya": {
    "name": "Floresan Sprey Boya",
    "category": "sprey",
    "tag": "Akrilik Sprey",
    "sub": "Güvenlik, işaretleme ve hobi amaçlı projelerde karanlıkta fark edilen canlı neon renkli sprey boya.",
    "img": "assets/fawori/floresan-sprey-boya.webp",
    "sizes": [
      "Standart Ambalaj"
    ],
    "coverage": "2.0 – 2.5 m² / Kutu",
    "sheen": "Hızlı Kuruyan Akrilik Parlak",
    "drying": "15 – 20 Dakika (Dokunma)",
    "surface": "İç/dış cephe, ahşap, metal ve şantiye zeminleri"
  },
  "nitril-eldiven": {
    "name": "FWR5 Nitril Eldiven - Kırmızı/Siyah",
    "category": "destek",
    "tag": "Şantiye Ekipmanı",
    "sub": "Boya, tiner ve kimyasal temasında eli tahrişten koruyan esnek, pudrasız mavi nitril iş eldiveni.",
    "img": "assets/fawori/nitril-eldiven.webp",
    "sizes": [
      "Standart Ambalaj"
    ],
    "coverage": "Koruma & Uygulama Donanımı",
    "sheen": "Ağır Hizmet Şantiye Tipi",
    "drying": "Kullanıma Hazır",
    "surface": "İç/dış cephe, ahşap, metal ve şantiye zeminleri"
  },
  "nitril-eldiven-sari": {
    "name": "FWR5 Nitril Eldiven - Sarı",
    "category": "destek",
    "tag": "Şantiye Ekipmanı",
    "sub": "Ağır şantiye işlerinde aşınma ve delinmeye karşı üstün koruma sağlayan sarı kaplamalı iş eldiveni.",
    "img": "assets/fawori/nitril-eldiven-sari.webp",
    "sizes": [
      "Standart Ambalaj"
    ],
    "coverage": "Koruma & Uygulama Donanımı",
    "sheen": "Ağır Hizmet Şantiye Tipi",
    "drying": "Kullanıma Hazır",
    "surface": "İç/dış cephe, ahşap, metal ve şantiye zeminleri"
  },
  "isiya-dayanikli-sprey-boya": {
    "name": "Isıya Dayanıklı Sprey Boya",
    "category": "sprey",
    "tag": "Akrilik Sprey",
    "sub": "Soba, mangal, egzoz ve kazan yüzeylerinde 600°C ısıya kadar dayanım gösteren silikonlu sprey boya.",
    "img": "assets/fawori/isiya-dayanikli-sprey-boya.webp",
    "sizes": [
      "Standart Ambalaj"
    ],
    "coverage": "2.0 – 2.5 m² / Kutu",
    "sheen": "Hızlı Kuruyan Akrilik Parlak",
    "drying": "15 – 20 Dakika (Dokunma)",
    "surface": "İç/dış cephe, ahşap, metal ve şantiye zeminleri"
  },
  "jant-boyasi": {
    "name": "Jant Boyası",
    "category": "destek",
    "tag": "Şantiye Ekipmanı",
    "sub": "Araç jantlarında taş çarpmalarına ve balata tozuna karşı dirençli metalik alüminyum gri jant boyası.",
    "img": "assets/fawori/jant-boyasi.webp",
    "sizes": [
      "Standart Ambalaj"
    ],
    "coverage": "Koruma & Uygulama Donanımı",
    "sheen": "Ağır Hizmet Şantiye Tipi",
    "drying": "Kullanıma Hazır",
    "surface": "İç/dış cephe, ahşap, metal ve şantiye zeminleri"
  },
  "kestirme-firca": {
    "name": "Kestirme Fırça",
    "category": "firca",
    "tag": "Uygulama Fırçası",
    "sub": "Duvar köşeleri ve tavan birleşimlerinde kıl dökmeyen, epoksi yapıştırıcılı profesyonel kestirme fırçası.",
    "img": "assets/fawori/kestirme-firca.webp",
    "sizes": [
      "Standart Ambalaj"
    ],
    "coverage": "Hassas Kestirme & Boyama",
    "sheen": "Kıl Dökmeyen Epoksi Yapıştırma",
    "drying": "Kullanıma Hazır",
    "surface": "İç/dış cephe, ahşap, metal ve şantiye zeminleri"
  },
  "koruma-ortusu": {
    "name": "Koruma Örtüsü",
    "category": "destek",
    "tag": "Şantiye Ekipmanı",
    "sub": "Boya ve tadilat sırasında mobilyaları, zeminleri toz ve boya damlalarından koruyan polietilen örtü.",
    "img": "assets/fawori/koruma-ortusu.webp",
    "sizes": [
      "Standart Ambalaj"
    ],
    "coverage": "Koruma & Uygulama Donanımı",
    "sheen": "Ağır Hizmet Şantiye Tipi",
    "drying": "Kullanıma Hazır",
    "surface": "İç/dış cephe, ahşap, metal ve şantiye zeminleri"
  },
  "kozmik-ipek-rulo": {
    "name": "Kozmik İpek Rulo",
    "category": "rulo",
    "tag": "Uygulama Rulosu",
    "sub": "Kozmik İpek ve soft mat boyaların duvarda pürüzsüz kadife doku oluşturmasını sağlayan mikroelyaf rulo.",
    "img": "assets/fawori/kozmik-ipek-rulo.webp",
    "sizes": [
      "Standart Ambalaj"
    ],
    "coverage": "Profesyonel Uygulama",
    "sheen": "Tüy Bırakmayan Polyamid Dokuma",
    "drying": "Kullanıma Hazır",
    "surface": "İç/dış cephe, ahşap, metal ve şantiye zeminleri"
  },
  "krom-efekt-sprey-boya": {
    "name": "Krom Efekt Sprey Boya",
    "category": "sprey",
    "tag": "Akrilik Sprey",
    "sub": "Dekoratif objelerde, metal ve ahşap detaylarda parlak ayna krom efekti oluşturan estetik sprey boya.",
    "img": "assets/fawori/krom-efekt-sprey-boya.webp",
    "sizes": [
      "Standart Ambalaj"
    ],
    "coverage": "2.0 – 2.5 m² / Kutu",
    "sheen": "Hızlı Kuruyan Akrilik Parlak",
    "drying": "15 – 20 Dakika (Dokunma)",
    "surface": "İç/dış cephe, ahşap, metal ve şantiye zeminleri"
  },
  "maskeleme-bandi": {
    "name": "Maskeleme Bandı",
    "category": "destek",
    "tag": "Şantiye Ekipmanı",
    "sub": "Boya uygulamalarında keskin hatlar sağlayan, söküldüğünde iz ve yapışkan bırakmayan kağıt bant.",
    "img": "assets/fawori/maskeleme-bandi.webp",
    "sizes": [
      "Standart Ambalaj"
    ],
    "coverage": "Koruma & Uygulama Donanımı",
    "sheen": "Ağır Hizmet Şantiye Tipi",
    "drying": "Kullanıma Hazır",
    "surface": "İç/dış cephe, ahşap, metal ve şantiye zeminleri"
  },
  "mercan-rulo": {
    "name": "Mercan Rulo",
    "category": "rulo",
    "tag": "Uygulama Rulosu",
    "sub": "Grenli dış cephe boyaları ve dekoratif kaplamalarda homojen gözenekli desen oluşturan mercan rulo.",
    "img": "assets/fawori/mercan-rulo.webp",
    "sizes": [
      "Standart Ambalaj"
    ],
    "coverage": "Profesyonel Uygulama",
    "sheen": "Tüy Bırakmayan Polyamid Dokuma",
    "drying": "Kullanıma Hazır",
    "surface": "İç/dış cephe, ahşap, metal ve şantiye zeminleri"
  },
  "metal-teleskopik-sap": {
    "name": "Metal Teleskopik Sap",
    "category": "destek",
    "tag": "Şantiye Ekipmanı",
    "sub": "Tavan ve yüksek cephe boyamalarında 2-3 metreye kadar kilitlenebilen hafif alüminyum teleskopik sırık.",
    "img": "assets/fawori/metal-teleskopik-sap.webp",
    "sizes": [
      "Standart Ambalaj"
    ],
    "coverage": "Koruma & Uygulama Donanımı",
    "sheen": "Ağır Hizmet Şantiye Tipi",
    "drying": "Kullanıma Hazır",
    "surface": "İç/dış cephe, ahşap, metal ve şantiye zeminleri"
  },
  "metalik-sprey-boya": {
    "name": "Metalik Sprey Boya",
    "category": "sprey",
    "tag": "Akrilik Sprey",
    "sub": "Ahşap, metal ve dekoratif aksesuarlara göz alıcı simli metalik ışıltı veren hızlı kuruyan sprey boya.",
    "img": "assets/fawori/metalik-sprey-boya.webp",
    "sizes": [
      "Standart Ambalaj"
    ],
    "coverage": "2.0 – 2.5 m² / Kutu",
    "sheen": "Hızlı Kuruyan Akrilik Parlak",
    "drying": "15 – 20 Dakika (Dokunma)",
    "surface": "İç/dış cephe, ahşap, metal ve şantiye zeminleri"
  },
  "mini-rulo": {
    "name": "Mini Rulo",
    "category": "rulo",
    "tag": "Uygulama Rulosu",
    "sub": "Radyatör arkaları, kapı pervazları ve dar yüzeylerde pürüzsüz boyama sağlayan pratik mini parmak rulo.",
    "img": "assets/fawori/mini-rulo.webp",
    "sizes": [
      "Standart Ambalaj"
    ],
    "coverage": "Profesyonel Uygulama",
    "sheen": "Tüy Bırakmayan Polyamid Dokuma",
    "drying": "Kullanıma Hazır",
    "surface": "İç/dış cephe, ahşap, metal ve şantiye zeminleri"
  },
  "pas-sokucu": {
    "name": "Pas Sökücü",
    "category": "sprey",
    "tag": "Pas Sökücü",
    "sub": "Paslanmış cıvata ve mekanik parçaları çözen, yağlayarak pas oluşumunu geciktiren teknik sprey.",
    "img": "assets/fawori/pas-sokucu.webp",
    "sizes": [
      "Standart Ambalaj"
    ],
    "coverage": "Koruma & Uygulama Donanımı",
    "sheen": "Ağır Hizmet Şantiye Tipi",
    "drying": "Kullanıma Hazır",
    "surface": "İç/dış cephe, ahşap, metal ve şantiye zeminleri"
  },
  "pratik-branda": {
    "name": "Pratik Branda",
    "category": "destek",
    "tag": "Şantiye Ekipmanı",
    "sub": "Şantiye zeminlerini boya damlaları, harç ve darbelerden koruyan ağır hizmet tipi polietilen branda.",
    "img": "assets/fawori/pratik-branda.webp",
    "sizes": [
      "Standart Ambalaj"
    ],
    "coverage": "Koruma & Uygulama Donanımı",
    "sheen": "Ağır Hizmet Şantiye Tipi",
    "drying": "Kullanıma Hazır",
    "surface": "İç/dış cephe, ahşap, metal ve şantiye zeminleri"
  },
  "robot-firca": {
    "name": "Robot Fırça",
    "category": "firca",
    "tag": "Uygulama Fırçası",
    "sub": "Açılı kıl yapısıyla kalorifer petek araları ve kör noktalarda boya yapmayı kolaylaştıran robot fırça.",
    "img": "assets/fawori/robot-firca.webp",
    "sizes": [
      "Standart Ambalaj"
    ],
    "coverage": "Hassas Kestirme & Boyama",
    "sheen": "Kıl Dökmeyen Epoksi Yapıştırma",
    "drying": "Kullanıma Hazır",
    "surface": "İç/dış cephe, ahşap, metal ve şantiye zeminleri"
  },
  "rulo-elegi": {
    "name": "Rulo Eleği",
    "category": "destek",
    "tag": "Şantiye Ekipmanı",
    "sub": "Rulodaki fazla boyayı homojen olarak süzerek damlatmayı önleyen mukavemetli plastik boya ızgarası.",
    "img": "assets/fawori/rulo-elegi.webp",
    "sizes": [
      "Standart Ambalaj"
    ],
    "coverage": "Profesyonel Uygulama",
    "sheen": "Tüy Bırakmayan Polyamid Dokuma",
    "drying": "Kullanıma Hazır",
    "surface": "İç/dış cephe, ahşap, metal ve şantiye zeminleri"
  },
  "rulo-sunger-zimpara": {
    "name": "Rulo Sünger Zımpara",
    "category": "destek",
    "tag": "Şantiye Ekipmanı",
    "sub": "Macunlu ve astarlı yüzeylerin kavislerine uyum sağlayan, tıkanmayan esnek sünger zımpara.",
    "img": "assets/fawori/rulo-sunger-zimpara.webp",
    "sizes": [
      "Standart Ambalaj"
    ],
    "coverage": "Profesyonel Uygulama",
    "sheen": "Tüy Bırakmayan Polyamid Dokuma",
    "drying": "Kullanıma Hazır",
    "surface": "İç/dış cephe, ahşap, metal ve şantiye zeminleri"
  },
  "fawori-marin-yat-vernik": {
    "name": "Fawori Marin Yat Vernik",
    "category": "vernik-ahsap",
    "tag": "Marin Ahşap Zırhı",
    "sub": "Deniz suyu, güneş ışınları ve neme karşı ahşap yüzeylere zırh oluşturan yüksek parlaklıkta marin yat vernik.",
    "img": "assets/fawori/fawori-marin-yat-vernik.webp",
    "sizes": [
      "12 L",
      "2,5 L",
      "0,75 L"
    ],
    "coverage": "12 – 15 m²/L",
    "sheen": "Ayna Parlaklığında Marin Vernik",
    "drying": "12 – 24 Saat (Kat arası)",
    "surface": "Tekne, bahçe mobilyası, dış cephe ahşap"
  },
  "sentetik-parke-cilasi": {
    "name": "Fawori Parke Cilası",
    "category": "vernik-ahsap",
    "tag": "Parke Cilası",
    "sub": "Yoğun yaya trafiğine ve çizilmelere karşı ahşap parkeleri koruyan üretan alkid esaslı parlak cila.",
    "img": "assets/fawori/sentetik-parke-cilasi.webp",
    "sizes": [
      "12 L",
      "2,5 L",
      "0,75 L"
    ],
    "coverage": "10 – 14 m²/L",
    "sheen": "Üretan Alkid Aşınmaz Parlak",
    "drying": "12 – 24 Saat (Yaya trafiği)",
    "surface": "Masif parke, lamine ahşap zeminler"
  },
  "fawori-premium-sentetik-boya": {
    "name": "Fawori Premium Sentetik Boya",
    "category": "sentetik-boya",
    "tag": "Ayna Parlaklığı",
    "sub": "Kapı, pencere ve ferforjelerde sararmayan, kalıcı ayna parlaklığında son kat sentetik yağlı boya.",
    "img": "assets/fawori/fawori-premium-sentetik-boya.webp",
    "sizes": [
      "15 KG",
      "2,5 KG",
      "0,75 KG"
    ],
    "coverage": "12 – 16 m²/L",
    "sheen": "Ayna Parlaklığında Sentetik",
    "drying": "8 – 12 Saat (Tam kuruma)",
    "surface": "Ahşap doğrama, ferforje, kapı, metal, zemin"
  },
  "fawori-sentetik-antipas": {
    "name": "Fawori Sentetik Antipas",
    "category": "sentetik-boya",
    "tag": "Pas Bariyeri",
    "sub": "Demir ve çelik yüzeylerde paslanmayı durduran ve önleyen korozyon dirençli sentetik antipas astar.",
    "img": "assets/fawori/fawori-sentetik-antipas.webp",
    "sizes": [
      "15 KG",
      "2,5 KG",
      "0,75 KG"
    ],
    "coverage": "10 – 12 m²/L",
    "sheen": "Korozyon Önleyici Antipas Mat",
    "drying": "6 – 8 Saat (Boya öncesi)",
    "surface": "Demir, çelik, profil, sac yüzeyler"
  },
  "fawori-sentetik-astar": {
    "name": "Fawori Sentetik Astar",
    "category": "sentetik-boya",
    "tag": "Ayna Parlaklığı",
    "sub": "Sentetik son kat boyalar öncesinde ahşap ve metalde pürüzsüz yapışma tabakası kuran astar.",
    "img": "assets/fawori/fawori-sentetik-astar.webp",
    "sizes": [
      "15 KG",
      "2,5 KG",
      "0,75 KG"
    ],
    "coverage": "12 – 16 m²/L",
    "sheen": "Ayna Parlaklığında Sentetik",
    "drying": "8 – 12 Saat (Tam kuruma)",
    "surface": "Ahşap doğrama, ferforje, kapı, metal, zemin"
  },
  "fawori-sentetik-tiner": {
    "name": "Fawori Sentetik Tiner",
    "category": "tiner-yol",
    "tag": "Sentetik Tiner",
    "sub": "Sentetik boya, vernik ve antipas uygulamalarında kıvam ayarlayıcı kokusuz sentetik inceltici.",
    "img": "assets/fawori/fawori-sentetik-tiner.webp",
    "sizes": [
      "10 L",
      "2,5 L",
      "1,5 L",
      "0,5 L",
      "0,3 L"
    ],
    "coverage": "Uygulama yüzeyi ve kat sayısına bağlıdır",
    "sheen": "Saf Sentetik Çözücü",
    "drying": "Hızlı Uçucu",
    "surface": "Sentetik boya, vernik ve ekipman temizliği"
  },
  "soguk-yol-cizgi-boyasi-sentetik": {
    "name": "Fawori Soğuk Yol Çizgi Boyası",
    "category": "tiner-yol",
    "tag": "Yol Çizgi Boyası",
    "sub": "Otopark, şantiye ve asfalt yollarda aşınmaya dayanıklı yüksek görünürlüklü soğuk yol çizgi boyası.",
    "img": "assets/fawori/soguk-yol-cizgi-boyasi-sentetik.webp",
    "sizes": [
      "25 KG"
    ],
    "coverage": "3m²/kg(150 µ film kalınlığı)",
    "sheen": "Yüksek Görünürlüklü Mat Çizgi",
    "drying": "15 – 30 Dakika (Trafiğe açılış)",
    "surface": "Asfalt, beton otopark, şantiye yolları"
  },
  "wood-stain-dekoratif-ahsap-vernigi": {
    "name": "Fawori Wood Stain Dekoratif Ahşap Verniği",
    "category": "sentetik-boya",
    "tag": "Ayna Parlaklığı",
    "sub": "Ahşabın doğal nefes almasını sağlayan, çürümeye ve hava koşullarına dayanıklı dekoratif ahşap verniği.",
    "img": "assets/fawori/wood-stain-dekoratif-ahsap-vernigi.webp",
    "sizes": [
      "12 L",
      "2,5 L",
      "0,75 L"
    ],
    "coverage": "10 – 12 m²/L",
    "sheen": "Yarı Şeffaf Ahşap Koruyucu",
    "drying": "6 – 8 Saat (Kat arası)",
    "surface": "Ahşap doğrama, ferforje, kapı, metal, zemin"
  },
  "fawori-yol-cizgi-boyasi-tineri": {
    "name": "Fawori Yol Çizgi Boyası Tineri",
    "category": "tiner-yol",
    "tag": "Sentetik Tiner",
    "sub": "Yol çizgi boyasının hızlı kurumasını ve tabanca memesini tıkamadan püskürtülmesini sağlayan özel tiner.",
    "img": "assets/fawori/fawori-yol-cizgi-boyasi-tineri.webp",
    "sizes": [
      "15 L"
    ],
    "coverage": "Uygulama yüzeyi ve kat sayısına bağlıdır",
    "sheen": "Saf Sentetik Çözücü",
    "drying": "Hızlı Uçucu",
    "surface": "Sentetik boya, vernik ve ekipman temizliği"
  },
  "klasik-firca": {
    "name": "Klasik Fırça",
    "category": "firca",
    "tag": "Uygulama Fırçası",
    "sub": "Solvent bazlı boya ve verniklerde kıl bırakmayan, yüksek tutuşlu epoksi yapıştırıcılı yağlı boya fırçası.",
    "img": "assets/fawori/klasik-firca.webp",
    "sizes": [
      "Standart Ambalaj"
    ],
    "coverage": "Hassas Kestirme & Boyama",
    "sheen": "Kıl Dökmeyen Epoksi Yapıştırma",
    "drying": "Kullanıma Hazır",
    "surface": "İç/dış cephe, ahşap, metal ve şantiye zeminleri"
  }
};

  var backdrop = document.getElementById("paintModalBackdrop");
  var modalCard = document.getElementById("paintModalCard");
  var closeBtn = document.getElementById("modalCloseBtn");
  var modalTopBar = document.getElementById("modalTopBar");
  var modalHandleZone = document.getElementById("modalHandleZone");
  var modalScrollArea = document.getElementById("modalScrollArea");

  var modalImg = document.getElementById("modalProductImg");
  var modalEyebrow = document.getElementById("modalProductEyebrow");
  var modalTag = document.getElementById("modalProductTag");
  var modalTitle = document.getElementById("modalProductTitle");
  var modalSub = document.getElementById("modalProductSub");
  var modalSizesWrap = document.getElementById("modalSizesContainer");
  var modalServiceNote = document.getElementById("modalServiceNote");
  var modalServiceTitle = document.getElementById("modalServiceTitle");
  var modalServiceDesc = document.getElementById("modalServiceDesc");
  var modalAreaRow = document.getElementById("modalAreaRow");
  var modalSpecArea = document.getElementById("modalSpecArea");
  var modalCoverage = document.getElementById("modalSpecCoverage");
  var modalSheen = document.getElementById("modalSpecSheen");
  var modalDrying = document.getElementById("modalSpecDrying");
  var modalSurface = document.getElementById("modalSpecSurface");
  var modalWABtn = document.getElementById("modalWhatsAppBtn");
  var modalShareBtn = document.getElementById("modalShareBtn");
  var modalShareText = document.getElementById("modalShareText");
  var modalChromaGlow = document.getElementById("modalChromaGlow");
  var modalSelectionSummary = document.getElementById("modalSelectionSummary");

  var categoryDisplayNames = {
    "kozmik-ultra": "İpek & Soft Mat",
    "mat-silikonlu": "Silikonlu & Plastik",
    "tavan-kapi": "Tavan & Panel Kapı",
    "astar": "Astarlar & Macun",
    "akrilik-saf": "Fenomen Saf Akrilik",
    "silikonlu-dis": "Silikonlu Dış Cephe",
    "grenli-tekstur": "Grenli & Tekstürlü Kaplama",
    "astar-dis": "Dış Cephe Astarları",
    "vernik-ahsap": "Yat Vernik & Ahşap Koruma",
    "sentetik-boya": "Sentetik Boya & Antipas",
    "tiner-yol": "Tiner & Yol Çizgi Boyası",
    "levha": "EPS & Taşyünü Levhalar",
    "harc": "Yapıştırma & Sıva Harçları",
    "mineral": "Dekoratif Mineral Kaplamalar",
    "dubel-profil": "Dübel, File & Profiller",
    "sprey": "Akrilik Sprey Serisi",
    "rulo": "İç & Dış Cephe Ruloları",
    "firca": "Boya & Kestirme Fırçaları",
    "destek": "Maskeleme, Branda & Eldiven"
  };

  var currentProduct = null;
  var selectedSize = "";

  function calculateCoverageEstimate(sizeStr, coverageStr) {
    if (!sizeStr || !coverageStr) return null;
    var sizeMatch = sizeStr.match(/([\d\.,]+)\s*(l|litre|kg|g|ml)/i);
    if (!sizeMatch) return null;
    var val = parseFloat(sizeMatch[1].replace(',', '.'));
    var unit = sizeMatch[2].toLowerCase();

    var isDoubleCoat = (coverageStr.indexOf("Çift kat") !== -1 || coverageStr.indexOf("çift kat") !== -1 || coverageStr.indexOf("İki kat") !== -1);
    var covMatch = coverageStr.match(/([\d\.,]+)\s*[–\-—]\s*([\d\.,]+)\s*(m²|m2)\s*\/\s*(l|litre|kg)/i);

    if (covMatch) {
      var minCov = parseFloat(covMatch[1].replace(',', '.'));
      var maxCov = parseFloat(covMatch[2].replace(',', '.'));
      var covUnit = covMatch[4].toLowerCase();

      if ((unit === "l" || unit === "litre") && (covUnit === "l" || covUnit === "litre")) {
        var divisor = isDoubleCoat ? 1 : 2;
        var minArea = Math.round((val * minCov) / divisor);
        var maxArea = Math.round((val * maxCov) / divisor);
        var avgArea = Math.round((minArea + maxArea) / 2);
        return {
          pillLabel: avgArea + " m²",
          rangeLabel: minArea + " – " + maxArea + " m² (Çift Kat)",
          summaryLabel: avgArea + " m² çift kat",
          avgArea: avgArea
        };
      } else if (unit === "kg" && covUnit === "kg") {
        var divisor = isDoubleCoat ? 1 : 2;
        var minArea = Math.round((val * minCov) / divisor);
        var maxArea = Math.round((val * maxCov) / divisor);
        var avgArea = Math.round((minArea + maxArea) / 2);
        return {
          pillLabel: avgArea + " m²",
          rangeLabel: minArea + " – " + maxArea + " m² (Çift Kat)",
          summaryLabel: avgArea + " m² çift kat",
          avgArea: avgArea
        };
      }
    }

    var singleMatch = coverageStr.match(/([\d\.,]+)\s*(m²|m2)\s*\/\s*(l|litre|kg)/i);
    if (singleMatch) {
      var covVal = parseFloat(singleMatch[1].replace(',', '.'));
      var covUnit = singleMatch[3].toLowerCase();
      if ((unit === "l" || unit === "litre") && (covUnit === "l" || covUnit === "litre")) {
        var divisor = isDoubleCoat ? 1 : 2;
        var area = Math.round((val * covVal) / divisor);
        return {
          pillLabel: area + " m²",
          rangeLabel: area + " m² (Çift Kat)",
          summaryLabel: area + " m² çift kat",
          avgArea: area
        };
      } else if (unit === "kg" && covUnit === "kg") {
        var divisor = isDoubleCoat ? 1 : 2;
        var area = Math.round((val * covVal) / divisor);
        return {
          pillLabel: area + " m²",
          rangeLabel: area + " m² (Çift Kat)",
          summaryLabel: area + " m² çift kat",
          avgArea: area
        };
      }
    }

    var kgPerM2Match = coverageStr.match(/([\d\.,]+)\s*[–\-—]\s*([\d\.,]+)\s*kg\s*\/\s*(m²|m2)/i);
    if (kgPerM2Match && unit === "kg") {
      var minKg = parseFloat(kgPerM2Match[1].replace(',', '.'));
      var maxKg = parseFloat(kgPerM2Match[2].replace(',', '.'));
      var minArea = Math.round(val / maxKg);
      var maxArea = Math.round(val / minKg);
      var avgArea = Math.round((minArea + maxArea) / 2);
      return {
        pillLabel: avgArea + " m²",
        rangeLabel: minArea + " – " + maxArea + " m² (Tek Kat Kaplama)",
        summaryLabel: avgArea + " m² kaplama",
        avgArea: avgArea
      };
    }
    return null;
  }

  function updateAreaCoverage(size, product) {
    var gaugeNum = document.getElementById("modalGaugeNum");
    var gaugeUnit = document.getElementById("modalGaugeUnit");
    var gaugeSub = document.getElementById("modalGaugeSub");
    if (!product) return;
    var est = calculateCoverageEstimate(size, product.coverage);
    if (est) {
      if (gaugeNum) gaugeNum.textContent = est.avgArea;
      if (gaugeUnit) gaugeUnit.style.display = "inline";
      if (gaugeSub) gaugeSub.textContent = est.rangeLabel || (est.avgArea + " m² Çift Kat");
      if (modalSpecArea) modalSpecArea.textContent = est.rangeLabel;
      if (modalAreaRow) modalAreaRow.style.display = "flex";
    } else {
      if (gaugeNum) gaugeNum.textContent = "—";
      if (gaugeUnit) gaugeUnit.style.display = "none";
      if (gaugeSub) gaugeSub.textContent = product.coverage || "Standart Kaplama";
      if (modalSpecArea) modalSpecArea.textContent = product.coverage || "—";
    }
  }

  function updateCanScale(size) {
    var modalShadow = document.getElementById("modalCanShadow");
    var s = (size || "").toLowerCase();
    var scale = 1;
    if (s.indexOf("15") !== -1 || s.indexOf("20") !== -1 || s.indexOf("25") !== -1) {
      scale = 1;
    } else if (s.indexOf("7.5") !== -1 || s.indexOf("7,5") !== -1 || s.indexOf("10") !== -1 || s.indexOf("5") !== -1) {
      scale = 0.93;
    } else if (s.indexOf("2.5") !== -1 || s.indexOf("2,5") !== -1 || s.indexOf("1") !== -1 || s.indexOf("0.75") !== -1) {
      scale = 0.86;
    }
    if (modalImg) modalImg.style.transform = "scale(" + scale + ")";
    if (modalShadow) modalShadow.style.transform = "translateX(-50%) scale(" + scale + ")";
  }

  function updateSelectionSummary() {
    if (!modalSelectionSummary) return;
    if (!currentProduct) {
      modalSelectionSummary.textContent = "";
      return;
    }
    var parts = [];
    if (selectedSize) {
      parts.push(selectedSize);
    }
    parts.push("Betek Kimya Güvencesi");
    modalSelectionSummary.textContent = parts.join(" · ");
  }

  function updateWhatsAppUrl() {
    if (!currentProduct) return;
    var text = "Merhaba, Fawori " + currentProduct.name;
    var est = calculateCoverageEstimate(selectedSize, currentProduct.coverage);
    if (selectedSize) {
      text += " (" + selectedSize + (est ? " · " + est.summaryLabel : "") + ")";
    }
    text += " için Balçova Yapı Market / Urla Ana Depo şantiye teslimat ve fiyat bilgisi almak istiyorum.";
    modalWABtn.href = "https://wa.me/905323844497?text=" + encodeURIComponent(text);
  }

  var SPEC_ICONS = {
    clock: '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    timer: '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 22h14M5 2h14M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/></svg>',
    shield: '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    layers: '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
    tool: '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>'
  };

  function updateCategorySpecCartridges(p, productId) {
    if (!p) return;
    var cat = p.category || "";
    var pid = (productId || p.id || "").toLowerCase();

    var rightEyebrow = "DOKU & KURUMA";
    var leftEyebrow = "BOYANABİLİR ALAN";
    var iconSvg = SPEC_ICONS.clock;
    var dryingLabel = p.drying || "";

    if (cat === "rulo" || cat === "firca" || cat === "destek") {
      rightEyebrow = "YAPI & DAYANIM";
      leftEyebrow = "UYUMLU KULLANIM";
      iconSvg = SPEC_ICONS.tool;
      dryingLabel = p.drying || "Kullanıma Hazır";
    } else if (cat === "levha" || pid.indexOf("file") !== -1 || pid.indexOf("dubel") !== -1) {
      rightEyebrow = "MATERYAL & MONTAJ";
      leftEyebrow = "KAPLAMA & SARFİYAT";
      iconSvg = SPEC_ICONS.layers;
      dryingLabel = p.drying || "Montaja Hazır";
    } else if (cat === "harc" || cat === "mineral" || pid.indexOf("harc") !== -1 || pid.indexOf("siva") !== -1) {
      rightEyebrow = "YAPI & KÜRLENME";
      leftEyebrow = "KAPLAMA & SARFİYAT";
      iconSvg = SPEC_ICONS.shield;
      dryingLabel = p.drying || "Priz / Kürlenme";
    } else if (cat === "astar" || cat === "astar-dis" || pid.indexOf("macun") !== -1) {
      rightEyebrow = "İŞLEV & BEKLEME";
      leftEyebrow = "UYGULAMA & SARFİYAT";
      iconSvg = SPEC_ICONS.timer;
      dryingLabel = p.drying || "Bekleme Süresi";
    } else {
      rightEyebrow = "DOKU & KURUMA";
      leftEyebrow = "BOYANABİLİR ALAN";
      iconSvg = SPEC_ICONS.clock;
      var raw = p.drying || "";
      if (raw.toLowerCase().indexOf("kuruma") !== -1) {
        dryingLabel = raw;
      } else if (raw.toLowerCase().indexOf("saat") !== -1 || raw.toLowerCase().indexOf("dakika") !== -1) {
        dryingLabel = raw + " Kuruma";
      } else {
        dryingLabel = raw;
      }
    }

    var elRightEyebrow = document.getElementById("modalGaugeSheenEyebrow");
    if (elRightEyebrow) elRightEyebrow.textContent = rightEyebrow;

    var elLeftEyebrow = document.getElementById("modalGaugeAreaEyebrow");
    if (elLeftEyebrow) elLeftEyebrow.textContent = leftEyebrow;

    var elSheen = document.getElementById("modalGaugeSheen");
    if (elSheen) elSheen.textContent = p.sheen || "—";

    var elDryingIcon = document.getElementById("modalGaugeDryingIcon");
    if (elDryingIcon) elDryingIcon.innerHTML = iconSvg;

    var elDryingText = document.getElementById("modalGaugeDryingText");
    if (elDryingText) elDryingText.textContent = dryingLabel;
  }

  function openModal(productId) {
    var p = products[productId];
    if (!p) return;
    p.id = productId;
    currentProduct = p;

    // Fill Product Info
    if (modalEyebrow) {
      modalEyebrow.textContent = (categoryDisplayNames && categoryDisplayNames[p.category]) ? categoryDisplayNames[p.category] : "Fawori Boya";
    }
    if (modalImg) {
      modalImg.src = p.img;
      modalImg.alt = p.name;
    }
    if (modalTag) modalTag.textContent = p.tag || "";
    if (modalTitle) modalTitle.textContent = p.name;
    if (modalSub) modalSub.textContent = p.sub;

    // Atmospheric Chroma Glow Sync
    if (modalChromaGlow) {
      var glowColor = (p.category === "kozmik-ultra") ? "rgba(217, 119, 6, 0.26)" :
                      (p.category === "akrilik-saf" || p.category === "silikonlu-dis") ? "rgba(37, 99, 235, 0.24)" :
                      (p.category === "levha" || p.category === "harc" || p.category === "mineral") ? "rgba(5, 150, 105, 0.24)" :
                      (p.category === "vernik-ahsap" || p.category === "sentetik-boya") ? "rgba(124, 58, 237, 0.24)" :
                      "rgba(225, 29, 72, 0.24)";
      modalChromaGlow.style.background = "radial-gradient(circle at 50% 50%, " + glowColor + " 0%, rgba(255, 255, 255, 0) 72%)";
    }

    // Fill Specs & Gauges
    if (modalCoverage) modalCoverage.textContent = p.coverage;
    if (modalSheen) modalSheen.textContent = p.sheen;
    if (modalDrying) modalDrying.textContent = p.drying;
    if (modalSurface) modalSurface.textContent = p.surface;
    updateCategorySpecCartridges(p, productId);

    // Dynamic Size Section Title
    var modalSelectTitle = document.getElementById("modalSelectTitle");
    if (modalSelectTitle) {
      if (p.category === "rulo" || p.category === "firca" || p.category === "destek") {
        modalSelectTitle.textContent = "Ölçü & Ebat Seçimi";
      } else if (p.category === "levha") {
        modalSelectTitle.textContent = "Kalınlık & Paket Seçimi";
      } else if (p.category === "harc" || p.category === "mineral") {
        modalSelectTitle.textContent = "Ambalaj & Torba Seçimi";
      } else {
        modalSelectTitle.textContent = "Ambalaj Hacmi";
      }
    }

    // Build Size Options with Adaptive Segmented Track
    if (modalSizesWrap) {
      modalSizesWrap.innerHTML = "";
      selectedSize = (p.sizes && p.sizes.length > 0) ? p.sizes[0] : "";
      if (p.sizes && p.sizes.length > 0) {
        var maxLen = 0;
        p.sizes.forEach(function(s) {
          if (s.length > maxLen) maxLen = s.length;
        });
        var count = p.sizes.length;

        modalSizesWrap.className = "pv-segmented-track";
        var isCompact = (count <= 3 && maxLen <= 8) || (count === 4 && maxLen <= 6);
        var isLong = (maxLen > 20);

        if (count === 1) {
          modalSizesWrap.classList.add("pv-sizes-row-1");
        } else if (isCompact) {
          modalSizesWrap.classList.add("pv-sizes-row-" + count);
        } else if (isLong) {
          modalSizesWrap.classList.add("pv-sizes-stack");
        } else {
          modalSizesWrap.classList.add("pv-sizes-grid-2");
        }

        p.sizes.forEach(function(size, idx) {
          var sBtn = document.createElement("button");
          sBtn.type = "button";
          sBtn.className = "pv-segmented-btn pv-size-pill" + (idx === 0 ? " active" : "");
          sBtn.textContent = size;
          sBtn.setAttribute("role", "radio");
          sBtn.setAttribute("aria-checked", idx === 0 ? "true" : "false");
          sBtn.addEventListener("click", function() {
            modalSizesWrap.querySelectorAll(".pv-segmented-btn").forEach(function(b) {
              b.classList.remove("active");
              b.setAttribute("aria-checked", "false");
            });
            sBtn.classList.add("active");
            sBtn.setAttribute("aria-checked", "true");
            selectedSize = size;
            updateCanScale(size);
            updateAreaCoverage(size, p);
            updateSelectionSummary();
            updateWhatsAppUrl();
          });
          modalSizesWrap.appendChild(sBtn);
        });
      }
    }

    // Contextual Betek Service Note
    if (modalServiceNote) {
      if (modalServiceTitle) modalServiceTitle.textContent = "Betek Kimya & Pervan Güvencesi";
      if (modalServiceDesc) modalServiceDesc.innerHTML = "<strong>Betek Kimya &amp; Pervan Güvencesi:</strong> Balçova Showroom ve Urla Ana Depomuzdan orijinal ambalajında şantiyenize aynı gün sevk edilir.";
    }

    updateCanScale(selectedSize);
    updateAreaCoverage(selectedSize, p);
    updateSelectionSummary();
    updateWhatsAppUrl();

    // Show Modal
    resetSheetStyles();
    if (backdrop) {
      backdrop.classList.add("open");
      backdrop.setAttribute("aria-hidden", "false");
    }
    document.body.style.overflow = "hidden";

    // URL sync
    if (window.history && window.history.replaceState) {
      var url = new URL(window.location.href);
      url.searchParams.set("item", productId);
      window.history.replaceState(null, "", url.toString());
    }
  }

  window.openProductModal = openModal;

  function resetSheetStyles() {
    if (modalCard) {
      modalCard.style.transform = "";
      modalCard.style.transition = "";
    }
    if (backdrop) {
      backdrop.style.opacity = "";
      backdrop.style.transition = "";
    }
  }

  function closeModal() {
    if (backdrop) {
      backdrop.classList.remove("open");
      backdrop.setAttribute("aria-hidden", "true");
    }
    document.body.style.overflow = "";
    resetSheetStyles();

    if (window.history && window.history.replaceState) {
      var url = new URL(window.location.href);
      url.searchParams.delete("item");
      window.history.replaceState(null, "", url.toString());
    }
  }

  // Kinetic Drag-to-Dismiss Bottom Sheet Engine
  var dragStartY = 0;
  var dragCurrentY = 0;
  var dragStartTime = 0;
  var isSheetDragging = false;
  var canDragFromScroll = false;

  function onDragStart(e) {
    if (!backdrop || !backdrop.classList.contains("open")) return;
    if (e.target.closest("button, a, input, select, textarea, .pv-size-pill")) return;

    var touch = e.touches ? e.touches[0] : e;
    dragStartY = touch.clientY;
    dragCurrentY = touch.clientY;
    dragStartTime = Date.now();
    isSheetDragging = false;
    canDragFromScroll = (modalScrollArea && modalScrollArea.scrollTop <= 0);
  }

  function onDragMove(e) {
    if (!backdrop || !backdrop.classList.contains("open") || !dragStartY) return;

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
        backdrop.style.opacity = (1 - progress * 0.6).toFixed(2);
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
      backdrop.style.transition = "opacity 0.24s ease";
      backdrop.style.opacity = "0";
      setTimeout(function() {
        closeModal();
        resetSheetStyles();
      }, 240);
    } else {
      modalCard.style.transition = "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)";
      modalCard.style.transform = "translateY(0)";
      backdrop.style.transition = "opacity 0.25s ease";
      backdrop.style.opacity = "1";
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

  // Row click bindings across all sections
  document.querySelectorAll(".pv-menu-row").forEach(function(row) {
    row.addEventListener("click", function() {
      var pid = row.getAttribute("data-product-id");
      openModal(pid);
    });
    row.addEventListener("keydown", function(e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        var pid = row.getAttribute("data-product-id");
        openModal(pid);
      }
    });
  });

  // Share button
  if (modalShareBtn) {
    modalShareBtn.addEventListener("click", function() {
      if (!currentProduct) return;
      var shareUrl = window.location.origin + window.location.pathname + "?item=" + currentProduct.id;
      var shareData = {
        title: "Fawori " + currentProduct.name + " | Pervan Yapı Market",
        text: currentProduct.name + " - " + currentProduct.sub,
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
          modalShareText.textContent = "✓ Bağlantı Kopyalandı";
          setTimeout(function() {
            if (shareIcon) shareIcon.style.display = "inline-block";
            if (checkIcon) checkIcon.style.display = "none";
            modalShareText.textContent = "Paylaş";
          }, 2500);
        }).catch(function() {});
      }
    });
  }

  // Close bindings
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) {
    backdrop.addEventListener("click", function(e) {
      if (e.target === backdrop) closeModal();
    });
  }
  window.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && backdrop && backdrop.classList.contains("open")) {
      closeModal();
    }
  });

  // Filter Pills Engine for all 5 sections
  var SECTION_PILL_MAP = [
    { pillsId: "faworiInteriorPills", listId: "faworiInteriorList" },
    { pillsId: "faworiExteriorPills", listId: "faworiExteriorList" },
    { pillsId: "faworiSyntheticPills", listId: "faworiSyntheticList" },
    { pillsId: "faworiInsulationPills", listId: "faworiInsulationList" },
    { pillsId: "faworiEquipmentPills", listId: "faworiEquipmentList" }
  ];

  SECTION_PILL_MAP.forEach(function(map) {
    var pWrap = document.getElementById(map.pillsId);
    var lWrap = document.getElementById(map.listId);
    if (!pWrap || !lWrap) return;

    var pills = pWrap.querySelectorAll(".pv-menu-pill");
    var rows = lWrap.querySelectorAll(".pv-menu-row");

    pills.forEach(function(btn) {
      btn.addEventListener("click", function() {
        pills.forEach(function(b) {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");

        if (typeof btn.scrollIntoView === "function") {
          btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        }

        var filter = btn.getAttribute("data-filter");
        rows.forEach(function(row) {
          var cat = row.getAttribute("data-category");
          if (cat === filter) {
            row.classList.remove("hidden");
          } else {
            row.classList.add("hidden");
          }
        });
      });
    });
  });

  // Deep link check
  function checkDeepLink() {
    var params = new URLSearchParams(window.location.search);
    var itemId = params.get("item");
    if (itemId && products[itemId]) {
      var prod = products[itemId];
      var row = document.querySelector('.pv-menu-row[data-product-id="' + itemId + '"]');
      if (row) {
        var sec = row.closest("section");
        if (sec && sec.id) {
          var subnavLink = document.querySelector('#pvSubnavLinks .pv-subnav-link[data-target="' + sec.id + '"]');
          if (subnavLink) subnavLink.click();
          var targetPill = sec.querySelector('.pv-menu-pill[data-filter="' + prod.category + '"]');
          if (targetPill) targetPill.click();
        }
      }
      openModal(itemId);
    }
  }

  // ==========================================================================
  // SPOTLIGHT PALETTE ENGINE (⌘K / 76 Ürün Arama)
  // ==========================================================================
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

  function getProductDomain(cat) {
    if (["kozmik-ultra", "mat-silikonlu", "tavan-kapi", "astar"].indexOf(cat) !== -1) return "01 İç Cephe";
    if (["akrilik-saf", "silikonlu-dis", "grenli-tekstur", "astar-dis"].indexOf(cat) !== -1) return "02 Dış Cephe";
    if (["vernik-ahsap", "sentetik-boya", "tiner-yol"].indexOf(cat) !== -1) return "03 Sentetik";
    if (["levha", "harc", "mineral", "dubel-profil"].indexOf(cat) !== -1) return "04 Optimix®";
    if (["sprey", "rulo", "firca", "destek"].indexOf(cat) !== -1) return "05 Ekipman";
    return "Fawori";
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
    if (spotlightCount) spotlightCount.textContent = Object.keys(products).length + " Ürün Yayında";
    if (spotlightResults) {
      spotlightResults.innerHTML = '<div class="pv-spotlight-hint">' +
        '<span>İpucu: Kozmik İpek, Fenomen, Optimix EPS, Marin Vernik veya ambalaj boyutuna (15 L) göre anında arayabilirsiniz.</span>' +
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

    for (var pid in products) {
      var prod = products[pid];
      var haystack = normalizeTr([
        prod.name || "",
        prod.tag || "",
        prod.sub || "",
        prod.category || "",
        prod.sheen || "",
        prod.surface || "",
        (prod.sizes || []).join(" ")
      ].join(" "));

      var matched = words.every(function(w) {
        return haystack.indexOf(w) !== -1;
      });

      if (matched) {
        matches.push({ id: pid, data: prod });
      }
    }

    if (spotlightCount) {
      spotlightCount.textContent = matches.length + " Ürün Bulundu";
    }

    if (!spotlightResults) return;

    if (matches.length === 0) {
      spotlightSelectedIdx = -1;
      var waText = encodeURIComponent("Merhaba, Fawori kataloğunuzda '" + rawQuery + "' aradım ancak bulamadım. Bu ürün hakkında bilgi alabilir miyim?");
      spotlightResults.innerHTML = '<div class="pv-spotlight-empty-box">' +
        '<div class="pv-spotlight-empty-title">Eşleşen ürün bulunamadı</div>' +
        '<p class="pv-spotlight-empty-desc">Aradığınız ürün standart katalog dışı olabilir veya özel şantiye çözümü gerektirebilir. Balçova ve Urla ekiplerimize doğrudan danışabilirsiniz:</p>' +
        '<a href="https://wa.me/905323844497?text=' + waText + '" target="_blank" rel="noopener" class="pv-btn-primary" style="max-width: 320px; font-size: 12px; padding: 11px 18px; min-height: 42px;">' +
        'WhatsApp ile Ürün Danış' +
        '</a>' +
        '</div>';
      return;
    }

    var html = "";
    matches.forEach(function(m, idx) {
      var p = m.data;
      var domain = getProductDomain(p.category);
      var subText = p.sub || (p.sizes ? p.sizes.join(", ") : "");

      html += '<div class="pv-spotlight-item' + (idx === 0 ? ' is-selected' : '') + '" data-product-id="' + m.id + '" role="option" tabindex="-1">';
      html += '  <div class="pv-spotlight-item-left">';
      html += '    <div class="pv-spotlight-thumb">';
      html += '      <img src="' + p.img + '" alt="' + p.name + '" loading="lazy" decoding="async" />';
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
        openModal(pid);
      });
    });
  }

  // Trigger bindings
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

  // Input & Keyboard navigation
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
          openModal(pid);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        closeSpotlight();
      }
    });
  }

  // Global hotkeys (⌘K or /)
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

  checkDeepLink();
  window.addEventListener("popstate", checkDeepLink);
})();

/* 3. IN-PLACE ARCHITECTURAL SUB-NAV TAB CONTROLLER (Zero Scroll, Instant Panel Switch) */
(function() {
  var subnav = document.getElementById("pvSubnav");
  var spacer = document.getElementById("pvSubnavSpacer");
  var header = document.querySelector("header");
  var subnavLinks = document.querySelectorAll("#pvSubnavLinks .pv-subnav-link");
  if (!subnav || !subnavLinks.length) return;

  var panels = {
    "pvProductCatalog": document.getElementById("pvProductCatalog"),
    "pvExteriorSection": document.getElementById("pvExteriorSection"),
    "pvSyntheticSection": document.getElementById("pvSyntheticSection"),
    "pvInsulationSection": document.getElementById("pvInsulationSection"),
    "pvEquipmentSection": document.getElementById("pvEquipmentSection")
  };

  var DEPARTMENTS_DATA = [
    { id: "pvProductCatalog", short: "İç Cephe & Tavan", full: "İç Cephe & Tavan", pillsId: "faworiInteriorPills" },
    { id: "pvExteriorSection", short: "Dış Cephe & Kaplama", full: "Dış Cephe & Kaplama", pillsId: "faworiExteriorPills" },
    { id: "pvSyntheticSection", short: "Sentetik & Vernik", full: "Sentetik, Vernik & Tiner", pillsId: "faworiSyntheticPills" },
    { id: "pvInsulationSection", short: "Optimix® Yalıtım", full: "Fawori Optimix® Yalıtım", pillsId: "faworiInsulationPills" },
    { id: "pvEquipmentSection", short: "Sprey & Donanım", full: "Sprey, Rulo & Fırça", pillsId: "faworiEquipmentPills" }
  ];

  var deptTrigger = document.getElementById("pvDeptTrigger");
  var deptTriggerLabel = document.getElementById("pvDeptTriggerLabel");
  var deptDrawerBackdrop = document.getElementById("pvDeptDrawerBackdrop");
  var deptDrawer = document.getElementById("pvDeptDrawer");
  var drawerCloseBtn = document.getElementById("pvDrawerCloseBtn");
  var deptList = document.getElementById("pvDeptList");
  var filterRail = document.getElementById("pvFilterRail");

  function renderDeptDrawer(activeId) {
    if (!deptList) return;
    deptList.innerHTML = "";
    DEPARTMENTS_DATA.forEach(function(d) {
      var btn = document.createElement("button");
      btn.type = "button";
      var isSelected = (d.id === activeId);
      btn.className = "pv-drawer-item" + (isSelected ? " is-selected" : "");
      btn.innerHTML = 
        '<span class="pv-drawer-item-name">' + d.full + '</span>' +
        '<svg class="pv-drawer-item-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>';

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
      e.preventDefault();
      e.stopPropagation();
      var isOpen = deptDrawerBackdrop && deptDrawerBackdrop.classList.contains("is-open");
      if (isOpen) closeDeptDrawer(); else openDeptDrawer();
    });
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener("click", function(e) {
      e.preventDefault();
      closeDeptDrawer();
    });
  }

  function switchTab(targetId) {
    if (!panels[targetId]) return;

    // 1. Update tab buttons
    subnavLinks.forEach(function(link) {
      var isTarget = (link.getAttribute("data-target") === targetId);
      link.classList.toggle("active", isTarget);
      link.setAttribute("aria-selected", isTarget ? "true" : "false");
      if (isTarget && typeof link.scrollIntoView === "function") {
        link.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    });

    // 2. Switch panels instantly in place
    for (var key in panels) {
      if (panels[key]) {
        panels[key].style.display = (key === targetId) ? "block" : "none";
      }
    }

    // 3. Update mobile compact bar & drawer
    var currentDept = DEPARTMENTS_DATA.find(function(d) { return d.id === targetId; }) || DEPARTMENTS_DATA[0];
    if (deptTriggerLabel) {
      deptTriggerLabel.textContent = currentDept.short;
    }
    renderDeptDrawer(targetId);
    syncMobileFilterRail(targetId);
  }

  // Initial state setup for mobile bar
  var initialDept = DEPARTMENTS_DATA[0];
  if (deptTriggerLabel) deptTriggerLabel.textContent = initialDept.short;
  renderDeptDrawer("pvProductCatalog");
  syncMobileFilterRail("pvProductCatalog");

  // Attach instant click event to each tab
  subnavLinks.forEach(function(link) {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      var targetId = link.getAttribute("data-target");
      switchTab(targetId);
    });
  });

  // Sticky subnav clearance sync
  var initialSubnavTop = 0;
  function getSubnavOrigin() {
    if (spacer && spacer.classList.contains("is-active")) {
      return spacer.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop);
    }
    return subnav.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop);
  }

  function getHeaderHeight() {
    if (!header) return 60;
    return header.offsetHeight || 60;
  }

  function syncSubnavPin() {
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
          spacer.style.height = (subnav.offsetHeight || 52) + "px";
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

  setTimeout(function() {
    initialSubnavTop = getSubnavOrigin();
    syncSubnavPin();
  }, 150);
})();
