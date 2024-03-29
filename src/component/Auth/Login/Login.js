import { Link } from 'react-router-dom';
import style from './Login.module.css';

import { useAuthContext } from '../../../contexts/AuthContext';
import { useForm } from '../../../hooks/useForm';


export const Login = () => {

    const { onSubmitLogin } = useAuthContext();

    const { values, changeHandler, onSubmit, errors } = useForm({
        email: '',
        password: '',
    }, onSubmitLogin, {
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