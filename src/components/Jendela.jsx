import React, { useRef, useEffect, useState } from 'react'
import './Jendela.css'

const GEDUNG_JAUH = [
  { x: 0.1, y: 0.55, w: 0.15, h: 0.45 },
  { x: 0.28, y: 0.48, w: 0.18, h: 0.52 },
  { x: 0.5, y: 0.52, w: 0.12, h: 0.48 },
  { x: 0.68, y: 0.45, w: 0.22, h: 0.55 }
]

const GEDUNG_DEKAT = [
  { x: 0.05, y: 0.65, w: 0.2, h: 0.35 },
  { x: 0.3, y: 0.58, w: 0.25, h: 0.42 },
  { x: 0.6, y: 0.62, w: 0.18, h: 0.38 },
  { x: 0.82, y: 0.7, w: 0.15, h: 0.3 }
]

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export default function Jendela() {
  const canvasRef = useRef(null)
  const animFrameRef = useRef(null)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleVisibility = () => {
      setIsVisible(!document.hidden)
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    
    let w, h
    let tetes = []
    let kedipan = []

    function resize() {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.scale(dpr, dpr)
      
      tetes = []
      for (let i = 0; i < 80; i++) {
        tetes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          v: 2 + Math.random() * 3,
          len: 8 + Math.random() * 12
        })
      }

      kedipan = []
      GEDUNG_JAUH.concat(GEDUNG_DEKAT).forEach((g, gi) => {
        const jmlJendela = Math.floor(seededRandom(gi * 100) * 8) + 6
        for (let i = 0; i < jmlJendela; i++) {
          kedipan.push({
            gedung: gi,
            x: g.x + seededRandom(gi * 1000 + i) * g.w,
            y: g.y + seededRandom(gi * 2000 + i) * g.h,
            nyala: true,
            nextToggle: Date.now() + seededRandom(gi * 3000 + i) * 10000
          })
        }
      })
    }

    function gambarLangit() {
      const grad = ctx.createLinearGradient(0, 0, 0, h)
      grad.addColorStop(0, '#2b2556')
      grad.addColorStop(0.5, '#5a4583')
      grad.addColorStop(1, '#b77b8e')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)
    }

    function gambarBulan() {
      ctx.fillStyle = 'rgba(255, 248, 220, 0.9)'
      ctx.beginPath()
      ctx.arc(w * 0.75, h * 0.25, 30, 0, Math.PI * 2)
      ctx.fill()
      
      ctx.fillStyle = 'rgba(255, 248, 220, 0.15)'
      ctx.beginPath()
      ctx.arc(w * 0.75, h * 0.25, 50, 0, Math.PI * 2)
      ctx.fill()
    }

    function gambarGedung(list, warna) {
      ctx.fillStyle = warna
      list.forEach(g => {
        ctx.fillRect(g.x * w, g.y * h, g.w * w, g.h * h)
      })
    }

    function gambarJendela() {
      const now = Date.now()
      kedipan.forEach(k => {
        if (now > k.nextToggle) {
          k.nyala = !k.nyala
          k.nextToggle = now + (k.nyala ? 8000 : 2000) + Math.random() * 5000
        }
        if (k.nyala) {
          ctx.fillStyle = 'rgba(255, 230, 150, 0.8)'
          ctx.fillRect(k.x * w, k.y * h, 3, 4)
        }
      })
    }

    function gambarHujan() {
      ctx.strokeStyle = 'rgba(200, 220, 255, 0.3)'
      ctx.lineWidth = 1
      tetes.forEach(t => {
        ctx.beginPath()
        ctx.moveTo(t.x, t.y)
        ctx.lineTo(t.x - t.len * 0.4, t.y + t.len)
        ctx.stroke()
        
        t.y += t.v
        t.x -= t.v * 0.4
        if (t.y > h) {
          t.y = -20
          t.x = Math.random() * w
        }
      })
    }

    function loop() {
      if (!isVisible) {
        gambarLangit()
        gambarBulan()
        gambarGedung(GEDUNG_JAUH, 'rgba(90, 69, 131, 0.6)')
        gambarGedung(GEDUNG_DEKAT, 'rgba(60, 50, 90, 0.8)')
        gambarJendela()
        return
      }

      gambarLangit()
      gambarBulan()
      gambarGedung(GEDUNG_JAUH, 'rgba(90, 69, 131, 0.6)')
      gambarGedung(GEDUNG_DEKAT, 'rgba(60, 50, 90, 0.8)')
      gambarJendela()
      gambarHujan()
      
      animFrameRef.current = requestAnimationFrame(loop)
    }

    resize()
    window.addEventListener('resize', resize)
    loop()

    return () => {
      window.removeEventListener('resize', resize)
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
      }
    }
  }, [isVisible])

  return (
    <div className="jendela">
      <div className="jendela__bingkai">
        <canvas ref={canvasRef} className="jendela__canvas" />
        <div className="jendela__kusen jendela__kusen--v" />
        <div className="jendela__kusen jendela__kusen--h" />
      </div>
      <div className="jendela__ambang">
        <div className="jendela__kucing" />
        <div className="jendela__tanaman" />
        <div className="jendela__mug">
          <div className="jendela__uap jendela__uap--1" />
          <div className="jendela__uap jendela__uap--2" />
        </div>
      </div>
      <p className="jendela__caption">
        <span className="jendela__caption-judul">hujan rintik di luar</span>
        <span className="jendela__caption-sub">
          {new Date().getHours() >= 18 || new Date().getHours() < 5
            ? 'langit malam yang tenang, cocok buat mikir'
            : 'siang yang teduh, waktu yang pas buat fokus'}
        </span>
      </p>
    </div>
  )
}
