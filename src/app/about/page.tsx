"use client";
import Navbar from "@/components/Navbar/navbar";
import { useState, useEffect } from "react";

export default function About() {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = (event: any) => {
      setScrollTop(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <main>
      <Navbar scrollTop={scrollTop}></Navbar>
      <div>Hello About</div>
    </main>
  );
}
