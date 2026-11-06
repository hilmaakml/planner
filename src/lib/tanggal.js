// Helper tanggal: format string YYYY-MM-DD, grid 42 hari, rentang minggu

const BULAN = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
]

const HARI = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']

function fromStr(str) {
  const [y, m, d] = str.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function toStr(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function getDayOfWeek(date) {
  const d = date.getDay()
  return d === 0 ? 6 : d - 1
}

function startOfWeek(date) {
  const d = new Date(date)
  const diff = d.getDay() === 0 ? -6 : 1 - d.getDay()
  d.setDate(d.getDate() + diff)
  d.setHours(0, 0, 0, 0)
  return d
}

function addDays(date, days) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function formatTanggal(date) {
  return `${date.getDate()} ${BULAN[date.getMonth()]} ${date.getFullYear()}`
}

function formatHari(date) {
  return HARI[getDayOfWeek(date)]
}

function formatBulanTahun(date) {
  return `${BULAN[date.getMonth()]} ${date.getFullYear()}`
}

function gridBulan(tanggalStr) {
  const tanggal = fromStr(tanggalStr)
  const start = startOfWeek(tanggal)
  const hariList = []
  for (let i = 0; i < 42; i++) {
    hariList.push({
      str: toStr(addDays(start, i)),
      tanggal: addDays(start, i),
      diBulanIni: addDays(start, i).getMonth() === tanggal.getMonth()
    })
  }
  return hariList
}

function rentangMingguBerjalan() {
  const hariIni = new Date()
  const senin = startOfWeek(hariIni)
  const minggu = addDays(senin, 6)
  return {
    dari: toStr(senin),
    sampai: toStr(minggu)
  }
}

export {
  fromStr,
  toStr,
  getDayOfWeek,
  startOfWeek,
  addDays,
  isSameDay,
  formatTanggal,
  formatHari,
  formatBulanTahun,
  gridBulan,
  rentangMingguBerjalan,
  BULAN,
  HARI
}
