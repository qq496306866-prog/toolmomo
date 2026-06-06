import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type ToolmomoDemoProps = {
  title?: string;
  subtitle?: string;
};

export function ToolmomoDemo({
  title = "TOOLMOMO",
  subtitle = "免费中文在线工具箱",
}: ToolmomoDemoProps) {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const intro = spring({
    frame,
    fps,
    config: {
      damping: 18,
      stiffness: 110,
    },
  });

  const progress = interpolate(frame, [0, durationInFrames - 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cardY = interpolate(frame, [0, 24], [46, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        background: "linear-gradient(135deg, #f8fafc 0%, #eaf2ff 52%, #ffffff 100%)",
        color: "#061a33",
        display: "flex",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", sans-serif',
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: "rgba(255, 94, 0, 0.14)",
          borderRadius: 999,
          height: 360,
          position: "absolute",
          right: -110,
          top: -120,
          width: 360,
        }}
      />
      <div
        style={{
          background: "rgba(6, 26, 51, 0.1)",
          borderRadius: 999,
          bottom: -140,
          height: 420,
          left: -160,
          position: "absolute",
          width: 420,
        }}
      />

      <div
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          border: "1px solid rgba(8, 36, 70, 0.12)",
          borderRadius: 32,
          boxShadow: "0 28px 80px rgba(8, 36, 70, 0.16)",
          padding: 56,
          transform: `translateY(${cardY}px) scale(${0.94 + intro * 0.06})`,
          width: 760,
        }}
      >
        <div style={{ alignItems: "center", display: "flex", gap: 20 }}>
          <div
            style={{
              alignItems: "center",
              background: "#061a33",
              borderRadius: 20,
              color: "#fff",
              display: "flex",
              fontSize: 46,
              fontWeight: 900,
              height: 88,
              justifyContent: "center",
              width: 88,
            }}
          >
            M
          </div>
          <div>
            <div style={{ fontSize: 42, fontWeight: 900, letterSpacing: 0 }}>
              TOOL<span style={{ color: "#ff5e00" }}>MOMO</span>
            </div>
            <div style={{ color: "#496985", fontSize: 18, fontWeight: 800, marginTop: 4 }}>
              ONLINE TOOLS
            </div>
          </div>
        </div>

        <h1
          style={{
            fontSize: 76,
            fontWeight: 900,
            letterSpacing: 0,
            lineHeight: 1.05,
            margin: "74px 0 0",
          }}
        >
          {title}
        </h1>
        <p
          style={{
            color: "#31506f",
            fontSize: 34,
            fontWeight: 700,
            lineHeight: 1.45,
            margin: "24px 0 0",
          }}
        >
          {subtitle}
        </p>
        <div
          style={{
            background: "rgba(8, 36, 70, 0.12)",
            borderRadius: 999,
            height: 10,
            marginTop: 56,
            overflow: "hidden",
            width: "100%",
          }}
        >
          <div
            style={{
              background: "#ff5e00",
              borderRadius: 999,
              height: "100%",
              width: `${Math.round(progress * 100)}%`,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
}
