import { motion } from "framer-motion";

export function Mascot({ size = 160 }: { size?: number }) {
  return (
    <motion.div
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      style={{ width: size, height: size }}
      className="relative"
    >
      {/* shadow */}
      <motion.div
        animate={{ scale: [1, 0.85, 1], opacity: [0.35, 0.2, 0.35] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-0 left-1/2 h-3 w-24 -translate-x-1/2 rounded-full bg-navy blur-md"
      />
      {/* body */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative h-[80%] w-[80%] rounded-[36%] border-[4px] border-navy bg-gradient-to-br from-coral to-blush shadow-[6px_6px_0_0_var(--navy)]">
          {/* antenna */}
          <div className="absolute -top-6 left-1/2 h-6 w-1.5 -translate-x-1/2 bg-navy" />
          <div className="absolute -top-8 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border-[3px] border-navy bg-gold" />
          {/* eyes */}
          <div className="absolute left-[22%] top-[32%] h-5 w-5 rounded-full bg-cream">
            <motion.div
              animate={{ x: [0, 2, -2, 0], y: [0, -1, 1, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="ml-1 mt-1 h-3 w-3 rounded-full bg-navy"
            />
          </div>
          <div className="absolute right-[22%] top-[32%] h-5 w-5 rounded-full bg-cream">
            <motion.div
              animate={{ x: [0, 2, -2, 0], y: [0, -1, 1, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="ml-1 mt-1 h-3 w-3 rounded-full bg-navy"
            />
          </div>
          {/* cheeks */}
          <div className="absolute left-[12%] top-[52%] h-3 w-4 rounded-full bg-gold/70" />
          <div className="absolute right-[12%] top-[52%] h-3 w-4 rounded-full bg-gold/70" />
          {/* mouth */}
          <div className="absolute bottom-[22%] left-1/2 h-3 w-8 -translate-x-1/2 rounded-b-full border-b-[3px] border-l-[3px] border-r-[3px] border-navy bg-cream" />
          {/* math symbol */}
          <div className="absolute -right-3 -top-2 rotate-12 font-display text-xs text-navy">π</div>
          <div className="absolute -left-4 top-6 -rotate-12 font-display text-xs text-navy">Σ</div>
        </div>
      </div>
    </motion.div>
  );
}
