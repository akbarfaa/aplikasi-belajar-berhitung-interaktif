import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Mascot } from "@/components/Mascot";
import { FloatingSymbols } from "@/components/FloatingSymbols";

export const Route = createFileRoute("/")(
  {
    component: Landing,
  },
);

function Landing() {
  return (
    <div className="min-h-screen">
      <Header />
      <section className="relative overflow-hidden pixel-grid">
        <FloatingSymbols />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 px-5 py-16 md:flex-row md:py-24">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border-[3px] border-navy bg-mint px-3 py-1 shadow-[3px_3px_0_0_var(--navy)]"
            >
              <span className="h-2 w-2 rounded-full bg-navy" />
              <span className="font-display text-[10px] text-navy">MUSIM BARU · DUNIA 1 TERBUKA</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-4xl leading-tight text-navy md:text-6xl"
            >
              Matematika itu{" "}
              <span className="inline-block -rotate-2 rounded-xl border-[3px] border-navy bg-gold px-3 py-1 shadow-[4px_4px_0_0_var(--navy)]">
                Seru
              </span>
              <br />
              dan bisa kamu kuasai!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="mt-5 max-w-lg font-body text-lg text-navy/80"
            >
              Jelajahi 11 dunia matematika. Pecahkan teka-teki, kalahkan boss,
              kumpulkan trofi. Playground retro-futuristik di mana angka-angka
              menjadi hidup!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link to="/worlds">
                <motion.button
                  whileHover={{
                    y: -3,
                    boxShadow: "6px 8px 0 0 var(--navy)",
                  }}
                  whileTap={{
                    y: 1,
                    boxShadow: "2px 2px 0 0 var(--navy)",
                  }}
                  className="retro-btn"
                >
                  ▶ MULAI PETUALANGAN
                </motion.button>
              </Link>
              <Link
                to="/worlds"
                className="inline-flex items-center gap-2 rounded-full border-[3px] border-navy bg-cream px-5 py-3 font-display text-[10px] text-navy shadow-[4px_4px_0_0_var(--navy)] transition hover:-translate-y-0.5"
              >
                🗺 LIHAT PETA
              </Link>
            </motion.div>

            <div className="mt-10 grid max-w-md grid-cols-3 gap-3">
              {[
                { k: "11", v: "Dunia" },
                { k: "80+", v: "Mini-game" },
                { k: "∞", v: "Latihan" },
              ].map((s) => (
                <div key={s.v} className="retro-card px-3 py-3 text-center">
                  <div className="font-display text-lg text-navy">{s.k}</div>
                  <div className="text-xs font-bold text-navy/70">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 12 }}
              className="relative mx-auto grid aspect-square max-w-md place-items-center rounded-[36px] border-[4px] border-navy bg-gradient-to-br from-sky via-cream to-mint shadow-[10px_10px_0_0_var(--navy)]"
            >
              <Mascot size={240} />
              {/* orbit chips */}
              {[
                { s: "π", cls: "top-4 left-4 bg-gold" },
                { s: "√", cls: "top-6 right-6 bg-coral" },
                {
                  s: "Σ",
                  cls: "bottom-6 left-8 bg-grape text-cream",
                },
                { s: "∞", cls: "bottom-4 right-4 bg-cyan" },
              ].map((c, i) => (
                <motion.div
                  key={c.s}
                  animate={{ y: [0, -8, 0], rotate: [-6, 6, -6] }}
                  transition={{
                    duration: 3 + i * 0.4,
                    repeat: Infinity,
                  }}
                  className={`absolute grid h-14 w-14 place-items-center rounded-2xl border-[3px] border-navy font-display text-lg text-navy shadow-[3px_3px_0_0_var(--navy)] ${c.cls}`}
                >
                  {c.s}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section className="border-y-4 border-navy bg-navy py-4 text-cream">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-around gap-4 px-5 font-display text-[10px]">
          <span>⚡ UMPAN BALIK INSTAN</span>
          <span>🏆 PERTARUNGAN BOSS</span>
          <span>🎯 XP · BINTANG · KOIN</span>
          <span>🎨 LAB INTERAKTIF</span>
          <span>🎵 EFEK SUARA</span>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-10 text-center">
          <div className="mb-2 font-display text-[10px] text-coral">
            CARA BERMAIN
          </div>
          <h2 className="text-3xl text-navy md:text-4xl">
            Belajar. Mainkan. Naik Level.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              n: "01",
              t: "Masuki Dunia",
              d: "Pilih dari 11 dunia matematika yang penuh warna — masing-masing dengan boss dan bioma sendiri.",
              c: "bg-coral",
            },
            {
              n: "02",
              t: "Mainkan Mini-Game",
              d: "Tembak Angka, Lari Matematika, Blok Teka-teki dan lainnya. Konsep jadi insting.",
              c: "bg-mint",
            },
            {
              n: "03",
              t: "Kalahkan Boss",
              d: "Gabungkan skill, rangkai kombo, dan kalahkan boss untuk membuka dunia berikutnya.",
              c: "bg-gold",
            },
          ].map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="retro-card p-6"
            >
              <div
                className={`mb-4 inline-block rounded-lg border-[3px] border-navy px-2 py-1 font-display text-[10px] text-navy ${s.c}`}
              >
                {s.n}
              </div>
              <h3 className="mb-2 text-xl text-navy">{s.t}</h3>
              <p className="font-body text-navy/70">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="border-t-4 border-navy bg-cream/50 py-8 text-center font-display text-[10px] text-navy/70">
        © MATEMATIKKU · TEKAN MULAI UNTUK MELANJUTKAN
      </footer>
    </div>
  );
}
