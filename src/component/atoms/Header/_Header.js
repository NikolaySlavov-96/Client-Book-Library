import { memo, useCallback } from "react";
import { NavLink } from "react-router-dom";

import { useAuthContext } from "../../../contexts/AuthContext";

import { ROUT_NAMES } from "../../../Constants";

import style from './_Header.module.css';

const FIRST_NAME = 'Guest';
const HEADER_BUTTON_TITLES = {
    BOOK: 'Book',
    CREATE_BOOK: 'Create',
    LOGIN: 'Login',
    REGISTER: 'Register',
    COLLECTION_OF_BOOKS: 'Collections of Books',
    LOGOUT: 'Logout',
}

const _Header = () => {
    const { email, onSubmitLogout } = useAuthContext();
    const name = email?.split('@')[0];

    const onPressLogout = useCallback(() => onSubmitLogout(), [onSubmitLogout]);

    return (
        <header className={`global__bg-radius ${style['navigation__container']}`}>
            <nav className={style['navigation__nav']}>
                <h1>Hello {name ? name : FIRST_NAME}</h1>

                <ul className={style['navigation__ul']}>
                    <li><NavLink to={ROUT_NAMES.BOOK}>{HEADER_BUTTON_TITLES.BOOK}</NavLink></li>
                    {
                        !email && (<>
                            <li><NavLink to={ROUT_NAMES.LOGIN}>{HEADER_BUTTON_TITLES.LOGIN}</NavLink></li>
                            <li><NavLink to={ROUT_NAMES.REGISTER}>{HEADER_BUTTON_TITLES.REGISTER}</NavLink></li>
                        </>)
                    }

                    {
                        email && (<>
                            <li><NavLink to={ROUT_NAMES.CREATE_BOOK}>{HEADER_BUTTON_TITLES.CREATE_BOOK}</NavLink></li>
                            <li><NavLink to={ROUT_NAMES.USER_COLLECTION}>{HEADER_BUTTON_TITLES.COLLECTION_OF_BOOKS}</NavLink></li>
                            <li><a onClick={onPressLogout}>{HEADER_BUTTON_TITLES.LOGOUT}</a></li>
                        </>)
                    }
                </ul>

            </nav>
        </header>
    );
}

export default memo(_Header);