import { useEffect, useMemo, useRef, useState } from 'react';
import { Menu, MoonStar, X } from 'lucide-react';

/**
 * Navbar Component
 * =================
 * Responsive navigation bar with smooth scroll, scroll-aware styling,
 * and active-section tracking.
 */

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeHref, setActiveHref] = useState('#about');
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'aurora');
  const lastScrollYRef = useRef(0);

  const navClasses = useMemo(() => {
    return `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`;
  }, [visible]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(currentScrollY > 24);
      setVisible(currentScrollY < 72 || currentScrollY < lastScrollYRef.current);
      lastScrollYRef.current = currentScrollY;
      setProgress(scrollHeight > 0 ? Math.min(100, Math.round((currentScrollY / scrollHeight) * 100)) : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track which section is currently in view for the active nav indicator
  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.querySelector(link.href)).filter(Boolean);
    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visibleEntry) setActiveHref(`#${visibleEntry.target.id}`);
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <nav className={navClasses}>
      <div className="mx-auto max-w-7xl px-4 pt-3 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between gap-4 rounded-full border px-4 py-3 backdrop-blur-2xl transition-all duration-300 ${
            scrolled
              ? 'border-white/10 bg-dark-950/70 shadow-[0_20px_60px_rgba(0,0,0,0.35)]'
              : 'border-white/5 bg-dark-950/30'
          }`}
        >
          <a
            href="#"
            className="group flex items-center gap-3 text-sm font-semibold tracking-[0.22em] uppercase text-slate-100 transition-all duration-200 hover:text-white"
          >
            <span className="relative flex h-10 w-10 items-center justify-center">
              <span className="absolute inset-0 rounded-full border border-primary-400/40 transition-transform duration-500 group-hover:rotate-90" style={{ borderTopColor: '#3AD3F2', borderRightColor: 'transparent' }} />
              <span className="relative h-6 w-6 rounded-full shadow-[0_0_16px_rgba(58,211,242,0.55)]" style={{ background: 'radial-gradient(circle at 35% 30%, #ffffff, #3AD3F2 50%, #5A46D6 100%)' }} />
            </span>
            <span className="bg-gradient-to-r from-cyan-300 via-violet-300 to-orange-200 bg-clip-text text-transparent">
              Venkatesh
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex lg:gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = activeHref === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`group relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-gradient-to-r from-cyan-400 via-violet-400 to-orange-300 transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </a>
              );
            })}
            <a href="#contact" className="btn-primary ml-2 px-4 py-2.5 text-sm">
              Hire Me
            </a>
            <button
              type="button"
              onClick={() => setTheme((current) => (current === 'aurora' ? 'plasma' : 'aurora'))}
              className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-400/40 hover:text-white"
              aria-label="Toggle theme"
            >
              <MoonStar size={16} />
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => setTheme((current) => (current === 'aurora' ? 'plasma' : 'aurora'))}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-400/40 hover:text-white"
              aria-label="Toggle theme"
            >
              <MoonStar size={16} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-400/40 hover:text-white"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-2 h-0.5 overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-orange-300 transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mx-4 mt-3 space-y-2 rounded-3xl border border-white/10 bg-dark-950/90 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-2xl">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className={`block rounded-2xl px-4 py-3 transition-all duration-200 ${
                activeHref === link.href ? 'bg-white/8 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={handleLinkClick}
            className="block btn-primary text-center mt-2"
          >
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  );
}