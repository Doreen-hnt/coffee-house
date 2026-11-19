const menuToggle = document.querySelector(".menu-toggle");
        const navLinks = document.querySelector(".nav-links");

        function closeMenu() {
            menuToggle.classList.remove("active");
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Открыть меню");
            document.body.classList.remove("menu-open");
        }

        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");
            menuToggle.classList.toggle("active", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
            document.body.classList.toggle("menu-open", isOpen);
        });

        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && navLinks.classList.contains("open")) {
                closeMenu();
                menuToggle.focus();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 680) {
                closeMenu();
            }
        });

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const motionElements = document.querySelectorAll(
            ".menu-heading, .menu-item, .feature-image, .feature, .contact-grid > div, footer"
        );

        if (!prefersReducedMotion && "IntersectionObserver" in window) {
            document.documentElement.classList.add("js-motion");
            motionElements.forEach((element) => element.classList.add("reveal"));

            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    entry.target.classList.toggle("is-visible", entry.isIntersecting);
                });
            }, {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            });

            motionElements.forEach((element) => revealObserver.observe(element));
        }
