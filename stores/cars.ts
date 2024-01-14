import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Car, CarResults, CarWithLikes } from '@/models'
import { parseCarsWithLikes } from '@/utils/utilities'

export const useCarsStore = defineStore('cars', () => {
  const popularCars = ref<Car[]>([])
  const genericCars = ref<Car[]>([])
  const likedCars = ref<string[]>([])
  const query = ref<string>('')
  const queryResultsCars = ref<Car[]>([])
  const currentPage = ref<number>(1)
  const maximumPages = ref<number>(0)

  const isShowMorePagesVisible = computed<boolean>(
    () => currentPage.value < maximumPages.value,
  )
  const popularCarsWithLikes = computed<CarWithLikes[]>(() =>
    parseCarsWithLikes(popularCars.value, likedCars.value),
  )
  const genericCarsWithLikes = computed<CarWithLikes[]>(() =>
    parseCarsWithLikes(genericCars.value, likedCars.value),
  )

  function toggleCarLike(carId: string) {
    const carIndexOf = likedCars.value.indexOf(carId)
    if (carIndexOf > -1) {
      likedCars.value.splice(carIndexOf, 1)
    } else {
      likedCars.value.push(carId)
    }
    const cookieLikes = useCookie('likes')
    cookieLikes.value = JSON.stringify(likedCars.value)
  }

  function setLikes(likes: string[]) {
    likedCars.value = likes
  }

  const loadPopularCars = async () => {
    try {
      const { data } = await useFetch<Car[]>('/api/popular-cars')
      if (data?.value) {
        popularCars.value = data.value
      }
    } catch (error) {
      // show the page without popular if API fails
      popularCars.value = []
    }
  }

  const loadGenericCars = async () => {
    try {
      const { data } = await useFetch<CarResults>('/api/generic-cars', {
        query: { page: currentPage.value },
      })
      if (data?.value) {
        genericCars.value.push(...data.value.data)
        currentPage.value++
        maximumPages.value = data.value.meta.last_page
      }
    } catch (error) {
      // show the page without popular if API fails
      genericCars.value = []
    }
  }

  const searchCars = async () => {
    try {
      const { data } = await useFetch<CarResults>('/api/search-cars', {
        query: { query: query.value },
      })
      if (data?.value) {
        queryResultsCars.value = data.value.data
      }
    } catch (error) {
      // show the page without popular if API fails
      queryResultsCars.value = []
    }
  }

  return {
    isShowMorePagesVisible,
    loadPopularCars,
    loadGenericCars,
    query,
    queryResultsCars,
    popularCarsWithLikes,
    genericCarsWithLikes,
    setLikes,
    likedCars,
    toggleCarLike,
    searchCars,
  }
})
