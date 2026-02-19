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
  // Phase 1: Entrance - spotlight reveal
  ENTRANCE_START: 0,
  ENTRANCE_DURATION: 45, // 1.5 seconds

  // Phase 2: Hold - subtle animations
  HOLD_START: 45,
  HOLD_DURATION: 90, // 3 seconds

  // Phase 3: Exit - spotlight collapse
  EXIT_START: 135,
  EXIT_DURATION: 45, // 1.5 seconds
};

// Text configuration
const PRIMARY_TEXT = "ALEXANDRA CHEN";
const SECONDARY_TEXT = "Creative Director";

// Visual configuration
const COLORS = {
  primary: "#FFFFFF",
  secondary: "#B8B8B8",
  accent: "#FF6B35", // Warm orange accent
  accentSecondary: "#F7931E",
  backgroundDark: "rgba(20, 20, 25, 0.85)",
  spotlight: "rgba(255, 107, 53, 0.15)",
};

const FONT_FAMILY = "Arial, Helvetica, sans-serif";
const FONT_WEIGHT_PRIMARY = "800";
const FONT_WEIGHT_SECONDARY = "500";
const FONT_SIZE_PRIMARY = 52;
const FONT_SIZE_SECONDARY = 26;

// Layout configuration
const LOWER_THIRD_LEFT_MARGIN = 100;
const LOWER_THIRD_BOTTOM_MARGIN = 140;

export const LowerThird18: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // === ENTRANCE ANIMATIONS ===

  // Spotlight scale animation (grows from center)
  const spotlightScale = interpolate(
    frame,
    [TIMING.ENTRANCE_START, TIMING.ENTRANCE_START + 30],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // Background bar slide-in
  const barSlideX = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 10, TIMING.ENTRANCE_START + TIMING.ENTRANCE_DURATION],
    [-500, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // Container opacity
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

  // Spotlight subtle pulse
  const spotlightPulse = interpolate(
    Math.sin((frame - TIMING.HOLD_START) / 25),
    [-1, 1],
    [0.95, 1.05],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Accent line shimmer
  const shimmerProgress = interpolate(
    (frame - TIMING.HOLD_START) % 50,
    [0, 50],
    [-100, 300],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // === EXIT ANIMATIONS ===

  // Spotlight collapse
  const exitSpotlightScale = interpolate(
    frame,
    [TIMING.EXIT_START, TIMING.EXIT_START + 30],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  // Exit opacity
  const exitOpacity = interpolate(
    frame,
    [TIMING.EXIT_START + 15, TIMING.EXIT_START + TIMING.EXIT_DURATION],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  // Exit slide
  const exitSlideY = interpolate(
    frame,
    [TIMING.EXIT_START, TIMING.EXIT_START + TIMING.EXIT_DURATION],
    [0, 100],
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

  const finalSpotlightScale = isInExit ? exitSpotlightScale : spotlightScale * spotlightPulse;
  const finalOpacity = isInEntrance ? containerOpacity : isInExit ? exitOpacity : 1;
  const finalTranslateY = isInExit ? exitSlideY : 0;

  // Character stagger animation for primary text
  const renderStaggeredText = (
    text: string,
    fontSize: number,
    fontWeight: string,
    color: string,
    baseDelay: number
  ) => {
    return text.split("").map((char, index) => {
      const charDelay = baseDelay + index * 1.5;

      const charProgress = interpolate(
        frame,
        [charDelay, charDelay + 15],
        [0, 1],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.quad),
        }
      );

      const charOpacity = isInExit ? exitOpacity : charProgress;
      const charTranslateY = isInEntrance
        ? interpolate(charProgress, [0, 1], [15, 0])
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

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        overflow: "hidden",
      }}
    >
      {/* Spotlight effect - large circular gradient */}
      <div
        style={{
          position: "absolute",
          left: LOWER_THIRD_LEFT_MARGIN - 100,
          bottom: LOWER_THIRD_BOTTOM_MARGIN - 150,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.spotlight} 0%, transparent 70%)`,
          transform: `scale(${finalSpotlightScale})`,
          opacity: finalOpacity,
          pointerEvents: "none",
        }}
      />

      {/* Secondary spotlight ring */}
      <div
        style={{
          position: "absolute",
          left: LOWER_THIRD_LEFT_MARGIN - 80,
          bottom: LOWER_THIRD_BOTTOM_MARGIN - 130,
          width: 560,
          height: 560,
          borderRadius: "50%",
          border: `2px solid ${COLORS.accent}`,
          opacity: finalOpacity * 0.3,
          transform: `scale(${finalSpotlightScale})`,
          pointerEvents: "none",
        }}
      />

      {/* Main container */}
      <div
        style={{
          position: "absolute",
          left: LOWER_THIRD_LEFT_MARGIN,
          bottom: LOWER_THIRD_BOTTOM_MARGIN,
          transform: `translateX(${barSlideX}px) translateY(${finalTranslateY}px)`,
          opacity: finalOpacity,
        }}
      >
        {/* Background bar with angled edge */}
        <div
          style={{
            position: "absolute",
            left: -30,
            top: -25,
            right: -40,
            bottom: -25,
            background: COLORS.backgroundDark,
            clipPath: "polygon(0 0, calc(100% - 30px) 0, 100% 100%, 0 100%)",
            zIndex: -1,
          }}
        />

        {/* Accent corner decoration */}
        <div
          style={{
            position: "absolute",
            left: -30,
            top: -25,
            width: 60,
            height: 4,
            background: `linear-gradient(90deg, ${COLORS.accent} 0%, ${COLORS.accentSecondary} 100%)`,
          }}
        />

        {/* Primary text */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: `${FONT_SIZE_PRIMARY}px`,
            fontWeight: FONT_WEIGHT_PRIMARY,
            color: COLORS.primary,
            letterSpacing: "3px",
            lineHeight: 1.2,
            textTransform: "uppercase",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
          }}
        >
          {renderStaggeredText(
            PRIMARY_TEXT,
            FONT_SIZE_PRIMARY,
            FONT_WEIGHT_PRIMARY,
            COLORS.primary,
            TIMING.ENTRANCE_START + 15
          )}
        </div>

        {/* Accent underline with shimmer */}
        <div
          style={{
            marginTop: 12,
            height: 3,
            width: 280,
            background: `linear-gradient(90deg, ${COLORS.accent} 0%, ${COLORS.accentSecondary} 50%, ${COLORS.accent} 100%)`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {isInHold && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "40%",
                height: "100%",
                background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)",
                transform: `translateX(${shimmerProgress}%)`,
              }}
            />
          )}
        </div>

        {/* Secondary text */}
        <div
          style={{
            marginTop: 10,
            fontFamily: FONT_FAMILY,
            fontSize: `${FONT_SIZE_SECONDARY}px`,
            fontWeight: FONT_WEIGHT_SECONDARY,
            color: COLORS.secondary,
            letterSpacing: "2px",
            lineHeight: 1.3,
            opacity: interpolate(
              frame,
              [TIMING.ENTRANCE_START + 30, TIMING.ENTRANCE_START + 45],
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
                    [TIMING.ENTRANCE_START + 30, TIMING.ENTRANCE_START + 45],
                    [10, 0],
                    {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                      easing: Easing.out(Easing.quad),
                    }
                  )
                : 0
            }px)`,
            textShadow: "0 1px 4px rgba(0, 0, 0, 0.6)",
          }}
        >
          {SECONDARY_TEXT}
        </div>
      </div>

      {/* Small decorative dots */}
      {[0, 1, 2].map((i) => {
        const dotDelay = TIMING.ENTRANCE_START + 35 + i * 5;
        const dotProgress = interpolate(
          frame,
          [dotDelay, dotDelay + 10],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.quad),
          }
        );

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: LOWER_THIRD_LEFT_MARGIN + 320 + i * 12,
              bottom: LOWER_THIRD_BOTTOM_MARGIN + 35,
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: COLORS.accent,
              opacity: isInExit ? exitOpacity : dotProgress,
              transform: `scale(${dotProgress})`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
