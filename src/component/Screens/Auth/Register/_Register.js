import { memo, useCallback } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../../../contexts/AuthContext';

import { ROUT_NAMES, ServerError } from '../../../../Constants';

import { useForm } from '../../../../hooks/useForm';

import style from './_Register.module.css';

const _Register = () => {
    const navigate = useNavigate();

    const { onSubmitRegister } = useAuthContext();

    const onSubmitFunction = useCallback(async (data) => {
        const result = await onSubmitRegister(data);

        if (result?.messageCode === ServerError.SUCCESSFULLY_REGISTER.messageCode) {
            navigate(ROUT_NAMES.LOGIN);
        }

        // Show Modal
    }, [onSubmitRegister, navigate]);

    const { values, changeHandler, onSubmit, errors } = useForm({
        email: '',
        password: '',
        rePassword: '',
        year: '',
    }, onSubmitFunction, {
        email: ['required'],
        password: ['required', '5'],
    });

    const err = {
        rePassword: '',
        year: '',
    }
    if (values.password !== values.rePassword) {
        err.rePassword = 'Password don\'t match';
    }

    if (values.year < 0 || values.year > 110) {
        err.year = 'Year not valid'
    }

    return (
        <section className={`global__bg-radius ${style["register__section"]}`}>
            <div className={`shadow ${style["form__container"]}`}>
                <form onSubmit={onSubmit}>
                    <div className="email">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name='email' value={values.email} onChange={changeHandler} onBlur={changeHandler} />
                        {errors.email && (<p className='error'>{errors.email}</p>)}
                    </div>

                    <div className="password">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name='password' value={values.password} onChange={changeHandler} onBlur={changeHandler} />
                        {errors.password && (<p className='error'>{errors.password}</p>)}
                    </div >

                    <div className="repeatPassword">
                        <label htmlFor="rePassword">Repeat Password</label>
                        <input type="password" id="rePassword" name='rePassword' value={values.rePassword} onChange={changeHandler} />
                        {err.rePassword && (<p className='error'>{err.rePassword}</p>)}
                    </div>

                    <div className="year">
                        <label htmlFor="year">Year</label>
                        <input type="number" id="year" name='year' value={values.year} onChange={changeHandler} />
                        {err.year && (<p className='error'>{err.year}</p>)}
                    </div >

                    <button className={`btn ${style["btn-register"]}`}> Register</button >
                    <p className={style["register__account"]}>Have a account <Link to="/auth/login">Sign Up</Link></p>
                </form >
            </div >
        </section >
    );
}

export default memo(_Register);