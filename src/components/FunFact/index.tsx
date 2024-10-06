"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const FunFact = () => {
  return (
    <>
      {/* <!-- ===== Funfact Start ===== --> */}
      <section className="px-6 lg:px-[120px] py-6 ">
        <div className="relative z-1 max-w-c-1390 rounded-lg bg-gradient-to-t from-[#F8F9FF] to-[#ffb800] py-[60px] mx-6">
          <Image
            width={335}
            height={384}
            src="/assets/shape/shape-04.png"
            alt="Man"
            className="absolute -left-15 -top-25 -z-1 lg:left-0 hidden md:block"
          />
          <Image
            width={132}
            height={132}
            src="/assets/shape/shape-05.png"
            alt="Doodle"
            className="absolute bottom-0 right-0 -z-1"
          />

          <Image
            fill
            src="/assets/shape/shape-dotted-light-02.svg"
            alt="Dotted"
            className="absolute left-0 top-0 -z-1"
          />

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
            className="animate_top mx-auto mb-6 px-4 text-center md:w-4/5 md:px-0 lg:w-2/3 xl:w-1/2"
          >
            <h2 className="mb-[40px] font-bold text-black lg:text-5xl text-3xl">
              Trusted by Global Companies.
            </h2>
            <p className="mb-[50px] mx-auto lg:w-11/12 lg:text-xl text-base">
              We are a team of innovators driven by curiosity and a passion for
              sustainable farming. Through our egg incubator technology, we turn
              challenges into opportunities, transforming agriculture and
              shaping a better future.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-8 lg:gap-42.5">
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
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
              className="animate_top text-center"
            >
              <h3 className="mb-1 lg:text-3xl text-xl font-bold text-black xl:text-sectiontitle3">
                500K
              </h3>
              <p className="text-lg lg:text-base text-black">
                World Wide Clients
              </p>
            </motion.div>
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
              transition={{ duration: 1, delay: 0.7 }}
              viewport={{ once: true }}
              className="animate_top text-center"
            >
              <h3 className="mb-1 lg:text-3xl text-xl font-bold text-black xl:text-sectiontitle3">
                1M+
              </h3>
              <p className="text-lg lg:text-base text-black">Downloads</p>
            </motion.div>
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
              transition={{ duration: 1, delay: 0.8 }}
              viewport={{ once: true }}
              className="animate_top text-center"
            >
              <h3 className="mb-1 lg:text-3xl text-xl font-bold text-black xl:text-sectiontitle3">
                865
              </h3>
              <p className="text-lg lg:text-base text-black">Winning Award</p>
            </motion.div>
          </div>
        </div>
      </section>
      {/* <!-- ===== Funfact End ===== --> */}
    </>
  );
};

export default FunFact;
