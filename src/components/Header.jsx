import React, { useState, useEffect } from 'react'
import { getSaapaan } from '../lib/pesan.js'
import './Header.css'

function formatJam(date) {
  const h = date.getHours().toString().padStart(2, '0')
  const m = date.getMinutes().toString().padStart(2, '0')
  return `${h}:${m}`
}

export default function Header({ onToggleHujan, hujanNyala, onKeluar }) {
  const [waktu, setWaktu] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setWaktu(new Date())
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const nama = 'user'
  const saapaan = getSaapaan(waktu)
  const hari = waktu.toLocaleDateString('id-ID', { weekday: 'long' })
  const tanggal = waktu.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return (
    <header className="header">
      <div className="header__kiri">
        <h1 className="header__sapaan">
          selamat {saapaan}, <span className="header__nama">{nama}</span>
        </h1>
        <p className="header__tanggal">
          {hari}, {tanggal}
        </p>
      </div>
      <div className="header__kanan">
        <time className="header__jam" dateTime={waktu.toISOString()}>
          {formatJam(waktu)}
        </time>
        <button
          className="header__suara"
          onClick={onToggleHujan}
          aria-label={hujanNyala ? 'Matikan suara hujan' : 'Nyalakan suara hujan'}
        >
          <span className="header__suara-batang" />
          <span className="header__suara-batang" />
          <span className="header__suara-batang" />
        </button>
        <button className="header__keluar" onClick={onKeluar}>
          keluar
        </button>
      </div>
    </header>
  )
}
