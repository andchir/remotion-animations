import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";

// Animation timing configuration (in frames, at 30fps)
// The animation runs from 00:07 to 00:13 (6 seconds = 180 frames)
const TIMING = {
  NAME_START: 0, // Name starts appearing
  NAME_FULL: 30, // Name fully visible (1 second)
  JOB_START: 30, // Job title starts appearing
  JOB_FULL: 60, // Job title fully visible (2 seconds)
  HOLD_END: 180, // Animation ends (6 seconds total)
};

export const TextAnimation1: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Calculate text reveal progress
  const nameProgress = interpolate(
    frame,
    [TIMING.NAME_START, TIMING.NAME_FULL],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const jobProgress = interpolate(
    frame,
    [TIMING.JOB_START, TIMING.JOB_FULL],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Slide-in animation for the name box
  const nameSlideX = interpolate(
    frame,
    [TIMING.NAME_START, TIMING.NAME_FULL],
    [-400, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Slide-in animation for the job box
  const jobSlideX = interpolate(
    frame,
    [TIMING.JOB_START, TIMING.JOB_FULL],
    [-300, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Text reveal effect - shows characters progressively
  const fullNameText = "JOHN DOE";
  const visibleNameChars = Math.floor(nameProgress * fullNameText.length);
  const displayName = fullNameText.substring(0, visibleNameChars);

  const fullJobText = "ENGINEER";
  const visibleJobChars = Math.floor(jobProgress * fullJobText.length);
  const displayJob = fullJobText.substring(0, visibleJobChars);

  // Center position on screen
  const centerX = width / 2;
  const centerY = height / 2;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Name box - white background with black text */}
      <div
        style={{
          transform: `translateX(${nameSlideX}px)`,
          backgroundColor: "white",
          padding: "16px 32px",
          display: "inline-block",
          opacity: nameProgress > 0 ? 1 : 0,
          marginBottom: "12px",
        }}
      >
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "72px",
            fontWeight: "bold",
            color: "black",
            letterSpacing: "2px",
            whiteSpace: "nowrap",
          }}
        >
          {displayName}
          {/* Invisible full text to maintain box width */}
          <span style={{ opacity: 0, position: "absolute", left: 0 }}>
            {fullNameText}
          </span>
        </div>
      </div>

      {/* Job title box - orange background with white text */}
      <div
        style={{
          transform: `translateX(${jobSlideX}px)`,
          backgroundColor: "#FF8C00", // Orange color
          padding: "12px 32px",
          display: "inline-block",
          opacity: jobProgress > 0 ? 1 : 0,
        }}
      >
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "54px",
            fontWeight: "bold",
            color: "white",
            letterSpacing: "2px",
            whiteSpace: "nowrap",
          }}
        >
          {displayJob}
          {/* Invisible full text to maintain box width */}
          <span style={{ opacity: 0, position: "absolute", left: 0 }}>
            {fullJobText}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
