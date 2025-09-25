import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

// Floaty, mouse-reactive geometric background that spans the entire app
const BackgroundFX = () => {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const viewportRef = useRef({ width: 1, height: 1 });
  const rafRef = useRef(null);
  const startRef = useRef(0);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      viewportRef.current = { width, height };
      const centerX = width / 2;
      const centerY = height / 2;
      posRef.current.x = centerX;
      posRef.current.y = centerY;
      mouseRef.current.x = centerX;
      mouseRef.current.y = centerY;
    };

    const handleMouseMove = (event) => {
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
    };

    updateViewport();

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", updateViewport);

    const animate = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = (timestamp - startRef.current) / 1000;

      const ease = 0.08;
      posRef.current.x += (mouseRef.current.x - posRef.current.x) * ease;
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * ease;

      const container = containerRef.current;
      if (container) {
        const { width, height } = viewportRef.current;
        const centerX = width / 2;
        const centerY = height / 2;
        const relativeX = width ? (posRef.current.x - centerX) / width : 0;
        const relativeY = height ? (posRef.current.y - centerY) / height : 0;

        container.querySelectorAll("[data-blob]").forEach((element) => {
          const strengthX = Number(element.getAttribute("data-strength-x")) || Number(element.getAttribute("data-strength")) || 0;
          const strengthY = Number(element.getAttribute("data-strength-y")) || Number(element.getAttribute("data-strength")) || 0;
          const rotate = Number(element.getAttribute("data-rotate")) || 0;
          const amplitudeX = Number(element.getAttribute("data-amplitude-x")) || 0;
          const amplitudeY = Number(element.getAttribute("data-amplitude-y")) || 0;
          const speed = Number(element.getAttribute("data-speed")) || 0;
          const phase = Number(element.getAttribute("data-phase")) || 0;

          const baseX = Math.sin(elapsed * speed + phase) * amplitudeX;
          const baseY = Math.cos(elapsed * speed + phase) * amplitudeY;
          const translateX = baseX + relativeX * strengthX;
          const translateY = baseY + relativeY * strengthY;

          element.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotate}deg)`;
        });
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", updateViewport);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const effectiveTheme = mounted && theme ? theme : "light";
  const isDark = effectiveTheme === "dark";
  const gridColor = isDark ? "rgba(148, 163, 184, 0.1)" : "rgba(15, 23, 42, 0.08)";
  const lineColor = isDark
    ? "rgba(148, 163, 184, 0.12)"
    : "rgba(30, 41, 59, 0.14)";
  const primaryAccent = isDark
    ? "rgba(59, 130, 246, 0.18)"
    : "rgba(2, 132, 199, 0.24)";
  const secondaryAccent = isDark
    ? "rgba(45, 212, 191, 0.16)"
    : "rgba(16, 185, 129, 0.25)";
  const highlightColor = isDark
    ? "rgba(129, 140, 248, 0.18)"
    : "rgba(59, 130, 246, 0.2)";
  const baseBackground = isDark ? "#000000" : "#f8fafc";
  const gridOverlay = isDark
    ? `radial-gradient(circle at 1px 1px, ${gridColor} 1px, transparent 0), linear-gradient(135deg, rgba(51, 65, 85, 0.35) 0%, rgba(15, 23, 42, 0) 55%)`
    : `radial-gradient(circle at 1px 1px, ${gridColor} 1px, transparent 0), linear-gradient(135deg, rgba(148, 163, 184, 0.08) 0%, rgba(15, 23, 42, 0) 55%)`;
  const overlayGradient = isDark
    ? "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(15,23,42,0.72) 45%, rgba(0,0,0,0.95) 100%)"
    : "linear-gradient(to bottom, rgba(248, 250, 252, 0.85) 0%, rgba(248, 250, 252, 0.4) 40%, rgba(248, 250, 252, 0.85) 100%)";
  const latticeGradient = isDark
    ? `linear-gradient(120deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px), linear-gradient(60deg, rgba(148, 163, 184, 0.05) 1px, transparent 1px)`
    : `linear-gradient(120deg, ${lineColor} 1px, transparent 1px), linear-gradient(60deg, ${lineColor} 1px, transparent 1px)`;
  const latticeMask = isDark
    ? "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.45) 20%, rgba(0,0,0,0.85) 65%, transparent 100%)"
    : "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.18) 18%, rgba(255,255,255,0.6) 55%, transparent 100%)";
  const latticeOpacity = isDark ? 0.14 : 0.28;

  const hexagonStyle = {
    willChange: "transform",
    clipPath:
      "polygon(50% 0%, 88% 18%, 100% 57%, 73% 100%, 27% 100%, 0% 57%, 12% 18%)",
    background: isDark
      ? `linear-gradient(165deg, rgba(17, 24, 39, 0.95) 18%, rgba(15, 23, 42, 0.6) 70%), radial-gradient(circle at 32% 24%, ${primaryAccent} 0%, transparent 62%)`
      : `radial-gradient(circle at 30% 25%, ${primaryAccent} 0%, transparent 55%), linear-gradient(145deg, rgba(255,255,255,0.55), rgba(255,255,255,0.12))`,
    border: isDark
      ? "1px solid rgba(71, 85, 105, 0.35)"
      : "1px solid rgba(15, 23, 42, 0.08)",
    boxShadow: isDark
      ? "0 40px 120px rgba(14, 165, 233, 0.08)"
      : "0 30px 80px rgba(14, 165, 233, 0.15)",
    opacity: isDark ? 0.72 : 1,
  };

  const trapezoidStyle = {
    willChange: "transform",
    clipPath: "polygon(12% 0%, 100% 8%, 88% 92%, 0% 82%)",
    background: isDark
      ? `linear-gradient(150deg, rgba(15, 23, 42, 0.92) 15%, rgba(30, 41, 59, 0.55) 70%), repeating-linear-gradient(135deg, transparent 0 18px, rgba(100, 116, 139, 0.12) 18px 19px)`
      : `linear-gradient(115deg, rgba(255,255,255,0.2) 15%, rgba(255,255,255,0) 65%), repeating-linear-gradient(135deg, transparent 0 18px, ${lineColor} 18px 19px)`,
    border: isDark
      ? "1px solid rgba(71, 85, 105, 0.3)"
      : "1px solid rgba(15, 23, 42, 0.08)",
    boxShadow: isDark
      ? "0 24px 120px rgba(37, 99, 235, 0.08)"
      : "0 20px 90px rgba(59, 130, 246, 0.18)",
    opacity: isDark ? 0.65 : 1,
  };

  const columnStyle = {
    willChange: "transform",
    clipPath: "polygon(50% 0%, 100% 30%, 85% 100%, 15% 100%, 0% 30%)",
    background: isDark
      ? `linear-gradient(160deg, rgba(17, 24, 39, 0.92) 20%, rgba(30, 41, 59, 0.52) 70%), radial-gradient(circle at 60% 20%, ${secondaryAccent} 0%, transparent 65%)`
      : `linear-gradient(160deg, rgba(255,255,255,0.3) 10%, rgba(255,255,255,0) 70%), radial-gradient(circle at 60% 20%, ${secondaryAccent} 0%, transparent 60%)`,
    border: isDark
      ? "1px solid rgba(71, 85, 105, 0.28)"
      : "1px solid rgba(15, 23, 42, 0.08)",
    boxShadow: isDark
      ? "0 24px 90px rgba(45, 212, 191, 0.08)"
      : "0 18px 70px rgba(16, 185, 129, 0.14)",
    opacity: isDark ? 0.7 : 1,
  };

  const orbStyle = {
    willChange: "transform",
    borderRadius: "50%",
    background: isDark
      ? `radial-gradient(circle at 50% 50%, ${secondaryAccent} 0%, transparent 70%), conic-gradient(from 160deg at 50% 50%, rgba(148, 163, 184, 0.35), rgba(0,0,0,0))`
      : `radial-gradient(circle at 50% 50%, ${secondaryAccent} 0%, transparent 65%), conic-gradient(from 140deg at 50% 50%, rgba(255,255,255,0.5), rgba(255,255,255,0))`,
    border: isDark
      ? "1px solid rgba(71, 85, 105, 0.28)"
      : "1px solid rgba(15, 23, 42, 0.08)",
    boxShadow: isDark
      ? "0 0 120px rgba(16, 185, 129, 0.08)"
      : "0 0 120px rgba(16, 185, 129, 0.12)",
    opacity: isDark ? 0.58 : 1,
  };

  const pentagonStyle = {
    willChange: "transform",
    clipPath: "polygon(50% 0%, 93% 25%, 75% 100%, 25% 100%, 7% 25%)",
    background: isDark
      ? `linear-gradient(150deg, rgba(17, 24, 39, 0.9) 0%, rgba(30, 41, 59, 0.5) 65%), repeating-linear-gradient(45deg, transparent 0 22px, ${highlightColor} 22px 23px)`
      : `linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 65%), repeating-linear-gradient(45deg, transparent 0 22px, ${highlightColor} 22px 23px)`,
    border: isDark
      ? "1px solid rgba(71, 85, 105, 0.3)"
      : "1px solid rgba(15, 23, 42, 0.08)",
    boxShadow: isDark
      ? "0 28px 110px rgba(59, 130, 246, 0.08)"
      : "0 26px 90px rgba(59, 130, 246, 0.16)",
    opacity: isDark ? 0.68 : 1,
  };

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: baseBackground,
          backgroundImage: gridOverlay,
          backgroundSize: "42px 42px, 320px 320px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: overlayGradient,
        }}
      />
      <div
        className="absolute inset-0 mix-blend-screen"
        style={{
          opacity: latticeOpacity,
          backgroundImage: latticeGradient,
          backgroundSize: "180px 180px",
          maskImage: latticeMask,
        }}
      />

      <div
        data-blob
        data-strength-x="90"
        data-strength-y="85"
        data-rotate="0"
        data-amplitude-x="20"
        data-amplitude-y="18"
        data-speed="0.54"
        data-phase="0.3"
        className="absolute left-[8%] top-[12%] h-56 w-56 md:h-72 md:w-72 backdrop-blur-xl"
        style={hexagonStyle}
      />

      <div
        data-blob
        data-strength-x="-130"
        data-strength-y="-110"
        data-rotate="6"
        data-amplitude-x="28"
        data-amplitude-y="24"
        data-speed="0.45"
        data-phase="1.4"
        className="absolute right-[10%] top-[24%] h-60 w-60 md:h-80 md:w-80 backdrop-blur-xl"
        style={trapezoidStyle}
      />

      <div
        data-blob
        data-strength-x="70"
        data-strength-y="-80"
        data-rotate="14"
        data-amplitude-x="18"
        data-amplitude-y="20"
        data-speed="0.6"
        data-phase="2.1"
        className="absolute left-1/4 top-1/2 h-64 w-40 md:h-80 md:w-48 backdrop-blur-lg"
        style={columnStyle}
      />

      <div
        data-blob
        data-strength-x="-80"
        data-strength-y="100"
        data-rotate="-18"
        data-amplitude-x="24"
        data-amplitude-y="26"
        data-speed="0.42"
        data-phase="0.9"
        className="absolute bottom-[8%] left-[14%] h-44 w-44 md:h-60 md:w-60 backdrop-blur-lg"
        style={orbStyle}
      />

      <div
        data-blob
        data-strength-x="115"
        data-strength-y="120"
        data-rotate="12"
        data-amplitude-x="30"
        data-amplitude-y="24"
        data-speed="0.47"
        data-phase="-0.4"
        className="absolute right-[14%] bottom-[14%] h-48 w-48 md:h-64 md:w-64 backdrop-blur-xl"
        style={pentagonStyle}
      />
    </div>
  );
};

export default BackgroundFX;


