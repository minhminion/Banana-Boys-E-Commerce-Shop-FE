import React from "react"
import { Menu } from "antd"
import { useLocation, useHistory } from "react-router"
import { HomeOutlined, UserOutlined, MessageOutlined, ProfileOutlined, LockOutlined } from '@ant-design/icons'


const { SubMenu } = Menu

const SettingMenu = (strings) => ([
    {
      key: 'my_account',
      menuTitle: 'Tài khoản của tôi',
      icon: <UserOutlined />,
      subMenus: [
        {
          key: 'profile',
          menuTitle: "Hồ sơ",
          icon: <ProfileOutlined />
        },
        {
          key: 'address',
          menuTitle: "Địa chỉ",
          icon: <HomeOutlined />
        },
        {
          key: 'change_password',
          menuTitle: "Đổi mật khẩu",
          icon: <LockOutlined />
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
              {menuItem.icon }
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
        <Menu.Item key={menuItem.key}>{menuItem.icon}<span>{menuItem.menuTitle}</span></Menu.Item>
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