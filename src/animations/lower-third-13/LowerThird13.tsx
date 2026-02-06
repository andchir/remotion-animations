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
  // Phase 1: Entrance - diamond expands, text reveals
  ENTRANCE_START: 0,
  ENTRANCE_DURATION: 50, // ~1.67 seconds

  // Phase 2: Hold - shimmer and glow effects
  HOLD_START: 50,
  HOLD_DURATION: 85, // ~2.83 seconds

  // Phase 3: Exit - diamond contracts, elements fade
  EXIT_START: 135,
  EXIT_DURATION: 45, // 1.5 seconds
};

// Text configuration
const PRIMARY_TEXT = "JOHN SMITH";
const SECONDARY_TEXT = "Lead Design Engineer";

// Visual configuration - Golden amber theme
const COLORS = {
  primary: "#FFFFFF",
  secondary: "#FFE4B5",
  accent: "#D4920B", // Rich gold
  accentBright: "#FFB800", // Bright amber
  accentDark: "#8B6508", // Dark gold
  diamond: "#D4920B",
  diamondBright: "#FFD700",
  glow: "rgba(255, 184, 0, 0.6)",
};

const FONT_FAMILY = "Arial, Helvetica, sans-serif";
const FONT_WEIGHT_PRIMARY = "900";
const FONT_WEIGHT_SECONDARY = "600";
const FONT_SIZE_PRIMARY = 50;
const FONT_SIZE_SECONDARY = 25;

// Layout configuration
const LOWER_THIRD_LEFT_MARGIN = 80;
const LOWER_THIRD_BOTTOM_MARGIN = 110;
const DIAMOND_SIZE = 28;
const TEXT_AREA_WIDTH = 500;
const TEXT_AREA_HEIGHT = 110;

export const LowerThird13: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // === PHASE DETECTION ===
  const isInEntrance = frame < TIMING.HOLD_START;
  const isInHold = frame >= TIMING.HOLD_START && frame < TIMING.EXIT_START;
  const isInExit = frame >= TIMING.EXIT_START;

  // === ENTRANCE ANIMATIONS ===

  // Diamond scale from zero to full
  const diamondScale = interpolate(
    frame,
    [TIMING.ENTRANCE_START, TIMING.ENTRANCE_START + 18],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.back(1.4)),
    }
  );

  // Top horizontal line extends from diamond to right
  const topLineWidth = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 10, TIMING.ENTRANCE_START + 32],
    [0, TEXT_AREA_WIDTH],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // Bottom horizontal line extends from diamond to right
  const bottomLineWidth = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 14, TIMING.ENTRANCE_START + 35],
    [0, TEXT_AREA_WIDTH - 40],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // Container opacity
  const containerOpacity = interpolate(
    frame,
    [TIMING.ENTRANCE_START, TIMING.ENTRANCE_START + 12],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Primary text slides in from left with clip reveal
  const primaryTextClip = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 20, TIMING.ENTRANCE_START + 40],
    [0, 100],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );

  // Secondary text slides in slightly later
  const secondaryTextClip = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 28, TIMING.ENTRANCE_START + 46],
    [0, 100],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );

  // End diamond appears at end of top line
  const endDiamondScale = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 28, TIMING.ENTRANCE_START + 38],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.back(1.2)),
    }
  );

  // === HOLD ANIMATIONS ===

  // Diamond rotation pulse
  const diamondRotation = interpolate(
    Math.sin((frame - TIMING.HOLD_START) / 30),
    [-1, 1],
    [-5, 5],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Gold shimmer sweep across the text area
  const shimmerPosition = interpolate(
    (frame - TIMING.HOLD_START) % 80,
    [0, 80],
    [-100, TEXT_AREA_WIDTH + 100],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Glow pulse on diamond and lines
  const glowIntensity = interpolate(
    Math.sin((frame - TIMING.HOLD_START) / 20),
    [-1, 1],
    [0.6, 1.4],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Line glow
  const lineGlow = interpolate(
    Math.sin((frame - TIMING.HOLD_START) / 25),
    [-1, 1],
    [4, 12],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // End diamond pulse
  const endDiamondPulse = interpolate(
    Math.sin((frame - TIMING.HOLD_START) / 16),
    [-1, 1],
    [0.7, 1.0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // === EXIT ANIMATIONS ===

  // Text clips back to hidden
  const primaryTextExitClip = interpolate(
    frame,
    [TIMING.EXIT_START, TIMING.EXIT_START + 22],
    [100, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.quad),
    }
  );

  const secondaryTextExitClip = interpolate(
    frame,
    [TIMING.EXIT_START + 3, TIMING.EXIT_START + 20],
    [100, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.quad),
    }
  );

  // Lines retract
  const topLineExitWidth = interpolate(
    frame,
    [TIMING.EXIT_START + 10, TIMING.EXIT_START + 35],
    [TEXT_AREA_WIDTH, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  const bottomLineExitWidth = interpolate(
    frame,
    [TIMING.EXIT_START + 12, TIMING.EXIT_START + 37],
    [TEXT_AREA_WIDTH - 40, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  // Diamond shrinks
  const diamondExitScale = interpolate(
    frame,
    [TIMING.EXIT_START + 25, TIMING.EXIT_START + 40],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  // End diamond fades
  const endDiamondExitScale = interpolate(
    frame,
    [TIMING.EXIT_START + 8, TIMING.EXIT_START + 25],
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

  const finalDiamondScale = isInEntrance
    ? diamondScale
    : isInExit
    ? diamondExitScale
    : 1;

  const finalEndDiamondScale = isInEntrance
    ? endDiamondScale
    : isInExit
    ? endDiamondExitScale
    : 1;

  const finalTopLineWidth = isInExit ? topLineExitWidth : topLineWidth;
  const finalBottomLineWidth = isInExit ? bottomLineExitWidth : bottomLineWidth;

  const finalPrimaryClip = isInExit ? primaryTextExitClip : primaryTextClip;
  const finalSecondaryClip = isInExit ? secondaryTextExitClip : secondaryTextClip;

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
          width: TEXT_AREA_WIDTH + 80,
          height: TEXT_AREA_HEIGHT + 40,
          opacity: finalOpacity,
        }}
      >
        {/* Main diamond accent at left */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: TEXT_AREA_HEIGHT / 2 - DIAMOND_SIZE / 2 + 8,
            width: DIAMOND_SIZE,
            height: DIAMOND_SIZE,
            background: `linear-gradient(135deg, ${COLORS.diamondBright} 0%, ${COLORS.accent} 50%, ${COLORS.accentDark} 100%)`,
            transform: `rotate(45deg) scale(${finalDiamondScale}) rotate(${isInHold ? diamondRotation : 0}deg)`,
            boxShadow: isInHold
              ? `0 0 ${lineGlow * glowIntensity}px ${COLORS.glow}, inset 0 0 4px rgba(255, 215, 0, 0.4)`
              : `0 0 8px ${COLORS.glow}`,
          }}
        />

        {/* Top horizontal line */}
        <div
          style={{
            position: "absolute",
            left: DIAMOND_SIZE + 10,
            top: 6,
            width: finalTopLineWidth,
            height: 3,
            background: `linear-gradient(90deg, ${COLORS.accentBright} 0%, ${COLORS.accent} 60%, ${COLORS.accentDark} 100%)`,
            boxShadow: isInHold
              ? `0 0 ${lineGlow}px ${COLORS.glow}`
              : `0 0 4px ${COLORS.glow}`,
          }}
        />

        {/* Bottom horizontal line */}
        <div
          style={{
            position: "absolute",
            left: DIAMOND_SIZE + 10,
            top: TEXT_AREA_HEIGHT + 4,
            width: finalBottomLineWidth,
            height: 2,
            background: `linear-gradient(90deg, ${COLORS.accent} 0%, ${COLORS.accentDark} 80%, transparent 100%)`,
            boxShadow: isInHold
              ? `0 0 ${lineGlow / 2}px ${COLORS.glow}`
              : "none",
          }}
        />

        {/* Thin vertical connector at diamond position */}
        <div
          style={{
            position: "absolute",
            left: DIAMOND_SIZE / 2 - 1,
            top: 6,
            width: 2,
            height: isInExit
              ? interpolate(
                  frame,
                  [TIMING.EXIT_START + 15, TIMING.EXIT_START + 35],
                  [TEXT_AREA_HEIGHT, 0],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.quad) }
                )
              : interpolate(
                  frame,
                  [TIMING.ENTRANCE_START + 16, TIMING.ENTRANCE_START + 30],
                  [0, TEXT_AREA_HEIGHT],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) }
                ),
            background: `linear-gradient(180deg, ${COLORS.accentBright} 0%, ${COLORS.accentDark} 100%)`,
            opacity: 0.6,
          }}
        />

        {/* End diamond at top-right */}
        <div
          style={{
            position: "absolute",
            left: DIAMOND_SIZE + 10 + finalTopLineWidth - 6,
            top: 0,
            width: 14,
            height: 14,
            background: COLORS.accentBright,
            transform: `rotate(45deg) scale(${finalEndDiamondScale})`,
            opacity: isInHold ? endDiamondPulse : 1,
            boxShadow: isInHold
              ? `0 0 ${8 * glowIntensity}px ${COLORS.glow}`
              : `0 0 4px ${COLORS.glow}`,
          }}
        />

        {/* Primary text with clip reveal */}
        <div
          style={{
            position: "absolute",
            left: DIAMOND_SIZE + 16,
            top: 16,
            width: TEXT_AREA_WIDTH,
            overflow: "hidden",
            clipPath: `inset(0 ${100 - finalPrimaryClip}% 0 0)`,
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
                0 0 ${isInHold ? 12 * glowIntensity : 6}px rgba(212, 146, 11, 0.4)
              `,
              whiteSpace: "nowrap",
            }}
          >
            {PRIMARY_TEXT}
          </div>
        </div>

        {/* Secondary text with clip reveal */}
        <div
          style={{
            position: "absolute",
            left: DIAMOND_SIZE + 16,
            top: TEXT_AREA_HEIGHT / 2 + 22,
            width: TEXT_AREA_WIDTH,
            overflow: "hidden",
            clipPath: `inset(0 ${100 - finalSecondaryClip}% 0 0)`,
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
              whiteSpace: "nowrap",
            }}
          >
            {SECONDARY_TEXT}
          </div>
        </div>

        {/* Gold shimmer sweep during hold */}
        {isInHold && (
          <div
            style={{
              position: "absolute",
              left: DIAMOND_SIZE + shimmerPosition,
              top: 6,
              width: 60,
              height: TEXT_AREA_HEIGHT,
              background: `linear-gradient(90deg,
                transparent 0%,
                rgba(255, 215, 0, 0.08) 30%,
                rgba(255, 184, 0, 0.15) 50%,
                rgba(255, 215, 0, 0.08) 70%,
                transparent 100%)`,
              pointerEvents: "none",
            }}
          />
        )}

        {/* Small decorative diamonds along bottom line */}
        {[0, 1].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: DIAMOND_SIZE + 10 + 120 + i * 160,
              top: TEXT_AREA_HEIGHT + 0,
              width: 8,
              height: 8,
              background: COLORS.accent,
              transform: "rotate(45deg)",
              opacity: isInHold
                ? interpolate(
                    Math.sin((frame - TIMING.HOLD_START + i * 15) / 14),
                    [-1, 1],
                    [0.4, 1.0],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  )
                : finalOpacity * 0.7,
              boxShadow: isInHold
                ? `0 0 ${6 * glowIntensity}px ${COLORS.glow}`
                : `0 0 3px ${COLORS.glow}`,
            }}
          />
        ))}

        {/* Subtle background fill */}
        <div
          style={{
            position: "absolute",
            left: DIAMOND_SIZE + 8,
            top: 8,
            right: 20,
            bottom: 10,
            background: `rgba(30, 18, 0, ${isInHold ? 0.42 + 0.05 * interpolate(
              Math.sin((frame - TIMING.HOLD_START) / 25),
              [-1, 1],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ) : 0.42})`,
            zIndex: -1,
            pointerEvents: "none",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
