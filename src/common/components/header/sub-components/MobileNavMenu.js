import PropTypes from "prop-types";
import React from "react";
import { multilanguage } from "redux-multilanguage";
import { createNavMobile } from "../NavItem";

const MobileNavMenu = ({ strings }) => {
  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      {createNavMobile(strings)}
    </nav>
  );
};

MobileNavMenu.propTypes = {
  strings: PropTypes.object
};

export default multilanguage(MobileNavMenu);
