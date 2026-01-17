# remotion-animations

A library of ready-made animations for Remotion.

Remotion documentation:  
https://gist.github.com/ThariqS/3d446e7c7aa9eb94f468194deb73028f

## Available Animations

### Subscribe Button Animation

An animated YouTube-style subscribe button with:
- Mouse cursor animation moving from bottom to button
- Cursor changes from arrow to hand pointer on hover
- Button click effect with star particles flying outward
- Button color changes from red to gray after click
- Bell icon shakes after the click
- Transparent background for easy overlays

## Installation

```bash
npm install
```

## Usage

### Preview Animation

Start the Remotion Studio to preview animations in real-time:

```bash
npm start
```

This will open a browser window at `http://localhost:3000` where you can preview and interact with the animations.

### Render to Video

#### WebM with transparency (recommended for overlays)

```bash
npm run render
```

Output: `out/subscribe-button.webm`

#### MP4 (for general use, no transparency)

```bash
npm run render:mp4
```

Output: `out/subscribe-button.mp4`

#### GIF

```bash
npm run render:gif
```

Output: `out/subscribe-button.gif`

### Custom Rendering

You can also render with custom options using the Remotion CLI directly:

```bash
# Render specific frames
npx remotion render src/index.ts SubscribeButton out/output.webm --frames=0-60

# Render at different quality
npx remotion render src/index.ts SubscribeButton out/output.webm --crf=18

# See all options
npx remotion render --help
```

## Project Structure

```
remotion-animations/
├── src/
│   ├── index.ts              # Remotion entry point
│   ├── Root.tsx              # Compositions registry
│   └── animations/           # Animation components
│       └── subscribe-button/
│           └── SubscribeButtonAnimation.tsx
├── public/                   # Static assets
├── out/                      # Rendered output
├── remotion.config.ts        # Remotion configuration
├── package.json
└── tsconfig.json
```

## Adding New Animations

1. Create a new folder in `src/animations/` for your animation
2. Create your animation component using Remotion hooks:
   - `useCurrentFrame()` - get current frame number
   - `useVideoConfig()` - get fps, width, height, duration
   - `interpolate()` - animate values over time
   - `spring()` - physics-based animations
3. Register the composition in `src/Root.tsx`
4. Add render scripts to `package.json` if needed

## Development

```bash
# Type check
npm run typecheck

# Upgrade Remotion
npm run upgrade
```

## License

MIT
