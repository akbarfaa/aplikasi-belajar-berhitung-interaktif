import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { FloatingSymbols } from "@/components/FloatingSymbols";
import { useProgress, type WorldProgress } from "@/hooks/useProgress";
import { worlds } from "@/lib/worlds";

export const Route = createFileRoute("/stats")({
  head: () => ({
    meta: [
      { title: "Statistik — Matematikku" },
      {
        name: "description",
        content: "Lihat progress dan pencapaianmu di Matematikku.",
      },
    ],
  }),
  component: StatsPage,
});

const allAchievements = [
  { id: "pemula", emoji: "🌱", name: "Pemula", desc: "Raih total 100 poin" },
  {
    id: "penjelajah",
    emoji: "🧭",
    name: "Penjelajah",
    desc: "Raih total 500 poin",
  },
  { id: "master", emoji: "👑", name: "Master", desc: "Raih total 1.000 poin" },
  {
    id: "kombo_kilat",
    emoji: "⚡",
    name: "Kombo Kilat",
    desc: "Raih kombo x3",
  },
  { id: "kombo_api", emoji: "🔥", name: "Kombo Api", desc: "Raih kombo x5" },
  {
    id: "kombo_legendaris",
    emoji: "💫",
    name: "Kombo Legendaris",
    desc: "Raih kombo x10",
  },
  {
    id: "rajin",
    emoji: "📚",
    name: "Rajin",
    desc: "Jawab 50 soal dengan benar",
  },
  {
    id: "tekun",
    emoji: "🏅",
    name: "Tekun",
    desc: "Jawab 200 soal dengan benar",
  },
  {
    id: "penjelajah_dunia",
    emoji: "🌍",
    name: "Penjelajah Dunia",
    desc: "Mainkan 3 dunia berbeda",
  },
  {
    id: "bintang_sempurna",
    emoji: "⭐",
    name: "Bintang Sempurna",
    desc: "Raih 3 bintang di satu dunia",
  },
];

const colorMap: Record<string, string> = {
  coral: "bg-coral",
  mint: "bg-mint",
  gold: "bg-gold",
  grape: "bg-grape text-cream",
  cyan: "bg-cyan",
  sky: "bg-sky",
  blush: "bg-blush",
};

function StatsPage() {
  const { progress } = useProgress();

  const worldValues = Object.values(progress.worlds) as WorldProgress[];
  const totalAnswered = worldValues.reduce(
    (sum, w) => sum + w.totalAnswered,
    0,
  );
  const totalCorrect = worldValues.reduce(
    (sum, w) => sum + w.totalCorrect,
    0,
  );
  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  const totalStars = worldValues.reduce(
    (sum, w) => sum + w.stars,
    0,
  );
  const worldsPlayed = Object.keys(progress.worlds).length;

  return (
    <div className="min-h-screen">
      <Header />
      <div className="relative overflow-hidden pixel-grid">
        <FloatingSymbols count={8} />
        <div className="relative mx-auto max-w-5xl px-5 py-12">
          <div className="mb-10">
            <div className="mb-1 font-display text-[10px] text-coral">
              PROFIL
            </div>
            <h1 className="text-3xl text-navy md:text-5xl">
              Statistik & Pencapaian
            </h1>
            <p className="mt-2 font-body text-navy/70">
              Pantau progressmu dan kumpulkan semua pencapaian!
            </p>
          </div>

          {/* Overview cards */}
          <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-5">
            {[
              {
                label: "Total Skor",
                value: progress.totalScore.toLocaleString("id-ID"),
                color: "bg-gold",
                emoji: "⭐",
              },
              {
                label: "Soal Dijawab",
                value: totalAnswered,
                color: "bg-sky",
                emoji: "📝",
              },
              {
                label: "Jawaban Benar",
                value: totalCorrect,
                color: "bg-mint",
                emoji: "✅",
              },
              {
                label: "Akurasi",
                value: `${accuracy}%`,
                color: "bg-coral",
                emoji: "🎯",
              },
              {
                label: "Bintang",
                value: `${totalStars}/${worlds.length * 3}`,
                color: "bg-grape text-cream",
                emoji: "★",
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`retro-card p-4 text-center ${i === 0 ? "col-span-2 md:col-span-1" : ""}`}
              >
                <div className="mb-1 text-2xl">{stat.emoji}</div>
                <div className="font-display text-lg text-navy">
                  {stat.value}
                </div>
                <div className="text-[10px] font-bold text-navy/60">
                  {stat.label.toUpperCase()}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-5">
            {/* Per-world progress */}
            <div className="lg:col-span-3">
              <div className="retro-card p-5">
                <div className="mb-4 font-display text-[10px] text-navy/60">
                  PROGRESS PER DUNIA
                </div>
                <div className="space-y-4">
                  {worlds
                    .filter((w) => !w.locked)
                    .map((w, i) => {
                      const wp = progress.worlds[w.id];
                      const hasData = wp && wp.totalAnswered > 0;
                      const worldAccuracy =
                        hasData
                          ? Math.round(
                              (wp.totalCorrect / wp.totalAnswered) * 100,
                            )
                          : 0;
                      const progressPct =
                        hasData ? Math.min(100, Math.round((wp.highScore / 200) * 100)) : 0;

                      return (
                        <motion.div
                          key={w.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06 }}
                        >
                          <Link
                            to="/world/$worldId"
                            params={{ worldId: w.id }}
                            className="block"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl border-[2px] border-navy text-xl ${colorMap[w.color]}`}
                              >
                                {w.emoji}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between">
                                  <div className="text-sm font-bold text-navy">
                                    {w.title}
                                  </div>
                                  <div className="flex gap-0.5">
                                    {[1, 2, 3].map((s) => (
                                      <span
                                        key={s}
                                        className={`text-sm ${hasData && s <= (wp?.stars ?? 0) ? "text-gold" : "text-navy/20"}`}
                                      >
                                        ★
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <div className="mt-1 h-2.5 overflow-hidden rounded-full border-[2px] border-navy bg-cream">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{
                                      width: `${progressPct}%`,
                                    }}
                                    transition={{
                                      duration: 0.6,
                                      delay: i * 0.06,
                                    }}
                                    className={`h-full ${i % 3 === 0 ? "bg-mint" : i % 3 === 1 ? "bg-gold" : "bg-coral"}`}
                                  />
                                </div>
                                <div className="mt-1 flex gap-3 text-[10px] font-bold text-navy/50">
                                  {hasData ? (
                                    <>
                                      <span>
                                        Skor: {wp.highScore}
                                      </span>
                                      <span>
                                        Akurasi: {worldAccuracy}%
                                      </span>
                                      <span>
                                        Kombo: x{wp.bestCombo}
                                      </span>
                                    </>
                                  ) : (
                                    <span>Belum dimainkan</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                </div>

                {/* Locked worlds */}
                <div className="mt-6 border-t-[2px] border-navy/20 pt-4">
                  <div className="mb-3 font-display text-[10px] text-navy/40">
                    DUNIA TERKUNCI
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {worlds
                      .filter((w) => w.locked)
                      .map((w) => (
                        <div
                          key={w.id}
                          className="grid place-items-center rounded-xl border-[2px] border-navy/30 bg-cream/60 p-2 text-center opacity-50"
                        >
                          <div className="text-xl">{w.emoji}</div>
                          <div className="font-display text-[8px] text-navy/50">
                            🔒
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements panel */}
            <div className="lg:col-span-2">
              <div className="retro-card p-5">
                <div className="mb-1 font-display text-[10px] text-navy/60">
                  PENCAPAIAN
                </div>
                <div className="mb-4 text-xs font-bold text-navy/50">
                  {progress.achievements.length} / {allAchievements.length}{" "}
                  terbuka
                </div>
                <div className="space-y-2">
                  {allAchievements.map((a, i) => {
                    const got = progress.achievements.includes(a.id);
                    return (
                      <motion.div
                        key={a.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className={`flex items-center gap-3 rounded-xl border-[2px] border-navy p-3 transition ${got ? "bg-gold/30" : "bg-cream/50 opacity-60"}`}
                      >
                        <div
                          className={`grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg border-[2px] border-navy text-xl ${got ? "bg-gold" : "bg-cream"}`}
                        >
                          {got ? a.emoji : "❓"}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-navy">
                            {a.name}
                          </div>
                          <div className="text-[11px] text-navy/60">
                            {a.desc}
                          </div>
                        </div>
                        {got && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-auto font-display text-sm text-mint"
                          >
                            ✓
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Tips card */}
              <div className="retro-card mt-4 overflow-hidden">
                <div className="border-b-[3px] border-navy bg-sky p-3 font-display text-[10px] text-navy">
                  💡 TIPS
                </div>
                <div className="space-y-2 p-4 font-body text-sm text-navy/70">
                  <p>
                    🎯 Jawab soal berturut-turut dengan benar untuk mendapatkan{" "}
                    <strong className="text-navy">kombo</strong> dan XP lebih
                    banyak!
                  </p>
                  <p>
                    ⭐ Raih <strong className="text-navy">200 poin</strong> di
                    satu dunia untuk mendapatkan 3 bintang.
                  </p>
                  <p>
                    🌍 Mainkan semua dunia yang terbuka untuk membuka pencapaian{" "}
                    <strong className="text-navy">Penjelajah Dunia</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
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
                🗺 JELAJAHI DUNIA
              </motion.button>
            </Link>
            <Link to="/">
              <motion.button
                whileHover={{ y: -2 }}
                className="rounded-full border-[3px] border-navy bg-cream px-5 py-3 font-display text-[10px] text-navy shadow-[4px_4px_0_0_var(--navy)] transition"
              >
                🏠 BERANDA
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
