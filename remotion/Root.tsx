import { Composition } from "remotion";
import { BasicToolmomoVideo } from "./BasicToolmomoVideo";

export function RemotionRoot() {
  return (
    <>
      <Composition
        component={BasicToolmomoVideo}
        defaultProps={{
          title: "免费中文在线工具箱",
          subtitle: "Toolmomo 提供图片处理、文本整理、电商运营和开发者常用工具。",
          category: "TOOLMOMO VIDEO",
        }}
        durationInFrames={150}
        fps={30}
        height={1080}
        id="basic-toolmomo-video"
        width={1920}
      />
    </>
  );
}
