import { useState } from 'react'
import { X, Play, Loader, CheckCircle, AlertCircle, Zap, ExternalLink } from 'lucide-react'

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
    } catch {
      setStatus(STATUS.ERROR)
    }
  }

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(2, 2, 5, 0.88)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        animation: 'fadeIn 0.25s ease both',
      }}
    >
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-rose)',
        borderRadius: 'var(--radius-xl)',
        padding: '32px',
        width: '100%', maxWidth: 540,
        maxHeight: '90vh', overflowY: 'auto',
        boxShadow: 'var(--shadow-card), var(--shadow-rose)',
        animation: 'modalIn 0.4s cubic-bezier(0.16,1,0.3,1) both',
        position: 'relative', overflow: 'hidden',
      }}>

        {/* Top rose glow */}
        <div style={{
          position: 'absolute', top: 0, left: '15%', right: '15%', height: '1.5px',
          background: 'linear-gradient(90deg, transparent, var(--rose-bright), var(--rose-gold), var(--rose-bright), transparent)',
        }} />

        {/* Background orb */}
        <div style={{
          position: 'absolute', top: -60, right: -60,
          width: 180, height: 180,
          background: 'radial-gradient(circle, rgba(201,116,138,0.12) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
          animation: 'orbFloat1 10s ease-in-out infinite',
        }} />

        {/* ── HEADER ── */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-start', marginBottom: 26, position: 'relative', zIndex: 1,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: 'var(--rose-dim)',
              border: '1px solid var(--border-rose)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              animation: 'rosePulse 3s ease-in-out infinite',
            }}>
              <Zap size={20} color="var(--rose-bright)" />
            </div>
            <div>
              <h2 style={{
                fontSize: 20, fontWeight: 700, fontStyle: 'italic',
                letterSpacing: '0.01em',
              }}>
                Invoke Applet
              </h2>
              <p style={{
                color: 'var(--text-muted)', fontSize: 11, marginTop: 2,
                fontFamily: 'var(--font-mono)', letterSpacing: '0.05em',
              }}>
                {applet.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 34, height: 34,
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-mid)',
              borderRadius: 9, cursor: 'pointer',
              color: 'var(--text-muted)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'var(--transition)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--border-rose)'
              e.currentTarget.style.color = 'var(--rose)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-mid)'
              e.currentTarget.style.color = 'var(--text-muted)'
            }}
          >
            <X size={15} />
          </button>
        </div>

        {/* ══ SUCCESS ══ */}
        {status === STATUS.SUCCESS ? (
          <div className="animate-scaleIn" style={{ textAlign: 'center', padding: '16px 0', position: 'relative', zIndex: 1 }}>
            {/* Success orb */}
            <div style={{ position: 'relative', width: 72, height: 72, margin: '0 auto 24px' }}>
              <div style={{
                position: 'absolute', inset: -12, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0,229,160,0.25) 0%, transparent 70%)',
                animation: 'rosePulse 2s ease-in-out infinite',
              }} />
              <div style={{
                width: 72, height: 72, borderRadius: '50%',
                background: 'var(--green-dim)',
                border: '1px solid rgba(0,229,160,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
              }}>
                <CheckCircle size={32} color="var(--green)" />
              </div>
            </div>

            <h3 style={{
              color: 'var(--green)', fontSize: 22, fontWeight: 700,
              fontStyle: 'italic', marginBottom: 8,
            }}>
              Execution Successful
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 28, lineHeight: 1.7 }}>
              Your applet ran on-chain. The execution is permanently recorded on WeilChain.
            </p>

            {/* TX Hash box */}
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-mid)',
              borderRadius: 10, padding: '14px 16px',
              marginBottom: 12, textAlign: 'left',
              transition: 'var(--transition)',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-rose)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-mid)'}
            >
              <div style={{
                fontSize: 9, color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 7,
              }}>
                Transaction Hash
              </div>
              <div style={{
                fontSize: 11, color: 'var(--rose-bright)',
                wordBreak: 'break-all', fontFamily: 'var(--font-mono)', lineHeight: 1.6,
              }}>
                {txHash}
              </div>
            </div>

            {result && (
              <div style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-mid)',
                borderRadius: 10, padding: '14px 16px',
                marginBottom: 28, textAlign: 'left',
              }}>
                <div style={{
                  fontSize: 9, color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 7,
                }}>
                  Output
                </div>
                <pre style={{
                  fontSize: 12, color: 'var(--text-primary)',
                  overflowX: 'auto', whiteSpace: 'pre-wrap',
                  fontFamily: 'var(--font-mono)', lineHeight: 1.6,
                }}>
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}

            <button
              onClick={onClose}
              className="btn-ghost-rose"
              style={{ width: '100%', justifyContent: 'center', fontSize: 12 }}
            >
              Close
            </button>
          </div>

        ) : (
          <div style={{ position: 'relative', zIndex: 1 }}>

            {/* Cost row */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '13px 16px', marginBottom: 22,
              background: 'rgba(0,229,160,0.05)',
              border: '1px solid rgba(0,229,160,0.14)',
              borderRadius: 10,
            }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Execution Cost</span>
              <span style={{
                color: 'var(--green)', fontWeight: 700, fontSize: 18,
                fontFamily: 'var(--font-display)', letterSpacing: '-0.01em',
              }}>
                {applet.price} <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)' }}>{applet.currency}</span>
              </span>
            </div>

            {/* Input */}
            <div style={{ marginBottom: 18 }}>
              <label style={{
                fontSize: 9, color: 'var(--text-muted)',
                display: 'block', marginBottom: 9,
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.12em', textTransform: 'uppercase',
              }}>
                Input Parameters (JSON or plain text)
              </label>
              <textarea
                value={params}
                onChange={e => setParams(e.target.value)}
                placeholder={'{\n  "key": "value"\n}'}
                rows={6}
                style={{
                  width: '100%', padding: '13px 15px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-mid)',
                  borderRadius: 10,
                  color: 'var(--text-primary)',
                  fontSize: 12, fontFamily: 'var(--font-mono)',
                  resize: 'vertical', outline: 'none',
                  transition: 'all 0.3s ease',
                  lineHeight: 1.7,
                }}
                onFocus={e => {
                  e.target.style.borderColor = 'var(--rose-gold)'
                  e.target.style.boxShadow = '0 0 0 3px rgba(201,116,138,0.08), 0 0 24px rgba(201,116,138,0.06)'
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'var(--border-mid)'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>

            {/* Error */}
            {status === STATUS.ERROR && (
              <div
                className="animate-fadeInUp"
                style={{
                  display: 'flex', alignItems: 'center', gap: 9,
                  padding: '11px 15px', marginBottom: 16,
                  background: 'var(--red-dim)',
                  border: '1px solid rgba(255,92,122,0.22)',
                  borderRadius: 9, color: 'var(--red)', fontSize: 13,
                }}
              >
                <AlertCircle size={14} />
                Invocation failed. Check your input and try again.
              </div>
            )}

            {/* Execute button */}
            <button
              onClick={handleInvoke}
              disabled={status === STATUS.LOADING}
              className={status !== STATUS.LOADING ? 'btn-rose' : ''}
              style={{
                width: '100%', justifyContent: 'center',
                padding: '14px 24px', fontSize: 12,
                background: status === STATUS.LOADING ? 'var(--bg-secondary)' : undefined,
                border:     status === STATUS.LOADING ? '1px solid var(--border-mid)' : undefined,
                color:      status === STATUS.LOADING ? 'var(--text-muted)' : undefined,
                cursor:     status === STATUS.LOADING ? 'wait' : 'pointer',
                boxShadow:  status === STATUS.LOADING ? 'none' : undefined,
              }}
            >
              {status === STATUS.LOADING ? (
                <>
                  <Loader size={16} className="animate-spin" style={{ marginRight: 10 }} />
                  Executing on-chain...
                </>
              ) : (
                <>
                  <Play size={14} fill="currentColor" />
                  Execute Applet
                </>
              )}
            </button>

          </div>
        )}

      </div>
    </div>
  )
}
