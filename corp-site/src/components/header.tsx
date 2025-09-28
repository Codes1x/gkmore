"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { usePopup } from "@/contexts/popup-context";

export function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { openPopup } = usePopup();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on navigation
  const handleLinkClick = () => {
    setOpenMenu(false);
  };

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(false);
    };
    if (openMenu) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [openMenu]);

  const navLinks = [
    { href: "/about", label: "О группе" },
    { href: "/cleaning", label: "Клининг" },
    { href: "/model", label: "Модель" },
    { href: "/portfolio", label: "Портфель" },
    { href: "/contacts", label: "Контакты" }
  ];

  const isActiveLink = (href: string) => pathname === href;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "backdrop-blur-md bg-white/95 border-b border-gray-200 shadow-sm" 
        : "backdrop-blur-md bg-white/10 border-b border-white/20"
    }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Header */}
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <span className={`inline-flex items-center justify-center size-8 lg:size-10 rounded-md transition-all ${
                scrolled 
                  ? "bg-cyan-500/20 text-cyan-600 border border-cyan-400/30" 
                  : "bg-cyan-500/20 text-cyan-400 border border-cyan-400/30"
              }`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="lg:w-5 lg:h-5">
                  <circle cx="12" cy="12" r="6"/>
                </svg>
              </span>
              <span className={`text-base lg:text-lg font-semibold tracking-tight transition-colors ${
                scrolled ? "text-gray-900" : "text-white"
              }`}>
                ГК Море
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <Link 
                key={href}
                href={href} 
                className={`text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  isActiveLink(href)
                    ? (scrolled ? "text-cyan-600" : "text-cyan-300")
                    : (scrolled ? "text-gray-600 hover:text-gray-900" : "text-white/80 hover:text-white")
                } ${
                  isActiveLink(href) ? "border-b-2 border-current pb-1" : ""
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <button 
              onClick={() => openPopup("Стать партнёром")}
              className={`inline-flex items-center justify-center h-10 px-4 rounded-lg text-sm font-medium transition-all hover:scale-105 ${
                scrolled 
                  ? "border border-gray-300 text-gray-700 hover:bg-gray-50" 
                  : "border border-white/30 text-white/90 hover:bg-white/10"
              }`}
            >
              Стать партнёром
            </button>
            <Link 
              href="#book" 
              className="inline-flex items-center justify-center h-10 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium hover:from-cyan-400 hover:to-blue-500 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Забронировать
            </Link>
            <button className={`inline-flex items-center justify-center h-10 px-3 rounded-lg text-xs font-medium transition-all hover:scale-105 ${
              scrolled 
                ? "border border-gray-300 text-gray-500 hover:text-gray-700" 
                : "border border-white/30 text-white/70 hover:text-white"
            }`}>
              RU/EN
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden inline-flex items-center justify-center size-10 rounded-md border transition-all ${
              scrolled 
                ? "border-gray-300 text-gray-700" 
                : "border-white/30 text-white"
            } ${openMenu ? "rotate-90" : ""}`}
            onClick={() => setOpenMenu((v) => !v)}
            aria-label={openMenu ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={openMenu}
          >
            {openMenu ? (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M4 7h16v2H4zm0 4h16v2H4zm0 4h16v2H4z"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
        openMenu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}>
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpenMenu(false)}
        />
        
        {/* Mobile Menu Content */}
        <div className={`absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-2xl transform transition-all duration-300 ${
          openMenu ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
        }`}>
          <div className="px-4 py-6 space-y-4">
            {/* Navigation Links */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {navLinks.map(({ href, label }) => (
                <Link 
                  key={href}
                  href={href} 
                  onClick={handleLinkClick}
                  className={`rounded-lg border p-3 text-center text-sm font-medium transition-all hover:scale-105 ${
                    isActiveLink(href)
                      ? "border-cyan-300 bg-cyan-50 text-cyan-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3">
              <button 
                onClick={() => {
                  openPopup("Стать партнёром");
                  handleLinkClick();
                }}
                className="flex-1 h-12 px-4 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium text-center leading-[3rem] hover:bg-gray-50 transition-all"
              >
                Стать партнёром
              </button>
              <Link 
                href="#book" 
                onClick={handleLinkClick}
                className="flex-1 h-12 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium text-center leading-[3rem] shadow-lg"
              >
                Забронировать
              </Link>
            </div>

            {/* Language Switcher */}
            <div className="pt-4 border-t border-gray-200">
              <button className="w-full h-10 px-4 rounded-lg border border-gray-300 text-gray-500 text-sm font-medium hover:bg-gray-50 transition-all">
                RU/EN
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}


