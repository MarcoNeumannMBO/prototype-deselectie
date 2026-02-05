# De Selectie – Dashboard Demo (prototype)

Dit is een statische demo-omgeving (HTML) voor de dashboards van De Selectie.
Doel: in één sessie laten zien welke stuurinformatie je uit twee SaaS-bronnen kunt halen, zonder backend/build.

## Wat is dit (en wat niet)
- Demo-doel: snelle portfoliotriagering + projectbijsturing op basis van trends en signalen.
- Techniek: statische HTML + Tailwind via CDN + Chart.js via CDN.
- Data: volledig mock.
- Belangrijk: Rompslomp (financieel) en Keeping (uren) sluiten in de praktijk niet perfect op elkaar aan.
  Dit prototype maakt dat verschil expliciet en gebruikt het als stuur-signaal (trendmatig/indicatief), niet als boekhoudkundige reconciliatie.

## Snel starten
Je kunt de HTML direct openen, maar voor scripts (Chart.js/mock data) is een lokale server het meest betrouwbaar.

Optie A — VS Code Live Server
- Open index.html en klik “Go Live”.

Optie B — Python
- Run: python -m http.server
- Open: http://localhost:8000

Optie C — Docker Compose (homelab)

Dit is een statische site; Docker is dus alleen een simpele webserver (nginx).

- Start (build + run): docker compose up -d --build
- Open: http://<server-ip>:8080
- Stop: docker compose down

Andere poort gebruiken? Pas in docker-compose.yml de mapping aan (bijv. "8090:80").

## Deploy naar server via GitHub

Als je server een clone van deze repo heeft, kun je updates simpel uitrollen met `git pull`.

1) Lokaal (naar GitHub)
- Check: `git status`
- Commit: `git add -A && git commit -m "Update demo"`
- Push: `git push origin main`

2) Server (pull + herstart)
- Ga naar de repo-map: `cd /pad/naar/de-selectie-tailwind-prototype`
- Check branch: `git branch --show-current` (verwacht: `main`)
- Pull: `git pull origin main`

Als je via Docker draait:
- Rebuild + run: `docker compose up -d --build`

Troubleshooting (meest voorkomend)
- Server heeft lokale wijzigingen: `git status` → dan `git stash -u` of commit die changes eerst.
- Verkeerde branch: `git checkout main` en daarna opnieuw pull.
- SSH/credentials: zorg dat de server toegang heeft tot de GitHub repo (SSH key of token).

## Navigatie (demo-flow)
- Startpunt: index.html
- Dashboards:
  - dashboards/overview.html — cockpit: statusverdeling + marge-trend (laatste 5 maanden)
  - dashboards/project.html — projectdiagnose: uren per rol + Keeping vs Rompslomp voortgang (risico op achterlopende registratie)
  - dashboards/project-fin.html — financiële status per project: triage + marge-trend
  - dashboards/portfolio.html — financieel portfolio: marge + downside concentratie (risico-indicator)
  - dashboards/medewerker.html — inzet/belasting: focus vs versnippering + facturabiliteit
  - dashboards/uren.html — werkzaamheden/uren: waar gaat de tijd heen (tagging/discipline zichtbaar)
- Componentenbibliotheek: components.html

## BI-duiding in de UI
Onder elk dashboard staat een inklapbare sectie “Demo notities (BI)”.
Die is bedoeld om tijdens de demo hardop te kunnen uitleggen:
- Centrale vraag
- Bronnen (Rompslomp vs Keeping)
- Wat je uit de KPI’s/charts mag concluderen
- Kijkpunt: wanneer grijp je in?

Extra documentatie:
- BI-inzichten-per-dashboard.md

## Waar pas je wat aan

Mock data
- js/mock-data.js bevat alle demo-data in window.MOCK_DATA.
- Scenario’s (bijv. “Keeping loopt achter op Rompslomp”) zitten bewust in de mock data zodat je het verhaal kunt sturen.

Charts
- js/charts.js rendert alle Chart.js grafieken op basis van data-dashboard attributen.
- Chart styling volgt de huisstijl via CSS-variabelen uit styles.css.

Huisstijl
- styles.css bevat de demo-huisstijl (fonts, kleuren, outlines) zodat alle pagina’s één geheel voelen.

## Demo-tips (praktisch)
- Positioneer het verschil tussen bronnen als voordeel: “we zien vroegtijdig waar registratie/realiteit uit elkaar loopt”.
- Gebruik trends boven absolute getallen: vooral bij forecast vs indicatief.
- Houd het simpel: 1–2 charts per dashboard en max 4 KPI’s bovenin.

## Volgende stap (na de demo)
- Laravel Blade + Livewire: componentiseren van header/KPI cards/panels/tables.
- Echte koppelingen: Rompslomp + Keeping via API’s (met expliciete mappingregels en datakwaliteitschecks).
- Drilldowns: van portfolio → project → rol/activiteit → oorzaak.

Gegenereerd: 2026-02-04
