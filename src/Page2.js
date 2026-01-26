import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Flower = ({
  delay,
  imageSrc,
  size = 60,
  startX,
  startY,
  landX,
  landY,
  maxX,
  maxY,
  spinDuration = 1.2,
  bounceXDuration = 8,
  bounceYDuration = 9,
  bounceXSequence = [0, maxX, 0, maxX],
  bounceYSequence = [0, maxY, 0, maxY],
  phaseOffsetX = 0,
  phaseOffsetY = 0,
}) => {
  const [landed, setLanded] = useState(false);

  return (
    <motion.div
      className="absolute"
      style={{
        width: size,
        height: size,
        zIndex: 5, // Lower z-index to be in background
      }}
      initial={{ x: startX, y: startY }}
      animate={
        landed
          ? {
              x: bounceXSequence,
              y: bounceYSequence,
            }
          : { x: landX, y: landY }
      }
      transition={
        landed
          ? {
              x: { duration: bounceXDuration, repeat: Infinity, ease: 'linear', repeatDelay: phaseOffsetX },
              y: { duration: bounceYDuration, repeat: Infinity, ease: 'linear', repeatDelay: phaseOffsetY },
            }
          : {
              delay,
              duration: 2.5,
              ease: 'easeOut',
            }
      }
      onAnimationComplete={() => {
        if (!landed) setLanded(true);
      }}
    >
      <motion.img
        src={imageSrc}
        alt="Flower"
        className="w-full h-full object-contain"
        animate={{ rotate: [0, 360] }}
        transition={{
          duration: spinDuration,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </motion.div>
  );
};

const Page2 = ({ onNext }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showFlowers, setShowFlowers] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [flowers, setFlowers] = useState([]);
  const [viewport, setViewport] = useState({ w: 0, h: 0 });
  const typingIntervalRef = useRef(null);
  const timersRef = useRef([]);
  const readingDelayMsRef = useRef(null);

  const englishText = "I'm not very good at saying how much I love you. I know I don't always explain my feelings the right way. But I'm always trying to show it with my actions. I'm willing to do anything for you, and I really do my best. I love you even more because you understand this about me. You understand how I am, and you never make me feel bad about it. That's what makes you so special to me.\n\nThat's why I wanted to do something just for you.\nყველა ყვავილი შენია 🌸😁";

  useEffect(() => {
    const set = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    set();
    window.addEventListener('resize', set);

    // Start typing animation immediately when page loads
    const t = window.setTimeout(() => {
      setIsTyping(true);
      startTyping();
    }, 100);
    timersRef.current.push(t);

    return () => {
      window.removeEventListener('resize', set);
      if (typingIntervalRef.current) window.clearInterval(typingIntervalRef.current);
      timersRef.current.forEach((id) => window.clearTimeout(id));
      timersRef.current = [];
    };
  }, []);

  const startTyping = () => {
    let currentIndex = 0;
    typingIntervalRef.current = window.setInterval(() => {
      if (currentIndex < englishText.length) {
        setDisplayedText(englishText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        if (typingIntervalRef.current) window.clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
        setIsTyping(false);
        setShowCursor(false);

        // Wait 3–5 seconds after typing so she can read, then send flowers.
        if (readingDelayMsRef.current == null) {
          readingDelayMsRef.current = Math.round(3000 + Math.random() * 2000);
        }

        const t1 = window.setTimeout(() => {
          setShowFlowers(true);

          // Show next button after flowers are clearly visible.
          const t2 = window.setTimeout(() => {
            setShowNextButton(true);
          }, 4500);
          timersRef.current.push(t2);
        }, readingDelayMsRef.current);
        timersRef.current.push(t1);
      }
    }, 50); // Typing speed
  };

  const flowerSources = useMemo(
    () => [
      '/flowers-images/cherry-blossom.png',
      '/flowers-images/flower.png',
      '/flowers-images/sakura.png',
    ],
    []
  );

  const edgeStarts = useMemo(
    () => ['top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'],
    []
  );

  const makeStartXY = (from, w, h) => {
    const off = 180;
    const rx = Math.random() * w;
    const ry = Math.random() * h;
    switch (from) {
      case 'top':
        return { x: rx, y: -off };
      case 'bottom':
        return { x: rx, y: h + off };
      case 'left':
        return { x: -off, y: ry };
      case 'right':
        return { x: w + off, y: ry };
      case 'top-left':
        return { x: -off, y: -off };
      case 'top-right':
        return { x: w + off, y: -off };
      case 'bottom-left':
        return { x: -off, y: h + off };
      case 'bottom-right':
        return { x: w + off, y: h + off };
      default:
        return { x: rx, y: -off };
    }
  };

  useEffect(() => {
    if (!showFlowers) return;

    // Wait until we know viewport size.
    if (!viewport.w || !viewport.h) return;

    // Generate once so flowers do NOT jump/re-randomize on re-render.
    const nextFlowers = Array.from({ length: 70 }).map((_, i) => {
      const from = edgeStarts[i % edgeStarts.length];
      const size = Math.round(Math.random() * 34 + 32);
      const start = makeStartXY(from, viewport.w, viewport.h);
      const landX = Math.random() * Math.max(0, viewport.w - size);
      const landY = Math.random() * Math.max(0, viewport.h - size);

      // Edge bounce bounds (keep the flower fully on screen)
      const maxX = Math.max(0, viewport.w - size);
      const maxY = Math.max(0, viewport.h - size);

      // Different x/y periods so motion feels random, but still bounces off edges.
      const bounceXDuration = Math.random() * 6 + 6; // 6..12s
      const bounceYDuration = Math.random() * 6 + 7; // 7..13s
      
      // Random bounce patterns so they don't all move the same direction at once.
      const makeBounceSeq = (max) => {
        const patterns = [
          [0, max, 0, max],
          [0, max, 0, 0],
          [0, 0, max, 0],
          [max, 0, max, 0],
          [max, 0, max, max],
          [max, max, 0, max],
        ];
        return patterns[Math.floor(Math.random() * patterns.length)];
      };
      const bounceXSequence = makeBounceSeq(maxX);
      const bounceYSequence = makeBounceSeq(maxY);
      const phaseOffsetX = Math.random() * 3; // 0..3s offset
      const phaseOffsetY = Math.random() * 3;

      return {
        id: `flower-${i}`,
        delay: Math.random() * 1.0,
        size,
        imageSrc: flowerSources[i % flowerSources.length],
        spinDuration: Math.random() * 0.6 + 0.7, // faster spin

        startX: start.x,
        startY: start.y,
        landX,
        landY,
        maxX,
        maxY,
        bounceXDuration,
        bounceYDuration,
        bounceXSequence,
        bounceYSequence,
        phaseOffsetX,
        phaseOffsetY,
      };
    });

    setFlowers(nextFlowers);
  }, [edgeStarts, flowerSources, showFlowers, viewport.h, viewport.w]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-pink-400 via-pink-300 to-rose-200">
      {/* Main content container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pointer-events-none"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl"
          >
            <p 
              className="text-lg sm:text-xl md:text-2xl leading-relaxed text-gray-800 font-medium"
              style={{
                fontFamily: "'Kalam', 'Permanent Marker', 'Caveat', cursive",
                lineHeight: 1.8,
                minHeight: '200px'
              }}
            >
              <span style={{ whiteSpace: 'pre-line' }}>{displayedText}</span>
              {showCursor && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block ml-1 text-pink-500"
                >
                  |
                </motion.span>
              )}
            </p>
          </motion.div>
        </div>

        {/* Next button below text div (reserved space to avoid layout glitch) */}
        <div className="mt-8 z-30" style={{ height: 52 }}>
          <AnimatePresence initial={false}>
            {showNextButton && (
              <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                onClick={onNext}
                className="pointer-events-auto relative z-40 px-8 py-3 bg-white text-pink-500 font-bold rounded-full shadow-lg hover:shadow-xl hover:bg-gray-50 transform hover:scale-105 transition-all duration-300"
                style={{
                  fontFamily: "'Kalam', 'Permanent Marker', 'Caveat', cursive",
                  fontSize: '1.1rem'
                }}
              >
                Next →
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Flowers animation (generated once; no jumping) */}
      <AnimatePresence>
        {showFlowers && (
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 30 }}>
            {flowers.map((flower) => (
              <Flower
                key={flower.id}
                delay={flower.delay}
                imageSrc={flower.imageSrc}
                size={flower.size}
                spinDuration={flower.spinDuration}

                startX={flower.startX}
                startY={flower.startY}
                landX={flower.landX}
                landY={flower.landY}
                maxX={flower.maxX}
                maxY={flower.maxY}
                bounceXDuration={flower.bounceXDuration}
                bounceYDuration={flower.bounceYDuration}
                bounceXSequence={flower.bounceXSequence}
                bounceYSequence={flower.bounceYSequence}
                phaseOffsetX={flower.phaseOffsetX}
                phaseOffsetY={flower.phaseOffsetY}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page2;
