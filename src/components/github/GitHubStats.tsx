"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaCodeFork, FaFire } from "react-icons/fa6";
import { FiGitCommit, FiArrowUpRight, FiActivity } from "react-icons/fi";
import { fadeUp, staggerContainer } from "@/animations/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface GitHubData {
  public_repos: number;
  commits: number;
  contributions: ContributionDay[];
  totalContributions: number;
}

function generateFallbackContributions(): ContributionDay[] {
  const days: ContributionDay[] = [];
  const today = new Date();
  for (let i = 363; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const seed = (d.getFullYear() * 1000 + d.getMonth() * 50 + d.getDate()) % 17;
    let count = 0;
    let level = 0;
    if (seed > 11) {
      count = seed - 9;
      level = count > 5 ? 4 : count > 3 ? 3 : count > 1 ? 2 : 1;
    } else if (seed > 7) {
      count = 1;
      level = 1;
    }
    days.push({ date: dateStr, count, level });
  }
  return days;
}

// Row-major serpentine path: even rows left to right, odd rows right to left
// This matches the real GitHub Contribution Snake animation
function buildSnakePath(numCols: number, numRows: number): { col: number; row: number }[] {
  const path: { col: number; row: number }[] = [];
  for (let row = 0; row < numRows; row++) {
    if (row % 2 === 0) {
      for (let col = 0; col < numCols; col++) path.push({ col, row });
    } else {
      for (let col = numCols - 1; col >= 0; col--) path.push({ col, row });
    }
  }
  return path;
}

const SNAKE_LENGTH = 12;
const SNAKE_SPEED_MS = 55;

export function GitHubStats() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [snakeHead, setSnakeHead] = useState(0);
  const eatenSet = useRef<Set<number>>(new Set());
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let mounted = true;
    fetch("/api/github")
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((resData: GitHubData) => {
        if (mounted) {
          setData(resData);
          setLoading(false);
        }
      })
      .catch(() => {
        if (mounted) {
          setData({
            public_repos: 32,
            commits: 369,
            contributions: generateFallbackContributions(),
            totalContributions: 369,
          });
          setLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  const { weeks, monthLabels } = useMemo(() => {
    const rawDays =
      data?.contributions?.length
        ? data.contributions
        : generateFallbackContributions();
    const displayDays = rawDays.slice(-364);
    const weeksArr: ContributionDay[][] = [];
    for (let i = 0; i < displayDays.length; i += 7) {
      weeksArr.push(displayDays.slice(i, i + 7));
    }
    const months: { name: string; colIndex: number }[] = [];
    let lastMonth = "";
    weeksArr.forEach((week, colIdx) => {
      if (week[0]?.date) {
        const d = new Date(week[0].date);
        const monthName = d.toLocaleString("default", { month: "short" });
        if (monthName !== lastMonth) {
          months.push({ name: monthName, colIndex: colIdx });
          lastMonth = monthName;
        }
      }
    });
    return { weeks: weeksArr, monthLabels: months };
  }, [data]);

  const snakePath = useMemo(
    () => buildSnakePath(weeks.length || 52, 7),
    [weeks.length]
  );
  const totalCells = snakePath.length;

  useEffect(() => {
    if (totalCells === 0) return;
    const interval = setInterval(() => {
      setSnakeHead((prev) => {
        const next = (prev + 1) % totalCells;
        eatenSet.current.add(next);
        setTimeout(() => {
          eatenSet.current.delete(next);
          setTick((t) => t + 1);
        }, SNAKE_SPEED_MS * SNAKE_LENGTH * 1.8);
        return next;
      });
      setTick((t) => t + 1);
    }, SNAKE_SPEED_MS);
    return () => clearInterval(interval);
  }, [totalCells]);

  const snakeLookup = useMemo<Map<string, number>>(() => {
    const map = new Map<string, number>();
    for (let seg = 0; seg < SNAKE_LENGTH; seg++) {
      const idx = (snakeHead - seg + totalCells) % totalCells;
      const cell = snakePath[idx];
      if (cell) map.set(`${cell.col}-${cell.row}`, seg);
    }
    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snakeHead, totalCells, tick]);

  const eatenLookup = useMemo<Set<string>>(() => {
    const set = new Set<string>();
    eatenSet.current.forEach((pathIdx) => {
      const cell = snakePath[pathIdx];
      if (cell) set.add(`${cell.col}-${cell.row}`);
    });
    return set;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick, snakePath]);

  const handleMouseEnter = (day: ContributionDay, e: React.MouseEvent) => {
    setHoveredDay(day);
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top - 40 });
  };

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-[#0a3d2e] border-[#0d5c44]";
      case 2:
        return "bg-[#1a7a5c] border-[#22a078]";
      case 3:
        return "bg-[#21f1a8] border-[#40ffbe] shadow-[0_0_6px_rgba(33,241,168,0.35)]";
      case 4:
        return "bg-[#6bffd0] border-[#a1ffe2] shadow-[0_0_10px_rgba(107,255,208,0.6)]";
      default:
        return "bg-[#161b22] border-[#21262d]";
    }
  };

  const getSnakeColor = (seg: number) => {
    const colors = [
      "bg-[#c8ff80] border-[#deff9f] shadow-[0_0_16px_rgba(200,255,128,0.95)] z-20 scale-[1.4]",
      "bg-[#9bff6e] border-[#c5ffaa] shadow-[0_0_12px_rgba(155,255,110,0.85)] z-10 scale-[1.2]",
      "bg-[#6bffd0] border-[#a1ffe2] shadow-[0_0_8px_rgba(107,255,208,0.7)]",
      "bg-[#21f1a8] border-[#40ffbe] shadow-[0_0_6px_rgba(33,241,168,0.55)]",
      "bg-[#18d990] border-[#21f1a8]",
      "bg-[#12c07c] border-[#18d990]",
      "bg-[#0ea86c] border-[#12c07c]",
      "bg-[#0a9260] border-[#0ea86c]",
      "bg-[#087c52] border-[#0a9260]",
      "bg-[#066845] border-[#087c52]",
      "bg-[#04563a] border-[#066845]",
      "bg-[#034530] border-[#04563a]",
    ];
    return colors[Math.min(seg, colors.length - 1)];
  };

  const progress = totalCells > 0 ? snakeHead / totalCells : 0;
  const headCell = snakePath[snakeHead];

  return (
    <section id="github" className="section-shell py-6 sm:py-[45px]">
      <SectionHeading
        eyebrow="GitHub Trail"
        title="Live Code Contributions & Activity."
        description="Compact live stats and interactive 365-day contribution plot with animated Snake mode."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="flex flex-col gap-4 max-w-5xl mx-auto"
      >
        {/* Header + Stats */}
        <motion.div
          variants={fadeUp}
          className="rounded-[20px] border border-white/[0.08] bg-void/60 p-5 md:p-6 backdrop-blur-[4px] shadow-xl relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-plum-voltage/10 blur-[80px] pointer-events-none" />
          <div className="grid gap-4 md:grid-cols-[1fr_auto_auto] items-center">
            <div className="flex items-center gap-3.5">
              <div className="grid h-12 w-12 place-items-center rounded-[14px] bg-gradient-to-br from-plum-voltage via-[#18b57d] to-lichen text-void font-bold shadow-md shadow-plum-voltage/15">
                <FaGithub size={26} />
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className="text-body-sm font-semibold tracking-[0.021em] text-bone">
                    sachinmasti
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded-full border border-plum-voltage/40 bg-plum-voltage/10 px-2 py-0.5 text-[10px] font-semibold text-plum-voltage">
                    <span className="h-1.5 w-1.5 rounded-full bg-plum-voltage animate-ping" />
                    LIVE
                  </span>
                </div>
                <p className="text-caption font-regular text-smoke mt-0.5">
                  {loading
                    ? "Fetching live stats..."
                    : `${data?.public_repos ?? 32} Public Repos - ${data?.commits ?? 369} Commits`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 rounded-[16px] border border-plum-voltage/25 bg-plum-voltage/[0.06] px-4 py-3 backdrop-blur-sm">
              <div className="grid h-8 w-8 place-items-center rounded-[10px] bg-plum-voltage/20 text-plum-voltage">
                <FiGitCommit size={16} />
              </div>
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-smoke block">
                  Total Commits
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-heading-sm font-light leading-none text-bone">
                    {loading ? "..." : (data?.commits ?? 369).toLocaleString()}
                  </span>
                  <FaFire size={11} className="text-plum-voltage animate-pulse" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-3.5 rounded-[16px] border border-white/[0.08] bg-white/[0.03] px-4 py-3 backdrop-blur-sm">
                <div className="grid h-8 w-8 place-items-center rounded-[10px] bg-white/[0.08] text-amber-spark">
                  <FaCodeFork size={15} />
                </div>
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-smoke block">
                    Public Repos
                  </span>
                  <span className="text-heading-sm font-light leading-none text-bone">
                    {loading
                      ? "..."
                      : (data?.public_repos ?? 32).toLocaleString()}
                  </span>
                </div>
              </div>
              <a
                href="https://github.com/sachinmasti"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center gap-1.5 rounded-[16px] bg-plum-voltage px-4 text-caption font-semibold uppercase tracking-wider text-void transition hover:bg-white hover:scale-[1.02] shadow-sm shadow-plum-voltage/15"
                data-cursor="magnetic"
              >
                <FaGithub size={15} />
                <FiArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Contribution Graph + Snake */}
        <motion.div
          variants={fadeUp}
          className="rounded-[20px] border border-white/[0.08] bg-void/60 p-5 md:p-6 backdrop-blur-[4px] shadow-xl relative overflow-hidden"
        >
          {/* Ambient glow following snake head */}
          {headCell && (
            <div
              className="absolute pointer-events-none rounded-full blur-[60px] transition-all duration-75"
              style={{
                width: 100,
                height: 100,
                background:
                  "radial-gradient(circle, rgba(200,255,128,0.22) 0%, transparent 70%)",
                left: `${(headCell.col / (weeks.length || 52)) * 100}%`,
                top: `${30 + (headCell.row / 7) * 40}%`,
                transform: "translate(-50%,-50%)",
              }}
            />
          )}

          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2.5">
              <div className="grid h-8 w-8 place-items-center rounded-[10px] bg-plum-voltage/15 text-plum-voltage">
                <FiActivity size={16} />
              </div>
              <div>
                <h4 className="text-body-sm font-semibold tracking-[0.021em] text-bone">
                  Contribution Snake
                </h4>
                <p className="text-caption text-smoke">
                  {data?.totalContributions ?? 369} contributions - serpentine
                  path
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 rounded-full border border-[#9bff6e]/30 bg-[#9bff6e]/10 px-3 py-1 text-[11px] font-semibold text-[#9bff6e]">
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className="inline-block rounded-full"
                  style={{
                    width: Math.max(3, 7 - i),
                    height: Math.max(3, 7 - i),
                    background: `rgba(200,255,128,${1 - i * 0.18})`,
                  }}
                />
              ))}
              <span className="ml-0.5">Snake Active</span>
            </div>
          </div>

          {/* Grid */}
          <div className="w-full overflow-x-auto rounded-[16px] border border-white/[0.06] bg-[#0d1117] p-4">
            <div className="min-w-[700px] flex flex-col gap-1.5">
              {/* Month labels */}
              <div className="flex text-[10px] font-semibold text-ash pl-7 mb-1 relative h-3.5">
                {monthLabels.map((m, idx) => (
                  <span
                    key={`${m.name}-${idx}`}
                    style={{ left: `${28 + (m.colIndex / 52) * 95}%` }}
                    className="absolute"
                  >
                    {m.name}
                  </span>
                ))}
              </div>

              {/* Day labels + grid columns */}
              <div className="flex items-start gap-2">
                <div
                  className="flex flex-col justify-between text-[9px] font-medium text-smoke pt-0.5"
                  style={{ height: 7 * 11 + 6 * 3 }}
                >
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                </div>

                <div className="flex gap-[3px] flex-1">
                  {weeks.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-[3px]">
                      {week.map((day, dIdx) => {
                        const cellKey = `${wIdx}-${dIdx}`;
                        const seg = snakeLookup.get(cellKey);
                        const isSnake = seg !== undefined;
                        const isEaten = !isSnake && eatenLookup.has(cellKey);

                        return (
                          <div
                            key={cellKey}
                            onMouseEnter={(e) => handleMouseEnter(day, e)}
                            onMouseLeave={() => setHoveredDay(null)}
                            className={[
                              "relative h-[11px] w-[11px] rounded-[2px] border transition-all duration-75 cursor-pointer",
                              isSnake
                                ? getSnakeColor(seg!)
                                : isEaten
                                ? "bg-[#9b4dca] border-[#c084fc] shadow-[0_0_8px_rgba(155,77,202,0.8)]"
                                : getLevelColor(day.level),
                            ].join(" ")}
                          >
                            {seg === 0 && (
                              <>
                                <span className="absolute left-[1.5px] top-[2px] h-[2.5px] w-[2.5px] rounded-full bg-[#0d1117]" />
                                <span className="absolute right-[1.5px] top-[2px] h-[2.5px] w-[2.5px] rounded-full bg-[#0d1117]" />
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress bar + legend */}
              <div className="mt-3 pt-3 border-t border-white/[0.06] flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-[5px] rounded-full bg-white/[0.06] overflow-visible relative">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{
                        width: `${progress * 100}%`,
                        background:
                          "linear-gradient(90deg, #0a3d2e 0%, #1a7a5c 35%, #21f1a8 72%, #c8ff80 100%)",
                      }}
                    />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-[10px] w-[10px] rounded-full bg-[#c8ff80] shadow-[0_0_10px_rgba(200,255,128,0.95)]"
                      style={{ left: `${progress * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-semibold text-[#9bff6e] w-8 text-right">
                    {Math.round(progress * 100)}%
                  </span>
                </div>

                <div className="flex items-center justify-between text-caption text-smoke">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-bone">
                      {data?.totalContributions ?? 369}
                    </span>
                    <span>contributions in 1 year</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px]">
                    <span>Less</span>
                    <div className="flex items-center gap-1">
                      <span className="h-2.5 w-2.5 rounded-[2px] bg-[#161b22] border border-[#21262d]" />
                      <span className="h-2.5 w-2.5 rounded-[2px] bg-[#0a3d2e] border border-[#0d5c44]" />
                      <span className="h-2.5 w-2.5 rounded-[2px] bg-[#1a7a5c] border border-[#22a078]" />
                      <span className="h-2.5 w-2.5 rounded-[2px] bg-[#21f1a8] border border-[#40ffbe]" />
                      <span className="h-2.5 w-2.5 rounded-[2px] bg-[#6bffd0] border border-[#a1ffe2]" />
                    </div>
                    <span>More</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {hoveredDay && (
        <div
          style={{
            position: "fixed",
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
            transform: "translateX(-50%)",
          }}
          className="pointer-events-none z-50 rounded-[8px] border border-white/20 bg-void/90 px-2.5 py-1 text-[11px] font-semibold text-bone backdrop-blur-md shadow-lg"
        >
          <span className="text-plum-voltage">
            {hoveredDay.count} contributions
          </span>{" "}
          on {hoveredDay.date}
        </div>
      )}
    </section>
  );
}