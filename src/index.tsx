import ReactDOM from 'react-dom';
import './index.css';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';

import {getAxiosInstance} from './services/api';
import App from './components/app/app';
import rootReducer from './store/root-reducer';
import {fetchOrdersList} from './store/api-actions';
import {redirect} from './store/middlewares/redirect';
import reportWebVitals from './reportWebVitals';

const api = getAxiosInstance();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

store.dispatch(fetchOrdersList());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root') as HTMLElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
