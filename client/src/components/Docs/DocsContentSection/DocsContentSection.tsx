import React, { FC } from "react";
import styles from "./DocsContentSection.module.scss";

interface DocsContentSectionProps {
  children?: React.ReactNode;
}

const DocsContentSection: FC<DocsContentSectionProps> = ({
  children,
}: DocsContentSectionProps) => (
  <div className={styles.DocsContentSection} data-testid="DocsContentSection">
    {children}
  </div>
);

export default DocsContentSection;
