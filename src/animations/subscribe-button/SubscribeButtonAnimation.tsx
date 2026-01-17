import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  random,
} from "remotion";

// Animation timing configuration (in frames, at 30fps)
const TIMING = {
  CURSOR_START: 0,
  CURSOR_MOVE_END: 30, // Cursor reaches button
  CURSOR_CHANGE: 32, // Cursor changes to hand
  CLICK_FRAME: 45, // Click happens
  BUTTON_CHANGE: 45, // Button changes color
  STARS_START: 45, // Stars start appearing
  STARS_END: 90, // Stars fade out
  BELL_SHAKE_START: 50, // Bell starts shaking
  BELL_SHAKE_END: 90, // Bell stops shaking
};

// Star component for the particle effect
const Star: React.FC<{
  x: number;
  y: number;
  angle: number;
  delay: number;
  seed: string;
}> = ({ x, y, angle, delay, seed }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const starFrame = frame - TIMING.STARS_START - delay;
  if (starFrame < 0) return null;

  const progress = spring({
    fps,
    frame: starFrame,
    config: {
      damping: 100,
      stiffness: 200,
    },
  });

  const distance = progress * (80 + random(seed + "-dist") * 40);
  const starX = x + Math.cos(angle) * distance;
  const starY = y + Math.sin(angle) * distance;

  const opacity = interpolate(starFrame, [0, 5, 20, 35], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(starFrame, [0, 10, 30], [0.5, 1, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const rotation = random(seed + "-rot") * 360;
  const size = 8 + random(seed + "-size") * 6;

  return (
    <div
      style={{
        position: "absolute",
        left: starX,
        top: starY,
        transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`,
        opacity,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24">
        <path
          d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"
          fill="#FFD700"
        />
      </svg>
    </div>
  );
};

// Bell Icon SVG component
const BellIcon: React.FC<{ shaking: boolean }> = ({ shaking }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  let rotation = 0;
  if (shaking && frame >= TIMING.BELL_SHAKE_START && frame <= TIMING.BELL_SHAKE_END) {
    const shakeFrame = frame - TIMING.BELL_SHAKE_START;
    const shakeProgress = spring({
      fps,
      frame: shakeFrame,
      config: {
        damping: 8,
        stiffness: 400,
        mass: 0.5,
      },
    });
    rotation = Math.sin(shakeFrame * 1.5) * (1 - shakeProgress) * 15;
  }

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={{
        transform: `rotate(${rotation}deg)`,
        transformOrigin: "center top",
      }}
    >
      <path
        d="M12 2C10.9 2 10 2.9 10 4V4.29C7.03 5.17 5 7.9 5 11V17L3 19V20H21V19L19 17V11C19 7.9 16.97 5.17 14 4.29V4C14 2.9 13.1 2 12 2ZM12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22Z"
        fill="white"
        fillOpacity="0.7"
      />
    </svg>
  );
};

// Arrow Cursor component
const ArrowCursor: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M4 2L4 20L8.5 15.5L12 22L15 21L11.5 14L18 14L4 2Z"
      fill="white"
      stroke="black"
      strokeWidth="1.5"
    />
  </svg>
);

// Hand/Pointer Cursor component
const HandCursor: React.FC = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <path
      d="M10 2C9.45 2 9 2.45 9 3V11.5L7.5 10C6.67 9.17 5.33 9.17 4.5 10C3.67 10.83 3.67 12.17 4.5 13L9.5 18C10.28 18.78 11.35 19.25 12.5 19.25H15C17.21 19.25 19 17.46 19 15.25V8C19 7.45 18.55 7 18 7C17.45 7 17 7.45 17 8V11H16V5C16 4.45 15.55 4 15 4C14.45 4 14 4.45 14 5V11H13V4C13 3.45 12.55 3 12 3C11.45 3 11 3.45 11 4V11V3C11 2.45 10.55 2 10 2Z"
      fill="white"
      stroke="black"
      strokeWidth="1"
    />
  </svg>
);

// Subscribe Button component
const SubscribeButton: React.FC<{ clicked: boolean }> = ({ clicked }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Button scale animation on click
  let scale = 1;
  if (clicked && frame >= TIMING.CLICK_FRAME) {
    const clickProgress = spring({
      fps,
      frame: frame - TIMING.CLICK_FRAME,
      config: {
        damping: 15,
        stiffness: 300,
      },
    });
    scale = interpolate(clickProgress, [0, 1], [0.95, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }

  const backgroundColor = clicked ? "#909090" : "#FF0000";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        backgroundColor,
        borderRadius: "4px",
        padding: "12px 24px",
        transform: `scale(${scale})`,
        transition: clicked ? "background-color 0.1s" : undefined,
      }}
    >
      <span
        style={{
          color: "white",
          fontSize: "24px",
          fontWeight: "bold",
          fontFamily: "Arial, sans-serif",
          letterSpacing: "0.5px",
        }}
      >
        SUBSCRIBE
      </span>
      <BellIcon shaking={clicked} />
    </div>
  );
};

// Main animation component
export const SubscribeButtonAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const buttonCenterX = width / 2;
  const buttonCenterY = height / 2;

  // Cursor position animation
  const cursorStartX = width / 2;
  const cursorStartY = height + 30;
  const cursorEndX = buttonCenterX + 20;
  const cursorEndY = buttonCenterY + 10;

  const moveProgress = spring({
    fps,
    frame,
    config: {
      damping: 50,
      stiffness: 100,
    },
    durationInFrames: TIMING.CURSOR_MOVE_END,
  });

  const cursorX = interpolate(
    Math.min(moveProgress, 1),
    [0, 1],
    [cursorStartX, cursorEndX],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const cursorY = interpolate(
    Math.min(moveProgress, 1),
    [0, 1],
    [cursorStartY, cursorEndY],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Determine cursor type and click state
  const isHovering = frame >= TIMING.CURSOR_CHANGE;
  const isClicked = frame >= TIMING.CLICK_FRAME;

  // Click animation (small downward movement)
  let clickOffsetY = 0;
  if (frame >= TIMING.CLICK_FRAME && frame < TIMING.CLICK_FRAME + 5) {
    clickOffsetY = interpolate(frame, [TIMING.CLICK_FRAME, TIMING.CLICK_FRAME + 2, TIMING.CLICK_FRAME + 5], [0, 3, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }

  // Generate stars for particle effect
  const stars = [];
  const numStars = 12;
  for (let i = 0; i < numStars; i++) {
    const angle = (i / numStars) * Math.PI * 2 + random(`star-angle-${i}`) * 0.5;
    const delay = Math.floor(random(`star-delay-${i}`) * 5);
    stars.push(
      <Star
        key={i}
        x={buttonCenterX}
        y={buttonCenterY}
        angle={angle}
        delay={delay}
        seed={`star-${i}`}
      />
    );
  }

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      {/* Subscribe Button */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SubscribeButton clicked={isClicked} />
      </AbsoluteFill>

      {/* Star particles */}
      {isClicked && stars}

      {/* Cursor */}
      <div
        style={{
          position: "absolute",
          left: cursorX,
          top: cursorY + clickOffsetY,
          transform: "translate(-2px, -2px)",
          zIndex: 100,
        }}
      >
        {isHovering ? <HandCursor /> : <ArrowCursor />}
      </div>
    </AbsoluteFill>
  );
};
