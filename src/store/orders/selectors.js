import {NameSpace} from '../root-reducer';

export const getOrders = (state) => state[NameSpace.ORDERS].orders;
export const getIsOrdersLoaded = (state) => state[NameSpace.ORDERS].isOrdersLoaded;
export const getActiveTabName = (state) => state[NameSpace.ORDERS].activeTabName;
