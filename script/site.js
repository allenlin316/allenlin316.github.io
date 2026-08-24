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
                slide.classList.remove("slide-in");
            });
            var counter = root.querySelector("[data-carousel-counter]");
            if (counter) counter.textContent = (index + 1) + " / " + slides.length;
        }

        function goTo(i) {
            show(i);
            slides[index].classList.add("slide-in");
        }

        var prev = root.querySelector("[data-carousel-prev]");
        var next = root.querySelector("[data-carousel-next]");
        if (prev) prev.addEventListener("click", function () { goTo(index - 1); });
        if (next) next.addEventListener("click", function () { goTo(index + 1); });
        show(0);
    });

    /* ---- Entrance animations ----
       Elements are tagged here (progressive enhancement: without JS the page
       renders fully visible), then revealed by IntersectionObserver at 10%. */
    (function () {
        var supported = "IntersectionObserver" in window;

        function tag(selector, cls) {
            var tagged = [];
            document.querySelectorAll(selector).forEach(function (el) {
                el.classList.add(cls);
                tagged.push(el);
            });
            return tagged;
        }

        /* Word-by-word reveal on page-level headings (not article titles). */
        document.querySelectorAll("main h1").forEach(function (h1) {
            if (h1.closest("article")) return;
            var words = (h1.textContent || "").trim().split(/\s+/);
            h1.textContent = "";
            h1.classList.add("word-split");
            words.forEach(function (word, i) {
                var span = document.createElement("span");
                span.textContent = word;
                span.style.animationDelay = (i * 100) / 1000 + "s";
                h1.appendChild(span);
            });
        });

        if (!supported) return;

        var targets = [];

        /* Blocks: page/article headers, hero, cards, widgets, callouts,
           article section headings, collapsibles, about sections */
        targets = targets.concat(
            tag("main > header, article > header, .glass-card, main aside > div, " +
                ".insight-card, .bd-callout, .article-body > h2, details.collapse-block, " +
                "main > section > div.flex.items-center.gap-4", "anim"));

        /* Media: images and video inside articles */
        targets = targets.concat(
            tag(".article-body img, .article-body video, [data-carousel]", "anim-media"));

        /* Divider reveals on bordered headers/headings */
        tag("main > header, .article-body > h2", "anim-line");
        document.querySelectorAll("main > header.anim-line").forEach(function (el) {
            el.classList.add("line-bottom");
        });
        document.querySelectorAll(".article-body > h2.anim-line").forEach(function (el) {
            el.classList.add("line-top");
        });

        /* Card lists & timeline items: stagger 0.09s per index within parent */
        document.querySelectorAll("[data-carousel]").forEach(function (el) {
            /* carousels are media-tagged as a whole; skip inner imgs */
            el.querySelectorAll("img").forEach(function (img) {
                img.classList.remove("anim-media");
            });
        });

        var staggerParents = new Set();
        document.querySelectorAll(
            "main article.kinetic-hover, main .grid > article, .timeline-dot"
        ).forEach(function (el) {
            var item = el.classList.contains("timeline-dot") ? el.parentElement : el;
            if (item.parentElement) staggerParents.add(item.parentElement);
        });
        staggerParents.forEach(function (parent) {
            Array.prototype.forEach.call(parent.children, function (child, i) {
                child.classList.add("anim");
                child.style.setProperty("--anim-delay", (i * 0.09).toFixed(2) + "s");
                targets.push(child);
            });
        });

        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("in");
                io.unobserve(entry.target);
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -5% 0px" });

        document.querySelectorAll(".anim, .anim-media, .anim-line").forEach(function (el) {
            io.observe(el);
        });
    })();

    /* ---- Keyword filter (blog list, archive) ----
       Markup: a [data-filter] container holding [data-filter-input], any
       number of [data-filter-item] entries, optional [data-filter-group]
       wrappers that hide when all their items are filtered out, plus
       [data-filter-count] and [data-filter-empty] status elements.
       Matching is a case-insensitive AND over whitespace-separated terms
       against each item's own text, so titles, excerpts, category labels
       and dates are all searchable. */
    document.querySelectorAll("[data-filter]").forEach(function (root) {
        var input = root.querySelector("[data-filter-input]");
        if (!input) return;

        var items = Array.prototype.slice.call(root.querySelectorAll("[data-filter-item]"));
        var groups = Array.prototype.slice.call(root.querySelectorAll("[data-filter-group]"));
        var empty = root.querySelector("[data-filter-empty]");
        var count = root.querySelector("[data-filter-count]");
        var total = items.length;

        var haystacks = items.map(function (item) {
            return (item.textContent || "").toLowerCase().replace(/\s+/g, " ");
        });

        function apply() {
            var terms = input.value.toLowerCase().split(/\s+/).filter(Boolean);
            var shown = 0;

            items.forEach(function (item, i) {
                var hit = terms.every(function (t) { return haystacks[i].indexOf(t) !== -1; });
                item.classList.toggle("hidden", !hit);
                if (hit) {
                    shown++;
                    /* entrance animation may not have run for items that were
                       hidden when they scrolled past — reveal them directly */
                    item.classList.add("in");
                }
            });

            groups.forEach(function (group) {
                var visible = group.querySelectorAll("[data-filter-item]:not(.hidden)").length;
                group.classList.toggle("hidden", visible === 0);
            });

            if (empty) empty.classList.toggle("hidden", shown !== 0);
            if (count) {
                count.textContent = terms.length
                    ? shown + " / " + total + " 筆符合"
                    : "共 " + total + " 筆";
            }
        }

        input.addEventListener("input", apply);
        input.addEventListener("search", apply); /* the type=search clear button */
        apply();
    });

    /* ---- Scrollspy for tables of contents ----
       Markup: [data-toc] containing anchor links to in-page headings.
       Highlights the last heading scrolled past the sticky-nav line, so a
       section stays marked for its whole length. */
    var toc = document.querySelector("[data-toc]");
    if (toc) {
        var links = Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]'));
        var sections = links.map(function (link) {
            var id = decodeURIComponent(link.getAttribute("href")).slice(1);
            return { link: link, el: document.getElementById(id) };
        }).filter(function (s) { return s.el; });

        var MARKER = 120; /* just below the sticky navbar */
        var ticking = false;

        function updateSpy() {
            ticking = false;
            var current = null;
            sections.forEach(function (s) {
                if (s.el.getBoundingClientRect().top <= MARKER) current = s;
            });
            if (!current && sections.length) current = sections[0];
            sections.forEach(function (s) {
                s.link.classList.toggle("toc-active", s === current);
            });
        }

        window.addEventListener("scroll", function () {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(updateSpy);
        }, { passive: true });

        updateSpy();
    }
})();
