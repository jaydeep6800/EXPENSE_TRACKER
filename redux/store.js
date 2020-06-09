import { createStore, combineReducers } from 'redux';
import AccountReducer from './reducers/AccountReducer';
import CategoryReducer from './reducers/CategoryReducer';
import TransReducer from './reducers/TransReducer';

const rootReducer = combineReducers({
  AccountReducer: AccountReducer,
  CategoryReducer: CategoryReducer,
  TransReducer: TransReducer
});

export const reduxStore = () => createStore(rootReducer);
