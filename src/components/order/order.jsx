import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';

import {addToFavoriteApi, deleteItemApi} from '../../store/api-actions';

function Order(props) {
  const {
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

  const onFavoriteClick = (evt) => {
    dispatch(addToFavoriteApi(id, !favorite));
  };

  const onDeleteClick = (evt) => {
    evt.preventDefault();
    dispatch(deleteItemApi(id));
  };

  return (
    <li
      className="contact"
      id={id}
    >
      <div className="contact__right">
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
          <svg className="contact__bookmark-icon" width="30" height="30" style={{stroke: favorite && '#4481c3'}}>
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">Add to bookmarks</span>
        </button>
        <button className="contact__bookmark-button button" type="button">
          <svg className="contact__edit-icon" width="30" height="30">
            <use xlinkHref="#icon-pencil"></use>
          </svg>
          <span className="visually-hidden">Edit</span>
        </button>
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

Order.propTypes = {
  'id': PropTypes.number.isRequired,
  'company': PropTypes.string.isRequired,
};

export default Order;
