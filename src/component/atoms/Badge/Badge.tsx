import { isValidStatusId, EStatusId } from '../../../constants/statusMap';
import { BADGE_CONFIG } from './Badge.config';

import { cx } from '../../../Utils';

import styles from './Badge.module.css';

type TBadgeStyle = 'light' | 'solid';

interface IBadgeProps {
  statusId: number;
  badgeStyle?: TBadgeStyle;
  className?: string;
}

function Badge({ statusId, badgeStyle = 'light', className }: IBadgeProps) {
  if (!isValidStatusId(statusId)) {
    return null;
  }

  const config = BADGE_CONFIG[statusId as EStatusId];
  const variantClass = badgeStyle === 'solid' ? config.solidClass : config.lightClass;

  return (
    <span className={cx(styles.badge, styles[variantClass], className)}>
      {config.label}
    </span>
  );
}

export default Badge;
