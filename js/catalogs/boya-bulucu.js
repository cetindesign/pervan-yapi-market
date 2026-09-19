/* ==========================================================================
   PERVAN EGE & İZMİR 24 MASTER BOYA & YALITIM KARAR MOTORU
   Diagnostic Prescription & Package Optimization Engine
   ========================================================================== */

(function() {
  'use strict';

  // 1. 24 MASTER REÇETE VERİTABANI
  var recipes = [
    // --- GRUP A: İÇ MEKAN, SAĞLIK & YAŞAM ALANI ---
    {
      id: "rec-01-zemin-nem-tuz",
      code: "REC-01",
      group: "ic-mekan",
      groupTitle: "İç Mekan & Sağlık",
      title: "İzmir Zemin Kat Taban Nemi & Kılcal Tuz Kalkanı",
      badge: "Rutubet & Tuz Kusması Kalkanı",
      bestFor: "Balçova, Narlıdere, Karşıyaka zemin ve bodrum katlarda kabaran nemli sıvalar",
      problems: ["rutubet-nem", "tuz-kusmasi"],
      surfaces: ["mineral-siva", "brut-beton", "bodrum"],
      brands: ["isonem", "filli"],
      antiPattern: "Nemli duvara standart su bazlı saten alçı astarı sürmek. Astar tuzla reaksiyona girip 3 ayda patlar.",
      layers: {
        prep: "Tel fırça ile kabaran sıva sağlam betona kadar kazınır; serbest tuz temizlenir.",
        primer: { name: "İsonem MS 82 Rutubet Boyası", rate: 0.50, unit: "kg/m²", role: "Tuz ve nem kilitleyici polimerik bariyer (2 Kat)" },
        finish: { name: "İsonem Thermal Paint / Filli İndeko-W", rate: 1.00, unit: "L/m²", role: "Mikrokürecikli terleme ve küf önleyici nefes alan son kat" },
        tool: "6mm Epoksi solvent rulosu + Çelik tel kazıma fırçası"
      },
      img: "assets/isonem/isonem-ms-82.jpg",
      whatsappText: "Merhaba, zemin kat nem ve tuz kusması için Reçete 01 (İsonem MS 82 + Thermal Paint) paket teklifi almak istiyorum."
    },
    {
      id: "rec-02-kapali-yazlik-kuf",
      code: "REC-02",
      group: "ic-mekan",
      groupTitle: "İç Mekan & Sağlık",
      title: "Kışın 8 Ay Kapalı Kalan Yazlık Ev Sendromu (Ağır Küf & Koku)",
      badge: "Gümüş İyonlu Anti-Küf Kalkanı",
      bestFor: "Çeşme, Alaçatı, Seferihisar'da kış boyu kapalı kalan yazlıklarda oluşan ağır koku ve siyah küf",
      problems: ["rutubet-nem", "kuf-havasizlik"],
      surfaces: ["mineral-siva", "alci-alcipan"],
      brands: ["filli"],
      antiPattern: "Küflü yüzeyi kuru zımparalamak. Küf sporları havaya karışıp tüm odaya yayılır; önce kimyasal yok edilmelidir.",
      layers: {
        prep: "Klor bazlı küf temizleyici solüsyon ile yüzeydeki mantar sporlarının yakılması.",
        primer: { name: "Filli Boya Şeffaf Astar (Fungisitli)", rate: 0.05, unit: "L/m²", role: "Derin nüfuz astarı" },
        finish: { name: "Filli Boya İndeko-W", rate: 0.12, unit: "L/m²", role: "Gümüş iyonlu antibakteriyel, mikrop barındırmayan iç cephe boyası (Çift Kat)" },
        tool: "12mm Mikrofiber saten rulo + Koruyucu maske"
      },
      img: "assets/filli/filli-momento-silan.jpg",
      whatsappText: "Merhaba, kapalı kalan yazlık küf problemi için Reçete 02 (Filli İndeko-W Anti-Küf Seti) hakkında fiyat almak istiyorum."
    },
    {
      id: "rec-03-cocuklu-ev-silinebilir",
      code: "REC-03",
      group: "ic-mekan",
      groupTitle: "İç Mekan & Sağlık",
      title: "Çocuklu Ev & Salon Tam Silinebilir İpek Mat Zırh",
      badge: "Leke Savar & Parlama Yapmaz",
      bestFor: "Salon, koridor ve çocuk odalarında defalarca silinse dahi parlamayan pürüzsüz doku",
      problems: ["silinebilir", "leke-tutmaz"],
      surfaces: ["alci-alcipan", "mineral-siva"],
      brands: ["filli", "marshall"],
      antiPattern: "Alçı sıva üstüne astarsız boya sürmek. Boyanın bağlayıcısı alçıya kaçar; silindiğinde boya beze çıkar.",
      layers: {
        prep: "Yüzey tozu ve macun çapaklarının mikrofiber bezle temizlenmesi.",
        primer: { name: "Filli Boya Şeffaf / Saten Astar", rate: 0.04, unit: "L/m²", role: "Emicilik eşitleyici bağlayıcı" },
        finish: { name: "Filli Boya Momento Max İpek Mat", rate: 0.12, unit: "L/m²", role: "Aktif silikonlu tam silinebilir leke tutmaz son kat (Çift Kat)" },
        tool: "10-12mm Tüy bırakmayan mikroelyaf rulo + 3 No İpek kestirme fırçası"
      },
      img: "assets/filli/filli-momento-max.jpg",
      whatsappText: "Merhaba, tam silinebilir salon/oda boyası için Reçete 03 (Filli Momento Max + Astar) fiyatı ve RenXMatik renk kartelası almak istiyorum."
    },
    {
      id: "rec-04-yangin-is-su-lekesi",
      code: "REC-04",
      group: "ic-mekan",
      groupTitle: "İç Mekan & Sağlık",
      title: "Yangın İsi, Nikotin, Sarı Su Lekesi & Tanen Blokajı",
      badge: "Kusma Engelleyici Leke Bariyeri",
      bestFor: "Su borusu patlağı sararmaları, baca isi ve yoğun sigara katranı lekelerini tek katta kilitleme",
      problems: ["leke-tanen-is"],
      surfaces: ["tavan", "alci-alcipan", "mineral-siva"],
      brands: ["filli", "marshall"],
      antiPattern: "Su lekesini su bazlı tavan boyasıyla 5 kat boyamak. Su bazlı boya lekeyi çözer ve tekrar yüzeye taşır.",
      layers: {
        prep: "Kaba is ve gevşek katmanların kuru bezle temizlenmesi (Suyla silinmez).",
        primer: { name: "Caparol TriMaXX / Marshall Leke Örtücü Astar", rate: 0.15, unit: "L/m²", role: "Solvent bazlı leke hapsedici astar" },
        finish: { name: "Filli Betakril Tavan / Momento Silan", rate: 0.12, unit: "L/m²", role: "İstenilen son kat su bazlı boya" },
        tool: "Kısa havlı solvent rulosu + Kestirme fırçası"
      },
      img: "assets/marshall/marshall-sil-sil.jpg",
      whatsappText: "Merhaba, sarı su lekesi/is kapatma için Reçete 04 (Leke Örtücü TriMaXX Bariyer Astar) hakkında bilgi almak istiyorum."
    },
    {
      id: "rec-05-hizli-teslim-tavan",
      code: "REC-05",
      group: "ic-mekan",
      groupTitle: "İç Mekan & Sağlık",
      title: "Hızlı Teslim Daire, Şantiye & Ultra Beyaz Tavan",
      badge: "Maksimum Örtücülük & Sıfır Sıçratma",
      bestFor: "Kiralık daire teslimi, hızlı şantiye kapatma; sıçratmayan tavan ve yüksek örtücülü ekonomik iç cephe",
      problems: ["ekonomik-hizli"],
      surfaces: ["tavan", "mineral-siva"],
      brands: ["filli", "fawori"],
      antiPattern: "Tavana plastik duvar boyası vurmak. Işık yansımalarında dalgalanma ve fırça izi yapar.",
      layers: {
        prep: "Yüzeydeki toz ve örümcek ağlarının süpürülmesi.",
        primer: { name: "Fawori Konsantre Astar (Gerekirse)", rate: 0.03, unit: "L/m²", role: "Yüzey doyurucu" },
        finish: { name: "Filli Boya Betakril Ekstra Plastik Tavan", rate: 0.20, unit: "kg/m²", role: "Ultra beyaz tam mat tavan boyası (Çift Kat)" },
        tool: "Damlatmayan tavan rulosu + Teleskopik uzatma sırığı"
      },
      img: "assets/filli/filli-betakril-tavan.jpg",
      whatsappText: "Merhaba, şantiye/daire tavan ve iç cephe boyası için Reçete 05 (Filli Betakril Tavan + Fawori Plastik) toptan kova fiyatı alabilir miyim?"
    },

    // --- GRUP B: DIŞ CEPHE, KIYI İKLİMİ & MANTOLAMA ---
    {
      id: "rec-06-cesme-sahil-zirhi",
      code: "REC-06",
      group: "dis-cephe",
      groupTitle: "Dış Cephe & Kıyı İklimi",
      title: "Çeşme & Alaçatı Sahil Bandı Ağır Tuz / UV Dış Cephe Zırhı",
      badge: "%100 Saf Akrilik Sahil Kalkanı",
      bestFor: "Kıyı şeridinde tuz sisi, sert poyraz ve 40°C güneş altında 2 yılda çatlayan/solan dış cepheler",
      problems: ["ege-gunesi", "sahil-tuz", "rutubet-nem"],
      surfaces: ["dis-cephe", "brut-beton", "mineral-siva"],
      brands: ["fawori", "filli"],
      antiPattern: "Sahil villasına standart akrilik kopolimer boya sürmek. Tuz kristalleri 1 yılda boyayı patlatır.",
      layers: {
        prep: "Yüksek basınçlı suyla yüzeydeki tuz ve gevşek katmanların yıkanması.",
        primer: { name: "Fawori Dış Cephe Silikonlu Astar", rate: 0.15, unit: "kg/m²", role: "Tozuma kesici ve tuz bloke edici astar" },
        finish: { name: "Fawori Fenomen %100 Saf Akrilik Dış Cephe", rate: 0.20, unit: "L/m²", role: "Tuz geçirmez, UV dayanımlı esnek zırh (Çift Kat)" },
        tool: "20mm Polyamid dış cephe rulosu + Köşe kestirme fırçası"
      },
      img: "assets/fawori/fenomen-saf-akrilik-dis-cephe-boyasi.webp",
      whatsappText: "Merhaba, Çeşme/Urla sahil villamız için Reçete 06 (Fawori Fenomen Saf Akrilik Zırhı) ve şantiye teslim fiyatı almak istiyorum."
    },
    {
      id: "rec-07-termal-catlak-kopru",
      code: "REC-07",
      group: "dis-cephe",
      groupTitle: "Dış Cephe & Kıyı İklimi",
      title: "Gece-Gündüz Termal Şok İçin %300 Elastik Çatlak Köprüleme",
      badge: "%300 Esnek Membran",
      bestFor: "Gündüz 42°C gece 20°C sıcaklık farkından kaynaklanan dış cephe kılcal sıva çatlaklarını yutma",
      problems: ["catlak-siva", "ege-gunesi"],
      surfaces: ["dis-cephe", "mineral-siva"],
      brands: ["fawori", "marshall"],
      antiPattern: "Hareketli kılcal çatlakların üzerine sert akrilik boya sürmek. İlk kış genleşmesinde boya yarılır.",
      layers: {
        prep: "Geniş çatlakların V şeklinde açılıp elastik akrilik macun ile doldurulması.",
        primer: { name: "Capatect / Fawori Elastomerik Astar", rate: 0.15, unit: "kg/m²", role: "Elastik bağlayıcı astar" },
        finish: { name: "Fawori Elastik Dış Cephe Kaplaması", rate: 0.35, unit: "kg/m²", role: "%300 esneme kabiliyetli çatlak köprüleyici membran (Çift Kat)" },
        tool: "Dış cephe rulosu + Çatlak macun spatulası"
      },
      img: "assets/marshall/marshall-akrikor-silikonlu.jpg",
      whatsappText: "Merhaba, dış cephe kılcal sıva çatlakları için Reçete 07 (Elastomerik Çatlak Köprüleme Sistemi) hakkında teklif almak istiyorum."
    },
    {
      id: "rec-08-grenli-dokulu-kaplama",
      code: "REC-08",
      group: "dis-cephe",
      groupTitle: "Dış Cephe & Kıyı İklimi",
      title: "Grenli Tekstürlü Dış Cephe & Kusur Kamuflajı",
      badge: "Kalın Tekstür & Kusur Örtücü",
      bestFor: "Dalgalı ve sıva hatalı eski bina cephelerinde homojen kalın doku sağlama",
      problems: ["siva-hatasi", "estetik-doku"],
      surfaces: ["dis-cephe", "mineral-siva"],
      brands: ["fawori"],
      antiPattern: "Sıva hatası olan yüzeye düz mat boya sürmek. Işık vurduğunda tüm dalgalanmalar belirginleşir.",
      layers: {
        prep: "Gevşek sıvaların raspalanması ve tamir harcı uygulaması.",
        primer: { name: "Fawori Dış Cephe Astarı", rate: 0.15, unit: "kg/m²", role: "Aderans astarı" },
        finish: { name: "Fawori Silikonlu Grenli Dış Cephe Kaplaması", rate: 1.00, unit: "kg/m²", role: "Mercan rulo ile desen verilen kalın silikonlu doku" },
        tool: "İri gözenekli mercan rulo"
      },
      img: "assets/fawori/fawori-silikonlu-grenli-kaplama.webp",
      whatsappText: "Merhaba, dalgalı dış cephe kusurlarını kapatmak için Reçete 08 (Fawori Silikonlu Grenli Kaplama) kova fiyatı alabilir miyim?"
    },
    {
      id: "rec-09-mantolama-mineral-siva",
      code: "REC-09",
      group: "dis-cephe",
      groupTitle: "Dış Cephe & Kıyı İklimi",
      title: "Capatect / Optimix Mantolama Üzeri Mineral Dış Cephe",
      badge: "Yüksek Su Buharı Geçirgenliği",
      bestFor: "Isı yalıtım levhaları üzerindeki dekoratif mineral sıvanın nefes almasını kilitlemeden boyanması",
      problems: ["isi-yalitim", "nefes-alan"],
      surfaces: ["mantolama", "dis-cephe"],
      brands: ["filli", "fawori"],
      antiPattern: "Mineral sıvanın üzerine nefes almayan kalın sentetik boya vurmak. Isı yalıtım paketinin terleme yapmasına neden olur.",
      layers: {
        prep: "Mineral sıva prizinin (en az 7 gün) tamamlanması.",
        primer: { name: "Capatect Silikonlu Mineral Sıva Astarı", rate: 0.20, unit: "kg/m²", role: "Silikonlu astar" },
        finish: { name: "Capatect AmphiSilan Dış Cephe Boyası", rate: 0.22, unit: "L/m²", role: "Fotokatalitik kendi kendini temizleyen silikonlu dış cephe boyası" },
        tool: "Dış cephe polyamid rulosu"
      },
      img: "assets/filli/filli-amphisilan-dis-cephe.jpg",
      whatsappText: "Merhaba, mantolama üzeri mineral sıva boyası için Reçete 09 (Capatect AmphiSilan Seti) fiyatı almak istiyorum."
    },
    {
      id: "rec-10-kirec-badana-donusum",
      code: "REC-10",
      group: "dis-cephe",
      groupTitle: "Dış Cephe & Kıyı İklimi",
      title: "Geleneksel Ege Kireç Badanasından Modern Boyaya Geçiş",
      badge: "Tozuma Dondurucu Sabitleyici Astar",
      bestFor: "Foça, Şirince, Urla eski köy evlerinde kireç badana tozuması üzerine modern boya tutturma",
      problems: ["kirec-tozuma", "eski-yuzey"],
      surfaces: ["kirec-badana", "mineral-siva"],
      brands: ["filli", "fawori"],
      antiPattern: "Kireçli duvara film oluşturan kalın plastik astar sürmek. Kireç astarla birlikte duvardan ayrılır.",
      layers: {
        prep: "Kabarık kireç tabakasının kazınması ve tozunun alınması.",
        primer: { name: "Filli Boya Şeffaf Silikonlu Bağlayıcı Astar (Fixing Primer)", rate: 0.15, unit: "L/m²", role: "Tozuyan kireci dondurup sağlam zemin oluşturan derin astar" },
        finish: { name: "Filli AmphiSilan / Fawori Silikonlu Dış Cephe", rate: 0.20, unit: "L/m²", role: "Nefes alan silikonlu son kat (Çift Kat)" },
        tool: "Uzun tüylü rulo + Kestirme fırçası"
      },
      img: "assets/filli/filli-amphisilan-dis-cephe.jpg",
      whatsappText: "Merhaba, eski kireç badanalı taş/köy evi duvarı için Reçete 10 (Fixing Primer + AmphiSilan) hakkında bilgi almak istiyorum."
    },

    // --- GRUP C: DÖNÜŞÜM, FAYANS & MOBİLYA ---
    {
      id: "rec-11-banyo-fayans-dusakabin",
      code: "REC-11",
      group: "donusum",
      groupTitle: "Dönüşüm & Yenileme",
      title: "Kırmadan Banyo Fayansı & Duşakabin İçi Su Geçirmez Dönüşüm",
      badge: "Kırmadan Yenileme & Çift Komponent Sıvı Cam",
      bestFor: "Moloz çıkarmadan seramik, fayans ve duşakabin arkası fayansları su geçirmez zırhla yenileme",
      problems: ["donusum-fayans", "banyo-mutfak", "su-yalitimi"],
      surfaces: ["fayans-seramik", "banyo-dus"],
      brands: ["bianca"],
      antiPattern: "Duşakabin içine sıvı cam uygulamamak veya boyadan sonra 48 saat dolmadan duşu kullanmak.",
      layers: {
        prep: "%99 Saf izopropil alkol ile kireç, şampuan ve silikon artıklarının temizlenmesi (Asla tuz ruhu kullanılmaz).",
        primer: { name: "Bianca Stella Dönüşüm Boyası (1. Kat)", rate: 0.05, unit: "L/m²", role: "Astarsız doğrudan aderans sağlayan saf akrilik" },
        finish: { name: "Bianca Stella Dönüşüm Boyası (2. Kat)", rate: 0.05, unit: "L/m²", role: "Renk gövdesi" },
        sealer: { name: "Bianca Maximo Çift Komponentli Sıvı Cam", rate: 0.12, unit: "kg/m²", role: "Duşakabin taban ve duvarlarında çizilmez/su geçirmez sır (Çift Kat)" },
        tool: "Sünger / Kadife İpek Rulo + Hassas Sarı Maskeleme Bandı"
      },
      img: "assets/bianca-official/aile_2024.png",
      whatsappText: "Merhaba, banyo fayansı ve duşakabin dönüşümü için Reçete 11 (Bianca Stella + Maximo Sıvı Cam Seti) fiyatı ve renk seçeneklerini öğrenmek istiyorum."
    },
    {
      id: "rec-12-mutfak-dolabi-lake",
      code: "REC-12",
      group: "donusum",
      groupTitle: "Dönüşüm & Yenileme",
      title: "Mutfak Dolabı & Lake Mobilya Fırça İzsiz Dönüşüm",
      badge: "Sıfır Doku & Çizilmez Zırh",
      bestFor: "Mutfak dolapları, vestiyer, kapılar ve MDF lake yüzeylerin fırça izi bırakmadan pürüzsüz dönüştürülmesi",
      problems: ["donusum-mobilya", "banyo-mutfak"],
      surfaces: ["mutfak-dolabi", "lake-ahsap"],
      brands: ["bianca", "filli"],
      antiPattern: "Yağlı mutfak dolabını silmeden boyamak. Yağlı yüzeyde boya balıkgözü yapar ve tutunmaz.",
      layers: {
        prep: "Mutfak yağından arındırmak için alkolle silme; parlak lake yüzeyde 400 kum zımpara ile mikro çizik açma.",
        primer: { name: "Bianca Stella / Filli Aqua Reno® (1. Kat)", rate: 0.05, unit: "L/m²", role: "Doğrudan tutunma" },
        finish: { name: "Bianca Stella / Aqua Reno® (2. Kat)", rate: 0.05, unit: "L/m²", role: "İpek mat / parlak son kat" },
        sealer: { name: "Bianca Stella Su Bazlı Vernik (Kapaklar) / Maximo (Tezgah)", rate: 0.08, unit: "kg/m²", role: "Sürtünme ve çizilme zırhı" },
        tool: "10cm Flok Kadife Rulo + İpek uçlu kestirme fırçası"
      },
      img: "assets/filli/filli-aqua-reno.jpg",
      whatsappText: "Merhaba, mutfak dolapları ve tezgah boyama için Reçete 12 (Dönüşüm Boyası + Vernik Seti) hakkında bilgi ve renk kataloğu alabilir miyim?"
    },
    {
      id: "rec-13-yagli-boyadan-su-bazliya",
      code: "REC-13",
      group: "donusum",
      groupTitle: "Dönüşüm & Yenileme",
      title: "Eski Yağlı Boyadan (Sentetik) Su Bazlıya Geçiş",
      badge: "Kimyasal Geçiş Köprüsü",
      bestFor: "Eski kapılarda ve duvarlarda bulunan parlak yağlı boyanın üzerine sürülen su bazlı boyanın soyulmasını engelleme",
      problems: ["donusum-astar", "eski-yuzey"],
      surfaces: ["sentetik-boya", "kapi-ahsap"],
      brands: ["fawori", "filli"],
      antiPattern: "Eski yağlı boyanın üstüne doğrudan su bazlı boya vurmak. Kuruduktan sonra jelatin gibi soyulur.",
      layers: {
        prep: "180 Kum zımpara ile parlaklığın hafifçe matlaştırılması.",
        primer: { name: "Fawori / Filli Boya Dönüşüm Astarı", rate: 0.12, unit: "kg/m²", role: "Sentetik ile su bazlı arasında kimyasal köprü" },
        finish: { name: "Filli Boya Aqualux Panel Kapı / Momento Max", rate: 0.10, unit: "L/m²", role: "Kokusuz su bazlı son kat (Çift Kat)" },
        tool: "Kadife rulo + İpek kıl fırça"
      },
      img: "assets/fawori/fawori-donusum-astari.webp",
      whatsappText: "Merhaba, eski yağlı boyalı kapı ve duvarları su bazlıya çevirmek için Reçete 13 (Dönüşüm Astarı + Aqualux) seti fiyatı alabilir miyim?"
    },

    // --- GRUP D: TERAS, ÇATI, HAVUZ & SU YALITIMI ---
    {
      id: "rec-14-acik-teras-balkon-yalitim",
      code: "REC-14",
      group: "su-yalitimi",
      groupTitle: "Teras, Çatı & Yalıtım",
      title: "Açık Teras, Balkon & Yürünebilir Su Yalıtım Membranı",
      badge: "Güneşe & Yaya Trafiğine Dayanıklı",
      bestFor: "Ege kış yağmurlarında alt kata su damlatan açık teraslar ve balkon derz çatlakları",
      problems: ["su-yalitimi", "teras-balkon"],
      surfaces: ["teras-balkon", "beton-sap"],
      brands: ["isonem"],
      antiPattern: "Pah bandı koymadan köşeleri dönmek. Bina oturduğunda köşe birleşimlerinden su kaçırır.",
      layers: {
        prep: "Derz boşluklarının İsonem PU Mastik ile doldurulması.",
        primer: { name: "İsonem Universal Primer", rate: 0.15, unit: "kg/m²", role: "Aderans astarı" },
        finish: { name: "İsonem SB Süper Bileşen", rate: 1.20, unit: "kg/m²", role: "Üzerinde yürünebilen UV dayanımlı elastik membran (3 Kat + Pah Bandı)" },
        tool: "Geniş post rulo + Pah bandı + Köşe fırçası"
      },
      img: "assets/isonem/isonem-sb.jpg",
      whatsappText: "Merhaba, teras su sızıntısı için Reçete 14 (İsonem SB Yürünebilir Yalıtım Seti) hakkında metrekare fiyatı almak istiyorum."
    },
    {
      id: "rec-15-seffaf-teras-sivi-cam",
      code: "REC-15",
      group: "su-yalitimi",
      groupTitle: "Teras, Çatı & Yalıtım",
      title: "Seramikleri Kırmadan & Deseni Bozmadan Şeffaf Sıvı Cam Yalıtımı",
      badge: "%100 Şeffaf Su Zırhı",
      bestFor: "Teras seramiklerinin desenini kapatmadan alt kata su akışını kesme (Opak boya istenmeyen durumlar)",
      problems: ["su-yalitimi", "seffaf-koruma"],
      surfaces: ["fayans-seramik", "teras-balkon"],
      brands: ["isonem"],
      antiPattern: "Aşınmış derzleri doldurmadan sıvı cam sürmek. Sıvı cam derz boşluğuna çöker ve hava kabarcığı yapar.",
      layers: {
        prep: "Derz aralarının temizlenmesi ve Weber Su Yalıtımlı Derz Dolgusu ile yenilenmesi.",
        primer: { name: "İsonem Liquid Glass Primer", rate: 0.05, unit: "kg/m²", role: "Cam/seramik tutunma astarı" },
        finish: { name: "İsonem Liquid Glass Çift Komponentli Sıvı Cam", rate: 0.20, unit: "kg/m²", role: "Sararmayan şeffaf elastik su zırhı (Çift Kat)" },
        tool: "Kadife ipek rulo"
      },
      img: "assets/bianca-official/2.jpg",
      whatsappText: "Merhaba, teras seramiklerini kırmadan şeffaf yalıtım için Reçete 15 (İsonem Liquid Glass Seti) fiyatı alabilir miyim?"
    },
    {
      id: "rec-16-cool-roof-soguk-cati",
      code: "REC-16",
      group: "su-yalitimi",
      groupTitle: "Teras, Çatı & Yalıtım",
      title: "Ege Güneşi Yansıtıcı 'Soğuk Çatı' (Cool Roof / Termal Yansıtıcı)",
      badge: "%85 Güneş Yansıtma & Isı Düşürme",
      bestFor: "Yazın 65°C'ye ulaşan düz beton terasların altındaki yaşam alanını fırına çevirmesini engelleme",
      problems: ["ege-gunesi", "isi-yalitim", "su-yalitimi"],
      surfaces: ["cati", "teras-balkon", "beton-sap"],
      brands: ["isonem"],
      antiPattern: "Güneş alan terasa koyu renkli yalıtım yapmak. Isıyı içine çekip betonu çatlatır.",
      layers: {
        prep: "Yüzey temizliği ve çatlak tamirleri.",
        primer: { name: "İsonem Universal Primer", rate: 0.15, unit: "kg/m²", role: "Aderans astarı" },
        finish: { name: "İsonem Thermal Roof", rate: 1.00, unit: "kg/m²", role: "Güneşin IR/UV ışınlarını %85 yansıtan, yüzey ısısını 20°C düşüren elastik beyaz çatı boyası" },
        tool: "Geniş post rulo + Teleskopik uzatma sırığı"
      },
      img: "assets/isonem/isonem-thermal-paint.jpg",
      whatsappText: "Merhaba, üst kat aşırı sıcaklık problemi için Reçete 16 (İsonem Thermal Roof Soğuk Çatı Kaplaması) fiyatı almak istiyorum."
    },
    {
      id: "rec-17-havuz-poliuretan-zirh",
      code: "REC-17",
      group: "su-yalitimi",
      groupTitle: "Teras, Çatı & Yalıtım",
      title: "Villa Havuz Taban & Perde Poliüretan Su Zırhı",
      badge: "Klor & Tuz Çözeltilerine %100 Dayanıklı",
      bestFor: "Klor ve havuz kimyasallarından rengi atan, su kaçıran betonarme havuzların elastik kaplanması",
      problems: ["su-yalitimi", "havuz-klor"],
      surfaces: ["havuz-su-deposu", "brut-beton"],
      brands: ["isonem"],
      antiPattern: "Nemli betona epoksi/poliüretan havuz boyası sürmek. Nem alttan buharlaşıp boyayı balon gibi şişirir.",
      layers: {
        prep: "Kireç tortularının temizlenmesi, beton neminin <%4 olması beklenir.",
        primer: { name: "İsonem Pool Astarı", rate: 0.15, unit: "kg/m²", role: "Nem kesici derin astar" },
        finish: { name: "İsonem Pool Çift Komponentli Havuz Boyası", rate: 0.80, unit: "kg/m²", role: "Kimyasallara ve klora tam dayanıklı parlak mavi poliüretan zırh (Çift Kat)" },
        tool: "Epoksi rulosu + Teleskopik sırık"
      },
      img: "assets/isonem/isonem-pool.jpg",
      whatsappText: "Merhaba, villa havuz boyama ve yalıtımı için Reçete 17 (İsonem Pool Çift Komponentli Havuz Boyası) fiyatı alabilir miyim?"
    },
    {
      id: "rec-18-trapez-sac-sandvic-panel",
      code: "REC-18",
      group: "su-yalitimi",
      groupTitle: "Teras, Çatı & Yalıtım",
      title: "Veranda & Otopark Sandviç Panel / Trapez Sac Vida Başı İzolasyonu",
      badge: "Metal Çatı & Vida Su Sızdırmazlığı",
      bestFor: "Metal çatılarda yaz-kış termal genleşmeyle gevşeyen vida diplerinden içeri paslı su sızmasını kesme",
      problems: ["su-yalitimi", "metal-pas"],
      surfaces: ["cati", "demir-metal"],
      brands: ["tek", "isonem"],
      antiPattern: "Paslı sac vidalarının üstüne astar sürmeden doğrudan su yalıtımı sürmek. Pas alttan çürütmeye devam eder.",
      layers: {
        prep: "Paslı vida başlarının tel fırçalanması + Bütil Pah Bandı ile sarılması.",
        primer: { name: "TEK Rapid Sac / Antipas Astarı", rate: 0.12, unit: "kg/m²", role: "Metal korozyon bariyeri" },
        finish: { name: "İsonem SB Elastik Metal Kaplama", rate: 0.80, unit: "kg/m²", role: "Güneşte çatlamayan esnek metal çatı yalıtımı" },
        tool: "Bütil pah bandı + Fırça"
      },
      img: "assets/tek/tek-rapid-astar.jpg",
      whatsappText: "Merhaba, sundurma/sac çatı vida başı su sızıntıları için Reçete 18 (Sac Yalıtım Seti) hakkında bilgi almak istiyorum."
    },

    // --- GRUP E: AHŞAP, TAŞ & MARİN KORUMA ---
    {
      id: "rec-19-alacati-tas-emprenye",
      code: "REC-19",
      group: "ahsap-tas",
      groupTitle: "Ahşap, Taş & Marin",
      title: "Alaçatı & Foça Taş Evleri Şeffaf Su İtici Emprenye",
      badge: "Doğal Dokuyu Bozmayan Lotus Etkisi",
      bestFor: "Doğal taşın su emip kararması ve derz dökülmesi; taş dokusunun boya ile kapatılmaması",
      problems: ["tas-koruma", "rutubet-nem"],
      surfaces: ["alacati-tasi", "mineral-siva"],
      brands: ["isonem", "weber"],
      antiPattern: "Doğal taşa vernik veya film oluşturan cila sürmek. Taş nefes alamayınca içeriden ufalanır ve vernik pul pul dökülür.",
      layers: {
        prep: "Taş yüzeydeki yosun ve kirecin basınçlı suyla yıkanıp kurutulması.",
        finish: { name: "İsonem MS 80 / Weber Su İtici Taş Koruyucu", rate: 0.20, unit: "L/m²", role: "Film yapmayan, taşın içine nüfuz eden hidrofobik emprenye (Çift Kat)" },
        tool: "Alçak basınçlı ilaçlama pompası veya geniş tavan fırçası"
      },
      img: "assets/isonem/isonem-ms-82.jpg",
      whatsappText: "Merhaba, Alaçatı/Foça taş ev cephe koruması için Reçete 19 (İsonem MS 80 Su İtici Emprenye) fiyatı alabilir miyim?"
    },
    {
      id: "rec-20-pergola-marin-yat-vernigi",
      code: "REC-20",
      group: "ahsap-tas",
      groupTitle: "Ahşap, Taş & Marin",
      title: "Pergola, Veranda & İskele Marin Yat Verniği",
      badge: "Ayna Parlaklığı & Deniz Tuzu Zırhı",
      bestFor: "Ege güneşi ve deniz tuzunda kararan, çatlayan ve kurtlanan dış mekan ahşapları",
      problems: ["ahsap-marin", "ege-gunesi", "sahil-tuz"],
      surfaces: ["ahsap-pergola"],
      brands: ["fawori", "marshall"],
      antiPattern: "Emprenye astarı sürmeden doğrudan yat verniği vurmak. Ahşap içeriden kurtlanır ve çürür.",
      layers: {
        prep: "Kararmış ahşapta zımpara; reçineli budakların selülozik tinerle silinmesi.",
        primer: { name: "Marshall Cuprinol Ahşap Koruyucu", rate: 0.10, unit: "L/m²", role: "Kurt ve mantar önleyici derin emprenye" },
        finish: { name: "Fawori Marin Yat Verniği", rate: 0.14, unit: "L/m²", role: "Üretan alkid esaslı UV filtreli ayna parlaklığında marin zırh (Çift Kat)" },
        tool: "%100 Doğal domuz kılı yassı ahşap fırçası + 220 Kum zımpara"
      },
      img: "assets/fawori/hero/hero-fawori-4-marin.jpg",
      whatsappText: "Merhaba, ahşap pergola ve veranda için Reçete 20 (Cuprinol + Fawori Marin Yat Verniği) ambalaj ve fiyat bilgisi alabilir miyim?"
    },
    {
      id: "rec-21-havuz-kenari-teak-deck-yag",
      code: "REC-21",
      group: "ahsap-tas",
      groupTitle: "Ahşap, Taş & Marin",
      title: "Havuz Kenarı Teak / İroko / Deck Yağlama (Film Yapmayan Zemin)",
      badge: "Doğal Yağ Besleme & Sıfır Soyulma",
      bestFor: "Havuz kenarı decklerin güneşte kararması; soyulan vernik yerine nefes alan doğal yağ ihtiyacı",
      problems: ["ahsap-marin", "deck-yag"],
      surfaces: ["ahsap-pergola"],
      brands: ["marshall"],
      antiPattern: "Yürünen ahşap deck zeminine yat verniği sürmek. Islak ayakla basıldığında kayar ve 6 ayda soyulur.",
      layers: {
        prep: "Teak Temizleyici (Oksalik Asit) ile yıkanarak kararmış ahşabın ham renginin açılması.",
        finish: { name: "Marshall Cuprinol Teak Oil (Tik Yağı)", rate: 0.12, unit: "L/m²", role: "Ahşaba doyrularak sürülen, film yapmayan UV filtreli doğal yağ (Çift Kat)" },
        tool: "Geniş ped sürme aparatı veya pamuklu bez"
      },
      img: "assets/marshall/marshall-cuprinol.jpg",
      whatsappText: "Merhaba, havuz kenarı teak/deck zemin yağlaması için Reçete 21 (Cuprinol Teak Oil Seti) fiyatı almak istiyorum."
    },
    {
      id: "rec-22-ahsap-panjur-kepenk",
      code: "REC-22",
      group: "ahsap-tas",
      groupTitle: "Ahşap, Taş & Marin",
      title: "Ege Ahşap Panjur & Kepenkleri İçin Esnek Nefes Alan Ahşap Boyası",
      badge: "Çatlamayan Elastik Ahşap Zırhı",
      bestFor: "Güneş altında genleşip çalışan kepenklerde sentetik boyanın çatlayıp dökülmesini engelleme",
      problems: ["ahsap-marin", "ege-gunesi"],
      surfaces: ["ahsap-pergola", "kapi-ahsap"],
      brands: ["marshall", "filli"],
      antiPattern: "Güneş gören ahşap kepenke sert oto boyası veya klasik yağlı boya sürmek. Güneşte çıtır çıtır dökülür.",
      layers: {
        prep: "Eski dökülen boyanın kazınması ve 120 kum zımpara.",
        primer: { name: "Cuprinol Ahşap Koruyucu", rate: 0.08, unit: "L/m²", role: "Mantar önleyici emprenye" },
        finish: { name: "Marshall Su Bazlı Nefes Alan Ahşap Boyası / Aqualux", rate: 0.12, unit: "L/m²", role: "Ahşapla beraber esneyen, çatlamayan mikrogözenekli renkli boya (Çift Kat)" },
        tool: "İpek uçlu ahşap fırçası"
      },
      img: "assets/marshall/marshall-cuprinol.jpg",
      whatsappText: "Merhaba, ahşap panjur ve kepenk boyama için Reçete 22 (Nefes Alan Esnek Ahşap Boyası Seti) fiyat ve renk seçenekleri alabilir miyim?"
    },

    // --- GRUP F: ZEMİN, METAL & TİCARİ ALANLAR ---
    {
      id: "rec-23-ferforje-pas-ustu-metal",
      code: "REC-23",
      group: "metal-zemin",
      groupTitle: "Metal, Zemin & Sanayi",
      title: "Ferforje, Bahçe Kapısı & Sahil Pas Üstü Metal Zırhı",
      badge: "Korozyon Bariyeri & Ayna Parlaklık",
      bestFor: "Sahil neminde paslanan demir çitler, garaj kapıları ve ferforjelerin pasını kilitleyip boyama",
      problems: ["metal-pas", "sahil-tuz"],
      surfaces: ["demir-metal"],
      brands: ["tek", "fawori"],
      antiPattern: "Paslı demire antipas sürmeden doğrudan sentetik boya vurmak. Pas boyanın altından kusar.",
      layers: {
        prep: "Tel fırça ile kabaran kaba pasın temizlenmesi.",
        primer: { name: "TEK Boya Endüstriyel Rapid Antipas", rate: 0.12, unit: "kg/m²", role: "Çinko kromatlı pas kilitleyici astar" },
        finish: { name: "TEK Sentetik Parlak Yağlı Boya / Fawori Sentetik", rate: 0.10, unit: "L/m²", role: "Hava ve nem temasını kesen parlak son kat (Çift Kat)" },
        tool: "Radyatör / Parmak rulo + Açılı robot fırça + Tel fırça"
      },
      img: "assets/tek/tek-rapid-astar.jpg",
      whatsappText: "Merhaba, ferforje bahçe kapısı ve demir çit için Reçete 23 (TEK Rapid Antipas + Sentetik Parlak Boya) fiyatı alabilir miyim?"
    },
    {
      id: "rec-24-mahzen-garaj-epoksi-zemin",
      code: "REC-24",
      group: "metal-zemin",
      groupTitle: "Metal, Zemin & Sanayi",
      title: "Urla Bağ Yolu / Zeytinyağı Mahzeni & Garaj Ağır Yük Epoksi / Hijyenik Zemin",
      badge: "Asit, Yağ & Ağır Yük Dayanımı",
      bestFor: "Zeytinyağı/şarap asitlerine, araç lastiği sürtünmesine ve beton tozunmasına karşı hijyenik zemin",
      problems: ["epoksi-zemin", "hijyen-asit"],
      surfaces: ["beton-sap", "brut-beton"],
      brands: ["tek", "isonem"],
      antiPattern: "Yağlı betona astar sürmek. Epoksi betonun gözeneklerine kilitlenemez ve plakalar halinde kalkar.",
      layers: {
        prep: "Beton zeminin elmas silimle pürüzlendirilmesi ve vakumlanması (Nem <%4).",
        primer: { name: "TEK Boya Epoksi Astar", rate: 0.15, unit: "kg/m²", role: "Solventli beton doyurucu epoksi astar" },
        finish: { name: "TEK Çift Komponentli Epoksi Zemin Boyası / İsonem Floor Paint", rate: 0.50, unit: "kg/m²", role: "Kimyasallara ve ağır araç trafiğine dayanıklı parlak zemin kaplaması" },
        tool: "Kirpi rulo (Hava kabarcığı alıcı) + Epoksi rulosu"
      },
      img: "assets/tek/tek-sentetik-parlak.jpg",
      whatsappText: "Merhaba, garaj/mahzen/atölye zemin kaplaması için Reçete 24 (TEK Epoksi Zemin Seti) metrekare malzeme maliyeti ve teknik şartnamesini alabilir miyim?"
    }
  ];

  // 2. DOM ELEMANLARI
  var searchInput = document.getElementById("pvSearchInput");
  var m2Input = document.getElementById("pvAreaM2Input");
  var m2Slider = document.getElementById("pvAreaM2Slider");
  var groupFilterPills = document.getElementById("pvGroupPills");
  var problemFilterPills = document.getElementById("pvProblemPills");
  var surfaceFilterPills = document.getElementById("pvSurfacePills");
  var brandFilterPills = document.getElementById("pvBrandPills");
  var resultsGrid = document.getElementById("pvResultsGrid");
  var resultsCount = document.getElementById("pvResultsCount");
  var resetFiltersBtn = document.getElementById("pvResetFilters");
  var activeFiltersSummary = document.getElementById("pvActiveFiltersSummary");

  // State
  var state = {
    search: "",
    group: "all",
    problem: "all",
    surface: "all",
    brand: "all",
    areaM2: 100
  };

  // 3. MATEMATİKSEL AMBALAJ HESAPLAMA MOTORU
  function calculateBundle(recipe, areaM2) {
    var l = recipe.layers;
    var result = {
      primerText: "",
      finishText: "",
      sealerText: "",
      toolText: l.tool
    };

    if (l.primer) {
      var totalPrimer = Math.ceil(areaM2 * l.primer.rate * 10) / 10;
      result.primerText = totalPrimer + " " + (l.primer.unit.indexOf("kg") > -1 ? "KG" : "L") + " (" + l.primer.name + ")";
    }

    if (l.finish) {
      var totalFinish = Math.ceil(areaM2 * l.finish.rate * 10) / 10;
      var unitStr = l.finish.unit.indexOf("kg") > -1 ? "KG" : "L";
      result.finishText = totalFinish + " " + unitStr + " (" + l.finish.name + ")";
    }

    if (l.sealer) {
      var totalSealer = Math.ceil(areaM2 * l.sealer.rate * 10) / 10;
      result.sealerText = totalSealer + " " + (l.sealer.unit.indexOf("kg") > -1 ? "KG" : "L") + " (" + l.sealer.name + ")";
    }

    return result;
  }

  // 4. METİN NORMALİZASYONU
  function normalizeText(text) {
    if (!text) return "";
    return text.toString().toLowerCase()
      .replace(/ı/g, 'i')
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c');
  }

  // 5. ÇİZİM & FİLTRE MOTORU
  function render() {
    if (!resultsGrid) return;

    var q = normalizeText(state.search.trim());
    var filtered = [];

    recipes.forEach(function(rec) {
      // Grup filtresi
      if (state.group !== "all" && rec.group !== state.group) return;

      // Problem filtresi
      if (state.problem !== "all" && rec.problems.indexOf(state.problem) === -1) return;

      // Yüzey filtresi
      if (state.surface !== "all" && rec.surfaces.indexOf(state.surface) === -1) return;

      // Marka filtresi
      if (state.brand !== "all" && rec.brands.indexOf(state.brand) === -1) return;

      // Arama kutusu
      if (q.length > 0) {
        var haystack = normalizeText(
          rec.title + " " + rec.code + " " + rec.badge + " " + rec.bestFor + " " +
          rec.groupTitle + " " + (rec.layers.primer ? rec.layers.primer.name : "") + " " +
          rec.layers.finish.name + " " + rec.antiPattern
        );
        if (haystack.indexOf(q) === -1) return;
      }

      filtered.push(rec);
    });

    // Sayaç
    if (resultsCount) {
      resultsCount.textContent = filtered.length + " Reçete";
    }

    updateActiveSummary();

    if (filtered.length === 0) {
      resultsGrid.innerHTML = [
        '<div class="pv-empty-state">',
        '  <div class="pv-empty-icon"><svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div>',
        '  <h3 class="pv-empty-title">Kriterlere Uygun Reçete Bulunamadı</h3>',
        '  <p class="pv-empty-desc">Filtreleri temizleyebilir veya şantiyenize özel kimyasal şartname için teknik ekibimize danışabilirsiniz.</p>',
        '  <a href="https://wa.me/905323844497?text=Merhaba,%20%C5%9Fantiyeme%20%C3%B6zel%20re%C3%A7ete%20i%C3%A7in%20teknik%20destek%20almak%20istiyorum." target="_blank" rel="noopener" class="pv-btn-primary" style="margin-top:16px; display:inline-flex;">',
        '    <span>Uzmana WhatsApp ile Danış</span>',
        '  </a>',
        '</div>'
      ].join('');
      return;
    }

    var html = '';
    filtered.forEach(function(rec) {
      var bundle = calculateBundle(rec, state.areaM2);
      
      // WhatsApp dinamik metni oluştur
      var waMsg = "Merhaba Pervan Yetkili Bayi, " + state.areaM2 + " m² alanımız için " + rec.code + " (" + rec.title + ") reçete paketini inceledim.\n" +
                  "- Ana Ürün: " + bundle.finishText + "\n" +
                  (bundle.primerText ? "- Astar/Bariyer: " + bundle.primerText + "\n" : "") +
                  (bundle.sealerText ? "- Koruyucu Sır: " + bundle.sealerText + "\n" : "") +
                  "- Ekipman: " + bundle.toolText + "\n" +
                  "Urla/Balçova depodan şantiye teslimi ve güncel fiyat teklifi alabilir miyim?";
      
      var waUrl = "https://wa.me/905323844497?text=" + encodeURIComponent(waMsg);

      html += [
        '<article class="pv-recipe-card" data-id="' + rec.id + '">',
        '  <div class="pv-recipe-card-head">',
        '    <div class="pv-recipe-tag-row">',
        '      <span class="pv-recipe-code">' + rec.code + '</span>',
        '      <span class="pv-recipe-badge">' + rec.badge + '</span>',
        '    </div>',
        '    <h3 class="pv-recipe-title">' + rec.title + '</h3>',
        '    <div class="pv-recipe-solves">🎯 ' + rec.bestFor + '</div>',
        '  </div>',
        '  <div class="pv-recipe-body">',
        '    <!-- 3 Katmanlı Reçete Özeti -->',
        '    <div class="pv-recipe-layers">',
        (rec.layers.primer ? [
          '      <div class="pv-layer-item">',
          '        <span class="layer-step">1. Astar / Bariyer</span>',
          '        <span class="layer-sku">' + rec.layers.primer.name + '</span>',
          '        <span class="layer-calc">' + state.areaM2 + ' m² için: <strong>' + bundle.primerText + '</strong></span>',
          '      </div>'
        ].join('') : ''),
        '      <div class="pv-layer-item primary-layer">',
        '        <span class="layer-step">2. Performans Son Kat</span>',
        '        <span class="layer-sku">' + rec.layers.finish.name + '</span>',
        '        <span class="layer-calc">' + state.areaM2 + ' m² için: <strong>' + bundle.finishText + '</strong></span>',
        '      </div>',
        (rec.layers.sealer ? [
          '      <div class="pv-layer-item">',
          '        <span class="layer-step">3. Koruma Sırrı / Zırh</span>',
          '        <span class="layer-sku">' + rec.layers.sealer.name + '</span>',
          '        <span class="layer-calc">' + state.areaM2 + ' m² için: <strong>' + bundle.sealerText + '</strong></span>',
          '      </div>'
        ].join('') : ''),
        '    </div>',
        '    <!-- Kritik Hata Uyarısı -->',
        '    <div class="pv-recipe-warning">',
        '      <strong>⚠️ Kritik Hata (Anti-Pattern):</strong> ' + rec.antiPattern,
        '    </div>',
        '  </div>',
        '  <!-- Alt Aksiyon Butonları -->',
        '  <div class="pv-recipe-footer">',
        '    <button type="button" class="pv-btn-spec-open pv-open-modal-trigger" data-id="' + rec.id + '">5 Katmanlı Şartname</button>',
        '    <a href="' + waUrl + '" target="_blank" rel="noopener" class="pv-btn-wa-quote">',
        '      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
        '      <span>Reçeteyi WhatsApp\'a Aktar</span>',
        '    </a>',
        '  </div>',
        '</article>'
      ].join('');
    });

    resultsGrid.innerHTML = html;
    bindModalEvents();
  }

  function updateActiveSummary() {
    if (!activeFiltersSummary) return;

    var tags = [];
    if (state.group !== "all") {
      var gBtn = groupFilterPills ? groupFilterPills.querySelector('[data-filter="' + state.group + '"]') : null;
      if (gBtn) tags.push('<span class="pv-active-tag">Kategori: ' + gBtn.textContent.trim() + '</span>');
    }
    if (state.problem !== "all") {
      var pBtn = problemFilterPills ? problemFilterPills.querySelector('[data-filter="' + state.problem + '"]') : null;
      if (pBtn) tags.push('<span class="pv-active-tag">Sorun: ' + pBtn.textContent.trim() + '</span>');
    }
    if (state.surface !== "all") {
      var sBtn = surfaceFilterPills ? surfaceFilterPills.querySelector('[data-filter="' + state.surface + '"]') : null;
      if (sBtn) tags.push('<span class="pv-active-tag">Yüzey: ' + sBtn.textContent.trim() + '</span>');
    }
    if (state.brand !== "all") {
      var bBtn = brandFilterPills ? brandFilterPills.querySelector('[data-filter="' + state.brand + '"]') : null;
      if (bBtn) tags.push('<span class="pv-active-tag">Marka: ' + bBtn.textContent.trim() + '</span>');
    }
    if (state.search.trim().length > 0) {
      tags.push('<span class="pv-active-tag">Arama: "' + state.search.trim() + '"</span>');
    }

    if (tags.length > 0) {
      activeFiltersSummary.innerHTML = tags.join('') + ' <button type="button" class="pv-clear-all-btn" id="pvClearAllTrigger">Tümünü Sıfırla ✕</button>';
      var clearBtn = document.getElementById("pvClearAllTrigger");
      if (clearBtn) clearBtn.addEventListener("click", resetFilters);
    } else {
      activeFiltersSummary.innerHTML = '<span class="pv-active-hint">Tüm 24 bölgesel reçete listeleniyor. ' + state.areaM2 + ' m² için malzeme paketleri hesaplandı.</span>';
    }
  }

  function resetFilters() {
    state.search = "";
    state.group = "all";
    state.problem = "all";
    state.surface = "all";
    state.brand = "all";

    if (searchInput) searchInput.value = "";

    [groupFilterPills, problemFilterPills, surfaceFilterPills, brandFilterPills].forEach(function(container) {
      if (!container) return;
      container.querySelectorAll('.pv-finder-pill').forEach(function(btn) {
        btn.classList.toggle('active', btn.getAttribute('data-filter') === 'all');
      });
    });

    updateUrl();
    render();
  }

  // 6. URL & PARAMETRE SENKRONİZASYONU
  function syncUrl() {
    var params = new URLSearchParams(window.location.search);
    var hash = window.location.hash.replace('#', '');

    if (params.has('grup')) state.group = params.get('grup');
    if (params.has('ihtiyac') || params.has('problem')) state.problem = params.get('ihtiyac') || params.get('problem');
    else if (hash.length > 0) state.problem = hash;

    if (params.has('yuzey')) state.surface = params.get('yuzey');
    if (params.has('marka')) state.brand = params.get('marka');
    if (params.has('m2')) {
      var m = parseInt(params.get('m2'), 10);
      if (!isNaN(m) && m > 0) state.areaM2 = m;
    }
    if (params.has('q')) {
      state.search = params.get('q');
      if (searchInput) searchInput.value = state.search;
    }

    if (m2Input) m2Input.value = state.areaM2;
    if (m2Slider) m2Slider.value = state.areaM2;

    syncPillClasses();
  }

  function syncPillClasses() {
    if (groupFilterPills) {
      groupFilterPills.querySelectorAll('.pv-finder-pill').forEach(function(b) {
        b.classList.toggle('active', b.getAttribute('data-filter') === state.group);
      });
    }
    if (problemFilterPills) {
      problemFilterPills.querySelectorAll('.pv-finder-pill').forEach(function(b) {
        b.classList.toggle('active', b.getAttribute('data-filter') === state.problem);
      });
    }
    if (surfaceFilterPills) {
      surfaceFilterPills.querySelectorAll('.pv-finder-pill').forEach(function(b) {
        b.classList.toggle('active', b.getAttribute('data-filter') === state.surface);
      });
    }
    if (brandFilterPills) {
      brandFilterPills.querySelectorAll('.pv-finder-pill').forEach(function(b) {
        b.classList.toggle('active', b.getAttribute('data-filter') === state.brand);
      });
    }
  }

  function updateUrl() {
    var params = new URLSearchParams();
    if (state.group !== "all") params.set('grup', state.group);
    if (state.problem !== "all") params.set('ihtiyac', state.problem);
    if (state.surface !== "all") params.set('yuzey', state.surface);
    if (state.brand !== "all") params.set('marka', state.brand);
    if (state.areaM2 !== 100) params.set('m2', state.areaM2);
    if (state.search.trim().length > 0) params.set('q', state.search.trim());

    var newUrl = window.location.pathname;
    var qs = params.toString();
    if (qs.length > 0) newUrl += '?' + qs;

    window.history.replaceState({}, '', newUrl);
  }

  // 7. EVENT LISTENERS
  function initEvents() {
    // m² Girdisi (Input ve Slider)
    if (m2Input && m2Slider) {
      m2Input.addEventListener('input', function() {
        var v = parseInt(m2Input.value, 10);
        if (!isNaN(v) && v > 0) {
          state.areaM2 = v;
          m2Slider.value = v;
          updateUrl();
          render();
        }
      });
      m2Slider.addEventListener('input', function() {
        var v = parseInt(m2Slider.value, 10);
        state.areaM2 = v;
        m2Input.value = v;
        updateUrl();
        render();
      });
    }

    // Grup Pillleri
    if (groupFilterPills) {
      groupFilterPills.addEventListener('click', function(e) {
        var btn = e.target.closest('.pv-finder-pill');
        if (!btn) return;
        state.group = btn.getAttribute('data-filter') || 'all';
        syncPillClasses();
        updateUrl();
        render();
      });
    }

    // Problem Pillleri
    if (problemFilterPills) {
      problemFilterPills.addEventListener('click', function(e) {
        var btn = e.target.closest('.pv-finder-pill');
        if (!btn) return;
        state.problem = btn.getAttribute('data-filter') || 'all';
        syncPillClasses();
        updateUrl();
        render();
      });
    }

    // Yüzey Pillleri
    if (surfaceFilterPills) {
      surfaceFilterPills.addEventListener('click', function(e) {
        var btn = e.target.closest('.pv-finder-pill');
        if (!btn) return;
        state.surface = btn.getAttribute('data-filter') || 'all';
        syncPillClasses();
        updateUrl();
        render();
      });
    }

    // Marka Pillleri
    if (brandFilterPills) {
      brandFilterPills.addEventListener('click', function(e) {
        var btn = e.target.closest('.pv-finder-pill');
        if (!btn) return;
        state.brand = btn.getAttribute('data-filter') || 'all';
        syncPillClasses();
        updateUrl();
        render();
      });
    }

    // Arama Kutusu
    if (searchInput) {
      var timer = null;
      searchInput.addEventListener('input', function() {
        clearTimeout(timer);
        timer = setTimeout(function() {
          state.search = searchInput.value;
          updateUrl();
          render();
        }, 120);
      });
    }

    if (resetFiltersBtn) resetFiltersBtn.addEventListener('click', resetFilters);
  }

  // 8. 5 KATMANLI ŞARTNAME MODAL ENGINE
  var modalBackdrop = document.getElementById("pvSpecModalBackdrop");
  var modalCloseBtn = document.getElementById("pvSpecModalClose");
  var modalContent = document.getElementById("pvSpecModalContent");

  function bindModalEvents() {
    document.querySelectorAll('.pv-open-modal-trigger').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        var id = btn.getAttribute('data-id');
        var rec = recipes.find(function(r) { return r.id === id; });
        if (rec) openSpecModal(rec);
      });
    });
  }

  function openSpecModal(rec) {
    if (!modalBackdrop || !modalContent) return;

    var bundle = calculateBundle(rec, state.areaM2);
    var waMsg = "Merhaba, " + rec.code + " (" + rec.title + ") için " + state.areaM2 + " m² şantiye şartname paket teklifi almak istiyorum.";
    var waUrl = "https://wa.me/905323844497?text=" + encodeURIComponent(waMsg);

    modalContent.innerHTML = [
      '<div class="pv-modal-header">',
      '  <div class="pv-recipe-tag-row" style="margin-bottom:8px;">',
      '    <span class="pv-recipe-code">' + rec.code + '</span>',
      '    <span class="pv-recipe-badge">' + rec.badge + '</span>',
      '  </div>',
      '  <h2 class="pv-modal-title">' + rec.title + '</h2>',
      '  <div class="pv-modal-solve-pill">🎯 ' + rec.bestFor + '</div>',
      '</div>',
      '<div class="pv-modal-grid">',
      '  <div class="pv-modal-media">',
      '    <img src="' + rec.img + '" alt="' + rec.title + '" onerror="this.src=\'assets/rf-brand-filliboya.jpg\'">',
      '  </div>',
      '  <div class="pv-modal-info">',
      '    <div class="pv-modal-spec-block">',
      '      <h4 class="spec-block-title">5 Katmanlı Kimyasal Şartname</h4>',
      '      <div class="spec-layer-row"><strong>Katman 0 (Hazırlık):</strong> ' + rec.layers.prep + '</div>',
      (rec.layers.primer ? '      <div class="spec-layer-row"><strong>Katman 1 (Astar):</strong> ' + rec.layers.primer.name + ' (' + rec.layers.primer.role + ' - ' + rec.layers.primer.rate + ' ' + rec.layers.primer.unit + ')</div>' : ''),
      '      <div class="spec-layer-row primary"><strong>Katman 2 (Son Kat):</strong> ' + rec.layers.finish.name + ' (' + rec.layers.finish.role + ' - ' + rec.layers.finish.rate + ' ' + rec.layers.finish.unit + ')</div>',
      (rec.layers.sealer ? '      <div class="spec-layer-row"><strong>Katman 3 (Koruma Zırhı):</strong> ' + rec.layers.sealer.name + ' (' + rec.layers.sealer.role + ')</div>' : ''),
      '      <div class="spec-layer-row"><strong>Uygulama Donanımı:</strong> ' + rec.layers.tool + '</div>',
      '    </div>',
      '    <div class="pv-modal-calc-box">',
      '      <div class="calc-box-title">📐 ' + state.areaM2 + ' m² Alan İçin İhtiyaç Listesi:</div>',
      (rec.layers.primer ? '      <div class="calc-item">• Astar / Bariyer: <strong>' + bundle.primerText + '</strong></div>' : ''),
      '      <div class="calc-item">• Performans Boyası: <strong>' + bundle.finishText + '</strong></div>',
      (rec.layers.sealer ? '      <div class="calc-item">• Koruyucu Sır: <strong>' + bundle.sealerText + '</strong></div>' : ''),
      '      <div class="calc-item">• Önerilen Alet: <strong>' + bundle.toolText + '</strong></div>',
      '    </div>',
      '    <div class="pv-modal-warning">',
      '      <strong>⚠️ Neyi Yapmazsanız Patlar? (Anti-Pattern):</strong><br>' + rec.antiPattern,
      '    </div>',
      '    <div class="pv-modal-actions" style="margin-top:20px;">',
      '      <a href="' + waUrl + '" target="_blank" rel="noopener" class="pv-modal-wa-btn">',
      '        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
      '        <span>Bu Reçete İçin Şantiye Fiyatı Al</span>',
      '      </a>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join('');

    modalBackdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', function(e) {
      if (e.target === modalBackdrop) closeModal();
    });
  }
  window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });

  // 9. BAŞLATMA
  document.addEventListener("DOMContentLoaded", function() {
    syncUrl();
    initEvents();
    render();
  });

})();
