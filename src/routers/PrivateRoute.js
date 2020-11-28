import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';


export const PrivateRoute = ({
    isLoggedIn,
    component: Component,
    ...rest // argumentos como el exact o path
}) => {

    return (
        <Route {...rest}
            component={ (props) => (
                ( isLoggedIn )
                    ? ( <Component {...props} /> )
                    : ( <Redirect to="/auth/login" /> )
            )}
        />
    )
}

PrivateRoute.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
