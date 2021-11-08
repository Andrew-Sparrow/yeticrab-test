import {
  useRef,
  useState,
  useEffect,
  FC
} from 'react';

import {useSelector} from 'react-redux';

import {Fragment} from 'react';

import Order from '../order/order';
import Search from '../search/search';
import List from '../list/list';

import {getActiveTabName} from '../../store/orders/selectors';

import Pagination from '../pagination/pagination';
import { IOrder } from '../../types/types';

const ITEMS_PER_PAGE = 3;
const INITIAL_PAGE_NUMBER = 0;

interface OrderListProps {
  orders: IOrder[];
};

const OrdersList: FC<OrderListProps>= (props) => {
  const {orders} = props;

  const [searchResults, setSearchResults] = useState(orders);

  const [pageNumber, setPageNumber] = useState(INITIAL_PAGE_NUMBER);

  useEffect(() => {
    setSearchResults(orders);
    setPageNumber(INITIAL_PAGE_NUMBER);
  }, [orders]);


  const activeTabName = useSelector(getActiveTabName);
  const inputSearchElement = useRef<HTMLInputElement>(null);

  const getDisplayedItemsOnPage = (items: any, pageNumber: number) => {
    let itemsOnPage = items;
    if (items.length > ITEMS_PER_PAGE * pageNumber) {
      let offset = Math.ceil(pageNumber * ITEMS_PER_PAGE);
      itemsOnPage = items.slice(offset, offset + ITEMS_PER_PAGE);
    }
    return itemsOnPage;
  };

  const displayedItemsOnPage = getDisplayedItemsOnPage(searchResults, pageNumber);

  const getPagesTotalAmount = (items: IOrder[]) => {
    return Math.ceil(items.length / ITEMS_PER_PAGE);
  };

  const pagesTotalAmount = getPagesTotalAmount(searchResults);

  const getSearchTerm = () => {
    const searchValue: any = inputSearchElement.current?.value.toLowerCase().trim();

    if (searchValue !== '') {
      const newOrderList = searchResults.filter((order) => {
        return order.company.toLowerCase().includes(searchValue);
      });
      setSearchResults(newOrderList);
    } else {
      setSearchResults(orders);
    }
  };

  const pageNumberClickHandler = (dataPagination: any) => {
    console.log(dataPagination);
    setPageNumber(dataPagination.selected);
  };

  return (
    <Fragment>
      <Search
        searchInputElement={inputSearchElement}
        searchHandler={getSearchTerm}
      />
      <b className="places__found">{orders.length} order in `{activeTabName}` group</b>
      <List
        items={displayedItemsOnPage}
        className="cities__places-list places__list tabs__content"
        renderItem={(order: IOrder) => (
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
        )}
      />
      {/* comparison was added to don't show pagination if there are too little amount of items in list */}
      {searchResults.length > ITEMS_PER_PAGE && <Pagination
        pageCount={pagesTotalAmount}
        onPageNumberClick={pageNumberClickHandler}
        forcePage={pageNumber}
      />}
    </ Fragment>
  );
}

export default OrdersList;
