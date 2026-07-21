"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

// ---------------------------------------------------------------------------
// Navbar — Transparent → solid on scroll, full-screen mobile overlay
// ---------------------------------------------------------------------------

const NAV_LINKS = [
  { href: "/nosotros", label: "Nosotros" },
  { href: "/servicios", label: "Servicios" },
  { href: "/portafolio", label: "Portafolio" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`
          fixed top-0 inset-x-0 z-50 transition-all duration-500
          ${scrolled
            ? "bg-primary/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
          }
        `}
      >
        <nav className="container-narrow flex items-center justify-between h-20">
          {/* --- Logo --- */}
          <Link
            href="/"
            aria-label="ana banana Experiences — inicio"
            className="group flex items-center gap-3 text-text-inverse
                       hover:text-highlight transition-colors duration-300"
          >
            <Image
              src="/brand/ab-isotipo-on-softblue.png"
              alt=""
              width={40}
              height={40}
              priority
              className="h-10 w-10 rounded-lg object-cover"
            />
            <span className="font-display text-xl font-semibold tracking-tight">
              ana banana
            </span>
          </Link>

          {/* --- Desktop Links --- */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-semibold tracking-[0.08em] uppercase text-text-inverse/70
                           hover:text-highlight transition-colors duration-300"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* --- CTA + Mobile Toggle --- */}
          <div className="flex items-center gap-4">
            <Link
              href="/contacto"
              className="hidden md:inline-flex items-center px-6 py-2.5
                         bg-highlight text-primary text-sm font-semibold
                         tracking-[0.06em] uppercase rounded-none
                         hover:brightness-95 transition-all duration-300"
            >
              Conversemos
            </Link>

            <button
              className="md:hidden text-text-inverse p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* --- Mobile Overlay --- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-primary flex flex-col items-center
                       justify-center gap-10"
          >
            {NAV_LINKS.map(({ href, label }, i) => (
              <motion.div
                key={href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
              >
                <Link
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-3xl font-semibold text-text-inverse
                             hover:text-highlight transition-colors"
                >
                  {label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <Link
                href="/contacto"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center px-8 py-3 bg-highlight text-primary
                           text-sm font-semibold tracking-[0.08em] uppercase
                           hover:brightness-95 transition-all"
              >
                Conversemos
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
