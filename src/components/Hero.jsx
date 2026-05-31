import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaDownload,
  FaArrowRight,
  FaShieldAlt,
  FaCode,
  FaDatabase,
} from 'react-icons/fa';
import { personalInfo } from '../data/portfolioData';

const typingPhrases = [
  'Cybersecurity Enthusiast',
  'Data Science Student',
  'Python Developer',
  'Problem Solver',
  'IT Professional',
];

function useTypingEffect(phrases, speed = 80, pause = 2000) {
  const [displayed, setDisplayed] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    let timeout;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % phrases.length);
    }

    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, phraseIdx, phrases, speed, pause]);

  return displayed;
}

const floatingBadges = [
  { icon: FaShieldAlt, label: 'Cybersecurity', color: '#00d4ff', delay: 0 },
  { icon: FaCode, label: 'Programming', color: '#0066ff', delay: 0.5 },
  { icon: FaDatabase, label: 'Data Science', color: '#7c3aed', delay: 1 },
];

export default function Hero() {
  const typedText = useTypingEffect(typingPhrases);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center cyber-grid overflow-hidden"
      aria-label="Hero section"
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,212,255,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Text */}
          <div>
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
              <span className="text-sm text-slate-300 font-mono">Available for opportunities</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-3"
            >
              <span className="text-white">Mc Lloyd</span>
              <br />
              <span className="gradient-text glow-text">Silverio Ilagan</span>
            </motion.h1>

            {/* Role */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-400 font-medium mb-2"
            >
              Computer Science Student
            </motion.p>

            {/* Typing effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl sm:text-2xl font-mono text-cyan-400 mb-6 h-8"
              aria-live="polite"
              aria-label={`Currently: ${typedText}`}
            >
              <span className="typing-cursor">{typedText}</span>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8 max-w-xl"
            >
              {personalInfo.bio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary"
              >
                Contact Me <FaArrowRight aria-hidden="true" />
              </a>
              <a
                href={`mailto:${personalInfo.email}?subject=Resume Request&body=Hi Lloyd, could you please send me your resume?`}
                className="btn-outline"
                aria-label="Request resume via email"
              >
                <FaDownload aria-hidden="true" /> Download Resume
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="flex items-center gap-4"
            >
              <span className="text-slate-500 text-sm">Connect:</span>
              {[
                { href: personalInfo.github, icon: FaGithub, label: 'GitHub profile' },
                { href: personalInfo.linkedin, icon: FaLinkedin, label: 'LinkedIn profile' },
                { href: `mailto:${personalInfo.email}`, icon: FaEnvelope, label: 'Send email' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/40 transition-all duration-200 hover:scale-110"
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right — Profile Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col items-center gap-6"
          >
            {/* Avatar */}
            <div className="relative float-animation">
              {/* Outer ring */}
              <div
                className="absolute inset-0 rounded-full pulse-glow"
                style={{
                  background: 'conic-gradient(from 0deg, #00d4ff, #0066ff, #7c3aed, #00d4ff)',
                  padding: '3px',
                  borderRadius: '50%',
                }}
                aria-hidden="true"
              />
              <div
                className="relative w-52 h-52 sm:w-64 sm:h-64 rounded-full overflow-hidden"
                style={{
                  background: 'conic-gradient(from 0deg, #00d4ff, #0066ff, #7c3aed, #00d4ff)',
                  padding: '3px',
                }}
              >
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                  {/* Real profile photo */}
                  <img
                    src="/mclloyd-ilagan-portfolio/profile.png"
                    alt="Mc Lloyd Silverio Ilagan — profile photo"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              {/* Floating badges */}
              {floatingBadges.map(({ icon: Icon, label, color, delay }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + delay, type: 'spring' }}
                  className="absolute glass rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-xs font-semibold"
                  style={{
                    color,
                    borderColor: `${color}30`,
                    top: i === 0 ? '-10px' : i === 1 ? '30%' : 'auto',
                    bottom: i === 2 ? '-10px' : 'auto',
                    right: i === 0 ? '-20px' : i === 2 ? '-20px' : 'auto',
                    left: i === 1 ? '-30px' : 'auto',
                  }}
                >
                  <Icon size={12} aria-hidden="true" />
                  {label}
                </motion.div>
              ))}
            </div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-3 gap-4 w-full max-w-sm"
            >
              {[
                { value: '2+', label: 'Years Study' },
                { value: '4+', label: 'Projects' },
                { value: '2', label: 'Certifications' },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="glass rounded-xl p-3 text-center"
                >
                  <div className="text-2xl font-bold gradient-text">{value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="text-xs text-slate-600 font-mono">scroll down</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-5 h-8 rounded-full border border-slate-700 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-cyan-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
