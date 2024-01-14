import type { HeaderCard, FooterMenu, CarReviewData } from '@/models'

export const API_URL = 'https://dm-assignment-commonshare.koyeb.app/api/cars'

export const headerCards: HeaderCard[] = [
  {
    title: 'The Best Platform for Car Rental',
    description:
      'Ease of doing a car rental safely and reliably. Of course at a low price.',
    cta: 'Rental Car',
    image: 'car-1.png',
  },
  {
    title: 'Easy way to rent a car at a low price',
    description:
      'Providing cheap car rental services and safe and comfortable facilities.',
    cta: 'Rental Car',
    image: 'car-2.png',
  },
]

export const footerMenus: FooterMenu[] = [
  {
    title: 'About',
    children: [
      {
        title: 'How it works',
        link: '#',
      },
      {
        title: 'Featured',
        link: '#',
      },
      {
        title: 'Partnership',
        link: '#',
      },
      {
        title: 'Bussiness Relation',
        link: '#',
      },
    ],
  },
  {
    title: 'Community',
    children: [
      {
        title: 'Events',
        link: '#',
      },
      {
        title: 'Blog',
        link: '#',
      },
      {
        title: 'Podcast',
        link: '#',
      },
      {
        title: 'Invite a friend',
        link: '#',
      },
    ],
  },
  {
    title: 'Socials',
    children: [
      {
        title: 'Discord',
        link: '#',
      },
      {
        title: 'Instagram',
        link: '#',
      },
      {
        title: 'Twitter',
        link: '#',
      },
      {
        title: 'Facebook',
        link: '#',
      },
    ],
  },
]

export const carReviewData: CarReviewData = {
  stars: 4,
  max: 5,
}
