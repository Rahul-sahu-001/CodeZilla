import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import {
  LayoutGrid, Zap, GitBranch, ArrowRight,
  Activity, Box, Users, TrendingUp,
  Star, Play, ChevronRight, ArrowUpRight, Shield
} from 'lucide-react'

/* ── DATA ── */
const STATS = [
  { label: 'Applets',    value: '1,284', sub: '+12 this week',  icon: Box,        color: '#a78bfa' },
  { label: 'Executions', value: '48.3K', sub: 'all time',       icon: Activity,   color: '#22d3ee' },
  { label: 'Builders',   value: '732',   sub: 'active now',     icon: Users,      color: '#f0c87a' },
  { label: 'Volume',     value: '$2.1M', sub: 'WUSD total',     icon: TrendingUp, color: '#34d399' },
]

const FEATURED = [
  { name: 'AI Data Analyzer',       cat: 'AI/ML',    price: '5.00',  rating: 4.8, color: '#a78bfa' },
  { name: 'Contract Auditor',       cat: 'Security', price: '12.50', rating: 4.9, color: '#22d3ee' },
  { name: 'Price Oracle Feed',      cat: 'Oracle',   price: '0.50',  rating: 4.7, color: '#f0c87a' },
  { name: 'WUSD Payment Router',    cat: 'DeFi',     price: '1.00',  rating: 4.6, color: '#34d399' },
  { name: 'NFT Metadata Generator', cat: 'NFT',      price: '3.00',  rating: 4.5, color: '#f472b6' },
]

const ACTIVITIES = [
  { action: 'invoked',  applet: 'AI Analyzer',   wallet: '0x3f2a...9b1c', time: '2m ago',  color: '#34d399' },
  { action: 'deployed', applet: 'NFT Generator', wallet: '0x91bc...4a2e', time: '8m ago',  color: '#a78bfa' },
  { action: 'invoked',  applet: 'Price Oracle',  wallet: '0x44ef...7d3b', time: '15m ago', color: '#22d3ee' },
  { action: 'invoked',  applet: 'WUSD Router',   wallet: '0x77da...1f9c', time: '21m ago', color: '#f0c87a' },
]

const FEATURES = [
  { title: 'Marketplace',      desc: 'Browse 1,284 live applets across 7 categories.',    icon: LayoutGrid, color: '#a78bfa', link: '/marketplace' },
  { title: 'Workflow Builder', desc: 'Chain applets into automated on-chain pipelines.',   icon: GitBranch,  color: '#22d3ee', link: '/workflow'    },
  { title: 'Deploy Applet',    desc: 'Publish your applet and earn WUSD per call.',        icon: Zap,        color: '#f0c87a', link: '/deploy'      },
]

/* ── STAR FIELD ── */
function StarField() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W = canvas.width  = window.innerWidth
    let H = canvas.height = window.innerHeight
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.5 + 0.2,
      o: Math.random(), speed: Math.random() * 0.3 + 0.05,
    }))
    let raf
    function draw() {
      ctx.clearRect(0, 0, W, H)
      stars.forEach(s => {
        s.o += s.speed * 0.015
        if (s.o > 1) s.o = 0
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${0.3 + Math.abs(Math.sin(s.o)) * 0.7})`
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight }
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.7 }} />
}

/* ── 3D PLANET ── */
function Planet() {
  const mountRef = useRef(null)
  useEffect(() => {
    const el = mountRef.current
    const W = el.clientWidth, H = el.clientHeight
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100)
    camera.position.z = 3.2

    /* ── Planet sphere ── */
    const geo = new THREE.SphereGeometry(1, 64, 64)

    /* Procedural texture via canvas */
    const texCanvas = document.createElement('canvas')
    texCanvas.width = 1024; texCanvas.height = 512
    const tc = texCanvas.getContext('2d')

    /* Base deep space color */
    const bg = tc.createLinearGradient(0, 0, 1024, 512)
    bg.addColorStop(0,   '#0d0020')
    bg.addColorStop(0.3, '#1a0040')
    bg.addColorStop(0.6, '#0a1040')
    bg.addColorStop(1,   '#050818')
    tc.fillStyle = bg; tc.fillRect(0, 0, 1024, 512)

    /* Continent-like patches */
    const patches = [
      { x: 200, y: 150, rx: 120, ry: 80,  color: '#2d1b69' },
      { x: 500, y: 200, rx: 180, ry: 100, color: '#1e3a5f' },
      { x: 750, y: 300, rx: 140, ry: 90,  color: '#2d1b69' },
      { x: 300, y: 350, rx: 160, ry: 70,  color: '#0d3b5e' },
      { x: 850, y: 150, rx: 100, ry: 60,  color: '#1a0050' },
    ]
    patches.forEach(p => {
      const g = tc.createRadialGradient(p.x, p.y, 0, p.x, p.y, Math.max(p.rx, p.ry))
      g.addColorStop(0, p.color + 'ff')
      g.addColorStop(1, p.color + '00')
      tc.fillStyle = g
      tc.beginPath()
      tc.ellipse(p.x, p.y, p.rx, p.ry, 0, 0, Math.PI * 2)
      tc.fill()
    })

    /* Glowing lines / atmosphere streaks */
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * 1024, y = Math.random() * 512
      const g = tc.createRadialGradient(x, y, 0, x, y, 60)
      g.addColorStop(0, 'rgba(167,139,250,0.3)')
      g.addColorStop(1, 'rgba(167,139,250,0)')
      tc.fillStyle = g; tc.fillRect(x - 60, y - 60, 120, 120)
    }
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * 1024, y = Math.random() * 512
      const g = tc.createRadialGradient(x, y, 0, x, y, 40)
      g.addColorStop(0, 'rgba(34,211,238,0.25)')
      g.addColorStop(1, 'rgba(34,211,238,0)')
      tc.fillStyle = g; tc.fillRect(x - 40, y - 40, 80, 80)
    }

    const texture = new THREE.CanvasTexture(texCanvas)
    const mat = new THREE.MeshPhongMaterial({
      map: texture,
      specular: new THREE.Color('#a78bfa'),
      shininess: 60,
    })
    const planet = new THREE.Mesh(geo, mat)
    scene.add(planet)

    /* ── Atmosphere glow ── */
    const atmGeo = new THREE.SphereGeometry(1.08, 64, 64)
    const atmMat = new THREE.MeshPhongMaterial({
      color: new THREE.Color('#7c3aed'),
      transparent: true, opacity: 0.12,
      side: THREE.FrontSide,
    })
    scene.add(new THREE.Mesh(atmGeo, atmMat))

    /* ── Ring ── */
    const ringGeo = new THREE.RingGeometry(1.35, 1.85, 128)
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#a78bfa'),
      transparent: true, opacity: 0.18,
      side: THREE.DoubleSide,
    })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = Math.PI / 2.8
    scene.add(ring)

    /* ── Lights ── */
    const ambient = new THREE.AmbientLight('#ffffff', 0.3)
    scene.add(ambient)
    const sun = new THREE.DirectionalLight('#c4b5fd', 2.5)
    sun.position.set(3, 2, 2)
    scene.add(sun)
    const rimLight = new THREE.DirectionalLight('#22d3ee', 0.8)
    rimLight.position.set(-3, -1, -2)
    scene.add(rimLight)

    /* ── Animate ── */
    let frame
    const animate = () => {
      frame = requestAnimationFrame(animate)
      planet.rotation.y += 0.0025
      ring.rotation.z   += 0.001
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frame)
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div ref={mountRef} style={{
      width: '100%', height: '100%',
      position: 'absolute', inset: 0,
      filter: 'drop-shadow(0 0 60px rgba(124,58,237,0.5)) drop-shadow(0 0 120px rgba(34,211,238,0.2))',
    }} />
  )
}

/* ══════════════
   MAIN COMPONENT
══════════════ */
export default function Home() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { const t = setTimeout(() => setMounted(true), 100); return () => clearTimeout(t) }, [])

  const card = {
    background: 'rgba(10,5,30,0.7)',
    border: '1px solid rgba(167,139,250,0.15)',
    borderRadius: 20,
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    position: 'relative', overflow: 'hidden',
  }

  return (
    <div style={{ minHeight: '100vh', background: 'transparent', position: 'relative' }}>

      {/* Stars */}
      <StarField />

      {/* Nebula background */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 80% 60% at 70% 40%, rgba(124,58,237,0.18) 0%, transparent 60%),
          radial-gradient(ellipse 60% 50% at 20% 70%, rgba(34,211,238,0.12) 0%, transparent 55%),
          radial-gradient(ellipse 100% 80% at 50% 0%,   rgba(167,139,250,0.08) 0%, transparent 50%),
          linear-gradient(135deg, #020008 0%, #030012 40%, #020010 70%, #010008 100%)
        `,
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1400, margin: '0 auto', padding: '0 32px 80px' }}>

        {/* ══════════════════════
            HERO SECTION
        ══════════════════════ */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          minHeight: '88vh', alignItems: 'center', gap: 40,
          paddingTop: 80,
        }}>

          {/* LEFT: Text */}
          <div style={{
            animation: mounted ? 'fadeInLeft 0.9s cubic-bezier(0.16,1,0.3,1) both' : 'none',
          }}>
            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 16px', borderRadius: 30,
              background: 'rgba(167,139,250,0.1)',
              border: '1px solid rgba(167,139,250,0.3)',
              marginBottom: 28,
              animation: mounted ? 'fadeInUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s both' : 'none',
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#a78bfa', boxShadow: '0 0 8px #a78bfa', animation: 'pulse 2s ease-in-out infinite' }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: '#a78bfa', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'var(--font-display)' }}>
                Web4 On-Chain Marketplace
              </span>
            </div>

            {/* Main heading */}
            <div style={{ marginBottom: 24 }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontWeight: 800,
                fontSize: 'clamp(44px, 5.5vw, 78px)',
                lineHeight: 0.95, letterSpacing: '-0.04em',
                color: '#ffffff',
                animation: mounted ? 'fadeInUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both' : 'none',
              }}>
                DISCOVER
              </div>
              <div style={{
                fontFamily: 'var(--font-display)', fontWeight: 800,
                fontSize: 'clamp(44px, 5.5vw, 78px)',
                lineHeight: 0.95, letterSpacing: '-0.04em',
                background: 'linear-gradient(90deg, #a78bfa 0%, #22d3ee 50%, #a78bfa 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: mounted ? 'fadeInUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s both, nebulaShimmer 4s linear infinite' : 'none',
              }}>
                & DEPLOY
              </div>
              <div style={{
                fontFamily: 'var(--font-display)', fontWeight: 300,
                fontSize: 'clamp(18px, 2.2vw, 28px)',
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'rgba(167,139,250,0.7)', marginTop: 10,
                animation: mounted ? 'fadeInUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s both' : 'none',
              }}>
                Intelligent Applets
              </div>
            </div>

            <p style={{
              fontSize: 15, color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.8, marginBottom: 36, maxWidth: 460,
              fontFamily: 'var(--font-body)',
              animation: mounted ? 'fadeInUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s both' : 'none',
            }}>
              Browse, invoke, and compose on-chain applets powering the next generation of decentralized applications on WeilChain. Earn WUSD with every invocation.
            </p>

            {/* Buttons */}
            <div style={{
              display: 'flex', gap: 14, flexWrap: 'wrap',
              animation: mounted ? 'fadeInUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s both' : 'none',
            }}>
              <Link to="/marketplace" style={{ textDecoration: 'none' }}>
                <button style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '13px 28px',
                  background: 'linear-gradient(135deg, #7c3aed, #a78bfa, #22d3ee)',
                  backgroundSize: '200% 100%',
                  border: 'none', borderRadius: 10,
                  color: '#fff', fontWeight: 800, fontSize: 11,
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  cursor: 'pointer',
                  boxShadow: '0 4px 30px rgba(124,58,237,0.4)',
                  transition: 'all 0.3s ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 50px rgba(124,58,237,0.6)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 30px rgba(124,58,237,0.4)' }}
                >
                  <LayoutGrid size={13} /> Browse Marketplace <ArrowRight size={13} />
                </button>
              </Link>
              <Link to="/deploy" style={{ textDecoration: 'none' }}>
                <button style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '13px 28px',
                  background: 'rgba(167,139,250,0.08)',
                  border: '1px solid rgba(167,139,250,0.3)',
                  borderRadius: 10, color: 'rgba(167,139,250,0.9)',
                  fontWeight: 700, fontSize: 11,
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(167,139,250,0.15)'; e.currentTarget.style.borderColor = '#a78bfa'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(167,139,250,0.08)'; e.currentTarget.style.borderColor = 'rgba(167,139,250,0.3)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <Zap size={13} /> Deploy Applet
                </button>
              </Link>
            </div>

            {/* Stats row */}
            <div style={{
              display: 'flex', gap: 28, marginTop: 48, flexWrap: 'wrap',
              animation: mounted ? 'fadeInUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.7s both' : 'none',
            }}>
              {STATS.map(({ label, value, color }) => (
                <div key={label}>
                  <div style={{ fontSize: 24, fontWeight: 800, fontFamily: 'var(--font-display)', letterSpacing: '-0.03em', color, lineHeight: 1 }}>{value}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: 3D Planet */}
          <div style={{
            position: 'relative', height: 520,
            animation: mounted ? 'fadeIn 1.2s ease 0.3s both' : 'none',
          }}>
            <Planet />
            {/* Glow ring underneath */}
            <div style={{
              position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
              width: 300, height: 40,
              background: 'radial-gradient(ellipse, rgba(124,58,237,0.4) 0%, transparent 70%)',
              filter: 'blur(20px)', pointerEvents: 'none',
            }} />
          </div>
        </div>

        {/* ══════════════════════
            BENTO GRID
        ══════════════════════ */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 300px', gap: 14, marginTop: 20 }}>

          {/* Feature Cards */}
          {FEATURES.map(({ title, desc, icon: Icon, color, link }, i) => (
            <div key={title} style={{
              ...card,
              padding: '26px 24px 22px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
              animation: mounted ? `fadeInUp 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 100 + 200}ms both` : 'none',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = color + '50'; e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = `0 24px 60px rgba(0,0,0,0.5), 0 0 40px ${color}20` }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(167,139,250,0.15)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120, background: `radial-gradient(circle at 100% 0%, ${color}15 0%, transparent 70%)`, pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${color}80, transparent)` }} />
              <div>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: `${color}15`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <Icon size={20} color={color} />
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, fontFamily: 'var(--font-display)', letterSpacing: '-0.01em', marginBottom: 8, color: '#fff' }}>{title}</div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>{desc}</p>
              </div>
              <Link to={link} style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 20, fontSize: 10, fontWeight: 700, color, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-display)', transition: 'gap 0.2s ease' }}
                onMouseEnter={e => e.currentTarget.style.gap = '10px'}
                onMouseLeave={e => e.currentTarget.style.gap = '6px'}
              >
                Explore <ArrowUpRight size={13} />
              </Link>
            </div>
          ))}

          {/* Live Activity Feed */}
          <div style={{
            ...card,
            gridRow: '1 / 3', padding: '24px 20px',
            display: 'flex', flexDirection: 'column',
            animation: mounted ? 'fadeInRight 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s both' : 'none',
          }}>
            <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 2, background: 'linear-gradient(90deg, transparent, #22d3ee, transparent)' }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-display)', color: '#fff' }}>Live Activity</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)', marginTop: 3 }}>Real-time chain events</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ position: 'relative', width: 7, height: 7 }}>
                  <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#34d399', animation: 'glowPing 1.5s ease-out infinite', opacity: 0.5 }} />
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#34d399', position: 'relative', zIndex: 1 }} />
                </div>
                <span style={{ fontSize: 9, color: '#34d399', fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.1em' }}>LIVE</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
              {ACTIVITIES.map(({ action, applet, wallet, time, color }, i) => (
                <div key={i} style={{
                  padding: '12px 14px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 10, transition: 'all 0.25s ease',
                  animation: mounted ? `fadeInUp 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 80 + 400}ms both` : 'none',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = color + '40'; e.currentTarget.style.background = color + '08' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color, fontFamily: 'var(--font-display)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{action}</span>
                    <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-mono)' }}>{time}</span>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', marginBottom: 3, fontFamily: 'var(--font-display)' }}>{applet}</div>
                  <div style={{ fontSize: 10, color: 'rgba(167,139,250,0.6)', fontFamily: 'var(--font-mono)' }}>{wallet}</div>
                </div>
              ))}
            </div>
            <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '14px 0 12px' }} />
            <Link to="/marketplace" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 10, color: '#22d3ee', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-display)', transition: 'gap 0.2s ease' }}
              onMouseEnter={e => e.currentTarget.style.gap = '10px'}
              onMouseLeave={e => e.currentTarget.style.gap = '6px'}
            >
              View all <ChevronRight size={12} />
            </Link>
          </div>

          {/* Top Applets Table */}
          <div style={{
            ...card,
            gridColumn: '1 / 4', padding: '26px 28px',
            animation: mounted ? 'fadeInUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s both' : 'none',
          }}>
            <div style={{ position: 'absolute', top: 0, left: '5%', right: '5%', height: 2, background: 'linear-gradient(90deg, transparent, #a78bfa, #22d3ee, #a78bfa, transparent)' }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, fontFamily: 'var(--font-display)', color: '#fff' }}>Top Applets</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)', marginTop: 3 }}>Ranked by executions</div>
              </div>
              <Link to="/marketplace" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: '#a78bfa', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-display)' }}>
                View all <ArrowRight size={12} />
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '28px 1fr 90px 70px 70px 80px', gap: 12, padding: '0 10px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {['#', 'Applet', 'Category', 'Price', 'Rating', ''].map(h => (
                <div key={h} style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{h}</div>
              ))}
            </div>
            {FEATURED.map(({ name, cat, price, rating, color }, i) => (
              <div key={name} style={{
                display: 'grid', gridTemplateColumns: '28px 1fr 90px 70px 70px 80px',
                gap: 12, padding: '14px 10px',
                borderBottom: i < FEATURED.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                transition: 'all 0.25s ease', borderRadius: 8,
                animation: mounted ? `fadeInUp 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 60 + 500}ms both` : 'none',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-mono)', alignSelf: 'center' }}>{String(i+1).padStart(2,'0')}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 9, background: `${color}15`, border: `1px solid ${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color, flexShrink: 0 }}>◆</div>
                  <span style={{ fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-display)', color: '#fff' }}>{name}</span>
                </div>
                <div style={{ alignSelf: 'center' }}>
                  <span style={{ fontSize: 9, color, fontWeight: 700, fontFamily: 'var(--font-display)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{cat}</span>
                </div>
                <div style={{ alignSelf: 'center', fontSize: 13, fontWeight: 700, color: '#34d399', fontFamily: 'var(--font-mono)' }}>{price}</div>
                <div style={{ alignSelf: 'center', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Star size={11} fill="#f0c87a" color="#f0c87a" />
                  <span style={{ fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-display)', color: '#fff' }}>{rating}</span>
                </div>
                <div style={{ alignSelf: 'center' }}>
                  <Link to="/marketplace" style={{
                    textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4,
                    padding: '6px 14px', borderRadius: 6,
                    background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
                    color: '#fff', fontSize: 9, fontWeight: 800,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    fontFamily: 'var(--font-display)',
                    boxShadow: '0 2px 12px rgba(124,58,237,0.3)',
                    transition: 'all 0.2s ease',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(124,58,237,0.5)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(124,58,237,0.3)' }}
                  >
                    <Play size={8} fill="currentColor" /> Run
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Panel */}
          <div style={{
            ...card,
            background: 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(34,211,238,0.08) 100%)',
            border: '1px solid rgba(167,139,250,0.25)',
            padding: '26px 22px',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            animation: mounted ? 'fadeInRight 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s both' : 'none',
          }}>
            <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 2, background: 'linear-gradient(90deg, transparent, #a78bfa, transparent)' }} />
            <div className="orb" style={{ width: 150, height: 150, top: -50, right: -50, background: 'radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)', filter: 'blur(40px)' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ width: 46, height: 46, borderRadius: 12, background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(167,139,250,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, animation: 'pulse 3s ease-in-out infinite' }}>
                <Zap size={22} color="#a78bfa" />
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 12, color: '#fff' }}>
                START BUILDING<br />
                <span style={{ color: '#a78bfa', fontWeight: 300, letterSpacing: '0.06em', fontSize: 14 }}>ON WEILCHAIN</span>
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.75, marginBottom: 22, fontFamily: 'var(--font-body)' }}>
                Deploy your first applet in minutes. Earn WUSD from every execution.
              </p>
            </div>
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link to="/deploy" style={{ textDecoration: 'none' }}>
                <button style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px', background: 'linear-gradient(135deg, #7c3aed, #a78bfa)', border: 'none', borderRadius: 8, color: '#fff', fontWeight: 800, fontSize: 10, fontFamily: 'var(--font-display)', letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', boxShadow: '0 4px 20px rgba(124,58,237,0.35)', transition: 'all 0.3s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(124,58,237,0.55)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(124,58,237,0.35)' }}
                >
                  <Zap size={12} /> Deploy Now <ArrowRight size={12} />
                </button>
              </Link>
              <Link to="/workflow" style={{ textDecoration: 'none' }}>
                <button style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px', background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)', borderRadius: 8, color: 'rgba(167,139,250,0.8)', fontWeight: 700, fontSize: 10, fontFamily: 'var(--font-display)', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', backdropFilter: 'blur(10px)', transition: 'all 0.3s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(167,139,250,0.15)'; e.currentTarget.style.borderColor = '#a78bfa' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(167,139,250,0.08)'; e.currentTarget.style.borderColor = 'rgba(167,139,250,0.2)' }}
                >
                  <GitBranch size={12} /> Build Workflow
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes nebulaShimmer {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse {
          0%,100% { opacity:1; transform: scale(1); }
          50%      { opacity:0.7; transform: scale(0.95); }
        }
        @keyframes fadeInUp {
          from { opacity:0; transform:translateY(32px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeInLeft {
          from { opacity:0; transform:translateX(-32px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity:0; transform:translateX(32px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity:0; }
          to   { opacity:1; }
        }
        @keyframes glowPing {
          0%   { transform:scale(1);   opacity:0.8; }
          100% { transform:scale(3);   opacity:0; }
        }
      `}</style>
    </div>
  )
}
