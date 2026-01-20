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
  TEXT_FLY_START: 0, // Text starts flying from left
  TEXT_FLY_END: 60, // Text reaches center (2 seconds)
  FLIP_DURATION: 15, // Duration of each letter's flip
  FLIP_DELAY: 3, // Delay between each letter's flip start
  BACKGROUND_START: 75, // Backgrounds start appearing
  BACKGROUND_DURATION: 10, // Duration of each background rotation
  BACKGROUND_DELAY: 2, // Delay between each background appearance
  TOTAL_DURATION: 180, // Total animation duration (6 seconds)
};

const TEXT = "HELLO WORLD!";
const LETTER_SPACING = 20; // Spacing between letters in pixels
const FONT_SIZE = 120; // Large font size
const BACKGROUND_COLOR = "#1655ba";

// Letter component with 3D flip animation
const Letter: React.FC<{
  char: string;
  index: number;
  totalLetters: number;
  centerX: number;
  centerY: number;
}> = ({ char, index, totalLetters, centerX, centerY }) => {
  const frame = useCurrentFrame();

  // Calculate approximate width for centering (rough estimate)
  const charWidth = char === " " ? FONT_SIZE * 0.3 : FONT_SIZE * 0.7;
  const totalWidth =
    TEXT.split("")
      .map((c) => (c === " " ? FONT_SIZE * 0.3 : FONT_SIZE * 0.7))
      .reduce((a, b) => a + b, 0) +
    LETTER_SPACING * (TEXT.length - 1);

  // Calculate position offset from center
  let offsetX = 0;
  for (let i = 0; i < index; i++) {
    const prevChar = TEXT[i];
    offsetX +=
      (prevChar === " " ? FONT_SIZE * 0.3 : FONT_SIZE * 0.7) + LETTER_SPACING;
  }
  offsetX -= totalWidth / 2;

  // Fly-in animation from left
  const flyProgress = interpolate(
    frame,
    [TIMING.TEXT_FLY_START, TIMING.TEXT_FLY_END],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  const startX = -totalWidth / 2 - 500; // Start off-screen to the left
  const endX = centerX + offsetX;
  const currentX = interpolate(flyProgress, [0, 1], [startX, endX], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 3D flip animation during flight
  const flipStart = TIMING.TEXT_FLY_START + index * TIMING.FLIP_DELAY;
  const flipEnd = flipStart + TIMING.FLIP_DURATION;
  const flipProgress = interpolate(frame, [flipStart, flipEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.ease),
  });

  const rotateY = interpolate(flipProgress, [0, 1], [0, 360], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Background 3D rotation animation
  const bgStart = TIMING.BACKGROUND_START + index * TIMING.BACKGROUND_DELAY;
  const bgEnd = bgStart + TIMING.BACKGROUND_DURATION;
  const bgProgress = interpolate(frame, [bgStart, bgEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const bgRotateY = interpolate(bgProgress, [0, 1], [-90, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bgOpacity = frame >= bgStart ? 1 : 0;
  const bgScaleX = interpolate(bgProgress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: currentX,
        top: centerY - FONT_SIZE / 2,
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Background rectangle with 3D rotation */}
      <div
        style={{
          position: "absolute",
          left: -10,
          top: -10,
          width: charWidth + 20,
          height: FONT_SIZE + 20,
          backgroundColor: BACKGROUND_COLOR,
          transform: `rotateY(${bgRotateY}deg) scaleX(${bgScaleX})`,
          transformStyle: "preserve-3d",
          opacity: bgOpacity,
          zIndex: -1,
        }}
      />

      {/* Letter with flip animation */}
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: `${FONT_SIZE}px`,
          fontWeight: "bold",
          color: "white",
          transform: `rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          textAlign: "center",
          width: charWidth,
          whiteSpace: "pre",
        }}
      >
        {char}
      </div>
    </div>
  );
};

// Main animation component
export const TextAnimation2: React.FC = () => {
  const { width, height } = useVideoConfig();
  const centerX = width / 2;
  const centerY = height / 2;

  const letters = TEXT.split("").map((char, index) => (
    <Letter
      key={index}
      char={char}
      index={index}
      totalLetters={TEXT.length}
      centerX={centerX}
      centerY={centerY}
    />
  ));

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
      }}
    >
      {letters}
    </AbsoluteFill>
  );
};
