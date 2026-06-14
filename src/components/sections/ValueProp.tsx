"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, TrendingUp, Zap } from "lucide-react";
import { AnimatedSection, StaggeredChildren, StaggeredItem } from "@/components/effects/AnimatedSection";

function CountUp({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  {
    icon: Clock,
    value: 15,
    suffix: "+",
    label: "Hours Saved Per Employee Weekly",
    description: "Reclaim time spent on repetitive tasks",
  },
  {
    icon: TrendingUp,
    value: 70,
    suffix: "%",
    label: "Reduction in Manual Work",
    description: "Automate data entry, reporting, and more",
  },
  {
    icon: Zap,
    value: 24,
    suffix: "/7",
    label: "Automated Workflows Running",
    description: "Your systems work while you sleep",
  },
];

export function ValueProp() {
  return (
    <section className="py-24 md:py-32 bg-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Give Your Team <span className="gradient-text">Time Back</span>
          </h2>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
            Most employees spend the majority of their day on tasks that could be
            automated. We change that.
          </p>
        </AnimatedSection>

        <StaggeredChildren className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <StaggeredItem key={index}>
              <motion.div
                className="relative p-8 rounded-2xl bg-card border border-card-border group hover:border-accent-primary/50 transition-colors"
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5" />

                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 flex items-center justify-center mb-6">
                    <stat.icon className="w-6 h-6 text-accent-primary" />
                  </div>

                  <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>

                  <h3 className="text-lg font-semibold mb-2">{stat.label}</h3>
                  <p className="text-foreground-muted">{stat.description}</p>
                </div>
              </motion.div>
            </StaggeredItem>
          ))}
        </StaggeredChildren>

        {/* Before/After Visual */}
        <AnimatedSection delay={0.3} className="mt-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Before */}
            <div className="p-6 rounded-2xl bg-card border border-card-border">
              <div className="text-sm font-medium text-red-400 mb-4">Before</div>
              <div className="space-y-3">
                {[
                  "Manual data entry across systems",
                  "Hours spent on repetitive reports",
                  "Missed follow-ups and deadlines",
                  "Scattered information silos",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-foreground-muted">
                    <div className="w-2 h-2 rounded-full bg-red-400/50" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* After */}
            <div className="p-6 rounded-2xl bg-card border border-accent-primary/30 glow">
              <div className="text-sm font-medium text-accent-primary mb-4">After</div>
              <div className="space-y-3">
                {[
                  "Data flows automatically between tools",
                  "Reports generate themselves",
                  "Automatic reminders and task creation",
                  "Single source of truth",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-foreground">
                    <div className="w-2 h-2 rounded-full bg-accent-primary" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
