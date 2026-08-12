import { useState } from 'react';
import { BrainCircuit, Send, Sparkles } from 'lucide-react';

const nodes = [
  ['User Prompt', 'Natural language question'],
  ['Embedding', 'Convert text into semantic vectors'],
  ['Vector Retrieval', 'Retrieve relevant knowledge using FAISS / ChromaDB'],
  ['Retriever', 'Fetch contextual enterprise documents'],
  ['Context Builder', 'Construct optimized prompt with retrieved knowledge'],
  ['Agent', 'Execute reasoning, tool calling, and workflow orchestration'],
  ['LLM', 'Generate structured AI response using GPT-4o / Claude'],
  ['Response', 'Deliver accurate, validated enterprise-grade output'],
];

export default function Pipeline() {
  const [active, setActive] = useState(0);

  return (
    <section id="architecture" className="section-container">
      <p className="eyebrow">02. AI ARCHITECTURE</p>
      <h2 className="section-title">From signal to <span className="gradient-text">intelligence.</span></h2>
      <p className="section-subtitle">An interactive view of the RAG and agentic AI workflow used in production systems.</p>
      <div className="pipeline">
        {nodes.map(([name, detail], i) => (
          <button
            key={name}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            className={'pipeline-node ' + (active === i ? 'active' : '')}
          >
            <span>{i === 2 ? <Sparkles /> : i === 5 ? <BrainCircuit /> : i === 7 ? <Send /> : <Sparkles />}</span>
            <b>{name}</b>
            <small>{detail}</small>
            {i < nodes.length - 1 && <i className="pipeline-link" />}
          </button>
        ))}
      </div>
      <div className="pipeline-detail">
        <span>0{active + 1}</span>
        <div>
          <b>{nodes[active][0]}</b>
          <p>{nodes[active][1]} — hover any system component to inspect the execution path.</p>
        </div>
      </div>
    </section>
  );
}