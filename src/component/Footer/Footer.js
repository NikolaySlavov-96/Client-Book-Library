import { Link } from 'react-router-dom';
import style from './Footer.module.css';

export const Footer = () => {
    return (
        <footer className='global__bg-radius'>
            <div className={`'shadow' ${style['div']}`}>
                <p>Designed and Implement from <Link to='https://slavo-v.dev'>Slavo-v</Link></p>
            </div>
        </footer>
    );
}