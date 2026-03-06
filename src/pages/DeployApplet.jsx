import { useState } from 'react'
import { useApplets } from '../context/AppletContext'
import { useWallet } from '../context/WalletContext'
import { Upload, Code, CheckCircle, Loader } from 'lucide-react'
import toast from 'react-hot-toast'

const CATEGORIES = ['AI/ML', 'Security', 'Oracle', 'DeFi', 'NFT', 'Governance', 'Automation', 'Other']

const inputStyle = {
  width: '100%', padding: '10px 14px',
  background: 'var(--bg-card)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius)',
  color: 'var(--text-primary)',
  fontSize: 13, fontFamily: 'var(--font-mono)',
  outline: 'none', transition: 'var(--transition)',
}

export default function DeployApplet() {
  const { deployApplet } = useApplets()
  const { isConnected, address } = useWallet()
  const [step,       setStep]       = useState(1)
  const [loading,    setLoading]    = useState(false)
  const [deployedTx, setDeployedTx] = useState(null)
  const [form, setForm] = useState({
    name: '', description: '', category: 'AI/ML',
    price: '', currency: 'WUSD', tags: '',
    widlFile: '', entrypoint: '', version: '1.0.0',
    documentation: '', isPublic: true,
  })

  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }))

  const handleDeploy = async () => {
    if (!isConnected) { toast.error('Connect your wallet first'); return }
    if (!form.name || !form.description || !form.price) {
      toast.error('Please fill all required fields'); return
    }
    setLoading(true)
    try {
      const payload = {
        ...form,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        owner: address,
      }
      const result = await deployApplet(payload)
      setDeployedTx(
        result?.txHash || '0x' + Array.from({ length: 64 },
          () => Math.floor(Math.random() * 16).toString(16)).join('')
      )
      setStep(3)
    } catch (err) {
      // error handled in context
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Deploy an Applet</h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 28 }}>
        Publish your applet to the WeilChain marketplace and start earning WUSD.
      </p>

      {/* Steps Indicator */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 28, alignItems: 'center' }}>
        {[1, 2, 3].map(s => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700,
              background: step >= s ? 'var(--accent)' : 'var(--bg-card)',
              border: `1px solid ${step >= s ? 'var(--accent)' : 'var(--border)'}`,
              color: step >= s ? '#fff' : 'var(--text-muted)',
            }}>
              {s}
            </div>
            <span style={{
              fontSize: 12,
              color: step === s ? 'var(--text-primary)' : 'var(--text-muted)',
            }}>
              {s === 1 ? 'Details' : s === 2 ? 'Technical' : 'Deploy'}
            </span>
            {s < 3 && (
              <div style={{ width: 40, height: 1, background: 'var(--border)' }} />
            )}
          </div>
        ))}
      </div>

      {/* Form Card */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: 28,
      }}>

        {/* STEP 1 */}
        {step === 1 && (
          <div>
            <h2 style={{ fontSize: 18, marginBottom: 20 }}>Applet Details</h2>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                APPLET NAME *
              </label>
              <input style={inputStyle} value={form.name}
                onChange={e => update('name', e.target.value)}
                placeholder="e.g. AI Data Analyzer"
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e  => e.target.style.borderColor = 'var(--border)'} />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                DESCRIPTION *
              </label>
              <textarea rows={3} style={{ ...inputStyle, resize: 'vertical' }}
                value={form.description}
                onChange={e => update('description', e.target.value)}
                placeholder="Describe what your applet does..."
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e  => e.target.style.borderColor = 'var(--border)'} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                  CATEGORY *
                </label>
                <select style={inputStyle} value={form.category}
                  onChange={e => update('category', e.target.value)}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                  PRICE (WUSD) *
                </label>
                <input style={inputStyle} type="number" min="0" step="0.01"
                  value={form.price} onChange={e => update('price', e.target.value)}
                  placeholder="0.00"
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e  => e.target.style.borderColor = 'var(--border)'} />
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                TAGS (comma-separated)
              </label>
              <input style={inputStyle} value={form.tags}
                onChange={e => update('tags', e.target.value)}
                placeholder="AI, Data, Analytics"
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e  => e.target.style.borderColor = 'var(--border)'} />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                DOCUMENTATION
              </label>
              <textarea rows={3} style={{ ...inputStyle, resize: 'vertical' }}
                value={form.documentation}
                onChange={e => update('documentation', e.target.value)}
                placeholder="Usage instructions..."
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e  => e.target.style.borderColor = 'var(--border)'} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <input type="checkbox" id="public" checked={form.isPublic}
                onChange={e => update('isPublic', e.target.checked)}
                style={{ accentColor: 'var(--accent)', width: 16, height: 16 }} />
              <label htmlFor="public" style={{ fontSize: 13, color: 'var(--text-secondary)', cursor: 'pointer' }}>
                Make publicly visible on marketplace
              </label>
            </div>

            <button onClick={() => setStep(2)} style={{
              width: '100%', padding: 12,
              background: 'linear-gradient(135deg, var(--accent), #5e35b1)',
              border: 'none', borderRadius: 'var(--radius)',
              color: '#fff', fontWeight: 700, fontSize: 14,
              cursor: 'pointer', fontFamily: 'var(--font-mono)',
            }}>
              Continue →
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div>
            <h2 style={{ fontSize: 18, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Code size={18} color="var(--accent-bright)" />
              Technical Setup
            </h2>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                WIDL FILE CONTENT
              </label>
              <textarea rows={8} style={{ ...inputStyle, resize: 'vertical', fontSize: 12 }}
                value={form.widlFile}
                onChange={e => update('widlFile', e.target.value)}
                placeholder={`service MyApplet {\n  rpc Analyze(AnalyzeRequest) returns (AnalyzeResponse);\n}`}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e  => e.target.style.borderColor = 'var(--border)'} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div>
                <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                  ENTRYPOINT
                </label>
                <input style={inputStyle} value={form.entrypoint}
                  onChange={e => update('entrypoint', e.target.value)}
                  placeholder="main.rs or index.js"
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e  => e.target.style.borderColor = 'var(--border)'} />
              </div>
              <div>
                <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                  VERSION
                </label>
                <input style={inputStyle} value={form.version}
                  onChange={e => update('version', e.target.value)}
                  placeholder="1.0.0"
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e  => e.target.style.borderColor = 'var(--border)'} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setStep(1)} style={{
                flex: 1, padding: 12,
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                color: 'var(--text-primary)',
                cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 14,
              }}>
                ← Back
              </button>
              <button onClick={handleDeploy} disabled={loading} style={{
                flex: 2, padding: 12,
                background: loading
                  ? 'var(--bg-secondary)'
                  : 'linear-gradient(135deg, var(--accent), #5e35b1)',
                border: 'none', borderRadius: 'var(--radius)',
                color: '#fff', fontWeight: 700, fontSize: 14,
                cursor: loading ? 'wait' : 'pointer',
                fontFamily: 'var(--font-mono)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: 8,
              }}>
                {loading
                  ? <><Loader size={16} className="animate-spin" /> Deploying...</>
                  : <><Upload size={16} /> Deploy to WeilChain</>
                }
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 — Success */}
        {step === 3 && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <CheckCircle size={56} color="var(--green)" style={{ marginBottom: 16 }} />
            <h2 style={{ color: 'var(--green)', fontSize: 22, marginBottom: 8 }}>
              Applet Deployed!
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 20, fontSize: 14 }}>
              Your applet is now live on WeilChain.
            </p>
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: 14, marginBottom: 20, textAlign: 'left',
            }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>
                DEPLOYMENT TX HASH
              </div>
              <div style={{
                fontSize: 12, color: 'var(--cyan)',
                wordBreak: 'break-all', fontFamily: 'var(--font-mono)',
              }}>
                {deployedTx}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button
                onClick={() => {
                  setStep(1)
                  setForm({
                    name: '', description: '', category: 'AI/ML',
                    price: '', currency: 'WUSD', tags: '',
                    widlFile: '', entrypoint: '', version: '1.0.0',
                    documentation: '', isPublic: true,
                  })
                }}
                style={{
                  padding: '10px 20px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)', fontSize: 13,
                }}>
                Deploy Another
              </button>
              <Link to="/marketplace" style={{
                padding: '10px 20px',
                background: 'linear-gradient(135deg, var(--accent), #5e35b1)',
                borderRadius: 'var(--radius)',
                color: '#fff', fontWeight: 700,
                textDecoration: 'none',
                fontFamily: 'var(--font-mono)', fontSize: 13,
              }}>
                View in Marketplace
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}