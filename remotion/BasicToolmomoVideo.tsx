import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type BasicToolmomoVideoProps = {
  title?: string;
  subtitle?: string;
  category?: string;
};

export function BasicToolmomoVideo({
  title = "Toolmomo 在线工具箱",
  subtitle = "图片、文本、电商、短视频和开发工具，打开即用。",
  category = "ONLINE TOOLS",
}: BasicToolmomoVideoProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardProgress = spring({
    frame,
    fps,
    config: {
      damping: 18,
      stiffness: 110,
    },
  });

  const accentWidth = interpolate(frame, [10, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #eaf2ff 48%, #ffffff 100%)",
        color: "#061a33",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", sans-serif',
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: -180,
          top: -180,
          width: 520,
          height: 520,
          borderRadius: 999,
          background: "rgba(255, 94, 0, 0.12)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -160,
          bottom: -160,
          width: 460,
          height: 460,
          borderRadius: 999,
          background: "rgba(8, 36, 70, 0.1)",
        }}
      />

      <div
        style={{
          display: "flex",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          padding: 72,
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 1380,
            border: "1px solid rgba(8, 36, 70, 0.12)",
            borderRadius: 28,
            background: "rgba(255,255,255,0.88)",
            boxShadow: "0 34px 90px rgba(8, 36, 70, 0.14)",
            padding: 64,
            transform: `scale(${0.92 + cardProgress * 0.08})`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 22,
            }}
          >
            <div
              style={{
                display: "grid",
                placeItems: "center",
                width: 88,
                height: 88,
                borderRadius: 18,
                background: "#061a33",
                color: "#ffffff",
                fontSize: 46,
                fontWeight: 900,
              }}
            >
              M
            </div>
            <div>
              <div style={{ fontSize: 38, fontWeight: 900, letterSpacing: 0 }}>
                TOOL<span style={{ color: "#ff5e00" }}>MOMO</span>
              </div>
              <div style={{ marginTop: 6, fontSize: 18, fontWeight: 800, color: "#31506f" }}>
                {category}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 76 }}>
            <div
              style={{
                height: 8,
                width: `${Math.round(accentWidth * 240)}px`,
                borderRadius: 999,
                background: "#ff5e00",
              }}
            />
            <h1
              style={{
                margin: "28px 0 0",
                maxWidth: 1100,
                fontSize: 82,
                lineHeight: 1.08,
                fontWeight: 900,
                letterSpacing: 0,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                margin: "30px 0 0",
                maxWidth: 980,
                fontSize: 32,
                lineHeight: 1.55,
                color: "#31506f",
                fontWeight: 600,
              }}
            >
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}
