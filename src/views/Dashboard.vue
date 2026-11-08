<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserDataStore } from '../store/user_date'

const userdataStore = useUserDataStore()

onMounted(async () => {
  console.log('1. component mounted')
  try {
    await userdataStore.getuserdata()
    console.log('4. done', userdataStore.userdata)
  } catch (e) {
    console.log('error', e)
  }
})
</script>   

<template>
  <p>Dashboard</p>
</template>