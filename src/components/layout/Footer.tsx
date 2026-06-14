"use client";

import { motion } from "framer-motion";
import { Facebook, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const socialLinks = [
  {
    href: "https://www.facebook.com/profile.php?id=61585001011373",
    icon: Facebook,
    label: "Facebook",
  },
  {
    href: "https://www.linkedin.com/company/107534988",
    icon: Linkedin,
    label: "LinkedIn",
  },
];

const footerLinks = [
  {
    title: "Services",
    links: [
      { href: "#services", label: "AI Automation" },
      { href: "#services", label: "IT Infrastructure" },
      { href: "#services", label: "Web Design" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#how-it-works", label: "How It Works" },
      { href: "#why-us", label: "Why Choose Us" },
      { href: "#contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-secondary border-t border-card-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="#" className="inline-block mb-4">
              <span className="text-2xl font-bold">
                <span className="gradient-text">ITCore</span>
                <span className="text-foreground-muted">.AI</span>
              </span>
            </a>
            <p className="text-foreground-muted max-w-md mb-6">
              AI Workflow Automation Experts. We help businesses streamline
              operations, reduce manual work, and focus on what truly matters.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-card border border-card-border flex items-center justify-center text-foreground-muted hover:text-accent-primary hover:border-accent-primary transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-foreground mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-foreground-muted hover:text-accent-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-card-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-foreground-muted text-sm">
            &copy; {currentYear} ITCore.AI. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a
              href="#"
              className="text-foreground-muted hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-foreground-muted hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
