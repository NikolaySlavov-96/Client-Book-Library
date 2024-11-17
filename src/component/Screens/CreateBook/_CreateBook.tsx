import { memo, useCallback, useEffect, useState } from 'react';

import { InputField, InputForm, SectionTitle } from '../../atoms';

import { InformationToast } from '../../../Toasts';
import { ESwalIcon } from '../../../Types/Swal';

import { useForm, useStoreZ } from '../../../hooks';

import { IAddProductWithImage } from '../../../Store/Slicers/ProductSlicer.interface';

import style from './_CreateBook.module.css';

const SECTION_TITLE = 'Added new book';
const BUTTON_LABEL = 'Create new Book';
const SUCCESS_MESSAGE = "Successfully added picture";

const _CreateBook = () => {

    const { addProductWithImage, isProductAdded, isLoadingProductAddition } = useStoreZ();

    const [file, setFile] = useState<File>();
    const [name, setName] = useState('');


    const changeHandlerImage = (e: any) => {
        const target = e.target;
        if (target.type === 'file') {
            setFile(target.files[0]);
        } else {
            setName(target.value);
        }
    };

    const onCreateNewBook = useCallback((data: IAddProductWithImage['data']) => {
        if (!file) { return }

        addProductWithImage(data, { file, name });
    }, [name, file, addProductWithImage]);

    const { values, changeHandler, onSubmit, errors } = useForm({
        author: '',
        productTitle: '',
        genre: '',
    }, onCreateNewBook, {
        author: ['required', 5],
        productTitle: ['required', 5],
        genre: ['required', 5],
    });


    useEffect(() => {
        if (!isLoadingProductAddition) {
            if (!isProductAdded) {
                InformationToast({ title: 'err.message', typeIcon: ESwalIcon.ERROR });
                return;
            }
            InformationToast({ title: SUCCESS_MESSAGE, typeIcon: ESwalIcon.SUCCESS });
        }
    }, [isLoadingProductAddition, isProductAdded])

    if(isLoadingProductAddition) {
        // Added Loader screen
    }

    return (
        <section className={`section ${style["create__section"]}`}>

            <SectionTitle content={SECTION_TITLE} />

            <div className={`form__container global__bg-radius`}>
                <InputForm
                    onSubmit={onSubmit}
                    buttonLabel={BUTTON_LABEL}
                >
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
                        error={errors.productTitle}
                        label='Book title:'
                        name='productTitle'
                        onBlur={changeHandler}
                        onChange={changeHandler}
                        placeholder='Book title'
                        value={values.productTitle}
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
                        label='Image:'
                        name='image'
                        onBlur={changeHandlerImage}
                        onChange={changeHandlerImage}
                        type='file'
                    />

                    <InputField
                        label='src:'
                        name='src'
                        onBlur={changeHandlerImage}
                        onChange={changeHandlerImage}
                        value={name}
                    />

                </InputForm>
            </div >
        </section >
    );
}

export default memo(_CreateBook);