import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, MapPin, Calendar } from 'lucide-react';

/**
 * Experience Section
 * ====================
 * Timeline-style work experience display.
 */

const FALLBACK_EXPERIENCES = [
  {
    id: '1',
    company: '64 Squares LLC',
    role: 'AI Engineer (Generative AI)',
    description: 'Designing and deploying production-grade Generative AI applications for enterprise healthcare and automotive platforms. My work spans LLM engineering, agentic AI orchestration, RAG systems, FastAPI backend services, and cloud-native AI deployment.',
    tech_used: ['LangGraph', 'AWS Bedrock', 'FastAPI', 'RAG', 'Python', 'Ollama', 'OpenAI GPT-4o', 'Claude', 'PostgreSQL', 'Docker', 'AWS'],
    start_date: 'October 2024',
    end_date: null,
    is_current: true,
    location: 'Pune, India',
    highlights: [
      'Built production-grade Agentic AI systems for the Virtual Pain Clinic and Hyundai AI Sales Assistant.',
      'Developed multi-agent workflows using LangGraph and LangChain with AWS Bedrock and OpenAI GPT-4o integrations.',
      'Designed hybrid RAG pipelines, structured output validation, guardrails, and semantic retrieval workflows.',
      'Created scalable FastAPI microservices for conversational AI, document intelligence, and backend orchestration.',
    ],
  },
  {
    id: '2',
    company: 'FirstBit Solutions',
    role: 'Python Full Stack Developer',
    description: 'Contributed to scalable web applications and backend services with a focus on maintainable APIs, authentication, and business-driven feature development.',
    tech_used: ['Python', 'Django', 'REST APIs', 'JWT', 'PostgreSQL', 'Git', 'GitHub'],
    start_date: 'Aug 2023',
    end_date: 'May 2024',
    is_current: false,
    location: 'Hybrid',
    highlights: [
      'Developed REST APIs and backend modules for reliable web services and platform features.',
      'Implemented JWT authentication and contributed to a more structured and maintainable architecture.',
      'Collaborated on full-stack feature delivery with a strong emphasis on clean code and maintainability.',
    ],
  },
];

export default function Experience({ experiences = [], loading }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const displayExperiences = experiences.length > 0 ? experiences : FALLBACK_EXPERIENCES;

  return (
    <section id="experience" className="section-container" ref={ref}>
      <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <p className="eyebrow">05. EXPERIENCE</p>
        <h2 className="section-title">
          Animated <span className="gradient-text">career timeline</span>
        </h2>
        <p className="section-subtitle">A vertical story of the roles, systems, and outcomes that shaped my portfolio.</p>

        {loading ? (
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="glass rounded-xl p-6 animate-pulse">
                <div className="h-6 bg-dark-700 rounded w-1/3 mb-3" />
                <div className="h-4 bg-dark-700 rounded w-1/2 mb-4" />
                <div className="h-4 bg-dark-700 rounded mb-2" />
                <div className="h-4 bg-dark-700 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative">
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/30 via-violet-400/25 to-transparent" />

            <div className="space-y-8">
              {displayExperiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  className="relative pl-10 md:pl-20"
                >
                  <div
                    className={`absolute left-4 md:left-8 w-4 h-4 rounded-full -translate-x-[7px] top-10 border-2 ${
                      exp.is_current
                        ? 'bg-cyan-400 border-cyan-300 shadow-[0_0_30px_rgba(58,211,242,0.35)]'
                        : 'bg-slate-700 border-slate-600'
                    }`}
                  />

                  <div className="glass rounded-[30px] p-6 card-hover">
                    {exp.is_current && (
                      <span className="inline-block mb-3 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">
                        Current Position
                      </span>
                    )}

                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300 mb-3">
                      <span className="flex items-center gap-1">
                        <Briefcase size={14} className="text-cyan-300" />
                        {exp.company}
                      </span>
                      {exp.location && (
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {exp.location}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {exp.start_date} — {exp.end_date || 'Present'}
                      </span>
                    </div>

                    <h3 className="text-white font-semibold text-xl mb-2">{exp.role}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {exp.highlights?.length > 0 && (
                      <ul className="space-y-2 text-sm text-slate-300 mb-4">
                        {exp.highlights.map((highlight) => (
                          <li key={highlight} className="flex gap-2 leading-relaxed">
                            <span className="text-cyan-300 mt-1">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {exp.tech_used?.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs text-cyan-200 bg-cyan-400/10 rounded-full px-3 py-1 border border-cyan-400/15"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}