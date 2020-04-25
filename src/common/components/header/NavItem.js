import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
const NavItem = (strings) => ([
  {
    menuTitle: strings['home'],
    to: '/',
    subMenu: [
      {
        subTitle: 'Home Group 1',
        to: '/',
        item: [
          {
            title: 'Home 1',
            to: '/shop'
          },
          {
            title: 'Home 2',
            to: '/shop'
          },
          {
            title: 'Home 3',
            to: '/shop'
          }
        ]
      },
      {
        subTitle: 'Home Group 2',
        to: '/',
        item: [
          {
            title: 'Home 4',
            to: '/shop'
          },
          {
            title: 'Home 5',
            to: '/shop'
          },
          {
            title: 'Home 6',
            to: '/shop'
          }
        ]
      }
    ]
  },
  {
    menuTitle: strings['shop'],
    to: '/shop',
    subMenu: []
  },
  {
    menuTitle: strings['contact_us'],
    to: '/contact',
    subMenu: []
  }
])

export const createNav = (strings, sidebarMenu) => (
  NavItem(strings).map(menu => (
    <li key={menu.menuTitle}>
      {menu.subMenu && menu.subMenu.length
        ? (
          <Link to={process.env.PUBLIC_URL + menu.to}>
            {menu.menuTitle}
            {sidebarMenu ? (
              <span>
                <i className="fa fa-angle-right"></i>
              </span>
            ) : (
                <i className="fa fa-angle-down" />
              )}
          </Link>
        ) : (
          <Link to={process.env.PUBLIC_URL + menu.to}>
            {menu.menuTitle}
          </Link>
        )
      }
      {menu.subMenu && menu.subMenu.length
        ? (
          <ul className="mega-menu mega-menu-padding">
            {menu.subMenu.map(subMenu => (
              <li key={subMenu.subTitle}>
                <ul>
                  <li className="mega-menu-title">
                    <Link to={process.env.PUBLIC_URL + subMenu.to}>
                      {subMenu.subTitle}
                    </Link>
                  </li>
                  {subMenu.item && subMenu.item.length
                    ? subMenu.item.map(item => (
                      <li key={item.title}>
                        <Link to={process.env.PUBLIC_URL + item.to}>
                          {item.title}
                        </Link>
                      </li>
                    ))
                    : null
                  }
                </ul>
              </li>
            ))}
          </ul>
        )
        : null
      }
    </li>
  ))
)

export const createNavMobile = (strings) => (
  <ul>
  {NavItem(strings).map( menu => (
    <Fragment key={menu.menuTitle}>
    { menu.subMenu && menu.subMenu.length
      ? (
        <li className="menu-item-has-children">
          <Link to={process.env.PUBLIC_URL + menu.to}>{menu.menuTitle}</Link>
          <ul className='sub-menu'>
            { menu.subMenu.map(subMenu => (
              <li className="menu-item-has-children" key={subMenu.subTitle}>
                <Link to={process.env.PUBLIC_URL + subMenu.to}>
                  {subMenu.subTitle}
                </Link>
                <ul className='sub-menu'>
                {
                  subMenu.item && subMenu.item.map(item => (
                    <li key={item.title}>
                      <Link to={process.env.PUBLIC_URL + item.to}>
                        {item.title}
                      </Link>
                    </li>
                  ))
                }
                </ul>
              </li>
            ))}
          </ul>
        </li>
      ) : (
        <li key={menu.menuTitle}>
          <Link to={process.env.PUBLIC_URL + menu.to}>
            {menu.menuTitle}
          </Link>
        </li>
      )
    }
    </Fragment>
    ))}
    </ul>
)