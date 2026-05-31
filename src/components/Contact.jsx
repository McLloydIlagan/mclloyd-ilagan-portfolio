import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaEnvelope,
  FaPhone,
  FaGithub,
  FaLinkedin,
  FaPaperPlane,
  FaCheckCircle,
} from 'react-icons/fa';
import SectionWrapper, { SectionTitle } from './SectionWrapper';
import { personalInfo } from '../data/portfolioData';

const contactLinks = [
  {
    icon: FaEnvelope,
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    color: '#00d4ff',
  },
  {
    icon: FaPhone,
    label: 'Phone',
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone.replace(/\s/g, '')}`,
    color: '#0066ff',
  },
  {
    icon: FaGithub,
    label: 'GitHub',
    value: 'McLloydIlagan',
    href: personalInfo.github,
    color: '#7c3aed',
    external: true,
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    value: 'mclloydilagan',
    href: personalInfo.linkedin,
    color: '#10b981',
    external: true,
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email address';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    // Build mailto link
    const subject = encodeURIComponent(form.subject || `Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setErrors({});
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  return (
    <SectionWrapper id="contact">
      <SectionTitle
        id="contact-heading"
        label="// contact"
        title="Get In Touch"
        subtitle="Have a project in mind or want to connect? I'd love to hear from you."
      />

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Left — Contact Info */}
        <div className="space-y-5">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-slate-400 leading-relaxed"
          >
            I'm currently open to internship opportunities, freelance projects, and collaborations.
            Whether you have a question or just want to say hi, feel free to reach out!
          </motion.p>

          <div className="space-y-3" role="list" aria-label="Contact information">
            {contactLinks.map((link, i) => (
              <motion.div
                key={link.label}
                role="listitem"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <a
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 glass rounded-xl p-4 hover:border-cyan-400/30 transition-all duration-200 group"
                  aria-label={`${link.label}: ${link.value}`}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                    style={{ background: `${link.color}18` }}
                    aria-hidden="true"
                  >
                    <link.icon size={16} style={{ color: link.color }} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-mono">{link.label}</div>
                    <div className="text-slate-300 text-sm font-medium group-hover:text-cyan-400 transition-colors">
                      {link.value}
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right — Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {submitted ? (
            <div className="glass rounded-2xl p-8 flex flex-col items-center justify-center gap-4 text-center h-full min-h-64">
              <FaCheckCircle className="text-cyan-400 text-5xl" aria-hidden="true" />
              <h3 className="text-xl font-bold text-white">Message Sent!</h3>
              <p className="text-slate-400 text-sm">
                Your email client should have opened. I'll get back to you as soon as possible.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                className="btn-outline text-sm py-2 px-5"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-6 sm:p-8 space-y-4"
              noValidate
              aria-label="Contact form"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-slate-400 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={`w-full bg-slate-900/60 border rounded-xl px-4 py-3 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-cyan-400/60 transition-colors ${
                      errors.name ? 'border-red-500/60' : 'border-slate-700/60'
                    }`}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-red-400 text-xs mt-1" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-slate-400 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={`w-full bg-slate-900/60 border rounded-xl px-4 py-3 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-cyan-400/60 transition-colors ${
                      errors.email ? 'border-red-500/60' : 'border-slate-700/60'
                    }`}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-red-400 text-xs mt-1" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-mono text-slate-400 mb-1.5">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry / Collaboration"
                  className="w-full bg-slate-900/60 border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-cyan-400/60 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono text-slate-400 mb-1.5">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or opportunity..."
                  required
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className={`w-full bg-slate-900/60 border rounded-xl px-4 py-3 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-cyan-400/60 transition-colors resize-none ${
                    errors.message ? 'border-red-500/60' : 'border-slate-700/60'
                  }`}
                />
                {errors.message && (
                  <p id="message-error" className="text-red-400 text-xs mt-1" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              <button type="submit" className="btn-primary w-full justify-center">
                <FaPaperPlane aria-hidden="true" />
                Send Message
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
