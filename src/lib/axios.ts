import { store } from '@/store'
import axios from 'axios'

let isFreshing = false
let failedQueue: any[] = []

const processQueue = (err: any, token = null) => {
    failedQueue.forEach(p => {
        if (err) p.reject(err)
        else p.resolve(token)
    })
    failedQueue = []
}


const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PRIVATE_API_UR || 'http://localhost:8080/api/v1',
    withCredentials: true,
})

axiosInstance.interceptors.request.use((config) => {
    const state = store.getState().auth
    if (state.accessToken) {
        config.headers.Authorization = `Bearer ${state.accessToken}`

    }

    return config
}, err => {
    return Promise.reject(err)
})
axiosInstance.interceptors.response.use(
    res => res,
    async (err) => {
        const orginal = err.config

        const state = store.getState().auth

        if (err.response?.status === 401 && !orginal._retry && state.accessToken) {


            if (isFreshing) {
                return new Promise((resolve, reject) => {

                })
            }

            orginal._retry = true
            isFreshing = true

            try {
                const reponse = await axiosInstance.post('/auth/refresh')
                

            } catch (err) {

            }

        }


    }
)
export default axiosInstance