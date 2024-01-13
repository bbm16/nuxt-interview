<template>
  <div class="min-w-full rounded-md border bg-primary p-6 text-white">
    <div class="md:max-w-64">
      <h2 class="md:text-2xl">{{ props.headerCardInfo.title }}</h2>
      <div class="mt-3 text-xs font-light md:mt-4 md:text-base">
        {{ props.headerCardInfo.description }}
      </div>
      <button
        class="mt-5 rounded-md bg-secondary px-5 py-3 text-xs md:text-base"
      >
        {{ props.headerCardInfo.cta }}
      </button>
    </div>
    <img
      :src="`/images/${props.headerCardInfo.image}`"
      alt="car"
      class="m-auto mt-4 w-52"
    />
  </div>
</template>
<script lang="ts" setup>
import type { HeaderCard } from '@/models'

const props = defineProps<{
  headerCardInfo: HeaderCard
}>()
</script>
