"use client";

import { useMemo, useState } from "react";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function formatLocalDateInput(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function parseTimestamp(value: string) {
  const trimmed = value.trim();

  if (!/^-?\d+$/.test(trimmed)) {
    throw new Error("请输入纯数字时间戳。");
  }

  const numericValue = Number(trimmed);

  if (!Number.isFinite(numericValue)) {
    throw new Error("时间戳数值无效。");
  }

  const milliseconds = trimmed.length <= 10 ? numericValue * 1000 : numericValue;
  const date = new Date(milliseconds);

  if (Number.isNaN(date.getTime())) {
    throw new Error("无法解析该时间戳。");
  }

  return date;
}

export function TimestampTool() {
  const now = useMemo(() => new Date(), []);
  const [timestampInput, setTimestampInput] = useState(String(Math.floor(now.getTime() / 1000)));
  const [dateInput, setDateInput] = useState(formatLocalDateInput(now));
  const [timestampResult, setTimestampResult] = useState({
    local: now.toLocaleString(),
    iso: now.toISOString(),
    seconds: Math.floor(now.getTime() / 1000),
    milliseconds: now.getTime(),
  });
  const [dateResult, setDateResult] = useState({
    seconds: Math.floor(now.getTime() / 1000),
    milliseconds: now.getTime(),
  });
  const [error, setError] = useState("");

  const convertTimestamp = () => {
    try {
      const date = parseTimestamp(timestampInput);
      setTimestampResult({
        local: date.toLocaleString(),
        iso: date.toISOString(),
        seconds: Math.floor(date.getTime() / 1000),
        milliseconds: date.getTime(),
      });
      setError("");
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "时间戳转换失败。");
    }
  };

  const convertDate = () => {
    const date = new Date(dateInput);

    if (Number.isNaN(date.getTime())) {
      setError("请输入有效日期时间。");
      return;
    }

    setDateResult({
      seconds: Math.floor(date.getTime() / 1000),
      milliseconds: date.getTime(),
    });
    setError("");
  };

  const useCurrentTime = () => {
    const current = new Date();
    const seconds = Math.floor(current.getTime() / 1000);

    setTimestampInput(String(seconds));
    setDateInput(formatLocalDateInput(current));
    setTimestampResult({
      local: current.toLocaleString(),
      iso: current.toISOString(),
      seconds,
      milliseconds: current.getTime(),
    });
    setDateResult({
      seconds,
      milliseconds: current.getTime(),
    });
    setError("");
  };

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-md border border-slate-200 bg-white p-4">
          <h2 className="text-base font-bold text-slate-950">时间戳转日期</h2>
          <label className="mt-4 block text-sm font-semibold text-slate-800" htmlFor="timestamp-input">
            输入时间戳
          </label>
          <input
            className="mt-2 w-full rounded-md border border-slate-200 px-4 py-3 font-mono text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
            id="timestamp-input"
            onChange={(event) => setTimestampInput(event.target.value)}
            placeholder="支持秒或毫秒，例如 1717228800"
            value={timestampInput}
          />
          <button
            className="mt-3 rounded-md bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600"
            onClick={convertTimestamp}
            type="button"
          >
            转换为日期
          </button>
          <div className="mt-4 space-y-3 rounded-md bg-slate-50 p-4 text-sm">
            <div>
              <div className="font-semibold text-slate-500">本地时间</div>
              <div className="mt-1 break-all font-mono text-slate-950">{timestampResult.local}</div>
            </div>
            <div>
              <div className="font-semibold text-slate-500">ISO 时间</div>
              <div className="mt-1 break-all font-mono text-slate-950">{timestampResult.iso}</div>
            </div>
            <div>
              <div className="font-semibold text-slate-500">秒 / 毫秒</div>
              <div className="mt-1 break-all font-mono text-slate-950">
                {timestampResult.seconds} / {timestampResult.milliseconds}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-md border border-slate-200 bg-white p-4">
          <h2 className="text-base font-bold text-slate-950">日期转时间戳</h2>
          <label className="mt-4 block text-sm font-semibold text-slate-800" htmlFor="date-input">
            输入日期时间
          </label>
          <input
            className="mt-2 w-full rounded-md border border-slate-200 px-4 py-3 font-mono text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
            id="date-input"
            onChange={(event) => setDateInput(event.target.value)}
            type="datetime-local"
            value={dateInput}
          />
          <button
            className="mt-3 rounded-md bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-900"
            onClick={convertDate}
            type="button"
          >
            转换为时间戳
          </button>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="min-w-0 rounded-md bg-slate-50 p-4">
              <div className="text-xs font-semibold text-slate-500">秒级时间戳</div>
              <div className="mt-2 overflow-x-auto whitespace-nowrap font-mono text-xl font-bold text-primary-700">
                {dateResult.seconds}
              </div>
            </div>
            <div className="min-w-0 rounded-md bg-slate-50 p-4">
              <div className="text-xs font-semibold text-slate-500">毫秒级时间戳</div>
              <div className="mt-2 overflow-x-auto whitespace-nowrap font-mono text-xl font-bold text-primary-700">
                {dateResult.milliseconds}
              </div>
            </div>
          </div>
        </div>
      </div>

      {error ? (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
          {error}
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-accent-200 hover:bg-accent-50 hover:text-accent-700"
          onClick={useCurrentTime}
          type="button"
        >
          使用当前时间
        </button>
      </div>
    </section>
  );
}
