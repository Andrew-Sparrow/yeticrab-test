import React from 'react';

const Search = (props) => {
  const {
    searchHandler,
    searchInputElement
  } = props;

  return (
    <input
      ref={searchInputElement}
      type="search"
      placeholder="Search By Company Name"
      className="search"
      onChange={searchHandler}
    />
  );
};

export default Search;