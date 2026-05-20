import { cx } from '../../../Utils';

import styles from './Avatar.module.css';

type TAvatarSize = 'sm' | 'lg';

interface IAvatarProps {
  initials: string;
  size?: TAvatarSize;
  className?: string;
}

function Avatar({ initials, size = 'sm', className }: IAvatarProps) {
  return (
    <div
      className={cx('flex-center', styles.avatar, styles[`avatar--${size}`], className)}
      aria-label={initials}
      role="img"
    >
      {initials}
    </div>
  );
}

export default Avatar;
