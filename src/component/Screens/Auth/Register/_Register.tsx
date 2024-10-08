import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { InputField, InputForm, SectionTitle } from '../../../atoms';
import { LinkedParagraph } from '../../../molecules';

import { Toast } from '../../../../Toasts';
import { ESwalIcon } from '../../../../Types/Swal';

import { useAuthContext } from '../../../../contexts/AuthContext';

import { ROUT_NAMES, ServerError } from '../../../../Constants';

import { useForm } from '../../../../hooks';

const BUTTON_LABEL = 'Register';

const _Register = () => {
    const navigate = useNavigate();

    const { onSubmitRegister } = useAuthContext();

    const onSubmitFunction = useCallback(async (data: { email: string; password: string; year: string }) => {
        const result = await onSubmitRegister(data);
        if (result?.messageCode === ServerError.SUCCESSFULLY_REGISTER.messageCode) {
            Toast({ title: 'Success', typeIcon: ESwalIcon.SUCCESS })
            navigate(ROUT_NAMES.LOGIN);
        } else {
            Toast({ title: result?.message, typeIcon: ESwalIcon.ERROR })
        }
    }, [onSubmitRegister, navigate]);

    const { values, changeHandler, onSubmit, errors } = useForm({
        email: '',
        password: '',
        rePassword: '',
        year: '',
    }, onSubmitFunction, {
        email: ['required'],
        password: ['required', 5],
    });

    const err = {
        rePassword: '',
        year: '',
    }
    if (values.password !== values.rePassword) {
        err.rePassword = 'Password don\'t match';
    }

    const yearToNumber = Number(values.year);
    if (yearToNumber < 0 || yearToNumber > 110) {
        err.year = 'Year not valid'
    }

    return (
        <section className={`section`}>

            <SectionTitle content='Register Page' />

            <div className={`global__bg-radius form__container`}>
                <InputForm
                    onSubmit={onSubmit}
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
                        error={errors.email}
                        label='Email'
                        name='email'
                        onBlur={changeHandler}
                        onChange={changeHandler}
                        type="email"
                        value={values.email}
                    />

                    <InputField
                        error={errors.password}
                        label='Password'
                        name='password'
                        onBlur={changeHandler}
                        onChange={changeHandler}
                        type='password'
                        value={values.password}
                    />

                    <InputField
                        error={err.rePassword}
                        label='Repeat Password'
                        name='rePassword'
                        onBlur={changeHandler}
                        onChange={changeHandler}
                        type='password'
                        value={values.rePassword}
                    />

                    <InputField
                        error={err.year}
                        label='Year'
                        name='year'
                        onBlur={changeHandler}
                        onChange={changeHandler}
                        type='number'
                        value={values.year}
                    />
                </InputForm>
            </div >
        </section >
    );
}

export default memo(_Register);