import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUT_NAMES, TEXTS, MODAL_NAMES } from '../../../constants';
import { useStoreZ } from '../../../hooks';
import { IProduct, IProductEmailType, IProductWithState } from '../../../Store/Slicers/ProductSlicer.interface';

import styles from './SearchModal.module.css';

type TSearchScope = 'catalog' | 'shelf' | 'friend';
type TAnyBook = IProduct | IProductWithState | IProductEmailType;

export interface ISearchModalPayload {
  scope?: TSearchScope;
}

const COVER_GRADIENTS: readonly [string, string][] = [
  ['#e8d5b7', '#c9a96e'],
  ['#b8d4c8', '#7aaa95'],
  ['#d4b8c8', '#a47a95'],
  ['#b8c4d4', '#7a8faa'],
  ['#d4c8b8', '#aa9570'],
  ['#c8d4b8', '#90aa70'],
  ['#d4b8b8', '#aa7070'],
  ['#b8d4d4', '#70aaaa'],
  ['#c8b8d4', '#9070aa'],
  ['#d4d4b8', '#aaaa70'],
];

function SearchModal() {
  const navigate = useNavigate();
  const {
    modalName,
    isVisible,
    modalPayload,
    closeModal,
    products,
    productCollection,
    productByEmail,
  } = useStoreZ();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const isOpen = isVisible && modalName === MODAL_NAMES.SEARCH;
  const scope: TSearchScope = (modalPayload as ISearchModalPayload | undefined)?.scope ?? 'catalog';

  const source: TAnyBook[] = useMemo(() => {
    switch (scope) {
      case 'shelf': return productCollection.rows;
      case 'friend': return productByEmail.rows;
      case 'catalog':
      default: return products.rows;
    }
  }, [scope, products.rows, productCollection.rows, productByEmail.rows]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, closeModal]);

  const handleSelect = useCallback((book: TAnyBook) => {
    navigate(`${ROUT_NAMES.PRODUCT}/${book.productId}`);
    closeModal();
  }, [navigate, closeModal]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();
  const filtered = trimmed
    ? source.filter(
        (b) =>
          b.productTitle.toLowerCase().includes(trimmed) ||
          b.authorName.toLowerCase().includes(trimmed),
      )
    : source.slice(0, 6);

  const sectionLabel = trimmed ? TEXTS.SEARCH_RESULTS_LABEL : TEXTS.SEARCH_SUGGESTED_LABEL;

  return (
    <div
      className={`flex-col ${styles.overlay}`}
      role="dialog"
      aria-modal="true"
      aria-label={TEXTS.COMMON_SEARCH_LABEL}
      onClick={closeModal}
    >
      <div className={styles.box} onClick={(e) => e.stopPropagation()}>
        <div className={styles.searchRow}>
          <span className={styles.searchIcon} aria-hidden="true">⌕</span>
          <input
            ref={inputRef}
            className={styles.input}
            type="text"
            placeholder={TEXTS.SEARCH_PLACEHOLDER}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label={TEXTS.SEARCH_PLACEHOLDER}
          />
          <button className={styles.closeBtn} onClick={closeModal} type="button">
            {TEXTS.SEARCH_CLOSE}
          </button>
        </div>

        <div className={styles.results} role="listbox">
          {filtered.length > 0 ? (
            <>
              <div className={styles.sectionLabel}>{sectionLabel}</div>
              {filtered.map((book) => {
                const [from, to] = COVER_GRADIENTS[book.productId % COVER_GRADIENTS.length];
                return (
                  <button
                    key={book.productId}
                    className={styles.resultItem}
                    role="option"
                    aria-selected={false}
                    onClick={() => handleSelect(book)}
                    type="button"
                  >
                    <span
                      className={styles.bookDot}
                      style={{ background: `linear-gradient(145deg, ${from}, ${to})` }}
                      aria-hidden="true"
                    />
                    <span className={`flex-col ${styles.bookInfo}`}>
                      <span className={styles.bookTitle}>{book.productTitle}</span>
                      <span className={styles.bookAuthor}>{book.authorName}</span>
                    </span>
                    <span className={styles.addLabel}>{TEXTS.SEARCH_ADD}</span>
                  </button>
                );
              })}
            </>
          ) : (
            <p className={styles.empty}>{TEXTS.SEARCH_EMPTY}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(SearchModal);
