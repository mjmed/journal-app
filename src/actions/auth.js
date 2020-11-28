import Swal from 'sweetalert2';

import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { types } from "../types/types";
import { noteLogout } from './notes';
import { finishLoading, startLoading } from './ui';


// Es una tarea asíncrona
export const startLoginEmailPassword = (email, password) => {

    // retorna un callback
    return (dispatch) => {

        dispatch( startLoading() );

        firebase.auth().signInWithEmailAndPassword( email, password )
            .then( ({user}) =>{

                dispatch(
                    login( user.uid, user.displayName )
                );

                dispatch( finishLoading() );
            })
            .catch( e => {
                console.log(e);
                
                dispatch( finishLoading() );

                Swal.fire('Error', e.message, 'error');
            })
    }
}

// Es una tarea asíncrona
export const startRegisterWithEmailPasswordName = ( email, password, name ) => {

    return ( dispatch ) => {

        firebase.auth().createUserWithEmailAndPassword( email, password )
            .then( async ({user}) => {

                await user.updateProfile({ displayName: name });

                dispatch(
                    login( user.uid, user.displayName )
                );

            })
            .catch( e => {
                console.log(e);

                Swal.fire('Error', e.message, 'error');
            })
    }
}


export const startGoogleLogin = () => {
    // tarea síncrona
    return ( dispatch ) => {

        // Retorna una promesa
        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ({ user }) => {
                dispatch(
                    login( user.uid, user.displayName )
                )
            });

    }
}

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});

// es asíncrono por firebase
export const startLogout = () => {
    return async ( dispatch ) => {
        await firebase.auth().signOut();

        dispatch( logout() );
        dispatch( noteLogout() );
    }
}

export const logout = () => ({
    type: types.logout
});