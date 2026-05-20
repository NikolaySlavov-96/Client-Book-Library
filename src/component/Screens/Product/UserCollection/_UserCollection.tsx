import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Avatar from '../../../../component/atoms/Avatar/Avatar';
import Button from '../../../../component/atoms/Button/Button';
import ShelfTabs from '../../../../component/molecules/ShelfTabs/ShelfTabs';
import ProgressBar from '../../../../component/molecules/ProgressBar/ProgressBar';
import ShelfGrid from '../../../../component/organisms/ShelfGrid/ShelfGrid';

import { useStoreZ } from '../../../../hooks';
import { ROUT_NAMES, TEXTS } from '../../../../constants';
import { type ITexts } from '../../../../constants/texts';
import { EStatusId } from '../../../../constants/statusMap';
import { IProductWithState } from '../../../../Store/Slicers/ProductSlicer.interface';

import styles from './_UserCollection.module.css';

const YEAR_GOAL = 12;

type TTabValue = 'all' | 'read' | 'reading' | 'want' | 'listening' | 'listened';

interface ITabConfig {
  readonly value: TTabValue;
  readonly labelKey: keyof ITexts;
  readonly statusId: number;
}

const SHELF_TABS_CONFIG: readonly ITabConfig[] = [
  { value: 'all', labelKey: 'SHELF_TAB_ALL', statusId: 0 },
  { value: 'read', labelKey: 'SHELF_TAB_READ', statusId: EStatusId.READ },
  { value: 'reading', labelKey: 'SHELF_TAB_READING', statusId: EStatusId.READING },
  { value: 'want', labelKey: 'SHELF_TAB_WANT', statusId: EStatusId.WANT },
  { value: 'listening', labelKey: 'SHELF_TAB_LISTENING', statusId: EStatusId.LISTENING },
  { value: 'listened', labelKey: 'SHELF_TAB_LISTENED', statusId: EStatusId.LISTENED },
];

const isTabValue = (v: string): v is TTabValue => SHELF_TABS_CONFIG.some((t) => t.value === v);

const _UserCollection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TTabValue>('all');
  const [friendEmail, setFriendEmail] = useState('');

  const {
    email,
    productCollection,
    fetchProductCollection,
    pageLimit,
    isLoadingProductCollection,
  } = useStoreZ();

  const initials = email ? email.slice(0, 2).toUpperCase() : '';
  const username = email ? email.split('@')[0] : TEXTS.NAV_GUEST;

  useEffect(() => {
    fetchProductCollection({ page: 1, limit: 999, type: 0, searchContent: '' });
  }, [fetchProductCollection]);

  const allBooks: IProductWithState[] = useMemo(
    () => productCollection.rows,
    [productCollection.rows]
  );

  const filteredBooks = useMemo(() => {
    if (activeTab === 'all') return allBooks;
    const tab = SHELF_TABS_CONFIG.find((t) => t.value === activeTab);
    if (!tab || tab.statusId === 0) return allBooks;
    return allBooks.filter((b) => b.productStateId === tab.statusId);
  }, [allBooks, activeTab]);

  const tabsWithCount = useMemo(
    () =>
      SHELF_TABS_CONFIG.map((t) => ({
        value: t.value,
        label: TEXTS[t.labelKey],
        count:
          t.statusId === 0
            ? allBooks.length
            : allBooks.filter((b) => b.productStateId === t.statusId).length,
      })),
    [allBooks]
  );

  const readCount = allBooks.filter((b) => b.productStateId === EStatusId.READ).length;
  const readingCount = allBooks.filter((b) => b.productStateId === EStatusId.READING).length;
  const listenedCount = allBooks.filter((b) => b.productStateId === EStatusId.LISTENED).length;

  const handleFriendView = useCallback(() => {
    if (friendEmail.trim()) {
      navigate(`${ROUT_NAMES.REVIEW_PRODUCTS_BY_EMAIL.replace(':email', '')}${encodeURIComponent(friendEmail.trim())}`);
    }
  }, [friendEmail, navigate]);

  return (
    <main className={styles.wrap}>
        <header className={styles.header}>
          <Avatar initials={initials} size="lg" />
          <div className={styles.header__info}>
            <h1 className={styles.header__name}>{username}</h1>
            <p className={styles.header__email}>{email}</p>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.stat__n}>{allBooks.length}</span>
                <span className={styles.stat__l}>{TEXTS.PROFILE_STAT_TOTAL}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.stat__n}>{readCount}</span>
                <span className={styles.stat__l}>{TEXTS.PROFILE_STAT_READ}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.stat__n}>{readingCount}</span>
                <span className={styles.stat__l}>{TEXTS.PROFILE_STAT_READING}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.stat__n}>{listenedCount}</span>
                <span className={styles.stat__l}>{TEXTS.PROFILE_STAT_LISTENED}</span>
              </div>
            </div>
          </div>
          <div className={styles.header__actions}>
            <Button
              label={TEXTS.PROFILE_SETTINGS}
              variant="outline"
              size="sm"
              isDisabled
              title={TEXTS.COMMON_COMING_SOON}
              ariaLabel={`${TEXTS.PROFILE_SETTINGS} — ${TEXTS.COMMON_COMING_SOON}`}
            />
          </div>
        </header>

        <ProgressBar
          current={readCount}
          goal={YEAR_GOAL}
          label={TEXTS.PROFILE_GOAL_LABEL}
        />

        <div className={`flex-align ${styles.friendBar}`}>
          <label className={styles.friendBar__label} htmlFor="friend-email">
            {TEXTS.PROFILE_FRIEND_LABEL}
          </label>
          <input
            id="friend-email"
            className={styles.friendBar__input}
            type="email"
            placeholder={TEXTS.PROFILE_FRIEND_PLACEHOLDER}
            value={friendEmail}
            onChange={(e) => setFriendEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' ? handleFriendView() : undefined}
          />
          <button className={styles.friendBar__btn} onClick={handleFriendView} type="button">
            {TEXTS.PROFILE_FRIEND_BTN}
          </button>
        </div>

        <ShelfTabs
          tabs={tabsWithCount}
          activeValue={activeTab}
          onSelect={(v) => { if (isTabValue(v)) setActiveTab(v); }}
        />

        {isLoadingProductCollection ? (
          <div className={styles.loading}>{TEXTS.COMMON_LOADING}</div>
        ) : (
          <ShelfGrid books={filteredBooks} />
        )}
      </main>
  );
};

export default memo(_UserCollection);
