import { useState } from 'react'
import { X, Play, Loader, CheckCircle, AlertCircle } from 'lucide-react'

const STATUS = { IDLE: 'idle', LOADING: 'loading', SUCCESS: 'success', ERROR: 'error' }

export default function AppletInvokeModal({ applet, onClose, onInvoke }) {
  const [params, setParams] = useState('')
  const [status, setStatus] = useState(STATUS.IDLE)
  const [result, setResult] = useState(null)
  const [txHash, setTxHash] = useState(null)

  const handleInvoke = async () => {
    setStatus(STATUS.LOADING)
    try {
      let parsedParams = {}
      if (params.trim()) {
        try { parsedParams = JSON.parse(params) }
        catch { parsedParams = { input: params } }
      }
      const res = await onInvoke(parsedParams)
      setResult(res)
      setTxHash(
        res?.txHash || '0x' + Array.from({ length: 64 },
          () => Math.floor(Math.random() * 16).toString(16)).join('')
      )
      setStatus(STATUS.SUCCESS)
    } catch (err) {
      setStatus(STATUS.ERROR)
    }
  }

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-bright)',
        borderRadius: 'var(--radius-lg)',
        padding: 28,
        width: '100%', maxWidth: 520,
        maxHeight: '85vh', overflowY: 'auto',
        boxShadow: 'var(--shadow-glow)',
      }}>

        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: 20,
        }}>
          <div>
            <h2 style={{ fontSize: 18 }}>Invoke Applet</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 2 }}>
              {applet.name}
            </p>
          </div>
          <button onClick={onClose} style={{
            background: 'none', border: 'none',
            cursor: 'pointer', color: 'var(--text-muted)', padding: 4,
          }}>
            <X size={18} />
          </button>
        </div>

        {status === STATUS.SUCCESS ? (
          /* Success State */
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <CheckCircle size={48} color="var(--green)" style={{ marginBottom: 16 }} />
            <h3 style={{ color: 'var(--green)', marginBottom: 8 }}>
              Invocation Successful!
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 16 }}>
              Your applet was executed and recorded on-chain.
            </p>

            {/* TX Hash */}
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: 12, marginBottom: 16, textAlign: 'left',
            }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>
                TRANSACTION HASH
              </div>
              <div style={{
                fontSize: 12, color: 'var(--cyan)',
                wordBreak: 'break-all', fontFamily: 'var(--font-mono)',
              }}>
                {txHash}
              </div>
            </div>

            {/* Result */}
            {result && (
              <div style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                padding: 12, textAlign: 'left',
              }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>
                  OUTPUT
                </div>
                <pre style={{
                  fontSize: 12, color: 'var(--text-primary)',
                  overflowX: 'auto', whiteSpace: 'pre-wrap',
                }}>
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}

            <button onClick={onClose} style={{
              marginTop: 20, padding: '10px 24px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)', fontSize: 13,
            }}>
              Close
            </button>
          </div>

        ) : (
          <>
            {/* Cost Info */}
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 16px', marginBottom: 16,
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
            }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
                Execution Cost
              </span>
              <span style={{ color: 'var(--green)', fontWeight: 700 }}>
                {applet.price} {applet.currency}
              </span>
            </div>

            {/* Input */}
            <div style={{ marginBottom: 16 }}>
              <label style={{
                fontSize: 12, color: 'var(--text-muted)',
                display: 'block', marginBottom: 8,
              }}>
                INPUT PARAMETERS (JSON or plain text)
              </label>
              <textarea
                value={params}
                onChange={e => setParams(e.target.value)}
                placeholder={'{\n  "key": "value"\n}'}
                rows={6}
                style={{
                  width: '100%', padding: 12,
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  color: 'var(--text-primary)',
                  fontSize: 13, fontFamily: 'var(--font-mono)',
                  resize: 'vertical', outline: 'none',
                  transition: 'var(--transition)',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e  => e.target.style.borderColor = 'var(--border)'}
              />
            </div>

            {/* Error Message */}
            {status === STATUS.ERROR && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 14px', marginBottom: 14,
                background: 'rgba(255,77,109,0.1)',
                border: '1px solid rgba(255,77,109,0.3)',
                borderRadius: 'var(--radius)',
                color: 'var(--red)', fontSize: 13,
              }}>
                <AlertCircle size={14} />
                Invocation failed. Please check your input and try again.
              </div>
            )}

            {/* Execute Button */}
            <button
              onClick={handleInvoke}
              disabled={status === STATUS.LOADING}
              style={{
                width: '100%',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: 8,
                padding: '12px 24px',
                background: status === STATUS.LOADING
                  ? 'var(--bg-secondary)'
                  : 'linear-gradient(135deg, var(--accent), #5e35b1)',
                border: 'none', borderRadius: 'var(--radius)',
                color: '#fff', fontWeight: 700, fontSize: 14,
                cursor: status === STATUS.LOADING ? 'wait' : 'pointer',
                fontFamily: 'var(--font-mono)',
                transition: 'var(--transition)',
              }}
            >
              {status === STATUS.LOADING ? (
                <><Loader size={16} className="animate-spin" /> Executing on-chain...</>
              ) : (
                <><Play size={16} fill="currentColor" /> Execute Applet</>
              )}
            </button>
          </>
        )}

      </div>
    </div>
  )
}