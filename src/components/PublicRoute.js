import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ component: Component, path }) {
   const { currentUser } = useAuth();
   return !currentUser ? (
      <Route exact path={path}>
         {(props) => <Component {...props} />}
      </Route>
   ) : (
      <Redirect to='/' />
   );
}
