/* global window, document, Chart */
(() => {
    const COLORS = {
        green: "#16a34a",
        orange: "#f59e0b",
        red: "#e11d48",
        slate700: "#334155",
        slate500: "#64748b",
        grid: "#e2e8f0",
        line: "#0f172a",
        fill: "rgba(15, 23, 42, 0.08)",
    };

    function setDefaults() {
        Chart.defaults.animation = false;
        Chart.defaults.responsive = true;
        Chart.defaults.maintainAspectRatio = false;
        Chart.defaults.color = COLORS.slate700;
        Chart.defaults.font.family =
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji";
        Chart.defaults.plugins.legend.display = false;
        Chart.defaults.plugins.tooltip.backgroundColor = "rgba(15, 23, 42, 0.92)";
        Chart.defaults.plugins.tooltip.titleColor = "#fff";
        Chart.defaults.plugins.tooltip.bodyColor = "#fff";
        Chart.defaults.plugins.tooltip.displayColors = true;
        Chart.defaults.plugins.tooltip.padding = 10;
    }

    function gridScales(extra = {}) {
        return {
            x: {
                grid: { color: COLORS.grid },
                ticks: { color: COLORS.slate500 },
            },
            y: {
                grid: { color: COLORS.grid },
                ticks: { color: COLORS.slate500 },
                ...extra,
            },
        };
    }

    function getCanvas(id) {
        return document.getElementById(id);
    }

    function fmtPct(value) {
        return `${value}%`;
    }

    function tail(arr, n) {
        if (!Array.isArray(arr)) return [];
        return arr.slice(Math.max(0, arr.length - n));
    }

    function createOverviewCharts(data) {
        const marginEl = getCanvas("chart-overview-margin");
        if (marginEl) {
            const labels = tail(window.MOCK_DATA.months, 5);
            const rompslomp = tail(data.marginTrend?.rompslompForecastPct ?? [], 5);
            const keeping = tail(data.marginTrend?.keepingIndicativePct ?? [], 5);
            const len = Math.min(labels.length, rompslomp.length, keeping.length);
            new Chart(marginEl, {
                type: "line",
                data: {
                    labels: labels.slice(0, len),
                    datasets: [
                        {
                            label: "Rompslomp (verwachting)",
                            data: rompslomp.slice(0, len),
                            borderColor: COLORS.line,
                            backgroundColor: COLORS.fill,
                            pointRadius: 3,
                            pointBackgroundColor: COLORS.line,
                            tension: 0.35,
                            fill: true,
                        },
                        {
                            label: "Keeping (indicatief obv uren)",
                            data: keeping.slice(0, len),
                            borderColor: COLORS.orange,
                            backgroundColor: "rgba(245, 158, 11, 0.00)",
                            borderDash: [6, 6],
                            pointRadius: 3,
                            pointBackgroundColor: COLORS.orange,
                            tension: 0.35,
                            fill: false,
                        },
                    ],
                },
                options: {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: (ctx) => ` ${ctx.dataset.label}: ${fmtPct(ctx.parsed.y)}`,
                            },
                        },
                    },
                    scales: gridScales({
                        suggestedMin: 14,
                        suggestedMax: 24,
                        ticks: {
                            color: COLORS.slate500,
                            callback: (v) => fmtPct(v),
                        },
                    }),
                },
            });
        }

        const statusEl = getCanvas("chart-overview-status");
        if (statusEl) {
            const dist = data.statusDistribution;
            new Chart(statusEl, {
                type: "doughnut",
                data: {
                    labels: dist.labels,
                    datasets: [
                        {
                            data: dist.values,
                            backgroundColor: [COLORS.green, COLORS.orange, COLORS.red],
                            borderWidth: 0,
                        },
                    ],
                },
                options: {
                    cutout: "65%",
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: (ctx) => ` ${ctx.label}: ${ctx.parsed}`,
                            },
                        },
                    },
                },
            });
        }
    }

    function createMedewerkerCharts(data) {
        const inzetEl = getCanvas("chart-medewerker-inzet");
        if (inzetEl) {
            const src = data.inzetPerProjectHours;
            new Chart(inzetEl, {
                type: "bar",
                data: {
                    labels: src.labels,
                    datasets: src.datasets.map((d, idx) => {
                        const palette = ["#0f172a", "#334155", "#64748b", "#94a3b8"];
                        return {
                            label: d.label,
                            data: d.values,
                            backgroundColor: palette[idx % palette.length],
                            borderWidth: 0,
                            borderRadius: 6,
                        };
                    }),
                },
                options: {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y} uur`,
                            },
                        },
                    },
                    scales: {
                        x: { stacked: true, grid: { color: COLORS.grid }, ticks: { color: COLORS.slate500 } },
                        y: {
                            stacked: true,
                            grid: { color: COLORS.grid },
                            ticks: { color: COLORS.slate500 },
                            title: { display: true, text: "Uren", color: COLORS.slate500, font: { size: 12 } },
                        },
                    },
                },
            });
        }

        const splitEl = getCanvas("chart-medewerker-billable");
        if (splitEl) {
            new Chart(splitEl, {
                type: "doughnut",
                data: {
                    labels: data.billableSplitPct.labels,
                    datasets: [
                        {
                            data: data.billableSplitPct.values,
                            backgroundColor: [COLORS.green, COLORS.orange],
                            borderWidth: 0,
                        },
                    ],
                },
                options: {
                    cutout: "65%",
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: (ctx) => ` ${ctx.label}: ${ctx.parsed}%`,
                            },
                        },
                    },
                },
            });
        }
    }

    function createProjectCharts(data) {
        const urenEl = getCanvas("chart-project-uren");
        if (urenEl) {
            new Chart(urenEl, {
                type: "bar",
                data: {
                    labels: data.urenPerRol.labels,
                    datasets: [
                        {
                            label: "Geboekt",
                            data: data.urenPerRol.values,
                            backgroundColor: COLORS.orange,
                            borderRadius: 6,
                        },
                        {
                            label: "Budget",
                            data: data.urenPerRol.budget,
                            backgroundColor: "#cbd5e1",
                            borderRadius: 6,
                        },
                    ],
                },
                options: {
                    plugins: {
                        legend: { display: true, labels: { color: COLORS.slate500, boxWidth: 10 } },
                        tooltip: {
                            callbacks: {
                                label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y} uur`,
                            },
                        },
                    },
                    scales: gridScales({
                        beginAtZero: true,
                        ticks: { color: COLORS.slate500 },
                        title: { display: true, text: "Uren", color: COLORS.slate500, font: { size: 12 } },
                    }),
                },
            });
        }

        const keepingEl = document.getElementById("project-keeping-hours");
        const rompslompEl = document.getElementById("project-rompslomp-hours");
        const deltaEl = document.getElementById("project-hours-delta");
        if (keepingEl && rompslompEl && deltaEl) {
            const keeping = data.sourceReconciliation?.keepingBookedHours;
            const rompslomp = data.sourceReconciliation?.rompslompInvoicedHoursIndicative;
            if (Number.isFinite(keeping) && Number.isFinite(rompslomp)) {
                const delta = Math.max(0, Math.round(rompslomp - keeping));
                keepingEl.textContent = String(keeping);
                rompslompEl.textContent = String(rompslomp);
                deltaEl.textContent = String(delta);
            }
        }

        const planEl = getCanvas("chart-project-plan");
        if (planEl) {
            new Chart(planEl, {
                type: "line",
                data: {
                    labels: data.keepingVsRompslompProgress?.labels ?? [],
                    datasets: [
                        {
                            label: "Keeping (urenbudget %)",
                            data: data.keepingVsRompslompProgress?.keepingPct ?? [],
                            borderColor: COLORS.orange,
                            pointRadius: 3,
                            tension: 0.35,
                        },
                        {
                            label: "Rompslomp (facturatie %)",
                            data: data.keepingVsRompslompProgress?.rompslompPct ?? [],
                            borderColor: COLORS.line,
                            borderDash: [6, 6],
                            pointRadius: 3,
                            tension: 0.35,
                        },
                    ],
                },
                options: {
                    plugins: {
                        legend: { display: true, labels: { color: COLORS.slate500, boxWidth: 10 } },
                        tooltip: {
                            callbacks: {
                                label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y}%`,
                            },
                        },
                    },
                    scales: gridScales({
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: { color: COLORS.slate500, callback: (v) => `${v}%` },
                    }),
                },
            });
        }
    }

    function createPortfolioCharts(data) {
        const marginEl = getCanvas("chart-portfolio-margin");
        if (marginEl) {
            new Chart(marginEl, {
                type: "line",
                data: {
                    labels: window.MOCK_DATA.months,
                    datasets: [
                        {
                            label: "Marge %",
                            data: data.marginTrendPct,
                            borderColor: COLORS.line,
                            backgroundColor: COLORS.fill,
                            pointRadius: 3,
                            tension: 0.35,
                            fill: true,
                        },
                    ],
                },
                options: {
                    plugins: {
                        tooltip: { callbacks: { label: (ctx) => ` ${fmtPct(ctx.parsed.y)}` } },
                    },
                    scales: gridScales({
                        suggestedMin: 14,
                        suggestedMax: 24,
                        ticks: { color: COLORS.slate500, callback: (v) => fmtPct(v) },
                    }),
                },
            });
        }

        const mixEl = getCanvas("chart-portfolio-mix");
        if (mixEl) {
            new Chart(mixEl, {
                type: "bar",
                data: {
                    labels: data.winstVerliesMixKeur.labels,
                    datasets: [
                        {
                            label: "€ impact",
                            data: data.winstVerliesMixKeur.values,
                            backgroundColor: (ctx) => {
                                const v = ctx.parsed.y;
                                if (v < 0) return COLORS.red;
                                if (v < 80) return COLORS.orange;
                                return COLORS.green;
                            },
                            borderRadius: 6,
                        },
                    ],
                },
                options: {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: (ctx) => ` € ${Math.abs(ctx.parsed.y)}k${ctx.parsed.y < 0 ? " downside" : ""}`,
                            },
                        },
                    },
                    scales: {
                        x: { grid: { color: COLORS.grid }, ticks: { color: COLORS.slate500 } },
                        y: {
                            grid: { color: COLORS.grid },
                            ticks: { color: COLORS.slate500, callback: (v) => `€ ${v}k` },
                            title: { display: true, text: "€ (k)", color: COLORS.slate500, font: { size: 12 } },
                        },
                    },
                },
            });
        }
    }

    function createUrenCharts(data) {
        const actEl = getCanvas("chart-uren-activiteit");
        if (actEl) {
            new Chart(actEl, {
                type: "bar",
                data: {
                    labels: data.urenPerActiviteit.labels,
                    datasets: [
                        {
                            label: "Uren",
                            data: data.urenPerActiviteit.values,
                            backgroundColor: [COLORS.orange, "#0f172a", "#64748b", "#334155", COLORS.red],
                            borderRadius: 6,
                        },
                    ],
                },
                options: {
                    scales: gridScales({
                        ticks: { color: COLORS.slate500 },
                        title: { display: true, text: "Uren", color: COLORS.slate500, font: { size: 12 } },
                    }),
                    plugins: {
                        tooltip: { callbacks: { label: (ctx) => ` ${ctx.parsed.y} uur` } },
                    },
                },
            });
        }

        const rolEl = getCanvas("chart-uren-rol");
        if (rolEl) {
            new Chart(rolEl, {
                type: "bar",
                data: {
                    labels: data.verdelingPerRol.labels,
                    datasets: [
                        {
                            label: "Uren",
                            data: data.verdelingPerRol.values,
                            backgroundColor: "#0f172a",
                            borderRadius: 6,
                        },
                    ],
                },
                options: {
                    scales: gridScales({
                        ticks: { color: COLORS.slate500 },
                        title: { display: true, text: "Uren", color: COLORS.slate500, font: { size: 12 } },
                    }),
                    plugins: {
                        tooltip: { callbacks: { label: (ctx) => ` ${ctx.parsed.y} uur` } },
                    },
                },
            });
        }
    }

    function createProjectFinCharts(data) {
        const margeEl = getCanvas("chart-projectfin-marge");
        if (margeEl) {
            const target = Array(window.MOCK_DATA.months.length).fill(data.doelMargePct);
            new Chart(margeEl, {
                type: "line",
                data: {
                    labels: window.MOCK_DATA.months,
                    datasets: [
                        {
                            label: "Marge %",
                            data: data.margeOntwikkelingPct,
                            borderColor: COLORS.red,
                            backgroundColor: "rgba(225, 29, 72, 0.08)",
                            pointRadius: 3,
                            tension: 0.35,
                            fill: true,
                        },
                        {
                            label: "Doel",
                            data: target,
                            borderColor: COLORS.green,
                            borderDash: [6, 6],
                            pointRadius: 0,
                            tension: 0,
                        },
                    ],
                },
                options: {
                    plugins: {
                        legend: { display: true, labels: { color: COLORS.slate500, boxWidth: 10 } },
                        tooltip: { callbacks: { label: (ctx) => ` ${fmtPct(ctx.parsed.y)}` } },
                    },
                    scales: gridScales({
                        suggestedMin: 12,
                        suggestedMax: 24,
                        ticks: { color: COLORS.slate500, callback: (v) => fmtPct(v) },
                    }),
                },
            });
        }
    }

    function init() {
        if (!window.Chart || !window.MOCK_DATA) return;
        setDefaults();

        const key = document.body?.dataset?.dashboard;
        if (!key) return;

        if (key === "overview") createOverviewCharts(window.MOCK_DATA.overview);
        if (key === "medewerker") createMedewerkerCharts(window.MOCK_DATA.medewerker);
        if (key === "project") createProjectCharts(window.MOCK_DATA.project);
        if (key === "portfolio") createPortfolioCharts(window.MOCK_DATA.portfolio);
        if (key === "uren") createUrenCharts(window.MOCK_DATA.uren);
        if (key === "project-fin") createProjectFinCharts(window.MOCK_DATA.projectFin);
    }

    document.addEventListener("DOMContentLoaded", init);
})();
