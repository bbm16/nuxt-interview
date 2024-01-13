<template>
  <section class="m-auto mt-8 max-w-screen-xl px-6">
    <div class="flex gap-8 overflow-y-auto md:grid md:grid-cols-2">
      <HeaderCardComponent
        v-for="(card, key) in headerCards"
        :key="`header-card-${key}`"
        :headerCardInfo="card"
      />
    </div>
    <div class="flex justify-between py-5">
      <span>Popular Car</span>
      <a href="#" class="font-bold text-primary">View All</a>
    </div>
    <div class="flex w-full gap-8 overflow-y-auto">
      <CarComponent
        v-for="(car, key) in popularCarsWithLikes"
        :car="car"
        class="min-w-full md:min-w-min"
        :key="`popular-car-${key}`"
        @onToggleLike="carsStore.toggleCarLike"
      />
    </div>
    <div class="flex justify-between py-5">Recommendation Car</div>
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
      <CarComponent
        v-for="(car, key) in genericCarsWithLikes"
        :car="car"
        :key="`generic-car-${key}`"
        @onToggleLike="carsStore.toggleCarLike"
      />
    </div>
    <div class="w-100 py-8 text-center">
      <button
        v-if="isShowMorePagesVisible"
        class="rounded-md bg-primary px-5 py-2 text-white"
        @click="carsStore.loadGenericCars()"
      >
        Show more cars
      </button>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { headerCards } from '@/constants/content'
import { useCarsStore } from '@/stores/cars'

const carsStore = useCarsStore()
const { popularCarsWithLikes, genericCarsWithLikes, isShowMorePagesVisible } =
  storeToRefs(carsStore)

useHead({
  title: `DM Website`,
  meta: [{ name: 'description', content: 'Thats the meta description!' }],
})

await useAsyncData('popular-cars', () => carsStore.loadPopularCars())
</script>
