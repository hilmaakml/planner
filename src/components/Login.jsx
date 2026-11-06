import React, { useState } from 'react'
import { TEXT } from '../lib/pesan.js'
import './Login.css'
import Jendela from './Jendela.jsx'

export default function Login({ onLogin }) {
  const [langkah, setLangkah] = useState(1)
  const [email, setEmail] = useState('')
  const [kode, setKode] = useState('')

  const handleKirim = (e) => {
    e.preventDefault()
    setLangkah(2)
  }

  const handleMasuk = (e) => {
    e.preventDefault()
    onLogin()
  }

  return (
    <div className="login">
      <div className="login__jendela">
        <Jendela />
      </div>
      <div className="login__panel">
        <h1 className="login__judul">{TEXT.judulLogin}</h1>
        <p className="login__deskripsi">{TEXT.deskripsiLogin}</p>
        
        {langkah === 1 ? (
          <form onSubmit={handleKirim} className="login__form">
            <label className="login__label">{TEXT.labelEmail}</label>
            <input
              type="email"
              className="login__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={TEXT.placeholderEmail}
              required
            />
            <button type="submit" className="login__btn">{TEXT.tombolKirimKode}</button>
          </form>
        ) : (
          <form onSubmit={handleMasuk} className="login__form">
            <label className="login__label">{TEXT.labelKode}</label>
            <input
              type="text"
              className="login__input login__input--kode"
              value={kode}
              onChange={(e) => setKode(e.target.value)}
              placeholder={TEXT.placeholderKode}
              maxLength={6}
              inputMode="numeric"
              autoComplete="one-time-code"
              required
            />
            <button type="submit" className="login__btn">{TEXT.tombolMasuk}</button>
            <button type="button" className="login__ganti" onClick={() => setLangkah(1)}>
              {TEXT.gantiEmail}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
