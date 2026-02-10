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
  // Phase 1: Entrance - progressive line build
  ENTRANCE_START: 0,
  ENTRANCE_DURATION: 60, // 2 seconds

  // Phase 2: Hold - circuit animations
  HOLD_START: 60,
  HOLD_DURATION: 90, // 3 seconds

  // Phase 3: Exit - line disassembly
  EXIT_START: 150,
  EXIT_DURATION: 30, // 1 second
};

// Text configuration
const PRIMARY_TEXT = "JOHN SMITH";
const SECONDARY_TEXT = "Lead Design Engineer";

// Visual configuration
const COLORS = {
  primary: "#FFFFFF", // White for primary text
  secondary: "#C0C0C0", // Light gray for secondary text
  primaryCircuit: "#00F5FF", // Cyan for primary circuit lines
  secondaryCircuit: "#FF6B9D", // Pink for secondary circuit lines
  accentNode: "#FFD93D", // Yellow for circuit nodes
  backgroundPanel: "rgba(0, 0, 0, 0.85)", // Dark background panel
};

const FONT_FAMILY = "Arial, Helvetica, sans-serif";
const FONT_WEIGHT_PRIMARY = "600";
const FONT_WEIGHT_SECONDARY = "400";
const FONT_SIZE_PRIMARY = 44;
const FONT_SIZE_SECONDARY = 22;

// Layout configuration
const LOWER_THIRD_LEFT_MARGIN = 80;
const LOWER_THIRD_BOTTOM_MARGIN = 120;
const VERTICAL_SPACING = 10;
const CIRCUIT_LINE_WIDTH = 2;
const NODE_SIZE = 6;

export const LowerThird16: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calculate animation progress
  const entranceProgress = interpolate(
    frame,
    [TIMING.ENTRANCE_START, TIMING.ENTRANCE_START + TIMING.ENTRANCE_DURATION],
    [0, 1],
    { extrapolateRight: "clamp", easing: Easing.bezier(0.23, 1, 0.32, 1) }
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
    { extrapolateRight: "clamp", easing: Easing.bezier(0.8, 0, 0.9, 0.5) }
  );

  // Background panel animation
  const panelScale = interpolate(
    entranceProgress,
    [0, 0.3, 1],
    [0, 1.1, 1],
    { extrapolateRight: "clamp" }
  );

  const panelOpacity = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 15, TIMING.ENTRANCE_START + 30, TIMING.EXIT_START + 10, TIMING.EXIT_START + 25],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" }
  );

  // Circuit line animations - progressive build
  const horizontalLine1Width = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 10, TIMING.ENTRANCE_START + 25, TIMING.EXIT_START + 5, TIMING.EXIT_START + 20],
    [0, 400, 400, 0],
    { extrapolateRight: "clamp" }
  );

  const verticalLine1Height = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 20, TIMING.ENTRANCE_START + 35, TIMING.EXIT_START + 8, TIMING.EXIT_START + 23],
    [0, 100, 100, 0],
    { extrapolateRight: "clamp" }
  );

  const horizontalLine2Width = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 30, TIMING.ENTRANCE_START + 45, TIMING.EXIT_START + 12, TIMING.EXIT_START + 27],
    [0, 350, 350, 0],
    { extrapolateRight: "clamp" }
  );

  const verticalLine2Height = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 40, TIMING.ENTRANCE_START + 55, TIMING.EXIT_START + 15, TIMING.EXIT_START + 28],
    [0, 80, 80, 0],
    { extrapolateRight: "clamp" }
  );

  // Text opacity animations
  const textOpacity = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 45, TIMING.ENTRANCE_START + 60, TIMING.EXIT_START + 5, TIMING.EXIT_START + 20],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" }
  );

  // Circuit node pulse animation during hold
  const nodePulse = Math.sin(holdProgress * Math.PI * 6) * 0.5 + 0.5;

  // Data flow animation
  const dataFlowPosition = (holdProgress * 300) % 300;

  const backgroundPanelStyle: React.CSSProperties = {
    position: "absolute",
    left: `${LOWER_THIRD_LEFT_MARGIN}px`,
    bottom: `${LOWER_THIRD_BOTTOM_MARGIN}px`,
    width: "650px",
    height: "100px",
    background: COLORS.backgroundPanel,
    transform: `scale(${panelScale})`,
    transformOrigin: "bottom left",
    opacity: panelOpacity,
    clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 100%, 20px 100%)",
  };

  const circuitLineStyle = (width: number, height: number, color: string, x: number, y: number, horizontal: boolean) => ({
    position: "absolute" as const,
    left: `${LOWER_THIRD_LEFT_MARGIN + x}px`,
    bottom: `${LOWER_THIRD_BOTTOM_MARGIN + y}px`,
    width: horizontal ? `${width}px` : `${CIRCUIT_LINE_WIDTH}px`,
    height: horizontal ? `${CIRCUIT_LINE_WIDTH}px` : `${height}px`,
    background: color,
    opacity: 0.9,
  });

  const nodeStyle = (x: number, y: number, delay: number) => {
    const nodeScale = interpolate(
      frame,
      [TIMING.ENTRANCE_START + delay, TIMING.ENTRANCE_START + delay + 10],
      [0, 1],
      { extrapolateRight: "clamp" }
    );
    
    return {
      position: "absolute" as const,
      left: `${LOWER_THIRD_LEFT_MARGIN + x - NODE_SIZE/2}px`,
      bottom: `${LOWER_THIRD_BOTTOM_MARGIN + y - NODE_SIZE/2}px`,
      width: `${NODE_SIZE}px`,
      height: `${NODE_SIZE}px`,
      background: COLORS.accentNode,
      transform: `scale(${nodeScale * (1 + nodePulse * 0.3)})`,
      opacity: interpolate(
        frame,
        [TIMING.ENTRANCE_START + delay, TIMING.ENTRANCE_START + delay + 10, TIMING.EXIT_START + 5, TIMING.EXIT_START + 20],
        [0, 1, 1, 0],
        { extrapolateRight: "clamp" }
      ),
    };
  };

  const dataFlowStyle = (progress: number) => ({
    position: "absolute" as const,
    left: `${LOWER_THIRD_LEFT_MARGIN + progress}px`,
    bottom: `${LOWER_THIRD_BOTTOM_MARGIN + 85}px`,
    width: "20px",
    height: "3px",
    background: COLORS.accentNode,
    opacity: interpolate(
      frame,
      [TIMING.HOLD_START + 30, TIMING.HOLD_START + 120],
      [0, 1],
      { extrapolateRight: "clamp" }
    ),
  });

  const textContainerStyle: React.CSSProperties = {
    position: "absolute",
    left: `${LOWER_THIRD_LEFT_MARGIN + 40}px`,
    bottom: `${LOWER_THIRD_BOTTOM_MARGIN + 25}px`,
    width: "600px",
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
    letterSpacing: "1px",
  };

  const secondaryTextStyle: React.CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontWeight: FONT_WEIGHT_SECONDARY,
    fontSize: `${FONT_SIZE_SECONDARY}px`,
    color: COLORS.secondary,
    margin: 0,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  };

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      {/* Background panel with slanted right edge */}
      <div style={backgroundPanelStyle} />

      {/* Circuit lines - progressive build */}
      <div style={circuitLineStyle(horizontalLine1Width, CIRCUIT_LINE_WIDTH, COLORS.primaryCircuit, 20, 85, true)} />
      <div style={circuitLineStyle(CIRCUIT_LINE_WIDTH, verticalLine1Height, COLORS.primaryCircuit, 20, 0, false)} />
      <div style={circuitLineStyle(horizontalLine2Width, CIRCUIT_LINE_WIDTH, COLORS.secondaryCircuit, 420, 25, true)} />
      <div style={circuitLineStyle(CIRCUIT_LINE_WIDTH, verticalLine2Height, COLORS.secondaryCircuit, 420, 0, false)} />

      {/* Circuit nodes */}
      <div style={nodeStyle(20, 85, 15)} />
      <div style={nodeStyle(20, 0, 15)} />
      <div style={nodeStyle(420, 85, 35)} />
      <div style={nodeStyle(420, 0, 35)} />
      <div style={nodeStyle(770, 85, 45)} />
      <div style={nodeStyle(770, 0, 45)} />

      {/* Data flow animation during hold */}
      {holdProgress > 0.2 && <div style={dataFlowStyle(dataFlowPosition)} />}

      {/* Text content */}
      <div style={textContainerStyle}>
        <h1 style={primaryTextStyle}>{PRIMARY_TEXT}</h1>
        <p style={secondaryTextStyle}>{SECONDARY_TEXT}</p>
      </div>
    </AbsoluteFill>
  );
};