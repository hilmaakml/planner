import React, { useState } from 'react'
import { gridBulan, toStr, formatBulanTahun, addDays } from '../lib/tanggal.js'
import './Kalender.css'

export default function Kalender({ tanggalTerpilih, onPilihTanggal, tugasPerTanggal }) {
  const [bulanTampil, setBulanTampil] = useState(tanggalTerpilih)
  
  const grid = gridBulan(bulanTampil)
  const bulanStr = formatBulanTahun(new Date(bulanTampil + 'T00:00:00'))

  const handleKePrevBulan = () => {
    const d = new Date(bulanTampil + 'T00:00:00')
    d.setMonth(d.getMonth() - 1)
    setBulanTampil(toStr(d))
  }

  const handleKeNextBulan = () => {
    const d = new Date(bulanTampil + 'T00:00:00')
    d.setMonth(d.getMonth() + 1)
    setBulanTampil(toStr(d))
  }

  const handleKeHariIni = () => {
    const hariIni = toStr(new Date())
    setBulanTampil(hariIni)
    onPilihTanggal(hariIni)
  }

  const getTitik = (tanggal) => {
    const tugas = tugasPerTanggal[tanggal] || []
    if (tugas.length === 0) return null
    const semuaSelesai = tugas.every(t => t.selesai)
    return semuaSelesai ? 'sage' : 'lamp'
  }

  const hariIni = toStr(new Date())

  return (
    <div className="kalender">
      <div className="kalender__header">
        <button
          className="kalender__btn-bulan"
          onClick={handleKePrevBulan}
          aria-label="Bulan sebelumnya"
        >
          ‹
        </button>
        <h2 className="kalender__judul">{bulanStr}</h2>
        <button
          className="kalender__btn-bulan"
          onClick={handleKeNextBulan}
          aria-label="Bulan berikutnya"
        >
          ›
        </button>
      </div>

      <div className="kalender__grid">
        {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map(hari => (
          <div key={hari} className={`kalender__hari-label ${hari === 'Min' ? 'kalender__hari-label--minggu' : ''}`}>
            {hari}
          </div>
        ))}
        
        {grid.map(hari => {
          const isHariIni = hari.str === hariIni
          const isTerpilih = hari.str === tanggalTerpilih
          const titik = getTitik(hari.str)
          
          return (
            <button
              key={hari.str}
              className={`kalender__tanggal ${
                !hari.diBulanIni ? 'kalender__tanggal--diluar' : ''
              } ${isTerpilih ? 'kalender__tanggal--terpilih' : ''} ${
                hari.tanggal.getDay() === 0 ? 'kalender__tanggal--minggu' : ''
              }`}
              onClick={() => {
                onPilihTanggal(hari.str)
                setBulanTampil(hari.str)
              }}
              aria-pressed={isTerpilih}
            >
              <span className={`kalender__tanggal-angka ${isHariIni ? 'kalender__tanggal-angka--hari-ini' : ''}`}>
                {hari.tanggal.getDate()}
              </span>
              {isHariIni && <span className="kalender__titik-hari-ini" />}
              {titik && <span className={`kalender__titik kalender__titik--${titik}`} />}
            </button>
          )
        })}
      </div>

      <div className="kalender__footer">
        <div className="kalender__legenda">
          <span className="kalender__legenda-titik kalender__legenda-titik--lamp" />
          <span className="kalender__legenda-teks">ada yang belum</span>
        </div>
        <div className="kalender__legenda">
          <span className="kalender__legenda-titik kalender__legenda-titik--sage" />
          <span className="kalender__legenda-teks">beres semua</span>
        </div>
        <button className="kalender__ke-hari-ini" onClick={handleKeHariIni}>
          ke hari ini
        </button>
      </div>
    </div>
  )
}
