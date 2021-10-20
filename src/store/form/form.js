import {createReducer} from '@reduxjs/toolkit';

import {
  changeLoadingFormProcessStatus,
  changeIsFormSendedSuccessfullyStatus,
  showErrorFormMessage
} from '../actions';

const initialState = {
  isFormSending: false,
  isFormSendedSuccessfully: null,
  isShowFormErrorMessage: false,
  formErrorMessage: null,
};

const form = createReducer(initialState, (builder) => {
  builder
    .addCase(changeLoadingFormProcessStatus, (state, action) => {
      state.isFormSending = action.payload;
    })
    .addCase(changeIsFormSendedSuccessfullyStatus, (state, action) => {
      state.isFormSendedSuccessfully = action.payload;
    })
    .addCase(showErrorFormMessage, (state, action) => {
      state.isShowFormErrorMessage = action.payload.isShowErrorMessage;
      state.formErrorMessage = action.payload.errorMessageText;
    });
});

export {form};
