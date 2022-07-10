import React, { FC } from "react";
import styles from "./DocsSidebarHeader.module.scss";

interface DocsSidebarHeaderProps {
  label?: string;
}

const DocsSidebarHeader: FC<DocsSidebarHeaderProps> = ({
  label,
}: DocsSidebarHeaderProps) => (
  <div className={styles.DocsSidebarHeader} data-testid="DocsSidebarHeader">
    {label}
  </div>
);

export default DocsSidebarHeader;
