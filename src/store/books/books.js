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
  books: [],
  isDataLoaded: false,
  activeGroupName: 'All',
};

const books = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGroup, (state, action) => {
      state.activeGroupName = action.payload;
    })
    .addCase(loadBooksAction, (state, action) => {
      state.books = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(changeFavoriteAction, (state, action) => {
      state.books = Util.getUpdatedBooks(action.payload.id, state.books, action.payload.favorite);
      return state;
    })
    .addCase(deleteItemAction, (state, action) => {
      state.books = Util.deleteItem(action.payload, state.books);
    })
    .addCase(addNewBookAction, (state, action) => {
      state.books = Util.addNewItem(action.payload, state.books);
    })
});

export {books};
