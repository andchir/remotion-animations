# Text Animation Copier - Examples and Workflow

This document provides practical examples of using the `text-animation-copier` skill to recreate text animations from videos.

## Example 1: Recreating TextAnimation1 (Bar Fill with Text)

### Original Requirements
- Video time range: 00:07 - 00:13 (6 seconds)
- Animation: Two colored bars (white and orange) that fill from left to right
- Text appears after bars finish filling
- Position: Bottom-left corner
- Resolution: 1920x1080, transparent background

### Step-by-Step Process

#### 1. Video Analysis (Hypothetical)

**Frames examined:**
- Frame 0 (00:07): Empty, bars start filling
- Frame 45 (00:08.5): Bars about halfway filled
- Frame 90 (00:10): Bars completely filled
- Frame 48 (00:08.6): Text "JOHN DOE" and "ENGINEER" appear
- Frame 180 (00:13): Animation holds with text visible

**Observations:**
- Bar fill duration: ~1.5 seconds (45 frames at 30fps)
- Text appears nearly instantly after bars complete
- Smooth easing on bar fill (ease-in-out curve)
- White bar with black text on top
- Orange bar (#FF6600) with white text on bottom

#### 2. Animation Properties Identified

```typescript
TIMING = {
  BAR_START: 0,
  BAR_END: 45,
  TEXT_APPEAR: 48,
  HOLD_END: 180
}

STYLING = {
  Top Bar: {
    background: "white",
    text: "black",
    fontSize: "36px",
    height: "60px"
  },
  Bottom Bar: {
    background: "#FF6600",
    text: "white",
    fontSize: "24px",
    height: "40px"
  }
}

POSITIONING = {
  bottom: 60px,
  left: 40px
}
```

#### 3. Component Implementation

See `src/animations/text-animation-1/TextAnimation1.tsx` for the complete implementation.

**Key techniques used:**
- `interpolate()` for smooth bar fill progress
- `Easing.bezier(0.25, 0.1, 0.25, 1)` for natural motion
- Instant text appearance (opacity 0 to 1)
- Absolute positioning for corner placement
- Overflow hidden for bar fill effect

#### 4. Testing Results

✓ Bar fill timing matches original
✓ Text appears at correct moment
✓ Positioning accurate
✓ Colors match video
✓ Smooth animation without jank

---

## Example 2: Recreating TextAnimation2 (3D Flip with Flying Text)

### Original Requirements
- Video time range: Similar duration animation
- Animation: Text flies in from left with 3D letter flipping
- Each letter has staggered animation
- Blue backgrounds rotate behind letters
- Position: Centered on screen
- Resolution: 1920x1080, transparent background

### Step-by-Step Process

#### 1. Video Analysis (Hypothetical)

**Frames examined:**
- Frame 0: Text starts off-screen left
- Frame 15: First letter visible with flip beginning
- Frame 60: All text centered, flips complete
- Frame 75: Backgrounds start appearing
- Frame 120: All backgrounds visible

**Observations:**
- Each letter starts with 3-frame delay (stagger effect)
- 3D flip rotation: 0° to 360° on Y-axis
- Background appears with 90° to 0° Y-rotation
- Blue background color: #1655ba
- Fly-in uses cubic easing (deceleration)

#### 2. Animation Properties Identified

```typescript
TIMING = {
  TEXT_FLY_START: 0,
  TEXT_FLY_END: 60,
  FLIP_DURATION: 15,
  FLIP_DELAY: 3,
  BACKGROUND_START: 75,
  BACKGROUND_DURATION: 10,
  BACKGROUND_DELAY: 2
}

EFFECTS = {
  Fly-in: "Easing.out(Easing.cubic)",
  3D Flip: "rotateY 0-360deg",
  Background: "rotateY -90-0deg with scale"
}
```

#### 3. Component Implementation

See `src/animations/text-animation-2/TextAnimation2.tsx` for the complete implementation.

**Key techniques used:**
- Per-letter component for independent animation
- Staggered timing with index-based delays
- 3D transforms with perspective
- `transformStyle: "preserve-3d"`
- Background element with negative z-index

#### 4. Testing Results

✓ Stagger timing creates smooth wave effect
✓ 3D flips render correctly
✓ Backgrounds appear behind text properly
✓ Text centers accurately
✓ No z-fighting or rendering issues

---

## Example 3: Complex Multi-Phase Animation (Hypothetical)

### Scenario
User provides video at 00:20-00:30 with text that:
1. Fades in (20-22s)
2. Scales up with bounce (22-24s)
3. Rotates 180° (24-26s)
4. Fades out (28-30s)

### Implementation Plan

```typescript
const TIMING = {
  FADE_IN_START: 0,      // Frame 0 (00:20)
  FADE_IN_END: 60,       // Frame 60 (00:22)
  SCALE_START: 60,       // Frame 60 (00:22)
  SCALE_END: 120,        // Frame 120 (00:24)
  ROTATE_START: 120,     // Frame 120 (00:24)
  ROTATE_END: 180,       // Frame 180 (00:26)
  HOLD_START: 180,       // Frame 180 (00:26)
  HOLD_END: 240,         // Frame 240 (00:28)
  FADE_OUT_START: 240,   // Frame 240 (00:28)
  FADE_OUT_END: 300,     // Frame 300 (00:30)
};

// Phase 1: Fade in
const fadeIn = interpolate(
  frame,
  [TIMING.FADE_IN_START, TIMING.FADE_IN_END],
  [0, 1],
  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
);

// Phase 2: Bounce scale
const scaleValue = frame >= TIMING.SCALE_START && frame <= TIMING.SCALE_END
  ? spring({
      frame: frame - TIMING.SCALE_START,
      fps: 30,
      from: 1,
      to: 1.5,
      config: { damping: 10, stiffness: 100 }
    })
  : frame > TIMING.SCALE_END ? 1.5 : 1;

// Phase 3: Rotation
const rotation = interpolate(
  frame,
  [TIMING.ROTATE_START, TIMING.ROTATE_END],
  [0, 180],
  {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic)
  }
);

// Phase 4: Fade out
const fadeOut = frame >= TIMING.FADE_OUT_START
  ? interpolate(
      frame,
      [TIMING.FADE_OUT_START, TIMING.FADE_OUT_END],
      [1, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    )
  : 1;

// Combine all phases
const opacity = frame < TIMING.FADE_IN_END ? fadeIn : fadeOut;
const scale = scaleValue;
const rotateZ = rotation;

<div style={{
  opacity,
  transform: `scale(${scale}) rotate(${rotateZ}deg)`,
}}>
  YOUR TEXT
</div>
```

---

## Example 4: Typewriter Effect

### Scenario
Text appears letter by letter from left to right over 3 seconds.

### Implementation

```typescript
const TIMING = {
  TYPE_START: 0,
  TYPE_END: 90, // 3 seconds at 30fps
};

const TEXT = "Hello World!";

const TextTypewriter: React.FC = () => {
  const frame = useCurrentFrame();

  const visibleChars = Math.floor(
    interpolate(
      frame,
      [TIMING.TYPE_START, TIMING.TYPE_END],
      [0, TEXT.length],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    )
  );

  return (
    <div style={{
      fontFamily: "monospace",
      fontSize: "48px",
      color: "white",
    }}>
      {TEXT.substring(0, visibleChars)}
      {visibleChars < TEXT.length && <span className="cursor">|</span>}
    </div>
  );
};
```

---

## Example 5: Glowing Text Pulse

### Scenario
Text has a pulsing glow effect that repeats every 60 frames.

### Implementation

```typescript
const GlowingText: React.FC = () => {
  const frame = useCurrentFrame();

  // Pulse repeats every 60 frames
  const pulseProgress = (frame % 60) / 60;

  const glowIntensity = interpolate(
    pulseProgress,
    [0, 0.5, 1],
    [0, 20, 0],
    {
      easing: Easing.inOut(Easing.sine),
    }
  );

  return (
    <div style={{
      fontSize: "72px",
      fontWeight: "bold",
      color: "white",
      textShadow: `
        0 0 ${glowIntensity}px rgba(255, 255, 255, 0.8),
        0 0 ${glowIntensity * 2}px rgba(255, 255, 255, 0.5),
        0 0 ${glowIntensity * 3}px rgba(255, 255, 255, 0.3)
      `,
    }}>
      GLOWING TEXT
    </div>
  );
};
```

---

## Common Time-to-Frame Conversions

At 30 FPS:

| Time | Frames |
|------|--------|
| 0.5s | 15     |
| 1.0s | 30     |
| 1.5s | 45     |
| 2.0s | 60     |
| 2.5s | 75     |
| 3.0s | 90     |
| 4.0s | 120    |
| 5.0s | 150    |
| 6.0s | 180    |
| 10.0s | 300   |

### Conversion Formula
```
frames = seconds × fps
seconds = frames ÷ fps
```

For time codes (MM:SS):
```
total_seconds = (minutes × 60) + seconds
frames = total_seconds × fps
```

Example: 01:23 (1 minute 23 seconds) at 30fps
```
total_seconds = (1 × 60) + 23 = 83 seconds
frames = 83 × 30 = 2490 frames
```

---

## Debugging Tips

### Animation not visible
```typescript
// Add debug logging
console.log("Frame:", frame);
console.log("Opacity:", opacity);
console.log("Position:", translateX, translateY);

// Check if element is off-screen
const { width, height } = useVideoConfig();
console.log("Viewport:", width, height);
```

### Timing seems off
```typescript
// Highlight specific frames
const debugColor = frame === TIMING.KEY_MOMENT ? "red" : "white";

<div style={{ color: debugColor }}>
  {TEXT}
</div>
```

### Compare with original
1. Render your animation
2. Open both videos side-by-side
3. Use video editing software to overlay and compare
4. Adjust timing constants iteratively

---

## Best Practices Summary

1. **Always use constants** for timing, colors, and sizes
2. **Comment each animation phase** clearly
3. **Test in Remotion Studio** before rendering
4. **Use appropriate easing** - cubic for natural motion
5. **Clamp extrapolation** to prevent overshoot
6. **Keep transparent background** for overlay compatibility
7. **Center using viewport dimensions** for responsiveness
8. **Document video time codes** in comments
9. **Extract frames at key moments** for reference
10. **Iterate and refine** - first pass won't be perfect

---

## Workflow Checklist

When recreating an animation, follow this checklist:

- [ ] Download video or obtain file path
- [ ] Extract frames from specified time range
- [ ] Analyze key frames and document observations
- [ ] Identify timing breakpoints
- [ ] Convert time codes to frame numbers
- [ ] Document styling (fonts, colors, sizes)
- [ ] Note animation effects and easing
- [ ] Create component file in proper directory
- [ ] Implement TIMING constants
- [ ] Implement animation interpolations
- [ ] Add styling and positioning
- [ ] Register composition in Root.tsx
- [ ] Test in Remotion Studio
- [ ] Adjust timing and easing as needed
- [ ] Render and compare with original
- [ ] Add render script to package.json
- [ ] Document any deviations or notes

---

## Additional Resources

- **Video Comparison**: Use VLC or DaVinci Resolve to compare side-by-side
- **Frame Extraction**: Use ffmpeg for precise frame extraction
- **Color Picker**: Use browser DevTools or a color picker tool on frames
- **Easing Tester**: https://easings.net/ for easing curve reference
- **CSS Tricks**: https://css-tricks.com/almanac/properties/t/transform/

---

This examples document provides practical guidance for using the text-animation-copier skill effectively. Each example demonstrates different animation techniques and common patterns found in video text animations.
