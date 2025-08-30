import React from 'react'

export default function ShoppingList({ items, onInc, onDec, onRemove }) {
  return (
    <div className="stack card">
      <div className="title">Shopping List <span className="badge">{items.length}</span></div>
      <ul className="list">
        {items.map(i => (
          <li key={i.id} className="list-item">
            <span className="pill">{i.category}</span>
            <div>
              <div style={{fontWeight:600}}>{i.name}</div>
              <div className="muted">{new Date(i.addedAt).toLocaleString()}</div>
            </div>
            <div className="pill">Qty: {i.quantity}</div>
            <div style={{display:'flex', gap:8}}>
              <button onClick={()=>onInc(i.id)} aria-label={"Increase " + i.name}>＋</button>
              <button onClick={()=>onDec(i.id)} aria-label={"Decrease " + i.name}>－</button>
              <button onClick={()=>onRemove(i.id)} aria-label={"Remove " + i.name}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
      {items.length === 0 && <div className="muted">Your list is empty. Try saying <span className="kbd">add milk</span>.</div>}
    </div>
  )
}
