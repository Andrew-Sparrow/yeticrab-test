import {createReducer} from '@reduxjs/toolkit';
import Util from '../../util/util';
import { IOrder } from '../../types/types';

import {
  changeTab,
  loadOrdersAction,
  addNewOrderAction,
  changeFavoriteAction,
  deleteItemAction,
  editOrderAction,
} from '../actions';

interface OrderState {
  orders: IOrder[],
  isDataLoaded: boolean,
  activeTabName: string,
};

const initialState: OrderState = {
  orders: [],
  isDataLoaded: false,
  activeTabName: 'All',
};

const orders = createReducer<OrderState>(initialState, (builder) => {
  builder
    .addCase(changeTab, (state, action) => {
      state.activeTabName = action.payload;
    })
    .addCase(loadOrdersAction, (state, action) => {
      state.orders = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(changeFavoriteAction, (state, action) => {
      state.orders = Util.getUpdatedOrders(action.payload.id, state.orders, action.payload.favorite);
      return state;
    })
    .addCase(deleteItemAction, (state, action) => {
      state.orders = Util.deleteItem(action.payload, state.orders);
    })
    .addCase(addNewOrderAction, (state, action) => {
      state.orders = Util.addNewItem(action.payload, state.orders);
    })
    .addCase(editOrderAction, (state, action) => {
      state.orders = Util.getEditedOrders(action.payload, state.orders);
    })
    .addDefaultCase((state) => {
      return state;
    })
});

export {orders};
