import { useState } from 'react'
import { Plus, Play, Trash2, ArrowRight, GitBranch, Loader, CheckCircle } from 'lucide-react'
import { useWallet } from '../context/WalletContext'
import toast from 'react-hot-toast'

const AVAILABLE_APPLETS = [
  { id: 'applet_001', name: 'AI Data Analyzer',       category: 'AI/ML',    color: 'var(--accent-bright)' },
  { id: 'applet_002', name: 'Smart Contract Auditor', category: 'Security', color: 'var(--red)'           },
  { id: 'applet_003', name: 'Price Oracle Feed',      category: 'Oracle',   color: 'var(--yellow)'        },
  { id: 'applet_004', name: 'WUSD Payment Router',    category: 'DeFi',     color: 'var(--green)'         },
  { id: 'applet_005', name: 'NFT Metadata Generator', category: 'NFT',      color: 'var(--cyan)'          },
]

export default function Workflow() {
  const { isConnected } = useWallet()
  const [nodes,        setNodes]        = useState([])
  const [running,      setRunning]      = useState(false)
  const [results,      setResults]      = useState([])
  const [workflowName, setWorkflowName] = useState('My Workflow')

  const addNode = (applet) => {
    setNodes(prev => [...prev, {
      id: Date.now(), applet, params: '{}', status: 'idle',
    }])
  }

  const removeNode = (id) => setNodes(prev => prev.filter(n => n.id !== id))

  const updateParams = (id, params) => {
    setNodes(prev => prev.map(n => n.id === id ? { ...n, params } : n))
  }

  const runWorkflow = async () => {
    if (!isConnected) { toast.error('Connect wallet first'); return }
    if (nodes.length === 0) { toast.error('Add at least one applet'); return }
    setRunning(true)
    setResults([])
    const res = []

    for (let i = 0; i < nodes.length; i++) {
      setNodes(prev => prev.map((n, idx) => ({
        ...n,
        status: idx === i ? 'running' : idx < i ? 'done' : 'idle',
      })))
      await new Promise(r => setTimeout(r, 1200 + Math.random() * 800))
      res.push({
        appletName: nodes[i].applet.name,
        txHash: '0x' + Array.from({ length: 16 },
          () => Math.floor(Math.random() * 16).toString(16)).join(''),
        gasUsed: Math.floor(Math.random() * 50000) + 10000,
        status: 'success',
      })
      setResults([...res])
    }

    setNodes(prev => prev.map(n => ({ ...n, status: 'done' })))
    setRunning(false)
    toast.success(`Workflow "${workflowName}" completed!`)
  }

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>

      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', marginBottom: 28,
        flexWrap: 'wrap', gap: 16,
      }}>
        <div>
          <h1 style={{
            fontSize: 28, marginBottom: 8,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <GitBranch size={24} color="var(--accent-bright)" />
            Workflow Builder
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
            Chain applets into powerful automated pipelines
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <input
            value={workflowName}
            onChange={e => setWorkflowName(e.target.value)}
            style={{
              padding: '8px 14px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              color: 'var(--text-primary)',
              fontSize: 13, fontFamily: 'var(--font-mono)', outline: 'none',
            }}
          />
          {results.length > 0 && (
            <button
              onClick={() => {
                setNodes(prev => prev.map(n => ({ ...n, status: 'idle' })))
                setResults([])
              }}
              style={{
                padding: '8px 16px', background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                color: 'var(--text-secondary)',
                cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 13,
              }}>
              Reset
            </button>
          )}
          <button
            onClick={runWorkflow}
            disabled={running || nodes.length === 0}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 20px',
              background: running || nodes.length === 0
                ? 'var(--bg-card)'
                : 'linear-gradient(135deg, var(--accent), #5e35b1)',
              border: `1px solid ${running || nodes.length === 0
                ? 'var(--border)' : 'var(--accent)'}`,
              borderRadius: 'var(--radius)',
              color: running || nodes.length === 0
                ? 'var(--text-muted)' : '#fff',
              fontWeight: 700, fontSize: 13,
              cursor: running || nodes.length === 0 ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--font-mono)',
            }}>
            {running
              ? <><Loader size={14} className="animate-spin" /> Running...</>
              : <><Play size={14} fill="currentColor" /> Run Workflow</>
            }
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '240px 1fr',
        gap: 20, alignItems: 'start',
      }}>

        {/* Applet Palette */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', padding: 16,
        }}>
          <div style={{
            fontSize: 11, color: 'var(--text-muted)',
            marginBottom: 12, letterSpacing: '0.05em',
          }}>
            AVAILABLE APPLETS
          </div>
          {AVAILABLE_APPLETS.map(applet => (
            <button
              key={applet.id}
              onClick={() => addNode(applet)}
              style={{
                width: '100%',
                display: 'flex', alignItems: 'center', gap: 10,
                padding: 10, marginBottom: 6,
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                color: 'var(--text-primary)',
                cursor: 'pointer', fontFamily: 'var(--font-mono)',
                fontSize: 12, transition: 'var(--transition)', textAlign: 'left',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = applet.color}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <Plus size={12} color={applet.color} />
              <div>
                <div style={{ fontWeight: 700, marginBottom: 2 }}>{applet.name}</div>
                <div style={{ fontSize: 10, color: applet.color }}>{applet.category}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Workflow Canvas */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: 20, minHeight: 400,
        }}>
          {nodes.length === 0 ? (
            <div style={{
              height: 300,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: 12, color: 'var(--text-muted)',
            }}>
              <GitBranch size={40} style={{ opacity: 0.3 }} />
              <p style={{ fontSize: 14 }}>
                Add applets from the palette to build your workflow
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {nodes.map((node, idx) => (
                <div key={node.id}>
                  {idx > 0 && (
                    <div style={{
                      display: 'flex', justifyContent: 'center', padding: '4px 0',
                    }}>
                      <ArrowRight size={16} color="var(--border-bright)" />
                    </div>
                  )}
                  <div style={{
                    display: 'grid', gridTemplateColumns: '1fr auto',
                    gap: 12, alignItems: 'start', padding: '14px 16px',
                    background: 'var(--bg-secondary)',
                    border: `1px solid ${
                      node.status === 'running' ? node.applet.color :
                      node.status === 'done'    ? 'var(--green)' : 'var(--border)'
                    }`,
                    borderRadius: 'var(--radius)',
                    transition: 'var(--transition)',
                  }}>
                    <div>
                      <div style={{
                        display: 'flex', alignItems: 'center',
                        gap: 8, marginBottom: 8,
                      }}>
                        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                          #{idx + 1}
                        </span>
                        <span style={{ fontWeight: 700, fontSize: 14 }}>
                          {node.applet.name}
                        </span>
                        {node.status === 'running' && (
                          <Loader size={12} className="animate-spin" color={node.applet.color} />
                        )}
                        {node.status === 'done' && (
                          <CheckCircle size={12} color="var(--green)" />
                        )}
                        <span style={{ fontSize: 11, color: node.applet.color }}>
                          {node.applet.category}
                        </span>
                      </div>
                      <textarea
                        value={node.params}
                        onChange={e => updateParams(node.id, e.target.value)}
                        placeholder="Input params (JSON)"
                        rows={2}
                        style={{
                          width: '100%', padding: '8px 10px', resize: 'none',
                          background: 'var(--bg-card)',
                          border: '1px solid var(--border)',
                          borderRadius: 6,
                          color: 'var(--text-primary)',
                          fontSize: 12, fontFamily: 'var(--font-mono)', outline: 'none',
                        }}
                      />
                    </div>
                    <button
                      onClick={() => removeNode(node.id)}
                      style={{
                        padding: 6, background: 'none',
                        border: '1px solid var(--border)',
                        borderRadius: 6, color: 'var(--text-muted)', cursor: 'pointer',
                      }}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div style={{
          marginTop: 20, background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', padding: 20,
        }}>
          <h3 style={{
            fontSize: 16, marginBottom: 14, color: 'var(--green)',
          }}>
            ✓ Execution Results — On-Chain Audit Trail
          </h3>
          {results.map((r, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', padding: '10px 14px', marginBottom: 6,
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
            }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: 13 }}>
                  #{i + 1} {r.appletName}
                </span>
                <div style={{
                  fontSize: 11, color: 'var(--cyan)',
                  fontFamily: 'var(--font-mono)', marginTop: 2,
                }}>
                  tx: {r.txHash}
                </div>
              </div>
              <div style={{ textAlign: 'right', fontSize: 12 }}>
                <div style={{ color: 'var(--green)' }}>✓ success</div>
                <div style={{ color: 'var(--text-muted)' }}>
                  {r.gasUsed.toLocaleString()} gas
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}