import React, {FC} from "react";

interface SearchProps {
  searchHandler: React.ChangeEventHandler<HTMLInputElement>;
  searchInputElement: React.LegacyRef<HTMLInputElement>;
}

const Search: FC<SearchProps> = (props) => {
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