import {FC}from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';

import {addToFavoriteApi, deleteItemApi} from '../../store/api-actions';

interface OrderProps {
  id: string;
  company: string,
  date: string;
  carrierFirstName: string;
  carrierMiddleName: string;
  carrierLastName: string;
  favorite: boolean;
  phone: string;
  comment: string;
  ati: string;
}

const Order: FC<OrderProps> = (props) =>{
  let {
    id,
    company,
    date,
    carrierFirstName,
    carrierMiddleName,
    carrierLastName,
    favorite,
    phone,
    comment,
    ati
  } = props;

  const dispatch = useDispatch();

  const onFavoriteClick = () => {
    dispatch(addToFavoriteApi(id, !favorite));
  };

  const onDeleteClick = (evt: any) => {
    evt.preventDefault();
    dispatch(deleteItemApi(id));
  };

  return (
    <li
      className="contact"
      id={id}
    >
      <div className="contact__right">
        <p className="contact__data">Номер заявки: <span className="contact__name">{id}</span></p>
        <p className="contact__data">Company: <span className="contact__name">{company}</span></p>
        <p className="contact__data">Date: <span className="contact__name">{new Date(date).toDateString()}</span></p>
        <p className="contact__data">Carrier First Name: <span className="contact__name">{carrierFirstName}</span></p>
        <p className="contact__data">Carrier Middle Name: <span className="contact__name">{carrierMiddleName}</span></p>
        <p className="contact__data">Carrier Last Name: <span className="contact__name">{carrierLastName}</span></p>
        <p className="contact__data">Phone: <span className="contact__name">{phone}</span></p>
        <p className="contact__data">Comment: <span className="contact__name">{comment}</span></p>
        <p className="contact__data">ATI: <Link to={{pathname: `https://ati.su/firms/${ ati }/info`}} target="_blank" >{`https://ati.su/firms/${ ati }/info`}</Link></p>
      </div>
      <div className="contact__buttons">
        <button className="contact__bookmark-button button" type="button" onClick={onFavoriteClick}>
          <svg className="contact__bookmark-icon" width="30" height="30" style={{stroke: favorite ? '#4481c3' : ''}}>
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">Add to bookmarks</span>
        </button>
        <Link to={`/edit/${id}`} className="contact__bookmark-button button" id={id}>
          <button className="contact__bookmark-button button" type="button">
            <svg className="contact__edit-icon" width="30" height="30">
              <use xlinkHref="#icon-pencil"></use>
            </svg>
            <span className="visually-hidden">Edit</span>
          </button>
        </Link>
        <button className="contact__bookmark-button button" type="button" onClick={onDeleteClick}>
          <svg className="contact__bookmark-icon" width="30" height="30">
            <use xlinkHref="#icon-delete"></use>
          </svg>
          <span className="visually-hidden">Delete</span>
        </button>
      </div>
    </li>
  );
}

export default Order;
