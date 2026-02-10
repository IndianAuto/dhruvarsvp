"use client";

import { useEffect, useState } from "react";

const CONFETTI_COLORS = ["#E31837", "#FFC72C", "#1A1A1A", "#FFFFFF", "#FF6B6B"];

interface ConfettiPiece {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
  shape: "circle" | "square" | "star";
}

export function Confetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const confetti: ConfettiPiece[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 4,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      size: 6 + Math.random() * 8,
      shape: (["circle", "square", "star"] as const)[
        Math.floor(Math.random() * 3)
      ],
    }));
    setPieces(confetti);

    const timer = setTimeout(() => setPieces([]), 7000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s, ${piece.duration * 0.5}s`,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: piece.shape === "circle" ? "50%" : "0",
            transform: piece.shape === "star" ? "rotate(45deg)" : undefined,
          }}
        />
      ))}
    </div>
  );
}

export function MickeyEars({
  size = 60,
  color = "#1A1A1A",
  className = "",
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  const headSize = size * 0.67;
  const earSize = size * 0.4;

  return (
    <div
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Left ear */}
      <div
        className="absolute rounded-full"
        style={{
          width: earSize,
          height: earSize,
          backgroundColor: color,
          top: 0,
          left: size * 0.07,
        }}
      />
      {/* Right ear */}
      <div
        className="absolute rounded-full"
        style={{
          width: earSize,
          height: earSize,
          backgroundColor: color,
          top: 0,
          right: size * 0.07,
        }}
      />
      {/* Head */}
      <div
        className="absolute rounded-full"
        style={{
          width: headSize,
          height: headSize,
          backgroundColor: color,
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
    </div>
  );
}

export function MickeyDivider() {
  return (
    <div className="mickey-divider my-8">
      <MickeyEars size={30} color="#E31837" />
    </div>
  );
}

export function FloatingMickeys() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute opacity-5 float-animation"
          style={{
            left: `${15 + i * 15}%`,
            top: `${10 + (i % 3) * 30}%`,
            animationDelay: `${i * 0.5}s`,
          }}
        >
          <MickeyEars size={40 + i * 10} color="#E31837" />
        </div>
      ))}
    </div>
  );
}
