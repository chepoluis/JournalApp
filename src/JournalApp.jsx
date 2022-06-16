import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router/AppRouter'


// Sitema de rutas principal de la aplicacion
export const JournalApp = () => {
    return (
        <>
            <AppRouter />
        </>
    )
}
