import type { Car, CarDetails, CarWithLikes, CarExtraItem } from '@/models'

export const parseCarsWithLikes = (
  cars: Car[] = [],
  likes: string[] = [],
): CarWithLikes[] => {
  return cars.map((car: Car) => ({
    ...car,
    isLiked: likes.includes(car.id),
  }))
}

export const getCarExtraItems = (car: CarDetails): CarExtraItem[] => [
  {
    key: 'Type Car',
    value: car.type,
  },
  {
    key: 'Capacity',
    value: `${car.people} People`,
  },
  {
    key: 'Steering',
    value: car.kindOfTransition,
  },
  {
    key: 'Gasoline',
    value: `${car.gasolineLiter}L`,
  },
]
