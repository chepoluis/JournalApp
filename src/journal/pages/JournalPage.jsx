import { useDispatch, useSelector } from "react-redux"
import { AddOutlined } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NothingSelectedView, NoteView } from "../views"
import { startNewNote } from "../../store/journal/thunks"

export const JournalPage = () => {
    const dispatch = useDispatch();
    const { isSaving, active } = useSelector(state => state.journal);

    const onClickNewNote = () => {
        dispatch( startNewNote() );
    }

    return (
        <JournalLayout>
            {/* // <Typography component='h1'>JournalPage</Typography> // No cambia como tal la etiqueta h1 */}
            {/* <Typography variant='h1'>JournalPage</Typography> */}
            {/* <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, necessitatibus voluptas fuga, dolorum commodi officia similique animi est repellat consequatur recusandae quia magnam? Alias accusantium nihil corrupti nisi blanditiis? Beatae!</Typography> */}

            {/* Show the active note "if exist" */}
            {
                (!!active) // Lo convertimos a un valor boolean
                    ? <NoteView />
                    : <NothingSelectedView />       
            }

            // TODO: al momento de crear una nota, no se pueden agregar imagenes,
            // el error es que el array de las imagenes aun no se crea
            <IconButton
                onClick={ onClickNewNote }
                disabled={ isSaving }
                size='large'
                sx={{
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
                    position: 'fixed',
                    right: 50,
                    bottom: 50
                }}
            >
                <AddOutlined sx={{ fontSize: 30 }} />
            </IconButton>
        </JournalLayout>
    )
}
