import React, { useState } from 'react'
import './Target.css'

export default function Target({ targetList, onTambah, onUbahNilai, onHapus }) {
  const [judul, setJudul] = useState('')
  const [maks, setMaks] = useState('')
  const [satuan, setSatuan] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!judul.trim() || !maks || Number(maks) <= 0) return
    onTambah({
      judul: judul.trim(),
      maks: Number(maks),
      satuan: satuan.trim()
    })
    setJudul('')
    setMaks('')
    setSatuan('')
  }

  return (
    <div className="target-panel">
      <h2 className="target-panel__judul">target pencapaian</h2>

      {targetList.length === 0 ? (
        <p className="target-panel__kosong">
          belum ada target. tambah satu di bawah.
        </p>
      ) : (
        <div className="target-panel__list">
          {targetList.map(target => {
            const persen = Math.min(100, Math.round((target.nilai / target.maks) * 100))
            const tercapai = target.nilai >= target.maks

            return (
              <div key={target.id} className="target-item">
                <div className="target-item__header">
                  <span className="target-item__judul">{target.judul}</span>
                  <span className="target-item__angka">
                    {target.nilai}/{target.maks} {target.satuan}
                  </span>
                </div>

                <div
                  className={`target-item__bar ${tercapai ? 'target-item__bar--tercapai' : ''}`}
                  role="progressbar"
                  aria-valuenow={target.nilai}
                  aria-valuemin={0}
                  aria-valuemax={target.maks}
                >
                  <div
                    className="target-item__bar-isi"
                    style={{ width: `${persen}%` }}
                  />
                </div>

                <div className="target-item__footer">
                  <div className="target-item__kontrol">
                    <button
                      className="target-item__btn-step"
                      onClick={() => onUbahNilai(target.id, Math.max(0, target.nilai - 1))}
                      disabled={target.nilai <= 0}
                      aria-label={`Kurangi ${target.judul}`}
                    >
                      −
                    </button>
                    <button
                      className="target-item__btn-step"
                      onClick={() => onUbahNilai(target.id, Math.min(target.maks, target.nilai + 1))}
                      disabled={target.nilai >= target.maks}
                      aria-label={`Tambah ${target.judul}`}
                    >
                      +
                    </button>
                  </div>

                  <span className={`target-item__persen ${tercapai ? 'target-item__persen--tercapai' : ''}`}>
                    {tercapai ? 'yay, tercapai!' : `${persen}%`}
                  </span>

                  <button
                    className="target-item__hapus"
                    onClick={() => onHapus(target.id)}
                    aria-label={`Hapus ${target.judul}`}
                  >
                    ×
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <form onSubmit={handleSubmit} className="target-form">
        <input
          type="text"
          className="target-form__input target-form__input--judul"
          placeholder="target baru…"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          maxLength={80}
          required
        />
        <div className="target-form__sub">
          <input
            type="number"
            className="target-form__input target-form__input--maks"
            placeholder="jumlah"
            value={maks}
            onChange={(e) => setMaks(e.target.value)}
            min={1}
            max={10000}
            required
          />
          <input
            type="text"
            className="target-form__input target-form__input--satuan"
            placeholder="satuan"
            value={satuan}
            onChange={(e) => setSatuan(e.target.value)}
            maxLength={20}
          />
          <button type="submit" className="target-form__btn-tambah">
            tambah
          </button>
        </div>
      </form>
    </div>
  )
}
