import { useState } from "react";
import { profile } from "../data/content";
import useTheme from "../hooks/useTheme";
import { CloseIcon, DownloadIcon, MenuIcon, MoonIcon, SunIcon } from "./Icons";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const { dark, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-slate-50/85 backdrop-blur-md dark:border-ink-600 dark:bg-ink-950/85">
      <nav className="container-page flex h-[72px] items-center justify-between gap-4" aria-label="Main">
        <a href="#home" className="font-display text-xl font-bold tracking-tight">
          {profile.shortName}
          <span className="text-teal-700 dark:text-teal-400">.</span>
          {profile.initial}
        </a>

        <ul className="hidden items-center gap-8 text-[15px] text-slate-600 md:flex dark:text-ink-300">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition hover:text-slate-900 dark:hover:text-ink-100">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            className="card flex size-11 items-center justify-center rounded-xl transition hover:border-slate-300 dark:hover:border-ink-300"
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
          <a href={profile.resume} target="_blank" rel="noreferrer" className="btn-primary hidden h-11 px-4 text-[15px] sm:inline-flex">
            <DownloadIcon size={16} /> Resume
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="card flex size-11 items-center justify-center rounded-xl md:hidden"
          >
            {open ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-slate-200 bg-slate-50 md:hidden dark:border-ink-600 dark:bg-ink-900">
          <ul className="container-page flex flex-col py-3">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={close} className="block border-b border-slate-200 py-3.5 text-lg dark:border-ink-700">
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-4 pb-2">
              <a href={profile.resume} target="_blank" rel="noreferrer" onClick={close} className="btn-primary w-full">
                <DownloadIcon size={16} /> Download resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
