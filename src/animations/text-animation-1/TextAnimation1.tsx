import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";

// Animation timing configuration (in frames, at 30fps)
// Reference video time range: 00:07 - 00:13 (6 seconds)
const TIMING = {
  // Phase 1: Bars start appearing
  BAR_START: 0,
  BAR_FILL_DURATION: 30, // ~1 second for bars to fill

  // Phase 2: Text appears after bars start filling
  TEXT_START: 10, // Text starts appearing shortly after bars start
  TEXT_DURATION: 30, // ~1 second for text to fully appear

  // Phase 3: Hold the text visible
  HOLD_END: 180, // Total animation duration: 6 seconds
};

// Configuration constants
const MAIN_TEXT = "YOU TEXT HERE";
const SUBTITLE_TEXT = "Your caption here";

// Styling constants
const MAIN_TEXT_COLOR = "#000000"; // Black text
const MAIN_BG_COLOR = "#FFFFFF"; // White background
const SUBTITLE_TEXT_COLOR = "#FFFFFF"; // White text
const SUBTITLE_BG_COLOR = "#FF8C00"; // Orange background

const FONT_SIZE_MAIN = 36;
const FONT_SIZE_SUBTITLE = 20;
const FONT_FAMILY = "Arial, sans-serif";
const FONT_WEIGHT = "bold";

const PADDING_HORIZONTAL = 16;
const PADDING_VERTICAL = 8;
const GAP_BETWEEN_LINES = 4;

// Position from bottom-left
const POSITION_LEFT = 40;
const POSITION_BOTTOM = 80;

export const TextAnimation1: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Calculate bar fill progress (0 to 1)
  const barProgress = interpolate(
    frame,
    [TIMING.BAR_START, TIMING.BAR_START + TIMING.BAR_FILL_DURATION],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // Calculate how many characters to show (progressive reveal)
  const mainTextProgress = interpolate(
    frame,
    [TIMING.TEXT_START, TIMING.TEXT_START + TIMING.TEXT_DURATION],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );

  const subtitleProgress = interpolate(
    frame,
    [TIMING.TEXT_START + 5, TIMING.TEXT_START + TIMING.TEXT_DURATION + 5],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );

  // Calculate visible text
  const mainCharsToShow = Math.floor(mainTextProgress * MAIN_TEXT.length);
  const subtitleCharsToShow = Math.floor(subtitleProgress * SUBTITLE_TEXT.length);

  const visibleMainText = MAIN_TEXT.substring(0, mainCharsToShow);
  const visibleSubtitleText = SUBTITLE_TEXT.substring(0, subtitleCharsToShow);

  // Calculate approximate text widths (for bar width)
  const mainTextWidth = MAIN_TEXT.length * (FONT_SIZE_MAIN * 0.6);
  const subtitleTextWidth = SUBTITLE_TEXT.length * (FONT_SIZE_SUBTITLE * 0.6);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
      }}
    >
      {/* Container for both text lines */}
      <div
        style={{
          position: "absolute",
          left: POSITION_LEFT,
          bottom: POSITION_BOTTOM,
          display: "flex",
          flexDirection: "column",
          gap: `${GAP_BETWEEN_LINES}px`,
        }}
      >
        {/* Main text line with white background */}
        <div
          style={{
            position: "relative",
            display: "inline-block",
          }}
        >
          {/* White background bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: FONT_SIZE_MAIN + PADDING_VERTICAL * 2,
              width: `${(mainTextWidth + PADDING_HORIZONTAL * 2) * barProgress}px`,
              backgroundColor: MAIN_BG_COLOR,
              zIndex: 0,
            }}
          />

          {/* Main text */}
          <div
            style={{
              position: "relative",
              fontFamily: FONT_FAMILY,
              fontSize: `${FONT_SIZE_MAIN}px`,
              fontWeight: FONT_WEIGHT,
              color: MAIN_TEXT_COLOR,
              padding: `${PADDING_VERTICAL}px ${PADDING_HORIZONTAL}px`,
              zIndex: 1,
              letterSpacing: "1px",
            }}
          >
            {visibleMainText}
          </div>
        </div>

        {/* Subtitle text line with orange background */}
        <div
          style={{
            position: "relative",
            display: "inline-block",
          }}
        >
          {/* Orange background bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: FONT_SIZE_SUBTITLE + PADDING_VERTICAL * 2,
              width: `${(subtitleTextWidth + PADDING_HORIZONTAL * 2) * barProgress}px`,
              backgroundColor: SUBTITLE_BG_COLOR,
              zIndex: 0,
            }}
          />

          {/* Subtitle text */}
          <div
            style={{
              position: "relative",
              fontFamily: FONT_FAMILY,
              fontSize: `${FONT_SIZE_SUBTITLE}px`,
              fontWeight: FONT_WEIGHT,
              color: SUBTITLE_TEXT_COLOR,
              padding: `${PADDING_VERTICAL}px ${PADDING_HORIZONTAL}px`,
              zIndex: 1,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            {visibleSubtitleText}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
