import React, { FC } from 'react';
import styles from './PortalCheckin.module.scss';

interface PortalCheckinProps {}

const PortalCheckin: FC<PortalCheckinProps> = () => (
  <div className={styles.PortalCheckin} data-testid="PortalCheckin">
    PortalCheckin Component
  </div>
);

export default PortalCheckin;
