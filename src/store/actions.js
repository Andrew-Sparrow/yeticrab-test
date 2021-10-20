import {createAction} from '@reduxjs/toolkit';

export const ActionType = {
  CHANGE_GROUP: 'orders/changeGroup',
  LOAD_ORDERS: 'orders/loadOrders',
  CHANGE_FAVORITE: 'orders/isFavorite',
  DELETE_ITEM: 'orders/delete',
  LOAD_NEW_ORDER: 'orders/loadNewOrder',
  REDIRECT_TO_ROUTE: 'orders/redirectToRoute',
};

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
