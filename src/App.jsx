import React, { useCallback, useEffect, useMemo, useState } from 'react'
import VoiceButton from './components/VoiceButton.jsx'
import ShoppingList from './components/ShoppingList.jsx'
import SearchPanel from './components/SearchPanel.jsx'
import Suggestions from './components/Suggestions.jsx'
import { parseCommand } from './lib/nlp.js'
import { categorize } from './lib/categorize.js'

const LS_KEY = 'vsa-history-v1'

function loadHistory() {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '{}') } catch { return {} }
}
function saveHistory(h) {
  localStorage.setItem(LS_KEY, JSON.stringify(h))
}

export default function App() {
  const [items, setItems] = useState([])
  const [recognized, setRecognized] = useState('')
  const [criteria, setCriteria] = useState(null)
  const [lang, setLang] = useState('en-US') // 'hi-IN' and 'es-ES' also supported
  const [lastItem, setLastItem] = useState(null)
  const [history, setHistory] = useState(loadHistory())

  useEffect(() => { saveHistory(history) }, [history])

  const addItem = useCallback((name, quantity=1) => {
    if (!name) return
    const cat = categorize(name)
    const id = Math.random().toString(36).slice(2)
    const addedAt = Date.now()
    setItems(prev => [...prev, {id, name, quantity, category: cat, addedAt}])
    setLastItem(name)
    const key = name.toLowerCase()
    setHistory(h => ({...h, [key]: { count: (h[key]?.count||0)+1, last: addedAt }}))
  }, [])

  const removeItem = useCallback((nameOrId) => {
    setItems(prev => prev.filter(i => i.id !== nameOrId && i.name.toLowerCase() !== nameOrId.toLowerCase()))
  }, [])

  const inc = (id) => setItems(prev => prev.map(i => i.id===id ? {...i, quantity: i.quantity+1} : i))
  const dec = (id) => setItems(prev => prev.map(i => i.id===id ? {...i, quantity: Math.max(1, i.quantity-1)} : i))

  const handleVoice = useCallback((text) => {
    setRecognized(text)
    const cmd = parseCommand(text)
    switch(cmd.intent) {
      case 'add_item':
        addItem(cmd.item, cmd.quantity || 1)
        setCriteria(null)
        break
      case 'remove_item':
        if (cmd.item) removeItem(cmd.item)
        break
      case 'set_quantity':
        if (cmd.item && cmd.quantity) {
          setItems(prev => prev.map(i => i.name.toLowerCase().includes(cmd.item.toLowerCase()) ? {...i, quantity: cmd.quantity} : i))
        }
        break
      case 'search_item':
        setCriteria({ query: cmd.query || '', under: cmd.under || '', brand: cmd.brand || '', organic: !!cmd.organic })
        break
      case 'clear_list':
        setItems([])
        break
      default:
        // no-op
        break
    }
  }, [addItem, removeItem])

  const month = useMemo(() => new Date().getMonth()+1, [])

  return (
    <div className="app stack">
      <div className="card stack">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:12, flexWrap:'wrap'}}>
          <div>
            <div className="title">🛒 Voice Shopping Assistant</div>
            <p className="subtitle">Say things like <span className="kbd">add 2 bottles of water</span>, <span className="kbd">remove milk</span>, <span className="kbd">find organic apples under 200</span>, <span className="kbd">clear list</span></p>
          </div>
          <div style={{display:'flex', gap:8, alignItems:'center'}}>
            <label className="muted">Language</label>
            <select value={lang} onChange={(e)=>setLang(e.target.value)}>
              <option value="en-US">English (US)</option>
              <option value="hi-IN">Hindi (India)</option>
              <option value="es-ES">Spanish (Spain)</option>
            </select>
            <VoiceButton onResult={handleVoice} lang={lang} />
          </div>
        </div>
        <div className="muted">Heard: “{recognized}”</div>
      </div>

      <div className="row">
        <ShoppingList items={items} onInc={inc} onDec={dec} onRemove={(id)=>removeItem(id)} />
        <div className="stack">
          {criteria && <SearchPanel criteria={criteria} onAdd={(name)=>addItem(name, 1)} />}
          <Suggestions history={history} month={month} lastItem={lastItem} onAdd={(name)=>addItem(name,1)} />
          <div className="card stack">
            <div className="title">Quick Add</div>
            <div className="grid grid-3">
              {['milk','bread','eggs','apples','toothpaste','rice'].map(n=> <button key={n} onClick={()=>addItem(n)}>{n}</button>)}
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        Built with Web Speech API • Works best on Chromium-based browsers with microphone access.
      </div>
    </div>
  )
}
