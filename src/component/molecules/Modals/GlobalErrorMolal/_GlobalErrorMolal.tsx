import { memo, useEffect } from 'react';

import { useStoreZ } from '../../../../hooks';

import style from './_GlobalErrorModal.module.css';

const _GlobalErrorModal = () => {
    const { error, isVisible, closeModal } = useStoreZ();

    const modifyMessage = error.message.split('\n');

    useEffect(() => {
        const timer = setTimeout(() => {
            closeModal()
        }, 5000);

        return () => clearTimeout(timer);
    }, [closeModal]);

    if (!isVisible) {
        return null;
    }

    return (
        <div
            className={`${style['container']} ${!isVisible ? '' : style['visible']}`}
        >
            {modifyMessage.map((e: string, i: string) => <p key={i}>{e}</p>)}
        </div>
    )
}

export default memo(_GlobalErrorModal);