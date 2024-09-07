import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";

import style from './Header.module.css';


const _Header = () => {

    const { email, onSubmitLogout } = useAuthContext();
    const name = email?.split('@')[0];

    return (
        <header className={`global__bg-radius ${style['navigation__container']}`}>
            <nav className={style['navigation__nav']}>
                <h1>Hello {name ? name : 'Guest'}</h1>
                <ul className={style['navigation__ul']}>
                    <li><NavLink to='/book'>Books</NavLink></li>
                    {
                        !email && (<>
                            <li><NavLink to='/auth/login'>Login</NavLink></li>
                            <li><NavLink to='/auth/register'>Register</NavLink></li>
                        </>)
                    }

                    {
                        email && (<>
                            <li><NavLink to='/create'>Create</NavLink></li>
                            <li><NavLink to='/collections'>Collections Of Books</NavLink></li>
                            <li><a onClick={() => onSubmitLogout()}>Logout</a></li>
                        </>)
                    }
                </ul>
            </nav>
        </header>
    );
}

export default _Header;