import { memo, useCallback, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthTabs from '../../../molecules/AuthTabs/AuthTabs';
import Button from '../../../atoms/Button/Button';

import { Toast } from '../../../../Toasts';
import { ESwalIcon } from '../../../../Types/Swal';

import { useStoreZ } from '../../../../hooks';
import { ROUT_NAMES, ServerError, TEXTS, BOOK_SPINES } from '../../../../constants';

import styles from './_Login.module.css';

const _Login = () => {
  const navigate = useNavigate();
  const { onSubmitLogin } = useStoreZ();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoading(true);
    try {
      const result = await onSubmitLogin({ email, password });
      if (result?.messageCode === ServerError.SUCCESSFULLY_LOGIN.messageCode) {
        Toast({ title: TEXTS.TOAST_LOGIN_SUCCESS, typeIcon: ESwalIcon.SUCCESS });
        navigate(ROUT_NAMES.HOME);
      } else {
        Toast({ title: result?.message ?? TEXTS.TOAST_GENERIC_ERROR, typeIcon: ESwalIcon.ERROR });
      }
    } finally {
      setIsLoading(false);
    }
  }, [email, password, onSubmitLogin, navigate]);

  return (
    <div className={styles.wrap}>
      <div className={styles.left}>
        <div className={styles.tagline}>{TEXTS.AUTH_LOGIN_TAGLINE}</div>
        <div>
          <div className={styles.spines}>
            {BOOK_SPINES.map((s, i) => (
              <div
                key={i}
                className={styles.spine}
                style={{ background: s.color, height: s.height }}
              />
            ))}
          </div>
          <p className={styles.quote}>{TEXTS.AUTH_LOGIN_QUOTE}</p>
        </div>
      </div>

      <div className={`flex-center ${styles.right}`}>
        <div className={styles.card}>
          <div className={styles.head}>
            <h1 className={styles.head__title}>{TEXTS.AUTH_LOGIN_HEADING}</h1>
            <p className={styles.head__sub}>{TEXTS.AUTH_LOGIN_SUBTITLE}</p>
          </div>

          <AuthTabs
            activeTab="login"
            onSwitch={(tab) => tab === 'register' ? navigate(ROUT_NAMES.REGISTER) : undefined}
          />

          <form onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label className={styles.field__label} htmlFor="login-email">
                {TEXTS.AUTH_LABEL_EMAIL}
              </label>
              <input
                id="login-email"
                className={styles.field__input}
                type="email"
                placeholder={TEXTS.AUTH_PLACEHOLDER_EMAIL}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.field__label} htmlFor="login-password">
                {TEXTS.AUTH_LABEL_PASSWORD}
              </label>
              <input
                id="login-password"
                className={styles.field__input}
                type="password"
                placeholder={TEXTS.AUTH_PLACEHOLDER_PASSWORD}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            <Button
              label={TEXTS.AUTH_BTN_LOGIN}
              variant="primary"
              size="full"
              type="submit"
              isLoading={isLoading}
              isDisabled={!email || !password}
            />
          </form>

          <div className={styles.divider}>
            <span className={styles.divider__text}>{TEXTS.AUTH_OR_DIVIDER}</span>
          </div>

          <button className={styles.emailLink} type="button" title={TEXTS.COMMON_COMING_SOON} disabled>
            {TEXTS.AUTH_EMAIL_LINK}
          </button>

          <p className={styles.footer}>
            {TEXTS.AUTH_TERMS}{' '}
            <span className={styles.footer__link}>{TEXTS.AUTH_TERMS_LINK}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(_Login);
