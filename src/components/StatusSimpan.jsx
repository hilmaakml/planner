import React from 'react'
import './StatusSimpan.css'

export default function StatusSimpan({ status }) {
  return (
    <footer className="status-simpan" aria-live="polite">
      {status}
    </footer>
  )
}
