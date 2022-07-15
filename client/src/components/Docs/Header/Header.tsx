import React, { FC } from "react";
import styles from "./Header.module.scss";

import { HashScroll } from "react-hash-scroll";

interface HeaderProps {
  id?: string;
  hash?: string;
  children?: React.ReactNode;
}

const Header: FC<HeaderProps> = ({ id, hash, children }: HeaderProps) => (
  <HashScroll hash={hash || "#"} position="start">
    <div id={id} className={styles.Header} data-testid="Header">
      <h1>{children}</h1>
      <a href={hash}>#</a>
    </div>
  </HashScroll>
);

export default Header;
