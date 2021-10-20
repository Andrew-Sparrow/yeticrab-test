import {createAction} from '@reduxjs/toolkit';

export const ActionType = {
  CHANGE_GROUP: 'orders/changeGroup',
  LOAD_ORDERS: 'orders/loadOrders',
  CHANGE_FAVORITE: 'orders/isFavorite',
  DELETE_ITEM: 'orders/delete',
  LOAD_NEW_ORDER: 'orders/loadNewOrder',
  REDIRECT_TO_ROUTE: 'orders/redirectToRoute',
  CHANGE_LOADING_FORM_PROCESS_STATUS: 'form/changeLoadingFormProcessStatus',
  SHOW_FORM_ERROR_MESSAGE: 'form/showErrorFormMessage',
  CHANGE_FORM_SENDED_SUCCESSFULLY_STATUS: 'comment/changeCommentSendedSuccessfulyStatus',
};

export const changeLoadingFormProcessStatus = createAction(
  ActionType.CHANGE_LOADING_FORM_PROCESS_STATUS,
  (isLoading) => ({payload: isLoading}),
);

export const changeIsFormSendedSuccessfullyStatus = createAction(
  ActionType.CHANGE_FORM_SENDED_SUCCESSFULLY_STATUS,
  (isFormSendedSuccessfully) => ({payload: isFormSendedSuccessfully}),
);

export const showErrorFormMessage = createAction(
  ActionType.SHOW_FORM_ERROR_MESSAGE,
  (isShowErrorMessage, errorMessageText) => ({payload: {isShowErrorMessage, errorMessageText}}),
);

export const changeGroup = createAction(
  ActionType.CHANGE_GROUP,
  (groupName) => ({payload: groupName})
);

export const loadOrdersAction = createAction(
  ActionType.LOAD_ORDERS,
  (items) => ({payload: items})
);

export const addNewOrderAction = createAction(
  ActionType.LOAD_NEW_ORDER,
  (new_item) => ({payload: new_item})
);

export const changeFavoriteAction = createAction(
  ActionType.CHANGE_FAVORITE,
  (id, favorite) => ({payload: {id, favorite}})
)

export const deleteItemAction = createAction(
  ActionType.DELETE_ITEM,
  (id) => ({payload: id})
);

export const redirectToRoute = createAction(
  ActionType.REDIRECT_TO_ROUTE,
  (url) => ({payload: url})
);
