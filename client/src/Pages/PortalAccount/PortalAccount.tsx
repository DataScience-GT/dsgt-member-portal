import React, { FC } from 'react';
import styles from './PortalAccount.module.scss';

interface PortalAccountProps {}

const PortalAccount: FC<PortalAccountProps> = () => (
  <div className={styles.PortalAccount} data-testid="PortalAccount">
    
    <h1 className={styles.Major}>Account</h1>
  </div>
);

export default PortalAccount;
