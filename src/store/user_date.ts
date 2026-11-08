
import { defineStore } from 'pinia'
import { getuserdate } from '../api/services'
import type { UserDate } from '../types/auth'
export const useUserDataStore = defineStore('userdata', {
  state: (): { userdata: UserDate | null } => ({
    userdata: null,
  }),

  getters: {
    name: (state): string => state.userdata?.name || '',
    level: (state): number => state.userdata?.level ?? 0,
    permissions: (state): string[] =>
      state.userdata?.permissions ?? [],
  },

  actions: {
    async getuserdata() {
      try {
        const res = await getuserdate()
        this.userdata = res.data.data
      } catch (error) {
        console.error('Failed to get user data:', error)
        throw error
      }
    },

    clear() {
      this.userdata = null
    },
  },
})
