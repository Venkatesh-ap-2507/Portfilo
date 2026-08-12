import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Brain, Server, Rocket, Sparkles, Award, Clock3, ArrowUpRight } from 'lucide-react';

/**
 * About Section
 * ===============
 * Brief introduction with key highlights and stats.
 */

const HIGHLIGHTS = [
  {
    icon: Brain,
    title: 'Agentic AI',
    description: 'Designing autonomous AI systems using LangGraph, LangChain, memory, tool calling, and multi-agent orchestration.',
  },
  {
    icon: Server,
    title: 'Generative AI',
    description: 'Building enterprise LLM applications using Ollama, AWS Bedrock, structured outputs, prompt engineering, and guardrails.',
  },
  {
    icon: Code2,
    title: 'Backend Engineering',
    description: 'Developing scalable FastAPI microservices, REST APIs, authentication systems, and cloud-native backend services.',
  },
  {
    icon: Rocket,
    title: 'RAG Systems',
    description: 'Building intelligent retrieval pipelines using FAISS, ChromaDB, embeddings, semantic search, and hallucination mitigation.',
  },
];

const STATS = [
  { value: '2', label: 'Years Experience' },
  { value: '4+', label: 'Enterprise AI Modules' },
  { value: '20+', label: 'Adaptive AI Workflows' },
  { value: '4+', label: 'Production AI Systems' },
];

const STACK_TAGS = ['LangGraph', 'AWS Bedrock', 'FastAPI', 'FAISS', 'ChromaDB', 'Ollama'];

const FOCUS_AREAS = [
  { icon: Brain, label: 'Agentic AI & orchestration' },
  { icon: Rocket, label: 'Retrieval systems & guardrails' },
  { icon: Server, label: 'FastAPI, deployment & frontend polish' },
];

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="section-container relative" ref={ref}>
      {/* Ambient depth accents, scoped to this section */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#3AD3F2]/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#8C7BFF]/10 blur-[100px]" />

      <div className={`relative transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <p className="eyebrow">01. ABOUT</p>
        <h2 className="section-title">
          Engineering AI systems that <span className="gradient-text">feel like products</span>
        </h2>
        <p className="section-subtitle">
          I&apos;m a Generative AI Engineer focused on production-grade agentic systems, retrieval workflows,
          and backend platforms. I design solutions that combine clean UX, resilient infrastructure, and
          intelligent orchestration for enterprise use cases.
        </p>

        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          {/* Profile / identity card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="glass card-hover relative flex flex-col overflow-hidden rounded-[32px] p-6 lg:p-8"
          >
            {/* Corner glow sweep */}
            <div className="pointer-events-none absolute -top-24 right-0 h-56 w-56 rounded-full bg-gradient-to-br from-[#3AD3F2]/20 to-transparent blur-3xl" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="relative mx-auto flex h-36 w-36 shrink-0 items-center justify-center rounded-[30px] border border-white/10 bg-white/5">
                <div className="absolute inset-0 rounded-[30px] bg-gradient-to-br from-[#3AD3F2]/40 via-[#8C7BFF]/30 to-transparent opacity-70 blur-xl" />
                <div className="absolute inset-0 animate-[spin_10s_linear_infinite] rounded-[30px] [mask:linear-gradient(#000,transparent_60%)] border border-cyan-300/30" />
                <div className="relative flex h-[104px] w-[104px] items-center justify-center rounded-[24px] border border-white/10 bg-dark-950/80 text-4xl font-bold text-white shadow-inner">
                  AI
                </div>
                <div className="absolute -right-2.5 -top-2.5 rounded-full border border-cyan-400/25 bg-dark-950 p-1.5 text-cyan-200 shadow-lg shadow-cyan-500/10">
                  <Sparkles size={14} />
                </div>
              </div>

              <div className="space-y-2.5 text-center sm:text-left">
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/90">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_2px_rgba(58,211,242,0.6)]" />
                  Product minded engineer
                </p>
                <h3 className="text-2xl font-semibold text-white">AI systems with startup-level polish</h3>
                <p className="text-sm leading-7 text-slate-300">
                  I work across the stack, from orchestration and retrieval to responsive interfaces and
                  deployment, with a bias for shipping real systems.
                </p>
              </div>
            </div>

            {/* Tech tag row */}
            <div className="relative mt-6 flex flex-wrap justify-center gap-2 sm:justify-start">
              {STACK_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-slate-300 transition-colors hover:border-cyan-400/30 hover:text-cyan-200"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="relative my-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="relative grid flex-1 grid-cols-2 gap-3.5">
              {STATS.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="group rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition-colors duration-300 hover:border-cyan-400/25 hover:bg-white/[0.05]"
                >
                  <div className="gradient-text text-2xl font-bold">{stat.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Highlights + focus areas */}
          <div className="grid gap-4 sm:grid-cols-2">
            {HIGHLIGHTS.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="glass card-hover group relative overflow-hidden rounded-[28px] p-5"
              >
                <span className="pointer-events-none absolute right-4 top-4 font-mono text-[11px] tracking-widest text-white/10 transition-colors duration-300 group-hover:text-cyan-300/30">
                  0{index + 1}
                </span>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/15 bg-gradient-to-br from-cyan-400/15 to-violet-400/10 text-cyan-200 transition-transform duration-300 group-hover:scale-105">
                  <item.icon size={22} />
                </div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
                <div className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-cyan-400 to-violet-400 transition-transform duration-300 group-hover:scale-x-100" />
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="glass relative overflow-hidden rounded-[28px] p-5 sm:col-span-2"
            >
              <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-violet-400/10 blur-3xl" />

              <div className="relative flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="eyebrow mb-2">Timeline</p>
                  <h3 className="text-lg font-semibold text-white">Focused on production delivery</h3>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300">
                  <Clock3 size={14} className="text-cyan-300" />
                  Current focus: AI systems + UX polish
                </div>
              </div>

              <div className="relative mt-5 grid gap-3 md:grid-cols-3">
                {FOCUS_AREAS.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="group flex items-center gap-3 rounded-2xl border border-white/8 bg-dark-950/50 p-4 text-sm text-slate-300 transition-colors duration-300 hover:border-cyan-400/25"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cyan-200 transition-transform duration-300 group-hover:scale-110">
                      <Icon size={15} />
                    </span>
                    {label}
                  </div>
                ))}
              </div>

              <div className="relative mt-5 flex items-center gap-2 text-sm text-slate-400">
                <Award size={15} className="text-violet-300" />
                Enterprise-grade execution across healthcare, automotive, and internal AI platforms.
                <ArrowUpRight size={13} className="ml-auto text-slate-500" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}