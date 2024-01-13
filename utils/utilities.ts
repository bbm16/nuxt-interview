import type { Car } from '@/models'

export const parseCarsWithLikes = (
  cars: Car[] = [],
  likes: string[] = [],
): Car[] => {
  return cars.map((car: Car) => ({
    ...car,
    isLiked: likes.includes(car.id),
  }))
}
