import { mount } from "auth/AuthApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default ({ onSignIn }) => {
  const ref = useRef(null);
  const history = useHistory();
  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      // this location object which containes the information where user was navigated
      // this location object was provided by history object which is used inside marketing bootstrapfile
      OnNavigate: ({ pathname: nextPathname }) => {
        // if we push the path name than other history object will update and again it will push the path which will cause the infinite loop
        // to overcome the infinite loop we have to check currenpathname and nextpath name
        const { pathname } = history.location;
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
      // it is the call back func used for auth application
      onSignIn,
    });
    history.listen(onParentNavigate);
  }, []);
  return <div ref={ref} />;
};
