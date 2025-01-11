"use client";

import { motion, useInView } from "motion/react";
import Image from "next/image";
import { useEffect, useRef } from "react";

const tech = [
  {
    name: "Visual Studio Code",
    src: "vscode.svg",
  },
  {
    name: "Motion",
    src: "motion.svg",
  },
  {
    name: "JavaScript",
    src: "javascript.svg",
  },
  {
    name: "TypeScript",
    src: "typescript.svg",
  },
  {
    name: "CSS",
    src: "css.svg",
  },
  {
    name: "Tailwind CSS",
    src: "tailwindcss.svg",
  },
  {
    name: "React",
    src: "react.svg",
  },
  {
    name: "Next.js",
    src: "nextjs.svg",
  },
  {
    name: "Vue.js",
    src: "vuejs.svg",
  },
  {
    name: "Nuxt.js",
    src: "nuxtjs.svg",
  },
  {
    name: "Node.js",
    src: "nodejs.svg",
  },
  {
    name: "Prisma",
    src: "prisma.svg",
  },
  {
    name: "Redux",
    src: "redux.svg",
  },
  {
    name: "Git",
    src: "git.svg",
  },
];

const animText = {
  initial: { y: "100%" },
  enter: () => ({
    y: "0",
    transition: { duration: 0.75, ease: [0.33, 1, 0.66, 1], delay: 0.5 },
  }),
};

const phrases = [
  "As a Front End Developer, I'm passionate",
  "about breathing life into design ideas by",
  "building user-friendly and performant",
  "web applications using technologies",
  "like React and Vue.js.",
];

export default function About() {
  const textRef = useRef(null);
  const techRef = useRef(null);

  const textIsInView = useInView(textRef, { once: true, amount: 0.75 });
  const techIsInView = useInView(techRef, { once: true, amount: 0.75 });

  const containerRef1 = useRef<HTMLDivElement>({} as HTMLDivElement);
  const scrollerRef1 = useRef<HTMLUListElement>({} as HTMLUListElement);
  const containerRef2 = useRef<HTMLDivElement>({} as HTMLDivElement);
  const scrollerRef2 = useRef<HTMLUListElement>({} as HTMLUListElement);

  function addAnimation(
    containerRef: React.RefObject<HTMLDivElement>,
    scrollerRef: React.RefObject<HTMLUListElement>,
    duration: string,
    direction: "normal" | "reverse"
  ) {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      containerRef.current.style.setProperty(
        "--animation-direction",
        direction
      );
      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  }

  useEffect(() => {
    addAnimation(containerRef1, scrollerRef1, "60s", "normal");
    addAnimation(containerRef2, scrollerRef2, "60s", "reverse");
  }, []);

  return (
    <div
      id="about"
      className="overflow-hidden w-full flex flex-col items-center px-5 sm:px-10"
    >
      {phrases.map((p, i) => (
        <div
          ref={textRef}
          className="overflow-hidden py-1 hidden lg:block"
          key={i}
        >
          <motion.p
            className="tracking-wide text-7xl text-center w-full"
            variants={animText}
            initial="initial"
            animate={textIsInView ? "enter" : ""}
          >
            {p}
          </motion.p>
        </div>
      ))}
      <p className="tracking-wide text-4xl text-center w-full block lg:hidden">
        {phrases.join(" ")}
      </p>

      <div
        ref={techRef}
        className="flex flex-col items-center justify-center w-full max-w-3xl mt-10"
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={techIsInView ? { y: 0, opacity: 1 } : {}}
          transition={{
            duration: 0.75,
            ease: "easeInOut",
          }}
          ref={containerRef1}
          className="w-full mb-5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
        >
          <ul ref={scrollerRef1} className="flex gap-5 w-max animate-scroll">
            {tech.slice(0, 7).map((t) => (
              <li
                className="border border-black py-3 px-14 rounded-full"
                key={t.name}
              >
                <Image
                  width={32}
                  height={32}
                  src={`/icons/${t.src}`}
                  alt={t.name}
                />
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={techIsInView ? { y: 0, opacity: 1 } : {}}
          transition={{
            delay: 0.1,
            duration: 0.75,
            ease: "easeInOut",
          }}
          ref={containerRef2}
          className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
        >
          <ul ref={scrollerRef2} className="flex gap-5 w-max animate-scroll">
            {tech.slice(7).map((t) => (
              <li
                className="border border-black py-3 px-14 rounded-full"
                key={t.name}
              >
                <Image
                  width={32}
                  height={32}
                  src={`/icons/${t.src}`}
                  alt={t.name}
                />
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
