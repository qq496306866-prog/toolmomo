export function TopBar() {
  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-9 max-w-[1200px] items-center justify-between px-4 text-xs text-slate-500 sm:px-6 lg:px-8">
        <span className="font-medium text-slate-600">免费在线工具箱与AI工具测评推荐平台</span>
        <div className="flex items-center gap-3 sm:gap-5">
          <a href="/login" className="hover:text-accent-600">
            登录
          </a>
          <a href="/favorite" className="hover:text-accent-600">
            常用工具
          </a>
          <a className="hover:text-accent-600" href="/en">
            English
          </a>
        </div>
      </div>
    </div>
  );
}
