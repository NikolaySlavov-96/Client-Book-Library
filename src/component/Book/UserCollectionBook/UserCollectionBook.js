import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useService } from "../../../hooks/useService";
import { bookServiceFactory } from "../../../services/book";
import { BodyCard } from "../BodyCard/BodyCard";

import style from './UserCollectionBook.module.css';
import { useCollectionContext } from "../../../contexts/CollectionContext";


export const UserCollectionBook = () => {

    // const { setType } = useCollectionContext({});
    // const { id } = useParams();

    useEffect(() => {
        // setType('forpurchase');
    }, []);
    // }, [id]);

    return (
        <section className={style["body__card"]}>
            {/* <h1>Catalog with {id} Books</h1> */}
            <h1>Collection of Books</h1>
            {/* <BodyCard /> */}
        </section>
    );
}