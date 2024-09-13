import { memo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../../../contexts/AuthContext';

import { ROUT_NAMES, ServerError } from '../../../../Constants';

import { useForm } from '../../../../hooks/useForm';

import style from './_Login.module.css';

const _Login = () => {
    const navigate = useNavigate();

    const { onSubmitLogin } = useAuthContext();

    const onSubmitFunction = useCallback(async (data) => {
        const result = await onSubmitLogin(data);

        if (result?.messageCode === ServerError.SUCCESSFULLY_LOGIN.messageCode) {
            navigate(ROUT_NAMES.HOME);
        }
        
        // Show Modal
    }, [onSubmitLogin, navigate]);

    const { values, changeHandler, onSubmit, errors } = useForm({
        email: '',
        password: '',
    }, onSubmitFunction, {
        email: ['required'],
        password: ['required'],
    });

    return (
        <section className={`global__bg-radius ${style["login__section"]}`}>
            <h1 className={style["login__title"]}>Login Page</h1>
            <div className={`shadow ${style["form__container"]}`}>
                <form onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="email" name="email" id="email" value={values.email} onChange={changeHandler} onBlur={changeHandler} />
                        {errors.username && (<p className='error'>{errors.email}</p>)}
                    </div>

                    <div className="password">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" value={values.password} onChange={changeHandler} onBlur={changeHandler} />
                        {errors.password && (<p className='error'>{errors.password}</p>)}
                    </div>

                    <button className={`btn ${style["btn-login"]}`}> Login in</button >
                    <p className={style["login__account"]}>Don't have a account <Link to="/auth/register">Sign In</Link></p>
                </form >
            </div >
        </section >
    );
}

export default memo(_Login);