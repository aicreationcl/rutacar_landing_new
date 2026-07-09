export function PageHero({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <section className="cut-edge-down bg-graphite px-6 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber">{eyebrow}</p>
        <h1 className="mt-4 max-w-2xl text-balance font-display text-4xl uppercase leading-[0.95] tracking-tight sm:text-6xl">
          {title}
        </h1>
        {lede ? <p className="mt-5 max-w-xl text-white/80">{lede}</p> : null}
      </div>
    </section>
  );
}
