import React from 'react';
import {useSelector} from 'react-redux';
import {Switch, Route, Router as BrowserRouter} from 'react-router-dom';
import browserHistory from '../../browser-history';

import {AppRoute} from '../../const';
import Main from '../main/main';
import Error from '../not-found/not-found';
import LoadingScreen from '../loading-screen/loading-screen';
import {getIsDataLoaded} from '../../store/orders/selectors';
import NewOrderForm from '../new-order-form/new-order-form';
import EditOrderForm from '../edit-order-form/edit-order-form';

function App() {
  const isDataLoaded = useSelector(getIsDataLoaded);

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.MAIN}>
          <Main className="page page--gray page--index" />
        </Route>
        <Route exact path={AppRoute.NEW_ORDER_FORM}>
          <NewOrderForm />
        </Route>
        <Route exact path={AppRoute.EDIT_FORM}>
          <EditOrderForm />
        </Route>
        <Route>
          <Error />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
