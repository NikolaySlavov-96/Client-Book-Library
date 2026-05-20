import { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Badge from '../../../../component/atoms/Badge/Badge';
import Button from '../../../../component/atoms/Button/Button';

import { useStoreZ } from '../../../../hooks';
import { ROUT_NAMES, TEXTS, getCoverGradient } from '../../../../constants';
import { EStatusId, STATUS_META, isValidStatusId } from '../../../../constants/statusMap';

import styles from './_DetailsForProduct.module.css';

const STATUS_BUTTONS: EStatusId[] = [
  EStatusId.WANT,
  EStatusId.READING,
  EStatusId.READ,
  EStatusId.LISTENING,
  EStatusId.LISTENED,
];

const _DetailsForProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shareEmail, setShareEmail] = useState('');

  const {
    isAuthenticated,
    fetchProductById,
    productById,
    isLoadingProduct,
    fetchProductState,
    addingProductState,
    productState,
    email,
  } = useStoreZ();

  const currentStatusId = productState?.stateId ?? 0;

  const handleBack = useCallback(() => navigate(-1), [navigate]);

  const handleStatusChange = useCallback((statusId: EStatusId) => {
    if (id) addingProductState(id, String(statusId));
  }, [id, addingProductState]);

  const handleShareSubmit = useCallback(() => {
    const trimmed = shareEmail.trim();
    if (!trimmed) return;
    navigate(`${ROUT_NAMES.REVIEW_PRODUCTS_BY_EMAIL.replace(':email', '')}${encodeURIComponent(trimmed)}`);
  }, [shareEmail, navigate]);

  useEffect(() => {
    if (id && id !== '0') {
      fetchProductById(id);
    }
  }, [id, fetchProductById]);

  useEffect(() => {
    if (email && id && id !== '0') {
      fetchProductState(id);
    }
  }, [id, email, fetchProductState]);

  const coverGradient = getCoverGradient(productById?.productId ?? 0);

  return (
    <main className={styles.wrap}>
        <button className={styles.back} onClick={handleBack} type="button">
          {TEXTS.DETAIL_BACK}
        </button>

        {isLoadingProduct ? (
          <div className={styles.loading}>{TEXTS.COMMON_LOADING}</div>
        ) : (
          <div className={styles.grid}>
            <div className={`flex-center ${styles.cover}`} style={{ background: coverGradient }}>
              {productById?.fileUrl ? (
                <img
                  className={styles.cover__img}
                  src={productById.fileUrl}
                  alt={productById.fileSrc ?? productById.productTitle}
                />
              ) : (
                <span className={styles.cover__placeholder}>{productById?.productTitle}</span>
              )}
              {isValidStatusId(currentStatusId) ? (
                <div className={styles.cover__badge}>
                  <Badge statusId={currentStatusId} badgeStyle="solid" />
                </div>
              ) : null}
            </div>

            <div className={styles.info}>
              <p className={styles.info__genre}>{productById?.authorGenre ?? TEXTS.COMMON_PLACEHOLDER_VALUE}</p>
              <h1 className={styles.info__title}>{productById?.productTitle}</h1>
              <p className={styles.info__author}>{productById?.authorName}</p>

              <div className={styles.stats}>
                <div className={`flex-col ${styles.stat}`}>
                  <span className={styles.stat__value}>{TEXTS.COMMON_PLACEHOLDER_VALUE}</span>
                  <span className={styles.stat__label}>{TEXTS.DETAIL_PAGES}</span>
                </div>
                <div className={`flex-col ${styles.stat}`}>
                  <span className={styles.stat__value}>{TEXTS.COMMON_PLACEHOLDER_VALUE}</span>
                  <span className={styles.stat__label}>{TEXTS.DETAIL_YEAR}</span>
                </div>
                <div className={`flex-col ${styles.stat}`}>
                  <span className={styles.stat__value}>{TEXTS.COMMON_PLACEHOLDER_VALUE}</span>
                  <span className={styles.stat__label}>{TEXTS.DETAIL_RATING}</span>
                </div>
              </div>

              <p className={styles.desc}>{TEXTS.DETAIL_DESC_PLACEHOLDER}</p>

              {isAuthenticated ? (
                <>
                  <div className={styles.actions}>
                    <p className={styles.actions__label}>{TEXTS.DETAIL_ADD_TO_SHELF}</p>
                    <div className={styles.actions__btns}>
                      {STATUS_BUTTONS.map((sid) => (
                        <Button
                          key={sid}
                          label={STATUS_META[sid].label}
                          variant={currentStatusId === sid ? 'primary' : 'outline'}
                          size="sm"
                          onClick={() => handleStatusChange(sid)}
                          ariaLabel={`${TEXTS.DETAIL_ADD_TO_SHELF}: ${STATUS_META[sid].label}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className={styles.share}>
                    <p className={styles.share__label}>{TEXTS.DETAIL_SHARE_LABEL}</p>
                    <div className={styles.share__row}>
                      <input
                        className={styles.share__input}
                        type="email"
                        placeholder={TEXTS.DETAIL_SHARE_PLACEHOLDER}
                        value={shareEmail}
                        onChange={(e) => setShareEmail(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' ? handleShareSubmit() : undefined}
                        aria-label={TEXTS.DETAIL_SHARE_LABEL}
                      />
                      <button
                        className={styles.share__btn}
                        onClick={handleShareSubmit}
                        type="button"
                        disabled={!shareEmail.trim()}
                      >
                        {TEXTS.DETAIL_SHARE_BTN}
                      </button>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        )}
    </main>
  );
};

export default memo(_DetailsForProduct);
