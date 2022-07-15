import React, { FC } from 'react';
import styles from './MiniHeader.module.scss';

interface MiniHeaderProps {}

const MiniHeader: FC<MiniHeaderProps> = () => (
  <div className={styles.MiniHeader} data-testid="MiniHeader">
    MiniHeader Component
  </div>
);

export default MiniHeader;
