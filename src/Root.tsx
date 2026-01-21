import { Composition } from "remotion";
import { SubscribeButtonAnimation } from "./animations/subscribe-button/SubscribeButtonAnimation";
import { TextAnimation1 } from "./animations/text-animation-1/TextAnimation1";
import { TextAnimation2 } from "./animations/text-animation-2/TextAnimation2";

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
    </>
  );
};
