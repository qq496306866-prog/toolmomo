"use client";

import { useMemo, useState } from "react";

type StatusCode = {
  code: number;
  title: string;
  category: "信息响应" | "成功" | "重定向" | "客户端错误" | "服务器错误";
  description: string;
  scene: string;
};

const statusCodes: StatusCode[] = [
  { code: 100, title: "Continue", category: "信息响应", description: "客户端可以继续发送请求正文。", scene: "大文件上传前的请求确认。" },
  { code: 101, title: "Switching Protocols", category: "信息响应", description: "服务器同意切换协议。", scene: "HTTP 升级为 WebSocket。" },
  { code: 200, title: "OK", category: "成功", description: "请求成功，服务器返回所需内容。", scene: "网页访问、接口请求正常。" },
  { code: 201, title: "Created", category: "成功", description: "请求成功，并创建了新的资源。", scene: "新增用户、发布文章、创建订单。" },
  { code: 202, title: "Accepted", category: "成功", description: "请求已被接受，但尚未处理完成。", scene: "异步任务、队列处理。" },
  { code: 204, title: "No Content", category: "成功", description: "请求成功，但响应体为空。", scene: "删除、更新接口常见返回。" },
  { code: 301, title: "Moved Permanently", category: "重定向", description: "资源永久移动到新地址。", scene: "域名迁移、SEO 永久跳转。" },
  { code: 302, title: "Found", category: "重定向", description: "资源临时跳转到另一个地址。", scene: "登录后跳转、活动页跳转。" },
  { code: 304, title: "Not Modified", category: "重定向", description: "资源未修改，可继续使用缓存。", scene: "浏览器缓存命中。" },
  { code: 307, title: "Temporary Redirect", category: "重定向", description: "临时重定向，并保持原请求方法。", scene: "临时接口转发。" },
  { code: 308, title: "Permanent Redirect", category: "重定向", description: "永久重定向，并保持原请求方法。", scene: "接口或站点永久迁移。" },
  { code: 400, title: "Bad Request", category: "客户端错误", description: "请求格式错误，服务器无法理解。", scene: "参数格式错误、JSON 无效。" },
  { code: 401, title: "Unauthorized", category: "客户端错误", description: "需要身份认证，或认证信息无效。", scene: "未登录、Token 过期。" },
  { code: 403, title: "Forbidden", category: "客户端错误", description: "服务器理解请求，但拒绝访问资源。", scene: "权限不足、IP 被拦截。" },
  { code: 404, title: "Not Found", category: "客户端错误", description: "请求资源不存在或路径错误。", scene: "页面不存在、路由未配置。" },
  { code: 405, title: "Method Not Allowed", category: "客户端错误", description: "请求方法不被允许。", scene: "接口只支持 POST，却发送了 GET。" },
  { code: 408, title: "Request Timeout", category: "客户端错误", description: "客户端请求超时。", scene: "网络慢、请求未及时发送完成。" },
  { code: 409, title: "Conflict", category: "客户端错误", description: "请求与当前资源状态冲突。", scene: "重复提交、版本冲突。" },
  { code: 413, title: "Payload Too Large", category: "客户端错误", description: "请求体过大，超过服务器限制。", scene: "上传文件超过限制。" },
  { code: 415, title: "Unsupported Media Type", category: "客户端错误", description: "服务器不支持请求中的内容类型。", scene: "上传格式不被接口接受。" },
  { code: 422, title: "Unprocessable Content", category: "客户端错误", description: "请求格式正确，但语义校验失败。", scene: "表单字段不合法。" },
  { code: 429, title: "Too Many Requests", category: "客户端错误", description: "请求过于频繁，触发限流。", scene: "接口防刷、验证码触发。" },
  { code: 500, title: "Internal Server Error", category: "服务器错误", description: "服务器内部错误。", scene: "后端异常、代码报错。" },
  { code: 501, title: "Not Implemented", category: "服务器错误", description: "服务器不支持当前请求能力。", scene: "接口功能未实现。" },
  { code: 502, title: "Bad Gateway", category: "服务器错误", description: "网关或代理收到无效响应。", scene: "反向代理连接上游失败。" },
  { code: 503, title: "Service Unavailable", category: "服务器错误", description: "服务暂时不可用。", scene: "维护、过载、服务启动中。" },
  { code: 504, title: "Gateway Timeout", category: "服务器错误", description: "网关等待上游服务器响应超时。", scene: "后端接口慢、上游不可达。" },
];

const categories = ["全部", "信息响应", "成功", "重定向", "客户端错误", "服务器错误"] as const;

const categoryColors: Record<StatusCode["category"], string> = {
  信息响应: "bg-sky-50 text-sky-700",
  成功: "bg-emerald-50 text-emerald-700",
  重定向: "bg-amber-50 text-amber-700",
  客户端错误: "bg-orange-50 text-orange-700",
  服务器错误: "bg-red-50 text-red-700",
};

export function HttpStatusTool() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("全部");
  const [copyText, setCopyText] = useState("复制说明");

  const filteredCodes = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    return statusCodes.filter((item) => {
      const matchesCategory = category === "全部" || item.category === category;
      const matchesQuery =
        !keyword ||
        String(item.code).includes(keyword) ||
        item.title.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword) ||
        item.scene.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword);

      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const copyCode = async (item: StatusCode) => {
    try {
      await navigator.clipboard.writeText(`${item.code} ${item.title}：${item.description} 常见场景：${item.scene}`);
      setCopyText("已复制");
      window.setTimeout(() => setCopyText("复制说明"), 1600);
    } catch {
      setCopyText("复制失败");
      window.setTimeout(() => setCopyText("复制说明"), 1600);
    }
  };

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">状态码总数</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{statusCodes.length}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">当前结果</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{filteredCodes.length}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">分类数量</div>
          <div className="mt-2 text-2xl font-bold text-accent-600">{categories.length - 1}</div>
        </div>
      </div>

      <div className="mt-5">
        <label className="text-sm font-semibold text-slate-800" htmlFor="status-query">
          搜索状态码
        </label>
        <input
          className="mt-2 w-full rounded-md border border-slate-200 px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
          id="status-query"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="输入 404、redirect、限流、服务器错误、缓存等关键词"
          value={query}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((item) => (
          <button
            className={`rounded-md px-3 py-2 text-sm font-semibold ${
              category === item
                ? "bg-primary-700 text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:border-accent-200 hover:bg-accent-50 hover:text-accent-700"
            }`}
            key={item}
            onClick={() => setCategory(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
        {filteredCodes.map((item) => (
          <article className="rounded-md border border-slate-200 bg-slate-50 p-4" key={item.code}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-mono text-3xl font-bold text-primary-700">{item.code}</div>
                <h2 className="mt-1 text-base font-bold text-slate-950">{item.title}</h2>
              </div>
              <span className={`shrink-0 rounded-md px-2 py-1 text-xs font-semibold ${categoryColors[item.category]}`}>
                {item.category}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
            <div className="mt-3 rounded-md bg-white px-3 py-2 text-sm leading-6 text-slate-600">
              <span className="font-semibold text-slate-800">常见场景：</span>
              {item.scene}
            </div>
            <button
              className="mt-3 rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:border-accent-200 hover:bg-accent-50 hover:text-accent-700"
              onClick={() => copyCode(item)}
              type="button"
            >
              {copyText}
            </button>
          </article>
        ))}
      </div>

      {!filteredCodes.length ? (
        <div className="mt-5 rounded-md bg-slate-50 p-8 text-center text-sm text-slate-500">
          没有找到匹配的状态码，请换个关键词试试。
        </div>
      ) : null}
    </section>
  );
}
