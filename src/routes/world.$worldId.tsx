import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { FloatingSymbols } from "@/components/FloatingSymbols";
import { worlds } from "@/lib/worlds";
import { useSound } from "@/hooks/useSound";
import { useProgress } from "@/hooks/useProgress";

export const Route = createFileRoute("/world/$worldId")({
  loader: ({ params }) => {
    const world = worlds.find((w) => w.id === params.worldId);
    if (!world) throw notFound();
    return { world };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.world.title} — Matematikku` },
          {
            name: "description",
            content: `Belajar ${loaderData.world.title} melalui permainan interaktif dan pertarungan boss di Matematikku.`,
          },
        ]
      : [{ title: "Dunia — Matematikku" }],
  }),
  component: WorldPage,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center">
      <div className="retro-card p-8 text-center">
        <div className="font-display text-2xl text-navy">
          Dunia tidak ditemukan
        </div>
        <Link
          to="/worlds"
          className="mt-4 inline-block font-display text-[10px] text-coral"
        >
          ← KEMBALI KE PETA
        </Link>
      </div>
    </div>
  ),
});

type Question = {
  a: number;
  b: number;
  op: "+" | "−" | "×" | "÷";
  answer: number;
  choices: number[];
  label?: string;
};

function makeQuestion(worldId: string): Question {
  const rand = (n: number) => Math.floor(Math.random() * n) + 1;
  let a: number,
    b: number,
    op: Question["op"],
    answer: number,
    label: string | undefined;

  switch (worldId) {
    case "subtraction": {
      a = rand(15) + 5;
      b = rand(a - 1);
      op = "−";
      answer = a - b;
      break;
    }
    case "multiplication": {
      a = rand(9) + 1;
      b = rand(9) + 1;
      op = "×";
      answer = a * b;
      break;
    }
    case "division": {
      // Generate clean division (no remainder)
      b = rand(9) + 1;
      answer = rand(10) + 1;
      a = b * answer;
      op = "÷";
      break;
    }
    case "fractions": {
      // Simple fraction addition: a/d + b/d = ?/d
      const denom = [2, 3, 4, 5, 6, 8][rand(6) - 1];
      a = rand(denom - 1);
      b = rand(denom - a);
      op = "+";
      answer = a + b;
      label = `${a}/${denom} + ${b}/${denom} = ?/${denom}`;
      break;
    }
    case "counting": {
      a = rand(9);
      b = rand(9);
      op = "+";
      answer = a + b;
      break;
    }
    default: {
      a = rand(12);
      b = rand(12);
      op = "+";
      answer = a + b;
    }
  }
  const set = new Set<number>([answer]);
  while (set.size < 4)
    set.add(Math.max(0, answer + (Math.floor(Math.random() * 7) - 3)));
  const choices = Array.from(set).sort(() => Math.random() - 0.5);
  return { a, b, op, answer, choices, label };
}

function WorldPage() {
  const { world } = Route.useLoaderData();
  const { play } = useSound();
  const { getWorldProgress, updateWorldProgress } = useProgress();

  const [q, setQ] = useState<Question>(() => makeQuestion(world.id));
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [streak, setStreak] = useState(0);
  const [round, setRound] = useState(1);

  const wp = getWorldProgress(world.id);

  // Save progress when score changes
  useEffect(() => {
    if (score > 0) {
      updateWorldProgress(world.id, {
        highScore: score,
        bestCombo: streak,
      });
    }
  }, [score, streak, world.id, updateWorldProgress]);

  const isCorrect = picked !== null && picked === q.answer;
  const isWrong = picked !== null && picked !== q.answer;

  function pick(n: number) {
    if (picked !== null) return;
    setPicked(n);
    if (n === q.answer) {
      const gain = 10 + combo * 2;
      setScore((s) => s + gain);
      setCombo((c) => c + 1);
      setStreak((s) => Math.max(s, combo + 1));
      if (combo >= 4) {
        play("combo");
      } else {
        play("correct");
      }
      updateWorldProgress(world.id, {
        totalAnswered: 1,
        totalCorrect: 1,
      });
    } else {
      setCombo(0);
      play("wrong");
      updateWorldProgress(world.id, {
        totalAnswered: 1,
        totalCorrect: 0,
      });
    }
    setTimeout(() => {
      setPicked(null);
      setQ(makeQuestion(world.id));
      setRound((r) => r + 1);
    }, 1100);
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="relative overflow-hidden pixel-grid">
        <FloatingSymbols count={10} />
        <div className="relative mx-auto max-w-5xl px-5 py-10">
          <Link
            to="/worlds"
            className="mb-6 inline-block font-display text-[10px] text-coral"
          >
            ← PETA DUNIA
          </Link>

          {/* Header banner */}
          <div className="retro-card mb-6 flex flex-wrap items-center justify-between gap-4 p-5">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: [0, 6, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="grid h-16 w-16 place-items-center rounded-2xl border-[3px] border-navy bg-gold text-3xl shadow-[3px_3px_0_0_var(--navy)]"
              >
                {world.emoji}
              </motion.div>
              <div>
                <div className="font-display text-[10px] text-coral">
                  DUNIA {String(world.number).padStart(2, "0")}
                </div>
                <h1 className="text-2xl leading-tight text-navy md:text-3xl">
                  {world.title}
                </h1>
                <p className="text-sm font-bold text-navy/60">
                  {world.subtitle}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Stat label="SKOR" value={score} color="bg-mint" />
              <Stat label="KOMBO" value={`x${combo}`} color="bg-coral" />
              <Stat label="RONDE" value={round} color="bg-sky" />
            </div>
          </div>

          {/* Best score banner */}
          {wp.highScore > 0 && (
            <div className="mb-4 flex items-center gap-3 rounded-xl border-[2px] border-navy/30 bg-gold/20 px-4 py-2">
              <span className="text-lg">🏅</span>
              <span className="font-body text-sm font-bold text-navy/70">
                Skor Tertinggi: {wp.highScore} · Kombo Terbaik: x{wp.bestCombo}{" "}
                · Benar: {wp.totalCorrect}/{wp.totalAnswered}
              </span>
            </div>
          )}

          {/* Lesson card */}
          <div className="grid gap-6 lg:grid-cols-5">
            <div className="retro-card p-6 lg:col-span-3">
              <div className="mb-4 flex items-center justify-between">
                <div className="font-display text-[10px] text-navy/60">
                  PELAJARAN INTERAKTIF
                </div>
                <div className="font-display text-[10px] text-navy/60">
                  KETUK JAWABAN
                </div>
              </div>

              {/* Visualization */}
              <div className="mb-6 flex flex-wrap items-center justify-center gap-4 rounded-2xl border-[3px] border-navy bg-cream p-5">
                {q.label ? (
                  <div className="font-display text-2xl text-navy md:text-3xl">
                    {q.label}
                  </div>
                ) : (
                  <>
                    <ObjectGroup count={q.a} color="bg-coral" />
                    <div className="font-display text-3xl text-navy">
                      {q.op}
                    </div>
                    <ObjectGroup count={q.b} color="bg-mint" />
                    <div className="font-display text-3xl text-navy">=</div>
                    <div className="grid h-16 w-16 place-items-center rounded-2xl border-[3px] border-navy bg-gold shadow-[3px_3px_0_0_var(--navy)]">
                      <AnimatePresence mode="wait">
                        {isCorrect ? (
                          <motion.span
                            key="ans"
                            initial={{ scale: 0, rotate: -30 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="font-display text-xl text-navy"
                          >
                            {q.answer}
                          </motion.span>
                        ) : (
                          <motion.span
                            key="q"
                            className="font-display text-xl text-navy"
                          >
                            ?
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </>
                )}
              </div>

              {/* Equation */}
              <div className="mb-6 text-center">
                <div className="font-display text-2xl text-navy md:text-4xl">
                  {q.label ? (
                    q.label
                  ) : (
                    <>
                      {q.a} <span className="text-coral">{q.op}</span> {q.b} =
                      ?
                    </>
                  )}
                </div>
              </div>

              {/* Choices */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {q.choices.map((c) => {
                  const state =
                    picked === null
                      ? "idle"
                      : c === q.answer
                        ? "correct"
                        : c === picked
                          ? "wrong"
                          : "dim";
                  return (
                    <motion.button
                      key={c}
                      whileHover={picked === null ? { y: -4 } : {}}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => pick(c)}
                      className={`rounded-2xl border-[3px] border-navy px-4 py-4 font-display text-lg shadow-[4px_4px_0_0_var(--navy)] transition ${
                        state === "correct"
                          ? "bg-mint text-navy"
                          : state === "wrong"
                            ? "bg-destructive text-cream"
                            : state === "dim"
                              ? "bg-cream/60 text-navy/50"
                              : "bg-cream text-navy hover:bg-sky"
                      }`}
                    >
                      {c}
                    </motion.button>
                  );
                })}
              </div>

              <AnimatePresence>
                {isCorrect && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-5 rounded-xl border-[3px] border-navy bg-mint p-3 text-center font-display text-[10px] text-navy"
                  >
                    ✨ BENAR! +{10 + combo * 2} XP · KOMBO x{combo + 1}
                  </motion.div>
                )}
                {isWrong && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: [0, -6, 6, -4, 4, 0] }}
                    exit={{ opacity: 0 }}
                    className="mt-5 rounded-xl border-[3px] border-navy bg-blush p-3 text-center font-display text-[10px] text-navy"
                  >
                    💥 KURANG TEPAT — JAWABAN: {q.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Side panel */}
            <div className="flex flex-col gap-4 lg:col-span-2">
              <div className="retro-card p-5">
                <div className="mb-3 font-display text-[10px] text-navy/60">
                  POHON KEAHLIAN
                </div>
                <div className="space-y-3">
                  {world.topics.map((t: string, i: number) => (
                    <div key={t}>
                      <div className="flex items-center justify-between text-sm font-bold text-navy">
                        <span>{t}</span>
                        <span className="font-display text-[10px]">
                          {[62, 34, 15][i] ?? 0}%
                        </span>
                      </div>
                      <div className="mt-1 h-3 overflow-hidden rounded-full border-[2px] border-navy bg-cream">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${[62, 34, 15][i] ?? 0}%`,
                          }}
                          transition={{
                            duration: 0.8,
                            delay: i * 0.1,
                          }}
                          className={`h-full ${i === 0 ? "bg-mint" : i === 1 ? "bg-gold" : "bg-coral"}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="retro-card p-5">
                <div className="mb-3 font-display text-[10px] text-navy/60">
                  PENCAPAIAN
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { e: "⚡", n: "Kilat", got: streak >= 3 },
                    { e: "🎯", n: "Tajam", got: score >= 50 },
                    { e: "🔥", n: "Kombo5", got: streak >= 5 },
                    { e: "🏆", n: "Boss", got: false },
                    { e: "💎", n: "Permata", got: false },
                    { e: "🚀", n: "Luncur", got: round >= 3 },
                  ].map((a) => (
                    <motion.div
                      key={a.n}
                      whileHover={{ y: -2 }}
                      className={`grid place-items-center rounded-xl border-[3px] border-navy p-2 text-center ${a.got ? "bg-gold" : "bg-cream/60 opacity-60"}`}
                    >
                      <div className="text-2xl">{a.e}</div>
                      <div className="font-display text-[9px] text-navy">
                        {a.n}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="retro-card overflow-hidden">
                <div className="border-b-[3px] border-navy bg-grape p-3 font-display text-[10px] text-cream">
                  BOSS · LEVEL {world.number * 3}
                </div>
                <div className="p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        rotate: [-3, 3, -3],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-4xl"
                    >
                      👾
                    </motion.div>
                    <div>
                      <div className="font-display text-sm text-navy">
                        NUMERON
                      </div>
                      <div className="text-xs font-bold text-navy/60">
                        Capai ronde 10 untuk menantang
                      </div>
                    </div>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full border-[2px] border-navy bg-cream">
                    <motion.div
                      animate={{
                        width: `${Math.min(100, round * 10)}%`,
                      }}
                      className="h-full bg-destructive"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div
      className={`rounded-xl border-[3px] border-navy px-3 py-2 text-center shadow-[3px_3px_0_0_var(--navy)] ${color}`}
    >
      <div className="font-display text-sm text-navy">{value}</div>
      <div className="font-display text-[9px] text-navy/70">{label}</div>
    </div>
  );
}

function ObjectGroup({ count, color }: { count: number; color: string }) {
  // Limit visual objects to avoid performance issues
  const displayCount = Math.min(count, 20);
  return (
    <div className="flex max-w-[180px] flex-wrap justify-center gap-1.5">
      {Array.from({ length: displayCount }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, y: -20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{
            delay: i * 0.04,
            type: "spring",
            stiffness: 260,
            damping: 14,
          }}
          className={`h-6 w-6 rounded-md border-[2px] border-navy ${color} shadow-[2px_2px_0_0_var(--navy)]`}
        />
      ))}
      {count > 20 && (
        <div className="grid h-6 w-6 place-items-center rounded-md border-[2px] border-navy bg-cream font-display text-[8px] text-navy">
          +{count - 20}
        </div>
      )}
    </div>
  );
}
