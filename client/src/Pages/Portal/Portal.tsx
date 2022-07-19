import React, { FC } from 'react';
import styles from './Portal.module.scss';

interface PortalProps {}

const Portal: FC<PortalProps> = () => (
  <div className={styles.Portal} data-testid="Portal">
    Portal Component
  </div>
);

export default Portal;
