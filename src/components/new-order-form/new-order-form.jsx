import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import withLayout from '../hocs/with-layout';
import SubmitButton from '../submit-button/submit-button';
import {addNewOrderApi} from '../../store/api-actions';

const NewBookForm = (props) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    'company': '',
    "date": new Date().toJSON(),
    'first_name': '',
    'middle_name': '',
    'last_name': '',
    'phone': '',
    'comment': '',
    'ati': '',
    'favorite': false
  });

  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setFormErrors(validate(formData));
    if (Object.keys(formErrors).length === 0) {
      dispatch(addNewOrderApi(formData));
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.company) {
      errors.company = "Введите название компании!";
    }
    if (!values.ati) {
      errors.ati = "Введите ATI код!";
    }
    return errors;
  };

  const handleInputChange = (evt) => {
    const target = evt.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: value
    });
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
              <label className="reviews__label form__label" htmlFor="title">Company*</label>
              <input
                className="reviews__textarea form__textarea"
                onChange={handleInputChange}
                id="company"
                value={formData.company}
                name="company"
              />
              <p className="reviews__error">{formErrors.company}</p>
              <label className="reviews__label form__label" htmlFor="first_name">Carrier First Name</label>
              <input
                className="reviews__textarea form__textarea"
                onChange={handleInputChange}
                id="first_name"
                value={formData.first_name}
                name="first_name"
              />
              <label className="reviews__label form__label" htmlFor="middle_name">Carrier Middle Name</label>
              <input
                className="reviews__textarea form__textarea"
                onChange={handleInputChange}
                id="middle_name"
                value={formData.middle_name}
                name="middle_name"
              />
              <label className="reviews__label form__label" htmlFor="middle_name">Carrier Last Name</label>
              <input
                className="reviews__textarea form__textarea"
                onChange={handleInputChange}
                id="last_name"
                value={formData.last_name}
                name="last_name"
              />
              <label className="reviews__label form__label" htmlFor="phone">Phone</label>
              <input
                className="reviews__textarea form__textarea"
                onChange={handleInputChange}
                id="phone"
                value={formData.phone}
                name="phone"
              />
              <label className="reviews__label form__label" htmlFor="comment">Comment</label>
              <input
                className="reviews__textarea form__textarea"
                onChange={handleInputChange}
                id="comment"
                value={formData.comment}
                name="comment"
              />
              <label className="reviews__label form__label" htmlFor="comment">ATI Code*</label>
              <input
                className="reviews__textarea form__textarea"
                onChange={handleInputChange}
                id="ati"
                value={formData.ati}
                name="ati"
              />
              <p className="reviews__error">{formErrors.ati}</p>
              <label className="reviews__label form__label" htmlFor="favorite">Favorite</label>
              <input
                className="form__favorite"
                type="checkbox"
                onChange={handleInputChange}
                id="favorite"
                checked={formData.favorite}
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
