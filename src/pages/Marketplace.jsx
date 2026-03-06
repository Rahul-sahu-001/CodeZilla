import { useEffect, useState } from 'react'
import { useApplets } from '../context/AppletContext'
import { useWallet } from '../context/WalletContext'
import AppletCard from '../components/marketplace/AppletCard'
import SearchFilter from '../components/marketplace/SearchFilter'
import AppletInvokeModal from '../components/applets/AppletInvoke'
import { Loader } from 'lucide-react'

const DEMO_APPLETS = [
  {
    _id: '1', name: 'AI Data Analyzer', category: 'AI/ML',
    description: 'Analyze datasets with GPT-4 powered insights. Supports CSV, JSON, and SQL queries.',
    price: '5.00', currency: 'WUSD', rating: 4.8, reviews: 142,
    executions: 3820, tags: ['AI', 'Data', 'Analytics'],
    verified: true, onChainId: 'applet_001',
  },
  {
    _id: '2', name: 'Smart Contract Auditor', category: 'Security',
    description: 'Automated security scanning for Solidity and Rust contracts with on-chain proof.',
    price: '12.50', currency: 'WUSD', rating: 4.9, reviews: 89,
    executions: 1240, tags: ['Security', 'Audit', 'DeFi'],
    verified: true, onChainId: 'applet_002',
  },
  {
    _id: '3', name: 'Price Oracle Feed', category: 'Oracle',
    description: 'Real-time price feeds for 500+ crypto pairs. Attestation NFT minted per call.',
    price: '0.50', currency: 'WUSD', rating: 4.7, reviews: 310,
    executions: 28400, tags: ['Oracle', 'DeFi', 'NFT'],
    verified: true, onChainId: 'applet_003',
  },
  {
    _id: '4', name: 'WUSD Payment Router', category: 'DeFi',
    description: 'Route stablecoin payments across chains with optimal fee calculation.',
    price: '1.00', currency: 'WUSD', rating: 4.6, reviews: 204,
    executions: 9100, tags: ['DeFi', 'Payments', 'WUSD'],
    verified: false, onChainId: 'applet_004',
  },
  {
    _id: '5', name: 'NFT Metadata Generator', category: 'NFT',
    description: 'AI-powered metadata and artwork generation for NFT collections.',
    price: '3.00', currency: 'WUSD', rating: 4.5, reviews: 67,
    executions: 2200, tags: ['NFT', 'AI', 'Art'],
    verified: false, onChainId: 'applet_005',
  },
  {
    _id: '6', name: 'DAO Governance Bot', category: 'Governance',
    description: 'Automate DAO proposal creation, voting reminders, and result execution.',
    price: '2.00', currency: 'WUSD', rating: 4.4, reviews: 45,
    executions: 870, tags: ['DAO', 'Governance', 'Automation'],
    verified: true, onChainId: 'applet_006',
  },
]

const CATEGORIES = ['all', 'AI/ML', 'Security', 'Oracle', 'DeFi', 'NFT', 'Governance']

export default function Marketplace() {
  const { applets, loading, fetchApplets, filters, updateFilters, invokeApplet } = useApplets()
  const { isConnected, address } = useWallet()
  const [display,  setDisplay]  = useState(DEMO_APPLETS)
  const [selected, setSelected] = useState(null)
  const [invoking, setInvoking] = useState(false)

  useEffect(() => {
    fetchApplets().catch(() => {})
  }, [])

  useEffect(() => {
    if (applets.length > 0) setDisplay(applets)
  }, [applets])

  const filtered = display.filter(a => {
    const matchCat    = filters.category === 'all' || a.category === filters.category
    const matchSearch = !filters.search ||
      a.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      a.description.toLowerCase().includes(filters.search.toLowerCase())
    return matchCat && matchSearch
  })

  const handleInvoke = (applet) => {
    if (!isConnected) return
    setSelected(applet)
    setInvoking(true)
  }

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 32, marginBottom: 8 }}>
          Applet Marketplace
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
          {filtered.length} applets deployed on WeilChain
        </p>
      </div>

      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => updateFilters({ category: cat })}
            style={{
              padding: '6px 14px', borderRadius: 20,
              border: `1px solid ${filters.category === cat
                ? 'var(--accent)' : 'var(--border)'}`,
              background: filters.category === cat
                ? 'var(--accent-glow)' : 'transparent',
              color: filters.category === cat
                ? 'var(--accent-bright)' : 'var(--text-secondary)',
              fontSize: 12, fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              transition: 'var(--transition)',
              textTransform: 'capitalize',
            }}
          >
            {cat === 'all' ? 'All' : cat}
          </button>
        ))}
      </div>

      {/* Search + Sort */}
      <SearchFilter
        value={filters.search}
        onChange={v => updateFilters({ search: v })}
        sort={filters.sort}
        onSortChange={v => updateFilters({ sort: v })}
      />

      {/* Applet Grid */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
          <Loader size={32} color="var(--accent-bright)" className="animate-spin" />
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 16, marginTop: 20,
        }}>
          {filtered.map((applet, i) => (
            <AppletCard
              key={applet._id}
              applet={applet}
              onInvoke={() => handleInvoke(applet)}
              style={{ animationDelay: `${i * 60}ms` }}
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