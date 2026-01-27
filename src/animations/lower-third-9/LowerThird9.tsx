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
  // Phase 1: Entrance - stacking blocks slide in
  ENTRANCE_START: 0,
  ENTRANCE_DURATION: 50, // ~1.67 seconds

  // Phase 2: Hold - metallic sheen and subtle pulse
  HOLD_START: 50,
  HOLD_DURATION: 80, // ~2.67 seconds

  // Phase 3: Exit - blocks slide out sequentially
  EXIT_START: 130,
  EXIT_DURATION: 50, // ~1.67 seconds
};

// Text configuration
const PRIMARY_TEXT = "JOHN SMITH";
const SECONDARY_TEXT = "Lead Design Engineer";

// Visual configuration - Industrial steel/metallic theme with electric blue accents
const COLORS = {
  primary: "#FFFFFF", // White for primary text
  secondary: "#E8E8E8", // Light gray for secondary text
  blockPrimary: "#2D3748", // Dark steel gray
  blockSecondary: "#4A5568", // Medium steel gray
  accent: "#3B82F6", // Electric blue accent
  accentBright: "#60A5FA", // Lighter electric blue
  accentDark: "#1D4ED8", // Darker electric blue
  metalSheen: "rgba(255, 255, 255, 0.15)",
  shadowColor: "rgba(0, 0, 0, 0.4)",
};

const FONT_FAMILY = "Arial, Helvetica, sans-serif";
const FONT_WEIGHT_PRIMARY = "800";
const FONT_WEIGHT_SECONDARY = "500";
const FONT_SIZE_PRIMARY = 52;
const FONT_SIZE_SECONDARY = 24;

// Layout configuration - flat design with sharp corners
const LOWER_THIRD_LEFT_MARGIN = 100;
const LOWER_THIRD_BOTTOM_MARGIN = 110;
const BLOCK_PADDING_VERTICAL = 16;
const BLOCK_PADDING_HORIZONTAL = 32;
const BLOCK_GAP = 4;
const ACCENT_LINE_WIDTH = 6;
const ACCENT_LINE_HEIGHT = 100;

export const LowerThird9: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // === ENTRANCE ANIMATIONS ===

  // Container fade in
  const containerOpacity = interpolate(
    frame,
    [TIMING.ENTRANCE_START, TIMING.ENTRANCE_START + 12],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Accent line drops in from top
  const accentLineProgress = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 5, TIMING.ENTRANCE_START + 28],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // Primary block slides in from left
  const primaryBlockSlideX = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 12, TIMING.ENTRANCE_START + 38],
    [-350, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  const primaryBlockOpacity = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 12, TIMING.ENTRANCE_START + 25],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Secondary block slides in with delay
  const secondaryBlockSlideX = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 20, TIMING.ENTRANCE_START + 45],
    [-300, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  const secondaryBlockOpacity = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 20, TIMING.ENTRANCE_START + 32],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Text reveal within blocks
  const primaryTextOpacity = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 25, TIMING.ENTRANCE_START + 40],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const secondaryTextOpacity = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 32, TIMING.ENTRANCE_START + 48],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Small indicator blocks appear
  const indicatorProgress = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 35, TIMING.ENTRANCE_START + 48],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.back(1.2)),
    }
  );

  // === HOLD ANIMATIONS ===

  // Metallic sheen sweep across blocks
  const sheenOffset = interpolate(
    (frame - TIMING.HOLD_START) % 90,
    [0, 90],
    [-100, 200],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Subtle accent line pulse
  const accentPulse = interpolate(
    Math.sin((frame - TIMING.HOLD_START) / 20),
    [-1, 1],
    [0.8, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Indicator blocks pulse
  const indicatorPulse = [0, 1, 2].map((i) =>
    interpolate(
      Math.sin((frame - TIMING.HOLD_START + i * 8) / 18),
      [-1, 1],
      [0.6, 1],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    )
  );

  // Subtle shadow depth change
  const shadowDepth = interpolate(
    Math.sin((frame - TIMING.HOLD_START) / 35),
    [-1, 1],
    [0.9, 1.1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // === EXIT ANIMATIONS ===

  // Accent line retracts upward
  const exitAccentProgress = interpolate(
    frame,
    [TIMING.EXIT_START, TIMING.EXIT_START + 25],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  // Secondary block exits first (slides right)
  const exitSecondarySlideX = interpolate(
    frame,
    [TIMING.EXIT_START + 5, TIMING.EXIT_START + 35],
    [0, 350],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  const exitSecondaryOpacity = interpolate(
    frame,
    [TIMING.EXIT_START + 20, TIMING.EXIT_START + 35],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Primary block exits after (slides right)
  const exitPrimarySlideX = interpolate(
    frame,
    [TIMING.EXIT_START + 12, TIMING.EXIT_START + 42],
    [0, 400],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  const exitPrimaryOpacity = interpolate(
    frame,
    [TIMING.EXIT_START + 28, TIMING.EXIT_START + 42],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Overall container fade out
  const exitContainerOpacity = interpolate(
    frame,
    [TIMING.EXIT_START + 35, TIMING.EXIT_START + TIMING.EXIT_DURATION],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Text fades out quickly
  const exitTextOpacity = interpolate(
    frame,
    [TIMING.EXIT_START, TIMING.EXIT_START + 18],
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

  const finalContainerOpacity = isInEntrance
    ? containerOpacity
    : isInExit
    ? exitContainerOpacity
    : 1;

  const finalAccentProgress = isInExit ? exitAccentProgress : accentLineProgress;

  const finalPrimarySlideX = isInExit ? exitPrimarySlideX : primaryBlockSlideX;
  const finalPrimaryBlockOpacity = isInExit
    ? exitPrimaryOpacity
    : primaryBlockOpacity;

  const finalSecondarySlideX = isInExit
    ? exitSecondarySlideX
    : secondaryBlockSlideX;
  const finalSecondaryBlockOpacity = isInExit
    ? exitSecondaryOpacity
    : secondaryBlockOpacity;

  const finalPrimaryTextOpacity = isInExit ? exitTextOpacity : primaryTextOpacity;
  const finalSecondaryTextOpacity = isInExit
    ? exitTextOpacity
    : secondaryTextOpacity;

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
          opacity: finalContainerOpacity,
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
        }}
      >
        {/* Left accent line - vertical electric blue bar */}
        <div
          style={{
            width: ACCENT_LINE_WIDTH,
            height: ACCENT_LINE_HEIGHT * finalAccentProgress,
            background: `linear-gradient(180deg, ${COLORS.accent} 0%, ${COLORS.accentBright} 50%, ${COLORS.accentDark} 100%)`,
            marginRight: 16,
            boxShadow: isInHold
              ? `0 0 ${20 * accentPulse}px ${COLORS.accent}, 0 0 ${35 * accentPulse}px rgba(59, 130, 246, 0.4)`
              : `0 0 15px ${COLORS.accent}`,
            opacity: finalAccentProgress,
            transformOrigin: "bottom center",
          }}
        />

        {/* Blocks container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: `${BLOCK_GAP}px`,
          }}
        >
          {/* Primary block (name) */}
          <div
            style={{
              transform: `translateX(${finalPrimarySlideX}px)`,
              opacity: finalPrimaryBlockOpacity,
            }}
          >
            <div
              style={{
                background: COLORS.blockPrimary,
                paddingTop: BLOCK_PADDING_VERTICAL,
                paddingBottom: BLOCK_PADDING_VERTICAL,
                paddingLeft: BLOCK_PADDING_HORIZONTAL,
                paddingRight: BLOCK_PADDING_HORIZONTAL,
                position: "relative",
                overflow: "hidden",
                boxShadow: `0 ${4 * (isInHold ? shadowDepth : 1)}px ${16 * (isInHold ? shadowDepth : 1)}px ${COLORS.shadowColor}`,
              }}
            >
              {/* Metallic sheen effect */}
              {(isInHold || isInEntrance) && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: `linear-gradient(110deg, transparent 0%, ${COLORS.metalSheen} 50%, transparent 100%)`,
                    transform: `translateX(${isInHold ? sheenOffset : -100}%)`,
                    pointerEvents: "none",
                  }}
                />
              )}

              {/* Primary text */}
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: `${FONT_SIZE_PRIMARY}px`,
                  fontWeight: FONT_WEIGHT_PRIMARY,
                  color: COLORS.primary,
                  letterSpacing: "3px",
                  lineHeight: 1.1,
                  textTransform: "uppercase",
                  opacity: finalPrimaryTextOpacity,
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {PRIMARY_TEXT}
              </div>
            </div>
          </div>

          {/* Secondary block (title) */}
          <div
            style={{
              transform: `translateX(${finalSecondarySlideX}px)`,
              opacity: finalSecondaryBlockOpacity,
            }}
          >
            <div
              style={{
                background: COLORS.blockSecondary,
                paddingTop: BLOCK_PADDING_VERTICAL - 4,
                paddingBottom: BLOCK_PADDING_VERTICAL - 4,
                paddingLeft: BLOCK_PADDING_HORIZONTAL,
                paddingRight: BLOCK_PADDING_HORIZONTAL,
                position: "relative",
                overflow: "hidden",
                boxShadow: `0 ${3 * (isInHold ? shadowDepth : 1)}px ${12 * (isInHold ? shadowDepth : 1)}px rgba(0, 0, 0, 0.3)`,
              }}
            >
              {/* Metallic sheen effect */}
              {(isInHold || isInEntrance) && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: `linear-gradient(110deg, transparent 0%, ${COLORS.metalSheen} 50%, transparent 100%)`,
                    transform: `translateX(${isInHold ? sheenOffset : -100}%)`,
                    pointerEvents: "none",
                  }}
                />
              )}

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
                  textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {SECONDARY_TEXT}
              </div>
            </div>
          </div>
        </div>

        {/* Right side indicator blocks */}
        <div
          style={{
            marginLeft: 20,
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            alignItems: "flex-start",
            justifyContent: "center",
            height: ACCENT_LINE_HEIGHT,
            opacity: indicatorProgress,
            transform: `scale(${indicatorProgress})`,
            transformOrigin: "left center",
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: i === 1 ? 28 : 18,
                height: 6,
                background:
                  i === 1
                    ? `linear-gradient(90deg, ${COLORS.accent} 0%, ${COLORS.accentBright} 100%)`
                    : COLORS.blockSecondary,
                opacity: isInHold ? indicatorPulse[i] : 0.9,
                boxShadow:
                  i === 1
                    ? `0 0 ${10 * (isInHold ? indicatorPulse[i] : 1)}px ${COLORS.accent}`
                    : "none",
              }}
            />
          ))}
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            left: ACCENT_LINE_WIDTH + 16,
            bottom: -16,
            width: `${280 * finalAccentProgress}px`,
            height: 3,
            background: `linear-gradient(90deg, ${COLORS.accent} 0%, ${COLORS.accentDark} 50%, transparent 100%)`,
            opacity: finalAccentProgress * 0.7,
            boxShadow: `0 0 ${8 * (isInHold ? accentPulse : 1)}px rgba(59, 130, 246, 0.3)`,
          }}
        />

        {/* Top corner accent */}
        <div
          style={{
            position: "absolute",
            left: ACCENT_LINE_WIDTH + 16,
            top: -12,
            width: `${80 * indicatorProgress}px`,
            height: 2,
            background: `linear-gradient(90deg, ${COLORS.accentBright} 0%, transparent 100%)`,
            opacity: indicatorProgress * 0.6,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
