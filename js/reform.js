/* ==========================================================================
   REFORM CPH (reformcph.com) 1:1 CLONE — MASTER JAVASCRIPT
   Mobile-First Drawer · Accordions · Modal · WhatsApp Routing
   ========================================================================== */

(function() {
  "use strict";

  document.addEventListener("DOMContentLoaded", function() {
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

    if (rfMobileClose) {
      rfMobileClose.addEventListener("click", closeMobileMenu);
    }

    // Close when clicking any direct link inside mobile menu
    if (rfMobileMenu) {
      rfMobileMenu.querySelectorAll("a").forEach(function(link) {
        link.addEventListener("click", function() {
          closeMobileMenu();
        });
      });
    }

    // 2. Mobile Accordion Toggles
    var accordionBtns = document.querySelectorAll(".rf-mob-accordion-btn");
    accordionBtns.forEach(function(btn) {
      btn.addEventListener("click", function(e) {
        e.preventDefault();
        var item = btn.closest(".rf-mob-item");
        if (item) {
          item.classList.toggle("open");
        }
      });
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
  });
})();
