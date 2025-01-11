"use client";

import { useEffect, useRef } from "react";
import Footer from "./components/footer";
import Header from "./components/header";
import Lenis from "lenis";

export default function Home() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    lenisRef.current = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 0.75,
      duration: 1.5,
    });

    const lenis = lenisRef.current;

    const animate = (time: number) => {
      lenis?.raf(time);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {
      lenis?.destroy();
    };
  }, []);

  return (
    <div className="w-full items-center flex flex-col">
      <Header />
      <main className="h-screen"></main>
      <Footer />
    </div>
  );
}
