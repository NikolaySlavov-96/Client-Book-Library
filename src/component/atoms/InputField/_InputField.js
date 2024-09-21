import { memo } from "react";

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
        <div>
            {!!label
                ? <label
                    htmlFor={name}>{label}
                </label>
                : null
            }

            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur} />
            {!!error ? (<p className='error'>{error}</p>) : ''}
        </div >
    );
};

export default memo(_InputField);