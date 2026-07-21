import React, { useState, useEffect } from "react";
import { Menu, X, Terminal, Lock } from "lucide-react";
import { developerProfile } from "../data";

interface HeaderProps {
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
  onLogoutAdmin: () => void;
}

export default function Header({ onOpenAdmin, isAdminLoggedIn, onLogoutAdmin }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // height of header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header
      id="portfolio-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/95 border-b border-slate-800/80 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center gap-2 group focus:outline-none"
            id="brand-logo"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-mono font-bold text-lg shadow-md group-hover:scale-105 transition-transform duration-200">
              PK
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors duration-200 text-base leading-none">
                {developerProfile.name}
              </span>
              <span className="font-mono text-[10px] text-slate-400 mt-1">
                ~/portfolio
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" id="desktop-nav">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="font-sans font-medium text-sm text-slate-300 hover:text-cyan-400 transition-colors duration-200 py-2 relative group focus:outline-none"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-200 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="h-4 w-px bg-slate-800" />

            {isAdminLoggedIn ? (
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-md flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Admin
                </span>
                <button
                  onClick={onLogoutAdmin}
                  className="font-sans text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-750 border border-slate-700/80 px-3 py-1.5 rounded-lg transition-all duration-200 focus:outline-none"
                  id="btn-admin-logout"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAdmin}
                className="font-sans text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-600 bg-slate-900 hover:bg-slate-800 border border-slate-800 px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-all duration-200 shadow-sm focus:outline-none"
                id="btn-admin-login-trigger"
              >
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                Admin Console
              </button>
            )}
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-3 md:hidden">
            {isAdminLoggedIn && (
              <span className="font-mono text-[10px] px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded">
                Admin
              </span>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors focus:outline-none"
              id="btn-mobile-menu-toggle"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        id="mobile-menu-drawer"
        className={`md:hidden fixed inset-x-0 top-[65px] bg-slate-950/98 border-b border-slate-900 shadow-xl transition-all duration-300 ease-in-out z-40 transform origin-top ${
          mobileMenuOpen ? "scale-y-100 opacity-100 h-auto visible" : "scale-y-0 opacity-0 h-0 invisible"
        }`}
      >
        <div className="px-4 pt-4 pb-6 space-y-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="block font-sans font-medium text-base text-slate-300 hover:text-cyan-400 hover:bg-slate-900/50 px-3 py-2.5 rounded-lg transition-all duration-200"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="border-t border-slate-900 my-4 pt-4">
            {isAdminLoggedIn ? (
              <button
                onClick={() => {
                  onLogoutAdmin();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center font-sans font-semibold text-sm text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 py-2.5 rounded-lg transition-all duration-200"
                id="btn-mobile-logout"
              >
                Logout Developer Console
              </button>
            ) : (
              <button
                onClick={() => {
                  onOpenAdmin();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center font-sans font-semibold text-sm text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-850 border border-slate-800 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all duration-200"
                id="btn-mobile-login-trigger"
              >
                <Lock className="w-4 h-4 text-slate-400" />
                Access Developer Console
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
