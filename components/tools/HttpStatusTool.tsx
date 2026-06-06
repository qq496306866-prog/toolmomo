"use client";

import { useMemo, useState } from "react";

const statusCodes = [
  { code: 100, title: "Continue", category: "信息响应", description: "客户端可以继续发送请求。通常用于大请求体上传前的确认。" },
  { code: 101, title: "Switching Protocols", category: "信息响应", description: "服务器同意切换协议，例如切换到 WebSocket。" },
  { code: 200, title: "OK", category: "成功", description: "请求成功，服务器已返回所需内容。" },
  { code: 201, title: "Created", category: "成功", description: "请求成功，并创建了新的资源。" },
  { code: 204, title: "No Content", category: "成功", description: "请求成功，但响应体为空，常见于删除或更新操作。" },
  { code: 301, title: "Moved Permanently", category: "重定向", description: "资源已永久移动到新地址，SEO 中常用于永久跳转。" },
  { code: 302, title: "Found", category: "重定向", description: "资源临时跳转到另一个地址。" },
  { code: 304, title: "Not Modified", category: "重定向", description: "资源未修改，浏览器可继续使用缓存。" },
  { code: 400, title: "Bad Request", category: "客户端错误", description: "请求格式错误，服务器无法理解。" },
  { code: 401, title: "Unauthorized", category: "客户端错误", description: "需要身份认证，或认证信息无效。" },
  { code: 403, title: "Forbidden", category: "客户端错误", description: "服务器理解请求，但拒绝访问该资源。" },
  { code: 404, title: "Not Found", category: "客户端错误", description: "请求资源不存在或路径错误。" },
  { code: 405, title: "Method Not Allowed", category: "客户端错误", description: "请求方法不被允许，例如接口只支持 POST 却发送了 GET。" },
  { code: 408, title: "Request Timeout", category: "客户端错误", description: "客户端请求超时。" },
  { code: 409, title: "Conflict", category: "客户端错误", description: "请求与服务器当前资源状态冲突。" },
  { code: 413, title: "Payload Too Large", category: "客户端错误", description: "请求体过大，超出服务器限制。" },
  { code: 429, title: "Too Many Requests", category: "客户端错误", description: "请求过于频繁，触发限流。" },
  { code: 500, title: "Internal Server Error", category: "服务器错误", description: "服务器内部错误，通常需要检查后端日志。" },
  { code: 502, title: "Bad Gateway", category: "服务器错误", description: "网关或代理从上游服务器收到无效响应。" },
  { code: 503, title: "Service Unavailable", category: "服务器错误", description: "服务暂时不可用，可能在维护、过载或启动中。" },
  { code: 504, title: "Gateway Timeout", category: "服务器错误", description: "网关等待上游服务器响应超时。" },
];

const categoryColors: Record<string, string> = {
  信息响应: "bg-sky-50 text-sky-700",
  成功: "bg-emerald-50 text-emerald-700",
  重定向: "bg-amber-50 text-amber-700",
  客户端错误: "bg-orange-50 text-orange-700",
  服务器错误: "bg-red-50 text-red-700",
};

export function HttpStatusTool() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("全部");

  const categories = ["全部", ...Array.from(new Set(statusCodes.map((item) => item.category)))];

  const filteredCodes = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    return statusCodes.filter((item) => {
      const matchesCategory = category === "全部" || item.category === category;
      const matchesQuery =
        !keyword ||
        String(item.code).includes(keyword) ||
        item.title.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword);

      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

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
          <div className="text-xs font-semibold text-slate-500">分类</div>
          <div className="mt-2 text-2xl font-bold text-accent-600">{categories.length - 1}</div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_220px]">
        <label className="text-sm font-semibold text-slate-800" htmlFor="status-query">
          搜索状态码
          <input
            className="mt-2 w-full rounded-md border border-slate-200 px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
            id="status-query"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="输入 404、redirect、服务器错误等"
            value={query}
          />
        </label>
        <label className="text-sm font-semibold text-slate-800" htmlFor="status-category">
          分类筛选
          <select
            className="mt-2 w-full rounded-md border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
            id="status-category"
            onChange={(event) => setCategory(event.target.value)}
            value={category}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
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
