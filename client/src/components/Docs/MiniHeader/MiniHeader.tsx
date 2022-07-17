import React, { FC } from "react";
import styles from "./MiniHeader.module.scss";

import { HashScroll } from "react-hash-scroll";

interface MiniHeaderProps {
  id?: string;
  children?: React.ReactNode;
}

const MiniHeader: FC<MiniHeaderProps> = ({ id, children }: MiniHeaderProps) => (
  <HashScroll hash={"#" + id} position="start">
    <div className={styles.MiniHeader} data-testid="MiniHeader">
      <h2>{children}</h2>
      <a href={"#" + id}>#</a>
    </div>
  </HashScroll>
);

export default MiniHeader;
