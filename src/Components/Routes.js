import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed";
import Explore from "../Routes/Explore";
import Search from "../Routes/Search";
import Profile from "../Routes/Profile";
import FullPost from "../Routes/FullPost";
import EditProfile from "../Routes/EditProfile";

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={Feed} />
    <Route path="/explore" component={Explore} />
    <Route path="/search" component={Search} />
    <Route exact path="/:username" component={Profile} />
    <Route path="/:username/edit" component={EditProfile}/>
    <Route path="/:username/:id" component={FullPost}/>
    <Redirect from="*" to="/" />
  </Switch>
);
const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Redirect from="*" to="/" />
  </Switch>
);
const AppRouter = ({ isLoggedIn }) =>
  isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;
