/* ==========================================================================
   PERVAN AKILLI BOYA BULUCU & İHTİYAÇ ARAMA MOTORU
   İzmir & Ege Bölgesi Problem-Çözüm Taksonomisi ve Filtreleme Motoru
   ========================================================================== */

(function() {
  'use strict';

  // 1. ÜRÜN VERİ TABANI (TÜM YETKİLİ MARKALAR BİR ARADA)
  var paintProducts = {
    // --- RUTUBET, NEM & KÜF ÇÖZÜMLERİ ---
    "isonem-ms-82": {
      id: "isonem-ms-82",
      name: "İsonem MS 82 Rutubet & Nem Boyası",
      brand: "İsonem",
      brandClass: "tag-isonem",
      problems: ["rutubet-nem", "su-yalitimi"],
      surfaces: ["ic-cephe", "bodrum"],
      badge: "Rutubet & Nem Kesici",
      bestFor: "Zemin katlar, bodrumlar ve sürekli kabaran nemli duvarlar",
      sub: "Binaların iç ve dış duvarlarında su, nem ve rutubetten kaynaklanan küflenmeyi ve tuz kusmasını bloke eden polimerik reçine esaslı zırh boya.",
      img: "assets/isonem-official/isonem-ms-82.png",
      sizes: ["5 KG", "1 KG"],
      coverage: "500 gr/m² (Çift Kat)",
      sheen: "Mat Beyaz Zırh",
      drying: "24 Saat (Tam kürlenme)",
      surface: "İç ve dış mineral duvarlar, tuğla, beton, sıva",
      tag: "Rutubet Engelleyici",
      whatsappText: "Merhaba, nem ve rutubet problemi olan duvarlar için İsonem MS 82 hakkında bilgi ve fiyat almak istiyorum."
    },
    "filli-amphisilan": {
      id: "filli-amphisilan",
      name: "Filli Boya AmphiSilan Silikonlu Dış Cephe",
      brand: "Filli Boya",
      brandClass: "tag-filli",
      problems: ["rutubet-nem", "ege-gunesi", "sahil-marin"],
      surfaces: ["dis-cephe"],
      badge: "Fotokatalitik Kendi Kendini Temizleyen",
      bestFor: "İzmir, Çeşme ve Urla sahil bandında nefes alan ve kir tutmayan dış cepheler",
      sub: "Silikon-akrilik kopolimer teknolojisiyle su iticiliği maksimum seviyede tutarken yüksek su buharı geçirgenliğiyle duvarın nefes almasını sağlar.",
      img: "assets/rf-bucket-amphisilan.jpg",
      sizes: ["15 L", "7.5 L", "2.5 L"],
      coverage: "8 – 10 m²/L",
      sheen: "Mat Silikonlu",
      drying: "6 - 12 Saat",
      surface: "Brüt beton, sıva, mineral dış cephe yüzeyleri",
      tag: "Silikonlu Dış Cephe",
      whatsappText: "Merhaba, dış cephe için Filli Boya AmphiSilan ve RenXMatik renk üretimi hakkında bilgi almak istiyorum."
    },
    "isonem-thermal-paint": {
      id: "isonem-thermal-paint",
      name: "İsonem Thermal Paint Isı Yalıtım & Küf Boyası",
      brand: "İsonem",
      brandClass: "tag-isonem",
      problems: ["rutubet-nem", "isi-yalitim"],
      surfaces: ["ic-cephe", "dis-cephe"],
      badge: "Mikrokürecikli Isı Yalıtımı",
      bestFor: "İç cephede ısı kaybını azaltma ve terlemeden kaynaklı küf oluşumunu engelleme",
      sub: "Vakumlu mikro seramik kürecik içerikli, düşük ısı iletkenliğiyle yoğuşmayı ve ısı kaçışını engelleyen özel iç/dış cephe kaplaması.",
      img: "assets/isonem-official/isonem-thermal-paint.png",
      sizes: ["18 L", "10 L", "5 L"],
      coverage: "1 L / m² (2-3 kat)",
      sheen: "Mat Elastik Kaplama",
      drying: "6 Saat",
      surface: "İç ve dış tüm yapı yüzeyleri",
      tag: "Isı & Yoğuşma Bariyeri",
      whatsappText: "Merhaba, İsonem Thermal Paint ısı yalıtım boyası ve uygulama detayları hakkında fiyat öğrenmek istiyorum."
    },

    // --- TAM SİLİNEBİLİR & LEKE TUTMAZ İÇ CEPHE ---
    "filli-momento-max": {
      id: "filli-momento-max",
      name: "Filli Boya Momento Max Tam Silinebilir İpek Mat",
      brand: "Filli Boya",
      brandClass: "tag-filli",
      problems: ["silinebilir", "renk-renxmatik"],
      surfaces: ["ic-cephe"],
      badge: "Silikonlu & Yıkanabilir İpek Mat",
      bestFor: "Salon, koridor ve çocuk odalarında defalarca silinse dahi parlama yapmayan pürüzsüz doku",
      sub: "Aktif silikon teknolojisi ile leke tutmayan, sürtünmeye dayanıklı, RenXMatik ile binlerce özel mimari renkte üretilen üst segment iç cephe boyası.",
      img: "assets/filli-official/momento-max.png",
      sizes: ["15 L", "7.5 L", "2.5 L"],
      coverage: "13 – 17 m²/L (Tek Kat)",
      sheen: "İpek Mat Pürüzsüz",
      drying: "4 - 6 Saat",
      surface: "Alçı, sıva, macunlu yüzeyler, eski boyalı iç cephe",
      tag: "Tam Silinebilir",
      whatsappText: "Merhaba, Filli Boya Momento Max ve RenXMatik renk kartelası için fiyat ve stok sormak istiyorum."
    },
    "filli-momento-silan": {
      id: "filli-momento-silan",
      name: "Filli Boya Momento Silan İpeksi Mat İç Cephe",
      brand: "Filli Boya",
      brandClass: "tag-filli",
      problems: ["silinebilir", "renk-renxmatik"],
      surfaces: ["ic-cephe"],
      badge: "Klasik İpeksi Doku",
      bestFor: "Ev ve ofislerde yüksek örtücülük ve kolay silinebilirlik arayanlar",
      sub: "Silikon katkılı, nefes alma kabiliyeti yüksek, fırça ve rulo izi bırakmayan pürüzsüz iç cephe son kat boyası.",
      img: "assets/filli-official/momento-silan.png",
      sizes: ["15 L", "7.5 L", "2.5 L"],
      coverage: "13 – 16 m²/L",
      sheen: "İpeksi Mat",
      drying: "4 - 6 Saat",
      surface: "İç cephe duvar ve tavanlar",
      tag: "İpeksi Mat",
      whatsappText: "Merhaba, Filli Boya Momento Silan fiyatı ve renk seçenekleri hakkında bilgi alabilir miyim?"
    },
    "marshall-sil-sil": {
      id: "marshall-sil-sil",
      name: "Marshall Sil-Sil Üstün Silinebilir Mat İç Cephe",
      brand: "Marshall",
      brandClass: "tag-marshall",
      problems: ["silinebilir", "ekonomik-hizli"],
      surfaces: ["ic-cephe"],
      badge: "Leke Savar Teknoloji",
      bestFor: "Mutfak, antre ve yoğun kullanılan yaşam alanlarında leke direnci",
      sub: "Leke tutmayan ve ıslak bezle kolayca silinebilen, su bazlı mat iç mekan duvar boyası.",
      img: "assets/marshall-official/si̇l-pak.png",
      sizes: ["15 L", "7.5 L", "2.5 L"],
      coverage: "12 – 15 m²/L",
      sheen: "Mat Silinebilir",
      drying: "4 Saat",
      surface: "Sıvalı ve macunlu iç duvarlar",
      tag: "Leke Tutmaz",
      whatsappText: "Merhaba, Marshall Sil-Sil iç cephe boyası hakkında fiyat ve ambalaj bilgisi almak istiyorum."
    },
    "fawori-kozmik-ipek": {
      id: "fawori-kozmik-ipek",
      name: "Fawori Kozmik İpek İpeksi Mat İç Cephe",
      brand: "Fawori",
      brandClass: "tag-fawori",
      problems: ["silinebilir", "ekonomik-hizli"],
      surfaces: ["ic-cephe"],
      badge: "Fiyat / Performans İpek Mat",
      bestFor: "Ekonomik bütçeyle silinebilir ve şık ipek mat doku elde etmek isteyenler",
      sub: "Betek Kimya güvencesiyle su bazlı, silikon takviyeli, örtücülüğü yüksek ve uygulaması kolay iç cephe boyası.",
      img: "assets/fawori/hero/hero-fawori-1-kozmik-ipek.jpg",
      sizes: ["15 L", "7.5 L", "2.5 L"],
      coverage: "11 – 14 m²/L",
      sheen: "İpeksi Mat",
      drying: "4 Saat",
      surface: "İç cephe alçı, sıva ve panel yüzeyler",
      tag: "İpeksi Mat",
      whatsappText: "Merhaba, Fawori Kozmik İpek boyası için güncel kova fiyatı ve teslimat bilgisi alabilir miyim?"
    },

    // --- EGE GÜNEŞİ & AĞIR SAHİL İKLİMİ (ÇEŞME / URLA / KARABURUN) ---
    "fawori-fenomen": {
      id: "fawori-fenomen",
      name: "Fawori Fenomen %100 Saf Akrilik Dış Cephe",
      brand: "Fawori",
      brandClass: "tag-fawori",
      problems: ["ege-gunesi", "sahil-marin", "rutubet-nem"],
      surfaces: ["dis-cephe"],
      badge: "Ege Sahil & Ağır Koşul Zırhı",
      bestFor: "Çeşme, Urla, Alaçatı ve sahil hattında yoğun tuzlu rüzgar ve UV güneşine maruz villalar",
      sub: "%100 saf akrilik bağlayıcısı sayesinde kılcal çatlakları köprüleyen, sararmayan ve deniz tuzuna karşı tam koruma sağlayan dış cephe zırhı.",
      img: "assets/fawori/fenomen-saf-akrilik-dis-cephe-boyasi.webp",
      sizes: ["15 L"],
      coverage: "7 – 12 m²/L",
      sheen: "Saf Akrilik Mat (Elastomerik)",
      drying: "4 - 6 Saat",
      surface: "Brüt beton, mineral sıva, villa dış cepheleri",
      tag: "Saf Akrilik",
      whatsappText: "Merhaba, Çeşme/Urla bölgesindeki villamız için Fawori Fenomen saf akrilik dış cephe boyası fiyatı almak istiyorum."
    },
    "marshall-akrikor": {
      id: "marshall-akrikor",
      name: "Marshall Akrikor Silikonlu Dış Cephe",
      brand: "Marshall",
      brandClass: "tag-marshall",
      problems: ["ege-gunesi", "sahil-marin"],
      surfaces: ["dis-cephe"],
      badge: "Yüksek UV Koruması",
      bestFor: "Güneş gören güney cephelerde solma ve çatlamaya karşı uzun ömürlü koruma",
      sub: "Akrilik ve silikon reçinelerin birleşimiyle güneşin UV ışınlarına karşı solmayan, esnek ve nefes alan dış cephe boyası.",
      img: "assets/marshall-official/akrikor-silikonlu-akrilik.png",
      sizes: ["15 L", "2.5 L"],
      coverage: "9 – 12 m²/L",
      sheen: "Mat Silikonlu",
      drying: "6 Saat",
      surface: "Dış cephe sıvalı yüzeyler",
      tag: "UV Dirençli",
      whatsappText: "Merhaba, Marshall Akrikor dış cephe boyası hakkında teknik bilgi ve fiyat almak istiyorum."
    },

    // --- DÖNÜŞÜM BOYALARI: FAYANS, MUTFAK DOLABI, TEZGAH, MERMER ---
    "bianca-stella-donusum": {
      id: "bianca-stella-donusum",
      name: "Bianca Stella Su Bazlı Saf Akrilik Dönüşüm Boyası",
      brand: "Bianca Stella",
      brandClass: "tag-bianca",
      problems: ["donusum-fayans", "banyo-mutfak"],
      surfaces: ["fayans-seramik", "mutfak-dolabi", "tezgah-mermer"],
      badge: "Kırmadan Dökmeden Yenileme",
      bestFor: "Banyo fayansları, mutfak dolapları, seramik, tezgah ve mobilya boyama",
      sub: "Astar gerektirmeyen, mükemmel yüzey tutunma gücüne sahip, uygulandığı alanda su geçirmez dayanıklı seramik hissi veren devrim niteliğinde dönüşüm boyası.",
      img: "assets/bianca-official/aile_2024.png",
      sizes: ["1 L", "0.5 L", "0.25 L"],
      coverage: "10 – 12 m²/L (Tek Kat)",
      sheen: "Yarı Mat & Parlak Seçenekli",
      drying: "2 - 4 Saat (Kullanım 24-48 Saat)",
      surface: "Fayans, seramik, tezgah, mermer, ahşap, PVC, metal",
      tag: "Dönüşüm Boyası",
      whatsappText: "Merhaba, Bianca Stella boya ile fayans ve mutfak dolaplarımızı yenilemek istiyoruz, renk ve vernik seti hakkında bilgi alabilir miyim?"
    },
    "bianca-maximo-sivi-cam": {
      id: "bianca-maximo-sivi-cam",
      name: "Bianca Maximo Çift Komponentli Sıvı Cam",
      brand: "Bianca Stella",
      brandClass: "tag-bianca",
      problems: ["donusum-fayans", "su-yalitimi", "banyo-mutfak"],
      surfaces: ["fayans-seramik", "tezgah-mermer", "teras-balkon"],
      badge: "Ağır Kimyasal & Su Koruma Zırhı",
      bestFor: "Duşakabin içi fayanslar, mutfak tezgahı ve teras seramikleri üzerinde çizilmez şeffaf zırh",
      sub: "Boya üstü veya doğrudan seramik yüzeylere uygulanan, kimyasal temizleyicilere, suya ve yoğun sürtünmeye dayanıklı çift bileşenli koruyucu sır.",
      img: "assets/bianca-official/bianca-maximo-sivi-cam-packshot.png",
      sizes: ["1 KG", "0.5 KG"],
      coverage: "8 – 10 m²/KG",
      sheen: "Şeffaf Parlak / Mat",
      drying: "24 Saat (Tam sertleşme 7 gün)",
      surface: "Fayans, granit, mermer, boyalı yüzeyler",
      tag: "Sıvı Cam Zırh",
      whatsappText: "Merhaba, Bianca Maximo sıvı cam ve duşakabin/tezgah koruma seti hakkında bilgi almak istiyorum."
    },
    "filli-aqua-reno": {
      id: "filli-aqua-reno",
      name: "Filli Boya Aqua Reno® Çok Amaçlı Dönüşüm Boyası",
      brand: "Filli Boya",
      brandClass: "tag-filli",
      problems: ["donusum-fayans", "banyo-mutfak"],
      surfaces: ["fayans-seramik", "mutfak-dolabi"],
      badge: "Betek Güvencesiyle Yenileme",
      bestFor: "Mutfak dolapları, mobilyalar ve iç mekan fayanslarında astar gerektirmeyen dönüşüm",
      sub: "Filli Boya kalitesiyle kokusuz, su bazlı, yüksek tutunma mukavemetli dönüşüm boyası.",
      img: "assets/filli-official/aqua-reno-banyo.png",
      sizes: ["0.75 L", "2.5 L"],
      coverage: "10 – 12 m²/L",
      sheen: "İpek Mat",
      drying: "3 - 5 Saat",
      surface: "Ahşap, MDF, metal, seramik, PVC",
      tag: "Dönüşüm Boyası",
      whatsappText: "Merhaba, Filli Boya Aqua Reno dönüşüm boyası fiyatı ve renk seçeneklerini öğrenmek istiyorum."
    },

    // --- TERAS, ÇATI & BALKON SU YALITIMI ---
    "isonem-sb-super-bilesen": {
      id: "isonem-sb-super-bilesen",
      name: "İsonem SB Süper Bileşen Teras Su Yalıtımı",
      brand: "İsonem",
      brandClass: "tag-isonem",
      problems: ["su-yalitimi", "ege-gunesi"],
      surfaces: ["teras-balkon", "cati"],
      badge: "Güneşe ve Yaya Trafiğine Dayanıklı",
      bestFor: "Açık teraslar, balkonlar ve betonarme çatılarda su sızıntılarını kesme",
      sub: "Özel mineral dolgular ve polimer bağlayıcılarla güçlendirilmiş, UV ışınlarına dayanıklı, üzerinde yürünebilen elastik su yalıtım kaplaması.",
      img: "assets/isonem-official/isonem-sb.png",
      sizes: ["18 KG", "5 KG"],
      coverage: "1 – 1.5 kg/m² (Çift Kat)",
      sheen: "Elastik Mat Kaplama",
      drying: "24 Saat",
      surface: "Beton, şap, sıva, mozaik, kiremit",
      tag: "Teras Yalıtımı",
      whatsappText: "Merhaba, teras/balkon su sızıntısı için İsonem SB yalıtım malzemesi hakkında bilgi ve fiyat alabilir miyim?"
    },
    "isonem-pool-havuz": {
      id: "isonem-pool-havuz",
      name: "İsonem Pool Çift Bileşenli Poliüretan Havuz Boyası",
      brand: "İsonem",
      brandClass: "tag-isonem",
      problems: ["su-yalitimi", "sahil-marin"],
      surfaces: ["havuz-su-deposu"],
      badge: "Klor ve Kimyasallara %100 Dayanıklı",
      bestFor: "Villa havuzları, süs havuzları ve beton su depoları",
      sub: "Klor, yosun önleyici ve havuz kimyasallarına karşı çözünmeyen, elastik, mavi renkli profesyonel poliüretan havuz kaplaması.",
      img: "assets/isonem-official/isonem-pool.png",
      sizes: ["4.5 KG Takım"],
      coverage: "0.5 – 1 kg/m²",
      sheen: "Parlak Mavi Su Zırhı",
      drying: "48 Saat (Su doldurma 7 gün)",
      surface: "Betonarme havuz taban ve perdeleri",
      tag: "Havuz Boyası",
      whatsappText: "Merhaba, havuz boyama için İsonem Pool çift bileşenli havuz boyası fiyatı almak istiyorum."
    },

    // --- AHŞAP KORUMA, MARİN & VERANDA ---
    "fawori-yat-vernigi": {
      id: "fawori-yat-vernigi",
      name: "Fawori Marin Yat Verniği",
      brand: "Fawori",
      brandClass: "tag-fawori",
      problems: ["ahsap-marin", "sahil-marin", "ege-gunesi"],
      surfaces: ["ahsap-pergola"],
      badge: "Ayna Parlaklığı & Deniz Tuzu Dayanımı",
      bestFor: "Ahşap pergolalar, verandalar, tekneler ve bahçe mobilyaları",
      sub: "Üretan alkid reçine esaslı, deniz suyu, tuz, nem ve yoğun güneş ışınlarına dayanıklı parlak ahşap verniği.",
      img: "assets/fawori/hero/hero-fawori-4-marin.jpg",
      sizes: ["12 KG", "2.5 L", "0.75 L"],
      coverage: "12 – 15 m²/L",
      sheen: "Ayna Parlak",
      drying: "8 - 12 Saat",
      surface: "Her türlü iç ve dış mekan ahşap yüzey",
      tag: "Yat Verniği",
      whatsappText: "Merhaba, ahşap pergola/veranda için Fawori Yat Verniği fiyat ve ambalaj bilgisi almak istiyorum."
    },
    "marshall-cuprinol": {
      id: "marshall-cuprinol",
      name: "Marshall Cuprinol Ahşap Koruyucu",
      brand: "Marshall",
      brandClass: "tag-marshall",
      problems: ["ahsap-marin", "ege-gunesi"],
      surfaces: ["ahsap-pergola"],
      badge: "Ahşaba Derin Nüfuz Eden Koruma",
      bestFor: "Dış mekan ahşap çit, pergola ve cephe kaplamalarında kurtlanma ve çürümeye karşı koruma",
      sub: "Ahşabın doğal dokusunu kapatmayan, nefes almasını sağlayan ve su itici özellik kazandıran dekoratif koruyucu.",
      img: "assets/marshall-official/cuprinol-ultra-vernikli-ahşap-bakım.png",
      sizes: ["2.5 L", "0.75 L"],
      coverage: "10 – 13 m²/L",
      sheen: "Yarı Şeffaf Ahşap Dokusu",
      drying: "12 Saat",
      surface: "Doğal ahşap, lamine ahşap, çam, ceviz",
      tag: "Ahşap Koruyucu",
      whatsappText: "Merhaba, Marshall Cuprinol ahşap koruyucu renkleri ve fiyatları hakkında bilgi alabilir miyim?"
    },

    // --- DEMİR, METAL & PAS ÖNLEYİCİ ---
    "tek-antipas-rapid": {
      id: "tek-antipas-rapid",
      name: "TEK Boya Endüstriyel Rapid Antipas & Son Kat",
      brand: "TEK Boya",
      brandClass: "tag-tek",
      problems: ["demir-pas", "ekonomik-hizli"],
      surfaces: ["demir-metal"],
      badge: "Hızlı Kuruyan Pas Kalkanı",
      bestFor: "Demir korkuluklar, ferforje bahçe kapıları, sac çatılar ve çelik konstrüksiyon",
      sub: "Korozyona karşı yüksek mukavemet gösteren, fırça ve tabanca uygulamasına uygun, hızlı kuruyan endüstriyel metal astar ve boyası.",
      img: "assets/tekboya-official/701-endustriyel-astar.webp",
      sizes: ["18 KG", "3 KG", "1 KG"],
      coverage: "8 – 11 m²/kg",
      sheen: "Yarı Mat & Parlak",
      drying: "15 - 30 Dakika (Dokunma)",
      surface: "Demir, döküm, çelik, ferforje",
      tag: "Pas Önleyici",
      whatsappText: "Merhaba, metal ferforje/çit için TEK Rapid Antipas ve boya fiyatı almak istiyorum."
    },
    "tek-sentetik-parlak": {
      id: "tek-sentetik-parlak",
      name: "TEK Sentetik Parlak Yağlı Boya",
      brand: "TEK Boya",
      brandClass: "tag-tek",
      problems: ["demir-pas", "silinebilir"],
      surfaces: ["demir-metal", "ahsap-pergola"],
      badge: "Klasik Parlak Yağlı Boya",
      bestFor: "Kapı, pencere, ferforje ve metal eşyalarda parlak ve dayanıklı yüzey",
      sub: "Üstün örtücülük ve parlaklık veren, silinmeye ve atmosfer koşullarına dayanıklı son kat sentetik boya.",
      img: "assets/tekboya-official/302-super-luks-sentetik-yagli-boya.webp",
      sizes: ["15 L", "2.5 L", "0.75 L"],
      coverage: "12 – 16 m²/L",
      sheen: "Yüksek Parlak",
      drying: "6 - 8 Saat",
      surface: "Ahşap, metal ve sıvalı yüzeyler",
      tag: "Sentetik Boya",
      whatsappText: "Merhaba, TEK Sentetik Parlak yağlı boya fiyat ve stok durumunu öğrenebilir miyim?"
    },

    // --- EKONOMİK & TAVAN BOYALARI ---
    "filli-betakril-tavan": {
      id: "filli-betakril-tavan",
      name: "Filli Boya Betakril Ekstra Plastik Tavan Boyası",
      brand: "Filli Boya",
      brandClass: "tag-filli",
      problems: ["ekonomik-hizli"],
      surfaces: ["tavan"],
      badge: "Ekstra Beyaz & Mat Tavan",
      bestFor: "Ev ve işyerlerinde sıçratma yapmayan, pürüzsüz ve ultra beyaz tavan uygulamaları",
      sub: "Yüksek nefes alma kabiliyeti, mükemmel beyazlık ve örtücülük sunan su bazlı profesyonel tavan boyası.",
      img: "assets/filli-official/betakril-tavan.png",
      sizes: ["17.5 KG", "10 KG", "3.5 KG"],
      coverage: "7 – 9 m²/kg",
      sheen: "Tam Mat Beyaz",
      drying: "2 - 3 Saat",
      surface: "Alçıpan, sıva ve beton tavanlar",
      tag: "Tavan Boyası",
      whatsappText: "Merhaba, Filli Boya Betakril tavan boyası kova fiyatı hakkında bilgi alabilir miyim?"
    },
    "fawori-plastik-ic-cephe": {
      id: "fawori-plastik-ic-cephe",
      name: "Fawori Plastik Mat İç Cephe Boyası",
      brand: "Fawori",
      brandClass: "tag-fawori",
      problems: ["ekonomik-hizli"],
      surfaces: ["ic-cephe"],
      badge: "Ekonomik Şantiye & Daire Boyası",
      bestFor: "Kiralık daireler, şantiyeler ve ekonomik bütçeli iç mekan boyama işleri",
      sub: "Ekonomik, nefes alan, mat dokulu, yüksek örtücülüğe sahip su bazlı iç cephe boyası.",
      img: "assets/fawori/fawori-plastik.webp",
      sizes: ["20 KG", "10 KG", "3.5 KG"],
      coverage: "6 – 8 m²/kg",
      sheen: "Mat Plastik",
      drying: "3 - 4 Saat",
      surface: "İç cephe duvarlar",
      tag: "Ekonomik Plastik",
      whatsappText: "Merhaba, Fawori Plastik iç cephe boyası toptan ve perakende kova fiyatı nedir?"
    }
  };

  // 2. DOM ELEMANLARI
  var searchInput = document.getElementById("pvSearchInput");
  var problemFilterPills = document.getElementById("pvProblemPills");
  var surfaceFilterPills = document.getElementById("pvSurfacePills");
  var brandFilterPills = document.getElementById("pvBrandPills");
  var resultsGrid = document.getElementById("pvResultsGrid");
  var resultsCount = document.getElementById("pvResultsCount");
  var resetFiltersBtn = document.getElementById("pvResetFilters");
  var activeFiltersSummary = document.getElementById("pvActiveFiltersSummary");

  // State
  var currentFilters = {
    search: "",
    problem: "all",
    surface: "all",
    brand: "all"
  };

  // 3. FİLTRELEME MOTORU
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

  function renderProducts() {
    if (!resultsGrid) return;

    var query = normalizeText(currentFilters.search.trim());
    var filtered = [];

    Object.keys(paintProducts).forEach(function(key) {
      var item = paintProducts[key];

      // Problem kontrolü
      if (currentFilters.problem !== "all" && item.problems.indexOf(currentFilters.problem) === -1) {
        return;
      }

      // Yüzey kontrolü
      if (currentFilters.surface !== "all" && item.surfaces.indexOf(currentFilters.surface) === -1) {
        return;
      }

      // Marka kontrolü
      if (currentFilters.brand !== "all") {
        var normBrand = normalizeText(item.brand).replace(/\s+/g, '-');
        if (normBrand.indexOf(normalizeText(currentFilters.brand)) === -1) {
          return;
        }
      }

      // Arama metni kontrolü
      if (query.length > 0) {
        var searchHaystack = normalizeText(
          item.name + " " + item.brand + " " + item.badge + " " + item.bestFor + " " + item.sub + " " + item.tag + " " + item.surface
        );
        if (searchHaystack.indexOf(query) === -1) {
          return;
        }
      }

      filtered.push(item);
    });

    // Sayacı güncelle
    if (resultsCount) {
      resultsCount.textContent = filtered.length + " Çözüm";
    }

    // Aktif filtre özeti
    updateActiveFilterSummary();

    // DOM çizimi
    if (filtered.length === 0) {
      resultsGrid.innerHTML = [
        '<div class="pv-empty-state">',
        '  <div class="pv-empty-icon"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div>',
        '  <h3 class="pv-empty-title">Eşleşen Boya Çözümü Bulunamadı</h3>',
        '  <p class="pv-empty-desc">Filtre kriterlerinizi genişletebilir veya uzman boya ekibimize danışabilirsiniz.</p>',
        '  <a href="https://wa.me/905323844497?text=Merhaba,%20ihtiyac%C4%B1ma%20uygun%20boya%20ve%20renk%20se%C3%A7imi%20i%C3%A7in%20yard%C4%B1m%20almak%20istiyorum." target="_blank" rel="noopener" class="pv-btn-primary" style="margin-top:16px; display:inline-flex;">',
        '    <span>Uzmana WhatsApp ile Danış</span>',
        '    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>',
        '  </a>',
        '</div>'
      ].join('');
      return;
    }

    var html = '';
    filtered.forEach(function(item) {
      var waUrl = "https://wa.me/905323844497?text=" + encodeURIComponent(item.whatsappText);

      html += [
        '<article class="pv-finder-card" data-product-id="' + item.id + '">',
        '  <div class="pv-finder-card-media">',
        '    <img src="' + item.img + '" alt="' + item.name + '" loading="lazy" decoding="async" onerror="this.src=\'assets/rf-brand-filliboya.jpg\'">',
        '    <div class="pv-finder-card-badges">',
        '      <span class="pv-finder-badge-brand ' + item.brandClass + '">' + item.brand + '</span>',
        '      <span class="pv-finder-badge-tag">' + item.tag + '</span>',
        '    </div>',
        '  </div>',
        '  <div class="pv-finder-card-body">',
        '    <div class="pv-finder-card-header">',
        '      <div class="pv-finder-card-solves">🎯 ' + item.bestFor + '</div>',
        '      <h3 class="pv-finder-card-title">' + item.name + '</h3>',
        '    </div>',
        '    <p class="pv-finder-card-desc">' + item.sub + '</p>',
        '    <div class="pv-finder-card-specs">',
        '      <div class="pv-finder-spec-row"><span class="spec-k">Doku / Bitiş:</span><span class="spec-v">' + item.sheen + '</span></div>',
        '      <div class="pv-finder-spec-row"><span class="spec-k">Sarfiyat:</span><span class="spec-v">' + item.coverage + '</span></div>',
        '      <div class="pv-finder-spec-row"><span class="spec-k">Ambalaj:</span><span class="spec-v">' + item.sizes.join(' / ') + '</span></div>',
        '    </div>',
        '    <div class="pv-finder-card-actions">',
        '      <button type="button" class="pv-finder-btn-spec pv-open-spec-btn" data-id="' + item.id + '">Teknik Detay</button>',
        '      <a href="' + waUrl + '" target="_blank" rel="noopener" class="pv-finder-btn-quote">',
        '        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
        '        <span>Fiyat & Stok Sor</span>',
        '      </a>',
        '    </div>',
        '  </div>',
        '</article>'
      ].join('');
    });

    resultsGrid.innerHTML = html;
    bindSpecButtons();
  }

  function updateActiveFilterSummary() {
    if (!activeFiltersSummary) return;

    var tags = [];
    if (currentFilters.problem !== "all") {
      var pBtn = problemFilterPills ? problemFilterPills.querySelector('[data-filter="' + currentFilters.problem + '"]') : null;
      if (pBtn) tags.push('<span class="pv-active-tag">İhtiyaç: ' + pBtn.textContent.trim() + '</span>');
    }
    if (currentFilters.surface !== "all") {
      var sBtn = surfaceFilterPills ? surfaceFilterPills.querySelector('[data-filter="' + currentFilters.surface + '"]') : null;
      if (sBtn) tags.push('<span class="pv-active-tag">Yüzey: ' + sBtn.textContent.trim() + '</span>');
    }
    if (currentFilters.brand !== "all") {
      var bBtn = brandFilterPills ? brandFilterPills.querySelector('[data-filter="' + currentFilters.brand + '"]') : null;
      if (bBtn) tags.push('<span class="pv-active-tag">Marka: ' + bBtn.textContent.trim() + '</span>');
    }
    if (currentFilters.search.trim().length > 0) {
      tags.push('<span class="pv-active-tag">Arama: "' + currentFilters.search.trim() + '"</span>');
    }

    if (tags.length > 0) {
      activeFiltersSummary.innerHTML = tags.join('') + ' <button type="button" class="pv-clear-all-btn" id="pvClearAllTrigger">Tümünü Sıfırla ✕</button>';
      var clearBtn = document.getElementById("pvClearAllTrigger");
      if (clearBtn) {
        clearBtn.addEventListener("click", resetAllFilters);
      }
    } else {
      activeFiltersSummary.innerHTML = '<span class="pv-active-hint">Tüm boya ve yalıtım çözümleri görüntüleniyor. Filtreleri kullanarak seçiminizi daraltabilirsiniz.</span>';
    }
  }

  function resetAllFilters() {
    currentFilters.search = "";
    currentFilters.problem = "all";
    currentFilters.surface = "all";
    currentFilters.brand = "all";

    if (searchInput) searchInput.value = "";

    // Pill aktifliklerini sıfırla
    [problemFilterPills, surfaceFilterPills, brandFilterPills].forEach(function(pillContainer) {
      if (!pillContainer) return;
      pillContainer.querySelectorAll('.pv-finder-pill').forEach(function(btn) {
        btn.classList.toggle('active', btn.getAttribute('data-filter') === 'all');
      });
    });

    updateUrlState();
    renderProducts();
  }

  // 4. URL HASH VE QUERY STRING ENTEGRASYONU
  function syncFromUrl() {
    var params = new URLSearchParams(window.location.search);
    var hash = window.location.hash.replace('#', '');

    if (params.has('ihtiyac') || params.has('problem')) {
      var p = params.get('ihtiyac') || params.get('problem');
      currentFilters.problem = p;
    } else if (hash.length > 0) {
      currentFilters.problem = hash;
    }

    if (params.has('yuzey') || params.has('surface')) {
      currentFilters.surface = params.get('yuzey') || params.get('surface');
    }

    if (params.has('marka') || params.has('brand')) {
      currentFilters.brand = params.get('marka') || params.get('brand');
    }

    if (params.has('q')) {
      currentFilters.search = params.get('q');
      if (searchInput) searchInput.value = currentFilters.search;
    }

    // Pill aktifliklerini senkronize et
    syncPillStates();
  }

  function syncPillStates() {
    if (problemFilterPills) {
      problemFilterPills.querySelectorAll('.pv-finder-pill').forEach(function(btn) {
        btn.classList.toggle('active', btn.getAttribute('data-filter') === currentFilters.problem);
      });
    }
    if (surfaceFilterPills) {
      surfaceFilterPills.querySelectorAll('.pv-finder-pill').forEach(function(btn) {
        btn.classList.toggle('active', btn.getAttribute('data-filter') === currentFilters.surface);
      });
    }
    if (brandFilterPills) {
      brandFilterPills.querySelectorAll('.pv-finder-pill').forEach(function(btn) {
        btn.classList.toggle('active', btn.getAttribute('data-filter') === currentFilters.brand);
      });
    }
  }

  function updateUrlState() {
    var params = new URLSearchParams();
    if (currentFilters.problem !== "all") params.set('ihtiyac', currentFilters.problem);
    if (currentFilters.surface !== "all") params.set('yuzey', currentFilters.surface);
    if (currentFilters.brand !== "all") params.set('marka', currentFilters.brand);
    if (currentFilters.search.trim().length > 0) params.set('q', currentFilters.search.trim());

    var newUrl = window.location.pathname;
    var qs = params.toString();
    if (qs.length > 0) newUrl += '?' + qs;

    window.history.replaceState({}, '', newUrl);
  }

  // 5. EVENT LISTENERS
  function setupEventListeners() {
    // Problem hapları
    if (problemFilterPills) {
      problemFilterPills.addEventListener('click', function(e) {
        var btn = e.target.closest('.pv-finder-pill');
        if (!btn) return;
        currentFilters.problem = btn.getAttribute('data-filter') || 'all';
        syncPillStates();
        updateUrlState();
        renderProducts();
      });
    }

    // Yüzey hapları
    if (surfaceFilterPills) {
      surfaceFilterPills.addEventListener('click', function(e) {
        var btn = e.target.closest('.pv-finder-pill');
        if (!btn) return;
        currentFilters.surface = btn.getAttribute('data-filter') || 'all';
        syncPillStates();
        updateUrlState();
        renderProducts();
      });
    }

    // Marka hapları
    if (brandFilterPills) {
      brandFilterPills.addEventListener('click', function(e) {
        var btn = e.target.closest('.pv-finder-pill');
        if (!btn) return;
        currentFilters.brand = btn.getAttribute('data-filter') || 'all';
        syncPillStates();
        updateUrlState();
        renderProducts();
      });
    }

    // Arama kutusu (Canlı)
    if (searchInput) {
      var debounceTimer = null;
      searchInput.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function() {
          currentFilters.search = searchInput.value;
          updateUrlState();
          renderProducts();
        }, 150);
      });
    }

    // Sıfırla butonu
    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener('click', resetAllFilters);
    }
  }

  // 6. TEKNİK SPESİFİKASYON MODAL ENGINE
  var modalBackdrop = document.getElementById("pvSpecModalBackdrop");
  var modalCloseBtn = document.getElementById("pvSpecModalClose");
  var modalContent = document.getElementById("pvSpecModalContent");

  function bindSpecButtons() {
    document.querySelectorAll('.pv-open-spec-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        var id = btn.getAttribute('data-id');
        var product = paintProducts[id];
        if (product) openSpecModal(product);
      });
    });
  }

  function openSpecModal(item) {
    if (!modalBackdrop || !modalContent) return;

    var waUrl = "https://wa.me/905323844497?text=" + encodeURIComponent(item.whatsappText);

    modalContent.innerHTML = [
      '<div class="pv-modal-header">',
      '  <span class="pv-modal-brand ' + item.brandClass + '">' + item.brand + ' Yetkili Bayi Güvencesi</span>',
      '  <h2 class="pv-modal-title">' + item.name + '</h2>',
      '  <div class="pv-modal-solve-pill">🎯 ' + item.bestFor + '</div>',
      '</div>',
      '<div class="pv-modal-grid">',
      '  <div class="pv-modal-media">',
      '    <img src="' + item.img + '" alt="' + item.name + '" onerror="this.src=\'assets/rf-brand-filliboya.jpg\'">',
      '  </div>',
      '  <div class="pv-modal-info">',
      '    <p class="pv-modal-desc">' + item.sub + '</p>',
      '    <div class="pv-modal-specs-table">',
      '      <div class="spec-tr"><span class="spec-td-k">Uygulama Yüzeyi</span><span class="spec-td-v">' + item.surface + '</span></div>',
      '      <div class="spec-tr"><span class="spec-td-k">Doku / Görünüm</span><span class="spec-td-v">' + item.sheen + '</span></div>',
      '      <div class="spec-tr"><span class="spec-td-k">Sarfiyat</span><span class="spec-td-v">' + item.coverage + '</span></div>',
      '      <div class="spec-tr"><span class="spec-td-k">Kuruma Süresi</span><span class="spec-td-v">' + item.drying + '</span></div>',
      '      <div class="spec-tr"><span class="spec-td-k">Mevcut Ambalajlar</span><span class="spec-td-v">' + item.sizes.join(', ') + '</span></div>',
      '      <div class="spec-tr"><span class="spec-td-k">RenXMatik Desteği</span><span class="spec-td-v">✅ Bilgisayarlı Özel Renk Üretimi</span></div>',
      '    </div>',
      '    <div class="pv-modal-actions">',
      '      <a href="' + waUrl + '" target="_blank" rel="noopener" class="pv-modal-wa-btn">',
      '        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
      '        <span>WhatsApp ile Fiyat & Renk Sor</span>',
      '      </a>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join('');

    modalBackdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeSpecModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeSpecModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', function(e) {
      if (e.target === modalBackdrop) closeSpecModal();
    });
  }
  window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('active')) {
      closeSpecModal();
    }
  });

  // 7. INITIALIZE
  document.addEventListener("DOMContentLoaded", function() {
    syncFromUrl();
    setupEventListeners();
    renderProducts();
  });

})();
