import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { WalletProvider } from './context/WalletContext'
import { AppletProvider } from './context/AppletContext'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/ui/Navbar'
import Home from './pages/Home'
import Marketplace from './pages/Marketplace'
import AppletDetailPage from './pages/AppletDetail'
import MyApplets from './pages/MyApplets'
import DeployApplet from './pages/DeployApplet'
import Workflow from './pages/Workflow'
import './styles/globals.css'

export default function App() {
  return (
    <ThemeProvider>
      <WalletProvider>
        <AppletProvider>
          <BrowserRouter>
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <Navbar />
              <main style={{ flex: 1 }}>
                <Routes>
                  <Route path="/"            element={<Home />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/applet/:id"  element={<AppletDetailPage />} />
                  <Route path="/my-applets"  element={<MyApplets />} />
                  <Route path="/deploy"      element={<DeployApplet />} />
                  <Route path="/workflow"    element={<Workflow />} />
                </Routes>
              </main>
            </div>
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: 'var(--bg-card)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-mid)',
                  fontFamily: 'Raleway, sans-serif',
                  fontSize: '13px',
                },
              }}
            />
          </BrowserRouter>
        </AppletProvider>
      </WalletProvider>
    </ThemeProvider>
  )
}
