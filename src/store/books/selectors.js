import {NameSpace} from '../root-reducer';

export const getOrders = (state) => state[NameSpace.ORDERS].orders;
export const getIsDataLoaded = (state) => state[NameSpace.ORDERS].isDataLoaded;
export const getActiveGroupName = (state) => state[NameSpace.ORDERS].activeGroupName;
