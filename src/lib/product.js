import { discountService } from "../api-services/discount.service";

// get products
export const getProducts = (products, category, type, limit) => {
  const finalProducts = category
    ? products.filter(
        (product) => product.category.filter((single) => single === category)[0]
      )
    : products;

  if (type && type === "featured") {
    const featuredProducts = finalProducts.filter((single) => single.featured);
    return featuredProducts.slice(0, limit ? limit : featuredProducts.length);
  }
  if (type && type === "deal") {
    const dealProducts = finalProducts.filter((single) => single.dealEnd);
    return dealProducts.slice(0, limit ? limit : dealProducts.length);
  }
  if (type && type === "new") {
    const newProducts = finalProducts.filter((single) => single.new);
    return newProducts.slice(0, limit ? limit : newProducts.length);
  }
  if (type && type === "popular") {
    return (
      finalProducts &&
      finalProducts
        .sort((a, b) => {
          return b.saleCount - a.saleCount;
        })
        .slice(0, limit ? limit : finalProducts.length)
    );
  }
  if (type && type === "topRated") {
    return (
      finalProducts &&
      finalProducts
        .sort((a, b) => {
          return b.rating - a.rating;
        })
        .slice(0, limit ? limit : finalProducts.length)
    );
  }
  if (type && type === "sale") {
    const saleItems =
      finalProducts &&
      finalProducts.filter((single) => single.discount && single.discount > 0);
    return saleItems.slice(0, limit ? limit : saleItems.length);
  }
  return (
    finalProducts &&
    finalProducts.slice(0, limit ? limit : finalProducts.length)
  );
};

// get product discount price
export const getDiscountPrice = (price, discount) => {
  if(!discount) {
    return price;
  }
  if(discount.price) {
    return discount.price;
  }
  if(discount.percent) {
    return price - price * (discount / 100);
  }

  return price;
};

export const getPercentDiscount = (product) => {
  if(product.percent) {
    return product.percent;
  }
  if(product.discount.price) {
    return ((product.selling_price - product.discount.price) * 100 / product.selling_price).toFixed(0);
  }
}

// get product cart quantity
export const getProductCartQuantity = (cartItems, product, color, size) => {
  let productInCart = cartItems.filter(
    (single) =>
      single.id === product.id &&
      (single.selectedProductColor
        ? single.selectedProductColor === color
        : true) &&
      (single.selectedProductSize ? single.selectedProductSize === size : true)
  )[0];
  if (cartItems.length >= 1 && productInCart) {
    if (product.variation) {
      return cartItems.filter(
        (single) =>
          single.id === product.id &&
          single.selectedProductColor === color &&
          single.selectedProductSize === size
      )[0].quantity;
    } else {
      return cartItems.filter((single) => product.id === single.id)[0].quantity;
    }
  } else {
    return 0;
  }
};

//get products based on category
export const getSortedProducts = (products, sortType, sortValue) => {
  if (products && sortType && sortValue) {
    if (sortType === "category") {
      return products.filter(
        (product) =>
          product.category.filter((single) => single === sortValue)[0]
      );
    }
    if (sortType === "tag") {
      return products.filter(
        (product) => product.tag.filter((single) => single === sortValue)[0]
      );
    }
    if (sortType === "color") {
      return products.filter(
        (product) =>
          product.variation &&
          product.variation.filter((single) => single.color === sortValue)[0]
      );
    }
    if (sortType === "size") {
      return products.filter(
        (product) =>
          product.variation &&
          product.variation.filter(
            (single) =>
              single.size.filter((single) => single.name === sortValue)[0]
          )[0]
      );
    }
    if (sortType === "filterSort") {
      let sortProducts = [...products];
      if (sortValue === "default") {
        return sortProducts;
      }
      if (sortValue === "priceHighToLow") {
        return sortProducts.sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (sortValue === "priceLowToHigh") {
        return sortProducts.sort((a, b) => {
          return a.price - b.price;
        });
      }
    }
  }
  return products;
};

// get individual element
const getIndividualItemArray = (array) => {
  let individualItemArray = array.filter((v, i, self) => {
    return i === self.indexOf(v);
  });
  return individualItemArray;
};

// get individual element object
const getIndividualColorObjectArray = (array) => {
  let individualObjectArray = array.filter((v, i, self) => {
    return (
      i ===
      self.findIndex(
        (t) => t.colorName === v.colorName && t.colorCode === v.colorCode
      )
    );
  });
  return individualObjectArray;
};

// get individual categories
// export const getIndividualCategories = (products) => {
//   let productCategories = [];
//   console.log({products})
//   products &&
//   products.length > 0 &&
//     products.map((product) => {
//       return (
//         product.category &&
//         product.category.map((single) => {
//           return productCategories.push(single);
//         })
//       );
//     });
//   var individualProductCategories = [];
//   var obj = {};
//   var newArr = [];

//   function countItems(productCategories, val) {
//     var count = 0,
//       i;
//     while ((i = productCategories.indexOf(val, i)) != -1) {
//       ++count;
//       ++i;
//     }
//     return count;
//   }

//   productCategories.forEach((item) => {
//     let count = countItems(productCategories, item);
//     var objValues = Object.values(obj);
//     newArr.push(objValues[0]);
//     if (newArr.indexOf(item) !== -1) return;
//     obj = {
//       name: item,
//       count: count
//     };
//     individualProductCategories.push(obj);
//   });
//   return individualProductCategories;
// };

// get individual tags
export const getIndividualTags = (products) => {
  let productTags = [];
  products &&
    products.length < 0 &&
    products.map((product) => {
      return (
        product.tag &&
        product.tag.map((single) => {
          return productTags.push(single);
        })
      );
    });
  const individualProductTags = getIndividualItemArray(productTags);
  return individualProductTags;
};

// get individual colors
export const getIndividualColors = (products) => {
  let productColors = [];
  products &&
  products.length > 0 &&
    products.map((product) => {
      return (
        product.variation &&
        product.variation.map((single) => {
          return productColors.push({
            colorName: single.color,
            colorCode: single.colorCode
          });
        })
      );
    });
  const individualProductColors = getIndividualColorObjectArray(productColors);
  return individualProductColors;
};

// get individual sizes
export const getProductsIndividualSizes = (products) => {
  let productSizes = [];
  products &&
    products.length > 0 && 
    products.map((product) => {
      return (
        product.variation &&
        product.variation.map((single) => {
          return single.size.map((single) => {
            return productSizes.push(single.name);
          });
        })
      );
    });
  const individualProductSizes = getIndividualItemArray(productSizes);
  return individualProductSizes;
};

// get product individual sizes
export const getIndividualSizes = (product) => {
  let productSizes = [];
  product.variation &&
    product.variation.map((singleVariation) => {
      return (
        singleVariation.size &&
        singleVariation.size.map((singleSize) => {
          return productSizes.push(singleSize.name);
        })
      );
    });
  const individualSizes = getIndividualItemArray(productSizes);
  return individualSizes;
};

export const setActiveSort = (e) => {
  const filterButtons = document.querySelectorAll(
    ".widget__categories button, .widget__sizes button, .widget__colors button, .widget__tags button"
  );
  filterButtons.forEach((item) => {
    item.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};

export const setActiveLayout = (e) => {
  const gridSwitchBtn = document.querySelectorAll(".products-view button");
  gridSwitchBtn.forEach((item) => {
    item.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};

export const getIndividualCategories = (products) => {
  const categories = [];
  products.forEach((product) => {
    let key = 'Other'
    if(product.category) {
      key = product.category.name;
    }

    const index = categories.findIndex(m => m.name === key);
    if ( index < 0 ) {
      categories.push({
        name: key,
        count: 1,
        id: product.category?.id,
      })
    } else {
      categories[index].count ++;
    }
  })

  return categories;
}

export const compareProperties = (propertiesFirst = [], propertiesSecond = []) => {
  const arr1 = Object.keys(propertiesFirst);
  const arr2 = Object.keys(propertiesSecond);

  if(arr1.length != arr2.length) {
    return false;
  }

  for (const {key, value} of propertiesFirst){
    const value2 = propertiesSecond.find(prop => prop.key === key).value
    if(value2 && value2 !== value) return false
  }

  return true;
}

export const calculateVoucher = (voucher, cartItems) => {
  if(!voucher) return 0;
  const total = cartItems.reduce((pre, product) => {
    const discountedPrice = getDiscountPrice(
      product.selling_price,
      product.discount
    ).toFixed(2);
    return pre + discountedPrice * product.cartQuantity
  },0)

  let totalVoucher = 0;

  if(voucher.listproduct.length === 0) {
    console.log("11111")
    if(voucher.default_value) totalVoucher = voucher.default_value
    if(voucher.default_percent) totalVoucher = total * voucher.default_percent / 100;
    if(voucher.max_value && totalVoucher > voucher.max_value) totalVoucher = voucher.max_value
  }else{
    console.log("2222")

    totalVoucher = voucher.listproduct.reduce((pre, product) => {
      const cartProduct = cartItems.find(p => p.id === product.id)
      
      if(!cartProduct){
        return pre
      } else if(product.price !== undefined) {
        return pre + cartProduct.selling_price - product.price
      } else if (product.percent)  {
        return pre + cartProduct.selling_price * product.percent / 100 
      } else{ 
        return pre
      }
    }, 0)

  }
  if(totalVoucher > voucher.max_value) totalVoucher = voucher.max_value
  return totalVoucher
  
}