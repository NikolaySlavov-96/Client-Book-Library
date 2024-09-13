import { memo } from 'react';

import { useBookContext } from '../../../contexts/BookContext';

import { useForm } from '../../../hooks/useForm';

import style from './_Create.module.css';

const _Create = () => {

    const { onSubmitCreateProduct, error } = useBookContext();

    const { values, changeHandler, onSubmit, errors } = useForm({
        author: '',
        bookTitle: '',
        image: '',
        genre: '',
    }, onSubmitCreateProduct, {
        author: ['required', '5'],
        bookTitle: ['required', '5'],
        // image: ['required', '5'],
        // genre: ['required', '5'],
    });

    return (
        <section className={style["create__section"]}>
            <h1>Create product for salle</h1>
            {!!error.length && (<div className='error_serv'>
                {error}
            </div>
            )}
            <div className={`${style["form__container"]} global__bg-radius`}>
                <form onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="author">Author Name:</label>
                        <input type="text" name="author" id="author" placeholder="Name author" value={values.author} onChange={changeHandler} onBlur={changeHandler} />
                        {errors.author && (<p className='error'>{errors.author}</p>)}
                    </div >

                    <div>
                        <label htmlFor="image">Img of Book:</label>
                        <input type="text" name="image" id="image" placeholder="http://imgaddres" value={values.image} onChange={changeHandler} onBlur={changeHandler} />
                        {errors.image && (<p className='error'>{errors.image}</p>)}
                    </div >
                    <div>
                        <label htmlFor="bookTitle">BookTitle:</label>
                        <input type="text" name="bookTitle" id="bookTitle" placeholder="Book Name" value={values.bookTitle} onChange={changeHandler} onBlur={changeHandler} />
                        {errors.bookTitle && (<p className='error'>{errors.bookTitle}</p>)}
                    </div >
                    <div>
                        <label htmlFor="genre">Genre of Book:</label>
                        <input type="text" name="genre" id="genre" placeholder="Genre of Book" value={values.genre} onChange={changeHandler} onBlur={changeHandler} />
                        {errors.genre && (<p className='error'>{errors.genre}</p>)}
                    </div >

                    <button>Create new Book</button >
                </form >
            </div >
        </section >
    );
}

export default memo(_Create);