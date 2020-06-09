import {
  ADD_ACCOUNT,
  EDIT_ACCOUNT,
  DELETE_ACCOUNT,
  ADD_ACCOUNT_PRICE,
  SUB_ACCOUNT_PRICE
} from '../actions/Types';

// DB ...

import {
  fetchAccounts,
  fetchAllAccounts,
  insertAccount,
  updateAccount,
  deleteAccount,
  addAccountPrice,
  subAccountPrice
} from '../../helpers/db';

const initialState = {
  accountList: fetchAccounts(),
  AllAccountList: fetchAllAccounts()
};

const AccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ACCOUNT:
      insertAccount(
        action.data.name,
        action.data.price,
        action.data.date
      );
      return {
        ...state,
        accountList: fetchAccounts()
      };
    case EDIT_ACCOUNT:
      updateAccount(action.id, action.name);

      return {
        ...state,
        accountList: fetchAccounts(),
        AllAccountList: fetchAllAccounts()
      };

    case DELETE_ACCOUNT:
      deleteAccount(action.id);
      return {
        ...state,
        accountList: fetchAccounts()
      };
    case ADD_ACCOUNT_PRICE:
      addAccountPrice(action.id, action.price);
      return {
        ...state,
        accountList: fetchAccounts()
      };
    case SUB_ACCOUNT_PRICE:
      subAccountPrice(action.id, action.price);
      return {
        ...state,
        accountList: fetchAccounts()
      };
    default:
      return state;
  }
};

export default AccountReducer;
