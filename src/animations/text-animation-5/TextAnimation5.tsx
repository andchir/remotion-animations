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
  ENTRANCE_START: 0,
  ENTRANCE_DURATION: 60,
  HOLD_START: 60,
  HOLD_DURATION: 60,
  EXIT_START: 120,
  EXIT_DURATION: 60,
};

// Text configuration
const MAIN_TEXT = "YOU TEXT HERE";
const SUBTITLE_TEXT = "Your caption here";

// Visual configuration
const COLORS = {
  primary: "#FF6B35",
  secondary: "#004E89",
  accent: "#1A936F",
  highlight: "#C6D8FF",
};

const FONT_FAMILY = "Arial, Helvetica, sans-serif";
const FONT_WEIGHT_MAIN = "900";
const FONT_WEIGHT_SUBTITLE = "600";
const FONT_SIZE_MAIN = 100;
const FONT_SIZE_SUBTITLE = 42;

// Padding around text inside rectangles
const PADDING_X = 50;
const PADDING_Y = 25;

interface TextBlockProps {
  text: string;
  fontSize: number;
  fontWeight: string;
  backgroundColor: string;
  frame: number;
  index: number;
  totalBlocks: number;
  xPosition: number;
  yPosition: number;
}

const TextBlock: React.FC<TextBlockProps> = ({
  text,
  fontSize,
  fontWeight,
  backgroundColor,
  frame,
  index,
  totalBlocks,
  xPosition,
  yPosition,
}) => {
  // Estimate text width based on character count and font size
  const estimatedCharWidth = fontSize * 0.58;
  const textWidth = text.length * estimatedCharWidth;
  const blockWidth = textWidth + PADDING_X * 2;
  const blockHeight = fontSize + PADDING_Y * 2;

  // Stagger delay based on index
  const staggerDelay = index * 8;

  // ENTRANCE: Accordion-style unfolding from center
  const entranceProgress = interpolate(
    frame,
    [TIMING.ENTRANCE_START + staggerDelay, TIMING.ENTRANCE_START + staggerDelay + 45],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.back(1.2)),
    }
  );

  // EXIT: Collapse back to center
  const exitProgress = interpolate(
    frame,
    [TIMING.EXIT_START + staggerDelay, TIMING.EXIT_START + staggerDelay + 40],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.back(1.5)),
    }
  );

  // Determine if we're in each phase
  const isEntrance = frame < TIMING.HOLD_START;
  const isHold = frame >= TIMING.HOLD_START && frame < TIMING.EXIT_START;
  const isExit = frame >= TIMING.EXIT_START;

  // Calculate rotation for accordion effect (alternating directions)
  const unfoldDirection = index % 2 === 0 ? 1 : -1;
  const entranceRotateY = isEntrance
    ? interpolate(entranceProgress, [0, 1], [90 * unfoldDirection, 0])
    : 0;
  const exitRotateY = isExit
    ? interpolate(exitProgress, [0, 1], [0, -90 * unfoldDirection])
    : 0;

  // HOLD: Subtle floating and perspective wobble
  const holdWobble = isHold
    ? Math.sin((frame - TIMING.HOLD_START + index * 15) / 20) * 3
    : 0;

  const holdFloat = isHold
    ? Math.sin((frame - TIMING.HOLD_START + index * 10) / 25) * 8
    : 0;

  // Scale animation
  const entranceScale = isEntrance
    ? interpolate(entranceProgress, [0, 1], [0.3, 1])
    : 1;
  const exitScale = isExit
    ? interpolate(exitProgress, [0, 1], [1, 0.3])
    : entranceScale;

  // Opacity
  const entranceOpacity = isEntrance
    ? interpolate(entranceProgress, [0, 0.5, 1], [0, 0.7, 1])
    : 1;
  const exitOpacity = isExit
    ? interpolate(exitProgress, [0, 1], [1, 0])
    : entranceOpacity;

  // X translation - slide from sides during entrance
  const slideDirection = index % 2 === 0 ? -1 : 1;
  const entranceSlideX = isEntrance
    ? interpolate(entranceProgress, [0, 1], [200 * slideDirection, 0])
    : 0;
  const exitSlideX = isExit
    ? interpolate(exitProgress, [0, 1], [0, -200 * slideDirection])
    : entranceSlideX;

  const finalRotateY = entranceRotateY + exitRotateY + holdWobble;
  const finalTranslateX = xPosition + exitSlideX;
  const finalTranslateY = yPosition + holdFloat;
  const finalScale = exitScale;
  const finalOpacity = exitOpacity;

  // Unique ID for SVG clip path
  const clipId = `clip-${index}-${text.replace(/\s+/g, "-").toLowerCase()}`;

  // Calculate shadow based on rotation for 3D effect
  const shadowIntensity = Math.abs(finalRotateY) / 90;
  const shadowOffset = 10 + shadowIntensity * 15;
  const shadowBlur = 20 + shadowIntensity * 20;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `
          translate(-50%, -50%)
          translateX(${finalTranslateX}px)
          translateY(${finalTranslateY}px)
          perspective(1000px)
          rotateY(${finalRotateY}deg)
          scale(${finalScale})
        `,
        opacity: finalOpacity,
        transformOrigin: "center center",
        transformStyle: "preserve-3d",
      }}
    >
      <svg
        width={blockWidth}
        height={blockHeight}
        style={{
          filter: `drop-shadow(${shadowOffset}px ${shadowOffset}px ${shadowBlur}px rgba(0, 0, 0, 0.4))`,
          overflow: "visible",
        }}
      >
        <defs>
          {/* Define the text as a clip path */}
          <clipPath id={clipId}>
            <text
              x={blockWidth / 2}
              y={blockHeight / 2}
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily={FONT_FAMILY}
              fontSize={fontSize}
              fontWeight={fontWeight}
            >
              {text}
            </text>
          </clipPath>

          {/* Gradient for background rectangle */}
          <linearGradient id={`grad-${clipId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={backgroundColor} />
            <stop offset="100%" stopColor={adjustBrightness(backgroundColor, -20)} />
          </linearGradient>
        </defs>

        {/* Main colored rectangle */}
        <rect
          width={blockWidth}
          height={blockHeight}
          fill={`url(#grad-${clipId})`}
          rx={12}
          ry={12}
        />

        {/* Inner rectangle that shows through the text clip - creates cut-out effect */}
        <rect
          width={blockWidth}
          height={blockHeight}
          fill="white"
          clipPath={`url(#${clipId})`}
          rx={12}
          ry={12}
        />

        {/* Subtle inner glow/highlight on rectangle edges */}
        <rect
          x={3}
          y={3}
          width={blockWidth - 6}
          height={blockHeight - 6}
          fill="none"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth={2}
          rx={10}
          ry={10}
        />
      </svg>
    </div>
  );
};

// Helper function to adjust color brightness
function adjustBrightness(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, Math.min(255, (num >> 16) + amt));
  const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amt));
  const B = Math.max(0, Math.min(255, (num & 0x0000ff) + amt));
  return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
}

export const TextAnimation5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Split main text into individual words
  const mainWords = MAIN_TEXT.split(" ");
  const colorKeys = Object.keys(COLORS) as (keyof typeof COLORS)[];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Container for main text word blocks */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {/* Render each word as a separate block */}
        {mainWords.map((word, wordIndex) => {
          // Calculate horizontal offset to arrange words in a row
          const totalWords = mainWords.length;
          const wordSpacing = 220; // Spacing between word centers
          const totalWidth = (totalWords - 1) * wordSpacing;
          const xOffset = -totalWidth / 2 + wordIndex * wordSpacing;

          const colorIndex = wordIndex % colorKeys.length;
          const bgColor = COLORS[colorKeys[colorIndex]];

          return (
            <TextBlock
              key={`main-${wordIndex}`}
              text={word}
              fontSize={FONT_SIZE_MAIN}
              fontWeight={FONT_WEIGHT_MAIN}
              backgroundColor={bgColor}
              frame={frame}
              index={wordIndex}
              totalBlocks={totalWords + 1}
              xPosition={xOffset}
              yPosition={-50}
            />
          );
        })}

        {/* Subtitle block */}
        <TextBlock
          text={SUBTITLE_TEXT}
          fontSize={FONT_SIZE_SUBTITLE}
          fontWeight={FONT_WEIGHT_SUBTITLE}
          backgroundColor={COLORS.accent}
          frame={frame}
          index={mainWords.length}
          totalBlocks={mainWords.length + 1}
          xPosition={0}
          yPosition={80}
        />
      </div>
    </AbsoluteFill>
  );
};
