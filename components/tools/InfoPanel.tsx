type InfoPanelProps = {
  title: string;
  items: string[];
};

export function InfoPanel({ title, items }: InfoPanelProps) {
  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-base font-bold text-slate-950">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
        {items.map((item) => (
          <li className="flex gap-2" key={item}>
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
