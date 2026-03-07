import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import {
  LayoutGrid, Zap, Shield, GitBranch, ArrowRight,
  Activity, Box, Users, TrendingUp, ArrowUpRight,
  Star, Play, ChevronRight
} from 'lucide-react'
import { useEffect, useState } from 'react'

/* ── DATA ── */
const STATS = [
  { label: 'Applets',    value: '1,284', sub: '+12 this week',  icon: Box,        color: 'var(--rose-bright)' },
  { label: 'Executions', value: '48.3K', sub: 'all time',       icon: Activity,   color: 'var(--teal)'        },
  { label: 'Builders',   value: '732',   sub: 'active now',     icon: Users,      color: 'var(--gold-bright)' },
  { label: 'Volume',     value: '$2.1M', sub: 'WUSD total',     icon: TrendingUp, color: 'var(--green)'       },
]

const FEATURED = [
  { name: 'AI Data Analyzer',       cat: 'AI/ML',    price: '5.00',  rating: 4.8, runs: '3.8K', color: '#c9748a' },
  { name: 'Contract Auditor',       cat: 'Security', price: '12.50', rating: 4.9, runs: '1.2K', color: '#ff7096' },
  { name: 'Price Oracle Feed',      cat: 'Oracle',   price: '0.50',  rating: 4.7, runs: '28K',  color: '#d4a853' },
  { name: 'WUSD Payment Router',    cat: 'DeFi',     price: '1.00',  rating: 4.6, runs: '9.1K', color: '#00e5a0' },
  { name: 'NFT Metadata Generator', cat: 'NFT',      price: '3.00',  rating: 4.5, runs: '2.2K', color: '#4ecdc4' },
]

const ACTIVITIES = [
  { action: 'invoked', applet: 'AI Analyzer',    wallet: '0x3f2a...', time: '2m ago',  color: 'var(--green)' },
  { action: 'deployed', applet: 'NFT Generator', wallet: '0x91bc...', time: '8m ago',  color: 'var(--rose-bright)' },
  { action: 'invoked', applet: 'Price Oracle',   wallet: '0x44ef...', time: '15m ago', color: 'var(--teal)' },
  { action: 'invoked', applet: 'WUSD Router',    wallet: '0x77da...', time: '21m ago', color: 'var(--gold-bright)' },
]

export default function Home() {
  const { isDark } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t) }, [])

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 32px 64px' }}>

      {/* ════════════════════════════════════════
          TOP STRIP — editorial eyebrow + title
      ════════════════════════════════════════ */}
      <div
        className="animate-fadeInDown"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 28, flexWrap: 'wrap', gap: 12,
        }}
      >
        {/* Left: label + divider + date */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'var(--rose-gold)',
            fontFamily: 'JetBrains Mono, monospace',
          }}>
            WeilMarket Dashboard
          </span>
          <div style={{ width: 1, height: 16, background: 'var(--border-mid)' }} />
          <span style={{
            fontSize: 10, color: 'var(--text-muted)',
            fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em',
          }}>
            {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        </div>
        {/* Right: live indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ position: 'relative', width: 8, height: 8 }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--green)', animation: 'glowPing 2s ease-out infinite', opacity: 0.5 }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', position: 'relative', zIndex: 1 }} />
          </div>
          <span style={{ fontSize: 10, color: 'var(--green)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em' }}>Network Live</span>
        </div>
      </div>

      {/* ════════════════════════════════════════
          MAIN BENTO GRID
      ════════════════════════════════════════ */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 320px',
        gridTemplateRows: 'auto auto auto',
        gap: 14,
      }}>

        {/* ── CELL 1: HERO TEXT (spans 3 cols) ── */}
        <div
          className="animate-fadeInLeft"
          style={{
            gridColumn: '1 / 4',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-mid)',
            borderRadius: 18,
            padding: '40px 44px',
            position: 'relative', overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 32,
            animationDelay: '0ms',
          }}
        >
          {/* Orbs */}
          <div className="orb orb-rose" style={{ width: 300, height: 300, top: -80, right: '20%', opacity: 0.6 }} />
          <div className="orb orb-gold" style={{ width: 180, height: 180, bottom: -50, right: '5%', opacity: 0.5 }} />

          {/* Top accent line */}
          <div style={{ position: 'absolute', top: 0, left: '5%', right: '5%', height: '1.5px', background: 'linear-gradient(90deg, transparent, var(--rose-bright), var(--rose-gold), transparent)' }} />

          {/* Left: headline */}
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 560 }}>
            <div className="badge badge-rose" style={{ marginBottom: 20 }}>
              <Zap size={9} /> Web4 On-Chain Marketplace
            </div>

            {/* ★ EDITORIAL TITLE — left-aligned, serif, italic ★ */}
            <h1 style={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: 900, fontStyle: 'italic',
              fontSize: 'clamp(36px, 4vw, 58px)',
              lineHeight: 1.05, letterSpacing: '-0.01em',
              marginBottom: 16,
            }}>
              Discover & Deploy<br />
              <span className="text-rose-shimmer">Intelligent Applets</span><br />
              <span style={{ fontSize: '0.55em', fontStyle: 'normal', fontWeight: 400, color: 'var(--text-secondary)', letterSpacing: '0.01em' }}>
                on the WeilChain Network
              </span>
            </h1>

            <p style={{
              fontSize: 14, color: 'var(--text-secondary)',
              lineHeight: 1.8, marginBottom: 28, maxWidth: 440,
            }}>
              Browse, invoke, and compose on-chain applets powering the next generation of decentralized applications. Earn WUSD with every invocation.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/marketplace" style={{ textDecoration: 'none' }}>
                <button className="btn-rose">
                  <LayoutGrid size={13} /> Browse Marketplace <ArrowRight size={13} />
                </button>
              </Link>
              <Link to="/deploy" style={{ textDecoration: 'none' }}>
                <button className="btn-ghost">Deploy an Applet</button>
              </Link>
            </div>
          </div>

          {/* Right: mini stat pills */}
          <div style={{
            position: 'relative', zIndex: 1,
            display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0,
          }}>
            {STATS.map(({ label, value, sub, icon: Icon, color }, i) => (
              <div
                key={label}
                className="animate-fadeInRight"
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 16px',
                  background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                  border: '1px solid var(--border)',
                  borderRadius: 12, minWidth: 200,
                  animationDelay: `${i * 80 + 200}ms`,
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.transform = 'translateX(4px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateX(0)' }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                  background: `${color}15`, border: `1px solid ${color}28`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={16} color={color} />
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800, fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)', lineHeight: 1, letterSpacing: '-0.02em' }}>{value}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2, fontFamily: 'JetBrains Mono, monospace' }}>{label} · {sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CELL 2: LIVE ACTIVITY FEED (right col, spans 2 rows) ── */}
        <div
          className="animate-fadeInRight"
          style={{
            gridColumn: '4 / 5',
            gridRow: '1 / 3',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-mid)',
            borderRadius: 18, padding: '24px 20px',
            display: 'flex', flexDirection: 'column',
            animationDelay: '150ms',
            position: 'relative', overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1.5px', background: 'linear-gradient(90deg, transparent, var(--teal), transparent)' }} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>Live Activity</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', marginTop: 2 }}>Real-time chain events</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ position: 'relative', width: 7, height: 7 }}>
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--green)', animation: 'glowPing 1.5s ease-out infinite', opacity: 0.5 }} />
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', position: 'relative', zIndex: 1 }} />
              </div>
              <span style={{ fontSize: 9, color: 'var(--green)', fontFamily: 'JetBrains Mono, monospace' }}>LIVE</span>
            </div>
          </div>

          {/* Activity items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
            {ACTIVITIES.map(({ action, applet, wallet, time, color }, i) => (
              <div
                key={i}
                className="animate-fadeInUp"
                style={{
                  padding: '12px 14px',
                  background: isDark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.03)',
                  border: '1px solid var(--border)',
                  borderRadius: 10, transition: 'all 0.25s ease',
                  animationDelay: `${i * 100 + 300}ms`,
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.03)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color }}>{action}</span>
                  <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>{time}</span>
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{applet}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>{wallet}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 14, height: 1, background: 'var(--border)', marginBottom: 12 }} />
          <Link to="/marketplace" style={{
            textDecoration: 'none', display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: 6, fontSize: 11, color: 'var(--rose)',
            fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
            transition: 'gap 0.2s ease',
          }}
            onMouseEnter={e => e.currentTarget.style.gap = '10px'}
            onMouseLeave={e => e.currentTarget.style.gap = '6px'}
          >
            View all transactions <ChevronRight size={13} />
          </Link>
        </div>

        {/* ── CELLS 3-4-5: STAT CARDS (3 cols, row 2) ── */}
        {[
          { title: 'Marketplace',  desc: 'Browse 1,284 live applets across 7 categories.', icon: LayoutGrid, color: 'var(--rose-bright)', link: '/marketplace', cta: 'Explore' },
          { title: 'Workflow Builder', desc: 'Chain applets into automated on-chain pipelines.', icon: GitBranch, color: 'var(--teal)', link: '/workflow', cta: 'Build' },
          { title: 'Deploy Applet', desc: 'Publish your own applet and earn WUSD per call.', icon: Zap, color: 'var(--gold-bright)', link: '/deploy', cta: 'Deploy' },
        ].map(({ title, desc, icon: Icon, color, link, cta }, i) => (
          <div
            key={title}
            className="animate-fadeInUp"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-mid)',
              borderRadius: 16, padding: '22px 22px 18px',
              position: 'relative', overflow: 'hidden',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
              animationDelay: `${i * 100 + 200}ms`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = color
              e.currentTarget.style.transform = 'translateY(-5px)'
              e.currentTarget.style.boxShadow = `0 18px 50px rgba(0,0,0,0.35), 0 0 30px ${color}18`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-mid)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {/* Corner glow */}
            <div style={{ position: 'absolute', top: 0, right: 0, width: 90, height: 90, background: `radial-gradient(circle at 100% 0%, ${color}18 0%, transparent 70%)`, pointerEvents: 'none' }} />
            {/* Top accent */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${color}, transparent)`, opacity: 0.6 }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 11,
                background: `${color}15`, border: `1px solid ${color}28`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 14,
              }}>
                <Icon size={20} color={color} />
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, fontFamily: 'Playfair Display, serif', fontStyle: 'italic', marginBottom: 8 }}>{title}</div>
              <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{desc}</p>
            </div>

            <Link to={link} style={{
              textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 6,
              marginTop: 18, fontSize: 11, fontWeight: 700,
              color, letterSpacing: '0.07em', textTransform: 'uppercase',
              transition: 'gap 0.2s ease',
            }}
              onMouseEnter={e => e.currentTarget.style.gap = '10px'}
              onMouseLeave={e => e.currentTarget.style.gap = '6px'}
            >
              {cta} <ArrowUpRight size={13} />
            </Link>
          </div>
        ))}

        {/* ── CELL 6: FEATURED APPLETS TABLE (spans 3 cols) ── */}
        <div
          className="animate-fadeInUp"
          style={{
            gridColumn: '1 / 4',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-mid)',
            borderRadius: 18, padding: '24px 28px',
            animationDelay: '400ms',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>Top Applets</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', marginTop: 2 }}>Ranked by executions this week</div>
            </div>
            <Link to="/marketplace" style={{
              textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5,
              fontSize: 11, color: 'var(--rose)', fontWeight: 600,
              letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>
              View all <ArrowRight size={12} />
            </Link>
          </div>

          {/* Table header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '24px 1fr 90px 70px 70px 80px',
            gap: 12, padding: '0 12px 10px',
            borderBottom: '1px solid var(--border)',
          }}>
            {['#', 'Applet', 'Category', 'Price', 'Rating', ''].map(h => (
              <div key={h} style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{h}</div>
            ))}
          </div>

          {/* Table rows */}
          {FEATURED.map(({ name, cat, price, rating, runs, color }, i) => (
            <div
              key={name}
              className="animate-fadeInUp"
              style={{
                display: 'grid', gridTemplateColumns: '24px 1fr 90px 70px 70px 80px',
                gap: 12, padding: '13px 12px',
                borderBottom: i < FEATURED.length - 1 ? '1px solid var(--border)' : 'none',
                transition: 'all 0.25s ease', borderRadius: 8,
                animationDelay: `${i * 60 + 450}ms`,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.025)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
            >
              <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', alignSelf: 'center' }}>
                {String(i+1).padStart(2, '0')}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: `${color}18`, border: `1px solid ${color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color, flexShrink: 0 }}>◆</div>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{name}</span>
              </div>
              <div style={{ alignSelf: 'center' }}>
                <span style={{ fontSize: 10, color, fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{cat}</span>
              </div>
              <div style={{ alignSelf: 'center', fontSize: 13, fontWeight: 700, color: 'var(--green)', fontFamily: 'JetBrains Mono, monospace' }}>{price}</div>
              <div style={{ alignSelf: 'center', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Star size={11} fill="var(--rose-gold)" color="var(--rose-gold)" />
                <span style={{ fontSize: 12, fontWeight: 600 }}>{rating}</span>
              </div>
              <div style={{ alignSelf: 'center' }}>
                <Link to="/marketplace" style={{
                  textDecoration: 'none',
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  padding: '5px 12px',
                  background: 'linear-gradient(135deg, var(--rose-deep), var(--rose-gold))',
                  borderRadius: 6, color: '#fff', fontSize: 10, fontWeight: 700,
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  boxShadow: '0 2px 10px rgba(201,116,138,0.22)',
                  transition: 'all 0.2s ease',
                }}>
                  <Play size={9} fill="currentColor" /> Run
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ── CELL 7: QUICK DEPLOY CTA (right col, row 3) ── */}
        <div
          className="animate-fadeInRight"
          style={{
            gridColumn: '4 / 5',
            background: 'linear-gradient(135deg, rgba(158,61,88,0.15) 0%, rgba(201,116,138,0.08) 100%)',
            border: '1px solid var(--border-rose)',
            borderRadius: 18, padding: '24px 22px',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            position: 'relative', overflow: 'hidden',
            animationDelay: '500ms',
            animation: 'borderGlow 4s ease-in-out infinite',
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: '1.5px', background: 'linear-gradient(90deg, transparent, var(--rose-bright), transparent)' }} />
          <div className="orb orb-rose" style={{ width: 160, height: 160, top: -40, right: -40, opacity: 0.5 }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: 'var(--rose-dim)', border: '1px solid var(--border-rose)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 16, animation: 'rosePulse 3s ease-in-out infinite',
            }}>
              <Zap size={20} color="var(--rose-bright)" />
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, fontFamily: 'Playfair Display, serif', fontStyle: 'italic', marginBottom: 10 }}>
              Start Building<br />on WeilChain
            </div>
            <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 20 }}>
              Deploy your first applet in minutes. Earn WUSD from every execution.
            </p>
          </div>

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Link to="/deploy" style={{ textDecoration: 'none' }}>
              <button className="btn-rose" style={{ width: '100%', justifyContent: 'center', fontSize: 11 }}>
                <Zap size={13} /> Deploy Now <ArrowRight size={13} />
              </button>
            </Link>
            <Link to="/workflow" style={{ textDecoration: 'none' }}>
              <button className="btn-ghost" style={{ width: '100%', justifyContent: 'center', fontSize: 11 }}>
                <GitBranch size={13} /> Build Workflow
              </button>
            </Link>
          </div>
        </div>

      </div>{/* end bento grid */}

    </div>
  )
}
