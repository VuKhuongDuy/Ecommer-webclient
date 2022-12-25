import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import wishlistReducer from "./wishlistReducer";
import compareReducer from "./compareReducer";
import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";

const rootReducer = combineReducers({
  productData: productReducer,
  categoryData: categoryReducer,
  cartData: cartReducer,
  wishlistData: wishlistReducer,
  compareData: compareReducer,
});

export default rootReducer;
