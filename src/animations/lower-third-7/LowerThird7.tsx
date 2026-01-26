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
  // Phase 1: Entrance - paper fold-in effect
  ENTRANCE_START: 0,
  ENTRANCE_DURATION: 50, // ~1.67 seconds

  // Phase 2: Hold - subtle shadow pulse
  HOLD_START: 50,
  HOLD_DURATION: 80, // ~2.67 seconds

  // Phase 3: Exit - fold back and slide away
  EXIT_START: 130,
  EXIT_DURATION: 50, // ~1.67 seconds
};

// Text configuration
const PRIMARY_TEXT = "JOHN SMITH";
const SECONDARY_TEXT = "Lead Design Engineer";

// Visual configuration - Warm coral/sunset flat theme
const COLORS = {
  primary: "#FFFFFF", // White for primary text
  secondary: "#FFF5F0", // Very light peach for secondary text
  accent: "#FF6B6B", // Coral pink
  accentOrange: "#FF8E53", // Warm orange
  accentYellow: "#FFD93D", // Soft yellow
  backgroundMain: "#FF6B6B", // Coral background
  backgroundSecondary: "#FF8E53", // Orange background for subtitle
  shadowColor: "rgba(255, 107, 107, 0.3)",
  decorAccent: "#FFD93D",
};

const FONT_FAMILY = "Arial, Helvetica, sans-serif";
const FONT_WEIGHT_PRIMARY = "800";
const FONT_WEIGHT_SECONDARY = "600";
const FONT_SIZE_PRIMARY = 52;
const FONT_SIZE_SECONDARY = 26;

// Layout configuration
const LOWER_THIRD_LEFT_MARGIN = 100;
const LOWER_THIRD_BOTTOM_MARGIN = 110;
const CARD_PADDING_VERTICAL = 18;
const CARD_PADDING_HORIZONTAL = 30;
const CARD_GAP = 10;

export const LowerThird7: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // === ENTRANCE ANIMATIONS ===

  // Main container fade in
  const containerOpacity = interpolate(
    frame,
    [TIMING.ENTRANCE_START, TIMING.ENTRANCE_START + 10],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Paper fold effect - primary card unfolds
  const primaryFoldProgress = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 5, TIMING.ENTRANCE_START + 35],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // Calculate 3D fold effect for primary card
  const primaryRotateX = interpolate(
    primaryFoldProgress,
    [0, 1],
    [-90, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const primaryScaleY = interpolate(
    primaryFoldProgress,
    [0, 1],
    [0.1, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Secondary card unfolds with delay
  const secondaryFoldProgress = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 20, TIMING.ENTRANCE_START + 48],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  const secondaryRotateX = interpolate(
    secondaryFoldProgress,
    [0, 1],
    [-90, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const secondaryScaleY = interpolate(
    secondaryFoldProgress,
    [0, 1],
    [0.1, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Text opacity fades in after fold
  const primaryTextOpacity = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 25, TIMING.ENTRANCE_START + 38],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const secondaryTextOpacity = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 38, TIMING.ENTRANCE_START + 48],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Decorative circle reveal
  const circleScale = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 30, TIMING.ENTRANCE_START + 48],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.back(1.3)),
    }
  );

  // === HOLD ANIMATIONS ===

  // Gentle shadow pulse
  const shadowPulse = interpolate(
    Math.sin((frame - TIMING.HOLD_START) / 30),
    [-1, 1],
    [0.7, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Subtle horizontal shift
  const shiftX = interpolate(
    Math.sin((frame - TIMING.HOLD_START) / 45),
    [-1, 1],
    [-2, 2],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Circle rotation
  const circleRotation = interpolate(
    frame - TIMING.HOLD_START,
    [0, 160],
    [0, 360],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // === EXIT ANIMATIONS ===

  // Exit fold back effect
  const exitPrimaryFold = interpolate(
    frame,
    [TIMING.EXIT_START, TIMING.EXIT_START + 30],
    [0, -90],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  const exitPrimaryScaleY = interpolate(
    frame,
    [TIMING.EXIT_START, TIMING.EXIT_START + 30],
    [1, 0.1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  const exitSecondaryFold = interpolate(
    frame,
    [TIMING.EXIT_START + 10, TIMING.EXIT_START + 38],
    [0, -90],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  const exitSecondaryScaleY = interpolate(
    frame,
    [TIMING.EXIT_START + 10, TIMING.EXIT_START + 38],
    [1, 0.1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  // Slide away during exit
  const exitSlideX = interpolate(
    frame,
    [TIMING.EXIT_START + 20, TIMING.EXIT_START + TIMING.EXIT_DURATION],
    [0, -200],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  // Overall opacity fade out
  const exitOpacity = interpolate(
    frame,
    [TIMING.EXIT_START + 30, TIMING.EXIT_START + TIMING.EXIT_DURATION],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Text opacity fades during exit
  const exitTextOpacity = interpolate(
    frame,
    [TIMING.EXIT_START, TIMING.EXIT_START + 20],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // === COMBINED TRANSFORMATIONS ===

  const isInEntrance = frame < TIMING.HOLD_START;
  const isInHold = frame >= TIMING.HOLD_START && frame < TIMING.EXIT_START;
  const isInExit = frame >= TIMING.EXIT_START;

  const finalOpacity = isInEntrance
    ? containerOpacity
    : isInExit
    ? exitOpacity
    : 1;

  const finalTranslateX = isInExit ? exitSlideX : isInHold ? shiftX : 0;

  const finalPrimaryRotateX = isInExit ? exitPrimaryFold : primaryRotateX;
  const finalPrimaryScaleY = isInExit ? exitPrimaryScaleY : primaryScaleY;

  const finalSecondaryRotateX = isInExit ? exitSecondaryFold : secondaryRotateX;
  const finalSecondaryScaleY = isInExit ? exitSecondaryScaleY : secondaryScaleY;

  const finalPrimaryTextOpacity = isInExit
    ? exitTextOpacity
    : primaryTextOpacity;
  const finalSecondaryTextOpacity = isInExit
    ? exitTextOpacity
    : secondaryTextOpacity;

  const shadowIntensity = isInHold ? shadowPulse : 1;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-start",
      }}
    >
      {/* Lower third container */}
      <div
        style={{
          position: "absolute",
          left: LOWER_THIRD_LEFT_MARGIN,
          bottom: LOWER_THIRD_BOTTOM_MARGIN,
          opacity: finalOpacity,
          transform: `translateX(${finalTranslateX}px)`,
          transformOrigin: "bottom left",
        }}
      >
        {/* Decorative circle accent on the left */}
        <div
          style={{
            position: "absolute",
            left: -50,
            top: "50%",
            transform: `translateY(-50%) scale(${circleScale}) rotate(${isInHold ? circleRotation : 0}deg)`,
            opacity: circleScale * 0.95,
          }}
        >
          {/* Outer circle */}
          <div
            style={{
              width: 45,
              height: 45,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${COLORS.accentYellow} 0%, ${COLORS.accentOrange} 100%)`,
              boxShadow: `0 4px 15px rgba(255, 211, 61, ${shadowIntensity * 0.4})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Inner circle */}
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: "white",
                opacity: 0.9,
              }}
            />
          </div>
        </div>

        {/* Container for cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: `${CARD_GAP}px`,
            perspective: "1200px",
          }}
        >
          {/* Primary card (name) */}
          <div
            style={{
              position: "relative",
              transformStyle: "preserve-3d",
              transform: `rotateX(${finalPrimaryRotateX}deg) scaleY(${finalPrimaryScaleY})`,
              transformOrigin: "bottom center",
            }}
          >
            <div
              style={{
                background: COLORS.backgroundMain,
                paddingTop: CARD_PADDING_VERTICAL,
                paddingBottom: CARD_PADDING_VERTICAL,
                paddingLeft: CARD_PADDING_HORIZONTAL,
                paddingRight: CARD_PADDING_HORIZONTAL,
                borderRadius: "8px",
                boxShadow: `0 ${8 * shadowIntensity}px ${20 * shadowIntensity}px ${COLORS.shadowColor}`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Subtle gradient overlay for depth */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.1) 100%)`,
                  pointerEvents: "none",
                }}
              />

              {/* Primary text */}
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: `${FONT_SIZE_PRIMARY}px`,
                  fontWeight: FONT_WEIGHT_PRIMARY,
                  color: COLORS.primary,
                  letterSpacing: "2.5px",
                  lineHeight: 1.1,
                  textTransform: "uppercase",
                  opacity: finalPrimaryTextOpacity,
                  textShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {PRIMARY_TEXT}
              </div>
            </div>
          </div>

          {/* Secondary card (title) */}
          <div
            style={{
              position: "relative",
              transformStyle: "preserve-3d",
              transform: `rotateX(${finalSecondaryRotateX}deg) scaleY(${finalSecondaryScaleY})`,
              transformOrigin: "top center",
            }}
          >
            <div
              style={{
                background: COLORS.backgroundSecondary,
                paddingTop: CARD_PADDING_VERTICAL - 4,
                paddingBottom: CARD_PADDING_VERTICAL - 4,
                paddingLeft: CARD_PADDING_HORIZONTAL,
                paddingRight: CARD_PADDING_HORIZONTAL,
                borderRadius: "8px",
                boxShadow: `0 ${6 * shadowIntensity}px ${16 * shadowIntensity}px rgba(255, 142, 83, 0.25)`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Subtle gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.08) 100%)`,
                  pointerEvents: "none",
                }}
              />

              {/* Secondary text */}
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: `${FONT_SIZE_SECONDARY}px`,
                  fontWeight: FONT_WEIGHT_SECONDARY,
                  color: COLORS.secondary,
                  letterSpacing: "1.5px",
                  lineHeight: 1.2,
                  opacity: finalSecondaryTextOpacity,
                  textShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {SECONDARY_TEXT}
              </div>
            </div>
          </div>
        </div>

        {/* Decorative small accent bar on the right */}
        <div
          style={{
            position: "absolute",
            right: -20,
            top: "50%",
            transform: `translateY(-50%) scaleX(${circleScale})`,
            width: 4,
            height: 60,
            background: `linear-gradient(180deg, ${COLORS.accentYellow} 0%, ${COLORS.accent} 100%)`,
            borderRadius: "2px",
            boxShadow: `0 0 ${12 * shadowIntensity}px rgba(255, 211, 61, 0.4)`,
            opacity: circleScale,
          }}
        />

        {/* Small decorative dots at the top */}
        <div
          style={{
            position: "absolute",
            left: CARD_PADDING_HORIZONTAL,
            top: -25,
            display: "flex",
            gap: "8px",
            opacity: circleScale,
            transform: `scale(${circleScale})`,
          }}
        >
          {[COLORS.accentYellow, COLORS.accent, COLORS.accentOrange].map(
            (color, i) => (
              <div
                key={i}
                style={{
                  width: i === 1 ? 8 : 6,
                  height: i === 1 ? 8 : 6,
                  borderRadius: "50%",
                  background: color,
                  boxShadow: `0 2px 8px ${color}66`,
                  opacity: isInHold
                    ? interpolate(
                        Math.sin((frame - TIMING.HOLD_START + i * 15) / 20),
                        [-1, 1],
                        [0.7, 1]
                      )
                    : 0.9,
                }}
              />
            )
          )}
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: -18,
            width: `${200 * circleScale}px`,
            height: 3,
            background: `linear-gradient(90deg, ${COLORS.accent} 0%, ${COLORS.accentOrange} 50%, transparent 100%)`,
            borderRadius: "2px",
            opacity: circleScale * 0.8,
            boxShadow: `0 0 10px rgba(255, 107, 107, ${shadowIntensity * 0.3})`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
