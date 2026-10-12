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
      short: "Seramik & Derz", 
      full: "Seramik & Granit Harçları, Ultrafuga Derz", 
      sub: "Porselen, granit harçları ve Ultrafuga derzler",
      icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
      pillsId: "kalekimProductCatalogPills" 
    },
    { 
      id: "kalekimWaterproofSection", 
      short: "Su Yalıtımı", 
      full: "Su Yalıtım Sistemleri & Membranlar", 
      sub: "İzolatex 2K harçlar, elastik likit membran ve tıkaç",
      icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',
      pillsId: "kalekimWaterproofSectionPills" 
    },
    { 
      id: "kalekimThermalSection", 
      short: "Isı Yalıtımı", 
      full: "Dış Cephe Isı Yalıtım Sistemleri & Sıvalar", 
      sub: "EPS/taşyünü yapıştırıcı, file sıvası ve dekoratif kaplama",
      icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
      pillsId: "kalekimThermalSectionPills" 
    },
    { 
      id: "kalekimRepairSection", 
      short: "Tamir & Grout", 
      full: "TamirArt Yapısal Onarım & Grout Harçları", 
      sub: "R4 yapısal tamir, akıcı grout ve epoksi ankraj",
      icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h20"/><path d="m5 16 3-3"/><path d="M9 12l8-8 4 4-8 8"/><path d="m14 7 3 3"/></svg>',
      pillsId: "kalekimRepairSectionPills" 
    },
    { 
      id: "kalekimFloorSection", 
      short: "Zemin Şapları", 
      full: "Zemin Sistemleri, Tesviye & Şaplar", 
      sub: "Kendiliğinden yayılan şap ve yüzey sertleştiriciler",
      icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M4 17h16"/><path d="M7 13h10"/><path d="M10 9h4"/><path d="M12 3v3"/></svg>',
      pillsId: "kalekimFloorSectionPills" 
    },
    { 
      id: "kalekimPaintSection", 
      short: "Boya & Astar", 
      full: "Bi\'Boya Dış & İç Cephe Boyaları ve Astarlar", 
      sub: "Silikonlu dış cephe, grenli kaplama ve astarlar",
      icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 11V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10"/><path d="m9 16 5 5 8-8-5-5Z"/></svg>',
      pillsId: "kalekimPaintSectionPills" 
    }
  ];

  var subnav = document.getElementById("pvSubnav");
  var spacer = document.getElementById("pvSubnavSpacer");
  var header = document.getElementById("pvHeader") || document.querySelector("header");
  var subnavLinks = document.querySelectorAll("#pvSubnavLinks .pv-subnav-link");
  var deptTrigger = document.getElementById("pvDeptTrigger");
  var deptTriggerLabel = document.getElementById("pvDeptTriggerLabel");
  var deptDrawerBackdrop = document.getElementById("pvDeptDrawerBackdrop");
  var deptDrawer = document.getElementById("pvDeptDrawer");
  var drawerCloseBtn = document.getElementById("pvDrawerCloseBtn");
  var deptList = document.getElementById("pvDeptList");
  var filterRail = document.getElementById("pvFilterRail");

  var currentActiveTab = "kalekimProductCatalog";
  var currentProduct = null;
  var selectedSize = "";

  var panels = {
    "kalekimProductCatalog": document.getElementById("kalekimProductCatalog"),
    "kalekimWaterproofSection": document.getElementById("kalekimWaterproofSection"),
    "kalekimThermalSection": document.getElementById("kalekimThermalSection"),
    "kalekimRepairSection": document.getElementById("kalekimRepairSection"),
    "kalekimFloorSection": document.getElementById("kalekimFloorSection"),
    "kalekimPaintSection": document.getElementById("kalekimPaintSection")
  };

  // Sticky subnav header clearance sync
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
    // Pure CSS sticky stacking is active via pervan-catalog.css & pervan.js
    if (!subnav) return;
    if (spacer) {
      spacer.classList.remove("is-active");
      spacer.style.height = "0px";
    }
    subnav.style.top = "";
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
      switchTab(target);
      var origin = getSubnavOrigin();
      if ((window.pageYOffset || document.documentElement.scrollTop) > origin) {
        window.scrollTo({ top: origin - getHeaderHeight(), behavior: "smooth" });
      }
    });
  });

  function renderDeptDrawer(activeId) {
    if (!deptList) return;
    deptList.innerHTML = "";
    DEPARTMENTS_DATA.forEach(function(d) {
      var btn = document.createElement("button");
      btn.type = "button";
      var isSelected = (d.id === activeId);
      btn.className = "pv-drawer-item" + (isSelected ? " is-selected" : "");
      btn.innerHTML = 
        '<div class="pv-drawer-item-left">' +
          '<div class="pv-drawer-icon-box" aria-hidden="true">' + d.icon + '</div>' +
          '<div class="pv-drawer-text-stack">' +
            '<span class="pv-drawer-item-title">' + d.short + '</span>' +
            '<span class="pv-drawer-item-sub">' + d.sub + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="pv-drawer-item-right" aria-hidden="true">' +
          '<svg class="pv-drawer-item-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>' +
        '</div>';

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
      e.stopPropagation();
      openDeptDrawer();
    });
  }
  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener("click", closeDeptDrawer);
  }

  function setupCategoryFiltering(pillsContainerId, listContainerId) {
    var container = document.getElementById(pillsContainerId);
    var list = document.getElementById(listContainerId);
    if (!container || !list) return;

    var pills = container.querySelectorAll(".pv-menu-pill");
    var rows = list.querySelectorAll(".pv-menu-row");

    pills.forEach(function(pill) {
      pill.addEventListener("click", function() {
        var filter = pill.getAttribute("data-filter");
        pills.forEach(function(p) {
          p.classList.remove("active");
          p.setAttribute("aria-selected", "false");
        });
        pill.classList.add("active");
        pill.setAttribute("aria-selected", "true");

        rows.forEach(function(row) {
          var cat = row.getAttribute("data-category");
          if (filter === "all" || cat === filter) {
            row.style.display = "";
          } else {
            row.style.display = "none";
          }
        });
      });
    });

    var activePill = container.querySelector(".pv-menu-pill.active") || pills[0];
    if (activePill) {
      var initialFilter = activePill.getAttribute("data-filter");
      rows.forEach(function(row) {
        if (initialFilter !== "all" && row.getAttribute("data-category") !== initialFilter) {
          row.style.display = "none";
        } else {
          row.style.display = "";
        }
      });
    }
  }

  setupCategoryFiltering("kalekimProductCatalogPills", "list_kalekimProductCatalog");
  setupCategoryFiltering("kalekimWaterproofSectionPills", "list_kalekimWaterproofSection");
  setupCategoryFiltering("kalekimThermalSectionPills", "list_kalekimThermalSection");
  setupCategoryFiltering("kalekimRepairSectionPills", "list_kalekimRepairSection");
  setupCategoryFiltering("kalekimFloorSectionPills", "list_kalekimFloorSection");
  setupCategoryFiltering("kalekimPaintSectionPills", "list_kalekimPaintSection");

  // ==========================================================================
  // ARCHITECTURAL PRODUCT DETAIL MODAL
  // ==========================================================================
  var modalBackdrop = document.getElementById("pvModalBackdrop");
  var modalCard = document.getElementById("pvModalCard");
  var modalCloseBtn = document.getElementById("pvModalCloseBtn");
  var modalTopBar = document.getElementById("modalTopBar");
  var modalHandleZone = document.getElementById("modalHandleZone");
  var modalScrollArea = document.getElementById("modalScrollArea");

  var modalProductImg = document.getElementById("modalProductImg");
  var modalProductBadges = document.getElementById("modalProductBadges");
  var modalProductBadge = document.getElementById("modalProductBadge");
  var modalProductTag = document.getElementById("modalProductTag");
  var modalProductEyebrow = document.getElementById("modalProductEyebrow");
  var modalProductTitle = document.getElementById("modalProductTitle");
  var modalProductDesc = document.getElementById("modalProductDesc");

  var modalPackagingSection = document.getElementById("modalPackagingSection");
  var modalSelectedSizeHint = document.getElementById("modalSelectedSizeHint");
  var modalSizeChips = document.getElementById("modalSizeChips");
  var modalSizeTrack = document.getElementById("modalSizeTrack");

  var modalSpecStandard = document.getElementById("modalSpecStandard");
  var modalSpecPackaging = document.getElementById("modalSpecPackaging");
  var modalSpecConsumption = document.getElementById("modalSpecConsumption");
  var modalSpecMixing = document.getElementById("modalSpecMixing");
  var modalSpecPotLife = document.getElementById("modalSpecPotLife");
  var modalSpecLogistics = document.getElementById("modalSpecLogistics");
  var modalSpecsTable = document.getElementById("modalSpecsTable");

  var modalWABtn = document.getElementById("modalWABtn") || document.getElementById("modalWaBtn");
  var modalWaBtn = document.getElementById("modalWaBtn") || document.getElementById("modalWABtn");
  var modalAccordions = document.getElementById("modalAccordions") || document.getElementById("modalAccordionsWrap");
  var modalAccordionsWrap = document.getElementById("modalAccordionsWrap") || document.getElementById("modalAccordions");

  var isSheetDragging = false;
  var dragStartY = 0;
  var dragCurrentY = 0;
  var dragStartTime = 0;
  var canDragFromScroll = false;

  function openModal(productId) {
    var p = KALEKIM_PRODUCTS_DATA.find(function(item) { return item.id === productId; });
    if (!p) return;
    currentProduct = p;
    selectedSize = (p.sizes && p.sizes.length > 0) ? p.sizes[0] : "";

    if (modalProductImg) {
      modalProductImg.src = p.thumb;
      modalProductImg.alt = p.name;
    }
    if (modalProductEyebrow) {
      modalProductEyebrow.textContent = "KALEKİM · YAPI KİMYASALLARI";
    }
    if (modalProductTitle) {
      modalProductTitle.textContent = p.name;
    }
    if (modalProductDesc) {
      modalProductDesc.textContent = p.desc;
    }

    // Dynamic Badges
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
    } else if (modalProductBadge) {
      modalProductBadge.textContent = p.badge || "";
    }

    // Gauge Fallbacks
    if (modalSpecStandard) modalSpecStandard.textContent = (p.specs && p.specs.standard) ? p.specs.standard : (p.badge || "-");
    if (modalSpecPackaging) modalSpecPackaging.textContent = (p.specs && p.specs.packaging) ? p.specs.packaging : ((p.sizes && p.sizes[0]) ? p.sizes[0] : "-");
    if (modalSpecConsumption) modalSpecConsumption.textContent = (p.specs && p.specs.consumption) ? p.specs.consumption : "-";
    if (modalSpecMixing) modalSpecMixing.textContent = (p.specs && p.specs.mixingRatio) ? p.specs.mixingRatio : "-";
    if (modalSpecPotLife) modalSpecPotLife.textContent = (p.specs && p.specs.potLife) ? p.specs.potLife : "-";
    if (modalSpecLogistics) modalSpecLogistics.textContent = (p.specs && p.specs.logistics) ? p.specs.logistics : "Balçova Showroom & Urla Depo";

    // Dynamic Specs Table
    if (modalSpecsTable) {
      modalSpecsTable.innerHTML = "";
      var specLabels = {
        standard: "Kalite & Standardı",
        packaging: "Ambalaj & Satış Birimi",
        consumption: "Sarfiyat Miktarı",
        mixingRatio: "Karışım Oranı",
        potLife: "Kap Ömrü & Priz",
        logistics: "Lojistik & Sevk"
      };
      if (p.specs) {
        for (var key in p.specs) {
          if (p.specs.hasOwnProperty(key)) {
            var rowEl = document.createElement("div");
            rowEl.className = "pv-spec-row";
            var kEl = document.createElement("span");
            kEl.className = "pv-spec-k";
            kEl.textContent = (specLabels[key] || key) + ":";
            var vEl = document.createElement("span");
            vEl.className = "pv-spec-v";
            vEl.textContent = p.specs[key];
            rowEl.appendChild(kEl);
            rowEl.appendChild(vEl);
            modalSpecsTable.appendChild(rowEl);
          }
        }
      }
    }

    // Size / Packaging chips
    if (modalSizeChips) {
      modalSizeChips.innerHTML = "";
      if (p.sizes && p.sizes.length > 0) {
        if (modalPackagingSection) modalPackagingSection.style.display = "";
        p.sizes.forEach(function(size, idx) {
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
        if (modalSelectedSizeHint) modalSelectedSizeHint.textContent = p.sizes[0];
      } else {
        if (modalPackagingSection) modalPackagingSection.style.display = "none";
      }
    }

    // Fallback Segmented Track
    if (modalSizeTrack) {
      modalSizeTrack.innerHTML = "";
      if (p.sizes && p.sizes.length > 0) {
        p.sizes.forEach(function(size, idx) {
          var btn = document.createElement("button");
          btn.type = "button";
          btn.className = "pv-segmented-btn" + (idx === 0 ? " active" : "");
          btn.textContent = size;
          btn.addEventListener("click", function() {
            modalSizeTrack.querySelectorAll(".pv-segmented-btn").forEach(function(b) { b.classList.remove("active"); });
            btn.classList.add("active");
            selectedSize = size;
            updateWhatsAppUrl();
          });
          modalSizeTrack.appendChild(btn);
        });
      }
    }

    // Dynamic Accordions
    var accTarget = modalAccordions || modalAccordionsWrap;
    if (accTarget) {
      accTarget.innerHTML = "";
      if (p.accordions && p.accordions.length > 0) {
        p.accordions.forEach(function(acc, idx) {
          var item = document.createElement("div");
          item.className = "pv-acc-item" + (idx === 0 ? " active" : "");
          item.innerHTML = 
            '<button type="button" class="pv-acc-header">' +
            '  <span>' + acc.title + '</span>' +
            '  <span class="pv-acc-icon">+</span>' +
            '</button>' +
            '<div class="pv-acc-body">' + acc.body + '</div>';

          item.querySelector(".pv-acc-header").addEventListener("click", function() {
            item.classList.toggle("active");
          });
          accTarget.appendChild(item);
        });
      }
      if (p.tds) {
        var tdsEl = document.createElement("div");
        tdsEl.className = "pv-tds-action-wrap";
        tdsEl.style.marginTop = "14px";
        tdsEl.innerHTML = '<a href="' + p.tds + '" target="_blank" rel="noopener" class="pv-btn-tds-full"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg><span>Resmi Kalekim Teknik Bilgi Föyü (TDS) Görüntüle</span></a>';
        accTarget.appendChild(tdsEl);
      }
    }

    updateWhatsAppUrl();

    if (modalBackdrop) {
      modalBackdrop.classList.add("open");
      modalBackdrop.classList.add("is-open");
      modalBackdrop.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    try {
      history.replaceState({ modal: true, id: p.id }, "", "/urun/" + p.id + ".html");
    } catch(e) {}
  }

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

  // Canonical Share Button Listener
  var modalShareBtn = document.getElementById("modalShareBtn");
  var modalShareText = document.getElementById("modalShareText");
  if (modalShareBtn) {
    modalShareBtn.addEventListener("click", function() {
      var prod = (typeof currentProduct !== "undefined" && currentProduct) ? currentProduct : null;
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
    modalBackdrop.classList.remove("open");
    modalBackdrop.classList.remove("is-open");
    modalBackdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    currentProduct = null;
    resetSheetStyles();
    try {
      history.replaceState({}, "", "/kalekim-yapi-kimyasallari.html");
    } catch(e) {}
  }

  function updateWhatsAppUrl() {
    if (!currentProduct) return;
    var text = "Merhaba, Kalekim " + currentProduct.name;
    if (selectedSize) {
      text += " (" + selectedSize + ")";
    }
    text += " için Urla / Balçova depo şantiye teslimat ve güncel palet fiyat bilgisi almak istiyorum.";
    text += "\n\nÜrün Detayı: https://pervanyapi.com/urun/" + currentProduct.id + ".html";
    var waHref = "https://wa.me/905323844497?text=" + encodeURIComponent(text);
    if (modalWABtn) modalWABtn.href = waHref;
    if (modalWaBtn) modalWaBtn.href = waHref;
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", function(e) {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  // Touch gesture physics for mobile bottom sheet dismissal
  function onDragStart(e) {
    if (!modalBackdrop || (!modalBackdrop.classList.contains("is-open") && !modalBackdrop.classList.contains("open"))) return;
    var touch = e.touches ? e.touches[0] : e;
    dragStartY = touch.clientY;
    dragCurrentY = touch.clientY;
    dragStartTime = Date.now();
    isSheetDragging = false;
    canDragFromScroll = (modalScrollArea && modalScrollArea.scrollTop <= 0);
  }

  function onDragMove(e) {
    if (!modalBackdrop || (!modalBackdrop.classList.contains("is-open") && !modalBackdrop.classList.contains("open")) || !dragStartY) return;
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

  document.querySelectorAll(".pv-menu-row").forEach(function(row) {
    var pid = row.getAttribute("data-product-id") || row.getAttribute("data-id");
    row.addEventListener("click", function(e) {
      if (e.target.closest("a")) return;
      if (pid) openModal(pid);
    });
    row.addEventListener("keydown", function(e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (pid) openModal(pid);
      }
    });
  });

  // ==========================================================================
  // SPOTLIGHT COMMAND PALETTE ENGINE (⌘K / 36 Kalekim Ürünü)
  // ==========================================================================
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
    return d ? d.short : "Kalekim";
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

    var featured = KALEKIM_PRODUCTS_DATA.slice(0, 8);
    var heading = document.createElement("div");
    heading.className = "pv-spotlight-group-title";
    heading.textContent = "Öne Çıkan Kalekim Harç, Derz & İzolasyon Ürünleri";
    spotlightResults.appendChild(heading);

    featured.forEach(function(item) {
      spotlightResults.appendChild(createSpotlightItemEl(item));
    });

    if (spotlightCount) {
      spotlightCount.textContent = KALEKIM_PRODUCTS_DATA.length + " Ürün Kataloğu";
    }
    attachSpotlightItemEvents();
  }

  function createSpotlightItemEl(item) {
    var div = document.createElement("div");
    div.className = "pv-spotlight-item";
    div.setAttribute("data-product-id", item.id);
    div.innerHTML = [
      '<div class="pv-spotlight-item-main">',
      '  <div class="pv-spotlight-item-badge">' + (item.badge || "Kalekim Standart") + '</div>',
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
    var matches = KALEKIM_PRODUCTS_DATA.filter(function(item) {
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
        '<p class="pv-spotlight-empty-title">"' + query + '" için eşleşen Kalekim ürünü bulunamadı</p>',
        '<p class="pv-spotlight-empty-sub">Farklı bir arama terimi deneyin veya WhatsApp hattımızdan direkt sorun.</p>'
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
        var p = KALEKIM_PRODUCTS_DATA.find(function(it) { return it.id === pid; });
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

  // Global Keydown (Escape & ⌘K)
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
      } else if (modalBackdrop && (modalBackdrop.classList.contains("is-open") || modalBackdrop.classList.contains("open"))) {
        closeModal();
      } else if (deptDrawerBackdrop && deptDrawerBackdrop.classList.contains("is-open")) {
        closeDeptDrawer();
      }
    }
  });

  function checkDeepLink() {
    var params = new URLSearchParams(window.location.search);
    var pid = params.get("item") || params.get("product") || params.get("id");
    if (!pid && window.location.hash && window.location.hash.indexOf("#urun-") === 0) {
      pid = window.location.hash.replace("#urun-", "");
    }
    if (!pid && window.location.hash) {
      var candidate = window.location.hash.replace("#", "");
      if (KALEKIM_PRODUCTS_DATA.some(function(item) { return item.id === candidate; })) {
        pid = candidate;
      }
    }
    if (pid) {
      var p = KALEKIM_PRODUCTS_DATA.find(function(item) { return item.id === pid; });
      if (p) {
        if (p.deptId && p.deptId !== currentActiveTab) {
          switchTab(p.deptId);
        }
        openModal(pid);
      }
    }
  }

  switchTab("kalekimProductCatalog");
  checkDeepLink();
  window.addEventListener("popstate", checkDeepLink);

})();
