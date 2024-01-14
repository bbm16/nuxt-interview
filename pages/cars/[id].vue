<template>
  <section class="m-auto mt-8 max-w-screen-xl px-6">
    <div class="mb-9 flex grid-cols-3 flex-col gap-8 md:grid">
      <div>
        <div class="rounded-md bg-primary p-4 text-white">
          <h1 class="font-semibold md:text-2xl">
            Sports car with the best design and acceleration
          </h1>
          <h2 class="mt-3 text-xs md:text-base">
            Safety and comfort while driving a futuristic and elegant sports car
          </h2>
          <img :src="car!.img" class="m-auto" :alt="car!.name" />
        </div>
        <div class="mt-6 grid grid-cols-3 gap-5">
          <img
            :src="car!.img"
            :alt="car!.name"
            class="h-full w-full rounded-md border-2 border-primary object-cover p-2"
          />
          <img
            v-for="(img, key) in car!.images"
            :src="img.url"
            :key="`img-${key}`"
            class="h-full w-full rounded-md object-cover"
            :alt="`car!.name image ${key}`"
          />
        </div>
      </div>
      <div
        class="flex w-full flex-col justify-between rounded-md bg-white p-4 md:col-span-2"
      >
        <div class="mb-4 flex items-center justify-between">
          <div>
            <h3 class="text-xl font-semibold md:text-3xl">{{ car!.name }}</h3>
            <div class="mt-2 flex items-center gap-1">
              <img
                v-for="index in carReviewData.stars"
                :key="index"
                class="h-3 w-3 md:h-5 md:w-5"
                src="/icons/star-fill.svg"
                :alt="`star ${index}`"
              />
              <img
                v-for="index in carReviewData.max - carReviewData.stars"
                :key="index"
                class="h-3 w-3 md:h-5 md:w-5"
                src="/icons/star-outline.svg"
                :alt="`star outline ${index}`"
              />
              <span class="ms-2 text-xs text-gray-700 md:text-sm"
                >440+ Reviewer</span
              >
            </div>
          </div>
          <button @click="store.toggleCarLike(car!.id)">
            <img
              v-if="isCarLiked"
              src="/icons/heart-fill.svg"
              alt="heart fill"
            />
            <img v-else src="/icons/heart-outline.svg" alt="heart" />
          </button>
        </div>
        <div class="text-xs leading-8 text-gray-700 md:text-base md:leading-5">
          {{ car?.description }}
        </div>
        <div class="mt-4 grid grid-cols-2 gap-x-12 gap-y-4 md:mt-9">
          <div
            v-for="(info, key) in carExtras"
            :key="`info-${key}`"
            class="flex justify-between text-xs font-light md:text-xl"
          >
            <span class="text-gray-700">{{ info.key }}</span>
            <span class="font-bold">{{ info.value }}</span>
          </div>
        </div>
        <div class="mt-8 flex items-center justify-between">
          <div class="font-bold">
            <span class="text-xl font-bold md:text-4xl"
              >${{ car?.pricePerDay }}/</span
            >
            <span class="text-xs text-gray-700 md:text-base">days</span>
            <div class="mt-2 text-xs text-gray-700 line-through md:text-base">
              $100
            </div>
          </div>
          <button class="rounded-md bg-primary px-6 py-5 text-white">
            Rent Now
          </button>
        </div>
      </div>
    </div>
    <div class="flex justify-between py-5">Recommendation Car</div>
    <div class="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
      <CarComponent
        v-for="(car, key) in genericCarsWithLikes"
        :car="car"
        :key="`generic-car-${key}`"
        @onToggleLike="store.toggleCarLike"
      />
    </div>
  </section>
</template>
<script setup lang="ts">
import type { CarDetails, CarNotFound } from '@/models'
import { useCarsStore } from '@/stores/cars'
import { useRoute } from 'vue-router'
import { carReviewData } from '@/constants/content'
import { getCarExtraItems } from '@/utils/utilities'
const {
  params: { id },
} = useRoute()

const store = useCarsStore()
const { genericCarsWithLikes, likedCars } = storeToRefs(store)
const { data: car } = await useFetch<CarDetails>(`/api/car-details`, {
  query: { id },
})
const isCarLiked = computed(() => {
  return likedCars.value.includes(car.value!.id)
})

if (car.value?.status && car.value?.status === 404) {
  throw showError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
  })
}

const carExtras = getCarExtraItems(car.value!)

if (!genericCarsWithLikes.value.length) {
  await useAsyncData('generic-cars', () => store.loadGenericCars())
}

useHead({
  title: `Car - ${car.value?.name}`,
  meta: [{ name: 'description', content: car.value?.description }],
})
</script>
