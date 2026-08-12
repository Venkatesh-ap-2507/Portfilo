import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/8 bg-dark-950/50 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-slate-400">
            Designed & engineered by Venkatesh Pensalwar for enterprise AI products and futuristic digital experiences.
          </p>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Venkatesh-ap-2507"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/8 bg-white/4 p-2 text-slate-300 transition hover:border-cyan-400/20 hover:text-white"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com/in/venkateshpensalwar"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/8 bg-white/4 p-2 text-slate-300 transition hover:border-cyan-400/20 hover:text-white"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:venkateshpensalwar561@gmail.com"
              className="rounded-full border border-white/8 bg-white/4 p-2 text-slate-300 transition hover:border-cyan-400/20 hover:text-white"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
            <a href="#hero" className="btn-outline px-4 py-2 text-sm">
              Back to top
            </a>
          </div>
        </div>
        <p className="mt-4 text-center text-sm text-slate-500">© {currentYear} All Rights Reserved</p>
      </div>
    </footer>
  );
}