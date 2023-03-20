import { useState } from 'react';

export const useForm = (initialForm = {}) => {

    const [formState, setFormState] = useState(initialForm);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    const handleFileChange = (e) => {
        setFormState({ ...formState, 
            img: e.target.files[0] 
        });
    };

    const onResetForm = () => {
        setFormState(initialForm);
    }

    return {
        ...formState,
        setFormState,
        formState,
        onInputChange,
        onResetForm,
    }
}