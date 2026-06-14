"use client";

import { motion } from "framer-motion";
import { Check, Users, Wrench, HeartHandshake, BarChart3, Building2 } from "lucide-react";
import { AnimatedSection, StaggeredChildren, StaggeredItem } from "@/components/effects/AnimatedSection";

const reasons = [
  {
    icon: Building2,
    title: "Enterprise DNA",
    description:
      "Founded by a tech veteran with 15 years building products at Facebook and Uber across APAC.",
  },
  {
    icon: BarChart3,
    title: "Prove Your ROI",
    description:
      "Our customer dashboard tracks every hour reclaimed - see exactly what you're getting, not vague promises.",
  },
  {
    icon: Wrench,
    title: "Technology-Agnostic",
    description:
      "We use the best tools for your specific needs, not just what's trending.",
  },
  {
    icon: HeartHandshake,
    title: "Partnership, Not Projects",
    description:
      "We're invested in your long-term success, providing ongoing support and optimization.",
  },
];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <AnimatedSection direction="left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="gradient-text">ITCore.AI</span>?
            </h2>
            <p className="text-lg text-foreground-muted mb-8">
              Built on 15 years of experience at Facebook and Uber, we bring
              enterprise-grade automation to SMBs - with a dashboard that proves
              every hour we save you.
            </p>

            <StaggeredChildren className="space-y-6">
              {reasons.map((reason, index) => (
                <StaggeredItem key={index}>
                  <motion.div
                    className="flex gap-4 group"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <reason.icon className="w-6 h-6 text-accent-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{reason.title}</h3>
                      <p className="text-foreground-muted text-sm">
                        {reason.description}
                      </p>
                    </div>
                  </motion.div>
                </StaggeredItem>
              ))}
            </StaggeredChildren>
          </AnimatedSection>

          {/* Right: Visual */}
          <AnimatedSection direction="right" delay={0.2}>
            <div className="relative">
              {/* Main card */}
              <motion.div
                className="p-8 rounded-2xl bg-card border border-card-border"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-xl font-bold mb-6">
                  What You Get With Us
                </h3>
                <ul className="space-y-4">
                  {[
                    "Real-time ROI dashboard",
                    "Track hours reclaimed weekly",
                    "Dedicated project manager",
                    "Transparent communication",
                    "Training and knowledge transfer",
                    "Ongoing optimization",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-primary/20 flex items-center justify-center">
                        <Check className="w-4 h-4 text-accent-primary" />
                      </div>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute -z-10 -top-4 -right-4 w-full h-full rounded-2xl border border-accent-primary/20" />
              <div className="absolute -z-20 -top-8 -right-8 w-full h-full rounded-2xl border border-accent-secondary/10" />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
