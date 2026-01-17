import { Composition } from "remotion";
import { SubscribeButtonAnimation } from "./animations/subscribe-button/SubscribeButtonAnimation";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="SubscribeButton"
        component={SubscribeButtonAnimation}
        durationInFrames={120}
        fps={30}
        width={520}
        height={235}
        defaultProps={{}}
      />
    </>
  );
};
