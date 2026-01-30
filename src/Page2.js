import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';

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
      initial={{ x: startX, y: startY, opacity: 0, scale: 0, rotate: 0 }}
      animate={
        landed
          ? {
              x: bounceXSequence,
              y: bounceYSequence,
              opacity: [0.7, 0.9, 0.7],
              scale: 1,
              rotate: 360,
            }
          : { x: landX, y: landY, opacity: 0.9, scale: 1, rotate: 180 }
      }
      transition={
        landed
          ? {
              x: {
                duration: bounceXDuration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: phaseOffsetX,
              },
              y: {
                duration: bounceYDuration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: phaseOffsetY,
              },
              opacity: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
              rotate: {
                duration: spinDuration,
                repeat: Infinity,
                ease: 'linear',
              },
            }
          : { duration: 1.5, delay, ease: 'easeOut' }
      }
      onAnimationComplete={() => {
        if (!landed) setLanded(true);
      }}
      style={{ position: 'absolute', pointerEvents: 'none', zIndex: 50 }}
    >
      <img
        src={imageSrc}
        alt="flower"
        style={{ width: size, height: size, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))' }}
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

  const englishText =
    "I'm not always good at putting into words how much I love you. I know I don't always explain my feelings the right way. But I try to show them through my actions, every single day. I'm willing to do anything for you, and I always do my best.\n\nI love you even more because you understand this about me. You understand who I am, how I feel, and how I express love and you never make me feel bad for it. That understanding, that awareness, means everything to me.\n\nYou deserve everything because of that understanding, because of your pure heart, those are the reasons why I love you the most.\n\nჩემი ცხოვრების სიყვარულს მედოს.\n(ყველა ყვავილი შენია🌸😁)";

  useEffect(() => {
    const set = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    set();
    window.addEventListener('resize', set);

    // Start typing animation immediately when page loads
    const t = window.setTimeout(() => {
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
        setShowCursor(false);

        // Wait 2-3 seconds after typing so she can read, then send flowers.
        if (readingDelayMsRef.current == null) {
          readingDelayMsRef.current = Math.round(2000 + Math.random() * 1000);
        }

        const t1 = window.setTimeout(() => {
          setShowFlowers(true);
          // Show next button after flowers are clearly visible.
          const t2 = window.setTimeout(() => {
            setShowNextButton(true);
          }, 2000);
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
    const nextFlowers = Array.from({ length: 80 }).map((_, i) => {
      const from = edgeStarts[i % edgeStarts.length];
      const size = Math.round(Math.random() * 40 + 35);
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
        delay: Math.random() * 1.2,
        size,
        imageSrc: flowerSources[i % flowerSources.length],
        spinDuration: Math.random() * 0.6 + 0.7,
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
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      {/* Main content container - fully responsive */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 pb-16 sm:pb-12"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)' }}
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-8 md:p-12 border border-pink-100">
          <motion.div
            className="text-gray-800 text-base sm:text-lg md:text-xl leading-relaxed font-serif"
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {displayedText}
            {showCursor && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
                className="inline-block w-0.5 h-5 sm:h-6 bg-pink-500 ml-1"
              >
                |
              </motion.span>
            )}
          </motion.div>

          {/* Next button - fully responsive with better z-index */}
          {showNextButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-6 sm:mt-8 flex justify-center relative z-[100]"
            >
              <motion.button
                onClick={onNext}
                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(236, 72, 153, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-base sm:text-lg shadow-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-300 pointer-events-auto"
                style={{ position: 'relative', zIndex: 100 }}
              >
                Next →
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Flowers animation - COVERS EVERYTHING with high z-index */}
      {showFlowers && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          pointerEvents: 'none', 
          zIndex: 50,
          overflow: 'hidden'
        }}>
          {flowers.map((flower) => (
            <Flower key={flower.id} {...flower} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Page2;
