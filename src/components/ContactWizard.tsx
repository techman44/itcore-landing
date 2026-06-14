"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft, Bot, Cpu, ShieldCheck, Server, Globe, Send, CheckCircle, Clock, Zap, HelpCircle, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ContactWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

type ServiceType = "automation" | "agents" | "security" | "infrastructure" | "web" | null;

interface FormData {
  service: ServiceType;
  serviceOther: string;
  // Automation questions
  automationGoal: string;
  automationProcesses: string;
  automationTools: string;
  // AI Agents questions
  agentsGoal: string;
  agentsUseCase: string;
  agentsIntegration: string;
  // Security questions
  securityGoal: string;
  securityCurrent: string;
  securityUrgency: string;
  // Infrastructure questions
  infraNeed: string;
  infraSize: string;
  infraUrgency: string;
  // Web questions
  webType: string;
  webFeatures: string;
  webTimeline: string;
  webCurrentSite: string;
  webBudget: string;
  // Contact info
  name: string;
  email: string;
  phone: string;
  businessName: string;
  message: string;
}

const initialFormData: FormData = {
  service: null,
  serviceOther: "",
  automationGoal: "",
  automationProcesses: "",
  automationTools: "",
  agentsGoal: "",
  agentsUseCase: "",
  agentsIntegration: "",
  securityGoal: "",
  securityCurrent: "",
  securityUrgency: "",
  infraNeed: "",
  infraSize: "",
  infraUrgency: "",
  webType: "",
  webFeatures: "",
  webTimeline: "",
  webCurrentSite: "",
  webBudget: "",
  name: "",
  email: "",
  phone: "",
  businessName: "",
  message: "",
};

export function ContactWizard({ isOpen, onClose }: ContactWizardProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalSteps = 4;

  const updateForm = (field: keyof FormData, value: string | ServiceType) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
      if (webhookUrl) {
        // Collect client info
        const clientInfo = {
          userAgent: navigator.userAgent,
          language: navigator.language,
          languages: navigator.languages,
          platform: navigator.platform,
          screenWidth: window.screen.width,
          screenHeight: window.screen.height,
          windowWidth: window.innerWidth,
          windowHeight: window.innerHeight,
          colorDepth: window.screen.colorDepth,
          pixelRatio: window.devicePixelRatio,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          timezoneOffset: new Date().getTimezoneOffset(),
          referrer: document.referrer || "direct",
          currentUrl: window.location.href,
          cookiesEnabled: navigator.cookieEnabled,
          onLine: navigator.onLine,
          touchSupport: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
        };

        await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Webhook-Auth": process.env.NEXT_PUBLIC_WEBHOOK_AUTH || "",
          },
          body: JSON.stringify({
            form: formData,
            client: clientInfo,
            meta: {
              submittedAt: new Date().toISOString(),
              source: "itcore-contact-wizard",
              version: "1.0",
            },
          }),
        });
      }
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset after animation
    setTimeout(() => {
      setStep(1);
      setFormData(initialFormData);
      setIsSubmitted(false);
    }, 300);
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.service !== null || formData.serviceOther.trim() !== "";
      case 2:
        if (formData.service === "automation") {
          return formData.automationGoal !== "" || formData.automationProcesses.trim() !== "";
        }
        if (formData.service === "agents") {
          return formData.agentsGoal !== "" || formData.agentsUseCase.trim() !== "";
        }
        if (formData.service === "security") {
          return formData.securityGoal !== "" || formData.securityCurrent.trim() !== "";
        }
        if (formData.service === "infrastructure") {
          return formData.infraNeed !== "" || formData.infraSize.trim() !== "";
        }
        if (formData.service === "web") {
          return formData.webType !== "" || formData.webFeatures.trim() !== "";
        }
        return true;
      case 3:
        return true; // Optional details
      case 4:
        return formData.name.trim() !== "" && formData.email.trim() !== "";
      default:
        return true;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg bg-card border border-card-border rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-card-hover transition-colors z-10"
          >
            <X className="w-5 h-5 text-foreground-muted" />
          </button>

          {/* Progress bar */}
          {!isSubmitted && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-card-border">
              <motion.div
                className="h-full bg-gradient-to-r from-accent-primary to-accent-orange"
                initial={{ width: 0 }}
                animate={{ width: `${(step / totalSteps) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}

          <div className="p-8 pt-12">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <SuccessScreen onClose={handleClose} />
              ) : (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {step === 1 && (
                    <Step1ServiceSelect formData={formData} updateForm={updateForm} />
                  )}
                  {step === 2 && (
                    <Step2Details formData={formData} updateForm={updateForm} />
                  )}
                  {step === 3 && (
                    <Step3MoreDetails formData={formData} updateForm={updateForm} />
                  )}
                  {step === 4 && (
                    <Step4Contact formData={formData} updateForm={updateForm} />
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            {!isSubmitted && (
              <div className="flex justify-between mt-8 pt-6 border-t border-card-border">
                <Button
                  variant="ghost"
                  onClick={step === 1 ? handleClose : prevStep}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {step === 1 ? "Cancel" : "Back"}
                </Button>

                {step < totalSteps ? (
                  <Button
                    variant="primary"
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className="gap-2"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={!canProceed() || isSubmitting}
                    className="gap-2"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="w-4 h-4" />
                  </Button>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Reusable OptionCard component with icon
function OptionCard({
  icon: Icon,
  title,
  description,
  selected,
  onClick,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`w-full p-4 rounded-xl border text-left transition-all flex items-center gap-4 ${
        selected
          ? "border-accent-primary bg-accent-primary/10"
          : "border-card-border hover:border-accent-primary/50 hover:bg-card-hover"
      }`}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
          selected
            ? "bg-accent-primary text-background"
            : "bg-card-hover text-foreground-muted"
        }`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-foreground-muted">{description}</div>
      </div>
    </motion.button>
  );
}

// Step Components
function Step1ServiceSelect({
  formData,
  updateForm,
}: {
  formData: FormData;
  updateForm: (field: keyof FormData, value: string | ServiceType) => void;
}) {
  const services: { id: ServiceType; icon: LucideIcon; title: string; description: string }[] = [
    {
      id: "automation",
      icon: Bot,
      title: "AI Workflow Automation",
      description: "Automate repetitive tasks and workflows",
    },
    {
      id: "agents",
      icon: Cpu,
      title: "Custom AI Agents",
      description: "Build intelligent AI assistants for your team",
    },
    {
      id: "security",
      icon: ShieldCheck,
      title: "AI Security & Insights",
      description: "Vulnerability scanning and business intelligence",
    },
    {
      id: "infrastructure",
      icon: Server,
      title: "Managed Infrastructure",
      description: "Networks, servers, and IT support",
    },
    {
      id: "web",
      icon: Globe,
      title: "Web Design & Hosting",
      description: "Websites and online presence",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">How can we help you?</h2>
      <p className="text-foreground-muted mb-6">
        Select the service you&apos;re most interested in
      </p>

      <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
        {services.map((service) => (
          <OptionCard
            key={service.id}
            icon={service.icon}
            title={service.title}
            description={service.description}
            selected={formData.service === service.id}
            onClick={() => {
              updateForm("service", service.id);
              updateForm("serviceOther", "");
            }}
          />
        ))}
      </div>

      <div className="mt-4">
        <label className="block text-sm text-foreground-muted mb-2">
          Or describe what you need:
        </label>
        <input
          type="text"
          value={formData.serviceOther}
          onChange={(e) => {
            updateForm("serviceOther", e.target.value);
            if (e.target.value) updateForm("service", null);
          }}
          placeholder="Something else..."
          className="w-full px-4 py-3 rounded-xl bg-background border border-card-border focus:border-accent-primary focus:outline-none transition-colors"
        />
      </div>
    </div>
  );
}

function Step2Details({
  formData,
  updateForm,
}: {
  formData: FormData;
  updateForm: (field: keyof FormData, value: string) => void;
}) {
  if (formData.service === "automation") {
    const goals: { id: string; icon: LucideIcon; title: string; description: string }[] = [
      { id: "save-time", icon: Clock, title: "Save Time", description: "Reduce repetitive manual tasks" },
      { id: "data-entry", icon: Bot, title: "Data Entry", description: "Automate data input and transfers" },
      { id: "connect-tools", icon: Zap, title: "Connect Tools", description: "Integrate different systems" },
      { id: "reports", icon: CheckCircle, title: "Auto Reports", description: "Generate reports automatically" },
    ];

    return (
      <div>
        <h2 className="text-2xl font-bold mb-2">What&apos;s your main goal?</h2>
        <p className="text-foreground-muted mb-6">
          Help us understand what you want to achieve
        </p>

        <div className="space-y-3">
          {goals.map((goal) => (
            <OptionCard
              key={goal.id}
              icon={goal.icon}
              title={goal.title}
              description={goal.description}
              selected={formData.automationGoal === goal.id}
              onClick={() => updateForm("automationGoal", goal.id)}
            />
          ))}
        </div>

        <TextInput
          label="Or tell us more:"
          value={formData.automationProcesses}
          onChange={(v) => updateForm("automationProcesses", v)}
          placeholder="Describe the processes you want to automate..."
        />
      </div>
    );
  }

  if (formData.service === "agents") {
    const goals: { id: string; icon: LucideIcon; title: string; description: string }[] = [
      { id: "customer-support", icon: HelpCircle, title: "Customer Support", description: "AI assistant for customer queries" },
      { id: "internal-assistant", icon: Cpu, title: "Internal Assistant", description: "Help employees with tasks" },
      { id: "data-analysis", icon: Zap, title: "Data Analysis", description: "AI that analyzes and summarizes data" },
      { id: "content-creation", icon: Bot, title: "Content Creation", description: "Generate content and documents" },
    ];

    return (
      <div>
        <h2 className="text-2xl font-bold mb-2">What type of AI agent?</h2>
        <p className="text-foreground-muted mb-6">
          Tell us what you need the AI agent to do
        </p>

        <div className="space-y-3">
          {goals.map((goal) => (
            <OptionCard
              key={goal.id}
              icon={goal.icon}
              title={goal.title}
              description={goal.description}
              selected={formData.agentsGoal === goal.id}
              onClick={() => updateForm("agentsGoal", goal.id)}
            />
          ))}
        </div>

        <TextInput
          label="Or describe your use case:"
          value={formData.agentsUseCase}
          onChange={(v) => updateForm("agentsUseCase", v)}
          placeholder="Tell us what you have in mind..."
        />
      </div>
    );
  }

  if (formData.service === "security") {
    const goals: { id: string; icon: LucideIcon; title: string; description: string }[] = [
      { id: "vulnerability-scan", icon: ShieldCheck, title: "Vulnerability Scanning", description: "Find security weaknesses" },
      { id: "threat-detection", icon: Zap, title: "Threat Detection", description: "Monitor for suspicious activity" },
      { id: "compliance", icon: CheckCircle, title: "Compliance Review", description: "Meet security standards" },
      { id: "insights", icon: Bot, title: "Business Insights", description: "AI-powered analytics and reporting" },
    ];

    return (
      <div>
        <h2 className="text-2xl font-bold mb-2">What&apos;s your priority?</h2>
        <p className="text-foreground-muted mb-6">
          Select your main security or insights need
        </p>

        <div className="space-y-3">
          {goals.map((goal) => (
            <OptionCard
              key={goal.id}
              icon={goal.icon}
              title={goal.title}
              description={goal.description}
              selected={formData.securityGoal === goal.id}
              onClick={() => updateForm("securityGoal", goal.id)}
            />
          ))}
        </div>

        <TextInput
          label="Or describe your needs:"
          value={formData.securityCurrent}
          onChange={(v) => updateForm("securityCurrent", v)}
          placeholder="Tell us about your current security setup..."
        />
      </div>
    );
  }

  if (formData.service === "infrastructure") {
    const needs: { id: string; icon: LucideIcon; title: string; description: string }[] = [
      { id: "managed-it", icon: Server, title: "Managed IT Support", description: "Ongoing IT management" },
      { id: "network", icon: Zap, title: "Network Setup", description: "Design or upgrade networks" },
      { id: "cloud", icon: Globe, title: "Cloud Migration", description: "Move to cloud infrastructure" },
      { id: "security", icon: ShieldCheck, title: "Security Audit", description: "Assess and improve security" },
    ];

    return (
      <div>
        <h2 className="text-2xl font-bold mb-2">What do you need help with?</h2>
        <p className="text-foreground-muted mb-6">
          Select your primary infrastructure need
        </p>

        <div className="space-y-3">
          {needs.map((need) => (
            <OptionCard
              key={need.id}
              icon={need.icon}
              title={need.title}
              description={need.description}
              selected={formData.infraNeed === need.id}
              onClick={() => updateForm("infraNeed", need.id)}
            />
          ))}
        </div>

        <TextInput
          label="Or describe your situation:"
          value={formData.infraSize}
          onChange={(v) => updateForm("infraSize", v)}
          placeholder="Tell us about your current setup..."
        />
      </div>
    );
  }

  if (formData.service === "web") {
    const types: { id: string; icon: LucideIcon; title: string; description: string }[] = [
      { id: "new-site", icon: Globe, title: "New Website", description: "Build from scratch" },
      { id: "redesign", icon: Zap, title: "Redesign", description: "Refresh existing site" },
      { id: "ecommerce", icon: CheckCircle, title: "E-commerce", description: "Online store" },
      { id: "webapp", icon: Cpu, title: "Web Application", description: "Custom web app" },
    ];

    return (
      <div>
        <h2 className="text-2xl font-bold mb-2">What type of website?</h2>
        <p className="text-foreground-muted mb-6">
          Tell us about your web project
        </p>

        <div className="space-y-3">
          {types.map((type) => (
            <OptionCard
              key={type.id}
              icon={type.icon}
              title={type.title}
              description={type.description}
              selected={formData.webType === type.id}
              onClick={() => updateForm("webType", type.id)}
            />
          ))}
        </div>

        <TextInput
          label="Or describe your project:"
          value={formData.webFeatures}
          onChange={(v) => updateForm("webFeatures", v)}
          placeholder="Tell us what you have in mind..."
        />
      </div>
    );
  }

  // For "other" service
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Tell us more</h2>
      <p className="text-foreground-muted mb-6">
        What are you looking to achieve?
      </p>

      <textarea
        value={formData.message}
        onChange={(e) => updateForm("message", e.target.value)}
        placeholder="Describe your project or requirements..."
        rows={5}
        className="w-full px-4 py-3 rounded-xl bg-background border border-card-border focus:border-accent-primary focus:outline-none transition-colors resize-none"
      />
    </div>
  );
}

function Step3MoreDetails({
  formData,
  updateForm,
}: {
  formData: FormData;
  updateForm: (field: keyof FormData, value: string) => void;
}) {
  if (formData.service === "automation") {
    const tools: { id: string; icon: LucideIcon; title: string; description: string }[] = [
      { id: "cloud-apps", icon: Globe, title: "Cloud Apps", description: "Google, Microsoft, etc." },
      { id: "custom", icon: Cpu, title: "Custom Software", description: "Legacy or proprietary systems" },
      { id: "spreadsheets", icon: CheckCircle, title: "Spreadsheets", description: "Excel, Google Sheets" },
      { id: "unsure", icon: HelpCircle, title: "Not Sure", description: "Need guidance" },
    ];

    return (
      <div>
        <h2 className="text-2xl font-bold mb-2">Current tools & systems</h2>
        <p className="text-foreground-muted mb-6">
          What does your current setup look like?
        </p>

        <div className="space-y-3">
          {tools.map((tool) => (
            <OptionCard
              key={tool.id}
              icon={tool.icon}
              title={tool.title}
              description={tool.description}
              selected={formData.automationTools === tool.id}
              onClick={() => updateForm("automationTools", tool.id)}
            />
          ))}
        </div>

        <TextInput
          label="Any specific tools you use?"
          value={formData.automationProcesses}
          onChange={(v) => updateForm("automationProcesses", v)}
          placeholder="e.g., Salesforce, QuickBooks, Slack..."
        />
      </div>
    );
  }

  if (formData.service === "agents") {
    const integrations: { id: string; icon: LucideIcon; title: string; description: string }[] = [
      { id: "website", icon: Globe, title: "Website Chat", description: "Embed on your website" },
      { id: "slack-teams", icon: Zap, title: "Slack / Teams", description: "Internal messaging" },
      { id: "email", icon: Send, title: "Email", description: "Email-based interactions" },
      { id: "api", icon: Cpu, title: "API / Custom", description: "Integrate with your systems" },
    ];

    return (
      <div>
        <h2 className="text-2xl font-bold mb-2">Where will it be used?</h2>
        <p className="text-foreground-muted mb-6">
          How will people interact with the AI agent?
        </p>

        <div className="space-y-3">
          {integrations.map((integration) => (
            <OptionCard
              key={integration.id}
              icon={integration.icon}
              title={integration.title}
              description={integration.description}
              selected={formData.agentsIntegration === integration.id}
              onClick={() => updateForm("agentsIntegration", integration.id)}
            />
          ))}
        </div>

        <TextInput
          label="Anything else we should know?"
          value={formData.message}
          onChange={(v) => updateForm("message", v)}
          placeholder="Additional details..."
        />
      </div>
    );
  }

  if (formData.service === "security") {
    const urgency: { id: string; icon: LucideIcon; title: string; description: string }[] = [
      { id: "urgent", icon: Zap, title: "Urgent", description: "Need help ASAP" },
      { id: "soon", icon: Clock, title: "Within a Month", description: "Planning soon" },
      { id: "planning", icon: CheckCircle, title: "Planning Ahead", description: "No immediate rush" },
      { id: "exploring", icon: HelpCircle, title: "Just Exploring", description: "Gathering information" },
    ];

    return (
      <div>
        <h2 className="text-2xl font-bold mb-2">What&apos;s your timeline?</h2>
        <p className="text-foreground-muted mb-6">
          When do you need this completed?
        </p>

        <div className="space-y-3">
          {urgency.map((u) => (
            <OptionCard
              key={u.id}
              icon={u.icon}
              title={u.title}
              description={u.description}
              selected={formData.securityUrgency === u.id}
              onClick={() => updateForm("securityUrgency", u.id)}
            />
          ))}
        </div>

        <TextInput
          label="Anything else we should know?"
          value={formData.message}
          onChange={(v) => updateForm("message", v)}
          placeholder="Additional details..."
        />
      </div>
    );
  }

  if (formData.service === "infrastructure") {
    const urgency: { id: string; icon: LucideIcon; title: string; description: string }[] = [
      { id: "urgent", icon: Zap, title: "Urgent", description: "Need help ASAP" },
      { id: "soon", icon: Clock, title: "Within a Month", description: "Planning soon" },
      { id: "planning", icon: CheckCircle, title: "Planning Ahead", description: "No immediate rush" },
      { id: "exploring", icon: HelpCircle, title: "Just Exploring", description: "Gathering information" },
    ];

    return (
      <div>
        <h2 className="text-2xl font-bold mb-2">What&apos;s your timeline?</h2>
        <p className="text-foreground-muted mb-6">
          When do you need this completed?
        </p>

        <div className="space-y-3">
          {urgency.map((u) => (
            <OptionCard
              key={u.id}
              icon={u.icon}
              title={u.title}
              description={u.description}
              selected={formData.infraUrgency === u.id}
              onClick={() => updateForm("infraUrgency", u.id)}
            />
          ))}
        </div>

        <TextInput
          label="Anything else we should know?"
          value={formData.message}
          onChange={(v) => updateForm("message", v)}
          placeholder="Additional details..."
        />
      </div>
    );
  }

  if (formData.service === "web") {
    const timelines: { id: string; icon: LucideIcon; title: string; description: string }[] = [
      { id: "asap", icon: Zap, title: "ASAP", description: "As soon as possible" },
      { id: "1-2-months", icon: Clock, title: "1-2 Months", description: "Near-term project" },
      { id: "3-6-months", icon: CheckCircle, title: "3-6 Months", description: "Planning ahead" },
      { id: "no-rush", icon: HelpCircle, title: "No Rush", description: "Just exploring" },
    ];

    return (
      <div>
        <h2 className="text-2xl font-bold mb-2">Project timeline</h2>
        <p className="text-foreground-muted mb-6">
          When do you want to launch?
        </p>

        <div className="space-y-3">
          {timelines.map((t) => (
            <OptionCard
              key={t.id}
              icon={t.icon}
              title={t.title}
              description={t.description}
              selected={formData.webTimeline === t.id}
              onClick={() => updateForm("webTimeline", t.id)}
            />
          ))}
        </div>

        <div className="mt-4">
          <label className="block text-sm text-foreground-muted mb-2">
            Current website (if you have one):
          </label>
          <input
            type="url"
            name="website"
            autoComplete="url"
            value={formData.webCurrentSite}
            onChange={(e) => updateForm("webCurrentSite", e.target.value)}
            placeholder="https://yourwebsite.com"
            className="w-full px-4 py-3 rounded-xl bg-background border border-card-border focus:border-accent-primary focus:outline-none transition-colors"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm text-foreground-muted mb-2">
            Approximate budget:
          </label>
          <select
            value={formData.webBudget}
            onChange={(e) => updateForm("webBudget", e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-background border border-card-border focus:border-accent-primary focus:outline-none transition-colors"
          >
            <option value="">Select a range...</option>
            <option value="under-1k">Under $1,000</option>
            <option value="1k-3k">$1,000 - $3,000</option>
            <option value="3k-5k">$3,000 - $5,000</option>
            <option value="5k-10k">$5,000 - $10,000</option>
            <option value="10k-plus">$10,000+</option>
            <option value="not-sure">Not sure yet</option>
          </select>
        </div>

        <TextInput
          label="Any must-have features?"
          value={formData.message}
          onChange={(v) => updateForm("message", v)}
          placeholder="e.g., booking system, payment processing..."
        />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Additional details</h2>
      <p className="text-foreground-muted mb-6">
        Anything else you&apos;d like us to know?
      </p>

      <textarea
        value={formData.message}
        onChange={(e) => updateForm("message", e.target.value)}
        placeholder="Add any additional context..."
        rows={5}
        className="w-full px-4 py-3 rounded-xl bg-background border border-card-border focus:border-accent-primary focus:outline-none transition-colors resize-none"
      />
    </div>
  );
}

function Step4Contact({
  formData,
  updateForm,
}: {
  formData: FormData;
  updateForm: (field: keyof FormData, value: string) => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Almost there!</h2>
      <p className="text-foreground-muted mb-6">
        How can we reach you?
      </p>

      <div className="space-y-4">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium mb-2">Name *</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={formData.name}
            onChange={(e) => updateForm("name", e.target.value)}
            placeholder="Your name"
            className="w-full px-4 py-3 rounded-xl bg-background border border-card-border focus:border-accent-primary focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium mb-2">Email *</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={(e) => updateForm("email", e.target.value)}
            placeholder="your@email.com"
            className="w-full px-4 py-3 rounded-xl bg-background border border-card-border focus:border-accent-primary focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label htmlFor="contact-phone" className="block text-sm font-medium mb-2">Phone (optional)</label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={formData.phone}
            onChange={(e) => updateForm("phone", e.target.value)}
            placeholder="Your phone number"
            className="w-full px-4 py-3 rounded-xl bg-background border border-card-border focus:border-accent-primary focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label htmlFor="contact-business" className="block text-sm font-medium mb-2">Business/Company (optional)</label>
          <input
            id="contact-business"
            name="organization"
            type="text"
            autoComplete="organization"
            value={formData.businessName}
            onChange={(e) => updateForm("businessName", e.target.value)}
            placeholder="Your company name"
            className="w-full px-4 py-3 rounded-xl bg-background border border-card-border focus:border-accent-primary focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Anything else? (optional)
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => updateForm("message", e.target.value)}
            placeholder="Additional notes..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-background border border-card-border focus:border-accent-primary focus:outline-none transition-colors resize-none"
          />
        </div>
      </div>
    </div>
  );
}

function SuccessScreen({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="w-20 h-20 rounded-full bg-accent-primary/20 flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle className="w-10 h-10 text-accent-primary" />
      </motion.div>

      <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
      <p className="text-foreground-muted mb-8">
        Thanks for reaching out. We&apos;ll get back to you within 24 hours.
      </p>

      <Button variant="primary" onClick={onClose}>
        Done
      </Button>
    </motion.div>
  );
}

// Reusable components
function TextInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="mt-4">
      <label className="block text-sm text-foreground-muted mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-background border border-card-border focus:border-accent-primary focus:outline-none transition-colors"
      />
    </div>
  );
}
