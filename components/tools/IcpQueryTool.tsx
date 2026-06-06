"use client";

import { useMemo, useState } from "react";

function normalizeDomain(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  try {
    const url = trimmed.startsWith("http://") || trimmed.startsWith("https://") ? new URL(trimmed) : new URL(`https://${trimmed}`);
    return url.hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return trimmed
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .split("/")[0]
      .trim()
      .toLowerCase();
  }
}

export function IcpQueryTool() {
  const [domain, setDomain] = useState("toolmomo.com");
  const normalizedDomain = useMemo(() => normalizeDomain(domain), [domain]);
  const hasDomain = normalizedDomain.length > 0;

  const queryLinks = [
    {
      title: "工信部 ICP/IP 地址/域名信息备案管理系统",
      href: "https://beian.miit.gov.cn/",
      description: "中国大陆网站备案官方查询入口。",
    },
    {
      title: "全国互联网安全管理服务平台",
      href: "https://www.beian.gov.cn/",
      description: "公安联网备案信息查询和办理入口。",
    },
    {
      title: "站长工具备案查询",
      href: `https://icp.chinaz.com/${encodeURIComponent(normalizedDomain || "example.com")}`,
      description: "第三方备案信息查询入口，结果以官方平台为准。",
    },
  ];

  const handleSample = () => {
    setDomain("https://www.toolmomo.com/tools/json-format");
  };

  const handleClear = () => {
    setDomain("");
  };

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">规范域名</div>
          <div className="mt-2 break-all text-2xl font-bold text-primary-700">{normalizedDomain || "-"}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">查询入口</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{queryLinks.length}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">查询类型</div>
          <div className="mt-2 text-2xl font-bold text-accent-600">ICP/公安</div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-slate-800" htmlFor="domain-input">
            输入域名或网址
            <input
              className="mt-2 w-full rounded-md border border-slate-200 px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              id="domain-input"
              onChange={(event) => setDomain(event.target.value)}
              placeholder="例如：toolmomo.com 或 https://www.toolmomo.com/"
              value={domain}
            />
          </label>

          <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
            <h2 className="text-base font-bold text-slate-950">查询前确认</h2>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
              <li>优先使用主域名查询，例如 `toolmomo.com`。</li>
              <li>备案信息可能有同步延迟，官方平台结果更准确。</li>
              <li>如果服务器在中国大陆，通常需要完成 ICP 备案。</li>
              <li>部分业务还需要公安联网备案，请按当地要求办理。</li>
            </ul>
          </div>
        </div>

        <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-base font-bold text-slate-950">快捷操作</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              className="rounded-md bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600"
              onClick={handleSample}
              type="button"
            >
              填入示例
            </button>
            <button
              className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:border-accent-200 hover:bg-accent-50 hover:text-accent-700"
              onClick={handleClear}
              type="button"
            >
              清空
            </button>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-500">
            由于备案查询通常需要验证码或官方接口权限，本工具提供规范域名和可靠查询入口，不在本地伪造备案结果。
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-md border border-slate-200 bg-slate-50 p-4">
        <h2 className="text-base font-bold text-slate-950">查询入口</h2>
        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
          {queryLinks.map((link) => (
            <a
              className={hasDomain ? "rounded-md bg-white p-4 hover:bg-accent-50" : "pointer-events-none rounded-md bg-white p-4 opacity-60"}
              href={link.href}
              key={link.title}
              rel="noreferrer"
              target="_blank"
            >
              <div className="text-sm font-bold leading-6 text-slate-950">{link.title}</div>
              <p className="mt-2 text-xs leading-5 text-slate-500">{link.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
