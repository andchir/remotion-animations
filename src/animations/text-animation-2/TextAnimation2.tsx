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
  // Phase 1: Entrance - wave reveal with typewriter effect
  ENTRANCE_START: 0,
  ENTRANCE_DURATION: 60, // 2 seconds

  // Phase 2: Hold - pulsing glow effect
  HOLD_START: 60,
  HOLD_DURATION: 60, // 2 seconds

  // Phase 3: Exit - disperse and fade
  EXIT_START: 120,
  EXIT_DURATION: 60, // 2 seconds
};

// Configuration constants
const MAIN_TEXT = "YOU TEXT HERE";
const SUBTITLE_TEXT = "Your caption here";

// Styling constants
const MAIN_TEXT_COLOR = "#00F5FF"; // Cyan
const SUBTITLE_TEXT_COLOR = "#FF6B9D"; // Pink
const GLOW_COLOR = "#00F5FF";
const GLOW_COLOR_SECONDARY = "#FF6B9D";

const FONT_SIZE_MAIN = 80;
const FONT_SIZE_SUBTITLE = 36;
const FONT_FAMILY = "Arial, Helvetica, sans-serif";
const FONT_WEIGHT_MAIN = "900";
const FONT_WEIGHT_SUBTITLE = "700";

export const TextAnimation2: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Entrance animation progress (0 to 1)
  const entranceProgress = interpolate(
    frame,
    [TIMING.ENTRANCE_START, TIMING.ENTRANCE_START + TIMING.ENTRANCE_DURATION],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    }
  );

  // Exit animation progress (0 to 1)
  const exitProgress = interpolate(
    frame,
    [TIMING.EXIT_START, TIMING.EXIT_START + TIMING.EXIT_DURATION],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.ease),
    }
  );

  // Hold phase - pulsing glow animation
  const pulseIntensity = interpolate(
    Math.sin((frame - TIMING.HOLD_START) / 10) * 0.5 + 0.5,
    [0, 1],
    [0.7, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Render individual characters with wave reveal effect
  const renderWaveText = (
    text: string,
    fontSize: number,
    color: string,
    glowColor: string,
    isMain: boolean
  ) => {
    return text.split("").map((char, index) => {
      // Calculate wave delay for each character
      const charDelay = index * 3; // Stagger by 3 frames per character
      const waveOffset = Math.sin(index * 0.5) * 20; // Wave distortion

      // Entrance: typewriter reveal
      const charEntranceProgress = interpolate(
        frame,
        [
          TIMING.ENTRANCE_START + charDelay,
          TIMING.ENTRANCE_START + charDelay + 15,
        ],
        [0, 1],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.ease),
        }
      );

      // Calculate opacity
      const charOpacity =
        frame < TIMING.EXIT_START
          ? charEntranceProgress
          : interpolate(exitProgress, [0, 1], [1, 0]);

      // Calculate X position (slide in from left)
      const charTranslateX =
        frame < TIMING.HOLD_START
          ? interpolate(charEntranceProgress, [0, 1], [-100, 0])
          : frame < TIMING.EXIT_START
          ? 0
          : interpolate(exitProgress, [0, 1], [0, index % 2 === 0 ? 50 : -50]);

      // Calculate Y position (wave effect during entrance)
      const charTranslateY =
        frame < TIMING.HOLD_START
          ? interpolate(charEntranceProgress, [0, 1], [waveOffset, 0])
          : frame < TIMING.EXIT_START
          ? 0
          : interpolate(exitProgress, [0, 1], [0, 100]);

      // Calculate scale
      const charScale =
        frame < TIMING.HOLD_START
          ? interpolate(charEntranceProgress, [0, 1], [0.3, 1])
          : frame < TIMING.EXIT_START
          ? 1
          : interpolate(exitProgress, [0, 1], [1, 1.5]);

      // Calculate blur (for exit effect)
      const charBlur =
        frame < TIMING.EXIT_START
          ? 0
          : interpolate(exitProgress, [0, 1], [0, 10]);

      // Glow intensity during hold phase
      const glowIntensity =
        frame >= TIMING.HOLD_START && frame < TIMING.EXIT_START
          ? pulseIntensity
          : charEntranceProgress;

      // Calculate text shadow for glow effect
      const textShadow =
        frame < TIMING.EXIT_START
          ? `
          0 0 ${10 * glowIntensity}px ${glowColor},
          0 0 ${20 * glowIntensity}px ${glowColor},
          0 0 ${30 * glowIntensity}px ${glowColor},
          0 4px 20px rgba(0, 0, 0, 0.5)
        `
          : `0 4px 20px rgba(0, 0, 0, 0.3)`;

      return (
        <span
          key={index}
          style={{
            display: "inline-block",
            opacity: charOpacity,
            transform: `translateX(${charTranslateX}px) translateY(${charTranslateY}px) scale(${charScale})`,
            filter: `blur(${charBlur}px)`,
            textShadow: textShadow,
            transition: "filter 0.1s ease-out",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      );
    });
  };

  // Calculate container opacity for overall fade
  const containerOpacity =
    frame < TIMING.ENTRANCE_START + 10
      ? interpolate(frame, [TIMING.ENTRANCE_START, TIMING.ENTRANCE_START + 10], [0, 1])
      : frame < TIMING.EXIT_START + 20
      ? 1
      : interpolate(frame, [TIMING.EXIT_START + 20, TIMING.EXIT_START + TIMING.EXIT_DURATION], [1, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Main container for both text lines */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "30px",
          opacity: containerOpacity,
        }}
      >
        {/* Main text */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: `${FONT_SIZE_MAIN}px`,
            fontWeight: FONT_WEIGHT_MAIN,
            color: MAIN_TEXT_COLOR,
            letterSpacing: "6px",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          {renderWaveText(
            MAIN_TEXT,
            FONT_SIZE_MAIN,
            MAIN_TEXT_COLOR,
            GLOW_COLOR,
            true
          )}
        </div>

        {/* Decorative line separator */}
        <div
          style={{
            width: interpolate(
              frame,
              [TIMING.ENTRANCE_START + 30, TIMING.ENTRANCE_START + 50],
              [0, 300],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.ease),
              }
            ),
            height: "3px",
            background: `linear-gradient(90deg, ${GLOW_COLOR} 0%, ${GLOW_COLOR_SECONDARY} 100%)`,
            boxShadow:
              frame >= TIMING.HOLD_START && frame < TIMING.EXIT_START
                ? `0 0 ${10 * pulseIntensity}px ${GLOW_COLOR}`
                : "0 0 5px rgba(0, 245, 255, 0.5)",
            opacity:
              frame < TIMING.EXIT_START
                ? 1
                : interpolate(exitProgress, [0, 1], [1, 0]),
          }}
        />

        {/* Subtitle text */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: `${FONT_SIZE_SUBTITLE}px`,
            fontWeight: FONT_WEIGHT_SUBTITLE,
            color: SUBTITLE_TEXT_COLOR,
            letterSpacing: "3px",
            textAlign: "center",
          }}
        >
          {renderWaveText(
            SUBTITLE_TEXT,
            FONT_SIZE_SUBTITLE,
            SUBTITLE_TEXT_COLOR,
            GLOW_COLOR_SECONDARY,
            false
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
