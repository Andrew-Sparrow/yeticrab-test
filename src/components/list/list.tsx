import React from "react";

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  className: string;
}

function List<T>(props: ListProps<T>) {
  return (
    <ul className={props.className}>
      {props.items.map(props.renderItem)}
    </ul>
  );
};

export default List;
