import { DeleteOutline, SaveOutlined, UploadFileOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { useRef } from "react"
import { useEffect } from "react"
import { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css';
import { useForm } from "../../hooks/useForm"
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal"
import { ImageGallery } from "../components"

export const NoteView = () => {
    const dispatch = useDispatch();

    const { active:note, messageSaved, isSaving } = useSelector( state => state.journal );
    
    const { title, body, date, onInputChange, formState } = useForm(note);

    const fileInputRef = useRef();

    /**
     * Se utiliza el useMemo para no tener que hacer esta operacion cada
     * vez que cambie el estado en el componente
     */
    const dateString = useMemo(() => {
        const newDate = new Date( date );

        return newDate.toUTCString();
    }, [date]);

    useEffect(() => {
        dispatch( setActiveNote(formState) ); // Update the active note
    }, [formState]);

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire('Nota actualizada', messageSaved, 'success');
        }
    }, [messageSaved]);

    const onSaveNote = () => {
        dispatch( startSaveNote() )
    }

    const onFileInputChange = ({ target }) => {
        if ( target.files === 0) return;

        dispatch( startUploadingFiles( target.files ));
    }

    const onDelete = () => {
        dispatch( startDeletingNote() );
    }

    return (
        <Grid
            className="animate__animated animate__fadeIn animate__faster"
            container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            sx={{ mb: 1 }}
        >
            <Grid item>
                <Typography fontSize={ 39 } fontWeight='light' >{ dateString }</Typography>
            </Grid>

            <Grid item>

                <input
                    ref={ fileInputRef }
                    type="file"
                    multiple
                    onChange={ onFileInputChange }
                    style={{ display: 'none' }}
                />

                <IconButton
                    color="primary"
                    disabled={ isSaving }
                    onClick={ () => fileInputRef.current.click()} // Hace la referencia al click del file input
                >
                    <UploadFileOutlined />
                </IconButton>

                <Button
                    disabled={ isSaving }
                    onClick={ onSaveNote }
                    color='primary'
                    sx={{ padding: 2 }}
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type='text'
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un título"
                    label='Título'
                    sx={{ border: 'none', mb: 1 }}
                    name="title"
                    value={ title }
                    onChange={ onInputChange }
                />

                <TextField
                    type='text'
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Qué sucedió en el día de hoy?"
                    minRows={ 5 }
                    name="body"
                    value={ body }
                    onChange={ onInputChange }
                />
            </Grid>

            <Grid container justifyContent='end'>
                <Button
                    onClick={ onDelete }
                    sx={{ mt: 2 }}
                    color='error'
                >
                    <DeleteOutline />
                </Button>
            </Grid>

            <ImageGallery images={note.imageUrls} />
        </Grid>
    )
}
