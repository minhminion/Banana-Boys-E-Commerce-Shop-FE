import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
// import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
// import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
// import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import Breadcrumb from "../../../../wrappers/Breadcrumb";
import MainLayoutShop from "../../../../common/HOCS/MainLayoutShop";
import ProductImageDescription from "../../../../wrappers/ProductImageDescription";
import ProductDescriptionTab from "../../../../wrappers/ProductDescriptionTab";
import RelatedProductSlider from "../../../../wrappers/RelatedProductSlider";

const ProductInfo = ({ location, product, strings, cartItems, currency, wishlistItems }) => {
  const { pathname } = location;

  return (
    <Fragment>
      <MetaTags>
        <title>Banana Boys | Product Page</title>
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>{strings['home']}</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Shop Product
      </BreadcrumbsItem>

      <MainLayoutShop headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        {/* product description with image */}
        <ProductImageDescription
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          product={product}
          currency={currency}
          cartItems={cartItems}
          wishlistItems={wishlistItems}
        />

        {/* product description tab */}
        <ProductDescriptionTab
          spaceBottomClass="pb-90"
          productFullDesc={product.fullDescription}
        />

        {/* related product slider */}
        <RelatedProductSlider
          spaceBottomClass="pb-95"
          category={product.category[0]}
        />
      </MainLayoutShop>
    </Fragment>
  );
};

ProductInfo.propTypes = {
  location: PropTypes.object,
  product: PropTypes.object,
  strings: PropTypes.object,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  wishlistItems: PropTypes.array
};

export default ProductInfo;
