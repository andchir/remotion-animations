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
  // Phase 1: Entrance - geometric reveal
  ENTRANCE_START: 0,
  ENTRANCE_DURATION: 50, // ~1.67 seconds

  // Phase 2: Hold - subtle geometric animations
  HOLD_START: 50,
  HOLD_DURATION: 80, // ~2.67 seconds

  // Phase 3: Exit - collapse and fade
  EXIT_START: 130,
  EXIT_DURATION: 50, // ~1.67 seconds
};

// Text configuration
const PRIMARY_TEXT = "JOHN SMITH";
const SECONDARY_TEXT = "Lead Design Engineer";

// Visual configuration - Modern orange/gold geometric theme
const COLORS = {
  primary: "#FFFFFF", // White for primary text
  secondary: "#FFE4CC", // Warm light cream for secondary text
  accent: "#FF8C42", // Vibrant orange accent
  accentLight: "#FFB347", // Light orange
  accentDark: "#E85D04", // Deep orange
  accentGold: "#FFC94D", // Gold highlight
  backgroundBox: "rgba(15, 10, 5, 0.9)", // Dark warm background
  glowColor: "#FF8C42",
};

const FONT_FAMILY = "Arial, Helvetica, sans-serif";
const FONT_WEIGHT_PRIMARY = "900";
const FONT_WEIGHT_SECONDARY = "500";
const FONT_SIZE_PRIMARY = 54;
const FONT_SIZE_SECONDARY = 26;

// Layout configuration
const LOWER_THIRD_LEFT_MARGIN = 100;
const LOWER_THIRD_BOTTOM_MARGIN = 110;

export const LowerThird3: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // === ENTRANCE ANIMATIONS ===

  // Main container reveal with scale and opacity
  const containerScale = interpolate(
    frame,
    [TIMING.ENTRANCE_START, TIMING.ENTRANCE_START + 30],
    [0.8, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.back(1.3)),
    }
  );

  const containerOpacity = interpolate(
    frame,
    [TIMING.ENTRANCE_START, TIMING.ENTRANCE_START + 15],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Diagonal geometric bar entrance (sweeps in from left)
  const diagonalBarProgress = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 5, TIMING.ENTRANCE_START + 35],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // Secondary geometric element (small accent shape)
  const accentShapeProgress = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 20, TIMING.ENTRANCE_START + 45],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.back(1.5)),
    }
  );

  // Text reveal with clip mask effect
  const primaryTextClip = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 15, TIMING.ENTRANCE_START + 40],
    [0, 100],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  const secondaryTextClip = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 25, TIMING.ENTRANCE_START + 48],
    [0, 100],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // === HOLD ANIMATIONS ===

  // Subtle skew pulse on diagonal bar
  const skewPulse = interpolate(
    Math.sin((frame - TIMING.HOLD_START) / 30),
    [-1, 1],
    [-2, 2],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Glow intensity pulse
  const glowIntensity = interpolate(
    Math.sin((frame - TIMING.HOLD_START) / 20),
    [-1, 1],
    [0.6, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Accent shape rotation
  const accentRotation = interpolate(
    (frame - TIMING.HOLD_START) % 120,
    [0, 120],
    [0, 360],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Color gradient shift
  const gradientShift = interpolate(
    (frame - TIMING.HOLD_START) % 60,
    [0, 60],
    [0, 100],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // === EXIT ANIMATIONS ===

  // Exit with collapse effect
  const exitScale = interpolate(
    frame,
    [TIMING.EXIT_START, TIMING.EXIT_START + TIMING.EXIT_DURATION],
    [1, 0.7],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

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

  const exitSlideX = interpolate(
    frame,
    [TIMING.EXIT_START, TIMING.EXIT_START + TIMING.EXIT_DURATION],
    [0, -150],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  // Diagonal bar exit (retracts)
  const exitBarProgress = interpolate(
    frame,
    [TIMING.EXIT_START, TIMING.EXIT_START + 30],
    [1, 0],
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

  const finalScale = isInEntrance
    ? containerScale
    : isInExit
    ? exitScale
    : 1;

  const finalOpacity = isInEntrance
    ? containerOpacity
    : isInExit
    ? exitOpacity
    : 1;

  const finalTranslateX = isInExit ? exitSlideX : 0;

  const finalSkew = isInHold ? skewPulse : 0;

  const barWidthMultiplier = isInExit ? exitBarProgress : diagonalBarProgress;

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
          transform: `translateX(${finalTranslateX}px) scale(${finalScale})`,
          opacity: finalOpacity,
          transformOrigin: "bottom left",
        }}
      >
        {/* Background box with skew */}
        <div
          style={{
            position: "absolute",
            left: -25,
            top: -20,
            right: -30,
            bottom: -20,
            background: COLORS.backgroundBox,
            borderRadius: "6px",
            transform: `skewX(${-8 + finalSkew}deg)`,
            transformOrigin: "bottom left",
            zIndex: -1,
            boxShadow: `
              0 4px 30px rgba(0, 0, 0, 0.5),
              inset 0 0 30px rgba(255, 140, 66, 0.05)
            `,
          }}
        />

        {/* Main diagonal accent bar */}
        <div
          style={{
            position: "absolute",
            left: -30,
            top: -25,
            width: `${380 * barWidthMultiplier}px`,
            height: 8,
            background: `linear-gradient(90deg,
              ${COLORS.accentDark} 0%,
              ${COLORS.accent} ${30 + gradientShift * 0.3}%,
              ${COLORS.accentGold} ${70 + gradientShift * 0.3}%,
              ${COLORS.accentLight} 100%)`,
            transform: `skewX(-45deg)`,
            transformOrigin: "left center",
            boxShadow: isInHold
              ? `0 0 ${25 * glowIntensity}px ${COLORS.glowColor}, 0 0 ${50 * glowIntensity}px rgba(255, 140, 66, 0.3)`
              : `0 0 15px ${COLORS.glowColor}`,
            borderRadius: "2px",
          }}
        />

        {/* Secondary thin line */}
        <div
          style={{
            position: "absolute",
            left: -25,
            bottom: -25,
            width: `${300 * barWidthMultiplier}px`,
            height: 3,
            background: `linear-gradient(90deg,
              ${COLORS.accent} 0%,
              ${COLORS.accentGold} 50%,
              transparent 100%)`,
            transform: `skewX(-45deg)`,
            transformOrigin: "left center",
            opacity: 0.8,
            borderRadius: "1px",
          }}
        />

        {/* Rotating accent diamond */}
        <div
          style={{
            position: "absolute",
            right: -45,
            top: "50%",
            width: 20,
            height: 20,
            background: `linear-gradient(135deg, ${COLORS.accentGold} 0%, ${COLORS.accent} 100%)`,
            transform: `translateY(-50%) rotate(${45 + (isInHold ? accentRotation * 0.25 : 0)}deg) scale(${accentShapeProgress})`,
            boxShadow: isInHold
              ? `0 0 ${15 * glowIntensity}px ${COLORS.accentGold}`
              : `0 0 8px ${COLORS.accentGold}`,
            opacity: accentShapeProgress,
          }}
        />

        {/* Small decorative dots */}
        <div
          style={{
            position: "absolute",
            left: -45,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            opacity: accentShapeProgress,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: COLORS.accent,
                opacity: isInHold
                  ? interpolate(
                      Math.sin((frame - TIMING.HOLD_START + i * 15) / 15),
                      [-1, 1],
                      [0.4, 1]
                    )
                  : 0.7,
                boxShadow: `0 0 6px ${COLORS.accent}`,
              }}
            />
          ))}
        </div>

        {/* Text content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            paddingLeft: 5,
          }}
        >
          {/* Primary text (name) with clip reveal */}
          <div
            style={{
              overflow: "hidden",
            }}
          >
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: `${FONT_SIZE_PRIMARY}px`,
                fontWeight: FONT_WEIGHT_PRIMARY,
                color: COLORS.primary,
                letterSpacing: "4px",
                lineHeight: 1.1,
                textTransform: "uppercase",
                clipPath: `inset(0 ${100 - primaryTextClip}% 0 0)`,
                textShadow: `
                  0 2px 10px rgba(0, 0, 0, 0.9),
                  0 0 40px rgba(255, 140, 66, ${isInHold ? glowIntensity * 0.3 : 0.15})
                `,
              }}
            >
              {PRIMARY_TEXT}
            </div>
          </div>

          {/* Secondary text (title/position) with clip reveal */}
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
                letterSpacing: "2px",
                lineHeight: 1.2,
                clipPath: `inset(0 ${100 - secondaryTextClip}% 0 0)`,
                textShadow: "0 2px 8px rgba(0, 0, 0, 0.9)",
              }}
            >
              {SECONDARY_TEXT}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
