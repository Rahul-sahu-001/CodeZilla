import { Link, useLocation } from 'react-router-dom'
import { useWallet } from '../../context/WalletContext'
import { Zap, LayoutGrid, GitBranch, Cpu, PlusCircle, Wallet } from 'lucide-react'

const NAV_LINKS = [
  { to: '/marketplace', label: 'Marketplace', icon: LayoutGrid },
  { to: '/workflow',    label: 'Workflow',    icon: GitBranch  },
  { to: '/my-applets', label: 'My Applets',  icon: Cpu        },
  { to: '/deploy',     label: 'Deploy',      icon: PlusCircle },
]

export default function Navbar() {
  const { address, balance, isConnected, isConnecting, connect, disconnect } = useWallet()
  const location = useLocation()
  const short = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : null

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(10,10,15,0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
      padding: '0 24px',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', height: 60,
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', gap: 24,
      }}>

        {/* Logo */}
        <Link to="/" style={{
          textDecoration: 'none',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, var(--accent), var(--cyan))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Zap size={18} color="#fff" />
          </div>
          <span style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 18, color: 'var(--text-primary)',
          }}>
            WEIL<span style={{ color: 'var(--accent-bright)' }}>MARKET</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {NAV_LINKS.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to
            return (
              <Link key={to} to={to} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '6px 14px', borderRadius: 'var(--radius)',
                textDecoration: 'none', fontSize: 13,
                transition: 'var(--transition)',
                color: active ? 'var(--accent-bright)' : 'var(--text-secondary)',
                background: active ? 'var(--accent-glow)' : 'transparent',
                border: `1px solid ${active ? 'var(--accent)' : 'transparent'}`,
              }}>
                <Icon size={14} />{label}
              </Link>
            )
          })}
        </div>

        {/* Wallet */}
        {isConnected ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              padding: '4px 12px', borderRadius: 20, fontSize: 12,
              background: 'var(--green-dim)', color: 'var(--green)',
              border: '1px solid rgba(0,255,157,0.3)',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: 'var(--green)', display: 'inline-block',
              }} />
              {balance} WUSD
            </span>
            <button onClick={disconnect} style={{
              padding: '6px 12px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              color: 'var(--text-secondary)',
              fontSize: 12, cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
            }}>
              {short}
            </button>
          </div>
        ) : (
          <button onClick={connect} disabled={isConnecting} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 18px',
            background: 'linear-gradient(135deg, var(--accent), #5e35b1)',
            border: 'none', borderRadius: 'var(--radius)',
            color: '#fff', fontSize: 13, fontWeight: 700,
            cursor: isConnecting ? 'wait' : 'pointer',
            fontFamily: 'var(--font-mono)',
          }}>
            <Wallet size={14} />
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </button>
        )}

      </div>
    </nav>
  )
}