import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ShelfGrid from '../../../../component/organisms/ShelfGrid/ShelfGrid';
import { Pagination } from '../../../molecules';

import { useStoreZ } from '../../../../hooks';
import { TEXTS } from '../../../../constants';

import styles from './_SearchByEmail.module.css';

const _SearchByEmail = () => {
  const { email } = useParams<{ email: string }>();
  const [page, setPage] = useState(1);

  const { isLoadingProductByEmails, pageLimit, productByEmail, fetchProductsForEmail } = useStoreZ();

  // Reset to the first page whenever the searched email changes
  useEffect(() => {
    setPage(1);
  }, [email]);

  useEffect(() => {
    if (email) {
      fetchProductsForEmail({ searchContent: email, limit: pageLimit, page });
    }
  }, [fetchProductsForEmail, email, pageLimit, page]);

  const displayEmail = decodeURIComponent(email ?? '');
  const pageCount = Math.ceil(productByEmail.count / pageLimit) || 0;

  return (
    <main className={styles.wrap}>
      <header className={styles.header}>
        <h1 className={styles.header__title}>{TEXTS.SEARCH_EMAIL_TITLE}</h1>
        <p className={styles.header__email}>{displayEmail}</p>
      </header>

      {isLoadingProductByEmails ? (
        <div className={styles.loading}>{TEXTS.COMMON_LOADING}</div>
      ) : (
        <>
          <ShelfGrid books={productByEmail.rows} />
          <Pagination count={pageCount} page={page} onSubmit={setPage} />
        </>
      )}
    </main>
  );
};

export default memo(_SearchByEmail);
