export type Car = {
  name: string
  type: string
  gasolineLiter: number
  kindOfTransition: string
  people: number
  pricePerDay: number
  id: string
  img: string
  isLiked?: boolean
}

type SimpleImage = {
  url: string
}

export interface CarDetails extends Car {
  description: string
  images: SimpleImage[]
  status?: number
  message?: string
}

export type CarNotFound = {
  status: number
  message: string
}

export type CarResults = {
  meta: {
    last_page: number
  }
  data: Car[]
}

export type HeaderCard = {
  title: string
  description: string
  cta: string
  image: string
  background?: string
}

type FooterChildren = {
  title: string
  link: string
}

export type FooterMenu = {
  title: string
  children: FooterChildren[]
}
