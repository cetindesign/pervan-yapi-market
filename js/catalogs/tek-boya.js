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

    var activeHex = slides[index].getAttribute("data-code") || '#D97706';

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

/* 2. CANONICAL PERVAN HUB CATALOG ENGINE */
(function() {
  var TEK_PRODUCTS_DATA = [
  {
    "id": "102-aqualife-su-bazli-ahsap-koruyucu",
    "name": "TEK Aqualife Su Bazlı Ahşap Koruyucu (102)",
    "badge": "Ahşap & Marin Grubu",
    "tag": "Ahşap Koruyucu & Teak",
    "deptId": "tekWoodVernikPanel",
    "category": "ahsap-koruyucu",
    "thumb": "assets/tekboya-official/102-aqualife-su-bazli-ahsap-koruyucu.webp",
    "desc": "Su bazlı saf akrilik reçine esaslı ipek parlak iç ve dış cephe için üretilmiş dekoratif ve koruma amaçlı özel bir ahşap koruyucudur. UV direnci yüksek, mükemmel yapışma ve su itme özelliği ile atmosferik hava koşull...",
    "meta": [
      "Kod: 102",
      "Ambalaj: 15 L / 2,5 L / 0,75 L",
      "1 kg: 380 ₺ · 2.5 L: 700 ₺"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "15 L",
      "2,5 L",
      "0,75 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 102",
      "packaging": "15 L, 2,5 L, 0,75 L",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Su bazlı · İpek mat · Kullanıma hazır · Alkid uyumlu · Yanıcı değildir · Çevre dostu · Esnek. UV korumalı · Hızlı kuruma · Nefes alma · Düşük VOC · Zamandan kazanç · Kolay uygulama · Yağıştan etkilenmez · Solvent bazlı ürün üzerine uygulama imkanı verir · Yüksek su buharı geçirgenliği ve · Kokusuz · Yüksek su ve alkali dayanımlı · Erken yağmur direnci · Sıcak, soğuk ve nemden etkilenmez · Canlı ve kalıcı renk İç ve dış mekanlar için uygun"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Eski boyalı ahşap yüzeylerde boya ve boya kalıntıları tamamen temizlenmeli ve ahşap üzerinde lekeli kısımlar var ise zımparalanmalıdır. Daha sonra temiz ve lif bırakmayan bez ile üzerindeki tozlar silinip, boya işlemine geçilmelidir. Yeni boyanacak yüzeylerde ise, ahşabın budaklı kısımları, pürüzlü yüzeyleri ve lekeli alanları zımpara ile temizlenmeli, üzerindeki toz alınmalı ve ahşabın tamamen kuru olduğundan emin olduktan sonra uygulamaya başlanmalıdır. Ürün kullanıma hazırdır. En az iki kat uygulama yapılması önerilir."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak, güneş ışığına maruz bırakmadan ve dondan koruyarak (+5 ile 35 °C) en az 2 yıl depolanabilir. Büyük ambalajlar üst üste en fazla 5 adet, küçük ambalajlar üst üste en fazla 8 adet halinde depolanmalı ve am Kod: 102. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "401-su-bazli-panel-kapi-boyasi",
    "name": "TEK Su Bazlı Panel Kapı Boyası (401)",
    "badge": "Ahşap & Marin Grubu",
    "tag": "Panel Kapı Boyası",
    "deptId": "tekWoodVernikPanel",
    "category": "panel-kapi",
    "thumb": "assets/tekboya-official/401-su-bazli-panel-kapi-boyasi.webp",
    "desc": "Amerikan panel ve pervaz kapılar için geliştirilmiş son kat panel kapı boyasıdır. Su bazlı, akrilik reçine esaslı, yüksek örtme gücü, kalıcı ve canlı renkleri, esnek yapısı ile çatlama, kabarma yapmayan, yüksek su b...",
    "meta": [
      "Kod: 401",
      "Ambalaj: 2,5 L / 0,75 L",
      "0.75 L: 270 ₺ · 2.5 L: 600 ₺"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "2,5 L",
      "0,75 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 401",
      "packaging": "2,5 L, 0,75 L",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Kir ve leke tutmaz Su bazlı · Yarı parlak · Yüksek su buharı geçirgenliği · Düşük su emme · Silinebilir · Düşük VOC ile çevreci"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Fabrika çıkışlı astarlanmış Amerikan panel kapı yüzeyi nemli bir bezle temizlendikten sonra uygulama yapılmalıdır. Eski boyalı yüzeylerde, uygulanacak yüzeyler düzgün, sağlam, kuru ve tozdan arındırılmış durumda olmalıdır. Eski yüzeylerde, yüzeyde boya performansını artırmak amacıyla zımparalama işlemi yapılmalıdır. Doldurulması gereken çukur ve çatlakların tamiratları yapıldıktan sonra astar olarak %10-15 inceltilmiş tek panel kapı boyası uygulanabilir. Son kat boya uygulaması 2 kat yapılmalı ve katlar arası 4 - 6 saat beklenmelidir."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak güneş ışığına maruz bırakmadan ve dondan koruyarak (+5 ile 35°C ortamda) en az 2 yıl depolanabilir. Oda sıcaklığında ve kapalı mekanlarda saklanmalı, aşırı sıcak ve dondan korunmalıdır. Kod: 401. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "402-vernikli-ahsap-koruyucu",
    "name": "TEK Vernikli Ahşap Koruyucu (402)",
    "badge": "Ahşap & Marin Grubu",
    "tag": "Marin Yat Vernik & Cila",
    "deptId": "tekWoodVernikPanel",
    "category": "yat-vernik",
    "thumb": "assets/tekboya-official/402-vernikli-ahsap-koruyucu.webp",
    "desc": "Solvent bazlı uzun yağ alkid reçine esaslı dekoratif parlak görünümlü ahşap koruyucudur. Solvent bazlı, modifiye alkid reçine esaslı mükemmel yapışma özelliği ile ahşabı atmosferik hava koşullarından koruyan yarı pa...",
    "meta": [
      "Kod: 402",
      "Ambalaj: 12,5 L / 2,5 L / 0,75 L",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "12,5 L",
      "2,5 L",
      "0,75 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 402",
      "packaging": "12,5 L, 2,5 L, 0,75 L",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Sentetik Tiner",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Solvent bazlı · Kurşun içermez · Kalıcı parlaklık UV ışınlarına dayanıklı · Canlı ve kalıcı renkler · Atmosferik koşullara dayanıklı · Ahşabın doğal dokusunu korur desenini bozmaz"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Kullanmadan önce iyice karıştırınız. Uygulama zemininde var ise yağ, toz ve eski kabarmış boya kalıntıları veya ağaç budakları iyice temizlenmelidir. Çok kayıcı yüzeylerde ise yapışmayı arttırmak için hafif zımparalanmalı, yüzeydeki tozlar temizlenmeli, yüzeyin temiz ve kuru olduğundan emin olunduktan sonra boyama işlemine geçilmelidir. Fırça, rulo veya lif ve hav bırakmayan bez ile uygulanabilir."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak, güneş ışığına maruz bırakmadan ve dondan koruyarak (+5 ile 35 °C) en az 2 yıl depolanabilir. Büyük ambalajlar üst üste en fazla 5 adet depolanmalı ve ambalajlar taşıma kulpundan tutarak taşınmalıdır. Oda Kod: 402. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "403-ozel-yat-vernik",
    "name": "TEK Özel Yat Vernik (403)",
    "badge": "Ahşap & Marin Grubu",
    "tag": "Marin Yat Vernik & Cila",
    "deptId": "tekWoodVernikPanel",
    "category": "yat-vernik",
    "thumb": "assets/tekboya-official/403-ozel-yat-vernik.webp",
    "desc": "Üretan alkid esaslı, solvent bazlı uzun yağ verniğidir. (Sınıf 1) Yüksek doldurucu özelliği, deniz, güneş, yağmur gibi yıpratıcı atmosferik ve fiziksel etkilere (kaynar su, darbe, elastikiyet, baskı) karşı dayanıklı...",
    "meta": [
      "Kod: 403",
      "Ambalaj: 12,5 L / 2,5 L / 0,75 L",
      "1 kg: 250 ₺ · Galon: 950 ₺"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "12,5 L",
      "2,5 L",
      "0,75 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 403",
      "packaging": "12,5 L, 2,5 L, 0,75 L",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Sentetik Tiner",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Solvent bazlı · Doldurma gücü yüksek · Canlı ve kalıcı parlaklık · Kurşun içermez"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulamadan önce iyice karıştırınız. İnceltmeden kullanıma hazırdır. Uygulama yüzeyi tamamen kuru ve temiz olmalı varsa eski vernik veya boya kalıntıları tamamen kazınarak, zımparalanarak, ahşap budakları yakılarak temizlenmelidir. Temizlenen yüzey ahşap koruyucu ile doyurulduktan sonra 1’ er gün arayla 2 kat halinde fırça rulo ya da toz bırakmayan bez yardımıyla uygulanmalıdır. Uygulama Sıcaklığı: +5 C° Kuruma Süresi: 25 °C’ de; dokunma kuruması 2-3 saat, tam kuruması 10-18 saat, fiziksel ve kimyasal mukavemeti 48 saattir."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak, güneş ışığına maruz bırakmadan ve dondan koruyarak (+5 ile 35 °C) en az 2 yıl depolanabilir. Büyük ambalajlar üst üste en fazla 5 adet, halinde depolanmalı ve ambalajlar taşıma kulpundan tutarak taşınmal Kod: 403. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "404-ozel-cam-cila",
    "name": "TEK Özel Cam Cila (404)",
    "badge": "Ahşap & Marin Grubu",
    "tag": "Marin Yat Vernik & Cila",
    "deptId": "tekWoodVernikPanel",
    "category": "yat-vernik",
    "thumb": "assets/tekboya-official/404-ozel-cam-cila.webp",
    "desc": "Üretan alkid esaslı, solvent bazlı uzun yağ verniğidir. Yüksek doldurucu özelliği, deniz, güneş, yağmur gibi yıpratıcı atmosferik ve fiziksel etkilere (kaynar su, darbe, elastikiyet, baskı) karşı dayanaklıdır ve sar...",
    "meta": [
      "Kod: 404",
      "Ambalaj: 12,5 L / 2,5 L / 0,75 L",
      "1 kg: 450 ₺ · Galon: 1.250 ₺"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "12,5 L",
      "2,5 L",
      "0,75 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 404",
      "packaging": "12,5 L, 2,5 L, 0,75 L",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Sentetik Tiner",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Solvent bazlı · Doldurma gücü yüksek · Canlı ve kalıcı parlaklık · Kurşun içermez"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulamadan önce iyice karıştırınız, inceltmeden kullanıma hazırdır. Uygulama yüzeyi tamamen kuru ve temiz olmalı varsa eski vernik veya boya kalıntıları tamamen kazınarak, zımparalanarak, ahşap budakları yakılarak temizlenmelidir. Temizlenen yüzey ahşap koruyucu ile doyurulduktan sonra 1’er gün arayla 2 kat halinde fırça rulo ya da toz bırakmayan bez yardımıyla uygulanmalıdır. Uygulama Sıcaklığı: +5 C° Kuruma Süresi: 25 °C de; dokunma kuruması 2-3 saat, tam kuruması 10-18 saat, fiziksel ve kimyasal mukavemeti 48 saattir."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak, güneş ışığına maruz bırakmadan ve dondan koruyarak (+5 ile 35 °C) en az 2 yıl depolanabilir. Büyük ambalajlar üst üste en fazla 5 adet, halinde depolanmalı ve ambalajlar taşıma kulpundan tutarak taşınmal Kod: 404. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "405-solvent-bazli-panel-kapi-boyasi",
    "name": "TEK Solvent Bazlı Panel Kapı Boyası (405)",
    "badge": "Ahşap & Marin Grubu",
    "tag": "Panel Kapı Boyası",
    "deptId": "tekWoodVernikPanel",
    "category": "panel-kapi",
    "thumb": "assets/tekboya-official/405-solvent-bazli-panel-kapi-boyasi.webp",
    "desc": "Sararmaya karsı dirençlidir Kurşunsuzdur Yüksek örtücülüğe sahiptir Uygulaması kolaydır Fiziksel ve kimyasal etkilere karşı dirençlidir Yarımat boyadır Silinebilir - Yıkanabilir Renk seçenekleri",
    "meta": [
      "Kod: 405",
      "Ambalaj: 15 L / 2,5 L / 0,75 L",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "15 L",
      "2,5 L",
      "0,75 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 405",
      "packaging": "15 L, 2,5 L, 0,75 L",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Sentetik Tiner",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Sararmaya karsı dirençlidir · Kurşunsuzdur · Yüksek örtücülüğe sahiptir · Uygulaması kolaydır · Fiziksel ve kimyasal etkilere karşı dirençlidir · Yarımat boyadır · Silinebilir - · Yıkanabilir"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Sabit renkler"
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak +5°C ile +35°C arasında kuru ve serin ortamda dondan korunarak depolanmalıdır. Kod: 405. TS EN ve ISO kalite belgelerine haizdir."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "406-tik-yagi-teak-oil",
    "name": "TEK Tik Yağı (Teak Oil) (406)",
    "badge": "Ahşap & Marin Grubu",
    "tag": "Ahşap Koruyucu & Teak",
    "deptId": "tekWoodVernikPanel",
    "category": "ahsap-koruyucu",
    "thumb": "assets/tekboya-official/406-tik-yagi-teak-oil.webp",
    "desc": "Tek teak oil ( Tik Yağı ) özel olarak seçilen doğal yağların karışımı ile oluşan tik ve benzeri sert ahşapların korunması ve bakımı için geliştirilmiş , diğer ahşap türlerine de uygulanabilen özel bir ahşap bakım ya...",
    "meta": [
      "Kod: 406",
      "Ambalaj: 15 L / 2,5 L / 0,75 L",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "15 L",
      "2,5 L",
      "0,75 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 406",
      "packaging": "15 L, 2,5 L, 0,75 L",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Sentetik Tiner",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Tek teak oil ( · Tik · Teak"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Tek Tik yağı uygulanacak yüzeyler ; yağ lekelerinden , talaş tozlarından ,eski boya ve vernik kalıntılarından tümüyle temizlenmelidir. Bünyesinde yüksek miktarda yağ bulunduran tik ve benzeri ahşaplara uygulama yapılmadan önce yüzeyin yağdan temizlenmesi için yüzey uygun bir tiner ile temizlenmelidir. Tek Tik yağı kullanıma hazırdır. Uygulamadan önce iyice karıştırılmalıdır ve inceltme yapılmamalıdır. Uygulama yapılacak yüzeyler kir, yağ , reçine ve tozdan arındırılmalıdır. Ahşaptaki gözenek ve damarları yönünde eşit bir şekilde bol miktarda uygulanmalıdır ve ahşap yağ ile doyurulmalıdır. Yaklaşık 30 dk sonra ahşabın üzerinde kalan fazla yağ temiz bir bez yardımı ile silinmelidir."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak +5°C ile +35°C arasında kuru ve serin ortamda dondan korunarak depolanmalıdır. Kod: 406. TS EN ve ISO kalite belgelerine haizdir."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "701-endustriyel-astar",
    "name": "TEK Endüstriyel Astar (701)",
    "badge": "Endüstriyel Ağır Hizmet",
    "tag": "Endüstriyel Astar",
    "deptId": "tekIndustrialSpecialPanel",
    "category": "epoksi-zemin",
    "thumb": "assets/tekboya-official/701-endustriyel-astar.webp",
    "desc": "Kısa yağlı alkid reçine esaslı, hava kurumalı yarı parlak endüstriyel astar boyadır. Endüstriyel kullanım amaçlı ekipmanın korozyondan korunması ve dekore edilmesi maksadıyla kullanılan, metal yüzeylere çok iyi yapı...",
    "meta": [
      "Kod: 701",
      "Ambalaj: 12 L",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "12 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 701",
      "packaging": "12 L",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Yüksek örtme ve kaplama gücü · Yarı parlak · Hızlı kuruma UV ışığına dayanıklı · Uzun ömürlü · Antikorozif"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama aparatları tabanca, rulo, daldırma. Uygulama yüzeyinde var ise kir yağ, gress, hadde kabukları, kabarmış boya kalıntıları kirliliğin derecesine bağlı olarak tel, sert tel fırça, raspa veya kumlama yöntemi ile temizlenmelidir. Temizlenmiş metal üzerinde kesinlikle nem olmadığından emin olunduktan sonra boyama işlemine geçilmelidir. Katlar arası bekleme süresi 6 saattir. Uygulama zeminin sıcaklığı + 5 °C den yüksek olmalıdır."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak, güneş ışığına maruz bırakmadan ve dondan koruyarak ( +5 ile 35 °C ) en az 2 yıl depolanabilir. Büyük ambalajlar üst üste en fazla 5 adet halinde depolanmalıdır. Ambalajları taşıma kulpundan tutarak taşıy Kod: 701. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "702-endustriyel-son-kat-boya",
    "name": "TEK Endüstriyel Son Kat Boya (702)",
    "badge": "Endüstriyel Ağır Hizmet",
    "tag": "Endüstriyel Son Kat",
    "deptId": "tekIndustrialSpecialPanel",
    "category": "epoksi-zemin",
    "thumb": "assets/tekboya-official/702-endustriyel-son-kat-boya.webp",
    "desc": "Kısa yağlı alkid reçine esaslı hava kurumalı son kat parlak endüstriyel son kat boyadır. Endüstriyel kullanım amaçlı ekipmanın korozyondan korunması ve dekore edilmesi maksadıyla kullanılan metal yüzeylere çok iyi y...",
    "meta": [
      "Kod: 702",
      "Ambalaj: 17 L",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "17 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 702",
      "packaging": "17 L",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Yüksek örtme ve kaplama gücü · Parlak · Hızlı kuruma UV ışığına dayanıklı · Uzun ömürlü · Esnek"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Metal yüzeyde var ise her türlü yağ, kir, pastan temizlenmelidir. Temizleme işlemi için kumlama işlemi yapılması tavsiye edilir, ancak kumlama yapılamadığı hallerde tel fırça kullanılması gerekmektedir. Boyama işlemine geçmeden önce homojen olana dek boya karıştırılmalıdır ve temizliği yapılmış kuru yüzeye direkt olarak uygulanmalıdır. İdeal sonucu alabilmek için iki kat halinde uygulanmalıdır. Tabanca, fırça, daldırma yöntemi kullanılır."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak, güneş ışığına maruz bırakmadan ve dondan koruyarak ( +5 ile 35 °C ) en az 2 yıl depolanabilir. Büyük ambalajlar üst üste en fazla 5 adet halinde depolanmalıdır. Ambalajları taşıma kulpundan tutarak taşıy Kod: 702. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "601-aluminyum-yaldiz-boya",
    "name": "TEK Alüminyum Yaldız Boya (601)",
    "badge": "Isıya Dayanıklı & Yaldız",
    "tag": "Metalik Yaldız",
    "deptId": "tekIndustrialSpecialPanel",
    "category": "yaldiz-ozel",
    "thumb": "assets/tekboya-official/601-aluminyum-yaldiz-boya.webp",
    "desc": "Tek bileşenli , hidrokarbon reçine esaslı metalik pasta içeren genel amaçlı bir son kat boyasıdır. Her türlü madeni eşya , LPG tüpleri ,egzoz boruları vb yerlerde kullanılır. Sanayi ve harici çelik yapıların korunma...",
    "meta": [
      "Kod: 601",
      "Ambalaj: 15 L / 2,5 L / 0,75 L",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "15 L",
      "2,5 L",
      "0,75 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 601",
      "packaging": "15 L, 2,5 L, 0,75 L",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Yüksek örtme ve kaplama gücü · Metalik parlaklık · Hızlı kuruma · Işık yansıtma özelliği UV ışığına dayanıklı · Uzun ömürlü"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Metal yüzeyde var ise her türlü kir , yağ ve pastan temizlenmelidir. Temizleme işlemi için kurulama işlemi yapılması tavsiye edilir ancak kumlama yapılamadığı hallerde tel fırça kullanılması gerekmektedir. Boyama işlemine geçmeden önce homojen olana dek boya karıştırılmalıdır ve temizliği yapılmış kuru yüzeye astar uygulaması yapılmadan direkt olarak uygulanır. İdeal sonucu alabilmek için 2 kat halinde uygulanmalıdır. Uygulama Sıcaklığı : Ortam sıcaklığı 5 ile 35 derece arasında olmalıdır. Metalin sıcaklığı ortam sıcaklığından en az 4 derece yüksek olmalıdır. Uygulama Şekli : Tabanca , fırça ,daldırma yöntemi ile uygulanabilir."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Kapağı açılmamış ambalajlarda oda sıcaklığında en az 2 yıl depolanabilir. Aşırı sıcaktan korunmalıdır. Ambalajlar taşıma sapından tutarak taşınmalı ve ambalaja düzgün bir şekilde yerleştirilmelidir. Uyarı Kelimesi : Tehlike Zararlılık İfadeleri : H22 Kod: 601. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "602-bakir-yaldiz-boya",
    "name": "TEK Bakır Yaldız Boya (602)",
    "badge": "Isıya Dayanıklı & Yaldız",
    "tag": "Metalik Yaldız",
    "deptId": "tekIndustrialSpecialPanel",
    "category": "yaldiz-ozel",
    "thumb": "assets/tekboya-official/602-bakir-yaldiz-boya.webp",
    "desc": "Tek bileşenli , hidrokarbon reçine esaslı metalik pasta içeren genel amaçlı bir son kat boyasıdır. Her türlü madeni eşya , LPG tüpleri ,egzoz boruları vb yerlerde kullanılır. Sanayi ve harici çelik yapıların korunma...",
    "meta": [
      "Kod: 602",
      "Ambalaj: 15 L / 2,5 L / 0,75 L",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "15 L",
      "2,5 L",
      "0,75 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 602",
      "packaging": "15 L, 2,5 L, 0,75 L",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Yüksek örtme ve kaplama gücü · Metalik parlaklık · Hızlı kuruma · Işık yansıtma özelliği UV ışığına dayanıklı · Uzun ömürlü"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Metal yüzeyde var ise her türlü kir , yağ ve pastan temizlenmelidir. Temizleme işlemi için kurulama işlemi yapılması tavsiye edilir ancak kumlama yapılamadığı hallerde tel fırça kullanılması gerekmektedir. Boyama işlemine geçmeden önce homojen olana dek boya karıştırılmalıdır ve temizliği yapılmış kuru yüzeye astar uygulaması yapılmadan direkt olarak uygulanır. İdeal sonucu alabilmek için 2 kat halinde uygulanmalıdır. Uygulama Sıcaklığı : Ortam sıcaklığı 5 ile 35 derece arasında olmalıdır. Metalin sıcaklığı otam sıcaklığından en az 4 derece yüksek olmalıdır. Uygulama Şekli : Tabanca , fırça ,daldırma yöntemi ile uygulanabilir."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Kapağı açılmamış ambalajlarda oda sıcaklığında en az 2 yıl depolanabilir. Aşırı sıcaktan korunmalıdır. Ambalajlar taşıma sapından tutarak taşınmalı ve ambalaja düzgün bir şekilde yerleştirilmelidir. Uyarı Kelimesi: Tehlike. Zararlılık İfadeleri : H22 Kod: 602. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "603-bronz-yaldiz-boya",
    "name": "TEK Bronz Yaldız Boya (603)",
    "badge": "Isıya Dayanıklı & Yaldız",
    "tag": "Metalik Yaldız",
    "deptId": "tekIndustrialSpecialPanel",
    "category": "yaldiz-ozel",
    "thumb": "assets/tekboya-official/603-bronz-yaldiz-boya.webp",
    "desc": "Tek bileşenli , hidrokarbon reçine esaslı metalik pasta içeren genel amaçlı bir son kat boyasıdır. Her türlü madeni eşya , LPG tüpleri ,egzoz boruları vb yerlerde kullanılır. Sanayi ve harici çelik yapıların korunma...",
    "meta": [
      "Kod: 603",
      "Ambalaj: 15 L / 2,5 L / 0,75 L",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "15 L",
      "2,5 L",
      "0,75 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 603",
      "packaging": "15 L, 2,5 L, 0,75 L",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Yüksek örtme ve kaplama gücü · Metalik parlaklık · Hızlı kuruma · Işık yansıtma özelliği UV ışığına dayanıklı · Uzun ömürlü"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Metal yüzeyde var ise her türlü kir , yağ ve pastan temizlenmelidir. Temizleme işlemi için kurulama işlemi yapılması tavsiye edilir ancak kumlama yapılamadığı hallerde tel fırça kullanılması gerekmektedir. Boyama işlemine geçmeden önce homojen olana dek boya karıştırılmalıdır ve temizliği yapılmış kuru yüzeye astar uygulaması yapılmadan direkt olarak uygulanır. İdeal sonucu alabilmek için 2 kat halinde uygulanmalıdır. Uygulama Sıcaklığı : Ortam sıcaklığı 5 ile 35 derece arasında olmalıdır. Metalin sıcaklığı ortam sıcaklığından en az 4 derece yüksek olmalıdır. Uygulama Şekli : Tabanca , fırça ,daldırma yöntemi ile uygulanabilir."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Kapağı açılmamış ambalajlarda oda sıcaklığında en az 2 yıl depolanabilir. Aşırı sıcaktan korunmalıdır. Ambalajlar taşıma sapından tutarak taşınmalı ve ambalaja düzgün bir şekilde yerleştirilmelidir. Uyarı Kelimesi : Tehlike. Zararlılık İfadeleri : H2 Kod: 603. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "604-altin-yaldiz-boya",
    "name": "TEK Altın Yaldız Boya (604)",
    "badge": "Isıya Dayanıklı & Yaldız",
    "tag": "Metalik Yaldız",
    "deptId": "tekIndustrialSpecialPanel",
    "category": "yaldiz-ozel",
    "thumb": "assets/tekboya-official/604-altin-yaldiz-boya.webp",
    "desc": "Tek bileşenli , hidrokarbon reçine esaslı metalik pasta içeren genel amaçlı bir son kat boyasıdır. Her türlü madeni eşya , LPG tüpleri ,egzoz boruları vb yerlerde kullanılır. Sanayi ve harici çelik yapıların korunma...",
    "meta": [
      "Kod: 604",
      "Ambalaj: 15 L / 2,5 L / 0,75 L",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "15 L",
      "2,5 L",
      "0,75 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 604",
      "packaging": "15 L, 2,5 L, 0,75 L",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Yüksek örtme ve kaplama gücü · Metalik parlaklık · Hızlı kuruma · Işık yansıtma özelliği UV ışığına dayanıklı · Uzun ömürlü"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Metal yüzeyde v r ise her türlü kir , yağ ve pastan temizlenmelidir. Temizleme işlemi için kurulama işlemi yapılması tavsiye edilir ancak kumlama yapılamadığı hallerde tel fırça kullanılması gerekmektedir. Boyama işlemine geçmeden önce homojen olana dek boya karıştırılmalıdır ve temizliği yapılmış kuru yüzeye astar uygulaması yapılmadan direkt olarak uygulanır. İdeal sonucu alabilmek için 2 kat halinde uygulanmalıdır. Uygulama Sıcaklığı : Ortam sıcaklığı 5 ile 35 derece arasında olmalıdır. Metalin sıcaklığı ortam sıcaklığından en az 4 derece yüksek olmalıdır. Uygulama Şekli : Tabanca , fırça ,daldırma yöntemi ile uygulanabilir."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Kapağı açılmamış ambalajlarda oda sıcaklığında en az 2 yıl depolanabilir. Aşırı sıcaktan korunmalıdır. Ambalajlar taşıma sapından tutarak taşınmalı ve ambalaja düzgün bir şekilde yerleştirilmelidir. Uyarı Kelimesi : Tehlike. Zararlılık İfadeleri : H2 Kod: 604. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "304-astar-boya",
    "name": "TEK Astar Boya (304)",
    "badge": "Astar & Yüzey Hazırlığı",
    "tag": "Yüzey Astarı & Macun",
    "deptId": "tekPrimersPanel",
    "category": "macun",
    "thumb": "assets/tekboya-official/304-astar-boya.webp",
    "desc": "Yağ reçinesi esaslı solvent bazlı, sentetik bir astar boyadır. Fırça izi ve akma yapmaz, örtme gücü yüksek mükemmel yapışan esnek, darbe direnci ve kimyasallara karşı mukavemeti yüksektir. Son kat boya sarfiyatını a...",
    "meta": [
      "Kod: 304",
      "Ambalaj: 12,5 L / 2,5 L / 0,75 L",
      "1 kg: 200 ₺ · 3.5 kg: 450 ₺"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "12,5 L",
      "2,5 L",
      "0,75 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 304",
      "packaging": "12,5 L, 2,5 L, 0,75 L",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Sentetik Tiner",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Solvent bazlı · Kurşun içermez · Atmosferik koşullara dayanıklı · Mükemmel yapışma · Yüksek örtme gücü · Koruyucu mat yüzey"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yüzeyinde pas, toz, kir ve eski kabarmış boya kalıntıları varsa yüzeyden zımpara, raspa, kumlama, tel fırça gibi yöntemlerinden biri ile uzaklaştırılmalıdır. Yüzeydeki tozlar temiz tiner ile alınmalı ve zemin tamamen kuru ve temiz olmalıdır. Daha sonra hemen (temizlenen metaller uzun süreli bekletilmemelidir) Tek Astar uygulamasına geçilmelidir. Ahşap yüzeyde var ise budaklar yakılıp, kabarmış eski boya kalıntıları zımparalanmalıdır. Ve tercihen Tek Ahşap Koruyucu ile yüzey doyurulduktan sonra Tek Sentetik Astar uygulaması yapılmalıdır. Sıva yüzeylerde; yüzey tamiratı sentetik macun ile yapılıp macun kuruduktan sonra yüzey ince zımpara ile düzeltilmeli, yüzeyin tozu alınmalı ve gerekli kuruluk ve temizlik sağlandıktan sonra Tek Sentetik Astar ile astarlanmalıdır."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Kapağı açılmamış şekilde orijinal ambalajında en az 2 yıl saklanabilir. Direkt güneş ışığından, yüksek sıcak, aşırı soğuk ve parlayıcı, yanıcı ortamlardan uzak tutulmalıdır. (+5 ile 35 °C). Kod: 304. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "309-joker-astar",
    "name": "TEK Joker Astar (309)",
    "badge": "Astar & Yüzey Hazırlığı",
    "tag": "Yüzey Astarı & Macun",
    "deptId": "tekPrimersPanel",
    "category": "macun",
    "thumb": "assets/tekboya-official/309-joker-astar.webp",
    "desc": "Alkid reçine esaslı, yüzeye mükemmel yapışan, mat görünümlü sentetik astar boyadır. Alüminyum, çinko, ahşap, sıva, sunta, sert pvc, seramik ve cam gibi yüzeyleri hazırlar. Demir ve çelik yüzeyler için korozyon önley...",
    "meta": [
      "Kod: 309",
      "Ambalaj: 2,5 L / 0,75 L",
      "1 kg: 200 ₺ · 3.5 kg: 450 ₺"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "2,5 L",
      "0,75 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 309",
      "packaging": "2,5 L, 0,75 L",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Sentetik Tiner",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Kurşun · İçermez • · Korozyon önleyici • · Mükemmel yapışır • · Sağlam ve dayanıklı bir zemin oluşturur. • · Fırça izi ve akma yapmaz • · Düzgün zemin oluşturur • · Kolay uygulanabilir"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Yüzey Hazırlığı ve Uygulama Şekli: Ahşap yüzeylerde ahşapların budakları temizlenmeli,eskimiş ve kabarmış boyalar zımparalanmalı ve temizlenmelidir. Ham ahşap yüzeylere Tek Joker Astar dan önce Tek Ahşap Koruyucu ile astarlanmalıdır. Demir çelik ve metal yüzeyler her türlü kir, yağ ve pastan temizlenmelidir. Her türlü kendini taşıyamayan kabarmış boyalar temizlenmelidir. Çinko galvanizli yüzeyler, alüminyum, sert pvc yüzeylerde zımpara yapılması gerekir. Diğer zeminlerde yüzeyin durumuna bağlı olarak zımpara yapılır. Dış cepheler için 2 kat uygulama tavsiye edilir. Uygulamada Dikkat Edilecek Hususlar: Önerilen Uygulama Araçları: Fırça, rulo veya pistole ile uygulanır. İnceltme Oranı: % 5 oranında sentetik tiner. Uygulama Sıcaklığı: +5 °C +30 °C. Uygulama yüzeyinin sıcaklığı 5 °C’nin altında olmamalıdır. Önerilen Kat Sayısı: 2 kat olarak uygulanır."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak +5°C ile +35°C arasında kuru ve serin ortamda dondan korunarak depolanmalıdır. Kod: 309. TS EN ve ISO kalite belgelerine haizdir."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "501-anti-leke-astar",
    "name": "TEK Anti-leke Astar (501)",
    "badge": "Astar & Yüzey Hazırlığı",
    "tag": "Yüzey Astarı & Macun",
    "deptId": "tekPrimersPanel",
    "category": "macun",
    "thumb": "assets/tekboya-official/501-anti-leke-astar.webp",
    "desc": "Solvent bazlı alkid reçine esaslı, hava kurumalı, opak, leke örtücü mat bir boyadır. Duvar ve tavanlarda oluşan kurum, is, baca akıntıları ile kirli yüzeylerin boyanmasında son kat boya sarfiyatını azaltan yüksek ör...",
    "meta": [
      "Kod: 501",
      "Ambalaj: 4 kg / 1 kg / 0,5 kg",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "4 kg",
      "1 kg",
      "0,5 kg",
      "0,25 kg"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 501",
      "packaging": "4 kg, 1 kg, 0,5 kg, 0,25 kg",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Sentetik Tiner",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Leke örtücü · Solvent bazlı · Kurşun içermez · Hızlı kuruma · Mükemmel yapışma · Yüksek örtme gücü · Mat yüzey"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yüzeyinde var ise, kabarmış boya kalıntıları tamamen temizlendikten sonra zemin hataları da giderildikten sonra yüzeyin tamamen kuru ve tozsuz olduğundan emin olunmalı, daha sonra fırça veya rulo yardımıyla 2-3 saat ara ile en az 2 kat uygulanması önerilir. Kirli fırça veya rulo temizliği için endüstriyel tiner (rapit tiner) kullanınız. Uygulama Sıcaklığı: Ortam ve yüzey sıcaklığı + 5 ile 30 °C arasında olmalıdır."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Kapağı açılmamış şekilde orijinal ambalajında en az 2 yıl saklanabilir. Direkt güneş ışığından, yüksek sıcak, aşırı soğuk ve parlayıcı, yanıcı ortamlardan uzak tutulmalıdır. (+5 ile 35°C) Kod: 501. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "301-yari-mat-saten-boya",
    "name": "TEK Yarı Mat Saten Boya (301)",
    "badge": "Sentetik Alkid Grubu",
    "tag": "Sentetik Yağlı Boya",
    "deptId": "tekSyntheticPanel",
    "category": "sentetik-yagli",
    "thumb": "assets/tekboya-official/301-yari-mat-saten-boya.webp",
    "desc": "Solvent bazlı sentetik reçine esaslı yarı mat, hava kurumalı son kat boyadır. Kurşun içermeyen alkid reçine esaslı olup çabuk kuruyan, yüksek örtme gücü ile zamandan kazanç sağlayan, fırça ve rulo izi bırakmayan, ya...",
    "meta": [
      "Kod: 301",
      "Ambalaj: 15 L / 3,75 L / 0,75 L",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "15 L",
      "3,75 L",
      "0,75 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 301",
      "packaging": "15 L, 3,75 L, 0,75 L",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Sentetik Tiner",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Satensi parlaklık · Kalıcı ve canlı renkler · Yüksek kapatma gücü · Neme ve rutubete dayanıklı · Solvent bazlı · Kurşun içermez"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Kullanmadan önce iyice karıştırınız. Sentetik tiner ile % 5-10 oranında inceltilerek fırça veya rulo ile uygulanır. Boyanacak yüzeyde var ise yağ, kir ve eski kabarmış boyalar tamamen temizlenir, uygulama yüzeyinde nem olmadığından emin olduktan sonra metal yüzeylerde Tek Antipas Boya ile boyandıktan 12 saat sonra Yarı Mat Saten Boya ile boyanır. Duvar yüzeylerde Tek Sentetik Astar ile astarlanıp 1 gün sonra zımpara ile zımparalanır, zemin üzerindeki toz temizlendikten sonra Yarı Mat Saten Boya uygulaması yapılır."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Kapağı açılmamış orijinal Kapağı açılmamış şekilde orijinal ambalajında en az 2 yıl saklanabilir. Direkt güneş ışığından, yüksek sıcak ve aşırı soğuk ortamlardan uzak tutulmalıdır. en az 2 yıldır. Direk güneş ışığından uzak tutunuz. Yüksek sıcak ve a Kod: 301. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "302-super-luks-sentetik-yagli-boya",
    "name": "TEK Süper Lüks Sentetik Yağlı Boya (302)",
    "badge": "Sentetik Alkid Grubu",
    "tag": "Sentetik Yağlı Boya",
    "deptId": "tekSyntheticPanel",
    "category": "sentetik-yagli",
    "thumb": "assets/tekboya-official/302-super-luks-sentetik-yagli-boya.webp",
    "desc": "Solvent bazlı sentetik reçine esaslı parlak, hava kurumalı son kat boyadır. Kurşun içermeyen alkid reçine esaslı olup, fırça ve rulo izi bırakmayan, iyi yayılan, çabuk kuruyan, yüksek kapatma gücü ile iç ve dış orta...",
    "meta": [
      "Kod: 302",
      "Ambalaj: 15 L / 3,75 L / 2,5 L",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "15 L",
      "3,75 L",
      "2,5 L",
      "0,75 L",
      "0,375 L",
      "0,175 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 302",
      "packaging": "15 L, 3,75 L, 2,5 L, 0,75 L, 0,375 L, 0,175 L",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Sentetik Tiner",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Yüksek ve kalıcı parlaklık · Kalıcı ve canlı renkler · Çizilmez ve darbelere dayanıklı · Yüksek kapatma gücü · Solvent bazlı · Kurşun içermez"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Fırça ve rulo uygulamasında % 5-10, pistole uygulamasında % 10-15 oranında Sentetik Tiner ile inceltilir. +5 °C’nin altında uygulama yapılmamalıdır. Uygulama yüzeyinde var ise her tür yağ, kir, kabarmış eski boya kalıntıları temizlenir ardından yüzeyde nem olmadığından emin olduktan sonra; ahşap yüzeyler Tek Ahşap Koruyucu ile 2 kat boyanır. Tek Sentetik Astar takibinden sonra 12 saat arayla 2 kat halinde Tek Sentetik Son Kat Boya uygulanır."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Kapağı açılmamış şekilde orijinal ambalajında en az 2 yıl saklanabilir. Direkt güneş ışığından, yüksek sıcak ve aşırı soğuk ortamlardan uzak tutulmalıdır. Kod: 302. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "303-antipas-boya",
    "name": "TEK Antipas (303)",
    "badge": "Sentetik Alkid Grubu",
    "tag": "Antipas Pas Önleyici",
    "deptId": "tekSyntheticPanel",
    "category": "antipas",
    "thumb": "assets/tekboya-official/303-antipas-boya.webp",
    "desc": "Yağ reçinesi esaslı solvent bazlı, pas önleyici antikorozif sentetik bir astardır. Kurşun içermeyen alkid reçine esaslı antikorozif olup iç ve dış metal yüzeyler için pas önleyici ve son kat boya öncesi zemini ve so...",
    "meta": [
      "Kod: 303",
      "Ambalaj: 12,5 L / 2,5 L / 0,75 L",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "12,5 L",
      "2,5 L",
      "0,75 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 303",
      "packaging": "12,5 L, 2,5 L, 0,75 L",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Sentetik Tiner",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Solvent bazlı · Kurşun içermez · Atmosferik koşullara dayanıklı · Mükemmel yapışma · Yüksek örtme gücü · Metal koruyucu mat yüzey"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yüzeyinde pas, toz, kir ve eski kabarmış boya kalıntıları varsa yüzeyden zımpara, raspa, kumlama, tel fırça gibi yöntemlerinden biri ile uzaklaştırılmalıdır. Yüzeydeki tozlar temiz tiner ile alınmalı ve zemin tamamen kuru ve temiz olmalıdır. Daha sonra hemen (temizlenen metaller uzun süreli bekletilmemelidir) Tek Antipas uygulamasına geçilmelidir. En az iki kat uygulama yapılması önerilir."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Kapağı açılmamış şekilde orijinal ambalajında en az 2 yıl saklanabilir. Direkt güneş ışığından, yüksek sıcak, aşırı soğuk ve parlayıcı, yanıcı ortamlardan uzak tutulmalıdır. (+5 ile 35 °C). Kod: 303. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "305-super-luks-sentetik-mat-boya",
    "name": "TEK Süper Lüks Sentetik Mat Boya (305)",
    "badge": "Sentetik Alkid Grubu",
    "tag": "Sentetik Yağlı Boya",
    "deptId": "tekSyntheticPanel",
    "category": "sentetik-yagli",
    "thumb": "assets/tekboya-official/305-super-luks-sentetik-mat-boya.webp",
    "desc": "Solvent bazlı, sentetik reçine esaslı, hava kurumalı mat son kat boyadır. Kurşun içermeyen alkid reçine esaslı olup çabuk kuruyan, yüksek örtme gücü ile zamandan kazanç sağlayan, fırça ve rulo izi bırakmayan, mat do...",
    "meta": [
      "Kod: 305",
      "Ambalaj: 15 L / 2,5 L / 0,75 L",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "15 L",
      "2,5 L",
      "0,75 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 305",
      "packaging": "15 L, 2,5 L, 0,75 L",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Sentetik Tiner",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Mat görünüm · Kalıcı ve canlı renkler · Yüksek kapatma gücü · Solvent bazlı · Kurşun içermez"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Fırça veya rulo ile uygulanır. Fırça uygulamasında % 5, rulo uygulamasında % 10 oranında sentetik tiner ile inceltilir. Uygulama Sıcaklığı: Ortam ve yüzey sıcaklığı + 5 ile 30 °C arasında olmalıdır. Uygulama yüzeyinin sıcaklığı + 5 °C altında olmamalıdır. Kuruma Süresi: 25 °C de; dokunma kuruması 1-2 saat, toz tutması 2-3 saat, tam kuruması 15 saattir. Kaplama Gücü: Kaplama gücü uygulama yüzeyine ve renklere bağlı olarak 1 L boya tek kat ( 25 ± 5 mic) 10 - 14 m² 1 kg boya tek kat ( 25 ± 5 mic) 6 - 10 m² alan kaplar."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Kapağı açılmamış şekilde orijinal ambalajında en az 2 yıl saklanabilir. Direkt güneş ışığından, yüksek sıcak, aşırı soğuk ve parlayıcı, yanıcı ortamlardan uzak tutulmalıdır. (+5 ile 35 °C). Kod: 305. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "306-zirve-sentetik-boya",
    "name": "TEK Zirve Sentetik Boya (306)",
    "badge": "Sentetik Alkid Grubu",
    "tag": "Sentetik Yağlı Boya",
    "deptId": "tekSyntheticPanel",
    "category": "sentetik-yagli",
    "thumb": "assets/tekboya-official/306-zirve-sentetik-boya.webp",
    "desc": "Solvent bazlı sentetik reçine esaslı parlak hava kurumalı son kat boyadır. Kurşun içermeyen alkid reçine esaslı olup, fırça ve rulo izi bırakmayan, iyi yayılan, çabuk kuruyan, yüksek kapatma gücü ile iç ve dış ortam...",
    "meta": [
      "Kod: 306",
      "Ambalaj: 12 L / 2 L / 0,7 L",
      "1 kg: 250 ₺ · Galon: 850 ₺"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "12 L",
      "2 L",
      "0,7 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 306",
      "packaging": "12 L, 2 L, 0,7 L",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Sentetik Tiner",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Solvent bazlı · Kurşun içermez · Atmosferik koşullara dayanıklı · Mükemmel yapışma · Yüksek örtme gücü · Kalıcı parlaklık"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yüzeyi metal ise, her türlü yağ, kir ve pas temizlendikten sonra Tek Sentetik Antipas ile eski ahşap yüzeyler de kabarmış eski boyalar yüzeyden zımpara ile temizlenmelidir. Ahşap yüzeylerde var ise budaklar yakılıp temizlenir seviye farkı var ise düzeltilmelidir. Yeni ahşap yüzeylerde Tek Ahşap Koruyucu ile yüzey astarlanmalı, eski ahşap yüzeyler ise Tek Astar Boya ile astarlandıktan sonra boya işlemine geçilmelidir. Katlar arası beklenme süresi 24 saattir (1 gün). İki kat önerilir."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Kapağı açılmamış şekilde orijinal ambalajında en az 2 yıl saklanabilir. Direkt güneş ışığından, yüksek sıcak, aşırı soğuk ve parlayıcı, yanıcı ortamlardan uzak tutulmalıdır. (+5 ile 35 °C). Kod: 306. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "307-zirve-antipas-boya",
    "name": "TEK Zirve Antipas (307)",
    "badge": "Sentetik Alkid Grubu",
    "tag": "Antipas Pas Önleyici",
    "deptId": "tekSyntheticPanel",
    "category": "antipas",
    "thumb": "assets/tekboya-official/307-zirve-antipas-boya.webp",
    "desc": "Yağ reçinesi esaslı solvent bazlı, pas önleyici antikorozif sentetik bir astardır. Kurşun içermeyen metal yüzeyleri korozyona karşı koruyan alkid reçine esaslı antikorozif olup, iç ve dış metal yüzeyler için pas önl...",
    "meta": [
      "Kod: 307",
      "Ambalaj: 10 L / 1,7 L / 0,7 L",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "10 L",
      "1,7 L",
      "0,7 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 307",
      "packaging": "10 L, 1,7 L, 0,7 L",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Sentetik Tiner",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Solvent bazlı · Kurşun içermez · Atmosferik koşullara dayanıklı · Mükemmel yapışma · Yüksek örtme gücü · Mat yüzey"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yüzeyinde bulunan pas, toz, kir, eski kabarmış boya kalıntıları yüzeyden zımpara, raspa, kumlama, tel fırça gibi yöntemlerden biri ile uzaklaştırılmalı ve yüzeydeki tozlar alınmalı ve zeminin tamamen kuru ve temiz olduğundan emin olunduktan sonra hemen (temizlenen metaller uzun süreli bekletilmemelidir) Zirve Antipas uygulamasına geçilmelidir. Fırça veya rulo ile 2-3 saat ara ile en az 2 kat uygulanması önerilir."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak, güneş ışığına maruz bırakmadan ve dondan koruyarak (+5 ile 30 °C) en az 2 yıl depolanabilir. Kod: 307. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "308-trio-max-power-son-kat",
    "name": "TEK Trio-Max Power Son Kat (308)",
    "badge": "Sentetik Alkid Grubu",
    "tag": "Sentetik Yağlı Boya",
    "deptId": "tekSyntheticPanel",
    "category": "sentetik-yagli",
    "thumb": "assets/tekboya-official/308-trio-max-power-son-kat.webp",
    "desc": "Uzun yağ alkid reçine esaslı hava kurumalı metali korozyondan koruyucu antikorozif madde içeren parlak astar ve son kattır. Solvent bazlı sentetik reçine esaslı metal yüzeyde korozyon önleyici, astar ve son kat olar...",
    "meta": [
      "Kod: 308",
      "Ambalaj: 15 L / 2,5 L / 0,75 L",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "15 L",
      "2,5 L",
      "0,75 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 308",
      "packaging": "15 L, 2,5 L, 0,75 L",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Sentetik Tiner",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Üç faktör tek bir üründe · Solvent bazlı · Kurşun içermez · Astar · Son kat · Yüksek yayılma ve örtme gücü · Kimyasallara dayanıklı · Antikorozif · Parlak · Esnek"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulanacak yüzey yağ, toz ve pastan arındırılmış olmalıdır. Paslı yüzeyler kumlama, tel fırça ile temizlenmeli ve silme işlemleri yapılmalıdır. Metalin yağı sentetik tiner ile yüzeyden uzaklaştırılmalı ve hemen boya işlemine geçilmelidir. Temizlenen, yağı alınan metal, boyama işlemi yapılmadan uzun süre bekletilmemelidir. Bekletilmesi durumunda metal daha hızlı korozyona uğrar. Yüzeyde eğim veya boya seviye farkları varsa uygun macun ile doldurulup yüzey düzgünleştirilmeli ve sonra tüm yüzey Trio-max Power Son Kat ile boyanmalıdır."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Kapağı açılmamış ambalajlarda oda sıcaklığında en az 2 yıl depolanabilir. Aşırı sıcak ve soğuktan korunmalıdır. Ambalajlar taşıma kulpundan tutularak taşınmalı, düzgün bir şekilde yerleştirilmelidir ve direkt güneş ışığına maruz kalmamalıdır. Kod: 308. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "703-yol-cizgi-boyasi",
    "name": "TEK Yol Çizgi Boyası (703)",
    "badge": "Ağır Hizmet & Yol Grubu",
    "tag": "Klor Kauçuk Yol Çizgi",
    "deptId": "tekIndustrialSpecialPanel",
    "category": "yol-cizgi",
    "thumb": "assets/tekboya-official/703-yol-cizgi-boyasi.webp",
    "desc": "703-Yol Çizgi Boyası Renk seçenekleri",
    "meta": [
      "Kod: 703",
      "Ambalaj: 15 L / 2,5 L / 0,75 L",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "15 L",
      "2,5 L",
      "0,75 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 703",
      "packaging": "15 L, 2,5 L, 0,75 L",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Sentetik Tiner",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "703-Yol · Çizgi · Boyası"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "703-Yol Çizgi Boyası"
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak +5°C ile +35°C arasında kuru ve serin ortamda dondan korunarak depolanmalıdır. Kod: 703. TS EN ve ISO kalite belgelerine haizdir."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "akrilik-yol-cizgi-boyasi",
    "name": "TEK Akrilik Yol Çizgi Boyası (704)",
    "badge": "Ağır Hizmet & Yol Grubu",
    "tag": "Klor Kauçuk Yol Çizgi",
    "deptId": "tekIndustrialSpecialPanel",
    "category": "yol-cizgi",
    "thumb": "assets/tekboya-official/akrilik-yol-cizgi-boyasi.webp",
    "desc": "Akrilik reçine esaslı , hızlı kuruyan , yol çizgi işaretlemeleri için kullanılan solvent bazlı yol çizgi boyasıdır. Yapışma gücü yüksek , hızlı kuruyan , hava şartlarına ve UV ye dayanıklı , renk değişimi yapmayan ,...",
    "meta": [
      "Kod: 704",
      "Ambalaj: 15 L / 2,5 L / 0,75 L",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "15 L",
      "2,5 L",
      "0,75 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 704",
      "packaging": "15 L, 2,5 L, 0,75 L",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Sentetik Tiner",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Akrilik reçine esaslı , hızlı kuruyan , yol çizgi işaretlemeleri için kullanılan solvent bazlı yol çizgi boyasıdır. Yapışma gücü yüksek , hızlı kuruyan , hava şartlarına ve UV ye dayanıklı , renk değişimi yapmayan , sürtünmeye dayanıklı , uzun ömürlü son kat boyadır. Karayolları, yaya geçitleri , beton, asfalt, mozaik, bordur taşları ve fabrika zeminlerinde ve her türlü işaretlemede güvenle kullanılır"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak zemin öncelikle mıcır,toz,kirden arındırılmalı ve kesinlikle kuru olmalıdır. Boya kullanıma hazırdır. Gerektiği durumlarda %5 endüstriyel tiner ile inceltiniz.Boya yapılırken ortam ve yüzey sıcaklığı +5 ile +35 derece arasında olmalıdır.Parlak beton yüzeyler yapışmayı sağlamak için pürüzlendirilmeldir. Boya tam kurumasını sağlamadan yol trafiğe açılmamalıdır."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak +5°C ile +35°C arasında kuru ve serin ortamda dondan korunarak depolanmalıdır. Kod: 704. TS EN ve ISO kalite belgelerine haizdir."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "505-degisim-astari",
    "name": "TEK Değişim Astarı (505)",
    "badge": "Astar & Yüzey Hazırlığı",
    "tag": "Brüt Beton Astarı",
    "deptId": "tekPrimersPanel",
    "category": "beton-astar",
    "thumb": "assets/tekboya-official/505-degisim-astari.webp",
    "desc": "Stiren akrilik kopolimer esaslı, su bazlı iç ve dış yüzeyler için mat geçiş astarıdır. Eski solvent bazlı veya eski su bazlı boya filminin üzerine su veya solvent bazlı boyanın daha kolay ve sağlam yapışmasını sağla...",
    "meta": [
      "Kod: 505",
      "Ambalaj: 20 kg / 10 kg / 3,5 kg",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "20 kg",
      "10 kg",
      "3,5 kg",
      "1 kg"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 505",
      "packaging": "20 kg, 10 kg, 3,5 kg, 1 kg",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Su bazlı · Mükemmel yapışma · Solvent bazlı yüzeyden su bazlı yüzeye geçiş · Sağlam yüzey · Yüksek kapatma · Yüksek aderans gerektiren yüzeyler için"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yüzeyinde bulunan toz, kir, eski kabarmış boya kalıntıları yüzeyden uzaklaştırılmalı, yüzey üzerinde seviye farkı var ise uygun macun ile düzeltilmeli, macun işleminden sonra zımparalanarak yüzey düzeltilmeli ve yüzeydeki tozlar alınmalı, zeminin tamamen kuru ve temiz olduğundan emin olunduktan sonra astar uygulamasına geçilmelidir. Uygulama işleminde Tek Değişim Astar % 10-15 oranında su ile inceltilerek uygulanmalıdır. Kullanmadan önce iyice karıştırınız. Katlar arası bekleme süresi en az 4 saattir."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak, güneş ışığına maruz bırakmadan ve dondan koruyarak ( +5 ile 35 °C ) en az 2 yıl depolanabilir. Büyük ambalajlar üst üste en fazla 5 adet; küçük ambalajlar üst üste en fazla 8 adet halinde depolanmalıdır. Kod: 505. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "506-izolan-astar",
    "name": "TEK İzolan Astar (506)",
    "badge": "Astar & Yüzey Hazırlığı",
    "tag": "Yüzey Astarı & Macun",
    "deptId": "tekPrimersPanel",
    "category": "macun",
    "thumb": "assets/tekboya-official/506-izolan-astar.webp",
    "desc": "Akrilik kopolimer esaslı su bazlı iç ve dış cepheler için renksiz astar boyadır. Su bazlı, şeffaf, iç ve dış cephe astarıdır. İç ve dış cepheler için yüksek boya tüketimini azaltan, izolasyon sağlayan, güçlü bir boy...",
    "meta": [
      "Kod: 506",
      "Ambalaj: 15 kg / 10 kg / 3 kg",
      "0.75 L: 250 ₺ · 2.5 L: 450 ₺ · 15 L: 1.100 ₺"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "15 kg",
      "10 kg",
      "3 kg",
      "1 kg"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 506",
      "packaging": "15 kg, 10 kg, 3 kg, 1 kg",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Su bazlı · Renksiz · Zayıf zemini güçlendirir · Boya sarfiyatını azaltır"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yüzeyinde var ise bozuk yüzeyler için gerekli tamirat yapılmalı ve uygulama yüzeyi tamamen temizlenmelidir. Gerekli kuruluk sağlandıktan sonra zayıf yüzeyleri sağlamlaştırmak için 1 hacim İzolan Astar 7 hacim su ile karıştırılarak rulo ya da fırça ile uygulanmalıdır. İzolasyon malzemesi olarak kullanıldığında yüzeyde kesinlikle nem olmamalıdır ve 1 hacim İzolan Astar 7 hacim su karıştırılarak uygulanmalı ve kuruyana dek (en az 3 gün) su almamalıdır. Fırça veya rulo ile uygulayınız."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak, güneş ışığına maruz bırakmadan ve dondan koruyarak ( +5 ile 35 °C ) en az 2 yıl depolanabilir. Büyük ambalajlar üst üste en fazla 5 adet; küçük ambalajlar üst üste en fazla 5 adet halinde depolanmalıdır. Kod: 506. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "507-su-kes-astari",
    "name": "TEK Su Kes Astarı (507)",
    "badge": "Astar & Yüzey Hazırlığı",
    "tag": "Yüzey Astarı & Macun",
    "deptId": "tekPrimersPanel",
    "category": "macun",
    "thumb": "assets/tekboya-official/507-su-kes-astari.webp",
    "desc": "Özel modifiyeli saf akrilik kopolimer esaslı, her türlü yüzeye uygulama imkânı veren elastik uzun ömürlü, su izolasyonu için geliştirilmiş opak bir astar boyadır. Elastik özelliği ile çatlama ve kırılma yapmaz. Kuru...",
    "meta": [
      "Kod: 507",
      "Ambalaj: 20 kg / 10 kg / 3,5 kg",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "20 kg",
      "10 kg",
      "3,5 kg",
      "1 kg"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 507",
      "packaging": "20 kg, 10 kg, 3,5 kg, 1 kg",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Su bazlı · Elastik · Mükemmel yapışma · Sağlam sızdırmaz yüzey · Yüksek kapatma"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "WhatsApp&#39;tan Bilgi Alın Özellikler Teknik bilgiler Uygulama Soru &amp; Cevap Dökümanlar - Su bazlı - Elastik - Mükemmel yapışma - Sağlam sızdırmaz yüzey - Yüksek kapatma Ambalaj Tipleri: 20 - 10 - 3,5, - 1 Kg Yoğunluk: 1,4 ± 0,05 gr/ml Parlaklık: Sınıfı İpek Mat Su Aktarım Hızı W-3 Düşük Katı Madde: % 65 % ± 5 gr/cm³ VOC değeri: 25 gr/L (Teorik Olarak Hesaplanmıştır) VOC değeri: Değeri 25 gr/L (Teorik Olarak Hesaplanmıştır) Taşıma Ve Depolama Bilgileri: Orijinal ambalajında kapağı tam kapalı olarak, güneş ışığına maruz bırakmadan ve dondan koruyarak ( +5 ile 35 °C ) en az 2 yıl depolanabilir. Büyük ambalajlar üst üste en fazla 5 adet; küçük ambalajlar üst üste en fazla 5 adet halinde depolanmalıdır. Güvenlik Uyarıları: S2 Çocukların ulaşamayacağı yerde saklayın S24 Deri temasından sakının S25 Göz temasından sakının S46 Yutulması durumunda derhal sağlık kuruluşuna başvurun. Kimyasal Özellikleri: Su Kes kesinlikle nemsiz, kuru ve temiz yüzeylere uygulanmalıdır. Sıva ve beton yüzeylerin yıkanması tavsiye edilir. Uygulanacak yüzey düz olmalı göllenmeye sebep olacak yüzeyler düzeltilmelidir. Sürülecek satıhlar üzerindeki yağ, kir, toz ve gevşek zeminler temizlenmelidir. Yatay ve düşey kenar birleşimlerinde 5 cm’ lik şerit halinde elyafla karıştırılmış Su Kes çekildikten sonra yüzeylerin durumuna göre Su Kes; %100 nispetinde su ile inceltilerek bir astar kat çekilmeli ve bunun üzerine ikinci kat inceltilmeden uygulanmalıdır. Uygulanan her kat bir önceki katın uygulamasından en geç 24 saat sonra ters yönde yüzeye tatbik edilmelidir. Kapalı mekânlarda yüzey su kes uygulamasından önce ve sonra ısıtıcılarla kurutulmalıdır."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak, güneş ışığına maruz bırakmadan ve dondan koruyarak ( +5 ile 35 °C ) en az 2 yıl depolanabilir. Büyük ambalajlar üst üste en fazla 5 adet; küçük ambalajlar üst üste en fazla 5 adet halinde depolanmalıdır. Kod: 507. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "508-elyafli-su-kes-astari",
    "name": "TEK Elyaflı Su Kes Astarı (508)",
    "badge": "Astar & Yüzey Hazırlığı",
    "tag": "Yüzey Astarı & Macun",
    "deptId": "tekPrimersPanel",
    "category": "macun",
    "thumb": "assets/tekboya-official/508-elyafli-su-kes-astari.webp",
    "desc": "Silikon ve özel modifiye saf akrilik reçine esaslı olup elastik, yüksek alkali dirençli, elyaf katkılı, uzun ömürlü kullanıma hazır su yalıtım ürünüdür. Su bazlı silikon ve özel modifiye saf akrilik reçine esaslı ol...",
    "meta": [
      "Kod: 508",
      "Ambalaj: 20 kg / 10 kg / 2,5 kg",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "20 kg",
      "10 kg",
      "2,5 kg"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 508",
      "packaging": "20 kg, 10 kg, 2,5 kg",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Su bazlı · Silikonlu · Çevre dostu · Elyaf katkılı · Kullanıma hazır · Tek kompenatlı · Nefes alır · Mat - düz görünümlü · Elastik yapılı · Solvent içermez · İri gözenekleri doldurucu · Çatlama kırılma soyulma yapmaz · Uzun ömürlü su yalıtımı · Soğuk - sıcak iklimden etkilenmez · Yüksek su buharı geçirgenliği"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Ürün kendi ambalajı içinde homojen olana dek karıştırılmalıdır. Uygulama yüzeyinde yağ, kir, eski zayıf ve gevşek zemin var ise temizlenip tozlu kısımlar yıkanıp tamamen kuruyana kadar beklenmelidir. Zeminin düz olmayan yani göllenme oluşturabilecek alanları var ise düzeltilmelidir. Yatay ve düşey kenar birleşimlerinde 5 cm’lik Elyaflı Su Kes çekildikten sonra tüm zemin Tek Su Kes Astarı % 100 su ile inceltilerek bir kat astar çekilmelidir. 24 saatlik kurumadan sonra ters yönde Elyaflı Su Kes Astarı iki kat olarak hiç inceltilmeden rulo veya fırça ile tatbik edilmelidir. Son kat inceltilmeden uygulanmalıdır. Uygulama Sıcaklığı: Ortam ve uygulama yüzeyinin sıcaklığı + 5 ile 30 °C olmalıdır. Tek Elyaflı Su kes özellikle kuru havalarda +5 °C ve +35°C arasında uygulanmalıdır."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak, güneş ışığına maruz bırakmadan ve dondan koruyarak ( +5 ile 35 °C ) en az 2 yıl depolanabilir. Büyük ambalajlar üst üste en fazla 5 adet; küçük ambalajlar üst üste en fazla 8 adet halinde depolanmalıdır. Kod: 508. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "509-alci-astari",
    "name": "TEK Alçı Astarı (509)",
    "badge": "Astar & Yüzey Hazırlığı",
    "tag": "Yüzey Astarı & Macun",
    "deptId": "tekPrimersPanel",
    "category": "macun",
    "thumb": "assets/tekboya-official/509-alci-astari.webp",
    "desc": "Özel modifiye kopolimer esaslı renksiz kullanıma hazır iç cephe alçı astarıdır. Yüksek emici alçı yüzeylerde boya işleminde yaşanan sorunlara çözüm getiren kullanıma hazır alçı astarıdır. Alçı yüzey üzerindeki serbe...",
    "meta": [
      "Kod: 509",
      "Ambalaj: 15 L / 7,5 L / 2,5 L",
      "Fabrika Stok Teslim"
    ],
    "coverage": "10 -12 m²/L",
    "sizes": [
      "15 L",
      "7,5 L",
      "2,5 L",
      "0,75 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 509",
      "packaging": "15 L, 7,5 L, 2,5 L, 0,75 L",
      "consumption": "10 -12 m²/L",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Su bazlı · Alçı ve zayıf zemini güçlendirir · Zamanla dökülme ve alçı çatlaklarını önler · Boya sarfiyatını azaltır"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yüzeyinin temiz ve kuru olduğundan emin olunduktan sonra, saten alçı yüzeylerde, alçı kuruduktan sonra zımparalanmalı daha sonra yüzeydeki tozu nemli bir bez veya fırça ile temizlendikten sonra Tek Saten Alçı uygulaması yapılmalıdır. Fırça veya rulo ile uygulayınız. Uygulama Sıcaklığı: Ortam ve uygulama yüzeyinin sıcaklığı + 5 ile 30 °C olmalıdır. Kuruma Süresi: 20 °C ve % 60 nemli ortamda dokunma kuruması; 1 saat, tam kuruma 24 saattir. Kaplama Gücü: Uygulama zeminine bağlı olarak ortalama tek katta 10 -12 m²/L kesin sarfiyat için kontrollü numune çalışması yapılması önerilir."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak, güneş ışığına maruz kalmadan ve dondan koruyarak ( +5 ile 35 °C ) en az 2 yıl depolanabilir. Büyük ambalajlar üst üste en fazla 5 adet; küçük kovalar üst üste en fazla 8 adet halinde depolanmalıdır. Amba Kod: 509. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "512-ic-cephe-ortucu-astar",
    "name": "TEK İç Cephe Örtücü Astar (512)",
    "badge": "Astar & Yüzey Hazırlığı",
    "tag": "Yüzey Astarı & Macun",
    "deptId": "tekPrimersPanel",
    "category": "macun",
    "thumb": "assets/tekboya-official/512-ic-cephe-ortucu-astar.webp",
    "desc": "Su bazlı stiren akrilik reçine esaslı örtücü mat iç cephe astar boyasıdır. Su bazlı akrilik reçine esaslı olup üstün beyazlığı, yüksek kapatma gücü ve dolgun film yapma özelliği ile üzerine uygulanacak son kat iç ce...",
    "meta": [
      "Kod: 512",
      "Ambalaj: 20 kg",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "20 kg"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 512",
      "packaging": "20 kg",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Su bazlı · Mükemmel yapışma · Yüksek örtme gücü · Mat yüzey · Üstün beyazlık"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yüzeyinde bulunan toz, kir, eski kabarmış boya kalıntıları yüzeyden uzaklaştırılmalı, yüzey üzerindeki var ise seviye farkı uygun macun ile düzeltilmeli macun işleminden sonra zımparalanarak yüzey düzeltilmeli ve yüzeydeki tozlar alınmalı, zeminin tamamen kuru ve temiz olduğundan emin olunduktan sonra astar uygulamasına geçilmelidir. Uygulama işleminde TEK İÇ CEPHE ÖRTÜCÜ ASTAR % 10-15 oranında su ile inceltilerek uygulanmalıdır. Katlar arası bekleme süresi en az 4 saattir."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak, güneş ışığına maruz bırakmadan ve dondan koruyarak ( +5 ile 35 °C ) en az 2 yıl depolanabilir. Büyük ambalajlar üst üste en fazla 5 adet; küçük ambalajlar üst üste en fazla 5 adet halinde depolanmalıdır. Kod: 512. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "513-saydam-yuzey-astari",
    "name": "TEK Saydam Yüzey Astarı (513)",
    "badge": "Astar & Yüzey Hazırlığı",
    "tag": "Mikro İzolan Astar",
    "deptId": "tekPrimersPanel",
    "category": "izolan-astar",
    "thumb": "assets/tekboya-official/513-saydam-yuzey-astari.webp",
    "desc": "Siren akrilik reçine esaslı mat su bazlı kaygan zemin için geliştirilmiş astar boyadır. İç mekânlarda, zor yüzeylerde, sağlam yüzey hazırlamak için kullanılan, seramik üstü seramik uygulaması için geçiş astarıdır. S...",
    "meta": [
      "Kod: 513",
      "Ambalaj: 3,5 kg / 1 kg",
      "1 kg: 250 ₺ · Galon: 550 ₺"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "3,5 kg",
      "1 kg"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 513",
      "packaging": "3,5 kg, 1 kg",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Su bazlı · Camsı ve kaygan zeminler için · Seramik üstü seramik kaplamaları · Güçlü yapışma için zemini oluşturan özel yüzey astarı"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Seramik üstü seramik uygulamasında yüzey temiz ve kuru olmalı eski seramikler sağlam ve eski seramiklerin yeni seramiği taşıyacak güçte olup olmadığı kontrol edilmelidir. Islak ve nemli yüzeyler tamamen kurutulmalıdır. Astar boya belli aralıklarla karıştırılarak homojen tutulmalı ve inceltilmeden kullanılmalıdır. Uygulama aparatı fırça ve rulodur. Ortam ve uygulama yüzeyinin sıcaklığı + 5 ile 30 °C olmalı, uygulama sırasında ve sonrasında hava akımından korunmalı, donmuş, çok nemli yüzeylerde ve devamlı su alan yüzeylerde kesinlikle uygulama yapılmamalıdır. Çatlak birleşim yerleri, kenarlar ve köşelerde iki kat uygulamadan sonra donatı filesi ile desteklenmelidir."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak, güneş ışığına maruz bırakmadan ve dondan koruyarak ( +5 ile 35 °C ) en az 2 yıl depolanabilir. Kod: 513. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "514-silikonlu-ic-cephe-ortucu-astar",
    "name": "TEK Silikonlu İç Cephe Örtücü Astar (514)",
    "badge": "Astar & Yüzey Hazırlığı",
    "tag": "Yüzey Astarı & Macun",
    "deptId": "tekPrimersPanel",
    "category": "macun",
    "thumb": "assets/tekboya-official/514-silikonlu-ic-cephe-ortucu-astar.webp",
    "desc": "Stiren akrilik reçine esaslı silikon katkılı opak mat iç cephe astar boyadır. Su bazlı stiren akrilik reçine esaslı yapısında bulunan silikon katkısı ile iç mekanlarda yüksek su buharı geçirdiği için nem dışarı atıl...",
    "meta": [
      "Kod: 514",
      "Ambalaj: 20 kg",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "20 kg"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 514",
      "packaging": "20 kg",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Su bazlı · Mükemmel yapışma · Yüksek örtme gücü · Mat yüzey · Yüksek buhar geçirgenliği"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yüzeyinde bulunan toz, kir, eski kabarmış boya kalıntıları yüzeyden uzaklaştırılmalı yüzey üzerindeki var ise seviye farkı uygun macun ile düzeltilmeli macun işleminden sonra zımparalanarak yüzey düzeltilmeli ve yüzeydeki tozlar alınmalı, zeminin tamamen kuru ve temiz olduğundan emin olunduktan sonra astar uygulamasına geçilmelidir. Uygulama işleminde Tek Silikonlu İç Astar fırça veya rulo ile % 10-15 oranında su ile inceltilerek uygulanmalıdır."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Güvenlik Uyarıları: S2 Çocukların ulaşamayacağı yerde saklayın S24 Deri temasından sakının S25 Göz temasından sakının S46 Yutulması durumunda derhal sağlık kuruluşuna başvurun Kimyasal Özellikleri: Kod: 514. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "502-silikonlu-dis-cephe-astari",
    "name": "TEK Silikonlu Dış Cephe Astarı (502)",
    "badge": "Astar & Yüzey Hazırlığı",
    "tag": "Yüzey Astarı & Macun",
    "deptId": "tekPrimersPanel",
    "category": "macun",
    "thumb": "assets/tekboya-official/502-silikonlu-dis-cephe-astari.webp",
    "desc": "Stiren akrilik kopolimer bağlayıcı, silikon katkılı su bazlı mat dış cephe astar boyasıdır. Su bazlı stiren akrilik reçine esaslı yüksek kapatma gücü ve dolgun film yapma özelliği ile üzerine uygulanacak son kat dış...",
    "meta": [
      "Kod: 502",
      "Ambalaj: 20 kg",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "20 kg"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 502",
      "packaging": "20 kg",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Su bazlı · Mat · Kapatma gücü yüksek astar"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Kullanmadan önce iyice karıştırınız. Fırça veya rulo ile uygulayınız. İnceltme oranı uygulama yapılacak yüzeyin durumuna bağlı olarak %10-30 oranında su ile inceltiniz. Uygulamaya geçmeden önce zeminde var ise gevşek, kabarmış eski boya kalıntıları temizlenmelidir. Çatlak veya seviye farkı olan alanlarda düzeltilmeli, gerekli kuruluk ve temizlik bittikten sonra Tek Silikonlu Dış Cephe Astarı uygulanmalıdır. Uygulama Sıcaklığı: Ortam ve uygulama yüzeyinin sıcaklığı + 5 ile 30 °C olmalıdır."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak, güneş ışığına maruz bırakmadan ve dondan koruyarak ( +5 ile 35 °C ) en az 2 yıl depolanabilir. Büyük ambalajlar üst üste en fazla 5 adet halinde depolanmalıdır. Ambalajları taşıma kulpundan tutarak taşıy Kod: 502. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "503-akrilik-dis-cephe-astari",
    "name": "TEK Akrilik Dış Cephe Astarı (503)",
    "badge": "Astar & Yüzey Hazırlığı",
    "tag": "Yüzey Astarı & Macun",
    "deptId": "tekPrimersPanel",
    "category": "macun",
    "thumb": "assets/tekboya-official/503-akrilik-dis-cephe-astari.webp",
    "desc": "Akrilik kopolimer esaslı su bazlı astar boyasıdır. Su bazlı akrilik reçine esaslı yüksek kapatma gücü ve dolgun film yapma özelliği ile son kat dış cephe boya sarfiyatını azaltırken sağlam ve kalıcı yüzey oluşturur....",
    "meta": [
      "Kod: 503",
      "Ambalaj: 20 kg",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "20 kg"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 503",
      "packaging": "20 kg",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Su bazlı · Mat · Kapatma gücü yüksek"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Kullanmadan önce iyice karıştırınız. Fırça veya rulo ile uygulayınız. Uygulama yapılacak yüzeyin durumuna bağlı olarak %10-30 oranında su ile inceltiniz. Uygulamaya geçmeden önce zeminde var ise gevşek, kabarmış eski boya kalıntıları temizlenmeli. Çatlak veya seviye farkı olan alanlarda düzeltilmeli, gerekli kuruluk ve temizlik bittikten sonra Tek Akrilik Dış Cephe Astarı uygulanmalıdır."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak, güneş ışığına maruz bırakmadan ve dondan koruyarak ( +5 ile 35 °C ) en az 2 yıl depolanabilir. Büyük ambalajlar üst üste en fazla 5 adet; halinde depolanmalıdır. Ambalajları taşıma kulpundan tutarak taşı Kod: 503. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "504-brut-beton-astari",
    "name": "TEK Brüt Beton Astarı (504)",
    "badge": "Astar & Yüzey Hazırlığı",
    "tag": "Brüt Beton Astarı",
    "deptId": "tekPrimersPanel",
    "category": "beton-astar",
    "thumb": "assets/tekboya-official/504-brut-beton-astari.webp",
    "desc": "Saf akrilik kopolimer bağlayıcı esaslı brüt beton yüzeylerde, yüzeyin kılcal çatlaklarını ve çukurları doldurarak yüzeyi güçlendirirken son kat boyanın yüzeye daha iyi yapışmasını sağlayan su bazlı astar boyadır. Br...",
    "meta": [
      "Kod: 504",
      "Ambalaj: 20 kg",
      "3.5 kg: 220 ₺ · 12 kg: 650 ₺"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "20 kg"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 504",
      "packaging": "20 kg",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Su bazlı · Mükemmel yapışma · Esnek · Kılcal çatlak doldurucu · Sağlam yüzey"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeyde astarın yapışmasını engelleyici her türlü kir, pas, var ise kalıp yağlarından temizlenmelidir. Bozuk satıhlar tamir edilmeli, gevşek parçalar yüzeyden uzaklaştırılmalıdır. Yüzey kuru ve temiz olmalıdır. Astar boya kullanıma hazırdır ancak boya işlemine başlamadan önce boya iyice karıştırılmalı uygulama yüzeyinin ve ortam sıcaklığının; + 5 ile + 30 °C arasında olmasına dikkat edilmelidir. Uygulama işlemi sırasında belli aralıklarla astar boya karıştırılmalıdır."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak, güneş ışığına maruz bırakmadan ve dondan koruyarak ( +5 ile 35 °C ) en az 2 yıl depolanabilir. Büyük ambalajlar üst üste en fazla 5 adet; halinde depolanmalıdır. Ambalajları taşıma kulpundan tutarak taşı Kod: 504. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "515-silikonlu-dis-cephe-kaplama-astar",
    "name": "TEK Silikonlu Dış Cephe Kaplama Astar (515)",
    "badge": "Astar & Yüzey Hazırlığı",
    "tag": "Yüzey Astarı & Macun",
    "deptId": "tekPrimersPanel",
    "category": "macun",
    "thumb": "assets/tekboya-official/515-silikonlu-dis-cephe-kaplama-astar.webp",
    "desc": "Su bazlı akrilik reçine esaslı mikro ve makro tanecik boyutlu inşaat malzemelerine uyumlu ve dayanıklı mat dış cephe astarıdır. Dış cephe ısı yalıtım sistemleri üzerine veya sıva, beton, tuğla vb. inşaat yüzeylerde ...",
    "meta": [
      "Kod: 515",
      "Ambalaj: 20 kg",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "20 kg"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 515",
      "packaging": "20 kg",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Yüksek yapışma gücü · Sağlam yüzey · Mat yüzey · Mikro kanallı · Isı yalıtım levhası ile boya arasındaki Su buharının dışarı atılmasını sağlar · Düşük su emme · Makro dolguları beton yüzey ile uyumlu · Mikro dolguları ile örtücü dür · Uygulama yüzeyini sertleştirir · Leke ve kirlerin, üst yüzeye çıkmasını engeller"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Eski sıvalı yüzeylerde tamirat işlemi tamamlandıktan ve gerekli kuruluk sağlandıktan sonra yüzeyin tutuculuğunu arttırmak için yüzeye çentik atılması önerilir. Solvent esaslı bir boya ile kaplamış yüzeylerde uygulamadan önce yüzey tamamen zımparalanarak oksit tabakası yüzeyden uzaklaştırılmalıdır. Yeni sıvalı yüzeylerde ise sıva tamamen kuruduktan sonra (en az 6 hafta) yüzey üzerindeki toz ve kirler tamamen temizlenmelidir. Tek Silikonlu Kaplama Astarı kullanıma hazır olup gerekli durumlarda en fazla % 5 oranında su ile inceltildikten sonra fırça veya rulo ile tek (1 kat) kat halinde uygulama yapılmalıdır. Uygulama yağmur esnasında yapılmamalıdır yağmur sonrasında yüzey kuruduktan sonra uygulamaya geçilmelidir."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak, güneş ışığına maruz bırakmadan ve dondan koruyarak ( +5 ile 35 °C ) en az 2 yıl depolanabilir. Büyük ambalajlar üst üste en fazla 5 adet halinde depolanmalıdır. Ambalajları taşıma kulpundan tutarak taşıy Kod: 515. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "517-zirve-universal-ic-ve-dis-cephe-astari",
    "name": "TEK Zirve Üniversal İç ve Dış Cephe Astarı (517)",
    "badge": "Astar & Yüzey Hazırlığı",
    "tag": "Yüzey Astarı & Macun",
    "deptId": "tekPrimersPanel",
    "category": "macun",
    "thumb": "assets/tekboya-official/517-zirve-universal-ic-ve-dis-cephe-astari.webp",
    "desc": "Stiren akrilik kopolimer bağlayıcı, silikon katkılı su bazlı mat iç ve dış cephe örtücü astar boyasıdır. Su bazlı stiren akrilik reçine esaslı yüksek kapatma gücü ve dolgun film yapma özelliği ile üzerine uygulanaca...",
    "meta": [
      "Kod: 517",
      "Ambalaj: 20 kg / 10 kg / 3,5 kg",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "20 kg",
      "10 kg",
      "3,5 kg"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 517",
      "packaging": "20 kg, 10 kg, 3,5 kg",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Stiren akrilik kopolimer bağlayıcı, silikon katkılı su bazlı mat iç ve dış cephe örtücü astar boyasıdır. Su bazlı stiren akrilik reçine esaslı yüksek kapatma gücü ve dolgun film yapma özelliği ile üzerine uygulanacak son kat dış cephe boya sarfiyatını azaltırken sağlam ve kalıcı yüzey oluşturur. Yapısındaki silikon ve yüksek su buharı geçirgenliği ile hem altında bulunan beton, sıva yüzeyinin hem de son kat dış cephe boyasının ömrünü uzatır. Binaların dış kısımlarında her türlü duvar, beton, tuğla, betopan, gaz beton gibi yapı elemanlarında astar boya olarak kullanılır"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Kullanmadan önce iyice karıştırınız. Fırça veya rulo ile uygulayınız. İnceltme oranı uygulama yapılacak yüzeyin durumuna bağlı olarak %10-30 oranında su ile inceltiniz. Uygulamaya geçmeden önce zeminde var ise gevşek, kabarmış eski boya kalıntıları temizlenmelidir. Çatlak veya seviye farkı olan alanlarda düzeltilmeli, gerekli kuruluk ve temizlik bittikten sonra Zirve Silikonlu Dış Cephe Astarı uygulanmalıdır. Uygulama Sıcaklığı: Ortam ve uygulama yüzeyinin sıcaklığı + 5 ile 30 °C olmalıdır."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak +5°C ile +35°C arasında kuru ve serin ortamda dondan korunarak depolanmalıdır. Kod: 517. TS EN ve ISO kalite belgelerine haizdir."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "201-blissful-silikonlu-canli-parlak-dis-cephe",
    "name": "TEK Blissful Silikonlu Canlı Parlak Dış Cephe (201)",
    "badge": "Dış Cephe Zırhı",
    "tag": "Saf Akrilik & Silikonlu",
    "deptId": "tekExteriorPanel",
    "category": "akrilik-silikonlu",
    "thumb": "assets/tekboya-official/201-blissful-silikonlu-canli-parlak-dis-cephe.webp",
    "desc": "Silikon ve özel (APEO) akrilik reçine esaslı olup, parlak görünümlü ipek mat, uzun ömürlü, kir tutmayan, su bazlı, özel bir dış cephe boyasıdır. Yüksek kalitesini yapısında bulunan akrilik reçine ve silikon reçinede...",
    "meta": [
      "Kod: 201",
      "Ambalaj: 15 L / 7,5 L",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "15 L",
      "7,5 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 201",
      "packaging": "15 L, 7,5 L",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Su bazlı, uzun ömürlü canlı dış cepheler · Parlak görünümlü ipek mat % 30 daha az karbondioksit salınımı · Yüksek su buharı geçirgenliği · Yüksek su ve alkali dayanımı · Yüksek UV dayanımı, kir ve leke tutmaz · Esnek ve sağlam yapılı · Yüksek tiksotropik özellik gösterir · Yüksek yaş ovalama direncine sahip · Düşük VOC ile çevre dostu · Nefes alma"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Eski boyalı yüzeylerde; uygulama yüzeyinde bulunan toz, kir, eski kabarmış boya kalıntıları yüzeyden uzaklaştırılmalı özellikle tebeşirlenmiş ve tozlu yüzeylerdeki gevşek boyalar ortamdan uzaklaştırılmalıdır. Yüzey üzerinde seviye farkı var ise uygun sıva veya macun ile düzeltilmeli, macun işleminden sonra zımparalanmalıdır. Yüzeydeki tozlar alınmalı ve zeminin tamamen kuru ve temiz olduğundan emin olunmalıdır. Ortam ve duvar sıcaklığı + 5 ile 30 °C olmalı, daha sonra ise Tek Bariyer Dış Cephe Astar ile astarlanması tavsiye edilmektedir. Astar uygulamasından en az bir gün sonra Tek Blissful Dış Cephe boyası fırça veya rulo ile en fazla % 2-5 oranında su ile inceltilerek uygulanmalıdır.Katlar arası bekleme süresi en az 8 saattir."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak güneş ışığına maruz bırakmadan ve dondan koruyarak (+5 ile 35 °C) ortamda en az 2 yıl depolanabilir. Büyük ambalajlar üst üste en fazla 5 adet, küçük ambalajlar üst üste en fazla 8 adet halinde depolanmal Kod: 201. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "202-flexible-mat-dis-cephe",
    "name": "TEK Flexible Mat Dış Cephe (202)",
    "badge": "Dış Cephe Zırhı",
    "tag": "Elastomerik Dış Cephe",
    "deptId": "tekExteriorPanel",
    "category": "elastomerik",
    "thumb": "assets/tekboya-official/202-flexible-mat-dis-cephe.webp",
    "desc": "Saf akrilik reçine esaslı, 1,5 mm‘e kadar çatlak köprüleme özelliğine sahip, zor ve düşük sıcaklıktaki hava koşullarına dayanıklı, yüksek UV, su buharı, alkali direnç özelliklerine sahip olup, mat ve düz görünümlü e...",
    "meta": [
      "Kod: 202",
      "Ambalaj: 15 L / 7,5 L",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "15 L",
      "7,5 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 202",
      "packaging": "15 L, 7,5 L",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Su bazlı, mıknatıs gibi yapışkan ama esnek · Mat - düz görünümlü, esnek ve sert yapılı · Sert iklim koşullarına dayanıklı, nefes alma · Yüksek su buharı geçirgenliği, çevre dostu · Yüksek su ve alkali ve UV dayanımı · Donma - çözülme etkisine dayanıklı · Yüzey özelliklerini koruma · Düşük kir tutma özelliği · Uzun ömürlü canlı dış cepheler · Sıva ve çimento çatlaklarını 1,5 mm kadar köprüleyerek beton koruma UV kürlenmeli"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yüzeyinde bulunan toz, kir, eski kabarmış boya kalıntıları yüzeyden uzaklaştırılmalıdır. Yüzey üzerinde seviye farkı var ise uygun sıva veya macun ile düzeltilmeli, macun işleminden sonra zımparalanmalıdır. Yüzeydeki tozlar alınmalı ve zeminin tamamen kuru ve temiz olduğundan emin olunmalıdır. Daha sonra Tek Bariyer Astar uygulamasına geçilmelidir. Astar uygulamasından en az bir gün sonra Flexible Mat Dış Cephe Boyası fırça veya rulo ile % 5-10 oranında su ile inceltilerek uygulanmalıdır. Katlar arası bekleme süresi en az 8 saattir. Kesinlikle 2 kat uygulama yapılmalıdır."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak güneş ışığına maruz bırakmadan ve dondan koruyarak (+5 ile 35 °C) ortamda en az 2 yıl depolanabilir. Büyük ambalajlar üst üste en fazla 5 adet, küçük ambalajlar üst üste en fazla 8 adet halinde depolanmal Kod: 202. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "203-silikonlu-dis-cephe",
    "name": "TEK Silikonlu Dış Cephe (203)",
    "badge": "Dış Cephe Zırhı",
    "tag": "Saf Akrilik & Silikonlu",
    "deptId": "tekExteriorPanel",
    "category": "akrilik-silikonlu",
    "thumb": "assets/tekboya-official/203-silikonlu-dis-cephe.webp",
    "desc": "Stiren akrilik kopolimer bağlayıcılı, silikon katkılı su bazlı dekoratif mat bir dış cephe boyasıdır. Silikon ve hidron katkısı ile tuzlu ve nemli ortamlarda (deniz, orman vb.) yüksek su buharı geçirgenliği sayesind...",
    "meta": [
      "Kod: 203",
      "Ambalaj: 15 L / 7,5 L",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "15 L",
      "7,5 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 203",
      "packaging": "15 L, 7,5 L",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Solmayan kalıcı renkler · Yüksek örtme gücü · Uzun ömürlü özel waks katkılı · Hidron ve silikon katkılı · Kuruma öncesi yağmura dayanıklı · Dekoratiftir iyi yayılır"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Kullanmadan önce iyice karıştırınız. Rulo ya da fırça ile uygulayınız. İnceltme oranı uygulama yapılan yüzeyin özelliğine göre % 25-30 oranında su ile inceltilebilir. Katlar arası bekleme süresi en az 1 saattir. Uygulama yapılacak zeminde kir, yağ, toz veya kabarmış gevşek boya kalıntıları tamamen temizlenmelidir. Sıva da bulunan aşırı çatlak ve oyuklar sıva türü malzemeler ile tamamen doldurulduktan sonra Tek İzolan Astar 1/7 oranında inceltilerek yüzeyin doyurulması ve tozların sıvaya yapışması sağlanmalıdır. Tek Akrilik Astar Boya ile astarlama işleminden sonra boya işlemine geçilmelidir."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak güneş ışığına maruz bırakmadan ve dondan koruyarak (+5 ile 35 °C) ortamda en az 2 yıl depolanabilir. Büyük ambalajlar üst üste en fazla 5 adet, küçük ambalajlar üst üste en fazla 8 adet halinde depolanmal Kod: 203. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "204-akrilik-dis-cephe",
    "name": "TEK Akrilik Dış Cephe (204)",
    "badge": "Dış Cephe Zırhı",
    "tag": "Saf Akrilik & Silikonlu",
    "deptId": "tekExteriorPanel",
    "category": "akrilik-silikonlu",
    "thumb": "assets/tekboya-official/204-akrilik-dis-cephe.webp",
    "desc": "Stiren akrilik kopolimer bağlayıcılı, su bazlı dekoratif mat bir dış cephe boyasıdır. Canlı ve renkleri solmayan, UV ışınlarına dayanıklı, mükemmel yayılma, yapışma, ve örtme gücüne sahip yüksek alkali direnci ile t...",
    "meta": [
      "Kod: 204",
      "Ambalaj: 15 L / 7,5 L",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "15 L",
      "7,5 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 204",
      "packaging": "15 L, 7,5 L",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Solmayan kalıcı renkler · Yüksek örtme gücü · Uzun ömürlü · Mat düz görünümlü · Kuruma öncesi yağmura dayanıklı · Dekoratiftir iyi yayılır"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Kullanmadan önce iyice karıştırınız. Rulo ya da fırça ile uygulayınız. Uygulama yapılan yüzeyin özelliğine göre %25-30 oranında su ile inceltilebilir. Katlar arası bekleme süresi en az 1 saattir. Uygulama yapılacak zeminde kir, yağ, toz veya kabarmış gevşek boya kalıntıları tamamen temizlenmeli, sıva da aşırı çatlak ve oyuklar sıva türü malzemeler ile tamamen doldurulduktan sonra Tek İzolan Astar 1/7 oranında inceltilerek yüzeyin doyurulması ve tozların sıvaya yapışması sağlandıktan sonra Tek Akrilik Astar Boya ile astarlama işlemi yapılmalı daha sonra boya işlemine geçilmelidir."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak güneş ışığına maruz bırakmadan ve dondan koruyarak (+5 ile 35 °C) ortamda en az 2 yıl depolanabilir. Büyük ambalajlar üst üste en fazla 5 adet, küçük ambalajlar üst üste en fazla 8 adet halinde depolanmal Kod: 204. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "205-silikonlu-grenli-dis-cephe",
    "name": "TEK Silikonlu Grenli Dış Cephe (205)",
    "badge": "Dış Cephe Zırhı",
    "tag": "Grenli & Tekstürlü",
    "deptId": "tekExteriorPanel",
    "category": "grenli",
    "thumb": "assets/tekboya-official/205-silikonlu-grenli-dis-cephe.webp",
    "desc": "Rulo ile uygulanıp rulo ile desen verilen silikon katkılı su bazlı stiren akrilik kopolimer esaslı mat bir dış cephe kaplamasıdır. Esnek yapılı olup silikonlu ve hidron katkısı sayesinde tuzlu ve nemli ortamlarda (d...",
    "meta": [
      "Kod: 205",
      "Ambalaj: 20 kg",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "20 kg"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 205",
      "packaging": "20 kg",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Uv ışınlarına dayanıklı · Yüksek örtme gücüne sahip · Yüzey bozukluğunu örter · Hidron ve silikon katkılı · Zevke uygun desen verir · Nefes alır · Mat ve dekoratif görünümlüdür"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "İlk kez uygulama yapılacak yüzeylerde, yüzey kabarmış eski boya kalıntılarından ve kirlerinden arındırılmalıdır. Yüzey çok kaygan ise boyanın tutunabileceği bir yüzey hazırlanmalıdır. Eski sıvalı yüzeyde çatlak oyuk gibi olumsuzluklar giderildikten sonra uygulama yapılacak renge uygun dış cephe astarı ile yüzey astarlandıktan sonra uygulama işlemine geçilmelidir. Grenli dış cephe kaplaması tek kat olarak uygulandığından isteğe bağlı olarak uygulanacak renkle aynı olan dış cephe astarı veya uygulama yapılacak grenli dış cephe kaplaması % 5 - 15 oranında su ile inceltilip astar olarak post rulo ile uygulanır. İkinci kat olarak kalın veya ince desenli rulo seçildikten sonra öncelikle rulo üzerindeki boya, boyanacak alana eşit olarak yayılır ve son olarak sadece tek yönde tarama yapılarak (yukarıdan aşağıya veya soldan sağa veya tersi ) istenilen desen bulunduktan sonra bütün boyanacak yüzeyde aynı işlem tatbik edilir."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak, güneş ışığına maruz bırakmadan ve dondan koruyarak (+5 ile 35 °C) en az 1 yıl depolanabilir. Büyük ambalajlar üst üste en fazla 5 adet depolanmalı ambalajlar taşıma kulpundan tutarak taşınmalıdır. Oda sı Kod: 205. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "206-akrilik-grenli-dis-cephe",
    "name": "TEK Akrilik Grenli Dış Cephe (206)",
    "badge": "Dış Cephe Zırhı",
    "tag": "Grenli & Tekstürlü",
    "deptId": "tekExteriorPanel",
    "category": "grenli",
    "thumb": "assets/tekboya-official/206-akrilik-grenli-dis-cephe.webp",
    "desc": "Rulo ile uygulanıp rulo ile desen verilen su bazlı stiren akrilik kopolimer esaslı mat bir dış cephe kaplamasıdır. Esnek yapılı olup, yağış, nem, ve fiziksel etkilere dayanıklıdır ve mevsimsel ısı farklarından dolay...",
    "meta": [
      "Kod: 206",
      "Ambalaj: 20 kg",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "20 kg"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 206",
      "packaging": "20 kg",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Uv ışınlarına dayanıklı · Yüksek örtme gücüne sahip · Yüzey bozukluğunu örter · Hidron ve silikon katkılı · Zevke uygun desen verir · Nefes alır · Mat ve dekoratif görünümlüdür"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Kalın ve orta desen için kullanıma hazır, çok ince desen kaplama için en fazla % 5 oranında su ile inceltilebilir. Kalın desen için boncuk rulo, orta desen için mercan, ince desen için post rulo kullanılır. Grenli dış cephe kaplaması tek kat olarak uygulandığından isteğe bağlı olarak uygulanacak renkle aynı olan dış cephe astarı veya uygulama yapılacak grenli dış cephe kaplaması % 5 - 15 oranında su ile inceltilip astar olarak post rulo ile uygulanır. İkinci kat olarak kalın veya ince desenli rulo seçildikten sonra öncelikle rulo üzerindeki boya, boyanacak alana eşit olarak yayılır ve son olarak sadece tek yönde tarama yapılarak (yukarıdan aşağıya veya soldan sağa veya tersi ) istenilen desen bulunduktan sonra boyanacak bütün yüzeye aynı işlem tatbik edilir. Tarama işleminin farklı uygulanması desenin bozuk olmasına, boya renginin farklı görünmesine ve yüzeyin dalgalı görünmesine sebep olacağından tarama işlemine önemle dikkat edilmelidir. Uygulama yüzeyi boyama işlemi bitmeden yarım bırakılmamalıdır ve özellikle yüksek yapılarda perde kullanılarak boyanın hızlı kuruması engellenmeli ve çok sıcak saatlerde uygulama yapılmamalıdır."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak, güneş ışığına maruz bırakmadan ve dondan koruyarak (+5 ile 35 °C) en az 1 yıl depolanabilir. Büyük ambalajlar üst üste en fazla 5 adet depolanmalı ambalajlar taşıma kulpundan tutarak taşınmalıdır. Oda sı Kod: 206. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "207-sun-shine-su-bazli-dis-cephe-vernik",
    "name": "TEK Sun Shine Su Bazlı Dış Cephe Vernik (207)",
    "badge": "Dış Cephe Zırhı",
    "tag": "Taş & Dış Cephe Vernik",
    "deptId": "tekExteriorPanel",
    "category": "akrilik-silikonlu",
    "thumb": "assets/tekboya-official/207-sun-shine-su-bazli-dis-cephe-vernik.webp",
    "desc": "Su bazlı 100% akrilik reçine esaslı mevsimsel hava koşullarından (donma-çözülme yüksek ısı, nemden) etkilenmeyen, esnek, su itme özelliği olan, parlak, renksiz olup, sert ve yumuşak zemine uygulanabilme özelliğine s...",
    "meta": [
      "Kod: 207",
      "Ambalaj: 15 L / 2,5 L",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "15 L",
      "2,5 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 207",
      "packaging": "15 L, 2,5 L",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Su bazlı parlak · Leke ve kir tutmaz · Düşük VOC · Yüksek su buharı geçirgenliği · Nefes alma · Esnek · Hızlı kuruma · Renksiz · Temiz ve canlı dış cepheler · Boya · Koruma Su ve atmosferik etkilere dayanıklı · Kullanıma hazır · Düşük VOC ile çevre dostu · Sert ve yumuşak zemine uygun. UV korumalı · Zamandan kazanç · Sıcak, soğuk, yağış ve nemden etkilenmez"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Eski boyalı yüzeylerde; uygulama yüzeyinde bulunan toz, kir, eski kabarmış boya kalıntıları yüzeyden uzaklaştırılmalı özellikle tebeşirlenmiş ve tozlu yüzeylerdeki gevşek boyalar ortamdan uzaklaştırılmalıdır. Yüzey üzerinde seviye farkı var ise uygun sıva veya macun ile düzeltilmeli, macun işleminden sonra zımparalanmalıdır. Yüzeydeki tozlar alınmalı ve zeminin tamamen kuru ve temiz olduğundan emin olunmalıdır. Daha sonra; zemine uygun astar uygulanmalıdır. Dış cephe son kat uygulamasından en az 7 gün sonra, son kat boyanın ömrünü uzatmak, temiz ve canlı görünümünü sağlamak için Tek Dış Cephe Sun Shine Vernik uygulaması yapılmalıdır. Düzgün ve net görünüm elde etmek için, uygulama zeminin emicilik oranının her yerde aynı olması gerekmektedir."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak, güneş ışığına maruz bırakmadan ve dondan koruyarak (+5 ile 35 °C) en az 2 yıl depolanabilir. Büyük ambalajlar üst üste en fazla 5 adet, küçük ambalajlar üst üste en fazla 8 adet halinde depolanmalı ve am Kod: 207. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "208-su-bazli-tas-vernik",
    "name": "TEK Su Bazlı Taş Vernik (208)",
    "badge": "Dış Cephe Zırhı",
    "tag": "Taş & Dış Cephe Vernik",
    "deptId": "tekExteriorPanel",
    "category": "akrilik-silikonlu",
    "thumb": "assets/tekboya-official/208-su-bazli-tas-vernik.webp",
    "desc": "Su bazlı 100% akrilik reçine esaslı mevsimsel hava koşullarından (donma-çözülme yüksek ısı, nemden) etkilenmeyen, esnek, su itme özelliği olan, parlak ve renksiz olup, sert ve yumuşak zemine uygulanabilme özelliğine...",
    "meta": [
      "Kod: 208",
      "Ambalaj: 15 L / 2,5 L / 0,75 L",
      "0.75 L: 250 ₺ · 2.5 L: 650 ₺"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "15 L",
      "2,5 L",
      "0,75 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 208",
      "packaging": "15 L, 2,5 L, 0,75 L",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Dekoratiftir Su bazlı ve parlaktır · Kir tutmaz ve renksizdir · Canlı , kalıcı renkler · Hızlı kurur, kolay yayılır · Nefes alır, nemden etkilenmez · Atmosferik hava koşullarına dayanıklıdır Uv direnci yüksektir"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yüzeyinde bulunan toz, kir, yağ var ise boya kalıntıları yüzeyden uzaklaştırılmalıdır. Özellikle yüzeye yapışarak ve zaman içinde sertleşerek oluşan kir, yağ katmanları veya kimyasal ve fiziksel özelliklerini yitirmiş boya kalıntıları mutlaka yüzeyden uzaklaştırılmalı ve gerekli tamirat işleri tamamlanmalıdır. Yüzeyin tamamen kuru, tozsuz ve temiz olduğundan emin olunduktan sonra inceltilmeden Tek Taş Vernik uygulaması yapılmalıdır."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak, güneş ışığına maruz bırakmadan ve dondan koruyarak (+5 ile 35 °C) en az 2 yıl depolanabilir. Büyük ambalajlar üst üste en fazla 5 adet, küçük ambalajlar üst üste en fazla 8 adet halinde depolanmalı ve am Kod: 208. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "209-zirve-silikonlu-dis-cephe-boyasi",
    "name": "TEK Zirve Silikonlu Dış Cephe Boyası (209)",
    "badge": "Dış Cephe Zırhı",
    "tag": "Saf Akrilik & Silikonlu",
    "deptId": "tekExteriorPanel",
    "category": "akrilik-silikonlu",
    "thumb": "assets/tekboya-official/209-zirve-silikonlu-dis-cephe-boyasi.webp",
    "desc": "Stiren akrilik kopolimer bağlayıcılı, silikon katkılı, UV dayanımı ve örtme gücü yüksek mat bir dış cephe boyasıdır. Özellikleri: Canlı ve renkleri solmayan UV ışınlarına karşı dayanıklı , silikon katkılı, mükemmel ...",
    "meta": [
      "Kod: 209",
      "Ambalaj: 15 L / 2,5 L / 0,75 L",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "15 L",
      "2,5 L",
      "0,75 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 209",
      "packaging": "15 L, 2,5 L, 0,75 L",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Tekboya Kartela Renkleri\n              \n              \n                \n                  Tüm renkleri gör · RAL Kartela · NCS Kartela"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama zemininin temiz ve kuru olmasına dikkat ediniz. Kuru olmayan zemine kesinlikle uygulama yapmayınız. Yüzey temizlendikten sonra yüzeye uygun su bazlı astar kullanınız. Boya uygulamasında yüzeyin özelliğine göre % 10 -15 oranında su ile inceltip homojen olana dek karıştırarak uygulayınız. Katlar arasında bekleme süresi normal koşullarda (25 ± 3 °C) 3 saattir."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak +5°C ile +35°C arasında kuru ve serin ortamda dondan korunarak depolanmalıdır. Kod: 209. TS EN ve ISO kalite belgelerine haizdir."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "210-zirve-silikonlu-grenli-dis-cephe-boyasi",
    "name": "TEK Zirve Silikonlu Grenli Dış Cephe Boyası (210)",
    "badge": "Dış Cephe Zırhı",
    "tag": "Grenli & Tekstürlü",
    "deptId": "tekExteriorPanel",
    "category": "grenli",
    "thumb": "assets/tekboya-official/210-zirve-silikonlu-grenli-dis-cephe-boyasi.webp",
    "desc": "Stiren akrilik kopolimer bağlayıcılı, su bazlı iri dokulu görünüm veren grenli dış cephe kaplamasıdır. Binanın dış yüzeylerinde ince sıva yapılmış her türlü beton, gaz beton briket, tuğla vb. duvar yüzeylerde uygula...",
    "meta": [
      "Kod: 210",
      "Ambalaj: 20 kg / 10 kg / 3,5 kg",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "20 kg",
      "10 kg",
      "3,5 kg"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 210",
      "packaging": "20 kg, 10 kg, 3,5 kg",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Stiren akrilik kopolimer bağlayıcılı, su bazlı iri dokulu görünüm veren grenli dış cephe kaplamasıdır. Binanın dış yüzeylerinde ince sıva yapılmış her türlü beton, gaz beton briket, tuğla vb. duvar yüzeylerde uygulanır"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "İlk kez uygulama yapılacak yüzeyler: Yüzey kirli ve kabarmış eski boya kalıntılarından ve kirlilikten arındırılır yüzey çok kaygan ise boyanın tutunabileceği bir yüzey hazırlanmalıdır. Eski sıvalı yüzeyde çatlak oyuk gibi olumsuzluklar giderildikten sonra uygulama yapılacak renge uygun dış cephe astarı ile yüzey astarlandıktan sonra boyama işlemine geçilir. Grenli dış cephe kaplaması tek kat olarak uygulandığından isteğe bağlı olarak uygulanacak renkle aynı olan dış cephe astarı veya uygulama yapılacak grenli dış cephe kaplaması %5-10 arasında suyla inceltilerek post rulo ile uygulanır."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak +5°C ile +35°C arasında kuru ve serin ortamda dondan korunarak depolanmalıdır. Kod: 210. TS EN ve ISO kalite belgelerine haizdir."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "101-akustik-su-bazli-parlak-ic-cephe-boyasi",
    "name": "TEK Akustik Su Bazlı Parlak İç Cephe Boyası (101)",
    "badge": "İç Cephe & Silinebilir",
    "tag": "Silikonlu & Plastik",
    "deptId": "tekInteriorPanel",
    "category": "silikonlu-ic",
    "thumb": "assets/tekboya-official/101-akustik-su-bazli-parlak-ic-cephe-boyasi.webp",
    "desc": "Reolojik/Akrilik Latex polimer bağlayıcılı, kir ve leke tutmayan, esnek, parlak iç cephe, dış cephe ve ahşap yüzeyler için geliştirilmiş global bir ürün olup, yağlı boya parlaklığında su bazlı lüks sonkat boyadır. S...",
    "meta": [
      "Kod: 101",
      "Ambalaj: 15 L / 7,5 L / 2,5 L",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "15 L",
      "7,5 L",
      "2,5 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 101",
      "packaging": "15 L, 7,5 L, 2,5 L",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Solventsiz, biocide içermez · Kokusuz, · Esnek ve çabuk kurur · Düşük VOC · Yüksek örtme gücü · Yağlı boya parlaklığında, · Parlak ve kayıcı yüzey · Leke ve kir tutmaz · Zamanla yaşlanmaz ve sararmaz · Maksimum yıkanma ve silinebilme Su buharı geçirgenliği ile terleme yapmaz · Kimyasallara ve atmosferik ortama dayanıklı · Kalıcı ve canlı renkler"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Eski boyalı zeminde duvar uygulaması: Uygulama yüzeyinde bulunan toz, kir, eski kabarmış boya kalıntıları, tebeşirlenmiş zayıf tabakalar yüzeyden uzaklaştırılmalıdır. Yüzey üzerinde seviye farkı var ise yüzey macunlanmalı ve daha sonra zımparalanarak düzeltilmelidir. Yüzeydeki tozlar alınmalı, zemin tamamen kuru ve temiz olmalıdır. Zemine uygun astar boya uygulaması yapıldıktan sonra ise Tek Akustik Su Bazlı Parlak Boya uygulanmalıdır. Ahşap yüzeylerde: zayıf veya kabarmış boya kalıntıları var ise yüzeyden uzaklaştırılmalı, çukur zeminler var ise macun ile düzeltildikten sonra zımparalanmalıdır. Uygun astar boya uygulamasının ardından ise Tek Akustik Su Bazlı Parlak Boya uygulanmalıdır. Düzgün ahşap yüzeylerde boyanın zemine yapışma değerini ve tutunma özelliğini arttırmak için yüzey ince zımpara ile hafifçe zımparalanmalı ve yüzeydeki toz alındıktan sonra ilk kat boya uygulaması için boya, en fazla %5 oranında su ile inceltilerek zemine uygulanmalıdır, ikinci kat boya uygulaması için ise boya inceltilmesine gerek duyulmamalıdır. Düzgün ve eşit parlaklıkta yüzey elde etmek için homojen bir dağılım sağlanmalıdır."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak, güneş ışığına maruz bırakmadan ve dondan koruyarak (+5 ile 35 °C) en az 2 yıl depolanabilir. Büyük ambalajlar üst üste en fazla 5 adet, küçük ambalajlar üst üste en fazla 8 adet halinde depolanmalı ve am Kod: 101. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "103-endam-dekoratif-sedef-efektli-boya",
    "name": "TEK Endam Dekoratif Sedef Efektli Boya (103)",
    "badge": "İç Cephe & Silinebilir",
    "tag": "Silikonlu & Plastik",
    "deptId": "tekInteriorPanel",
    "category": "silikonlu-ic",
    "thumb": "assets/tekboya-official/103-endam-dekoratif-sedef-efektli-boya.webp",
    "desc": "% 100 Su bazlı akrilik reçine esaslı sedef ve desenli görünümlü ipek parlak dekoratif bir boyadır. Yaşam alanı olan iç mekanlarda ışığın geliş açısına göre farklı renk ve desenli görüntü oluşturur. Su bazlı, kokusuz...",
    "meta": [
      "Kod: 103",
      "Ambalaj: 12 L / 2,5 L / 0,75 L",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "12 L",
      "2,5 L",
      "0,75 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 103",
      "packaging": "12 L, 2,5 L, 0,75 L",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Kokusuz · İpek parlaklığı · Nefes alır, dekoratiftir · Kullanıma hazır Su bazlı, kir ve leke tutmaz · Yüksek örtme gücü · Yüksek su buharı geçirgenliği Su ve alkaliye dayanıklı · Işık yansıtma özelliği · Tam yıkanabilir ve silinebilir · Farklı uygulama aparatları · Farklı desen ve renk görünümlü"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Eski boyalı yüzeylerde, var ise, duvar kâğıdı sökülmelidir. Uygulama yüzeyinde bulunan toz, kir, eski kabarmış boya kalıntıları yüzeyden uzaklaştırılmalı özellikle tebeşirlenmiş ve tozlu yüzeylerdeki gevşek boyalar temizlenmelidir. Yüzey üzerinde seviye farkı var ise, uygun macun ile düzeltilmeli ve zımparalanmalıdır. Yüzeydeki tozlar alınıp, zeminin tamamen kuru ve temiz olduğundan emin olunduktan sonra tek iç cephe astarı uygulanmalıdır. Astar uygulamasından 1 gün sonra, Tek Endam Efekt uygulaması yapılmalıdır. (pürüzsüz bir yüzeye uygulama yapılmalıdır). Seçtiğiniz rengin bir ya da iki ton açığı olan su bazlı mat boyayı, saten rulo yardımıyla duvara sürün. Boya kuruduktan sonra, saten ruloyla bir kat Tek Endam Sedef Efektli Boya sürün. Sedef boya kurumadan kristal sünger, efekt aparatıyla istenilen deseni verin."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak, güneş ışığına maruz bırakmadan ve dondan koruyarak (+5 ile 35 °C) en az 2 yıl depolanabilir. Büyük ambalajlar üst üste en fazla 5 adet, küçük ambalajlar üst üste en fazla 8 adet halinde depolanmalı ve am Kod: 103. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "105-satensi-mat",
    "name": "TEK Satensi Mat (105)",
    "badge": "İç Cephe & Silinebilir",
    "tag": "Silikonlu & Plastik",
    "deptId": "tekInteriorPanel",
    "category": "silikonlu-ic",
    "thumb": "assets/tekboya-official/105-satensi-mat.webp",
    "desc": "Stiren akrilik kopolimer bağlayıcılı su bazlı dekoratif ipek mat iç cephe boyasıdır. Yüksek dayanma gücü ve kendisine özel satensi dokusuyla gerçek ve tam silinebilme özelliğine sahiptir.Sararmayan, örtücülüğü yükse...",
    "meta": [
      "Kod: 105",
      "Ambalaj: 15 L / 7,5 L / 2,5 L",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "15 L",
      "7,5 L",
      "2,5 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 105",
      "packaging": "15 L, 7,5 L, 2,5 L",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Aromatik portakal kokulu · Tam silinebilir · Neme ve buhara dayanıklıdır · Yüksek örtme gücüne sahiptir · Dekoratiftir iyi yayılır · Yarı parlak düz görünümlüdür · Nefes alır · Canlı ve kalıcı renkler"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Kullanmadan önce iyice karıştırınız. Fırça veya rulo ile uygulayınız. Birinci ve ikinci kat için en fazla %15 oranında su ile inceltme yapılarak uygulanmalıdır. Katlar arasında bekleme süresi minimum 6 saattir. Uygulama yapılacak zeminde kir, yağ, toz veya kabarmış eski boya kalıntıları var ise tamamen temizlenmelidir. Gerekli kuruluk sağlanıyor ise zemin sağlam ise Tek Silikonlu Dolgulu Astar ile astarlanmalı, betopan alçıpan, saten alçı vb. gibi zayıf ve tozlu yüzeylerde Tek Full Saten Alçı ile yüzey doyurulduktan 1 gün sonra Tek Silikonlu Dolgulu Astar ile astarlanmalıdır."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak güneş ışığına maruz bırakmadan ve dondan koruyarak (+5 ile 35 °C) ortamda en az 2 yıl depolanabilir. Büyük ambalajlar üst üste en fazla 5 adet, küçük ambalajlar üst üste en fazla 8 adet halinde depolanmal Kod: 105. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "106-silikonlu-ipek-mat-plastik",
    "name": "TEK Silikonlu İpek Mat Plastik (106)",
    "badge": "İç Cephe & Silinebilir",
    "tag": "Silikonlu & Plastik",
    "deptId": "tekInteriorPanel",
    "category": "silikonlu-ic",
    "thumb": "assets/tekboya-official/106-silikonlu-ipek-mat-plastik.webp",
    "desc": "Stiren akrilik kopolimer bağlayıcılı, su bazlı dekoratif ipek mat iç cephe boyasıdır. Silikon ve hidron özelliği ile silinebilen ve silindikten sonra rengini koruyan, yüksek örtme gücüne sahip, ipek mat görünümlü, y...",
    "meta": [
      "Kod: 106",
      "Ambalaj: 15 L / 7,5 L / 2,5 L",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "15 L",
      "7,5 L",
      "2,5 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 106",
      "packaging": "15 L, 7,5 L, 2,5 L",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Silinir · Antibakteriyeldir · Neme ve buhara dayanıklıdır · Üstün beyazlık · Yüksek örtme gücüne sahiptir · Dekoratiftir iyi yayılır · İpek mat düz görünümlüdür · Nefes alır · Canlı ve kalıcı renkler"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Kullanmadan önce homojen olana dek karıştırınız. Boyanacak zeminin ve ortam sıcaklığının +5 ile 30 °C olmasına dikkat ediniz. Fırça veya rulo ile uygulama yapınız. İnceltme oranı: Yüzeyin özelliğine göre fırça uygulaması için %15-20, rulo uygulaması için %20-25 oranında su ile incelterek kullanınız. Zayıf ve kirli zeminlerde kir, yağ, kabarmış boya kalıntıları temizlenmeli, çatlak ve çukur zeminler düzeltildikten sonra zeminin tamamen kuru olduğundan emin olunduktan sonra Tek Silikonlu İç Cephe Örtücü Astar veya Tek Değişim Astarı ile astarlanmalıdır. Çok zayıf ve tozlu zeminlerde (alçı gibi) Tek Full Saten Alçı Astarı ile yüzey doyurulduktan 6-12 saat sonra, Tek Silikonlu İç Cephe Örtücü Astar veya Tek Değişim Astarı ile astarlandıktan 8 saat sonra boya işlemine geçilmelidir."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak güneş ışığına maruz bırakmadan ve dondan koruyarak (+5 ile 35 °C) ortamda en az 2 yıl depolanabilir. Büyük ambalajlar üst üste en fazla 5 adet, küçük ambalajlar üst üste en fazla 8 adet halinde depolanmal Kod: 106. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "107-super-plastik",
    "name": "TEK Süper Plastik (107)",
    "badge": "İç Cephe & Silinebilir",
    "tag": "Silikonlu & Plastik",
    "deptId": "tekInteriorPanel",
    "category": "silikonlu-ic",
    "thumb": "assets/tekboya-official/107-super-plastik.webp",
    "desc": "Stiren akrilik kopolimer bağlayıcılı, su bazlı dekoratif mat iç cephe boyasıdır. Silinebilen ve silindikten sonra rengini koruyan, mükemmel yapışma ve yüksek örtme gücüne sahip, mat görünümlü, su buharı geçiren ve d...",
    "meta": [
      "Kod: 107",
      "Ambalaj: 15 L / 7,5 L / 2,5 L",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "15 L",
      "7,5 L",
      "2,5 L",
      "0,75 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 107",
      "packaging": "15 L, 7,5 L, 2,5 L, 0,75 L",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Yüksek örtme gücüne sahiptir · Nefes alır · Mat düz görünümlüdür · Dekoratiftir iyi yayılır · Canlı ve kalıcı renkler · Üstün beyazlık"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Kullanmadan önce homojen olana dek karıştırınız. Uygulama yüzeyinin özelliğine göre fırça uygulaması için; % 15- 20 oranında su ile inceltip karıştırarak uygulayınız, rulo uygulaması için; % 20 -25 oranında su ile karıştırıp kullanınız. Uygulama zemininin kuru ve temiz olmasına dikkat ediniz. Kuru olmayan zemine kesinlikle uygulama yapmayınız. Betopan, alçıpan, zayıf veya kirli zemin için yüzey temizlendikten sonra Tek Değişim Astarı kullanınız."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak, güneş ışığına maruz bırakmadan ve dondan koruyarak (+5 ile 35 °C) en az 2 yıl depolanabilir. Büyük ambalajlar üst üste en fazla 5 adet, küçük ambalajlar üst üste en fazla 8 adet halinde depolanmalı ve am Kod: 107. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "108-universal-plastik",
    "name": "TEK Üniversal Plastik (108)",
    "badge": "İç Cephe & Silinebilir",
    "tag": "Silikonlu & Plastik",
    "deptId": "tekInteriorPanel",
    "category": "silikonlu-ic",
    "thumb": "assets/tekboya-official/108-universal-plastik.webp",
    "desc": "Stiren akrilik kopolimer bağlayıcılı , emülsiyon esaslı dekoratif mat iç cephe boyasıdır. Sıva beton, sunta, betopan yüzeylerde uygun astarı ile binaların iç kısımlarında kullanılır. Renk seçenekleri",
    "meta": [
      "Kod: 108",
      "Ambalaj: 15 L / 7,5 L / 2,5 L",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "15 L",
      "7,5 L",
      "2,5 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 108",
      "packaging": "15 L, 7,5 L, 2,5 L",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Yüksek örtme gücüne sahiptir · Mat düz görünümlüdür · Nefes alır · Dekoratiftir iyi yayılır · Canlı ve kalıcı renkler · Üstün beyazlık"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Kullanmadan önce homojen olana dek karıştırınız. Uygulama yüzeyinin özelliğine göre fırça uygulaması için; % 15-20 oranında su ile inceltip karıştırarak uygulayınız. rulo uygulaması için; % 20-25 oranında su ile karıştırıp kullanınız. Uygulama zemininin kuru ve temiz olmasına dikkat ediniz. Kuru olmayan zemine kesinlikle uygulama yapmayınız. Betopan, alçıpan, zayıf veya kirli zemin için yüzey temizlendikten sonra Tek Değişim Astarı kullanınız."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak güneş ışığına maruz bırakmadan ve dondan koruyarak (+5 ile 35 °C) ortamda en az 2 yıl depolanabilir. Büyük ambalajlar üst üste en fazla 5 adet, küçük ambalajlar üst üste en fazla 8 adet halinde depolanmal Kod: 108. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "109-tavan-plastik",
    "name": "TEK Tavan Plastik (109)",
    "badge": "İç Cephe & Silinebilir",
    "tag": "Tavan Boyası",
    "deptId": "tekInteriorPanel",
    "category": "tavan",
    "thumb": "assets/tekboya-official/109-tavan-plastik.webp",
    "desc": "Akrilik kopolimer bağlayıcılı, dekoratif su bazlı mat iç cephe boyasıdır. Her türlü yüzeye mükemmel yapışır, çatlama dökülme yapmaz, yüksek örtme gücü ve beyazlığı ile özel bir tavan, iç cephe boyası ve astarıdır. B...",
    "meta": [
      "Kod: 109",
      "Ambalaj: 20 kg / 10 kg / 3,5 kg",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "20 kg",
      "10 kg",
      "3,5 kg"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 109",
      "packaging": "20 kg, 10 kg, 3,5 kg",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Yüksek örtme gücüne sahiptir · Üstün be yazlık · Sararmaz · Kolay sürülür iyi yayılır · Mat düz dörünümlüdür · Nefes alır"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Kullanmadan önce iyice karıştırınız. Fırça veya rulo ile uygulayınız. Uygulanan yüzeye bağlı olarak % 15-25 oranında su ile inceltilir. Uygulama yapılacak yüzeylerde yapışmayı azaltıcı, kir, yağ, toz, eski kabarmış boyalar temizlenmelidir. Gerekli kuruluk sağlandıktan sonra düzgün yüzeylerde boya işlemine geçilir. Uygulama yüzeyi zayıf ise Tek Full Saten Alçı ile yüzey doyurulur ve 1 gün sonra boya işlemine geçilir."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak, güneş ışığına maruz bırakmadan ve dondan koruyarak (+5 ile 35 °C) en az 2 yıl depolanabilir. Büyük ambalajlar üst üste en fazla 5 adet, küçük ambalajlar üst üste en fazla 8 adet halinde depolanmalı ve am Kod: 109. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "110-zirve-silikonlu-plastik",
    "name": "TEK Zirve Silikonlu Plastik (110)",
    "badge": "İç Cephe & Silinebilir",
    "tag": "Silikonlu & Plastik",
    "deptId": "tekInteriorPanel",
    "category": "silikonlu-ic",
    "thumb": "assets/tekboya-official/110-zirve-silikonlu-plastik.webp",
    "desc": "Stiren akrilik kopolimer bağlayıcılı ,su bazlı , yarı mat dekoratif silikonlu iç cephe boyasıdır. Beton, tuğla, alçıpan, sıva vb. yapı elemanlarında iç mekanlarda kullanılır. Renk seçenekleri",
    "meta": [
      "Kod: 110",
      "Ambalaj: 20 kg / 10 kg / 3,5 kg",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "20 kg",
      "10 kg",
      "3,5 kg"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 110",
      "packaging": "20 kg, 10 kg, 3,5 kg",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Çatlama,kabarma,dökülme yapmaz · Uzun süreli beyazlık · Sararmaz · Kolay sürülür, iyi yayılır · Yarı mat düz görünümlü · Nefes alır"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Kullanmadan önce iyice karıştırınız, fırça veya rulo ile uygulayınız. Uygulama yapılan yüzeye bağlı olarak % 10-20 oranında su ile inceltilir. Uygulama yüzeyinde yapışmayı azaltıcı her türlü yağ, kir, toz veya kabarmış, gevşek eski boya kalıntılarından arındırılarak temizlik ve kuruluk sağlanmalıdır. Uygulama yapılacak yüzey gevşek ve zayıf bir zemin ise Tek Full Saten Alçı ile yüzey iyice doyurulmalı, en az 6 saat sonra boya uygulamasına geçilmelidir."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak güneş ışığına maruz bırakmadan ve dondan koruyarak (+5 ile 35°C) ortamda en az 2 yıl depolanabilir. Büyük ambalajlar üst üste en fazla 5 adet, küçük ambalajlar üst üste en fazla 8 adet halinde depolanmalı Kod: 110. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "111-zirve-plastik",
    "name": "TEK Zirve Plastik (111)",
    "badge": "İç Cephe & Silinebilir",
    "tag": "Silikonlu & Plastik",
    "deptId": "tekInteriorPanel",
    "category": "silikonlu-ic",
    "thumb": "assets/tekboya-official/111-zirve-plastik.webp",
    "desc": "Akrilik kopolimer bağlayıcılı, su bazlı ipek mat dekoratif iç cephe boyasıdır. Çatlama dökülme yapmayan her türlü yüzeye mükemmel yapışan, nefes alabilme özelliği ile sağlıklı iç cephe boya ve astarıdır. Beton, tuğl...",
    "meta": [
      "Kod: 111",
      "Ambalaj: 20 kg / 10 kg / 3,5 kg",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "20 kg",
      "10 kg",
      "3,5 kg"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 111",
      "packaging": "20 kg, 10 kg, 3,5 kg",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Yüksek örtme gücüne sahiptir · Üstün beyazlık · Kolay sürülür iyi yayılır · İpek mat düz görünümlüdür · Nefes alır"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Kullanmadan önce iyice karıştırınız, fırça veya rulo ile uygulayınız. Uygulama yapılan yüzeye bağlı olarak % 10-20 oranında su ile inceltilir. Uygulama yüzeyinde yapışmayı azaltıcı her türlü yağ, kir, toz veya kabarmış, gevşek eski boya kalıntılarından arındırılarak temizlik ve kuruluk sağlanmalıdır. Uygulama yapılacak yüzey gevşek ve zayıf bir zemin ise Tek İzolan Astarı 1/7 oranında inceltilerek uygulanmalı ve yüzey iyice doyurulmalıdır."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak güneş ışığına maruz bırakmadan ve dondan koruyarak (+5 ile 35 °C) ortamda en az 2 yıl depolanabilir. Büyük ambalajlar üst üste en fazla 5 adet, küçük ambalajlar üst üste en fazla 8 adet halinde depolanmal Kod: 111. TS EN ve ISO standartlarına tam uyumludur."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "112-zirve-plastik-tavan-boyasi",
    "name": "TEK Zirve Plastik Tavan Boyası (112)",
    "badge": "İç Cephe & Silinebilir",
    "tag": "Tavan Boyası",
    "deptId": "tekInteriorPanel",
    "category": "tavan",
    "thumb": "assets/tekboya-official/112-zirve-plastik-tavan-boyasi.webp",
    "desc": "Stiren akrilik kopolimer bağlayıcılı, su bazlı (emülsiyon esaslı) dekoratif mat iç cephe tavan boyasıdır. Kullanım Alanları: Sıva, eski boyalı yüzeylerde binaların iç cephe duvar ve tavanlarında, sunta, betopan, gib...",
    "meta": [
      "Kod: 112",
      "Ambalaj: 20 kg / 10 kg / 3,5 kg",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "20 kg",
      "10 kg",
      "3,5 kg"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 112",
      "packaging": "20 kg, 10 kg, 3,5 kg",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Kullanım · Alanları:"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama zemininin temiz ve kuru olmasına dikkat ediniz. Kuru olmayan zemine kesinlikle uygulama yapmayınız. Uygulamada yüzeyin özelliğine göre % 5-10 oranında su ile inceltip homojen olana dek karıştırarak uygulayınız. Katlar arasında bekleme süresi normal koşullarda (25 ± 3 °C) 3 saattir. Önerilen kat sayısı 2`dir. Uygulama Sıcaklığı: +5 ile 25 °C’ dir. Kuruma Süresi: % 50-60 Bağıl nemli +5 ile 25 °C ‘de. Dokunma Kuruması: 1 Saat Tam Kuruma: 24 Saat Kaplama Gücü: 1 lt boya ile zemine ve uygulama kalınlığına bağlı olarak 5-7 m² alan, 1 kg boya ile 4-6 m² alan kaplar."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak +5°C ile +35°C arasında kuru ve serin ortamda dondan korunarak depolanmalıdır. Kod: 112. TS EN ve ISO kalite belgelerine haizdir."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "113-mukavim-son-kat-su-bazli-yagli-boya",
    "name": "TEK Mukavim Son Kat Su Bazlı Yağlı Boya (113)",
    "badge": "İç Cephe & Silinebilir",
    "tag": "Mukavim Su Bazlı",
    "deptId": "tekInteriorPanel",
    "category": "mukavim",
    "thumb": "assets/tekboya-official/113-mukavim-son-kat-su-bazli-yagli-boya.webp",
    "desc": "Saf akrilik reçine esaslı, kir ve leke tutmayan, esnek, parlak iç cephe, dış cephe ve ahşap yüzeyler için geliştirilmiş global bir ürün olup, yağlı boya parlaklığında su bazlı lüks son kat boyadır.Su bazlı olup, sağ...",
    "meta": [
      "Kod: 113",
      "Ambalaj: 15 L / 7,5 L / 2,5 L",
      "1 kg: 450 ₺ · Galon: 1.300 ₺"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "15 L",
      "7,5 L",
      "2,5 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 113",
      "packaging": "15 L, 7,5 L, 2,5 L",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Yağlı boya parlaklığında · Solventsiz · Leke ve kir tutmaz · Esnek · Uzun yıllar canlılığını korur · Kokusuz · Çabuk kurur"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Eski boyalı zeminde duvar uygulaması: Uygulama yüzeyinde bulunan toz, kir, eski kabarmış boya kalıntıları, tebeşirlenmiş zayıf tabakalar yüzeyden uzaklaştırılmalıdır. Yüzey üzerinde seviye farkı var ise yüzey macunlanmalı ve daha sonra zımparalanarak düzeltilmelidir. Yüzeydeki tozlar alınmalı, zemin tamamen kuru ve temiz olmalıdır. Zemine uygun astar boya uygulaması yapıldıktan sonra ise Tek Akustik Su Bazlı Parlak Boya uygulanmalıdır. Ahşap yüzeylerde: zayıf veya kabarmış boya kalıntıları var ise yüzeyden uzaklaştırılmalı, çukur zeminler var ise macun ile düzeltildikten sonra zımparalanmalıdır. Uygun astar boya uygulamasının ardından ise Tek Akustik Su Bazlı Parlak Boya uygulanmalıdır. Düzgün ahşap yüzeylerde boyanın zemine yapışma değerini ve tutunma özelliğini arttırmak için yüzey ince zımpara ile hafifçe zımparalanmalı ve yüzeydeki toz alındıktan sonra ilk kat boya uygulaması için boya, en fazla %5 oranında su ile inceltilerek zemine uygulanmalıdır, ikinci kat boya uygulaması için ise boya inceltilmesine gerek duyulmamalıdır. Düzgün ve eşit parlaklıkta yüzey elde etmek için homojen bir dağılım sağlanmalıdır."
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak +5°C ile +35°C arasında kuru ve serin ortamda dondan korunarak depolanmalıdır. Kod: 113. TS EN ve ISO kalite belgelerine haizdir."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "114-endam-silikonlu-ipek-mat",
    "name": "TEK Endam Silikonlu İpek Mat (114)",
    "badge": "İç Cephe & Silinebilir",
    "tag": "Silikonlu & Plastik",
    "deptId": "tekInteriorPanel",
    "category": "silikonlu-ic",
    "thumb": "assets/tekboya-official/114-endam-silikonlu-ipek-mat.webp",
    "desc": "Stiren akrilik kopolimer bağlayıcılı, silikon ve hydron katkılı, su bazlı, ipek mat görünümlü, dekoratif iç cephe boyasıdır. Özel olarak geliştirilen Endam Silikonlu İpek Mat, yüksek örtücülükte, nefes alabilen ve ü...",
    "meta": [
      "Kod: 114",
      "Ambalaj: 15 L / 2,5 L / 0,75 L",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "15 L",
      "2,5 L",
      "0,75 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 114",
      "packaging": "15 L, 2,5 L, 0,75 L",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Özel geliştirilmiş hydron ve silikon katkılı · Yüksek örtme gücü · Dekoratif · Kokusuz · Üstün beyazlık · Canlı ve kalıcı renkler · Kolay sürülür, iyi yayılır · Hızlı kuruma · Silinebilme özelliği · Hibrit mat"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Desteklenen kartelalar"
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak +5°C ile +35°C arasında kuru ve serin ortamda dondan korunarak depolanmalıdır. Kod: 114. TS EN ve ISO kalite belgelerine haizdir."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  },
  {
    "id": "129-boyalux-plastik-ic-cephe-boyasi",
    "name": "TEK Boyalüx Plastik İç Cephe Boyası (129)",
    "badge": "İç Cephe & Silinebilir",
    "tag": "Silikonlu & Plastik",
    "deptId": "tekInteriorPanel",
    "category": "silikonlu-ic",
    "thumb": "assets/tekboya-official/129-boyalux-plastik-ic-cephe-boyasi.webp",
    "desc": "Stiren akrilik kopolimer bağlayıcılı, su bazlı, dekoratif iç cephe boyasıdır. Nefes alabilme özelliği yüksek plastik boyadır. Kullanım Yerleri: Beton, tuğla, alçıpan, sıva vb. yapı elemanlarında iç mekanlarda kullan...",
    "meta": [
      "Kod: 129",
      "Ambalaj: 15 L / 2,5 L / 0,75 L",
      "Fabrika Stok Teslim"
    ],
    "coverage": "~10-14 m²/L (Tek Kat)",
    "sizes": [
      "15 L",
      "2,5 L",
      "0,75 L"
    ],
    "specs": {
      "standard": "TS EN Standart · Kod: 129",
      "packaging": "15 L, 2,5 L, 0,75 L",
      "consumption": "~10-14 m²/L (Tek Kat)",
      "mixingRatio": "%5 - %10 Su / Tiner ile inceltme",
      "potLife": "Dokunma: 1-2 sa · Tam Kuruma: 24 sa",
      "logistics": "Balçova Showroom & Urla Ana Depo Stok"
    },
    "accordions": [
      {
        "title": "Öne Çıkan Özellikler & Avantajlar",
        "body": "Dekoratiftir · Yüksek örtme gücüne sahiptir · Kolay sürülür · İyi yayılır · Üstün beyazlık · Nefes alır"
      },
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Sabit renkler"
      },
      {
        "title": "Teknik Özellikler & Depolama",
        "body": "Orijinal ambalajında kapağı tam kapalı olarak +5°C ile +35°C arasında kuru ve serin ortamda dondan korunarak depolanmalıdır. Kod: 129. TS EN ve ISO kalite belgelerine haizdir."
      },
      {
        "title": "Lojistik & Şantiye Dağıtımı",
        "body": "Pervan Balçova Showroom ve Urla Ana Lojistik Deposu üzerinden aynı gün elden teslim veya Yarımada şantiyelerine (Urla, Çeşme, Alaçatı, Güzelbahçe, Seferihisar, Karaburun) kendi filomuzla paletli ve araçlı adrese teslimat imkanı."
      }
    ]
  }
];

  var DEPARTMENTS_DATA = [
  {
    "id": "tekWoodVernikPanel",
    "short": "Ahşap & Yat Vernik",
    "full": "Ahşap Koruyucu, Marin Yat Vernik & Cam Cila",
    "sub": "Özel Yat Vernik (403), Cam Cila (404), Aqualife (102), Teak Yağı ve Panel Kapı",
    "pillsId": "tekWoodPills",
    "badge": "Marin & Ahşap Koruma Grubu",
    "summaryTitle": "TEK Boya Marin Yat Vernikleri, Cam Cila ve Su Bazlı Ahşap Sistemleri",
    "summaryDesc": "Ege güneşi, tuzlu deniz suyu ve yoğun UV ışınlarına karşı sararmayan polimerik marin reçineli Özel Yat Vernik (403), yüksek çizilme dirençli Cam Cila (404), su bazlı nefes alan Aqualife ahşap koruyucular ve Amerikan panel kapı boyaları.",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5\"/></svg>",
    "pills": [
      [
        "Yat Vernik & Cila",
        "yat-vernik",
        true
      ],
      [
        "Ahşap Koruyucu & Teak",
        "ahsap-koruyucu",
        false
      ],
      [
        "Panel Kapı Boyası",
        "panel-kapi",
        false
      ]
    ]
  },
  {
    "id": "tekInteriorPanel",
    "short": "İç Cephe & Tavan",
    "full": "İç Cephe, Mukavim Silinebilir & Tavan Boyaları",
    "sub": "Mukavim Su Bazlı (113), Satensi Mat (105), İpek Mat Plastik (106), Tavan (109)",
    "pillsId": "tekInteriorPills",
    "badge": "İç Cephe & Silinebilir Grubu",
    "summaryTitle": "TEK Mukavim Kokusuz Su Bazlı Yağlı Boya & Mimari İç Cephe Koleksiyonu",
    "summaryDesc": "Yeni nesil kokusuz, leke tutmayan ve tam silinebilir Mukavim su bazlı yağlı boya (113), ipeksi mat iç cephe plastik boyaları, sedef efektli dekoratif kaplamalar ve yüksek örtücülü tavan boyaları.",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"/><polyline points=\"9 22 9 12 15 12 15 22\"/></svg>",
    "pills": [
      [
        "Mukavim Su Bazlı",
        "mukavim",
        true
      ],
      [
        "Silikonlu & Plastik",
        "silikonlu-ic",
        false
      ],
      [
        "Tavan Boyası",
        "tavan",
        false
      ]
    ]
  },
  {
    "id": "tekExteriorPanel",
    "short": "Dış Cephe & Akrilik",
    "full": "Dış Cephe, Silikonlu & Grenli Koruyucu Kaplamalar",
    "sub": "Blissful Canlı Parlak (201), Flexible Mat (202), Grenli (205), Taş Vernik (208)",
    "pillsId": "tekExteriorPills",
    "badge": "Dış Cephe & Ağır İklim Zırhı",
    "summaryTitle": "Ege & Akdeniz İklimine Özel Yüksek UV ve Tuz Dirençli Dış Cephe Sistemleri",
    "summaryDesc": "Yoğun güneş ışınları, nem ve sahil tuzu serpintisine karşı solmayan Blissful canlı parlak (201), kılcal çatlakları köprüleyen Flexible mat (202), grenli tekstürlü kaplamalar ve doğal taş vernikleri.",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"2\" y=\"2\" width=\"20\" height=\"20\" rx=\"3\"/><path d=\"M7 2v20M17 2v20M2 12h20\"/></svg>",
    "pills": [
      [
        "Saf Akrilik & Silikonlu",
        "akrilik-silikonlu",
        true
      ],
      [
        "Grenli & Tekstürlü",
        "grenli",
        false
      ],
      [
        "Elastomerik Dış Cephe",
        "elastomerik",
        false
      ]
    ]
  },
  {
    "id": "tekSyntheticPanel",
    "short": "Sentetik & Metal",
    "full": "Zirve Sentetik, Yağlı Boya & Antipas Grubu",
    "sub": "Zirve Sentetik (306), Zirve Antipas (307), Süper Lüks Parlak (302), Saten (301)",
    "pillsId": "tekSyntheticPills",
    "badge": "Metal & Ahşap Koruma Grubu",
    "summaryTitle": "Zirve Parlak Sentetik Yağlı Boyalar & Korozyon Önleyici Pas Astarları",
    "summaryDesc": "Demir, çelik konstrüksiyon, kapı, parmaklık ve ahşap doğramalar için sararmayan, yüksek örtücülük ve ayna parlaklığı sunan Zirve sentetik serisi, pas önleyici antipas ve saten boyalar.",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94\"/></svg>",
    "pills": [
      [
        "Sentetik Yağlı Boya",
        "sentetik-yagli",
        true
      ],
      [
        "Antipas Pas Önleyici",
        "antipas",
        false
      ],
      [
        "Çekiçlenmiş & Özel",
        "ozel-metal",
        false
      ]
    ]
  },
  {
    "id": "tekPrimersPanel",
    "short": "Astarlar & Macun",
    "full": "İzolan Astar, Brüt Beton & Yüzey Hazırlığı",
    "sub": "İzolan Astar (506), Brüt Beton (504), Su Kes (507), Değişim Astarı (505)",
    "pillsId": "tekPrimersPills",
    "badge": "Yüzey Hazırlığı & Aderans Grubu",
    "summaryTitle": "Boya Sarfiyatını Düşüren, Tozuma Önleyici ve Su Yalıtımlı Profesyonel Astarlar",
    "summaryDesc": "Yüzey tozumalarını kilitleyip boya tüketimini %40 azaltan mikro emülsiyon İzolan Astar (506), pürüzsüz tutunma sağlayan polimerik Brüt Beton Astarı (504) ve su sızıntılarını kesen elyaflı astarlar.",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z\"/><polyline points=\"14 2 14 8 20 8\"/><line x1=\"16\" y1=\"13\" x2=\"8\" y2=\"13\"/><line x1=\"16\" y1=\"17\" x2=\"8\" y2=\"17\"/></svg>",
    "pills": [
      [
        "İzolan & Şeffaf Astar",
        "izolan-astar",
        true
      ],
      [
        "Brüt Beton & Dönüşüm",
        "beton-astar",
        false
      ],
      [
        "Macun & Dolgu",
        "macun",
        false
      ]
    ]
  },
  {
    "id": "tekIndustrialSpecialPanel",
    "short": "Endüstriyel & Yol Çizgi",
    "full": "Yol Çizgi, Epoksi, Yaldız & Özel Çözümler",
    "sub": "Klor Kauçuk Yol Çizgi (703), Endüstriyel Astar (701), Son Kat (702), Yaldız (601-604)",
    "pillsId": "tekIndustrialPills",
    "badge": "Ağır Hizmet & Endüstriyel Seri",
    "summaryTitle": "Karayolu & Otopark Yol Çizgi Boyaları, Endüstriyel Rapid Astarlar ve Yaldızlar",
    "summaryDesc": "Aşınma ve araç trafiğine tam dayanımlı Klor Kauçuk Yol Çizgi Boyası (703), hızlı kuruyan endüstriyel fırın/hava kurumalı rapid astarlar ve yüksek sıcaklığa dayanıklı metalik yaldız boyaları.",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"22 12 18 12 15 21 9 3 6 12 2 12\"/></svg>",
    "pills": [
      [
        "Yol Çizgi Boyası",
        "yol-cizgi",
        true
      ],
      [
        "Epoksi & Zemin",
        "epoksi-zemin",
        false
      ],
      [
        "Yaldız & Isıya Dayanıklı",
        "yaldiz-ozel",
        false
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

  var panels = {};
  DEPARTMENTS_DATA.forEach(function(d) {
    panels[d.id] = document.getElementById(d.id);
  });

  var currentActiveTab = "tekWoodVernikPanel";
  var currentProduct = null;
  var selectedSize = null;

  function getHeaderHeight() {
    if (!header) return 60;
    return header.offsetHeight || 60;
  }

  function getSubnavOrigin() {
    if (!spacer) return 0;
    var rect = spacer.getBoundingClientRect();
    return rect.top + (window.pageYOffset || document.documentElement.scrollTop);
  }

  var initialSubnavTop = 0;
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

  window.pvCatalogSwitchTab = switchTab;

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

  if (deptTrigger) deptTrigger.addEventListener("click", openDeptDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener("click", closeDeptDrawer);

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
  var modalWABtn = document.getElementById("modalWABtn");

  function openModal(productId) {
    var p = TEK_PRODUCTS_DATA.find(function(item) { return item.id === productId; });
    if (!p) return;
    currentProduct = p;

    if (modalProductEyebrow) modalProductEyebrow.textContent = p.badge || "TEK BOYA YETKİLİ BAYİ";
    if (modalProductTitle) modalProductTitle.textContent = p.name;
    if (modalProductImg) {
      modalProductImg.src = p.thumb;
      modalProductImg.alt = p.name;
    }
    if (modalProductDesc) modalProductDesc.textContent = p.desc;

    // Segmented Size / Litraj Track
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

    // Gauges & Specs
    if (modalSpecStandard) modalSpecStandard.textContent = p.specs.standard || "TS EN Standart";
    if (modalSpecConsumption) modalSpecConsumption.textContent = p.coverage || "~10-14 m²/L";
    if (modalSpecPackaging) modalSpecPackaging.textContent = p.specs.packaging || "Standart";
    if (modalSpecStandardRow) modalSpecStandardRow.textContent = p.specs.standard || "-";
    if (modalSpecPackagingRow) modalSpecPackagingRow.textContent = p.specs.packaging || "-";
    if (modalSpecMixing) modalSpecMixing.textContent = p.specs.mixingRatio || "%5 - %10 Su / Tiner ile inceltme";
    if (modalSpecPotLife) modalSpecPotLife.textContent = p.specs.potLife || "Dokunma: 1-2 sa · Tam Kuruma: 24 sa";
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
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove("is-open");
    modalBackdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    resetSheetStyles();

    if (window.history && window.history.replaceState) {
      window.history.replaceState({}, "", "/tek-boya.html");
    }
  }

  function updateWhatsAppUrl() {
    if (!currentProduct || !modalWABtn) return;
    var text = "Merhaba, Pervan TEK Boya Yetkili Bayi çıkışlı " + currentProduct.name;
    if (selectedSize) {
      text += " (" + selectedSize + ")";
    }
    text += " için güncel bayi liste fiyatı, stok durumu ve sevkiyat hakkında bilgi almak istiyorum.";
    text += "\n\nÜrün Detayı: https://pervanyapi.com/urun/" + currentProduct.id + ".html";
    modalWABtn.href = "https://wa.me/905323844497?text=" + encodeURIComponent(text);
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

  // Row click listeners
  document.querySelectorAll(".pv-menu-row").forEach(function(row) {
    row.addEventListener("click", function() {
      var pid = row.getAttribute("data-id") || row.getAttribute("data-product-id");
      if (pid) openModal(pid);
    });
    row.addEventListener("keydown", function(e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        var pid = row.getAttribute("data-id") || row.getAttribute("data-product-id");
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
    return d ? d.short : "TEK Boya";
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

    var featured = TEK_PRODUCTS_DATA.slice(0, 8);
    var heading = document.createElement("div");
    heading.className = "pv-spotlight-group-title";
    heading.textContent = "Öne Çıkan TEK Boya Ürünleri";
    spotlightResults.appendChild(heading);

    featured.forEach(function(item) {
      spotlightResults.appendChild(createSpotlightItemEl(item));
    });

    if (spotlightCount) {
      spotlightCount.textContent = TEK_PRODUCTS_DATA.length + " Ürün Kataloğu";
    }
    attachSpotlightItemEvents();
  }

  function createSpotlightItemEl(item) {
    var div = document.createElement("div");
    div.className = "pv-spotlight-item";
    div.setAttribute("data-id", item.id);
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
    var matches = TEK_PRODUCTS_DATA.filter(function(item) {
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
        '<p class="pv-spotlight-empty-title">\"' + query + '\" için ürün bulunamadı</p>',
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
        var pid = item.getAttribute("data-id") || item.getAttribute("data-product-id");
        closeSpotlight();
        var p = TEK_PRODUCTS_DATA.find(function(it) { return it.id === pid; });
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

  // Deep linking via URL query or hash
  function checkDeepLink() {
    var params = new URLSearchParams(window.location.search);
    var targetId = params.get("item") || params.get("product") || params.get("id");
    if (!targetId && window.location.hash && window.location.hash.indexOf("#urun-") === 0) {
      targetId = window.location.hash.replace("#urun-", "");
    }
    if (targetId) {
      var p = TEK_PRODUCTS_DATA.find(function(it) { return it.id === targetId; });
      if (p) {
        if (p.deptId && typeof switchTab === "function" && p.deptId !== currentActiveTab) {
          switchTab(p.deptId);
        }
        openModal(targetId);
      }
    }
  }

  checkDeepLink();
  window.addEventListener("popstate", checkDeepLink);

  // INITIAL SETUP
  renderDeptDrawer("tekWoodVernikPanel");
  syncMobileFilterRail("tekWoodVernikPanel");
})();
