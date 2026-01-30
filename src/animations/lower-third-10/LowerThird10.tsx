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
  // Phase 1: Entrance - segmented strip reveal
  ENTRANCE_START: 0,
  ENTRANCE_DURATION: 45, // 1.5 seconds

  // Phase 2: Hold - sliding panels and gradient shifts
  HOLD_START: 45,
  HOLD_DURATION: 90, // 3 seconds

  // Phase 3: Exit - segmented disassembly
  EXIT_START: 135,
  EXIT_DURATION: 45, // 1.5 seconds
};

// Text configuration
const PRIMARY_TEXT = "JOHN SMITH";
const SECONDARY_TEXT = "Lead Design Engineer";

// Visual configuration - Modern flat design with electric blue theme
const COLORS = {
  primary: "#FFFFFF", // White for primary text
  secondary: "#E8F4F8", // Light blue-white for secondary text
  accent: "#0066FF", // Electric blue
  accentBright: "#00D9FF", // Bright cyan
  background: "#1A2332", // Dark blue-gray
  backgroundStrip: "rgba(26, 35, 50, 0.9)", // Slightly transparent version
  gradientStart: "#0066FF",
  gradientEnd: "#00D9FF",
};

const FONT_FAMILY = "Arial, Helvetica, sans-serif";
const FONT_WEIGHT_PRIMARY = "900";
const FONT_WEIGHT_SECONDARY = "600";
const FONT_SIZE_PRIMARY = 56;
const FONT_SIZE_SECONDARY = 28;

// Layout configuration
const LOWER_THIRD_LEFT_MARGIN = 80;
const LOWER_THIRD_BOTTOM_MARGIN = 120;
const STRIP_HEIGHT = 8;
const SEGMENT_SPACING = 4;

export const LowerThird10: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // === ENTRANCE ANIMATIONS ===

  // Vertical accent bar slides in from top
  const accentBarSlideY = interpolate(
    frame,
    [TIMING.ENTRANCE_START, TIMING.ENTRANCE_START + 25],
    [-200, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );

  // Background strips slide in from different positions
  const strip1SlideX = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 5, TIMING.ENTRANCE_START + 30],
    [-300, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  const strip2SlideX = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 10, TIMING.ENTRANCE_START + 35],
    [300, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  const strip3SlideX = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 15, TIMING.ENTRANCE_START + 40],
    [-250, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // Container opacity fade-in
  const containerOpacity = interpolate(
    frame,
    [TIMING.ENTRANCE_START, TIMING.ENTRANCE_START + 20],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // === HOLD ANIMATIONS ===

  // Sliding panel effect during hold
  const slidingPanelX = interpolate(
    (frame - TIMING.HOLD_START) % 120,
    [0, 120],
    [0, 50],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Gradient shift animation
  const gradientShift = interpolate(
    (frame - TIMING.HOLD_START) % 80,
    [0, 80],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Pulse effect on accent elements
  const pulseIntensity = interpolate(
    Math.sin((frame - TIMING.HOLD_START) / 25),
    [-1, 1],
    [0.8, 1.2],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // === EXIT ANIMATIONS ===

  // Exit opacity fade
  const exitOpacity = interpolate(
    frame,
    [TIMING.EXIT_START, TIMING.EXIT_START + TIMING.EXIT_DURATION],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  // Exit slide animations for strips (reverse of entrance)
  const strip1ExitX = interpolate(
    frame,
    [TIMING.EXIT_START + 5, TIMING.EXIT_START + 30],
    [0, -300],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  const strip2ExitX = interpolate(
    frame,
    [TIMING.EXIT_START + 10, TIMING.EXIT_START + 35],
    [0, 300],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  const strip3ExitX = interpolate(
    frame,
    [TIMING.EXIT_START + 15, TIMING.EXIT_START + 40],
    [0, -250],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  // === COMBINED TRANSFORMATIONS ===

  const isInEntrance = frame < TIMING.HOLD_START;
  const isInHold = frame >= TIMING.HOLD_START && frame < TIMING.EXIT_START;
  const isInExit = frame >= TIMING.EXIT_START;

  const finalOpacity = isInExit ? exitOpacity : containerOpacity;

  // Calculate final strip positions
  const strip1FinalX = isInEntrance ? strip1SlideX : isInExit ? strip1ExitX : slidingPanelX;
  const strip2FinalX = isInEntrance ? strip2SlideX : isInExit ? strip2ExitX : slidingPanelX * 0.8;
  const strip3FinalX = isInEntrance ? strip3SlideX : isInExit ? strip3ExitX : slidingPanelX * 1.2;

  // Text reveal animation
  const textRevealProgress = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 25, TIMING.ENTRANCE_START + 40],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );

  const textExitProgress = isInExit
    ? interpolate(
        frame,
        [TIMING.EXIT_START + 20, TIMING.EXIT_START + 35],
        [1, 0],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.in(Easing.quad),
        }
      )
    : 1;

  const finalTextOpacity = Math.min(textRevealProgress, textExitProgress) * finalOpacity;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-start",
      }}
    >
      {/* Lower third container */}
      <div
        style={{
          position: "absolute",
          left: LOWER_THIRD_LEFT_MARGIN,
          bottom: LOWER_THIRD_BOTTOM_MARGIN,
          opacity: finalOpacity,
        }}
      >
        {/* Vertical accent bar */}
        <div
          style={{
            position: "absolute",
            left: -40,
            top: -60,
            width: 6,
            height: 120,
            background: `linear-gradient(180deg, ${COLORS.gradientStart} 0%, ${COLORS.gradientEnd} 100%)`,
            transform: `translateY(${accentBarSlideY}px)`,
            boxShadow: isInHold
              ? `0 0 ${20 * pulseIntensity}px ${COLORS.accent}`
              : `0 0 10px ${COLORS.accent}`,
          }}
        />

        {/* Horizontal accent lines */}
        <div
          style={{
            position: "absolute",
            left: -40,
            top: -30,
            width: 30,
            height: 4,
            background: COLORS.accentBright,
            transform: `translateY(${accentBarSlideY * 0.8}px)`,
            opacity: finalOpacity,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -40,
            top: 30,
            width: 30,
            height: 4,
            background: COLORS.accentBright,
            transform: `translateY(${accentBarSlideY * 0.8}px)`,
            opacity: finalOpacity,
          }}
        />

        {/* Background strips */}
        <div
          style={{
            position: "absolute",
            left: -20,
            top: -20,
            width: 450,
            height: STRIP_HEIGHT,
            background: COLORS.backgroundStrip,
            transform: `translateX(${strip1FinalX}px)`,
            boxShadow: `0 4px 12px rgba(0, 0, 0, 0.3)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -20,
            top: STRIP_HEIGHT + SEGMENT_SPACING - 20,
            width: 420,
            height: STRIP_HEIGHT,
            background: `linear-gradient(90deg, ${COLORS.gradientStart} 0%, ${COLORS.gradientEnd} 100%)`,
            transform: `translateX(${strip2FinalX}px)`,
            boxShadow: `0 4px 12px rgba(0, 102, 255, 0.3)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -20,
            top: (STRIP_HEIGHT + SEGMENT_SPACING) * 2 - 20,
            width: 480,
            height: STRIP_HEIGHT,
            background: COLORS.backgroundStrip,
            transform: `translateX(${strip3FinalX}px)`,
            boxShadow: `0 4px 12px rgba(0, 0, 0, 0.3)`,
          }}
        />

        {/* Primary text container */}
        <div
          style={{
            marginTop: 40,
            marginBottom: 12,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: `${FONT_SIZE_PRIMARY}px`,
              fontWeight: FONT_WEIGHT_PRIMARY,
              color: COLORS.primary,
              letterSpacing: "3px",
              lineHeight: 1.2,
              textTransform: "uppercase",
              textShadow: `
                0 2px 8px rgba(0, 0, 0, 0.8),
                0 0 ${isInHold ? 15 * pulseIntensity : 10}px rgba(0, 102, 255, 0.6)
              `,
              opacity: finalTextOpacity,
              transform: `translateY(${isInEntrance ? 20 * (1 - textRevealProgress) : 0}px)`,
            }}
          >
            {PRIMARY_TEXT}
          </div>
        </div>

        {/* Secondary text container */}
        <div
          style={{
            overflow: "hidden",
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: `${FONT_SIZE_SECONDARY}px`,
              fontWeight: FONT_WEIGHT_SECONDARY,
              color: COLORS.secondary,
              letterSpacing: "1px",
              lineHeight: 1.3,
              textShadow: "0 2px 6px rgba(0, 0, 0, 0.8)",
              opacity: finalTextOpacity,
              transform: `translateY(${isInEntrance ? 15 * (1 - textRevealProgress) : 0}px)`,
            }}
          >
            {SECONDARY_TEXT}
          </div>
        </div>

        {/* Moving gradient overlay during hold */}
        {isInHold && (
          <div
            style={{
              position: "absolute",
              left: -40,
              top: -40,
              right: -40,
              bottom: -40,
              background: `linear-gradient(90deg, 
                transparent 0%, 
                rgba(0, 217, 255, ${0.1 * pulseIntensity}) 50%, 
                transparent 100%)`,
              transform: `translateX(${gradientShift * 100 - 50}px)`,
              pointerEvents: "none",
            }}
          />
        )}

        {/* Corner accent squares */}
        <div
          style={{
            position: "absolute",
            right: -30,
            top: -30,
            width: 12,
            height: 12,
            background: COLORS.accentBright,
            opacity: finalOpacity,
            boxShadow: isInHold
              ? `0 0 ${8 * pulseIntensity}px ${COLORS.accentBright}`
              : `0 0 4px ${COLORS.accentBright}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -30,
            bottom: 60,
            width: 8,
            height: 8,
            background: COLORS.accent,
            opacity: finalOpacity,
            boxShadow: isInHold
              ? `0 0 ${6 * pulseIntensity}px ${COLORS.accent}`
              : `0 0 3px ${COLORS.accent}`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};