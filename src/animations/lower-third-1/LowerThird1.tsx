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
  // Phase 1: Entrance - slide in and reveal
  ENTRANCE_START: 0,
  ENTRANCE_DURATION: 45, // 1.5 seconds

  // Phase 2: Hold - subtle animations
  HOLD_START: 45,
  HOLD_DURATION: 90, // 3 seconds

  // Phase 3: Exit - fade and slide out
  EXIT_START: 135,
  EXIT_DURATION: 45, // 1.5 seconds
};

// Text configuration
const PRIMARY_TEXT = "JOHN SMITH";
const SECONDARY_TEXT = "Lead Design Engineer";

// Visual configuration
const COLORS = {
  primary: "#FFFFFF", // White for primary text
  secondary: "#E0E0E0", // Light gray for secondary text
  accent: "#00D9FF", // Bright cyan accent
  accentGradientStart: "#00D9FF",
  accentGradientEnd: "#0066FF",
  backgroundOverlay: "rgba(0, 0, 0, 0.7)", // Semi-transparent background
};

const FONT_FAMILY = "Arial, Helvetica, sans-serif";
const FONT_WEIGHT_PRIMARY = "900";
const FONT_WEIGHT_SECONDARY = "600";
const FONT_SIZE_PRIMARY = 56;
const FONT_SIZE_SECONDARY = 28;

// Layout configuration
const LOWER_THIRD_LEFT_MARGIN = 80;
const LOWER_THIRD_BOTTOM_MARGIN = 120;
const VERTICAL_SPACING = 8;
const UNDERLINE_HEIGHT = 4;
const UNDERLINE_MARGIN_TOP = 12;

export const LowerThird1: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // === ENTRANCE ANIMATIONS ===

  // Main container slide-in from left
  const containerSlideX = interpolate(
    frame,
    [TIMING.ENTRANCE_START, TIMING.ENTRANCE_START + TIMING.ENTRANCE_DURATION],
    [-400, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // Container opacity fade-in
  const containerOpacity = interpolate(
    frame,
    [TIMING.ENTRANCE_START, TIMING.ENTRANCE_START + 15],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Underline expansion animation
  const underlineProgress = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 20, TIMING.ENTRANCE_START + TIMING.ENTRANCE_DURATION],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.ease),
    }
  );

  // === HOLD ANIMATIONS ===

  // Subtle shimmer effect on accent underline
  const shimmerOffset = interpolate(
    (frame - TIMING.HOLD_START) % 60,
    [0, 60],
    [-100, 200],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Gentle pulse on accent color
  const pulseIntensity = interpolate(
    Math.sin((frame - TIMING.HOLD_START) / 30),
    [-1, 1],
    [0.85, 1],
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

  // Exit slide to right
  const exitSlideX = interpolate(
    frame,
    [TIMING.EXIT_START, TIMING.EXIT_START + TIMING.EXIT_DURATION],
    [0, 300],
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

  const finalTranslateX = isInEntrance
    ? containerSlideX
    : isInExit
    ? exitSlideX
    : 0;

  const finalOpacity = isInEntrance
    ? containerOpacity
    : isInExit
    ? exitOpacity
    : 1;

  // Character stagger animation for primary text
  const renderStaggeredText = (
    text: string,
    fontSize: number,
    fontWeight: string,
    color: string,
    baseDelay: number
  ) => {
    return text.split("").map((char, index) => {
      const charDelay = baseDelay + index * 2;

      const charProgress = interpolate(
        frame,
        [charDelay, charDelay + 20],
        [0, 1],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.quad),
        }
      );

      const charOpacity = isInExit
        ? exitOpacity
        : charProgress;

      const charTranslateY = isInEntrance
        ? interpolate(charProgress, [0, 1], [20, 0])
        : 0;

      return (
        <span
          key={index}
          style={{
            display: "inline-block",
            opacity: charOpacity,
            transform: `translateY(${charTranslateY}px)`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      );
    });
  };

  // Calculate underline width
  const underlineWidth = 350;
  const currentUnderlineWidth = underlineWidth * underlineProgress;

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
          transform: `translateX(${finalTranslateX}px)`,
          opacity: finalOpacity,
        }}
      >
        {/* Background overlay bar (subtle dark background for readability) */}
        <div
          style={{
            position: "absolute",
            left: -20,
            top: -20,
            right: -20,
            bottom: -20,
            background: `linear-gradient(90deg, ${COLORS.backgroundOverlay} 0%, rgba(0, 0, 0, 0.4) 70%, transparent 100%)`,
            borderRadius: "8px",
            zIndex: -1,
          }}
        />

        {/* Primary text (name) */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: `${FONT_SIZE_PRIMARY}px`,
            fontWeight: FONT_WEIGHT_PRIMARY,
            color: COLORS.primary,
            letterSpacing: "2px",
            lineHeight: 1.2,
            textTransform: "uppercase",
            textShadow: `
              0 2px 8px rgba(0, 0, 0, 0.8),
              0 0 20px rgba(0, 217, 255, ${isInHold ? pulseIntensity * 0.3 : 0.2})
            `,
          }}
        >
          {renderStaggeredText(
            PRIMARY_TEXT,
            FONT_SIZE_PRIMARY,
            FONT_WEIGHT_PRIMARY,
            COLORS.primary,
            TIMING.ENTRANCE_START + 10
          )}
        </div>

        {/* Accent underline with gradient and shimmer */}
        <div
          style={{
            marginTop: UNDERLINE_MARGIN_TOP,
            height: UNDERLINE_HEIGHT,
            width: currentUnderlineWidth,
            background: `linear-gradient(90deg, ${COLORS.accentGradientStart} 0%, ${COLORS.accentGradientEnd} 100%)`,
            borderRadius: "2px",
            position: "relative",
            overflow: "hidden",
            boxShadow: isInHold
              ? `0 0 ${15 * pulseIntensity}px ${COLORS.accent}`
              : `0 0 10px ${COLORS.accent}`,
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

        {/* Secondary text (title/position) */}
        <div
          style={{
            marginTop: VERTICAL_SPACING + UNDERLINE_MARGIN_TOP,
            fontFamily: FONT_FAMILY,
            fontSize: `${FONT_SIZE_SECONDARY}px`,
            fontWeight: FONT_WEIGHT_SECONDARY,
            color: COLORS.secondary,
            letterSpacing: "1px",
            lineHeight: 1.3,
            opacity: interpolate(
              frame,
              [TIMING.ENTRANCE_START + 25, TIMING.ENTRANCE_START + 40],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }
            ),
            transform: `translateY(${
              isInEntrance
                ? interpolate(
                    frame,
                    [TIMING.ENTRANCE_START + 25, TIMING.ENTRANCE_START + 40],
                    [15, 0],
                    {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                      easing: Easing.out(Easing.quad),
                    }
                  )
                : 0
            }px)`,
            textShadow: "0 2px 6px rgba(0, 0, 0, 0.8)",
          }}
        >
          {SECONDARY_TEXT}
        </div>
      </div>
    </AbsoluteFill>
  );
};
