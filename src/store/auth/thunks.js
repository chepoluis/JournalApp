/**
 * thunks: son acciones que se usan con el dispatch, pero internamente tienen un tarea asincrona
 */

import { signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {
        dispatch( checkingCredentials() );
    }
}

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch( checkingCredentials() );

        const result = await signInWithGoogle();

        // Return to skip the function
        if (!result.ok) return dispatch( logout( result ) );
        
        dispatch( login( result ) );
    }
}
