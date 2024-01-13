import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect } from 'vitest'
import { useCarsStore } from './cars'

describe('Given cars store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('Given loadPopularCars action', () => {
    describe('When returns cars', () => {
      it('Then are correctly setup on the state', async () => {
        vi.stubGlobal(
          'useFetch',
          () =>
            new Promise((res) =>
              res({
                data: {
                  value: [{ name: 'car-1' }],
                },
              }),
            ),
        )
        const store = useCarsStore()
        await store.loadPopularCars()
        expect(store.popularCars).toEqual([{ name: 'car-1' }])
      })
    })
    describe('When throws an error', () => {
      it('Then state remains as an empty array', async () => {
        vi.stubGlobal('useFetch', () => new Promise((res, rej) => rej()))
        const store = useCarsStore()
        await store.loadPopularCars()
        expect(store.popularCars).toEqual([])
      })
    })
  })
  describe('Given loadGenericCars action', () => {
    describe('When returns cars', () => {
      it('Then are correctly setup on the state and increases the page count and total pages', async () => {
        vi.stubGlobal(
          'useFetch',
          () =>
            new Promise((res) =>
              res({
                data: {
                  value: {
                    data: [{ name: 'car-1' }],
                    meta: {
                      last_page: 3,
                    },
                  },
                },
              }),
            ),
        )
        const store = useCarsStore()
        await store.loadGenericCars()
        expect(store.genericCars).toEqual([{ name: 'car-1' }])
        expect(store.currentPage).toBe(2)
        expect(store.maximumPages).toBe(3)
        expect(store.isShowMorePagesVisible).toBeTruthy()
        // Loads the maximum pages
        await store.loadGenericCars()
        await store.loadGenericCars()
        expect(store.genericCars).toEqual([
          { name: 'car-1' },
          { name: 'car-1' },
          { name: 'car-1' },
        ])
        expect(store.isShowMorePagesVisible).toBeFalsy()
      })
    })
    describe('When throws an error', () => {
      it('Then state remains as an empty array', async () => {
        vi.stubGlobal('useFetch', () => new Promise((res, rej) => rej()))
        const store = useCarsStore()
        await store.loadGenericCars()
        expect(store.popularCars).toEqual([])
      })
    })
  })
  describe('Given toggleCarLike action', () => {
    beforeEach(() => {
      vi.stubGlobal('useCookie', () => ({ value: '' }))
    })
    describe('When adds a id which doesnt exist on likedCars', () => {
      it('Then it adds there', () => {
        const store = useCarsStore()
        store.toggleCarLike('car-id-1')
        store.toggleCarLike('car-id-2')
        expect(store.likedCars).toEqual(['car-id-1', 'car-id-2'])
      })
    })
    describe('When adds a id which exists on likedCars', () => {
      it('Then its removed from liked car array', () => {
        const store = useCarsStore()
        store.likedCars = ['car-id-1', 'car-id-2']
        store.toggleCarLike('car-id-1')
        expect(store.likedCars).toEqual(['car-id-2'])
        store.toggleCarLike('car-id-2')
        expect(store.likedCars).toEqual([])
      })
    })
  })
})
