import { memo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { TitleFromLocation } from '../../../Helpers';

const _Helmet = () => {
    const locate = useLocation();

    const [title, setTitle] = useState('');

    useEffect(() => {
        const editedTitle = TitleFromLocation(locate);
        setTitle(editedTitle);
    }, [locate, setTitle])

    return (
        <HelmetProvider>
            <Helmet>
                <title>{`${title} - Book Library`}</title>
                <meta name="keywords" content="HTML,CSS,JavaScript" />
                <meta
                    name="description"
                    content="Ideas page using react helmet very easy to implement "
                />
            </Helmet>
        </HelmetProvider>
    )
}

export default memo(_Helmet);