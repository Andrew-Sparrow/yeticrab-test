import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
// import {useSelector} from 'react-redux';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {getIsFormSending} from '../../store/form/selectors';
import {useParams} from 'react-router-dom';
import { getOrders } from '../../store/orders/selectors';

import withLayout from '../hocs/with-layout';
import EditButton from '../edit-button/edit-button';
import {editOrderApi} from '../../store/api-actions';
import {IOrder, IEditOrderFormData} from '../../types/types';

const ErrorMessage = {
  COMPANY: "Введите название компании!",
  ATI: "Введите ATI код!"
};

interface NewOrderFormProps {
  id: string;
};

const NewOrderForm = () => {
  const dispatch = useDispatch();
  const {id} = useParams<NewOrderFormProps>();

  const orders = useTypedSelector(getOrders);
  const order = orders.find((order: IOrder) => order.id === +id);

  const [formData, setFormData] = useState<IEditOrderFormData>({
    'company': order.company,
    'date': order.date,
    'first_name': order.carrier_first_name,
    'middle_name': order.carrier_middle_name,
    'last_name': order.carrier_last_name,
    'phone': order.phone,
    'comment': order.comment,
    'ati': order.ati,
    'favorite': order.favorite
  });

  const [formErrors, setFormErrors] = useState<{company: string; ati: string;}>({
    company: '',
    ati: ''
  });

  const isFormLoading = useTypedSelector(getIsFormSending);

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formErrorsValidation = isFormValid();
    setFormErrors(formErrorsValidation);
    if (formErrorsValidation.company === '' && formErrorsValidation.ati === '') {
      dispatch(editOrderApi(formData, id));
    }
  };

  const isFormValid = () => {
    let errors = {
      company: '',
      ati: ''
    };

    if (!formData.company) {
      errors.company = ErrorMessage.COMPANY;
    }
    if (!formData.ati) {
      errors.ati = ErrorMessage.ATI;
    }
    return errors;
  };

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
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
          <h2 className="form__title">Edit Order</h2>
          <fieldset disabled={isFormLoading} style={{border: 'none'}}>
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
              <EditButton isFormLoading={isFormLoading}/>
            </form>
          </fieldset>
        </section>
      </div>
    </div>
  );
};

const withLayoutMain = withLayout(NewOrderForm);
export default withLayoutMain;
