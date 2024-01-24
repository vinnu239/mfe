 import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import Signin from './components/Signin';
import SignUp from './components/Signup';

const generateClassName = createGenerateClassName({
  productionPrefix: "au",
});

export default ({ onSignIn,history }) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        {/* Here we are using Router because of memory history(which memoize the current path info) */}
        <Router history={history}>
          <Switch>
            <Route exact path="/auth/signin">
              <Signin onSignIn={onSignIn}/>
              </Route> 
            <Route exact path="/auth/signup" >
              <SignUp onSignIn={onSignIn}/>
              </Route>
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
};
