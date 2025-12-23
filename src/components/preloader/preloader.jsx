'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function SplashScreen() {
  const logos = [
    '/qism/1.png',
    '/qism/2.png',
    '/qism/3.png',
    '/qism/Union.png',
    '/qism/4.png',
    '/qism/5.png',
    '/qism/7.png',
  ]

  const center = Math.floor(logos.length / 2)
  const [active, setActive] = useState(0)
  const [isRising, setIsRising] = useState(false)

  useEffect(() => {
    const riseDuration = 450
    const downDuration = 450
    const pause = 250

    const cycle = () => {
      setIsRising(true)

      setTimeout(() => {
        setIsRising(false)
      }, riseDuration)

      setTimeout(() => {
        setActive((prev) => (prev + 1) % logos.length)
      }, riseDuration + downDuration + pause)
    }

    const interval = setInterval(
      cycle,
      riseDuration + downDuration + pause
    )

    return () => clearInterval(interval)
  }, [logos.length])

  return (
    <div className="flex h-screen w-full items-center justify-center bg-neutral-950">
      <div className="flex gap-0.5">
        {logos.map((src, i) => {
          const isCenter = i === center
          const animateLogo = i === active && isRising && !isCenter

          return (
          <div key={src} className={`relative ${isCenter ? 'h-32 w-28' : 'h-24 w-14'} overflow-visible`}>
            <motion.div
              animate={{ opacity: animateLogo ? 1 : 0 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute top-16 left-1/2 z-0 h-2 w-2 -translate-x-1/2 rounded-full bg-white"/>

            <motion.div
              animate={{ y: animateLogo ? -18 : 0 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`absolute left-1/2 z-10 -translate-x-1/2 ${
                isCenter ? 'h-24 w-24' : 'top-6 h-12 w-12'}`}>
              <Image
                src={src}
                alt={`logo-${i}`}
                fill
                className="object-contain"
                priority
              />
              </motion.div>

            </div>
          )
        })}
      </div>
    </div>
  )
}
