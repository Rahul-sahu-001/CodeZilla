import { Link } from 'react-router-dom'
import { LayoutGrid, Zap, Shield, GitBranch, ArrowRight, Activity, Box, Users } from 'lucide-react'

const STATS = [
  { label: 'Applets Deployed', value: '1,284', icon: Box },
  { label: 'Total Executions', value: '48,391', icon: Activity },
  { label: 'Active Builders',  value: '732',    icon: Users },
  { label: 'WUSD Volume',      value: '$2.1M',  icon: Zap },
]

const FEATURES = [
  {
    icon: LayoutGrid,
    title: 'Discover Applets',
    desc: 'Browse a growing ecosystem of intelligent, composable on-chain services built by the community.',
    color: 'var(--accent-bright)',
  },
  {
    icon: Zap,
    title: 'Invoke Instantly',
    desc: 'Use your Weil wallet to call any applet with a single click. All transactions are transparent.',
    color: 'var(--cyan)',
  },
  {
    icon: GitBranch,
    title: 'Compose Workflows',
    desc: 'Chain multiple applets into powerful automated pipelines using the visual workflow builder.',
    color: 'var(--green)',
  },
  {
    icon: Shield,
    title: 'On-Chain Audit',
    desc: 'Every invocation is permanently recorded on WeilChain — immutable, verifiable, transparent.',
    color: 'var(--yellow)',
  },
]

export default function Home() {
  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>

      {/* Hero */}
      <section style={{ padding: '80px 0 60px', textAlign: 'center' }}>
        <div className="badge badge-cyan" style={{ marginBottom: 24, display: 'inline-flex' }}>
          <Zap size={10} />
          Built on WeilChain · Web4 DApp Marketplace
        </div>
        <h1 style={{
          fontSize: 'clamp(40px, 6vw, 72px)',
          fontWeight: 800, lineHeight: 1.1, marginBottom: 20,
        }}>
          The On-Chain Applet<br />
          <span style={{
            background: 'linear-gradient(135deg, var(--accent-bright), var(--cyan))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Marketplace
          </span>
        </h1>
        <p style={{
          fontSize: 16, color: 'var(--text-secondary)',
          maxWidth: 540, margin: '0 auto 36px', lineHeight: 1.8,
        }}>
          Discover, invoke, compose and monetize intelligent applets
          deployed on WeilChain. Powered by WUSD stablecoin.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/marketplace" style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '12px 28px',
            background: 'linear-gradient(135deg, var(--accent), #5e35b1)',
            borderRadius: 'var(--radius)', textDecoration: 'none',
            color: '#fff', fontWeight: 700, fontSize: 14,
            fontFamily: 'var(--font-mono)',
            boxShadow: 'var(--shadow-glow)',
          }}>
            <LayoutGrid size={16} />
            Browse Marketplace
            <ArrowRight size={14} />
          </Link>
          <Link to="/deploy" style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '12px 28px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-bright)',
            borderRadius: 'var(--radius)', textDecoration: 'none',
            color: 'var(--text-primary)', fontWeight: 700, fontSize: 14,
            fontFamily: 'var(--font-mono)',
          }}>
            Deploy an Applet
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 16, marginBottom: 60,
      }}>
        {STATS.map(({ label, value, icon: Icon }) => (
          <div key={label} style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: 20,
            display: 'flex', alignItems: 'center', gap: 16,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: 'var(--accent-glow)',
              border: '1px solid var(--accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon size={18} color="var(--accent-bright)" />
            </div>
            <div>
              <div style={{
                fontSize: 22, fontWeight: 800,
                fontFamily: 'var(--font-display)',
              }}>
                {value}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                {label}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section style={{ marginBottom: 80 }}>
        <h2 style={{
          textAlign: 'center', fontSize: 28,
          marginBottom: 36,
        }}>
          Why WeilMarket?
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 16,
        }}>
          {FEATURES.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: 24,
              transition: 'var(--transition)',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = color}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: color + '20',
                border: `1px solid ${color}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 16,
              }}>
                <Icon size={20} color={color} />
              </div>
              <h3 style={{ fontSize: 16, marginBottom: 8 }}>{title}</h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}