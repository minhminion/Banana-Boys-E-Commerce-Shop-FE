import PropTypes from "prop-types";
import React, { Fragment, useState } from 'react';
import MetaTags from 'react-meta-tags';
import Paginator from 'react-hooks-paginator';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';

import ShopSidebar from '../../../../wrappers/ShopSidebar';
import ShopTopbar from '../../../../wrappers/ShopTopbar';
import ShopProducts from '../../../../wrappers/ShopProducts';
import MainLayoutShop from "../../../../common/HOCS/MainLayoutShop";
import Breadcrumb from "../../../../wrappers/Breadcrumb";
import { multilanguage } from "redux-multilanguage";

const SingleProduct = ({ location, strings }) => {
  const [layout, setLayout] = useState('grid three-column');
  // const [sortType, setSortType] = useState('');
  // const [sortValue, setSortValue] = useState('');
  // const [filterSortType, setFilterSortType] = useState('');
  // const [filterSortValue, setFilterSortValue] = useState('');
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  // const [currentData, setCurrentData] = useState([]);

  const products = require('../../../../data/products.json')

  const pageLimit = 15;
  const { pathname } = location;

  const getLayout = (layout) => {
    setLayout(layout)
  }

  // const getSortParams = (sortType, sortValue) => {
  //   setSortType(sortType);
  //   setSortValue(sortValue);
  // }

  // const getFilterSortParams = (sortType, sortValue) => {
  //   setFilterSortType(sortType);
  //   setFilterSortValue(sortValue);
  // }

  return (
    <Fragment>
      <MetaTags>
        <title>Banana Boys | {strings['shop']}</title>
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>{strings['home']}</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>{strings['shop']}</BreadcrumbsItem>

      <MainLayoutShop headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        <div className="shop-area pt-95 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 order-2 order-lg-1">
                {/* shop sidebar */}
                <ShopSidebar
                  products={products}
                  sideSpaceClass="mr-30"
                  // getSortParams={getSortParams}
                />
              </div>
              <div className="col-lg-9 order-1 order-lg-2">
                {/* shop topbar default */}
                <ShopTopbar
                  getLayout={getLayout}
                  productCount={12}
                  // getFilterSortParams={getFilterSortParams}
                  // sortedProductCount={currentData.length}
                />

                {/* shop page content default */}
                <ShopProducts layout={layout} products={products} />

                {/* shop product pagination */}
                <div className="pro-pagination-style text-center mt-30">
                  <Paginator
                    offset={offset}
                    totalRecords={150}
                    pageLimit={pageLimit}
                    pageNeighbours={2}
                    setOffset={setOffset}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageContainerClass="mb-0 mt-0"
                    pagePrevText="«"
                    pageNextText="»"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayoutShop>
    </Fragment>
  )
}

SingleProduct.propTypes = {
  location: PropTypes.object,
}

export default multilanguage(SingleProduct)