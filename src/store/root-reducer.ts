import {combineReducers} from 'redux';
import {orders} from './orders/orders';
import {form} from './form/form';

export const NameSpace = {
  ORDERS: 'ORDERS',
  FORM: 'FORM',
};

 const rootReducer = combineReducers({
  [NameSpace.ORDERS]: orders,
  [NameSpace.FORM]: form,
 });

export type RootState = ReturnType<typeof rootReducer>;

export {rootReducer};
