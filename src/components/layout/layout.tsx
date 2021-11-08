import {FC} from 'react';

interface LayoutProps {
  className: string;
}

const Layout: FC<LayoutProps> = (props) =>{
  const {
    children,
    className
  } = props;

  return (
    <div className={className}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <h2 className="header__title">Orders</h2>
            </div>
          </div>
        </div>
      </header>
      {children}
    </ div>
  );
}

export default Layout;
