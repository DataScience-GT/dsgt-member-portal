import React, { FC } from "react";
import DocsContentSection from "../../components/Docs/DocsContentSection/DocsContentSection";
import styles from "./DocsWelcome.module.scss";

import Header from "../../components/Docs/Header/Header";

interface DocsWelcomeProps {}

const DocsWelcome: FC<DocsWelcomeProps> = () => (
  <div className={styles.DocsWelcome} data-testid="DocsWelcome">
    <DocsContentSection>
      <Header id="a" path="#a">Welcome</Header>
      <Header id="b" path="#b">Welcome</Header>
    </DocsContentSection>
  </div>
);

export default DocsWelcome;
