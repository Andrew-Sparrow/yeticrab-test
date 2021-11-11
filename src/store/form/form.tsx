import {createReducer} from '@reduxjs/toolkit';

import {
  IFormChangeLoadingFormProcessStatus,
  IFormChangeIsFormSendedSuccessfullyStatus,
  IFormChangeIsFormEditedSuccessfullyStatus,
  IFormShowErrorFormMessage,
  IFormState
} from '../../types/types';

import {
  changeLoadingFormProcessStatus,
  changeIsFormSendedSuccessfullyStatus,
  changeIsFormEditedSuccessfullyStatus,
  showErrorFormMessage
} from '../actions';

const initialState: IFormState = {
  isFormSending: false,
  isFormSendedSuccessfully: null,
  isFormEditedSuccessfully: null,
  isShowFormErrorMessage: false,
  formErrorMessage: null,
};

const formReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeLoadingFormProcessStatus, (state: IFormState, action: IFormChangeLoadingFormProcessStatus) => {
      state.isFormSending = action.payload;
    })
    .addCase(changeIsFormSendedSuccessfullyStatus, (state: IFormState, action: IFormChangeIsFormSendedSuccessfullyStatus) => {
      state.isFormSendedSuccessfully = action.payload;
    })
    .addCase(changeIsFormEditedSuccessfullyStatus, (state: IFormState, action: IFormChangeIsFormEditedSuccessfullyStatus) => {
      state.isFormEditedSuccessfully = action.payload;
    })
    .addCase(showErrorFormMessage, (state: IFormState, action: IFormShowErrorFormMessage) => {
      state.isShowFormErrorMessage = action.payload.isShowErrorMessage;
      state.formErrorMessage = action.payload.errorMessageText;
    })
    .addDefaultCase((state) => {
      return state;
    })
});

export {formReducer};
