import { useCarsStore } from '@/stores/cars'
import { storeToRefs } from 'pinia'
import { useDebounceFn } from '@vueuse/core'

export const useSearch = () => {
  const store = useCarsStore()
  const { queryResultsCars } = storeToRefs(store)

  const debounce = useDebounceFn(() => {
    store.searchCars()
  }, 250)

  const triggerSearch = (query: string) => {
    store.setQuery(query)
    debounce()
  }

  return {
    triggerSearch,
    queryResultsCars,
  }
}
