import { motion } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt, FaBuilding, FaCheckCircle } from 'react-icons/fa';
import SectionWrapper, { SectionTitle } from './SectionWrapper';
import { experience } from '../data/portfolioData';

export default function Experience() {
  return (
    <SectionWrapper id="experience" className="cyber-grid">
      <SectionTitle
        id="experience-heading"
        label="// experience"
        title="Work Experience"
        subtitle="Hands-on professional experience in IT infrastructure and technical support."
      />

      <div className="relative" role="list" aria-label="Work experience timeline">
        {/* Timeline line */}
        <div
          className="absolute left-6 top-0 bottom-0 w-px hidden sm:block"
          style={{ background: 'linear-gradient(180deg, #00d4ff40, transparent)' }}
          aria-hidden="true"
        />

        {experience.map((job, i) => (
          <motion.article
            key={i}
            role="listitem"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="relative sm:pl-16 mb-8 last:mb-0"
          >
            {/* Timeline dot */}
            <div
              className="absolute left-4 top-6 w-4 h-4 rounded-full border-2 border-cyan-400 bg-slate-900 hidden sm:block pulse-glow"
              aria-hidden="true"
            />

            <div className="glass rounded-2xl p-6 sm:p-8 hover:border-cyan-400/30 transition-all duration-300">
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full bg-cyan-400/10 text-cyan-400">
                      <FaBriefcase size={10} aria-hidden="true" />
                      {job.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{job.role}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <FaBuilding className="text-slate-500 text-xs" aria-hidden="true" />
                    <span className="text-cyan-400 font-semibold text-sm">{job.company}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 glass px-3 py-2 rounded-xl">
                  <FaCalendarAlt className="text-slate-500 text-xs" aria-hidden="true" />
                  <span className="text-slate-400 text-sm font-mono">{job.period}</span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-cyan-400/20 to-transparent mb-5" aria-hidden="true" />

              {/* Responsibilities */}
              <div>
                <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">
                  Key Responsibilities
                </h4>
                <ul className="space-y-2.5" aria-label="Job responsibilities">
                  {job.responsibilities.map((resp, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.08 * j }}
                      className="flex items-start gap-3"
                    >
                      <FaCheckCircle
                        className="text-cyan-400 mt-0.5 shrink-0 text-xs"
                        aria-hidden="true"
                      />
                      <span className="text-slate-400 text-sm leading-relaxed">{resp}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </SectionWrapper>
  );
}
