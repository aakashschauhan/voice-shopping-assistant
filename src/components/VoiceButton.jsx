import React, { useEffect, useRef, useState } from 'react'

const getSpeechRecognition = () => {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition
  return SR ? new SR() : null
}

export default function VoiceButton({ onResult, lang }) {
  const recRef = useRef(null)
  const [listening, setListening] = useState(false)
  const [supported, setSupported] = useState(true)
  const [status, setStatus] = useState('')

  useEffect(() => {
    const rec = getSpeechRecognition()
    if (!rec) { setSupported(false); return }
    recRef.current = rec
    rec.continuous = false
    rec.interimResults = false
    rec.lang = lang
    rec.onstart = () => { setListening(true); setStatus('Listening...') }
    rec.onend = () => { setListening(false); setStatus('') }
    rec.onerror = (e) => { setListening(false); setStatus('Mic error: ' + e.error) }
    rec.onresult = (e) => {
      const text = Array.from(e.results).map(r => r[0].transcript).join(' ')
      onResult(text)
    }
  }, [lang, onResult])

  const start = () => {
    if (!recRef.current) return
    try { recRef.current.lang = lang; recRef.current.start() } catch {}
  }

  return (
    <div className="stack">
      <button onClick={start} disabled={!supported} aria-label="Speak a command">
        {supported ? (listening ? 'Listening...' : '🎙️ Start Voice Command') : 'Voice not supported'}
      </button>
      <div className="status">{status}</div>
    </div>
  )
}
