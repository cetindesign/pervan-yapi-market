/* ARCHITECTURAL JAVASCRIPT ENGINE FOR BAYER K-OTHRINE & PEST CONTROL CATALOG */
(function() {
  "use strict";

  // 1. DEPARTMENTS ARCHITECTURE DATA
  var DEPARTMENTS_DATA = [
    {
      id: "kothrineKonsantrePanel",
      short: "K-Othrine® Konsantre",
      full: "Bayer K-Othrine® Konsantre Haşere İlaçları",
      sub: "SC 50, WG 250 ve Aqua EW profesyonel konsantre formülasyonlar",
      icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>'
    },
    {
      id: "maxforceYemPanel",
      short: "Maxforce® Jel & Yem",
      full: "Bayer Maxforce® Jel & Yem Sistemleri",
      sub: "Hamamböceği ve karınca yuvalarını domino etkisiyle kurutan profesyonel jeller",
      icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20"/><circle cx="12" cy="12" r="8"/></svg>'
    },
    {
      id: "kemirgenKontrolPanel",
      short: "Kemirgen & Racumin®",
      full: "Bayer Racumin® & Kemirgen Kontrol Sistemleri",
      sub: "Neme dayanıklı mum bloklar, pasta yemler ve kilitli fare istasyonları",
      icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>'
    },
    {
      id: "hasereUygulamaEkipmanPanel",
      short: "Pompa & Koruyucu Ekipman",
      full: "İlaçlama Pompaları & Kişisel Koruyucu Ekipmanlar",
      sub: "Pirinç nozullu basınçlı pompalar, FFP2 aktif karbonlu maskeler ve eldivenler",
      icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>'
    }
  ];

  // 2. HASERE PRODUCTS DATA (20 SPECIMENS)
  var HASERE_PRODUCTS_DATA = [
    {
      id: "k-othrine-sc50-50ml",
      name: "Bayer K-Othrine SC 50 Haşere İlacı (50 ml Şişe)",
      badge: "Daire İçi / 5 L Su",
      tag: "Deltamethrin 50 g/L",
      deptId: "kothrineKonsantrePanel",
      category: "sc50",
      thumb: "assets/hasere/k-othrine-sc50-50ml.jpg",
      desc: "Daire, ofis ve kapalı yaşam alanları için Sağlık Bakanlığı ruhsatlı, kokusuz, leke bırakmayan orijinal Bayer süspansiyon konsantre haşere ilacı. 5 litre su ile seyreltilir.",
      meta: ["50 ml Orijinal Şişe", "5 Litre Suya Karışım", "90 Gün Kalıcı Koruma"],
      coverage: "50 ml ürün 5 litre su ile seyreltilerek ortalama 100-150 m² alana uygulanır.",
      sizes: ["50 ml Şişe (Daire İçi)", "500 ml Şişe (Bina & Bahçe)", "1000 ml Şişe (Profesyonel)"],
      specs: {
        standard: "T.C. Sağlık Bakanlığı Biyosidal Ruhsatlı",
        packaging: "50 ml Ölçek Kapaklı Güvenlik Kilitli Şişe",
        consumption: "50 ml ürün 5 L su ile seyreltilerek 100-150 m² alana uygulanır",
        mixingRatio: "Yürüyen haşere: 50 ml / 5 L su — Uçan haşere: 50 ml / 10 L su",
        potLife: "Kapalı yüzeylerde 90 güne kadar aktif kristalize koruma",
        logistics: "Balçova Yapı Market & Urla Depo Stoktan Teslim"
      },
      accordions: [
        {
          title: "Orijinal Deltamethrin Molekülü ve Güvenlik",
          body: "K-Othrine SC 50, temas ve sindirim yoluyla böceğin sinir sistemini bloke eder. Su ile homojen karışır; uygulandığı parke, süpürgelik veya duvarda leke bırakmaz ve kokusuzdur."
        },
        {
          title: "Doğru Dozajlama ve Uygulama İpuçları",
          body: "Basınçlı pompaya önce 2.5 L su koyun, 50 ml K-Othrine ekleyin ve kalan 2.5 L suyu ilave edip çalkalayın. Süpürgelik hatlarına, kapı eşiklerine ve gider çevrelerine püskürtün."
        }
      ]
    },
    {
      id: "k-othrine-sc50-500ml",
      name: "Bayer K-Othrine SC 50 Haşere İlacı (500 ml Dozajlı Şişe)",
      badge: "Site & Bahçe / 50 L Su",
      tag: "Entegre Dozaj Ölçekli",
      deptId: "kothrineKonsantrePanel",
      category: "sc50",
      thumb: "assets/hasere/k-othrine-sc50-500ml.jpg",
      desc: "Apartman ortak alanları, site çevreleri, villa bahçeleri ve bodrum katları için kendinden ölçek hazneli 500 ml profesyonel boy süspansiyon konsantre.",
      meta: ["500 ml Kendinden Ölçekli", "50 Litre Suya Karışım", "Leke & Koku Yapmaz"],
      coverage: "500 ml ürün 50 litre su ile seyreltilerek 1.000-1.500 m² yüzeye yeterlidir.",
      sizes: ["500 ml Dozajlı Şişe", "1000 ml Şişe", "Koli Bazı (12 Adet)"],
      specs: {
        standard: "T.C. Sağlık Bakanlığı Biyosidal Ruhsatlı",
        packaging: "500 ml Dozaj Hazneli Pratik Şişe",
        consumption: "500 ml ürün 50 L su ile seyreltilerek 1.000-1.500 m² yüzeye yeterlidir",
        mixingRatio: "Sıkma haznesiyle 25-50 ml hassas dozajlama",
        potLife: "Yüzeyde leke bırakmaz, kristal formda kalıcı etki",
        logistics: "Balçova Mağaza & Urla Depo Stoktan Sevk"
      },
      accordions: [
        {
          title: "Pratik Entegre Dozaj Ölçeği",
          body: "Şişeyi hafifçe sıkarak üst haznede tam 25 ml veya 50 ml ilaç biriktirilir. Harici ölçek kabı kirletmeden doğrudan pompa haznesine dökülür."
        }
      ]
    },
    {
      id: "k-othrine-sc50-1000ml",
      name: "Bayer K-Othrine SC 50 Profesyonel Haşere İlacı (1000 ml Şişe)",
      badge: "Profesyonel / 100 L Su",
      tag: "1 Litre Toptan Boy",
      deptId: "kothrineKonsantrePanel",
      category: "sc50",
      thumb: "assets/hasere/k-othrine-sc50-1000ml.jpg",
      desc: "Şantiye, otel, fabrika, depo ve profesyonel ilaçlama firmaları için ekonomik 1 litrelik orijinal Bayer K-Othrine SC 50 ambalajı.",
      meta: ["1000 ml Sanayi Boy", "100 Litre Suya Karışım", "Toplu Şantiye & Tesis"],
      coverage: "1 litre ilaç 100 L su ile seyreltilerek 2.500-3.000 m² alana uygulanır.",
      sizes: ["1000 ml Şişe", "Koli Bazı (12 × 1000 ml)", "Tesis Toptan Sipariş"],
      specs: {
        standard: "T.C. Sağlık Bakanlığı Ruhsatlı Profesyonel Çevre Sağlığı",
        packaging: "1.000 ml Emniyet Bantlı Şişe",
        consumption: "1 litre ilaç 100 L su ile seyreltilerek 2.500-3.000 m² kapalı/açık alana yeter",
        mixingRatio: "Ağır istilalarda 100 ml / 10 L su; periyodik korumada 50 ml / 10 L su",
        potLife: "UV ve ısıya karşı stabilize Deltamethrin molekülü",
        logistics: "Urla Ana Depo & Balçova Stok Teslim"
      },
      accordions: [
        {
          title: "Geniş Alanlar İçin Maksimum Maliyet Verimliliği",
          body: "1 litrelik endüstriyel ambalaj, periyodik ilaçlama yapan site yönetimleri ve şantiyeler için litre başına en ekonomik maliyeti sunar."
        }
      ]
    },
    {
      id: "k-othrine-wg250-40g",
      name: "Bayer K-Othrine WG 250 Suda Eriyen Granül (40 g Poşet)",
      badge: "%25 Deltamethrin Granül",
      tag: "Suda Tam Çözünür",
      deptId: "kothrineKonsantrePanel",
      category: "wg250",
      thumb: "assets/hasere/k-othrine-wg250-40g.jpg",
      desc: "Tozuma yapmayan mikro granül yapısıyla suda saniyeler içinde çözünen, gözenekli beton ve tuğla yüzeylerde emilmeden yüzeyde kalarak üstün öldürücülük sağlayan formül.",
      meta: ["40 g Dozaj Poşet", "Gözenekli Yüzey Uzmanı", "Sıfır Tozuma"],
      coverage: "1 poşet (40 g) 10-20 litre su ile seyreltilerek 400 m² yüzeye yeterlidir.",
      sizes: ["Tekli Poşet (40 g)", "Kutu (10 Poşet)", "Koli Toptan"],
      specs: {
        standard: "Sağlık Bakanlığı Onaylı WG Granül Formülasyon",
        packaging: "40 g Alüminyum Nem Bariyerli Poşet",
        consumption: "1 poşet (40 g) 10-20 L su ile seyreltilerek 400 m² alana atılır",
        mixingRatio: "Sprey tankına doğrudan dökülür, çalkalamayla hızla çözünür",
        potLife: "Gözenekli sıva ve betonda 120 güne kadar rekor kalıcılık",
        logistics: "Balçova & Urla Stok Teslim"
      },
      accordions: [
        {
          title: "Emici ve Pürüzlü Yüzeylerde Üstün Etki",
          body: "Sıvı ilaçlar gözenekli beton tarafından emilirken, WG 250'nin mikro granül kristalleri yüzeyde kalır ve üzerinden geçen böceğin gövdesine tam tutunur."
        }
      ]
    },
    {
      id: "k-othrine-partix-500ml",
      name: "Bayer K-Othrine Partix Polimerik Süspansiyon (500 ml)",
      badge: "Polimer Teknolojisi",
      tag: "Ahşap & Beton Uyumlu",
      deptId: "kothrineKonsantrePanel",
      category: "partix",
      thumb: "assets/hasere/k-othrine-partix-500ml.jpg",
      desc: "Bayer'in patentli polimer partikül teknolojisi sayesinde pürüzlü, ahşap ve emici yüzeylerde ilacın gözeneklere kaçmasını önleyen, yüzeyde asılı kalan yeni nesil haşere ilacı.",
      meta: ["500 ml Şişe", "Partix® Polimerik Taşıyıcı", "Güneş & Nem Dayanıklı"],
      coverage: "500 ml şişe ile 1.000 m² zorlu emici yüzeyde tam koruma sağlanır.",
      sizes: ["500 ml Şişe", "Koli (12 Adet)"],
      specs: {
        standard: "Bayer CropScience Çevre Sağlığı Patenti",
        packaging: "500 ml Dozajlama Ölçekli Şişe",
        consumption: "Zorlu yüzeylerde standart ilaçlara göre 3 kat daha uzun etki",
        mixingRatio: "5-10 ml / 1 L su oranında sırt veya el pompasıyla uygulanır",
        potLife: "Emici ahşap, taş ve sıvalarda 6 aya kadar aktif bariyer",
        logistics: "Balçova Mağaza & Urla Depo Sevk"
      },
      accordions: [
        {
          title: "Partix® Mikroenkapsülasyon Avantajı",
          body: "Polimer kılıf içindeki etken madde güneşte ve rutubette hızla bozulmaz; 6 ay boyunca yüzeyde aktif bariyer oluşturur."
        }
      ]
    },
    {
      id: "aqua-k-othrine-ew-1l",
      name: "Bayer Aqua K-Othrine EW Su Bazlı Sivrisinek İlacı (1 Litre)",
      badge: "FFAST Su Bazlı ULV",
      tag: "Kokusuz Sisleme",
      deptId: "kothrineKonsantrePanel",
      category: "ec-aqua",
      thumb: "assets/hasere/aqua-k-othrine-ew-1l.jpg",
      desc: "Mazot yerine su ile seyreltilerek ULV soğuk sisleme ve termal sisleme makineleriyle uygulanan, çevreye ve bitkilere zarar vermeyen sivrisinek ve karasinek mücadele ilacı.",
      meta: ["1000 ml Orijinal Şişe", "Su ile Seyreltilir (Mazotsuz)", "FFAST® Teknolojisi"],
      coverage: "1 litre konsantre ürün geniş açık alanlarda ULV sisleme ile hektarlarca alanı kapsar.",
      sizes: ["1 Litre Şişe", "Koli (12 × 1 L)", "Belediye & Site Palet"],
      specs: {
        standard: "Dünya Sağlık Örgütü (WHO) ve Sağlık Bakanlığı Onaylı",
        packaging: "1 Litrelik Özel Polietilen Şişe",
        consumption: "Açık alanlarda hektar/dönüm bazlı ULV sisleme normu",
        mixingRatio: "1 L Aqua K-Othrine 9 L temiz su ile seyreltilerek ULV cihazına verilir",
        potLife: "Buharlaşmayı engelleyen patentli FFAST film tabakası",
        logistics: "Balçova & Urla Depo Stoktan Sevk"
      },
      accordions: [
        {
          title: "Mazotsuz ve Çevre Dostu Sisleme",
          body: "Klasik termal sislemede kullanılan mazot dumanı ve yağ tabakası oluşturmaz; su ile seyreltilerek bahçelerde ve sitelerde güvenle uygulanır."
        }
      ]
    },

    // DEPT 2: MAXFORCE YEM SİSTEMLERİ
    {
      id: "bayer-maxforce-platin-30g",
      name: "Bayer Maxforce Platin Hamamböceği Jeli (30 g Şırınga)",
      badge: "Clothianidin + BlueBead",
      tag: "Yem Çekingenliğine Son",
      deptId: "maxforceYemPanel",
      category: "roach-gel",
      thumb: "assets/hasere/bayer-maxforce-platin-30g.jpg",
      desc: "BlueBead lezzet teknolojisiyle en dirençli ve yem çekingenliği gösteren Alman ve Amerikan hamamböceklerini bile hızla cezbeden, 30 gramlık profesyonel şırınga jel.",
      meta: ["30 g Kartuş Şırınga", "Domino Koloni Kırıcı", "Mutfak & Beyaz Eşya Güvenli"],
      coverage: "Bir tüp jel (30 g) ile 300'e yakın noktasal damla uygulama yapılabilir.",
      sizes: ["Tek Şırınga (30 g)", "Kutu (4 Şırınga)", "Tabanca Kiti ile Set"],
      specs: {
        standard: "HACCP Gıda Güvenliği Standartlarına Uyumlu",
        packaging: "30 g Şırınga + Uygulama İğnesi Dahil",
        consumption: "Metrekare başına 1-2 damla (mercimek büyüklüğünde, ~0.1 g)",
        mixingRatio: "Seyreltme yapılmaz; doğrudan şırıngayla noktasal uygulanır",
        potLife: "Kurumayan matriks formülüyle 12 ay boyunca çekiciliğini korur",
        logistics: "Balçova Mağaza Rafında Hazır"
      },
      accordions: [
        {
          title: "Domino Etkisi Nasıl Çalışır?",
          body: "Jeli yiyen böcek hemen ölmez; yuvasına döner. Dışkısı ve leşi diğer böcekler tarafından yenildiğinde tüm koloni 48 saat içinde zincirleme olarak yok olur."
        }
      ]
    },
    {
      id: "bayer-maxforce-ic-30g",
      name: "Bayer Maxforce IC Hamamböceği Jeli (30 g Şırınga)",
      badge: "Imidacloprid %2.15",
      tag: "Klasik Güçlü Formül",
      deptId: "maxforceYemPanel",
      category: "roach-gel",
      thumb: "assets/hasere/bayer-maxforce-ic-30g.jpg",
      desc: "Ev, restoran, pastane ve otellerde kalorifer böceği ve hamamböceği yuvalarını yok eden, koku yaymayan ve leke bırakmayan orijinal Bayer klasiği jel yem.",
      meta: ["30 g Şırınga", "Tüm Türlerde Etkili", "Yuva Kurutucu Etki"],
      coverage: "Standart 3+1 dairede mutfak ve banyo için tek şırınga fazlasıyla yeterlidir.",
      sizes: ["1 Şırınga (30 g)", "4'lü Kutu Paketi"],
      specs: {
        standard: "Sağlık Bakanlığı Ruhsatlı Profesyonel Jel",
        packaging: "30 g Koruyucu Pistonlu Şırınga",
        consumption: "Priz arkaları, menteşeler ve tezgah altlarına 0.1 g noktalar",
        mixingRatio: "Doğrudan uygulama; püskürtme gerektirmez",
        potLife: "Uygulandığı yerde akmaz, yağ bırakmaz, 90 gün aktif kalır",
        logistics: "Balçova Mağaza & Urla Depo Stoktan Sevk"
      },
      accordions: [
        {
          title: "Uygulama Noktaları",
          body: "Buzdolabı motor arkası, mutfak dolap menteşeleri, lavabo altı gider borusu çevreleri ve süpürgelik birleşim yerlerine damlatılır."
        }
      ]
    },
    {
      id: "bayer-maxforce-quantum-30g",
      name: "Bayer Maxforce Quantum Karınca Jeli (30 g Damlalıklı)",
      badge: "Sıvı Matriks Karınca Yemi",
      tag: "Kraliçeyi Yok Eder",
      deptId: "maxforceYemPanel",
      category: "ant-gel",
      thumb: "assets/hasere/bayer-maxforce-quantum-30g.jpg",
      desc: "İşçi karıncaların sıvıyı kraliçeye ve lavralara taşımasıyla tüm koloniyi kökten yok eden, şekerli ve proteinli karınca türlerinin tamamına karşı etkili sıvı jel.",
      meta: ["30 g Damlalıklı Şişe", "Tüm Koloniye Taşınır", "Şeffaf & Nötr Görünüm"],
      coverage: "30 gramlık şişe ile yüzlerce metre karınca yürüyüş hattı korunur.",
      sizes: ["30 g Şişe", "Koli (12 Adet)"],
      specs: {
        standard: "T.C. Sağlık Bakanlığı Onaylı Karınca Mücadele Formülü",
        packaging: "30 g Damlalıklı Hassas Aplikatör Şişesi",
        consumption: "Karınca yürüyüş yollarına 1 metre arayla 1 damla (200 mg)",
        mixingRatio: "Kullanıma hazır sıvı formül",
        potLife: "Toz toplamayan nemli matriks sayesinde 12 hafta çekicilik",
        logistics: "Balçova Mağaza & Urla Depo Stok Teslim"
      },
      accordions: [
        {
          title: "Kraliçeyi Hedef Alan Sıvı Teknoloji",
          body: "Sıradan spreyler sadece işçi karıncaları öldürür, kraliçe daha fazla yumurtlar. Maxforce Quantum işçiler aracılığıyla kraliçeyi ve yuvadaki lavraları kurutur."
        }
      ]
    },
    {
      id: "maxforce-jel-tabancasi-itici",
      name: "Maxforce Hassas Dozajlı Jel Tabancası & Metal İtici",
      badge: "0.1 g Hassas Dozaj",
      tag: "Ekonomik Sarfiyat",
      deptId: "maxforceYemPanel",
      category: "applicator",
      thumb: "assets/hasere/maxforce-jel-tabancasi-itici.jpg",
      desc: "30 gramlık Maxforce ve tüm standart haşere jeli kartuşlarıyla uyumlu, her tetikte tam 0.1 gram dozajlayarak ürün israfını sıfıra indiren ergonomik metal-plastik tabanca.",
      meta: ["Ergonomik Tetik Mekanizması", "Metal İtici Mil", "Tüm 30g Kartuşlarla Uyumlu"],
      coverage: "İlaç sarfiyatını %40 azaltır, tek elle hızlı uygulama imkanı verir.",
      sizes: ["Tek Tabanca Seti", "Tabanca + 4 Jel Avantaj Paketi"],
      specs: {
        standard: "Endüstriyel İlaçlama Donanım Standardı",
        packaging: "Özel Kutusunda Yedek Uç ve İtici Mil ile Birlikte",
        consumption: "Fazla sıkımı engeller; kartuş ömrünü %40 uzatır",
        mixingRatio: "Mekanik tetik ayarlı",
        potLife: "Darbeye dayanıklı gövde ve paslanmaz çelik yay",
        logistics: "Balçova Mağaza Stoktan Teslim"
      },
      accordions: [
        {
          title: "Profesyonel Tetik Hassasiyeti",
          body: "Göz kararı manuel piston itmek yerine her tetiğe basışta standart mercimek ebadında damla bırakır."
        }
      ]
    },
    {
      id: "maxforce-jel-yem-istasyonu-kutusu",
      name: "Emniyetli Jel Yem İstasyonu Kiti (10'lu Paket)",
      badge: "Çocuk & Evcil Hayvan Korumalı",
      tag: "Kilitli Kapaklı",
      deptId: "maxforceYemPanel",
      category: "applicator",
      thumb: "assets/hasere/maxforce-jel-yem-istasyonu-kutusu.jpg",
      desc: "Gıda işletmeleri, restoran mutfakları ve evcil hayvan bulunan konutlarda jelin doğrudan yüzeye sürülmesini engelleyen, içine jel sıkılan kilitli siyah plastik istasyon kiti.",
      meta: ["10 Adet / Paket", "Çift Yönlü Giriş Tüneli", "Yıkanabilir & Yeniden Kullanılabilir"],
      coverage: "10'lu kit ile standart bir restoran mutfağı veya geniş bir villa tam korunur.",
      sizes: ["10'lu Paket", "50'li Koli (İşletmeler İçin)"],
      specs: {
        standard: "Gıda Hijyen ve Pest Kontrol Güvenlik Şartnamelerine Uygun",
        packaging: "10 Adet İstasyon Kutusu + Çift Taraflı Sabitleme Bantları",
        consumption: "Mutfak, kiler ve dolap altlarına 2-3 metre arayla yerleştirilir",
        mixingRatio: "İç hazneye 1 damla jel sıkılarak kapağı kapatılır",
        potLife: "UV dayanımlı polipropilen plastik gövde",
        logistics: "Balçova Mağaza & Urla Depo Stok Teslim"
      },
      accordions: [
        {
          title: "Hijyenik ve Güvenli Koruma",
          body: "Yem toza ve suya maruz kalmaz, zemin temizliği sırasında paspasla silinmez. Sadece böceklerin girebileceği ölçüde giriş delikleri mevcuttur."
        }
      ]
    },

    // DEPT 3: KEMİRGEN & RACUMIN
    {
      id: "bayer-racumin-pasta-yem",
      name: "Bayer Racumin Pasta Sıçan & Fare Yemi (Porsiyon Paket / 5 kg Kova)",
      badge: "Coumatetralyl + Bitrex",
      tag: "Mumlu Porsiyon Poşetli",
      deptId: "kemirgenKontrolPanel",
      category: "rodent-paste",
      thumb: "assets/hasere/bayer-racumin-pasta-yem.jpg",
      desc: "Neme ve suya dayanıklı gözenekli filtre kağıdı içinde hazırlanmış, farelerin kokusunu uzaktan alıp hızla tükettiği, hedef dışı hayvanların yememesi için Bitrex içeren pasta yem.",
      meta: ["Porsiyon Poşetli Formül", "Bitrex Acı Madde Korumalı", "İç & Dış Mekan Uyumlu"],
      coverage: "5 kg kova ile şantiyelerde onlarca yem istasyonu aylarca beslenir.",
      sizes: ["1 kg Poşet (Perakende)", "5 kg Kova (Şantiye & Site)", "10 kg Kova (Toptan)"],
      specs: {
        standard: "Sağlık Bakanlığı Ruhsatlı Rodentisit (Fare Mücadelesi)",
        packaging: "5 kg Hava Almaz Kulplu Plastik Kova",
        consumption: "Fare için istasyon başına 2-3 poşet; sıçan için 5-10 poşet",
        mixingRatio: "Poşetleri yırtmadan istasyon içine yerleştiriniz",
        potLife: "Neme dayanıklı özel formülasyon",
        logistics: "Balçova Mağaza & Urla Depo Sevk"
      },
      accordions: [
        {
          title: "Bitrex Güvencesi ve Yem Çekiciliği",
          body: "İçerdiği Bitrex acı maddesi sayesinde insanlar ve evcil hayvanlar yemi ağzına aldığında tükürür. Ancak kemirgenler tat duyuları farklı olduğu için iştahla tüketir."
        }
      ]
    },
    {
      id: "bayer-racumin-mum-blok",
      name: "Bayer Racumin Mum Blok Neme Dayanıklı Fare Yemi (10 kg Kova)",
      badge: "Suya & Yağmura Tam Direnç",
      tag: "Ortası Delikli Blok",
      deptId: "kemirgenKontrolPanel",
      category: "rodent-block",
      thumb: "assets/hasere/bayer-racumin-mum-blok.jpg",
      desc: "Rögar, kanalizasyon, bodrum, bahçe ve foseptik çevreleri gibi aşırı ıslak zeminlerde dağılmadan ve küflenmeden aylarca formunu koruyan parafinli mum blok kemirgen yemi.",
      meta: ["10 kg Kova", "Ortası Delikli İstasyon Teli Uyumlu", "Aşırı Neme Dayanıklı"],
      coverage: "10 kg kova geniş endüstriyel tesisler ve şantiyeler için uygundur.",
      sizes: ["5 kg Kova", "10 kg Profesyonel Kova", "Palet Bazı Sevk"],
      specs: {
        standard: "T.C. Sağlık Bakanlığı Onaylı Kemirgen Kontrol Blokları",
        packaging: "10 kg Ağır Hizmet Sanayi Kovası",
        consumption: "İstasyon demir çubuğuna dizilerek 5-10 metre arayla sabitlenir",
        mixingRatio: "Doğrudan istasyon teline geçirilerek kullanılır",
        potLife: "Yağmur ve nem altında küflenmez, bayatlamaz",
        logistics: "Urla Ana Lojistik Depo & Balçova Teslim"
      },
      accordions: [
        {
          title: "Islak ve Zorlu Ortam Dayanıklılığı",
          body: "Yüksek parafin içeriği sayesinde suyun içinde kalsa dahi erimez veya dağılmaz; kemirgenin kemirme içgüdüsünü tetikler."
        }
      ]
    },
    {
      id: "kilitli-sican-fare-istasyonu",
      name: "Çift Girişli Kilitli Plastik Sıçan & Fare Yem İstasyonu",
      badge: "Anahtarlı Emniyet Kilidi",
      tag: "Şantiye & Site Tipi",
      deptId: "kemirgenKontrolPanel",
      category: "rodent-station",
      thumb: "assets/hasere/kilitli-sican-fare-istasyonu.jpg",
      desc: "Çocukların, sokak hayvanlarının ve evcil canlıların zehirli yeme ulaşmasını imkansız kılan, çift girişli, metal blok sabitleme telli ve kilit anahtarlı ağır hizmet istasyonu.",
      meta: ["Özel Plastik Güvenlik Anahtarlı", "Yem Sabitleme Teli Dahil", "Su Tahliye Kanallı"],
      coverage: "Bina çevrelerinde 10-15 metre aralıklarla yerleştirilir.",
      sizes: ["Tekli Adet", "10'lu Koli (Bina Paketi)", "50'li Palet (Şantiye)"],
      specs: {
        standard: "Belediye ve Çevre Sağlığı Standartlarına Uygun",
        packaging: "İstasyon + Metal Yem Çubuğu + Kilit Anahtarı",
        consumption: "Bina ve şantiye dış cephe hatlarına 10-15 metre aralıkla vidalanır",
        mixingRatio: "İçine pasta yem veya mum blok takılır",
        potLife: "UV ve donmaya karşı kırılmaz polipropilen gövde",
        logistics: "Balçova Mağaza & Urla Depo Stoktan Sevk"
      },
      accordions: [
        {
          title: "Yasal Zorunluluk ve Güvenlik",
          body: "Açıkta zehirli yem bırakmak yasaktır. Kilitli istasyonlar, yemin rüzgarda uçmasını veya hedef dışı canlılar tarafından taşınmasını engeller."
        }
      ]
    },
    {
      id: "yapiskali-sican-fare-yakalama-plakasi",
      name: "Zehirsiz Güçlü Yapışkanlı Fare & Sıçan Yakalama Plakası",
      badge: "Zehirsiz & Kokusuz Yakalama",
      tag: "Anında Mekanik Çözüm",
      deptId: "kemirgenKontrolPanel",
      category: "rodent-station",
      thumb: "assets/hasere/yapiskali-sican-fare-yakalama-plakasi.jpg",
      desc: "Kimyasal zehir kullanılmasının yasak veya sakıncalı olduğu gıda depoları, kilerler ve fırınlar için yüksek yapışma kuvvetine sahip sert plastik/mukavva fare yakalama plakası.",
      meta: ["Zehir İçermez", "Kurumayan Güçlü Tutkal", "Katlanabilir Tünel Tasarımı"],
      coverage: "Kritik geçiş noktalarında tek plaka anında sonuç verir.",
      sizes: ["2'li Paket", "20'li Kutu", "Koli Toptan"],
      specs: {
        standard: "Gıda Tesisleri İçin Zehirsiz Mekanik Kontrol Standardı",
        packaging: "Koruyucu Jelatinli İkili Plaka Paketi",
        consumption: "Süpürgelik kenarlarına ve duvar diplerine düz veya tünel şeklinde konur",
        mixingRatio: "Koruyucu filmi çekip doğrudan zemine yerleştiriniz",
        potLife: "Tozsuz ortamda 6 ay boyunca kurumayan özel formüllü tutkal",
        logistics: "Balçova Mağaza Stoktan Teslim"
      },
      accordions: [
        {
          title: "Gıda Alanlarında Zehirsiz Çözüm",
          body: "Restoranlar, fırınlar ve çocuk odalarında kimyasal riski olmadan mekanik yakalama sağlar."
        }
      ]
    },

    // DEPT 4: İLAÇLAMA POMPALARI & EKİPMAN
    {
      id: "basincli-ilaclama-pompasi-5l",
      name: "5 Litre Omuz Askılı Basınçlı İlaçlama Pompası (Pirinç Nozul)",
      badge: "Pirinç Tetik & Mızrak",
      tag: "5 Litre Omuz Tipi",
      deptId: "hasereUygulamaEkipmanPanel",
      category: "sprayers",
      thumb: "assets/hasere/basincli-ilaclama-pompasi-5l.jpg",
      desc: "K-Othrine ve su karışımını mikron düzeyinde ince sisleme veya düz atışla süpürgelik diplerine basan, pirinç mızraklı, emniyet ventilli 5 litrelik profesyonel ilaçlama pompası.",
      meta: ["5 Litre Net Tank Kapasitesi", "Pirinç Ayarlı Püskürtme Ucu", "Basınç Emniyet Ventili"],
      coverage: "1 dolum (5L) ile ortalama 100-150 m² alan ilaçlanır.",
      sizes: ["5 Litre Pompa (Komple Set)", "Yedek Nozul & Conta Kiti"],
      specs: {
        standard: "CE Belgeli Kimyasala Dayanıklı Basınçlı Kap",
        packaging: "Kutusunda Omuz Askısı, Hortum ve Pirinç Mızrak Dahil",
        consumption: "1 dolum (5L) ile ortalama 100-150 m² alan ilaçlanır",
        mixingRatio: "50 ml K-Othrine SC 50 doğrudan 5L tank suyuna eklenir",
        potLife: "3 Bar basınca dayanıklı polietilen kalın gövde",
        logistics: "Balçova Mağaza & Urla Depo Stok Teslim"
      },
      accordions: [
        {
          title: "Pirinç Nozul ile Hassas Ayar",
          body: "Plastik nozullara kıyasla aşınmaz; ince sisleme (uçan haşere) veya çizgisel fışkırtma (yürüyen haşere süpürgelik hattı) ayarı tam yapılabilir."
        }
      ]
    },
    {
      id: "tetikli-basincli-sprey-pompa-2l",
      name: "2 Litre Manuel Basınçlı El Pompası (Ayarlı Nozul)",
      badge: "Kompakt Daire Tipi",
      tag: "2 Litre El Tipi",
      deptId: "hasereUygulamaEkipmanPanel",
      category: "sprayers",
      thumb: "assets/hasere/tetikli-basincli-sprey-pompa-2l.jpg",
      desc: "Daire içi süpürgelikler, balkon köşeleri ve petek arkaları için hafif, tek elle pompalanıp kilitli tetikle sürekli püskürtme yapan 2 litrelik basınçlı el pompası.",
      meta: ["2 Litre Kapasite", "Sürekli Püskürtme Kilidi", "Ayarlanabilir Pirinç Nozul"],
      coverage: "Standart bir dairenin süpürgelik hatlarını tek dolumla tamamlar.",
      sizes: ["2 Litre El Pompası", "Koli (12 Adet)"],
      specs: {
        standard: "ISO 9001 Standartlarında İmal Edilmiş El Tipi İlaçlama Tankı",
        packaging: "Orijinal Bireysel Kutusunda",
        consumption: "Daire içi lokal ilaçlamalar ve pencere pervazları için ideal",
        mixingRatio: "20 ml K-Othrine 2 litre suya ilave edilir",
        potLife: "Darbeye ve asidik/bazik ilaçlara dayanıklı conta grubu",
        logistics: "Balçova Mağaza Stoktan Teslim"
      },
      accordions: [
        {
          title: "Tetik Kilitleme Özelliği",
          body: "Sürekli basılı tutmaya gerek kalmadan tetiği ileri itip kilitleyerek kesintisiz püskürtme yapılmasını sağlar."
        }
      ]
    },
    {
      id: "ffp2-karbon-filtreli-ilaclama-maskesi",
      name: "FFP2 Aktif Karbon Filtreli Ventilli Kimyasal Gaz & Toz Maskesi",
      badge: "EN 149:2001+A1 FFP2 NR D",
      tag: "Aktif Karbon Katmanlı",
      deptId: "hasereUygulamaEkipmanPanel",
      category: "ppe",
      thumb: "assets/hasere/ffp2-karbon-filtreli-ilaclama-maskesi.jpg",
      desc: "Püskürtme esnasında havaya karışan mikronize ilaç damlacıklarını ve organik buharları absorbe eden nefes ventilli profesyonel aktif karbonlu ilaçlama maskesi.",
      meta: ["EN 149 Sertifikalı", "Nefes Verme Ventili (Terletmez)", "Aktif Karbon Koku Filtresi"],
      coverage: "İlaçlama süresince uygulayıcının solunum yollarını %100 korur.",
      sizes: ["Tekli Steril Poşet", "10'lu Kutu Paketi", "Koli (100 Adet)"],
      specs: {
        standard: "CE EN 149:2001+A1:2009 FFP2 NR D",
        packaging: "Bireysel Hijyenik Poşetli Ambalaj",
        consumption: "Yoğun ilaçlama çalışmalarında tek kullanımlık maksimum koruma",
        mixingRatio: "Burun klipsi ve çift elastik bant ile tam sızdırmazlık",
        potLife: "Aktif kullanımda 8 saate kadar tam filtrasyon performansı",
        logistics: "Balçova Mağaza Stoktan Teslim"
      },
      accordions: [
        {
          title: "Aktif Karbon ile Koku ve Buhar Blokajı",
          body: "Standart toz maskeleri sadece katı partikülleri tutar; bu modeldeki aktif karbon katmanı kimyasal buharları da nötralize eder."
        }
      ]
    },
    {
      id: "nitril-kimyasal-ilaclama-eldiveni",
      name: "Ağır Hizmet Tipi Kimyasal Dayanımlı Yeşil Nitril Eldiven",
      badge: "EN ISO 374-1 Tip B (JKLOT)",
      tag: "Deltamethrin Geçirmez",
      deptId: "hasereUygulamaEkipmanPanel",
      category: "ppe",
      thumb: "assets/hasere/nitril-kimyasal-ilaclama-eldiveni.jpg",
      desc: "Konsantre ilaçların hazırlanması, seyreltilmesi ve spreyleme sırasında kimyasalın cilde temasını önleyen, içi pamuk astarlı uzun konçlu profesyonel yeşil nitril eldiven.",
      meta: ["EN 374 Kimyasal Koruma", "Uzun Konç (Bilek Korumalı)", "Elmas Desen Kaydırmaz Doku"],
      coverage: "Elleri ve önkolları konsantre ilaç sıçramalarına karşı tam korur.",
      sizes: ["No: 8 (M)", "No: 9 (L)", "No: 10 (XL)"],
      specs: {
        standard: "EN 388 (4101X) / EN ISO 374-1:2016 Tip B Kimyasal Standart",
        packaging: "1 Çift Poşetli Ambalaj",
        consumption: "İlaç hazırlama ve pompayı temizleme süreçlerinde tam el koruması",
        mixingRatio: "Yıkanabilir, defalarca kullanılabilir kalın nitril tabaka",
        potLife: "Pestisit, solvent ve yağlara karşı yüksek direnç",
        logistics: "Balçova Mağaza Stoktan Teslim"
      },
      accordions: [
        {
          title: "Pamuk Astarlı ve Kaydırmaz Yapı",
          body: "İçindeki flok pamuk astar terlemeyi önler; avuç içindeki elmas doku ıslak pompa ve hortum tutuşunda mükemmel kavrama sağlar."
        }
      ]
    },
    {
      id: "hassas-dereceli-olcek-kabi-100ml",
      name: "100 ml Kabartmalı Dereceli Karışım & Dozajlama Ölçek Kabı",
      badge: "Mililitre Hassasiyetinde",
      tag: "Kabartma Ölçek Çizgili",
      deptId: "hasereUygulamaEkipmanPanel",
      category: "measuring",
      thumb: "assets/hasere/hassas-dereceli-olcek-kabi-100ml.jpg",
      desc: "K-Othrine SC 50 ve diğer konsantre ilaçların su tankına doğru oranda eklenmesini sağlayan, kimyasallarla silinmeyen kabartma ölçekli polipropilen dereceli kap.",
      meta: ["100 ml Hacim", "5 ml Hassas Taksimat", "Kimyasala Dayanıklı Şeffaf PP"],
      coverage: "Doğru ilaçlama dozu için kesin mililitre ölçümü sağlar.",
      sizes: ["100 ml Ölçek Kabı", "250 ml Boy", "500 ml Boy"],
      specs: {
        standard: "Laboratuvar ve Tarımsal Dozajlama Standardı",
        packaging: "Gövdede Silinmeyen Kabartma Taksimat Çizgileri",
        consumption: "Doz aşımını ve yetersiz ilaçlamayı önleyen kesin ölçüm",
        mixingRatio: "Dökme ağızlı ergonomik yapı",
        potLife: "Kırılmaz polipropilen gövde; kimyasal ilaçlarla reaksiyona girmez",
        logistics: "Balçova Mağaza Stok Teslim"
      },
      accordions: [
        {
          title: "Silinmeyen Kabartma Taksimat",
          body: "Baskılı ölçüler ilaç temasında zamanla silinirken, kabartma kalıp çizgileri ömür boyu okunabilir kalır."
        }
      ]
    }
  ];

  // 3. TRANSPARENT HEADER OBSERVER & SUBNAV PINNING
  var header = document.getElementById("pvTransparentHeader") || document.querySelector("header");
  var subnav = document.getElementById("pvCatalogSubnav");
  var spacer = document.getElementById("pvSubnavSpacer");
  var initialSubnavTop = 0;

  function syncSubnavPin() {
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
    if (header) {
      if (scrollY > 120) {
        header.classList.add("header--solid");
      } else {
        header.classList.remove("header--solid");
      }
    }

    if (!subnav) return;
    if (!initialSubnavTop) {
      var rect = subnav.getBoundingClientRect();
      initialSubnavTop = rect.top + scrollY;
    }

    var headerHeight = 0;
    if (header && !header.classList.contains("header--hidden")) {
      headerHeight = header.offsetHeight || 72;
    }

    if (scrollY + headerHeight >= initialSubnavTop) {
      subnav.classList.add("is-pinned");
      subnav.style.top = headerHeight + "px";
      if (spacer) {
        spacer.style.height = subnav.offsetHeight + "px";
        spacer.classList.add("is-active");
      }
    } else {
      subnav.classList.remove("is-pinned");
      subnav.style.top = "";
      if (spacer) {
        spacer.style.height = "0px";
        spacer.classList.remove("is-active");
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
    initialSubnavTop = 0;
    syncSubnavPin();
  }, { passive: true });
  window.addEventListener("load", function() {
    initialSubnavTop = 0;
    syncSubnavPin();
  });
  syncSubnavPin();

  // 4. TAB SWITCHING / ZERO-SCROLL ENGINE
  var subnavLinks = document.querySelectorAll(".pv-subnav-link");
  var panels = {
    kothrineKonsantrePanel: document.getElementById("kothrineKonsantrePanel"),
    maxforceYemPanel: document.getElementById("maxforceYemPanel"),
    kemirgenKontrolPanel: document.getElementById("kemirgenKontrolPanel"),
    hasereUygulamaEkipmanPanel: document.getElementById("hasereUygulamaEkipmanPanel")
  };
  var currentActiveTab = "kothrineKonsantrePanel";

  function switchTab(targetId) {
    if (!panels[targetId]) return;
    currentActiveTab = targetId;

    subnavLinks.forEach(function(link) {
      var matches = link.getAttribute("data-target") === targetId;
      link.classList.toggle("active", matches);
      link.setAttribute("aria-selected", matches ? "true" : "false");
    });

    Object.keys(panels).forEach(function(pid) {
      var p = panels[pid];
      if (!p) return;
      var matches = (pid === targetId);
      p.classList.toggle("active", matches);
      p.style.display = matches ? "" : "none";
    });

    var dept = DEPARTMENTS_DATA.find(function(d) { return d.id === targetId; });
    var triggerLabel = document.getElementById("pvDeptTriggerLabel");
    if (triggerLabel && dept) {
      triggerLabel.textContent = dept.short;
    }

    renderDeptDrawer(targetId);
    syncMobileFilterRail(targetId);
  }

  subnavLinks.forEach(function(link) {
    link.addEventListener("click", function() {
      var target = link.getAttribute("data-target");
      if (target) {
        switchTab(target);
        var subnavEl = document.getElementById("pvCatalogSubnav");
        if (subnavEl) {
          var rect = subnavEl.getBoundingClientRect();
          var offset = window.pageYOffset + rect.top - 80;
          window.scrollTo({ top: offset, behavior: "smooth" });
        }
      }
    });
  });

  // 5. PILL FILTERING SYSTEM
  document.querySelectorAll(".pv-dept-panel").forEach(function(panel) {
    var pills = panel.querySelectorAll(".pv-menu-pill");
    var rows = panel.querySelectorAll(".pv-menu-row");

    pills.forEach(function(pill) {
      pill.addEventListener("click", function() {
        pills.forEach(function(p) {
          p.classList.remove("active");
          p.setAttribute("aria-selected", "false");
        });
        pill.classList.add("active");
        pill.setAttribute("aria-selected", "true");

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

  // 6. MOBILE DRAWER & HORIZONTAL RAIL
  var deptDrawerTrigger = document.getElementById("pvDeptTrigger");
  var deptDrawerBackdrop = document.getElementById("pvDeptDrawerBackdrop");
  var deptDrawerClose = document.getElementById("pvDeptDrawerCloseBtn");
  var deptDrawerList = document.getElementById("pvDeptList");
  var mobileFilterRail = document.getElementById("pvFilterRail");

  function renderDeptDrawer(activeId) {
    if (!deptDrawerList) return;
    deptDrawerList.innerHTML = "";

    DEPARTMENTS_DATA.forEach(function(dept) {
      var item = document.createElement("button");
      item.type = "button";
      var isSelected = (dept.id === activeId);
      item.className = "pv-drawer-item" + (isSelected ? " active" : "");
      item.innerHTML = [
        '<div class="pv-drawer-item-left">',
        '  <div class="pv-drawer-icon-box" aria-hidden="true">' + (dept.icon || '') + '</div>',
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
        var subnavEl = document.getElementById("pvCatalogSubnav");
        if (subnavEl) {
          var rect = subnavEl.getBoundingClientRect();
          window.scrollTo({ top: window.pageYOffset + rect.top - 70, behavior: "smooth" });
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

    var originalPills = activePanel.querySelectorAll(".pv-menu-pill");
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

  // 7. SPECIMEN PRODUCT DETAIL MODAL
  var modalBackdrop = document.getElementById("pvProductModal");
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
    var product = HASERE_PRODUCTS_DATA.find(function(p) { return p.id === productId; });
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
      modalProductEyebrow.textContent = "BAYER ÇEVRE SAĞLIĞI · " + (product.tag || "").toUpperCase();
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
        standard: "Ruhsat & Kalite Standardı",
        packaging: "Ambalaj & Format",
        consumption: "Uygulama Alanı / Kapsam",
        mixingRatio: "Dozajlama & Seyreltme Oranı",
        potLife: "Kalıcılık & Etki Süresi",
        logistics: "Lojistik & Teslimat"
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
      modalBackdrop.classList.add("is-open", "open");
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
    msg += " için stok durumu ve Balçova mağaza / Urla depo teslim fiyatı almak istiyorum.";
    modalWaBtn.href = "https://wa.me/905323844497?text=" + encodeURIComponent(msg);
  }

  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove("is-open", "open");
    modalBackdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", function(e) {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  // Attach click listeners to static product rows
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

  // 8. SPOTLIGHT COMMAND PALETTE ENGINE (⌘K / 20 Ürün Arama)
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
    return d ? d.short : "Haşere";
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

    var featured = HASERE_PRODUCTS_DATA.slice(0, 8);
    var heading = document.createElement("div");
    heading.className = "pv-spotlight-group-title";
    heading.textContent = "Öne Çıkan Bayer Haşere & Çevre Sağlığı Ürünleri";
    spotlightResults.appendChild(heading);

    featured.forEach(function(item) {
      spotlightResults.appendChild(createSpotlightItemEl(item));
    });

    if (spotlightCount) {
      spotlightCount.textContent = HASERE_PRODUCTS_DATA.length + " Ürün Kataloğu";
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
    var matches = HASERE_PRODUCTS_DATA.filter(function(item) {
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
        var p = HASERE_PRODUCTS_DATA.find(function(it) { return it.id === pid; });
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
  renderDeptDrawer("kothrineKonsantrePanel");
  syncMobileFilterRail("kothrineKonsantrePanel");
})();
