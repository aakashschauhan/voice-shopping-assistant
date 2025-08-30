import React, { useMemo, useState } from 'react'
import PRODUCTS from '../lib/data/products.json'

export default function SearchPanel({ criteria, onAdd }) {
  const [query, setQuery] = useState(criteria?.query || '')
  const [maxPrice, setMaxPrice] = useState(criteria?.under || '')
  const [brand, setBrand] = useState(criteria?.brand || '')
  const [organic, setOrganic] = useState(criteria?.organic || false)

  const results = useMemo(() => {
    const q = query.toLowerCase().trim()
    return PRODUCTS.filter(p => {
      const matchesQ = !q || (p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
      const matchesBrand = !brand || p.brand.toLowerCase().includes(brand.toLowerCase())
      const matchesPrice = !maxPrice || p.price <= Number(maxPrice)
      const matchesOrganic = !organic || p.organic
      return matchesQ && matchesBrand && matchesPrice && matchesOrganic
    })
  }, [query, maxPrice, brand, organic])

  return (
    <div className="card stack">
      <div className="title">Voice Search Results</div>
      <div className="grid grid-3">
        <input placeholder="Query" value={query} onChange={(e)=>setQuery(e.target.value)} />
        <input placeholder="Max price (₹)" type="number" value={maxPrice} onChange={(e)=>setMaxPrice(e.target.value)} />
        <input placeholder="Brand" value={brand} onChange={(e)=>setBrand(e.target.value)} />
        <label><input type="checkbox" checked={organic} onChange={(e)=>setOrganic(e.target.checked)} /> Organic</label>
      </div>
      <ul className="list">
        {results.map(r => (
          <li key={r.id} className="list-item">
            <span className="pill">{r.category}</span>
            <div>
              <div style={{fontWeight:600}}>{r.name} • {r.brand}</div>
              <div className="muted">{r.size}</div>
            </div>
            <div className="pill">₹ {r.price}</div>
            <button onClick={()=>onAdd(r.name)}>Add</button>
          </li>
        ))}
      </ul>
      {results.length === 0 && <div className="muted">No matches. Try a different query.</div>}
    </div>
  )
}
