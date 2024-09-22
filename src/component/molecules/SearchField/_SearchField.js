import { memo } from 'react';

import style from './_Search.module.css';
import { InputForm } from '../../atoms';

const BUTTON_LABEL = 'Search';

const _SearchField = ({ onSubmit, changeHandler, values }) => {
    return (
        <InputForm
            buttonLabel={BUTTON_LABEL}
            formStyles={style["form"]}
        >
            <input
                type="text"
                name='search'
                id='search'
                placeholder={BUTTON_LABEL}
                value={values.search}
                onChange={changeHandler}
                onBlur={changeHandler}
            />
        </InputForm>
    );
}

export default memo(_SearchField);