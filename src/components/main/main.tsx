import React from 'react';
import {useSelector} from 'react-redux';

import OrdersList from '../order-list/order-list';
import withLayout from '../hocs/with-layout';
import Tabs from '../tabs/tabs';
import NewItemButton from '../new-item-button/new-item-button';

import Util from '../../util/util';
import MainEmpty from '../main-empty/main-empty';
import {getOrders, getActiveTabName} from '../../store/orders/selectors';
import {getIsFormSendedSuccessfully} from '../../store/form/selectors';
import { getIsFormEditedSuccessfully } from '../../store/form/selectors';
import SuccessMessage from '../success-message/success-message';
import SuccessMessageEdit from '../success-message-edit/success-message-edit';

function Main() {
  const activeGroupName = useSelector(getActiveTabName);
  const orders = useSelector(getOrders);
  const isFormSuccessfullySended = useSelector(getIsFormSendedSuccessfully);
  const isFormSuccessfullyEdited = useSelector(getIsFormEditedSuccessfully);

  const filteredOrders = Util.getFavoritesOrders(activeGroupName, orders);

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Orders</h1>
      <Tabs />
      {isFormSuccessfullySended ? <SuccessMessage /> : ''}
      {isFormSuccessfullyEdited ? <SuccessMessageEdit /> : ''}
      {
        filteredOrders.length === 0
          ? <MainEmpty activeGroupName={activeGroupName}/>
          : (
            <div className="cities">
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Orders</h2>
                  <NewItemButton />
                  <OrdersList
                    orders={filteredOrders}
                    activeTabName={activeGroupName}
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