"use client";

import { motion } from "framer-motion";
import { Bot, Server, Globe, ArrowRight } from "lucide-react";
import { AnimatedSection, StaggeredChildren, StaggeredItem } from "@/components/effects/AnimatedSection";

const services = [
  {
    icon: Bot,
    title: "AI Workflow Automation",
    description:
      "We analyze your processes, identify bottlenecks, and implement intelligent automation that works while you sleep. From data entry to complex decision trees.",
    features: [
      "Process analysis and optimization",
      "Custom automation workflows",
      "AI-powered decision making",
      "Seamless tool integration",
    ],
    gradient: "from-teal-500/20 to-cyan-500/20",
    borderHover: "hover:border-teal-500/50",
  },
  {
    icon: Server,
    title: "IT & Network Infrastructure",
    description:
      "From managed services to network architecture, we keep your technology running smoothly so you can focus on growth. Proactive monitoring and support.",
    features: [
      "Managed IT services",
      "Network design and security",
      "Cloud infrastructure",
      "24/7 monitoring and support",
    ],
    gradient: "from-violet-500/20 to-purple-500/20",
    borderHover: "hover:border-violet-500/50",
  },
  {
    icon: Globe,
    title: "Web Design & Hosting",
    description:
      "Modern websites backed by reliable hosting. Fast, secure, and designed to convert visitors into customers. Performance-optimized for any scale.",
    features: [
      "Custom website development",
      "Performance optimization",
      "Secure managed hosting",
      "Ongoing maintenance",
    ],
    gradient: "from-rose-500/20 to-pink-500/20",
    borderHover: "hover:border-rose-500/50",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What We <span className="gradient-text">Do</span>
          </h2>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
            Comprehensive technology services designed to streamline your operations
            and drive growth.
          </p>
        </AnimatedSection>

        <StaggeredChildren className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <StaggeredItem key={index}>
              <motion.div
                className={`relative h-full p-8 rounded-2xl bg-card border border-card-border group ${service.borderHover} transition-all duration-300`}
                whileHover={{ y: -8 }}
              >
                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br ${service.gradient}`}
                />

                <div className="relative">
                  {/* Icon */}
                  <motion.div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <service.icon className="w-7 h-7 text-foreground" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>

                  {/* Description */}
                  <p className="text-foreground-muted mb-6">{service.description}</p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-foreground-muted"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <motion.a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-accent-primary font-medium group/link"
                    whileHover={{ x: 5 }}
                  >
                    Learn more
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </motion.a>
                </div>
              </motion.div>
            </StaggeredItem>
          ))}
        </StaggeredChildren>
      </div>
    </section>
  );
}
