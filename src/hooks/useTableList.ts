import { useState, useEffect } from 'react'
import { without } from 'lodash-es'
import { IConvertEmptyConfig, convertEmptyField } from '@/utils/common'

type RequestParams =
    | {
        size?: number
        page?: number
        [key: string]: any
    }
    | undefined

interface ReponseData {
    data: any[]
    total?: number
    current?: number
    [key: string]: any
}

enum SortOrderEnum {
    ASC = 'ascend',
    DESC = 'descend',
}

export const useTableList = <T extends ReponseData>(
    getData: (params?: RequestParams) => Promise<T>,
    options?: {
        rowKey?: string
        pagination?: boolean
        requestImmediate?: boolean // 默认true，是否在 mounted 时立即获取数据
        defaultQueryParams?: RequestParams
        convertEmptyOptions?: IConvertEmptyConfig
        onLoad?: (ReponseData: any) => void
        onRequestError?: (e: Error) => void
    },
) => {
    // 列表数据
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ tableList, setTableList ] = useState<unknown[]>([])
    const [ queryParams, setQueryParams ] = useState<Record<string, unknown>>({ ...options?.defaultQueryParams })

    // 多选
    const rowKey = options?.rowKey || 'id'
    const [ selectedKeys, setSelectedKeys ] = useState<React.Key[]>([])
    const rowSelection = {
        selectedRowKeys: selectedKeys,
        // 手动选择/取消选择某列
        onSelect: (record, isSelected) => {
            const id = record?.[rowKey]
            // 选择
            if (isSelected) {
                setSelectedKeys([ ...selectedKeys, id ])
            } else {
                // 取消
                setSelectedKeys([ ...without(selectedKeys, id) ])
            }
        },
        // 手动选择/取消选择所有列
        onSelectAll: (isSelected, _selectedRows, changeRows) => {
            const changedIds = changeRows.map(item => item?.[rowKey])

            if (isSelected) {
                setSelectedKeys([ ...selectedKeys, ...changedIds ])
            } else {
                setSelectedKeys([ ...without(selectedKeys, ...changedIds) ])
            }
        },

        onChange: (selectedRowKeys: React.Key[]) => {
            setSelectedKeys(selectedRowKeys)
        },
    }
    const selectedLen = selectedKeys?.length || 0
    const hasSelected = selectedKeys?.length > 0

    // 排序
    const onTableChange = (
        _pagination,
        _filters,
        sorter: { field: string, order?: SortOrderEnum },
        extra: { action: 'paginate' | 'sort' | 'filter' },
    ) => {
        if (extra.action === 'sort') {
            const { field, order } = sorter
            let sort = ''

            if (field && order) {
                sort = order === SortOrderEnum.ASC ? field : `-${field}`
            }

            setQueryParams({
                ...queryParams,
                sort: sort || undefined,
            })

            onSearch()
        }
    }

    // 分页
    const [ pagination, setPagination ] = useState({
        current: 1,
        total: 0,
        pageSize: 20,
        pageSizeOptions: [ 20, 50, 100, 200 ],
        onChange: (current: number, pageSize: number) => {
            setPagination({
                ...pagination,
                current,
                pageSize,
            })

            setQueryParams({
                ...queryParams,
                page: current,
                size: pageSize,
            })

            if(current !== pagination.current) {
                fetchList(false)
            }
            if(pageSize !== pagination.pageSize) {
                onSearch()
            }
        },
    })

    const fetchList = async (isClearSelectedRows = true) => {
        setLoading(true)
        setTableList([])

        try {
            const params: RequestParams = { ...queryParams }
            const res = await getData(params)
            const { data, current, total } = res

            if (isClearSelectedRows) {
                setSelectedKeys([])
            }

            setLoading(false)
            setTableList(convertEmptyField(data, options?.convertEmptyOptions))
            setPagination({
                ...pagination,
                current,
                total,
            })

            // 请求数据成功后执行回调函数
            if (options?.onLoad) {
                options.onLoad(res)
            }
        } catch (e: any) {
            setLoading(false)
            // 如果没有传递这个方法的话，需要把错误抛出去，以免吞掉错误
            if (options?.onRequestError !== undefined) {
                options.onRequestError(e)
            } else {
                // throw new Error(e)
            }
        }
    }

    // 留在当前页刷新
    const onReload = () => {
        fetchList()
    }

    // 搜索，回到第一页
    const onSearch = (params: Partial<RequestParams> = {}) => {
        setPagination({
            ...pagination,
            current: 1,
        })
        setQueryParams({
            ...queryParams,
            ...params,
            page: 1,
        })

        fetchList()
    }

    // 在此生命周期时执行，避免在此之前执行修改数据初值
    useEffect(() => {
        if (!options?.pagination !== false) {
            setQueryParams({
                ...queryParams,
                page: pagination.current,
                size: pagination.pageSize,
            })
        }

        if(options?.requestImmediate !== false) {
            fetchList()
        }
    }, [])

    return {
        loading,
        tableList,
        queryParams,
        // 多选
        selectedKeys,
        hasSelected,
        selectedLen,
        rowSelection,
        // 分页
        pagination,
        // 排序
        onTableChange,
        // 刷新
        onReload,
        onSearch,
    }
}
