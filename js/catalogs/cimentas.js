/* ==========================================================================
   PERVAN DESIGN SYSTEM — CIMENTAS CATALOG CONTROLLER & ZERO-SCROLL ENGINE
   Version: 1.0.0
   Architecture: Pervan Modern Hub & Editorial Standard
   ========================================================================== */

/* 1. HERO STAGE SLIDER & HEADER OBSERVER */
(function() {
  var stage = document.getElementById("pvStageHero");
  var header = document.getElementById("pvHeader") || document.getElementById("header") || document.querySelector("header");

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

/* 2. ARCHITECTURAL SUBNAV & 3-DEPARTMENT ZERO-SCROLL ENGINE */
(function() {
  var CIMENTAS_PRODUCTS_DATA = [
  {
    "id": "cem-1-42-5-r",
    "name": "Çimentaş CEM I 42,5 R Portland Çimentosu (50 kg)",
    "badge": "Çimentaş Torbalı Çimento",
    "tag": "TS EN Standart Çimento",
    "deptId": "cimentasTorbaSection",
    "category": "portland-cem1",
    "thumb": "assets/cimentas-official/cem-1-42-5-r.png?v=2026.10.12",
    "desc": "TS EN 197-1 standardında, yüksek erken dayanımlı genel yapı ve betonarme çimentosu.",
    "meta": [
      "50 kg Kraft Torba (Paletli: 30 Torba / 1.500 kg)",
      "42,5 - 62,5 MPa",
      "min. 60 dk"
    ],
    "coverage": "42,5 - 62,5 MPa",
    "sizes": [
      "50 kg Kraft Torba (Paletli: 30 Torba / 1.500 kg)",
      "1 Palet (30 Torba / 1.500 kg)",
      "1 Kamyon (18 Palet / 27 Ton)"
    ],
    "specs": {
      "standard": "TS EN 197-1 / TS EN 206",
      "packaging": "50 kg Kraft Torba (Paletli: 30 Torba / 1.500 kg)",
      "day2": "min. 20,0 MPa",
      "day28": "42,5 - 62,5 MPa",
      "initialSetting": "min. 60 dk",
      "logistics": "Urla Ana Depo & İzmir Fabrika Çıkışlı Teslimat"
    },
    "tds": "https://www.cimentas.com.tr/urunler/1002/cem-%C4%B1/1001/425-r.aspx",
    "accordions": [
      {
        "title": "Kullanım Alanları ve Şantiye Hazırlığı",
        "body": "Çimentaş CEM I 42,5 R Portland Çimentosu (50 kg), İzmir ve Yarımada şantiyelerinde yüksek mukavemet ve stabil priz performansı sağlamak üzere üretilmiştir."
      },
      {
        "title": "Su / Çimento Oranı ve Kürleme Şartnamesi",
        "body": "Beton ve harç dökümlerinde su/çimento oranı kontrol altında tutulmalı, ilk 7 gün boyunca düzenli sulama veya kür kimyasalı ile hidratasyon çatlakları önlenmelidir."
      }
    ]
  },
  {
    "id": "cem-2-b-m-32-5-n",
    "name": "Çimentaş CEM II/B-M 32,5 N Kompoze Çimento (50 kg)",
    "badge": "Çimentaş Torbalı Çimento",
    "tag": "TS EN Standart Çimento",
    "deptId": "cimentasTorbaSection",
    "category": "kompoze-ozel",
    "thumb": "assets/cimentas-official/cem-2-b-m-32-5-n.png?v=2026.10.12",
    "desc": "Sıva, harç, şap ve tuğla duvar örme işleri için mükemmel işlenebilirlik sağlayan standart çimento.",
    "meta": [
      "50 kg Kraft Torba (Paletli: 30 Torba / 1.500 kg)",
      "32,5 - 52,5 MPa",
      "min. 75 dk"
    ],
    "coverage": "32,5 - 52,5 MPa",
    "sizes": [
      "50 kg Kraft Torba (Paletli: 30 Torba / 1.500 kg)",
      "1 Palet (30 Torba / 1.500 kg)",
      "1 Kamyon (18 Palet / 27 Ton)"
    ],
    "specs": {
      "standard": "TS EN 197-1 / TS EN 206",
      "packaging": "50 kg Kraft Torba (Paletli: 30 Torba / 1.500 kg)",
      "day2": "min. 16,0 MPa",
      "day28": "32,5 - 52,5 MPa",
      "initialSetting": "min. 75 dk",
      "logistics": "Urla Ana Depo & İzmir Fabrika Çıkışlı Teslimat"
    },
    "tds": "https://www.cimentas.com.tr/urunler/1003/cem-%C4%B1%C4%B1/1008/b-m-p-l-325-n.aspx",
    "accordions": [
      {
        "title": "Kullanım Alanları ve Şantiye Hazırlığı",
        "body": "Çimentaş CEM II/B-M 32,5 N Kompoze Çimento (50 kg), İzmir ve Yarımada şantiyelerinde yüksek mukavemet ve stabil priz performansı sağlamak üzere üretilmiştir."
      },
      {
        "title": "Su / Çimento Oranı ve Kürleme Şartnamesi",
        "body": "Beton ve harç dökümlerinde su/çimento oranı kontrol altında tutulmalı, ilk 7 gün boyunca düzenli sulama veya kür kimyasalı ile hidratasyon çatlakları önlenmelidir."
      }
    ]
  },
  {
    "id": "cem-1-52-5-r",
    "name": "Çimentaş CEM I 52,5 R Süper Mukavemetli Çimento (50 kg)",
    "badge": "Çimentaş Torbalı Çimento",
    "tag": "TS EN Standart Çimento",
    "deptId": "cimentasTorbaSection",
    "category": "portland-cem1",
    "thumb": "assets/cimentas-official/cem-1-52-5-r.png?v=2026.10.12",
    "desc": "Öngermeli elemanlar, tünel kalıp ve çok katlı projeler için ultra yüksek erken mukavemet.",
    "meta": [
      "50 kg Kraft Torba (Paletli: 30 Torba / 1.500 kg)",
      "min. 52,5 MPa",
      "min. 45 dk"
    ],
    "coverage": "min. 52,5 MPa",
    "sizes": [
      "50 kg Kraft Torba (Paletli: 30 Torba / 1.500 kg)",
      "1 Palet (30 Torba / 1.500 kg)",
      "1 Kamyon (18 Palet / 27 Ton)"
    ],
    "specs": {
      "standard": "TS EN 197-1 / TS EN 206",
      "packaging": "50 kg Kraft Torba (Paletli: 30 Torba / 1.500 kg)",
      "day2": "min. 30,0 MPa",
      "day28": "min. 52,5 MPa",
      "initialSetting": "min. 45 dk",
      "logistics": "Urla Ana Depo & İzmir Fabrika Çıkışlı Teslimat"
    },
    "tds": "https://www.cimentas.com.tr/urunler/1002/cem-%C4%B1/1002/525-r.aspx",
    "accordions": [
      {
        "title": "Kullanım Alanları ve Şantiye Hazırlığı",
        "body": "Çimentaş CEM I 52,5 R Süper Mukavemetli Çimento (50 kg), İzmir ve Yarımada şantiyelerinde yüksek mukavemet ve stabil priz performansı sağlamak üzere üretilmiştir."
      },
      {
        "title": "Su / Çimento Oranı ve Kürleme Şartnamesi",
        "body": "Beton ve harç dökümlerinde su/çimento oranı kontrol altında tutulmalı, ilk 7 gün boyunca düzenli sulama veya kür kimyasalı ile hidratasyon çatlakları önlenmelidir."
      }
    ]
  },
  {
    "id": "cem-4-sulfate-sr",
    "name": "Çimentaş CEM IV/A (P) 42,5 R - SR Sülfata Dayanıklı Çimento",
    "badge": "Çimentaş Torbalı Çimento",
    "tag": "TS EN Standart Çimento",
    "deptId": "cimentasTorbaSection",
    "category": "kompoze-ozel",
    "thumb": "assets/cimentas-official/cem-4-sulfate-sr.png?v=2026.10.12",
    "desc": "Ege sahil şeridi, deniz yapıları, temel kazıkları ve tuz serpintisine maruz şantiyeler için sülfat kalkanı.",
    "meta": [
      "50 kg Kraft Torba (Paletli: 30 Torba / 1.500 kg)",
      "42,5 - 62,5 MPa",
      "min. 60 dk"
    ],
    "coverage": "42,5 - 62,5 MPa",
    "sizes": [
      "50 kg Kraft Torba (Paletli: 30 Torba / 1.500 kg)",
      "1 Palet (30 Torba / 1.500 kg)",
      "1 Kamyon (18 Palet / 27 Ton)"
    ],
    "specs": {
      "standard": "TS EN 197-1 / TS EN 206",
      "packaging": "50 kg Kraft Torba (Paletli: 30 Torba / 1.500 kg)",
      "day2": "min. 20,0 MPa",
      "day28": "42,5 - 62,5 MPa",
      "initialSetting": "min. 60 dk",
      "logistics": "Urla Ana Depo & İzmir Fabrika Çıkışlı Teslimat"
    },
    "tds": "https://www.cimentas.com.tr/urunler/1004/cem-%C4%B1v/1009/a-p-425-r-sr.aspx",
    "accordions": [
      {
        "title": "Kullanım Alanları ve Şantiye Hazırlığı",
        "body": "Çimentaş CEM IV/A (P) 42,5 R - SR Sülfata Dayanıklı Çimento, İzmir ve Yarımada şantiyelerinde yüksek mukavemet ve stabil priz performansı sağlamak üzere üretilmiştir."
      },
      {
        "title": "Su / Çimento Oranı ve Kürleme Şartnamesi",
        "body": "Beton ve harç dökümlerinde su/çimento oranı kontrol altında tutulmalı, ilk 7 gün boyunca düzenli sulama veya kür kimyasalı ile hidratasyon çatlakları önlenmelidir."
      }
    ]
  },
  {
    "id": "idealcem-harc",
    "name": "Çimentaş İDEALCEM Harç ve Sıva Çimentosu (40 kg)",
    "badge": "Çimentaş Torbalı Çimento",
    "tag": "TS EN Standart Çimento",
    "deptId": "cimentasTorbaSection",
    "category": "kompoze-ozel",
    "thumb": "assets/cimentas-official/idealcem-harc.png?v=2026.10.12",
    "desc": "Katkılı özel formülü sayesinde çatlama yapmayan, yüksek yapışma güçlü sıva ve duvar harcı.",
    "meta": [
      "40 kg Kraft Torba (Paletli: 40 Torba / 1.600 kg)",
      "22,5 - 42,5 MPa",
      "min. 90 dk"
    ],
    "coverage": "22,5 - 42,5 MPa",
    "sizes": [
      "40 kg Kraft Torba (Paletli: 40 Torba / 1.600 kg)",
      "1 Palet (30 Torba / 1.500 kg)",
      "1 Kamyon (18 Palet / 27 Ton)"
    ],
    "specs": {
      "standard": "TS EN 197-1 / TS EN 206",
      "packaging": "40 kg Kraft Torba (Paletli: 40 Torba / 1.600 kg)",
      "day2": "min. 12,5 MPa",
      "day28": "22,5 - 42,5 MPa",
      "initialSetting": "min. 90 dk",
      "logistics": "Urla Ana Depo & İzmir Fabrika Çıkışlı Teslimat"
    },
    "tds": "https://www.cimentas.com.tr/musteri-odakli-ozel-urunlerimiz.aspx",
    "accordions": [
      {
        "title": "Kullanım Alanları ve Şantiye Hazırlığı",
        "body": "Çimentaş İDEALCEM Harç ve Sıva Çimentosu (40 kg), İzmir ve Yarımada şantiyelerinde yüksek mukavemet ve stabil priz performansı sağlamak üzere üretilmiştir."
      },
      {
        "title": "Su / Çimento Oranı ve Kürleme Şartnamesi",
        "body": "Beton ve harç dökümlerinde su/çimento oranı kontrol altında tutulmalı, ilk 7 gün boyunca düzenli sulama veya kür kimyasalı ile hidratasyon çatlakları önlenmelidir."
      }
    ]
  },
  {
    "id": "beyaz-portland-52-5",
    "name": "Çimentaş Süper Beyaz Portland Çimentosu CEM I 52,5 R",
    "badge": "Çimentaş Torbalı Çimento",
    "tag": "TS EN Standart Çimento",
    "deptId": "cimentasTorbaSection",
    "category": "portland-cem1",
    "thumb": "assets/cimentas-official/beyaz-portland-52-5.png?v=2026.10.12",
    "desc": "Min. %85 beyazlık derecesine sahip, mimari brüt beton ve prekast elemanlar için beyaz çimento.",
    "meta": [
      "50 kg / 25 kg Torba (Paletli)",
      "min. 52,5 MPa",
      "min. 60 dk"
    ],
    "coverage": "min. 52,5 MPa",
    "sizes": [
      "50 kg / 25 kg Torba (Paletli)",
      "1 Palet (30 Torba / 1.500 kg)",
      "1 Kamyon (18 Palet / 27 Ton)"
    ],
    "specs": {
      "standard": "TS EN 197-1 / TS EN 206",
      "packaging": "50 kg / 25 kg Torba (Paletli)",
      "day2": "min. 32,0 MPa",
      "day28": "min. 52,5 MPa",
      "initialSetting": "min. 60 dk",
      "logistics": "Urla Ana Depo & İzmir Fabrika Çıkışlı Teslimat"
    },
    "tds": "https://www.cimentas.com.tr/urunler.aspx",
    "accordions": [
      {
        "title": "Kullanım Alanları ve Şantiye Hazırlığı",
        "body": "Çimentaş Süper Beyaz Portland Çimentosu CEM I 52,5 R, İzmir ve Yarımada şantiyelerinde yüksek mukavemet ve stabil priz performansı sağlamak üzere üretilmiştir."
      },
      {
        "title": "Su / Çimento Oranı ve Kürleme Şartnamesi",
        "body": "Beton ve harç dökümlerinde su/çimento oranı kontrol altında tutulmalı, ilk 7 gün boyunca düzenli sulama veya kür kimyasalı ile hidratasyon çatlakları önlenmelidir."
      }
    ]
  }
]

  var DEPARTMENTS_DATA = [
    {
      id: "cimentasTorbaSection",
      name: "Torbalı Çimento",
      title: "Çimentaş Torbalı Çimento & Harç Grubu",
      badge: "Torbalı Çimento & Şantiye Palet",
      pills: [
        { filter: "all", label: "Tüm Torbalı Çimentolar (6)" },
        { filter: "portland-cem1", label: "CEM I Portland (42.5 / 52.5 / Beyaz)" },
        { filter: "kompoze-ozel", label: "CEM II & Sülfata Dayanıklı & Harç" }
      ]
    }
  ];

  var activeDeptIndex = 0;
  var subnav = document.getElementById("pvSubnav");
  var spacer = document.getElementById("pvSubnavSpacer");
  var header = document.getElementById("pvHeader") || document.getElementById("header") || document.querySelector("header");
  var subnavLinks = document.querySelectorAll("#pvSubnavLinks .pv-subnav-link");
  var deptPanels = document.querySelectorAll(".pv-dept-panel");
  var deptTrigger = document.getElementById("pvDeptTrigger");
  var deptTriggerLabel = document.getElementById("pvDeptTriggerLabel");
  var filterRail = document.getElementById("pvFilterRail");
  var deptDrawerBackdrop = document.getElementById("pvDeptDrawerBackdrop");
  var deptDrawer = document.getElementById("pvDeptDrawer");
  var deptDrawerCloseBtn = document.getElementById("pvDrawerCloseBtn");
  var deptList = document.getElementById("pvDeptList");

  var currentActiveTab = "cimentasTorbaSection";
  var currentProduct = null;
  var selectedSize = "";

  var panels = {
    "cimentasTorbaSection": document.getElementById("cimentasTorbaSection")
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

  window.addEventListener("scroll", syncSubnavPin, { passive: true });
  window.addEventListener("resize", function() {
    initialSubnavTop = 0;
    syncSubnavPin();
  }, { passive: true });
  setTimeout(syncSubnavPin, 100);

  if (header && window.MutationObserver) {
    var obs = new MutationObserver(function() {
      syncSubnavPin();
    });
    obs.observe(header, { attributes: true, attributeFilter: ["class", "style"] });
  }

  function switchDepartment(target, shouldScroll) {
    var deptId = target;
    if (typeof target === "number") {
      var foundDept = DEPARTMENTS_DATA[target];
      if (foundDept) deptId = foundDept.id;
    }
    if (!deptId || !panels[deptId]) return;
    currentActiveTab = deptId;

    var deptIndex = DEPARTMENTS_DATA.findIndex(function(d) { return d.id === deptId; });
    if (deptIndex !== -1) activeDeptIndex = deptIndex;
    var dept = DEPARTMENTS_DATA[activeDeptIndex] || DEPARTMENTS_DATA[0];

    subnavLinks.forEach(function(link) {
      var isActive = link.getAttribute("data-target") === deptId;
      link.classList.toggle("active", isActive);
      link.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    for (var key in panels) {
      if (panels.hasOwnProperty(key) && panels[key]) {
        var isTarget = key === deptId;
        panels[key].classList.toggle("active", isTarget);
      }
    }

    if (deptTriggerLabel) {
      deptTriggerLabel.textContent = dept.name;
    }

    renderMobileFilterRail(dept);

    if (deptList) {
      deptList.querySelectorAll(".pv-drawer-item").forEach(function(item) {
        item.classList.toggle("active", item.getAttribute("data-target") === deptId);
      });
    }

    if (shouldScroll !== false) {
      var targetPanel = panels[deptId];
      if (targetPanel) {
        var hHeight = getHeaderHeight();
        var sHeight = subnav ? subnav.offsetHeight : 46;
        var totalOffset = hHeight + sHeight + 10;
        var panelTop = targetPanel.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop);
        window.scrollTo({
          top: Math.max(0, panelTop - totalOffset),
          behavior: "smooth"
        });
      }
    }
  }

  function renderMobileFilterRail(dept) {
    if (!filterRail) return;
    filterRail.innerHTML = "";
    if (!dept.pills || dept.pills.length === 0) return;

    var panel = panels[dept.id];
    var activeFilter = dept.pills[0].filter;
    if (panel) {
      var activeDesktopPill = panel.querySelector(".pv-menu-pill.active");
      if (activeDesktopPill) {
        activeFilter = activeDesktopPill.getAttribute("data-filter");
      }
    }

    dept.pills.forEach(function(p) {
      var chip = document.createElement("button");
      chip.type = "button";
      chip.className = "pv-filter-chip" + (p.filter === activeFilter ? " active" : "");
      chip.setAttribute("data-filter", p.filter);
      chip.textContent = p.label;
      chip.addEventListener("click", function() {
        applyCategoryFilter(dept.id, p.filter);
      });
      filterRail.appendChild(chip);
    });
  }

  function applyCategoryFilter(deptId, filter) {
    var panel = panels[deptId];
    if (!panel) return;

    panel.querySelectorAll(".pv-menu-pill").forEach(function(pill) {
      var isAct = pill.getAttribute("data-filter") === filter;
      pill.classList.toggle("active", isAct);
      pill.setAttribute("aria-selected", isAct ? "true" : "false");
    });

    if (filterRail) {
      filterRail.querySelectorAll(".pv-filter-chip").forEach(function(chip) {
        chip.classList.toggle("active", chip.getAttribute("data-filter") === filter);
      });
    }

    var rows = panel.querySelectorAll(".pv-menu-row");
    rows.forEach(function(row) {
      var rowCat = row.getAttribute("data-category");
      if (filter === "all" || !filter || rowCat === filter) {
        row.style.display = "flex";
      } else {
        row.style.display = "none";
      }
    });
  }

  subnavLinks.forEach(function(btn) {
    btn.addEventListener("click", function(e) {
      e.preventDefault();
      var targetId = btn.getAttribute("data-target");
      switchDepartment(targetId, true);
    });
  });

  function setupCategoryFiltering(pillsId, listId) {
    var pillsContainer = document.getElementById(pillsId);
    var list = document.getElementById(listId);
    if (!pillsContainer || !list) return;

    var pills = pillsContainer.querySelectorAll(".pv-menu-pill");
    pills.forEach(function(pill) {
      pill.addEventListener("click", function() {
        var filter = pill.getAttribute("data-filter");
        var deptId = pill.closest(".pv-dept-panel") ? pill.closest(".pv-dept-panel").id : currentActiveTab;
        applyCategoryFilter(deptId, filter);
      });
    });
  }

  setupCategoryFiltering("cimentasTorbaSectionPills", "list_cimentasTorbaSection");

  function openDeptDrawer() {
    if (!deptDrawerBackdrop || !deptDrawer) return;
    deptDrawerBackdrop.classList.add("open");
    deptDrawerBackdrop.classList.add("is-open");
    deptDrawerBackdrop.classList.add("active");
    deptDrawerBackdrop.setAttribute("aria-hidden", "false");
    deptDrawer.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeDeptDrawer() {
    if (!deptDrawerBackdrop || !deptDrawer) return;
    deptDrawerBackdrop.classList.remove("open");
    deptDrawerBackdrop.classList.remove("is-open");
    deptDrawerBackdrop.classList.remove("active");
    deptDrawerBackdrop.setAttribute("aria-hidden", "true");
    deptDrawer.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (deptTrigger) deptTrigger.addEventListener("click", openDeptDrawer);
  if (deptDrawerCloseBtn) deptDrawerCloseBtn.addEventListener("click", closeDeptDrawer);
  if (deptDrawerBackdrop) {
    deptDrawerBackdrop.addEventListener("click", function(e) {
      if (e.target === deptDrawerBackdrop) closeDeptDrawer();
    });
  }

  if (deptList) {
    deptList.innerHTML = "";
    DEPARTMENTS_DATA.forEach(function(d) {
      var item = document.createElement("div");
      item.className = "pv-drawer-item" + (d.id === currentActiveTab ? " active" : "");
      item.setAttribute("data-target", d.id);
      item.innerHTML = '<div class="pv-drawer-item-title">' + d.name + '</div><div class="pv-drawer-item-desc">' + d.title + '</div>';
      item.addEventListener("click", function() {
        closeDeptDrawer();
        switchDepartment(d.id, true);
      });
      deptList.appendChild(item);
    });
  }

  renderMobileFilterRail(DEPARTMENTS_DATA[0]);

  /* 3. PRODUCT DETAIL BOTTOM SHEET MODAL CONTROLLER */
  var modalBackdrop = document.getElementById("pvModalBackdrop");
  var modalCard = document.getElementById("pvModalCard");
  var modalCloseBtn = document.getElementById("pvModalCloseBtn");
  var modalTopBar = document.getElementById("modalTopBar");
  var modalHandleZone = document.getElementById("modalHandleZone");
  var modalScrollArea = document.getElementById("modalScrollArea");

  var modalProductTitle = document.getElementById("modalProductTitle");
  var modalProductBadges = document.getElementById("modalProductBadges");
  var modalProductBadge = document.getElementById("modalProductBadge");
  var modalProductEyebrow = document.getElementById("modalProductEyebrow");
  var modalProductImg = document.getElementById("modalProductImg");
  var modalProductDesc = document.getElementById("modalProductDesc");
  var modalPackagingSection = document.getElementById("modalPackagingSection");
  var modalSelectedSizeHint = document.getElementById("modalSelectedSizeHint");
  var modalSizeChips = document.getElementById("modalSizeChips");

  var modalSpecStandard = document.getElementById("modalSpecStandard");
  var modalSpecConsumption = document.getElementById("modalSpecConsumption");
  var modalSpecPackaging = document.getElementById("modalSpecPackaging");
  var modalSpecMixing = document.getElementById("modalSpecMixing");
  var modalSpecPotLife = document.getElementById("modalSpecPotLife");
  var modalSpecLogistics = document.getElementById("modalSpecLogistics");
  var modalSpecsTable = document.getElementById("modalSpecsTable");

  var modalAccordions = document.getElementById("modalAccordions");
  var modalWABtn = document.getElementById("modalWABtn") || document.getElementById("modalWaBtn");
  var modalWaBtn = document.getElementById("modalWaBtn") || document.getElementById("modalWABtn");
  var modalShareBtn = document.getElementById("modalShareBtn");
  var modalShareText = document.getElementById("modalShareText");

  var isSheetDragging = false;
  var dragStartY = 0;
  var dragCurrentY = 0;
  var dragStartTime = 0;
  var canDragFromScroll = false;

  function openProductModal(productId) {
    var prod = CIMENTAS_PRODUCTS_DATA.find(function(p) { return p.id === productId; });
    if (!prod) return;
    currentProduct = prod;
    selectedSize = (prod.sizes && prod.sizes.length > 0) ? prod.sizes[0] : (prod.specs ? prod.specs.packaging : "");

    if (modalProductTitle) modalProductTitle.textContent = prod.name;
    if (modalProductEyebrow) modalProductEyebrow.textContent = "ÇİMENTAŞ · YETKİLİ SATIŞ";
    if (modalProductImg) {
      modalProductImg.src = prod.thumb;
      modalProductImg.alt = prod.name;
    }
    if (modalProductDesc) modalProductDesc.textContent = prod.desc;

    // Badges
    if (modalProductBadges) {
      modalProductBadges.innerHTML = "";
      if (prod.badge) {
        var b = document.createElement("span");
        b.className = "pv-specimen-badge";
        b.textContent = prod.badge;
        modalProductBadges.appendChild(b);
      }
      if (prod.tag) {
        var t = document.createElement("span");
        t.className = "pv-specimen-badge-sub";
        t.textContent = prod.tag;
        modalProductBadges.appendChild(t);
      }
    } else if (modalProductBadge) {
      modalProductBadge.textContent = prod.badge || "Çimentaş";
    }

    // Spec Gauges
    var gauge1Eyebrow = document.querySelector("#modalGaugeStandardCard .pv-gauge-eyebrow");
    var gauge1Caption = document.getElementById("modalSpecPackaging");
    var gauge2Eyebrow = document.querySelector("#modalGaugeConsumptionCard .pv-gauge-eyebrow");
    var gauge2Caption = document.getElementById("modalGaugeStandardCaption");

    if (gauge1Eyebrow) gauge1Eyebrow.textContent = "28 GÜNLÜK MUKAVEMET";
    if (gauge1Caption) gauge1Caption.textContent = prod.specs ? prod.specs.standard : "TS EN 197-1 / TS EN 206";
    if (modalSpecConsumption) modalSpecConsumption.textContent = (prod.specs && prod.specs.day28) ? prod.specs.day28 : (prod.coverage || "-");

    if (gauge2Eyebrow) gauge2Eyebrow.textContent = "PRİZ / KIVAM SÜRESİ";
    if (gauge2Caption) gauge2Caption.textContent = "Başlangıç Prizi";
    if (modalSpecPotLife) modalSpecPotLife.textContent = (prod.specs && prod.specs.initialSetting) ? prod.specs.initialSetting : "-";

    // Dynamic Specs Table
    if (modalSpecsTable && prod.specs) {
      modalSpecsTable.innerHTML = "";
      var specLabels = {
        standard: "Kalite & Standardı",
        packaging: "Ambalaj & Sevkiyat Tipi",
        day2: "2 Günlük Erken Mukavemet",
        day28: "28 Günlük Standart Dayanım",
        initialSetting: "Başlangıç Priz Süresi",
        logistics: "Lojistik & Şantiye Teslim"
      };

      for (var key in prod.specs) {
        if (prod.specs.hasOwnProperty(key)) {
          var rowEl = document.createElement("div");
          rowEl.className = "pv-spec-row";
          var kEl = document.createElement("span");
          kEl.className = "pv-spec-k";
          kEl.textContent = (specLabels[key] || key) + ":";
          var vEl = document.createElement("span");
          vEl.className = "pv-spec-v";
          vEl.textContent = prod.specs[key];
          rowEl.appendChild(kEl);
          rowEl.appendChild(vEl);
          modalSpecsTable.appendChild(rowEl);
        }
      }
    }

    // Size / Packaging Chips
    if (modalSizeChips) {
      modalSizeChips.innerHTML = "";
      if (prod.sizes && prod.sizes.length > 0) {
        if (modalPackagingSection) modalPackagingSection.style.display = "";
        prod.sizes.forEach(function(sz, idx) {
          var chip = document.createElement("button");
          chip.type = "button";
          chip.className = "pv-size-chip" + (idx === 0 ? " active" : "");
          chip.textContent = sz;
          chip.setAttribute("role", "radio");
          chip.setAttribute("aria-checked", idx === 0 ? "true" : "false");
          chip.addEventListener("click", function() {
            modalSizeChips.querySelectorAll(".pv-size-chip").forEach(function(c) {
              c.classList.remove("active");
              c.setAttribute("aria-checked", "false");
            });
            chip.classList.add("active");
            chip.setAttribute("aria-checked", "true");
            selectedSize = sz;
            updateWhatsAppLink();
            if (modalSelectedSizeHint) modalSelectedSizeHint.textContent = sz;
          });
          modalSizeChips.appendChild(chip);
        });
        if (modalSelectedSizeHint) modalSelectedSizeHint.textContent = prod.sizes[0];
      } else {
        if (modalPackagingSection) modalPackagingSection.style.display = "none";
      }
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
      if (prod.tds) {
        var tdsAcc = document.createElement("div");
        tdsAcc.className = "pv-tds-action-wrap";
        tdsAcc.style.marginTop = "14px";
        tdsAcc.innerHTML = '<a href="' + prod.tds + '" target="_blank" rel="noopener" class="pv-btn-tds-full"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg><span>Resmi Çimentaş Ürün Föyü &amp; Performans Belgesi</span></a>';
        modalAccordions.appendChild(tdsAcc);
      }
    }

    updateWhatsAppLink();

    if (modalBackdrop && modalCard) {
      modalBackdrop.classList.add("active");
      modalBackdrop.classList.add("open");
      modalBackdrop.classList.add("is-open");
      modalBackdrop.setAttribute("aria-hidden", "false");
      modalCard.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    try {
      history.replaceState({ modal: true, id: prod.id }, "", "/urun/" + prod.id + ".html");
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

  function updateWhatsAppLink() {
    if (!currentProduct) return;
    var text = "Merhaba, Çimentaş Yetkili Satış Merkezinizden " + currentProduct.name;
    if (selectedSize) {
      text += " (" + selectedSize + ")";
    }
    text += " için İzmir / Urla ana deponuzdan şantiye teslimi paletli vinçli kamyon fiyatı öğrenmek istiyorum.";
    text += "\n\nÜrün Detayı: https://pervanyapi.com/urun/" + currentProduct.id + ".html";
    var waHref = "https://wa.me/905323318763?text=" + encodeURIComponent(text);
    if (modalWABtn) modalWABtn.href = waHref;
    if (modalWaBtn) modalWaBtn.href = waHref;
  }

  function closeProductModal() {
    if (!modalBackdrop || !modalCard) return;
    modalBackdrop.classList.remove("active");
    modalBackdrop.classList.remove("open");
    modalBackdrop.classList.remove("is-open");
    modalBackdrop.setAttribute("aria-hidden", "true");
    modalCard.classList.remove("active");
    document.body.style.overflow = "";
    currentProduct = null;
    resetSheetStyles();
    try {
      history.replaceState({}, "", "/cimentas-cimento.html");
    } catch(e) {}
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeProductModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", function(e) {
      if (e.target === modalBackdrop) closeProductModal();
    });
  }

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

  if (modalShareBtn) {
    modalShareBtn.addEventListener("click", function() {
      if (!currentProduct) return;
      var shareUrl = window.location.origin + "/urun/" + currentProduct.id + ".html";
      var shareData = {
        title: currentProduct.name + " | Pervan",
        text: currentProduct.name + " - " + currentProduct.desc,
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

  // Touch gesture physics for mobile bottom sheet dismissal
  function onDragStart(e) {
    if (!modalBackdrop || (!modalBackdrop.classList.contains("is-open") && !modalBackdrop.classList.contains("open") && !modalBackdrop.classList.contains("active"))) return;
    if (window.innerWidth > 960) return;

    var touch = e.touches ? e.touches[0] : e;
    var target = e.target;
    var isHandle = target.closest("#modalHandleZone") || target.closest("#modalTopBar");
    var isScrollArea = target.closest("#modalScrollArea");

    if (isScrollArea && modalScrollArea && modalScrollArea.scrollTop > 0) {
      canDragFromScroll = false;
      return;
    }

    if (isHandle || (isScrollArea && modalScrollArea && modalScrollArea.scrollTop <= 0)) {
      isSheetDragging = true;
      canDragFromScroll = true;
      dragStartY = touch.clientY;
      dragCurrentY = touch.clientY;
      dragStartTime = Date.now();
      if (modalCard) modalCard.style.transition = "none";
    }
  }

  function onDragMove(e) {
    if (!isSheetDragging || !modalCard) return;
    var touch = e.touches ? e.touches[0] : e;
    dragCurrentY = touch.clientY;
    var deltaY = dragCurrentY - dragStartY;

    if (deltaY < 0) {
      var damped = -Math.pow(-deltaY, 0.7);
      modalCard.style.transform = "translateY(" + damped + "px)";
    } else {
      modalCard.style.transform = "translateY(" + deltaY + "px)";
      if (modalBackdrop) {
        var progress = Math.max(0, 1 - (deltaY / 400));
        modalBackdrop.style.opacity = progress.toString();
      }
    }
  }

  function onDragEnd() {
    if (!isSheetDragging || !modalCard) return;
    isSheetDragging = false;
    var deltaY = dragCurrentY - dragStartY;
    var elapsed = Date.now() - dragStartTime;
    var velocity = deltaY / Math.max(elapsed, 1);

    if (deltaY > 100 || velocity > 0.5) {
      modalCard.style.transition = "transform 0.24s cubic-bezier(0.32, 1, 0.23, 1)";
      modalCard.style.transform = "translateY(100%)";
      if (modalBackdrop) {
        modalBackdrop.style.transition = "opacity 0.24s ease";
        modalBackdrop.style.opacity = "0";
      }
      setTimeout(closeProductModal, 240);
    } else {
      modalCard.style.transition = "transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)";
      modalCard.style.transform = "";
      if (modalBackdrop) {
        modalBackdrop.style.transition = "opacity 0.28s ease";
        modalBackdrop.style.opacity = "";
      }
    }
  }

  if (modalCard) {
    modalCard.addEventListener("touchstart", onDragStart, { passive: true });
    modalCard.addEventListener("touchmove", onDragMove, { passive: true });
    modalCard.addEventListener("touchend", onDragEnd, { passive: true });
  }

  /* 4. GLOBAL SPOTLIGHT COMMAND PALETTE ENGINE (⌘K / 6 Çimentaş Ürünü) */
  var spotlightBackdrop = document.getElementById("pvSpotlightBackdrop") || document.getElementById("pvSpotlightModal");
  var spotlightInput = document.getElementById("pvSpotlightInput");
  var spotlightCloseBtn = document.getElementById("pvSpotlightCloseBtn") || document.getElementById("pvSpotlightClose");
  var spotlightResults = document.getElementById("pvSpotlightResults");
  var spotlightCount = document.getElementById("pvSpotlightCount");
  var subnavSearchBtn = document.getElementById("pvSubnavSearchBtn");
  var spotlightSelectedIdx = -1;

  function normTr(str) {
    if (!str) return "";
    return str.toLowerCase()
      .replace(/ı/g, "i")
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c");
  }

  function openSpotlight() {
    if (!spotlightBackdrop || !spotlightInput) return;
    spotlightBackdrop.classList.add("open");
    spotlightBackdrop.classList.add("active");
    spotlightBackdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    spotlightInput.value = "";
    renderSpotlightInitial();
    setTimeout(function() { spotlightInput.focus(); }, 60);
  }

  function closeSpotlight() {
    if (!spotlightBackdrop) return;
    spotlightBackdrop.classList.remove("open");
    spotlightBackdrop.classList.remove("active");
    spotlightBackdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    spotlightSelectedIdx = -1;
  }

  function createSpotlightItemEl(prod) {
    var div = document.createElement("div");
    div.className = "pv-spotlight-item";
    div.setAttribute("data-product-id", prod.id);
    div.innerHTML = [
      '<div class="pv-spotlight-item-main">',
      '  <div class="pv-spotlight-item-badge">' + (prod.badge || "Çimentaş") + '</div>',
      '  <div class="pv-spotlight-item-title">' + prod.name + '</div>',
      '  <div class="pv-spotlight-item-desc">' + prod.desc + '</div>',
      '</div>',
      '<div class="pv-spotlight-item-meta">',
      '  <span class="pv-spotlight-tag">Torbalı Çimento</span>',
      '  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
      '</div>'
    ].join("");
    return div;
  }

  function renderSpotlightInitial() {
    if (!spotlightResults) return;
    spotlightResults.innerHTML = "";
    spotlightSelectedIdx = -1;

    var heading = document.createElement("div");
    heading.className = "pv-spotlight-group-title";
    heading.textContent = "Torbalı Çimento & Harç Ürünleri";
    spotlightResults.appendChild(heading);

    CIMENTAS_PRODUCTS_DATA.forEach(function(prod) {
      spotlightResults.appendChild(createSpotlightItemEl(prod));
    });

    if (spotlightCount) {
      spotlightCount.textContent = CIMENTAS_PRODUCTS_DATA.length + " Ürün Yayında";
    }
    attachSpotlightItemEvents();
  }

  function performSpotlightSearch(query) {
    if (!spotlightResults) return;
    var normQ = normTr(query);
    spotlightResults.innerHTML = "";
    spotlightSelectedIdx = -1;

    if (!normQ) {
      renderSpotlightInitial();
      return;
    }

    var tokens = normQ.split(" ").filter(Boolean);
    var matches = CIMENTAS_PRODUCTS_DATA.filter(function(item) {
      var target = normTr(item.name + " " + item.desc + " " + item.badge + " " + item.tag + " " + (item.meta ? item.meta.join(" ") : ""));
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
        '<p class="pv-spotlight-empty-title">"' + query + '" için eşleşen Çimentaş ürünü bulunamadı</p>',
        '<p class="pv-spotlight-empty-sub">Farklı bir arama terimi deneyin veya Urla depomuzdan direkt fiyat alın.</p>'
      ].join("");
      spotlightResults.appendChild(empty);
      return;
    }

    matches.forEach(function(prod) {
      spotlightResults.appendChild(createSpotlightItemEl(prod));
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
        openProductModal(pid);
      });
    });
  }

  if (subnavSearchBtn) subnavSearchBtn.addEventListener("click", openSpotlight);
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
      }, 80);
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

  window.addEventListener("keydown", function(e) {
    if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
      e.preventDefault();
      if (spotlightBackdrop && (spotlightBackdrop.classList.contains("active") || spotlightBackdrop.classList.contains("open"))) {
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

  // Deep linking: URL parameter ?item= or hash
  var urlParams = new URLSearchParams(window.location.search);
  var requestedItem = urlParams.get("item") || urlParams.get("product") || (window.location.hash ? window.location.hash.replace("#", "") : null);
  if (requestedItem) {
    var targetProduct = CIMENTAS_PRODUCTS_DATA.find(function(p) { return p.id === requestedItem; });
    if (targetProduct) {
      setTimeout(function() { openProductModal(targetProduct.id); }, 250);
    }
  }
})();
