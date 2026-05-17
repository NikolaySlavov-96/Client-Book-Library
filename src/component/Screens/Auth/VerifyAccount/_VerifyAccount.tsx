import { memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useStoreZ } from '../../../../hooks';

const _VerifyAccount = () => {
  const { verifyToken } = useParams();
  const { verifyAccountWithToken } = useStoreZ();

  useEffect(() => {
    verifyAccountWithToken(verifyToken);
  }, [verifyToken, verifyAccountWithToken]);

  return null;
};

export default memo(_VerifyAccount);
