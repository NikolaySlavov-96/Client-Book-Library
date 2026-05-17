import { memo } from 'react';

import { TEXTS } from '../../../constants';

import styles from './AuthTabs.module.css';

type TAuthTab = 'login' | 'register';

interface IAuthTabsProps {
  activeTab: TAuthTab;
  onSwitch: (tab: TAuthTab) => void;
  className?: string;
}

const TABS: { value: TAuthTab; label: string }[] = [
  { value: 'login', label: TEXTS.AUTH_TAB_LOGIN },
  { value: 'register', label: TEXTS.AUTH_TAB_REGISTER },
];

function AuthTabs({ activeTab, onSwitch, className }: IAuthTabsProps) {
  return (
    <div
      className={[styles.tabs, className].filter(Boolean).join(' ')}
      role="tablist"
      aria-label="Authentication"
    >
      {TABS.map((tab) => (
        <button
          key={tab.value}
          role="tab"
          aria-selected={activeTab === tab.value}
          className={[styles.tab, activeTab === tab.value ? styles['tab--active'] : '']
            .filter(Boolean)
            .join(' ')}
          onClick={() => onSwitch(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default memo(AuthTabs);
