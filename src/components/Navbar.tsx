"use client";

import { useState } from "react";
import Image from "next/image";
import Logo from "./Logo";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-night-950/80 backdrop-blur-md border-b border-night-700/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#home" className="flex items-center gap-2">
            <Logo size={40} />
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-medium text-gray-400 hover:text-sky-400 transition-colors">
                {l.label}
              </a>
            ))}
            <a href="#contact" className="text-sm font-semibold bg-sky-500 text-night-950 px-5 py-2 rounded-full hover:bg-sky-400 transition-all shadow-lg shadow-sky-500/20">
              Get in Touch
            </a>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} className="md:hidden p-2 text-gray-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-night-700/50 pt-4">
            <div className="flex flex-col gap-3">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-400 hover:text-sky-400 transition-colors">
                  {l.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setMenuOpen(false)} className="text-sm font-semibold bg-sky-500 text-night-950 px-5 py-2 rounded-full inline-block text-center hover:bg-sky-400 transition-colors">
                Get in Touch
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
