import { highlights } from "../data/content";
import Reveal from "./Reveal";

export default function Highlights() {
  return (
    <section aria-label="Highlights" className="container-page pb-20 md:pb-24">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {highlights.map((h, i) => (
          <Reveal key={h.value} delay={i * 80} className="card flex flex-col gap-1.5 p-5 sm:p-6">
            <span className="font-display text-3xl font-bold text-teal-700 sm:text-4xl dark:text-teal-400">{h.value}</span>
            <span className="text-sm text-slate-600 sm:text-[15px] dark:text-ink-300">{h.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
