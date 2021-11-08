import ReactPaginate from 'react-paginate';

interface PaginationProps {
  pageCount: number,
  forcePage: number;
  onPageNumberClick: (dataPagination: {selected: number}) => void;
};

const Pagination = (props: PaginationProps) => {
  const {
    pageCount,
    onPageNumberClick,
    forcePage
  } = props;

  return (
    <ReactPaginate
      previousLabel={'previous'}
      nextLabel={'next'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={onPageNumberClick}
      containerClassName={'pagination'}
      activeClassName={'active'}
      forcePage={forcePage}
    />
  );
};

export default Pagination;
