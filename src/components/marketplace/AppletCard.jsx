import { Star, Zap, Shield, ExternalLink, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useWallet } from '../../context/WalletContext'

const CATEGORY_CONFIG = {
  'AI/ML':      { color: '#c9748a', glow: 'rgba(201,116,138,0.25)', bg: 'rgba(201,116,138,0.08)', symbol: '◆' },
  'Security':   { color: '#ff7096', glow: 'rgba(255,112,150,0.25)', bg: 'rgba(255,112,150,0.08)', symbol: '◈' },
  'Oracle':     { color: '#d4a853', glow: 'rgba(212,168,83,0.25)',  bg: 'rgba(212,168,83,0.08)',  symbol: '◉' },
  'DeFi':       { color: '#00e5a0', glow: 'rgba(0,229,160,0.2)',    bg: 'rgba(0,229,160,0.07)',   symbol: '◎' },
  'NFT':        { color: '#4ecdc4', glow: 'rgba(78,205,196,0.2)',   bg: 'rgba(78,205,196,0.07)',  symbol: '◐' },
  'Governance': { color: '#f0b8c8', glow: 'rgba(240,184,200,0.2)', bg: 'rgba(240,184,200,0.07)', symbol: '◑' },
  'Automation': { color: '#9d8fef', glow: 'rgba(157,143,239,0.2)', bg: 'rgba(157,143,239,0.07)', symbol: '◇' },
}

export default function AppletCard({ applet, onInvoke, style }) {
  const { isConnected } = useWallet()
  const cfg = CATEGORY_CONFIG[applet.category] || CATEGORY_CONFIG['AI/ML']

  return (
    <div
      className="animate-fadeInUp"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-mid)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        display: 'flex', flexDirection: 'column', gap: 18,
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
        position: 'relative', overflow: 'hidden',
        ...style,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = cfg.color + '60'
        e.currentTarget.style.background = 'var(--bg-card-hover)'
        e.currentTarget.style.transform = 'translateY(-6px) scale(1.01)'
        e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${cfg.glow}`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border-mid)'
        e.currentTarget.style.background = 'var(--bg-card)'
        e.currentTarget.style.transform = 'translateY(0) scale(1)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Category top glow bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: `linear-gradient(90deg, transparent, ${cfg.color}, transparent)`,
        opacity: 0.7,
      }} />

      {/* Corner radial glow */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: 100, height: 100,
        background: `radial-gradient(circle at 100% 0%, ${cfg.color}18 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* ── HEADER ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12, flexShrink: 0,
            background: cfg.bg,
            border: `1px solid ${cfg.color}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, color: cfg.color, fontFamily: 'var(--font-display)',
            transition: 'all 0.3s ease',
          }}>
            {cfg.symbol}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700, fontSize: 17, fontStyle: 'italic',
                color: 'var(--text-primary)', letterSpacing: '0.01em',
              }}>
                {applet.name}
              </span>
              {applet.verified && (
                <Shield size={11} color="var(--teal)" title="Verified" />
              )}
            </div>
            <span style={{
              fontSize: 10, color: cfg.color,
              fontWeight: 600, letterSpacing: '0.1em',
              textTransform: 'uppercase', fontFamily: 'var(--font-mono)',
            }}>
              {applet.category}
            </span>
          </div>
        </div>

        {/* Price */}
        <div style={{
          background: 'rgba(0,229,160,0.07)',
          border: '1px solid rgba(0,229,160,0.18)',
          borderRadius: 10, padding: '7px 11px',
          textAlign: 'right', flexShrink: 0,
        }}>
          <div style={{
            fontSize: 16, fontWeight: 700, color: 'var(--green)',
            fontFamily: 'var(--font-display)', letterSpacing: '-0.01em', lineHeight: 1,
          }}>
            {applet.price}
          </div>
          <div style={{
            fontSize: 10, color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)', marginTop: 3,
          }}>
            {applet.currency}
          </div>
        </div>
      </div>

      {/* ── DESCRIPTION ── */}
      <p style={{
        fontSize: 13, color: 'var(--text-secondary)',
        lineHeight: 1.7, flexGrow: 1,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {applet.description}
      </p>

      {/* ── TAGS ── */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {applet.tags?.slice(0, 3).map(tag => (
          <span key={tag} style={{
            padding: '3px 10px',
            background: 'rgba(22,22,40,0.8)',
            border: '1px solid var(--border-mid)',
            borderRadius: 5, fontSize: 10,
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)', letterSpacing: '0.04em',
            transition: 'var(--transition)',
          }}>
            #{tag}
          </span>
        ))}
      </div>

      {/* ── DIVIDER ── */}
      <div style={{ height: '1px', background: 'var(--border)' }} />

      {/* ── FOOTER ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 14, fontSize: 12, color: 'var(--text-muted)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Star size={11} fill="var(--rose-gold)" color="var(--rose-gold)" />
            <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{applet.rating}</span>
            <span style={{ fontSize: 11 }}>({applet.reviews})</span>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Zap size={11} color="var(--rose-gold)" />
            {applet.executions?.toLocaleString()}
          </span>
        </div>

        <div style={{ display: 'flex', gap: 7 }}>
          <Link to={`/applet/${applet._id}`} style={{
            width: 32, height: 32, borderRadius: 7,
            background: 'transparent',
            border: '1px solid var(--border-mid)',
            color: 'var(--text-muted)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.25s ease',
            textDecoration: 'none',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--border-rose)'
              e.currentTarget.style.color = 'var(--rose)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-mid)'
              e.currentTarget.style.color = 'var(--text-muted)'
            }}
          >
            <ExternalLink size={13} />
          </Link>

          <button
            onClick={onInvoke}
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '7px 16px', borderRadius: 7, border: 'none',
              background: isConnected
                ? 'linear-gradient(135deg, var(--rose-deep), var(--rose-gold), var(--rose-bright))'
                : 'rgba(26,26,48,0.5)',
              color: isConnected ? '#fff' : 'var(--text-muted)',
              fontSize: 11, fontWeight: 700,
              cursor: isConnected ? 'pointer' : 'not-allowed',
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.07em', textTransform: 'uppercase',
              transition: 'all 0.3s ease',
              boxShadow: isConnected ? '0 3px 14px rgba(201,116,138,0.25)' : 'none',
              position: 'relative', overflow: 'hidden',
            }}
            onMouseEnter={e => {
              if (isConnected) {
                e.currentTarget.style.boxShadow = '0 5px 24px rgba(201,116,138,0.45)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }
            }}
            onMouseLeave={e => {
              if (isConnected) {
                e.currentTarget.style.boxShadow = '0 3px 14px rgba(201,116,138,0.25)'
                e.currentTarget.style.transform = 'translateY(0)'
              }
            }}
          >
            <Play size={10} fill="currentColor" />
            Invoke
          </button>
        </div>
      </div>
    </div>
  )
}
