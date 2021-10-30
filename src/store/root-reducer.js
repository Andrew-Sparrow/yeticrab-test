import {combineReducers} from 'redux';
import {orders} from './orders/orders';
import {form} from './form/form';
import {search} from './search/search';
import {page} from './page/page';

export const NameSpace = {
  ORDERS: 'ORDERS',
  FORM: 'FORM',
  SEARCH: 'SEARCH',
  PAGE: 'PAGE',
};

export default combineReducers({
  [NameSpace.ORDERS]: orders,
  [NameSpace.FORM]: form,
  [NameSpace.SEARCH]: search,
  [NameSpace.PAGE]: page
});
