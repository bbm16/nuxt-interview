<template>
  <div class="min-h-svh bg-slate-100">
    <NavbarComponent />
    <slot />
    <FooterComponent />
  </div>
</template>
<script setup lang="ts">
import { useCarsStore } from '@/stores/cars'

const store = useCarsStore()
const { likedCars } = storeToRefs(store)

// As this generic cars are used for the moment in all the pages, we can trigger the action on the layout
// To avoid redundants
await useAsyncData('generic-cars', () => store.loadGenericCars())

onMounted(() => {
  const cookieLikes = useCookie<string[]>('likes')
  if (cookieLikes.value) {
    likedCars.value = cookieLikes.value
  }
})
</script>
