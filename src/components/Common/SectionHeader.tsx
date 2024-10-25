"use client";
import { motion } from "framer-motion";

type HeaderInfo = {
  title: string;
  subtitle: string;
  description: string;
};

const SectionHeader = ({ headerInfo }: { headerInfo: HeaderInfo }) => {
  const { title, subtitle, description } = headerInfo;

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: -20,
        },

        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 1, delay: 0.1 }}
      viewport={{ once: true }}
      className="animate_top mx-auto text-center"
    >
      <div className="mb-4 inline-block rounded-full px-4.5 py-1.5 border">
        <span className=" font-base text-black">{title}</span>
      </div>
      <h2 className="mx-auto mb-4 lg:text-5xl text-3xl font-bold text-black md:w-4/5 xl:w-1/2">
        {subtitle}
      </h2>
      <p className="mx-auto md:w-4/5 lg:w-3/5 xl:w-[46%] text-black lg:text-xl text-lg mb-2">
        {description}
      </p>
    </motion.div>
  );
};

export default SectionHeader;
