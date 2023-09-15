import style from './Filter.module.css';


export const Filter = () => {
    return (
        <div className={style['filter__container']}>
            <div className={style['container__search']}>
                <input type="text" />
                <button>Search</button>
            </div>
            <div className={style['container__limit']}>
                <label htmlFor="limit">Limit per Page</label>
                <select name="limit" id="limit">
                    <option>12</option>
                    <option>24</option>
                    <option>36</option>
                    <option>72</option>
                </select>
            </div>
        </div>
    );
}