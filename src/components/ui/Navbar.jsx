import { Link, useLocation } from 'react-router-dom'
import { useWallet } from '../../context/WalletContext'
import { useTheme } from '../../context/ThemeContext'
import { Zap, LayoutGrid, GitBranch, Cpu, PlusCircle, Wallet, Sun, Moon, ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { to: '/marketplace', label: 'Marketplace', icon: LayoutGrid },
  { to: '/workflow',    label: 'Workflow',    icon: GitBranch  },
  { to: '/my-applets', label: 'My Applets',  icon: Cpu        },
  { to: '/deploy',     label: 'Deploy',      icon: PlusCircle },
]

export default function Navbar() {
  const { address, balance, isConnected, isConnecting, connect, disconnect } = useWallet()
  const { theme, toggle, isDark } = useTheme()
  const location = useLocation()
  const [walletOpen, setWalletOpen] = useState(false)
  const [scrolled, setScrolled]     = useState(false)
  const [toggling, setToggling]     = useState(false)
  const short = address ? `${address.slice(0,6)}···${address.slice(-4)}` : null

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const handleThemeToggle = () => {
    setToggling(true)
    toggle()
    setTimeout(() => setToggling(false), 500)
  }

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 200,
      background: scrolled
        ? isDark ? 'rgba(7,7,15,0.94)' : 'rgba(253,248,251,0.94)'
        : isDark ? 'rgba(7,7,15,0.75)' : 'rgba(253,248,251,0.75)',
      backdropFilter: 'blur(28px)',
      WebkitBackdropFilter: 'blur(28px)',
      borderBottom: `1px solid ${scrolled ? 'var(--border-rose)' : 'var(--border)'}`,
      transition: 'all 0.4s ease',
      animation: 'navEntrance 0.65s cubic-bezier(0.16,1,0.3,1) both',
    }}>

      {/* Rose top line */}
      <div style={{
        height: '1.5px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(201,116,138,0) 10%, var(--rose-gold) 40%, var(--rose-bright) 50%, var(--rose-gold) 60%, rgba(201,116,138,0) 90%, transparent 100%)',
        opacity: scrolled ? 1 : 0.55,
        transition: 'opacity 0.4s ease',
      }} />

      <div style={{
        maxWidth: 1400, margin: '0 auto',
        padding: '0 32px', height: 62,
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', gap: 20,
      }}>

        {/* ── LOGO ── */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 11, flexShrink: 0 }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', inset: -5, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(201,116,138,0.35) 0%, transparent 70%)',
              animation: 'rosePulse 3s ease-in-out infinite',
            }} />
            <div style={{
              width: 34, height: 34, borderRadius: 9,
              background: 'linear-gradient(135deg, var(--rose-deep), var(--rose-gold), var(--rose-bright))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', zIndex: 1,
              boxShadow: '0 0 18px rgba(201,116,138,0.38)',
            }}>
              <Zap size={16} color="#fff" strokeWidth={2.5} />
            </div>
          </div>
          <div>
            <div style={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: 900, fontSize: 18,
              letterSpacing: '0.04em', textTransform: 'uppercase',
              color: 'var(--text-primary)', lineHeight: 1,
            }}>
              Weil<span style={{
                background: 'linear-gradient(135deg, var(--rose-gold), var(--rose-bright))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>Market</span>
            </div>
            <div style={{
              fontSize: 8, color: 'var(--text-muted)',
              letterSpacing: '0.16em', textTransform: 'uppercase',
              fontFamily: 'JetBrains Mono, monospace', marginTop: 1,
            }}>Web4 · WeilChain</div>
          </div>
        </Link>

        {/* ── NAV LINKS ── */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 2,
          background: isDark ? 'rgba(12,12,26,0.5)' : 'rgba(240,232,244,0.6)',
          border: '1px solid var(--border-mid)',
          borderRadius: 12, padding: '4px',
        }}>
          {NAV_LINKS.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to
            return (
              <Link key={to} to={to} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '7px 15px', borderRadius: 9,
                textDecoration: 'none', fontSize: 11,
                fontWeight: active ? 700 : 500,
                letterSpacing: '0.07em', textTransform: 'uppercase',
                fontFamily: 'Raleway, sans-serif',
                transition: 'all 0.28s cubic-bezier(0.16,1,0.3,1)',
                color: active ? '#fff' : 'var(--text-secondary)',
                background: active ? 'linear-gradient(135deg, var(--rose-deep), var(--rose-gold))' : 'transparent',
                boxShadow: active ? '0 2px 12px rgba(201,116,138,0.32)' : 'none',
              }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.color = 'var(--rose)'; e.currentTarget.style.background = 'var(--rose-dim)' }}}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent' }}}
              >
                <Icon size={12} />{label}
              </Link>
            )
          })}
        </div>

        {/* ── RIGHT SIDE: THEME TOGGLE + WALLET ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>

          {/* ★ THEME TOGGLE BUTTON ★ */}
          <button
            onClick={handleThemeToggle}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            style={{
              width: 42, height: 42,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: isDark ? 'rgba(212,168,83,0.1)' : 'rgba(176,48,96,0.08)',
              border: `1px solid ${isDark ? 'rgba(212,168,83,0.3)' : 'rgba(176,48,96,0.25)'}`,
              borderRadius: 10, cursor: 'pointer',
              transition: 'all 0.3s ease',
              animation: toggling ? 'themeToggle 0.5s ease' : 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.08)'
              e.currentTarget.style.boxShadow = isDark
                ? '0 0 16px rgba(212,168,83,0.3)'
                : '0 0 16px rgba(176,48,96,0.2)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {isDark
              ? <Sun  size={17} color="var(--gold-bright)" />
              : <Moon size={17} color="var(--rose-gold)" />
            }
          </button>

          {/* WALLET */}
          {isConnected ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setWalletOpen(!walletOpen)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 9,
                  padding: '7px 13px 7px 9px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-rose)',
                  borderRadius: 10, cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  animation: 'borderGlow 4s ease-in-out infinite',
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-rose)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              >
                <div style={{ position: 'relative', width: 28, height: 28 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 7,
                    background: 'var(--rose-dim)',
                    border: '1px solid var(--border-rose)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <div style={{ position: 'relative', width: 8, height: 8 }}>
                      <div style={{
                        position: 'absolute', inset: 0, borderRadius: '50%',
                        background: 'var(--green)',
                        animation: 'glowPing 2s ease-out infinite', opacity: 0.5,
                      }} />
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px var(--green)', position: 'relative', zIndex: 1 }} />
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>{short}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--rose-bright)' }}>{balance} <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 400 }}>WUSD</span></div>
                </div>
                <ChevronDown size={12} color="var(--text-muted)" style={{ transform: walletOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }} />
              </button>

              {walletOpen && (
                <div className="animate-scaleIn" style={{
                  position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                  background: 'var(--bg-card)', border: '1px solid var(--border-rose)',
                  borderRadius: 12, padding: 6, minWidth: 188,
                  boxShadow: 'var(--shadow-card)', transformOrigin: 'top right',
                }}>
                  <button
                    onClick={() => { disconnect(); setWalletOpen(false) }}
                    style={{
                      width: '100%', padding: '10px 14px', background: 'transparent',
                      border: 'none', borderRadius: 7, color: 'var(--red)',
                      fontSize: 11, cursor: 'pointer', textAlign: 'left',
                      fontFamily: 'Raleway, sans-serif', letterSpacing: '0.06em',
                      textTransform: 'uppercase', fontWeight: 600, transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--red-dim)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >Disconnect Wallet</button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={connect} disabled={isConnecting} className="btn-rose">
              <Wallet size={13} />
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
          )}
        </div>

      </div>
    </nav>
  )
}
