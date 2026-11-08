
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { refreshToken } from '../api/services'
import type { AuthUser, AuthResponse } from '../types/auth'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref(localStorage.getItem('access_token') || '')

  const refreshTokenVal = ref('')

  const user = ref<AuthUser | null>(null)

  const permission = ref<string[]>([])

  const isLoggedIn = computed(() => !!accessToken.value)

  // Login
  function setAuth(data: AuthResponse) {
    if (!data?.access_token) {
      console.error('setAuth: missing access_token', data)
      return
    }

    accessToken.value = data.access_token
    localStorage.setItem('access_token', data.access_token)
  }

  // Refresh token
  async function refresh() {
    const { data } = await refreshToken()
    const res = data.data as AuthResponse

    accessToken.value = res.access_token
    localStorage.setItem('access_token', res.access_token)

    // Only update these if backend provides actual values
    if (res.refresh_token) {
      refreshTokenVal.value = res.refresh_token
    }

    if (res.permissions) {
      permission.value = res.permissions
    }
  }

  // Logout
  function logout() {
    accessToken.value = ''
    refreshTokenVal.value = ''
    user.value = null
    permission.value = []

    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user')
    localStorage.removeItem('permissions')
  }

  return {
    accessToken,
    refreshTokenVal,
    user,
    permission,
    isLoggedIn,
    setAuth,
    refresh,
    logout,
  }
})
