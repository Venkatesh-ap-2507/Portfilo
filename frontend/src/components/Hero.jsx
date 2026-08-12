import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Github, Linkedin } from 'lucide-react';
import '../Hero.css';

const DEFAULT_STATS = [
  { value: '2', label: 'Years Experience' },
  { value: '4+', label: 'Enterprise AI Modules' },
  { value: '20+', label: 'Adaptive AI Workflows' },
  { value: '4+', label: 'Production AI Systems' },
];

const RING_ONE = ['Ollama', 'LangChain', 'FastAPI'];
const RING_TWO = ['Bedrock', 'LangGraph', 'RAG'];

const PIPELINE_LOG = [
  'Retrieving context ...',
  '✓ 12 chunks  [conf 0.92]',
  'Generating via Ollama ...',
  '✓ streamed in 341ms',
];

/** Continuous typewriter over a short log, looping. Off when reduced-motion. */
function usePipelineTyping(lines, charDelay = 26, lineHold = 700, restartHold = 1200) {
  const [display, setDisplay] = useState(lines[0]?.slice(0, 1) ?? '');
  const timeoutRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setDisplay(lines[lines.length - 1]);
      return undefined;
    }

    let li = 0;
    let ci = 0;
    let cancelled = false;

    const step = () => {
      if (cancelled) return;
      ci += 1;
      setDisplay(lines[li].slice(0, ci));

      if (ci < lines[li].length) {
        timeoutRef.current = setTimeout(step, charDelay);
      } else if (li < lines.length - 1) {
        li += 1;
        ci = 0;
        timeoutRef.current = setTimeout(step, lineHold);
      } else {
        timeoutRef.current = setTimeout(() => {
          if (cancelled) return;
          li = 0;
          ci = 0;
          timeoutRef.current = setTimeout(step, charDelay);
        }, restartHold);
      }
    };

    timeoutRef.current = setTimeout(step, charDelay);
    return () => {
      cancelled = true;
      clearTimeout(timeoutRef.current);
    };
  }, [lines, charDelay, lineHold, restartHold]);

  return display;
}

/** Pointer-driven tilt for the 3D stage. Resets smoothly on leave. */
function useTilt(maxTilt = 14) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -py * maxTilt, y: px * maxTilt });
  };

  const onMouseLeave = () => setTilt({ x: 0, y: 0 });

  return { ref, tilt, onMouseMove, onMouseLeave };
}

export default function Hero({
  name = 'Venkatesh Pensalwar',
  eyebrow = 'Generative AI Engineer • Building production-ready AI systems',
  roleLine1 = 'Generative AI',
  roleLine2 = 'Engineer',
  roleLine3 = 'Backend AI Developer',
  bio = 'I design and build production-grade AI systems powered by Large Language Models, Retrieval-Augmented Generation (RAG), and Multi-Agent Architectures. With nearly 2 years of experience, I specialize in creating scalable FastAPI microservices, enterprise AI workflows, and cloud-native applications using Ollama, AWS Bedrock, LangChain, and LangGraph.',
  primaryCta = { label: 'Explore My Projects', href: '#projects' },
  resumeHref = '#',
  contactHref = '#contact',
  githubUrl = 'https://github.com/Venkatesh-ap-2507',
  linkedinUrl = 'https://in.linkedin.com/in/venkateshpensalwar',
  stats = DEFAULT_STATS,
  ringOne = RING_ONE,
  ringTwo = RING_TWO,
  pipelineLog = PIPELINE_LOG,
}) {
  const display = usePipelineTyping(pipelineLog);
  const { ref, tilt, onMouseMove, onMouseLeave } = useTilt(10);
  const shouldReduceMotion = useReducedMotion();
  const [latency, setLatency] = useState(341);

  useEffect(() => {
    const id = setInterval(() => setLatency(280 + Math.floor(Math.random() * 140)), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="hero" className="ai-hero">
      <div className="ai-hero__inner">
        <motion.div
          className="ai-hero__copy"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="ai-hero__eyebrow">
            <span className="ai-hero__pulse" />
            SYSTEM ONLINE — {eyebrow}
          </div>

          <p className="ai-hero__kicker">{name}</p>

          <h1 className="ai-hero__title">
            <span className="ai-hero__title-role">AI Engineer</span>
            <span className="ai-hero__title-spec">Generative AI Engineer</span>
            <span className="ai-hero__title-sub">
              Building <em>Intelligent AI Systems</em>
            </span>
          </h1>

          <p className="ai-hero__intro">{bio}</p>

          <div className="ai-hero__actions">
            <a href={resumeHref} className="ai-hero__cta" target="_blank" rel="noreferrer" download>
              Download Resume <ArrowUpRight size={18} />
            </a>
            <a href="#projects" className="ai-hero__link">
              View Projects <span>↗</span>
            </a>
            <a href={githubUrl} target="_blank" rel="noreferrer" className="ai-hero__link">
              GitHub <span>↗</span>
            </a>
            <a href={linkedinUrl} target="_blank" rel="noreferrer" className="ai-hero__link">
              LinkedIn <span>↗</span>
            </a>
          </div>

          <div className="ai-hero__signals">
            {stats.map((s, index) => (
              <motion.div
                key={s.label}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.08 }}
              >
                <b>{s.value}</b>
                <span>{s.label}</span>
              </motion.div>
            ))}
          </div>

          <div className="ai-hero__socials">
            <a href={githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub profile">
              <Github size={17} />
            </a>
            <a href={linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
              <Linkedin size={17} />
            </a>
          </div>
        </motion.div>

        <motion.div
          className="ai-hero__scene"
          ref={ref}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.94 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.95, ease: 'easeOut' }}
        >
          <div
            className="ai-hero__stage"
            style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
          >
            <div className="ai-hero__core">
              <span>AI</span>
            </div>

            <div className="ai-hero__ring ai-hero__ring--one">
              {ringOne.map((label, i) => (
                <div
                  key={label}
                  className="ai-hero__badge"
                  style={{
                    transform: `rotateY(${(360 / ringOne.length) * i}deg) translateZ(150px)`,
                  }}
                >
                  {label}
                </div>
              ))}
            </div>

            <div className="ai-hero__tilt-two">
              <div className="ai-hero__ring ai-hero__ring--two">
                {ringTwo.map((label, i) => (
                  <div
                    key={label}
                    className="ai-hero__badge ai-hero__badge--alt"
                    style={{
                      transform: `rotateY(${(360 / ringTwo.length) * i}deg) translateZ(120px)`,
                    }}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            className="ai-hero__float ai-hero__float--top"
            animate={shouldReduceMotion ? undefined : { y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <b>2+</b>
            <span className="ai-hero__float-label">Years Experience</span>
          </motion.div>

          <motion.div
            className="ai-hero__float ai-hero__float--bottom"
            animate={shouldReduceMotion ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="ai-hero__float-head">
              <span className="ai-hero__live-dot" />
              SYSTEM STATUS <em>LIVE</em>
            </div>
            <p className="ai-hero__float-log">{display}</p>
            <span className="ai-hero__float-latency">{latency}ms</span>
          </motion.div>
        </motion.div>
      </div>

      <a href="#about" className="ai-hero__scroll">
        SCROLL TO DISCOVER <ArrowDown size={15} />
      </a>
    </section>
  );
}
