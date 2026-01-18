import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";

// Animation timing configuration (in frames, at 30fps)
// The animation runs from 00:07 to 00:13 (6 seconds = 180 frames)
// Reference video shows smooth bar fill animation followed by text appearance
const TIMING = {
  BAR_START: 0, // Bars start filling
  BAR_END: 45, // Bars finish filling (1.5 seconds)
  TEXT_APPEAR: 48, // Text appears shortly after bars complete
  HOLD_END: 180, // Animation ends (6 seconds total)
};

export const TextAnimation1: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Smooth bar fill progress with easing
  const barProgress = interpolate(
    frame,
    [TIMING.BAR_START, TIMING.BAR_END],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.25, 0.1, 0.25, 1), // Smooth ease-in-out
    }
  );

  // Text appears instantly when bar animation is complete
  const textOpacity = frame >= TIMING.TEXT_APPEAR ? 1 : 0;

  // Text content
  const nameText = "ISLA KING";
  const jobText = "ENGINEER";

  // Position in bottom left corner
  const bottomOffset = 60; // Distance from bottom
  const leftOffset = 40; // Distance from left

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
      }}
    >
      {/* Container positioned in bottom left */}
      <div
        style={{
          position: "absolute",
          bottom: bottomOffset,
          left: leftOffset,
          display: "flex",
          flexDirection: "column",
          gap: "0px",
        }}
      >
        {/* Name section - white bar with black text */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            backgroundColor: "white",
            height: "60px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* White bar fill animation */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: `${barProgress * 100}%`,
              backgroundColor: "white",
              zIndex: 0,
            }}
          />
          {/* Name text */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              fontFamily: "Arial, sans-serif",
              fontSize: "36px",
              fontWeight: "bold",
              color: "black",
              letterSpacing: "1px",
              paddingLeft: "20px",
              paddingRight: "20px",
              opacity: textOpacity,
              whiteSpace: "nowrap",
            }}
          >
            {nameText}
          </div>
        </div>

        {/* Job title section - orange bar with white text */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            backgroundColor: "#FF6600", // Orange color
            height: "40px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Orange bar fill animation */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: `${barProgress * 100}%`,
              backgroundColor: "#FF6600",
              zIndex: 0,
            }}
          />
          {/* Job title text */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              fontFamily: "Arial, sans-serif",
              fontSize: "24px",
              fontWeight: "bold",
              color: "white",
              letterSpacing: "1px",
              paddingLeft: "20px",
              paddingRight: "20px",
              opacity: textOpacity,
              whiteSpace: "nowrap",
            }}
          >
            {jobText}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
