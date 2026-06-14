"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  disabled,
  type = "button",
  onClick,
}: ButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const variants = {
    primary:
      "bg-gradient-to-r from-accent-primary to-accent-secondary text-background hover:opacity-90 focus:ring-accent-primary",
    secondary:
      "bg-card text-foreground border border-card-border hover:bg-card-hover focus:ring-accent-secondary",
    outline:
      "bg-transparent border-2 border-accent-primary text-accent-primary hover:bg-accent-primary/10 focus:ring-accent-primary",
    ghost:
      "bg-transparent text-foreground hover:bg-card focus:ring-accent-primary",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      whileHover={disabled ? {} : { scale: 1.02, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
    >
      {children}
      {variant === "primary" && (
        <motion.div
          className="absolute inset-0 rounded-lg opacity-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(94, 234, 212, 0.3) 0%, transparent 70%)",
          }}
        />
      )}
    </motion.button>
  );
}
