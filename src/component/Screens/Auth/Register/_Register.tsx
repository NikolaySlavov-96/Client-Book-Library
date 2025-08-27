import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { InputField, InputForm, SectionTitle } from '../../../atoms';
import { LinkedParagraph } from '../../../molecules';

import { Toast } from '../../../../Toasts';
import { ESwalIcon } from '../../../../Types/Swal';

import { useAuthContext } from '../../../../contexts/AuthContext';

import { E_FORM_FIELDS, E_FORM_NAMES, ROUT_NAMES, ServerError } from '../../../../constants2';

import { useStoreZ } from '../../../../hooks';

const BUTTON_LABEL = 'Register';

const _Register = () => {
    const navigate = useNavigate();

    const { onSubmitRegister } = useAuthContext();
    const { search } = useStoreZ();

    const onSubmitFunction = useCallback(async () => {
        const getValue = search?.get(E_FORM_NAMES.REGISTER || '')?.fields;

        const email = getValue?.get(E_FORM_FIELDS.EMAIL) || '';
        const password = getValue?.get(E_FORM_FIELDS.PASSWORD) || '';
        const rePassword = getValue?.get(E_FORM_FIELDS.RE_PASSWORD) || '';
        const year = getValue?.get(E_FORM_FIELDS.YEAR) || '';

        if (password === '' || password !== rePassword) {
            return;
        }

        const result = await onSubmitRegister({ email, password, year });

        if (result?.messageCode === ServerError.SUCCESSFULLY_REGISTER.messageCode) {
            Toast({ title: 'Success', typeIcon: ESwalIcon.SUCCESS })
            navigate(ROUT_NAMES.LOGIN);
        } else {
            Toast({ title: result?.message, typeIcon: ESwalIcon.ERROR })
        }
    }, [onSubmitRegister, search, navigate]);

    // const err = {
    //     rePassword: '',
    //     year: '',
    // }
    // if (values.password !== values.rePassword) {
    //     err.rePassword = 'Password don\'t match';
    // }

    // const yearToNumber = Number(values.year);
    // if (yearToNumber < 0 || yearToNumber > 110) {
    //     err.year = 'Year not valid'
    // }

    return (
        <section className={`section`}>

            <SectionTitle content='Register Page' />

            <div className={`global__bg-radius form__container`}>
                <InputForm
                    onSubmit={onSubmitFunction}
                    buttonLabel={BUTTON_LABEL}
                    addSeparatorAfterButton
                    afterButton={
                        <LinkedParagraph
                            staticContent='Have a account'
                            to={ROUT_NAMES.LOGIN}
                            pressContent='Sign Up'
                        />
                    }
                >
                    <InputField
                        label='Email'
                        name='email'
                        formName={E_FORM_NAMES.REGISTER}
                        type="email"
                    />

                    <InputField
                        label='Password'
                        name='password'
                        formName={E_FORM_NAMES.REGISTER}
                        type='password'
                    />

                    <InputField
                        label='Repeat Password'
                        name='rePassword'
                        formName={E_FORM_NAMES.REGISTER}
                        type='password'
                    />

                    <InputField
                        label='Year'
                        name='year'
                        formName={E_FORM_NAMES.REGISTER}
                        type='number'
                    />
                </InputForm>
            </div >
        </section >
    );
}

export default memo(_Register);