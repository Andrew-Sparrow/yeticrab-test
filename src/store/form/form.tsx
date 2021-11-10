import {createReducer} from '@reduxjs/toolkit';
import {
  IFormChangeLoadingFormProcessStatus,
  IFormChangeIsFormSendedSuccessfullyStatus,
  IFormChangeIsFormEditedSuccessfullyStatus,
  IFormShowErrorFormMessage
} from '../../types/types';
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

const formReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeLoadingFormProcessStatus, (state: FormState, action: IFormChangeLoadingFormProcessStatus) => {
      state.isFormSending = action.payload;
    })
    .addCase(changeIsFormSendedSuccessfullyStatus, (state: FormState, action: IFormChangeIsFormSendedSuccessfullyStatus) => {
      state.isFormSendedSuccessfully = action.payload;
    })
    .addCase(changeIsFormEditedSuccessfullyStatus, (state: FormState, action: IFormChangeIsFormEditedSuccessfullyStatus) => {
      state.isFormEditedSuccessfully = action.payload;
    })
    .addCase(showErrorFormMessage, (state: FormState, action: IFormShowErrorFormMessage) => {
      state.isShowFormErrorMessage = action.payload.isShowErrorMessage;
      state.formErrorMessage = action.payload.errorMessageText;
    });
});

export {formReducer};
