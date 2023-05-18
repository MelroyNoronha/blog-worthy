import React, { useEffect, useState } from "react";

import { either, isEmpty, isNil } from "ramda";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { registerIntercepts, setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";
import { Login, Signup } from "components/Authentication";
import { PrivateRoute } from "components/Common";
import { CreatePost, PostModal } from "components/Posts";
import { getFromLocalStorage } from "utils/storage";

import Dashboard from "./components/Dashboard";

const SwitchWithModal = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  return (
    <>
      <Switch location={background || location}>
        <Route exact component={CreatePost} path="/create" />
        <Route exact component={Signup} path="/signup" />
        <Route exact component={Login} path="/login" />
        <PrivateRoute
          component={Dashboard}
          condition={isLoggedIn}
          path="/"
          redirectRoute="/login"
        />
      </Switch>
      {background && (
        <Route path="/posts/:slug">
          <PostModal />
        </Route>
      )}
    </>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Router>
      <ToastContainer />
      <SwitchWithModal />
    </Router>
  );
};

export default App;
