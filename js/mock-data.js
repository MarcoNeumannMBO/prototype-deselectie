/* global window */
(() => {
    // Centrale dummy data voor alle dashboards (bewust niet perfect).
    window.MOCK_DATA = {
        months: ["Sep", "Okt", "Nov", "Dec", "Jan", "Feb"],

        overview: {
            // Rompslomp = financiële verwachting (facturatie/omzet/kosten).
            // Keeping = indicatieve trend obv uren (timing/afronding/invoerdiscipline wijkt af).
            marginTrend: {
                rompslompForecastPct: [22.0, 21.0, 20.5, 19.8, 19.0, 18.2],
                keepingIndicativePct: [22.3, 21.2, 20.2, 19.4, 18.7, 18.0],
            },
            statusDistribution: {
                labels: ["OK", "Aandacht", "Risico"],
                values: [12, 3, 3],
            },
        },

        medewerker: {
            inzetPerProjectHours: {
                labels: ["Dashboard Uitrol", "Data Koppeling", "Selectie Impl.", "Support"],
                // gestapeld (per rol) → totaal druk loopt op
                datasets: [
                    { label: "Consultancy", values: [120, 90, 60, 30] },
                    { label: "Dev", values: [80, 70, 55, 20] },
                    { label: "PMO", values: [35, 25, 20, 10] },
                ],
            },
            billableSplitPct: {
                labels: ["Facturabel", "Niet-facturabel"],
                values: [78, 22],
            },
        },

        project: {
            // Keeping = operationele bron (geboekte uren, vaak sneller/ruwer).
            // Rompslomp = financiële bron (facturatie/omzet/kosten), timing kan achterlopen.
            sourceReconciliation: {
                keepingBookedHours: 310,
                // Demo-scenario: urenregistratie loopt achter op facturatie.
                rompslompInvoicedHoursIndicative: 360,
                note: "Indicatief: verschillen door timing/afronding/invoerdiscipline.",
            },
            keepingVsRompslompProgress: {
                labels: ["W1", "W2", "W3", "W4", "W5", "W6"],
                // Keeping: urenverbruik als % van urenbudget (indicatief)
                keepingPct: [6, 16, 28, 40, 52, 62],
                // Rompslomp: financiële voortgang (facturatie) als % (indicatief)
                rompslompPct: [10, 24, 40, 55, 70, 78],
            },
            urenPerRol: {
                labels: ["Consultancy", "Dev", "PMO", "QA"],
                // Realistisch: vooral Dev drukt op budget; totaal sluit aan op KPI bovenin.
                values: [85, 155, 45, 25],
                budget: [75, 140, 40, 25],
            },
            planningVsRealisatie: {
                labels: ["W1", "W2", "W3", "W4", "W5", "W6"],
                planned: [10, 22, 35, 48, 60, 70],
                actual: [8, 18, 28, 38, 50, 62],
            },
        },

        portfolio: {
            marginTrendPct: [21, 20.6, 20.0, 19.4, 18.9, 18.0],
            winstVerliesMixKeur: {
                labels: ["Top 3 winnaars", "Middenmoot", "Top 3 drukkers"],
                values: [140, 60, -95],
            },
        },

        uren: {
            urenPerActiviteit: {
                labels: ["Overleg", "Bouw", "Test", "Analyse", "Overige"],
                values: [135, 160, 55, 40, 30],
            },
            verdelingPerRol: {
                labels: ["Consultancy", "Dev", "PMO", "QA"],
                values: [170, 180, 45, 25],
            },
        },

        projectFin: {
            margeOntwikkelingPct: [19.5, 18.8, 18.1, 17.6, 17.0, 16.4],
            doelMargePct: 20,
        },

        crm: {
            customers: [
                {
                    id: "c-001",
                    name: "Gemeente Noordhaven",
                    segment: "Publiek",
                    contactName: "S. de Vries",
                    contactEmail: "s.devries@example.com",
                    contactPhone: "+31 6 1234 5678",
                    city: "Noordhaven",
                },
                {
                    id: "c-002",
                    name: "Zorggroep Linde",
                    segment: "Zorg",
                    contactName: "M. Jansen",
                    contactEmail: "m.jansen@example.com",
                    contactPhone: "+31 6 2345 6789",
                    city: "Utrecht",
                },
                {
                    id: "c-003",
                    name: "TechCo Retail",
                    segment: "Commercieel",
                    contactName: "A. Bakker",
                    contactEmail: "a.bakker@example.com",
                    contactPhone: "+31 6 3456 7890",
                    city: "Amsterdam",
                },
                {
                    id: "c-004",
                    name: "Onderwijsregio Rijn",
                    segment: "Onderwijs",
                    contactName: "L. Smit",
                    contactEmail: "l.smit@example.com",
                    contactPhone: "+31 6 4567 8901",
                    city: "Rotterdam",
                },
            ],
            projects: [
                {
                    id: "p-101",
                    customerId: "c-001",
                    name: "Selectie Implementatie",
                    status: "actief",
                    start: "2025-12-01",
                    owner: "PMO",
                    link: "project.html?project=p-101",
                },
                {
                    id: "p-102",
                    customerId: "c-001",
                    name: "Omgevingsmanagement Sprint",
                    status: "afgerond",
                    start: "2025-10-15",
                    owner: "Lead",
                    link: "project.html?project=p-102",
                },
                {
                    id: "p-201",
                    customerId: "c-002",
                    name: "Dashboard Uitrol",
                    status: "actief",
                    start: "2026-01-08",
                    owner: "PL",
                    link: "project.html?project=p-201",
                },
                {
                    id: "p-202",
                    customerId: "c-002",
                    name: "Leiderschap & Teamontwikkeling",
                    status: "actief",
                    start: "2026-01-22",
                    owner: "Lead",
                    link: "project.html?project=p-202",
                },
                {
                    id: "p-301",
                    customerId: "c-003",
                    name: "Data Koppeling",
                    status: "risico",
                    start: "2025-11-18",
                    owner: "Finance",
                    link: "project.html?project=p-301",
                },
                {
                    id: "p-401",
                    customerId: "c-004",
                    name: "Workshop Jaarplan",
                    status: "afgerond",
                    start: "2025-09-05",
                    owner: "PMO",
                    link: "project.html?project=p-401",
                },
            ],
        },
    };
})();
