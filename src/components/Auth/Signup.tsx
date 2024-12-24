"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Signup = () => {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError("");
    setIsloading(true);
    try {
      const response = await axios.post("/api/register", {
        username: data.username,
        email: data.email,
        password: data.password,
      });

      if (response.status === 201 || response.status === 200) {
        if (response.data.status === false) {
          Swal.fire({
            position: "top",
            icon: "error",
            title: "Email Already Registered",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Registration Success",
            showConfirmButton: false,
            timer: 1500,
          });
          router.push("/login");
        }
      } else {
        setError("Gagal mendaftar. Silakan coba lagi.");
      }
    } catch (error) {
      setError("Gagal mendaftar. Silakan coba lagi.");
    } finally {
      setIsloading(false);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section
      className="flex justify-center items-center min-h-screen px-4"
      id="loginPage"
    >
      <div className="absolute -z-1 h-2/3 w-1/2 rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47]"></div>
      <div className="relative z-1 px-6 pb-7.5 pt-10 lg:px-10 lg:pt-15 xl:px-20 xl:pt-20 lg:mt-[90px] mt-[40px] w-full max-w-4xl">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 1, delay: 0.1 }}
          viewport={{ once: true }}
          className="animate_top rounded-lg bg-white px-6 py-6 shadow-solid-8 lg:px-10 xl:px-[200px] xl:py-[60px] w-full"
        >
          <h2 className="mb-6 text-center lg:text-4xl text-xl font-semibold text-black">
            Create your account
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col w-full">
            <div className="mb-6 w-full">
              <label className="mb-2 block text-lg text-black lg:text-xl">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={data.username}
                onChange={handleChange}
                placeholder="FuadGrimaldi"
                className="w-full rounded border bg-[#f8f8f8] border-stroke py-3 px-5 text-black outline-none transition-all focus:border-primary focus:bg-white focus:shadow-input text-base"
              />
            </div>
            <div className="mb-6 w-full">
              <label className="mb-2 block text-lg text-black lg:text-xl">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="example@domain.com"
                className="w-full rounded border bg-[#f8f8f8] border-stroke py-3 px-5 text-black outline-none transition-all focus:border-primary focus:bg-white focus:shadow-input text-base"
              />
            </div>

            <div className="mb-6 w-full">
              <label className="mb-2 block text-lg text-black lg:text-xl">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="************"
                className="w-full rounded border bg-[#f8f8f8] border-stroke py-3 px-5 text-black outline-none transition-all focus:border-primary focus:bg-white focus:shadow-input"
              />
            </div>

            <div className="mb-5">
              <button
                type="submit"
                className="w-full rounded bg-[#10375C] hover:text-[#F3C623] transition-all duration-500 py-3 px-5 font-medium lg:text-xl text-lg"
                disabled={isloading}
              >
                {isloading ? "Loading..." : "Register"}
              </button>
            </div>
          </form>

          <p className="text-center text-lg font-medium text-black">
            Have an account?
            <Link
              href="/login"
              className="ml-2 font-medium text-primary hover:underline"
            >
              Sign In
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Signup;
