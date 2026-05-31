import { motion } from 'framer-motion';
import {
  FaShieldAlt,
  FaBriefcase,
  FaGraduationCap,
  FaLock,
  FaCode,
  FaChartBar,
} from 'react-icons/fa';
import SectionWrapper, { SectionTitle } from './SectionWrapper';
import { achievements } from '../data/portfolioData';

const iconMap = {
  FaShieldAlt,
  FaBriefcase,
  FaGraduationCap,
  FaLock,
  FaCode,
  FaChartBar,
};

export default function Achievements() {
  return (
    <SectionWrapper id="achievements" className="cyber-grid">
      <SectionTitle
        id="achievements-heading"
        label="// achievements"
        title="Achievements"
        subtitle="Key milestones and accomplishments throughout my academic and professional journey."
      />

      <div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        role="list"
        aria-label="Achievements"
      >
        {achievements.map((item, i) => {
          const Icon = iconMap[item.icon] || FaShieldAlt;
          return (
            <motion.article
              key={item.title}
              role="listitem"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, type: 'spring', stiffness: 180 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass rounded-2xl p-5 flex items-start gap-4 cursor-default transition-all duration-300"
              style={{ borderColor: `${item.color}20` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${item.color}40`;
                e.currentTarget.style.boxShadow = `0 0 25px ${item.color}15`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${item.color}20`;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${item.color}18` }}
                aria-hidden="true"
              >
                <Icon size={20} style={{ color: item.color }} />
              </div>

              {/* Content */}
              <div>
                <h3 className="font-bold text-white text-sm leading-tight mb-1">{item.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{item.description}</p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
