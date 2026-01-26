import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Heart from './Heart';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
import MiniMusicPlayer from './MiniMusicPlayer';

const Welcome = ({ onNext, audioRef }) => {
  const textVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { duration: 1.5, ease: "easeOut" }
    }
  };

  const handleLetGo = () => {
    // Play music
    if (audioRef && audioRef.current) {
      audioRef.current.play().catch(e => console.log("Play failed:", e));
    }
    // Go to next page
    onNext();
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-rose-300 via-pink-300 to-red-200 flex items-center justify-center">
      {/* Animated background hearts */}
      <motion.div
        className="absolute top-10 right-10 text-5xl"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        💕
      </motion.div>
      <motion.div
        className="absolute bottom-20 left-10 text-5xl"
        animate={{ y: [0, -20, 0], x: [0, 15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        💖
      </motion.div>
      <motion.div
        className="absolute top-1/3 right-20 text-4xl"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        💗
      </motion.div>

      {/* Main content */}
      <div className="text-center px-4 z-10">
        <motion.h1
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white drop-shadow-2xl mb-8"
          style={{
            fontFamily: "'Kalam', 'Permanent Marker', 'Caveat', cursive",
            textShadow: '4px 4px 8px rgba(0,0,0,0.3), 0 0 30px rgba(255,255,255,0.6)',
            whiteSpace: 'pre-line'
          }}
        >
          My loveeeeee
          <br />
          get readyyyyyy
        </motion.h1>

        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLetGo}
          className="mt-12 px-12 py-4 bg-white text-red-500 font-bold rounded-full shadow-2xl hover:shadow-2xl transform transition-all duration-300 text-2xl sm:text-3xl"
          style={{
            fontFamily: "'Kalam', 'Permanent Marker', 'Caveat', cursive",
          }}
        >
          Let's goooooo
        </motion.button>
      </div>
    </div>
  );
};

const Page1 = ({ onNext }) => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const generateHearts = () => {
      const newHearts = [];
      
      // Floating hearts
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

      // Pulsing hearts
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

      // Small static hearts
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
  }, []);

  const textVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.5,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0,
      rotate: -180,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const mainText = "Wazaaaaap Medooooooooooooooo";

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-pink-400 via-pink-300 to-rose-200">
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

      {/* Main Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-center px-4"
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-2xl"
            style={{
              fontFamily: "'Kalam', 'Permanent Marker', 'Caveat', cursive",
              textShadow: '3px 3px 6px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.5)',
              whiteSpace: 'pre-line'
            }}
          >
            <motion.span>
              {mainText.split(' ').map((word, wordIndex) => (
                <motion.span
                  key={wordIndex}
                  className="inline-block"
                  variants={letterVariants}
                  style={{ 
                    display: 'inline-block',
                    marginRight: wordIndex === 0 ? '0.3em' : '0'
                  }}
                >
                  {word.split('').map((letter, letterIndex) => (
                    <motion.span
                      key={letterIndex}
                      variants={letterVariants}
                      className="inline-block"
                      style={{
                        animationDelay: `${(wordIndex * 15 + letterIndex) * 0.15}s`
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                  {wordIndex === 0 && <br />}
                </motion.span>
              ))}
            </motion.span>
          </motion.h1>
          
          {/* Next Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            onClick={onNext}
            className="mt-8 px-8 py-3 bg-white text-pink-500 font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            style={{
              fontFamily: "'Kalam', 'Permanent Marker', 'Caveat', cursive",
              fontSize: '1.2rem'
            }}
          >
            →
          </motion.button>
        </motion.div>
      </div>

      {/* Extra floating hearts for more chaos */}
      <motion.div
        className="absolute top-10 left-10 text-4xl"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        💕
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-10 text-3xl"
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        💖
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-20 text-2xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        💗
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 left-20 text-5xl"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        💝
      </motion.div>
    </div>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const audioRef = React.useRef(null);

  // Get the audio ref from MiniMusicPlayer somehow
  // We'll create a callback to set it
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
            key="welcome"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Welcome onNext={handleNext} audioRef={playerAudioRef} />
          </motion.div>
        )}

        {currentPage === 1 && (
          <motion.div
            key="page1"
            initial={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Page1 onNext={handleNext} />
          </motion.div>
        )}
        
        {currentPage === 2 && (
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

        {currentPage === 3 && (
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

        {currentPage === 4 && (
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
