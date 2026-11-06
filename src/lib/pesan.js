// Teks statis aplikasi sesuai design.md §7

const SAAPAAN = [
  { h: 0, t: 'malam' },
  { h: 5, t: 'pagi' },
  { h: 11, t: 'siang' },
  { h: 15, t: 'sore' },
  { h: 18, t: 'malam' }
]

function getSaapaan(date) {
  const h = date.getHours()
  for (const s of SAAPAAN) {
    if (h < s.h) return s.t
  }
  return 'malam'
}

const TEXT = {
  // Header
  namaDefault: 'user',
  jamFormat: 'HH:MM',

  // Kalender
  hariList: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
  keHariIni: 'ke hari ini',

  // To-do
  judulTodo: 'to-do',
  judulTodoHari: (hari, tanggal) => `to-do ${hari}, ${tanggal}`,
  placeholderTodo: 'tulis tugas baru…',
  tombolTambahTodo: '+ tulis',
  counter: (selesai, total) => `${selesai}/${total} beres`,

  // Ringkasan minggu ini
  judulRingkasan: 'minggu ini',
  ringkasanRendah: 'tugas selesai, pelan-pelan aja',
  ringkasanTinggi: 'semua beres, waktunya rebahan',

  // Target
  judulTarget: 'target pencapaian',
  placeholderTargetJudul: 'target baru…',
  placeholderTargetJumlah: 'jumlah',
  placeholderTargetSatuan: 'satuan',
  tombolTambahTarget: 'tambah',
  tombolUrungkan: 'urungkan',

  // Toast
  toastTugas: 'tugas dihapus',
  toastTarget: 'target dihapus',

  // Status simpan
  simpanNormal: 'tersimpan',
  simpanMenyimpan: 'lagi nyimpen…',
  simpanGagal: 'gagal nyimpen. perubahan terakhir dibatalkan.',
  simpanOffline: 'lagi offline. perubahan belum bisa disimpan.',

  // Memuat
  memuat: 'lagi buka buku catatanmu…',
  gagalMuat: 'catatanmu belum bisa dimuat.',
  tombolCobaLagi: 'coba lagi',

  // Kosong
  todoKosong: 'kosong, santai dulu… atau tulis satu di bawah',
  targetKosong: 'belum ada target. tambah satu di bawah.',
  mingguKosong: 'belum ada tugas minggu ini',

  // Suara
  suaraOn: 'suara hujan',
  suaraOff: 'suara mati',

  // Login
  judulLogin: 'masuk ke meja malam',
  deskripsiLogin: 'kode masuk dikirim ke email kamu, tanpa password.',
  labelEmail: 'email',
  placeholderEmail: 'email kamu',
  tombolKirimKode: 'kirim kode',
  labelKode: 'kode dari email',
  placeholderKode: '6 digit',
  tombolMasuk: 'masuk',
  gantiEmail: 'ganti email',

  // Pesan error login
  emailBelumTerdaftar: 'email ini belum terdaftar di planner.',
  kodeSalah: 'kodenya salah atau sudah kedaluwarsa. kirim kode baru.',
  offline: 'nggak ada koneksi internet.',
  terlaluSering: 'tunggu sebentar sebelum minta kode lagi.'
}

export { getSaapaan, TEXT }
