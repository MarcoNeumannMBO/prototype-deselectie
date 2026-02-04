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
    };
})();
