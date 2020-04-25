import React, { lazy } from 'react'
import { Route, Switch } from 'react-router'
import UnderContruct from '../pages/UnderContruct'

const LoginRegister = lazy(() => import('../modules/user/containers/LoginRegister'))
const Wishlist = lazy(() => import('../modules/Shop/WishList/containers/Wishlist'))
const Cart = lazy(() => import('../modules/Shop/Cart/containers/Cart'))
const Product = lazy(() => import('../modules/Shop/Products/components/Product'))
const NotFound = lazy(() => import('../pages/NotFound'))
const Checkout = lazy(() => import('../pages/Checkout'))
const MyAccount = lazy(() => import('../pages/MyAccount'))
const Contact = lazy(() => import('../pages/Contact'))
const Home = lazy(() => import('../pages/Home'))
const ProductInfo = lazy(() => import('../modules/Shop/Products/containers/ProductInfo'))

const Routes = (props) => {

  const { store } = props
  let { user } = store.getState()
  user = user || {
    user: {
      id: 1,
      name: 'Minh'
    },
    role: 'admin'
  }
  /** If use is not exists => not login then show mot found page */
  if (!user.user || !user.user.id) {
    return (
      <Switch>
          <Route exact path={process.env.PUBLIC_URL + "/"} component={Home} />
          <Route path={process.env.PUBLIC_URL + "/login-register"} component={LoginRegister} />
          <Route path={process.env.PUBLIC_URL + "/product/:id"} component={ProductInfo} />
          <Route path={process.env.PUBLIC_URL + "/shop"} component={Product} />
          <Route path={process.env.PUBLIC_URL + "/wishlist"} component={Wishlist} />
          <Route path={process.env.PUBLIC_URL + "/cart"} component={Cart} />
          <Route path={process.env.PUBLIC_URL + "/checkout"} component={Checkout} />
          <Route path={process.env.PUBLIC_URL + "/my-account"} component={MyAccount} />
          <Route path={process.env.PUBLIC_URL + "/contact"} component={Contact} />
          <Route exact component={NotFound} />
      </Switch>
    )
  }

  return <Route path='*' exact component={UnderContruct} />
}

export default Routes
