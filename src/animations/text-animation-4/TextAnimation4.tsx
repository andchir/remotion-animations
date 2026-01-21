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
  ENTRANCE_DURATION: 70,
  HOLD_START: 70,
  HOLD_DURATION: 60,
  EXIT_START: 130,
  EXIT_DURATION: 50,
};

// Text configuration
const MAIN_TEXT = "YOU TEXT HERE";
const SUBTITLE_TEXT = "Your caption here";

// Visual configuration
const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#F59E0B", "#10B981"];

const FONT_FAMILY = "Arial, Helvetica, sans-serif";
const FONT_WEIGHT_MAIN = "900";
const FONT_WEIGHT_SUBTITLE = "600";
const FONT_SIZE_MAIN = 120;
const FONT_SIZE_SUBTITLE = 48;

// Padding around text inside rectangles
const RECT_PADDING_X = 40;
const RECT_PADDING_Y = 30;

interface TextBoxProps {
  text: string;
  fontSize: number;
  fontWeight: string;
  color: string;
  frame: number;
  index: number;
  totalBoxes: number;
  xPosition: number;
  yOffset: number;
}

const TextBox: React.FC<TextBoxProps> = ({
  text,
  fontSize,
  fontWeight,
  color,
  frame,
  index,
  totalBoxes,
  xPosition,
  yOffset,
}) => {
  // Calculate text dimensions (approximate)
  const charWidth = fontSize * 0.6;
  const textWidth = text.length * charWidth;
  const boxWidth = textWidth + RECT_PADDING_X * 2;
  const boxHeight = fontSize + RECT_PADDING_Y * 2;

  // Stagger delay for each box
  const delay = index * 5;

  // ENTRANCE: Boxes fly in from random directions with rotation
  const entranceProgress = interpolate(
    frame,
    [TIMING.ENTRANCE_START + delay, TIMING.ENTRANCE_START + delay + 50],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.exp),
    }
  );

  // Random entry angles for variety
  const entryAngles = [
    { x: -2000, y: -1000, rot: -180 },
    { x: 2000, y: -800, rot: 180 },
    { x: -1800, y: 1000, rot: 270 },
    { x: 1500, y: -1200, rot: 90 },
    { x: 0, y: -1500, rot: 360 },
  ];
  const entryAngle = entryAngles[index % entryAngles.length];

  // EXIT: Boxes scatter in different directions
  const exitProgress = interpolate(
    frame,
    [TIMING.EXIT_START + delay, TIMING.EXIT_START + delay + 40],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.exp),
    }
  );

  const exitAngles = [
    { x: 1800, y: 1200, rot: 180 },
    { x: -2000, y: 1000, rot: -180 },
    { x: 1500, y: -1000, rot: 270 },
    { x: -1700, y: -900, rot: -270 },
    { x: 0, y: 1500, rot: 360 },
  ];
  const exitAngle = exitAngles[index % exitAngles.length];

  // Position calculation
  const translateX =
    frame < TIMING.HOLD_START
      ? interpolate(entranceProgress, [0, 1], [entryAngle.x, xPosition])
      : frame < TIMING.EXIT_START
      ? xPosition
      : interpolate(exitProgress, [0, 1], [xPosition, exitAngle.x]);

  const translateY =
    frame < TIMING.HOLD_START
      ? interpolate(entranceProgress, [0, 1], [entryAngle.y, 0])
      : frame < TIMING.EXIT_START
      ? 0
      : interpolate(exitProgress, [0, 1], [0, exitAngle.y]);

  // Rotation
  const rotation =
    frame < TIMING.HOLD_START
      ? interpolate(entranceProgress, [0, 1], [entryAngle.rot, 0])
      : frame < TIMING.EXIT_START
      ? 0
      : interpolate(exitProgress, [0, 1], [0, exitAngle.rot]);

  // HOLD: Subtle wave motion
  const waveOffset =
    frame >= TIMING.HOLD_START && frame < TIMING.EXIT_START
      ? Math.sin((frame - TIMING.HOLD_START + index * 8) / 15) * 10
      : 0;

  const waveRotation =
    frame >= TIMING.HOLD_START && frame < TIMING.EXIT_START
      ? Math.sin((frame - TIMING.HOLD_START + index * 10) / 20) * 2
      : 0;

  // Scale animation
  const scale =
    frame < TIMING.HOLD_START
      ? interpolate(entranceProgress, [0, 1], [0.2, 1])
      : frame < TIMING.EXIT_START
      ? interpolate(
          Math.sin((frame - TIMING.HOLD_START + index * 5) / 25),
          [-1, 1],
          [0.98, 1.02]
        )
      : interpolate(exitProgress, [0, 1], [1, 0.3]);

  // Opacity
  const opacity =
    frame < TIMING.HOLD_START
      ? interpolate(entranceProgress, [0, 0.7, 1], [0, 0.8, 1])
      : frame < TIMING.EXIT_START
      ? 1
      : interpolate(exitProgress, [0, 1], [1, 0]);

  const uniqueId = `text-${index}-${text.replace(/\s/g, "")}`;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(-50%, -50%) translateX(${translateX}px) translateY(${translateY + yOffset + waveOffset}px) rotate(${rotation + waveRotation}deg) scale(${scale})`,
        opacity: opacity,
        transformOrigin: "center center",
      }}
    >
      <svg
        width={boxWidth}
        height={boxHeight}
        style={{
          filter: "drop-shadow(0 10px 25px rgba(0, 0, 0, 0.3))",
        }}
      >
        <defs>
          <clipPath id={uniqueId}>
            <text
              x={boxWidth / 2}
              y={boxHeight / 2}
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily={FONT_FAMILY}
              fontSize={fontSize}
              fontWeight={fontWeight}
            >
              {text}
            </text>
          </clipPath>
        </defs>

        {/* Rectangle with text clipped out */}
        <rect
          width={boxWidth}
          height={boxHeight}
          fill={color}
          rx={15}
          ry={15}
        />

        {/* White text showing through the clip path (inverted) */}
        <rect
          width={boxWidth}
          height={boxHeight}
          fill="white"
          clipPath={`url(#${uniqueId})`}
        />
      </svg>
    </div>
  );
};

export const TextAnimation4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Split main text into words
  const mainWords = MAIN_TEXT.split(" ");
  const mainBoxes = mainWords.map((word, index) => ({
    text: word,
    color: COLORS[index % COLORS.length],
    index: index,
  }));

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
      {/* Main text boxes */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {(() => {
          // Calculate box widths for each word
          const charWidth = FONT_SIZE_MAIN * 0.6;
          const wordGap = 25; // Gap between word boxes

          const wordBoxWidths = mainBoxes.map((box) => {
            const textWidth = box.text.length * charWidth;
            return textWidth + RECT_PADDING_X * 2;
          });

          // Calculate total width including gaps
          const totalBoxWidth = wordBoxWidths.reduce((sum, w) => sum + w, 0);
          const totalGapWidth = (mainBoxes.length - 1) * wordGap;
          const totalWidth = totalBoxWidth + totalGapWidth;

          // Calculate x positions for each word (center-based)
          let currentX = -totalWidth / 2;
          const xPositions = wordBoxWidths.map((boxWidth) => {
            const xCenter = currentX + boxWidth / 2;
            currentX += boxWidth + wordGap;
            return xCenter;
          });

          return mainBoxes.map((box, idx) => (
            <TextBox
              key={`main-${idx}`}
              text={box.text}
              fontSize={FONT_SIZE_MAIN}
              fontWeight={FONT_WEIGHT_MAIN}
              color={box.color}
              frame={frame}
              index={box.index}
              totalBoxes={mainBoxes.length}
              xPosition={xPositions[idx]}
              yOffset={-60}
            />
          ));
        })()}
      </div>

      {/* Subtitle - single box */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <TextBox
          text={SUBTITLE_TEXT}
          fontSize={FONT_SIZE_SUBTITLE}
          fontWeight={FONT_WEIGHT_SUBTITLE}
          color={COLORS[mainBoxes.length % COLORS.length]}
          frame={frame}
          index={mainBoxes.length}
          totalBoxes={mainBoxes.length + 1}
          xPosition={0}
          yOffset={90}
        />
      </div>
    </AbsoluteFill>
  );
};
