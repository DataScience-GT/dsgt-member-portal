import React, { FC } from 'react';
import styles from './PortalEvent.module.scss';

interface PortalEventProps {}

const PortalEvent: FC<PortalEventProps> = () => (
  <div className={styles.PortalEvent} data-testid="PortalEvent">
    <h1 className={styles.Major}>Events</h1>
  </div>
);

export default PortalEvent;
