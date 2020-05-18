import React from "react"
import { Menu } from "antd"
import { useLocation, useHistory } from "react-router"
import { AppleOutlined, AreaChartOutlined, MessageOutlined } from '@ant-design/icons'


const { SubMenu } = Menu

const SettingMenu = (strings) => ([
    {
      key: 'my_account',
      menuTitle: 'Tài khoản của tôi',
      icon: <AreaChartOutlined />,
      subMenus: [
        {
          key: 'profile',
          menuTitle: "Hồ sơ",
        },
        {
          key: 'address',
          menuTitle: "Địa chỉ",
        },
        {
          key: 'change_password',
          menuTitle: "Đổi mật khẩu",
        },
      ]
    },
    {
      key: 'orders',
      menuTitle: "Đơn hàng của tôi",
      icon: <MessageOutlined />,
    }
  ])

  const UserSettingMenu = ({
    strings,
    theme,
    mode,
  }) => {
  
    const location = useLocation()
    const history = useHistory()
  
    const createMenuItem = (menuItem) => {
      if(menuItem.groupName && menuItem.menus && menuItem.menus.length) {
        return (
          <Menu.ItemGroup key={menuItem.key} title={menuItem.groupName}>
            {menuItem.menus.map(menu => createMenuItem(menu))}
          </Menu.ItemGroup>
        )
      }
      if(menuItem.subMenus && menuItem.subMenus.length) {
        return (
          <SubMenu
            key={menuItem.key}
            title={
              <>
              {menuItem.icon || <AppleOutlined />}
              <span>
                {menuItem.menuTitle}
              </span>
              </>
            }
          >
            {menuItem.subMenus.map(menu => createMenuItem(menu))}
          </SubMenu>
        )
      } 
      return (
        <Menu.Item key={menuItem.key}>{menuItem.icon || <AppleOutlined />}<span>{menuItem.menuTitle}</span></Menu.Item>
      )
    }
  
    return (
      <Menu
        className='sidebar'
        theme={theme}
        mode={mode}
        selectedKeys={[location.pathname.split('/')[2]]}
        onClick={(value) => history.push(`${process.env.PUBLIC_URL}/user/${value.key}`)}>
        {
          SettingMenu(strings).map(menuItem => (
            createMenuItem(menuItem)
          ))
        }
      </Menu>
    )
  }
  
  export default UserSettingMenu