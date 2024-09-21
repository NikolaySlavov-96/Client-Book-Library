import { memo } from 'react';

import style from './_Search.module.css';

const BUTTON_LABEL = 'Search';

const _SearchField = ({ onSubmit, changeHandler, values }) => {
    return (
        <form className={style["form"]} onSubmit={onSubmit}>
            <input
                type="text"
                name='search'
                id='search'
                placeholder={BUTTON_LABEL}
                value={values.search}
                onChange={changeHandler}
                onBlur={changeHandler}
            />
            <button>{BUTTON_LABEL}</button>
        </form>
    );
}

export default memo(_SearchField);