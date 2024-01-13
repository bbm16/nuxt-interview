import { API_URL } from '@/constants/content'

export default defineEventHandler<{ query: { id: string } }>((event) => {
  const { id } = getQuery(event)
  return $fetch(`${API_URL}/${id}`)
})
