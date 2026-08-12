import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Cpu, Database, Globe2, Layers3, ShieldCheck, Sparkles } from 'lucide-react';

/**
 * Skills Section
 * ================
 * Capability matrix: skills grouped by domain, filtered through a tab row,
 * each rendered with a proficiency meter.
 */

const FALLBACK_SKILLS = [
  { name: 'OpenAI GPT-4o', category: 'Generative AI', proficiency: 96 },
  { name: 'AWS Bedrock', category: 'Generative AI', proficiency: 93 },
  { name: 'Claude', category: 'Generative AI', proficiency: 92 },
  { name: 'LangChain', category: 'Generative AI', proficiency: 94 },
  { name: 'LangGraph', category: 'Generative AI', proficiency: 91 },
  { name: 'Prompt Engineering', category: 'Generative AI', proficiency: 95 },
  { name: 'Function Calling', category: 'Generative AI', proficiency: 92 },
  { name: 'Tool Calling', category: 'Generative AI', proficiency: 92 },
  { name: 'RAG', category: 'Generative AI', proficiency: 94 },
  { name: 'Multi-Agent Systems', category: 'Generative AI', proficiency: 90 },
  { name: 'Python', category: 'Backend', proficiency: 96 },
  { name: 'FastAPI', category: 'Backend', proficiency: 96 },
  { name: 'Django', category: 'Backend', proficiency: 88 },
  { name: 'Flask', category: 'Backend', proficiency: 86 },
  { name: 'REST APIs', category: 'Backend', proficiency: 94 },
  { name: 'PostgreSQL', category: 'Backend', proficiency: 92 },
  { name: 'MySQL', category: 'Backend', proficiency: 89 },
  { name: 'SQLAlchemy', category: 'Backend', proficiency: 91 },
  { name: 'Pydantic', category: 'Backend', proficiency: 92 },
  { name: 'JWT', category: 'Backend', proficiency: 90 },
  { name: 'AWS EC2', category: 'Cloud', proficiency: 88 },
  { name: 'Amazon S3', category: 'Cloud', proficiency: 87 },
  { name: 'Amazon ECS', category: 'Cloud', proficiency: 85 },
  { name: 'Amazon RDS', category: 'Cloud', proficiency: 86 },
  { name: 'IAM', category: 'Cloud', proficiency: 84 },
  { name: 'CloudWatch', category: 'Cloud', proficiency: 83 },
  { name: 'Docker', category: 'Cloud', proficiency: 90 },
  { name: 'GitHub Actions', category: 'Cloud', proficiency: 88 },
  { name: 'FAISS', category: 'AI Infrastructure', proficiency: 93 },
  { name: 'ChromaDB', category: 'AI Infrastructure', proficiency: 91 },
  { name: 'Embeddings', category: 'AI Infrastructure', proficiency: 94 },
  { name: 'Semantic Search', category: 'AI Infrastructure', proficiency: 93 },
  { name: 'Vector Database', category: 'AI Infrastructure', proficiency: 90 },
  { name: 'Structured Output', category: 'AI Infrastructure', proficiency: 89 },
  { name: 'LLM Guardrails', category: 'AI Infrastructure', proficiency: 90 },
  { name: 'Hallucination Mitigation', category: 'AI Infrastructure', proficiency: 88 },
];

const CATEGORY_INFO = {
  'Generative AI': { icon: Sparkles, tone: 'from-violet-500 via-fuchsia-400 to-cyan-300' },
  Backend: { icon: Cpu, tone: 'from-cyan-500 via-blue-400 to-violet-400' },
  Cloud: { icon: ShieldCheck, tone: 'from-emerald-500 via-cyan-400 to-blue-400' },
  Databases: { icon: Database, tone: 'from-amber-500 via-orange-400 to-pink-400' },
  Frontend: { icon: Globe2, tone: 'from-fuchsia-500 via-violet-400 to-cyan-300' },
  'AI Infrastructure': { icon: Layers3, tone: 'from-orange-500 via-yellow-400 to-amber-300' },
};

const DEFAULT_INFO = { icon: Sparkles, tone: 'from-slate-500 to-slate-300' };

function proficiencyLabel(value) {
  if (value >= 93) return 'Expert';
  if (value >= 88) return 'Advanced';
  return 'Proficient';
}

export default function Skills({ skills = [], loading }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const displaySkills = skills.length > 0 ? skills : FALLBACK_SKILLS;
  const [activeGroup, setActiveGroup] = useState(null);

  const grouped = useMemo(() => displaySkills.reduce((acc, skill) => {
    const cat = skill.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {}), [displaySkills]);

  const categories = useMemo(() => Object.keys(grouped), [grouped]);

  // Fall back to the first available category so the tab row is never orphaned
  // when the API returns categories that differ from the defaults.
  const currentGroup = activeGroup && grouped[activeGroup] ? activeGroup : categories[0];

  const activeSkills = useMemo(() => {
    const list = grouped[currentGroup] || [];
    return [...list].sort((a, b) => (b.proficiency || 0) - (a.proficiency || 0));
  }, [grouped, currentGroup]);

  const stats = useMemo(() => {
    const total = displaySkills.length;
    const average = total
      ? Math.round(displaySkills.reduce((sum, skill) => sum + (skill.proficiency || 0), 0) / total)
      : 0;
    const expert = displaySkills.filter((skill) => (skill.proficiency || 0) >= 93).length;

    return [
      { label: 'Technologies', value: total },
      { label: 'Domains', value: categories.length },
      { label: 'Avg proficiency', value: `${average}%` },
      { label: 'Expert level', value: expert },
    ];
  }, [displaySkills, categories.length]);

  return (
    <section id="skills" className="section-container" ref={ref}>
      <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <p className="eyebrow">03. SKILLS</p>
        <h2 className="section-title">
          Engineering <span className="gradient-text">capability matrix</span>
        </h2>
        <p className="section-subtitle">
          Production-tested technologies across generative AI, backend systems, cloud, and AI infrastructure.
        </p>

        {loading ? (
          <div className="space-y-8">
            <div className="glass h-24 rounded-[28px] animate-pulse" />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="glass rounded-[24px] p-5 animate-pulse">
                  <div className="h-4 w-1/2 rounded bg-dark-700" />
                  <div className="mt-5 h-1.5 rounded-full bg-dark-700" />
                  <div className="mt-3 h-3 w-1/3 rounded bg-dark-700" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Summary strip */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="glass rounded-[24px] px-5 py-6">
                  <div className="text-2xl font-semibold text-white sm:text-3xl">{stat.value}</div>
                  <div className="mt-1.5 text-xs uppercase tracking-[0.18em] text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Domain tabs */}
            <div className="flex flex-wrap gap-2.5">
              {categories.map((category) => {
                const info = CATEGORY_INFO[category] || DEFAULT_INFO;
                const Icon = info.icon;
                const isActive = category === currentGroup;

                return (
                  <motion.button
                    key={category}
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveGroup(category)}
                    aria-pressed={isActive}
                    className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-sm transition-all duration-200 ${
                      isActive
                        ? 'border-cyan-400/30 bg-cyan-400/10 text-white shadow-[0_16px_40px_-18px_rgba(58,211,242,0.55)]'
                        : 'border-white/8 bg-white/4 text-slate-300 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <span className={`inline-flex rounded-lg bg-gradient-to-br ${info.tone} p-[1px]`}>
                      <span className="rounded-[7px] bg-dark-950/85 p-1.5 text-white">
                        <Icon size={14} />
                      </span>
                    </span>
                    <span className="font-medium">{category}</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs ${isActive ? 'bg-white/10 text-cyan-100' : 'bg-white/6 text-slate-400'}`}>
                      {grouped[category].length}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Skill cards for the selected domain */}
            <div key={currentGroup} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {activeSkills.map((skill, index) => {
                const info = CATEGORY_INFO[skill.category] || DEFAULT_INFO;
                const value = skill.proficiency || 0;

                return (
                  <motion.div
                    key={`${currentGroup}-${skill.name}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.035 }}
                    className="group rounded-[24px] border border-white/8 bg-white/4 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/25 hover:bg-white/6"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-sm font-semibold leading-snug text-white transition-colors group-hover:text-cyan-100">
                        {skill.name}
                      </h4>
                      <span className="shrink-0 font-mono text-xs text-slate-400">{value}%</span>
                    </div>

                    <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/8">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${info.tone}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${value}%` }}
                        transition={{ duration: 0.9, ease: 'easeOut', delay: index * 0.035 }}
                      />
                    </div>

                    <div className="mt-3 text-xs uppercase tracking-[0.16em] text-slate-500">
                      {proficiencyLabel(value)}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
