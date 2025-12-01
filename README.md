# 🎂 Cake Viewer - Angular App with Three.js

A beautiful 3D rotating rectangular cake viewer built with **Angular 21** (zoneless) and **Three.js**.

## ✨ Features

- 🎂 Rotating rectangular sheet cake with rounded frosting edges
- 🏆 Golden rectangular base/platform
- 🎨 Clean, minimal background perfect for bakery websites
- ⚡ Zoneless Angular for optimal performance
- 📱 Responsive design
- 🎮 Interactive camera controls (drag to rotate, scroll to zoom)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or **Bun 1.3+** (recommended)
- This project uses **Bun** for faster installs and builds

### Installation

1. **Install dependencies:**
   ```bash
   bun install
   # or
   npm install
   ```

2. **Start the development server:**
   ```bash
   bun start
   # or
   npm start
   ```

3. **Open your browser:**
   Navigate to `http://localhost:4200`

## 📁 Project Structure

```
src/
├── app/
│   ├── cake-viewer/                    # Cake viewer component
│   │   ├── cake-viewer.component.ts
│   │   ├── cake-viewer.component.html
│   │   └── cake-viewer.component.scss
│   ├── shared/
│   │   └── threejs/                    # Three.js utilities
│   │       ├── three-scene.service.ts  # Scene management
│   │       ├── core/                   # Core Three.js factories
│   │       │   ├── camera.factory.ts
│   │       │   ├── renderer.factory.ts
│   │       │   ├── controls.factory.ts
│   │       │   ├── lights.factory.ts
│   │       │   └── loop.service.ts
│   │       └── models/                 # 3D model factories
│   │           ├── cake.factory.ts
│   │           └── room.factory.ts
│   └── app.component.ts               # Root component
├── index.html
├── main.ts                            # Zoneless bootstrap
└── styles.scss
```

## 🎯 Technologies

- **Angular 21** - Zoneless Angular with signals
- **Three.js** - 3D graphics library
- **TypeScript 5.9** - Full type safety
- **SCSS** - Component styling

## 🎨 Cake Viewer Component

The cake viewer is a standalone Angular component that can be used anywhere:

```typescript
<app-cake-viewer 
  [width]="3"
  [height]="0.4"
  [depth]="2"
  [autoRotate]="true"
  [rotationSpeed]="0.5">
</app-cake-viewer>
```

### Configuration Options

- `[width]` - Cake width (default: 3)
- `[height]` - Cake height (default: 0.4)
- `[depth]` - Cake depth (default: 2)
- `[autoRotate]` - Enable auto rotation (default: true)
- `[rotationSpeed]` - Rotation speed (default: 0.5)
- `[backgroundColor]` - Background color (default: 0xf5f5f0)

## ⚡ Zoneless Angular

This project uses Angular 21 zoneless change detection:

- No Zone.js dependency
- Uses signals for reactive state
- Uses `effect()` for side effects
- `OnPush` change detection for performance
- Render loop runs outside Angular zone

## 🛠️ Building

Build for production:
```bash
bun build
# or
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 📝 Development

Watch mode:
```bash
bun watch
# or
npm run watch
```

### Available Scripts

```bash
bun start       # Start dev server
bun build       # Production build
bun watch       # Watch mode
bun lint        # Run ESLint
bun lint:fix    # Auto-fix lint issues
bun format      # Format code with Prettier
bun check       # Run format check + lint
```

## 🎯 Usage in Your Bakery Website

Perfect for:
- Product configuration pages
- Cake customization interfaces
- Real-time 3D preview
- Interactive product showcases

## 📄 License

MIT
