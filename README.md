# De Selectie – Tailwind Dashboard Prototype

Dit is een **statische** Tailwind omgeving (HTML) met alle dashboards + component-patronen.
Doel: snel reviewen, wireframes valideren, en daarna 1-op-1 overzetten naar Laravel Blade + Livewire.

## Starten
- Open `index.html` in je browser
- Aanrader: serve lokaal via VS Code *Live Server* of `python -m http.server`

## Pagina's
- `dashboards/overview.html`
- `dashboards/project.html`
- `dashboards/medewerker.html`
- `dashboards/portfolio.html`
- `dashboards/project-fin.html`
- `dashboards/uren.html`
- `components.html` (mini design system)

## Volgende stap (Laravel/Livewire)
- Vervang placeholders door echte components:
  - `x-dashboard-header`
  - `x-kpi-card`
  - `x-panel`
  - `x-table`
  - `x-signal-list`
- Voeg Livewire state toe voor filters (periode, project, team).

Gegenereerd: 2026-02-04
