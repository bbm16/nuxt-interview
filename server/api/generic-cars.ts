import { API_URL } from '@/constants/content'

export default defineEventHandler<{ query: { page: string } }>((event) => {
  const { page } = getQuery(event)
  return $fetch(API_URL, { query: { page } })
})
