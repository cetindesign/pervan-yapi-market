/* ==========================================================================
   REFORM CPH (reformcph.com) 1:1 CLONE — MASTER JAVASCRIPT
   Mobile-First Drawer · Accordions · Modal · WhatsApp Routing · Configurator
   ========================================================================== */

(function() {
  "use strict";

  document.addEventListener("DOMContentLoaded", function() {

    // REFORM 1:1 MOBILE NAVBAR TOGGLE
    var mobileBtn = document.getElementById("mobile-menu");
    var navbarContents = document.querySelector(".navbar-contents");
    if (mobileBtn && navbarContents) {
      mobileBtn.addEventListener("click", function(e) {
        e.preventDefault();
        mobileBtn.classList.toggle("closed");
        navbarContents.classList.toggle("opened");
        document.body.style.overflow = navbarContents.classList.contains("opened") ? "hidden" : "";
      });
    }

    // REFORM 1:1 ACCORDION TOGGLE ON MOBILE
    document.querySelectorAll(".navbar-menu .menu-item").forEach(function(item) {
      item.addEventListener("click", function(e) {
        if (window.innerWidth <= 991) {
          // Allow clicks on links inside dropdown to navigate
          if (e.target.closest(".navbar-dropdown")) {
            return;
          }
          e.preventDefault();
          e.stopPropagation();
          item.classList.toggle("is-open");
        }
      });
    });

    // 1. Mobile Menu Open / Close
    var rfToggle = document.getElementById("rfToggle");
    var rfMobileMenu = document.getElementById("rfMobileMenu");
    var rfMobileClose = document.getElementById("rfMobileClose");

    function openMobileMenu() {
      if (!rfMobileMenu) return;
      rfMobileMenu.classList.add("active");
      rfMobileMenu.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function closeMobileMenu() {
      if (!rfMobileMenu) return;
      rfMobileMenu.classList.remove("active");
      rfMobileMenu.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    if (rfToggle) {
      rfToggle.addEventListener("click", openMobileMenu);
    }
    var mobileMenuBtn = document.getElementById("mobile-menu");
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener("click", openMobileMenu);
    }

    if (rfMobileClose) {
      rfMobileClose.addEventListener("click", closeMobileMenu);
    }

    // 2. Mobile Accordion Toggle Logic
    document.querySelectorAll(".rf-mob-accordion-btn").forEach(function(btn) {
      btn.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        var item = btn.closest(".rf-mob-item");
        if (item) {
          item.classList.toggle("open");
        }
      });
    });

    // Also toggle when clicking accordion parent row link if it contains an accordion
    document.querySelectorAll(".rf-mob-item").forEach(function(item) {
      var btn = item.querySelector(".rf-mob-accordion-btn");
      var mainLink = item.querySelector(".rf-mob-link");
      if (btn && mainLink) {
        mainLink.addEventListener("click", function(e) {
          // If on mobile, expand accordion first
          if (window.innerWidth <= 1024) {
            e.preventDefault();
            item.classList.toggle("open");
          }
        });
      }
    });

    // 3. Consultation Slide-Over Modal Logic
    var modal = document.getElementById("consultationModal");
    var closeModalBtn = document.getElementById("closeModalBtn");
    var formServiceSelect = document.getElementById("formServiceSelect");

    window.openConsultation = function(serviceName) {
      closeMobileMenu();
      if (!modal) return;
      if (serviceName && formServiceSelect) {
        for (var i = 0; i < formServiceSelect.options.length; i++) {
          if (formServiceSelect.options[i].text.toLowerCase().indexOf(serviceName.toLowerCase()) !== -1) {
            formServiceSelect.selectedIndex = i;
            break;
          }
        }
      }
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    };

    window.closeConsultation = function() {
      if (!modal) return;
      modal.classList.remove("active");
      document.body.style.overflow = "";
    };

    if (closeModalBtn) {
      closeModalBtn.addEventListener("click", window.closeConsultation);
    }

    if (modal) {
      modal.addEventListener("click", function(e) {
        if (e.target === modal) {
          window.closeConsultation();
        }
      });
    }

    document.querySelectorAll(".rf-consultation-trigger").forEach(function(btn) {
      btn.addEventListener("click", function(e) {
        e.preventDefault();
        var s = btn.getAttribute("data-service") || "";
        window.openConsultation(s);
      });
    });

    // 4. Form Submission -> WhatsApp
    var consultationForm = document.getElementById("consultationForm");
    if (consultationForm) {
      consultationForm.addEventListener("submit", function(e) {
        e.preventDefault();
        var srv = formServiceSelect ? formServiceSelect.value : "Genel Keşif / Malzeme";
        var nameInput = document.getElementById("formName");
        var phoneInput = document.getElementById("formPhone");
        var notesInput = document.getElementById("formNotes");

        var name = nameInput ? nameInput.value : "";
        var phone = phoneInput ? phoneInput.value : "";
        var notes = notesInput ? notesInput.value : "";

        var message = "Merhaba Pervan Yapı Market,\n" +
                      "İhtiyaç / Proje: " + srv + "\n" +
                      "İsim: " + name + "\n" +
                      "Telefon: " + phone + "\n" +
                      (notes ? "Notlar: " + notes : "");

        var waUrl = "https://wa.me/902322784340?text=" + encodeURIComponent(message);
        window.open(waUrl, "_blank");
        window.closeConsultation();
      });
    }

    // 5. Product Detail Configurator & Accordion System
    // Accordion Toggle
    document.querySelectorAll(".rf-acc-header").forEach(function(hdr) {
      hdr.addEventListener("click", function(e) {
        e.preventDefault();
        var item = hdr.closest(".rf-acc-item");
        if (item) {
          item.classList.toggle("active");
        }
      });
    });

    // Size Pill Selection & Dynamic WhatsApp Message
    var activeSize = "";
    var activeColor = "";
    var waBtn = document.getElementById("rfDetailWaBtn");

    var initialSizeBtn = document.querySelector(".rf-size-pill.active");
    if (initialSizeBtn) {
      activeSize = initialSizeBtn.getAttribute("data-size") || initialSizeBtn.innerText.trim();
    }
    var initialColorBtn = document.querySelector(".rf-swatch-btn.active");
    if (initialColorBtn) {
      activeColor = initialColorBtn.getAttribute("data-color-name") || "";
    }

    function updateWaMessage() {
      if (!waBtn) return;
      var pageTitle = document.querySelector("h1") ? document.querySelector("h1").innerText.trim() : "Malzeme / Hizmet";
      var msg = "Merhaba " + pageTitle + " siparişi / keşfi hakkında bilgi almak istiyorum.\n";
      if (activeSize) msg += "Seçilen Boyut / Kapsam: " + activeSize + "\n";
      if (activeColor) msg += "Seçilen Renk / Standart: " + activeColor + "\n";
      msg += "Balçova depodan stok, keşif ve güncel fiyat bilgisi alabilir miyim?";
      waBtn.href = "https://wa.me/902322784340?text=" + encodeURIComponent(msg);
    }

    document.querySelectorAll(".rf-size-pill").forEach(function(pill) {
      pill.addEventListener("click", function(e) {
        e.preventDefault();
        var parentGroup = pill.closest(".rf-config-group");
        if (parentGroup) {
          parentGroup.querySelectorAll(".rf-size-pill").forEach(function(p) { p.classList.remove("active"); });
        }
        pill.classList.add("active");
        activeSize = pill.getAttribute("data-size") || pill.innerText.trim();
        var labelTarget = document.getElementById("rfSelectedSizeLabel");
        if (labelTarget) labelTarget.innerText = activeSize;
        updateWaMessage();
      });
    });

    // Color Swatch Selection
    document.querySelectorAll(".rf-swatch-btn").forEach(function(swatch) {
      swatch.addEventListener("click", function(e) {
        e.preventDefault();
        var parentGroup = swatch.closest(".rf-config-group");
        if (parentGroup) {
          parentGroup.querySelectorAll(".rf-swatch-btn").forEach(function(s) { s.classList.remove("active"); });
        }
        swatch.classList.add("active");
        var cName = swatch.getAttribute("data-color-name") || "";
        var cCode = swatch.getAttribute("data-color-code") || "";
        activeColor = cCode ? cName + " (" + cCode + ")" : cName;
        var labelTarget = document.getElementById("rfSelectedColorLabel");
        if (labelTarget) labelTarget.innerText = activeColor;
        updateWaMessage();
      });
    });


    // 6. Interactive Before & After Transformation Slider
    document.querySelectorAll(".rf-compare-box").forEach(function(box) {
      var range = box.querySelector(".rf-compare-range");
      var beforeDiv = box.querySelector(".rf-compare-before");
      var handle = box.querySelector(".rf-compare-handle");
      var beforeImg = beforeDiv ? beforeDiv.querySelector("img") : null;

      function updateSlider(val) {
        if (!beforeDiv || !handle) return;
        beforeDiv.style.width = val + "%";
        handle.style.left = val + "%";
        if (beforeImg) {
          // Keep inner image full width so it reveals correctly
          beforeImg.style.width = box.offsetWidth + "px";
        }
      }

      if (range) {
        range.addEventListener("input", function(e) {
          updateSlider(e.target.value);
        });
        range.addEventListener("change", function(e) {
          updateSlider(e.target.value);
        });
      }

      window.addEventListener("resize", function() {
        if (range) updateSlider(range.value);
      });

      // Initial alignment
      setTimeout(function() {
        if (range) updateSlider(range.value);
      }, 100);
    });

    // 7. Interactive Filli Boya Paint Estimator
    var calcBtns = document.querySelectorAll(".rf-calc-btn");
    var resWall = document.getElementById("rfResWall");
    var resCeil = document.getElementById("rfResCeil");
    var resPrimer = document.getElementById("rfResPrimer");
    var resTools = document.getElementById("rfResTools");
    var calcWaBtn = document.getElementById("rfCalcWaBtn");

    var calcData = {
      "1plus1": {
        name: "1+1 Daire (50 - 70 m²)",
        wall: "7.5 Litre (1 Kova)",
        ceil: "3.5 Litre Tavan Boyası",
        primer: "5 Litre Silikonlu Astar",
        tools: "1 Saten Rulo + 2 Maskeleme Bandı + 1 Koruma Örtüsü"
      },
      "2plus1": {
        name: "2+1 Daire (80 - 100 m²)",
        wall: "15 Litre (1 Büyük Kova)",
        ceil: "7.5 Litre Tavan Boyası",
        primer: "10 Litre Silikonlu Astar",
        tools: "2 Saten Rulo + 3 Maskeleme Bandı + 2 Koruma Örtüsü"
      },
      "3plus1": {
        name: "3+1 Daire (110 - 140 m²)",
        wall: "15 L + 2.5 L (2 Kova)",
        ceil: "10 Litre Tavan Boyası",
        primer: "15 Litre Silikonlu Astar",
        tools: "2 Saten Rulo + 1 Kestirme + 4 Bant + 3 Örtü"
      },
      "villa": {
        name: "Villa / Geniş Alan (180+ m²)",
        wall: "15 L x 2 Kova (30 Litre)",
        ceil: "15 Litre Tavan Boyası",
        primer: "20 Litre Silikonlu Astar",
        tools: "3 Saten Rulo + 2 Kestirme + 6 Bant + 4 Örtü"
      }
    };

    var currentCalcKey = "2plus1";

    function updateCalcOutput(key) {
      var d = calcData[key];
      if (!d) return;
      if (resWall) resWall.innerText = d.wall;
      if (resCeil) resCeil.innerText = d.ceil;
      if (resPrimer) resPrimer.innerText = d.primer;
      if (resTools) resTools.innerText = d.tools;
      if (calcWaBtn) {
        var msg = "Merhaba Pervan Yapı Filli Boya hesaplama reçetesi siparişi vermek istiyorum:\n" +
                  "Alan Tipi: " + d.name + "\n" +
                  "İç Cephe Boyası: " + d.wall + "\n" +
                  "Tavan Boyası: " + d.ceil + "\n" +
                  "Astar İhtiyacı: " + d.primer + "\n" +
                  "Sarf Malzemeler: " + d.tools + "\n" +
                  "Balçova mağazanızdan güncel paket fiyatı ve stok öğrenebilir miyim?";
        calcWaBtn.href = "https://wa.me/902322784340?text=" + encodeURIComponent(msg);
      }
    }

    calcBtns.forEach(function(btn) {
      btn.addEventListener("click", function() {
        calcBtns.forEach(function(b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var key = btn.getAttribute("data-calc-key");
        updateCalcOutput(key);
      });
    });
  });
})();
