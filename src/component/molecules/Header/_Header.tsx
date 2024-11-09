import { memo, useCallback, useMemo } from "react";

import { NavigationButton } from "../../atoms";

import { useAuthContext } from "../../../contexts/AuthContext";

import { HEADER_BUTTON_TITLES, ROUT_NAMES } from "../../../Constants";

import style from './_Header.module.css';

const FIRST_NAME = 'Guest';

const _Header = () => {
    const { email, onSubmitLogout, isVerifyUser, userRole, } = useAuthContext();

    const name = useMemo(() => (email?.split('@')[0]), [email]);

    const onPressLogout = useCallback(() => onSubmitLogout({ token: '1' }), [onSubmitLogout]);

    return (
        <header className={`global__bg-radius ${style['navigation__container']}`}>
            <nav className={style['navigation__nav']}>
                <h1>Hello {name ? name : FIRST_NAME}</h1>

                <ul className={style['navigation__ul']}>
                    <NavigationButton path={ROUT_NAMES.BOOK} title={HEADER_BUTTON_TITLES.BOOK} />
                    {
                        !!email ? (
                            <>
                                <NavigationButton path={ROUT_NAMES.CREATE_BOOK} title={HEADER_BUTTON_TITLES.CREATE_BOOK} isDisabled={!isVerifyUser} />
                                <NavigationButton path={ROUT_NAMES.USER_COLLECTION} title={HEADER_BUTTON_TITLES.COLLECTION_OF_BOOKS} />
                                <NavigationButton path="/" onCustomClick={onPressLogout} title={HEADER_BUTTON_TITLES.LOGOUT} />
                            </>)
                            :
                            (<>
                                <NavigationButton path={ROUT_NAMES.LOGIN} title={HEADER_BUTTON_TITLES.LOGIN} />
                                <NavigationButton path={ROUT_NAMES.REGISTER} title={HEADER_BUTTON_TITLES.REGISTER} />
                            </>)
                    }
                    {
                        userRole === 'support' ?
                            <>
                                <NavigationButton path={ROUT_NAMES.SUPPORT_CHAT} title={HEADER_BUTTON_TITLES.CHAT} />
                            </>
                            :
                            null
                    }
                </ul>

            </nav>
        </header >
    );
}

export default memo(_Header);