import React, { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const clamp = (n, min, max) => Math.max(min, Math.min(max, n))

const Page4 = () => {
  const [noClicks, setNoClicks] = useState(0)
  const [accepted, setAccepted] = useState(false)
  const [burst, setBurst] = useState(false)

  const audioRef = useRef(null)

  useEffect(() => {
    audioRef.current = new Audio("/mixkit-laughing-teenager-428.wav")
    audioRef.current.preload = "auto"
  }, [])

  const yesScale = clamp(1 + noClicks * 0.25, 1, 3.5)
  const noScale = clamp(1 - noClicks * 0.08, 0.3, 1)
  const yesTranslateX = noClicks > 3 ? -60 : 0 // Move Yes button left to cover No

  const hearts = useMemo(() => {
    const count = 22
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 12 + Math.random() * 26,
      duration: 7 + Math.random() * 7,
      delay: Math.random() * 4,
      opacity: 0.15 + Math.random() * 0.25,
      drift: -18 + Math.random() * 36,
    }))
  }, [])

  const burstHearts = useMemo(() => {
    const count = 26
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: -160 + Math.random() * 320,
      y: -220 + Math.random() * 240,
      rotate: -40 + Math.random() * 80,
      scale: 0.8 + Math.random() * 1.2,
      delay: Math.random() * 0.12,
      duration: 0.6 + Math.random() * 0.5,
    }))
  }, [])

  const playLaugh = async () => {
    try {
      if (!audioRef.current) return
      audioRef.current.currentTime = 0
      await audioRef.current.play()
    } catch {}
  }

  const onNo = async () => {
    if (accepted || noClicks > 3) return
    await playLaugh()
    setNoClicks((v) => v + 1)
  }

  const onYes = () => {
    if (accepted) return
    setAccepted(true)
    setBurst(true)
    window.setTimeout(() => setBurst(false), 1200)
  }

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-br from-pink-300 via-rose-200 to-pink-200">
      <div className="absolute inset-0 pointer-events-none">
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ y: "110vh", opacity: 0 }}
            animate={{ y: "-15vh", opacity: h.opacity, x: [0, h.drift, 0] }}
            transition={{
              duration: h.duration,
              delay: h.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute"
            style={{ left: `${h.left}%`, width: h.size, height: h.size }}
          >
            <div className="w-full h-full rotate-45 bg-white/70 rounded-sm shadow-sm" />
            <div className="w-full h-full -mt-[50%] bg-white/70 rounded-full" />
            <div className="w-full h-full -mt-[100%] ml-[50%] bg-white/70 rounded-full" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-5">
        <motion.h1
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center text-3xl sm:text-4xl font-extrabold text-white drop-shadow-lg"
        >
          Will you be my Valentine? 💖
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 w-full max-w-sm"
        >
          <div className="w-full overflow-hidden rounded-3xl bg-white/45 backdrop-blur-md shadow-2xl border border-white/40">
            <img
              src="/WhatsApp Sticker 2026-01-26 at 4.48.31 PM.31 PM"
              alt="Main"
              className="w-full h-56 sm:h-64 object-contain"
              loading="eager"
            />
          </div>
        </motion.div>

        <div className="mt-7 w-full max-w-sm">
          <AnimatePresence mode="wait">
            {!accepted ? (
              <motion.div
                key="buttons"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center justify-center gap-4"
              >
                <motion.button
                  onClick={onYes}
                  animate={{ 
                    scale: yesScale,
                    x: yesTranslateX,
                    zIndex: noClicks > 3 ? 20 : 10
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 260, 
                    damping: 16,
                    x: { type: "spring", stiffness: 200, damping: 15 }
                  }}
                  className="px-7 py-4 rounded-2xl text-lg font-bold text-white bg-emerald-500/95 shadow-xl active:scale-95 relative"
                >
                  Yes
                </motion.button>

                <motion.button
                  onClick={onNo}
                  disabled={noClicks > 3}
                  animate={{ 
                    scale: noScale, 
                    rotate: noClicks ? [0, 2, -2, 0] : 0,
                    opacity: noClicks > 3 ? 0 : 1
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 18,
                  }}
                  className={`px-7 py-4 rounded-2xl text-lg font-bold text-white bg-rose-500/90 shadow-xl active:scale-95 ${
                    noClicks > 3 ? 'cursor-not-allowed pointer-events-none' : ''
                  }`}
                >
                  No
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="accepted"
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <div className="text-3xl font-extrabold text-white drop-shadow-lg">
                  არიქნები და შენი აჯობებსსსსს! 💖✨
                </div>
                <div className="mt-2 text-xl font-semibold text-white/95 drop-shadow">
                  მიყვარხარ ყველაზე
                </div>
                <div className="mt-1 text-lg text-white/90 drop-shadow">
                  ჩემს მედოს ცხოვრების ბოლომდე!!!!!!!!!!
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {burst && (
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {burstHearts.map((h) => (
              <motion.div
                key={h.id}
                initial={{ x: 0, y: 40, opacity: 0, scale: 0.6 }}
                animate={{
                  x: h.x,
                  y: h.y,
                  opacity: [0, 1, 0],
                  rotate: h.rotate,
                  scale: h.scale,
                }}
                transition={{
                  duration: h.duration,
                  delay: h.delay,
                  ease: "easeOut",
                }}
                className="absolute"
              >
                <div className="w-5 h-5 rotate-45 bg-white rounded-sm shadow-md" />
                <div className="w-5 h-5 -mt-[50%] bg-white rounded-full" />
                <div className="w-5 h-5 -mt-[100%] ml-[50%] bg-white rounded-full" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Page4
