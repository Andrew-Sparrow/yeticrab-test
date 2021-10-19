import React, {useReducer, useEffect} from 'react';
import {Fragment} from 'react';
import PropTypes from 'prop-types';

import Order from '../order/order';
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
    activeBooks
  } = props;

  const selectedItemsOnFirstPage = items.slice(0, ITEMS_PER_PAGE);
  const pagesTotalAmount = Math.ceil(items.length / ITEMS_PER_PAGE);

  let slicedItems = selectedItemsOnFirstPage;

  const init = (initialPageNumber) => {
    return {
      pageNumber: initialPageNumber,
      slicedItems: slicedItems
    };
  }

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
    if (prevTabName !== activeTabName || prevBooks !== activeBooks) {
      dispatch({type: 'changeSlicedItems', payload: []});
      dispatch({type: 'changeSlicedItems', payload: slicedItems});
      dispatch({type: 'changePageNumber', payload: FIRST_PAGE_NUMBER});
    }
    prevTabName = activeTabName;
    prevBooks = activeBooks;
  }, [activeTabName, slicedItems, activeBooks]);

  const pageNumberClickHandler = (dataPagination) => {
    let offset = Math.ceil(dataPagination.selected * ITEMS_PER_PAGE);
    slicedItems = items.slice(offset, offset + ITEMS_PER_PAGE);
    dispatch({type: 'changePageNumber', payload: dataPagination.selected});
    dispatch({type: 'changeSlicedItems', payload: slicedItems});
  };

  return (
    <Fragment>
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
