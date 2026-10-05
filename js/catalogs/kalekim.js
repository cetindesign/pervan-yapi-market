/* ==========================================================================
   PERVAN DESIGN SYSTEM — KALEKIM CATALOG CONTROLLER & ZERO-SCROLL ENGINE
   Version: 1.0.0
   Architecture: Pervan Modern Hub & Editorial Standard
   ========================================================================== */

/* 1. HERO STAGE SLIDER & HEADER OBSERVER */
(function() {
  var stage = document.getElementById("pvStageHero");
  var header = document.getElementById("header") || document.querySelector("header");

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

/* 2. ARCHITECTURAL SUBNAV & 6-DEPARTMENT ZERO-SCROLL ENGINE */
(function() {
  var KALEKIM_PRODUCTS_DATA = [
  {
    "id": "1051-kalekim",
    "name": "1051 Kalekim Standart Seramik Yapıştırıcısı",
    "badge": "Kalekim Yetkili Bayi",
    "tag": "1051 Serisi",
    "deptId": "kalekimProductCatalog",
    "category": "seramik-harclar",
    "thumb": "assets/kalekim-official/1051-kalekim.webp",
    "desc": "C1T Sınıfı Çimento Esaslı Seramik Yapıştırma Harcı",
    "meta": [
      "25 kg Kraft Torba",
      "3 - 5 kg/m²",
      "Resmi Kalekim TDS Belgeli"
    ],
    "coverage": "3 - 5 kg/m²",
    "sizes": [
      "25 kg Kraft Torba",
      "Paletli Şantiye Teslim"
    ],
    "specs": {
      "standard": "TS EN Standart Uygunluk",
      "packaging": "25 kg Kraft Torba",
      "consumption": "3 - 5 kg/m²",
      "mixingRatio": "Resmi TDS Şartnamesine Uygun",
      "potLife": "Uygulama Ömrü: 2-4 Saat",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "tds": "https://cdn.kalekim.com//file/0/0/doc/54746e4a-469d-4287-be00-3b956fb3a7e8",
    "accordions": [
      {
        "title": "Kullanım Alanı ve Yüzey Hazırlığı",
        "body": "1051 Kalekim Standart Seramik Yapıştırıcısı, modern inşaat standartlarına uygun olarak hazırlanmış sağlam, temiz ve tozdan arındırılmış yüzeylerde uygulanmalıdır."
      },
      {
        "title": "Uygulama ve Sarfiyat Şartnamesi",
        "body": "Önerilen sarfiyat miktarı 3 - 5 kg/m² aralığında olup ortam sıcaklığı ve yüzey emiciliğine göre değişiklik gösterebilir."
      }
    ]
  },
  {
    "id": "1052-kalekim",
    "name": "1052 Kalekim Beyaz Seramik Yapıştırıcısı",
    "badge": "Kalekim Yetkili Bayi",
    "tag": "1052 Serisi",
    "deptId": "kalekimProductCatalog",
    "category": "seramik-harclar",
    "thumb": "assets/kalekim-official/1052-kalekim.webp",
    "desc": "C1T Sınıfı Beyaz Çimento Esaslı Seramik Yapıştırma Harcı",
    "meta": [
      "25 kg Kraft Torba",
      "3 - 5 kg/m²",
      "Resmi Kalekim TDS Belgeli"
    ],
    "coverage": "3 - 5 kg/m²",
    "sizes": [
      "25 kg Kraft Torba",
      "Paletli Şantiye Teslim"
    ],
    "specs": {
      "standard": "TS EN Standart Uygunluk",
      "packaging": "25 kg Kraft Torba",
      "consumption": "3 - 5 kg/m²",
      "mixingRatio": "Resmi TDS Şartnamesine Uygun",
      "potLife": "Uygulama Ömrü: 2-4 Saat",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "tds": "https://cdn.kalekim.com//file/0/0/doc/c7697651-4614-4eb6-96ec-eb3b618d2c03",
    "accordions": [
      {
        "title": "Kullanım Alanı ve Yüzey Hazırlığı",
        "body": "1052 Kalekim Beyaz Seramik Yapıştırıcısı, modern inşaat standartlarına uygun olarak hazırlanmış sağlam, temiz ve tozdan arındırılmış yüzeylerde uygulanmalıdır."
      },
      {
        "title": "Uygulama ve Sarfiyat Şartnamesi",
        "body": "Önerilen sarfiyat miktarı 3 - 5 kg/m² aralığında olup ortam sıcaklığı ve yüzey emiciliğine göre değişiklik gösterebilir."
      }
    ]
  },
  {
    "id": "1054-technoflex",
    "name": "1054 Technoflex Esnek Seramik Yapıştırıcısı",
    "badge": "Kalekim Yetkili Bayi",
    "tag": "1054 Serisi",
    "deptId": "kalekimProductCatalog",
    "category": "seramik-harclar",
    "thumb": "assets/kalekim-official/1054-technoflex.webp",
    "desc": "C2TE S1 Sınıfı Yüksek Performanslı Esnek Yapıştırıcı",
    "meta": [
      "25 kg Kraft Torba",
      "3 - 6 kg/m²",
      "Resmi Kalekim TDS Belgeli"
    ],
    "coverage": "3 - 6 kg/m²",
    "sizes": [
      "25 kg Kraft Torba",
      "Paletli Şantiye Teslim"
    ],
    "specs": {
      "standard": "TS EN Standart Uygunluk",
      "packaging": "25 kg Kraft Torba",
      "consumption": "3 - 6 kg/m²",
      "mixingRatio": "Resmi TDS Şartnamesine Uygun",
      "potLife": "Uygulama Ömrü: 2-4 Saat",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "tds": "https://cdn.kalekim.com//file/0/0/doc/a92f0e69-61ba-4ef0-929d-09900d220930",
    "accordions": [
      {
        "title": "Kullanım Alanı ve Yüzey Hazırlığı",
        "body": "1054 Technoflex Esnek Seramik Yapıştırıcısı, modern inşaat standartlarına uygun olarak hazırlanmış sağlam, temiz ve tozdan arındırılmış yüzeylerde uygulanmalıdır."
      },
      {
        "title": "Uygulama ve Sarfiyat Şartnamesi",
        "body": "Önerilen sarfiyat miktarı 3 - 6 kg/m² aralığında olup ortam sıcaklığı ve yüzey emiciliğine göre değişiklik gösterebilir."
      }
    ]
  },
  {
    "id": "1055-granitech",
    "name": "1055 Granitech Porselen ve Granit Yapıştırıcısı",
    "badge": "Kalekim Yetkili Bayi",
    "tag": "1055 Serisi",
    "deptId": "kalekimProductCatalog",
    "category": "seramik-harclar",
    "thumb": "assets/kalekim-official/1055-granitech.webp",
    "desc": "C2TE Sınıfı Porselen ve Granit Seramik Yapıştırıcısı",
    "meta": [
      "25 kg Kraft Torba",
      "3 - 5 kg/m²",
      "Resmi Kalekim TDS Belgeli"
    ],
    "coverage": "3 - 5 kg/m²",
    "sizes": [
      "25 kg Kraft Torba",
      "Paletli Şantiye Teslim"
    ],
    "specs": {
      "standard": "TS EN Standart Uygunluk",
      "packaging": "25 kg Kraft Torba",
      "consumption": "3 - 5 kg/m²",
      "mixingRatio": "Resmi TDS Şartnamesine Uygun",
      "potLife": "Uygulama Ömrü: 2-4 Saat",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "tds": "https://cdn.kalekim.com//file/0/0/doc/60184fc5-b3a9-4529-9914-e47e56fddf98",
    "accordions": [
      {
        "title": "Kullanım Alanı ve Yüzey Hazırlığı",
        "body": "1055 Granitech Porselen ve Granit Yapıştırıcısı, modern inşaat standartlarına uygun olarak hazırlanmış sağlam, temiz ve tozdan arındırılmış yüzeylerde uygulanmalıdır."
      },
      {
        "title": "Uygulama ve Sarfiyat Şartnamesi",
        "body": "Önerilen sarfiyat miktarı 3 - 5 kg/m² aralığında olup ortam sıcaklığı ve yüzey emiciliğine göre değişiklik gösterebilir."
      }
    ]
  },
  {
    "id": "2200-ultrafuga",
    "name": "2200 Ultrafuga Antibakteriyel Derz Dolgu",
    "badge": "Kalekim Yetkili Bayi",
    "tag": "2200 Serisi",
    "deptId": "kalekimProductCatalog",
    "category": "derz-dolgular",
    "thumb": "assets/kalekim-official/2200-ultrafuga.webp",
    "desc": "CG2WA Sınıfı Küfe Dirençli 1-6 mm Esnek Derz Dolgu",
    "meta": [
      "20 kg Kraft / 5 kg Poşet",
      "0.2 - 0.5 kg/m²",
      "Resmi Kalekim TDS Belgeli"
    ],
    "coverage": "0.2 - 0.5 kg/m²",
    "sizes": [
      "20 kg Kraft / 5 kg Poşet",
      "Paletli Şantiye Teslim"
    ],
    "specs": {
      "standard": "TS EN Standart Uygunluk",
      "packaging": "20 kg Kraft / 5 kg Poşet",
      "consumption": "0.2 - 0.5 kg/m²",
      "mixingRatio": "Resmi TDS Şartnamesine Uygun",
      "potLife": "Uygulama Ömrü: 2-4 Saat",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "tds": "https://cdn.kalekim.com//file/0/0/doc/cd7df32f-6ecd-40bb-9a70-ec1c355683cd",
    "accordions": [
      {
        "title": "Kullanım Alanı ve Yüzey Hazırlığı",
        "body": "2200 Ultrafuga Antibakteriyel Derz Dolgu, modern inşaat standartlarına uygun olarak hazırlanmış sağlam, temiz ve tozdan arındırılmış yüzeylerde uygulanmalıdır."
      },
      {
        "title": "Uygulama ve Sarfiyat Şartnamesi",
        "body": "Önerilen sarfiyat miktarı 0.2 - 0.5 kg/m² aralığında olup ortam sıcaklığı ve yüzey emiciliğine göre değişiklik gösterebilir."
      }
    ]
  },
  {
    "id": "2300-fugaflex",
    "name": "2300 Fugaflex Yüksek Performanslı Esnek Derz Dolgu",
    "badge": "Kalekim Yetkili Bayi",
    "tag": "2300 Serisi",
    "deptId": "kalekimProductCatalog",
    "category": "derz-dolgular",
    "thumb": "assets/kalekim-official/2300-fugaflex.webp",
    "desc": "CG2WA Sınıfı Zorlu Şartlara Dayanıklı 1-6 mm Derz Dolgusu",
    "meta": [
      "20 kg Kraft Torba",
      "0.25 - 0.6 kg/m²",
      "Resmi Kalekim TDS Belgeli"
    ],
    "coverage": "0.25 - 0.6 kg/m²",
    "sizes": [
      "20 kg Kraft Torba",
      "Paletli Şantiye Teslim"
    ],
    "specs": {
      "standard": "TS EN Standart Uygunluk",
      "packaging": "20 kg Kraft Torba",
      "consumption": "0.25 - 0.6 kg/m²",
      "mixingRatio": "Resmi TDS Şartnamesine Uygun",
      "potLife": "Uygulama Ömrü: 2-4 Saat",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "tds": "https://cdn.kalekim.com//file/0/0/doc/92e439f2-859f-4fc0-8cbf-97e926e4b60c",
    "accordions": [
      {
        "title": "Kullanım Alanı ve Yüzey Hazırlığı",
        "body": "2300 Fugaflex Yüksek Performanslı Esnek Derz Dolgu, modern inşaat standartlarına uygun olarak hazırlanmış sağlam, temiz ve tozdan arındırılmış yüzeylerde uygulanmalıdır."
      },
      {
        "title": "Uygulama ve Sarfiyat Şartnamesi",
        "body": "Önerilen sarfiyat miktarı 0.25 - 0.6 kg/m² aralığında olup ortam sıcaklığı ve yüzey emiciliğine göre değişiklik gösterebilir."
      }
    ]
  },
  {
    "id": "3023-izolatex",
    "name": "3023 İzolatex Çift Bileşenli Su Yalıtım Harcı",
    "badge": "Kalekim Yetkili Bayi",
    "tag": "3023 Serisi",
    "deptId": "kalekimWaterproofSection",
    "category": "cift-bilesenli",
    "thumb": "assets/kalekim-official/3023-izolatex.webp",
    "desc": "Yarı Esnek Çimento ve Akrilik Esaslı Su Yalıtım Malzemesi",
    "meta": [
      "25 kg Toz + 5 kg Sıvı",
      "2.5 - 3.5 kg/m²",
      "Resmi Kalekim TDS Belgeli"
    ],
    "coverage": "2.5 - 3.5 kg/m²",
    "sizes": [
      "25 kg Toz + 5 kg Sıvı",
      "Paletli Şantiye Teslim"
    ],
    "specs": {
      "standard": "TS EN Standart Uygunluk",
      "packaging": "25 kg Toz + 5 kg Sıvı",
      "consumption": "2.5 - 3.5 kg/m²",
      "mixingRatio": "Resmi TDS Şartnamesine Uygun",
      "potLife": "Uygulama Ömrü: 2-4 Saat",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "tds": "https://cdn.kalekim.com//file/0/0/doc/a56f7add-9f05-4fe7-8f86-70110cb3c8a6",
    "accordions": [
      {
        "title": "Kullanım Alanı ve Yüzey Hazırlığı",
        "body": "3023 İzolatex Çift Bileşenli Su Yalıtım Harcı, modern inşaat standartlarına uygun olarak hazırlanmış sağlam, temiz ve tozdan arındırılmış yüzeylerde uygulanmalıdır."
      },
      {
        "title": "Uygulama ve Sarfiyat Şartnamesi",
        "body": "Önerilen sarfiyat miktarı 2.5 - 3.5 kg/m² aralığında olup ortam sıcaklığı ve yüzey emiciliğine göre değişiklik gösterebilir."
      }
    ]
  },
  {
    "id": "3024-izolatex-plus",
    "name": "3024 İzolatex Plus Tam Esnek Su Yalıtım Harcı",
    "badge": "Kalekim Yetkili Bayi",
    "tag": "3024 Serisi",
    "deptId": "kalekimWaterproofSection",
    "category": "cift-bilesenli",
    "thumb": "assets/kalekim-official/3024-izolatex-plus.webp",
    "desc": "Tam Esnek Balkon ve Teras Su Yalıtım Malzemesi",
    "meta": [
      "25 kg Toz + 8 kg Sıvı",
      "2.5 - 4.0 kg/m²",
      "Resmi Kalekim TDS Belgeli"
    ],
    "coverage": "2.5 - 4.0 kg/m²",
    "sizes": [
      "25 kg Toz + 8 kg Sıvı",
      "Paletli Şantiye Teslim"
    ],
    "specs": {
      "standard": "TS EN Standart Uygunluk",
      "packaging": "25 kg Toz + 8 kg Sıvı",
      "consumption": "2.5 - 4.0 kg/m²",
      "mixingRatio": "Resmi TDS Şartnamesine Uygun",
      "potLife": "Uygulama Ömrü: 2-4 Saat",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "tds": "https://cdn.kalekim.com//file/0/0/doc/88189082-8e75-4f0a-b407-dc1b5b7f4ec9",
    "accordions": [
      {
        "title": "Kullanım Alanı ve Yüzey Hazırlığı",
        "body": "3024 İzolatex Plus Tam Esnek Su Yalıtım Harcı, modern inşaat standartlarına uygun olarak hazırlanmış sağlam, temiz ve tozdan arındırılmış yüzeylerde uygulanmalıdır."
      },
      {
        "title": "Uygulama ve Sarfiyat Şartnamesi",
        "body": "Önerilen sarfiyat miktarı 2.5 - 4.0 kg/m² aralığında olup ortam sıcaklığı ve yüzey emiciliğine göre değişiklik gösterebilir."
      }
    ]
  },
  {
    "id": "3001-izostop",
    "name": "3001 İzoStop Şok Priz Su Tıkacı",
    "badge": "Kalekim Yetkili Bayi",
    "tag": "3001 Serisi",
    "deptId": "kalekimWaterproofSection",
    "category": "likit-elastik",
    "thumb": "assets/kalekim-official/3001-izostop.webp",
    "desc": "Aktif Su Kaçaklarını Anında Önleyen Şok Prizli Tıkaç",
    "meta": [
      "5 kg Plastik Kova",
      "1 kg harç için 200 ml su",
      "Resmi Kalekim TDS Belgeli"
    ],
    "coverage": "1 kg harç için 200 ml su",
    "sizes": [
      "5 kg Plastik Kova",
      "Paletli Şantiye Teslim"
    ],
    "specs": {
      "standard": "TS EN Standart Uygunluk",
      "packaging": "5 kg Plastik Kova",
      "consumption": "1 kg harç için 200 ml su",
      "mixingRatio": "Resmi TDS Şartnamesine Uygun",
      "potLife": "Uygulama Ömrü: 2-4 Saat",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "tds": "https://cdn.kalekim.com//file/0/0/doc/db25cdf1-c181-4e77-aa51-2e1a14676363",
    "accordions": [
      {
        "title": "Kullanım Alanı ve Yüzey Hazırlığı",
        "body": "3001 İzoStop Şok Priz Su Tıkacı, modern inşaat standartlarına uygun olarak hazırlanmış sağlam, temiz ve tozdan arındırılmış yüzeylerde uygulanmalıdır."
      },
      {
        "title": "Uygulama ve Sarfiyat Şartnamesi",
        "body": "Önerilen sarfiyat miktarı 1 kg harç için 200 ml su aralığında olup ortam sıcaklığı ve yüzey emiciliğine göre değişiklik gösterebilir."
      }
    ]
  },
  {
    "id": "3025-ultralastic",
    "name": "3025 Ultralastic Süper Elastik Su Yalıtımı",
    "badge": "Kalekim Yetkili Bayi",
    "tag": "3025 Serisi",
    "deptId": "kalekimWaterproofSection",
    "category": "cift-bilesenli",
    "thumb": "assets/kalekim-official/3025-ultralastic.webp",
    "desc": "Köprüleme Kabiliyeti Yüksek Süper Elastik Su Yalıtımı",
    "meta": [
      "20 kg Toz + 10 kg Sıvı",
      "2.0 - 3.0 kg/m²",
      "Resmi Kalekim TDS Belgeli"
    ],
    "coverage": "2.0 - 3.0 kg/m²",
    "sizes": [
      "20 kg Toz + 10 kg Sıvı",
      "Paletli Şantiye Teslim"
    ],
    "specs": {
      "standard": "TS EN Standart Uygunluk",
      "packaging": "20 kg Toz + 10 kg Sıvı",
      "consumption": "2.0 - 3.0 kg/m²",
      "mixingRatio": "Resmi TDS Şartnamesine Uygun",
      "potLife": "Uygulama Ömrü: 2-4 Saat",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "tds": "https://cdn.kalekim.com//file/0/0/doc/6f0afcaf-483b-4899-b9a6-a9edd2d439a7",
    "accordions": [
      {
        "title": "Kullanım Alanı ve Yüzey Hazırlığı",
        "body": "3025 Ultralastic Süper Elastik Su Yalıtımı, modern inşaat standartlarına uygun olarak hazırlanmış sağlam, temiz ve tozdan arındırılmış yüzeylerde uygulanmalıdır."
      },
      {
        "title": "Uygulama ve Sarfiyat Şartnamesi",
        "body": "Önerilen sarfiyat miktarı 2.0 - 3.0 kg/m² aralığında olup ortam sıcaklığı ve yüzey emiciliğine göre değişiklik gösterebilir."
      }
    ]
  },
  {
    "id": "3027-izolatex-uv",
    "name": "3027 İzolatex UV Güneş Dayanımlı Su Yalıtımı",
    "badge": "Kalekim Yetkili Bayi",
    "tag": "3027 Serisi",
    "deptId": "kalekimWaterproofSection",
    "category": "cift-bilesenli",
    "thumb": "assets/kalekim-official/3027-izolatex-uv.webp",
    "desc": "UV Işınlarına ve Açık Hava Koşullarına Dayanıklı Su Yalıtımı",
    "meta": [
      "20 kg Toz + 10 kg Sıvı",
      "2.5 - 3.5 kg/m²",
      "Resmi Kalekim TDS Belgeli"
    ],
    "coverage": "2.5 - 3.5 kg/m²",
    "sizes": [
      "20 kg Toz + 10 kg Sıvı",
      "Paletli Şantiye Teslim"
    ],
    "specs": {
      "standard": "TS EN Standart Uygunluk",
      "packaging": "20 kg Toz + 10 kg Sıvı",
      "consumption": "2.5 - 3.5 kg/m²",
      "mixingRatio": "Resmi TDS Şartnamesine Uygun",
      "potLife": "Uygulama Ömrü: 2-4 Saat",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "tds": "https://cdn.kalekim.com//file/0/0/doc/483a5bba-6cce-478b-b97e-f7fc59955544",
    "accordions": [
      {
        "title": "Kullanım Alanı ve Yüzey Hazırlığı",
        "body": "3027 İzolatex UV Güneş Dayanımlı Su Yalıtımı, modern inşaat standartlarına uygun olarak hazırlanmış sağlam, temiz ve tozdan arındırılmış yüzeylerde uygulanmalıdır."
      },
      {
        "title": "Uygulama ve Sarfiyat Şartnamesi",
        "body": "Önerilen sarfiyat miktarı 2.5 - 3.5 kg/m² aralığında olup ortam sıcaklığı ve yüzey emiciliğine göre değişiklik gösterebilir."
      }
    ]
  },
  {
    "id": "3131-elastikor",
    "name": "3131 Elastikor Likit Plastik Su Yalıtım Kaplaması",
    "badge": "Kalekim Yetkili Bayi",
    "tag": "3131 Serisi",
    "deptId": "kalekimWaterproofSection",
    "category": "likit-elastik",
    "thumb": "assets/kalekim-official/3131-elastikor.webp",
    "desc": "Kullanıma Hazır Akrilik Esaslı Elastik Çatı ve Dere Kaplaması",
    "meta": [
      "20 kg Plastik Kova",
      "1.5 - 2.0 kg/m²",
      "Resmi Kalekim TDS Belgeli"
    ],
    "coverage": "1.5 - 2.0 kg/m²",
    "sizes": [
      "20 kg Plastik Kova",
      "Paletli Şantiye Teslim"
    ],
    "specs": {
      "standard": "TS EN Standart Uygunluk",
      "packaging": "20 kg Plastik Kova",
      "consumption": "1.5 - 2.0 kg/m²",
      "mixingRatio": "Resmi TDS Şartnamesine Uygun",
      "potLife": "Uygulama Ömrü: 2-4 Saat",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "tds": "https://cdn.kalekim.com//file/0/0/doc/6846e141-1f9f-417d-a1e4-c3de1099cd3d",
    "accordions": [
      {
        "title": "Kullanım Alanı ve Yüzey Hazırlığı",
        "body": "3131 Elastikor Likit Plastik Su Yalıtım Kaplaması, modern inşaat standartlarına uygun olarak hazırlanmış sağlam, temiz ve tozdan arındırılmış yüzeylerde uygulanmalıdır."
      },
      {
        "title": "Uygulama ve Sarfiyat Şartnamesi",
        "body": "Önerilen sarfiyat miktarı 1.5 - 2.0 kg/m² aralığında olup ortam sıcaklığı ve yüzey emiciliğine göre değişiklik gösterebilir."
      }
    ]
  },
  {
    "id": "1057-foamtech",
    "name": "1057 Foamtech EPS & XPS Isı Yalıtım Levha Yapıştırıcısı",
    "badge": "Kalekim Yetkili Bayi",
    "tag": "1057 Serisi",
    "deptId": "kalekimThermalSection",
    "category": "levha-harclari",
    "thumb": "assets/kalekim-official/1057-foamtech.webp",
    "desc": "Isı Yalıtım Levhaları İçin Çimento Esaslı Güçlü Yapıştırıcı",
    "meta": [
      "25 kg Kraft Torba",
      "4.0 - 5.0 kg/m²",
      "Resmi Kalekim TDS Belgeli"
    ],
    "coverage": "4.0 - 5.0 kg/m²",
    "sizes": [
      "25 kg Kraft Torba",
      "Paletli Şantiye Teslim"
    ],
    "specs": {
      "standard": "TS EN Standart Uygunluk",
      "packaging": "25 kg Kraft Torba",
      "consumption": "4.0 - 5.0 kg/m²",
      "mixingRatio": "Resmi TDS Şartnamesine Uygun",
      "potLife": "Uygulama Ömrü: 2-4 Saat",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "tds": "https://cdn.kalekim.com//file/0/0/doc/52407fca-8954-426f-9d9f-fe7b720c2bd8",
    "accordions": [
      {
        "title": "Kullanım Alanı ve Yüzey Hazırlığı",
        "body": "1057 Foamtech EPS & XPS Isı Yalıtım Levha Yapıştırıcısı, modern inşaat standartlarına uygun olarak hazırlanmış sağlam, temiz ve tozdan arındırılmış yüzeylerde uygulanmalıdır."
      },
      {
        "title": "Uygulama ve Sarfiyat Şartnamesi",
        "body": "Önerilen sarfiyat miktarı 4.0 - 5.0 kg/m² aralığında olup ortam sıcaklığı ve yüzey emiciliğine göre değişiklik gösterebilir."
      }
    ]
  },
  {
    "id": "1169-mantotech",
    "name": "1169 Mantotech Taşyünü Isı Yalıtım Yapıştırıcısı",
    "badge": "Kalekim Yetkili Bayi",
    "tag": "1169 Serisi",
    "deptId": "kalekimThermalSection",
    "category": "levha-harclari",
    "thumb": "assets/kalekim-official/1169-mantotech.webp",
    "desc": "Taşyünü ve Ağır Yalıtım Levhaları İçin Güçlendirilmiş Harç",
    "meta": [
      "25 kg Kraft Torba",
      "4.5 - 5.5 kg/m²",
      "Resmi Kalekim TDS Belgeli"
    ],
    "coverage": "4.5 - 5.5 kg/m²",
    "sizes": [
      "25 kg Kraft Torba",
      "Paletli Şantiye Teslim"
    ],
    "specs": {
      "standard": "TS EN Standart Uygunluk",
      "packaging": "25 kg Kraft Torba",
      "consumption": "4.5 - 5.5 kg/m²",
      "mixingRatio": "Resmi TDS Şartnamesine Uygun",
      "potLife": "Uygulama Ömrü: 2-4 Saat",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "tds": "https://cdn.kalekim.com//file/0/0/doc/4d9e6f81-20d5-42c9-8ebe-c8b1a9af5412",
    "accordions": [
      {
        "title": "Kullanım Alanı ve Yüzey Hazırlığı",
        "body": "1169 Mantotech Taşyünü Isı Yalıtım Yapıştırıcısı, modern inşaat standartlarına uygun olarak hazırlanmış sağlam, temiz ve tozdan arındırılmış yüzeylerde uygulanmalıdır."
      },
      {
        "title": "Uygulama ve Sarfiyat Şartnamesi",
        "body": "Önerilen sarfiyat miktarı 4.5 - 5.5 kg/m² aralığında olup ortam sıcaklığı ve yüzey emiciliğine göre değişiklik gösterebilir."
      }
    ]
  },
  {
    "id": "4042-technoplast-micro-7-siva",
    "name": "4042 Technoplast Micro 7 Isı Yalıtım Sıvası",
    "badge": "Kalekim Yetkili Bayi",
    "tag": "4042 Serisi",
    "deptId": "kalekimThermalSection",
    "category": "levha-harclari",
    "thumb": "assets/kalekim-official/4042-technoplast-micro-7-siva.webp",
    "desc": "Elyaflı ve Çatlamaya Dirençli İnce Tane Isı Yalıtım Sıvası",
    "meta": [
      "25 kg Kraft Torba",
      "4.0 - 5.0 kg/m²",
      "Resmi Kalekim TDS Belgeli"
    ],
    "coverage": "4.0 - 5.0 kg/m²",
    "sizes": [
      "25 kg Kraft Torba",
      "Paletli Şantiye Teslim"
    ],
    "specs": {
      "standard": "TS EN Standart Uygunluk",
      "packaging": "25 kg Kraft Torba",
      "consumption": "4.0 - 5.0 kg/m²",
      "mixingRatio": "Resmi TDS Şartnamesine Uygun",
      "potLife": "Uygulama Ömrü: 2-4 Saat",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "tds": "https://cdn.kalekim.com//file/0/0/doc/7b60610c-9b6a-43eb-b217-91b4a868ce3a",
    "accordions": [
      {
        "title": "Kullanım Alanı ve Yüzey Hazırlığı",
        "body": "4042 Technoplast Micro 7 Isı Yalıtım Sıvası, modern inşaat standartlarına uygun olarak hazırlanmış sağlam, temiz ve tozdan arındırılmış yüzeylerde uygulanmalıdır."
      },
      {
        "title": "Uygulama ve Sarfiyat Şartnamesi",
        "body": "Önerilen sarfiyat miktarı 4.0 - 5.0 kg/m² aralığında olup ortam sıcaklığı ve yüzey emiciliğine göre değişiklik gösterebilir."
      }
    ]
  },
  {
    "id": "4043-technoplast-maxi-extra-siva",
    "name": "4043 Technoplast Maxi Extra Isı Yalıtım Sıvası",
    "badge": "Kalekim Yetkili Bayi",
    "tag": "4043 Serisi",
    "deptId": "kalekimThermalSection",
    "category": "levha-harclari",
    "thumb": "assets/kalekim-official/4043-technoplast-maxi-extra-siva.webp",
    "desc": "Yüksek Mukavemetli Elyaflı Kalın Isı Yalıtım Sıvası",
    "meta": [
      "25 kg Kraft Torba",
      "4.5 - 5.5 kg/m²",
      "Resmi Kalekim TDS Belgeli"
    ],
    "coverage": "4.5 - 5.5 kg/m²",
    "sizes": [
      "25 kg Kraft Torba",
      "Paletli Şantiye Teslim"
    ],
    "specs": {
      "standard": "TS EN Standart Uygunluk",
      "packaging": "25 kg Kraft Torba",
      "consumption": "4.5 - 5.5 kg/m²",
      "mixingRatio": "Resmi TDS Şartnamesine Uygun",
      "potLife": "Uygulama Ömrü: 2-4 Saat",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "tds": "https://cdn.kalekim.com//file/0/0/doc/f3240aef-09b1-4a83-a501-85009f3bb7e6",
    "accordions": [
      {
        "title": "Kullanım Alanı ve Yüzey Hazırlığı",
        "body": "4043 Technoplast Maxi Extra Isı Yalıtım Sıvası, modern inşaat standartlarına uygun olarak hazırlanmış sağlam, temiz ve tozdan arındırılmış yüzeylerde uygulanmalıdır."
      },
      {
        "title": "Uygulama ve Sarfiyat Şartnamesi",
        "body": "Önerilen sarfiyat miktarı 4.5 - 5.5 kg/m² aralığında olup ortam sıcaklığı ve yüzey emiciliğine göre değişiklik gösterebilir."
      }
    ]
  },
  {
    "id": "4081-minart-silver-100",
    "name": "4081 Minart Silver 100 Tane Dokulu Mineral Sıva",
    "badge": "Kalekim Yetkili Bayi",
    "tag": "4081 Serisi",
    "deptId": "kalekimThermalSection",
    "category": "mineral-kaplama",
    "thumb": "assets/kalekim-official/4081-minart-silver-100.webp",
    "desc": "Dekoratif Dış Cephe Kaplaması Tane Dokulu 1.0 mm",
    "meta": [
      "25 kg Kraft Torba",
      "2.0 - 2.5 kg/m²",
      "Resmi Kalekim TDS Belgeli"
    ],
    "coverage": "2.0 - 2.5 kg/m²",
    "sizes": [
      "25 kg Kraft Torba",
      "Paletli Şantiye Teslim"
    ],
    "specs": {
      "standard": "TS EN Standart Uygunluk",
      "packaging": "25 kg Kraft Torba",
      "consumption": "2.0 - 2.5 kg/m²",
      "mixingRatio": "Resmi TDS Şartnamesine Uygun",
      "potLife": "Uygulama Ömrü: 2-4 Saat",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "tds": "https://cdn.kalekim.com//file/0/0/doc/770f3e12-8292-468a-a10e-f1e879123e3b",
    "accordions": [
      {
        "title": "Kullanım Alanı ve Yüzey Hazırlığı",
        "body": "4081 Minart Silver 100 Tane Dokulu Mineral Sıva, modern inşaat standartlarına uygun olarak hazırlanmış sağlam, temiz ve tozdan arındırılmış yüzeylerde uygulanmalıdır."
      },
      {
        "title": "Uygulama ve Sarfiyat Şartnamesi",
        "body": "Önerilen sarfiyat miktarı 2.0 - 2.5 kg/m² aralığında olup ortam sıcaklığı ve yüzey emiciliğine göre değişiklik gösterebilir."
      }
    ]
  },
  {
    "id": "4084-minart-dekor-300",
    "name": "4084 Minart Dekor 300 Çizgi Dokulu Mineral Sıva",
    "badge": "Kalekim Yetkili Bayi",
    "tag": "4084 Serisi",
    "deptId": "kalekimThermalSection",
    "category": "mineral-kaplama",
    "thumb": "assets/kalekim-official/4084-minart-dekor-300.webp",
    "desc": "Dekoratif Çizgi Dokulu Cephe Kaplaması 3.0 mm",
    "meta": [
      "25 kg Kraft Torba",
      "2.5 - 3.2 kg/m²",
      "Resmi Kalekim TDS Belgeli"
    ],
    "coverage": "2.5 - 3.2 kg/m²",
    "sizes": [
      "25 kg Kraft Torba",
      "Paletli Şantiye Teslim"
    ],
    "specs": {
      "standard": "TS EN Standart Uygunluk",
      "packaging": "25 kg Kraft Torba",
      "consumption": "2.5 - 3.2 kg/m²",
      "mixingRatio": "Resmi TDS Şartnamesine Uygun",
      "potLife": "Uygulama Ömrü: 2-4 Saat",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "tds": "https://cdn.kalekim.com//file/0/0/doc/c17081bd-33a2-4e4c-9792-c7480c0b2e77",
    "accordions": [
      {
        "title": "Kullanım Alanı ve Yüzey Hazırlığı",
        "body": "4084 Minart Dekor 300 Çizgi Dokulu Mineral Sıva, modern inşaat standartlarına uygun olarak hazırlanmış sağlam, temiz ve tozdan arındırılmış yüzeylerde uygulanmalıdır."
      },
      {
        "title": "Uygulama ve Sarfiyat Şartnamesi",
        "body": "Önerilen sarfiyat miktarı 2.5 - 3.2 kg/m² aralığında olup ortam sıcaklığı ve yüzey emiciliğine göre değişiklik gösterebilir."
      }
    ]
  },
  {
    "id": "4001-tamirart-5",
    "name": "4001 TamirArt 5 İnce Tamir Harcı (1-5 mm)",
    "badge": "Kalekim Yetkili Bayi",
    "tag": "4001 Serisi",
    "deptId": "kalekimRepairSection",
    "category": "yapisal-tamir",
    "thumb": "assets/kalekim-official/4001-tamirart-5.webp",
    "desc": "Polimer Takviyeli İnce Brüt Beton ve Yüzey Düzeltme Harcı",
    "meta": [
      "25 kg Kraft Torba",
      "1.5 kg/m² (1 mm et payı)",
      "Resmi Kalekim TDS Belgeli"
    ],
    "coverage": "1.5 kg/m² (1 mm et payı)",
    "sizes": [
      "25 kg Kraft Torba",
      "Paletli Şantiye Teslim"
    ],
    "specs": {
      "standard": "TS EN Standart Uygunluk",
      "packaging": "25 kg Kraft Torba",
      "consumption": "1.5 kg/m² (1 mm et payı)",
      "mixingRatio": "Resmi TDS Şartnamesine Uygun",
      "potLife": "Uygulama Ömrü: 2-4 Saat",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "tds": "https://cdn.kalekim.com//file/0/0/doc/2ca9de6b-e125-49a2-b9c9-ff456e90a1f7",
    "accordions": [
      {
        "title": "Kullanım Alanı ve Yüzey Hazırlığı",
        "body": "4001 TamirArt 5 İnce Tamir Harcı (1-5 mm), modern inşaat standartlarına uygun olarak hazırlanmış sağlam, temiz ve tozdan arındırılmış yüzeylerde uygulanmalıdır."
      },
      {
        "title": "Uygulama ve Sarfiyat Şartnamesi",
        "body": "Önerilen sarfiyat miktarı 1.5 kg/m² (1 mm et payı) aralığında olup ortam sıcaklığı ve yüzey emiciliğine göre değişiklik gösterebilir."
      }
    ]
  },
  {
    "id": "4002-tamirart-30",
    "name": "4002 TamirArt 30 Kalın Tamir Harcı (5-30 mm)",
    "badge": "Kalekim Yetkili Bayi",
    "tag": "4002 Serisi",
    "deptId": "kalekimRepairSection",
    "category": "yapisal-tamir",
    "thumb": "assets/kalekim-official/4002-tamirart-30.webp",
    "desc": "Tiksotropik Kalın Beton Tamir ve Pah Harcı",
    "meta": [
      "25 kg Kraft Torba",
      "1.6 kg/m² (1 mm et payı)",
      "Resmi Kalekim TDS Belgeli"
    ],
    "coverage": "1.6 kg/m² (1 mm et payı)",
    "sizes": [
      "25 kg Kraft Torba",
      "Paletli Şantiye Teslim"
    ],
    "specs": {
      "standard": "TS EN Standart Uygunluk",
      "packaging": "25 kg Kraft Torba",
      "consumption": "1.6 kg/m² (1 mm et payı)",
      "mixingRatio": "Resmi TDS Şartnamesine Uygun",
      "potLife": "Uygulama Ömrü: 2-4 Saat",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "tds": "https://cdn.kalekim.com//file/0/0/doc/c2d9b94b-0ed9-43ef-9b3a-7f4484a4ede4",
    "accordions": [
      {
        "title": "Kullanım Alanı ve Yüzey Hazırlığı",
        "body": "4002 TamirArt 30 Kalın Tamir Harcı (5-30 mm), modern inşaat standartlarına uygun olarak hazırlanmış sağlam, temiz ve tozdan arındırılmış yüzeylerde uygulanmalıdır."
      },
      {
        "title": "Uygulama ve Sarfiyat Şartnamesi",
        "body": "Önerilen sarfiyat miktarı 1.6 kg/m² (1 mm et payı) aralığında olup ortam sıcaklığı ve yüzey emiciliğine göre değişiklik gösterebilir."
      }
    ]
  },
  {
    "id": "4004-tamirart-s40",
    "name": "4004 TamirArt S40 Yapısal Güçlendirme Harcı (R4)",
    "badge": "Kalekim Yetkili Bayi",
    "tag": "4004 Serisi",
    "deptId": "kalekimRepairSection",
    "category": "yapisal-tamir",
    "thumb": "assets/kalekim-official/4004-tamirart-s40.webp",
    "desc": "R4 Sınıfı Yüksek Mukavemetli Yapısal Onarım Harcı",
    "meta": [
      "25 kg Kraft Torba",
      "1.8 kg/m² (1 mm et payı)",
      "Resmi Kalekim TDS Belgeli"
    ],
    "coverage": "1.8 kg/m² (1 mm et payı)",
    "sizes": [
      "25 kg Kraft Torba",
      "Paletli Şantiye Teslim"
    ],
    "specs": {
      "standard": "TS EN Standart Uygunluk",
      "packaging": "25 kg Kraft Torba",
      "consumption": "1.8 kg/m² (1 mm et payı)",
      "mixingRatio": "Resmi TDS Şartnamesine Uygun",
      "potLife": "Uygulama Ömrü: 2-4 Saat",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "tds": "https://cdn.kalekim.com//file/0/0/doc/2e7fc92a-16a1-4a04-99c5-81151f7655bb",
    "accordions": [
      {
        "title": "Kullanım Alanı ve Yüzey Hazırlığı",
        "body": "4004 TamirArt S40 Yapısal Güçlendirme Harcı (R4), modern inşaat standartlarına uygun olarak hazırlanmış sağlam, temiz ve tozdan arındırılmış yüzeylerde uygulanmalıdır."
      },
      {
        "title": "Uygulama ve Sarfiyat Şartnamesi",
        "body": "Önerilen sarfiyat miktarı 1.8 kg/m² (1 mm et payı) aralığında olup ortam sıcaklığı ve yüzey emiciliğine göre değişiklik gösterebilir."
      }
    ]
  },
  {
    "id": "4110-groutart-ep",
    "name": "4110 GroutArt Epoksi Esaslı Akıcı Grout Harcı",
    "badge": "Kalekim Yetkili Bayi",
    "tag": "4110 Serisi",
    "deptId": "kalekimRepairSection",
    "category": "yapisal-tamir",
    "thumb": "assets/kalekim-official/4110-groutart-ep.webp",
    "desc": "Makine Temelleri ve Ankraj İçin Solventsiz Epoksi Grout",
    "meta": [
      "10 kg Set (A+B+C)",
      "2.0 kg/L hacim",
      "Resmi Kalekim TDS Belgeli"
    ],
    "coverage": "2.0 kg/L hacim",
    "sizes": [
      "10 kg Set (A+B+C)",
      "Paletli Şantiye Teslim"
    ],
    "specs": {
      "standard": "TS EN Standart Uygunluk",
      "packaging": "10 kg Set (A+B+C)",
      "consumption": "2.0 kg/L hacim",
      "mixingRatio": "Resmi TDS Şartnamesine Uygun",
      "potLife": "Uygulama Ömrü: 2-4 Saat",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "tds": "https://cdn.kalekim.com//file/0/0/doc/c5f694c6-25f2-41bc-8870-a1b25e5d39d8",
    "accordions": [
      {
        "title": "Kullanım Alanı ve Yüzey Hazırlığı",
        "body": "4110 GroutArt Epoksi Esaslı Akıcı Grout Harcı, modern inşaat standartlarına uygun olarak hazırlanmış sağlam, temiz ve tozdan arındırılmış yüzeylerde uygulanmalıdır."
      },
      {
        "title": "Uygulama ve Sarfiyat Şartnamesi",
        "body": "Önerilen sarfiyat miktarı 2.0 kg/L hacim aralığında olup ortam sıcaklığı ve yüzey emiciliğine göre değişiklik gösterebilir."
      }
    ]
  },
  {
    "id": "4003-tamirart-w",
    "name": "4003 TamirArt W Su Geçirimsiz Tamir Harcı",
    "badge": "Kalekim Yetkili Bayi",
    "tag": "4003 Serisi",
    "deptId": "kalekimRepairSection",
    "category": "tamir-astar",
    "thumb": "assets/kalekim-official/4003-tamirart-w.webp",
    "desc": "Su Yalıtımı Öncesi Pah ve Yüzey Onarımında Kullanılan Harç",
    "meta": [
      "25 kg Kraft Torba",
      "1.5 kg/m² (1 mm et payı)",
      "Resmi Kalekim TDS Belgeli"
    ],
    "coverage": "1.5 kg/m² (1 mm et payı)",
    "sizes": [
      "25 kg Kraft Torba",
      "Paletli Şantiye Teslim"
    ],
    "specs": {
      "standard": "TS EN Standart Uygunluk",
      "packaging": "25 kg Kraft Torba",
      "consumption": "1.5 kg/m² (1 mm et payı)",
      "mixingRatio": "Resmi TDS Şartnamesine Uygun",
      "potLife": "Uygulama Ömrü: 2-4 Saat",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "tds": "https://cdn.kalekim.com//file/0/0/doc/88ae2a1c-5a05-4527-b39f-f9f09df3053e",
    "accordions": [
      {
        "title": "Kullanım Alanı ve Yüzey Hazırlığı",
        "body": "4003 TamirArt W Su Geçirimsiz Tamir Harcı, modern inşaat standartlarına uygun olarak hazırlanmış sağlam, temiz ve tozdan arındırılmış yüzeylerde uygulanmalıdır."
      },
      {
        "title": "Uygulama ve Sarfiyat Şartnamesi",
        "body": "Önerilen sarfiyat miktarı 1.5 kg/m² (1 mm et payı) aralığında olup ortam sıcaklığı ve yüzey emiciliğine göre değişiklik gösterebilir."
      }
    ]
  },
  {
    "id": "4507-b-tone",
    "name": "4507 B-Tone Brüt Beton Yüzey Astarı",
    "badge": "Kalekim Yetkili Bayi",
    "tag": "4507 Serisi",
    "deptId": "kalekimRepairSection",
    "category": "tamir-astar",
    "thumb": "assets/kalekim-official/4507-b-tone.webp",
    "desc": "Brüt Beton Üzerine Alçı ve Çimento Esaslı Sıva Öncesi Astar",
    "meta": [
      "12 kg Plastik Kova",
      "0.2 - 0.3 kg/m²",
      "Resmi Kalekim TDS Belgeli"
    ],
    "coverage": "0.2 - 0.3 kg/m²",
    "sizes": [
      "12 kg Plastik Kova",
      "Paletli Şantiye Teslim"
    ],
    "specs": {
      "standard": "TS EN Standart Uygunluk",
      "packaging": "12 kg Plastik Kova",
      "consumption": "0.2 - 0.3 kg/m²",
      "mixingRatio": "Resmi TDS Şartnamesine Uygun",
      "potLife": "Uygulama Ömrü: 2-4 Saat",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "tds": "https://cdn.kalekim.com//file/0/0/doc/120543b6-f4e3-456a-bc83-f7a120d575e8",
    "accordions": [
      {
        "title": "Kullanım Alanı ve Yüzey Hazırlığı",
        "body": "4507 B-Tone Brüt Beton Yüzey Astarı, modern inşaat standartlarına uygun olarak hazırlanmış sağlam, temiz ve tozdan arındırılmış yüzeylerde uygulanmalıdır."
      },
      {
        "title": "Uygulama ve Sarfiyat Şartnamesi",
        "body": "Önerilen sarfiyat miktarı 0.2 - 0.3 kg/m² aralığında olup ortam sıcaklığı ve yüzey emiciliğine göre değişiklik gösterebilir."
      }
    ]
  },
  {
    "id": "tecnica-132",
    "name": "Tecnica 132 Kendiliğinden Yayılan Zemin Şapı (2-10 mm)",
    "badge": "Kalekim Yetkili Bayi",
    "tag": "Tecnica Serisi",
    "deptId": "kalekimFloorSection",
    "category": "tesviye-sap",
    "thumb": "assets/kalekim-official/tecnica-132.webp",
    "desc": "Çimento Esaslı Pürüzsüz Kendiliğinden Yayılan Tesviye Şapı",
    "meta": [
      "25 kg Kraft Torba",
      "1.5 - 1.8 kg/m² (1 mm)",
      "Resmi Kalekim TDS Belgeli"
    ],
    "coverage": "1.5 - 1.8 kg/m² (1 mm)",
    "sizes": [
      "25 kg Kraft Torba",
      "Paletli Şantiye Teslim"
    ],
    "specs": {
      "standard": "TS EN Standart Uygunluk",
      "packaging": "25 kg Kraft Torba",
      "consumption": "1.5 - 1.8 kg/m² (1 mm)",
      "mixingRatio": "Resmi TDS Şartnamesine Uygun",
      "potLife": "Uygulama Ömrü: 2-4 Saat",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "tds": "https://cdn.kalekim.com//file/0/0/doc/6b67fab3-8fdb-407d-89e2-cbc140a8fb52",
    "accordions": [
      {
        "title": "Kullanım Alanı ve Yüzey Hazırlığı",
        "body": "Tecnica 132 Kendiliğinden Yayılan Zemin Şapı (2-10 mm), modern inşaat standartlarına uygun olarak hazırlanmış sağlam, temiz ve tozdan arındırılmış yüzeylerde uygulanmalıdır."
      },
      {
        "title": "Uygulama ve Sarfiyat Şartnamesi",
        "body": "Önerilen sarfiyat miktarı 1.5 - 1.8 kg/m² (1 mm) aralığında olup ortam sıcaklığı ve yüzey emiciliğine göre değişiklik gösterebilir."
      }
    ]
  },
  {
    "id": "tecnica-142",
    "name": "Tecnica 142 Ağır Yük Kendiliğinden Yayılan Şap (3-20 mm)",
    "badge": "Kalekim Yetkili Bayi",
    "tag": "Tecnica Serisi",
    "deptId": "kalekimFloorSection",
    "category": "tesviye-sap",
    "thumb": "assets/kalekim-official/tecnica-142.webp",
    "desc": "Yoğun Yaya ve Tekerlekli Araç Trafiğine Dayanıklı Tesviye Şapı",
    "meta": [
      "25 kg Kraft Torba",
      "1.7 - 2.0 kg/m² (1 mm)",
      "Resmi Kalekim TDS Belgeli"
    ],
    "coverage": "1.7 - 2.0 kg/m² (1 mm)",
    "sizes": [
      "25 kg Kraft Torba",
      "Paletli Şantiye Teslim"
    ],
    "specs": {
      "standard": "TS EN Standart Uygunluk",
      "packaging": "25 kg Kraft Torba",
      "consumption": "1.7 - 2.0 kg/m² (1 mm)",
      "mixingRatio": "Resmi TDS Şartnamesine Uygun",
      "potLife": "Uygulama Ömrü: 2-4 Saat",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "tds": "https://cdn.kalekim.com//file/0/0/doc/88d33b44-0038-49ca-a98f-d0a0bd13bc55",
    "accordions": [
      {
        "title": "Kullanım Alanı ve Yüzey Hazırlığı",
        "body": "Tecnica 142 Ağır Yük Kendiliğinden Yayılan Şap (3-20 mm), modern inşaat standartlarına uygun olarak hazırlanmış sağlam, temiz ve tozdan arındırılmış yüzeylerde uygulanmalıdır."
      },
      {
        "title": "Uygulama ve Sarfiyat Şartnamesi",
        "body": "Önerilen sarfiyat miktarı 1.7 - 2.0 kg/m² (1 mm) aralığında olup ortam sıcaklığı ve yüzey emiciliğine göre değişiklik gösterebilir."
      }
    ]
  },
  {
    "id": "tecnica-152",
    "name": "Tecnica 152 Hızlı Priz Alan Zemin Şapı",
    "badge": "Kalekim Yetkili Bayi",
    "tag": "Tecnica Serisi",
    "deptId": "kalekimFloorSection",
    "category": "tesviye-sap",
    "thumb": "assets/kalekim-official/tecnica-152.webp",
    "desc": "Kısa Sürede Kaplamaya Açılan Hızlı Kürlenen Şap",
    "meta": [
      "25 kg Kraft Torba",
      "1.8 kg/m² (1 mm)",
      "Resmi Kalekim TDS Belgeli"
    ],
    "coverage": "1.8 kg/m² (1 mm)",
    "sizes": [
      "25 kg Kraft Torba",
      "Paletli Şantiye Teslim"
    ],
    "specs": {
      "standard": "TS EN Standart Uygunluk",
      "packaging": "25 kg Kraft Torba",
      "consumption": "1.8 kg/m² (1 mm)",
      "mixingRatio": "Resmi TDS Şartnamesine Uygun",
      "potLife": "Uygulama Ömrü: 2-4 Saat",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "tds": "https://cdn.kalekim.com//file/0/0/doc/b841adce-6b8d-4209-b1c2-516c58efca43",
    "accordions": [
      {
        "title": "Kullanım Alanı ve Yüzey Hazırlığı",
        "body": "Tecnica 152 Hızlı Priz Alan Zemin Şapı, modern inşaat standartlarına uygun olarak hazırlanmış sağlam, temiz ve tozdan arındırılmış yüzeylerde uygulanmalıdır."
      },
      {
        "title": "Uygulama ve Sarfiyat Şartnamesi",
        "body": "Önerilen sarfiyat miktarı 1.8 kg/m² (1 mm) aralığında olup ortam sıcaklığı ve yüzey emiciliğine göre değişiklik gösterebilir."
      }
    ]
  },
  {
    "id": "tecnica-22-cw",
    "name": "Tecnica 22 CW Yüzey Sertleştirici (Korunt Agregalı)",
    "badge": "Kalekim Yetkili Bayi",
    "tag": "Tecnica Serisi",
    "deptId": "kalekimFloorSection",
    "category": "yuzey-sertlestirici",
    "thumb": "assets/kalekim-official/tecnica-22-cw.webp",
    "desc": "Ağır Sanayi ve Depo Zeminleri İçin Koruntlu Yüzey Sertleştirici",
    "meta": [
      "25 kg Kraft Torba",
      "4.0 - 6.0 kg/m²",
      "Resmi Kalekim TDS Belgeli"
    ],
    "coverage": "4.0 - 6.0 kg/m²",
    "sizes": [
      "25 kg Kraft Torba",
      "Paletli Şantiye Teslim"
    ],
    "specs": {
      "standard": "TS EN Standart Uygunluk",
      "packaging": "25 kg Kraft Torba",
      "consumption": "4.0 - 6.0 kg/m²",
      "mixingRatio": "Resmi TDS Şartnamesine Uygun",
      "potLife": "Uygulama Ömrü: 2-4 Saat",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "tds": "https://cdn.kalekim.com//file/0/0/doc/716a7d26-cdcf-4f24-91d6-c1f019c70f22",
    "accordions": [
      {
        "title": "Kullanım Alanı ve Yüzey Hazırlığı",
        "body": "Tecnica 22 CW Yüzey Sertleştirici (Korunt Agregalı), modern inşaat standartlarına uygun olarak hazırlanmış sağlam, temiz ve tozdan arındırılmış yüzeylerde uygulanmalıdır."
      },
      {
        "title": "Uygulama ve Sarfiyat Şartnamesi",
        "body": "Önerilen sarfiyat miktarı 4.0 - 6.0 kg/m² aralığında olup ortam sıcaklığı ve yüzey emiciliğine göre değişiklik gösterebilir."
      }
    ]
  },
  {
    "id": "tecnica-32-ds",
    "name": "Tecnica 32 DS Yüzey Sertleştirici (Kuvars Agregalı)",
    "badge": "Kalekim Yetkili Bayi",
    "tag": "Tecnica Serisi",
    "deptId": "kalekimFloorSection",
    "category": "yuzey-sertlestirici",
    "thumb": "assets/kalekim-official/tecnica-32-ds.webp",
    "desc": "Otopark ve Ticari Alan Zeminleri İçin Kuvarslı Sertleştirici",
    "meta": [
      "25 kg Kraft Torba",
      "4.0 - 5.0 kg/m²",
      "Resmi Kalekim TDS Belgeli"
    ],
    "coverage": "4.0 - 5.0 kg/m²",
    "sizes": [
      "25 kg Kraft Torba",
      "Paletli Şantiye Teslim"
    ],
    "specs": {
      "standard": "TS EN Standart Uygunluk",
      "packaging": "25 kg Kraft Torba",
      "consumption": "4.0 - 5.0 kg/m²",
      "mixingRatio": "Resmi TDS Şartnamesine Uygun",
      "potLife": "Uygulama Ömrü: 2-4 Saat",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "tds": "https://cdn.kalekim.com//file/0/0/doc/0fbbaf5e-e05d-4ff1-b25d-a40ee0e9918f",
    "accordions": [
      {
        "title": "Kullanım Alanı ve Yüzey Hazırlığı",
        "body": "Tecnica 32 DS Yüzey Sertleştirici (Kuvars Agregalı), modern inşaat standartlarına uygun olarak hazırlanmış sağlam, temiz ve tozdan arındırılmış yüzeylerde uygulanmalıdır."
      },
      {
        "title": "Uygulama ve Sarfiyat Şartnamesi",
        "body": "Önerilen sarfiyat miktarı 4.0 - 5.0 kg/m² aralığında olup ortam sıcaklığı ve yüzey emiciliğine göre değişiklik gösterebilir."
      }
    ]
  },
  {
    "id": "tecnica-242-sl",
    "name": "Tecnica 242 SL Solventsiz Epoksi Zemin Kaplaması",
    "badge": "Kalekim Yetkili Bayi",
    "tag": "Tecnica Serisi",
    "deptId": "kalekimFloorSection",
    "category": "yuzey-sertlestirici",
    "thumb": "assets/kalekim-official/tecnica-242-sl.webp",
    "desc": "Hijyenik ve Kimyasal Dirençli Kendiliğinden Yayılan Epoksi",
    "meta": [
      "20 kg Set (A+B)",
      "1.5 - 2.5 kg/m²",
      "Resmi Kalekim TDS Belgeli"
    ],
    "coverage": "1.5 - 2.5 kg/m²",
    "sizes": [
      "20 kg Set (A+B)",
      "Paletli Şantiye Teslim"
    ],
    "specs": {
      "standard": "TS EN Standart Uygunluk",
      "packaging": "20 kg Set (A+B)",
      "consumption": "1.5 - 2.5 kg/m²",
      "mixingRatio": "Resmi TDS Şartnamesine Uygun",
      "potLife": "Uygulama Ömrü: 2-4 Saat",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "tds": "https://cdn.kalekim.com//file/0/0/doc/3bc7ec2f-116a-44ae-b85f-f88a2bab5cb5",
    "accordions": [
      {
        "title": "Kullanım Alanı ve Yüzey Hazırlığı",
        "body": "Tecnica 242 SL Solventsiz Epoksi Zemin Kaplaması, modern inşaat standartlarına uygun olarak hazırlanmış sağlam, temiz ve tozdan arındırılmış yüzeylerde uygulanmalıdır."
      },
      {
        "title": "Uygulama ve Sarfiyat Şartnamesi",
        "body": "Önerilen sarfiyat miktarı 1.5 - 2.5 kg/m² aralığında olup ortam sıcaklığı ve yüzey emiciliğine göre değişiklik gösterebilir."
      }
    ]
  },
  {
    "id": "biboya-silikonlu-duz-trendy",
    "name": "Bi'Boya Silikonlu Düz Dış Cephe Boyası",
    "badge": "Kalekim Yetkili Bayi",
    "tag": "Bi'Boya Serisi",
    "deptId": "kalekimPaintSection",
    "category": "dis-cephe",
    "thumb": "assets/kalekim-official/biboya-silikonlu-duz-trendy.webp",
    "desc": "Yüksek Su İtici ve Nefes Alan Silikonlu Dış Cephe Boyası",
    "meta": [
      "15 L Plastik Kova",
      "10 - 12 m²/L (tek kat)",
      "Resmi Kalekim TDS Belgeli"
    ],
    "coverage": "10 - 12 m²/L (tek kat)",
    "sizes": [
      "15 L Plastik Kova",
      "Paletli Şantiye Teslim"
    ],
    "specs": {
      "standard": "TS EN Standart Uygunluk",
      "packaging": "15 L Plastik Kova",
      "consumption": "10 - 12 m²/L (tek kat)",
      "mixingRatio": "Resmi TDS Şartnamesine Uygun",
      "potLife": "Uygulama Ömrü: 2-4 Saat",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "tds": "https://cdn.kalekim.com//file/0/0/doc/bbdeec29-f742-4f61-a055-a156fdea387c",
    "accordions": [
      {
        "title": "Kullanım Alanı ve Yüzey Hazırlığı",
        "body": "Bi'Boya Silikonlu Düz Dış Cephe Boyası, modern inşaat standartlarına uygun olarak hazırlanmış sağlam, temiz ve tozdan arındırılmış yüzeylerde uygulanmalıdır."
      },
      {
        "title": "Uygulama ve Sarfiyat Şartnamesi",
        "body": "Önerilen sarfiyat miktarı 10 - 12 m²/L (tek kat) aralığında olup ortam sıcaklığı ve yüzey emiciliğine göre değişiklik gösterebilir."
      }
    ]
  },
  {
    "id": "biboya-elastik-comfort",
    "name": "Bi'Boya Elastik Comfort Çatlak Köprüleyen Boya",
    "badge": "Kalekim Yetkili Bayi",
    "tag": "Bi'Boya Serisi",
    "deptId": "kalekimPaintSection",
    "category": "dis-cephe",
    "thumb": "assets/kalekim-official/biboya-elastik-comfort.webp",
    "desc": "Dış Cephe Kılcal Çatlaklarını Köprüleyen Elastik Kaplama",
    "meta": [
      "15 L Plastik Kova",
      "8 - 10 m²/L (tek kat)",
      "Resmi Kalekim TDS Belgeli"
    ],
    "coverage": "8 - 10 m²/L (tek kat)",
    "sizes": [
      "15 L Plastik Kova",
      "Paletli Şantiye Teslim"
    ],
    "specs": {
      "standard": "TS EN Standart Uygunluk",
      "packaging": "15 L Plastik Kova",
      "consumption": "8 - 10 m²/L (tek kat)",
      "mixingRatio": "Resmi TDS Şartnamesine Uygun",
      "potLife": "Uygulama Ömrü: 2-4 Saat",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "tds": "https://cdn.kalekim.com//file/0/0/doc/faa5a1fb-062b-4d61-b7f3-85c438d26bc7",
    "accordions": [
      {
        "title": "Kullanım Alanı ve Yüzey Hazırlığı",
        "body": "Bi'Boya Elastik Comfort Çatlak Köprüleyen Boya, modern inşaat standartlarına uygun olarak hazırlanmış sağlam, temiz ve tozdan arındırılmış yüzeylerde uygulanmalıdır."
      },
      {
        "title": "Uygulama ve Sarfiyat Şartnamesi",
        "body": "Önerilen sarfiyat miktarı 8 - 10 m²/L (tek kat) aralığında olup ortam sıcaklığı ve yüzey emiciliğine göre değişiklik gösterebilir."
      }
    ]
  },
  {
    "id": "biboya-saf-akrilik-comfort",
    "name": "Bi'Boya Saf Akrilik Comfort Dış Cephe Boyası",
    "badge": "Kalekim Yetkili Bayi",
    "tag": "Bi'Boya Serisi",
    "deptId": "kalekimPaintSection",
    "category": "dis-cephe",
    "thumb": "assets/kalekim-official/biboya-saf-akrilik-comfort.webp",
    "desc": "Zorlu Ege Sahil Şartlarına Dayanıklı Saf Akrilik Boya",
    "meta": [
      "15 L Plastik Kova",
      "10 - 14 m²/L (tek kat)",
      "Resmi Kalekim TDS Belgeli"
    ],
    "coverage": "10 - 14 m²/L (tek kat)",
    "sizes": [
      "15 L Plastik Kova",
      "Paletli Şantiye Teslim"
    ],
    "specs": {
      "standard": "TS EN Standart Uygunluk",
      "packaging": "15 L Plastik Kova",
      "consumption": "10 - 14 m²/L (tek kat)",
      "mixingRatio": "Resmi TDS Şartnamesine Uygun",
      "potLife": "Uygulama Ömrü: 2-4 Saat",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "tds": "https://cdn.kalekim.com//file/0/0/doc/040dfa0d-c05a-491e-900d-fb01083d5e9d",
    "accordions": [
      {
        "title": "Kullanım Alanı ve Yüzey Hazırlığı",
        "body": "Bi'Boya Saf Akrilik Comfort Dış Cephe Boyası, modern inşaat standartlarına uygun olarak hazırlanmış sağlam, temiz ve tozdan arındırılmış yüzeylerde uygulanmalıdır."
      },
      {
        "title": "Uygulama ve Sarfiyat Şartnamesi",
        "body": "Önerilen sarfiyat miktarı 10 - 14 m²/L (tek kat) aralığında olup ortam sıcaklığı ve yüzey emiciliğine göre değişiklik gösterebilir."
      }
    ]
  },
  {
    "id": "biboya-ipek-mat-comfort",
    "name": "Bi'Boya İpek Mat Comfort İç Cephe Boyası",
    "badge": "Kalekim Yetkili Bayi",
    "tag": "Bi'Boya Serisi",
    "deptId": "kalekimPaintSection",
    "category": "ic-cephe",
    "thumb": "assets/kalekim-official/biboya-ipek-mat-comfort.webp",
    "desc": "Leke Tutmayan Tam Silinebilir İpek Mat İç Mekan Duvar Boyası",
    "meta": [
      "15 L / 7.5 L / 2.5 L",
      "14 - 18 m²/L (tek kat)",
      "Resmi Kalekim TDS Belgeli"
    ],
    "coverage": "14 - 18 m²/L (tek kat)",
    "sizes": [
      "15 L / 7.5 L / 2.5 L",
      "Paletli Şantiye Teslim"
    ],
    "specs": {
      "standard": "TS EN Standart Uygunluk",
      "packaging": "15 L / 7.5 L / 2.5 L",
      "consumption": "14 - 18 m²/L (tek kat)",
      "mixingRatio": "Resmi TDS Şartnamesine Uygun",
      "potLife": "Uygulama Ömrü: 2-4 Saat",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "tds": "https://cdn.kalekim.com//file/0/0/doc/d06bbc22-24a2-4d3d-a664-380b1ee2b423",
    "accordions": [
      {
        "title": "Kullanım Alanı ve Yüzey Hazırlığı",
        "body": "Bi'Boya İpek Mat Comfort İç Cephe Boyası, modern inşaat standartlarına uygun olarak hazırlanmış sağlam, temiz ve tozdan arındırılmış yüzeylerde uygulanmalıdır."
      },
      {
        "title": "Uygulama ve Sarfiyat Şartnamesi",
        "body": "Önerilen sarfiyat miktarı 14 - 18 m²/L (tek kat) aralığında olup ortam sıcaklığı ve yüzey emiciliğine göre değişiklik gösterebilir."
      }
    ]
  },
  {
    "id": "biboya-mat-comfort",
    "name": "Bi'Boya Mat Comfort Kokusuz İç Cephe Boyası",
    "badge": "Kalekim Yetkili Bayi",
    "tag": "Bi'Boya Serisi",
    "deptId": "kalekimPaintSection",
    "category": "ic-cephe",
    "thumb": "assets/kalekim-official/biboya-mat-comfort.webp",
    "desc": "Yüksek Örtücülüğe Sahip Mat Bitişli Kokusuz Duvar Boyası",
    "meta": [
      "15 L / 7.5 L / 2.5 L",
      "12 - 16 m²/L (tek kat)",
      "Resmi Kalekim TDS Belgeli"
    ],
    "coverage": "12 - 16 m²/L (tek kat)",
    "sizes": [
      "15 L / 7.5 L / 2.5 L",
      "Paletli Şantiye Teslim"
    ],
    "specs": {
      "standard": "TS EN Standart Uygunluk",
      "packaging": "15 L / 7.5 L / 2.5 L",
      "consumption": "12 - 16 m²/L (tek kat)",
      "mixingRatio": "Resmi TDS Şartnamesine Uygun",
      "potLife": "Uygulama Ömrü: 2-4 Saat",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "tds": "https://cdn.kalekim.com//file/0/0/doc/2f37e044-fa26-4240-a72f-3e7fb2015df7",
    "accordions": [
      {
        "title": "Kullanım Alanı ve Yüzey Hazırlığı",
        "body": "Bi'Boya Mat Comfort Kokusuz İç Cephe Boyası, modern inşaat standartlarına uygun olarak hazırlanmış sağlam, temiz ve tozdan arındırılmış yüzeylerde uygulanmalıdır."
      },
      {
        "title": "Uygulama ve Sarfiyat Şartnamesi",
        "body": "Önerilen sarfiyat miktarı 12 - 16 m²/L (tek kat) aralığında olup ortam sıcaklığı ve yüzey emiciliğine göre değişiklik gösterebilir."
      }
    ]
  },
  {
    "id": "4505-kalekim-astar",
    "name": "4505 Kalekim Akrilik Emülsiyon Esaslı Astar",
    "badge": "Kalekim Yetkili Bayi",
    "tag": "4505 Serisi",
    "deptId": "kalekimPaintSection",
    "category": "ic-cephe",
    "thumb": "assets/kalekim-official/4505-kalekim-astar.webp",
    "desc": "Gözenekli Yüzeylerde Emişi Dengeleyen Genel Amaçlı Astar",
    "meta": [
      "20 kg / 5 kg Kova",
      "0.1 - 0.2 kg/m²",
      "Resmi Kalekim TDS Belgeli"
    ],
    "coverage": "0.1 - 0.2 kg/m²",
    "sizes": [
      "20 kg / 5 kg Kova",
      "Paletli Şantiye Teslim"
    ],
    "specs": {
      "standard": "TS EN Standart Uygunluk",
      "packaging": "20 kg / 5 kg Kova",
      "consumption": "0.1 - 0.2 kg/m²",
      "mixingRatio": "Resmi TDS Şartnamesine Uygun",
      "potLife": "Uygulama Ömrü: 2-4 Saat",
      "logistics": "Balçova Showroom & Urla Depo Stok"
    },
    "tds": "https://cdn.kalekim.com//file/0/0/doc/9288ca7f-26c7-4dcc-b949-d5a72e4915de",
    "accordions": [
      {
        "title": "Kullanım Alanı ve Yüzey Hazırlığı",
        "body": "4505 Kalekim Akrilik Emülsiyon Esaslı Astar, modern inşaat standartlarına uygun olarak hazırlanmış sağlam, temiz ve tozdan arındırılmış yüzeylerde uygulanmalıdır."
      },
      {
        "title": "Uygulama ve Sarfiyat Şartnamesi",
        "body": "Önerilen sarfiyat miktarı 0.1 - 0.2 kg/m² aralığında olup ortam sıcaklığı ve yüzey emiciliğine göre değişiklik gösterebilir."
      }
    ]
  }
];

  var DEPARTMENTS_DATA = [
    {
      id: "kalekimProductCatalog",
      name: "Seramik & Derz",
      title: "Kalekim Seramik & Granit Harçları",
      badge: "Departman 01 · Seramik & Granit",
      pills: [
        { filter: "seramik-harclar", label: "Porselen & Granit Harçları" },
        { filter: "derz-dolgular", label: "Ultrafuga & Esnek Derz" }
      ]
    },
    {
      id: "kalekimWaterproofSection",
      name: "Su Yalıtımı",
      title: "Kalekim Su Yalıtım Sistemleri",
      badge: "Departman 02 · Su Yalıtımı",
      pills: [
        { filter: "cift-bilesenli", label: "Çift Bileşenli Harçlar" },
        { filter: "likit-elastik", label: "Likit Membran & Tıkaç" }
      ]
    },
    {
      id: "kalekimThermalSection",
      name: "Isı Yalıtımı",
      title: "Kalekim Isı Yalıtımı & Sıvalar",
      badge: "Departman 03 · Dış Cephe Isı Yalıtımı",
      pills: [
        { filter: "levha-harclari", label: "Levha Yapıştırıcı & Sıva" },
        { filter: "mineral-kaplama", label: "Dekoratif Mineral Sıva" }
      ]
    },
    {
      id: "kalekimRepairSection",
      name: "Tamir & Grout",
      title: "Kalekim TamirArt Yapısal Onarım",
      badge: "Departman 04 · Teknik Harçlar",
      pills: [
        { filter: "yapisal-tamir", label: "Yapısal Onarım & Grout" },
        { filter: "tamir-astar", label: "Yüzey Düzeltme & Astar" }
      ]
    },
    {
      id: "kalekimFloorSection",
      name: "Zemin Şapları",
      title: "Kalekim Zemin Sistemleri & Şap",
      badge: "Departman 05 · Zemin Sistemleri",
      pills: [
        { filter: "tesviye-sap", label: "Kendiliğinden Yayılan Şap" },
        { filter: "yuzey-sertlestirici", label: "Yüzey Sertleştirici & Epoksi" }
      ]
    },
    {
      id: "kalekimPaintSection",
      name: "Boya & Astar",
      title: "Kalekim Bi'Boya & Özel Astarlar",
      badge: "Departman 06 · Bi'Boya",
      pills: [
        { filter: "dis-cephe", label: "Dış Cephe Boyaları" },
        { filter: "ic-cephe", label: "İç Cephe & Astarlar" }
      ]
    }
  ];

  var activeDeptIndex = 0;
  var subnavLinks = document.querySelectorAll(".pv-subnav-link");
  var deptPanels = document.querySelectorAll(".pv-dept-panel");
  var deptTriggerLabel = document.getElementById("pvDeptTriggerLabel");
  var filterRail = document.getElementById("pvFilterRail");
  var deptDrawerBackdrop = document.getElementById("pvDeptDrawerBackdrop");
  var deptDrawer = document.getElementById("pvDeptDrawer");
  var deptTrigger = document.getElementById("pvDeptTrigger");
  var deptDrawerCloseBtn = document.getElementById("pvDrawerCloseBtn");
  var deptList = document.getElementById("pvDeptList");

  function switchDepartment(index) {
    if (index < 0 || index >= DEPARTMENTS_DATA.length) return;
    activeDeptIndex = index;
    var dept = DEPARTMENTS_DATA[index];

    subnavLinks.forEach(function(link, idx) {
      var isActive = idx === index;
      link.classList.toggle("active", isActive);
      link.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    deptPanels.forEach(function(panel) {
      var isActive = panel.id === dept.id;
      panel.classList.toggle("active", isActive);
    });

    if (deptTriggerLabel) {
      deptTriggerLabel.textContent = dept.name;
    }

    renderMobileFilterRail(dept);

    // Scroll smoothly to department if desktop navigation clicked
    var targetSec = document.getElementById(dept.id);
    if (targetSec) {
      var offset = targetSec.getBoundingClientRect().top + window.pageYOffset - 110;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  }

  function renderMobileFilterRail(dept) {
    if (!filterRail) return;
    filterRail.innerHTML = "";
    dept.pills.forEach(function(pill, idx) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "pv-rail-pill" + (idx === 0 ? " active" : "");
      btn.textContent = pill.label;
      btn.setAttribute("data-filter", pill.filter);
      btn.addEventListener("click", function() {
        filterRail.querySelectorAll(".pv-rail-pill").forEach(function(p) { p.classList.remove("active"); });
        btn.classList.add("active");
        applyCategoryFilter(dept.id, pill.filter);
      });
      filterRail.appendChild(btn);
    });
  }

  function applyCategoryFilter(deptId, category) {
    var panel = document.getElementById(deptId);
    if (!panel) return;

    var pills = panel.querySelectorAll(".pv-menu-pill");
    pills.forEach(function(pill) {
      var isActive = pill.getAttribute("data-filter") === category;
      pill.classList.toggle("active", isActive);
      pill.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    var rows = panel.querySelectorAll(".pv-menu-row");
    rows.forEach(function(row) {
      var match = row.getAttribute("data-category") === category;
      row.style.display = match ? "flex" : "none";
    });
  }

  // Hook desktop subnav links
  subnavLinks.forEach(function(link, index) {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      switchDepartment(index);
    });
  });

  // Hook in-page category pills
  deptPanels.forEach(function(panel) {
    var pills = panel.querySelectorAll(".pv-menu-pill");
    pills.forEach(function(pill) {
      pill.addEventListener("click", function() {
        var cat = pill.getAttribute("data-filter");
        applyCategoryFilter(panel.id, cat);
        // Sync mobile rail
        if (filterRail) {
          filterRail.querySelectorAll(".pv-rail-pill").forEach(function(r) {
            r.classList.toggle("active", r.getAttribute("data-filter") === cat);
          });
        }
      });
    });
  });

  // Mobile Drawer sheet interactions
  function openDeptDrawer() {
    if (!deptDrawerBackdrop || !deptDrawer) return;
    deptDrawerBackdrop.classList.add("active");
    deptDrawerBackdrop.setAttribute("aria-hidden", "false");
    deptDrawer.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeDeptDrawer() {
    if (!deptDrawerBackdrop || !deptDrawer) return;
    deptDrawerBackdrop.classList.remove("active");
    deptDrawerBackdrop.setAttribute("aria-hidden", "true");
    deptDrawer.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (deptTrigger) {
    deptTrigger.addEventListener("click", openDeptDrawer);
  }
  if (deptDrawerCloseBtn) {
    deptDrawerCloseBtn.addEventListener("click", closeDeptDrawer);
  }
  if (deptDrawerBackdrop) {
    deptDrawerBackdrop.addEventListener("click", function(e) {
      if (e.target === deptDrawerBackdrop) closeDeptDrawer();
    });
  }

  // Populate drawer list
  if (deptList) {
    deptList.innerHTML = "";
    DEPARTMENTS_DATA.forEach(function(dept, idx) {
      var item = document.createElement("div");
      item.className = "pv-drawer-item" + (idx === 0 ? " active" : "");
      item.innerHTML = '<div class="pv-drawer-item-title">' + dept.name + '</div><div class="pv-drawer-item-desc">' + dept.title + '</div>';
      item.addEventListener("click", function() {
        deptList.querySelectorAll(".pv-drawer-item").forEach(function(it) { it.classList.remove("active"); });
        item.classList.add("active");
        closeDeptDrawer();
        switchDepartment(idx);
      });
      deptList.appendChild(item);
    });
  }

  // Initial mobile filter rail render
  renderMobileFilterRail(DEPARTMENTS_DATA[0]);

  /* 3. PRODUCT DETAIL BOTTOM SHEET MODAL CONTROLLER */
  var modalBackdrop = document.getElementById("pvModalBackdrop");
  var modalCard = document.getElementById("pvModalCard");
  var modalCloseBtn = document.getElementById("pvModalCloseBtn");
  var modalProductTitle = document.getElementById("modalProductTitle");
  var modalProductBadge = document.getElementById("modalProductBadge");
  var modalProductImg = document.getElementById("modalProductImg");
  var modalProductDesc = document.getElementById("modalProductDesc");
  var modalSizeChips = document.getElementById("modalSizeChips");
  var modalSpecStandard = document.getElementById("modalSpecStandard");
  var modalSpecConsumption = document.getElementById("modalSpecConsumption");
  var modalSpecPackaging = document.getElementById("modalSpecPackaging");
  var modalSpecMixing = document.getElementById("modalSpecMixing");
  var modalSpecPotLife = document.getElementById("modalSpecPotLife");
  var modalSpecLogistics = document.getElementById("modalSpecLogistics");
  var modalAccordions = document.getElementById("modalAccordions");
  var modalWaBtn = document.getElementById("modalWaBtn");
  var modalShareBtn = document.getElementById("modalShareBtn");
  var modalShareText = document.getElementById("modalShareText");

  var currentProduct = null;
  var selectedSize = "";

  function openProductModal(productId) {
    var prod = KALEKIM_PRODUCTS_DATA.find(function(p) { return p.id === productId; });
    if (!prod) return;
    currentProduct = prod;

    if (modalProductTitle) modalProductTitle.textContent = prod.name;
    if (modalProductBadge) modalProductBadge.textContent = prod.badge;
    if (modalProductImg) {
      modalProductImg.src = prod.thumb;
      modalProductImg.alt = prod.name;
    }
    if (modalProductDesc) modalProductDesc.textContent = prod.desc;

    // Spec gauges
    if (modalSpecStandard) modalSpecStandard.textContent = prod.specs.standard;
    if (modalSpecConsumption) modalSpecConsumption.textContent = prod.specs.consumption;
    if (modalSpecPackaging) modalSpecPackaging.textContent = prod.specs.packaging;

    // Specs table
    if (modalSpecMixing) modalSpecMixing.textContent = prod.specs.mixingRatio;
    if (modalSpecPotLife) modalSpecPotLife.textContent = prod.specs.potLife;
    if (modalSpecLogistics) modalSpecLogistics.textContent = prod.specs.logistics;

    // Size chips
    if (modalSizeChips) {
      modalSizeChips.innerHTML = "";
      selectedSize = prod.sizes[0] || "25 kg Kraft Torba";
      prod.sizes.forEach(function(sz, idx) {
        var chip = document.createElement("button");
        chip.type = "button";
        chip.className = "pv-size-chip" + (idx === 0 ? " active" : "");
        chip.textContent = sz;
        chip.addEventListener("click", function() {
          modalSizeChips.querySelectorAll(".pv-size-chip").forEach(function(c) { c.classList.remove("active"); });
          chip.classList.add("active");
          selectedSize = sz;
          updateWhatsAppLink();
        });
        modalSizeChips.appendChild(chip);
      });
    }

    // Accordions
    if (modalAccordions) {
      modalAccordions.innerHTML = "";
      if (prod.accordions && prod.accordions.length > 0) {
        prod.accordions.forEach(function(acc) {
          var details = document.createElement("details");
          details.className = "pv-modal-acc-item";
          details.innerHTML = '<summary class="pv-modal-acc-summary"><span>' + acc.title + '</span><svg class="pv-acc-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg></summary><div class="pv-modal-acc-content"><p>' + acc.body + '</p></div>';
          modalAccordions.appendChild(details);
        });
      }
      // Add official TDS link accordion
      if (prod.tds) {
        var tdsAcc = document.createElement("div");
        tdsAcc.className = "pv-tds-action-wrap";
        tdsAcc.style.marginTop = "14px";
        tdsAcc.innerHTML = '<a href="' + prod.tds + '" target="_blank" rel="noopener" class="pv-btn-tds-full"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg><span>Resmi Kalekim Teknik Bilgi Föyü (TDS) Görüntüle</span></a>';
        modalAccordions.appendChild(tdsAcc);
      }
    }

    updateWhatsAppLink();

    if (modalBackdrop && modalCard) {
      modalBackdrop.classList.add("active");
      modalBackdrop.setAttribute("aria-hidden", "false");
      modalCard.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  function updateWhatsAppLink() {
    if (!modalWaBtn || !currentProduct) return;
    var msg = "Merhaba, Kalekim yetkili bayinizden " + currentProduct.name + " (" + selectedSize + ") için güncel palet/şantiye fiyatı ve stok durumu öğrenmek istiyorum.";
    modalWaBtn.href = "https://wa.me/905323844497?text=" + encodeURIComponent(msg);
  }

  function closeProductModal() {
    if (!modalBackdrop || !modalCard) return;
    modalBackdrop.classList.remove("active");
    modalBackdrop.setAttribute("aria-hidden", "true");
    modalCard.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeProductModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", function(e) {
      if (e.target === modalBackdrop) closeProductModal();
    });
  }

  // Hook all .pv-menu-row click & Enter key
  document.querySelectorAll(".pv-menu-row").forEach(function(row) {
    var pid = row.getAttribute("data-product-id") || row.getAttribute("data-id");
    row.addEventListener("click", function() { openProductModal(pid); });
    row.addEventListener("keydown", function(e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openProductModal(pid);
      }
    });
  });

  // Share button copy handler
  if (modalShareBtn) {
    modalShareBtn.addEventListener("click", function() {
      if (!currentProduct) return;
      var shareUrl = window.location.origin + window.location.pathname + "#" + currentProduct.id;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareUrl).then(function() {
          if (modalShareText) modalShareText.textContent = "Kopyalandı!";
          setTimeout(function() {
            if (modalShareText) modalShareText.textContent = "Paylaş";
          }, 2000);
        });
      }
    });
  }

  /* 4. SPOTLIGHT SEARCH (⌘K / Keyboard Shortcuts) */
  var spotlightModal = document.getElementById("pvSpotlightModal");
  var spotlightInput = document.getElementById("pvSpotlightInput");
  var spotlightClose = document.getElementById("pvSpotlightClose");
  var spotlightResults = document.getElementById("pvSpotlightResults");
  var subnavSearchBtn = document.getElementById("pvSubnavSearchBtn");

  function openSpotlight() {
    if (!spotlightModal || !spotlightInput) return;
    spotlightModal.classList.add("active");
    spotlightModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    spotlightInput.value = "";
    renderSpotlightResults("");
    setTimeout(function() { spotlightInput.focus(); }, 50);
  }

  function closeSpotlight() {
    if (!spotlightModal) return;
    spotlightModal.classList.remove("active");
    spotlightModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function renderSpotlightResults(query) {
    if (!spotlightResults) return;
    spotlightResults.innerHTML = "";
    var cleanQ = query.trim().toLowerCase();

    var matches = KALEKIM_PRODUCTS_DATA.filter(function(p) {
      if (!cleanQ) return true;
      return p.name.toLowerCase().includes(cleanQ) ||
             p.desc.toLowerCase().includes(cleanQ) ||
             p.specs.standard.toLowerCase().includes(cleanQ) ||
             p.id.toLowerCase().includes(cleanQ);
    });

    if (matches.length === 0) {
      spotlightResults.innerHTML = '<div class="pv-spotlight-empty">Aramanıza uygun Kalekim ürünü bulunamadı.</div>';
      return;
    }

    matches.slice(0, 10).forEach(function(prod) {
      var item = document.createElement("div");
      item.className = "pv-spotlight-item";
      item.innerHTML = '<img src="' + prod.thumb + '" alt="' + prod.name + '" class="pv-spotlight-thumb" /><div class="pv-spotlight-info"><div class="pv-spotlight-name">' + prod.name + '</div><div class="pv-spotlight-desc">' + prod.desc + '</div></div><span class="pv-spotlight-badge">' + prod.badge + '</span>';
      item.addEventListener("click", function() {
        closeSpotlight();
        openProductModal(prod.id);
      });
      spotlightResults.appendChild(item);
    });
  }

  if (subnavSearchBtn) subnavSearchBtn.addEventListener("click", openSpotlight);
  if (spotlightClose) spotlightClose.addEventListener("click", closeSpotlight);
  if (spotlightModal) {
    spotlightModal.addEventListener("click", function(e) {
      if (e.target === spotlightModal) closeSpotlight();
    });
  }
  if (spotlightInput) {
    spotlightInput.addEventListener("input", function() {
      renderSpotlightResults(spotlightInput.value);
    });
  }

  window.addEventListener("keydown", function(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      if (spotlightModal && spotlightModal.classList.contains("active")) {
        closeSpotlight();
      } else {
        openSpotlight();
      }
    }
    if (e.key === "Escape") {
      closeSpotlight();
      closeProductModal();
      closeDeptDrawer();
    }
  });

  // Check URL hash for direct product opening
  if (window.location.hash) {
    var rawHash = window.location.hash.substring(1);
    var targetProduct = KALEKIM_PRODUCTS_DATA.find(function(p) { return p.id === rawHash; });
    if (targetProduct) {
      setTimeout(function() { openProductModal(targetProduct.id); }, 300);
    }
  }
})();
