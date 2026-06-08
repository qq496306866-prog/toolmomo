"use client";

import { useMemo, useState } from "react";

const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_=+[]{};:,.?";

function randomIndex(max: number) {
  const values = new Uint32Array(1);
  crypto.getRandomValues(values);
  return values[0] % max;
}

function pick(text: string) {
  return text[randomIndex(text.length)];
}

function shuffle(text: string[]) {
  const next = [...text];

  for (let index = next.length - 1; index > 0; index -= 1) {
    const targetIndex = randomIndex(index + 1);
    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
  }

  return next.join("");
}

function getStrength(length: number, poolCount: number) {
  const score = length + poolCount * 4;

  if (score >= 32) {
    return { label: "强", className: "text-emerald-700 bg-emerald-50" };
  }

  if (score >= 22) {
    return { label: "中", className: "text-amber-700 bg-amber-50" };
  }

  return { label: "基础", className: "text-slate-600 bg-slate-100" };
}

export function PasswordGeneratorTool() {
  const [length, setLength] = useState(16);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [passwords, setPasswords] = useState<string[]>([]);
  const [copyText, setCopyText] = useState("复制第一条");

  const pools = useMemo(() => {
    return [
      useLowercase ? lowercase : "",
      useUppercase ? uppercase : "",
      useNumbers ? numbers : "",
      useSymbols ? symbols : "",
    ].filter(Boolean);
  }, [useLowercase, useNumbers, useSymbols, useUppercase]);

  const strength = getStrength(length, pools.length);

  const generatePassword = () => {
    const safeLength = Math.max(length, pools.length);
    const requiredChars = pools.map((pool) => pick(pool));
    const allChars = pools.join("");
    const rest = Array.from({ length: safeLength - requiredChars.length }, () => pick(allChars));

    return shuffle([...requiredChars, ...rest]);
  };

  const generate = () => {
    if (!pools.length) {
      setUseNumbers(true);
      setPasswords(Array.from({ length: 6 }, () => {
        return shuffle(Array.from({ length }, () => pick(numbers)));
      }));
      return;
    }

    setPasswords(Array.from({ length: 6 }, generatePassword));
    setCopyText("复制第一条");
  };

  const copyFirst = async () => {
    if (!passwords[0]) {
      return;
    }

    try {
      await navigator.clipboard.writeText(passwords[0]);
      setCopyText("已复制");
      window.setTimeout(() => setCopyText("复制第一条"), 1600);
    } catch {
      setCopyText("复制失败");
      window.setTimeout(() => setCopyText("复制第一条"), 1600);
    }
  };

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-base font-bold text-slate-950">生成设置</h2>

          <label className="mt-4 block text-sm font-semibold text-slate-700" htmlFor="password-length">
            长度：{length}
          </label>
          <input
            className="mt-2 w-full accent-accent-500"
            id="password-length"
            max="64"
            min="6"
            onChange={(event) => setLength(Number(event.target.value))}
            type="range"
            value={length}
          />

          <div className="mt-4 space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <input
                checked={useLowercase}
                className="h-4 w-4 accent-accent-500"
                onChange={(event) => setUseLowercase(event.target.checked)}
                type="checkbox"
              />
              小写字母
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <input
                checked={useUppercase}
                className="h-4 w-4 accent-accent-500"
                onChange={(event) => setUseUppercase(event.target.checked)}
                type="checkbox"
              />
              大写字母
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <input
                checked={useNumbers}
                className="h-4 w-4 accent-accent-500"
                onChange={(event) => setUseNumbers(event.target.checked)}
                type="checkbox"
              />
              数字
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <input
                checked={useSymbols}
                className="h-4 w-4 accent-accent-500"
                onChange={(event) => setUseSymbols(event.target.checked)}
                type="checkbox"
              />
              符号
            </label>
          </div>

          <div className="mt-5 flex items-center justify-between rounded-md bg-white p-3">
            <span className="text-sm font-semibold text-slate-600">强度参考</span>
            <span className={`rounded-md px-3 py-1 text-sm font-bold ${strength.className}`}>{strength.label}</span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              className="rounded-md bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600"
              onClick={generate}
              type="button"
            >
              生成密码
            </button>
            <button
              className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:border-accent-200 hover:bg-accent-50 hover:text-accent-700"
              onClick={copyFirst}
              type="button"
            >
              {copyText}
            </button>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-1 gap-3">
            {(passwords.length ? passwords : Array.from({ length: 6 }, (_, index) => (index === 0 ? "点击生成密码" : "等待生成"))).map(
              (password, index) => (
                <div className="rounded-md border border-slate-200 bg-slate-50 p-4" key={`${password}-${index}`}>
                  <div className="text-xs font-semibold text-slate-500">方案 {index + 1}</div>
                  <div className="mt-2 break-all font-mono text-lg font-bold text-primary-700">{password}</div>
                </div>
              ),
            )}
          </div>
          <div className="mt-4 rounded-md border border-primary-100 bg-primary-50 p-4 text-sm leading-6 text-primary-800">
            密码在浏览器本地使用加密随机数生成，不会发送到服务器。建议为不同网站使用不同密码，并配合密码管理器保存。
          </div>
        </div>
      </div>
    </section>
  );
}
