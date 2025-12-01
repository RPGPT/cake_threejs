# Cake Viewer — Angular + Three.js

A small Angular application that demonstrates a 3D cake viewer implemented with Three.js. The app uses Angular's zoneless bootstrap (via `bootstrapApplication`) and a lightweight Three.js scene managed in `src/app/shared/threejs`.

## Quick summary

- Angular version: 21 (zoneless bootstrap in `src/main.ts`)
- Three.js for 3D rendering (types in `devDependencies`)
- Project uses `bun` in the npm scripts, but it can be run with standard Node tooling as described below

## Prerequisites

- Node.js 18+ (required)
- Bun (optional, recommended): scripts in `package.json` call `bun` (see below). If you don't have Bun, use `npx` for Angular CLI commands.

## Installation

With Bun (recommended):

```bash
bun install
```

With npm/yarn (no Bun):

```bash
npm install
# or
# yarn install
```

## Run (development)

Preferred (with Bun):

```bash
bun start
```

If you don't have Bun installed, start with the Angular CLI directly:

```bash
npx ng serve --open
```

The app serves on `http://localhost:4200` by default.

## Build

With Bun:

```bash
bun run ng build
```

With npm (if you prefer):

```bash
npm run build
```

Build artifacts will be placed in `dist/`.

## Useful scripts (from `package.json`)

- `start` — start dev server (`bun start`) or use `npx ng serve`
- `build` — production build (`bun run ng build`)
- `watch` — build in watch mode
- `test` — run tests via Angular CLI
- `lint` / `lint:fix` — ESLint checks and fixes
- `format` / `format:check` — Prettier formatting
- `check` — runs format check and lint

## Project structure (key files)

```
src/
├── app/
│   ├── cake-viewer/                # `app-cake-viewer` component (HTML/SCSS/TS)
│   ├── shared/
│   │   └── threejs/                # Three.js scene utilities and factories
│   │       ├── three-scene.service.ts
│   │       └── core/               # camera, renderer, controls, lights, loop
│   │           ├── camera.factory.ts
│   │           ├── renderer.factory.ts
│   │           ├── controls.factory.ts
│   │           └── lights.factory.ts
│   └── app.component.ts            # Root component
├── index.html
├── main.ts                         # Zoneless bootstrap (uses provideZonelessChangeDetection)
└── styles.scss
```

## Notes about the code

- The app uses a zoneless bootstrap in `src/main.ts` (`provideZonelessChangeDetection()`).
- The Three.js scene is organised in `src/app/shared/threejs`: factories for camera/renderer/controls/lights and model factories like `cake.factory.ts` and `room.factory.ts`.
- `app-cake-viewer` is the demo component that renders the cake scene (see `src/app/cake-viewer`).

## Example usage (component)

```html
<app-cake-viewer></app-cake-viewer>
```

Check the component inputs in the component file if you want to customise parameters (width, height, rotation options).

## License

MIT
