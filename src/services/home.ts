import request from '@/services'

const API = {
    HOME: '/home',
}

// 获取列表
export async function getHomeList (params?: Record<string, any>): Promise<any> {
    return request.get(API.HOME, params)
}
