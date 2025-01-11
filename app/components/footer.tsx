"use client";

import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import Link from "next/link";

export default function Footer() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  return (
    <footer ref={ref} className="w-full">
      <Content scrollProgress={scrollYProgress} />
    </footer>
  );
}

const Content = ({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) => {
  const y = useTransform(scrollProgress, [0, 1], [-400, 0]);

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const email = "a.kntr93@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const github = process.env.NEXT_PUBLIC_GITHUB ?? "";
  const linkedin = process.env.NEXT_PUBLIC_LINKEDIN ?? "";

  return (
    <div className="overflow-hidden py-10 bg-black">
      <motion.div style={{ y }} className="flex flex-col items-center gap-20">
        <div className="flex flex-col items-center justify-center gap-5">
          <h2 className="uppercase text-9xl font-medium tracking-wide text-white">
            Contact
          </h2>

          <div className="flex flex-row gap-10 items-center">
            <span
              onClick={handleCopy}
              className="flex gap-2 items-center justify-between text-white duration-300 cursor-pointer hover:text-neutral-400"
            >
              <span className="uppercase text-lg sm:text-xl text-left font-medium whitespace-nowrap overflow-hidden overflow-ellipsis">
                a.kntr93@gmail.com
              </span>

              <svg
                className={` ${copied ? "text-green-500" : ""}`}
                width="20"
                height="20"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {copied ? (
                  <path
                    d="M12.146 4.854a.5.5 0 0 0-.708 0L6.5 9.793 4.854 8.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l5-5a.5.5 0 0 0 0-.708z"
                    fill="currentColor"
                  />
                ) : (
                  <path
                    d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                )}
              </svg>
            </span>

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
          </div>
        </div>

        <p className="tracking-wider text-lg sm:text-xl text-neutral-400">
          BUILT AND DESIGNED BY AHMET KANTAR
        </p>
      </motion.div>
    </div>
  );
};
