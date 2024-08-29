'use client';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';

type Props = {
  children: JSX.Element;
  width?: 'fit-content' | '100%';
  className?: string;
};

export default function Reveal({
  children,
  width = 'fit-content',
  className,
}: Props) {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const mainControls = useAnimation();

  useEffect(() => {
    if (inView) {
      mainControls.start('visible');
    } else {
      mainControls.start('hidden');
    }
  }, [inView, mainControls]);

  return (
    <div ref={ref} className={`relative ${width} overflow-hidden ${className}`}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial='hidden'
        animate={mainControls}
        transition={{ duration: 1.5, delay: 0.1 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
