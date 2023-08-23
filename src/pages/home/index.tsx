import React from 'react'
import { Table } from 'antd'
import { useTableList } from '@/hooks/useTableList'
import { getHomeList } from '@/services/home'

const Home: React.FC = () => {
    const {
        loading,
        tableList,
        hasSelected,
        selectedLen,
        rowSelection,
        pagination,
        onTableChange,
    } = useTableList(getHomeList)

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
        },
        {
            title: '年龄',
            dataIndex: 'age',
        },
    ]

    return (
        <>
            {hasSelected ? <span>选择了 {selectedLen} 项</span> : null}
            <Table
                rowSelection={rowSelection}
                loading={loading}
                pagination={pagination}
                columns={columns}
                dataSource={tableList}
                onChange={onTableChange}
            />
        </>
    )
}

export default Home
