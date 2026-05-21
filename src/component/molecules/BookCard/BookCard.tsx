import { memo, useCallback, type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { cx } from '../../../Utils';

import { useStatuses } from '../../../hooks';
import { ROUT_NAMES, TEXTS, getCoverGradient } from '../../../constants';

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
  onStatusChange?: (productId: number, statusId: number) => void;
  className?: string;
}

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
  const { statuses } = useStatuses();

  const handleCardClick = useCallback(() => {
    navigate(`${ROUT_NAMES.PRODUCT}/${productId}`);
  }, [navigate, productId]);

  const handleStatusClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>, sid: number) => {
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
      </div>

      <div className={cx(styles.meta, layout === 'list' ? 'flex-col' : '')}>
        <p className={styles.meta__author}>{authorName}</p>
        {isAuthenticated ? (
          <div className={styles.meta__actions}>
            {statuses.map((s) => (
              <button
                key={s.id}
                className={cx(styles['act-btn'], statusId === s.id ? styles['act-btn--active'] : '')}
                onClick={(e) => handleStatusClick(e, s.id)}
                aria-label={`${TEXTS.DETAIL_ADD_TO_SHELF}: ${s.stateName}`}
                aria-pressed={statusId === s.id}
              >
                {s.symbol ? `${s.symbol} ${s.stateName}` : s.stateName}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default memo(BookCard);
