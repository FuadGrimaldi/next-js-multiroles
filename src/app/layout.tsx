"use client"; // Tambahkan ini di baris pertama agar bisa menggunakan useState dan useEffect

import Navbar from "@/components/Navbar/navbar";
import "./globals.css";
import { useState, useEffect } from "react";
import Lines from "@/components/Lines";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

const disableNavbar = [
  "/admin/user",
  "/admin/dashboard",
  "/admin",
  "/user",
  "/user/dashboard",
  "/user/report",
  "/user/setting",
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scrollTop, setScrollTop] = useState(0);
  const pathname = usePathname();

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
        {!disableNavbar.includes(pathname) && <Navbar scrollTop={scrollTop} />}
        <Lines></Lines>
        {children}
        {!disableNavbar.includes(pathname) && <Footer />}
      </body>
    </html>
  );
}
