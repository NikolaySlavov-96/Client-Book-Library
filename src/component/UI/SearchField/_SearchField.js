import { memo } from 'react';

import style from './Search.module.css';

const _SearchField = ({ onSubmit, changeHandler, values }) => {
    return (
        <form className={style["form"]} onSubmit={onSubmit}>
            <input type="text" name='search' id='search' placeholder='Search' value={values.search} onChange={changeHandler} />
            <button>Search</button>
        </form>
    );
}

export default memo(_SearchField);