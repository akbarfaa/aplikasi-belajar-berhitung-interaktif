import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const STORAGE_KEY = "matematikku_progress";

export function Header() {
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        setTotalScore(data.totalScore ?? 0);
      }
    } catch {
      // ignore
    }

    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        const data = JSON.parse(e.newValue);
        setTotalScore(data.totalScore ?? 0);
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  // Also listen for custom events from same-tab updates
  useEffect(() => {
    const interval = setInterval(() => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const data = JSON.parse(raw);
          setTotalScore(data.totalScore ?? 0);
        }
      } catch {
        // ignore
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b-4 border-navy bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link to="/" className="flex items-center gap-2">
          <motion.div
            initial={{ rotate: -8 }}
            animate={{ rotate: [-8, 8, -8] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="grid h-10 w-10 place-items-center rounded-xl border-[3px] border-navy bg-coral text-cream shadow-[3px_3px_0_0_var(--navy)]"
          >
            <span className="font-display text-[10px]">Mk</span>
          </motion.div>
          <span className="font-display text-sm text-navy">Matematikku</span>
        </Link>
        <nav className="flex items-center gap-1 text-xs">
          <Link to="/" className="rounded-full px-3 py-1.5 font-bold text-navy hover:bg-sky/50">Beranda</Link>
          <Link to="/worlds" className="rounded-full px-3 py-1.5 font-bold text-navy hover:bg-sky/50">Dunia</Link>
          <Link to="/stats" className="rounded-full px-3 py-1.5 font-bold text-navy hover:bg-sky/50">Statistik</Link>
          <div className="ml-2 flex items-center gap-2 rounded-full border-[3px] border-navy bg-gold px-3 py-1 shadow-[3px_3px_0_0_var(--navy)]">
            <span className="font-display text-[10px] text-navy">⭐ {totalScore.toLocaleString("id-ID")}</span>
          </div>
        </nav>
      </div>
    </header>
  );
}
