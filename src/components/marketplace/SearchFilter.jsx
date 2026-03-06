import { Search, SlidersHorizontal } from 'lucide-react'

export default function SearchFilter({ value, onChange, sort, onSortChange }) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>

      {/* Search */}
      <div style={{ position: 'relative', flex: 1, minWidth: 280 }}>
        <Search size={14} style={{
          position: 'absolute', left: 14, top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--text-muted)', pointerEvents: 'none',
          transition: 'color 0.2s ease',
        }} />
        <input
          type="text"
          placeholder="Search applets by name or category..."
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px 12px 40px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-mid)',
            borderRadius: 'var(--radius)',
            color: 'var(--text-primary)',
            fontSize: 13,
            fontFamily: 'var(--font-body)',
            outline: 'none',
            transition: 'all 0.3s ease',
            letterSpacing: '0.01em',
          }}
          onFocus={e => {
            e.target.style.borderColor = 'var(--rose-gold)'
            e.target.style.boxShadow = '0 0 0 3px rgba(201,116,138,0.1), 0 0 20px rgba(201,116,138,0.08)'
            e.target.style.background = 'var(--bg-card-hover)'
          }}
          onBlur={e => {
            e.target.style.borderColor = 'var(--border-mid)'
            e.target.style.boxShadow = 'none'
            e.target.style.background = 'var(--bg-card)'
          }}
        />
      </div>

      {/* Sort */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <SlidersHorizontal size={14} color="var(--text-muted)" />
        <select
          value={sort}
          onChange={e => onSortChange(e.target.value)}
          style={{
            padding: '12px 16px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-mid)',
            borderRadius: 'var(--radius)',
            color: 'var(--text-secondary)',
            fontSize: 13,
            fontFamily: 'var(--font-body)',
            cursor: 'pointer',
            outline: 'none',
            transition: 'all 0.3s ease',
          }}
          onFocus={e => {
            e.target.style.borderColor = 'var(--rose-gold)'
            e.target.style.boxShadow = '0 0 0 3px rgba(201,116,138,0.1)'
          }}
          onBlur={e => {
            e.target.style.borderColor = 'var(--border-mid)'
            e.target.style.boxShadow = 'none'
          }}
        >
          <option value="newest">Newest First</option>
          <option value="popular">Most Popular</option>
          <option value="rating">Top Rated</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
        </select>
      </div>

    </div>
  )
}
