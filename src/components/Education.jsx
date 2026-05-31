import { motion } from 'framer-motion';
import { FaUniversity, FaGraduationCap, FaCalendarAlt, FaBookOpen } from 'react-icons/fa';
import SectionWrapper, { SectionTitle } from './SectionWrapper';
import { education } from '../data/portfolioData';

const iconMap = { FaUniversity, FaGraduationCap };

export default function Education() {
  return (
    <SectionWrapper id="education">
      <SectionTitle
        id="education-heading"
        label="// education"
        title="Academic Background"
        subtitle="Building a strong foundation in computer science, data science, and information technology."
      />

      <div className="grid sm:grid-cols-2 gap-6" role="list" aria-label="Education history">
        {education.map((edu, i) => {
          const Icon = iconMap[edu.icon] || FaGraduationCap;
          const isCurrent = edu.status === 'current';
          return (
            <motion.article
              key={i}
              role="listitem"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.15 }}
              whileHover={{ y: -5 }}
              className="glass rounded-2xl p-6 sm:p-8 flex flex-col gap-4 transition-all duration-300 hover:border-cyan-400/30"
            >
              {/* Status badge */}
              <div className="flex items-center justify-between">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: isCurrent
                      ? 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,102,255,0.2))'
                      : 'rgba(124,58,237,0.15)',
                  }}
                  aria-hidden="true"
                >
                  <Icon
                    size={22}
                    style={{ color: isCurrent ? '#00d4ff' : '#7c3aed' }}
                  />
                </div>
                <span
                  className="text-xs font-mono px-3 py-1 rounded-full"
                  style={{
                    background: isCurrent ? 'rgba(0,212,255,0.1)' : 'rgba(124,58,237,0.1)',
                    color: isCurrent ? '#00d4ff' : '#7c3aed',
                  }}
                >
                  {isCurrent ? '● Current' : '✓ Completed'}
                </span>
              </div>

              {/* Degree */}
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">{edu.degree}</h3>
                <p className="text-cyan-400 font-semibold text-sm mt-1">{edu.major}</p>
              </div>

              {/* Divider */}
              <div
                className="h-px w-full"
                style={{
                  background: isCurrent
                    ? 'linear-gradient(90deg, rgba(0,212,255,0.3), transparent)'
                    : 'linear-gradient(90deg, rgba(124,58,237,0.3), transparent)',
                }}
                aria-hidden="true"
              />

              {/* School & Period */}
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <FaBookOpen
                    className="text-slate-500 mt-0.5 shrink-0 text-xs"
                    aria-hidden="true"
                  />
                  <span className="text-slate-300 text-sm font-medium">{edu.school}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-slate-500 text-xs" aria-hidden="true" />
                  <span className="text-slate-400 text-sm font-mono">{edu.period}</span>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
