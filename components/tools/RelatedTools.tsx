type RelatedToolsProps = {
  title?: string;
  tools: Array<{
    name: string;
    href: string;
    description: string;
  }>;
};

export function RelatedTools({ title = "相关工具", tools }: RelatedToolsProps) {
  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-base font-bold text-slate-950">{title}</h2>
      <div className="mt-3 space-y-2">
        {tools.map((tool) => (
          <a className="block rounded-md bg-slate-50 p-3 hover:bg-accent-50" href={tool.href} key={tool.name}>
            <div className="text-sm font-semibold text-slate-950">{tool.name}</div>
            <p className="mt-1 text-xs leading-5 text-slate-500">{tool.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
