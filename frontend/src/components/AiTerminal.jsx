import { useState } from 'react';

const answers = {
  help: 'commands: help, about, resume, experience, projects, skills, github, linkedin, contact, certifications, techstack, whoami, clear',
  about: 'Generative AI Engineer building production-grade LLM systems, RAG pipelines, and FastAPI backends.',
  resume: 'Resume available on request for AI engineering, agentic systems, and backend development roles.',
  experience: '2+ years building enterprise AI solutions at 64 Squares LLC and FirstBit Solutions.',
  projects: 'Virtual Pain Clinic · Hyundai AI Sales Assistant · Nexus AI · SmartMergeAI',
  skills: 'Ollama · AWS Bedrock · LangChain · LangGraph · FastAPI · Docker',
  github: 'Open-source and project work can be reviewed via GitHub repositories.',
  linkedin: 'Connect on LinkedIn for AI engineering and product collaboration.',
  contact: 'Use the contact form below to discuss opportunities, AI projects, or technical partnerships.',
  certifications: 'Certifications and learning milestones are available on request.',
  techstack: 'Generative AI · Agentic AI · RAG · FastAPI · AWS · LangGraph · Ollama',
  whoami: 'Venkatesh Pensalwar · Generative AI Engineer · Backend AI Developer',
};

export default function AiTerminal() {
  const [history, setHistory] = useState(['Welcome to the interactive portfolio terminal. Type “help” to begin.']);
  const [value, setValue] = useState('');

  const run = (e) => {
    e.preventDefault();
    const cmd = value.trim().toLowerCase();
    if (!cmd) return;
    setHistory((h) => (cmd === 'clear' ? [] : [...h, `$ ${cmd}`, answers[cmd] || `Unknown command: ${cmd}. Try help.`]));
    setValue('');
  };

  return (
    <section className="section-container" id="terminal">
      <p className="eyebrow">08. DIRECT INTERFACE</p>
      <h2 className="section-title">Talk to the <span className="gradient-text">system.</span></h2>
      <div className="terminal">
        <div className="terminal-top"><span /><span /><span />portfolio@ai-engineer:~</div>
        <div className="terminal-body">
          {history.map((x, i) => <p key={i}>{x}</p>)}
          <form onSubmit={run}>
            <span>portfolio@ai:~$</span>
            <input aria-label="Terminal command" value={value} onChange={(e) => setValue(e.target.value)} autoComplete="off" />
            <i />
          </form>
        </div>
      </div>
    </section>
  );
}