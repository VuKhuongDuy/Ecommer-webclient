import { Fragment, useState } from "react";
import Link from "next/link";
import { getProductCartQuantity, getPercentDiscount } from "../../lib/product";
import { ProductRating } from "../Product";
import { BsShield } from "react-icons/bs";
import { AiOutlineReload } from "react-icons/ai";
import { GiSwapBag } from "react-icons/gi";
import {
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoGoogleplus,
  IoLogoYoutube,
  IoLogoInstagram,
} from "react-icons/io";

const ProductDescription = ({
  product,
  productPrice,
  discountedPrice,
  cartItems,
  addToast,
  addToCart,
  productContentButtonStyleClass,
}) => {
  const initProductProperties = product.properties.reduce((pre, cur) => {
    pre.set(cur.name, cur.value[0])
    return pre;
  }, new Map())

  const [rerender, setRerender] = useState(false);
  const [selectedProperties, setSelectedProperties] = useState(initProductProperties);
  const [selectedProductColor, setSelectedProductColor] = useState(
    product.variation ? product.variation[0].color : ""
  );
  const [selectedProductSize, setSelectedProductSize] = useState(
    product.variation ? product.variation[0].size[0].name : ""
  );
  const [productStock, setProductStock] = useState(
    product.variation ? product.variation[0].size[0].stock : product.stock
  );
  const [quantityCount, setQuantityCount] = useState(1);

  const productCartQty = getProductCartQuantity(
    cartItems,
    product,
    selectedProductColor,
    selectedProductSize
  );

  const setSelectedProductType = (property, value) => {
    const tmp = selectedProperties;
    tmp.set(property, value)
    setSelectedProperties(tmp);
    setRerender(!rerender);
  };

  const checkPropertySelect = (propertyName, index, value) => {
    if (!selectedProperties.get(propertyName) && index === 0) {
      return "checked";
    } else if (selectedProperties.get(propertyName) === value) {
      return "checked";
    }
    return "";
  };

  return (
    <div className="product-content">
      <h2 className="product-content__title space-mb--10">{product.name}</h2>
      <div className="product-content__price-rating-wrapper space-mb--10">
        <div className="product-content__price d-flex-align-items-center">
          {product.discount ? (
            <Fragment>
              <span className="price">${discountedPrice}</span>
              <del>${productPrice}</del>
              <span className="on-sale">
                {getPercentDiscount(product)}% Off
              </span>
            </Fragment>
          ) : (
            <span className="price">${productPrice}</span>
          )}
        </div>
        {product.rating && product.rating > 0 ? (
          <div className="product-content__rating-wrap">
            <div className="product-content__rating">
              <ProductRating ratingValue={product.rating} />
              <span>({product.ratingCount})</span>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="product-content__description space-mb--20">
        <p>{product.title}</p>
      </div>

      <div className="product-content__sort-info space-mb--20">
        <ul>
          <li>
            <BsShield /> 1 Year Brand Warranty
          </li>
          <li>
            <AiOutlineReload /> 30 Days Return Policy
          </li>
          <li>
            <GiSwapBag /> Cash on Delivery available
          </li>
        </ul>
      </div>

      {product.properties ? (
        <div className="product-quickview__size-color">
          {product.properties.map((property, index) => (
            <div
              className="product-quickview__size space-mb--10"
              key={`${rerender}-${index}`}
            >
              <div className="product-quickview__size__title">
                {property.name}
              </div>
              <div className="product-quickview__size__content">
                {property.value.map((single, i) => {
                  return (
                    <Fragment key={i}>
                      <input
                        type="radio"
                        value={single}
                        checked={checkPropertySelect(property.name, i, single)}
                        id={single}
                        onChange={() => {
                          setSelectedProductType(property.name, single);
                          // setProductStock(single.stock);
                          setQuantityCount(1);
                        }}
                      />
                      <label htmlFor={single}>{single}</label>
                    </Fragment>
                  );
                })}
              </div>
            </div>
          ))}
          {/* <div className="product-quickview__color space-mb--10">
                    <div className="product-quickview__color__title">Color</div>
                    <div className="product-quickview__color__content">
                      {product.variation.map((single, i) => {
                        return (
                          <Fragment key={i}>
                            <input
                              type="radio"
                              value={single.color}
                              name="product-color"
                              id={single.color}
                              checked={
                                single.color === selectedProductColor
                                  ? "checked"
                                  : ""
                              }
                              onChange={() => {
                                setSelectedProductColor(single.color);
                                setSelectedProductSize(single.size[0].name);
                                setProductStock(single.size[0].stock);
                                setQuantityCount(1);
                              }}
                            />
                            <label
                              htmlFor={single.color}
                              style={{ backgroundColor: single.colorCode }}
                            ></label>
                          </Fragment>
                        );
                      })}
                    </div>
                  </div>
                  <div className="product-quickview__size space-mb--20">
                    <div className="product-quickview__size__title">Size</div>
                    <div className="product-quickview__size__content">
                      {product.variation &&
                        product.variation.map((single) => {
                          return single.color === selectedProductColor
                            ? single.size.map((singleSize, i) => {
                                return (
                                  <Fragment key={i}>
                                    <input
                                      type="radio"
                                      value={singleSize.name}
                                      checked={
                                        singleSize.name === selectedProductSize
                                          ? "checked"
                                          : ""
                                      }
                                      id={singleSize.name}
                                      onChange={() => {
                                        setSelectedProductSize(singleSize.name);
                                        setProductStock(singleSize.stock);
                                        setQuantityCount(1);
                                      }}
                                    />
                                    <label htmlFor={singleSize.name}>
                                      {singleSize.name}
                                    </label>
                                  </Fragment>
                                );
                              })
                            : "";
                        })}
                    </div>
                  </div> */}
        </div>
      ) : (
        ""
      )}
      <hr />
      {/* {product.slug ? (
        <div className="product-content__quality">
          <div className="product-content__cart btn-hover">
            <a
              href={product.slug}
              target="_blank"
              className="btn btn-fill-out btn-addtocart" rel="noreferrer"
            >
              Buy Now
            </a>
          </div>
        </div>
      ) :  */}
      {/* ( */}
        <Fragment>
          <div
            className={`${
              productContentButtonStyleClass
                ? productContentButtonStyleClass
                : "product-content__button-wrapper d-flex align-items-center"
            }`}
          >
            <div className="product-content__quantity">
              <div className="cart-plus-minus">
                <button
                  onClick={() =>
                    setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
                  }
                  className="qtybutton"
                >
                  -
                </button>
                <input
                  className="cart-plus-minus-box"
                  type="text"
                  value={quantityCount}
                  readOnly
                />
                <button
                  onClick={() =>
                    setQuantityCount(
                      quantityCount < product.quantity
                        ? quantityCount + 1
                        : quantityCount
                    )
                  }
                  className="qtybutton"
                >
                  +
                </button>
              </div>
            </div>
            {product.quantity > 0 ? (
              <button
                onClick={() =>{
                  addToCart(
                    product,
                    addToast,
                    quantityCount,
                    selectedProperties,
                  )}
                }
                // disabled={product.quantity >= product.sale_count}
                className="btn btn-fill-out btn-addtocart space-ml--10"
              >
                <i className="icon-basket-loaded" /> Add To Cart
              </button>
            ) : (
              <button className="btn btn-fill-out btn-addtocart" disabled>
                Out of Stock
              </button>
            )}

            {/* <button
              className={`product-content__compare ${
                compareItem !== undefined ? "active" : ""
              }`}
              title={
                compareItem !== undefined
                  ? "Added to compare"
                  : "Add to compare"
              }
              onClick={
                compareItem !== undefined
                  ? () => deleteFromCompare(product, addToast)
                  : () => addToCompare(product, addToast)
              }
            >
              <i className="icon-shuffle" />
            </button>

            <button
              className={`product-content__wishlist ${
                wishlistItem !== undefined ? "active" : ""
              }`}
              title={
                wishlistItem !== undefined
                  ? "Added to wishlist"
                  : "Add to wishlist"
              }
              onClick={
                wishlistItem !== undefined
                  ? () => deleteFromWishlist(product, addToast)
                  : () => addToWishlist(product, addToast)
              }
            >
              <i className="icon-heart" />
            </button> */}
          </div>
        </Fragment>
      {/* )} */}
      <hr />
      <ul className="product-content__product-meta">
        <li>
          SKU: <span>{product.sku}</span>
        </li>
        {/* <li>
          Category:
          {product.category &&
            product.category.map((item, index, arr) => {
              return (
                <Link
                  href="/shop/grid-left-sidebar"
                  as={"/shop/grid-left-sidebar"}
                  key={index}
                >
                  <a>{item + (index !== arr.length - 1 ? ", " : "")}</a>
                </Link>
              );
            })}
        </li>
        <li>
          Tags:
          {product.tag &&
            product.tag.map((item, index, arr) => {
              return (
                <Link
                  href="/shop/grid-left-sidebar"
                  as={"/shop/grid-left-sidebar"}
                  key={index}
                >
                  <a>{item + (index !== arr.length - 1 ? ", " : "")}</a>
                </Link>
              );
            })}
        </li> */}
      </ul>
      <div className="product-content__product-share space-mt--15">
        <span>Share:</span>
        <ul className="social-icons">
          <li>
            <a href="#">
              <IoLogoFacebook />
            </a>
          </li>
          <li>
            <a href="#">
              <IoLogoTwitter />
            </a>
          </li>
          <li>
            <a href="#">
              <IoLogoGoogleplus />
            </a>
          </li>
          <li>
            <a href="#">
              <IoLogoYoutube />
            </a>
          </li>
          <li>
            <a href="#">
              <IoLogoInstagram />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductDescription;
