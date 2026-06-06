export function TopBar() {
  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-9 max-w-[1200px] items-center justify-between px-4 text-xs text-slate-500 sm:px-6 lg:px-8">
        <span className="font-medium text-slate-600">免费在线工具箱</span>
        <div className="flex items-center gap-3 sm:gap-5">
          <a href="/login" className="hover:text-accent-600">
            登录
          </a>
          <a href="/favorite" className="hover:text-accent-600">
            收藏本站
          </a>
          <button className="hover:text-accent-600" type="button">
            简体中文
          </button>
        </div>
      </div>
    </div>
  );
}
