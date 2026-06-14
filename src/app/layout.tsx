import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClientEffects } from "@/components/effects/ClientEffects";
import { ContactWizardProvider } from "@/components/ContactWizardContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ITCore.AI - AI Workflow Automation Experts",
  description:
    "We integrate AI into your workflows so your team can stop doing repetitive tasks and start doing meaningful work. AI Automation, IT Infrastructure, and Web Design services.",
  keywords: [
    "AI automation",
    "workflow automation",
    "IT services",
    "managed services",
    "web design",
    "business automation",
  ],
  authors: [{ name: "ITCore.AI" }],
  openGraph: {
    title: "ITCore.AI - AI Workflow Automation Experts",
    description:
      "Automate the mundane. Focus on what matters. AI workflow automation for modern businesses.",
    url: "https://itcore.ai",
    siteName: "ITCore.AI",
    type: "website",
    images: ["/images/itcore-logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "ITCore.AI - AI Workflow Automation Experts",
    description: "Automate the mundane. Focus on what matters.",
    images: ["/images/itcore-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/images/itcore-logo.png",
    apple: "/images/itcore-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Umami Analytics - Privacy-focused */}
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <Script
            src={`${process.env.NEXT_PUBLIC_UMAMI_URL}/script.js`}
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            strategy="afterInteractive"
          />
        )}

        {/* Microsoft Clarity - Heatmaps & Session Recording (optional) */}
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <Script id="clarity-script" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
            `}
          </Script>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <ContactWizardProvider>
            <ClientEffects />
            <Navbar />
            <main>{children}</main>
            <Footer />
          </ContactWizardProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
