import React, { FC } from 'react';
import styles from './Docs.module.scss';

interface DocsProps {}

const Docs: FC<DocsProps> = () => (
  <div className={styles.Docs} data-testid="Docs">
    Docs Component
  </div>
);

export default Docs;
