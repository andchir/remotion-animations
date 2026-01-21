import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Animation timing configuration (in frames, at 30fps)
const TIMING = {
  // Phase 1: Entrance - particle assembly with spring physics
  ENTRANCE_START: 0,
  ENTRANCE_DURATION: 60, // 2 seconds

  // Phase 2: Hold - shimmer effect with color shift
  HOLD_START: 60,
  HOLD_DURATION: 60, // 2 seconds

  // Phase 3: Exit - particle dispersion and fall
  EXIT_START: 120,
  EXIT_DURATION: 60, // 2 seconds
};

// Configuration constants
const MAIN_TEXT = "YOU TEXT HERE";
const SUBTITLE_TEXT = "Your caption here";

// Styling constants
const MAIN_TEXT_COLOR = "#E91E63"; // Pink/Magenta
const SUBTITLE_TEXT_COLOR = "#00BCD4"; // Cyan
const SHIMMER_COLOR_1 = "#E91E63";
const SHIMMER_COLOR_2 = "#9C27B0"; // Purple
const SHIMMER_COLOR_3 = "#00BCD4";

const FONT_SIZE_MAIN = 84;
const FONT_SIZE_SUBTITLE = 38;
const FONT_FAMILY = "Arial, Helvetica, sans-serif";
const FONT_WEIGHT_MAIN = "900";
const FONT_WEIGHT_SUBTITLE = "700";

// Particle animation helper - simulates multiple particles per character
const PARTICLES_PER_CHAR = 5;

export const TextAnimation3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring-based entrance animation (snappy with minimal bounce)
  const entranceSpring = spring({
    frame: frame - TIMING.ENTRANCE_START,
    fps,
    config: {
      damping: 20,
      stiffness: 200,
    },
  });

  // Exit animation progress (0 to 1)
  const exitProgress = interpolate(
    frame,
    [TIMING.EXIT_START, TIMING.EXIT_START + TIMING.EXIT_DURATION],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Shimmer effect during hold phase - cycles through colors
  const shimmerCycle = interpolate(
    (frame - TIMING.HOLD_START) % 45,
    [0, 15, 30, 45],
    [0, 1, 2, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Get shimmer color based on cycle
  const getShimmerColor = (baseColor: string, cycle: number): string => {
    if (frame < TIMING.HOLD_START || frame >= TIMING.EXIT_START) {
      return baseColor;
    }

    if (cycle < 0.5) {
      return baseColor;
    } else if (cycle < 1.5) {
      return baseColor === MAIN_TEXT_COLOR ? SHIMMER_COLOR_2 : SHIMMER_COLOR_1;
    } else {
      return baseColor === MAIN_TEXT_COLOR ? SHIMMER_COLOR_3 : SHIMMER_COLOR_2;
    }
  };

  // Render text with particle assembly/dispersion effect
  const renderParticleText = (
    text: string,
    fontSize: number,
    baseColor: string,
    isMain: boolean
  ) => {
    return text.split("").map((char, charIndex) => {
      // Stagger animation for each character
      const charDelay = charIndex * 2;

      // Entrance: spring animation with particle assembly
      const charEntranceSpring = spring({
        frame: frame - TIMING.ENTRANCE_START - charDelay,
        fps,
        config: {
          damping: 20,
          stiffness: 200,
        },
      });

      // Calculate particle scatter positions for entrance
      const scatterDistance = 150;
      const scatterAngle = (charIndex * 137.5) % 360; // Golden angle for natural distribution
      const scatterX = Math.cos((scatterAngle * Math.PI) / 180) * scatterDistance;
      const scatterY = Math.sin((scatterAngle * Math.PI) / 180) * scatterDistance;

      // Entrance animation
      const charTranslateX =
        frame < TIMING.HOLD_START
          ? interpolate(charEntranceSpring, [0, 1], [scatterX, 0])
          : 0;

      const charTranslateY =
        frame < TIMING.HOLD_START
          ? interpolate(charEntranceSpring, [0, 1], [scatterY, 0])
          : frame >= TIMING.EXIT_START
          ? interpolate(exitProgress, [0, 1], [0, 200 + charIndex * 20])
          : 0;

      // Exit: particles scatter and fade
      const exitScatterX =
        frame >= TIMING.EXIT_START
          ? interpolate(exitProgress, [0, 1], [0, scatterX * 0.5])
          : 0;

      // Opacity
      const charOpacity =
        frame < TIMING.HOLD_START
          ? interpolate(charEntranceSpring, [0, 0.3, 1], [0, 0.5, 1])
          : frame < TIMING.EXIT_START
          ? 1
          : interpolate(exitProgress, [0, 0.7, 1], [1, 0.3, 0]);

      // Scale effect
      const charScale =
        frame < TIMING.HOLD_START
          ? interpolate(charEntranceSpring, [0, 1], [0.2, 1])
          : frame >= TIMING.EXIT_START
          ? interpolate(exitProgress, [0, 1], [1, 0.2])
          : 1;

      // Rotation for particle effect
      const charRotation =
        frame < TIMING.HOLD_START
          ? interpolate(charEntranceSpring, [0, 1], [360 + charIndex * 45, 0])
          : frame >= TIMING.EXIT_START
          ? interpolate(exitProgress, [0, 1], [0, -180 - charIndex * 30])
          : 0;

      // Blur for particle effect during exit
      const charBlur =
        frame >= TIMING.EXIT_START
          ? interpolate(exitProgress, [0.5, 1], [0, 8])
          : 0;

      // Get current color with shimmer effect
      const currentColor = getShimmerColor(baseColor, shimmerCycle);

      // Shimmer glow intensity
      const shimmerIntensity =
        frame >= TIMING.HOLD_START && frame < TIMING.EXIT_START
          ? interpolate(
              Math.sin(((frame - TIMING.HOLD_START + charIndex * 3) / 8) * Math.PI) * 0.5 + 0.5,
              [0, 1],
              [0.5, 1]
            )
          : 0.5;

      // Text shadow with shimmer
      const textShadow =
        frame >= TIMING.HOLD_START && frame < TIMING.EXIT_START
          ? `
          0 0 ${10 * shimmerIntensity}px ${currentColor},
          0 0 ${20 * shimmerIntensity}px ${currentColor},
          0 4px 15px rgba(0, 0, 0, 0.6)
        `
          : `0 4px 15px rgba(0, 0, 0, 0.6)`;

      return (
        <span
          key={charIndex}
          style={{
            display: "inline-block",
            opacity: charOpacity,
            transform: `translateX(${charTranslateX + exitScatterX}px) translateY(${charTranslateY}px) scale(${charScale}) rotate(${charRotation}deg)`,
            filter: `blur(${charBlur}px)`,
            color: currentColor,
            textShadow: textShadow,
            transformOrigin: "center center",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      );
    });
  };

  // Container fade for overall smoothness
  const containerOpacity = interpolate(
    frame,
    [TIMING.ENTRANCE_START, TIMING.ENTRANCE_START + 10],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

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
          gap: "25px",
          opacity: containerOpacity,
        }}
      >
        {/* Main text */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: `${FONT_SIZE_MAIN}px`,
            fontWeight: FONT_WEIGHT_MAIN,
            letterSpacing: "5px",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          {renderParticleText(MAIN_TEXT, FONT_SIZE_MAIN, MAIN_TEXT_COLOR, true)}
        </div>

        {/* Subtitle text */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: `${FONT_SIZE_SUBTITLE}px`,
            fontWeight: FONT_WEIGHT_SUBTITLE,
            letterSpacing: "3px",
            textAlign: "center",
          }}
        >
          {renderParticleText(
            SUBTITLE_TEXT,
            FONT_SIZE_SUBTITLE,
            SUBTITLE_TEXT_COLOR,
            false
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
