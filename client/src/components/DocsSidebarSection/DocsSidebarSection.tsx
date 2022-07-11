import React, { FC } from "react";
import DocsSidebarHeader from "../DocsSidebarHeader/DocsSidebarHeader";
import styles from "./DocsSidebarSection.module.scss";

interface DocsSidebarSectionProps {
  label?: string;
  route?: string;
  children?: React.ReactNode;
}

const DocsSidebarSection: FC<DocsSidebarSectionProps> = ({
  label,
  route,
  children,
}: DocsSidebarSectionProps) => (
  <div className={styles.DocsSidebarSection} data-testid="DocsSidebarSection">
    <DocsSidebarHeader label={label} route={route} />
    {children}
  </div>
);

export default DocsSidebarSection;
