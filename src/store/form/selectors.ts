import {NameSpace} from '../root-reducer';

export const getIsFormSending = (state: any): boolean => {
  return state[NameSpace.FORM].isFormSending;
};
export const getIsFormSendedSuccessfully = (state: any) => state[NameSpace.FORM].isFormSendedSuccessfully;
export const getIsFormEditedSuccessfully = (state: any) => state[NameSpace.FORM].isFormEditedSuccessfully;
export const getIsShowFormErrorMessage = (state: any) => state[NameSpace.FORM].isShowFormErrorMessage;
export const getFormErrorMessage = (state: any) => state[NameSpace.FORM].formErrorMessage;
