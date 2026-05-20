import { memo, useCallback, useEffect, useState } from 'react';

import FilterPills from '../../../../component/molecules/FilterPills/FilterPills';
import BookGrid from '../../../../component/organisms/BookGrid/BookGrid';
import { Pagination } from '../../../molecules';

import { useStoreZ } from '../../../../hooks';
import { TEXTS } from '../../../../constants';
import { EStatusId } from '../../../../constants/statusMap';

import styles from './_Products.module.css';

const FILTER_OPTIONS = [
  { value: 'all', label: TEXTS.CATALOG_FILTER_ALL },
  { value: 'read', label: TEXTS.CATALOG_FILTER_READ },
  { value: 'reading', label: TEXTS.CATALOG_FILTER_READING },
  { value: 'want', label: TEXTS.CATALOG_FILTER_WANT },
  { value: 'listening', label: TEXTS.CATALOG_FILTER_LISTENING },
  { value: 'listened', label: TEXTS.CATALOG_FILTER_LISTENED },
];

const _Products = () => {
  const [page, setPage] = useState(1);
  const [searchContent, setSearchContent] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const {
    products,
    fetchProducts,
    pageLimit,
    isLoadingProducts,
    isAuthenticated,
    addingProductState,
  } = useStoreZ();

  const count = Math.ceil(products.count / pageLimit) || 0;

  useEffect(() => {
    fetchProducts({ page, limit: pageLimit, searchContent });
  }, [fetchProducts, page, pageLimit, searchContent]);

  const handleFilterChange = useCallback((value: string) => {
    setActiveFilter(value);
    setPage(1);
  }, []);

  const handleSearch = useCallback((value: string) => {
    setSearchContent(value);
    setPage(1);
  }, []);

  const handleStatusChange = useCallback((productId: number, statusId: EStatusId) => {
    addingProductState(String(productId), String(statusId));
  }, [addingProductState]);

  return (
    <section className={styles.wrap}>
        <header className={styles.header}>
          <h1 className={styles.header__title}>{TEXTS.CATALOG_TITLE}</h1>
          <p className={styles.header__sub}>{TEXTS.CATALOG_SUBTITLE}</p>
        </header>

        <div className={`flex-align ${styles.searchRow}`}>
          <div className={styles.searchBox}>
            <span className={styles.searchBox__icon} aria-hidden="true">⌕</span>
            <input
              className={styles.searchBox__input}
              type="text"
              placeholder={TEXTS.CATALOG_SEARCH_PLACEHOLDER}
              value={searchContent}
              onChange={(e) => handleSearch(e.target.value)}
              aria-label={TEXTS.CATALOG_SEARCH_PLACEHOLDER}
            />
          </div>
        </div>

        <FilterPills
          options={FILTER_OPTIONS}
          activeValue={activeFilter}
          onSelect={handleFilterChange}
          className={styles.filters}
        />

        {isLoadingProducts ? (
          <div className={styles.loading} aria-live="polite">{TEXTS.COMMON_LOADING}</div>
        ) : (
          <BookGrid
            books={products.rows}
            isAuthenticated={isAuthenticated}
            layout="grid"
            onStatusChange={handleStatusChange}
          />
        )}

        <Pagination count={count} page={page} onSubmit={setPage} />
    </section>
  );
};

export default memo(_Products);
