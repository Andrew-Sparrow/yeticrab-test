import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  changePageNumber,
  changeSearchResults,
  changeSearchTerm
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
  const [searchResults, setSearchResults] = useState(orders);

  const dispatch = useDispatch();

  const activeTabName = useSelector(getActiveTabName);

  const pageNumber = useSelector(getPageNumber);
  // const searchResults = useSelector(getSearchResults);
  // const slicedItemsOnPage = useSelector(getSlicedItemsOnPage);

  // const Actions = {
  //   CHANGE_PAGE_NUMBER: 'changePageNumber',
  //   CHANGE_SLICED_ITEMS_ON_PAGE: 'changeSlicedItemsOnPage',
  //   CHANGE_SEARCH_RESULTS: 'changeSearchResults',
  //   CHANGE_SEARCH_TERM: 'changeSearchTerm',
  //   CHANGE_PAGES_TOTAL_AMOUNT: 'changePagesTotalAmount',
  // };

  const inputSearchElement = useRef('');

  const getDisplayedItemsOnPage = (items, pageNumber) => {
    dispatch(changeSearchResults(items));
    let offset = Math.ceil(pageNumber * ITEMS_PER_PAGE);
    const itemsOnPage = items.slice(offset, offset + ITEMS_PER_PAGE);
    return itemsOnPage;
  };

  const displayedItemsOnPage = getDisplayedItemsOnPage(searchResults, pageNumber);

  const getPagesTotalAmount = (items) => {
    return Math.ceil(items.length / ITEMS_PER_PAGE);
  };

  const pagesTotalAmount = getPagesTotalAmount(searchResults);

  // useEffect(() => {
  //   const slicedItemsOnPage = getSlicedItemsOnPage(state.slicedItems);
  //   dispatch({type: Actions.CHANGE_SLICED_ITEMS_ON_PAGE, payload: slicedItemsOnPage});

  //   const totalPageAmount = getPagesTotalAmount(state.slicedItems);
  //   dispatch({type: Actions.CHANGE_PAGES_TOTAL_AMOUNT, payload: totalPageAmount});
  // }, []);

  // const getSearchTerm = () => {
  //   const searchValue = inputSearchElement.current.value.toLowerCase().trim();
  //   dispatch(changeSearchTerm(searchValue));

  //   if (searchValue !== '') {
  //     const newOrderList = orders.filter((order) => {
  //       return order.company.toLowerCase().includes(searchValue);
  //     });

  //     dispatch(changeSearchResults(newOrderList));

  //     const slicedItemsOnPage = getSlicedItemsOnPage(newOrderList);
  //     dispatch({type: Actions.CHANGE_SLICED_ITEMS_ON_PAGE, payload: slicedItemsOnPage});

  //     const totalPageAmount = getPagesTotalAmount(newOrderList);
  //     dispatch({type: Actions.CHANGE_PAGES_TOTAL_AMOUNT, payload: totalPageAmount});
  //   } else {
  //     dispatch({type: Actions.CHANGE_SEARCH_RESULTS, payload: orders});

  //     const slicedItemsOnPage = getSlicedItemsOnPage(orders);
  //     dispatch({type: Actions.CHANGE_SLICED_ITEMS_ON_PAGE, payload: slicedItemsOnPage});

  //     const totalPageAmount = getPagesTotalAmount(orders);
  //     dispatch({type: Actions.CHANGE_PAGES_TOTAL_AMOUNT, payload: totalPageAmount});
  //   }
  // };

  const getSearchTerm = () => {
    const searchValue = inputSearchElement.current.value.toLowerCase().trim();
    dispatch(changeSearchTerm(searchValue));

    if (searchValue !== '') {
      const newOrderList = orders.filter((order) => {
        return order.company.toLowerCase().includes(searchValue);
      });
      setSearchResults(newOrderList);
    } else {
      setSearchResults(orders);
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
      {searchResults.length > ITEMS_PER_PAGE && <Pagination
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
