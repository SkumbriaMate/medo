import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Page3 = ({ onNext }) => {
  const [showPhotos, setShowPhotos] = useState(false)
  const [flowers, setFlowers] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
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

    const newFlowers = Array.from({ length: 24 }, (_, i) => ({
      id: i,
      image: flowerImages[Math.floor(Math.random() * flowerImages.length)],
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 16 + Math.random() * 34,
      rotation: Math.random() * 360,
      opacity: 0.25 + Math.random() * 0.35,
    }))
    setFlowers(newFlowers)
  }, [])

  const images = useMemo(
    () => [
      'https://xapopyizznjubyostnxn.supabase.co/storage/v1/object/public/Medos%20webb/178ad021-9848-4178-8bd6-78b4b4a2ad2d.jpg',
      'https://xapopyizznjubyostnxn.supabase.co/storage/v1/object/public/Medos%20webb/1b089b47-1dfc-4fd8-9a2e-c8f51c110e2c.jpg',
      'https://xapopyizznjubyostnxn.supabase.co/storage/v1/object/public/Medos%20webb/369bd509-b0ab-4a39-a53d-3484666d5aad.jpg',
      'https://xapopyizznjubyostnxn.supabase.co/storage/v1/object/public/Medos%20webb/757bf1b6-d286-4fce-8212-471f033f79a8.jpg',
      'https://xapopyizznjubyostnxn.supabase.co/storage/v1/object/public/Medos%20webb/9be7576f-1aa7-4c70-84d1-71667d2005b4.jpg',
      'https://xapopyizznjubyostnxn.supabase.co/storage/v1/object/public/Medos%20webb/a34a3f96-a5cb-4659-a868-cc92c2ae5f9a.jpg',
      'https://xapopyizznjubyostnxn.supabase.co/storage/v1/object/public/Medos%20webb/cf3df111-7637-4e8e-9561-0276cda7355f.jpg',
      'https://xapopyizznjubyostnxn.supabase.co/storage/v1/object/public/Medos%20webb/d071059b-1f9b-441c-adbd-3614b27816f8.jpg',
      'https://xapopyizznjubyostnxn.supabase.co/storage/v1/object/public/Medos%20webb/ffed03c9-945e-4ae0-a5d7-2789c05eb33e.jpg',
    ],
    []
  )

  const handleDragStart = (e) => {
    setIsDragging(true)
    const clientX = e.clientX || (e.touches && e.touches[0].clientX)
    const clientY = e.clientY || (e.touches && e.touches[0].clientY)
    setDragStart({ x: clientX, y: clientY })
  }

  const handleDragEnd = (e) => {
    if (!isDragging) return
    setIsDragging(false)
    
    const clientX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX)
    const diffX = dragStart.x - clientX

    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        // Swiped left - go next
        setCurrentIndex((prev) => (prev + 1) % images.length)
      } else {
        // Swiped right - go prev
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
      }
    }
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const getVisibleImages = () => {
    const visible = []
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + images.length) % images.length
      visible.push({ src: images[index], position: i, index })
    }
    return visible
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-pink-50 overflow-hidden flex items-center justify-center">
      {/* Background flowers */}
      <div className="absolute inset-0">
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
              rotate: f.rotation,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [f.rotation, f.rotation + 10, f.rotation],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-20 w-full max-w-6xl px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={showPhotos ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center"
        >
          {/* Header text */}
          <motion.div
            className="text-center mb-6 sm:mb-8 z-10"
            initial={{ opacity: 0, y: -20 }}
            animate={showPhotos ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 mb-2 font-caveat">
              მიყვარს ეს ყოველივეეე!!!!
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-rose-600 font-caveat">
              ყვველაზე მეტად თააან!!!!!!!!!!!
            </p>
          </motion.div>

          {/* Carousel container */}
          <div className="relative w-full mb-6 sm:mb-8">
            <div
              className="relative w-full h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px] flex items-center justify-center overflow-hidden"
              onMouseDown={handleDragStart}
              onMouseUp={handleDragEnd}
              onMouseLeave={() => setIsDragging(false)}
              onTouchStart={handleDragStart}
              onTouchEnd={handleDragEnd}
            >
              <AnimatePresence mode="popLayout">
                {getVisibleImages().map(({ src, position, index }) => {
                  const isCenter = position === 0
                  const isLeft = position === -1
                  const isRight = position === 1

                  return (
                    <motion.div
                      key={index}
                      className="absolute"
                      initial={{
                        x: position * 120,
                        scale: isCenter ? 1 : 0.75,
                        opacity: isCenter ? 1 : 0.4,
                        zIndex: isCenter ? 30 : 10,
                      }}
                      animate={{
                        x: position === 0 ? 0 : position === 1 ? '120%' : '-120%',
                        scale: isCenter ? 1 : 0.75,
                        opacity: isCenter ? 1 : 0.4,
                        zIndex: isCenter ? 30 : 10,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.5,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                      }}
                      style={{
                        pointerEvents: isCenter ? 'auto' : 'none',
                      }}
                    >
                      <motion.img
                        src={src}
                        alt={`memory-${index}`}
                        className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[320px] md:h-[320px] lg:w-[380px] lg:h-[380px] rounded-2xl object-cover shadow-2xl border-4 border-white cursor-pointer select-none"
                        onClick={() => isCenter && !isDragging && setFullscreenImage(src)}
                        whileHover={isCenter ? { scale: 1.02 } : {}}
                        draggable={false}
                      />
                    </motion.div>
                  )
                })}
              </AnimatePresence>

              {/* Navigation arrows - hidden on small screens */}
              <button
                onClick={goToPrev}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40 bg-white/80 hover:bg-white text-rose-500 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-lg transition-all hover:scale-110 hidden sm:flex"
              >
                ❮
              </button>
              <button
                onClick={goToNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40 bg-white/80 hover:bg-white text-rose-500 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-lg transition-all hover:scale-110 hidden sm:flex"
              >
                ❯
              </button>
            </div>
          </div>

          {/* Dots indicator */}
          <motion.div
            className="flex gap-2 justify-center mb-6 sm:mb-8 z-10 flex-wrap max-w-xs"
            initial={{ opacity: 0 }}
            animate={showPhotos ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            {images.map((_, idx) => (
              <motion.button
                key={idx}
                className={`h-2 sm:h-3 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'bg-rose-500 w-6 sm:w-8'
                    : 'bg-pink-300 hover:bg-pink-400 w-2 sm:w-3'
                }`}
                onClick={() => setCurrentIndex(idx)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </motion.div>

          {/* Swipe hint */}
          <motion.p
            className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 z-10 text-center px-4"
            initial={{ opacity: 0 }}
            animate={showPhotos ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
          </motion.p>

          {/* Next button */}
          <motion.button
            onClick={onNext}
            className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all z-10 text-sm sm:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={showPhotos ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            next knig
          </motion.button>
        </motion.div>
      </div>

      {/* Fullscreen image viewer */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={() => setFullscreenImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-4xl w-full h-[80vh] rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
            >
              <img
                src={fullscreenImage}
                alt="fullscreen"
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setFullscreenImage(null)}
                className="absolute top-4 right-4 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold hover:bg-gray-200 transition-colors"
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