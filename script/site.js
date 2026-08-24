/* Shared site behaviours: theme toggle, mobile menu, carousel, scrollspy.
   No dependencies. Loaded with `defer` on every page. */
(function () {
    "use strict";

    /* ---- Dark / light toggle (boot script in <head> applies the stored
       theme before paint; this wires the button and keeps its icon in sync) */
    var themeBtn = document.getElementById("theme-toggle");

    function syncThemeButton() {
        if (!themeBtn) return;
        var dark = document.documentElement.classList.contains("dark");
        var icon = themeBtn.querySelector(".material-symbols-outlined");
        if (icon) icon.textContent = dark ? "light_mode" : "dark_mode";
        themeBtn.setAttribute("aria-label", dark ? "切換為淺色模式" : "切換為深色模式");
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", function () {
            var dark = document.documentElement.classList.toggle("dark");
            try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch (e) { /* storage unavailable */ }
            syncThemeButton();
        });
        syncThemeButton();
    }

    /* ---- Mobile menu ---- */
    var menuBtn = document.getElementById("menu-toggle");
    var mobileMenu = document.getElementById("mobile-menu");

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", function () {
            var open = mobileMenu.classList.toggle("hidden") === false;
            menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
            var icon = menuBtn.querySelector(".material-symbols-outlined");
            if (icon) icon.textContent = open ? "close" : "menu";
        });
    }

    /* ---- Carousel (photo slideshows) ----
       Markup: [data-carousel] > [data-carousel-track] > slides,
       plus [data-carousel-prev] / [data-carousel-next] buttons. */
    document.querySelectorAll("[data-carousel]").forEach(function (root) {
        var track = root.querySelector("[data-carousel-track]");
        if (!track) return;
        var slides = Array.prototype.slice.call(track.children);
        var index = 0;

        function show(i) {
            index = (i + slides.length) % slides.length;
            slides.forEach(function (slide, n) {
                slide.classList.toggle("hidden", n !== index);
            });
            var counter = root.querySelector("[data-carousel-counter]");
            if (counter) counter.textContent = (index + 1) + " / " + slides.length;
        }

        var prev = root.querySelector("[data-carousel-prev]");
        var next = root.querySelector("[data-carousel-next]");
        if (prev) prev.addEventListener("click", function () { show(index - 1); });
        if (next) next.addEventListener("click", function () { show(index + 1); });
        show(0);
    });

    /* ---- Scrollspy for tables of contents ----
       Markup: [data-toc] containing anchor links to in-page headings. */
    var toc = document.querySelector("[data-toc]");
    if (toc && "IntersectionObserver" in window) {
        var links = Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]'));
        var byId = {};
        links.forEach(function (link) {
            byId[decodeURIComponent(link.getAttribute("href")).slice(1)] = link;
        });

        var spy = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                links.forEach(function (l) { l.classList.remove("toc-active"); });
                var link = byId[entry.target.id];
                if (link) link.classList.add("toc-active");
            });
        }, { rootMargin: "-20% 0px -70% 0px" });

        Object.keys(byId).forEach(function (id) {
            var target = document.getElementById(id);
            if (target) spy.observe(target);
        });
    }
})();
