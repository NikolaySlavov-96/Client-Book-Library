import { ChangeEvent, FC, FocusEvent, forwardRef, HTMLInputTypeAttribute, memo, useImperativeHandle, useRef } from "react";

import style from './_InputField.module.css';

export interface IInputMethods {
    focusInput: () => void;
    clearInput: () => void;
}

interface IInputFieldProps {
    label: string;
    name: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
    value?: string | boolean;
    error?: string;
    placeholder?: string;
    type?: HTMLInputTypeAttribute;
}

const _InputField = forwardRef<IInputMethods, IInputFieldProps>((props, ref) => {
    const {
        error,
        label,
        name,
        onBlur,
        onChange,
        placeholder,
        type = 'text',
        value,
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focusInput: () => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        },
        clearInput: () => {
            if (inputRef.current) {
                inputRef.current.value = '';
            }
        }
    }));

    return (
        <div className={style['container']}>
            {!!label
                ? <label
                    htmlFor={name}>{label}
                </label>
                : null
            }

            <input
                ref={inputRef}
                checked={!!value}
                id={name}
                name={name}
                onBlur={onBlur}
                onChange={onChange}
                placeholder={placeholder}
                type={type}
                value={value as string}
            />
            {!!error ? (<p>{error}</p>) : ''}
        </div >
    );
});

export default memo(_InputField);