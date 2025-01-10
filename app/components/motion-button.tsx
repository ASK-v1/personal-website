"use client";

import { ReactNode, useRef, useState } from "react";
import { motion } from "motion/react";

type MotionButtonProps = {
  children: ReactNode;
  className?: string;
};

export default function MotionButton({
  children,
  className,
}: MotionButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;

    const { clientX, clientY } = e;
    const { height, width, left, top } =
      buttonRef.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX, y: middleY });
  };
  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      className={className}
      ref={buttonRef}
      whileTap={{ scale: 0.95 }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={position}
      transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.2 }}
    >
      {children}
    </motion.button>
  );
}
