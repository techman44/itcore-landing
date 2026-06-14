"use client";

import { motion } from "framer-motion";
import { Mail, Phone, ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/effects/AnimatedSection";
import { useContactWizard } from "@/components/ContactWizardContext";

export function Contact() {
  const { openWizard } = useContactWizard();

  return (
    <section id="contact" className="py-24 md:py-32 bg-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to <span className="gradient-text">Get Started</span>?
          </h2>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
            Let&apos;s discuss how we can help your business reclaim hours lost to
            repetitive tasks.
          </p>
        </AnimatedSection>

        {/* Big CTA Button */}
        <AnimatedSection delay={0.2} className="text-center mb-16">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={openWizard}
              className="text-xl px-12 py-6 h-auto gap-3 shadow-2xl shadow-accent-orange/30 hover:shadow-accent-orange/50 transition-all"
            >
              <MessageSquare className="w-6 h-6" />
              Start a Conversation
              <ArrowRight className="w-6 h-6" />
            </Button>
          </motion.div>
          <p className="text-foreground-muted text-sm mt-4">
            Answer a few quick questions and we&apos;ll get back to you within 24 hours
          </p>
        </AnimatedSection>

        {/* Alternative Contact Methods */}
        <AnimatedSection delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            <a
              href="mailto:hello@itcore.ai"
              className="flex items-center gap-3 p-4 rounded-xl bg-card/50 border border-card-border hover:border-accent-primary/50 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5 text-accent-primary" />
              </div>
              <div className="text-left">
                <div className="text-sm text-foreground-muted">Email us directly</div>
                <div className="font-medium">hello@itcore.ai</div>
              </div>
            </a>

            <a
              href="tel:+1234567890"
              className="flex items-center gap-3 p-4 rounded-xl bg-card/50 border border-card-border hover:border-accent-secondary/50 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-accent-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5 text-accent-secondary" />
              </div>
              <div className="text-left">
                <div className="text-sm text-foreground-muted">Give us a call</div>
                <div className="font-medium">Mon-Fri, 9am-5pm</div>
              </div>
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
