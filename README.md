# WebRule

[![Deployment Status](https://github.com/uchihamalolan/webruler/actions/workflows/deploy.yml/badge.svg?branch=main&event=deployment_status)](https://github.com/uchihamalolan/webruler/actions/workflows/deploy.yml)

A small online ruler built with **Preact + Vite**.

It supports:
- Horizontal and vertical ruler modes
- `cm` and `inch` units
- Calibration (to improve physical accuracy on your screen)
- Catppuccin theme switching (`Frappe` dark, `Latte` light)
- Persistent settings via `localStorage`

## Tech Stack

- Preact
- Vite
- TypeScript
- CSS Modules + Lightning CSS

## Getting Started

### Prerequisites

- Node.js (or Bun)

### Install

```bash
npm install
```

### Run development server

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Persisted Settings

Settings are stored in `localStorage` under:

- `webrule:settings`

Currently persisted:
- unit
- orientation
- theme
- calibration scale

## Project Structure

```txt
src/
  components/
    CalibrationPanel.tsx
    ConfigPanel.tsx
    RulerView.tsx
  hooks/
    useCalibration.ts
    useDpi.ts
    useSettings.ts
    useViewportLength.ts
  lib/
    constants.ts
    ruler.ts
  app.tsx
  index.css
  types.ts
```

## Deployment

A GitHub Actions workflow is configured at:

- `.github/workflows/deploy.yml`

It builds the app and deploys `dist/` to GitHub Pages on pushes to `main`.

## Notes

- This app uses CSS Modules for component-scoped styling.
- Global design tokens (theme variables and spacing primitives) are defined in `src/index.css`.
