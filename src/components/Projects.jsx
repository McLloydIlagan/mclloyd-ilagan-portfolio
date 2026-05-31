import { motion } from 'framer-motion';
import {
  FaGamepad,
  FaMapMarkedAlt,
  FaBuilding,
  FaChartLine,
  FaBookOpen,
  FaClipboardList,
  FaMobileAlt,
  FaGlobeAsia,
  FaGithub,
  FaExternalLinkAlt,
} from 'react-icons/fa';
import SectionWrapper, { SectionTitle } from './SectionWrapper';
import { projects } from '../data/portfolioData';

const iconMap = { FaGamepad, FaMapMarkedAlt, FaBuilding, FaChartLine, FaBookOpen, FaClipboardList, FaMobileAlt, FaGlobeAsia };

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export default function Projects() {
  return (
    <SectionWrapper id="projects">
      <SectionTitle
        id="projects-heading"
        label="// projects"
        title="Featured Projects"
        subtitle="A selection of projects showcasing skills in Python, web development, data analytics, and algorithms."
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid sm:grid-cols-2 gap-6"
        role="list"
        aria-label="Project portfolio"
      >
        {projects.map((project) => {
          const Icon = iconMap[project.icon] || FaChartLine;
          return (
            <motion.article
              key={project.title}
              role="listitem"
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="glass rounded-2xl overflow-hidden flex flex-col transition-all duration-300 group"
              style={{ borderColor: `${project.color}20` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${project.color}40`;
                e.currentTarget.style.boxShadow = `0 0 35px ${project.color}15`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${project.color}20`;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Top accent bar */}
              <div
                className="h-1 w-full"
                style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
                aria-hidden="true"
              />

              <div className="p-6 sm:p-7 flex flex-col gap-4 flex-1">
                {/* Icon + Title */}
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: `${project.color}18` }}
                    aria-hidden="true"
                  >
                    <Icon size={22} style={{ color: project.color }} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white leading-tight">{project.title}</h3>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-2 py-0.5 rounded-full font-mono"
                          style={{ background: `${project.color}15`, color: project.color }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed">{project.description}</p>

                {/* Highlights */}
                <ul className="space-y-1.5" aria-label="Project highlights">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-xs text-slate-500">
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: project.color }}
                        aria-hidden="true"
                      />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Footer */}
                <div className="mt-auto pt-3 flex items-center gap-3 border-t border-slate-800">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <FaGithub size={14} aria-hidden="true" />
                    View Code
                  </a>
                  <span className="text-slate-700" aria-hidden="true">|</span>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
                    aria-label={`View ${project.title} live demo`}
                  >
                    <FaExternalLinkAlt size={12} aria-hidden="true" />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
