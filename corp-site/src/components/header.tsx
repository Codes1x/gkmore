"use client";

import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20 transition-all duration-300">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            {/* Placeholder icon */}
            <span className="inline-flex items-center justify-center size-8 rounded-md bg-cyan-500/20 text-cyan-400 border border-cyan-400/30">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6"/></svg>
            </span>
            <span className="text-base font-semibold tracking-tight text-white">ГК Море</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          <Link href="/about" className="hover:text-white transition-colors">О группе</Link>
          <Link href="/model" className="hover:text-white transition-colors">Модель</Link>
          <Link href="/portfolio" className="hover:text-white transition-colors">Портфель</Link>
          <Link href="/contacts" className="hover:text-white transition-colors">Контакты</Link>
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link href="/contacts" className="inline-flex items-center justify-center h-10 px-4 rounded-lg border border-white/30 text-white/90 text-sm font-medium hover:bg-white/10 transition-colors leading-[1]">
            Стать партнёром
          </Link>
          <Link href="#book" className="inline-flex items-center justify-center h-10 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium hover:from-cyan-400 hover:to-blue-500 transition-all leading-[1]">
            Забронировать
          </Link>
          <button className="inline-flex items-center justify-center h-10 px-3 rounded-lg border border-white/30 text-xs text-white/70 hover:text-white transition-colors leading-[1]">RU/EN</button>
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center size-9 rounded-md border border-white/30 text-white"
          onClick={() => setOpenMenu((v) => !v)}
          aria-label="Открыть меню"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M4 7h16v2H4zm0 4h16v2H4zm0 4h16v2H4z"/></svg>
        </button>
      </div>

      {openMenu && (
        <div className="md:hidden border-t border-white/20 bg-black/50 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-2">
              {[
                ["О группе", "/about"],
                ["Модель", "/model"],
                ["Портфель", "/portfolio"],
                ["Контакты", "/contacts"],
              ].map(([label, href]) => (
                <Link key={label} href={href} className="rounded-md border border-white/30 p-2 text-center text-white hover:bg-white/10 transition-colors">
                  {label as string}
                </Link>
              ))}
            </div>
            <div className="flex gap-2 pt-2">
              <Link href="/contacts" className="flex-1 h-9 px-3 rounded-md border border-white/30 text-white text-sm font-medium text-center leading-9 hover:bg-white/10 transition-colors">Стать партнёром</Link>
              <Link href="#book" className="flex-1 h-9 px-3 rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium text-center leading-9">Забронировать</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}


