"use client";

import Link from "next/link";
import MotionButton from "./motion-button";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export default function Header() {
  const github = process.env.NEXT_PUBLIC_GITHUB ?? "";
  const linkedin = process.env.NEXT_PUBLIC_LINKEDIN ?? "";

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.75 });

  return (
    <motion.header
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{
        duration: 0.75,
        ease: "easeInOut",
      }}
      className="w-full flex flex-row items-center pt-10 px-5 sm:px-10 bg-black"
    >
      <p className="hidden sm:flex uppercase w-full -mt-4 text-lg sm:text-xl tracking-wider text-white">
        AHMET KANTAR
      </p>

      <nav className="flex flex-row gap-10 items-center -mt-4">
        <Link target="_blank" href="mailto:a.kntr93@gmail.com">
          <MotionButton className="group p-4 -mr-4">
            <p className="py-2 group-hover:scale-110 uppercase text-lg sm:text-xl tracking-wider font-medium w-36 text-black bg-white rounded-full">
              Contact
            </p>
          </MotionButton>
        </Link>

        <Link
          target="_blank"
          href={github}
          className="tracking-wider uppercase text-lg sm:text-xl font-medium text-white duration-300 hover:text-neutral-400"
        >
          GitHub
        </Link>

        <Link
          target="_blank"
          href={linkedin}
          className="tracking-wider uppercase text-lg sm:text-xl font-medium text-white duration-300 hover:text-neutral-400"
        >
          LinkedIn
        </Link>
      </nav>
    </motion.header>
  );
}
