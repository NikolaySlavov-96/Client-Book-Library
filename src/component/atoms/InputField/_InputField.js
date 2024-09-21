import { memo } from "react";

import style from './_InputField.module.css';

const _InputField = (props) => {
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
                checked={value}
                id={name}
                name={name}
                onBlur={onBlur}
                onChange={onChange}
                placeholder={placeholder}
                type={type}
                value={value}
            />
            {!!error ? (<p className='error'>{error}</p>) : ''}
        </div >
    );
};

export default memo(_InputField);