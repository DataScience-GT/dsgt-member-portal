import React, { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./DocsSidebarHeader.module.scss";

interface DocsSidebarHeaderProps {
  label?: string;
  route?: string;
}

const DocsSidebarHeader: FC<DocsSidebarHeaderProps> = ({
  label,
  route,
}: DocsSidebarHeaderProps) => (
  <div className={styles.DocsSidebarHeader} data-testid="DocsSidebarHeader">
    <Link className={styles.Link} to={route || "#"}>
      {label}
    </Link>
  </div>
);

export default DocsSidebarHeader;
