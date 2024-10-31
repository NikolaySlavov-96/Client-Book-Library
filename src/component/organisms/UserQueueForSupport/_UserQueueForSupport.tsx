import { memo, useEffect, useMemo, useState } from 'react'

import { ChatWindowCloser, UserQueue } from '../../molecules';

import { SocketService } from '../../../services';

import { ESendEvents } from '../../../Constants';

import { useStoreZ } from '../../../hooks';

import style from './_UserQueueForSupport.module.css';

const _UserQueueForSupport = () => {
    const [isOpenMenu, setIsOpenMenu] = useState(false);

    const { connectId } = useStoreZ();

    const containerStyle = useMemo(() => (
        `shadow__window ${style['container']} ${isOpenMenu ? style['border__open'] : ''}`
    ), [isOpenMenu]);

    useEffect(() => {
        if (isOpenMenu) {
            SocketService.sendData(ESendEvents.SUPPORT_CHAT_USER_JOIN, { connectId, });
        }
    }, [isOpenMenu, connectId]);

    return (
        <div className={containerStyle}>
            {isOpenMenu ?
                <UserQueue onPress={setIsOpenMenu} />
                :
                <ChatWindowCloser
                    onPress={setIsOpenMenu}
                    title='Support User Queue'
                />}
        </div>
    )
}

export default memo(_UserQueueForSupport);