/* ==========================================================================
   PERVAN FAWORİ BOYA & ISI YALITIM INTERACTIVE ARCHITECTURAL CATALOG
   Betek Kimya / Fawori Boya Yetkili Bayi Dağıtım Sistemi
   ========================================================================== */

/* 1. CINEMATIC HERO SLIDER CONTROLLER */
(function() {
  var stage = document.getElementById("pvHeroStage");
  var bulletsContainer = document.getElementById("pvHeroBullets");
  if (!stage || !bulletsContainer) return;

  var slides = stage.querySelectorAll(".pv-hero-slide");
  var bullets = bulletsContainer.querySelectorAll(".pv-bullet");
  var currentIndex = 0;
  var totalSlides = slides.length;
  var autoPlayTimer = null;

  function goToSlide(index, manual) {
    if (index < 0 || index >= totalSlides) return;
    slides.forEach(function(slide, i) {
      slide.classList.toggle("active", i === index);
    });
    bullets.forEach(function(bullet, i) {
      bullet.classList.toggle("active", i === index);
    });
    currentIndex = index;
    if (manual) restartAutoPlay();
  }

  bullets.forEach(function(bullet, i) {
    bullet.addEventListener("click", function() {
      goToSlide(i, true);
    });
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
    "desc": "İlk defa boyanacak veya pürüzlü dış cephe yüzeylerinde yüksek emiş gücü sağlayan %100 polyamid rulo.",
    "meta": [
      "Uygulama Rulosu",
      "Ambalaj: Standart Ambalaj",
      "Şantiye Ekipmanı"
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
    "id": "fawori-premium-dis-cephe-astari",
    "url": "https://fawori.com/urunler/dis-cephe-urun-grubu/fawori-premium-dis-cephe-astari",
    "name": "Fawori Premium Dış Cephe Astarı",
    "deptId": "faworiExteriorPanel",
    "category": "astar-dis",
    "badge": "Dış Cephe Astarı",
    "tag": "Boya ile yüzey arasında bağlayıcı köprü kurar",
    "thumb": "assets/fawori/fawori-premium-dis-cephe-astari.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1774350512/FAWORI/premium_astar_d6d221d6cf.jpg",
    "desc": "Silikonlu ve akrilik dış cephe boyaları öncesinde yüzey aderansını artıran ve boya sarfiyatını azaltan astar.",
    "meta": [
      "Dış Cephe Astarı",
      "Ambalaj: 20 KG / 10 KG",
      "Betek Kimya Güvencesi"
    ],
    "coverage": "4,5 – 7,7 m²/kg",
    "sizes": [
      "20 KG",
      "10 KG",
      "3,5 KG"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "20 KG - 10 KG - 3,5 KG",
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
    "desc": "Mat görünümlü, canlı renklere sahip, yüksek örtücülük ve su iticilik sağlayan son kat silikonlu dış cephe boyası.",
    "meta": [
      "Silikonlu Dış Cephe",
      "Ambalaj: 15 L / 7,5 L",
      "Betek Kimya Güvencesi"
    ],
    "coverage": "7-11 m²/L",
    "sizes": [
      "15 L",
      "7,5 L",
      "2,5 L"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "15 L - 7,5 L - 2,5 L",
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
    "desc": "Silikon katkılı, mercan rulo ile desen verilebilen, cephe kusurlarını kamufle eden elastik grenli dış kaplama.",
    "meta": [
      "Grenli Dış Kaplama",
      "Ambalaj: 25 KG",
      "Betek Kimya Güvencesi"
    ],
    "coverage": "0,75 – 1,1 m²/kg",
    "sizes": [
      "25 KG"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "25 KG",
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
    "desc": "%100 saf akrilik bağlayıcılı, esnek elastomerik yapıda, sahil iklimi ve ağır hava koşullarına dayanıklı dış cephe boyası.",
    "meta": [
      "Saf Akrilik Zırh",
      "Ambalaj: 15 L",
      "Betek Kimya Güvencesi"
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
    "desc": "Akrilik kopolimer emülsiyon esaslı, mat görünümlü, UV ışınlarına ve iklim koşullarına dayanıklı son kat boya.",
    "meta": [
      "Silikonlu Dış Cephe",
      "Ambalaj: 20 KG",
      "Betek Kimya Güvencesi"
    ],
    "coverage": "6,5 m²/kg",
    "sizes": [
      "20 KG"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "20 KG",
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
    "desc": "Brüt beton yüzeylerde sıva ve alçı uygulamaları öncesi tutunmayı artıran polimer modifiye aderans astarı.",
    "meta": [
      "Dış Cephe Astarı",
      "Ambalaj: 12 KG",
      "Betek Kimya Güvencesi"
    ],
    "coverage": "4 – 4,5 m²/kg",
    "sizes": [
      "12 KG"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "12 KG",
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
    "desc": "Elyaf katkılı ve silikonlu formülüyle kılcal çatlakları köprüleyen dekoratif tekstürlü dış cephe kaplaması.",
    "meta": [
      "Grenli Dış Kaplama",
      "Ambalaj: 20 KG",
      "Betek Kimya Güvencesi"
    ],
    "coverage": "0,7 – 1,1 m²/kg",
    "sizes": [
      "20 KG"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "20 KG",
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
    "desc": "Yüksek aderans gücüyle boya ile yüzey arasında bağlayıcı köprü kuran nefes alabilen silikonlu dış cephe astarı.",
    "meta": [
      "Dış Cephe Astarı",
      "Ambalaj: 20 KG",
      "Betek Kimya Güvencesi"
    ],
    "coverage": "7,5 m²/kg",
    "sizes": [
      "20 KG"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "20 KG",
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
    "desc": "20-22 kg/m³ yoğunluklu, TS EN 13163 standartlarında yüksek ısı yalıtım performansı sunan beyaz EPS levha.",
    "meta": [
      "Optimix® Yalıtım",
      "Ambalaj: Standart Ambalaj",
      "TS EN Standart"
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
    "desc": "Betonarme yüzeylerde yüksek çekme ve rüzgar vakum yüklerine karşı maksimum tutunma sağlayan çelik çivili dübel.",
    "meta": [
      "Optimix® Yalıtım",
      "Ambalaj: Standart Ambalaj",
      "TS EN Standart"
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
    "desc": "Çimento esaslı, hafif, yüzeyde dekoratif çizgi dokusu oluşturan nefes alan son kat mineral sıva kaplaması.",
    "meta": [
      "Optimix® Yalıtım",
      "Ambalaj: 25 KG Kraft Torba",
      "TS EN Standart"
    ],
    "coverage": "2,0 – 2,5 kg/m²",
    "sizes": [
      "25 KG Kraft Torba"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "25 KG Kraft Torba",
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
    "desc": "Çimento esaslı, su itici, ince tane dokulu cephe görünümü kazandıran dayanıklı dekoratif mineral kaplama.",
    "meta": [
      "Optimix® Yalıtım",
      "Ambalaj: 25 KG Kraft Torba",
      "TS EN Standart"
    ],
    "coverage": "2,0 – 2,5 kg/m²",
    "sizes": [
      "25 KG Kraft Torba"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "25 KG Kraft Torba",
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
    "desc": "Isı yalıtım sistemleri için özel formüle edilmiş, tane dokulu homojen son kat dekoratif mineral sıva.",
    "meta": [
      "Optimix® Yalıtım",
      "Ambalaj: 25 KG Kraft Torba",
      "TS EN Standart"
    ],
    "coverage": "2,0 – 2,5 kg/m²",
    "sizes": [
      "25 KG Kraft Torba"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "25 KG Kraft Torba",
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
    "desc": "Mineral kaplama öncesi yüzey emiciliğini dengeleyen ve aderansı artıran akrilik kopolimer pigmentli astar.",
    "meta": [
      "Dekoratif Mineral Sıva",
      "Ambalaj: 25 KG PE Kova",
      "TS EN Standart"
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
    "desc": "Tuğla ve gazbeton duvarlarda EPS ısı yalıtım levhalarının güvenli montajını sağlayan plastik çivili dübel.",
    "meta": [
      "Optimix® Yalıtım",
      "Ambalaj: Standart Ambalaj",
      "TS EN Standart"
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
    "desc": "TS EN 13163 standartlarına uygun, boyutsal kararlılığı ve buhar geçirgenliği yüksek beyaz EPS levha.",
    "meta": [
      "Optimix® Yalıtım",
      "Ambalaj: Standart Ambalaj",
      "TS EN Standart"
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
    "desc": "Grafit katkısıyla λ = 0,031-0,032 W/mK seviyesinde üstün enerji tasarrufu sağlayan karbonlu EPS levha.",
    "meta": [
      "Optimix® Yalıtım",
      "Ambalaj: Standart Ambalaj",
      "TS EN Standart"
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
    "desc": "Alkali ortamlara dirençli, 160 g/m² ağırlığında, çatlama önleyici yüksek mukavemetli cam iplik donatı filesi.",
    "meta": [
      "Optimix® Yalıtım",
      "Ambalaj: 50m2 (1m x 50m)",
      "TS EN Standart"
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
    "desc": "Dış cephe ısı yalıtım sistemlerinde dekoratif fuga hatları oluşturan su tahliye kanallı PVC profil.",
    "meta": [
      "Optimix® Yalıtım",
      "Ambalaj: 10 adet / 30 m",
      "TS EN Standart"
    ],
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
    "desc": "EPS ve taşyünü levhalar üzerine fileyle birlikte uygulanan, çatlamaya dirençli esnek çimento esaslı sıva harcı.",
    "meta": [
      "Optimix® Yalıtım",
      "Ambalaj: 25 KG kraft torba",
      "TS EN Standart"
    ],
    "coverage": "Polistren levha için : 4,0-4,5 kg/m² Taşyünü levha için : 5,5-6,5 kg/m² Belirtilen sarfiyat miktarlarının yüzey ve uygulama şartlarına göre farklılık gösterebileceği dikkate alınmalıdır. Kesin sarfiyat için kontrollü numune yapılmalıdır.",
    "sizes": [
      "25 KG kraft torba"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "25 KG kraft torba",
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
    "desc": "Isı yalıtım levhalarını mineral yüzeylere güçlü bir şekilde tutturan, kayma dirençli çimento esaslı yapıştırıcı.",
    "meta": [
      "Optimix® Yalıtım",
      "Ambalaj: 25 KG kraft torba",
      "TS EN Standart"
    ],
    "coverage": "Polistren levha için : 4,0-4,5 kg/m² Taşyünü levha için : 5,5-6,5 kg/m² Belirtilen sarfiyat miktarlarının yüzey ve uygulama şartlarına göre farklılık gösterebileceği dikkate alınmalıdır. Kesin sarfiyat için kontrollü numune yapılmalıdır.",
    "sizes": [
      "25 KG kraft torba"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "25 KG kraft torba",
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
    "desc": "Pencere denizliklerinin yetersiz kaldığı mantolama cephelerinde su tahliyesini uzatan kendinden fileli profil.",
    "meta": [
      "Optimix® Yalıtım",
      "Ambalaj: 5 cm’lik : 25 adet / 75 m 8 cm’lik : 20 adet",
      "TS EN Standart"
    ],
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
    "desc": "Bina köşe ve pencere kenarlarını darbelere karşı koruyan, düzgün hat sağlayan 2,5 m fileli PVC köşe profili.",
    "meta": [
      "Optimix® Yalıtım",
      "Ambalaj: 50 adet / 125 m",
      "TS EN Standart"
    ],
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
    "desc": "Taşyünü levha mantolamasında basma alanını 9 cm çapa genişleterek liflerin ezilmesini önleyen dübel pulu.",
    "meta": [
      "Optimix® Yalıtım",
      "Ambalaj: Standart Ambalaj",
      "TS EN Standart"
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
    "desc": "Taşyünü yalıtım sistemlerinde yangın güvenliği ve ağır yük dayanımı sağlayan çelik çivili montaj dübeli.",
    "meta": [
      "Optimix® Yalıtım",
      "Ambalaj: Standart Ambalaj",
      "TS EN Standart"
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
    "desc": "Sentetik boyalı yüzeylerden su bazlı boyalara geçişte tutunmayı sağlayan beyaz pigmentli dönüşüm astarı.",
    "meta": [
      "İç Cephe Astarı",
      "Ambalaj: 20 KG / 10 KG",
      "Betek Kimya Güvencesi"
    ],
    "coverage": "1 kg ile tek katta 5-9,6 m²",
    "sizes": [
      "20 KG",
      "10 KG",
      "3,5 KG"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "20 KG - 10 KG - 3,5 KG",
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
    "desc": "Alçı, kireç badana ve gazbeton gibi yüksek emici yüzeylerde boya sarfiyatını azaltan su bazlı konsantre astar.",
    "meta": [
      "İç Cephe Astarı",
      "Ambalaj: 15 L / 7,5 L",
      "Betek Kimya Güvencesi"
    ],
    "coverage": "95-160 m²/L 1/7 130-220 m²/L 1/10",
    "sizes": [
      "15 L",
      "7,5 L",
      "2,5 L",
      "0,75 L"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "15 L - 7,5 L - 2,5 L - 0,75 L",
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
    "desc": "Silikon esaslı, ipeksi mat dokuya sahip, leke tutmayan ve tam silinebilir birinci sınıf iç cephe boyası.",
    "meta": [
      "İpek Mat Doku",
      "Ambalaj: 15 L / 7,5 L",
      "Betek Kimya Güvencesi"
    ],
    "coverage": "13-25,3 m²/L",
    "sizes": [
      "15 L",
      "7,5 L",
      "2,5 L"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "15 L - 7,5 L - 2,5 L",
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
    "desc": "İç mekan duvar ve tavanlardaki pürüzleri gideren, kolay zımparalanan ve çatlamayan dolgu macunu.",
    "meta": [
      "Pürüzsüz Dolgu",
      "Ambalaj: 1,1 KG",
      "Betek Kimya Güvencesi"
    ],
    "coverage": "Standart Sarfiyat",
    "sizes": [
      "1,1 KG"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "1,1 KG",
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
    "desc": "Amerikan panel kapılar ve ahşap doğramalar için sararmayan, su bazlı ve silinebilir yarı mat kapı boyası.",
    "meta": [
      "Su Bazlı Yarı Mat",
      "Ambalaj: 2,5 L / 0,75 L",
      "Betek Kimya Güvencesi"
    ],
    "coverage": "13-23 m²/L",
    "sizes": [
      "2,5 L",
      "0,75 L"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "2,5 L - 0,75 L",
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
    "desc": "Mat görünümlü, yüksek örtücülüğe sahip, kolay uygulanan ekonomik emülsiyon esaslı iç cephe plastik boyası.",
    "meta": [
      "Silikonlu & Plastik",
      "Ambalaj: 20 KG / 10 KG",
      "Betek Kimya Güvencesi"
    ],
    "coverage": "Sarfiyat kısmını 1 kg ile tek katta 8-16 m²",
    "sizes": [
      "20 KG",
      "10 KG",
      "3,5 KG"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "20 KG - 10 KG - 3,5 KG",
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
    "desc": "Yeni mineral yüzeylerde son kat boyanın örtücülüğünü artıran beyaz pigmentli ince dokulu iç cephe astarı.",
    "meta": [
      "İç Cephe Astarı",
      "Ambalaj: 20 KG / 10 KG",
      "Betek Kimya Güvencesi"
    ],
    "coverage": "1 kg ile tek katta 7,8-11 m²",
    "sizes": [
      "20 KG",
      "10 KG",
      "3,5 KG"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "20 KG - 10 KG - 3,5 KG",
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
    "desc": "Mevcut seramik ve fayans yüzeyler kırılmadan üzerine kaplama yapılmasını sağlayan yüksek aderanslı astar.",
    "meta": [
      "İç Cephe Astarı",
      "Ambalaj: 3,5 KG",
      "Betek Kimya Güvencesi"
    ],
    "coverage": "1 Kg ile tek katta 10-16 m²",
    "sizes": [
      "3,5 KG"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "3,5 KG",
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
    "desc": "Silikon katkısı sayesinde yüksek nefes alma ve silinme direnci sunan dekoratif mat iç cephe boyası.",
    "meta": [
      "Silikonlu & Plastik",
      "Ambalaj: 20 KG / 10 KG",
      "Betek Kimya Güvencesi"
    ],
    "coverage": "1 kg ile tek katta 8-11 m²",
    "sizes": [
      "20 KG",
      "10 KG",
      "3,5 KG"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "20 KG - 10 KG - 3,5 KG",
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
    "desc": "Alçılı ve tozuyan yüzeyleri bağlayarak boya sarfiyatını düşüren kullanıma hazır şeffaf iç cephe astarı.",
    "meta": [
      "İç Cephe Astarı",
      "Ambalaj: 20 L / 5 L",
      "Betek Kimya Güvencesi"
    ],
    "coverage": "1 L ile tek katta 8-12,5 m²",
    "sizes": [
      "20 L",
      "5 L"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "20 L - 5 L",
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
    "desc": "Rulo ve fırça izi bırakmayan, ekstra beyaz ve mat dokulu, yüksek kapatıcılığa sahip tavan boyası.",
    "meta": [
      "Tam Mat Beyaz",
      "Ambalaj: 17,5 KG / 10 KG",
      "Betek Kimya Güvencesi"
    ],
    "coverage": "5,5 - 9,5 m²/kg",
    "sizes": [
      "17,5 KG",
      "10 KG",
      "3,5 KG"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "17,5 KG - 10 KG - 3,5 KG",
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
    "desc": "Işığı mükemmel dağıtan soft mat dokulu, parlama yapmayan, tam silinebilir lüks su bazlı iç cephe boyası.",
    "meta": [
      "Ultra Soft Mat",
      "Ambalaj: 15 L / 7,5 L",
      "Betek Kimya Güvencesi"
    ],
    "coverage": "13-24 m²/L",
    "sizes": [
      "15 L",
      "7,5 L",
      "2,5 L"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "15 L - 7,5 L - 2,5 L",
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
    "desc": "Gözenekli yüzeylerde boya emilimini dengeleyen, tozuma önleyici ekonomik konsantre astar.",
    "meta": [
      "İç Cephe Astarı",
      "Ambalaj: 15 L / 2,5 L",
      "Betek Kimya Güvencesi"
    ],
    "coverage": "Standart Sarfiyat",
    "sizes": [
      "15 L",
      "2,5 L"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "15 L - 2,5 L",
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
    "desc": "Silikonlu, silinebilme özelliği olan, ipek mat dokuda dekoratif son kat su bazlı iç cephe boyası.",
    "meta": [
      "Silikonlu & Plastik",
      "Ambalaj: 20 KG / 10 KG",
      "Betek Kimya Güvencesi"
    ],
    "coverage": "1 L ile tek katta 13-20 m²",
    "sizes": [
      "20 KG",
      "10 KG",
      "3,5 KG"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "20 KG - 10 KG - 3,5 KG",
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
    "desc": "Dekoratif mat bitişli, kokusuz, kolay uygulanan ekonomik iç cephe plastik duvar boyası.",
    "meta": [
      "Silikonlu & Plastik",
      "Ambalaj: 20 KG / 10 KG",
      "Betek Kimya Güvencesi"
    ],
    "coverage": "1 L ile tek katta 10,5 m²",
    "sizes": [
      "20 KG",
      "10 KG",
      "3,5 KG"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "20 KG - 10 KG - 3,5 KG",
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
    "desc": "Ekstra örtücü, mat beyaz dokulu, nefes alma kabiliyeti yüksek ekonomik tavan boyası.",
    "meta": [
      "Tam Mat Beyaz",
      "Ambalaj: 17,5 KG / 10 KG",
      "Betek Kimya Güvencesi"
    ],
    "coverage": "1 L ile tek katta 5-9 m²",
    "sizes": [
      "17,5 KG",
      "10 KG",
      "3,5 KG"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "17,5 KG - 10 KG - 3,5 KG",
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
    "desc": "Silikonlu yapısıyla nem direnci sağlayan, fırça izi bırakmayan mat dekoratif iç cephe boyası.",
    "meta": [
      "Silikonlu & Plastik",
      "Ambalaj: 20 KG / 10 KG",
      "Betek Kimya Güvencesi"
    ],
    "coverage": "1 L ile tek katta 13-20 m²",
    "sizes": [
      "20 KG",
      "10 KG",
      "3,5 KG"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "20 KG - 10 KG - 3,5 KG",
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
    "desc": "İç cephede son kat boyanın yüzeye homojen tutunmasını sağlayan örtücü beyaz astar.",
    "meta": [
      "İç Cephe Astarı",
      "Ambalaj: 15 L / 7,5 L",
      "Betek Kimya Güvencesi"
    ],
    "coverage": "14-20 m²/L",
    "sizes": [
      "15 L",
      "7,5 L",
      "2,5 L"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "15 L - 7,5 L - 2,5 L",
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
    "desc": "Ahşap, metal, cam ve sert plastik yüzeylerde hızlı kuruyan parlak ve mat renkli akrilik sprey boya.",
    "meta": [
      "Akrilik Hızlı Kuruma",
      "Ambalaj: Standart Ambalaj",
      "Şantiye Ekipmanı"
    ],
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
    "desc": "Hobi ve dekorasyon projelerinde yüzeyi sararmadan koruyan, çizilmeye dayanıklı akrilik sprey vernik.",
    "meta": [
      "Akrilik Hızlı Kuruma",
      "Ambalaj: Standart Ambalaj",
      "Şantiye Ekipmanı"
    ],
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
    "desc": "İç cephe plastik ve akrilik boyalarında damlatma yapmayan, homojen dağılım sağlayan polyamid rulo.",
    "meta": [
      "Uygulama Rulosu",
      "Ambalaj: Standart Ambalaj",
      "Şantiye Ekipmanı"
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
    "id": "floresan-sprey-boya",
    "url": "https://fawori.com/urunler/sprey-urun-grubu/floresan-sprey-boya",
    "name": "Floresan Sprey Boya",
    "deptId": "faworiSupportPanel",
    "category": "sprey",
    "badge": "Akrilik Sprey",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/floresan-sprey-boya.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1770881282/FAWORI/floresan_sprey_boya_482ed0ba1f.jpg",
    "desc": "Güvenlik, işaretleme ve hobi amaçlı projelerde karanlıkta fark edilen canlı neon renkli sprey boya.",
    "meta": [
      "Akrilik Hızlı Kuruma",
      "Ambalaj: Standart Ambalaj",
      "Şantiye Ekipmanı"
    ],
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
    "desc": "Boya, tiner ve kimyasal temasında eli tahrişten koruyan esnek, pudrasız mavi nitril iş eldiveni.",
    "meta": [
      "Uygulama & Şantiye Destek",
      "Ambalaj: Standart Ambalaj",
      "Şantiye Ekipmanı"
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
    "id": "nitril-eldiven-sari",
    "url": "https://fawori.com/urunler/uygulama-destek-urun-grubu/nitril-eldiven-sari",
    "name": "FWR5 Nitril Eldiven - Sarı",
    "deptId": "faworiSupportPanel",
    "category": "destek",
    "badge": "Uygulama & Şantiye Destek",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/nitril-eldiven-sari.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1707116925/FAWORI/nitril_eldiven_sarijpg_b1b460103a.jpg",
    "desc": "Ağır şantiye işlerinde aşınma ve delinmeye karşı üstün koruma sağlayan sarı kaplamalı iş eldiveni.",
    "meta": [
      "Uygulama & Şantiye Destek",
      "Ambalaj: Standart Ambalaj",
      "Şantiye Ekipmanı"
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
    "id": "isiya-dayanikli-sprey-boya",
    "url": "https://fawori.com/urunler/sprey-urun-grubu/isiya-dayanikli-sprey-boya",
    "name": "Isıya Dayanıklı Sprey Boya",
    "deptId": "faworiSupportPanel",
    "category": "sprey",
    "badge": "Akrilik Sprey",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/isiya-dayanikli-sprey-boya.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1770881334/FAWORI/isiya_dayanikli_sprey_boya_e8c8e4fd87.jpg",
    "desc": "Soba, mangal, egzoz ve kazan yüzeylerinde 600°C ısıya kadar dayanım gösteren silikonlu sprey boya.",
    "meta": [
      "Akrilik Hızlı Kuruma",
      "Ambalaj: Standart Ambalaj",
      "Şantiye Ekipmanı"
    ],
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
    "desc": "Araç jantlarında taş çarpmalarına ve balata tozuna karşı dirençli metalik alüminyum gri jant boyası.",
    "meta": [
      "Uygulama & Şantiye Destek",
      "Ambalaj: Standart Ambalaj",
      "Şantiye Ekipmanı"
    ],
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
    "desc": "Duvar köşeleri ve tavan birleşimlerinde kıl dökmeyen, epoksi yapıştırıcılı profesyonel kestirme fırçası.",
    "meta": [
      "Uygulama Fırçası",
      "Ambalaj: Standart Ambalaj",
      "Şantiye Ekipmanı"
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
    "id": "koruma-ortusu",
    "url": "https://fawori.com/urunler/uygulama-destek-urun-grubu/koruma-ortusu",
    "name": "Koruma Örtüsü",
    "deptId": "faworiSupportPanel",
    "category": "destek",
    "badge": "Uygulama & Şantiye Destek",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/koruma-ortusu.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1707116925/FAWORI/koruma_ortusu_d284ec751e.jpg",
    "desc": "Boya ve tadilat sırasında mobilyaları, zeminleri toz ve boya damlalarından koruyan polietilen örtü.",
    "meta": [
      "Uygulama & Şantiye Destek",
      "Ambalaj: Standart Ambalaj",
      "Şantiye Ekipmanı"
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
    "id": "kozmik-ipek-rulo",
    "url": "https://fawori.com/urunler/yardimci-urunler/kozmik-ipek-rulo",
    "name": "Kozmik İpek Rulo",
    "deptId": "faworiSupportPanel",
    "category": "rulo",
    "badge": "Uygulama Rulosu",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/kozmik-ipek-rulo.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1770878053/FAWORI/kozmik_ipek_rulo_300a267cf3.jpg",
    "desc": "Kozmik İpek ve soft mat boyaların duvarda pürüzsüz kadife doku oluşturmasını sağlayan mikroelyaf rulo.",
    "meta": [
      "İpek Mat Doku",
      "Ambalaj: Standart Ambalaj",
      "Şantiye Ekipmanı"
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
    "id": "krom-efekt-sprey-boya",
    "url": "https://fawori.com/urunler/sprey-urun-grubu/krom-efekt-sprey-boya",
    "name": "Krom Efekt Sprey Boya",
    "deptId": "faworiSupportPanel",
    "category": "sprey",
    "badge": "Akrilik Sprey",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/krom-efekt-sprey-boya.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1770881318/FAWORI/krom_efekt_sprey_boya_f496fd8e9b.jpg",
    "desc": "Dekoratif objelerde, metal ve ahşap detaylarda parlak ayna krom efekti oluşturan estetik sprey boya.",
    "meta": [
      "Akrilik Hızlı Kuruma",
      "Ambalaj: Standart Ambalaj",
      "Şantiye Ekipmanı"
    ],
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
    "desc": "Boya uygulamalarında keskin hatlar sağlayan, söküldüğünde iz ve yapışkan bırakmayan kağıt bant.",
    "meta": [
      "Uygulama & Şantiye Destek",
      "Ambalaj: Standart Ambalaj",
      "Şantiye Ekipmanı"
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
    "desc": "Grenli dış cephe boyaları ve dekoratif kaplamalarda homojen gözenekli desen oluşturan mercan rulo.",
    "meta": [
      "Uygulama Rulosu",
      "Ambalaj: Standart Ambalaj",
      "Şantiye Ekipmanı"
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
    "id": "metal-teleskopik-sap",
    "url": "https://fawori.com/urunler/uygulama-destek-urun-grubu/metal-teleskopik-sap",
    "name": "Metal Teleskopik Sap",
    "deptId": "faworiSupportPanel",
    "category": "destek",
    "badge": "Uygulama & Şantiye Destek",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/metal-teleskopik-sap.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1718097954/FAWORI/metal_teleskopik_sap_6a731d078d.jpg",
    "desc": "Tavan ve yüksek cephe boyamalarında 2-3 metreye kadar kilitlenebilen hafif alüminyum teleskopik sırık.",
    "meta": [
      "Uygulama & Şantiye Destek",
      "Ambalaj: Standart Ambalaj",
      "Şantiye Ekipmanı"
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
    "id": "metalik-sprey-boya",
    "url": "https://fawori.com/urunler/sprey-urun-grubu/metalik-sprey-boya",
    "name": "Metalik Sprey Boya",
    "deptId": "faworiSupportPanel",
    "category": "sprey",
    "badge": "Akrilik Sprey",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/metalik-sprey-boya.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1770881262/FAWORI/metalik_sprey_boya_d116e73e58.jpg",
    "desc": "Ahşap, metal ve dekoratif aksesuarlara göz alıcı simli metalik ışıltı veren hızlı kuruyan sprey boya.",
    "meta": [
      "Akrilik Hızlı Kuruma",
      "Ambalaj: Standart Ambalaj",
      "Şantiye Ekipmanı"
    ],
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
    "desc": "Radyatör arkaları, kapı pervazları ve dar yüzeylerde pürüzsüz boyama sağlayan pratik mini parmak rulo.",
    "meta": [
      "Uygulama Rulosu",
      "Ambalaj: Standart Ambalaj",
      "Şantiye Ekipmanı"
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
    "id": "pas-sokucu",
    "url": "https://fawori.com/urunler/sprey-urun-grubu/pas-sokucu",
    "name": "Pas Sökücü",
    "deptId": "faworiSupportPanel",
    "category": "sprey",
    "badge": "Pas Sökücü Sprey",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/pas-sokucu.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1770881352/FAWORI/pas_sokucu_5475583fc0.jpg",
    "desc": "Paslanmış cıvata ve mekanik parçaları çözen, yağlayarak pas oluşumunu geciktiren teknik sprey.",
    "meta": [
      "Pas Sökücü Sprey",
      "Ambalaj: Standart Ambalaj",
      "Şantiye Ekipmanı"
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
    "desc": "Şantiye zeminlerini boya damlaları, harç ve darbelerden koruyan ağır hizmet tipi polietilen branda.",
    "meta": [
      "Uygulama & Şantiye Destek",
      "Ambalaj: Standart Ambalaj",
      "Şantiye Ekipmanı"
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
    "id": "robot-firca",
    "url": "https://fawori.com/urunler/su-bazli-boya-fircalari/robot-firca",
    "name": "Robot Fırça",
    "deptId": "faworiSupportPanel",
    "category": "firca",
    "badge": "Uygulama Fırçası",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/robot-firca.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1719985474/FAWORI/Robot_Firca_a7dfbeb4fb.png",
    "desc": "Açılı kıl yapısıyla kalorifer petek araları ve kör noktalarda boya yapmayı kolaylaştıran robot fırça.",
    "meta": [
      "Uygulama Fırçası",
      "Ambalaj: Standart Ambalaj",
      "Şantiye Ekipmanı"
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
    "id": "rulo-elegi",
    "url": "https://fawori.com/urunler/uygulama-destek-urun-grubu/rulo-elegi",
    "name": "Rulo Eleği",
    "deptId": "faworiSupportPanel",
    "category": "destek",
    "badge": "Uygulama & Şantiye Destek",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/rulo-elegi.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1707116925/FAWORI/rulo_elegi_6256cc0f33.jpg",
    "desc": "Rulodaki fazla boyayı homojen olarak süzerek damlatmayı önleyen mukavemetli plastik boya ızgarası.",
    "meta": [
      "Uygulama & Şantiye Destek",
      "Ambalaj: Standart Ambalaj",
      "Şantiye Ekipmanı"
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
    "id": "rulo-sunger-zimpara",
    "url": "https://fawori.com/urunler/uygulama-destek-urun-grubu/rulo-sunger-zimpara",
    "name": "Rulo Sünger Zımpara",
    "deptId": "faworiSupportPanel",
    "category": "destek",
    "badge": "Uygulama & Şantiye Destek",
    "tag": "Betek & Fawori Kalite Standartları",
    "thumb": "assets/fawori/rulo-sunger-zimpara.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1719986575/FAWORI/Rulo_Suenger_Zimpara_36c29e8846.png",
    "desc": "Macunlu ve astarlı yüzeylerin kavislerine uyum sağlayan, tıkanmayan esnek sünger zımpara.",
    "meta": [
      "Uygulama & Şantiye Destek",
      "Ambalaj: Standart Ambalaj",
      "Şantiye Ekipmanı"
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
    "id": "fawori-marin-yat-vernik",
    "url": "https://fawori.com/urunler/sentetik-urun-grubu/fawori-marin-yat-vernik",
    "name": "Fawori Marin Yat Vernik",
    "deptId": "faworiSyntheticPanel",
    "category": "vernik-ahsap",
    "badge": "Yat Vernik & Ahşap",
    "tag": "Yapısındaki UV absorbanları sayesinde ahşabı uzun süre korur. Sararmaya karşı dirençlidir. Ahşabın rengini şeffaf yapısından dolayı değiştirmez. Doğal görünümünü atmosfer koşullarına, neme ve suya karşı koruyan, mükemmel yapışan iç ve dış cephe verniğidir. Mükemmel yayılma gücü ile zaman ve işçilikten tasarruf sağlar.",
    "thumb": "assets/fawori/fawori-marin-yat-vernik.webp",
    "remoteImageUrl": "https://res.cloudinary.com/filli-boya-kurumsal-web-sitesi/image/upload/v1705474739/FAWORI/sentetik_0005_marinyatvernik_91df7e6a04.png",
    "desc": "Deniz suyu, güneş ışınları ve neme karşı ahşap yüzeylere zırh oluşturan yüksek parlaklıkta marin yat vernik.",
    "meta": [
      "Marin Ahşap Zırhı",
      "Ambalaj: 12 L / 2,5 L",
      "Balçova & Urla Stok"
    ],
    "coverage": "1 kg ile tek katta 14-18 m²",
    "sizes": [
      "12 L",
      "2,5 L",
      "0,75 L"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "12 L - 2,5 L - 0,75 L",
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
    "desc": "Yoğun yaya trafiğine ve çizilmelere karşı ahşap parkeleri koruyan üretan alkid esaslı parlak cila.",
    "meta": [
      "Yat Vernik & Ahşap",
      "Ambalaj: 12 L / 2,5 L",
      "Balçova & Urla Stok"
    ],
    "coverage": "14-16 m²/L",
    "sizes": [
      "12 L",
      "2,5 L",
      "0,75 L"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "12 L - 2,5 L - 0,75 L",
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
    "desc": "Kapı, pencere ve ferforjelerde sararmayan, kalıcı ayna parlaklığında son kat sentetik yağlı boya.",
    "meta": [
      "Sentetik Yağlı Boya",
      "Ambalaj: 15 KG / 2,5 KG",
      "Balçova & Urla Stok"
    ],
    "coverage": "1 kg ile tek katta 7-8 m²",
    "sizes": [
      "15 KG",
      "2,5 KG",
      "0,75 KG"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "15 KG - 2,5 KG - 0,75 KG",
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
    "desc": "Demir ve çelik yüzeylerde paslanmayı durduran ve önleyen korozyon dirençli sentetik antipas astar.",
    "meta": [
      "Korozyon Bariyeri",
      "Ambalaj: 15 KG / 2,5 KG",
      "Balçova & Urla Stok"
    ],
    "coverage": "1 kg ile tek katta 7-8 m²",
    "sizes": [
      "15 KG",
      "2,5 KG",
      "0,75 KG"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "15 KG - 2,5 KG - 0,75 KG",
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
    "desc": "Sentetik son kat boyalar öncesinde ahşap ve metalde pürüzsüz yapışma tabakası kuran astar.",
    "meta": [
      "Sentetik Yağlı Boya",
      "Ambalaj: 15 KG / 2,5 KG",
      "Balçova & Urla Stok"
    ],
    "coverage": "1 kg ile tek katta 7-8 m²",
    "sizes": [
      "15 KG",
      "2,5 KG",
      "0,75 KG"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "15 KG - 2,5 KG - 0,75 KG",
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
    "desc": "Sentetik boya, vernik ve antipas uygulamalarında kıvam ayarlayıcı kokusuz sentetik inceltici.",
    "meta": [
      "Sentetik Tiner",
      "Ambalaj: 10 L / 2,5 L",
      "Balçova & Urla Stok"
    ],
    "coverage": "Standart Sarfiyat",
    "sizes": [
      "10 L",
      "2,5 L",
      "1,5 L",
      "0,5 L",
      "0,3 L"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "10 L - 2,5 L - 1,5 L - 0,5 L - 0,3 L",
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
    "desc": "Otopark, şantiye ve asfalt yollarda aşınmaya dayanıklı yüksek görünürlüklü soğuk yol çizgi boyası.",
    "meta": [
      "Yol Çizgi Boyası",
      "Ambalaj: 25 KG",
      "Balçova & Urla Stok"
    ],
    "coverage": "3m²/kg(150 µ film kalınlığı)",
    "sizes": [
      "25 KG"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "25 KG",
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
    "desc": "Ahşabın doğal nefes almasını sağlayan, çürümeye ve hava koşullarına dayanıklı dekoratif ahşap verniği.",
    "meta": [
      "Sentetik Yağlı Boya",
      "Ambalaj: 12 L / 2,5 L",
      "Balçova & Urla Stok"
    ],
    "coverage": "11-13 m²/L",
    "sizes": [
      "12 L",
      "2,5 L",
      "0,75 L"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "12 L - 2,5 L - 0,75 L",
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
    "desc": "Yol çizgi boyasının hızlı kurumasını ve tabanca memesini tıkamadan püskürtülmesini sağlayan özel tiner.",
    "meta": [
      "Sentetik Tiner",
      "Ambalaj: 15 L",
      "Balçova & Urla Stok"
    ],
    "coverage": "Standart Sarfiyat",
    "sizes": [
      "15 L"
    ],
    "specs": {
      "standard": "TS EN Standartları & Betek Kimya Güvencesi",
      "packaging": "15 L",
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
    "desc": "Solvent bazlı boya ve verniklerde kıl bırakmayan, yüksek tutuşlu epoksi yapıştırıcılı yağlı boya fırçası.",
    "meta": [
      "Sentetik Yağlı Boya",
      "Ambalaj: Standart Ambalaj",
      "Balçova & Urla Stok"
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
  }
];

  var DEPARTMENTS_DATA = {
  "faworiInteriorPanel": {
    "badge": "Departman 01 · Kozmik İpek & Ultra Soft",
    "title": "Fawori İpek Mat & Üstün Silinebilir İç Cephe Boyaları",
    "shortTitle": "İç Cephe & Astarlar",
    "desc": "Betek Kimya teknolojisiyle yüksek örtücülük, leke direnci ve kadifemsi doku sunan Kozmik İpek, Ultra Soft Mat ve tavan boyaları.",
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
    "badge": "Departman 02 · Fenomen & Silikonlu Sistemler",
    "title": "Fawori Fenomen Saf Akrilik & Dış Cephe Kaplamaları",
    "shortTitle": "Dış Cephe & Kaplama",
    "desc": "Ege sahil iklimine, UV ışınlarına ve tuz serpintisine karşı maksimum koruma sağlayan Fenomen Saf Akrilik ve silikonlu sistemler.",
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
    "badge": "Departman 03 · Ahşap Koruma & Metal Zırhı",
    "title": "Fawori Sentetik Boya, Marin Vernik & Tinerler",
    "shortTitle": "Sentetik, Vernik & Tiner",
    "desc": "Amerikan panel kapı boyası, marin yat verniği, parke cilası, antipas ve sentetik son kat parlak yağlı boyalar.",
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
    "badge": "Departman 04 · Betek Optimix® Mantolama",
    "title": "Fawori Optimix® Komple Dış Cephe Isı Yalıtım Sistemleri",
    "shortTitle": "Fawori Optimix® Yalıtım",
    "desc": "Karbonlu ve beyaz EPS levhalar, elastik yapıştırma ve sıva harçları, donatı filesi ve dekoratif mineral sıvalar.",
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
    "badge": "Departman 05 · Şantiye & Uygulama Donanımı",
    "title": "Fawori Profesyonel Sprey Boyalar & Uygulama Ekipmanları",
    "shortTitle": "Sprey, Rulo & Fırça",
    "desc": "Hızlı kuruyan akrilik sprey serisi, iç-dış cephe profesyonel ruloları, kestirme fırçaları ve şantiye koruma örtüleri.",
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
  var currentProduct = null;
  var selectedSize = null;

  // DOM Elements
  var subnavTabs = document.querySelectorAll(".pv-subnav-tab");
  var deptDrawerTrigger = document.getElementById("pvDeptDrawerTrigger");
  var deptDrawerBackdrop = document.getElementById("pvDeptDrawerBackdrop");
  var deptDrawerCloseBtn = document.getElementById("pvDrawerCloseBtn");
  var deptList = document.getElementById("pvDeptList");
  var mobileFilterRail = document.getElementById("pvMobileFilterRail");
  var mobileFilterRailWrap = document.getElementById("pvMobileFilterRailWrap");

  // Modal Elements (Matching pervan-catalog.css & marshall-boya standard)
  var modalBackdrop = document.getElementById("pvModalBackdrop");
  var modalCard = document.getElementById("pvModalCard");
  var modalCloseBtn = document.getElementById("pvModalCloseBtn");
  var modalTopBar = document.getElementById("modalTopBar");
  var modalHandleZone = document.getElementById("modalHandleZone");
  var modalScrollArea = document.getElementById("modalScrollArea");
  var modalProductTitle = document.getElementById("modalProductTitle");
  var modalProductDesc = document.getElementById("modalProductDesc");
  var modalProductImg = document.getElementById("modalProductImg");
  var modalProductEyebrow = document.getElementById("modalProductEyebrow");
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

    document.querySelectorAll(".pv-tab-panel").forEach(function(panel) {
      var matches = panel.id === targetDeptId;
      panel.classList.toggle("active", matches);
    });

    renderDeptDrawer(targetDeptId);
    syncMobileFilterRail(targetDeptId);
  }

  subnavTabs.forEach(function(tab) {
    tab.addEventListener("click", function() {
      var target = this.getAttribute("data-tab");
      if (target) switchTab(target);
    });
  });

  // FILTER PILLS
  document.querySelectorAll(".pv-menu-pills").forEach(function(pillsWrap) {
    pillsWrap.querySelectorAll(".pv-menu-pill").forEach(function(btn) {
      btn.addEventListener("click", function() {
        var filterVal = this.getAttribute("data-filter");
        var panel = this.closest(".pv-tab-panel");
        if (!panel) return;

        panel.querySelectorAll(".pv-menu-pill").forEach(function(b) {
          b.classList.remove("active");
        });
        this.classList.add("active");

        applyFilter(panel.id, filterVal);
      });
    });
  });

  function applyFilter(deptId, filterVal) {
    var panel = document.getElementById(deptId);
    if (!panel) return;
    var rows = panel.querySelectorAll(".pv-menu-row");
    rows.forEach(function(row) {
      if (filterVal === "all" || row.getAttribute("data-category") === filterVal) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });

    if (mobileFilterRail) {
      mobileFilterRail.querySelectorAll(".pv-mobile-pill").forEach(function(b) {
        b.classList.toggle("active", b.getAttribute("data-filter") === filterVal);
      });
    }
  }

  // MOBILE FILTER RAIL
  function syncMobileFilterRail(deptId) {
    if (!mobileFilterRail) return;
    var dept = DEPARTMENTS_DATA[deptId];
    if (!dept || !dept.pills || dept.pills.length <= 1) {
      if (mobileFilterRailWrap) mobileFilterRailWrap.style.display = "none";
      return;
    }
    if (mobileFilterRailWrap) mobileFilterRailWrap.style.display = "";
    mobileFilterRail.innerHTML = "";

    dept.pills.forEach(function(p, idx) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "pv-mobile-pill" + (idx === 0 ? " active" : "");
      btn.setAttribute("data-filter", p.id);
      btn.textContent = p.label;
      btn.addEventListener("click", function() {
        mobileFilterRail.querySelectorAll(".pv-mobile-pill").forEach(function(b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var panel = document.getElementById(deptId);
        if (panel) {
          panel.querySelectorAll(".pv-menu-pill").forEach(function(dp) {
            dp.classList.toggle("active", dp.getAttribute("data-filter") === p.id);
          });
        }
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
    document.body.style.overflow = "hidden";
  }

  function closeDeptDrawer() {
    if (!deptDrawerBackdrop) return;
    deptDrawerBackdrop.classList.remove("open");
    deptDrawerBackdrop.classList.remove("is-open");
    deptDrawerBackdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (deptDrawerTrigger) deptDrawerTrigger.addEventListener("click", openDeptDrawer);
  if (deptDrawerCloseBtn) deptDrawerCloseBtn.addEventListener("click", closeDeptDrawer);
  if (deptDrawerBackdrop) {
    deptDrawerBackdrop.addEventListener("click", function(e) {
      if (e.target === deptDrawerBackdrop) closeDeptDrawer();
    });
  }

  // SPECIMEN ARCHITECTURAL MODAL CONTROLLER
  function openModal(productId) {
    var p = FAWORI_PRODUCTS_DATA.find(function(it) { return it.id === productId; });
    if (!p || !modalBackdrop) return;
    currentProduct = p;

    if (modalProductEyebrow) modalProductEyebrow.textContent = "PERVAN · FAWORİ YETKİLİ BAYİ";
    if (modalProductTitle) modalProductTitle.textContent = p.name;
    if (modalProductDesc) modalProductDesc.textContent = p.desc;
    if (modalProductImg) {
      modalProductImg.src = p.thumb;
      modalProductImg.alt = p.name;
    }

    // Packaging Segmented Buttons
    var sizes = (p.sizes && p.sizes.length > 0) ? p.sizes : ["Standart Ambalaj"];
    selectedSize = sizes[0];

    if (modalSizeTrack) {
      modalSizeTrack.innerHTML = "";
      sizes.forEach(function(size, idx) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "pv-segmented-item" + (idx === 0 ? " active" : "");
        btn.setAttribute("role", "radio");
        btn.setAttribute("aria-checked", idx === 0 ? "true" : "false");
        btn.textContent = size;
        btn.addEventListener("click", function() {
          modalSizeTrack.querySelectorAll(".pv-segmented-item").forEach(function(b) {
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

    // Spec Gauges
    if (modalSpecStandard) modalSpecStandard.textContent = (p.specs && p.specs.standard) ? p.specs.standard.split("&")[0].trim() : "TS EN & Betek";
    if (modalSpecConsumption) modalSpecConsumption.textContent = p.coverage || (p.specs && p.specs.consumption) || "Standart";
    if (modalSpecPackaging) modalSpecPackaging.textContent = sizes.join(" / ");

    // Specs Table
    if (modalSpecStandardRow) modalSpecStandardRow.textContent = (p.specs && p.specs.standard) || "TS EN Standartları & Betek Kimya Güvencesi";
    if (modalSpecPackagingRow) modalSpecPackagingRow.textContent = (p.specs && p.specs.packaging) || sizes.join(" - ");
    if (modalSpecMixing) modalSpecMixing.textContent = (p.specs && p.specs.mixingRatio) || "Su ile hacimce %10 inceltilir";
    if (modalSpecPotLife) modalSpecPotLife.textContent = (p.specs && p.specs.potLife) || "2 Yıl (Ağzı açılmamış orijinal ambalajında)";
    if (modalSpecLogistics) modalSpecLogistics.textContent = (p.specs && p.specs.logistics) || "Balçova Showroom & Urla Ana Depo Stoktan Teslim";

    // Accordions
    if (modalAccordions) {
      modalAccordions.innerHTML = "";
      var accs = p.accordions || [
        {
          title: "Uygulama ve Yüzey Hazırlığı",
          body: "Uygulama yapılacak yüzeylerin toz, kir, gevşek tabakalardan arındırılmış olması gerekir. Yüzey durumuna göre uygun Fawori astarı uygulanması tavsiye edilir."
        },
        {
          title: "Saklama ve Güvenlik Koşulları",
          body: "Ağzı açılmamış orijinal ambalajında, +5°C ile +35°C arasında doğrudan güneş ışığından ve dondan korunarak depolanmalıdır."
        }
      ];

      accs.forEach(function(acc, idx) {
        var item = document.createElement("div");
        item.className = "pv-acc-item" + (idx === 0 ? " active" : "");
        item.innerHTML = [
          '<button type="button" class="pv-acc-header" aria-expanded="' + (idx === 0 ? "true" : "false") + '">',
          '  <span>' + acc.title + '</span>',
          '  <svg class="pv-acc-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>',
          '</button>',
          '<div class="pv-acc-body">',
          '  <p>' + acc.body + '</p>',
          '</div>'
        ].join("");

        var btn = item.querySelector(".pv-acc-header");
        btn.addEventListener("click", function() {
          var isAct = item.classList.contains("active");
          item.classList.toggle("active");
          btn.setAttribute("aria-expanded", isAct ? "false" : "true");
        });

        modalAccordions.appendChild(item);
      });
    }

    updateWhatsAppUrl();

    if (modalBackdrop) {
      modalBackdrop.classList.add("open");
      modalBackdrop.classList.add("is-open");
      modalBackdrop.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      resetSheetStyles();
    }
  }

  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove("open");
    modalBackdrop.classList.remove("is-open");
    modalBackdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    resetSheetStyles();
  }

  function updateWhatsAppUrl() {
    if (!currentProduct || !modalWABtn) return;
    var text = "Merhaba, Pervan Fawori Yetkili Bayi çıkışlı " + currentProduct.name;
    if (selectedSize) {
      text += " (" + selectedSize + ")";
    }
    text += " için güncel şantiye liste fiyatı ve stok durumu hakkında bilgi almak istiyorum.";
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
        if (modalCard) {
          modalCard.style.transition = "none";
          modalCard.style.transform = "translateY(" + deltaY + "px)";
        }
        if (modalBackdrop) {
          var opacity = Math.max(0, 1 - (deltaY / 420));
          modalBackdrop.style.opacity = opacity.toString();
        }
      }
    }
  }

  function onDragEnd() {
    if (!isSheetDragging) {
      dragStartY = 0;
      return;
    }
    isSheetDragging = false;
    var deltaY = dragCurrentY - dragStartY;
    var duration = Date.now() - dragStartTime;
    var velocity = deltaY / Math.max(duration, 1);

    if (deltaY > 110 || velocity > 0.45) {
      if (modalCard) {
        modalCard.style.transition = "transform 0.22s cubic-bezier(0.4, 0, 1, 1)";
        modalCard.style.transform = "translateY(100%)";
      }
      if (modalBackdrop) {
        modalBackdrop.style.transition = "opacity 0.22s ease";
        modalBackdrop.style.opacity = "0";
      }
      setTimeout(function() {
        closeModal();
      }, 220);
    } else {
      resetSheetStyles();
    }
    dragStartY = 0;
  }

  if (modalCard) {
    modalCard.addEventListener("touchstart", onDragStart, { passive: true });
    modalCard.addEventListener("touchmove", onDragMove, { passive: false });
    modalCard.addEventListener("touchend", onDragEnd, { passive: true });
    modalCard.addEventListener("touchcancel", onDragEnd, { passive: true });
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
    document.body.style.overflow = "hidden";
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
    document.body.style.overflow = "";
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
