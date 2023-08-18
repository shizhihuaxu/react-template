import React, { useState, useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import type { MenuProps } from 'antd'
import type { IRouteItem } from '@/routers'
import { useGlobalStore } from '@/stores/global'
import { useUserStore } from '@/stores/user'
import logo from '@/assets/imgs/logo.png'
import style from './index.module.scss'

const { Sider } = Layout

const LayoutMenu: React.FC = () => {
    const { pathname } = useLocation()
    const isCollapse = useGlobalStore((state) => state.isCollapse)
    const authRouteList = useUserStore((state) => state.authRouteList)
    const [ selectedKeys, setSelectedKeys ] = useState<string[]>([ pathname ])
    const [ openKeys, setOpenKeys ] = useState<string[]>([])

    // 获取菜单列表
    const menuList = useMemo(() => {
        const getMenuList = (routes: IRouteItem[]): MenuProps['items'] => {
            const menuList: MenuProps['items'] = []

            routes.forEach(item => {
                (!item?.meta?.isHide && item?.path) && menuList.push({
                    key: item?.meta.key || item.path,
                    icon: item?.meta?.icon,
                    label: item?.meta?.title,
                    children: item?.children?.length ? getMenuList(item.children) : undefined,
                })
            })

            return menuList
        }
    
        return getMenuList(authRouteList[0].children)
    }, [ authRouteList ])


    // 获取展开的菜单 key，例如 pathname = '/test/child'，展开的项为 ['/test']
    const getOpenKeys = (pathname: string): string[] => {
        let newStr = ''
        const newArr: string[] = []
        const arr = pathname.split('/').map(item => `/${item}`)

        // ['/', '/test', '/test/child'] 去掉第一个和最后一个都是需要展开的
        for (let i = 1; i < arr.length - 1; i++) {
            newStr += arr[i]
            newArr.push(newStr)
        }

        return newArr
    }

    useEffect(() => {
        isCollapse ? null : setOpenKeys(getOpenKeys(pathname))
        setSelectedKeys([ pathname ])
    }, [ pathname, isCollapse ])

    // 点击跳转
    const navigate = useNavigate()
    const onClickMenu: MenuProps['onClick'] = ({ key }: { key: string }): void => {
        navigate(key)
    }

    // 展开
    const onOpenChange = (openKeys: string[]): void => {
        setOpenKeys(openKeys)
    }

    return (
        <Sider 
            trigger={null} 
            collapsible 
            collapsed={isCollapse}>
            <div className={style['logo-box']}>
                <img src={logo} alt='logo' className={style['logo-img']} />
                {!isCollapse ? <h2 className={style['logo-text']}>name</h2> : null}
            </div>
            <Menu
                theme='dark'
                mode='inline'
                triggerSubMenuAction='click'
                openKeys={openKeys}
                selectedKeys={selectedKeys}
                items={menuList}
                onClick={onClickMenu}
                onOpenChange={onOpenChange}
            />
        </Sider>
    )
}

export default LayoutMenu