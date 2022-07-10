import React, { FC } from "react";
import DocsSidebarHeader from "../DocsSidebarHeader/DocsSidebarHeader";
import styles from "./DocsSidebarSection.module.scss";

interface DocsSidebarSectionProps {
  label?: string;
  children?: React.ReactNode;
}

const DocsSidebarSection: FC<DocsSidebarSectionProps> = ({
  label,
  children,
}: DocsSidebarSectionProps) => (
  <div className={styles.DocsSidebarSection} data-testid="DocsSidebarSection">
    <DocsSidebarHeader label={label} />
    {children}
  </div>
);

export default DocsSidebarSection;
