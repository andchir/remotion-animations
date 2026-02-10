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
  // Phase 1: Entrance - cube rotation and grid formation
  ENTRANCE_START: 0,
  ENTRANCE_DURATION: 60, // 2 seconds

  // Phase 2: Hold - subtle cube rotation and grid pulse
  HOLD_START: 60,
  HOLD_DURATION: 90, // 3 seconds

  // Phase 3: Exit - cube collapse and grid dissolution
  EXIT_START: 150,
  EXIT_DURATION: 30, // 1 second
};

// Text configuration
const PRIMARY_TEXT = "JOHN SMITH";
const SECONDARY_TEXT = "Lead Design Engineer";

// Visual configuration
const COLORS = {
  primary: "#FFFFFF", // White for primary text
  secondary: "#A0A0A0", // Gray for secondary text
  cubePrimary: "#6C63FF", // Purple for primary cube face
  cubeSecondary: "#FF6B6B", // Red for secondary cube face
  cubeTertiary: "#4ECDC4", // Teal for tertiary cube face
  gridLines: "#333333", // Dark gray for grid lines
  accentNode: "#FFD93D", // Yellow for grid intersection nodes
  backgroundPanel: "rgba(0, 0, 0, 0.9)", // Dark background
};

const FONT_FAMILY = "Arial, Helvetica, sans-serif";
const FONT_WEIGHT_PRIMARY = "700";
const FONT_WEIGHT_SECONDARY = "500";
const FONT_SIZE_PRIMARY = 42;
const FONT_SIZE_SECONDARY = 20;

// Layout configuration
const LOWER_THIRD_LEFT_MARGIN = 100;
const LOWER_THIRD_BOTTOM_MARGIN = 140;
const VERTICAL_SPACING = 8;
const GRID_SIZE = 20;
const CUBE_SIZE = 80;
const GRID_LINE_WIDTH = 1;

export const LowerThird17: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calculate animation progress
  const entranceProgress = interpolate(
    frame,
    [TIMING.ENTRANCE_START, TIMING.ENTRANCE_START + TIMING.ENTRANCE_DURATION],
    [0, 1],
    { extrapolateRight: "clamp", easing: Easing.bezier(0.34, 1.56, 0.64, 1) }
  );

  const holdProgress = interpolate(
    frame,
    [TIMING.HOLD_START, TIMING.HOLD_START + TIMING.HOLD_DURATION],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  const exitProgress = interpolate(
    frame,
    [TIMING.EXIT_START, TIMING.EXIT_START + TIMING.EXIT_DURATION],
    [0, 1],
    { extrapolateRight: "clamp", easing: Easing.bezier(0.77, 0, 0.175, 1) }
  );

  // Cube rotation animations
  const cubeRotationY = interpolate(
    entranceProgress,
    [0, 1],
    [-90, 0],
    { extrapolateRight: "clamp" }
  );

  const exitRotationY = interpolate(
    exitProgress,
    [0, 1],
    [0, 90],
    { extrapolateLeft: "clamp" }
  );

  const finalRotationY = exitProgress > 0 ? exitRotationY : cubeRotationY;

  // Subtle cube rotation during hold
  const holdRotation = Math.sin(holdProgress * Math.PI * 2) * 5;

  // Grid opacity animations
  const gridOpacity = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 10, TIMING.ENTRANCE_START + 40, TIMING.EXIT_START + 5, TIMING.EXIT_START + 25],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" }
  );

  // Text opacity animations
  const textOpacity = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 35, TIMING.ENTRANCE_START + 55, TIMING.EXIT_START + 5, TIMING.EXIT_START + 20],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" }
  );

  // Background panel scale
  const panelScale = interpolate(
    entranceProgress,
    [0, 0.5, 1],
    [0, 1.1, 1],
    { extrapolateRight: "clamp" }
  );

  // Grid node pulse during hold
  const nodePulse = Math.sin(holdProgress * Math.PI * 4) * 0.3 + 0.7;

  const backgroundPanelStyle: React.CSSProperties = {
    position: "absolute",
    left: `${LOWER_THIRD_LEFT_MARGIN}px`,
    bottom: `${LOWER_THIRD_BOTTOM_MARGIN}px`,
    width: "600px",
    height: "80px",
    background: COLORS.backgroundPanel,
    transform: `scale(${panelScale})`,
    transformOrigin: "bottom left",
    opacity: gridOpacity,
  };

  // Generate grid lines
  const generateGridLines = () => {
    const lines = [];
    const gridWidth = 600;
    const gridHeight = 80;
    const numVerticalLines = Math.floor(gridWidth / GRID_SIZE);
    const numHorizontalLines = Math.floor(gridHeight / GRID_SIZE);

    // Vertical lines
    for (let i = 0; i <= numVerticalLines; i++) {
      const opacity = interpolate(
        frame,
        [TIMING.ENTRANCE_START + 15 + i * 2, TIMING.ENTRANCE_START + 25 + i * 2, TIMING.EXIT_START + 10, TIMING.EXIT_START + 20],
        [0, 1, 1, 0],
        { extrapolateRight: "clamp" }
      );
      
      lines.push(
        <div
          key={`v-${i}`}
          style={{
            position: "absolute" as const,
            left: `${LOWER_THIRD_LEFT_MARGIN + i * GRID_SIZE}px`,
            bottom: `${LOWER_THIRD_BOTTOM_MARGIN}px`,
            width: `${GRID_LINE_WIDTH}px`,
            height: `${gridHeight}px`,
            background: COLORS.gridLines,
            opacity: opacity * gridOpacity,
          }}
        />
      );
    }

    // Horizontal lines
    for (let i = 0; i <= numHorizontalLines; i++) {
      const opacity = interpolate(
        frame,
        [TIMING.ENTRANCE_START + 15 + i * 2, TIMING.ENTRANCE_START + 25 + i * 2, TIMING.EXIT_START + 10, TIMING.EXIT_START + 20],
        [0, 1, 1, 0],
        { extrapolateRight: "clamp" }
      );
      
      lines.push(
        <div
          key={`h-${i}`}
          style={{
            position: "absolute" as const,
            left: `${LOWER_THIRD_LEFT_MARGIN}px`,
            bottom: `${LOWER_THIRD_BOTTOM_MARGIN + i * GRID_SIZE}px`,
            width: `${gridWidth}px`,
            height: `${GRID_LINE_WIDTH}px`,
            background: COLORS.gridLines,
            opacity: opacity * gridOpacity,
          }}
        />
      );
    }

    return lines;
  };

  // Generate grid intersection nodes
  const generateGridNodes = () => {
    const nodes = [];
    const gridWidth = 600;
    const gridHeight = 80;
    const numVerticalNodes = Math.floor(gridWidth / GRID_SIZE);
    const numHorizontalNodes = Math.floor(gridHeight / GRID_SIZE);

    for (let i = 0; i <= numVerticalNodes; i += 2) {
      for (let j = 0; j <= numHorizontalNodes; j += 2) {
        const nodeOpacity = interpolate(
          frame,
          [TIMING.ENTRANCE_START + 30 + (i + j) * 0.5, TIMING.ENTRANCE_START + 40 + (i + j) * 0.5, TIMING.EXIT_START + 5, TIMING.EXIT_START + 20],
          [0, 1, 1, 0],
          { extrapolateRight: "clamp" }
        );

        nodes.push(
          <div
            key={`node-${i}-${j}`}
            style={{
              position: "absolute" as const,
              left: `${LOWER_THIRD_LEFT_MARGIN + i * GRID_SIZE - 2}px`,
              bottom: `${LOWER_THIRD_BOTTOM_MARGIN + j * GRID_SIZE - 2}px`,
              width: "4px",
              height: "4px",
              background: COLORS.accentNode,
              opacity: nodeOpacity * nodePulse,
            }}
          />
        );
      }
    }

    return nodes;
  };

  // Cube faces
  const cubeFaceStyle = (color: string, translateX: number, translateZ: number) => ({
    position: "absolute" as const,
    left: `${LOWER_THIRD_LEFT_MARGIN + CUBE_SIZE/2 - 300}px`,
    bottom: `${LOWER_THIRD_BOTTOM_MARGIN + 40}px`,
    width: `${CUBE_SIZE}px`,
    height: `${CUBE_SIZE}px`,
    background: color,
    transform: `rotateY(${finalRotationY + holdRotation}deg) translateX(${translateX}px) translateZ(${translateZ}px)`,
    transformStyle: "preserve-3d" as const,
    opacity: interpolate(
      frame,
      [TIMING.ENTRANCE_START + 20, TIMING.ENTRANCE_START + 45, TIMING.EXIT_START + 5, TIMING.EXIT_START + 20],
      [0, 1, 1, 0],
      { extrapolateRight: "clamp" }
    ),
  });

  const textContainerStyle: React.CSSProperties = {
    position: "absolute",
    left: `${LOWER_THIRD_LEFT_MARGIN + 120}px`,
    bottom: `${LOWER_THIRD_BOTTOM_MARGIN + 20}px`,
    width: "450px",
    opacity: textOpacity,
  };

  const primaryTextStyle: React.CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontWeight: FONT_WEIGHT_PRIMARY,
    fontSize: `${FONT_SIZE_PRIMARY}px`,
    color: COLORS.primary,
    margin: 0,
    marginBottom: VERTICAL_SPACING,
    textTransform: "uppercase",
    letterSpacing: "2px",
  };

  const secondaryTextStyle: React.CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontWeight: FONT_WEIGHT_SECONDARY,
    fontSize: `${FONT_SIZE_SECONDARY}px`,
    color: COLORS.secondary,
    margin: 0,
    textTransform: "uppercase",
    letterSpacing: "1px",
  };

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent", perspective: "1000px" }}>
      {/* Background panel */}
      <div style={backgroundPanelStyle} />

      {/* Grid lines */}
      {generateGridLines()}

      {/* Grid intersection nodes */}
      {generateGridNodes()}

      {/* 3D Cube faces */}
      <div style={cubeFaceStyle(COLORS.cubePrimary, 0, 0)} />
      <div style={cubeFaceStyle(COLORS.cubeSecondary, CUBE_SIZE/2, CUBE_SIZE/2)} />
      <div style={cubeFaceStyle(COLORS.cubeTertiary, -CUBE_SIZE/2, -CUBE_SIZE/2)} />

      {/* Text content */}
      <div style={textContainerStyle}>
        <h1 style={primaryTextStyle}>{PRIMARY_TEXT}</h1>
        <p style={secondaryTextStyle}>{SECONDARY_TEXT}</p>
      </div>
    </AbsoluteFill>
  );
};