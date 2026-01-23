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
  // Phase 1: Entrance - slide up and reveal
  ENTRANCE_START: 0,
  ENTRANCE_DURATION: 50, // ~1.67 seconds

  // Phase 2: Hold - subtle animations
  HOLD_START: 50,
  HOLD_DURATION: 80, // ~2.67 seconds

  // Phase 3: Exit - slide down and fade
  EXIT_START: 130,
  EXIT_DURATION: 50, // ~1.67 seconds
};

// Text configuration
const PRIMARY_TEXT = "JOHN SMITH";
const SECONDARY_TEXT = "Lead Design Engineer";

// Visual configuration - Modern purple/pink gradient theme
const COLORS = {
  primary: "#FFFFFF", // White for primary text
  secondary: "#F0F0F0", // Light gray for secondary text
  accent: "#FF6B9D", // Pink accent
  accentGradientStart: "#C850C0", // Purple
  accentGradientEnd: "#FFCC70", // Golden yellow
  backgroundBox: "rgba(20, 20, 35, 0.85)", // Dark blue-gray background
  glowColor: "#FF6B9D",
};

const FONT_FAMILY = "Arial, Helvetica, sans-serif";
const FONT_WEIGHT_PRIMARY = "900";
const FONT_WEIGHT_SECONDARY = "500";
const FONT_SIZE_PRIMARY = 52;
const FONT_SIZE_SECONDARY = 26;

// Layout configuration
const LOWER_THIRD_LEFT_MARGIN = 100;
const LOWER_THIRD_BOTTOM_MARGIN = 100;
const BOX_PADDING = 20;
const ACCENT_BOX_SIZE = 6;

export const LowerThird2: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // === ENTRANCE ANIMATIONS ===

  // Main container slide-in from bottom
  const containerSlideY = interpolate(
    frame,
    [TIMING.ENTRANCE_START, TIMING.ENTRANCE_START + TIMING.ENTRANCE_DURATION],
    [150, 0],
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

  // Accent box slide-in animation (comes in from left)
  const accentBoxSlideX = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 10, TIMING.ENTRANCE_START + 35],
    [-100, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.back(1.2)),
    }
  );

  // Text reveal stagger
  const primaryTextProgress = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 15, TIMING.ENTRANCE_START + 40],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );

  const secondaryTextProgress = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 25, TIMING.ENTRANCE_START + 45],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );

  // === HOLD ANIMATIONS ===

  // Subtle breathing scale animation
  const breathingScale = interpolate(
    Math.sin((frame - TIMING.HOLD_START) / 25),
    [-1, 1],
    [0.98, 1.02],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Glow pulse effect
  const glowIntensity = interpolate(
    Math.sin((frame - TIMING.HOLD_START) / 20),
    [-1, 1],
    [0.5, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Gradient animation (shifts colors)
  const gradientOffset = interpolate(
    (frame - TIMING.HOLD_START) % 90,
    [0, 90],
    [0, 100],
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

  // Exit slide down
  const exitSlideY = interpolate(
    frame,
    [TIMING.EXIT_START, TIMING.EXIT_START + TIMING.EXIT_DURATION],
    [0, 200],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.back(1.5)),
    }
  );

  // === COMBINED TRANSFORMATIONS ===

  const isInEntrance = frame < TIMING.HOLD_START;
  const isInHold = frame >= TIMING.HOLD_START && frame < TIMING.EXIT_START;
  const isInExit = frame >= TIMING.EXIT_START;

  const finalTranslateY = isInEntrance
    ? containerSlideY
    : isInExit
    ? exitSlideY
    : 0;

  const finalOpacity = isInEntrance
    ? containerOpacity
    : isInExit
    ? exitOpacity
    : 1;

  const finalScale = isInHold ? breathingScale : 1;

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
          transform: `translateY(${finalTranslateY}px) scale(${finalScale})`,
          opacity: finalOpacity,
          transformOrigin: "bottom left",
        }}
      >
        {/* Main content box */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: `${BOX_PADDING}px`,
          }}
        >
          {/* Vertical accent bar with gradient */}
          <div
            style={{
              width: ACCENT_BOX_SIZE,
              height: "100%",
              background: `linear-gradient(180deg,
                ${COLORS.accentGradientStart} ${gradientOffset}%,
                ${COLORS.accent} ${50 + gradientOffset / 2}%,
                ${COLORS.accentGradientEnd} ${100 + gradientOffset}%)`,
              borderRadius: "3px",
              transform: `translateX(${accentBoxSlideX}px)`,
              boxShadow: isInHold
                ? `0 0 ${20 * glowIntensity}px ${COLORS.glowColor}`
                : `0 0 15px ${COLORS.glowColor}`,
              position: "absolute",
              left: -BOX_PADDING,
              top: 0,
              bottom: 0,
            }}
          />

          {/* Background box */}
          <div
            style={{
              position: "absolute",
              left: -BOX_PADDING - 10,
              top: -BOX_PADDING,
              right: -BOX_PADDING,
              bottom: -BOX_PADDING,
              background: COLORS.backgroundBox,
              borderRadius: "4px",
              backdropFilter: "blur(10px)",
              zIndex: -1,
            }}
          />

          {/* Text content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {/* Primary text (name) */}
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: `${FONT_SIZE_PRIMARY}px`,
                fontWeight: FONT_WEIGHT_PRIMARY,
                color: COLORS.primary,
                letterSpacing: "3px",
                lineHeight: 1.1,
                textTransform: "uppercase",
                opacity: primaryTextProgress,
                transform: `translateX(${interpolate(
                  primaryTextProgress,
                  [0, 1],
                  [-30, 0]
                )}px)`,
                textShadow: `
                  0 2px 10px rgba(0, 0, 0, 0.9),
                  0 0 30px rgba(255, 107, 157, ${isInHold ? glowIntensity * 0.4 : 0.2})
                `,
              }}
            >
              {PRIMARY_TEXT}
            </div>

            {/* Secondary text (title/position) */}
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: `${FONT_SIZE_SECONDARY}px`,
                fontWeight: FONT_WEIGHT_SECONDARY,
                color: COLORS.secondary,
                letterSpacing: "1.5px",
                lineHeight: 1.2,
                opacity: secondaryTextProgress,
                transform: `translateX(${interpolate(
                  secondaryTextProgress,
                  [0, 1],
                  [-20, 0]
                )}px)`,
                textShadow: "0 2px 8px rgba(0, 0, 0, 0.9)",
              }}
            >
              {SECONDARY_TEXT}
            </div>
          </div>

          {/* Decorative corner element */}
          <div
            style={{
              position: "absolute",
              right: -10,
              top: -10,
              width: "30px",
              height: "30px",
              border: `2px solid ${COLORS.accent}`,
              borderLeft: "none",
              borderBottom: "none",
              borderRadius: "0 4px 0 0",
              opacity: interpolate(
                frame,
                [TIMING.ENTRANCE_START + 35, TIMING.ENTRANCE_START + 50],
                [0, 0.6],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }
              ),
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
