"use client";
import { motion } from "framer-motion";
import React from "react";

const Subscribe = () => {
  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <section id="support" className="px-4 lg:px-[120px]">
        <div className="relative mx-auto px-4 py-10 lg:px-15 lg:py-15 xl:px-20 xl:py-20 h-screen">
          <div className="flex justify-center items-center">
            <h1 className="text-3xl">Coming Soon</h1>
          </div>
        </div>
      </section>
    </>
  );
};

export default Subscribe;
