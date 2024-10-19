import { memo } from 'react'

import { SupportChat, UserQueueForSupportModule } from '../../../component/organisms';

import { useStoreZ } from '../../../hooks';

const _Support = () => {
    const { rooms } = useStoreZ();
    
    return (
        <>
            <UserQueueForSupportModule />
            {
                rooms.map(r => <SupportChat roomName={r.roomName} />)
            }
        </>
    )
}

export default memo(_Support);