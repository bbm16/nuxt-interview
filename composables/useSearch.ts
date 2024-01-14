import { useCarsStore } from '@/stores/cars'
import { storeToRefs } from 'pinia'
import { useDebounceFn } from '@vueuse/core'

export const useSearch = () => {
  const store = useCarsStore()
  const { queryResultsCars, query } = storeToRefs(store)

  const triggerSearch = useDebounceFn(() => {
    store.searchCars()
  }, 250)

  return {
    triggerSearch,
    queryResultsCars,
    query,
  }
}
