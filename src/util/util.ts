import { IOrder } from '../types/types';
import {groupNames} from '../const';
const nanoid = require('nanoid');

const Util = {
  getFavoritesOrders(activeGroup: string, orders: IOrder[]) {
    let favoritesOrders = [];

    if (activeGroup === groupNames.ALL) {
      return orders;
    }
    favoritesOrders = orders.filter((item: any) => item.favorite === true);
    return favoritesOrders;
  },

  formatDate (dateString: string) {
    const DATE_OPTIONS = {year: 'numeric', month: 'short'} as const;

    return (new Date(dateString)).toLocaleDateString('en-US', DATE_OPTIONS);
  },

  generateIdKeys(listLength: number) {
    const list = new Array(listLength).fill('');
    const generatedIdList = list.map(() => nanoid(10));
    return generatedIdList;
  },

  getUpdatedOrders(id: number, orders: IOrder[], favorite: boolean = false) {
    const newOrders = [...orders];
    const index = newOrders.findIndex((order) => order.id === id);
    newOrders[index].favorite = favorite;
    return newOrders;
  },

  getEditedOrders(updatedOrder: IOrder, orders: any) {
    const newOrders = [...orders];
    const index = newOrders.findIndex((order) => order.id === updatedOrder.id);
    newOrders[index] = updatedOrder;
    return newOrders;
  },

  deleteItem(id: number, items: any) {
    const newItems = [...items];
    const index = newItems.findIndex((item) => item.id === id);
    newItems.splice(index, 1);
    return newItems;
  },

  addNewItem(newItem: any, items: any) {
    const newItems = [...items];
    newItems.push(newItem);
    return newItems;
  }
}

export default Util;
