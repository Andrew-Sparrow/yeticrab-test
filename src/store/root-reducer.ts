import {combineReducers} from 'redux';
import {ordersReducer} from './orders/orders';
import {formReducer} from './form/form';

export const NameSpace = {
  ORDERS: 'ORDERS',
  FORM: 'FORM',
};

const rootReducer = combineReducers({
  [NameSpace.ORDERS]: ordersReducer,
  [NameSpace.FORM]: formReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export {rootReducer};
