import { useBookContext } from '../../../contexts/BookContext';
import { useForm } from '../../../hooks/useForm';

import style from './Filter.module.css';


export const Filter = () => {

    const { onSubmitSeachWithInput, setLimit } = useBookContext();

    const { values, changeHandler, onSubmit } = useForm({
        search: '',
    }, onSubmitSeachWithInput, {
        search: ''
    });

    const limit = (value) => {
        setLimit(value)
    }

    return (
        <div className={`global__bg-radius ${style['filter__container']}`}>
            <div className={style['container__search']}>
                <form className={style["search__form"]} onSubmit={onSubmit}>
                    <input type="text" name='search' id='search' placeholder='Search' value={values.search} onChange={changeHandler} />
                    <button>Search</button>
                </form>
            </div>
            <div className={style['container__limit']}>
                <label htmlFor="limit">Limit per Page</label>
                <select name="limit" id="limit">
                    <option onClick={() => limit(12)}>12</option>
                    <option onClick={() => limit(24)}>24</option>
                    <option onClick={() => limit(36)}>36</option>
                    <option onClick={() => limit(72)}>72</option>
                </select>
            </div>
        </div>
    );
}