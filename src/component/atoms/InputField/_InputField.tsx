import { ChangeEvent, FC, FocusEvent, HTMLInputTypeAttribute, memo } from "react";

import style from './_InputField.module.css';

interface IInputFieldProps {
    error: string;
    label: string;
    name: string;
    onBlur: (e: FocusEvent<HTMLInputElement>) => void;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type: HTMLInputTypeAttribute,
    value: string | boolean;
    placeholder?: string;
}

const _InputField: FC<IInputFieldProps> = (props) => {
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
                onBlur={onBlur}
                onChange={onChange}
                placeholder={placeholder}
                type={type}
                value={value as string}
            />
            {!!error ? (<p className='error'>{error}</p>) : ''}
        </div >
    );
};

export default memo(_InputField);