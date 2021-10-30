import {NameSpace} from '../root-reducer';

export const getOrders = (state) => state[NameSpace.ORDERS].orders;
export const getIsDataLoaded = (state) => state[NameSpace.ORDERS].isDataLoaded;
export const getActiveTabName = (state) => state[NameSpace.ORDERS].activeTabName;
