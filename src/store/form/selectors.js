import {NameSpace} from '../root-reducer';

export const getIsFormSending = (state) => state[NameSpace.FORM].isFormSending;
export const getIsFormSendedSuccessfully = (state) => state[NameSpace.FORM].isFormSendedSuccessfully;
export const getIsShowFormErrorMessage = (state) => state[NameSpace.FORM].isShowFormErrorMessage;
export const getFormErrorMessage = (state) => state[NameSpace.FORM].formErrorMessage;
