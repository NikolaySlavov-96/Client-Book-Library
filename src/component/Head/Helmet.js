import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useHeadContext } from '../../contexts/HeadContext';
import { useEffect } from 'react';

export const MetaData = () => {
    const locate = useLocation();
    const { title, setTitle } = useHeadContext();

    const path = locate.pathname.split('/');
    const pathLength = path.length;

    if (pathLength === 3) {
        setTitle(path[2]);
        
    } else if (pathLength === 2) {
        setTitle(path[1]);
    }

    useEffect(() => {
        const firstLetter = title[0].toUpperCase();
        const allTitle = title.replace(title[0], firstLetter)
        setTitle(allTitle)
    }, [path])


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