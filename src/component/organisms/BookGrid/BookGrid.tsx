import { memo } from 'react';

import BookCard from '../../molecules/BookCard/BookCard';

import { cx } from '../../../Utils';

import { TEXTS } from '../../../constants';
import { EStatusId } from '../../../constants/statusMap';
import { IProduct } from '../../../Store/Slicers/ProductSlicer.interface';

import styles from './BookGrid.module.css';

type TBookGridLayout = 'grid' | 'list';

interface IBookGridProps {
  books: IProduct[];
  isAuthenticated?: boolean;
  layout?: TBookGridLayout;
  onStatusChange?: (productId: number, statusId: EStatusId) => void;
  className?: string;
}

function BookGrid({ books, isAuthenticated = false, layout = 'grid', onStatusChange, className }: IBookGridProps) {
  if (books.length === 0) {
    return <p className={styles.empty}>{TEXTS.CATALOG_EMPTY}</p>;
  }

  return (
    <div
      className={cx(styles.container, layout === 'list' ? `flex-col ${styles['container--list']}` : styles['container--grid'], className)}
    >
      {books.map((book) => (
        <BookCard
          key={book.productId}
          productId={book.productId}
          productTitle={book.productTitle}
          authorName={book.authorName}
          productType={book.productType}
          fileUrl={book.fileUrl}
          fileSrc={book.fileSrc}
          layout={layout}
          isAuthenticated={isAuthenticated}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}

export default memo(BookGrid);
