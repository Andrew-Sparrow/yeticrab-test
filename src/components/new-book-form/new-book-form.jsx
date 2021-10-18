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
          <h2 className="visually-hidden">Books</h2>
          <h2 className="form__title">Add New Book</h2>
          <fieldset disabled={false} style={{border: 'none'}}>
            <form
              className="reviews__form form"
              action=""
              method="post"
              onSubmit={handleSubmit}
            >
              <label className="reviews__label form__label" htmlFor="title">Title</label>
              <input
                className="reviews__textarea form__textarea"
                onChange={() => {}}
                id="title"
                value={''}
                name="title"
              />
              <label className="reviews__label form__label" htmlFor="author">Author</label>
              <input
                className="reviews__textarea form__textarea"
                onChange={() => {}}
                id="author"
                value={''}
                name="author"
              />
              <label className="reviews__label form__label" htmlFor="cover">Cover</label>
              <input
                className="reviews__textarea form__textarea"
                onChange={() => {}}
                id="cover"
                value={''}
                name="cover"
            />
              <label className="reviews__label form__label" htmlFor="favorite">Favorite</label>
              <input
                className="form__favorite"
                type="checkbox"
                onChange={() => {}}
                id="favorite"
                value={''}
                name="cover"
              />
              <label className="reviews__label form__label" htmlFor="genre">Genre</label>
              <select
                className="form__genre"
                id="genre"
              >
                <option value="">--Please choose an option--</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
              </select>
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
