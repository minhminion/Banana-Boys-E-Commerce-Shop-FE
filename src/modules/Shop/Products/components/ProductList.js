import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useCallback } from "react";
import MetaTags from "react-meta-tags";
import Paginator from "react-hooks-paginator";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

import ShopSidebar from "../../../../wrappers/ShopSidebar";
import ShopTopbar from "../../../../wrappers/ShopTopbar";
import ShopProducts from "../../../../wrappers/ShopProducts";
import MainLayoutShop from "../../../../common/HOCS/MainLayoutShop";
import Breadcrumb from "../../../../wrappers/Breadcrumb";
import { multilanguage } from "redux-multilanguage";
import { animateScroll } from "react-scroll";

const SingleProduct = ({
  location,
  strings,
  getAllProducts,
  getCategories,
}) => {
  const [layout, setLayout] = useState("grid three-column");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  console.log('======== Bao Minh: categories', categories)
  const [pagination, setPagination] = useState({
    current: 1,
    total: 1,
    offset: 0,
  });
  const [params, setParams] = useState({})
  const pageSize = 9

  const { pathname } = location;

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      response && response.data && setCategories(response.data);
    };
    fetchCategories();
  }, [getCategories]);

  const fetchAllProducts = async (pageNumber, params) => {
    console.log("run Fetch Product")
    const response = await getAllProducts(pageNumber, { ...params, pageSize });
    if (response && response.data) {
      setProducts(response.data);
      setPagination((prev) => ({
        ...prev,
        pageSize: response.pageSize,
        total: response.pageSize * response.totalPage,
      }));
    }
  };

  useEffect(() => {
    fetchAllProducts(pagination.current, params);
    return () => null
  }, [pagination.current, params]);

  const getLayout = (layout) => {
    setLayout(layout);
  };

  const getSortParams = (sortValue) => {
    let params
    setParams((prev) => {
      params = {
        ...prev,
        CategoryIds: sortValue[0]
      }
      return params
    })
    // fetchAllProducts(1, params)
  }

  // const getFilterSortParams = (sortType, sortValue) => {
  //   setFilterSortType(sortType);
  //   setFilterSortValue(sortValue);
  // }

  const handlePagination = (value) => {
    setPagination(prev => ({
      ...prev,
      current: value
    }))
    animateScroll.scrollTo(200)
  }

  return (
    <Fragment>
      <MetaTags>
        <title>Banana Boys | {strings["shop"]}</title>
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
        {strings["home"]}
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        {strings["shop"]}
      </BreadcrumbsItem>

      <MainLayoutShop headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        <div className="shop-area pt-95 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 order-2 order-lg-1">
                {/* shop sidebar */}
                <ShopSidebar
                  categories={categories}
                  sideSpaceClass="mr-30"
                  getSortParams={getSortParams}
                />
              </div>
              <div className="col-lg-9 order-1 order-lg-2">
                {/* shop topbar default */}
                <ShopTopbar
                  getLayout={getLayout}
                  productCount={pagination.total}
                  // getFilterSortParams={getFilterSortParams}
                  // sortedProductCount={currentData.length}
                />

                {/* shop page content default */}
                <ShopProducts layout={layout} products={products} />

                {/* shop product pagination */}
                <div className="pro-pagination-style text-center mt-30">
                  <Paginator
                    offset={pagination.offset}
                    totalRecords={pagination.total}
                    pageLimit={pageSize}
                    setOffset={(value) => setPagination(prev => ({
                      ...prev,
                      offset: value
                    }))}
                    pageNeighbours={2}
                    currentPage={pagination.current}
                    setCurrentPage={handlePagination}
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
  );
};

SingleProduct.propTypes = {
  location: PropTypes.object,
};

export default multilanguage(SingleProduct);
