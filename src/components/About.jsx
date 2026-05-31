import { motion } from 'framer-motion';
import {
  FaShieldAlt,
  FaLock,
  FaExclamationTriangle,
  FaChartBar,
  FaDatabase,
  FaEye,
  FaCheckCircle,
  FaUserGraduate,
} from 'react-icons/fa';
import SectionWrapper, { SectionTitle } from './SectionWrapper';
import { aboutPoints, coreCompetencies } from '../data/portfolioData';

const iconMap = {
  shield: FaShieldAlt,
  lock: FaLock,
  alert: FaExclamationTriangle,
  chart: FaChartBar,
  database: FaDatabase,
  eye: FaEye,
};

const competencyColors = [
  '#00d4ff', '#0066ff', '#7c3aed', '#10b981', '#f59e0b', '#ec4899',
];

export default function About() {
  return (
    <SectionWrapper id="about" className="cyber-grid">
      <SectionTitle
        id="about-heading"
        label="// about me"
        title="Who I Am"
        subtitle="A passionate Computer Science student bridging the gap between data science and cybersecurity."
      />

      <div className="grid lg:grid-cols-2 gap-10 items-start">
        {/* Left — Bio */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <FaUserGraduate className="text-white" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-white">Background</h3>
            </div>
            <p className="text-slate-400 leading-relaxed mb-5">
              I'm a Computer Science student majoring in Data Science at the University of Perpetual
              Help System (UPHSL). With a strong foundation in programming and a deep interest in
              cybersecurity, I strive to build solutions that are both intelligent and secure.
            </p>
            <p className="text-slate-400 leading-relaxed">
              My IT internship at Sutherland Global Services gave me hands-on experience supporting
              global technology infrastructure — diagnosing issues, maintaining systems, and
              implementing corrective solutions in a fast-paced enterprise environment.
            </p>
          </motion.div>

          {/* Key points */}
          <motion.ul
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-3"
            aria-label="Key background points"
          >
            {aboutPoints.map((point, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="flex items-start gap-3 glass rounded-xl px-4 py-3"
              >
                <FaCheckCircle className="text-cyan-400 mt-0.5 shrink-0" aria-hidden="true" />
                <span className="text-slate-300 text-sm">{point}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Right — Core Competencies */}
        <div>
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-lg font-bold text-white mb-5"
          >
            Core Competencies
          </motion.h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4" role="list" aria-label="Core competencies">
            {coreCompetencies.map((comp, i) => {
              const Icon = iconMap[comp.icon] || FaShieldAlt;
              const color = competencyColors[i % competencyColors.length];
              return (
                <motion.div
                  key={comp.label}
                  role="listitem"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 * i, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="glass glass-hover rounded-2xl p-4 flex flex-col items-center text-center gap-3 cursor-default"
                  style={{ borderColor: `${color}20` }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${color}15` }}
                    aria-hidden="true"
                  >
                    <Icon size={22} style={{ color }} />
                  </div>
                  <span className="text-xs font-semibold text-slate-300 leading-tight">
                    {comp.label}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8 glass rounded-2xl p-5 border-l-4 border-cyan-400"
          >
            <p className="text-slate-400 italic text-sm leading-relaxed">
              "Security is not a product, but a process. Data is not just numbers — it's insight
              waiting to be discovered."
            </p>
            <footer className="mt-2 text-xs text-cyan-400 font-mono">— Mc Lloyd Ilagan</footer>
          </motion.blockquote>
        </div>
      </div>
    </SectionWrapper>
  );
}
