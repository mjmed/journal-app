import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Loader from "react-loader-spinner";

import { firebase } from '../firebase/firebase-config';
import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { startLoadingNotes } from '../actions/notes';


export const AppRouter = () => {

    const dispatch = useDispatch();

    // bandera para saber si ya tengo los datos de la autenticación disponibles
    // para saber como conducir las rutas declaradas
    // ya que estoy en presencia de una acción asíncrona
    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Mantener el estado de la autenticación al recargar
    useEffect(() => {

        // onAuth esta pendiente de cada cambio en la autenticación del usuario
        firebase.auth().onAuthStateChanged( async (user) => {
            
            // evalua si el objeto user tiene algo entonces pregunta si existe el uid
            if ( user?.uid ) {
                
                dispatch( login(user.uid, user.displayName) );
                setIsLoggedIn( true );

                // Regresa las notas en la BD
                dispatch( startLoadingNotes( user.uid ) );
                
            } else {
                setIsLoggedIn( false) ;
            }

            // ya tengo la respuesta, ya terminé el chequeo
            setChecking(false);

        });

    }, [ dispatch, setChecking, setIsLoggedIn ]);

    if ( checking ) {
        return (
            <div className="router__loader">
                <Loader
                    type="Oval"
                    color="#1669f2"
                    height={35}
                    width={35}            
                />
            </div>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    {/* Ruta Pública */}
                    <PublicRoute
                        path="/auth"
                        component={ AuthRouter }
                        isLoggedIn={ isLoggedIn }
                    />

                    {/* Ruta Privada */}
                    <PrivateRoute 
                        exact
                        path="/"
                        component={ JournalScreen }
                        isLoggedIn={ isLoggedIn }
                    />

                    <Redirect to="/auth/login" />

                </Switch>
            </div>
        </Router>
    )
}
