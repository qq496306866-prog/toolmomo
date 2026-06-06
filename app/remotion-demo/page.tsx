import type { Metadata } from "next";
import { RemotionDemoPlayer } from "./RemotionDemoPlayer";

export const metadata: Metadata = {
  title: "Remotion 视频预览",
  description: "Toolmomo Remotion 示例视频预览页面。",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RemotionDemoPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-950">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <p className="text-sm font-semibold text-accent-600">Remotion Demo</p>
          <h1 className="mt-2 text-3xl font-bold tracking-normal">TOOLMOMO 示例视频</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            这是一个独立测试页面，用于预览 Remotion 视频组件，不影响现有工具页面和首页布局。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,640px)_1fr]">
          <RemotionDemoPlayer />

          <aside className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold">视频参数</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-500">Composition</dt>
                <dd className="font-semibold text-slate-900">toolmomo-demo</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-500">尺寸</dt>
                <dd className="font-semibold text-slate-900">1080 x 1080</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-500">帧率</dt>
                <dd className="font-semibold text-slate-900">30fps</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-500">时长</dt>
                <dd className="font-semibold text-slate-900">5 秒</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </main>
  );
}
