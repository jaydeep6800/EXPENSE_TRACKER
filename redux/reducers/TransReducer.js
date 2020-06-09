import {
  ADD_TRANS,
  EDIT_TRANS,
  DELETE_TRANS,
  ADD_TRANSFER,
  EDIT_TRANSFER,
  DELETE_TRANSFER
} from '../actions/Types';

// DB ...

import {
  fetchTrans,
  fetchTransfer,
  insertTran,
  insertTransfer,
  updateTransfer,
  deleteTransfer,
  getSalaryCategoryWise,
  updateTran,
  deleteTrans
} from '../../helpers/db';

const initialState = {
  IncomeTransList: fetchTrans('income'),
  ExpenseTransList: fetchTrans('expense'),
  TotalIncomeSalary: getSalaryCategoryWise('income'),
  TotalExpenseSalary: getSalaryCategoryWise('expense'),
  TransferTransList: fetchTransfer()
};

const TransReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TRANSFER:
      insertTransfer(
        action.data.name,
        action.data.transferfrom,
        action.data.transferto,
        action.data.price,
        action.data.date
      );
      return {
        ...state,
        TransferTransList: fetchTransfer()
      };
    case EDIT_TRANSFER:
      updateTransfer(
        action.data.id,
        action.data.name,
        action.data.transferfrom,
        action.data.transferto,
        action.data.price,
        action.data.date
      );
      return {
        ...state,
        TransferTransList: fetchTransfer()
      };
    case DELETE_TRANSFER:
      deleteTransfer(action.id);
      return {
        ...state,
        TransferTransList: fetchTransfer()
      };
    case ADD_TRANS:
      insertTran(
        action.data.name,
        action.data.type,
        action.data.price,
        action.data.date,
        action.data.accountId,
        action.data.categoryId
      );
      return {
        ...state,
        IncomeTransList: fetchTrans('income'),
        ExpenseTransList: fetchTrans('expense')
      };
    case EDIT_TRANS:
      updateTran(
        action.data.id,
        action.data.name,
        action.data.type,
        action.data.price,
        action.data.date,
        action.data.accountId,
        action.data.categoryId
      );

      return {
        ...state,
        IncomeTransList: fetchTrans('income'),
        ExpenseTransList: fetchTrans('expense')
      };

    case DELETE_TRANS:
      deleteTrans(action.id);
      return {
        ...state,
        IncomeTransList: fetchTrans('income'),
        ExpenseTransList: fetchTrans('expense')
      };
    default:
      return state;
  }
};

export default TransReducer;
