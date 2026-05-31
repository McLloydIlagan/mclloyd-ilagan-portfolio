import { motion } from 'framer-motion';
import {
  FaShieldAlt,
  FaCode,
  FaDatabase,
  FaTools,
  FaCheckCircle,
} from 'react-icons/fa';
import SectionWrapper, { SectionTitle } from './SectionWrapper';
import { skillCategories } from '../data/portfolioData';

const iconMap = {
  FaShieldAlt,
  FaCode,
  FaDatabase,
  FaTools,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export default function Skills() {
  return (
    <SectionWrapper id="skills">
      <SectionTitle
        id="skills-heading"
        label="// skills"
        title="Technical Skills"
        subtitle="A comprehensive toolkit spanning cybersecurity, programming, databases, and development tools."
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6"
        role="list"
        aria-label="Skill categories"
      >
        {skillCategories.map((cat) => {
          const Icon = iconMap[cat.icon] || FaCode;
          return (
            <motion.article
              key={cat.id}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass rounded-2xl p-6 flex flex-col gap-4 cursor-default transition-all duration-300"
              style={{
                borderColor: `${cat.color}20`,
                boxShadow: `0 0 0 0 ${cat.color}00`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 30px ${cat.color}18`;
                e.currentTarget.style.borderColor = `${cat.color}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 0 0 0 ${cat.color}00`;
                e.currentTarget.style.borderColor = `${cat.color}20`;
              }}
              role="listitem"
              aria-label={`${cat.title} skills`}
            >
              {/* Header */}
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${cat.color}18` }}
                  aria-hidden="true"
                >
                  <Icon size={22} style={{ color: cat.color }} />
                </div>
                <h3 className="font-bold text-white text-base">{cat.title}</h3>
              </div>

              {/* Divider */}
              <div
                className="h-px w-full rounded"
                style={{ background: `linear-gradient(90deg, ${cat.color}40, transparent)` }}
                aria-hidden="true"
              />

              {/* Skills list */}
              <ul className="space-y-2.5" aria-label={`${cat.title} skill list`}>
                {cat.skills.map((skill, i) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * i }}
                    className="flex items-center gap-2.5 group"
                  >
                    <FaCheckCircle
                      size={11}
                      style={{ color: cat.color }}
                      className="shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"
                      aria-hidden="true"
                    />
                    <span className="text-slate-400 text-sm group-hover:text-slate-200 transition-colors">
                      {skill}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* Count badge */}
              <div className="mt-auto pt-2">
                <span
                  className="text-xs font-mono px-2 py-1 rounded-full"
                  style={{
                    background: `${cat.color}15`,
                    color: cat.color,
                  }}
                >
                  {cat.skills.length} skills
                </span>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
