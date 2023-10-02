import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

import style from './Header.module.css';


export const Header = () => {

    const { email } = useAuthContext();
    const name = email?.split('@')[0];

    return (
        <header className={style['navigation__container']}>
            <nav className={style['navigation__nav']}>
                <h1>Hello {name ? name : 'Gues'}</h1>
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
                            <li><NavLink to='/userbook/forpurchase'>For Purchase</NavLink></li>
                            <li><NavLink to='/userbook/purchase'>Purchase</NavLink></li>
                            <li><NavLink to='/userbook/forreading'>For Reading</NavLink></li>
                            <li><NavLink to='/userbook/reading'>Reading</NavLink></li>
                            <li><NavLink to='/auth/logout'>Logout</NavLink></li>
                        </>)
                    }
                </ul>
            </nav>
        </header>
    );
}