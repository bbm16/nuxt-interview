import { defineStore } from 'pinia'
import type { Car, CarResults, CarWithLikes } from '@/models'
import { parseCarsWithLikes } from '@/utils/utilities'

export const useCarsStore = defineStore('cars', {
  state: () => ({
    popularCars: [] as Car[],
    genericCars: [] as Car[],
    likedCars: [] as string[],
    query: '' as string | null,
    queryResultsCars: [] as Car[],
    currentPage: 1,
    maximumPages: 0,
  }),
  actions: {
    async loadPopularCars() {
      try {
        const { data } = await useFetch<Car[]>('/api/popular-cars')
        if (data && data.value) {
          this.popularCars = data.value
        }
      } catch (error) {
        // show the page without popular if API fails
        this.popularCars = []
      }
    },
    async loadGenericCars() {
      try {
        const { data } = await useFetch<CarResults>('/api/generic-cars', {
          query: { page: this.currentPage },
        })
        if (data && data.value) {
          this.genericCars.push(...data.value.data)
          this.currentPage = this.currentPage + 1
          this.maximumPages = data.value.meta.last_page
        }
      } catch (error) {
        // show the page without popular if API fails
        this.genericCars = []
      }
    },
    async searchCars() {
      try {
        const { data } = await useFetch<CarResults>('/api/search-cars', {
          query: { query: this.query },
        })
        if (data && data.value) {
          this.queryResultsCars = data.value.data
        }
      } catch (error) {
        // show the page without popular if API fails
        this.queryResultsCars = []
      }
    },
    toggleCarLike(carId: string) {
      const carIndexOf = this.likedCars.indexOf(carId)
      if (carIndexOf > -1) {
        this.likedCars.splice(carIndexOf, 1)
      } else {
        this.likedCars.push(carId)
      }
      const cookieLikes = useCookie('likes')
      cookieLikes.value = JSON.stringify(this.likedCars)
    },
    setLikes(likedCars: string[]) {
      this.likedCars = likedCars
    },
    setQuery(query: string) {
      this.query = query
    },
  },
  getters: {
    isShowMorePagesVisible: (state): boolean =>
      state.currentPage < state.maximumPages,
    /**
     * I extracted parsecarsWithLikes, as it's duplicated, and could
     * be a good example of Unit Testing outside of Pinia - just for example
     */
    popularCarsWithLikes: (state): CarWithLikes[] => {
      return parseCarsWithLikes(state.popularCars, state.likedCars)
    },
    genericCarsWithLikes: (state): CarWithLikes[] => {
      return parseCarsWithLikes(state.genericCars, state.likedCars)
    },
  },
})
