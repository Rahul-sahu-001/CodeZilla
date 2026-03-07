import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import {
  LayoutGrid, Zap, Shield, GitBranch, ArrowRight,
  Activity, Box, Users, TrendingUp, ArrowUpRight,
  Star, Play, ChevronRight, Terminal
} from 'lucide-react'
import { useEffect, useState } from 'react'

/* ── DATA ── */
const STATS = [
  { label: 'Applets',    value: '1,284', sub: '+12 this week',  icon: Box,        color: '#d4a853' },
  { label: 'Executions', value: '48.3K', sub: 'all time',       icon: Activity,   color: '#4ecdc4' },
  { label: 'Builders',   value: '732',   sub: 'active now',     icon: Users,      color: '#f0c87a' },
  { label: 'Volume',     value: '$2.1M', sub: 'WUSD total',     icon: TrendingUp, color: '#00e5a0' },
]

const FEATURED = [
  { name: 'AI Data Analyzer',       cat: 'AI/ML',    price: '5.00',  rating: 4.8, runs: '3.8K', color: '#d4a853' },
  { name: 'Contract Auditor',       cat: 'Security', price: '12.50', rating: 4.9, runs: '1.2K', color: '#ff7096' },
  { name: 'Price Oracle Feed',      cat: 'Oracle',   price: '0.50',  rating: 4.7, runs: '28K',  color: '#f0c87a' },
  { name: 'WUSD Payment Router',    cat: 'DeFi',     price: '1.00',  rating: 4.6, runs: '9.1K', color: '#00e5a0' },
  { name: 'NFT Metadata Generator', cat: 'NFT',      price: '3.00',  rating: 4.5, runs: '2.2K', color: '#4ecdc4' },
]

const ACTIVITIES = [
  { action: 'invoked',  applet: 'AI Analyzer',    wallet: '0x3f2a...', time: '2m ago',  color: '#00e5a0' },
  { action: 'deployed', applet: 'NFT Generator',  wallet: '0x91bc...', time: '8m ago',  color: '#d4a853' },
  { action: 'invoked',  applet: 'Price Oracle',   wallet: '0x44ef...', time: '15m ago', color: '#4ecdc4' },
  { action: 'invoked',  applet: 'WUSD Router',    wallet: '0x77da...', time: '21m ago', color: '#f0c87a' },
]

const FEATURES = [
  { title: 'Marketplace',      desc: 'Browse 1,284 live applets across 7 categories.', icon: LayoutGrid, color: '#d4a853', link: '/marketplace', cta: 'Explore' },
  { title: 'Workflow Builder', desc: 'Chain applets into automated on-chain pipelines.', icon: GitBranch, color: '#4ecdc4', link: '/workflow',    cta: 'Build'   },
  { title: 'Deploy Applet',    desc: 'Publish your applet and earn WUSD per call.',     icon: Zap,        color: '#f0c87a', link: '/deploy',      cta: 'Deploy'  },
]

export default function Home() {
  const { isDark } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t) }, [])

  const card = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-mid)',
    borderRadius: 18,
    position: 'relative',
    overflow: 'hidden',
  }

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 32px 80px' }}>

      {/* ── TOP STRIP ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 28, flexWrap: 'wrap', gap: 12,
        animation: 'fadeInUp 0.5s cubic-bezier(0.16,1,0.3,1) both',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--gold)',
            fontFamily: 'var(--font-display)',
          }}>WeilMarket Dashboard</span>
          <div style={{ width: 1, height: 16, background: 'var(--border-mid)' }} />
          <span style={{
            fontSize: 10, color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)', letterSpacing: '0.08em',
          }}>
            {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ position: 'relative', width: 8, height: 8 }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--green)', animation: 'glowPing 2s ease-out infinite', opacity: 0.6 }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', position: 'relative', zIndex: 1 }} />
          </div>
          <span style={{ fontSize: 10, color: 'var(--green)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>Network Live</span>
        </div>
      </div>

      {/* ── BENTO GRID ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 310px',
        gridTemplateRows: 'auto auto auto',
        gap: 14,
      }}>

        {/* ── HERO PANEL ── */}
        <div style={{
          ...card,
          gridColumn: '1 / 4',
          padding: '44px 48px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32,
          animation: 'fadeInLeft 0.7s cubic-bezier(0.16,1,0.3,1) both',
          animationDelay: '0ms',
        }}>
          {/* Orbs */}
          <div className="orb orb-gold" style={{ width: 320, height: 320, top: -80, right: '22%', opacity: 0.5 }} />
          <div className="orb orb-teal" style={{ width: 200, height: 200, bottom: -60, right: '5%', opacity: 0.4 }} />

          {/* Top gold line */}
          <div style={{ position: 'absolute', top: 0, left: '5%', right: '5%', height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold), var(--gold-bright), var(--gold), transparent)' }} />

          {/* Left: Headline */}
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 560 }}>

            {/* Badge */}
            <div className="badge badge-gold" style={{ marginBottom: 24 }}>
              <Zap size={9} /> Web4 On-Chain Marketplace
            </div>

            {/* ★ BIG BOLD + THIN MIX — NO ITALIC ★ */}
            <div style={{ marginBottom: 20 }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(40px, 4.5vw, 66px)',
                lineHeight: 1.0,
                letterSpacing: '-0.04em',
                color: 'var(--white)',
                animation: 'fadeInUp 0.8s cubic-bezier(0.16,1,0.3,1) both',
                animationDelay: '100ms',
              }}>
                DISCOVER &<br />DEPLOY
              </div>

              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                fontSize: 'clamp(16px, 2vw, 22px)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginTop: 8, marginBottom: 4,
                animation: 'fadeInUp 0.8s cubic-bezier(0.16,1,0.3,1) both',
                animationDelay: '180ms',
              }}
                className="text-gold-shimmer"
              >
                Intelligent Applets
              </div>

              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                fontSize: 'clamp(13px, 1.4vw, 17px)',
                letterSpacing: '0.06em',
                color: 'var(--text-secondary)',
                animation: 'fadeInUp 0.8s cubic-bezier(0.16,1,0.3,1) both',
                animationDelay: '240ms',
              }}>
                on the WeilChain Network
              </div>
            </div>

            <p style={{
              fontSize: 14, color: 'var(--text-secondary)',
              lineHeight: 1.8, marginBottom: 32, maxWidth: 440,
              fontFamily: 'var(--font-body)',
              animation: 'fadeInUp 0.8s cubic-bezier(0.16,1,0.3,1) both',
              animationDelay: '300ms',
            }}>
              Browse, invoke, and compose on-chain applets powering the next generation of decentralized applications. Earn WUSD with every invocation.
            </p>

            <div style={{
              display: 'flex', gap: 12, flexWrap: 'wrap',
              animation: 'fadeInUp 0.8s cubic-bezier(0.16,1,0.3,1) both',
              animationDelay: '380ms',
            }}>
              <Link to="/marketplace" style={{ textDecoration: 'none' }}>
                <button className="btn-gold">
                  <LayoutGrid size={13} /> Browse Marketplace <ArrowRight size={13} />
                </button>
              </Link>
              <Link to="/deploy" style={{ textDecoration: 'none' }}>
                <button className="btn-ghost">Deploy an Applet</button>
              </Link>
            </div>
          </div>

          {/* Right: Stats */}
          <div style={{
            position: 'relative', zIndex: 1,
            display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0,
          }}>
            {STATS.map(({ label, value, sub, icon: Icon, color }, i) => (
              <div
                key={label}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '13px 18px',
                  background: isDark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.025)',
                  border: '1px solid var(--border)',
                  borderRadius: 12, minWidth: 210,
                  transition: 'all 0.3s ease',
                  animation: 'fadeInRight 0.7s cubic-bezier(0.16,1,0.3,1) both',
                  animationDelay: `${i * 80 + 300}ms`,
                  cursor: 'default',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.transform = 'translateX(5px)'; e.currentTarget.style.background = `${color}10` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.025)' }}
              >
                <div style={{
                  width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                  background: `${color}12`, border: `1px solid ${color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={17} color={color} />
                </div>
                <div>
                  <div style={{
                    fontSize: 22, fontWeight: 800,
                    fontFamily: 'var(--font-display)',
                    color: 'var(--text-primary)',
                    lineHeight: 1, letterSpacing: '-0.03em',
                    animation: 'countUp 0.9s cubic-bezier(0.16,1,0.3,1) both',
                    animationDelay: `${i * 80 + 400}ms`,
                  }}>{value}</div>
                  <div style={{
                    fontSize: 10, color: 'var(--text-muted)', marginTop: 3,
                    fontFamily: 'var(--font-mono)', letterSpacing: '0.04em',
                  }}>{label} · {sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── LIVE ACTIVITY FEED ── */}
        <div style={{
          ...card,
          gridColumn: '4 / 5', gridRow: '1 / 3',
          padding: '24px 20px',
          display: 'flex', flexDirection: 'column',
          animation: 'fadeInRight 0.7s cubic-bezier(0.16,1,0.3,1) both',
          animationDelay: '150ms',
        }}>
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '2px', background: 'linear-gradient(90deg, transparent, var(--teal), transparent)' }} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>Live Activity</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: 3 }}>Real-time chain events</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ position: 'relative', width: 7, height: 7 }}>
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--green)', animation: 'glowPing 1.5s ease-out infinite', opacity: 0.5 }} />
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', position: 'relative', zIndex: 1 }} />
              </div>
              <span style={{ fontSize: 9, color: 'var(--green)', fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.1em' }}>LIVE</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
            {ACTIVITIES.map(({ action, applet, wallet, time, color }, i) => (
              <div key={i} style={{
                padding: '12px 14px',
                background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.025)',
                border: '1px solid var(--border)',
                borderRadius: 10, transition: 'all 0.25s ease',
                animation: 'fadeInUp 0.6s cubic-bezier(0.16,1,0.3,1) both',
                animationDelay: `${i * 80 + 300}ms`,
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.background = `${color}08` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.025)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color, fontFamily: 'var(--font-display)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{action}</span>
                  <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{time}</span>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 3, fontFamily: 'var(--font-display)' }}>{applet}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{wallet}</div>
              </div>
            ))}
          </div>

          <div style={{ height: 1, background: 'var(--border)', margin: '14px 0 12px' }} />
          <Link to="/marketplace" style={{
            textDecoration: 'none', display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: 6, fontSize: 10,
            color: 'var(--gold)', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            fontFamily: 'var(--font-display)',
            transition: 'gap 0.2s ease',
          }}
            onMouseEnter={e => e.currentTarget.style.gap = '10px'}
            onMouseLeave={e => e.currentTarget.style.gap = '6px'}
          >
            View all transactions <ChevronRight size={12} />
          </Link>
        </div>

        {/* ── FEATURE CARDS ── */}
        {FEATURES.map(({ title, desc, icon: Icon, color, link, cta }, i) => (
          <div key={title} style={{
            ...card,
            padding: '24px 22px 20px',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
            animation: 'fadeInUp 0.7s cubic-bezier(0.16,1,0.3,1) both',
            animationDelay: `${i * 100 + 200}ms`,
          }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = color
              e.currentTarget.style.transform = 'translateY(-6px)'
              e.currentTarget.style.boxShadow = `0 20px 50px rgba(0,0,0,0.4), 0 0 30px ${color}15`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-mid)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div style={{ position: 'absolute', top: 0, right: 0, width: 100, height: 100, background: `radial-gradient(circle at 100% 0%, ${color}12 0%, transparent 70%)`, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${color}, transparent)`, opacity: 0.7 }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: `${color}12`, border: `1px solid ${color}25`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
              }}>
                <Icon size={20} color={color} />
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, fontFamily: 'var(--font-display)', letterSpacing: '-0.01em', marginBottom: 8 }}>{title}</div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>{desc}</p>
            </div>

            <Link to={link} style={{
              textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 6,
              marginTop: 20, fontSize: 10, fontWeight: 700,
              color, letterSpacing: '0.1em', textTransform: 'uppercase',
              fontFamily: 'var(--font-display)',
              transition: 'gap 0.2s ease',
            }}
              onMouseEnter={e => e.currentTarget.style.gap = '10px'}
              onMouseLeave={e => e.currentTarget.style.gap = '6px'}
            >
              {cta} <ArrowUpRight size={13} />
            </Link>
          </div>
        ))}

        {/* ── TOP APPLETS TABLE ── */}
        <div style={{
          ...card,
          gridColumn: '1 / 4',
          padding: '26px 30px',
          animation: 'fadeInUp 0.7s cubic-bezier(0.16,1,0.3,1) both',
          animationDelay: '400ms',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>Top Applets</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: 3 }}>Ranked by executions this week</div>
            </div>
            <Link to="/marketplace" style={{
              textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5,
              fontSize: 10, color: 'var(--gold)', fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              fontFamily: 'var(--font-display)',
            }}>
              View all <ArrowRight size={12} />
            </Link>
          </div>

          {/* Header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '28px 1fr 90px 70px 70px 80px',
            gap: 12, padding: '0 12px 12px',
            borderBottom: '1px solid var(--border)',
          }}>
            {['#', 'Applet', 'Category', 'Price', 'Rating', ''].map(h => (
              <div key={h} style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{h}</div>
            ))}
          </div>

          {/* Rows */}
          {FEATURED.map(({ name, cat, price, rating, color }, i) => (
            <div key={name} style={{
              display: 'grid', gridTemplateColumns: '28px 1fr 90px 70px 70px 80px',
              gap: 12, padding: '14px 12px',
              borderBottom: i < FEATURED.length - 1 ? '1px solid var(--border)' : 'none',
              transition: 'all 0.25s ease', borderRadius: 8,
              animation: 'fadeInUp 0.6s cubic-bezier(0.16,1,0.3,1) both',
              animationDelay: `${i * 60 + 450}ms`,
            }}
              onMouseEnter={e => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.025)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
            >
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', alignSelf: 'center' }}>
                {String(i+1).padStart(2,'0')}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 9,
                  background: `${color}12`, border: `1px solid ${color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, color, flexShrink: 0,
                }}>◆</div>
                <span style={{ fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-display)' }}>{name}</span>
              </div>
              <div style={{ alignSelf: 'center' }}>
                <span style={{ fontSize: 9, color, fontWeight: 700, fontFamily: 'var(--font-display)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{cat}</span>
              </div>
              <div style={{ alignSelf: 'center', fontSize: 13, fontWeight: 700, color: 'var(--green)', fontFamily: 'var(--font-mono)' }}>{price}</div>
              <div style={{ alignSelf: 'center', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Star size={11} fill="var(--gold)" color="var(--gold)" />
                <span style={{ fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-display)' }}>{rating}</span>
              </div>
              <div style={{ alignSelf: 'center' }}>
                <Link to="/marketplace" style={{
                  textDecoration: 'none',
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  padding: '6px 14px',
                  background: 'linear-gradient(135deg, var(--gold-deep), var(--gold))',
                  borderRadius: 6, color: '#000', fontSize: 9, fontWeight: 800,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  fontFamily: 'var(--font-display)',
                  boxShadow: '0 2px 12px rgba(212,168,83,0.25)',
                  transition: 'all 0.2s ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(212,168,83,0.4)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(212,168,83,0.25)' }}
                >
                  <Play size={8} fill="currentColor" /> Run
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA PANEL ── */}
        <div style={{
          ...card,
          gridColumn: '4 / 5',
          background: 'linear-gradient(135deg, rgba(212,168,83,0.08) 0%, rgba(212,168,83,0.03) 100%)',
          border: '1px solid rgba(212,168,83,0.22)',
          padding: '26px 22px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          animation: 'borderGoldGlow 4s ease-in-out infinite, fadeInRight 0.7s cubic-bezier(0.16,1,0.3,1) both',
          animationDelay: '0ms, 500ms',
        }}>
          <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold-bright), transparent)' }} />
          <div className="orb orb-gold" style={{ width: 180, height: 180, top: -50, right: -50, opacity: 0.4 }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              width: 46, height: 46, borderRadius: 12,
              background: 'var(--gold-dim)', border: '1px solid rgba(212,168,83,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 18, animation: 'goldPulse 3s ease-in-out infinite',
            }}>
              <Zap size={22} color="var(--gold-bright)" />
            </div>
            <div style={{
              fontSize: 20, fontWeight: 800,
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15, marginBottom: 12,
            }}>
              START BUILDING<br />
              <span style={{ color: 'var(--gold)', fontWeight: 300, letterSpacing: '0.06em', fontSize: 14 }}>ON WEILCHAIN</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 22, fontFamily: 'var(--font-body)' }}>
              Deploy your first applet in minutes. Earn WUSD from every execution.
            </p>
          </div>

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Link to="/deploy" style={{ textDecoration: 'none' }}>
              <button className="btn-gold" style={{ width: '100%', justifyContent: 'center', fontSize: 10 }}>
                <Zap size={12} /> Deploy Now <ArrowRight size={12} />
              </button>
            </Link>
            <Link to="/workflow" style={{ textDecoration: 'none' }}>
              <button className="btn-ghost" style={{ width: '100%', justifyContent: 'center', fontSize: 10 }}>
                <GitBranch size={12} /> Build Workflow
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
