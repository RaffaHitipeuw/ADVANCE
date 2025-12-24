'use client'

import { useState } from 'react'
import SplashScreen from '../components/preloader/preloader'
import './globals.css'

export default function RootLayout({ children }) {
  const [ready, setReady] = useState(false)

  return (
    <html lang="en">
      <body>
        <div className={`logo-bg ${ready ? 'active' : ''}`} />
        {!ready && <SplashScreen onFinish={() => setReady(true)} />}
        {children}
      </body>
    </html>
  )
}
