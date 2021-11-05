import * as React from "react";

interface Props {
  searchHandler: React.ChangeEventHandler<HTMLInputElement>;
  searchInputElement: React.LegacyRef<HTMLInputElement>;
}

const Search = (props: Props) => {
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