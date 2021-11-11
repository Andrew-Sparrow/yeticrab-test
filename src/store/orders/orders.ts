import {createReducer} from '@reduxjs/toolkit';
import Util from '../../util/util';

import {
  IChangeTabAction,
  IAddNewOrderAction,
  IDeleteItemAction,
  IChangeFavoriteAction,
  ILoadOrdersAction,
  IEditOrderAction,
  IIsOrdersLoadedStatus,
  IOrderState
} from '../../types/types';

import {
  changeTab,
  loadOrdersAction,
  addNewOrderAction,
  changeFavoriteAction,
  deleteItemAction,
  editOrderAction,
  changeIsOrdersLoadedStatus
} from '../actions';

const initialState: IOrderState = {
  orders: [],
  isOrdersLoaded: false,
  activeTabName: 'All',
};

const ordersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeTab, (state: IOrderState, action: IChangeTabAction) => {
      state.activeTabName = action.payload;
    })
    .addCase(loadOrdersAction, (state: IOrderState, action: ILoadOrdersAction) => {
      state.orders = action.payload;
      state.isOrdersLoaded = true;
    })
    .addCase(changeIsOrdersLoadedStatus, (state: IOrderState, action: IIsOrdersLoadedStatus) => {
      state.isOrdersLoaded = action.payload;
    })
    .addCase(changeFavoriteAction, (state: IOrderState, action: IChangeFavoriteAction) => {
      state.orders = Util.getUpdatedOrders(action.payload.id, state.orders, action.payload.favorite);
      return state;
    })
    .addCase(deleteItemAction, (state: IOrderState, action: IDeleteItemAction) => {
      state.orders = Util.deleteItem(action.payload, state.orders);
    })
    .addCase(addNewOrderAction, (state: IOrderState, action: IAddNewOrderAction) => {
      state.orders = Util.addNewItem(action.payload, state.orders);
    })
    .addCase(editOrderAction, (state: IOrderState, action: IEditOrderAction) => {
      state.orders = Util.getEditedOrders(action.payload, state.orders);
    })
    .addDefaultCase((state) => {
      return state;
    })
});

export {ordersReducer};
