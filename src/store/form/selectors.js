import {NameSpace} from '../root-reducer';

export const getIsFormSending = (state) => state[NameSpace.FORM].isCommentSending;
export const getIsFormSendedSuccessfully = (state) => state[NameSpace.FORM].isCommentFormSendedSuccessfully;
export const getIsShowFormErrorMessage = (state) => state[NameSpace.FORM].isShowCommentErrorMessage;
export const getFormErrorMessage = (state) => state[NameSpace.FORM].commentErrorMessage;
