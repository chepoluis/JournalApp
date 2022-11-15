import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadNotes } from "../../helpers/loadNotes";
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes } from "./";

export const startNewNote = () => {
    // getState (optional): is a function that returns all the state of the application
    return async (dispatch, getState) => {
        // Set isSaving = true
        dispatch( savingNewNote() );

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        // Create new collection in the DB
        const newDoc = doc( collection( FirebaseDB, `${uid}/journal/notes`) );
        await setDoc( newDoc, newNote );

        // Add the id created in Firestore to the newNote
        newNote.id = newDoc.id;

        // Add the note to redux
        dispatch( addNewEmptyNote(newNote) );
        dispatch( setActiveNote(newNote) );
    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        if (!uid) throw new Error('El UID del usuario no existe.');

        const notes = await loadNotes( uid );
        
        dispatch( setNotes(notes) );
    }
}
