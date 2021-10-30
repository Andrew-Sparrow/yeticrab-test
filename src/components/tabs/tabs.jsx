import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import {groupList} from '../../const';
import {changeTab} from '../../store/actions';
import {getActiveTabName} from '../../store/orders/selectors';

function Tabs(props) {
  const activeTabName = useSelector(getActiveTabName);
  const dispatch = useDispatch();

  const handleTabClick = (evt) => {
    evt.preventDefault();
    dispatch(changeTab(evt.currentTarget.dataset.group));
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {groupList.map((group) => (
            <li className="locations__item" key={group}>
              <Link
                data-group={group}
                className={`locations__item-link tabs__item ${ group === activeTabName && 'tabs__item--active' }`}
                to="#"
                onClick={handleTabClick}
              >
                <span>{group}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Tabs;
