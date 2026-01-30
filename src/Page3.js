import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'

const Page3 = ({ onNext }) => {
  const [showPhotos, setShowPhotos] = useState(false)
  const [flowers, setFlowers] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [fullscreenImage, setFullscreenImage] = useState(null)

  useEffect(() => {
    const t = window.setTimeout(() => setShowPhotos(true), 200)
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => {
    const flowerImages = [
      'https://xapopyizznjubyostnxn.supabase.co/storage/v1/object/public/Medos%20webb/cherry-blossom.png',
      'https://xapopyizznjubyostnxn.supabase.co/storage/v1/object/public/Medos%20webb/flower.png',
      'https://xapopyizznjubyostnxn.supabase.co/storage/v1/object/public/Medos%20webb/sakura.png',
    ]

    const newFlowers = Array.from({ length: 35 }, (_, i) => ({
      id: i,
      image: flowerImages[Math.floor(Math.random() * flowerImages.length)],
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 20 + Math.random() * 45,
      rotation: Math.random() * 360,
      opacity: 0.15 + Math.random() * 0.25,
      delay: Math.random() * 2,
    }))
    setFlowers(newFlowers)
  }, [])

  const images = useMemo(
    () => [
      'https://xapopyizznjubyostnxn.supabase.co/storage/v1/object/public/Medos%20webb/WhatsApp%20Image%202026-01-30%20at%203.02.26%20PM%20(1).jpeg',
      'https://xapopyizznjubyostnxn.supabase.co/storage/v1/object/public/Medos%20webb/WhatsApp%20Image%202026-01-30%20at%203.02.26%20PM%20(2).jpeg',
      'https://xapopyizznjubyostnxn.supabase.co/storage/v1/object/public/Medos%20webb/WhatsApp%20Image%202026-01-30%20at%203.02.26%20PM%20(3).jpeg',
      'https://xapopyizznjubyostnxn.supabase.co/storage/v1/object/public/Medos%20webb/WhatsApp%20Image%202026-01-30%20at%203.02.26%20PM%20(4).jpeg',
      'https://xapopyizznjubyostnxn.supabase.co/storage/v1/object/public/Medos%20webb/WhatsApp%20Image%202026-01-30%20at%203.02.26%20PM%20(5).jpeg',
      'https://xapopyizznjubyostnxn.supabase.co/storage/v1/object/public/Medos%20webb/WhatsApp%20Image%202026-01-30%20at%203.02.26%20PM%20(6).jpeg',
      'https://xapopyizznjubyostnxn.supabase.co/storage/v1/object/public/Medos%20webb/WhatsApp%20Image%202026-01-30%20at%203.02.26%20PM%20(7).jpeg',
      'https://xapopyizznjubyostnxn.supabase.co/storage/v1/object/public/Medos%20webb/WhatsApp%20Image%202026-01-30%20at%203.02.26%20PM%20(8).jpeg',
      'https://xapopyizznjubyostnxn.supabase.co/storage/v1/object/public/Medos%20webb/WhatsApp%20Image%202026-01-30%20at%203.02.26%20PM%20(9).jpeg',
      'https://xapopyizznjubyostnxn.supabase.co/storage/v1/object/public/Medos%20webb/WhatsApp%20Image%202026-01-30%20at%203.02.26%20PM%20(10).jpeg',
      'https://xapopyizznjubyostnxn.supabase.co/storage/v1/object/public/Medos%20webb/WhatsApp%20Image%202026-01-30%20at%203.02.26%20PM%20(11).jpeg',
      'https://xapopyizznjubyostnxn.supabase.co/storage/v1/object/public/Medos%20webb/WhatsApp%20Image%202026-01-30%20at%203.02.26%20PM%20(12).jpeg',
      'https://xapopyizznjubyostnxn.supabase.co/storage/v1/object/public/Medos%20webb/WhatsApp%20Image%202026-01-30%20at%203.02.26%20PM%20(13).jpeg',
      'https://xapopyizznjubyostnxn.supabase.co/storage/v1/object/public/Medos%20webb/WhatsApp%20Image%202026-01-30%20at%203.02.26%20PM%20(14).jpeg',
      'https://xapopyizznjubyostnxn.supabase.co/storage/v1/object/public/Medos%20webb/WhatsApp%20Image%202026-01-30%20at%203.02.26%20PM%20(15).jpeg',
      'https://xapopyizznjubyostnxn.supabase.co/storage/v1/object/public/Medos%20webb/WhatsApp%20Image%202026-01-30%20at%203.02.26%20PM%20(16).jpeg',
      'https://xapopyizznjubyostnxn.supabase.co/storage/v1/object/public/Medos%20webb/WhatsApp%20Image%202026-01-30%20at%203.02.26%20PM%20(17).jpeg',
      'https://xapopyizznjubyostnxn.supabase.co/storage/v1/object/public/Medos%20webb/WhatsApp%20Image%202026-01-30%20at%203.02.26%20PM%20(18).jpeg',
    ],
    []
  )

  const getIndex = (offset) => {
    const index = currentIndex + offset
    if (index >= images.length) return index - images.length
    if (index < 0) return images.length + index
    return index
  }

  const handleDragEnd = (e, { offset, velocity }) => {
    // Velocity-based swipe - faster swipe = faster transition
    const swipeThreshold = 50
    const velocityThreshold = 500

    if (Math.abs(offset.x) > swipeThreshold || Math.abs(velocity.x) > velocityThreshold) {
      if (offset.x > 0) {
        // Swiped right - go to previous
        setDirection(-1)
        setCurrentIndex(getIndex(-1))
      } else {
        // Swiped left - go to next
        setDirection(1)
        setCurrentIndex(getIndex(1))
      }
    }
  }

  const goToIndex = (idx) => {
    if (idx === currentIndex) return
    setDirection(idx > currentIndex ? 1 : -1)
    setCurrentIndex(idx)
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-pink-50 overflow-hidden flex items-center justify-center">
      {/* Background flowers - animated */}
      <div className="absolute inset-0 overflow-hidden">
        {flowers.map((f) => (
          <motion.img
            key={f.id}
            src={f.image}
            alt="flower"
            className="absolute pointer-events-none"
            style={{
              width: f.size,
              height: f.size,
              left: `${f.left}%`,
              top: `${f.top}%`,
              opacity: f.opacity,
            }}
            initial={{ rotate: f.rotation, y: 0 }}
            animate={{
              y: [0, -35, 0],
              rotate: [f.rotation, f.rotation + 20, f.rotation],
              opacity: [f.opacity, f.opacity * 1.4, f.opacity],
            }}
            transition={{
              duration: 6 + Math.random() * 5,
              repeat: Infinity,
              delay: f.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-20 w-full max-w-7xl px-2 sm:px-4 md:px-6 py-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={showPhotos ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col items-center justify-center"
        >
          {/* Header text - responsive */}
          <motion.div
            className="text-center mb-4 sm:mb-6 md:mb-8 z-10 px-4"
            initial={{ opacity: 0, y: -30 }}
            animate={showPhotos ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 mb-2 font-caveat drop-shadow-lg">
              მიყვარს ეს ყოველივეეე!!!!
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-rose-600 font-caveat drop-shadow-md">
              ყვველაზე მეტად თააან!!!!!!!!!!!
            </p>
          </motion.div>

          {/* Pro Carousel - smooth shift (no refresh) */}
          <div className="relative w-full mb-4 sm:mb-6 md:mb-8 overflow-visible">
            <div className="relative w-full h-[300px] sm:h-[380px] md:h-[480px] lg:h-[560px] flex items-center justify-center">
              <AnimatePresence initial={false}>
                {[-1, 0, 1].map((offset) => {
                  const index = getIndex(offset)
                  const isCenter = offset === 0

                  return (
                    <motion.div
                      key={index}
                      className="absolute"
                      initial={{
                        opacity: 0,
                        scale: isCenter ? 0.98 : 0.8,
                        x: offset === 0 ? 0 : offset === 1 ? '110%' : '-110%',
                      }}
                      animate={{
                        opacity: isCenter ? 1 : 0.45,
                        scale: isCenter ? 1 : 0.82,
                        x: offset === 0 ? 0 : offset === 1 ? '110%' : '-110%',
                        zIndex: isCenter ? 30 : 10,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.8,
                        x: direction > 0 ? '-130%' : '130%',
                      }}
                      transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                      style={{ pointerEvents: 'auto' }}
                      drag={isCenter ? 'x' : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={isCenter ? handleDragEnd : undefined}
                      whileTap={isCenter ? { cursor: 'grabbing' } : undefined}
                    >
                      <motion.img
                        src={images[index]}
                        alt={`memory-${index}`}
                        className={
                          isCenter
                            ? 'w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[360px] md:h-[360px] lg:w-[440px] lg:h-[440px] rounded-3xl object-cover shadow-2xl border-4 sm:border-6 border-white cursor-grab active:cursor-grabbing select-none'
                            : 'w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px] lg:w-[240px] lg:h-[240px] rounded-2xl object-cover opacity-40 shadow-2xl border-2 border-white/50 pointer-events-none select-none'
                        }
                        onClick={() => (isCenter ? setFullscreenImage(images[index]) : goToIndex(index))}
                        whileHover={isCenter ? { scale: 1.03 } : {}}
                        whileTap={isCenter ? { scale: 0.97 } : {}}
                        draggable={false}
                      />
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Dots indicator - responsive */}
          <motion.div
            className="flex gap-1.5 sm:gap-2 justify-center mb-4 sm:mb-6 md:mb-8 z-10 flex-wrap max-w-md px-4"
            initial={{ opacity: 0 }}
            animate={showPhotos ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            {images.map((_, idx) => (
              <motion.button
                key={idx}
                className={`h-2 sm:h-2.5 md:h-3 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'bg-rose-500 w-6 sm:w-7 md:w-8'
                    : 'bg-pink-300 hover:bg-pink-400 w-2 sm:w-2.5 md:w-3'
                }`}
                onClick={() => goToIndex(idx)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </motion.div>

          {/* Swipe hint */}
          <motion.p
            className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 z-10 text-center px-4"
            initial={{ opacity: 0 }}
            animate={showPhotos ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            👆 Swipe to explore memories
          </motion.p>

          {/* Next button - responsive */}
          <motion.button
            onClick={onNext}
            className="px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-3.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all z-10 text-sm sm:text-base md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={showPhotos ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Next Knig →
          </motion.button>
        </motion.div>
      </div>

      {/* Fullscreen image viewer - responsive */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-2 sm:p-4"
            onClick={() => setFullscreenImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full h-full max-w-5xl flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
            >
              <img
                src={fullscreenImage}
                alt="fullscreen"
                className="max-w-full max-h-full object-contain rounded-xl"
              />
              <button
                onClick={() => setFullscreenImage(null)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white text-black rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-xl sm:text-2xl font-bold hover:bg-gray-200 transition-colors shadow-lg"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Page3  
