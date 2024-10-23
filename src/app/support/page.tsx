import React from "react";
import Contact from "@/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support Page",
  description: "This is Support page for incube",
  // other metadata
};

const SupportPage = () => {
  return <Contact />;
};

export default SupportPage;
