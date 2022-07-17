import React, { FC } from "react";
import DocsContentSection from "../../../components/Docs/DocsContentSection/DocsContentSection";
import styles from "./DocsWelcome.module.scss";

import Header from "../../../components/Docs/Header/Header";
import MiniHeader from "../../../components/Docs/MiniHeader/MiniHeader";
import JsonBlock from "../../../components/Docs/JsonBlock/JsonBlock";

interface DocsWelcomeProps {}

const data1 = {
  ok: 1,
  valid: true,
  fname: "john",
};

const DocsWelcome: FC<DocsWelcomeProps> = () => (
  <div className={styles.DocsWelcome} data-testid="DocsWelcome">
    <DocsContentSection>
      <Header id="a" hash="#a">
        Welcome
      </Header>
      <MiniHeader id="b" hash="#b">
        test123
      </MiniHeader>
      <JsonBlock jsonData={data1} />
    </DocsContentSection>
  </div>
);

export default DocsWelcome;
