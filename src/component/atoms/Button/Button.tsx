import { ReactNode } from 'react';

import styles from './Button.module.css';

type TButtonVariant = 'primary' | 'ghost' | 'outline' | 'text';
type TButtonSize = 'sm' | 'md' | 'full';

interface IButtonProps {
  label?: string;
  children?: ReactNode;
  variant?: TButtonVariant;
  size?: TButtonSize;
  isLoading?: boolean;
  isDisabled?: boolean;
  type?: 'button' | 'submit';
  className?: string;
  onClick?: () => void;
  title?: string;
  ariaLabel?: string;
}

function Button({
  label,
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isDisabled = false,
  type = 'button',
  className,
  onClick,
  title,
  ariaLabel,
}: IButtonProps) {
  const classes = [
    styles.btn,
    styles[`btn--${variant}`],
    styles[`btn--${size}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      aria-disabled={isDisabled || isLoading}
      aria-label={ariaLabel}
      title={title}
    >
      {isLoading ? '...' : (children ?? label)}
    </button>
  );
}

export default Button;
