/* ARCHITECTURAL JAVASCRIPT ENGINE FOR FASTENERS CATALOG */
(function() {
  "use strict";

  // INJECTED DATA
  var FASTENERS_PRODUCTS_DATA = [
  {
    "id": "akdeniz-alcipan-sivri-35x25",
    "name": "Akdeniz Alçıpan Vidası (Sivri Uçlu 3.5 × 25 mm)",
    "badge": "TS EN 14566 Fosfat Kaplı",
    "tag": "Sivri Uçlu · 3.5x25",
    "deptId": "fastenerScrewsPanel",
    "category": "alcipan-vidasi",
    "thumb": "assets/rf-card-fasteners.jpg",
    "desc": "Alçıpan levhaların 0.70 mm'ye kadar olan sac veya ahşap karkaslara montajında kullanılan, borazan başlı, derin PH2 yıldız yuvalı ve pas korozyonuna dayanıklı siyah fosfat kaplamalı alçı levha vidası.",
    "meta": [
      "3.5 × 25 mm Ebat",
      "Siyah Fosfat Kaplama",
      "1.000 Adet / Kutu"
    ],
    "coverage": "Alçıpan bölme duvar ve asma tavanda m² başına ortalama 25-30 adet",
    "sizes": [
      "1 Kutu (1.000 Adet)",
      "1 Koli (16 Kutu / 16.000 Adet)",
      "Palet Bazı Toptan"
    ],
    "specs": {
      "standard": "TS EN 14566 / DIN 18182",
      "packaging": "1.000 Adetlik Kutu (Ağırlık: ~1.40 kg)",
      "consumption": "Levha kenarlarında 20 cm, ortada 30 cm vida aralığı",
      "mixingRatio": "PH2 bits uç ile montaj",
      "potLife": "Paslanmaya dirençli fosfat kaplama",
      "logistics": "Balçova Mağaza & Urla Depo Stoktan Anında Teslim"
    },
    "accordions": [
      {
        "title": "Borazan Baş ve Havşa Tasarımı",
        "body": "Borazan trompet baş yapısı, vidalandığında alçıpan kartonunu yırtmadan kağıt yüzeyine sıfır gömülür; derz dolgu ve saten perdah alçısının pürüzsüz çekilmesini sağlar."
      },
      {
        "title": "Yüksek Çekme ve Tutunma Gücü",
        "body": "İnce hatve derin diş geometrisi profil sacını hızla kavrar, sıyrılma ve boşa dönme yapmadan rijit sabitleme sağlar."
      }
    ]
  },
  {
    "id": "akdeniz-alcipan-sivri-35x35",
    "name": "Akdeniz Alçıpan Vidası (Sivri Uçlu 3.5 × 35 mm)",
    "badge": "TS EN 14566 Çift Kat Uyumlu",
    "tag": "Sivri Uçlu · 3.5x35",
    "deptId": "fastenerScrewsPanel",
    "category": "alcipan-vidasi",
    "thumb": "assets/rf-card-fasteners.jpg",
    "desc": "Çift kat alçı levha kaplamaları, yangına dayanıklı kırmızı alçıpan ve akustik tavan uygulamalarında karkasa derin penetrasyon sağlayan 35 mm fosfat kaplı alçıpan vidası.",
    "meta": [
      "3.5 × 35 mm Ebat",
      "Çift Kat Levha Montajı",
      "1.000 Adet / Kutu"
    ],
    "coverage": "Çift kat bölme duvar sistemlerinde m² başına 25-30 adet",
    "sizes": [
      "1 Kutu (1.000 Adet)",
      "1 Koli (12 Kutu / 12.000 Adet)",
      "Toptan Koli"
    ],
    "specs": {
      "standard": "TS EN 14566",
      "packaging": "1.000 Adetlik Kutu (Ağırlık: ~1.85 kg)",
      "consumption": "İkinci kat levhada şaşırtmalı sabitleme",
      "mixingRatio": "PH2 vidalama ucu",
      "potLife": "Korozyon dayanımlı",
      "logistics": "Balçova & Urla Stok Teslim"
    },
    "accordions": [
      {
        "title": "Çift Kat Levha Mukavemeti",
        "body": "35 mm boy uzunluğu, ilk alçıpan katını geçerek metal profil sacına en az 10-15 mm tutunma sağlayarak taşıyıcılığı garanti eder."
      }
    ]
  },
  {
    "id": "dalsan-gips-vida-kutu",
    "name": "Dalsan Alçıpan Gips Vidası (Orijinal Sistem)",
    "badge": "Dalsan Alçı Orijinal",
    "tag": "Dalsan Gips · 500 ₺",
    "deptId": "fastenerScrewsPanel",
    "category": "alcipan-vidasi",
    "thumb": "assets/rf-card-fasteners.jpg",
    "desc": "Dalsan Alçı ve Alçıtepe bölme duvar sistemlerinin resmi şartnamelerine tam uyumlu, yüksek kaliteli sertleştirilmiş çelik gövdeye sahip fosfat kaplı gips vidası.",
    "meta": [
      "Raf Fiyatı: 500 ₺",
      "1.000 Adet / Kutu",
      "Dalsan Sistem Garantili"
    ],
    "coverage": "Alçıtepe bölme duvar ve asma tavan şartname montajı",
    "sizes": [
      "1 Kutu (1.000 Adet) — 500 ₺",
      "Koli Bazı (16 Kutu)",
      "Şantiye Palet Sevk"
    ],
    "specs": {
      "standard": "Dalsan Sistem Standardı / TS EN 14566",
      "packaging": "Dalsan Logolu 1.000 Adet Kutu",
      "consumption": "Proje şartnamesine uygun sıklık",
      "mixingRatio": "Akülü vidalama ile doğrudan montaj",
      "potLife": "Uzun ömürlü sert çelik çekirdek",
      "logistics": "Balçova Mağaza & Urla Depo Sevk"
    },
    "accordions": [
      {
        "title": "Şartname ve Sistem Garantisi",
        "body": "Resmi konut ve ticari projelerde Dalsan sistem garantisinin korunması için orijinal Dalsan gips vidaları tercih edilmelidir."
      }
    ]
  },
  {
    "id": "akdeniz-matkap-uclu-alcipan-35x25",
    "name": "Akdeniz Matkap Uçlu Alçıpan Vidası (3.5 × 25 mm)",
    "badge": "Kendinden Delen Matkap Uç",
    "tag": "Matkap Uçlu · 3.5x25",
    "deptId": "fastenerScrewsPanel",
    "category": "akilli-vida",
    "thumb": "assets/rf-card-fasteners.jpg",
    "desc": "0.70 mm ile 2.25 mm kalınlığındaki ağır çelik karkas profillerine alçı levha vidalanırken ön delme gerektirmeyen kendinden delen matkap uçlu alçıpan vidası.",
    "meta": [
      "3.5 × 25 mm Ebat",
      "2.25 mm Sac Delme Kapasitesi",
      "1.000 Adet / Kutu"
    ],
    "coverage": "Ağır çelik ve kutu profil karkaslarda m² başına 25 adet",
    "sizes": [
      "1 Kutu (1.000 Adet)",
      "Koli (16 Kutu)",
      "Toptan Palet"
    ],
    "specs": {
      "standard": "DIN 7504 / TS EN 14566",
      "packaging": "1.000 Adetlik Kutu",
      "consumption": "Ağır profil karkaslarında",
      "mixingRatio": "PH2 bits",
      "potLife": "Sertleştirilmiş matkap ucu",
      "logistics": "Urla & Balçova Stok"
    },
    "accordions": [
      {
        "title": "Ağır Sacı Ön Delmesiz Delme",
        "body": "Sertleştirilmiş kesici matkap ucu, 2 mm'ye kadar kalın profilleri saniyeler içinde deler ve dişi kendisi açarak sabitler."
      }
    ]
  },
  {
    "id": "akdeniz-trapez-cati-vidasi",
    "name": "Akdeniz EPDM Contalı Trapez Sac Çatı Vidası",
    "badge": "EPDM Su İzolasyon Contalı",
    "tag": "Trapez Sac · 4.8x25-75",
    "deptId": "fastenerScrewsPanel",
    "category": "akilli-vida",
    "thumb": "assets/rf-card-fasteners.jpg",
    "desc": "Sandviç panel, trapez sac ve oluklu çatı kaplamalarının çelik aşık veya ahşap karkaslara sabitlenmesinde %100 su sızdırmazlık sağlayan vulkanize EPDM contalı altıköşe başlı çatı vidası.",
    "meta": [
      "4.8 × 25 – 75 mm Boylar",
      "8 mm Altıköşe Baş",
      "Vulkanize EPDM Pul"
    ],
    "coverage": "Çatı ve cephe trapez panellerinde m² başına 6-8 adet",
    "sizes": [
      "4.8 × 25 mm (500 Adet)",
      "4.8 × 35 mm (500 Adet)",
      "4.8 × 50 mm (300 Adet)",
      "4.8 × 75 mm (250 Adet)"
    ],
    "specs": {
      "standard": "DIN 7504-K / ISO 15480",
      "packaging": "Pencereli Karton Kutu",
      "consumption": "Rüzgar yüküne göre aşık hatlarında",
      "mixingRatio": "8 mm manyetik lokma ucu",
      "potLife": "Çinko kaplı + UV dayanımlı EPDM",
      "logistics": "Urla Depo Çatı Malzemeleri Dağıtımı"
    },
    "accordions": [
      {
        "title": "UV ve Sıcaklık Dayanımlı EPDM Conta",
        "body": "Ege ve Akdeniz güneşinde sertleşmeyen ve çatlamayan vulkanize EPDM conta pulu, sac büzüşme genleşmelerinde tam sızdırmazlık sunar."
      }
    ]
  },
  {
    "id": "sunta-vidasi-yhb-sari-35x25",
    "name": "YHB Sarı Pasivasyonlu Sunta Vidası (3.5 × 25 mm)",
    "badge": "DIN 7505 Sarı Çinko",
    "tag": "Sunta Vidası · 3.5x25",
    "deptId": "fastenerWoodScrewsPanel",
    "category": "sunta-vidasi",
    "thumb": "assets/rf-card-fasteners.jpg",
    "desc": "MDF, sunta, masif ahşap ve kontraplak mobilya imalatında ahşabı yarmayan derin dişli, sarı galvaniz kaplamalı havşa başlı yıldız sunta vidası.",
    "meta": [
      "3.5 × 25 mm Boy",
      "Sarı Pasivasyon (Korozyonsuz)",
      "1.000 Adet / Kutu"
    ],
    "coverage": "Menteşe, ray ve modüler gövde bağlantılarında",
    "sizes": [
      "1 Kutu (1.000 Adet)",
      "1 Koli (16 Kutu)",
      "Toptan Koli"
    ],
    "specs": {
      "standard": "DIN 7505-A",
      "packaging": "1.000 Adetlik Kutu",
      "consumption": "Standart mobilya montajı",
      "mixingRatio": "PZ2 vidalama ucu",
      "potLife": "Sarı çinko pas koruması",
      "logistics": "Balçova Mağaza & Urla Depo"
    },
    "accordions": [
      {
        "title": "Ahşabı Çatlatmayan Özel Uç",
        "body": "Sivri kılavuz ucu ahşap liflerini keserek ilerler, kenara yakın vidalamalarda bile sunta veya MDF'nin ayrılmasını önler."
      }
    ]
  },
  {
    "id": "sunta-vidasi-yhb-sari-4x40",
    "name": "YHB Sarı Pasivasyonlu Sunta Vidası (4.0 × 40 mm)",
    "badge": "DIN 7505 Çok Amaçlı",
    "tag": "Sunta Vidası · 4x40",
    "deptId": "fastenerWoodScrewsPanel",
    "category": "sunta-vidasi",
    "thumb": "assets/rf-card-fasteners.jpg",
    "desc": "Kasa birleştirme, süpürgelik montajı, ahşap karkas ve genel marangozluk imalatlarında kullanılan en popüler ölçüye sahip 4x40 mm sarı çinko sunta vidası.",
    "meta": [
      "4.0 × 40 mm Ebat",
      "Havşa Başlı Yıldız Yuvalı",
      "1.000 Adet / Kutu"
    ],
    "coverage": "Mobilya gövde birleşimlerinde",
    "sizes": [
      "1 Kutu (1.000 Adet)",
      "1 Koli (12 Kutu)",
      "Toptan Koli Sevk"
    ],
    "specs": {
      "standard": "DIN 7505-A",
      "packaging": "1.000 Adetlik Kutu",
      "consumption": "Gövde ve panel montajı",
      "mixingRatio": "PZ2 bits ucu",
      "potLife": "Paslanmaya dirençli sarı galvaniz",
      "logistics": "Balçova & Urla Stok"
    },
    "accordions": [
      {
        "title": "Havşa Baş ile Yüzeye Sıfır Montaj",
        "body": "90 derecelik havşa geometrisi ahşap veya plastik kapağın vida üzerine tam oturmasını sağlar."
      }
    ]
  },
  {
    "id": "sunta-vidasi-yhb-sari-5x60",
    "name": "YHB Sarı Pasivasyonlu Ağır Ahşap Vidası (5.0 × 60 mm)",
    "badge": "Ağır Ahşap & Karkas",
    "tag": "Ağaç Vidası · 5x60",
    "deptId": "fastenerWoodScrewsPanel",
    "category": "sunta-vidasi",
    "thumb": "assets/rf-card-fasteners.jpg",
    "desc": "Pergole, ahşap çatı karkası, lambiri altı çıtalama ve ağır ahşap taşıyıcı birleşimlerinde yüksek çekme direnci sunan 5x60 mm kalın gövdeli ahşap vidası.",
    "meta": [
      "5.0 × 60 mm Ebat",
      "Geniş Hatveli Ahşap Dişi",
      "500 Adet / Kutu"
    ],
    "coverage": "Ahşap pergola ve karkas imalatı",
    "sizes": [
      "1 Kutu (500 Adet)",
      "1 Koli (8 Kutu)",
      "Toptan Koli"
    ],
    "specs": {
      "standard": "DIN 7505-A / TS 431",
      "packaging": "500 Adetlik Kutu",
      "consumption": "Statik ahşap bağlantı sıklığı",
      "mixingRatio": "PZ2 veya PZ3 ucu",
      "potLife": "Yüksek burulma mukavemeti",
      "logistics": "Urla Depo Sevk"
    },
    "accordions": [
      {
        "title": "Burulmaya Dayanıklı Çelik Çekirdek",
        "body": "Isıl işlem görmüş çelik gövde, sert meşe, çam veya emprenyeli ahşaplara akülü torklu vidalama ile sıkılırken baş kopması yapmaz."
      }
    ]
  },
  {
    "id": "mobilya-minifix-baglanti-seti",
    "name": "Mobilya Minifix Gövde & Mil Bağlantı Seti (Kam & Mil)",
    "badge": "Demonte Mobilya Donanımı",
    "tag": "Minifix Seti · 15mm",
    "deptId": "fastenerWoodScrewsPanel",
    "category": "mobilya-baglanti",
    "thumb": "assets/rf-card-fasteners.jpg",
    "desc": "Demonte gardırop, mutfak dolabı ve modüler mobilya gövdelerinde gizli, sağlam ve tekrar sökülebilir birleşim sağlayan zamak eksantrik çektirme kamı ve dişli çelik mil.",
    "meta": [
      "Ø15 mm Çinko Kam Gövde",
      "34 mm Dübelli Çelik Mil",
      "100 Takım / Paket"
    ],
    "coverage": "Dolap modül köşelerinde modül başına 8-12 takım",
    "sizes": [
      "100 Takım (Gövde + Mil)",
      "500 Takım Paket",
      "Koli Bazı Toptan"
    ],
    "specs": {
      "standard": "ISO 9001 / Mobilya Donanım Normu",
      "packaging": "Kilitli Poşet / Kutu",
      "consumption": "Modül gövde köşelerinde",
      "mixingRatio": "PZ2 tornavida ile kilit çevirme",
      "potLife": "Paslanmaz çinko döküm",
      "logistics": "Balçova Showroom & Urla Depo"
    },
    "accordions": [
      {
        "title": "Gizli ve Dayanıklı Rijit Çektirme",
        "body": "Eksantrik kilit döndürüldüğünde panelleri birbirine 100 kg'ın üzerinde basınçla çektirir, sallantıyı ve gevşemeyi tamamen ortadan kaldırır."
      }
    ]
  },
  {
    "id": "torx-baskili-ahsap-yapilari-vidasi",
    "name": "Torx Başlı Pul Başlıklı Karkas Ahşap Vidası (6.0 × 100 mm)",
    "badge": "T-Drive TX30 Ağır Karkas",
    "tag": "Torx Karkas · 6x100",
    "deptId": "fastenerWoodScrewsPanel",
    "category": "ahsap-vidasi",
    "thumb": "assets/rf-card-fasteners.jpg",
    "desc": "Ahşap sundurma, veranda, çatı makası ve masif kütük birleştirmelerinde pul gerektirmeyen geniş basma başlı, kaydırmayan TX30 Torx yuvalı ağır hizmet yapı vidası.",
    "meta": [
      "6.0 × 100 mm Boy",
      "Entegre Geniş Baskı Pulu",
      "100 Adet / Kutu"
    ],
    "coverage": "Ahşap yapı karkaslarında birleşim başına 2-4 adet",
    "sizes": [
      "1 Kutu (100 Adet)",
      "5 Kutu Koli",
      "Toptan Sevk"
    ],
    "specs": {
      "standard": "ETA Onaylı Ahşap Yapı Standardı",
      "packaging": "100 Adet Kutu",
      "consumption": "Taşıyıcı dikme ve aşık bağlantılarında",
      "mixingRatio": "TX30 Torx ucu",
      "potLife": "Korozyona dirençli çinko kaplama",
      "logistics": "Urla Depo Ağır Ahşap Dağıtımı"
    },
    "accordions": [
      {
        "title": "TX30 Torx ile Kaymayan Maksimum Tork",
        "body": "Torx diş geometrisi akülü vidalama ucunun kaymasını ve sıyrılmasını engeller; sert ahşap içine ön delmesiz yüksek torkla rahat giriş sağlar."
      }
    ]
  },
  {
    "id": "celik-dubel-gomlekli-m8-m10-m12",
    "name": "Gömlekli Çelik Dübel (M8 / M10 / M12)",
    "badge": "Ağır Yük Mekanik Ankraj",
    "tag": "Gömlekli Dübel · M8-M12",
    "deptId": "fastenerAnchorsPanel",
    "category": "celik-dubel",
    "thumb": "assets/rf-card-fasteners.jpg",
    "desc": "Beton döşeme, kiriş ve kolonlara çelik konstrüksiyon ayakları, yangın tesisat boruları, makine kaideleri ve korkuluk montajında yüksek kesme ve çekme dayanımı sunan konik açılmalı gömlekli çelik dübel.",
    "meta": [
      "M8 / M10 / M12 Çaplar",
      "Elektro Galvaniz Çelik",
      "50 - 100 Adet / Kutu"
    ],
    "coverage": "Betonarme elemanlara ağır mekanik montaj",
    "sizes": [
      "M8 × 75 mm (100 Adet)",
      "M10 × 85 mm (50 Adet)",
      "M12 × 110 mm (25 Adet)",
      "M16 × 145 mm (20 Adet)"
    ],
    "specs": {
      "standard": "TS EN ISO 898 / DIN 125",
      "packaging": "Karton Kutu (Somun ve Pul Dahil)",
      "consumption": "Statik montaj projesine göre",
      "mixingRatio": "Lokma anahtarı ile torklu sıkım",
      "potLife": "Paslanmaya dirençli galvaniz gövde",
      "logistics": "Balçova Showroom & Urla Depo"
    },
    "accordions": [
      {
        "title": "Konik Çektirme ile Güvenli Kilitlenme",
        "body": "Somun sıkıldıkça konik mil çelik gömleği dışarı doğru genişletir, beton deliğinin çeperine 4 yönden kilitlenerek monolitik tutunma sağlar."
      }
    ]
  },
  {
    "id": "celik-dubel-klipsli-s-tipi",
    "name": "Klipsli Ağır Yük Çelik Dübeli (S Tipi / Throughbolt)",
    "badge": "C20/25 Çatlaklı Betona Uygun",
    "tag": "Klipsli Dübel · M10-M16",
    "deptId": "fastenerAnchorsPanel",
    "category": "celik-dubel",
    "thumb": "assets/rf-card-fasteners.jpg",
    "desc": "Boydan boya dişli yapısıyla montaj parçası üzerinden doğrudan betona delinerek çakılabilen, paslanmaz çelik bilezikli en güvenilir ağır yük ankraj dübeli.",
    "meta": [
      "M10 × 90 mm / M12 × 120 mm",
      "Paslanmaz Çelik Klips Bileziği",
      "50 Adet / Kutu"
    ],
    "coverage": "Çelik kolon pabuçları, asansör rayları ve cephe karkasları",
    "sizes": [
      "M10 × 90 mm (50 Adet)",
      "M12 × 120 mm (25 Adet)",
      "M16 × 140 mm (20 Adet)"
    ],
    "specs": {
      "standard": "ETA-01/0005 / EN 1992-4",
      "packaging": "Kutu Sevk",
      "consumption": "Mühendislik ankraj planı",
      "mixingRatio": "Tork anahtarı ile tork değeri kontrollü montaj",
      "potLife": "Yüksek sünek çelik",
      "logistics": "Urla Depo Çıkışlı Sevk"
    },
    "accordions": [
      {
        "title": "Şablon Gerekmeden Hızlı Montaj",
        "body": "Montaj deliği parça takılıyken delinebilir; çelik profil delinip ardından dübel direkt çakılarak zaman tasarrufu sağlar."
      }
    ]
  },
  {
    "id": "cakmali-dubel-drop-in",
    "name": "Çakmalı Çelik Dübel (Drop-In Anchor M8 / M10 / M12)",
    "badge": "Tavan & Tesisat Askı Standart",
    "tag": "Çakmalı Dübel · M8-M12",
    "deptId": "fastenerAnchorsPanel",
    "category": "celik-dubel",
    "thumb": "assets/rf-card-fasteners.jpg",
    "desc": "Tavana havalandırma kanalı, kablo tavası, sprinkler yangın borusu ve asma tavan tij askılarının bağlanmasında beton içine gömülen dişi dişli çakmalı çelik dübel.",
    "meta": [
      "M8 / M10 / M12 İç Diş",
      "Dahili Genleşme Konisi",
      "100 Adet / Kutu"
    ],
    "coverage": "Mekanik tesisat askılama noktaları",
    "sizes": [
      "M8 (100 Adet)",
      "M10 (100 Adet)",
      "M12 (50 Adet)"
    ],
    "specs": {
      "standard": "DIN 7965 / ETAG 001",
      "packaging": "100 Adetlik Kutu",
      "consumption": "Askı mesafelerine göre 1-1.5 metrede bir",
      "mixingRatio": "Çakma aparatı ve çekiç ile patlatma",
      "potLife": "Galvaniz kaplı çelik",
      "logistics": "Balçova Mağaza & Urla Depo"
    },
    "accordions": [
      {
        "title": "İç Dişli Yapı ile Metrik Tij Uyumu",
        "body": "Beton yüzeyine sıfır çakılır; metrik gijon / tij doğrudan içine vidalanarak istenilen boyda askı tijleme sistemi kurulur."
      }
    ]
  },
  {
    "id": "kancali-halkali-celik-dubel",
    "name": "Kancalı & Halkalı Çelik Tavan Dübeli (Açık & Kapalı Kanca)",
    "badge": "Askı & Halat Sabitleme",
    "tag": "Kancalı Dübel · M6-M10",
    "deptId": "fastenerAnchorsPanel",
    "category": "celik-dubel",
    "thumb": "assets/rf-card-fasteners.jpg",
    "desc": "Avize, tavan salıncağı, asma koltuk, tente germe teli ve emniyet zincirlerinin beton tavana veya duvara güvenle asılmasını sağlayan dövme kancalı çelik dübel.",
    "meta": [
      "M6 / M8 / M10 Boylar",
      "Dövme Çelik Kanca & Halka",
      "25 - 50 Adet / Kutu"
    ],
    "coverage": "Ağır avize, hamak ve tente montaj noktaları",
    "sizes": [
      "M6 Açık Kanca (50 Adet)",
      "M8 Açık Kanca (25 Adet)",
      "M8 Kapalı Halka (25 Adet)",
      "M10 Açık Kanca (25 Adet)"
    ],
    "specs": {
      "standard": "TS EN 12385 / DIN 1480",
      "packaging": "Poşet & Kutu",
      "consumption": "Noktasal statik yükleme",
      "mixingRatio": "Anahtar ile gömlek sıkma",
      "potLife": "Çinko kaplı dövme çelik",
      "logistics": "Balçova Showroom & Urla Depo"
    },
    "accordions": [
      {
        "title": "Dövme Çelik Kanca Mukavemeti",
        "body": "Bükme tel yerine sıcak dövme çelikten imal edilen kanca kısmı, dinamik sallantılı yüklerde açılma yapmaz."
      }
    ]
  },
  {
    "id": "kimyasal-ankraj-kartusu-410ml",
    "name": "Epoksi Akrilat Kimyasal Dübel Kartuşu (410 ml)",
    "badge": "ETA Onaylı Ağır Yük Ankrajı",
    "tag": "Kimyasal Dübel · 410 ml",
    "deptId": "fastenerAnchorsPanel",
    "category": "kimyasal-dubel",
    "thumb": "assets/rf-card-fasteners.jpg",
    "desc": "Tuğla, gazbeton ve donatılı betonda genleşme basıncı oluşturmadan kenara sıfır mesafelerde yüksek taşıma kapasiteli tij ve donatı ekimi sağlayan stirensiz kimyasal harç.",
    "meta": [
      "410 ml Profesyonel Kartuş",
      "Stirensiz (Kokusuz Kapalı Alan)",
      "1 Mikser Nozul Dahil"
    ],
    "coverage": "12 mm delikte ~20-25 adet M10 tij ankrajı",
    "sizes": [
      "Tek Kartuş (410 ml)",
      "1 Koli (12 Kartuş)",
      "Yedek Karıştırıcı Uç (10'lu Paket)"
    ],
    "specs": {
      "standard": "ETA Onaylı / TS EN 1504-6",
      "packaging": "410 ml Koaksiyel Kartuş",
      "consumption": "Delik çapı ve tij derinliğine göre hesaplanır",
      "mixingRatio": "Statik mikser uç ile 1:10 otomatik karışım",
      "potLife": "20°C'de Jel süresi: 6 dk / Tam kuruma: 45 dk",
      "logistics": "Balçova Showroom & Urla Depo"
    },
    "accordions": [
      {
        "title": "Kenar Mesafesi Olmadan Ankraj",
        "body": "Mekanik dübeller gibi betonda gerilme ve patlatma yapmadığı için kolon köşelerine ve ince beton kenarlarına güvenle uygulanır."
      }
    ]
  },
  {
    "id": "plastik-dubel-universal-no6-8-10",
    "name": "Universal Plastik Dübel Seti (No: 6 / 7 / 8 / 10)",
    "badge": "Yüksek Yoğunluklu Polietilen",
    "tag": "Universal Dübel · No 6-10",
    "deptId": "fastenerPlugsPanel",
    "category": "plastik-dubel",
    "thumb": "assets/rf-card-fasteners.jpg",
    "desc": "Tuğla, beton, briket ve sıvalı duvarlarda elektrik panosu, tablo, ayna, mutfak dolabı ve raf montajında dönmeyi önleyen kanatçıklı 1. sınıf hammadde plastik dübel.",
    "meta": [
      "No:6 / No:7 / No:8 / No:10",
      "Dönme Önleyici 4 Kanatçık",
      "500 - 1.000 Adet / Paket"
    ],
    "coverage": "Genel iç mekan montaj işleri",
    "sizes": [
      "No: 6 (1.000 Adet)",
      "No: 7 (1.000 Adet)",
      "No: 8 (500 Adet)",
      "No: 10 (250 Adet)",
      "Karışık Usta Kutusu"
    ],
    "specs": {
      "standard": "TS 431 / RoHS Uyumlu HDPE",
      "packaging": "Kilitli Poşet / Kutu",
      "consumption": "Delik derinliği dübel boyundan 5 mm fazla olmalıdır",
      "mixingRatio": "Uygun vidalama ebadı ile",
      "potLife": "Esnemeyen saf plastik gövde",
      "logistics": "Balçova Mağaza & Urla Depo"
    },
    "accordions": [
      {
        "title": "Yırtılmayan ve Boşa Dönmeyen Kanat Sistemi",
        "body": "Duvarda vidayı sıkarken dübelin deliğin içinde fırıldak gibi dönmesini engelleyen radyal kilit kanatlarına sahiptir."
      }
    ]
  },
  {
    "id": "alcipan-burgulu-dubel-plastik",
    "name": "Burgulu Plastik Alçıpan Dübeli (Kendinden Kılavuzlu)",
    "badge": "Ön Delmesiz Montaj",
    "tag": "Burgulu Dübel · Plastik",
    "deptId": "fastenerPlugsPanel",
    "category": "alcipan-dubeli",
    "thumb": "assets/rf-card-fasteners.jpg",
    "desc": "Alçıpan bölme duvar ve tavanlara matkap ile ön delik delmeden, doğrudan PH2 tornavida ile çevrilerek vidalanan yüksek tutunmalı plastik helezon dübel.",
    "meta": [
      "Matkapsız Doğrudan Vidalama",
      "15 kg Taşıma Kapasitesi",
      "100 Adet / Paket"
    ],
    "coverage": "Alçıpan levha üzerine hafif ve orta yük montajı",
    "sizes": [
      "100 Adetlik Paket",
      "500 Adetlik Kutu",
      "Koli Bazı"
    ],
    "specs": {
      "standard": "Alçıpan Donanım Normu",
      "packaging": "100 Adetlik Paket",
      "consumption": "Tablo, aplik ve hafif raflar için",
      "mixingRatio": "PH2 veya PZ2 tornavida ile sıkım",
      "potLife": "Kırılmayan naylon poliamid gövde",
      "logistics": "Balçova Showroom & Urla Depo"
    },
    "accordions": [
      {
        "title": "Alçıpan Kartonunu Bozmadan Tutunma",
        "body": "Geniş helezonik dış yivleri alçı çekirdeğe derinlemesine gömülür, levhanın arka boşluğuna baskı yaparak güvenli montaj sağlar."
      }
    ]
  },
  {
    "id": "alcipan-burgulu-dubel-metal-zamak",
    "name": "Metal Zamak Burgulu Alçıpan Dübeli (Metal Helezon)",
    "badge": "Yangına Dirençli Metal",
    "tag": "Zamak Dübel · 100'lü",
    "deptId": "fastenerPlugsPanel",
    "category": "alcipan-dubeli",
    "thumb": "assets/rf-card-fasteners.jpg",
    "desc": "Yangın dayanımı istenen mekanlarda, sert çift kat alçıpanlarda ve daha ağır aksesuarlarda ezilmeden doğrudan vidalanabilen sert çinko döküm metal burgu dübel.",
    "meta": [
      "Zamak Çinko Alaşım Gövde",
      "25 kg Taşıma Kapasitesi",
      "100 Adet / Kutu"
    ],
    "coverage": "Yangın dayanımlı alçıpan sistemleri",
    "sizes": [
      "100 Adetlik Kutu",
      "500 Adetlik Kutu",
      "Toptan Sevk"
    ],
    "specs": {
      "standard": "DIN 4102 Yangın Sınıfı Uyumlu",
      "packaging": "100 Adet Kutu",
      "consumption": "Orta ağırlıkta radyatör konsolu ve dolap montajı",
      "mixingRatio": "PH2 bits ile şarjlı vidalama",
      "potLife": "Erimayan metal gövde",
      "logistics": "Balçova & Urla Stok"
    },
    "accordions": [
      {
        "title": "Ateşe ve Yüksek Sıcaklığa Dayanıklı",
        "body": "Plastik muadillerinin aksine yangın esnasında erimez; emniyet hatları ve yangın alarm elemanlarının montajında tercih edilir."
      }
    ]
  },
  {
    "id": "gazbeton-dubeli-helezonik-plastik",
    "name": "Gazbeton (Ytong) Dübeli (Helezonik Kılavuzlu)",
    "badge": "Ytong & Bims Uyumlu",
    "tag": "Gazbeton Dübel · 8-10mm",
    "deptId": "fastenerPlugsPanel",
    "category": "gazbeton-dubeli",
    "thumb": "assets/rf-card-fasteners.jpg",
    "desc": "Gazbeton, pomza ve bims gibi gözenekli ve ufalanabilen yumuşak duvar bloklarında standart dübellerin sıyrılmasını engelleyen spiral kanatlı özel gazbeton dübeli.",
    "meta": [
      "Ø8 mm / Ø10 mm Ebat",
      "Spiral Kanatlı Helezon Yüzey",
      "50 Adet / Paket"
    ],
    "coverage": "Ytong ve bims duvarlarda her türlü montaj",
    "sizes": [
      "Ø8 × 50 mm (50 Adet)",
      "Ø10 × 60 mm (25 Adet)",
      "Paket Sevk"
    ],
    "specs": {
      "standard": "DIN EN ISO 9001",
      "packaging": "Poşet / Kutu",
      "consumption": "Ytong duvar bloklarında",
      "mixingRatio": "Alyan veya tornavida ile vidalama",
      "potLife": "Aşınmaz polietilen",
      "logistics": "Balçova Showroom & Urla Depo"
    },
    "accordions": [
      {
        "title": "Ufalanan Gözenekli Yüzeyde Sıfır Sıyrılma",
        "body": "Geniş dış spiral kanatlar gazbeton hücresel yapısına derinlemesine kilitlenir; standart dübeller gibi deliği büyüterek çıkma yapmaz."
      }
    ]
  },
  {
    "id": "bosluklu-tugla-roketi-dubel",
    "name": "Boşluklu Tuğla Roket Dübeli (Kanatlı Kilit)",
    "badge": "Delikli Tuğla Kilit Sistemi",
    "tag": "Roket Dübel · 8-10mm",
    "deptId": "fastenerPlugsPanel",
    "category": "plastik-dubel",
    "thumb": "assets/rf-card-fasteners.jpg",
    "desc": "Yatay delikli tuğlalarda vida sıkıldığında tuğla boşluğunda topaklanarak düğüm oluşturan ve tuğla et kalınlığına arkadan tutunan roket tip kilit dübel.",
    "meta": [
      "Ø8 mm / Ø10 mm Boylar",
      "Boşlukta Düğüm Oluşturan Yapı",
      "100 Adet / Paket"
    ],
    "coverage": "Delikli tuğla duvarlarda mutfak dolabı ve kombi montajı",
    "sizes": [
      "Ø8 × 60 mm (100 Adet)",
      "Ø10 × 75 mm (50 Adet)"
    ],
    "specs": {
      "standard": "TS EN ISO 14001",
      "packaging": "100 Adetlik Paket",
      "consumption": "Boşluklu tuğla duvarlar",
      "mixingRatio": "Uygun ağaç vidası ile",
      "potLife": "Elastik poliamid naylon",
      "logistics": "Balçova Showroom & Urla Depo"
    },
    "accordions": [
      {
        "title": "Boşlukta Düğüm Kilidi",
        "body": "Tuğlanın iç odacıklarına denk geldiğinde vida ucu dübeli kendi üzerine kıvırarak plastik bir yumru oluşturur ve deliğin dışına çıkışı imkansız kılar."
      }
    ]
  },
  {
    "id": "civata-din933-tam-dis-8-8-celik",
    "name": "DIN 933 8.8 Kalite Tam Diş Altıköşe Cıvata (M6 – M16)",
    "badge": "8.8 Yüksek Mukavemetli Çelik",
    "tag": "DIN 933 Cıvata · 8.8 Kalite",
    "deptId": "fastenerBoltsPanel",
    "category": "civata",
    "thumb": "assets/rf-card-fasteners.jpg",
    "desc": "Makine imalatı, çelik konstrüksiyon, flanş bağlantıları ve ağır mekanik şantiyelerde 800 N/mm² kopma mukavemetine sahip 8.8 kalite tam diş elektro galvanizli altıköşe başlı çelik cıvata.",
    "meta": [
      "8.8 Çelik Sertlik Sınıfı",
      "M6 – M16 Çap / 20 – 100 mm Boy",
      "Kilo / Adet Bazı Satış"
    ],
    "coverage": "Ağır çelik ve makine bağlantıları",
    "sizes": [
      "M8 × 30 mm (100 Adet)",
      "M10 × 40 mm (50 Adet)",
      "M12 × 50 mm (50 Adet)",
      "M16 × 70 mm (25 Adet)",
      "Kg Bazı Toptan"
    ],
    "specs": {
      "standard": "DIN 933 / ISO 4017 / TS EN ISO 4017",
      "packaging": "Karton Koli / 25 kg Çuval",
      "consumption": "Statik çelik projelerine göre",
      "mixingRatio": "Tork değerine uygun anahtar sıkımı",
      "potLife": "Beyaz elektro galvaniz kaplama",
      "logistics": "Balçova Showroom & Urla Depo Çıkışlı Sevk"
    },
    "accordions": [
      {
        "title": "8.8 Çelik Standardı ve Kesme Direnci",
        "body": "Isıl işlem görmüş alaşımlı karbon çeliği gövde, dinamik şok darbelerine ve titreşimli kesme yüklerine karşı maksimum güvenlik katsayısına sahiptir."
      }
    ]
  },
  {
    "id": "somun-din934-standart-ve-fiberli",
    "name": "DIN 934 Altıköşe Somun & DIN 985 Fiberli Somun (M6 – M16)",
    "badge": "DIN 934 / DIN 985 Titreşim Emniyeti",
    "tag": "Somun Grubu · M6-M16",
    "deptId": "fastenerBoltsPanel",
    "category": "somun",
    "thumb": "assets/rf-card-fasteners.jpg",
    "desc": "Titreşimli ortamlarda somunun kendi kendine gevşemesini engelleyen mavi naylon emniyet bilezikli DIN 985 fiberli somunlar ve DIN 934 standart galvanizli metrik altıköşe somunlar.",
    "meta": [
      "DIN 934 Standart / DIN 985 Fiberli",
      "M6 – M16 Metrik Diş",
      "Kutu / Kg ile Satış"
    ],
    "coverage": "Cıvata ve gijon tij uçlarında kilitleme",
    "sizes": [
      "M8 Fiberli (100 Adet)",
      "M10 Fiberli (100 Adet)",
      "M12 Fiberli (50 Adet)",
      "M8 Standart (500 Adet)",
      "M10 Standart (250 Adet)"
    ],
    "specs": {
      "standard": "DIN 934 / DIN 985 / ISO 7040",
      "packaging": "Kutu / Paket",
      "consumption": "Cıvata başına 1-2 adet",
      "mixingRatio": "Lokma anahtarı ile montaj",
      "potLife": "Galvaniz kaplı çelik",
      "logistics": "Balçova Mağaza & Urla Depo"
    },
    "accordions": [
      {
        "title": "DIN 985 Fiberli Somun ile Gevşemezlik",
        "body": "Somunun tepesindeki poliamid halka cıvata dişine sıkışarak sürtünme frenlemesi oluşturur; motor, jeneratör ve pompa titreşimlerinde asla açılmaz."
      }
    ]
  },
  {
    "id": "pul-ve-rondela-din125-din127",
    "name": "DIN 125 Düz Pul & DIN 127 Yaylı Rondela Serisi",
    "badge": "Yüzey Koruma & Yaylanma Emniyeti",
    "tag": "Pul & Rondela · M6-M20",
    "deptId": "fastenerBoltsPanel",
    "category": "pul",
    "thumb": "assets/rf-card-fasteners.jpg",
    "desc": "Cıvata sıkma torkunu geniş yüzeye yayarak parçanın ezilmesini önleyen DIN 125 düz pullar ve eksenel baskı kuvvetini sürekli tutarak gevşemeyi kesen DIN 127 yaylı rondelalar.",
    "meta": [
      "DIN 125 Düz Pul / DIN 127 Yaylı Rondela",
      "M6 – M20 Tüm Çaplar",
      "Paket ve Kg ile Satış"
    ],
    "coverage": "Her cıvata montajında somun altı ve kafa altı",
    "sizes": [
      "M8 Düz Pul (500 Adet)",
      "M10 Düz Pul (500 Adet)",
      "M12 Düz Pul (250 Adet)",
      "M8 Yaylı Rondela (500 Adet)",
      "M10 Yaylı Rondela (250 Adet)"
    ],
    "specs": {
      "standard": "DIN 125-A / DIN 127-B",
      "packaging": "Poşet / Koli",
      "consumption": "Her bağlantıda 1 pul + 1 rondela",
      "mixingRatio": "Mekanik montaj tamamlayıcı",
      "potLife": "Elektro galvaniz pas koruması",
      "logistics": "Balçova Showroom & Urla Depo"
    },
    "accordions": [
      {
        "title": "Yüzey Ezilmesini ve Gevşemeyi Önleme",
        "body": "Düz pul sıkma basıncını ahşap veya ince sac üzerine yayarak deformasyonu keser; yaylı rondela ise dinamik gerilimi canlı tutar."
      }
    ]
  },
  {
    "id": "gijon-tij-1-metre-galvanizli",
    "name": "1 Metre Metrik Galvanizli Dişli Rot / Gijon (Tij M8 – M16)",
    "badge": "DIN 975 / 976 Boydan Dişli",
    "tag": "Gijon Tij · 1 Metre M8-M16",
    "deptId": "fastenerBoltsPanel",
    "category": "gijon",
    "thumb": "assets/rf-card-fasteners.jpg",
    "desc": "Asma tavan, havalandırma kanalı, tava askılama, flanş birleştirme ve kalıp gerdirmelerinde kullanılan 1 metre boyunda tam dişli galvanizli metrik gijon çubuğu.",
    "meta": [
      "1 Metre Standart Boy",
      "M8 / M10 / M12 / M16 Çaplar",
      "Bağ / Adet Satış"
    ],
    "coverage": "Tavan askı sistemleri ve mekanik taşıyıcılar",
    "sizes": [
      "M8 × 1000 mm (Bağ: 25 Adet)",
      "M10 × 1000 mm (Bağ: 25 Adet)",
      "M12 × 1000 mm (Bağ: 10 Adet)",
      "M16 × 1000 mm (Bağ: 5 Adet)"
    ],
    "specs": {
      "standard": "DIN 975 / DIN 976 Sınıf 4.8 ve 8.8",
      "packaging": "Bağlı Demet",
      "consumption": "İstenilen ölçüde spiral ile kesilebilir",
      "mixingRatio": "Uzatma somunu ve çakmalı dübel ile",
      "potLife": "Elektro galvanizli korozyon dayanımı",
      "logistics": "Urla Depo & Balçova Mağaza"
    },
    "accordions": [
      {
        "title": "İstenilen Boyda Kesilebilme Esnekliği",
        "body": "Metrik diş profili bozulmadan demir testeresi veya avuç taşlama ile kesilebilir; uzatma somunlarıyla sonsuz boya ek yapılabilir."
      }
    ]
  },
  {
    "id": "imbus-civata-din912-alyan-basli",
    "name": "DIN 912 8.8 İmbus Silindir Başlı Alyan Cıvata (M6 – M12)",
    "badge": "DIN 912 Alyan Yuvalı",
    "tag": "İmbus Cıvata · 8.8 Alyan",
    "deptId": "fastenerBoltsPanel",
    "category": "civata",
    "thumb": "assets/rf-card-fasteners.jpg",
    "desc": "Anahtar ağzının yanaşamadığı dar yuvalarda ve makine montajlarında alyan anahtarı veya bits ucu ile tork uygulanan silindir başlı gömme imbus cıvata.",
    "meta": [
      "DIN 912 / ISO 4762",
      "Altıköşe Alyan Soket Baş",
      "8.8 Çelik Kalite"
    ],
    "coverage": "Kalıp, makine ve dar alan mekanik montajı",
    "sizes": [
      "M6 × 25 mm (100 Adet)",
      "M8 × 30 mm (100 Adet)",
      "M10 × 40 mm (50 Adet)",
      "M12 × 50 mm (25 Adet)"
    ],
    "specs": {
      "standard": "DIN 912 / ISO 4762",
      "packaging": "Karton Kutu",
      "consumption": "Hassas makine ve kulp montajı",
      "mixingRatio": "Metrik alyan anahtar takımı",
      "potLife": "Siyah oksit / Galvaniz",
      "logistics": "Balçova Showroom & Urla Depo"
    },
    "accordions": [
      {
        "title": "Dar Yuvalara Sıfır Giriş",
        "body": "Silindir kafa tasarımı havşa deliklerine gömülerek yüzey çıkıntısı yapmaz, kompakt makine montajlarında estetik ve rijitlik sağlar."
      }
    ]
  },
  {
    "id": "mutlusan-beton-civili-krose-no6-ttr",
    "name": "Mutlusan Beton Çivili Kroşe No:6 (4×6 TTR / Antigron)",
    "badge": "Sertleştirilmiş Çelik Çivili",
    "tag": "Mutlusan Kroşe No:6 · 50 ₺",
    "deptId": "fastenerClipsNailsPanel",
    "category": "krose",
    "thumb": "assets/rf-card-fasteners.jpg",
    "desc": "Balçova ve Urla şantiyelerinde elektrik kablolarının beton, sıva ve tuğla yüzeylere güvenle sabitlenmesini sağlayan, bükülmeyen sertleştirilmiş çelik beton çivisine sahip Mutlusan No:6 çivili kroşe.",
    "meta": [
      "Raf Fiyatı: 50 ₺ / Kutu",
      "No:6 (4×6 T.T.R & Antigron Uyumlu)",
      "100 Adet / Kutu"
    ],
    "coverage": "Kablo hattı boyunca her 30-40 cm'de bir kroşe",
    "sizes": [
      "1 Kutu (100 Adet) — 50 ₺",
      "1 Koli (50 Kutu / 5.000 Adet)",
      "Toptan Koli"
    ],
    "specs": {
      "standard": "TS EN 62275 / RoHS Uyumlu",
      "packaging": "100 Adetlik Orijinal Mutlusan Kutusu",
      "consumption": "Sıva üstü elektrik ve aydınlatma hatları",
      "mixingRatio": "Çekiç ile doğrudan betona çakım",
      "potLife": "UV dayanımlı polipropilen gövde",
      "logistics": "Balçova Showroom Raf Stok & Urla Depo Sevk"
    },
    "accordions": [
      {
        "title": "Eğilmeyen Çelik Çivi ile Sert Betona Doğrudan Çakım",
        "body": "Özel ısıl işlem görmüş çinko kaplı çelik çivisi C25 ve C30 betonarme perdelerde bile yamulmadan düzgünce saplanır."
      }
    ]
  },
  {
    "id": "mutlusan-beton-civili-krose-serisi-no1-8",
    "name": "Mutlusan Beton Çivili Kroşe Serisi (No: 1 – No: 8)",
    "badge": "Komple Boy Serisi No 1-8",
    "tag": "Mutlusan Kroşe No:1-8",
    "deptId": "fastenerClipsNailsPanel",
    "category": "krose",
    "thumb": "assets/rf-card-fasteners.jpg",
    "desc": "Zil telinden (No:1) kalın NYY ve TTR enerji kablolarına (No:8) kadar tüm kablo çaplarına uygun, darbe dayanımlı beyaz gövdeli orijinal Mutlusan çivili kroşe ailesi.",
    "meta": [
      "No:1, 2, 3, 4, 5, 6, 7, 8 Ebatlar",
      "100 Adet / Kutu",
      "Sert Çelik Çivili"
    ],
    "coverage": "Tüm zayıf akım ve kuvvetli akım hatları",
    "sizes": [
      "No:1 - No:3 (İnce Kablo - 100 Adet)",
      "No:4 - No:5 (Standart Kablo - 100 Adet)",
      "No:6 - No:8 (Kalın Kablo - 100 Adet)",
      "Karma Usta Kolisi"
    ],
    "specs": {
      "standard": "TS EN 62275",
      "packaging": "100 Adetlik Kutu",
      "consumption": "Kablo güzergahı boyunca",
      "mixingRatio": "Çekiç ile çakma",
      "potLife": "Kırılmayan elastik gövde",
      "logistics": "Balçova Mağaza & Urla Depo"
    },
    "accordions": [
      {
        "title": "Geniş Boy Skalası ile Tam Uyum",
        "body": "Kablonun çapına tam oturan kroşe seçildiğinde kablo kılıfı ezilmez ve sarkma yapmadan estetik bir hat elde edilir."
      }
    ]
  },
  {
    "id": "isildar-plastik-krose-ve-kablo-baglari",
    "name": "Işıldar Plastik Vidalı Kroşe & Cırt Kelepçe Grubu",
    "badge": "Vidalı & Yapışkanlı Kroşe",
    "tag": "Işıldar Kroşe & Cırt",
    "deptId": "fastenerClipsNailsPanel",
    "category": "krose",
    "thumb": "assets/rf-card-fasteners.jpg",
    "desc": "Pano içi kablo demetleme, alçıpan karkası içi hat sabitleme ve duvar montajında vida veya yapışkan tabanla tutunan Işıldar plastik kablo düzenleme kroşeleri.",
    "meta": [
      "Vidalı Kroşe / Yapışkanlı Kroşe Tabanı",
      "Kablo Bağı (Cırt Kelepçe) Kanallı",
      "100 Adet / Paket"
    ],
    "coverage": "Elektrik panoları ve asma tavan kablo kanalları",
    "sizes": [
      "Vidalı Kroşe (100 Adet)",
      "20×20 mm Yapışkan Kroşe (100 Adet)",
      "28×28 mm Yapışkan Kroşe (100 Adet)"
    ],
    "specs": {
      "standard": "UL 94V-2 Alev İletmez Standart",
      "packaging": "100 Adet Paket",
      "consumption": "Pano içi kablolama ve tavan hatları",
      "mixingRatio": "Vida veya kendinden yapışkanlı taban",
      "potLife": "Uzun ömürlü poliamid 6.6",
      "logistics": "Balçova & Urla Stok"
    },
    "accordions": [
      {
        "title": "Pano İçi Düzenli Kablolama",
        "body": "Cırt kelepçe (kablo bağı) ile kombine edildiğinde kablo demetlerini sıkıca tutar, panonun bakımını ve havalandırmasını kolaylaştırır."
      }
    ]
  },
  {
    "id": "insaat-teli-ve-standart-insaat-civisi",
    "name": "Standart Tel İnşaat Çivisi (6'lık / 8'lik / 10'luk)",
    "badge": "TS 155 Standart Kalıp Çivisi",
    "tag": "İnşaat Çivisi · 25 kg Koli",
    "deptId": "fastenerClipsNailsPanel",
    "category": "civi",
    "thumb": "assets/rf-card-fasteners.jpg",
    "desc": "Ahşap kalıp hazırlığı, kereste çakımı, çatı karkas montajı ve şantiye geçici ahşap imalatlarında yüksek eğilme direncine sahip soğuk çekme inşaat tel çivisi.",
    "meta": [
      "6'lık (6 cm) / 8'lik (8 cm) / 10'luk (10 cm)",
      "25 kg Orijinal Koli",
      "Kg / Koli Satış"
    ],
    "coverage": "Ahşap kalıp metrajına göre koli hesabı",
    "sizes": [
      "6 cm (25 kg Koli)",
      "8 cm (25 kg Koli)",
      "10 cm (25 kg Koli)",
      "Perakende Kg ile Satış"
    ],
    "specs": {
      "standard": "TS 155 / DIN 1151",
      "packaging": "25 kg Mukavva Koli",
      "consumption": "Kalıp metrajına göre",
      "mixingRatio": "Keser veya çekiç ile çakım",
      "potLife": "Parlak tel çelik",
      "logistics": "Urla Ana Lojistik Deposu & Balçova Şantiye Sevk"
    },
    "accordions": [
      {
        "title": "Kalıp Sökümünde Kırılmayan Mukavemet",
        "body": "Optimum sünekliğe sahip çelik tel gövde, beton döküm basıncında eğilmez; kalıp sökülürken keserle çekildiğinde kafa koparmadan çıkar."
      }
    ]
  },
  {
    "id": "celik-beton-civisi-sertlestirilmis",
    "name": "Sertleştirilmiş Çelik Beton Çivisi (40 – 80 mm)",
    "badge": "Yüksek Karbonlu Çelik",
    "tag": "Beton Çivisi · 100'lü Kutu",
    "deptId": "fastenerClipsNailsPanel",
    "category": "civi",
    "thumb": "assets/rf-card-fasteners.jpg",
    "desc": "Sıvalı duvar, brüt betonarme perde ve dolu tuğlaya süpürgelik, çıta, izolasyon sacı veya kablo kanalı çakarken eğilmeyen 55-60 HRC sertleştirilmiş çelik beton çivisi.",
    "meta": [
      "40 mm / 60 mm / 80 mm Boylar",
      "55 HRC Sertleştirilmiş Karbon Çeliği",
      "100 Adet / Kutu"
    ],
    "coverage": "Sert beton ve taş duvar montajları",
    "sizes": [
      "3.5 × 40 mm (100 Adet)",
      "3.8 × 60 mm (100 Adet)",
      "4.0 × 80 mm (100 Adet)"
    ],
    "specs": {
      "standard": "DIN 1152 / Sertleştirilmiş Çelik Normu",
      "packaging": "Plastik Kutu (100 Adet)",
      "consumption": "Noktasal çakım",
      "mixingRatio": "Ağır marangoz çekici ile dik darbe",
      "potLife": "Galvaniz kaplı sert çelik",
      "logistics": "Balçova Mağaza & Urla Depo"
    },
    "accordions": [
      {
        "title": "Bükülmeyen 55 HRC Gövde Sertliği",
        "body": "Normal inşaat çivilerinin kıvrıldığı en sert C35 betonarme perde kolonlarda bile sekmeden doğrudan betona saplanır."
      }
    ]
  },
  {
    "id": "epdm-lastikli-somunlu-boru-kelepcesi",
    "name": "EPDM Lastikli Somunlu Boru Kelepçesi (1/2\" – 4\")",
    "badge": "DIN 4109 Ses & Titreşim Yalıtımlı",
    "tag": "Boru Kelepçesi · 1/2-4\"",
    "deptId": "fastenerClipsNailsPanel",
    "category": "kelepce",
    "thumb": "assets/rf-card-fasteners.jpg",
    "desc": "PPRC temiz su, galvaniz yangın borusu ve PVC atık su borularının tavan veya duvara tij/gijon ile askılanmasında su koçu darbe sesini ve titreşimi emen EPDM kauçuk lastikli çelik boru kelepçesi.",
    "meta": [
      "1/2\" – 4\" Tüm Tesisat Çapları",
      "EPDM Titreşim Emici Lastik",
      "M8 / M10 Kombi Somun"
    ],
    "coverage": "Tesisat boru hatlarında her 1.5 - 2 metrede bir kelepçe",
    "sizes": [
      "1/2\" (Ø20-24 mm)",
      "3/4\" (Ø25-28 mm)",
      "1\" (Ø32-35 mm)",
      "1 1/2\" (Ø48-52 mm)",
      "2\" (Ø60-64 mm)",
      "3\" (Ø89-91 mm)",
      "4\" (Ø110-116 mm)"
    ],
    "specs": {
      "standard": "DIN 4109 Ses Yalıtım Standardı",
      "packaging": "Kutu / Koli",
      "consumption": "Boru çapına göre 1.5 - 2 m aralıkla",
      "mixingRatio": "Metrik tij ve çakmalı dübel ile asma",
      "potLife": "Elektro galvaniz gövde + EPDM kauçuk",
      "logistics": "Balçova Showroom & Urla Depo Çıkışlı Sevk"
    },
    "accordions": [
      {
        "title": "DIN 4109 Akustik Titreşim Yalıtımı",
        "body": "EPDM fitili tesisattaki akış ve pompa seslerinin bina taşıyıcı betonarme sistemine iletilmesini önleyerek sessiz bir yaşam konforu sunar."
      }
    ]
  }
];
  var DEPARTMENTS_DATA = [
  {
    "id": "fastenerScrewsPanel",
    "short": "Alçıpan & Akıllı Vida",
    "full": "Alçıpan & Matkap Uçlu Akıllı Vidalar",
    "sub": "Akdeniz sivri/matkap uçlu, Dalsan Gips (500 ₺), EPDM contalı trapez",
    "pillsId": "fastenerScrewsMenuPills",
    "badge": "Alçıpan & Trapez Grubu",
    "summaryTitle": "Akdeniz & Dalsan Orijinal Alçıpan ve Sac Vidaları",
    "summaryDesc": "0.70 mm ve 2.25 mm sac profillere montaj sağlayan fosfat kaplı sivri uçlu alçıpan vidaları, Dalsan Gips orijinal sistem vidaları ve vulkanize EPDM contalı trapez çatı vidaları.",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M12 2v20M8 5l8 4M8 11l8 4M8 17l8 4\"/></svg>",
    "pills": [
      [
        "Tümü",
        "all",
        true
      ],
      [
        "Alçıpan Vidası",
        "alcipan-vidasi",
        false
      ],
      [
        "Akıllı Vida & Trapez",
        "akilli-vida",
        false
      ]
    ]
  },
  {
    "id": "fastenerWoodScrewsPanel",
    "short": "Sunta & Ahşap Vidası",
    "full": "DIN 7505 Sarı Sunta & Karkas Vidaları",
    "sub": "YHB sarı pasivasyon, Torx başlı karkas, Minifix mobilya bağlantıları",
    "pillsId": "fastenerWoodScrewsMenuPills",
    "badge": "Mobilya & Karkas",
    "summaryTitle": "DIN 7505 Sarı Pasivasyonlu Sunta ve Karkas Vidaları",
    "summaryDesc": "Ahşabı çatlatmayan özel uç geometrisi, sarı galvaniz pas koruması, havşa başlı PZ2 yıldız yuvalı mobilya vidaları, Minifix eksantrik gövde setleri ve Torx başlı karkas yapı vidaları.",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><path d=\"M3 9h18M9 21V9\"/></svg>",
    "pills": [
      [
        "Tümü",
        "all",
        true
      ],
      [
        "Sunta Vidası",
        "sunta-vidasi",
        false
      ],
      [
        "Ahşap Yapı Vidası",
        "ahsap-vidasi",
        false
      ],
      [
        "Minifix & Mobilya",
        "mobilya-baglanti",
        false
      ]
    ]
  },
  {
    "id": "fastenerAnchorsPanel",
    "short": "Çelik Dübel & Ankraj",
    "full": "Çelik Dübel & Mekanik / Kimyasal Ankraj",
    "sub": "Gömlekli M8-M12, klipsli S tipi Throughbolt, çakmalı, kimyasal kartuş",
    "pillsId": "fastenerAnchorsMenuPills",
    "badge": "Betonarme Ağır Yük",
    "summaryTitle": "Mekanik ve Kimyasal Beton Ankraj Sistemleri",
    "summaryDesc": "C20/25 ve üzeri çatlaklı betonarmede yüksek çekme ve kesme mukavemeti sunan gömlekli çelik dübeller, S tipi klipsli Throughbolt dübeller, çakmalı tavan dübelleri ve epoksi akrilat kimyasal harçlar.",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M12 2v20M5 12h14M5 19l7 3 7-3\"/></svg>",
    "pills": [
      [
        "Tümü",
        "all",
        true
      ],
      [
        "Çelik Dübeller",
        "celik-dubel",
        false
      ],
      [
        "Kimyasal Ankraj",
        "kimyasal-dubel",
        false
      ]
    ]
  },
  {
    "id": "fastenerPlugsPanel",
    "short": "Plastik Dübel & Kovan",
    "full": "Universal, Alçıpan & Gazbeton Dübelleri",
    "sub": "Universal No 6-10, burgulu plastik & zamak, helezonik Ytong dübeli",
    "pillsId": "fastenerPlugsMenuPills",
    "badge": "Duvar & Alçıpan Dübelleri",
    "summaryTitle": "Dönmeyen Kanatlı Universal ve Özel Yüzey Dübelleri",
    "summaryDesc": "Dolu tuğla, delikli tuğla, Ytong gazbeton ve alçıpan levhalarda dönmeyi ve sıyrılmayı önleyen yüksek yoğunluklu polietilen ve zamak metal burgulu dübeller.",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"6\" y=\"2\" width=\"12\" height=\"20\" rx=\"3\"/><line x1=\"6\" y1=\"8\" x2=\"18\" y2=\"8\"/><line x1=\"6\" y1=\"14\" x2=\"18\" y2=\"14\"/></svg>",
    "pills": [
      [
        "Tümü",
        "all",
        true
      ],
      [
        "Universal Plastik Dübel",
        "plastik-dubel",
        false
      ],
      [
        "Alçıpan Burgu Dübel",
        "alcipan-dubeli",
        false
      ],
      [
        "Gazbeton (Ytong) Dübeli",
        "gazbeton-dubeli",
        false
      ]
    ]
  },
  {
    "id": "fastenerBoltsPanel",
    "short": "Cıvata, Somun & Gijon",
    "full": "DIN 933 8.8 Cıvata, Somun, Pul & Gijon Grubu",
    "sub": "8.8 tam diş cıvatalar, fiberli somun, DIN 125/127 pul, 1m metrik tij",
    "pillsId": "fastenerBoltsMenuPills",
    "badge": "DIN Metrik Çelik Grubu",
    "summaryTitle": "DIN 933 8.8 Çelik Cıvatalar, Fiberli Somunlar ve Metrik Gijonlar",
    "summaryDesc": "M6'dan M16'ya kadar 8.8 kalite yüksek çekme dayanımlı altıköşe cıvatalar, gevşemeyen DIN 985 fiberli somunlar, DIN 125/127 pul rondelalar ve 1 metre tam dişli galvanizli askı gijonları.",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z\"/></svg>",
    "pills": [
      [
        "Tümü",
        "all",
        true
      ],
      [
        "Cıvatalar (DIN 933/912)",
        "civata",
        false
      ],
      [
        "Somunlar (DIN 934/985)",
        "somun",
        false
      ],
      [
        "Pullar (DIN 125/127)",
        "pul",
        false
      ],
      [
        "Gijon / Tij (DIN 975)",
        "gijon",
        false
      ]
    ]
  },
  {
    "id": "fastenerClipsNailsPanel",
    "short": "Kroşe, Çivi & Kelepçe",
    "full": "Mutlusan Kroşeler, İnşaat Çivisi & Boru Kelepçesi",
    "sub": "Mutlusan No:1-8 (No:6 TTR 50 ₺), inşaat çivisi 25kg, EPDM boru kelepçesi",
    "pillsId": "fastenerClipsNailsMenuPills",
    "badge": "Kablo & Boru Sabitleme",
    "summaryTitle": "Mutlusan Beton Çivili Kroşeler, İnşaat Çivisi ve EPDM Kelepçeler",
    "summaryDesc": "Bükülmeyen çelik çivili orijinal Mutlusan No:1-8 kroşeler (No:6 4x6 TTR kutu 50 ₺), ahşap kalıp ve kereste inşaat tel çivileri ve ses titreşim yalıtımlı EPDM lastikli somunlu boru kelepçeleri.",
    "icon": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\"/><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\"/></svg>",
    "pills": [
      [
        "Tümü",
        "all",
        true
      ],
      [
        "Kroşeler (Mutlusan & Işıldar)",
        "krose",
        false
      ],
      [
        "İnşaat & Çelik Çiviler",
        "civi",
        false
      ],
      [
        "Boru Kelepçeleri",
        "kelepce",
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
  var currentActiveTab = "fastenerScrewsPanel";

  function switchTab(targetId) {
    currentActiveTab = targetId;

    subnavLinks.forEach(function(link) {
      var matches = link.getAttribute("data-target") === targetId;
      link.classList.toggle("active", matches);
      link.setAttribute("aria-selected", matches ? "true" : "false");
    });

    deptPanels.forEach(function(panel) {
      panel.classList.toggle("active", panel.id === targetId);
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
        '<div class="pv-drawer-item-icon">' + dept.icon + '</div>',
        '<div class="pv-drawer-item-content">',
        '  <span class="pv-drawer-item-title">' + dept.full + '</span>',
        '  <span class="pv-drawer-item-sub">' + dept.sub + '</span>',
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
  var modalSpecsTable = document.getElementById("modalSpecsTable");
  var modalAccordionsWrap = document.getElementById("modalAccordionsWrap");
  var modalWaBtn = document.getElementById("modalWaBtn");

  var currentModalProduct = null;
  var selectedPackagingSize = "";

  function openModal(productId) {
    var product = FASTENERS_PRODUCTS_DATA.find(function(p) { return p.id === productId; });
    if (!product) return;

    currentModalProduct = product;
    selectedPackagingSize = product.sizes && product.sizes.length ? product.sizes[0] : "";

    if (modalProductTitle) modalProductTitle.textContent = product.name;
    if (modalProductDesc) modalProductDesc.textContent = product.desc;
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
        mixingRatio: "Montaj & Sıkım Aleti",
        potLife: "Malzeme & Pas Koruması",
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

  document.querySelectorAll(".pv-open-modal-btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
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
    return d ? d.short : "Bağlantı";
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

    var featured = FASTENERS_PRODUCTS_DATA.slice(0, 8);
    var heading = document.createElement("div");
    heading.className = "pv-spotlight-group-title";
    heading.textContent = "Öne Çıkan Bağlantı Elemanları & Vidalar";
    spotlightResults.appendChild(heading);

    featured.forEach(function(item) {
      spotlightResults.appendChild(createSpotlightItemEl(item));
    });

    if (spotlightCount) {
      spotlightCount.textContent = FASTENERS_PRODUCTS_DATA.length + " Ürün Kataloğu";
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
    var matches = FASTENERS_PRODUCTS_DATA.filter(function(item) {
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
        var p = FASTENERS_PRODUCTS_DATA.find(function(it) { return it.id === pid; });
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
  renderDeptDrawer("fastenerScrewsPanel");
  syncMobileFilterRail("fastenerScrewsPanel");
})();
