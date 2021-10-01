import React from "react";
import Layout from "./Layout";
import "../styles/App.css";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export default function App() {
   return (
      <div className='App'>
         <Router>
            <AuthProvider>
               <Layout>
                  <Switch>
                     <Route exact path='/'>
                        <Home />
                     </Route>
                     <PublicRoute exact path='/signup' component={Signup} />
                     <PublicRoute exact path='/login' component={Login} />
                     <PrivateRoute path='/quiz/:id' component={Quiz} />
                     <PrivateRoute path='/result/:id' component={Result} />
                  </Switch>
               </Layout>
            </AuthProvider>
         </Router>
      </div>
   );
}
