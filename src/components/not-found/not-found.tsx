import {FC} from 'react';
import withLayout from '../hocs/with-layout';

const NotFound: FC = () => {
  return (
    <div className="not-fount">
      <h1 className="not-fount__title">404</h1>
      <h2>Page Not Found</h2>
    </div>
  );
}

const withLayoutNotFound = withLayout(NotFound);
export default withLayoutNotFound;
