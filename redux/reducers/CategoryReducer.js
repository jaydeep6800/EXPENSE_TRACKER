import {
  ADD_CATEGORY,
  EDIT_CATEGORY,
  DELETE_CATEGORY
} from '../actions/Types';

// DB ...

import {
  fetchCategories,
  insertCategory,
  updateCategory,
  deleteCategory
} from '../../helpers/db';

const initialState = {
  IncomecategoryList: fetchCategories('income'),
  ExpensecategoryList: fetchCategories('expense')
};

const AccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      insertCategory(
        action.data.name,
        action.data.type,
        action.data.date
      );
      return {
        ...state,
        IncomecategoryList: fetchCategories('income'),
        ExpensecategoryList: fetchCategories('expense')
      };
    case EDIT_CATEGORY:
      updateCategory(action.data.id, action.data.name);

      return {
        ...state,
        IncomecategoryList: fetchCategories('income'),
        ExpensecategoryList: fetchCategories('expense')
      };

    case DELETE_CATEGORY:
      deleteCategory(action.id);
      return {
        ...state,
        IncomecategoryList: fetchCategories('income'),
        ExpensecategoryList: fetchCategories('expense')
      };
    default:
      return state;
  }
};

export default AccountReducer;
