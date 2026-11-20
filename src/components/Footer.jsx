import { profile } from "../data/content";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-ink-600">
      <div className="container-page flex flex-col justify-between gap-2 py-8 text-sm text-slate-600 sm:flex-row dark:text-ink-300">
        <span>
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </span>
        <span>Built with React + Tailwind · Hosted on AWS</span>
      </div>
    </footer>
  );
}