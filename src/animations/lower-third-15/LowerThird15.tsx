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
  // Phase 1: Entrance - split panels slide and reveal
  ENTRANCE_START: 0,
  ENTRANCE_DURATION: 45, // 1.5 seconds

  // Phase 2: Hold - subtle animations
  HOLD_START: 45,
  HOLD_DURATION: 90, // 3 seconds

  // Phase 3: Exit - panels slide apart and fade
  EXIT_START: 135,
  EXIT_DURATION: 45, // 1.5 seconds
};

// Text configuration
const PRIMARY_TEXT = "JOHN SMITH";
const SECONDARY_TEXT = "Lead Design Engineer";

// Visual configuration
const COLORS = {
  primary: "#FFFFFF", // White for primary text
  secondary: "#B0B0B0", // Medium gray for secondary text
  panelLeft: "#FF6B35", // Orange for left panel
  panelRight: "#004E89", // Blue for right panel
  accentLine: "#FFD23F", // Yellow accent line
  textBackground: "rgba(0, 0, 0, 0.8)", // Dark text background
};

const FONT_FAMILY = "Arial, Helvetica, sans-serif";
const FONT_WEIGHT_PRIMARY = "700";
const FONT_WEIGHT_SECONDARY = "400";
const FONT_SIZE_PRIMARY = 48;
const FONT_SIZE_SECONDARY = 24;

// Layout configuration
const LOWER_THIRD_LEFT_MARGIN = 80;
const LOWER_THIRD_BOTTOM_MARGIN = 120;
const VERTICAL_SPACING = 12;
const ACCENT_LINE_HEIGHT = 3;
const ACCENT_LINE_MARGIN_TOP = 16;
const PANEL_HEIGHT = 120;
const SPLIT_ANGLE = 15; // Diagonal split angle in degrees

export const LowerThird15: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calculate animation progress
  const entranceProgress = interpolate(
    frame,
    [TIMING.ENTRANCE_START, TIMING.ENTRANCE_START + TIMING.ENTRANCE_DURATION],
    [0, 1],
    { extrapolateRight: "clamp", easing: Easing.bezier(0.25, 0.46, 0.45, 0.94) }
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
    { extrapolateRight: "clamp", easing: Easing.bezier(0.55, 0.085, 0.68, 0.53) }
  );

  // Panel positions and opacity
  const leftPanelX = interpolate(
    entranceProgress,
    [0, 1],
    [-400, LOWER_THIRD_LEFT_MARGIN],
    { extrapolateRight: "clamp" }
  );

  const rightPanelX = interpolate(
    entranceProgress,
    [0, 1],
    [2320, LOWER_THIRD_LEFT_MARGIN + 600],
    { extrapolateRight: "clamp" }
  );

  const exitLeftPanelX = interpolate(
    exitProgress,
    [0, 1],
    [LOWER_THIRD_LEFT_MARGIN, -400],
    { extrapolateLeft: "clamp" }
  );

  const exitRightPanelX = interpolate(
    exitProgress,
    [0, 1],
    [LOWER_THIRD_LEFT_MARGIN + 600, 2320],
    { extrapolateLeft: "clamp" }
  );

  const finalLeftPanelX = exitProgress > 0 ? exitLeftPanelX : leftPanelX;
  const finalRightPanelX = exitProgress > 0 ? exitRightPanelX : rightPanelX;

  // Text opacity animations
  const textOpacity = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 20, TIMING.ENTRANCE_START + 40, TIMING.EXIT_START + 20, TIMING.EXIT_START + 35],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" }
  );

  // Accent line width animation
  const accentLineWidth = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 25, TIMING.ENTRANCE_START + 50],
    [0, 200],
    { extrapolateRight: "clamp" }
  );

  const accentLineExitWidth = interpolate(
    frame,
    [TIMING.EXIT_START + 10, TIMING.EXIT_START + 25],
    [200, 0],
    { extrapolateLeft: "clamp" }
  );

  const finalAccentLineWidth = exitProgress > 0 ? accentLineExitWidth : accentLineWidth;

  // Subtle float animation during hold
  const floatOffset = Math.sin(holdProgress * Math.PI * 4) * 3;

  // Diagonal clip path for the split effect
  const leftPanelStyle: React.CSSProperties = {
    position: "absolute",
    left: `${finalLeftPanelX}px`,
    bottom: `${LOWER_THIRD_BOTTOM_MARGIN + floatOffset}px`,
    width: "400px",
    height: `${PANEL_HEIGHT}px`,
    background: COLORS.panelLeft,
    clipPath: `polygon(0 0, 100% 0, 85% 100%, 0% 100%)`,
    transform: `skewX(${-SPLIT_ANGLE}deg)`,
    transformOrigin: "bottom left",
    display: "flex",
    alignItems: "center",
    paddingLeft: "30px",
    overflow: "hidden",
  };

  const rightPanelStyle: React.CSSProperties = {
    position: "absolute",
    left: `${finalRightPanelX}px`,
    bottom: `${LOWER_THIRD_BOTTOM_MARGIN + floatOffset}px`,
    width: "400px",
    height: `${PANEL_HEIGHT}px`,
    background: COLORS.panelRight,
    clipPath: `polygon(15% 0, 100% 0, 100% 100%, 0% 100%)`,
    transform: `skewX(${SPLIT_ANGLE}deg)`,
    transformOrigin: "bottom right",
    display: "flex",
    alignItems: "center",
    paddingLeft: "60px",
    overflow: "hidden",
  };

  const textContainerStyle: React.CSSProperties = {
    position: "absolute",
    left: `${LOWER_THIRD_LEFT_MARGIN + 20}px`,
    bottom: `${LOWER_THIRD_BOTTOM_MARGIN + 35 + floatOffset}px`,
    width: "700px",
    opacity: textOpacity,
    zIndex: 10,
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

  const accentLineStyle: React.CSSProperties = {
    position: "absolute",
    left: `${LOWER_THIRD_LEFT_MARGIN + 20}px`,
    bottom: `${LOWER_THIRD_BOTTOM_MARGIN + 30 + floatOffset}px`,
    width: `${finalAccentLineWidth}px`,
    height: `${ACCENT_LINE_HEIGHT}px`,
    background: COLORS.accentLine,
    zIndex: 5,
  };

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      {/* Left panel */}
      <div style={leftPanelStyle} />

      {/* Right panel */}
      <div style={rightPanelStyle} />

      {/* Accent line */}
      <div style={accentLineStyle} />

      {/* Text content */}
      <div style={textContainerStyle}>
        <h1 style={primaryTextStyle}>{PRIMARY_TEXT}</h1>
        <p style={secondaryTextStyle}>{SECONDARY_TEXT}</p>
      </div>
    </AbsoluteFill>
  );
};