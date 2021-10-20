import {combineReducers} from 'redux';
import {orders} from './orders/orders';

export const NameSpace = {
  ORDERS: 'ORDERS',
};

export default combineReducers({
  [NameSpace.ORDERS]: orders,
});
