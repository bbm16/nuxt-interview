import { API_URL } from '@/constants/content'

export default defineEventHandler<{ query: { query: string } }>((event) => {
  const { query } = getQuery(event)
  return $fetch(API_URL, { query: { q: query } })
})
