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
        ref="inputTarget"
        class="w-full py-3 outline-none"
        placeholder="Search something here"
        v-model="query"
        @keyup="triggerSearch"
        @focus="openSearch"
      />
      <div
        v-if="isSearchVisible"
        ref="searchTarget"
        data-testid="results"
        class="absolute left-0 top-16 w-full rounded-md border bg-white"
      >
        <div v-if="!queryResultsCars.length" class="p-4">No Results</div>
        <NuxtLink
          v-for="(car, index) in queryResultsCars"
          :to="{ name: 'cars-id', params: { id: car.id } }"
          :key="`query-car-${car.id}-${index}`"
          class="block border-b p-4"
          @click="closeSearch"
        >
          {{ car.name }}
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useSearch } from '@/composables/useSearch'

const { triggerSearch, queryResultsCars, query } = useSearch()
const searchTarget = ref<HTMLElement>()
const inputTarget = ref<HTMLInputElement>()
const isSearchVisible = ref<boolean>(false)

const openSearch = () => {
  isSearchVisible.value = true
}

const closeSearch = () => {
  query.value = ''
  isSearchVisible.value = false
}

onClickOutside(searchTarget, closeSearch, { ignore: [inputTarget] })
</script>
