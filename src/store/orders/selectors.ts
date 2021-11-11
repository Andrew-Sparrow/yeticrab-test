import {NameSpace} from '../root-reducer';

export const getOrders = (state: any) => state[NameSpace.ORDERS].orders;
export const getIsOrdersLoaded = (state: any) => state[NameSpace.ORDERS].isOrdersLoaded;
export const getActiveTabName = (state: any) => state[NameSpace.ORDERS].activeTabName;
