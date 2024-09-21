import { memo, useCallback, useState } from 'react';

import { InputField, SectionTitle } from '../../atoms';

import { useBookContext } from '../../../contexts/BookContext';

import { useForm } from '../../../hooks/useForm';

import style from './_CreateBook.module.css';

const SECTION_TITLE = 'Added new book';
const BUTTON_LABEL = 'Create new Book';

const _CreateBook = () => {

    const [checkbox, setCheckbox] = useState(false);

    const { onSubmitCreateProduct } = useBookContext();

    const onPressCheckBox = useCallback((e) => {
        setCheckbox(e.target.checked);
    }, [setCheckbox]);

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
        <section className={`section ${style["create__section"]}`}>

            <SectionTitle content={SECTION_TITLE} />

            <div className={`form__container global__bg-radius`}>
                <form onSubmit={onSubmit}>
                    <InputField
                        error={errors.author}
                        label='Author Name:'
                        name='author'
                        onBlur={changeHandler}
                        onChange={changeHandler}
                        placeholder='Author Name'
                        value={values.author}
                    />

                    <InputField
                        error={errors.image}
                        label='Book image:'
                        name='image'
                        onBlur={changeHandler}
                        onChange={changeHandler}
                        placeholder='https://imgaddres'
                        value={values.image}
                    />

                    <InputField
                        error={errors.bookTitle}
                        label='Book title:'
                        name='bookTitle'
                        onBlur={changeHandler}
                        onChange={changeHandler}
                        placeholder='Book title'
                        value={values.bookTitle}
                    />

                    <InputField
                        error={errors.genre}
                        label='Book genre:'
                        name='genre'
                        onBlur={changeHandler}
                        onChange={changeHandler}
                        placeholder='Book genre'
                        value={values.genre}
                    />

                    <InputField
                        label='Upload image:'
                        name='uploadImage'
                        onChange={onPressCheckBox}
                        type='checkbox'
                        value={checkbox}
                    />

                    <button>{BUTTON_LABEL}</button >
                </form >
            </div >
        </section >
    );
}

export default memo(_CreateBook);