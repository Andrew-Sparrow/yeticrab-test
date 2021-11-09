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

interface IChangeTabAction {
  type: string;
  payload: string;
}

interface ILoadOrdersAction {
  type: string;
  payload: IOrder[];
}

interface IAddNewOrderAction {
  type: string;
  payload: IOrder;
}

interface IEditOrderAction {
  type: string;
  payload: IOrder;
}

interface IDeleteItemAction {
  type: string;
  payload: number;
}

interface IChangeFavoriteAction {
  type: string;
  payload: {
    id: number;
    favorite: boolean;
  };
}

const orders = createReducer<OrderState>(initialState, (builder) => {
  builder
    .addCase(changeTab, (state: OrderState, action: IChangeTabAction) => {
      state.activeTabName = action.payload;
    })
    .addCase(loadOrdersAction, (state: OrderState, action: ILoadOrdersAction) => {
      state.orders = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(changeFavoriteAction, (state: OrderState, action: IChangeFavoriteAction) => {
      state.orders = Util.getUpdatedOrders(action.payload.id, state.orders, action.payload.favorite);
      return state;
    })
    .addCase(deleteItemAction, (state: OrderState, action: IDeleteItemAction) => {
      state.orders = Util.deleteItem(action.payload, state.orders);
    })
    .addCase(addNewOrderAction, (state: OrderState, action: IAddNewOrderAction) => {
      state.orders = Util.addNewItem(action.payload, state.orders);
    })
    .addCase(editOrderAction, (state: OrderState, action: IEditOrderAction) => {
      state.orders = Util.getEditedOrders(action.payload, state.orders);
    })
    .addDefaultCase((state) => {
      return state;
    })
});

export {orders};
