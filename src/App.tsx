import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import AdminConsole from "./components/AdminConsole";
import { Terminal, Code, Cpu, Copyright } from "lucide-react";
import { developerProfile } from "./data";

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Restore admin session on mount
  useEffect(() => {
    const token = localStorage.getItem("portfolio_admin_token");
    if (token === "portfolio_admin_token_2026") {
      setIsAdminLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = (token: string) => {
    setIsAdminLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("portfolio_admin_token");
    setIsAdminLoggedIn(false);
  };

  return (
    <div id="portfolio-app-root" className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none antialiased selection:bg-cyan-500/30 selection:text-white">
      {/* Dynamic Floating Header */}
      <Header
        onOpenAdmin={() => setShowAdmin(true)}
        isAdminLoggedIn={isAdminLoggedIn}
        onLogoutAdmin={handleLogout}
      />

      {/* Main Structural Portfolio Content */}
      <main className="flex-grow">
        {/* 1. Hero Spotlight & Quick Telemetry */}
        <Hero />

        {/* 2. Credentials & Bio Tab Matrix (Skills, Work Experience, Education) */}
        <About />

        {/* 3. Filterable Project Gallery & Deep Case Study Modals */}
        <Projects />

        {/* 4. Contact Client Form & Logging Socket Terminal */}
        <Contact />
      </main>

      {/* Admin Panel Securing & Database Review Modal */}
      {showAdmin && (
        <AdminConsole
          onClose={() => setShowAdmin(false)}
          isAdminLoggedIn={isAdminLoggedIn}
          onLoginSuccess={handleLoginSuccess}
          onLogout={handleLogout}
        />
      )}

      {/* Production-Grade Developer Footer */}
      <footer id="portfolio-footer" className="bg-slate-950 border-t border-slate-900/80 py-12 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright Branding */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800/80 flex items-center justify-center font-mono font-bold text-slate-300 text-sm">
              PK
            </div>
            <p className="font-sans text-xs text-slate-500 flex items-center gap-1.5">
              <Copyright className="w-3.5 h-3.5" />
              {new Date().getFullYear()} {developerProfile.name}. All Rights Reserved.
            </p>
          </div>

          {/* Quick specs log (shows real full stack expertise) */}
          <div className="flex items-center gap-4 text-slate-600 font-mono text-[10px]">
            <div className="flex items-center gap-1">
              <Code className="w-3.5 h-3.5 text-cyan-400/60" />
              <span>React 19 + TypeScript</span>
            </div>
            <span className="text-slate-800">|</span>
            <div className="flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-blue-400/60" />
              <span>Node.js + Express API</span>
            </div>
          </div>

          {/* Availability badge */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-sans text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Ready for Hire
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
