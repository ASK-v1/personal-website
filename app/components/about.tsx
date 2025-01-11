"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

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
  const textIsInView = useInView(textRef, { once: true, amount: 0.75 });

  return (
    <div id="about" className="w-full flex flex-col items-center">
      {phrases.map((p, i) => (
        <div ref={textRef} className="overflow-hidden py-1" key={i}>
          <motion.p
            className="tracking-wide text-2xl lg:text-7xl w-full"
            variants={animText}
            initial="initial"
            animate={textIsInView ? "enter" : ""}
          >
            {p}
          </motion.p>
        </div>
      ))}
    </div>
  );
}
