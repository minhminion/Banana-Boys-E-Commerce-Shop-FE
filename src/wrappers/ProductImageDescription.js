import PropTypes from "prop-types";
import React from "react";
import { getDiscountPrice } from "../common/helpers/product";
import ProductImageGallery from "../common/components/product/ProductImageGallery";
import ProductDescriptionInfo from "../common/components/product/ProductDescriptionInfo";
import ProductImageGallerySideThumb from "../common/components/product/ProductImageGallerySideThumb";
import ProductImageFixed from "../common/components/product/ProductImageFixed";

const ProductImageDescription = ({
  spaceTopClass,
  spaceBottomClass,
  galleryType,
  product,
  currency,
  cartItems,
  wishlistItems,
}) => {
  const wishlistItem = wishlistItems.filter(
    wishlistItem => wishlistItem.id === product.id
  )[0];

   // THIS GET DISCOUNT BY %
  // const discountedPrice = getDiscountPrice(product.salePrice, product.price);
  const discountedPrice = product.salePrice
  const finalProductPrice = +(product.price * currency.currencyRate);
  const finalDiscountedPrice = +(
    discountedPrice * currency.currencyRate
  );

  return (
    <div
      className={`shop-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-5">
            {/* product image gallery */}
            {galleryType === "leftThumb" ? (
              <ProductImageGallerySideThumb
                product={product}
                thumbPosition="left"
              />
            ) : galleryType === "rightThumb" ? (
              <ProductImageGallerySideThumb product={product} />
            ) : galleryType === "fixedImage" ? (
              <ProductImageFixed product={product} />
            ) : (
              <ProductImageGallery product={product} />
            )}
          </div>
          <div className="col-lg-7 col-md-7">
            {/* product description info */}
            <ProductDescriptionInfo
              product={product}
              discountedPrice={discountedPrice}
              currency={currency}
              finalDiscountedPrice={finalDiscountedPrice}
              finalProductPrice={finalProductPrice}
              cartItems={cartItems}
              wishlistItem={wishlistItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ProductImageDescription.propTypes = {
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  currency: PropTypes.object,
  galleryType: PropTypes.string,
  product: PropTypes.object,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
  wishlistItems: PropTypes.array
};


export default ProductImageDescription;
