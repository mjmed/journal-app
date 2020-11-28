
// Reducer para la Autenticación
import { types } from '../types/types';


export const authReducer = ( state = {}, action ) => {

    switch ( action.type ) {
        case types.login:
            // devuelvo un objeto
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            }

        case types.logout:
            return {}   
    
        default:
            return state;
    }
}