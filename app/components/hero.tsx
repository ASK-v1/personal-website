"use client";

import { motion, useInView, animate } from "motion/react";
import { useRef } from "react";
import Image from "next/image";

const animText = {
  initial: { y: "100%" },
  enter: () => ({
    y: "0",
    transition: { duration: 0.75, ease: [0.33, 1, 0.66, 1], delay: 0.5 },
  }),
};

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.75 });

  const photo = process.env.NEXT_PUBLIC_PHOTO ?? "";

  const smoothScroll = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (!element) return;

    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY - 320;

    animate(window.scrollY, elementPosition, {
      type: "tween",
      ease: [0.42, 0.0, 0.58, 1.0],
      duration: 1.5,
      onUpdate: (value) => {
        window.scrollTo(0, value);
      },
    });
  };

  return (
    <div
      ref={ref}
      className="w-full h-screen flex flex-col bg-black -mt-[100px]"
    >
      <motion.div className="my-auto uppercase text-5xl lg:text-9xl text-start font-medium tracking-wide flex flex-col items-start text-white px-5 sm:px-10">
        <div className="overflow-hidden">
          <motion.h1
            variants={animText}
            initial="initial"
            animate={isInView ? "enter" : ""}
          >
            Front End Developer
          </motion.h1>
        </div>

        <div className="overflow-hidden">
          <motion.p
            variants={animText}
            initial="initial"
            animate={isInView ? "enter" : ""}
          >
            Crafting Awesome
          </motion.p>
        </div>

        <div className="overflow-hidden">
          <motion.div
            variants={animText}
            initial="initial"
            className="gap-2.5 lg:gap-5 flex flex-row items-center"
            animate={isInView ? "enter" : ""}
          >
            <p>Experiences</p>

            <Image
              quality={100}
              alt="photo"
              width={200}
              height={200}
              src={photo}
              className="w-[96px] h-[56px] lg:h-[112px] lg:w-[192px] rounded-full object-cover lg:-mt-3"
            />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{
          duration: 0.75,
          ease: "easeInOut",
        }}
        className="flex flex-row justify-between items-center w-full px-5 sm:px-10 pb-10"
      >
        <p className="uppercase text-white tracking-wider text-lg sm:text-xl">
          Available For Work
        </p>
        <p className="hidden sm:flex uppercase text-white tracking-wider text-lg sm:text-xl">
          Front End Developer
        </p>
        <p className="hidden sm:flex flex-row gap-2 items-center uppercase text-white tracking-wider text-lg sm:text-xl">
          <span>2022</span>
          <span className="bg-white h-[1px] w-5" />
          <span>PRESENT</span>
        </p>

        <button
          onClick={() => smoothScroll("about")}
          className="uppercase tracking-wider text-lg sm:text-xl font-medium text-white duration-300 hover:text-neutral-400"
        >
          Scroll to view more
        </button>
      </motion.div>
    </div>
  );
}
