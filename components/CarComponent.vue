<template>
  <div class="flex flex-col justify-between rounded-md bg-white p-6">
    <div class="flex items-center justify-between">
      <span class="font-bold">{{ props.car.name }}</span>
      <button @click="emit('onToggleLike', props.car.id)">
        <img
          v-if="props.car.isLiked"
          src="/icons/heart-fill.svg"
          aria-label="liked heart"
        />
        <img v-else src="/icons/heart-outline.svg" aria-label="unliked heart" />
      </button>
    </div>
    <div class="text-sm">{{ props.car.type }}</div>
    <img :src="props.car.img" class="m-auto my-8" :alt="props.car.name" />
    <div class="flex justify-between">
      <div class="flex">
        <img src="/icons/fuel.svg" alt="fuel icon" class="me-1 h-4 w-4" />
        <span class="text-xs">{{ props.car.gasolineLiter }}L</span>
      </div>
      <div class="flex">
        <img src="/icons/manual.svg" alt="kind icon" class="me-1 h-4 w-4" />
        <span class="text-xs">{{ props.car.kindOfTransition }}</span>
      </div>
      <div class="flex">
        <img src="/icons/people.svg" alt="people icon" class="me-1 h-4 w-4" />
        <span class="text-xs">{{ props.car.people }} People</span>
      </div>
    </div>
    <div class="mt-6 flex items-center justify-between">
      <div>
        <span class="text-xl">${{ props.car.pricePerDay }}/</span>
        <span class="text-xs">day</span>
      </div>
      <NuxtLink
        :to="{ name: 'cars-id', params: { id: props.car.id } }"
        class="rounded-md bg-primary px-5 py-3 text-white"
      >
        Rent Now
      </NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Car } from '@/models'

const emit = defineEmits(['onToggleLike'])

const props = defineProps<{
  car: Car
}>()
</script>
