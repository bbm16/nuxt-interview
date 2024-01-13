import { API_URL } from '@/constants/content'

export default defineEventHandler(() => $fetch(`${API_URL}/popular`))
