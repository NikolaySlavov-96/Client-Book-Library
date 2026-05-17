import { memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import NavBar from '../../../../component/molecules/NavBar/NavBar';
import ShelfGrid from '../../../../component/organisms/ShelfGrid/ShelfGrid';

import { useStoreZ } from '../../../../hooks';
import { TEXTS } from '../../../../constants';

import styles from './_SearchByEmail.module.css';

const _SearchByEmail = () => {
  const { email } = useParams<{ email: string }>();

  const { isLoadingProductByEmails, pageLimit, productByEmail, fetchProductsForEmail } = useStoreZ();

  useEffect(() => {
    if (email) {
      fetchProductsForEmail({ searchContent: email, limit: pageLimit, page: 1 });
    }
  }, [fetchProductsForEmail, email, pageLimit]);

  const displayEmail = decodeURIComponent(email ?? '');

  return (
    <>
      <NavBar />
      <main className={styles.wrap}>
        <header className={styles.header}>
          <h1 className={styles.header__title}>{TEXTS.SEARCH_EMAIL_TITLE}</h1>
          <p className={styles.header__email}>{displayEmail}</p>
        </header>

        {isLoadingProductByEmails ? (
          <div className={styles.loading}>{TEXTS.COMMON_LOADING}</div>
        ) : (
          <ShelfGrid books={productByEmail.rows} />
        )}
      </main>
    </>
  );
};

export default memo(_SearchByEmail);
