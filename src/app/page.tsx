"use client";
import Feature from "@/components/Features";
import Landingpage from "@/components/Hero/landingpage";
import Navbar from "@/components/Navbar/navbar";
import { useState, useEffect } from "react";

export default function Home() {
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
      <Landingpage></Landingpage>
      <Feature></Feature>
    </main>
  );
}
