import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Star } from 'lucide-react';

/**
 * Projects Section
 * ==================
 * Displays portfolio projects in a responsive card grid.
 */

const FALLBACK_PROJECTS = [
  {
    id: '1',
    title: 'Virtual Pain Clinic (VPC)',
    description: 'A production-oriented healthcare platform that leverages Agentic AI to automate patient intake, clinical screening, and structured medical documentation with adaptive workflows and AI-generated summaries.',
    tech_stack: ['Agentic AI', 'AWS Bedrock', 'LangGraph', 'FastAPI', 'React', 'Three.js', 'Docker'],
    github_url: '#',
    live_url: '#',
    featured: true,
    category: 'Healthcare AI',
  },
  {
    id: '2',
    title: 'Hyundai AI Sales Assistant',
    description: 'A production-grade conversational AI assistant for the automotive industry that helps customers discover vehicles, compare variants, and receive recommendations using multi-agent workflows and structured retrieval.',
    tech_stack: ['LangGraph', 'RAG', 'Ollama', 'FastAPI', 'Streamlit', 'Snowflake'],
    github_url: 'https://github.com/Venkatesh-ap-2507/Hyundai-Sales-AI-Agent',
    featured: true,
    category: 'Automotive AI',
  },
  {
    id: '3',
    title: 'Nexus AI',
    description: 'A modular enterprise AI platform for reusable LLM orchestration, RAG pipelines, document intelligence, embeddings, and prompt management.',
    tech_stack: ['RAG', 'Embeddings', 'LangChain', 'ChromaDB', 'FAISS', 'FastAPI', 'Docker'],
    github_url: 'https://github.com/Venkatesh-ap-2507/AIStudio',
    featured: true,
    category: 'Enterprise AI',
  },
  {
    id: '4',
    title: 'SmartMergeAI',
    description: 'An AI-powered GitHub pull request review assistant that analyzes repositories, summarizes changes, and helps developers understand pull requests using Retrieval-Augmented Generation.',
    tech_stack: ['RAG', 'GitHub API', 'FastAPI', 'Ollama', 'LangChain', 'Python'],
    github_url: 'https://github.com/Venkatesh-ap-2507/SMI',
    featured: false,
    category: 'Developer AI',
  },
  {
    id: '5',
    title: 'KnowledgeWeaver',
    description: 'An enterprise RAG chatbot capable of answering questions over organizational documents using semantic search, embeddings, and contextual retrieval.',
    tech_stack: ['RAG', 'Embeddings', 'FastAPI', 'LangChain', 'Python'],
    github_url: 'https://github.com/Venkatesh-ap-2507/KnowledgeWeaver',
    featured: false,
    category: 'Knowledge AI',
  },
  {
    id: '6',
    title: 'SmartDocs',
    description: 'An AI-powered document intelligence platform that extracts, indexes, and answers questions from uploaded PDFs and documents.',
    tech_stack: ['Document AI', 'RAG', 'FastAPI', 'Python', 'Ollama'],
    github_url: 'https://github.com/Venkatesh-ap-2507/SmartDocs',
    featured: false,
    category: 'Document AI',
  },
  {
    id: '7',
    title: 'LifeSaver AI',
    description: 'A healthcare-focused RAG application combining vector search, embeddings, and LLMs to deliver contextual medical knowledge.',
    tech_stack: ['Healthcare AI', 'RAG', 'Embeddings', 'FastAPI', 'Python'],
    github_url: '#',
    featured: false,
    category: 'Healthcare AI',
  },
  {
    id: '8',
    title: 'Nova Movie Recommendation Assistant',
    description: 'A conversational recommendation system that uses LLM reasoning to suggest movies based on user preferences.',
    tech_stack: ['LLM', 'Recommendation AI', 'Python', 'FastAPI'],
    github_url: 'https://github.com/Venkatesh-ap-2507/Nova-Movie-Ticket-Booking',
    featured: false,
    category: 'Recommendation AI',
  },
];

export default function Projects({ projects = [], loading }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const displayProjects = projects.length > 0 ? projects : FALLBACK_PROJECTS;
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = useMemo(() => {
    const values = Array.from(new Set(displayProjects.map((project) => project.category).filter(Boolean)));
    return ['All', ...values];
  }, [displayProjects]);

  const filteredProjects = activeFilter === 'All'
    ? displayProjects
    : displayProjects.filter((project) => project.category === activeFilter);

  const featuredProject = filteredProjects.find((project) => project.featured) || filteredProjects[0];
  const restProjects = filteredProjects.filter((project) => project.id !== featuredProject?.id);

  return (
    <section id="projects" className="section-container" ref={ref}>
      <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <p className="eyebrow">04. PROJECTS</p>
        <h2 className="section-title">
          Premium <span className="gradient-text">project spotlight</span>
        </h2>
        <p className="section-subtitle">
          A curated product-style showcase of AI systems, backend platforms, and experimentation.
        </p>

        <div className="mb-10 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <motion.button
              key={filter}
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-4 py-2 text-sm transition-all duration-200 ${
                activeFilter === filter
                  ? 'border-cyan-400/25 bg-cyan-400/10 text-white'
                  : 'border-white/8 bg-white/4 text-slate-300 hover:border-white/15 hover:text-white'
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-8">
            <div className="glass h-72 rounded-[28px] p-7 animate-pulse" />
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="glass rounded-[28px] p-6 animate-pulse">
                  <div className="h-6 bg-dark-700 rounded w-2/3 mb-3" />
                  <div className="h-4 bg-dark-700 rounded mb-2" />
                  <div className="h-4 bg-dark-700 rounded w-4/5 mb-4" />
                  <div className="flex gap-2">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="h-6 bg-dark-700 rounded-full w-16" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {featuredProject && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7 }}
                className="glass card-hover relative overflow-hidden rounded-[32px] p-6 lg:p-8"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(58,211,242,0.16),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(140,123,255,0.14),transparent_34%)]" />
                <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
                  <div>
                    <div className="mb-5 flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-cyan-200">
                        <Star size={12} className="fill-cyan-200" /> Featured project
                      </span>
                      <span className="rounded-full border border-white/8 bg-white/4 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-300">
                        {featuredProject.category || 'AI'}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-semibold text-white">{featuredProject.title}</h3>
                    <p className="mt-4 text-sm sm:text-base leading-7 text-slate-300">{featuredProject.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {featuredProject.tech_stack?.slice(0, 7).map((tech) => (
                        <span key={tech} className="rounded-full border border-white/8 bg-dark-950/50 px-3 py-1 text-xs text-slate-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-7 flex flex-wrap gap-3">
                      {featuredProject.github_url && (
                        <a href={featuredProject.github_url} target="_blank" rel="noopener noreferrer" className="btn-outline inline-flex items-center gap-2 px-4 py-2.5 text-sm">
                          <Github size={16} /> GitHub
                        </a>
                      )}
                      {featuredProject.live_url && (
                        <a href={featuredProject.live_url} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2 px-4 py-2.5 text-sm">
                          <ExternalLink size={16} /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 lg:grid-cols-1">
                    {[
                      { label: 'latency', value: '340ms' },
                      { label: 'coverage', value: '95%' },
                      { label: 'impact', value: 'enterprise' },
                    ].map((item) => (
                      <div key={item.label} className="rounded-2xl border border-white/8 bg-white/4 p-4">
                        <div className="text-xs uppercase tracking-[0.18em] text-slate-400">{item.label}</div>
                        <div className="mt-2 text-lg font-semibold text-white">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {restProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group relative flex flex-col overflow-hidden rounded-[28px] border border-white/8 bg-white/4 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-400/25 hover:bg-white/6 hover:shadow-[0_30px_70px_-24px_rgba(58,211,242,0.18)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-cyan-400/6 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  {project.featured && <div className="absolute right-5 top-5"><Star size={16} className="text-yellow-300 fill-yellow-300" /></div>}
                  <div className="relative flex flex-1 flex-col">
                    <span className="inline-flex w-fit items-center rounded-full border border-white/8 bg-dark-950/50 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-300">
                      {project.category || 'Project'}
                    </span>

                    <h3 className="mt-4 text-xl font-semibold text-white transition-colors group-hover:text-cyan-200">{project.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-7 text-slate-300">{project.description}</p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tech_stack?.slice(0, 4).map((tech) => (
                        <span key={tech} className="rounded-full border border-white/8 bg-dark-950/55 px-3 py-1 text-xs text-slate-300">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center gap-4 border-t border-white/6 pt-4">
                      {project.github_url && (
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-slate-300 transition hover:text-white">
                          <Github size={16} /> Code
                        </a>
                      )}
                      {project.live_url && (
                        <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-slate-300 transition hover:text-cyan-200">
                          <ExternalLink size={16} /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}