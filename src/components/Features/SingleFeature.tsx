import React from "react";
import { Feature } from "@/types/feature";
import Image from "next/image";
import { motion } from "framer-motion";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title, description } = feature;

  return (
    <>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: -10,
          },

          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="animate_top z-40 rounded-lg border bg-[#ffb800] shadow-solid-3 transition-all border-strokedark hover:bg-hoverdark xl:p-6 p-3 m-2 xl:m-6 text-center hover:shadow-xl hover:shadow-[#ffb800]/40 duration-300"
      >
        <div className="relative flex w-full items-center justify-center rounded-[4px] p-3">
          <Image src={icon} width={36} height={36} alt="title" />
        </div>
        <span className="mb-3 text-xl">{title}</span>
        <p className="p-3">{description}</p>
      </motion.div>
    </>
  );
};

export default SingleFeature;
