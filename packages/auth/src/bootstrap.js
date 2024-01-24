import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./App";
// Mount function to start up the app
const mount = (el, { onSignIn,OnNavigate, defaultHistory, initialPath }) => {
  // after we navigation in any component the createMemoryHistory will take intital path as '/' at firsttime
  // so due to thaat if we navigate back to login page it wont render the component first time
  // so to overcome that we are sending an object inside createMemoryHistory
  // initial path we are getting form the container app.js
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });
  //Here listen will help to track the URl path
  //OnNavigate is the callback function which will help us to update the url info for browser history calling from container application
  if (OnNavigate) {
    history.listen(OnNavigate);
  }
  ReactDOM.render(<App onSignIn={onSignIn} history={history} />, el);

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;
      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_auth-dev-root");

  if (devRoot) {
    // here {} is for when we marketing app we will get OnNavigate as undefined so to overcome that we are using
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

// We are running through container
// and we should export the mount function
export { mount };
