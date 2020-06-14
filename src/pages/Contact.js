import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import MainLayoutShop from "../common/HOCS/MainLayoutShop";
import Breadcrumb from "../wrappers/Breadcrumb";
import LocationMap from "../common/components/widgets/LocationMap";
import { multilanguage } from "redux-multilanguage";

const Contact = ({ location, strings }) => {
  const { pathname } = location;

  return (
    <Fragment>
      <MetaTags>
        <title>Banana Boys | {strings["contact"]}</title>
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + " "}>
        {strings["home"]}
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        {strings["contact"]}
      </BreadcrumbsItem>
      <MainLayoutShop headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="contact-area pt-100 pb-100">
          <div className="container">
            <div className="contact-map mb-10">
              <LocationMap latitude="47.444" longitude="-122.176" />
            </div>
            <div className="custom-row-2">
              <div className="col-lg-4 col-md-5">
                <div className="contact-info-wrap">
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-phone" />
                    </div>
                    <div className="contact-info-dec">
                      <p>+012 345 678 102</p>
                      <p>+012 345 678 102</p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-globe" />
                    </div>
                    <div className="contact-info-dec">
                      <p>
                        <a href="mailto:urname@email.com">
                          bananaboy@email.com
                        </a>
                      </p>
                      <p>
                        <a href="//urwebsitenaem.com">bananaboywebsite.com</a>
                      </p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-map-marker" />
                    </div>
                    <div className="contact-info-dec">
                      <p>Địa chỉ, </p>
                      <p>105M Hồ Thị Kỷ, Quận 10.</p>
                    </div>
                  </div>
                  <div className="contact-social text-center">
                    <h3>Theo dõi chúng tôi</h3>
                    <ul>
                      <li>
                        <a href="//facebook.com">
                          <i className="fa fa-facebook" />
                        </a>
                      </li>
                      <li>
                        <a href="//pinterest.com">
                          <i className="fa fa-pinterest-p" />
                        </a>
                      </li>
                      <li>
                        <a href="//thumblr.com">
                          <i className="fa fa-tumblr" />
                        </a>
                      </li>
                      <li>
                        <a href="//vimeo.com">
                          <i className="fa fa-vimeo" />
                        </a>
                      </li>
                      <li>
                        <a href="//twitter.com">
                          <i className="fa fa-twitter" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-md-7">
                <div className="contact-form">
                  <div className="contact-title mb-30">
                    <h2>LIÊN LẠC </h2>
                  </div>
                  <form className="contact-form-style">
                    <div className="row">
                      <div className="col-lg-6">
                        <input name="name" placeholder="Họ tên*" type="text" />
                      </div>
                      <div className="col-lg-6">
                        <input
                          name="email"
                          placeholder="E-mail*"
                          type="email"
                        />
                      </div>
                      <div className="col-lg-12">
                        <input
                          name="subject"
                          placeholder="Vấn đề*"
                          type="text"
                        />
                      </div>
                      <div className="col-lg-12">
                        <textarea
                          name="message"
                          placeholder="Lời nhắn của bạn*"
                          defaultValue={""}
                        />
                        <button className="submit" type="submit">
                          GỬI
                        </button>
                      </div>
                    </div>
                  </form>
                  <p className="form-messege" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayoutShop>
    </Fragment>
  );
};

Contact.propTypes = {
  location: PropTypes.object,
};

export default multilanguage(Contact);
