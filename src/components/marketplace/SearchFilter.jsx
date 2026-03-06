import { Search, SlidersHorizontal } from 'lucide-react'

export default function SearchFilter({ value, onChange, sort, onSortChange }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>

      {/* Search Input */}
      <div style={{ position: 'relative', flex: 1, minWidth: 240 }}>
        <Search size={14} style={{
          position: 'absolute', left: 12, top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--text-muted)',
        }} />
        <input
          type="text"
          placeholder="Search applets..."
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 14px 10px 36px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            color: 'var(--text-primary)',
            fontSize: 13,
            fontFamily: 'var(--font-mono)',
            outline: 'none',
            transition: 'var(--transition)',
          }}
          onFocus={e => e.target.style.borderColor = 'var(--accent)'}
          onBlur={e  => e.target.style.borderColor = 'var(--border)'}
        />
      </div>

      {/* Sort Dropdown */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <SlidersHorizontal size={14} color="var(--text-muted)" />
        <select
          value={sort}
          onChange={e => onSortChange(e.target.value)}
          style={{
            padding: '10px 14px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            color: 'var(--text-primary)',
            fontSize: 13,
            fontFamily: 'var(--font-mono)',
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <option value="newest">Newest</option>
          <option value="popular">Most Popular</option>
          <option value="rating">Top Rated</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>

    </div>
  )
}