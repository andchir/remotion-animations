import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";

// Animation timing configuration (in frames, at 30fps)
const TIMING = {
  // Phase 1: Entrance - rectangles slide in and assemble
  ENTRANCE_START: 0,
  ENTRANCE_DURATION: 60, // 2 seconds

  // Phase 2: Hold - subtle pulsing effect
  HOLD_START: 60,
  HOLD_DURATION: 60, // 2 seconds

  // Phase 3: Exit - rectangles split and slide out
  EXIT_START: 120,
  EXIT_DURATION: 60, // 2 seconds
};

// Configuration constants
const MAIN_TEXT = "YOU TEXT HERE";
const SUBTITLE_TEXT = "Your caption here";

// Rectangle colors - vibrant gradient palette
const RECTANGLE_COLORS = [
  "#FF6B6B", // Coral Red
  "#4ECDC4", // Turquoise
  "#45B7D1", // Sky Blue
  "#FFA07A", // Light Salmon
  "#98D8C8", // Mint
];

const FONT_SIZE_MAIN = 92;
const FONT_SIZE_SUBTITLE = 42;
const FONT_FAMILY = "Arial, Helvetica, sans-serif";
const FONT_WEIGHT_MAIN = "900";
const FONT_WEIGHT_SUBTITLE = "700";

// Rectangle configuration
const RECT_WIDTH = 420;
const RECT_HEIGHT = 200;
const RECT_SPACING = 20;

interface RectangleProps {
  index: number;
  frame: number;
  fps: number;
  color: string;
}

const Rectangle: React.FC<RectangleProps> = ({ index, frame, fps, color }) => {
  // Determine entry direction based on index
  const entryDirections = [
    { x: -1, y: 0 },  // From left
    { x: 1, y: 0 },   // From right
    { x: 0, y: -1 },  // From top
    { x: 0, y: 1 },   // From bottom
    { x: -1, y: -1 }, // From top-left
  ];

  const direction = entryDirections[index % entryDirections.length];
  const delay = index * 8;

  // Entrance animation
  const entranceProgress = interpolate(
    frame,
    [TIMING.ENTRANCE_START + delay, TIMING.ENTRANCE_START + delay + 40],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // Exit animation
  const exitProgress = interpolate(
    frame,
    [TIMING.EXIT_START + delay, TIMING.EXIT_START + delay + 40],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  // Hold phase - subtle breathing effect
  const breathingScale = interpolate(
    Math.sin(((frame - TIMING.HOLD_START + index * 10) / 30) * Math.PI),
    [-1, 1],
    [0.98, 1.02]
  );

  // Calculate position offsets
  const entryOffsetX = direction.x * 1500;
  const entryOffsetY = direction.y * 1000;
  const exitOffsetX = -direction.x * 1500;
  const exitOffsetY = -direction.y * 1000;

  // Position calculations
  const translateX =
    frame < TIMING.HOLD_START
      ? interpolate(entranceProgress, [0, 1], [entryOffsetX, 0])
      : frame < TIMING.EXIT_START
      ? 0
      : interpolate(exitProgress, [0, 1], [0, exitOffsetX]);

  const translateY =
    frame < TIMING.HOLD_START
      ? interpolate(entranceProgress, [0, 1], [entryOffsetY, 0])
      : frame < TIMING.EXIT_START
      ? 0
      : interpolate(exitProgress, [0, 1], [0, exitOffsetY]);

  // Scale
  const scale =
    frame < TIMING.HOLD_START
      ? interpolate(entranceProgress, [0, 1], [0.3, 1])
      : frame < TIMING.EXIT_START
      ? breathingScale
      : interpolate(exitProgress, [0, 1], [1, 0.3]);

  // Opacity
  const opacity =
    frame < TIMING.HOLD_START
      ? interpolate(entranceProgress, [0, 0.5, 1], [0, 0.7, 1])
      : frame < TIMING.EXIT_START
      ? 1
      : interpolate(exitProgress, [0, 1], [1, 0]);

  // Rotation during entrance and exit
  const rotation =
    frame < TIMING.HOLD_START
      ? interpolate(entranceProgress, [0, 1], [45, 0])
      : frame < TIMING.EXIT_START
      ? 0
      : interpolate(exitProgress, [0, 1], [0, -45]);

  return (
    <div
      style={{
        position: "absolute",
        width: `${RECT_WIDTH}px`,
        height: `${RECT_HEIGHT}px`,
        backgroundColor: color,
        transform: `translate(${translateX}px, ${translateY}px) scale(${scale}) rotate(${rotation}deg)`,
        opacity: opacity,
        transformOrigin: "center center",
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
      }}
    />
  );
};

export const TextAnimation4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Text entrance - slight delay after rectangles start
  const textEntranceProgress = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 25, TIMING.ENTRANCE_START + 55],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.back(1.2)),
    }
  );

  // Text exit
  const textExitProgress = interpolate(
    frame,
    [TIMING.EXIT_START, TIMING.EXIT_START + 35],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  // Text opacity
  const textOpacity =
    frame < TIMING.EXIT_START
      ? interpolate(textEntranceProgress, [0, 0.6, 1], [0, 0.7, 1])
      : interpolate(textExitProgress, [0, 1], [1, 0]);

  // Text scale
  const textScale =
    frame < TIMING.HOLD_START
      ? interpolate(textEntranceProgress, [0, 1], [0.5, 1])
      : frame < TIMING.EXIT_START
      ? 1
      : interpolate(textExitProgress, [0, 1], [1, 1.3]);

  // Subtle text animation during hold
  const textFloat =
    frame >= TIMING.HOLD_START && frame < TIMING.EXIT_START
      ? Math.sin((frame - TIMING.HOLD_START) / 20) * 5
      : 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Rectangles layer */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {RECTANGLE_COLORS.map((color, index) => (
          <Rectangle
            key={index}
            index={index}
            frame={frame}
            fps={fps}
            color={color}
          />
        ))}
      </div>

      {/* Text layer with cut-out effect using mix-blend-mode */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mixBlendMode: "difference",
          transform: `translateY(${textFloat}px) scale(${textScale})`,
          opacity: textOpacity,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "30px",
          }}
        >
          {/* Main text */}
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: `${FONT_SIZE_MAIN}px`,
              fontWeight: FONT_WEIGHT_MAIN,
              color: "#FFFFFF",
              letterSpacing: "8px",
              textAlign: "center",
              textTransform: "uppercase",
              filter: "brightness(2)",
            }}
          >
            {MAIN_TEXT}
          </div>

          {/* Subtitle text */}
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: `${FONT_SIZE_SUBTITLE}px`,
              fontWeight: FONT_WEIGHT_SUBTITLE,
              color: "#FFFFFF",
              letterSpacing: "4px",
              textAlign: "center",
              filter: "brightness(2)",
            }}
          >
            {SUBTITLE_TEXT}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
