/**
 * thunks: son acciones que se usan con el dispatch, pero internamente tienen un tarea asincrona
 */

import { registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
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

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async (dispatch) => {
        dispatch( checkingCredentials() );

        const resp = await registerUserWithEmailPassword({ email, password, displayName });

        console.log(resp)
    }
}
