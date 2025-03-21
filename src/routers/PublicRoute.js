import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';


export const PublicRoute = ({
    isLoggedIn,
    component: Component,
    ...rest
}) => {
    return (
        <Route {...rest}
            component={ (props) => (
                ( !isLoggedIn )
                    ? ( <Component {...props} /> )
                    : ( <Redirect to="/" /> ) // Si está autenticado lo redirecciona al Journal
            )}
        />
    )
}

PublicRoute.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
