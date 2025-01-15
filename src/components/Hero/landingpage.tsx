import React from "react";
import { motion } from "framer-motion";

const Landingpage = () => {
  return (
    <motion.div
      className="lg:max-w-screen pt-[400px] lg:py-[250px] lg:px-[110px] px-[80px]"
      id="LandingPage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute bottom-0 right-0 overflow-hidden lg:inset-y-0 hidden md:block">
        <motion.img
          className="w-auto h-full"
          src="https://d33wubrfki0l68.cloudfront.net/1e0fc04f38f5896d10ff66824a62e466839567f8/699b5/images/hero/3/background-pattern.png"
          alt=""
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </div>
      <section className="relative mt-[-300px] lg:mt-0">
        <div className="mx-auto">
          <div className="grid grid-cols-1 gap-y-8 lg:items-center lg:grid-cols-2 sm:gap-y-20 xl:grid-cols-5">
            <motion.div
              className="text-center xl:col-span-2 lg:text-left md:px-0 lg:px-0"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="max-w-sm mx-auto sm:max-w-md md:max-w-full">
                <motion.h1
                  className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-7xl lg:leading-tight font-pj"
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  Reach the Efficiency of Farming
                </motion.h1>

                <div className="mt-8 lg:mt-12 lg:flex lg:items-center">
                  <div className="flex justify-center flex-shrink-0 -space-x-4 overflow-hidden lg:justify-start">
                    <motion.img
                      className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                      src="https://d33wubrfki0l68.cloudfront.net/3bfa6da479d6b9188c58f2d9a8d33350290ee2ef/301f1/images/hero/3/avatar-male.png"
                      alt=""
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.img
                      className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                      src="https://d33wubrfki0l68.cloudfront.net/b52fa09a115db3a80ceb2d52c275fadbf84cf8fc/7fd8a/images/hero/3/avatar-female-1.png"
                      alt=""
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    />
                    <motion.img
                      className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                      src="https://d33wubrfki0l68.cloudfront.net/8a2efb13f103a5ae2909e244380d73087a9c2fc4/31ed6/images/hero/3/avatar-female-2.png"
                      alt=""
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    />
                  </div>

                  <motion.p
                    className="mt-4 text-lg lg:text-2xl text-gray-900 lg:mt-0 lg:ml-4 font-pj"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    Join with{" "}
                    <span className="font-bold">Chicken Farmer Community</span>{" "}
                    and start getting inCube right now
                  </motion.p>
                </div>
              </div>

              <motion.div
                className="mt-8 sm:flex sm:items-center sm:justify-center lg:justify-start sm:space-x-5 lg:mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
              >
                <a
                  href="#"
                  title=""
                  className="inline-flex items-center px-8 py-4 text-lg text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj justif-center hover:bg-gray-600"
                  role="button"
                >
                  Order Now
                </a>

                <a
                  href="#"
                  title=""
                  className="inline-flex items-center px-4 py-4 mt-4 text-lg transition-all duration-200 bg-transparent border border-transparent sm:mt-0 font-pj justif-center rounded-xl hover:bg-[#ffb800] lg:text-white text-black"
                  role="button"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    ></path>
                  </svg>
                  Download Mobile App
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Landingpage;
