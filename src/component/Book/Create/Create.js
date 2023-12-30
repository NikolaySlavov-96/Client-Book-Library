import { useBookContext } from '../../../contexts/BookContext';
import { useForm } from '../../../hooks/useForm';
import style from './Create.module.css';

export const Create = () => {

    const { onSubmitCreateProduct, error } = useBookContext();

    const { values, changeHandler, onSubmit, errors } = useForm({
        author: '',
        booktitle: '',
        image: '',
        genge: '',
    }, onSubmitCreateProduct, {
        author: ['required', '5'],
        booktitle: ['required', '5'],
        // image: ['required', '5'],
        // genge: ['required', '5'],
    });

    return (
        <section className={style["create__section"]}>
            <h1>Create product for salle</h1>
            {!!error.length && (<div className='error_serv'>
                {error}
            </div>
            )}
            <div className={`${style["form__container"]} shadow`}>
                <form onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="articul">Author Name:</label>
                        <input type="text" name="author" id="author" placeholder="Name author" value={values.author} onChange={changeHandler} onBlur={changeHandler} />
                        {errors.author && (<p className='error'>{errors.author}</p>)}
                    </div >

                    <div>
                        <label htmlFor="image">Img of Book:</label>
                        <input type="text" name="image" id="image" placeholder="http://imgaddres" value={values.image} onChange={changeHandler} onBlur={changeHandler} />
                        {errors.image && (<p className='error'>{errors.image}</p>)}
                    </div >
                    <div>
                        <label htmlFor="mark">Booktitle:</label>
                        <input type="text" name="booktitle" id="booktitle" placeholder="Book Name" value={values.booktitle} onChange={changeHandler} onBlur={changeHandler} />
                        {errors.booktitle && (<p className='error'>{errors.booktitle}</p>)}
                    </div >
                    <div>
                        <label htmlFor="model">Genge of Book:</label>
                        <input type="text" name="genge" id="genge" placeholder="Genge of Book" value={values.genge} onChange={changeHandler} onBlur={changeHandler} />
                        {errors.genge && (<p className='error'>{errors.genge}</p>)}
                    </div >

                    <button className="btn">Create new Book</button >
                </form >
            </div >
        </section >
    );
}