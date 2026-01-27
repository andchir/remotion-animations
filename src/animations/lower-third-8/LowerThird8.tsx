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
  // Phase 1: Entrance - sliding tiles with ribbon
  ENTRANCE_START: 0,
  ENTRANCE_DURATION: 48, // ~1.6 seconds

  // Phase 2: Hold - subtle gradient shift and pulse
  HOLD_START: 48,
  HOLD_DURATION: 84, // ~2.8 seconds

  // Phase 3: Exit - slide out to right with fade
  EXIT_START: 132,
  EXIT_DURATION: 48, // ~1.6 seconds
};

// Text configuration
const PRIMARY_TEXT = "JOHN SMITH";
const SECONDARY_TEXT = "Lead Design Engineer";

// Visual configuration - Modern flat design with deep purple/magenta theme
const COLORS = {
  primary: "#FFFFFF", // White for primary text
  secondary: "#F5E6FF", // Very light lavender for secondary text
  tileMain: "#8B5CF6", // Vibrant purple
  tileSecondary: "#A78BFA", // Lighter purple
  ribbon: "#EC4899", // Hot pink/magenta
  ribbonGradientStart: "#EC4899",
  ribbonGradientEnd: "#F97316", // Orange accent
  accentDot: "#FBBF24", // Amber yellow
  shadowColor: "rgba(139, 92, 246, 0.4)",
};

const FONT_FAMILY = "Arial, Helvetica, sans-serif";
const FONT_WEIGHT_PRIMARY = "900";
const FONT_WEIGHT_SECONDARY = "600";
const FONT_SIZE_PRIMARY = 50;
const FONT_SIZE_SECONDARY = 25;

// Layout configuration
const LOWER_THIRD_LEFT_MARGIN = 90;
const LOWER_THIRD_BOTTOM_MARGIN = 105;
const TILE_PADDING_VERTICAL = 16;
const TILE_PADDING_HORIZONTAL = 28;
const TILE_GAP = 8;
const RIBBON_HEIGHT = 6;

export const LowerThird8: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // === ENTRANCE ANIMATIONS ===

  // Container fade in
  const containerOpacity = interpolate(
    frame,
    [TIMING.ENTRANCE_START, TIMING.ENTRANCE_START + 15],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Primary tile slides in from left
  const primaryTileSlideX = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 5, TIMING.ENTRANCE_START + 32],
    [-250, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // Secondary tile slides in with delay
  const secondaryTileSlideX = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 12, TIMING.ENTRANCE_START + 38],
    [-220, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // Ribbon slides across from left to right
  const ribbonSlideProgress = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 20, TIMING.ENTRANCE_START + 44],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );

  // Text opacity fades in
  const primaryTextOpacity = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 18, TIMING.ENTRANCE_START + 35],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const secondaryTextOpacity = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 24, TIMING.ENTRANCE_START + 40],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Decorative dots reveal
  const dotsScale = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 28, TIMING.ENTRANCE_START + 46],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.back(1.4)),
    }
  );

  // === HOLD ANIMATIONS ===

  // Gradient color shift animation
  const gradientShift = interpolate(
    (frame - TIMING.HOLD_START) % 100,
    [0, 50, 100],
    [0, 20, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Subtle tile elevation pulse
  const elevationPulse = interpolate(
    Math.sin((frame - TIMING.HOLD_START) / 30),
    [-1, 1],
    [1, 1.15],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Ribbon shimmer effect
  const ribbonShimmer = interpolate(
    (frame - TIMING.HOLD_START) % 60,
    [0, 60],
    [-100, 200],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Dot pulse animation
  const dotsPulse = [0, 1, 2].map((i) =>
    interpolate(
      Math.sin((frame - TIMING.HOLD_START + i * 10) / 15),
      [-1, 1],
      [0.7, 1],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    )
  );

  // === EXIT ANIMATIONS ===

  // Tiles slide out to the right
  const exitPrimarySlideX = interpolate(
    frame,
    [TIMING.EXIT_START, TIMING.EXIT_START + 35],
    [0, 200],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  const exitSecondarySlideX = interpolate(
    frame,
    [TIMING.EXIT_START + 5, TIMING.EXIT_START + 40],
    [0, 220],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  // Exit opacity fade
  const exitOpacity = interpolate(
    frame,
    [TIMING.EXIT_START + 25, TIMING.EXIT_START + TIMING.EXIT_DURATION],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Text fades out during exit
  const exitTextOpacity = interpolate(
    frame,
    [TIMING.EXIT_START, TIMING.EXIT_START + 25],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Ribbon retracts
  const exitRibbonProgress = interpolate(
    frame,
    [TIMING.EXIT_START + 10, TIMING.EXIT_START + 38],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.quad),
    }
  );

  // === COMBINED TRANSFORMATIONS ===

  const isInEntrance = frame < TIMING.HOLD_START;
  const isInHold = frame >= TIMING.HOLD_START && frame < TIMING.EXIT_START;
  const isInExit = frame >= TIMING.EXIT_START;

  const finalOpacity = isInEntrance
    ? containerOpacity
    : isInExit
    ? exitOpacity
    : 1;

  const finalPrimarySlideX = isInExit
    ? exitPrimarySlideX
    : primaryTileSlideX;
  const finalSecondarySlideX = isInExit
    ? exitSecondarySlideX
    : secondaryTileSlideX;

  const finalPrimaryTextOpacity = isInExit
    ? exitTextOpacity
    : primaryTextOpacity;
  const finalSecondaryTextOpacity = isInExit
    ? exitTextOpacity
    : secondaryTextOpacity;

  const finalRibbonProgress = isInExit
    ? exitRibbonProgress
    : ribbonSlideProgress;

  const shadowIntensity = isInHold ? elevationPulse : 1;

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
          transformOrigin: "bottom left",
        }}
      >
        {/* Decorative dots on the left */}
        <div
          style={{
            position: "absolute",
            left: -35,
            top: "50%",
            transform: `translateY(-50%) scale(${dotsScale})`,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            opacity: dotsScale,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: i === 1 ? 12 : 8,
                height: i === 1 ? 12 : 8,
                borderRadius: "50%",
                background: i === 1 ? COLORS.ribbon : COLORS.accentDot,
                opacity: isInHold ? dotsPulse[i] : 0.9,
                boxShadow: `0 0 ${10 * (isInHold ? dotsPulse[i] : 1)}px ${
                  i === 1 ? COLORS.ribbon : COLORS.accentDot
                }`,
              }}
            />
          ))}
        </div>

        {/* Main tiles container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: `${TILE_GAP}px`,
          }}
        >
          {/* Primary tile (name) */}
          <div
            style={{
              position: "relative",
              transform: `translateX(${finalPrimarySlideX}px)`,
            }}
          >
            <div
              style={{
                background: COLORS.tileMain,
                paddingTop: TILE_PADDING_VERTICAL,
                paddingBottom: TILE_PADDING_VERTICAL,
                paddingLeft: TILE_PADDING_HORIZONTAL,
                paddingRight: TILE_PADDING_HORIZONTAL,
                borderRadius: "6px",
                boxShadow: `0 ${6 * shadowIntensity}px ${
                  20 * shadowIntensity
                }px ${COLORS.shadowColor}`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Subtle gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(${
                    120 + gradientShift
                  }deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)`,
                  pointerEvents: "none",
                }}
              />

              {/* Primary text */}
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: `${FONT_SIZE_PRIMARY}px`,
                  fontWeight: FONT_WEIGHT_PRIMARY,
                  color: COLORS.primary,
                  letterSpacing: "2.5px",
                  lineHeight: 1.1,
                  textTransform: "uppercase",
                  opacity: finalPrimaryTextOpacity,
                  textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {PRIMARY_TEXT}
              </div>
            </div>
          </div>

          {/* Secondary tile (title) */}
          <div
            style={{
              position: "relative",
              transform: `translateX(${finalSecondarySlideX}px)`,
            }}
          >
            <div
              style={{
                background: COLORS.tileSecondary,
                paddingTop: TILE_PADDING_VERTICAL - 4,
                paddingBottom: TILE_PADDING_VERTICAL - 4,
                paddingLeft: TILE_PADDING_HORIZONTAL,
                paddingRight: TILE_PADDING_HORIZONTAL,
                borderRadius: "6px",
                boxShadow: `0 ${5 * shadowIntensity}px ${
                  16 * shadowIntensity
                }px rgba(167, 139, 250, 0.3)`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Subtle gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(${
                    120 + gradientShift
                  }deg, transparent 0%, rgba(255, 255, 255, 0.08) 50%, transparent 100%)`,
                  pointerEvents: "none",
                }}
              />

              {/* Secondary text */}
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: `${FONT_SIZE_SECONDARY}px`,
                  fontWeight: FONT_WEIGHT_SECONDARY,
                  color: COLORS.secondary,
                  letterSpacing: "1.5px",
                  lineHeight: 1.2,
                  opacity: finalSecondaryTextOpacity,
                  textShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {SECONDARY_TEXT}
              </div>
            </div>
          </div>
        </div>

        {/* Decorative ribbon accent - slides across */}
        <div
          style={{
            position: "absolute",
            left: -10,
            bottom: -15,
            width: `${380 * finalRibbonProgress}px`,
            height: RIBBON_HEIGHT,
            background: `linear-gradient(90deg, ${COLORS.ribbonGradientStart} 0%, ${COLORS.ribbonGradientEnd} 100%)`,
            borderRadius: "3px",
            boxShadow: `0 0 ${15 * (isInHold ? elevationPulse : 1)}px ${
              COLORS.ribbon
            }`,
            opacity: finalRibbonProgress,
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
                background: `linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.5) 50%, transparent 100%)`,
                transform: `translateX(${ribbonShimmer}%)`,
              }}
            />
          )}
        </div>

        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            left: -10,
            top: -12,
            width: `${150 * dotsScale}px`,
            height: 3,
            background: `linear-gradient(90deg, ${COLORS.accentDot} 0%, transparent 100%)`,
            borderRadius: "2px",
            opacity: dotsScale * 0.7,
          }}
        />

        {/* Corner decorative element */}
        <div
          style={{
            position: "absolute",
            right: -30,
            bottom: -15,
            width: 25,
            height: 25,
            borderRadius: "3px",
            background: `linear-gradient(135deg, ${COLORS.ribbon} 0%, ${COLORS.ribbonGradientEnd} 100%)`,
            transform: `scale(${dotsScale}) rotate(45deg)`,
            opacity: dotsScale * 0.8,
            boxShadow: `0 0 12px ${COLORS.ribbon}`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
