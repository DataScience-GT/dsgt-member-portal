import React, { FC } from "react";
import DocsContentSection from "../../components/DocsContentSection/DocsContentSection";
import styles from "./DocsWelcome.module.scss";

interface DocsWelcomeProps {}

const DocsWelcome: FC<DocsWelcomeProps> = () => (
  <div className={styles.DocsWelcome} data-testid="DocsWelcome">
    <DocsContentSection label="DocsWelcome Component1" />
  </div>
);

export default DocsWelcome;
