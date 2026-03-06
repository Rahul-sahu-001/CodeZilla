import { Star, Zap, Shield, ExternalLink, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useWallet } from '../../context/WalletContext'

const CATEGORY_COLORS = {
  'AI/ML':      'var(--accent-bright)',
  'Security':   'var(--red)',
  'Oracle':     'var(--yellow)',
  'DeFi':       'var(--green)',
  'NFT':        'var(--cyan)',
  'Governance': '#ff9a3c',
  'Automation': '#7eb3ff',
}

export default function AppletCard({ applet, onInvoke, style }) {
  const { isConnected } = useWallet()
  const catColor = CATEGORY_COLORS[applet.category] || 'var(--accent-bright)'

  const emoji =
    applet.category === 'AI/ML'      ? '🤖' :
    applet.category === 'Security'   ? '🛡️' :
    applet.category === 'Oracle'     ? '🔮' :
    applet.category === 'DeFi'       ? '💰' :
    applet.category === 'NFT'        ? '🎨' :
    applet.category === 'Governance' ? '🏛️' : '⚙️'

  return (
    <div
      className="animate-fadeInUp"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: 20,
        display: 'flex', flexDirection: 'column', gap: 14,
        transition: 'var(--transition)',
        ...style,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = catColor + '66'
        e.currentTarget.style.background = 'var(--bg-card-hover)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.background = 'var(--bg-card)'
      }}
    >

      {/* Top Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: catColor + '20',
            border: `1px solid ${catColor}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18,
          }}>
            {emoji}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700, fontSize: 15,
              }}>
                {applet.name}
              </span>
              {applet.verified && (
                <Shield size={12} color="var(--cyan)" title="Verified" />
              )}
            </div>
            <span style={{ fontSize: 11, color: catColor, fontWeight: 600 }}>
              {applet.category}
            </span>
          </div>
        </div>

        {/* Price */}
        <div style={{
          padding: '4px 10px',
          background: 'var(--green-dim)',
          border: '1px solid rgba(0,255,157,0.2)',
          borderRadius: 8, textAlign: 'right',
        }}>
          <div style={{
            fontSize: 15, fontWeight: 700,
            color: 'var(--green)',
            fontFamily: 'var(--font-display)',
          }}>
            {applet.price}
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>
            {applet.currency}
          </div>
        </div>
      </div>

      {/* Description */}
      <p style={{
        fontSize: 13, color: 'var(--text-secondary)',
        lineHeight: 1.6, flexGrow: 1,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {applet.description}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {applet.tags?.slice(0, 3).map(tag => (
          <span key={tag} style={{
            padding: '2px 8px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: 4, fontSize: 11,
            color: 'var(--text-muted)',
          }}>
            #{tag}
          </span>
        ))}
      </div>

      {/* Stats + Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 14, fontSize: 12, color: 'var(--text-muted)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Star size={11} fill="var(--yellow)" color="var(--yellow)" />
            {applet.rating} ({applet.reviews})
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Zap size={11} color="var(--accent-bright)" />
            {applet.executions?.toLocaleString()} runs
          </span>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <Link to={`/applet/${applet._id}`} style={{
            padding: 6, borderRadius: 6,
            background: 'transparent',
            border: '1px solid var(--border)',
            color: 'var(--text-secondary)',
            display: 'flex', alignItems: 'center',
            cursor: 'pointer', transition: 'var(--transition)',
            textDecoration: 'none',
          }}>
            <ExternalLink size={13} />
          </Link>
          <button onClick={onInvoke} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '6px 14px', borderRadius: 6,
            background: isConnected
              ? 'linear-gradient(135deg, var(--accent), #5e35b1)'
              : 'var(--bg-secondary)',
            border: `1px solid ${isConnected ? 'var(--accent)' : 'var(--border)'}`,
            color: isConnected ? '#fff' : 'var(--text-muted)',
            fontSize: 12, fontWeight: 700,
            cursor: isConnected ? 'pointer' : 'not-allowed',
            fontFamily: 'var(--font-mono)',
            transition: 'var(--transition)',
          }}>
            <Play size={11} fill="currentColor" />
            Invoke
          </button>
        </div>
      </div>

    </div>
  )
}