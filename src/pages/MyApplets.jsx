import { useEffect } from 'react'
import { useWallet } from '../context/WalletContext'
import { useApplets } from '../context/AppletContext'
import { Link } from 'react-router-dom'
import { PlusCircle, Zap, Activity, Star } from 'lucide-react'

const DEMO_MY_APPLETS = [
  {
    _id: 'my1', name: 'My AI Bot', category: 'AI/ML',
    price: '2.00', currency: 'WUSD',
    executions: 156, rating: 4.7, reviews: 12,
    onChainId: 'applet_user_001', status: 'active',
  },
]

export default function MyApplets() {
  const { isConnected, address } = useWallet()
  const { myApplets, fetchMyApplets } = useApplets()

  useEffect(() => {
    if (address) fetchMyApplets(address).catch(() => {})
  }, [address])

  const display = myApplets.length > 0
    ? myApplets
    : (isConnected ? DEMO_MY_APPLETS : [])

  if (!isConnected) {
    return (
      <div style={{
        maxWidth: 600, margin: '80px auto',
        padding: '0 24px', textAlign: 'center',
      }}>
        <h1 style={{ fontSize: 28, marginBottom: 12 }}>My Applets</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
          Connect your wallet to view your deployed applets.
        </p>
        <div style={{
          padding: 40, background: 'var(--bg-card)',
          border: '1px dashed var(--border)',
          borderRadius: 'var(--radius-lg)',
          color: 'var(--text-muted)',
        }}>
          🔌 No wallet connected
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 28,
      }}>
        <h1 style={{ fontSize: 28 }}>My Applets</h1>
        <Link to="/deploy" style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 18px',
          background: 'linear-gradient(135deg, var(--accent), #5e35b1)',
          borderRadius: 'var(--radius)', textDecoration: 'none',
          color: '#fff', fontWeight: 700, fontSize: 13,
          fontFamily: 'var(--font-mono)',
        }}>
          <PlusCircle size={14} /> Deploy New
        </Link>
      </div>

      {display.length === 0 ? (
        <div style={{
          padding: 60, textAlign: 'center',
          background: 'var(--bg-card)',
          border: '1px dashed var(--border)',
          borderRadius: 'var(--radius-lg)',
          color: 'var(--text-muted)',
        }}>
          <Zap size={32} style={{ marginBottom: 12, opacity: 0.4 }} />
          <p>No applets deployed yet.</p>
          <Link to="/deploy" style={{
            color: 'var(--accent-bright)',
            textDecoration: 'none', fontSize: 13,
          }}>
            Deploy your first applet →
          </Link>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 16,
        }}>
          {display.map(applet => (
            <div key={applet._id} style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: 20,
            }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                marginBottom: 12,
              }}>
                <h3 style={{ fontSize: 15 }}>{applet.name}</h3>
                <span style={{
                  padding: '2px 8px', borderRadius: 4, fontSize: 11,
                  background: 'var(--green-dim)', color: 'var(--green)',
                  border: '1px solid rgba(0,255,157,0.3)',
                }}>
                  {applet.status || 'active'}
                </span>
              </div>
              <div style={{
                display: 'flex', gap: 16,
                fontSize: 13, color: 'var(--text-secondary)',
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Activity size={12} color="var(--accent-bright)" />
                  {applet.executions} runs
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Star size={12} fill="var(--yellow)" color="var(--yellow)" />
                  {applet.rating}
                </span>
                <span style={{ color: 'var(--green)' }}>
                  {applet.price} WUSD
                </span>
              </div>
              <div style={{
                marginTop: 12, fontSize: 11,
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
              }}>
                Chain ID: {applet.onChainId}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}