import { SaveOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { useEffect } from "react"
import { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../../hooks/useForm"
import { setActiveNote, startSaveNote } from "../../store/journal"
import { ImageGallery } from "../components"

export const NoteView = () => {
    const dispatch = useDispatch();

    const { active:note } = useSelector( state => state.journal );
    
    const { title, body, date, onInputChange, formState } = useForm(note);

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

    const onSaveNote = () => {
        dispatch( startSaveNote() )
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
                <Button
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

            <ImageGallery />
        </Grid>
    )
}
