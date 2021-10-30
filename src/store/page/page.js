import {createReducer} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import {getOrders} from '../../store/orders/selectors';

import Util from '../../util/util';

import {
  changePageNumber,
  changePagesTotalAmount
} from '../actions';

const ITEMS_PER_PAGE = 3;
const INITIAL_PAGE_NUMBER = 0;

const getSlicedItemsOnPage = (items) => {
  return items.slice(0, ITEMS_PER_PAGE);
};

// const orders = useSelector(getOrders);

// const displayedItemsOnPage = getSlicedItemsOnPage(orders);

const getPagesTotalAmount = (items) => {
  return Math.ceil(items.length / ITEMS_PER_PAGE);
};

// const pagesTotalAmount = getPagesTotalAmount(orders);

const initialState = {
  pageNumber: INITIAL_PAGE_NUMBER,
  pagesTotalAmount: 0,
  slicedItems: []
};

const page = createReducer(initialState, (builder) => {
  builder
    .addCase(changePageNumber, (state, action) => {
      state.pageNumber = action.payload;
    })
    .addCase(changePagesTotalAmount, (state, action) => {
      state.pagesTotalAmount = action.payload;
    })
    // .addDefaultCase(() => {
    //   throw new Error('There is no such action type !!!');
    // })
});

export {page};