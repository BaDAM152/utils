'use client';

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Navbar = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <nav className="bg-muted text-foreground py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-center">
        <ul
          onMouseLeave={() => {
            setPosition((pv) => ({
              ...pv,
              opacity: 0,
            }));
          }}
          className="relative flex w-fit rounded-full border-2 border-foreground bg-muted p-1"
        >
          {/* Home Tab */}
          <Tab setPosition={setPosition} href="/">Home</Tab>

          {/* Team Tab */}
          <Tab setPosition={setPosition} href="/team">Team</Tab>

          {/* The Sliding Cursor */}
          <Cursor position={position} />
        </ul>
      </div>
    </nav>
  );
};

const Tab = ({ children, setPosition, href }: { children: string, setPosition: any, href: string }) => {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 block cursor-pointer px-5 py-3 text-base font-medium uppercase text-foreground hover:text-accent transition-colors duration-300"
    >
      <Link href={href}>
        {children}
      </Link>
    </li>
  );
};

const Cursor = ({ position }: { position: { left: number, width: number, opacity: number } }) => {
  return (
    <motion.li
      animate={{
        left: position.left,
        width: position.width,
        opacity: position.opacity,
      }}
      className="absolute z-0 h-12 rounded-full bg-accent transition-all duration-300"
    />
  );
};

export default Navbar;
