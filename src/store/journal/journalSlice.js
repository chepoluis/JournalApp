import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
        // active: {
        //     id: '123',
        //     title: '',
        //     body: '',
        //     date: 12345,
        //     imageUrls: [] // https://foto1.jpg, https://foto1.jpg
        // }
    },
    reducers: {
        // Solo colocar en los reducers trabajo Sincrono :=)
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            console.log(action);
            state.notes.push( action.payload );
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            // TODO: mensaje de error...
        },
        updateNote: (state, action) => {
            state.isSaving = false;
            const { id:noteId } = action.payload;

            // TODO: create an algorithm to improve the insertion
            state.notes = state.notes.map((note) => {
                if (note.id === noteId) {
                    return action.payload;
                }

                return note;
            })
        },
        deleteNoteById: (state, action) => {
            
        }
    }
});


// Action creators are generated for each case reducer function
export const {
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById
} = journalSlice.actions;