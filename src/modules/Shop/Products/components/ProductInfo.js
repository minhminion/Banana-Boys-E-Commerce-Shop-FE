import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Breadcrumb from "../../../../wrappers/Breadcrumb";
import MainLayoutShop from "../../../../common/HOCS/MainLayoutShop";
import ProductImageDescription from "../../../../wrappers/ProductImageDescription";
import ProductDescriptionTab from "../../../../wrappers/ProductDescriptionTab";
import RelatedProductSlider from "../../../../wrappers/RelatedProductSlider";
import { useParams } from "react-router";
import { ENUMS } from "../../../../constant";
import { Typography } from "antd";

const ProductInfo = ({
  location,
  strings,
  cartItems,
  currency,
  wishlistItems,
  getSingleProduct,
}) => {
  const { pathname } = location;
  const { id } = useParams();

  const [product, setProduct] = useState({});

  const fetchSingleProduct = async (productId) => {
    const response = await getSingleProduct(productId);
    if (response && response.data && response.status === ENUMS.httpStatus.OK) {
      setProduct(response.data.data);
    }
  };

  useEffect(() => {
    fetchSingleProduct(id);
  }, [id]);

  return (
    <Fragment>
      <MetaTags>
        <title>Banana Boys | Product Page</title>
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
        {strings["home"]}
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Shop Product
      </BreadcrumbsItem>

      <MainLayoutShop headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        {product && product.id ? (
          <>
            <ProductImageDescription
              galleryType="leftThumb"
              spaceTopClass="pt-100"
              spaceBottomClass="pb-100"
              product={product}
              currency={currency}
              cartItems={cartItems}
              wishlistItems={wishlistItems}
            />

            {/* product description tab */}
            <ProductDescriptionTab product={product} spaceBottomClass="pb-90" />

            {/* related product slider */}
            <RelatedProductSlider
              spaceBottomClass="pb-95"
              category={product.category}
            />
          </>
        ) : (
          ""
        )}
        {/* product description with image */}
      </MainLayoutShop>
    </Fragment>
  );
};

ProductInfo.propTypes = {
  location: PropTypes.object,
  strings: PropTypes.object,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  wishlistItems: PropTypes.array,
};

export default ProductInfo;
