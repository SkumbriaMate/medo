import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Heart from './Heart';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
import MiniMusicPlayer from './MiniMusicPlayer';

const Page1 = ({ onNext, audioRef }) => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Start music when page loads
    if (audioRef && audioRef.current) {
      audioRef.current.play().catch(e => console.log("Play failed:", e));
    }

    const generateHearts = () => {
      const newHearts = [];
      
      for (let i = 0; i < 15; i++) {
        newHearts.push({
          id: `float-${i}`,
          size: Math.random() * 20 + 15,
          position: {
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`
          },
          delay: Math.random() * 5,
          duration: Math.random() * 3 + 4,
          type: 'float'
        });
      }

      for (let i = 0; i < 8; i++) {
        newHearts.push({
          id: `pulse-${i}`,
          size: Math.random() * 25 + 20,
          position: {
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`
          },
          delay: Math.random() * 3,
          duration: Math.random() * 2 + 2,
          type: 'pulse'
        });
      }

      for (let i = 0; i < 12; i++) {
        newHearts.push({
          id: `static-${i}`,
          size: Math.random() * 15 + 10,
          position: {
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`
          },
          delay: Math.random() * 2,
          duration: Math.random() * 2 + 1,
          type: 'static'
        });
      }

      setHearts(newHearts);
    };

    generateHearts();
  }, [audioRef]);

  const mainText = "Wazaaaaap Medooooooooooooooo";

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-pink-400 via-pink-300 to-rose-200 flex items-center justify-center">
      {/* Animated Hearts Background */}
      <AnimatePresence>
        {hearts.map((heart) => (
          <Heart
            key={heart.id}
            size={heart.size}
            position={heart.position}
            delay={heart.delay}
            duration={heart.duration}
            type={heart.type}
          />
        ))}
      </AnimatePresence>

      {/* Centered Content */}
      <div className="relative z-20 text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white drop-shadow-2xl mb-8 sm:mb-12"
          style={{
            fontFamily: "'Kalam', 'Permanent Marker', 'Caveat', cursive",
            textShadow: '3px 3px 6px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.5)',
          }}
        >
          {mainText}
        </motion.h1>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 sm:px-14 md:px-16 py-3 sm:py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white font-bold rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 text-lg sm:text-xl md:text-2xl"
          style={{
            fontFamily: "'Kalam', 'Permanent Marker', 'Caveat', cursive",
          }}
        >
          Next →
        </motion.button>
      </div>
    </div>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [playerAudioRef, setPlayerAudioRef] = useState(null);

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <MiniMusicPlayer onAudioRef={setPlayerAudioRef} />
      <AnimatePresence mode="wait">
        {currentPage === 0 && (
          <motion.div
            key="page1"
            initial={{ opacity: 1 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Page1 onNext={handleNext} audioRef={playerAudioRef} />
          </motion.div>
        )}
        
        {currentPage === 1 && (
          <motion.div
            key="page2"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Page2 onNext={handleNext} />
          </motion.div>
        )}

        {currentPage === 2 && (
          <motion.div
            key="page3"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Page3 onNext={handleNext} />
          </motion.div>
        )}

        {currentPage === 3 && (
          <motion.div
            key="page4"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Page4 />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;