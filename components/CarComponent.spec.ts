import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import CarComponent from './CarComponent.vue'

const mockedCar = {
  name: 'Testing Car',
  type: 'Hybrid',
  gasolineLiter: 5,
  kindOfTransition: 'manual',
  people: 4,
  pricePerDay: 25,
  id: 'test-car',
  img: 'img',
  isLiked: true,
}

describe('Given CarComponent', () => {
  describe('When it receives a Car Object as Prop which is liked', () => {
    it('Then is rendered successfully', () => {
      render(CarComponent, {
        props: {
          car: mockedCar,
        },
      })
      const name = screen.getByText('Testing Car')
      const type = screen.getByText('Hybrid')
      const gas = screen.getByText('5L')
      const kind = screen.getByText('manual')
      const people = screen.getByText('4 People')
      const price = screen.getByText('$25/')
      const likedIcon = screen.getByRole('img', { name: 'liked heart' })

      expect(name).toBeDefined()
      expect(type).toBeDefined()
      expect(gas).toBeDefined()
      expect(kind).toBeDefined()
      expect(people).toBeDefined()
      expect(price).toBeDefined()
      expect(likedIcon).toBeDefined()
    })
  })
  describe('When it receives a Car Object as Prop which is unliked', () => {
    it('Then is rendered successfully', () => {
      render(CarComponent, {
        props: {
          car: { ...mockedCar, isLiked: false },
        },
      })
      const unLikedIcon = screen.getByRole('img', { name: 'unliked heart' })
      expect(unLikedIcon).toBeDefined()
    })
  })
})
