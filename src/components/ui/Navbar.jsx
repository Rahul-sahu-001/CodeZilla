import { Link, useLocation } from 'react-router-dom'
import { useWallet } from '../../context/WalletContext'
import { Zap, LayoutGrid, GitBranch, Cpu, PlusCircle, Wallet, ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { to: '/marketplace', label: 'Marketplace', icon: LayoutGrid },
  { to: '/workflow',    label: 'Workflow',    icon: GitBranch  },
  { to: '/my-applets', label: 'My Applets',  icon: Cpu        },
  { to: '/deploy',     label: 'Deploy',      icon: PlusCircle },
]

export default function Navbar() {
  const { address, balance, isConnected, isConnecting, connect, disconnect } = useWallet()
  const location = useLocation()
  const [walletOpen, setWalletOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const short = address ? `${address.slice(0, 6)}···${address.slice(-4)}` : null

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 200,
      background: scrolled
        ? 'rgba(6, 6, 15, 0.92)'
        : 'rgba(6, 6, 15, 0.7)',
      backdropFilter: 'blur(28px)',
      WebkitBackdropFilter: 'blur(28px)',
      borderBottom: `1px solid ${scrolled ? 'rgba(201,116,138,0.18)' : 'rgba(24,24,48,0.8)'}`,
      transition: 'all 0.4s ease',
      animation: 'navEntrance 0.7s cubic-bezier(0.16,1,0.3,1) both',
    }}>

      {/* Rose gold top line */}
      <div style={{
        height: '1.5px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(201,116,138,0.0) 10%, rgba(201,116,138,0.7) 30%, rgba(240,184,200,1) 50%, rgba(201,116,138,0.7) 70%, rgba(201,116,138,0.0) 90%, transparent 100%)',
        opacity: scrolled ? 1 : 0.5,
        transition: 'opacity 0.4s ease',
      }} />

      <div style={{
        maxWidth: 1380, margin: '0 auto',
        padding: '0 32px', height: 64,
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', gap: 24,
      }}>

        {/* ── LOGO ── */}
        <Link to="/" style={{
          textDecoration: 'none',
          display: 'flex', alignItems: 'center', gap: 12,
          flexShrink: 0,
        }}>
          {/* Logo icon with glow */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', inset: -4,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(201,116,138,0.4) 0%, transparent 70%)',
              animation: 'rosePulse 3s ease-in-out infinite',
            }} />
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, var(--rose-deep), var(--rose-gold), var(--rose-bright))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 20px rgba(201,116,138,0.4)',
              position: 'relative', zIndex: 1,
            }}>
              <Zap size={17} color="#fff" strokeWidth={2.5} />
            </div>
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700, fontSize: 20,
              letterSpacing: '0.06em',
              color: 'var(--text-primary)',
              lineHeight: 1,
              textTransform: 'uppercase',
            }}>
              WEIL
              <span style={{
                background: 'linear-gradient(135deg, var(--rose-gold), var(--rose-bright))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>MARKET</span>
            </div>
            <div style={{
              fontSize: 8, color: 'var(--text-muted)',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              fontFamily: 'var(--font-mono)', marginTop: 1,
            }}>
              On-Chain · WeilChain
            </div>
          </div>
        </Link>

        {/* ── NAV LINKS ── */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 2,
          background: 'rgba(10,10,24,0.5)',
          border: '1px solid var(--border-mid)',
          borderRadius: 12, padding: '4px',
          backdropFilter: 'blur(12px)',
        }}>
          {NAV_LINKS.map(({ to, label, icon: Icon }, i) => {
            const active = location.pathname === to
            return (
              <Link key={to} to={to} style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '8px 16px', borderRadius: 9,
                textDecoration: 'none', fontSize: 12,
                fontWeight: active ? 700 : 500,
                letterSpacing: active ? '0.05em' : '0.03em',
                textTransform: 'uppercase',
                transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                color: active ? '#fff' : 'var(--text-secondary)',
                background: active
                  ? 'linear-gradient(135deg, var(--rose-deep), var(--rose-gold))'
                  : 'transparent',
                boxShadow: active ? '0 2px 14px rgba(201,116,138,0.35)' : 'none',
                animationDelay: `${i * 80 + 300}ms`,
              }}
                onMouseEnter={e => {
                  if (!active) {
                    e.currentTarget.style.color = 'var(--rose)'
                    e.currentTarget.style.background = 'rgba(201,116,138,0.06)'
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    e.currentTarget.style.color = 'var(--text-secondary)'
                    e.currentTarget.style.background = 'transparent'
                  }
                }}
              >
                <Icon size={12} />
                {label}
              </Link>
            )
          })}
        </div>

        {/* ── WALLET ── */}
        {isConnected ? (
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <button
              onClick={() => setWalletOpen(!walletOpen)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 14px 8px 10px',
                background: 'rgba(10,10,24,0.7)',
                border: '1px solid var(--border-rose)',
                borderRadius: 10, cursor: 'pointer',
                transition: 'var(--transition)',
                animation: 'borderGlow 4s ease-in-out infinite',
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-rose-sm)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
              {/* Live indicator */}
              <div style={{ position: 'relative', width: 30, height: 30 }}>
                <div style={{
                  position: 'absolute', inset: 0, borderRadius: 8,
                  background: 'var(--rose-dim)',
                  border: '1px solid var(--border-rose)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{ position: 'relative', width: 8, height: 8 }}>
                    <div style={{
                      position: 'absolute', inset: 0, borderRadius: '50%',
                      background: 'var(--green)',
                      animation: 'glowPing 2s ease-out infinite',
                      opacity: 0.6,
                    }} />
                    <div style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: 'var(--green)',
                      boxShadow: '0 0 8px var(--green)',
                      position: 'relative', zIndex: 1,
                    }} />
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{
                  fontSize: 10, color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.05em',
                }}>
                  {short}
                </div>
                <div style={{
                  fontSize: 14, fontWeight: 700,
                  color: 'var(--rose-bright)',
                  letterSpacing: '-0.01em',
                }}>
                  {balance} <span style={{ fontSize: 10, color: 'var(--rose-gold)', fontWeight: 500 }}>WUSD</span>
                </div>
              </div>
              <ChevronDown
                size={12} color="var(--text-muted)"
                style={{
                  transform: walletOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.3s ease',
                }}
              />
            </button>

            {walletOpen && (
              <div
                className="animate-scaleIn"
                style={{
                  position: 'absolute', top: 'calc(100% + 10px)', right: 0,
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-rose)',
                  borderRadius: 12, padding: 6,
                  minWidth: 190,
                  boxShadow: 'var(--shadow-card), var(--shadow-rose)',
                  transformOrigin: 'top right',
                }}>
                <button
                  onClick={() => { disconnect(); setWalletOpen(false) }}
                  style={{
                    width: '100%', padding: '10px 14px',
                    background: 'transparent', border: 'none',
                    borderRadius: 7, color: 'var(--red)',
                    fontSize: 12, cursor: 'pointer', textAlign: 'left',
                    fontFamily: 'var(--font-body)', letterSpacing: '0.05em',
                    textTransform: 'uppercase', fontWeight: 600,
                    transition: 'var(--transition)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--red-dim)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  Disconnect Wallet
                </button>
              </div>
            )}
          </div>
        ) : (
          <button onClick={connect} disabled={isConnecting} className="btn-rose" style={{ flexShrink: 0 }}>
            <Wallet size={13} />
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </button>
        )}

      </div>
    </nav>
  )
}
