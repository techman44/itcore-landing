"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { ContactWizard } from "./ContactWizard";

interface ContactWizardContextType {
  openWizard: () => void;
  closeWizard: () => void;
  isOpen: boolean;
}

const ContactWizardContext = createContext<ContactWizardContextType | null>(null);

export function useContactWizard() {
  const context = useContext(ContactWizardContext);
  if (!context) {
    throw new Error("useContactWizard must be used within ContactWizardProvider");
  }
  return context;
}

export function ContactWizardProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openWizard = () => setIsOpen(true);
  const closeWizard = () => setIsOpen(false);

  return (
    <ContactWizardContext.Provider value={{ openWizard, closeWizard, isOpen }}>
      {children}
      <ContactWizard isOpen={isOpen} onClose={closeWizard} />
    </ContactWizardContext.Provider>
  );
}
