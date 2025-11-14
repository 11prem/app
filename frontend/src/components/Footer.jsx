import React from 'react';
import { Github, Linkedin, Mail, Download, Heart } from 'lucide-react';
import { socialLinks, resumeUrl } from '../utils/mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Get social links from the array
  const githubLink = socialLinks.find(link => link.name === 'GitHub');
  const linkedinLink = socialLinks.find(link => link.name === 'LinkedIn');
  const emailLink = socialLinks.find(link => link.name === 'Email');

  const footerLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: githubLink?.url || '#'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: linkedinLink?.url || '#'
    },
    {
      icon: Download,
      label: 'Resume',
      href: resumeUrl
    },
    {
      icon: Mail,
      label: 'Email',
      href: emailLink?.url || 'mailto:prem112004@gmail.com'
    }
  ];

  return (
    <footer className="relative bg-slate-900 border-t border-slate-800 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          {/* Social Links */}
          <div className="flex gap-4 mb-8">
            {footerLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target={link.label === 'Resume' ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-500/50 border border-slate-700 transition-all group"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-400 text-sm flex items-center gap-2">
              Made with <Heart className="w-4 h-4 text-red-500" /> by Prem B
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;