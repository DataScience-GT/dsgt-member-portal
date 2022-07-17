import React, { FC } from "react";
import DocsContentSection from "../../../components/Docs/DocsContentSection/DocsContentSection";
import Header from "../../../components/Docs/Header/Header";
import MiniHeader from "../../../components/Docs/MiniHeader/MiniHeader";
import styles from "./DocsApi.module.scss";

interface DocsApiProps {}

const DocsApi: FC<DocsApiProps> = () => (
  <div className={styles.DocsApi} data-testid="DocsApi">
    <DocsContentSection>
      <Header id="0">/api</Header>
      <MiniHeader id="api">/api/</MiniHeader>
      <MiniHeader id="auth">/api/auth</MiniHeader>
    </DocsContentSection>
  </div>
);

export default DocsApi;
