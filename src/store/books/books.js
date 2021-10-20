import {createReducer} from '@reduxjs/toolkit';
import Util from '../../util/util';

import {
  changeGroup,
  loadBooksAction,
  addNewBookAction,
  changeFavoriteAction,
  deleteItemAction
} from '../actions';

const initialState = {
  orders: [],
  isDataLoaded: false,
  activeGroupName: 'All',
};

const orders = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGroup, (state, action) => {
      state.activeGroupName = action.payload;
    })
    .addCase(loadBooksAction, (state, action) => {
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
    .addCase(addNewBookAction, (state, action) => {
      state.orders = Util.addNewItem(action.payload, state.orders);
    })
});

export {orders as books};
