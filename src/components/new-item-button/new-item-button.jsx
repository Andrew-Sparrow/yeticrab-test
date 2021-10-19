import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

const NewItemButton = (props) => {
  return (
    <Link to={AppRoute.NEW_BOOK_FORM}>
      <button className="press-button">Add New Order</button>
    </Link>
  );
};

export default NewItemButton;