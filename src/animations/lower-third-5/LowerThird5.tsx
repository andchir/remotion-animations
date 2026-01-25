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
  // Phase 1: Entrance - slide from right with blur-to-focus
  ENTRANCE_START: 0,
  ENTRANCE_DURATION: 45, // ~1.5 seconds

  // Phase 2: Hold - floating motion with glow pulse
  HOLD_START: 45,
  HOLD_DURATION: 90, // ~3 seconds

  // Phase 3: Exit - scale down with particle dissolve
  EXIT_START: 135,
  EXIT_DURATION: 45, // ~1.5 seconds
};

// Text configuration
const PRIMARY_TEXT = "JOHN SMITH";
const SECONDARY_TEXT = "Lead Design Engineer";

// Visual configuration - Modern glass morphism with blue-teal theme
const COLORS = {
  primary: "#FFFFFF", // White for primary text
  secondary: "#E8F4F8", // Light blue-white for secondary text
  accent: "#00D9FF", // Bright cyan-blue
  accentSecondary: "#7B42F6", // Soft purple
  accentGradient: "linear-gradient(135deg, #00D9FF 0%, #7B42F6 100%)",
  backgroundGlass: "rgba(15, 25, 45, 0.75)", // Dark blue-gray with transparency
  glowPrimary: "#00D9FF",
  glowSecondary: "#7B42F6",
};

const FONT_FAMILY = "Arial, Helvetica, sans-serif";
const FONT_WEIGHT_PRIMARY = "900";
const FONT_WEIGHT_SECONDARY = "600";
const FONT_SIZE_PRIMARY = 56;
const FONT_SIZE_SECONDARY = 28;

// Layout configuration
const LOWER_THIRD_LEFT_MARGIN = 90;
const LOWER_THIRD_BOTTOM_MARGIN = 110;

export const LowerThird5: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // === ENTRANCE ANIMATIONS ===

  // Main container slide-in from right
  const containerSlideX = interpolate(
    frame,
    [TIMING.ENTRANCE_START, TIMING.ENTRANCE_START + TIMING.ENTRANCE_DURATION],
    [200, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // Blur-to-focus effect during entrance
  const entranceBlur = interpolate(
    frame,
    [TIMING.ENTRANCE_START, TIMING.ENTRANCE_START + 25],
    [12, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );

  // Container opacity fade-in
  const containerOpacity = interpolate(
    frame,
    [TIMING.ENTRANCE_START, TIMING.ENTRANCE_START + 18],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Scale animation during entrance
  const entranceScale = interpolate(
    frame,
    [TIMING.ENTRANCE_START, TIMING.ENTRANCE_START + TIMING.ENTRANCE_DURATION],
    [0.9, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.back(1.1)),
    }
  );

  // Glass background expansion
  const glassExpand = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 8, TIMING.ENTRANCE_START + 35],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // Accent line growth
  const accentLineWidth = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 20, TIMING.ENTRANCE_START + 42],
    [0, 100],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );

  // Text reveal with stagger
  const primaryTextReveal = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 12, TIMING.ENTRANCE_START + 35],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );

  const secondaryTextReveal = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 20, TIMING.ENTRANCE_START + 40],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );

  // Decorative circle reveal
  const circleScale = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 15, TIMING.ENTRANCE_START + 38],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.back(1.4)),
    }
  );

  // === HOLD ANIMATIONS ===

  // Gentle floating motion (vertical)
  const floatY = interpolate(
    Math.sin((frame - TIMING.HOLD_START) / 40),
    [-1, 1],
    [-3, 3],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Subtle horizontal sway
  const swayX = interpolate(
    Math.sin((frame - TIMING.HOLD_START) / 50),
    [-1, 1],
    [-2, 2],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Soft glow pulse
  const glowPulse = interpolate(
    Math.sin((frame - TIMING.HOLD_START) / 25),
    [-1, 1],
    [0.7, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Gradient shift animation
  const gradientShift = interpolate(
    (frame - TIMING.HOLD_START) % 80,
    [0, 80],
    [0, 360],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Circle rotation during hold
  const circleRotation = interpolate(
    frame - TIMING.HOLD_START,
    [0, 150],
    [0, 360],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Backdrop blur intensity pulse
  const backdropBlurIntensity = interpolate(
    Math.sin((frame - TIMING.HOLD_START) / 35),
    [-1, 1],
    [8, 12],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // === EXIT ANIMATIONS ===

  // Exit opacity fade
  const exitOpacity = interpolate(
    frame,
    [TIMING.EXIT_START, TIMING.EXIT_START + TIMING.EXIT_DURATION],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  // Exit scale down
  const exitScale = interpolate(
    frame,
    [TIMING.EXIT_START, TIMING.EXIT_START + TIMING.EXIT_DURATION],
    [1, 0.85],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.back(1.3)),
    }
  );

  // Exit blur effect
  const exitBlur = interpolate(
    frame,
    [TIMING.EXIT_START, TIMING.EXIT_START + TIMING.EXIT_DURATION],
    [0, 15],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.quad),
    }
  );

  // Particle dissolve effect
  const particleSpread = interpolate(
    frame,
    [TIMING.EXIT_START, TIMING.EXIT_START + TIMING.EXIT_DURATION],
    [0, 80],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );

  const particleOpacity = interpolate(
    frame,
    [TIMING.EXIT_START, TIMING.EXIT_START + TIMING.EXIT_DURATION],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  // === COMBINED TRANSFORMATIONS ===

  const isInEntrance = frame < TIMING.HOLD_START;
  const isInHold = frame >= TIMING.HOLD_START && frame < TIMING.EXIT_START;
  const isInExit = frame >= TIMING.EXIT_START;

  const finalTranslateX = isInEntrance
    ? containerSlideX
    : isInHold
    ? swayX
    : 0;

  const finalTranslateY = isInHold ? floatY : 0;

  const finalOpacity = isInEntrance
    ? containerOpacity
    : isInExit
    ? exitOpacity
    : 1;

  const finalScale = isInEntrance
    ? entranceScale
    : isInExit
    ? exitScale
    : 1;

  const finalBlur = isInEntrance
    ? entranceBlur
    : isInExit
    ? exitBlur
    : 0;

  const finalBackdropBlur = isInHold ? backdropBlurIntensity : 10;

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
          transform: `translate(${finalTranslateX}px, ${finalTranslateY}px) scale(${finalScale})`,
          opacity: finalOpacity,
          filter: `blur(${finalBlur}px)`,
          transformOrigin: "bottom left",
        }}
      >
        {/* Main glass morphism background */}
        <div
          style={{
            position: "absolute",
            left: -28,
            top: -22,
            right: -28,
            bottom: -22,
            background: COLORS.backgroundGlass,
            backdropFilter: `blur(${finalBackdropBlur}px) saturate(180%)`,
            WebkitBackdropFilter: `blur(${finalBackdropBlur}px) saturate(180%)`,
            borderRadius: "16px",
            border: "1.5px solid rgba(255, 255, 255, 0.18)",
            boxShadow: `
              0 8px 32px rgba(0, 0, 0, 0.4),
              inset 0 0 60px rgba(0, 217, 255, 0.08),
              0 0 ${40 * (isInHold ? glowPulse : 0.7)}px rgba(0, 217, 255, 0.3)
            `,
            clipPath: isInEntrance
              ? `inset(0 ${100 - glassExpand * 100}% 0 0 round 16px)`
              : undefined,
            zIndex: -1,
          }}
        >
          {/* Inner glow gradient overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(
                ${135 + (isInHold ? gradientShift * 0.2 : 0)}deg,
                rgba(0, 217, 255, 0.15) 0%,
                transparent 40%,
                rgba(123, 66, 246, 0.15) 100%
              )`,
              borderRadius: "16px",
              opacity: isInHold ? glowPulse : 0.8,
            }}
          />
        </div>

        {/* Decorative animated circle */}
        <div
          style={{
            position: "absolute",
            left: -50,
            top: "50%",
            transform: `translateY(-50%) scale(${circleScale}) rotate(${isInHold ? circleRotation * 0.5 : 0}deg)`,
            opacity: circleScale * 0.9,
          }}
        >
          <svg width="50" height="50" viewBox="0 0 50 50">
            {/* Outer ring */}
            <circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke={COLORS.accent}
              strokeWidth="2"
              strokeDasharray="10 5"
              style={{
                filter: `drop-shadow(0 0 ${10 * (isInHold ? glowPulse : 0.8)}px ${COLORS.glowPrimary})`,
              }}
            />
            {/* Inner circle */}
            <circle
              cx="25"
              cy="25"
              r="12"
              fill="none"
              stroke={COLORS.accentSecondary}
              strokeWidth="2"
              opacity="0.6"
            />
            {/* Center dot */}
            <circle
              cx="25"
              cy="25"
              r="4"
              fill={COLORS.accent}
              opacity="0.8"
            />
          </svg>
        </div>

        {/* Small accent dots on the right */}
        <div
          style={{
            position: "absolute",
            right: -45,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            opacity: circleScale,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: i === 1 ? 8 : 5,
                height: i === 1 ? 8 : 5,
                borderRadius: "50%",
                background:
                  i === 1 ? COLORS.accent : COLORS.accentSecondary,
                opacity: isInHold
                  ? interpolate(
                      Math.sin((frame - TIMING.HOLD_START + i * 20) / 18),
                      [-1, 1],
                      [0.5, 1]
                    )
                  : 0.8,
                boxShadow: `0 0 ${8 * (isInHold ? glowPulse : 0.7)}px ${
                  i === 1 ? COLORS.glowPrimary : COLORS.glowSecondary
                }`,
              }}
            />
          ))}
        </div>

        {/* Animated gradient accent line */}
        <div
          style={{
            position: "absolute",
            left: -28,
            bottom: -28,
            width: `${Math.min(accentLineWidth, 100) * 3.2}px`,
            height: "4px",
            background: `linear-gradient(90deg,
              ${COLORS.accent} 0%,
              ${COLORS.accentSecondary} ${50 + (isInHold ? Math.sin(gradientShift * 0.05) * 20 : 0)}%,
              transparent 100%)`,
            borderRadius: "2px",
            boxShadow: isInHold
              ? `0 0 ${15 * glowPulse}px ${COLORS.glowPrimary}`
              : `0 0 10px ${COLORS.glowPrimary}`,
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            right: -28,
            top: -28,
            width: `${Math.min(accentLineWidth, 100) * 1.8}px`,
            height: "3px",
            background: `linear-gradient(90deg,
              transparent 0%,
              ${COLORS.accentSecondary} 50%,
              ${COLORS.accent} 100%)`,
            borderRadius: "2px",
            opacity: 0.8,
          }}
        />

        {/* Particle dissolve effects during exit */}
        {isInExit && (
          <>
            {[...Array(12)].map((_, i) => {
              const angle = (i / 12) * Math.PI * 2;
              const distance = particleSpread * (0.8 + Math.random() * 0.4);
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;
              const size = 3 + Math.random() * 4;

              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: `${size}px`,
                    height: `${size}px`,
                    background:
                      i % 3 === 0
                        ? COLORS.accent
                        : i % 3 === 1
                        ? COLORS.accentSecondary
                        : "#FFFFFF",
                    borderRadius: "50%",
                    transform: `translate(${x}px, ${y}px)`,
                    opacity: particleOpacity * (0.6 + Math.random() * 0.4),
                    boxShadow: `0 0 8px ${
                      i % 2 === 0 ? COLORS.glowPrimary : COLORS.glowSecondary
                    }`,
                  }}
                />
              );
            })}
          </>
        )}

        {/* Text content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            paddingLeft: 6,
          }}
        >
          {/* Primary text (name) */}
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: `${FONT_SIZE_PRIMARY}px`,
              fontWeight: FONT_WEIGHT_PRIMARY,
              color: COLORS.primary,
              letterSpacing: "4px",
              lineHeight: 1.15,
              textTransform: "uppercase",
              opacity: primaryTextReveal,
              transform: `translateX(${(1 - primaryTextReveal) * 30}px)`,
              textShadow: `
                0 2px 12px rgba(0, 0, 0, 0.8),
                0 0 30px rgba(0, 217, 255, ${isInHold ? glowPulse * 0.4 : 0.25}),
                0 0 50px rgba(123, 66, 246, ${isInHold ? glowPulse * 0.2 : 0.1})
              `,
            }}
          >
            {PRIMARY_TEXT}
          </div>

          {/* Decorative divider line */}
          <div
            style={{
              width: `${280 * secondaryTextReveal}px`,
              height: "2px",
              background: `linear-gradient(90deg,
                ${COLORS.accent} 0%,
                ${COLORS.accentSecondary} 70%,
                transparent 100%)`,
              borderRadius: "1px",
              marginTop: "4px",
              marginBottom: "4px",
              boxShadow: isInHold
                ? `0 0 ${10 * glowPulse}px ${COLORS.accent}`
                : `0 0 6px ${COLORS.accent}`,
            }}
          />

          {/* Secondary text (title/position) */}
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: `${FONT_SIZE_SECONDARY}px`,
              fontWeight: FONT_WEIGHT_SECONDARY,
              color: COLORS.secondary,
              letterSpacing: "2px",
              lineHeight: 1.2,
              opacity: secondaryTextReveal,
              transform: `translateX(${(1 - secondaryTextReveal) * 25}px)`,
              textShadow: `
                0 2px 10px rgba(0, 0, 0, 0.8),
                0 0 20px rgba(0, 217, 255, ${isInHold ? glowPulse * 0.3 : 0.15})
              `,
            }}
          >
            {SECONDARY_TEXT}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
