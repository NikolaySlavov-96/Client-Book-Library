import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../atoms/Button/Button';

import { ROUT_NAMES, TEXTS } from '../../../constants';

import styles from './_NotFound.module.css';

const _NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className={`flex-col flex-center ${styles.wrap}`}>
      <div className={styles.spines} aria-hidden="true">
        {[70, 90, 110, 80, 100, 60, 95].map((h, i) => (
          <div
            key={i}
            className={styles.spine}
            style={{
              height: h,
              background: ['#8b5e3c', '#c49a6c', '#374151', '#2d6a4f', '#5c6bc0', '#e67e22', '#9c9690'][i],
            }}
          />
        ))}
      </div>

      <h1 className={styles.code}>{TEXTS.COMMON_NOT_FOUND_TITLE}</h1>
      <p className={styles.message}>{TEXTS.COMMON_NOT_FOUND_SUBTITLE}</p>

      <Button
        label={TEXTS.COMMON_BACK_TO_HOME}
        variant="primary"
        size="md"
        onClick={() => navigate(ROUT_NAMES.HOME)}
      />
    </main>
  );
};

export default memo(_NotFound);
