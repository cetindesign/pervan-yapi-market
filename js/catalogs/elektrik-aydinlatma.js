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
    "id": "vikoModularPanel",
    "short": "VİKO Anahtar & Priz",
    "full": "VİKO Karre & Meridian Modüler Seri",
    "sub": "Tekli, komütatör, priz, panjur anahtarı, çoklu çerçeveler",
    "pillsId": "vikoMenuPills",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/></svg>"
  },
  {
    "id": "legrandBreakersPanel",
    "short": "Legrand Sigorta & Pano",
    "full": "Legrand Otomatlar & Modüler Pano Grubu",
    "sub": "B16-B32 4.5kA otomatlar, kaçak akım röleleri, dağıtım baraları",
    "pillsId": "legrandMenuPills",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"4\" y=\"4\" width=\"16\" height=\"16\" rx=\"2\"/><line x1=\"9\" y1=\"9\" x2=\"9\" y2=\"15\"/><line x1=\"15\" y1=\"9\" x2=\"15\" y2=\"15\"/></svg>"
  },
  {
    "id": "cataLightingPanel",
    "short": "LED Panel & Spot",
    "full": "CATA & Lámparra LED Panel ve Spotlar",
    "sub": "CT-5286 30x30 panel, sıva üstü spotlar, 24W Lámparra 350 ₺",
    "pillsId": "cataLightingMenuPills",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"8\"/><path d=\"M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41\"/></svg>"
  },
  {
    "id": "bulbsLampsPanel",
    "short": "Ampul & Kablosuz Zil",
    "full": "LED Ampul Çeşitleri & Dijital Kapı Zili",
    "sub": "Doğaled ES-231 T-Bulb, NOAS 9W 50 ₺, Philips CorePro, CATA zil",
    "pillsId": "bulbsLampsMenuPills",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M9 18h6M10 22h4M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6h8c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7z\"/></svg>"
  },
  {
    "id": "plugsCablesPanel",
    "short": "Grup Priz & Seyyar Fiş",
    "full": "Çoklu Grup Prizler & Seyyar Fiş Grubu",
    "sub": "VİKO 3'lü-6'lı grup prizler, erkek/dişi seyyar fiş 50 ₺, arapuar",
    "pillsId": "plugsCablesMenuPills",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M12 2v6M9 4h6M5 8h14v4a7 7 0 0 1-14 0V8z\"/></svg>"
  },
  {
    "id": "fasteningInstallPanel",
    "short": "Kroşe, Klemens & Tesisat",
    "full": "Montaj Kroşeleri, Klemens & Altyapı Boruları",
    "sub": "Mutlusan No:1-8 çivili kroşe 5 ₺, Elbi kutu 50 ₺, kablo bağları, bant",
    "pillsId": "fasteningInstallMenuPills",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z\"/></svg>"
  }
];
  var ELEKTRIK_PRODUCTS_DATA = [
    {
      "id": "viko-karre-tekli-anahtar",
      "name": "VİKO Karre Tek Kutuplu Aydınlatma Anahtarı (90967001)",
      "badge": "VİKO Orijinal · TSE",
      "tag": "VİKO Karre 90967001",
      "deptId": "vikoModularPanel",
      "category": "viko-anahtar",
      "thumb": "assets/elektrik/viko-karre-anahtar.jpg",
      "desc": "Ev ve ofis aydınlatma linye hatlarını kontrol eden, minimalist keskin köşeli tasarımıyla modern iç mimariye uyumlu VİKO Karre tekli anahtar mekanizması.",
      "meta": [
        "Model: 90967001",
        "10AX 250V~ Güvenlik",
        "Vidalı / Çabuk Bağlantı"
      ],
      "coverage": "Kutulu Mekanizma + Tuş Kapağı",
      "sizes": [
        "Karre Beyaz Tekli Anahtar",
        "Karre Krem Tekli Anahtar",
        "Meridian Beyaz Tekli Anahtar"
      ],
      "specs": {
        "standard": "TS EN 60669-1 / CE / VDE",
        "packaging": "12 Adet Kutu / 120 Adet Koli",
        "consumption": "Her bağımsız aydınlatma linyesi için 1 adet",
        "mixingRatio": "Standart sıva altı kasaya tırnaklı/vidalı montaj",
        "potLife": "40.000 açma-kapama elektriksel ömür",
        "logistics": "Balçova Mağaza & Urla Depo Stok"
      },
      "accordions": [
        {
          "title": "Çabuk Bağlantılı Kolay Kablolama",
          "body": "Yaylı geçme klemens yapısı sayesinde tornavida kullanmadan bakır iletkeni tek itmeyle sabitler, şantiye montaj hızını iki katına çıkarır."
        },
        {
          "title": "Alev İletmeyen Güvenli Gövde",
          "body": "Gövde polikarbonat alev geciktirici mühendislik plastiğinden üretilmiştir; ark anında alevi yaymaz."
        }
      ]
    },
    {
      "id": "viko-karre-komutator",
      "name": "VİKO Karre Komütatör İkili Lamba Anahtarı (90967002)",
      "badge": "İkili Bağımsız Kumanda",
      "tag": "VİKO Karre 90967002",
      "deptId": "vikoModularPanel",
      "category": "viko-anahtar",
      "thumb": "assets/elektrik/viko-karre-komutator.jpg",
      "desc": "Tek buat veya kasa üzerinden iki ayrı lamba veya avize grubunu bağımsız kontrol etmeyi sağlayan çift tuşlu VİKO Karre komütatör anahtar.",
      "meta": [
        "Model: 90967002",
        "Çift Tuşlu Mekanizma",
        "10AX 250V~"
      ],
      "coverage": "Kutulu Adet Satışı",
      "sizes": [
        "Karre Beyaz Komütatör",
        "Karre Krem Komütatör",
        "Meridian Komütatör"
      ],
      "specs": {
        "standard": "TS EN 60669-1",
        "packaging": "12'li Kutu",
        "consumption": "Salon avizeleri ve çift lamba grupları",
        "mixingRatio": "Standart buat kasası montajı",
        "potLife": "40.000 çevrim dayanımı",
        "logistics": "Balçova Mağaza Stoktan Teslim"
      },
      "accordions": [
        {
          "title": "Avize ve Spot Gruplarında Enerji Tasarrufu",
          "body": "Gerektiğinde lambaların yarısını veya tamamını yakarak yaşam alanlarında elektrik tüketimini kontrol altına alır."
        }
      ]
    },
    {
      "id": "viko-karre-toprakli-priz",
      "name": "VİKO Karre Çocuk Korumalı Topraklı Priz (90967008)",
      "badge": "Çocuk Korumalı Emniyet",
      "tag": "VİKO Karre 90967008",
      "deptId": "vikoModularPanel",
      "category": "viko-priz",
      "thumb": "assets/elektrik/viko-karre-priz.jpg",
      "desc": "Priz yuvalarına yabancı cisim sokulmasını engelleyen entegre çocuk koruma perdeli, masif pirinç topraklama kontaklı VİKO Karre priz.",
      "meta": [
        "Model: 90967008",
        "16A 250V~ / 3680W",
        "Entegre Çocuk Koruma"
      ],
      "coverage": "Kutulu Mekanizma + Kapak",
      "sizes": [
        "Karre Beyaz Topraklı Priz",
        "Karre Krem Topraklı Priz",
        "Meridian Topraklı Priz"
      ],
      "specs": {
        "standard": "TS IEC 60884-1 / TSE Belgeli",
        "packaging": "12 Adet Kutu / 120 Adet Koli",
        "consumption": "Daire ve iş yeri priz linye hatları",
        "mixingRatio": "2.5 mm² bakır iletken bağlantısı",
        "potLife": "10.000 takma-çıkarma ömrü",
        "logistics": "Balçova Showroom & Urla Depo"
      },
      "accordions": [
        {
          "title": "Çocuk Emniyet Perdeli Mekanizma",
          "body": "İki fiş pimi aynı anda eşit kuvvetle itilmediği sürece priz kapakçıkları açılmaz; çocukların tel veya sivri cisim sokarak akıma kapılmasını önler."
        },
        {
          "title": "Geniş Pirinç Kontak Yayları",
          "body": "Ağır elektrikli ev aletlerinde (fırın, ütü, süpürge) ark ve ısınma yapmayan yüksek iletkenlikli alaşım kullanılır."
        }
      ]
    },
    {
      "id": "viko-karre-panjur-anahtari",
      "name": "VİKO Karre Motorlu Panjur & Jaluzi Kumanda Anahtarı (90967016)",
      "badge": "Yaylı Panjur Kontrol",
      "tag": "VİKO Karre 90967016",
      "deptId": "vikoModularPanel",
      "category": "viko-anahtar",
      "thumb": "assets/elektrik/viko-karre-panjur.jpg",
      "desc": "Otomatik panjur ve jaluzi motorlarını yukarı-aşağı süren, iki yönün aynı anda devreye girmesini engelleyen mekanik kilitli VİKO panjur anahtarı.",
      "meta": [
        "Model: 90967016",
        "10A 250V~ Motor Kontrol",
        "Yukarı / Aşağı Çift Buton"
      ],
      "coverage": "Kutulu Adet",
      "sizes": [
        "Karre Beyaz Panjur Anahtarı",
        "Karre Krem Panjur Anahtarı"
      ],
      "specs": {
        "standard": "TS EN 60669-1",
        "packaging": "12'li Kutu",
        "consumption": "Motorlu panjur hatları",
        "mixingRatio": "Panjur motor klemensine bağlantı",
        "potLife": "Motor korumalı mekanizma",
        "logistics": "Balçova Mağaza Stok"
      },
      "accordions": [
        {
          "title": "Motor Yanmasını Önleyen Karşılıklı Kilit",
          "body": "Yukarı butonu basılıyken aşağı butonunun devreye girmesine izin vermez; panjur tüp motorunun çift faz alıp yanmasını engeller."
        }
      ]
    },
    {
      "id": "viko-karre-vaviyen-ikili",
      "name": "VİKO Karre Tekli ve İkili Vaviyen Anahtar Grubu (90967056)",
      "badge": "Koridor / Merdiven Vaviyen",
      "tag": "VİKO Karre 90967056",
      "deptId": "vikoModularPanel",
      "category": "viko-anahtar",
      "thumb": "assets/elektrik/viko-karre-vaviyen.jpg",
      "desc": "Uzun holler, yatak odaları ve iki katlı villalarda tek bir aydınlatmayı iki farklı noktadan açıp kapatmaya yarayan VİKO Karre vaviyen anahtar.",
      "meta": [
        "Model: 90967056",
        "Çift Noktadan Kontrol",
        "10AX 250V~"
      ],
      "coverage": "Kutulu Adet Satışı",
      "sizes": [
        "Karre Beyaz Tekli Vaviyen",
        "Karre Beyaz İkili Vaviyen",
        "Karre Krem Vaviyen"
      ],
      "specs": {
        "standard": "TS EN 60669-1",
        "packaging": "12'li Kutu",
        "consumption": "Yatak başı, merdiven ve antreler",
        "mixingRatio": "3 damar vaviyen kablolaması",
        "potLife": "40.000 açma-kapama",
        "logistics": "Balçova & Urla Depo Stok"
      },
      "accordions": [
        {
          "title": "Otel ve Yatak Başı Konforu",
          "body": "Kapı girişinden açılan oda ışığının yataktan kalkmadan kapatılabilmesini sağlayarak yaşam alanlarında üst düzey konfor sunar."
        }
      ]
    },
    {
      "id": "viko-karre-coklu-cerceveler",
      "name": "VİKO Karre Yatay & Dikey Modüler Çerçeveler (90960201 - 90960206)",
      "badge": "1'li – 6'lı Modüler Çerçeve",
      "tag": "VİKO Karre Çerçeve",
      "deptId": "vikoModularPanel",
      "category": "viko-cerceve",
      "thumb": "assets/elektrik/viko-karre-cerceve.jpg",
      "desc": "Yan yana gelen priz, anahtar, data ve TV soketlerini tek bir mimari blok altında toplayan 1'li, 2'li, 3'lü, 4'lü, 5'li ve 6'lı VİKO Karre çerçeveler.",
      "meta": [
        "90960201 - 90960206 Kodları",
        "Yatay & Dikey Kullanım",
        "Sararmaz UV Katkılı Plastik"
      ],
      "coverage": "Adet Satışı",
      "sizes": [
        "Tekli Çerçeve (90960201)",
        "İkili Çerçeve (90960202)",
        "Üçlü Çerçeve (90960203)",
        "Dörtlü Çerçeve (90960204)",
        "Beşli / Altılı Çerçeve"
      ],
      "specs": {
        "standard": "VİKO Karre Orijinal Boyut Standartları",
        "packaging": "20'li Kutu",
        "consumption": "Çoklu mekanizma blokları",
        "mixingRatio": "Tırnaklı kolay geçmeli montaj",
        "potLife": "Çizilmeye dayanıklı parlak beyaz",
        "logistics": "Balçova Mağaza Stoktan Teslim"
      },
      "accordions": [
        {
          "title": "Duvar Pürüzlerini Kapatan Yaylı Çerçeve",
          "body": "Arka yaylı tırnak sistemi alçıpan veya sıva kaçıklıklarında duvara sıfır oturarak estetik kusurları görünmez kılar."
        }
      ]
    },
    {
      "id": "viko-nemba-kapakli-priz",
      "name": "VİKO Nemba IP44 Su Geçirmez Kapaklı Sıva Üstü Topraklı Priz",
      "badge": "IP44 Dış Mekan / Islak Hacim",
      "tag": "VİKO Nemba IP44",
      "deptId": "vikoModularPanel",
      "category": "viko-priz",
      "thumb": "assets/elektrik/viko-nemba-priz.jpg",
      "desc": "Bahçe, teras, otopark ve banyo gibi nemli alanlarda su sıçramalarına ve toza karşı contalı yaylı kapakla korunan IP44 sıva üstü priz.",
      "meta": [
        "IP44 Koruma Sınıfı",
        "Contalı Şeffaf / Opak Kapak",
        "16A 250V~"
      ],
      "coverage": "Komple Sıva Üstü Gövde",
      "sizes": [
        "Nemba Tekli Kapaklı Priz",
        "Nemba İkili Yatay Kapaklı Priz"
      ],
      "specs": {
        "standard": "TS IEC 60884-1 / IP44",
        "packaging": "Kutulu",
        "consumption": "Balkon, bahçe ve kazan daireleri",
        "mixingRatio": "Dış cephe ve duvara vidalama",
        "potLife": "UV ve yağmur dayanımı",
        "logistics": "Balçova Mağaza Stok"
      },
      "accordions": [
        {
          "title": "Kablo Rakorlu Su Yalıtımı",
          "body": "Gövdeye kablo giriş noktalarındaki esnek elastomerik rakorlar kablo çevresinden suyun iç mekanizmaya sızmasını engeller."
        }
      ]
    },
    {
      "id": "legrand-otomat-b16-403204",
      "name": "Legrand 1P B16 4.5kA Otomatik Sigorta (Kod: 403204)",
      "badge": "Legrand 403204 · 16A",
      "tag": "Legrand B16 · 403204",
      "deptId": "legrandBreakersPanel",
      "category": "legrand-otomat",
      "thumb": "assets/elektrik/legrand-b16-403204.jpg",
      "desc": "Konut ve ticari binalarda standart priz linyelerini aşırı akım ve kısa devreye karşı koruyan 4.5kA kesme kapasiteli orijinal Legrand B16 otomat.",
      "meta": [
        "Ürün Kodu: 403204",
        "B Tipi Hızlı Açma · 16 Amper",
        "4.5kA Kısa Devre Kesme"
      ],
      "coverage": "1 Modül DIN Rayı Otomatı",
      "sizes": [
        "Legrand B16 (1P 16A 4.5kA - Kod: 403204)",
        "Legrand C16 (Gecikmeli Tip)"
      ],
      "specs": {
        "standard": "TS EN 60898-1 / IEC 60898-1",
        "packaging": "12 Adet Kutu / 120 Adet Koli",
        "consumption": "Daire içi priz linyeleri (2.5 mm² kablo koruması)",
        "mixingRatio": "Standart 35 mm DIN rayına geçme montaj",
        "potLife": "20.000 mekanik açma-kapama",
        "logistics": "Balçova Mağaza & Urla Depo Stoktan Sevk"
      },
      "accordions": [
        {
          "title": "B Tipi Karakteristik Avantajı",
          "body": "Aşırı yük durumunda nominal akımın 3 ila 5 katında anında devreyi keserek bina kablo tesisatının aşırı ısınıp yanmasını önler."
        },
        {
          "title": "Çift Klemensli Bağlantı Esnekliği",
          "body": "Hem bara hem kablo girişine olanak tanıyan patentli Legrand klemens tasarımı pano montajında işçiliği hızlandırır."
        }
      ]
    },
    {
      "id": "legrand-otomat-b20-403205",
      "name": "Legrand 1P B20 4.5kA Otomatik Sigorta (Kod: 403205)",
      "badge": "Legrand 403205 · 20A",
      "tag": "Legrand B20 · 403205",
      "deptId": "legrandBreakersPanel",
      "category": "legrand-otomat",
      "thumb": "assets/elektrik/legrand-b20-403205.jpg",
      "desc": "Mutfak bulaşık makinesi, çamaşır makinesi, mikrodalga ve klima besleme hatlarında güvenilir aşırı yük koruması sağlayan Legrand 20 Amper otomat.",
      "meta": [
        "Ürün Kodu: 403205",
        "20 Amper B Tipi",
        "4.5kA Kesme Kapasitesi"
      ],
      "coverage": "1 Modül Otomat",
      "sizes": [
        "Legrand B20 (1P 20A 4.5kA - Kod: 403205)",
        "Legrand C20 (Klima Tipi)"
      ],
      "specs": {
        "standard": "TS EN 60898-1",
        "packaging": "12'li Kutu",
        "consumption": "Mutfak ve ıslak hacim özel cihaz linyeleri",
        "mixingRatio": "DIN rayı montajı",
        "potLife": "Termik-manyetik hassas açtırma",
        "logistics": "Stoktan Anında Teslim"
      },
      "accordions": [
        {
          "title": "Yüksek Isı Dayanımı",
          "body": "Pano içinde yan yana dizildiğinde oluşan ısınmalarda erken atma yapmayan kalibre edilmiş bimetal şerit teknolojisi içerir."
        }
      ]
    },
    {
      "id": "legrand-otomat-b25-403206",
      "name": "Legrand 1P B25 4.5kA Otomatik Sigorta (Kod: 403206)",
      "badge": "Legrand 403206 · 25A",
      "tag": "Legrand B25 · 403206",
      "deptId": "legrandBreakersPanel",
      "category": "legrand-otomat",
      "thumb": "assets/elektrik/legrand-b25-403206.jpg",
      "desc": "Ankastre fırın, elektrikli ocak, termosifon ve şofben gibi yüksek güç çeken rezistanslı ısıtıcı linyeleri için Legrand B25 otomatik sigorta.",
      "meta": [
        "Ürün Kodu: 403206",
        "25 Amper B Tipi Koruma",
        "Termik & Manyetik Tetik"
      ],
      "coverage": "1 Modül Otomat",
      "sizes": [
        "Legrand B25 (1P 25A 4.5kA - Kod: 403206)",
        "Legrand C25 (Endüstriyel)"
      ],
      "specs": {
        "standard": "TS EN 60898-1",
        "packaging": "12'li Kutu",
        "consumption": "4 mm² kablo korumalı yüksek akımlı cihazlar",
        "mixingRatio": "35 mm DIN rayı",
        "potLife": "Alev iletmez gövde",
        "logistics": "Balçova & Urla Depo"
      },
      "accordions": [
        {
          "title": "Yüksek Güçlü Rezistans Koruması",
          "body": "Termosifon ve ani su ısıtıcılarının rezistans aşınmalarında meydana gelen kaçak ve kısa devre akımlarını anında keser."
        }
      ]
    },
    {
      "id": "legrand-otomat-b32-403207",
      "name": "Legrand 1P B32 4.5kA Otomatik Sigorta (Kod: 403207)",
      "badge": "Legrand 403207 · 32A",
      "tag": "Legrand B32 · 403207",
      "deptId": "legrandBreakersPanel",
      "category": "legrand-otomat",
      "thumb": "assets/elektrik/legrand-b32-403207.jpg",
      "desc": "Daire içi tali pano ana girişleri ve yüksek kapasiteli elektrikli kombi / şofben hatlarında ana koruma anahtarı olarak kullanılan Legrand B32 otomat.",
      "meta": [
        "Ürün Kodu: 403207",
        "32 Amper B Tipi",
        "Ana Pano Giriş Sigortası"
      ],
      "coverage": "1 Modül Otomat",
      "sizes": [
        "Legrand B32 (1P 32A 4.5kA - Kod: 403207)",
        "Legrand C32 (Kapasitif Yük)"
      ],
      "specs": {
        "standard": "TS EN 60898-1",
        "packaging": "12'li Kutu",
        "consumption": "6 mm² ana kolon girişi",
        "mixingRatio": "DIN rayı montajı",
        "potLife": "20.000 çevrim",
        "logistics": "Stoktan Sevk"
      },
      "accordions": [
        {
          "title": "Seçici Koordinasyon",
          "body": "Sayaç panosundaki ana şalter ile tali pano sigortaları arasında tam seçici koordinasyon sağlayarak sadece arızalı linye sigortasının atmasını temin eder."
        }
      ]
    },
    {
      "id": "legrand-kacak-akim-rolesi",
      "name": "Legrand 2P & 4P Kaçak Akım Koruma Rölesi (30mA / 300mA)",
      "badge": "30mA Hayat / 300mA Yangın",
      "tag": "Legrand Kaçak Akım",
      "deptId": "legrandBreakersPanel",
      "category": "legrand-otomat",
      "thumb": "assets/elektrik/legrand-kacak-akim.jpg",
      "desc": "İnsan hayatını elektrik çarpmasından koruyan 30mA hayat koruma rölesi ve binaları elektrik kontağı yangınlarından koruyan 300mA yangın koruma rölesi.",
      "meta": [
        "30mA Hayat Koruma Emniyeti",
        "300mA Yangın Koruma",
        "Elektromekanik Hassas Toroid"
      ],
      "coverage": "2 Modül / 4 Modül Cihaz",
      "sizes": [
        "2P 40A 30mA (Monofaze Hayat Koruma)",
        "4P 40A 30mA (Trifaze Hayat Koruma)",
        "4P 63A 300mA (Yangın Koruma)"
      ],
      "specs": {
        "standard": "TS EN 61008-1 / CE",
        "packaging": "Kutulu",
        "consumption": "Her daire panosunda yasal zorunluluk",
        "mixingRatio": "Pano ana girişine nötr geçişli montaj",
        "potLife": "Aylık test butonlu kalıcı emniyet",
        "logistics": "Balçova Mağaza & Urla Depo"
      },
      "accordions": [
        {
          "title": "Yasal ve Hayati Zorunluluk",
          "body": "Gövdeye kaçak oluştuğunda 30 milisaniyede elektriği keserek insanın kalp durması veya ölümcül şok geçirmesini fiziksel olarak imkansız kılar."
        }
      ]
    },
    {
      "id": "pano-klemens-notr-barasi",
      "name": "Dağıtım Panosu Nötr & Topraklama Barası ve Ray Klemensleri",
      "badge": "Pirinç Bara & Wago Klemens",
      "tag": "Pano Montaj Ekipmanı",
      "deptId": "legrandBreakersPanel",
      "category": "legrand-otomat",
      "thumb": "assets/elektrik/pano-klemens-barasi.jpg",
      "desc": "Sigorta panoları içinde nötr ve topraklama iletkenlerinin düzenli ve gevşemeden dağıtılmasını sağlayan izolatörlü pirinç baralar ve Wago yaylı klemensler.",
      "meta": [
        "Masif Pirinç Bara Gövdesi",
        "DIN Rayı Ayaklı İzolatör",
        "Yaylı Klemens Seçenekleri"
      ],
      "coverage": "Adet / Çubuk Satışı",
      "sizes": [
        "1 Metre Bakır Nötr Barası",
        "Yaylı Ray Klemens (2.5 - 6 mm²)",
        "Trifaze Müşterek Tarak Bara"
      ],
      "specs": {
        "standard": "TS EN 60998",
        "packaging": "Adet",
        "consumption": "Elektrik panoları",
        "mixingRatio": "DIN rayına geçme",
        "potLife": "Gevşemez vidalı/yaylı klemens",
        "logistics": "Balçova Mağaza Stok"
      },
      "accordions": [
        {
          "title": "Gevşeme Arkını Önleme",
          "body": "Vidalı gevşemelerden kaynaklanan pano yangını riskini ortadan kaldırır, sıfır dirençli topraklama sağlar."
        }
      ]
    },
    {
      "id": "cata-ct5286-led-panel",
      "name": "CATA CT-5286 30x30 Slim LED Panel (Clip-in & Sıva Altı)",
      "badge": "CATA Orijinal CT-5286",
      "tag": "CATA CT-5286 30×30",
      "deptId": "cataLightingPanel",
      "category": "cata-panel",
      "thumb": "assets/elektrik/cata-ct5286-panel.jpg",
      "desc": "Banyo asma tavanları, mutfaklar ve ofis clip-in metal tavan sistemleriyle %100 uyumlu, homojen ışık dağıtan alüminyum gövdeli CATA CT-5286 LED panel.",
      "meta": [
        "Ürün Kodu: CT-5286",
        "30×30 cm Clip-in Uyumlu",
        "Homojen Işık Dağılımı"
      ],
      "coverage": "Kutulu Armatür + Harici LED Driver Dahil",
      "sizes": [
        "CT-5286 6500K Beyaz Işık",
        "CT-5286 4000K Ilık Beyaz / Günışığı"
      ],
      "specs": {
        "standard": "CE / LVD / EMC / RoHS",
        "packaging": "Karton Kutu (Driver Dahil)",
        "consumption": "~1 armatür / 4-6 m² banyo alanı",
        "mixingRatio": "Asma tavan metal karkasına doğrudan oturtulur",
        "potLife": "25.000 Saat LED Ömrü",
        "logistics": "Balçova Mağaza Stoktan Teslim"
      },
      "accordions": [
        {
          "title": "Göz Yormayan Backlight Optik Difüzör",
          "body": "Özel opal difüzörü sayesinde LED diyotlarının noktacıklı görüntüsünü kırar, tavanda pürüzsüz ve parlama yapmayan aydınlık sağlar."
        },
        {
          "title": "Nemli Ortamlara Dayanıklı Alüminyum Çerçeve",
          "body": "Banyo buharından paslanmayan elektrostatik boyalı alüminyum kasası sararma ve deformasyon yapmaz."
        }
      ]
    },
    {
      "id": "lamparra-24w-kare-panel",
      "name": "Lámparra 24W 30x30 Kare LED Tavan Armatürü",
      "badge": "24W Yüksek Lümen · 350 ₺",
      "tag": "Lámparra 24W · 350 ₺",
      "deptId": "cataLightingPanel",
      "category": "cata-panel",
      "thumb": "assets/elektrik/lamparra-24w-panel.jpg",
      "desc": "Geniş mutfak, antre ve çalışma alanlarını yüksek ışık akısıyla aydınlatan, ultra verimli SMD LED çipli Lámparra 24W kare tavan paneli.",
      "meta": [
        "Raf Fiyatı: 350 ₺",
        "24 Watt Yüksek Güç",
        "1920 Lümen Işık Akısı"
      ],
      "coverage": "Kutulu Armatür (350 ₺)",
      "sizes": [
        "Lámparra 24W 30×30 Beyaz (350 ₺)",
        "Lámparra 24W 30×30 Günışığı (350 ₺)"
      ],
      "specs": {
        "standard": "CE / A++ Enerji Sınıfı",
        "packaging": "Kutulu Komple Set",
        "consumption": "Geniş hacimler için yüksek verim",
        "mixingRatio": "220V şebeke bağlantısı",
        "potLife": "30.000 Saat Çalışma Ömrü",
        "logistics": "Balçova Mağaza Rafından Teslim"
      },
      "accordions": [
        {
          "title": "Geleneksel Floresana Göre %80 Tasarruf",
          "body": "24W tüketimle eski tip 120W floresan armatürlerin parlaklığını vererek faturaları kalıcı şekilde düşürür."
        }
      ]
    },
    {
      "id": "cata-ct5214-siva-ustu-spot",
      "name": "CATA CT-5214 Sıva Üstü Yuvarlak & Kare LED Downlight Armatür",
      "badge": "Tavan Delmeden Sıva Üstü",
      "tag": "CATA CT-5214 Spot",
      "deptId": "cataLightingPanel",
      "category": "cata-panel",
      "thumb": "assets/elektrik/cata-ct5214-spot.jpg",
      "desc": "Tavanda asma tavan veya delik bulunmayan beton tavanlarda doğrudan sıva üstüne monte edilen estetik silindirik ve kare LED downlight armatür.",
      "meta": [
        "Model: CT-5214",
        "Sıva Üstü Kolay Montaj",
        "Slim Modern Tasarım"
      ],
      "coverage": "Kutulu Armatür + Montaj Sacı",
      "sizes": [
        "CT-5214 Yuvarlak 18W",
        "CT-5214 Kare 18W",
        "CT-5214 24W Geniş Panel"
      ],
      "specs": {
        "standard": "CE / IP20",
        "packaging": "Kutulu",
        "consumption": "Beton tavan aydınlatması",
        "mixingRatio": "Montaj sacı ile tavana vidalama",
        "potLife": "20.000 Saat",
        "logistics": "Stoktan Sevk"
      },
      "accordions": [
        {
          "title": "Tadilat Gerektirmeyen Sıva Üstü Pratiklik",
          "body": "Asma tavan yaptırmadan beton tavana 2 vidayla monte edilir; kablo girişini gizleyen özel arka hazneye sahiptir."
        }
      ]
    },
    {
      "id": "wall-led-3w-slim-spot",
      "name": "Wall Led 3W Slim Mini Yuvarlak Gömme Spot LED",
      "badge": "3W Ultra Slim Spot",
      "tag": "Wall Led 3W Slim",
      "deptId": "cataLightingPanel",
      "category": "cata-panel",
      "thumb": "assets/elektrik/wall-led-3w-spot.jpg",
      "desc": "Mobilya içleri, vestiyer, niş aydınlatmaları ve alçıpan gizli ışık bantları için minik çaplı, düşük tüketimli 3W gömme LED spot.",
      "meta": [
        "3 Watt Düşük Tüketim",
        "Mini Delik Çapı (~55-65 mm)",
        "Entegre Mini Driver"
      ],
      "coverage": "Adet Satışı",
      "sizes": [
        "3W Beyaz Işık (6500K)",
        "3W Günışığı (3200K)",
        "3W Kristal Çerçeveli Model"
      ],
      "specs": {
        "standard": "CE / RoHS",
        "packaging": "Kutulu",
        "consumption": "Dekoratif niş ve dolap aydınlatması",
        "mixingRatio": "Yaylı tırnaklarla alçıpan deliğine geçme",
        "potLife": "25.000 Saat",
        "logistics": "Balçova Mağaza Stok"
      },
      "accordions": [
        {
          "title": "Sıfır Isınma ile Güvenli Dolap İçi Kullanım",
          "body": "Isı yaymayan soğuk LED teknolojisi sayesinde ahşap vestiyer ve gardırop içlerinde yangın tehlikesi yaratmaz."
        }
      ]
    },
    {
      "id": "dogaled-es231-tbulb-20w",
      "name": "Doğaled ES-231 20W Yüksek Güçlü T-Bulb E27 LED Ampul",
      "badge": "Doğaled ES-231 · 20W",
      "tag": "Doğaled ES-231 T-Bulb",
      "deptId": "bulbsLampsPanel",
      "category": "led-ampul",
      "thumb": "assets/elektrik/dogaled-es231-tbulb.jpg",
      "desc": "Klasik armatürlerin içine sığmayan geniş alanlar, atölye, depo, balkon ve bahçe aydınlatmasında projektör etkisi yaratan silindirik T-Bulb LED ampul.",
      "meta": [
        "Model: ES-231 (20W)",
        "E27 Standart Vidalı Duy",
        "Geniş Açılı T-Tipi Difüzör"
      ],
      "coverage": "Kutulu Adet",
      "sizes": [
        "ES-231 20W Beyaz Işık E27",
        "ES-231 20W Günışığı E27"
      ],
      "specs": {
        "standard": "CE / A+ Enerji",
        "packaging": "Orijinal Kutu",
        "consumption": "Geniş mekan aydınlatması",
        "mixingRatio": "E27 duya çevirerek montaj",
        "potLife": "25.000 Saat Ömür",
        "logistics": "Balçova Mağaza Stok"
      },
      "accordions": [
        {
          "title": "Geniş Yayılımlı Işık Açısı",
          "body": "T-Bulb silindirik difüzörü ışığı sadece aşağı değil 270 derece yanlara da yayarak odadaki gölgelenmeleri ortadan kaldırır."
        }
      ]
    },
    {
      "id": "noas-9w-led-ampul",
      "name": "NOAS 9W E27 Tasarruflu LED Ampul",
      "badge": "A+ Enerji Tasarrufu · 50 ₺",
      "tag": "NOAS 9W · 50 ₺",
      "deptId": "bulbsLampsPanel",
      "category": "led-ampul",
      "thumb": "assets/elektrik/noas-9w-ampul.jpg",
      "desc": "Evdeki tüm avize ve apliklerde kullanılan, 60W akkor ampul gücünü sadece 9W elektrik tüketerek üreten bütçe dostu dayanıklı NOAS LED ampul.",
      "meta": [
        "Raf Fiyatı: 50 ₺",
        "9 Watt Tüketim · E27 Duy",
        "806 Lümen Işık"
      ],
      "coverage": "Kutulu Adet (50 ₺)",
      "sizes": [
        "NOAS 9W Beyaz Işık (50 ₺)",
        "NOAS 9W Günışığı (50 ₺)"
      ],
      "specs": {
        "standard": "CE / RoHS",
        "packaging": "Karton Kutu (50 ₺)",
        "consumption": "Genel ev aydınlatması",
        "mixingRatio": "E27 vidalı duy",
        "potLife": "15.000 Saat",
        "logistics": "Balçova Mağaza Rafından Teslim"
      },
      "accordions": [
        {
          "title": "Anında %100 Parlaklık",
          "body": "Eski tasarruflu ampuller gibi ısınma süresi beklemez; anahtara basıldığı anda tam parlaklıkta yanar."
        }
      ]
    },
    {
      "id": "philips-corepro-led-ampul",
      "name": "Philips CorePro LED E27 Standart Ampul Grubu (9W / 11W / 13W)",
      "badge": "Philips EyeComfort Standardı",
      "tag": "Philips CorePro LED",
      "deptId": "bulbsLampsPanel",
      "category": "led-ampul",
      "thumb": "assets/elektrik/philips-corepro-ampul.jpg",
      "desc": "Gözü yormayan titreşimsiz (flicker-free) Philips EyeComfort sertifikalı, yüksek renksel geriverimli (CRI>80) premium LED ampul serisi.",
      "meta": [
        "Philips Kalite Güvencesi",
        "Gözü Yormayan Titreşimsiz Işık",
        "9W / 11W / 13W Seçenekleri"
      ],
      "coverage": "Kutulu Adet",
      "sizes": [
        "Philips 9W E27 (60W Eşdeğeri)",
        "Philips 11W E27 (75W Eşdeğeri)",
        "Philips 13W E27 (100W Eşdeğeri)"
      ],
      "specs": {
        "standard": "IEC 62560 / EyeComfort",
        "packaging": "Orijinal Philips Kutu",
        "consumption": "Çalışma odası, salon ve çocuk odası",
        "mixingRatio": "E27 duy",
        "potLife": "15.000 Saat / 50.000 Aç-Kapa",
        "logistics": "Balçova Mağaza Stok"
      },
      "accordions": [
        {
          "title": "Görünmez Titreşimi (Flicker) Engelleyen Sürücü",
          "body": "Kamerada veya gözde hissedilmeyen mikro titreşimleri sıfırlayarak baş ağrısı ve göz yorgunluğu oluşmasını önler."
        }
      ]
    },
    {
      "id": "cata-ct101-kablosuz-zil",
      "name": "CATA CT-101 Dijital Kablosuz Kapı Zili",
      "badge": "100m Çekim Alanı · CATA CT-101",
      "tag": "CATA CT-101 Zil",
      "deptId": "bulbsLampsPanel",
      "category": "kablo-krose",
      "thumb": "assets/elektrik/cata-ct101-zil.jpg",
      "desc": "Kablo çekme derdi olmadan kapı dışına yapıştırılan buton ile evin içine prize takılan veya pille çalışan 32 melodili kablosuz kapı zili seti.",
      "meta": [
        "Model: CT-101",
        "Açık Alanda 100 Metre Çekim",
        "32 Farklı Melodi & Ses Ayarı"
      ],
      "coverage": "Blister Ambalaj Tam Set (Buton + Zil Ünitesi)",
      "sizes": [
        "CT-101 Kablosuz Zil Seti (Buton + Zil Ünitesi)"
      ],
      "specs": {
        "standard": "CE / Kablosuz RF Standardı",
        "packaging": "Blister Paket",
        "consumption": "Daire ve villa dış kapı girişleri",
        "mixingRatio": "Çift taraflı bant veya vida ile montaj",
        "potLife": "Uzun pil ömürlü verici",
        "logistics": "Balçova Mağaza Stoktan Teslim"
      },
      "accordions": [
        {
          "title": "Tesisat Kırmadan 2 Dakikada Montaj",
          "body": "Kapıda zil kablosu bulunmayan veya mevcut kablosu kopmuş dairelerde kırma dökme yapmadan anında zil sahibi olmayı sağlar."
        }
      ]
    },
    {
      "id": "viko-coklu-grup-priz",
      "name": "VİKO Multi-let 3'lü, 4'lü ve 6'lı Kordonlu Topraklı Grup Priz",
      "badge": "VİKO Multi-let Güvenlik",
      "tag": "VİKO Multi-let Grup Priz",
      "deptId": "plugsCablesPanel",
      "category": "grup-priz",
      "thumb": "assets/elektrik/viko-multi-let.jpg",
      "desc": "Televizyon ünitesi, çalışma masası ve bilgisayar sistemlerinde kablo karmaşasını çözen, çocuk korumalı ve duvara asılabilir VİKO Multi-let grup priz.",
      "meta": [
        "3'lü, 4'lü, 6'lı Seçenekler",
        "3x1.5 mm² TSE Bakır Kablo",
        "Işıklı Anahtar Seçeneği"
      ],
      "coverage": "Paketli Ürün",
      "sizes": [
        "3'lü Grup Priz (2 Metre Kablolu)",
        "4'lü Grup Priz (2 Metre Kablolu)",
        "6'lı Anahtarlı Grup Priz (2 Metre)",
        "3'lü Kordonsuz Klemensli Priz"
      ],
      "specs": {
        "standard": "TS IEC 60884-1",
        "packaging": "Özel Askılı Ambalaj",
        "consumption": "Elektronik cihaz grupları",
        "mixingRatio": "Fişe tak-çalıştır",
        "potLife": "Aşırı ısınmaya dirençli iç bara",
        "logistics": "Balçova Mağaza Stok"
      },
      "accordions": [
        {
          "title": "Asılabilir Arka Kanal Tasarımı",
          "body": "Arkasındaki montaj tırnakları sayesinde masanın altına veya duvara asılarak yerdeki kablo kalabalığını ortadan kaldırır."
        }
      ]
    },
    {
      "id": "viko-seyyar-erkek-disi-fis",
      "name": "VİKO Orijinal Bakalit / Kauçuk Erkek ve Dişi Seyyar Fiş",
      "badge": "Kırılmaz Gövde · 50 ₺",
      "tag": "VİKO Fiş · 50 ₺",
      "deptId": "plugsCablesPanel",
      "category": "grup-priz",
      "thumb": "assets/elektrik/viko-seyyar-fis.jpg",
      "desc": "Uzatma kablosu hazırlama veya kırılan cihaz fişlerini yenilemek için sağlam vidalı klemensli, kablo gergi kelepçeli VİKO seyyar fişler.",
      "meta": [
        "Raf Fiyatı: 50 ₺",
        "16A 250V~ Topraklı",
        "Kırılmaz Gövde ve Kablo Kelepçesi"
      ],
      "coverage": "Adet Satışı (50 ₺)",
      "sizes": [
        "VİKO Topraklı Erkek Fiş (50 ₺)",
        "VİKO Topraklı Dişi Fiş (50 ₺)",
        "VİKO Düz / L Tipi Erkek Fiş (50 ₺)"
      ],
      "specs": {
        "standard": "TS IEC 60884-1",
        "packaging": "Kutulu / Adet",
        "consumption": "Seyyar uzatma kabloları",
        "mixingRatio": "Vidalı kablo montajı",
        "potLife": "Darbeye dayanıklı gövde",
        "logistics": "Balçova Mağaza Rafından Teslim"
      },
      "accordions": [
        {
          "title": "Kabloyu Bırakmayan Gergi Kelepçesi",
          "body": "Fiş kablodan çekilerek prizden çıkarıldığında tellerin klemesten kopmasını önleyen sağlam iç sıkma kelepçesine sahiptir."
        }
      ]
    },
    {
      "id": "elbi-arapuar-anahtar",
      "name": "Elbi Kordon Arası Aç-Kapa Ara Puar Anahtar",
      "badge": "Kordon Arası Abajur Anahtarı",
      "tag": "Elbi Ara Puar",
      "deptId": "plugsCablesPanel",
      "category": "grup-priz",
      "thumb": "assets/elektrik/elbi-arapuar.jpg",
      "desc": "Lambader, abajur ve masa lambalarının kablosu üzerine monte edilerek el altında kolay açma-kapama sağlayan Elbi ara puar anahtar.",
      "meta": [
        "2A 250V~ Güvenlik",
        "Ergonomik Basmalı Buton",
        "Kompakt Tasarım"
      ],
      "coverage": "Adet Satışı",
      "sizes": [
        "Elbi Beyaz Ara Puar",
        "Elbi Siyah Ara Puar"
      ],
      "specs": {
        "standard": "TS EN 61058-1",
        "packaging": "Poşetli",
        "consumption": "Aydınlatma kabloları",
        "mixingRatio": "Kablo arasına vidalı montaj",
        "potLife": "Uzun ömürlü yaylı kontak",
        "logistics": "Balçova Mağaza Stok"
      },
      "accordions": [
        {
          "title": "Pratik ve Güvenli Kablo Bağlantısı",
          "body": "İki kutuplu kablonun tek damarını keserek araya bağlamanız yeterlidir, gövde kilitli vidasıyla emniyetle kapanır."
        }
      ]
    },
    {
      "id": "mutlusan-civili-krose-1-8",
      "name": "Mutlusan Beton Çivili Plastik Kablo Kroşesi (No: 1 – No: 8)",
      "badge": "Sertleştirilmiş Çelik Çivi · 5 ₺",
      "tag": "Mutlusan Kroşe · 5 ₺",
      "deptId": "fasteningInstallPanel",
      "category": "kablo-krose",
      "thumb": "assets/elektrik/mutlusan-civili-krose.jpg",
      "desc": "Antigron kabloları, kordonları ve data kablolarını beton, sıva veya ahşap yüzeylere sabitleyen sertleştirilmiş çelik çivili Mutlusan kroşe serisi.",
      "meta": [
        "Raf Fiyatı: Adet 5 ₺ (100'lü Kutu)",
        "No: 1'den No: 8'e Tüm Boylar",
        "Kırılmaz Polietilen Gövde"
      ],
      "coverage": "100 Adetlik Kutu (5 ₺ / Adet)",
      "sizes": [
        "No: 1 Kroşe (100'lü Kutu)",
        "No: 2 Kroşe (100'lü Kutu)",
        "No: 3 Kroşe (100'lü Kutu)",
        "No: 4 Kroşe (100'lü Kutu)",
        "No: 5 Kroşe (100'lü Kutu)",
        "No: 6 Kroşe (100'lü Kutu)",
        "No: 7 Kroşe (100'lü Kutu)",
        "No: 8 Kroşe (100'lü Kutu)"
      ],
      "specs": {
        "standard": "TSE Standartlarında Çelik Çivi",
        "packaging": "100 Adet Kutu",
        "consumption": "Kablo metresi başına ~3-4 adet kroşe",
        "mixingRatio": "Çekiç ile doğrudan betona çakma",
        "potLife": "Bükülmeyen tavlı çelik çivi",
        "logistics": "Balçova Mağaza Rafından Teslim"
      },
      "accordions": [
        {
          "title": "Betonda Eğilmeyen Sert Çelik Çivi",
          "body": "Sıva altı veya beton zeminlerde çakılırken yamulmayan, yüksek karbonlu özel sertleştirilmiş çivi içerir."
        }
      ]
    },
    {
      "id": "isildar-civili-krose-no6",
      "name": "Işıldar No: 6 Beton Çivili Kablo Kroşesi (100 Adet)",
      "badge": "Işıldar Kalite No: 6",
      "tag": "Işıldar No: 6 Kroşe",
      "deptId": "fasteningInstallPanel",
      "category": "kablo-krose",
      "thumb": "assets/elektrik/isildar-krose-no6.jpg",
      "desc": "3x1.5 mm² ve 3x2.5 mm² antigron kabloların süpürgelik veya tavan köşelerinde sarkmadan düz hat halinde sabitlenmesini sağlayan No: 6 kroşe.",
      "meta": [
        "No: 6 Standart Boy",
        "100 Adet Kutu",
        "Beyaz Darbe Dayanımlı Plastik"
      ],
      "coverage": "100 Adet Kutu",
      "sizes": [
        "No: 6 Kroşe (100'lü Kutu)"
      ],
      "specs": {
        "standard": "TSE Belgeli",
        "packaging": "Kutu",
        "consumption": "3x1.5 ve 3x2.5 kablolar",
        "mixingRatio": "Çekiç ile sabitleme",
        "potLife": "Paslanmaz çivi",
        "logistics": "Balçova Mağaza Stok"
      },
      "accordions": [
        {
          "title": "Kablo Kılıfını Ezmeyen Kavis",
          "body": "Gövde kavisi kabloyu sıkıca tutarken dış yalıtım kılıfını ezmez ve izolasyon çatlaklarını önler."
        }
      ]
    },
    {
      "id": "elbi-sigorta-kutusu-siva-ustu",
      "name": "Elbi Sıva Üstü Sigorta Kutusu (Kuleli DIN Ray Montaj)",
      "badge": "Alev İletmez Gövde · 50 ₺",
      "tag": "Elbi Kutu · 50 ₺",
      "deptId": "fasteningInstallPanel",
      "category": "kablo-krose",
      "thumb": "assets/elektrik/elbi-sigorta-kutusu.jpg",
      "desc": "Klima, şofben veya atölye makinelerinin yanına tekli veya ikili sigorta koymak için kullanılan kuleli sıva üstü mini sigorta kutusu.",
      "meta": [
        "Raf Fiyatı: 50 ₺",
        "Sıva Üstü DIN Raylı",
        "Alev İletmez Polikarbon"
      ],
      "coverage": "Kutulu Adet (50 ₺)",
      "sizes": [
        "Elbi 1-2'li Sıva Üstü Sigorta Kutusu (50 ₺)",
        "Elbi 3-4'lü Sigorta Kutusu",
        "VİKO 6'lı Sigorta Kutusu (Sıva Altı/Üstü)"
      ],
      "specs": {
        "standard": "TS EN 60670-24",
        "packaging": "Kutulu",
        "consumption": "Harici klima ve kombi sigortaları",
        "mixingRatio": "Duvara vidalama",
        "potLife": "650°C Kızaran Tel Dayanımı",
        "logistics": "Balçova Mağaza Rafından Teslim"
      },
      "accordions": [
        {
          "title": "Kompakt ve Güvenli Koruma",
          "body": "Sigortanın açıkta kalmasını önler, temas tehlikesini ortadan kaldırarak cihaz yanına güvenli şalter noktası kurar."
        }
      ]
    },
    {
      "id": "cata-plastik-kablo-bagi",
      "name": "CATA Kendinden Kilitli Naylon Plastik Kablo Bağları (Cırt Kelepçe)",
      "badge": "UV & Kopma Dirençli (100'lü)",
      "tag": "CATA Kablo Bağı",
      "deptId": "fasteningInstallPanel",
      "category": "kablo-krose",
      "thumb": "assets/elektrik/cata-kablo-bagi.jpg",
      "desc": "Kablo demetlerini toplamak, pano içi düzeni sağlamak ve boruları sabitlemek için yüksek çekme kuvvetine sahip kendinden kilitli CATA kablo bağları.",
      "meta": [
        "100 Adetlik Paket",
        "Saf Naylon 6.6 Malzeme",
        "Geri Açılmaz Kilit Dili"
      ],
      "coverage": "100 Adetlik Torba",
      "sizes": [
        "2.5 × 100 mm (100 Adet)",
        "3.6 × 150 mm (100 Adet)",
        "4.8 × 250 mm (100 Adet)",
        "4.8 × 300 mm (100 Adet)"
      ],
      "specs": {
        "standard": "UL 94V-2 / CE",
        "packaging": "100 Adet Poşet",
        "consumption": "Pano içi ve kablo tavası bağlama",
        "mixingRatio": "El veya kablo bağı pensesi ile sıkma",
        "potLife": "Güneş UV ışınlarına dirençli",
        "logistics": "Balçova Mağaza Stok"
      },
      "accordions": [
        {
          "title": "Kopmayan Saf Poliamid 6.6",
          "body": "Geri dönüştürülmüş plastik içermez; kışın soğukta çıtlayıp kırılmaz, yüksek çekme yüklerine dayanır."
        }
      ]
    },
    {
      "id": "pvc-izole-elektrik-bandi",
      "name": "Alev Geciktirici Renkli PVC İzole Elektrik Bandı",
      "badge": "600V Yalıtım Güvenliği",
      "tag": "PVC İzole Bant",
      "deptId": "fasteningInstallPanel",
      "category": "kablo-krose",
      "thumb": "assets/elektrik/panasonic-izole-bant.jpg",
      "desc": "Kablo ek yerlerinde elektriksel yalıtım sağlamak ve fazları renklerine göre kodlamak için alev iletmez güçlü yapışkanlı PVC izole bant.",
      "meta": [
        "600 Volt İzolasyon Direnci",
        "Alev İletmez (Flame Retardant)",
        "Esnek Uzama Özelliği"
      ],
      "coverage": "Rulo Satışı",
      "sizes": [
        "Siyah İzole Bant (10 Metre)",
        "Kırmızı / Mavi / Sarı-Yeşil Faz Bandı"
      ],
      "specs": {
        "standard": "TS EN 60454-3-1",
        "packaging": "10'lu Paket",
        "consumption": "Kablo ek ve tamir noktaları",
        "mixingRatio": "Gerdirerek spiral sarım",
        "potLife": "80°C Isı Dayanımı",
        "logistics": "Balçova Mağaza Stok"
      },
      "accordions": [
        {
          "title": "Zamanla Kurumayan Güçlü Yapışkan",
          "body": "Özel yapışkan formülü sıcakta akma yapmaz, kışın kuruyup kablo üzerinden kendiliğinden açılmaz."
        }
      ]
    },
    {
      "id": "spiral-alev-iletmez-boru",
      "name": "Halojensiz Alev İletmez Plastik Spiral Elektrik Tesisat Borusu",
      "badge": "TS EN 61386-22 Yanmaz Boru",
      "tag": "Spiral Tesisat Borusu",
      "deptId": "fasteningInstallPanel",
      "category": "kablo-krose",
      "thumb": "assets/elektrik/spiral-alev-iletmez-boru.jpg",
      "desc": "Alçıpan tavan aralarında, şap altında ve kolon geçişlerinde kabloları mekanik darbeden ve yangından koruyan esnek alev iletmez spiral boru.",
      "meta": [
        "Alev İletmez Halogen-Free",
        "Ø14, Ø16, Ø20 mm Çaplar",
        "Esnek Bükülebilir Yapı"
      ],
      "coverage": "50 ve 100 Metre Kangal",
      "sizes": [
        "Ø14 mm Spiral Boru (100 Metre Kangal)",
        "Ø16 mm Spiral Boru (100 Metre Kangal)",
        "Ø20 mm Spiral Boru (50 Metre Kangal)"
      ],
      "specs": {
        "standard": "TS EN 61386-22",
        "packaging": "Kangal Rulo",
        "consumption": "Alçıpan asma tavan ve duvar içi tesisat",
        "mixingRatio": "Sustayla kablo çekme",
        "potLife": "Kırılmaz elastik koruma",
        "logistics": "Balçova & Urla Depo Sevk"
      },
      "accordions": [
        {
          "title": "Yangında Zehirli Gaz Çıkarmayan Yapı",
          "body": "Halojensiz bileşimi sayesinde yangın anında klor ve zehirli asit dumanı salmayarak can güvenliğini korur."
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
    vikoModularPanel: document.getElementById("vikoModularPanel"),
    legrandBreakersPanel: document.getElementById("legrandBreakersPanel"),
    cataLightingPanel: document.getElementById("cataLightingPanel"),
    bulbsLampsPanel: document.getElementById("bulbsLampsPanel"),
    plugsCablesPanel: document.getElementById("plugsCablesPanel"),
    fasteningInstallPanel: document.getElementById("fasteningInstallPanel")
  };

  var currentActiveTab = "vikoModularPanel";
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
    var p = ELEKTRIK_PRODUCTS_DATA.find(function(item) { return item.id === productId; });
    if (!p) return;
    currentProduct = p;

    if (modalProductTitle) modalProductTitle.textContent = p.name;
    if (modalProductEyebrow) modalProductEyebrow.textContent = p.badge ? ("PERVAN · " + p.badge) : "PERVAN · ELEKTRİK & AYDINLATMA";
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
    if (modalSpecStandard) modalSpecStandard.textContent = p.badge || "TSE / CE Onaylı";
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
    var rawText = "Merhaba, Elektrik & Aydınlatma kataloğunuzdan '" + currentProduct.name + "' (" + selectedSize + ") ürünü için Balçova/Urla stok durumu ve fiyat teklifi öğrenmek istiyorum.";
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
    return d ? d.short : "Elektrik";
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
    if (spotlightCount) spotlightCount.textContent = ELEKTRIK_PRODUCTS_DATA.length + " Ürün Yayında";
    if (spotlightResults) {
      spotlightResults.innerHTML = '<div class="pv-spotlight-hint">' +
        '<span>İpucu: VİKO Karre, Legrand 403204, CATA CT-5286, Lámparra panel, NOAS ampul veya Mutlusan kroşe yazarak arayabilirsiniz.</span>' +
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

    ELEKTRIK_PRODUCTS_DATA.forEach(function(prod) {
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
      var waText = encodeURIComponent("Merhaba, Elektrik & Aydınlatma kataloğunuzda '" + rawQuery + "' aradım ancak bulamadım. Bu ürün hakkında stok ve fiyat bilgisi alabilir miyim?");
      spotlightResults.innerHTML = '<div class="pv-spotlight-empty-box">' +
        '<div class="pv-spotlight-empty-title">Eşleşen ürün bulunamadı</div>' +
        '<p class="pv-spotlight-empty-desc">Aradığınız ürün standart katalog dışı veya özel elektrik siparişi olabilir. Balçova ve Urla uzmanlarımıza doğrudan sorabilirsiniz:</p>' +
        '<a href="https://wa.me/905323844497?text=' + waText + '" target="_blank" rel="noopener" class="pv-btn-primary" style="max-width: 320px; font-size: 12px; padding: 11px 18px; min-height: 42px;">' +
        'WhatsApp ile Elektrik Danış' +
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
        var p = ELEKTRIK_PRODUCTS_DATA.find(function(it) { return it.id === pid; });
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
  renderDeptDrawer("vikoModularPanel");
  syncMobileFilterRail("vikoModularPanel");
})();
