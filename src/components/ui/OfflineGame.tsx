"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Star = { x: number; y: number; size: number; speed: number };
type Asteroid = { x: number; y: number; size: number; speed: number; rotation: number };
type DataPoint = { x: number; y: number; collected: boolean };

const SHIP_WIDTH = 30;
const SHIP_HEIGHT = 30;

export function OfflineGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shipRef = useRef({ x: 200, y: 350 });
  const starsRef = useRef<Star[]>([]);
  const asteroidsRef = useRef<Asteroid[]>([]);
  const dataRef = useRef<DataPoint[]>([]);
  const scoreRef = useRef(0);
  const gameOverRef = useRef(false);
  const frameRef = useRef(0);
  const keysRef = useRef({ left: false, right: false, up: false, down: false });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [online, setOnline] = useState(true);

  useEffect(() => {
    setOnline(navigator.onLine);
    const goOnline = () => { setOnline(true); setStarted(false); };
    const goOffline = () => setOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  const initStars = useCallback((w: number, h: number) => {
    starsRef.current = Array.from({ length: 60 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      size: 0.5 + Math.random() * 2, speed: 0.3 + Math.random() * 0.8
    }));
  }, []);

  const reset = useCallback(() => {
    if (!canvasRef.current) return;
    const w = canvasRef.current.width;
    const h = canvasRef.current.height;
    shipRef.current = { x: w / 2, y: h - 60 };
    asteroidsRef.current = [];
    dataRef.current = [];
    scoreRef.current = 0;
    gameOverRef.current = false;
    setScore(0);
    setGameOver(false);
    setStarted(true);
  }, []);

  useEffect(() => {
    if (!started) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = 400;
    const h = 500;
    canvas.width = w;
    canvas.height = h;
    initStars(w, h);
    shipRef.current = { x: w / 2, y: h - 60 };

    function spawnAsteroid() {
      asteroidsRef.current.push({
        x: Math.random() * w, y: -20,
        size: 10 + Math.random() * 20,
        speed: 1.5 + Math.random() * 2.5,
        rotation: Math.random() * Math.PI * 2
      });
    }

    function spawnData() {
      if (Math.random() < 0.3) {
        dataRef.current.push({
          x: Math.random() * w, y: -10,
          collected: false
        });
      }
    }

    function drawShip(x: number, y: number) {
      ctx!.save();
      ctx!.translate(x, y);
      ctx!.fillStyle = "#21F1A8";
      ctx!.beginPath();
      ctx!.moveTo(0, -SHIP_HEIGHT / 2);
      ctx!.lineTo(-SHIP_WIDTH / 2, SHIP_HEIGHT / 2);
      ctx!.lineTo(SHIP_WIDTH / 2, SHIP_HEIGHT / 2);
      ctx!.closePath();
      ctx!.fill();
      ctx!.fillStyle = "#21F1A8";
      ctx!.globalAlpha = 0.3;
      ctx!.beginPath();
      ctx!.arc(0, SHIP_HEIGHT / 4, 8, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.globalAlpha = 1;
      ctx!.restore();
    }

    function drawAsteroid(a: Asteroid) {
      ctx!.save();
      ctx!.translate(a.x, a.y);
      ctx!.rotate(a.rotation);
      ctx!.fillStyle = "#666";
      ctx!.strokeStyle = "#888";
      ctx!.lineWidth = 1.5;
      ctx!.beginPath();
      const s = a.size;
      ctx!.moveTo(0, -s);
      ctx!.lineTo(s * 0.7, -s * 0.5);
      ctx!.lineTo(s, s * 0.2);
      ctx!.lineTo(s * 0.3, s);
      ctx!.lineTo(-s * 0.4, s * 0.8);
      ctx!.lineTo(-s * 0.8, s * 0.2);
      ctx!.closePath();
      ctx!.fill();
      ctx!.stroke();
      ctx!.restore();
    }

    function drawData(d: DataPoint) {
      ctx!.save();
      ctx!.translate(d.x, d.y);
      ctx!.fillStyle = "#21F1A8";
      ctx!.globalAlpha = 0.8;
      ctx!.font = "14px monospace";
      ctx!.textAlign = "center";
      ctx!.fillText("✦", 0, 4);
      ctx!.globalAlpha = 1;
      ctx!.restore();
    }

    let spawnTimer = 0;

    function loop() {
      if (!ctx || gameOverRef.current) return;
      frameRef.current = requestAnimationFrame(loop);

      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(0, 0, w, h);

      starsRef.current.forEach((s) => {
        s.y += s.speed;
        if (s.y > h) { s.y = 0; s.x = Math.random() * w; }
        ctx!.fillStyle = "#fff";
        ctx!.globalAlpha = 0.3 + Math.random() * 0.3;
        ctx!.fillRect(s.x, s.y, s.size, s.size);
        ctx!.globalAlpha = 1;
      });

      const ship = shipRef.current;
      if (keysRef.current.left && ship.x > SHIP_WIDTH / 2) ship.x -= 4;
      if (keysRef.current.right && ship.x < w - SHIP_WIDTH / 2) ship.x += 4;
      if (keysRef.current.up && ship.y > SHIP_HEIGHT / 2) ship.y -= 4;
      if (keysRef.current.down && ship.y < h - SHIP_HEIGHT / 2) ship.y += 4;

      spawnTimer++;
      if (spawnTimer % 25 === 0) spawnAsteroid();
      if (spawnTimer % 20 === 0) spawnData();

      asteroidsRef.current = asteroidsRef.current.filter((a) => {
        a.y += a.speed;
        a.rotation += 0.03;
        drawAsteroid(a);
        if (a.y > h + 20) return false;
        const dx = ship.x - a.x;
        const dy = ship.y - a.y;
        if (Math.sqrt(dx * dx + dy * dy) < a.size + 12) {
          gameOverRef.current = true;
          setGameOver(true);
          return false;
        }
        return true;
      });

      dataRef.current = dataRef.current.filter((d) => {
        d.y += 2;
        drawData(d);
        if (d.y > h + 10) return false;
        if (d.collected) return false;
        const dx = ship.x - d.x;
        const dy = ship.y - d.y;
        if (Math.sqrt(dx * dx + dy * dy) < 18) {
          d.collected = true;
          scoreRef.current += 10;
          setScore(scoreRef.current);
          return false;
        }
        return true;
      });

      drawShip(ship.x, ship.y);

      ctx!.fillStyle = "#21F1A8";
      ctx!.font = "bold 16px monospace";
      ctx!.textAlign = "left";
      ctx!.fillText(`Score: ${scoreRef.current}`, 10, 25);
    }

    loop();
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [started, initStars]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      keysRef.current = {
        left: e.key === "ArrowLeft" || e.key === "a",
        right: e.key === "ArrowRight" || e.key === "d",
        up: e.key === "ArrowUp" || e.key === "w",
        down: e.key === "ArrowDown" || e.key === "s",
      };
    }
    function handleKeyUp(e: KeyboardEvent) {
      if (e.key === "ArrowLeft" || e.key === "a") keysRef.current.left = false;
      if (e.key === "ArrowRight" || e.key === "d") keysRef.current.right = false;
      if (e.key === "ArrowUp" || e.key === "w") keysRef.current.up = false;
      if (e.key === "ArrowDown" || e.key === "s") keysRef.current.down = false;
    }
    window.addEventListener("keydown", handleKey);
    window.addEventListener("keyup", handleKeyUp);
    return () => { window.removeEventListener("keydown", handleKey); window.removeEventListener("keyup", handleKeyUp); };
  }, []);

  if (online) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void/95 backdrop-blur-sm">
      <div className="text-center">
        <p className="mb-2 text-caption font-semibold uppercase tracking-[0.05em] text-plum-voltage">
          No Signal Detected
        </p>
        <h2 className="mb-1 text-heading-sm font-extralight leading-[1.1] tracking-[-0.04em] text-bone">
          You&apos;re Offline
        </h2>
        <p className="mb-4 text-subheading font-regular leading-[1.5] tracking-[0.025em] text-smoke">
          Play a game while you wait for connection
        </p>

        <div className="mx-auto w-[400px] overflow-hidden rounded-[24px] border border-white/[0.1]">
          <canvas
            ref={canvasRef}
            className="block h-[500px] w-full bg-void"
          />
        </div>

        <div className="mt-4 flex items-center justify-center gap-4">
          {!started || gameOver ? (
            <button
              onClick={reset}
              className="rounded-[24px] bg-plum-voltage px-6 py-3 text-caption font-semibold uppercase tracking-[0.05em] text-void transition hover:opacity-90"
            >
              {gameOver ? `Play Again (Score: ${score})` : "Start Game"}
            </button>
          ) : (
            <p className="text-body-sm font-regular leading-[1.5] tracking-[0.025em] text-smoke">
              Arrow/WASD keys to move &bull; Collect ✦ for points
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
