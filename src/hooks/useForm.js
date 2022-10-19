import { useState, useEffect, useMemo } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [formValidation, setFormValidation] = useState({})

    useEffect(() => {
        createValidators();

    }, [formState]);
    
    const isFormValid = useMemo( () => {
        
        for (const formKey of Object.keys(formValidation)) {
            // Null = no errors
            if (formValidation[formKey] !== null)
                return false;
        }

        return true;
    }, [formValidation]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () => {
        const formCheckedValues = {};

        // Imprimir el nombre de las propiedades
        for (const formField of Object.keys(formValidations)) {
            // Destructuramos el array, obteniendo la funcion y el error message
            const [ fn, errorMessage ] = formValidations[formField];

            /**
             * Se crea una nueva propiedad si el texto no cumple con la condicion
             * formState[formField] -> se accede al valor del field y se pasa a la funcion para validar el valor
             */
            formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage;

            setFormValidation( formCheckedValues );
        }
    }

    return {
        ...formState,
        ...formValidation,
        formState,
        onInputChange,
        onResetForm,
        isFormValid
    }
}