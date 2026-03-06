import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

// Auto-attach auth token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('weil_auth_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Handle errors globally
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('weil_auth_token')
    }
    return Promise.reject(err)
  }
)