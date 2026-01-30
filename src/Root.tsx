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
    </>
  );
};
