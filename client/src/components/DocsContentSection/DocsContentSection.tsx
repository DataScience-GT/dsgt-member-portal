import React, { FC } from "react";
import styles from "./DocsContentSection.module.scss";

interface DocsContentSectionProps {
  label?: string;
}

const DocsContentSection: FC<DocsContentSectionProps> = ({
  label,
}: DocsContentSectionProps) => (
  <div className={styles.DocsContentSection} data-testid="DocsContentSection">
    DocsContentSection Component1
  </div>
);

export default DocsContentSection;
