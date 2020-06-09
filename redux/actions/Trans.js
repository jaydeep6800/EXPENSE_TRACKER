import {
  ADD_TRANS,
  EDIT_TRANS,
  DELETE_TRANS,
  ADD_TRANSFER,
  EDIT_TRANSFER,
  DELETE_TRANSFER
} from './Types';

export const addTrans = trans => ({
  type: ADD_TRANS,
  data: trans
});

export const editTrans = trans => ({
  type: EDIT_TRANS,
  data: trans
});

export const deleteTrans = id => ({
  type: DELETE_TRANS,
  id: id
});

export const addTransfer = trans => ({
  type: ADD_TRANSFER,
  data: trans
});

export const editTransfer = trans => ({
  type: EDIT_TRANSFER,
  data: trans
});

export const deleteTransfer = id => ({
  type: DELETE_TRANSFER,
  id: id
});
