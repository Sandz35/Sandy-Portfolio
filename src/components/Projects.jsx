import { useState } from "react";
import { projectFilters, projects } from "../data/content";
import { ExternalIcon } from "./Icons";
import Reveal from "./Reveal";

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="border-y border-slate-200 bg-slate-100/60 dark:border-ink-600 dark:bg-ink-900">
      <div className="container-page flex flex-col gap-8 py-20 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal className="flex flex-col gap-3">
            <span className="eyebrow">Projects</span>
            <h2 className="section-title">Selected work</h2>
          </Reveal>

          <div role="group" aria-label="Filter projects" className="card flex gap-1.5 rounded-xl p-1.5">
            {projectFilters.map((f) => {
              const active = f === filter;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f)}
                  className={`h-10 rounded-lg px-4 text-sm font-semibold transition ${
                    active
                      ? "bg-teal-700 text-white dark:bg-teal-400 dark:text-ink-950"
                      : "text-slate-600 hover:text-slate-900 dark:text-ink-300 dark:hover:text-ink-100"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <article className="card flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-xl">
                <div className={`flex h-40 items-end bg-gradient-to-br p-5 ${p.gradient}`}>
                  <span className="rounded-lg bg-black/55 px-2.5 py-1 text-[13px] font-semibold text-white">{p.kind}</span>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                  <p className="flex-1 text-[15px] text-slate-600 dark:text-ink-300">{p.description}</p>
                  <ul className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <li key={t} className="chip rounded-lg px-2.5 text-[13px]">
                        {t}
                      </li>
                    ))}
                  </ul>
                  {(p.demo || p.code) && (
                    <div className="flex gap-5 pt-1 text-[15px] font-semibold text-teal-700 dark:text-teal-400">
                      {p.demo && (
                        <a href={p.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:underline">
                          Live demo <ExternalIcon />
                        </a>
                      )}
                      {p.code && (
                        <a href={p.code} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:underline">
                          Code <ExternalIcon />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
