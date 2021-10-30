import {NameSpace} from '../root-reducer';

export const getPageNumber = (state) => state[NameSpace.PAGE].pageNumber;
export const getPagesTotalAmount = (state) => state[NameSpace.PAGE].pagesTotalAmount;
