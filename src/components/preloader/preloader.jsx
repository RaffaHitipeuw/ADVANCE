'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function SplashScreen({ onFinish }) {
  const logos = [
    '/qism/1.png',
    '/qism/2.png',
    '/qism/3.png',
    '/qism/Union.png',
    '/qism/4.png',
    '/qism/5.png',
    '/qism/7.png',
  ]

  const NEW_LOGO = '/Rectangle126.svg'
  const center = Math.floor(logos.length / 2)

  const [active, setActive] = useState(0)
  const [isRising, setIsRising] = useState(false)
  const [phase, setPhase] = useState(0)
  const [maskScale, setMaskScale] = useState(1)

  const maskRef = useRef<HTMLDivElement | null>(null)

  const riseDuration = 260
  const downDuration = 260
  const pause = 120
  const cycleDuration = riseDuration + downDuration + pause

  const getFullscreenScale = (el) => {
    if (!el) return 1

    const { width, height } = el.getBoundingClientRect()
    const vw = window.innerWidth
    const vh = window.innerHeight

    const screenDiagonal = Math.sqrt(vw * vw + vh * vh)
    const elDiagonal = Math.sqrt(width * width + height * height)

    return screenDiagonal / elDiagonal
  }

  useEffect(() => {
    if (phase >= 2) return

    const interval = setInterval(() => {
      setIsRising(true)
      setTimeout(() => setIsRising(false), riseDuration)

      setTimeout(() => {
        setActive((prev) => {
          if (phase === 0) {
            if (prev < logos.length - 1) return prev + 1
            setPhase(1)
            return prev
          }

          if (phase === 1) {
            if (prev > center) return prev - 1
            setPhase(2)
            return prev
          }

          return prev
        })
      }, riseDuration + downDuration)
    }, cycleDuration)

    return () => clearInterval(interval)
  }, [phase, logos.length, center])

  useEffect(() => {
    if (phase === 2 && maskRef.current) {
      setMaskScale(getFullscreenScale(maskRef.current))
      const t = setTimeout(() => onFinish?.(), 1300)
      return () => clearTimeout(t)
    }
  }, [phase, onFinish])

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black">
      <div className="fixed inset-0 overflow-hidden bg-black">
        <motion.div
          ref={maskRef}
          className="fixed left-1/2 top-1/2 z-45 h-24 w-24 -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: phase === 2 ? maskScale : 1,
            opacity: phase === 2 ? 1 : 0,
          }}
          transition={{
            scale: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.2 },
          }}
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex gap-0.5">
          {logos.map((src, i) => {
            const isCenter = i === center
            const animateLogo = i === active && isRising && !isCenter

            return (
              <motion.div
                key={src}
                className={`relative ${isCenter ? 'h-32 w-28' : 'h-24 w-14'}`}
                animate={{
                  opacity: isCenter ? 1 : phase >= 1 ? 0 : 1,
                }}
                transition={{ duration: 0.4 }}
              >
                {!isCenter && (
                  <motion.div
                    className="absolute left-1/2 top-16 h-2 w-2 -translate-x-1/2 rounded-full bg-white"
                    animate={{ opacity: animateLogo ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                  />
                )}

                {isCenter && (
                  <div className="absolute inset-0">
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        rotate: phase === 2 ? -180 : 0,
                        opacity: phase === 2 ? 0 : 1,
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <Image
                        src={logos[center]}
                        alt="logo-old"
                        fill
                        sizes="100px"
                        className="object-contain"
                        priority
                      />
                    </motion.div>

                    <motion.div
                      className="absolute inset-0"
                      initial={{ rotate: 180, opacity: 0 }}
                      animate={{
                        rotate: phase === 2 ? 0 : 180,
                        opacity: phase === 2 ? 1 : 0,
                      }}
                      transition={{ duration: 0.6, delay: 0.15 }}
                    >
                      <Image
                        src={NEW_LOGO}
                        alt="logo-new"
                        fill
                        sizes="100px"
                        className="object-contain"
                        priority
                      />
                    </motion.div>
                  </div>
                )}

                {!isCenter && (
                  <motion.div
                    className="absolute left-1/2 top-6 h-12 w-12 -translate-x-1/2"
                    animate={{ y: animateLogo ? -18 : 0 }}
                    transition={{
                      y: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                    }}
                  >
                    <Image
                      src={src}
                      alt={`logo-${i}`}
                      fill
                      sizes="200px"
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
