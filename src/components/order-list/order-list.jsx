import React, {useReducer, useRef, useEffect} from 'react';
import {Fragment} from 'react';
import PropTypes from 'prop-types';

import Order from '../order/order';
import Search from '../search/search';

import contactProp from '../order/order.prop';
import Pagination from '../pagination/pagination';

const ITEMS_PER_PAGE = 3;
const INITIAL_PAGE_NUMBER = 0;

function OrdersList(props) {
  const {
    orders,
    activeTabName,
  } = props;

  console.log('orders', orders);

  const Actions = {
    CHANGE_PAGE_NUMBER: 'changePageNumber',
    CHANGE_SLICED_ITEMS_ON_PAGE: 'changeSlicedItemsOnPage',
    CHANGE_SEARCH_RESULTS: 'changeSearchResults',
    CHANGE_SEARCH_TERM: 'changeSearchTerm',
    CHANGE_PAGES_TOTAL_AMOUNT: 'changePagesTotalAmount',
  };

  const inputSearchElement = useRef('');

  const getSlicedItemsOnPage = (items) => {
    return items.slice(0, ITEMS_PER_PAGE);
  };

  const displayedItemsOnPage = getSlicedItemsOnPage(orders);

  const getPagesTotalAmount = (items) => {
    return Math.ceil(items.length / ITEMS_PER_PAGE);
  };

  const pagesTotalAmount = getPagesTotalAmount(orders);

  const initialState = {
    pageNumber: INITIAL_PAGE_NUMBER,
    slicedItems: getSlicedItemsOnPage(orders),
    searchResults: orders,
    searchTerm: '',
    pagesTotalAmount: getPagesTotalAmount(orders)
  };

  console.log('initialState.slicedItems', initialState.slicedItems);

  const reducer = (state, action) => {
    switch (action.type) {
      case Actions.CHANGE_SLICED_ITEMS_ON_PAGE:
        return {...state, slicedItems: action.payload};
      case Actions.CHANGE_SEARCH_RESULTS:
        return {...state, searchResults: action.payload};
      case Actions.CHANGE_SEARCH_TERM:
        return {...state, searchTerm: action.payload};
      case Actions.CHANGE_PAGE_NUMBER:
        return {...state, pageNumber: action.payload};
      case Actions.CHANGE_PAGES_TOTAL_AMOUNT:
        return {...state, pagesTotalAmount: action.payload};
      default:
        throw new Error('There is no such action type !!!');
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  console.log('state.slicedItems', state.slicedItems);

  // useEffect(() => {
  //   const slicedItemsOnPage = getSlicedItemsOnPage(state.slicedItems);
  //   dispatch({type: Actions.CHANGE_SLICED_ITEMS_ON_PAGE, payload: slicedItemsOnPage});

  //   const totalPageAmount = getPagesTotalAmount(state.slicedItems);
  //   dispatch({type: Actions.CHANGE_PAGES_TOTAL_AMOUNT, payload: totalPageAmount});
  // }, []);

  const getSearchTerm = () => {
    const searchValue = inputSearchElement.current.value.toLowerCase().trim();
    dispatch({type: Actions.CHANGE_SEARCH_TERM, payload: searchValue})

    if (searchValue !== '') {
      const newOrderList = orders.filter((order) => {
        return order.company.toLowerCase().includes(searchValue);
      });

      dispatch({type: Actions.CHANGE_SEARCH_RESULTS, payload: newOrderList});

      const slicedItemsOnPage = getSlicedItemsOnPage(newOrderList);
      dispatch({type: Actions.CHANGE_SLICED_ITEMS_ON_PAGE, payload: slicedItemsOnPage});

      const totalPageAmount = getPagesTotalAmount(newOrderList);
      dispatch({type: Actions.CHANGE_PAGES_TOTAL_AMOUNT, payload: totalPageAmount});
    } else {
      dispatch({type: Actions.CHANGE_SEARCH_RESULTS, payload: orders});

      const slicedItemsOnPage = getSlicedItemsOnPage(orders);
      dispatch({type: Actions.CHANGE_SLICED_ITEMS_ON_PAGE, payload: slicedItemsOnPage});

      const totalPageAmount = getPagesTotalAmount(orders);
      dispatch({type: Actions.CHANGE_PAGES_TOTAL_AMOUNT, payload: totalPageAmount});
    }
  };

  const pageNumberClickHandler = (dataPagination) => {
    let offset = Math.ceil(dataPagination.selected * ITEMS_PER_PAGE);
    const itemsOnPage = state.searchResults.slice(offset, offset + ITEMS_PER_PAGE);
    dispatch({type: Actions.CHANGE_PAGE_NUMBER, payload: dataPagination.selected});
    dispatch({type: Actions.CHANGE_SLICED_ITEMS_ON_PAGE, payload: itemsOnPage});
  };

  return (
    <Fragment>
      <Search
        searchInputElement={inputSearchElement}
        searchHandler={getSearchTerm}
      />
      <b className="places__found">{orders.length} order in `{activeTabName}` group</b>
      <ul className="cities__places-list places__list tabs__content">
        {displayedItemsOnPage.map((order) => (
          <Order
            key={order.id}
            id={order.id}
            company={order.company}
            date={order.date}
            carrierFirstName={order.carrier_first_name}
            carrierMiddleName={order.carrier_first_name}
            carrierLastName={order.carrier_last_name}
            favorite={order.favorite}
            phone={order.phone}
            comment={order.comment}
            ati={order.ati}
          />
        ))}
      </ul>
      {/* comparison was added to don't show pagination if there are too little amount of items in list */}
      {state.searchResults.length > ITEMS_PER_PAGE && <Pagination
        pageCount={state.pagesTotalAmount}
        onPageNumberClick={pageNumberClickHandler}
        forcePage={state.pageNumber}
      />}
    </ Fragment>
  );
}

OrdersList.propTypes = {
  items: PropTypes.arrayOf(contactProp),
  initialPageNumber: PropTypes.number,
  activeTabName: PropTypes.string,
  activeState: PropTypes.array,
  onListItemHover: PropTypes.func,
};

export default OrdersList;
