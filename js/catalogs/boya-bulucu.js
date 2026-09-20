/* ==========================================================================
   PERVAN ARCHITECTURAL PROGRESSIVE DIAGNOSTIC FLOW (MOBILE-FIRST)
   24 Master Chemical Paint & Coating Prescriptions Controller (Product-First)
   ========================================================================== */

(function() {
  'use strict';

  var recipes = [
    // --- GRUP A: İÇ MEKAN & SAĞLIK (5) ---
    {
      id: "rec-01-zemin-nem-tuz",
      code: "REC-01",
      group: "ic-mekan",
      groupTitle: "İç Mekan & Sağlık",
      title: "İzmir Zemin Kat Taban Nemi & Kılcal Tuz Kalkanı",
      badge: "Nem & Tuz Kusması Kalkanı",
      tagClass: "tag-blue",
      bestFor: "Balçova, Narlıdere, Karşıyaka zemin/bodrum katlarda kışın kabaran nemli sıvalar",
      problems: ["rutubet-nem"],
      antiPattern: "Nemli duvara standart su bazlı saten alçı astarı sürmek. Astar tuzla reaksiyona girip 3 ayda patlar.",
      binder: "Polimer Reçine + Mikrokürecik",
      dryingTime: "4 - 6 Saat (Katlar arası)",
      cureTime: "7 Gün (Tam Su Bariyeri)",
      heroImg: "assets/isonem-official/isonem-ms-82.png",
      layers: {
        prep: "Tel fırça ile kabaran sıva sağlam betona kadar kazınır; serbest tuz temizlenir.",
        primer: { name: "İsonem MS 82 Rutubet Boyası", rate: 0.50, unit: "kg", packSize: 5, img: "assets/isonem-official/isonem-ms-82.png" },
        finish: { name: "İsonem Thermal Paint / Filli İndeko-W", rate: 1.00, unit: "L", packSize: 15, img: "assets/isonem-official/isonem-thermal-paint.png" },
        tool: { name: "6mm Solvent Rulosu + Çelik Fırça", img: "assets/filli-official/saten-rulo.png" }
      }
    },
    {
      id: "rec-02-kapali-yazlik-kuf",
      code: "REC-02",
      group: "ic-mekan",
      groupTitle: "İç Mekan & Sağlık",
      title: "Kışın 8 Ay Kapalı Kalan Yazlık Ev (Ağır Küf & Koku)",
      badge: "Gümüş İyonlu Anti-Küf Kalkanı",
      tagClass: "tag-blue",
      bestFor: "Çeşme, Alaçatı, Seferihisar'da kış boyu kapalı kalan yazlıklarda oluşan ağır koku ve küf",
      problems: ["rutubet-nem"],
      antiPattern: "Küflü yüzeyi zımparalamak. Küf sporları havaya karışıp tüm odaya yayılır; önce kimyasal yakılmalıdır.",
      binder: "Fungisit Katkılı Saf Akrilik",
      dryingTime: "3 - 4 Saat",
      cureTime: "24 Saat",
      heroImg: "assets/filli-official/momento-silan.png",
      layers: {
        prep: "Klor bazlı küf temizleyici solüsyon ile yüzeydeki mantar sporlarının kimyasal olarak yakılması.",
        primer: { name: "Filli Boya Şeffaf Astar (Fungisitli)", rate: 0.05, unit: "L", packSize: 15, img: "assets/filli-official/seffaf-astar.png" },
        finish: { name: "Filli Boya İndeko-W (Anti-Küf & Gümüş İyonlu)", rate: 0.12, unit: "L", packSize: 15, img: "assets/filli-official/momento-silan.png" },
        tool: { name: "12mm Mikrofiber Saten Rulo", img: "assets/filli-official/ipeksi-rulo.png" }
      }
    },
    {
      id: "rec-03-cocuklu-ev-silinebilir",
      code: "REC-03",
      group: "ic-mekan",
      groupTitle: "İç Mekan & Sağlık",
      title: "Çocuklu Ev & Salon Tam Silinebilir İpek Mat Zırh",
      badge: "Leke Savar İpek Mat",
      tagClass: "tag-blue",
      bestFor: "Salon, koridor ve çocuk odalarında defalarca silinse dahi parlamayan pürüzsüz doku",
      problems: ["silinebilir"],
      antiPattern: "Alçı sıva üstüne astarsız boya sürmek. Boyanın bağlayıcısı alçıya kaçar; silindiğinde boya beze çıkar.",
      binder: "Silikonlu Saf Akrilik Kopolimer",
      dryingTime: "2 - 4 Saat",
      cureTime: "72 Saat (Tam Silinebilirlik)",
      heroImg: "assets/filli-official/momento-max.png",
      layers: {
        prep: "Yüzey tozu ve macun çapaklarının mikrofiber bezle temizlenmesi.",
        primer: { name: "Filli Boya Şeffaf / Saten Astar", rate: 0.04, unit: "L", packSize: 15, img: "assets/filli-official/seffaf-astar.png" },
        finish: { name: "Filli Boya Momento Max İpek Mat", rate: 0.12, unit: "L", packSize: 15, img: "assets/filli-official/momento-max.png" },
        tool: { name: "10-12mm İpeksi Saten Rulo + Kestirme", img: "assets/filli-official/ipeksi-rulo.png" }
      }
    },
    {
      id: "rec-04-yangin-is-su-lekesi",
      code: "REC-04",
      group: "ic-mekan",
      groupTitle: "İç Mekan & Sağlık",
      title: "Yangın İsi, Nikotin, Sarı Su Lekesi & Tanen Blokajı",
      badge: "Kusma Engelleyici Leke Bariyeri",
      tagClass: "tag-amber",
      bestFor: "Su borusu patlağı sararmaları, baca isi ve yoğun sigara katranı lekelerini tek katta kilitleme",
      problems: ["silinebilir"],
      antiPattern: "Su lekesini su bazlı tavan boyasıyla 5 kat boyamak. Su bazlı boya lekeyi çözer ve tekrar yüzeye taşır.",
      binder: "Katyonik Reçine Esaslı Bariyer",
      dryingTime: "2 Saat",
      cureTime: "24 Saat",
      heroImg: "assets/marshall-official/fit-örtücü-i̇ç-cephe-astarı.png",
      layers: {
        prep: "Kaba is ve gevşek katmanların kuru bezle temizlenmesi.",
        primer: { name: "Caparol TriMaXX Leke Örtücü Bariyer Astar", rate: 0.15, unit: "L", packSize: 2.5, img: "assets/filli-official/astarix.png" },
        finish: { name: "Filli Momento Silan Silinebilir", rate: 0.12, unit: "L", packSize: 15, img: "assets/filli-official/momento-silan.png" },
        tool: { name: "Kısa Havlı Solvent Rulosu", img: "assets/filli-official/saten-rulo.png" }
      }
    },
    {
      id: "rec-05-hizli-teslim-tavan",
      code: "REC-05",
      group: "ic-mekan",
      groupTitle: "İç Mekan & Sağlık",
      title: "Hızlı Teslim Daire, Şantiye & Ultra Beyaz Tavan",
      badge: "Ekonomik & Ultra Beyaz",
      tagClass: "tag-blue",
      bestFor: "Kiralık daire teslimi, hızlı şantiye kapatma; sıçratmayan tavan ve yüksek örtücülü iç cephe",
      problems: ["silinebilir"],
      antiPattern: "Tavana plastik duvar boyası vurmak. Işık yansımalarında dalgalanma ve fırça izi yapar.",
      binder: "Akrilik Kopolimer Mat Dolgu",
      dryingTime: "2 Saat",
      cureTime: "24 Saat",
      heroImg: "assets/filli-official/betakril-tavan.png",
      layers: {
        prep: "Yüzeydeki toz ve örümcek ağlarının süpürülmesi.",
        primer: { name: "Fawori Konsantre Astar", rate: 0.03, unit: "L", packSize: 15, img: "assets/fawori/konsantre-astar.webp" },
        finish: { name: "Filli Boya Betakril Ekstra Plastik Tavan", rate: 0.20, unit: "kg", packSize: 17.5, img: "assets/filli-official/betakril-tavan.png" },
        tool: { name: "Damlatmayan Tavan Rulosu + Sırık", img: "assets/filli-official/plasbo-rulo.png" }
      }
    },

    // --- GRUP B: DIŞ CEPHE & KIYI İKLİMİ (5) ---
    {
      id: "rec-06-cesme-sahil-zirhi",
      code: "REC-06",
      group: "dis-cephe",
      groupTitle: "Dış Cephe & Kıyı İklimi",
      title: "Çeşme & Alaçatı Sahil Bandı Ağır Tuz / UV Dış Cephe Zırhı",
      badge: "%100 Saf Akrilik Sahil Kalkanı",
      tagClass: "tag-blue",
      bestFor: "Kıyı şeridinde tuz sisi, sert poyraz ve 40°C güneş altında çatlayan/solan dış cepheler",
      problems: ["ege-gunesi"],
      antiPattern: "Sahil villasına standart akrilik boya sürmek. Tuz kristalleri 1 yılda boyayı patlatır.",
      binder: "%100 Saf Akrilik Reçine",
      dryingTime: "4 - 6 Saat",
      cureTime: "48 Saat",
      heroImg: "assets/fawori/fenomen-saf-akrilik-dis-cephe-boyasi.webp",
      layers: {
        prep: "Yüksek basınçlı suyla yüzeydeki tuz ve gevşek katmanların yıkanması.",
        primer: { name: "Fawori Dış Cephe Silikonlu Astar", rate: 0.15, unit: "kg", packSize: 20, img: "assets/fawori/tempo-silikonlu-dis-cephe-astari.webp" },
        finish: { name: "Fawori Fenomen %100 Saf Akrilik Dış Cephe", rate: 0.20, unit: "L", packSize: 15, img: "assets/fawori/fenomen-saf-akrilik-dis-cephe-boyasi.webp" },
        tool: { name: "20mm Polyamid Dış Cephe Rulosu", img: "assets/fawori/dis-cephe-rulosu.webp" }
      }
    },
    {
      id: "rec-07-termal-catlak-kopru",
      code: "REC-07",
      group: "dis-cephe",
      groupTitle: "Dış Cephe & Kıyı İklimi",
      title: "Gece-Gündüz Termal Şok İçin %300 Elastik Çatlak Köprüleme",
      badge: "%300 Esnek Membran",
      tagClass: "tag-amber",
      bestFor: "Gündüz 42°C gece 20°C sıcaklık farkından kaynaklanan dış cephe kılcal sıva çatlaklarını yutma",
      problems: ["ege-gunesi"],
      antiPattern: "Hareketli kılcal çatlakların üzerine sert akrilik boya sürmek. İlk kış genleşmesinde boya yarılır.",
      binder: "Elastomerik Akrilik Reçine",
      dryingTime: "6 Saat",
      cureTime: "72 Saat",
      heroImg: "assets/marshall-official/akrikor-su-kalkanı-elyaflı.png",
      layers: {
        prep: "Geniş çatlakların elastik akrilik macun ile doldurulması.",
        primer: { name: "Capatect Elastomerik Astar", rate: 0.15, unit: "kg", packSize: 20, img: "assets/filli-official/dis-cephe-astar.png" },
        finish: { name: "Fawori Elastik Dış Cephe Kaplaması", rate: 0.35, unit: "kg", packSize: 20, img: "assets/fawori/fawori-premium-silikonlu--dis-cephe-boyasi.webp" },
        tool: { name: "Dış Cephe Rulosu + Macun Spatulası", img: "assets/fawori/dis-cephe-rulosu.webp" }
      }
    },
    {
      id: "rec-08-grenli-dokulu-kaplama",
      code: "REC-08",
      group: "dis-cephe",
      groupTitle: "Dış Cephe & Kıyı İklimi",
      title: "Grenli Tekstürlü Dış Cephe & Kusur Kamuflajı",
      badge: "Kalın Tekstür & Kusur Örtücü",
      tagClass: "tag-blue",
      bestFor: "Dalgalı ve sıva hatalı eski bina cephelerinde homojen kalın doku sağlama",
      problems: ["ege-gunesi"],
      antiPattern: "Sıva hatası olan yüzeye düz mat boya sürmek. Işık vurduğunda tüm dalgalanmalar belirginleşir.",
      binder: "Silikon Emülsiyon + Doğal Mermer Taneciği",
      dryingTime: "12 Saat",
      cureTime: "7 Gün",
      heroImg: "assets/fawori/fawori-silikonlu-grenli-kaplama.webp",
      layers: {
        prep: "Gevşek sıvaların raspalanması ve tamir harcı uygulaması.",
        primer: { name: "Fawori Dış Cephe Astarı", rate: 0.15, unit: "kg", packSize: 20, img: "assets/fawori/fawori-premium-dis-cephe-astari.webp" },
        finish: { name: "Fawori Silikonlu Grenli Dış Kaplama", rate: 1.00, unit: "kg", packSize: 25, img: "assets/fawori/fawori-silikonlu-grenli-kaplama.webp" },
        tool: { name: "İri Gözenekli Mercan Rulo", img: "assets/filli-official/mercan-rulo.png" }
      }
    },
    {
      id: "rec-09-mantolama-mineral-siva",
      code: "REC-09",
      group: "dis-cephe",
      groupTitle: "Dış Cephe & Kıyı İklimi",
      title: "Capatect / Optimix Mantolama Üzeri Mineral Dış Cephe",
      badge: "Yüksek Su Buharı Geçirgenliği",
      tagClass: "tag-blue",
      bestFor: "Isı yalıtım levhaları üzerindeki dekoratif mineral sıvanın nefes almasını kilitlemeden boyanması",
      problems: ["ege-gunesi"],
      antiPattern: "Mineral sıvanın üzerine nefes almayan sentetik boya vurmak. Isı yalıtım paketinin terleme yapmasına neden olur.",
      binder: "Silikonlu Akrilik Fotokatalitik",
      dryingTime: "4 - 6 Saat",
      cureTime: "48 Saat",
      heroImg: "assets/filli-official/aqusto-silan.png",
      layers: {
        prep: "Mineral sıva prizinin (en az 7 gün) tamamlanması.",
        primer: { name: "Capatect Silikonlu Mineral Sıva Astarı", rate: 0.20, unit: "kg", packSize: 20, img: "assets/filli-official/aqusto-silan-astar.png" },
        finish: { name: "Capatect AmphiSilan Dış Cephe Boyası", rate: 0.22, unit: "L", packSize: 15, img: "assets/filli-official/aqusto-silan.png" },
        tool: { name: "Dış Cephe Polyamid Rulosu", img: "assets/filli-official/dis-cephe-rulosu.png" }
      }
    },
    {
      id: "rec-10-kirec-badana-donusum",
      code: "REC-10",
      group: "dis-cephe",
      groupTitle: "Dış Cephe & Kıyı İklimi",
      title: "Geleneksel Ege Kireç Badanasından Modern Boyaya Geçiş",
      badge: "Tozuma Dondurucu Sabitleyici Astar",
      tagClass: "tag-amber",
      bestFor: "Foça, Şirince, Urla eski köy evlerinde kireç badana tozuması üzerine modern boya tutturma",
      problems: ["ege-gunesi", "rutubet-nem"],
      antiPattern: "Kireçli duvara film oluşturan kalın plastik astar sürmek. Kireç astarla birlikte duvardan ayrılır.",
      binder: "Silikonlu Mikronize Bağlayıcı",
      dryingTime: "4 Saat",
      cureTime: "24 Saat",
      heroImg: "assets/filli-official/momento-brut-beton-astari.png",
      layers: {
        prep: "Kabarık kireç tabakasının kazınması ve tozunun alınması.",
        primer: { name: "Filli Şeffaf Silikonlu Bağlayıcı Astar", rate: 0.15, unit: "L", packSize: 15, img: "assets/filli-official/seffaf-astar.png" },
        finish: { name: "Filli AmphiSilan / Fawori Silikonlu", rate: 0.20, unit: "L", packSize: 15, img: "assets/filli-official/aqusto-sil.png" },
        tool: { name: "Uzun Tüylü Rulo + Kestirme Fırçası", img: "assets/filli-official/ekstra-posteki-rulo.png" }
      }
    },

    // --- GRUP C: DÖNÜŞÜM & FAYANS (3) ---
    {
      id: "rec-11-banyo-fayans-dusakabin",
      code: "REC-11",
      group: "donusum",
      groupTitle: "Dönüşüm & Fayans",
      title: "Kırmadan Banyo Fayansı & Duşakabin İçi Su Geçirmez Dönüşüm",
      badge: "Kırmadan Yenileme & Çift Komponent Sıvı Cam",
      tagClass: "tag-blue",
      bestFor: "Moloz çıkarmadan seramik, fayans ve duşakabin arkası fayansları su geçirmez zırhla yenileme",
      problems: ["donusum-fayans"],
      antiPattern: "Duşakabin içine sıvı cam uygulamamak veya boyadan sonra 48 saat dolmadan duşu kullanmak.",
      binder: "Su Bazlı Saf Akrilik + Çift Komponentli Sıvı Cam",
      dryingTime: "2 - 3 Saat (Katlar arası)",
      cureTime: "7 Gün (Tam Kimyasal Direnç)",
      heroImg: "assets/bianca-official/stella-1-litre_2025-7.png",
      layers: {
        prep: "%99 Saf alkol ile kireç, şampuan ve silikon artıklarının temizlenmesi.",
        primer: { name: "Bianca Stella Saf Akrilik Dönüşüm (1. Kat)", rate: 0.05, unit: "L", packSize: 1, img: "assets/bianca-official/stella-1-litre_2025-7.png" },
        finish: { name: "Bianca Stella Saf Akrilik Dönüşüm (2. Kat)", rate: 0.05, unit: "L", packSize: 1, img: "assets/bianca-official/stella-1-litre_2025-7.png" },
        sealer: { name: "Bianca Maximo Çift Komponentli Sıvı Cam", rate: 0.12, unit: "kg", packSize: 1, img: "assets/bianca-official/bianca-maximo-sivi-cam-packshot.png" },
        tool: { name: "Sünger / Kadife İpek Rulo", img: "assets/filli-official/aqua-reno-kadife-rulo.png" }
      }
    },
    {
      id: "rec-12-mutfak-dolabi-lake",
      code: "REC-12",
      group: "donusum",
      groupTitle: "Dönüşüm & Fayans",
      title: "Mutfak Dolabı & Lake Mobilya Fırça İzsiz Dönüşüm",
      badge: "Sıfır Doku & Çizilmez Zırh",
      tagClass: "tag-blue",
      bestFor: "Mutfak dolapları, vestiyer, kapılar ve MDF lake yüzeylerin fırça izi bırakmadan dönüştürülmesi",
      problems: ["donusum-fayans"],
      antiPattern: "Yağlı mutfak dolabını silmeden boyamak. Yağlı yüzeyde boya balıkgözü yapar ve tutunmaz.",
      binder: "Poliüretan Katkılı Akrilik",
      dryingTime: "2 Saat",
      cureTime: "72 Saat",
      heroImg: "assets/bianca-official/bianca-diamond-parlak-2.png",
      layers: {
        prep: "Mutfak yağından arındırmak için alkolle silme; lake yüzeyde 400 kum hafif zımpara.",
        primer: { name: "Bianca Stella / Aqua Reno® (1. Kat)", rate: 0.05, unit: "L", packSize: 1, img: "assets/filli-official/aqua-reno-mutfak.png" },
        finish: { name: "Bianca Stella / Aqua Reno® (2. Kat)", rate: 0.05, unit: "L", packSize: 1, img: "assets/filli-official/aqua-reno-mutfak.png" },
        sealer: { name: "Bianca Stella Su Bazlı Vernik / Maximo", rate: 0.08, unit: "kg", packSize: 1, img: "assets/bianca-official/bianca-maximo-sivi-cam-packshot.png" },
        tool: { name: "10cm Flok Kadife Rulo", img: "assets/filli-official/aqua-reno-kadife-rulo.png" }
      }
    },
    {
      id: "rec-13-yagli-boyadan-su-bazliya",
      code: "REC-13",
      group: "donusum",
      groupTitle: "Dönüşüm & Fayans",
      title: "Eski Yağlı Boyadan (Sentetik) Su Bazlıya Geçiş",
      badge: "Kimyasal Geçiş Köprüsü",
      tagClass: "tag-amber",
      bestFor: "Eski kapılarda ve duvarlarda bulunan parlak yağlı boyanın üzerine sürülen su bazlı boyanın soyulmasını engelleme",
      problems: ["donusum-fayans"],
      antiPattern: "Eski yağlı boyanın üstüne doğrudan su bazlı boya vurmak. Kuruduktan sonra jelatin gibi soyulur.",
      binder: "Sentetik-Su Bazlı Hibrit Aderans Reçinesi",
      dryingTime: "6 Saat",
      cureTime: "24 Saat",
      heroImg: "assets/fawori/fawori-donusum-astari.webp",
      layers: {
        prep: "180 Kum zımpara ile parlaklığın hafifçe matlaştırılması.",
        primer: { name: "Fawori / Filli Boya Dönüşüm Astarı", rate: 0.12, unit: "kg", packSize: 20, img: "assets/fawori/fawori-donusum-astari.webp" },
        finish: { name: "Filli Boya Aqualux Panel Kapı / Momento Max", rate: 0.10, unit: "L", packSize: 15, img: "assets/filli-official/aqualux.png" },
        tool: { name: "Kadife Rulo + İpek Kıl Fırça", img: "assets/filli-official/ipeksi-rulo.png" }
      }
    },

    // --- GRUP D: TERAS, ÇATI & YALITIM (5) ---
    {
      id: "rec-14-acik-teras-balkon-yalitim",
      code: "REC-14",
      group: "su-yalitimi",
      groupTitle: "Teras, Çatı & Yalıtım",
      title: "Açık Teras, Balkon & Yürünebilir Su Yalıtım Membranı",
      badge: "Güneşe & Yaya Trafiğine Dayanıklı",
      tagClass: "tag-blue",
      bestFor: "Ege kış yağmurlarında alt kata su damlatan açık teraslar ve balkon derz çatlakları",
      problems: ["su-yalitimi"],
      antiPattern: "Pah bandı koymadan köşeleri dönmek. Bina oturduğunda köşe birleşimlerinden su kaçırır.",
      binder: "Poliüretan Hibrit Polimer",
      dryingTime: "6 - 8 Saat",
      cureTime: "7 Gün (Yürünebilir)",
      heroImg: "assets/isonem-official/isonem-sb.png",
      layers: {
        prep: "Derz boşluklarının İsonem PU Mastik ile doldurulması.",
        primer: { name: "İsonem Universal Primer", rate: 0.15, unit: "kg", packSize: 5, img: "assets/isonem-official/isonem-universal-astar.png" },
        finish: { name: "İsonem SB Süper Bileşen", rate: 1.20, unit: "kg", packSize: 18, img: "assets/isonem-official/isonem-sb.png" },
        tool: { name: "Geniş Post Rulo + Pah Bandı", img: "assets/filli-official/ekstra-posteki-rulo.png" }
      }
    },
    {
      id: "rec-15-seffaf-teras-sivi-cam",
      code: "REC-15",
      group: "su-yalitimi",
      groupTitle: "Teras, Çatı & Yalıtım",
      title: "Seramikleri Kırmadan Deseni Bozmayan Şeffaf Sıvı Cam",
      badge: "%100 Şeffaf Su Zırhı",
      tagClass: "tag-blue",
      bestFor: "Teras seramiklerinin desenini kapatmadan alt kata su akışını kesme",
      problems: ["su-yalitimi"],
      antiPattern: "Aşınmış derzleri doldurmadan sıvı cam sürmek. Sıvı cam derz boşluğuna çöker ve hava kabarcığı yapar.",
      binder: "Alifatik Poliüretan Cam Reçinesi",
      dryingTime: "4 - 6 Saat",
      cureTime: "7 Gün",
      heroImg: "assets/isonem-official/isonem-liquid-glass.png",
      layers: {
        prep: "Derz aralarının Weber Su Yalıtımlı Derz Dolgusu ile yenilenmesi.",
        primer: { name: "İsonem Liquid Glass Primer", rate: 0.05, unit: "kg", packSize: 2, img: "assets/isonem-official/isonem-ep-primer.png" },
        finish: { name: "İsonem Liquid Glass Çift Komponentli Sıvı Cam", rate: 0.20, unit: "kg", packSize: 4, img: "assets/isonem-official/isonem-liquid-glass.png" },
        tool: { name: "Kadife İpek Rulo", img: "assets/filli-official/aqua-reno-kadife-rulo.png" }
      }
    },
    {
      id: "rec-16-cool-roof-soguk-cati",
      code: "REC-16",
      group: "su-yalitimi",
      groupTitle: "Teras, Çatı & Yalıtım",
      title: "Ege Güneşi Yansıtıcı 'Soğuk Çatı' (Cool Roof / Termal Yansıtıcı)",
      badge: "%85 Güneş Yansıtma & Isı Düşürme",
      tagClass: "tag-blue",
      bestFor: "Yazın 65°C'ye ulaşan düz beton terasların altındaki yaşam alanını fırına çevirmesini engelleme",
      problems: ["su-yalitimi", "ege-gunesi"],
      antiPattern: "Güneş alan terasa koyu renkli yalıtım yapmak. Isıyı içine çekip betonu çatlatır.",
      binder: "Mikro Seramik Kürecikli Elastomerik Reçine",
      dryingTime: "6 Saat",
      cureTime: "48 Saat",
      heroImg: "assets/isonem-official/isonem-thermal-paint.png",
      layers: {
        prep: "Yüzey temizliği ve çatlak tamirleri.",
        primer: { name: "İsonem Universal Primer", rate: 0.15, unit: "kg", packSize: 5, img: "assets/isonem-official/isonem-universal-astar.png" },
        finish: { name: "İsonem Thermal Roof", rate: 1.00, unit: "kg", packSize: 18, img: "assets/isonem-official/isonem-thermal-paint.png" },
        tool: { name: "Geniş Post Rulo + Teleskopik Sırık", img: "assets/filli-official/ekstra-posteki-rulo.png" }
      }
    },
    {
      id: "rec-17-havuz-poliuretan-zirh",
      code: "REC-17",
      group: "su-yalitimi",
      groupTitle: "Teras, Çatı & Yalıtım",
      title: "Villa Havuz Taban & Perde Poliüretan Su Zırhı",
      badge: "Klor & Tuz Çözeltilerine Dayanıklı",
      tagClass: "tag-blue",
      bestFor: "Klor ve havuz kimyasallarından rengi atan, su kaçıran betonarme havuzların elastik kaplanması",
      problems: ["su-yalitimi"],
      antiPattern: "Nemli betona epoksi/poliüretan havuz boyası sürmek. Nem alttan buharlaşıp boyayı balon gibi şişirir.",
      binder: "Alifatik Poliüretan Çift Komponent",
      dryingTime: "8 Saat",
      cureTime: "10 Gün (Su Dolumu Öncesi)",
      heroImg: "assets/isonem-official/isonem-pool.png",
      layers: {
        prep: "Kireç tortularının temizlenmesi (Nem <%4).",
        primer: { name: "İsonem Pool Astarı", rate: 0.15, unit: "kg", packSize: 4.5, img: "assets/isonem-official/isonem-ep-primer.png" },
        finish: { name: "İsonem Pool Çift Komponentli Havuz Boyası", rate: 0.80, unit: "kg", packSize: 18, img: "assets/isonem-official/isonem-pool.png" },
        tool: { name: "Epoksi Rulosu + Teleskopik Sırık", img: "assets/filli-official/dis-cephe-rulosu.png" }
      }
    },
    {
      id: "rec-18-trapez-sac-sandvic-panel",
      code: "REC-18",
      group: "su-yalitimi",
      groupTitle: "Teras, Çatı & Yalıtım",
      title: "Veranda & Otopark Sandviç Panel / Trapez Sac Vida Başı",
      badge: "Metal Çatı & Vida Su Sızdırmazlığı",
      tagClass: "tag-amber",
      bestFor: "Metal çatılarda termal genleşmeyle gevşeyen vida diplerinden içeri su sızmasını kesme",
      problems: ["su-yalitimi", "metal-pas"],
      binder: "Modifiye Polimer Kauçuk Membran",
      dryingTime: "4 Saat",
      cureTime: "24 Saat",
      heroImg: "assets/tekboya-official/303-antipas-boya.webp",
      layers: {
        prep: "Paslı vida başlarının tel fırçalanması + Bütil Pah Bandı ile sarılması.",
        primer: { name: "TEK Rapid Sac / Antipas Astarı", rate: 0.12, unit: "kg", packSize: 3, img: "assets/tekboya-official/303-antipas-boya.webp" },
        finish: { name: "İsonem SB Elastik Metal Kaplama", rate: 0.80, unit: "kg", packSize: 18, img: "assets/isonem-official/isonem-sb.png" },
        tool: { name: "Bütil Pah Bandı + Fırça", img: "assets/filli-official/standart-siyah-firca.png" }
      }
    },

    // --- GRUP E: AHŞAP, TAŞ & MARİN (4) ---
    {
      id: "rec-19-alacati-tas-emprenye",
      code: "REC-19",
      group: "ahsap-tas",
      groupTitle: "Ahşap, Taş & Marin",
      title: "Alaçatı & Foça Taş Evleri Şeffaf Su İtici Emprenye",
      badge: "Doğal Dokuyu Bozmayan Lotus Etkisi",
      tagClass: "tag-blue",
      bestFor: "Doğal taşın su emip kararması ve derz dökülmesi; taş dokusunun boya ile kapatılmaması",
      problems: ["ahsap-marin"],
      antiPattern: "Doğal taşa vernik veya film oluşturan cila sürmek. Taş nefes alamayınca içeriden ufalanır.",
      binder: "Silan-Siloksan Esaslı Mikro Moleküler",
      dryingTime: "2 Saat",
      cureTime: "24 Saat (Tam Su İticilik)",
      heroImg: "assets/isonem-official/isonem-ms-80.png",
      layers: {
        prep: "Taş yüzeydeki yosun ve kirecin basınçlı suyla yıkanıp kurutulması.",
        primer: { name: "Yüzey Yosun & Kireç Arındırıcı", rate: 0.05, unit: "L", packSize: 1, img: "assets/filli-official/momento-konsantre-astar.png" },
        finish: { name: "İsonem MS 80 Su İtici Taş Koruyucu", rate: 0.20, unit: "L", packSize: 5, img: "assets/isonem-official/isonem-ms-80.png" },
        tool: { name: "Alçak Basınçlı Pompa / Geniş Fırça", img: "assets/filli-official/robot-firca.png" }
      }
    },
    {
      id: "rec-20-pergola-marin-yat-vernigi",
      code: "REC-20",
      group: "ahsap-tas",
      groupTitle: "Ahşap, Taş & Marin",
      title: "Pergola, Veranda & İskele Marin Yat Verniği",
      badge: "Ayna Parlaklığı & Deniz Tuzu Zırhı",
      tagClass: "tag-blue",
      bestFor: "Ege güneşi ve deniz tuzunda kararan, çatlayan ve kurtlanan dış mekan ahşapları",
      problems: ["ahsap-marin", "ege-gunesi"],
      antiPattern: "Emprenye astarı sürmeden doğrudan yat verniği vurmak. Ahşap içeriden kurtlanır ve çürür.",
      binder: "Üretan Alkid Esaslı Parlak Zırh",
      dryingTime: "6 - 8 Saat",
      cureTime: "48 Saat",
      heroImg: "assets/fawori/fawori-marin-yat-vernik.webp",
      layers: {
        prep: "Kararmış ahşapta zımpara; reçineli budakların selülozik tinerle silinmesi.",
        primer: { name: "Marshall Cuprinol Ahşap Koruyucu", rate: 0.10, unit: "L", packSize: 2.5, img: "assets/filli-official/woodmaxx-ahsap-emprenye.png" },
        finish: { name: "Fawori Marin Yat Verniği", rate: 0.14, unit: "L", packSize: 2.5, img: "assets/fawori/fawori-marin-yat-vernik.webp" },
        tool: { name: "Doğal Kıl Yassı Ahşap Fırçası", img: "assets/filli-official/luks-kestirme-firca.png" }
      }
    },
    {
      id: "rec-21-havuz-kenari-teak-deck-yag",
      code: "REC-21",
      group: "ahsap-tas",
      groupTitle: "Ahşap, Taş & Marin",
      title: "Havuz Kenarı Teak / İroko / Deck Yağlama",
      badge: "Doğal Yağ Besleme & Sıfır Soyulma",
      tagClass: "tag-blue",
      bestFor: "Havuz kenarı decklerin güneşte kararması; soyulan vernik yerine nefes alan doğal yağ ihtiyacı",
      problems: ["ahsap-marin"],
      antiPattern: "Yürünen ahşap deck zeminine yat verniği sürmek. Islak ayakla basıldığında kayar ve 6 ayda soyulur.",
      binder: "Doğal Bitkisel Yağ & UV Filtresi",
      dryingTime: "12 Saat",
      cureTime: "24 Saat",
      heroImg: "assets/filli-official/woodmaxx-teak-oil-tik-yagi.png",
      layers: {
        prep: "Teak Temizleyici ile yıkanarak kararmış ahşabın ham renginin açılması.",
        primer: { name: "Teak Temizleyici Arındırıcı", rate: 0.05, unit: "L", packSize: 1, img: "assets/filli-official/momento-konsantre-astar.png" },
        finish: { name: "WoodMaxx Teak Oil (Doğal Tik Yağı)", rate: 0.12, unit: "L", packSize: 2.5, img: "assets/filli-official/woodmaxx-teak-oil-tik-yagi.png" },
        tool: { name: "Geniş Ped Ahşap Sürme Aparatı", img: "assets/filli-official/standart-siyah-firca.png" }
      }
    },
    {
      id: "rec-22-ahsap-panjur-kepenk",
      code: "REC-22",
      group: "ahsap-tas",
      groupTitle: "Ahşap, Taş & Marin",
      title: "Ege Ahşap Panjur & Kepenkleri Esnek Ahşap Boyası",
      badge: "Çatlamayan Elastik Ahşap Zırhı",
      tagClass: "tag-blue",
      bestFor: "Güneş altında genleşip çalışan kepenklerde boyanın çatlayıp dökülmesini engelleme",
      problems: ["ahsap-marin", "ege-gunesi"],
      antiPattern: "Güneş gören ahşap kepenke sert oto boyası veya klasik yağlı boya sürmek. Güneşte dökülür.",
      binder: "Nefes Alan Su Bazlı Akrilik",
      dryingTime: "4 Saat",
      cureTime: "24 Saat",
      heroImg: "assets/filli-official/woodmaxx-color-proof-su-bazli-dis-cephe-ahsap-boyasi.png",
      layers: {
        prep: "Eski dökülen boyanın kazınması ve 120 kum zımpara.",
        primer: { name: "Cuprinol Ahşap Koruyucu Astar", rate: 0.08, unit: "L", packSize: 2.5, img: "assets/filli-official/woodmaxx-color-proof-primer-su-bazli-dis-cephe-ahsap-boyasi-astari.png" },
        finish: { name: "WoodMaxx Color Proof Esnek Ahşap Boyası", rate: 0.12, unit: "L", packSize: 2.5, img: "assets/filli-official/woodmaxx-color-proof-su-bazli-dis-cephe-ahsap-boyasi.png" },
        tool: { name: "İpek Uçlu Ahşap Fırçası", img: "assets/filli-official/kestirme-firca.png" }
      }
    },

    // --- GRUP F: ZEMİN, METAL & SANAYİ (2) ---
    {
      id: "rec-23-ferforje-pas-ustu-metal",
      code: "REC-23",
      group: "metal-zemin",
      groupTitle: "Metal, Zemin & Sanayi",
      title: "Ferforje, Bahçe Kapısı & Sahil Pas Üstü Metal Zırhı",
      badge: "Korozyon Bariyeri & Ayna Parlaklık",
      tagClass: "tag-amber",
      bestFor: "Sahil neminde paslanan demir çitler, garaj kapıları ve ferforjelerin pasını kilitleyip boyama",
      problems: ["metal-pas"],
      antiPattern: "Paslı demire antipas sürmeden doğrudan sentetik boya vurmak. Pas boyanın altından kusar.",
      binder: "Çinko Fosfatlı Antikorozif Alkid",
      dryingTime: "4 - 6 Saat",
      cureTime: "24 Saat",
      heroImg: "assets/tekboya-official/303-antipas-boya.webp",
      layers: {
        prep: "Tel fırça ile kabaran kaba pasın temizlenmesi.",
        primer: { name: "TEK Boya Endüstriyel Rapid Antipas", rate: 0.12, unit: "kg", packSize: 3, img: "assets/tekboya-official/303-antipas-boya.webp" },
        finish: { name: "TEK Sentetik Parlak Yağlı Boya", rate: 0.10, unit: "L", packSize: 2.5, img: "assets/tekboya-official/302-super-luks-sentetik-yagli-boya.webp" },
        tool: { name: "Radyatör / Parmak Rulo + Fırça", img: "assets/filli-official/mini-rulo.png" }
      }
    },
    {
      id: "rec-24-mahzen-garaj-epoksi-zemin",
      code: "REC-24",
      group: "metal-zemin",
      groupTitle: "Metal, Zemin & Sanayi",
      title: "Urla Bağ Yolu / Zeytinyağı Mahzeni & Garaj Ağır Yük Epoksi Zemin",
      badge: "Asit, Yağ & Ağır Yük Dayanımı",
      tagClass: "tag-blue",
      bestFor: "Zeytinyağı/şarap asitlerine, araç lastiği sürtünmesine ve beton tozunmasına karşı hijyenik zemin",
      problems: ["epoksi-zemin"],
      antiPattern: "Yağlı betona astar sürmek. Epoksi betonun gözeneklerine kilitlenemez ve plakalar halinde kalkar.",
      binder: "Çift Komponentli Solventsiz Epoksi Reçine",
      dryingTime: "12 Saat (Yaya)",
      cureTime: "7 Gün (Ağır Araç Trafiği)",
      heroImg: "assets/isonem-official/isonem-floor-2k.png",
      layers: {
        prep: "Beton zeminin elmas silimle pürüzlendirilmesi ve vakumlanması (Nem <%4).",
        primer: { name: "İsonem EP Primer / TEK Epoksi Astar", rate: 0.15, unit: "kg", packSize: 5, img: "assets/isonem-official/isonem-ep-primer.png" },
        finish: { name: "İsonem Floor 2K Çift Komponentli Epoksi Zemin", rate: 0.50, unit: "kg", packSize: 20, img: "assets/isonem-official/isonem-floor-2k.png" },
        tool: { name: "Kirpi Rulo + Epoksi Rulosu", img: "assets/filli-official/dis-cephe-rulosu.png" }
      }
    }
  ];

  // Global State
  var currentStep = 1; // 1: Climate, 2: Problem, 3: Scale/M2, 4: Spec Reveal
  var selectedClimate = "cesme";
  var selectedGroup = "dis-cephe";
  var selectedRecipeId = "rec-06-cesme-sahil-zirhi";
  var selectedAreaM2 = 120;

  // DOM Elements
  var progFill = document.getElementById("psProgFill");
  var stepTracker = document.getElementById("psStepTracker");
  var wizardBackBtn = document.getElementById("psWizardBackBtn");

  var step1View = document.getElementById("psStep1View");
  var step2View = document.getElementById("psStep2View");
  var step3View = document.getElementById("psStep3View");
  var stepAnalyzingView = document.getElementById("psStepAnalyzingView");
  var step4View = document.getElementById("psStep4View");

  var analyzingStatusText = document.getElementById("psAnalyzingStatusText");
  var analyzingMeterFill = document.getElementById("psAnalyzingMeterFill");
  var problemCardList = document.getElementById("psProblemCardList");

  var presetsWrap = document.getElementById("psPresets");
  var inputM2 = document.getElementById("psInputM2");
  var sliderM2 = document.getElementById("psSliderM2");
  var decBtn = document.getElementById("psDecBtn");
  var incBtn = document.getElementById("psIncBtn");
  var calculateBtn = document.getElementById("psCalculateBtn");

  var specRevealContainer = document.getElementById("psSpecRevealContainer");
  var analyzingTimer = null;

  function calculateCoverage(rate, areaM2) {
    return Math.ceil(areaM2 * rate * 10) / 10;
  }

  function getPackagingAdvice(totalQty, unit, packSize) {
    if (!packSize) return totalQty + " " + unit;
    var numPacks = Math.ceil(totalQty / packSize);
    return totalQty + " " + unit + " (" + numPacks + " x " + packSize + " " + unit + " Ambalaj)";
  }

  function getRecipesForClimate(climate) {
    if (climate === "cesme") {
      var cesmeIds = ["rec-06-cesme-sahil-zirhi", "rec-07-termal-catlak-kopru", "rec-08-grenli-dokulu-kaplama", "rec-10-kirec-badana-donusum", "rec-14-acik-teras-balkon-yalitim", "rec-16-cool-roof-soguk-cati", "rec-20-pergola-marin-yat-vernigi"];
      return recipes.filter(function(r) { return cesmeIds.indexOf(r.id) !== -1; });
    } else if (climate === "balcova") {
      var balcovaIds = ["rec-01-zemin-nem-tuz", "rec-02-kapali-yazlik-kuf", "rec-04-yangin-is-su-lekesi", "rec-14-acik-teras-balkon-yalitim", "rec-15-seffaf-teras-sivi-cam", "rec-17-havuz-poliuretan-zirh"];
      return recipes.filter(function(r) { return balcovaIds.indexOf(r.id) !== -1; });
    } else if (climate === "urla") {
      var urlaIds = ["rec-19-alacati-tas-emprenye", "rec-20-pergola-marin-yat-vernigi", "rec-21-havuz-kenari-teak-deck-yag", "rec-22-ahsap-panjur-kepenk", "rec-23-ferforje-pas-ustu-metal", "rec-24-mahzen-garaj-epoksi-zemin"];
      return recipes.filter(function(r) { return urlaIds.indexOf(r.id) !== -1; });
    } else if (climate === "izmir") {
      var izmirIds = ["rec-03-cocuklu-ev-silinebilir", "rec-05-hizli-teslim-tavan", "rec-11-banyo-fayans-dusakabin", "rec-12-mutfak-dolabi-lake", "rec-13-yagli-boyadan-su-bazliya", "rec-09-mantolama-mineral-siva"];
      return recipes.filter(function(r) { return izmirIds.indexOf(r.id) !== -1; });
    }
    return recipes.filter(function(r) { return r.group === selectedGroup; });
  }

  function syncClimateCardsHighlight() {
    var climateCards = document.querySelectorAll(".ps-card[data-climate]");
    climateCards.forEach(function(card) {
      var clm = card.getAttribute("data-climate");
      card.classList.toggle("active", clm === selectedClimate);
    });
  }

  function goToStep(step) {
    if (analyzingTimer) {
      clearTimeout(analyzingTimer);
      analyzingTimer = null;
    }

    if (step < 1) step = 1;
    if (step > 4) step = 4;
    currentStep = step;

    // Back Button Visibility
    if (wizardBackBtn) {
      wizardBackBtn.style.visibility = (step > 1) ? "visible" : "hidden";
    }

    // Update Linear Progress Fill & Tracker Text
    if (progFill) {
      var pct = step === 1 ? 25 : (step === 2 ? 50 : (step === 3 ? 75 : 100));
      progFill.style.width = pct + "%";
    }
    if (stepTracker) {
      if (step <= 3) {
        stepTracker.textContent = "ADIM " + step + " / 4";
      } else {
        stepTracker.textContent = "REÇETENİZ HAZIR";
      }
    }

    // Toggle Step Views
    if (step1View) step1View.classList.toggle("active", step === 1);
    if (step2View) step2View.classList.toggle("active", step === 2);
    if (step3View) step3View.classList.toggle("active", step === 3);
    if (stepAnalyzingView) stepAnalyzingView.classList.remove("active");
    if (step4View) step4View.classList.toggle("active", step === 4);

    // Step-specific renderers
    if (step === 1) syncClimateCardsHighlight();
    if (step === 2) renderStep2Problems();
    if (step === 3) syncPresetsHighlight();
    if (step === 4) renderStep4Reveal();

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Step 3.5: Analytical Scanning State (1.15s transition)
  function runAnalyzingAndGoToStep4() {
    if (step1View) step1View.classList.remove("active");
    if (step2View) step2View.classList.remove("active");
    if (step3View) step3View.classList.remove("active");
    if (step4View) step4View.classList.remove("active");
    if (stepAnalyzingView) stepAnalyzingView.classList.add("active");

    if (progFill) progFill.style.width = "90%";
    if (stepTracker) stepTracker.textContent = "FORMÜLE EDİLİYOR...";

    if (analyzingMeterFill) {
      analyzingMeterFill.style.width = '0%';
      setTimeout(function() {
        analyzingMeterFill.style.width = '100%';
      }, 30);
    }

    if (analyzingStatusText) {
      analyzingStatusText.textContent = "İzmir & Ege mikroklima verileri taranıyor...";
    }

    setTimeout(function() {
      if (analyzingStatusText) analyzingStatusText.textContent = "Tuz, nem ve UV bağlayıcı katmanları eşleştiriliyor...";
    }, 350);

    setTimeout(function() {
      if (analyzingStatusText) analyzingStatusText.textContent = "3 parçalı kişiselleştirilmiş reçete seti çıkarılıyor...";
    }, 750);

    analyzingTimer = setTimeout(function() {
      goToStep(4);
    }, 1150);
  }

  // STEP 2: Render Problems with Real Product Packshots
  function renderStep2Problems() {
    if (!problemCardList) return;
    var groupRecipes = getRecipesForClimate(selectedClimate);
    if (groupRecipes.length === 0) {
      groupRecipes = recipes.slice(0, 6);
    }

    var exists = groupRecipes.some(function(r) { return r.id === selectedRecipeId; });
    if (!exists && groupRecipes.length > 0) {
      selectedRecipeId = groupRecipes[0].id;
    }

    var html = '';
    groupRecipes.forEach(function(rec) {
      var isActive = (rec.id === selectedRecipeId);
      html += [
        '<button type="button" class="ps-problem-card' + (isActive ? ' active' : '') + '" data-recipe-id="' + rec.id + '">',
        '  <div class="ps-problem-img-wrap">',
        '    <img src="' + rec.heroImg + '" alt="' + rec.title + '" class="ps-problem-packshot" loading="lazy" />',
        '  </div>',
        '  <div class="ps-problem-info">',
        '    <div class="ps-problem-title">' + rec.title + '</div>',
        '    <div class="ps-problem-desc">' + (rec.bestFor || rec.badge) + '</div>',
        '  </div>',
        '  <div class="ps-problem-radio">',
        '    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>',
        '  </div>',
        '</button>'
      ].join('');
    });

    problemCardList.innerHTML = html;

    problemCardList.querySelectorAll(".ps-problem-card").forEach(function(card) {
      card.addEventListener("click", function() {
        problemCardList.querySelectorAll(".ps-problem-card").forEach(function(c) { c.classList.remove("active"); });
        card.classList.add("active");
        selectedRecipeId = card.getAttribute("data-recipe-id");
        setTimeout(function() {
          goToStep(3);
        }, 180);
      });
    });
  }

  // STEP 4: Render Prose 3-Piece Routine Bento Cards
  function renderStep4Reveal() {
    if (!specRevealContainer) return;
    var rec = recipes.find(function(r) { return r.id === selectedRecipeId; });
    if (!rec) return;

    var primerQty = rec.layers.primer ? calculateCoverage(rec.layers.primer.rate, selectedAreaM2) : 0;
    var finishQty = calculateCoverage(rec.layers.finish.rate, selectedAreaM2);
    var sealerQty = rec.layers.sealer ? calculateCoverage(rec.layers.sealer.rate, selectedAreaM2) : 0;

    var primerText = rec.layers.primer ? getPackagingAdvice(primerQty, rec.layers.primer.unit, rec.layers.primer.packSize) : '';
    var finishText = getPackagingAdvice(finishQty, rec.layers.finish.unit, rec.layers.finish.packSize);
    var sealerText = rec.layers.sealer ? getPackagingAdvice(sealerQty, rec.layers.sealer.unit, rec.layers.sealer.packSize) : '';

    var toolImg = (rec.layers.tool && rec.layers.tool.img) ? rec.layers.tool.img : "assets/filli-official/ipeksi-rulo.png";
    var toolName = (rec.layers.tool && rec.layers.tool.name) ? rec.layers.tool.name : (rec.layers.tool || "Profesyonel Uygulama Ekipmanı");

    var waMsg = "Merhaba Pervan Yetkili Bayi, " + selectedAreaM2 + " m² alanımız için " + rec.code + " (" + rec.title + ") reçetesini çıkardım.\n\n" +
                "📦 " + selectedAreaM2 + " m² İÇİN GEREKLİ MALZEME PAKETİ:\n" +
                (rec.layers.primer ? "• 01 Hazırlık/Astar: " + primerText + " (" + rec.layers.primer.name + ")\n" : "") +
                "• 02 Son Kat Boya: " + finishText + " (" + rec.layers.finish.name + ")\n" +
                (rec.layers.sealer ? "• 03 Koruma Zırhı: " + sealerText + " (" + rec.layers.sealer.name + ")\n" : "") +
                "• Ekipman Kiti: " + toolName + "\n\n" +
                "Urla / Balçova deponuzdan doğrudan şantiyeye sevk ve RenXMatik renk kartelası için şantiye fiyat teklifi alabilir miyim?";
    var waUrl = "https://wa.me/905323844497?text=" + encodeURIComponent(waMsg);

    var html = [
      '<div class="ps-spec-header-card">',
      '  <span class="ps-spec-eyebrow">KİŞİSELLEŞTİRİLMİŞ 3 PARÇALI REÇETE &bull; ' + rec.code + '</span>',
      '  <h2 class="ps-spec-title">' + rec.title + '</h2>',
      '  <div class="ps-spec-meta-pills">',
      '    <span>📍 ' + selectedAreaM2 + ' m² Alan</span>',
      '    <span>&bull;</span>',
      '    <span>⚡ ' + rec.cureTime + '</span>',
      '    <span>&bull;</span>',
      '    <span>🛡️ ' + rec.binder + '</span>',
      '  </div>',
      '</div>',

      '<div class="ps-routine-grid">',

      // Card 1: 01 / HAZIRLIK & ASTAR
      (rec.layers.primer ? [
        '<div class="ps-bento-card">',
        '  <span class="ps-bento-step">01 / HAZIRLIK &amp; ASTAR</span>',
        '  <div class="ps-bento-img-wrap">',
        '    <img src="' + rec.layers.primer.img + '" alt="' + rec.layers.primer.name + '" class="ps-bento-packshot" />',
        '  </div>',
        '  <div class="ps-bento-name">' + rec.layers.primer.name + '</div>',
        '  <div class="ps-bento-qty">' + primerText + '</div>',
        '</div>'
      ].join('') : ''),

      // Card 2: 02 / ÖZEL FORMÜL (SON KAT) - HIGHLIGHTED
      '<div class="ps-bento-card highlight">',
      '  <span class="ps-bento-step">02 / ÖZEL FORMÜL (SON KAT)</span>',
      '  <div class="ps-bento-img-wrap">',
      '    <img src="' + rec.layers.finish.img + '" alt="' + rec.layers.finish.name + '" class="ps-bento-packshot" />',
      '  </div>',
      '  <div class="ps-bento-name">' + rec.layers.finish.name + '</div>',
      '  <div class="ps-bento-qty">' + finishText + '</div>',
      '</div>',

      // Card 3: 03 / UYGULAMA KİTİ veya KORUMA ZIRHI
      '<div class="ps-bento-card">',
      '  <span class="ps-bento-step">' + (rec.layers.sealer ? '03 / KORUMA ZIRHI' : '03 / UYGULAMA KİTİ') + '</span>',
      '  <div class="ps-bento-img-wrap">',
      '    <img src="' + (rec.layers.sealer ? rec.layers.sealer.img : toolImg) + '" alt="' + (rec.layers.sealer ? rec.layers.sealer.name : toolName) + '" class="ps-bento-packshot" />',
      '  </div>',
      '  <div class="ps-bento-name">' + (rec.layers.sealer ? rec.layers.sealer.name : toolName) + '</div>',
      '  <div class="ps-bento-qty">' + (rec.layers.sealer ? sealerText : '1 Set Standart') + '</div>',
      '</div>',

      '</div>',

      '<div class="ps-action-wrap">',
      '  <a href="' + waUrl + '" target="_blank" rel="noopener" class="ps-wa-order-btn">',
      '    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
      '    <span>WhatsApp ile Sipariş Ver &amp; Fiyat Al</span>',
      '  </a>',
      '  <button type="button" class="ps-secondary-btn" id="psRecalculateBtn">',
      '    &larr; Metrajı ve Sorunu Yeniden Düzenle',
      '  </button>',
      '</div>'
    ].join('');

    specRevealContainer.innerHTML = html;

    var recalBtn = document.getElementById("psRecalculateBtn");
    if (recalBtn) {
      recalBtn.addEventListener("click", function() {
        goToStep(3);
      });
    }
  }

  // Event Listeners Initialization
  function initListeners() {
    // Step 1: Climate Cards
    var climateCards = document.querySelectorAll(".ps-card[data-climate]");
    climateCards.forEach(function(card) {
      card.addEventListener("click", function() {
        climateCards.forEach(function(c) { c.classList.remove("active"); });
        card.classList.add("active");
        selectedClimate = card.getAttribute("data-climate") || "cesme";
        selectedGroup = card.getAttribute("data-group") || "dis-cephe";
        var filtered = getRecipesForClimate(selectedClimate);
        if (filtered.length > 0) {
          selectedRecipeId = filtered[0].id;
        }
        setTimeout(function() {
          goToStep(2);
        }, 180);
      });
    });

    // Subnav Back Button
    if (wizardBackBtn) {
      wizardBackBtn.addEventListener("click", function() {
        if (currentStep > 1) {
          goToStep(currentStep - 1);
        }
      });
    }

    // Step 3: Area Presets
    if (presetsWrap) {
      presetsWrap.addEventListener("click", function(e) {
        var chip = e.target.closest(".ps-preset-chip");
        if (!chip) return;
        var m2 = parseInt(chip.getAttribute("data-m2"), 10);
        if (m2 > 0) {
          selectedAreaM2 = m2;
          if (inputM2) inputM2.value = m2;
          if (sliderM2) sliderM2.value = Math.min(500, m2);
          syncPresetsHighlight();
        }
      });
    }

    // Step 3: Steppers & Inputs
    if (decBtn) {
      decBtn.addEventListener("click", function() {
        selectedAreaM2 = Math.max(10, selectedAreaM2 - 10);
        if (inputM2) inputM2.value = selectedAreaM2;
        if (sliderM2) sliderM2.value = Math.min(500, selectedAreaM2);
        syncPresetsHighlight();
      });
    }
    if (incBtn) {
      incBtn.addEventListener("click", function() {
        selectedAreaM2 = Math.min(5000, selectedAreaM2 + 10);
        if (inputM2) inputM2.value = selectedAreaM2;
        if (sliderM2) sliderM2.value = Math.min(500, selectedAreaM2);
        syncPresetsHighlight();
      });
    }
    if (inputM2) {
      inputM2.addEventListener("input", function() {
        var v = parseInt(inputM2.value, 10);
        if (!isNaN(v) && v > 0) {
          selectedAreaM2 = v;
          if (sliderM2) sliderM2.value = Math.min(500, v);
          syncPresetsHighlight();
        }
      });
    }
    if (sliderM2) {
      sliderM2.addEventListener("input", function() {
        var v = parseInt(sliderM2.value, 10);
        selectedAreaM2 = v;
        if (inputM2) inputM2.value = v;
        syncPresetsHighlight();
      });
    }

    // Step 3: Calculate Button
    if (calculateBtn) {
      calculateBtn.addEventListener("click", function() {
        runAnalyzingAndGoToStep4();
      });
    }
  }

  function syncPresetsHighlight() {
    if (inputM2 && document.activeElement !== inputM2) {
      inputM2.value = selectedAreaM2;
    }
    if (sliderM2 && document.activeElement !== sliderM2) {
      sliderM2.value = Math.min(500, selectedAreaM2);
    }
    if (!presetsWrap) return;
    presetsWrap.querySelectorAll(".ps-preset-chip").forEach(function(chip) {
      var m2 = parseInt(chip.getAttribute("data-m2"), 10);
      chip.classList.toggle("active", m2 === selectedAreaM2);
    });
  }

  document.addEventListener("DOMContentLoaded", function() {
    initListeners();
    goToStep(1);
  });

})();
