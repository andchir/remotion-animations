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
  // Phase 1: Entrance - cursor blinks, text types in
  ENTRANCE_START: 0,
  ENTRANCE_DURATION: 50, // ~1.67 seconds

  // Phase 2: Hold - subtle pulse and data stream effects
  HOLD_START: 50,
  HOLD_DURATION: 85, // ~2.83 seconds

  // Phase 3: Exit - cursor erases, elements slide away
  EXIT_START: 135,
  EXIT_DURATION: 45, // 1.5 seconds
};

// Text configuration
const PRIMARY_TEXT = "JOHN SMITH";
const SECONDARY_TEXT = "Lead Design Engineer";

// Visual configuration - Terminal green theme
const COLORS = {
  primary: "#00FF88", // Bright terminal green
  secondary: "#00CC6A", // Slightly dimmer green
  accent: "#00FFAA", // Bright accent green
  accentDim: "#008855", // Dim green
  cursor: "#00FF88",
  lineNumber: "#3A6B4A", // Muted green for line numbers
  pipe: "#00DDAA", // Pipeline bar color
  pipeDim: "#005533",
};

const FONT_FAMILY = "Arial, Helvetica, sans-serif";
const FONT_WEIGHT_PRIMARY = "900";
const FONT_WEIGHT_SECONDARY = "600";
const FONT_SIZE_PRIMARY = 48;
const FONT_SIZE_SECONDARY = 24;

// Layout configuration
const LOWER_THIRD_LEFT_MARGIN = 80;
const LOWER_THIRD_BOTTOM_MARGIN = 110;
const PIPE_WIDTH = 5;
const TEXT_AREA_WIDTH = 520;
const TEXT_AREA_HEIGHT = 120;

export const LowerThird12: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // === PHASE DETECTION ===
  const isInEntrance = frame < TIMING.HOLD_START;
  const isInHold = frame >= TIMING.HOLD_START && frame < TIMING.EXIT_START;
  const isInExit = frame >= TIMING.EXIT_START;

  // === ENTRANCE ANIMATIONS ===

  // Vertical pipe slides down from top
  const pipeHeight = interpolate(
    frame,
    [TIMING.ENTRANCE_START, TIMING.ENTRANCE_START + 20],
    [0, TEXT_AREA_HEIGHT + 20],
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

  // Primary text typewriter effect - characters appear one by one
  const primaryCharsVisible = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 12, TIMING.ENTRANCE_START + 38],
    [0, PRIMARY_TEXT.length],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.linear,
    }
  );

  // Secondary text typewriter effect - delayed
  const secondaryCharsVisible = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 30, TIMING.ENTRANCE_START + 48],
    [0, SECONDARY_TEXT.length],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.linear,
    }
  );

  // Horizontal scan lines slide in from left
  const scanLineWidth1 = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 5, TIMING.ENTRANCE_START + 25],
    [0, TEXT_AREA_WIDTH + 60],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );

  const scanLineWidth2 = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 10, TIMING.ENTRANCE_START + 30],
    [0, TEXT_AREA_WIDTH + 40],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );

  // Prompt symbol ">" fades in
  const promptOpacity = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 8, TIMING.ENTRANCE_START + 14],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // === HOLD ANIMATIONS ===

  // Cursor blink effect
  const cursorOpacity = interpolate(
    Math.sin((frame - TIMING.HOLD_START) / 8),
    [-1, 1],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Pipe glow pulse
  const pipeGlow = interpolate(
    Math.sin((frame - TIMING.HOLD_START) / 18),
    [-1, 1],
    [4, 14],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Data stream dots moving along scan lines
  const dataStreamPosition = interpolate(
    (frame - TIMING.HOLD_START) % 50,
    [0, 50],
    [-20, TEXT_AREA_WIDTH + 80],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Text glow pulse
  const textGlow = interpolate(
    Math.sin((frame - TIMING.HOLD_START) / 22),
    [-1, 1],
    [6, 16],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // === EXIT ANIMATIONS ===

  // Text erases in reverse (characters disappear)
  const primaryCharsExit = interpolate(
    frame,
    [TIMING.EXIT_START, TIMING.EXIT_START + 20],
    [PRIMARY_TEXT.length, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.linear,
    }
  );

  const secondaryCharsExit = interpolate(
    frame,
    [TIMING.EXIT_START + 5, TIMING.EXIT_START + 22],
    [SECONDARY_TEXT.length, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.linear,
    }
  );

  // Pipe retracts upward
  const pipeExitHeight = interpolate(
    frame,
    [TIMING.EXIT_START + 15, TIMING.EXIT_START + 38],
    [TEXT_AREA_HEIGHT + 20, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  // Scan lines retract
  const scanLineExitWidth = interpolate(
    frame,
    [TIMING.EXIT_START + 10, TIMING.EXIT_START + 35],
    [TEXT_AREA_WIDTH + 60, 0],
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

  const finalPipeHeight = isInExit ? pipeExitHeight : pipeHeight;

  const finalScanLineWidth1 = isInExit ? scanLineExitWidth : scanLineWidth1;
  const finalScanLineWidth2 = isInExit
    ? interpolate(
        frame,
        [TIMING.EXIT_START + 12, TIMING.EXIT_START + 37],
        [TEXT_AREA_WIDTH + 40, 0],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.in(Easing.quad),
        }
      )
    : scanLineWidth2;

  const finalPrimaryChars = isInExit
    ? primaryCharsExit
    : primaryCharsVisible;
  const finalSecondaryChars = isInExit
    ? secondaryCharsExit
    : secondaryCharsVisible;

  // Cursor position tracks the end of visible text
  const primaryCursorActive =
    isInEntrance && frame >= TIMING.ENTRANCE_START + 12 && frame <= TIMING.ENTRANCE_START + 40;
  const secondaryCursorActive =
    isInEntrance && frame >= TIMING.ENTRANCE_START + 30;
  const exitCursorActive = isInExit && frame <= TIMING.EXIT_START + 25;

  const showCursor = primaryCursorActive || secondaryCursorActive || exitCursorActive || isInHold;

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
          width: TEXT_AREA_WIDTH + 60,
          height: TEXT_AREA_HEIGHT + 30,
          opacity: finalOpacity,
        }}
      >
        {/* Vertical pipeline bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: PIPE_WIDTH,
            height: finalPipeHeight,
            background: `linear-gradient(180deg, ${COLORS.pipe} 0%, ${COLORS.accent} 50%, ${COLORS.pipeDim} 100%)`,
            boxShadow: isInHold
              ? `0 0 ${pipeGlow}px ${COLORS.accent}, ${pipeGlow / 2}px 0 ${pipeGlow * 2}px ${COLORS.pipeDim}`
              : `0 0 6px ${COLORS.accent}`,
          }}
        />

        {/* Top scan line */}
        <div
          style={{
            position: "absolute",
            left: PIPE_WIDTH,
            top: 0,
            width: finalScanLineWidth1,
            height: 2,
            background: `linear-gradient(90deg, ${COLORS.accent} 0%, ${COLORS.accentDim} 70%, transparent 100%)`,
            boxShadow: isInHold
              ? `0 0 ${pipeGlow / 2}px ${COLORS.accent}`
              : "none",
          }}
        />

        {/* Middle divider scan line */}
        <div
          style={{
            position: "absolute",
            left: PIPE_WIDTH,
            top: TEXT_AREA_HEIGHT / 2 + 8,
            width: finalScanLineWidth2,
            height: 1,
            background: `linear-gradient(90deg, ${COLORS.accentDim} 0%, ${COLORS.lineNumber} 60%, transparent 100%)`,
          }}
        />

        {/* Bottom scan line */}
        <div
          style={{
            position: "absolute",
            left: PIPE_WIDTH,
            bottom: 2,
            width: finalScanLineWidth1,
            height: 2,
            background: `linear-gradient(90deg, ${COLORS.accent} 0%, ${COLORS.accentDim} 70%, transparent 100%)`,
            boxShadow: isInHold
              ? `0 0 ${pipeGlow / 2}px ${COLORS.accent}`
              : "none",
          }}
        />

        {/* Data stream dot during hold */}
        {isInHold && (
          <>
            <div
              style={{
                position: "absolute",
                left: PIPE_WIDTH + dataStreamPosition,
                top: -1,
                width: 6,
                height: 6,
                background: COLORS.accent,
                boxShadow: `0 0 8px ${COLORS.accent}`,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: PIPE_WIDTH + ((dataStreamPosition + TEXT_AREA_WIDTH / 2) % (TEXT_AREA_WIDTH + 80)),
                bottom: 0,
                width: 4,
                height: 4,
                background: COLORS.secondary,
                boxShadow: `0 0 6px ${COLORS.secondary}`,
              }}
            />
          </>
        )}

        {/* Prompt symbol for primary text */}
        <div
          style={{
            position: "absolute",
            left: PIPE_WIDTH + 12,
            top: 10,
            fontFamily: FONT_FAMILY,
            fontSize: "36px",
            fontWeight: "700",
            color: COLORS.accent,
            opacity: isInExit ? exitOpacity : promptOpacity,
            textShadow: isInHold
              ? `0 0 ${textGlow / 2}px ${COLORS.accent}`
              : `0 0 4px ${COLORS.accent}`,
          }}
        >
          {">"}
        </div>

        {/* Primary text - typewriter effect */}
        <div
          style={{
            position: "absolute",
            left: PIPE_WIDTH + 42,
            top: 10,
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: `${FONT_SIZE_PRIMARY}px`,
              fontWeight: FONT_WEIGHT_PRIMARY,
              color: COLORS.primary,
              letterSpacing: "3px",
              textTransform: "uppercase",
              textShadow: `
                0 2px 8px rgba(0, 0, 0, 0.8),
                0 0 ${isInHold ? textGlow : 8}px rgba(0, 255, 136, 0.5)
              `,
              whiteSpace: "nowrap",
            }}
          >
            {PRIMARY_TEXT.slice(0, Math.floor(finalPrimaryChars))}
          </span>
          {/* Blinking cursor after primary text during typing */}
          {showCursor && !secondaryCursorActive && (
            <div
              style={{
                width: 3,
                height: FONT_SIZE_PRIMARY - 4,
                background: COLORS.cursor,
                marginLeft: 2,
                opacity: isInHold ? cursorOpacity : 1,
                boxShadow: `0 0 6px ${COLORS.cursor}`,
              }}
            />
          )}
        </div>

        {/* Prompt symbol for secondary text */}
        <div
          style={{
            position: "absolute",
            left: PIPE_WIDTH + 14,
            top: TEXT_AREA_HEIGHT / 2 + 18,
            fontFamily: FONT_FAMILY,
            fontSize: "22px",
            fontWeight: "600",
            color: COLORS.lineNumber,
            opacity: isInExit
              ? exitOpacity
              : interpolate(
                  frame,
                  [TIMING.ENTRANCE_START + 26, TIMING.ENTRANCE_START + 32],
                  [0, 1],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }
                ),
            textShadow: `0 0 4px ${COLORS.accentDim}`,
          }}
        >
          {">"}
        </div>

        {/* Secondary text - typewriter effect */}
        <div
          style={{
            position: "absolute",
            left: PIPE_WIDTH + 42,
            top: TEXT_AREA_HEIGHT / 2 + 18,
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: `${FONT_SIZE_SECONDARY}px`,
              fontWeight: FONT_WEIGHT_SECONDARY,
              color: COLORS.secondary,
              letterSpacing: "1.5px",
              textShadow: `
                0 2px 6px rgba(0, 0, 0, 0.8),
                0 0 ${isInHold ? textGlow / 2 : 4}px rgba(0, 204, 106, 0.4)
              `,
              whiteSpace: "nowrap",
            }}
          >
            {SECONDARY_TEXT.slice(0, Math.floor(finalSecondaryChars))}
          </span>
          {/* Blinking cursor after secondary text */}
          {(secondaryCursorActive || isInHold || exitCursorActive) && (
            <div
              style={{
                width: 2,
                height: FONT_SIZE_SECONDARY - 2,
                background: COLORS.cursor,
                marginLeft: 2,
                opacity: isInHold ? cursorOpacity : 1,
                boxShadow: `0 0 4px ${COLORS.cursor}`,
              }}
            />
          )}
        </div>

        {/* Small accent squares along pipe */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: -3,
              top: 20 + i * 40,
              width: PIPE_WIDTH + 6,
              height: 3,
              background: COLORS.accent,
              opacity: isInHold
                ? interpolate(
                    Math.sin((frame - TIMING.HOLD_START + i * 10) / 12),
                    [-1, 1],
                    [0.3, 1],
                    {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }
                  )
                : finalOpacity * 0.8,
              boxShadow: isInHold
                ? `0 0 ${6 * interpolate(
                    Math.sin((frame - TIMING.HOLD_START + i * 10) / 12),
                    [-1, 1],
                    [0.5, 1.5],
                    {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }
                  )}px ${COLORS.accent}`
                : `0 0 3px ${COLORS.accent}`,
            }}
          />
        ))}

        {/* Subtle background fill */}
        <div
          style={{
            position: "absolute",
            left: PIPE_WIDTH,
            top: 2,
            right: 0,
            bottom: 4,
            background: `rgba(0, 20, 10, ${isInHold ? 0.45 + 0.05 * interpolate(
              Math.sin((frame - TIMING.HOLD_START) / 25),
              [-1, 1],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ) : 0.45})`,
            zIndex: -1,
            pointerEvents: "none",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
