import React, { useEffect, useRef } from "react";

// Floating, mouse-following background elements inspired by MetaMask motion
// Lightweight RAF loop with eased interpolation for buttery movement
const BackgroundFX = () => {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    // Initialize position to center
    posRef.current.x = window.innerWidth / 2;
    posRef.current.y = window.innerHeight / 2;
    mouseRef.current.x = window.innerWidth / 2;
    mouseRef.current.y = window.innerHeight / 2;

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const animate = () => {
      // ease position toward mouse with stronger effect
      const ease = 0.08;
      posRef.current.x += (mouseRef.current.x - posRef.current.x) * ease;
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * ease;

      const container = containerRef.current;
      if (container) {
        const { x, y } = posRef.current;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        // Parallax factors per blob with more noticeable movement
        const blobs = container.querySelectorAll("[data-blob]");
        blobs.forEach((el) => {
          const depth = Number(el.getAttribute("data-depth") || 1);
          const translateX = (x - centerX) / (20 * depth);
          const translateY = (y - centerY) / (20 * depth);
          el.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
        });
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Soft gradient blobs; adapt to dark/light using blend modes */}
      <div
        data-blob
        data-depth="1"
        className="absolute -top-20 -left-20 h-[45vmax] w-[45vmax] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient( circle at 30% 30%, rgba(99,102,241,0.45), rgba(0,0,0,0) 60% )",
          mixBlendMode: "screen",
        }}
      />
      <div
        data-blob
        data-depth="2"
        className="absolute -bottom-24 left-1/3 h-[40vmax] w-[40vmax] rounded-full opacity-35 blur-3xl"
        style={{
          background:
            "radial-gradient( circle at 60% 40%, rgba(16,185,129,0.38), rgba(0,0,0,0) 60% )",
          mixBlendMode: "screen",
        }}
      />
      <div
        data-blob
        data-depth="3"
        className="absolute -right-24 top-1/3 h-[48vmax] w-[48vmax] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient( circle at 40% 60%, rgba(236,72,153,0.35), rgba(0,0,0,0) 60% )",
          mixBlendMode: "screen",
        }}
      />
      {/* subtle grid for sophistication */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(120,120,120,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(120,120,120,0.18) 1px, transparent 1px)",
          backgroundSize: "40px 40px, 40px 40px",
          backgroundPosition: "-1px -1px",
        }}
      />
    </div>
  );
};

export default BackgroundFX;


