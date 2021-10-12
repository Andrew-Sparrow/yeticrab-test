import {
  loadBooksAction,
  changeFavoriteAction,
  deleteItemAction,
  redirectToRoute,
  addNewBookAction
} from './actions';

import {APIRoute, AppRoute} from '../const';

export const fetchBooksList = () => (dispatch, _getState, api) => (
  api.get(APIRoute.BOOKS)
    .then(({data}) => {
      dispatch(loadBooksAction(data));
    })
    .catch((err) => {})
);

export const addToFavoriteApi = (id, isFavorite) => (dispatch, _getState, api) => (
  api.patch(`${ APIRoute.BOOKS }/${ id }`, {favorite: isFavorite})
    .then((info) => {
      dispatch(changeFavoriteAction(id, info.data.favorite));
    })
    .catch((err) => {})
);

export const deleteItemApi = (id) => (dispatch, _getState, api) => (
  api.delete(`${ APIRoute.BOOKS }/${ id}`)
    .then((info) => {
      dispatch(deleteItemAction(id));
    })
    .catch((err) => {})
);

export const addNewBookApi = (book) => (dispatch, _getState, api) => {
  // dispatch(changeLoadingCommentProcessStatus(true));
  // console.log(book);
  api.post(`${ APIRoute.BOOKS }`, {
    "favorite": false,
    "author": "Jack London",
    "group": "Fantasy",
    "img": null,
    "title": "React"
  })
    .then((info) => {
      dispatch(addNewBookAction(info.data));
      console.log(info.data);

      // dispatch(loadComments(info.data));
      // dispatch(changeLoadingCommentProcessStatus(false));
      // dispatch(showErrorCommentFormMessage(false));
      // dispatch(changeIsCommentSendedSuccessfullyStatus(true));
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
