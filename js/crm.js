/* global window, document */
(() => {
    function getParam(name) {
        const url = new URL(window.location.href);
        return url.searchParams.get(name);
    }

    function normalize(value) {
        return String(value ?? "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "");
    }

    function el(id) {
        return document.getElementById(id);
    }

    function escapeHtml(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    function badgeForStatus(status) {
        const s = String(status || "").toLowerCase();
        if (s === "actief") return { label: "Actief", cls: "bg-emerald-50 text-emerald-700 ring-emerald-200" };
        if (s === "risico") return { label: "Risico", cls: "bg-rose-50 text-rose-700 ring-rose-200" };
        if (s === "afgerond") return { label: "Afgerond", cls: "bg-slate-50 text-slate-700 ring-slate-200" };
        return { label: status || "—", cls: "bg-slate-50 text-slate-700 ring-slate-200" };
    }

    function projectRowHtml(project) {
        const b = badgeForStatus(project.status);
        return `
      <tr class="hover:bg-slate-50/60">
        <td class="px-4 py-3 font-medium">
          <a class="underline-offset-4 hover:underline" href="${escapeHtml(project.link)}">${escapeHtml(project.name)}</a>
          <div class="text-xs text-slate-500 mt-0.5">Owner: ${escapeHtml(project.owner || "—")}</div>
        </td>
        <td class="px-4 py-3">
          <span class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${b.cls}">${escapeHtml(b.label)}</span>
        </td>
        <td class="px-4 py-3 text-right text-slate-600">${escapeHtml(project.start || "—")}</td>
      </tr>`;
    }

    function renderCustomersPage() {
        const crm = window.MOCK_DATA?.crm;
        if (!crm) return;

        const customers = crm.customers ?? [];
        const projects = crm.projects ?? [];

        const searchInput = el("customer-search");
        const onlyActiveToggle = el("customer-only-active");
        const tbody = el("customer-table-body");
        const countEl = el("customer-count");

        function customerHasOpenProjects(customerId) {
            return projects.some(
                (p) => p.customerId === customerId && (p.status === "actief" || p.status === "risico")
            );
        }

        function openProjectsCount(customerId) {
            return projects.filter(
                (p) => p.customerId === customerId && (p.status === "actief" || p.status === "risico")
            ).length;
        }

        function render() {
            const q = normalize(searchInput?.value);
            const onlyOpen = Boolean(onlyActiveToggle?.checked);

            const filtered = customers.filter((c) => {
                const hay = normalize(`${c.name} ${c.segment} ${c.city} ${c.contactName} ${c.contactEmail}`);
                if (q && !hay.includes(q)) return false;
                if (onlyOpen && !customerHasOpenProjects(c.id)) return false;
                return true;
            });

            if (countEl) countEl.textContent = String(filtered.length);

            if (!tbody) return;
            tbody.innerHTML = filtered
                .map((c) => {
                    const openCount = openProjectsCount(c.id);
                    return `
          <tr class="hover:bg-slate-50/60">
            <td class="px-4 py-3 font-medium">
              <a class="underline-offset-4 hover:underline" href="klant.html?id=${encodeURIComponent(
                        c.id
                    )}">${escapeHtml(c.name)}</a>
              <div class="text-xs text-slate-500 mt-0.5">${escapeHtml(c.segment)} • ${escapeHtml(
                        c.city
                    )}</div>
            </td>
            <td class="px-4 py-3 text-slate-600">${escapeHtml(c.contactName || "—")}</td>
            <td class="px-4 py-3 text-slate-600">${escapeHtml(c.contactEmail || "—")}</td>
            <td class="px-4 py-3 text-right">
              <span class="text-sm font-semibold">${openCount}</span>
              <span class="text-xs text-slate-500">lopend</span>
            </td>
          </tr>`;
                })
                .join("");
        }

        if (searchInput) searchInput.addEventListener("input", render);
        if (onlyActiveToggle) onlyActiveToggle.addEventListener("change", render);
        render();
    }

    function renderCustomerDetailPage() {
        const crm = window.MOCK_DATA?.crm;
        if (!crm) return;

        const id = getParam("id");
        if (!id) return;

        const customer = (crm.customers ?? []).find((c) => c.id === id);
        if (!customer) return;

        const projects = (crm.projects ?? []).filter((p) => p.customerId === id);

        const nameEl = el("customer-name");
        const metaEl = el("customer-meta");
        const contactEl = el("customer-contact");
        const tbody = el("customer-projects-body");
        const toggleBtn = el("customer-toggle-open");
        const countEl = el("customer-project-count");

        if (nameEl) nameEl.textContent = customer.name;
        if (metaEl) metaEl.textContent = `${customer.segment} • ${customer.city}`;
        if (contactEl)
            contactEl.textContent = `${customer.contactName || "—"} • ${customer.contactEmail || "—"}`;

        let showOnlyOpen = false;

        function isOpen(p) {
            return p.status === "actief" || p.status === "risico";
        }

        function render() {
            const visible = showOnlyOpen ? projects.filter(isOpen) : projects;
            if (countEl) countEl.textContent = String(visible.length);
            if (!tbody) return;
            tbody.innerHTML = visible.map(projectRowHtml).join("");

            if (toggleBtn) {
                toggleBtn.textContent = showOnlyOpen
                    ? "Toon alle projecten"
                    : "Toon lopende projecten";
            }
        }

        if (toggleBtn) {
            toggleBtn.addEventListener("click", () => {
                showOnlyOpen = !showOnlyOpen;
                render();
            });
        }

        render();
    }

    function init() {
        const page = document.body?.dataset?.page;
        if (page === "customers") renderCustomersPage();
        if (page === "customer") renderCustomerDetailPage();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
