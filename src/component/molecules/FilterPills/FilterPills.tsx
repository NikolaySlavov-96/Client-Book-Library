import { memo } from 'react';

import styles from './FilterPills.module.css';

interface IFilterPillOption {
  label: string;
  value: string;
}

interface IFilterPillsProps {
  options: IFilterPillOption[];
  activeValue: string;
  onSelect: (value: string) => void;
  className?: string;
}

function FilterPills({ options, activeValue, onSelect, className }: IFilterPillsProps) {
  return (
    <div
      className={[styles.container, className].filter(Boolean).join(' ')}
      role="group"
      aria-label="Filter options"
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          className={[styles.pill, activeValue === opt.value ? styles['pill--active'] : '']
            .filter(Boolean)
            .join(' ')}
          onClick={() => onSelect(opt.value)}
          aria-pressed={activeValue === opt.value}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default memo(FilterPills);
