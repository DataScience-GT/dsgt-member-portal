import React, { FC } from "react";
import styles from "./MiniHeader.module.scss";

import { HashScroll } from "react-hash-scroll";

interface MiniHeaderProps {
  id?: string;
  hash?: string;
  children?: React.ReactNode;
}

const MiniHeader: FC<MiniHeaderProps> = ({
  id,
  hash,
  children,
}: MiniHeaderProps) => (
  <HashScroll hash={hash || "#"} position="start">
    <div className={styles.MiniHeader} data-testid="MiniHeader">
      <h2>{children}</h2>
      <a href={hash}>#</a>
    </div>
  </HashScroll>
);

export default MiniHeader;
