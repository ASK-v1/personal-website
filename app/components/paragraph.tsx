"use client";

import {
  useScroll,
  useTransform,
  motion,
  MotionValue,
  useSpring,
} from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const p1 = process.env.NEXT_PUBLIC_P_1 ?? "";
const p2 = process.env.NEXT_PUBLIC_P_2 ?? "";

type WordProps = {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
};

const animPhoto = {
  initial: { width: 0 },
  open: {
    width: "auto",
    transition: { duration: 0.75, ease: [0.33, 1, 0.66, 1] },
  },
  closed: { width: 0 },
};

const paragraph =
  "I enjoy tackling challenges that push me out of my comfort zone and encourage me to think creatively.";

export default function Paragraph() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "start 0.04"],
  });

  const words = paragraph.split(" ");

  return (
    <p
      ref={ref}
      className="flex flex-wrap sm:max-w-[960px] leading-none justify-center uppercase text-6xl lg:text-9xl text-center font-medium tracking-wide"
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;

        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

const Word = ({ children, progress, range }: WordProps) => {
  const [isActive, setIsActive] = useState(false);
  const [imgSrc, setImgSrc] = useState(p1);

  const rawOpacity = useTransform(progress, range, [0, 1]);
  const snappedOpacity = useTransform(rawOpacity, (value) =>
    value >= 0.8 ? 1 : 0
  ) as never;
  const opacity = useSpring(snappedOpacity, {
    stiffness: 100,
    damping: 20,
  });

  useEffect(() => {
    const unsubscribe = opacity.onChange((latest) => {
      if (latest > 0.5) {
        if (children === "that") {
          setIsActive(true);
          setImgSrc(p1);
        } else if (children === "creatively.") {
          setIsActive(true);
          setImgSrc(p2);
        }
      } else {
        setIsActive(false);
      }
    });

    return () => unsubscribe();
  }, [opacity, children]);

  return (
    <span className="flex flex-row items-center">
      <motion.span variants={animPhoto} animate={isActive ? "open" : "closed"}>
        <span className="block px-1.5 lg:px-3">
          <Image
            quality={100}
            alt="photo"
            width={192}
            height={112}
            src={imgSrc}
            className={`${
              isActive ? "lg:w-48 lg:h-28 w-24 h-14" : "w-0 h-0"
            } rounded-full -mt-1.5 lg:-mt-2`}
          />
        </span>
      </motion.span>

      <span className="relative px-1.5 lg:px-3">
        <span className="opacity-10 absolute">{children}</span>
        <motion.span style={{ opacity }}>{children}</motion.span>
      </span>
    </span>
  );
};
