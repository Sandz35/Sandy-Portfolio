import { about, skillGroups } from "../data/content";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="border-y border-slate-200 bg-slate-100/60 dark:border-ink-600 dark:bg-ink-900">
      <div className="container-page flex flex-col gap-12 py-20 md:py-24 lg:flex-row lg:gap-16">
        <Reveal className="flex flex-col gap-4 lg:w-2/5">
          <span className="eyebrow">About</span>
          <h2 className="section-title">{about.title}</h2>
          <p className="text-[17px] text-slate-600 dark:text-ink-300">{about.body}</p>
        </Reveal>

        <div className="grid flex-1 gap-4 sm:grid-cols-2">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={i * 80} className="card flex flex-col gap-3.5 p-6">
              <h3 className="font-display text-lg font-semibold">{g.title}</h3>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li key={s} className="chip">
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
