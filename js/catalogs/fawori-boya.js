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

    var activeHex = slides[index].getAttribute("data-code") || '#DB2777';

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

  // Native Kinetic Scroll
  track.addEventListener("scroll", function() {
    var slideWidth = track.clientWidth;
    if (!slideWidth) return;

    var nearestIndex = Math.round(track.scrollLeft / slideWidth);
    if (nearestIndex !== currentIndex && nearestIndex >= 0 && nearestIndex < totalSlides) {
      syncActiveState(nearestIndex);
    }
  }, { passive: true });

  if (prevBtn) {
    prevBtn.addEventListener("click", function(e) {
      e.preventDefault();
      goToSlide(currentIndex - 1);
      restartAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function(e) {
      e.preventDefault();
      goToSlide(currentIndex + 1);
      restartAutoPlay();
    });
  }

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
  var FAWORI_PRODUCTS_DATA = [
  {
    "id": "dis-cephe-rulosu",
    "url": "https://fawori.com/urunler/dis-cephe-boya-rulolari/dis-cephe-rulosu",
    "name": "Dış Cephe Rulosu",
    "deptId": "faworiSupportPanel",
    "category": "rulo",
    "badge": "Uygulama Rulosu",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/dis-cephe-rulosu.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1770878224/FAWORI/dis_cephe_rulo_f9cdf91f9d.jpg",
    "desc": "» İlk defa boyanacak yüzeylerde kullanılması önerilir. » Sarı-yeşil çizgilidir. » %100 polyamid kumaşdır. » Su bazlı ve sentetik boyalarda kullanılır.",
    "meta": [],
    "coverage": "Standart Sarfiyat",
    "sizes": [
      "Standart Ambalaj"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "Standart Ambalaj",
      "consumption": "Uygulama yüzeyi ve kat sayısına bağlıdır",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "fawori-premium-dis-cephe-astari",
    "url": "https://fawori.com/urunler/dis-cephe-urun-grubu/fawori-premium-dis-cephe-astari",
    "name": "Fawori Premium Dış Cephe Astarı",
    "deptId": "faworiExteriorPanel",
    "category": "astar-dis",
    "badge": "Dış Cephe Astarı",
    "tag": "Boya ile yüzey arasında bağlayıcı köprü kurar",
    "thumb": "assets/fawori/fawori-premium-dis-cephe-astari.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1774350512/FAWORI/premium_astar_d6d221d6cf.jpg",
    "desc": "Silikonlu, akrilik kopolimer emülsiyon esaslı dış cephe astarıdır. Brüt beton, düz veya pürüzlü her cins sıvalı, mineral esaslı yüzeylerde, rengini kaybetmiş kendini taşıyabilen silikon veya akrilik esaslı boyalı yüzeylerde astar olarak kullanılır.",
    "meta": [
      "Boya ile yüzey arasında bağlayıcı köprü kurar",
      "Aderansı arttırır",
      "Boya sarfiyatını azaltır"
    ],
    "coverage": "4,5 – 7,7 m²/kg",
    "sizes": [
      "20kg",
      "10kg",
      "3",
      "5kg"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "20kg-10kg-3,5kg",
      "consumption": "4,5 – 7,7 m²/kg",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "fawori-premium-silikonlu--dis-cephe-boyasi",
    "url": "https://fawori.com/urunler/dis-cephe-urun-grubu/fawori-premium-silikonlu--dis-cephe-boyasi",
    "name": "Fawori Premium Silikonlu Dış Cephe Boyası",
    "deptId": "faworiExteriorPanel",
    "category": "silikonlu-dis",
    "badge": "Silikonlu Dış Cephe",
    "tag": "Silikonlu",
    "thumb": "assets/fawori/fawori-premium-silikonlu--dis-cephe-boyasi.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1774350710/FAWORI/premium_078c270f6e.jpg",
    "desc": "Akrilik kopolimer emülsiyon esaslı mat görünümlü son kat dış cephe boyasıdır. Sıva, serpme sıva, tarak mozaik, beton, brüt beton, betopan, mdf, OSB, rengini kaybetmiş kendini taşıyabilen eski boyalı, terasit tipi yüzeylerde uygulanır.",
    "meta": [
      "Silikonlu",
      "Mat görünümlü",
      "Canlı renklere sahip"
    ],
    "coverage": "7-11 m²/L",
    "sizes": [
      "15L",
      "7",
      "5L",
      "2",
      "5L"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "15L – 7,5L – 2,5L",
      "consumption": "7-11 m²/L",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "fawori-silikonlu-grenli-kaplama",
    "url": "https://fawori.com/urunler/dis-cephe-urun-grubu/fawori-silikonlu-grenli-kaplama",
    "name": "Fawori Silikonlu Grenli Kaplama",
    "deptId": "faworiExteriorPanel",
    "category": "grenli-tekstur",
    "badge": "Grenli Dış Kaplama",
    "tag": "Silikonlu",
    "thumb": "assets/fawori/fawori-silikonlu-grenli-kaplama.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1774350476/FAWORI/silikonlu_grenli_83d8891aa6.jpg",
    "desc": "Akrilik kopolimer emülsiyon esaslı, silikon katkılı, rulo ile uygulanan ve mercan rulo ile desen verilen son kat grenli dış cephe kaplamasıdır. Sıva, beton, brüt beton, betopan, MDF, OSB, rengini kaybetmiş kendini taşıyabilen eski boyalı yüzeylerde uygulanır.",
    "meta": [
      "Silikonlu",
      "Mat görünümlü",
      "Su itici"
    ],
    "coverage": "0,75 – 1,1 m²/kg",
    "sizes": [
      "25kg"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "25kg",
      "consumption": "0,75 – 1,1 m²/kg",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "fenomen-saf-akrilik-dis-cephe-boyasi",
    "url": "https://fawori.com/urunler/dis-cephe-urun-grubu/fenomen-saf-akrilik-dis-cephe-boyasi",
    "name": "Fenomen Saf Akrilik Dış Cephe Boyası",
    "deptId": "faworiExteriorPanel",
    "category": "akrilik-saf",
    "badge": "Saf Akrilik Dış Cephe",
    "tag": "%100 Saf Akrilik",
    "thumb": "assets/fawori/fenomen-saf-akrilik-dis-cephe-boyasi.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1774350997/FAWORI/fenomen_9912708d5b.jpg",
    "desc": "%100 saf akrilik, esnek yapıda (elastomerik), ipeksi mat dokuda, extra su itici dış cephe boyasıdır. Sıva, serpme sıva, tarak moza­k, s­ilme moza­k, beton, brüt beton, betopan, MDF, OSB, mineral esaslı son kat dekoratif kaplamalar, son kat silikonlu dekoratif kaplamalar, reng­ini­ kaybetmi­ş, kendini­ taşıyabi­len eski­ boyalı, terasi­t ti­pi­ yüzeylere uygulanabi­li­r.",
    "meta": [
      "%100 Saf Akrilik",
      "İpek mat görünümlü",
      "Göz alıcı, parlak renklere sahip"
    ],
    "coverage": "7-12 m²/L",
    "sizes": [
      "15 L"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "15 L",
      "consumption": "7-12 m²/L",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "tempo-akrilik-dis-cephe-boyasi",
    "url": "https://fawori.com/urunler/dis-cephe-urun-grubu/tempo-akrilik-dis-cephe-boyasi",
    "name": "Tempo Akrilik Dış Cephe Boyası",
    "deptId": "faworiExteriorPanel",
    "category": "silikonlu-dis",
    "badge": "Silikonlu Dış Cephe",
    "tag": "Yüksek aderans gücü sayesinde yüzeylere maksimum tutunma sağlar.",
    "thumb": "assets/fawori/tempo-akrilik-dis-cephe-boyasi.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1774349297/FAWORI/akrilik_dis_cephe_3dfa606960.jpg",
    "desc": "Akrilik kopolimer emülsiyon esaslı, mat görünümlü, UV ısınlarına dayanıklı, dekoratif, son kat dış cephe boyasıdır. Sıva, beton, serpme sıva, brüt beton, betopan, OSB, MDF ve mineral yüzeylerde, ayrıca yenileme için rengini kaybetmiş, kendini taşıyabilen silikon veya akrilik esaslı boyaların üzerine uygulanabilir.",
    "meta": [
      "Yüksek aderans gücü sayesinde yüzeylere maksimum tutunma sağlar.",
      "UV direnci ve iklim koşullarına dayanım sağlar.",
      "Nefes alma kabiliyeti sayesinde yüzeyde oluşan nemin dışarı atılmasını sağlar."
    ],
    "coverage": "6,5 m²/kg",
    "sizes": [
      "20 kg"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "20 kg",
      "consumption": "6,5 m²/kg",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "tempo-brut-beton-astari",
    "url": "https://fawori.com/urunler/dis-cephe-urun-grubu/tempo-brut-beton-astari",
    "name": "Tempo Brüt Beton Astarı",
    "deptId": "faworiExteriorPanel",
    "category": "astar-dis",
    "badge": "Dış Cephe Astarı",
    "tag": "Brüt beton duvar, kolon, tavan gibi yüzeylerde aderans arttırıcı olarak kullanılır.",
    "thumb": "assets/fawori/tempo-brut-beton-astari.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1774349504/FAWORI/brut_beton_astari_7e00825e6d.jpg",
    "desc": "Brüt beton üzerine yapılacak alçı ve çimento esaslı sıva uygulamalarından önce yüzey aderansını artırmak amacıyla kullanılan polimer modifiye reçine esaslı iç/dış cephe astarıdır. Brüt beton yüzeylere alçı ve çimento esaslı harç uygulanmasından önce uygulanır.",
    "meta": [
      "Brüt beton duvar, kolon, tavan gibi yüzeylerde aderans arttırıcı olarak kullanılır.",
      "Üzerine uygulanacak ürünün performansını olumlu yönde etkiler.",
      "Brüt beton üzerine yapılacak alçı ve çimento esaslı sıva uygulamalarından önce yüzey aderansını artırmak amacıyla kullanılmaktadır."
    ],
    "coverage": "4 – 4,5 m²/kg",
    "sizes": [
      "12 kg"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "12 kg",
      "consumption": "4 – 4,5 m²/kg",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "tempo-ozel-teksturlu-dis-cephe-kaplamasi",
    "url": "https://fawori.com/urunler/dis-cephe-urun-grubu/tempo-ozel-teksturlu-dis-cephe-kaplamasi",
    "name": "Tempo Özel Tekstürlü Dış Cephe Kaplaması",
    "deptId": "faworiExteriorPanel",
    "category": "grenli-tekstur",
    "badge": "Grenli Dış Kaplama",
    "tag": "İçerdiği özel elyaf sayesinde atmosfer koşullarına, kirliliğe, U.V. ışınlarına dayanıklıdır.",
    "thumb": "assets/fawori/tempo-ozel-teksturlu-dis-cephe-kaplamasi.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1774349444/FAWORI/ozel_tekstur_dis_cephe_kaplamasi_d19cf36ec0.jpg",
    "desc": "Akrilik kopolimer esaslı, elyaf katkılı ve silikonlu, dekoratif, tekstürlü dış cephe kaplamasıdır. Kendini taşıyabilen sıva, beton , OSB, MDF , ve diğer mineral yüzeylere, eski boyalı yüzeylere desen vermek amacıyla veya dekoratif amaçla uygulanır.",
    "meta": [
      "İçerdiği özel elyaf sayesinde atmosfer koşullarına, kirliliğe, U.V. ışınlarına dayanıklıdır.",
      "Nefes alma yeteneğine sahip olup, duvardaki nemin dışarı atılmasına yardımcı olur.",
      "Su itici özelliği sayesinde suya karşı dirençlidir."
    ],
    "coverage": "0,7 – 1,1 m²/kg",
    "sizes": [
      "20 kg"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "20 kg",
      "consumption": "0,7 – 1,1 m²/kg",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "tempo-silikonlu-dis-cephe-astari",
    "url": "https://fawori.com/urunler/dis-cephe-urun-grubu/tempo-silikonlu-dis-cephe-astari",
    "name": "Tempo Silikonlu Dış Cephe Astarı",
    "deptId": "faworiExteriorPanel",
    "category": "astar-dis",
    "badge": "Dış Cephe Astarı",
    "tag": "Aderans gücü yüksektir, boya ile yüzey arasında bağlayıcı köprü kurar.",
    "thumb": "assets/fawori/tempo-silikonlu-dis-cephe-astari.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1774349473/FAWORI/silikonlu_dis_cephe_astari_22edb0937a.jpg",
    "desc": "Silikon ve akrilik emülsiyon esaslı, pigmentli, aderans gücü yüksek, yapı son kat dış cephe astarıdır. Düz veya pürüzlü her cins sıvalı, mineral esaslı yüzeylerde, brüt beton üzerine, rengini kaybetmiş kendini taşıyabilen silikon veya akrilik esaslı eski boyalı yüzeylerde astar olarak kullanılır.",
    "meta": [
      "Aderans gücü yüksektir, boya ile yüzey arasında bağlayıcı köprü kurar.",
      "Boya sarfiyatını azaltır.",
      "Nefes alma kabiliyeti sayesinde yüzeyde oluşan nemin dışarı atılmasını sağlar."
    ],
    "coverage": "7,5 m²/kg",
    "sizes": [
      "20 kg"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "20 kg",
      "consumption": "7,5 m²/kg",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "fawori-optimix-035-beyaz-eps-isi-yalitim-levhasi",
    "url": "https://fawori.com/urunler/isi-yalitim-levhalari/fawori-optimix-035-beyaz-eps-isi-yalitim-levhasi",
    "name": "Fawori Optimix 035 Beyaz EPS Isı Yalıtım Levhası",
    "deptId": "faworiInsulationPanel",
    "category": "levha",
    "badge": "Beyaz EPS Levha",
    "tag": "Isı iletkenlik katsayısı (λD = 0,035 W/mK)",
    "thumb": "assets/fawori/fawori-optimix-035-beyaz-eps-isi-yalitim-levhasi.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1770985892/FAWORI/035_Beyaz_EPS_879cddec5b.jpg",
    "desc": "Fawori 035 Beyaz EPS Isı Yalıtım Levhası, 20-22 kg/m3 yoğunluklu TS EN 13163 – EPS Ürün Üretim ve TS EN 13499 Isı Yalıtım Sistem standartlarına uygun olarak üretilen polistiren esaslı bir ısı yalıtım levhasıdır.",
    "meta": [
      "Isı iletkenlik katsayısı (λD = 0,035 W/mK)",
      "Yüksek su buharı geçirgenliğine (μ=30-70) sahiptir. Yapılarda nem, rutubet ve küf oluşumunu büyük ölçüde azaltır.",
      "Yüzeylere dik çekme dayanımının yüksek olması sayesinde, rüzgar yüklerine karşı daha dayanıklıdır."
    ],
    "coverage": "Standart Sarfiyat",
    "sizes": [
      "Standart Ambalaj"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "Standart Ambalaj",
      "consumption": "Uygulama yüzeyi ve kat sayısına bağlıdır",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "fawori-optimix-beton-dubeli-celik-civili",
    "url": "https://fawori.com/urunler/isi-yalitim-dubelleri/fawori-optimix-beton-dubeli-celik-civili",
    "name": "Fawori Optimix Beton Dübeli - Çelik Çivili",
    "deptId": "faworiInsulationPanel",
    "category": "dubel-profil",
    "badge": "Yalıtım Dübeli",
    "tag": "Tutunma derinliği : ≥ 6,45 cm",
    "thumb": "assets/fawori/fawori-optimix-beton-dubeli-celik-civili.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1771307673/FAWORI/beton_dubeli_973ad2d1fc.jpg",
    "desc": "Taşyünü levha uygulamalarında 9 cm’lik geniş kafa çapıyla basma alanını genişleterek mükemmel bir tutunma sağlar. Beton, dolu tuğla, delikli tuğla, gaz beton, hafif betondan mamul dolu ve boşluklu bloklarda kullanılır.",
    "meta": [
      "Tutunma derinliği : ≥ 6,45 cm",
      "Delik derinliği : ≥ 7,45 cm",
      "Matkap çapı : 8,0 mm (Boşluklu Yüzeyde) - 9,0 mm (Dolu Yüzeyde)"
    ],
    "coverage": "Standart Sarfiyat",
    "sizes": [
      "Standart Ambalaj"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "Standart Ambalaj",
      "consumption": "Uygulama yüzeyi ve kat sayısına bağlıdır",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "fawori-optimix-dekoratif-kaplama-cizgi-dokulu",
    "url": "https://fawori.com/urunler/isi-yalitim-kaplamalari/fawori-optimix-dekoratif-kaplama-cizgi-dokulu",
    "name": "Fawori Optimix Dekoratif Mineral Kaplama - Çizgi",
    "deptId": "faworiInsulationPanel",
    "category": "mineral",
    "badge": "Dekoratif Mineral Sıva",
    "tag": "Çimento esaslı, yüksek buhar geçirgenliğine sahip dış cephe kaplamasıdır.",
    "thumb": "assets/fawori/fawori-optimix-dekoratif-kaplama-cizgi-dokulu.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1719991884/FAWORI/Fawori_Optimix_Dekoratif_Kaplama_Cizgi_Dokulu_a2e9b2639f.png",
    "desc": "Çimento esaslı, hafif, yüzeyde doğal bir doku oluşturan, son kat iç ve dış yüzey kaplamasıdır.",
    "meta": [
      "Çimento esaslı, yüksek buhar geçirgenliğine sahip dış cephe kaplamasıdır.",
      "Dış hava şartlarına dayanıklı ve su iticidir. Rutubet birikimini önler.",
      "Hafif olması sayesinde uygulaması ve desen verilmesi kolaydır."
    ],
    "coverage": "2,0 – 2,5 kg/m²",
    "sizes": [
      "25 kg Kraft Torba"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "25 kg Kraft Torba",
      "consumption": "2,0 – 2,5 kg/m²",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Kullanım Alanları",
        "body": "İnce sıva, düzgün yapılmış kaba sıva, beton, gazbeton veya kendini taşıyabilen silikat ya da akrilik esaslı eski boyaların üzerine yenilemek amacıyla ya da polistren esaslı ve taşyünü levhalar gibi ısı ve ses yalıtım malzemelerinin üzerine güvenle uygulanabilir."
      }
    ]
  },
  {
    "id": "fawori-optimix-dekoratif-kaplama-ince-tane-dokulu",
    "url": "https://fawori.com/urunler/isi-yalitim-kaplamalari/fawori-optimix-dekoratif-kaplama-ince-tane-dokulu",
    "name": "Fawori Optimix Dekoratif Mineral Kaplama - İnce Tane",
    "deptId": "faworiInsulationPanel",
    "category": "mineral",
    "badge": "Dekoratif Mineral Sıva",
    "tag": "Çimento esaslı, yüksek buhar geçirgenliğine sahip dış cephe kaplamasıdır.",
    "thumb": "assets/fawori/fawori-optimix-dekoratif-kaplama-ince-tane-dokulu.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1719991725/FAWORI/Fawori_Optimix_Dekoratif_Kaplama_Ince_Tane_Dokulu_0e515dd9ea.png",
    "desc": "Çimento esaslı, hafif, yüzeyde doğal bir doku oluşturan, son kat iç ve dış yüzey kaplamasıdır.",
    "meta": [
      "Çimento esaslı, yüksek buhar geçirgenliğine sahip dış cephe kaplamasıdır.",
      "Dış hava şartlarına dayanıklı ve su iticidir. Rutubet birikimini önler.",
      "Hafif olması sayesinde uygulaması ve desen verilmesi kolaydır."
    ],
    "coverage": "2,0 – 2,5 kg/m²",
    "sizes": [
      "25 kg Kraft Torba"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "25 kg Kraft Torba",
      "consumption": "2,0 – 2,5 kg/m²",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Kullanım Alanları",
        "body": "İnce sıva, düzgün yapılmış kaba sıva, beton, gazbeton veya kendini taşıyabilen silikat ya da akrilik esaslı eski boyaların üzerine yenilemek amacıyla ya da polistren esaslı ve taşyünü levhalar gibi ısı ve ses yalıtım malzemelerinin üzerine güvenle uygulanabilir."
      }
    ]
  },
  {
    "id": "fawori-optimix-dekoratif-kaplama-tane-dokulu",
    "url": "https://fawori.com/urunler/isi-yalitim-kaplamalari/fawori-optimix-dekoratif-kaplama-tane-dokulu",
    "name": "Fawori Optimix Dekoratif Mineral Kaplama - Tane",
    "deptId": "faworiInsulationPanel",
    "category": "mineral",
    "badge": "Dekoratif Mineral Sıva",
    "tag": "Çimento bazlı olması ve özel formülü sayesinde mükemmel bir buhar geçirgenliğine sahip olup ısı yalıtım sistemleri için ideal bir dış cephe kaplamasıdır.",
    "thumb": "assets/fawori/fawori-optimix-dekoratif-kaplama-tane-dokulu.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1771239009/FAWORI/tane_doku_3bb44639bf.jpg",
    "desc": "Çimento esaslı, hafif, yüzeyde doğal bir doku oluşturan, son kat iç ve dış yüzey kaplamasıdır.",
    "meta": [
      "Çimento bazlı olması ve özel formülü sayesinde mükemmel bir buhar geçirgenliğine sahip olup ısı yalıtım sistemleri için ideal bir dış cephe kaplamasıdır.",
      "Dış hava şartlarına dayanıklı ve su iticidir. Rutubet birikimini önler.",
      "Hafif olması sayesinde uygulaması ve desen verilmesi kolaydır."
    ],
    "coverage": "2,0 – 2,5 kg/m²",
    "sizes": [
      "25 kg Kraft Torba"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "25 kg Kraft Torba",
      "consumption": "2,0 – 2,5 kg/m²",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Kullanım Alanları",
        "body": "İnce sıva, düzgün yapılmış kaba sıva, beton, gazbeton veya kendini taşıyabilen silikat ya da akrilik esaslı eski boyaların üzerine yenilemek amacıyla ya da polistren esaslı ve taşyünü levhalar gibi ısı ve ses yalıtım malzemelerinin üzerine güvenle uygulanabilir."
      }
    ]
  },
  {
    "id": "dekoratif-mineral-kaplama-astari",
    "url": "https://fawori.com/urunler/isi-yalitim-kaplamalari/dekoratif-mineral-kaplama-astari",
    "name": "Fawori Optimix Dekoratif Mineral Kaplama Astarı",
    "deptId": "faworiInsulationPanel",
    "category": "mineral",
    "badge": "Dekoratif Mineral Sıva",
    "tag": "Yüksek aderans gücü vardır.",
    "thumb": "assets/fawori/dekoratif-mineral-kaplama-astari.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1718199411/FAWORI/dekoratif_mineral_kaplama_astari_f16bdbe26b.png",
    "desc": "Fawori Optimix Dekoratif Mineral Kaplama Astarı yüksek aderans gücüne sahip, akrilik kopolimer emülsiyon esaslı, beyaz renkte özel bir astardır.",
    "meta": [
      "Yüksek aderans gücü vardır.",
      "Uygulama yüzeyi ile Fawori Optimix Dekoratif Mineral Kaplama Astarı arasında özel bir tutunma oluşturur.",
      "Eski yüzeydeki kir ve lekelerin Fawori Optimix Dekoratif Mineral Kaplama Astarının üzerine çıkmasını engeller."
    ],
    "coverage": "0,25 – 0,40 kg / m²",
    "sizes": [
      "25 KG PE Kova"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "25 KG PE Kova",
      "consumption": "0,25 – 0,40 kg / m²",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Kullanım Alanları",
        "body": "Isı yalıtım sistemleri üzerine ve daha önce boyanmış veya boyanmamış dış ve iç cephe yüzeyler üzerine kaplama uygulamalarından önce kullanılır."
      }
    ]
  },
  {
    "id": "fawori-optimix-dubel-plastik-civili",
    "url": "https://fawori.com/urunler/isi-yalitim-dubelleri/fawori-optimix-dubel-plastik-civili",
    "name": "Fawori Optimix Dübel - Plastik Çivili",
    "deptId": "faworiInsulationPanel",
    "category": "dubel-profil",
    "badge": "Yalıtım Dübeli",
    "tag": "Tutunma derinliği : ≥ 3 cm",
    "thumb": "assets/fawori/fawori-optimix-dubel-plastik-civili.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1771307447/FAWORI/dubel_plastik_civili_efd0331a3b.jpg",
    "desc": "Optimix Isı Yalıtım Levhalarının yüzeylere sabitlenmesi ve rüzgar vakumlama yüklerine karşı sistemin korunması amacı ile kullanılır. Delikli tuğla, gaz beton ve dolu tuğlada kullanılabilir.",
    "meta": [
      "Tutunma derinliği : ≥ 3 cm",
      "Delik derinliği : ≥ 4 cm",
      "Matkap çapı : 10 mm (Boşluklu Yüzeyde) - 12mm (Dolu Yüzeyde)"
    ],
    "coverage": "Standart Sarfiyat",
    "sizes": [
      "Standart Ambalaj"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "Standart Ambalaj",
      "consumption": "Uygulama yüzeyi ve kat sayısına bağlıdır",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "fawori-optimix-eps-isi-yalitim-levhasi-beyaz",
    "url": "https://fawori.com/urunler/isi-yalitim-levhalari/fawori-optimix-eps-isi-yalitim-levhasi-beyaz",
    "name": "Fawori Optimix EPS Isı Yalıtım Levhası (Beyaz)",
    "deptId": "faworiInsulationPanel",
    "category": "levha",
    "badge": "Beyaz EPS Levha",
    "tag": "Isı iletkenlik katsayısı, λD = 0,040 W/mK’dir.",
    "thumb": "assets/fawori/fawori-optimix-eps-isi-yalitim-levhasi-beyaz.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1770985811/FAWORI/beyaz_EPS_3ead3fc50f.jpg",
    "desc": "Fawori Optimix Beyaz EPS Isı Yalıtım Levhası, TS EN 13163 – EPS Ürün Üretim Standardı'na uygun olarak üretilen polistiren esaslı bir ısı yalıtım levhasıdır.",
    "meta": [
      "Isı iletkenlik katsayısı, λD = 0,040 W/mK’dir.",
      "Yüksek su buharı geçirgenliğine sahiptir.(μ=20-40) Yapılarda nem, rutubet ve küf oluşumunu engeller.",
      "Yapılarda tüm mekanik yüklemelere dayanabilecek yeterliliktedir. Genleşme, büzülme ve duvarların çalışmasından kaynaklanan sıva, boya ve kaplama çatlaklarının oluşmasını önler."
    ],
    "coverage": "Standart Sarfiyat",
    "sizes": [
      "Standart Ambalaj"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "Standart Ambalaj",
      "consumption": "Uygulama yüzeyi ve kat sayısına bağlıdır",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "fawori-optimix-eps-isi-yalitim-levhasi-karbonlu",
    "url": "https://fawori.com/urunler/isi-yalitim-levhalari/fawori-optimix-eps-isi-yalitim-levhasi-karbonlu",
    "name": "Fawori Optimix EPS Isı Yalıtım Levhası (Karbonlu)",
    "deptId": "faworiInsulationPanel",
    "category": "levha",
    "badge": "Karbonlu EPS Levha",
    "tag": "Isı iletkenlik katsayısı, λD = 0,034 W/mK’dir.",
    "thumb": "assets/fawori/fawori-optimix-eps-isi-yalitim-levhasi-karbonlu.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1770985750/FAWORI/karbonlu_EPS_03805e22ab.jpg",
    "desc": "Fawori Optimix Karbonlu EPS Isı Yalıtım Levhası, TS EN 13163 – EPS Ürün Üretim Standardı'na uygun olarak üretilen polistiren esaslı bir ısı yalıtım levhasıdır.",
    "meta": [
      "Isı iletkenlik katsayısı, λD = 0,034 W/mK’dir.",
      "Yüksek su buharı geçirgenliğine sahiptir.(µ=20-40) Yapılarda nem, rutubet ve küf oluşumunu engeller.",
      "Yapılarda tüm mekanik yüklemelere dayanabilecek yeterliliktedir. Genleşme, büzülme ve duvarların çalışmasından kaynaklanan sıva, boya ve kaplama çatlaklarının oluşmasını önler."
    ],
    "coverage": "Standart Sarfiyat",
    "sizes": [
      "Standart Ambalaj"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "Standart Ambalaj",
      "consumption": "Uygulama yüzeyi ve kat sayısına bağlıdır",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "fawori-optimix-f160-donati-filesi",
    "url": "https://fawori.com/urunler/isi-yalitim-fileleri/fawori-optimix-f160-donati-filesi",
    "name": "Fawori Optimix F160 Donatı Filesi",
    "deptId": "faworiInsulationPanel",
    "category": "dubel-profil",
    "badge": "Donatı Filesi",
    "tag": "Mekanik mukavemet : Alkali şartlandırma sonrası mukavemet kaybı max. % 50 (atkı ve çözgüde)",
    "thumb": "assets/fawori/fawori-optimix-f160-donati-filesi.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1716990164/FAWORI/e8193cd1_b228_4fcb_ae86_2c0d091afd5d_1d602e261a.png",
    "desc": "4x4 elek aralığında, alkali dayanımlı, özel kaplamalı cam iplik dokuma filesidir.",
    "meta": [
      "Mekanik mukavemet : Alkali şartlandırma sonrası mukavemet kaybı max. % 50 (atkı ve çözgüde)",
      "Alkali şartlandırma sonrası çekme mukavemeti: ≥ 20 N/mm ve mukavemet kaybı ≤ %50 (atkı ve çözgüde)"
    ],
    "coverage": "Standart Sarfiyat",
    "sizes": [
      "50m2 (1m x 50m)"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "50m2 (1m x 50m)",
      "consumption": "Uygulama yüzeyi ve kat sayısına bağlıdır",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "fawori-optimix-fileli-fuga-profili",
    "url": "https://fawori.com/urunler/isi-yalitim-profilleri/fawori-optimix-fileli-fuga-profili",
    "name": "Fawori Optimix Fileli Fuga Profili",
    "deptId": "faworiInsulationPanel",
    "category": "dubel-profil",
    "badge": "Donatı Filesi",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/fawori-optimix-fileli-fuga-profili.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1771411047/FAWORI/fileli_fuga_profil_71172c09aa.jpg",
    "desc": "3 m uzunluğunda PVC’den imal edilmiş fuga profillerdir. Isı yalıtım levhaları üzerinde açılmış olan fuga bölümlerinin geçişlerinde kullanılır. Profil üzerine yapıştırılmış donatı filesi ile işçilik ve zamandan tasarruf edilmesini sağlar, işçilik hatalarını önler. 1,6 cm derinlik ile 3 cm ve 5 cm olmak üzere iki farklı modeli mevcuttur.",
    "meta": [],
    "coverage": "Standart Sarfiyat",
    "sizes": [
      "10 adet",
      "30 m"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "10 adet - 30 m",
      "consumption": "Uygulama yüzeyi ve kat sayısına bağlıdır",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "fawori-optimix-isi-yalitim-siva-harci",
    "url": "https://fawori.com/urunler/isi-yalitim-yapistirici-ve-sivalari/fawori-optimix-isi-yalitim-siva-harci",
    "name": "Fawori Optimix Isı Yalıtım Sıva Harcı",
    "deptId": "faworiInsulationPanel",
    "category": "harc",
    "badge": "Yalıtım Sıvası",
    "tag": "Polistren esaslı ve taşyünü levhalara güçlü bir tutunma sağlar.",
    "thumb": "assets/fawori/fawori-optimix-isi-yalitim-siva-harci.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1716989872/FAWORI/e76f7ab6_ffe8_46cf_9c1a_37dcad6381d9_75b62494c6.png",
    "desc": "Optimix Isı Yalıtım Sıva Harcı, iç ve dış mekanlarda polistren esaslı ve taşyünü levhalar gibi ısı ve ses yalıtım malzemelerinin üzerine perdah sıvası yapılmasında kullanılan, file uygulamasıyla yüzeyin mukavemetini arttıran, çimento esaslı bir sıvadır.",
    "meta": [
      "Polistren esaslı ve taşyünü levhalara güçlü bir tutunma sağlar.",
      "İçerdiği optimum polimer oranı ile ideal darbe dayanımı ve tutunma performansı sağlar.",
      "Yapısında bulunan katkılar sayesinde sıcaklık farklılıklarından doğan gerilmeleri ve titreşimleri absorbe eder, çatlama riskini en aza indirir."
    ],
    "coverage": "Polistren levha için : 4,0-4,5 kg/m² Taşyünü levha için : 5,5-6,5 kg/m² Belirtilen sarfiyat miktarlarının yüzey ve uygulama şartlarına göre farklılık gösterebileceği dikkate alınmalıdır. Kesin sarfiyat için kontrollü numune yapılmalıdır.",
    "sizes": [
      "25 kg kraft torba"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "25 kg kraft torba",
      "consumption": "Polistren levha için : 4,0-4,5 kg/m² Taşyünü levha için : 5,5-6,5 kg/m² Belirtilen sarfiyat miktarlarının yüzey ve uygulama şartlarına göre farklılık gösterebileceği dikkate alınmalıdır. Kesin sarfiyat için kontrollü numune yapılmalıdır.",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Depolama",
        "body": "Açılmamış ambalajda kuru olarak ve nemden korunarak 12 ay depolanabilir."
      }
    ]
  },
  {
    "id": "fawori-optimix-isi-yalitim-yapistirma-harci",
    "url": "https://fawori.com/urunler/isi-yalitim-yapistirici-ve-sivalari/fawori-optimix-isi-yalitim-yapistirma-harci",
    "name": "Fawori Optimix Isı Yalıtım Yapıştırma Harcı",
    "deptId": "faworiInsulationPanel",
    "category": "harc",
    "badge": "Yalıtım Yapıştırıcı",
    "tag": "Polistren esaslı ve taşyünü levhaların mineral yüzeylere güçlü olarak yapışmasını sağlar.",
    "thumb": "assets/fawori/fawori-optimix-isi-yalitim-yapistirma-harci.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1716989872/FAWORI/8983fe8e_6edc_4320_bf53_d179171194df_9c1af539be.png",
    "desc": "Optimix Isı Yalıtım Yapıştırma Harcı, iç ve dış mekanlarda beton, sıva, tuğla, gazbeton panel vb. mineral esaslı yüzeylerde, polistren esaslı ve taşyünü levhalar gibi ısı ve ses yalıtım malzemelerinin yapıştırılmasında kullanılan çimento esaslı özel yapıştırıcıdır.",
    "meta": [
      "Polistren esaslı ve taşyünü levhaların mineral yüzeylere güçlü olarak yapışmasını sağlar.",
      "İçerdiği optimum polimer oranı ile yüksek yapışma performansına sahiptir.",
      "Su buharı geçirgenliğine sahiptir."
    ],
    "coverage": "Polistren levha için : 4,0-4,5 kg/m² Taşyünü levha için : 5,5-6,5 kg/m² Belirtilen sarfiyat miktarlarının yüzey ve uygulama şartlarına göre farklılık gösterebileceği dikkate alınmalıdır. Kesin sarfiyat için kontrollü numune yapılmalıdır.",
    "sizes": [
      "25 kg kraft torba"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "25 kg kraft torba",
      "consumption": "Polistren levha için : 4,0-4,5 kg/m² Taşyünü levha için : 5,5-6,5 kg/m² Belirtilen sarfiyat miktarlarının yüzey ve uygulama şartlarına göre farklılık gösterebileceği dikkate alınmalıdır. Kesin sarfiyat için kontrollü numune yapılmalıdır.",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Depolama",
        "body": "Açılmamış ambalajda kuru olarak ve nemden korunarak 12 ay depolanabilir."
      }
    ]
  },
  {
    "id": "fawori-optimix-PVC-denizlik-uzatma-profili",
    "url": "https://fawori.com/urunler/isi-yalitim-profilleri/fawori-optimix-PVC-denizlik-uzatma-profili",
    "name": "Fawori Optimix PVC Denizlik Uzatma Profili",
    "deptId": "faworiInsulationPanel",
    "category": "dubel-profil",
    "badge": "Köşe Profili",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/fawori-optimix-PVC-denizlik-uzatma-profili.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1771411116/FAWORI/pvc_denizlik_uzatma_profili_bde99753c4.jpg",
    "desc": "Isı yalıtım uygulamalarında mevcut pencere denizliklerinin yeterli olmadığı yerlerde bu kısımları uzatarak yalıtım detaylarının uygulanabilmesine imkan veren profillerdir. Damlalıklı, UV dayanımlı ve antistatik (toz tutmaz) özelliktedir. 3 m boyda, 5cm ve 8cm genişlikte olmak üzere 2 ayrı ebadı mevcuttur.",
    "meta": [],
    "coverage": "Standart Sarfiyat",
    "sizes": [
      "5 cm’lik : 25 adet",
      "75 m 8 cm’lik : 20 adet",
      "60 m"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "5 cm’lik : 25 adet - 75 m 8 cm’lik : 20 adet - 60 m",
      "consumption": "Uygulama yüzeyi ve kat sayısına bağlıdır",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "fawori-optimix-PVC-fileli-kose-profili",
    "url": "https://fawori.com/urunler/isi-yalitim-profilleri/fawori-optimix-PVC-fileli-kose-profili",
    "name": "Fawori Optimix PVC Fileli Köşe Profili",
    "deptId": "faworiInsulationPanel",
    "category": "dubel-profil",
    "badge": "Donatı Filesi",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/fawori-optimix-PVC-fileli-kose-profili.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1771410977/FAWORI/fileli_kose_profili_22bd821048.jpg",
    "desc": "2,5 m uzunluğunda, PVC fileli köşe profilidir. Bina köşeleri, pencere, kapı kenarlarının olası mekanik hasarlara karşı korunması ve sıva katında düzgünlük sağlama amacıyla kullanılan profillerdir. 160 gr/m² yüksek alkali dayanımlı donatı filesi ile imal edilmektedir.",
    "meta": [],
    "coverage": "Standart Sarfiyat",
    "sizes": [
      "50 adet",
      "125 m"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "50 adet - 125 m",
      "consumption": "Uygulama yüzeyi ve kat sayısına bağlıdır",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "fawori-optimix-tasyunu-dubel-pulu",
    "url": "https://fawori.com/urunler/isi-yalitim-dubelleri/fawori-optimix-tasyunu-dubel-pulu",
    "name": "Fawori Optimix Taşyünü Dübel Pulu",
    "deptId": "faworiInsulationPanel",
    "category": "dubel-profil",
    "badge": "Yalıtım Dübeli",
    "tag": "Kafa çapı : 9 cm",
    "thumb": "assets/fawori/fawori-optimix-tasyunu-dubel-pulu.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1771307839/FAWORI/dubel_pulu_33d4345927.jpg",
    "desc": "Dış cephe ısı yalıtım sistemlerinde, taşyünü levha uygulamalarında tüm dübellere uygun olarak kullanılabilir. Dübellerin basma alanını genişleterek mükemmel bir tutunma sağlar.",
    "meta": [
      "Kafa çapı : 9 cm",
      "Ambalaj : 200 adet"
    ],
    "coverage": "Standart Sarfiyat",
    "sizes": [
      "Standart Ambalaj"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "Standart Ambalaj",
      "consumption": "Uygulama yüzeyi ve kat sayısına bağlıdır",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "fawori-optimix-tasyunu-dubeli-celik-civili",
    "url": "https://fawori.com/urunler/isi-yalitim-dubelleri/fawori-optimix-tasyunu-dubeli-celik-civili",
    "name": "Fawori Optimix Taşyünü Dübeli - Çelik Çivili",
    "deptId": "faworiInsulationPanel",
    "category": "dubel-profil",
    "badge": "Yalıtım Dübeli",
    "tag": "Tutunma derinliği : ≥ 3 cm",
    "thumb": "assets/fawori/fawori-optimix-tasyunu-dubeli-celik-civili.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1771307579/FAWORI/tasyunu_dubeli_celik_civili_47420e858b.jpg",
    "desc": "Beton, brüt beton, tünel beton, dolu tuğla, hafif betondan mamul dolu ve boşluklu bloklarda kullanılabilir.",
    "meta": [
      "Tutunma derinliği : ≥ 3 cm",
      "Delik derinliği : ≥ 4 cm",
      "Matkap çapı : 8,0 mm (Boşluklu Yüzeyde) - 9,0 mm (Dolu Yüzeyde)"
    ],
    "coverage": "Standart Sarfiyat",
    "sizes": [
      "Standart Ambalaj"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "Standart Ambalaj",
      "consumption": "Uygulama yüzeyi ve kat sayısına bağlıdır",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "fawori-donusum-astari",
    "url": "https://fawori.com/urunler/ic-cephe-urun-grubu/fawori-donusum-astari",
    "name": "Fawori Dönüşüm Astarı",
    "deptId": "faworiInteriorPanel",
    "category": "astar",
    "badge": "İç Cephe Astarı",
    "tag": "Kumlu yapısıyla, boya ve yüzey arasında bağlayıcı köprü kurar, aderansı arttırır, boya sarfiyatını azaltır. Beyaz pigmentli, yüksek örtme ve aderans (yapışma) özelliği sayesinde boya ve zaman tasarrufu sağlar.",
    "thumb": "assets/fawori/fawori-donusum-astari.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1774524648/FAWORI/fawori_donusum_astari_34229f94d6.jpg",
    "desc": "Akrilik kopolimer emülsiyon esaslı, beyaz pigmentli iç cephe astar boyasıdır. Brüt beton, düz veya pürüzlü her cins sıvalı, mineral esaslı yüzeylerde, rengini kaybetmiş kendini taşıyabilen silikon veya akrilik eski boyalı yüzeylerde astar olarak uygulanır. Eski boyalı yüzeylerde özellikle sentetik boyadan su bazlı boyaya geçişlerde kullanılır",
    "meta": [
      "Kumlu yapısıyla, boya ve yüzey arasında bağlayıcı köprü kurar, aderansı arttırır, boya sarfiyatını azaltır. Beyaz pigmentli, yüksek örtme ve aderans (yapışma) özelliği sayesinde boya ve zaman tasarrufu sağlar."
    ],
    "coverage": "1 kg ile tek katta 5-9,6 m²",
    "sizes": [
      "20kg",
      "10kg",
      "3",
      "5kg"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "20kg-10kg-3,5kg",
      "consumption": "1 kg ile tek katta 5-9,6 m²",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "konsantre-astar",
    "url": "https://fawori.com/urunler/ic-cephe-urun-grubu/konsantre-astar",
    "name": "Fawori Konsantre Astar",
    "deptId": "faworiInteriorPanel",
    "category": "astar",
    "badge": "İç Cephe Astarı",
    "tag": "Boya ile yüzey arasında bağlayıcı köprü kurarak boyanın yüzeye daha iyi tutunmasını sağlar. Uygulandığı yüzeyin emiciliğini azaltır, boyanın erken kurumasını engeller ve farklı emiciliğe sahip yüzeylerde son kat boyada oluşabilecek renk dalgalanmalarını önler. Boya sarfiyatını azaltarak ekonomi sağlar.",
    "thumb": "assets/fawori/konsantre-astar.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1774524648/FAWORI/konsantre_astar_3c06a82174.jpg",
    "desc": "Su bazlı, yüksek penetrasyon ve aderansa sahip, konsantre astardır. İpek ve Yarı Mat boyalarda 1/7 , Mat ve Plastik boyalarda 1/10 oranında inceltilerek kullanılır. Alçı, kireç badana, özelliğini yitirmiş düşük kaliteli emici plastik boyalı yüzeyler, gaz beton vb. çok emici ve/veya tozuma karakterli yüzeylerde uygulanır.",
    "meta": [
      "Boya ile yüzey arasında bağlayıcı köprü kurarak boyanın yüzeye daha iyi tutunmasını sağlar. Uygulandığı yüzeyin emiciliğini azaltır, boyanın erken kurumasını engeller ve farklı emiciliğe sahip yüzeylerde son kat boyada oluşabilecek renk dalgalanmalarını önler. Boya sarfiyatını azaltarak ekonomi sağlar."
    ],
    "coverage": "95-160 m²/L 1/7 130-220 m²/L 1/10",
    "sizes": [
      "15L",
      "7",
      "5L",
      "2",
      "5L",
      "0",
      "75L"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "15L-7,5L-2,5L-0,75L",
      "consumption": "95-160 m²/L 1/7 130-220 m²/L 1/10",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "fawori-kozmik-ipek",
    "url": "https://fawori.com/urunler/ic-cephe-urun-grubu/fawori-kozmik-ipek",
    "name": "Fawori Kozmik İpek",
    "deptId": "faworiInteriorPanel",
    "category": "kozmik-ultra",
    "badge": "İpek & Soft Mat",
    "tag": "Su bazlı, silikon esaslı",
    "thumb": "assets/fawori/fawori-kozmik-ipek.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1774526359/FAWORI/kozmik_546458e634.jpg",
    "desc": "Silikon esaslı, ipeksi bir dokuya sahip, tam silinebilir dekoratif su bazlı iç cephe boyasıdır. İç cephe eski-yeni boyalı/sıvalı tavan-duvar, alçı, macun, alçıpan, betopan, OSB, cam tekstili yüzeyler üzerine uygun astarlama işlemi tamamlandıktan sonra uygulanır. Yapı malzeme standartlarına uygun uygulama yapıldığında çatlama, kabarma ve dökülme yapmaz. Su bazlı olması nedeni ile rahatsız edici bir kokusu yoktur, çevre dostudur.",
    "meta": [
      "Su bazlı, silikon esaslı",
      "İpeksi dokuya sahip",
      "Tam silinebilen"
    ],
    "coverage": "13-25,3 m²/L",
    "sizes": [
      "15L",
      "7",
      "5L",
      "2",
      "5L"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "15L-7,5L-2,5L",
      "consumption": "13-25,3 m²/L",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "fawori-macun",
    "url": "https://fawori.com/urunler/ic-cephe-urun-grubu/fawori-macun",
    "name": "Fawori Macun",
    "deptId": "faworiInteriorPanel",
    "category": "astar",
    "badge": "Macun & Dolgu",
    "tag": "Yüksek dolgu gücüne sahiptir, yüzeye iyi tutunur, zımparalama kolaylığı sunar ve çabuk kurur.",
    "thumb": "assets/fawori/fawori-macun.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1774524648/FAWORI/fw_macun_acaafa8e9c.jpg",
    "desc": "Akrilik kopolimer esaslı, yüksek doldurma gücüne sahip, beyaz renkli ahşap macunudur. Özellikle ahşap yüzeyler için formüle edilmiş olup yeni boyanacak yüzeylerde, eski boyalı ve/veya sıvalı yüzeylere boya uygulamalarında dolgu ve yüzey düzeltme macunu olarak kullanılır.",
    "meta": [
      "Yüksek dolgu gücüne sahiptir, yüzeye iyi tutunur, zımparalama kolaylığı sunar ve çabuk kurur."
    ],
    "coverage": "Standart Sarfiyat",
    "sizes": [
      "1",
      "1kg"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "1,1kg",
      "consumption": "Uygulama yüzeyi ve kat sayısına bağlıdır",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "fawori-panel-kapi-boyasi",
    "url": "https://fawori.com/urunler/ic-cephe-urun-grubu/fawori-panel-kapi-boyasi",
    "name": "Fawori Panel Kapı Boyası",
    "deptId": "faworiInteriorPanel",
    "category": "tavan-kapi",
    "badge": "Panel Kapı Boyası",
    "tag": "Su bazlı, çevre dostu",
    "thumb": "assets/fawori/fawori-panel-kapi-boyasi.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1774526358/FAWORI/panel_kapi_5de7e4019d.jpg",
    "desc": "Akrilik reçine esaslı, örtücü ve koruyucu su bazlı son kat panel kapı boyasıdır. Amerikan panel, masif ahşap ve kaplamalı ahşap kapılar üzerine uygulanabilir. Ham yüzeyin boyanmasında ya da boya üstü boya uygulamasında kullanılır. Boya üstü boya uygulamalarında, su/solvent bazlı boya ve vernikler üzerine uygulanabilir. Yatay ahşap zemin ve yaya trafiği olan yüzeylerde kullanılmamalıdır.",
    "meta": [
      "Su bazlı, çevre dostu",
      "Yarı mat parlaklıkta",
      "Sararmaya dirençli"
    ],
    "coverage": "13-23 m²/L",
    "sizes": [
      "2",
      "5L",
      "0",
      "75L"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "2,5L-0,75L",
      "consumption": "13-23 m²/L",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "fawori-plastik",
    "url": "https://fawori.com/urunler/ic-cephe-urun-grubu/fawori-plastik",
    "name": "Fawori Plastik",
    "deptId": "faworiInteriorPanel",
    "category": "mat-silikonlu",
    "badge": "Silikonlu & Plastik",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/fawori-plastik.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1774524648/FAWORI/plastik_fd4c488b26.jpg",
    "desc": "Akrilik kopolimer emülsiyon esaslı, dekoratif iç yüzey plastik boyasıdır. İç cephe eski-yeni boyalı/sıvalı tavan-duvar, alçı, macun, alçıpan, betopan, OSB, cam tekstili yüzeyler üzerine uygun astarlama işlemi tamamlandıktan sonra uygulanır.",
    "meta": [],
    "coverage": "Sarfiyat kısmını 1 kg ile tek katta 8-16 m²",
    "sizes": [
      "20kg",
      "10kg",
      "3",
      "5kg"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "20kg-10kg-3,5kg",
      "consumption": "Sarfiyat kısmını 1 kg ile tek katta 8-16 m²",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "fawori-pro-astar",
    "url": "https://fawori.com/urunler/ic-cephe-urun-grubu/fawori-pro-astar",
    "name": "Fawori Pro Astar",
    "deptId": "faworiInteriorPanel",
    "category": "astar",
    "badge": "İç Cephe Astarı",
    "tag": "Son kat boyanın örtücülüğünü arttırır ve yüzeye daha iyi yapışmasını sağlar. İnce dokusu sayesinde üzerine uygulanacak Fawori Fenomen İç Cephe, Master İpek, Silikonlu İpek gibi parlaklık ve dokunun önemli olduğu su bazlı boyalar için ideal bir yüzey oluşturur. Yüzeyin emiş gücünü dengeler, boyanın eşit dağılımını sağlar.",
    "thumb": "assets/fawori/fawori-pro-astar.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1774524648/FAWORI/pro_astar_ef96039fd9.jpg",
    "desc": "Akrilik kopolimer emülsiyon esaslı, beyaz pigmentli, ince dokulu iç cephe astar boyasıdır. Beton, brüt beton, ham sıvalı yüzeyler, mdf, betopan, OSB, tuğla, kendini taşıyabilen eski boyalı (su-solvent bazlı)ve macun uygulanmış yüzeylerde uygulanır. Eski boyalı yüzeylerde özellikle su bazlı boya üzerine yine su bazlı boya uygulanacaksa kullanılır.",
    "meta": [
      "Son kat boyanın örtücülüğünü arttırır ve yüzeye daha iyi yapışmasını sağlar. İnce dokusu sayesinde üzerine uygulanacak Fawori Fenomen İç Cephe, Master İpek, Silikonlu İpek gibi parlaklık ve dokunun önemli olduğu su bazlı boyalar için ideal bir yüzey oluşturur. Yüzeyin emiş gücünü dengeler, boyanın eşit dağılımını sağlar."
    ],
    "coverage": "1 kg ile tek katta 7,8-11 m²",
    "sizes": [
      "20kg",
      "10kg",
      "3",
      "5kg"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "20kg-10kg-3,5kg",
      "consumption": "1 kg ile tek katta 7,8-11 m²",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "Fawori-seramik-ustu-astar",
    "url": "https://fawori.com/urunler/ic-cephe-urun-grubu/Fawori-seramik-ustu-astar",
    "name": "Fawori Seramik Üstü Astar",
    "deptId": "faworiInteriorPanel",
    "category": "astar",
    "badge": "İç Cephe Astarı",
    "tag": "Pürüzlü bir yüzey oluşturur",
    "thumb": "assets/fawori/Fawori-seramik-ustu-astar.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1774526358/FAWORI/seramik_ustu_astar_af0fc288c7.jpg",
    "desc": "Polimer modifiye reçine esaslı seramik üzeri seramik uygulamalarında kullanılabilecek astar malzemesidir.",
    "meta": [
      "Pürüzlü bir yüzey oluşturur",
      "Yapışma mukavemetini arttırır",
      "Daha iyi tutunma sağlar"
    ],
    "coverage": "1 Kg ile tek katta 10-16 m²",
    "sizes": [
      "3",
      "5 Kg"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "3,5 Kg",
      "consumption": "1 Kg ile tek katta 10-16 m²",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "fawori-silikonlu-mat",
    "url": "https://fawori.com/urunler/ic-cephe-urun-grubu/fawori-silikonlu-mat",
    "name": "Fawori Silikonlu Mat",
    "deptId": "faworiInteriorPanel",
    "category": "mat-silikonlu",
    "badge": "Silikonlu & Plastik",
    "tag": "Su bazlı, silikon esaslı",
    "thumb": "assets/fawori/fawori-silikonlu-mat.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1774524648/FAWORI/sil_mat_b40e84b5e0.jpg",
    "desc": "Silikonlu akrilik kopolimer esaslı, dekoratif birinci sınıf son kat emülsiyon boyasıdır. İç cephe eski-yeni boyalı/sıvalı tavan-duvar, alçı, macun, alçıpan, betopan, OSB, cam tekstili yüzeyler üzerine uygun astarlama işlemi tamamlandıktan sonra uygulanır.",
    "meta": [
      "Su bazlı, silikon esaslı",
      "Mat görünümlü",
      "Nefes alabilen"
    ],
    "coverage": "1 kg ile tek katta 8-11 m²",
    "sizes": [
      "20 Kg",
      "10 Kg",
      "3",
      "5 Kg"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "20 Kg - 10 Kg - 3,5 Kg",
      "consumption": "1 kg ile tek katta 8-11 m²",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "seffaf-astar",
    "url": "https://fawori.com/urunler/ic-cephe-urun-grubu/seffaf-astar",
    "name": "Fawori Şeffaf Astar",
    "deptId": "faworiInteriorPanel",
    "category": "astar",
    "badge": "İç Cephe Astarı",
    "tag": "Boya ile yüzey arasında köprü kurar. Penetrasyon özelliğinden dolayı uygulama yüzeyinin iç derinliklerine kadar nüfuz ederek üzerine gelecek boya tabakasının uygulama yüzeyi ile bütünleşmesini sağlar. Yüzey emiciliğini önlediği için, özellikle sıcak havalarda boyanın erken kurumasını önler ve boya sarfiyatını azaltır.",
    "thumb": "assets/fawori/seffaf-astar.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1774526359/FAWORI/seffaf_astar_74cd50c37c.jpg",
    "desc": "Kullanıma hazır, özel emülsiyon reçine esaslı, şeffaf iç cephe astarıdır. Alçı, kireç badana, özelliğini yitirmiş düşük kaliteli emici plastik boyalı yüzeyler, gaz beton vb. çok emici ve/veya tozuma karakterli yüzeylerde uygulanır.",
    "meta": [
      "Boya ile yüzey arasında köprü kurar. Penetrasyon özelliğinden dolayı uygulama yüzeyinin iç derinliklerine kadar nüfuz ederek üzerine gelecek boya tabakasının uygulama yüzeyi ile bütünleşmesini sağlar. Yüzey emiciliğini önlediği için, özellikle sıcak havalarda boyanın erken kurumasını önler ve boya sarfiyatını azaltır."
    ],
    "coverage": "1 L ile tek katta 8-12,5 m²",
    "sizes": [
      "20L",
      "5L"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "20L-5L",
      "consumption": "1 L ile tek katta 8-12,5 m²",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "fawori-tavan-extra",
    "url": "https://fawori.com/urunler/ic-cephe-urun-grubu/fawori-tavan-extra",
    "name": "Fawori Tavan Extra",
    "deptId": "faworiInteriorPanel",
    "category": "tavan-kapi",
    "badge": "Tavan Boyası",
    "tag": "Su bazlı - Mat görünümlü - Extra beyaz - Extra örtücü - Kolay uygulanabilen - Nefes alabilen",
    "thumb": "assets/fawori/fawori-tavan-extra.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1774524648/FAWORI/tav_extra_fdee334414.jpg",
    "desc": "Akrilik kopolimer emülsiyon esaslı, dekoratif iç yüzey beyaz tavan boyasıdır. Saten alçılı, macunlu, alçıpan yüzeyler ve tozuma karakterli olmayan eski boyalı veya sıvalı iç cephe tavan yüzeyler üzerine kullanılır.",
    "meta": [
      "Su bazlı - Mat görünümlü - Extra beyaz - Extra örtücü - Kolay uygulanabilen - Nefes alabilen"
    ],
    "coverage": "5,5 - 9,5 m²/kg",
    "sizes": [
      "17",
      "5kg",
      "10kg",
      "3",
      "5kg"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "17,5kg-10kg-3,5kg",
      "consumption": "5,5 - 9,5 m²/kg",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "fawori-ultra-soft-mat",
    "url": "https://fawori.com/urunler/ic-cephe-urun-grubu/fawori-ultra-soft-mat",
    "name": "Fawori Ultra Soft Mat",
    "deptId": "faworiInteriorPanel",
    "category": "kozmik-ultra",
    "badge": "İpek & Soft Mat",
    "tag": "Su bazlı, silikon esaslı",
    "thumb": "assets/fawori/fawori-ultra-soft-mat.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1774526358/FAWORI/ultra_343e915959.jpg",
    "desc": "Silikon esaslı, soft mat parlaklığa sahip, tam silinebilir dekoratif su bazlı iç cephe boyasıdır. İç cephe eski-yeni boyalı/sıvalı tavan-duvar, alçı, macun, alçıpan, betopan, OSB, cam tekstili yüzeyler üzerine uygun astarlama işlemi tamamlandıktan sonra uygulanır. Yapı malzeme standartlarına uygun uygulama yapıldığında çatlama, kabarma ve dökülme yapmaz. Su bazlı olması nedeni ile rahatsız edici bir kokusu yoktur, çevre dostudur.",
    "meta": [
      "Su bazlı, silikon esaslı",
      "Soft mat parlaklığa sahip",
      "Pürüzsüz görünümlü"
    ],
    "coverage": "13-24 m²/L",
    "sizes": [
      "15L",
      "7",
      "5L",
      "2",
      "5L"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "15L-7,5L-2,5L",
      "consumption": "13-24 m²/L",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "tempo-binder-konsantre-astar",
    "url": "https://fawori.com/urunler/ic-cephe-urun-grubu/tempo-binder-konsantre-astar",
    "name": "Tempo Binder (Konsantre Astar)",
    "deptId": "faworiInteriorPanel",
    "category": "astar",
    "badge": "İç Cephe Astarı",
    "tag": "Yüksek penetrasyon",
    "thumb": "assets/fawori/tempo-binder-konsantre-astar.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1774524648/FAWORI/tempo_binder_396b369632.jpg",
    "desc": "İpek parlaklığında ve daha parlak boyalarda 1 ölçek astar, 7 ölçek su ile inceltilir. Mat/Plastik boyalarda sulandırma oranının 1/10’a çıkartılmalıdır.",
    "meta": [
      "Yüksek penetrasyon",
      "Boya ile yüzey arasında köprü görevi görür",
      "Tutunmayı arttırır"
    ],
    "coverage": "Standart Sarfiyat",
    "sizes": [
      "15L",
      "2",
      "5L"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "15L-2,5L",
      "consumption": "Uygulama yüzeyi ve kat sayısına bağlıdır",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Tempo Binder (Konsantre Astar)",
        "body": "Yüksek penetrasyon ve yapışma özelliğine sahip, su bazlı yoğun konsantre astardır."
      }
    ]
  },
  {
    "id": "tempo-ozel-ipek-silikonlu",
    "url": "https://fawori.com/urunler/ic-cephe-urun-grubu/tempo-ozel-ipek-silikonlu",
    "name": "Tempo Özel İpek Silikonlu",
    "deptId": "faworiInteriorPanel",
    "category": "mat-silikonlu",
    "badge": "Silikonlu & Plastik",
    "tag": "Su bazlı, silikon esaslı",
    "thumb": "assets/fawori/tempo-ozel-ipek-silikonlu.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1774524648/FAWORI/tempo_ozel_ipek_sil_00d6630435.jpg",
    "desc": "Silikonlu, silinebilme özelliği olan, ipek mat dokuda dekoratif son kat su bazlı iç cephe boyasıdır.",
    "meta": [
      "Su bazlı, silikon esaslı",
      "Silinebilir",
      "Yüksek örtücülük"
    ],
    "coverage": "1 L ile tek katta 13-20 m²",
    "sizes": [
      "20 Kg",
      "10 Kg",
      "3",
      "5 Kg"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "20 Kg, 10 Kg, 3,5 Kg",
      "consumption": "1 L ile tek katta 13-20 m²",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "tempo-ozel-plastik",
    "url": "https://fawori.com/urunler/ic-cephe-urun-grubu/tempo-ozel-plastik",
    "name": "Tempo Özel Plastik",
    "deptId": "faworiInteriorPanel",
    "category": "mat-silikonlu",
    "badge": "Silikonlu & Plastik",
    "tag": "Su bazlı, akrilik esaslı",
    "thumb": "assets/fawori/tempo-ozel-plastik.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1774526358/FAWORI/tempo_ozel_plastik_6d9ff84572.jpg",
    "desc": "Akrilik esaslı, mat görünümlü, dekoratif iç yüzey plastik boyadır.",
    "meta": [
      "Su bazlı, akrilik esaslı",
      "Mat görünüm",
      "Su kaldırır yapıda"
    ],
    "coverage": "1 L ile tek katta 10,5 m²",
    "sizes": [
      "20 Kg",
      "10 Kg",
      "3",
      "5 Kg"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "20 Kg, 10 Kg, 3,5 Kg",
      "consumption": "1 L ile tek katta 10,5 m²",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "tempo-ozel-tavan",
    "url": "https://fawori.com/urunler/ic-cephe-urun-grubu/tempo-ozel-tavan",
    "name": "Tempo Özel Tavan",
    "deptId": "faworiInteriorPanel",
    "category": "tavan-kapi",
    "badge": "Tavan Boyası",
    "tag": "Su bazlı akrilik esaslı",
    "thumb": "assets/fawori/tempo-ozel-tavan.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1774524648/FAWORI/tempo_ozel_tavan_63b455a956.jpg",
    "desc": "Akrilik esaslı, yüksek beyazlığa sahip, dekoratif beyaz tavan boyasıdır.",
    "meta": [
      "Su bazlı akrilik esaslı",
      "Yüksek nefes alma özelliği",
      "Mat görünüm"
    ],
    "coverage": "1 L ile tek katta 5-9 m²",
    "sizes": [
      "17",
      "5 Kg",
      "10 Kg",
      "3",
      "5 Kg"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "17,5 Kg - 10 Kg - 3,5 Kg",
      "consumption": "1 L ile tek katta 5-9 m²",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "tempo-silikonlu-mat",
    "url": "https://fawori.com/urunler/ic-cephe-urun-grubu/tempo-silikonlu-mat",
    "name": "Tempo Silikonlu Mat",
    "deptId": "faworiInteriorPanel",
    "category": "mat-silikonlu",
    "badge": "Silikonlu & Plastik",
    "tag": "Su bazlı, silikon esaslı",
    "thumb": "assets/fawori/tempo-silikonlu-mat.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1774524648/FAWORI/tempo_sil_mat_ic_cephe_2d6c798783.jpg",
    "desc": "Akrilik esaslı, silikon katkılı, mat görünümlü, dekoratif iç cephe son kat duvar boyasıdır.",
    "meta": [
      "Su bazlı, silikon esaslı",
      "Mat görünümlü",
      "Yüksek örtücülük"
    ],
    "coverage": "1 L ile tek katta 13-20 m²",
    "sizes": [
      "20 Kg",
      "10 Kg",
      "3",
      "5 Kg"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "20 Kg, 10 Kg, 3,5 Kg",
      "consumption": "1 L ile tek katta 13-20 m²",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "tempo-universal-astar",
    "url": "https://fawori.com/urunler/ic-cephe-urun-grubu/tempo-universal-astar",
    "name": "Tempo Universal Astar",
    "deptId": "faworiInteriorPanel",
    "category": "astar",
    "badge": "İç Cephe Astarı",
    "tag": "Boya ile yüzey arasında köprü görevi görür",
    "thumb": "assets/fawori/tempo-universal-astar.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1774524649/FAWORI/universal_astar_9cfbad91a2.jpg",
    "desc": "Akrilik kopolimer esaslı beyaz pigmentli astar boyadır. Çok iyi örtme ve aderans gücüne sahiptir.",
    "meta": [
      "Boya ile yüzey arasında köprü görevi görür",
      "Tutunmayı arttırır",
      "Boya sarfiyatını azaltrı"
    ],
    "coverage": "14-20 m²/L",
    "sizes": [
      "15L",
      "7",
      "5L",
      "2",
      "5L"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "15L-7,5L-2,5L",
      "consumption": "14-20 m²/L",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "akrilik-sprey-boya",
    "url": "https://fawori.com/urunler/sprey-urun-grubu/akrilik-sprey-boya",
    "name": "Akrilik Sprey Boya",
    "deptId": "faworiSupportPanel",
    "category": "sprey",
    "badge": "Akrilik Sprey",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/akrilik-sprey-boya.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1770881189/FAWORI/akrilik_sprey_boya_73cc5d3725.jpg",
    "desc": "» İç ve dış alanlarda ahşap, sunta/MDF, metal, cam, seramik, karton, plastik vb. gibi yüzeylerde kullanılabilen akrilik esaslı sprey boyadır. » Kurşunsuzdur, atmosferi kirletici ve ozon tabakasına zararlı CFC gazları içermez. Sprey püskürtme çıkışı kendi kendini temizler özelliktedir.",
    "meta": [],
    "coverage": "Yüzey cinsine, uygulama kalınlığına ve renge göre değişken, tek katta yaklaşık 2-2,5 m²/400 ml",
    "sizes": [
      "Standart Ambalaj"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "Standart Ambalaj",
      "consumption": "Yüzey cinsine, uygulama kalınlığına ve renge göre değişken, tek katta yaklaşık 2-2,5 m²/400 ml",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Kuruma Süresi ",
        "body": "» Toz Kuruması 5-8 dakika » Dokunma Kuruması 15-20 dakika » Tam Kuruma 16-20 saat"
      },
      {
        "title": "Depolama",
        "body": "Basınçlı kaptır. Serin yede saklayınız. Kutu boşalsa bile delmeyin ve ateşe atmayın. Direkt güneş ışığından ve 50o’C’yi aşan ortamlardan uzak tutunuz. Tutuşturucu kaynaklardan uzak tutun, sigara içmeyin."
      }
    ]
  },
  {
    "id": "akrilik-sprey-vernik",
    "url": "https://fawori.com/urunler/sprey-urun-grubu/akrilik-sprey-vernik",
    "name": "Akrilik Sprey Vernik",
    "deptId": "faworiSupportPanel",
    "category": "sprey",
    "badge": "Akrilik Sprey",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/akrilik-sprey-vernik.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1770881227/FAWORI/akrilik_sprey_vernik_0acf363951.jpg",
    "desc": "İç ve dış alanlarda ahşap, sunta/MDF vb. yüzeylerde kullanılabilen parlak ve mat görünümlü akrilik sprey verniktir. Kurşunsuzdur, atmosferi kirletici ve ozon tabakasına zararlı CFC gazları içermez. Sprey püskürtme çıkışı kendi kendini temizler özelliktedir.",
    "meta": [],
    "coverage": "Yüzey cinsine, uygulama kalınlığına ve renge göre değişken, tek katta yaklaşık 2-2,5 m²/400 ml",
    "sizes": [
      "Standart Ambalaj"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "Standart Ambalaj",
      "consumption": "Yüzey cinsine, uygulama kalınlığına ve renge göre değişken, tek katta yaklaşık 2-2,5 m²/400 ml",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Kuruma Süresi",
        "body": "» Toz Kuruması 5-8 dakika » Dokunma Kuruması 15-20 dakika » Tam Kuruma 16-20 saat"
      },
      {
        "title": "Depolama",
        "body": "Basınçlı kaptır. Serin yede saklayınız. Kutu boşalsa bile delmeyin ve ateşe atmayın. Direkt güneş ışığından ve 50o’C’yi aşan ortamlardan uzak tutunuz. Tutuşturucu kaynaklardan uzak tutun, sigara içmeyin."
      }
    ]
  },
  {
    "id": "ekstra-plastik-rulo",
    "url": "https://fawori.com/urunler/ic-cephe-boya-rulolari/ekstra-plastik-rulo",
    "name": "Ekstra Plastik Rulo",
    "deptId": "faworiSupportPanel",
    "category": "rulo",
    "badge": "Uygulama Rulosu",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/ekstra-plastik-rulo.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1770878201/FAWORI/ekstra_plastik_rulo_818e4252b2.jpg",
    "desc": "» Yarı pürüzlü, pürüzlü yüzeylerde kullanılması önerilir. » Sarı-yeşil çizgilidir. » %100 polyamid kumaşdır. » Su bazlı ve sentetik boyalarda kullanılır.",
    "meta": [],
    "coverage": "Standart Sarfiyat",
    "sizes": [
      "Standart Ambalaj"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "Standart Ambalaj",
      "consumption": "Uygulama yüzeyi ve kat sayısına bağlıdır",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "floresan-sprey-boya",
    "url": "https://fawori.com/urunler/sprey-urun-grubu/floresan-sprey-boya",
    "name": "Floresan Sprey Boya",
    "deptId": "faworiSupportPanel",
    "category": "sprey",
    "badge": "Akrilik Sprey",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/floresan-sprey-boya.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1770881282/FAWORI/floresan_sprey_boya_482ed0ba1f.jpg",
    "desc": "» İç ve dış alanlarda ahşap, sunta/MDF, metal, cam, seramik, karton, plastik, ince sıva vb. gibi “Kendin yap” alanındaki genel dekorasyon, el sanatları ve hobi işlerinde, bisiklet/motosiklet boyama ve ağaç/orman, fen işleri, inşaat tesisat ve tamiratında genel işaretleme işlerinde kullanılan sprey boyadır. » Kurşunsuzdur, atmosferi kirletici ve ozon tabakasına zararlı CFC gazları içermez. Sprey püskürtme çıkışı kendi kendini temizler özelliktedir.",
    "meta": [],
    "coverage": "Yüzey cinsine, uygulama kalınlığına ve renge göre değişken, tek katta yaklaşık 2-2,5 m²/400 ml",
    "sizes": [
      "Standart Ambalaj"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "Standart Ambalaj",
      "consumption": "Yüzey cinsine, uygulama kalınlığına ve renge göre değişken, tek katta yaklaşık 2-2,5 m²/400 ml",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Kuruma Süresi",
        "body": "» Toz Kuruması 5-8 dakika » Dokunma Kuruması 15-20 dakika » Tam Kuruma 16-20 saat"
      },
      {
        "title": "Depolama",
        "body": "Basınçlı kaptır. Serin yede saklayınız. Kutu boşalsa bile delmeyin ve ateşe atmayın. Direkt güneş ışığından ve 50°C’yi aşan ortamlardan uzak tutunuz. Tutuşturucu kaynaklardan uzak tutun, sigara içmeyin."
      }
    ]
  },
  {
    "id": "nitril-eldiven",
    "url": "https://fawori.com/urunler/uygulama-destek-urun-grubu/nitril-eldiven",
    "name": "FWR5 Nitril Eldiven - Kırmızı/Siyah",
    "deptId": "faworiSupportPanel",
    "category": "destek",
    "badge": "Uygulama & Şantiye Destek",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/nitril-eldiven.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1719986648/FAWORI/FWR_5_Nitril_Eldiven_Kirmizi_Siyah_19b7f94d27.png",
    "desc": "» İmalat, makine ve ekipmanlar, otomotiv, depolama, peyzaj ve bahçe işleri, lojistik, ulaştırma, elektronik, gıda işleme, tarım, paketleme, montaj, altyapı ve bakım, hafif sanayi gibi yoğun emek gereken uygulamalarda kullanılmaktadır. Eldiven, aşınmaya karşı uzun süre dayanıklıdır. » Polyester iplikten örülmüş ve nitril ile yarı kaplanmış, iş eldivenidir. » Kırmızı-Siyah renkde nitril kaplıdır. » Boyut: No: 9-10",
    "meta": [],
    "coverage": "Standart Sarfiyat",
    "sizes": [
      "Standart Ambalaj"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "Standart Ambalaj",
      "consumption": "Uygulama yüzeyi ve kat sayısına bağlıdır",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "nitril-eldiven-sari",
    "url": "https://fawori.com/urunler/uygulama-destek-urun-grubu/nitril-eldiven-sari",
    "name": "FWR5 Nitril Eldiven - Sarı",
    "deptId": "faworiSupportPanel",
    "category": "destek",
    "badge": "Uygulama & Şantiye Destek",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/nitril-eldiven-sari.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1707116925/FAWORI/nitril_eldiven_sarijpg_b1b460103a.jpg",
    "desc": "» İmalat, makine ve ekipmanlar, otomotiv, depolama, peyzaj ve bahçe işleri, lojistik, ulaştırma, elektronik, gıda işleme, tarım, paketleme, montaj, altyapı ve bakım, hafif sanayi gibi yoğun emek gereken uygulamalarda kullanılmaktadır. Eldiven, aşınmaya karşı uzun süre dayanıklıdır. » Polyester iplikten örülmüş ve nitril ile yarı kaplanmış, iş eldivenidir. » Sarı renkde nitril kaplıdır. » Boyut: No: 9-10",
    "meta": [],
    "coverage": "Standart Sarfiyat",
    "sizes": [
      "Standart Ambalaj"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "Standart Ambalaj",
      "consumption": "Uygulama yüzeyi ve kat sayısına bağlıdır",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "isiya-dayanikli-sprey-boya",
    "url": "https://fawori.com/urunler/sprey-urun-grubu/isiya-dayanikli-sprey-boya",
    "name": "Isıya Dayanıklı Sprey Boya",
    "deptId": "faworiSupportPanel",
    "category": "sprey",
    "badge": "Akrilik Sprey",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/isiya-dayanikli-sprey-boya.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1770881334/FAWORI/isiya_dayanikli_sprey_boya_e8c8e4fd87.jpg",
    "desc": "Yüksek ısıya dayanıklı silikonlu sprey boyadır. Makine gövdeleri, egzoz ve boruları, barbekü ve ocaklar gibi yüksek ısıya maruz kalan materyalleri boyamada güvenle kullanılır. Ürün, 500 °C’ye kadar dayanıklıdır. Uygulama sonrası 180 °C ısıya maruz kaldıktan sonra katılaşması tamamlanır. Zaman içerisinde yüksek ısı nedeniyle oluşabilecek renk değişimi ürünün dayanıklılık özelliğini etkilemez.",
    "meta": [],
    "coverage": "Yüzey cinsine, uygulama kalınlığına ve renge göre değişken, tek katta yaklaşık 0,9-1,1 m2",
    "sizes": [
      "Standart Ambalaj"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "Standart Ambalaj",
      "consumption": "Yüzey cinsine, uygulama kalınlığına ve renge göre değişken, tek katta yaklaşık 0,9-1,1 m2",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Kuruma Süresi",
        "body": "» Toz Kuruması 20-30 dakika » Dokunma Kuruması 1-2 saat » Tam Kuruma 48 saat"
      },
      {
        "title": "Depolama",
        "body": "Basınçlı kaptır. Serin yede saklayınız. Kutu boşalsa bile delmeyin ve ateşe atmayın. Direkt güneş ışığından ve 50’C’yi aşan ortamlardan uzak tutunuz. Tutuşturucu kaynaklardan uzak tutun, sigara içmeyin."
      }
    ]
  },
  {
    "id": "jant-boyasi",
    "url": "https://fawori.com/urunler/sprey-urun-grubu/jant-boyasi",
    "name": "Jant Boyası",
    "deptId": "faworiSupportPanel",
    "category": "destek",
    "badge": "Uygulama & Şantiye Destek",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/jant-boyasi.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1770881299/FAWORI/jant_boyasi_30ecb722d1.jpg",
    "desc": "» Metal alaşımlı jant yüzeylerinde kullanılan, alüminyum gri görünümlü, koruyucu ve dekoratif jant boyasıdır. » Çelik ve hafif metal jantlar için kalıcı ve yüksek kalitede pigmentli koruyuculuk sağlar. » Kurşunsuzdur, atmosferi kirletici ve ozon tabakasına zararlı CFC gazları içermez. Sprey püskürtme çıkışı kendi kendini temizler özelliktedir.",
    "meta": [],
    "coverage": "Yüzey cinsine, uygulama kalınlığına ve renge göre değişken, tek katta yaklaşık 2-2,5 m²/400 ml",
    "sizes": [
      "Standart Ambalaj"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "Standart Ambalaj",
      "consumption": "Yüzey cinsine, uygulama kalınlığına ve renge göre değişken, tek katta yaklaşık 2-2,5 m²/400 ml",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Kuruma Süresi",
        "body": "» Toz Kuruması 5-8 dakika » Dokunma Kuruması 15-20 dakika » Tam Kuruma 16-20 saat"
      },
      {
        "title": "Depolama",
        "body": "Basınçlı kaptır. Serin yede saklayınız. Kutu boşalsa bile delmeyin ve ateşe atmayın. Direkt güneş ışığından ve 50°C’yi aşan ortamlardan uzak tutunuz. Tutuşturucu kaynaklardan uzak tutun, sigara içmeyin."
      }
    ]
  },
  {
    "id": "kestirme-firca",
    "url": "https://fawori.com/urunler/su-bazli-boya-fircalari/kestirme-firca",
    "name": "Kestirme Fırça",
    "deptId": "faworiSupportPanel",
    "category": "firca",
    "badge": "Uygulama Fırçası",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/kestirme-firca.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1706699028/FAWORI/kestirme_firca_0c633b9a4c.jpg",
    "desc": "» Epoksi Yapıştırıcılı » Solventten etkilenmez. » Kesinlikle kıl vermez. Doğal beyaz kıldan ve plastik sap kullanılarak üretilmiştir.",
    "meta": [],
    "coverage": "Standart Sarfiyat",
    "sizes": [
      "Standart Ambalaj"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "Standart Ambalaj",
      "consumption": "Uygulama yüzeyi ve kat sayısına bağlıdır",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "koruma-ortusu",
    "url": "https://fawori.com/urunler/uygulama-destek-urun-grubu/koruma-ortusu",
    "name": "Koruma Örtüsü",
    "deptId": "faworiSupportPanel",
    "category": "destek",
    "badge": "Uygulama & Şantiye Destek",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/koruma-ortusu.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1707116925/FAWORI/koruma_ortusu_d284ec751e.jpg",
    "desc": "Tadilat, temizlik ve boya uygulaması yapılan iç mekanlardaki eşyayı boya, kir ve tozdan korur.",
    "meta": [],
    "coverage": "Standart Sarfiyat",
    "sizes": [
      "Standart Ambalaj"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "Standart Ambalaj",
      "consumption": "Uygulama yüzeyi ve kat sayısına bağlıdır",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "kozmik-ipek-rulo",
    "url": "https://fawori.com/urunler/yardimci-urunler/kozmik-ipek-rulo",
    "name": "Kozmik İpek Rulo",
    "deptId": "faworiSupportPanel",
    "category": "rulo",
    "badge": "Uygulama Rulosu",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/kozmik-ipek-rulo.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1770878053/FAWORI/kozmik_ipek_rulo_300a267cf3.jpg",
    "desc": "» Grenli boyalara desen vermek için kullanılır. » Sarı kristalize süngerdir. » Su bazlı boyalarda kullanılır.",
    "meta": [],
    "coverage": "Standart Sarfiyat",
    "sizes": [
      "Standart Ambalaj"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "Standart Ambalaj",
      "consumption": "Uygulama yüzeyi ve kat sayısına bağlıdır",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "krom-efekt-sprey-boya",
    "url": "https://fawori.com/urunler/sprey-urun-grubu/krom-efekt-sprey-boya",
    "name": "Krom Efekt Sprey Boya",
    "deptId": "faworiSupportPanel",
    "category": "sprey",
    "badge": "Akrilik Sprey",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/krom-efekt-sprey-boya.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1770881318/FAWORI/krom_efekt_sprey_boya_f496fd8e9b.jpg",
    "desc": "İç alanlardaki ahşap, metal, cam, seramik, sert plastik, dekoratif objeler, çerçeve gibi süslemeler vb. pürüzsüz yüzeylere krom efektli parlak dekoratif altın, gümüş, bakır efekti vermek için kullanılır. Kurşunsuzdur, atmosferi kirletici ve ozon tabakasına zararlı CFC gazları içermez. Sprey püskürtme çıkışı kendi kendini temizler özelliktedir.",
    "meta": [],
    "coverage": "Yüzey cinsine, uygulama kalınlığına ve renge göre değişken, tek katta yaklaşık 2-2,5 m²/400 ml",
    "sizes": [
      "Standart Ambalaj"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "Standart Ambalaj",
      "consumption": "Yüzey cinsine, uygulama kalınlığına ve renge göre değişken, tek katta yaklaşık 2-2,5 m²/400 ml",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Kuruma Süresi",
        "body": "» Toz Kuruması 10-15 dakika » Dokunma Kuruması 30-40 dakika » Tam Kuruma 24-30 saat"
      },
      {
        "title": "Depolama",
        "body": "Basınçlı kaptır. Serin yede saklayınız. Kutu boşalsa bile delmeyin ve ateşe atmayın. Direkt güneş ışığından ve 50’C’yi aşan ortamlardan uzak tutunuz. Tutuşturucu kaynaklardan uzak tutun, sigara içmeyin."
      }
    ]
  },
  {
    "id": "maskeleme-bandi",
    "url": "https://fawori.com/urunler/uygulama-destek-urun-grubu/maskeleme-bandi",
    "name": "Maskeleme Bandı",
    "deptId": "faworiSupportPanel",
    "category": "destek",
    "badge": "Uygulama & Şantiye Destek",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/maskeleme-bandi.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1707116924/FAWORI/maskeleme_bandi_820db34d13.jpg",
    "desc": "» Duvar, tavan, pencere ve kapı yenilerken veya dekore ederken profesyonel sonuçlar elde etmek için kullanılır. » Kaygan ve zorlu yüzeylerde, düz kenarlarda veya kavislerde, iç ve dış mekanda kullanıma uygundur. Kullanımları hızlı, kolay ve güvenlidir. » Birçok yüzeyden kalıntı bırakmadan ve tek parça halinde çıkarırken yırtılmadan sökülebilirler. » Geniş yüzeylerin maskelenmesini ve bandın tek bir harekette temiz bir şekilde çıkarılabilmesine imkan verir, çalışırken zamandan tasarruf sağlar.",
    "meta": [],
    "coverage": "Standart Sarfiyat",
    "sizes": [
      "Standart Ambalaj"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "Standart Ambalaj",
      "consumption": "Uygulama yüzeyi ve kat sayısına bağlıdır",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Ölçü",
        "body": "» 19 mm » 25 mm » 38 mm » 50 mm"
      }
    ]
  },
  {
    "id": "mercan-rulo",
    "url": "https://fawori.com/urunler/yardimci-urunler/mercan-rulo",
    "name": "Mercan Rulo",
    "deptId": "faworiSupportPanel",
    "category": "rulo",
    "badge": "Uygulama Rulosu",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/mercan-rulo.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1770878244/FAWORI/mercan_rulo_faf5b46148.jpg",
    "desc": "» Grenli boyalara desen vermek için kullanılır. » Sarı kristalize süngerdir. » Su bazlı boyalarda kullanılır.",
    "meta": [],
    "coverage": "Standart Sarfiyat",
    "sizes": [
      "Standart Ambalaj"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "Standart Ambalaj",
      "consumption": "Uygulama yüzeyi ve kat sayısına bağlıdır",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "metal-teleskopik-sap",
    "url": "https://fawori.com/urunler/uygulama-destek-urun-grubu/metal-teleskopik-sap",
    "name": "Metal Teleskopik Sap",
    "deptId": "faworiSupportPanel",
    "category": "destek",
    "badge": "Uygulama & Şantiye Destek",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/metal-teleskopik-sap.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1718097954/FAWORI/metal_teleskopik_sap_6a731d078d.jpg",
    "desc": "» Rulo standartlarına uygun olarak tasarlanmıştır. » Pratik uzatma/kısaltma sistemi sayesinde kolayca istenen boya ayarlanabilir. İçe geçen boru ortaya doğru çevrilerek gevşetilir, yukarı çekerek uzatılır, istenilen boy elde edilince sola veya sağa çevrilerek kilitlenir. » Daha hafif, daha uzun ömürlü, daha dayanıklı olması için tam sert çelikten üretilmiştir.",
    "meta": [],
    "coverage": "Standart Sarfiyat",
    "sizes": [
      "Standart Ambalaj"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "Standart Ambalaj",
      "consumption": "Uygulama yüzeyi ve kat sayısına bağlıdır",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "metalik-sprey-boya",
    "url": "https://fawori.com/urunler/sprey-urun-grubu/metalik-sprey-boya",
    "name": "Metalik Sprey Boya",
    "deptId": "faworiSupportPanel",
    "category": "sprey",
    "badge": "Akrilik Sprey",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/metalik-sprey-boya.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1770881262/FAWORI/metalik_sprey_boya_d116e73e58.jpg",
    "desc": "» İç alanlardaki ahşap, metal, cam, seramik, sert plastik, dekoratif eşya, ayna ve resim çerçevesi vb. dekoratif eskitme efekti vermek için gümüş, alüminyum, altın yaldız , » Makineler, yedek parçalar, çelik eşya, ahşap mobilya, plastik aksam, hobi ve el sanatları, motosiklet / bisiklet/oto vb. metalik gri ve siyah renk seçenekleri olan spreydir. Kurşunsuzdur, atmosferi kirletici ve ozon tabakasına zararlı CFC gazları içermez. Sprey püskürtme çıkışı kendi kendini temizler özelliktedir.",
    "meta": [],
    "coverage": "Yüzey cinsine, uygulama kalınlığına ve renge göre değişken, tek katta yaklaşık 2-2,5 m²/400 ml",
    "sizes": [
      "Standart Ambalaj"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "Standart Ambalaj",
      "consumption": "Yüzey cinsine, uygulama kalınlığına ve renge göre değişken, tek katta yaklaşık 2-2,5 m²/400 ml",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Kuruma Süresi",
        "body": "» Toz Kuruması 10-15 dakika » Dokunma Kuruması 30-40 dakika » Tam Kuruma 24-30 saat"
      },
      {
        "title": "Depolama",
        "body": "Basınçlı kaptır. Serin yede saklayınız. Kutu boşalsa bile delmeyin ve ateşe atmayın. Direkt güneş ışığından ve 50’C’yi aşan ortamlardan uzak tutunuz. Tutuşturucu kaynaklardan uzak tutun, sigara içmeyin."
      }
    ]
  },
  {
    "id": "mini-rulo",
    "url": "https://fawori.com/urunler/ic-cephe-boya-rulolari/mini-rulo",
    "name": "Mini Rulo",
    "deptId": "faworiSupportPanel",
    "category": "rulo",
    "badge": "Uygulama Rulosu",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/mini-rulo.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1770878174/FAWORI/mini_rulo_4811223225.jpg",
    "desc": "» Duvar, ahşap ve metal yüzeylerin dar alanlarını daha rahat boyamak için kullanılır. » Sarı çizgilidir. » %100 polyamid kumaşdır. » Su bazlı ve sentetik boyalarda kullanılır.",
    "meta": [],
    "coverage": "Standart Sarfiyat",
    "sizes": [
      "Standart Ambalaj"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "Standart Ambalaj",
      "consumption": "Uygulama yüzeyi ve kat sayısına bağlıdır",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "pas-sokucu",
    "url": "https://fawori.com/urunler/sprey-urun-grubu/pas-sokucu",
    "name": "Pas Sökücü",
    "deptId": "faworiSupportPanel",
    "category": "sprey",
    "badge": "Pas Sökücü Sprey",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/pas-sokucu.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1770881352/FAWORI/pas_sokucu_5475583fc0.jpg",
    "desc": "» Metal parçaları ve yüzeyleri, pastan ve dış etkilerden koruma amaçlı kullanılan sprey boyadır. » İyi nüfuz etme ve nem itici özellikleri bulunmaktadır. » Çözücü buharlaştıktan sonra optimum yağlama sağlar. » Zincir, dişli, kilit vb. yerlerde yağlayıcı olarak kullanıma uygundur. » Dayanıklı ve su itici özelliği sayesinde paslanmaya karşı korur ve korozyonu önler. » Sürtünmeyi azaltır ve yerine sıkıca oturan vidalı bağlantıların veya paslanmış parçaların sökülmesini kolaylaştırır. » Ürün hızlı etki eder, etkilidir.",
    "meta": [],
    "coverage": "Standart Sarfiyat",
    "sizes": [
      "Standart Ambalaj"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "Standart Ambalaj",
      "consumption": "Uygulama yüzeyi ve kat sayısına bağlıdır",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Depolama",
        "body": "Serin yerde saklayınız. Direkt güneş ışığından ve 50°’C’yi aşan ortamlardan uzak tutunuz."
      },
      {
        "title": "Uygulama",
        "body": "En az 2 dakika süreyle çalkalandıktan sonra 25-30 cm mesafeden uygulayınız."
      }
    ]
  },
  {
    "id": "pratik-branda",
    "url": "https://fawori.com/urunler/uygulama-destek-urun-grubu/pratik-branda",
    "name": "Pratik Branda",
    "deptId": "faworiSupportPanel",
    "category": "destek",
    "badge": "Uygulama & Şantiye Destek",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/pratik-branda.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1707116925/FAWORI/pratik_branda_c4cdc48ecf.jpg",
    "desc": "» Tadilat, temizlik ve boya uygulaması yapılan alanların yer zeminini korur. » Çeşitli malzemelerin üstünü kaplayarak korumak için kullanılır. » Pratik branda geri dönüşümlü pe (polietienden) üretilmektedir.",
    "meta": [],
    "coverage": "Standart Sarfiyat",
    "sizes": [
      "Standart Ambalaj"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "Standart Ambalaj",
      "consumption": "Uygulama yüzeyi ve kat sayısına bağlıdır",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "robot-firca",
    "url": "https://fawori.com/urunler/su-bazli-boya-fircalari/robot-firca",
    "name": "Robot Fırça",
    "deptId": "faworiSupportPanel",
    "category": "firca",
    "badge": "Uygulama Fırçası",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/robot-firca.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1719985474/FAWORI/Robot_Firca_a7dfbeb4fb.png",
    "desc": "» Epoksi Yapıştırıcılı » Solventten etkilenmez. » Kesinlikle kıl vermez. Doğal beyaz kıldan ve plastik sap kullanılarak üretilmiştir. Rulo sırığına takılabilen ve 180 °C dönebilen özel sapı sayesinde kolay uygulama yapılmaya uygundur.",
    "meta": [],
    "coverage": "Standart Sarfiyat",
    "sizes": [
      "Standart Ambalaj"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "Standart Ambalaj",
      "consumption": "Uygulama yüzeyi ve kat sayısına bağlıdır",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "rulo-elegi",
    "url": "https://fawori.com/urunler/uygulama-destek-urun-grubu/rulo-elegi",
    "name": "Rulo Eleği",
    "deptId": "faworiSupportPanel",
    "category": "destek",
    "badge": "Uygulama & Şantiye Destek",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/rulo-elegi.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1707116925/FAWORI/rulo_elegi_6256cc0f33.jpg",
    "desc": "» Boyanın ideal bir şekilde ruloya geçişini sağlamak için kullanılır. » Rulonun boyayı homojen olarak yüzeye taşımasını sağlar.",
    "meta": [],
    "coverage": "Standart Sarfiyat",
    "sizes": [
      "Standart Ambalaj"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "Standart Ambalaj",
      "consumption": "Uygulama yüzeyi ve kat sayısına bağlıdır",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "rulo-sunger-zimpara",
    "url": "https://fawori.com/urunler/uygulama-destek-urun-grubu/rulo-sunger-zimpara",
    "name": "Rulo Sünger Zımpara",
    "deptId": "faworiSupportPanel",
    "category": "destek",
    "badge": "Uygulama & Şantiye Destek",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/rulo-sunger-zimpara.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1719986575/FAWORI/Rulo_Suenger_Zimpara_36c29e8846.png",
    "desc": "» Macun dolgu ve astarlı yüzeylerin kuru ortamda zımparalanmasına uygun, uzun ömürlü ve yüksek performanslı bir üründür. » Sünger tabanı sayesinde yüzeyde standart baskı yapıp, çiziklerin asgariye düşmesini sağlar. » Düz ve engebeli yüzeyleri, esnekliği sayesinde mükemmel bir şekilde zımparalayabilir. » Zımpara makinasına veya zımpara malalarına takılabilir.",
    "meta": [],
    "coverage": "Standart Sarfiyat",
    "sizes": [
      "Standart Ambalaj"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "Standart Ambalaj",
      "consumption": "Uygulama yüzeyi ve kat sayısına bağlıdır",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "fawori-marin-yat-vernik",
    "url": "https://fawori.com/urunler/sentetik-urun-grubu/fawori-marin-yat-vernik",
    "name": "Fawori Marin Yat Vernik",
    "deptId": "faworiSyntheticPanel",
    "category": "vernik-ahsap",
    "badge": "Yat Vernik & Ahşap",
    "tag": "Yapısındaki UV absorbanları sayesinde ahşabı uzun süre korur. Sararmaya karşı dirençlidir. Ahşabın rengini şeffaf yapısından dolayı değiştirmez. Doğal görünümünü atmosfer koşullarına, neme ve suya karşı koruyan, mükemmel yapışan iç ve dış cephe verniğidir. Mükemmel yayılma gücü ile zaman ve işçilikten tasarruf sağlar.",
    "thumb": "assets/fawori/fawori-marin-yat-vernik.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1705474739/FAWORI/sentetik_0005_marinyatvernik_91df7e6a04.png",
    "desc": "Üretan alkid reçine kombinasyon esaslı, yüksek parlaklıkta mükemmel üst yüzey oluşturan bir yat verniktir. Deniz araçlarının ahşap yüzeylerinde ve binaların her türlü ahşap iç ve dış yüzeylerinde dekoratif ve koruyucu olarak ahşabın doğal görünümünü bozmadan kullanabileceğiniz UV dayanımlı parlak verniktir.",
    "meta": [
      "Yapısındaki UV absorbanları sayesinde ahşabı uzun süre korur. Sararmaya karşı dirençlidir. Ahşabın rengini şeffaf yapısından dolayı değiştirmez. Doğal görünümünü atmosfer koşullarına, neme ve suya karşı koruyan, mükemmel yapışan iç ve dış cephe verniğidir. Mükemmel yayılma gücü ile zaman ve işçilikten tasarruf sağlar."
    ],
    "coverage": "1 kg ile tek katta 14-18 m²",
    "sizes": [
      "12L",
      "2",
      "5L",
      "0",
      "75L"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "12L-2,5L-0,75L",
      "consumption": "1 kg ile tek katta 14-18 m²",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "sentetik-parke-cilasi",
    "url": "https://fawori.com/urunler/sentetik-urun-grubu/sentetik-parke-cilasi",
    "name": "Fawori Parke Cilası",
    "deptId": "faworiSyntheticPanel",
    "category": "vernik-ahsap",
    "badge": "Yat Vernik & Ahşap",
    "tag": "Yüksek ve kalıcı parlaklığa sahiptir. Uygulandığı iç cephe ahşap yüzeylerin doğallığını bozmaz ve renk değişikliği yapmaz (şeffaf renktedir). Sararmaya karşı dirençli olup, sert bir film oluşturur. Evlerde kullanılan sıvı temizlik malzemelerine dayanıklıdır, fırça izi oluşturmaz.",
    "thumb": "assets/fawori/sentetik-parke-cilasi.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1719581451/FAWORI/sentetik_parke_cilasi_36f7576f0b.png",
    "desc": "Tek komponentli modifiye üretan alkid esaslı parlak parke verniğidir. Mukavemet gerektiren iç cephe ahşap döşeme, merdiven ve parke yüzeylerde güvenle kullanabileceğiniz bir cam ciladır.",
    "meta": [
      "Yüksek ve kalıcı parlaklığa sahiptir. Uygulandığı iç cephe ahşap yüzeylerin doğallığını bozmaz ve renk değişikliği yapmaz (şeffaf renktedir). Sararmaya karşı dirençli olup, sert bir film oluşturur. Evlerde kullanılan sıvı temizlik malzemelerine dayanıklıdır, fırça izi oluşturmaz."
    ],
    "coverage": "14-16 m²/L",
    "sizes": [
      "12L",
      "2",
      "5L",
      "0",
      "75L"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "12L-2,5L-0,75L",
      "consumption": "14-16 m²/L",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "fawori-premium-sentetik-boya",
    "url": "https://fawori.com/urunler/sentetik-urun-grubu/fawori-premium-sentetik-boya",
    "name": "Fawori Premium Sentetik Boya",
    "deptId": "faworiSyntheticPanel",
    "category": "sentetik-boya",
    "badge": "Sentetik Yağlı Boya",
    "tag": "Parlak görünümlü",
    "thumb": "assets/fawori/fawori-premium-sentetik-boya.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1719984733/FAWORI/Premium_Sentetik_Boya_ea6a9a6994.png",
    "desc": "Modifiye alkid reçine esaslı, yüksek ve kalıcı parlaklıkta, örtme ve yapışması mükemmel son kat parlak sentetik boyadır. İç ve dış mekanlarda ahşap, demir-çelik-sac, beton, brüt beton, sıva, betopan, alçıpan, OSB, mdf yüzeylerde ve mobilyalarda uygun astar ile güvenle kullanılır.",
    "meta": [
      "Parlak görünümlü",
      "Silinebilir",
      "Rahat taranır, fırça ve rulo izi bırakmaz"
    ],
    "coverage": "1 kg ile tek katta 7-8 m²",
    "sizes": [
      "15 Kg",
      "2",
      "5 Kg",
      "0",
      "75 Kg"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "15 Kg - 2,5 Kg -0,75 Kg",
      "consumption": "1 kg ile tek katta 7-8 m²",
      "mixingRatio": "Fawori Sentetik Tiner ile inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "fawori-sentetik-antipas",
    "url": "https://fawori.com/urunler/sentetik-urun-grubu/fawori-sentetik-antipas",
    "name": "Fawori Sentetik Antipas",
    "deptId": "faworiSyntheticPanel",
    "category": "sentetik-boya",
    "badge": "Pas Önleyici Antipas",
    "tag": "Alkid ve pas önleyici antikorozif yapıdaki pigmentlerin özel kombinasyonu ile demir-çelik-sac yüzeyleri paslanmaya karşı korur, uygulanan yüzeyle çok iyi aderans oluşturur.",
    "thumb": "assets/fawori/fawori-sentetik-antipas.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1705474739/FAWORI/sentetik_0007_sentetik_antipas_3607e6099d.png",
    "desc": "Sentetik alkid reçine kombinasyonlu pas önleyici antikorozif yüzey astarıdır. Her türlü demir-çelik-sac yüzeylerin korozyonuna engel olmak için kullanılır.",
    "meta": [
      "Alkid ve pas önleyici antikorozif yapıdaki pigmentlerin özel kombinasyonu ile demir-çelik-sac yüzeyleri paslanmaya karşı korur, uygulanan yüzeyle çok iyi aderans oluşturur."
    ],
    "coverage": "1 kg ile tek katta 7-8 m²",
    "sizes": [
      "15 kg",
      "2",
      "5 Kg",
      "0",
      "75 kg"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "15 kg - 2,5 Kg - 0,75 kg",
      "consumption": "1 kg ile tek katta 7-8 m²",
      "mixingRatio": "Fawori Sentetik Tiner ile inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "fawori-sentetik-astar",
    "url": "https://fawori.com/urunler/sentetik-urun-grubu/fawori-sentetik-astar",
    "name": "Fawori Sentetik Astar",
    "deptId": "faworiSyntheticPanel",
    "category": "sentetik-boya",
    "badge": "Sentetik Yağlı Boya",
    "tag": "Rahat tarama ve örtme gücü sayesinde işçilikten tasarruf sağlar. Düzgün bir üst yüzey oluşturur, yüzeyi son kat uygulamaya hazır hale getirir.",
    "thumb": "assets/fawori/fawori-sentetik-astar.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1705474739/FAWORI/sentetik_0008_sentetik_astar_6d3315bc1c.png",
    "desc": "Modifiye alkid reçine esaslı astar boyasıdır. İçeride ve dışarıda her cins ahşap, beton, brüt beton, sıva, betopan, alçıpan, OSB, mdf, demir-çelik-sac yüzeylerde son kat boya uygulamasından önce güvenle kullanılır.",
    "meta": [
      "Rahat tarama ve örtme gücü sayesinde işçilikten tasarruf sağlar. Düzgün bir üst yüzey oluşturur, yüzeyi son kat uygulamaya hazır hale getirir."
    ],
    "coverage": "1 kg ile tek katta 7-8 m²",
    "sizes": [
      "15 kg",
      "2",
      "5 Kg",
      "0",
      "75 kg"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "15 kg - 2,5 Kg - 0,75 kg",
      "consumption": "1 kg ile tek katta 7-8 m²",
      "mixingRatio": "Fawori Sentetik Tiner ile inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "fawori-sentetik-tiner",
    "url": "https://fawori.com/urunler/sentetik-urun-grubu/fawori-sentetik-tiner",
    "name": "Fawori Sentetik Tiner",
    "deptId": "faworiSyntheticPanel",
    "category": "tiner-yol",
    "badge": "Sentetik Tiner",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/fawori-sentetik-tiner.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1719984817/FAWORI/Sentetik_Tiner_253400f661.png",
    "desc": "Solvent bazlı ürünlerde kullanılan incelticidir. Sentetik esaslı tüm boya, vernik ve astarların uygulamalarında inceltici olarak güvenle kullanılır. Ayrıca sentetik esaslı boya uygulama araç ve gereçlerinin (fırça, rulo, uygulama tabancası, spatül vb.) temizlik işlerinde kullanıldığı gibi yeni boyanacak demir-çelik yüzeylerin boya öncesi mevcut yağ, pas tozları gibi kirliliklerin temizlenmesinde kullanılır.",
    "meta": [],
    "coverage": "Standart Sarfiyat",
    "sizes": [
      "10L",
      "2",
      "5L",
      "1",
      "5L",
      "0",
      "5L",
      "0",
      "3L"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "10L-2,5L-1,5L-0,5L-0,3L",
      "consumption": "Uygulama yüzeyi ve kat sayısına bağlıdır",
      "mixingRatio": "Fawori Sentetik Tiner ile inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "soguk-yol-cizgi-boyasi-sentetik",
    "url": "https://fawori.com/urunler/sentetik-urun-grubu/soguk-yol-cizgi-boyasi-sentetik",
    "name": "Fawori Soğuk Yol Çizgi Boyası",
    "deptId": "faworiSyntheticPanel",
    "category": "tiner-yol",
    "badge": "Yol Çizgi Boyası",
    "tag": "» Solvent bazlı",
    "thumb": "assets/fawori/soguk-yol-cizgi-boyasi-sentetik.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1719985084/FAWORI/Soguk_Yol_Cizgi_Boyasi_f72a81626e.png",
    "desc": "Yol ve kaldırım işaretlemeleri için kullanılan yüksek performanslı yol çizgi boyasıdır. Yol çizgilerinin işaretlenmesinde asfalt yüzeylerde, kaldırım taşlarının boyanmasında ve otopark işaretlemelerinde kullanılır. Beton yüzeylerde kullanılacaksa, betonun uygulamadan en az 1 ay önce dökülmüş olması yüzeyinin çentiklenerek pürüzlendirilmesi ve uygulamanın mutlaka havasız püskürtme (airless) ile yapılması gereklidir. Eski boyalı yüzey (su bazlı yol çizgi boyası vb.) üstüne uygulamalarda mutlaka bir miktar deneme yapılması tavsiye edilir. UYARI: Helikopter perdah makinesi ile yüzeyi düzeltilmiş parlak betonda ve daha önce epoksi kaplama bulunan yüzeylerde kullanılmamalıdır.",
    "meta": [
      "» Solvent bazlı",
      "» Mat görünümlü",
      "» Yüksek yapışma gücünde"
    ],
    "coverage": "3m²/kg(150 µ film kalınlığı)",
    "sizes": [
      "25kg"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "25kg",
      "consumption": "3m²/kg(150 µ film kalınlığı)",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "wood-stain-dekoratif-ahsap-vernigi",
    "url": "https://fawori.com/urunler/sentetik-urun-grubu/wood-stain-dekoratif-ahsap-vernigi",
    "name": "Fawori Wood Stain Dekoratif Ahşap Verniği",
    "deptId": "faworiSyntheticPanel",
    "category": "sentetik-boya",
    "badge": "Sentetik Yağlı Boya",
    "tag": "Özel katkı maddeleri sayesinde yüzeyde mantarlara karşı koruyucudur. Ahşabı suya ve UV ışınlarına karşı korur. Ahşaba penetrasyonu kolaydır. Aşınmaya karşı dirençlidir. Yüzey üzerinde film tabakası oluşturur.",
    "thumb": "assets/fawori/wood-stain-dekoratif-ahsap-vernigi.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1719984774/FAWORI/Wood_Stain_Dekoratif_Ahsap_Vernigi_af326ae191.png",
    "desc": "Ahşap yüzeyler için geliştirilmiş alkid bağlayıcı esaslı, şeffaf yapıda, parlak görünümlü dekoratif ve koruyucu amaçlı kullanılan bir son kat ahşap verniğidir. Her türlü ahşap doğrama cephe kaplaması ve ahşap bahçe mobilyasının boyanmasında kullanılır. Arı kovanları, saunalardaki ahşap yüzeylerde, ambalajsız gıda maddelerinin barındırıldığı ahşaplar üzerinde, yatay ahşap zemin ve yaya trafiği olan yüzeylerde kullanılmamalıdır. Ayrıca bünyesinde yüksek miktarda doğal yağ içeren teak, iroko vb. ahşap yüzeyler üzerine uygulanmamalıdır.",
    "meta": [
      "Özel katkı maddeleri sayesinde yüzeyde mantarlara karşı koruyucudur. Ahşabı suya ve UV ışınlarına karşı korur. Ahşaba penetrasyonu kolaydır. Aşınmaya karşı dirençlidir. Yüzey üzerinde film tabakası oluşturur."
    ],
    "coverage": "11-13 m²/L",
    "sizes": [
      "12L",
      "2",
      "5L",
      "0",
      "75L"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "12L-2,5L-0,75L",
      "consumption": "11-13 m²/L",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "fawori-yol-cizgi-boyasi-tineri",
    "url": "https://fawori.com/urunler/sentetik-urun-grubu/fawori-yol-cizgi-boyasi-tineri",
    "name": "Fawori Yol Çizgi Boyası Tineri",
    "deptId": "faworiSyntheticPanel",
    "category": "tiner-yol",
    "badge": "Sentetik Tiner",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/fawori-yol-cizgi-boyasi-tineri.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1719581702/FAWORI/Fawori_Yol_Cizgi_Boyasi_Tineri_55de10a889.png",
    "desc": "Yüksek çözme gücüne sahip, yol çizgi boyası tineridir. Fawori Soğuk Yol Çizgi Boyası’nın inceltilmesinde, boya uygulama araç ve gereçlerinin temizlik işlerinde kullanılır.",
    "meta": [],
    "coverage": "Standart Sarfiyat",
    "sizes": [
      "15L"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "15L",
      "consumption": "Uygulama yüzeyi ve kat sayısına bağlıdır",
      "mixingRatio": "Fawori Sentetik Tiner ile inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  },
  {
    "id": "klasik-firca",
    "url": "https://fawori.com/urunler/sentetik-boya-fircalari/klasik-firca",
    "name": "Klasik Fırça",
    "deptId": "faworiSyntheticPanel",
    "category": "sentetik-boya",
    "badge": "Sentetik Yağlı Boya",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/klasik-firca.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1719985521/FAWORI/Klasik_Firca_88dd413651.png",
    "desc": "» Epoksi Yapıştırıcılı » Solventten etkilenmez. » Kesinlikle kıl vermez. Doğal siyah kıldan ve plastik sap kullanılarak üretilmiştir.",
    "meta": [],
    "coverage": "Standart Sarfiyat",
    "sizes": [
      "Standart Ambalaj"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "Standart Ambalaj",
      "consumption": "Uygulama yüzeyi ve kat sayısına bağlıdır",
      "mixingRatio": "Su ile hacimce %10-15 inceltilir",
      "potLife": "Orijinal ambalajında kuru ortamda 2 yıl",
      "logistics": "Balçova Showroom & Urla Ana Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Uygulama ve Yüzey Hazırlığı",
        "body": "Uygulama yapılacak yüzeylerin toz, yağ, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
      },
      {
        "title": "Saklama ve Güvenlik Koşulları",
        "body": "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
      }
    ]
  }
];

  var DEPARTMENTS_DATA = {
  "faworiInteriorPanel": {
    "title": "İç Cephe Boyaları, Tavan & Astarlar",
    "shortTitle": "İç Cephe & Astarlar",
    "desc": "Betek Kimya teknolojisiyle geliştirilen Fawori Kozmik İpek, Ultra Soft Mat, silikonlu ve tavan boyaları.",
    "pills": [
      {
        "id": "all",
        "label": "Tümü"
      },
      {
        "id": "kozmik-ultra",
        "label": "Kozmik İpek & Ultra Soft"
      },
      {
        "id": "mat-silikonlu",
        "label": "Silikonlu & Plastik"
      },
      {
        "id": "tavan-kapi",
        "label": "Tavan & Panel Kapı"
      },
      {
        "id": "astar",
        "label": "Astarlar & Macun"
      }
    ]
  },
  "faworiExteriorPanel": {
    "title": "Dış Cephe Boyaları & Kaplamaları",
    "shortTitle": "Dış Cephe & Kaplama",
    "desc": "Fenomen Saf Akrilik dış cephe boyası, silikonlu kaplamalar ve ağır sahil iklimine dayanıklı tekstürlü sistemler.",
    "pills": [
      {
        "id": "all",
        "label": "Tümü"
      },
      {
        "id": "akrilik-saf",
        "label": "Fenomen Saf Akrilik"
      },
      {
        "id": "silikonlu-dis",
        "label": "Silikonlu Dış Cephe"
      },
      {
        "id": "grenli-tekstur",
        "label": "Grenli & Tekstürlü Kaplama"
      },
      {
        "id": "astar-dis",
        "label": "Dış Cephe Astarları"
      }
    ]
  },
  "faworiSyntheticPanel": {
    "title": "Sentetik Boya, Vernik & Tinerler",
    "shortTitle": "Sentetik, Vernik & Tiner",
    "desc": "Marin yat verniği, parke cilası, dekoratif ahşap vernikleri, antipas ve sentetik son kat boyalar.",
    "pills": [
      {
        "id": "all",
        "label": "Tümü"
      },
      {
        "id": "vernik-ahsap",
        "label": "Yat Vernik & Ahşap Koruma"
      },
      {
        "id": "sentetik-boya",
        "label": "Sentetik Boya & Antipas"
      },
      {
        "id": "tiner-yol",
        "label": "Tiner & Yol Çizgi Boyası"
      }
    ]
  },
  "faworiInsulationPanel": {
    "title": "Fawori Optimix® Isı Yalıtım Sistemleri",
    "shortTitle": "Fawori Optimix® Yalıtım",
    "desc": "Betek güvenceli komple mantolama paketi: EPS levhalar, yapıştırma ve sıva harçları, donatı filesi ve mineral kaplamalar.",
    "pills": [
      {
        "id": "all",
        "label": "Tümü"
      },
      {
        "id": "levha",
        "label": "EPS & Taşyünü Levhalar"
      },
      {
        "id": "harc",
        "label": "Yapıştırma & Sıva Harçları"
      },
      {
        "id": "mineral",
        "label": "Dekoratif Mineral Kaplamalar"
      },
      {
        "id": "dubel-profil",
        "label": "Dübel, File & Profiller"
      }
    ]
  },
  "faworiSupportPanel": {
    "title": "Sprey Boyalar & Uygulama Ekipmanları",
    "shortTitle": "Sprey, Rulo & Fırça",
    "desc": "Akrilik sprey boyalar, iç/dış cephe ruloları, profesyonel kestirme fırçaları ve şantiye koruma örtüleri.",
    "pills": [
      {
        "id": "all",
        "label": "Tümü"
      },
      {
        "id": "sprey",
        "label": "Akrilik Sprey Serisi"
      },
      {
        "id": "rulo",
        "label": "İç & Dış Cephe Ruloları"
      },
      {
        "id": "firca",
        "label": "Boya & Kestirme Fırçaları"
      },
      {
        "id": "destek",
        "label": "Maskeleme, Branda & Eldiven"
      }
    ]
  }
};

  var currentActiveTab = "faworiInteriorPanel";
  var activeFilters = {
    faworiInteriorPanel: "all",
    faworiExteriorPanel: "all",
    faworiSyntheticPanel: "all",
    faworiInsulationPanel: "all",
    faworiSupportPanel: "all"
  };

  // DOM Elements
  var subnav = document.getElementById("pvSubnav");
  var subnavTabs = document.querySelectorAll(".pv-subnav-tab");
  var tabPanels = document.querySelectorAll(".pv-tab-panel");
  var deptDrawerTrigger = document.getElementById("pvDeptDrawerTrigger");
  var deptDrawerBackdrop = document.getElementById("pvDeptDrawerBackdrop");
  var deptDrawerCloseBtn = document.getElementById("pvDrawerCloseBtn");
  var deptList = document.getElementById("pvDeptList");
  var mobileFilterRail = document.getElementById("pvMobileFilterRail");
  var mobileFilterRailWrap = document.getElementById("pvMobileFilterRailWrap");

  // Modal Elements
  var modalBackdrop = document.getElementById("modalBackdrop");
  var modalSheet = document.getElementById("modalSheet");
  var modalCloseBtn = document.getElementById("modalCloseBtn");
  var modalDragHandle = document.getElementById("modalDragHandle");
  var modalBadge = document.getElementById("modalBadge");
  var modalTag = document.getElementById("modalTag");
  var modalImg = document.getElementById("modalImg");
  var modalTitle = document.getElementById("modalTitle");
  var modalDesc = document.getElementById("modalDesc");
  var modalPackagingPills = document.getElementById("modalPackagingPills");
  var modalCoverageVal = document.getElementById("modalCoverageVal");
  var modalCoverageMeta = document.getElementById("modalCoverageMeta");
  var modalSpecStandard = document.getElementById("modalSpecStandard");
  var modalSpecPackaging = document.getElementById("modalSpecPackaging");
  var modalSpecConsumption = document.getElementById("modalSpecConsumption");
  var modalSpecMixing = document.getElementById("modalSpecMixing");
  var modalSpecPotLife = document.getElementById("modalSpecPotLife");
  var modalSpecLogistics = document.getElementById("modalSpecLogistics");
  var modalAccordions = document.getElementById("modalAccordions");
  var modalWABtn = document.getElementById("modalWABtn");

  // Spotlight Elements
  var spotlightTrigger = document.getElementById("pvSpotlightTrigger");
  var spotlightBackdrop = document.getElementById("pvSpotlightBackdrop");
  var spotlightCloseBtn = document.getElementById("pvSpotlightCloseBtn");
  var spotlightInput = document.getElementById("pvSpotlightInput");
  var spotlightResults = document.getElementById("pvSpotlightResults");
  var spotlightCount = document.getElementById("pvSpotlightCount");
  var spotlightSelectedIdx = -1;

  // TAB SWITCHING
  function switchTab(targetDeptId) {
    if (!DEPARTMENTS_DATA[targetDeptId]) return;
    currentActiveTab = targetDeptId;

    subnavTabs.forEach(function(tab) {
      var matches = tab.getAttribute("data-tab") === targetDeptId;
      tab.classList.toggle("active", matches);
      tab.setAttribute("aria-selected", matches ? "true" : "false");
      if (matches) {
        tab.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    });

    tabPanels.forEach(function(panel) {
      panel.classList.toggle("active", panel.id === targetDeptId);
    });

    syncMobileFilterRail(targetDeptId);
    renderDeptDrawer(targetDeptId);
  }

  subnavTabs.forEach(function(tab) {
    tab.addEventListener("click", function() {
      var target = this.getAttribute("data-tab");
      switchTab(target);
    });
  });

  // FILTER PILLS
  function applyFilter(deptId, filterId) {
    activeFilters[deptId] = filterId;
    var panel = document.getElementById(deptId);
    if (!panel) return;

    var pills = panel.querySelectorAll(".pv-menu-pill");
    pills.forEach(function(p) {
      p.classList.toggle("active", p.getAttribute("data-filter") === filterId);
    });

    if (mobileFilterRailWrap) {
      var railPills = mobileFilterRailWrap.querySelectorAll(".pv-mobile-pill");
      railPills.forEach(function(rp) {
        rp.classList.toggle("active", rp.getAttribute("data-filter") === filterId);
      });
    }

    var rows = panel.querySelectorAll(".pv-menu-row");
    rows.forEach(function(row) {
      var rowCat = row.getAttribute("data-category");
      if (filterId === "all" || rowCat === filterId) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  }

  // Bind desktop pills
  tabPanels.forEach(function(panel) {
    var pills = panel.querySelectorAll(".pv-menu-pill");
    pills.forEach(function(pill) {
      pill.addEventListener("click", function() {
        var f = this.getAttribute("data-filter");
        applyFilter(panel.id, f);
      });
    });
  });

  // MOBILE FILTER RAIL
  function syncMobileFilterRail(deptId) {
    if (!mobileFilterRail || !DEPARTMENTS_DATA[deptId]) return;
    var dept = DEPARTMENTS_DATA[deptId];
    mobileFilterRail.innerHTML = "";

    dept.pills.forEach(function(p) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "pv-mobile-pill" + (activeFilters[deptId] === p.id ? " active" : "");
      btn.setAttribute("data-filter", p.id);
      btn.textContent = p.label;
      btn.addEventListener("click", function() {
        applyFilter(deptId, p.id);
      });
      mobileFilterRail.appendChild(btn);
    });
  }

  // DRAWER
  function renderDeptDrawer(activeId) {
    if (!deptList) return;
    deptList.innerHTML = "";

    Object.keys(DEPARTMENTS_DATA).forEach(function(key) {
      var d = DEPARTMENTS_DATA[key];
      var count = FAWORI_PRODUCTS_DATA.filter(function(p) { return p.deptId === key; }).length;
      var item = document.createElement("div");
      item.className = "pv-drawer-item" + (key === activeId ? " active" : "");
      item.innerHTML = [
        '<div class="pv-drawer-item-content">',
        '  <span class="pv-drawer-item-title">' + d.title + '</span>',
        '  <span class="pv-drawer-item-sub">' + d.desc + '</span>',
        '</div>',
        '<div class="pv-drawer-item-count">' + count + ' Ürün</div>'
      ].join("");

      item.addEventListener("click", function() {
        switchTab(key);
        closeDeptDrawer();
      });
      deptList.appendChild(item);
    });
  }

  function openDeptDrawer() {
    if (!deptDrawerBackdrop) return;
    deptDrawerBackdrop.classList.add("open");
    deptDrawerBackdrop.classList.add("is-open");
    deptDrawerBackdrop.setAttribute("aria-hidden", "false");
    document.body.classList.add("pv-modal-open");
  }

  function closeDeptDrawer() {
    if (!deptDrawerBackdrop) return;
    deptDrawerBackdrop.classList.remove("open");
    deptDrawerBackdrop.classList.remove("is-open");
    deptDrawerBackdrop.setAttribute("aria-hidden", "true");
    document.body.classList.remove("pv-modal-open");
  }

  if (deptDrawerTrigger) deptDrawerTrigger.addEventListener("click", openDeptDrawer);
  if (deptDrawerCloseBtn) deptDrawerCloseBtn.addEventListener("click", closeDeptDrawer);
  if (deptDrawerBackdrop) {
    deptDrawerBackdrop.addEventListener("click", function(e) {
      if (e.target === deptDrawerBackdrop) closeDeptDrawer();
    });
  }

  // SPECIMEN MODAL LOGIC (DUAL .open / .is-open)
  function openModal(productId) {
    var p = FAWORI_PRODUCTS_DATA.find(function(it) { return it.id === productId; });
    if (!p || !modalBackdrop || !modalSheet) return;

    if (modalBadge) modalBadge.textContent = p.badge;
    if (modalTag) modalTag.textContent = p.tag;
    if (modalImg) {
      modalImg.src = p.thumb;
      modalImg.alt = p.name;
    }
    if (modalTitle) modalTitle.textContent = p.name;
    if (modalDesc) modalDesc.textContent = p.desc;

    // Packaging Pills
    if (modalPackagingPills) {
      modalPackagingPills.innerHTML = "";
      var sizes = (p.sizes && p.sizes.length > 0) ? p.sizes : ["Standart Ambalaj"];
      sizes.forEach(function(size, idx) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "pv-pkg-pill" + (idx === 0 ? " active" : "");
        btn.textContent = size;
        btn.addEventListener("click", function() {
          modalPackagingPills.querySelectorAll(".pv-pkg-pill").forEach(function(b) { b.classList.remove("active"); });
          btn.classList.add("active");
          updateWAInquiry(p, size);
        });
        modalPackagingPills.appendChild(btn);
      });
    }

    if (modalCoverageVal) modalCoverageVal.textContent = p.coverage || "Standart";
    if (modalCoverageMeta) modalCoverageMeta.textContent = "Teknik şartnameye uygun yüzey sarfiyatı";

    if (p.specs) {
      if (modalSpecStandard) modalSpecStandard.textContent = p.specs.standard || "TS EN & Betek Kimya Güvencesi";
      if (modalSpecPackaging) modalSpecPackaging.textContent = p.specs.packaging || (p.sizes ? p.sizes.join(", ") : "-");
      if (modalSpecConsumption) modalSpecConsumption.textContent = p.specs.consumption || p.coverage || "-";
      if (modalSpecMixing) modalSpecMixing.textContent = p.specs.mixingRatio || "Orijinal ambalajında kullanıma hazır";
      if (modalSpecPotLife) modalSpecPotLife.textContent = p.specs.potLife || "2 Yıl";
      if (modalSpecLogistics) modalSpecLogistics.textContent = p.specs.logistics || "Balçova Showroom & Urla Ana Depo Stok";
    }

    if (modalAccordions) {
      modalAccordions.innerHTML = "";
      var accs = p.accordions || [];
      accs.forEach(function(acc, idx) {
        var item = document.createElement("div");
        item.className = "pv-accordion-item" + (idx === 0 ? " open" : "");
        item.innerHTML = [
          '<button type="button" class="pv-accordion-header" aria-expanded="' + (idx === 0 ? "true" : "false") + '">',
          '  <span>' + acc.title + '</span>',
          '  <svg class="pv-accordion-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>',
          '</button>',
          '<div class="pv-accordion-body" style="' + (idx === 0 ? "display:block;" : "display:none;") + '">',
          '  <p>' + acc.body + '</p>',
          '</div>'
        ].join("");

        var header = item.querySelector(".pv-accordion-header");
        var body = item.querySelector(".pv-accordion-body");
        header.addEventListener("click", function() {
          var isOpen = item.classList.contains("open");
          item.classList.toggle("open", !isOpen);
          header.setAttribute("aria-expanded", !isOpen ? "true" : "false");
          body.style.display = !isOpen ? "block" : "none";
        });

        modalAccordions.appendChild(item);
      });
    }

    var defaultSize = (p.sizes && p.sizes.length > 0) ? p.sizes[0] : "Standart";
    updateWAInquiry(p, defaultSize);

    // DUAL OPEN CLASSES & RESET INLINE STYLES
    modalSheet.style.transform = "";
    modalSheet.style.transition = "";
    modalBackdrop.style.opacity = "";
    modalBackdrop.classList.add("open");
    modalBackdrop.classList.add("is-open");
    modalBackdrop.setAttribute("aria-hidden", "false");
    document.body.classList.add("pv-modal-open");
  }

  function closeModal() {
    if (!modalBackdrop || !modalSheet) return;
    modalSheet.style.transform = "";
    modalSheet.style.transition = "";
    modalBackdrop.style.opacity = "";
    modalBackdrop.classList.remove("open");
    modalBackdrop.classList.remove("is-open");
    modalBackdrop.setAttribute("aria-hidden", "true");
    document.body.classList.remove("pv-modal-open");
  }

  function updateWAInquiry(product, size) {
    if (!modalWABtn) return;
    var text = "Merhaba, Fawori Boya yetkili bayisi Pervan Yapı üzerinden " + product.name + " (" + size + ") hakkında güncel fiyat ve stok durumu teklifi almak istiyorum.";
    modalWABtn.href = "https://wa.me/905323844497?text=" + encodeURIComponent(text);
  }

  // Row Event Binding
  document.querySelectorAll(".pv-menu-row").forEach(function(row) {
    row.addEventListener("click", function() {
      var pid = this.getAttribute("data-product-id");
      if (pid) openModal(pid);
    });
    row.addEventListener("keydown", function(e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        var pid = this.getAttribute("data-product-id");
        if (pid) openModal(pid);
      }
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", function(e) {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  // Touch drag-to-dismiss
  var startY = 0;
  var currentY = 0;
  var isDragging = false;

  if (modalDragHandle && modalSheet) {
    modalDragHandle.addEventListener("touchstart", function(e) {
      startY = e.touches[0].clientY;
      isDragging = true;
      modalSheet.style.transition = "none";
    }, { passive: true });

    window.addEventListener("touchmove", function(e) {
      if (!isDragging) return;
      currentY = e.touches[0].clientY;
      var diff = currentY - startY;
      if (diff > 0) {
        modalSheet.style.transform = "translateY(" + diff + "px)";
      }
    }, { passive: true });

    window.addEventListener("touchend", function() {
      if (!isDragging) return;
      isDragging = false;
      var diff = currentY - startY;
      modalSheet.style.transition = "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)";
      if (diff > 120) {
        closeModal();
      } else {
        modalSheet.style.transform = "";
      }
    });
  }

  // SPOTLIGHT COMMAND PALETTE
  function normalizeTr(str) {
    if (!str) return "";
    return str.replace(/İ/g, "i")
              .replace(/I/g, "ı")
              .replace(/Ş/g, "s")
              .replace(/ş/g, "s")
              .replace(/Ğ/g, "g")
              .replace(/ğ/g, "g")
              .replace(/Ü/g, "u")
              .replace(/ü/g, "u")
              .replace(/Ö/g, "o")
              .replace(/ö/g, "o")
              .replace(/Ç/g, "c")
              .replace(/ç/g, "c")
              .toLowerCase()
              .trim();
  }

  function getProductDomain(deptId) {
    if (deptId === "faworiInteriorPanel") return "İç Cephe";
    if (deptId === "faworiExteriorPanel") return "Dış Cephe";
    if (deptId === "faworiSyntheticPanel") return "Sentetik & Vernik";
    if (deptId === "faworiInsulationPanel") return "Optimix® Yalıtım";
    if (deptId === "faworiSupportPanel") return "Sprey & Donanım";
    return "Fawori";
  }

  function openSpotlight() {
    if (!spotlightBackdrop) return;
    spotlightBackdrop.classList.add("open");
    spotlightBackdrop.classList.add("is-open");
    spotlightBackdrop.setAttribute("aria-hidden", "false");
    document.body.classList.add("pv-modal-open");
    if (spotlightInput) {
      spotlightInput.value = "";
      setTimeout(function() { spotlightInput.focus(); }, 60);
    }
    renderSpotlightInitial();
  }

  function closeSpotlight() {
    if (!spotlightBackdrop) return;
    spotlightBackdrop.classList.remove("open");
    spotlightBackdrop.classList.remove("is-open");
    spotlightBackdrop.setAttribute("aria-hidden", "true");
    document.body.classList.remove("pv-modal-open");
  }

  function renderSpotlightInitial() {
    if (!spotlightResults) return;
    spotlightResults.innerHTML = "";
    spotlightSelectedIdx = -1;

    var featured = FAWORI_PRODUCTS_DATA.slice(0, 10);
    var heading = document.createElement("div");
    heading.className = "pv-spotlight-group-title";
    heading.textContent = "Öne Çıkan Fawori Ürünleri";
    spotlightResults.appendChild(heading);

    featured.forEach(function(item) {
      spotlightResults.appendChild(createSpotlightItemEl(item));
    });

    if (spotlightCount) {
      spotlightCount.textContent = FAWORI_PRODUCTS_DATA.length + " Ürün Kataloğu";
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
    var matches = FAWORI_PRODUCTS_DATA.filter(function(item) {
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
        var p = FAWORI_PRODUCTS_DATA.find(function(it) { return it.id === pid; });
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
      if (spotlightBackdrop && (spotlightBackdrop.classList.contains("open") || spotlightBackdrop.classList.contains("is-open"))) {
        closeSpotlight();
      } else if (modalBackdrop && (modalBackdrop.classList.contains("open") || modalBackdrop.classList.contains("is-open"))) {
        closeModal();
      } else if (deptDrawerBackdrop && (deptDrawerBackdrop.classList.contains("open") || deptDrawerBackdrop.classList.contains("is-open"))) {
        closeDeptDrawer();
      }
    }
  });

  // Deep linking via URL hash: #urun-<id>
  window.addEventListener("load", function() {
    var hash = window.location.hash;
    if (hash && hash.indexOf("#urun-") === 0) {
      var targetId = hash.replace("#urun-", "");
      var p = FAWORI_PRODUCTS_DATA.find(function(it) { return it.id === targetId; });
      if (p) {
        if (p.deptId && p.deptId !== currentActiveTab) {
          switchTab(p.deptId);
        }
        openModal(targetId);
      }
    }
  });

  // INITIAL SETUP
  renderDeptDrawer("faworiInteriorPanel");
  syncMobileFilterRail("faworiInteriorPanel");
})();
