import {
  ADD_ACCOUNT,
  EDIT_ACCOUNT,
  DELETE_ACCOUNT,
  ADD_ACCOUNT_PRICE,
  SUB_ACCOUNT_PRICE
} from './Types';

import { fetchAccounts } from '../../helpers/db';

export const addAccount = account => ({
  type: ADD_ACCOUNT,
  data: account
});

export const editAccount = (id, name) => ({
  type: EDIT_ACCOUNT,
  id: id,
  name: name
});

export const deleteAccount = id => ({
  type: DELETE_ACCOUNT,
  id: id
});

export const addAccountPrice = (id, price) => ({
  type: ADD_ACCOUNT_PRICE,
  id: id,
  price: price
});
export const subAccountPrice = (id, price) => ({
  type: SUB_ACCOUNT_PRICE,
  id: id,
  price: price
});
