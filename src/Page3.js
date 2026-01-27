import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const Page3 = ({ onNext }) => {
  const [showPhotos, setShowPhotos] = useState(false)
  const [flowers, setFlowers] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dragStart, setDragStart] = useState(0)
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
    setDragStart(e.clientX || (e.touches && e.touches[0].clientX))
  }

  const handleDragEnd = (e) => {
    const dragEnd = e.clientX || (e.changedTouches && e.changedTouches[0].clientX)
    const diff = dragStart - dragEnd
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swiped left - go next
        setCurrentIndex((prev) => (prev + 1) % images.length)
      } else {
        // Swiped right - go prev
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
      }
    }
  }

  const getImagePosition = (index) => {
    const position = (index - currentIndex + images.length) % images.length
    return position
  }

  const getRotation = (position) => {
    if (position === 0) return 0
    if (position === 1) return 120
    if (position === 2) return 240
    return 0
  }

  const getZIndex = (position) => {
    if (position === 0) return 30
    if (position === 1) return 20
    if (position === 2) return 10
    return 0
  }

  const getOpacity = (position) => {
    if (position === 0) return 1
    if (position === 1) return 0.7
    if (position === 2) return 0.5
    return 0
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

      {/* Main carousel container */}
      <div className="relative z-20 w-full max-w-full px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={showPhotos ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center"
        >
          {/* Message text at top */}
          <motion.div
            className="text-center mb-8 z-10"
            initial={{ opacity: 0, y: -20 }}
            animate={showPhotos ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 mb-2 font-caveat">
              უყურე უკვე სად მოვედიkönig!!!!
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-rose-600 font-caveat">
              ყვველაზე მეტად თaaaaan!!!!!!!!!!!
            </p>
          </motion.div>

          {/* Carousel */}
          <div
            className="relative w-full flex items-center justify-center h-64 sm:h-72 md:h-96 lg:h-[500px] mb-8"
            onMouseDown={handleDragStart}
            onMouseUp={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchEnd={handleDragEnd}
          >
            {/* Container for carousel images */}
            <div className="relative w-full h-full flex items-center justify-center">
              {images.map((img, idx) => {
                const position = getImagePosition(idx)
                const zIndex = getZIndex(position)
                const opacity = getOpacity(position)

                if (position > 2) return null

                const xOffset =
                  position === 0 ? 0 : position === 1 ? 140 : -140
                const yOffset =
                  position === 0 ? 0 : position === 1 ? 80 : 80

                return (
                  <motion.div
                    key={idx}
                    className="absolute cursor-grab active:cursor-grabbing"
                    animate={{
                      x: xOffset,
                      y: yOffset,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 30,
                    }}
                    style={{
                      zIndex: zIndex,
                      opacity: opacity,
                    }}
                  >
                    <motion.img
                      src={img}
                      alt={`memory-${idx}`}
                      className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-2xl object-cover shadow-2xl border-4 border-white cursor-pointer hover:shadow-3xl transition-shadow"
                      onClick={() => setFullscreenImage(img)}
                      animate={{
                        scale: position === 0 ? 1 : 0.85,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Dots indicator */}
          <motion.div
            className="flex gap-2 justify-center mb-8 z-10"
            initial={{ opacity: 0 }}
            animate={showPhotos ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            {images.map((_, idx) => (
              <motion.div
                key={idx}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all cursor-pointer ${
                  idx === currentIndex
                    ? 'bg-rose-500 w-6 sm:w-8'
                    : 'bg-pink-300 hover:bg-pink-400'
                }`}
                onClick={() => {
                  const diff = idx - currentIndex
                  setCurrentIndex(
                    (prev) => (prev + diff + images.length) % images.length
                  )
                }}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </motion.div>

          {/* Swipe hint */}
          <motion.p
            className="text-sm text-gray-600 mb-6 z-10"
            initial={{ opacity: 0 }}
            animate={showPhotos ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            💕 Swipe to see more memories 💕
          </motion.p>

          {/* Navigation button */}
          <motion.button
            onClick={onNext}
            className="px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={showPhotos ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Next 💕
          </motion.button>
        </motion.div>
      </div>

      {/* Fullscreen image viewer */}
      {fullscreenImage && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={() => setFullscreenImage(null)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative max-w-4xl w-full h-[80vh] rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
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
    </div>
  )
}

export default Page3
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setFullscreenImage(null)}
        >
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-4 right-4 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-2xl font-bold transition-all"
            aria-label="Close fullscreen"
          >
            ×
          </button>
          <img
            src={fullscreenImage}
            alt="Fullscreen view"
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {flowers.map((flower) => (
          <div
            key={flower.id}
            className="absolute"
            style={{
              left: `${flower.left}%`,
              top: `${flower.top}%`,
              width: `${flower.size}px`,
              height: `${flower.size}px`,
              transform: `rotate(${flower.rotation}deg)`,
              opacity: flower.opacity,
            }}
          >
            <img
              src={flower.image}
              alt=""
              className="w-full h-full object-contain drop-shadow-md"
            />
          </div>
        ))}
      </div>

      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8 sm:mb-12"
        >
          <div
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 leading-relaxed px-2"
            style={{ fontFamily: "'Kalam', 'Permanent Marker', 'Caveat', cursive" }}
          >
            უყურე უკვე სად მოვედიიიიითთ!!!!!
          </div>
        </motion.div>

        <div className="space-y-6 sm:space-y-8">
          {showPhotos &&
            images.map((src, idx) => (
              <React.Fragment key={src}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.97, y: 18 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full cursor-pointer"
                  onClick={() => setFullscreenImage(src)}
                >
                  <div className="w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl bg-white/60 backdrop-blur-sm">
                    <img
                      src={src}
                      alt={`Memory ${idx + 1}`}
                      className="w-full h-64 sm:h-80 md:h-96 object-cover block"
                      loading="lazy"
                    />
                  </div>
                </motion.div>

                {moments[idx] && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center px-4 relative py-2"
                  >
                    <div
                      className="text-base sm:text-lg md:text-xl text-gray-700 italic"
                      style={{ fontFamily: "'Kalam', 'Permanent Marker', 'Caveat', cursive" }}
                    >
                      {moments[idx]}
                    </div>
                  </motion.div>
                )}
              </React.Fragment>
            ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mt-12 sm:mt-16 px-4"
        >
          <div
            className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 leading-relaxed"
            style={{ fontFamily: "'Kalam', 'Permanent Marker', 'Caveat', cursive" }}
          >
            ყვველაზე მეტად თაააააან!!!!!!!!!!!
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mt-8"
        >
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-white text-pink-500 font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            style={{
              fontFamily: "'Kalam', 'Permanent Marker', 'Caveat', cursive",
              fontSize: '1.1rem'
            }}
          >
             →
          </motion.button>
        </motion.div>

        <div className="h-20" />
      </div>
    </div>
  )
}

export default Page3
