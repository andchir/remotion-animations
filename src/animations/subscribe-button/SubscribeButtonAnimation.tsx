import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  random,
} from "remotion";

// Animation timing configuration (in frames, at 30fps)
const TIMING = {
  CURSOR_START: 0,
  CURSOR_MOVE_END: 30, // Cursor reaches button
  CURSOR_CHANGE: 32, // Cursor changes to hand
  CLICK_FRAME: 45, // Click happens
  BUTTON_CHANGE: 45, // Button changes color
  STARS_START: 45, // Stars start appearing
  STARS_END: 90, // Stars fade out
  BELL_SHAKE_START: 50, // Bell starts shaking
  BELL_SHAKE_END: 90, // Bell stops shaking
};

// Star component for the particle effect
const Star: React.FC<{
  x: number;
  y: number;
  angle: number;
  delay: number;
  seed: string;
}> = ({ x, y, angle, delay, seed }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const starFrame = frame - TIMING.STARS_START - delay;
  if (starFrame < 0) return null;

  const progress = spring({
    fps,
    frame: starFrame,
    config: {
      damping: 100,
      stiffness: 200,
    },
  });

  const distance = progress * (80 + random(seed + "-dist") * 40);
  const starX = x + Math.cos(angle) * distance;
  const starY = y + Math.sin(angle) * distance;

  const opacity = interpolate(starFrame, [0, 5, 20, 35], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(starFrame, [0, 10, 30], [0.5, 1, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const rotation = random(seed + "-rot") * 360;
  const size = 8 + random(seed + "-size") * 6;

  // Generate random color for each star
  const colors = ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8", "#F7DC6F", "#BB8FCE"];
  const colorIndex = Math.floor(random(seed + "-color") * colors.length);
  const starColor = colors[colorIndex];

  return (
    <div
      style={{
        position: "absolute",
        left: starX,
        top: starY,
        transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`,
        opacity,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24">
        <path
          d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"
          fill={starColor}
        />
      </svg>
    </div>
  );
};

// Bell Icon SVG component
const BellIcon: React.FC<{ shaking: boolean }> = ({ shaking }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  let rotation = 0;
  if (shaking && frame >= TIMING.BELL_SHAKE_START && frame <= TIMING.BELL_SHAKE_END) {
    const shakeFrame = frame - TIMING.BELL_SHAKE_START;
    const shakeProgress = spring({
      fps,
      frame: shakeFrame,
      config: {
        damping: 12,
        stiffness: 200,
        mass: 0.8,
      },
    });
    // Smoother oscillation with more frames
    rotation = Math.sin(shakeFrame * 0.8) * (1 - shakeProgress) * 15;
  }

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={{
        transform: `rotate(${rotation}deg)`,
        transformOrigin: "center top",
      }}
    >
      <path
        d="M12 2C10.9 2 10 2.9 10 4V4.29C7.03 5.17 5 7.9 5 11V17L3 19V20H21V19L19 17V11C19 7.9 16.97 5.17 14 4.29V4C14 2.9 13.1 2 12 2ZM12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22Z"
        fill="white"
        fillOpacity="0.7"
      />
    </svg>
  );
};

// Arrow Cursor component
const ArrowCursor: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M4 2L4 20L8.5 15.5L12 22L15 21L11.5 14L18 14L4 2Z"
      fill="white"
      stroke="black"
      strokeWidth="1.5"
    />
  </svg>
);

// Hand/Pointer Cursor component
const HandCursor: React.FC = () => (
  <svg width="32" height="32" viewBox="0 0 256 256">
    <g>
      <path
        style={{
          opacity: 1,
          fill: "#ffffff",
          fillRule: "nonzero",
          stroke: "none",
          strokeWidth: 2.81,
        }}
        d="m 96.309405,1.406379 c -12.44549,0 -22.57032,10.124826 -22.57032,22.570312 V 138.16419 c -3.8216,-3.97896 -8.89923,-6.39696 -14.44336,-6.84375 -6.0134,-0.48332 -11.84705,1.39988 -16.4414,5.30859 -4.59154,3.9059 -7.38497,9.36637 -7.8711,15.37696 -0.48613,6.01059 1.39879,11.84986 5.30469,16.4414 l 49.4375,58.10547 c 1.01441,1.27293 2.06985,2.51509 3.04492,3.58008 l 0.2168,0.25195 c 0.13488,0.15736 0.2788,0.30872 0.42774,0.44922 13.878565,14.9211 33.482955,23.47266 53.855455,23.47266 40.54549,0 73.5323,-32.98771 73.5293,-73.5332 V 97.545051 c 0,-12.44549 -10.12482,-22.572266 -22.57031,-22.572266 -4.65055,0 -8.97985,1.390558 -12.58789,3.773438 -2.88587,-9.14374 -11.44702,-15.789063 -21.5293,-15.789063 -4.61964,0 -8.92592,1.396896 -12.50586,3.791016 -3.01232,-8.93018 -11.46509,-15.376953 -21.39844,-15.376953 -4.12789,0 -7.99741,1.112977 -11.33007,3.054687 V 23.976691 c 0,-12.445486 -10.12288,-22.570312 -22.568355,-22.570312 z"
      />
      <path
        style={{
          opacity: 1,
          fill: "#000000",
          fillRule: "nonzero",
          stroke: "none",
          strokeWidth: 2.81,
        }}
        d="m 147.27088,254.30659 c -20.3725,0 -39.97787,-8.55083 -53.856457,-23.47193 -0.14893,-0.1405 -0.29224,-0.29224 -0.42712,-0.4496 l -0.21637,-0.2529 c -0.97507,-1.06499 -2.03163,-2.30701 -3.04604,-3.57994 l -49.43633,-58.10518 c -3.9059,-4.59154 -5.79141,-10.43072 -5.30528,-16.44131 0.48613,-6.01059 3.27927,-11.47042 7.87081,-15.37632 4.59435,-3.90871 10.42791,-5.79141 16.44131,-5.30809 5.54413,0.44679 10.6218,2.86339 14.4434,6.84235 V 23.976513 c 0,-12.44549 10.12443,-22.5699196 22.56992,-22.5699196 12.445487,0 22.569917,10.1244296 22.569917,22.5699196 v 30.44916 c 3.33266,-1.94171 7.20203,-3.05447 11.32992,-3.05447 9.93335,0 18.38583,6.44614 21.39815,15.37632 3.57994,-2.39412 7.88486,-3.79069 12.5045,-3.79069 10.08228,0 18.64435,6.64565 21.53022,15.78939 3.60804,-2.38288 7.93825,-3.77383 12.5888,-3.77383 12.44549,0 22.56992,10.12724 22.56992,22.57273 v 83.229387 c 0.003,40.54549 -32.98378,73.53208 -73.52927,73.53208 z m -46.01094,-31.53944 c 0.0506,0.0534 0.10116,0.10397 0.15174,0.16017 11.76828,12.79955 28.48497,20.13927 45.8592,20.13927 34.34944,0 62.29208,-27.94264 62.29208,-62.29208 V 97.545123 c 0,-6.24944 -5.08329,-11.33273 -11.32992,-11.33273 -6.26349,0 -11.5491,5.20974 -11.5491,11.37488 v 1.02284 c 0,3.102237 -2.51776,5.619997 -5.62,5.619997 -3.10224,0 -5.62,-2.51776 -5.62,-5.619997 v -13.08336 c 0,-6.24663 -5.08329,-11.32992 -11.32992,-11.32992 -6.24663,0 -11.32992,5.08329 -11.32992,11.32992 0,3.10224 -2.51776,5.62 -5.62,5.62 -3.10224,0 -5.62,-2.51776 -5.62,-5.62 v -11.58844 c 0,-6.24663 -5.08329,-11.32992 -11.33273,-11.32992 -6.24663,0 -11.32992,5.08329 -11.32992,11.32992 0,3.10224 -2.51776,5.62 -5.62,5.62 -3.10224,0 -5.62,-2.51776 -5.62,-5.62 v -49.9618 c -0.003,-6.24663 -5.0861,-11.32992 -11.332727,-11.32992 -6.24663,0 -11.32992,5.08329 -11.32992,11.32992 V 153.37982 c 0,2.35478 -1.46963,4.46228 -3.6811,5.27437 -2.21428,0.81209 -4.69551,0.16298 -6.22134,-1.63261 l -8.96671,-10.54031 c -1.96138,-2.3042 -4.70113,-3.7092 -7.71907,-3.95086 -3.01794,-0.24166 -5.94596,0.70531 -8.25297,2.66388 -2.3042,1.95857 -3.70639,4.70113 -3.95086,7.71907 -0.24166,3.01513 0.7025,5.94596 2.66388,8.25297 l 49.55154,58.24006 c 0.97507,1.21954 1.871457,2.2761 2.801567,3.29613 z"
      />
      <path
        style={{
          opacity: 1,
          fill: "#000000",
          fillRule: "nonzero",
          stroke: "none",
          strokeWidth: 2.81,
        }}
        d="m 113.25864,130.53452 c -3.10224,0 -5.62,-2.51776 -5.62,-5.62 V 73.941123 c 0,-3.10224 2.51776,-5.62 5.62,-5.62 3.10224,0 5.62,2.51776 5.62,5.62 v 50.973397 c 0,3.10505 -2.51495,5.62 -5.62,5.62 z"
      />
      <path
        style={{
          opacity: 1,
          fill: "#000000",
          fillRule: "nonzero",
          stroke: "none",
          strokeWidth: 2.81,
        }}
        d="m 147.16129,130.53452 c -3.10224,0 -5.62,-2.51776 -5.62,-5.62 V 85.529563 c 0,-3.10224 2.51776,-5.62 5.62,-5.62 3.10224,0 5.62,2.51776 5.62,5.62 v 39.387767 c 0,3.10224 -2.51495,5.61719 -5.62,5.61719 z"
      />
      <path
        style={{
          opacity: 1,
          fill: "#000000",
          fillRule: "nonzero",
          stroke: "none",
          strokeWidth: 2.81,
        }}
        d="m 181.06394,130.53452 c -3.10224,0 -5.62,-2.51776 -5.62,-5.62 V 98.612923 c 0,-3.10224 2.51776,-5.62 5.62,-5.62 3.10224,0 5.62,2.51776 5.62,5.62 v 26.301597 c 0,3.10505 -2.51776,5.62 -5.62,5.62 z"
      />
    </g>
  </svg>
);

// Subscribe Button component
const SubscribeButton: React.FC<{ clicked: boolean }> = ({ clicked }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Button scale animation on click
  let scale = 1;
  if (clicked && frame >= TIMING.CLICK_FRAME) {
    const clickProgress = spring({
      fps,
      frame: frame - TIMING.CLICK_FRAME,
      config: {
        damping: 15,
        stiffness: 300,
      },
    });
    scale = interpolate(clickProgress, [0, 1], [0.95, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }

  const backgroundColor = clicked ? "#909090" : "#FF0000";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        backgroundColor,
        borderRadius: "4px",
        padding: "12px 24px",
        transform: `scale(${scale})`,
        transition: clicked ? "background-color 0.1s" : undefined,
      }}
    >
      <span
        style={{
          color: "white",
          fontSize: "24px",
          fontWeight: "bold",
          fontFamily: "Arial, sans-serif",
          letterSpacing: "0.5px",
        }}
      >
        SUBSCRIBE
      </span>
      <BellIcon shaking={clicked} />
    </div>
  );
};

// Main animation component
export const SubscribeButtonAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const buttonCenterX = width / 2;
  const buttonCenterY = height / 2;

  // Cursor position animation
  const cursorStartX = width / 2;
  const cursorStartY = height + 30;
  const cursorEndX = buttonCenterX + 20;
  const cursorEndY = buttonCenterY + 10;

  const moveProgress = spring({
    fps,
    frame,
    config: {
      damping: 50,
      stiffness: 100,
    },
    durationInFrames: TIMING.CURSOR_MOVE_END,
  });

  const cursorX = interpolate(
    Math.min(moveProgress, 1),
    [0, 1],
    [cursorStartX, cursorEndX],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const cursorY = interpolate(
    Math.min(moveProgress, 1),
    [0, 1],
    [cursorStartY, cursorEndY],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Determine cursor type and click state
  const isHovering = frame >= TIMING.CURSOR_CHANGE;
  const isClicked = frame >= TIMING.CLICK_FRAME;

  // Click animation (small downward movement)
  let clickOffsetY = 0;
  if (frame >= TIMING.CLICK_FRAME && frame < TIMING.CLICK_FRAME + 5) {
    clickOffsetY = interpolate(frame, [TIMING.CLICK_FRAME, TIMING.CLICK_FRAME + 2, TIMING.CLICK_FRAME + 5], [0, 3, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }

  // Generate stars for particle effect
  const stars = [];
  const numStars = 12;
  for (let i = 0; i < numStars; i++) {
    const angle = (i / numStars) * Math.PI * 2 + random(`star-angle-${i}`) * 0.5;
    const delay = Math.floor(random(`star-delay-${i}`) * 5);
    stars.push(
      <Star
        key={i}
        x={buttonCenterX}
        y={buttonCenterY}
        angle={angle}
        delay={delay}
        seed={`star-${i}`}
      />
    );
  }

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      {/* Subscribe Button */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SubscribeButton clicked={isClicked} />
      </AbsoluteFill>

      {/* Star particles */}
      {isClicked && stars}

      {/* Cursor */}
      <div
        style={{
          position: "absolute",
          left: cursorX,
          top: cursorY + clickOffsetY,
          transform: "translate(-2px, -2px)",
          zIndex: 100,
        }}
      >
        {isHovering ? <HandCursor /> : <ArrowCursor />}
      </div>
    </AbsoluteFill>
  );
};
