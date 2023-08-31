import { useState } from "react";

export const useForm = (initialValue, onSubmitHandler, errorTarget) => {
    const [values, setValue] = useState(initialValue);
    const [errors, setErrors] = useState(initialValue);

    const changeHandler = (e) => {
        setValue(state => ({ ...state, [e.target.name]: e.target.value }));

        if (errorTarget[e.target.name] && errorTarget[e.target.name][0] === 'required') {
            if (values[e.target.name].length <= 1) {
                setErrors(state => ({ ...state, [e.target.name]: `${e.target.name} is required` }))
            } else if (errorTarget[e.target.name]?.[1] > values[e.target.name].length) {
                setErrors(state => ({ ...state, [e.target.name]: `Minimal length is ${errorTarget[e.target.name][1]}` }))
            } else {
                setErrors(state => ({ ...state, [e.target.name]: '' }))
            }
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();

        onSubmitHandler(values);
        setValue(initialValue);
    }

    const changeValue = (newValue) => {
        setValue(newValue);
    }

    return {
        values,
        changeHandler,
        onSubmit,
        changeValue,
        errors
    }
}