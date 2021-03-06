import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import CustomLayout from '../Containers/Layout';
const SimpleRoute = ({ component, isAuthenticated, ...rest }: any) => {
  const routeComponent = (props: any) => React.createElement(component, props);

  return (
    <CustomLayout sideBar={false}>
      <Route {...rest} render={routeComponent} />
    </CustomLayout>
  );
};

export default SimpleRoute;
