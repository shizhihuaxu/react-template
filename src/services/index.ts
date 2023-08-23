import type { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { trimParams } from '@/utils/common'

const REQUEST_TOKEN_KEY = 'Authorization'

const config = {
    baseURL: process.env.API_BASE_URL,
    timeout: 60000,
    withCredentials: true,
}

class RequestHttp {
    service: AxiosInstance
    public constructor (config: AxiosRequestConfig) {
        // 创建实例
        this.service = axios.create(config)

        // 请求拦截器
        this.service.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                const token = useUserStore((state) => state.token)

                // 请求参数 trim，post,patch,put,delete
                if (config.data) {
                    config.data = trimParams(config.data)
                }
                // 请求参数 trim，get
                if (config.params) {
                    config.params = trimParams(config.params)
                }

                config.headers[REQUEST_TOKEN_KEY] =  `${token}`

                return config
            },
            (error: AxiosError) => {
                return Promise.reject(error)
            },
        )

        // 响应拦截器
        this.service.interceptors.response.use(
            (response: AxiosResponse) => {
                // 处理二进制数据时返回所有响应信息
                if (response.config?.responseType === 'blob') return response

                // 否则仅返回数据部分
                return response.data
            },
            (error: AxiosError) => {
                const { status, data } = error.response

                return Promise.reject({ status, data })
            },
        )
    }

    // 常用请求方法
    get<T> (url: string, params?: object, config: AxiosRequestConfig = {}): Promise<T> {
        return this.service.get(url, { params, ...config })
    }
    post<T> (url: string, params?: object, config: AxiosRequestConfig = {}): Promise<T> {
        return this.service.post(url, params, config)
    }
    put<T> (url: string, params?: object, config: AxiosRequestConfig = {}): Promise<T> {
        return this.service.put(url, params, config)
    }
    patch<T> (url: string, params?: object, config: AxiosRequestConfig = {}): Promise<T> {
        return this.service.patch(url, params, config)
    }
    delete<T> (url: string, params?: object, config: AxiosRequestConfig = {}): Promise<T> {
        return this.service.delete(url, { data: { ... params }, ...config })
    }
}

export default new RequestHttp(config)
