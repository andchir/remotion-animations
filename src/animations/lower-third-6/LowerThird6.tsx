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
  // Phase 1: Entrance - line draws, then text slides up
  ENTRANCE_START: 0,
  ENTRANCE_DURATION: 50, // ~1.67 seconds

  // Phase 2: Hold - subtle breathing and glow effects
  HOLD_START: 50,
  HOLD_DURATION: 80, // ~2.67 seconds

  // Phase 3: Exit - text slides down, line retracts
  EXIT_START: 130,
  EXIT_DURATION: 50, // ~1.67 seconds
};

// Text configuration
const PRIMARY_TEXT = "JOHN SMITH";
const SECONDARY_TEXT = "Lead Design Engineer";

// Visual configuration - Minimalist emerald-mint theme
const COLORS = {
  primary: "#FFFFFF", // White for primary text
  secondary: "#D4E9E2", // Soft mint for secondary text
  accent: "#10B981", // Emerald green accent
  accentLight: "#34D399", // Light emerald
  accentDark: "#059669", // Dark emerald
  lineGradientStart: "#10B981",
  lineGradientMid: "#6EE7B7",
  lineGradientEnd: "#34D399",
  backgroundBox: "rgba(10, 20, 18, 0.88)", // Dark teal-black background
  glowColor: "#10B981",
};

const FONT_FAMILY = "Arial, Helvetica, sans-serif";
const FONT_WEIGHT_PRIMARY = "800";
const FONT_WEIGHT_SECONDARY = "500";
const FONT_SIZE_PRIMARY = 54;
const FONT_SIZE_SECONDARY = 26;

// Layout configuration
const LOWER_THIRD_LEFT_MARGIN = 100;
const LOWER_THIRD_BOTTOM_MARGIN = 110;
const LINE_HEIGHT = 3;
const LINE_MAX_WIDTH = 380;
const VERTICAL_GAP = 14;

export const LowerThird6: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // === ENTRANCE ANIMATIONS ===

  // Main container fade in
  const containerOpacity = interpolate(
    frame,
    [TIMING.ENTRANCE_START, TIMING.ENTRANCE_START + 12],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Horizontal line draws from center outward (split expansion)
  const lineProgress = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 5, TIMING.ENTRANCE_START + 30],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // Background panel slides in from left
  const bgSlideX = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 8, TIMING.ENTRANCE_START + 38],
    [-100, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  const bgOpacity = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 8, TIMING.ENTRANCE_START + 25],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Primary text slides up with mask reveal
  const primaryTextProgress = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 18, TIMING.ENTRANCE_START + 42],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );

  // Secondary text slides up with slight delay
  const secondaryTextProgress = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 26, TIMING.ENTRANCE_START + 48],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );

  // Left accent bracket reveal
  const bracketProgress = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 15, TIMING.ENTRANCE_START + 40],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.back(1.2)),
    }
  );

  // Right decorative dots reveal
  const dotsProgress = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 30, TIMING.ENTRANCE_START + 48],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );

  // === HOLD ANIMATIONS ===

  // Subtle breathing scale
  const breathingScale = interpolate(
    Math.sin((frame - TIMING.HOLD_START) / 35),
    [-1, 1],
    [0.995, 1.005],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Soft glow pulse
  const glowPulse = interpolate(
    Math.sin((frame - TIMING.HOLD_START) / 25),
    [-1, 1],
    [0.6, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Line gradient shimmer
  const shimmerOffset = interpolate(
    (frame - TIMING.HOLD_START) % 80,
    [0, 80],
    [-50, 150],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Dots pulse animation
  const dotsPulse = [0, 1, 2].map((i) =>
    interpolate(
      Math.sin((frame - TIMING.HOLD_START + i * 12) / 20),
      [-1, 1],
      [0.5, 1],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    )
  );

  // === EXIT ANIMATIONS ===

  // Line retracts to center
  const exitLineProgress = interpolate(
    frame,
    [TIMING.EXIT_START, TIMING.EXIT_START + 30],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  // Primary text slides down and fades
  const exitPrimaryProgress = interpolate(
    frame,
    [TIMING.EXIT_START + 5, TIMING.EXIT_START + 35],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.quad),
    }
  );

  // Secondary text exits first
  const exitSecondaryProgress = interpolate(
    frame,
    [TIMING.EXIT_START, TIMING.EXIT_START + 30],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.quad),
    }
  );

  // Background fades and slides
  const exitBgOpacity = interpolate(
    frame,
    [TIMING.EXIT_START + 15, TIMING.EXIT_START + TIMING.EXIT_DURATION],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  const exitBgSlideX = interpolate(
    frame,
    [TIMING.EXIT_START + 15, TIMING.EXIT_START + TIMING.EXIT_DURATION],
    [0, -80],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  // Container overall exit
  const exitContainerOpacity = interpolate(
    frame,
    [TIMING.EXIT_START + 30, TIMING.EXIT_START + TIMING.EXIT_DURATION],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // === COMBINED TRANSFORMATIONS ===

  const isInEntrance = frame < TIMING.HOLD_START;
  const isInHold = frame >= TIMING.HOLD_START && frame < TIMING.EXIT_START;
  const isInExit = frame >= TIMING.EXIT_START;

  const finalOpacity = isInEntrance
    ? containerOpacity
    : isInExit
    ? exitContainerOpacity
    : 1;

  const finalScale = isInHold ? breathingScale : 1;

  const currentLineProgress = isInExit ? exitLineProgress : lineProgress;

  const currentBgSlideX = isInExit ? exitBgSlideX : bgSlideX;
  const currentBgOpacity = isInExit ? exitBgOpacity : bgOpacity;

  // Text slide calculations
  const primarySlideY = isInEntrance
    ? interpolate(primaryTextProgress, [0, 1], [40, 0])
    : isInExit
    ? interpolate(exitPrimaryProgress, [0, 1], [0, 50])
    : 0;

  const primaryOpacity = isInEntrance
    ? primaryTextProgress
    : isInExit
    ? 1 - exitPrimaryProgress
    : 1;

  const secondarySlideY = isInEntrance
    ? interpolate(secondaryTextProgress, [0, 1], [30, 0])
    : isInExit
    ? interpolate(exitSecondaryProgress, [0, 1], [0, 40])
    : 0;

  const secondaryOpacity = isInEntrance
    ? secondaryTextProgress
    : isInExit
    ? 1 - exitSecondaryProgress
    : 1;

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
          transform: `scale(${finalScale})`,
          transformOrigin: "bottom left",
        }}
      >
        {/* Background panel */}
        <div
          style={{
            position: "absolute",
            left: -25,
            top: -20,
            right: -30,
            bottom: -20,
            background: COLORS.backgroundBox,
            borderRadius: "4px 12px 12px 4px",
            transform: `translateX(${currentBgSlideX}px)`,
            opacity: currentBgOpacity,
            boxShadow: `
              0 4px 30px rgba(0, 0, 0, 0.5),
              inset 0 0 40px rgba(16, 185, 129, 0.05)
            `,
            zIndex: -1,
          }}
        />

        {/* Left vertical accent bracket */}
        <div
          style={{
            position: "absolute",
            left: -35,
            top: -15,
            bottom: -15,
            width: 4,
            background: `linear-gradient(180deg,
              ${COLORS.accentLight} 0%,
              ${COLORS.accent} 50%,
              ${COLORS.accentDark} 100%)`,
            borderRadius: "2px",
            transform: `scaleY(${bracketProgress})`,
            transformOrigin: "center",
            boxShadow: isInHold
              ? `0 0 ${15 * glowPulse}px ${COLORS.glowColor}, 0 0 ${30 * glowPulse}px rgba(16, 185, 129, 0.3)`
              : `0 0 10px ${COLORS.glowColor}`,
            opacity: bracketProgress,
          }}
        />

        {/* Top decorative line (small) */}
        <div
          style={{
            position: "absolute",
            left: -25,
            top: -25,
            width: 50 * bracketProgress,
            height: 2,
            background: `linear-gradient(90deg,
              ${COLORS.accent} 0%,
              transparent 100%)`,
            borderRadius: "1px",
            opacity: bracketProgress * 0.7,
          }}
        />

        {/* Right decorative dots */}
        <div
          style={{
            position: "absolute",
            right: -50,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            opacity: dotsProgress,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: i === 1 ? 10 : 6,
                height: i === 1 ? 10 : 6,
                borderRadius: "50%",
                background: i === 1 ? COLORS.accent : COLORS.accentLight,
                opacity: isInHold ? dotsPulse[i] : 0.8,
                boxShadow: `0 0 ${(isInHold ? 8 * glowPulse : 6)}px ${COLORS.glowColor}`,
                transform: `scale(${dotsProgress})`,
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: `${VERTICAL_GAP}px`,
          }}
        >
          {/* Primary text (name) with mask reveal */}
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
                letterSpacing: "3px",
                lineHeight: 1.1,
                textTransform: "uppercase",
                transform: `translateY(${primarySlideY}px)`,
                opacity: primaryOpacity,
                textShadow: `
                  0 2px 10px rgba(0, 0, 0, 0.8),
                  0 0 ${isInHold ? 25 * glowPulse : 15}px rgba(16, 185, 129, ${isInHold ? glowPulse * 0.35 : 0.2})
                `,
              }}
            >
              {PRIMARY_TEXT}
            </div>
          </div>

          {/* Center divider line - draws from center */}
          <div
            style={{
              position: "relative",
              width: LINE_MAX_WIDTH,
              height: LINE_HEIGHT,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Line that expands from center */}
            <div
              style={{
                width: `${currentLineProgress * 100}%`,
                height: "100%",
                background: `linear-gradient(90deg,
                  transparent 0%,
                  ${COLORS.lineGradientStart} 10%,
                  ${COLORS.lineGradientMid} 50%,
                  ${COLORS.lineGradientEnd} 90%,
                  transparent 100%)`,
                borderRadius: "2px",
                boxShadow: isInHold
                  ? `0 0 ${12 * glowPulse}px ${COLORS.glowColor}`
                  : `0 0 8px ${COLORS.glowColor}`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Shimmer effect during hold */}
              {isInHold && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: `linear-gradient(90deg,
                      transparent 0%,
                      rgba(255, 255, 255, 0.4) 50%,
                      transparent 100%)`,
                    transform: `translateX(${shimmerOffset}%)`,
                  }}
                />
              )}
            </div>

            {/* Center accent dot */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) scale(${currentLineProgress})`,
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: COLORS.accent,
                boxShadow: `0 0 ${isInHold ? 10 * glowPulse : 8}px ${COLORS.glowColor}`,
                opacity: currentLineProgress > 0.3 ? 1 : 0,
              }}
            />
          </div>

          {/* Secondary text (title) with mask reveal */}
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
                letterSpacing: "1.5px",
                lineHeight: 1.2,
                transform: `translateY(${secondarySlideY}px)`,
                opacity: secondaryOpacity,
                textShadow: "0 2px 8px rgba(0, 0, 0, 0.8)",
              }}
            >
              {SECONDARY_TEXT}
            </div>
          </div>
        </div>

        {/* Bottom decorative line */}
        <div
          style={{
            position: "absolute",
            left: -25,
            bottom: -28,
            width: `${200 * currentLineProgress}px`,
            height: 2,
            background: `linear-gradient(90deg,
              ${COLORS.accentDark} 0%,
              ${COLORS.accent} 50%,
              transparent 100%)`,
            borderRadius: "1px",
            opacity: 0.6,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
