"use client";

import { Player } from "@remotion/player";
import { ToolmomoDemo } from "@/remotion/ToolmomoDemo";

export function RemotionDemoPlayer() {
  return (
    <div className="overflow-hidden rounded-md border border-slate-200 bg-white p-3 shadow-sm">
      <Player
        acknowledgeRemotionLicense
        component={ToolmomoDemo}
        compositionHeight={1080}
        compositionWidth={1080}
        controls
        durationInFrames={150}
        fps={30}
        inputProps={{
          title: "TOOLMOMO",
          subtitle: "Remotion 视频模板预览",
        }}
        style={{
          aspectRatio: "1 / 1",
          width: "100%",
        }}
      />
    </div>
  );
}
