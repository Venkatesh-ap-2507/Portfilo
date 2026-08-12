import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, CheckCircle, AlertCircle, Loader2, Mail, User, MessageSquare } from 'lucide-react';
import { submitContact } from '../services/api';

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      await submitContact(form);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.response?.data?.detail || 'Failed to send message. Please try again.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="section-container" ref={ref}>
      <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <p className="eyebrow">08. CONTACT</p>
        <h2 className="section-title">
          Let&apos;s build <span className="gradient-text">something intelligent</span>
        </h2>
        <p className="section-subtitle">
          For AI product builds, enterprise agents, LLM systems, and backend collaborations.
        </p>

        <div className="mx-auto mb-8 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }} className="glass rounded-[30px] p-6 text-sm text-slate-300">
            <p className="font-semibold text-lg text-white">Direct contact</p>
            <p className="mt-3">Email: venkateshpensalwar561@gmail.com</p>
            <p className="mt-1">Phone: +91 8177822941</p>
            <p className="mt-1">Location: Pune, Maharashtra, India</p>
          </motion.div>
        </div>

        <div className="mx-auto max-w-3xl">
          <motion.form 
            onSubmit={handleSubmit} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="glass rounded-[30px] p-8 space-y-6"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <User size={18} className="absolute left-4 top-4 text-cyan-400/60" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  minLength={1}
                  maxLength={100}
                  className="w-full rounded-2xl border border-cyan-400/20 bg-white/5 px-12 py-4 text-white placeholder-slate-500 transition-all duration-300 focus:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 hover:border-cyan-400/40"
                />
              </motion.div>
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <Mail size={18} className="absolute left-4 top-4 text-cyan-400/60" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="w-full rounded-2xl border border-cyan-400/20 bg-white/5 px-12 py-4 text-white placeholder-slate-500 transition-all duration-300 focus:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 hover:border-cyan-400/40"
                />
              </motion.div>
            </div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <MessageSquare size={18} className="absolute left-4 top-4 text-cyan-400/60" />
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subject (optional)"
                maxLength={300}
                className="w-full rounded-2xl border border-cyan-400/20 bg-white/5 px-12 py-4 text-white placeholder-slate-500 transition-all duration-300 focus:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 hover:border-cyan-400/40"
              />
            </motion.div>

            <motion.textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your message here... Share your product ideas, AI workflows, or collaboration details."
              required
              minLength={10}
              maxLength={5000}
              rows={8}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="w-full resize-none rounded-[28px] border border-cyan-400/20 bg-white/5 px-5 py-4 text-white placeholder-slate-500 transition-all duration-300 focus:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 hover:border-cyan-400/40"
            />

            <motion.button
              type="submit"
              disabled={status === 'loading'}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary w-full flex items-center justify-center gap-2 py-4 font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/30"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Send Message
                </>
              )}
            </motion.button>

            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100 backdrop-blur-sm"
              >
                <CheckCircle size={18} className="flex-shrink-0" />
                Thank you! Your message has been sent successfully.
              </motion.div>
            )}
            
            {status === 'error' && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-100 backdrop-blur-sm"
              >
                <AlertCircle size={18} className="flex-shrink-0" />
                {errorMessage}
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}