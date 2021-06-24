import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";
import { startChecking } from '../actions/auth';
import { Login } from '../components/auth/Login';
import { Register } from '../components/auth/Register';
import { Calendar } from '../components/calendar/Calendar';
import { CalendarTotalPayment } from '../components/calendar/CalendarTotalPayment';
import { Provider } from '../components/provider/Provider';
import { RegisterUser } from '../components/user/RegisterUser';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const {checking, uid} = useSelector(state => state.auth);

    useEffect(() => {

        dispatch(startChecking());

    }, [dispatch]);

    if (checking) {
        return (<h5>Espere...</h5>);
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        exact 
                        path="/login" 
                        component={ Login } 
                        isAuthenticated={!!uid}
                    />
                    <PrivateRoute 
                        exact 
                        path="/" 
                        component={ Calendar }
                        isAuthenticated={!!uid} 
                    />
                    <PrivateRoute 
                        exact 
                        path="/totalPerPayment" 
                        component={ CalendarTotalPayment }
                        isAuthenticated={!!uid} 
                    />
                    <PrivateRoute
                        exact
                        path="/register"
                        component={ Register }
                        isAuthenticated={!!uid}
                    />
                    <PrivateRoute 
                        exact
                        path="/provider"
                        component={ Provider }
                        isAuthenticated={!!uid}
                    />
                    <PrivateRoute 
                        exact
                        path="/user"
                        component={ RegisterUser }
                        isAuthenticated={!!uid}
                    />

                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
