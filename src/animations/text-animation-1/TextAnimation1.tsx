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
  // Phase 1: Entrance - text flies in and reveals
  ENTRANCE_START: 0,
  ENTRANCE_DURATION: 60, // 2 seconds

  // Phase 2: Hold - text stays visible
  HOLD_START: 60,
  HOLD_DURATION: 60, // 2 seconds

  // Phase 3: Exit - text fades and disappears
  EXIT_START: 120,
  EXIT_DURATION: 60, // 2 seconds
};

// Configuration constants
const MAIN_TEXT = "YOU TEXT HERE";
const SUBTITLE_TEXT = "Your caption here";

// Styling constants
const MAIN_TEXT_COLOR = "#FFFFFF";
const SUBTITLE_TEXT_COLOR = "#FFD700"; // Gold color

const FONT_SIZE_MAIN = 72;
const FONT_SIZE_SUBTITLE = 32;
const FONT_FAMILY = "Arial, Helvetica, sans-serif";
const FONT_WEIGHT_MAIN = "900";
const FONT_WEIGHT_SUBTITLE = "600";

export const TextAnimation1: React.FC = () => {
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
      easing: Easing.out(Easing.back(1.5)), // Bounce effect
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
      easing: Easing.in(Easing.cubic),
    }
  );

  // Hold phase - subtle floating animation
  const floatOffset = interpolate(
    frame,
    [TIMING.HOLD_START, TIMING.HOLD_START + TIMING.HOLD_DURATION],
    [0, 10],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.ease),
    }
  );

  // Calculate overall opacity
  const opacity = frame < TIMING.EXIT_START
    ? interpolate(entranceProgress, [0, 0.3], [0, 1], { extrapolateRight: "clamp" })
    : interpolate(exitProgress, [0, 1], [1, 0]);

  // Calculate Y position for entrance and exit
  const translateY =
    frame < TIMING.HOLD_START
      ? interpolate(entranceProgress, [0, 1], [-200, 0]) // Entrance from top
      : frame < TIMING.EXIT_START
      ? Math.sin((frame - TIMING.HOLD_START) / 15) * floatOffset // Floating during hold
      : interpolate(exitProgress, [0, 1], [0, 200]); // Exit to bottom

  // Calculate scale
  const scale =
    frame < TIMING.HOLD_START
      ? interpolate(entranceProgress, [0, 1], [0.3, 1])
      : frame < TIMING.EXIT_START
      ? 1
      : interpolate(exitProgress, [0, 1], [1, 0.3]);

  // Calculate rotation
  const rotation =
    frame < TIMING.HOLD_START
      ? interpolate(entranceProgress, [0, 1], [180, 0])
      : frame < TIMING.EXIT_START
      ? 0
      : interpolate(exitProgress, [0, 1], [0, -90]);

  // Letter stagger effect for main text during entrance
  const renderStaggeredText = (text: string, fontSize: number, color: string, isMain: boolean) => {
    return text.split("").map((char, index) => {
      const charDelay = index * 2; // Delay each character by 2 frames
      const charProgress = interpolate(
        frame,
        [TIMING.ENTRANCE_START + charDelay, TIMING.ENTRANCE_START + charDelay + 20],
        [0, 1],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.quad),
        }
      );

      const charOpacity = frame < TIMING.EXIT_START
        ? charProgress
        : interpolate(exitProgress, [0, 1], [1, 0]);

      const charScale = frame < TIMING.HOLD_START
        ? interpolate(charProgress, [0, 1], [0, 1])
        : frame < TIMING.EXIT_START
        ? 1
        : interpolate(exitProgress, [0, 1], [1, 0.5]);

      const charTranslateY = frame < TIMING.HOLD_START
        ? interpolate(charProgress, [0, 1], [50, 0])
        : 0;

      return (
        <span
          key={index}
          style={{
            display: "inline-block",
            opacity: charOpacity,
            transform: `translateY(${charTranslateY}px) scale(${charScale})`,
            transition: "transform 0.1s ease-out",
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
          gap: "20px",
          transform: `translateY(${translateY}px) scale(${scale}) rotate(${rotation}deg)`,
          opacity: opacity,
          transformOrigin: "center center",
        }}
      >
        {/* Main text */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: `${FONT_SIZE_MAIN}px`,
            fontWeight: FONT_WEIGHT_MAIN,
            color: MAIN_TEXT_COLOR,
            letterSpacing: "4px",
            textShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
            textAlign: "center",
          }}
        >
          {renderStaggeredText(MAIN_TEXT, FONT_SIZE_MAIN, MAIN_TEXT_COLOR, true)}
        </div>

        {/* Subtitle text */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: `${FONT_SIZE_SUBTITLE}px`,
            fontWeight: FONT_WEIGHT_SUBTITLE,
            color: SUBTITLE_TEXT_COLOR,
            letterSpacing: "2px",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
            textAlign: "center",
            textTransform: "lowercase",
          }}
        >
          {renderStaggeredText(SUBTITLE_TEXT, FONT_SIZE_SUBTITLE, SUBTITLE_TEXT_COLOR, false)}
        </div>
      </div>
    </AbsoluteFill>
  );
};
