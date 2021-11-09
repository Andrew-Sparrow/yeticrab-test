import {combineReducers} from 'redux';
import {orders} from './orders/orders';
import {form} from './form/form';

export const NameSpace = {
  ORDERS: 'ORDERS',
  FORM: 'FORM',
};

export default combineReducers({
  [NameSpace.ORDERS]: orders,
  [NameSpace.FORM]: form,
});
