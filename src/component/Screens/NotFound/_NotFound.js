import { memo } from 'react';
import { SectionTitle } from '../../atoms';


const _NotFound = () => {

    return (
        <section className={`section`}>

            <SectionTitle content='Page not found' />

            {/* <div className={`global__bg-radius form__container`}> */}
            {/* </div > */}
        </section >
    );
}

export default memo(_NotFound);