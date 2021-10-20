import nanoid from 'nanoid';
import {groupNames} from '../const';

const Util = {
  getFilteredOrders (activeGroup, orders) {
    let filteredItems = [];
    if (activeGroup === groupNames.ALL) {
      return orders;
    }
    filteredItems = orders.filter((item) => item.group === activeGroup);
    return filteredItems;
  },

  getFavoritesOrders(activeGroup, orders) {
    let favoritesOrders = [];
    if (activeGroup === groupNames.ALL) {
      return orders;
    }
    favoritesOrders = orders.filter((item) => item.favorite === true);
    return favoritesOrders;
  },

  formatDate (dateString) {
    const DATE_OPTIONS = {year: 'numeric', month: 'short'};

    return (new Date(dateString)).toLocaleDateString('en-US', DATE_OPTIONS);
  },

  generateIdKeys(listLength) {
    const list = new Array(listLength).fill('');
    const generatedIdList = list.map(() => nanoid(10));
    return generatedIdList;
  },

  getUpdatedOrders(id, orders, favorite) {
    const newOrders = [...orders];
    const index = newOrders.findIndex((order) => order.id === id);
    newOrders[index].favorite = favorite;
    return newOrders;
  },

  deleteItem(id, items) {
    const newItems = [...items];
    const index = newItems.findIndex((item) => item.id === id);
    newItems.splice(index, 1);
    return newItems;
  },

  addNewItem(newItem, items) {
    const newItems = [...items];
    newItems.push(newItem);
    return newItems;
  }
}

export default Util;
