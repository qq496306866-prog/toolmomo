type LogoMarkProps = {
  showText?: boolean;
  inverse?: boolean;
};

export function LogoMark({ showText = true, inverse = false }: LogoMarkProps) {
  return (
    <span className="flex min-w-fit items-center gap-3" aria-label="Toolmomo">
      <span className="grid h-11 w-11 shrink-0 place-items-center">
        <svg
          aria-hidden="true"
          className="h-11 w-11"
          fill="none"
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 18v-6c0-3.4 2.8-6 6.2-6h11.6C42.2 6 45 8.6 45 12v6"
            stroke={inverse ? "#ffffff" : "#061a35"}
            strokeLinecap="round"
            strokeWidth="6"
          />
          <path
            d="M9 20h46c3.3 0 6 2.7 6 6v35H3V26c0-3.3 2.7-6 6-6Z"
            fill={inverse ? "#ffffff" : "#061a35"}
          />
          <path d="M3 32h58v5H3z" fill="#ffffff" />
          <path d="M16 30h8v10h-8zM40 30h8v10h-8z" fill="#ffffff" />
          <path d="M15 44h10l7 8 7-8h10v17H39V51l-7 8-7-8v10H15V44Z" fill="#ffffff" />
        </svg>
      </span>
      {showText ? (
        <span className="flex flex-col leading-none">
          <span className="text-xl font-black uppercase tracking-normal">
            <span className={inverse ? "text-white" : "text-primary-700"}>Tool</span>
            <span className="text-accent-500">momo</span>
          </span>
          <span className={inverse ? "mt-1 text-[10px] font-semibold uppercase text-slate-300" : "mt-1 text-[10px] font-semibold uppercase text-primary-500"}>
            Online Tools
          </span>
        </span>
      ) : null}
    </span>
  );
}
