import React, { FC } from "react";
import styles from "./Header.module.scss";

import { HashScroll } from "react-hash-scroll";

interface HeaderProps {
  id?: string;
  children?: React.ReactNode;
}

const Header: FC<HeaderProps> = ({ id, children }: HeaderProps) => (
  <HashScroll hash={"#" + id} position="start">
    <div id={id} className={styles.Header} data-testid="Header">
      <h1>{children}</h1>
      <a href={"#" + id}>#</a>
    </div>
  </HashScroll>
);

export default Header;
