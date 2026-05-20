import { memo } from 'react';

import Badge from '../../atoms/Badge/Badge';

import { TEXTS } from '../../../constants';

import { cx } from '../../../Utils';

import styles from './ShelfCard.module.css';

interface IShelfCardProps {
  productId: number;
  productTitle: string;
  authorName: string;
  statusId: number;
  fileUrl?: string;
  fileSrc?: string;
  coverGradient?: string;
  className?: string;
}

function ShelfCard({
  productTitle,
  authorName,
  statusId,
  fileUrl,
  fileSrc,
  coverGradient,
  className,
}: IShelfCardProps) {
  const coverStyle = fileUrl ? undefined : { background: coverGradient };

  return (
    <article className={cx(styles.card, className)}>
      <div className={styles.cover} style={coverStyle}>
        {fileUrl ? (
          <img src={fileUrl} alt={fileSrc ?? productTitle} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : null}
        <div className={styles.cover__inner}>
          <div className={styles.cover__title}>{productTitle}</div>
        </div>
      </div>

      <div className={styles.body}>
        <p className={styles.author}>{authorName}</p>
        <div className={`flex-between ${styles.footer}`}>
          <Badge statusId={statusId} badgeStyle="light" />
          <button
            className={styles['remove-btn']}
            disabled
            title={TEXTS.COMMON_COMING_SOON}
            aria-label={TEXTS.COMMON_COMING_SOON}
          >
            {TEXTS.PROFILE_REMOVE}
          </button>
        </div>
      </div>
    </article>
  );
}

export default memo(ShelfCard);
