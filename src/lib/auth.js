// Mock auth (tahap 1): tanpa Supabase, simpan sesi di memori
// Tahap 2: implementasi signInWithOtp + verifyOtp dengan Supabase

let mockSession = null

export function dengarSesi(callback) {
  const handle = setInterval(() => {
    callback(mockSession)
  }, 500)
  return () => clearInterval(handle)
}

export function cekSesi() {
  return mockSession
}

export function mockLogin() {
  mockSession = {
    user: {
      id: 'mock-user-id',
      email: 'user@example.com'
    }
  }
  return { ok: true }
}

export function keluar() {
  mockSession = null
  return { ok: true }
}

export function kirimKode(email) {
  if (!email || !email.includes('@')) {
    return { ok: false, pesan: TEXT.emailBelumTerdaftar }
  }
  if (email !== 'user@example.com') {
    return { ok: false, pesan: TEXT.emailBelumTerdaftar }
  }
  return { ok: true }
}

export function masuk(email, kode) {
  if (!mockSession) {
    return { ok: false, pesan: TEXT.kodeSalah }
  }
  if (email !== 'user@example.com' || kode.length !== 6) {
    return { ok: false, pesan: TEXT.kodeSalah }
  }
  return { ok: true }
}
