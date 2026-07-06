import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { FloatingSymbols } from "@/components/FloatingSymbols";
import { worlds } from "@/lib/worlds";

export const Route = createFileRoute("/worlds")({
  head: () => ({
    meta: [
      { title: "Peta Dunia — Matematikku" },
      {
        name: "description",
        content:
          "Jelajahi 11 dunia matematika. Pilih misimu dan mulai petualangan!",
      },
    ],
  }),
  component: WorldsPage,
});

const colorMap: Record<string, string> = {
  coral: "bg-coral",
  mint: "bg-mint",
  gold: "bg-gold",
  grape: "bg-grape text-cream",
  cyan: "bg-cyan",
  sky: "bg-sky",
  blush: "bg-blush",
};

function WorldsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="relative overflow-hidden pixel-grid">
        <FloatingSymbols count={12} />
        <div className="relative mx-auto max-w-6xl px-5 py-12">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="mb-1 font-display text-[10px] text-coral">
                MUSIM 1
              </div>
              <h1 className="text-3xl text-navy md:text-5xl">Peta Dunia</h1>
              <p className="mt-2 font-body text-navy/70">
                Pilih dunia. Kuasai topiknya. Kalahkan boss-nya.
              </p>
            </div>
            <div className="hidden gap-2 md:flex">
              <div className="retro-card px-3 py-2 text-center">
                <div className="font-display text-xs text-navy">6 / 11</div>
                <div className="text-[10px] font-bold text-navy/60">
                  TERBUKA
                </div>
              </div>
              <div className="retro-card px-3 py-2 text-center">
                <div className="font-display text-xs text-navy">42%</div>
                <div className="text-[10px] font-bold text-navy/60">
                  PROGRES
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {worlds.map((w, i) => {
              const inner = (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={!w.locked ? { y: -6, rotate: -0.5 } : {}}
                  className={`retro-card relative overflow-hidden p-5 ${w.locked ? "opacity-60" : ""}`}
                >
                  <div
                    className={`mb-4 inline-flex items-center gap-2 rounded-lg border-[3px] border-navy px-2 py-1 font-display text-[10px] text-navy ${colorMap[w.color]}`}
                  >
                    DUNIA {String(w.number).padStart(2, "0")}
                  </div>
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <h3 className="text-xl leading-tight text-navy">
                        {w.title}
                      </h3>
                      <p className="mt-1 text-sm font-bold text-navy/60">
                        {w.subtitle}
                      </p>
                    </div>
                    <motion.div
                      animate={{ rotate: [0, 8, -8, 0] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                      className="text-4xl"
                    >
                      {w.emoji}
                    </motion.div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {w.topics.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border-2 border-navy bg-cream px-2 py-0.5 text-[11px] font-bold text-navy"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <div className="flex gap-1">
                      {[1, 2, 3].map((s) => (
                        <span
                          key={s}
                          className={`text-lg ${!w.locked && s <= 2 ? "text-gold" : "text-navy/20"}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="font-display text-[10px] text-navy">
                      {w.locked ? "🔒 TERKUNCI" : "MAIN →"}
                    </span>
                  </div>
                </motion.div>
              );
              return w.locked ? (
                <div key={w.id}>{inner}</div>
              ) : (
                <Link
                  key={w.id}
                  to="/world/$worldId"
                  params={{ worldId: w.id }}
                >
                  {inner}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
