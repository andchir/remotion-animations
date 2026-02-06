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
import { LowerThird8 } from "./animations/lower-third-8/LowerThird8";
import { LowerThird9 } from "./animations/lower-third-9/LowerThird9";
import { LowerThird10 } from "./animations/lower-third-10/LowerThird10";
import { LowerThird11 } from "./animations/lower-third-11/LowerThird11";
import { LowerThird12 } from "./animations/lower-third-12/LowerThird12";
import { LowerThird13 } from "./animations/lower-third-13/LowerThird13";
import { LowerThird14 } from "./animations/lower-third-14/LowerThird14";

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

      {/*
        LowerThird8 - Sliding tiles lower third with ribbon accent and purple/magenta theme
        - Modern flat design with vibrant purple and magenta colors
        - Primary and secondary tiles slide in from left with staggered timing
        - Decorative gradient ribbon slides across the bottom
        - Decorative dots on left side with pulse animation
        - Subtle gradient shift and elevation pulse during hold
        - Ribbon shimmer effect during hold phase
        - Corner diamond accent element
        - Tiles slide out to right with fade on exit
        Duration: 6 seconds (180 frames at 30fps)
      */}
      <Composition
        id="LowerThird8"
        component={LowerThird8}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />

      {/*
        LowerThird9 - Industrial steel lower third with electric blue accents
        - Modern flat design with steel gray blocks and sharp corners (no rounded edges)
        - Vertical electric blue accent line drops in from top on entrance
        - Primary and secondary blocks slide in from left with staggered timing
        - Metallic sheen sweep effect across blocks during hold
        - Small indicator blocks on the right with pulse animation
        - Bottom and top accent lines with gradient fade
        - Electric blue glow pulse on accent elements during hold
        - Blocks slide out to right sequentially on exit
        Duration: 6 seconds (180 frames at 30fps)
      */}
      <Composition
        id="LowerThird9"
        component={LowerThird9}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />

      {/*
        LowerThird10 - Segmented reveal lower third with electric blue theme
        - Modern flat design with sharp corners and geometric segments (no rounded edges)
        - Three horizontal strips slide in from different directions with staggered timing
        - Vertical electric blue accent bar drops in from top with gradient
        - Text reveals through sliding panels with gradient overlay effect
        - Horizontal and vertical accent lines with pulse animations during hold
        - Corner accent squares with dynamic glow effects
        - Moving gradient overlay sweeps across the composition during hold phase
        - Strips disassemble and slide away in reverse order on exit
        Duration: 6 seconds (180 frames at 30fps)
      */}
      <Composition
        id="LowerThird10"
        component={LowerThird10}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />

      {/*
        LowerThird11 - Sliding bracket lower third with deep crimson corporate theme
        - Modern flat design with sharp corners and geometric L-shaped brackets (no rounded edges)
        - Two L-brackets slide in from opposite corners (top-left and bottom-right) and lock into place
        - Horizontal divider line extends from left between primary and secondary text
        - Text reveals by sliding up through overflow mask with staggered timing
        - Small accent marker squares with blinking pulse animation during hold
        - Scan line effect sweeps vertically through the bracket area during hold phase
        - Bracket glow and divider pulse effects during hold
        - Subtle dark background fill between brackets
        - Brackets unlock and slide away to opposite corners on exit
        Duration: 6 seconds (180 frames at 30fps)
      */}
      <Composition
        id="LowerThird11"
        component={LowerThird11}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />

      {/*
        LowerThird12 - Terminal typewriter lower third with green-on-dark theme
        - Modern flat design with terminal/code-inspired aesthetic (no rounded edges)
        - Vertical pipeline bar slides down on entrance with green gradient glow
        - Primary and secondary text appear with typewriter character-by-character effect
        - Prompt symbol ">" precedes each text line for terminal feel
        - Blinking cursor follows text during typing and hold phases
        - Horizontal scan lines extend from pipeline with data stream dot effects during hold
        - Small accent tick marks along pipeline bar with staggered pulse animation
        - Pipeline glow and text glow pulse effects during hold phase
        - Text erases in reverse on exit, pipeline retracts upward
        Duration: 6 seconds (180 frames at 30fps)
      */}
      <Composition
        id="LowerThird12"
        component={LowerThird12}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />

      {/*
        LowerThird13 - Diamond accent lower third with golden amber theme
        - Modern flat design with geometric diamond motifs (no rounded edges)
        - Main diamond accent scales in from center with back-ease spring effect
        - Horizontal gold lines extend from diamond to frame text area
        - Text reveals with horizontal clip mask animation from left to right
        - End diamond appears at top line terminus with pulse animation
        - Thin vertical connector line links top and bottom lines
        - Gold shimmer sweep effect glides across text area during hold
        - Diamond rotates subtly and glows during hold phase
        - Small decorative diamonds along bottom line with staggered pulse
        - Lines retract, text clips closed, diamonds shrink on exit
        Duration: 6 seconds (180 frames at 30fps)
      */}
      <Composition
        id="LowerThird13"
        component={LowerThird13}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />

      {/*
        LowerThird14 - Stacked bars lower third with teal/mint theme
        - Modern flat design with alternating horizontal bars (no rounded edges)
        - Four bars slide in from alternating directions (left/right) with staggered timing
        - Left vertical accent bar drops down with teal gradient glow
        - Text reveals by sliding up through overflow mask between stacked bars
        - Corner accent squares at top-left and bottom-right with pulse animation
        - Small tick marks along vertical accent bar with staggered glow
        - Bars glow and shimmer sweep effect during hold phase
        - Bars retract in alternating directions on exit
        Duration: 6 seconds (180 frames at 30fps)
      */}
      <Composition
        id="LowerThird14"
        component={LowerThird14}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
