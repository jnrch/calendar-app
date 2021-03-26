import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import { Login } from '../components/auth/Login';
import { Calendar } from '../components/calendar/Calendar';

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/login" component={ Login } />
                    <Route exact path="/" component={ Calendar } />

                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
