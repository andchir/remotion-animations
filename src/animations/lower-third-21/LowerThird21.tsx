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
  ENTRANCE_DURATION: 45, // 1.5 seconds - crisp entrance
  HOLD_START: 45,
  HOLD_DURATION: 105, // 3.5 seconds
  EXIT_START: 150,
  EXIT_DURATION: 30, // 1 second
};

// Text configuration
const PRIMARY_TEXT = "JOHN SMITH";
const SECONDARY_TEXT = "Lead Design Engineer";

// Visual configuration
const COLORS = {
  primary: "#FFFFFF", // White text
  secondary: "#D1D5DB", // Light gray text
  background: "#111827", // Dark corporate blue/gray
  accent: "#FBBF24", // Corporate Amber/Gold
};

const FONT_FAMILY = "Arial, Helvetica, sans-serif";
const FONT_WEIGHT_PRIMARY = "800";
const FONT_WEIGHT_SECONDARY = "500";
const FONT_SIZE_PRIMARY = 52;
const FONT_SIZE_SECONDARY = 24;

const CONTENT_LEFT_MARGIN = 140;
const CONTENT_BOTTOM_MARGIN = 120;

export const LowerThird21: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // === ANIMATION PROGRESS ===

  const entranceProgress = interpolate(
    frame,
    [TIMING.ENTRANCE_START, TIMING.ENTRANCE_START + TIMING.ENTRANCE_DURATION],
    [0, 1],
    { extrapolateRight: "clamp", easing: Easing.out(Easing.exp) }
  );

  const exitProgress = interpolate(
    frame,
    [TIMING.EXIT_START, TIMING.EXIT_START + TIMING.EXIT_DURATION],
    [0, 1],
    { extrapolateRight: "clamp", easing: Easing.in(Easing.exp) }
  );

  // Combine entrance and exit for main elements
  // 0 -> 1 (entrance) -> 1 (hold) -> 0 (exit)
  const mainVisibility = interpolate(
    frame,
    [
      TIMING.ENTRANCE_START,
      TIMING.ENTRANCE_START + TIMING.ENTRANCE_DURATION,
      TIMING.EXIT_START,
      TIMING.EXIT_START + TIMING.EXIT_DURATION,
    ],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // === GEOMETRIC TRANSFORMATIONS ===

  // 1. Vertical Accent Line (The Anchor)
  // Scales vertically from center
  const anchorLineHeight = interpolate(
    entranceProgress,
    [0, 0.6],
    [0, 140],
    { extrapolateRight: "clamp" }
  );
  
  const anchorLineHeightExit = interpolate(
    exitProgress,
    [0.4, 1],
    [140, 0],
    { extrapolateLeft: "clamp" }
  );

  const currentAnchorHeight = exitProgress > 0 ? anchorLineHeightExit : anchorLineHeight;

  // 2. Main Background Panel
  // Slides out from the anchor line to the right
  const panelWidth = interpolate(
    entranceProgress,
    [0.3, 0.9],
    [0, 550],
    { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }
  );

  const panelWidthExit = interpolate(
    exitProgress,
    [0.1, 0.6],
    [550, 0],
    { extrapolateLeft: "clamp", easing: Easing.in(Easing.cubic) }
  );

  const currentPanelWidth = exitProgress > 0 ? panelWidthExit : panelWidth;

  // 3. Text Reveal Mask
  // Text moves up from bottom, masked by container
  const textTranslateY = interpolate(
    entranceProgress,
    [0.5, 1],
    [60, 0],
    { extrapolateRight: "clamp", easing: Easing.back(1.2) }
  );
  
  const textOpacity = interpolate(
    entranceProgress,
    [0.5, 0.7],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  const textExitTranslateY = interpolate(
    exitProgress,
    [0, 0.3],
    [0, 60],
    { extrapolateLeft: "clamp" }
  );

  const currentTextY = exitProgress > 0 ? textExitTranslateY : textTranslateY;
  const currentTextOpacity = exitProgress > 0 && frame > TIMING.EXIT_START ? (1 - exitProgress * 4) : textOpacity;

  // 4. Secondary Accent (Top horizontal line)
  // Shoots across top of panel
  const topAccentWidth = interpolate(
    entranceProgress,
    [0.7, 1],
    [0, 40],
    { extrapolateRight: "clamp" }
  );

  // 5. Shimmer Effect on Hold
  // Subtle light pass across the panel
  const holdTime = frame - TIMING.HOLD_START;
  const shimmerPos = interpolate(
    holdTime,
    [0, 60],
    [-200, 800],
    { extrapolateRight: "clamp" }
  );
  
  // Only shimmer once during hold
  const shimmerOpacity = (holdTime > 0 && holdTime < 60) ? 0.1 : 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-start",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: CONTENT_LEFT_MARGIN,
          bottom: CONTENT_BOTTOM_MARGIN,
          width: 800, // Container width
          height: 140, // Container height
        }}
      >
        {/* Yellow Vertical Anchor Line */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: (140 - currentAnchorHeight) / 2, // Center vertically
            width: 6,
            height: currentAnchorHeight,
            backgroundColor: COLORS.accent,
            zIndex: 10,
          }}
        />

        {/* Main Background Panel - Dark Corporate Blue */}
        <div
          style={{
            position: "absolute",
            left: 6, // Right of anchor
            top: 20,
            width: currentPanelWidth,
            height: 100,
            backgroundColor: COLORS.background,
            overflow: "hidden", // Masks the text
            zIndex: 5,
          }}
        >
          {/* Shimmer Effect */}
          <div 
             style={{
               position: 'absolute',
               top: 0,
               left: 0,
               width: '40px',
               height: '100%',
               backgroundColor: 'white',
               transform: `skewX(-20deg) translateX(${shimmerPos}px)`,
               opacity: shimmerOpacity,
               zIndex: 2,
               filter: 'blur(10px)',
             }}
          />

          {/* Text Container */}
          <div
             style={{
               position: "absolute",
               left: 35,
               top: 22,
               display: "flex",
               flexDirection: "column",
               gap: 4,
               transform: `translateY(${currentTextY}px)`,
               opacity: currentTextOpacity <= 0 ? 0 : 1,
               zIndex: 3,
             }}
          >
            {/* Primary Name */}
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontWeight: FONT_WEIGHT_PRIMARY,
                fontSize: FONT_SIZE_PRIMARY,
                color: COLORS.primary,
                textTransform: "uppercase",
                lineHeight: "0.9",
                letterSpacing: "1px",
              }}
            >
             {PRIMARY_TEXT}
            </div>

            {/* Secondary Title */}
            <div
              style={{
                 display: 'flex',
                 alignItems: 'center',
                 gap: 10,
              }}
            >
                {/* Tiny accent square */}
                <div style={{ width: 6, height: 6, backgroundColor: COLORS.accent }} />
                
                <div
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontWeight: FONT_WEIGHT_SECONDARY,
                    fontSize: FONT_SIZE_SECONDARY,
                    color: COLORS.secondary,
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                  }}
                >
                  {SECONDARY_TEXT}
                </div>
            </div>
          </div>
        </div>

        {/* Top Decorative Accent Line */}
        <div
           style={{
             position: 'absolute',
             left: 6,
             top: 20,
             height: 4,
             width: topAccentWidth,
             backgroundColor: COLORS.primary,
             zIndex: 11,
           }}
        />
        
        {/* Bottom Decorative Accent Line (Appears on exit slightly) */}
        {exitProgress > 0 && (
           <div
             style={{
               position: 'absolute',
               left: 6,
               bottom: 20,
               height: 2,
               width: interpolate(exitProgress, [0, 0.5], [0, currentPanelWidth]),
               backgroundColor: COLORS.accent,
               zIndex: 11,
             }}
           />
        )}

      </div>
    </AbsoluteFill>
  );
};
