import { setAccessToken } from '@/store/auth/authSlice'
import axios from 'axios'

let isRefreshing = false
let failedQueue: any[] = []
let store: any

export const injectStore = (_store: any) => {
    store = _store
}

const processQueue = (err: any, token = null) => {
    failedQueue.forEach(p => {
        err ? p.reject(err) : p.resolve(token)
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
 
        if (err.response?.status === 401 && !orginal._retry && state.accessToken ) {
            orginal._retry = true

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject })
                })
                    .then((token) => {
                        orginal.headers.Authorization = `Bearer ${token}`
                        return axiosInstance(orginal)
                    })
            }
            isRefreshing = true
            try {
                const reponse = await axiosInstance.post('/auth/refresh')
                const newToken = reponse.data.access_token
                store.dispatch(setAccessToken(newToken))
                processQueue(null, newToken)
                return axiosInstance(orginal)
            } catch (err) {
                processQueue(err, null)
                return Promise.reject(err)
            }
            finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(err)
    }
)
export default axiosInstance