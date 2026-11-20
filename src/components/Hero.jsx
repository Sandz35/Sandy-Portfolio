import { useEffect, useState } from "react";
import { profile } from "../data/content";
import { ArrowRightIcon, GitHubIcon, LinkedInIcon, MailIcon } from "./Icons";

function RotatingRole({ roles }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % roles.length), 2400);
    return () => clearInterval(id);
  }, [roles.length]);

  return (
    <p className="flex flex-wrap items-center gap-x-3 font-display text-lg font-semibold sm:text-xl">
      <span className="font-medium text-slate-600 dark:text-ink-300">Currently:</span>
      <span key={i} className="text-amber-700 motion-safe:animate-fade-in dark:text-amber-300">
        {roles[i]}
      </span>
      <span aria-hidden="true" className="h-6 w-0.5 bg-amber-700 motion-safe:animate-pulse dark:bg-amber-300" />
    </p>
  );
}

const socials = [
  { href: profile.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: profile.github, label: "GitHub", Icon: GitHubIcon },
  { href: `mailto:${profile.email}`, label: "Email", Icon: MailIcon },
];

export default function Hero() {
  return (
    <section id="home" className="container-page flex flex-col-reverse items-center gap-12 pt-14 pb-16 md:flex-row md:gap-16 md:pt-24 md:pb-20">
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <span className="inline-flex items-center gap-2.5 self-start rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm text-slate-600 dark:border-ink-600 dark:bg-ink-800 dark:text-ink-300">
          <span className="size-2 rounded-full bg-teal-600 dark:bg-teal-400" />
          Based in {profile.location}
        </span>

        <h1 className="font-display text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl lg:text-6xl">
          {profile.headline} <span className="text-teal-700 dark:text-teal-400">{profile.headlineAccent}</span>
        </h1>

        <p className="max-w-xl text-lg text-slate-600 sm:text-xl dark:text-ink-300">
          <span className="sr-only">{profile.name} — </span>
          {profile.intro}
        </p>

        <RotatingRole roles={profile.roles} />

        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <a href="#contact" className="btn-primary h-13">
            Let's talk <ArrowRightIcon />
          </a>
          <a href="#experience" className="btn-secondary h-13">
            View experience
          </a>
        </div>

        <div className="flex gap-2.5">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="flex size-11 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:text-slate-900 dark:border-ink-600 dark:text-ink-300 dark:hover:text-ink-100"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>

      <div className="relative w-full max-w-[300px] shrink-0 sm:max-w-[360px]">
        <div className="card aspect-[4/5] overflow-hidden rounded-[28px]">
          <img
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            fetchPriority="high"
            className="size-full object-cover object-[50%_40%]"
          />
        </div>
        <div className="card absolute -bottom-4 -left-4 flex flex-col px-4 py-3 shadow-xl sm:bottom-8 sm:-left-7">
          <span className="text-xs text-slate-600 dark:text-ink-300">Most recent</span>
          <span className="font-semibold">{profile.currentBadge}</span>
        </div>
      </div>
    </section>
  );
}
