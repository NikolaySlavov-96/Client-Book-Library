import { memo, useCallback, type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import Badge from '../../atoms/Badge/Badge';
import Button from '../../atoms/Button/Button';

import { ROUT_NAMES, TEXTS } from '../../../constants';
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

const COVER_GRADIENTS = [
  ['#5c4b8a', '#3d3366'],
  ['#8b5e3c', '#6b4528'],
  ['#2d6a4f', '#1b4332'],
  ['#374151', '#1f2937'],
  ['#1e6091', '#0d3b6e'],
  ['#7c3d3d', '#5a2020'],
  ['#8b1a1a', '#6b1212'],
  ['#b8860b', '#8b6508'],
  ['#1a3a5c', '#0d2040'],
  ['#4a2c6e', '#2d1a47'],
];

const getCoverGradient = (productId: number): string => {
  const [c1, c2] = COVER_GRADIENTS[productId % COVER_GRADIENTS.length];
  return `linear-gradient(145deg, ${c1}, ${c2})`;
};

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

  const cardClass = [
    styles.card,
    layout === 'list' ? styles['card--list'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

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

      <div className={[styles.meta, layout === 'list' ? 'flex-col' : ''].filter(Boolean).join(' ')}>
        <p className={styles.meta__author}>{authorName}</p>
        {isAuthenticated ? (
          <div className={styles.meta__actions}>
            {QUICK_STATUS_IDS.map((sid) => {
              const meta = STATUS_META[sid];
              return (
                <button
                  key={sid}
                  className={[
                    styles['act-btn'],
                    statusId === sid ? styles['act-btn--active'] : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
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
