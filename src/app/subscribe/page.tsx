import React from "react";
import { Metadata } from "next";
import Subscribe from "@/components/subscribe";

export const metadata: Metadata = {
  title: "Subscribe Page",
  description: "This is Subscribe page for incube",
  // other metadata
};

const SupportPage = () => {
  return <Subscribe />;
};

export default SupportPage;
