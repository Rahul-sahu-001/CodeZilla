import { useEffect, useState } from 'react'
import { useApplets } from '../context/AppletContext'
import { useWallet } from '../context/WalletContext'
import AppletCard from '../components/marketplace/AppletCard'
import SearchFilter from '../components/marketplace/SearchFilter'
import AppletInvokeModal from '../components/applets/AppletInvoke'
import { Loader, LayoutGrid, Sparkles } from 'lucide-react'

const DEMO_APPLETS = [
  {
    _id: '1', name: 'AI Data Analyzer', category: 'AI/ML',
    description: 'Analyze datasets with GPT-4 powered insights. Supports CSV, JSON, and SQL queries with natural language processing.',
    price: '5.00', currency: 'WUSD', rating: 4.8, reviews: 142,
    executions: 3820, tags: ['AI', 'Data', 'Analytics'], verified: true, onChainId: 'applet_001',
  },
  {
    _id: '2', name: 'Smart Contract Auditor', category: 'Security',
    description: 'Automated security scanning for Solidity and Rust contracts with on-chain proof of audit and vulnerability reports.',
    price: '12.50', currency: 'WUSD', rating: 4.9, reviews: 89,
    executions: 1240, tags: ['Security', 'Audit', 'DeFi'], verified: true, onChainId: 'applet_002',
  },
  {
    _id: '3', name: 'Price Oracle Feed', category: 'Oracle',
    description: 'Real-time price feeds for 500+ crypto pairs. Each attestation mints a verification NFT for on-chain proof.',
    price: '0.50', currency: 'WUSD', rating: 4.7, reviews: 310,
    executions: 28400, tags: ['Oracle', 'DeFi', 'NFT'], verified: true, onChainId: 'applet_003',
  },
  {
    _id: '4', name: 'WUSD Payment Router', category: 'DeFi',
    description: 'Route stablecoin payments across chains with optimal fee calculation and built-in MEV protection.',
    price: '1.00', currency: 'WUSD', rating: 4.6, reviews: 204,
    executions: 9100, tags: ['DeFi', 'Payments', 'WUSD'], verified: false, onChainId: 'applet_004',
  },
  {
    _id: '5', name: 'NFT Metadata Generator', category: 'NFT',
    description: 'AI-powered metadata and artwork generation for NFT collections with permanent on-chain IPFS storage.',
    price: '3.00', currency: 'WUSD', rating: 4.5, reviews: 67,
    executions: 2200, tags: ['NFT', 'AI', 'Art'], verified: false, onChainId: 'applet_005',
  },
  {
    _id: '6', name: 'DAO Governance Bot', category: 'Governance',
    description: 'Automate DAO proposal creation, voting reminders, quorum tracking, and execution with full audit trail.',
    price: '2.00', currency: 'WUSD', rating: 4.4, reviews: 45,
    executions: 870, tags: ['DAO', 'Governance', 'Automation'], verified: true, onChainId: 'applet_006',
  },
]

const CATEGORIES = ['all', 'AI/ML', 'Security', 'Oracle', 'DeFi', 'NFT', 'Governance']

export default function Marketplace() {
  const { applets, loading, fetchApplets, filters, updateFilters, invokeApplet } = useApplets()
  const { isConnected, address } = useWallet()
  const [display,  setDisplay]  = useState(DEMO_APPLETS)
  const [selected, setSelected] = useState(null)
  const [invoking, setInvoking] = useState(false)

  useEffect(() => { fetchApplets().catch(() => {}) }, [])
  useEffect(() => { if (applets.length > 0) setDisplay(applets) }, [applets])

  const filtered = display.filter(a => {
    const matchCat    = filters.category === 'all' || a.category === filters.category
    const matchSearch = !filters.search ||
      a.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      a.description.toLowerCase().includes(filters.search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div style={{ maxWidth: 1380, margin: '0 auto', padding: '40px 32px' }}>

      {/* ── HEADER ── */}
      <div
        className="animate-fadeInDown"
        style={{ marginBottom: 36 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: 'var(--rose-dim)', border: '1px solid var(--border-rose)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <LayoutGrid size={18} color="var(--rose-bright)" />
          </div>
          <h1 style={{
            fontSize: 32, fontWeight: 700, fontStyle: 'italic',
            letterSpacing: '0.01em',
          }}>
            Applet Marketplace
          </h1>
        </div>
        <p style={{
          color: 'var(--text-muted)', fontSize: 12,
          fontFamily: 'var(--font-mono)',
          marginLeft: 50,
        }}>
          {filtered.length} applets · deployed on WeilChain
        </p>
      </div>

      {/* ── CATEGORY TABS ── */}
      <div
        className="animate-fadeInUp"
        style={{
          display: 'flex', gap: 6, flexWrap: 'wrap',
          marginBottom: 20,
          padding: '5px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-mid)',
          borderRadius: 14,
          width: 'fit-content',
          animationDelay: '100ms',
        }}
      >
        {CATEGORIES.map((cat, i) => (
          <button
            key={cat}
            onClick={() => updateFilters({ category: cat })}
            style={{
              padding: '8px 18px', borderRadius: 10, border: 'none',
              background: filters.category === cat
                ? 'linear-gradient(135deg, var(--rose-deep), var(--rose-gold))'
                : 'transparent',
              color: filters.category === cat ? '#fff' : 'var(--text-secondary)',
              fontSize: 12, fontWeight: filters.category === cat ? 700 : 400,
              cursor: 'pointer', fontFamily: 'var(--font-body)',
              letterSpacing: filters.category === cat ? '0.06em' : '0.03em',
              textTransform: 'uppercase',
              transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
              boxShadow: filters.category === cat ? '0 2px 14px rgba(201,116,138,0.3)' : 'none',
            }}
            onMouseEnter={e => {
              if (filters.category !== cat) {
                e.currentTarget.style.color = 'var(--rose)'
                e.currentTarget.style.background = 'var(--rose-dim)'
              }
            }}
            onMouseLeave={e => {
              if (filters.category !== cat) {
                e.currentTarget.style.color = 'var(--text-secondary)'
                e.currentTarget.style.background = 'transparent'
              }
            }}
          >
            {cat === 'all' ? 'All' : cat}
          </button>
        ))}
      </div>

      {/* ── SEARCH ── */}
      <div className="animate-fadeInUp" style={{ marginBottom: 28, animationDelay: '200ms' }}>
        <SearchFilter
          value={filters.search}
          onChange={v => updateFilters({ search: v })}
          sort={filters.sort}
          onSortChange={v => updateFilters({ sort: v })}
        />
      </div>

      {/* ── GRID ── */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 100 }}>
          <div style={{ position: 'relative' }}>
            <Loader size={32} color="var(--rose-gold)" className="animate-spin" />
            <div style={{
              position: 'absolute', inset: -12,
              borderRadius: '50%',
              animation: 'rosePulse 1.5s ease-in-out infinite',
            }} />
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '100px 0',
          color: 'var(--text-muted)', fontSize: 14,
          fontStyle: 'italic',
        }}>
          No applets found matching your search.
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 14,
        }}>
          {filtered.map((applet, i) => (
            <AppletCard
              key={applet._id}
              applet={applet}
              onInvoke={() => isConnected && (setSelected(applet), setInvoking(true))}
              style={{ animationDelay: `${i * 65}ms` }}
            />
          ))}
        </div>
      )}

      {/* Invoke Modal */}
      {invoking && selected && (
        <AppletInvokeModal
          applet={selected}
          onClose={() => { setInvoking(false); setSelected(null) }}
          onInvoke={params => invokeApplet(selected._id, params, address)}
        />
      )}
    </div>
  )
}
