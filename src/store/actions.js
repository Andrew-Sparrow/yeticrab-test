import {createAction} from '@reduxjs/toolkit';

export const ActionType = {
  CHANGE_GROUP: 'orders/changeGroup',
  LOAD_ORDERS: 'orders/loadBooks',
  CHANGE_FAVORITE: 'orders/isFavorite',
  DELETE_ITEM: 'orders/delete',
  LOAD_NEW_ORDER: 'orders/loadNewBook',
  REDIRECT_TO_ROUTE: 'orders/redirectToRoute',
};

export const changeGroup = createAction(
  ActionType.CHANGE_GROUP,
  (groupName) => ({payload: groupName})
);

export const loadBooksAction = createAction(
  ActionType.LOAD_ORDERS,
  (books) => ({payload: books})
);

export const addNewBookAction = createAction(
  ActionType.LOAD_NEW_ORDER,
  (new_book) => ({payload: new_book})
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
