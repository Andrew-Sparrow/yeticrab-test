import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  changePageNumber,
  changeSlicedItemsOnPage,
  changeSearchResults
} from '../../store/actions';

import {Fragment} from 'react';
import PropTypes from 'prop-types';

import Order from '../order/order';
import Search from '../search/search';

import {
  getPageNumber,
  getSlicedItemsOnPage
} from '../../store/page/selectors';

import {getActiveTabName} from '../../store/orders/selectors';

import {getSearchResults} from '../../store/search/selectors';

import contactProp from '../order/order.prop';
import Pagination from '../pagination/pagination';

const ITEMS_PER_PAGE = 3;

function OrdersList(props) {
  const {orders} = props;

  const dispatch = useDispatch();

  const activeTabName = useSelector(getActiveTabName);
  console.log(orders);

  const pageNumber = useSelector(getPageNumber);
  const searchResults = useSelector(getSearchResults);
  const slicedItemsOnPage = useSelector(getSlicedItemsOnPage);

  const Actions = {
    CHANGE_PAGE_NUMBER: 'changePageNumber',
    CHANGE_SLICED_ITEMS_ON_PAGE: 'changeSlicedItemsOnPage',
    CHANGE_SEARCH_RESULTS: 'changeSearchResults',
    CHANGE_SEARCH_TERM: 'changeSearchTerm',
    CHANGE_PAGES_TOTAL_AMOUNT: 'changePagesTotalAmount',
  };

  const inputSearchElement = useRef('');

  const getDisplayedItemsOnPage = (items, pageNumber) => {
    dispatch(changeSearchResults(items));
    let offset = Math.ceil(pageNumber * ITEMS_PER_PAGE);
    const itemsOnPage = items.slice(offset, offset + ITEMS_PER_PAGE);

    // dispatch(changeSlicedItemsOnPage(itemsOnPage));
    // dispatch(changeSlicedItemsOnPage(slicedItems))
    return itemsOnPage;
  };

  const displayedItemsOnPage = getDisplayedItemsOnPage(orders, pageNumber);

  const getPagesTotalAmount = (items) => {
    return Math.ceil(items.length / ITEMS_PER_PAGE);
  };

  const pagesTotalAmount = getPagesTotalAmount(orders);

  // const initialState = {
  //   pageNumber: INITIAL_PAGE_NUMBER,
  //   slicedItems: orders,
  //   // slicedItems: getSlicedItemsOnFirstPage(orders),
  //   searchResults: orders,
  //   searchTerm: '',
  //   pagesTotalAmount: getPagesTotalAmount(orders)
  // };

  // const reducer = (state, action) => {
  //   switch (action.type) {
  //     case Actions.CHANGE_SLICED_ITEMS_ON_PAGE:
  //       return {...state, slicedItems: action.payload};
  //     case Actions.CHANGE_SEARCH_RESULTS:
  //       return {...state, searchResults: action.payload};
  //     case Actions.CHANGE_SEARCH_TERM:
  //       return {...state, searchTerm: action.payload};
  //     case Actions.CHANGE_PAGE_NUMBER:
  //       return {...state, pageNumber: action.payload};
  //     case Actions.CHANGE_PAGES_TOTAL_AMOUNT:
  //       return {...state, pagesTotalAmount: action.payload};
  //     default:
  //       throw new Error('There is no such action type !!!');
  //   }
  // }

  // const [state, dispatch] = useReducer(reducer, initialState);
  // console.log('state.slicedItems', state.slicedItems);

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
    dispatch(changePageNumber(dataPagination.selected));
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
      {orders.length > ITEMS_PER_PAGE && <Pagination
        pageCount={pagesTotalAmount}
        onPageNumberClick={pageNumberClickHandler}
        forcePage={pageNumber}
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
