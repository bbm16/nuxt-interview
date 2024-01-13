import { describe, it, expect } from 'vitest'
import { parseCarsWithLikes } from './utilities'
import type { Car } from '@/models'

/**
 * Maybe that's kind of redundant, but I decided to move this into an util
 * to show some Unit Testing
 */

const mockedCar: Car = {
  name: 'Car1',
  gasolineLiter: 1,
  id: 'car-1',
  people: 5,
  type: 'Gas',
  pricePerDay: 5,
  img: 'asdf',
  kindOfTransition: 'manual',
}

describe('Given Utilities', () => {
  describe('When calling "parseCarsWithLikes"', () => {
    describe('And receives null values', () => {
      it('Then it returns an empty array', () => {
        expect(parseCarsWithLikes()).toEqual([])
      })
    })
    describe('And receives cars which is liked', () => {
      it('Then it returns an array with a car with isLiked to true', () => {
        expect(parseCarsWithLikes([mockedCar], ['car-1'])).toEqual([
          {
            ...mockedCar,
            isLiked: true,
          },
        ])
      })
    })
    describe('And receives cars which is NOT liked', () => {
      it('Then it returns an array with a car with isLiked to false', () => {
        expect(parseCarsWithLikes([mockedCar], ['car-3'])).toEqual([
          {
            ...mockedCar,
            isLiked: false,
          },
        ])
      })
    })
  })
})
