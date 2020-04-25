import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Login from "./Login";
import Register from "./Register";
import Breadcrumb from "../../../wrappers/Breadcrumb";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import MainLayoutShop from "../../../common/HOCS/MainLayoutShop";
import { multilanguage } from "redux-multilanguage";

const LoginRegister = ({ strings, location, history, loginAccount, registerAccount }) => {
  const { pathname } = location;

  return (
    <Fragment>
    <MetaTags>
      <title>{`Banana Boys | ${strings['login']}`}</title>
    </MetaTags>
    <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
    <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
      Login Register
    </BreadcrumbsItem>
    <MainLayoutShop headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>{strings['login']}</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>{strings['register']}</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <Login
                          history={history}
                          loginAccount={loginAccount}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <Register
                          history={history}
                          registerAccount={registerAccount}
                        />
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
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
  strings: PropTypes.object
};

export default multilanguage(LoginRegister);
