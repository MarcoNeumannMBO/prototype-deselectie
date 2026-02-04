# BI-inzichten per dashboard (prototype)

Doel: tijdens demo’s snel kunnen uitleggen welke inzichten elk dashboard geeft (dummy data, beslisinformatie, signalen → acties).

## Overzicht (dashboards/overview.html)
- Centrale vraag: staan we er nú globaal goed voor en moeten we ingrijpen?
- Bronnen: Rompslomp (financieel, verwachting/forecast) • Keeping (uren, indicatief). Verschillen zijn normaal en vooral trendmatig bedoeld.
- KPI’s (bovenin): projecten OK/aandacht/risico, forecast marge vs doel.
- Visuals:
  - Lijn: marge-trend laatste 5 maanden (Rompslomp forecast vs Keeping indicatief) → tempo van verslechtering/herstel + signaal voor bronverschil.
  - Donut: verdeling status (OK/aandacht/risico) voor 1-oogopslag portfoliobalans.
- Signaal-logica (demo): marge onder doel of stijgende rode projecten → prioriteer top-drukkers; bij aanhoudend Rompslomp vs Keeping verschil: check timing (facturatie vs urenregistratie).
- Typische BI-questions: “Welke 3 projecten veroorzaken de afwijking?” “Is dit trend of incident?”

## Project (dashboards/project.html)
- Centrale vraag: waarom staat dit project op oranje/rood en wat doen we eraan?
- Bronnen: Keeping (uren, indicatief) • Rompslomp (financiële voortgang via facturatie/forecast). Vergelijking is een stuur-signaal, geen boekhoudkundige reconciliatie.
- KPI’s (bovenin): voortgang vs planning, uren besteed vs budget, forecast marge.
- Visuals:
  - Balk: urenverbruik per rol (geboekt vs budget) → waar lekt het?
  - Lijn: Keeping uren (%) vs Rompslomp facturatie (%) → als Rompslomp vóórloopt, is er risico op achterlopende registratie (of afwijkende scope/contractafspraken).
- Signaal-logica (demo): één rol drukt structureel over budget óf Rompslomp loopt structureel vóór op Keeping → scope/rollenmix/capaciteit bijsturen en registratie/afspraken nalopen.
- Typische BI-questions: “Welke rol/fase veroorzaakt de overschrijding?” “Wat is het effect op EAC?”

## Medewerker (dashboards/medewerker.html)
- Centrale vraag: zetten we de juiste mensen op de juiste projecten — en houden ze dit vol?
- Bronnen: Keeping (uren, indicatief). Facturabel/niet-facturabel is een werkafspraak/label en kan per team verschillen.
- KPI’s (bovenin): belasting, facturabel %, projecten tegelijk, correcties.
- Visuals:
  - Gestapelde balk: inzet per project (per rol) → concentratie/versnippering + druk.
  - Donut: facturabel vs niet-facturabel → productiviteit vs overhead.
- Signaal-logica (demo): belasting >100% of versnippering → risico op kwaliteit en vertraging; dalende facturabiliteit → check overleg/interrupties en herverdeel werk.
- Typische BI-questions: “Waar zit overbelasting?” “Kunnen we mensen heralloceren zonder margeschade?”

## Financieel Overzicht / Portfolio (dashboards/portfolio.html)
- Centrale vraag: is ons portfolio financieel gezond genoeg om strategische keuzes te maken?
- Bronnen: Rompslomp (financieel: omzet/marge/forecast). Interpreteer trends en concentratie; demo-data is geen definitieve rapportage.
- KPI’s (bovenin): omzet YTD vs forecast, marge vs doel, risico-omzet, downside (€).
- Visuals:
  - Lijn: marge trend (portfolio) → structurele drift vs doel.
  - Balk: mix winst/verlies (impact) → concentratie van upside/downside.
- Risico-indicator (demo): downside concentratie hoog → kleine set projecten bepaalt uitkomst (stuur op “top 3 drukkers” i.p.v. gemiddelden).
- Typische BI-questions: “Wat gebeurt er als top-drukkers 2 weken niet verbeteren?” “Welke interventie heeft meeste effect?”

## Werkzaamheden & Uren (dashboards/uren.html)
- Centrale vraag: waar gaat de tijd écht heen binnen een project?
- Bronnen: Keeping (uren, indicatief). Activiteiten zijn afhankelijk van tagging/discipline in registratie.
- KPI’s (bovenin): totaal uren, top activiteit, etc.
- Visuals:
  - Balk: uren per activiteit → gedrag/patronen (overleg vs build).
  - Balk: verdeling per rol → rollenmix en stuurinformatie.
- Signaal-logica (demo): veel ‘Overige’ of groeiend overleg → datakwaliteit/afhankelijkheden/scope.
- Typische BI-questions: “Welke activiteiten zijn te dominant?” “Welke rol schuurt met budget?”

## Financiële status per project (dashboards/project-fin.html)
- Centrale vraag: welke projecten gaan ons straks pijn doen als we niets doen?
- Bronnen: Rompslomp (financieel: marge, afwijking, forecast). Gebruik dit voor triage en trendbewaking; detail-oorzaken vergen projectanalyse.
- KPI’s (bovenin): rood/oranje/risico € (portfolio view).
- Visuals:
  - Tabel: status per project + afwijking + marge → snelle triage.
  - Lijn: marge-ontwikkeling vs doel → trend richting (of onder) target.
- Signaal-logica (demo): dalende marge-trend onder doel → escaleren + scope/budget herijken; combineer met uren (Keeping) om te zien of registratie/uitvoering achterloopt.
- Typische BI-questions: “Welke projecten escaleren we nu?” “Is de trend tijdelijk of structureel?”

## BI-tooling (later, buiten dit prototype)
- Dit prototype gebruikt Chart.js voor visuals en mock data als bron.
- In een echte BI-setup kan dit 1-op-1 landen in Power BI / Tableau / Looker Studio / Metabase (zelfde KPI’s + trends + filters + drilldowns).
