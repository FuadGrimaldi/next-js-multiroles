"use client";
import Feature from "@/components/Features";
import FunFact from "@/components/FunFact";
import Landingpage from "@/components/Hero/landingpage";
import Integration from "@/components/Integration";
import { useState, useEffect } from "react";
import FAQ from "@/components/FAQ";
import Testimonial from "@/components/Testimonial";
import Contact from "@/components/Contact";

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
      <Landingpage></Landingpage>
      <Feature></Feature>
      <FunFact></FunFact>
      <Integration></Integration>
      <FAQ></FAQ>
      <Testimonial></Testimonial>
      <Contact></Contact>
    </main>
  );
}
