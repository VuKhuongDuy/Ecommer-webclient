export const ADD_TO_CART = "ADD_TO_CART";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const DELETE_ALL_FROM_CART = "DELETE_ALL_FROM_CART";

//add to cart
export const addToCart = (
  item,
  addToast,
  quantityCount,
  selectedProperties = new Map(),
) => {
  if(item.selectedProperties && Object.keys(item.selectedProperties).length){
    selectedProperties = item.selectedProperties.reduce((pre,cur) => {
      pre.set(cur.key, cur.value)
      return pre
    }, new Map())
  }

  return dispatch => {
    if (addToast) {
      addToast("Added To Cart", { appearance: "success", autoDismiss: true });
    }
    const arrayProp = [...selectedProperties.keys()].map(key => {
      return {
        key,
        value: selectedProperties.get(key)
      }
    })
    dispatch({
      type: ADD_TO_CART,
      payload: {
        ...item,
        cartQuantity: quantityCount,
        selectedProperties: arrayProp
      }
    });
  };
};
//decrease from cart
export const decreaseQuantity = (item, addToast) => {
  return dispatch => {
    if (addToast) {
      addToast("Item Decremented From Cart", {
        appearance: "warning",
        autoDismiss: true
      });
    }
    dispatch({ type: DECREASE_QUANTITY, payload: item });
  };
};
//delete from cart
export const deleteFromCart = (item, addToast) => {
  return dispatch => {
    if (addToast) {
      addToast("Removed From Cart", { appearance: "error", autoDismiss: true });
    }
    dispatch({ type: DELETE_FROM_CART, payload: item });
  };
};
//delete all from cart
export const deleteAllFromCart = addToast => {
  return dispatch => {
    if (addToast) {
      addToast("Removed All From Cart", {
        appearance: "error",
        autoDismiss: true
      });
    }
    dispatch({ type: DELETE_ALL_FROM_CART });
  };
};

// get stock of cart item
export const cartItemStock = (item, color, size) => {
  if (item.quantity) {
    return item.quantity;
  } else {
    return item.properties
      .filter(single => single.color === color)[0]
      .size.filter(single => single.name === size)[0].quantity;
  }
};
