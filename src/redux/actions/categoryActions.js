import { categoryService } from "../../api-services/category-service";
import { GET_CATEGORY } from "../constant";

export const fetchCategory = async () => {
  const data = await categoryService.get();
  return dispatch => {
    dispatch({
      type: GET_CATEGORY,
      payload: []
    });
  };
};
