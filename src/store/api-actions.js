import {
  changeLoadingFormProcessStatus,
  loadOrdersAction,
  changeFavoriteAction,
  deleteItemAction,
  redirectToRoute,
  addNewOrderAction,
  changeIsFormSendedSuccessfullyStatus,
  changeIsFormEditedSuccessfullyStatus,
  editOrderAction
} from './actions';

import {APIRoute, AppRoute} from '../const';

export const fetchOrdersList = () => (dispatch, _getState, api) => (
  api.get(APIRoute.ORDERS)
    .then(({data}) => {
      dispatch(loadOrdersAction(data));
    })
    .catch((err) => {})
);

export const addToFavoriteApi = (id, isFavorite) => (dispatch, _getState, api) => (
  api.patch(`${ APIRoute.ORDERS }/${ id }`, {favorite: isFavorite})
    .then((info) => {
      dispatch(changeFavoriteAction(id, info.data.favorite));
    })
    .catch((err) => {})
);

export const deleteItemApi = (id) => (dispatch, _getState, api) => (
  api.delete(`${ APIRoute.ORDERS }/${id}`)
    .then((info) => {
      dispatch(deleteItemAction(id));
    })
    .catch((err) => {})
);

export const addNewOrderApi = (order) => (dispatch, _getState, api) => {
  dispatch(changeLoadingFormProcessStatus(true));
  api.post(`${ APIRoute.ORDERS }`, {
    "company": order.company,
    "date": order.date,
    "carrier_first_name": order.first_name,
    "carrier_middle_name": order.middle_name,
    "carrier_last_name": order.last_name,
    "phone": order.phone,
    "comment": order.comment,
    "ati": order.ati,
    "favorite": order.favorite
  })
    .then((info) => {
      dispatch(addNewOrderAction(info.data));
      dispatch(changeLoadingFormProcessStatus(false));
      // dispatch(showErrorCommentFormMessage(false));
      dispatch(changeIsFormSendedSuccessfullyStatus(true));
      setTimeout(() => dispatch(changeIsFormSendedSuccessfullyStatus(false)), 3000);
      /*
      this additional bottom line was made for clean up a comment form
      and establish "isCommentFormSendedSuccessfully" to "false"
      to fix problem with save text in comment form after network error
       */
      // dispatch(changeIsCommentSendedSuccessfullyStatus(false));
      dispatch(redirectToRoute(AppRoute.MAIN));
    })
    .catch((err) => {
      // dispatch(showErrorCommentFormMessage(true, err.message));
      // dispatch(changeLoadingCommentProcessStatus(false));
      // dispatch(changeIsCommentSendedSuccessfullyStatus(false));
    });
};

export const editOrderApi = (order, id) => (dispatch, _getState, api) => {
  dispatch(changeLoadingFormProcessStatus(true));
  api.patch(`${ APIRoute.ORDERS }/${ id }`, {
    "company": order.company,
    "date": order.date,
    "carrier_first_name": order.first_name,
    "carrier_middle_name": order.middle_name,
    "carrier_last_name": order.last_name,
    "phone": order.phone,
    "comment": order.comment,
    "ati": order.ati,
    "favorite": order.favorite
  })
    .then((info) => {
      console.log(info.data)
      dispatch(editOrderAction(info.data));
      dispatch(changeLoadingFormProcessStatus(false));
      // dispatch(showErrorCommentFormMessage(false));
      dispatch(changeIsFormEditedSuccessfullyStatus(true));
      setTimeout(() => dispatch(changeIsFormEditedSuccessfullyStatus(false)), 3000);
      /*
      this additional bottom line was made for clean up a comment form
      and establish "isCommentFormSendedSuccessfully" to "false"
      to fix problem with save text in comment form after network error
       */
      // dispatch(changeIsCommentSendedSuccessfullyStatus(false));
      dispatch(redirectToRoute(AppRoute.MAIN));
    })
    .catch((err) => {
      // dispatch(showErrorCommentFormMessage(true, err.message));
      // dispatch(changeLoadingCommentProcessStatus(false));
      // dispatch(changeIsCommentSendedSuccessfullyStatus(false));
    });
};
