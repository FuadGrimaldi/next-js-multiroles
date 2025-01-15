"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Signup = () => {
  const router = useRouter();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    age: "",
    gender: "",
    contact: "",
    job: "",
  });
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError("");
    setIsloading(true);
    try {
      // Register user
      const authResponse = await axios.post("/api/register", {
        username: data.username,
        email: data.email,
        password: data.password,
      });

      if (authResponse.status === 201 || authResponse.status === 200) {
        const id_user = authResponse.data.data.id;

        // Save user details
        await axios.post("/api/user", {
          id_user,
          name: data.name,
          age: data.age,
          gender: data.gender,
          contact: data.contact,
          job: data.job,
        });

        Swal.fire({
          position: "top",
          icon: "success",
          title: "Registration Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        router.push("/login");
      } else {
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Registration Failed",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      setError("Failed to register. Please try again.");
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
      className="flex justify-center items-center min-h-screen lg:px-4 px-0"
      id="loginPage"
    >
      <div className="absolute -z-1 lg:h-[700px] h-[900px] lg:w-1/2 w-[340px] rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47]"></div>
      <div className="relative z-1 px-0 pb-7.5 lg:px-10 xl:px-20 mt-[100px] lg:w-full w-[300px] max-w-3xl bg-white">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 1, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row gap-8 p-8 shadow-solid-8 rounded-lg"
        >
          {/* Left Side - Auth Form */}
          <div className="w-full lg:w-1/2">
            <h2 className="mb-4 lg:text-2xl text-lg font-semibold text-black">
              Account Information
            </h2>
            <form className="flex flex-col">
              <div className="mb-2">
                <label className="mb-2 block lg:text-lg text-base text-black">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={data.username}
                  onChange={handleChange}
                  placeholder="FuadGrimaldi"
                  className="w-full rounded border bg-[#f8f8f8] border-stroke py-2 px-4 text-black outline-none focus:border-primary focus:bg-white"
                />
              </div>
              <div className="mb-2">
                <label className="mb-2 block lg:text-lg text-base text-black">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  placeholder="example@domain.com"
                  className="w-full rounded border bg-[#f8f8f8] border-stroke py-2 px-4 text-black outline-none focus:border-primary focus:bg-white"
                />
              </div>
              <div className="mb-2">
                <label className="mb-2 block lg:text-lg text-base text-black">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  placeholder="************"
                  className="w-full rounded border bg-[#f8f8f8] border-stroke py-2 px-4 text-black outline-none focus:border-primary focus:bg-white"
                />
              </div>
            </form>
          </div>

          {/* Right Side - User Details */}
          <div className="w-full lg:w-1/2">
            <h2 className="mb-4 lg:text-2xl text-lg font-semibold text-black">
              User Details
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="mb-2">
                <label className="mb-2 block lg:text-lg text-base text-black">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full rounded border bg-[#f8f8f8] border-stroke py-2 px-4 text-black outline-none focus:border-primary focus:bg-white"
                />
              </div>
              <div className="mb-2">
                <label className="mb-2 block lg:text-lg text-base text-black">
                  Age
                </label>
                <input
                  type="text"
                  name="age"
                  value={data.age}
                  onChange={handleChange}
                  placeholder="Your Age"
                  className="w-full rounded border bg-[#f8f8f8] border-stroke py-2 px-4 text-black outline-none focus:border-primary focus:bg-white"
                />
              </div>
              <div className="mb-2">
                <label className="mb-2 block lg:text-lg text-base text-black">
                  Gender
                </label>
                <select
                  name="gender"
                  value={data.gender}
                  onChange={handleChange}
                  className="w-full rounded border bg-[#f8f8f8] border-stroke py-2 px-4 text-black outline-none focus:border-primary focus:bg-white"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="mb-2 block lg:text-lg text-base text-black">
                  Contact
                </label>
                <input
                  type="text"
                  name="contact"
                  value={data.contact}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full rounded border bg-[#f8f8f8] border-stroke py-2 px-4 text-black outline-none focus:border-primary focus:bg-white"
                />
              </div>
              <div className="mb-6">
                <label className="mb-2 block lg:text-lg text-base text-black">
                  Job
                </label>
                <input
                  type="text"
                  name="job"
                  value={data.job}
                  onChange={handleChange}
                  placeholder="Your Job"
                  className="w-full rounded border bg-[#f8f8f8] border-stroke py-2 px-4 text-black outline-none focus:border-primary focus:bg-white"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded bg-[#10375C] text-white hover:text-[#F3C623] transition-all duration-500 py-2 px-4 font-medium lg:text-lg text-base"
                disabled={isloading}
              >
                {isloading ? "Loading..." : "Register"}
              </button>
            </form>
          </div>
        </motion.div>
        <p className="mb-5 text-center lg:text-lg text-base font-medium text-black">
          Already have an account?{" "}
          <Link
            href="/login"
            className="ml-2 font-medium text-primary hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;
