import React from 'react';
import PropTypes from 'prop-types';
import NewItemButton from '../new-item-button/new-item-button';

function MainEmpty(props) {
  const {activeGroupName} = props;

  return (

    <div className="cities">
      <div className="cities__places-container cities__places-container--empty container">
        <section className="cities__no-places">
          <NewItemButton />
          <div className="cities__status-wrapper tabs__content">
            <b className="cities__status">No books available</b>
            <p className="cities__status-description">We could not find any books available at the moment in "{activeGroupName}" group</p>
          </div>
        </section>
        <div className="cities__right-section" />
      </div>
    </div>
  );
}

MainEmpty.propTypes = {
  activeGroupName: PropTypes.string.isRequired,
};

export default MainEmpty;
