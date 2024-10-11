"use client";
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sideMenuIsExpanded, setSideMenuIsExpanded] = useState(true);

  return (
    <>
      <Sidebar setExpand={setSideMenuIsExpanded} />
      <main>{children}</main>
    </>
  );
}
