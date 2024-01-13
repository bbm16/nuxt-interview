import { describe, it, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/vue'
import NavbarComponent from './NavbarComponent.vue'
import { createTestingPinia } from '@pinia/testing'
import { useCarsStore } from '@/stores/cars'

describe('Given NavbarComponent', () => {
  beforeEach(() => {
    render(NavbarComponent, {
      global: {
        plugins: [createTestingPinia()],
      },
    })
  })
  describe('When component is rendered', () => {
    it('Then the search box is not visible and appears after focus on input and then close on click outside', async () => {
      expect(screen.queryByTestId('results')).toBeNull()
      const input = screen.getByRole('textbox')
      const button = screen.getByRole('button')
      await fireEvent.focus(input)
      expect(screen.getByTestId('results')).toBeDefined()
      await fireEvent.click(button)
      expect(screen.queryByTestId('results')).toBeNull()
    })
  })
  describe('When typing over the input', () => {
    it('Then it sets up ONE time the query and request results (checking debounce flow)', async () => {
      vi.useFakeTimers()
      const store = useCarsStore()
      const input = screen.getByRole('textbox')
      await fireEvent.focus(input)
      fireEvent.update(input, 'Mer')
      fireEvent.update(input, 'Merce')
      fireEvent.update(input, 'Mercedes')
      fireEvent.keyUp(input)
      fireEvent.keyUp(input)
      fireEvent.keyUp(input)
      expect(screen.getByTestId('results')).toBeDefined()
      await vi.advanceTimersToNextTimer()
      expect(store.setQuery).toHaveBeenCalledTimes(1)
      expect(store.setQuery).toHaveBeenCalledWith('Mercedes')
      expect(store.searchCars).toHaveBeenCalledTimes(1)
      vi.useRealTimers()
    })
  })
  describe('When there are results', () => {
    it('Then are printed nice in the results box', async () => {
      const store = useCarsStore()
      store.queryCars = [
        {
          name: 'Testing Car',
          type: 'Hybrid',
          gasolineLiter: 5,
          kindOfTransition: 'manual',
          people: 4,
          pricePerDay: 25,
          id: 'test-car',
          img: 'img',
          isLiked: true,
        },
      ]
      const input = screen.getByRole('textbox')
      await fireEvent.focus(input)
      const carName = await screen.findByText('Testing Car')
      expect(carName).toBeDefined()
    })
  })
})
