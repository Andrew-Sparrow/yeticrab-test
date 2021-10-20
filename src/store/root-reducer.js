import {combineReducers} from 'redux';
import {books} from './books/books';

export const NameSpace = {
  ORDERS: 'ORDERS',
};

export default combineReducers({
  [NameSpace.ORDERS]: books,
});
