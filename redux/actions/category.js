import {
  ADD_CATEGORY,
  EDIT_CATEGORY,
  DELETE_CATEGORY
} from './Types';

export const addCategory = category => ({
  type: ADD_CATEGORY,
  data: category
});

export const editCategory = category => ({
  type: EDIT_CATEGORY,
  data: category
});

export const deleteCategory = id => ({
  type: DELETE_CATEGORY,
  id: id
});
