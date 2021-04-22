import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// import PrivateRoute from './PrivateRouting'
import JobOverview from "../Containers/JobOverview";
import CustomLayout from "./../Containers/Layout/index";
import AllJobs from "./../Containers/AllJobs/index";
const Routing = () => {
  return (
    <CustomLayout>
      <Switch>
        {/* <PrivateRoute exact path="/" component={Home} /> */}
        <Route exact path="/" component={AllJobs} />
        <Route exact path="/jobs" component={AllJobs} />

        <Route exact path="/jobs/:id" component={JobOverview} />

        <Redirect to="/" />
      </Switch>
    </CustomLayout>
  );
};

export default Routing;
