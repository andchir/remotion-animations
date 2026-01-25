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
  // Phase 1: Entrance - split reveal with glitch effect
  ENTRANCE_START: 0,
  ENTRANCE_DURATION: 48, // ~1.6 seconds

  // Phase 2: Hold - wave distortion and scan effects
  HOLD_START: 48,
  HOLD_DURATION: 84, // ~2.8 seconds

  // Phase 3: Exit - explosive fade with particle effect
  EXIT_START: 132,
  EXIT_DURATION: 48, // ~1.6 seconds
};

// Text configuration
const PRIMARY_TEXT = "JOHN SMITH";
const SECONDARY_TEXT = "Lead Design Engineer";

// Visual configuration - Neon cyberpunk theme
const COLORS = {
  primary: "#FFFFFF", // White for primary text
  secondary: "#E0F7FF", // Light cyan for secondary text
  accent: "#00FFFF", // Electric cyan
  accentMagenta: "#FF00FF", // Neon magenta
  accentBlue: "#0088FF", // Electric blue
  backgroundBox: "rgba(5, 5, 20, 0.92)", // Dark blue-black background
  glowCyan: "#00FFFF",
  glowMagenta: "#FF00FF",
  scanlineColor: "rgba(0, 255, 255, 0.1)",
};

const FONT_FAMILY = "Arial, Helvetica, sans-serif";
const FONT_WEIGHT_PRIMARY = "900";
const FONT_WEIGHT_SECONDARY = "600";
const FONT_SIZE_PRIMARY = 58;
const FONT_SIZE_SECONDARY = 27;

// Layout configuration
const LOWER_THIRD_LEFT_MARGIN = 90;
const LOWER_THIRD_BOTTOM_MARGIN = 110;

export const LowerThird4: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // === ENTRANCE ANIMATIONS ===

  // Split reveal - left and right parts converge
  const leftPartProgress = interpolate(
    frame,
    [TIMING.ENTRANCE_START, TIMING.ENTRANCE_START + TIMING.ENTRANCE_DURATION],
    [-200, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  const rightPartProgress = interpolate(
    frame,
    [TIMING.ENTRANCE_START, TIMING.ENTRANCE_START + TIMING.ENTRANCE_DURATION],
    [200, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // Glitch effect during entrance
  const glitchIntensity = interpolate(
    frame,
    [TIMING.ENTRANCE_START, TIMING.ENTRANCE_START + 20],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const glitchOffsetX = frame < TIMING.ENTRANCE_START + 20
    ? Math.sin(frame * 3.7) * 8 * glitchIntensity
    : 0;

  const glitchOffsetY = frame < TIMING.ENTRANCE_START + 20
    ? Math.sin(frame * 5.3) * 4 * glitchIntensity
    : 0;

  // Container opacity fade-in
  const containerOpacity = interpolate(
    frame,
    [TIMING.ENTRANCE_START, TIMING.ENTRANCE_START + 12],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Hexagon accent reveal
  const hexagonScale = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 15, TIMING.ENTRANCE_START + 40],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.back(1.4)),
    }
  );

  // Text reveal with digital scan effect
  const primaryTextReveal = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 20, TIMING.ENTRANCE_START + 42],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );

  const secondaryTextReveal = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 28, TIMING.ENTRANCE_START + 46],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );

  // === HOLD ANIMATIONS ===

  // Subtle wave distortion effect
  const waveOffset = interpolate(
    (frame - TIMING.HOLD_START) % 60,
    [0, 60],
    [0, Math.PI * 2],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const waveDistortion = Math.sin(waveOffset) * 2;

  // Pulsing glow effect (alternating cyan and magenta)
  const glowCycle = interpolate(
    (frame - TIMING.HOLD_START) % 45,
    [0, 22.5, 45],
    [0, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Scan line animation
  const scanlinePosition = interpolate(
    (frame - TIMING.HOLD_START) % 90,
    [0, 90],
    [-100, 200],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Hexagon rotation
  const hexagonRotation = interpolate(
    frame - TIMING.HOLD_START,
    [0, 180],
    [0, 360],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // === EXIT ANIMATIONS ===

  // Exit with explosive scatter effect
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

  const exitScale = interpolate(
    frame,
    [TIMING.EXIT_START, TIMING.EXIT_START + TIMING.EXIT_DURATION],
    [1, 1.2],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.quad),
    }
  );

  const exitBlur = interpolate(
    frame,
    [TIMING.EXIT_START, TIMING.EXIT_START + TIMING.EXIT_DURATION],
    [0, 15],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  // Particle scatter effect for exit
  const particleSpread = interpolate(
    frame,
    [TIMING.EXIT_START, TIMING.EXIT_START + TIMING.EXIT_DURATION],
    [0, 100],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
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

  const finalScale = isInExit ? exitScale : 1;
  const finalBlur = isInExit ? exitBlur : 0;

  // Render multiple text characters for glitch effect
  const renderGlitchText = (
    text: string,
    isVisible: boolean,
    progress: number
  ) => {
    if (!isVisible) return null;

    const mainOpacity = progress;
    const glitchVisible = isInEntrance && glitchIntensity > 0.3;

    return (
      <>
        {/* Main text */}
        <span style={{ opacity: mainOpacity }}>{text}</span>

        {/* Glitch layers */}
        {glitchVisible && (
          <>
            <span
              style={{
                position: "absolute",
                left: glitchOffsetX - 3,
                top: glitchOffsetY,
                color: COLORS.accent,
                opacity: glitchIntensity * 0.5,
                mixBlendMode: "screen",
              }}
            >
              {text}
            </span>
            <span
              style={{
                position: "absolute",
                left: glitchOffsetX + 3,
                top: -glitchOffsetY,
                color: COLORS.accentMagenta,
                opacity: glitchIntensity * 0.5,
                mixBlendMode: "screen",
              }}
            >
              {text}
            </span>
          </>
        )}
      </>
    );
  };

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
          transform: `scale(${finalScale})`,
          filter: `blur(${finalBlur}px)`,
          transformOrigin: "bottom left",
        }}
      >
        {/* Background container with split animation */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {/* Main background box */}
          <div
            style={{
              position: "absolute",
              left: -30,
              top: -25,
              right: -30,
              bottom: -25,
              background: COLORS.backgroundBox,
              borderRadius: "4px",
              border: `2px solid ${COLORS.accent}`,
              boxShadow: `
                0 0 ${25 + glowCycle * 15}px ${COLORS.glowCyan},
                inset 0 0 30px rgba(0, 255, 255, 0.05),
                0 4px 40px rgba(0, 0, 0, 0.6)
              `,
              clipPath: isInEntrance
                ? `polygon(
                    0 0,
                    ${50 + leftPartProgress / 4}% 0,
                    ${50 + leftPartProgress / 4}% 100%,
                    0 100%,
                    ${50 + rightPartProgress / 4}% 100%,
                    ${50 + rightPartProgress / 4}% 0,
                    100% 0,
                    100% 100%,
                    ${50 + rightPartProgress / 4}% 100%,
                    ${50 + leftPartProgress / 4}% 100%
                  )`
                : undefined,
              zIndex: -1,
            }}
          >
            {/* Animated scan lines during hold */}
            {isInHold && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `repeating-linear-gradient(
                    0deg,
                    ${COLORS.scanlineColor} 0px,
                    transparent 2px,
                    transparent 4px
                  )`,
                  pointerEvents: "none",
                }}
              />
            )}

            {/* Moving scan line effect */}
            {isInHold && (
              <div
                style={{
                  position: "absolute",
                  top: `${scanlinePosition}%`,
                  left: 0,
                  right: 0,
                  height: "3px",
                  background: `linear-gradient(90deg,
                    transparent 0%,
                    ${COLORS.accent} 50%,
                    transparent 100%)`,
                  boxShadow: `0 0 15px ${COLORS.accent}`,
                  opacity: 0.8,
                }}
              />
            )}
          </div>

          {/* Hexagonal accent shapes */}
          <div
            style={{
              position: "absolute",
              left: -55,
              top: "50%",
              transform: `translateY(-50%) scale(${hexagonScale}) rotate(${isInHold ? hexagonRotation * 0.5 : 0}deg)`,
              opacity: hexagonScale,
            }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40">
              <polygon
                points="20,2 35,11 35,29 20,38 5,29 5,11"
                fill="none"
                stroke={COLORS.accent}
                strokeWidth="2"
                style={{
                  filter: `drop-shadow(0 0 ${8 + glowCycle * 6}px ${COLORS.glowCyan})`,
                }}
              />
              <polygon
                points="20,8 30,14 30,26 20,32 10,26 10,14"
                fill={COLORS.accentBlue}
                opacity="0.3"
              />
            </svg>
          </div>

          {/* Right hexagon */}
          <div
            style={{
              position: "absolute",
              right: -55,
              top: "50%",
              transform: `translateY(-50%) scale(${hexagonScale}) rotate(${isInHold ? -hexagonRotation * 0.3 : 0}deg)`,
              opacity: hexagonScale * 0.7,
            }}
          >
            <svg width="30" height="30" viewBox="0 0 30 30">
              <polygon
                points="15,2 26,9 26,21 15,28 4,21 4,9"
                fill="none"
                stroke={COLORS.accentMagenta}
                strokeWidth="2"
                style={{
                  filter: `drop-shadow(0 0 6px ${COLORS.glowMagenta})`,
                }}
              />
            </svg>
          </div>

          {/* Corner accent lines */}
          <div
            style={{
              position: "absolute",
              left: -30,
              top: -25,
              width: "40px",
              height: "40px",
              borderLeft: `3px solid ${COLORS.accent}`,
              borderTop: `3px solid ${COLORS.accent}`,
              opacity: interpolate(
                frame,
                [TIMING.ENTRANCE_START + 30, TIMING.ENTRANCE_START + 45],
                [0, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }
              ),
              boxShadow: `0 0 10px ${COLORS.accent}`,
            }}
          />

          <div
            style={{
              position: "absolute",
              right: -30,
              bottom: -25,
              width: "40px",
              height: "40px",
              borderRight: `3px solid ${COLORS.accentMagenta}`,
              borderBottom: `3px solid ${COLORS.accentMagenta}`,
              opacity: interpolate(
                frame,
                [TIMING.ENTRANCE_START + 30, TIMING.ENTRANCE_START + 45],
                [0, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }
              ),
              boxShadow: `0 0 10px ${COLORS.accentMagenta}`,
            }}
          />

          {/* Particle effects during exit */}
          {isInExit && (
            <>
              {[...Array(8)].map((_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                const distance = particleSpread;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;

                return (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      width: "8px",
                      height: "8px",
                      background:
                        i % 2 === 0 ? COLORS.accent : COLORS.accentMagenta,
                      borderRadius: "50%",
                      transform: `translate(${x}px, ${y}px)`,
                      opacity: 1 - particleSpread / 100,
                      boxShadow: `0 0 10px ${i % 2 === 0 ? COLORS.glowCyan : COLORS.glowMagenta}`,
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
              gap: "6px",
              paddingLeft: 8,
              transform: isInHold ? `translateX(${waveDistortion}px)` : undefined,
            }}
          >
            {/* Primary text (name) */}
            <div
              style={{
                position: "relative",
                fontFamily: FONT_FAMILY,
                fontSize: `${FONT_SIZE_PRIMARY}px`,
                fontWeight: FONT_WEIGHT_PRIMARY,
                color: COLORS.primary,
                letterSpacing: "5px",
                lineHeight: 1.1,
                textTransform: "uppercase",
                textShadow: `
                  0 0 20px ${COLORS.glowCyan},
                  0 0 40px ${COLORS.glowCyan},
                  0 2px 10px rgba(0, 0, 0, 0.9),
                  2px 2px 0 ${COLORS.accentBlue},
                  -2px -2px 0 ${COLORS.accentMagenta}
                `,
                WebkitTextStroke: `1px rgba(0, 255, 255, 0.3)`,
              }}
            >
              {renderGlitchText(
                PRIMARY_TEXT,
                true,
                primaryTextReveal
              )}
            </div>

            {/* Horizontal divider line with gradient */}
            <div
              style={{
                width: `${350 * primaryTextReveal}px`,
                height: "2px",
                background: `linear-gradient(90deg,
                  ${COLORS.accent} 0%,
                  ${COLORS.accentMagenta} 50%,
                  ${COLORS.accentBlue} 100%)`,
                boxShadow: isInHold
                  ? `0 0 ${12 + glowCycle * 8}px ${COLORS.accent}`
                  : `0 0 8px ${COLORS.accent}`,
                marginTop: "8px",
                marginBottom: "8px",
              }}
            />

            {/* Secondary text (title/position) */}
            <div
              style={{
                position: "relative",
                fontFamily: FONT_FAMILY,
                fontSize: `${FONT_SIZE_SECONDARY}px`,
                fontWeight: FONT_WEIGHT_SECONDARY,
                color: COLORS.secondary,
                letterSpacing: "2.5px",
                lineHeight: 1.2,
                textShadow: `
                  0 0 15px ${COLORS.glowCyan},
                  0 2px 8px rgba(0, 0, 0, 0.9)
                `,
              }}
            >
              {renderGlitchText(
                SECONDARY_TEXT,
                true,
                secondaryTextReveal
              )}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
