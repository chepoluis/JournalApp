import { StarOutline } from "@mui/icons-material"
import { Grid, Typography } from "@mui/material"

// View seccion algo grande en la cual se puede interactuar
export const NothingSelectedView = () => {
    return (
        <Grid
            container
            spacing={ 0 }
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: 'calc(100vh - 110px)', backgroundColor: 'primary.main', borderRadius: 3 }} // Style extender, tenemos acceso al tema que definimos
        >
            <Grid item xs={ 12 }>
                <StarOutline sx={{ fontSize: 100, color: 'white' }} />
            </Grid>

            <Grid item xs={ 12 }>
                <Typography color='white' variant="h5">Selecciona o crea una entrada</Typography>
            </Grid>
        </Grid>
    )
}
