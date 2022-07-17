import React, { FC } from "react";
import styles from "./Divider.module.scss";

interface DividerProps {}

const Divider: FC<DividerProps> = () => (
  <div className={styles.Divider} data-testid="Divider"></div>
);

export default Divider;
