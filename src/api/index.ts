import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from 'axios'

import { useAuthStore } from '../store/auth'

interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

interface FailedRequest {
  resolve: (token: string) => void
  reject: (error: AxiosError) => void
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const auth = useAuthStore()

  config.headers.set(
    'x-api-key',
    import.meta.env.VITE_API_KEY_SECRET || 'X7mK9qR2vLp8Nf4TzY6cHd3WsAj5BuEeG1rQn8MxKp7Vt2CyL9sDf4JhUwZk3NaRb',
  )

  config.headers.set(
    'X-Admin-Token',
    import.meta.env.VITE_ADMIN_SECRET || 'X7mK9qR2vLp8Nf4TzY6cHd3WsAj5BuEeG1rQn8MxKp7Vt2CyL9sDf4JhUwZk3NaRb៣៩៨៩៩ឪឧ',
  )

  if (auth.accessToken) {
    config.headers.set('Authorization', `Bearer ${auth.accessToken}`)
  }

  return config
})

let isRefreshing = false
let failedQueue: FailedRequest[] = []

function processQueue(error: AxiosError | null, token = '') {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error)
    else resolve(token)
  })

  failedQueue = []
}

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const auth = useAuthStore()
    const original = error.config as RetryConfig | undefined

    if (error.response?.status !== 401 || !original || original._retry) {
      return Promise.reject(error)
    }

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      }).then((token) => {
        original.headers.set('Authorization', `Bearer ${token}`)
        return api(original)
      })
    }

    original._retry = true
    isRefreshing = true

    try {
      await auth.refresh()

      const newToken = auth.accessToken

      processQueue(null, newToken)

      original.headers.set('Authorization', `Bearer ${newToken}`)

      return api(original)
    } catch (refreshError) {
      processQueue(refreshError as AxiosError)

      auth.logout()

      window.location.href = '/login'

      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  },
)

export default api
