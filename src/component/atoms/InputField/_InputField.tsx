import { ChangeEvent, FC, FocusEvent, HTMLInputTypeAttribute, memo, useState } from "react";

import { useStoreZ } from "../../../hooks";

import { E_FORM_NAMES } from "../../../Constants";

import style from './_InputField.module.css';

interface IInputFieldProps {
    label: string;
    name: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    formName?: E_FORM_NAMES;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
    value?: string | boolean;
    error?: string;
    placeholder?: string;
    type?: HTMLInputTypeAttribute;
}

const _InputField: FC<IInputFieldProps> = (props) => {
    const {
        error: outError,
        formName,
        label,
        name,
        onBlur,
        onChange,
        placeholder,
        type = 'text',
        value: outValue,
    } = props;

    const { setSearch, search } = useStoreZ();

    const initValue = {
        [type]: '',
    }
    const errorTarget = {
        [type]: ['required', '5'],
    }
    const [error, setError] = useState(initValue);

    const getValue = search?.get(formName || '')?.fields;
    const value = getValue?.get(name) ?? '';

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        formName && setSearch(formName, e.target.name, e.target.value);

        const fieldValue = getValue?.get(e.target.name) || '';

        if (errorTarget[e.target.name] && errorTarget[e.target.name][0] === 'required') {
            if (fieldValue.length <= 1) {
                setError(state => ({ ...state, [e.target.name]: `${e.target.name} is required` }))
                // } else if (errorTarget[e.target.name]?.[1]! > Number(fieldValue?.length)) {
                // setError(state => ({ ...state, [e.target.name]: `Minimal length is ${errorTarget[e.target.name][1]}` }))
            } else {
                setError(state => ({ ...state, [e.target.name]: '' }))
            }
        }
    }


    return (
        <div className={style['container']}>
            {!!label
                ? <label
                    htmlFor={name}>{label}
                </label>
                : null
            }

            <input
                checked={!!value}
                id={name}
                name={name}
                onBlur={!!formName ? changeHandler : onBlur}
                onChange={!!formName ? changeHandler : onChange}
                placeholder={placeholder}
                type={type}
                value={formName ? value : outValue as string}
            />
            {!!error ? (<p>{!!formName ? error[name] : outError}</p>) : null}
        </div >
    );
};

export default memo(_InputField);