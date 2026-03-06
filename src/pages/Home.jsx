import { Link } from 'react-router-dom'
import { LayoutGrid, Zap, Shield, GitBranch, ArrowRight, Activity, Box, Users, TrendingUp, Star } from 'lucide-react'
import { useEffect, useState } from 'react'

const STATS = [
  { label: 'Applets Deployed', value: '1,284', icon: Box,        color: 'var(--rose-bright)', delay: '0ms' },
  { label: 'Total Executions', value: '48,391', icon: Activity,  color: 'var(--teal)',        delay: '100ms' },
  { label: 'Active Builders',  value: '732',    icon: Users,     color: 'var(--gold-bright)', delay: '200ms' },
  { label: 'WUSD Volume',      value: '$2.1M',  icon: TrendingUp, color: 'var(--green)',      delay: '300ms' },
]

const FEATURES = [
  {
    icon: LayoutGrid, title: 'Discover Applets',
    desc: 'Browse a curated ecosystem of intelligent, composable on-chain services built by elite developers worldwide.',
    color: 'var(--rose-bright)', bg: 'var(--rose-dim)', border: 'var(--border-rose)', delay: '0ms',
  },
  {
    icon: Zap, title: 'Invoke Instantly',
    desc: 'Execute any applet with your Weil wallet in one click. Every transaction is transparent and permanently recorded.',
    color: 'var(--teal)', bg: 'var(--teal-dim)', border: 'rgba(78,205,196,0.22)', delay: '120ms',
  },
  {
    icon: GitBranch, title: 'Compose Workflows',
    desc: 'Chain multiple applets into powerful automated pipelines using our cinematic visual workflow builder.',
    color: 'var(--gold-bright)', bg: 'var(--gold-dim)', border: 'rgba(212,168,83,0.22)', delay: '240ms',
  },
  {
    icon: Shield, title: 'On-Chain Audit',
    desc: 'Every invocation permanently carved into WeilChain — immutable, verifiable, unstoppable.',
    color: 'var(--green)', bg: 'var(--green-dim)', border: 'rgba(0,229,160,0.18)', delay: '360ms',
  },
]

const TESTIMONIALS = [
  { name: 'Arjun M.', role: 'DeFi Dev', text: 'WeilMarket changed how we build. Deployed 3 applets in one sprint.' },
  { name: 'Priya S.', role: 'Smart Contract Auditor', text: 'The audit trail on-chain is a game changer for compliance.' },
  { name: 'Rahul K.', role: 'Web3 Builder', text: 'Workflow composer is insane. Chained 5 applets in 10 minutes.' },
]

export default function Home() {
  const [visible, setVisible] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVisible(true), 80); return () => clearTimeout(t) }, [])

  return (
    <div style={{ maxWidth: 1380, margin: '0 auto', padding: '0 32px' }}>

      {/* ════ HERO ════ */}
      <section style={{
        position: 'relative',
        padding: '110px 0 80px',
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        {/* Floating orbs */}
        <div className="orb orb-rose" style={{ width: 420, height: 420, top: -80, left: '50%', transform: 'translateX(-50%)' }} />
        <div className="orb orb-gold"  style={{ width: 240, height: 240, top: 60, right: '8%' }} />
        <div className="orb orb-teal"  style={{ width: 180, height: 180, bottom: 0, left: '5%' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Eyebrow */}
          <div
            className="animate-fadeInDown"
            style={{ marginBottom: 32, animationDelay: '0ms' }}
          >
            <span className="badge badge-rose">
              <Zap size={9} />
              Built on WeilChain · Web4 DApp Marketplace
            </span>
          </div>

          {/* Headline */}
          <h1
            className="animate-fadeInUp"
            style={{
              fontSize: 'clamp(52px, 7.5vw, 96px)',
              fontWeight: 700,
              lineHeight: 1.0,
              letterSpacing: '0.02em',
              marginBottom: 8,
              animationDelay: '120ms',
              textTransform: 'uppercase',
              fontStyle: 'italic',
            }}
          >
            The On-Chain
          </h1>
          <h1
            className="animate-fadeInUp text-rose-shimmer"
            style={{
              fontSize: 'clamp(52px, 7.5vw, 96px)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '0.02em',
              marginBottom: 32,
              animationDelay: '200ms',
              textTransform: 'uppercase',
            }}
          >
            Applet Marketplace
          </h1>

          <p
            className="animate-fadeInUp"
            style={{
              fontSize: 16, color: 'var(--text-secondary)',
              maxWidth: 520, margin: '0 auto 50px',
              lineHeight: 1.85, fontWeight: 400,
              animationDelay: '340ms',
            }}
          >
            Discover, invoke, compose and monetize intelligent applets
            deployed on WeilChain. Powered by WUSD stablecoin.
          </p>

          {/* CTAs */}
          <div
            className="animate-fadeInUp"
            style={{
              display: 'flex', gap: 14, justifyContent: 'center',
              flexWrap: 'wrap', animationDelay: '460ms',
            }}
          >
            <Link to="/marketplace" style={{ textDecoration: 'none' }}>
              <button className="btn-rose" style={{ fontSize: 12, padding: '14px 34px' }}>
                <LayoutGrid size={14} />
                Browse Marketplace
                <ArrowRight size={14} />
              </button>
            </Link>
            <Link to="/deploy" style={{ textDecoration: 'none' }}>
              <button className="btn-ghost-rose" style={{ fontSize: 12, padding: '14px 34px' }}>
                Deploy an Applet
              </button>
            </Link>
          </div>

          {/* Trust strip */}
          <div
            className="animate-fadeIn"
            style={{
              marginTop: 48, animationDelay: '700ms',
              display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8,
            }}
          >
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="var(--rose-gold)" color="var(--rose-gold)" />
            ))}
            <span style={{ color: 'var(--text-muted)', fontSize: 12, marginLeft: 6, fontFamily: 'var(--font-mono)' }}>
              Trusted by 732+ builders
            </span>
          </div>
        </div>

        {/* Decorative divider */}
        <div style={{ marginTop: 80 }} className="line-rose" />
      </section>

      {/* ════ STATS ════ */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
        gap: 12, marginBottom: 80,
      }}>
        {STATS.map(({ label, value, icon: Icon, color, delay }, i) => (
          <div
            key={label}
            className="animate-fadeInUp"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-mid)',
              borderRadius: 'var(--radius-lg)',
              padding: '22px 24px',
              display: 'flex', alignItems: 'center', gap: 18,
              animationDelay: delay,
              transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
              position: 'relative', overflow: 'hidden', cursor: 'default',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = color
              e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)'
              e.currentTarget.style.boxShadow = `0 16px 48px rgba(0,0,0,0.4), 0 0 30px ${color}20`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-mid)'
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {/* Glow top edge */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '1.5px',
              background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
              opacity: 0.6,
            }} />
            <div style={{
              width: 44, height: 44, borderRadius: 12, flexShrink: 0,
              background: `${color}15`, border: `1px solid ${color}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon size={20} color={color} />
            </div>
            <div>
              <div style={{
                fontSize: 26, fontWeight: 700,
                fontFamily: 'var(--font-display)',
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                animation: `countUp 0.8s ${delay} cubic-bezier(0.16,1,0.3,1) both`,
              }}>
                {value}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500, marginTop: 1 }}>
                {label}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ════ FEATURES ════ */}
      <section style={{ marginBottom: 96 }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{
            fontSize: 10, fontWeight: 700, color: 'var(--text-muted)',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            marginBottom: 14, fontFamily: 'var(--font-mono)',
          }}>
            Platform Capabilities
          </div>
          <h2
            className="animate-fadeInUp"
            style={{ fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 700, fontStyle: 'italic', letterSpacing: '0.01em' }}
          >
            Infrastructure for the next<br />
            <span className="text-rose-shimmer">generation of dApps</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 12,
        }}>
          {FEATURES.map(({ icon: Icon, title, desc, color, bg, border, delay }) => (
            <div
              key={title}
              className="animate-fadeInUp"
              style={{
                background: 'var(--bg-card)',
                border: `1px solid var(--border-mid)`,
                borderRadius: 'var(--radius-lg)',
                padding: '28px 26px',
                transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                animationDelay: delay,
                position: 'relative', overflow: 'hidden', cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = border
                e.currentTarget.style.background = 'var(--bg-card-hover)'
                e.currentTarget.style.transform = 'translateY(-6px) scale(1.01)'
                e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,0.4)`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border-mid)'
                e.currentTarget.style.background = 'var(--bg-card)'
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Scan line effect on hover */}
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: bg, border: `1px solid ${border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 20,
              }}>
                <Icon size={22} color={color} />
              </div>
              <h3 style={{
                fontSize: 20, fontWeight: 700, fontStyle: 'italic',
                marginBottom: 12, color: 'var(--text-primary)',
              }}>
                {title}
              </h3>
              <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                {desc}
              </p>
              {/* Corner accent */}
              <div style={{
                position: 'absolute', bottom: 0, right: 0,
                width: 80, height: 80,
                background: `radial-gradient(circle at 100% 100%, ${color}15 0%, transparent 70%)`,
              }} />
            </div>
          ))}
        </div>
      </section>

      {/* ════ TESTIMONIALS ════ */}
      <section style={{ marginBottom: 96 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.2em',
            textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: 12,
          }}>Builder Stories</div>
          <h2 style={{ fontSize: 32, fontWeight: 700, fontStyle: 'italic' }}>
            What builders are saying
          </h2>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 12,
        }}>
          {TESTIMONIALS.map(({ name, role, text }, i) => (
            <div
              key={name}
              className="animate-fadeInUp"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-mid)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px 24px 20px',
                animationDelay: `${i * 120}ms`,
                position: 'relative',
                transition: 'var(--transition)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--border-rose)'
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border-mid)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{
                fontSize: 36, color: 'var(--rose-dim)',
                fontFamily: 'var(--font-display)', lineHeight: 1,
                marginBottom: 14,
              }}>"</div>
              <p style={{
                fontSize: 14, color: 'var(--text-secondary)',
                lineHeight: 1.7, marginBottom: 20, fontStyle: 'italic',
              }}>{text}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--rose-deep), var(--rose-gold))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, color: '#fff', fontWeight: 700,
                  fontFamily: 'var(--font-display)',
                }}>
                  {name[0]}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════ CTA BANNER ════ */}
      <section style={{ marginBottom: 96, position: 'relative', overflow: 'hidden' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(158,61,88,0.12) 0%, rgba(201,116,138,0.08) 50%, rgba(158,61,88,0.05) 100%)',
          border: '1px solid var(--border-rose)',
          borderRadius: 'var(--radius-xl)',
          padding: '64px 48px',
          textAlign: 'center',
          position: 'relative', overflow: 'hidden',
          animation: 'borderGlow 4s ease-in-out infinite',
        }}>
          {/* Orbs inside banner */}
          <div className="orb orb-rose" style={{ width: 300, height: 300, top: -80, left: '50%', transform: 'translateX(-50%)', opacity: 0.5 }} />
          <div className="orb orb-gold" style={{ width: 150, height: 150, bottom: -40, right: '10%', opacity: 0.4 }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 700, fontStyle: 'italic',
              letterSpacing: '0.01em', marginBottom: 16,
            }}>
              Ready to build on <span className="text-rose-shimmer">WeilChain?</span>
            </h2>
            <p style={{
              color: 'var(--text-secondary)', fontSize: 15,
              marginBottom: 36, maxWidth: 420, margin: '0 auto 36px',
              lineHeight: 1.75,
            }}>
              Deploy your first applet and start earning WUSD from every single invocation. Join 732+ builders today.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/deploy" style={{ textDecoration: 'none' }}>
                <button className="btn-rose" style={{ fontSize: 12, padding: '14px 36px' }}>
                  <Zap size={14} />
                  Deploy Your First Applet
                  <ArrowRight size={14} />
                </button>
              </Link>
              <Link to="/marketplace" style={{ textDecoration: 'none' }}>
                <button className="btn-ghost-rose" style={{ fontSize: 12, padding: '14px 28px' }}>
                  Explore Marketplace
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
