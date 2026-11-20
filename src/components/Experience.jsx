import { useState } from "react";
import { experience } from "../data/content";
import { ChevronDownIcon } from "./Icons";
import Reveal from "./Reveal";

export default function Experience() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="experience" className="container-page flex flex-col gap-10 py-20 md:py-24">
      <Reveal className="flex flex-col gap-3">
        <span className="eyebrow">Experience</span>
        <h2 className="section-title">Two decades of delivery</h2>
      </Reveal>

      <div className="flex flex-col gap-3">
        {experience.map((job, i) => {
          const open = openIndex === i;
          const panelId = `job-panel-${i}`;
          return (
            <Reveal key={job.role} delay={i * 60}>
              <div
                className={`card overflow-hidden transition-colors ${
                  open ? "border-teal-600 dark:border-teal-400" : ""
                }`}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? -1 : i)}
                    aria-expanded={open}
                    aria-controls={panelId}
                    className="flex w-full flex-wrap items-center gap-x-6 gap-y-1 px-5 py-5 text-left sm:px-7 sm:py-6"
                  >
                    <span className="w-32 font-display font-semibold text-teal-700 dark:text-teal-400">{job.dates}</span>
                    <span className="flex min-w-0 flex-1 basis-64 flex-col">
                      <span className="text-lg font-semibold">{job.role}</span>
                      <span className="text-[15px] text-slate-600 dark:text-ink-300">{job.org}</span>
                    </span>
                    <ChevronDownIcon
                      size={20}
                      className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                </h3>
                {open && (
                  <div id={panelId} className="flex flex-col gap-3.5 px-5 pb-6 sm:px-7 md:pl-[11.5rem]">
                    <p className="text-slate-600 dark:text-ink-300">{job.summary}</p>
                    <ul className="flex flex-wrap gap-2">
                      {job.tags.map((t) => (
                        <li
                          key={t}
                          className="rounded-lg border border-slate-200 px-2.5 py-1 text-[13px] text-slate-600 dark:border-ink-600 dark:text-ink-300"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
