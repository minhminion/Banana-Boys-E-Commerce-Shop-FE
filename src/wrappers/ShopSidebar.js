import PropTypes from "prop-types";
import React from "react";
import ShopSearch from '../common/components/product/ShopSearch'
import ShopCategories from "../common/components/product/ShopCategories";
import ShopTag from "../common/components/product/ShopTag";

const ShopSidebar = ({ getSortParams, sideSpaceClass, categories }) => {

  return (
    <div className={`sidebar-style ${sideSpaceClass ? sideSpaceClass : ""}`}>
      {/* shop search */}
      <ShopSearch />

      {/* filter by categories */}
      <ShopCategories
        categories={categories}
        getSortParams={getSortParams}
      />

      {/* filter by tag */}
      {/* <ShopTag tags={uniqueTags} getSortParams={getSortParams} /> */}
    </div>
  );
};

ShopSidebar.propTypes = {
  getSortParams: PropTypes.func,
  products: PropTypes.array,
  sideSpaceClass: PropTypes.string
};

export default ShopSidebar;
