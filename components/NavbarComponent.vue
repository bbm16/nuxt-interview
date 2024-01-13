<template>
  <nav
    class="grid w-full grid-cols-2 items-center gap-8 border-b bg-white p-6 md:flex md:grid-cols-3"
  >
    <NuxtLink :to="{ name: 'index' }" class="text-4xl font-bold text-primary"
      >DM</NuxtLink
    >
    <button
      class="w-fit justify-self-end rounded-full border bg-white p-3 md:order-3"
    >
      <img src="/icons/heart.svg" class="min-h-6 min-w-6" alt="heart" />
    </button>
    <div
      class="relative col-span-2 flex w-full items-center rounded-full border pe-6 ps-4 md:order-2"
    >
      <img src="/icons/search.svg" class="me-4" alt="search icon" />
      <input
        type="text"
        class="w-full py-3 outline-none"
        placeholder="Search something here"
        v-model="query"
        @keyup="debounceUpdate"
        @focus="openSearch"
      />
      <div
        v-if="isSearchVisible"
        ref="searchTarget"
        data-testid="results"
        class="absolute left-0 top-16 w-full rounded-md border bg-white"
      >
        <div v-if="!queryCars.length" class="p-4">No Results</div>
        <NuxtLink
          :to="{ name: 'cars-id', params: { id } }"
          v-for="{ id, name } in queryCars"
          :key="`query-car-${id}`"
          class="block border-b p-4"
          @click="cleanSearch"
        >
          {{ name }}
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
import { useCarsStore } from '@/stores/cars'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useDebounceFn, onClickOutside } from '@vueuse/core'

const store = useCarsStore()
const { queryCars } = storeToRefs(store)
const searchTarget = ref<HTMLElement>()
const query = ref<string>('')
const isSearchVisible = ref<boolean>(false)

const debounceUpdate = useDebounceFn(() => {
  store.setQuery(query.value)
  store.searchCars()
}, 250)

const openSearch = () => {
  isSearchVisible.value = true
}

const cleanSearch = () => {
  query.value = ''
  store.setQuery('')
  isSearchVisible.value = false
}

onClickOutside(searchTarget, () => {
  isSearchVisible.value = false
})
</script>
