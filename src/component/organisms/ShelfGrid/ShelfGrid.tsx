import { memo } from 'react';

import ShelfCard from '../../molecules/ShelfCard/ShelfCard';

import { TEXTS } from '../../../constants';
import { IProductWithState, IProductEmailType } from '../../../Store/Slicers/ProductSlicer.interface';

import { cx } from '../../../Utils';

import styles from './ShelfGrid.module.css';

type TShelfBook = IProductWithState | IProductEmailType;

const COVER_GRADIENTS: readonly string[] = [
  'linear-gradient(145deg, #5c4b8a, #3d3366)',
  'linear-gradient(145deg, #8b5e3c, #6b4528)',
  'linear-gradient(145deg, #2d6a4f, #1b4332)',
  'linear-gradient(145deg, #374151, #1f2937)',
  'linear-gradient(145deg, #1e6091, #0d3b6e)',
  'linear-gradient(145deg, #7c3d3d, #5a2020)',
  'linear-gradient(145deg, #8b1a1a, #6b1212)',
  'linear-gradient(145deg, #4a5568, #2d3748)',
  'linear-gradient(145deg, #6b4226, #4a2c18)',
  'linear-gradient(145deg, #1a365d, #0f2340)',
];

function getStatusId(book: TShelfBook): number {
  if ('productStateId' in book) return book.productStateId;
  if ('stateId' in book) return book.stateId;
  return 0;
}

interface IShelfGridProps {
  books: TShelfBook[];
  className?: string;
}

function ShelfGrid({ books, className }: IShelfGridProps) {
  if (books.length === 0) {
    return <p className={styles.empty}>{TEXTS.PROFILE_EMPTY_SHELF}</p>;
  }

  return (
    <div className={cx(styles.container, className)}>
      {books.map((book) => (
        <ShelfCard
          key={book.productId}
          productId={book.productId}
          productTitle={book.productTitle}
          authorName={book.authorName}
          statusId={getStatusId(book)}
          fileUrl={book.fileUrl}
          fileSrc={book.fileSrc}
          coverGradient={COVER_GRADIENTS[book.productId % COVER_GRADIENTS.length]}
        />
      ))}
    </div>
  );
}

export default memo(ShelfGrid);
