import { memo, useCallback, useEffect, useState } from 'react';

import { InputField, InputForm, SectionTitle } from '../../atoms';

import { InformationToast } from '../../../Toasts';
import { ESwalIcon } from '../../../Types/Swal';

import { useStoreZ } from '../../../hooks';

import { E_FORM_FIELDS, E_FORM_NAMES } from '../../../constants';

import style from './_CreateProduct.module.css';

const SECTION_TITLE = 'Added new book';
const BUTTON_LABEL = 'Create new Book';
const SUCCESS_MESSAGE = "Successfully added picture";

const _CreateProduct = () => {
    const { addProductWithImage, isProductAdded, isLoadingProductAddition, search } = useStoreZ();

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

    const onCreateNewBook = useCallback(() => {
        if (!file) { return }

        const getValue = search?.get(E_FORM_NAMES.CREATE_BOOK || '')?.fields;

        const author = getValue?.get(E_FORM_FIELDS.AUTHOR) || '';
        const productTitle = getValue?.get(E_FORM_FIELDS.PRODUCT_TITLE) || '';
        const genre = getValue?.get(E_FORM_FIELDS.GENRE) || '';

        addProductWithImage({ author, productTitle, genre }, { file, name });
    }, [name, file, addProductWithImage, search]);

    useEffect(() => {
        if (!isLoadingProductAddition) {
            if (!isProductAdded) {
                InformationToast({ title: 'err.message', typeIcon: ESwalIcon.ERROR });
                return;
            }
            InformationToast({ title: SUCCESS_MESSAGE, typeIcon: ESwalIcon.SUCCESS });
        }
    }, [isLoadingProductAddition, isProductAdded])

    if (isLoadingProductAddition) {
        // Added Loader screen
    }

    return (
        <section className={`section ${style["create__section"]}`}>

            <SectionTitle content={SECTION_TITLE} />

            <div className={`form__container global__bg-radius`}>
                <InputForm
                    onSubmit={onCreateNewBook}
                    buttonLabel={BUTTON_LABEL}
                >
                    <InputField
                        label='Author Name:'
                        name='author'
                        formName={E_FORM_NAMES.CREATE_BOOK}
                        placeholder='Author Name'
                    />

                    <InputField
                        label='Book title:'
                        name='productTitle'
                        formName={E_FORM_NAMES.CREATE_BOOK}
                        placeholder='Book title'
                    />

                    <InputField
                        label='Book genre:'
                        name='genre'
                        formName={E_FORM_NAMES.CREATE_BOOK}
                        placeholder='Book genre'
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

export default memo(_CreateProduct);