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

import {AxiosError, AxiosInstance} from 'axios';

import { AppDispatch } from '..';

import {APIRoute, AppRoute} from '../const';
import {IEditOrderFormData} from '../types/types';

export const fetchOrdersList = () => (dispatch: AppDispatch, _getState: any, api: AxiosInstance) => (
  api.get(APIRoute.ORDERS)
    .then(({data}: any) => {
      dispatch(loadOrdersAction(data));
    })
    .catch((err: AxiosError| Error ) => {})
);

export const addToFavoriteApi = (id: number, isFavorite: boolean) => (dispatch: AppDispatch, _getState: any, api: AxiosInstance) => (
  api.patch(`${ APIRoute.ORDERS }/${ id }`, {favorite: isFavorite})
    .then((info: any) => {
      dispatch(changeFavoriteAction(id, info.data.favorite));
    })
    .catch((err: AxiosError | Error) => {
      dispatch(changeLoadingFormProcessStatus(false));
    })
);

export const deleteItemApi = (id: number) => (dispatch: AppDispatch, _getState: any, api: AxiosInstance) => (
  api.delete(`${ APIRoute.ORDERS }/${id}`)
    .then(() => {
      dispatch(deleteItemAction(id));
    })
    .catch((err: AxiosError | Error) => {
      dispatch(changeLoadingFormProcessStatus(false));
    })
);

export const addNewOrderApi = (order: IEditOrderFormData) => (dispatch: AppDispatch, _getState: any, api: AxiosInstance) => {
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
    .then((info: any) => {
      dispatch(addNewOrderAction(info.data));
      dispatch(changeLoadingFormProcessStatus(false));
      dispatch(changeIsFormSendedSuccessfullyStatus(true));
      setTimeout(() => dispatch(changeIsFormSendedSuccessfullyStatus(false)), 3000);
      /*
      this additional bottom line was made for clean up a comment form
      and establish "isCommentFormSendedSuccessfully" to "false"
      to fix problem with save text in comment form after network error
       */
      dispatch(redirectToRoute(AppRoute.MAIN));
    })
    .catch((err: AxiosError | Error) => {
      dispatch(changeLoadingFormProcessStatus(false));
    });
};

export const editOrderApi = (order: IEditOrderFormData, id: string) => (dispatch: AppDispatch, _getState: any, api: AxiosInstance) => {
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
    .then((info: any) => {
      dispatch(editOrderAction(info.data));
      dispatch(changeLoadingFormProcessStatus(false));
      dispatch(changeIsFormEditedSuccessfullyStatus(true));
      setTimeout(() => dispatch(changeIsFormEditedSuccessfullyStatus(false)), 3000);
      /*
      this additional bottom line was made for clean up a comment form
      and establish "isCommentFormSendedSuccessfully" to "false"
      to fix problem with save text in comment form after network error
       */
      dispatch(redirectToRoute(AppRoute.MAIN));
    })
    .catch((err: AxiosError | Error) => {
      dispatch(changeLoadingFormProcessStatus(false));
    });
};
