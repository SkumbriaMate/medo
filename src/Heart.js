import React from 'react';
import { motion } from 'framer-motion';

const Heart = ({ size, position, delay, duration, type = 'float' }) => {
  const heartVariants = {
    float: {
      y: [0, -30, 0],
      x: [0, 10, -10, 0],
      rotate: [0, 5, -5, 0],
    },
    pulse: {
      scale: [1, 1.2, 1],
      opacity: [0.6, 1, 0.6],
    },
    static: {
      scale: [1, 1.1, 1],
    }
  };

  return (
    <motion.div
      className="absolute text-pink-300"
      style={{
        left: position.x,
        top: position.y,
        fontSize: size,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        ...heartVariants[type]
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    >
      ❤️
    </motion.div>
  );
};

export default Heart;
