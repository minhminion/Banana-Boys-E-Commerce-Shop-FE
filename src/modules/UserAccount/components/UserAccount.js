import React, { Fragment } from "react";
import { Layout } from "antd";
import MainLayoutShop from "../../../common/HOCS/MainLayoutShop";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { MetaTags } from "react-meta-tags";
import UserImage from "./subComponents/UserImage";
import UserSettingMenu from "./subComponents/UserSettingMenu";
import { Switch, Route } from "react-router";
import UserProfile from "./UserProfile";
import Breadcrumb from "../../../wrappers/Breadcrumb";
import ChangePassword from "./ChangePassword";
import UserOrderList from "../containers/UserOrderList";
import AddAddress from "../containers/AddAddress";
import AddressList from "../containers/AddressList";
import EditAddress from "../containers/EditAddress";
import UserOrderDetails from "../containers/UserOrderDetails";

const { Content, Sider } = Layout;

const UserAccount = ({
  strings,
  location,
  user,
  changeInfoCustomer,
  history,
  getInfoCustomer,
  changePassword,
}) => {
  const { pathname } = location;

  return (
    <Fragment>
      <MetaTags>
        <title>Banana Boys | {strings["my_account"]}</title>
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + " "}>
        {strings["home"]}
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        {strings["my_account"]}
      </BreadcrumbsItem>
      <MainLayoutShop headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <Layout
          className="container"
          style={{ padding: "24px 0", background: "none" }}
        >
          <Sider
            style={{ background: "none", borderRight: "1px solid #f0f0f0" }}
            width={200}
          >
            <UserImage user={user} />
            <UserSettingMenu mode="inline" />
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <Switch>
              <Route path={process.env.PUBLIC_URL + "/user/profile"}>
                <UserProfile
                  user={user}
                  changeInfoCustomer={changeInfoCustomer}
                  history={history}
                  getInfoCustomer={getInfoCustomer}
                  location={location}
                />
              </Route>
              <Route exact path={process.env.PUBLIC_URL + "/user/address"}>
                <AddressList />
              </Route>
              <Route exact path={process.env.PUBLIC_URL + "/user/address/add"}>
                <AddAddress />
              </Route>
              <Route path={process.env.PUBLIC_URL + "/user/address/:addressId"}>
                <EditAddress />
              </Route>
              <Route
                path={process.env.PUBLIC_URL + "/user/change_password"}
                component={() => "Change Password"}
              >
                <ChangePassword
                  user={user}
                  changePassword={changePassword}
                  history={history}
                />
              </Route>
              <Route exact path={process.env.PUBLIC_URL + "/user/orders"}>
                <UserOrderList />
              </Route>
              <Route path={process.env.PUBLIC_URL + "/user/orders/:orderId"}>
                <UserOrderDetails />
              </Route>
            </Switch>
          </Content>
        </Layout>
      </MainLayoutShop>
    </Fragment>
  );
};

export default UserAccount;
