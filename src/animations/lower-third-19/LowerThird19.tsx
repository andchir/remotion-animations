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
  // Phase 1: Entrance - blob morph and reveal
  ENTRANCE_START: 0,
  ENTRANCE_DURATION: 50, // ~1.67 seconds

  // Phase 2: Hold - subtle blob pulse and float
  HOLD_START: 50,
  HOLD_DURATION: 100, // ~3.33 seconds

  // Phase 3: Exit - blob collapse and fade
  EXIT_START: 150,
  EXIT_DURATION: 30, // 1 second
};

// Text configuration
const PRIMARY_TEXT = "ALEX RIVERA";
const SECONDARY_TEXT = "Motion Designer";

// Visual configuration
const COLORS = {
  primary: "#FFFFFF",
  secondary: "#B8B8B8",
  blob1: "#FF006E", // Vibrant pink
  blob2: "#8338EC", // Purple
  blob3: "#3A86FF", // Blue
  accent: "#FFBE0B", // Gold accent
  background: "rgba(15, 15, 20, 0.9)",
};

const FONT_FAMILY = "Arial, Helvetica, sans-serif";
const FONT_WEIGHT_PRIMARY = "800";
const FONT_WEIGHT_SECONDARY = "500";
const FONT_SIZE_PRIMARY = 48;
const FONT_SIZE_SECONDARY = 24;

// Layout configuration
const LOWER_THIRD_LEFT_MARGIN = 100;
const LOWER_THIRD_BOTTOM_MARGIN = 140;

export const LowerThird19: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calculate phase progress
  const entranceProgress = interpolate(
    frame,
    [TIMING.ENTRANCE_START, TIMING.ENTRANCE_START + TIMING.ENTRANCE_DURATION],
    [0, 1],
    { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }
  );

  const holdProgress = interpolate(
    frame,
    [TIMING.HOLD_START, TIMING.HOLD_START + TIMING.HOLD_DURATION],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  const exitProgress = interpolate(
    frame,
    [TIMING.EXIT_START, TIMING.EXIT_START + TIMING.EXIT_DURATION],
    [0, 1],
    { extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) }
  );

  // Blob scale animations
  const blob1Scale = interpolate(
    entranceProgress,
    [0, 0.6, 1],
    [0, 1.1, 1],
    { extrapolateRight: "clamp" }
  );

  const blob2Scale = interpolate(
    entranceProgress,
    [0.2, 0.8, 1],
    [0, 1.15, 1],
    { extrapolateRight: "clamp" }
  );

  const blob3Scale = interpolate(
    entranceProgress,
    [0.4, 1],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  // Exit scales
  const exitBlobScale = interpolate(
    exitProgress,
    [0, 1],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  // Final scales
  const finalBlob1Scale = exitProgress > 0 ? exitBlobScale : blob1Scale;
  const finalBlob2Scale = exitProgress > 0 ? exitBlobScale : blob2Scale;
  const finalBlob3Scale = exitProgress > 0 ? exitBlobScale : blob3Scale;

  // Blob morphing - organic movement during hold
  const holdTime = frame - TIMING.HOLD_START;
  const blob1MorphX = Math.sin(holdTime / 20) * 15;
  const blob1MorphY = Math.cos(holdTime / 25) * 10;
  const blob2MorphX = Math.cos(holdTime / 18) * 12;
  const blob2MorphY = Math.sin(holdTime / 22) * 8;
  const blob3MorphX = Math.sin(holdTime / 15) * 10;
  const blob3MorphY = Math.cos(holdTime / 20) * 12;

  // Blob border-radius morphing for organic feel
  const blob1Radius = `${45 + Math.sin(holdTime / 30) * 10}% ${55 + Math.cos(holdTime / 25) * 10}% ${50 + Math.sin(holdTime / 20) * 8}% ${50 + Math.cos(holdTime / 35) * 8}%`;
  const blob2Radius = `${50 + Math.cos(holdTime / 28) * 12}% ${45 + Math.sin(holdTime / 22) * 8}% ${55 + Math.cos(holdTime / 18) * 10}% ${50 + Math.sin(holdTime / 32) * 6}%`;
  const blob3Radius = `${55 + Math.sin(holdTime / 25) * 8}% ${50 + Math.cos(holdTime / 20) * 10}% ${45 + Math.sin(holdTime / 30) * 12}% ${55 + Math.cos(holdTime / 26) * 8}%`;

  // Text animations
  const textOpacity = interpolate(
    frame,
    [TIMING.ENTRANCE_START + 25, TIMING.ENTRANCE_START + 45, TIMING.EXIT_START + 5, TIMING.EXIT_START + 20],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" }
  );

  const textSlideY = interpolate(
    entranceProgress,
    [0.3, 0.8],
    [30, 0],
    { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }
  );

  // Accent line animation
  const accentLineWidth = interpolate(
    entranceProgress,
    [0.4, 0.9],
    [0, 200],
    { extrapolateRight: "clamp" }
  );

  const exitLineWidth = interpolate(
    exitProgress,
    [0, 1],
    [200, 0],
    { extrapolateLeft: "clamp" }
  );

  const finalLineWidth = exitProgress > 0 ? exitLineWidth : accentLineWidth;

  // Background panel slide
  const panelSlideX = interpolate(
    entranceProgress,
    [0, 1],
    [-400, 0],
    { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }
  );

  const exitPanelSlideX = interpolate(
    exitProgress,
    [0, 1],
    [0, -400],
    { extrapolateLeft: "clamp" }
  );

  const finalPanelSlideX = exitProgress > 0 ? exitPanelSlideX : panelSlideX;

  // Particle effects
  const generateParticles = () => {
    const particles = [];
    const particleCount = 8;

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const baseDelay = TIMING.ENTRANCE_START + 30 + i * 3;
      
      const particleProgress = interpolate(
        frame,
        [baseDelay, baseDelay + 20],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      );

      const exitParticleOpacity = interpolate(
        frame,
        [TIMING.EXIT_START + i * 2, TIMING.EXIT_START + 15 + i * 2],
        [1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      );

      const distance = 60 + particleProgress * 40;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      const size = 4 + Math.sin(holdTime / 10 + i) * 2;

      particles.push(
        <div
          key={i}
          style={{
            position: "absolute",
            left: LOWER_THIRD_LEFT_MARGIN + 60,
            bottom: LOWER_THIRD_BOTTOM_MARGIN + 40,
            width: size,
            height: size,
            borderRadius: "50%",
            background: COLORS.accent,
            transform: `translate(${x}px, ${y}px) scale(${particleProgress})`,
            opacity: particleProgress * exitParticleOpacity * 0.8,
          }}
        />
      );
    }

    return particles;
  };

  // Character stagger animation
  const renderStaggeredText = (
    text: string,
    fontSize: number,
    fontWeight: string,
    color: string,
    baseDelay: number
  ) => {
    return text.split("").map((char, index) => {
      const charDelay = baseDelay + index * 1.2;

      const charProgress = interpolate(
        frame,
        [charDelay, charDelay + 12],
        [0, 1],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.quad),
        }
      );

      const charExitOpacity = interpolate(
        frame,
        [TIMING.EXIT_START + index * 0.5, TIMING.EXIT_START + 10 + index * 0.5],
        [1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      );

      const charTranslateY = interpolate(
        charProgress,
        [0, 1],
        [20, 0],
        { extrapolateRight: "clamp" }
      );

      return (
        <span
          key={index}
          style={{
            display: "inline-block",
            opacity: charProgress * charExitOpacity,
            transform: `translateY(${charTranslateY}px)`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      );
    });
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        overflow: "hidden",
      }}
    >
      {/* Background panel */}
      <div
        style={{
          position: "absolute",
          left: LOWER_THIRD_LEFT_MARGIN - 40,
          bottom: LOWER_THIRD_BOTTOM_MARGIN - 30,
          width: 500,
          height: 120,
          background: COLORS.background,
          borderRadius: "4px",
          transform: `translateX(${finalPanelSlideX}px)`,
          opacity: textOpacity,
        }}
      />

      {/* Blob 1 - Main pink blob */}
      <div
        style={{
          position: "absolute",
          left: LOWER_THIRD_LEFT_MARGIN - 20 + blob1MorphX,
          bottom: LOWER_THIRD_BOTTOM_MARGIN + blob1MorphY,
          width: 120,
          height: 100,
          background: `linear-gradient(135deg, ${COLORS.blob1} 0%, ${COLORS.blob2} 100%)`,
          borderRadius: blob1Radius,
          transform: `scale(${finalBlob1Scale})`,
          opacity: 0.85,
          filter: "blur(0.5px)",
          mixBlendMode: "screen",
        }}
      />

      {/* Blob 2 - Secondary purple blob */}
      <div
        style={{
          position: "absolute",
          left: LOWER_THIRD_LEFT_MARGIN + 30 + blob2MorphX,
          bottom: LOWER_THIRD_BOTTOM_MARGIN - 20 + blob2MorphY,
          width: 90,
          height: 80,
          background: `linear-gradient(225deg, ${COLORS.blob2} 0%, ${COLORS.blob3} 100%)`,
          borderRadius: blob2Radius,
          transform: `scale(${finalBlob2Scale})`,
          opacity: 0.75,
          filter: "blur(0.5px)",
          mixBlendMode: "screen",
        }}
      />

      {/* Blob 3 - Small blue blob */}
      <div
        style={{
          position: "absolute",
          left: LOWER_THIRD_LEFT_MARGIN + 80 + blob3MorphX,
          bottom: LOWER_THIRD_BOTTOM_MARGIN + 40 + blob3MorphY,
          width: 60,
          height: 50,
          background: COLORS.blob3,
          borderRadius: blob3Radius,
          transform: `scale(${finalBlob3Scale})`,
          opacity: 0.7,
          filter: "blur(0.5px)",
          mixBlendMode: "screen",
        }}
      />

      {/* Particles */}
      {generateParticles()}

      {/* Text container */}
      <div
        style={{
          position: "absolute",
          left: LOWER_THIRD_LEFT_MARGIN + 100,
          bottom: LOWER_THIRD_BOTTOM_MARGIN,
          transform: `translateY(${textSlideY}px)`,
          opacity: textOpacity,
        }}
      >
        {/* Primary text */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: `${FONT_SIZE_PRIMARY}px`,
            fontWeight: FONT_WEIGHT_PRIMARY,
            color: COLORS.primary,
            letterSpacing: "2px",
            lineHeight: 1.2,
            textTransform: "uppercase",
            textShadow: "0 2px 8px rgba(0, 0, 0, 0.6)",
          }}
        >
          {renderStaggeredText(
            PRIMARY_TEXT,
            FONT_SIZE_PRIMARY,
            FONT_WEIGHT_PRIMARY,
            COLORS.primary,
            TIMING.ENTRANCE_START + 20
          )}
        </div>

        {/* Accent line */}
        <div
          style={{
            marginTop: 10,
            height: 3,
            width: finalLineWidth,
            background: `linear-gradient(90deg, ${COLORS.accent} 0%, ${COLORS.blob1} 100%)`,
            borderRadius: "2px",
          }}
        />

        {/* Secondary text */}
        <div
          style={{
            marginTop: 10,
            fontFamily: FONT_FAMILY,
            fontSize: `${FONT_SIZE_SECONDARY}px`,
            fontWeight: FONT_WEIGHT_SECONDARY,
            color: COLORS.secondary,
            letterSpacing: "1.5px",
            lineHeight: 1.3,
            textTransform: "uppercase",
            textShadow: "0 1px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          {renderStaggeredText(
            SECONDARY_TEXT,
            FONT_SIZE_SECONDARY,
            FONT_WEIGHT_SECONDARY,
            COLORS.secondary,
            TIMING.ENTRANCE_START + 35
          )}
        </div>
      </div>

      {/* Decorative corner accent */}
      <div
        style={{
          position: "absolute",
          left: LOWER_THIRD_LEFT_MARGIN - 40,
          bottom: LOWER_THIRD_BOTTOM_MARGIN + 80,
          width: 30,
          height: 3,
          background: COLORS.accent,
          transform: `scaleX(${interpolate(
            entranceProgress,
            [0.5, 0.9],
            [0, 1],
            { extrapolateRight: "clamp" }
          )})`,
          transformOrigin: "left",
          opacity: interpolate(
            frame,
            [TIMING.EXIT_START, TIMING.EXIT_START + 15],
            [1, 0],
            { extrapolateRight: "clamp" }
          ),
        }}
      />
    </AbsoluteFill>
  );
};
