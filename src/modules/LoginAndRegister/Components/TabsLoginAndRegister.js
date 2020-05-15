import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
// import Tab from "react-bootstrap/Tab";
// import Nav from "react-bootstrap/Nav";
import Login from "./Login";
import Register from "./Register";
import Breadcrumb from "../../../wrappers/Breadcrumb";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import MainLayoutShop from "../../../common/HOCS/MainLayoutShop";
import { multilanguage } from "redux-multilanguage";
import { Tabs } from "antd";
import "../Components/css/TabsLoginAndRegister.css";

const { TabPane } = Tabs;

const LoginRegister = (props) => {
  const { strings, location, loginAccount, registerAccount, history } = props;
  const { pathname } = location;

  return (
    <Fragment>
      <MetaTags>
        <title>{`Banana Boys | ${strings["login"]}`}</title>
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Login Register
      </BreadcrumbsItem>
      <MainLayoutShop headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pb-100">
          <div className="container">
            <div className="row">
              <div className="login-register-wrapper">
                <div className="login-register-left">
                  <h2>Đăng nhập</h2>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "300",
                      color: "rgb(120, 120, 120)",
                    }}
                  >
                    Đăng nhập để theo dõi đơn hàng, lưu danh sách sản phẩm yêu
                    thích, nhận nhiều ưu đãi hấp dẫn.
                  </p>
                  <img
                    src="https://frontend.tikicdn.com/_new-next/static/img/graphic-map.png"
                    alt=""
                  />
                </div>
                <div className="login-register-right">
                  <Tabs defaultActiveKey="login">
                    <TabPane
                      tab={<span style={{ fontSize: "20px" }}>Đăng nhập</span>}
                      key="login"
                    >
                      <Login loginAccount={loginAccount} history={history} />
                    </TabPane>
                    <TabPane
                      tab={<span style={{ fontSize: "20px" }}>Đăng ký</span>}
                      key="register"
                    >
                      <Register
                        registerAccount={registerAccount}
                        history={history}
                      />
                    </TabPane>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayoutShop>
    </Fragment>
  );
};

LoginRegister.propTypes = {
  location: PropTypes.object,
  strings: PropTypes.object,
};

export default multilanguage(LoginRegister);
