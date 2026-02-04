/* global window, document */
(() => {
    function samePath(a, b) {
        const strip = (p) => String(p || "").replace(/\/+$/, "");
        return strip(a) === strip(b);
    }

    function init() {
        const nav = document.querySelector(".ds-topnav");
        if (!nav) return;

        const currentPath = window.location.pathname;
        const links = Array.from(nav.querySelectorAll("a[href]"));

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

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
