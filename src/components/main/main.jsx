import React from 'react';
import {useSelector} from 'react-redux';

import OrdersList from '../order-list/order-list';
import withLayout from '../hocs/with-layout';
import Tabs from '../tabs/tabs';
import NewItemButton from '../new-item-button/new-item-button';

import Util from '../../util/util';
import MainEmpty from '../main-empty/main-empty';
import {getOrders, getActiveGroupName} from '../../store/orders/selectors';

function Main() {
  const activeGroupName = useSelector(getActiveGroupName);
  const orders = useSelector(getOrders);

  const filteredOrders = Util.getFavoritesOrders(activeGroupName, orders);

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Orders</h1>
      <Tabs />
      {
        filteredOrders.length === 0
          ? <MainEmpty activeGroupName={activeGroupName}/>
          : (
            <div className="cities">
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Orders</h2>
                  <NewItemButton />
                  <b className="places__found">{filteredOrders.length} order in `{activeGroupName}` group</b>
                  <OrdersList
                    items={filteredOrders}
                    // first page number
                    initialPageNumber={0}
                    activeTabName={activeGroupName}
                    activeBooks={filteredOrders}
                  />
                </section>
              </div>
            </div>
          )
      }
    </main>
  );
}

const withLayoutMain = withLayout(Main);
export default withLayoutMain;
