import { memo, useState } from 'react'

import { InputField, InputForm, SectionTitle } from '../../atoms';

import { useBookContext } from '../../../contexts/BookContext';

const SECTION_TITLE = 'Upload Image';
const BUTTON_LABEL = 'Upload';

const UploadImage = () => {
    const [file, setFile] = useState();
    const [name, setName] = useState('');

    const { onSendFile } = useBookContext();

    const changeHandler = (e: any) => {
        const target = e.target;
        if (target.type === 'file') {
            setFile(target.files[0]);
        } else {
            setName(target.value);
        }
    };

    const onPressAddFile = async (e: any) => {
        e.preventDefault();
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append('deliverFile', file);
        formData.append('src', name);

        const result = await onSendFile(formData);
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