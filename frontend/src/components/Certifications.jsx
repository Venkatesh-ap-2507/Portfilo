import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { fetchCertifications } from '../services/api';

export default function Certifications() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCertifications = async () => {
      try {
        const response = await fetchCertifications();
        setCertifications(response.data);
      } catch (err) {
        console.error('Failed to load certifications:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCertifications();
  }, []);

  const handleDownload = (filePath) => {
    const downloadUrl = `/api/docs-files/${filePath}`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filePath.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="certifications" className="section-container">
      <p className="eyebrow">07. CERTIFICATIONS</p>
      <h2 className="section-title">Industry <span className="gradient-text">Certifications</span></h2>
      <p className="section-subtitle">Professional certifications earned from industry leaders.</p>

      <div className="grid gap-4 lg:grid-cols-3">
        {loading ? (
          <p className="text-slate-400">Loading certifications...</p>
        ) : certifications.length > 0 ? (
          certifications.map((cert, index) => (
            <motion.article
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="glass rounded-[28px] p-5 card-hover"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="rounded-2xl border border-cyan-400/15 bg-cyan-400/10 p-3 text-cyan-200">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L15.09 8.26H22L17.45 12.04L19.54 18.26L12 14.46L4.46 18.26L6.55 12.04L2 8.26H8.91L12 2Z" />
                  </svg>
                </div>
                <span className="rounded-full border border-white/8 bg-white/4 px-3 py-1 text-xs text-slate-300">{cert.year}</span>
              </div>
              <h3 className="text-xl font-semibold text-white">{cert.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{cert.issuer}</p>
              <div className="mt-5">
                <button
                  onClick={() => handleDownload(cert.file_path)}
                  className="btn-primary inline-flex items-center gap-2 px-4 py-2.5 text-sm"
                  type="button"
                >
                  <Download size={16} /> Download Certificate
                </button>
              </div>
            </motion.article>
          ))
        ) : (
          <p className="text-slate-400">No certifications found.</p>
        )}
      </div>
    </section>
  );
}