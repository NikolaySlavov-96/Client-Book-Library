import { memo, useCallback } from "react";

import { NavigationButton } from "../../atoms";

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
    const { email, onSubmitLogout, isVerifyUser } = useAuthContext();
    const name = email?.split('@')[0];
    
    const onPressLogout = useCallback(() => onSubmitLogout(), [onSubmitLogout]);

    return (
        <header className={`global__bg-radius ${style['navigation__container']}`}>
            <nav className={style['navigation__nav']}>
                <h1>Hello {name ? name : FIRST_NAME}</h1>

                <ul className={style['navigation__ul']}>
                    <NavigationButton path={ROUT_NAMES.BOOK} title={HEADER_BUTTON_TITLES.BOOK} />
                    {
                        !email && (<>
                            <NavigationButton path={ROUT_NAMES.LOGIN} title={HEADER_BUTTON_TITLES.LOGIN} />
                            <NavigationButton path={ROUT_NAMES.REGISTER} title={HEADER_BUTTON_TITLES.REGISTER} />
                        </>)
                    }

                    {
                        email && (<>
                            <NavigationButton path={ROUT_NAMES.CREATE_BOOK} title={HEADER_BUTTON_TITLES.CREATE_BOOK} disabled={!isVerifyUser} />
                            <NavigationButton path={ROUT_NAMES.USER_COLLECTION} title={HEADER_BUTTON_TITLES.COLLECTION_OF_BOOKS} />
                            <NavigationButton onCustomClick={onPressLogout} title={HEADER_BUTTON_TITLES.LOGOUT} />
                        </>)
                    }
                </ul>

            </nav>
        </header >
    );
}

export default memo(_Header);