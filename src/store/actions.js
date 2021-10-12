import {createAction} from '@reduxjs/toolkit';

export const ActionType = {
  CHANGE_GROUP: 'books/changeGroup',
  LOAD_BOOKS: 'books/loadBooks',
  CHANGE_FAVORITE: 'books/isFavorite',
  DELETE_ITEM: 'books/delete',
  LOAD_NEW_BOOK: 'book/loadNewBook',
  REDIRECT_TO_ROUTE: 'books/redirectToRoute',
};

export const changeGroup = createAction(
  ActionType.CHANGE_GROUP,
  (groupName) => ({payload: groupName})
);

export const loadBooksAction = createAction(
  ActionType.LOAD_BOOKS,
  (books) => ({payload: books})
);

export const addNewBookAction = createAction(
  ActionType.LOAD_NEW_BOOK,
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
