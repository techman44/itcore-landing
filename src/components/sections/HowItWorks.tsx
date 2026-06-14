"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Search, Lightbulb, Rocket, CheckCircle, ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/effects/AnimatedSection";

const steps = [
  {
    icon: Search,
    title: "Discover",
    shortDesc: "We learn about your business",
    description:
      "We audit your current processes and identify automation opportunities. No cookie-cutter solutions - we understand your unique workflows.",
    details: [
      "In-depth process analysis",
      "Identify bottlenecks & inefficiencies",
      "Map integration opportunities",
      "Define success metrics",
    ],
    color: "from-teal-500 to-cyan-500",
    iconColor: "#14b8a6",
    glowColor: "rgba(20, 184, 166, 0.3)",
  },
  {
    icon: Lightbulb,
    title: "Design",
    shortDesc: "We craft the perfect solution",
    description:
      "Custom solutions tailored to your specific needs. We choose the right tools and build workflows that integrate seamlessly with your existing systems.",
    details: [
      "Custom workflow architecture",
      "Tool & platform selection",
      "Integration planning",
      "Timeline & milestone mapping",
    ],
    color: "from-orange-500 to-amber-500",
    iconColor: "#f97316",
    glowColor: "rgba(249, 115, 22, 0.3)",
  },
  {
    icon: Rocket,
    title: "Deploy",
    shortDesc: "We bring it to life",
    description:
      "Seamless implementation with thorough testing. We provide training and ongoing support to ensure long-term success.",
    details: [
      "Phased implementation",
      "Comprehensive testing",
      "Team training & documentation",
      "Ongoing support & optimization",
    ],
    color: "from-violet-500 to-purple-500",
    iconColor: "#8b5cf6",
    glowColor: "rgba(139, 92, 246, 0.3)",
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-background-secondary relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
            A straightforward process designed to deliver results quickly and
            efficiently.
          </p>
        </AnimatedSection>

        <div ref={ref} className="relative">
          {/* Connection line - desktop */}
          <div className="hidden lg:block absolute top-32 left-[16.67%] right-[16.67%] h-1 bg-card-border rounded-full">
            <motion.div
              className="h-full bg-gradient-to-r from-teal-500 via-orange-500 to-violet-500 rounded-full"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
              style={{ transformOrigin: "left" }}
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                className="relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <motion.div
                  className="relative bg-card border border-card-border rounded-2xl p-6 lg:p-8 cursor-pointer overflow-hidden"
                  animate={{
                    scale: hoveredIndex === index ? 1.02 : 1,
                    y: hoveredIndex === index ? -8 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Animated gradient border on hover */}
                  <motion.div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-0`}
                    animate={{ opacity: hoveredIndex === index ? 0.1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Glow effect on hover */}
                  <motion.div
                    className={`absolute -inset-1 rounded-2xl bg-gradient-to-br ${step.color} blur-xl opacity-0`}
                    animate={{ opacity: hoveredIndex === index ? 0.2 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  <div className="relative">
                    {/* Icon and number */}
                    <div className="flex items-center gap-4 mb-6">
                      <motion.div
                        className="relative w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-card-border"
                        style={{
                          background: `linear-gradient(135deg, ${step.glowColor} 0%, transparent 100%)`,
                        }}
                        animate={{
                          scale: hoveredIndex === index ? 1.1 : 1,
                          boxShadow: hoveredIndex === index
                            ? `0 0 30px ${step.glowColor}, 0 0 60px ${step.glowColor}`
                            : `0 0 0px transparent`,
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <motion.div
                          animate={{
                            rotate: hoveredIndex === index ? 360 : 0,
                          }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                        >
                          <step.icon
                            className="w-8 h-8"
                            style={{ color: step.iconColor }}
                          />
                        </motion.div>

                        {/* Animated ring on hover */}
                        <AnimatePresence>
                          {hoveredIndex === index && (
                            <>
                              <motion.div
                                className="absolute inset-0 rounded-2xl border-2"
                                style={{ borderColor: step.iconColor }}
                                initial={{ scale: 1, opacity: 0.8 }}
                                animate={{ scale: 1.4, opacity: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "easeOut" }}
                              />
                              <motion.div
                                className="absolute inset-0 rounded-2xl border"
                                style={{ borderColor: step.iconColor }}
                                initial={{ scale: 1, opacity: 0.5 }}
                                animate={{ scale: 1.2, opacity: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
                              />
                            </>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {/* Step number */}
                      <div className="flex flex-col">
                        <motion.span
                          className="text-sm font-medium"
                          animate={{
                            color: hoveredIndex === index ? step.iconColor : "var(--foreground-muted)",
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          Step {index + 1}
                        </motion.span>
                        <motion.h3
                          className="text-2xl font-bold"
                          animate={{
                            color: hoveredIndex === index ? step.iconColor : "var(--foreground)",
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {step.title}
                        </motion.h3>
                      </div>
                    </div>

                    {/* Short description (always visible) */}
                    <p className="text-foreground-muted mb-4">{step.shortDesc}</p>

                    {/* Expandable content */}
                    <AnimatePresence>
                      {hoveredIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="text-foreground-muted text-sm mb-4 border-t border-card-border pt-4">
                            {step.description}
                          </p>

                          <ul className="space-y-2">
                            {step.details.map((detail, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-2 text-sm"
                              >
                                <CheckCircle
                                  className="w-4 h-4"
                                  style={{ color: step.iconColor }}
                                />
                                <span className="text-foreground-muted">{detail}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Hover indicator */}
                    <motion.div
                      className="flex items-center gap-2 mt-4 text-sm font-medium"
                      animate={{
                        opacity: hoveredIndex === index ? 0 : 0.5,
                      }}
                    >
                      <span className="text-foreground-muted">Hover to learn more</span>
                      <ArrowRight className="w-4 h-4 text-foreground-muted" />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
