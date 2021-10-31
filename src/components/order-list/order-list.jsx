import React, {
  useRef,
  useState,
  useEffect
} from 'react';

import {useSelector} from 'react-redux';

import {Fragment} from 'react';
import PropTypes from 'prop-types';

import Order from '../order/order';
import Search from '../search/search';

import {getActiveTabName} from '../../store/orders/selectors';

import orderProp from '../order/order.prop';
import Pagination from '../pagination/pagination';

const ITEMS_PER_PAGE = 3;
const INITIAL_PAGE_NUMBER = 0;

function OrdersList(props) {
  const {orders} = props;

  const [searchResults, setSearchResults] = useState(orders);

  const [pageNumber, setPageNumber] = useState(INITIAL_PAGE_NUMBER);

  useEffect(() => {
    setSearchResults(orders);
    setPageNumber(INITIAL_PAGE_NUMBER);
  }, [orders]);


  const activeTabName = useSelector(getActiveTabName);
  const inputSearchElement = useRef('');

  const getDisplayedItemsOnPage = (items, pageNumber) => {
    let itemsOnPage = items;
    if (items.length > ITEMS_PER_PAGE * pageNumber) {
      let offset = Math.ceil(pageNumber * ITEMS_PER_PAGE);
      itemsOnPage = items.slice(offset, offset + ITEMS_PER_PAGE);
    }
    return itemsOnPage;
  };

  const displayedItemsOnPage = getDisplayedItemsOnPage(searchResults, pageNumber);

  const getPagesTotalAmount = (items) => {
    return Math.ceil(items.length / ITEMS_PER_PAGE);
  };

  const pagesTotalAmount = getPagesTotalAmount(searchResults);

  const getSearchTerm = () => {
    const searchValue = inputSearchElement.current.value.toLowerCase().trim();

    if (searchValue !== '') {
      const newOrderList = searchResults.filter((order) => {
        return order.company.toLowerCase().includes(searchValue);
      });
      setSearchResults(newOrderList);
    } else {
      setSearchResults(orders);
    }
  };

  const pageNumberClickHandler = (dataPagination) => {
    setPageNumber(dataPagination.selected);
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
  orders: PropTypes.arrayOf(orderProp),
};

export default OrdersList;
