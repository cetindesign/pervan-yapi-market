/* ARCHITECTURAL JAVASCRIPT ENGINE FOR TOOLS & CHEMICALS CATALOG */
(function() {
  "use strict";

  // INJECTED DATA
  var TOOLS_PRODUCTS_DATA = [
  {
    "id": "bostik-np1-pu-mastik-gri-beyaz",
    "name": "Bostik NP1 Profesyonel Poliüretan Mastik (415 g / 290 ml)",
    "badge": "Yüksek Modüllü Yapı Mastiği",
    "tag": "Bostik NP1 · Gri / Beyaz",
    "deptId": "toolsSealantsPanel",
    "category": "bostik-pu",
    "thumb": "assets/el-aletleri/bostik-np1-pu-mastik-gri-beyaz.jpg",
    "desc": "Prefabrik yapı elemanları, bina genleşme derzleri, parapet duvarları ve pencere kasalarında kalıcı elastikiyet sağlayan, hava nemiyle kürlenen yüksek modüllü poliüretan mastik.",
    "meta": [
      "415 g / 290 ml Kartuş",
      "Gri ve Beyaz Renk Seçenekleri",
      "ISO 11600 F 25 LM"
    ],
    "coverage": "10×10 mm derzde kartuş başına yaklaşık 3 metre dolgu",
    "sizes": [
      "Kartuş (290 ml) — Gri",
      "Kartuş (290 ml) — Beyaz",
      "Sosis (600 ml) — Gri",
      "1 Koli (12 Kartuş)",
      "1 Koli (20 Sosis)"
    ],
    "specs": {
      "standard": "ISO 11600 Tip F Sınıf 25 LM / CE",
      "packaging": "290 ml Alüminyum Kartuş / 600 ml Sosis",
      "consumption": "Derz genişlik ve derinliğine göre hesaplanır",
      "mixingRatio": "Standart veya sosis mastik tabancası ile",
      "potLife": "Kabuk bağlama: 60-90 dk / Kürlenme: 2-3 mm/gün",
      "logistics": "Balçova Showroom & Urla Depo Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "UV Işınlarına ve Dış Hava Şartlarına Direnç",
        "body": "Güneş ışınlarından ve aşırı sıcak-soğuk döngülerinden etkilenmez; çatlama, büzüşme veya akma yapmadan yapının doğal esnemesine %25 oranında uyum sağlar."
      },
      {
        "title": "Üzeri Boyanabilme Özelliği",
        "body": "Kürlendikten sonra tüm su ve solvent bazlı dış cephe boyaları ile boyanabilir, cephede estetik bütünlüğü korur."
      }
    ]
  },
  {
    "id": "dayson-extra-pu-mastik-350tl",
    "name": "Dayson Extra Poliüretan Mastik & Yapıştırıcı (280 ml)",
    "badge": "Oto & Marin & İnşaat Mastiği",
    "tag": "Dayson Extra · 350 ₺",
    "deptId": "toolsSealantsPanel",
    "category": "dayson-pu",
    "thumb": "assets/el-aletleri/dayson-extra-pu-mastik-350tl.jpg",
    "desc": "Oto karoseri, tekne donanımları, saç metal birleşimleri ve ağır inşaat dilatasyonlarında mükemmel yapışma ve sızdırmazlık gücü sunan orijinal Dayson Extra poliüretan mastik.",
    "meta": [
      "Raf Fiyatı: 350 ₺",
      "Siyah, Beyaz, Gri Renkler",
      "Ağır Hizmet Poliüretan"
    ],
    "coverage": "Metal, sac, polyester, beton ve ahşap yüzeyler",
    "sizes": [
      "Tek Kartuş (Beyaz) — 350 ₺",
      "Tek Kartuş (Siyah) — 350 ₺",
      "Tek Kartuş (Gri) — 350 ₺",
      "1 Koli (24 Kartuş) Toptan"
    ],
    "specs": {
      "standard": "DIN 53504 / ASTM D412",
      "packaging": "280 ml Alüminyum Kartuş (Koli: 24 Adet)",
      "consumption": "Yapıştırma şeritleri veya sızdırmazlık derzi",
      "mixingRatio": "Profesyonel kovanlı mastik tabancası",
      "potLife": "Kabuk süresi: ~45 dk / Shore A Sertlik: 45-50",
      "logistics": "Balçova Mağaza Raf Teslim & Urla Depo"
    },
    "accordions": [
      {
        "title": "Titreşime ve Darbelere Dayanıklı Esnek Bağ",
        "body": "Titreşimli saç panellerde, tekne gövdelerinde ve araç kasalarında kaynak dikişi yerine kullanılabilir; metaller arasında korozyon köprüsü oluşturmaz."
      }
    ]
  },
  {
    "id": "soma-fix-pu-mastik-tabanca-tipi",
    "name": "Soma Fix Profesyonel Poliüretan Mastik (280 ml)",
    "badge": "Hava Şartlarına Dayanıklı PU",
    "tag": "Soma Fix PU · Kartuş",
    "deptId": "toolsSealantsPanel",
    "category": "diger-pu",
    "thumb": "assets/el-aletleri/soma-fix-pu-mastik-tabanca-tipi.jpg",
    "desc": "Bina cephe panelleri, çatı dereleri, sac saçak birleşimleri ve kapı pencere kasaları etrafında ekonomik ve yüksek elastikiyetli sızdırmazlık sağlayan Soma Fix PU mastik.",
    "meta": [
      "280 ml Kartuş",
      "Gri / Beyaz / Siyah",
      "Tüm Yapı Malzemelerine Uyumlu"
    ],
    "coverage": "Dış cephe derzlerinde metre bazlı tüketim",
    "sizes": [
      "Tek Kartuş (Gri)",
      "Tek Kartuş (Beyaz)",
      "Tek Kartuş (Siyah)",
      "1 Koli (24 Adet)"
    ],
    "specs": {
      "standard": "TS EN ISO 11600",
      "packaging": "280 ml Kartuş",
      "consumption": "Derz kesitine göre",
      "mixingRatio": "Standart kartuş tabancası",
      "potLife": "Elastik kürlenme",
      "logistics": "Balçova & Urla Stok"
    },
    "accordions": [
      {
        "title": "Gözeneksiz Yüzeylerde Yüksek Tutunma",
        "body": "Astar gerektirmeden alüminyum, eloksallı metal, PVC, mermer ve beton yüzeylere güçlü bir aderansla yapışır."
      }
    ]
  },
  {
    "id": "selsil-pu-mastik-dilatasyon-dolgusu",
    "name": "Selsil Poliüretan Yapı & İnşaat Mastiği (280 ml)",
    "badge": "Yüksek Mukavemetli Formül",
    "tag": "Selsil PU Mastik",
    "deptId": "toolsSealantsPanel",
    "category": "diger-pu",
    "thumb": "assets/el-aletleri/selsil-pu-mastik-dilatasyon-dolgusu.jpg",
    "desc": "Döşeme betonları, su depoları, teras birleşimleri ve dikey yapı derzlerinde kullanılan tek komponentli, tiksotropik poliüretan derz dolgu mastiği.",
    "meta": [
      "280 ml Kartuş",
      "Sarkma Yapmayan Tiksotropik Yapı",
      "Gri ve Beyaz"
    ],
    "coverage": "Dikey ve yatay dilatasyon derzleri",
    "sizes": [
      "Tek Kartuş (Gri)",
      "Tek Kartuş (Beyaz)",
      "1 Koli (24 Adet)"
    ],
    "specs": {
      "standard": "ISO 11600 / CE",
      "packaging": "Kartuş",
      "consumption": "Derz metrajına göre",
      "mixingRatio": "Silikon tabancası ile",
      "potLife": "Nem ile kürlenme",
      "logistics": "Balçova Showroom & Urla Depo"
    },
    "accordions": [
      {
        "title": "Dikey Derzlerde Akma Yapmaz",
        "body": "Tiksotropik formülasyonu sayesinde 2 cm genişliğe kadar olan dikey cephe derzlerinde aşağı doğru akma veya bombelenme yapmaz."
      }
    ]
  },
  {
    "id": "soma-fix-silikonize-akrilik-mastik",
    "name": "Soma Fix Silikonize Akrilik Mastik (500 g)",
    "badge": "İç Mekan Boyanabilir Mastik",
    "tag": "Akrilik Mastik · 500g",
    "deptId": "toolsSealantsPanel",
    "category": "diger-pu",
    "thumb": "assets/el-aletleri/soma-fix-silikonize-akrilik-mastik.jpg",
    "desc": "Kapı ve pencere kasaları, süpürgelik kenarları, alçıpan köşe birleşimleri ve tavan kartonpiyerlerinde çatlamaları kapatan, boyanabilir silikon katkılı akrilik mastik.",
    "meta": [
      "500 g Büyük Gramaj",
      "Silikon Katkılı Yüksek Elastikiyet",
      "Su Bazlı ve Kokusuz"
    ],
    "coverage": "Kartuş başına yaklaşık 10-12 metre süpürgelik veya kasa derzi",
    "sizes": [
      "Tek Kartuş (500 g) — Beyaz",
      "1 Koli (24 Kartuş)",
      "Koli Bazı Toptan"
    ],
    "specs": {
      "standard": "TS EN ISO 11600 / CE",
      "packaging": "500 g Plastik Kartuş",
      "consumption": "İç mekan süpürgelik ve pervaz hatları",
      "mixingRatio": "Kartuş tabancası ile uygulama",
      "potLife": "Kuruma: 24 saat / Üzeri zımparalanabilir ve boyanabilir",
      "logistics": "Balçova Mağaza & Urla Depo"
    },
    "accordions": [
      {
        "title": "Boya Çatlağını Kalıcı Olarak Keser",
        "body": "Alçı ile boya arasındaki kılcal gerilme çatlaklarını elastik gövdesiyle absorbe eder; sararma ve boya kusması yapmaz."
      }
    ]
  },
  {
    "id": "bostik-007-high-tack-hibrit",
    "name": "Bostik 007 High Tack Hibrit Montaj Yapıştırıcısı (290 ml)",
    "badge": "Anında 350 kg/m² Tutunma",
    "tag": "Bostik 007 · 350 ₺",
    "deptId": "toolsSiliconesPanel",
    "category": "high-tack",
    "thumb": "assets/el-aletleri/bostik-007-high-tack-hibrit.jpg",
    "desc": "Vidasız ve çivisiz montaj imkanı sağlayan, ağır taş kaplamaları, aynaları, süpürgelikleri ve metal profilleri anında yüzeye kilitleyen ultra yüksek ilk tutunmalı hibrit polimer yapıştırıcı.",
    "meta": [
      "Raf Fiyatı: 350 ₺",
      "350 kg/m² İlk Tutunma",
      "Solventsiz & Kokusuz"
    ],
    "coverage": "Noktasal veya çizgisel şerit uygulaması",
    "sizes": [
      "Tek Kartuş (290 ml) — 350 ₺",
      "1 Koli (12 Kartuş)",
      "Toptan Koli"
    ],
    "specs": {
      "standard": "EN 15651-1 / EMICODE EC1 Plus",
      "packaging": "290 ml Kartuş (V Kesik Özel Nozul Dahil)",
      "consumption": "Parça ağırlığına göre 10-15 cm aralıklı çizgiler",
      "mixingRatio": "Yüksek basınçlı mastik tabancası",
      "potLife": "Anında mekanik kavrama / 24 saat tam kemikleşme",
      "logistics": "Balçova Mağaza Stok & Urla Depo Sevk"
    },
    "accordions": [
      {
        "title": "Ağır Parçalarda Destek Çıtası Gerektirmez",
        "body": "Duvarda dikey asılan ağır ayna, mermer veya ahşap paneller aşağı kaymaz; geçici sabitleme bandı veya destek çıtası kullanma ihtiyacını ortadan kaldırır."
      },
      {
        "title": "Nemli Yüzeylerde ve Sualtında Bile Yapışma",
        "body": "Geleneksel silikonların tutmadığı nemli beton, ıslak taş ve hatta su altı zeminlerde mükemmel moleküler bağ kurar."
      }
    ]
  },
  {
    "id": "wurth-dusakabin-banyo-silikonu-350tl",
    "name": "Würth Duşakabin & Sıhhi Tesisat Silikonu (310 ml)",
    "badge": "Küf & Mantar Önleyici Fungisit",
    "tag": "Würth Banyo · 350 ₺",
    "deptId": "toolsSiliconesPanel",
    "category": "dus-silikonu",
    "thumb": "assets/el-aletleri/wurth-dusakabin-banyo-silikonu-350tl.jpg",
    "desc": "Duşakabin profilleri, küvet kenarları, lavabo ve evye evyelerinde sürekli ıslak ortamda küf ve siyah leke oluşumunu engelleyen saf asetat bazlı Würth sıhhi tesisat silikonu.",
    "meta": [
      "Raf Fiyatı: 350 ₺",
      "Fungisit Katkılı (Küflenmez)",
      "Şeffaf ve Beyaz Renk"
    ],
    "coverage": "Banyo ve mutfak ıslak hacim sızdırmazlık hatları",
    "sizes": [
      "Tek Kartuş (Şeffaf) — 350 ₺",
      "Tek Kartuş (Beyaz) — 350 ₺",
      "1 Koli (24 Kartuş)"
    ],
    "specs": {
      "standard": "ISO 846 Küf Direnci / DIN 18545",
      "packaging": "310 ml Kartuş",
      "consumption": "Standart derzde ~12-15 metre hat",
      "mixingRatio": "Kartuş tabancası ile uygulama",
      "potLife": "Kabuk süresi: 15-20 dk / Su teması: 24 saat sonra",
      "logistics": "Balçova Mağaza Raf Teslim"
    },
    "accordions": [
      {
        "title": "10 Yıl Kararma ve Küflenme Direnci",
        "body": "İçeriğindeki yüksek dozajlı fungisit bileşenler, sıcak buhar ve deterjan temasında dahi silikonun sararmasını ve siyah küf benekleri oluşturmasını kesin olarak önler."
      }
    ]
  },
  {
    "id": "sibax-ls66-notr-universal-silikon-120tl",
    "name": "Sibax LS66 Çok Amaçlı Üniversal Silikon (280 ml)",
    "badge": "%100 Saf Silikon Formülü",
    "tag": "Sibax LS66 · 120 ₺",
    "deptId": "toolsSiliconesPanel",
    "category": "notr-silikon",
    "thumb": "assets/el-aletleri/sibax-ls66-notr-universal-silikon-120tl.jpg",
    "desc": "Cam montajı, kapı pencere aralıkları, mutfak tezgah arkaları ve genel tamiratlarda yüksek yapışma ve esneklik sağlayan ekonomik Sibax LS66 üniversal silikon.",
    "meta": [
      "Raf Fiyatı: 120 ₺",
      "Şeffaf ve Beyaz Seçenek",
      "%100 Silikon Polimer"
    ],
    "coverage": "Genel cam, ahşap, seramik ve metal sızdırmazlığı",
    "sizes": [
      "Tek Kartuş (Şeffaf) — 120 ₺",
      "Tek Kartuş (Beyaz) — 120 ₺",
      "1 Koli (24 Kartuş) Toptan"
    ],
    "specs": {
      "standard": "TS EN ISO 11600",
      "packaging": "280 ml Kartuş (Koli: 24 Adet)",
      "consumption": "Standart sızdırmazlık çekimi",
      "mixingRatio": "Silikon tabancası ile çekim",
      "potLife": "Kabuk: 10-15 dk / Esneklik: -40°C ile +120°C",
      "logistics": "Balçova Showroom & Urla Depo"
    },
    "accordions": [
      {
        "title": "Çatlamayan ve Ayrılmayan Kalıcı Esneklik",
        "body": "Dolgu maddesi içermeyen saf silikon yapısı sayesinde zamanla hacim kaybetmez, büzüşüp kenarlardan ayrılmaz."
      }
    ]
  },
  {
    "id": "selsil-101-universal-silikon-seffaf-beyaz",
    "name": "Selsil 101 Genel Amaçlı Silikon (280 g)",
    "badge": "Asetat Kürlenmeli Standart Silikon",
    "tag": "Selsil 101 Silikon",
    "deptId": "toolsSiliconesPanel",
    "category": "notr-silikon",
    "thumb": "assets/el-aletleri/selsil-101-universal-silikon-seffaf-beyaz.jpg",
    "desc": "Alüminyum doğramalar, vitrin camları, fayans kenarları ve ahşap fuga izolasyonlarında elastik ve dayanıklı sızdırmazlık sağlayan Selsil 101 üniversal silikon.",
    "meta": [
      "280 g Kartuş",
      "Şeffaf, Beyaz, Siyah",
      "İç ve Dış Mekan Kullanımı"
    ],
    "coverage": "Cam, seramik ve sırlı yüzeylerde tam yapışma",
    "sizes": [
      "Tek Kartuş (Şeffaf)",
      "Tek Kartuş (Beyaz)",
      "Tek Kartuş (Siyah)",
      "1 Koli (25 Adet)"
    ],
    "specs": {
      "standard": "ISO 9001 / CE",
      "packaging": "Kartuş",
      "consumption": "Uygulama derzine göre",
      "mixingRatio": "Tabanca ile",
      "potLife": "Hızlı kabuk bağlama",
      "logistics": "Balçova & Urla Stok"
    },
    "accordions": [
      {
        "title": "Cam ve Seramikte Kusursuz Tutunma",
        "body": "Sırlı ve pürüzsüz yüzeylerde moleküler tutunma oluşturur, su ve rüzgar sızıntılarını kesin olarak keser."
      }
    ]
  },
  {
    "id": "akfix-akvaryum-silikonu-seffaf",
    "name": "Akfix Akvaryum & Cam Silikonu (310 ml)",
    "badge": "%100 Toksiksiz Canlı Dostu",
    "tag": "Akvaryum Silikonu",
    "deptId": "toolsSiliconesPanel",
    "category": "notr-silikon",
    "thumb": "assets/el-aletleri/akfix-akvaryum-silikonu-seffaf.jpg",
    "desc": "Akvaryum imalatı, teraryumlar ve su tankı cam birleşimlerinde balıklara ve su canlılarına zehirli kimyasal salmayan, yüksek çekme dayanımlı saf şeffaf silikon.",
    "meta": [
      "310 ml Kartuş",
      "Solventsiz ve Toksik Madde İçermez",
      "Yüksek Basınç Dayanımlı"
    ],
    "coverage": "Camdan cama akvaryum köşeleri ve bölmeler",
    "sizes": [
      "Tek Kartuş (310 ml) — Şeffaf",
      "1 Koli (12 Kartuş)"
    ],
    "specs": {
      "standard": "DIN 32622 Akvaryum Standardı",
      "packaging": "310 ml Kartuş",
      "consumption": "Cam kalınlığına uygun derz",
      "mixingRatio": "Silikon tabancası ile",
      "potLife": "Tam kuruma: 48-72 saat (su doldurmadan önce)",
      "logistics": "Balçova Showroom Stok"
    },
    "accordions": [
      {
        "title": "Su Canlıları İçin Sıfır Zehirlilik",
        "body": "Kürlendikten sonra suya hiçbir kimyasal veya koku bırakmaz; tatlı ve tuzlu su akvaryumlarında güvenle kullanılır."
      }
    ]
  },
  {
    "id": "mitreapel-hizli-yapistirici-mdf-kit",
    "name": "MitreApel Hızlı Yapıştırıcı MDF Kit (200 ml + 50 g / 400 ml + 100 g)",
    "badge": "10 Saniyede Ultra Hızlı Yapıştırma",
    "tag": "MitreApel Kit · 150-300 ₺",
    "deptId": "toolsAdhesivesPanel",
    "category": "mitreapel",
    "thumb": "assets/el-aletleri/mitreapel-hizli-yapistirici-mdf-kit.jpg",
    "desc": "Ahşap süpürgelik köşeleri, MDF profil taçları, mobilya çıtaları ve taş tamiratlarında aktivatör spreyi ile 10 saniyede kemikleşen yüksek viskoziteli MitreApel yapıştırıcı seti.",
    "meta": [
      "Küçük Boy: 150 ₺ (200ml + 50g)",
      "Büyük Boy: 300 ₺ (400ml + 100g)",
      "Damlamayan Jel Kıvamı"
    ],
    "coverage": "Yüzlerce ahşap köşe ve parça birleşimi",
    "sizes": [
      "Küçük Boy Kit (200 ml + 50 g) — 150 ₺",
      "Büyük Boy Kit (400 ml + 100 g) — 300 ₺",
      "1 Koli (24 Set) Toptan"
    ],
    "specs": {
      "standard": "Siyanoakrilat Esaslı / Endüstriyel Norm",
      "packaging": "Kutulu İkili Set (Sıvı Jel Tüp + Aerosol Sprey)",
      "consumption": "Tek yüzeye sprey, diğer yüzeye 1 damla jel",
      "mixingRatio": "Doğrudan temas ve 10 sn baskı",
      "potLife": "Yapışma süresi: 8-12 saniye",
      "logistics": "Balçova Mağaza Tezgah Stok & Urla Depo"
    },
    "accordions": [
      {
        "title": "Dikey Yüzeylerde Akmayan Tiksotropik Jel",
        "body": "Yüksek viskoziteli jel yapıştırıcı emici ahşap tarafından hemen emilmez; yüzeyde kalarak aktivatörle temas ettiği anda kristalize olup kenetlenir."
      }
    ]
  },
  {
    "id": "apel-sivi-civi-montaj-yapistiricisi-300tl",
    "name": "Apel Sıvı Çivi Ekstra Güçlü Montaj Yapıştırıcısı (310 ml)",
    "badge": "Çivi & Vida Yerine Süper Güç",
    "tag": "Apel Sıvı Çivi · 300 ₺",
    "deptId": "toolsAdhesivesPanel",
    "category": "sivi-civi",
    "thumb": "assets/el-aletleri/apel-sivi-civi-montaj-yapistiricisi-300tl.jpg",
    "desc": "Ahşap paneller, süpürgelikler, strafor tavan kaplamaları, seramik fayans ve metal çıtaların duvara delme yapmadan vidalanmış gibi sabitlenmesini sağlayan Apel sıvı çivi.",
    "meta": [
      "Raf Fiyatı: 300 ₺",
      "Vida Gerektirmeyen Montaj",
      "Doldurma ve Yapıştırma Gücü"
    ],
    "coverage": "Bozuk ve pürüzlü zeminlerde dolgulu yapıştırma",
    "sizes": [
      "Tek Kartuş (310 ml) — 300 ₺",
      "1 Koli (12 Kartuş)",
      "Koli Toptan"
    ],
    "specs": {
      "standard": "EN 204 D4 Su Dayanımı Normu",
      "packaging": "310 ml Kartuş",
      "consumption": "Arka yüze zikzak veya noktasal baskı",
      "mixingRatio": "Kartuş tabancası ile uygulama",
      "potLife": "Açık zaman: 15 dk / İlk tutunma: 30 dk / Tam kuruma: 24 saat",
      "logistics": "Balçova Mağaza Stoktan Teslim"
    },
    "accordions": [
      {
        "title": "Bozuk Duvar Yüzeylerini Doldurarak Tutunur",
        "body": "Duvar yüzeyindeki 5 mm'ye kadar olan dalgalanmaları ve boşlukları macun gibi doldurarak panelin arkasının boş kalmasını engeller."
      }
    ]
  },
  {
    "id": "difix-granit-ve-mermer-yapistiricisi",
    "name": "Difix Granit & Mermer Yapıştırıcısı (Reçine + Sertleştirici Tüp)",
    "badge": "Polyester Esaslı Taş Macunu",
    "tag": "Difix Mermer · 1 kg",
    "deptId": "toolsAdhesivesPanel",
    "category": "mermer-epoksi",
    "thumb": "assets/el-aletleri/difix-granit-ve-mermer-yapistiricisi.jpg",
    "desc": "Mutfak tezgahı evye montajları, mermer basamak kırıkları, mezar taşları ve traverten derzlerinde yüksek mekanik mukavemet sağlayan, parlatılabilen çift bileşenli taş yapıştırıcısı.",
    "meta": [
      "1.000 g Kutu + Peroksit Tüp",
      "Beyaz ve Bej Renk Seçenekleri",
      "Zımparalanabilir ve Cilalanabilir"
    ],
    "coverage": "Mermer, granit, porselen ve suni taş birleşimleri",
    "sizes": [
      "1 kg Kutu Set (Beyaz)",
      "1 kg Kutu Set (Bej / Traverten)",
      "Koli (12 Takım)"
    ],
    "specs": {
      "standard": "DIN 16946 Taş Reçine Standardı",
      "packaging": "Teneke Kutu + Plastik Sertleştirici Tüp",
      "consumption": "Yüzey alanına göre spatulayla",
      "mixingRatio": "100 birim reçineye 2-3 birim peroksit sertleştirici",
      "potLife": "Karışım ömrü: 5-8 dk / Sertleşme: 20-30 dk",
      "logistics": "Balçova Showroom & Urla Depo"
    },
    "accordions": [
      {
        "title": "Taşla Birlikte Zımparalanır ve Parlatılır",
        "body": "Kuruduktan sonra doğal taşın sertliğine ulaşır; mermer silim makineleriyle silinebilir, zımparalanabilir ve cila tutar."
      }
    ]
  },
  {
    "id": "celik-epoksi-cift-bilesenli-yapistirici",
    "name": "Çelik Epoksi Çift Bileşenli Metal & Tamir Yapıştırıcısı",
    "badge": "Metali Metale Kaynak Gücü",
    "tag": "Çelik Epoksi · İkili Tüp",
    "deptId": "toolsAdhesivesPanel",
    "category": "mermer-epoksi",
    "thumb": "assets/el-aletleri/celik-epoksi-cift-bilesenli-yapistirici.jpg",
    "desc": "Çatlak döküm kalorifer petekleri, delinen yakıt/su tankları, sıyrılmış cıvata dişleri ve kırık metal parçalarda soğuk kaynak etkisi yaratan çelik tozlu epoksi macun.",
    "meta": [
      "Çelik Tozu Takviyeli",
      "150°C Isı ve Basınç Dayanımı",
      "Delinebilir, Diş Açılabilir"
    ],
    "coverage": "Metal, döküm, alüminyum ve sert plastik yüzeyler",
    "sizes": [
      "İkili Şırınga Set (28 g)",
      "Hamur / Macun Tip Çelik Epoksi (57 g)",
      "Endüstriyel Set"
    ],
    "specs": {
      "standard": "ASTM D1002 Çekme Direnci",
      "packaging": "İkili Enjektör / Blister Ambalaj",
      "consumption": "Tamir edilecek çatlak ve boşluğa",
      "mixingRatio": "1:1 hacimce eşit karışım",
      "potLife": "Jel süresi: 5 dk / Yüke binme: 2-4 saat / Tam kuruma: 16 saat",
      "logistics": "Balçova Mağaza Stok"
    },
    "accordions": [
      {
        "title": "Kuruduktan Sonra Torna ve Matkap İşlenebilir",
        "body": "Metal gibi sertleşir; matkapla delinebilir, kılavuzla metrik vida dişi açılabilir ve eğeyle tesviye edilebilir."
      }
    ]
  },
  {
    "id": "soudal-multi-spray-8in1",
    "name": "Soudal Multi-Spray 8 in 1 Teknik Bakım Spreyi (400 ml)",
    "badge": "8 Fonksiyonlu Profesyonel Bakım",
    "tag": "Soudal 8in1 · 400 ml",
    "deptId": "toolsAdhesivesPanel",
    "category": "mitreapel",
    "thumb": "assets/el-aletleri/soudal-multi-spray-8in1.jpg",
    "desc": "Pas sökme, yağlama, nem uzaklaştırma, kontak temizleme, korozyon önleme ve gıcırtı kesme özelliklerini tek kutuda birleştiren yüksek performanslı Belçika üretimi teknik sprey.",
    "meta": [
      "400 ml Büyük Boy Aerosol",
      "360 Derece Her Açıda Püskürtme",
      "PTFE Katkılı"
    ],
    "coverage": "Mekanik kilitler, menteşeler, raylar ve elektrik temas noktaları",
    "sizes": [
      "400 ml Aerosol Sprey",
      "1 Koli (12 Kutu)"
    ],
    "specs": {
      "standard": "ISO 9001 / Avrupa Üretim",
      "packaging": "400 ml Basınçlı Teneke Kutu + İnce Uygulama Pipeti",
      "consumption": "Noktasal püskürtme",
      "mixingRatio": "Doğrudan kullanım",
      "potLife": "Uzun ömürlü koruyucu film",
      "logistics": "Balçova Showroom Stok"
    },
    "accordions": [
      {
        "title": "Nemi Uzaklaştırma ve Kontak Koruması",
        "body": "Su ve nemi elektrik terminallerinden iter; kış aylarında dış mekan bahçe aydınlatmalarında ve oto tesisatında oksitlenmeyi keser."
      }
    ]
  },
  {
    "id": "mr-caustic-lavabo-acici-kostik-100-200tl",
    "name": "Mr. Caustic Profesyonel Granül Lavabo Açıcı Kostik",
    "badge": "%100 Saf Sodyum Hidroksit",
    "tag": "Mr. Caustic · 100-200 ₺",
    "deptId": "toolsCleaningPlumbingPanel",
    "category": "gider-acici",
    "thumb": "assets/el-aletleri/mr-caustic-lavabo-acici-kostik.jpg",
    "desc": "Balçova mağazamızda tesisatçıların ve ev sahiplerinin en çok tercih ettiği, lavabo, banyo gideri ve ana pimaş hatlarındaki donmuş yağ, saç ve sabun artıklarını kaynar su reaksiyonuyla eriten Mr. Caustic.",
    "meta": [
      "Küçük Boy: 100 ₺ / Büyük Boy: 200 ₺",
      "Termokimyasal Hızlı Erime",
      "Plastik Borulara Zarar Vermez"
    ],
    "coverage": "1 tıkanıklık için yarım veya 1 kutu",
    "sizes": [
      "Tek Paket (Küçük Boy) — 100 ₺",
      "Tek Paket (Büyük Boy) — 200 ₺",
      "Koli Bazı (24 Paket) Toptan"
    ],
    "specs": {
      "standard": "TS 56 Sodyum Hidroksit Normu",
      "packaging": "Emniyet Kilitli Plastik Şişe",
      "consumption": "Gidere dökülüp üzerine 1 litre kaynar su boşaltılır",
      "mixingRatio": "Su ile şiddetli ısı açığa çıkarır",
      "potLife": "Etki süresi: 2-5 dakika",
      "logistics": "Balçova Showroom Raf Stok"
    },
    "accordions": [
      {
        "title": "Organik Atıkları Dakikalar İçinde Sıvılaştırır",
        "body": "Suyla temas ettiğinde 90°C'ye varan egzotermik ısı açığa çıkararak pimaş çeperine yapışmış kalıplaşmış mutfak yağlarını sabunlaştırıp suyla akıtır."
      }
    ]
  },
  {
    "id": "gts-35-agir-hizmet-pas-ve-kirec-cozucu",
    "name": "GTS-35 Konsantre Pas & Kireç Çözücü Kimyasal (1 Litre)",
    "badge": "İnşaat Sonrası Harç Temizliği",
    "tag": "GTS-35 Pas & Kireç",
    "deptId": "toolsCleaningPlumbingPanel",
    "category": "harc-sokucu",
    "thumb": "assets/el-aletleri/gts-35-agir-hizmet-pas-ve-kirec-cozucu.jpg",
    "desc": "Seramik ve fayans üzerindeki inşaat harç kalıntılarını, derz dolgu artıklarını, pas lekelerini ve kireç taşı bağlamış tesisat borularını asidik formülüyle söken GTS-35.",
    "meta": [
      "1.000 ml Şişe",
      "Konsantre Asidik Formül",
      "Harç, Pas ve Kireç Sökücü"
    ],
    "coverage": "Sulandırma oranına göre 10-20 m² seramik yüzey",
    "sizes": [
      "1 Litre Şişe",
      "5 Litre Bidon",
      "Koli (12 Adet)"
    ],
    "specs": {
      "standard": "Endüstriyel Kimyasal Standart",
      "packaging": "1 Litre Emniyet Kapaklı HDPE Şişe",
      "consumption": "Kireç yoğunluğuna göre 1:1 veya 1:3 suyla seyreltilir",
      "mixingRatio": "Fırça ile uygulama, 5 dk sonra bol suyla durulama",
      "potLife": "Reaksiyon süresi: 3-5 dakika",
      "logistics": "Balçova Mağaza & Urla Depo"
    },
    "accordions": [
      {
        "title": "Fayans ve Derz Yüzeyini Çizmeden Temizler",
        "body": "Mekanik spatulayla kazımaya gerek kalmadan çimento ve harç kalıntılarını köpürterek çözer; seramik sırlı yüzeyine zarar vermez."
      }
    ]
  },
  {
    "id": "wd-40-cok-amacli-pas-sokucu-sprey",
    "name": "WD-40 Çok Amaçlı Pas Sökücü, Yağlayıcı & Koruyucu (200 / 400 ml)",
    "badge": "Orijinal Formül 2000+ Kullanım",
    "tag": "WD-40 · 200/400 ml",
    "deptId": "toolsCleaningPlumbingPanel",
    "category": "pas-sokucu",
    "thumb": "assets/el-aletleri/wd-40-cok-amacli-pas-sokucu-sprey.jpg",
    "desc": "Paslanmış cıvata ve somunları söken, kilit ve menteşe gıcırtılarını anında kesen, metal aksamları nemden koruyarak paslanmayı önleyen efsanevi WD-40.",
    "meta": [
      "200 ml ve 400 ml Seçenekleri",
      "Akıllı Pipet Teknolojisi",
      "Pas Çözücü & Nem Uzaklaştırıcı"
    ],
    "coverage": "Tüm kilit, el aleti, makine ve mekanik aksamlar",
    "sizes": [
      "200 ml Aerosol Sprey",
      "400 ml Smart Straw (Akıllı Pipetli)",
      "1 Koli (24 Kutu)"
    ],
    "specs": {
      "standard": "Orijinal ABD Formülü / Global Standart",
      "packaging": "Basınçlı Kutu",
      "consumption": "Sıkışmış parçaya püskürtülüp 2 dk beklenir",
      "mixingRatio": "Doğrudan püskürtme",
      "potLife": "Kalıcı ince koruyucu film",
      "logistics": "Balçova Showroom Tezgah Stok"
    },
    "accordions": [
      {
        "title": "Pasın İçine Nüfuz Eden Kılcal Etki",
        "body": "Yüksek yüzey gerilimi sayesinde sıkışmış somun dişlerinin en derin boşluklarına kadar sızar ve pas kristallerini parçalar."
      }
    ]
  },
  {
    "id": "format-elektronik-kontak-spreyi-yagsiz",
    "name": "Format Elektronik Devre Temizleyici Kontak Sprey (Yağsız 200 ml)",
    "badge": "Hızlı Uçucu Kalıntı Bırakmaz",
    "tag": "Format Kontak Sprey",
    "deptId": "toolsCleaningPlumbingPanel",
    "category": "pas-sokucu",
    "thumb": "assets/el-aletleri/format-elektronik-kontak-spreyi-yagsiz.jpg",
    "desc": "Elektrik panoları, otomat sigortalar, anahtar klemensleri, elektronik kartlar ve potansiyometrelerde toz, yağ ve oksit tabakasını tortu bırakmadan temizleyen Format yağsız kontak sprey.",
    "meta": [
      "200 ml Sprey",
      "Yağsız Formül (Kalıntısız Uçar)",
      "Yalıtkan Güvenli Temizlik"
    ],
    "coverage": "Elektrik ve elektronik temas yüzeyleri",
    "sizes": [
      "200 ml Yağsız Sprey",
      "200 ml Yağlı Kontak Sprey",
      "Koli (12 Kutu)"
    ],
    "specs": {
      "standard": "RoHS Uyumlu Elektronik Kimyasal",
      "packaging": "200 ml Aerosol Teneke",
      "consumption": "Elektrik akımı kesildikten sonra püskürtülür",
      "mixingRatio": "Doğrudan uygulama",
      "potLife": "15-30 saniyede tamamen uçar",
      "logistics": "Balçova Mağaza Stok"
    },
    "accordions": [
      {
        "title": "Kısa Devre Riskini Ortadan Kaldırır",
        "body": "Uçucu formülü yüzeyde iletken yağ filmi bırakmaz; toz kaynaklı şase ve ark oluşumlarını bertaraf eder."
      }
    ]
  },
  {
    "id": "format-pas-sokucu-ve-yaglayici-sprey",
    "name": "Format Süper Pas Sökücü & Yağlayıcı Sprey (200 ml)",
    "badge": "Ekonomik Güçlü Pas Sökücü",
    "tag": "Format Pas Sökücü",
    "deptId": "toolsCleaningPlumbingPanel",
    "category": "pas-sokucu",
    "thumb": "assets/el-aletleri/format-pas-sokucu-ve-yaglayici-sprey.jpg",
    "desc": "Korozyona uğramış bahçe kapısı kilitleri, asma kilitler, paslı civatalar ve takım sandığı aletleri için hızlı tesir eden yerli üretim Format pas sökücü yağlayıcı.",
    "meta": [
      "200 ml Kutu",
      "Ekonomik Usta Çözümü",
      "İnce Yağlama ve Pas Temizliği"
    ],
    "coverage": "Paslı mekanik parçalar",
    "sizes": [
      "200 ml Sprey Kutu",
      "1 Koli (24 Kutu)"
    ],
    "specs": {
      "standard": "Sanayi Tipi Formül",
      "packaging": "200 ml Teneke",
      "consumption": "Püskürtme",
      "mixingRatio": "Doğrudan",
      "potLife": "Hızlı pas çözme",
      "logistics": "Balçova Mağaza Stok"
    },
    "accordions": [
      {
        "title": "Hızlı Mekanik Çözülme",
        "body": "Paslanmış metal yüzeylerdeki oksit tabakasını yumuşatarak anahtarların kırılmadan dönmesini ve somunların kolayca sökülmesini sağlar."
      }
    ]
  },
  {
    "id": "sgs-1780-metal-kilavuzlu-maket-bicagi",
    "name": "SGS 1780 Metal Kılavuzlu Profesyonel Maket Bıçağı (Falcata 18 mm)",
    "badge": "Ağır İş Tipi Metal Raylı Gövde",
    "tag": "SGS 1780 · SK5 Çelik",
    "deptId": "toolsMechanicalPanel",
    "category": "maket-bicagi",
    "thumb": "assets/el-aletleri/sgs-1780-metal-kilavuzlu-maket-bicagi.jpg",
    "desc": "Alçıpan levha kesimi, membran ve şıngıl dilimleme, kablo soyma ve ağır şantiye paket açımlarında kırılmayan paslanmaz çelik iç kılavuza ve otomatik vidalı kilit sistemine sahip SGS 1780.",
    "meta": [
      "18 mm SK5 Yüksek Karbon Çelik Bıçak",
      "Ergonomik Kauçuk Kaplı Gövde",
      "Vidalı Emniyet Kilidi"
    ],
    "coverage": "Alçıpan, izolasyon, yer kaplama ve ambalaj kesimi",
    "sizes": [
      "SGS 1780 Maket Bıçağı",
      "SGS Yedek Bıçak (10'lu Plastik Kutu)",
      "Usta Paketi (Bıçak + 30 Yedek)"
    ],
    "specs": {
      "standard": "ISO 9001 / SGS Kalite Standartları",
      "packaging": "Askılı Blister Ambalaj",
      "consumption": "Körlendikçe kırılabilir 8 kademeli uç",
      "mixingRatio": "Manuel el aleti",
      "potLife": "Paslanmaz çelik kızak ve darbe dayanımlı ABS gövde",
      "logistics": "Balçova Showroom & Urla Depo"
    },
    "accordions": [
      {
        "title": "Vidalı Kilit Mekanizması ile Geri Kaçmaz",
        "body": "Sert alçıpan ve kauçuk membran keserken bıçak zorlandığında içeri geri kaçmaz veya fırlamaz; tekerlekli sıkma vidası sıfır oynama sağlar."
      }
    ]
  },
  {
    "id": "tursan-agir-hizmet-metal-cakma-zimba",
    "name": "Tursan Ağır Hizmet Tipi Metal Çakma Zımba Tabancası (Tacker)",
    "badge": "Çelik Gövdeli Döşeme Zımbası",
    "tag": "Tursan Zımba Tabancası",
    "deptId": "toolsMechanicalPanel",
    "category": "zimba-tabanca",
    "thumb": "assets/el-aletleri/tursan-agir-hizmet-metal-cakma-zimba.jpg",
    "desc": "Buhar dengeleyici çatı örtüleri, yalıtım membranları, mobilya kumaş döşemesi, tel çit ve etiket çakımlarında kullanılan krom kaplı tam çelik gövdeli Tursan çakma zımba makinesi.",
    "meta": [
      "4 – 14 mm Zımba Teli Kapasitesi",
      "Krom Kaplı Masif Çelik Gövde",
      "Güç Ayar Vidası"
    ],
    "coverage": "Ahşap karkas üzerine örtü ve kumaş sabitleme",
    "sizes": [
      "Tursan Zımba Tabancası",
      "Tursan 8 mm Zımba Teli (1.000 Adet)",
      "Tursan 10 mm Zımba Teli (1.000 Adet)",
      "Tursan 12 mm Zımba Teli (1.000 Adet)"
    ],
    "specs": {
      "standard": "TS EN ISO Standartları",
      "packaging": "Karton Kutu",
      "consumption": "Şantiye örtü ve yalıtım montajı",
      "mixingRatio": "Mekanik el yaylı çakma",
      "potLife": "Ömür boyu çelik mekanizma",
      "logistics": "Balçova Mağaza & Urla Depo"
    },
    "accordions": [
      {
        "title": "Sert Ahşaba Göre Ayarlanabilir Çakma Gücü",
        "body": "Üst kısımdaki tork vidası sıkılarak sert meşe ve çam kerestelerde telin dışarıda kalmadan tam gömülmesi sağlanır."
      }
    ]
  },
  {
    "id": "agir-tip-iskelet-silikon-ve-mastik-tabancasi",
    "name": "Ağır Tip Güçlendirilmiş İskelet Silikon & Mastik Tabancası",
    "badge": "18:1 İtme Güç Oranı",
    "tag": "Mastik Tabancası",
    "deptId": "toolsMechanicalPanel",
    "category": "zimba-tabanca",
    "thumb": "assets/el-aletleri/agir-tip-iskelet-silikon-ve-mastik-tabancasi.jpg",
    "desc": "Bostik 007 High Tack ve poliüretan mastik gibi yoğun viskoziteli ağır kimyasalları yorulmadan sıkan, bükülmeyen hekzagonal çelik itme milli profesyonel silikon tabancası.",
    "meta": [
      "18:1 Yüksek İtme Gücü",
      "Damlatmaz Çift Tetik Mekanizması",
      "Döner Metal Gövde"
    ],
    "coverage": "Tüm 280-310 ml kartuşlu yapıştırıcı ve mastikler",
    "sizes": [
      "İskelet Kartuş Tabancası",
      "Sosis Mastik Tabancası (600 ml Alüminyum Tüp)"
    ],
    "specs": {
      "standard": "Profesyonel Şantiye Tipi",
      "packaging": "Dökme / Etiketli",
      "consumption": "Tüm standart kartuşlar için",
      "mixingRatio": "Manuel el aleti",
      "potLife": "Aşınmaz ısıl işlem görmüş itme pabuçları",
      "logistics": "Balçova Showroom Tezgah Stok"
    },
    "accordions": [
      {
        "title": "Damlatmaz (Drip-Free) Basınç Tahliye Sistemi",
        "body": "Tetik bırakıldığı anda kartuştaki iç basıncı otomatik olarak geriye boşaltır; uçtan fazlalık silikon akmasını engelleyerek temiz çalışma sağlar."
      }
    ]
  },
  {
    "id": "manyetik-uclu-darbe-korumali-serit-metre",
    "name": "Manyetik Uçlu Çelik Şerit Metre (3m / 5m / 8m)",
    "badge": "MID Class II Hassasiyet Standardı",
    "tag": "Şerit Metre · 5 Metre",
    "deptId": "toolsMechanicalPanel",
    "category": "olcu-aletleri",
    "thumb": "assets/el-aletleri/manyetik-uclu-darbe-korumali-serit-metre.jpg",
    "desc": "Düşmelere karşı kalın darbe emici kauçuk zırhlı, paslanmaz naylon kaplamalı şerit yüzeyi ve metal profillere tek başına tutunan çift mıknatıslı uca sahip şantiye tipi çelik şerit metre.",
    "meta": [
      "3 Metre, 5 Metre, 8 Metre Seçenekleri",
      "Manyetik Tutucu Kanca",
      "Kırılmadan 2.4 Metre Uzama"
    ],
    "coverage": "Şantiye metraj, kalıp ve mobilya ölçümleri",
    "sizes": [
      "3 Metre × 16 mm",
      "5 Metre × 25 mm (En Çok Satan)",
      "8 Metre × 25 mm Ağır Şantiye"
    ],
    "specs": {
      "standard": "Avrupa Standartları MID Class II",
      "packaging": "Askılı Kartela",
      "consumption": "Hassas milimetrik ölçüm",
      "mixingRatio": "Manuel ölçüm aleti",
      "potLife": "Aşınmaz mat naylon kaplama şerit",
      "logistics": "Balçova Showroom & Urla Depo"
    },
    "accordions": [
      {
        "title": "Manyetik Uç ile Tek Başına Kolay Ölçüm",
        "body": "Güçlü neodimyum kancası demir kutu profil, alçıpan C/U profili ve çelik kolonlara yapışır; ikinci bir kişiye ihtiyaç duymadan 5 metreyi tek başınıza ölçersiniz."
      }
    ]
  },
  {
    "id": "alyan-anahtar-takimi-9-parca-uzun-topbasli",
    "name": "9 Parça Uzun Boy Topbaşlı Metrik Alyan Takımı (1.5 – 10 mm)",
    "badge": "Cr-V Krom Vanadyum Çeliği",
    "tag": "Topbaş Alyan Seti",
    "deptId": "toolsMechanicalPanel",
    "category": "olcu-aletleri",
    "thumb": "assets/el-aletleri/alyan-anahtar-takimi-9-parca-uzun-topbasli.jpg",
    "desc": "25 derece açıyla dar açılı yuvalara girebilen bilyalı topbaşlı ucu, eğilmeyen ve yuva bozmayan ısıl işlem görmüş Krom Vanadyum çeliğiyle 9 parçalı uzun boy profesyonel alyan anahtar seti.",
    "meta": [
      "1.5, 2, 2.5, 3, 4, 5, 6, 8, 10 mm",
      "Topbaşlı Uç (Açılı Çevirme)",
      "Pratik Plastik Kilitli Tutucu"
    ],
    "coverage": "Mobilya, makine, batarya kartuş ve kilit montajları",
    "sizes": [
      "9 Parça Metrik Set (1.5-10 mm)",
      "9 Parça Torx Set (T10-T50)"
    ],
    "specs": {
      "standard": "DIN ISO 2936 / Cr-V Çelik",
      "packaging": "Plastik Kılıf Seti",
      "consumption": "İmbus ve alyan cıvatalar için",
      "mixingRatio": "Manuel el aleti",
      "potLife": "Saten mat nikel kaplama pas koruması",
      "logistics": "Balçova Showroom Stok"
    },
    "accordions": [
      {
        "title": "Topbaş ile 25 Derece Açılı Çevirme",
        "body": "Düz alyanların yanaşamadığı dar köşelerde vidaya tam dik olmadan 25° açıyla yanaşarak cıvatayı sökmeyi mümkün kılar."
      }
    ]
  },
  {
    "id": "luna-standart-kestirme-fircasi-serisi",
    "name": "Luna Standart Saf Kıl Ahşap Saplı Kestirme Fırçası (No: 1 – No: 4)",
    "badge": "Doğal Saf Beyaz Kıl",
    "tag": "Luna Kestirme · No:1-4",
    "deptId": "toolsPaintingSuppliesPanel",
    "category": "firca",
    "thumb": "assets/el-aletleri/luna-standart-kestirme-fircasi-serisi.jpg",
    "desc": "Tavan ve duvar köşelerinde keskin, düzgün ve fırça izi bırakmayan kestirme hatları çekmek için fırınlanmış ahşap saplı ve kıl dökmeyen epoksi yapıştırmalı Luna kestirme fırçası.",
    "meta": [
      "No:1, 1.5, 2, 2.5, 3, 4 Boylar",
      "Saf Doğal Kıl Formülü",
      "Epoksi Paslanmaz Yüksük"
    ],
    "coverage": "İç ve dış cephe tüm su ve yağlı boya uygulamaları",
    "sizes": [
      "No: 1 (Küçük Detay)",
      "No: 2 (Standart Kestirme)",
      "No: 2.5 (En Çok Satan)",
      "No: 3 (Geniş Kestirme)",
      "No: 4 (Geniş Yüzey)",
      "Tam Usta Seti (6 Boy)"
    ],
    "specs": {
      "standard": "Luna Orijinal Fırça Kalite Standartları",
      "packaging": "Baskılı Koruma Kılıfı",
      "consumption": "Boyanın viskozitesine göre homojen yayılım",
      "mixingRatio": "Kullanım sonrası su veya tinerle yıkama",
      "potLife": "Dökülmeyen epoksi gömülü doğal kıl",
      "logistics": "Balçova Showroom Raf Stok & Urla Depo"
    },
    "accordions": [
      {
        "title": "Kıl Dökmeyen Epoksi Bağlantı Teknolojisi",
        "body": "Kıllar paslanmaz sac yüksük içine yüksek mukavemetli epoksi reçine ile sabitlenmiştir; boya yaparken duvarda kıl bırakmaz."
      }
    ]
  },
  {
    "id": "luna-black-profesyonel-acili-robot-firca",
    "name": "Luna Black Açılı Radyatör & Robot Fırçası (No: 2 – No: 4)",
    "badge": "Erişilmez Noktalar İçin Açılı Baş",
    "tag": "Luna Robot Fırça",
    "deptId": "toolsPaintingSuppliesPanel",
    "category": "firca",
    "thumb": "assets/el-aletleri/luna-black-profesyonel-acili-robot-firca.jpg",
    "desc": "Kalorifer petek arkaları, boru aralıkları, çatı altı saçak köşeleri ve merdiven altı gibi düz fırçaların ulaşamadığı dar alanlara rahatça giren uzun saplı açılı Luna robot fırça.",
    "meta": [
      "45 Derece Açılı Özel Kafa",
      "Ekstra Uzun Ahşap Sap",
      "No:2, 2.5, 3, 4 Boylar"
    ],
    "coverage": "Radyatör arkası, metal çelik karkas ve çatı saçakları",
    "sizes": [
      "No: 2 Robot Fırça",
      "No: 2.5 Robot Fırça",
      "No: 3 Robot Fırça",
      "No: 4 Robot Fırça"
    ],
    "specs": {
      "standard": "Luna Profesyonel Seri",
      "packaging": "Koruyucu Kılıflı",
      "consumption": "Dar detay boyamaları",
      "mixingRatio": "Tüm boyalarla uyumlu",
      "potLife": "Uzun ömürlü doğal kıl",
      "logistics": "Balçova Mağaza Stok"
    },
    "accordions": [
      {
        "title": "Radyatörü Sökmeden Arkasını Boyama Kolaylığı",
        "body": "45 derecelik açılı kafa geometrisi sayesinde kalorifer peteklerini duvardan indirmeden arkadaki tüm duvarı boyamanızı sağlar."
      }
    ]
  },
  {
    "id": "luna-profesyonel-damlatmaz-saten-rulo-seti",
    "name": "Luna Damlatmaz İç Cephe Saten Boya Rulosu (20 cm / 25 cm)",
    "badge": "İpek Dokulu Damlatmaz Elyaf",
    "tag": "Luna Saten Rulo",
    "deptId": "toolsPaintingSuppliesPanel",
    "category": "rulo",
    "thumb": "assets/el-aletleri/luna-profesyonel-damlatmaz-saten-rulo-seti.jpg",
    "desc": "Plastik, silikonlu ve ipek mat saten boyalarda portakal kabuğu dokusu bırakmadan cam gibi pürüzsüz yüzey veren, dönerken boya sıçratmayan profesyonel Luna saten rulosu.",
    "meta": [
      "20 cm ve 25 cm Ebat Seçenekleri",
      "Ergonomik Plastik Saplı Gövde",
      "Yedek Rulo Kolay Geçmeli"
    ],
    "coverage": "Geniş iç mekan tavan ve duvar yüzeyleri",
    "sizes": [
      "20 cm Komple Saplı Rulo",
      "25 cm Komple Saplı Rulo",
      "20 cm Yedek Rulo Kılıfı",
      "25 cm Yedek Rulo Kılıfı"
    ],
    "specs": {
      "standard": "Luna Orijinal Boyacı Donanımı",
      "packaging": "Şeffaf Ambalaj",
      "consumption": "Rulo başına yaklaşık 1.500 m² boya sürme ömrü",
      "mixingRatio": "Sırık uzatması takılabilir delikli sap",
      "potLife": "Yıkanabilir ve tekrar kullanılabilir mikrofiber kumaş",
      "logistics": "Balçova Showroom & Urla Depo Sevk"
    },
    "accordions": [
      {
        "title": "Damlatmayan ve Sıçratmayan İplik Yapısı",
        "body": "Özel termofüzyon dikişsiz iplik örgüsü boyayı içine hapseder; hızlı rulolamada yerlere boya zerrecikleri sıçratmaz."
      }
    ]
  },
  {
    "id": "luna-parmak-mini-rulo-seti-10cm",
    "name": "Luna 10 cm Parmak Mini Rulo Seti (Sap + 5 Yedek)",
    "badge": "Dar Alanlar ve Kapı Boyama",
    "tag": "Parmak Rulo Seti",
    "deptId": "toolsPaintingSuppliesPanel",
    "category": "rulo",
    "thumb": "assets/el-aletleri/luna-parmak-mini-rulo-seti-10cm.jpg",
    "desc": "Panel kapılar, pencere pervazları, mutfak dolapları ve dar duvar şeritlerinde rulo izi bırakmadan pürüzsüz boya atan 10 cm mini parmak rulo seti.",
    "meta": [
      "10 cm Tel Sap + 5 Adet Yedek Rulo",
      "Saten ve Sünger Seçenekleri",
      "Hızlı Değiştirilebilir Gövde"
    ],
    "coverage": "Amerikan kapılar, mobilyalar ve dar kolon kenarları",
    "sizes": [
      "10 cm Mini Set (Sap + 5 Saten Yedek)",
      "10 cm Sünger Rulo Seti (Yağlı Boya / Vernik)",
      "10'lu Paket Yedek Rulo"
    ],
    "specs": {
      "standard": "Luna Mini Seri",
      "packaging": "Plastik Poşet Set",
      "consumption": "Detay ve mobilya boyama",
      "mixingRatio": "Su ve solvent bazlı boyalar",
      "potLife": "Çoklu kullanım",
      "logistics": "Balçova Showroom Stok"
    },
    "accordions": [
      {
        "title": "Amerikan Panel Kapı Göbeklerinde Kusursuz Hat",
        "body": "10 cm'lik kompakt yapısıyla kapı panellerinin iç çıtalarına tam oturur; fırça izi olmadan profesyonel lake pürüzsüzlüğü sunar."
      }
    ]
  },
  {
    "id": "paslanmaz-celik-egri-boyaci-spatulasi",
    "name": "Paslanmaz Çelik Yay Çeliği Boyacı Spatulası (60 – 120 mm)",
    "badge": "Esnek Paslanmaz Yay Çeliği",
    "tag": "Paslanmaz Spatula",
    "deptId": "toolsPaintingSuppliesPanel",
    "category": "spatula",
    "thumb": "assets/el-aletleri/paslanmaz-celik-egri-boyaci-spatulasi.jpg",
    "desc": "Duvar çatlaklarına saten alçı çekme, eski boya ve kabarmış kireçleri kazıma ve macun tamiratlarında esnekliğiyle yüzeyi çizmeyen paslanmaz yay çeliği boyacı spatulası.",
    "meta": [
      "60 mm, 80 mm, 100 mm, 120 mm Enler",
      "Esnek Paslanmaz Çelik Ayna",
      "Perçinli Sert Ahşap / Plastik Sap"
    ],
    "coverage": "Alçı macun çekimi ve duvar raspalama",
    "sizes": [
      "60 mm Spatula",
      "80 mm Spatula",
      "100 mm Spatula",
      "120 mm Spatula",
      "4'lü Spatula Takımı"
    ],
    "specs": {
      "standard": "DIN Normu Paslanmaz Çelik",
      "packaging": "Etiketli",
      "consumption": "Yüzey macunlama ve raspalama",
      "mixingRatio": "Manuel el aleti",
      "potLife": "Paslanmaz ve bileylenebilir yay çeliği",
      "logistics": "Balçova Showroom & Urla Depo"
    },
    "accordions": [
      {
        "title": "İdeal Yaylanma ile Dalgalanmasız Macun Çekimi",
        "body": "Bıçak ağzındaki hassas inceltilmiş esneklik, duvara saten alçı veya akrilik macun çekerken kenarlarda bıçak izi ve çapak bırakmaz."
      }
    ]
  }
];
  var DEPARTMENTS_DATA = [
  {
    "id": "toolsSealantsPanel",
    "short": "Poliüretan Mastik",
    "full": "Poliüretan Mastik & Dilatasyon Dolguları",
    "sub": "Bostik NP1, Dayson Extra PU (350 ₺), Soma Fix PU, Selsil PU",
    "pillsId": "toolsSealantsMenuPills",
    "badge": "PU Mastik & Dilatasyon",
    "summaryTitle": "Bostik & Dayson Yüksek Modüllü Poliüretan Mastikler",
    "summaryDesc": "Bina dilatasyon derzleri, parapet izolasyonları, oto kaporta ve saç metal birleşimlerinde elastikiyetini kaybetmeyen UV dayanımlı profesyonel poliüretan sızdırmazlık mastikleri.",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M12 2v20M8 5l8 4M8 11l8 4M8 17l8 4\"/></svg>",
    "pills": [
      [
        "Bostik Mastikler",
        "bostik-pu",
        true
      ],
      [
        "Dayson Mastikler",
        "dayson-pu",
        false
      ],
      [
        "Soma Fix & Selsil",
        "diger-pu",
        false
      ]
    ]
  },
  {
    "id": "toolsSiliconesPanel",
    "short": "Silikon & Hibrit",
    "full": "Silikonlar, Hibrit Mastik & Sıvı Çivi",
    "sub": "Bostik 007 High Tack (350 ₺), Würth duş kabin (350 ₺), Sibax LS66 (120 ₺), Akfix",
    "pillsId": "toolsSiliconesMenuPills",
    "badge": "Silikon & High Tack",
    "summaryTitle": "Bostik High Tack, Würth ve Nötr Silikon Çözümleri",
    "summaryDesc": "350 kg/m² anında tutunma sağlayan Bostik 007 High Tack montaj yapıştırıcısı, küflenmez Würth duşakabin silikonu, şeffaf Sibax LS66 ve akvaryum silikonları.",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z\"/><polyline points=\"14 2 14 8 20 8\"/></svg>",
    "pills": [
      [
        "High Tack & Montaj",
        "high-tack",
        true
      ],
      [
        "Duş & Banyo Silikonu",
        "dus-silikonu",
        false
      ],
      [
        "Üniversal & Nötr",
        "notr-silikon",
        false
      ]
    ]
  },
  {
    "id": "toolsAdhesivesPanel",
    "short": "Hızlı Yapıştırıcı",
    "full": "Hızlı Yapıştırıcı, Epoksi & Mermer Yapıştırıcıları",
    "sub": "MitreApel MDF kit (150-300 ₺), Apel sıvı çivi (300 ₺), Difix mermer, Çelik Epoksi",
    "pillsId": "toolsAdhesivesMenuPills",
    "badge": "Hızlı Yapıştırıcı & Epoksi",
    "summaryTitle": "MitreApel, Apel Sıvı Çivi ve Çift Bileşenli Yapıştırıcılar",
    "summaryDesc": "10 saniyede kürlenen MitreApel MDF profil yapıştırıcı kitleri, solventli/solventsiz Apel sıvı çiviler, Difix taş mermer yapıştırıcıları ve çatlak kaynak çelik epoksileri.",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"/></svg>",
    "pills": [
      [
        "MitreApel Hızlı Kit",
        "mitreapel",
        true
      ],
      [
        "Sıvı Çivi & Ahşap",
        "sivi-civi",
        false
      ],
      [
        "Mermer & Epoksi",
        "mermer-epoksi",
        false
      ]
    ]
  },
  {
    "id": "toolsCleaningPlumbingPanel",
    "short": "Tesisat & Kimyasal",
    "full": "Tesisat, Bakım Kimyasalları & Yağlayıcılar",
    "sub": "Mr. Caustic kostik (100-200 ₺), GTS-35 pas & kireç, WD-40, Format kontak",
    "pillsId": "toolsCleaningPlumbingMenuPills",
    "badge": "Tesisat & Bakım Kimyası",
    "summaryTitle": "Mr. Caustic, GTS-35, WD-40 ve Profesyonel Bakım Kimyasalları",
    "summaryDesc": "Tıkanmış giderleri anında eriten granül kostik açıcılar, inşaat sonrası kireç ve harç sökücü asitler, WD-40 pas sökücüler ve Format elektronik kontak spreyleri.",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M12 2v20M5 12h14M5 19l7 3 7-3\"/></svg>",
    "pills": [
      [
        "Gider Açıcı & Kostik",
        "gider-acici",
        true
      ],
      [
        "Pas Sökücü & Yağlayıcı",
        "pas-sokucu",
        false
      ],
      [
        "Kireç & Harç Sökücü",
        "harc-sokucu",
        false
      ]
    ]
  },
  {
    "id": "toolsMechanicalPanel",
    "short": "Mekanik El Aletleri",
    "full": "Kesici, Çakma & Ölçüm Mekanik El Aletleri",
    "sub": "SGS1780 maket bıçağı, Tursan çakma zımba, silikon tabancaları, şerit metreler",
    "pillsId": "toolsMechanicalMenuPills",
    "badge": "Mekanik Usta Aletleri",
    "summaryTitle": "SGS Maket Bıçakları, Tursan Zımbalar ve Şantiye Ölçüm Ekipmanları",
    "summaryDesc": "Ağır iş tipi SK5 çelik bıçaklı SGS maket bıçakları, metal gövdeli Tursan çakma döşeme zımbaları, güçlendirilmiş mastik tabancaları ve darbe korumalı çelik şerit metreler.",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z\"/></svg>",
    "pills": [
      [
        "Maket Bıçağı & Falçata",
        "maket-bicagi",
        true
      ],
      [
        "Zımba & Tabancalar",
        "zimba-tabanca",
        false
      ],
      [
        "Ölçü & El Aletleri",
        "olcu-aletleri",
        false
      ]
    ]
  },
  {
    "id": "toolsPaintingSuppliesPanel",
    "short": "Fırça, Rulo & Spatula",
    "full": "Usta Boyacı Fırçaları, Rulolar & Çelik Spatulalar",
    "sub": "Luna Standart & Black kestirme fırçaları, robot fırçalar, parmak rulo, paslanmaz spatulalar",
    "pillsId": "toolsPaintingSuppliesMenuPills",
    "badge": "Boya Uygulama Ekipmanları",
    "summaryTitle": "Orijinal Luna Fırça Serisi, Saten Rulolar ve Raspa Spatulaları",
    "summaryDesc": "İz bırakmayan saf doğal kıl Luna kestirme ve yağlı boya fırçaları, kalorifer arkası açılı robot fırçalar, damlatmayan saten rulolar ve yay çeliği paslanmaz spatulalar.",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 6.99l9.01 9.01 1.58-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z\"/><path d=\"M9 8c-2 0-4 1.5-4 3.5 0 1.5 1 2.5 1 3.5 0 1-1 1.5-1 2.5 0 1.5 1.5 2.5 3 2.5 2 0 2.5-1 3.5-1s2 1 3.5 1c1.5 0 2.5-1 2.5-2.5 0-1-.5-1.5-1-2.5 0-1 1-2 1-3.5 0-2-1.5-3.5-3.5-3.5\"/></svg>",
    "pills": [
      [
        "Kestirme & Robot Fırça",
        "firca",
        true
      ],
      [
        "Rulo & Ekipman",
        "rulo",
        false
      ],
      [
        "Spatula & Aşındırıcı",
        "spatula",
        false
      ]
    ]
  }
];

  // 1. HERO SLIDER & TRANSPARENT HEADER OBSERVER
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

  if (stage) {
    var track = document.getElementById("pvStageTrack");
    var slides = stage.querySelectorAll(".pv-stage-slide");
    var dots = stage.querySelectorAll(".pv-stage-dot");
    var progressBar = document.getElementById("pvStageProgress");
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

      dots.forEach(function(dot, idx) {
        dot.classList.toggle("active", idx === index);
      });

      if (progressBar) {
        var percent = ((index + 1) / totalSlides) * 100;
        progressBar.style.width = percent + "%";
      }
    }

    function startAutoPlay() {
      stopAutoPlay();
      autoPlayTimer = setInterval(function() {
        var next = (currentIndex + 1) % totalSlides;
        syncActiveState(next);
      }, 5500);
    }

    function stopAutoPlay() {
      if (autoPlayTimer) clearInterval(autoPlayTimer);
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function() {
        stopAutoPlay();
        var prev = (currentIndex - 1 + totalSlides) % totalSlides;
        syncActiveState(prev);
        startAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function() {
        stopAutoPlay();
        var next = (currentIndex + 1) % totalSlides;
        syncActiveState(next);
        startAutoPlay();
      });
    }

    dots.forEach(function(dot) {
      dot.addEventListener("click", function() {
        stopAutoPlay();
        var targetIdx = parseInt(dot.getAttribute("data-slide"), 10);
        syncActiveState(targetIdx);
        startAutoPlay();
      });
    });

    syncActiveState(0);
    startAutoPlay();
  }

  // 2. STICKY SUBNAV / TABS / DRAWER / SCROLLSPY
  var subnavLinks = document.querySelectorAll(".pv-subnav-link");
  var deptPanels = document.querySelectorAll(".pv-dept-panel");
  var currentActiveTab = "toolsSealantsPanel";

  function switchTab(targetId) {
    currentActiveTab = targetId;

    subnavLinks.forEach(function(link) {
      var matches = link.getAttribute("data-target") === targetId;
      link.classList.toggle("active", matches);
      link.setAttribute("aria-selected", matches ? "true" : "false");
    });

    deptPanels.forEach(function(panel) {
      var match = (panel.id === targetId);
      panel.classList.toggle("active", match);
      panel.style.display = match ? "" : "none";
    });

    var activeDept = DEPARTMENTS_DATA.find(function(d) { return d.id === targetId; });
    var activeLabel = document.getElementById("pvDrawerActiveLabel");
    if (activeLabel && activeDept) {
      activeLabel.textContent = activeDept.short;
    }

    renderDeptDrawer(targetId);
    syncMobileFilterRail(targetId);
  }

  subnavLinks.forEach(function(link) {
    link.addEventListener("click", function() {
      var target = link.getAttribute("data-target");
      if (target) {
        switchTab(target);
        var hub = document.getElementById("pvSubnavHub");
        if (hub) {
          var hubRect = hub.getBoundingClientRect();
          var offsetTop = window.pageYOffset + hubRect.top - 80;
          window.scrollTo({ top: offsetTop, behavior: "smooth" });
        }
      }
    });
  });

  // 3. PILL FILTERING SYSTEM
  document.querySelectorAll(".pv-dept-panel").forEach(function(panel) {
    var pills = panel.querySelectorAll(".pv-pill-btn");
    var rows = panel.querySelectorAll(".pv-menu-row");

    pills.forEach(function(pill) {
      pill.addEventListener("click", function() {
        pills.forEach(function(p) { p.classList.remove("active"); });
        pill.classList.add("active");

        var filter = pill.getAttribute("data-filter");
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
  });

  // 4. MOBILE DRAWER & HORIZONTAL RAIL
  var deptDrawerTrigger = document.getElementById("pvMobileDrawerTrigger");
  var deptDrawerBackdrop = document.getElementById("pvDeptDrawerBackdrop");
  var deptDrawerClose = document.getElementById("pvDeptDrawerClose");
  var deptDrawerList = document.getElementById("pvDeptDrawerList");
  var mobileFilterRail = document.getElementById("pvMobileFilterRail");

  function renderDeptDrawer(activeId) {
    if (!deptDrawerList) return;
    deptDrawerList.innerHTML = "";

    DEPARTMENTS_DATA.forEach(function(dept) {
      var item = document.createElement("button");
      item.type = "button";
      item.className = "pv-drawer-item" + (dept.id === activeId ? " active" : "");
      item.innerHTML = [
        '<div class="pv-drawer-item-left">',
        '  <div class="pv-drawer-icon-box" aria-hidden="true">' + (dept.icon || '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>') + '</div>',
        '  <div class="pv-drawer-text-stack">',
        '    <span class="pv-drawer-item-title">' + dept.short + '</span>',
        '    <span class="pv-drawer-item-sub">' + dept.sub + '</span>',
        '  </div>',
        '</div>',
        '<div class="pv-drawer-item-right" aria-hidden="true">',
        '  <svg class="pv-drawer-item-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',
        '</div>'
      ].join("");

      item.addEventListener("click", function() {
        switchTab(dept.id);
        closeDeptDrawer();
        var hub = document.getElementById("pvSubnavHub");
        if (hub) {
          var hubRect = hub.getBoundingClientRect();
          window.scrollTo({ top: window.pageYOffset + hubRect.top - 70, behavior: "smooth" });
        }
      });

      deptDrawerList.appendChild(item);
    });
  }

  function syncMobileFilterRail(targetId) {
    if (!mobileFilterRail) return;
    mobileFilterRail.innerHTML = "";

    var activePanel = document.getElementById(targetId);
    if (!activePanel) return;

    var originalPills = activePanel.querySelectorAll(".pv-pill-btn");
    originalPills.forEach(function(op) {
      var chip = document.createElement("button");
      chip.type = "button";
      chip.className = "pv-rail-chip" + (op.classList.contains("active") ? " active" : "");
      chip.textContent = op.textContent;
      chip.setAttribute("data-filter", op.getAttribute("data-filter"));

      chip.addEventListener("click", function() {
        op.click();
        mobileFilterRail.querySelectorAll(".pv-rail-chip").forEach(function(c) { c.classList.remove("active"); });
        chip.classList.add("active");
      });

      mobileFilterRail.appendChild(chip);
    });
  }

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

  if (deptDrawerTrigger) deptDrawerTrigger.addEventListener("click", openDeptDrawer);
  if (deptDrawerClose) deptDrawerClose.addEventListener("click", closeDeptDrawer);
  if (deptDrawerBackdrop) {
    deptDrawerBackdrop.addEventListener("click", function(e) {
      if (e.target === deptDrawerBackdrop) closeDeptDrawer();
    });
  }

  // 5. ARCHITECTURAL PRODUCT DETAIL MODAL
  var modalBackdrop = document.getElementById("pvModalBackdrop");
  var modalCard = document.getElementById("pvModalCard");
  var modalCloseBtn = document.getElementById("pvModalCloseBtn");
  var modalProductEyebrow = document.getElementById("modalProductEyebrow");
  var modalProductTitle = document.getElementById("modalProductTitle");
  var modalProductBadges = document.getElementById("modalProductBadges");
  var modalProductDesc = document.getElementById("modalProductDesc");
  var modalPackagingSection = document.getElementById("modalPackagingSection");
  var modalSelectedSizeHint = document.getElementById("modalSelectedSizeHint");
  var modalSizeChips = document.getElementById("modalSizeChips");
  var modalProductImg = document.getElementById("modalProductImg");
  var modalSpecsTable = document.getElementById("modalSpecsTable");
  var modalAccordionsWrap = document.getElementById("modalAccordionsWrap");
  var modalWaBtn = document.getElementById("modalWaBtn");

  var currentModalProduct = null;
  var selectedPackagingSize = "";

  function openModal(productId) {
    var product = TOOLS_PRODUCTS_DATA.find(function(p) { return p.id === productId; });
    if (!product) return;

    currentModalProduct = product;
    selectedPackagingSize = product.sizes && product.sizes.length ? product.sizes[0] : "";

    if (modalProductTitle) modalProductTitle.textContent = product.name;
    if (modalProductDesc) modalProductDesc.textContent = product.desc;
    if (modalProductImg) {
      modalProductImg.src = product.thumb || "";
      modalProductImg.alt = product.name || "";
    }
    if (modalProductEyebrow) {
      modalProductEyebrow.textContent = "PERVAN · " + product.tag.toUpperCase();
    }

    if (modalProductBadges) {
      modalProductBadges.innerHTML = "";
      if (product.badge) {
        var b = document.createElement("span");
        b.className = "pv-specimen-badge";
        b.textContent = product.badge;
        modalProductBadges.appendChild(b);
      }
      if (product.meta && product.meta.length) {
        product.meta.forEach(function(m) {
          var mb = document.createElement("span");
          mb.className = "pv-specimen-badge-sub";
          mb.textContent = m;
          modalProductBadges.appendChild(mb);
        });
      }
    }

    if (modalSizeChips) {
      modalSizeChips.innerHTML = "";
      if (product.sizes && product.sizes.length) {
        if (modalPackagingSection) modalPackagingSection.style.display = "";
        product.sizes.forEach(function(size, idx) {
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
            selectedPackagingSize = size;
            updateModalWaHref();
            if (modalSelectedSizeHint) modalSelectedSizeHint.textContent = size;
          });

          modalSizeChips.appendChild(chip);
        });
        if (modalSelectedSizeHint) modalSelectedSizeHint.textContent = product.sizes[0];
      } else {
        if (modalPackagingSection) modalPackagingSection.style.display = "none";
      }
    }

    if (modalSpecsTable) {
      modalSpecsTable.innerHTML = "";
      var specLabels = {
        standard: "Kalite & Standardı",
        packaging: "Ambalaj & Kutu",
        consumption: "Uygulama / Tüketim",
        mixingRatio: "Uygulama Yöntemi",
        potLife: "Kuruma / Kürlenme Süresi",
        logistics: "Lojistik & Sevk"
      };

      if (product.specs) {
        for (var key in product.specs) {
          if (product.specs.hasOwnProperty(key)) {
            var dt = document.createElement("dt");
            dt.textContent = specLabels[key] || key;
            var dd = document.createElement("dd");
            dd.textContent = product.specs[key];
            modalSpecsTable.appendChild(dt);
            modalSpecsTable.appendChild(dd);
          }
        }
      }
    }

    if (modalAccordionsWrap) {
      modalAccordionsWrap.innerHTML = "";
      if (product.accordions && product.accordions.length) {
        product.accordions.forEach(function(acc, idx) {
          var details = document.createElement("details");
          details.className = "pv-accordion-item";
          if (idx === 0) details.open = true;

          var summary = document.createElement("summary");
          summary.className = "pv-accordion-summary";
          summary.innerHTML = '<span>' + acc.title + '</span><svg class="pv-accordion-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>';

          var body = document.createElement("div");
          body.className = "pv-accordion-body";
          body.innerHTML = '<p>' + acc.body + '</p>';

          details.appendChild(summary);
          details.appendChild(body);
          modalAccordionsWrap.appendChild(details);
        });
      }
    }

    updateModalWaHref();

    if (modalBackdrop) {
      modalBackdrop.classList.add("is-open");
      modalBackdrop.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
  }

  function updateModalWaHref() {
    if (!modalWaBtn || !currentModalProduct) return;
    var msg = "Merhaba, " + currentModalProduct.name;
    if (selectedPackagingSize) {
      msg += " (" + selectedPackagingSize + ")";
    }
    msg += " için stok durumu ve şantiye teslim fiyatı almak istiyorum.";
    modalWaBtn.href = "https://wa.me/905323844497?text=" + encodeURIComponent(msg);
  }

  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove("is-open");
    modalBackdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", function(e) {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  /* Attach click listeners to static product rows and modal buttons */
  document.querySelectorAll(".pv-menu-row").forEach(function(row) {
    var pid = row.getAttribute("data-product-id") || row.getAttribute("data-id");
    row.addEventListener("click", function(e) {
      if (e.target.closest(".pv-row-wa-direct") || e.target.closest("a")) return;
      if (pid) openModal(pid);
    });
    row.addEventListener("keydown", function(e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (pid) openModal(pid);
      }
    });
  });

  document.querySelectorAll(".pv-open-modal-btn").forEach(function(btn) {
    btn.addEventListener("click", function(e) {
      e.stopPropagation();
      var pid = btn.getAttribute("data-product-id");
      if (pid) openModal(pid);
    });
  });

  // 6. SPOTLIGHT COMMAND PALETTE ENGINE (⌘K / 30 Ürün Arama)
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
    return d ? d.short : "El Aletleri";
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

    var featured = TOOLS_PRODUCTS_DATA.slice(0, 8);
    var heading = document.createElement("div");
    heading.className = "pv-spotlight-group-title";
    heading.textContent = "Öne Çıkan Mastik, Silikon & El Aletleri";
    spotlightResults.appendChild(heading);

    featured.forEach(function(item) {
      spotlightResults.appendChild(createSpotlightItemEl(item));
    });

    if (spotlightCount) {
      spotlightCount.textContent = TOOLS_PRODUCTS_DATA.length + " Ürün Kataloğu";
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
    var matches = TOOLS_PRODUCTS_DATA.filter(function(item) {
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
        '<p class="pv-spotlight-empty-title">"' + query + '" için eşleşen ürün bulunamadı</p>',
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
        var p = TOOLS_PRODUCTS_DATA.find(function(it) { return it.id === pid; });
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

  // INITIAL SETUP
  renderDeptDrawer("toolsSealantsPanel");
  syncMobileFilterRail("toolsSealantsPanel");
})();
