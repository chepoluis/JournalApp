import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth/authSlice";
import { startLoadingNotes } from "../store/journal";

// This is the first place we know the user is authenticated
export const useCheckAuth = () => {
    const { status } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged( FirebaseAuth, (user) => {
            if (!user) return dispatch( logout() );

            const { uid, email, displayName, photoURL } = user;
            dispatch( login({ uid, email, displayName, photoURL }) );
            dispatch( startLoadingNotes() );
        });
    }, []);

    /**
     * No se requiere en este custom hook retornar algo, ya que solo queremos
     * que se ejecute el código
     */
    return status;
}
