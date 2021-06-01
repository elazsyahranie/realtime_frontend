import React from "react";
import { Route, Redirect } from "react-router-dom";

// ...rest = berisikan path & exact
// parameter (yang argumennya dilempar dari App js) bisa berisikan props atau {Object}
const PrivateRoute = ({ component: Component, socket, ...rest }) => {
  const isAuthenticated = localStorage.getItem("token");
  return (
    <Route
      {...rest} // path = "...." exact
      render={(props) =>
        // <Component {...props} /> = <BasicHome />
        isAuthenticated ? (
          <Component socket={socket} {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
