import React, {useReducer, useEffect, useState, useRef} from 'react';
import {Fragment} from 'react';
import PropTypes from 'prop-types';

import Order from '../order/order';
import Search from '../search/search';

import contactProp from '../order/order.prop';
import Pagination from '../pagination/pagination';

const FIRST_PAGE_NUMBER = 0; // the initialPageNumber starts with zero
const ITEMS_PER_PAGE = 3;
let prevTabName = '';
let prevBooks = [];

function OrdersList(props) {
  const {
    items,
    initialPageNumber,
    activeTabName,
    activeOrders
  } = props;

  const [searchTerm, setSearchTerm] = useState('');

  const [searchResults, setSearchResults] = useState([]);
  console.log(searchResults);
  
  const inputSearchElement = useRef('');

  const selectedItemsOnFirstPage = items.slice(0, ITEMS_PER_PAGE);
  const pagesTotalAmount = Math.ceil(items.length / ITEMS_PER_PAGE);

  let slicedItems = selectedItemsOnFirstPage;

  const init = (initialPageNumber) => {
    return {
      pageNumber: initialPageNumber,
      slicedItems: selectedItemsOnFirstPage
    };
  }

  const getSearchTerm = () => {
    setSearchTerm(inputSearchElement.current.value);

    if (searchTerm !== '') {
      const newOrderList = slicedItems.filter((order) => {
        return order.company.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchResults(newOrderList);
    } else {
      setSearchResults(slicedItems);
    }
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'changePageNumber':
        return {...state, pageNumber: action.payload};
      case 'changeSlicedItems':
        return {...state, slicedItems: action.payload};
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialPageNumber, init);

  useEffect(() => {
    if (prevTabName !== activeTabName || prevBooks !== activeOrders) {
      dispatch({type: 'changeSlicedItems', payload: []});
      dispatch({type: 'changeSlicedItems', payload: slicedItems});
      dispatch({type: 'changePageNumber', payload: FIRST_PAGE_NUMBER});
    }
    prevTabName = activeTabName;
    prevBooks = activeOrders;
  }, [activeTabName, slicedItems, activeOrders]);

  const pageNumberClickHandler = (dataPagination) => {
    let offset = Math.ceil(dataPagination.selected * ITEMS_PER_PAGE);
    slicedItems = items.slice(offset, offset + ITEMS_PER_PAGE);
    dispatch({type: 'changePageNumber', payload: dataPagination.selected});
    dispatch({type: 'changeSlicedItems', payload: slicedItems});
  };

  return (
    <Fragment>
      <Search
        searchInputElement={inputSearchElement}
        searchTerm={searchTerm}
        searchHandler={getSearchTerm}
      />
      <b className="places__found">{items.length} order in `{activeTabName}` group</b>
      <ul className="cities__places-list places__list tabs__content">
        {state.slicedItems.map((order) => (
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
      {items.length > ITEMS_PER_PAGE && <Pagination
        pageCount={pagesTotalAmount}
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
