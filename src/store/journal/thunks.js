import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadNotes } from "../../helpers/loadNotes";
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes, setSaving, updateNote } from "./";

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
        const { uid } = getState().auth; // Se podria hacer una funcion que traiga este tipo de info, para no reptir lineas de codigo
        if (!uid) throw new Error('El UID del usuario no existe.');

        const notes = await loadNotes( uid );
        
        dispatch( setNotes(notes) );
    }
}

export const startSaveNote = () => {
    return async (dispatch, getState) => {
        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { active:note } = getState().journal; // Updated note

        const noteToFireStore = { ...note };
        delete noteToFireStore.id; // It's deleted beceause we don't want to create the ID field in the note

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc( docRef, noteToFireStore, { merge: true }); // merge, will update fields in the document or create it if doesn't exists

        dispatch( updateNote( note ) );
    }
}
