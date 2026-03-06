import { createContext, useContext, useState, useCallback } from 'react'
import { api } from '../utils/api'
import toast from 'react-hot-toast'

const AppletContext = createContext(null)

export function AppletProvider({ children }) {
  const [applets,   setApplets]   = useState([])
  const [myApplets, setMyApplets] = useState([])
  const [loading,   setLoading]   = useState(false)
  const [filters,   setFilters]   = useState({
    category: 'all', search: '', sort: 'newest'
  })

  const fetchApplets = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/applets', { params: filters })
      setApplets(data.applets || data)
    } catch (e) {
      // Will use demo data from Marketplace page
    } finally {
      setLoading(false)
    }
  }, [filters])

  const fetchMyApplets = useCallback(async (address) => {
    if (!address) return
    try {
      const { data } = await api.get(`/applets/owner/${address}`)
      setMyApplets(data)
    } catch (e) { console.error(e) }
  }, [])

  const invokeApplet = useCallback(async (id, params, caller) => {
    try {
      const { data } = await api.post(`/applets/${id}/invoke`, {
        params, caller
      })
      toast.success('Applet executed!')
      return data
    } catch (e) {
      toast.error('Invocation failed')
      throw e
    }
  }, [])

  const deployApplet = useCallback(async (payload) => {
    try {
      const { data } = await api.post('/applets', payload)
      toast.success('Deployed on WeilChain!')
      return data
    } catch (e) {
      toast.error('Deployment failed')
      throw e
    }
  }, [])

  return (
    <AppletContext.Provider value={{
      applets, myApplets, loading, filters,
      fetchApplets, fetchMyApplets,
      invokeApplet, deployApplet,
      updateFilters: (f) => setFilters(p => ({ ...p, ...f })),
    }}>
      {children}
    </AppletContext.Provider>
  )
}

export const useApplets = () => useContext(AppletContext)