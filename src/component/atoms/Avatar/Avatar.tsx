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
      className={[styles.avatar, styles[`avatar--${size}`], className].filter(Boolean).join(' ')}
      aria-label={initials}
      role="img"
    >
      {initials}
    </div>
  );
}

export default Avatar;
