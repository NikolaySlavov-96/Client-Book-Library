import { memo, useCallback, useEffect, useState } from 'react';

import FilterPills from '../../../../component/molecules/FilterPills/FilterPills';
import BookGrid from '../../../../component/organisms/BookGrid/BookGrid';
import { Pagination, LayoutIcon } from '../../../molecules';

import { useStoreZ } from '../../../../hooks';
import { TEXTS, STORAGE_KEYS } from '../../../../constants';
import { EStatusId } from '../../../../constants/statusMap';
import { getDataFromStorage } from '../../../../Helpers/_Storage';
import { TViewType } from '~/Types/Components';

import styles from './_Products.module.css';

const getInitialLayout = (): TViewType => {
  const stored = getDataFromStorage(STORAGE_KEYS.VIEW_TYPE);
  return stored === 'list' || stored === 'grid' ? stored : 'grid';
};

const FILTER_OPTIONS = [
  { value: 'all', label: TEXTS.CATALOG_FILTER_ALL },
  { value: 'read', label: TEXTS.CATALOG_FILTER_READ },
  { value: 'reading', label: TEXTS.CATALOG_FILTER_READING },
  { value: 'want', label: TEXTS.CATALOG_FILTER_WANT },
  { value: 'listening', label: TEXTS.CATALOG_FILTER_LISTENING },
  { value: 'listened', label: TEXTS.CATALOG_FILTER_LISTENED },
];

const FILTER_TO_STATUS: Record<string, EStatusId | null> = {
  all: null,
  read: EStatusId.READ,
  reading: EStatusId.READING,
  want: EStatusId.WANT,
  listening: EStatusId.LISTENING,
  listened: EStatusId.LISTENED,
};

const _Products = () => {
  const [page, setPage] = useState(1);
  const [searchContent, setSearchContent] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [layout, setLayout] = useState<TViewType>(getInitialLayout);

  const handleLayoutChange = useCallback((next: TViewType) => {
    setLayout(next);
    localStorage.setItem(STORAGE_KEYS.VIEW_TYPE, JSON.stringify(next));
  }, []);

  const {
    products,
    fetchProducts,
    pageLimit,
    isLoadingProducts,
    isAuthenticated,
    addingProductState,
  } = useStoreZ();

  const count = Math.ceil(products.count / pageLimit) || 0;

  // Guests cannot filter by shelf status, so the status pills are hidden for them
  const filterOptions = isAuthenticated ? FILTER_OPTIONS : [FILTER_OPTIONS[0]];
  const statusId = isAuthenticated ? FILTER_TO_STATUS[activeFilter] : null;

  useEffect(() => {
    fetchProducts({ page, limit: pageLimit, searchContent, statusId });
  }, [fetchProducts, page, pageLimit, searchContent, statusId]);

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
          <LayoutIcon typeView={layout} onChange={handleLayoutChange} />
        </div>

        <FilterPills
          options={filterOptions}
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
            layout={layout}
            onStatusChange={handleStatusChange}
          />
        )}

        <Pagination count={count} page={page} onSubmit={setPage} />
    </section>
  );
};

export default memo(_Products);
