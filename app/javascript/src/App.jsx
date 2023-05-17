import React, { useEffect, useState } from "react";

import {
  Route,
  Switch,
  BrowserRouter as Router,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { registerIntercepts, setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";
import Signup from "components/Authentication/Signup";
import Dashboard from "components/Dashboard";
import { CreatePost, PostModal } from "components/Posts";

const SwitchWithModal = () => {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <Switch location={background || location}>
        <Route exact path="/" render={() => <div>Home</div>} />
        <Route exact component={CreatePost} path="/create" />
        <Route exact component={Dashboard} path="/dashboard" />
        <Route exact component={Signup} path="/signup" />
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
