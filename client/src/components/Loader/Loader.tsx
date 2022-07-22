import React, { FC, useContext } from "react";
import styles from "./Loader.module.scss";
import { Theme, ThemeContext } from "../../Context/ThemeContext";

interface LoaderProps {
  width?: string;
  height?: string;
}

const Loader: FC<LoaderProps> = ({ width, height }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  console.log(theme)
  return (
    <div
      className={`${styles.Loader} ${styles[theme]}`}
      data-testid="Loader"
      style={{ width: width, height: height }}
    >
      <span>D</span>
      <span>S</span>
      <span>G</span>
      <span>T</span>
    </div>
  );
};

export default Loader;
