import { memo, useEffect, useMemo, useState } from 'react'

import { ChatWindowCloser, UserQueue } from '../../molecules';

import { useAuthContext } from '../../../contexts/AuthContext';

import { SocketService } from '../../../services';

import { ESendEvents } from '../../../Constants';

import style from './_UserQueueForSupport.module.css';

const _UserQueueForSupport = () => {
    const [isOpenMenu, setIsOpenMenu] = useState(false);

    const { userRole, connectId } = useAuthContext();

    useEffect(() => {
        if (isOpenMenu) {
            SocketService.sendData(ESendEvents.SUPPORT_CHAT_USER_JOIN, { connectId, });
        }
    }, [isOpenMenu, connectId]);

    const containerStyle = useMemo(() => (
        `shadow__window ${style['container']} ${isOpenMenu ? style['border__open'] : ''}`
    ), [isOpenMenu]);

    if (userRole !== 'support') {
        return <></>
    }

    return (
        <div className={containerStyle}>
            {isOpenMenu ?
                <UserQueue onPress={setIsOpenMenu} />
                :
                <ChatWindowCloser onPress={setIsOpenMenu} />}
        </div>
    )
}

export default memo(_UserQueueForSupport);