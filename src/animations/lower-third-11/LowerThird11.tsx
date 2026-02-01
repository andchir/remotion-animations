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
  // Phase 1: Entrance - brackets slide in, text reveals
  ENTRANCE_START: 0,
  ENTRANCE_DURATION: 50, // ~1.67 seconds

  // Phase 2: Hold - subtle pulsing and scan effects
  HOLD_START: 50,
  HOLD_DURATION: 85, // ~2.83 seconds

  // Phase 3: Exit - brackets unlock, elements slide away
  EXIT_START: 135,
  EXIT_DURATION: 45, // 1.5 seconds
};

// Text configuration
const PRIMARY_TEXT = "JOHN SMITH";
const SECONDARY_TEXT = "Lead Design Engineer";

// Visual configuration - Deep crimson corporate theme
const COLORS = {
  primary: "#FFFFFF",
  secondary: "#F0D0D0",
  accent: "#C41E3A", // Deep crimson
  accentBright: "#E8344E", // Bright crimson
  accentDark: "#8B1425", // Dark crimson
  bracketFill: "rgba(140, 20, 40, 0.85)",
  divider: "#E8344E",
  marker: "#FF6B7A",
};

const FONT_FAMILY = "Arial, Helvetica, sans-serif";
const FONT_WEIGHT_PRIMARY = "900";
const FONT_WEIGHT_SECONDARY = "600";
const FONT_SIZE_PRIMARY = 52;
const FONT_SIZE_SECONDARY = 26;

// Layout configuration
const LOWER_THIRD_LEFT_MARGIN = 80;
const LOWER_THIRD_BOTTOM_MARGIN = 115;
const BRACKET_THICKNESS = 6;
const BRACKET_ARM_LENGTH = 40;
const TEXT_AREA_WIDTH = 480;
const TEXT_AREA_HEIGHT = 120;

export const LowerThird11: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // === PHASE DETECTION ===
  const isInEntrance = frame < TIMING.HOLD_START;
  const isInHold = frame >= TIMING.HOLD_START && frame < TIMING.EXIT_START;
  const isInExit = frame >= TIMING.EXIT_START;

  // === ENTRANCE ANIMATIONS ===

  // Top-left bracket slides in from upper-left
  const bracketTopLeftX = interpolate(
    frame,
    [TIMING.ENTRANCE_START, TIMING.ENTRANCE_START + 30],
    [-200, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  const bracketTopLeftY = interpolate(
    frame,
    [TIMING.ENTRANCE_START, TIMING.ENTRANCE_START + 30],
    [-100, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // Bottom-right bracket slides in from lower-right
  const bracketBottomRightX = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 8, TIMING.ENTRANCE_START + 35],
    [200, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  const bracketBottomRightY = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 8, TIMING.ENTRANCE_START + 35],
    [100, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // Horizontal divider extends from left edge
  const dividerWidth = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 15, TIMING.ENTRANCE_START + 40],
    [0, TEXT_AREA_WIDTH + 20],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );

  // Container opacity
  const containerOpacity = interpolate(
    frame,
    [TIMING.ENTRANCE_START, TIMING.ENTRANCE_START + 15],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Primary text reveal - slides up from below with clip
  const primaryTextReveal = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 25, TIMING.ENTRANCE_START + 42],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );

  // Secondary text reveal - slightly delayed
  const secondaryTextReveal = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 32, TIMING.ENTRANCE_START + 48],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );

  // === HOLD ANIMATIONS ===

  // Scan line effect moving through bracket area
  const scanLinePosition = interpolate(
    (frame - TIMING.HOLD_START) % 70,
    [0, 70],
    [-10, TEXT_AREA_HEIGHT + 30],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Pulse effect on accent elements
  const pulseIntensity = interpolate(
    Math.sin((frame - TIMING.HOLD_START) / 20),
    [-1, 1],
    [0.7, 1.3],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Marker dot blink cycle
  const markerOpacity = interpolate(
    Math.sin((frame - TIMING.HOLD_START) / 15),
    [-1, 1],
    [0.4, 1.0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Divider glow pulse
  const dividerGlow = interpolate(
    Math.sin((frame - TIMING.HOLD_START) / 25),
    [-1, 1],
    [4, 12],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // === EXIT ANIMATIONS ===

  // Top-left bracket slides out to upper-left
  const bracketTopLeftExitX = interpolate(
    frame,
    [TIMING.EXIT_START + 5, TIMING.EXIT_START + 35],
    [0, -250],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  const bracketTopLeftExitY = interpolate(
    frame,
    [TIMING.EXIT_START + 5, TIMING.EXIT_START + 35],
    [0, -120],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  // Bottom-right bracket slides out to lower-right
  const bracketBottomRightExitX = interpolate(
    frame,
    [TIMING.EXIT_START + 10, TIMING.EXIT_START + 38],
    [0, 250],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  const bracketBottomRightExitY = interpolate(
    frame,
    [TIMING.EXIT_START + 10, TIMING.EXIT_START + 38],
    [0, 120],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  // Divider retracts
  const dividerExitWidth = interpolate(
    frame,
    [TIMING.EXIT_START, TIMING.EXIT_START + 30],
    [TEXT_AREA_WIDTH + 20, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.quad),
    }
  );

  // Exit opacity
  const exitOpacity = interpolate(
    frame,
    [TIMING.EXIT_START + 10, TIMING.EXIT_START + TIMING.EXIT_DURATION],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  // Text exit
  const textExitOpacity = interpolate(
    frame,
    [TIMING.EXIT_START, TIMING.EXIT_START + 25],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.quad),
    }
  );

  // === COMBINED VALUES ===

  const finalOpacity = isInExit ? exitOpacity : containerOpacity;

  const finalBracketTLX = isInEntrance
    ? bracketTopLeftX
    : isInExit
    ? bracketTopLeftExitX
    : 0;
  const finalBracketTLY = isInEntrance
    ? bracketTopLeftY
    : isInExit
    ? bracketTopLeftExitY
    : 0;
  const finalBracketBRX = isInEntrance
    ? bracketBottomRightX
    : isInExit
    ? bracketBottomRightExitX
    : 0;
  const finalBracketBRY = isInEntrance
    ? bracketBottomRightY
    : isInExit
    ? bracketBottomRightExitY
    : 0;

  const finalDividerWidth = isInExit ? dividerExitWidth : dividerWidth;

  const finalPrimaryTextOpacity =
    (isInExit ? textExitOpacity : primaryTextReveal) * finalOpacity;
  const finalSecondaryTextOpacity =
    (isInExit ? textExitOpacity : secondaryTextReveal) * finalOpacity;

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
          width: TEXT_AREA_WIDTH + 40,
          height: TEXT_AREA_HEIGHT + 40,
          opacity: finalOpacity,
        }}
      >
        {/* Top-left L-bracket */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            transform: `translate(${finalBracketTLX}px, ${finalBracketTLY}px)`,
          }}
        >
          {/* Horizontal arm */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: BRACKET_ARM_LENGTH + 60,
              height: BRACKET_THICKNESS,
              background: `linear-gradient(90deg, ${COLORS.accent} 0%, ${COLORS.accentBright} 100%)`,
              boxShadow: isInHold
                ? `0 0 ${dividerGlow * pulseIntensity}px ${COLORS.accentBright}`
                : `0 0 6px ${COLORS.accent}`,
            }}
          />
          {/* Vertical arm */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: BRACKET_THICKNESS,
              height: BRACKET_ARM_LENGTH + 30,
              background: `linear-gradient(180deg, ${COLORS.accent} 0%, ${COLORS.accentDark} 100%)`,
              boxShadow: isInHold
                ? `0 0 ${dividerGlow * pulseIntensity}px ${COLORS.accent}`
                : `0 0 6px ${COLORS.accent}`,
            }}
          />
        </div>

        {/* Bottom-right L-bracket */}
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            transform: `translate(${finalBracketBRX}px, ${finalBracketBRY}px)`,
          }}
        >
          {/* Horizontal arm */}
          <div
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              width: BRACKET_ARM_LENGTH + 60,
              height: BRACKET_THICKNESS,
              background: `linear-gradient(270deg, ${COLORS.accent} 0%, ${COLORS.accentBright} 100%)`,
              boxShadow: isInHold
                ? `0 0 ${dividerGlow * pulseIntensity}px ${COLORS.accentBright}`
                : `0 0 6px ${COLORS.accent}`,
            }}
          />
          {/* Vertical arm */}
          <div
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              width: BRACKET_THICKNESS,
              height: BRACKET_ARM_LENGTH + 30,
              background: `linear-gradient(0deg, ${COLORS.accent} 0%, ${COLORS.accentDark} 100%)`,
              boxShadow: isInHold
                ? `0 0 ${dividerGlow * pulseIntensity}px ${COLORS.accent}`
                : `0 0 6px ${COLORS.accent}`,
            }}
          />
        </div>

        {/* Horizontal divider line between primary and secondary text */}
        <div
          style={{
            position: "absolute",
            left: BRACKET_THICKNESS + 10,
            top: TEXT_AREA_HEIGHT / 2 + 12,
            width: finalDividerWidth,
            height: 3,
            background: `linear-gradient(90deg, ${COLORS.divider} 0%, ${COLORS.marker} 60%, transparent 100%)`,
            boxShadow: isInHold
              ? `0 0 ${dividerGlow}px ${COLORS.divider}`
              : `0 0 4px ${COLORS.divider}`,
          }}
        />

        {/* Small accent marker at divider start */}
        <div
          style={{
            position: "absolute",
            left: BRACKET_THICKNESS + 4,
            top: TEXT_AREA_HEIGHT / 2 + 8,
            width: 10,
            height: 10,
            background: COLORS.accentBright,
            opacity: isInHold ? markerOpacity : finalOpacity,
            boxShadow: isInHold
              ? `0 0 ${8 * pulseIntensity}px ${COLORS.accentBright}`
              : `0 0 4px ${COLORS.accentBright}`,
          }}
        />

        {/* Small accent marker at top-right area */}
        <div
          style={{
            position: "absolute",
            right: 20,
            top: 16,
            width: 8,
            height: 8,
            background: COLORS.marker,
            opacity: isInHold
              ? interpolate(
                  Math.sin((frame - TIMING.HOLD_START) / 12),
                  [-1, 1],
                  [0.3, 1.0],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }
                )
              : finalOpacity,
            boxShadow: isInHold
              ? `0 0 ${6 * pulseIntensity}px ${COLORS.marker}`
              : `0 0 3px ${COLORS.marker}`,
          }}
        />

        {/* Primary text */}
        <div
          style={{
            position: "absolute",
            left: BRACKET_THICKNESS + 16,
            top: 14,
            overflow: "hidden",
            height: TEXT_AREA_HEIGHT / 2 - 4,
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
                0 0 ${isInHold ? 12 * pulseIntensity : 8}px rgba(196, 30, 58, 0.5)
              `,
              opacity: finalPrimaryTextOpacity,
              transform: `translateY(${isInEntrance ? 30 * (1 - primaryTextReveal) : 0}px)`,
            }}
          >
            {PRIMARY_TEXT}
          </div>
        </div>

        {/* Secondary text */}
        <div
          style={{
            position: "absolute",
            left: BRACKET_THICKNESS + 16,
            top: TEXT_AREA_HEIGHT / 2 + 24,
            overflow: "hidden",
            height: TEXT_AREA_HEIGHT / 2 - 4,
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
              opacity: finalSecondaryTextOpacity,
              transform: `translateY(${isInEntrance ? 20 * (1 - secondaryTextReveal) : 0}px)`,
            }}
          >
            {SECONDARY_TEXT}
          </div>
        </div>

        {/* Scan line effect during hold */}
        {isInHold && (
          <div
            style={{
              position: "absolute",
              left: 0,
              top: scanLinePosition,
              width: TEXT_AREA_WIDTH + 40,
              height: 2,
              background: `linear-gradient(90deg,
                transparent 0%,
                rgba(232, 52, 78, 0.3) 20%,
                rgba(232, 52, 78, 0.5) 50%,
                rgba(232, 52, 78, 0.3) 80%,
                transparent 100%)`,
              pointerEvents: "none",
            }}
          />
        )}

        {/* Subtle background fill between brackets during hold */}
        <div
          style={{
            position: "absolute",
            left: BRACKET_THICKNESS,
            top: BRACKET_THICKNESS,
            right: BRACKET_THICKNESS,
            bottom: BRACKET_THICKNESS,
            background: `rgba(30, 5, 10, ${isInHold ? 0.4 + 0.1 * (pulseIntensity - 0.7) : 0.4})`,
            zIndex: -1,
            pointerEvents: "none",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
