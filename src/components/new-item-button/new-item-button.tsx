import {FC} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

const NewItemButton: FC = () => {
  return (
    <Link to={AppRoute.NEW_ORDER_FORM}>
      <button className="press-button">Add New Order</button>
    </Link>
  );
};

export default NewItemButton;
