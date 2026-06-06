import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type ShortVideoSection = {
  title: string;
  content: string;
};

export type ShortVideoTemplateProps = {
  title?: string;
  subtitle?: string;
  category?: string;
  hook?: string;
  cta?: string;
  sections?: ShortVideoSection[];
};

const defaultSections: ShortVideoSection[] = [
  {
    title: "开场钩子",
    content: "3 秒讲清楚一个工具型短视频的核心卖点。",
  },
  {
    title: "痛点引入",
    content: "用户没有时间看复杂说明，所以画面必须直接展示结果。",
  },
  {
    title: "步骤拆解",
    content: "用三段式结构，把输入、处理和输出讲明白。",
  },
  {
    title: "结尾行动",
    content: "提示用户收藏、复用模板或继续生成下一条视频。",
  },
];

function BrandMark() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
      }}
    >
      <div
        style={{
          display: "grid",
          placeItems: "center",
          width: 72,
          height: 72,
          borderRadius: 18,
          background: "#061a33",
          color: "#fff",
          fontSize: 40,
          fontWeight: 900,
        }}
      >
        M
      </div>
      <div>
        <div style={{ fontSize: 34, fontWeight: 900 }}>
          TOOL<span style={{ color: "#ff5e00" }}>MOMO</span>
        </div>
        <div style={{ marginTop: 4, color: "#496985", fontSize: 16, fontWeight: 800 }}>
          ONLINE VIDEO TEMPLATE
        </div>
      </div>
    </div>
  );
}

function IntroScene({
  title,
  hook,
  subtitle,
}: {
  title: string;
  hook: string;
  subtitle: string;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame, fps, config: { damping: 18, stiffness: 90 } });

  return (
    <AbsoluteFill
      style={{
        padding: 76,
        justifyContent: "center",
        transform: `translateY(${(1 - progress) * 60}px)`,
        opacity: progress,
      }}
    >
      <BrandMark />
      <div style={{ marginTop: 128, color: "#ff5e00", fontSize: 30, fontWeight: 900 }}>
        {subtitle}
      </div>
      <h1
        style={{
          margin: "28px 0 0",
          color: "#061a33",
          fontSize: 92,
          lineHeight: 1.08,
          fontWeight: 900,
          letterSpacing: 0,
        }}
      >
        {title}
      </h1>
      <p
        style={{
          margin: "42px 0 0",
          color: "#31506f",
          fontSize: 42,
          lineHeight: 1.45,
          fontWeight: 700,
        }}
      >
        {hook}
      </p>
    </AbsoluteFill>
  );
}

function SectionScene({
  section,
  index,
  total,
  category,
}: {
  section: ShortVideoSection;
  index: number;
  total: number;
  category: string;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame, fps, config: { damping: 18, stiffness: 110 } });
  const barWidth = interpolate(frame, [8, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ padding: 76, justifyContent: "center" }}>
      <div style={{ color: "#ff5e00", fontSize: 26, fontWeight: 900 }}>{category}</div>
      <div
        style={{
          marginTop: 28,
          width: "100%",
          height: 10,
          borderRadius: 999,
          background: "rgba(8,36,70,0.12)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${Math.round(((index + barWidth) / total) * 100)}%`,
            height: "100%",
            borderRadius: 999,
            background: "#ff5e00",
          }}
        />
      </div>
      <div
        style={{
          marginTop: 110,
          border: "1px solid rgba(8,36,70,0.12)",
          borderRadius: 34,
          background: "rgba(255,255,255,0.92)",
          boxShadow: "0 28px 70px rgba(8,36,70,0.14)",
          padding: 58,
          transform: `scale(${0.94 + progress * 0.06})`,
          opacity: progress,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            borderRadius: 999,
            background: "#061a33",
            color: "#fff",
            padding: "14px 24px",
            fontSize: 24,
            fontWeight: 900,
          }}
        >
          镜头 {index + 1}
        </div>
        <h2
          style={{
            margin: "38px 0 0",
            color: "#061a33",
            fontSize: 72,
            lineHeight: 1.12,
            fontWeight: 900,
          }}
        >
          {section.title}
        </h2>
        <p
          style={{
            margin: "34px 0 0",
            color: "#31506f",
            fontSize: 40,
            lineHeight: 1.55,
            fontWeight: 700,
          }}
        >
          {section.content}
        </p>
      </div>
    </AbsoluteFill>
  );
}

function EndScene({ cta }: { cta: string }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame, fps, config: { damping: 16, stiffness: 95 } });

  return (
    <AbsoluteFill
      style={{
        padding: 76,
        justifyContent: "center",
        transform: `scale(${0.94 + progress * 0.06})`,
        opacity: progress,
      }}
    >
      <BrandMark />
      <h2
        style={{
          margin: "160px 0 0",
          color: "#061a33",
          fontSize: 84,
          lineHeight: 1.12,
          fontWeight: 900,
        }}
      >
        下一条视频
        <br />
        也可以这样生成
      </h2>
      <p
        style={{
          margin: "42px 0 0",
          color: "#31506f",
          fontSize: 40,
          lineHeight: 1.45,
          fontWeight: 700,
        }}
      >
        {cta}
      </p>
    </AbsoluteFill>
  );
}

export function ShortVideoTemplate({
  title = "保温咖啡杯",
  subtitle = "带货口播 · 60 秒",
  category = "带货口播",
  hook = "上班族注意，这个保温咖啡杯最值得看的地方是长效保温、不漏水、通勤方便。",
  cta = "收藏 Toolmomo，继续生成更多短视频模板",
  sections = defaultSections,
}: ShortVideoTemplateProps) {
  const usableSections = sections.length > 0 ? sections.slice(0, 5) : defaultSections;
  const sceneFrames = 150;
  const introFrames = 90;
  const endFrames = 120;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #f8fafc 0%, #eaf2ff 54%, #ffffff 100%)",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", sans-serif',
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: -220,
          top: -180,
          width: 520,
          height: 520,
          borderRadius: 999,
          background: "rgba(255, 94, 0, 0.14)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -240,
          bottom: -180,
          width: 560,
          height: 560,
          borderRadius: 999,
          background: "rgba(8, 36, 70, 0.1)",
        }}
      />

      <Sequence durationInFrames={introFrames} from={0}>
        <IntroScene hook={hook} subtitle={subtitle} title={title} />
      </Sequence>

      {usableSections.map((section, index) => (
        <Sequence durationInFrames={sceneFrames} from={introFrames + index * sceneFrames} key={section.title}>
          <SectionScene
            category={category}
            index={index}
            section={section}
            total={usableSections.length}
          />
        </Sequence>
      ))}

      <Sequence from={introFrames + usableSections.length * sceneFrames} durationInFrames={endFrames}>
        <EndScene cta={cta} />
      </Sequence>
    </AbsoluteFill>
  );
}
