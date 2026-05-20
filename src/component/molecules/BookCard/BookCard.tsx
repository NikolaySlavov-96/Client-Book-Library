import { memo, useCallback, type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import Badge from '../../atoms/Badge/Badge';

import { cx } from '../../../Utils';

import { ROUT_NAMES, TEXTS, getCoverGradient } from '../../../constants';
import { EStatusId, STATUS_META, isValidStatusId } from '../../../constants/statusMap';

import styles from './BookCard.module.css';

type TBookCardLayout = 'grid' | 'list';

interface IBookCardProps {
  productId: number;
  productTitle: string;
  authorName: string;
  productType: string;
  fileUrl?: string;
  fileSrc?: string;
  statusId?: number;
  layout?: TBookCardLayout;
  isAuthenticated?: boolean;
  onStatusChange?: (productId: number, statusId: EStatusId) => void;
  className?: string;
}

const QUICK_STATUS_IDS: EStatusId[] = [EStatusId.WANT, EStatusId.READING, EStatusId.READ];

function BookCard({
  productId,
  productTitle,
  authorName,
  fileUrl,
  fileSrc,
  statusId,
  layout = 'grid',
  isAuthenticated = false,
  onStatusChange,
  className,
}: IBookCardProps) {
  const navigate = useNavigate();

  const handleCardClick = useCallback(() => {
    navigate(`${ROUT_NAMES.PRODUCT}/${productId}`);
  }, [navigate, productId]);

  const handleStatusClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>, sid: EStatusId) => {
      e.stopPropagation();
      onStatusChange?.(productId, sid);
    },
    [onStatusChange, productId]
  );

  const cardClass = cx(styles.card, layout === 'list' ? styles['card--list'] : '', className);

  const coverStyle = fileUrl ? undefined : { background: getCoverGradient(productId) };

  return (
    <article className={cardClass} onClick={handleCardClick} aria-label={productTitle}>
      <div className={styles.cover} style={coverStyle}>
        {fileUrl ? (
          <img className={styles.cover__img} src={fileUrl} alt={fileSrc ?? productTitle} />
        ) : null}
        <div className={styles.cover__gradient}>
          <span className={styles.cover__title}>{productTitle}</span>
        </div>
        {isValidStatusId(statusId ?? 0) ? (
          <div className={styles.cover__badge}>
            <Badge statusId={statusId!} badgeStyle="solid" />
          </div>
        ) : null}
      </div>

      <div className={cx(styles.meta, layout === 'list' ? 'flex-col' : '')}>
        <p className={styles.meta__author}>{authorName}</p>
        {isAuthenticated ? (
          <div className={styles.meta__actions}>
            {QUICK_STATUS_IDS.map((sid) => {
              const meta = STATUS_META[sid];
              return (
                <button
                  key={sid}
                  className={cx(styles['act-btn'], statusId === sid ? styles['act-btn--active'] : '')}
                  onClick={(e) => handleStatusClick(e, sid)}
                  aria-label={`${TEXTS.DETAIL_ADD_TO_SHELF}: ${meta.label}`}
                  aria-pressed={statusId === sid}
                >
                  {meta.label}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default memo(BookCard);
