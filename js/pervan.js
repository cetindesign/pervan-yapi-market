/* ==========================================================================
   PERVAN ARCHITECTURAL DESIGN SYSTEM — MASTER JAVASCRIPT
   Mobile-First Drawer · Accordions · Modal · WhatsApp Routing · Configurator
   ========================================================================== */

(function() {
  "use strict";

  function initPervan() {

    // REFORM CPH EXACT HEADER & MOBILE DRAWER TOGGLE
    var headerEl = document.querySelector("header") || document.getElementById("pvHeader");
    var mobileBtn = document.getElementById("mobile-menu");
    var navbarContents = document.querySelector(".navbar-contents");
    if (mobileBtn && navbarContents) {
      mobileBtn.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        var isClosed = mobileBtn.classList.contains("closed");
        if (isClosed) {
          mobileBtn.classList.remove("closed");
          navbarContents.classList.add("opened");
          if (headerEl) {
            headerEl.classList.remove("header--hidden");
            headerEl.classList.add("header--menu-open");
          }
          document.body.style.overflow = "hidden";
        } else {
          mobileBtn.classList.add("closed");
          navbarContents.classList.remove("opened");
          if (headerEl) {
            headerEl.classList.remove("header--menu-open");
          }
          document.body.style.overflow = "";
        }
      });
    }

    // PERVAN ACCORDION TOGGLE ON MOBILE
    document.querySelectorAll(".navbar-menu .menu-item").forEach(function(item) {
      item.addEventListener("click", function(e) {
        if (window.innerWidth <= 1259) {
          // Allow clicks on links inside dropdown to navigate
          if (e.target.closest(".navbar-dropdown a") || e.target.tagName === "A") {
            return;
          }
          e.preventDefault();
          e.stopPropagation();
          item.classList.toggle("is-open");
        }
      });
    });

    // Close mobile drawer when clicking any link
    if (navbarContents) {
      navbarContents.querySelectorAll("a").forEach(function(link) {
        link.addEventListener("click", function() {
          if (mobileBtn) {
            mobileBtn.classList.add("closed");
          }
          navbarContents.classList.remove("opened");
          if (headerEl) {
            headerEl.classList.remove("header--menu-open");
          }
          document.body.style.overflow = "";
        });
      });
    }

    // PERVAN SMART SCROLL-DIRECTION HEADER (HEADROOM PATTERN)
    if (headerEl) {
      var lastScrollY = window.pageYOffset || window.scrollY || document.documentElement.scrollTop || 0;
      var accumulatedDelta = 0;
      var isTicking = false;
      var minDownThreshold = 15; // Requires 15px accumulated downward scroll to hide
      var minUpThreshold = -2;    // Requires just 2px upward scroll to IMMEDIATELY reveal!
      var topSafeZone = 60;      // Always visible when within top 60px of page

      function onScrollUpdate() {
        var currentScrollY = window.pageYOffset || window.scrollY || document.documentElement.scrollTop || 0;
        var maxScrollY = (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight;
        var delta = currentScrollY - lastScrollY;

        // Never hide while mobile menu drawer is open
        var isDrawerOpened = navbarContents && navbarContents.classList.contains("opened");
        if (isDrawerOpened) {
          headerEl.classList.remove("header--hidden");
          lastScrollY = currentScrollY;
          accumulatedDelta = 0;
          isTicking = false;
          return;
        }

        // Always show near the very top of the page
        if (currentScrollY <= topSafeZone) {
          headerEl.classList.remove("header--hidden");
          accumulatedDelta = 0;
        } else {
          if (delta > 0) {
            // Scrolling DOWN (ignore if rubber-banding past bottom)
            if (maxScrollY > 0 && currentScrollY >= maxScrollY - 5) {
              // Ignore bounce past bottom
            } else {
              if (accumulatedDelta < 0) {
                accumulatedDelta = 0;
              }
              accumulatedDelta += delta;

              if (accumulatedDelta >= minDownThreshold) {
                headerEl.classList.add("header--hidden");
              }
            }
          } else if (delta < 0) {
            // Scrolling UP: single tick / gentle flick immediately reveals
            if (accumulatedDelta > 0) {
              accumulatedDelta = 0;
            }
            accumulatedDelta += delta;

            if (accumulatedDelta <= minUpThreshold) {
              headerEl.classList.remove("header--hidden");
            }
          }
        }

        lastScrollY = currentScrollY;
        isTicking = false;
      }

      window.addEventListener("scroll", function() {
        if (!isTicking) {
          window.requestAnimationFrame(onScrollUpdate);
          isTicking = true;
        }
      }, { passive: true });
    }

    // PERVAN BACKGROUND AUTOPLAY VIDEO HELPER
    document.querySelectorAll("video.responsive-video").forEach(function(vid) {
      vid.muted = true;
      vid.setAttribute("muted", "");
      vid.setAttribute("playsinline", "");
      vid.setAttribute("webkit-playsinline", "");
      var promise = vid.play();
      if (promise !== undefined) {
        promise.catch(function() {
          // Low Power Mode or autoplay restriction: fallback poster stays visible
        });
      }
    });

    // 1. Mobile Consultation / Overlay Menu (Legacy compat)
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

  /* ==========================================================================
     PERVAN BOTTOM SHEET / DRAWER CORE PRIMITIVE CONTROLLER
     Native-Quality Touch Gestures, Momentum Dismiss, Safe-Area & A11y Lock
     ========================================================================== */
  var PervanSheet = (function() {
    var activeBackdrop = null;
    var lastFocusedElement = null;
    var savedScrollY = 0;

    function lockScroll() {
      if (document.body.classList.contains("pv-sheet-locked")) return;
      savedScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      document.documentElement.classList.add("pv-sheet-locked");
      document.body.classList.add("pv-sheet-locked");
    }

    function unlockScroll() {
      document.documentElement.classList.remove("pv-sheet-locked");
      document.body.classList.remove("pv-sheet-locked");
    }

    function resolveElements(target) {
      if (!target) return null;
      var backdrop = typeof target === "string" ? document.querySelector(target) : target;
      if (!backdrop) return null;

      var dialog = backdrop.querySelector(".pv-sheet-dialog, .pv-drawer-sheet, .pv-location-sheet, [role='dialog']");
      var handleZone = backdrop.querySelector(".pv-sheet-handle-zone, .pv-drawer-handle-zone, .pv-drawer-handle-bar, .pv-location-handle-zone");
      var contentArea = backdrop.querySelector(".pv-sheet-content, .pv-drawer-list, .pv-location-grid");

      return {
        backdrop: backdrop,
        dialog: dialog || backdrop.firstElementChild,
        handleZone: handleZone,
        contentArea: contentArea
      };
    }

    function open(target, options) {
      var elements = resolveElements(target);
      if (!elements || !elements.backdrop) return;

      var backdrop = elements.backdrop;
      var dialog = elements.dialog;

      // Close any previously open sheet
      if (activeBackdrop && activeBackdrop !== backdrop) {
        close(activeBackdrop);
      }

      lastFocusedElement = document.activeElement;
      activeBackdrop = backdrop;

      lockScroll();

      backdrop.classList.add("is-open");
      backdrop.setAttribute("aria-hidden", "false");

      if (dialog) {
        dialog.style.transform = "";
        bindGestures(backdrop, dialog, elements.handleZone, elements.contentArea);
        // Focus close button or container
        var closeBtn = backdrop.querySelector(".pv-sheet-close, .pv-drawer-close, .pv-drawer-close-btn, .pv-location-close, [data-sheet-close]");
        if (closeBtn) {
          setTimeout(function() {
            try { closeBtn.focus(); } catch (e) {}
          }, 50);
        }
      }

      if (options && typeof options.onOpen === "function") {
        options.onOpen(backdrop);
      }

      var event = new CustomEvent("pv:sheet:open", { bubbles: true, detail: { backdrop: backdrop, dialog: dialog } });
      backdrop.dispatchEvent(event);
    }

    function close(target, options) {
      var elements = resolveElements(target || activeBackdrop);
      if (!elements || !elements.backdrop) return;

      var backdrop = elements.backdrop;
      var dialog = elements.dialog;

      backdrop.classList.remove("is-open");
      backdrop.setAttribute("aria-hidden", "true");

      if (dialog) {
        dialog.style.transform = "";
        dialog.classList.remove("is-dragging");
      }

      // Check if any other sheet is open
      var remainingOpen = document.querySelectorAll(".pv-sheet-backdrop.is-open, .pv-drawer-backdrop.is-open, .pv-location-backdrop.is-open");
      if (!remainingOpen.length) {
        unlockScroll();
        activeBackdrop = null;
      } else {
        activeBackdrop = remainingOpen[remainingOpen.length - 1];
      }

      if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        try { lastFocusedElement.focus(); } catch (e) {}
      }

      if (options && typeof options.onClose === "function") {
        options.onClose(backdrop);
      }

      var event = new CustomEvent("pv:sheet:close", { bubbles: true, detail: { backdrop: backdrop, dialog: dialog } });
      backdrop.dispatchEvent(event);
    }

    function toggle(target, options) {
      var elements = resolveElements(target);
      if (!elements || !elements.backdrop) return;
      if (elements.backdrop.classList.contains("is-open")) {
        close(elements.backdrop, options);
      } else {
        open(elements.backdrop, options);
      }
    }

    function bindGestures(backdrop, dialog, handleZone, contentArea) {
      if (!dialog || dialog._pvGestureBound) return;
      dialog._pvGestureBound = true;

      var startY = 0;
      var currentY = 0;
      var startTime = 0;
      var isDragging = false;
      var isHandleTouch = false;
      var sheetHeight = 0;

      function onTouchStart(e) {
        var touch = e.touches ? e.touches[0] : e;
        var target = e.target;

        isHandleTouch = handleZone && (handleZone === target || handleZone.contains(target));
        var isAtTop = !contentArea || contentArea.scrollTop <= 0;

        // Start dragging only if touching handle or if at top of scrollable content
        if (!isHandleTouch && !isAtTop) return;

        startY = touch.clientY;
        currentY = startY;
        startTime = Date.now();
        sheetHeight = dialog.offsetHeight || window.innerHeight * 0.8;
        isDragging = true;
      }

      function onTouchMove(e) {
        if (!isDragging) return;
        var touch = e.touches ? e.touches[0] : e;
        currentY = touch.clientY;
        var deltaY = currentY - startY;

        // If user is trying to scroll up content when not touching handle, let native scroll happen
        if (deltaY < 0 && !isHandleTouch) {
          return;
        }

        if (deltaY > 0) {
          // Dragging down: 1:1 hardware translation
          if (e.cancelable) e.preventDefault();
          dialog.classList.add("is-dragging");
          dialog.style.transform = "translateY(" + deltaY + "px)";
          var progress = Math.max(0.2, 1 - (deltaY / (sheetHeight * 1.2)));
          backdrop.style.opacity = progress;
        } else if (deltaY < 0 && isHandleTouch) {
          // Pulling up on handle bar: rubber band dampening
          if (e.cancelable) e.preventDefault();
          dialog.classList.add("is-dragging");
          dialog.style.transform = "translateY(" + (deltaY * 0.15) + "px)";
        }
      }

      function onTouchEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        dialog.classList.remove("is-dragging");
        dialog.style.transform = "";
        backdrop.style.opacity = "";

        var deltaY = currentY - startY;
        var elapsed = Math.max(1, Date.now() - startTime);
        var velocity = deltaY / elapsed;

        // Dismiss threshold: dragged > 90px OR quick downward flick (> 0.35px/ms)
        if (deltaY > 90 || (deltaY > 30 && velocity > 0.35)) {
          close(backdrop);
        }
      }

      // Touch events
      dialog.addEventListener("touchstart", onTouchStart, { passive: true });
      window.addEventListener("touchmove", onTouchMove, { passive: false });
      window.addEventListener("touchend", onTouchEnd, { passive: true });
      window.addEventListener("touchcancel", onTouchEnd, { passive: true });

      // Pointer / Mouse drag support for handle bar
      if (handleZone) {
        handleZone.addEventListener("pointerdown", function(e) {
          onTouchStart(e);
          function onPointerMove(pe) {
            onTouchMove(pe);
          }
          function onPointerUp(pe) {
            onTouchEnd(pe);
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerup", onPointerUp);
          }
          window.addEventListener("pointermove", onPointerMove, { passive: false });
          window.addEventListener("pointerup", onPointerUp, { passive: true });
        });
      }
    }

    function init(context) {
      var root = context || document;

      // 1. Data-sheet-target triggers
      root.querySelectorAll("[data-sheet-target]").forEach(function(trigger) {
        if (trigger._pvSheetBound) return;
        trigger._pvSheetBound = true;
        trigger.addEventListener("click", function(e) {
          e.preventDefault();
          var targetSel = trigger.getAttribute("data-sheet-target");
          if (targetSel) open(targetSel);
        });
      });

      // 2. Close buttons & Backdrop clicks
      root.querySelectorAll(".pv-sheet-backdrop, .pv-drawer-backdrop, .pv-location-backdrop").forEach(function(backdrop) {
        if (backdrop._pvSheetInit) return;
        backdrop._pvSheetInit = true;

        // Backdrop click to close
        backdrop.addEventListener("click", function(e) {
          if (e.target === backdrop) {
            close(backdrop);
          }
        });

        // Close button click
        backdrop.querySelectorAll(".pv-sheet-close, .pv-drawer-close, .pv-drawer-close-btn, .pv-location-close, [data-sheet-close]").forEach(function(closeBtn) {
          closeBtn.addEventListener("click", function(e) {
            e.preventDefault();
            close(backdrop);
          });
        });

        // Pre-bind gestures
        var dialog = backdrop.querySelector(".pv-sheet-dialog, .pv-drawer-sheet, .pv-location-sheet, [role='dialog']");
        var handleZone = backdrop.querySelector(".pv-sheet-handle-zone, .pv-drawer-handle-zone, .pv-drawer-handle-bar, .pv-location-handle-zone");
        var contentArea = backdrop.querySelector(".pv-sheet-content, .pv-drawer-list, .pv-location-grid");
        if (dialog) {
          bindGestures(backdrop, dialog, handleZone, contentArea);
        }
      });
    }

    // Global Escape Key Listener
    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape" || e.keyCode === 27) {
        if (activeBackdrop) {
          close(activeBackdrop);
        }
      }
    });

    return {
      open: open,
      close: close,
      toggle: toggle,
      init: init,
      bindGestures: bindGestures
    };
  })();

  // Export to global window
  window.PervanSheet = PervanSheet;

  PervanSheet.init();

  // 3.1. Location Navigation Modal / Bottom Sheet Logic
    window.openLocationSheet = function() {
      if (typeof closeMobileMenu === "function") {
        closeMobileMenu();
      }
      PervanSheet.open("#pvLocationModal");
    };

    window.closeLocationSheet = function() {
      PervanSheet.close("#pvLocationModal");
    };

    document.querySelectorAll(".pv-location-trigger, #openLocationSheetBtn").forEach(function(btn) {
      btn.addEventListener("click", function(e) {
        e.preventDefault();
        window.openLocationSheet();
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

        var waUrl = "https://wa.me/905323844497?text=" + encodeURIComponent(message);
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
      waBtn.href = "https://wa.me/905323844497?text=" + encodeURIComponent(msg);
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

      var resizeTimer;
      window.addEventListener("resize", function() {
        if (!resizeTimer) {
          resizeTimer = requestAnimationFrame(function() {
            if (range) updateSlider(range.value);
            resizeTimer = null;
          });
        }
      }, { passive: true });

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
        var msg = "Merhaba Pervan Yapı Filli Boya malzeme listesi için sipariş ve fiyat bilgisi almak istiyorum:\n" +
                  "Alan Tipi: " + d.name + "\n" +
                  "İç Cephe Boyası: " + d.wall + "\n" +
                  "Tavan Boyası: " + d.ceil + "\n" +
                  "Astar İhtiyacı: " + d.primer + "\n" +
                  "Sarf Malzemeler: " + d.tools + "\n" +
                  "Balçova mağazanızdan güncel paket fiyatı ve stok öğrenebilir miyim?";
        calcWaBtn.href = "https://wa.me/905323844497?text=" + encodeURIComponent(msg);
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
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPervan);
  } else {
    initPervan();
  }
})();
