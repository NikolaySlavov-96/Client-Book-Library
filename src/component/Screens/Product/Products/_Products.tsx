import { memo, useCallback, useEffect, useState } from 'react';

import FilterPills from '../../../../component/molecules/FilterPills/FilterPills';
import BookGrid from '../../../../component/organisms/BookGrid/BookGrid';
import { Pagination, LayoutIcon } from '../../../molecules';

import { useStoreZ } from '../../../../hooks';
import { TEXTS, STORAGE_KEYS } from '../../../../constants';
import { getDataFromStorage } from '../../../../Helpers/_Storage';
import { TViewType } from '~/Types/Components';

import styles from './_Products.module.css';

// statusId 0 / 'all' is the synthetic "All" filter; the rest come from the API
const ALL_FILTER = 'all';

const getInitialLayout = (): TViewType => {
  const stored = getDataFromStorage(STORAGE_KEYS.VIEW_TYPE);
  return stored === 'list' || stored === 'grid' ? stored : 'grid';
};

const _Products = () => {
  const [page, setPage] = useState(1);
  const [searchContent, setSearchContent] = useState('');
  const [activeFilter, setActiveFilter] = useState(ALL_FILTER);
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
    productStates,
    fetchAllProductStates,
  } = useStoreZ();

  const count = Math.ceil(products.count / pageLimit) || 0;

  // The status filters are data: the list comes from the API, not the client
  useEffect(() => {
    fetchAllProductStates();
  }, [fetchAllProductStates]);

  // "All" is always present; the rest are whatever the API returns.
  // Guests cannot filter by shelf status, so only "All" is shown for them.
  const filterOptions = isAuthenticated
    ? [
      { value: ALL_FILTER, label: TEXTS.CATALOG_FILTER_ALL },
      ...productStates.map((s) => ({ value: String(s.id), label: s.stateName })),
    ]
    : [{ value: ALL_FILTER, label: TEXTS.CATALOG_FILTER_ALL }];

  const statusId = isAuthenticated && activeFilter !== ALL_FILTER ? Number(activeFilter) : null;

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

  const handleStatusChange = useCallback((productId: number, statusId: number) => {
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
