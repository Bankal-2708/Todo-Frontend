import axios from 'axios'

const API_BASE_URL = 'https://backend-gamma-umber-41.vercel.app'

const api = axios.create({
  baseURL: API_BASE_URL,
})

export default api
