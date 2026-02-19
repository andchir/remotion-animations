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
  // Phase 1: Entrance - kinetic split reveal
  ENTRANCE_START: 0,
  ENTRANCE_DURATION: 55, // ~1.83 seconds

  // Phase 2: Hold - subtle motion and glitch
  HOLD_START: 55,
  HOLD_DURATION: 95, // ~3.17 seconds

  // Phase 3: Exit - kinetic collapse
  EXIT_START: 150,
  EXIT_DURATION: 30, // 1 second
};

// Text configuration
const PRIMARY_TEXT = "MARCUS WEBB";
const SECONDARY_TEXT = "Creative Technologist";

// Visual configuration
const COLORS = {
  primary: "#FFFFFF",
  secondary: "#E0E0E0",
  accent: "#FF4D00", // Electric orange
  accentSecondary: "#00D9FF", // Cyan
  darkPanel: "#0A0A12", // Deep navy
  gridLine: "rgba(255, 77, 0, 0.3)",
};

const FONT_FAMILY = "Arial, Helvetica, sans-serif";
const FONT_WEIGHT_PRIMARY = "900";
const FONT_WEIGHT_SECONDARY = "600";
const FONT_SIZE_PRIMARY = 56;
const FONT_SIZE_SECONDARY = 22;

// Layout configuration
const LOWER_THIRD_LEFT_MARGIN = 100;
const LOWER_THIRD_BOTTOM_MARGIN = 140;

export const LowerThird20: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calculate phase progress
  const entranceProgress = interpolate(
    frame,
    [TIMING.ENTRANCE_START, TIMING.ENTRANCE_START + TIMING.ENTRANCE_DURATION],
    [0, 1],
    { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }
  );

  const holdProgress = interpolate(
    frame,
    [TIMING.HOLD_START, TIMING.HOLD_START + TIMING.HOLD_DURATION],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  const exitProgress = interpolate(
    frame,
    [TIMING.EXIT_START, TIMING.EXIT_START + TIMING.EXIT_DURATION],
    [0, 1],
    { extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) }
  );

  // === SPLIT SCREEN ANIMATIONS ===

  // Top panel slides from top
  const topPanelSlideY = interpolate(
    entranceProgress,
    [0, 0.7],
    [-200, 0],
    { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }
  );

  // Bottom panel slides from bottom
  const bottomPanelSlideY = interpolate(
    entranceProgress,
    [0.1, 0.8],
    [200, 0],
    { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }
  );

  // Center accent line expands
  const centerLineScale = interpolate(
    entranceProgress,
    [0.3, 0.9],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  // Exit animations
  const exitTopSlideY = interpolate(
    exitProgress,
    [0, 1],
    [0, -200],
    { extrapolateLeft: "clamp" }
  );

  const exitBottomSlideY = interpolate(
    exitProgress,
    [0, 1],
    [0, 200],
    { extrapolateLeft: "clamp" }
  );

  const finalTopSlideY = exitProgress > 0 ? exitTopSlideY : topPanelSlideY;
  const finalBottomSlideY = exitProgress > 0 ? exitBottomSlideY : bottomPanelSlideY;

  // === KINETIC TEXT ANIMATIONS ===

  // Primary text slides from left with kinetic energy
  const primaryTextSlideX = interpolate(
    entranceProgress,
    [0.2, 0.8],
    [-400, 0],
    { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }
  );

  const primaryTextOpacity = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 15, TIMING.ENTRANCE_START + 40, TIMING.EXIT_START + 5, TIMING.EXIT_START + 20],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" }
  );

  // Secondary text slides from right
  const secondaryTextSlideX = interpolate(
    entranceProgress,
    [0.3, 0.85],
    [300, 0],
    { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }
  );

  const secondaryTextOpacity = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 25, TIMING.ENTRANCE_START + 45, TIMING.EXIT_START + 5, TIMING.EXIT_START + 20],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" }
  );

  // === GLITCH EFFECT ===

  const holdTime = frame - TIMING.HOLD_START;

  // Random glitch offset for secondary text during hold
  const glitchOffsetX = (() => {
    if (frame < TIMING.HOLD_START || frame >= TIMING.EXIT_START) return 0;
    // Occasional glitch every ~40 frames
    const glitchCycle = Math.floor(holdTime / 40);
    const glitchPhase = holdTime % 40;
    if (glitchPhase < 5) {
      return Math.sin(glitchCycle * 123.45) * 4;
    }
    return 0;
  })();

  const glitchOpacity = (() => {
    if (frame < TIMING.HOLD_START || frame >= TIMING.EXIT_START) return 1;
    const glitchPhase = holdTime % 40;
    if (glitchPhase < 3) return 0.7;
    return 1;
  })();

  // === GEOMETRIC ACCENTS ===

  // Animated corner brackets
  const bracketScale = interpolate(
    entranceProgress,
    [0.4, 0.9],
    [0, 1],
    { extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.7)) }
  );

  const exitBracketScale = interpolate(
    exitProgress,
    [0, 0.5],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  const finalBracketScale = exitProgress > 0 ? exitBracketScale : bracketScale;

  // Diagonal lines animation
  const diagonalLineOpacity = interpolate(
    entranceProgress,
    [0.5, 0.9],
    [0, 0.6],
    { extrapolateRight: "clamp" }
  );

  // Grid pulse during hold
  const gridPulse = Math.sin(holdTime / 15) * 0.3 + 0.7;

  // Character stagger animation with kinetic energy
  const renderKineticText = (
    text: string,
    fontSize: number,
    fontWeight: string,
    color: string,
    baseDelay: number,
    direction: "left" | "right"
  ) => {
    return text.split("").map((char, index) => {
      const charDelay = baseDelay + index * 0.8;

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

      const charExitOpacity = interpolate(
        frame,
        [TIMING.EXIT_START + index * 0.3, TIMING.EXIT_START + 10 + index * 0.3],
        [1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      );

      const slideDirection = direction === "left" ? -1 : 1;
      const charTranslateX = interpolate(
        charProgress,
        [0, 1],
        [slideDirection * 50, 0],
        { extrapolateRight: "clamp" }
      );

      const charScale = interpolate(
        charProgress,
        [0, 0.5, 1],
        [1.5, 1.1, 1],
        { extrapolateRight: "clamp" }
      );

      return (
        <span
          key={index}
          style={{
            display: "inline-block",
            opacity: charProgress * charExitOpacity,
            transform: `translateX(${charTranslateX}px) scale(${charScale})`,
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
      {/* Top dark panel */}
      <div
        style={{
          position: "absolute",
          left: LOWER_THIRD_LEFT_MARGIN - 50,
          bottom: LOWER_THIRD_BOTTOM_MARGIN + 45,
          width: 550,
          height: 55,
          background: COLORS.darkPanel,
          transform: `translateY(${finalTopSlideY}px)`,
          clipPath: "polygon(0 0, calc(100% - 25px) 0, 100% 100%, 0 100%)",
        }}
      />

      {/* Bottom accent panel */}
      <div
        style={{
          position: "absolute",
          left: LOWER_THIRD_LEFT_MARGIN - 50,
          bottom: LOWER_THIRD_BOTTOM_MARGIN - 5,
          width: 500,
          height: 45,
          background: `linear-gradient(90deg, ${COLORS.accent} 0%, ${COLORS.accentSecondary} 100%)`,
          transform: `translateY(${finalBottomSlideY}px)`,
          clipPath: "polygon(0 0, 100% 0, calc(100% - 20px) 100%, 0 100%)",
        }}
      />

      {/* Center accent line */}
      <div
        style={{
          position: "absolute",
          left: LOWER_THIRD_LEFT_MARGIN - 50,
          bottom: LOWER_THIRD_BOTTOM_MARGIN + 43,
          width: 400,
          height: 4,
          background: COLORS.accent,
          transform: `scaleX(${centerLineScale * (exitProgress > 0 ? interpolate(exitProgress, [0, 0.5], [1, 0]) : 1)})`,
          transformOrigin: "left",
        }}
      />

      {/* Corner bracket - top left */}
      <div
        style={{
          position: "absolute",
          left: LOWER_THIRD_LEFT_MARGIN - 55,
          bottom: LOWER_THIRD_BOTTOM_MARGIN + 95,
          width: 20,
          height: 20,
          borderLeft: `3px solid ${COLORS.accentSecondary}`,
          borderTop: `3px solid ${COLORS.accentSecondary}`,
          transform: `scale(${finalBracketScale})`,
          transformOrigin: "bottom right",
          opacity: primaryTextOpacity,
        }}
      />

      {/* Corner bracket - bottom right */}
      <div
        style={{
          position: "absolute",
          left: LOWER_THIRD_LEFT_MARGIN + 420,
          bottom: LOWER_THIRD_BOTTOM_MARGIN - 10,
          width: 20,
          height: 20,
          borderRight: `3px solid ${COLORS.accentSecondary}`,
          borderBottom: `3px solid ${COLORS.accentSecondary}`,
          transform: `scale(${finalBracketScale})`,
          transformOrigin: "top left",
          opacity: primaryTextOpacity,
        }}
      />

      {/* Diagonal accent lines */}
      <div
        style={{
          position: "absolute",
          left: LOWER_THIRD_LEFT_MARGIN + 350,
          bottom: LOWER_THIRD_BOTTOM_MARGIN + 20,
          width: 60,
          height: 2,
          background: COLORS.accentSecondary,
          transform: "rotate(-45deg)",
          opacity: diagonalLineOpacity * gridPulse,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: LOWER_THIRD_LEFT_MARGIN + 370,
          bottom: LOWER_THIRD_BOTTOM_MARGIN + 35,
          width: 30,
          height: 2,
          background: COLORS.accentSecondary,
          transform: "rotate(-45deg)",
          opacity: diagonalLineOpacity * gridPulse * 0.7,
        }}
      />

      {/* Primary text */}
      <div
        style={{
          position: "absolute",
          left: LOWER_THIRD_LEFT_MARGIN - 30,
          bottom: LOWER_THIRD_BOTTOM_MARGIN + 50,
          transform: `translateX(${primaryTextSlideX}px)`,
          opacity: primaryTextOpacity,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: `${FONT_SIZE_PRIMARY}px`,
            fontWeight: FONT_WEIGHT_PRIMARY,
            color: COLORS.primary,
            letterSpacing: "4px",
            lineHeight: 1,
            textTransform: "uppercase",
            textShadow: `0 0 20px ${COLORS.accentSecondary}40`,
          }}
        >
          {renderKineticText(
            PRIMARY_TEXT,
            FONT_SIZE_PRIMARY,
            FONT_WEIGHT_PRIMARY,
            COLORS.primary,
            TIMING.ENTRANCE_START + 10,
            "left"
          )}
        </div>
      </div>

      {/* Secondary text with glitch effect */}
      <div
        style={{
          position: "absolute",
          left: LOWER_THIRD_LEFT_MARGIN - 30,
          bottom: LOWER_THIRD_BOTTOM_MARGIN + 12,
          transform: `translateX(${secondaryTextSlideX + glitchOffsetX}px)`,
          opacity: secondaryTextOpacity * glitchOpacity,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: `${FONT_SIZE_SECONDARY}px`,
            fontWeight: FONT_WEIGHT_SECONDARY,
            color: COLORS.darkPanel,
            letterSpacing: "6px",
            lineHeight: 1,
            textTransform: "uppercase",
          }}
        >
          {renderKineticText(
            SECONDARY_TEXT,
            FONT_SIZE_SECONDARY,
            FONT_WEIGHT_SECONDARY,
            COLORS.darkPanel,
            TIMING.ENTRANCE_START + 20,
            "right"
          )}
        </div>
      </div>

      {/* Glitch shadow text (shows when glitching) */}
      {glitchOffsetX !== 0 && (
        <div
          style={{
            position: "absolute",
            left: LOWER_THIRD_LEFT_MARGIN - 30 + glitchOffsetX * 0.5,
            bottom: LOWER_THIRD_BOTTOM_MARGIN + 12,
            transform: `translateX(${secondaryTextSlideX}px)`,
            opacity: 0.4,
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: `${FONT_SIZE_SECONDARY}px`,
              fontWeight: FONT_WEIGHT_SECONDARY,
              color: COLORS.accent,
              letterSpacing: "6px",
              lineHeight: 1,
              textTransform: "uppercase",
            }}
          >
            {SECONDARY_TEXT}
          </div>
        </div>
      )}

      {/* Decorative grid dots */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: LOWER_THIRD_LEFT_MARGIN + 480 + i * 8,
            bottom: LOWER_THIRD_BOTTOM_MARGIN + 20 + (i % 2) * 10,
            width: 3,
            height: 3,
            background: COLORS.accent,
            opacity: diagonalLineOpacity * gridPulse,
            transform: `scale(${interpolate(
              frame,
              [TIMING.ENTRANCE_START + 40 + i * 3, TIMING.ENTRANCE_START + 50 + i * 3],
              [0, 1],
              { extrapolateRight: "clamp" }
            )})`,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
