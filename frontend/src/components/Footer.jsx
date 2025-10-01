import React from 'react';
import { Github, Linkedin, Mail, Download, Heart } from 'lucide-react';
import { socialLinks, resumeUrl } from '../utils/mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: socialLinks.github
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: socialLinks.linkedin
    },
    {
      icon: Download,
      label: 'Resume',
      href: resumeUrl
    },
    {
      icon: Mail,
      label: 'Email',
      href: `mailto:${socialLinks.email}`
    }
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center">
          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {footerLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-cyan-500/10 border border-slate-700 hover:border-cyan-500/50 rounded-lg text-gray-300 hover:text-cyan-400 transition-all duration-200"
                  aria-label={link.label}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{link.label}</span>
                </a>
              );
            })}
          </div>

          {/* Divider */}
          <div className="w-full max-w-md h-px bg-slate-800 mb-8" />

          {/* Copyright */}
          <div className="text-center space-y-3">
            <p className="text-gray-400 text-sm">
              © {currentYear} Prem B. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Open to internships & graduate roles
            </p>
            <p className="text-gray-500 text-xs flex items-center justify-center gap-1">
              Built with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> using React & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;