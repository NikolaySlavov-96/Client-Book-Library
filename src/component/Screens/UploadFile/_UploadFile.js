import React, { memo, useState } from 'react'

import { InputField, InputForm, SectionTitle } from '../../atoms';

import { HOST } from '../../../Constants/connectionData';

const SECTION_TITLE = 'Upload Image';
const BUTTON_LABEL = 'Upload';

const API_IMAGE = async (method, token, url, sendData) => {
    const options = {
        method,
        header: {}
    }

    if (sendData !== undefined) {
        options.body = sendData;
    }

    try {
        const response = await fetch(HOST + url, options);

        return response;
    } catch (err) {
        throw err;
    }
}

const UploadImage = () => {
    const [file, setFile] = useState();
    const [name, setName] = useState('');

    const changeHandler = (e) => {
        const target = e.target;
        if (target.type === 'file') {
            setFile(target.files[0]);
        } else {
            setName(target.value);
        }
    };

    const onPressAddFile = async (e) => {
        e.preventDefault();
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append('deliverFile', file);
        formData.append('src', name);

        const result = await API_IMAGE('POST', '', '/book/addImage', formData);
        // Show modal with message
        console.log("🚀 ~ onPressAddFile ~ result:", result)
    };

    return (
        <section className={`section`}>

            <SectionTitle content={SECTION_TITLE} />

            <div className={`form__container global__bg-radius`}>
                    <InputForm
                        onSubmit={onPressAddFile}
                        buttonLabel={BUTTON_LABEL}
                    >
                        <InputField
                            label='File:'
                            name='image'
                            onBlur={changeHandler}
                            onChange={changeHandler}
                            type='file'
                        />

                        <InputField
                            label='src:'
                            name='src'
                            onBlur={changeHandler}
                            onChange={changeHandler}
                            value={name}
                        />
                    </InputForm>
            </div>
        </section>
    )
};

export default memo(UploadImage);