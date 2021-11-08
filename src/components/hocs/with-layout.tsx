import Layout from '../layout/layout';

const withLayout = (Component: any, className?: string) =>
  function wrapper(props: any) {
    return (
      <Layout className={className ? className : ''}>
        <Component {...props} />
      </Layout>
    );
  };

withLayout.displayName = 'withLayout';

export default withLayout;
