import { FC, memo } from 'react';

import style from './_Search.module.css';
import { InputForm } from '../../atoms';

const BUTTON_LABEL = 'Search';

interface ISearchFieldProps {
    onSubmit: () => void;
    changeHandler: () => void;
    values: { search: string };
}

const _SearchField: FC<ISearchFieldProps> = (props) => {
    const { onSubmit, changeHandler, values } = props;

    return (
        <InputForm
            buttonLabel={BUTTON_LABEL}
            formStyles={style["form"]}
            onSubmit={onSubmit}
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