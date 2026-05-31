import { motion } from 'framer-motion';
import { FaGoogle, FaCertificate, FaCheckCircle, FaAward } from 'react-icons/fa';
import SectionWrapper, { SectionTitle } from './SectionWrapper';
import { certifications } from '../data/portfolioData';

const iconMap = { FaGoogle, FaCertificate };

export default function Certifications() {
  return (
    <SectionWrapper id="certifications" className="cyber-grid">
      <SectionTitle
        id="certifications-heading"
        label="// certifications"
        title="Certifications"
        subtitle="Industry-recognized credentials validating expertise in cybersecurity and digital literacy."
      />

      <div className="grid sm:grid-cols-2 gap-6" role="list" aria-label="Certifications">
        {certifications.map((cert, i) => {
          const Icon = iconMap[cert.icon] || FaCertificate;
          return (
            <motion.article
              key={i}
              role="listitem"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="glass rounded-2xl p-6 sm:p-8 flex flex-col gap-5 transition-all duration-300"
              style={{ borderColor: `${cert.color}20` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${cert.color}40`;
                e.currentTarget.style.boxShadow = `0 0 30px ${cert.color}15`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${cert.color}20`;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Header */}
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: `${cert.color}18` }}
                  aria-hidden="true"
                >
                  <Icon size={26} style={{ color: cert.color }} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <FaAward
                      size={12}
                      style={{ color: cert.color }}
                      aria-hidden="true"
                    />
                    <span
                      className="text-xs font-mono"
                      style={{ color: cert.color }}
                    >
                      {cert.issuer}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white leading-tight">{cert.title}</h3>
                </div>
              </div>

              {/* Divider */}
              <div
                className="h-px"
                style={{ background: `linear-gradient(90deg, ${cert.color}30, transparent)` }}
                aria-hidden="true"
              />

              {/* Description */}
              <p className="text-slate-400 text-sm leading-relaxed">{cert.description}</p>

              {/* Topics */}
              <div>
                <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">
                  Topics Covered
                </h4>
                <ul className="grid grid-cols-2 gap-2" aria-label="Certificate topics">
                  {cert.topics.map((topic) => (
                    <li key={topic} className="flex items-center gap-2">
                      <FaCheckCircle
                        size={10}
                        style={{ color: cert.color }}
                        className="shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-slate-400 text-xs">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Verified badge */}
              <div className="mt-auto">
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{ background: `${cert.color}15`, color: cert.color }}
                >
                  <FaCheckCircle size={10} aria-hidden="true" />
                  Verified Certificate
                </span>
              </div>
            </motion.article>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
