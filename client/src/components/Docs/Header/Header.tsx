import React, { FC } from "react";
import styles from "./Header.module.scss";

interface HeaderProps {
  id?: string;
  path?: string;
  children?: React.ReactNode;
}

const Header: FC<HeaderProps> = ({ id, path, children }: HeaderProps) => (
  <div id={id} className={styles.Header} data-testid="Header">
    <h1>{children}</h1>
    <a href={path}>#</a>
  </div>
);

export default Header;
