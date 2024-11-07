"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

// or via CommonJS

const Signup = () => {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  const [alert, setAlert] = useState(false);

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
        setAlert(true);
        setError("Gagal mendaftar. Silakan coba lagi.");
      }
    } catch (error) {
      setError("Gagal mendaftar. Silakan coba lagi.");
    } finally {
      setIsloading(false);
    }
  };

  const validateField = ({ name, value }: any) => {
    switch (name) {
      case "username":
        if (value.length < 3 || value.length > 20)
          return "Username must be 3-20 characters long.";
        if (!/^[a-zA-Z0-9]+$/.test(value))
          return "Username can only contain letters and numbers.";
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Invalid email format.";
        break;
      case "password":
        if (value.length < 8 || value.length > 20)
          return "Password must be 8-20 characters long.";
        break;
      default:
        return "";
    }
    return "";
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const validationError = validateField({ name, value });
    setData((prev) => ({ ...prev, [name]: value }));
    setError(validationError); // Set single error message for field
  };
  return (
    <>
      {/* <!-- ===== SignUp Form Start ===== --> */}
      <section
        className="flex justify-center items-center min-h-screen px-4 "
        id="loginPage"
      >
        <div className="relative z-1 px-6 pb-7.5 pt-10 lg:px-10 lg:pt-15 xl:px-20 xl:pt-20 lg:mt-[90px] mt-0">
          <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47]"></div>
          <div className="absolute bottom-17.5 left-0 -z-1 h-1/3 w-full">
            <Image
              src="/assets/shape/shape-dotted-light.svg"
              alt="Dotted"
              fill
            />
          </div>

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
            className="animate_top rounded-lg bg-white px-6 pt-7.5 shadow-solid-8 xl:px-[200px] xl:py-[60px] py-6 xl:pt-15"
          >
            <h2 className="mb-6 text-center lg:text-4xl text-xl font-semibold text-black">
              Create your account
            </h2>
            <div className="flex flex-col">
              <div className="flex items-center gap-9">
                <button
                  aria-label="sign with google"
                  className="text-black mb-6 flex w-full items-center justify-center rounded-sm border border-stroke bg-gray-100 px-5 py-3 text-base outline-none transition-all duration-300 hover:border-[#F3C623] hover:bg-[#F3C623]/5 hover:text-[#F3C623]"
                >
                  <span className="mr-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_95:967)">
                        <path
                          d="M20.0001 10.2216C20.0122 9.53416 19.9397 8.84776 19.7844 8.17725H10.2042V11.8883H15.8277C15.7211 12.539 15.4814 13.1618 15.1229 13.7194C14.7644 14.2769 14.2946 14.7577 13.7416 15.1327L13.722 15.257L16.7512 17.5567L16.961 17.5772C18.8883 15.8328 19.9997 13.266 19.9997 10.2216"
                          fill="#4285F4"
                        />
                        <path
                          d="M10.2042 20.0001C12.9592 20.0001 15.2721 19.1111 16.9616 17.5778L13.7416 15.1332C12.88 15.7223 11.7235 16.1334 10.2042 16.1334C8.91385 16.126 7.65863 15.7206 6.61663 14.9747C5.57464 14.2287 4.79879 13.1802 4.39915 11.9778L4.27957 11.9878L1.12973 14.3766L1.08856 14.4888C1.93689 16.1457 3.23879 17.5387 4.84869 18.512C6.45859 19.4852 8.31301 20.0005 10.2046 20.0001"
                          fill="#34A853"
                        />
                        <path
                          d="M4.39911 11.9777C4.17592 11.3411 4.06075 10.673 4.05819 9.99996C4.0623 9.32799 4.17322 8.66075 4.38696 8.02225L4.38127 7.88968L1.19282 5.4624L1.08852 5.51101C0.372885 6.90343 0.00012207 8.4408 0.00012207 9.99987C0.00012207 11.5589 0.372885 13.0963 1.08852 14.4887L4.39911 11.9777Z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M10.2042 3.86663C11.6663 3.84438 13.0804 4.37803 14.1498 5.35558L17.0296 2.59996C15.1826 0.901848 12.7366 -0.0298855 10.2042 -3.6784e-05C8.3126 -0.000477834 6.45819 0.514732 4.8483 1.48798C3.2384 2.46124 1.93649 3.85416 1.08813 5.51101L4.38775 8.02225C4.79132 6.82005 5.56974 5.77231 6.61327 5.02675C7.6568 4.28118 8.91279 3.87541 10.2042 3.86663Z"
                          fill="#EB4335"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_95:967">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  Signup with Google
                </button>

                <button
                  aria-label="signup with github"
                  className="text-black mb-6 flex w-full items-center justify-center rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none transition-all duration-300 hover:border-[#F3C623] hover:bg-[#F3C623]/5 hover:text-[#F3C623]"
                >
                  <span className="mr-3">
                    <svg
                      fill="currentColor"
                      width="22"
                      height="22"
                      viewBox="0 0 64 64"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M32 1.7998C15 1.7998 1 15.5998 1 32.7998C1 46.3998 9.9 57.9998 22.3 62.1998C23.9 62.4998 24.4 61.4998 24.4 60.7998C24.4 60.0998 24.4 58.0998 24.3 55.3998C15.7 57.3998 13.9 51.1998 13.9 51.1998C12.5 47.6998 10.4 46.6998 10.4 46.6998C7.6 44.6998 10.5 44.6998 10.5 44.6998C13.6 44.7998 15.3 47.8998 15.3 47.8998C18 52.6998 22.6 51.2998 24.3 50.3998C24.6 48.3998 25.4 46.9998 26.3 46.1998C19.5 45.4998 12.2 42.7998 12.2 30.9998C12.2 27.5998 13.5 24.8998 15.4 22.7998C15.1 22.0998 14 18.8998 15.7 14.5998C15.7 14.5998 18.4 13.7998 24.3 17.8998C26.9 17.0998 29.8 16.6998 32.6 16.6998C35.4 16.6998 38.3 17.0998 40.9 17.8998C46.8 13.7998 49.5 14.5998 49.5 14.5998C51.2 18.8998 50.1 22.0998 49.8 22.7998C51.7 24.8998 53 27.5998 53 30.9998C53 43.0998 45.5 45.4998 38.7 46.1998C39.8 47.0998 40.8 49.0998 40.8 52.1998C40.8 56.6998 40.7 60.1998 40.7 60.7998C40.7 61.4998 41.2 62.5998 42.8 62.1998C55.2 58.0998 63.1 46.3998 63.1 32.7998C63.1 15.5998 49.1 1.7998 32 1.7998Z" />
                    </svg>
                  </span>
                  Signup with Github
                </button>
              </div>
            </div>

            <div className="mb-7.5">
              <span className="relative flex justify-center before:absolute before:left-0 before:top-1/2 before:h-px before:w-full before:bg-body-color/10 after:absolute after:right-0 after:top-1/2 after:h-px after:w-full after:bg-body-color/10">
                <span className="text-black relative z-10 bg-white px-5 lg:text-2xl text-xl">
                  or
                </span>
              </span>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="mb-6">
                <label className="mb-2 block text-lg text-black lg:text-xl">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={data.username}
                  onChange={handleChange}
                  placeholder="FuadGrimaldi"
                  className="w-full rounded border bg-[#f8f8f8] border-stroke  py-3 px-5 text-black outline-none transition-all focus:border-primary focus:bg-white focus:shadow-input text-base"
                />
              </div>
              <div className="mb-6">
                <label className="mb-2 block text-lg text-black lg:text-xl">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  placeholder="example@domain.com"
                  className="w-full rounded border bg-[#f8f8f8] border-stroke  py-3 px-5 text-black outline-none transition-all focus:border-primary focus:bg-white focus:shadow-input text-base"
                />
              </div>

              <div className="mb-6">
                <label className="mb-2 block text-lg text-black lg:text-xl ">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  placeholder="************"
                  className="w-full rounded border border-stroke bg-[#f8f8f8] py-3 px-5 text-black outline-none transition-all focus:border-primary focus:bg-white focus:shadow-input"
                />
              </div>

              <div className="mb-[50px] flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember-me"
                    className="h-5 w-5 accent-primary"
                  />
                  <label htmlFor="remember-me" className="text-base text-black">
                    Remember me
                  </label>
                </div>
                {error && <span className="text-red-500 text-sm">{error}</span>}
              </div>

              <div className="mb-5">
                <button
                  type="submit"
                  aria-label="Sign In"
                  className="w-full rounded-sm bg-[#10375C] hover:text-[#F3C623] transition-all duration-500 py-3 px-5 font-medium lg:text-xl text-lg"
                  disabled={isloading}
                >
                  {isloading ? "Loading..." : "Registrasi"}
                </button>
              </div>
            </form>

            <p className="text-center text-lg font-medium text-black">
              have any account?
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
      {/* <!-- ===== SignIn Form End ===== --> */}
    </>
  );
};

export default Signup;
