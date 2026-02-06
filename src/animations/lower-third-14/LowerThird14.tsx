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
  // Phase 1: Entrance - bars slide in, text reveals
  ENTRANCE_START: 0,
  ENTRANCE_DURATION: 50, // ~1.67 seconds

  // Phase 2: Hold - subtle pulse and shift effects
  HOLD_START: 50,
  HOLD_DURATION: 85, // ~2.83 seconds

  // Phase 3: Exit - bars retract, elements fade
  EXIT_START: 135,
  EXIT_DURATION: 45, // 1.5 seconds
};

// Text configuration
const PRIMARY_TEXT = "JOHN SMITH";
const SECONDARY_TEXT = "Lead Design Engineer";

// Visual configuration - Teal/Mint theme
const COLORS = {
  primary: "#FFFFFF",
  secondary: "#B0F0E0",
  accent: "#00A89D", // Rich teal
  accentBright: "#00D4C8", // Bright mint
  accentDark: "#006B63", // Dark teal
  barPrimary: "#00897B", // Primary bar color
  barSecondary: "#00695C", // Secondary bar color
  highlight: "#00FFE5", // Bright highlight
};

const FONT_FAMILY = "Arial, Helvetica, sans-serif";
const FONT_WEIGHT_PRIMARY = "900";
const FONT_WEIGHT_SECONDARY = "600";
const FONT_SIZE_PRIMARY = 50;
const FONT_SIZE_SECONDARY = 25;

// Layout configuration
const LOWER_THIRD_LEFT_MARGIN = 80;
const LOWER_THIRD_BOTTOM_MARGIN = 110;
const BAR_HEIGHT = 4;
const TEXT_AREA_WIDTH = 510;
const TEXT_AREA_HEIGHT = 120;

export const LowerThird14: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // === PHASE DETECTION ===
  const isInEntrance = frame < TIMING.HOLD_START;
  const isInHold = frame >= TIMING.HOLD_START && frame < TIMING.EXIT_START;
  const isInExit = frame >= TIMING.EXIT_START;

  // === ENTRANCE ANIMATIONS ===

  // Bar 1 (top) slides in from left
  const bar1Width = interpolate(
    frame,
    [TIMING.ENTRANCE_START, TIMING.ENTRANCE_START + 22],
    [0, TEXT_AREA_WIDTH + 40],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // Bar 2 slides in from right
  const bar2Offset = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 6, TIMING.ENTRANCE_START + 26],
    [TEXT_AREA_WIDTH + 40, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  const bar2Width = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 6, TIMING.ENTRANCE_START + 26],
    [0, TEXT_AREA_WIDTH + 10],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // Bar 3 (middle divider) slides in from left
  const bar3Width = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 12, TIMING.ENTRANCE_START + 32],
    [0, TEXT_AREA_WIDTH - 20],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );

  // Bar 4 (bottom) slides in from right
  const bar4Offset = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 10, TIMING.ENTRANCE_START + 30],
    [TEXT_AREA_WIDTH + 40, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  const bar4Width = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 10, TIMING.ENTRANCE_START + 30],
    [0, TEXT_AREA_WIDTH + 30],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // Container opacity
  const containerOpacity = interpolate(
    frame,
    [TIMING.ENTRANCE_START, TIMING.ENTRANCE_START + 10],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Left vertical accent drops down
  const verticalAccentHeight = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 8, TIMING.ENTRANCE_START + 28],
    [0, TEXT_AREA_HEIGHT + 16],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // Primary text reveal - vertical clip mask
  const primaryTextReveal = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 22, TIMING.ENTRANCE_START + 40],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );

  // Secondary text reveal
  const secondaryTextReveal = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 30, TIMING.ENTRANCE_START + 46],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );

  // === HOLD ANIMATIONS ===

  // Bar glow pulse
  const barGlow = interpolate(
    Math.sin((frame - TIMING.HOLD_START) / 22),
    [-1, 1],
    [3, 10],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Accent pulse intensity
  const pulseIntensity = interpolate(
    Math.sin((frame - TIMING.HOLD_START) / 18),
    [-1, 1],
    [0.7, 1.3],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Horizontal shimmer sweep
  const shimmerX = interpolate(
    (frame - TIMING.HOLD_START) % 90,
    [0, 90],
    [-80, TEXT_AREA_WIDTH + 80],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Vertical accent glow
  const verticalGlow = interpolate(
    Math.sin((frame - TIMING.HOLD_START) / 20),
    [-1, 1],
    [4, 14],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // === EXIT ANIMATIONS ===

  // Bar 1 retracts to left
  const bar1ExitWidth = interpolate(
    frame,
    [TIMING.EXIT_START + 5, TIMING.EXIT_START + 30],
    [TEXT_AREA_WIDTH + 40, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  // Bar 2 slides out to right
  const bar2ExitOffset = interpolate(
    frame,
    [TIMING.EXIT_START + 8, TIMING.EXIT_START + 32],
    [0, TEXT_AREA_WIDTH + 40],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  // Bar 3 retracts to left
  const bar3ExitWidth = interpolate(
    frame,
    [TIMING.EXIT_START + 10, TIMING.EXIT_START + 34],
    [TEXT_AREA_WIDTH - 20, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.quad),
    }
  );

  // Bar 4 slides out to right
  const bar4ExitOffset = interpolate(
    frame,
    [TIMING.EXIT_START + 7, TIMING.EXIT_START + 33],
    [0, TEXT_AREA_WIDTH + 40],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  // Vertical accent retracts
  const verticalAccentExitHeight = interpolate(
    frame,
    [TIMING.EXIT_START + 12, TIMING.EXIT_START + 36],
    [TEXT_AREA_HEIGHT + 16, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  // Text exit opacity
  const textExitOpacity = interpolate(
    frame,
    [TIMING.EXIT_START, TIMING.EXIT_START + 20],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.quad),
    }
  );

  // Exit opacity
  const exitOpacity = interpolate(
    frame,
    [TIMING.EXIT_START + 20, TIMING.EXIT_START + TIMING.EXIT_DURATION],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  // === COMBINED VALUES ===

  const finalOpacity = isInExit ? exitOpacity : containerOpacity;

  const finalBar1Width = isInExit ? bar1ExitWidth : bar1Width;
  const finalBar2Offset = isInExit ? bar2ExitOffset : bar2Offset;
  const finalBar3Width = isInExit ? bar3ExitWidth : bar3Width;
  const finalBar4Offset = isInExit ? bar4ExitOffset : bar4Offset;

  const finalVerticalHeight = isInExit
    ? verticalAccentExitHeight
    : verticalAccentHeight;

  const finalPrimaryOpacity = isInExit
    ? textExitOpacity
    : primaryTextReveal;
  const finalSecondaryOpacity = isInExit
    ? textExitOpacity
    : secondaryTextReveal;

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
          width: TEXT_AREA_WIDTH + 50,
          height: TEXT_AREA_HEIGHT + 30,
          opacity: finalOpacity,
        }}
      >
        {/* Left vertical accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 6,
            height: finalVerticalHeight,
            background: `linear-gradient(180deg, ${COLORS.accentBright} 0%, ${COLORS.accent} 50%, ${COLORS.accentDark} 100%)`,
            boxShadow: isInHold
              ? `0 0 ${verticalGlow}px ${COLORS.accentBright}, ${verticalGlow / 3}px 0 ${verticalGlow * 2}px ${COLORS.accentDark}`
              : `0 0 6px ${COLORS.accent}`,
          }}
        />

        {/* Bar 1 - Top, slides from left */}
        <div
          style={{
            position: "absolute",
            left: 10,
            top: 0,
            width: finalBar1Width,
            height: BAR_HEIGHT,
            background: `linear-gradient(90deg, ${COLORS.accentBright} 0%, ${COLORS.accent} 60%, transparent 100%)`,
            boxShadow: isInHold
              ? `0 0 ${barGlow}px ${COLORS.accentBright}`
              : `0 0 4px ${COLORS.accent}`,
          }}
        />

        {/* Bar 2 - Below bar 1, slides from right */}
        <div
          style={{
            position: "absolute",
            left: 10 + finalBar2Offset,
            top: BAR_HEIGHT + 2,
            width: bar2Width,
            height: BAR_HEIGHT - 1,
            background: `linear-gradient(270deg, ${COLORS.accent} 0%, ${COLORS.accentDark} 70%, transparent 100%)`,
            boxShadow: isInHold
              ? `0 0 ${barGlow / 2}px ${COLORS.accent}`
              : "none",
          }}
        />

        {/* Bar 3 - Middle divider, slides from left */}
        <div
          style={{
            position: "absolute",
            left: 10,
            top: TEXT_AREA_HEIGHT / 2 + 10,
            width: finalBar3Width,
            height: 2,
            background: `linear-gradient(90deg, ${COLORS.accentBright} 0%, ${COLORS.accentDark} 80%, transparent 100%)`,
          }}
        />

        {/* Bar 4 - Bottom, slides from right */}
        <div
          style={{
            position: "absolute",
            left: 10 + finalBar4Offset,
            bottom: 0,
            width: bar4Width,
            height: BAR_HEIGHT,
            background: `linear-gradient(270deg, ${COLORS.accentBright} 0%, ${COLORS.accent} 60%, transparent 100%)`,
            boxShadow: isInHold
              ? `0 0 ${barGlow}px ${COLORS.accentBright}`
              : `0 0 4px ${COLORS.accent}`,
          }}
        />

        {/* Corner accent markers */}
        {/* Top-left */}
        <div
          style={{
            position: "absolute",
            left: 4,
            top: -3,
            width: 10,
            height: 10,
            background: COLORS.highlight,
            opacity: isInHold
              ? interpolate(
                  Math.sin((frame - TIMING.HOLD_START) / 14),
                  [-1, 1],
                  [0.4, 1.0],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                )
              : finalOpacity * 0.8,
            boxShadow: isInHold
              ? `0 0 ${8 * pulseIntensity}px ${COLORS.highlight}`
              : `0 0 4px ${COLORS.highlight}`,
          }}
        />

        {/* Bottom-right */}
        <div
          style={{
            position: "absolute",
            right: 20,
            bottom: -3,
            width: 8,
            height: 8,
            background: COLORS.accentBright,
            opacity: isInHold
              ? interpolate(
                  Math.sin((frame - TIMING.HOLD_START + 10) / 14),
                  [-1, 1],
                  [0.3, 0.9],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                )
              : finalOpacity * 0.7,
            boxShadow: isInHold
              ? `0 0 ${6 * pulseIntensity}px ${COLORS.accentBright}`
              : `0 0 3px ${COLORS.accentBright}`,
          }}
        />

        {/* Primary text */}
        <div
          style={{
            position: "absolute",
            left: 18,
            top: BAR_HEIGHT + 10,
            overflow: "hidden",
            height: TEXT_AREA_HEIGHT / 2 - 6,
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
                0 0 ${isInHold ? 12 * pulseIntensity : 6}px rgba(0, 168, 157, 0.4)
              `,
              opacity: finalPrimaryOpacity,
              transform: `translateY(${isInEntrance ? 30 * (1 - primaryTextReveal) : 0}px)`,
              whiteSpace: "nowrap",
            }}
          >
            {PRIMARY_TEXT}
          </div>
        </div>

        {/* Secondary text */}
        <div
          style={{
            position: "absolute",
            left: 18,
            top: TEXT_AREA_HEIGHT / 2 + 20,
            overflow: "hidden",
            height: TEXT_AREA_HEIGHT / 2 - 6,
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: `${FONT_SIZE_SECONDARY}px`,
              fontWeight: FONT_WEIGHT_SECONDARY,
              color: COLORS.secondary,
              letterSpacing: "1.5px",
              lineHeight: 1.3,
              textShadow: "0 2px 6px rgba(0, 0, 0, 0.8)",
              opacity: finalSecondaryOpacity,
              transform: `translateY(${isInEntrance ? 20 * (1 - secondaryTextReveal) : 0}px)`,
              whiteSpace: "nowrap",
            }}
          >
            {SECONDARY_TEXT}
          </div>
        </div>

        {/* Shimmer sweep during hold */}
        {isInHold && (
          <div
            style={{
              position: "absolute",
              left: shimmerX,
              top: BAR_HEIGHT,
              width: 50,
              height: TEXT_AREA_HEIGHT,
              background: `linear-gradient(90deg,
                transparent 0%,
                rgba(0, 212, 200, 0.06) 30%,
                rgba(0, 255, 229, 0.12) 50%,
                rgba(0, 212, 200, 0.06) 70%,
                transparent 100%)`,
              pointerEvents: "none",
            }}
          />
        )}

        {/* Small tick marks along vertical accent */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: -2,
              top: 15 + i * 30,
              width: 10,
              height: 2,
              background: COLORS.accentBright,
              opacity: isInHold
                ? interpolate(
                    Math.sin((frame - TIMING.HOLD_START + i * 8) / 10),
                    [-1, 1],
                    [0.3, 1.0],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  )
                : finalOpacity * 0.6,
              boxShadow: isInHold
                ? `0 0 ${4 * pulseIntensity}px ${COLORS.accentBright}`
                : "none",
            }}
          />
        ))}

        {/* Subtle background */}
        <div
          style={{
            position: "absolute",
            left: 8,
            top: BAR_HEIGHT + 2,
            right: 10,
            bottom: BAR_HEIGHT + 2,
            background: `rgba(0, 15, 14, ${isInHold ? 0.44 + 0.05 * interpolate(
              Math.sin((frame - TIMING.HOLD_START) / 25),
              [-1, 1],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ) : 0.44})`,
            zIndex: -1,
            pointerEvents: "none",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
