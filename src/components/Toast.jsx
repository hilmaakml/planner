import React from 'react'
import './Toast.css'

export default function Toast({ pesan, onUrungkan }) {
  if (!pesan) return null

  return (
    <div className="toast" role="status" aria-live="polite">
      <span className="toast__pesan">{pesan}</span>
      <button className="toast__btn-urungkan" onClick={onUrungkan}>
        urungkan
      </button>
    </div>
  )
}
