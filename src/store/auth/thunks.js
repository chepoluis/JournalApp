/**
 * thunks: son acciones que se usan con el dispatch, pero internamente tienen un tarea "asincrona"
 */

import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { clrearNotesLogout } from "../journal/journalSlice";
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

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });

        if (!ok) return dispatch( logout({ errorMessage }) );

        dispatch( login({ uid, displayName, email, photoURL }) )
    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async (dispatch) => {
        dispatch( checkingCredentials() );

        const { ok, uid, displayName, photoURL, errorMessage } = await loginWithEmailPassword({ email, password });

        if (!ok) return dispatch( logout({ errorMessage }) );

        dispatch( login({ uid, displayName, email, photoURL }) );
    }
}

export const startLogout = () => {
    return async (dispatch) => {
        try {
            await logoutFirebase();
        } catch (error) {
            console.error(error);
        }

        dispatch(clrearNotesLogout());
        dispatch( logout({}) );
    }
}
