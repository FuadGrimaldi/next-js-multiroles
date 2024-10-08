"use client"; // Tambahkan ini di baris pertama agar bisa menggunakan useState dan useEffect

import Navbar from "@/components/Navbar/navbar";
import "./globals.css";
import { useState, useEffect } from "react";
import Lines from "@/components/Lines";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <Navbar scrollTop={scrollTop} />
        <Lines></Lines>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
