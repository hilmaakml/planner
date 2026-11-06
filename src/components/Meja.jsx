import React from 'react'
import Header from './Header.jsx'
import Jendela from './Jendela.jsx'
import Kalender from './Kalender.jsx'
import RingkasanMinggu from './RingkasanMinggu.jsx'
import KertasTodo from './KertasTodo.jsx'
import Target from './Target.jsx'
import StatusSimpan from './StatusSimpan.jsx'
import './Meja.css'

export default function Meja({ 
  sesi, 
  onKeluar, 
  onToggleHujan, 
  hujanNyala,
  tanggalTerpilih,
  onPilihTanggal,
  tugasPerTanggal,
  tugasTerpilih,
  onTambahTugas,
  onToggleTugas,
  onHapusTugas,
  targetList,
  onTambahTarget,
  onUbahNilaiTarget,
  onHapusTarget
}) {
  return (
    <div className="meja">
      <Header 
        hujanNyala={hujanNyala} 
        onToggleHujan={onToggleHujan} 
        onKeluar={onKeluar} 
      />
      
      <main className="meja__grid">
        <section className="meja__kolom meja__kolom--kiri">
          <Jendela />
          <Target 
            targetList={targetList}
            onTambah={onTambahTarget}
            onUbahNilai={onUbahNilaiTarget}
            onHapus={onHapusTarget}
          />
        </section>

        <section className="meja__kolom meja__kolom--tengah">
          <div className="meja__panel">
            <Kalender 
              tanggalTerpilih={tanggalTerpilih}
              onPilihTanggal={onPilihTanggal}
              tugasPerTanggal={tugasPerTanggal}
            />
          </div>
          <RingkasanMinggu tugasPerTanggal={tugasPerTanggal} />
        </section>

        <section className="meja__kolom meja__kolom--kanan">
          <KertasTodo 
            tanggalStr={tanggalTerpilih}
            tugasList={tugasTerpilih}
            onTambah={onTambahTugas}
            onToggle={onToggleTugas}
            onHapus={onHapusTugas}
          />
        </section>
      </main>

      <StatusSimpan status="tersimpan" />
    </div>
  )
}
