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

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="SubscribeButton"
        component={SubscribeButtonAnimation}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="TextAnimation1"
        component={TextAnimation1}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="TextAnimation2"
        component={TextAnimation2}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="TextAnimation3"
        component={TextAnimation3}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="TextAnimation4"
        component={TextAnimation4}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="TextAnimation5"
        component={TextAnimation5}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="LowerThird1"
        component={LowerThird1}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="LowerThird2"
        component={LowerThird2}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="LowerThird3"
        component={LowerThird3}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="LowerThird4"
        component={LowerThird4}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
