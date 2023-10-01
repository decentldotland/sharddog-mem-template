// DandruffEffect.tsx
import React, { useRef, useState, useEffect } from "react";

const DandruffEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  try {
    if (!window) return <></>;
  } catch {
    return <></>;
  }
  // Use the window.matchMedia method to get the user's color scheme preference
  const isBrowserDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDarkMode, setIsDarkMode] = useState(isBrowserDarkMode);

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  };

  const generateDandruff = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
      ctx!.imageSmoothingEnabled = true;
      ctx!.imageSmoothingQuality = "high";

      const speckCount = 20 + Math.random() * 10;

      for (let i = 0; i < speckCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = 1 + Math.random() * 2;

        ctx!.beginPath();
        ctx!.arc(x, y, size, 0, Math.PI * 2);
        ctx!.fillStyle = isDarkMode ? "white" : "black";
        ctx!.fill();
      }
    }
  };

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      resizeCanvas();
      generateDandruff();
    });

    resizeCanvas();
    generateDandruff();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isDarkMode]);

  return (
    <div className="top-0 pointer-events-none absolute z-0 h-screen text-black dark:text-white">
      <canvas ref={canvasRef} className="absolute top-0 left-0"></canvas>
    </div>
  );
};

export default DandruffEffect;
