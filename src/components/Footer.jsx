import { FaGithub, FaLinkedin, FaEnvelope, FaShieldAlt, FaHeart } from 'react-icons/fa';
import { personalInfo } from '../data/portfolioData';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#projects', label: 'Projects' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#contact', label: 'Contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative z-10 border-t border-cyan-500/10"
      style={{ background: 'rgba(2,8,23,0.95)' }}
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <FaShieldAlt className="text-white text-sm" aria-hidden="true" />
              </div>
              <span className="font-bold text-white font-mono text-sm">
                <span className="gradient-text">ML</span>
                <span className="text-slate-400">.ilagan</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Computer Science student passionate about cybersecurity, data science, and building
              innovative technology solutions.
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer navigation">
            <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-1.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-slate-500 hover:text-cyan-400 text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">
              Connect
            </h3>
            <div className="space-y-2">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 text-slate-500 hover:text-cyan-400 text-sm transition-colors"
                aria-label="Send email"
              >
                <FaEnvelope size={13} aria-hidden="true" />
                {personalInfo.email}
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-500 hover:text-cyan-400 text-sm transition-colors"
                aria-label="GitHub profile"
              >
                <FaGithub size={13} aria-hidden="true" />
                github.com/McLloydIlagan
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-500 hover:text-cyan-400 text-sm transition-colors"
                aria-label="LinkedIn profile"
              >
                <FaLinkedin size={13} aria-hidden="true" />
                LinkedIn Profile
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-600 text-xs font-mono">
            © {year} Mc Lloyd Silverio Ilagan. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs flex items-center gap-1.5">
            Built with{' '}
            <FaHeart className="text-red-500 text-xs" aria-label="love" />
            {' '}using React, Tailwind CSS & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
