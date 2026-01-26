import { Composition } from "remotion";
import { SubscribeButtonAnimation } from "./animations/subscribe-button/SubscribeButtonAnimation";
import { TextAnimation1 } from "./animations/text-animation-1/TextAnimation1";
import { TextAnimation2 } from "./animations/text-animation-2/TextAnimation2";
import { TextAnimation3 } from "./animations/text-animation-3/TextAnimation3";
import { TextAnimation4 } from "./animations/text-animation-4/TextAnimation4";
import { TextAnimation5 } from "./animations/text-animation-5/TextAnimation5";
import { LowerThird1 } from "./animations/lower-third-1/LowerThird1";
import { LowerThird2 } from "./animations/lower-third-2/LowerThird2";
import { LowerThird3 } from "./animations/lower-third-3/LowerThird3";
import { LowerThird4 } from "./animations/lower-third-4/LowerThird4";
import { LowerThird5 } from "./animations/lower-third-5/LowerThird5";
import { LowerThird6 } from "./animations/lower-third-6/LowerThird6";
import { LowerThird7 } from "./animations/lower-third-7/LowerThird7";

export const Root: React.FC = () => {
  return (
    <>
      {/*
        SubscribeButton - Interactive subscribe button animation with cursor interaction
        - Cursor moves from bottom to button center and changes to hand pointer
        - Button changes color from red to gray on click
        - Bell icon shakes after click
        - Colorful star particles burst out in all directions with fade effect
        Duration: 4 seconds (120 frames at 30fps)
      */}
      <Composition
        id="SubscribeButton"
        component={SubscribeButtonAnimation}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />

      {/*
        TextAnimation1 - Bouncy entrance text animation with rotation
        - Text flies in from top with rotation and scale transformation
        - Letter-by-letter staggered reveal with bounce effect
        - Main text and subtitle with golden accent color
        - Subtle floating motion during hold phase
        - Exits downward with rotation and fade
        Duration: 6 seconds (180 frames at 30fps)
      */}
      <Composition
        id="TextAnimation1"
        component={TextAnimation1}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />

      {/*
        TextAnimation2 - Wave reveal with pulsing glow effect
        - Typewriter-style entrance with wave distortion
        - Letter-by-letter reveal sliding from left with staggered timing
        - Cyan and pink neon colors with intense glow
        - Animated gradient separator line between texts
        - Pulsing glow effect during hold phase
        - Exits with dispersion (letters scatter left/right) and blur
        Duration: 6 seconds (180 frames at 30fps)
      */}
      <Composition
        id="TextAnimation2"
        component={TextAnimation2}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />

      {/*
        TextAnimation3 - Particle assembly with shimmer effect
        - Letters assemble from scattered particles using spring physics
        - Each character rotates and scales in from random positions
        - Shimmer effect cycles through pink, purple, and cyan colors
        - Particles disperse and fall on exit with rotation
        Duration: 6 seconds (180 frames at 30fps)
      */}
      <Composition
        id="TextAnimation3"
        component={TextAnimation3}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />

      {/*
        TextAnimation4 - Colorful flying rectangles with text cut-out
        - Each word appears in a separate colored rectangle (purple, pink, orange, green)
        - Rectangles fly in from random directions with rotation
        - Text is cut out from rectangles creating a stencil effect
        - Subtle wave motion during hold phase
        - Rectangles scatter in different directions on exit
        Duration: 6 seconds (180 frames at 30fps)
      */}
      <Composition
        id="TextAnimation4"
        component={TextAnimation4}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />

      {/*
        TextAnimation5 - Accordion-style 3D unfold with perspective
        - Words in colored rectangles (orange, blue, green, gold) with text cut-out effect
        - Accordion-style unfold from center with 3D perspective and rotation
        - Alternating unfold directions (left/right) with side slides
        - Subtle 3D wobble and floating motion during hold
        - Collapses back to center on exit with perspective
        Duration: 6 seconds (180 frames at 30fps)
      */}
      <Composition
        id="TextAnimation5"
        component={TextAnimation5}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />

      {/*
        LowerThird1 - Clean lower third with cyan accent line
        - Name and title displayed in lower left corner
        - Slides in from left with fade
        - Character-by-character staggered reveal for name
        - Cyan gradient underline with shimmer effect
        - Semi-transparent dark background for readability
        - Pulsing glow effect on accent elements
        Duration: 6 seconds (180 frames at 30fps)
      */}
      <Composition
        id="LowerThird1"
        component={LowerThird1}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />

      {/*
        LowerThird2 - Modern lower third with vertical accent bar
        - Purple/pink gradient theme with glass morphism style
        - Slides up from bottom with scale animation
        - Vertical gradient accent bar slides in from left with glow
        - Text reveals with staggered timing
        - Breathing scale animation and glow pulse during hold
        - Decorative corner element
        - Exits downward with back ease
        Duration: 6 seconds (180 frames at 30fps)
      */}
      <Composition
        id="LowerThird2"
        component={LowerThird2}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />

      {/*
        LowerThird3 - Geometric orange-themed lower third with skew
        - Orange/gold gradient theme with geometric accents
        - Skewed background with diagonal accent bars
        - Text reveals with horizontal clip mask effect
        - Rotating diamond accent and pulsing decorative dots
        - Subtle skew pulse and glow effects during hold
        - Multiple diagonal lines create dynamic composition
        Duration: 6 seconds (180 frames at 30fps)
      */}
      <Composition
        id="LowerThird3"
        component={LowerThird3}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />

      {/*
        LowerThird4 - Cyberpunk neon lower third with glitch effect
        - Cyan and magenta neon cyberpunk theme
        - Split reveal effect (left and right parts converge)
        - Glitch effect during entrance with RGB offset
        - Rotating hexagonal accent shapes
        - Animated scan lines and moving scan beam during hold
        - Corner accent borders and particle burst on exit
        Duration: 6 seconds (180 frames at 30fps)
      */}
      <Composition
        id="LowerThird4"
        component={LowerThird4}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />

      {/*
        LowerThird5 - Glass morphism lower third with blue-teal theme
        - Modern glass morphism design with blur and transparency
        - Slides in from right with blur-to-focus effect
        - Blue-teal gradient theme with purple accents
        - Animated decorative circle with rotating dashed ring
        - Gentle floating and swaying motion during hold
        - Gradient accent lines with glow pulse
        - Particle dissolve effect on exit
        Duration: 6 seconds (180 frames at 30fps)
      */}
      <Composition
        id="LowerThird5"
        component={LowerThird5}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />

      {/*
        LowerThird6 - Minimalist split-line lower third with emerald theme
        - Clean minimalist design with emerald-mint gradient accents
        - Horizontal divider line expands from center outward
        - Text reveals by sliding up through overflow mask
        - Left vertical accent bracket with gradient
        - Right decorative pulsing dots
        - Subtle breathing scale and shimmer effects during hold
        - Center accent dot on divider line
        - Text slides down and line retracts on exit
        Duration: 6 seconds (180 frames at 30fps)
      */}
      <Composition
        id="LowerThird6"
        component={LowerThird6}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />

      {/*
        LowerThird7 - Flat paper-fold lower third with coral/sunset theme
        - Modern flat design with warm coral, orange, and yellow colors
        - Paper fold-in effect with 3D perspective during entrance
        - Two-card layout (name and title) with staggered reveal
        - Decorative circle accent and vertical bar
        - Gentle shadow pulse and horizontal shift during hold
        - Small pulsing dots decoration at the top
        - Paper fold-back and slide-away exit animation
        Duration: 6 seconds (180 frames at 30fps)
      */}
      <Composition
        id="LowerThird7"
        component={LowerThird7}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
