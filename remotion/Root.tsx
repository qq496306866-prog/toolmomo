import { Composition } from "remotion";
import { BasicToolmomoVideo } from "./BasicToolmomoVideo";
import { ShortVideoTemplate } from "./ShortVideoTemplate";
import { ToolmomoDemo } from "./ToolmomoDemo";

export function RemotionRoot() {
  return (
    <>
      <Composition
        component={ToolmomoDemo}
        defaultProps={{
          title: "TOOLMOMO",
          subtitle: "免费中文在线工具箱",
        }}
        durationInFrames={150}
        fps={30}
        height={1080}
        id="toolmomo-demo"
        width={1080}
      />

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

      <Composition
        component={ShortVideoTemplate}
        defaultProps={{
          title: "保温咖啡杯",
          subtitle: "带货口播 · 60 秒",
          category: "带货口播",
          hook: "上班族注意，这个保温咖啡杯最值得看的地方是长效保温、不漏水、通勤方便。",
          cta: "收藏 Toolmomo，继续生成更多短视频模板",
          sections: [
            {
              title: "开场钩子",
              content: "先用一句话说清楚产品最强卖点，让用户马上知道为什么要看下去。",
            },
            {
              title: "痛点引入",
              content: "通勤路上咖啡容易变凉、杯子容易漏水，这两个问题最影响体验。",
            },
            {
              title: "卖点展开",
              content: "长效保温、不漏水、单手可握，适合办公室、通勤和短途出行。",
            },
            {
              title: "结尾行动",
              content: "如果你也需要通勤咖啡杯，可以收藏这条内容，对比时直接参考。",
            },
          ],
        }}
        durationInFrames={810}
        fps={30}
        height={1920}
        id="short-video-template"
        width={1080}
      />
    </>
  );
}
