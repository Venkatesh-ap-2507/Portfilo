import { useEffect, useState } from 'react';

const lines = ['Initializing AI portfolio', 'Loading neural network', 'Connecting knowledge graph', 'Indexing projects', 'Agent ready'];
export default function BootScreen() {
  const [step, setStep] = useState(0);
  useEffect(() => { const t = setInterval(() => setStep(s => s + 1), 360); return () => clearInterval(t); }, []);
  if (step > lines.length) return null;
  return <div className="boot-screen" aria-label="Loading portfolio"><div className="matrix">01010010 01000001 01000111<br/>NEURAL // ONLINE<br/>11001010 00101101</div><div className="boot-panel"><p className="eyebrow">SYSTEM / BOOT_SEQUENCE</p><h2>AI ENGINEER<span className="text-cyan-300">.OS</span></h2>{lines.slice(0, step + 1).map((line, i) => <p key={line} className="boot-line">{i === step ? '›' : '✓'} {line}<span>{i === step ? '...' : ' complete'}</span></p>)}<div className="boot-bar"><i style={{ width: `${Math.min((step + 1) * 20, 100)}%` }} /></div></div></div>;
}