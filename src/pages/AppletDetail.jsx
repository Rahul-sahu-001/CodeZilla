import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useApplets } from '../context/AppletContext'
import { useWallet } from '../context/WalletContext'
import AppletInvokeModal from '../components/applets/AppletInvoke'
import { Star, Zap, Shield, ArrowLeft, Play } from 'lucide-react'

const DEMO = {
  _id: '1', name: 'AI Data Analyzer', category: 'AI/ML',
  description: 'A powerful AI-driven data analysis applet that leverages GPT-4 to provide deep insights from any dataset. Supports CSV, JSON, SQL, and natural language queries. Results are stored on-chain for auditability.',
  price: '5.00', currency: 'WUSD', rating: 4.8,
  reviews: 142, executions: 3820,
  owner: '0xabcd...1234',
  tags: ['AI', 'Data', 'Analytics', 'GPT-4'],
  verified: true, onChainId: 'applet_001', version: '2.1.0',
  documentation: 'Pass any dataset as JSON or CSV in the input field. The applet will return structured insights, anomaly detection, and statistical summaries.',
}

export default function AppletDetailPage() {
  const { id } = useParams()
  const { applets, fetchApplets, invokeApplet } = useApplets()
  const { isConnected, address } = useWallet()
  const [invokeOpen, setInvokeOpen] = useState(false)

  useEffect(() => {
    if (applets.length === 0) fetchApplets().catch(() => {})
  }, [])

  const applet = applets.find(a => a._id === id) || { ...DEMO, _id: id }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>

      {/* Back Button */}
      <Link to="/marketplace" style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        color: 'var(--text-muted)', textDecoration: 'none',
        fontSize: 13, marginBottom: 24,
      }}>
        <ArrowLeft size={14} /> Back to Marketplace
      </Link>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 280px',
        gap: 24, alignItems: 'start',
      }}>

        {/* Main Info */}
        <div>
          <div style={{
            display: 'flex', alignItems: 'center',
            gap: 10, marginBottom: 8,
          }}>
            <h1 style={{ fontSize: 28 }}>{applet.name}</h1>
            {applet.verified && <Shield size={18} color="var(--cyan)" />}
          </div>

          {/* Badges */}
          <div style={{
            display: 'flex', gap: 8,
            flexWrap: 'wrap', marginBottom: 20,
          }}>
            <span className="badge badge-purple">{applet.category}</span>
            <span style={{
              display: 'flex', alignItems: 'center', gap: 4,
              fontSize: 13, color: 'var(--text-muted)',
            }}>
              <Star size={12} fill="var(--yellow)" color="var(--yellow)" />
              {applet.rating} ({applet.reviews} reviews)
            </span>
            <span style={{
              display: 'flex', alignItems: 'center', gap: 4,
              fontSize: 13, color: 'var(--text-muted)',
            }}>
              <Zap size={12} color="var(--accent-bright)" />
              {applet.executions?.toLocaleString()} executions
            </span>
          </div>

          {/* Description */}
          <p style={{
            color: 'var(--text-secondary)',
            lineHeight: 1.8, marginBottom: 20,
          }}>
            {applet.description}
          </p>

          {/* Tags */}
          <div style={{
            display: 'flex', gap: 6,
            flexWrap: 'wrap', marginBottom: 24,
          }}>
            {applet.tags?.map(tag => (
              <span key={tag} style={{
                padding: '4px 10px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 4, fontSize: 12,
                color: 'var(--text-muted)',
              }}>
                #{tag}
              </span>
            ))}
          </div>

          {/* Documentation */}
          {applet.documentation && (
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: 20,
            }}>
              <h3 style={{ fontSize: 15, marginBottom: 10 }}>
                Documentation
              </h3>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: 13, lineHeight: 1.8,
              }}>
                {applet.documentation}
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

          {/* Invoke Card */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: 20,
          }}>
            <div style={{
              fontSize: 28, fontWeight: 800,
              color: 'var(--green)',
              fontFamily: 'var(--font-display)',
              marginBottom: 4,
            }}>
              {applet.price} {applet.currency}
            </div>
            <p style={{
              fontSize: 12, color: 'var(--text-muted)',
              marginBottom: 16,
            }}>
              per execution
            </p>
            <button
              onClick={() => isConnected && setInvokeOpen(true)}
              style={{
                width: '100%',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: 8,
                padding: 12,
                background: isConnected
                  ? 'linear-gradient(135deg, var(--accent), #5e35b1)'
                  : 'var(--bg-secondary)',
                border: `1px solid ${isConnected
                  ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: 'var(--radius)',
                color: isConnected ? '#fff' : 'var(--text-muted)',
                fontWeight: 700, fontSize: 14,
                cursor: isConnected ? 'pointer' : 'not-allowed',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <Play size={14} fill="currentColor" />
              {isConnected ? 'Invoke Applet' : 'Connect Wallet'}
            </button>
          </div>

          {/* Metadata */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: 16, fontSize: 12,
          }}>
            {[
              ['On-Chain ID', applet.onChainId],
              ['Version',    applet.version],
              ['Owner',      applet.owner?.slice(0, 12) + '...'],
            ].map(([label, val]) => (
              <div key={label} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '6px 0',
                borderBottom: '1px solid var(--border)',
              }}>
                <span style={{ color: 'var(--text-muted)' }}>{label}</span>
                <span style={{
                  color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-mono)',
                }}>
                  {val}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Invoke Modal */}
      {invokeOpen && (
        <AppletInvokeModal
          applet={applet}
          onClose={() => setInvokeOpen(false)}
          onInvoke={params => invokeApplet(applet._id, params, address)}
        />
      )}

    </div>
  )
}