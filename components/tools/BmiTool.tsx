"use client";

import { useMemo, useState } from "react";

function getBmiLevel(bmi: number) {
  if (!bmi) {
    return {
      label: "待计算",
      advice: "输入身高和体重后会显示 BMI 结果。",
      className: "bg-slate-100 text-slate-600",
    };
  }

  if (bmi < 18.5) {
    return {
      label: "偏瘦",
      advice: "建议关注营养摄入和力量训练，如有不适请咨询专业人士。",
      className: "bg-sky-50 text-sky-700",
    };
  }

  if (bmi < 24) {
    return {
      label: "正常",
      advice: "当前 BMI 处于常见参考范围，继续保持规律作息和运动。",
      className: "bg-emerald-50 text-emerald-700",
    };
  }

  if (bmi < 28) {
    return {
      label: "超重",
      advice: "建议关注饮食结构、运动频率和腰围变化。",
      className: "bg-amber-50 text-amber-700",
    };
  }

  return {
    label: "肥胖",
    advice: "建议制定更系统的健康管理计划，必要时咨询医生或营养师。",
    className: "bg-red-50 text-red-700",
  };
}

export function BmiTool() {
  const [height, setHeight] = useState("170");
  const [weight, setWeight] = useState("65");

  const result = useMemo(() => {
    const heightNumber = Number(height);
    const weightNumber = Number(weight);

    if (!heightNumber || !weightNumber || heightNumber <= 0 || weightNumber <= 0) {
      return {
        bmi: 0,
        level: getBmiLevel(0),
      };
    }

    const heightMeter = heightNumber / 100;
    const bmi = weightNumber / (heightMeter * heightMeter);

    return {
      bmi,
      level: getBmiLevel(bmi),
    };
  }, [height, weight]);

  const roundedBmi = result.bmi ? result.bmi.toFixed(1) : "0.0";
  const standardWeightMin = height ? (18.5 * (Number(height) / 100) ** 2).toFixed(1) : "0.0";
  const standardWeightMax = height ? (23.9 * (Number(height) / 100) ** 2).toFixed(1) : "0.0";

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">BMI</div>
          <div className="mt-2 text-3xl font-bold text-primary-700">{roundedBmi}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">状态</div>
          <div className="mt-2 text-3xl font-bold text-accent-600">{result.level.label}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">参考体重</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">
            {standardWeightMin}-{standardWeightMax}kg
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-slate-800" htmlFor="height">
            身高 cm
            <input
              className="mt-2 w-full rounded-md border border-slate-200 px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              id="height"
              min="1"
              onChange={(event) => setHeight(event.target.value)}
              type="number"
              value={height}
            />
          </label>
          <label className="block text-sm font-semibold text-slate-800" htmlFor="weight">
            体重 kg
            <input
              className="mt-2 w-full rounded-md border border-slate-200 px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              id="weight"
              min="1"
              onChange={(event) => setWeight(event.target.value)}
              type="number"
              value={weight}
            />
          </label>
          <div className="rounded-md bg-slate-50 p-4 text-sm leading-6 text-slate-600">
            BMI = 体重 kg / 身高 m²。结果仅作日常参考，不等同于医学诊断。
          </div>
        </div>

        <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-base font-bold text-slate-950">结果说明</h2>
          <span className={`mt-4 inline-flex rounded-md px-3 py-2 text-sm font-semibold ${result.level.className}`}>
            {result.level.label}
          </span>
          <p className="mt-4 text-sm leading-6 text-slate-600">{result.level.advice}</p>
          <div className="mt-4 space-y-2 text-sm text-slate-500">
            <div>偏瘦：BMI &lt; 18.5</div>
            <div>正常：18.5 ≤ BMI &lt; 24</div>
            <div>超重：24 ≤ BMI &lt; 28</div>
            <div>肥胖：BMI ≥ 28</div>
          </div>
        </div>
      </div>
    </section>
  );
}
