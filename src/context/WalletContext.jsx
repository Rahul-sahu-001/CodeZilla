import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import toast from 'react-hot-toast'

const WalletContext = createContext(null)

export function WalletProvider({ children }) {
  const [address,     setAddress]     = useState(null)
  const [balance,     setBalance]     = useState('0')
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting,setIsConnecting]= useState(false)

  // Auto-reconnect on page reload
  useEffect(() => {
    const saved = localStorage.getItem('weil_wallet_address')
    if (saved) {
      setAddress(saved)
      setIsConnected(true)
      setBalance('1250.00')
    }
  }, [])

  const connect = useCallback(async () => {
    setIsConnecting(true)
    try {
      if (typeof window.weil !== 'undefined') {
        // Real Weil wallet
        const accounts = await window.weil.request({
          method: 'eth_requestAccounts'
        })
        setAddress(accounts[0])
        setIsConnected(true)
        setBalance('1250.00')
        localStorage.setItem('weil_wallet_address', accounts[0])
        toast.success('Wallet connected!')
      } else {
        // Demo mode — generate mock address
        const mock = '0x' + Array.from({ length: 40 },
          () => Math.floor(Math.random() * 16).toString(16)).join('')
        setAddress(mock)
        setIsConnected(true)
        setBalance('1250.00')
        localStorage.setItem('weil_wallet_address', mock)
        toast.success('Connected (Demo Mode)')
      }
    } catch (e) {
      toast.error('Connection failed')
    } finally {
      setIsConnecting(false)
    }
  }, [])

  const disconnect = useCallback(() => {
    setAddress(null)
    setIsConnected(false)
    setBalance('0')
    localStorage.removeItem('weil_wallet_address')
    toast('Disconnected', { icon: '👋' })
  }, [])

  return (
    <WalletContext.Provider value={{
      address, balance, isConnected, isConnecting,
      connect, disconnect,
    }}>
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => useContext(WalletContext)
