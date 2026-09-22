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

    var activeHex = slides[index].getAttribute("data-code") || '#405E66';

    slides.forEach(function(slide, idx) {
      slide.classList.toggle("active", idx === index);
    });

    stage.style.setProperty('--pv-chroma-hex', activeHex);
    stage.style.setProperty('--pv-chroma-rgb', hexToRgb(activeHex));
    if (themeColorTag) {
      themeColorTag.setAttribute("content", activeHex);
    }

    // Sync thin slider progress lines
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

/* PERVAN ARCHITECTURAL CATALOG & SPEC MODAL CONTROLLER */
(function() {
  var products = {
  "momento-silan": {
    "name": "Momento Silan",
    "category": "ic-cephe",
    "tag": "Aktif Silikon",
    "sub": "Tam silinebilir ve yıkanabilir yüzey koruma kalkanı · İpeksi Mat®",
    "img": "assets/filli-official/momento-silan.png",
    "sizes": [
      "2.5 L",
      "7.5 L",
      "15 L"
    ],
    "coverage": "13 – 17 m²/L",
    "sheen": "İpeksi Mat® (Silinebilir)",
    "drying": "2 – 4 Saat (Kat arası)",
    "surface": "İç cephe alçı, sıva, brüt beton"
  },
  "momento-max": {
    "name": "Momento Max",
    "category": "ic-cephe",
    "tag": "Kusur Kapatıcı",
    "sub": "Parlama yapmayan, pürüzleri örten mimari iç cephe boyası · Tam Mat",
    "img": "assets/filli-official/momento-max.png",
    "sizes": [
      "2.5 L",
      "7.5 L",
      "15 L"
    ],
    "coverage": "12 – 15 m²/L",
    "sheen": "Tam Mat (Yansıma Yok)",
    "drying": "2 – 4 Saat (Kat arası)",
    "surface": "Geniş salonlar, spot aydınlatmalı tavan/duvar"
  },
  "momento-life": {
    "name": "Momento Life",
    "category": "ic-cephe",
    "tag": "Saf Hava / Kids",
    "sub": "Formaldehit bağlayan, hava temizleyici çocuk ve bebek odası boyası · İpeksi Mat",
    "img": "assets/filli-official/momento-life.png",
    "sizes": [
      "2.5 L",
      "7.5 L",
      "15 L"
    ],
    "coverage": "13 – 16 m²/L",
    "sheen": "İpeksi Mat® (Hipoalerjenik)",
    "drying": "2 – 4 Saat",
    "surface": "Bebek & çocuk odaları, kreşler, yatak odaları"
  },
  "momento-max-cleanix": {
    "name": "Momento Max Cleanix",
    "category": "ic-cephe",
    "tag": "Leke Tutmaz",
    "sub": "Leke tutmayan, silikon takviyeli leke dirençli iç cephe boyası · Soft Mat",
    "img": "assets/filli-official/momento-max-cleanix.png",
    "sizes": [
      "2.5 L",
      "7.5 L",
      "15 L"
    ],
    "coverage": "12 – 15 m²/L",
    "sheen": "Soft Mat (Leke İtici)",
    "drying": "2 – 4 Saat",
    "surface": "Mutfak, antre, koridor, yoğun yaşam alanları"
  },
  "momento-tek": {
    "name": "Momento Tek",
    "category": "ic-cephe",
    "tag": "Tek Katta Örtücü",
    "sub": "Yüksek örtücülük gücü ile tek katta kapatan pratik mimari boya · İpeksi Mat",
    "img": "assets/filli-official/momento-tek.png",
    "sizes": [
      "2.5 L",
      "7.5 L",
      "15 L"
    ],
    "coverage": "10 – 12 m²/L",
    "sheen": "İpeksi Mat",
    "drying": "2 – 3 Saat",
    "surface": "Rengi değişecek koyu zeminler, hızlı tadilatlar"
  },
  "betakril": {
    "name": "Betakril İç Cephe",
    "category": "ic-cephe",
    "tag": "Ekonomik Proje",
    "sub": "Kopolimer akrilik emülsiyon esaslı, yüksek örtücülük sağlayan boya · Mat",
    "img": "assets/filli-official/betakril.png",
    "sizes": [
      "3.5 kg",
      "10 kg",
      "20 kg"
    ],
    "coverage": "11 – 14 m²/kg",
    "sheen": "Mat",
    "drying": "2 – 3 Saat",
    "surface": "Toplu konut, ofis, sıva, alçıpan, brüt beton"
  },
  "betakril-tavan": {
    "name": "Betakril Süper Tavan",
    "category": "ic-cephe",
    "tag": "Damlamaz Beyaz",
    "sub": "Rulo izi bırakmayan, nefes alan ekstra beyaz tavan boyası · Tam Mat",
    "img": "assets/filli-official/betakril-tavan.png",
    "sizes": [
      "3.5 kg",
      "10 kg",
      "17.5 kg"
    ],
    "coverage": "7 – 9 m²/kg",
    "sheen": "Tam Mat (Işık Kırıcı Beyaz)",
    "drying": "1 – 2 Saat",
    "surface": "Tüm iç mekan tavan yüzeyleri, alçı ve sıva"
  },
  "alpina-max": {
    "name": "Alpina Max",
    "category": "ic-cephe",
    "tag": "Silikonlu Kolay Temiz",
    "sub": "Klasik silikonlu, ferah iç mekanlar için silinebilir emülsiyon boya · İpeksi Mat",
    "img": "assets/filli-official/momento-silan.png",
    "sizes": [
      "2.5 L",
      "7.5 L",
      "15 L"
    ],
    "coverage": "12 – 15 m²/L",
    "sheen": "İpeksi Mat",
    "drying": "2 – 4 Saat",
    "surface": "İç cephe duvarlar, salon, yatak odası"
  },
  "alpina-plus": {
    "name": "Alpina Plus",
    "category": "ic-cephe",
    "tag": "Plastik Mat",
    "sub": "Yüksek buhar geçirgenliğine sahip, ekonomik iç cephe plastik boyası · Mat",
    "img": "assets/filli-official/betakril.png",
    "sizes": [
      "3.5 kg",
      "10 kg",
      "20 kg"
    ],
    "coverage": "10 – 13 m²/kg",
    "sheen": "Plastik Mat",
    "drying": "2 – 3 Saat",
    "surface": "Nefes alan duvar ve tavan zeminleri"
  },
  "aqusto-silan": {
    "name": "Aqusto Silan",
    "category": "dis-cephe",
    "tag": "DuoMax® Su İtici",
    "sub": "Ege ve Çeşme tuzu, yüksek nem ve UV ışınlarına karşı tam koruma · Mat",
    "img": "assets/filli-official/aqusto-silan.png",
    "sizes": [
      "2.5 L",
      "7.5 L",
      "15 L"
    ],
    "coverage": "8 – 11 m²/L",
    "sheen": "Mat Dış Cephe",
    "drying": "6 – 8 Saat",
    "surface": "Dış cephe sıva, brüt beton, mantolama üzeri"
  },
  "aqusto-sil": {
    "name": "Aqusto Sil",
    "category": "dis-cephe",
    "tag": "Fotokatalitik",
    "sub": "Güneş ışığıyla kirleri parçalayan kendi kendini temizleyen teknoloji · Mat",
    "img": "assets/filli-official/aqusto-sil.png",
    "sizes": [
      "2.5 L",
      "7.5 L",
      "15 L"
    ],
    "coverage": "8 – 10 m²/L",
    "sheen": "Mat / Nefes Alan",
    "drying": "6 – 8 Saat",
    "surface": "Dış cephe mineral sıva ve boyalı yüzeyler"
  },
  "nucleus": {
    "name": "Nucleus Triple Barrier",
    "category": "dis-cephe",
    "tag": "Triple Barrier",
    "sub": "Kılcal çatlakları köprüleyen, aşırı hava şartlarına dayanıklı zırh · Mat",
    "img": "assets/filli-official/nucleus.png",
    "sizes": [
      "2.5 L",
      "15 L"
    ],
    "coverage": "7 – 10 m²/L",
    "sheen": "Elastik Mat",
    "drying": "6 – 8 Saat",
    "surface": "Çatlama riski olan dış cepheler, rüzgarlı sahil yapıları"
  },
  "amphisilan": {
    "name": "AmphiSilan Dış Cephe",
    "category": "dis-cephe",
    "tag": "Silikonlu Standart",
    "sub": "Filli Boya'nın efsanevi silikon dış cephe boyası, yüksek buhar geçirgenliği · Mat",
    "img": "assets/filli-official/aqusto-silan.png",
    "sizes": [
      "2.5 L",
      "7.5 L",
      "15 L"
    ],
    "coverage": "6 – 10 m²/L",
    "sheen": "Silikon Mat",
    "drying": "6 – 8 Saat",
    "surface": "Dış cephe sıvalı, taraklı, mantolama yüzeyleri"
  },
  "betakril-dis-cephe": {
    "name": "Betakril Dış Cephe",
    "category": "dis-cephe",
    "tag": "Akrilik Koruma",
    "sub": "Dış hava şartlarına dayanıklı, nefes alan ekonomik dış cephe boyası · Mat",
    "img": "assets/filli-official/betakril-dis-cephe.png",
    "sizes": [
      "3.5 kg",
      "10 kg",
      "20 kg"
    ],
    "coverage": "7 – 10 m²/kg",
    "sheen": "Akrilik Mat",
    "drying": "4 – 6 Saat",
    "surface": "Toplu konut, ticari cepheler, sıva ve beton"
  },
  "aqualux": {
    "name": "Aqualux Kokusuz Emaye",
    "category": "ahsap-metal",
    "tag": "Saf Akrilik",
    "sub": "Kokusuz, sararmayan iç ve dış mekan ahşap & metal boyası · Parlak / Yarımat",
    "img": "assets/filli-official/aqualux.png",
    "sizes": [
      "0.75 L",
      "2.5 L"
    ],
    "coverage": "13 – 15 m²/L",
    "sheen": "Parlak / Yarımat",
    "drying": "2 – 3 Saat",
    "surface": "İç ve dış ahşap doğrama, metal karkas, kalorifer peteği"
  },
  "panel-kapi": {
    "name": "Panel Kapı Boyası",
    "category": "ahsap-metal",
    "tag": "Darbe Direnci",
    "sub": "Amerikan panel kapılar için sararmayan, su bazlı koruyucu boya · İpeksi Mat",
    "img": "assets/filli-official/panel-kapi.png",
    "sizes": [
      "0.75 L",
      "2.5 L"
    ],
    "coverage": "13 – 16 m²/L",
    "sheen": "İpeksi Mat",
    "drying": "2 – 3 Saat",
    "surface": "Amerikan panel kapı, masif ahşap, pervaz ve süpürgelik"
  },
  "sentomaxx-mat": {
    "name": "Sentomaxx Mat Sentetik Boya",
    "category": "ahsap-metal",
    "tag": "Aromatsız Solvent",
    "sub": "Kurşun ve aromatik solvent içermeyen, kokusuz sentetik mat boya · Mat",
    "img": "assets/filli-official/sentomaxx-mat.png",
    "sizes": [
      "0.75 L",
      "2.5 L",
      "15 L"
    ],
    "coverage": "14 – 18 m²/L",
    "sheen": "Sentetik Mat",
    "drying": "4 – 6 Saat (Tam kuruma 24s)",
    "surface": "İç ve dış ahşap, demir ve metal konstrüksiyon"
  },
  "sentomaxx-ipeksi": {
    "name": "Sentomaxx İpeksi Mat",
    "category": "ahsap-metal",
    "tag": "Fırça İzi Bırakmaz",
    "sub": "Mükemmel yayılma ve darbe direnci sağlayan üstün sentetik boya · İpeksi Mat",
    "img": "assets/filli-official/sentomaxx-ipeksi.png",
    "sizes": [
      "0.75 L",
      "2.5 L",
      "15 L"
    ],
    "coverage": "15 – 19 m²/L",
    "sheen": "İpeksi Mat",
    "drying": "4 – 6 Saat",
    "surface": "Kapı, pencere, mobilya, korkuluk, ferforje"
  },
  "filli-yagli-boya": {
    "name": "Filli Boya Yağlı Boya Parlak",
    "category": "ahsap-metal",
    "tag": "Ayna Parlaklık",
    "sub": "Klasik alkid formüllü, yüksek parlaklık ve örtücülük sağlayan son kat boya",
    "img": "assets/filli-official/filli-yagli-boya.png",
    "sizes": [
      "0.75 L",
      "2.5 L",
      "15 L"
    ],
    "coverage": "12 – 14 m²/L",
    "sheen": "Yüksek Parlak",
    "drying": "4 – 6 Saat",
    "surface": "İç ve dış demir, çelik ve ahşap yapı elemanları"
  },
  "antipas": {
    "name": "Filli Pas Önleyici Antipas",
    "category": "ahsap-metal",
    "tag": "Korozyon Kalkanı",
    "sub": "Metal ve demir yüzeyler için pas oluşumunu bloke eden sentetik koruyucu astar",
    "img": "assets/filli-official/antipas.png",
    "sizes": [
      "0.75 L",
      "2.5 L",
      "15 L"
    ],
    "coverage": "11 – 13 m²/L",
    "sheen": "Antipas Mat (Gri / Kırmızı)",
    "drying": "3 – 5 Saat",
    "surface": "İç ve dış siyah sac, profil, boru, demir doğrama"
  },
  "aqua-reno-mutfak": {
    "name": "Aqua Reno® Mutfak Dönüşüm Boyası",
    "category": "donusum-efekt",
    "tag": "Zımparasız / Astarsız",
    "sub": "Mutfak dolapları, laminat, membran ve ahşap kapakları kırmadan dökmeden şıp diye yenileyen su bazlı boya.",
    "img": "assets/filli-official/aqua-reno-mutfak.png",
    "sizes": [
      "0.75 L",
      "2.5 L"
    ],
    "coverage": "10 – 12 m²/L (Tek kat)",
    "sheen": "İpeksi Mat Kadife",
    "drying": "2 – 3 Saat (Katlar arası)",
    "surface": "Mutfak dolabı, laminat, kaplama ahşap, mdf"
  },
  "aqua-reno-banyo": {
    "name": "Aqua Reno® Banyo & Fayans Dönüşüm Boyası",
    "category": "donusum-efekt",
    "tag": "Suya & Neme Tam Direnç",
    "sub": "Fayans, seramik, küvet çevresi ve banyo tezgahlarında kırıp dökmeden derzleri ve karoları yenileyen özel boya.",
    "img": "assets/filli-official/aqua-reno-banyo.png",
    "sizes": [
      "0.75 L",
      "2.5 L"
    ],
    "coverage": "9 – 11 m²/L",
    "sheen": "Yarı Parlak Pürüzsüz",
    "drying": "3 – 4 Saat",
    "surface": "Fayans, seramik, karo, tezgah arkası, lavabo kenarı"
  },
  "aqua-reno-parke": {
    "name": "Aqua Reno® Parke & Zemin",
    "category": "donusum",
    "tag": "Trafik Dayanımı",
    "sub": "Laminat parke, ahşap ve karo zeminler için çizilmeye dayanıklı renovasyon boyası",
    "img": "assets/filli-official/aqua-reno-mutfak.png",
    "sizes": [
      "0.75 L",
      "2 L"
    ],
    "coverage": "11 – 13 m²/L",
    "sheen": "Yarı Mat / İpeksi",
    "drying": "4 – 6 Saat (Hafif trafik 24s)",
    "surface": "Laminat parke, masif ahşap zemin, karo zemin"
  },
  "aqua-reno-vernik": {
    "name": "Aqua Reno® Koruyucu Şeffaf Vernik",
    "category": "donusum-efekt",
    "tag": "Çizilmezlik & Islak Hacim Kalkanı",
    "sub": "Aqua Reno boyalarının üzerine uygulandığında tezgah, masa ve yer fayanslarında mekanik çizilme ve kimyasal direnci artıran vernik.",
    "img": "assets/filli-official/aqua-reno-vernik.png",
    "sizes": [
      "0.75 L",
      "2.5 L"
    ],
    "coverage": "12 – 14 m²/L",
    "sheen": "İpek Mat / Parlak Şeffaf",
    "drying": "2 – 3 Saat",
    "surface": "Mutfak tezgahı, zemin seramiği, masa ve sehpa üstleri"
  },
  "seffaf-astar": {
    "name": "Şeffaf Saten Alçı Astarı (1/7)",
    "category": "astar-hazirlik",
    "tag": "1/7 Konsantre",
    "sub": "Tozumayı bağlayan, boya emilimini dengeleyen ve sarfiyatı %30 azaltan mikro astar",
    "img": "assets/filli-official/seffaf-astar.png",
    "sizes": [
      "0.75 L",
      "2.5 L",
      "15 L"
    ],
    "coverage": "40 – 50 m²/L (Sulandırılmış)",
    "sheen": "Şeffaf / Toz Bağlayıcı",
    "drying": "1 – 2 Saat",
    "surface": "Saten alçı, macun, alçıpan, gazbeton, kireçli yüzeyler"
  },
  "dis-cephe-astar": {
    "name": "Dış Cephe Silikonlu Astar",
    "category": "astar-hazirlik",
    "tag": "Derin Nüfuz",
    "sub": "Mantolama sıvası ve mineral yüzeylerde boyanın tutunmasını sağlayan silikon astar",
    "img": "assets/filli-official/dis-cephe-astar.png",
    "sizes": [
      "2.5 L",
      "15 L"
    ],
    "coverage": "9 – 12 m²/L",
    "sheen": "Şeffaf Beyaz",
    "drying": "4 – 6 Saat",
    "surface": "Dış cephe brüt beton, sıva, Capatect ısı yalıtım sıvası"
  },
  "hazir-macun": {
    "name": "Filli Boya Hazır İç Cephe Macunu",
    "category": "astar-hazirlik",
    "tag": "Pürüzsüz Dolgu",
    "sub": "Kolay zımparalanan, çatlama yapmayan su bazlı iç mekan tamir ve düzeltme macunu",
    "img": "assets/filli-official/hazir-macun.png",
    "sizes": [
      "3.5 kg",
      "20 kg"
    ],
    "coverage": "0.8 – 1.5 kg/m²",
    "sheen": "Dolgulu Beyaz",
    "drying": "2 – 4 Saat (Zımpara öncesi)",
    "surface": "İç mekan duvar ve tavan çatlakları, delikler, pürüzler"
  },
  "tiner": {
    "name": "Filli Boya Sentetik Tiner",
    "category": "astar-hazirlik",
    "tag": "Saf Çözücü",
    "sub": "Solvent bazlı boyalar için yüksek çözücü güçlü, buharlaşma dengeli tiner",
    "img": "assets/filli-official/sentomaxx-mat.png",
    "sizes": [
      "0.5 L",
      "0.9 L",
      "2.5 L",
      "12 L"
    ],
    "coverage": "Boya hacminin %5 – %15'i",
    "sheen": "Saf Berrak Solvent",
    "drying": "Hızlı Buharlaşma",
    "surface": "Sentetik boya, vernik, astar inceltme ve ekipman temizliği"
  },
  "capatect-dalmacyali": {
    "name": "Capatect Dalmaçyalı® Karbonlu EPS Levha",
    "category": "eps-levha",
    "tag": "λ = 0.032 W/mK / %20 Yüksek Yalıtım",
    "sub": "İdeal karbon dağılımı ve benekli deseniyle standart beyaz strafora göre %20 daha yüksek yalıtım sunan mantolama levhası.",
    "img": "assets/filli-official/capatect-dalmacyali.png",
    "sizes": [
      "3 cm (8 m²/Paket)",
      "4 cm (6 m²/Paket)",
      "5 cm (5 m²/Paket)",
      "6 cm (4 m²/Paket)",
      "8 cm (3 m²/Paket)"
    ],
    "coverage": "0.5 m² / Levha",
    "sheen": "Karbon Dağılımlı EPS",
    "drying": "Esnemez Boyutsal Kararlılık",
    "surface": "Dış cephe tuğla, gazbeton, bims ve brüt beton"
  },
  "capatect-yapistirma": {
    "name": "Capatect Yapıştırma Harcı",
    "category": "yalitim",
    "tag": "C2TE Tutunma",
    "sub": "Isı yalıtım levhalarını mineral cepheye kilitleyen polimer modifiyeli yapıştırıcı",
    "img": "assets/filli-official/capatect-dalmacyali.png",
    "sizes": [
      "25 kg Torba"
    ],
    "coverage": "4 – 5 kg/m²",
    "sheen": "Gri Çimento Esaslı",
    "drying": "24 Saat (Dübel öncesi)",
    "surface": "Tuğla, gazbeton, briket, brüt beton dış cepheler"
  },
  "capatect-donati-sivasi": {
    "name": "Capatect Elyaf Donatı Sıvası",
    "category": "yalitim",
    "tag": "Çatlama Direnci",
    "sub": "Isı yalıtım levhası üzerine uygulanan, mikro sentetik elyaf takviyeli sıva harcı",
    "img": "assets/filli-official/capatect-dalmacyali.png",
    "sizes": [
      "25 kg Torba"
    ],
    "coverage": "4 – 4.5 kg/m²",
    "sheen": "Gri Polimer Sıva",
    "drying": "48 Saat (Astar öncesi)",
    "surface": "Capatect Dalmaçyalı EPS ve taşyünü levha yüzeyi"
  },
  "capatect-file": {
    "name": "Capatect 160 gr Donatı Filesi",
    "category": "yalitim",
    "tag": "Alkali Dirençli",
    "sub": "Termal gerilmeleri emen, çatlakları önleyen yüksek mukavemetli cam elyaf file",
    "img": "assets/filli-official/capatect-dalmacyali.png",
    "sizes": [
      "1.1 m x 50 m (55 m²)"
    ],
    "coverage": "1.1 m² / m² (Bindirmeli)",
    "sheen": "160 g/m² E-Glass",
    "drying": "Sıva içine gömülür",
    "surface": "Dış cephe mantolama donatı sıvası katmanı"
  },
  "capatect-dubel": {
    "name": "Capatect Mekanik Çelik & Plastik Dübel",
    "category": "yalitim",
    "tag": "Rüzgar Kalkanı",
    "sub": "Ege ve Çeşme fırtına rüzgar emme kuvvetlerine karşı cepheyi kilitleyen dübel",
    "img": "assets/filli-official/capatect-dalmacyali.png",
    "sizes": [
      "10x95 mm",
      "10x115 mm",
      "10x135 mm"
    ],
    "coverage": "6 – 8 Adet / m²",
    "sheen": "Geniş Başlıklı Dübel",
    "drying": "Mekanik Montaj",
    "surface": "Beton, tuğla, delikli tuğla, gazbeton duvarlar"
  },
  "kestirme-firca": {
    "name": "Kestirme Fırça",
    "category": "firca-rulo",
    "tag": "Doğal Kıl / Epoksi",
    "sub": "Tavan-duvar birleşimleri ve süpürgelik kenarları için kıl dökmeyen profesyonel kestirme fırçası.",
    "img": "assets/filli-official/kestirme-firca.png",
    "sizes": [
      "No: 1 (20 mm)",
      "No: 2 (50 mm)",
      "No: 3 (70 mm)",
      "No: 4 (100 mm)"
    ],
    "coverage": "Tüm boya tipleri",
    "sheen": "Doğal Beyaz Kıl",
    "drying": "Solvent Dayanımlı",
    "surface": "İç/Dış köşe ve detay kestirmeleri"
  },
  "luks-kestirme-firca": {
    "name": "Lüks Ahşap Saplı Kestirme",
    "category": "firca-rulo",
    "tag": "Usta Özel / Ergonomik",
    "sub": "Vurgu ve hassas çizgi uygulamaları için vernikli masif ahşap saplı ekstra yoğun kıl fırça.",
    "img": "assets/filli-official/luks-kestirme-firca.png",
    "sizes": [
      "No: 1.5 (35 mm)",
      "No: 2.5 (60 mm)",
      "No: 3 (70 mm)",
      "No: 4 (100 mm)"
    ],
    "coverage": "Su & Yağ Bazlı",
    "sheen": "Masif Ahşap Sap",
    "drying": "Yıkanabilir / Uzun Ömürlü",
    "surface": "Hassas mimari detaylar ve ahşap boyama"
  },
  "robot-firca": {
    "name": "Robot Fırça (Açılı Tavan)",
    "category": "firca-rulo",
    "tag": "Erişilmez Köşeler",
    "sub": "Sırık ucuna takılabilen ayarlanabilir açılı başlığıyla yüksek tavan ve kiriş diplerini kestiren fırça.",
    "img": "assets/filli-official/robot-firca.png",
    "sizes": [
      "No: 3 (70 mm)",
      "No: 4 (100 mm)"
    ],
    "coverage": "Teleskopik uyumlu",
    "sheen": "Açılı Mafsallı Gövde",
    "drying": "Tavan / Kiriş Köşesi",
    "surface": "Merdiven gerektirmeyen yüksek tavan kenarları"
  },
  "standart-siyah-firca": {
    "name": "Standart Siyah Yağlı Boya Fırçası",
    "category": "firca-rulo",
    "tag": "Solvent & Tiner Dayanımı",
    "sub": "Sentetik boya, vernik, yat verniği ve antipas uygulamaları için sertleştirilmiş siyah kıl fırça.",
    "img": "assets/filli-official/standart-siyah-firca.png",
    "sizes": [
      "No: 1 (20 mm)",
      "No: 2 (50 mm)",
      "No: 3 (70 mm)",
      "No: 4 (100 mm)"
    ],
    "coverage": "Sentetik / Tiner Bazlı",
    "sheen": "Siyah Doğal Kıl",
    "drying": "Tiner Dayanıklı",
    "surface": "Demir doğrama, kapı, ferforje ve ahşap"
  },
  "saten-rulo": {
    "name": "Saten Boya Rulosu (Saplı)",
    "category": "firca-rulo",
    "tag": "Sıfır Rulo İzi",
    "sub": "Alçı ve saten düzgünlüğündeki iç duvarlarda rulo izi bırakmayan mikrofiber dokuma rulo.",
    "img": "assets/filli-official/saten-rulo.png",
    "sizes": [
      "10 cm (Mini)",
      "20 cm (Saplı)",
      "25 cm (Saplı)"
    ],
    "coverage": "Alçı & Düz Zemin",
    "sheen": "İnce Dokuma Poliamid",
    "drying": "Sıçratmaz Hav",
    "surface": "Pürüzsüz iç cephe alçı sıva yüzeyleri"
  },
  "ipeksi-rulo": {
    "name": "İpeksi Mat® Özel Rulo",
    "category": "firca-rulo",
    "tag": "Momento Silan Uyumlu",
    "sub": "Momento Silan ve Momento Max boyalarının kadifemsi ipeksi mat dokusunu tam homojen yayan rulo.",
    "img": "assets/filli-official/ipeksi-rulo.png",
    "sizes": [
      "20 cm (Saplı)",
      "25 cm (Saplı)"
    ],
    "coverage": "Silikonlu & Silinebilir",
    "sheen": "Özel Tüysüz İpeksi Hav",
    "drying": "Homojen Yayılım",
    "surface": "İç cephe silikonlu ipeksi mat boyalar"
  },
  "plasbo-rulo": {
    "name": "Plasbo Plastik Boya Rulosu",
    "category": "firca-rulo",
    "tag": "Yüksek Boya Tutuşu",
    "sub": "Klasik mat plastik boyalar ve tavan boyalarında damlatma yapmadan geniş yüzeyi hızla doyuran rulo.",
    "img": "assets/filli-official/plasbo-rulo.png",
    "sizes": [
      "20 cm (Saplı)",
      "25 cm (Saplı)"
    ],
    "coverage": "Plastik & Tavan Boyası",
    "sheen": "Yüksek Emişli Akrilik Hav",
    "drying": "Damlatmaz Gövde",
    "surface": "Sıva, kara sıva ve tavan yüzeyleri"
  },
  "dis-cephe-rulosu": {
    "name": "Dış Cephe Düz Boya Rulosu",
    "category": "firca-rulo",
    "tag": "Pürüzlü Zemin / Uzun Hav",
    "sub": "Dış cephe sıva çukurlarına ve pürüzlerine boyayı derinlemesine yediren uzun havlı dayanıklı rulo.",
    "img": "assets/filli-official/dis-cephe-rulosu.png",
    "sizes": [
      "20 cm (Saplı)",
      "25 cm (Saplı)"
    ],
    "coverage": "Dış Cephe Sıvaları",
    "sheen": "Aşınmaz Poliamid Hav",
    "drying": "Derin Nüfuz",
    "surface": "Tüm dış cephe kaba sıva ve mineral yüzeyler"
  },
  "ekstra-posteki-rulo": {
    "name": "Ekstra Doğal Posteki Dış Cephe Rulosu",
    "category": "firca-rulo",
    "tag": "%100 Doğal Kuzu Postu",
    "sub": "Büyük metraj dış cephe projelerinde maksimum boya taşıma ve çatlak doldurma gücüne sahip posteki rulo.",
    "img": "assets/filli-official/ekstra-posteki-rulo.png",
    "sizes": [
      "20 cm (Saplı)",
      "25 cm (Saplı)"
    ],
    "coverage": "Yüksek Metraj Dış Cephe",
    "sheen": "Doğal Kuzu Postu",
    "drying": "Aşırı Dayanıklı",
    "surface": "Taş, brüt beton ve tırtıklı dış cepheler"
  },
  "mercan-rulo": {
    "name": "Mercan Grenli Rulo (Sünger Dokulu)",
    "category": "firca-rulo",
    "tag": "Tekstür & Gren Efekti",
    "sub": "Grenli dış cephe kaplamalarında ve dekoratif sıvalarda gözenekli portakal kabuğu deseni veren rulo.",
    "img": "assets/filli-official/mercan-rulo.png",
    "sizes": [
      "20 cm (Saplı)",
      "25 cm (Saplı)"
    ],
    "coverage": "Grenli Kaplamalar",
    "sheen": "Delikli Mercan Sünger",
    "drying": "Desen Verici",
    "surface": "Aqusto Grenli ve tekstürlü dış kaplamalar"
  },
  "mini-rulo": {
    "name": "Mini Parmak Rulo (Saplı Set)",
    "category": "firca-rulo",
    "tag": "Petek Arkası & Dar Alan",
    "sub": "Kalorifer peteği arkaları, kapı pervazları, dolap dipleri ve dar nişler için 10 cm ince parmak rulo.",
    "img": "assets/filli-official/mini-rulo.png",
    "sizes": [
      "10 cm Saplı Takım",
      "10 cm 5'li Yedek"
    ],
    "coverage": "Dar & Ulaşılmaz Alan",
    "sheen": "Kompakt Silindir",
    "drying": "Hafif Gövde",
    "surface": "Petek arkası, kapı ve süpürgelik üstü"
  },
  "aqua-reno-kadife-rulo": {
    "name": "Aqua Reno® Kadife Rulo",
    "category": "firca-rulo",
    "tag": "Mobilya & Fayans Dönüşüm",
    "sub": "Mutfak dolabı, fayans ve tezgah boyamada ayna pürüzsüzlüğü veren sıfır iz kadife dokulu rulo.",
    "img": "assets/filli-official/aqua-reno-kadife-rulo.png",
    "sizes": [
      "10 cm Saplı Takım",
      "10 cm 2'li Yedek"
    ],
    "coverage": "Dönüşüm Yüzeyleri",
    "sheen": "Ultra Sıkı Kadife Hav",
    "drying": "Ayna Pürüzsüzlüğü",
    "surface": "Mutfak dolap kapağı, fayans, seramik, tezgah"
  },
  "kapatan": {
    "name": "Kapatan Leke Örtücü Bariyer Boya",
    "category": "yuzey-hazirlik",
    "tag": "İs, Nikotin, Kurum & Yağ",
    "sub": "Yangın izleri, baca isi, nikotin sararması ve su lekelerini alttan kilitleyerek kusan lekeleri yok eden mat boya.",
    "img": "assets/filli-official/kapatan.png",
    "sizes": [
      "0.75 L",
      "2.5 L",
      "15 L"
    ],
    "coverage": "7 – 10 m²/L",
    "sheen": "Mat (Bariyer Kalkan)",
    "drying": "1 Saat (Dokunma)",
    "surface": "Lekeli tavan, mutfak baca duvarı, yangın hasarı"
  },
  "panzer-astar": {
    "name": "Panzer Astar (Nem & Tuz Bariyeri)",
    "category": "yuzey-hazirlik",
    "tag": "Tuz Kusması & Rutubet Zırhı",
    "sub": "Kuzey cephe, bodrum ve zemin katlarda duvar içinden gelen tuz kusmasını ve rutubet kabarmasını durduran zırh.",
    "img": "assets/filli-official/panzer-astar.png",
    "sizes": [
      "2.5 L",
      "15 L"
    ],
    "coverage": "5 – 8 m²/L",
    "sheen": "Bariyer Emülsiyon",
    "drying": "4 – 6 Saat",
    "surface": "Rutubetli sıva, su basman kotu, tuz kusan duvar"
  },
  "momento-konsantre-astar": {
    "name": "Momento 1/7 Konsantre Astar",
    "category": "yuzey-hazirlik",
    "tag": "1/7 Su ile İncelir",
    "sub": "Saten alçı yüzeylerin aşırı emiciliğini doyuran, boya sarfiyatını %40 azaltan mikronize derin penetrasyon astarı.",
    "img": "assets/filli-official/momento-konsantre-astar.png",
    "sizes": [
      "0.75 L",
      "2.5 L",
      "15 L"
    ],
    "coverage": "40 – 60 m²/L (İnceltilmiş)",
    "sheen": "Şeffaf Penetrasyon",
    "drying": "2 – 4 Saat",
    "surface": "Saten alçı, alçıpan, tozuyan kireçli zemin"
  },
  "momento-seffaf-jel-astar": {
    "name": "Momento Şeffaf Jel Astar",
    "category": "yuzey-hazirlik",
    "tag": "Sıçramaz Jel Kıvam",
    "sub": "Tavan ve yüksek duvar astar uygulamalarında damlatmayan, rulo üzerinden sıçramayan jel bağlayıcı astar.",
    "img": "assets/filli-official/momento-seffaf-jel-astar.png",
    "sizes": [
      "2.5 L",
      "15 L"
    ],
    "coverage": "10 – 14 m²/L",
    "sheen": "Şeffaf Jel",
    "drying": "2 – 3 Saat",
    "surface": "Tavan alçısı, iç cephe tamir yüzeyleri"
  },
  "momento-pigmentli-astar": {
    "name": "Momento Pigmentli Örtücü Astar",
    "category": "yuzey-hazirlik",
    "tag": "Koyu Renkten Açığa Geçiş",
    "sub": "Koyu renk boyanmış duvarları tek katta beyaza çeviren, üzerine gelecek son kat boyanın kapatıcılığını artıran astar.",
    "img": "assets/filli-official/momento-pigmentli-astar.png",
    "sizes": [
      "2.5 L",
      "7.5 L",
      "15 L"
    ],
    "coverage": "11 – 14 m²/L",
    "sheen": "Beyaz Örtücü Mat",
    "drying": "2 – 4 Saat",
    "surface": "Renk değişimi yapılacak iç cephe duvarları"
  },
  "momento-donusum-astari": {
    "name": "Momento Dönüşüm Astarı",
    "category": "yuzey-hazirlik",
    "tag": "Sentetikten Su Bazlıya",
    "sub": "Eski yağlı boya ve sentetik zeminlerin üzerine su bazlı Momento boyaların zımparasız yapışmasını sağlayan köprü astar.",
    "img": "assets/filli-official/momento-donusum-astari.png",
    "sizes": [
      "2.5 L",
      "15 L"
    ],
    "coverage": "10 – 13 m²/L",
    "sheen": "Aderans Köprüsü Mat",
    "drying": "3 – 5 Saat",
    "surface": "Eski yağlı boyalı duvarlar, kapılar ve panel zeminler"
  },
  "momento-brut-beton-astari": {
    "name": "Momento Brüt Beton Astarı (Betokontakt)",
    "category": "yuzey-hazirlik",
    "tag": "Kuvars Kumlu Aderans",
    "sub": "Pürüzsüz brüt beton tavan ve kolonlara alçı ve çimento esaslı sıvaların sıkıca tutunmasını sağlayan pürüzlendirici astar.",
    "img": "assets/filli-official/momento-brut-beton-astari.png",
    "sizes": [
      "12 kg",
      "20 kg"
    ],
    "coverage": "4 – 6 m²/kg",
    "sheen": "Kuvars Taneli Dokulu",
    "drying": "12 – 24 Saat (Sıva öncesi)",
    "surface": "Kalıp brüt beton tavan, perde duvar, prekast kolon"
  },
  "momento-macun": {
    "name": "Momento Süper İç Cephe Macunu",
    "category": "yuzey-hazirlik",
    "tag": "Kullanıma Hazır Pürüzsüzlük",
    "sub": "Çatlak, delik ve yüzey dalgalanmalarını dolduran, kolay zımparalanan, tozuma yapmayan hazır akrilik macun.",
    "img": "assets/filli-official/momento-macun.png",
    "sizes": [
      "5 kg",
      "25 kg"
    ],
    "coverage": "0.8 – 1.5 kg/m²",
    "sheen": "Pürüzsüz Dolgu",
    "drying": "2 – 4 Saat (Zımpara)",
    "surface": "İç cephe çatlakları, alçıpan ek yerleri ve sıva"
  },
  "aqusto-silan-astar": {
    "name": "Aqusto Silan Dış Cephe Astarı",
    "category": "yuzey-hazirlik",
    "tag": "Silikonlu Su İtici Astar",
    "sub": "Dış cephe sıvalarının su emiciliğini bloke eden, Aqusto Silan son kat boyanın ömrünü ve tutunmasını 2 katına çıkaran astar.",
    "img": "assets/filli-official/aqusto-silan-astar.png",
    "sizes": [
      "2.5 L",
      "15 L"
    ],
    "coverage": "9 – 12 m²/L",
    "sheen": "Nefes Alan Silikon",
    "drying": "4 – 6 Saat",
    "surface": "Dış cephe mineral sıva, brüt beton, eski boya"
  },
  "aqusto-sil-astar": {
    "name": "Aqusto Sil Fotokatalitik Astar",
    "category": "yuzey-hazirlik",
    "tag": "Kendi Kendini Temizleyen Sistem",
    "sub": "Aqusto Sil dış cephe boyasının fotokatalitik kir itici etkisini güçlendiren nano silikon astar.",
    "img": "assets/filli-official/aqusto-sil-astar.png",
    "sizes": [
      "2.5 L",
      "15 L"
    ],
    "coverage": "8 – 11 m²/L",
    "sheen": "Nano Silikon Bağlayıcı",
    "drying": "4 – 6 Saat",
    "surface": "Yoğun trafikli cadde ve şehir cepheleri"
  },
  "aqusto-macun": {
    "name": "Aqusto Dış Cephe Akrilik Macun",
    "category": "yuzey-hazirlik",
    "tag": "Elastik Dış Macun",
    "sub": "Güneş, yağmur ve sıcaklık farklarında çatlamayan, dış cephe kılcal çatlaklarını kalıcı kapatan akrilik macun.",
    "img": "assets/filli-official/aqusto-macun.png",
    "sizes": [
      "5 kg",
      "25 kg"
    ],
    "coverage": "1.0 – 2.0 kg/m²",
    "sheen": "Elastik Macun Dolgu",
    "drying": "12 – 24 Saat",
    "surface": "Dış cephe sıva çatlakları, pencere kenarı dolgusu"
  },
  "sentomaxx-sentetik-astar": {
    "name": "SentoMaXX® Sentetik Astar",
    "category": "yuzey-hazirlik",
    "tag": "Ahşap & Metal Zımpara Astarı",
    "sub": "Ahşap ve metal yüzeylerdeki gözenekleri dolduran, kolayca pürüzsüz zımparalanan aromatsız sentetik astar.",
    "img": "assets/filli-official/sentomaxx-sentetik-astar.png",
    "sizes": [
      "0.75 L",
      "2.5 L",
      "15 L"
    ],
    "coverage": "12 – 15 m²/L",
    "sheen": "Mat Zımparalanabilir",
    "drying": "8 – 12 Saat",
    "surface": "Ahşap doğrama, mobilya, mdf, metal yüzeyler"
  },
  "sentomaxx-antipas": {
    "name": "SentoMaXX® Korozyon Önleyici Antipas",
    "category": "yuzey-hazirlik",
    "tag": "Pas Kalkanı (Kırmızı / Gri)",
    "sub": "Demir ve çelik konstrüksiyonları paslanmaya ve neme karşı koruyan yüksek mukavemetli pas önleyici astar.",
    "img": "assets/filli-official/sentomaxx-antipas.png",
    "sizes": [
      "0.75 L",
      "2.5 L",
      "15 L"
    ],
    "coverage": "11 – 13 m²/L",
    "sheen": "Mat Koruyucu",
    "drying": "4 – 6 Saat (Son kat öncesi)",
    "surface": "Ferforje demir, çit, boru, çelik profil, saç"
  },
  "filli-boya-sentetik-tiner": {
    "name": "Filli Boya Sentetik Tiner (Saf Çözücü)",
    "category": "yuzey-hazirlik",
    "tag": "Aromatsız / Düşük Koku",
    "sub": "Sentetik boya, vernik ve antipasları ideal uygulama viskozitesine getiren, fırça ve rulo temizliğinde kullanılan saf solvent.",
    "img": "assets/filli-official/filli-boya-sentetik-tiner.png",
    "sizes": [
      "0.5 L",
      "0.9 L",
      "2.8 L",
      "12 L"
    ],
    "coverage": "İnceltici / Temizleyici",
    "sheen": "Saf Solvent",
    "drying": "Hızlı Uçucu",
    "surface": "Sentetik boya inceltme ve alet temizliği"
  },
  "aluminyum-teleskopik-sap": {
    "name": "Alüminyum Teleskopik Rulo Sırığı",
    "category": "santiye-sarf",
    "tag": "Hafif & Kilitli Sistem",
    "sub": "Yüksek tavan ve dış cephe boyama işlemlerinde merdiven gereksinimini azaltan, konik kilitli uzatma sırığı.",
    "img": "assets/filli-official/aluminyum-teleskopik-sap.png",
    "sizes": [
      "2 Metre (Kademeli)",
      "3 Metre (Kademeli)"
    ],
    "coverage": "Tüm Filli rulo sapları",
    "sheen": "Eloksallı Alüminyum",
    "drying": "Esnemez Gövde",
    "surface": "Yüksek tavanlar, bina cepheleri, merdiven boşlukları"
  },
  "rulo-elegi": {
    "name": "Filli Plastik Rulo Izgarası / Eleği",
    "category": "santiye-sarf",
    "tag": "Damlatmayı Sıfırlar",
    "sub": "Boya kovasına takılarak rulonun üzerindeki fazla boyayı sıyıran ve duvara eşit boya transferi sağlayan ızgara.",
    "img": "assets/filli-official/rulo-elegi.png",
    "sizes": [
      "Standart (26 x 28 cm)"
    ],
    "coverage": "15 L ve 7.5 L kovalar",
    "sheen": "Dayanıklı Polipropilen",
    "drying": "Yıkanabilir / Tekrar Kullanım",
    "surface": "Tüm iç ve dış boya kovaları"
  },
  "filli-maskeleme-bandi": {
    "name": "Filli Profesyonel Maskeleme Bandı",
    "category": "santiye-sarf",
    "tag": "Kalıntı Bırakmaz / Keskin Hat",
    "sub": "Süpürgelik, kapı kasası ve priz kenarlarında boya sızmasını önleyen, sökülürken zemine ve boyaya zarar vermeyen krep bant.",
    "img": "assets/filli-official/filli-maskeleme-bandi.png",
    "sizes": [
      "24 mm x 40 m",
      "36 mm x 40 m",
      "48 mm x 40 m"
    ],
    "coverage": "40 Metre / Rulo",
    "sheen": "Doğal Kauçuk Yapışkan",
    "drying": "Kolay Sökülür",
    "surface": "Süpürgelik, pencere doğraması, cam, priz"
  },
  "filli-koruma-ortusu": {
    "name": "Filli Hışır Koruma Örtüsü",
    "category": "santiye-sarf",
    "tag": "Mobilya & Eşya Koruma",
    "sub": "Tadilat sırasında koltuk, dolap, masa ve zeminleri boya damlalarından ve alçı tozundan koruyan statik naylon örtü.",
    "img": "assets/filli-official/filli-koruma-ortusu.png",
    "sizes": [
      "20 m² (4 x 5 m)",
      "32 m² (4 x 8 m)",
      "50 m² (4 x 12.5 m)"
    ],
    "coverage": "20 – 50 m² Alan",
    "sheen": "Statik Yapışma",
    "drying": "Hafif & Pratik",
    "surface": "Ev eşyaları, mobilyalar, zemin parkeleri"
  },
  "filli-koruyucu-branda": {
    "name": "Filli Kalın Şantiye Zemin Brandası",
    "category": "santiye-sarf",
    "tag": "Ağır Hizmet / Yırtılmaz",
    "sub": "İskele altı, koridor ve şantiye zeminlerinde ayak trafiğine ve merdiven baskısına dayanıklı kalın polietilen branda.",
    "img": "assets/filli-official/filli-koruyucu-branda.png",
    "sizes": [
      "30 m² (Kalın Şantiye Tipi)",
      "50 m² (Kalın Şantiye Tipi)"
    ],
    "coverage": "30 – 50 m² Zemin",
    "sheen": "Ağır Hizmet PE",
    "drying": "Yırtılmaz / Tekrar Kullanım",
    "surface": "Mermer, seramik, lamine parke zemin koruma"
  },
  "filli-mastik": {
    "name": "Filli Boyanabilir Akrilik Mastik",
    "category": "santiye-sarf",
    "tag": "Elastik Dolgu / Boyanabilir",
    "sub": "Pencere-duvar birleşimleri, kapı pervazları ve süpürgelik çatlaklarını dolduran, üzeri anında boyanabilen akrilik mastik.",
    "img": "assets/filli-official/filli-mastik.png",
    "sizes": [
      "310 ml Kartuş (Beyaz)"
    ],
    "coverage": "10 – 12 Metre / Kartuş",
    "sheen": "Elastik Beyaz Dolgu",
    "drying": "1 – 2 Saat (Boyanabilir)",
    "surface": "Kapı-pencere kenarları, süpürgelik birleşimleri"
  },
  "dolgu-kopugu": {
    "name": "Filli Poliüretan Montaj & Dolgu Köpüğü",
    "category": "santiye-sarf",
    "tag": "Isı & Ses İzolasyon Köpüğü",
    "sub": "Kapı-pencere kasası montajında, tesisat boru geçişlerinde boşluk doldurma ve ısı-ses izolasyonu sağlayan pipetli köpük.",
    "img": "assets/filli-official/dolgu-kopugu.png",
    "sizes": [
      "750 ml Pipetli Teneke"
    ],
    "coverage": "35 – 45 Litre Verim",
    "sheen": "Genleşen Sert Köpük",
    "drying": "20 Dakika (Kesilebilir)",
    "surface": "Kapı, pencere kasaları, çatı boşlukları, boru geçişleri"
  },
  "mini-mercan-rulo": {
    "name": "Mini Mercan Rulo (Grenli Detay)",
    "category": "santiye-sarf",
    "tag": "Dar Alan Tekstür Deseni",
    "sub": "Balkon kenarları, pencere söveleri ve kolon detaylarında grenli dış cephe kaplamasına doku veren 10 cm delikli sünger rulo.",
    "img": "assets/filli-official/mini-mercan-rulo.png",
    "sizes": [
      "10 cm Saplı Takım",
      "10 cm 2'li Yedek"
    ],
    "coverage": "Dar & Detay Cephe",
    "sheen": "Delikli Sünger Doku",
    "drying": "Desen Kontrolü",
    "surface": "Pencere söveleri, balkon parapetleri, kolon köşeleri"
  },
  "filli-boya-sutut": {
    "name": "Filli Boya Sutut Sürme Su Yalıtımı",
    "category": "yapi-kimyasal",
    "tag": "Elastomerik / UV Dirençli",
    "sub": "Teras, çatı, oluk ve ıslak hacimlerde eksiz su geçirimsiz elastik membran oluşturan sürme yalıtım.",
    "img": "assets/filli-official/filli-boya-sutut.png",
    "sizes": [
      "1 kg",
      "3 kg",
      "10 kg",
      "20 kg"
    ],
    "coverage": "1.0 – 1.5 kg/m² (İki kat)",
    "sheen": "Elastik Beyaz Membran",
    "drying": "24 Saat (Tam Kuruma)",
    "surface": "Beton teras, çatı, gizli dere, saçak, balkon"
  },
  "filli-boya-elyafli-sutut": {
    "name": "Filli Boya Elyaflı Sutut",
    "category": "yapi-kimyasal",
    "tag": "Polipropilen Elyaf Takviyeli",
    "sub": "İçindeki mikro elyaflar sayesinde file gerektirmeden çatlak köprüleme yapan yüksek mekanik dirençli Sutut.",
    "img": "assets/filli-official/filli-boya-elyafli-sutut.png",
    "sizes": [
      "3 kg",
      "10 kg",
      "20 kg"
    ],
    "coverage": "1.5 – 2.0 kg/m²",
    "sheen": "Lif Takviyeli Elastik",
    "drying": "24 – 48 Saat",
    "surface": "Teras, baca dipleri, parapet ve kılcal çatlaklı beton"
  },
  "filli-boya-sutut-uv-extra": {
    "name": "Filli Boya Sutut UV Extra",
    "category": "yapi-kimyasal",
    "tag": "Maksimum Güneş & UV Dayanımı",
    "sub": "Doğrudan güneş alan açık teras ve çatılarda sararmayan, sıcaktan yumuşamayan yüksek UV korumalı formül.",
    "img": "assets/filli-official/filli-boya-sutut-uv-extra.png",
    "sizes": [
      "10 kg",
      "20 kg"
    ],
    "coverage": "1.2 – 1.8 kg/m²",
    "sheen": "Yüksek Yansıtıcı Beyaz",
    "drying": "24 Saat",
    "surface": "Güneşe maruz çatı, teras ve kubbe yüzeyleri"
  },
  "filli-boya-bitumfleks": {
    "name": "Filli Boya Bitümfleks",
    "category": "yapi-kimyasal",
    "tag": "Kauçuklu Bitüm Emülsiyonu",
    "sub": "Temel, perde duvar ve bodrum dış cephelerinde toprak altı rutubet ve basınca dayanıklı siyah likit membran.",
    "img": "assets/filli-official/filli-boya-bitumfleks.png",
    "sizes": [
      "5 kg",
      "16 kg"
    ],
    "coverage": "1.0 – 1.5 kg/m²",
    "sheen": "Siyah Kauçuk Membran",
    "drying": "6 – 8 Saat",
    "surface": "Temel, bodrum perde duvarı, istinat duvarı"
  },
  "filli-boya-bitumfleks-2k": {
    "name": "Filli Boya Bitümfleks 2K",
    "category": "yapi-kimyasal",
    "tag": "Çift Bileşenli Ağır Hizmet",
    "sub": "Yüksek zemin su basıncına karşı toz ve sıvı bileşenden oluşan hızlı priz alan kalın bitümlü kaplama.",
    "img": "assets/filli-official/filli-boya-bitumfleks-2k.png",
    "sizes": [
      "30 kg Set (Sıvı + Toz)"
    ],
    "coverage": "3.0 – 4.5 kg/m² (3-4 mm kalınlık)",
    "sheen": "Kalın Siyah Mastik Zırh",
    "drying": "24 – 48 Saat",
    "surface": "Zemin suyu ve yeraltı basınçlı su yalıtımları"
  },
  "filli-boya-fayfiks": {
    "name": "Filli Boya Fayfiks Standart Yapıştırıcı",
    "category": "yapi-kimyasal",
    "tag": "C1T Sınıfı Fayans Yapıştırıcı",
    "sub": "İç mekan duvar ve zemin fayans seramik uygulamalarında kayma yapmayan yüksek yapışma güçlü çimento harcı.",
    "img": "assets/filli-official/filli-boya-fayfiks.png",
    "sizes": [
      "25 kg Kraft Torba"
    ],
    "coverage": "3.5 – 5.0 kg/m² (Tarak boyutuna göre)",
    "sheen": "Gri / Beyaz Toz Harç",
    "drying": "24 Saat (Derz öncesi)",
    "surface": "İç mekan beton, sıva, şap üzeri seramik ve karo"
  },
  "filli-boya-fayfleks": {
    "name": "Filli Boya Fayfleks Esnek Yapıştırıcı",
    "category": "yapi-kimyasal",
    "tag": "C2TE S1 Yüksek Flex",
    "sub": "Büyük ebat porselen seramik, granit ve yerden ısıtmalı zeminlerde termal genleşmeleri tolere eden flex harç.",
    "img": "assets/filli-official/filli-boya-fayfleks.png",
    "sizes": [
      "25 kg Kraft Torba"
    ],
    "coverage": "4.0 – 6.0 kg/m²",
    "sheen": "Yüksek Polimerli Gri",
    "drying": "24 Saat",
    "surface": "Porselen, granit seramik, yerden ısıtma, teras"
  },
  "filli-boya-akrifleks": {
    "name": "Filli Boya Akrifleks Dış Cephe Yapıştırıcı",
    "category": "yapi-kimyasal",
    "tag": "Dış Cephe Ağır Hizmet C2TE",
    "sub": "Bina dış cephelerine mekanik veya yapıştırma seramik, taş ve granit kaplamalarda don ve sıcağa tam direnç.",
    "img": "assets/filli-official/filli-boya-akrifleks.png",
    "sizes": [
      "25 kg Kraft Torba"
    ],
    "coverage": "5.0 – 7.0 kg/m²",
    "sheen": "Yüksek Mukavemetli Harç",
    "drying": "24 – 48 Saat",
    "surface": "Bina dış cepheleri, havuz, su deposu ve teras"
  },
  "filli-boya-fleks-fuga": {
    "name": "Filli Boya Fleks Fuga (1–6 mm)",
    "category": "yapi-kimyasal",
    "tag": "Silikonlu Su İtici Derz",
    "sub": "Banyo, mutfak ve ıslak hacimlerde su geçirmeyen, küflenmeyen ve çatlamayan silikon katkılı derz dolgusu.",
    "img": "assets/filli-official/filli-boya-fleks-fuga.png",
    "sizes": [
      "5 kg Poşet",
      "20 kg Torba"
    ],
    "coverage": "200 – 500 g/m²",
    "sheen": "Pürüzsüz Renkli Derz",
    "drying": "12 – 24 Saat (Yaya trafiği)",
    "surface": "1–6 mm arası seramik, fayans, mermer derzleri"
  },
  "filli-boya-super-fleks-fuga": {
    "name": "Filli Boya Süper Fleks Fuga (2–20 mm)",
    "category": "yapi-kimyasal",
    "tag": "Geniş Derz / Havuz & Teras",
    "sub": "Açık teraslar, havuzlar ve dış mekan cephe kaplamalarında geniş derz aralıkları için aşınmaya dirençli dolgu.",
    "img": "assets/filli-official/filli-boya-super-fleks-fuga.png",
    "sizes": [
      "5 kg Poşet",
      "20 kg Torba"
    ],
    "coverage": "500 – 1200 g/m²",
    "sheen": "Yüksek Aşınma Dirençli",
    "drying": "24 Saat",
    "surface": "Havuz, teras, dış cephe kotto ve granit derzleri"
  },
  "filli-boya-stako": {
    "name": "Filli Boya Stako Yapısal Tamir Harcı",
    "category": "yapi-kimyasal",
    "tag": "R3 Sınıfı Kalın Tamir",
    "sub": "Kolon, kiriş, balkon parapet ve betonarme yapılardaki derin çatlak ve dökülmeleri onaran polimerli harç.",
    "img": "assets/filli-official/filli-boya-stako.png",
    "sizes": [
      "25 kg Kraft Torba"
    ],
    "coverage": "1.8 kg/m² (1 mm kalınlık için)",
    "sheen": "Tiksotropik Gri Harç",
    "drying": "24 Saat",
    "surface": "Betonarme kolon, kiriş tamiri, tij delikleri"
  },
  "filli-boya-stako-0": {
    "name": "Filli Boya Stako 0 İnce Tamir Harcı",
    "category": "yapi-kimyasal",
    "tag": "Pürüzsüz Yüzey Düzeltme",
    "sub": "Boya ve kaplama öncesinde brüt beton, prefabrik ve sıva yüzeylerindeki gözenekleri ve kılcal bozuklukları yok eden ince harç.",
    "img": "assets/filli-official/filli-boya-stako-0.png",
    "sizes": [
      "25 kg Kraft Torba"
    ],
    "coverage": "1.5 kg/m² (1 mm kalınlık için)",
    "sheen": "İnce Taneli Düzeltme",
    "drying": "12 – 24 Saat (Zımpara/Boya)",
    "surface": "Boya öncesi brüt beton, tavan ve prekast yüzeyler"
  },
  "filli-boya-stako-plus": {
    "name": "Filli Boya Stako Plus Yapısal Güçlendirme",
    "category": "yapi-kimyasal",
    "tag": "R4 Sınıfı Yüksek Mukavemet",
    "sub": "Deprem güçlendirme, viyadük, köprü ve ağır endüstriyel beton elemanlarında rötresiz donatı korozyon tamiri.",
    "img": "assets/filli-official/filli-boya-stako-plus.png",
    "sizes": [
      "25 kg Kraft Torba"
    ],
    "coverage": "2.0 kg/m² (1 mm kalınlık)",
    "sheen": "Elyaf Takviyeli R4",
    "drying": "24 – 48 Saat (Tam Priz)",
    "surface": "Endüstriyel beton, köprü, tünel, güçlendirme perdeleri"
  },
  "filli-boya-grout": {
    "name": "Filli Boya Grout Akıcı Harç",
    "category": "yapi-kimyasal",
    "tag": "Rötresiz Makine Temel Harcı",
    "sub": "Ağır makine temelleri, çelik kolon taban plakaları ve ankraj demiri montajlarında akıcı, genleşen yüksek dayanımlı harç.",
    "img": "assets/filli-official/filli-boya-grout.png",
    "sizes": [
      "25 kg Kraft Torba"
    ],
    "coverage": "2.1 kg toz / 1 L boşluk dolgusu",
    "sheen": "Kendiliğinden Yayılan Akıcı",
    "drying": "12 Saat (İlk mukavemet)",
    "surface": "Çelik taban plakası altı, vinç rayı, ankraj boşlukları"
  },
  "filli-boya-polycrete": {
    "name": "Filli Boya Polycrete 2K Tam Elastik Yalıtım",
    "category": "yapi-kimyasal",
    "tag": "Çimento + Akrilik Çift Bileşen",
    "sub": "Su depoları, olimpik havuzlar, teraslar ve temel perdelerinde çatlak köprüleyen tam elastik 2 bileşenli sürme yalıtım.",
    "img": "assets/filli-official/filli-boya-polycrete.png",
    "sizes": [
      "33 kg Set (25 kg Toz + 8 kg Sıvı)"
    ],
    "coverage": "2.0 – 3.0 kg/m² (İki kat)",
    "sheen": "Tam Elastik Çimento Zırh",
    "drying": "48 Saat (Su testi öncesi)",
    "surface": "Havuz, içme suyu deposu, teras, zemin betonu"
  },
  "filli-boya-semicrete": {
    "name": "Filli Boya Semıcrete 2K Yarı Elastik Yalıtım",
    "category": "yapi-kimyasal",
    "tag": "Pozitif Basınç İzolasyonu",
    "sub": "Banyo, balkon, mutfak ve temel altı betonlarda ekonomik, yarı elastik, yüksek yapışma güçlü çift bileşenli su yalıtımı.",
    "img": "assets/filli-official/filli-boya-semicrete.png",
    "sizes": [
      "30 kg Set (25 kg Toz + 5 kg Sıvı)"
    ],
    "coverage": "2.0 – 3.0 kg/m²",
    "sheen": "Yarı Elastik Harç Membran",
    "drying": "24 – 48 Saat",
    "surface": "Islak hacim şap altı, balkon, perde beton"
  },
  "filli-boya-lateks": {
    "name": "Filli Boya Lateks Harç Katkısı",
    "category": "yapi-kimyasal",
    "tag": "Aderans & Su Geçirimsizlik",
    "sub": "Sıva, şap ve tamir harçlarının yapışma kuvvetini katlayan, harcın su geçirimsizliğini ve esnekliğini artıran sıvı polimer katkı.",
    "img": "assets/filli-official/filli-boya-lateks.png",
    "sizes": [
      "5 kg",
      "20 kg Bidon"
    ],
    "coverage": "Bağlayıcı ağırlığının %5–10'u",
    "sheen": "Sıvı Sentetik Emülsiyon",
    "drying": "Harç Priz Süresi",
    "surface": "Şap, sıva, eski-yeni beton birleşim aderans köprüsü"
  },
  "filli-boya-bepermo": {
    "name": "Filli Boya Bepermo Su Geçirimsizlik Tozu",
    "category": "yapi-kimyasal",
    "tag": "Harç İçi Kılcal Su İtici",
    "sub": "Çimento esaslı sıva ve şapların kılcal gözeneklerini kimyasal olarak tıkayarak suyun nüfuz etmesini engelleyen toz katkı.",
    "img": "assets/filli-official/filli-boya-bepermo.png",
    "sizes": [
      "1 kg Poşet (Koli: 20 Adet)"
    ],
    "coverage": "1 torba (50 kg) çimentoya 1 kg Bepermo",
    "sheen": "Beyaz Kimyasal Toz",
    "drying": "Standart Sıva Süresi",
    "surface": "Kaba ve ince dış sıvalar, teras şapları, su basman harcı"
  },
  "filli-boya-kuruduvar": {
    "name": "Filli Boya Kuruduvar Kristalize Yalıtım",
    "category": "yapi-kimyasal",
    "tag": "Kristalize Rutubet Bariyeri",
    "sub": "Betonun içindeki neme tepki vererek kılcal kanallarda çözünmez kristaller üreten, negatif ve pozitif çalışan su yalıtımı.",
    "img": "assets/filli-official/filli-boya-kuruduvar.png",
    "sizes": [
      "25 kg Kraft Torba"
    ],
    "coverage": "1.5 – 2.0 kg/m²",
    "sheen": "Kristalize Çimento Harcı",
    "drying": "48 Saat (Islak Kürleme)",
    "surface": "Bodrum içten su yalıtımı, asansör çukurları, perde beton"
  },
  "cam-tekstili-yapistiricisi": {
    "name": "Filli Boya Cam Tekstili Yapıştırıcısı",
    "category": "yapi-kimyasal",
    "tag": "EVA Bağlayıcılı Ağır Hizmet",
    "sub": "Hastaneler ve yoğun mekanlarda cam tekstili duvar kaplamalarının duvara kabarma yapmadan yapışmasını sağlayan yapıştırıcı.",
    "img": "assets/filli-official/cam-tekstili-yapistiricisi.png",
    "sizes": [
      "10 kg Kova"
    ],
    "coverage": "150 – 250 g/m² (Desen derinliğine göre)",
    "sheen": "Şeffaflaşan Beyaz Macun",
    "drying": "24 Saat",
    "surface": "Cam tekstili duvar kaplaması, ağır duvar kağıdı"
  },
  "filepox-pr-7160": {
    "name": "FILEPOX PR-7160 Epoksi Astar",
    "category": "sanayi-epoksi",
    "tag": "Poliamid Kürlenmeli 2K Astar",
    "sub": "Ağır sanayi, deniz yapıları ve kimyasal tesislerde çelik ve beton yüzeylere yüksek yapışma sağlayan antikorozif epoksi astar.",
    "img": "assets/filli-official/filepox-pr-7160.png",
    "sizes": [
      "20 kg Set (A+B)"
    ],
    "coverage": "8 – 10 m²/kg (50 mikron KFK)",
    "sheen": "Mat Antikorozif",
    "drying": "2 – 4 Saat (Dokunma)",
    "surface": "Çelik konstrüksiyon, boru hatları, tank dış yüzeyleri"
  },
  "filepox-pr-7140": {
    "name": "FILEPOX PR-7140 Çinko Zengin Epoksi Astar",
    "category": "sanayi-epoksi",
    "tag": "Katodik Koruma (%80 Çinko)",
    "sub": "Kıyı şeridi ve C5 korozyon sınıfı ağır korozif atmosferde çeliği paslanmaya karşı katodik olarak koruyan çinkolu astar.",
    "img": "assets/filli-official/filepox-pr-7140.png",
    "sizes": [
      "25 kg Set (A+B)"
    ],
    "coverage": "5 – 7 m²/kg (60 mikron KFK)",
    "sheen": "Metalik Gri Mat",
    "drying": "1 – 2 Saat",
    "surface": "Kumlama yapılmış SA 2.5 çelik, köprüler, açık deniz yapıları"
  },
  "filepox-tc-4103": {
    "name": "FILEPOX TC-4103 Epoksi Parlak Son Kat",
    "category": "sanayi-epoksi",
    "tag": "Kimyasal & Mekanik Direnç",
    "sub": "Fabrika zeminleri, laboratuvarlar ve kimyasal tank çevrelerinde asit, baz ve solvent sıçramalarına dayanıklı parlak epoksi.",
    "img": "assets/filli-official/filepox-tc-4103.png",
    "sizes": [
      "20 kg Set (A+B)"
    ],
    "coverage": "6 – 8 m²/kg",
    "sheen": "Yüksek Parlak",
    "drying": "24 Saat (Hafif trafik), 7 Gün (Tam kimyasal)",
    "surface": "Epoksi astar uygulanmış zemin ve çelik yüzeyler"
  },
  "filalkyd-pr-1020": {
    "name": "FILALKYD PR-1020 Endüstriyel Rapid Antipas",
    "category": "sanayi-epoksi",
    "tag": "Çinko Fosfatlı Hızlı Kuruma",
    "sub": "Çelik imalat atölyeleri ve makine üretiminde 15 dakikada kuruyan, mükemmel pas direnci sağlayan sanayi antipası.",
    "img": "assets/filli-official/filalkyd-pr-1020.png",
    "sizes": [
      "18 kg Teneke"
    ],
    "coverage": "10 – 12 m²/kg",
    "sheen": "Kırmızı / Gri Mat",
    "drying": "15 – 20 Dakika",
    "surface": "Çelik konstrüksiyon parçaları, tarım makineleri, şaseler"
  },
  "filalkyd-tc-1021": {
    "name": "FILALKYD TC-1021 Rapid Parlak Son Kat",
    "category": "sanayi-epoksi",
    "tag": "Seri İmalat & Hızlı Sevkiyat",
    "sub": "Endüstriyel metal parça, konteyner ve makine imalatında seri boyama sağlayan hızlı kuruyan parlak sanayi boyası.",
    "img": "assets/filli-official/filalkyd-tc-1021.png",
    "sizes": [
      "16 kg Teneke"
    ],
    "coverage": "9 – 11 m²/kg",
    "sheen": "Parlak Endüstriyel",
    "drying": "20 Dakika (Toz tutmama)",
    "surface": "Metal pano, makine kaportası, çelik aksam"
  },
  "filalkyd-tc-1022": {
    "name": "FILALKYD TC-1022 Rapid Yarı Mat Son Kat",
    "category": "sanayi-epoksi",
    "tag": "Pürüz Gizleyici Yarı Mat",
    "sub": "Kaynak ve taşlama izlerini gizleyen, göz almayan şık yarı mat endüstriyel son kat boya.",
    "img": "assets/filli-official/filalkyd-tc-1022.png",
    "sizes": [
      "16 kg Teneke"
    ],
    "coverage": "9 – 11 m²/kg",
    "sheen": "Yarı Mat",
    "drying": "20 – 30 Dakika",
    "surface": "Elektrik panoları, jeneratör kabinleri, sanayi ekipmanları"
  },
  "filalkyd-tc-1024": {
    "name": "FILALKYD TC-1024 Sentetik Parlak Son Kat",
    "category": "sanayi-epoksi",
    "tag": "Hava Kurumalı / Yüksek Parlak",
    "sub": "Şantiye montajlarında ve açık hava demir imalatlarında fırça ve rulo ile rahat yayılan uzun ömürlü parlak boya.",
    "img": "assets/filli-official/filalkyd-tc-1024.png",
    "sizes": [
      "15 L Teneke"
    ],
    "coverage": "11 – 13 m²/L",
    "sheen": "Ayna Parlak",
    "drying": "4 – 6 Saat",
    "surface": "Şantiye demir doğramaları, ferforje korkuluk, borular"
  },
  "filalkyd-tc-1025": {
    "name": "FILALKYD TC-1025 Endüstriyel Mat Son Kat",
    "category": "sanayi-epoksi",
    "tag": "Askeri & Kamu Kamuflaj Matı",
    "sub": "Işık yansıması istenmeyen savunma sanayi, kamu projeleri ve özel metal tasarımlar için tam mat alkid boya.",
    "img": "assets/filli-official/filalkyd-tc-1025.png",
    "sizes": [
      "16 kg Teneke"
    ],
    "coverage": "10 – 12 m²/kg",
    "sheen": "Tam Mat",
    "drying": "30 Dakika",
    "surface": "Savunma sanayi araçları, mat metal mobilyalar, şaseler"
  },
  "filalkyd-tc-1035": {
    "name": "FILALKYD TC-1035 Korozyon Dirençli Alkid",
    "category": "sanayi-epoksi",
    "tag": "Atmosferik Korozyon Kalkanı",
    "sub": "Nemli ve ılıman iklim şartlarında metal konstrüksiyonları atmosferik paslanmaya karşı koruyan dirençli son kat.",
    "img": "assets/filli-official/filalkyd-tc-1035.png",
    "sizes": [
      "18 kg Teneke"
    ],
    "coverage": "8 – 10 m²/kg",
    "sheen": "Yarı Parlak",
    "drying": "2 – 3 Saat",
    "surface": "Dış ortam çelik binalar, ambarlar, silolar"
  },
  "filasent-tc-1005": {
    "name": "FILASENT TC-1005 Sentetik Parlak Boya",
    "category": "sanayi-epoksi",
    "tag": "Ürethan Alkid / Çizilmez",
    "sub": "Ürethan modifiyeli alkid reçinesi ile darbe, çizilme ve deterjanlı yıkamalara dayanıklı parlak boya.",
    "img": "assets/filli-official/filasent-tc-1005.png",
    "sizes": [
      "15 L Teneke"
    ],
    "coverage": "12 – 14 m²/L",
    "sheen": "Yüksek Parlak",
    "drying": "4 – 6 Saat",
    "surface": "Ahşap, metal, kapı kasası ve korkuluklar"
  },
  "filasent-tc-1015": {
    "name": "FILASENT TC-1015 Sentetik Mat Boya",
    "category": "sanayi-epoksi",
    "tag": "Saten Mat Doku / Kusursuz Örtüş",
    "sub": "İç mekan metal ve ahşap yüzeylerde homojen dağılan, leke tutmayan ve kolay temizlenen sentetik mat boya.",
    "img": "assets/filli-official/filasent-tc-1015.png",
    "sizes": [
      "15 L Teneke"
    ],
    "coverage": "11 – 13 m²/L",
    "sheen": "Mat",
    "drying": "4 – 6 Saat",
    "surface": "İç mimari metal detaylar, ahşap mobilya ve kapı"
  },
  "filli-boya-yagli-boya-parlak": {
    "name": "Filli Boya Lüks Parlak Yağlı Boya",
    "category": "sanayi-epoksi",
    "tag": "Geleneksel Usta Yağlı Boyası",
    "sub": "Usta boyacıların vazgeçilmez akışkanlığına sahip, fırça izi bırakmayan, örtücülüğü ve parlaklığı çok yüksek yağlı boya.",
    "img": "assets/filli-official/filli-boya-yagli-boya-parlak.png",
    "sizes": [
      "0.75 L",
      "2.5 L",
      "15 L"
    ],
    "coverage": "13 – 16 m²/L",
    "sheen": "Lüks Parlak",
    "drying": "6 – 8 Saat",
    "surface": "Kapı, pencere, korkuluk, ahşap ve metal"
  },
  "filli-boya-sentetik-tiner-d": {
    "name": "Filli Boya Sanayi Tineri D",
    "category": "sanayi-epoksi",
    "tag": "Endüstriyel Rapid Çözücü",
    "sub": "Rapid boya ve antipasların tabancayla püskürtülmesinde hızlı uçuculuk ve pürüzsüz boya filmi sağlayan sanayi tineri.",
    "img": "assets/filli-official/filli-boya-sentetik-tiner-d.png",
    "sizes": [
      "12 L",
      "15 L Teneke"
    ],
    "coverage": "İnceltici / Çözücü",
    "sheen": "Saf Endüstriyel Solvent",
    "drying": "Hızlı Buharlaşma",
    "surface": "Rapid sanayi boyaları ve tabanca temizliği"
  },
  "filadur-tc-4101": {
    "name": "FILADUR TC-4101 Yarı Mat Alifatik Poliüretan",
    "category": "sanayi-epoksi",
    "tag": "2K UV Dayanımlı Poliüretan",
    "sub": "Güneş ışınları ve deniz suyuna karşı solmayan, sararmayan ve tebeşirlenmeyen yüksek performanslı dış mekan son katı.",
    "img": "assets/filli-official/filadur-tc-4101.png",
    "sizes": [
      "20 kg Set (A+B)"
    ],
    "coverage": "8 – 10 m²/kg",
    "sheen": "Yarı Mat Alifatik",
    "drying": "2 – 4 Saat",
    "surface": "Dış mekan çelik yapılar, köprüler, açık hava tankları"
  },
  "filadur-tc-4103": {
    "name": "FILADUR TC-4103 Parlak Alifatik Poliüretan",
    "category": "sanayi-epoksi",
    "tag": "Otomotiv & Sanayi Parlaklığı",
    "sub": "Ağır ticari araçlar, yatlar ve lüks mimari cephe metal panelleri için kalıcı parlaklık sunan alifatik poliüretan.",
    "img": "assets/filli-official/filadur-tc-4103.png",
    "sizes": [
      "20 kg Set (A+B)"
    ],
    "coverage": "8 – 11 m²/kg",
    "sheen": "Ayna Parlak Alifatik",
    "drying": "2 – 3 Saat",
    "surface": "Kamyon üst yapıları, gemi güvertesi, alüminyum cepheler"
  },
  "filadur-tc-4105": {
    "name": "FILADUR TC-4105 Ağır Hizmet Poliüretan",
    "category": "sanayi-epoksi",
    "tag": "C5-M Deniz & Sanayi Sınıfı",
    "sub": "Liman tesisleri, rafineriler ve rüzgar türbinleri gibi en zorlu çevre koşullarında kimyasal ve mekanik bariyer oluşturan kaplama.",
    "img": "assets/filli-official/filadur-tc-4105.png",
    "sizes": [
      "20 kg Set (A+B)"
    ],
    "coverage": "7 – 9 m²/kg",
    "sheen": "Yüksek Mukavemetli Parlak",
    "drying": "4 Saat (Dokunma)",
    "surface": "Liman vinçleri, rüzgar türbinleri, kimyasal boru hatları"
  },
  "filacryl-tc-2121": {
    "name": "FILACRYL TC-2121 Parlak Akrilik Son Kat",
    "category": "sanayi-epoksi",
    "tag": "Solvent Bazlı 2K Akrilik",
    "sub": "Mükemmel renk tutma kabiliyeti ve yüksek parlaklığıyla endüstriyel makinelerde ve otobüs/kamyon karoserlerinde kullanılır.",
    "img": "assets/filli-official/filacryl-tc-2121.png",
    "sizes": [
      "18 kg Set (A+B)"
    ],
    "coverage": "9 – 11 m²/kg",
    "sheen": "Parlak Akrilik",
    "drying": "1 – 2 Saat",
    "surface": "Karoser imalatı, tarım aletleri, çelik konstrüksiyon"
  },
  "filacryl-tc-2123": {
    "name": "FILACRYL TC-2123 Yarı Mat Akrilik Son Kat",
    "category": "sanayi-epoksi",
    "tag": "Saten Yarı Mat Görünüm",
    "sub": "Endüstriyel ekipman ve metal mobilyalarda güneş ışığına dirençli, parlamayan sofistike yarı mat kaplama.",
    "img": "assets/filli-official/filacryl-tc-2123.png",
    "sizes": [
      "18 kg Set (A+B)"
    ],
    "coverage": "9 – 11 m²/kg",
    "sheen": "Yarı Mat",
    "drying": "1 – 2 Saat",
    "surface": "Metal ofis mobilyaları, aydınlatma direkleri, şaseler"
  },
  "filacryl-tc-2125": {
    "name": "FILACRYL TC-2125 Mat Akrilik Son Kat",
    "category": "sanayi-epoksi",
    "tag": "Mimari Metal & Dış Mekan Mat",
    "sub": "Modern mimari cephe panellerinde, alüminyum profillerde çizilmeye dayanıklı ve sararmaz mat akrilik son kat.",
    "img": "assets/filli-official/filacryl-tc-2125.png",
    "sizes": [
      "18 kg Set (A+B)"
    ],
    "coverage": "8 – 10 m²/kg",
    "sheen": "İpek Mat",
    "drying": "1 – 2 Saat",
    "surface": "Alüminyum doğrama, cephe kasetleri, metal kaplamalar"
  },
  "filacryl-tc-2126": {
    "name": "FILACRYL TC-2126 Termoplastik Akrilik Son Kat",
    "category": "sanayi-epoksi",
    "tag": "Fiziksel Kurumalı Tek Bileşen",
    "sub": "Sertleştirici gerektirmeyen, çok hızlı kuruyan ve elastikiyetini koruyan tek bileşenli endüstriyel akrilik boya.",
    "img": "assets/filli-official/filacryl-tc-2126.png",
    "sizes": [
      "18 kg Teneke"
    ],
    "coverage": "8 – 10 m²/kg",
    "sheen": "Parlak",
    "drying": "15 Dakika",
    "surface": "Plastik aksamlar, metal saclar, seri üretim hatları"
  },
  "filasel-pr-1000": {
    "name": "FILASEL PR-1000 Selülozik Astar",
    "category": "sanayi-epoksi",
    "tag": "Çok Hızlı Kuruma / Kolay Zımpara",
    "sub": "Ahşap ve metal imalatta yüzey çukurlarını dolduran, 15 dakikada zımpara kıvamına gelen dolgulu astar.",
    "img": "assets/filli-official/filasel-pr-1000.png",
    "sizes": [
      "15 kg Teneke"
    ],
    "coverage": "9 – 12 m²/kg",
    "sheen": "Mat Dolgulu Gri / Beyaz",
    "drying": "15 – 20 Dakika (Zımparalanabilir)",
    "surface": "Mobilya imalatı, oto tamir dolgusu, metal parçalar"
  },
  "filasel-tc-1001": {
    "name": "FILASEL TC-1001 Selülozik Parlak Son Kat",
    "category": "sanayi-epoksi",
    "tag": "Uçak Hızında Kuruma / Parlak",
    "sub": "İç mekan ahşap ve metal sanayi ürünlerinde toz yapışmadan dakikalar içinde kuruyan parlak selülozik boya.",
    "img": "assets/filli-official/filasel-tc-1001.png",
    "sizes": [
      "15 kg Teneke"
    ],
    "coverage": "10 – 12 m²/kg",
    "sheen": "Parlak Selülozik",
    "drying": "10 – 15 Dakika",
    "surface": "Ahşap mobilyalar, iç mekan metal aksamları"
  },
  "filatherm-tc-1024": {
    "name": "FILATHERM TC-1024 200°C Isıya Dayanıklı Boya",
    "category": "sanayi-epoksi",
    "tag": "200°C Sürekli Sıcaklık",
    "sub": "Buhar kazanları, sıcak su boruları ve kalorifer sistemlerinde kabarma ve renk değişimi yapmayan termal boya.",
    "img": "assets/filli-official/filatherm-tc-1024.png",
    "sizes": [
      "15 kg Teneke"
    ],
    "coverage": "10 – 12 m²/kg (30 mikron KFK)",
    "sheen": "Yarı Mat Gümüş / Siyah",
    "drying": "1 Saat",
    "surface": "Kalorifer kazanları, boru hatları, radyatörler"
  },
  "filatherm-tc-1032": {
    "name": "FILATHERM TC-1032 300°C Isıya Dayanıklı Boya",
    "category": "sanayi-epoksi",
    "tag": "300°C Yüksek Termal Direnç",
    "sub": "Fırın dış yüzeyleri, egzoz manifoltları ve termik santral ekipmanlarında yüksek ısıya dayanan modifiye silikon boya.",
    "img": "assets/filli-official/filatherm-tc-1032.png",
    "sizes": [
      "15 kg Teneke"
    ],
    "coverage": "9 – 11 m²/kg",
    "sheen": "Mat Alüminyum / Siyah",
    "drying": "1 Saat (Isı kürlemesi ile tam mukavemet)",
    "surface": "Sanayi fırınları, baca bağlantıları, egzoz aksamları"
  },
  "filatherm-tc-1063": {
    "name": "FILATHERM TC-1063 600°C Ekstrem Isı Boyası",
    "category": "sanayi-epoksi",
    "tag": "600°C Saf Silikon Reçine",
    "sub": "Demir-çelik fabrikaları bacaları, fırın içleri ve egzoz borularında 600°C kor akkor sıcaklıkta dahi dökülmeyen kaplama.",
    "img": "assets/filli-official/filatherm-tc-1063.png",
    "sizes": [
      "15 kg Teneke"
    ],
    "coverage": "8 – 10 m²/kg",
    "sheen": "Mat Termal Gümüş / Antrasit",
    "drying": "200°C'de 1 saatte kürlenir",
    "surface": "Sanayi bacaları, meşaleler, yüksek sıcaklık fırınları"
  },
  "filox": {
    "name": "Filox® Reaktif Pas Dönüştürücü",
    "category": "sanayi-epoksi",
    "tag": "Pası Sağlam Metale Çevirir",
    "sub": "Kumlama imkanı olmayan paslı demir yüzeylerde pasla kimyasal bağ kurarak korozyonu durduran reaktif astar.",
    "img": "assets/filli-official/filox.png",
    "sizes": [
      "1 L",
      "5 L",
      "20 L"
    ],
    "coverage": "10 – 12 m²/L",
    "sheen": "Mavi-Siyah Reaktif Tabaka",
    "drying": "3 – 4 Saat (Boyanabilir)",
    "surface": "Kumlama yapılamayan paslı demir, korkuluk, şasi"
  },
  "filox-451": {
    "name": "Filox 451® Endüstriyel Pas Önleyici",
    "category": "sanayi-epoksi",
    "tag": "Korozyon İnhibitörlü Bariyer",
    "sub": "Metal parçaların depolanması ve nakliyesinde havadaki nem ve tuza karşı koruyucu pas filmi oluşturan koruyucu.",
    "img": "assets/filli-official/filox-451.png",
    "sizes": [
      "15 L Teneke"
    ],
    "coverage": "12 – 15 m²/L",
    "sheen": "Koruyucu Şeffaf Film",
    "drying": "30 Dakika",
    "surface": "Stoktaki ham metaller, çelik rulolar, makine parçaları"
  },
  "filox-452": {
    "name": "Filox 452® Ağır Hizmet Pas Dönüştürücü",
    "category": "sanayi-epoksi",
    "tag": "Denizcilik & Ağır Pas Kalkanı",
    "sub": "Gemi bordaları, kıyı tesisleri ve köprülerde derin pas katmanlarını stabilize eden yüksek penetrasyonlu pas dönüştürücü.",
    "img": "assets/filli-official/filox-452.png",
    "sizes": [
      "15 L Teneke"
    ],
    "coverage": "8 – 10 m²/L",
    "sheen": "Siyah Magnetit Tabaka",
    "drying": "4 – 6 Saat",
    "surface": "Deniz iskelesi demirleri, açık hava vinçleri, gemiler"
  },
  "filox-plus": {
    "name": "Filox Plus® Epoksi Uyumlu Pas Sabitleyici",
    "category": "sanayi-epoksi",
    "tag": "Epoksi & Poliüretan Öncesi",
    "sub": "Pas dönüştürme sonrasında üzerine doğrudan 2 bileşenli epoksi ve poliüretan sistemlerin uygulanabildiği üst sınıf astar.",
    "img": "assets/filli-official/filox-plus.png",
    "sizes": [
      "5 L",
      "15 L"
    ],
    "coverage": "9 – 11 m²/L",
    "sheen": "Yarı Mat Siyah",
    "drying": "4 Saat",
    "surface": "Epoksi son kat öncesi paslı çelik konstrüksiyon"
  },
  "yol-cizgi-boyasi": {
    "name": "Filli Boya Yol Çizgi Boyası (Solventli)",
    "category": "sanayi-epoksi",
    "tag": "Klor Kauçuk / Aşınmaz Zemin",
    "sub": "Karayolları, otoparklar, fabrikalar ve havalimanı pistlerinde yoğun araç tekerlek trafiğine dayanıklı mat yol boyası.",
    "img": "assets/filli-official/yol-cizgi-boyasi.png",
    "sizes": [
      "5 kg",
      "25 kg Teneke"
    ],
    "coverage": "2.5 – 3.5 m²/kg (Beyaz / Sarı)",
    "sheen": "Mat Aşınmaz (Cam küreciği uyumlu)",
    "drying": "15 – 20 Dakika (Trafiğe açılma)",
    "surface": "Asfalt, beton otopark, fabrika içi yaya yolları"
  },
  "su-bazli-yol-cizgi-boyasi": {
    "name": "Filli Su Bazlı Çevre Dostu Yol Çizgi Boyası",
    "category": "sanayi-epoksi",
    "tag": "Kokusuz / Kapalı Otopark Tipi",
    "sub": "AVM kapalı otoparkları, hastane ve okul bahçelerinde koku ve solvent salımı yapmayan çevre dostu zemin işaretleme boyası.",
    "img": "assets/filli-official/su-bazli-yol-cizgi-boyasi.png",
    "sizes": [
      "25 kg Kova"
    ],
    "coverage": "3.0 – 4.0 m²/kg",
    "sheen": "Mat Su Bazlı",
    "drying": "30 Dakika",
    "surface": "Kapalı otopark betonu, helikopter pisti, okul sahaları"
  },
  "kort-boyasi": {
    "name": "Filli Boya Tenis Kort & Zemin Boyası",
    "category": "sanayi-epoksi",
    "tag": "Elastik Akrilik Spor Zemini",
    "sub": "Tenis kortları, basketbol ve voleybol sahalarında kayma yapmayan, UV ve sporcu ayakkabı darbelerine dayanıklı kaplama.",
    "img": "assets/filli-official/kort-boyasi.png",
    "sizes": [
      "25 kg Kova (Yeşil / Kırmızı)"
    ],
    "coverage": "1.5 – 2.0 kg/m² (Kort sistemi)",
    "sheen": "Kaymaz Mat Tekstür",
    "drying": "24 Saat",
    "surface": "Asfalt ve beton spor sahaları, yürüyüş yolları"
  },
  "filli-boya-yagli-boya-sera-antipasi": {
    "name": "Filli Boya Sera Antipası (Zirai Seri)",
    "category": "sanayi-epoksi",
    "tag": "Sera İçi Yüksek Rutubet Kalkanı",
    "sub": "Tarımsal seralarda ve sıcak su borularında kimyasal buharlaşma, aşırı nem ve gübreleme gazlarına karşı çeliği koruyan antpas.",
    "img": "assets/filli-official/filli-boya-yagli-boya-sera-antipasi.png",
    "sizes": [
      "15 L Teneke"
    ],
    "coverage": "10 – 12 m²/L",
    "sheen": "Yarı Mat Beyaz / Gri",
    "drying": "4 – 6 Saat",
    "surface": "Sera demir boruları, tarımsal çelik konstrüksiyon"
  },
  "expert-tavan-boyasi": {
    "name": "Expert Profesyonel Tavan Boyası",
    "category": "expert",
    "tag": "Şantiye Özel / Ekstra Beyaz",
    "sub": "Büyük şantiyelerde tavan dalgalanmalarını gizleyen, sıçratmayan, nefes alan tam mat profesyonel tavan boyası.",
    "img": "assets/filli-official/expert-tavan-boyasi.png",
    "sizes": [
      "10 kg",
      "17.5 kg",
      "20 kg"
    ],
    "coverage": "8 – 10 m²/kg (Çift kat)",
    "sheen": "Tam Mat Tavan Beyazı",
    "drying": "1 – 2 Saat",
    "surface": "Şantiye alçı tavanlar, kara sıva ve alçıpan"
  },
  "expert-ic-cephe-plastik-boya": {
    "name": "Expert İç Cephe Plastik Boya",
    "category": "expert",
    "tag": "Yüksek Metraj / Rahat Rulo",
    "sub": "Müteahhit projelerinde metrekare verimliliği yüksek, duvara hızla oturan mat iç cephe emülsiyon boyası.",
    "img": "assets/filli-official/expert-ic-cephe-plastik-boya.png",
    "sizes": [
      "10 kg",
      "20 kg"
    ],
    "coverage": "10 – 12 m²/kg",
    "sheen": "Mat",
    "drying": "2 – 4 Saat",
    "surface": "Konut ve ticari proje iç duvarları"
  },
  "expert-silikonlu-mat-ic-cephe-boyasi": {
    "name": "Expert Silikonlu Mat İç Cephe Boyası",
    "category": "expert",
    "tag": "Silikonlu / Silinebilir Şantiye",
    "sub": "Toplu konut projelerinde silinebilirlik standardı sunan, kılcal sıva çatlaklarını kapatan silikonlu mat boya.",
    "img": "assets/filli-official/expert-silikonlu-mat-ic-cephe-boyasi.png",
    "sizes": [
      "2.5 L",
      "7.5 L",
      "15 L"
    ],
    "coverage": "11 – 13 m²/L",
    "sheen": "Silikonlu Mat",
    "drying": "2 – 4 Saat",
    "surface": "Daire iç mekanları, koridorlar, ofis duvarları"
  },
  "expert-akrilik-dis-cephe-boyasi": {
    "name": "Expert Akrilik Dış Cephe Boyası",
    "category": "expert",
    "tag": "Zorlu Hava Şartları / Akrilik",
    "sub": "Bina dış cephelerinde yağmur, rüzgar ve güneş ışınlarına karşı solmayan, kabarma yapmayan akrilik emülsiyon boya.",
    "img": "assets/filli-official/expert-akrilik-dis-cephe-boyasi.png",
    "sizes": [
      "15 L Teneke"
    ],
    "coverage": "8 – 10 m²/L (Çift kat)",
    "sheen": "Mat Akrilik",
    "drying": "4 – 6 Saat",
    "surface": "Dış cephe sıvaları, brüt beton, mantolama üzeri"
  },
  "expert-silikon-esasli-dis-cephe-boyasi": {
    "name": "Expert Silikonlu Dış Cephe Boyası",
    "category": "expert",
    "tag": "Su İtici Silikon / Nefes Alan",
    "sub": "Bina cephelerini yağmur suyuna karşı koruyan, buhar geçirgenliği ile içerideki nemi dışarı atan silikonlu boya.",
    "img": "assets/filli-official/expert-silikon-esasli-dis-cephe-boyasi.png",
    "sizes": [
      "15 L Teneke"
    ],
    "coverage": "8 – 11 m²/L",
    "sheen": "Silikonlu Mat",
    "drying": "4 – 6 Saat",
    "surface": "Apartman ve site dış cepheleri, mineral sıva"
  },
  "expert-silikonlu-grenli-dis-cephe-kaplamasi": {
    "name": "Expert Silikonlu Grenli Dış Kaplama",
    "category": "expert",
    "tag": "Tekstürlü / Sıva Hatalarını Örter",
    "sub": "Cephedeki dalgalanma ve sıva kusurlarını grenli dokusuyla kamufle eden, mercan ruloyla uygulanan kalın kaplama.",
    "img": "assets/filli-official/expert-silikonlu-grenli-dis-cephe-kaplamasi.png",
    "sizes": [
      "25 kg Kova"
    ],
    "coverage": "0.8 – 1.2 kg/m²",
    "sheen": "Grenli Pürüzlü Tekstür",
    "drying": "12 – 24 Saat",
    "surface": "Dalgalı dış cepheler, mantolama son kat sıvası"
  },
  "expert-universal-astar": {
    "name": "Expert Universal Şantiye Astarı",
    "category": "expert",
    "tag": "İç & Dış Çift Yönlü Aderans",
    "sub": "Hem iç hem dış cephe boyaları altında güçlü aderans köprüsü kuran, boya sarfiyatını düşüren şantiye astarı.",
    "img": "assets/filli-official/expert-universal-astar.png",
    "sizes": [
      "15 L Teneke"
    ],
    "coverage": "10 – 12 m²/L",
    "sheen": "Örtücü Beyaz Mat",
    "drying": "2 – 4 Saat",
    "surface": "Şantiye sıva, alçı ve brüt beton zeminler"
  },
  "virusguard": {
    "name": "VirusGuard® Antimikrobiyal Hijyen Boyası",
    "category": "expert",
    "tag": "%99.9 Antiviral & Antibakteriyel",
    "sub": "Virüs ve bakterileri duvar yüzeyinde etkisiz hale getiren, sağlık bakanlığı onaylı ipeksi mat medikal boya.",
    "img": "assets/filli-official/virusguard.png",
    "sizes": [
      "2.5 L",
      "15 L"
    ],
    "coverage": "12 – 14 m²/L",
    "sheen": "İpeksi Mat",
    "drying": "2 – 3 Saat",
    "surface": "Hastaneler, klinikler, anaokulları, çocuk odaları"
  },
  "virusguard-max": {
    "name": "VirusGuard Max® Yıkanabilir Medikal Boya",
    "category": "expert",
    "tag": "Dezenfektan Dayanımlı İpek Mat",
    "sub": "Ameliyathane, yoğun bakım ve steril odalarda alkollü dezenfektanlarla sürekli silinmeye tam dayanıklı hijyen boyası.",
    "img": "assets/filli-official/virusguard-max.png",
    "sizes": [
      "2.5 L",
      "15 L"
    ],
    "coverage": "13 – 15 m²/L",
    "sheen": "Süper Silinebilir İpek Mat",
    "drying": "2 – 4 Saat",
    "surface": "Klinikler, muayenehaneler, gıda üretim tesisleri"
  },
  "virusguard-plus": {
    "name": "VirusGuard Plus® Ağır Hizmet Hijyen Boyası",
    "category": "expert",
    "tag": "Sürekli Koruma Kalkanı",
    "sub": "Okullar, kreşler ve oteller gibi insan sirkülasyonunun yoğun olduğu alanlarda bakteri üremesini kalıcı durduran formül.",
    "img": "assets/filli-official/virusguard-plus.png",
    "sizes": [
      "2.5 L",
      "15 L"
    ],
    "coverage": "12 – 14 m²/L",
    "sheen": "Mat İpeksi",
    "drying": "2 – 3 Saat",
    "surface": "Okul sınıfları, otel odaları, kreşler, restoranlar"
  },
  "virusguard-tavan": {
    "name": "VirusGuard Hijyenik Tavan Boyası",
    "category": "expert",
    "tag": "Küf & Nem Önleyici Hijyen Tavan",
    "sub": "Hastaneler ve steril mekanların tavanlarında küf ve mikrop tutmayan, tebeşirlenmeyen ekstra beyaz tavan boyası.",
    "img": "assets/filli-official/virusguard-tavan.png",
    "sizes": [
      "10 kg",
      "17.5 kg"
    ],
    "coverage": "9 – 11 m²/kg",
    "sheen": "Tam Mat Tavan Beyazı",
    "drying": "1 – 2 Saat",
    "surface": "Sağlık kurumları ve ıslak hacim tavanları"
  },
  "momento-style-inci-doku": {
    "name": "Momento Style® İnci Doku® Efekt Boya",
    "category": "donusum-efekt",
    "tag": "Sedefli İtalyan Doku",
    "sub": "İç cephe duvarlarında ışığın geliş açısına göre sedef ışıltısı ve kadifemsi desen oluşturan su bazlı dekoratif efekt.",
    "img": "assets/filli-official/momento-style-inci-doku.png",
    "sizes": [
      "1 kg",
      "2.5 kg",
      "15 kg"
    ],
    "coverage": "5 – 8 m²/kg",
    "sheen": "Sedef / İnci Parlaklığı",
    "drying": "4 – 6 Saat",
    "surface": "Salon, yatak odası, otel lobisi ve lüks mekan duvarları"
  },
  "momento-style-inci-doku-yari-ortucu": {
    "name": "Momento Style® İnci Doku® Yarı Örtücü",
    "category": "donusum-efekt",
    "tag": "Fon Rengiyle Derinlik Efekti",
    "sub": "Alttaki baz boya renginin ışıltıyla kaynaşmasını sağlayan yarı örtücü, derinlik hissi veren sedef kaplama.",
    "img": "assets/filli-official/momento-style-inci-doku-yari-ortucu.png",
    "sizes": [
      "2.5 kg",
      "15 kg"
    ],
    "coverage": "8 – 10 m²/kg",
    "sheen": "Yarı Şeffaf Sedef",
    "drying": "4 Saat",
    "surface": "Renkli fon üzerine dekoratif vuruşlar"
  },
  "momento-style-varak": {
    "name": "Momento Style® Varak® Metalik Efekt",
    "category": "donusum-efekt",
    "tag": "Altın, Gümüş & Bronz Varak",
    "sub": "Kartonpiyer, kolon başlıkları, nişler ve mobilya oymalarında gerçek altın ve gümüş varak parlaklığı veren lüks kaplama.",
    "img": "assets/filli-official/momento-style-varak.png",
    "sizes": [
      "0.375 kg",
      "0.75 kg"
    ],
    "coverage": "10 – 12 m²/kg",
    "sheen": "Metalik Varak Parlak",
    "drying": "2 – 3 Saat",
    "surface": "Kartonpiyer, alçı oyma, ahşap çerçeve, süpürgelik"
  },
  "woodmaxx-color-proof-su-bazli-dis-cephe-ahsap-boyasi": {
    "name": "WoodMaXX® Color Proof® Su Bazlı Ahşap Boyası",
    "category": "ahsap-metal",
    "tag": "Aktif Silikon / UV Zırhı",
    "sub": "Dış mekan ahşap cephe, pergola ve panjurları güneşe, yağmura ve mantara karşı koruyan esnek nefes alan örtücü boya.",
    "img": "assets/filli-official/woodmaxx-color-proof-su-bazli-dis-cephe-ahsap-boyasi.png",
    "sizes": [
      "0.75 L",
      "2.5 L",
      "15 L"
    ],
    "coverage": "10 – 12 m²/L",
    "sheen": "Yarı Mat İpeksi",
    "drying": "2 – 3 Saat",
    "surface": "Ahşap cephe kaplamaları, çardak, panjur, bahçe çiti"
  },
  "woodmaxx-color-proof-primer-su-bazli-dis-cephe-ahsap-boyasi-astari": {
    "name": "WoodMaXX® Color Proof® Primer Astar",
    "category": "ahsap-metal",
    "tag": "Tanen Kusması Önleyici",
    "sub": "Ahşabın içindeki reçine ve tanenlerin boya yüzeyine sarı leke yapmasını kilitleyen su bazlı yüksek aderans astarı.",
    "img": "assets/filli-official/woodmaxx-color-proof-primer-su-bazli-dis-cephe-ahsap-boyasi-astari.png",
    "sizes": [
      "2.5 L",
      "15 L"
    ],
    "coverage": "9 – 11 m²/L",
    "sheen": "Örtücü Beyaz Mat",
    "drying": "4 – 6 Saat",
    "surface": "Reçineli çam, meşe ve tüm dış ahşap zeminler"
  },
  "woodmaxx-aqua-universallasur-su-bazli-dis-cephe-ahsap-vernigi": {
    "name": "WoodMaXX® Aqua Universallasur Ahşap Verniği",
    "category": "ahsap-metal",
    "tag": "Su Bazlı / Doğal Doku Koruma",
    "sub": "Ahşabın doğal damarlarını kapatmadan renklendiren, sararma ve soyulma yapmayan mikrogözenekli dış cephe verniği.",
    "img": "assets/filli-official/woodmaxx-aqua-universallasur-su-bazli-dis-cephe-ahsap-vernigi.png",
    "sizes": [
      "0.75 L",
      "2.5 L",
      "15 L"
    ],
    "coverage": "12 – 14 m²/L",
    "sheen": "İpek Parlak Renkli",
    "drying": "2 – 3 Saat",
    "surface": "Pergola, ahşap çatı karkası, lambri, verandalar"
  },
  "woodmaxx-universallasur-dis-cephe-ahsap-vernigi": {
    "name": "WoodMaXX® Universallasur Sentetik Ahşap Verniği",
    "category": "ahsap-metal",
    "tag": "Solvent Bazlı Derin Koruma",
    "sub": "Zorlu iklim koşullarında ahşabın derinlerine nüfuz eden, kabarmayan ve pul pul dökülmeyen sentetik vernik.",
    "img": "assets/filli-official/woodmaxx-universallasur-dis-cephe-ahsap-vernigi.png",
    "sizes": [
      "0.75 L",
      "2.5 L",
      "15 L"
    ],
    "coverage": "11 – 13 m²/L",
    "sheen": "Şeffaf / Renkli İpek Parlak",
    "drying": "8 – 12 Saat",
    "surface": "Ahşap evler, pencereler, kapılar, çitler"
  },
  "woodmaxx-ahsap-emprenye": {
    "name": "WoodMaXX® Ahşap Emprenye Maddesi",
    "category": "ahsap-metal",
    "tag": "Kurt, Mantar & Mavi Leke Kalkanı",
    "sub": "Ahşabı içten çürüten kurtlanma, mantarlaşma ve mavi leke oluşumunu temelden engelleyen renksiz emprenye astarı.",
    "img": "assets/filli-official/woodmaxx-ahsap-emprenye.png",
    "sizes": [
      "0.75 L",
      "2.5 L",
      "15 L"
    ],
    "coverage": "6 – 8 m²/L (Derin emilim)",
    "sheen": "Şeffaf Nüfuz Edici",
    "drying": "4 – 6 Saat (Vernik öncesi)",
    "surface": "Tüm ham ahşap karkas, çatı ve doğrama elemanları"
  },
  "woodmaxx-wood-color": {
    "name": "WoodMaXX® Wood Color Ahşap Renklendirici",
    "category": "ahsap-metal",
    "tag": "Konsantre Ahşap Boyası",
    "sub": "Ham ahşabın harelerini belirginleştiren, ceviz, meşe, maun gibi zengin doğal tonlar veren penetre renklendirici.",
    "img": "assets/filli-official/woodmaxx-wood-color.png",
    "sizes": [
      "0.5 L",
      "1 L"
    ],
    "coverage": "15 – 20 m²/L",
    "sheen": "Transparan Renk",
    "drying": "1 – 2 Saat",
    "surface": "Mobilya, parke, kapı ve tüm ham ahşap yüzeyler"
  },
  "woodmaxx-wood-stain-dekoratif-ahsap-vernigi": {
    "name": "WoodMaXX® Wood Stain Dekoratif Vernik",
    "category": "ahsap-metal",
    "tag": "İç & Dış Mekan Renkli Vernik",
    "sub": "Mobilyalarda ve ahşap doğramalarda parlak ve ipeksi film tabakası oluşturan, çizilmeye dirençli vernik.",
    "img": "assets/filli-official/woodmaxx-wood-stain-dekoratif-ahsap-vernigi.png",
    "sizes": [
      "0.75 L",
      "2.5 L"
    ],
    "coverage": "12 – 15 m²/L",
    "sheen": "Dekoratif Parlak Renkli",
    "drying": "6 – 8 Saat",
    "surface": "Masa, sandalye, ahşap merdiven trabzanı, mobilya"
  },
  "woodmaxx-parke-vernigi-mat": {
    "name": "WoodMaXX® Parke Verniği (Mat)",
    "category": "ahsap-metal",
    "tag": "Yoğun Yaya Trafiği / Çizilmez",
    "sub": "Masif ve lamine ahşap parkelerde topuk darbelerine, sürtünmeye ve deterjanlara karşı aşınmaz mat koruma zırhı.",
    "img": "assets/filli-official/woodmaxx-parke-vernigi-mat.png",
    "sizes": [
      "0.75 L",
      "2.5 L",
      "12 L"
    ],
    "coverage": "10 – 13 m²/L (Kat başı)",
    "sheen": "İpek Mat Zemin",
    "drying": "24 Saat (Hafif yürüme)",
    "surface": "Masif parke, lamine parke, ahşap basamaklar"
  },
  "woodmaxx-parke-vernigi-parlak": {
    "name": "WoodMaXX® Parke Verniği (Parlak)",
    "category": "ahsap-metal",
    "tag": "Kristal Cam Parlaklığı",
    "sub": "Zemin ahşaplarına derin cam parlaklığı veren, sararmayan, poliüretan modifiyeli sert parke verniği.",
    "img": "assets/filli-official/woodmaxx-parke-vernigi-parlak.png",
    "sizes": [
      "0.75 L",
      "2.5 L",
      "12 L"
    ],
    "coverage": "10 – 13 m²/L",
    "sheen": "Cam Parlak Zemin",
    "drying": "24 Saat",
    "surface": "Ahşap döşemeler, spor salonu parkeleri, merdivenler"
  },
  "woodmaxx-parke-dolgu-vernigi": {
    "name": "WoodMaXX® Parke Dolgu Verniği",
    "category": "ahsap-metal",
    "tag": "Sistre Sonrası Hızlı Dolgu",
    "sub": "Parke gözeneklerini hızla dolduran, kolayca zımparalanan ve son kat parke verniği sarfiyatını azaltan astar.",
    "img": "assets/filli-official/woodmaxx-parke-dolgu-vernigi.png",
    "sizes": [
      "2.5 L",
      "12 L"
    ],
    "coverage": "10 – 12 m²/L",
    "sheen": "Şeffaf Dolgu",
    "drying": "2 – 3 Saat (Zımparalanabilir)",
    "surface": "Sistrelenmiş ham masif ahşap parke zeminler"
  },
  "woodmaxx-yat-vernik": {
    "name": "WoodMaXX® Marin Yat Verniği",
    "category": "ahsap-metal",
    "tag": "Deniz Suyu & Tuzlu Su Zırhı",
    "sub": "Teknelerin ahşap aksamlarında deniz suyu, güneş ve neme karşı çatlamayan yüksek elastikiyetli marin vernik.",
    "img": "assets/filli-official/woodmaxx-yat-vernik.png",
    "sizes": [
      "0.75 L",
      "2.5 L",
      "15 L"
    ],
    "coverage": "13 – 16 m²/L",
    "sheen": "Yüksek Parlak Marin",
    "drying": "4 – 6 Saat",
    "surface": "Tekne güvertesi, dış cephe ahşap doğrama ve panjurlar"
  },
  "woodmaxx-teak-oil-tik-yagi": {
    "name": "WoodMaXX® Teak Oil Tik Yağı",
    "category": "ahsap-metal",
    "tag": "Doğal Yağlar / Tik & İroko",
    "sub": "Tik, iroko ve egzotik bahçe mobilyalarını kuruma ve çatlamadan koruyan, ahşabın beslenmesini sağlayan doğal yağ.",
    "img": "assets/filli-official/woodmaxx-teak-oil-tik-yagi.png",
    "sizes": [
      "0.75 L",
      "2.5 L"
    ],
    "coverage": "14 – 18 m²/L",
    "sheen": "Doğal Mat Ahşap Dokusu",
    "drying": "12 – 24 Saat (Emilim)",
    "surface": "Tik bahçe masası, iroko deck, şezlong, tekne ahşabı"
  },
  "woodmaxx-wood-filler-su-bazli-ahsap-yuzey-duzeltme-macunu": {
    "name": "WoodMaXX® Wood Filler Ahşap Macunu",
    "category": "ahsap-metal",
    "tag": "Çatlamayan Ahşap Tamir Dolgusu",
    "sub": "Ahşaptaki budak delikleri, vida boşlukları ve çatlakları dolduran, kolayca zımparalanan ve boya tutan macun.",
    "img": "assets/filli-official/woodmaxx-wood-filler-su-bazli-ahsap-yuzey-duzeltme-macunu.png",
    "sizes": [
      "0.2 kg",
      "0.8 kg"
    ],
    "coverage": "Dolgu hacmine göre",
    "sheen": "Mat Ahşap Tonu",
    "drying": "1 Saat (Zımpara)",
    "surface": "Ahşap mobilya çatlakları, budak izleri, vida delikleri"
  },
  "metalmaxx-flat": {
    "name": "MetalMaXX® Flat Pas Üstü Düz Boya",
    "category": "ahsap-metal",
    "tag": "Antipas + Astar + Son Kat (3'ü 1 Arada)",
    "sub": "Zımparalanmış paslı demirlerin üzerine astar gerektirmeden doğrudan sürülen pürüzsüz düz parlak metal boyası.",
    "img": "assets/filli-official/metalmaxx-flat.png",
    "sizes": [
      "0.75 L",
      "2.5 L"
    ],
    "coverage": "10 – 12 m²/L",
    "sheen": "Parlak Düz Metal",
    "drying": "2 – 3 Saat",
    "surface": "Ferforje demir, çit, kapı, pencere korkuluğu, metal sac"
  },
  "metalmaxx-hammer": {
    "name": "MetalMaXX® Hammer Çekiçlenmiş Dövme Boya",
    "category": "ahsap-metal",
    "tag": "Dövme Demir & Çekiçlenmiş Efekt",
    "sub": "Metal yüzeylerdeki kaynak pürüzlerini kamufle eden, antika çekiçlenmiş dövme metal görünümü veren zırhlı boya.",
    "img": "assets/filli-official/metalmaxx-hammer.png",
    "sizes": [
      "0.75 L",
      "2.5 L"
    ],
    "coverage": "8 – 10 m²/L",
    "sheen": "Çekiçlenmiş Dövme Metal",
    "drying": "2 – 3 Saat",
    "surface": "Bahçe kapıları, ferforje korkuluklar, çelik kasalar"
  },
  "sentomaxx-ipeksi-mat-sentetik-boya": {
    "name": "SentoMaXX® İpeksi Mat® Sentetik Boya",
    "category": "ahsap-metal",
    "tag": "Aromatsız / Kokusuz Sentetik",
    "sub": "Tiner kokusu yaymayan, ahşap kapı ve pencerelerde sararmayan kadifemsi ipeksi mat sentetik son kat boya.",
    "img": "assets/filli-official/sentomaxx-ipeksi-mat-sentetik-boya.png",
    "sizes": [
      "0.75 L",
      "2.5 L",
      "15 L"
    ],
    "coverage": "14 – 17 m²/L",
    "sheen": "İpeksi Mat Kadife",
    "drying": "3 – 5 Saat",
    "surface": "Amerikan panel kapı, süpürgelik, ahşap ve metal detaylar"
  },
  "sentomaxx-luks-parlak-sentetik-boya": {
    "name": "SentoMaXX® Lüks Parlak Sentetik Boya",
    "category": "ahsap-metal",
    "tag": "Yüksek Parlak / Ayna Efekti",
    "sub": "Sararmaya dirençli reçinesiyle iç ve dış metal-ahşap doğramalarda parıltılı pürüzsüz boya filmi oluşturan son kat.",
    "img": "assets/filli-official/sentomaxx-luks-parlak-sentetik-boya.png",
    "sizes": [
      "0.75 L",
      "2.5 L",
      "15 L"
    ],
    "coverage": "15 – 18 m²/L",
    "sheen": "Lüks Ayna Parlak",
    "drying": "4 – 6 Saat",
    "surface": "Kapı, pencere, korkuluk, ahşap mobilya ve sac yüzeyler"
  },
  "sentomaxx-mat-sentetik-boya": {
    "name": "SentoMaXX® Mat Sentetik Boya",
    "category": "ahsap-metal",
    "tag": "Yansıma Yapmayan Tam Mat",
    "sub": "İç mimari ahşap ve metal imalatlarda modern mat görünüm sunan, kolay fırça rulo yayılımına sahip aromatsız boya.",
    "img": "assets/filli-official/sentomaxx-mat-sentetik-boya.png",
    "sizes": [
      "0.75 L",
      "2.5 L",
      "15 L"
    ],
    "coverage": "13 – 16 m²/L",
    "sheen": "Tam Mat",
    "drying": "3 – 5 Saat",
    "surface": "Ahşap lambri, kapı kasası, ferforje, dekoratif metal"
  },
  "panel-kapi-boyasi": {
    "name": "Filli Boya Panel Kapı Boyası",
    "category": "ahsap-metal",
    "tag": "Su Bazlı / Sararmaz Panel Boyası",
    "sub": "Amerikan panel kapıların ahşap dokusunu bozmadan örten, kokusuz, sararmayan, hızla kuruyan özel kapı boyası.",
    "img": "assets/filli-official/panel-kapi-boyasi.png",
    "sizes": [
      "0.75 L",
      "2.5 L"
    ],
    "coverage": "12 – 15 m²/L",
    "sheen": "İpeksi Mat Panel Beyazı",
    "drying": "2 – 3 Saat",
    "surface": "Amerikan panel kapılar, masif kapılar, pervazlar"
  },
  "super-poliuretan-mat-vernik": {
    "name": "SUPER Poliüretan Mat Vernik Serisi",
    "category": "super-mobilya",
    "tag": "4 Farklı Matlık Derecesi",
    "sub": "Yarı Mat, Özel Mat, Mat ve Kör Mat seçenekleriyle mobilya yüzeylerinde çizilme ve sararmaya karşı 2K koruma.",
    "img": "assets/filli-official/super-poliuretan-mat-vernik.png",
    "sizes": [
      "12 kg Teneke (A+B)"
    ],
    "coverage": "8 – 10 m²/kg",
    "sheen": "Özel Mat / Kör Mat",
    "drying": "30 Dk (Toz), 24 Saat (Tam)",
    "surface": "Mobilya, kaplama masa, lüks ahşap paneller"
  },
  "super-poliuretan-cizilmez-mat-vernik": {
    "name": "SUPER Poliüretan Çizilmez Mat Vernik",
    "category": "super-mobilya",
    "tag": "Nano Çizilmezlik Zırhı",
    "sub": "Masa tablaları ve ofis mobilyalarında metal sürtünmelerine ve tırnak çiziklerine tam dirençli 2K mat vernik.",
    "img": "assets/filli-official/super-poliuretan-cizilmez-mat-vernik.png",
    "sizes": [
      "12 kg Teneke (A+B)"
    ],
    "coverage": "8 – 10 m²/kg",
    "sheen": "Süper Çizilmez Mat",
    "drying": "30 Dakika",
    "surface": "Masa tablaları, sehpa üstleri, otel mobilyaları"
  },
  "super-poliuretan-parlak-vernik": {
    "name": "SUPER Poliüretan Parlak Vernik",
    "category": "super-mobilya",
    "tag": "Yüksek Dolgulu Cam Parlaklık",
    "sub": "Ahşap mobilyalara ayna parlaklığı ve derinlik kazandıran, polisaj yapılabilir 2 bileşenli poliüretan vernik.",
    "img": "assets/filli-official/super-poliuretan-parlak-vernik.png",
    "sizes": [
      "12 kg Teneke (A+B)"
    ],
    "coverage": "7 – 9 m²/kg",
    "sheen": "Cam Parlak Polisajlı",
    "drying": "24 Saat (Polisaj öncesi)",
    "surface": "Lüks piyano cilası mobilyalar, kaplamalı ahşap"
  },
  "super-poliuretan-technik-lack": {
    "name": "SUPER Poliüretan Technik Lack",
    "category": "super-mobilya",
    "tag": "Alman Standartlarında Yüksek Sertlik",
    "sub": "Ağır kimyasal ve mekanik temaslara maruz kalan özel tasarım mobilyalarda yüksek sertlikte koruyucu vernik.",
    "img": "assets/filli-official/super-poliuretan-technik-lack.png",
    "sizes": [
      "12 kg Teneke (A+B)"
    ],
    "coverage": "8 – 10 m²/kg",
    "sheen": "Sert İpek Mat",
    "drying": "24 Saat",
    "surface": "Yemek masaları, mutfak mobilyaları, otel bankoları"
  },
  "super-poliuretan-dolgu-vernigi": {
    "name": "SUPER Poliüretan Dolgu Verniği",
    "category": "super-mobilya",
    "tag": "Ahşap Gözenek Doldurucu",
    "sub": "Kaplama ve masif ahşap yüzeylerdeki mikro delikleri ve gözenekleri dolduran, kolay zımparalanan 2K dolgu.",
    "img": "assets/filli-official/super-poliuretan-dolgu-vernigi.png",
    "sizes": [
      "15 kg Teneke (A+B)"
    ],
    "coverage": "6 – 8 m²/kg",
    "sheen": "Şeffaf Dolgu",
    "drying": "2 – 3 Saat (Zımpara)",
    "surface": "Kaplama mobilya yüzeyleri, masif masalar, kapılar"
  },
  "super-poliuretan-925-dolgu-vernigi": {
    "name": "SUPER Poliüretan 925 Dolgu Verniği",
    "category": "super-mobilya",
    "tag": "Hızlı Kuruma / Ekspres Zımpara",
    "sub": "Seri mobilya üretim hatlarında hızlı zımpara süresiyle üretimi hızlandıran yüksek katı maddeli dolgu verniği.",
    "img": "assets/filli-official/super-poliuretan-925-dolgu-vernigi.png",
    "sizes": [
      "15 kg Teneke (A+B)"
    ],
    "coverage": "6 – 8 m²/kg",
    "sheen": "Ekspres Dolgu",
    "drying": "1.5 – 2 Saat",
    "surface": "Seri üretim mobilya parçaları, sandalyeler, kapılar"
  },
  "super-poliuretan-fon-astar": {
    "name": "SUPER Poliüretan Fon Astarı",
    "category": "super-mobilya",
    "tag": "Şeffaf Aderans & Renk Sabitleme",
    "sub": "Ham ahşabın doğal rengini sabitleyen, üzerine gelen poliüretan verniğin kusursuz yapışmasını sağlayan taban astarı.",
    "img": "assets/filli-official/super-poliuretan-fon-astar.png",
    "sizes": [
      "12 kg Teneke (A+B)"
    ],
    "coverage": "10 – 12 m²/kg",
    "sheen": "Şeffaf Fon Astarı",
    "drying": "1 – 2 Saat",
    "surface": "Masif ve kaplama ahşap taban yüzeyleri"
  },
  "super-poliuretan-astar-beyaz": {
    "name": "SUPER Poliüretan Beyaz Astar",
    "category": "super-mobilya",
    "tag": "Yüksek Kapatıcı 2K Astar",
    "sub": "Lake mobilya boyama işlemlerinde kusursuz zımpara düzlüğü ve üstün beyaz örtücülük sağlayan 2 bileşenli astar.",
    "img": "assets/filli-official/super-poliuretan-astar-beyaz.png",
    "sizes": [
      "18 kg Set (A+B)"
    ],
    "coverage": "5 – 7 m²/kg",
    "sheen": "Mat Beyaz Zımparalanabilir",
    "drying": "3 – 4 Saat",
    "surface": "MDF, masif ahşap, lake kapı ve mobilya gövdeleri"
  },
  "super-poliuretan-mdf-astar-beyaz": {
    "name": "SUPER Poliüretan Beyaz MDF Astarı",
    "category": "super-mobilya",
    "tag": "MDF Kenar Emişini Kesici",
    "sub": "MDF kenar kesimlerindeki lifli yapıyı doyurarak kabarmayı önleyen ve zımparayla ipek pürüzsüzlüğü veren özel astar.",
    "img": "assets/filli-official/super-poliuretan-mdf-astar-beyaz.png",
    "sizes": [
      "18 kg Set (A+B)"
    ],
    "coverage": "5 – 7 m²/kg",
    "sheen": "Yüksek Dolgulu Beyaz",
    "drying": "3 – 4 Saat",
    "surface": "CNC işlemeli MDF paneller, kapak kenarları, oyuklar"
  },
  "super-poliuretan-mat-boya": {
    "name": "SUPER Poliüretan Mat Lake Boya",
    "category": "super-mobilya",
    "tag": "Kadife Doku / Lüks Lake",
    "sub": "Mutfak dolapları ve lüks konut mobilyalarında sararmayan, kadifemsi dokunuş sunan 2K poliüretan mat lake boya.",
    "img": "assets/filli-official/super-poliuretan-mat-boya.png",
    "sizes": [
      "15 kg Set (A+B)"
    ],
    "coverage": "7 – 9 m²/kg",
    "sheen": "İpeksi Mat Lake",
    "drying": "4 Saat (Dokunma)",
    "surface": "MDF lake kapaklar, banyo dolapları, mobilya panelleri"
  },
  "super-poliuretan-h.00-parlak-boya": {
    "name": "SUPER Poliüretan H.00 Parlak Lake Boya",
    "category": "super-mobilya",
    "tag": "Ayna Parlaklığında Beyaz Lake",
    "sub": "Poliüretan lake mobilyalarda ayna parlaklığı ve derinlik veren, sararma yapmayan yüksek dolgulu parlak boya.",
    "img": "assets/filli-official/super-poliuretan-h.00-parlak-boya.png",
    "sizes": [
      "15 kg Set (A+B)"
    ],
    "coverage": "6 – 8 m²/kg",
    "sheen": "Ayna Parlak Lake",
    "drying": "24 Saat (Polisaj)",
    "surface": "Mutfak dolapları, lake kapılar, TV üniteleri"
  },
  "super-poliuretan-h.00-parlak-sprey-boya": {
    "name": "SUPER Poliüretan H.00 Sprey Lake Boya",
    "category": "super-mobilya",
    "tag": "Tabanca Uygulaması İçin Optimize",
    "sub": "Boya kabinlerinde tabancayla atımda portakal kabuğu yapmayan, mükemmel yayılan püskürtme parlak boya.",
    "img": "assets/filli-official/super-poliuretan-h.00-parlak-sprey-boya.png",
    "sizes": [
      "15 kg Set (A+B)"
    ],
    "coverage": "7 – 9 m²/kg",
    "sheen": "Pürüzsüz Parlak",
    "drying": "2 – 3 Saat",
    "surface": "Boya kabini sprey uygulamaları, mobilya parçaları"
  },
  "super-akrilik-parlak-boya-2-1": {
    "name": "SUPER Akrilik Parlak Boya (2+1)",
    "category": "super-mobilya",
    "tag": "%100 Sararmaz Akrilik Lake",
    "sub": "Güneş ışığına ve UV'ye maruz kalsa dahi asla sararmayan, parlaklığını yıllarca koruyan üst sınıf akrilik boya.",
    "img": "assets/filli-official/super-akrilik-parlak-boya-2-1.png",
    "sizes": [
      "15 kg Set (A+B)"
    ],
    "coverage": "7 – 9 m²/kg",
    "sheen": "Kristal Parlak Sararmaz",
    "drying": "3 – 4 Saat",
    "surface": "Güneş alan beyaz mutfaklar, lüks marin mobilyalar"
  },
  "super-akrilik-mat-boya-5-1": {
    "name": "SUPER Akrilik Mat Boya (5+1)",
    "category": "super-mobilya",
    "tag": "Kadife Matlık / Sıfır Sararma",
    "sub": "Modern mat mobilya tasarımlarında parmak izi tutmayan, sararmayan ve çizilmeyen akrilik mat boya.",
    "img": "assets/filli-official/super-akrilik-mat-boya-5-1.png",
    "sizes": [
      "18 kg Set (A+B)"
    ],
    "coverage": "8 – 10 m²/kg",
    "sheen": "İpek Mat Akrilik",
    "drying": "2 – 3 Saat",
    "surface": "Mutfak, banyo ve ofis ahşap mobilya panelleri"
  },
  "super-akrilik-mat-boya-10-1": {
    "name": "SUPER Akrilik Mat Boya (10+1)",
    "category": "super-mobilya",
    "tag": "Ekonomik Sertleştirici Karışımı",
    "sub": "10/1 karışım oranıyla pratik kullanım sunan, homojen yayılımlı sararmaz akrilik mat lake boya.",
    "img": "assets/filli-official/super-akrilik-mat-boya-10-1.png",
    "sizes": [
      "16.5 kg Set (A+B)"
    ],
    "coverage": "8 – 10 m²/kg",
    "sheen": "Mat",
    "drying": "2 – 3 Saat",
    "surface": "İç mekan mobilya ve ahşap aksamları"
  },
  "super-akrilik-parlak-vernik-2-1": {
    "name": "SUPER Akrilik Parlak Vernik (2+1)",
    "category": "super-mobilya",
    "tag": "Açık Renkli Kaplamalar İçin",
    "sub": "Akçaağaç, dişbudak, huş gibi açık renkli kaplamaların rengini karartmayan ve sarartmayan 2K akrilik vernik.",
    "img": "assets/filli-official/super-akrilik-parlak-vernik-2-1.png",
    "sizes": [
      "15 kg Set (A+B)"
    ],
    "coverage": "8 – 10 m²/kg",
    "sheen": "Sararmaz Cam Parlak",
    "drying": "3 – 4 Saat",
    "surface": "Açık renkli ahşap kaplamalar, masa ve sehpalar"
  },
  "super-akrilik-mat-vernik-5-1": {
    "name": "SUPER Akrilik Mat Vernik (5+1)",
    "category": "super-mobilya",
    "tag": "Doğal Ahşap Dokunuşu",
    "sub": "Ahşaba vernik uygulanmamış hissi veren ultra doğal mat görünüm ve üstün UV sararma direnci.",
    "img": "assets/filli-official/super-akrilik-mat-vernik-5-1.png",
    "sizes": [
      "18 kg Set (A+B)"
    ],
    "coverage": "8 – 10 m²/kg",
    "sheen": "Ultra Doğal Mat",
    "drying": "2 Saat",
    "surface": "Masif meşe, ceviz, dişbudak masa ve mobilyalar"
  },
  "super-akrilik-mat-vernik-8-1": {
    "name": "SUPER Akrilik Mat Vernik (8+1)",
    "category": "super-mobilya",
    "tag": "İpek Mat Ahşap Verniği",
    "sub": "İpek mat parlaklık derecesiyle ahşabın sıcaklığını ortaya çıkaran dengeli akrilik mat vernik.",
    "img": "assets/filli-official/super-akrilik-mat-vernik-8-1.png",
    "sizes": [
      "18 kg Set (A+B)"
    ],
    "coverage": "8 – 10 m²/kg",
    "sheen": "İpek Mat",
    "drying": "2 – 3 Saat",
    "surface": "Ahşap mobilya kaplamaları, dolap kapakları"
  },
  "super-akrilik-mat-vernik-10-1": {
    "name": "SUPER Akrilik Mat Vernik (10+1)",
    "category": "super-mobilya",
    "tag": "Seri İmalat Akrilik Vernik",
    "sub": "10/1 karışım oranıyla pratik atım sağlayan, toz tutmayan ve hızlı kuruyan akrilik mobilya verniği.",
    "img": "assets/filli-official/super-akrilik-mat-vernik-10-1.png",
    "sizes": [
      "16.5 kg Set (A+B)"
    ],
    "coverage": "8 – 10 m²/kg",
    "sheen": "Mat",
    "drying": "2 Saat",
    "surface": "Seri mobilya üretimi, kapılar, paneller"
  },
  "super-akrilik-dolgu-vernik-5-1": {
    "name": "SUPER Akrilik Dolgu Verniği (5+1)",
    "category": "super-mobilya",
    "tag": "Sararmaz Akrilik Gözenek Dolgusu",
    "sub": "Açık renk kaplamaların gözeneklerini dolduran, zımpara esnasında tozlanmayan sararmaz dolgu verniği.",
    "img": "assets/filli-official/super-akrilik-dolgu-vernik-5-1.png",
    "sizes": [
      "18 kg Set (A+B)"
    ],
    "coverage": "6 – 8 m²/kg",
    "sheen": "Şeffaf Akrilik Dolgu",
    "drying": "2 Saat (Zımpara)",
    "surface": "Açık renk ahşap kaplamalar ve masif yüzeyler"
  },
  "super-akrilik-dolgu-vernik-10-1": {
    "name": "SUPER Akrilik Dolgu Verniği (10+1)",
    "category": "super-mobilya",
    "tag": "Hızlı Zımparalanan Akrilik Dolgu",
    "sub": "Seri mobilya hatlarında kolay zımparalanma ve hızlı sertleşme sağlayan 10/1 akrilik dolgu.",
    "img": "assets/filli-official/super-akrilik-dolgu-vernik-10-1.png",
    "sizes": [
      "16.5 kg Set (A+B)"
    ],
    "coverage": "6 – 8 m²/kg",
    "sheen": "Akrilik Dolgu",
    "drying": "1.5 – 2 Saat",
    "surface": "Mobilya parçaları, ahşap sandalye ve masalar"
  },
  "super-selulozik-astar": {
    "name": "SUPER Selülozik Beyaz Astar",
    "category": "super-mobilya",
    "tag": "Hızlı Kuruyan Tek Komponentli",
    "sub": "Sertleştirici gerektirmeyen, 15 dakikada zımparaya gelen yüksek örtücü selülozik taban astarı.",
    "img": "assets/filli-official/super-selulozik-astar.png",
    "sizes": [
      "15 kg Teneke"
    ],
    "coverage": "8 – 10 m²/kg",
    "sheen": "Mat Beyaz Zımparalanabilir",
    "drying": "15 – 20 Dakika",
    "surface": "MDF mobilya, ahşap çerçeve, klasik mobilya"
  },
  "super-selulozik-mat-boya": {
    "name": "SUPER Selülozik Mat Boya",
    "category": "super-mobilya",
    "tag": "Geleneksel Mobilya Matlığı",
    "sub": "İç mekan mobilya ve ahşap süslemelerde kadifemsi mat bitiş sağlayan hava kurumalı selülozik boya.",
    "img": "assets/filli-official/super-selulozik-mat-boya.png",
    "sizes": [
      "15 kg Teneke"
    ],
    "coverage": "9 – 11 m²/kg",
    "sheen": "İpek Mat",
    "drying": "10 – 15 Dakika (Toz)",
    "surface": "Ahşap mobilyalar, kapılar, dekoratif profiller"
  },
  "super-selulozik-parlak-boya": {
    "name": "SUPER Selülozik Parlak Boya",
    "category": "super-mobilya",
    "tag": "Hızlı Kuruyan Parlak Boya",
    "sub": "Ahşap yüzeylerde parlak ve pürüzsüz film oluşturan, sertleştirici gerektirmeyen selülozik boya.",
    "img": "assets/filli-official/super-selulozik-parlak-boya.png",
    "sizes": [
      "15 kg Teneke"
    ],
    "coverage": "9 – 11 m²/kg",
    "sheen": "Parlak Selülozik",
    "drying": "15 Dakika",
    "surface": "Ahşap oyuncak, hediyelik eşya, iç mobilyalar"
  },
  "super-selulozik-dolgu-vernik": {
    "name": "SUPER Selülozik Dolgu Verniği",
    "category": "super-mobilya",
    "tag": "Klasik Mobilyacı Dolgusu",
    "sub": "Ahşap elyafını kaldıran ve zımparayla ipek pürüzsüzlüğünde zemin hazırlayan hızlı kuruyan selülozik dolgu.",
    "img": "assets/filli-official/super-selulozik-dolgu-vernik.png",
    "sizes": [
      "12 kg Teneke"
    ],
    "coverage": "8 – 10 m²/kg",
    "sheen": "Şeffaf Kolay Zımpara",
    "drying": "20 Dakika (Zımparalanabilir)",
    "surface": "Masif ve kaplama ahşap mobilyalar"
  },
  "super-selulozik-son-kat-mat-vernikler": {
    "name": "SUPER Selülozik Son Kat Mat Vernik",
    "category": "super-mobilya",
    "tag": "Kadife Dokunuşlu Ahşap Verniği",
    "sub": "Mobilyanın doğal sıcaklığını koruyan, parlamayan, fırça ve tabanca ile rahat uygulanan selülozik mat vernik.",
    "img": "assets/filli-official/super-selulozik-son-kat-mat-vernikler.png",
    "sizes": [
      "12 kg Teneke"
    ],
    "coverage": "10 – 12 m²/kg",
    "sheen": "Mat Selülozik",
    "drying": "15 Dakika",
    "surface": "İç mekan ahşap mobilyalar, sehpalar, büfeler"
  },
  "super-selulozik-son-kat-parlak-vernikler": {
    "name": "SUPER Selülozik Son Kat Parlak Vernik",
    "category": "super-mobilya",
    "tag": "Kristal Parlak Selülozik",
    "sub": "Ahşap desenlerini derinlemesine vurgulayan, çizilmeye dayanıklı parlak son kat mobilya verniği.",
    "img": "assets/filli-official/super-selulozik-son-kat-parlak-vernikler.png",
    "sizes": [
      "12 kg Teneke"
    ],
    "coverage": "10 – 12 m²/kg",
    "sheen": "Yüksek Parlak",
    "drying": "15 Dakika",
    "surface": "Klasik mobilya, oymalı ahşap işleri"
  },
  "super-vital-mat-boya": {
    "name": "SUPER Vital Su Bazlı Mobilya Boyası",
    "category": "super-mobilya",
    "tag": "EN 71-3 Çocuk Oyuncağı Güvenli",
    "sub": "Solvent ve ağır metal içermeyen, bebek odası mobilyaları ve ahşap oyuncaklar için kokusuz su bazlı mat boya.",
    "img": "assets/filli-official/super-vital-mat-boya.png",
    "sizes": [
      "15 kg Kova"
    ],
    "coverage": "10 – 12 m²/kg",
    "sheen": "Su Bazlı İpek Mat",
    "drying": "1 – 2 Saat",
    "surface": "Bebek beşikleri, çocuk odası mobilyaları, oyuncaklar"
  },
  "super-vital-astar": {
    "name": "SUPER Vital Su Bazlı Mobilya Astarı",
    "category": "super-mobilya",
    "tag": "Kokusuz / Çevre Dostu Taban",
    "sub": "Vital serisi su bazlı boyalar öncesinde ahşap ve MDF yüzeyleri dolduran, kolay zımparalanan ekolojik astar.",
    "img": "assets/filli-official/super-vital-astar.png",
    "sizes": [
      "15 kg Kova"
    ],
    "coverage": "8 – 10 m²/kg",
    "sheen": "Örtücü Beyaz Mat",
    "drying": "2 – 3 Saat (Zımpara)",
    "surface": "MDF ve masif ahşap mobilya parçaları"
  },
  "super-vital-mat-vernik": {
    "name": "SUPER Vital Su Bazlı Mat Vernik",
    "category": "super-mobilya",
    "tag": "Kokusuz Şeffaf Ahşap Zırhı",
    "sub": "İç mekan ahşaplarda sararma yapmayan, yangın tehlikesi olmayan, su bazlı hijyenik ve dayanıklı mat vernik.",
    "img": "assets/filli-official/super-vital-mat-vernik.png",
    "sizes": [
      "15 kg Kova"
    ],
    "coverage": "10 – 12 m²/kg",
    "sheen": "İpek Mat Su Bazlı",
    "drying": "2 Saat",
    "surface": "İç mekan ahşap mobilya, lambri, mutfak dolapları"
  },
  "super-vital-dolgu-vernigi": {
    "name": "SUPER Vital Su Bazlı Dolgu Verniği",
    "category": "super-mobilya",
    "tag": "Ekolojik Ahşap Gözenek Dolgusu",
    "sub": "Vital vernik öncesi ahşap gözeneklerini dolduran, solvent kokusu yaymayan su bazlı profesyonel dolgu.",
    "img": "assets/filli-official/super-vital-dolgu-vernigi.png",
    "sizes": [
      "15 kg Kova"
    ],
    "coverage": "8 – 10 m²/kg",
    "sheen": "Şeffaf Ekolojik Dolgu",
    "drying": "2 – 3 Saat",
    "surface": "Masif ve kaplama ahşap mobilya yüzeyleri"
  },
  "super-polyester-astar": {
    "name": "SUPER Polyester Astar",
    "category": "super-mobilya",
    "tag": "%100 Katı Madde / Çökme Yapmaz",
    "sub": "MDF kenar ve yüzeylerinde zamanla çökme yapmayan, ayna pürüzsüzlüğünde lake zemini hazırlayan yüksek dolgulu astar.",
    "img": "assets/filli-official/super-polyester-astar.png",
    "sizes": [
      "25 kg Set (Hızlandırıcı + Sertleştirici)"
    ],
    "coverage": "3 – 5 m²/kg (Kalın film)",
    "sheen": "Yüksek Dolgulu Mat",
    "drying": "4 – 6 Saat (Kürlenme)",
    "surface": "Lüks piyano lake mobilyalar, kalın MDF kasetler"
  },
  "super-polyester-dolgu-vernik": {
    "name": "SUPER Polyester Dolgu Verniği",
    "category": "super-mobilya",
    "tag": "Cam Masif Dolgusu",
    "sub": "Kaplamalı masalarda ahşap damarlarını kristal şeffaflıkla dolduran, büzülme yapmayan ağır hizmet polyester dolgu.",
    "img": "assets/filli-official/super-polyester-dolgu-vernik.png",
    "sizes": [
      "25 kg Set"
    ],
    "coverage": "3 – 5 m²/kg",
    "sheen": "Kristal Cam Dolgu",
    "drying": "6 – 8 Saat",
    "surface": "Lüks kaplama masa tablaları, müzik aletleri"
  },
  "super-capacolor-ahsap-renklendirici": {
    "name": "SUPER Capacolor Ahşap Renklendirici",
    "category": "super-mobilya",
    "tag": "Evrensel Usta Renklendiricisi",
    "sub": "Poliüretan, selülozik ve sentetik verniklerin içerisine katılarak veya doğrudan ham ahşaba sürülerek uygulanan renklendirici.",
    "img": "assets/filli-official/super-capacolor-ahsap-renklendirici.png",
    "sizes": [
      "0.5 L",
      "1 L"
    ],
    "coverage": "İstenen renk şiddetine göre",
    "sheen": "Şeffaf Ahşap Tonları",
    "drying": "Uygulanan sistem hızında",
    "surface": "Tüm ahşap mobilya renklendirme işlemleri"
  },
  "ultra-poliuretan-ahsap-bariyer": {
    "name": "ULTRA Poliüretan Ahşap Bariyeri",
    "category": "fine-ultra",
    "tag": "Reçine & Yağ Kusmasını Keser",
    "sub": "Tik, iroko ve reçineli çam gibi yağlı ahşaplarda boya ve verniğin atmasını engelleyen 1/1 güçlü bariyer vernik.",
    "img": "assets/filli-official/ultra-poliuretan-ahsap-bariyer.png",
    "sizes": [
      "10 kg Set (A+B)"
    ],
    "coverage": "10 – 12 m²/kg",
    "sheen": "Şeffaf Nüfuz Bariyeri",
    "drying": "2 – 3 Saat",
    "surface": "Yağlı egzotik ahşaplar, tik, iroko, çam budakları"
  },
  "ultra-poliuretan-mdf-bariyer": {
    "name": "ULTRA Poliüretan MDF Bariyeri",
    "category": "fine-ultra",
    "tag": "MDF Kenar Liflerini Sabitler",
    "sub": "CNC işlenmiş MDF kapakların gözenekli kenarlarına nüfuz ederek lake boyanın çökmesini ve dalgalanmasını önleyen bariyer.",
    "img": "assets/filli-official/ultra-poliuretan-mdf-bariyer.png",
    "sizes": [
      "10 kg Set (A+B)"
    ],
    "coverage": "8 – 10 m²/kg",
    "sheen": "Derin Penetrasyon",
    "drying": "2 Saat",
    "surface": "CNC işlemeli MDF kenarları ve oyma detaylar"
  },
  "ultra-poliuretan-dolgu-vernik": {
    "name": "ULTRA Poliüretan Yüksek Dolgu Verniği",
    "category": "fine-ultra",
    "tag": "Ekstra Katı Madde / Kolay Zımpara",
    "sub": "En zorlu ahşap kaplamalarda dahi tek katta gözenekleri doyuran, sıfır zımpara çiziği bırakan üst sınıf dolgu.",
    "img": "assets/filli-official/ultra-poliuretan-dolgu-vernik.png",
    "sizes": [
      "15 kg Set (A+B)"
    ],
    "coverage": "6 – 8 m²/kg",
    "sheen": "Yüksek Dolgulu Şeffaf",
    "drying": "2 Saat (Zımpara)",
    "surface": "Lüks kaplama mobilyalar, otel mobilyaları"
  },
  "ultra-poliuretan-sararmaz-parlak-vernik-1-1": {
    "name": "ULTRA Poliüretan Sararmaz Parlak Vernik (1+1)",
    "category": "fine-ultra",
    "tag": "1/1 Eşit Karışım / Sararmaz Parlak",
    "sub": "Hata payını sıfırlayan 1/1 karışımlı, sararmaz alifatik yapıda ultra parlak polisaj verniği.",
    "img": "assets/filli-official/ultra-poliuretan-sararmaz-parlak-vernik-1-1.png",
    "sizes": [
      "12 kg Set (A+B)"
    ],
    "coverage": "8 – 10 m²/kg",
    "sheen": "Sararmaz Ayna Parlak",
    "drying": "24 Saat (Polisaj)",
    "surface": "Lüks mobilya tablaları, beyaz lake üzeri vernikleme"
  },
  "ultra-poliuretan-mat-vernik": {
    "name": "ULTRA Poliüretan İpeksi Mat Vernik",
    "category": "fine-ultra",
    "tag": "Soft-Touch Kadife Efekti",
    "sub": "Dokunulduğunda ipeksi kadife hissi veren, parmak izi tutmayan lüks tasarım mobilya verniği.",
    "img": "assets/filli-official/ultra-poliuretan-mat-vernik.png",
    "sizes": [
      "12 kg Set (A+B)"
    ],
    "coverage": "8 – 10 m²/kg",
    "sheen": "Soft-Touch İpek Mat",
    "drying": "30 Dk (Toz), 24 Saat (Tam)",
    "surface": "Lüks yatak odası, giyinme odası ve ofis mobilyaları"
  },
  "ultra-poliuretan-astar": {
    "name": "ULTRA Poliüretan Beyaz Zımpara Astarı",
    "category": "fine-ultra",
    "tag": "Mükemmel Yayılım & Hızlı Priz",
    "sub": "Dikey uygulamalarda akma yapmayan, tabancayla atımda sıfır portakallanma sağlayan ultra kaliteli lake astarı.",
    "img": "assets/filli-official/ultra-poliuretan-astar.png",
    "sizes": [
      "18 kg Set (A+B)"
    ],
    "coverage": "6 – 8 m²/kg",
    "sheen": "Mat Beyaz Zımparalanabilir",
    "drying": "3 Saat",
    "surface": "Lake kapı, MDF mutfak panelleri, banyo dolapları"
  },
  "ultra-akrilik-astar-2-1": {
    "name": "ULTRA Akrilik Astar (2+1)",
    "category": "fine-ultra",
    "tag": "Sıfır Sararma / Üstün Elastikiyet",
    "sub": "Isı ve nem değişimlerinde çatlama yapmayan, sararmayan 2+1 formüllü üst sınıf akrilik mobilya astarı.",
    "img": "assets/filli-official/ultra-akrilik-astar-2-1.png",
    "sizes": [
      "15 kg Set (A+B)"
    ],
    "coverage": "7 – 9 m²/kg",
    "sheen": "Örtücü Beyaz Mat",
    "drying": "2 – 3 Saat",
    "surface": "Yüksek kaliteli MDF ve masif ahşap elemanlar"
  },
  "ultra-akrilik-dolgu-vernik-2-1": {
    "name": "ULTRA Akrilik Dolgu Verniği (2+1)",
    "category": "fine-ultra",
    "tag": "Kristal Şeffaflık & Sararmazlık",
    "sub": "Açık renkli ahşapların doğal tonunu koruyarak gözeneklerini dolduran, zımparası çok rahat akrilik dolgu.",
    "img": "assets/filli-official/ultra-akrilik-dolgu-vernik-2-1.png",
    "sizes": [
      "15 kg Set (A+B)"
    ],
    "coverage": "7 – 9 m²/kg",
    "sheen": "Kristal Şeffaf",
    "drying": "2 Saat",
    "surface": "Huş, dişbudak, meşe kaplama masa ve mobilyalar"
  },
  "ultra-akrilik-parlak-vernik-2-1": {
    "name": "ULTRA Akrilik Parlak Vernik (2+1)",
    "category": "fine-ultra",
    "tag": "Ayna Parlaklığı / Polisaj Zirvesi",
    "sub": "Ağır polisaj işlemlerine tam uyumlu, hare yapmayan ve güneş ışığında sararmayan kristal parlak vernik.",
    "img": "assets/filli-official/ultra-akrilik-parlak-vernik-2-1.png",
    "sizes": [
      "15 kg Set (A+B)"
    ],
    "coverage": "8 – 10 m²/kg",
    "sheen": "Süper Parlak Polisajlı",
    "drying": "24 – 48 Saat (Polisaj)",
    "surface": "Yat mobilyaları, lüks piyano cilası sehpalar"
  },
  "ultra-akrilik-parlak-boya-2-1": {
    "name": "ULTRA Akrilik Parlak Lake Boya (2+1)",
    "category": "fine-ultra",
    "tag": "Sararmaz Lüks Beyaz Lake",
    "sub": "Beyaz ve pastel tonlu mobilyalarda zamanla sararma problemini tarihe gömen ultra parlak akrilik lake boya.",
    "img": "assets/filli-official/ultra-akrilik-parlak-boya-2-1.png",
    "sizes": [
      "15 kg Set (A+B)"
    ],
    "coverage": "7 – 9 m²/kg",
    "sheen": "Ayna Parlak Lake",
    "drying": "4 Saat (Dokunma)",
    "surface": "Güneş gören mutfak dolapları, lüks tasarım mobilyalar"
  },
  "fine-poliuretan-astar": {
    "name": "FINE Poliüretan Astar",
    "category": "fine-ultra",
    "tag": "Atölye Dostu Kolay Zımpara",
    "sub": "Mobilya atölyelerinde hızlı kuruma ve tozsuz zımpara imkanı sunan yüksek dolduruculu poliüretan astar.",
    "img": "assets/filli-official/fine-poliuretan-astar.png",
    "sizes": [
      "18 kg Set (A+B)"
    ],
    "coverage": "6 – 8 m²/kg",
    "sheen": "Mat Beyaz Zımparalanabilir",
    "drying": "2 – 3 Saat",
    "surface": "MDF paneller, kapı kanatları, süpürgelikler"
  },
  "fine-poliuretan-mat-boya-2-1": {
    "name": "FINE Poliüretan Mat Boya (2+1)",
    "category": "fine-ultra",
    "tag": "İpeksi Mat Lake Bitirici",
    "sub": "2+1 karışım oranıyla homojen matlık ve yüksek mekanik darbe direnci sağlayan lake mobilya boyası.",
    "img": "assets/filli-official/fine-poliuretan-mat-boya-2-1.png",
    "sizes": [
      "15 kg Set (A+B)"
    ],
    "coverage": "8 – 10 m²/kg",
    "sheen": "İpeksi Mat",
    "drying": "3 Saat",
    "surface": "Mutfak kapakları, gardırop kapakları, ofis masaları"
  },
  "fine-poliuretan-mat-boya-4-1": {
    "name": "FINE Poliüretan Mat Boya (4+1)",
    "category": "fine-ultra",
    "tag": "Yüksek Sertlik / 4+1 Formül",
    "sub": "4/1 sertleştirici oranıyla ekonomik ve yüksek yüzey sertliğine ulaşan poliüretan mat lake boya.",
    "img": "assets/filli-official/fine-poliuretan-mat-boya-4-1.png",
    "sizes": [
      "15 kg Set (A+B)"
    ],
    "coverage": "8 – 10 m²/kg",
    "sheen": "Sert Mat",
    "drying": "3 Saat",
    "surface": "Otel mobilyaları, restoran masaları, kapılar"
  },
  "fine-poliuretan-parlak-boya-2-1": {
    "name": "FINE Poliüretan Parlak Boya (2+1)",
    "category": "fine-ultra",
    "tag": "Göz Alıcı Parlaklık & Dolgu",
    "sub": "Ahşap yüzeylerde dalgalanma yapmadan homojen yayılan, parlaklığını koruyan 2K poliüretan boya.",
    "img": "assets/filli-official/fine-poliuretan-parlak-boya-2-1.png",
    "sizes": [
      "15 kg Set (A+B)"
    ],
    "coverage": "7 – 9 m²/kg",
    "sheen": "Yüksek Parlak Lake",
    "drying": "4 Saat",
    "surface": "Lake banyo dolapları, mobilya gövdeleri"
  },
  "fine-poliuretan-panel-kapi-boyasi": {
    "name": "FINE Poliüretan Panel Kapı Boyası",
    "category": "fine-ultra",
    "tag": "Sarılaşmaz Kapı Lake Boyası",
    "sub": "Amerikan panel ve masif kapılarda darbe ve anahtar çarpmalarına dayanıklı profesyonel 2K kapı boyası.",
    "img": "assets/filli-official/fine-poliuretan-panel-kapi-boyasi.png",
    "sizes": [
      "15 kg Set (A+B)"
    ],
    "coverage": "9 – 11 m²/kg",
    "sheen": "İpek Mat Kapı Beyazı",
    "drying": "3 Saat",
    "surface": "Panel kapılar, pervazlar, süpürgelikler"
  },
  "fine-poliuretan-dolgu-vernik": {
    "name": "FINE Poliüretan Dolgu Verniği",
    "category": "fine-ultra",
    "tag": "Yüksek Hacimli Gözenek Doldurucu",
    "sub": "Kaplamalı ve masif mobilyalarda derin ahşap damarlarını hızla dolduran standart poliüretan dolgu.",
    "img": "assets/filli-official/fine-poliuretan-dolgu-vernik.png",
    "sizes": [
      "15 kg Set (A+B)"
    ],
    "coverage": "6 – 8 m²/kg",
    "sheen": "Şeffaf Dolgu",
    "drying": "2 – 3 Saat",
    "surface": "Masif ve kaplama ahşap yüzeyler"
  },
  "fine-poliuretan-dolgu-vernigi-express": {
    "name": "FINE Poliüretan Express Dolgu Verniği",
    "category": "fine-ultra",
    "tag": "1 Saatte Zımpara Hızı",
    "sub": "Hızlı iş teslimi gereken atölyelerde 1 saatte zımparaya gelen ultra ekspres poliüretan dolgu verniği.",
    "img": "assets/filli-official/fine-poliuretan-dolgu-vernigi-express.png",
    "sizes": [
      "15 kg Set (A+B)"
    ],
    "coverage": "6 – 8 m²/kg",
    "sheen": "Hızlı Sertleşen Dolgu",
    "drying": "1 Saat (Zımpara)",
    "surface": "Acil teslimat mobilya işleri, seri imalat parçaları"
  },
  "fine-poliuretan-ozel-dolgu-vernigi": {
    "name": "FINE Poliüretan Özel Dolgu Verniği",
    "category": "fine-ultra",
    "tag": "Zorlu Ahşap Türleri İçin",
    "sub": "Geniş gözenekli meşe ve ceviz ağaçlarında çökme yapmadan dolgunluk sağlayan özel reçineli dolgu.",
    "img": "assets/filli-official/fine-poliuretan-ozel-dolgu-vernigi.png",
    "sizes": [
      "15 kg Set (A+B)"
    ],
    "coverage": "6 – 8 m²/kg",
    "sheen": "Ağır Gözenek Dolgusu",
    "drying": "2 – 3 Saat",
    "surface": "Geniş gözenekli masif meşe, kestane ve ceviz mobilyalar"
  },
  "fine-poliuretan-mat-vernik-serisi": {
    "name": "FINE Poliüretan Mat Vernik Serisi",
    "category": "fine-ultra",
    "tag": "Dengeli Matlık & Kimyasal Direnç",
    "sub": "Ev ve ofis mobilyalarında çay, kahve, alkol lekelerine karşı dayanıklı homojen mat vernik serisi.",
    "img": "assets/filli-official/fine-poliuretan-mat-vernik-serisi.png",
    "sizes": [
      "12 kg Set (A+B)"
    ],
    "coverage": "8 – 10 m²/kg",
    "sheen": "İpek Mat / Özel Mat",
    "drying": "30 Dk (Toz), 24 Saat (Tam)",
    "surface": "Masa, sehpa, dolap kapakları, ahşap paneller"
  },
  "fine-poliuretan-parlak-vernik-extra": {
    "name": "FINE Poliüretan Parlak Vernik Extra",
    "category": "fine-ultra",
    "tag": "Ekstra Parlaklık & Dolgun Film",
    "sub": "Tek katta dahi kalın ve cam gibi parlak film tabakası oluşturan üst sınıf 2K poliüretan vernik.",
    "img": "assets/filli-official/fine-poliuretan-parlak-vernik-extra.png",
    "sizes": [
      "12 kg Set (A+B)"
    ],
    "coverage": "8 – 10 m²/kg",
    "sheen": "Ekstra Cam Parlak",
    "drying": "4 Saat (Dokunma)",
    "surface": "Ahşap büfeler, yemek masaları, lüks mobilyalar"
  },
  "fine-poliuretan-parlak-vernik-1-1": {
    "name": "FINE Poliüretan Parlak Vernik (1+1)",
    "category": "fine-ultra",
    "tag": "1/1 Kolay Karışım Oranı",
    "sub": "Tartı gerektirmeden 1 teneke verniğe 1 teneke sertleştirici katılarak uygulanan pratik parlak vernik.",
    "img": "assets/filli-official/fine-poliuretan-parlak-vernik-1-1.png",
    "sizes": [
      "12 kg Set (A+B)"
    ],
    "coverage": "8 – 10 m²/kg",
    "sheen": "Parlak",
    "drying": "4 Saat",
    "surface": "Mobilya atölyeleri, seri ahşap boyama işleri"
  },
  "fine-selulozik-astar": {
    "name": "FINE Selülozik Beyaz Astar",
    "category": "fine-ultra",
    "tag": "Ekonomik Hızlı Kuruyan Astar",
    "sub": "Ahşap ve MDF yüzeylerde 15 dakikada kuruyan, zımparası kolay ekonomik selülozik astar.",
    "img": "assets/filli-official/fine-selulozik-astar.png",
    "sizes": [
      "15 kg Teneke"
    ],
    "coverage": "8 – 10 m²/kg",
    "sheen": "Mat Beyaz Zımparalanabilir",
    "drying": "15 Dakika",
    "surface": "Mobilya parçaları, ahşap çerçeveler, çıtalar"
  },
  "fine-selulozik-mat-boya": {
    "name": "FINE Selülozik Mat Boya",
    "category": "fine-ultra",
    "tag": "Hızlı Kuruyan Mat Ahşap Boyası",
    "sub": "Hava kurumalı, tek bileşenli, iç mekan ahşap yüzeylerde kadifemsi matlık sağlayan selülozik boya.",
    "img": "assets/filli-official/fine-selulozik-mat-boya.png",
    "sizes": [
      "15 kg Teneke"
    ],
    "coverage": "9 – 11 m²/kg",
    "sheen": "Mat",
    "drying": "15 Dakika",
    "surface": "Ahşap mobilya parçaları, sandalyeler, kapılar"
  },
  "fine-selulozik-catlak-boya": {
    "name": "FINE Selülozik Çatlak Boya (Krakle)",
    "category": "fine-ultra",
    "tag": "Antika Çatlatma Efekti (Krakle)",
    "sub": "Kururken kendiliğinden kontrollü çatlaklar oluşturarak mobilyalara asırlık antika görünümü kazandıran efekt boyası.",
    "img": "assets/filli-official/fine-selulozik-catlak-boya.png",
    "sizes": [
      "1 kg",
      "3 kg Teneke"
    ],
    "coverage": "6 – 8 m²/kg",
    "sheen": "Dekoratif Çatlak Doku",
    "drying": "20 – 30 Dakika (Çatlama)",
    "surface": "Klasik büfeler, antika sehpalar, ayna çerçeveleri"
  },
  "fine-selulozik-dolgu-vernik": {
    "name": "FINE Selülozik Dolgu Verniği",
    "category": "fine-ultra",
    "tag": "Çabuk Zımpara / Yüksek Verim",
    "sub": "Ham ahşabın liflerini bağlayarak kolay zımparalanan pürüzsüz alt yüzey oluşturan selülozik dolgu.",
    "img": "assets/filli-official/fine-selulozik-dolgu-vernik.png",
    "sizes": [
      "12 kg Teneke"
    ],
    "coverage": "8 – 10 m²/kg",
    "sheen": "Şeffaf Dolgu",
    "drying": "15 – 20 Dakika",
    "surface": "Masif ve kaplama ahşap yüzeyler"
  },
  "fine-selulozik-parlak-sedef-vernik": {
    "name": "FINE Selülozik Parlak Sedef Vernik",
    "category": "fine-ultra",
    "tag": "Sedef Işıltılı Mobilya Verniği",
    "sub": "Mobilyalara ve oymalı ahşap süslemelere derin sedef ışıltısı ve parıltılı lüks görünüm veren son kat vernik.",
    "img": "assets/filli-official/fine-selulozik-parlak-sedef-vernik.png",
    "sizes": [
      "12 kg Teneke"
    ],
    "coverage": "9 – 11 m²/kg",
    "sheen": "Sedef Parlak",
    "drying": "15 Dakika",
    "surface": "Lüks mobilya detayları, yatak başlıkları, çerçeveler"
  },
  "fine-selulozik-renkli-vernik": {
    "name": "FINE Selülozik Renkli Vernik",
    "category": "fine-ultra",
    "tag": "Renklendirici & Vernik Tek Katta",
    "sub": "Ahşaba hem doğal renk veren hem de parlak koruma tabakası oluşturan çift etkili pratik selülozik vernik.",
    "img": "assets/filli-official/fine-selulozik-renkli-vernik.png",
    "sizes": [
      "12 kg Teneke"
    ],
    "coverage": "10 – 12 m²/kg",
    "sheen": "Şeffaf Renkli Parlak",
    "drying": "15 Dakika",
    "surface": "Ahşap sehpalar, sandalyeler, çerçeveler"
  },
  "fine-dekoratif-ahsap-renklendirici": {
    "name": "FINE Dekoratif Ahşap Renklendirici",
    "category": "fine-ultra",
    "tag": "Doğal Damar Belirginleştirici",
    "sub": "Ahşabın doğal damarlarını derinlemesine boyayan, ceviz, meşe ve venge tonları sunan konsantre renklendirici.",
    "img": "assets/filli-official/fine-dekoratif-ahsap-renklendirici.png",
    "sizes": [
      "1 L Şişe"
    ],
    "coverage": "15 – 20 m²/L",
    "sheen": "Transparan Renk",
    "drying": "30 Dakika",
    "surface": "Ham masif ve kaplama mobilya yüzeyleri"
  },
  "fine-eskitme-patina-boyasi": {
    "name": "FINE Eskitme Patina Boyası",
    "category": "fine-ultra",
    "tag": "Vintage & Rustik Eskitme",
    "sub": "Oyma köşelerde, çerçevelerde ve lake mobilyalarda silme yöntemiyle nostaljik rustik derinlik efekti veren patina boyası.",
    "img": "assets/filli-official/fine-eskitme-patina-boyasi.png",
    "sizes": [
      "1 kg Kutu"
    ],
    "coverage": "Yüzey detayına göre",
    "sheen": "Mat Eskitme Efekt",
    "drying": "10 Dakika (Silme)",
    "surface": "Klasik oyma mobilyalar, rustik masa ve dolaplar"
  },
  "fine-matlastirici-pasta": {
    "name": "FINE Matlaştırıcı Pasta",
    "category": "fine-ultra",
    "tag": "Özel Parlaklık Ayarlayıcı",
    "sub": "Poliüretan ve selülozik parlak boya ve verniklerin içine katılarak istenen matlık derecesine düşüren konsantre pasta.",
    "img": "assets/filli-official/fine-matlastirici-pasta.png",
    "sizes": [
      "1 kg Kutu"
    ],
    "coverage": "Boya ağırlığının %5–15'i",
    "sheen": "Matlaştırıcı Konsantre",
    "drying": "Sistem hızında",
    "surface": "Poliüretan ve selülozik boya/vernik karışımları"
  },
  "fine-gofrato-pasta": {
    "name": "FINE Gofrato Pasta (Pütür Efekti)",
    "category": "fine-ultra",
    "tag": "Pütürlü Metal & Ahşap Dokusu",
    "sub": "Boyanın içerisine katılarak yüzeye pütürlü, kaymaz ve çizilme izlerini kamufle eden gofrato tekstür dokusu kazandıran katkı.",
    "img": "assets/filli-official/fine-gofrato-pasta.png",
    "sizes": [
      "1 kg Kutu"
    ],
    "coverage": "Boya ağırlığının %10–20'si",
    "sheen": "Pütürlü Tekstür Dokusu",
    "drying": "Sistem hızında",
    "surface": "Ses kolonları, büro mobilyaları, metal kasalar"
  },
  "expert-karbonlu-isi-yalitim-levhasi": {
    "name": "Expert Karbonlu EPS Isı Yalıtım Levhası",
    "category": "eps-levha",
    "tag": "Gri Grafitli / Yüksek Performans",
    "sub": "Grafit tanecikleriyle ısı ışınımını yansıtan, şantiyeler için yüksek tasarruf sağlayan karbonlu mantolama levhası.",
    "img": "assets/filli-official/expert-karbonlu-isi-yalitim-levhasi.png",
    "sizes": [
      "3 cm",
      "4 cm",
      "5 cm",
      "6 cm",
      "8 cm"
    ],
    "coverage": "Paket bazlı metraj",
    "sheen": "Grafitli Gri EPS",
    "drying": "DIN 4102 B1 Alev Yürütmez",
    "surface": "Apartman, site ve toplu konut dış cepheleri"
  },
  "expert-035-beyaz-eps-isi-yalitim-levhasi": {
    "name": "Expert 035 Beyaz EPS Levha (20–22 kg/m³)",
    "category": "eps-levha",
    "tag": "Yüksek Yoğunluk / Basınç Direnci",
    "sub": "Yoğunluğu artırılmış, ezilme ve basma mukavemeti yüksek, ekonomik ve uzun ömürlü beyaz mantolama straforu.",
    "img": "assets/filli-official/expert-035-beyaz-eps-isi-yalitim-levhasi.png",
    "sizes": [
      "3 cm",
      "4 cm",
      "5 cm",
      "6 cm"
    ],
    "coverage": "Standart Paket",
    "sheen": "Sıkı Beyaz Strafor",
    "drying": "Çökme Yapmaz",
    "surface": "Dış cepheler, su basman kotu, tavan yalıtımı"
  },
  "expert-beyaz-eps-isi-yalitim-levhalari": {
    "name": "Expert Beyaz Standart EPS Levhaları",
    "category": "eps-levha",
    "tag": "16 kg/m³ Ekonomik Proje Levhası",
    "sub": "Büyük inşaat projelerinde standart ısı yalıtım gereksinimlerini karşılayan, hafif ve kolay kesilen EPS levha.",
    "img": "assets/filli-official/expert-beyaz-eps-isi-yalitim-levhalari.png",
    "sizes": [
      "3 cm",
      "4 cm",
      "5 cm"
    ],
    "coverage": "Standart Paket",
    "sheen": "Beyaz EPS",
    "drying": "Hafif & Pratik",
    "surface": "Toplu konut projeleri, ambarlar, dış duvarlar"
  },
  "expert-beyaz-eps-isi-yalitim-levhasi-22": {
    "name": "Expert Beyaz EPS Ağır Hizmet Levhası (22 kg/m³)",
    "category": "eps-levha",
    "tag": "Su Basman & Zemin Yalıtımı",
    "sub": "Bina eteklerinde su basman kotu ve zemin şap altlarında darbe ve basınca direnç gösteren ekstra sert EPS.",
    "img": "assets/filli-official/expert-beyaz-eps-isi-yalitim-levhasi-22.png",
    "sizes": [
      "4 cm",
      "5 cm",
      "6 cm"
    ],
    "coverage": "Paket Bazlı",
    "sheen": "Sert Kompakt EPS",
    "drying": "Darbe Dayanımı",
    "surface": "Su basman kotları, otopark tavanları, teraslar"
  },
  "expert-premium-tasyunu-isi-yalitim-levhasi": {
    "name": "Expert Premium Taşyünü Levhası",
    "category": "tasyunu",
    "tag": "A1 Yanmazlık / Üstün Isı & Ses",
    "sub": "1000°C üzerindeki yangınlara dayanan A1 yanmazlık sınıfında, lifli yapısıyla kusursuz ses ve ısı yalıtımı sunan taşyünü.",
    "img": "assets/filli-official/expert-premium-tasyunu-isi-yalitim-levhasi.png",
    "sizes": [
      "4 cm",
      "5 cm",
      "6 cm",
      "8 cm",
      "10 cm"
    ],
    "coverage": "60 x 120 cm (0.72 m²/Levha)",
    "sheen": "A1 Sınıfı Bazalt Lif",
    "drying": "Yangın Bariyeri",
    "surface": "Yüksek katlı binalar, kamu kurumları, hastaneler"
  },
  "expert-tasyunu-ld125-isi-yalitim-levhasi": {
    "name": "Expert Taşyünü LD125 Cephe Levhası",
    "category": "tasyunu",
    "tag": "125 kg/m³ Sıvalı Dış Cephe",
    "sub": "Sıvalı dış cephe mantolama sistemleri için özel olarak üretilmiş, sıva tutuculuğu mükemmel bazalt taşyünü levha.",
    "img": "assets/filli-official/expert-tasyunu-ld125-isi-yalitim-levhasi.png",
    "sizes": [
      "4 cm",
      "5 cm",
      "6 cm",
      "8 cm"
    ],
    "coverage": "0.72 m² / Levha",
    "sheen": "Lifli Doğal Taş",
    "drying": "Tam Nefes Alma",
    "surface": "Apartman ve konut dış cephe sıvalı mantolama"
  },
  "expert-tasyunu-hd150-isi-yalitim-levhasi": {
    "name": "Expert Taşyünü HD150 Ağır Hizmet Levhası",
    "category": "tasyunu",
    "tag": "150 kg/m³ Yüksek Çekme Direnci",
    "sub": "Rüzgar yükünün çok yüksek olduğu gökdelenler ve sahil şeridi yapılarında yüzeyden ayrılmayan ekstra yoğun taşyünü.",
    "img": "assets/filli-official/expert-tasyunu-hd150-isi-yalitim-levhasi.png",
    "sizes": [
      "5 cm",
      "6 cm",
      "8 cm",
      "10 cm"
    ],
    "coverage": "0.72 m² / Levha",
    "sheen": "Ekstra Yoğun Bazalt",
    "drying": "Rüzgar Yükü Zırhı",
    "surface": "Yüksek yapılar, kuleler, sahil cepheleri"
  },
  "expert-vf80-tasyunu-giydirme-cephe-levhasi": {
    "name": "Expert VF80 Taşyünü Havalandırmalı Cephe Levhası",
    "category": "tasyunu",
    "tag": "80 kg/m³ / Cam Tülü Kaplı",
    "sub": "Granit, kompozit ve mekanik seramik kaplamalı havalandırmalı giydirme cephelerin arkasında rüzgarla uçuşmayan levha.",
    "img": "assets/filli-official/expert-vf80-tasyunu-giydirme-cephe-levhasi.png",
    "sizes": [
      "5 cm",
      "6 cm",
      "8 cm"
    ],
    "coverage": "0.72 m² / Levha",
    "sheen": "Siyah Cam Tüllü / Ham",
    "drying": "Hava Sirkülasyonuna Dirençli",
    "surface": "Mekanik seramik, kompakt laminat, alüminyum kompozit arkası"
  },
  "expert-rf150-tasyunu-teras-cati-levhasi": {
    "name": "Expert RF150 Taşyünü Teras Çatı Levhası",
    "category": "tasyunu",
    "tag": "150 kg/m³ Yürünen Çatı & Teras",
    "sub": "Üzerinde yürünebilen teras çatılarda ve metal çatı kaplamalarında ezilmeden ısı ve yangın yalıtımı sağlayan sert taşyünü.",
    "img": "assets/filli-official/expert-rf150-tasyunu-teras-cati-levhasi.png",
    "sizes": [
      "5 cm",
      "8 cm",
      "10 cm"
    ],
    "coverage": "0.72 m² / Levha",
    "sheen": "Sertleştirilmiş Bazalt",
    "drying": "Ezilmez Yüksek Mukavemet",
    "surface": "Teras çatılar, membran altı, trapez sac çatı üzeri"
  },
  "expert-pw50-tasyunu-ara-bolme-levhasi": {
    "name": "Expert PW50 Taşyünü Ara Bölme Levhası",
    "category": "tasyunu",
    "tag": "Alçıpan Arası Akustik Ses Yalıtımı",
    "sub": "Oda bölme duvarlarında, alçıpan karkas aralarında komşu odadan gelen konuşma ve gürültüleri yutan ses yalıtım levhası.",
    "img": "assets/filli-official/expert-pw50-tasyunu-ara-bolme-levhasi.png",
    "sizes": [
      "5 cm (60 x 120 cm)"
    ],
    "coverage": "Paket Bazlı (9.6 m²)",
    "sheen": "Esnek Akustik Lif",
    "drying": "Mükemmel Ses Yutuculuk",
    "surface": "Alçıpan profil araları, asma tavan içi, şaft boşlukları"
  },
  "expert-yapistirma-harci": {
    "name": "Expert Mantolama Yapıştırma Harcı",
    "category": "sistem-harc",
    "tag": "Yüksek Tutunma / Çimento Esaslı",
    "sub": "EPS, Karbonlu EPS ve Taşyünü levhaların bina dış duvarlarına sarkma yapmadan güçlü yapışmasını sağlayan harç.",
    "img": "assets/filli-official/expert-yapistirma-harci.png",
    "sizes": [
      "25 kg Kraft Torba"
    ],
    "coverage": "4.5 – 5.5 kg/m²",
    "sheen": "Polimerli Gri Harç",
    "drying": "24 – 48 Saat (Dübel öncesi)",
    "surface": "Tuğla, beton, gazbeton, bims dış duvar yüzeyleri"
  },
  "expert-siva-harci": {
    "name": "Expert Mantolama Sıva Harcı (Donatılı)",
    "category": "sistem-harc",
    "tag": "Elyaf Takviyeli Çatlamaz Sıva",
    "sub": "Yalıtım levhalarının üzerine file ile birlikte çekilen, termal genleşme ve darbelere dayanıklı polimerli mantolama sıvası.",
    "img": "assets/filli-official/expert-siva-harci.png",
    "sizes": [
      "25 kg Kraft Torba"
    ],
    "coverage": "4.0 – 5.0 kg/m²",
    "sheen": "Elyaf Katkılı Gri Sıva",
    "drying": "24 – 48 Saat",
    "surface": "EPS ve taşyünü levha üzeri donatı filesi katmanı"
  },
  "expert-proakrilik-isi-yalitim-sistem-yapistiricisi": {
    "name": "Expert Proakrilik Sistem Yapıştırıcısı",
    "category": "sistem-harc",
    "tag": "Akrilik Katkılı Esnek Yapıştırıcı",
    "sub": "Zorlu yüzeylerde ve termal gerilimin yüksek olduğu güney cephelerde elastikiyeti artırılmış sistem yapıştırıcısı.",
    "img": "assets/filli-official/expert-proakrilik-isi-yalitim-sistem-yapistiricisi.png",
    "sizes": [
      "25 kg Kraft Torba"
    ],
    "coverage": "4.5 – 5.5 kg/m²",
    "sheen": "Yüksek Polimer Harç",
    "drying": "24 Saat",
    "surface": "Eski sıva, boyalı yüzeyler, taşyünü ve EPS montajı"
  },
  "expert-proakrilik-isi-yalitim-sistem-sivasi": {
    "name": "Expert Proakrilik Sistem Sıvası",
    "category": "sistem-harc",
    "tag": "Ekstra Elastik Çatlak Kalkanı",
    "sub": "Özellikle koyu renk boyanacak cephelerde yüksek güneş ısınması sonucu oluşabilecek sıva çatlaklarını önleyen esnek sıva.",
    "img": "assets/filli-official/expert-proakrilik-isi-yalitim-sistem-sivasi.png",
    "sizes": [
      "25 kg Kraft Torba"
    ],
    "coverage": "4.0 – 4.8 kg/m²",
    "sheen": "Elastik Sıva Zırhı",
    "drying": "24 Saat",
    "surface": "Fileli ısı yalıtım sıva katmanı"
  },
  "expert-proakrilik-sistem-kaplamasi": {
    "name": "Expert Proakrilik Hazır Sistem Kaplaması",
    "category": "sistem-harc",
    "tag": "Pastamsı Kullanıma Hazır Akrilik",
    "sub": "Su gerektirmeden kovadan çıktığı gibi uygulanan, elastik, suya tam dayanıklı hazır cephe tekstür kaplaması.",
    "img": "assets/filli-official/expert-proakrilik-sistem-kaplamasi.png",
    "sizes": [
      "25 kg Plastik Kova"
    ],
    "coverage": "2.5 – 3.0 kg/m²",
    "sheen": "Elastik Dokulu Kaplama",
    "drying": "24 Saat",
    "surface": "Isı yalıtım sistemleri üzeri son kat dekoratif kaplama"
  },
  "expert-prorganic-isi-yalitim-sistem-yapistiricisi": {
    "name": "Expert PROrganic Sistem Yapıştırıcısı",
    "category": "sistem-harc",
    "tag": "Organik Reçineli Özel Bağlayıcı",
    "sub": "Ahşap karkas, OSB ve metal yüzeylere yalıtım levhalarının çimentosuz organik reçineyle yapışmasını sağlayan yapıştırıcı.",
    "img": "assets/filli-official/expert-prorganic-isi-yalitim-sistem-yapistiricisi.png",
    "sizes": [
      "25 kg Kova"
    ],
    "coverage": "3.5 – 4.5 kg/m²",
    "sheen": "Organik Pasta",
    "drying": "24 Saat",
    "surface": "Prefabrik binalar, OSB, çelik konstrüksiyon yalıtımı"
  },
  "expert-prorganic-isi-yalitim-sistem-sivasi": {
    "name": "Expert PROrganic Sistem Sıvası",
    "category": "sistem-harc",
    "tag": "%100 Çimentosuz Organik Sıva",
    "sub": "Maksimum esneklik sunan, darbe testlerinde kırılmayan ve çatlamayan organik reçine esaslı hazır mantolama sıvası.",
    "img": "assets/filli-official/expert-prorganic-isi-yalitim-sistem-sivasi.png",
    "sizes": [
      "25 kg Kova"
    ],
    "coverage": "3.0 – 4.0 kg/m²",
    "sheen": "Yüksek Elastik Sıva",
    "drying": "24 Saat",
    "surface": "Darbe riski yüksek okul, hastane ve kamu cepheleri"
  },
  "expert-prorganic-isi-yalitim-sistem-kaplamasi": {
    "name": "Expert PROrganic Sistem Kaplaması",
    "category": "sistem-harc",
    "tag": "Nano Kir Tutmaz Organik Son Kat",
    "sub": "Yağmur suyuyla kendi kendini temizleyen, küf ve yosun oluşumunu engelleyen üst düzey organik dekoratif kaplama.",
    "img": "assets/filli-official/expert-prorganic-isi-yalitim-sistem-kaplamasi.png",
    "sizes": [
      "25 kg Kova"
    ],
    "coverage": "2.2 – 2.8 kg/m²",
    "sheen": "Kendi Kendini Temizleyen Doku",
    "drying": "24 Saat",
    "surface": "PROrganic mantolama sistem son katı"
  },
  "expert-dekoratif-mineral-kaplama-ince-tane": {
    "name": "Expert Dekoratif Mineral Kaplama (İnce Tane 1.5 mm)",
    "category": "sistem-harc",
    "tag": "1.5 mm İnce Dane Doğal Doku",
    "sub": "Bina cephesine homojen ince taneli mineral doku kazandıran, nefes alan, su buharı geçirgenliği yüksek son kat sıva.",
    "img": "assets/filli-official/expert-dekoratif-mineral-kaplama-ince-tane.png",
    "sizes": [
      "25 kg Kraft Torba"
    ],
    "coverage": "2.0 – 2.5 kg/m²",
    "sheen": "1.5 mm İnce Dane Mineral",
    "drying": "24 Saat (Boya öncesi)",
    "surface": "Mantolama sıvası üzeri dekoratif son kat"
  },
  "expert-dekoratif-mineral-kaplama-tane": {
    "name": "Expert Dekoratif Mineral Kaplama (Tane 2.0 mm)",
    "category": "sistem-harc",
    "tag": "2.0 mm Belirgin Mineral Tane",
    "sub": "Dış cepheye derinlik katan, sıva dalgalanmalarını gizleyen 2.0 mm dane boyutlu klasik mineral dekoratif sıva.",
    "img": "assets/filli-official/expert-dekoratif-mineral-kaplama-tane.png",
    "sizes": [
      "25 kg Kraft Torba"
    ],
    "coverage": "2.8 – 3.2 kg/m²",
    "sheen": "2.0 mm Tane Dokulu",
    "drying": "24 Saat",
    "surface": "Dış cephe ısı yalıtım sıvaları"
  },
  "expert-dekoratif-mineral-kaplama-cizgi": {
    "name": "Expert Dekoratif Mineral Kaplama (Çizgi Dokulu)",
    "category": "sistem-harc",
    "tag": "Ahşap / Çizgi Tekstür Deseni",
    "sub": "Mala hareketiyle yatay veya dikey rustik çizgi deseni oluşturan, mimari cephelere hareket katan dekoratif kaplama.",
    "img": "assets/filli-official/expert-dekoratif-mineral-kaplama-cizgi.png",
    "sizes": [
      "25 kg Kraft Torba"
    ],
    "coverage": "2.5 – 3.0 kg/m²",
    "sheen": "Rustik Çizgi Dokulu",
    "drying": "24 Saat",
    "surface": "Özel mimari cephe tasarımları, villa dış cepheleri"
  },
  "expert-kaplama-astari": {
    "name": "Expert Kaplama Astarı (Kuvars Kumlu)",
    "category": "sistem-harc",
    "tag": "Mineral Kaplama Öncesi Aderans",
    "sub": "Dekoratif sıvanın altındaki gri harcı beyazlatan, kuvars kumuyla malanın kaymasını engelleyen aderans astarı.",
    "img": "assets/filli-official/expert-kaplama-astari.png",
    "sizes": [
      "25 kg Kova"
    ],
    "coverage": "0.20 – 0.25 kg/m²",
    "sheen": "Kuvars Taneli Beyaz Astar",
    "drying": "6 – 8 Saat (Kaplama öncesi)",
    "surface": "Sıva harcı katmanı üzerine"
  },
  "expert-donati-filesi": {
    "name": "Expert Alkali Dayanımlı Donatı Filesi",
    "category": "sistem-harc",
    "tag": "160 g/m² / 4x4 mm / ETAG 004",
    "sub": "Çimentonun alkalisine karşı özel emprenye edilmiş, dış cephe sıvasının çatlamasını engelleyen yüksek çekme dirençli cam elyaf file.",
    "img": "assets/filli-official/expert-donati-filesi.png",
    "sizes": [
      "50 m² Rulo (160 g/m²)"
    ],
    "coverage": "55 m² (Bindirme payı dahil)",
    "sheen": "Alkali Dayanımlı Cam Elyaf",
    "drying": "Yırtılmaz Esnek Yapı",
    "surface": "Tüm mantolama sistem sıva katmanı"
  },
  "expert-dubeller": {
    "name": "Expert Mekanik Yalıtım Dübelleri",
    "category": "sistem-harc",
    "tag": "Geniş Başlıklı / Çelik & Plastik Çivili",
    "sub": "Rüzgar emme kuvvetine karşı mantolama levhalarını binanın taşıyıcı duvarına kilitleyen yüksek çekme mukavemetli dübel seti.",
    "img": "assets/filli-official/expert-dubeller.png",
    "sizes": [
      "Plastik Çivili (Koli: 500 Adet)",
      "Çelik Çivili (Taşyünü Tipi)"
    ],
    "coverage": "6 Adet / m²",
    "sheen": "Geniş Başlıklı Poliamid",
    "drying": "Mekanik Kilitleme",
    "surface": "Beton, tuğla, gazbeton ve bims duvarlar"
  },
  "expert-profiller": {
    "name": "Expert Fileli Köşe & Damlalık Profilleri",
    "category": "sistem-harc",
    "tag": "PVC Gövdeli / Fileli Köşe Koruma",
    "sub": "Bina köşelerinde, pencere sövelerinde ve balkon parapetlerinde sıvanın kırılmasını önleyen ve suyun içeri akmasını kesen damlalıklı profil.",
    "img": "assets/filli-official/expert-profiller.png",
    "sizes": [
      "Fileli Köşe Profili (2.5 m)",
      "Damlalıklı Profil (2.5 m)",
      "Subasman Profili (Alüminyum)"
    ],
    "coverage": "Metretül bazlı",
    "sheen": "PVC + Donatı Filesi",
    "drying": "Darbe & Çatlak Önleyici",
    "surface": "Bina köşe hatları, pencere kenarları, balkon altları"
  },
  "2026-yilin-renk-paketi-momento-silan": {
    "name": "2026 Yılın Renk Paketi: Momento Silan (Irmak 65)",
    "category": "ic-cephe",
    "tag": "2026 Özel Koleksiyon",
    "sub": "2026 Yılın Rengi Irmak 65 ve 'Gerçeğe Bağlan' renk paletini içeren özel hediye kutulu Momento Silan seti.",
    "img": "assets/filli-official/2026-yilin-renk-paketi-momento-silan.png",
    "sizes": [
      "2.5 L Özel Kutu",
      "7.5 L",
      "15 L"
    ],
    "coverage": "13 – 16 m²/L",
    "sheen": "İpeksi Mat Kadife",
    "drying": "1 – 2 Saat",
    "surface": "İç mekan duvarları, salon, yatak odası, çalışma alanları"
  },
  "2026-yilin-renk-paketi-momento-max": {
    "name": "2026 Yılın Renk Paketi: Momento Max",
    "category": "ic-cephe",
    "tag": "2026 Özel Koleksiyon / Silinebilir",
    "sub": "Momento Max'ın üstün yıkanabilir ipeksi mat dokusunu 2026 trend renkleriyle buluşturan özel kutu paketi.",
    "img": "assets/filli-official/2026-yilin-renk-paketi-momento-max.png",
    "sizes": [
      "2.5 L Özel Kutu",
      "7.5 L",
      "15 L"
    ],
    "coverage": "13 – 16 m²/L",
    "sheen": "Süper Silinebilir İpek Mat",
    "drying": "1 – 2 Saat",
    "surface": "Yoğun kullanılan iç mekanlar, salon, antre"
  },
  "momento-plastix": {
    "name": "Momento Plastix Mat İç Cephe Boyası",
    "category": "ic-cephe",
    "tag": "Ekstra Örtücülük / Pürüz Gizleyici",
    "sub": "Duvarlardaki sıva dalgalanmalarını mat dokusuyla gizleyen, sıçratma yapmayan, yüksek örtücülükte plastik boya.",
    "img": "assets/filli-official/momento-plastix.png",
    "sizes": [
      "2.5 L",
      "7.5 L",
      "15 L"
    ],
    "coverage": "12 – 14 m²/L",
    "sheen": "Mat",
    "drying": "2 – 3 Saat",
    "surface": "İç cephe kara sıva, alçı, alçıpan duvarlar"
  },
  "momento-plus": {
    "name": "Momento Plus Silikonlu Mat Boya",
    "category": "ic-cephe",
    "tag": "Silikon Katkılı / Silinebilir",
    "sub": "Silikon teknolojisiyle nemli bezle silinmeye uygun, nefes alan, mat dokulu iç cephe duvar boyası.",
    "img": "assets/filli-official/momento-plus.png",
    "sizes": [
      "2.5 L",
      "7.5 L",
      "15 L"
    ],
    "coverage": "13 – 15 m²/L",
    "sheen": "Silikonlu Mat",
    "drying": "2 – 3 Saat",
    "surface": "Salon, oturma odası, koridor ve antreler"
  },
  "momento-life-clean": {
    "name": "Momento Life Clean Leke Tutmayan Boya",
    "category": "ic-cephe",
    "tag": "Kolay Temizlenen Formül",
    "sub": "Çay, kahve, meyve suyu ve kurşun kalem lekelerini yüzeyden kolayca arındıran leke kalkanlı ipeksi mat boya.",
    "img": "assets/filli-official/momento-life-clean.png",
    "sizes": [
      "2.5 L",
      "7.5 L",
      "15 L"
    ],
    "coverage": "13 – 16 m²/L",
    "sheen": "İpeksi Mat Leke Tutmaz",
    "drying": "2 – 3 Saat",
    "surface": "Mutfak, yemek odası, çocuk odası ve koridorlar"
  },
  "momento-life-kids": {
    "name": "Momento Life Kids Çocuk Odası Boyası",
    "category": "ic-cephe",
    "tag": "Hipoalerjenik / Düşük VOC",
    "sub": "Hassas bünyeler ve bebekler için zararlı kimyasallardan arındırılmış, kokusuz, hava kalitesini koruyan güvenli boya.",
    "img": "assets/filli-official/momento-life-kids.png",
    "sizes": [
      "2.5 L",
      "7.5 L",
      "15 L"
    ],
    "coverage": "13 – 15 m²/L",
    "sheen": "İpeksi Mat Hipoalerjenik",
    "drying": "1 – 2 Saat",
    "surface": "Bebek ve çocuk odaları, kreşler, anaokulları"
  },
  "exxen-mat": {
    "name": "Exxen Mat İç Cephe Boyası",
    "category": "ic-cephe",
    "tag": "Yüksek Metraj / Pratik Uygulama",
    "sub": "Geniş alanlarda homojen yayılım gösteren, rulo izi bırakmayan ekonomik ve kaliteli iç cephe mat boyası.",
    "img": "assets/filli-official/exxen-mat.png",
    "sizes": [
      "2.5 L",
      "15 L"
    ],
    "coverage": "11 – 13 m²/L",
    "sheen": "Mat",
    "drying": "2 – 4 Saat",
    "surface": "Konut ve işyeri iç duvarları"
  },
  "aqusto-silan-grenli": {
    "name": "Aqusto Silan Grenli Dış Cephe Kaplaması",
    "category": "dis-cephe",
    "tag": "Silikonlu / Tekstürlü Sıva Örtücü",
    "sub": "Mercan ruloyla uygulanan, cephedeki sıva dalgalanmalarını örten, nano silikonlu su itici tekstür kaplama.",
    "img": "assets/filli-official/aqusto-silan-grenli.png",
    "sizes": [
      "25 kg Kova"
    ],
    "coverage": "0.9 – 1.3 kg/m²",
    "sheen": "Grenli Pürüzlü Mat",
    "drying": "12 – 24 Saat",
    "surface": "Apartman dış cepheleri, kaba sıvalar, mantolama son katı"
  },
  "aqusto-sil-grenli": {
    "name": "Aqusto Sil Grenli Fotokatalitik Kaplama",
    "category": "dis-cephe",
    "tag": "Kendi Kendini Temizleyen Gren",
    "sub": "Güneş ışığıyla kirleri parçalayan fotokatalitik teknolojiye sahip, gözenekli portakal kabuğu desenli dış kaplama.",
    "img": "assets/filli-official/aqusto-sil-grenli.png",
    "sizes": [
      "25 kg Kova"
    ],
    "coverage": "0.9 – 1.3 kg/m²",
    "sheen": "Fotokatalitik Grenli",
    "drying": "12 – 24 Saat",
    "surface": "Yoğun egzoz ve cadde kirliliğine maruz dış cepheler"
  },
  "aqusto-silan-moss-guard": {
    "name": "Aqusto Silan Moss Guard Küf Kalkanı",
    "category": "dis-cephe",
    "tag": "Yosun & Alg Önleyici Formül",
    "sub": "Deniz kenarı ve yoğun nemli bölgelerde cephede yeşillenme, yosun ve küf tutmayı kalıcı engelleyen dış cephe boyası.",
    "img": "assets/filli-official/aqusto-silan-moss-guard.png",
    "sizes": [
      "15 L Teneke"
    ],
    "coverage": "8 – 11 m²/L",
    "sheen": "Silikonlu Mat Koruyucu",
    "drying": "4 – 6 Saat",
    "surface": "Kuzey cepheler, sahil şeridi binaları, gölgeli duvarlar"
  },
  "aqusto-acryl": {
    "name": "Aqusto Acryl Saf Akrilik Dış Cephe Boyası",
    "category": "dis-cephe",
    "tag": "Saf Akrilik / Güneş Solmazlığı",
    "sub": "%100 saf akrilik bağlayıcı ile yoğun Ege güneşinde renkleri yıllarca solmayan üstün dış cephe boyası.",
    "img": "assets/filli-official/aqusto-acryl.png",
    "sizes": [
      "2.5 L",
      "15 L"
    ],
    "coverage": "9 – 11 m²/L",
    "sheen": "Mat Saf Akrilik",
    "drying": "3 – 5 Saat",
    "surface": "Canlı ve koyu renkli bina dış cepheleri"
  },
  "aqusto-acryl-silk": {
    "name": "Aqusto Acryl Silk İpek Mat Dış Cephe Boyası",
    "category": "dis-cephe",
    "tag": "İpeksi Parlaklık / Yağmur Akıtıcı",
    "sub": "İpeksi parlak dokusu sayesinde cepheden yağmur suyunun hızla süzülmesini sağlayan modern dış cephe boyası.",
    "img": "assets/filli-official/aqusto-acryl-silk.png",
    "sizes": [
      "2.5 L",
      "15 L"
    ],
    "coverage": "10 – 12 m²/L",
    "sheen": "İpek Mat Dış Cephe",
    "drying": "3 – 5 Saat",
    "surface": "Modern villalar, rezidanslar ve site cepheleri"
  },
  "nucleus-texture-plus": {
    "name": "Nucleus Texture Plus Dış Cephe Kaplaması",
    "category": "dis-cephe",
    "tag": "Karbon Takviyeli Yüksek Dayanım",
    "sub": "Karbon elyaf ve nano partikül takviyeli, çatlak köprüleme kabiliyeti çok yüksek ağır hizmet dış kaplama.",
    "img": "assets/filli-official/nucleus-texture-plus.png",
    "sizes": [
      "25 kg Kova"
    ],
    "coverage": "1.0 – 1.4 kg/m²",
    "sheen": "Tekstürlü Zırh Doku",
    "drying": "24 Saat",
    "surface": "Eski çatlaklı binalar, mantolama son kat sıvası"
  },
  "momento-life-exterior": {
    "name": "Momento Life Exterior Dış Cephe Boyası",
    "category": "dis-cephe",
    "tag": "Ekolojik / Düşük Karbon Ayak İzi",
    "sub": "Sürdürülebilir yeşil bina standartlarına uygun, çevreye duyarlı, yüksek nefes alma kabiliyetli dış boya.",
    "img": "assets/filli-official/momento-life-exterior.png",
    "sizes": [
      "15 L Teneke"
    ],
    "coverage": "8 – 11 m²/L",
    "sheen": "Mat Ekolojik",
    "drying": "4 Saat",
    "surface": "Yeşil bina ve LEED sertifikalı yapılar"
  },
  "betakril-astar": {
    "name": "Betakril Dış Cephe Astarı",
    "category": "dis-cephe",
    "tag": "Akrilik Dış Cephe Bağlayıcı",
    "sub": "Dış cephe sıvalarının tozumuş tabakasını sabitleyen, akrilik boyaların güçlü yapışmasını sağlayan astar.",
    "img": "assets/filli-official/betakril-astar.png",
    "sizes": [
      "2.5 L",
      "15 L"
    ],
    "coverage": "9 – 12 m²/L",
    "sheen": "Şeffaf Nüfuz Astarı",
    "drying": "3 – 5 Saat",
    "surface": "Mineral sıva, kireçli sıva, brüt beton dış cepheler"
  },
  "astarix": {
    "name": "Astarix Sentetik & Su Bazlı Geçiş Astarı",
    "category": "ic-cephe",
    "tag": "Üniversal Zemin Astarı",
    "sub": "Hem iç hem dış mekanlarda farklı boya tipleri arasında aderans köprüsü kuran evrensel beyaz örtücü astar.",
    "img": "assets/filli-official/astarix.png",
    "sizes": [
      "0.75 L",
      "2.5 L",
      "15 L"
    ],
    "coverage": "10 – 13 m²/L",
    "sheen": "Mat Beyaz Örtücü",
    "drying": "2 – 4 Saat",
    "surface": "İç/Dış duvarlar, ahşap, alçı ve eski boyalı yüzeyler"
  }
};

  var pillBtns = document.querySelectorAll("#paintMenuPills .pv-menu-pill");
  var menuRows = document.querySelectorAll("#paintMenuList .pv-menu-row");
  var capatectBridge = document.getElementById("capatectBridge");
  var renoBridge = document.getElementById("renoBridge");

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
    "ic-cephe": "İç Cephe & Tavan",
    "dis-cephe": "Dış Cephe & Koruma",
    "ahsap-metal": "Ahşap & Metal",
    "donusum": "Kendin Yap & Dönüşüm",
    "astar-hazirlik": "Astar & Hazırlık",
    "yalitim": "Capatect Yalıtım",
    "firca-rulo": "Fırça & Rulo",
    "yuzey-hazirlik": "Yüzey Hazırlık",
    "santiye-sarf": "Şantiye Sarf",
    "yapi-kimyasal": "Yapı Kimyasalları",
    "sanayi-epoksi": "Sanayi & Epoksi",
    "expert": "Expert Profesyonel",
    "donusum-efekt": "Dönüşüm & Efekt",
    "super-mobilya": "Süper Mobilya",
    "fine-ultra": "Fine & Ultra",
    "eps-levha": "EPS Isı Yalıtım",
    "tasyunu": "Taşyünü Yalıtım",
    "sistem-harc": "Sistem Harçları"
  };

  var currentProduct = null;
  var selectedSize = "";

  function calculateCoverageEstimate(sizeStr, coverageStr) {
    if (!sizeStr || !coverageStr) return null;
    var sizeMatch = sizeStr.match(/([\d\.]+)\s*(l|litre|kg|g|ml)/i);
    if (!sizeMatch) return null;
    var val = parseFloat(sizeMatch[1]);
    var unit = sizeMatch[2].toLowerCase();

    var isDoubleCoat = (coverageStr.indexOf("Çift kat") !== -1 || coverageStr.indexOf("çift kat") !== -1 || coverageStr.indexOf("İki kat") !== -1);
    var covMatch = coverageStr.match(/([\d\.]+)\s*[–\-—]\s*([\d\.]+)\s*(m²|m2)\s*\/\s*(l|litre|kg)/i);

    if (covMatch) {
      var minCov = parseFloat(covMatch[1]);
      var maxCov = parseFloat(covMatch[2]);
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

    var singleMatch = coverageStr.match(/([\d\.]+)\s*(m²|m2)\s*\/\s*(l|litre|kg)/i);
    if (singleMatch) {
      var covVal = parseFloat(singleMatch[1]);
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

    var kgPerM2Match = coverageStr.match(/([\d\.]+)\s*[–\-—]\s*([\d\.]+)\s*kg\s*\/\s*(m²|m2)/i);
    if (kgPerM2Match && unit === "kg") {
      var minKg = parseFloat(kgPerM2Match[1]);
      var maxKg = parseFloat(kgPerM2Match[2]);
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
    } else if (s.indexOf("7.5") !== -1 || s.indexOf("10") !== -1 || s.indexOf("5") !== -1) {
      scale = 0.93;
    } else if (s.indexOf("2.5") !== -1 || s.indexOf("1") !== -1 || s.indexOf("0.75") !== -1) {
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
    var isPaint = (currentProduct.category === "ic-cephe" || currentProduct.category === "dis-cephe" || currentProduct.category === "ahsap-metal" || currentProduct.category === "donusum" || currentProduct.category === "donusum-efekt" || (currentProduct.category === "expert" && currentProduct.id.indexOf("boya") !== -1));
    var est = calculateCoverageEstimate(selectedSize, currentProduct.coverage);
    var parts = [];
    if (selectedSize) {
      parts.push(selectedSize);
    }
    if (isPaint) {
      parts.push("RenXMatik™ Özel Renk Formülü");
    } else {
      parts.push("Orijinal Ambalaj");
    }
    modalSelectionSummary.textContent = parts.join(" · ");
  }

  // Category Filtering
  pillBtns.forEach(function(btn) {
    btn.addEventListener("click", function() {
      pillBtns.forEach(function(b) {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      if (typeof btn.scrollIntoView === "function") {
        btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }

      var filter = btn.getAttribute("data-filter");

      if (capatectBridge) {
        capatectBridge.style.display = (filter === "yalitim") ? "flex" : "none";
      }
      if (renoBridge) {
        renoBridge.style.display = (filter === "donusum") ? "flex" : "none";
      }

      menuRows.forEach(function(row) {
        var cat = row.getAttribute("data-category");
        if (cat === filter) {
          row.classList.remove("hidden");
        } else {
          row.classList.add("hidden");
        }
      });
    });
  });

  // Category Pill Counter Synchronization (System Control: Zero Stale Counts)
  pillBtns.forEach(function(btn) {
    var filter = btn.getAttribute("data-filter");
    var matchingRows = document.querySelectorAll("#paintMenuList .pv-menu-row[data-category='" + filter + "']");
    var badge = btn.querySelector(".pv-menu-pill-count");
    if (badge && matchingRows.length > 0) {
      badge.textContent = matchingRows.length;
    }
  });

  function updateWhatsAppUrl() {
    if (!currentProduct) return;
    var text = "Merhaba, Filli Boya " + currentProduct.name;
    var est = calculateCoverageEstimate(selectedSize, currentProduct.coverage);
    if (selectedSize) {
      text += " (" + selectedSize + (est ? " · " + est.summaryLabel : "") + ")";
    }
    var isPaint = (currentProduct.category === "ic-cephe" || currentProduct.category === "dis-cephe" || currentProduct.category === "ahsap-metal" || currentProduct.category === "donusum" || currentProduct.category === "donusum-efekt" || (currentProduct.category === "expert" && currentProduct.id.indexOf("boya") !== -1));
    if (isPaint) {
      text += " için RenXMatik renk hazırlığı ve şantiye teslimat bilgisi almak istiyorum.";
    } else {
      text += " için Balçova Yapı Market / Urla Ana Depo şantiye teslimat ve fiyat bilgisi almak istiyorum.";
    }
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

    // 1. Application Hardware & Tools (fırça, rulo, şantiye sarf)
    if (cat === "firca-rulo" || cat === "santiye-sarf") {
      rightEyebrow = "YAPI & DAYANIM";
      leftEyebrow = "UYUMLU KULLANIM";
      iconSvg = SPEC_ICONS.tool;
      dryingLabel = p.drying || "Kullanıma Hazır";
    }
    // 2. Boards, Insulation Fasteners & Mesh (EPS levha, taşyünü, file, dübel)
    else if (cat === "eps-levha" || cat === "tasyunu" || pid.indexOf("file") !== -1 || pid.indexOf("dubel") !== -1 || pid.indexOf("dalmacyali") !== -1) {
      rightEyebrow = "MATERYAL & MONTAJ";
      leftEyebrow = "KAPLAMA & SARFİYAT";
      iconSvg = SPEC_ICONS.layers;
      dryingLabel = p.drying || "Montaja Hazır";
    }
    // 3. Mortars, Plasters & Adhesives (sistem harçları, yapı kimyasalları, yalıtım harç/sıvaları)
    else if (cat === "sistem-harc" || cat === "yapi-kimyasal" || pid.indexOf("harc") !== -1 || pid.indexOf("siva") !== -1 || pid.indexOf("yapistir") !== -1) {
      rightEyebrow = "YAPI & KÜRLENME";
      leftEyebrow = "KAPLAMA & SARFİYAT";
      iconSvg = SPEC_ICONS.shield;
      dryingLabel = p.drying || "Priz / Kürlenme";
    }
    // 4. Primers & Surface Preparation (astar, macun, tiner)
    else if (cat === "astar-hazirlik" || cat === "yuzey-hazirlik" || pid.indexOf("astar") !== -1 || pid.indexOf("macun") !== -1 || pid.indexOf("tiner") !== -1) {
      rightEyebrow = "İŞLEV & BEKLEME";
      leftEyebrow = "UYGULAMA & SARFİYAT";
      iconSvg = SPEC_ICONS.timer;
      dryingLabel = p.drying || "Bekleme Süresi";
    }
    // 5. Industrial & Heavy Duty Epoxy
    else if (cat === "sanayi-epoksi") {
      rightEyebrow = "DİRENÇ & TRAFİK";
      leftEyebrow = "KAPLAMA ALANI";
      iconSvg = SPEC_ICONS.shield;
      dryingLabel = p.drying || "Kürlenme Süresi";
    }
    // 6. Architectural & Decorative Paints (Default)
    else {
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
    var elEyebrow = modalEyebrow || document.getElementById("modalProductEyebrow") || document.querySelector(".pv-atelier-eyebrow");
    if (elEyebrow) {
      elEyebrow.textContent = (categoryDisplayNames && categoryDisplayNames[p.category]) ? categoryDisplayNames[p.category] : "Filli Boya";
    }
    modalImg.src = p.img;
    modalImg.alt = p.name;
    modalTag.textContent = p.tag || "";
    modalTitle.textContent = p.name;
    modalSub.textContent = p.sub;

    // Atmospheric Chroma Glow Sync
    if (modalChromaGlow) {
      var glowColor = (p.category === "donusum" || p.category === "donusum-efekt") ? "rgba(59, 130, 246, 0.24)" :
                      (p.category === "ahsap-metal") ? "rgba(217, 119, 6, 0.24)" :
                      (p.category === "dis-cephe" || p.category === "yalitim") ? "rgba(180, 83, 9, 0.24)" :
                      "rgba(64, 94, 102, 0.26)";
      modalChromaGlow.style.background = "radial-gradient(circle at 50% 50%, " + glowColor + " 0%, rgba(255, 255, 255, 0) 72%)";
    }

    // Fill Specs & Gauges with Category-Aware Spec Adapter
    if (modalCoverage) modalCoverage.textContent = p.coverage;
    if (modalSheen) modalSheen.textContent = p.sheen;
    if (modalDrying) modalDrying.textContent = p.drying;
    if (modalSurface) modalSurface.textContent = p.surface;
    updateCategorySpecCartridges(p, productId);

    // Dynamic Size Section Title
    var modalSelectTitle = document.getElementById("modalSelectTitle");
    if (modalSelectTitle) {
      if (p.category === "firca-rulo" || p.category === "santiye-sarf") {
        modalSelectTitle.textContent = "Ölçü & Ebat Seçimi";
      } else if (p.category === "eps-levha" || p.category === "tasyunu") {
        modalSelectTitle.textContent = "Kalınlık & Paket Seçimi";
      } else if (p.category === "sistem-harc" || p.category === "yapi-kimyasal") {
        var pid = (productId || p.id || "").toLowerCase();
        if (pid.indexOf("profil") !== -1) modalSelectTitle.textContent = "Profil Tipi & Uzunluk";
        else if (pid.indexOf("dubel") !== -1) modalSelectTitle.textContent = "Ölçü & Paket Seçimi";
        else if (pid.indexOf("file") !== -1) modalSelectTitle.textContent = "Rulo Ebat Seçimi";
        else modalSelectTitle.textContent = "Ambalaj & Torba Seçimi";
      } else {
        modalSelectTitle.textContent = "Ambalaj Hacmi";
      }
    }

    // Build Size Options with Adaptive Segmented Track
    modalSizesWrap.innerHTML = "";
    selectedSize = (p.sizes && p.sizes.length > 0) ? p.sizes[0] : "";
    if (p.sizes && p.sizes.length > 0) {
      var maxLen = 0;
      p.sizes.forEach(function(s) {
        if (s.length > maxLen) maxLen = s.length;
      });
      var count = p.sizes.length;

      modalSizesWrap.className = "pv-segmented-track";
      var isCompact = (count <= 3 && maxLen <= 8) || (count === 4 && maxLen <= 6) || (count === 5 && maxLen <= 5);
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

    // Contextual RenXMatik / Depot Service Guarantee Note
    var isPaint = (p.category === "ic-cephe" || p.category === "dis-cephe" || p.category === "ahsap-metal" || p.category === "donusum" || p.category === "donusum-efekt" || (p.category === "expert" && p.id.indexOf("boya") !== -1));
    if (modalServiceNote) {
      if (isPaint) {
        if (modalServiceTitle) modalServiceTitle.textContent = "RenXMatik™ Sınırsız Renk Hazırlığı";
        if (modalServiceDesc) modalServiceDesc.innerHTML = "<strong>RenXMatik™ Canlı Renk Üretimi:</strong> Balçova Yapı Market ve Urla Ana Depomuzda dilediğiniz Filli Boya, RAL veya NCS renk koduna göre anında hazırlanır.";
      } else {
        if (modalServiceTitle) modalServiceTitle.textContent = "Orijinal Üretim & Şantiye Sevk";
        if (modalServiceDesc) modalServiceDesc.innerHTML = "<strong>Orijinal Ambalaj & Şantiye Sevk:</strong> Balçova ve Urla depolarımızdan doğrudan şantiye adresinize aynı gün sevk edilir.";
      }
    }

    updateCanScale(selectedSize);
    updateAreaCoverage(selectedSize, p);
    updateSelectionSummary();
    updateWhatsAppUrl();

    // Show Modal
    resetSheetStyles();
    backdrop.classList.add("open");
    backdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // URL sync (Pervan Catalog)
    if (window.history && window.history.replaceState) {
      var url = new URL(window.location.href);
      url.searchParams.set("item", productId);
      window.history.replaceState(null, "", url.toString());
    }
  }

  window.openProductModalWithColor = openModal;

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
    backdrop.classList.remove("open");
    backdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    resetSheetStyles();

    // URL sync (Pervan Catalog)
    if (window.history && window.history.replaceState) {
      var url = new URL(window.location.href);
      url.searchParams.delete("item");
      window.history.replaceState(null, "", url.toString());
    }
  }

  // PERVAN KINETIC DRAG-TO-DISMISS BOTTOM SHEET ENGINE
  var dragStartY = 0;
  var dragCurrentY = 0;
  var dragStartTime = 0;
  var isSheetDragging = false;
  var canDragFromScroll = false;

  function onDragStart(e) {
    if (!backdrop.classList.contains("open")) return;
    if (e.target.closest("button, a, input, select, textarea, .pv-size-pill")) return;

    var touch = e.touches ? e.touches[0] : e;
    dragStartY = touch.clientY;
    dragCurrentY = touch.clientY;
    dragStartTime = Date.now();
    isSheetDragging = false;
    canDragFromScroll = (modalScrollArea && modalScrollArea.scrollTop <= 0);
  }

  function onDragMove(e) {
    if (!backdrop.classList.contains("open") || !dragStartY) return;

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

  // Row click bindings
  menuRows.forEach(function(row) {
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

  // Share button (Pervan Catalog)
  if (modalShareBtn) {
    modalShareBtn.addEventListener("click", function() {
      if (!currentProduct) return;
      var shareUrl = window.location.origin + window.location.pathname + "?item=" + currentProduct.id + "#pvProductCatalog";
      var shareData = {
        title: "Filli Boya " + currentProduct.name + " | Pervan Yapı Market",
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
            modalShareText.textContent = "Ürün Bağlantısını Paylaş";
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
    if (e.key === "Escape" && backdrop.classList.contains("open")) {
      closeModal();
    }
  });

  // Deep link check on load & popstate (Pervan Catalog)
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

    // Supplies Menu Pill Filter Logic
  var suppliesPills = document.querySelectorAll("#suppliesMenuPills .pv-menu-pill");
  var suppliesRows = document.querySelectorAll("#suppliesMenuList .pv-menu-row");
  suppliesPills.forEach(function(btn) {
    btn.addEventListener("click", function() {
      suppliesPills.forEach(function(b) {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      if (typeof btn.scrollIntoView === "function") {
        btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
      var filter = btn.getAttribute("data-filter");
      suppliesRows.forEach(function(row) {
        var cat = row.getAttribute("data-category");
        if (cat === filter) {
          row.classList.remove("hidden");
        } else {
          row.classList.add("hidden");
        }
      });
    });
  });

  suppliesRows.forEach(function(row) {
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

    // Pro Menu Pill Filter Logic
  var proPills = document.querySelectorAll("#proMenuPills .pv-menu-pill");
  var proRows = document.querySelectorAll("#proMenuList .pv-menu-row");
  proPills.forEach(function(btn) {
    btn.addEventListener("click", function() {
      proPills.forEach(function(b) {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      if (typeof btn.scrollIntoView === "function") {
        btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
      var filter = btn.getAttribute("data-filter");
      proRows.forEach(function(row) {
        var cat = row.getAttribute("data-category");
        if (cat === filter) {
          row.classList.remove("hidden");
        } else {
          row.classList.add("hidden");
        }
      });
    });
  });

  proRows.forEach(function(row) {
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

    // Transformation Menu Pill Filter Logic
  var transPills = document.querySelectorAll("#transformationMenuPills .pv-menu-pill");
  var transRows = document.querySelectorAll("#transformationMenuList .pv-menu-row");
  transPills.forEach(function(btn) {
    btn.addEventListener("click", function() {
      transPills.forEach(function(b) {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      if (typeof btn.scrollIntoView === "function") {
        btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
      var filter = btn.getAttribute("data-filter");
      transRows.forEach(function(row) {
        var cat = row.getAttribute("data-category");
        if (cat === filter) {
          row.classList.remove("hidden");
        } else {
          row.classList.add("hidden");
        }
      });
    });
  });

  transRows.forEach(function(row) {
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

    // Insulation Menu Pill Filter Logic
  var insulPills = document.querySelectorAll("#insulationMenuPills .pv-menu-pill");
  var insulRows = document.querySelectorAll("#insulationMenuList .pv-menu-row");
  insulPills.forEach(function(btn) {
    btn.addEventListener("click", function() {
      insulPills.forEach(function(b) {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      if (typeof btn.scrollIntoView === "function") {
        btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
      var filter = btn.getAttribute("data-filter");
      insulRows.forEach(function(row) {
        var cat = row.getAttribute("data-category");
        if (cat === filter) {
          row.classList.remove("hidden");
        } else {
          row.classList.add("hidden");
        }
      });
    });
  });

  insulRows.forEach(function(row) {
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

  // ==========================================================================
  // GLOBAL SPOTLIGHT COMMAND PALETTE ENGINE (⌘K / 259 Ürün Arama)
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
    if (["ic-cephe", "dis-cephe", "tavan", "ahsap-metal", "astar", "2026-paket"].indexOf(cat) !== -1) return "01 Boya";
    if (["firca-rulo", "hazirlik-astar", "santiye-sarf"].indexOf(cat) !== -1) return "02 Malzeme";
    if (["su-yalitim", "sanayi-epoksi", "expert-santiye"].indexOf(cat) !== -1) return "03 Pro Seri";
    if (["aqua-reno", "ahsap-metalmaxx", "super-mobilya", "vernik-cila"].indexOf(cat) !== -1) return "04 Dönüşüm";
    if (["eps-levha", "tasyunu", "harc-siva"].indexOf(cat) !== -1) return "05 Yalıtım";
    return "Filli Boya";
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
        '<span>İpucu: Momento Silan, Sutut UV, Dalmaçyalı EPS, WoodMaXX veya ambalaj boyutuna (15 L) göre anında arayabilirsiniz.</span>' +
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
      var waText = encodeURIComponent("Merhaba, Filli Boya kataloğunuzda '" + rawQuery + "' aradım ancak bulamadım. Bu ürün veya dengi hakkında Balçova Yapı Market / Urla Ana Depo stok ve teslimat bilgisi alabilir miyim?");
      spotlightResults.innerHTML = '<div class="pv-spotlight-empty-box">' +
        '<div class="pv-spotlight-empty-title">Eşleşen ürün bulunamadı</div>' +
        '<p class="pv-spotlight-empty-desc">Aradığınız ürün standart katalog dışı olabilir veya özel şantiye çözümü gerektirebilir. Balçova ve Urla renk laboratuvarımıza doğrudan danışabilirsiniz:</p>' +
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

/* IN-PLACE ARCHITECTURAL SUB-NAV TAB CONTROLLER (Zero Scroll, Instant Panel Switch) */
(function() {
  var subnav = document.getElementById("pvSubnav");
  var spacer = document.getElementById("pvSubnavSpacer");
  var header = document.querySelector("header");
  var subnavLinks = document.querySelectorAll("#pvSubnavLinks .pv-subnav-link");
  if (!subnav || !subnavLinks.length) return;

  var panels = {
    "pvProductCatalog": document.getElementById("pvProductCatalog"),
    "pvSuppliesSection": document.getElementById("pvSuppliesSection"),
    "pvProSection": document.getElementById("pvProSection"),
    "pvTransformation": document.getElementById("pvTransformation"),
    "pvInsulationSection": document.getElementById("pvInsulationSection")
  };

  var DEPARTMENTS_DATA = [
    { id: "pvProductCatalog", short: "Boya Menüsü", full: "Boya Menüsü", pillsId: "paintMenuPills" },
    { id: "pvSuppliesSection", short: "Boya Malzemeleri", full: "Boya Malzemeleri", pillsId: "suppliesMenuPills" },
    { id: "pvProSection", short: "Profesyonel Seri", full: "Profesyonel Seri", pillsId: "proMenuPills" },
    { id: "pvTransformation", short: "Dönüşüm (Reno)", full: "Dönüşüm (Reno)", pillsId: "transformationMenuPills" },
    { id: "pvInsulationSection", short: "Capatect Yalıtım", full: "Capatect Yalıtım", pillsId: "insulationMenuPills" }
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
    if (window.pvSetLastActiveTab) {
      window.pvSetLastActiveTab(targetId);
    }

    // 1. Update tab buttons
    subnavLinks.forEach(function(link) {
      var isTarget = (link.getAttribute("data-target") === targetId);
      link.classList.toggle("active", isTarget);
      link.setAttribute("aria-selected", isTarget ? "true" : "false");
      if (isTarget && typeof link.scrollIntoView === "function") {
        link.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    });

    // 2. Switch panels instantly in place (ZERO SCROLL)
    for (var key in panels) {
      if (panels[key]) {
        panels[key].style.display = (key === targetId) ? "block" : "none";
      }
    }

    // 3. Update mobile compact bar & drawer
    var currentDept = DEPARTMENTS_DATA.find(function(d) { return d.id === targetId; }) || DEPARTMENTS_DATA[0];
    var deptBadge = document.getElementById("pvDeptBadge");
    if (deptBadge) deptBadge.textContent = currentDept.num;
    if (deptTriggerLabel) {
      deptTriggerLabel.textContent = currentDept.short.replace(/^\d+\s*/, "");
    }
    renderDeptDrawer(targetId);
    syncMobileFilterRail(targetId);
  }

  // Initial state setup for mobile bar
  var initialDept = DEPARTMENTS_DATA[0];
  var initialBadge = document.getElementById("pvDeptBadge");
  if (initialBadge) initialBadge.textContent = initialDept.num;
  if (deptTriggerLabel) deptTriggerLabel.textContent = initialDept.short.replace(/^\d+\s*/, "");
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

  // Sticky subnav header clearance sync
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

    // As long as we are scrolled to or past the subnav area (boya menüsü or other tabs):
    if (scrollPos >= pinThreshold) {
      if (!subnav.classList.contains("is-pinned")) {
        subnav.classList.add("is-pinned");
        if (spacer) {
          spacer.style.height = (subnav.offsetHeight || 52) + "px";
          spacer.classList.add("is-active");
        }
      }

      if (!headerVisible) {
        // Scrolling DOWN -> Header hidden -> Pin at very top of screen (0px)
        subnav.classList.add("header-hidden");
        subnav.style.top = "0px";
      } else {
        // Scrolling UP -> Header revealed -> Pin directly under header
        subnav.classList.remove("header-hidden");
        subnav.style.top = hHeight + "px";
        document.documentElement.style.setProperty("--header-actual-height", hHeight + "px");
      }
    } else {
      // Scrolled all the way back up into hero -> unpin and return to natural flow
      if (subnav.classList.contains("is-pinned")) {
        subnav.classList.remove("is-pinned");
        subnav.classList.remove("header-hidden");
        subnav.style.top = "";
        if (spacer) spacer.classList.remove("is-active");
      }
    }
  }

  // MutationObserver on header so class changes (header--hidden added/removed by pervan.js)
  // trigger instantaneous, synchronized repositioning of subnav without waiting for scroll events
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
