import React, { useState } from 'react'
import { formatHari, formatTanggal, fromStr } from '../lib/tanggal.js'
import './KertasTodo.css'

export default function KertasTodo({ tanggalStr, tugasList, onTambah, onToggle, onHapus }) {
  const [inputTeks, setInputTeks] = useState('')

  const dateObj = fromStr(tanggalStr)
  const hari = formatHari(dateObj).toLowerCase()
  const tglBln = formatTanggal(dateObj).toLowerCase()

  const selesaCount = tugasList.filter(t => t.selesai).length
  const totalCount = tugasList.length

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!inputTeks.trim()) return
    onTambah(inputTeks)
    setInputTeks('')
  }

  return (
    <div className="kertas-todo">
      <div className="kertas-todo__selotip" />
      
      <div className="kertas-todo__header">
        <h2 className="kertas-todo__judul">
          to-do {hari}, {tglBln}
        </h2>
        {totalCount > 0 && (
          <span className="kertas-todo__counter">
            {selesaCount}/{totalCount} beres
          </span>
        )}
      </div>

      <div className="kertas-todo__isi">
        {tugasList.length === 0 ? (
          <p className="kertas-todo__kosong">
            kosong, santai dulu… atau tulis satu di bawah
          </p>
        ) : (
          <ul className="kertas-todo__list">
            {tugasList.map(tugas => (
              <li key={tugas.id} className="kertas-todo__item">
                <button
                  className={`kertas-todo__check ${tugas.selesai ? 'kertas-todo__check--selesai' : ''}`}
                  onClick={() => onToggle(tugas.id, !tugas.selesai)}
                  aria-pressed={tugas.selesai}
                  aria-label={`Tandai ${tugas.selesai ? 'belum' : ''} selesai: ${tugas.teks}`}
                >
                  {tugas.selesai && '✓'}
                </button>
                <span className={`kertas-todo__teks ${tugas.selesai ? 'kertas-todo__teks--selesai' : ''}`}>
                  {tugas.teks}
                </span>
                <button
                  className="kertas-todo__hapus"
                  onClick={() => onHapus(tugas.id)}
                  aria-label={`Hapus ${tugas.teks}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}

        <form onSubmit={handleSubmit} className="kertas-todo__form">
          <input
            type="text"
            className="kertas-todo__input"
            placeholder="tulis tugas baru…"
            value={inputTeks}
            onChange={(e) => setInputTeks(e.target.value)}
            maxLength={200}
          />
          <button type="submit" className="kertas-todo__btn-tambah">
            + tulis
          </button>
        </form>
      </div>
    </div>
  )
}
