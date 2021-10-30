import {createReducer} from '@reduxjs/toolkit';

import {
  changeSearchResults,
  changeSearchTerm
} from '../actions';

const initialState = {
  searchResults: [],
  searchTerm: '',
};

const search = createReducer(initialState, (builder) => {
  builder
    .addCase(changeSearchResults, (state, action) => {
      state.searchResults = action.payload;
    })
    .addCase(changeSearchTerm, (state, action) => {
      state.searchTerm = action.payload;
    })
    // .addDefaultCase(() => {
    //   throw new Error('There is no such action type !!!');
    // })
});

export {search};