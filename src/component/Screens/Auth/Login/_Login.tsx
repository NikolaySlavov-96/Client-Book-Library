import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { InputField, InputForm, SectionTitle } from '../../../atoms';
import { LinkedParagraph } from '../../../molecules';

import { Toast } from '../../../../Toasts';
import { ESwalIcon } from '../../../../Types/Swal';

import { useAuthContext } from '../../../../contexts/AuthContext';

import { ROUT_NAMES, ServerError } from '../../../../Constants';

import { useForm } from '../../../../hooks';

const BUTTON_LABEL = 'Login in';

const _Login = () => {
    const navigate = useNavigate();

    const { onSubmitLogin } = useAuthContext();

    const onSubmitFunction = useCallback(async (data: { email: string, password: string }) => {
        const result = await onSubmitLogin(data);

        if (result?.messageCode === ServerError.SUCCESSFULLY_LOGIN.messageCode) {
            Toast({ title: 'Success', typeIcon: ESwalIcon.SUCCESS })
            navigate(ROUT_NAMES.HOME);
        } else {
            Toast({ title: result?.message, typeIcon: ESwalIcon.ERROR })
        }
    }, [onSubmitLogin, navigate]);

    const { values, changeHandler, onSubmit, errors } = useForm({
        email: '',
        password: '',
    }, onSubmitFunction, {
        email: ['required'],
        password: ['required'],
    });

    return (
        <section className={`section`}>

            <SectionTitle content='Login Page' />

            <div className={`global__bg-radius form__container`}>
                <InputForm
                    onSubmit={onSubmit}
                    buttonLabel={BUTTON_LABEL}
                    addSeparatorAfterButton
                    afterButton={
                        <LinkedParagraph
                            staticContent={'Don\'t have a account '}
                            to={ROUT_NAMES.REGISTER}
                            pressContent='Sign In'
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
                </InputForm>
            </div >
        </section >
    );
}

export default memo(_Login);