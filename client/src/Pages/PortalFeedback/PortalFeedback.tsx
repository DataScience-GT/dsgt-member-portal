import React, { FC } from 'react';
import styles from './PortalFeedback.module.scss';

interface PortalFeedbackProps {}

const PortalFeedback: FC<PortalFeedbackProps> = () => (
  <div className={styles.PortalFeedback} data-testid="PortalFeedback">
    PortalFeedback Component
  </div>
);

export default PortalFeedback;
