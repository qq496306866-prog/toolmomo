type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-5 flex flex-col gap-2 sm:mb-6">
      {eyebrow ? (
        <span className="text-sm font-semibold text-accent-600">{eyebrow}</span>
      ) : null}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-xl font-bold text-slate-950 sm:text-2xl">{title}</h2>
        {description ? (
          <p className="max-w-2xl text-sm leading-6 text-slate-500">{description}</p>
        ) : null}
      </div>
    </div>
  );
}
