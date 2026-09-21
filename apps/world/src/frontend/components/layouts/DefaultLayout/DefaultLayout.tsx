"use client";

import { useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function DefaultLayout({
  children,
}: PropsWithChildren): JSX.Element {
  const [motionPaused, setMotionPaused] = useState(false);
  useEffect(() => {
    setMotionPaused(localStorage.getItem("world-motion") === "paused");
  }, []);

  function toggleMotion(): void {
    setMotionPaused((previous) => {
      localStorage.setItem("world-motion", previous ? "playing" : "paused");
      return !previous;
    });
  }

  return (
    <div
      className="world-shell"
      data-motion={motionPaused ? "paused" : "playing"}
    >
      <div aria-hidden="true" className="space-backdrop" />
      <a className="skip-link" href="#main-content">
        跳至主要內容
      </a>
      <Header />
      <main className="site-main" id="main-content">
        {children}
      </main>
      <Footer motionPaused={motionPaused} onToggleMotion={toggleMotion} />
    </div>
  );
}
