import { Grid, Typography } from "@mui/material"

export const AuthLayout = ({ children, title = '' }) => {
    return (
        <Grid
            container
            spacing={ 0 }
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4}} // Style extender, tenemos acceso al tema que definimos
        >
            <Grid item
                className="box-shadow"
                xs={ 3 } // Tamaño de la caja
                sx={{ 
                    width: { md: 450 },
                    backgroundColor: 'white', 
                    padding: 3, 
                    borderRadius: 2 }}
            >
                <Typography variant="h5" sx={{ mb: 1 }}>{ title }</Typography>

                { children }

            </Grid>

        </Grid>
    )
}
