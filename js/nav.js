/* global window, document */
(() => {
    function samePath(a, b) {
        const strip = (p) => String(p || "").replace(/\/+$/, "");
        return strip(a) === strip(b);
    }

    function markActiveLinks(root) {
        const currentPath = window.location.pathname;
        const links = Array.from(root.querySelectorAll("a.ds-nav-link[href]"));

        for (const link of links) {
            const href = link.getAttribute("href");
            if (!href || href.startsWith("#")) continue;

            let resolved;
            try {
                resolved = new URL(href, window.location.href);
            } catch {
                continue;
            }

            if (samePath(resolved.pathname, currentPath)) {
                link.setAttribute("aria-current", "page");
                link.classList.add("ds-nav-active");
            } else {
                link.removeAttribute("aria-current");
                link.classList.remove("ds-nav-active");
            }
        }
    }

    function createMobileMenu(header) {
        const desktopNav = header.querySelector("nav.ds-topnav");
        if (!desktopNav) return;

        if (header.querySelector(".ds-mobile-toggle") || document.querySelector(".ds-mobile-panel")) return;

        const toggleButton = document.createElement("button");
        toggleButton.type = "button";
        toggleButton.className =
            "md:hidden ds-mobile-toggle inline-flex items-center justify-center rounded-xl ring-1 ring-slate-200 px-3 py-2 text-sm bg-white/70 hover:bg-white";
        toggleButton.setAttribute("aria-expanded", "false");
        toggleButton.setAttribute("aria-label", "Menu");

        const toggleLabel = document.createElement("span");
        toggleLabel.textContent = "Menu";

        const toggleIcon = document.createElement("span");
        toggleIcon.className = "ml-2";
        toggleIcon.setAttribute("aria-hidden", "true");
        toggleIcon.textContent = "☰";

        toggleButton.appendChild(toggleLabel);
        toggleButton.appendChild(toggleIcon);

        // Insert the button right before the desktop nav.
        desktopNav.parentNode.insertBefore(toggleButton, desktopNav);

        const backdrop = document.createElement("div");
        backdrop.className = "md:hidden ds-mobile-backdrop";
        backdrop.setAttribute("aria-hidden", "true");

        const panel = document.createElement("div");
        panel.className = "md:hidden ds-mobile-panel";
        panel.setAttribute("role", "dialog");
        panel.setAttribute("aria-modal", "true");
        panel.setAttribute("aria-label", "Menu");

        const panelInner = document.createElement("div");
        panelInner.className = "px-4 py-4";

        const panelHeader = document.createElement("div");
        panelHeader.className = "flex items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-200";

        const panelTitle = document.createElement("div");
        panelTitle.className = "text-xs font-semibold text-slate-500 uppercase tracking-wide";
        panelTitle.textContent = "Menu";

        const closeBtn = document.createElement("button");
        closeBtn.type = "button";
        closeBtn.className = "inline-flex items-center justify-center rounded-xl ring-1 ring-slate-200 px-3 py-2 text-sm bg-white/70 hover:bg-white";
        closeBtn.setAttribute("aria-label", "Sluit menu");
        closeBtn.textContent = "✕";

        panelHeader.appendChild(panelTitle);
        panelHeader.appendChild(closeBtn);

        const mobileNav = document.createElement("nav");
        mobileNav.className = "ds-topnav ds-mobile-nav flex flex-col gap-1 text-sm";
        mobileNav.setAttribute("aria-label", "Hoofdnavigatie");

        let lastWasDivider = false;
        for (const node of Array.from(desktopNav.childNodes)) {
            if (node.nodeType !== Node.ELEMENT_NODE) continue;
            const element = /** @type {HTMLElement} */ (node);

            if (element.tagName.toLowerCase() === "a") {
                const a = /** @type {HTMLAnchorElement} */ (element.cloneNode(true));
                a.className = "ds-nav-link px-3 py-2 rounded-xl";
                mobileNav.appendChild(a);
                lastWasDivider = false;
                continue;
            }

            if (element.classList.contains("ds-nav-divider")) {
                if (!lastWasDivider) {
                    const hr = document.createElement("div");
                    hr.className = "my-2 h-px bg-slate-200";
                    hr.setAttribute("aria-hidden", "true");
                    mobileNav.appendChild(hr);
                    lastWasDivider = true;
                }
            }
        }

        panelInner.appendChild(panelHeader);
        panelInner.appendChild(mobileNav);
        panel.appendChild(panelInner);

        // Drawer + backdrop live at the end of body
        document.body.appendChild(backdrop);
        document.body.appendChild(panel);

        const setExpanded = (expanded) => {
            toggleButton.setAttribute("aria-expanded", expanded ? "true" : "false");
            panel.classList.toggle("is-open", expanded);
            backdrop.classList.toggle("is-open", expanded);
            toggleIcon.textContent = expanded ? "✕" : "☰";
            toggleButton.setAttribute("aria-label", expanded ? "Sluit menu" : "Open menu");
            document.documentElement.classList.toggle("ds-nav-lock", expanded);
        };

        const close = () => setExpanded(false);
        const open = () => setExpanded(true);

        const toggle = () => {
            const expanded = toggleButton.getAttribute("aria-expanded") === "true";
            if (expanded) close();
            else open();
        };

        toggleButton.addEventListener("click", (e) => {
            e.preventDefault();
            toggle();
        });

        closeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            close();
        });

        // Close when clicking a nav link.
        mobileNav.addEventListener("click", (e) => {
            const target = /** @type {HTMLElement} */ (e.target);
            if (target && target.closest && target.closest("a")) close();
        });

        // Close on Escape.
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") close();
        });

        // Backdrop click closes.
        backdrop.addEventListener("click", (e) => {
            e.preventDefault();
            close();
        });

        // Ensure initial state is collapsed (for CSS animation setup)
        setExpanded(false);

        // Mark active links inside the generated mobile nav too
        markActiveLinks(mobileNav);
    }

    function init() {
        const header = document.querySelector("header");
        if (header) createMobileMenu(header);
        markActiveLinks(document);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
