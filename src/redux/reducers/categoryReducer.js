import { v4 as uuidv4 } from "uuid";
import {
} from "../actions/cartActions";
import { GET_CATEGORY } from "../constant";

const initState = [];

const categoryReducer = (state = initState, action) => {
  const categories = action.payload;

  if (action.type === GET_CATEGORY) {
    return [
      ...state,
      categories,
    ];
  }

  return [
    ...state
  ];
};

export default categoryReducer;
