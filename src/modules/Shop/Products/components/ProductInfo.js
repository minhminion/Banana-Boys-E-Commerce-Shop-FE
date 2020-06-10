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
  createProductRates,
  getAllProductRates,
}) => {
  const initialParams = {
    pageNumber: 1,
    pageSize: 4,
  };

  const { pathname } = location;
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [productRates, setProductRates] = useState([]);
  const [searchParams, setSearchParams] = useState(initialParams);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 4,
  });

  useEffect(() => {
    const fetchSingleProduct = async (productId) => {
      const response = await getSingleProduct(productId);
      if (
        response &&
        response.data &&
        response.status === ENUMS.httpStatus.OK
      ) {
        setProduct(response.data.data);
      }
    };

    fetchSingleProduct(id);
    return () => {
      setProduct({});
    };
  }, [id]);

  useEffect(() => {
    const fetchProductRates = async (productId, params) => {
      const response = await getAllProductRates(productId, params);
      if (
        response &&
        response.data &&
        response.status === ENUMS.httpStatus.OK
      ) {
        setProductRates(response.data.data);
        setPagination({
          current: response.data.pageNumber,
          pageSize: response.data.pageSize,
          total: response.data.pageSize * response.data.totalPage,
        });
      }
    };
    fetchProductRates(id, searchParams);
  }, [id, searchParams, getAllProductRates]);

  const handleOnPaging = (value) => {
    setSearchParams((prev) => ({ ...prev, pageNumber: value }));
  };

  // const handleCreateProductRates = async (values) => {
  //   const data = {
  //     ...values,
  //     productTierId: parseInt(id),
  //   };
  //   const result = await createProductRates(data);
  //   if (result && result.status === ENUMS.httpStatus.CREATED) {
  //     setSearchParams(initialParams);
  //   }
  // };
  
  // WHEN COMMENT CAN UPLOAD IMAGES
  const handleCreateProductRates = async (values) => {
    let formData = new FormData();
    // fields is the form content, append it to formData
    Object.keys(values).map((item) => {
      if (item !== "images") {
        formData.append(item, values[item]);
      } else if (values["images"]) {
        const images = values[item].fileList.map((value) => value.originFileObj);
        for (let i = 0; i < images.length; i++) {
          formData.append("images", images[i], images[i].name);
        }
      }
    });

    formData.append("productTierId", parseInt(id));

    const result = await createProductRates(formData);
    if (result && result.status === ENUMS.httpStatus.CREATED) {
      setSearchParams(initialParams);
    }
  };

  if (!product) {
    return null;
  }

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
            <ProductDescriptionTab
              product={product}
              productRates={productRates}
              onChangePaging={handleOnPaging}
              pagination={pagination}
              spaceBottomClass="pb-90"
              handleCreateProductRates={handleCreateProductRates}
            />

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
