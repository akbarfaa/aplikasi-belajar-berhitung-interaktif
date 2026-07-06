import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const symbols = ["+", "−", "×", "÷", "π", "∑", "√", "∞", "θ", "λ", "Δ", "∫"];

export function FloatingSymbols({ count = 18 }: { count?: number }) {
  const [items, setItems] = useState<Array<{ id: number; x: number; y: number; s: string; d: number; size: number }>>([]);
  useEffect(() => {
    setItems(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: symbols[Math.floor(Math.random() * symbols.length)],
        d: 6 + Math.random() * 8,
        size: 18 + Math.random() * 40,
      })),
    );
  }, [count]);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((it) => (
        <motion.div
          key={it.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0.5, 0], y: [0, -30, -60, -90], x: [0, 10, -10, 0] }}
          transition={{ duration: it.d, repeat: Infinity, delay: it.id * 0.3 }}
          className="absolute font-display text-navy/40"
          style={{ left: `${it.x}%`, top: `${it.y}%`, fontSize: it.size }}
        >
          {it.s}
        </motion.div>
      ))}
    </div>
  );
}
