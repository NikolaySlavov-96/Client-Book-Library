import { useBookContext } from "../../../contexts/BookContext";
import { BodyCard } from "../BodyCard/BodyCard";
import { CustomSelect } from "../../CustomSelect/CustomSelect";

import style from './UserCollectionBook.module.css';


export const UserCollectionBook = () => {

    const { setType, setLimit } = useBookContext();
    setType('')
    setLimit(12)

    const options = [
        {
            label: "Adding in For Purchase",
            value: "forpurchase",
        },
        {
            label: "Adding in Purchase",
            value: "purchase",
        },
        {
            label: "Adding in For Reading",
            value: "forreading",
        },
        {
            label: "Adding in Reading",
            value: "reading",
        },
        {
            label: "Adding in Listening",
            value: "listened",
        },
    ]

    const changeState = (e) => {
        const state = e.value
        setType(state)
    }

    return (
        <section className={style["body__card"]}>
            <h1 className={style['card__title']}>Collection of Books</h1>
            <div className={style['container__select']}>
                <CustomSelect
                    options={options}
                    placeHolder='Please select...'
                    onChange={(e) => changeState(e)}
                />
            </div>
            <BodyCard />
        </section>
    );
}