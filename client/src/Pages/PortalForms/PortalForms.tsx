import React, { FC } from 'react';
import styles from './PortalForms.module.scss';

interface PortalFormsProps {}

const PortalForms: FC<PortalFormsProps> = () => (
  <div className={styles.PortalForms} data-testid="PortalForms">
    PortalForms Component
  </div>
);

export default PortalForms;
