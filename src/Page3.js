import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const Page3 = ({ onNext }) => {
  const [showPhotos, setShowPhotos] = useState(false)
  const [flowers, setFlowers] = useState([])
  const [fullscreenImage, setFullscreenImage] = useState(null)

  useEffect(() => {
    const t = window.setTimeout(() => setShowPhotos(true), 200)
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => {
    const flowerImages = [
      '/flowers-images/cherry-blossom.png',
      '/flowers-images/flower.png',
      '/flowers-images/sakura.png',
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
      '/images/178ad021-9848-4178-8bd6-78b4b4a2ad2d.jpg',
      '/images/1b089b47-1dfc-4fd8-9a2e-c8f51c110e2c.jpg',
      '/images/369bd509-b0ab-4a39-a53d-3484666d5aad.jpg',
      '/images/62def098-7c1a-427a-a88a-27c6e9af7cba.jpg',
      '/images/757bf1b6-d286-4fce-8212-471f033f79a8.jpg',
      '/images/9be7576f-1aa7-4c70-84d1-71667d2005b4.jpg',
      '/images/a34a3f96-a5cb-4659-a868-cc92c2ae5f9a.jpg',
      '/images/cf3df111-7637-4e8e-9561-0276cda7355f.jpg',
      '/images/d071059b-1f9b-441c-adbd-3614b27816f8.jpg',
      '/images/ffed03c9-945e-4ae0-a5d7-2789c05eb33e.jpg',
    ],
    []
  )

  const moments = useMemo(
    () => ({
      2: 'მიყვარხარ!',
      5: 'მიყვარხარ!',
      8: 'და მიყვრხარ!',
    }),
    []
  )

  return (
    <div className="relative h-screen overflow-y-auto overscroll-contain bg-gradient-to-br from-pink-200 via-rose-100 to-pink-200">
      {fullscreenImage && (
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
            Next →
          </motion.button>
        </motion.div>

        <div className="h-20" />
      </div>
    </div>
  )
}

export default Page3
