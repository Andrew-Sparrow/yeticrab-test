import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import withLayout from '../hocs/with-layout';
import SubmitButton from '../submit-button/submit-button';
import {addNewOrderApi} from '../../store/api-actions';

const NewBookForm = (props) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    cover: '',
    group: '',
    favorite: false
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(addNewOrderApi());
  };

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places form">
          <h2 className="visually-hidden">Order</h2>
          <h2 className="form__title">Add New Order</h2>
          <fieldset disabled={false} style={{border: 'none'}}>
            <form
              className="reviews__form form"
              action=""
              method="post"
              onSubmit={handleSubmit}
            >
              <label className="reviews__label form__label" htmlFor="title">Company</label>
              <input
                className="reviews__textarea form__textarea"
                onChange={() => {}}
                id="title"
                value={''}
                name="title"
              />
              <label className="reviews__label form__label" htmlFor="first_name">Carrier First Name</label>
              <input
                className="reviews__textarea form__textarea"
                onChange={() => {}}
                id="first_name"
                value={''}
                name="first_name"
              />
              <label className="reviews__label form__label" htmlFor="middle_name">Carrier Middle Name</label>
              <input
                className="reviews__textarea form__textarea"
                onChange={() => {}}
                id="middle_name"
                value={''}
                name="middle_name"
              />
              <label className="reviews__label form__label" htmlFor="middle_name">Carrier Last Name</label>
              <input
                className="reviews__textarea form__textarea"
                onChange={() => {}}
                id="last_name"
                value={''}
                name="last_name"
              />
              <label className="reviews__label form__label" htmlFor="phone">Phone</label>
              <input
                className="reviews__textarea form__textarea"
                onChange={() => {}}
                id="phone"
                value={''}
                name="phone"
              />
              <label className="reviews__label form__label" htmlFor="comment">Comment</label>
              <input
                className="reviews__textarea form__textarea"
                onChange={() => {}}
                id="comment"
                value={''}
                name="comment"
              />
              <label className="reviews__label form__label" htmlFor="comment">ATI Code</label>
              <input
                className="reviews__textarea form__textarea"
                onChange={() => {}}
                id="ati"
                value={''}
                name="ati"
              />
              <label className="reviews__label form__label" htmlFor="favorite">Favorite</label>
              <input
                className="form__favorite"
                type="checkbox"
                onChange={() => {}}
                id="favorite"
                value={''}
                name="favorite"
              />
              <SubmitButton/>
            </form>
          </fieldset>
        </section>
      </div>
    </div>
  );
};

const withLayoutMain = withLayout(NewBookForm);
export default withLayoutMain;
