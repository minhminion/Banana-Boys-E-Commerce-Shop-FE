import React, { lazy } from "react";
import { Route, Switch } from "react-router";
import UnderContruct from "../pages/UnderContruct";

import LoginRegister from "../modules/LoginAndRegister/Containers/TabsLoginAndRegister";

// const LoginRegister = lazy(() =>
//   import("../modules/LoginAndRegister/containers/LoginRegister")
// );
const Wishlist = lazy(() =>
  import("../modules/Shop/WishList/containers/Wishlist")
);
const Cart = lazy(() => import("../modules/Shop/Cart/containers/Cart"));
const ProductList = lazy(() =>
  import("../modules/Shop/Products/containers/ProductList")
);
const NotFound = lazy(() => import("../pages/NotFound"));
const Checkout = lazy(() => import("../modules/Shop/Checkout/containers/Checkout"));
const UserAccount = lazy(() => import("../modules/UserAccount/containers/UserAccount"));
const Contact = lazy(() => import("../pages/Contact"));
const Home = lazy(() => import("../pages/Home"));
const OrderSuccess = lazy(() => import("../pages/OrderSuccess"));
const ProductInfo = lazy(() =>
  import("../modules/Shop/Products/containers/ProductInfo")
);

const Routes = (props) => {
  const { store } = props;
  let { user } = store.getState();
  console.log('======== Bao Minh: Routes -> user', user)
  user = user || {};
  /** If use is not exists => not login then show mot found page */
  // if (!user.user || !user.user.id) {
  if (true) {
    return (
      <Switch>
        <Route
          path={process.env.PUBLIC_URL + "/login-register"}
          component={LoginRegister}
        />
        <Route
          path={process.env.PUBLIC_URL + "/product/:id"}
          component={ProductInfo}
        />
        <Route path={process.env.PUBLIC_URL + "/shop"} component={ProductList} />
        <Route
          path={process.env.PUBLIC_URL + "/wishlist"}
          component={Wishlist}
        />
        <Route path={process.env.PUBLIC_URL + "/cart"} component={Cart} />
        <Route
          path={process.env.PUBLIC_URL + "/checkout"}
          component={Checkout}
        />
        <Route
          path={process.env.PUBLIC_URL + "/user"}
          component={UserAccount}
        />
        <Route path={process.env.PUBLIC_URL + "/contact"} component={Contact} />
        <Route exact path={process.env.PUBLIC_URL + "/orderSuccess"} component={OrderSuccess} />
        <Route exact path={process.env.PUBLIC_URL} component={Home} />
        <Route exact component={NotFound} />
      </Switch>
    );
  }

  return <Route path="*" exact component={UnderContruct} />;
};

export default Routes;
