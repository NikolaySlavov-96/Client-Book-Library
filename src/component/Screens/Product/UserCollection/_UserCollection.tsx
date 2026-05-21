import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Avatar from '../../../../component/atoms/Avatar/Avatar';
import Button from '../../../../component/atoms/Button/Button';
import ShelfTabs from '../../../../component/molecules/ShelfTabs/ShelfTabs';
import ProgressBar from '../../../../component/molecules/ProgressBar/ProgressBar';
import ShelfGrid from '../../../../component/organisms/ShelfGrid/ShelfGrid';
import { Pagination } from '../../../molecules';

import { useStoreZ } from '../../../../hooks';
import { ROUT_NAMES, TEXTS } from '../../../../constants';
import { type ITexts } from '../../../../constants/texts';
import { EStatusId } from '../../../../constants/statusMap';

import styles from './_UserCollection.module.css';

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

const DEFAULT_GOAL = 12;

const _UserCollection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TTabValue>('all');
  const [page, setPage] = useState(1);
  const [friendEmail, setFriendEmail] = useState('');
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [goalDraft, setGoalDraft] = useState('');

  const {
    email,
    productCollection,
    fetchProductCollection,
    removeProductState,
    statusCounts,
    fetchStatusCounts,
    profile,
    fetchProfile,
    updateReadingGoal,
    pageLimit,
    isLoadingProductCollection,
  } = useStoreZ();

  const initials = (profile?.displayName || email) ? (profile?.displayName ?? email).slice(0, 2).toUpperCase() : '';
  const username = profile?.displayName || (email ? email.split('@')[0] : TEXTS.NAV_GUEST);
  const readingGoal = profile?.readingGoal ?? DEFAULT_GOAL;

  const activeStatusId = useMemo(
    () => SHELF_TABS_CONFIG.find((t) => t.value === activeTab)?.statusId ?? 0,
    [activeTab]
  );

  // Server-side: re-fetch the current page whenever the tab or page changes
  useEffect(() => {
    fetchProductCollection({ page, limit: pageLimit, type: activeStatusId, searchContent: '' });
  }, [fetchProductCollection, page, pageLimit, activeStatusId]);

  // Accurate per-tab counts come from a lightweight aggregate endpoint
  useEffect(() => {
    fetchStatusCounts();
  }, [fetchStatusCounts]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleStartEditGoal = useCallback(() => {
    setGoalDraft(String(readingGoal));
    setIsEditingGoal(true);
  }, [readingGoal]);

  const handleSaveGoal = useCallback(async () => {
    const next = parseInt(goalDraft, 10);
    if (Number.isFinite(next) && next >= 1 && next <= 999) {
      await updateReadingGoal(next);
    }
    setIsEditingGoal(false);
  }, [goalDraft, updateReadingGoal]);

  const countFor = useCallback(
    (statusId: number) => statusCounts.find((c) => c.statusId === statusId)?.count ?? 0,
    [statusCounts]
  );
  const totalCount = useMemo(
    () => statusCounts.reduce((sum, c) => sum + c.count, 0),
    [statusCounts]
  );

  const tabsWithCount = useMemo(
    () =>
      SHELF_TABS_CONFIG.map((t) => ({
        value: t.value,
        label: TEXTS[t.labelKey],
        count: t.statusId === 0 ? totalCount : countFor(t.statusId),
      })),
    [totalCount, countFor]
  );

  const readCount = countFor(EStatusId.READ);
  const readingCount = countFor(EStatusId.READING);
  const listenedCount = countFor(EStatusId.LISTENED);

  const pageCount = Math.ceil(productCollection.count / pageLimit) || 0;

  const handleTabSelect = useCallback((v: string) => {
    if (isTabValue(v)) {
      setActiveTab(v);
      setPage(1);
    }
  }, []);

  const handleFriendView = useCallback(() => {
    if (friendEmail.trim()) {
      navigate(`${ROUT_NAMES.REVIEW_PRODUCTS_BY_EMAIL.replace(':email', '')}${encodeURIComponent(friendEmail.trim())}`);
    }
  }, [friendEmail, navigate]);

  return (
    <main className={styles.wrap}>
        <header className={styles.header}>
          <Avatar initials={initials} src={profile?.avatarUrl ?? undefined} size="lg" />
          <div className={styles.header__info}>
            <h1 className={styles.header__name}>{username}</h1>
            <p className={styles.header__email}>{email}</p>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.stat__n}>{totalCount}</span>
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
              onClick={() => navigate(ROUT_NAMES.SETTINGS)}
              ariaLabel={TEXTS.PROFILE_SETTINGS}
            />
          </div>
        </header>

        <div className={`flex-align ${styles.goalRow}`}>
          <ProgressBar
            current={readCount}
            goal={readingGoal}
            label={TEXTS.PROFILE_GOAL_LABEL}
          />
          {isEditingGoal ? (
            <div className="flex-align">
              <label className={styles.srOnly} htmlFor="reading-goal">
                {TEXTS.PROFILE_GOAL_INPUT_LABEL}
              </label>
              <input
                id="reading-goal"
                className={styles.goalInput}
                type="number"
                min={1}
                max={999}
                value={goalDraft}
                onChange={(e) => setGoalDraft(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' ? handleSaveGoal() : undefined}
                autoFocus
              />
              <button className={styles.goalBtn} type="button" onClick={handleSaveGoal}>
                {TEXTS.PROFILE_GOAL_SAVE}
              </button>
              <button className={styles.goalBtn} type="button" onClick={() => setIsEditingGoal(false)}>
                {TEXTS.PROFILE_GOAL_CANCEL}
              </button>
            </div>
          ) : (
            <button
              className={styles.goalBtn}
              type="button"
              onClick={handleStartEditGoal}
              aria-label={TEXTS.PROFILE_GOAL_EDIT}
            >
              {TEXTS.PROFILE_GOAL_EDIT}
            </button>
          )}
        </div>

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
          onSelect={handleTabSelect}
        />

        {isLoadingProductCollection ? (
          <div className={styles.loading}>{TEXTS.COMMON_LOADING}</div>
        ) : (
          <>
            <ShelfGrid books={productCollection.rows} onRemove={removeProductState} />
            <Pagination count={pageCount} page={page} onSubmit={setPage} />
          </>
        )}
      </main>
  );
};

export default memo(_UserCollection);
