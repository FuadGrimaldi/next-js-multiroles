"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarLink = () => {
  const pathname = usePathname(); // Mendapatkan path saat ini

  return (
    <>
      <li className="block">
        {/* Introduction Link */}
        <Link
          href={`/docs`}
          className={`flex w-full rounded-lg px-3 py-2 text-lg transition-all duration-200 
            ${
              pathname === "/docs"
                ? "bg-white text-black font-bold "
                : "hover:font-bold"
            }`}
        >
          Introduction
        </Link>

        {/* Installation Link */}
        <Link
          href={`/docs/installation`}
          className={`flex w-full rounded-lg px-3 py-2 text-lg transition-all duration-200 
            ${
              pathname === "/docs/installation"
                ? "bg-white text-black font-bold "
                : "hover:font-bold"
            }`}
        >
          Installation
        </Link>

        {/* Setup Incube Link */}
        <Link
          href={`/docs/setup-incube`}
          className={`flex w-full rounded-lg px-3 py-2 text-lg transition-all duration-200 
            ${
              pathname === "/docs/setup-incube"
                ? "bg-white text-black font-bold "
                : "hover:font-bold"
            }`}
        >
          Setup Incube
        </Link>

        {/* How To Subscribe Link */}
        <Link
          href={`/docs/how-to-subscribe`}
          className={`flex w-full rounded-lg px-3 py-2 text-lg transition-all duration-200 
            ${
              pathname === "/docs/how-to-subscribe"
                ? "bg-white text-black font-bold "
                : "hover:font-bold"
            }`}
        >
          How To Subscribe
        </Link>
      </li>
    </>
  );
};

export default SidebarLink;
