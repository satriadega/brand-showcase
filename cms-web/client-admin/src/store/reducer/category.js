import { CATEGORIES_SUCCESS, CATEGORIES_LOADING } from "../action/actionType";

const initialState = {
  categories: [],
  categoriesLoading: false,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
      };
    case CATEGORIES_LOADING:
      return {
        ...state,
        categoriesLoading: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
