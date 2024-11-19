import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { InputField, InputForm, SectionTitle } from '../../../atoms';
import { LinkedParagraph } from '../../../molecules';

import { Toast } from '../../../../Toasts';
import { ESwalIcon } from '../../../../Types/Swal';

import { useAuthContext } from '../../../../contexts/AuthContext';

import { ROUT_NAMES, ServerError, E_FORM_NAMES, E_FORM_FIELDS } from '../../../../Constants';

import { useStoreZ } from '../../../../hooks';

const BUTTON_LABEL = 'Login in';

const _Login = () => {
    const navigate = useNavigate();

    const { onSubmitLogin } = useAuthContext();
    const { search } = useStoreZ();

    const onSubmitFunction = useCallback(async () => {
        const getValue = search?.get(E_FORM_NAMES.LOGIN || '')?.fields;

        const email = getValue?.get(E_FORM_FIELDS.EMAIL);
        const password = getValue?.get(E_FORM_FIELDS.PASSWORD);
        if (!email || !password) {
            return;
        }

        const result = await onSubmitLogin({ email, password });

        if (result?.messageCode === ServerError.SUCCESSFULLY_LOGIN.messageCode) {
            Toast({ title: 'Success', typeIcon: ESwalIcon.SUCCESS })
            navigate(ROUT_NAMES.HOME);
        } else {
            Toast({ title: result?.message, typeIcon: ESwalIcon.ERROR })
        }
    }, [navigate, search, onSubmitLogin]);

    return (
        <section className={`section`}>

            <SectionTitle content='Login Page' />

            <div className={`global__bg-radius form__container`}>
                <InputForm
                    onSubmit={onSubmitFunction}
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
                        label='Email'
                        name={E_FORM_FIELDS.EMAIL}
                        formName={E_FORM_NAMES.LOGIN}
                        type="email"
                    />

                    <InputField
                        label='Password'
                        name={E_FORM_FIELDS.PASSWORD}
                        formName={E_FORM_NAMES.LOGIN}
                        type='password'
                    />
                </InputForm>
            </div >
        </section >
    );
}

export default memo(_Login);