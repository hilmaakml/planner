import React from 'react'
import { rentangMingguBerjalan, formatTanggal, fromStr } from '../lib/tanggal.js'
import './RingkasanMinggu.css'

export default function RingkasanMinggu({ tugasPerTanggal }) {
  const { dari, sampai } = rentangMingguBerjalan()
  
  let selesai = 0
  let total = 0
  
  for (let d = fromStr(dari); d <= fromStr(sampai); d.setDate(d.getDate() + 1)) {
    const str = dari.substring(0, 10)
    const pad = String(d.getDate()).padStart(2, '0')
    const tanggalKey = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + pad
    
    const tugas = tugasPerTanggal[tanggalKey] || []
    total += tugas.length
    selesai += tugas.filter(t => t.selesai).length
  }

  const pesan = total === 0 
    ? 'belum ada tugas minggu ini'
    : selesai === total
    ? 'semua beres, waktunya rebahan'
    : 'tugas selesai, pelan-pelan aja'

  return (
    <div className="ringkasan">
      <div className="ringkasan__angka">
        {selesai}<span className="ringkasan__garis">/</span>{total}
      </div>
      <div className="ringkasan__isi">
        <div className="ringkasan__label">minggu ini</div>
        <div className="ringkasan__pesan">{pesan}</div>
      </div>
    </div>
  )
}
