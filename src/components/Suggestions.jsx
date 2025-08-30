import React, { useMemo } from 'react'
import SEASONAL from '../lib/data/seasonal.json'
import SUBS from '../lib/data/substitutes.json'

function uniq(arr) { return Array.from(new Set(arr)) }

export default function Suggestions({ history, month, lastItem, onAdd }) {
  const frequent = useMemo(() => {
    // top items by count from history
    const entries = Object.entries(history || {}).sort((a,b)=> (b[1].count||0)-(a[1].count||0)).slice(0,5)
    return entries.map(([name]) => name)
  }, [history])

  const seasonal = SEASONAL[String(month)] || []
  const substitutes = lastItem ? (SUBS[lastItem.toLowerCase()] || []) : []

  const all = uniq([ ...frequent, ...seasonal, ...substitutes ]).slice(0, 9)

  return (
    <div className="card stack">
      <div className="title">Smart Suggestions</div>
      <div className="subtitle">Frequent • Seasonal • Substitutes</div>
      <div className="grid grid-3">
        {all.map(s => (
          <button key={s} onClick={()=>onAdd(s)}>{s}</button>
        ))}
      </div>
      {all.length === 0 && <div className="muted">No suggestions yet. Add a few items to build history.</div>}
    </div>
  )
}
