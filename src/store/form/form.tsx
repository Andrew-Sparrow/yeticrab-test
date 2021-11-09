import {createReducer} from '@reduxjs/toolkit';

import {
  changeLoadingFormProcessStatus,
  changeIsFormSendedSuccessfullyStatus,
  changeIsFormEditedSuccessfullyStatus,
  showErrorFormMessage
} from '../actions';

interface FormState {
  isFormSending: boolean;
  isFormSendedSuccessfully: boolean | null;
  isFormEditedSuccessfully: boolean | null;
  isShowFormErrorMessage: boolean;
  formErrorMessage: string | null;
};

const initialState: FormState = {
  isFormSending: false,
  isFormSendedSuccessfully: null,
  isFormEditedSuccessfully: null,
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
    .addCase(changeIsFormEditedSuccessfullyStatus, (state, action) => {
      state.isFormEditedSuccessfully = action.payload;
    })
    .addCase(showErrorFormMessage, (state, action) => {
      state.isShowFormErrorMessage = action.payload.isShowErrorMessage;
      state.formErrorMessage = action.payload.errorMessageText;
    });
});

export {form};
