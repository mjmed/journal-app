import Swal from 'sweetalert2';

import { db } from "../firebase/firebase-config";
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from "../helpers/loadNotes";
import { types } from '../types/types';

/*
{
    notes: [],
    active: null,
    active: {
        id: 'dfgdfstehdjdada',
        title: '',
        body: '',
        imageUrl: '',
        date: 1234334434
    }
}
*/

// Tarea asíncrona
export const startNewNote = () => {
    return async ( dispatch, getState ) => {

        const { uid } = getState().auth;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${ uid }/journal/notes`).add( newNote );
        
        dispatch( activeNote( doc.id, newNote ) );
        dispatch( addNewNote( doc.id, newNote ) );
    }
}

// Asincrona
export const activeNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const addNewNote = ( id, note ) => ({
    type: types.notesAddNew,
    payload: {
        id, ...note
    }
});

// aíncrona
export const startLoadingNotes = ( uid ) => {
    return async ( dispatch ) => {
        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) );
    }
};

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
});

// Asíncrona
export const startSaveNote = ( note ) => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        if ( !note.url ) {
            delete note.url;
        }

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFirestore );

        dispatch( refreshNote( note.id, noteToFirestore ) );
        Swal.fire( 'Saved', note.title, 'success' );
    } 
}

// Síncrona
export const refreshNote = ( id, note ) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
});

// Asíncrono
export const startUploading = ( file ) => {
    return async( dispatch, getState ) => {

        const { active:activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });

        // A mi nota activa le actualizo el url, y luego hago el dispatch para guardarla
        const fileUrl = await fileUpload( file );
        activeNote.url = fileUrl;

        dispatch( startSaveNote(activeNote) );

        Swal.close();
    }
}

export const startDeleting = ( id ) => {
    return async( dispatch , getState ) => {

        const uid = getState().auth.uid;

        await db.doc(`${ uid }/journal/notes/${ id }`).delete();

        dispatch( deleteNote(id) );
    }
}

// modifica mi store para que luego pueda verse la actualización post delete
// síncrono porque solo modifico lo que ya tengo en memoria
export const deleteNote = ( id ) => ({
    type: types.notesDelete,
    payload: id
});

export const noteLogout = () => ({
    type: types.notesLogoutCleaning  
});
