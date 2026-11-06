// Mock db (tahap 1): state di memori, tanpa Supabase
// Tahap 3: implementasi query Supabase

let mockData = {
  tugas: [
    { id: 't1', user_id: 'mock-user-id', tanggal: '2026-11-05', teks: 'Contoh tugas', selesai: false, dibuat: '2026-11-05T08:00:00Z' }
  ],
  target: [
    { id: 'tg1', user_id: 'mock-user-id', judul: 'Baca 10 halaman', nilai: 5, maks: 10, satuan: 'halaman', dibuat: '2026-11-05T08:00:00Z' }
  ]
}

export function ambilTugas(dari, sampai) {
  const list = mockData.tugas.filter(t => t.tanggal >= dari && t.tanggal <= sampai)
  return { ok: true, data: list.sort((a, b) => a.dibuat.localeCompare(b.dibuat)) }
}

export function ambilSemuaTugas() {
  return { ok: true, data: mockData.tugas.sort((a, b) => a.dibuat.localeCompare(b.dibuat)) }
}

export function tambahTugas({ tanggal, teks }) {
  const id = `t${Date.now()}`
  const baris = {
    id,
    user_id: 'mock-user-id',
    tanggal,
    teks: teks.trim(),
    selesai: false,
    dibuat: new Date().toISOString()
  }
  mockData.tugas.push(baris)
  return { ok: true, data: baris }
}

export function ubahTugas(id, { selesai }) {
  const idx = mockData.tugas.findIndex(t => t.id === id)
  if (idx === -1) return { ok: false }
  mockData.tugas[idx].selesai = selesai
  return { ok: true }
}

export function hapusTugas(id) {
  const idx = mockData.tugas.findIndex(t => t.id === id)
  if (idx === -1) return { ok: false }
  const baris = mockData.tugas[idx]
  mockData.tugas.splice(idx, 1)
  return { ok: true, data: baris }
}

export function pulihkanTugas(baris) {
  mockData.tugas.push(baris)
  return { ok: true }
}

export function ambilTarget() {
  return { ok: true, data: mockData.target.sort((a, b) => a.dibuat.localeCompare(b.dibuat)) }
}

export function tambahTarget({ judul, maks, satuan }) {
  const id = `tg${Date.now()}`
  const baris = {
    id,
    user_id: 'mock-user-id',
    judul,
    nilai: 0,
    maks: Number(maks),
    satuan: satuan || '',
    dibuat: new Date().toISOString()
  }
  mockData.target.push(baris)
  return { ok: true, data: baris }
}

export function ubahTarget(id, { nilai }) {
  const idx = mockData.target.findIndex(t => t.id === id)
  if (idx === -1) return { ok: false }
  mockData.target[idx].nilai = nilai
  return { ok: true }
}

export function hapusTarget(id) {
  const idx = mockData.target.findIndex(t => t.id === id)
  if (idx === -1) return { ok: false }
  const baris = mockData.target[idx]
  mockData.target.splice(idx, 1)
  return { ok: true, data: baris }
}

export function pulihkanTarget(baris) {
  mockData.target.push(baris)
  return { ok: true }
}
