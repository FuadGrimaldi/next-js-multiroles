import React from "react";
import { motion } from "framer-motion";
import Link from "next/link"; // Import Link from Next.js
import { usePathname } from "next/navigation";

const Navbar = ({ scrollTop }: { scrollTop: any }) => {
  const pathName = usePathname();
  return (
    <motion.div
      className={
        scrollTop < 50
          ? `navbar bg-transparent max-w-screen w-full flex fixed top-0 left-0 right-0 z-50 justify-between items-center px-2 lg:px-[120px] py-4 transition-colors duration-200`
          : `navbar bg-[#ffb800] max-w-screen w-full flex fixed top-0 left-0 right-0 z-50 justify-between items-center px-2 lg:px-[120px] py-4 transition-colors duration-500`
      }
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link
                href="/"
                className={`text-base hover:underline transition-all duration-500 ${
                  pathName === "/" ? "bg-white" : "bg-none"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/#features"
                className="text-base hover:underline transition-all duration-500"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="/support"
                className="text-base hover:underline transition-all duration-500"
              >
                Support
              </Link>
            </li>
            <li>
              <Link
                href="/docs"
                className="text-base hover:underline transition-all duration-500"
              >
                Docs
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="text-base hover:underline transition-all duration-500"
              >
                Sign In
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <motion.img
            src="/assets/logo2 2.png"
            alt="Logo"
            className="lg:h-20 md:h-14 h-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </div>

      <div className="navbar-end flex items-center space-x-4">
        <ul className="menu menu-horizontal hidden lg:flex px-1">
          <li>
            <motion.div
              className="text-xl hover:underline transition-all duration-500"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link
                href="/"
                className={`text-xl hover:underline transition-all duration-500 ${
                  pathName === "/" ? "text-[#10375C]" : "text-black"
                }`}
              >
                Home
              </Link>
            </motion.div>
          </li>
          <li>
            <motion.div
              className="text-xl hover:underline transition-all duration-500"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                href="/#Features"
                className={`text-xl hover:underline transition-all duration-500 ${
                  pathName === "/#Features" ? "text-[#10375C]" : "text-black"
                }`}
              >
                Features
              </Link>
            </motion.div>
          </li>
          <li>
            <motion.div
              className="text-xl hover:underline transition-all duration-500"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                href="/support"
                className={`text-xl hover:underline transition-all duration-500 ${
                  pathName === "/support" ? "text-[#10375C]" : "text-black"
                }`}
              >
                Support
              </Link>
            </motion.div>
          </li>
          <li>
            <details>
              <summary className="text-xl hover:underline transition-all duration-500">
                Docs
              </summary>
              <ul className="mx-6 w-[130px]">
                {" "}
                {/* Tambahkan kelas w-full di sini */}
                <li>
                  <Link
                    href="/docs/faq"
                    className={`text-base hover:underline transition-all duration-500 ${
                      pathName === "/docs/faq" ? "text-[#10375C]" : "text-black"
                    }`}
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs"
                    className={`text-base hover:underline transition-all duration-500 ${
                      pathName === "/docs/howto"
                        ? "text-[#10375C]"
                        : "text-black"
                    }`}
                  >
                    Docs
                  </Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <motion.div
              className={`${
                pathName === "/login"
                  ? "bg-[#10375C] text-white "
                  : "bg-gray-100 text-[#3f2013]"
              } rounded-[15px] font-montserrat text-xl px-6 py-3}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                href="/login"
                className="text-xl hover:underline transition-all duration-500"
              >
                Dashboard
              </Link>
            </motion.div>
          </li>
        </ul>
      </div>

      <div className="flex items-center lg:hidden">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
          />
        </motion.svg>
      </div>
    </motion.div>
  );
};

export default Navbar;
